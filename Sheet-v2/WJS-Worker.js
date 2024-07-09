class WorkerAttributeHandler {
    constructor(mods) {
        if(Array.isArray(mods)) {
            this.mods = mods;
			this.update = {};
        }
        else {
            this.mods = [];
            this.mods.push(mods);
        }
    }
    addMods(mods) {
        if(Array.isArray(mods)) {
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
		this.definition = WuxDef.get(definitionId);
		this.builderAttributes = builderAttributesArray != undefined ? builderAttributesArray : [];
		this.buildStats = {};

		this.attrBuild = this.definition.getVariable(WuxDef._build);
		this.attributeHandler = new WorkerAttributeHandler(this.attrBuild);
	}

	service = service || (function () {
		'use strict';
	
		var
		setBuildStats = function(attributeHandler, v) {
			this.buildStats = new WorkerBuildStats();
			this.buildStats.import(attributeHandler.parseJSON(v, this.attrBuild));
		},

		setUpdatePointsAttr = function() {
			this.attrMax = this.definition.getVariable(WuxDef._max);
		},

		setBuilderAttributes = function() {
			this.attrBuilderAttributes = [];
			this.builderAttributes.forEach(function (attr) {
				this.attrBuilderAttributes.push(this.definition.getVariable(attr));
			});
		},

		updatePoints = function(attributeHandler, v) {
			let buildPoints = this.buildStats.getPointsTotal();
			let buildPointsMax = isNaN(parseInt(v[this.attrMax])) ? 0 : parseInt(v[this.attrMax]);

			attributeHandler.update[this.definition.getVariable()] = buildPointsMax - buildPoints;
			attributeHandler.update[this.definition.getVariable(WuxDef._error)] = buildPoints >= buildPointsMax ? "1" : "0";
		},

		updateBuildStats = function(attributeHandler, v, builderAttributes) {

		},

		saveBuildStats = function(attributeHandler, v) {
			
		}
        ;
		return {
			SetBuildStats: setBuildStats,
			SetUpdatePointsAttr: setUpdatePointsAttr,
			SetBuilderAttributes: setBuilderAttributes,
			UpdatePoints: updatePoints,
			UpdateBuildStats: updateBuildStats
		};

	}())

	onChangeWorkerAttribute(attrName, value) {
		this.service.SetUpdatePointsAttr();
		this.service.SetBuilderAttributes();
		let attributeHandler = new WorkerAttributeHandler([this.attrMax, this.attrBuild]);
		attributeHandler.addMods(this.attrBuilderAttributes);

		attributeHandler.get(function (v) {
			service.SetBuildStats(attributeHandler, v);
			service.UpdatePoints(attributeHandler, v);
			service.UpdateBuildStats(attributeHandler, v, builderAttributes);
			attributeHandler.set();
		});
	}

	setBuildStats() {
		let attributeHandler = new WorkerAttributeHandler(this.attrBuild);
		attributeHandler.addMods(this.getBuilderAttributes());
		attributeHandler.get(function (v) {
			this.buildStats = new WorkerBuildStats();
			this.buildStats.import(attributeHandler.parseJSON(v, this.attrBuild));
			
		});
	}
}


