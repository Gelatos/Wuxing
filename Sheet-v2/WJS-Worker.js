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
	get(attributeHandler, callback) {
		getAttrs(this.mods, function (v) {
			attributeHandler.current = v;
			callback();
		});
	}
	set() {
		setAttrs(this.update, { silent: true });
	}

	addUpdate(attr, value) {
		this.update[attr] = value;
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
		this.attributeHandler = new WorkerAttributeHandler(this.attrBuildDraft, this.attrBuildFinal);
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
			attributeHandler.addUpdate(buildStat.fieldName, buildStat.value);
		});
	}
	
	saveBuildStatsToFinal(attributeHandler) {
	    attributeHandler.addUpdate(this.attrBuildFinal, JSON.stringify(this.buildStats));
	}
	revertBuildStatsDraft(attributeHandler) {
	    attributeHandler.addUpdate(this.attrBuildDraft, JSON.stringify(this.buildStats));
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
			worker.definition.setFormulaData();
			attributeHandler.addFormulaMods(worker.definition);
    		attributeHandler.addMod(worker.attrBuildDraft);
		});
	}

	setAttributeHandlerPoints(attributeHandler) {
		let manager = this;
		manager.iterate(function(worker) {
			worker.setBuildStatsDraft(attributeHandler);
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});
	}

	onInit() {
		let manager = this;
        let attributeHandler  = new WorkerAttributeHandler();

		manager.setupAttributeHandlerForPointUpdate(attributeHandler);
		attributeHandler.get(attributeHandler, function () {
			manager.setAttributeHandlerPoints(attributeHandler);
		    attributeHandler.set();
		});
	}
    
    onChangeWorkerAttribute(updatingAttr, newValue) {
		let manager = this;
        let attributeHandler  = new WorkerAttributeHandler();
		manager.iterate(function(worker) {
    		attributeHandler.addMod(worker.attrMax);
			attributeHandler.addMod(worker.attrBuildDraft);
		});
		attributeHandler.get(attributeHandler, function () {
		    manager.iterate(function(worker) {
    			worker.setBuildStatsDraft(attributeHandler);
    			worker.updateBuildStats(attributeHandler, updatingAttr, newValue);
    			worker.updatePoints(attributeHandler);
		    });
		    attributeHandler.set();
		});
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