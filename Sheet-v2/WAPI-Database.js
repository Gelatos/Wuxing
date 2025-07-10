// ====== Classes
// noinspection JSUnusedGlobalSymbols,JSUnresolvedReference,SpellCheckingInspection,ES6ConvertVarToLetConst

class Dictionary {

    constructor() {
        this.keys = [];
        this.values = {};
    }

    import(data, dataCreationCallback) {
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, dataCreationCallback);
            } else if (typeof data == "string") {
                this.importStringifiedJson(data, dataCreationCallback);
            } else {
                this.importJson(data, dataCreationCallback);
            }
        }
    }

    importStringifiedJson(stringifiedJSON, dataCreationCallback) {
        if (stringifiedJSON == undefined || stringifiedJSON == "") {
            return;
        }
        this.importJson(JSON.parse(stringifiedJSON), dataCreationCallback);
    }

    importJson(json, dataCreationCallback) {
        if (json == undefined) {
            return;
        }
        this.keys = json.keys;
        if (dataCreationCallback != undefined) {
            this.values = {};
            for (let i = 0; i < json.keys.length; i++) {
                this.values[json.keys[i]] = dataCreationCallback(json.values[json.keys[i]]);
            }
        } else {
            this.values = json.values;
        }
    }

    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            if (data != undefined) {
                this.add(data.name, data);
            }
        }
    }

    add(key, value) {
        if (!this.keys.includes(key)) {
            this.keys.push(key);
        }
        this.values[key] = value;
    }

    get(key) {
        return this.values[key];
    }

    getkey(index) {
        return this.keys[index];
    }

    getByIndex(index) {
        return this.get(this.getkey(index));
    }

    set(key, value) {
        this.values[key] = value;
    }

    has(key) {
        return this.keys.includes(key);
    }

    iterate(callback) {
        for (let i = 0; i < this.keys.length; i++) {
            callback(this.values[this.keys[i]], this.keys[i]);
        }
    }

    clean(validKeys) {
        let keys = this.keys.filter(key => validKeys.includes(key));
        let values = {};
        for (let i = 0; i < keys.length; i++) {
            values[keys[i]] = this.values[keys[i]];
        }
        this.keys = keys;
        this.values = values;
    }
}

class DatabaseFilterData {
    constructor(property, value) {
        this.property = property;
        this.value = value;
    }
}

class Database extends Dictionary {
    constructor(data, sortingProperties, dataCreationCallback) {
        super();
        if (sortingProperties != undefined) {
            this.addSortingroperties(sortingProperties);
        }

        this.import(data, dataCreationCallback);
    }

    importJson(json, dataCreationCallback) {
        super.importJson(json, dataCreationCallback);
        this.sortingGroups = json.sortingGroups;
    }

    add(key, value) {
        super.add(key, value);
        for (let property in this.sortingGroups) {
            if (value != undefined && value.hasOwnProperty(property)) {
                this.addSortingGroup(property, value[property], value);
            }
        }
    }

    addSortingroperties(sortingProperties) {
        this.sortingGroups = {};
        for (let i = 0; i < sortingProperties.length; i++) {
            this.sortingGroups[sortingProperties[i]] = {};
        }
    }

