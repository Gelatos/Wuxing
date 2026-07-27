var Debug = Debug || (function () {
	'use strict';
	var
		log = function (msg) {
			console.log(msg);
		},
		logError = function (msg) {
			console.error(`ERROR! ${msg}`);
		}

	return {
		Log: log,
		LogError: logError
	};
}());

class eventinfo {
	constructor(sourceAttribute, newValue) {
		this.sourceAttribute = sourceAttribute;
		this.newValue = newValue;
	}
}

class LoadingScreenHandler {
	constructor(attributeHandler) {
		this.loadingScreenAttr = WuxDef.GetVariable("Loading");
		if (attributeHandler != undefined) {
			this.attributeHandler = attributeHandler;
		}
	}

	async run() {
		await this.showLoadingScreen();
		await this.attributeHandler.run();
		await this.hideLoadingScreen();
	}

	async showLoadingScreen(callback) {
		let update = {};
		update[this.loadingScreenAttr] = "1";
		await setAttrsAsync(update, {silent: true});
		await this.sleep(1000);
		if (callback != undefined) {
			callback();
		}
	}

	async hideLoadingScreen() {
		let update = {};
		update[this.loadingScreenAttr] = "0";
		await setAttrsAsync(update, {silent: true});
	}

	async sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

class WorkerAttributeHandler extends AttributeHandler {

	constructor(props) {
		super(props);
		this.repeatingSections = {};
		this.repeatingSectionsUpdate = {};
	}
	
	addRepeatingSection(definitionId, variableId) {
		let repeater = new WorkerRepeatingSectionHandler(definitionId, variableId);
		this.repeatingSections[repeater.repeatingSection] = repeater;
	}
	getRepeatingSection(definitionId, variableId) {
		return this.repeatingSections[WuxDef.GetVariable(definitionId, variableId)];
	}
	addRepeatingSectionRowUpdate(definitionId, attr, value) {
		if (value == undefined) {
			Debug.LogError(`[AttributeHandler][addRepeatingSectionRowData] Tried to add undefined value for ${attr}. This is not allowed.`);
			return;
		}
		if (definitionId == undefined) {
			this.addUpdate(attr, value);
			return;
		}
		if (!this.repeatingSectionsUpdate.hasOwnProperty(definitionId)) {
			this.repeatingSectionsUpdate[definitionId] = {};
		}
		this.repeatingSectionsUpdate[definitionId][attr] = value;
	}

	async run() {
		try {
			let attributeHandler = this;
			for (const key in attributeHandler.repeatingSections) {
				attributeHandler.repeatingSections[key].ids = await getSectionIDsAsync(attributeHandler.repeatingSections[key].repeatingSection);
				attributeHandler.repeatingSections[key].addAttributeMods(attributeHandler);
			}
			// getAttrsAsync/setAttrsAsync are independent, self-contained wrappers
			// (each does its own active-character-id save/restore around the
			// underlying Roll20 call) - skipping the fetch entirely when nothing was
			// requested (e.g. a cycle that only writes an attribute, like the Inspect
			// Popup's "reveal" step) is safe and avoids a pure-waste round trip.
			attributeHandler.current = attributeHandler.mods.length > 0
				? await getAttrsAsync(attributeHandler.mods)
				: {};

			attributeHandler.getCallbacks.forEach((callback) => {
				callback(attributeHandler);
			});
			await setAttrsAsync(attributeHandler.update, {silent: true});
			let repeatingUpdates = attributeHandler.getRepeaterUpdate();
			for (let i = 0; i < repeatingUpdates.length; i++) {
				await setAttrsAsync(repeatingUpdates[i], {silent: true});
			}

			attributeHandler.finishCallbacks.forEach((callback) => {
				callback(attributeHandler);
			});
		} catch(e) {
			// No active character in sandbox — skip silently
			Debug.LogError(`[WorkerAttributeHandler][run] Caught error: ${e.message}\n${e.stack}`);
		}
	}
	
	getRepeaterUpdate() {
		let output = [];
		for (const key in this.repeatingSectionsUpdate) {
			output.push(this.repeatingSectionsUpdate[key]);
		}
		return output;
	}
	
	async sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

class WorkerRepeatingSectionHandler extends RepeatingSectionHandler {

	generateRowId() {
		return generateRowID();
	}

	getIds(callback) {
		let repeater = this;
		try {
			getSectionIDs(this.repeatingSection, function (ids) {
				ids.forEach(function (id) {
					repeater.ids.push(id);
				});
				callback(repeater);
			});
		} catch(e) {
			// No active character in sandbox — skip silently
		}
	}

	removeId(id) {
		super.removeId(id);
		removeRepeatingRow(this.repeatingSection + "_" + id);
	}
}

class WuxWorkerBuildManager {
	constructor(definitionIds) {
		this.workers = [];
		if (Array.isArray(definitionIds)) {
			for (let i = 0; i < definitionIds.length; i++) {
				this.workers.push(new WuxWorkerBuild(definitionIds[i]));
			}
		} else {
			this.workers.push(new WuxWorkerBuild(definitionIds));
		}
	}

	iterate(callback) {
		this.workers.forEach((worker) => {
			callback(worker);
		});
	}

	setupAttributeHandlerForPointUpdate(attributeHandler) {
		let manager = this;
		manager.iterate(function (worker) {
			attributeHandler.addFormulaMods(worker.definition);
			attributeHandler.addMod(worker.attrBuildDraft);
		});
	}

	setAttributeHandlerPoints(attributeHandler) {
		this.iterate(function (worker) {
			worker.setBuildStatsDraft(attributeHandler);
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});
	}

	commitChanges(attributeHandler) {
		this.iterate(function (worker) {
			worker.commitChanges(attributeHandler);
		});
	}

	resetChanges(attributeHandler) {
		this.iterate(function (worker) {
			worker.resetChanges(attributeHandler);
		});
	}
}

class WuxWorkerBuild {
	constructor(definitionId) {
		this.definition = WuxDef.Get(definitionId);
		this.buildStats = {};

		this.attrBuildDraft = this.definition.getVariable(WuxDef._build);
		this.attrBuildFinal = this.definition.getVariable(WuxDef._build, WuxDef._max);
		this.attrMax = this.definition.getVariable(WuxDef._max);
	}

	setBuildStatsDraft(attributeHandler) {
		this.setBuildStats(this.attrBuildDraft, attributeHandler);
	}

