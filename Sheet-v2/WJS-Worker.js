class WorkerAttributeHandler {
	constructor(mods) {
		if (Array.isArray(mods)) {
			this.mods = mods;
			this.update = {};
		}
		else {
			this.mods = [];
			if (mods != undefined) {
			    this.mods.push(mods);
			}
		}
	}
	addMods(mods) {
		if (Array.isArray(mods)) {
			this.mods = this.mods.concat(mods);
		}
		else {
			this.mods.push(mods);
		}
	}
	get(callback) {
		getAttrs(this.mods, function (v) {
			callback(v);
		});
	}
	set() {
		setAttrs(this.update, { silent: true });
	}

	parseString(attrArray, fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = "";
		}
		return attrArray[fieldName] == undefined || attrArray[fieldName] == "" ? defaultValue : attrArray[fieldName];
	}

	parseInt(attrArray, fieldName, defaultValue) {

		return this.parseIntValue(attrArray[fieldName], defaultValue);
	}

	parseIntValue(value, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = 0;
		}
		return isNaN(parseInt(value)) ? defaultValue : parseInt(value);
	}

	parseFloat(attrArray, fieldName, defaultValue) {

		return this.parseFloatValue(attrArray[fieldName], defaultValue);
	}

	parseFloatValue(value, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = 0;
		}
		return isNaN(parseFloat(value)) ? defaultValue : parseFloat(value);
	}

	parseJSON(attrArray, fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = "";
		}
		return attrArray[fieldName] == undefined ? defaultValue : attrArray[fieldName] == "" ? defaultValue : JSON.parse(attrArray[fieldName]);
	}
}

class WuxWorkerBuild {
	constructor(definitionId, builderAttributesArray) {
	    
		this.definition = WuxDef.Get(definitionId);
		this.builderAttributes = builderAttributesArray != undefined ? builderAttributesArray : [];
		this.buildStats = {};

		this.attrBuildDraft = this.definition.getVariable(WuxDef._build);
		this.attrBuildFinal = this.definition.getVariable(WuxDef._build, WuxDef._max);
		this.attributeHandler = new WorkerAttributeHandler(this.attrBuildDraft, this.attrBuildFinal);
		this.attrBuilderAttributes = [];
	}

	setBuildStatsDraft(attributeHandler, v) {
	    this.setBuildStats(this.attrBuildDraft, attributeHandler, v);
	}
	setBuildStatsFinal(attributeHandler, v) {
	    this.setBuildStats(this.attrBuildFinal, attributeHandler, v);
	}
	setBuildStats(buildStatVersion, attributeHandler, v) {
		this.buildStats = new WorkerBuildStats();
		this.buildStats.import(attributeHandler.parseJSON(v, buildStatVersion));
	}

	setUpdatePointsAttr() {
		this.attrMax = this.definition.getVariable(WuxDef._max);
	}
	setBuilderAttributes() {
		let output = [];
		let definition = this.definition;
		this.builderAttributes.forEach(function (attr) {
			output.push(definition.getVariable(attr));
		});
		this.attrBuilderAttributes = output;
	}
	updatePoints(attributeHandler, v) {
		let buildPoints = this.buildStats.getPointsTotal();
		let buildPointsMax = isNaN(parseInt(v[this.attrMax])) ? 0 : parseInt(v[this.attrMax]);

		attributeHandler.update[this.definition.getVariable()] = buildPointsMax - buildPoints;
		attributeHandler.update[this.definition.getVariable(WuxDef._error)] = buildPoints >= buildPointsMax ? "1" : "0";
	}
	updateBuild(attributeHandler, updatingAttr, newValue) {
	    this.buildStats.add(updatingAttr) = newValue;
	    attributeHandler.update[this.attrBuildDraft] = JSON.stringify(this.buildStats);
	}
	
	saveBuildStatsToFinal(attributeHandler) {
	    attributeHandler.update[this.attrBuildFinal] = JSON.stringify(this.buildStats);
	}
	revertBuildStatsDraft(attributeHandler, v) {
	    attributeHandler.update[this.attrBuildDraft] = JSON.stringify(this.buildStats);
	}
	
	
}

class WuxWorkerBuildManager {
    constructor(definitionIds, builderAttributesArrays) {
        this.attributeHandler  = new WorkerAttributeHandler();
        this.workers = [];
        if (Array.isArray(definitionIds)) {
            for (let i = 0; i < definitionIds.length; i++) {
                this.workers.push(new WuxWorkerBuild(definitionIds[i], builderAttributesArrays[i]));
            }
        }
        else {
            this.workers.push(new WuxWorkerBuild(definitionIds, builderAttributesArrays));
        }
    }
    
    onChangeWorkerAttribute(updatingAttr, newValue) {
		let manager = this;
		manager.workers.forEach((worker) => {
		    worker.setUpdatePointsAttr();
    		worker.setBuilderAttributes();
    		manager.attributeHandler.addMods([worker.attrMax, worker.attrBuildDraft, worker.attrBuilderAttributes]);
		});
		manager.attributeHandler.get(function (v) {
		    manager.workers.forEach((worker) => {
    			worker.setBuildStatsDraft(manager.attributeHandler, v);
    			worker.updatePoints(manager.attributeHandler, v);
    			worker.updateBuild(manager.attributeHandler, updatingAttr, newValue);
		    });
		    manager.attributeHandler.set();
		});
	}
	
	onReset() {
		let manager = this;
		manager.workers.forEach((worker) => {
		    worker.setUpdatePointsAttr();
    		worker.setBuilderAttributes();
    		manager.attributeHandler.addMods([worker.attrMax, worker.attrBuildDraft, worker.attrBuilderAttributes]);
		});
		manager.attributeHandler.get(function (v) {
		    manager.workers.forEach((worker) => {
    			worker.setBuildStatsDraft(manager.attributeHandler, v);
    			worker.updatePoints(manager.attributeHandler, v);
    			worker.updateBuild(manager.attributeHandler, updatingAttr, newValue);
		    });
		    manager.attributeHandler.set();
		});
	}
}