    addSortingGroup(property, propertyValue, newEntry) {
        if (this.sortingGroups != undefined) {
            if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
                this.sortingGroups[property][propertyValue] = [];
            }
            this.sortingGroups[property][propertyValue].push(newEntry.name);
        }
    }

    filter(filterData) {

        let filteredGroup;
        if (Array.isArray(filterData)) {
            filteredGroup = this.getSortedGroup(filterData[0].property, filterData[0].value);
            let nextFilter = [];
            for (let i = 1; i < filterData.length; i++) {
                if (filteredGroup == undefined || filteredGroup.length == 0) {
                    return [];
                }
                nextFilter = this.getSortedGroup(filterData[i].property, filterData[i].value);
                if (nextFilter != undefined && nextFilter.length > 0) {
                    filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
                }
            }
        } else {
            filteredGroup = this.getSortedGroup(filterData.property, filterData.value);
        }
        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return this.getGroupData(filteredGroup);
    }

    getSortedGroup(property, propertyValue) {
        if (!this.sortingGroups.hasOwnProperty(property)) {
            let keys = "";
            for (let key in this.sortingGroups) {
                keys += `${key}, `;
            }
            Debug.Log (`Tried to find property ${property} but it does not exist in the database. Valid properties are ${keys}`);
            return [];
        }
        if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
            let keys = "";
            for (let key in this.sortingGroups[property]) {
                keys += `${key}, `;
            }
            Debug.Log (`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
            return [];
        }
        return this.sortingGroups[property][propertyValue];
    }

    getGroupData(group) {
        let output = [];
        for (let i = 0; i < group.length; i++) {
            output.push(this.get(group[i]));
        }
        return output;
    }

    getPropertyValues(property) {
        let output = [];
        for (let key in this.sortingGroups[property]) {
            output.push(key);
        }
        return output;
    }

    getValuesByProperty(property) {
        let output = [];
        for (let key in this.values) {
            output.push(this.values[key][property]);
        }
        return output;
    }
}

class ExtendedTechniqueDatabase extends Database {

    constructor(data) {
        let filters = ["style", "group", "affinity", "tier", "isFree", "action", "skill", "range"];
        let dataCreation = function (data) {
            return new TechniqueData(data);
        };
        super(data, filters, dataCreation);
    }

    importJson(json) {
        let dataCreationCallback = function (data) {
            return new TechniqueData(data);
        }
        super.importJson(json, dataCreationCallback);
    }

    importSheets(dataArray) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = new TechniqueData(dataArray[i]);
            if (this.has(data.name)) {
                this.get(data.name).importEffectsFromTechnique(data);
            } else {
                this.add(data.name, data);
            }
        }
    }

    add(key, value) {
        super.add(key, value);

        let styles = value.techSet.split(";");
        for (let i = 0; i < styles.length; i++) {
            this.addSortingGroup("style", styles[i].trim(), value);
        }
    }
}

class ExtendedTechniqueStyleDatabase extends Database {

    constructor(data, techDb) {
        let filters = ["group", "mainGroup", "subGroup", "cr"];
        let dataCreation = function (data) {
            return new TechniqueStyle(data);
        };
        super(data, filters, dataCreation);
        this.techDb = techDb;

        this.importStyles(data, dataCreation);
    }
    
    import(data, dataCreationCallback) {
        // overriding the import process
    }
    
    importStyles(data, dataCreationCallback) {
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, dataCreationCallback);
            } else if (typeof data == "string") {
                this.importStringifiedJson(data, dataCreationCallback);
            } else {
                this.importJson(data, dataCreationCallback);
            }
        }
    }

    importJson(json) {
        let dataCreationCallback = function (data) {
            return new TechniqueStyle(data);
        }
        super.importJson(json, dataCreationCallback);
    }

    importSheets(dataArray) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = new TechniqueStyle(dataArray[i]);
            this.setMaxTier(data);
            this.add(data.name, data);
        }
    }
    
    setMaxTier(techniqueStyle) {
        let tier = 0;
        let filterData = this.techDb.filter(new DatabaseFilterData("style", techniqueStyle.name));
        for (let i = 0; i < filterData.length; i++) {
            if (filterData[i].tier > tier) {
                tier = filterData[i].tier;
            }
        }
        techniqueStyle.maxTier = tier;
    }
    
}

class ExtendedUsableItemDatabase extends Database {

    constructor(data, dataCreationCallback) {
        let filters = ["group", "subGroup", "category", "action", "skill", "range"];
        super(data, filters, dataCreationCallback);
    }

    importJson(json, dataCreationCallback) {
        super.importJson(json, dataCreationCallback);
    }

    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            if (this.has(data.name)) {
                this.get(data.name).technique.importEffectsFromTechnique(data.technique);
            } else {
                this.add(data.name, data);
            }
        }
    }
}

class ExtendedDescriptionDatabase extends Database {
    constructor(data) {
        let dataCreation = function (data) {
            let definition = new DefinitionData(data);
            if (definition.group == "Type") {
                definition.variable += `{0}{1}`;
            }
            return definition;
        };
        super(data, ["group", "subGroup", "mainGroup", "formulaMods", "techMods", "hasMax"], dataCreation);
    }

    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            if (data == undefined) {
                continue;
            }
            if (this.has(data.name)) {
                this.values[data.name].descriptions.push(data.descriptions[0]);
            } else {
                this.add(data.name, data);
            }
        }
    }

    add(key, value) {
        super.add(key, value);
        let formulaDefs = value.formula.getDefinitions();
        if (value.subGroup != undefined && value.subGroup.includes(";")) {
            let subGroups = value.subGroup.split(";");
            for (let i = 0; i < subGroups.length; i++) {
                this.addSortingGroup("subGroup", subGroups[i].trim(), value);
            }

        }
        for (let i = 0; i < formulaDefs.length; i++) {
            this.addSortingGroup("formulaMods", formulaDefs[i], value);
        }
        if (value.modifiers.includes(WuxDef._tech)) {
            this.addSortingGroup("techMods", WuxDef._tech, value);
        }
        if (value.modifiers.includes(WuxDef._techset)) {
            this.addSortingGroup("techMods", WuxDef._techset, value);
        }
        if (value.isResource) {
            this.addSortingGroup("hasMax", "true", value);
        }
    }
}

class TechniqueEffectDatabase extends Database {
    constructor(data) {
        let dataCreation = function (data) {
            return new TechniqueEffect(data);
        };
        super(data, ["type"], dataCreation);
    }

    importJson(json) {
        let dataCreationCallback = function (data) {
            return new TechniqueEffect(data);
        }
        super.importJson(json, dataCreationCallback);
    }

    importSheets(dataArray) {
        let dataCreationCallback = function (data) {
            return new TechniqueEffect(data);
        }
        super.importSheets(dataArray, dataCreationCallback);
    }

    getBoostEffects() {
        return this.filter(new DatabaseFilterData("type", "Boost"));
    }
}

class dbObj {
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data);
            } else if (typeof data == "string") {
                this.importStringifiedJson(data);
            } else {
                this.importJson(data);
            }
        }
    }

    importStringifiedJson(stringifiedJSON) {
        if (stringifiedJSON == undefined || stringifiedJSON == "") {
            return;
        }
        let json = JSON.parse(stringifiedJSON);
        this.importJson(json);
    }

    importJson(json) {
    }

    importSheets(dataArray) {
    }

    createEmpty() {
    }
}

class WuxDatabaseData extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.description = json.description;
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        return i;
    }

    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.variable = "";
    }

    createDefinition(baseDefinition) {
        let definition = new DefinitionData();
        definition.name = baseDefinition.isResource ? `${this.name}` : `${baseDefinition.abbreviation}_${this.name}`;
        definition.fieldName = this.fieldName;
        definition.variable = `${baseDefinition.getVariable(`-${this.variable == "" ? this.fieldName : this.variable}`)}{0}`;
        definition.title = this.name;
        definition.group = baseDefinition.name;
        definition.subGroup = "";
        definition.descriptions = this.getDescriptions();
        definition.formula = baseDefinition.formula;
        definition.linkedGroups = [];
        definition.isResource = baseDefinition.isResource;
        return definition;
    }

    getDescriptions() {
        return [this.description];
    }

}

class TechniqueData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.techSet = json.techSet;
        this.group = json.group;
        this.affinity = json.affinity;
        this.tier = parseInt(json.tier);
        this.isFree = this.affinity == "" && this.tier <= 0;
        this.action = json.action;
        this.traits = json.traits;
        this.resourceCost = json.resourceCost;
        this.limits = json.limits;
        this.skill = json.skill;
        this.range = json.range;
        this.target = json.target;
        this.size = parseInt(json.size);
        this.requirement = json.requirement;
        this.itemTraits = json.itemTraits;
        this.trigger = json.trigger;
        this.flavorText = json.flavorText;
        this.definitions = json.definitions;
        this.effects = new TechniqueEffectDatabase(json.effects);
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.techSet = "" + dataArray[i];
        i++;
        this.group = "" + dataArray[i];
        i++;
        this.affinity = "" + dataArray[i];
        i++;
        this.tier = parseInt(dataArray[i]);
        this.tier = isNaN(this.tier) ? 0 : this.tier;
        i++;
        this.isFree = this.affinity == "" && this.tier <= 0;
        this.action = "" + dataArray[i];
        i++;
        this.traits = "" + dataArray[i];
        i++;
        this.resourceCost = "" + dataArray[i];
        i++;
        this.limits = "" + dataArray[i];
        i++;
        this.skill = "" + dataArray[i];
        i++;
        this.range = "" + dataArray[i];
        i++;
        this.target = "" + dataArray[i];
        i++;
        this.size = parseInt(dataArray[i]);
        i++;
        this.requirement = "" + dataArray[i];
        i++;
        this.itemTraits = "" + dataArray[i];
        i++;
        this.trigger = "" + dataArray[i];
        i++;
        this.flavorText = "" + dataArray[i];
        i++;
        this.definitions = [];
        this.effects = new TechniqueEffectDatabase();
        this.addEffect(new TechniqueEffect(dataArray.slice(i)));
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.techSet = "";
        this.group = "";
        this.affinity = "";
        this.tier = 0;
        this.isFree = false;
        this.action = "";
        this.traits = "";
        this.resourceCost = "";
        this.limits = "";
        this.skill = "";
        this.range = "";
        this.target = "";
        this.size = 0;
        this.requirement = "";
        this.itemTraits = "";
        this.trigger = "";
        this.flavorText = "";
        this.definitions = [];
        this.effects = new TechniqueEffectDatabase();
    }

    createDefinition(baseDefinition) {
        let definition = new TechniqueDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.techSet;
        definition.tier = this.tier;
        definition.affinity = this.affinity;
        definition.isFree = this.isFree;
        if (this.action == "Passive") {
            definition.passiveBoosts = this.effects.getBoostEffects();
        }
        definition.jsonData = this;
        return definition;
    }

    importEffectsFromTechnique(technique) {
        let baseTechnique = this;
        technique.effects.iterate(function (effect) {
            baseTechnique.addEffect(effect);
        });
        technique.definitions.forEach(function (definition) {
            baseTechnique.addDefinition(definition);
        });
    }

    addEffect(effect) {
        switch (effect.type) {
            case "Definition":
                effect.setName(`D${this.definitions.length}`);
                this.addDefinition(effect.effect);
                break;
            case "Status":
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                if (effect.effect != "") {
                    this.addDefinition(effect.effect);
                }
                break;
            case "Move":
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                let moveTypes = ["Pushed", "Pulled", "ForceMove", "Fly", "Float", "FreeMove", "Teleport"];
                if (!moveTypes.some(moveType => effect.subType.includes(moveType))) {
                    this.addDefinition(effect.subType);
                }
                let moveDefs = effect.formula.getDefinitions();
                moveDefs.forEach(moveDef => this.addDefinition(moveDef.name));
                break;
            case "Terrain":
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                this.addDefinition(effect.effect);
                break;
            default:
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                break;
        }
    }

    addDefinition(definition) {
        if (!this.definitions.includes(definition)) {
            this.definitions.push(definition);
        }
    }

    getUseTech() {
        return `!utech ${this.formatTechniqueForSandbox()}`;
    }

    formatTechniqueForSandbox() {
        this.displayname = ``;
        this.sheetname = ``;
        return `${this.sanitizeSheetRollAction(JSON.stringify(this))}$$@{${WuxDef.GetVariable("SheetName")}}`;
    }

    sanitizeSheetRollAction(sheetRoll) {
        sheetRoll = sheetRoll.replace(/"/g, "%%");
        sheetRoll = sheetRoll.replace(/:/g, "&&");
        sheetRoll = sheetRoll.replace(/{/g, "<<");
        sheetRoll = sheetRoll.replace(/}/g, ">>");
        sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        return sheetRoll;
    }

    unsanitizeSheetRollAction(jsonString) {
        jsonString = jsonString.replace(/%%/g, '"');
        jsonString = jsonString.replace(/&&/g, ":");
        jsonString = jsonString.replace(/<</g, "{");
        jsonString = jsonString.replace(/>>/g, "}");
        return JSON.parse(jsonString);
    }

    importSandboxJson(jsonString) {
        this.importJson(this.unsanitizeSheetRollAction(jsonString));
    }
}

class TechniqueEffect extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.defense = json.defense;
        this.target = json.target;
        this.type = json.type;
        this.subType = json.subType;
        this.duration = json.duration;
        this.dVal = json.dVal;
        this.dType = json.dType;
        this.formula = new FormulaData(json.formula);
        this.effect = json.effect;
        this.traits = json.traits;
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "";
        this.defense = "" + dataArray[i];
        i++;
        this.target = "" + dataArray[i];
        i++;
        this.type = "" + dataArray[i];
        i++;
        this.subType = "" + dataArray[i];
        i++;
        this.duration = "" + dataArray[i];
        i++;
        this.dVal = "" + dataArray[i];
        i++;
        this.dType = "" + dataArray[i];
        i++;
        this.formula = new FormulaData("" + dataArray[i]);
        i++;
        this.effect = "" + dataArray[i];
        switch(this.type) {
            case "HP":
            case "Resistance":
                this.effect = `${WuxDef.GetAbbreviation("DamageType")}_${this.effect}`;
                break;
            case "Status":
                this.effect = `${WuxDef.GetAbbreviation("Status")}_${this.effect}`;
                break;
            case "Terrain":
                this.effect = `${WuxDef.GetAbbreviation("TerrainFxType")}_${this.effect}`;
                break;
        }
        i++;
        this.traits = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.defense = "";
        this.target = "";
        this.type = "";
        this.subType = "";
        this.duration = "";
        this.dVal = "";
        this.dType = "";
        this.formula = new FormulaData();
        this.effect = "";
        this.traits = "";
    }

    setName(name) {
        this.name = name;
    }
    
    getAverageDiceValue() {
        if (this.dVal > 0) {
            return Math.floor(this.dVal * (this.dType / 2 + 0.5));
        }
        return 0;
    }
    getLowDiceValue() {
        return isNaN(parseInt(this.dVal)) ? 0 : parseInt(this.dVal);
    }
    getHighDiceValue() {
        let output = this.dVal * this.dType;
        return isNaN(output) ? 0 : output;
    }
}

class TechniqueResources extends dbObj {
    importJson(json) {
        this.sheetname = json.sheetname;
        this.name = json.name;
        this.resourceCost = json.resourceCost;
    }

    importSheets(dataArray) {
        let i = 0;
        this.sheetname = "" + dataArray[i];
        i++;
        this.name = "" + dataArray[i];
        i++;
        this.resourceCost = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.sheetname = "";
        this.name = "";
        this.resourceCost = "";
    }

    sanitizeSheetRollAction(sheetRoll) {
        sheetRoll = sheetRoll.replace(/"/g, "%%");
        sheetRoll = sheetRoll.replace(/:/g, "&&");
        sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        return sheetRoll;
    }

    unsanitizeSheetRollAction(jsonString) {
        jsonString = jsonString.replace(/%%/g, '"');
        jsonString = jsonString.replace(/&&/g, ":");
        return JSON.parse(jsonString);
    }

    importSandboxJson(jsonString) {
        this.importJson(this.unsanitizeSheetRollAction(jsonString));
    }
}

class TechniqueStyle extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.subGroup = json.subGroup;
        this.description = json.description;
        this.affinity = json.affinity;
        this.cr = json.cr;
        this.maxTier = json.maxTier;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.subGroup = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.affinity = "" + dataArray[i];
        i++;
        this.cr = parseInt(dataArray[i]);
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.subGroup = "";
        this.description = "";
        this.affinity = "";
        this.cr = 0;
        this.maxTier = 0;
    }

    createDefinition(baseDefinition) {
        let definition = new TechniqueStyleDefinitionData(super.createDefinition(baseDefinition));
        definition.mainGroup = this.group;
        definition.subGroup = this.subGroup;
        definition.tier = this.cr;
        definition.affinity = this.affinity;
        definition.requirements = this.getRequirements();
        definition.formula = new FormulaData();
        return definition;
    }

    getRequirements() {
        let requirements = "";

        if (this.cr > 1) {
            requirements += `You must be at least Character Rank ${this.cr}`;
        }
        if (this.affinity != "") {
            if (requirements != "") {
                requirements += "\n";
            }
            if (this.affinity.includes(";")) {
                let affinities = this.affinity.split(";");
                let affinityOutput = "";
                for (let i = 0; i < affinities.length; i++) {
                    if (i == affinities.length - 1) {
                        if (affinityOutput != "") {
                            affinityOutput += " or ";
                        }
                    }
                    else if (affinityOutput != "") {
                        affinityOutput += ", ";
                    }
                    affinityOutput += affinities[i].trim();
                }
                requirements += `You must have ${affinityOutput} affinity`;
            }
            else {
                requirements += `You must have ${this.affinity} affinity`;
            }
        }
        if (requirements == "") {
            requirements = "None";
        }
        return requirements;
    }
}

class SkillData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.subGroup = json.subGroup;
        this.abilityScore = json.abilityScore;
        this.description = json.description;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.subGroup = "" + dataArray[i];
        i++;
        this.abilityScore = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;

    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.subGroup = "";
        this.abilityScore = "";
        this.description = "";
    }

    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.subGroup;
        definition.formula = new FormulaData(`${this.abilityScore}`);
        definition.formula.addAttributes(definition.getFormulaMods(`${WuxDef._rank}`));
        return definition;
    }
}

class LanguageData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.location = json.location;
        this.description = json.description;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.location = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.location = "";
        this.description = "";
    }

    createDefinition(baseDefinition) {
        let definition = new LanguageDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.location = this.location;
        return definition;
    }
}

class LoreData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = json.fieldName;
        this.group = json.group;
        this.description = json.description;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
    }

    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.group;
        definition.formula = new FormulaData(`Recall`);
        definition.formula.addAttributes(definition.getFormulaMods(WuxDef._rank));
        return definition;
    }
}

class JobData extends WuxDatabaseData {
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.category = "";
        this.description = "";
        this.shortDescription = "";
        this.defenses = "";
        this.techniques = [];
    }

    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.category = json.category;
        this.description = json.description;
        this.shortDescription = json.shortDescription;
        this.defenses = json.defenses;
        this.techniques = json.techniques;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.category = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.shortDescription = "" + dataArray[i];
        i++;
        this.defenses = "" + dataArray[i];
        i++;
        this.techniques = this.createJobTechnique(dataArray.slice(i));
        i++;
    }

    createDefinition(baseDefinition) {
        let definition = new JobDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.requirements = this.getRequirements();
        definition.formula = new FormulaData();
        return definition;
    }

    getRequirements() {
        return "None";
    }

    createJobTechnique(modArray) {
        let output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0});
            i++;
        }
        return output;
    }
    
    convertToStyle() {
        let style = new TechniqueStyle();
        style.createEmpty();
        style.name = this.name;
        style.fieldName = this.fieldName;
        style.group = "Job";
        style.subGroup = this.group;
        style.description = this.description;
        style.affinity = "";
        style.cr = 0;
        style.maxTier = 6;
        return style;
    }
}

class ArchetypeData extends WuxDatabaseData {

}

class StatusData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = json.fieldName;
        this.group = json.group;
        this.description = json.description;
        this.shortDescription = json.shortDescription;
        this.points = json.points;
        this.endsOnRoundStart = json.endsOnRoundStart;
        this.endsOnTrigger = json.endsOnTrigger;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.shortDescription = "" + dataArray[i];
        i++;
        this.points = "" + dataArray[i];
        i++;
        this.endsOnRoundStart = ("" + dataArray[i]) != "";
        i++;
        this.endsOnTrigger = ("" + dataArray[i]) != "";
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.shortDescription = "";
        this.points = 0;
        this.endsOnRoundStart = false;
        this.endsOnTrigger = false;
    }

    createDefinition(baseDefinition) {
        let definition = new StatusDefinitionData(super.createDefinition(baseDefinition));
        
        definition.subGroup = this.group;
        definition.shortDescription = this.shortDescription;
        definition.points = this.points;
        definition.endsOnRoundStart = this.endsOnRoundStart;
        definition.endsOnTrigger = this.endsOnTrigger;
        return definition;
    }
    
    getDescriptions() {
        let output = [this.description];
        if (this.endsOnRoundStart && this.endsOnTrigger) {
            output.push(`This ${this.group} ends when it is triggered or at the start of the next round.`);
        }
        else if (this.endsOnRoundStart) {
            output.push(`This ${this.group} ends at the start of the next round.`);
        }
        else if (this.endsOnTrigger) {
            output.push(`This ${this.group} ends when it is triggered.`);
        }
        return output;
    }
}

class RoleData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();

    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.techniques = this.createTechnique(dataArray.slice(i));
        i++;

    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.techniques = [];
    }

    createTechnique(modArray) {
        let output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0});
            i++;
        }
        return output;
    }
}

class ItemData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.group = json.group;
        this.category = json.category;
        this.bulk = json.bulk;
        this.value = json.value;
        this.traits = json.traits;
        this.description = json.description;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.group = "" + dataArray[i];
        i++;
        this.category = "" + dataArray[i];
        i++;
        this.bulk = parseInt(dataArray[i]);
        i++;
        this.value = parseInt(dataArray[i]);
        i++;
        this.traits = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        return i;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.group = "";
        this.category = "";
        this.itemType = "None";
        this.bulk = 0;
        this.value = 0;
        this.traits = "";
        this.description = "";
    }

    createDefinition(baseDefinition) {
        let definition = new ItemDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.category = this.category;
        definition.value = this.value;
        return definition;
    }
}

class GoodsData extends ItemData {
    importJson(json) {
        super.importJson(json);
        this.affinity = json.affinity;
        this.location = json.location;
        this.rarity = json.rarity;
    }

    importSheets(dataArray) {
        let i = super.importSheets(dataArray);
        this.affinity = "" + dataArray[i];
        i++;
        this.location = "" + dataArray[i];
        i++;
        this.rarity = parseInt(dataArray[i]);
        i++;
        return i;
    }

    createEmpty() {
        super.createEmpty();
        this.itemType = "Goods";
        this.affinity = "";
        this.location = "";
        this.rarity = 0;
    }
}

class UsableItemData extends ItemData {
    importJson(json) {
        super.importJson(json);
        this.valMod = json.valMod;
        this.skill = json.skill;
        this.dc = json.dc;
        this.time = json.time;
        this.components = json.components;
        this.technique = new TechniqueData(json.technique);
        this.hasTechnique = json.hasTechnique;
    }

    importSheets(dataArray) {
        let i = super.importSheets(dataArray);
        this.valMod = parseInt(dataArray[i]);
        i++;
        this.skill = "" + dataArray[i];
        i++;
        this.dc = isNaN(parseInt(dataArray[i])) ? 0 : parseInt(dataArray[i]);
        i++;
        this.time = isNaN(parseInt(dataArray[i])) ? 1 : parseInt(dataArray[i]);
        i++;
        this.components = "" + dataArray[i];
        i++;
        let techData = [this.name, "Item", "", "", 0].concat(dataArray.slice(i));
        this.technique = new TechniqueData(techData);
        this.hasTechnique = dataArray[i] != "";
        i++;
        return i;
    }

    createEmpty() {
        super.createEmpty();
        this.itemType = "UsableItem";
        this.valMod = 0;
        this.skill = "";
        this.dc = 0;
        this.time = 0;
        this.components = "";
        this.technique = new TechniqueData();
        this.hasTechnique = false;
    }

    createDefinition(baseDefinition) {
        let definition = new ItemDefinitionData(super.createDefinition(baseDefinition));
        definition.techInfo = this.technique;
        return definition;
    }
}

class AttributeGroupData extends dbObj {
    importJson(json) {

    }

    importSheets(modArray) {
        let i = 0;
        this.bod = parseInt(modArray[i]);
        i++;
        this.prc = parseInt(modArray[i]);
        i++;
        this.qck = parseInt(modArray[i]);
        i++;
        this.cnv = parseInt(modArray[i]);
        i++;
        this.int = parseInt(modArray[i]);
        i++;
        this.rsn = parseInt(modArray[i]);
        i++;
        this.removeAttributeNaN();

    }

    createEmpty() {
        this.bod = 0;
        this.prc = 0;
        this.qck = 0;
        this.cnv = 0;
        this.int = 0;
        this.rsn = 0;
    }

    removeAttributeNaN() {
        if (isNaN(this.bod)) {
            this.bod = 0;
        }
        if (isNaN(this.prc)) {
            this.prc = 0;
        }
        if (isNaN(this.qck)) {
            this.qck = 0;
        }
        if (isNaN(this.cnv)) {
            this.cnv = 0;
        }
        if (isNaN(this.int)) {
            this.int = 0;
        }
        if (isNaN(this.rsn)) {
            this.rsn = 0;
        }
    }

    getAttributeNames() {
        return ["Body", "Precision", "Quickness", "Conviction", "Intuition", "Reason"];
    }

    getAttributeAbrNames() {
        return ["BOD", "PRC", "QCK", "CNV", "INT", "RSN"];
    }

    convertAttributesToArr() {
        let output = [];
        output.push(this.bod);
        output.push(this.prc);
        output.push(this.qck);
        output.push(this.cnv);
        output.push(this.int);
        output.push(this.rsn);
        return output;
    }
}

class TemplateData extends dbObj {
    importJson(json) {

    }

    importSheets(dataArray) {

    }

    createEmpty() {

    }
}

// Definitions
class DefinitionData extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.title = json.title;
        this.group = json.group;
        this.subGroup = json.subGroup;
        this.descriptions = json.descriptions;
        this.abbreviation = json.abbreviation;
        this.variable = json.variable;
        this.baseFormula = json.baseFormula;
        this.modifiers = json.modifiers;
        this.formula = new FormulaData(json.formula);
        this.linkedGroups = json.linkedGroups;
        this.isResource = json.isResource;
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.title = "" + dataArray[i];
        i++;
        this.group = "" + dataArray[i];
        i++;
        this.subGroup = "" + dataArray[i];
        i++;
        this.descriptions = [("" + dataArray[i])];
        i++;
        this.abbreviation = "" + dataArray[i];
        i++;
        this.variable = "" + dataArray[i];
        i++;
        this.baseFormula = "" + dataArray[i];
        i++;
        this.modifiers = "" + dataArray[i];
        i++;
        this.formula = new FormulaData(this.baseFormula);
        this.formula.addAttributes(this.getFormulaMods(this.modifiers));
        this.linkedGroups = Format.StringToArray("" + dataArray[i]);
        i++;
        this.isResource = dataArray[i];
        i++;
        this.iterateExtraData(("" + dataArray[i]).split(";"));
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.title = "";
        this.group = "";
        this.subGroup = "";
        this.descriptions = [];
        this.abbreviation = "";
        this.variable = "";
        this.baseFormula = "";
        this.modifiers = "";
        this.formula = new FormulaData();
        this.linkedGroups = [];
        this.isResource = false;

    }

    createDefinition(baseDefinition) {
        this.definition = "";
        let definition = super.createDefinition(baseDefinition);
        definition.title = this.title;
        definition.subGroup = this.subGroup;
        definition.descriptions = this.descriptions;
        definition.abbreviation = this.abbreviation;
        definition.modifiers = this.modifiers;
        definition.formula = new FormulaData(this.baseFormula);
        definition.formula.addAttributes(definition.getFormulaMods(this.modifiers));
        definition.linkedGroups = this.linkedGroups;
        definition.isResource = this.isResource;

        delete this.description;

        return definition;
    }

    getTitle() {
        return this.title;
    }

    getVariables(array, mod1) {
        let output = [];
        for (let i = 0; i < array.length; i++) {
            output.push(this.getVariable(array[i], mod1));
        }
        return output;
    }

    getVariable(mod, mod1) {
        if (mod == undefined) {
            mod = "";
        }

        if (mod1 != undefined) {
            mod = [mod, mod1];
        }

        let i = 0;
        return this.variable.replace(/{(\d+)}/g, function (_, m) {
            i = parseInt(m);
            if (Array.isArray(mod) && i < mod.length && mod[i] != undefined) {
                return mod[i];
            } else if (i == 0) {
                return mod;
            }
            return "";
        });
    }

    getAttribute(mod, mod1) {
        return `attr_${this.getVariable(mod, mod1)}`;
    }

    getDescription() {
        let output = "";
        this.descriptions.forEach((description) => {
            output += description + "\n";
        });
        return output;
    }

    getFormulaMods(modifiers) {
        let mods = [];
        if (modifiers != "") {
            let modArray = modifiers.split(";");
            modArray.forEach((mod) => {
                mod = mod.trim();
                if (mod != "") {
                    mods.push(this.getVariable(mod));
                }
            });
        }
        return mods;
    }

    iterateExtraData(extraDataValues) {
        let dataSplit;
        let definition = this;
        extraDataValues.forEach(function (data) {
            if (data.trim().indexOf(":") != -1) {
                dataSplit = data.split(":");
                definition.setImportSheetExtraData(dataSplit[0].trim(), dataSplit[1].trim());
            }
        });
    }

    setImportSheetExtraData(property, value) {
    }
}

class TechniqueDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.tier = json.tier;
        this.affinity = json.affinity;
        this.isFree = json.isFree;
        this.passiveBoosts = json.passiveBoosts;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "tier":
                this.tier = parseInt(value);
                break;
            case "affinity":
                this.affinity = value;
                break;
            case "isFree":
                this.isFree = value.toLowerCase() == "true";
                break;
            case "passiveBoosts":
                this.passiveBoosts = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.tier = 0;
        this.affinity = "";
        this.isFree = false;
        this.passiveBoosts = [];
    }

    isPassive() {
        return this.passiveBoosts.length > 0;
    }
}

class TechniqueStyleDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.mainGroup = json.mainGroup;
        this.cr = json.cr;
        this.affinity = json.affinity;
        this.requirements = json.requirements;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "cr":
                this.cr = parseInt(value);
                break;
            case "affinity":
                this.affinity = value;
                break;
            case "requirements":
                this.requirements = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.mainGroup = "";
        this.cr = 0;
        this.affinity = "";
        this.requirements = "";
    }
}

class LanguageDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.location = json.location;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "location":
                this.location = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.location = "";
    }
}

class JobDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.requirements = json.requirements;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "requirements":
                this.requirements = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.requirements = "";
    }
}

class StatusDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.shortDescription = json.shortDescription;
        this.points = json.points;
        this.endsOnRoundStart = json.endsOnRoundStart;
        this.endsOnTrigger = json.endsOnTrigger;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "endsOnRoundStart":
                this.endsOnRoundStart = value.toLowerCase() == "true";
                break;
            case "endsOnTrigger":
                this.endsOnTrigger = value.toLowerCase() == "true";
                break;
            case "shortDescription":
                this.shortDescription = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.shortDescription = "";
        this.points = 0;
        this.endsOnRoundStart = false;
        this.endsOnTrigger = false;
    }
}

class ItemDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.category = json.category;
        this.value = json.value;
        this.bulk = json.bulk;
        this.traits = json.traits;
        this.description = json.description;
        this.techInfo = json.techInfo;
    }
    createEmpty() {
        super.createEmpty();
        this.category = "";
        this.value = 0;
        this.bulk = 0;
        this.traits = "";
        this.description = "";
        this.techInfo = {};
    }
}

// Special Display
class TechniqueDisplayData {

    constructor(technique) {
        this.createEmpty();
        if (technique != undefined) {
            this.importTechnique(technique);
        }
    }

    importTechnique(technique) {
        this.setTechBasics(technique);
        this.setTechSetResourceData(technique);
        this.setTechTargetData(technique);
        this.setExtentionEffects(technique);
        this.setTraits(technique);
        this.setFlavorText(technique);
        this.setDefinitions(technique);
        this.setEffects(technique);
    }

    setTechBasics(technique) {
        this.technique = technique;
        this.name = technique.name;
        this.displayname = technique.displayname;
        this.sheetname = technique.sheetname;
        this.definition = technique.createDefinition(WuxDef.Get("Technique"));
        this.fieldName = Format.ToFieldName(technique.name);
        this.actionType = technique.action;
        this.isFree = technique.isFree;
    }

    setTechSetResourceData(technique) {
        this.resourceData = "";
        if (technique.action == "Brief" || technique.action == "Short" || technique.action == "Long") {
            this.resourceData = `During a ${technique.action} Rest`;
        }
        else if (technique.group != "") {
            this.resourceData = `${technique.action} ${technique.group}`;
        }
        else {
            this.resourceData = `${technique.action} Action`;
        }
        if (technique.limits != "") {
            if (this.resourceData != "") {
                this.resourceData += "; ";
            }
            this.resourceData += technique.limits;
        }
        if (technique.resourceCost != "") {
            let resourceNames = technique.resourceCost.split(";");
            for (let i = 0; i < resourceNames.length; i++) {
                let resource = resourceNames[i].trim().split(" ", 2);
                let resourceName = WuxDef.GetTitle(resource[1]);

                if (this.resourceData != "") {
                    this.resourceData += "; ";
                }
                this.resourceData += `${resource[0]} ${resourceName}`
            }
        }
    }

    setTechTargetData(technique) {
        this.targetData = technique.skill == "" ? "No Check" : technique.skill;
        if (technique.range != "") {
            if (this.targetData != "") {
                this.targetData += "; ";
            }
            this.targetData += `Range: ${technique.range}`;
        }
        if (technique.target != "") {
            if (this.targetData != "") {
                this.targetData += "; ";
            }
            if (technique.size > 0) {
                if (technique.target.includes("Target")) {
                    this.targetData += `${technique.size} ${technique.target}`;
                }
                else {
                    this.targetData += `${technique.target} ${technique.size}`;
                }
            }
        }
    }

    setExtentionEffects(technique) {
        this.requirements = technique.requirement;
        this.itemTraits = WuxDef.GetValues(technique.itemTraits, ";");
        this.trigger = technique.trigger;
    }

    setTraits(technique) {
        this.traits = WuxDef.GetValues(technique.traits, ";", "Trait_");
    }

    setFlavorText(technique) {
        this.flavorText = technique.flavorText;
    }

    setDefinitions(technique) {
        if (technique.definitions == undefined) {
            this.definitions = [];
            let definition = new DefinitionData();
            definition.title = "Error! No definitions found!";
            this.definitions.push(definition);
        } else {
            for (let i = 0; i < technique.definitions.length; i++) {
                this.definitions.push(WuxDef.Get(technique.definitions[i]));
            }
        }
    }

    setEffects(technique) {
        this.effects = [];
        let techDisplayData = this;
        let filteredTechniqueEffects = [];
        let defense = "";
        technique.effects.iterate(function (effect) {
            if (effect.defense == defense) {
                filteredTechniqueEffects.push(effect);
            }
            else {
                if (filteredTechniqueEffects.length > 0) {
                    techDisplayData.effects.push(new TechniqueEffectDisplayData(filteredTechniqueEffects));
                    filteredTechniqueEffects = [];
                }
                filteredTechniqueEffects.push(effect);
                defense = effect.defense;
            }
        });
        if (filteredTechniqueEffects.length > 0) {
            techDisplayData.effects.push(new TechniqueEffectDisplayData(filteredTechniqueEffects));
        }
    }

    createEmpty() {
        this.technique = {};
        this.name = "";
        this.actionType = "";
        this.displayname = "";
        this.sheetname = "";
        this.definition = {};
        this.fieldName = "";
        this.isFree = false;

        this.resourceData = "";
        this.targetData = "";
        this.traits = [];

        this.trigger = "";
        this.requirements = "";
        this.itemTraits = [];

        this.flavorText = "";
        this.effects = [];
        this.definitions = [];
    }

    getRollTemplate(addTechnique) {
        let output = "";

        output += `{{Displayname=${this.displayname}}}{{Name=${this.name}}}{{type-${this.actionType}=1}}`;
        if (this.resourceData != "") {
            output += `{{Resources=${this.resourceData}}}`;
        }
        if (this.targetData != "") {
            output += `{{Targeting=${this.targetData}}}`;
        }
        if (this.traits.length > 0) {
            output += this.rollTemplateDefinitions(this.traits, "Trait");
        }
        if (this.trigger != "") {
            output += `{{Trigger=${this.trigger}}}`;
        }
        if (this.requirements != "") {
            output += `{{Requirement=${this.requirements}}}`;
        }
        if (this.itemTraits.length > 0) {
            output += this.rollTemplateDefinitions(this.itemTraits, "ItemTrait");
        }
        if (this.flavorText != "") {
            output += `{{FlavorText=${this.flavorText}}}`;
        }
        if (this.effects.length > 0) {
            output += this.rollTemplateEffects();
        }
        if (this.definitions.length > 0) {
            output += this.rollTemplateDefinitions(this.definitions, "Def");
        }
        if (addTechnique) {
            if (this.technique.resourceCost != "") {
                let consumeData = new TechniqueResources([this.technique.sheetname, this.technique.name, this.technique.resourceCost]);
                output += `{{consumeData=!ctech ${consumeData.sanitizeSheetRollAction(JSON.stringify(consumeData))}}}`;
            }
            output += `{{targetData=${this.technique.getUseTech()}}}`;
        }

        return `&{template:technique} ${this.sanitizeSheetRollAction(output.trim())}`;
    }

    rollTemplateDefinitions(definition, traitType) {
        let output = "";
        for (let i = 0; i < definition.length; i++) {
            output += `{{${traitType}${i}=${definition[i].title}}} {{${traitType}${i}Desc=${definition[i].getDescription()}}} `;
        }
        return output;
    }

    rollTemplateEffects() {
        let output = "";
        let incrementer = 0;
        this.effects.forEach(function (effect) {
            if (effect.check != undefined) {
                output += `{{Effect${incrementer}Name=${effect.check}}}{{Effect${incrementer}Desc=${effect.checkDescription}}}`;
                if (effect.effects != undefined) {
                    effect.effects.forEach(function (desc) {
                        output += `{{Effect${incrementer}=${desc}}}`;
                        incrementer++;
                    });
                }
                incrementer++;
            }
        });
        return output;
    }

    sanitizeSheetRollAction(roll) {
        let sheetRoll = roll;
        sheetRoll = sheetRoll.replace(/'/g, "&#39;");
        // sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        // sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        // sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        // sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        // sheetRoll = sheetRoll.replace(/"/g, "&#34;");
        // sheetRoll = sheetRoll.replace(/:/g, "");
        // sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        // sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        // sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        // sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        // sheetRoll = sheetRoll.replace(/\n/g, "&&");
        return sheetRoll;
    }
}

class TechniqueEffectDisplayData {

    constructor(techniqueEffects) {
        this.check = "";
        this.checkDescription = "";
        this.effects = [];

        this.importDefenseData(techniqueEffects[0]);
        this.importEffectData(techniqueEffects);
    }

    importDefenseData(techniqueEffect) {
        let defense = techniqueEffect.defense;
        let definition;

        if (isNaN(parseInt(defense))) {
            if (defense == "") {
                definition = WuxDef.Get("Title_TechEffect");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "Def_Evasion") {
                definition = WuxDef.Get("Title_TechEvasion");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "TechOnEnter") {
                definition = WuxDef.Get("Title_TechOnEnter");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "TechOnEndFocus") {
                definition = WuxDef.Get("Title_TechOnEndFocus");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "TechNewTargets") {
                definition = WuxDef.Get("Title_TechNewTargets");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else {
                definition = WuxDef.Get(defense);
                if (definition.group == "Result") {
                    this.check = `${definition.getTitle()}`;
                    this.checkDescription = `${definition.getDescription()}`;
                } else {
                    let definition2 = WuxDef.Get("Title_TechDefense");
                    this.check = `${definition2.getTitle()}${definition.getTitle()}`;
                    this.checkDescription = `${definition2.getDescription()}\n${definition.getDescription()}`;
                }
            }
        } else {
            definition = WuxDef.Get("Title_TechDC");
            this.check = `${definition.getTitle()}${defense}`;
            this.checkDescription = definition.getDescription();
        }
    }

    importEffectData(effectData) {
        for (let i = 0; i < effectData.length; i++) {
            let formattedEffect = this.formatEffect(effectData[i]);
            if (formattedEffect != "") {
                this.effects.push(formattedEffect);
            }
        }
    }

    formatEffect(effect) {
        let output= this.formatTemporaryEffect(effect);
        switch (effect.type) {
            case "HP":
                output += this.formatHpEffect(effect);
                break;
            case "WILL":
                output += this.formatWillEffect(effect);
                break;
            case "Vitality":
                output += this.formatVitalityEffect(effect);
                break;
            case "Patience":
                output += this.formatPatienceMeterEffect(effect);
                break;
            case "Favor":
                output += this.formatSocialMeterEffect(effect, WuxDef.GetTitle("Soc_Favor"));
                break;
            case "Influence":
                output += this.formatInfluenceMeterEffect(effect);
                break;
            case "Request":
                output += this.formatRequestEffect(effect);
                break;
            case "Status":
                output += this.formatStatusEffect(effect);
                break;
            case "Resistance":
                output += this.formatResistanceEffect(effect);
                break;
            case "Advantage":
                output += this.formatAdvantageEffect(effect);
                break;
            case "Boost":
                output += this.formatBoostEffect(effect);
                break;
            case "Terrain":
                output += this.formatTerrainEffect(effect);
                break;
            case "Structure":
                output += this.formatStructureEffect(effect);
                break;
            case "Move":
                output += this.formatMoveEffect(effect);
                break;
            case "EN":
                output += this.formatEnEffect(effect);
                break;
            case "Definition":
                // Do nothing
                break;
            case "Desc":
            case "":
                output += this.formatDescriptionEffect(effect);
                break;
        }

        return output;
    }

    formatTemporaryEffect(effect) {
        switch (effect.duration) {
            case "Trigger":
                return "Against the triggering effect, ";
            case "Turn":
                return "Until the end of the turn, ";
            case "Round":
                return "Until the end of the round, ";
            case "Focus":
                return "Until you lose focus, ";
            case "Conflict":
                return "Until the end of the conflict, ";
        }
        return "";
    }

    formatHpEffect(effect) {
        let hp = WuxDef.GetTitle("HP");
        switch (effect.subType) {
            case "Heal":
                return `Heal ${this.formatCalcBonus(effect)} ${hp}`;
            case "Surge":
                return `If target has a surge, they must spend one and heal ${this.formatCalcBonus(effect)} ${hp}`;
            default:
                return `${this.formatCalcBonus(effect)} ${WuxDef.GetTitle(effect.effect)} damage`;
        }
    }

    formatWillEffect(effect) {
        let willpower = WuxDef.GetTitle("WILL");
        switch (effect.subType) {
            case "Heal":
                return `Heal ${this.formatCalcBonus(effect)} ${willpower}`;
            default:
                return `${this.formatCalcBonus(effect)} ${willpower} damage`;
        }
    }

    formatVitalityEffect(effect) {
        let vitality = WuxDef.GetTitle("Cmb_Vitality");
        switch (effect.subType) {
            case "Heal":
                return `Gain ${this.formatCalcBonus(effect)} ${vitality}`;
            default:
                return `Lose ${this.formatCalcBonus(effect)} ${vitality}`;
        }
    }

    formatSocialMeterEffect(effect, type) {
        switch (effect.subType) {
            case "Heal":
                return `Reduce target's ${type} by ${this.formatCalcBonus(effect)}`;
            default:
                return `Increase target's ${type} by ${this.formatCalcBonus(effect)}`;
        }
    }

    formatInfluenceMeterEffect(effect) {
        let subTypes = effect.subType.split(":");
        switch (subTypes[0]) {
            case "Raise":
                return `You raise the severity of an influence on your target.`;
            case "Lower":
                return `You lower the severity of an influence on your target.`;
            case "Adjust":
                return `You raise or lower the severity of an influence on your target.`;
            case "Reveal":
                return "A related influence to the statement is revealed to you. You learn whether the influence is supportive or oppositional.";
            case "RevealNeg":
                return "A related oppositional influence to the statement is revealed to you.";
            case "RevealPos":
                return "A related supportive influence to the statement is revealed to you.";
            case "Add":
                return `The target gains the influence, "${effect.effect}" which is at ${subTypes[1]} Severity. This influence is removed if the target becomes hostile towards you or the social conflict ends. `;
        }
    }

    formatPatienceMeterEffect(effect) {
        let patience = WuxDef.GetTitle("Soc_Patience");
        switch (effect.subType) {
            case "Heal":
                return `Increase target's ${patience} by ${this.formatCalcBonus(effect)}`;
            default:
                return `Reduce target's ${patience} by ${this.formatCalcBonus(effect)}`;
        }
    }

    formatRequestEffect(effect) {
        return `Make a request check on the target with ${this.formatCalcBonus(effect)}`;
    }

    formatStatusEffect(effect) {
        let state = WuxDef.Get(effect.effect);
        let target = "Target";
        let plural = "s";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
        }

        switch (effect.subType) {
            case "Add":
                return `${target} gain${plural} the ${state.title} ${state.group}`;
            case "Remove":
                return `${target} lose${plural} the ${state.title} ${state.group}`;
            case "Remove Any":
                return `${target} lose${plural} any condition of your choice`;
            case "Remove All":
                return `${target} lose${plural} all conditions of your choice`;
            case "Remove Will":
                return `${target} lose${plural} all emotions of their choice`;
            case "Self":
                return `${target} gain${plural} the ${state.title} ${state.group} targeted towards the caster`;
            case "Choose":
                return `${target} gain${plural} the ${state.title} ${state.group} targeted towards a character of your choice`;
            default:
                return `${target} gain${plural} the ${state.title} ${state.group}`;
        }
    }
    
    formatResistanceEffect(effect) {
        let target = "Target";
        let plural = "s";
        let copulas = "is";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
        }
        let resistance = WuxDef.GetTitle("Resistance");
        let damageType = WuxDef.GetTitle(effect.effect);
        return `${target} gain${plural} ${this.formatCalcBonus(effect)} ${resistance} against ${damageType} damage`;
    }

    formatAdvantageEffect(effect) {
        let target = "The Target";
        let plural = "s";
        let owner = "their";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
            owner = "your";
        }
        let formatCalc = this.formatCalcBonus(effect);

        switch (effect.subType) {
            case "Opponent":
                return `The next ${effect.effect} made against ${target} gains +${Math.abs(formatCalc)} ${formatCalc > 0 ? "Advantage" : "Disadvantage"}`;
            default:
                return `${target} gain${plural} +${Math.abs(formatCalc)} ${formatCalc > 0 ? "Advantage" : "Disadvantage"} on ${owner} next ${effect.effect}`;
        }
    }

    formatBoostEffect(effect) {
        switch (effect.subType) {
            case "Set":
                return `${WuxDef.GetTitle(effect.effect)} is set to ${this.formatCalcBonus(effect)}`;
            case "Penalty":
                return `${WuxDef.GetTitle(effect.effect)} decreases by ${this.formatCalcBonus(effect)}`;
            default:
                return `${WuxDef.GetTitle(effect.effect)} increases by ${this.formatCalcBonus(effect)}`;
        }
    }

    formatTerrainEffect(effect) {
        let terrainType = WuxDef.GetTitle(effect.effect);
        switch (effect.subType) {
            case "Add":
                return `The area is considered [${terrainType}].`;
            case "Remove":
                return `Any effects in the area considered [${terrainType}] are removed.`;
        }
    }

    formatStructureEffect(effect) {
        switch (effect.subType) {
            case "Count":
                return `You create ${this.formatCalcBonus(effect)} ${effect.effect} in the targeted spaces.`;
            case "Height":
                return `Each ${effect.effect} is ${this.formatCalcBonus(effect)} spaces high.`;
            case "HP":
                return `Each ${effect.effect} has ${this.formatCalcBonus(effect)} ${WuxDef.GetTitle("HP")}.`;
            default:
                return effect.effect;
        }
    }

    formatMoveEffect(effect) {
        let target = "Target";
        let plural = "s";
        let copulas = "is";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
            copulas = "are";
        }
        
        switch (effect.subType) {
            case "Charge":
                return `${target} gain${plural} ${this.formatCalcBonus(effect)} Move Charge.`;
            case "Pushed":
                return `${target} ${copulas} Pushed ${this.formatCalcBonus(effect)} spaces ${effect.effect == "" ? "from you." : effect.effect}`;
            case "Pulled":
                return `${target} ${copulas} Pulled ${this.formatCalcBonus(effect)} spaces ${effect.effect == "" ? "towards you." : effect.effect}`;
            case "ForceMove":
                return `${target} ${copulas} Force Moved ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "." : " " + effect.effect}`;
            case "Aloft":
                return `${target} stays aloft and moves up to ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "." : " " + effect.effect}`;
            case "Float":
                return `${target} Float${plural}.`;
            case "FreeMove":
                return `${target} may Free Move up to ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "." : " " + effect.effect}`;
            case "Sneak":
                return `${target} may Move up to ${this.formatCalcBonus(effect)} spaces. Your movement does not break your hidden status.`;
            case "Invis":
                return `${target} may Move up to ${this.formatCalcBonus(effect)} spaces. Your movement does not break your hidden or invisible status.`;
            default:
                return `${target} may Move up to ${this.formatCalcBonus(effect)} spaces.`;
        }
    }

    formatEnEffect(effect) {
        let effectTotal = this.formatCalcBonus(effect);
        if (effect.target == "Self") {
            return `You gain ${effectTotal} ${WuxDef.GetTitle("EN")}`;
        } else {
            return `Target gains ${effectTotal} ${WuxDef.GetTitle("EN")}`;
        }
    }

    formatDescriptionEffect(effect) {
        return effect.effect;
    }

    getTargetString(effect, plural) {
        let output = {
            target: "",
            plural: ""
        };
        if (effect.target == "Self") {
            output.target = "You";
            output.plural = "";
        } else {
            output.target = "Target";
            output.plural = plural;
        }
        return output;
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        let formulaString;
        try {
            formulaString = effect.formula.getString();
        } catch (e) {
            formulaString = `Something went wrong: ${JSON.stringify(effect.formula)}`;
        }
        if (formulaString != "" && output != "") {
            output += " + ";
        }
        return output + formulaString;
    }

    formatEffectDice(effect) {
        if (effect.dVal != "" && effect.dVal > 0) {
            return `${effect.dVal}d${effect.dType}`;
        }
        return "";
    }
}