	setBuildStatsFinal(attributeHandler) {
		this.setBuildStats(this.attrBuildFinal, attributeHandler);
	}

	setBuildStats(buildStatVersion, attributeHandler) {
		this.buildStats = new WorkerBuildStats();
		this.buildStats.import(attributeHandler.parseJSON(buildStatVersion));
	}
	
	iterateBuildStats(callback) {
		this.buildStats.iterate(function (buildStat) {
			callback(buildStat);
		});
	}

	setPointsMax(attributeHandler) {
		let max = this.definition.formula.getValue(attributeHandler);
		attributeHandler.addUpdate(this.attrMax, max);
	}

	updatePoints(attributeHandler) {
		let buildPoints = this.buildStats.getPointsTotal();
		let buildPointsMax = attributeHandler.parseInt(this.attrMax);

		attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
		attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
	}
	
	addBuildStat(attributeHandler, updatingAttr, newValue) {
		let workerBuildStat = new WorkerBuildStat([updatingAttr, newValue]);
		this.buildStats.add(updatingAttr, workerBuildStat);
	}

	updateBuildStats(attributeHandler, updatingAttr, newValue) {
		this.addBuildStat(attributeHandler, updatingAttr, newValue);
		attributeHandler.addUpdate(this.attrBuildDraft, JSON.stringify(this.buildStats));
	}

	updateMaxBuildStats(attributeHandler, updatingAttr, newValue) {
		this.addBuildStat(attributeHandler, updatingAttr, newValue);
		attributeHandler.addUpdate(this.attrBuildFinal, JSON.stringify(this.buildStats));
	}

	getBuildVariables() {
		let splitVariable;
		let buildVariableNames = [];
		let buildVariables = [];
		for (let i = 0; i < this.definition.linkedGroups.length; i++) {
			if (this.definition.linkedGroups[i] != "") {
				splitVariable = this.definition.linkedGroups[i].split(":");
				if (splitVariable.length == 1) {
					buildVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", splitVariable[0]));
				} else {
					buildVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", splitVariable[0]), splitVariable[1]);
				}
				buildVariables = buildVariables.concat(buildVariableNames);
			}
		}
		return buildVariables;
	}

	cleanBuildStats() {
		this.buildStats.clean(this.getBuildVariables());
		this.buildStats.cleanValues();
	}
	
	clearBuildStats() {
		this.buildStats.clear();
	}
	
	removeBuildStat(key) {
		this.buildStats.remove(key);
	}

	setVariablesToBuildStats(attributeHandler) {
		this.iterateBuildStats(function (buildStat) {
			attributeHandler.addUpdate(buildStat.name, buildStat.value);
		});
	}

	saveBuildStatsToFinal(attributeHandler) {
		attributeHandler.addUpdate(this.attrBuildFinal, JSON.stringify(this.buildStats));
	}

	revertBuildStatsDraft(attributeHandler) {
		attributeHandler.addUpdate(this.attrBuildDraft, JSON.stringify(this.buildStats));
	}

	changeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
		let worker = this;

		// Debug.Log(`Updating ${worker.definition.name} variable ${updatingAttr} to ${newValue}`);
		attributeHandler.addMod(worker.attrMax);
		attributeHandler.addMod(worker.attrBuildDraft);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, updatingAttr, newValue);
			worker.updatePoints(attrHandler);
		});
	}

	commitChanges(attributeHandler) {
		let worker = this;
		attributeHandler.addMod(worker.attrBuildDraft);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsDraft(attrHandler);
			worker.cleanBuildStats();
			worker.setBuildStatVariables(attrHandler);
			worker.saveBuildStatsToFinal(attrHandler);
		});
	}

	resetChanges(attributeHandler) {
		let worker = this;
		attributeHandler.addMod(worker.attrBuildFinal);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsFinal(attrHandler);
			worker.cleanBuildStats();
			worker.setBuildStatVariables(attrHandler);
			worker.revertBuildStatsDraft(attrHandler);
		});
	}

	setBuildStatVariables(attributeHandler) {
		this.buildStats.iterate(function (buildStat) {
			attributeHandler.addUpdate(buildStat.name, buildStat.value);
		});
	}
}

class WuxBasicWorkerBuild extends WuxWorkerBuild {
	
}

class WuxAdvancementWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Advancement");
	}

	updatePoints(attributeHandler) {
		let buildPoints = 0;
		let advTechs = WuxDef.GetVariable("AdvancementTechnique");
		let perkConversion = WuxDef.GetVariable("AdvancementPerkTransfer");
		let trainingKnowledge = WuxDef.GetVariable("TrainingKnowledge");

		if (this.buildStats.has(advTechs)) {
			buildPoints += this.buildStats.getIntValue(advTechs) * 2;
		}
		if (this.buildStats.has(perkConversion)) {
			buildPoints -= this.buildStats.getIntValue(perkConversion);
		}
		if (this.buildStats.has(trainingKnowledge)) {
			buildPoints += this.buildStats.getIntValue(trainingKnowledge);
		}
		let buildPointsMax = attributeHandler.parseInt(this.attrMax);

		attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
		attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
	}

	getBuildVariables() {
		return [WuxDef.GetVariable("Level"), WuxDef.GetVariable("XP"),
			WuxDef.GetVariable("AdvancementTechnique"), WuxDef.GetVariable("AdvancementPerkTransfer"),
			WuxDef.GetVariable("TrainingKnowledge")];
	}

	updateLevel(attributeHandler, fieldName, level) {
		let worker = this;
		level = parseInt(level);
		let crDefinition = WuxDef.Get("CR");
		attributeHandler.addUpdate(fieldName, level);
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(crDefinition.getVariable());
		attributeHandler.addMod(crDefinition.getVariable(WuxDef._max));
		let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute", "Perk"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			let cr = worker.getCharacterRank(level);
			if (cr != attrHandler.parseInt(crDefinition.getVariable(WuxDef._max))) {
				if (attrHandler.parseInt(crDefinition.getVariable()) == attrHandler.parseInt(crDefinition.getVariable(WuxDef._max))) {
					attrHandler.addUpdate(crDefinition.getVariable(), cr);
					combatDetailsHandler.onUpdateCR(attrHandler, cr);
				}
				attrHandler.addUpdate(crDefinition.getVariable(WuxDef._max), cr);
			}

			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, fieldName, level);
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
		WuxWorkerGeneral.UpdatePerkMaxRanks(attributeHandler);
	}

	updateAdvancementPoints(attributeHandler) {
		let worker = this;
		attributeHandler.addMod(worker.attrMax);
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(WuxDef.GetVariable("Level"));
		attributeHandler.addMod(WuxDef.GetVariable("BonusTraining"));

		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute", "Perk", "Knowledge"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			Debug.Log(`Updating ${worker.attrMax} to ${attributeHandler.parseInt(worker.attrMax)}`);

			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, worker.attrMax, attributeHandler.parseInt(worker.attrMax));
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}

	convertXp(attributeHandler) {
		let worker = this;
		let xpDefinition = WuxDef.Get("XP");
		let crDefinition = WuxDef.Get("CR");
		attributeHandler.addMod(xpDefinition.getVariable());
		attributeHandler.addMod(WuxDef.GetVariable("Level"));
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(worker.attrBuildFinal);
		attributeHandler.addMod(crDefinition.getVariable());
		attributeHandler.addMod(crDefinition.getVariable(WuxDef._max));

		let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute", "Perk"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			let level = attrHandler.parseInt(WuxDef.GetVariable("Level"));
			let xp = attrHandler.parseInt(xpDefinition.getVariable());
			let xpNeeded = xpDefinition.formula.getValue(attrHandler);

			worker.setBuildStatsDraft(attrHandler);

			while (xp >= xpNeeded) {
				level++;
				xp -= xpNeeded;
			}
			attrHandler.addUpdate(xpDefinition.getVariable(), xp);
			attrHandler.addUpdate(WuxDef.GetVariable("Level"), level);

			let cr = worker.getCharacterRank(level);
			if (cr != attrHandler.parseInt(crDefinition.getVariable(WuxDef._max))) {
				if (attrHandler.parseInt(crDefinition.getVariable()) == attrHandler.parseInt(crDefinition.getVariable(WuxDef._max))) {
					attrHandler.addUpdate(crDefinition.getVariable(), cr);
					combatDetailsHandler.onUpdateCR(attrHandler, cr);
				}
				attrHandler.addUpdate(crDefinition.getVariable(WuxDef._max), cr);
			}

			worker.updateBuildStats(attrHandler, xpDefinition.getVariable(), xp);
			worker.updateBuildStats(attrHandler, WuxDef.GetVariable("Level"), level);
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
		WuxWorkerGeneral.UpdatePerkMaxRanks(attributeHandler);
	}

	getCharacterRank(level) {
		let cr = 1;
		let incrementer = 4;
		let modIncrementer = 1;
		let checkingLevel = 4;
		while (level >= checkingLevel || cr >= 9) {
			cr++;
			incrementer += modIncrementer;
			checkingLevel += incrementer;
		}
		if (cr > 9) {
			cr = 9;
		}
		return cr;
	}

	changeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
		let worker = this;

		attributeHandler.addMod(worker.attrMax);
		attributeHandler.addMod(worker.attrBuildDraft);

		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, updatingAttr, newValue);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}
}

class WuxTrainingWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Training");
	}

	updatePoints(attributeHandler) {
		let buildPoints = 0;
		let advTechs = WuxDef.GetVariable("TrainingTechniques");

		if (this.buildStats.has(advTechs)) {
			Debug.Log(`adding ${this.buildStats.getIntValue(advTechs)} to buildPoints`);
			buildPoints += this.buildStats.getIntValue(advTechs);
		}
		let buildPointsMax = attributeHandler.parseInt(this.attrMax);
		Debug.Log(`this.attrMax: ${this.attrMax} buildPoints: ${buildPoints}, buildPointsMax: ${buildPointsMax}`);

		attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
		attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
	}

	getBuildVariables() {
		return [WuxDef.GetVariable("Training", WuxDef._max), WuxDef.GetVariable("PP"),
			WuxDef.GetVariable("TrainingTechniques")];
	}

	updateLevel(attributeHandler) {
		let worker = this;
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(WuxDef.GetVariable("BonusTraining"));
		
		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsDraft(attrHandler);
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
		});
	}

	convertPp(attributeHandler) {
		let worker = this;
		let ppDefinition = WuxDef.Get("PP");
		let bonusTrainingVariable = WuxDef.GetVariable("BonusTraining");
		attributeHandler.addMod(ppDefinition.getVariable());
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(worker.attrBuildFinal);
		attributeHandler.addMod(bonusTrainingVariable);

		let manager = new WuxWorkerBuildManager(["Technique"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsFinal(attrHandler);

			let trainingPoints = attrHandler.parseInt(bonusTrainingVariable);
			let pp = attrHandler.parseInt(ppDefinition.getVariable());
			let xpNeeded = ppDefinition.formula.getValue(attrHandler);

			worker.setBuildStatsDraft(attrHandler);

			while (pp >= xpNeeded) {
				trainingPoints++;
				pp -= xpNeeded;
			}
			attrHandler.addUpdate(ppDefinition.getVariable(), pp);
			attrHandler.addUpdate(bonusTrainingVariable, trainingPoints);

			worker.updateBuildStats(attrHandler, ppDefinition.getVariable(), pp);
			worker.updateBuildStats(attrHandler, bonusTrainingVariable, trainingPoints);
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}

	updateTrainingPoints(attributeHandler) {
		let worker = this;
		attributeHandler.addMod(worker.attrMax);
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(WuxDef.GetVariable("BonusTraining"));
		attributeHandler.addMod(WuxDef.GetVariable("Level"));

		let manager = new WuxWorkerBuildManager(["Technique"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			Debug.Log(`Updating ${worker.attrMax} to ${attributeHandler.parseInt(worker.attrMax)}`);

			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, worker.attrMax, attributeHandler.parseInt(worker.attrMax));
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}

	changeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
		let worker = this;

		attributeHandler.addMod(worker.attrMax);
		attributeHandler.addMod(worker.attrBuildDraft);

		let manager = new WuxWorkerBuildManager(["Technique"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, updatingAttr, newValue);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}
}

class WuxJobWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Job");
	}

	setBuildStatsDraft(attributeHandler) {
		super.setBuildStatsDraft(attributeHandler);
		this.initializeData();
	}

	setBuildStatsFinal(attrHandler) {
		super.setBuildStatsFinal(attrHandler);
		this.initializeData();
	}

	initializeData() {

	}

	getStyles() {
		let styleData = [];
		this.iterateBuildStats(function (jobVariableData) {
			let style = WuxStyles.GetByVariableName(jobVariableData.name);
			let rank = jobVariableData.value;
			if (rank == "on" && style != undefined) {
				styleData.push({style: style, rank: 1});
			}
		});
		return styleData;
	}
}

