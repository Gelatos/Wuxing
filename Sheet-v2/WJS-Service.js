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
		this.attributeHandler = attributeHandler;
	}

	async run() {
		let loadingScreenAttr = WuxDef.GetVariable("Loading");
		let update = {};
		update[loadingScreenAttr] = "1";
		await setAttrsAsync(update, {silent: true});
		await this.sleep(1000);

		await this.attributeHandler.run();
		
		update[loadingScreenAttr] = "0";
		await setAttrsAsync(update, {silent: true});
	}

	async sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

class WorkerAttributeHandler extends AttributeHandler {
	async run() {
		let attributeHandler = this;
		attributeHandler.current = await getAttrsAsync(attributeHandler.mods);
		
		attributeHandler.getCallbacks.forEach((callback) => {
			callback(attributeHandler);
		});
		await setAttrsAsync(attributeHandler.update, {silent: true});
		attributeHandler.finishCallbacks.forEach((callback) => {
			callback(attributeHandler);
		});
	}
}

class WorkerRepeatingSectionHandler extends RepeatingSectionHandler {

	generateRowId() {
		return generateRowID();
	}

	getIds(callback) {
		let repeater = this;
		getSectionIDs(this.repeatingSection, function (ids) {
			ids.forEach(function (id) {
				repeater.ids.push(id);
			});
			callback(repeater);
		});
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

	onChangeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
		this.iterate(function (worker) {
			worker.changeWorkerAttribute(attributeHandler, updatingAttr, newValue);
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

	updateBuildStats(attributeHandler, updatingAttr, newValue) {
		let workerBuildStat = new WorkerBuildStat([updatingAttr, newValue]);
		this.buildStats.add(updatingAttr, workerBuildStat);
		attributeHandler.addUpdate(this.attrBuildDraft, JSON.stringify(this.buildStats));
	}

	updateMaxBuildStats(attributeHandler, updatingAttr, newValue) {
		let workerBuildStat = new WorkerBuildStat([updatingAttr, newValue]);
		this.buildStats.add(updatingAttr, workerBuildStat);
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
		let advJobs = WuxDef.GetVariable("AdvancementJob");
		let advSkills = WuxDef.GetVariable("AdvancementSkill");
		let advTechs = WuxDef.GetVariable("AdvancementTechnique");

		if (this.buildStats.has(advJobs)) {
			buildPoints += this.buildStats.getIntValue(advJobs) * 2;
		}
		if (this.buildStats.has(advSkills)) {
			buildPoints += this.buildStats.getIntValue(advSkills) * 2;
		}
		if (this.buildStats.has(advTechs)) {
			buildPoints += this.buildStats.getIntValue(advTechs);
		}
		let buildPointsMax = attributeHandler.parseInt(this.attrMax);

		attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
		attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
	}

	getBuildVariables() {
		return [WuxDef.GetVariable("Level"), WuxDef.GetVariable("XP"),
			WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("AdvancementSkill"), WuxDef.GetVariable("AdvancementTechnique")];
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

		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Style", "Attribute", "Perk"]);
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
	}

	updateAdvancementPoints(attributeHandler) {
		let worker = this;
		attributeHandler.addMod(worker.attrMax);
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(WuxDef.GetVariable("Level"));

		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Style", "Attribute", "Perk"]);
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
		attributeHandler.addMod(xpDefinition.getVariable());
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(worker.attrBuildFinal);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsFinal(attrHandler);
			let level = worker.buildStats.get(WuxDef.GetVariable("Level")).value;
			let xp = attrHandler.parseInt(xpDefinition.getVariable());
			let xpNeeded = xpDefinition.formula.getValue(attrHandler);

			worker.setBuildStatsDraft(attrHandler);

			while (xp >= xpNeeded) {
				level++;
				xp -= xpNeeded;
			}
			attrHandler.addUpdate(xpDefinition.getVariable(), xp);

			let attributeHandler2 = new WorkerAttributeHandler();
			worker.updateBuildStats(attributeHandler2, xpDefinition.getVariable(), xp);
			worker.updateLevel(attributeHandler2, WuxDef.GetVariable("Level"), level);
			attributeHandler2.run();
		});
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
		let advKnowledge = WuxDef.GetVariable("TrainingKnowledge");
		let advTechs = WuxDef.GetVariable("TrainingTechniques");

		if (this.buildStats.has(advKnowledge)) {
			Debug.Log(`adding ${this.buildStats.getIntValue(advKnowledge)} to buildPoints`);
			buildPoints += this.buildStats.getIntValue(advKnowledge);
		}
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
			WuxDef.GetVariable("TrainingKnowledge"), WuxDef.GetVariable("TrainingTechniques")];
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

		let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
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

		let manager = new WuxWorkerBuildManager(["Knowledge", "Style"]);
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

		let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, updatingAttr, newValue);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}
}

class WuxStyleWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Style");
	}

	changeWorkerAttribute(attributeHandler, updatingAttr, newValue, perkCost) {
		if (newValue == "on" && perkCost > 0) {
			newValue = perkCost;
		}
		super.changeWorkerAttribute(attributeHandler, updatingAttr, newValue);
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

	changeWorkerAttribute(attributeHandler, updatingAttr, newValue, perkCost) {
		if (newValue == "on" && perkCost > 0) {
			newValue = perkCost;
		}
		super.changeWorkerAttribute(attributeHandler, updatingAttr, newValue);
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
			if (this.buildStats.values[this.buildStats.keys[i]].value != "on") {
				// "on" is effectively 0 points 
				points += isNaN(parseInt(this.buildStats.values[this.buildStats.keys[i]].value)) ? 0 : parseInt(this.buildStats.values[this.buildStats.keys[i]].value);
			}
		}
		return points;
	}
}

class DatabaseItemAttributeHandler {
	constructor(attrHandler, baseDefinitionName, repeater, id) {
		this.attrHandler = attrHandler;
		this.baseDefinitionName = baseDefinitionName;
		this.baseDefinition = baseDefinitionName != undefined ? WuxDef.Get(baseDefinitionName) : undefined;
		this.repeater = repeater != undefined ? repeater : undefined;
		this.id = id != undefined ? id : "";
	}
	
	setId (id) {
		this.id = id;
	}

	getVariable (key, suffix) {
		let output = WuxDef.GetVariable(key, suffix);
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
		this.attrHandler.addUpdate(this.getVariable(baseAttribute, index), 0);
		this.attrHandler.addUpdate(this.getVariable(baseAttribute, `${index}desc0`), 0);
		this.attrHandler.addUpdate(this.getVariable(baseAttribute, `${index}desc1`), 0);
		this.attrHandler.addUpdate(this.getVariable(baseAttribute, `${index}desc2`), 0);
	};
	addDefinitions (definitionData, prefix, descriptionMaxIndex) {
		for (let i = 0; i < definitionData.length; i++) {
			this.attrHandler.addUpdate(`${prefix}${i}`, definitionData[i].getTitle());

			for (let j = 0; j < definitionData[i].descriptions.length; j++) {
				if (j <= descriptionMaxIndex) {
					this.attrHandler.addUpdate(`${prefix}${i}desc${j}`, definitionData[i].descriptions[j]);
				} else {
					this.attrHandler.addUpdate(`${prefix}${i}desc${descriptionMaxIndex}`, definitionData[i].descriptions[j]);
				}
			}
		}
	};
}

class TechniqueDataAttributeHandler extends DatabaseItemAttributeHandler {
	
