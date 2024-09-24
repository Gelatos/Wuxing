// ====== Classes

class Dictionary {

    constructor() {
        this.keys = [];
        this.values = {};
    }
    import(data, dataCreationCallback) {
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, dataCreationCallback);
            }
            else if (typeof data == "string") {
                this.importStringifiedJson(data, dataCreationCallback);
            }
            else {
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
            for(let i = 0; i < json.keys.length; i++) {
                this.values[json.keys[i]] = dataCreationCallback(json.values[json.keys[i]]);
            }
        }
        else {
            this.values = json.values;
        }
    }
    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            this.add(data.name, data);
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
                this.addSortingGroup(property, value[property], value.name);
            }
        }
    }
    
    addSortingroperties(sortingProperties) {
        this.sortingGroups = {};
        for (let i = 0; i < sortingProperties.length; i++) {
            this.sortingGroups[sortingProperties[i]] = {};
        }
    }
    addSortingGroup(property, propertyValue, valueName) {
        if(this.sortingGroups != undefined) {
            if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
                this.sortingGroups[property][propertyValue] = [];
            }
            this.sortingGroups[property][propertyValue].push(valueName);
        }
    }

    filter(filterData) {
        
        let filteredGroup;
        if(Array.isArray(filterData)) {
            filteredGroup = this.getSortedGroup(filterData[0].property, filterData[0].value);
            let nextFilter = [];
            for (let i = 1; i < filterData.length; i++) {
                if (filteredGroup == undefined || filteredGroup.length == 0) {
                    return [];
                }
                nextFilter = this.getSortedGroup(filterData[i].property, filterData[i].value);
                filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
            }
        }
        else {
            filteredGroup = this.getSortedGroup(filterData.property, filterData.value);
        }
        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return this.getGroupData(filteredGroup);
    }

    getSortedGroup(property, propertyValue) {
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
        let dataCreation = function(data) {
            return new TechniqueData(data);
        };
        super(data, filters, dataCreation);
    }

    importJson(json) {
        let dataCreationCallback = function(data) {
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
            }
            else {
                this.add(data.name, data);
            }
        }
    }
    
    add(key, value) {
        super.add(key, value);

        let styles = value.techSet.split(";");
        for (let i = 0; i < styles.length; i++) {
            this.addSortingGroup("style", styles[i].trim(), value.name);
        }
    }
}
class ExtendedDescriptionDatabase extends Database {
    constructor(data) {
        let dataCreation = function(data) {
            let definition = new DefinitionData(data);
            if (definition.group == "Type") {
                definition.variable += `{0}{1}`;
            }
            return definition;
        };
        super(data, ["group", "subGroup", "formulaMods"], dataCreation);
    }

    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            if (this.has(data.name)) {
                this.values[data.name].descriptions.push(data.descriptions[0]);
            }
            else {
                this.add(data.name, data);
            }
        }
    }

    add(key, value) {
        super.add(key, value);
        let formulaDefs = value.formula.getDefinitions();
        for (let i = 0; i < formulaDefs.length; i++) {
            this.addSortingGroup("formulaMods", formulaDefs[i], value.name);
        }
    }
}
class TechniqueEffectDatabase extends Database {
    constructor(data) {
        let dataCreation = function(data) {
            return new TechniqueEffect(data);
        };
        super(data, ["defense"], dataCreation);
    }
    
    importJson(json) {
        let dataCreationCallback = function(data) {
            return new TechniqueEffect(data);
        }
        super.importJson(json, dataCreationCallback);
    }
    importSheets(dataArray) {
        let dataCreationCallback = function(data) {
            return new TechniqueEffect(data);
        }
        super.importSheets(json, dataCreationCallback);
    }
}

