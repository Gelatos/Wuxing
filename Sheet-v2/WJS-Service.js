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

class WorkerAttributeHandler extends AttributeHandler {
	run() {
		let attributeHandler = this;
		getAttrs(attributeHandler.mods, function (v) {
			attributeHandler.current = v;
			attributeHandler.getCallbacks.forEach((callback) => {
				callback(attributeHandler);
			});
			setAttrs(attributeHandler.update, {silent: true}, function () {
				attributeHandler.finishCallbacks.forEach((callback) => {
					callback(attributeHandler);
				});
			});
		})
	}
}

class WorkerRepeatingSectionHandler extends RepeatingSectionHandler {

	generateUUID = (function() {
		"use strict";

		var a = 0, b = [];
		return function() {
			var c = (new Date()).getTime() + 0, d = c === a;
			a = c;
			for (var e = new Array(8), f = 7; 0 <= f; f--) {
				e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
				c = Math.floor(c / 64);
			}
			c = e.join("");
			if (d) {
				for (f = 11; 0 <= f && 63 === b[f]; f--) {
					b[f] = 0;
				}
				b[f]++;
			} else {
				for (f = 0; 12 > f; f++) {
					b[f] = Math.floor(64 * Math.random());
				}
			}
			for (f = 0; 12 > f; f++){
				c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
			}
			return c;
		};
	}())

	generateRowId() {
		let id = this.generateUUID();
		return id.replace(/_/g, "Z");
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

	setPointsMax(attributeHandler) {
		let max = this.definition.formula.getValue(attributeHandler, this.definition.getTitle());
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
		this.buildStats.iterate(function (buildStat) {
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

		Debug.Log(`Updating ${worker.definition.name} variable ${updatingAttr} to ${newValue}`);
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

		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute"]);
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
		WuxWorkerTechniques.FilterTechniquesForLearn(attributeHandler);
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
		while (level >= checkingLevel) {
			cr++;
			incrementer += modIncrementer;
			checkingLevel += incrementer;
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

	setPointsMax(attributeHandler) {
		// do nothing

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

	convertPp(attributeHandler) {
		let worker = this;
		let ppDefinition = WuxDef.Get("PP");
		attributeHandler.addMod(ppDefinition.getVariable());
		attributeHandler.addMod(worker.attrBuildDraft);
		attributeHandler.addMod(worker.attrBuildFinal);

		let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsFinal(attrHandler);

			let trainingPoints = 0;
			if (worker.buildStats.has(worker.attrMax)) {
				trainingPoints = worker.buildStats.get(worker.attrMax).value;
			}
			let pp = attrHandler.parseInt(ppDefinition.getVariable());
			let xpNeeded = ppDefinition.formula.getValue(attrHandler);

			worker.setBuildStatsDraft(attrHandler);

			while (pp >= xpNeeded) {
				trainingPoints++;
				pp -= xpNeeded;
			}
			attrHandler.addUpdate(ppDefinition.getVariable(), pp);
			attrHandler.addUpdate(worker.attrMax, trainingPoints);

			worker.updateBuildStats(attrHandler, ppDefinition.getVariable(), pp);
			worker.updateBuildStats(attrHandler, worker.attrMax, trainingPoints);
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}

	updateTrainingPoints(attributeHandler) {
		let worker = this;
		attributeHandler.addMod(worker.attrMax);
		attributeHandler.addMod(worker.attrBuildDraft);

		let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
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

class WuxAttributeWorkerBuild extends WuxWorkerBuild {
	constructor() {
		super("Attribute");
	}

	updatePoints(attributeHandler) {
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