class StyleWorkerBuildStat extends WorkerBuildStat {
	importJson(json) {
		super.importJson(json);
		this.group = json.group;
	}

	importSheets(dataArray) {
		let i = 0;
		this.name = "" + dataArray[i];
		i++;
		this.value = "" + dataArray[i];
		i++;
		this.group = "" + dataArray[i];
		i++;
	}

	createEmpty() {
		super.createEmpty();
		this.group = "";
	}
}

class StyleWorkerBuildStats extends WorkerBuildStats {
	constructor() {
		super();
	}

	getPointsTotal() {
		if (this.keys == undefined) {
			return 0;
		}
		let points = 0;
		for (let i = 0; i < this.keys.length; i++) {
			let val = this.values[this.keys[i]];
			if (val.group != "Style") {
				continue;
			}
			if (val.value == "on") {
				points++;
				continue;
			}
			points += isNaN(parseInt(val.value)) ? 0 : parseInt(val.value);
		}
		return points;
	}
}

class WuxStyleWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Technique");
		this.styledTechniqueData = {};
		this.basicTechniqueData = {};
	}
	
	setBuildStatsDraft(attributeHandler) {
		super.setBuildStatsDraft(attributeHandler);
		this.initializeData();
	}

	setBuildStatsFinal(attrHandler) {
		super.setBuildStatsFinal(attrHandler);
		this.initializeData();
	}

	initializeData() {
		let worker = this;
		this.iterateBuildStats(function (techniqueVariableData) {
			// Entries in this build-stats blob are keyed inconsistently depending on how they
			// were written: rankTechnique() (Worker-Actions.js) stores by attribute variable
			// name, while learning a style (TechniqueInspectionPopup.performAddItem in
			// Worker-InspectPopup.js) stores by the technique's plain display name. Try both.
			let technique = WuxTechs.GetByVariableName(techniqueVariableData.name);
			if (technique == undefined) {
				technique = WuxTechs.Get(techniqueVariableData.name);
			}
			if (technique == undefined) {
				return;
			}
			let rank = parseInt(techniqueVariableData.value);
			if (isNaN(rank)) {
				rank = 1;
			}
			if (technique.techSet == "Basic") {
				worker.basicTechniqueData[technique.name] = {technique: technique, rank: rank};
				return;
			}
			if (rank > 0) {
				worker.styledTechniqueData[technique.name] = {technique: technique, rank: rank};
			}
		});
	}

	setBuildStats(buildStatVersion, attributeHandler) {
		this.buildStats = new StyleWorkerBuildStats();
		this.buildStats.import(attributeHandler.parseJSON(buildStatVersion));
	}

	addBuildStat(attributeHandler, updatingAttr, newValue) {
		let workerBuildStat = new StyleWorkerBuildStat([updatingAttr, newValue.value, newValue.group]);
		this.buildStats.add(updatingAttr, workerBuildStat);
	}

	changeWorkerAttribute(attributeHandler, updatingAttr, value, group) {
		let newValue = {value: value, group: group};
		super.changeWorkerAttribute(attributeHandler, updatingAttr, newValue);
	}

	getBuildVariables() {
		return WuxTechs.GetKeys();
	}
	
	getTechniques() {
		let techniques = [];
		for (let key in this.styledTechniqueData) {
			techniques.push(this.styledTechniqueData[key].technique);
		}
		return techniques;
	}

	getAllStyleTechniqueData() {
		return this.styledTechniqueData;
	}

	getAllBasicTechniqueData() {
		return this.basicTechniqueData;
	}

	getTechniqueData(techniqueName) {
		// Rank is shared across variants and always stored under the base technique's
		// name - a true variant must always defer to its root's entry, checked before
		// any direct match. Otherwise a variant that ever got ranked independently
		// before rank-sharing existed would keep reading its own stale entry forever,
		// since a direct match would always win over falling back to the root.
		let technique = WuxTechs.Get(techniqueName);
		if (technique != undefined) {
			let rootName = technique.getRootName();
			if (rootName != techniqueName) {
				return this.getTechniqueData(rootName);
			}
		}
		if (this.styledTechniqueData.hasOwnProperty(techniqueName)) {
			return this.styledTechniqueData[techniqueName];
		}
		if (this.basicTechniqueData.hasOwnProperty(techniqueName)) {
			return this.basicTechniqueData[techniqueName];
		}
		return undefined;
	}

	getStyles() {
		let techniques = [];
		for (let key in this.styledTechniqueData) {
			let technique = this.styledTechniqueData[key].technique;
			if (technique.techSet == "Style") {
				techniques.push(this.styledTechniqueData[key].technique);
			}
		}
		return techniques;
	}
}

class WuxAttributeWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Attribute");
	}

	updatePoints(attributeHandler, perkCost) {
		let buildPoints = this.getPointsTotal();
		let buildPointsMax = attributeHandler.parseInt(this.attrMax);

		attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
		attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
	}

	getPointsTotal() {
		let points = 0;
		let hasSubtracted = false;
		if (this.buildStats.keys == undefined) {
			return points;
		}
		for (let i = 0; i < this.buildStats.keys.length; i++) {
			if (this.buildStats.values[this.buildStats.keys[i]].value == "on") {
				points++;
			} else {
				let value = parseInt(this.buildStats.values[this.buildStats.keys[i]].value);
				if (!isNaN(value)) {
					if (value >= 0) {
						points += value;
					} else if (!hasSubtracted) {
						hasSubtracted = true;
						points += value;
					}

				}
			}
		}
		return points;
	}
}

class WuxPerkWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Perk");
	}

	changeWorkerAttribute(attributeHandler, updatingAttr, rank, perkCost) {
		// Write the computed stat value (rank × increase) to the perk's variable
		attributeHandler.addUpdate(updatingAttr, rank);
		// Track rank × cost in build stats so perk point totals stay accurate
		super.changeWorkerAttribute(attributeHandler, updatingAttr, rank * perkCost);
	}

	changeCostOnly(attributeHandler, updatingAttr, cost) {
		super.changeWorkerAttribute(attributeHandler, updatingAttr, cost);
	}

	updatePoints(attributeHandler) {
		let buildPoints = this.getPointsTotal();
		let buildPointsMax = attributeHandler.parseInt(this.attrMax);

		attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
		attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
	}

	getPointsTotal() {
		let points = 0;
		if (this.buildStats.keys == undefined) {
			return points;
		}
		for (let i = 0; i < this.buildStats.keys.length; i++) {
			let val = this.buildStats.values[this.buildStats.keys[i]].value;
			points += isNaN(parseInt(val)) ? 0 : parseInt(val);
		}
		return points;
	}

	getBuildVariables() {
		let variables = [];
		WuxPerks.Iterate(function (perk) {
			variables.push(new PerkData(perk).createDefinition(WuxDef.Get("Perk")).getVariable());
		});
		return variables;
	}

	setBuildStatVariables(attributeHandler) {
		this.buildStats.iterate(function (buildStat) {
			let perk = WuxPerks.GetByVariableName(buildStat.name);
			if (perk && perk.group === "Branch Perks") {
				attributeHandler.addUpdate(buildStat.name, parseInt(buildStat.value) > 0 ? "on" : "0");
			} else {
				attributeHandler.addUpdate(buildStat.name, buildStat.value);
			}
		});
	}

	getBoostTechniques() {
		let techniques = [];
		this.iterateBuildStats(function (techniqueVariableData) {
			let technique = WuxTechs.GetByVariableName(techniqueVariableData.name);
			if (technique == undefined) {
				return;
			}
			if (technique.forms.includes("Permanent")) {
				return;
			}
			let rank = techniqueVariableData.value;
			if (rank != "0") {
				techniques.push(technique);
			}
		});
		return techniques;
	}

	getPermanentTechniques() {
		let techniques = [];
		this.iterateBuildStats(function (techniqueVariableData) {
			let technique = WuxTechs.GetByVariableName(techniqueVariableData.name);
			if (technique == undefined) {
				return;
			}
			if (!technique.forms.includes("Permanent")) {
				return;
			}
			let rank = techniqueVariableData.value;
			if (rank != "0") {
				techniques.push(technique);
			}
		});
		return techniques;
	}

	getPerkTechniques() {
		let techniques = [];
		this.iterateBuildStats(function (perkVariableData) {
			let perk = WuxPerks.GetByVariableName(perkVariableData.name);
			if (perk == undefined) return;
			if (perk.group !== "Perk Technique") return;
			if (perkVariableData.value == "0" || perkVariableData.value == 0) return;
			let technique = WuxTechs.Get(perk.name);
			if (technique != undefined) {
				techniques.push(technique);
			}
		});
		return techniques;
	}
}

class WuxSkillWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Skill");
	}

	cleanBuildStats() {
		this.removeUnrankedExpertises();
		super.cleanBuildStats();
	}

	updatePoints(attributeHandler) {
		this.removeUnrankedExpertises();
		super.updatePoints(attributeHandler);
	}

	removeUnrankedExpertises() {
		let i = 0;
		while (i < this.buildStats.keys.length) {
			let key = this.buildStats.keys[i];
			if (key == undefined) {
				return;
			}
			if (key.endsWith(WuxDef._expertise)) {
				// this might be a key we need to delete. Search for the base form of the key
				let baseSkillRank = key.split(WuxDef._expertise)[0] + WuxDef._rank;
				if (!this.buildStats.keys.includes(baseSkillRank) || this.buildStats.values[baseSkillRank].value == "0") {
					this.buildStats.keys.splice(i, 1);
					delete this.buildStats.values[key];
				}
				else {
					i++;
				}
			}
			else {
				i++;
			}
		}
	}
}

class WuxLoreWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Lore");
	}
}

class DatabaseItemAttributeHandler {
	constructor(attrHandler, baseDefinitionName, baseSuffix) {
		this.attrHandler = attrHandler;
		this.baseDefinitionName = baseDefinitionName;
		this.baseDefinition = baseDefinitionName != undefined ? WuxDef.Get(baseDefinitionName) : undefined;
		this.baseSuffix = baseSuffix;
		this.repeater = undefined;
		this.id = "";
	}
	
	setRepeaterData(repeater, id) {
		this.repeater = repeater;
		this.id = id != undefined ? id : "";
	}
	
	setBaseSuffix(baseSuffix) {
		this.baseSuffix = baseSuffix;
	}
	
	setId (id) {
		this.id = id;
	}

	getVariable (key, suffix) {
		let output = WuxDef.GetVariable(key, suffix, this.baseSuffix);
		if (this.baseDefinition != undefined) {
			output = this.baseDefinition.getVariable(`-${output}`);
		}
		if (this.repeater != undefined) {
			output = this.repeater.getFieldName(this.id, output);
		}
		return output;
	};

	getVariableWithoutBase (key, suffix) {
		let output = WuxDef.GetVariable(key, suffix);
		if (this.repeater != undefined) {
			output = this.repeater.getFieldName(this.id, output);
		}
		return output;
	};
	
	clearDefinition (baseAttribute, index) {
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable(baseAttribute, index), 0);
		for (let i = 0; i < 4; i++) {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable(baseAttribute, `${index}desc${i}`), 0);
		}
	};
	addDefinitions (definitionData, prefix, descriptionMaxIndex) {
		for (let i = 0; i < definitionData.length; i++) {
			let definition = definitionData[i];
			if (definition == undefined) {
				continue;
			}
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId, 
			`${prefix}${i}`, definition.getTitle());

			for (let j = 0; j < definition.descriptions.length; j++) {
				if (j <= descriptionMaxIndex) {
					this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId, 
			`${prefix}${i}desc${j}`, definition.descriptions[j]);
				} else {
					this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId, 
			`${prefix}${i}desc${descriptionMaxIndex}`, definition.descriptions[j]);
				}
			}
		}
	};
}

class TechniqueDataAttributeHandler extends DatabaseItemAttributeHandler {