	setTechniqueInfo (technique, setUse) {
		this.clearTechniqueInfo();

		let displayData = new TechniqueDisplayData(technique);
		this.attrHandler.addUpdate(this.getVariable("TechName"), displayData.name);
		this.attrHandler.addUpdate(this.getVariable("TechAffinity"), technique.affinity);
		this.attrHandler.addUpdate(this.getVariable("TechTier"), technique.tier);
		this.attrHandler.addUpdate(this.getVariable("TechActionType"), displayData.actionType);
		this.attrHandler.addUpdate(this.getVariable("TechResourceData"), displayData.resourceData);
		this.attrHandler.addUpdate(this.getVariable("TechTargetingData"), displayData.targetData);
		if (displayData.traits.length > 0) {
			this.addDefinitions(displayData.traits, this.getVariable("TechTrait"), 3);
		}

		if (displayData.trigger != "") {
			this.attrHandler.addUpdate(this.getVariable("TechTrigger"), displayData.trigger);
		}
		if (displayData.requirements != "") {
			this.attrHandler.addUpdate(this.getVariable("TechRequirements"), displayData.requirements);
		}
		if (displayData.itemTraits.length > 0) {
			this.addDefinitions(displayData.itemTraits, this.getVariable("TechItemReq"), 2);
		}
		if (displayData.flavorText != "") {
			this.attrHandler.addUpdate(this.getVariable("TechFlavorText"), displayData.flavorText);
		}
		if (displayData.effects.length > 0) {
			this.addTechniqueEffects(displayData.effects, "TechEffect");
		}
		if (displayData.secondaryEffectName.trim() != "") {
			let defName = Format.GetDefinitionName("Title", displayData.secondaryEffectName);
			let def = WuxDef.Get(defName);
			this.attrHandler.addUpdate(this.getVariable("TechSEffectTitle", "name"), def.getTitle());
			this.attrHandler.addUpdate(this.getVariable("TechSEffectTitle", "desc"), def.getDescription());
		}
		if (displayData.secondaryEffectDesc != "") {
			this.attrHandler.addUpdate(this.getVariable("TechSEffectTitle"), displayData.secondaryEffectDesc);
		}
		if (displayData.secondaryEffects.length > 0) {
			this.addTechniqueEffects(displayData.secondaryEffects, "TechSEffect");
		}
		if (displayData.endEffectName.trim() != "") {
			let defName = Format.GetDefinitionName("Title", displayData.endEffectName);
			let def = WuxDef.Get(defName);
			this.attrHandler.addUpdate(this.getVariable("TechEEffectTitle", "name"), def.getTitle());
			this.attrHandler.addUpdate(this.getVariable("TechEEffectTitle", "desc"), def.getDescription());
		}
		if (displayData.endEffectDesc != "") {
			this.attrHandler.addUpdate(this.getVariable("TechEEffectTitle"), displayData.endEffectDesc);
		}
		if (displayData.definitions.length > 0) {
			this.addDefinitions(displayData.definitions, this.getVariable("TechDef"), 3);
		}
		
		if (setUse) {
			displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
			displayData.technique.displayname = displayData.displayname;
			
			if (this.attrHandler.parseString(WuxDef.GetVariable("FullName")) == "GenericOverride") {
				displayData.sheetname = `@{target|Pick a token|token_id}`;
				Debug.Log(`Setting ${displayData.name} sheetname to the generic override`);
			}
			else {
				displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
			}
			
			this.attrHandler.addUpdate(this.getVariableWithoutBase("Action_Use"), displayData.getRollTemplate(true));
		}
	}
	addTechniqueEffects (effects, attribute) {
		let incrementer = 0;
		let attrSetter = this;
		effects.forEach(function (effect) {
			if (effect.check != undefined) {
				attrSetter.attrHandler.addUpdate(attrSetter.getVariable(attribute, `${incrementer}name`), effect.check);
				attrSetter.attrHandler.addUpdate(attrSetter.getVariable(attribute, `${incrementer}desc`), effect.checkDescription);

				if (effect.effects != undefined) {
					effect.effects.forEach(function (desc) {
						if (desc != undefined) {
							attrSetter.attrHandler.addUpdate(attrSetter.getVariable(attribute, `${incrementer}`), desc);
							incrementer++;
						}
					});
				}
				incrementer++;
			}
		});
	}
	clearTechniqueInfo () {
		this.attrHandler.addUpdate(this.getVariable("TechActionType"), "");
		this.attrHandler.addUpdate(this.getVariable("TechName"), 0);
		this.attrHandler.addUpdate(this.getVariable("TechDisplayName"), "");
		this.attrHandler.addUpdate(this.getVariable("TechAffinity"), "");
		this.attrHandler.addUpdate(this.getVariable("TechTier"), 0);
		this.attrHandler.addUpdate(this.getVariable("TechResourceData"), "");
		this.attrHandler.addUpdate(this.getVariable("TechTargetingData"), "");
		this.clearDefinition("TechTrait", 0);
		this.clearDefinition("TechTrait", 1);
		this.clearDefinition("TechTrait", 2);
		this.clearDefinition("TechTrait", 3);
		this.attrHandler.addUpdate(this.getVariable("TechTrigger"), 0);
		this.attrHandler.addUpdate(this.getVariable("TechRequirements"), 0);
		this.clearDefinition("TechItemReq", 0);
		this.clearDefinition("TechItemReq", 1);
		this.clearDefinition("TechItemReq", 2);
		this.attrHandler.addUpdate(this.getVariable("TechFlavorText"), 0);
		this.clearTechEffects();
		this.clearDefinition("TechDef", 0);
		this.clearDefinition("TechDef", 1);
		this.clearDefinition("TechDef", 2);
		this.clearDefinition("TechDef", 3);
		this.attrHandler.addUpdate(this.getVariable("TechSEffectTitle", "name"), 0);
		this.attrHandler.addUpdate(this.getVariable("TechSEffectTitle", "desc"), 0);
		this.attrHandler.addUpdate(this.getVariable("TechSEffectTitle", ""), 0);
		this.attrHandler.addUpdate(this.getVariable("TechEEffectTitle", "name"), 0);
		this.attrHandler.addUpdate(this.getVariable("TechEEffectTitle", "desc"), 0);
		this.attrHandler.addUpdate(this.getVariable("TechEEffectTitle", ""), 0);
	}
	clearTechEffects () {
		for (let i = 0; i < 10; i++) {
			this.attrHandler.addUpdate(this.getVariable("TechEffect", i), 0);
			this.attrHandler.addUpdate(this.getVariable("TechEffect", `${i}name`), 0);
			this.attrHandler.addUpdate(this.getVariable("TechEffect", `${i}desc`), "");
			this.attrHandler.addUpdate(this.getVariable("TechSEffect", i), 0);
			this.attrHandler.addUpdate(this.getVariable("TechSEffect", `${i}name`), 0);
			this.attrHandler.addUpdate(this.getVariable("TechSEffect", `${i}desc`), "");
		}
	}
	calcAndSetVisibility(affinities, maxTier) {
		let tier = this.attrHandler.parseInt(this.getVariable("TechTier"));
		let cr = this.attrHandler.parseInt(WuxDef.GetVariable("CR"));
		
		if (tier > cr || tier > maxTier) {
			this.setVisibilityAttribute(false);
			return;
		}

		let affinity = this.attrHandler.parseString(this.getVariable("TechAffinity"));
		if (affinity.includes(";")) {
			let affinityParts = affinity.split(";").map(s => s.trim());
			if (affinity != "" && !affinityParts.some(part => affinities.includes(part))) {
				this.setVisibilityAttribute(false);
				return;
			}
		}
		if (affinity != "" && !affinities.includes(affinity)) {
			this.setVisibilityAttribute(false);
			return;
		}
		this.setVisibilityAttribute(true);
	}
	setVisibilityAttribute (isVisible) {
		this.attrHandler.addUpdate(this.getVariable("TechIsVisible"), isVisible ? "1" : "0");
	}
}

