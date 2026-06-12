// ====== Classes
// noinspection JSUnusedGlobalSymbols,JSUnresolvedReference,SpellCheckingInspection,ES6ConvertVarToLetConst

class Dictionary {

    constructor() {
        this.keys = [];
        this.values = {};
        this.dataCreationCallback = {};
    }

    import(data, dataCreationCallback) {
        this.dataCreationCallback = dataCreationCallback;
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, this.dataCreationCallback);
            } else if (typeof data == "string") {
                this.importStringifiedJson(data, this.dataCreationCallback);
            } else {
                this.importJson(data, this.dataCreationCallback);
            }
        }
    }

    importStringifiedJson(stringifiedJSON, dataCreationCallback) {
        if (stringifiedJSON == undefined || stringifiedJSON == "") {
            return;
        }

        try {
            this.importJson(JSON.parse(stringifiedJSON), dataCreationCallback);
        }
        catch {
            Debug.LogError(`[Dictionary] Unable to parse JSON: ${stringifiedJSON}`);
        }
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
    
    remove(key) {
        if (!this.keys.includes(key)) {
            return;
        }
        this.keys = this.keys.filter(k => k !== key);
        delete this.values[key];
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

    clean(validKeys) {B
        let keys = this.keys.filter(key => validKeys.includes(key));
        let values = {};
        for (let i = 0; i < keys.length; i++) {
            values[keys[i]] = this.values[keys[i]];
        }
        this.keys = keys;
        this.values = values;
    }
    
    clear() {
        this.keys = [];
        this.values = {};
    }
    
    length() {
        return this.keys.length;
    }
}

class DatabaseFilterData {
    constructor(property, value) {
        this.property = property;
        
        if (Array.isArray(value)) {
            this.value = value;
        }
        else {
            this.value = [value];
        }
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
        this.performAddSortingGroups(value);
    }
    performAddSortingGroups(value) {
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
        if (!Array.isArray(filterData)) {
            filterData = [filterData];
        }
        
        let filteredGroup = this.getSortedData(filterData[0]);
        for (let i = 1; i < filterData.length; i++) {
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            let nextFilter = this.getSortedData(filterData[i]);
            if (nextFilter != undefined) {
                filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
            }
        }
        
        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return this.getGroupData(filteredGroup);
    }
    
    getSortedData(filterData) {
        let filterOutput = this.getSortedGroup(filterData.property, filterData.value[0]);
        for (let i = 1; i < filterData.value.length; i++) {
            let nextFilter = this.getSortedGroup(filterData.property, filterData.value[i]);
            for (let item of nextFilter) {
                if (!filterOutput.includes(item)) {
                    filterOutput.push(item);
                }
            }
        }
        return filterOutput;
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
            // Debug.Log (`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
            return [];
        }
        let output = this.sortingGroups[property][propertyValue];
        if (output == undefined) {
            return [];
        }
        return output;
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

class WuxDataDatabase extends Database {

    constructor(data, dataCreation, filters) {
        if (filters == undefined) {
            filters = ["group"];
        }
        super(data, filters, dataCreation);
    }

    importSheets(dataArray) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = this.dataCreationCallback(dataArray[i]);
            if (this.has(data.name)) {
                this.values[data.name].descriptions.push(data.descriptions[0]);
            } else {
                if (data.group == "") {
                    continue;
                }
                this.add(data.name, data);
            }
        }
    }

    performAddSortingGroups(value) {
        for (let property in this.sortingGroups) {
            if (property == "group") {
                if (value.group.indexOf(";") >= 0) {
                    let groups = value.group.split(";");
                    for (let i = 0; i < groups.length; i++) {
                        if (groups[i].trim() != "") {
                            this.addSortingGroup("group", groups[i].trim(), value);
                        }
                    }
                }
                else {
                    this.addSortingGroup("group", value.group, value);
                }
            }
            else if (value != undefined && value.hasOwnProperty(property)) {
                this.addSortingGroup(property, value[property], value);
            }
        }
    }
}

class ExtendedTechniqueDatabase extends Database {

    constructor(data) {
        let filters = ["style", "group", "affinity", "tier", "action", "skill", "keywords", "rangeType", "damageType", "coreDefense"];
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
                if (data.techSet == "") {
                    continue;
                }
                this.add(data.name, data);
            }
        }
    }
    
    performAddSortingGroups(value) {
        for (let property in this.sortingGroups) {
            if (property == "group") {
                if (value.group.indexOf(";") >= 0) {
                    let groups = value.group.split(";");
                    for (let i = 0; i < groups.length; i++) {
                        if (groups[i].trim() != "") {
                            this.addSortingGroup("group", groups[i].trim(), value);
                        }
                    }
                }
                else {
                    this.addSortingGroup("group", value.group, value);
                }
            }
            else if (property == "affinity") {
                if (value.affinity.indexOf(";") >= 0) {
                    let groups = value.affinity.split(";");
                    for (let i = 0; i < groups.length; i++) {
                        if (groups[i].trim() != "") {
                            this.addSortingGroup("affinity", groups[i].trim(), value);
                        }
                    }
                }
                else {
                    this.addSortingGroup("affinity", value.affinity, value);
                }
            }
            else if (value != undefined && value.hasOwnProperty(property)) {
                this.addSortingGroup(property, value[property], value);
            }
        }
        let styles = value.techSet.split(";");
        for (let i = 0; i < styles.length; i++) {
            this.addSortingGroup("style", styles[i].trim(), value);
        }
        let forms = value.forms.split(";");
        for (let i = 0; i < forms.length; i++) {
            this.addSortingGroup("keywords", forms[i].trim(), value);
        }
        let impacts = value.impacts.split(";");
        for (let i = 0; i < impacts.length; i++) {
            this.addSortingGroup("keywords", impacts[i].trim(), value);
        }
        let itemTraits = value.itemTraits.split(";");
        for (let i = 0; i < itemTraits.length; i++) {
            this.addSortingGroup("keywords", itemTraits[i].trim(), value);
        }
        for (let i = 0; i < value.damageTypes.length; i++) {
            this.addSortingGroup("damageType", value.damageTypes[i].trim(), value);
        }
    }
}

class ExtendedTechniqueStyleDatabase extends Database {

    constructor(data) {
        let filters = ["group", "styleCategory", "mainGroup", "subGroup", "baseStyle"];
        let dataCreation = function (data) {
            return new TechniqueStyle(data);
        };
        super(data, filters, dataCreation);

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
            this.add(data.name, data);
        }
    }

    add(key, value) {
        super.add(key, value);

        let groups = value.group.split(";");
        for (let i = 0; i < groups.length; i++) {
            this.addSortingGroup("styleCategory", groups[i].trim(), value);
        }
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

class ExtendedDefinitionDatabase extends Database {
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
        this.useDefaultWillBreak = false;
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

    sanitizeSheetRollAction() {
        let sheetRoll = JSON.stringify(this);
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

    getDefaultWillbreak() {
        let techniqueEffect = new TechniqueEffect();
        techniqueEffect.defense = "WillBreak";
        techniqueEffect.type = "Status";
        techniqueEffect.subType = "Set";
        techniqueEffect.effect = "Stat_Flustered";
        return techniqueEffect;
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
        
        try {
            let json = JSON.parse(stringifiedJSON);
            this.importJson(json);
        }
        catch {
            Debug.LogError(`[dbObj] Unable to parse JSON: ${stringifiedJSON}`);
        }
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
        this.descriptions = json.descriptions;
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.descriptions = [("" + dataArray[i])];
        i++;
        return i;
    }

    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.descriptions = [];
        this.variable = "";
    }

    createDefinition(baseDefinition) {
        let definition = new DefinitionData();
        definition.name = baseDefinition.isResource ? `${this.name}` : `${baseDefinition.abbreviation}_${this.name}`;
        definition.fieldName = this.fieldName;
        definition.variable = `${baseDefinition.getVariable(`-${this.variable == "" ? this.fieldName : this.variable}`)}{0}{1}`;
        definition.title = this.name;
        definition.group = baseDefinition.name;
        definition.subGroup = "";
        definition.descriptions = this.descriptions;
        definition.formula = baseDefinition.formula;
        definition.linkedGroups = [];
        definition.isResource = baseDefinition.isResource;
        return definition;
    }

    getDescription(join) {
        if (join == undefined) {
            join = "\n";
        }
        return this.descriptions.join(join);
    }

}

class TechniqueData extends WuxDatabaseData {
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.techSet = "";
        this.group = "";
        this.version = "";
        this.affinity = "";
        this.tier = 0;
        this.action = "";
        this.forms = "";
        this.impacts = "";
        this.en = 0;
        this.willPower = 0;
        this.boon = 0;
        this.resourceCost = "";
        this.limits = "";
        this.skill = "";
        this.hasAdv = 0;
        this.range = "";
        this.rangeType = "";
        this.target = "";
        this.size = 0;
        this.requirement = "";
        this.itemTraits = "";
        this.trigger = "";
        this.flavorText = "";
        this.coreDefense = "";
        this.definitions = [];
        this.willBreakEffect = undefined;

        this.effects = new TechniqueEffectDatabase();
        this.enhancementEffects = {};
        this.damageTypes = [];
        this.endEffectConditionName = "";
        this.endEffectConditionEffect = "";
        this.techniqueEffect = {};
        this.isCustom = false;
        this.rank = 0;
    }
    
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.techSet = json.techSet;
        this.group = json.group;
        this.version = json.version;
        this.affinity = json.affinity;
        this.tier = parseInt(json.tier);
        this.action = json.action;
        this.forms = json.forms;
        this.impacts = json.impacts;
        this.en = json.en;
        this.willPower = json.willPower;
        this.boon = json.boon;
        this.resourceCost = json.resourceCost;
        this.limits = json.limits;
        this.skill = json.skill;
        this.hasAdv = json.hasAdv;
        this.range = json.range;
        this.rangeType = json.rangeType;
        this.target = json.target;
        this.size = parseInt(json.size);
        this.requirement = json.requirement;
        this.itemTraits = json.itemTraits;
        this.trigger = json.trigger;
        this.flavorText = json.flavorText;
        this.coreDefense = json.coreDefense;
        this.definitions = json.definitions;
        this.willBreakEffect = json.willBreakEffect == undefined ? undefined : new TechniqueEffect(json.willBreakEffect);
        this.effects = new TechniqueEffectDatabase(json.effects);
        this.enhancementEffects = json.enhancementEffects;
        this.damageTypes = json.damageTypes;
        this.endEffectConditionName = json.endEffectConditionName;
        this.endEffectConditionEffect = json.endEffectConditionEffect;
        this.isCustom = json.isCustom != undefined ? json.isCustom : false;
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
        this.updateVersion("" + dataArray[i])
        i++;
        this.affinity = "" + dataArray[i];
        i++;
        this.tier = parseInt(dataArray[i]);
        this.tier = isNaN(this.tier) ? 0 : this.tier;
        i++;
        this.action = "" + dataArray[i]
        i++;
        // Generated Groups
        this.group += `${this.group != "" ? "; " : ""}${dataArray[i]}`;
        i++;
        this.forms = "" + dataArray[i];
        i++;
        this.impacts = "" + dataArray[i];
        i++;
        // Dodging some sheet logic
        this.en = parseInt(dataArray[i]);
        this.en = isNaN(this.en) ? 0 : this.en;
        i++;
        this.willPower = this.getWillpowerCost(parseInt(dataArray[i]));
        i++;
        this.boon = parseInt(dataArray[i]);
        this.boon = isNaN(this.boon) ? 0 : this.boon;
        i++;
        this.limits = "" + dataArray[i];
        i++;
        this.skill = "" + dataArray[i];
        i++;
        this.hasAdv = dataArray[i];
        i++;
        this.range = "" + dataArray[i];
        i++;
        this.target = "" + dataArray[i];
        this.setRangeType();
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
        this.coreDefense = "" + dataArray[i];
        i++;
        
        this.techniqueEffect = new TechniqueEffect(dataArray.slice(i));
        this.techniqueEffect.updateSheetImportFormula();
        this.addEffect(this.techniqueEffect);
    }
    
    updateVersion(newVersion) {
        let version = this.getVersionParts(newVersion);
        let baseVersionValue = 2;
        
        if (parseInt(version[0]) != baseVersionValue) {
            version[0] = baseVersionValue;
            for (let i = 1; i < version.length; i++) {
                version[i] = 0;
            }
        }
        this.version = version.join(".");
    }
    incrementVersion() {
        let version = this.getVersionParts();
        let baseValue = parseInt(version[version.length - 1]);
        if (isNaN(baseValue)) {
            version[version.length - 1] = 0;
        }
        else {
            version[version.length - 1] = baseValue + 1;
        }
        this.version = version.join(".");
    }
    getVersionParts(newVersion) {
        if (newVersion != undefined) {
            if (newVersion == "") {
                return ["0", "1"];
            }
            let output = newVersion.split(".");
            if (output.length < 2) {
                output[0] = 0;
                output[1] = newVersion;
            }
            return output;
        }
        if (this.version != undefined) {
            return this.version.split(".");
        }
        return [];
    }
    getWillpowerCost(isMagic) {
        if (isNaN(isMagic)) {
            return 0;
        }
        
        if (this.tier <= 0) {
            return isMagic;
        }

        return (this.action === "Full" ? 10 : 5) * this.tier * isMagic;
    }
    setRangeType() {
        let rangeParts = this.range.split("-");
        let shortRange = parseInt(rangeParts[0]);
        let longRange = rangeParts.length > 1 ? parseInt(rangeParts[1]) : 0;

        let targetingStyle = this.getTargetingStyle();

        if (longRange >= 7) {
            if (this.target == "Target") {
                this.rangeType = `FilterType_RangeLong${targetingStyle}`;
            }
            return;
        }
        if (rangeParts[0] == "" || rangeParts[0] == "Self" || this.target == "Self") {
            this.rangeType = "FilterType_RangeSelf";
            return;
        }
        if (shortRange == 1) {
            if (longRange >= 2) {
                this.rangeType = `FilterType_RangeClose${targetingStyle}`;
                return;
            }
            this.rangeType = "FilterType_RangeMelee";
            return;
        }
        if (longRange > 2) {
            this.rangeType = `FilterType_RangeShort${targetingStyle}`;
            return;
        }
        
        this.rangeType = "FilterType_RangeSpecial";
    }
    getTargetingStyle() {
        let singleTargetTypes = ["Targets", "Objects", "Targets/Self", "Target", "Object", "Space", "Self", "Target/Self"];
        if (singleTargetTypes.includes(this.target)) {
            return "";
        }
        
        return "Area";
    }

    setRank(rank) {
        this.rank = rank;
    }
    getMaxRank(cr) {
        let cap = 1 + cr - this.en;
        return Math.min(cap, 9);
    }
    getRankEnhanceValue() {
        return this.rank - 1;
    }
    getName() {
        return `${this.name}${this.rank > 1 ? ` ${Format.Romanize(this.rank)}` : ""}`;
    }
    getEN() {
        return this.en + (this.rank > 1 ? this.getRankEnhanceValue() : 0);
    }
    getEffects() {
        if (this.rank > 1) {
            let tech = this;
            let output = new TechniqueEffectDatabase();
            this.effects.iterate(function (effect) {
                if (effect.enhancing == "1") {
                    let enhancement = tech.enhancementEffects[effect.type];
                    if (enhancement != undefined) {
                        let enhanceDVal = isNaN(parseInt(enhancement.dVal)) ? 0 : parseInt(enhancement.dVal);
                        if (enhanceDVal > 0) {
                            effect.dVal = isNaN(parseInt(effect.dVal)) ? 0 : parseInt(effect.dVal);
                            effect.dVal += enhancement.dVal * tech.getRankEnhanceValue();
                        }
                        let formulaMod = parseInt(enhancement.formula);
                        if (!isNaN(formulaMod)) {
                            effect.formula.importFormula(formulaMod * tech.getRankEnhanceValue());
                        }
                    }
                }
                output.add(effect.name, effect);
            });
            return output;
        }
        return this.effects;
    }

    createDefinition(baseDefinition) {
        let definition = new TechniqueDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.techSet;
        definition.tier = this.tier;
        definition.affinity = this.affinity;
        if (this.action == "Passive") {
            definition.passiveBoosts = this.effects.getBoostEffects();
        }
        definition.jsonData = this;
        return definition;
    }

    importEffectsFromTechnique(technique) {
        this.addEffect(technique.techniqueEffect);
    }

    addEffect(effect) {
        switch (effect.defense) {
            case "TechOnEnter":
            case "TechNewTargets":
            case "TechNewOnEnter":
                this.secondEffectConditionName = effect.defense;
                this.secondEffectConditionEffect = effect.effect;
                return;
            case "TechOnRound":
            case "TechOnTurn":
            case "TechOnEndFocus":
                this.endEffectConditionName = effect.defense;
                this.endEffectConditionEffect = effect.effect;
                return;
            case "WillBreak":
                effect.setName(`T${this.getEffectDbLength()}`);
                this.addToEffectsDb(effect);
                if (effect.traits != "") {
                    this.addDefinition(`Trait_${effect.traits}`);
                }
                this.willBreakEffect = effect;
                return;
            case "Enhance":
                this.enhancementEffects[effect.type] = effect;
                return;
            default:
                effect.setName(`T${this.getEffectDbLength()}`);
                this.addToEffectsDb(effect);
                if (effect.traits != "") {
                    this.addDefinition(`Trait_${effect.traits}`);
                }
                if (effect.type == "Damage") {
                    if (!this.damageTypes.includes(effect.effect)) {
                        this.damageTypes.push(effect.effect);
                    }
                    if (effect.effect == "Dmg_Psyche") {
                        this.willBreakEffect = this.effects.getDefaultWillbreak();
                    }
                }
                return;
        }
    }
    
    getEffectDbLength() {
        return this.effects.length();
    }
    
    addToEffectsDb(effect) {
        this.effects.add(effect.name, effect);
    }
    
    getPrerequisites() {
        let output = "";
        let levelPrereq = Format.GetLevelPrerequisites(this.tier);
        if (levelPrereq > 0) {
            output += `Level ${levelPrereq}`;
        }
        return output;
    }

    getAffinityParts() {
        if (this.affinity === "") return ["Neutral"];
        let parts = this.affinity.split(";").map(s => s.trim()).filter(s => s !== "");
        return parts.length > 0 ? parts : ["Neutral"];
    }

    addDefinition(definition) {
        if (!this.definitions.includes(definition)) {
            this.definitions.push(definition);
        }
    }
}

