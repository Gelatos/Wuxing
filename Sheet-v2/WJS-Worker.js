class WorkerAttributeHandler {
	constructor(mods) {
		if (Array.isArray(mods)) {
			this.mods = mods;
			this.update = {};
		}
		else {
			this.mods = [];
			this.mods.push(mods);
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

		this.attrBuild = this.definition.getVariable(WuxDef._build);
		this.attributeHandler = new WorkerAttributeHandler(this.attrBuild);
		this.attrBuilderAttributes = [];
	}

	setBuildStats(attributeHandler, v) {
		this.buildStats = new WorkerBuildStats();
		this.buildStats.import(attributeHandler.parseJSON(v, this.attrBuild));
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

	updateBuildStats(attributeHandler, v, builderAttributes) {

	}

	saveBuildStats(attributeHandler, v) {

	}

	onChangeWorkerAttribute(attrName, value) {
		this.setUpdatePointsAttr();
		this.setBuilderAttributes();
		let attributeHandler = new WorkerAttributeHandler([this.attrMax, this.attrBuild]);
		attributeHandler.addMods(this.attrBuilderAttributes);
		let worker = this;

		attributeHandler.get(function (v) {
			worker.setBuildStats(attributeHandler, v);
			worker.updatePoints(attributeHandler, v);
			worker.updateBuildStats(attributeHandler, v, worker.builderAttributes);
			attributeHandler.set();
		});
	}
}