class ItemDataAttributeHandler extends DatabaseItemAttributeHandler {

	setItemInfo (item) {
		this.clearItemInfo();
		this.setSharedItemInfo(item);

		// set the technique info
		let techData = new TechniqueDataAttributeHandler(this.attrHandler, this.baseDefinitionName, this.repeater, this.id);
		if (item.itemType == "UsableItem" && item.hasTechnique) {
			techData.setTechniqueInfo(item.technique);
		} else {
			techData.clearTechniqueInfo();
		}
	}
	setGoodsInfo (item) {
		this.clearItemInfo();
		this.setSharedItemInfo(item);
		let techData = new TechniqueDataAttributeHandler(this.attrHandler);
		techData.clearTechniqueInfo();
	}
	setSharedItemInfo (item) {
		let displayData = new ItemDisplayData(item);
		Debug.Log(`Setting item info for ${displayData.name}`);

		this.attrHandler.addUpdate(this.getVariable("ItemName"), displayData.name);
		this.attrHandler.addUpdate(this.getVariable("ItemGroup"), displayData.group);
		this.attrHandler.addUpdate(this.getVariable("ItemStats"), displayData.stats);

		if (displayData.traits.length > 0) {
			this.addDefinitions(displayData.traits, this.getVariable("ItemTrait"), 3);
		}
		if (displayData.description != "") {
			this.attrHandler.addUpdate(this.getVariable("ItemDescription"), displayData.description);
		}
		if (displayData.craftSkill != "") {
			this.attrHandler.addUpdate(this.getVariable("ItemCraftSkill"), displayData.craftSkill);
		}
		if (displayData.craftMaterials != "") {
			this.attrHandler.addUpdate(this.getVariable("ItemCraftMats"), displayData.craftMaterials);
		}
		if (displayData.craftComponents.length > 0) {
			for (let i = 0; i < displayData.craftComponents.length; i++) {
				let component = displayData.craftComponents[i];
				this.attrHandler.addUpdate(WuxDef.GetVariable(`Popup_ItemCraft`, i), component.name);
				this.attrHandler.addUpdate(WuxDef.GetVariable(`Popup_ItemCraft`, i + "desc0"), component.desc);
			}
		}
	}
	clearItemInfo () {
		this.attrHandler.addUpdate(this.getVariable("ItemName"), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemGroup"), "");
		this.attrHandler.addUpdate(this.getVariable("ItemStats"), "");
		this.clearDefinition("ItemTrait", 0);
		this.clearDefinition("ItemCraft", 1);
		this.clearDefinition("ItemCraft", 2);
		this.clearDefinition("ItemCraft", 3);
		this.attrHandler.addUpdate(this.getVariable("ItemDescription"), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemCraftSkill"), 0);
		this.attrHandler.addUpdate(this.getVariable("ItemCraftMats"), "");
		this.clearDefinition("ItemCraft", 0);
		this.clearDefinition("ItemCraft", 1);
		this.clearDefinition("ItemCraft", 2);
		this.clearDefinition("ItemCraft", 3);
	}
}