class dbObj {
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data);
            }
            else if (typeof data == "string") {
                this.importStringifiedJson(data);
            }
            else {
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
    importJson(json) { }
    importSheets(dataArray) { }
    createEmpty() { }
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
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
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
        definition.descriptions = [this.description];
        definition.formula = baseDefinition.formula;
        definition.linkedGroups = [];
        definition.isResource = baseDefinition.isResource;
        return definition;
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
        this.tier = json.tier;
        this.isFree = this.affinity == "" && this.tier <= 1;
        this.action = json.action;
        this.traits = json.traits;
        this.resourceCost = json.resourceCost;
        this.limits = json.limits;
        this.skill = json.skill;
        this.range = json.range;
        this.target = json.target;
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
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.techSet = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.affinity = "" + dataArray[i]; i++;
        this.tier = parseInt(dataArray[i]) == NaN ? 1 : parseInt(dataArray[i]); i++;
        this.isFree = this.affinity == "" && this.tier <= 1;
        this.action = "" + dataArray[i]; i++;
        this.traits = "" + dataArray[i]; i++;
        this.resourceCost = "" + dataArray[i]; i++;
        this.limits = "" + dataArray[i]; i++;
        this.skill = "" + dataArray[i]; i++;
        this.range = "" + dataArray[i]; i++;
        this.target = "" + dataArray[i]; i++;
        this.requirement = "" + dataArray[i]; i++;
        this.itemTraits = "" + dataArray[i]; i++;
        this.trigger = "" + dataArray[i]; i++;
        this.flavorText = "" + dataArray[i]; i++;
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
        this.requirement = "";
        this.itemTraits = "";
        this.trigger = "";
        this.flavorText = "";
        this.definitions = [];
        this.effects = new TechniqueEffectDatabase();
    }
    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.techSet;
        definition.extraData = {tier: this.tier, affinity: this.affinity, isFree: this.isFree};
        return definition;
    }

    importEffectsFromTechnique(technique) {
        let baseTechnique = this;
        technique.effects.iterate(function(effect) {
            baseTechnique.addEffect(effect);
        });
        technique.definitions.forEach(function(definition) {
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
            case "Condition":
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

    getUseTech (sanitize) {
        // add technique data for the api
        this.username = `@{${WuxDef.GetVariable("DisplayName")}}`;
        let usedTechData = JSON.stringify(this);
        if (sanitize) {
            usedTechData = this.sanitizeSheetRollAction(usedTechData);
        }
        return `!ctech ${usedTechData}`;
    }
    sanitizeSheetRollAction(roll) {
        var sheetRoll = roll;
        sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        sheetRoll = sheetRoll.replace(/"/g, "&#34;");
        // sheetRoll = sheetRoll.replace(/:/g, "");
        sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        sheetRoll = sheetRoll.replace(/\n/g, "&&");
        return sheetRoll;
    }
}
class TechniqueEffect extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.defense = json.defense;
        this.target = json.target;
        this.type = json.type;
        this.subType = json.subType;
        this.dVal = json.dVal;
        this.dType = json.dType;
        this.formula = new FormulaData(json.formula);
        this.effect = json.effect;
        this.traits = json.traits;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "";
        this.defense = "" + dataArray[i]; i++;
        this.target = "" + dataArray[i]; i++;
        this.type = "" + dataArray[i]; i++;
        this.subType = "" + dataArray[i]; i++;
        this.dVal = "" + dataArray[i]; i++;
        this.dType = "" + dataArray[i]; i++;
        this.formula = new FormulaData("" + dataArray[i]); i++;
        this.effect = "" + dataArray[i]; i++;
        this.traits = "" + dataArray[i]; i++;
    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.defense = "";
        this.target = "";
        this.type = "";
        this.subType = "";
        this.dVal = "";
        this.dType = "";
        this.formula = new FormulaData();
        this.effect = "";
        this.traits = "";
    }
    setName(name) {
        this.name = name;
    }
}
class TechniqueStyle extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.description = json.description;
        this.affinity = json.affinity;
        this.cr = json.cr;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.affinity = "" + dataArray[i]; i++;
        this.cr = parseInt(dataArray[i]); i++;
    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.affinity = "";
        this.cr = 0;
    }
    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.group;
        definition.extraData = {tier: this.cr, affinity: this.affinity, requirements: this.getRequirements()};
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
            requirements += `You must have a ${this.affinity} affinity`;
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
        this.abilityScore = json.abilityScore;
        this.description = json.description;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.abilityScore = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;

    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.abilityScore = "";
        this.description = "";
    }
    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = `${this.group} Skill`;
        definition.formula = new FormulaData(`${this.abilityScore}`);
        definition.formula.addAttributes(definition.getFormulaMods(WuxDef._rank));
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
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.location = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
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
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.group;
        definition.extraData = {location: this.location};
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
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
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
        this.description = "";
        this.attributes = new AttributeGroupData();
        this.roles = this.createRolesArray();
        this.prereq = "";
        this.techniques = [];
    }
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.description = json.description;
        this.attributes = json.attributes;
        this.roles = json.roles;
        this.prereq = json.prereq;
        this.techniques = json.techniques;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.attributes = new AttributeGroupData(dataArray.slice(i)); i += 7;
        this.roles = this.createRolesArray(dataArray.slice(i)); i += 5;
        this.prereq = "" + dataArray[i]; i++;
        this.techniques = this.createJobTechnique(dataArray.slice(i)); i++;
    }
    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.group;
        definition.extraData = {requirements: this.getRequirements()};
        return definition;
    }

    getRequirements() {
        let requirements = "";

        if (this.prereq != "") {
            requirements += this.prereq;
        }
        if (requirements == "") {
            requirements = "None";
        }
        return requirements;
    }

    createRolesArray(modArray) {

        var output = {
            generalist: 0,
            athlete: 0,
            defender: 0,
            marksman: 0,
            skirmisher: 0
        };

        if (modArray != undefined) {
            let i = 0;
            output.generalist = parseInt(modArray[i]); i++;
            output.athlete = parseInt(modArray[i]); i++;
            output.defender = parseInt(modArray[i]); i++;
            output.marksman = parseInt(modArray[i]); i++;
            output.skirmisher = parseInt(modArray[i]); i++;
        };

        return output;
    }
    createJobTechnique(modArray) {
        var output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({ name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0 });
            i++;
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
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.techniques = this.createTechnique(dataArray.slice(i)); i++;

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
        var output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({ name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0 });
            i++;
        }
        return output;
    }
}
class AttributeGroupData extends dbObj {
    importJson(json) {

    }
    importSheets(modArray) {
        let i = 0;
        this.bod = parseInt(modArray[i]); i++;
        this.prc = parseInt(modArray[i]); i++;
        this.qck = parseInt(modArray[i]); i++;
        this.cnv = parseInt(modArray[i]); i++;
        this.int = parseInt(modArray[i]); i++;
        this.rsn = parseInt(modArray[i]); i++;
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
        this.extraData = json.extraData;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.title = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.subGroup = "" + dataArray[i]; i++;
        this.descriptions = [("" + dataArray[i])]; i++;
        this.abbreviation = "" + dataArray[i]; i++;
        this.variable = "" + dataArray[i]; i++;
        this.baseFormula = "" + dataArray[i]; i++;
        this.modifiers = "" + dataArray[i]; i++;
        this.formula = new FormulaData(this.baseFormula);
        this.formula.addAttributes(this.getFormulaMods(this.modifiers));
        this.linkedGroups = Format.StringToArray("" + dataArray[i]); i++;
        this.isResource = dataArray[i]; i++;
        
        // extraData setting
        this.extraData = {};
        let extraDataValues = ("" + dataArray[i]).split(";"); i++;
        let dataSplit;
        let definition = this;
        extraDataValues.forEach(function(data) {
            if (data.trim() != "") {
                dataSplit = data.split(":");
                definition.extraData[dataSplit[0].trim()] = dataSplit[1].trim();
            }
        });
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
        this.extraData = {};
        
    }
    createDefinition(baseDefinition) {
        this.definition = "";
        let definition = super.createDefinition(baseDefinition);
        definition.title = this.title;
        definition.subGroup = this.subGroup;
        definition.descriptions = this.descriptions;
        definition.abbreviation = this.abbreviation;
        definition.formula = new FormulaData(this.baseFormula);
        definition.formula.addAttributes(definition.getFormulaMods(this.modifiers));
        definition.linkedGroups = this.linkedGroups;
        definition.isResource = this.isResource;
        definition.extraData = {};

        delete this.description;
        
        return definition;
    }
    getVariables(array, mod1) {
        let output = [];
        for(let i = 0; i < array.length; i++) {
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
        return this.variable.replace(/{(\d+)}/g, function(_,m) {
            i = parseInt(m);
            if (Array.isArray(mod) && i < mod.length && mod[i] != undefined) {
                return mod[i];
            }
            else if (i == 0) {
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
}
class TemplateData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;

    }
    createEmpty() {

    }
}
class ResistanceData {
    constructor(json) {
        if (json != undefined) {
            this.importJson(json);
        }
        else {
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
        }
        else if (this[damageType] > 0) {
            return `${damageType} Resistance: ${this[damageType]}`;
        }
        else {
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
        this.username = technique.username;
        this.definition = technique.createDefinition(WuxDef.Get("Technique"));
        this.fieldName = Format.ToFieldName(technique.name);
        this.actionType = technique.action;
        this.isFree = technique.isFree;
    }
    setTechSetResourceData(technique) {
        this.resourceData = technique.action;
        if (technique.limits != "") {
            if (this.resourceData != "") {
                this.resourceData += "; ";
            }
            this.resourceData += technique.limits;
        }
        if (technique.resourceCost != "") {
            if (this.resourceData != "") {
                this.resourceData += "; ";
            }
            this.resourceData += technique.resourceCost;
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
            this.targetData += `${technique.target}`;
        }
    }
    setExtentionEffects(technique) {
        this.requirements = technique.requirement;
        this.itemTraits = WuxDef.GetValues(technique.itemTraits, ";");
        this.trigger = technique.trigger;
    }
    setTraits(technique) {
        this.traits = WuxDef.GetValues(technique.traits, ";");
    }
    setFlavorText(technique) {
        this.flavorText = technique.flavorText;
    }
    setDefinitions(technique) {
        for (let i = 0; i < technique.definitions.length; i++) {
            this.definitions.push(WuxDef.Get(technique.definitions[i]));
        }
    }
    setEffects(technique) {
        this.effects = [];
        let defenses = technique.effects.getPropertyValues("defense");
        let filteredTechniqueEffects;
        for(let i = 0; i < defenses.length; i++) {
            filteredTechniqueEffects = technique.effects.filter(new DatabaseFilterData("defense", defenses[i]));
            this.effects.push(defenses[i], new TechniqueEffectDisplayData(filteredTechniqueEffects));
        };
    }

    createEmpty() {
        this.technique = {};
        this.name = "";
        this.actionType = "";
        this.username = "";
        this.definition = {};
        this.fieldName = "";
        this.isFree = false;
        
        this.resourceData = "";
        this.targetData = "";

        this.trigger = "";
        this.requirements = "";
        this.itemTraits = [];

        this.flavorText = "";
        this.traits = [];
        this.effects = [];
        this.definitions = [];
    }

    getRollTemplate() {
        let output = "";

        output += `{{Username=${this.username}}}{{Name=${this.name}}}{{type-${this.actionType}=1}}`;
        if (this.resourceData != "") {
            output += `{{Resources=${this.resourceData}}}`;
        }
        if (this.targetData != "") {
            output += `{{Targeting=${this.targetData}}}`;
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
        if (this.traits.length > 0) {
            output += this.rollTemplateDefinitions(this.traits, "Trait");
        }
        if (this.effects.length > 0) {
            output += this.rollTemplateEffects();
        }
        if (this.definitions.length > 0) {
            output += this.rollTemplateDefinitions(this.definitions, "Def");
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
        this.effects.forEach(function(effect) {
            if(effect.check != undefined) {
                output += `{{Effect${incrementer}Name=${effect.check}}}{{Effect${incrementer}Desc=${effect.checkDescription}}}`;
                if (effect.effects == undefined) {
                    output += `{{Effect${incrementer}=Error! No effects found!}}`;
                }
                else {
                    effect.effects.forEach(function(desc) {
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
        var sheetRoll = roll;
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
                this.check = definition.title;
                this.checkDescription = definition.getDescription();
            }
            else {
                definition = WuxDef.Get(defense);
                let definition2 = WuxDef.Get("Title_TechDefense");
                this.check = `${definition2.title}${definition.title}`;
                this.checkDescription = `${definition2.getDescription()}\n${definition.getDescription()}`;
            }
        }
        else {
            definition = WuxDef.Get("Title_TechDC");
            this.check = `${definition.title}${defense}`;
            this.checkDescription = definition.getDescription();
        }
    }
    importEffectData(effectData) {
        for (let i = 0; i < effectData.length; i++) {
            this.effects.push(this.formatEffect(effectData[i]));
        }
    }

    formatEffect(effect) {
        let output = "";
        switch (effect.type) {
            case "Damage":
                output = this.formatDamageEffect(effect);
                break;
            case "Status":
                output = this.formatStatusEffect(effect);
                break;
            case "Condition":
                output = this.formatConditionEffect(effect);
                break;
            case "Boost":
                output = this.formatBoostEffect(effect);
                break;
            case "Definition":
                // Do nothing
                break;
            case "":
                output = this.formatDescriptionEffect(effect);
                break;
        }
        
        return output;
    }
    formatDamageEffect(effect) {
        return `${this.formatCalcBonus(effect)} ${WuxDef.GetTitle(effect.effect)} damage`;
    }
    formatStatusEffect(effect) {
        return this.formatStateEffect(effect, effect.effect);
    }
    formatConditionEffect(effect) {
        return this.formatStateEffect(effect, effect.effect);
    }
    formatBoostEffect(effect) {
        return `${WuxDef.GetTitle(effect.effect)} increases by ${this.formatCalcBonus(effect)}`;
    }
    formatStateEffect(effect, effectName) {
        let state = WuxDef.Get(effectName);
        let target = "Target";
        let plural = "s";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
        }
        let ranks = this.formatCalcBonus(effect);
        switch (effect.subType) {
            case "Add": return `${target} gain${plural} the ${state.title} ${state.group}`;
            case "Remove": return `${target} lose${plural} the ${state.title} ${state.group}`;
            case "Remove Any": return `${target} lose${plural} any condition of your choice`;
            case "Rank Up": return `${target} gain${plural} [${ranks}] rank in the ${state.title} ${state.group}`;
            case "Rank Down": return `${target} lose${plural} [${ranks}] rank in the ${state.title} ${state.group}`;
            default: return `${target} gain${plural} the ${state.title} ${state.group}`;
        }
    }
    formatDescriptionEffect(effect) {
        return effect.effect;
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        let formulaString = "";
        try {
            formulaString = effect.formula.getString();
        }
        catch (e) {
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

class WuxRepeatingSection {
	constructor(definitionId) {
		this.definition = WuxDef.Get(definitionId);
        this.repeatingSection = this.definition.getVariable();
        this.ids = [];
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

    addIds(ids) {
        this.ids = this.ids.concat(ids);
    }
    clearIds() {
        this.ids = [];
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
        removeRepeatingRow(this.repeatingSection + "_" + id);
    }
    removeAllIds() {
        for (let i = 0; i < this.ids.length; i++) {
            this.removeId(this.ids[i]);
        }
    }
}
class FormulaData {

    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (data.workers == undefined) {
                this.importFormula(data);
            }
            else {
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
        this.iterateFormulaComponents(data, function (definitionName, definitionNameModifier, multiplier, max) {
            if (isNaN(parseInt(definitionName))) {
                definition = WuxDef.Get(definitionName);
                if (definitionNameModifier == "") {
                    formulaVar = definition.getVariable();
                }
                else {
                    modDefinition = WuxDef.Get(definitionNameModifier);
                    formulaVar = definition.getVariable(modDefinition.getVariable());
                }

                formulaData.workers.push(formulaData.makeWorker(formulaVar, definitionName, 0, multiplier, max));
            }
            else {
                formulaData.workers.push(formulaData.makeWorker("", "", parseInt(definitionName), multiplier, max));
            }
        })
    }

    iterateFormulaComponents(baseFormula, callback) {
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
        };
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

    getValue(attributeHandler, printBreakdown) {
        let output = 0;
        let mod = 0;
        this.workers.forEach((worker) => {
            if (worker.variableName != "") {
                worker.value = attributeHandler.parseInt(worker.variableName);
                if (printBreakdown) {
                    console.log(`Adding ${worker.variableName}(${worker.value}) * ${worker.multiplier}`);
                }
            }
            else if (printBreakdown) {
                console.log(`Adding ${worker.value} * ${worker.multiplier}`);
            }
            mod = worker.value * worker.multiplier;
            if(worker.max > 0 && mod > worker.max) {
                mod = worker.max;
            }
            output += mod;
        });
        return output;
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
                            output += `[${definition.title} x ${worker.multiplier}]`;
                        }
                        else {
                            output += `[${definition.title}]`;
                        }
                        
                        if (worker.max > 0) {
                            output += `(max:${worker.max})`;
                        }
                    }
                }
            }
            else {
                if (output != "") {
                    output += " + ";
                }
                output += worker.value;
            }
            
        });
        return output;
    }
}

class AttributeHandler {
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
        console.log(`Adding formula mods for ${definition.name}`);
		this.addMod(definition.formula.getAttributes());
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
	}

    getCurrentValue(fieldName) {
        return this.current[fieldName];
    }

    getUpdateValue(fieldName) {
        return this.update[fieldName];
    }

	parseString(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = "";
		}
        let output = "";
		if (this.update[fieldName] != undefined) {
            output = this.getUpdateValue(fieldName);
		}
		else {
            output = this.getCurrentValue(fieldName);
		}
        if (output == undefined || output == "") {
            output = defaultValue;
        }
        return output;
	}

	parseInt(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = 0;
		}
        let output = "";
		if (this.update[fieldName] != undefined) {
            output = parseInt(this.getUpdateValue(fieldName));
		}
		else {
            output = parseInt(this.getCurrentValue(fieldName));
		}
        if (output == undefined || isNaN(output)) {
            output = defaultValue;
        }
        return output;
	}

	parseFloat(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = 0;
		}
        let output = "";
		if (this.update[fieldName] != undefined) {
            output = parseFloat(this.getUpdateValue(fieldName));
		}
		else {
            output = parseFloat(this.getCurrentValue(fieldName));
		}
        if (output == undefined || isNaN(output)) {
            output = defaultValue;
        }
        return output;
	}

	parseJSON(fieldName, defaultValue) {
		if (defaultValue == undefined) {
			defaultValue = "";
		}
        let output = "";
		if (this.update[fieldName] != undefined) {
            output = JSON.parse(this.getUpdateValue(fieldName));
		}
		else {
            output = JSON.parse(this.getCurrentValue(fieldName));
		}
        if (output == undefined || output == "") {
            output = defaultValue;
        }
        return output;
	}
}
class SandboxAttributeHandler extends AttributeHandler {
    constructor(characterId, mods) {
        super(mods);
        this.characterId = characterId;
        this.attributes = {};
        this.maxCheck = false;
    }
    getUpdateValue(fieldName) {
        return this.update[fieldName].get(this.maxCheck ? "max" : "current");
    }
    parseString(fieldName, defaultValue, isMax) {
        this.maxCheck = isMax;
        return super.parseString(fieldName, defaultValue);
    }
    parseInt(fieldName, defaultValue, isMax) {
        this.maxCheck = isMax != undefined;
        return super.parseInt(fieldName, defaultValue);
    }
    parseFloat(fieldName, defaultValue, isMax) {
        this.maxCheck = isMax != undefined;
        return super.parseFloat(fieldName, defaultValue);
    }
    parseJSON(fieldName, defaultValue, isMax) {
        this.maxCheck = isMax != undefined;
        return super.parseJSON(fieldName, defaultValue);
    }

    addAttribute(attr) {
        this.attributes[attr] = this.getCharacterAttribute(attr);
    }
	addUpdate(attr, value, isMax) {
        if (this.attributes[attr] == undefined) {
            this.addAttribute(attr);
        }
        super.addUpdate(attr, {type: isMax ? "max" : "current", value: value});
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
        for (const property in attributeHandler.update) {
            attribute = attributeHandler.attributes[property];
            updateData = attributeHandler.update[property];
            if (attribute != undefined && updateData != undefined) {
                attribute.set(updateData.type, updateData.value);
            }
        };
	}

    getCharacterAttribute (attrName) {
        var returnVal = undefined;
        var chracterAttributes = findObjs({
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
class WorkerBuildStat extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.value = parseInt(json.value);
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.value = "" + dataArray[i]; i++;
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
            }
            else {
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

            output += `{{Username=${techDisplayData.username}}}{{Name=${techDisplayData.name}}}{{SlotType=${techDisplayData.slotFooter}}}{{Source=${techDisplayData.slotSource}}}{{UsageInfo=${techDisplayData.usageInfo}}}${techDisplayData.traits.length > 0 ? rollTemplateTraits(techDisplayData.traits, "Trait") : ""}${techDisplayData.trigger ? `{{Trigger=${techDisplayData.trigger}}}` : ""}${techDisplayData.requirement ? `{{Requirement=${techDisplayData.requirement}}}` : ""}${techDisplayData.item ? `{{Item=${techDisplayData.item}}}` : ""}${techDisplayData.range ? `{{Range=${techDisplayData.range}}}` : ""}${techDisplayData.target ? `{{Target=${techDisplayData.target}}}` : ""}${techDisplayData.skill ? `{{SkillString=${techDisplayData.skill}}}` : ""}${techDisplayData.damage ? `{{DamageString=${techDisplayData.damage}}}` : ""}${techDisplayData.description ? `{{Desc=${techDisplayData.description}}}` : ""}${techDisplayData.onHit ? `{{OnHit=${techDisplayData.onHit}}}` : ""}${techDisplayData.conditions ? `{{Conditions=${techDisplayData.conditions}}}` : ""}`;
            output += ` {{type-${techDisplayData.slotType}=1}} ${techDisplayData.slotIsPath ? "{{isPath=1}} " : ""}{{type-${techDisplayData.actionType}=1}} ${techDisplayData.isFunctionBlock ? "{{type-FunctionBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlockTarget=1}} " : ""}${techDisplayData.isDescBlock ? "{{type-DescBlock=1}} " : ""}`;

            return `&{template:technique} ${output.trim()}`;
        },

        getRollTemplateFromTechnique = function (technique) {
            return getRollTemplate(new TechniqueDisplayData(technique));
        },

        getConsumeUsePost = function (technique) {

            // add technique data for the api
            technique.username = "@{character_name}";
            let usedTechData = JSON.stringify(technique);

            // add the equopped action at the end
            if (technique.traits != "" && (technique.traits.indexOf("Armament") >= 0 || technique.traits.indexOf("Arsenal") >= 0)) {
                usedTechData += "##@{technique-equippedWeapon}";
            }

            return `!ctech ${usedTechData}`;
        },

        // Formatting
        // ------------------------,

        rollTemplateTraits = function (traitsDb, rtPrefix) {
            let output = "";
            for (var i = 0; i < traitsDb.length; i++) {
                output += `{{${rtPrefix}${i}=${traitsDb[i].name}}} {{${rtPrefix}${i}Desc=${traitsDb[i].description}}} `;
            }
            return output;
        },

        getDamageString = function (feature) {

            var output = "";

            if (feature.dVal != "" && feature.dVal > 0) {
                output += feature.dVal + "d" + feature.dType;
            }
            if (feature.dBonus != "" && feature.dBonus != undefined) {
                var elements = feature.dBonus.split(";");
                for (var i = 0; i < elements.length; i++) {
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

        getPrerequisiteString = function (feature) {
            var output = "";

            return output;
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
                case "S": actionEffectsObj.addState(effect, targetSelf); break;
                case "C": actionEffectsObj.addCondition(effect, targetSelf); break;
                case "R": actionEffectsObj.addRemoval(effect, targetSelf); break;
                case "SR": actionEffectsObj.addStatusRemoval(effect, targetSelf); break;
                case "H": actionEffectsObj.addHeal(effect, targetSelf); break;
                case "T": actionEffectsObj.addTempHeal(effect, targetSelf); break;
                case "K": actionEffectsObj.addKiRecovery(effect, targetSelf); break;
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
                    return { name: name, targetSelf: targetSelf };
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

                addKiRecovery: function (name, targetSelf) {
                    this.kiRecoveries.push(this.createTargetData(name, targetSelf));
                }
            };
        }

        ;
    return {
        GetRollTemplate: getRollTemplate,
        GetRollTemplateFromTechnique: getRollTemplateFromTechnique,
        GetConsumeUsePost: getConsumeUsePost,
        RollTemplateTraits: rollTemplateTraits,
        GetDamageString: getDamageString,
        GetPrerequisiteString: getPrerequisiteString,
        GetActionEffects: getActionEffects
    };

}());

var ItemHandler = ItemHandler || (function () {
    'use strict';

    var
        getTechniqueWeaponRollTemplate = function (itemData) {
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

    var
        toCamelCase = function (inputString) {

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
            var digits = String(+num).split(""),
                key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                       "","I","II","III","IV","V","VI","VII","VIII","IX"],
                roman = "",
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
            macro = macro.replace(/\}/gi, "&#125;");
            return macro;
        },

        parseMacroJSON = function (macro) {
            macro = macro.replace(/%#/g, '"');
            return JSON.parse(macro);
        },

        sanitizeMacroRollTemplate = function (roll) {
            var sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/\{/gi, "&#123;");
            sheetRoll = sheetRoll.replace(/\}/gi, "&#125;");
            return sheetRoll;
        },

        sanitizeSheetRoll = function (roll) {
            var sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/%/g, "&#37;");
            sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
            sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
            sheetRoll = sheetRoll.replace(/\</g, "&#60;");
            sheetRoll = sheetRoll.replace(/\>/g, "&#62;");
            sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
            sheetRoll = sheetRoll.replace(/@/g, "&#64;");
            sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
            sheetRoll = sheetRoll.replace(/]/g, "&#93;");
            sheetRoll = sheetRoll.replace(/\n/g, "<br />");
            return sheetRoll;
        },

        sanitizeSheetRollAction = function (roll) {
            var sheetRoll = roll;
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

var Dice = Dice || (function () {
    'use strict';

    var
        rollDice = function (dieValue, dieType) {
            let rolls = [];
            while (dieValue > 0) {
                dieValue--;
                rolls.push(randomInteger(dieType));
            }
            return rolls;
        },

        totalDice = function (rolls) {
            let total = 0;
            _.each(rolls, function (obj) {
                total += obj;
            });
            return total;
        },

        getHighRolls = function (dieValue, dieType, keepCount) {
            let output = {
                rolls: [],
                keeps: []
            }
            output.rolls = rollDice(dieValue, dieType);
            output.rolls = Format.SortArrayDecrementing(output.rolls);
            for (let i = 0; i < keepCount; i++) {
                if (keepCount <= output.rolls.length) {
                    output.keeps.push(output.rolls[i]);
                }
            }
            return output;
        }

        ;
    return {
        RollDice: rollDice,
        TotalDice: totalDice,
        GetHighRolls: getHighRolls
    };
}());

var RowId = RowId || (function () {
    'use strict';

    var
        buildId = function (sectionName, currentID, variableName) {

            if (variableName.startsWith("attr")) {
                variableName = variableName.substr(4);
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
        variableName = variableName.substr(4);
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
    var len = repeatingSection.length + 1;
    return id.substr(len, 20);
}

// ====== Language

function GetLanguageName(language) {

    switch (language.toLowerCase()) {
        case "minere":
        case "min":
        case "m":
            return "Minere";
        case "apollen":
        case "apo":
        case "apol":
        case "a":
            return "Apollen";
        case "junal":
        case "jun":
        case "j":
            return "Junal";
        case "cert":
        case "cer":
        case "c":
            return "Cert";
        case "lib":
        case "l":
            return "Lib";
        case "jovean":
        case "novan":
            return "Jovean";

        case "byric":
            return "Byric";
        case "ciel":
            return "Ciel";
        case "citeq":
            return "Citeq";
        case "crinere":
            return "Crinere";
        case "dustell":
            return "Dustell";
        case "kleikan":
            return "Kleikan";
        case "manstan":
            return "Manstan";
        case "muralic":
            return "Muralic";
        case "mytikan":
            return "Mytikan";
        case "palmic":
            return "Palmic";
        case "salkan":
            return "Salkan";
        case "sansic":
            return "Sansic";
        case "shira":
            return "Shira";
        case "shorespeak":
            return "Shorespeak";
        case "silq":
            return "Silq";
        case "spirit":
            return "Spirit";
        case "verdeni":
            return "Verdeni";
        case "vulca":
            return "Vulca";
        case "wolfwarg":
            return "Wolfwarg";
        case "beast":
            return "Beast";
        case "emotion":
            return "Emotion";
        case "empathy":
            return "Empathy";

        default:
            return "";
    }
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
    var rnd = Math.floor(Math.random() * 5);
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
    var races = [];

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
    var rnd = Math.floor(Math.random() * 100);

    for (var i = 0; i < races.length; i++) {
        if (rnd < races[i].odds) {
            return races[i].race;
        }
        rnd -= races[i].odds;
    }

    return "Coastborne";
}

function CharacterGenderGenerator() {
    var rnd = Math.floor(Math.random() * 2);
    if (rnd == 0) {
        return "Male";
    } else {
        return "Female";
    }
}

function CharacterNameGenerator(nationality, race, gender) {
    var firstNameList = [""];
    var lastNameList = [""];
    var firstName = "";
    var lastName = "";
    var rnd = 0;

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
    var natures = GetNatureList();

    var rnd = Math.floor(Math.random() * natures.length);

    return natures[rnd];
}

function CharacterClassGenerator(venueClass) {
    // set up variables
    var maxRoll = 0;
    var eliteRoll = 0;
    var highRoll = 0;
    var mediumRoll = 0;
    var lowRoll = 0;


    // these represent ratios or chances each class might show up
    var eliteMod = 1;
    var highMod = 9;
    var mediumMod = 60;
    var lowMod = 120;


    // first we need to determine the maxRoll value which represents the highest possible roll
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
        lowRoll = maxRoll;
    }


    // select a random number within the Max Range
    var rnd = Math.floor(Math.random() * maxRoll);


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
    var sectors = GetSectorProbabilityList(classCategory);
    var i = 0;

    // determine the number of odds
    var maxRnd = 0;
    for (i = 0; i < sectors.length; i++) {
        maxRnd += sectors[i].odds;
    }

    // select a random sector
    var rnd = Math.floor(Math.random() * maxRnd);
    for (i = 0; i < sectors.length; i++) {
        if (rnd < sectors[i].odds) {
            return sectors[i].sector;
        }
        rnd -= sectors[i].odds;
    }

    return "";
}

function CharacterProfessionGenerator(classCategory, sector) {
    var professions = GetProfessionList(sector);
    var professionsList = [];

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
    var rnd = Math.floor(Math.random() * professionsList.length);

    return professionsList[rnd];
}