	setTechniqueInfo (technique, setUse, variantOptions) {
		this.clearTechniqueInfo();
		let displayData = new TechniqueDisplayData(technique);

		this.setTechniqueHeaderInfo(technique, displayData);
		this.setTechniqueVariants(technique, variantOptions);
		this.setTechniqueEffectsInfo(technique, displayData);

		if (setUse) {
			this.setTechniqueUseRollTemplate(technique, displayData);
		}
	}
	// Entry point for the technique catalog (Worker-InspectPopup.js's
	// TechniqueInspectPopupAttributeHandler.setInventoryItemData and
	// swapCatalogTechniqueVariant) - layers the select section on top of the same
	// technique info every other context uses, without touching setTechniqueInfo
	// itself so the live Actions tab is unaffected. variantOptions is passed
	// straight through to setTechniqueInfo's own variant list rebuild - used by
	// swapCatalogTechniqueVariant with {excludeCurrent: true} so the variant just
	// swapped to drops out of its own button row. canSelect is whether the select
	// button should be shown for this row at all (see setTechniqueRequirement).
	setTechniqueCatalogInfo(technique, variantOptions, canSelect) {
		this.setTechniqueInfo(technique, false, variantOptions);
		this.setTechniqueRequirement(canSelect);
	}
	// TechRequirement is a catalog-only field (not part of the shared
	// clearTechniqueInfo reset, since that would touch the live Actions tab too) -
	// always written fresh here, so no separate clear step is needed. Its base
	// slot carries a row-scoped "can select" flag (not requirement text - that's
	// no longer shown per-card, see printCatalogRequirementSection, WuxGS-Base.js)
	// because Popup_InspectShowAdd can't be read directly from inside a repeating
	// section's HTML (Roll20 silently rescopes any field name referenced inside a
	// <fieldset class="repeating_x"> to a per-row attribute, even ones meant to be
	// global), so the caller (which CAN read it normally, outside any HTML
	// binding) computes and passes it in instead. The max slot remains the select
	// button's click target, same base+max pairing convention used by every other
	// paired Tech* field.
	setTechniqueRequirement(canSelect) {
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRequirement"), canSelect ? "1" : "0");
		// Select button click target - reset so a reused/regenerated row doesn't
		// carry over a stale selection from a previous technique.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRequirement", WuxDef._max), "0");
	}
	// Up to 6 variant slots (5 elements + Neutral) are packed two-per-attribute using
	// base+max, so only the single "TechVariant" definition is needed: pair 0 is the
	// plain attribute, pairs 1/2 use "1"/"2" as an extra suffix ahead of _max. Pair 3
	// (base only, no max) is a shared click trigger - each button submits its own slot
	// index (0-5) there, since a checkbox click would otherwise overwrite a display slot.
	getVariantFieldName(slotIndex) {
		let pairIndex = Math.floor(slotIndex / 2);
		let pairSuffix = pairIndex == 0 ? "" : `${pairIndex}`;
		return slotIndex % 2 == 1
			? this.getVariable("TechVariant", `${pairSuffix}${WuxDef._max}`)
			: this.getVariable("TechVariant", pairSuffix);
	}
	getVariantSelectFieldName() {
		return this.getVariable("TechVariant", "3");
	}
	// variantOptions (only passed by the FormeTechniques repeater's own callers - see
	// Worker-Actions.js - so other contexts like the Inspect Popup keep showing every
	// variant unfiltered):
	//   excludeCurrent        - drop the technique currently on display from its own button row.
	//   userAffinities        - drop variants the character can't use for lacking the affinity.
	//   precomputedCandidates - the technique's sibling variants, if the caller already
	//                           fetched them (WuxTechs.Filter(style=technique.name)) a
	//                           moment ago and doesn't want this method re-fetching an
	//                           identical result (see TechniqueInspectionPopup.open's
	//                           variantsByName, Worker-InspectPopup.js). Only used when
	//                           technique is already its own root - WuxTechs.Get/Filter
	//                           never cache, so every call reconstructs fresh objects.
	setTechniqueVariants(technique, variantOptions) {
		// Fixed per-element slot index rather than packing candidates sequentially from
		// 0: with only 2 members in a family, "the other one" would always land in slot
		// 0 regardless of which is currently active, so toggling back and forth submits
		// the same index twice in a row - Roll20 only fires change on an actual value
		// transition, so the second click would silently do nothing. A stable index per
		// element means switching either direction always changes the click field's value.
		let elementSlotIndex = {"Neutral": 0, "Wood": 1, "Fire": 2, "Earth": 3, "Metal": 4, "Water": 5};
		// Each slot holds "ElementName:TechniqueName" - the display builder's CSS reads
		// the ElementName prefix to pick the button's icon, and clicking a button reads
		// the TechniqueName half to switch which variant is being displayed. The slots
		// always represent the base technique plus every one of its sibling variants,
		// regardless of which of them is the one currently on display. excludeCurrent
		// is deliberately NOT applied here (see below, after slots are built) -
		// filtering the candidate pool before computing slots let Stage2/Stage3's
		// dynamic "first free slot" placement land on a different index depending on
		// which technique was excluded, so the same technique pair could end up
		// sharing an index from one viewing direction but not the other. Roll20 only
		// fires a change event when a button's submitted index actually differs from
		// the field's current value, so a coincidental index match made that
		// direction's click silently do nothing.
		let rootName = technique.getRootName();
		// technique is already the object WuxTechs.Get(rootName) would reconstruct
		// whenever it's already its own root (the common case for base styles) -
		// WuxTechs.Get/Filter never cache, so reusing the instance already in hand
		// avoids rebuilding an identical TechniqueData for no reason.
		let root = rootName === technique.name ? technique : WuxTechs.Get(rootName);
		let candidates = (variantOptions?.precomputedCandidates != undefined && rootName === technique.name)
			? [root].concat(variantOptions.precomputedCandidates)
			: [root].concat(WuxTechs.Filter(new DatabaseFilterData("style", rootName)));
		if (variantOptions?.userAffinities != undefined) {
			candidates = candidates.filter(tech => tech.hasRequiredAffinity(variantOptions.userAffinities));
		}
		let realElements = ["Wood", "Fire", "Earth", "Metal", "Water"];
		let slots = [0, 0, 0, 0, 0, 0];
		// A variant with no affinity or all 5 affinities is conceptually "neutral"
		// too (usable with anything), but only one candidate can occupy the actual
		// Neutral slot - the root always claims it (see below), so any other such
		// candidate is queued here and placed into a leftover slot afterward as
		// Stage2, then Stage3 (WCSS-Specialized.css renders these as a
		// progressively darker Neutral icon with a "II"/"III" badge).
		let universalCandidates = [];
		candidates.forEach(tech => {
			// The root's own affinity states what's required to USE it, not which
			// slot it occupies as a variant - some root techniques list every
			// element to mean "usable with any of them" (not 5 separate variant
			// forms), which would otherwise fill every element slot with the root
			// itself. The root always represents the neutral/base slot in the
			// switcher regardless of its own affinity requirement.
			if (tech.name == rootName) {
				slots[elementSlotIndex["Neutral"]] = `Neutral:${tech.name}`;
				return;
			}
			let affinityParts = tech.getAffinityParts();
			let isUniversal = (affinityParts.length === 1 && affinityParts[0] === "Neutral")
				|| realElements.every(element => affinityParts.includes(element));
			if (isUniversal) {
				universalCandidates.push(tech);
				return;
			}
			affinityParts.forEach(part => {
				slots[elementSlotIndex[part]] = `${part}:${tech.name}`;
			});
		});
		let stageNames = ["Stage2", "Stage3"];
		let stageIndex = 0;
		for (let i = 0; i < slots.length && stageIndex < universalCandidates.length && stageIndex < stageNames.length; i++) {
			if (slots[i] === 0) {
				slots[i] = `${stageNames[stageIndex]}:${universalCandidates[stageIndex].name}`;
				stageIndex++;
			}
		}

		// Now that every OTHER slot's position is settled, drop the technique
		// already on display from its own slot (see the comment above candidates)
		// without disturbing where anything else landed.
		if (variantOptions?.excludeCurrent) {
			let currentIndex = slots.findIndex(slot => slot !== 0 && slot.substring(slot.indexOf(":") + 1) == technique.name);
			if (currentIndex !== -1) {
				slots[currentIndex] = 0;
			}
		}

		for (let i = 0; i < 6; i++) {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariantFieldName(i), slots[i]);
		}
	}
	setTechniqueHeaderInfo(technique, displayData) {
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTrueName"), technique.name);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechName"), displayData.name);
		// Version is piggybacked onto TechName's max slot instead of its own attribute,
		// to cut down the variable count per repeater row (same trick as TechEnCost/Will above).
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechName", WuxDef._max), technique.version);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechActionType"), displayData.actionType);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechActionName"), displayData.actionName);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechActionName", WuxDef._max), displayData.getActionsDescriptions("\n"));
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechEnCost"), displayData.enCost);
		// Will cost is piggybacked onto TechEnCost's max slot (Roll20 allocates a max value
		// for every attribute regardless of whether it's used) instead of its own attribute,
		// to cut down the variable count per repeater row.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechEnCost", WuxDef._max), displayData.willCost);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTargetType"), displayData.targetType);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTargetType", WuxDef._max), displayData.getTargetDescriptions("\n"));
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRange"), displayData.range);
		if (displayData.trigger != "") {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRange", WuxDef._max), displayData.trigger);
		}
		if (displayData.traits != "") {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechTraits"), displayData.traits);
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechTraits", WuxDef._max), displayData.getTraitsDescriptions("\n"));
		}
	}
	setTechniqueEffectsInfo(technique, displayData) {
		if (displayData.flavorText != "") {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechFlavorText"), displayData.flavorText);
		}
		if (displayData.coreEffect != "") {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechCoreEffect"), displayData.getCoreEffects("\n"));
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechCoreEffect", WuxDef._max), displayData.getCoreEffectTooltips("\n"));
		}
		if (displayData.isOnEnter) {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechOnEnter"), "1");
		}
		if (displayData.checkEffect != "") {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechCoreDefense"), displayData.coreDefense);
			// Check title text is piggybacked onto TechCoreDefense's max slot.
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechCoreDefense", WuxDef._max), displayData.checkType);
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechCheckEffect"), displayData.getCheckEffects("\n"));
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechCheckEffect", WuxDef._max), displayData.getCheckEffectTooltips("\n"));
		}
		if (displayData.endEffectDesc != "") {
			// End effect text is piggybacked onto TechFlavorText's max slot.
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechFlavorText", WuxDef._max), displayData.endEffectDesc);
		}
		if (displayData.willBreakEffect != "") {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechWillBreakEffect"), displayData.getWillBreakEffects("\n"));
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechWillBreakEffect", WuxDef._max), displayData.getWillBreakEffectTooltips("\n"));
		}
		if (displayData.enhanceEffect != "") {
			// Enhance effect text is piggybacked onto TechOnEnter's max slot.
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariable("TechOnEnter", WuxDef._max), displayData.getEnhanceEffects("\n"));
			this.setTechniqueRankButtons(technique);
		}
	}
	setTechniqueRankButtons(technique) {
		let cr = this.attrHandler.parseInt(WuxDef.GetVariable("CR"), 1);
		// Enabled flags are piggybacked onto the rank buttons' own max slots.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRankUp", WuxDef._max), (technique.rank < technique.getMaxRank(cr) ? "1" : "0"));
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRankDown", WuxDef._max), (technique.rank > 1 ? "1" : "0"));
	}
	setTechniqueUseRollTemplate(technique, displayData) {
		displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
		displayData.technique.displayname = displayData.displayname;

		if (this.attrHandler.parseString(WuxDef.GetVariable("FullName")) == "GenericOverride") {
			displayData.sheetname = `@{target|Pick a token|token_id}`;
			Debug.Log(`Setting ${displayData.name} sheetname to the generic override`);
		}
		else {
			displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
		}

		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId, 
			this.getVariableWithoutBase("Action_Use"), displayData.getRollTemplate(true));
	}
	clearTechniqueInfo () {
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTrueName"), 0);
		// Display-type header flag is piggybacked onto TechTrueName's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTrueName", WuxDef._max), "0");
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechName"), 0);
		// Version is piggybacked onto TechName's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechName", WuxDef._max), "");
		for (let i = 0; i < 6; i++) {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				this.getVariantFieldName(i), 0);
		}
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechActionType"), "");
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechActionName"), "");
		// Action tooltip is piggybacked onto TechActionName's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechActionName", WuxDef._max), "");
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechEnCost"), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechEnCost", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTargetType"), 0);
		// Target description is piggybacked onto TechTargetType's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTargetType", WuxDef._max), "");
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRange"), 0);
		// Trigger text is piggybacked onto TechRange's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRange", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTraits"), 0);
		// Traits description is piggybacked onto TechTraits's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTraits", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechFlavorText"), 0);
		// End effect text is piggybacked onto TechFlavorText's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechFlavorText", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechCoreEffect"), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechCoreEffect", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechOnEnter"), 0);
		// Enhance effect text is piggybacked onto TechOnEnter's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechOnEnter", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechCoreDefense"), 0);
		// Check title text is piggybacked onto TechCoreDefense's max slot.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechCoreDefense", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechCheckEffect"), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechCheckEffect", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechWillBreakEffect"), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechWillBreakEffect", WuxDef._max), 0);
		// Rank up/down enabled flags are piggybacked onto the rank buttons' own max slots.
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRankUp", WuxDef._max), 0);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechRankDown", WuxDef._max), 0);
	}
	setHeaderInfo(headerKey, headerText) {
		this.clearTechniqueInfo();
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTrueName"), headerKey);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechTrueName", WuxDef._max), "1");
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechName"), headerText);
		this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
			this.getVariable("TechName", WuxDef._max), "1.0");
	}
	
	calcAndSetVisibility(affinities, maxTier, cr) {
		let tier = this.attrHandler.parseInt(this.getVariable("TechTier"));
		if (cr == undefined) {
			cr = this.attrHandler.parseInt(WuxDef.GetVariable("CR"));
		}
		
		if (tier > cr || tier > maxTier) {
			this.setVisibilityAttribute(false);
			return false;
		}

		let affinity = this.attrHandler.parseString(this.getVariable("TechAffinity"));
		if (affinity.includes(";")) {
			let affinityParts = affinity.split(";").map(s => s.trim());
			if (affinity != "" && !affinityParts.some(part => affinities.includes(part))) {
				
				this.setVisibilityAttribute(false);
				return false;
			}
		}
		else if (affinity != "" && !affinities.includes(affinity)) {
			this.setVisibilityAttribute(false);
			return false;
		}
		this.setVisibilityAttribute(true);
		return true;
	}
	setVisibilityAttribute (isVisible) {
		// IsVisible is piggybacked onto TechActionType's max slot.
		let fieldName = this.getVariable("TechActionType", WuxDef._max);
		let visibilityValue = isVisible ? "1" : "0";
		if (this.repeater == undefined) {
			this.attrHandler.addUpdate(fieldName, visibilityValue);
		}
		else {
			this.attrHandler.addRepeatingSectionRowUpdate(this.repeater?.definitionId,
				fieldName, visibilityValue);
		}
	}
	getTechniqueName() {
		return this.attrHandler.parseString(this.getVariable("TechTrueName"));
	}
	getTechniqueVersion() {
		let version = this.attrHandler.parseString(this.getVariable("TechName", WuxDef._max), "undefined");
		if (version == "undefined") {
			return undefined;
		}
		return version;
	}
}

