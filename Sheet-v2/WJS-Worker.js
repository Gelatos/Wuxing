class WorkerAttributeHandler {
	constructor(mods) {
		if (Array.isArray(mods)) {
			this.mods = mods;
		}
		else {
			this.mods = [];
			if (mods != undefined) {
			    this.mods.push(mods);
			}
		}
		this.current = {};
		this.update = {};
		this.getCallbacks = [];
		this.finishCallbacks = [];
	}
	addMod(mods) {
		if (Array.isArray(mods)) {
			this.mods = this.mods.concat(mods);
		}
		else {
			this.mods.push(mods);
		}
	}
	addFormulaMods(definition) {
		this.addMod(definition.modAttrs);
	
	}
	addUpdate(attr, value) {
		this.update[attr] = value;
	}
	addGetAttrCallback(callback) {
		this.getCallbacks.push(callback);
	}
	addFinishCallback(callback) {
		this.finishCallbacks.push(callback);
	}
	run() {
		let attributeHandler = this;
		getAttrs(attributeHandler.mods, function (v) {
			attributeHandler.current = v;
			attributeHandler.getCallbacks.forEach((callback) => {
				callback(attributeHandler);
			});
			setAttrs(attributeHandler.update, { silent: true }, function () {
				attributeHandler.finishCallbacks.forEach((callback) => {
					callback(attributeHandler);
				});
			});
		})
	}

	parseString(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = "";
		}
		if (this.update[fieldName] != undefined) {
			return this.update[fieldName] == undefined || this.update[fieldName] == "" ? defaultValue : this.update[fieldName];
		}
		else {
			return this.current[fieldName] == undefined || this.current[fieldName] == "" ? defaultValue : this.current[fieldName];
		}
	}

	parseInt(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = 0;
		}
		if (this.update[fieldName] != undefined) {
			return isNaN(parseInt(this.update[fieldName])) ? defaultValue : parseInt(this.update[fieldName]);
		}
		else {
			return isNaN(parseInt(this.current[fieldName])) ? defaultValue : parseInt(this.current[fieldName]);
		}
	}

	parseFloat(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = 0;
		}
		if (this.update[fieldName] != undefined) {
			return isNaN(parseFloat(this.update[fieldName])) ? defaultValue : parseFloat(this.update[fieldName]);
		}
		else {
			return isNaN(parseFloat(this.current[fieldName])) ? defaultValue : parseFloat(this.current[fieldName]);
		}
	}

	parseJSON(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = "";
		}
		if (this.update[fieldName] != undefined) {
			return this.update[fieldName] == undefined || this.update[fieldName] == "" ? defaultValue : JSON.parse(this.update[fieldName]);
		}
		else {
			return this.current[fieldName] == undefined || this.current[fieldName] == "" ? defaultValue : JSON.parse(this.current[fieldName]);
		}
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
		attributeHandler.addUpdate(this.attrMax, this.definition.getFormulaValue(attributeHandler));
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
	getBuildVariables() {
		let buildVariableNames = []; 
		let buildVariables = []; 
		for (let i = 0; i < this.definition.linkedGroups.length; i++) {
			if (this.definition.linkedGroups[i] != "") {
				buildVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", this.definition.linkedGroups[i]));
				buildVariables = buildVariables.concat(WuxDef.GetVariables(this.definition.linkedGroups[i], buildVariableNames));
			}
		}
		return buildVariables;
	}
	cleanBuildStats() {
		this.buildStats.clean(this.getBuildVariables());
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

	updateLevel(attributeHandler, fieldName, level) {
		let worker = this;
		level = parseInt(level);
		attributeHandler.addUpdate(fieldName, level);
		attributeHandler.addMod(worker.attrBuildDraft);

		let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			attrHandler.addUpdate(WuxDef.GetVariable("CR"), worker.getCharacterRank(level));

			worker.setBuildStatsDraft(attrHandler);
			worker.updateBuildStats(attrHandler, fieldName, level);
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}

	getCharacterRank(level) {
		let cr = 1;
		let incrementer = 5;
		let modIncrementer = 5;
		let checkingLevel = 5;
		while (level >= checkingLevel) {
			cr++;
			incrementer += modIncrementer;
			checkingLevel += incrementer;
		}
		return cr;
	}

	onChangeWorkerAttribute(updatingAttr, newValue) {
		let worker = this;
        let attributeHandler  = new WorkerAttributeHandler();
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
		attributeHandler.run();
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
			buildPoints += this.buildStats.getIntValue(advKnowledge);
		}
		if (this.buildStats.has(advTechs)) {
			buildPoints += this.buildStats.getIntValue(advTechs);
		}
		let buildPointsMax = attributeHandler.parseInt(this.attrMax);

		attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
		attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
	}

	updateTrainingPoints(attributeHandler, fieldName, level) {
		let worker = this;
		level = parseInt(level);
		attributeHandler.addUpdate(fieldName, level);
		attributeHandler.addMod(worker.attrBuildDraft);

		let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
		manager.setupAttributeHandlerForPointUpdate(attributeHandler);

		attributeHandler.addGetAttrCallback(function (attrHandler) {
			worker.setBuildStatsDraft(attrHandler);
			worker.updatePoints(attrHandler);
			manager.setAttributeHandlerPoints(attrHandler);
		});
	}

	getCharacterRank(level) {
		let cr = 1;
		let incrementer = 5;
		let modIncrementer = 5;
		let checkingLevel = 5;
		while (level >= checkingLevel) {
			cr++;
			incrementer += modIncrementer;
			checkingLevel += incrementer;
		}
		return cr;
	}

	onChangeWorkerAttribute(updatingAttr, newValue) {
		let worker = this;
        let attributeHandler  = new WorkerAttributeHandler();
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
		attributeHandler.run();
	}
}