class TechniqueEffect extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.defense = json.defense;
        this.target = json.target;
        this.type = json.type;
        this.subType = json.subType;
        this.enhancing = json.enhancing;
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
        this.enhancing = "" + dataArray[i];
        i++;
        this.dVal = "" + dataArray[i];
        i++;
        this.dType = "" + dataArray[i];
        if (this.dType == "" && this.dVal != "") {
            this.dType = "6";
        }
        i++;
        this.formula = new FormulaData("" + dataArray[i]);
        i++;
        this.effect = "" + dataArray[i];
        switch(this.type) {
            case "Damage":
            case "HP":
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
    updateSheetImportFormula() {
        let formulaString = this.formula.formulaString;
        let autoAddTypes = ["Damage", "Favor"];
        if (formulaString == "0") {
            formulaString = "";
        }
        else if (formulaString == "" && autoAddTypes.includes(this.type)) {
            if (this.type == "Damage" && this.defense != "Enhance") {
                formulaString = `Potency`;
            }
            else if (this.type == "Favor") {
                formulaString = `CR`;
            }
        }
        this.formula = new FormulaData(formulaString);
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.defense = "";
        this.target = "";
        this.type = "";
        this.subType = "";
        this.enhancing = "";
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
        this.name = json.name;
        this.en = json.en;
        this.will = json.will;
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.en = "" + dataArray[i];
        i++;
        this.will = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.en = 0;
        this.will = 0;
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

class TechniqueUseEffect extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.skill = json.skill;
        this.coreDefense = json.coreDefense;
        this.impacts = json.impacts;
        this.traits = undefined;
        this.effects = new TechniqueEffectDatabase(json.effects);
    }
    
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.skill = "" + dataArray[i];
        i++;
        this.coreDefense = "" + dataArray[i];
        i++;
        this.impacts = "" + dataArray[i];
        this.traits = undefined;
        i++;
        this.effects = new TechniqueEffectDatabase();
    }
    
    importFromTechnique(technique) {
        this.import(technique.name, technique.rank, technique.skill, technique.coreDefense, technique.impacts, technique.getEffects());
    }
    
    import(name, rank, skill, coreDefense, impacts, effects) {
        this.name = name;
        this.rank = rank;
        this.skill = skill;
        this.coreDefense = coreDefense;
        this.impacts = impacts;
        if (effects != undefined) {
            this.effects = effects;
        } else {
            this.effects = new TechniqueEffectDatabase();
        }
    }
    
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.skill = "";
        this.skillType = "";
        this.coreDefense = "";
        this.impacts = "";
        this.traits = undefined;
        this.effects = new TechniqueEffectDatabase();
    }
    
    setup() {
        this.getTraits();
        this.getSkillData();
    }
    
    getTraits() {
        if (this.traits != undefined) {
            return this.traits;
        }
        
        this.traits = this.impacts.split(";");
        for (let i = 0; i < this.traits.length; i++) {
            this.traits[i] = this.traits[i].trim();
        }
        return this.traits;
    }
    
    getSkillData() {
        let skillData = this.skill.split(":");
        this.skill = skillData[0];
        if (skillData.length > 1) {
            this.skillType = skillData[1];
        }
        else {
            this.skillType = "";
        }
    }

    getUseTech(sheetName, isCustom) {
        return `!utech ${this.getRollActionData(sheetName, isCustom)}`;
    }

    getCheckTech(sheetName, isCustom) {
        return `!chtech ${this.getRollActionData(sheetName, isCustom)}`;
    }
    
    getRollActionData(sheetName, isCustom) {
        if (isCustom) {
            return `${this.sanitizeSheetRollAction(JSON.stringify(this))}$$${sheetName}`;
        }
        return `${this.name}-${this.rank}$$${sheetName}`;
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

class TechniqueStyle extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.subGroup = json.subGroup;
        this.baseStyle = json.baseStyle;
        this.affinity = json.affinity;
        this.skills = json.skills;
        this.description = json.description;
        this.effects = json.effects;
        this.isPermanent = json.isPermanent == undefined ? false : json.isPermanent;
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
        this.baseStyle = "" + dataArray[i];
        i++;
        this.affinity = "" + dataArray[i];
        i++;
        this.skills = dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.effects = dataArray[i];
        i++;
        this.isPermanent = ("" + dataArray[i]) != "";
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.subGroup = "";
        this.baseStyle = "";
        this.affinity = "";
        this.skills = "";
        this.effects = "";
        this.description = "";
        this.isPermanent = false;
        this.cr = 0;
        this.maxTier = 0;
    }

    createDefinition(baseDefinition) {
        let definition = new TechniqueStyleDefinitionData(super.createDefinition(baseDefinition));
        definition.mainGroup = this.group;
        definition.subGroup = this.subGroup;
        definition.tier = this.cr;
        definition.baseStyle = this.baseStyle;
        definition.formula = new FormulaData();
        return definition;
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
        this.abilityScore2 = json.abilityScore2;
        this.descriptions = json.descriptions;
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
        this.abilityScore2 = "" + dataArray[i];
        i++;
        this.descriptions = ["" + dataArray[i]];
        i++;

    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.subGroup = "";
        this.abilityScore = "";
        this.abilityScore2 = "";
    }

    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.subGroup;
        definition.formula = new FormulaData(`${this.abilityScore}%${this.abilityScore2}`);
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
        this.descriptions = json.descriptions;
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
        this.descriptions = ["" + dataArray[i]];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.location = "";
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
        this.descriptions = json.descriptions;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.descriptions = ["" + dataArray[i]];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
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
        this.difficulty = 0;
        this.skills = "";
        this.recommendedStyles = "";
        this.techniques = [];
    }

    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.category = json.category;
        this.difficulty = json.difficulty;
        this.skills = json.skills;
        this.descriptions = json.descriptions;
        this.recommendedStyles = json.recommendedStyles;
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
        this.difficulty = parseInt(dataArray[i]);
        this.difficulty = isNaN(this.difficulty) ? 0 : this.difficulty;
        i++;
        this.skills = "" + dataArray[i];
        i++;
        this.descriptions = [("" + dataArray[i])];
        i++;
        this.recommendedStyles = "" + dataArray[i];
        i++;
        this.techniques = this.createJobTechnique(dataArray.slice(i));
        i++;
    }

    createDefinition(baseDefinition) {
        let definition = new JobDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.skills = this.skills;
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
        style.skills = this.skills;
        style.description = this.description;
        style.affinity = "";
        style.cr = 0;
        style.maxTier = 6;
        return style;
    }
}

class StatusData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = json.fieldName;
        this.group = json.group;
        this.descriptions = json.descriptions;
        this.shortDescription = json.shortDescription;
        this.points = json.points;
        this.endsOnRoundStart = json.endsOnRoundStart;
        this.endsOnTrigger = json.endsOnTrigger;
        this.hasRanks = json.hasRanks;
        this.isBeneficial = json.isBeneficial;
        this.canBeFiltered = json.canBeFiltered;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.descriptions = ["" + dataArray[i]];
        i++;
        this.shortDescription = "" + dataArray[i];
        i++;
        this.points = "" + dataArray[i];
        i++;
        this.endsOnRoundStart = ("" + dataArray[i]) != "";
        i++;
        this.endsOnTrigger = ("" + dataArray[i]) != "";
        i++;
        this.hasRanks = ("" + dataArray[i]) != "";
        i++;
        this.isBeneficial = ("" + dataArray[i]) != "";
        i++;
        this.canBeFiltered = ("" + dataArray[i]) != "";
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.shortDescription = "";
        this.points = 0;
        this.endsOnRoundStart = false;
        this.endsOnTrigger = false;
        this.hasRanks = false;
        this.isBeneficial = false;
        this.canBeFiltered = false;
    }

    createDefinition(baseDefinition) {
        let definition = new StatusDefinitionData(super.createDefinition(baseDefinition));
        
        definition.subGroup = this.group;
        definition.shortDescription = this.shortDescription;
        definition.points = this.points;
        definition.endsOnRoundStart = this.endsOnRoundStart;
        definition.endsOnTrigger = this.endsOnTrigger;
        definition.hasRanks = this.hasRanks;
        definition.isBeneficial = this.isBeneficial;
        definition.canBeFiltered = this.canBeFiltered;
        return definition;
    }
    
    getDescriptions() {
        let output = this.descriptions;
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
        this.commonTechniques = json.commonTechniques;
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
        this.commonTechniques = "" + dataArray[i];
        i++;
        let techData = [this.name, "Item", "", ("" + dataArray[i]), "", 2];
        i++;
        techData = techData.concat(dataArray.slice(i));
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
        this.commonTechniques = "";
        this.technique = new TechniqueData();
        this.hasTechnique = false;
    }

    createDefinition(baseDefinition) {
        let definition = new ItemDefinitionData(super.createDefinition(baseDefinition));
        definition.techInfo = this.technique;
        return definition;
    }

    getCommonTechniques() {
        if (!this.commonTechniques) return [];
        return this.commonTechniques
            .split(";")
            .map(name => name.trim())
            .filter(name => name !== "")
            .map(name => WuxTechs.Get(name))
            .filter(technique => technique != undefined);
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

    getTitle(mod, mod1) {
        if (mod == undefined) {
            return this.title;
        }

        if (mod1 != undefined) {
            mod = [mod, mod1];
        }

        let i = 0;
        return this.title.replace(/{(\d+)}/g, function (_, m) {
            i = parseInt(m);
            if (Array.isArray(mod) && i < mod.length && mod[i] != undefined) {
                return mod[i];
            } else if (i == 0) {
                return mod;
            }
            return "";
        });
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
    
    addSubDefinition(subDefinition) {
        this.title = `${this.title} [${subDefinition.getTitle()}]`;
        this.descriptions = this.descriptions.concat(["", `[${subDefinition.getTitle()}]`]);
        this.descriptions = this.descriptions.concat(subDefinition.descriptions);
    }
}

class TechniqueDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.tier = json.tier;
        this.affinity = json.affinity;
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
            case "passiveBoosts":
                this.passiveBoosts = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.tier = 0;
        this.affinity = "";
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
        this.baseStyle = json.baseStyle;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "cr":
                this.cr = parseInt(value);
                break;
            case "baseStyle":
                this.baseStyle = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.mainGroup = "";
        this.cr = 0;
        this.baseStyle = "";
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
        this.skills = json.skills;
        this.requirements = json.requirements;
        this.recommendedStyles = json.recommendedStyles;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "requirements":
                this.requirements = value;
                break;
            case "recommendedStyles":
                this.recommendedStyles = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.skills = "";
        this.requirements = "";
        this.recommendedStyles = "";
    }
}

class StatusDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.shortDescription = json.shortDescription;
        this.points = json.points;
        this.endsOnRoundStart = json.endsOnRoundStart;
        this.endsOnTrigger = json.endsOnTrigger;
        this.hasRanks = json.hasRanks;
        this.isBeneficial = json.isBeneficial;
        this.canBeFiltered = json.canBeFiltered;
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
            case "hasRanks":
                this.hasRanks = value.toLowerCase() == "true";
                break;
            case "isBeneficial":
                this.isBeneficial = value.toLowerCase() == "true";
                break;
            case "canBeFiltered":
                this.canBeFiltered = value.toLowerCase() == "true";
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.shortDescription = "";
        this.points = 0;
        this.endsOnRoundStart = false;
        this.endsOnTrigger = false;
        this.hasRanks = false;
        this.isBeneficial = false;
        this.canBeFiltered = false;
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

// Display
class TechniqueDisplayData {

    constructor(technique, rank) {
        this.createEmpty();
        if (technique != undefined) {
            if (rank != undefined) {
                technique.rank = rank;
            }
            this.importTechnique(technique);
        }
    }

    createEmpty() {
        this.technique = {};
        this.definition = {};
        
        this.name = "";
        this.displayname = "";
        this.fieldName = "";
        this.enCost = 0;
        this.willCost = 0;
        this.trigger = "";
        this.flavorText = "";
        this.isOnEnter = false;

        this.actionType = ""
        this.actionName = "";
        this.actionsDesc = [];

        this.targetDesc = [];
        this.targetType = "";
        this.range = "";

        this.traits = "";
        this.traitsDesc = [];

        this.coreEffect = "";
        this.coreDefense = "";
        this.checkType = "";
        this.checkEffect = "";
        this.endEffectDesc = "";
        this.willBreakEffect = "";
        this.enhanceEffect = "";
    }

    importTechnique(technique) {
        this.setTechBasics(technique);
        this.setActionName(technique);
        this.setTechTargetData(technique);
        this.setTraitsData(technique);
        this.setEffects(technique);
    }

    setTechBasics(technique) {
        this.technique = technique;
        this.definition = technique.createDefinition(WuxDef.Get("Technique"));
        this.displayname = technique.displayname;
        this.sheetname = technique.sheetname;
        
        this.name = technique.getName();
        this.enCost = technique.getEN();
        this.willCost = technique.willPower;
        this.fieldName = Format.ToFieldName(technique.name);
        this.trigger = technique.trigger;
        this.flavorText = technique.flavorText;
        this.isOnEnter = technique.forms.includes("OnEnter");
    }
    
    setActionName(technique) {
        this.actionsDesc = [];
        this.actionType = technique.action;
        
        let actionTypeDef = WuxDef.Get(`FilterType_${technique.action}Action`);
        this.actionsDesc.push(`[${actionTypeDef.getTitle()}]`);
        this.actionsDesc = this.actionsDesc.concat(actionTypeDef.descriptions);
        
        this.actionName = technique.action;
        if (technique.limits != "") {
            this.actionName += ` - ${technique.limits}`;
            
            let limitDefinition;
            if (technique.limits == "Focus") {
                limitDefinition = WuxDef.Get("Trait_Focus");
            }
            else if (technique.limits.indexOf("/Round") > 0) {
                limitDefinition = WuxDef.Get("Trait_PerRound");
            }
            else if (technique.limits.indexOf("/Turn") > 0) {
                limitDefinition = WuxDef.Get("Trait_PerTurn");
            }
            else if (technique.limits.indexOf("/Conflict") > 0) {
                limitDefinition = WuxDef.Get("Trait_PerConflict");
            }
            this.actionsDesc.push("");
            this.actionsDesc.push(`[${limitDefinition.getTitle()}]`);
            this.actionsDesc = this.actionsDesc.concat(limitDefinition.descriptions);
        }
    }

    setTechTargetData(technique) {

        let rangeDesc = WuxDef.Get(technique.rangeType);
        if (technique.target == "Self") {
            this.range = "Self";
            this.targetType = 0;
            this.targetDesc = rangeDesc.descriptions;
            return;
        }

        if (technique.range != "") {
            this.range = technique.range;
        }
        else if (technique.target != "") {
            this.range = 1;
        }
        else {
            this.range = 0;
        }
        
        if (technique.target != "") {
            let singleTargetTypes = ["Target", "Object", "Space"];
            let isSingleTargetType = singleTargetTypes.some(item => technique.target.includes(item));
            if (technique.size > 0) {
                if (isSingleTargetType) {
                    this.targetType += `${Format.NumberToWord(technique.size)} ${technique.target}`;
                }
                else {
                    this.targetType += `${technique.target} ${technique.size}`;
                }
            }
            else {
                this.targetType += `${technique.target}`;
            }

            rangeDesc.addSubDefinition(WuxDef.Get(`Pattern_${technique.target}`));
            this.targetDesc = rangeDesc.descriptions;
        }
    }

    setTraitsData(technique) {
        this.traits = "";
        this.traitsDesc = [];

        if (technique.forms.indexOf("Social") >= 0) {
            this.traits += `This is a Social technique. `;
            let socialDefinition = WuxDef.Get("Trait_Social");
            if (this.traitsDesc.length > 0) {
                this.traitsDesc.push("");
            }
            this.traitsDesc.push(`[${socialDefinition.getTitle()}]`);
            this.traitsDesc = this.traitsDesc.concat(socialDefinition.descriptions);
        }
        
        if (technique.boon > 0) {
            this.traits += "You must consume a Boon to use this technique. ";
        }
        
        let itemTraits = WuxDef.GetValues(technique.itemTraits, ";");
        if (itemTraits.length > 0) {
            this.traits += "You must equip gear with the trait";
            if (itemTraits.length > 1) {
                this.traits += "s";

                for (let i = 0; i < itemTraits.length; i++) {
                    let item = itemTraits[i];
                    if (i == itemTraits.length - 1) {
                        this.traits += ` and`;
                    }
                    else if (i > 0) {
                        this.traits += ", ";
                    }
                    this.traits += ` ${item.getTitle()}`;
                    if (this.traitsDesc.length > 0) {
                        this.traitsDesc.push("");
                    }
                    this.traitsDesc.push(`[${item.getTitle()}]`);
                    this.traitsDesc = this.traitsDesc.concat(item.descriptions);
                }
            }
            else {
                this.traits += ` ${itemTraits[0].getTitle()}`;
                if (this.traitsDesc.length > 0) {
                    this.traitsDesc.push("");
                }
                this.traitsDesc.push(`[${itemTraits[0].getTitle()}]`);
                this.traitsDesc = this.traitsDesc.concat(itemTraits[0].descriptions);
            }
            this.traits += `. `;
        }
        this.traits += technique.requirement;
    }

    setEffects(technique) {
        let techDisplayData = this;
        let coreEffects = [];
        let checkedEffects = [];
        let enhancingEffects = [];
        technique.getEffects().iterate(function (effect) {
            switch (effect.defense) {
                case "":
                    coreEffects.push(effect);
                    break;
                case "Core":
                    checkedEffects.push(effect);
                    break;
            }
            if (effect.enhancing == "1") {
                enhancingEffects.push(effect);
            }
        });
        if (coreEffects.length > 0) {
            techDisplayData.coreEffect = new TechniqueEffectDisplayData(coreEffects, technique, "");
        }
        if (checkedEffects.length > 0) {
            let checkDef;
            if (isNaN(technique.coreDefense)) {
                this.coreDefense = technique.coreDefense;
                this.checkType = `${this.printSkillCheck(technique)} vs. ${technique.coreDefense}`;
                checkDef = WuxDef.Get("Trait_SkillCheck-Defense");
            }
            else { 
                this.coreDefense = 0;
                this.checkType = `DC ${technique.coreDefense} ${this.printSkillCheck(technique)}`;
                checkDef = WuxDef.Get("Trait_SkillCheck-DC");
            }
            let checkDesc = [];
            checkDesc.push(`[${checkDef.getTitle()}]`);
            checkDesc.push(checkDef.descriptions.join(". "));

            if (technique.impacts.includes("Truehit")) {
                let trueHitDef = WuxDef.Get("Trait_Truehit");
                this.checkType += ` - ${trueHitDef.getTitle()}`;
            }
            if (technique.impacts.includes("Accurate")) {
                let accurateDef = WuxDef.Get("Trait_Accurate");
                this.checkType += ` - ${accurateDef.getTitle()}`;

                if (checkDesc.length > 0) {
                    checkDesc.push("");
                }
                checkDesc.push(`[${accurateDef.getTitle()}]`);
                checkDesc.push(accurateDef.descriptions.join(". "));
            }
            techDisplayData.checkEffect = new TechniqueEffectDisplayData(checkedEffects, technique, technique.coreDefense, checkDesc);
        }
        if (technique.endEffectConditionName != "") {
            let def = WuxDef.Get(`Title_${technique.endEffectConditionName}`);
            techDisplayData.endEffectDesc = def.getDescriptions().join("") + technique.endEffectConditionEffect;
        }
        if (technique.willBreakEffect != undefined) {
            let checkDef = WuxDef.Get("WillBreak");
            let willbreakDesc = [];
            willbreakDesc.push(`${checkDef.getTitle()}`);
            willbreakDesc.push(checkDef.descriptions.join(". "));
            techDisplayData.willBreakEffect = new TechniqueEffectDisplayData([technique.willBreakEffect], technique, "", willbreakDesc);
        }
        if (enhancingEffects.length > 0) {
            techDisplayData.enhanceEffect = new TechniqueEffectDisplayEnhancmenteData(enhancingEffects, technique);
        }
    }
    printSkillCheck(technique) {
        if (technique.skill == "" && technique.action != "Passive") {
            return "No Check";
        }

        let skillData = technique.skill.split(":");
        skillData[0] = skillData[0].trim();
        if (skillData.length > 1) {
            if (skillData[1] == "group") {
                return `Any ${skillData[0]}`;
            }
            else if (skillData[1] == "attr") {
                return WuxDef.GetTitle(Format.GetDefinitionName("Attribute", skillData[0]));
            }
        }
        return skillData[0];
    }

    addDefintionToArray(definition) {
        if (this.effectTypeDesc.length > 1) {
            this.effectTypeDesc.push("");
        }
        this.effectTypeDesc.push(`[${definition.getTitle()}]`);
        this.effectTypeDesc = this.effectTypeDesc.concat(definition.descriptions);
    }

    getActionsDescriptions(join) {
        return this.actionsDesc.join(join);
    }
    getTraitsDescriptions(join) {
        return this.traitsDesc.join(join);
    }
    getTargetDescriptions(join) {
        return this.targetDesc.join(join);
    }
    getCoreEffects(join) {
        if (this.coreEffect == "") {
            return "";
        }
        return this.coreEffect.effects.join(join);
    }
    getCoreEffectTooltips(join) {
        if (this.coreEffect == "") {
            return "";
        }
        return this.coreEffect.effectTypeDesc.join(join);
    }
    getCheckEffects(join) {
        if (this.checkEffect == "") {
            return "";
        }
        return this.checkEffect.effects.join(join);
    }
    getCheckEffectTooltips(join) {
        if (this.checkEffect == "") {
            return "";
        }
        return this.checkEffect.effectTypeDesc.join(join);
    }
    getWillBreakEffects(join) {
        if (this.willBreakEffect == "") {
            return "";
        }
        return this.willBreakEffect.effects.join(join);
    }
    getWillBreakEffectTooltips(join) {
        if (this.willBreakEffect == "") {
            return "";
        }
        return this.willBreakEffect.effectTypeDesc.join(join);
    }
    getEnhanceEffects(join) {
        if (this.enhanceEffect == "") {
            return "";
        }
        return this.enhanceEffect.effects.join(join);
    }
    

    getRollTemplate(addTechnique) {
        let output = `&{template:technique} {{Displayname=${this.displayname}}}`;
        return `${output}${this.sanitizeBaseRollAction(this.generateRollTemplate(addTechnique).trim())}`;
    }
    getSheetRollTemplate(addTechnique) {
        let output = `&{template:technique} {{Displayname=${this.displayname}}}`;
        return `${output}${this.sanitizeSheetRollAction(this.generateRollTemplate(addTechnique).trim())}`;
    }
    
    generateRollTemplate(addTechnique) {
        let output = `{{Name=${this.name}}}{{type-${this.actionType}=1}}{{action=${this.actionName}}}`;
        if (this.enCost != "") {
            output += `{{En=${this.enCost}}}`;
        }
        if (this.willCost != "") {
            output += `{{Will=${this.willCost}}}`;
        }
        if (this.range != "") {
            output += `{{Range=${this.range}}}`;
        }
        if (this.targetType != "") {
            output += `{{Target=${this.targetType}}}`;
        }
        if (this.trigger != "") {
            output += `{{Trigger=${this.trigger}}}`;
        }
        if (this.traits != "") {
            output += `{{Traits=${this.traits}}}`;
        }
        if (this.flavorText != "") {
            output += `{{FlavorText=${this.flavorText}}}`;
        }
        output += this.rollTemplateEffects();
        if (addTechnique) {
            if (this.enCost > 0 || this.willCost > 0) {
                let consumeData = new TechniqueResources([this.technique.name, this.enCost, this.willCost]);
                output += `{{consumeData=!ctech ${consumeData.sanitizeSheetRollAction(JSON.stringify(consumeData))}$$${this.sheetname}}}`;
            }
            if (this.technique.effects.keys.length > 0) {
                let effectData = new TechniqueUseEffect();
                effectData.importFromTechnique(this.technique, false);

                output += `{{checkData=${effectData.getCheckTech(this.sheetname, this.technique.isCustom)}}}`;
                output += `{{targetData=${effectData.getUseTech(this.sheetname, this.technique.isCustom)}}}`;
            }
            if (this.technique.hasAdv != 0) {
                output += `{{hascheck=${this.technique.hasAdv}}`;
            }
        }
        return output;
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
        if (this.coreEffect != "") {
            output += this.iterateRollTemplateEffects(this.coreEffect, "Core");
        }
        if (this.isOnEnter) {
            output += "{{OnEnter=1}}";
        }
        if (this.checkEffect != "") {
            output += `{{Def-${this.coreDefense}=1}}{{CheckTitle=${this.checkType}}}`;
            output += this.iterateRollTemplateEffects(this.checkEffect, "Check");
        }
        if (this.endEffectDesc) {
            output += `{{EndEffect=${this.endEffectDesc}}`;
        }
        if (this.willBreakEffect != "") {
            output += this.iterateRollTemplateEffects(this.willBreakEffect, "Willbreak");
        }
        
        return output;
    }
    iterateRollTemplateEffects(techniqueDisplay, prefix) {
        if (techniqueDisplay == "") {
            return "";
        }
        let output = "";
        for (let i = 0; i < techniqueDisplay.effects.length; i++) {
            output+= `{{${prefix}${i}Data=${techniqueDisplay.effects[i]}}}`;
        }
        for (let i = 0; i < techniqueDisplay.effectTypeDesc.length; i++) {
            output+= `{{${prefix}${i}Tooltip=${techniqueDisplay.effectTypeDesc[i]}}}`;
        }
        return output;
    }