class ItemDisplayData {
    constructor(item) {
        this.createEmpty();
        if (item != undefined) {
            this.importItem(item);
        }
    }

    importItem(item) {
        this.item = item;
        this.name = item.name;
        this.displayname = item.displayname;
        this.sheetname = item.sheetname;
        this.group = `${item.group}${item.category != "" ? ` (${item.category})` : ""}`;
        this.stats = `Base Value: ${item.value}; Bulk: ${item.bulk}`;
        this.traits = WuxDef.GetValues(item.traits, ";", "Trait_");
        this.description = item.description;
        
        if (item.itemType == "UsableItem") {
            this.craftSkill = `DC ${item.dc} ${item.skill} Check; Time: ${item.time}`;
            this.craftMaterials = item.skill == "Build" ? `${item.bulk}` : "";
            if (item.components != "") {
                this.craftComponents = this.getComponents(item.components);
            }
        }
    }

    getComponents(components) {
        let setDelimiter = ";";
        let quantityDelimiter = " ";
        let typeDelimiter = "_";
        
        components = components.split(setDelimiter);

        let output = [];
        let splitter = "";
        let quantity = "";
        let type = "";
        let name = "";
        let item = {};

        for (let i = 0; i < components.length; i++) {
            item = undefined;
            let firstIndex = components[i].indexOf(quantityDelimiter);
            quantity = components[i].substring(0, firstIndex);
            splitter = components[i].substring(firstIndex + 1).split(typeDelimiter);
            type = splitter[0];
            name = splitter[1];
            switch (type) {
                case "Goods":
                    item = WuxGoods.Get(name);
                    break;
                case "GoodsCat":
                    output.push({
                        quantity: quantity,
                        type: "Goods Category",
                        item: item,
                        name: `${quantity} ${item.name}`,
                        desc: item.description
                    });
                    break;
                default:
                    item = WuxItems.Get(name);
                    break;
            }
            
            if (item != undefined) {
                output.push({
                    quantity: quantity,
                    type: type,
                    item: item,
                    name: `${quantity} ${item.name}`,
                    desc: item.description
                });
            }
        }

        return output;
    }