class WuxWorkerBuildManager {
    constructor(definitionIds) {
        this.workers = [];
        if (Array.isArray(definitionIds)) {
            for (let i = 0; i < definitionIds.length; i++) {
                this.workers.push(new WuxWorkerBuild(definitionIds[i]));
            }
        }
        else {
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
		manager.iterate(function(worker) {
			attributeHandler.addFormulaMods(worker.definition);
    		attributeHandler.addMod(worker.attrBuildDraft);
		});
	}

	setAttributeHandlerPoints(attributeHandler) {
		this.iterate(function(worker) {
			worker.setBuildStatsDraft(attributeHandler);
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});
	}
    
    onChangeWorkerAttribute(updatingAttr, newValue) {
		let manager = this;
        let attributeHandler  = new WorkerAttributeHandler();
		manager.iterate(function(worker) {
		    console.log(`Updating ${worker.definition.name} variable ${updatingAttr} to ${newValue}`);
    		attributeHandler.addMod(worker.attrMax);
			attributeHandler.addMod(worker.attrBuildDraft);
		});
		attributeHandler.addGetAttrCallback(function (attrHandler) {
		    manager.iterate(function(worker) {
    			worker.setBuildStatsDraft(attrHandler);
    			worker.updateBuildStats(attrHandler, updatingAttr, newValue);
    			worker.updatePoints(attrHandler);
		    });
		});
		attributeHandler.run();
	}
	
	onCommit() {
		let manager = this;
        let attributeHandler  = new WorkerAttributeHandler();
		manager.iterate(function(worker) {
    		attributeHandler.addMod(worker.attrBuildDraft);
		});
		attributeHandler.get(attributeHandler, function () {
		    manager.iterate(function(worker) {
    			worker.setBuildStatsDraft(attributeHandler);
				worker.cleanBuildStats();
    			worker.saveBuildStatsToFinal(attributeHandler);
		    });
		    attributeHandler.set();
		});
	}
	
	onReset() {
		let manager = this;
        let attributeHandler  = new WorkerAttributeHandler();
		manager.iterate(function(worker) {
    		attributeHandler.addMod(worker.attrBuildFinal);
		});
		attributeHandler.get(attributeHandler, function () {
		    manager.iterate(function(worker) {
    			worker.setBuildStatsFinal(attributeHandler);
				worker.cleanBuildStats();
    			worker.revertBuildStatsDraft(attributeHandler);
		    });
		    attributeHandler.set();
		});
	}
}