    sanitizeBaseRollAction(roll) {
        let sheetRoll = roll;
        sheetRoll = sheetRoll.replace(/'/g, "&#39;");
        return sheetRoll;
    }
    sanitizeSheetRollAction(roll) {
        let sheetRoll = roll;
        sheetRoll = sheetRoll.replace(/'/g, "&#39;");
        sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        sheetRoll = sheetRoll.replace(/"/g, "&#34;");
        sheetRoll = sheetRoll.replace(/:/g, "");
        sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        // sheetRoll = sheetRoll.replace(/\n/g, "&&");
        return sheetRoll;
    }
}

class BaseTechniqueEffectDisplayData {
    
    constructor() {
        this.effectType = "";
        this.effectTypeDesc = [];
        this.effectDescription = "";
        this.focusType = "";
        this.evasionDefense = "";
        this.includedAp = false;
        this.includedBrutal = false;
    }

    formatEffect(effect, technique) {
        if (this.effectDescription != "" && !this.effectDescription.endsWith(".")) {
            if (this.effectType != "Damage") {
                this.effectDescription += ". ";
            }
        }
        switch (effect.type) {
            case "Damage":
                if (this.effectType != "Damage") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get(`Trait_Damage${this.evasionDefense}`));
                }
                this.formatDamageEffect(effect, technique);
                break;
            case "Break":
                if (this.effectType != "Damage") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get(`Trait_Damage${this.evasionDefense}`));
                }
                this.formatBreakEffect(effect, technique);
                break;
            case "HP":
                this.effectType = effect.type;
                this.formatHpEffect(effect);
                break;
            case "WILL":
                this.effectType = effect.type;
                this.formatWillEffect(effect);
                break;
            case "Vitality":
                if (this.effectType != "Vitality") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Cmb_Vitality"));
                }
                this.formatVitalityEffect(effect);
                break;
            case "Impatience":
                if (this.effectType != "Impatience") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Soc_Impatience"));
                }
                this.formatImpatienceMeterEffect(effect);
                break;
            case "Favor":
                if (this.effectType != "Favor") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Soc_Favor"));
                }
                this.formatFavorEffect(effect);
                break;
            case "Influence":
                if (this.effectType != "Influence") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Soc_InfluenceCombat"));
                }
                this.formatInfluenceMeterEffect(effect);
                break;
            case "Request":
                if (this.effectType != "Request") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Soc_RequestCheck"));
                    this.effectTypeDesc.push("Request DCs");
                    let requestFilters = WuxDef.Filter([new DatabaseFilterData("group", "SeverityRank")]);
                    requestFilters.forEach(filter => {
                        this.addDefintionToEffectDescription(filter);
                    });
                }
                this.formatRequestEffect(effect);
                break;
            case "Status":
                let state = WuxDef.Get(effect.effect);
                if (this.effectType != state.name) {
                    this.effectType = state.name;
                    this.addDefintionToEffectDescription(state);
                }
                this.formatStatusEffect(effect, state);
                break;
            case "BreakFocus":
                if (this.effectType != "BreakFocus") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Trait_Focus"));
                }
                this.formatBreakFocusEffect(effect);
                break;
            case "Boost":
                this.effectType = effect.type;
                this.formatBoostEffect(effect);
                break;
            case "Terrain":
                let terrainType = WuxDef.Get(effect.effect);
                if (this.effectType != terrainType.name) {
                    this.effectType = terrainType.name;
                    this.addDefintionToEffectDescription(terrainType);
                }
                this.formatTerrainEffect(effect, terrainType);
                break;
            case "Structure":
                this.effectType = effect.type;
                this.focusType = "Structure";
                this.formatStructureEffect(effect);
                break;
            case "Move":
                if (this.effectType != "Move") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Trait_Move"));
                }
                this.formatMoveEffect(effect);
                break;
            case "EN":
                if (this.effectType != "EN") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("EN"));
                }
                this.formatEnEffect(effect);
                break;
            case "FreeFocus":
                if (this.effectType != "FreeFocus") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Trait_Focus"));
                }
                this.formatFreeFocusEffect(effect);
                break;
            case "Illusion":
                if (this.effectType != "Illusion") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Trait_Illusion"));
                    this.focusType = "Illusion";
                }
                this.formatDescriptionEffect(effect);
                break;
            default:
                this.effectType = effect.type;
                this.formatDescriptionEffect(effect);
                break;
        }

        return this.effectDescription;
    }



    formatDamageEffect(effect, technique) {
        let subTypeParts = effect.subType.split(":");
        let subType = subTypeParts[0];
        
        let traits = "";
        if (technique.impacts.indexOf("AP") >= 0) {
            traits += "[AP] ";
            if (!this.includedAp) {
                this.includedAp = true;
                this.addDefintionToEffectDescription(WuxDef.Get("Trait_AP"));
            }
        }
        if (technique.impacts.indexOf("Brutal") >= 0) {
            traits += "[Brutal] ";
            if (!this.includedBrutal) {
                this.includedBrutal = true;
                this.addDefintionToEffectDescription(WuxDef.Get("Trait_Brutal"));
            }
        }
        switch (subType) {
            case "Burst Damage":
                this.effectDescription += (this.effectDescription == "" ? `${this.formatTargetTake(effect)}` : " and");
                this.effectDescription += ` ${this.formatCalcBonus(effect)} ${traits}${WuxDef.GetTitle(effect.effect)} damage per rank of your Burst condition. You then lose the Burst condition`;
                return;
            case "Status":
                let status = WuxDef.Get(Format.GetDefinitionName("Status", subTypeParts[1]));
                this.addDefintionToEffectDescription(status);
                this.effectDescription += (this.effectDescription == "" ? "" : ". ");
                this.effectDescription += `If ${this.formatTarget(effect)} has ${status.getTitle()}, ${this.formatTargetTake(effect)} ${this.formatCalcBonus(effect)} ${traits}${WuxDef.GetTitle(effect.effect)} damage`;
                return;
            case "Cond":
                let conditionalEffect = WuxDef.GetTitle(Format.GetDefinitionName("Status", subTypeParts[1]));
                this.effectDescription += (this.effectDescription == "" ? "" : ". ");
                this.effectDescription += `If you have ${conditionalEffect}, ${this.formatTargetTake(effect)} ${this.formatCalcBonus(effect)} ${traits}${WuxDef.GetTitle(effect.effect)} damage`;
                return;
            case "Special":
                this.effectDescription += (this.effectDescription == "" ? "" : ". ");
                this.effectDescription += effect.effect;
                return;
            default:
                this.effectDescription += (this.effectDescription == "" ? `${this.formatTargetTake(effect)}` : " and");
                this.effectDescription += ` ${this.formatCalcBonus(effect)} ${traits}${WuxDef.GetTitle(effect.effect)} damage`;
        }
    }

    formatBreakEffect(effect, technique) {

        let traits = "";
        this.addDefintionToEffectDescription(WuxDef.Get("Trait_Break"));
        if (technique.impacts.indexOf("AP") >= 0) {
            traits += "[AP] ";
            if (!this.includedAp) {
                this.includedAp = true;
                this.addDefintionToEffectDescription(WuxDef.Get("Trait_AP"));
            }
        }
        this.effectDescription += (this.effectDescription == "" ? `(Objects only) ${this.formatTargetTake(effect)}` : " and");
        this.effectDescription += ` ${this.formatCalcBonus(effect)} ${traits} damage`;
        
    }

    formatHpEffect(effect) {
        let hp = WuxDef.GetTitle("HP");
        let subTypeParts = effect.subType.split(":");
        let subType = subTypeParts[0];
        switch (subType) {
            case "Heal":
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} ${hp}`;
                return;
            case "Surge":
                this.effectDescription += `If ${this.formatTarget(effect)} has a surge, they must spend one and heal ${this.formatCalcBonus(effect)} ${hp}`;
                return;
            case "Special":
                this.effectDescription += effect.effect;
                return;
            default:
                this.effectDescription += `${this.formatTargetTake(effect)} ${this.formatCalcBonus(effect)} ${WuxDef.GetTitle(effect.effect)} damage`;
        }
    }

    formatWillEffect(effect) {
        let willpower = WuxDef.GetTitle("WILL");
        switch (effect.subType) {
            case "Heal":
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} ${willpower}`;
                return;
            default:
                this.effectDescription += `${this.formatTargetTake(effect)} ${this.formatCalcBonus(effect)} ${willpower} damage`;
        }
    }

    formatVitalityEffect(effect) {
        let vitality = WuxDef.GetTitle("Cmb_Vitality");
        switch (effect.subType) {
            case "Heal":
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} ${vitality}`;
                return;
            default:
                this.effectDescription += `${this.formatTargetLose(effect)} ${this.formatCalcBonus(effect)} ${vitality}`;
        }
    }

    formatFavorEffect(effect) {
        let favorTitle = WuxDef.GetTitle("Soc_Favor");
        switch (effect.subType) {
            case "Heal":
                this.effectDescription += `${this.formatTargetLose(effect)} ${this.formatCalcBonus(effect)} ${favorTitle}`;
                return;
            default:
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} ${favorTitle}`;
        }
    }

    formatInfluenceMeterEffect(effect) {
        let subTypes = effect.subType.split(":");
        switch (subTypes[0]) {
            case "Raise":
                this.effectDescription += `Raise the severity of an influence on your target`;
                return;
            case "Lower":
                this.effectDescription += `Lower the severity of an influence on your target`;
                return;
            case "Adjust":
                this.effectDescription += `Raise or lower the severity of an influence on your target`;
                return;
            case "Reveal":
                this.effectDescription += "A related influence to the statement is revealed to you. You learn whether the influence is supportive or oppositional";
                return;
            case "RevealNeg":
                this.effectDescription += "A related oppositional influence to the statement is revealed to you";
                return;
            case "RevealPos":
                this.effectDescription += "A related supportive influence to the statement is revealed to you";
                return;
            case "Add":
                this.effectDescription += `${this.formatTargetGain(effect)} the influence, "${effect.effect}" which is at ${subTypes[1]} Severity. This influence is removed if the target becomes hostile towards you or the social conflict ends`;
        }
    }

    formatImpatienceMeterEffect(effect) {
        let impatience = WuxDef.GetTitle("Soc_Impatience");
        switch (effect.subType) {
            case "Heal":
                this.effectDescription += `${this.formatTargetLose(effect)} ${this.formatCalcBonus(effect)} ${impatience}`;
                return;
            default:
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} ${impatience}`;
        }
    }

    formatRequestEffect(effect) {
        this.effectDescription += `Make a request check on the target with ${this.formatCalcBonus(effect)}`;
        if (effect.subType == "Bargain") {
            this.effectDescription += `. When making your request, you may attempt to bargain at the same time by offering goods, services, or favors. You may also choose to threaten and offering them things they do not want at the risk of angering them. This may increase the results of your request check. `;
            
        }
    }

    formatStatusEffect(effect, state) {
        let formula = this.formatCalcBonus(effect).trim();

        switch (effect.subType) {
            case "Set":
                if (formula == "") {
                    this.effectDescription += `${this.formatTargetGain(effect)} the ${state.title} ${state.group}`;
                }
                else {
                    this.effectDescription += `${this.formatTargetGain(effect)} ${state.title} ${state.group} [Rank ${formula}]`; 
                }
                return;
            case "Add":
            case "Enhancing":
                if (formula == "") {
                    this.effectDescription += `${this.formatTargetGain(effect)} the ${state.title} ${state.group}`;
                }
                else {
                    this.effectDescription += `${this.formatTargetGain(effect)} ${formula} ranks in the ${state.title} ${state.group}`; 
                }
                return;
            case "Focus":
                if (formula == "") {
                    this.effectDescription += `While you maintain focus on this technique, ${this.formatTargetGain(effect)} the ${state.title} ${state.group}`;
                }
                else {
                    this.effectDescription += `While you maintain focus on this technique, ${this.formatTargetGain(effect)} ${formula} ranks in the ${state.title} ${state.group}`;
                }

                return;
            case "Trigger":
                this.effectDescription += `If ${this.formatTarget(effect)} has ${state.getTitle()}, trigger the effects`;
                return;
            case "Remove":
                this.effectDescription += `${this.formatTargetLose(effect)} the ${state.title} ${state.group}`;
                return;
            case "Remove Any":
                this.effectDescription += `${this.formatTargetLose(effect)} any condition of your choice`;
                return;
            case "Remove All":
                this.effectDescription += `${this.formatTargetLose(effect)} all conditions of your choice`;
                return;
            case "Remove Will":
                this.effectDescription += `${this.formatTargetLose(effect)} all emotions of ${this.formatTargetOwnership(effect)} choice`;
                return;
            case "Self":
                this.effectDescription += `${this.formatTargetGain(effect)} the ${state.title} ${state.group} targeted towards the caster`;
                return;
            case "Choose":
                this.effectDescription += `${this.formatTargetGain(effect)} the ${state.title} ${state.group} targeted towards a character of your choice. The chosen character must be one that is antagonistic to the target`;
                return;
            default:
                this.effectDescription += `${this.formatTargetGain(effect)} the ${state.title} ${state.group}`;
        }
    }
    
    formatBreakFocusEffect() {
        this.effectDescription += `A technique of your choice that is being focused on by the target ends`;
    }

    formatResistanceEffect(effect) {
        let resistance = WuxDef.GetTitle("Resistance");
        let damageType = WuxDef.GetTitle(effect.effect);
        this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} ${resistance} against ${damageType} damage`;
    }

    formatBoostEffect(effect) {
        switch (effect.subType) {
            case "Set":
                this.effectDescription += `${WuxDef.GetTitle(effect.effect)} is set to ${this.formatCalcBonus(effect)}`;
                return;
            case "Penalty":
                this.effectDescription += `${WuxDef.GetTitle(effect.effect)} decreases by ${this.formatCalcBonus(effect)}`;
                return;
            default:
                this.effectDescription += `${WuxDef.GetTitle(effect.effect)} increases by ${this.formatCalcBonus(effect)}`;
        }
    }

    formatTerrainEffect(effect, terrainType) {
        switch (effect.subType) {
            case "Add":
                this.effectDescription += `The area is considered [${terrainType.getTitle()}]`;
                return;
            case "Remove":
                this.effectDescription += `Any effects in the area considered [${terrainType.getTitle()}] are removed`;
        }
    }

    formatStructureEffect(effect) {
        let count = this.formatCalcBonus(effect);
        switch (effect.subType) {
            case "Count":
                this.effectDescription += `You create ${count} ${effect.effect} at the targeted spaces.`;
                if (count > 1) {
                    this.effectDescription += ` Each object must be within range of this technique.`;
                }
                return;
            case "Dimensions":
                this.effectDescription += `Each ${effect.effect} is ${count} spaces high`;
                return;
            case "HP":
                this.effectDescription += `Each ${effect.effect} has ${count} ${WuxDef.GetTitle("HP")}`;
                return;
            case "Armor":
                this.effectDescription += `Each ${effect.effect} has ${count} ${WuxDef.GetTitle("Cmb_Armor")}`;
                return;
            default:
                this.effectDescription += effect.effect;
        }
    }

    formatMoveEffect(effect) {
        switch (effect.subType) {
            case "Charge":
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} Move Charge`;
                return;
            case "Jump":
                let jump = "";
                if (effect.effect != "") {
                    jump += `${effect.effect} spaces high`;
                } 
                let calc = this.formatCalcBonus(effect);
                if (calc > 0) {
                    if (jump != "") {
                        jump += " and ";
                    }
                    jump += `${calc} spaces wide`;
                }
                this.effectDescription += `${this.formatTarget(effect)} jumps ${jump}`;
                return;
            case "Pushed":
                this.effectDescription += `${this.formatTargetCopula(effect)} Pushed ${this.formatCalcBonus(effect)} spaces ${effect.effect == "" ? "from you" : effect.effect}`;
                return;
            case "Pulled":
                this.effectDescription += `${this.formatTargetCopula(effect)} Pulled ${this.formatCalcBonus(effect)} spaces ${effect.effect == "" ? "towards you." : effect.effect}`;
                return;
            case "ForceMove":
                this.effectDescription += `${this.formatTargetCopula(effect)} Force Moved ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "" : " " + effect.effect}`;
                return;
            case "Float":
                this.effectDescription += `${this.formatTarget(effect, " Float", " Floats")}`;
                return;
            case "FreeMove":
                let spaces = this.formatCalcBonus(effect);
                if (spaces == "") {
                    this.effectDescription += `${this.formatTarget(effect)} may Free Move ${effect.effect == "" ? "" : " " + effect.effect}`;
                }
                this.effectDescription += `${this.formatTarget(effect)} may Free Move up to ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "" : " " + effect.effect}`;
                return;
            case "Sneak":
                this.effectDescription += `${this.formatTarget(effect)} may Move up to ${this.formatCalcBonus(effect)} spaces. This movement does not break the hidden or invisible condition`;
                return;
            case "Fall":
                this.effectDescription += `${this.formatTarget(effect)} falls`;
                return;
            case "Teleport":
                this.effectDescription += `${this.formatTarget(effect)} teleports up to ${this.formatCalcBonus(effect)} spaces${effect.effect != "" ? "" : " " + effect.effect}`;
                return;
            case "Temporal":
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} Temporal Movement Actions`;
                return;
            default:
                this.effectDescription += `${this.formatTarget(effect)} may Move up to ${this.formatCalcBonus(effect)} spaces${effect.effect != "" ? "" : " " + effect.effect}`;
        }
    }

    formatEnEffect(effect) {
        let effectTotal = this.formatCalcBonus(effect);
        this.effectDescription += `${this.formatTargetGain(effect)} ${effectTotal} ${WuxDef.GetTitle("EN")}`;
    }

    formatFreeFocusEffect() {
        this.effectDescription += `You may maintain focus on the triggering technique without expending EN and it does not count against your limit of focus techniques`;
    }

    formatDescriptionEffect(effect) {
        this.effectDescription += effect.effect;
    }

    formatTargetTake(effect) {
        return this.formatTarget(effect, " takes", " take");
    }

    formatTargetGain(effect) {
        return this.formatTarget(effect, " gains", " gain");
    }

    formatTargetLose(effect) {
        return this.formatTarget(effect, " loses", " lose");
    }

    formatTargetCopula(effect) {
        return this.formatTarget(effect, " is", " are");
    }

    formatTarget(effect, targetSuffix, selfSuffix) {
        if (targetSuffix == undefined) {
            targetSuffix = "";
        }
        if (selfSuffix == undefined) {
            selfSuffix = "";
        }
        
        if (effect.target == "Self") {
            return `You${selfSuffix}`;
        }
        return `Target${targetSuffix}`;
    }
    
    formatTargetOwnership(effect) {
        return effect.target == "Self" ? "your" : "their";
    }

    formatCalcBonus(effect) {
    }

    addDefintionToEffectDescription(definition) {
        if (this.effectTypeDesc.length > 1) {
            this.effectTypeDesc.push("");
        }
        this.effectTypeDesc.push(`[${definition.getTitle()}]`);
        this.effectTypeDesc = this.effectTypeDesc.concat(definition.descriptions);
    }
}