    createEmpty() {
        this.item = {};
        this.name = "";
        this.displayname = "";
        this.sheetname = "";
        this.group = "";
        this.stats = "";
        this.traits = [];
        this.description = "";
        this.craftSkill = "";
        this.craftMaterials = "";
        this.craftComponents = [];
    }
}

// Helper

class FormulaData {

    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (data.workers == undefined) {
                this.importFormula(data);
            } else {
                this.importJson(data);
            }
        }
    }

    createEmpty() {
        this.workers = [];
    }

    importJson(json) {
        this.workers = json.workers;
    }

    importFormula(data) {
        data = "" + data;
        if (data == "" || data == undefined) {
            return;
        }

        let formulaData = this;
        let definition = {};
        let modDefinition = {};
        let formulaVar = "";
        this.iterateFormulaComponentsForImport(data, function (definitionName, definitionNameModifier, multiplier, max) {
            if (isNaN(parseInt(definitionName))) {
                definition = WuxDef.Get(definitionName);
                if (definitionNameModifier == "") {
                    formulaVar = definition.getVariable();
                } else {
                    modDefinition = WuxDef.Get(definitionNameModifier);
                    formulaVar = definition.getVariable(modDefinition.getVariable());
                }

                formulaData.workers.push(formulaData.makeWorker(formulaVar, definitionName, 0, multiplier, max));
            } else {
                formulaData.workers.push(formulaData.makeWorker("", "", parseInt(definitionName), multiplier, max));
            }
        })
    }

    iterateFormulaComponentsForImport(baseFormula, callback) {
        let definitionName = "";
        let definitionNameModifier = "";
        let multiplier = 1;
        let max = 0;
        let formulaArray = baseFormula.split(";");
        formulaArray.forEach((formula) => {
            definitionName = formula.trim();
            max = 0;
            multiplier = 1;
            if (formula.indexOf("$") > -1) {
                let split = definitionName.split("$");
                definitionName = split[0];
                max = parseInt(split[1]);
            }
            if (formula.indexOf("*") > -1) {
                let split = definitionName.split("*");
                definitionName = split[0];
                multiplier = split[1];
            }

            definitionNameModifier = "";
            if (formula.indexOf(":") > -1) {
                let split = definitionName.split(":");
                definitionName = split[0];
                definitionNameModifier = split[1];
            }

            callback(definitionName, definitionNameModifier, multiplier, max);
        });
    }

    addAttributes(attributes) {
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i] != "") {
                this.workers.push(this.makeWorker(attributes[i], "", 0, 1, 0));
            }
        }
    }

    makeWorker(variableName, definitionName, value, multiplier, max) {
        return {
            variableName: variableName,
            definitionName: definitionName,
            value: isNaN(parseInt(value)) ? 0 : parseInt(value),
            multiplier: isNaN(parseInt(multiplier)) ? 1 : parseInt(multiplier),
            max: max
        }
    }

    getAttributes() {
        let attributes = [];
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].variableName != "") {
                attributes.push(this.workers[i].variableName);
            }
        }
        return attributes;
    }

    getDefinitions() {
        let definitions = [];
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].definitionName != "") {
                definitions.push(this.workers[i].definitionName);
            }
        }
        return definitions;
    }

    hasFormula() {
        return this.workers.length > 0;
    }

    getValue(attributeHandler, printName) {
        let output = 0;
        let mod = 0;
        let printOutput = "";
        this.workers.forEach((worker) => {
            if (worker.variableName != "") {
                worker.value = attributeHandler.parseInt(worker.variableName);
                if (printName != undefined) {
                    printOutput = this.addPrintModifier(printOutput, `${worker.variableName}(${worker.value})`, worker.multiplier);
                }
            } else if (printName != undefined) {
                printOutput = this.addPrintModifier(printOutput, `${worker.value}`, worker.multiplier);
            }
            mod = worker.value * worker.multiplier;
            if (worker.max > 0 && mod > worker.max) {
                mod = worker.max;
            }
            output += mod;
        });
        if (printName != undefined) {
            Debug.Log(`${printName} Formula: ${printOutput} = ${output}`);
        }
        return output;
    }
    addPrintModifier(printOutput, value, multiplier) {
        if (printOutput != "") {
            printOutput += ` + `;
        }
        printOutput += value;
        if (multiplier != 1) {
            printOutput += `*${multiplier}`;
        }
        return printOutput;
    }

    getString() {
        let output = "";
        let definition = {};
        this.workers.forEach((worker) => {
            if (worker.variableName != "") {
                if (worker.definitionName != "") {
                    definition = WuxDef.Get(worker.definitionName);
                    if (definition != undefined) {
                        if (output != "") {
                            output += " + ";
                        }
                        if (worker.multiplier != 1) {
                            if (worker.multiplier > 1) {
                                output += `[${definition.title} x ${worker.multiplier}]`;
                            } else {
                                switch (worker.multiplier) {
                                    case 0.5:
                                        output += `[½ ${definition.title}]`;
                                        break;
                                    case 0.33:
                                        output += `[⅓ ${definition.title}]`;
                                        break;
                                    case 0.25:
                                        output += `[¼ ${definition.title}]`;
                                        break;
                                    case 0.2:
                                        output += `[⅕ ${definition.title}]`;
                                        break;
                                }
                            }
                        } else {
                            output += `[${definition.title}]`;
                        }

                        if (worker.max > 0) {
                            output += `(max:${worker.max})`;
                        }
                    }
                }
            } else {
                if (output != "") {
                    output += " + ";
                }
                output += worker.value;
            }

        });
        return output;
    }
}