class ItemDataAttributeHandler extends DatabaseItemAttributeHandler {

	setItemInfo (item) {
		this.clearItemInfo();
		this.setSharedItemInfo(item);

		// set the technique info
		let techData = new TechniqueDataAttributeHandler(this.attrHandler, this.baseDefinitionName, this.baseSuffix);
		techData.setRepeaterData(this.repeater, this.id);
		if (item.itemType == "UsableItem" && item.hasTechnique) {
			techData.setTechniqueInfo(item.technique);
		} else {
			techData.clearTechniqueInfo();
		}
	}
	// Same item-field population as setItemInfo, but skips its internal
	// technique write entirely - for callers (ItemInspectPopupAttributeHandler.
	// setInventoryItemData, Worker-InspectPopup.js) that populate the technique
	// block themselves via their own TechniqueDataAttributeHandler call right
	// after, with excludeCurrent/userAffinities options setItemInfo's internal
	// call never passes. Without this, every technique-bearing item paid for
	// the full technique computation (header/effects writes plus a
	// WuxTechs.Filter() variant lookup) TWICE per row - once here, unfiltered
	// and immediately discarded, then again correctly by the caller.
	setItemInfoWithoutTechnique (item) {
		this.clearItemInfo();
		this.setSharedItemInfo(item);
	}
	setGoodsInfo (item) {
		this.clearItemInfo();
		this.setSharedItemInfo(item);
		let techData = new TechniqueDataAttributeHandler(this.attrHandler);
		techData.clearTechniqueInfo();
		this.attrHandler.addUpdate(this.getVariable("ItemPerFive"), "on");
	}
	setSharedItemInfo (item) {
		let displayData = new ItemDisplayData(item);

		this.attrHandler.addUpdate(this.getVariable("ItemName"), displayData.name);
		this.attrHandler.addUpdate(this.getVariable("ItemGroup"), displayData.group);
		this.attrHandler.addUpdate(this.getVariable("ItemBulk"), displayData.bulk);
		this.attrHandler.addUpdate(this.getVariable("ItemBaseValue"), displayData.baseValue);

		if (displayData.description != "") {
			this.attrHandler.addUpdate(this.getVariable("ItemDescription"), displayData.description);
		}
		if (displayData.traits != "") {
			this.attrHandler.addUpdate(this.getVariable("ItemTrait"), displayData.traits);
			// Tooltip text is piggybacked onto ItemTrait's max slot instead of a separate attribute.
			this.attrHandler.addUpdate(this.getVariable("ItemTrait", WuxDef._max), displayData.getTraitsDescriptions("\n"));
		}
		if (displayData.craftData.length > 0) {
			this.attrHandler.addUpdate(this.getVariable("ItemCraft"), displayData.getCraftingDescriptions("\n"));
			// Tooltip text is piggybacked onto ItemCraft's max slot instead of a separate attribute.
			this.attrHandler.addUpdate(this.getVariable("ItemCraft", WuxDef._max), displayData.getCraftingTooltip("\n"));
		}
	}
	clearItemInfo () {
		this.attrHandler.addUpdate(this.getVariable("ItemName"), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemGroup"), "");
		this.attrHandler.addUpdate(this.getVariable("ItemBulk"), "");
		this.attrHandler.addUpdate(this.getVariable("ItemBaseValue"), "");
		this.attrHandler.addUpdate(this.getVariable("ItemDescription"), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemTrait"), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemTrait", WuxDef._max), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemCraft"), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemCraft", WuxDef._max), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemPerFive"), "0");
	}
}

class BasePopupAttributeHandler {
	constructor(attrHandler) {
		this.attrHandler = attrHandler;
	}

	show(popupTitleDefinitionName) {
		let popupName = WuxDef.GetTitle(popupTitleDefinitionName);
		this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_PopupActive"), "on");
		this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_PopupName"), popupName);
	}
	
	hide() {
		this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_PopupActive"), "0");
		this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_PopupName"), "0");
	}
}