class TechniqueEffectDisplayData extends BaseTechniqueEffectDisplayData {

    constructor(techniqueEffects, technique, coreDefense, effectDefinitions) {
        super();
        if (techniqueEffects == undefined) {
            return;
        }
        this.effects = [];
        if (effectDefinitions != undefined) {
            this.effectTypeDesc = this.effectTypeDesc.concat(effectDefinitions);
        }

        this.setEvasionDefense(technique, coreDefense);
        this.importEffectData(techniqueEffects, technique);
    }

    getEffectDescriptions(join) {
        return this.effectTypeDesc.join(join);
    }

    getEffects(join) {
        return this.effects.join(join);
    }
    
    setEvasionDefense(technique, coreDefense) {
        this.evasionDefense = this.getDodgeDefense(technique, coreDefense);
    }
    getDodgeDefense(technique, coreDefense) {
        if (coreDefense == "Brace" || coreDefense == "Warding") {
            if (technique.impacts.includes("Truehit")) {
                return "True";
            }
            return "Evasion";
        }
        if (coreDefense == "Logic" || coreDefense == "Resolve") {
            if (technique.impacts.includes("Truehit")) {
                return "True";
            }
            return "Insight";
        }
        return "";
    }

    importEffectData(effectData, technique) {
        let currentEffect = effectData[0].type;
        for (let i = 0; i < effectData.length; i++) {
            let effect = effectData[i];
            if (effect.type != currentEffect || effect.type == "Boost") {
                if (this.effectDescription != "") {
                    currentEffect = effect.type;
                    this.effects.push(this.effectDescription);
                    this.effectDescription = "";
                }
            }
            
            this.formatEffect(effect, technique);
        }
        this.effects.push(this.effectDescription);
        this.effectDescription = "";
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        if (effect.formula.workers.length == 0) {
            return output;
        }
        
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

class TechniqueEffectDisplayEnhancmenteData extends BaseTechniqueEffectDisplayData {

    constructor(techniqueEffects, technique) {
        super();
        if (techniqueEffects == undefined) {
            return;
        }
        this.effects = [];
        this.importEffectData(techniqueEffects, technique);
    }

    importEffectData(effectData, technique) {
        for (let i = 0; i < effectData.length; i++) {
            let effect = effectData[i];
            let enhanceEffect = technique.enhancementEffects[effect.type];
            if (enhanceEffect == undefined) {
                continue;
            }
            effect.dVal = enhanceEffect.dVal;
            effect.formula = enhanceEffect.formula;

            this.formatEffect(effect, technique);
            this.effects.push(this.effectDescription);
            this.effectDescription = "";
        }
    }

    formatDamageEffect(effect, technique) {
        this.effectDescription += `Increase ${WuxDef.GetTitle(effect.effect)} damage by ${this.formatCalcBonus(effect)}`;
    }

    formatHpEffect(effect, technique) {
        if (effect.subType == "Heal") {
            this.effectDescription += `Increase HP healing by ${this.formatCalcBonus(effect)}`;
        }
        if (effect.subType == "Surge") {
            this.effectDescription += `Increase HP healing on Surge by ${this.formatCalcBonus(effect)}`;
        }
    }
    
    formatStatusEffect(effect, state) {
        this.effectDescription += `Increase ${WuxDef.GetTitle(effect.effect)} ranks by ${this.formatCalcBonus(effect)}`;
    }

    formatStructureEffect(effect, technique) {
        this.effectDescription += `Increase structure count by ${this.formatCalcBonus(effect)}`;
    }

    formatRequestEffect(effect) {
        this.effectDescription += `Increase request check bonus by ${this.formatCalcBonus(effect)}`;
    }

    formatMoveEffect(effect) {
        let bonus = this.formatCalcBonus(effect);
        switch (effect.subType) {
            case "FreeMove":
                this.effectDescription += `Increase Free Move distance by ${bonus} spaces`;
                return;
            case "Pushed":
                this.effectDescription += `Increase Pushed distance by ${bonus} spaces`;
                return;
            case "Pulled":
                this.effectDescription += `Increase Pulled distance by ${bonus} spaces`;
                return;
            case "ForceMove":
                this.effectDescription += `Increase Force Move distance by ${bonus} spaces`;
                return;
            case "Sneak":
                this.effectDescription += `Increase Sneak movement by ${bonus} spaces`;
                return;
            case "Teleport":
                this.effectDescription += `Increase teleport distance by ${bonus} spaces`;
                return;
            case "Jump":
                this.effectDescription += `Increase jump distance by ${bonus} spaces`;
                return;
            case "Charge":
                this.effectDescription += `Increase Move Charge by ${bonus}`;
                return;
            case "Temporal":
                this.effectDescription += `Increase Temporal Movement Actions by ${bonus}`;
                return;
            default:
                this.effectDescription += `Increase movement by ${bonus} spaces`;
        }
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        if (effect.formula.workers.length == 0) {
            return output;
        }
        
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

class TechniqueEffectDisplayUseData extends BaseTechniqueEffectDisplayData {

    constructor(props, senderName, targetName) {
        super(props);
        this.senderName = senderName;
        this.targetName = targetName;
    }

    formatEffect(effect) {
        this.effectDescription = "";
        switch (effect.type) {
            case "Damage":
            case "HP":
            case "WILL":
            case "Favor":
                return;
            case "Vitality":
                this.formatVitalityEffect(effect);
                break;
            case "Impatience":
                this.formatImpatienceMeterEffect(effect);
                break;
            case "Influence":
                this.formatInfluenceMeterEffect(effect);
                break;
            case "Request":
                this.formatRequestEffect(effect);
                break;
            case "Status":
                let state = WuxDef.Get(effect.effect);
                this.formatStatusEffect(effect, state);
                break;
            case "Resistance":
                this.formatResistanceEffect(effect);
                break;
            case "Terrain":
                let terrainType = WuxDef.Get(effect.effect);
                this.formatTerrainEffect(effect, terrainType);
                break;
            case "Move":
                this.formatMoveEffect(effect);
                break;
            case "EN":
                this.formatEnEffect(effect);
                break;
            case "Desc":
                this.formatDescriptionEffect(effect);
                break;
        }

        return this.effectDescription;
    }

    formatTargetTake(effect) {
        return this.formatTarget(effect, " takes", " takes");
    }

    formatTargetGain(effect) {
        return this.formatTarget(effect, " gains", " gains");
    }

    formatTargetLose(effect) {
        return this.formatTarget(effect, " loses", " loses");
    }

    formatTargetCopula(effect) {
        return this.formatTarget(effect, " is", " is");
    }

    formatTarget(effect, targetSuffix, selfSuffix) {
        if (targetSuffix == undefined) {
            targetSuffix = "";
        }
        if (selfSuffix == undefined) {
            selfSuffix = "";
        }

        if (effect.target == "Self") {
            return `${this.senderName}${selfSuffix}`;
        }
        return `${this.targetName}${targetSuffix}`;
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        if (effect.formula.workers.length == 0) {
            return output;
        }
        
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

    createEmpty() {
        this.item = {};
        this.name = "";
        this.displayname = "";
        this.sheetname = "";
        this.group = "";
        this.stats = "";
        this.bulk = "";
        this.baseValue = "";
        this.traits = "";
        this.traitsDesc = [];
        this.description = "";
        this.craftComponents = [];
        this.craftData = [];
        this.craftDesc = [];
    }

    importItem(item) {
        this.item = item;
        this.name = item.name;
        this.displayname = item.displayname;
        this.sheetname = item.sheetname;
        this.group = `${item.group}${item.category != "" ? ` (${item.category})` : ""}`;
        this.bulk = item.bulk;
        this.baseValue = item.value;
        this.stats = `Base Value: ${item.value}; Bulk: ${item.bulk}`;
        this.description = item.description;
        this.setTraitsData();
        
        if (item.itemType == "UsableItem") {
            if (item.components != "") {
                this.setComponents(item.components);
            }
        }
        this.setCrafting();
    }

    setTraitsData() {
        this.traits = "";
        this.traitsDesc = [];
        let traitDefinitions = WuxDef.GetValues(this.item.traits, ";", "Trait_");

        if (traitDefinitions.length > 0) {
            for (let i = 0; i < traitDefinitions.length; i++) {
                let item = traitDefinitions[i];
                if (traitDefinitions.length > 1) {
                    if (i == traitDefinitions.length - 1) {
                        this.traits += ` and`;
                    } else if (i > 0) {
                        this.traits += ", ";
                    }
                }
                this.traits += ` ${item.getTitle()}`;
                if (this.traitsDesc.length > 0) {
                    this.traitsDesc.push("");
                }
                this.traitsDesc.push(`[${item.getTitle()}]`);
                this.traitsDesc = this.traitsDesc.concat(item.descriptions);
            }
        }
    }

    setComponents(components) {
        let setDelimiter = ";";
        let quantityDelimiter = " ";
        let typeDelimiter = "_";
        
        components = components.split(setDelimiter);

        this.craftComponents = [];
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
                    item = WuxGoods.Get(name);
                    type = "Goods Category";
                    break;
                default:
                    item = WuxItems.Get(name);
                    break;
            }
            
            if (item != undefined) {
                this.craftComponents.push({
                    quantity: quantity,
                    type: type,
                    item: item,
                    name: `${quantity} ${item.name}`,
                    desc: item.description
                });
            }
        }
    }
    
    setCrafting() {
        this.craftData = [];
        this.craftDesc = [];
        let isBlueprint = this.item.skill == "Build";
        
        this.addDefinitionToCraftDesc(WuxDef.Get(isBlueprint ? "System_CraftingBlueprint" : "System_CraftingRecipe"));
        
        if (this.item.dc == 0) {
            this.craftData.push(`${this.item.skill} Training`);
            this.addDefinitionToCraftDesc(WuxDef.Get(isBlueprint ? "System_CraftSkillCheckBlueprintTraining" : "System_CraftSkillCheckTraining"));
        }
        else {
            this.craftData.push(`DC ${this.item.dc} ${this.item.skill} Check`);
            this.addDefinitionToCraftDesc(WuxDef.Get(isBlueprint ? "System_CraftSkillCheckBlueprint" : "System_CraftSkillCheck"));
            this.addDefinitionToCraftDesc(WuxDef.Get("System_CraftSkillCheck"));
        }
        
        this.craftData.push(`Time: ${this.item.time}`);
        this.addDefinitionToCraftDesc(WuxDef.Get(isBlueprint ? "System_CraftTimeBlueprint" : "System_CraftTime"));
        
        let craftComponentData = "";
        this.addDefinitionToCraftDesc(WuxDef.Get("System_CraftingComponent"));
        if (isBlueprint) {
            craftComponentData += `${this.item.bulk} bulk materials`;
            this.addDefinitionToCraftDesc(WuxDef.Get("System_CraftMaterials"));
        }
        
        for (let i = 0; i < this.craftComponents.length; i++) {
            let item = this.craftComponents[i];
            if (this.craftComponents.length > 1) {
                if (i == this.craftComponents.length - 1) {
                    craftComponentData += ` and`;
                } else if (i > 0) {
                    craftComponentData += ", ";
                }
            }
            craftComponentData += ` ${item.name}`;
            this.addComponentToCraftDesc(item);
        }

        if (craftComponentData != "") {   
            this.craftData.push(`Components: ${craftComponentData}`);
        }
    }
    addDefinitionToCraftDesc(definition) {
        this.addToCraftDesc(definition.getTitle(), definition.descriptions);
    }
    addComponentToCraftDesc(item) {
        this.addToCraftDesc(item.item.name, item.desc);
    }
    addToCraftDesc(name, descriptions) {
        if (this.craftDesc.length > 0) {
            this.craftDesc.push("");
        }
        this.craftDesc.push(`[${name}]`);
        this.craftDesc = this.craftDesc.concat(descriptions);
    }

    getTraitsDescriptions(join) {
        return this.traitsDesc.join(join);
    }
    getCraftingDescriptions(join) {
        return this.craftData.join(join);
    }
    getCraftingTooltip(join) {
        return this.craftDesc.join(join);
    }
}

// Helper

class FormulaData {

    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (data.workers == undefined) {
                this.formulaString = "" + data;
                this.importFormula(data);
            } else {
                this.importJson(data);
            }
        }
    }

    createEmpty() {
        this.formulaString = "";
        this.workers = [];
    }

    importJson(json) {
        this.workers = json.workers;
    }

    importFormula(data) {
        if (data == "" || data == undefined) {
            return;
        }

        let formulaData = this;
        this.iterateFormulaComponentsForImport(data, function (definitionName, definitionNameModifier, multiplier, max) {
            if (isNaN(parseInt(definitionName))) {
                let definition = [];
                let modDefinition = {};
                let definitionNames = [];
                let formulaVar = [];
                if (definitionName.includes("%")) {
                    let tempDefinition = definitionName.split("%");
                    definition.push(WuxDef.Get(tempDefinition[0]));
                    definition.push(WuxDef.Get(tempDefinition[1]));
                    definitionNames.push(tempDefinition[0]);
                    definitionNames.push(tempDefinition[1]);
                }
                else {
                    definition.push(WuxDef.Get(definitionName));
                    definitionNames.push(definitionName);
                }
                
                if (definitionNameModifier == "") {
                    for (let i = 0; i < definition.length; i++) {
                      formulaVar.push(definition[i].getVariable());  
                    }
                } else {
                    modDefinition = WuxDef.Get(definitionNameModifier);
                    for (let i = 0; i < definition.length; i++) {
                        formulaVar.push(definition[i].getVariable(modDefinition.getVariable()));
                    }
                }

                formulaData.workers.push(formulaData.makeWorker(formulaVar, definitionNames, 0, multiplier, max));
            } else {
                formulaData.workers.push(formulaData.makeWorker([], [], parseInt(definitionName), multiplier, max));
            }
        })
    }

    iterateFormulaComponentsForImport(baseFormula, callback) {
        let definitionName = "";
        let definitionNameModifier = "";
        let multiplier = 1.0;
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
                if (isNaN(parseFloat(multiplier))) {
                    if (multiplier.trim() == "") {
                        multiplier = 1.0;
                    }
                    else {
                        multiplier = WuxDef.GetVariable(multiplier);
                    }
                } else {
                    multiplier = parseFloat(multiplier);
                }
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
            if (attributes[i] != "" && attributes[i] != "0") {
                this.workers.push(this.makeWorker([attributes[i]], [], 0, 1, 0));
            }
        }
    }
    