class DieRoll {
    constructor(dieRoll) {
        this.createEmpty();
        if (dieRoll != undefined) {
            this.clone(dieRoll);
        }
    }

    createEmpty() {
        this.rolls = [];
        this.keeps = [];
        this.message = "";
        this.total = 0;
    }

    clone(dieRoll) {
        this.rolls = dieRoll.rolls;
        this.keeps = dieRoll.keeps;
        this.message = dieRoll.message;
        this.total = dieRoll.total;
    }

    rollDice(dieValue, dieType) {
        this.rolls = [];
        this.message = "Rolls(";
        let dieRoll = 0;
        while (dieValue > 0) {
            dieValue--;
            dieRoll = randomInteger(dieType);
            this.rolls.push(dieRoll);
            this.message += `${dieRoll}`;
            if (dieValue > 0) {
                this.message += `, `;
            }
        }
        this.message += `)`;
        this.total = this.totalValues(this.rolls);
    }

    totalValues(values) {
        let total = 0;
        _.each(values, function (obj) {
            total += obj;
        });
        return total;
    }

    sortRollsAscending() {
        this.rolls.sort();
    }

    sortRollsDescending() {
        this.rolls = Format.SortArrayDecrementing(this.rolls);
    }

    dropRollDice(dieCount, dieType, keepCount, keepHigh) {
        this.rollDice(dieCount, dieType);
        if (keepHigh) {
            this.sortRollsDescending();
        } else {
            this.sortRollsAscending();
        }

        this.message = "Rolls(";
        for (let i = 0; i < this.rolls.length; i++) {
            if (i < keepCount) {
                this.keeps.push(this.rolls[i]);
                this.message += `[${this.rolls[i]}]`;
            } else {
                this.message += `${this.rolls[i]}`;
            }
            if (i < this.rolls.length - 1) {
                this.message += `, `;
            }
        }
        this.message += `)`;
        this.total = this.totalValues(this.keeps);
    }

    rollCheck(advantages) {
        let dieCount = 2 + Math.abs(advantages);
        let dieType = 6;
        this.dropRollDice(dieCount, dieType, 2, advantages >= 0);
    }

    addModToRoll(mod) {
        this.total += mod;
        this.message += ` + Mod[${mod}]`;
    }

    rollSkillCheck(advantages, mod) {
        this.rollCheck(advantages);
        this.addModToRoll(mod);
    }
}

class ResistanceData {
    constructor(json) {
        if (json != undefined) {
            this.importJson(json);
        } else {
            this.createEmpty();
        }
    }

    importJson(json) {
        this.damageTypes = json.damageTypes;
        for (let i = 0; i < this.damageTypes.length; i++) {
            this[this.damageTypes[i]] = json[this.damageTypes[i]];
        }
    }

    createEmpty() {
        let damageTypeDefs = WuxDef.Filter(new DatabaseFilterData("group", "DamageType"));
        this.damageTypes = [];
        for (let i = 0; i < damageTypeDefs.length; i++) {
            this.damageTypes.push(damageTypeDefs[i].name);
            this[damageTypeDefs[i].name] = 0;
        }
    }

    addResistanceData(resistanceData) {
        for (let i = 0; i < this.damageTypes.length; i++) {
            this[this.damageTypes[i]] += resistanceData[this.damageTypes[i]];
        }
    }

    addResistanceValue(damageType, value) {
        this[damageType] += value;
    }

    getResistanceValue(damageType) {
        return this[damageType];
    }

    getResistanceString(damageType) {
        if (this[damageType] == 0) {
            return "";
        } else if (this[damageType] > 0) {
            return `${damageType} Resistance: ${this[damageType]}`;
        } else {
            return `${damageType} Weakness: ${Math.abs(this[damageType])}`;
        }
    }

    getAllResistancesString() {
        let output = "";
        for (let i = 0; i < this.damageTypes.length; i++) {
            if (this[this.damageTypes[i]] > 0) {
                if (output != "") {
                    output += "\n";
                }
                output += `${damageType}: ${this[damageType]}`;
            }
        }

        return output;
    }

    getAllWeaknessesString() {
        let output = "";
        for (let i = 0; i < this.damageTypes.length; i++) {
            if (this[this.damageTypes[i]] < 0) {
                if (output != "") {
                    output += "\n";
                }
                output += `${damageType}: ${this[damageType]}`;
            }
        }

        return output;
    }
}

class StatusHandler {
    constructor(attributeHandler) {
        this.attributeHandler = attributeHandler;
        this.statusDef = WuxDef.Get("Status");
        this.attributeHandler.addMod(this.statusDef.getVariable());
        this.combatDetailsHandler = new CombatDetailsHandler(this.attributeHandler);
    }

    changeStatus(statusName, newValue) {
        let statusHandler = this;
        let status = WuxDef.Get(statusName);
        if (status == undefined) {
            Debug.LogError(`[StatusHandler][addStatus] Tried to add incorrect status ${statusName}`);
            return;
        }
        this.attributeHandler.addUpdate(status.getVariable(), newValue);
        this.attributeHandler.addMod(this.statusDef.getVariable());
        
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let statuses = attrHandler.parseJSON(statusHandler.statusDef.getVariable());
            if (statuses == undefined || statuses == "" || statuses == "0") {
                statuses = [];
            }
            if (!Array.isArray(statuses)) {
                statuses = [statuses];
            }
            if (newValue == "on") {
                if (statuses.includes(statusName)) {
                    return;
                }
                statuses.push(statusName);
                attrHandler.addUpdate(statusHandler.statusDef.getVariable(), JSON.stringify(statuses));
            } else if (newValue == 0) {
                let statusIndex = statuses.indexOf(statusName);
                if (statusIndex == -1) {
                    return;
                }
                statuses.splice(statusIndex, 1);
                attrHandler.addUpdate(statusHandler.statusDef.getVariable(), JSON.stringify(statuses));
            }

            statusHandler.combatDetailsHandler.onUpdateStatus(attrHandler, statuses);
        });
        this.attributeHandler.run();
    }
}

class CombatDetails {
    constructor(json) {
        this.createEmpty();
        if (json != undefined) {
            this.importJson(json);
        }
    }

    createEmpty() {
        this.displayStyle = "";
        this.displayName = "";
        this.cr = 1;
        this.job = "";
        this.jobDefenses = "";
        this.status = [];
        this.healvalue = 0;
        this.surges = 2;
        this.maxsurges = 2;
        this.vitality = 1;
        this.maxvitality = 1;
        this.supportiveInfluence = 0;
        this.opposingInfluence = 0;
    }

    importJson(json) {
        this.displayStyle = json.displayStyle != undefined ? json.displayStyle : "";
        this.displayName = json.displayName != undefined ? json.displayName : "";
        this.cr = json.cr != undefined ? json.cr : 1;
        this.job = json.job != undefined ? json.job : "";
        this.jobDefenses = json.jobDefenses != undefined ? json.jobDefenses : "";
        this.status = json.status != undefined ? json.status : [];
        this.healvalue = json.healvalue;
        this.surges = json.surges != undefined ? json.surges : 2;
        this.maxsurges = json.maxsurges != undefined ? json.maxsurges : 2;
        this.vitality = json.vitality != undefined ? json.vitality : 1;
        this.maxvitality = json.maxvitality != undefined ? json.maxvitality : 1;
        this.supportiveInfluence = json.supportiveInfluence != undefined ? json.supportiveInfluence : 0;
        this.opposingInfluence = json.opposingInfluence != undefined ? json.opposingInfluence : 0;
    }

    printTooltip() {
        let output = `${this.displayName} [CR${this.cr}] ${this.job}`;
        output += ` =========================== `;
        output += `${this.jobDefenses} - `;

        switch (this.displayStyle) {
            case "Battle":
                output += `HV:${this.healvalue}`;
                output += `.Surges:`;
                for (let i = 0; i < this.maxsurges; i++) {
                    output += i < this.surges ? `⛊` : `⛉`;
                }
                output += `.Vit:`;
                for (let i = 0; i < this.maxvitality; i++) {
                    output += i < this.vitality ? `♥` : `♡`;
                }
                break;
            case "Social":
                output += `Influences:`;
                for (let i = 0; i < 3; i++) {
                    output += i < this.supportiveInfluence ? `▲` : `△`;
                }
                for (let i = 0; i < 3; i++) {
                    output += i < this.opposingInfluence ? `▼` : `▽`;
                }
                break;
        }
        output += this.printTooltipStatus();
        return output;
    }

    printTooltipStatus() {
        let output = ` ==========STATUS========== `;

        if (this.status.length == 0) {
            output += `None`;
        } else {
            let statuses = "";
            let conditions = "";
            let emotions = "";
            for (let i = 0; i < this.status.length; i++) {
                let statusDef = WuxDef.Get(this.status[i]);
                switch (statusDef.subGroup) {
                    case "Status":
                        statuses = this.addStatusToTooltip(statusDef, "Status", statuses);
                        break;
                    case "Condition":
                        conditions = this.addStatusToTooltip(statusDef, "Conditions", conditions);
                        break;
                    case "Emotion":
                        emotions = this.addStatusToTooltip(statusDef, "Emotions", emotions);
                        break;
                }
            }
            output += statuses != "" ? `${statuses} ` : "";
            output += conditions != "" ? `${conditions} ` : "";
            output += emotions != "" ? `${emotions} ` : "";
        }

        return output;
    }

    addStatusToTooltip(statusDef, groupname, group) {
        if (group == "") {
            group = `${groupname}:`;
        } else {
            group += ";";
        }
        group += statusDef.title();
        return group;
    }
}

class CombatDetailsHandler {
    constructor(attributeHandler) {
        this.combatDetailsVar = WuxDef.GetVariable("CombatDetails");
        attributeHandler.addMod(this.combatDetailsVar);
        this.combatDetails = new CombatDetails();
    }