    setMultipliers(multiplier) {
        for (let i = 0; i < this.workers.length; i++) {
            this.workers[i].multiplier = multiplier;
        }
    }

    makeWorker(variableName, definitionName, value, multiplier, max) {
        return {
            variableName: variableName,
            definitionName: definitionName,
            value: isNaN(parseInt(value)) ? 0 : parseInt(value),
            multiplier: isNaN(parseFloat(multiplier)) ? multiplier : parseFloat(multiplier),
            max: max
        }
    }

    getAttributes() {
        let attributes = [];
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].variableName.length > 0) {
                for (let j = 0; j < this.workers[i].variableName.length; j++) {
                    attributes.push(this.workers[i].variableName[j]);
                }
            }
            if (isNaN(this.workers[i].multiplier)) {
                attributes.push(this.workers[i].multiplier);
            }
        }
        return attributes;
    }

    getDefinitions() {
        let definitions = [];
        for (let i = 0; i < this.workers.length; i++) {
            for (let j = 0; j < this.workers[i].definitionName.length; j++) {
                definitions.push(this.workers[i].definitionName[j]);
            }
        }
        return definitions;
    }

    hasFormula() {
        return this.workers.length > 0;
    }
    
    hasWorker(variableName) {
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].variableName.length > 0) {
                for (let j = 0; j < this.workers[i].variableName.length; j++) {
                    if (this.workers[i].variableName[j] == variableName) {
                        return true;
                    }
                }
            }
            
        }
        return false;
    }

    getValue(attributeHandler, printName) {
        let output = 0;
        let mod = 0;
        let printOutput = "";
        this.workers.forEach((worker) => {
            let multiplier = parseFloat(worker.multiplier);
            if (isNaN(multiplier)) {
                if (attributeHandler == undefined) {
                    Debug.LogError(`[Formula.GetValue] No AttributeHandler defined.`);
                    return;
                }
                
                multiplier = attributeHandler.parseInt(Math.round(worker.multiplier));
            }
            if (worker.variableName.length == 1) {
                if (attributeHandler == undefined) {
                    Debug.LogError(`[Formula.GetValue] No AttributeHandler defined.`);
                    return;
                }
                worker.value = attributeHandler.parseInt(worker.variableName[0]);
                if (printName != undefined) {
                    printOutput = this.addPrintModifier(printOutput, `${worker.variableName[0]}(${worker.value})`, multiplier);
                }
            } else if (worker.variableName.length >= 2) {
                if (attributeHandler == undefined) {
                    Debug.LogError(`[Formula.GetValue] No AttributeHandler defined.`);
                    return;
                }
                worker.value = 0;
                for (let j = 0; j < worker.variableName.length; j++) {
                    let tempValue = attributeHandler.parseInt(worker.variableName[j]);
                    if (tempValue > worker.value) {
                        worker.value = tempValue;
                    }
                }
                if (printName != undefined) {
                    printOutput = this.addPrintModifier(printOutput, `MultValue(${worker.value})`, multiplier);
                }
            } else if (printName != undefined) {
                printOutput = this.addPrintModifier(printOutput, `${worker.value}`, multiplier);
            }
            mod = worker.value * multiplier;
            if (worker.max > 0 && mod > worker.max) {
                mod = worker.max;
            }
            output += mod;
        });
        if (printName != undefined) {
            Debug.Log(`${printName} Formula: ${printOutput} = ${output}`);
        }
        return parseInt(output);
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
        this.workers.forEach((worker) => {
            if (worker.definitionName.length > 0) {
                let definition = WuxDef.Get(worker.definitionName[0]);
                if (definition != undefined) {
                    if (output != "") {
                        output += " + ";
                    }
                    if (definition.group == "StatBonus") {
                        output += `${definition.formula.getString()} `;
                    } else if (worker.multiplier != 1) {
                        if (isNaN(parseFloat(worker.multiplier))) {
                            let text = "";
                            if (worker.multiplier == "adv-cr") {
                                text = WuxDef.GetTitle("CR");
                            }
                            else {
                                text = WuxDef.GetTitle(worker.multiplier);
                            }
                            output += `[${definition.title} x ${text}] `;
                        } else if (worker.multiplier > 1) {
                            output += `[${definition.title} x ${worker.multiplier}] `;
                        } else {
                            switch (worker.multiplier) {
                                case 0.5:
                                    output += `[½ ${definition.title}] `;
                                    break;
                                case 0.33:
                                    output += `[⅓ ${definition.title}] `;
                                    break;
                                case 0.25:
                                    output += `[¼ ${definition.title}] `;
                                    break;
                                case 0.2:
                                    output += `[⅕ ${definition.title}] `;
                                    break;
                            }
                        }
                    } else {
                        let secondDefinition;
                        if (worker.definitionName.length > 1) {
                            secondDefinition = WuxDef.Get(worker.definitionName[1]);
                        }
                        if (secondDefinition != undefined && secondDefinition != "" && secondDefinition.getTitle() != "") {
                            output += `[Highest of ${definition.getTitle()} or ${secondDefinition.getTitle()}] `;
                        }
                        else {
                            output += `[${definition.title}] `;
                        }
                    }

                    if (worker.max > 0) {
                        output += `(max:${worker.max}) `;
                    }
                }
            } else if (worker.value > 0) {
                output += `${output != "" ? "+ " : ""} ${worker.value} `;
            }
            else if (worker.value < 0) {
                output += `- ${Math.abs(worker.value)} `;
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
        
        this.keeps = this.rolls.slice();
        if (keepHigh) {
            this.keeps = this.keeps.sort((a, b) => b - a).slice(0, keepCount);
        } else {
            this.keeps = this.keeps.sort((a, b) => a - b).slice(0, keepCount);
        }

        let used = {};
        let result = this.rolls
            .map(n => {
                if (this.keeps.includes(n) && (used[n] || 0) < this.keeps.filter(x => x === n).length) {
                    used[n] = (used[n] || 0) + 1;
                    return `[${n}]`;
                }
                return `${n}`;
            })
            .join(", ");
        
        this.message = `Rolls(${result})`;
        this.total = this.totalValues(this.keeps);
    }

    rollCheck(advantages) {
        let dieCount = 2 + Math.abs(advantages);
        let dieType = 6;
        this.dropRollDice(dieCount, dieType, 2, advantages >= 0);
    }

    addModToRoll(mod, modName) {
        if (modName == undefined) {
            modName = "Mod";
        }
        this.total += mod;
        this.message += ` + ${modName}[${mod}]`;
    }

    rollSkillCheck(advantages, mod) {
        this.rollCheck(advantages);
        this.addModToRoll(mod);
    }
    
    addDieRoll(dieRoll) {
        this.rolls = this.rolls.concat(dieRoll.rolls);
        this.keeps = this.keeps.concat(dieRoll.keeps);
        if (this.message != "") {
            this.message += " + ";
        }
        this.message += dieRoll.message;
        this.total += dieRoll.total;
    }
}

class DamageRoll extends DieRoll {
    createEmpty() {
        super.createEmpty();
        this.damageType = "";
        this.traits = "";
    }
    
    setDamageType(damageType) {
        this.damageType = damageType;
    }
    
    setTraits(traits) {
        this.traits = traits;
    }
    
    isSame(damageRoll) {
        return this.damageType == damageRoll.damageType &&
        this.traits == damageRoll.traits;
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
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (typeof data == "string") {
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

        try {
            let json = JSON.parse(stringifiedJSON);
            this.importJson(json);
        }
        catch {
            Debug.LogError(`[StatusHandler] Unable to parse JSON: ${stringifiedJSON}`);
        }
    }
    createEmpty() {
        this.statusEffects = {};
        this.conditions = {};
        this.emotions = {};
    }
    importJson(json) {
        this.statusEffects = json.statusEffects != undefined ? json.statusEffects : {};
        this.conditions = json.conditions != undefined ? json.conditions : {};
        this.emotions = json.emotions != undefined ? json.emotions : {};
    }

    hasStatus(defName) {
        let definition = new StatusHandlerStatusData(WuxDef.Get(defName));
        switch(definition.subGroup) {
            case "Status":
                if (this.statusEffects[defName] != undefined) {
                    let status = new StatusHandlerStatusData(this.statusEffects[defName]);
                    if (status.rank > 0) {
                        return status.rank;
                    }
                    return true;
                }
                return false;
            case "Condition":
                if (this.conditions[defName] != undefined) {
                    let status = new StatusHandlerStatusData(this.conditions[defName]);
                    if (status.rank > 0) {
                        return status.rank;
                    }
                    return true;
                }
                return false;
            case "Emotion":
                if (this.emotions[defName] != undefined) {
                    let status = new StatusHandlerStatusData(this.emotions[defName]);
                    if (status.rank > 0) {
                        return status.rank;
                    }
                    return true;
                }
                return false;
        }
        return false;
    }
    setStatus(defName, rank) {
        let statusEffect = new StatusHandlerStatusData(WuxDef.Get(defName));
        statusEffect.rank = rank;
        switch(statusEffect.subGroup) {
            case "Status":
                this.statusEffects[defName] = statusEffect;
                break;
            case "Condition":
                this.conditions[defName] = statusEffect;
                break;
            case "Emotion":
                this.emotions[defName] = statusEffect;
                break;
        }
    }
    addStatus(defName, rank) {
        let statusEffect = new StatusHandlerStatusData(WuxDef.Get(defName));
        statusEffect.rank = rank;
        switch(statusEffect.subGroup) {
            case "Status":
                if (this.statusEffects[defName] != undefined) {
                    statusEffect = new StatusHandlerStatusData(this.statusEffects[defName]);
                    statusEffect.rank += rank;
                }
                this.statusEffects[defName] = statusEffect;
                break;
            case "Condition":
                if (this.conditions[defName] != undefined) {
                    statusEffect = new StatusHandlerStatusData(this.conditions[defName]);
                    statusEffect.rank += rank;
                }
                this.conditions[defName] = statusEffect;
                break;
            case "Emotion":
                if (this.emotions[defName] != undefined) {
                    statusEffect = new StatusHandlerStatusData(this.emotions[defName]);
                    statusEffect.rank += rank;
                }
                this.emotions[defName] = statusEffect;
                break;
        }
    }
    removeStatus(defName) {
        let statusEffect = new StatusHandlerStatusData(WuxDef.Get(defName));
        switch(statusEffect.subGroup) {
            case "Status":
                delete this.statusEffects[defName];
                break;
            case "Condition":
                delete this.conditions[defName];
                break;
            case "Emotion":
                delete this.emotions[defName];
                break;
        }
    }
    removeAllStatus() {
        this.statusEffects = {};
        this.conditions = {};
        this.emotions = {};
    }
    
    printStatusSummary() {
        let output = ` ==========STATUS========== `;
        let statuses = Object.values(this.statusEffects);
        let conditions = Object.values(this.conditions);
        let emotions = Object.values(this.emotions);
        if (statuses.length == 0 && conditions.length == 0 && emotions.length == 0) {
            output += "None";
            return output;
        }
        if (statuses.length > 0) {
            output += "Statuses: ";
            for (let i = 0; i < statuses.length; i++) {
                let status = new StatusHandlerStatusData(statuses[i]);
                output += status.printStatusTitle();
                if (i < statuses.length - 1) {
                    output += "; ";
                }
            }
        }
        if (conditions.length > 0) {
            if (output != "") {
                output += " | ";
            }
            output += "Conditions: ";
            for (let i = 0; i < conditions.length; i++) {
                let condition = new StatusHandlerStatusData(conditions[i]);
                output += condition.printStatusTitle();
                if (i < conditions.length - 1) {
                    output += "; ";
                }
            }
        }
        if (emotions.length > 0) {
            if (output != "") {
                output += " | ";
            }
            output += "Emotions: ";
            for (let i = 0; i < emotions.length; i++) {
                let emotion = new StatusHandlerStatusData(emotions[i]);
                output += emotion.printStatusTitle();
                if (i < emotions.length - 1) {
                    output += "; ";
                }
            }
        }
        return output;
    }
    getStatusDetailsMessage(tokenTargetData, statusType, showAddOption) {
        let output = "";
        
        if (statusType == "All") {
            output += this.printStatusDetailsByStatusType(tokenTargetData, "Status");
            output += this.statusDetailsSpacer();
            output += this.printStatusDetailsByStatusType(tokenTargetData, "Condition");
            output += this.statusDetailsSpacer();
            output += this.printStatusDetailsByStatusType(tokenTargetData, "Emotion");
        }
        else {
            output += this.printStatusDetailsByStatusType(tokenTargetData, statusType);
        }
        if (showAddOption) {
            output += this.statusDetailsSpacer();
            output += this.printAddStatusOptions(tokenTargetData);
        }
        
        return output;
    }
    
    printStatusDetailsByStatusType(tokenTargetData, statusType) {
        let output = "";
        switch (statusType) {
            case "Status":
                output += this.statusDetailsTitle(`${tokenTargetData.displayName} Statuses`);
                let statuses = Object.values(this.statusEffects);
                if (statuses.length == 0) {
                    output += `<div>No Statuses</div>`;
                }
                else {
                    for (let i = 0; i < statuses.length; i++) {
                        let status = new StatusHandlerStatusData(statuses[i]);
                        output += this.printRemoveStatusDetails(status, tokenTargetData);
                        if (i < statuses.length - 1) {
                            output += this.statusDetailsSpacer();
                        }
                    }
                }
                break;
            case "Condition":
                output += this.statusDetailsTitle(`${tokenTargetData.displayName} Conditions`);
                let conditions = Object.values(this.conditions);
                if (conditions.length == 0) {
                    output += `<div>No Conditions</div>`;
                }
                else {
                    for (let i = 0; i < conditions.length; i++) {
                        let condition = new StatusHandlerStatusData(conditions[i]);
                        output += this.printRemoveStatusDetails(condition, tokenTargetData);
                        if (i < conditions.length - 1) {
                            output += this.statusDetailsSpacer();
                        }
                    }
                }
                break;
            case "Emotion":
                output += this.statusDetailsTitle(`${tokenTargetData.displayName} Emotions`);
                let emotions = Object.values(this.emotions);
                if (emotions.length == 0) {
                    output += `<div>No Emotions</div>`;
                }
                else {
                    for (let i = 0; i < emotions.length; i++) {
                        let emotion = new StatusHandlerStatusData(emotions[i]);
                        output += this.printRemoveStatusDetails(emotion, tokenTargetData);
                        if (i < emotions.length - 1) {
                            output += this.statusDetailsSpacer();
                        }
                    }
                }
                break;
        }
        return output;
    }
    
    printAddStatusOptions(tokenTargetData) {
        let output = "";
        output += this.statusDetailsTitle(`Add Status to ${tokenTargetData.displayName}`);
        output += this.statusDetailsButton("Add Status", `maddstatuslist ${tokenTargetData.tokenId}@@@Status`);
        output += this.statusDetailsButton("Add Condition", `maddstatuslist ${tokenTargetData.tokenId}@@@Condition`);
        output += this.statusDetailsButton("Add Emotion", `maddstatuslist ${tokenTargetData.tokenId}@@@Emotion`);
        return output;
    }
    
    printAddStatusPage(tokenTargetData, statusType) {
        let output = "";
        switch (statusType) {
            case "Status":
                output += this.statusDetailsTitle(`Add ${tokenTargetData.displayName} Statuses`);
                let statuses = WuxDef.Filter(new DatabaseFilterData("subGroup", statusType));
                for (let i = 0; i < statuses.length; i++) {
                    output += this.printAddStatusDetails(statuses[i], tokenTargetData);
                }
                break;
            case "Condition":
                output += this.statusDetailsTitle(`Add ${tokenTargetData.displayName} Conditions`);
                let conditions = WuxDef.Filter(new DatabaseFilterData("subGroup", statusType));
                for (let i = 0; i < conditions.length; i++) {
                    output += this.printAddStatusDetails(conditions[i], tokenTargetData);
                }
                break;
            case "Emotion":
                output += this.statusDetailsTitle(`Add ${tokenTargetData.displayName} Emotions`);
                let emotions = WuxDef.Filter(new DatabaseFilterData("subGroup", statusType));
                for (let i = 0; i < emotions.length; i++) {
                    output += this.printAddStatusDetails(emotions[i], tokenTargetData);
                }
                break;
        }
        return output;
    }

    printRemoveStatusDetails(statusData, tokenTargetData) {
        let output = "";
        output += this.statusDetailsTitle(`${statusData.printStatusTitle()} ${this.removeButton(tokenTargetData, statusData.name)}`);
        let description = WuxDef.GetDescription(statusData.name);
        if (description != "") {
            output += `<div>${description}</div>`;
        }
        return output;
    }

    printAddStatusDetails(statusDefinition, tokenTargetData) {
        let message = `maddstatus ${tokenTargetData.tokenId}@@@${statusDefinition.name}`;
        if (statusDefinition.hasRanks) {
            message += `;?{Ranks To Add|1}`;
        }
        return `<span class="sheet-wuxInlineRow">[Add ${statusDefinition.getTitle()}](!${message})</span> `;
    }

    removeButton(tokenTargetData, statusName) {
        let message = `mremstatus ${tokenTargetData.tokenId}@@@${statusName}`;
        return `<span class="sheet-wuxInlineRow">[Remove](!${message})</span> `;
    }

    statusDetailsTitle(title) {
        return `<div style='font-weight: bold'>${title}</div>`;
    }

    statusDetailsSpacer() {
        return `<div>&nbsp</div>`;
    }

    statusDetailsButton(name, message) {
        return `<span class="sheet-wuxInlineRow">[${name}](!${message})</span> `;
    }
}
class StatusHandlerStatusData {
    constructor(statusEffects) {
        this.createEmpty();
        if (statusEffects != undefined) {
            this.importStatusEffects(statusEffects);
        }
    }

    createEmpty() {
        this.name = "";
        this.title = "";
        this.subGroup = "";
        this.rank = 0;
        this.subject = "";
    }

    importStatusEffects(json) {
        this.name = json.name != undefined ? json.name : "";
        this.title = json.title != undefined ? json.title : "";
        this.subGroup = json.subGroup != undefined ? json.subGroup : "";
        this.rank = json.rank != undefined ? parseInt(json.rank) : 0;
        this.subject = json.subject != undefined ? json.subject : "";
    }
    
    printStatusTitle() {
        Debug.Log(`[StatusHandlerStatusData] printStatusTitle: ${this.title} - Rank: ${this.rank}`);
        if (this.rank > 0 && this.subject != "") {
            return `${this.title}[${this.rank}/${this.subject}]`;
        } else if (this.subject != "") {
            return `${this.title} [${this.subject}]`;
        }
        else if (this.rank > 0) {
            return `${this.title}[${this.rank}]`;
        }
        return this.title;
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
        this.affinity = "";
        this.cr = 0;
        this.job = "";
        this.jobDefenses = "";
        this.defenses = new CombatDetailsDefenses();
        this.surges = 2;
        this.maxsurges = 2;
        this.vitality = 1;
        this.maxvitality = 1;
        this.healvalue = 0;
        this.armorvalue = 0;
        this.burnResist = 0;
        this.coldResist = 0;
        this.energyResist = 0;
        this.forceResist = 0;
        this.piercingResist = 0;
        this.psycheResist = 0;
        this.mvSpeed = 0;
        this.dashSpeed = 0;
        this.weaponDamage = "";
    }

    importJson(json) {
        this.displayStyle = json.displayStyle != undefined ? json.displayStyle : "";
        this.displayName = json.displayName != undefined ? json.displayName : "";
        this.affinity = json.affinity != undefined ? json.affinity : "";
        this.cr = json.cr != undefined ? json.cr : 1;
        this.job = json.job != undefined ? json.job : "";
        this.jobDefenses = json.jobDefenses != undefined ? json.jobDefenses : "";
        if (json.defenses != undefined) {
            try {
                this.defenses.importJson(json.defenses);
            }
            catch {
                Debug.LogError(`[CombatDetails] Unable to parse Defenses JSON: ${json.defenses}`);
                this.defenses = new CombatDetailsDefenses();
            }
        }
        this.surges = json.surges != undefined ? json.surges : 2;
        this.maxsurges = json.maxsurges != undefined ? json.maxsurges : 2;
        this.vitality = json.vitality != undefined ? json.vitality : 1;
        this.maxvitality = json.maxvitality != undefined ? json.maxvitality : 1;
        this.healvalue = json.healvalue;
        this.armorvalue = json.armorvalue;
        this.burnResist = json.burnResist != undefined ? json.burnResist : 0;
        this.coldResist = json.coldResist != undefined ? json.coldResist : 0;
        this.energyResist = json.energyResist != undefined ? json.energyResist : 0;
        this.forceResist = json.forceResist != undefined ? json.forceResist : 0;
        this.piercingResist = json.piercingResist != undefined ? json.piercingResist : 0;
        this.psycheResist = json.psycheResist != undefined ? json.psycheResist : 0;
        this.mvSpeed = json.mvSpeed;
        this.dashSpeed = json.dashSpeed;
        this.weaponDamage = json.weaponDamage != undefined ? json.weaponDamage : "Force";
    }

    printTooltip() {
        let output = `${this.displayName} [CR${this.cr}] ${this.affinity == 0 ? "" : ` ${this.affinity}`}${this.job}`;
        output += ` =========================== `;
        output += `${this.defenses.printDefenses(this.cr)} - `;
        switch (this.displayStyle) {
            case "Battle":
                output += this.printVitality();
                output += `.${this.printSurges()}`;
                output += ` Armor:${this.armorvalue}`;
                output += `;.Regen:${this.healvalue}`;
                output += `;.Mv:${this.mvSpeed}`;
                output += `;.Dash:${this.dashSpeed}`;
                output += this.printResistances();
                
                break;
            case "Social":
                output += this.printSurges();
                output += this.printResistances();
                break;
        }
        return output;
    }
    printVitality() {
        return `Vit:${Format.PrintIcons(this.vitality, this.maxvitality, `♥`, `♡`)}`;
    }
    printSurges() {
        return `Surges:${Format.PrintIcons(this.surges, this.maxsurges, `⛊`, `⛉`)}`;
    }
    printResistances() {
        let resistances = "";
        if (this.burnResist != 0) {
            resistances += `;.Burn:${this.burnResist}`;
        }
        if (this.coldResist != 0) {
            resistances += `;.Cold:${this.coldResist}`;
        }
        if (this.energyResist != 0) {
            resistances += `;.Energy:${this.energyResist}`;
        }
        if (this.forceResist != 0) {
            resistances += `;.Force:${this.forceResist}`;
        }
        if (this.piercingResist != 0) {
            resistances += `;.Piercing:${this.piercingResist}`;
        }
        if (this.psycheResist != 0) {
            resistances += `;.Psyche:${this.psycheResist}`;
        }
        if (resistances != "") {
            resistances = ` Resistances-${resistances}`;
        }
        return resistances;
    }
}

class CombatDetailsDefenses {
    constructor(json) {
        this.createEmpty();
        if (json != undefined) {
            this.importJson(json);
        }
    }

    createEmpty() {
        this.brace = 0;
        this.warding = 0;
        this.reflex = 0;
        this.evasion = 0;
        this.resolve = 0;
        this.insight = 0;
        this.logic = 0;
    }

    importJson(json) {
        this.brace = json.brace != undefined ? json.brace : 0;
        this.warding = json.warding != undefined ? json.warding : 0;
        this.reflex = json.reflex != undefined ? json.reflex : 0;
        this.evasion = json.evasion != undefined ? json.evasion : 0;
        this.resolve = json.resolve != undefined ? json.resolve : 0;
        this.insight = json.insight != undefined ? json.insight : 0;
        this.logic = json.logic != undefined ? json.logic : 0;
    }
    
    calculateAverageDefense(cr) {
        return 11 + cr; // 11 = 7 (base) + 2 (job) + 2 (attribute)
    }
    
    calculateAverageEvasion(cr) {
        return 9 + cr; // 9 = 5 (base) + 2 (job) + 2 (attribute)
    }
    
    printDefenses() {
        let output = "Defs:";
        output += `${WuxDef.GetAbbreviation("Def_Evasion")}${this.evasion};.`;
        output += `${WuxDef.GetAbbreviation("Def_Brace")}${this.brace};.`;
        output += `${WuxDef.GetAbbreviation("Def_Warding")}${this.warding};.`;
        output += `${WuxDef.GetAbbreviation("Def_Reflex")}${this.reflex}`;
        
        output += " Sens:";
        output += `${WuxDef.GetAbbreviation("Def_Resolve")}${this.resolve};.`;
        output += `${WuxDef.GetAbbreviation("Def_Insight")}${this.insight};.`;
        output += `${WuxDef.GetAbbreviation("Def_Logic")}${this.logic}`;
        
        return output;
    }
    
}

class CombatDetailsHandler {
    constructor(attributeHandler) {
        if (attributeHandler == undefined) {
            return;
        }
        this.combatDetailsVar = WuxDef.GetVariable("CombatDetails");
        attributeHandler.addMod([this.combatDetailsVar]);
        this.combatDetails = new CombatDetails();
    }
    
    getCr() {
        return this.combatDetails.cr;
    }
    getArmor() {
        return this.combatDetails.armorvalue;
    }
    getSurge() {
        return this.combatDetails.surges;
    }
    getVitality() {
        return this.combatDetails.vitality;
    }
    getRegenValue() {
        return this.combatDetails.healvalue;
    }
    getWeaponDamage() {
        return this.combatDetails.weaponDamage;
    }
    getResistance(resistance) {
        switch (resistance) {
            case "Burn":
                return this.combatDetails.burnResist;
            case "Cold":
                return this.combatDetails.coldResist;
            case "Energy":
                return this.combatDetails.energyResist;
            case "Force":
                return this.combatDetails.forceResist;
            case "Piercing":
                return this.combatDetails.piercingResist;
            case "Psyche":
                return this.combatDetails.psycheResist;
            default:
                return 0;
        }
    }
    
    getDefense(defense) {
        switch (defense) {
            case "Brace":
                return this.combatDetails.defenses.brace;
            case "Evasion":
                return this.combatDetails.defenses.evasion;
            case "Reflex":
                return this.combatDetails.defenses.reflex;
            case "Warding":
                return this.combatDetails.defenses.warding;
            case "Insight":
                return this.combatDetails.defenses.insight;
            case "Resolve":
                return this.combatDetails.defenses.resolve;
            case "Logic":
                return this.combatDetails.defenses.logic;
            default:
                return 0;
        }
    }
    

    printTooltip(attrHandler, displayname) {
        this.setData(attrHandler);
        this.combatDetails.displayName = displayname;
        return this.combatDetails.printTooltip();
    }
    
    hasDisplayStyle() {
        return this.combatDetails.displayStyle != "";
    }

    onUpdateDisplayStyle(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.displayStyle = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateDisplayName(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.displayName = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateAffinity(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.affinity = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateCR(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.cr = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateJob(attrHandler, jobName) {
        this.setData(attrHandler);
        let jobCatDef = WuxDef.Get("Job");
        let jobDefinitionName = `${jobCatDef.abbreviation}_${jobName}`;
        let jobDef = WuxDef.Get(jobDefinitionName);

        this.combatDetails.job = jobDef.title;
        this.combatDetails.jobDefenses = jobDef.defenses;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
    
    onUpdateDefenses(attrHandler, brace, warding, reflex, evasion, resolve, logic, insight) {
        this.setData(attrHandler);
        this.combatDetails.defenses.brace = brace;
        this.combatDetails.defenses.warding = warding;
        this.combatDetails.defenses.reflex = reflex;
        this.combatDetails.defenses.evasion = evasion;
        this.combatDetails.defenses.resolve = resolve;
        this.combatDetails.defenses.insight = insight;
        this.combatDetails.defenses.logic = logic;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateHealValue(attrHandler, healValue) {
        this.setData(attrHandler);
        this.combatDetails.healvalue = healValue;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
    
    onUpdateArmorValue(attrHandler, armorValue) {
        this.setData(attrHandler);
        this.combatDetails.armorvalue = armorValue;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
    onUpdateResistanceValues(attrHandler, burn, cold, energy, force, piercing, psyche) {
        this.setData(attrHandler);
        this.combatDetails.burnResist = burn;
        this.combatDetails.coldResist = cold;
        this.combatDetails.energyResist = energy;
        this.combatDetails.forceResist = force;
        this.combatDetails.piercingResist = piercing;
        this.combatDetails.psycheResist = psyche;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateMoveSpeedValue(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.mvSpeed = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateDashSpeedValue(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.dashSpeed = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateSurges(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.surges = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateMaxSurges(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.maxsurges = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateVitality(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.vitality = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateMaxVitality(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.maxvitality = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
    
    onUpdateWeaponDamageType(attrHandler, value) {
        this.setData(attrHandler);
        this.combatDetails.weaponDamage = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
    
    onUpdateNoteStats(attrHandler, tokenNoteReference) {
        this.setData(attrHandler);
        this.combatDetails.surges = tokenNoteReference.surges.current;
        this.combatDetails.maxsurges = tokenNoteReference.surges.max;
        this.combatDetails.vitality = tokenNoteReference.vitality.current;
        this.combatDetails.maxvitality = tokenNoteReference.vitality.max;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
    
    setData(attrHandler) {
        if (this.combatDetails.cr == 0 && attrHandler != undefined) {
            this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        }
    }
    setDataFromTokenNote(tokenNote) {
        if (tokenNote.surges != undefined) {
            this.combatDetails.surges = tokenNote.surges.current;
            this.combatDetails.maxsurges = tokenNote.surges.max;
        }
        if (tokenNote.vitality != undefined) {
            this.combatDetails.vitality = tokenNote.vitality.current;
            this.combatDetails.maxvitality = tokenNote.vitality.max;
        }
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
        if (output == undefined) {
            if (this.attributes[fieldName] != undefined) {
                return this.attributes[fieldName].get(this.maxCheck ? "max" : "current");
            }
            else {
                return getAttrByName(this.characterId, fieldName, this.maxCheck ? "max" : "current");
            }
        }
        return output;
    }

    parseInt(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseInt(fieldName, defaultValue);
    }

    databaseParseInt(fieldName) {
        let output = super.databaseParseInt(fieldName);
        if (output == undefined) {
            if (this.attributes[fieldName] != undefined) {
                return parseInt(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
            }
            else {
                Debug.Log("Trying to parse int " + fieldName + " for char id " + this.characterId);
                return parseInt(getAttrByName(this.characterId, fieldName, this.maxCheck ? "max" : "current"));
            }
        }
        return output;
    }

    parseFloat(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseFloat(fieldName, defaultValue);
    }

    databaseParseFloat(fieldName) {
        let output = super.databaseParseFloat(fieldName);
        if (output == undefined) {
            if (this.attributes[fieldName] != undefined) {
                return parseFloat(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
            }
            else {
                return parseFloat(getAttrByName(this.characterId, fieldName, this.maxCheck ? "max" : "current"));
            }
        }
        return output;
    }

    parseJSON(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseJSON(fieldName, defaultValue);
    }

    databaseParseJSON(fieldName) {
        let output = super.databaseParseJSON(fieldName);
        if (output == undefined) {
            if (this.attributes[fieldName] != undefined) {
                try {
                    return JSON.parse(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
                }
                catch {
                    return undefined;
                }
            }
            else {
                try {
                    return JSON.parse(getAttrByName(this.characterId, fieldName, this.maxCheck ? "max" : "current"));
                }
                catch {
                    return undefined;
                }
            }
        }
        return output;
    }

    addAttribute(attrs) {
        if (Array.isArray(attrs)) {
            for (let i = 0; i < attrs.length; i++) {
                if (!this.attributes.hasOwnProperty(attrs[i])) {
                    this.attributes[attrs[i]] = this.getCharacterAttribute(attrs[i]);
                }
            }
        } else {
            if (this.attributes.hasOwnProperty(attrs)) {
                return;
            }
            this.attributes[attrs] = this.getCharacterAttribute(attrs);
        }
    }

    getAttribute(attr) {
        if (!this.attributes.hasOwnProperty(attr)) {
            return undefined;
        }
        return this.attributes[attr];
    }

    addUpdate(attr, value, isMax, showDebug) {
        if (showDebug) {
            Debug.Log(`Adding update ${attr} with value ${value}`);
        }
        if (this.attributes[attr] == undefined) {
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
        attributeHandler.getCallbacks.forEach((callback) => {
            callback(attributeHandler);
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
    constructor(definitionId, variableSuffix) {
        this.definitionId = definitionId;
        this.definition = WuxDef.Get(definitionId);
        this.repeatingSection = this.definition.getVariable(variableSuffix);
        this.ids = [];
        this.fieldNames = [];
        this.iteratorIndex = 0;
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

    getNextId() {
        while (this.iteratorIndex >= this.ids.length) {
            let generatedRowId = this.generateRowId();
            Debug.Log(`Adding generated row id ${generatedRowId}`)
            this.addIds(generatedRowId);
        }
        let value = this.getIdAtIndex(this.iteratorIndex);
        this.iteratorIndex++;
        return value;
    }

    removeAllIdsAfterIteratorIndex() {
        Debug.Log (`Removing ${this.ids.length - this.iteratorIndex} ids after iterator index ${this.iteratorIndex}`)
        while (this.ids.length > this.iteratorIndex) {
            this.removeId(this.ids[this.iteratorIndex]);
        }
    }
    
    getIdAtIndex(index) {
        return this.ids[index];
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

    addAttributeMods(attributeHandler, fieldNames, showDebug) {
        let repeater = this;
        
        if (fieldNames == undefined) {
            fieldNames = this.fieldNames;
        }

        if (!Array.isArray(fieldNames)) {
            fieldNames = [fieldNames];
        }
        let debugOutput = "";
        this.iterate(function (id) {
            for (let i = 0; i < fieldNames.length; i++) {
                let fieldName = repeater.getFieldName(id, fieldNames[i])
                attributeHandler.addMod(fieldName);
                if (showDebug) {
                    debugOutput += `${fieldName}, `;
                }
            }
        });
        if (showDebug) {
            Debug.Log(`Adding the following mods: ${debugOutput}`);
        }
    }

    getIdFromFieldName(fieldName) {
        return fieldName.split("_")[2];
    }

    removeId(id) {
        const index = this.ids.indexOf(id);
        if (index !== -1) {
            this.ids.splice(index, 1);
        }
    }

    removeAllIds(debugName) {
        while (this.ids.length > 0) {
            if (debugName != undefined) {
                Debug.Log(`[${debugName}] Removed ${this.ids[0]}`);
            }
            this.removeId(this.ids[0]);
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
        if (this.keys == undefined) {
            return 0;
        }
        let points = 0;
        for (let i = 0; i < this.keys.length; i++) {
            let val = this.values[this.keys[i]];
            if (val.value == "on") {
                points++;
            } else {
                points += isNaN(parseInt(val.value)) ? 0 : parseInt(val.value);
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
        RollTemplateTraits: rollTemplateTraits,
        GetDamageString: getDamageString,
        GetPrerequisiteString: getPrerequisiteString,
        GetActionEffects: getActionEffects
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

        numberToWord = function (num) {
            const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];
    
            if (Number.isInteger(num) && num >= 0 && num <= 6) {
                return words[num];
            } else {
                return num;
            }
        },
        
        getDefinitionName = function (baseDefinitionName, definitionName) {
            if (baseDefinitionName == undefined || baseDefinitionName == "") {
                return definitionName;
            }
            return `${WuxDef.GetAbbreviation(baseDefinitionName)}_${definitionName}`;

        },

        getLevelPrerequisites = function (tier) {
        switch (tier) {
            case 1:
                return 0;
            case 2:
                return 4;
            case 3:
                return 9;
            case 4:
                return 15;
            case 5:
                return 22;
            case 6:
                return 30;
            case 7:
                return 39;
            case 8:
                return 49;
            case 9:
                return 60;
            default:
                return 0;
        }
    },

        printIcons = function(current, max, filledIcon, emptyIcon) {
            let output = "";
            if (max == 0) {
                output += emptyIcon;
            }
            else {
                for (let i = 0; i < max; i++) {
                    output += i < current ? filledIcon : emptyIcon;
                }
            }
            return output;
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
            return `[${message}](#" class="showtip" title="${sanitizeSheetRoll(tooltip)})`;
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
        NumberToWord: numberToWord,
        GetDefinitionName: getDefinitionName,
        GetLevelPrerequisites: getLevelPrerequisites,
        PrintIcons: printIcons,
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

class WuxingHumanCharacterGenerator {
    constructor() {
        this.character = this.getBlankCharacter();
    }

    getBlankCharacter() {
        return {
            firstName: "",
            fullName: "",
            homeRegion: "",
            ancestry: "",
            gender: "",
            personality: "",
            motivation: ""
        };
    }
    
    generateCharacter() {
        if (this.character.ancestry == "" || this.character.ancestry == "0") {
            if (this.character.homeRegion == "" || this.character.homeRegion == "0") {
                this.generateRandomHomeRegion();
            }
            this.generateAncestryFromHomeRegion();
        }
        else if (this.character.homeRegion == "" || this.character.homeRegion == "0") {
            this.generateHomeRegionFromAncestry();
        }
        if (this.character.gender == "" || this.character.gender == "0") {
            this.generateGender();
        }
        if (this.character.firstName == "" || this.character.fullName == "") {
            this.generateName();
        }
        
        this.generateRandomPersonality();
        this.generateRandomMotivation();
    }
    
    generateRandom(groupName) {
        let filter = WuxDef.Filter(new DatabaseFilterData("group", groupName));
        let rnd = Math.floor(Math.random() * filter.length);
        if (rnd > filter.length) {
            rnd = 0;
        }
        return filter[rnd].getTitle();
    }

    generateRandomHomeRegion() {
        this.character.homeRegion = this.generateRandom("RegionType");
    }

    generateHomeRegionFromAncestry() {
        this.character.homeRegion = WuxNames.GetRegionByAncestry(this.character.ancestry);
    }
    
    generateAncestryFromHomeRegion() {
        this.character.ancestry = WuxNames.GetAncestryByRegion(this.character.homeRegion);
    }
    
    generateGender() {
        let options = ["Male", "Female"];
        let rnd = Math.floor(Math.random() * options.length);
        if (rnd >= options.length) {
            rnd = 0;
        }
        this.character.gender = options[rnd];
    }
    
    generateName() {
        if (this.character.firstName.trim() == "") {
            this.character.firstName = WuxNames.GetName(this.character.homeRegion, this.character.gender);
        }
        if (this.character.fullName.trim() == "") {
            this.character.fullName += `${this.character.firstName} `;
            if (this.character.homeRegion == "Aridsha") {
                this.character.fullName += `${WuxNames.GetName(this.character.homeRegion, "Family")}-`;
            }
            this.character.fullName += `${WuxNames.GetName(this.character.homeRegion, "Family")}`;
        }
    }

    generateRandomPersonality() {
        this.character.personality = this.generateRandom("PersonalityType");
    }

    generateRandomMotivation() {
        this.character.motivation = this.generateRandom("MotivationType");
    }
}