    printTooltip(attrHandler) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        return this.combatDetails.printTooltip();
    }

    onUpdateDisplayStyle(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.displayStyle = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateDisplayName(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.displayName = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateCR(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.cr = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateJob(attrHandler, jobDef) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.job = jobDef.title;
        this.combatDetails.jobDefenses = jobDef.defenses;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateHealValue(attrHandler, healValue) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.healvalue = healValue;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateStatus(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.status = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateSurges(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.surges = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateInfluences(attrHandler, support, oppose) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.supportiveInfluence = support;
        this.combatDetails.opposingInfluence = oppose;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
}

class AttributeHandler {
    constructor(mods) {
        if (Array.isArray(mods)) {
            this.mods = mods;
        } else {
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
        } else {
            this.mods.push(mods);
        }
    }

    addFormulaMods(definition, printLog) {
        if (printLog) {
            Debug.Log(`Adding formula mods for ${definition.name}`);
        }
        this.addMod(definition.formula.getAttributes());
    }

    addUpdate(attr, value) {
        if (value == undefined) {
            Debug.LogError(`[AttributeHandler][addUpdate] Tried to add undefined value for ${attr}. This is not allowed.`);
            return;
        }
        this.update[attr] = value;
    }

    addGetAttrCallback(callback) {
        this.getCallbacks.push(callback);
    }

    addFinishCallback(callback) {
        this.finishCallbacks.push(callback);
    }

    run() {
    }

    getCurrentValue(fieldName) {
        return this.current[fieldName];
    }

    getUpdateValue(fieldName) {
        return this.update[fieldName];
    }

    validateDefaultValue(defaultValue, newDefaultValue) {
        if (defaultValue == undefined) {
            return newDefaultValue;
        }
        return defaultValue;
    }

    parseString(fieldName, defaultValue) {
        defaultValue = this.validateDefaultValue(defaultValue, "");
        let output = this.databaseParseString(fieldName);
        if (output == undefined || output == "") {
            output = defaultValue;
        }
        return output;
    }

    databaseParseString(fieldName) {
        if (this.update[fieldName] != undefined) {
            return this.getUpdateValue(fieldName);
        } else if (this.current[fieldName] != undefined) {
            return this.getCurrentValue(fieldName);
        }
        return undefined;
    }

    parseInt(fieldName, defaultValue) {
        defaultValue = this.validateDefaultValue(defaultValue, 0);
        let output = this.databaseParseInt(fieldName);
        if (output == undefined || isNaN(output) || output == "") {
            output = defaultValue;
        }
        return output;
    }

    databaseParseInt(fieldName) {
        if (this.update[fieldName] != undefined) {
            return parseInt(this.getUpdateValue(fieldName));
        } else if (this.current[fieldName] != undefined) {
            return parseInt(this.getCurrentValue(fieldName));
        }
        return undefined;
    }

    parseFloat(fieldName, defaultValue) {
        defaultValue = this.validateDefaultValue(defaultValue, 0);
        let output = this.databaseParseFloat(fieldName);
        if (output == undefined || isNaN(output) || output == "") {
            output = defaultValue;
        }
        return output;
    }

    databaseParseFloat(fieldName) {
        if (this.update[fieldName] != undefined) {
            return parseFloat(this.getUpdateValue(fieldName));
        } else if (this.current[fieldName] != undefined) {
            return parseFloat(this.getCurrentValue(fieldName));
        }
        return undefined;
    }

    parseJSON(fieldName, defaultValue) {
        defaultValue = this.validateDefaultValue(defaultValue, "");
        let output = this.databaseParseJSON(fieldName);
        if (output == undefined || output == "") {
            output = defaultValue;
        }
        return output;
    }

    databaseParseJSON(fieldName) {
        if (this.update[fieldName] != undefined && this.update[fieldName] != "") {
            try {
                return JSON.parse(this.getUpdateValue(fieldName));
            }
            catch {
                return undefined;
            }
        } else if (this.current[fieldName] != undefined && this.current[fieldName] != "") {
            try {
                return JSON.parse(this.getCurrentValue(fieldName));
            }
            catch {
                return undefined;
            }
        }
        return undefined;
    }
}

class SandboxAttributeHandler extends AttributeHandler {
    constructor(characterId, mods) {
        super(mods);
        this.characterId = characterId;
        this.attributes = {};
        this.maxCheck = false;
    }

    setMaxCheck(isMax) {
        if (isMax == undefined) {
            this.maxCheck = false;
        }
        this.maxCheck = isMax;
    }

    getUpdateValue(fieldName) {
        return this.update[fieldName][this.maxCheck ? "max" : "current"];
    }

    parseString(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseString(fieldName, defaultValue);
    }

    databaseParseString(fieldName) {
        let output = super.databaseParseString(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return this.attributes[fieldName].get(this.maxCheck ? "max" : "current");
        }
        return output;
    }

    parseInt(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseInt(fieldName, defaultValue);
    }

    databaseParseInt(fieldName) {
        let output = super.databaseParseInt(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return parseInt(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
        }
        return output;
    }

    parseFloat(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseFloat(fieldName, defaultValue);
    }

    databaseParseFloat(fieldName) {
        let output = super.databaseParseFloat(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return parseFloat(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
        }
        return output;
    }

    parseJSON(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseJSON(fieldName, defaultValue);
    }

    databaseParseJSON(fieldName) {
        let output = super.databaseParseJSON(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return JSON.parse(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
        }
        return output;
    }

    addAttribute(attr) {
        if (this.attributes.hasOwnProperty(attr)) {
            return;
        }
        Debug.Log(`[SandboxAttributeHandler][addAttribute] Adding attribute ${attr}`);
        this.attributes[attr] = this.getCharacterAttribute(attr);
    }

    getAttribute(attr) {
        if (!this.attributes.hasOwnProperty(attr)) {
            return undefined;
        }
        return this.attributes[attr];
    }

    addUpdate(attr, value, isMax) {
        Debug.Log(`Adding update ${attr} with value ${value}`);
        if (this.attributes[attr] == undefined) {
            Debug.Log(`Adding the attribute ${attr}`);
            this.addAttribute(attr);
        }

        if (this.update[attr] != undefined && this.update[attr] != "") {
            this.update[attr][isMax ? "max" : "current"] = value;
        } else {
            let newUpdate = {};
            newUpdate[isMax ? "max" : "current"] = value;
            super.addUpdate(attr, newUpdate);
        }
    }

    run() {
        let attributeHandler = this;
        attributeHandler.mods.forEach((property) => {
            attributeHandler.current[property] = getAttrByName(this.characterId, property);
        });

        attributeHandler.finishCallbacks.forEach((callback) => {
            callback(attributeHandler);
        });

        // set the update changes
        let attribute = {};
        let updateData = {};
        for (let property in attributeHandler.update) {
            attribute = attributeHandler.attributes[property];
            updateData = attributeHandler.update[property];
            if (attribute != undefined && updateData != undefined) {
                for (let subProperty in updateData) {
                    attribute.set(subProperty, updateData[subProperty]);
                }
            }
        }
        
    }

    getCharacterAttribute(attrName) {
        let returnVal = undefined;
        let chracterAttributes = findObjs({
            _characterid: this.characterId,
            _type: "attribute",
            name: attrName
        }, {caseInsensitive: true});

        if (chracterAttributes.length > 0) {
            returnVal = chracterAttributes[0];
        }

        return returnVal;
    }
}


class RepeatingSectionHandler {
    constructor(definitionId, variableId) {
        this.definition = WuxDef.Get(definitionId);
        this.repeatingSection = this.definition.getVariable(variableId);
        this.ids = [];
        this.fieldNames = [];
    }

    addIds(ids) {
        if (Array.isArray(ids)) {
            this.ids = this.ids.concat(ids);
        } else {
            this.ids.push(ids);
        }
    }

    clearIds() {
        this.ids = [];
    }

    generateRowId() {
        return "";
    }
    
    addFieldNames(fieldNames) {
        if (Array.isArray(fieldNames)) {
            this.fieldNames = this.fieldNames.concat(fieldNames);
        } else {
            this.fieldNames.push(fieldNames);
        }
    }

    iterate(callback) {
        for (let i = 0; i < this.ids.length; i++) {
            callback(this.ids[i]);
        }
    }

    getFieldName(id, fieldName) {
        return `${this.repeatingSection}_${id}_${fieldName}`;
    }

    addAttributeMods(attributeHandler, fieldNames) {
        let repeater = this;

        if (!Array.isArray(fieldNames)) {
            fieldNames = [fieldNames];
        }
        this.iterate(function (id) {
            for (let i = 0; i < fieldNames.length; i++) {
                attributeHandler.addMod(repeater.getFieldName(id, fieldNames[i]));
            }
        });
    }

    getIdFromFieldName(fieldName) {
        return fieldName.split("_")[2];
    }

    removeId(id) {
        
    }

    removeAllIds() {
        for (let i = 0; i < this.ids.length; i++) {
            this.removeId(this.ids[i]);
        }
    }
}

class SandboxRepeatingSectionHandler extends RepeatingSectionHandler {
    
    constructor(definitionId, characterId, variableId) {
        super(definitionId, variableId);
        this.characterId = characterId;
    }

    generateUUID() {
        let a = 0, b = [];
        return function () {
            let c = (new Date()).getTime() + 0, d = c === a;
            a = c;
            for (let e = new Array(8), f = 7; 0 <= f; f--) {
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
            for (f = 0; 12 > f; f++) {
                c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
            }
            return c;
        };
    }

    generateRowId() {
        return this.generateUUID().replace(/_/g, "Z");
    }
    
    findRepeatingRowIdAttribute(id) {
        let chracterAttributes = findObjs({
            _characterid: this.characterId,
            _type: "attribute",
            name: id
        }, { caseInsensitive: true });

        if (chracterAttributes.length > 0) {
            return chracterAttributes[0];
        }
        return undefined;
    }
    
    removeId(id) {
        super.removeId(id);
        
        if (this.fieldNames.length == 0) {
            Debug.LogError(`[RepeatingSectionHandler][removeId] No field names to remove for ${this.repeatingSection}`);
            return;
        }
        
        for(let i = 0; i < this.fieldNames.length; i++) {
            let chracterAttribute = this.findRepeatingRowIdAttribute(this.getFieldName(id, this.fieldNames[i]));
            if (chracterAttribute != undefined) {
                chracterAttribute.remove();
            }
        }
    }
}

class WorkerBuildStat extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.value = parseInt(json.value);
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.value = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        this.name = "";
        this.value = "0";
    }
}

class WorkerBuildStats extends Dictionary {

    constructor() {
        super();
    }

    getIntValue(name) {
        let stat = this.get(name);
        return stat == undefined ? 0 : isNaN(parseInt(stat.value)) ? 0 : parseInt(stat.value);
    }

    getPointsTotal() {
        let points = 0;
        if (this.keys == undefined) {
            return points;
        }
        for (let i = 0; i < this.keys.length; i++) {
            if (this.values[this.keys[i]].value == "on") {
                points++;
            } else {
                points += isNaN(parseInt(this.values[this.keys[i]].value)) ? 0 : parseInt(this.values[this.keys[i]].value);
            }
        }
        return points;
    }

    cleanValues() {
        let key = "";
        let keys = [];
        let values = {};
        for (let i = 0; i < this.keys.length; i++) {
            key = this.keys[i];
            if (parseInt(this.values[key].value) != 0) {
                keys.push(key);
                values[key] = this.values[key];
            }
        }
        this.keys = keys;
        this.values = values;
    }
}

class WorkerFormula {
    constructor(variableName, definitionName, value, multiplier) {
        this.variableName = variableName;
        this.definitionName = definitionName;
        this.value = isNaN(parseInt(value)) ? 0 : parseInt(value);
        this.multiplier = isNaN(parseInt(multiplier)) ? 1 : parseInt(multiplier);
    }
}

// ====== Formatters

var FeatureService = FeatureService || (function () {
    'use strict';

    var

        // Display Technique (Variants)
        // ------------------------,

        getRollTemplate = function (techDisplayData) {
            let output = "";

            output += `{{Displayname=${techDisplayData.displayname}}}{{Name=${techDisplayData.name}}}{{SlotType=${techDisplayData.slotFooter}}}{{Source=${techDisplayData.slotSource}}}{{UsageInfo=${techDisplayData.usageInfo}}}${techDisplayData.traits.length > 0 ? rollTemplateTraits(techDisplayData.traits, "Trait") : ""}${techDisplayData.trigger ? `{{Trigger=${techDisplayData.trigger}}}` : ""}${techDisplayData.requirement ? `{{Requirement=${techDisplayData.requirement}}}` : ""}${techDisplayData.item ? `{{Item=${techDisplayData.item}}}` : ""}${techDisplayData.range ? `{{Range=${techDisplayData.range}}}` : ""}${techDisplayData.target ? `{{Target=${techDisplayData.target}}}` : ""}${techDisplayData.skill ? `{{SkillString=${techDisplayData.skill}}}` : ""}${techDisplayData.damage ? `{{DamageString=${techDisplayData.damage}}}` : ""}${techDisplayData.description ? `{{Desc=${techDisplayData.description}}}` : ""}${techDisplayData.onHit ? `{{OnHit=${techDisplayData.onHit}}}` : ""}${techDisplayData.conditions ? `{{Conditions=${techDisplayData.conditions}}}` : ""}`;
            output += ` {{type-${techDisplayData.slotType}=1}} ${techDisplayData.slotIsPath ? "{{isPath=1}} " : ""}{{type-${techDisplayData.actionType}=1}} ${techDisplayData.isFunctionBlock ? "{{type-FunctionBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlockTarget=1}} " : ""}${techDisplayData.isDescBlock ? "{{type-DescBlock=1}} " : ""}`;

            return `&{template:technique} ${output.trim()}`;
        },

        getRollTemplateFromTechnique = function (technique) {
            return getRollTemplate(new TechniqueDisplayData(technique));
        },

        // Formatting
        // ------------------------,

        rollTemplateTraits = function (traitsDb, rtPrefix) {
            let output = "";
            for (let i = 0; i < traitsDb.length; i++) {
                output += `{{${rtPrefix}${i}=${traitsDb[i].name}}} {{${rtPrefix}${i}Desc=${traitsDb[i].description}}} `;
            }
            return output;
        },

        getDamageString = function (feature) {

            let output = "";

            if (feature.dVal != "" && feature.dVal > 0) {
                output += feature.dVal + "d" + feature.dType;
            }
            if (feature.dBonus != "" && feature.dBonus != undefined) {
                let elements = feature.dBonus.split(";");
                for (let i = 0; i < elements.length; i++) {
                    output += `+${elements[i]}`;
                }
            }
            if (feature.damageType != "") {
                output += ` ${feature.damageType}`;
            }
            if (feature.element != undefined && feature.element != "") {
                output += ` [${feature.element}]`;
            }

            return output;
        },

        getPrerequisiteString = function () {
            return "";
        },

        // Technique Effects
        // ------------------------,

        getActionEffects = function (effects) {
            let actionEffectsObj = getActionEffectObj();

            if (effects != undefined && effects != "") {
                let keywordsSplit = effects.split(";");

                for (let i = 0; i < keywordsSplit.length; i++) {
                    parseActionEffect(actionEffectsObj, keywordsSplit[i]);
                }

            }

            return actionEffectsObj;
        },

        parseActionEffect = function (actionEffectsObj, actionEffect) {
            let data = actionEffect.split(":");
            let action = data[0];
            let effect = data[1];

            let targetSelf = false;
            if (action.includes("*")) {
                targetSelf = true;
                action = action.replace("*", "");
            }

            setActionEffectData(actionEffectsObj, action, effect, targetSelf);
        },

        setActionEffectData = function (actionEffectsObj, action, effect, targetSelf) {
            switch (action) {
                case "S":
                    actionEffectsObj.addState(effect, targetSelf);
                    break;
                case "C":
                    actionEffectsObj.addCondition(effect, targetSelf);
                    break;
                case "R":
                    actionEffectsObj.addRemoval(effect, targetSelf);
                    break;
                case "SR":
                    actionEffectsObj.addStatusRemoval(effect, targetSelf);
                    break;
                case "H":
                    actionEffectsObj.addHeal(effect, targetSelf);
                    break;
                case "T":
                    actionEffectsObj.addTempHeal(effect, targetSelf);
                    break;
                case "K":
                    actionEffectsObj.addEnergyRecovery(effect, targetSelf);
                    break;
            }
        },

        getActionEffectObj = function () {
            return {
                states: [],
                conditions: [],
                removals: [],
                statusRemovals: [],
                heals: [],
                tempHeals: [],
                kiRecoveries: [],

                createTargetData: function (name, targetSelf) {
                    return {name: name, targetSelf: targetSelf};
                },

                addState: function (name, targetSelf) {
                    this.states.push(this.createTargetData(name, targetSelf));
                },

                addCondition: function (name, targetSelf) {
                    this.conditions.push(this.createTargetData(name, targetSelf));
                },

                addRemoval: function (name, targetSelf) {
                    this.removals.push(this.createTargetData(name, targetSelf));
                },

                addStatusRemoval: function (name, targetSelf) {
                    this.statusRemovals.push(this.createTargetData(name, targetSelf));
                },

                addHeal: function (name, targetSelf) {
                    this.heals.push(this.createTargetData(name, targetSelf));
                },

                addTempHeal: function (name, targetSelf) {
                    this.tempHeals.push(this.createTargetData(name, targetSelf));
                },

                addEnergyRecovery: function (name, targetSelf) {
                    this.kiRecoveries.push(this.createTargetData(name, targetSelf));
                }
            };
        }

    ;
    return {
        GetRollTemplate: getRollTemplate,
        GetRollTemplateFromTechnique: getRollTemplateFromTechnique,
        RollTemplateTraits: rollTemplateTraits,
        GetDamageString: getDamageString,
        GetPrerequisiteString: getPrerequisiteString,
        GetActionEffects: getActionEffects
    };

}());

var ItemHandler = ItemHandler || (function () {
    'use strict';

    let getTechniqueWeaponRollTemplate = function (itemData) {
            let output = "";
            output += `{{WpnName=${itemData.name}}} `;

            output += FeatureService.RollTemplateTraits(WuxDef.Get(itemData.traits), "WpnTrait");
            output += FeatureService.RollTemplateTraits(WuxDef.Get(itemData.abilities), "WpnAbility");

            if (itemData.range != "") {
                output += `{{WpnRange=${itemData.range}}} `;
            }
            if (itemData.threat != "") {
                output += `{{WpnThreat=${itemData.threat}}} `;
            }
            output += `{{WpnDamage=${itemData.damageString}}} `;
            output += `{{WpnSkill=${itemData.skill}}} `;

            return output;
        }

    ;
    return {
        GetTechniqueWeaponRollTemplate: getTechniqueWeaponRollTemplate
    };
}());

var Format = Format || (function () {
    'use strict';

    let toCamelCase = function (inputString) {

            if (inputString == "" || inputString == undefined) {
                return inputString;
            }

            // Split the input string by spaces and iterate through the words
            let words = inputString.split(' ');
            words[0] = words[0][0].toLowerCase() + words[0].slice(1);
            for (let i = 1; i < words.length; i++) {
                if (words[i].length > 0) {
                    // Capitalize the first letter of each word (except the first word)
                    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
                }
            }

            return words.join('');
        },

        toUpperCamelCase = function (inputString) {

            if (inputString == "" || inputString == undefined) {
                return inputString;
            }

            // Split the input string by spaces and iterate through the words
            let words = inputString.split(" ");

            for (let i = 0; i < words.length; i++) {
                // Capitalize the first letter of each word 
                words[i] = words[i][0].toUpperCase() + words[i].slice(1);
            }

            return words.join('');
        },

        toFieldName = function (inputString) {
            return inputString.toLowerCase().replace(/ /g, "_");
        },

        romanize = function (num) {
            if (isNaN(num))
                return NaN;
            let digits = String(+num).split(""),
                key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
            let roman = "",
                i = 3;
            while (i--)
                roman = (key[+digits.pop() + (i * 10)] || "") + roman;
            return Array(+digits.join("") + 1).join("M") + roman;
        },

        // Array Formatting
        // ------------------------

        stringToArray = function (string, delimeter) {
            if (string == "" || string == undefined) {
                return [];
            }

            if (delimeter == undefined) {
                delimeter = ";";
            }
            let arr = string.split(delimeter);
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].trim();
            }
            return arr;
        },

        arrayToString = function (array, delimeter) {
            if (delimeter == undefined) {
                delimeter = ", ";
            }
            let output = "";
            _.each(array, function (obj) {
                if (output != "") {
                    output += delimeter;
                }
                output += obj;
            });
            return output;
        },

        sortArrayDecrementing = function (array) {
            array.sort();
            array.reverse();
            return array;
        },

        // Chat Formatting
        // ------------------------

        showTooltip = function (message, tooltip) {
            return `[${message}](#" class="showtip" title="${SanitizeSheetRoll(tooltip)})`;
        },


        // Chat Formatting
        // ------------------------

        sanitizeMacroJSON = function (macro) {
            macro = macro.replace(/"/g, "%#");
            macro = macro.replace(/\{/gi, "&#123;");
            macro = macro.replace(/}/gi, "&#125;");
            return macro;
        },

        parseMacroJSON = function (macro) {
            macro = macro.replace(/%#/g, '"');
            return JSON.parse(macro);
        },

        sanitizeMacroRollTemplate = function (roll) {
            let sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/\{/gi, "&#123;");
            sheetRoll = sheetRoll.replace(/}/gi, "&#125;");
            return sheetRoll;
        },

        sanitizeSheetRoll = function (roll) {
            let sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/%/g, "&#37;");
            sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
            sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
            sheetRoll = sheetRoll.replace(/</g, "&#60;");
            sheetRoll = sheetRoll.replace(/>/g, "&#62;");
            sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
            sheetRoll = sheetRoll.replace(/@/g, "&#64;");
            sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
            sheetRoll = sheetRoll.replace(/]/g, "&#93;");
            sheetRoll = sheetRoll.replace(/\n/g, "<br />");
            return sheetRoll;
        },

        sanitizeSheetRollAction = function (roll) {
            let sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/%/g, "&#37;");
            sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
            sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
            sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
            sheetRoll = sheetRoll.replace(/:/g, "");
            sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
            sheetRoll = sheetRoll.replace(/@/g, "&#64;");
            sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
            sheetRoll = sheetRoll.replace(/]/g, "&#93;");
            sheetRoll = sheetRoll.replace(/\n/g, "&&");
            return sheetRoll;
        }

    ;
    return {
        ToCamelCase: toCamelCase,
        ToUpperCamelCase: toUpperCamelCase,
        ToFieldName: toFieldName,
        Romanize: romanize,
        StringToArray: stringToArray,
        ArrayToString: arrayToString,
        SortArrayDecrementing: sortArrayDecrementing,
        ShowTooltip: showTooltip,
        SanitizeMacroJSON: sanitizeMacroJSON,
        ParseMacroJSON: parseMacroJSON,
        SanitizeMacroRollTemplate: sanitizeMacroRollTemplate,
        SanitizeSheetRoll: sanitizeSheetRoll,
        SanitizeSheetRollAction: sanitizeSheetRollAction
    };
}());

var RowId = RowId || (function () {
    'use strict';

    let buildId = function (sectionName, currentID, variableName) {

            if (variableName.startsWith("attr")) {
                variableName = variableName.substring(4);
            }
            return `${sectionName}${!sectionName.endsWith("_") ? "_" : ""}${currentID}${!variableName.startsWith("_") ? "_" : ""}${variableName}`;
        },
        buildIdFromArray = function (sectionName, currentID, variableNames) {
            let output = [];
            for (let i = 0; i < variableNames.length; i++) {
                output.push(buildId(sectionName, currentID, variableNames[i]));
            }
            return output;
        }

    ;
    return {
        BuildId: buildId,
        BuildIdFromArray: buildIdFromArray
    };
})();


// ====== Section Ids

function GetSectionIdName(sectionName, currentID, variableName) {

    if (variableName.startsWith("attr")) {
        variableName = variableName.substring(4);
    }

    if (currentID != "") {
        if (!variableName.startsWith("_")) {
            variableName = "_" + variableName;
        }
        if (!sectionName.endsWith("_")) {
            sectionName += "_";
        }
    }
    return sectionName + currentID + variableName;
}

function GetSectionIdNameFromArray(sectionName, currentID, variableNames) {
    let output = [];
    for (let i = 0; i < variableNames.length; i++) {
        output.push(GetSectionIdName(sectionName, currentID, variableNames[i]));
    }
    return output;
}

function GetFieldNameAttribute(fieldName) {
    if (fieldName.indexOf("_") >= 0) {
        fieldName = fieldName.match(/_([^_]*)$/)[1];
    }
    if (fieldName.indexOf("-") >= 0) {
        fieldName = fieldName.match(/-(?!.*-)(.*)$/)[1];
    }
    return fieldName;
}

function GetRepeatingSectionFromFieldName(fieldName) {
    if (fieldName.indexOf("_") >= 0) {
        fieldName = fieldName.substring(fieldName.indexOf("_") + 1);
        if (fieldName.indexOf("_") >= 0) {
            fieldName = "repeating_" + fieldName.substring(0, fieldName.indexOf("_"));
        }
    }
    return fieldName;
}

function GetRepeatingSectionIdFromId(id, repeatingSection) {
    let len = repeatingSection.length + 1;
    return id.substring(len, 20);
}

// ===== Generators
// =================================================

function GetBlankCharacter() {
    return {
        name: "",
        nationality: "",
        nature: "",
        ancestry: "",
        gender: "",
        classCategory: "",
        sector: "",
        profession: "",
        rapport: 0,
        favors: 0
    };
}

function CharacterNationalityGenerator() {
    let rnd = Math.floor(Math.random() * 5);
    switch (rnd) {
        case 0:
            return "Minerva";
        case 1:
            return "Apollo";
        case 2:
            return "Juno";
        case 3:
            return "Ceres";
        case 4:
            return "Liber";
        default:
            return "Minerva";
    }
}

function CharacterRaceGenerator(nationality) {
    let races;

    // change the odds based on nationality
    switch (nationality) {
        case "Minerva":
            races = GetRaceList(60, 12, 10, 17, 1);
            break;
        case "Apollo":
            races = GetRaceList(3, 85, 2, 10, 0);
            break;
        case "Juno":
            races = GetRaceList(3, 2, 80, 10, 5);
            break;
        case "Ceres":
            races = GetRaceList(10, 30, 4, 55, 1);
            break;
        case "Liber":
            races = GetRaceList(1, 0, 2, 2, 95);
            break;
        default:
            races = GetRaceList(20, 20, 20, 20, 20);
            break;
    }

    // roll on the randomizer
    let rnd = Math.floor(Math.random() * 100);

    for (let i = 0; i < races.length; i++) {
        if (rnd < races[i].odds) {
            return races[i].race;
        }
        rnd -= races[i].odds;
    }

    return "Coastborne";
}

function CharacterGenderGenerator() {
    let rnd = Math.floor(Math.random() * 2);
    if (rnd == 0) {
        return "Male";
    } else {
        return "Female";
    }
}

function CharacterNameGenerator(nationality, race, gender) {
    let firstNameList;
    let lastNameList;
    let firstName;
    let lastName;
    let rnd;

    // Choose whether to select a name based on race or nationality. 
    rnd = Math.random() * 100;

    // The logic here is that race has less of an effect than nationality on first names
    if (rnd < 70) {
        firstNameList = GetNameList(nationality, gender);
    } else {
        firstNameList = GetNameList(race, gender);
    }

    // The logic here is that race has more of an effect than nationality on last names
    if (rnd < 15) {
        lastNameList = GetNameList(nationality, "last");
    } else {
        lastNameList = GetNameList(race, "last");
    }

    // choose the names
    firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];

    if (lastName != "") {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
}

function CharacterNatureGenerator() {
    let natures = GetNatureList();

    let rnd = Math.floor(Math.random() * natures.length);

    return natures[rnd];
}

function CharacterClassGenerator(venueClass) {
    // set up variables
    let maxRoll = 0;
    let eliteRoll;
    let highRoll;
    let mediumRoll = 0;


    // these represent ratios or chances each class might show up
    let eliteMod = 1;
    let highMod = 9;
    let mediumMod = 60;
    let lowMod = 120;
    

    // first, we need to determine the maxRoll value which represents the highest possible roll
    maxRoll += eliteMod;
    eliteRoll = maxRoll;
    maxRoll += highMod;
    highRoll = maxRoll;


    // add the other sets if the class is potentially lower
    if (venueClass != "High") {
        maxRoll += mediumMod;
        mediumRoll = maxRoll;
    }
    if (venueClass != "High" && venueClass != "Medium") {
        maxRoll += lowMod;
    }


    // select a random number within the Max Range
    let rnd = Math.floor(Math.random() * maxRoll);


    // return a class
    if (rnd <= eliteRoll) {
        return "Elite";
    } else if (rnd <= highRoll) {
        return "High";
    } else if (rnd <= mediumRoll) {
        return "Medium";
    } else {
        return "Low";
    }
}

function CharacterSectorGenerator(classCategory) {
    let sectors = GetSectorProbabilityList(classCategory);
    let i;

    // determine the number of odds
    let maxRnd = 0;
    for (i = 0; i < sectors.length; i++) {
        maxRnd += sectors[i].odds;
    }

    // select a random sector
    let rnd = Math.floor(Math.random() * maxRnd);
    for (i = 0; i < sectors.length; i++) {
        if (rnd < sectors[i].odds) {
            return sectors[i].sector;
        }
        rnd -= sectors[i].odds;
    }

    return "";
}

function CharacterProfessionGenerator(classCategory, sector) {
    let professions = GetProfessionList(sector);
    let professionsList;

    switch (classCategory) {
        case "Elite":
            professionsList = professions.elite;
            break;
        case "High":
            professionsList = professions.high;
            break;
        case "Medium":
            professionsList = professions.medium;
            break;
        case "Low":
        default:
            professionsList = professions.low;
            break;
    }

    // select a random number within the list
    let rnd = Math.floor(Math.random() * professionsList.length);

    return professionsList[rnd];
}

