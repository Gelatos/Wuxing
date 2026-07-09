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

    clean(validKeys) {
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
        let filters = ["style", "group", "affinity", "tier", "action", "skill", "keywords", "rangeType", "damageTypes", "coreDefense"];
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
                        let tag = groups[i].trim();
                        if (tag != "") {
                            this.addSortingGroup("group", tag, value);
                            // Trait_* tags embedded in the group field (e.g. Social/Support/Utility
                            // keyword traits) are the same concept as forms/impacts/itemTraits keywords
                            // below, just carried on a different field. Index them alongside those so
                            // keyword filters find techniques regardless of which field tagged them.
                            if (tag.indexOf("Trait_") == 0) {
                                this.addSortingGroup("keywords", tag, value);
                            }
                        }
                    }
                }
                else {
                    this.addSortingGroup("group", value.group, value);
                    if (value.group.indexOf("Trait_") == 0) {
                        this.addSortingGroup("keywords", value.group, value);
                    }
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
            this.addSortingGroup("damageTypes", value.damageTypes[i].trim(), value);
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
        let filters = ["group", "category", "bulk", "traits", "commonTechniques", "goodsComponents"];
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
            else if (property == "traits") {
                if (value.traits.indexOf(";") >= 0) {
                    let groups = value.traits.split(";");
                    for (let i = 0; i < groups.length; i++) {
                        if (groups[i].trim() != "") {
                            this.addSortingGroup("traits", groups[i].trim(), value);
                        }
                    }
                }
                else {
                    this.addSortingGroup("traits", value.traits, value);
                }
            }
            else if (property == "goodsComponents") {
                const goodsTypes = value.getGoodsTypes ? value.getGoodsTypes(false) : [];
                for (let i = 0; i < goodsTypes.length; i++) {
                    this.addSortingGroup("goodsComponents", goodsTypes[i], value);
                }
            }
            else if (value != undefined && value.hasOwnProperty(property)) {
                this.addSortingGroup(property, value[property], value);
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
        if (value.modifiers.includes(WuxDef._gear)) {
            this.addSortingGroup("techMods", WuxDef._gear, value);
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

class ExtendedGoodsDatabase extends Database {

    constructor(data) {
        let filters = ["group", "location", "rarity"];
        let dataCreation = function (data) {
            return new GoodsData(data);
        };
        super(data, filters, dataCreation);
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
            else if (property == "location") {
                if (value.location.indexOf(";") >= 0) {
                    let groups = value.location.split(";");
                    for (let i = 0; i < groups.length; i++) {
                        if (groups[i].trim() != "") {
                            this.addSortingGroup("location", groups[i].trim(), value);
                        }
                    }
                }
                else {
                    this.addSortingGroup("location", value.location, value);
                }
            }
            else if (value != undefined && value.hasOwnProperty(property)) {
                this.addSortingGroup(property, value[property], value);
            }
        }
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
        let baseVersionValue = 3;
        
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
                this.rangeType = `TechFilterType_RangeLong${targetingStyle}`;
            }
            return;
        }
        if (rangeParts[0] == "" || rangeParts[0] == "Self" || this.target == "Self") {
            this.rangeType = "TechFilterType_RangeSelf";
            return;
        }
        if (shortRange == 1) {
            if (longRange >= 2) {
                this.rangeType = `TechFilterType_RangeClose${targetingStyle}`;
                return;
            }
            this.rangeType = "TechFilterType_RangeMelee";
            return;
        }
        if (longRange > 2) {
            this.rangeType = `TechFilterType_RangeShort${targetingStyle}`;
            return;
        }

        this.rangeType = "TechFilterType_RangeSpecial";
    }
    getTargetingStyle() {
        let singleTargetTypes = ["Targets", "Objects", "Targets or Self", "Target", "Object", "Space", "Self", "Target or Self"];
        if (singleTargetTypes.includes(this.target)) {
            return "";
        }
        
        return "Area";
    }

    setRank(rank) {
        this.rank = rank;
    }
    getMaxRank(cr) {
        let cap = 2 + cr - this.en;
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
        this.focus = json.focus === true;
        this.item = json.item || "";
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.en = "" + dataArray[i];
        i++;
        this.will = "" + dataArray[i];
        i++;
        this.focus = dataArray[i] === true || dataArray[i] === "true";
        i++;
        this.item = dataArray[i] ? "" + dataArray[i] : "";
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.en = 0;
        this.will = 0;
        this.focus = false;
        this.item = "";
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

class PerkData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.cost = json.cost;
        this.increase = json.increase;
        this.maxRank = new FormulaData(json.maxRank);
        this.statVariable = json.statVariable;
        this.descriptions = [json.description];
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.cost = parseInt(dataArray[i]);
        i++;
        this.increase = parseInt(dataArray[i]);
        i++;
        this.maxRank = new FormulaData("" + dataArray[i]);
        i++;
        this.statVariable = "" + dataArray[i];
        i++;
        this.descriptions = ["" + dataArray[i]];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.cost = 0;
        this.increase = 0;
        this.maxRank = new FormulaData();
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
        this.quickDescription = json.quickDescription;
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
        this.quickDescription = "" + dataArray[i];
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
        this.descriptions = [""];
        this.quickDescription = "";
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
        this.role = "";
        this.subRole = "";
        this.difficulty = 0;
        this.skills = "";
        this.techniques = [];
    }

    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.role = json.role;
        this.subRole = json.subRole;
        this.difficulty = json.difficulty;
        this.skills = json.skills;
        this.descriptions = json.descriptions;
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
        this.role = "" + dataArray[i];
        i++;
        this.subRole = "" + dataArray[i];
        i++;
        this.difficulty = parseInt(dataArray[i]);
        this.difficulty = isNaN(this.difficulty) ? 0 : this.difficulty;
        i++;
        this.skills = "" + dataArray[i];
        i++;
        this.descriptions = [("" + dataArray[i])];
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
        style.subGroup = this.role;
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
        this.presetStatus = json.presetStatus;
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
        this.presetStatus = ("" + dataArray[i]) != "";
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
        this.presetStatus = false;
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
        definition.presetStatus = this.presetStatus;
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
        let techData = [this.name, "Gear", "", ("" + dataArray[i]), "", 2];
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

    getGoodsTypes(includeGoodsCat = true) {
        if (!this.components) return [];
        const types = [];
        this.components.split(";").forEach(function (part) {
            part = part.trim();
            if (!part) return;
            const spaceIdx = part.indexOf(" ");
            if (spaceIdx === -1) return;
            const typeAndName = part.substring(spaceIdx + 1).split("_");
            const type = typeAndName[0];
            const name = typeAndName[1];
            if (type === "Goods" || (includeGoodsCat && type === "GoodsCat")) {
                if (name) {
                    const goods = WuxGoods.Get(name);
                    if (goods && types.indexOf(goods.name) === -1) {
                        types.push(goods.name);
                    }
                }
            }
        });
        return types;
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
            mod = ["", ""];
        }
        else if (mod1 != undefined) {
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
        this.presetStatus = json.presetStatus;
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
            case "presetStatus":
                this.presetStatus = value.toLowerCase() == "true";
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
        this.presetStatus = false;
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
        this.itemName = "";

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
            if (this.enCost > 0 || this.willCost > 0 || this.technique.limits == "Focus" || this.itemName != "") {
                let consumeData = new TechniqueResources([this.technique.name, this.enCost, this.willCost, this.technique.limits == "Focus", this.itemName]);
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
            case "Surge":
                if (this.effectType != "Surge") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(WuxDef.Get("Surge"));
                }
                this.formatSurgeEffect(effect);
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
            case "CallAssist":
                if (this.effectType != "CallAssist") {
                    this.effectType = effect.type;
                }
                this.formatCallAssistEffect(effect);
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
            case "Overdose":
                let statusEffect = WuxDef.Get("Stat_Dazed");
                if (this.effectType != "Overdose") {
                    this.effectType = effect.type;
                    this.addDefintionToEffectDescription(statusEffect);
                }
                this.formatOverdoseEffect(statusEffect, technique);
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

    formatSurgeEffect(effect) {
        let surge = WuxDef.GetTitle("Surge");
        switch (effect.subType) {
            case "Heal":
                this.effectDescription += `${this.formatTargetGain(effect)} ${this.formatCalcBonus(effect)} ${surge}`;
                return;
            default:
                this.effectDescription += `${this.formatTargetLose(effect)} ${this.formatCalcBonus(effect)} ${surge}`;
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
                this.effectDescription += "A related influence is revealed to you.";
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

    formatCallAssistEffect() {
        this.effectDescription += `The target may use an Assist action`;
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
                this.effectDescription += `You create ${count} ${effect.effect} at the targeted space(s). `;
                if (count > 1) {
                    this.effectDescription += `Each object must be within range of this technique. `;
                }
                return;
            case "Dimensions":
                this.effectDescription += `${effect.effect} `;
                return;
            case "HP":
                this.effectDescription += `Each ${effect.effect} has ${count} ${WuxDef.GetTitle("HP")}. `;
                return;
            case "Armor":
                this.effectDescription += `Each ${effect.effect} has ${count} ${WuxDef.GetTitle("Cmb_Armor")}. `;
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
                let jumpHeight = parseInt(effect.effect);
                if (!isNaN(jumpHeight) && jumpHeight != 0) {
                    jump += `${jumpHeight} space${jumpHeight > 1 ? "s" : ""} high`;
                } 
                let calc = this.formatCalcBonus(effect);
                if (calc > 0) {
                    if (jump != "") {
                        jump += " and ";
                    }
                    jump += `${calc} space${calc > 1 ? "s" : ""} wide`;
                }
                this.effectDescription += `${this.formatTargetJump(effect)} ${jump}`;
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

    formatOverdoseEffect(statusEffect, technique) {
        return `If the target has already consumed ${Format.IndefiniteArticle(technique.name)} ${technique.name} since their last Brief Rest, they gain the ${statusEffect.name} status at the start of next round.`;
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

    formatTargetJump(effect) {
        return this.formatTarget(effect, " jumps", " jump");
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
            formulaString = `Something went wrong: ${JSON.stringify(e)}`;
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
            effect.formula = new FormulaData(enhanceEffect.formula);

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
                this.effectDescription += `Increase Free Move distance by ${bonus} space${bonus > 1 ? "s" : ""}`;
                return;
            case "Pushed":
                this.effectDescription += `Increase Pushed distance by ${bonus} space${bonus > 1 ? "s" : ""}`;
                return;
            case "Pulled":
                this.effectDescription += `Increase Pulled distance by ${bonus} space${bonus > 1 ? "s" : ""}`;
                return;
            case "ForceMove":
                this.effectDescription += `Increase Force Move distance by ${bonus} space${bonus > 1 ? "s" : ""}`;
                return;
            case "Sneak":
                this.effectDescription += `Increase Sneak movement by ${bonus} space${bonus > 1 ? "s" : ""}`;
                return;
            case "Teleport":
                this.effectDescription += `Increase teleport distance by ${bonus} space${bonus > 1 ? "s" : ""}`;
                return;
            case "Jump":
                let jump = "";
                let jumpHeight = parseInt(effect.effect);
                if (!isNaN(jumpHeight) && jumpHeight != 0) {
                    jump += `${jumpHeight} space${jumpHeight > 1 ? "s" : ""} high`;
                }
                if (bonus > 0) {
                    if (jump != "") {
                        jump += " and ";
                    }
                    jump += `${bonus} space${bonus > 1 ? "s" : ""} wide`;
                }
                
                this.effectDescription += `Increase jump distance by ${jump}`;
                return;
            case "Charge":
                this.effectDescription += `Increase Move Charge by ${bonus}`;
                return;
            case "Temporal":
                this.effectDescription += `Increase Temporal Movement Actions by ${bonus}`;
                return;
            default:
                this.effectDescription += `Increase movement by ${bonus} space${bonus > 1 ? "s" : ""}`;
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
            formulaString = `Something went wrong: ${e}`;
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
            case "Surge":
                this.formatSurgeEffect(effect);
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
            formulaString = `Something went wrong: ${e}`;
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
        
        components = components.split(setDelimiter).map(c => c.trim());

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
                case "Item":
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
        if (!this.item.skill) return;
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

    getBaseString() {
        let output = "";
        this.workers.forEach((worker) => {
            if (worker.variableName.length > 0 && worker.definitionName.length === 0) return;
            if (worker.definitionName.length > 0) {
                let definition = WuxDef.Get(worker.definitionName[0]);
                if (definition != undefined) {
                    if (output != "") {
                        output += " + ";
                    }
                    if (definition.group == "StatBonus") {
                        output += `${definition.formula.getBaseString()} `;
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
            } 
            else if (worker.value > 0) {
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
        let output = `${this.displayName} [CR${this.cr}] ${this.affinity == 0 ? "" : ` ${this.affinity}`} ${this.job}`;
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
        let defParts = [];
        if (this.evasion != 0) defParts.push(`${WuxDef.GetAbbreviation("Def_Evasion")}${this.evasion}`);
        if (this.brace != 0) defParts.push(`${WuxDef.GetAbbreviation("Def_Brace")}${this.brace}`);
        if (this.warding != 0) defParts.push(`${WuxDef.GetAbbreviation("Def_Warding")}${this.warding}`);
        if (this.reflex != 0) defParts.push(`${WuxDef.GetAbbreviation("Def_Reflex")}${this.reflex}`);
        let output = defParts.length > 0 ? `Defs:${defParts.join(";.")}` : "";
        
        let senseParts = [];
        if (this.resolve != 0) senseParts.push(`${WuxDef.GetAbbreviation("Def_Resolve")}${this.resolve}`);
        if (this.insight != 0) senseParts.push(`${WuxDef.GetAbbreviation("Def_Insight")}${this.insight}`);
        if (this.logic != 0) senseParts.push(`${WuxDef.GetAbbreviation("Def_Logic")}${this.logic}`);
        if (senseParts.length > 0) {
            output += ` Sens:${senseParts.join(";.")}`;
        }

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
            let e, f;
            a = c;
            for (e = new Array(8), f = 7; 0 <= f; f--) {
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
        return this.generateUUID()().replace(/_/g, "Z");
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
        this.value = json.value;
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
        },

        indefiniteArticle = function (word) {
            if (!word) return "a";
            const vowelSoundExceptions = ["hour", "heir", "honest", "honor", "herb"];
            const consonantSoundExceptions = ["uni", "use", "eu", "ewe", "one", "once"];
            let lower = word.toLowerCase();
            for (let ex of vowelSoundExceptions) {
                if (lower.startsWith(ex)) return "an";
            }
            for (let ex of consonantSoundExceptions) {
                if (lower.startsWith(ex)) return "a";
            }
            return /^[aeiou]/i.test(word) ? "an" : "a";
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
        SanitizeSheetRollAction: sanitizeSheetRollAction,
        IndefiniteArticle: indefiniteArticle
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

class BaseFilteredDefinitions {
    constructor(baseDefinitionName) {
        this.baseDefinition = WuxDef.Get(baseDefinitionName);
        this.definitionDatabase = {};
        this.initializeDatabase();
    }

    initializeDatabase() {}
    
    getKeys() {
        return Object.keys(this.definitionDatabase);
    }
    getDefinitions(key) {
        if (this.definitionDatabase[key] == undefined) {
            return [];
        }
        return this.definitionDatabase[key];
    }
    getAllDefinitions() {
        let definitions = [];
        let keys = this.getKeys();
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            definitions = definitions.concat(this.definitionDatabase[key]);
        }
        return definitions;
    }

    getCompoundVariable (attributeDefinition, suffix) {
        if (this.baseDefinition == undefined) {
            return attributeDefinition.getVariable(suffix);
        }
        return this.baseDefinition.getVariable(`-${attributeDefinition.getVariable(suffix)}`);
    }
    getCompoundAttribute (attributeDefinition, suffix) {
        if (this.baseDefinition == undefined) {
            return attributeDefinition.getVariable(suffix);
        }
        return this.baseDefinition.getAttribute(`-${attributeDefinition.getVariable(suffix)}`);
    }

    getVariables(key, suffix) {
        let output = [];
        this.getDefinitions(key).forEach(definition => {
            output.push(this.getCompoundVariable(definition, suffix));
        });
        return output;
    }
    getAllVariables(suffix) {
        let output = [];
        this.getAllDefinitions().forEach(definition => {
            output.push(this.getCompoundVariable(definition, suffix));
        });
        return output;
    }
    getAttributes(key, suffix) {
        let output = [];
        this.getDefinitions(key).forEach(definition => {
            output.push(this.getCompoundAttribute(definition, suffix));
        });
        return output;
    }
}

class TechniqueFilterDefinitions extends BaseFilteredDefinitions{
    constructor(baseDefinitionName) {
        super(baseDefinitionName);
    }

    initializeDatabase() {
        this.definitionDatabase = {};
        let baseGroupFilters = WuxDef.Filter([
            new DatabaseFilterData("group", "TechFilterType"),
            new DatabaseFilterData("subGroup", "BaseGroup")]);
        for (let i = 0; i < baseGroupFilters.length; i++) {
            this.definitionDatabase[baseGroupFilters[i].name] = WuxDef.Filter([
                new DatabaseFilterData("group", "TechFilterType"),
                new DatabaseFilterData("subGroup", baseGroupFilters[i].getTitle())]);
        }
        this.definitionDatabase["TechFilterType_CombatKeywords"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Trait"),
            new DatabaseFilterData("subGroup", "Combat Keyword")
        ]);
        this.definitionDatabase["TechFilterType_SocialKeywords"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Trait"),
            new DatabaseFilterData("subGroup", "Social Keyword")
        ]);
        this.definitionDatabase["TechFilterType_SupportKeywords"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Trait"),
            new DatabaseFilterData("subGroup", "Support Keyword")
        ]);
        this.definitionDatabase["TechFilterType_UtilityKeywords"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Trait"),
            new DatabaseFilterData("subGroup", "Utility Keyword")
        ]);
        this.definitionDatabase["TechFilterType_Defense"] = WuxDef.Filter(
            new DatabaseFilterData("group", ["Defense", "Sense"]));
        this.definitionDatabase["TechFilterType_DamageType"] = WuxDef.Filter(
            new DatabaseFilterData("group", "DamageType"));

        let statusDefinitions = WuxDef.Filter(
            new DatabaseFilterData("group", "Status"));
        statusDefinitions = statusDefinitions.filter(item => item.canBeFiltered);
        this.definitionDatabase["TechFilterType_StatusGood"] = statusDefinitions.filter(item => item.isBeneficial);
        this.definitionDatabase["TechFilterType_StatusBad"] = statusDefinitions.filter(item => !item.isBeneficial);

        this.definitionDatabase["TechFilterType_WeaponKeywords"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Trait"),
            new DatabaseFilterData("subGroup", ["Martial Trait", "Aim Trait"])
        ]);
        // Only offer skills that at least one technique actually uses as its skill field -
        // any other Skill definition can never match a WuxTechs filter, so it's a dead checkbox.
        let filterableSkillTitles = WuxTechs.GetSortedGroupKeys("skill");
        let isFilterableSkill = skill => filterableSkillTitles.includes(skill.title);
        this.definitionDatabase["TechFilterType_AthleticSkills"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Skill"),
            new DatabaseFilterData("subGroup", ["Athletics"])
        ]).filter(isFilterableSkill);
        this.definitionDatabase["TechFilterType_MagicSkills"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Skill"),
            new DatabaseFilterData("subGroup", ["Magic"])
        ]).filter(isFilterableSkill);
        this.definitionDatabase["TechFilterType_SocialSkills"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Skill"),
            new DatabaseFilterData("subGroup", ["Persuade", "Cunning"])
        ]).filter(isFilterableSkill);
        this.definitionDatabase["TechFilterType_WorldSkills"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Skill"),
            new DatabaseFilterData("subGroup", ["Perception", "Device", "Craft"])
        ]).filter(isFilterableSkill);
        
    }
}

class EquipmentFilterDefinitions extends BaseFilteredDefinitions{
    constructor(baseDefinitionName) {
        super(baseDefinitionName);
    }

    initializeDatabase() {
        this.definitionDatabase = {};
        let baseGroupFilters = WuxDef.Filter([
            new DatabaseFilterData("group", "EquipmentFilterType"),
            new DatabaseFilterData("subGroup", "BaseGroup")]);
        for (let i = 0; i < baseGroupFilters.length; i++) {
            this.definitionDatabase[baseGroupFilters[i].name] = WuxDef.Filter([
                new DatabaseFilterData("group", "EquipmentFilterType"),
                new DatabaseFilterData("subGroup", baseGroupFilters[i].getTitle())]);
        }
        this.definitionDatabase["EquipFilter_WeaponKeywords"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Trait"),
            new DatabaseFilterData("subGroup", ["Martial Trait", "Aim Trait"])
        ]);
        this.definitionDatabase["EquipFilter_ToolKeywords"] = WuxDef.Filter([
            new DatabaseFilterData("group", "Trait"),
            new DatabaseFilterData("subGroup", "Tool Trait")
        ]);

    }
}

// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection
// noinspection ES6ConvertVarToLetConst

var Debug = Debug || (function () {
    'use strict';
    const log = function (msg) {
            Logger.log(msg);
        },
        logError = function (msg) {
            Logger.log(`ERROR! ${msg}`);
        };

    return {
        Log: log,
        LogError: logError
    };
}());

function SplitLargeEntry(output, splitCharacter, fallbackSplitCharacter) {
    if (splitCharacter == undefined) {
        splitCharacter = "\n";
    }

    let outputArray = [];
    let splitString = "";
    let splitIndex = 0;
    if (output.length > 50000) {
        while (output.length > 0) {
            if (output.length > 50000) {
                splitString = output.substring(0, 50000);

                if (splitCharacter != "") {
                    let activeSplitCharacter = splitCharacter;
                    let triedFallback = false;
                    let foundSplit = false;
                    while (!foundSplit) {
                        let matchIndex = splitString.lastIndexOf(activeSplitCharacter);
                        if (matchIndex !== -1) {
                            splitIndex = matchIndex + activeSplitCharacter.length;
                            // A raw quote in valid JSON output can only be a real string delimiter
                            // (embedded quotes are always escaped), so this check only applies to
                            // splitters that don't already end the match on a quote themselves.
                            let landsInsideQuotedText = !activeSplitCharacter.includes(`"`)
                                && splitString.substring(splitIndex, splitIndex + 1).includes(`"`);
                            if (landsInsideQuotedText) {
                                splitString = splitString.substring(0, splitIndex - 1 - activeSplitCharacter.length);
                            }
                            else {
                                foundSplit = true;
                            }
                        }
                        // The active splitter never found a safe occurrence in this window — retry
                        // the same window with the fallback splitter before resorting to a hard cut.
                        else if (!triedFallback && fallbackSplitCharacter != undefined && fallbackSplitCharacter !== "" && fallbackSplitCharacter !== activeSplitCharacter) {
                            triedFallback = true;
                            activeSplitCharacter = fallbackSplitCharacter;
                            splitString = output.substring(0, 50000);
                        }
                        else {
                            splitIndex = 50000 - activeSplitCharacter.length;
                            foundSplit = true;
                        }
                    }
                    splitString = output.substring(0, splitIndex);
                    output = output.substring(splitIndex);
                }
                else {
                    output = output.substring(50000);
                }
                outputArray.push(splitString);
            }
            else {
                outputArray.push(output.substring(0));
                output = "";
            }
        }
    }
    else
    {
        outputArray[0] = output;
    }
    return outputArray;
}

function ColumnToLetter(col) {
    let letter = "";
    while (col > 0) {
        letter = String.fromCharCode((col - 1) % 26 + 65) + letter;
        col = Math.floor((col - 1) / 26);
    }
    return letter;
}

function Test() {
    return JSON.stringify(WuxDef.Get("Tech_Overhead Chop").jsonData);
    // let data = new DefinitionData(definitionArray[0]);
    // return JSON.stringify(data);
    // return PrintLargeEntry(DisplayTechniquesSheet.PrintTest(SheetsDatabase.CreateStyles(stylesArray), SheetsDatabase.CreateTechniques(JSON.parse(techniqueDatabaseString))), "t");
}

function ConcatSheetsDatabase(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9) {
    if (arr1 != undefined) {
        arr0 = arr0.concat(arr1);
    }
    if (arr2 != undefined) {
        arr0 = arr0.concat(arr2);
    }
    if (arr3 != undefined) {
        arr0 = arr0.concat(arr3);
    }
    if (arr4 != undefined) {
        arr0 = arr0.concat(arr4);
    }
    if (arr5 != undefined) {
        arr0 = arr0.concat(arr5);
    }
    if (arr6 != undefined) {
        arr0 = arr0.concat(arr6);
    }
    if (arr7 != undefined) {
        arr0 = arr0.concat(arr7);
    }
    if (arr8 != undefined) {
        arr0 = arr0.concat(arr8);
    }
    if (arr9 != undefined) {
        arr0 = arr0.concat(arr9);
    }
    return arr0;
}

var NameDatabase = NameDatabase || (function () {
    const setNameData = function (data) {
        return {
            name: "" + data[0],
            region: "" + data[1],
            type: "" + data[2]
        }
    }

    const dataOdds = function (name, odds) {
        return {name: name, odds: odds};
    }

    const importNameDatabase = function (arr) {
        if (arr == undefined || arr.length == 0) {
            return {};
        }
        let nameDatabase = {};
        for (let i = 0; i < arr.length; i++) {
            let nameData = setNameData(arr[i]);
            if (!nameDatabase.hasOwnProperty(nameData.region)) {
                nameDatabase[nameData.region] = {};
            }
            if (!nameDatabase[nameData.region].hasOwnProperty(nameData.type)) {
                nameDatabase[nameData.region][nameData.type] = [];
            }
            nameDatabase[nameData.region][nameData.type].push(nameData.name);
        }
        return nameDatabase;
    }

    const importRegionDatabase = function (arr) {
        let regionDatabase = {
            region: {},
            ancestry: {}
        };
        if (arr == undefined || arr.length == 0) {
            return regionDatabase;
        }

        // create a list of the races
        let races = {};
        let maxY = 0;
        let racesRow = arr[0];
        for (let i = 1; i < racesRow.length; i++) {
            if (racesRow[i] == "") {
                maxY = i;
                break;
            }
            races[i] = "" + racesRow[i];
        }

        for (let x = 1; x < arr.length; x++) {
            let region = "" + arr[x][0];
            for (let y = 1; y < maxY; y++) {
                let odds = parseInt("" + arr[x][y]);
                if (!isNaN(odds) && odds != 0) {
                    if (!regionDatabase.region.hasOwnProperty(region)) {
                        regionDatabase.region[region] = {options: [], total: 0};
                    }
                    if (!regionDatabase.ancestry.hasOwnProperty(races[y])) {
                        regionDatabase.ancestry[races[y]] = {options: [], total: 0};
                    }
                    regionDatabase.region[region].options.push(new dataOdds(races[y], odds));
                    regionDatabase.region[region].total += odds;
                    regionDatabase.ancestry[races[y]].options.push(new dataOdds(region, odds));
                    regionDatabase.ancestry[races[y]].total += odds;
                }
            }
        }
        return regionDatabase;
    }

    'use strict';

    const create = function (nameArr, regionArr) {
            let dataClass = new JavascriptDataClass();
            let nameDatabase = importNameDatabase(nameArr);
            let regionDatabase = importRegionDatabase(regionArr);

            dataClass.addPublicVariable("nameDatabase", dataClass.formatJsonForDatabase(nameDatabase));
            dataClass.addPublicVariable("regionDatabase", dataClass.formatJsonForDatabase(regionDatabase));

            dataClass.addPublicFunction("getName", getName);
            dataClass.addPublicFunction("getRegionByAncestry", getRegionByAncestry);
            dataClass.addPublicFunction("getAncestryByRegion", getAncestryByRegion);
            return dataClass;
        },

        getName = function (region, type) {
            switch (region) {
                case "East Sea":
                    region = "Walthair";
                    break;
                case "Dowfeng":
                    region = "Aridsha";
                    break;
                case "Wayling":
                    region = "Ceres";
                    break;
            }
            if (type != "Family" && type != "Male" && type != "Female") {
                if (Math.random() > 0.5) {
                    type = "Male";
                }
                else {
                    type = "Female";
                }
            }
            let database = nameDatabase[region][type];
            if (database == undefined || database.length == 0) {
                return "";
            }
            let index = Math.floor(Math.random() * database.length);
            return database[index];
        },

        getRegionByAncestry = function (ancestry) {
            let database = regionDatabase.ancestry[ancestry];
            if (database == undefined || database.options.length == 0) {
                return "";
            }
            let index = Math.floor(Math.random() * database.total);
            for (let i = 0; i < database.options.length; i++) {
                index -= database.options[i].odds;
                if (index < 0) {
                    return database.options[i].name;
                }
            }
        },

        getAncestryByRegion = function (region) {
            let database = regionDatabase.region[region];
            if (database == undefined || database.options.length == 0) {
                return "";
            }
            let index = Math.floor(Math.random() * database.total);
            for (let i = 0; i < database.options.length; i++) {
                index -= database.options[i].odds;
                if (index < 0) {
                    return database.options[i].name;
                }
            }
        }

    return {
        Create: create,
        GetName: getName
    };
}());

var SheetsDatabase = SheetsDatabase || (function () {
    const createTechniques = function (arr) {
        return new ExtendedTechniqueDatabase(arr);
    };
    const createSkills = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new SkillData(arr)}, ["group", "subGroup"]);
    };
    const createStyles = function (arr) {
        return new ExtendedTechniqueStyleDatabase(arr);
    };
    const createBasicPerks = function (arr) {
        return new WuxDataDatabase(arr, arr => { return new PerkData(arr); }, ["group", "cost"]);
    };
    const createLanguages = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new LanguageData(arr)}, ["group", "location"]);
    };
    const createLores = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new LoreData(arr)});
    };
    const createJobs = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new JobData(arr)}, ["group", "difficulty"]);
    };
    const createGoods = function (arr) {
        return new ExtendedGoodsDatabase(arr);
    };
    const createGear = function (arr) {
        return new ExtendedUsableItemDatabase(arr, function (data) {
            let item = new UsableItemData(data);
            let valueAssessment = new GearValueAssessment(item);
            item.value = valueAssessment.assessment;
            return item;
        });

    };
    const createConsumables = function (arr) {
        return new ExtendedUsableItemDatabase(arr, function (data) {
            let item = new UsableItemData(data);
            let valueAssessment = new GearValueAssessment(item);
            item.value = valueAssessment.assessment;
            return item;
        });
    };
    'use strict';

    const createDatabaseCollection = function (stylesArray, skillsArray, languageArray, loreArray, jobsArray, techniqueArray, goodsArray, gearArray, consumablesArray) {

            let techDb = createTechniques(techniqueArray);
            return {
                techniques: techDb,
                styles: createStyles(stylesArray, techDb),
                skills: createSkills(skillsArray),
                language: createLanguages(languageArray),
                lore: createLores(loreArray),
                job: createJobs(jobsArray),
                goods: createGoods(goodsArray),
                gear: createGear(gearArray),
                consumables: createConsumables(consumablesArray)
            }
        },

        createStatus = function (arr) {
            return new Database(arr, ["group"], function (arr) {
                return new StatusData(arr);
            });
        },

        createDefinitionTypes = function (arr) {
            return new ExtendedDefinitionDatabase(arr);
        }
    ;
    return {
        CreateDatabaseCollection: createDatabaseCollection,
        CreateTechniques: createTechniques,
        CreateStyles: createStyles,
        CreateSkills: createSkills,
        CreateLanguages: createLanguages,
        CreateLores: createLores,
        CreateJobs: createJobs,
        CreateStatus: createStatus,
        CreateGoods: createGoods,
        CreateGear: createGear,
        CreateConsumables: createConsumables,
        CreateDefinitionTypes: createDefinitionTypes,
        CreateBasicPerks: createBasicPerks
    }
}());

class SheetDatabaseObject {
    constructor(ss) {
        this.ss = ss;
        this.filterSheet = this.ss.getSheetByName("Filter");
        this.filterCells = this.filterSheet.getRange("A1");
        this.techniques;
        this.styles;
        this.skills;
        this.language;
        this.lore;
        this.job;
        this.goods;
        this.gear;
        this.consumables;
        this.status;
        this.basicPerks;
    }

    readDatabase(sheetName, startRow) {
        let sheet = this.ss.getSheetByName(sheetName);
        let lastColLetter = ColumnToLetter(sheet.getLastColumn());
        return this.readFilteredThenClear(
            `=FILTER(${sheetName}!A${startRow}:${lastColLetter}, NOT(${sheetName}!A${startRow}:A=""))`, lastColLetter);
    }

    readFilteredThenClear(filter, columnRange) {
        this.filterCells.setFormula(filter);

        // 2. Flush so the formula calculates before reading
        SpreadsheetApp.flush();

        // 3. Get the filtered values
        const lastRow = this.filterSheet.getLastRow();
        const filteredData = this.filterSheet
            .getRange(`A1:${columnRange}${lastRow}`)
            .getValues()
            .filter(row => row.some(cell => cell !== ""));

        // 4. Clear the temporary range (formula + results)
        this.filterSheet.getRange(`A1:${columnRange}${lastRow}`).clearContent();

        return filteredData;
    }
    
    getChangedVersionRows(sheetName, startRow) {
        let sheet = this.ss.getSheetByName(sheetName);
        let lastColLetter = "A";
        let versionColumnLetter = ColumnToLetter(getNamedColumn(sheet, "Version"));
        let filterRow = `${sheetName}!${versionColumnLetter}${startRow}:${versionColumnLetter}`;
        let filter = `=FILTER(ROW(${filterRow}), ${filterRow}="CHANGE")`;
        return this.readFilteredThenClear(filter, lastColLetter);
    }
    
    setTechniques() {
        this.techniques = SheetsDatabase.CreateTechniques(this.readDatabase("Techniques", 2));
    }
    setStyles() {
        this.styles = this.getStyles();
    }
    getStyles() {
        return SheetsDatabase.CreateStyles([]);
    }
    setSkills() {
        this.skills = SheetsDatabase.CreateSkills(this.readDatabase("Skills", 2));
    }
    setLanguage() {
        this.language = SheetsDatabase.CreateLanguages(this.readDatabase("Languages", 2));
    }
    setLore() {
        this.lore = SheetsDatabase.CreateLores(this.readDatabase("Lores", 2));
    }
    setJobs() {
        this.job = SheetsDatabase.CreateJobs(this.readDatabase("Jobs", 2));
    }
    setGear() {
        this.gear = this.getGear();
    }
    getGear() {
        return SheetsDatabase.CreateGear(this.readDatabase("Gear", 2));
    }
    setGoods() {
        this.goods = SheetsDatabase.CreateGoods(this.readDatabase("Goods", 2));
    }
    setConsumables() {
        this.consumables = SheetsDatabase.CreateConsumables(this.readDatabase("Consumables", 2));
    }
    setStatus() {
        this.status = SheetsDatabase.CreateStatus(this.readDatabase("Status", 2));
    }
    setBasicPerks() {
        this.basicPerks = SheetsDatabase.CreateBasicPerks(this.readDatabase("Perks", 2));
    }
}

class JavascriptDataClass {
    constructor() {
        this.variables = new Dictionary();
        this.functions = new Dictionary();
        this.publicData = new Dictionary();
    }

    addVariable(name, data) {
        this.variables.add(name, data);
    }

    addFunction(name, data) {
        this.functions.add(name, data);
    }

    addPublicData(name) {
        this.publicData.add(Format.ToUpperCamelCase(name), name);
    }

    addPublicVariable(name, data) {
        this.addVariable(name, data);
        this.addPublicData(name);
    }

    addPublicFunction(name, data) {
        this.addFunction(name, data);
        this.addPublicData(name);
    }

    createDatabase(customDataNames, customData) {
        let database = {};
        for (let i = 0; i < customData.length; i++) {
            database[customDataNames[i]] = customData[i];
        }
        return database;
    }

    formatJsonForDatabase(data) {
        let json = JSON.stringify(data);
        json = json.replace(/(},|],)/g, '$1\n');
        return json;
    }


    print(className) {
        return `var ${className} = ${className} || (function() {
            'use strict';

            var 
                ${this.printFormatVariables()}
            ;
            return {
                ${this.printFormatPublicData()}
            };
        }());
        `;
    }

    printFormatVariables() {
        let variables = this.printFormatClassData(this.variables, " = ");
        if (this.functions.keys.length > 0) {
            if (variables != "") {
                variables += `,
                
                `;
            }
            variables += this.printFormatClassData(this.functions, " = ");
        }
        return variables;
    }

    printFormatPublicData() {
        return this.printFormatClassData(this.publicData, ": ");
    }

    printFormatClassData(dictionary, delimiter) {
        let key = "";
        let data = "";
        for (let i = 0; i < dictionary.keys.length; i++) {
            key = dictionary.keys[i];
            if (data != "") {
                data += `,
            `;
            }
            data += `${key}${delimiter}${dictionary.get(key)}`;
        }
        return data;
    }
}

var JavascriptDatabase = JavascriptDatabase || (function () {
    const getKeys = function () {
        return keys;
    }
    const getValues = function (keyArray, delimiter, prefix) {
        if (keyArray == undefined || keyArray == "") {
            return [];
        }
        if (typeof keyArray == "string") {
            keyArray = keyArray.split(delimiter);
        }
        if (prefix == undefined) {
            prefix = "";
        }

        let output = [];
        let name = "";
        let keywords = []; 
        let definitionOutput;

        for (let i = 0; i < keyArray.length; i++) {
            name = `${prefix}${keyArray[i].trim()}`;
            keywords = name.split(":");

            definitionOutput = get(keywords[0].trim());
            if (definitionOutput != undefined) {
                if (keywords.length > 1) {
                    let subDefinition = get(keywords[1].trim());
                    if (subDefinition != undefined) {
                        definitionOutput.addSubDefinition(subDefinition);
                    }
                }
                output.push(definitionOutput);
            }
        }

        return output;
    };
    const has = function (key) {
        return keys.includes(key);
    };
    const iterate = function (callback) {
        for (let i = 0; i < keys.length; i++) {
            callback(values[keys[i]]);
        }
    };

    const filter = function (filterData) {
        if (!Array.isArray(filterData)) {
            filterData = [filterData];
        }

        let filteredGroup = getSortedData(filterData[0]);
        for (let i = 1; i < filterData.length; i++) {
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            let nextFilter = getSortedData(filterData[i]);
            if (nextFilter != undefined) {
                filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
            }
        }

        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return getGroupData(filteredGroup);
    }

    const getSortedData = function (filterData) {
        let filterOutput = getSortedGroup(filterData.property, filterData.value[0]);
        for (let i = 1; i < filterData.value.length; i++) {
            let nextFilter = getSortedGroup(filterData.property, filterData.value[i]);
            nextFilter.forEach(item => {
                if (!filterOutput.includes(item)) {
                    filterOutput.push(item);
                }
            });
        }
        return filterOutput;
    }
    
    const getSortedGroup = function (property, propertyValue, debug) {
        if (sortingGroups == undefined) {
            return [];
        }
        if (!sortingGroups.hasOwnProperty(property)) {
            if (debug != undefined) {
                let keys = "";
                for (let key in sortingGroups) {
                    keys += `${key}, `;
                }
                Debug.Log(`[${debug}] Tried to find property ${property} but it does not exist in the database. Valid keys: ${keys}`);
            }
            return [];
        }
        if (!sortingGroups[property].hasOwnProperty(propertyValue)) {
            if (debug != undefined) {
                let keys = "";
                for (let key in sortingGroups[property]) {
                    keys += `${key}, `;
                }
                Debug.Log(`[${debug}] Tried to find sub property ${propertyValue} but it does not exist in the database. Valid keys: ${keys}`);
            }
            return [];
        }
        return sortingGroups[property][propertyValue].slice();
    };
    const getSortedGroupKeys = function (property) {
        if (sortingGroups == undefined || !sortingGroups.hasOwnProperty(property)) {
            return [];
        }
        return Object.keys(sortingGroups[property]);
    };
    const getGroupData = function (group) {
        let output = [];
        for (let i = 0; i < group.length; i++) {
            output.push(get(group[i]));
        }
        return output;
    };
    'use strict';

    const create = function (database, getFunction) {
        var jsClassData = new JavascriptDataClass();
        jsClassData.addVariable("keys", JSON.stringify(database.keys));
        jsClassData.addVariable("values", jsClassData.formatJsonForDatabase(database.values));
        jsClassData.addVariable("sortingGroups", JSON.stringify(database.sortingGroups));
        jsClassData.addFunction("get", getFunction);
        jsClassData.addFunction("getValues", getValues);
        jsClassData.addFunction("getKeys", getKeys);
        jsClassData.addFunction("has", has);
        jsClassData.addFunction("iterate", iterate);
        jsClassData.addFunction("filter", filter);
        jsClassData.addFunction("getSortedData", getSortedData);
        jsClassData.addFunction("getSortedGroup", getSortedGroup);
        jsClassData.addFunction("getSortedGroupKeys", getSortedGroupKeys);
        jsClassData.addFunction("getGroupData", getGroupData);
        jsClassData.addPublicData("get");
        jsClassData.addPublicData("getValues");
        jsClassData.addPublicData("getKeys");
        jsClassData.addPublicData("has");
        jsClassData.addPublicData("iterate");
        jsClassData.addPublicData("filter");
        jsClassData.addPublicData("getSortedGroup");
        jsClassData.addPublicData("getSortedGroupKeys");
        return jsClassData;
    };
    return {
        Create: create
    };
}());

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Assessment')
        .addItem('Assess This', 'AssessThis')
        .addItem('Assess All', 'AssessAll')
        .addItem('Assess All From Here', 'AssessAllFromPosition')
        .addToUi();
}

function onEdit(e) {
    const sheet = e.range.getSheet();
    if (TryTechniqueAssessment(sheet, e)) {
        return;
    }
    if (TryGearAssessment(sheet, e)) {
        return;
    }
    if (TryConsumableAssessment(sheet, e)) {
        return;
    }
    TryDatabaseAssessment(sheet, e);
}

function TryTechniqueAssessment(sheet, e) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        AssessTechniqueAtRow(sheet, e.range.getRow());
        return true;
    }
    return false;
}

function TryGearAssessment(sheet, e) {
    if (sheet.getSheetName() == "Gear") {
        AssessGearAtRow(sheet, e.range.getRow());
        return true;
    }
    return false;
}

function TryConsumableAssessment(sheet, e) {
    if (sheet.getSheetName() == "Consumables") {
        AssessConsumableAtRow(sheet, e.range.getRow());
        return true;
    }
    return false;
}

function TryDatabaseAssessment(sheet) {
    if (sheet.getSheetName() == "Database") {
        SetDatabaseFromPosition(SpreadsheetApp.getActiveSpreadsheet(), sheet);
        return true;
    }
    return false;
}

function AssessAll() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (TryAssessAllTechniques(sheet)) {
        return;
    }
    if (TryAssessAllGear(sheet)) {
        return;
    }
    if (SetStyleEffects(sheet)) {
        return;
    }

    SetDatabase(ss, sheet);
}

function AssessAllFromPosition() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (AssessAllTechniquesFromPosition(sheet)) {
        return;
    }
    if (TryAssessAllGearFromPosition(sheet)) {
        return;
    }
    if (SetStyleEffectsFromPosition(sheet)) {
        return;
    }

    SetDatabaseFromPosition(ss, sheet);
}

function AssessThis() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (AssessTechniquesFromPosition(sheet)) {
        return;
    }
    if (SetStyleEffectFromPosition(sheet)) {
        return;
    }

    SetDatabaseFromPosition(ss, sheet);
}

function TryAssessAllTechniques(sheet) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        AssessAllTechniquesByStartRow(sheet, 2);
        return true;
    }
    return false;
}

function AssessTechniquesFromPosition(sheet) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        AssessTechniqueAtRow(sheet, row);
        return true;
    }
    return false;
}

function AssessAllTechniquesFromPosition(sheet) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        row = AssessTechniqueAtRow(sheet, row);
        AssessAllTechniquesByStartRow(sheet, row);
        return true;
    }
    return false;
}

function AssessTechniqueAtRow(sheet, rowIndex) {
    if (rowIndex == 1) {
        return;
    }
    let versionColumn = getNamedColumn(sheet, "Version");
    let assessColumn = getNamedColumn(sheet, "Assessment");
    let groupsColumn = getNamedColumn(sheet, "Generated Groups");

    let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
    assessingCell.setValue("Calculating...")

    let techniqueData = GetTechniqueForAssessment(sheet, rowIndex, assessColumn);
    if (techniqueData != undefined) {
        let assessment = new TechniqueAssessment(techniqueData.tech, sheet, techniqueData.row, versionColumn, assessColumn, groupsColumn);
        assessment.printCellValues();
        if (sheet.getSheetName() == "CustomTechniques") {
            assessment.printCellJson(true);
        }
        if (rowIndex != techniqueData.row) {
            assessingCell.setValue("");
        }
        return techniqueData.finalRow;
    } else {
        assessingCell.setValue("");
        return rowIndex + 1;
    }
}

function AssessGearAtRow(sheet, rowIndex) {
    if (rowIndex == 1) {
        return;
    }
    let versionColumn = getNamedColumn(sheet, "Version");
    let assessColumn = getNamedColumn(sheet, "Assessment");
    let groupsColumn = getNamedColumn(sheet, "Generated Groups");

    let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
    assessingCell.setValue("Calculating...")

    let itemData = GetGearForAssessment(sheet, rowIndex, assessColumn);
    if (itemData != undefined) {
        if (itemData.item.hasTechnique) {
            let techniqueAssessment = new TechniqueAssessment(itemData.item.technique, sheet, itemData.row, versionColumn, assessColumn, groupsColumn);
            techniqueAssessment.printCellValues();
        }
        if (rowIndex != itemData.row) {
            assessingCell.setValue("");
        }
        return itemData.finalRow;
    } else {
        assessingCell.setValue("");
        return rowIndex + 1;
    }
}

function AssessConsumableAtRow(sheet, rowIndex) {
    return AssessGearAtRow(sheet, rowIndex);
}

function TryAssessAllGear(sheet) {
    if (sheet.getSheetName() == "Gear" || sheet.getSheetName() == "Consumables") {
        AssessAllGearByStartRow(sheet, 2);
        return true;
    }
    return false;
}

function TryAssessAllGearFromPosition(sheet) {
    if (sheet.getSheetName() == "Gear" || sheet.getSheetName() == "Consumables") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        row = AssessGearAtRow(sheet, row);
        AssessAllGearByStartRow(sheet, row);
        return true;
    }
    return false;
}

function AssessAllGearByStartRow(sheet, startRow) {
    const lastRow = sheet.getLastRow();
    let versionColumn = getNamedColumn(sheet, "Version");
    let assessColumn = getNamedColumn(sheet, "Assessment");
    let groupsColumn = getNamedColumn(sheet, "Generated Groups");
    let rowIndex = startRow;
    let itemData;
    while (rowIndex < lastRow) {
        let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
        assessingCell.setValue("Calculating...")

        itemData = GetGearForAssessment(sheet, rowIndex, assessColumn);
        if (itemData != undefined) {
            rowIndex = itemData.finalRow;
            if (itemData.item.hasTechnique) {
                let assessment = new TechniqueAssessment(
                    itemData.item.technique, sheet, itemData.row, versionColumn, assessColumn, groupsColumn);
                assessment.printCellValues();
            }
        } else {
            assessingCell.setValue("");
            rowIndex++;
        }
    }
}

function AssessAllTechniquesByStartRow(sheet, startRow) {
    const lastRow = sheet.getLastRow();
    let versionColumn = getNamedColumn(sheet, "Version");
    let assessColumn = getNamedColumn(sheet, "Assessment");
    let groupsColumn = getNamedColumn(sheet, "Generated Groups");
    let rowIndex = startRow;
    let techniqueData;
    while (rowIndex < lastRow) {
        let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
        assessingCell.setValue("Calculating...")

        techniqueData = GetTechniqueForAssessment(sheet, rowIndex, assessColumn);
        if (techniqueData != undefined) {
            rowIndex = techniqueData.finalRow;
            let assessment = new TechniqueAssessment(
                techniqueData.tech, sheet, techniqueData.row, versionColumn, assessColumn, groupsColumn);
            assessment.printCellValues();
        } else {
            assessingCell.setValue("");
            rowIndex++;
        }
    }
}

function GetTechniqueForAssessment(sheet, row, assessColumn) {
    let baseTechnique;
    let baseRow = row;
    let finalRow = row;
    let maxIterations = 15;
    let newTechnique;
    newTechnique = GetTechniqueFromSheetRow(sheet, row, assessColumn);
    if (newTechnique.name == "") {
        return undefined; // no working on blank cells
    }
    if (newTechnique.action == "") {
        let startName = newTechnique.name;
        // This is a support entry. We must find the base technique
        let techniqueData = [];
        techniqueData.push(newTechnique);
        while (maxIterations > 0) {
            maxIterations--;
            baseRow--;
            newTechnique = GetTechniqueFromSheetRow(sheet, baseRow, assessColumn);
            if (newTechnique.name != startName) {
                return undefined; // Something is wrong with this data
            }

            if (newTechnique.action != "") {
                baseTechnique = newTechnique;
                break;
            } else {
                techniqueData.push(newTechnique);
            }
        }
        if (baseTechnique == undefined) {
            return undefined; // no base technique found
        }

        while (techniqueData.length > 0) {
            baseTechnique.importEffectsFromTechnique(techniqueData.pop());
        }
    } else {
        baseTechnique = newTechnique;
    }

    while (maxIterations > 0) {
        maxIterations--;
        finalRow++;
        newTechnique = GetTechniqueFromSheetRow(sheet, finalRow, assessColumn);
        if (newTechnique.name == baseTechnique.name) {
            baseTechnique.importEffectsFromTechnique(newTechnique);
        } else {
            break;
        }
    }

    return {tech: baseTechnique, row: baseRow, finalRow: finalRow};
}

function GetTechniqueFromSheetRow(sheet, row, assessColumn) {
    let techLine = sheet.getRange(row, 1, 1, assessColumn - 1).getValues()[0];
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        return new TechniqueData(techLine);
    } else if (sheet.getSheetName() == "Items") {
        let itemData = new ItemData(techLine);
        return itemData.technique;
    }
}

function GetGearForAssessment(sheet, row, assessColumn) {
    let baseItem;
    let baseRow = row;
    let finalRow = row;
    let maxIterations = 15;
    let startItem;
    let newItem;
    startItem = GetUsableItemFromSheetRow(sheet, row, assessColumn);
    if (startItem.name == "") {
        return undefined; // no working on blank cells
    }
    if (startItem.technique.action == "") {
        let startName = startItem.name;
        // This is a support entry. We must find the base technique
        let techniqueData = [];
        techniqueData.push(startItem.technique);
        while (maxIterations > 0) {
            maxIterations--;
            baseRow--;
            newItem = GetUsableItemFromSheetRow(sheet, baseRow, assessColumn);
            if (newItem.name != startName) {
                if (startItem.group == "") {
                    return undefined; // no working on title rows
                }
                return {item: startItem, row: row, finalRow: row};
            }

            if (newItem.technique.action != "") {
                baseItem = newItem;
                break;
            } else {
                techniqueData.push(newItem.technique);
            }
        }
        if (baseItem == undefined) {
            if (startItem.group == "") {
                return undefined; // no working on title rows
            }
            return {item: startItem, row: row, finalRow: row};
        }

        while (techniqueData.length > 0) {
            baseItem.technique.importEffectsFromTechnique(techniqueData.pop());
        }
    } else {
        baseItem = startItem;
    }

    while (maxIterations > 0) {
        maxIterations--;
        finalRow++;
        newItem = GetUsableItemFromSheetRow(sheet, finalRow, assessColumn);
        if (newItem.name == baseItem.name) {
            baseItem.technique.importEffectsFromTechnique(newItem.technique);
        } else {
            break;
        }
    }

    return {item: baseItem, row: baseRow, finalRow: finalRow};
}

function GetUsableItemFromSheetRow(sheet, row, assessColumn) {
    let techLine = sheet.getRange(row, 1, 1, assessColumn - 1).getValues()[0];
    return new UsableItemData(techLine);
}

function getNamedColumn(sheet, name) {
    const headerRow = 1; // Row containing column names

    const lastColumn = sheet.getLastColumn();

    if (lastColumn < 1) { // Check if the sheet is empty
        return -1; // Return -1 if no columns are found
    }

    const headerValues = sheet.getRange(headerRow, 1, 1, lastColumn).getValues()[0];

    for (let i = 0; i < headerValues.length; i++) {
        if (headerValues[i] === name) {
            return i + 1; // Column numbers are 1-based, array indices are 0-based
        }
    }

    return -1; // Return -1 if column is not found
}

class GearValueAssessment {
    constructor(item, sheet, row, valueColumn) {
        this.item = item;
        this.sheet = sheet == undefined ? "" : sheet;
        this.row = row == undefined ? 0 : row;
        this.valueColumn = valueColumn == undefined ? 0 : valueColumn;
        this.baseMaterialValue = 15;

        this.materialCost = 0;
        this.componentCost = 0;
        this.materialCostCalc = "";
        this.componentCostCalc = "";
        this.getBaseMaterialValue();
        this.getComponentValues();
        this.assessment = this.smoothCost(this.materialCost + this.componentCost);
    }

    printCellValues() {
        let range = this.sheet.getRange(this.row, this.valueColumn, 1, 1);
        range.setNote(this.printNotes());
        range.setValue(this.assessment);
    }

    printNotes() {
        return `${this.materialCostCalc}\n${this.componentCostCalc}`;
    }

    getBaseMaterialValue() {
        this.materialCost = this.item.bulk * this.item.valMod * this.baseMaterialValue;
        this.materialCostCalc = `${this.item.bulk}[bulk] * ${this.item.valMod}[mod] * ${this.baseMaterialValue}[matVal] = ${this.materialCost}`;
    }

    getComponentValues() {
        if (this.item.components.trim() == "") {
            return;
        }
        let components = this.item.components.split(";");
        this.componentCost = 0;

        components.forEach(componentData => {
            componentData = componentData.trim();
            let firstSpace = componentData.indexOf(" ");
            let count = parseInt(componentData.substring(0, firstSpace).trim());
            let componentTypeName = componentData.substring(firstSpace).trim().split("_");
            let componentType = componentTypeName[0];
            let componentName = componentTypeName[1];

            let component;
            if (componentType == "Goods") {
                component = WuxGoods.Get(componentName);
            } else if (componentType == "GoodsCat") {
                let filteredGoods = WuxGoods.Filter([new DatabaseFilterData("category", componentName)]);
                component = WuxGoods.Get(filteredGoods[0]);
            } else if (componentType == "Item") {
                component = WuxItems.Get(componentName);
            }

            if (component != undefined && component.group != "") {
                let val = count * component.value;
                if (componentType == "Goods" || componentType == "GoodsCat") {
                    val = Math.ceil(val / 5);
                }
                this.componentCostCalc += `\n${count}[${component.name}] * ${component.value}[${component.name}] = ${val}`;
                this.componentCost += val;
            }
        });
    }

    smoothCost(num) {
        if (num < 20) {
            return num; // Leave small values unchanged
        } else if (num < 120) {
            return Math.ceil(num / 5) * 5;
        } else if (num < 300) {
            return Math.ceil(num / 10) * 10;
        } else if (num < 500) {
            return Math.ceil(num / 20) * 20;
        } else if (num < 1000) {
            return Math.ceil(num / 25) * 25;
        } else if (num < 2000) {
            return Math.ceil(num / 50) * 50;
        } else if (num < 5000) {
            return Math.ceil(num / 100) * 100;
        } else {
            return Math.ceil(num / 250) * 250;
        }
    }
}

function SetStyleEffects(sheet) {
    if (sheet.getSheetName() == "Styles") {
        SetAllStyleKeywords(sheet, 2);
        return true;
    }
    return  false;
}

function SetStyleEffectFromPosition(sheet) {
    if (sheet.getSheetName() == "Styles") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        SetStyleKeywordAtRow(sheet, row);
        return true;
    }
    return false;
}

function SetStyleEffectsFromPosition(sheet) {
    if (sheet.getSheetName() == "Styles") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        SetAllStyleKeywords(sheet, row);
        return true;
    }
    return false;
}

function SetAllStyleKeywords(sheet, startRow) {
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    let effectColumn = getNamedColumn(sheet, "Effects");
    let skillColumn = getNamedColumn(sheet, "Skills");
    let affinityColumn = getNamedColumn(sheet, "Affinity");
    let permanentColumn = getNamedColumn(sheet, "IsPermanent");
    let rowIndex = startRow;
    while (rowIndex <= lastRow) {
        let rowData = sheet.getRange(rowIndex, 1, 1, lastCol).getValues()[0];
        if (rowData[0] == "" || rowData[0].startsWith("#")) {
            let effectCell = sheet.getRange(rowIndex, effectColumn, 1, 1);
            effectCell.setValue("");
            rowIndex++;
            continue;
        }

        SetStyleKeywords(sheet, rowIndex, rowData, effectColumn, skillColumn, affinityColumn, permanentColumn);
        rowIndex++;
    }
}

function SetStyleKeywordAtRow(sheet, startRow) {
    const lastCol = sheet.getLastColumn();
    let effectColumn = getNamedColumn(sheet, "Effects");
    let skillColumn = getNamedColumn(sheet, "Skills");
    let affinityColumn = getNamedColumn(sheet, "Affinity");
    let permanentColumn = getNamedColumn(sheet, "IsPermanent");
    let rowData = sheet.getRange(startRow, 1, 1, lastCol).getValues()[0];
    SetStyleKeywords(sheet, startRow, rowData, effectColumn, skillColumn, affinityColumn, permanentColumn);
}

function SetStyleKeywords(sheet, rowIndex, rowData, effectColumn, skillColumn, affinityColumn, permanentColumn) {
    
    let effectCell = sheet.getRange(rowIndex, effectColumn, 1, 1);
    effectCell.setValue("Calculating...")
    let skillCell = sheet.getRange(rowIndex, skillColumn, 1, 1);
    let affinityCell = undefined;
    if (affinityColumn >= 0) {
        affinityCell = sheet.getRange(rowIndex, affinityColumn, 1, 1);
    }
    let permanentCell = undefined;
    if (permanentColumn >= 0) {
        permanentCell = sheet.getRange(rowIndex, permanentColumn, 1, 1);
    }
    
    let style = new TechniqueStyle(rowData);
    let techniqueFilter = WuxTechs.Filter(new DatabaseFilterData("style", style.name));

    if (techniqueFilter.length == 0) {
        effectCell.setValue("");
    } else {
        let styleAssessment = new StyleAssessment(
            style, techniqueFilter, effectCell, skillCell, affinityCell, permanentCell);
        styleAssessment.print();
    }
}

class StyleAssessment {
    
    constructor (style, techniqueFilter, effectCell, skillCell, affinityCell, permanentCell) {
        this.style = style;
        this.baseTechniqueKeywords = {};
        this.effectCell = effectCell;
        this.skillCell = skillCell;
        this.affinityCell = affinityCell;
        this.permanentCell = permanentCell;
        this.skills = [];
        this.affinities = [];
        this.isPermanent = false;
        
        if (style.baseStyle != "") {
            let baseTechniqueFilters = WuxTechs.Filter(new DatabaseFilterData("style", style.baseStyle));
            this.baseTechniqueKeywords = this.getStyleTechniqueKeywords(baseTechniqueFilters);
        }
        this.techniqueKeywords = this.getStyleTechniqueKeywords(techniqueFilter);

        if (this.skillCell != undefined) {
            this.skills = this.getStyleTechniqueSkills(techniqueFilter);
        }

        if (this.affinityCell != undefined) {
            this.affinities = this.getStyleTechniqueAffinities(techniqueFilter);
        }

        if (this.permanentCell != undefined) {
            this.isPermanent = this.getStyleTechniqueIsPermanent(techniqueFilter);
        }
    }

    print() {
        this.effectCell.setValue(this.printKeywords());
        this.skillCell.setValue(this.printSkills());
        if (this.affinityCell != undefined) {
            this.affinityCell.setValue(this.printAffinity());
        }
        this.permanentCell.setValue(this.printIsPermanent())
    }

    printKeywords() {
        let output = "";

        Object.keys(this.techniqueKeywords)
            .sort()
            .forEach(key => {
                if (Object.hasOwn(this.baseTechniqueKeywords, key)) {
                    return;
                }
                if (key == "Trait_Impatience") {
                    return;
                }
                if (output != "") {
                    output += "; ";
                }
                if (this.techniqueKeywords[key] == "") {
                    output += key;
                }
                else {
                    output += `${key}-${this.techniqueKeywords[key]}`
                }
            });
        return output;
    }

    printSkills() {
        let output = "";
        for(let i = 0; i < this.skills.length; i++)
        {
            if (this.skills[i].trim() == "") {
                continue;
            }
            if (output != "") {
                output += "; ";
            }
            output += this.skills[i];
        }
        return output;
    }

    printIsPermanent() {
        return this.isPermanent ? "TRUE" : "";
    }

    printAffinity() {
        let output = "";
        for(let i = 0; i < this.affinities.length; i++)
        {
            if (this.affinities[i].trim() == "") {
                continue;
            }
            if (output != "") {
                output += "; ";
            }
            output += this.affinities[i];
        }
        return output;
    }

    getStyleTechniqueKeywords(techniqueFilters) {
        let keywords = [];
        for (let i = 0; i < techniqueFilters.length; i++) {
            let technique = techniqueFilters[i];
            this.addTechniqueCoreDefenseToKeywords(technique, keywords);
            this.addTechniqueImpactTraitsToKeywordsArray(technique, keywords);
        }
        return keywords;
    }
    
    addTechniqueCoreDefenseToKeywords(technique, keywords) {
        if (technique.coreDefense == "") {
            return;
        }
        let impactType = `Trait_A-${technique.coreDefense}`;
        if (keywords[impactType] == undefined || keywords[impactType] == "") {
            keywords[impactType] = "";
        }
    }

    addTechniqueImpactTraitsToKeywordsArray(technique, keywords) {
        let impacts = technique.traits.split(";");
        for (let i = 0; i < impacts.length; i++) {
            let impact = impacts[i].trim().split("-");
            let impactType = impact[0];
            if (keywords[impactType] == undefined || keywords[impactType] == "") {
                if (impact.length > 1) {
                    keywords[impactType] = impact[1];
                }
                else {
                    keywords[impactType] = "";
                }
            }
        }
    }

    getStyleTechniqueSkills(techniqueFilters) {
        let skills = [];
        for (let i = 0; i < techniqueFilters.length; i++) {
            if (!skills.includes(techniqueFilters[i].skill)) {
                skills.push(techniqueFilters[i].skill);

            }
        }
        return skills;
    }

    getStyleTechniqueAffinities(techniqueFilters) {
        let affinities = [];
        for (let i = 0; i < techniqueFilters.length; i++) {
            let affinitySplit = techniqueFilters[i].affinity.split(";");
            for (let j = 0; j < affinitySplit.length; j++) {
                let affinity = affinitySplit[j].trim();
                if (!affinities.includes(affinity)) {
                    affinities.push(affinity);
                }
            }
        }
        return affinities;
    }

    getStyleTechniqueIsPermanent(techniqueFilters) {
        if (this.isPermanent) {
            return true;
        }
        for (let i = 0; i < techniqueFilters.length; i++) {
            if (techniqueFilters[i].forms.includes("Permanent")) {
                return true;
            }
        }
        return false;
    }
}

function SetDatabase(ss, sheet) {
    if (sheet.getSheetName() == "Database") {
        let dbAssessment = new DatabaseAssessment(ss, sheet);
        dbAssessment.printAllDatabases();
        return true;
    }
    return  false;
}

function SetDatabaseFromPosition(ss, sheet) {
    if (sheet.getSheetName() == "Database") {
        const range = sheet.getActiveRange();
        let col = range.getColumn();
        
        let dbAssessment = new DatabaseAssessment(ss, sheet);
        dbAssessment.printDataBasedOnColumn(col);
        return true;
    }
    return  false;
}

class DatabaseAssessment {
    constructor(ss, sheet) {
        this.ss = ss;
        this.sheetsDb = new SheetDatabaseObject(ss);
        this.sheet = sheet;
        this.definitionColumn = getNamedColumn(sheet, "Definitions");
        this.techColumn = getNamedColumn(sheet, "Tech");
        this.sheetColumn = getNamedColumn(sheet, "Sheet");
    }
    
    printAllDatabases() {
        this.setSheetDb(true, true, true);
        this.printDefinitionDatabase();
        this.printTechniqueDatabase();
        this.printCharacterSheetBase();
    }
    
    printDataBasedOnColumn(column) {
        if (column == this.definitionColumn) {
            this.setSheetDb(true, false, false);
            this.printDefinitionDatabase();
        }
        else if (column == this.techColumn) {
            this.setSheetDb(false, true, false);
            this.printTechniqueDatabase();
        }
        else if (column == this.sheetColumn) {
            this.setSheetDb(false, false, true);
            this.printCharacterSheetBase();
        }
    }
    
    printDataToColumn(data, splitCharacter, row, column, fallbackSplitCharacter) {
        let arr = SplitLargeEntry(data, splitCharacter, fallbackSplitCharacter);
        let output = [];
        for (let i = 0; i < 150; i++) {
            if (i < arr.length) {
                output.push([arr[i]]);
            }
            else {
                output.push([""]);
            }
        }

        let range = this.sheet.getRange(row, column, 150, 1);
        range.setValues(output);
    }
    
    setSheetDb(setDefinitions, setTech, setCharacterSheet) {

        if (setTech) {
            this.updateChangedTechniques();
        }
        if (setDefinitions || setTech || setCharacterSheet) {
            this.sheetsDb.setTechniques();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setStyles();
        }
        if (setDefinitions || setTech || setCharacterSheet) {
            this.sheetsDb.setBasicPerks();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setSkills();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setLanguage();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setLore();
        }
        if (setDefinitions || setTech || setCharacterSheet) {
            this.sheetsDb.setJobs();
        }
        if (setTech || setCharacterSheet) {
            this.sheetsDb.setGoods();
        }
        if (setTech || setCharacterSheet) {
            this.sheetsDb.setGear();
        }
        if (setTech || setCharacterSheet) {
            this.sheetsDb.setConsumables();
        }
        if (setDefinitions) {
            this.sheetsDb.setStatus();
        }
    }
    
    updateChangedTechniques() {
        this.updateChangedTechniqueVersion("Techniques", 2, (name) => {
            return WuxTechs.Get(name);
        });
        this.updateChangedTechniqueVersion("Gear", 2, (name) => {
            let item = WuxItems.Get(name);
            if (item == undefined || !item.hasTechnique) {
                return;
            }
            return item.technique;
        });
        this.updateChangedTechniqueVersion("Consumables", 2, (name) => {
            let item = WuxItems.Get(name);
            if (item == undefined || !item.hasTechnique) {
                return;
            }
            return item.technique;
        });
    }
    
    updateChangedTechniqueVersion(sheetName, startRow, getTechniqueCallback) {
        let sheet = this.ss.getSheetByName(sheetName);
        let versionCol = ColumnToLetter(getNamedColumn(sheet, "Version"));
        let rowIds = this.sheetsDb.getChangedVersionRows(sheetName, startRow);
        
        for (let index = 0; index < rowIds.length; index++) {
            let rowIndex = parseInt(rowIds[index][0]);
            if (isNaN(rowIndex)) {
                continue;
            }
            let nameId = `A${rowIndex}`;
            let nameRange = sheet.getRange(nameId);
            let tech = getTechniqueCallback(nameRange.getValue());
            if (tech != undefined) {
                tech.incrementVersion();
                let versionId = `${versionCol}${rowIndex}`;
                let versionRange = sheet.getRange(versionId);
                versionRange.setValue(tech.version);
            }
        }
    }

    printDefinitionDatabase() {
        let definitionDatabase = SheetsDatabase.CreateDefinitionTypes(
            this.sheetsDb.readDatabase("DefinitionTypes", 2));
        this.importBasicDefinitions(definitionDatabase, "GroupDefinitions");
        this.importBasicDefinitions(definitionDatabase, "Definitions");
        this.importBasicDefinitions(definitionDatabase, "SystemDefinitions");
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.styles, WuxDef.Get("Style"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.basicPerks, WuxDef.Get("Perk"));
        this.importDatabaseDefinitionsWithGroupCheck(definitionDatabase, this.sheetsDb.skills, WuxDef.Get("Skill"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.language, WuxDef.Get("Language"));
        let loreCategoryDef = WuxDef.Get("LoreCategory");
        let loreDef = WuxDef.Get("Lore");
        this.sheetsDb.lore.iterate(function (value) {
            let definition;
            if (value.group == value.name) {
                definition = value.createDefinition(loreCategoryDef);
            } else {
                definition = value.createDefinition(loreDef);
            }
            definitionDatabase.add(definition.name, definition);
        });
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.job, WuxDef.Get("Job"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.job, WuxDef.Get("JobStyle"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.status, WuxDef.Get("Status"));

        let definitionClassData = JavascriptDatabase.Create(definitionDatabase, WuxDefinition.GetDefinition);
        definitionClassData.addPublicFunction("getAttribute", WuxDefinition.GetAttribute);
        definitionClassData.addPublicFunction("getVariable", WuxDefinition.GetVariable);
        definitionClassData.addPublicFunction("getUntypedAttribute", WuxDefinition.GetUntypedAttribute);
        definitionClassData.addPublicFunction("getUntypedVariable", WuxDefinition.GetUntypedVariable);
        definitionClassData.addPublicFunction("getAbbreviation", WuxDefinition.GetAbbreviation);
        definitionClassData.addPublicFunction("getVariables", WuxDefinition.GetVariables);
        definitionClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariables);
        definitionClassData.addPublicFunction("getTitle", WuxDefinition.GetTitle);
        definitionClassData.addPublicFunction("getDescription", WuxDefinition.GetDescription);
        definitionClassData.addPublicFunction("getName", WuxDefinition.GetName);
        let variableMods = definitionDatabase.filter(new DatabaseFilterData("group", "VariableMod"));
        for (let i = 0; i < variableMods.length; i++) {
            definitionClassData.addPublicVariable(variableMods[i].variable, `"${variableMods[i].variable}"`);
        }

        let output = "";
        output += definitionClassData.print("WuxDef");

        let nameDatabase = NameDatabase.Create(
            this.sheetsDb.readDatabase("Names", 2),
            this.sheetsDb.readDatabase("RacesByRegion", 2));
        output += "\n" + nameDatabase.print("WuxNames");

        this.printDataToColumn(output, "]", 3, this.definitionColumn, `",`);
    }

    printTechniqueDatabase() {
        let output = "";

        this.sheetsDb.gear.iterate(function (item) {
            if (item.hasTechnique) {
                this.sheetsDb.techniques.add(item.technique.name, item.technique);
            }
        }.bind(this));

        this.sheetsDb.consumables.iterate(function (item) {
            if (item.hasTechnique) {
                this.sheetsDb.techniques.add(item.technique.name, item.technique);
            }
        }.bind(this));

        let variableNameKeys = {};
        let techniqueClassData = JavascriptDatabase.Create(this.sheetsDb.techniques, WuxDefinition.GetTechnique);
        this.sheetsDb.techniques.iterate(function (value, key) {
            let definition = value.createDefinition(WuxDef.Get("Technique"));
            variableNameKeys[definition.getVariable()] = key;
        });
        techniqueClassData.addVariable("variableNameKeys", JSON.stringify(variableNameKeys));
        techniqueClassData.addPublicFunction("getByVariableName", function (variableName) {
            let key = variableNameKeys[variableName];
            return get(key);
        });
        techniqueClassData.addPublicFunction("sortFilteredTechniquesByRequirement", WuxDefinition.SortFilteredTechniquesByRequirement);
        techniqueClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariablesTechnique);
        output += techniqueClassData.print("WuxTechs") + "\n";

        let styleDb = this.sheetsDb.getStyles();
        variableNameKeys = {};
        styleDb.iterate(function (value, key) {
            let definition = value.createDefinition(WuxDef.Get("Style"));
            variableNameKeys[definition.getVariable()] = key;
        });
        this.sheetsDb.job.iterate(function (job, key) {
            let jobStyle = job.convertToStyle();
            styleDb.add(jobStyle.name, jobStyle);
            let definition = job.createDefinition(WuxDef.Get("Job"));
            variableNameKeys[definition.getVariable()] = key;
        });
        let styleClassData = JavascriptDatabase.Create(styleDb, WuxDefinition.GetStyle);
        styleClassData.addVariable("variableNameKeys", JSON.stringify(variableNameKeys));
        styleClassData.addPublicFunction("getByVariableName", function (variableName) {
            let key = variableNameKeys[variableName];
            return get(key);
        });
        styleClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariablesStyle);
        output += styleClassData.print("WuxStyles") + "\n";

        let perkDb = this.sheetsDb.basicPerks;
        variableNameKeys = {};
        perkDb.iterate(function (value, key) {
            let definition = value.createDefinition(WuxDef.Get("Perk"));
            variableNameKeys[definition.getVariable()] = key;
        });
        let basicPerksClassData = JavascriptDatabase.Create(perkDb, WuxDefinition.GetBasicPerk);
        basicPerksClassData.addVariable("variableNameKeys", JSON.stringify(variableNameKeys));
        basicPerksClassData.addPublicFunction("getByVariableName", function (variableName) {
            let key = variableNameKeys[variableName];
            return get(key);
        });
        basicPerksClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariablesStyle);
        output += basicPerksClassData.print("WuxPerks") + "\n";

        let goodsClassData = JavascriptDatabase.Create(this.sheetsDb.goods, WuxDefinition.GetGoods);
        output += goodsClassData.print("WuxGoods") + "\n";

        let itemsDatabase = this.sheetsDb.getGear();
        this.sheetsDb.consumables.iterate(function (item) {
            let valueAssessment = new GearValueAssessment(item);
            item.value = valueAssessment.assessment;
            itemsDatabase.add(item.name, item);
        });
        let itemClassData = JavascriptDatabase.Create(itemsDatabase, WuxDefinition.GetItem);
        output += itemClassData.print("WuxItems") + "\n";

        this.printDataToColumn(output, "}", 3, this.techColumn, `",`);
    }

    printCharacterSheetBase() {
        let output = BuildCharacterSheet.PrintBase(this.sheetsDb);
        this.printDataToColumn(output, "\n", 3, this.sheetColumn, `",`);
    }
    
    importBasicDefinitions(definitionDatabase, sheetName) {
        definitionDatabase.importSheets(this.sheetsDb.readDatabase(sheetName, 2),
            function (arr) {
                let definition = new DefinitionData(arr);
                let baseDefinition = definitionDatabase.get(definition.group);
                if (baseDefinition != undefined && baseDefinition.group == "Type") {
                    return definition.createDefinition(baseDefinition);
                }
                return definition;
            }
        );
    }

    importDatabaseDefinitions(definitionDatabase, database, baseDefinition) {
        database.iterate(function (value) {
            let definition = value.createDefinition(baseDefinition);
            definitionDatabase.add(definition.name, definition);
        });
    }

    importDatabaseDefinitionsWithGroupCheck(definitionDatabase, database, baseDefinition) {
        database.iterate(function (value) {
            if (value.group != "") {
                let definition = value.createDefinition(baseDefinition);
                definitionDatabase.add(definition.name, definition);
            }
        });
    }
}




class TechniqueAssessment {
    constructor(technique, sheet, row, versionColumn, assessColumn, generatedGroupsColumn) {
        this.sheet = sheet;
        this.row = row;
        this.versionColumn = versionColumn;
        this.assessColumn = assessColumn;
        this.generatedGroupsColumn = generatedGroupsColumn;

        this.technique = technique;
        this.assessment = "";
        this.averagePoints = 0;
        this.assessmentPercentage = 0;
        this.isInvalid = false;
        this.invalidReason = "";

        this.impactTraits = {};
        this.utilitySet = false;

        this.target = technique.target;
        this.size = technique.size;
        this.onEnterEffect = false;
        this.statusCount = 0;

        this.basePoints = 8;
        this.points = 0;
        this.defenseModifier = 0;
        this.defenseModName = "";
        this.setDefenseModifier();
        this.pointsCalc = "";
        this.pointsRubric = "";
        this.willbreakPoints = 0;
        this.willbreakPointsRubric = "";
        this.patience = 0;
        this.pointBreakdown = [];

        this.dps = 0;
        this.lowDps = 0;
        this.highDps = 0;
        this.dpsVariance = false;

        this.will = 0;
        this.lowWill = 0;
        this.highWill = 0;
        this.willVariance = false;

        this.structureCount = 0;
        this.structureHP = 0;
        this.structureArmor = 0;

        this.favor = 0;
        this.lowFavor = 0;
        this.highFavor = 0;
        this.favorVariance = false;

        this.request = 0;
        this.lowRequest = 0;
        this.highRequest = 0;
        this.requestVariance = false;

        this.isCombat = false;
        this.isSocial = false;

        this.assessTechnique();
    }

    setDefenseModifier() {
        let modNames = [];
        let defenseValue = parseInt(this.technique.coreDefense);
        if (this.technique.coreDefense == "") {
            this.defenseModifier += 0.65;
            modNames.push("Unavoidable");
        }
        else if (!isNaN(defenseValue)) {
            defenseValue -= this.technique.tier + 4;
            if (defenseValue <= 5) {
                this.defenseModifier += 0.5;
                modNames.push("Easy DC");
            }
            else if (defenseValue >= 9) {
                this.defenseModifier -= 0.2;
                modNames.push("Hard DC");
            }
        }
        else {
            let accurateDefenses = ["Evasion", "Insight"];
            if (accurateDefenses.some(type => type == this.technique.coreDefense)) {
                this.defenseModifier += 0.25;
                modNames.push("Effective");
            }
        }
        if (this.technique.impacts.includes("Truehit")) {
            this.defenseModifier += 0.4;
            modNames.push("Truehit");
        }
        if (this.technique.impacts.includes("Accurate")) {
            this.defenseModifier += 0.2;
            modNames.push("Accurate");
        }
        this.defenseModName = modNames.join(", ");
    }

    setAssessment() {
        if (this.technique.en > this.getEnergyRestriction()) {
            this.isInvalid = true;
            this.invalidReason = "Too much EN expenditure for this action type";
        }
        if (this.isInvalid) {
            this.assessment = "INVALID";
            return;
        }
        if (this.assessmentPercentage == undefined) {
            this.assessment = "???";
            return;
        }

        if (this.assessmentPercentage < 20) {
            this.assessment = "Too Weak";
        } else if (this.assessmentPercentage < 40) {
            this.assessment = "Weak";
            if (this.assessmentPercentage > 32) {
                this.assessment += " 3";
            } else if (this.assessmentPercentage > 26) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else if (this.assessmentPercentage < 60) {
            this.assessment = "Average";
            if (this.assessmentPercentage > 52) {
                this.assessment += " 3";
            } else if (this.assessmentPercentage > 46) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else if (this.assessmentPercentage < 80) {
            this.assessment = "Strong";
            if (this.assessmentPercentage > 72) {
                this.assessment += " 3";
            } else if (this.assessmentPercentage > 66) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else {
            this.assessment = "Too Strong";
        }
    }

    printCellValues() {
        this.printAssessmentNote();
        this.printAssessmentPointValues();
        this.printVersionChange();
        this.printSortingValues();
    }
    printAssessmentNote() {
        let range = this.sheet.getRange(this.row, this.assessColumn, 1, 1);
        if (this.isInvalid) {
            range.setNote(this.invalidReason);
            return;
        }
        range.setNote(this.getAssessmentNote());
    }
    printAssessmentPointValues() {
        let values = [];
        values[0] = [this.assessment, `${this.pointVarianceRange()}\n${this.points}; ${this.pointBreakdown[0].points}`];
        for (let i = 1; i < this.pointBreakdown.length; i++) {
            values.push(["", `${this.pointBreakdown[i].points}; ${this.pointBreakdown[i].rubric}`]);
        }

        let range = this.sheet.getRange(this.row, this.assessColumn, this.pointBreakdown.length, 2);
        range.setValues(values);
    }
    printVersionChange() {
        let range = this.sheet.getRange(this.row, this.versionColumn, 1, 1);
        range.setValue("CHANGE");
    }
    printSortingValues() {
        let range = this.sheet.getRange(this.row, this.generatedGroupsColumn, 1, 1);
        range.setValue(this.printImpactTraits());
    }

    printCellJson(isCustom) {
        Debug.Log("Printing JSON for technique");
        let range = this.sheet.getRange(this.row, this.assessColumn + 4, 1, 1);
        this.technique.isCustom = isCustom;
        range.setValue(JSON.stringify(this.technique));
    }

    getAssessmentNote() {
        let output = `Point ${this.pointsCalc != "" ? this.pointsCalc : " (Avg)"}: `;
        output += this.pointVarianceRange();
        output += `\nTotal Points: ${this.points}\n${this.pointsRubric}`;
        if (this.willbreakPoints > 0) {
            output += `\nWill Break: ${this.willbreakPoints}\n${this.willbreakPointsRubric}`;
        }
        output += "\n";

        if (this.dps > 0) {
            output += `\nDPS: ${this.lowDps} => ${this.dps} <= ${this.highDps}`;
            if (this.dpsVariance) {
                output += " (High Variance)";
            }
        }
        if (this.will > 0) {
            output += `\nWill: ${this.lowWill} => ${this.will} <= ${this.highWill}`;
            if (this.willVariance) {
                output += " (High Variance)";
            }
        }
        if (this.favor > 0) {
            output += `\nFavor: ${this.lowFavor} => ${this.favor} <= ${this.highFavor}`;
            if (this.favorVariance) {
                output += " (High Variance)";
            }
        }
        if (this.request > 0) {
            output += `\nRequest: ${this.lowRequest} => ${this.request} <= ${this.highRequest}`;
            if (this.requestVariance) {
                output += " (High Variance)";
            }
        }
        return output;
    }

    printImpactTraits() {
        let output = "";
        if (this.isCombat) {
            this.addImpactTrait("TechFilterType_Combat");
        }
        else if (this.isSocial) {
            this.addImpactTrait("TechFilterType_Social")
        }
        for(let key in this.impactTraits) {
            if (output != "") {
                output += "; ";
            }
            if (this.impactTraits[key] == "") {
                output += key;
            }
            else {
                output += `${key}-${this.impactTraits[key]}`
            }
        }
        return output;
    }

    pointVarianceRange() {

        let restTypes = ["Brief", "Short", "Long"];
        if (restTypes.includes(this.technique.action) || this.technique.action == "Passive") {
            return "0 < 15 < 30";
        }

        let output = "";
        let lowestPts, lowPts, medPts, hiPts, highestPts;
        if (this.assessmentPercentage < 50) {
            lowestPts = this.averagePoints + Math.floor(this.averagePoints * (20 - 50)/ 100);
            lowPts = this.averagePoints + Math.floor(this.averagePoints * (26 - 50)/ 100);
            medPts = this.averagePoints + Math.floor(this.averagePoints * (32 - 50)/ 100);
            hiPts = this.averagePoints + Math.floor(this.averagePoints * (46 - 50)/ 100);
            highestPts = `${this.averagePoints}.`;
        }
        else {
            lowestPts = `${this.averagePoints}.`;
            lowPts = this.averagePoints + Math.floor(this.averagePoints * (60 - 50)/ 100);
            medPts = this.averagePoints + Math.floor(this.averagePoints * (66 - 50)/ 100);
            hiPts = this.averagePoints + Math.floor(this.averagePoints * (72 - 50)/ 100);
            highestPts = this.averagePoints + Math.floor(this.averagePoints * (80 - 50)/ 100);
        }
        output += lowestPts;
        if (lowPts != lowestPts) {
            output += ` <${lowPts}`;
        }
        if (medPts != lowPts) {
            output += ` <${medPts}`;
        }
        if (hiPts != medPts) {
            output += ` <${hiPts}`;
        }
        output += ` <${highestPts}`;
        return output;
    }

    assessTechnique() {
        let assessor = this;
        let attributeHandler = this.getFakeAttributeHandler();

        if (this.technique.forms.includes("OnEnter")) {
            assessor.onEnterEffect = true;
        }

        this.technique.effects.iterate(function (effect) {
            assessor.pointBreakdown.push({points: 0, rubric: ""});
            assessor.assessEffect(effect, attributeHandler);
        });

        for (const key in this.technique.enhancementEffects) {
            let effect = this.technique.enhancementEffects[key];
            assessor.pointBreakdown.push({points: 0, rubric: ""});
            assessor.assessEffect(effect, attributeHandler);
        }

        this.getStructureAssessment();
        let customPoints = this.sheet.getRange(this.row, this.assessColumn + 2, 1, 1).getValues()[0];
        customPoints = isNaN(parseInt(customPoints)) ? 0 : parseInt(customPoints);
        if (customPoints != 0) {
            this.addPointsRubric(customPoints, `(Custom)`)
        }

        this.setAveragePoint(this.getEnergy(), this.technique);

        if (this.points == 0) {
            this.assessmentPercentage = undefined;
            this.setAssessment();
        } else {
            let restTypes = ["Brief", "Short", "Long"];
            if (restTypes.includes(this.technique.action) || this.technique.action == "Passive") {
                this.assessmentPercentage = 20 + (assessor.points * 2);
            }
            else {
                let difference = assessor.points - this.averagePoints;
                this.assessmentPercentage = 50 + (difference * 100 / this.averagePoints);
            }
            this.setAssessment();
            this.getVarianceCalculation();
        }
    }

    getFakeAttributeHandler() {
        let attributeHandler = new AttributeHandler();
        attributeHandler.addMod(WuxDef.GetVariable("Attr_BOD"));
        attributeHandler.current[WuxDef.GetVariable("Attr_BOD")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_PRC"));
        attributeHandler.current[WuxDef.GetVariable("Attr_PRC")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_QCK"));
        attributeHandler.current[WuxDef.GetVariable("Attr_QCK")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_CNV"));
        attributeHandler.current[WuxDef.GetVariable("Attr_CNV")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_INT"));
        attributeHandler.current[WuxDef.GetVariable("Attr_INT")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_RSN"));
        attributeHandler.current[WuxDef.GetVariable("Attr_RSN")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("SB_MAX"));
        attributeHandler.current[WuxDef.GetVariable("SB_MAX")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("Potency"));
        attributeHandler.current[WuxDef.GetVariable("Potency")] = 0;
        attributeHandler.addMod(WuxDef.GetVariable("SB_ExcellentDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_ExcellentDef")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("SB_GreatDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_GreatDef")] = 4;
        attributeHandler.addMod(WuxDef.GetVariable("SB_GoodDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_GoodDef")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("SB_MedDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_MedDef")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("SB_LowDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_LowDef")] = 1;
        attributeHandler.addMod(WuxDef.GetVariable("TargetFavor"));
        attributeHandler.current[WuxDef.GetVariable("TargetFavor")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Recall"));
        attributeHandler.current[WuxDef.GetVariable("Recall")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("CR"));
        attributeHandler.current[WuxDef.GetVariable("CR")] = 1;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_HV"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_HV")] = this.basePoints - 1;
        attributeHandler.addMod(WuxDef.GetVariable("TargetHV"));
        attributeHandler.current[WuxDef.GetVariable("TargetHV")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Soc_Favor"));
        attributeHandler.current[WuxDef.GetVariable("Soc_Favor")] = 15;
        attributeHandler.addMod(WuxDef.GetVariable("StrideRoll"));
        attributeHandler.current[WuxDef.GetVariable("StrideRoll")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_Mv"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_Mv")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_MvDash"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_MvDash")] = 4;
        attributeHandler.addMod(WuxDef.GetVariable("MvPotency"));
        attributeHandler.current[WuxDef.GetVariable("MvPotency")] = 7;

        return attributeHandler;
    }

    getEnergy() {
        return isNaN(parseInt(this.technique.en)) ? 0 : parseInt(this.technique.en);
    }
    getEnergyRestriction() {
        let restTypes = ["Brief", "Short", "Long"];
        if (restTypes.includes(this.technique.action)) {
            return 9;
        }
        return this.technique.tier + 1;
    }

    setAveragePoint(energy, technique) {
        let techniquePointsCalc = this.getAveragePoints(energy, technique);

        this.averagePoints = techniquePointsCalc.points;
        this.pointsCalc = `(${techniquePointsCalc.pointCalc.join(",")})`;
    }

    getAveragePoints(energy, technique) {
        let output = {
            points: 0,
            pointCalc: []
        }

        let energyValue = [8,11,16,22,30,39,50,62,76,91];
        output.points = energyValue[energy];
        
        if (technique.action == "Full") {
            output.points += this.basePoints + 6;
            output.pointCalc.push("Full");
        }
        else if (technique.action == "Assist") {
            output.points += 1;
            output.pointCalc.push("Assist");
        }
        else if (technique.action == "Swift") {
            let lookupName = WuxDef.GetAbbreviation("Job") + "_" + technique.techSet.split(";")[0].trim();
            if (WuxDef.GetTitle(lookupName) == "") {
                output.points = Math.ceil(output.points * 0.5);
                output.pointCalc.push("Swift Job");
            }
        }

        if (technique.willPower > 0) {
            output.points += Math.ceil(technique.willPower / 5);
            output.pointCalc.push("Magic");
        }
        
        if (technique.boon > 0) {
            output.points += 5;
            output.pointCalc.push("Magic");
        }

        return output;
    }

    getEnhancementPoints() {
        let points = this.getAveragePoints(this.getEnergy(), this.technique);
        let enhancePoints = this.getAveragePoints(this.getEnergy() + 1, this.technique);
        if (this.technique.action == "Full") {
            enhancePoints.points++;
        }
        return enhancePoints.points - points.points;
    }

    getVarianceCalculation() {
        let variance = 0;
        return;
        if (this.dps > 0) {
            variance = this.dps - this.lowDps;
            if (variance / this.dps > 0.5) {
                this.dpsVariance = true;
                this.assessment += "*";
            }
        }
        if (this.will > 0) {
            variance = this.will - this.lowWill;
            if (variance / this.will > 0.5) {
                this.willVariance = true;
                this.assessment += "*";
            }
        }
        if (this.favor > 0) {
            variance = this.favor - this.lowFavor;
            if (variance / this.favor > 0.5) {
                this.favorVariance = true;
                this.assessment += "*";
            }
        }
    }

    assessEffect(effect, attributeHandler) {
        switch (effect.type) {
            case "Boost":
                this.getBoostAssessment(effect, attributeHandler);
                break;
            case "Damage":
                this.getDamageAssessment(effect, attributeHandler);
                break;
            case "Break":
                this.getBreakAssessment(effect, attributeHandler);
                break;
            case "HP":
                this.getHPAssessment(effect, attributeHandler);
                break;
            case "WILL":
                this.getWillAssessment(effect, attributeHandler);
                break;
            case "Vitality":
                this.getVitalityAssessment(effect, attributeHandler);
                break;
            case "Surge":
                this.getSurgeAssessment(effect, attributeHandler);
                break;
            case "Impatience":
                this.getImpatienceAssessment(effect, attributeHandler);
                break;
            case "Favor":
                this.getFavorAssessment(effect, attributeHandler);
                break;
            case "Influence":
                this.getInfluenceAssessment(effect);
                break;
            case "Request":
                this.getRequestAssessment(effect, attributeHandler);
                break;
            case "Status":
                this.getStatusAssessment(effect, attributeHandler);
                break;
            case "BreakFocus":
                this.getBreakFocusAssessment(effect, attributeHandler);
                break;
            case "CallAssist":
                this.getCallAssistAssessment();
                break;
            case "Terrain":
                this.getTerrainAssessment(effect, attributeHandler);
                break;
            case "Structure":
                this.getStructureAssessmentData(effect, attributeHandler);
                break;
            case "Move":
                this.getMoveAssessment(effect, attributeHandler);
                break;
            case "EN":
                this.getEnAssessment(effect, attributeHandler);
                break;
            case "FreeFocus":
                this.getFreeFocusAssessment(effect, attributeHandler);
                break;
            default:
                if (effect.subType != "") {
                    this.addImpactTrait(`TechFilterType_${effect.subType}`);
                }
        }
    }

    getBoostAssessment(effect, attributeHandler) {
        attributeHandler.current[WuxDef.GetVariable("CR")] = 2;
        let output = this.getDiceFormula(effect, attributeHandler);
        attributeHandler.current[WuxDef.GetVariable("CR")] = 1;
        let def = WuxDef.Get(effect.effect);
        let message = `(${def.getTitle()})`;
        switch (effect.effect) {
            case "HP":
            case "WILL":
                output.value = Math.ceil(output.value * 0.075);
                break;
            case "Cmb_HV":
                output.value = Math.ceil(output.value * 0.2);
                break;
            case "Def_Brace":
            case "Def_Warding":
            case "Def_Logic":
            case "Def_Resolve":
                // 2 = 2, 3 = 4, 4 = 6, 5 = 8
                output.value = Math.ceil(Math.abs(output.value) + Math.max(Math.ceil(Math.abs(output.value) * 0.75 - 1.5), 0)) * (effect.subType == "Penalty" ? -1 : 1);
                break;
            case "Def_Evasion":
            case "Def_Insight":
                output.value = (effect.subType == "Penalty" ? 0 : 1) + Math.ceil(Math.abs(output.value) + Math.max(Math.ceil(Math.abs(output.value) * 0.75 - 1.5), 0)) * (effect.subType == "Penalty" ? -1 : 1);
                break;
            case "StartEN":
            case "RoundEN":
                output.value = Math.ceil(output.value * 2);
                break;
            case "Cmb_Mv":
            case "Cmb_MvDash":
                output.value = Math.ceil(output.value * 2);
                break;
            case "Cmb_Armor":
            case "Cmb_BurnResist":
            case "Cmb_ColdResist":
            case "Cmb_EnergyResist":
            case "Cmb_ForceResist":
            case "Cmb_PiercingResist":
            case "Cmb_PsycheResist":
                break;
            case "ConsumableSlots":
                output.value = Math.ceil(output.value * 2);
                break;
        }

        this.addPointsRubric(output.value, message);
    }

    getDamageAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let subTypeParts = effect.subType.split(":");
        let subType = subTypeParts[0];

        let message;
        if (subType == "Burst Damage") {
            output.value = Math.max(Math.floor(output.value * 0.25), 1);
            message = `(Burst)`;

            if (effect.defense != "WillBreak") {
                this.addPointsRubric(output.value, message);
            }
            this.addTargetedPointsRubric(effect, output.value);
            this.isCombat = true;
            this.addImpactTrait(effect.effect);
        }
        else if (subType == "Status") {
            message = `(Status)`;

            if (effect.defense != "WillBreak") {
                this.addPointsRubric(output.value, message);
            }
            this.addTargetedPointsRubric(effect, output.value);
            this.isCombat = true;
            this.addImpactTrait(effect.effect);
        }
        else if (subType == "Special") {
            this.isCombat = true;
            this.addImpactTrait(effect.effect);
        }
        else if (effect.effect == "Dmg_Psyche") {
            if (effect.target == "Self") {
                output.value = Math.floor(output.value * -0.5);
            } else {
                this.will += output.value;
                this.lowWill += output.lowValue;
                this.highWill += output.highValue;
                if (this.dps > 0) {
                    output.value = Math.floor(output.value * 0.5);
                }
                else {
                    output.value = Math.ceil(output.value * (1.5 - (this.patience * (this.technique.action != "Full" ? 0.5 : 0.25))));
                }
            }
            message = `(Psyche)`;
            if (effect.defense == "Enhance") {
                this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
                return;
            }
            else {
                this.addPointsRubric(output.value, message);
                this.addDefensePointsRubric(effect, output.value, message);
                this.addTargetedPointsRubric(effect, output.value);
                this.isSocial = true;
                this.addImpactTrait(effect.effect);
            }
        }
        else {
            let points = output.value;
            message = `(HP)`;

            if (effect.defense == "Enhance") {
                let enhancePoints = this.getTargetPointsRubric(effect, output.value);
                if (this.technique.impacts.indexOf("Brutal") >= 0) {
                    points += Math.floor(output.value * 0.33);
                }
                if (this.technique.impacts.indexOf("AP") >= 0) {
                    points += Math.floor(output.value * 0.33);
                }
                this.addPointsRubric(0, `${enhancePoints.points + points} (max ${this.getEnhancementPoints()})`);
                return;
            }
            else {
                if (effect.target == "Self") {
                    points = Math.floor(output.value * -0.5);
                } else {
                    if (this.dps > 0) {
                        points = Math.floor(output.value * 0.9);
                    }
                    this.dps += output.value;
                    this.lowDps += output.lowValue;
                    this.highDps += output.highValue;
                }
                this.addPointsRubric(points, message);
                this.isCombat = true;
                this.addImpactTrait(effect.effect);
            }
            this.addDefensePointsRubric(effect, output.value, message);
            this.addTargetedPointsRubric(effect, output.value);
        }

        let effectPts;
        if (this.technique.impacts.indexOf("Brutal") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(Brutal)`);
        }
        if (this.technique.impacts.indexOf("AP") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(AP)`);
        }
    }

    getBreakAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let message;

        output.value = Math.floor(output.value * 0.5);
        message = `(Break)`;
        this.addPointsRubric(output.value, message);
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);

        this.isCombat = true;
        this.addImpactTrait("Trait_Break");
    }

    getHPAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let subTypeParts = effect.subType.split(":");
        let subType = subTypeParts[0];

        let message;
        switch (subType) {
            case "Heal":
                output.value = Math.floor(output.value * 2.5);
                message = `(Heal HP)`;

                if (effect.defense == "Enhance") {
                    this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
                    return;
                }
                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Heal");
                break;
            case "Surge":
                message = `(Surge HP)`;

                if (effect.defense == "Enhance") {
                    this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
                    return;
                }

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Heal");
                break;
            case "Special":
                this.isCombat = true;
                break;
            default:
                if (effect.target == "Self") {
                    output.value = Math.floor(output.value * -0.5);
                } else {
                    this.dps += output.value;
                    this.lowDps += output.lowValue;
                    this.highDps += output.highValue;
                }
                message = `(HP)`;

                if (effect.defense == "WillBreak") {
                }
                else {
                    this.addPointsRubric(output.value, message);
                    this.isCombat = true;
                }
                this.addDefensePointsRubric(effect, output.value, message);
                this.addTargetedPointsRubric(effect, output.value);
                break;
        }

        let effectPts;
        if (this.technique.impacts.indexOf("Brutal") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(Brutal)`);
        }
        if (this.technique.impacts.indexOf("AP") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(AP)`);
        }
    }

    getWillAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);

        let message;
        switch (effect.subType) {
            case "Heal":
                output.value = Math.floor(output.value * 1.5);
                message = `(Heal Will)`;
                break;
            default:
                if (effect.target == "Self") {
                    output.value = Math.floor(output.value * -0.5);
                } else {
                    this.will += output.value;
                    this.lowWill += output.lowValue;
                    this.highWill += output.highValue;
                    if (this.dps > 0) {
                        output.value = Math.floor(output.value * 0.5);
                    }
                }
                message = `(Will)`;
                break;
        }

        this.addPointsRubric(output.value, message);
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getVitalityAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value *= 21;
        if (effect.subType == "Heal") {
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait("Trait_Heal");
        }
        else {
            output.value = Math.floor(output.value * 1.5);
            this.isCombat = true;
        }
        let message = `(${effect.subType != "" ? `${effect.subType} ` : ""}Vit)`;

        if (effect.defense == "WillBreak") {
            this.addImpactTrait(`Trait_Will:Trait_Atk-Vitality`);
        }
        else {
            this.addPointsRubric(output.value, message);
        }
        this.addTargetedPointsRubric(effect, output.value);
    }

    getSurgeAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value *= 10;
        if (effect.subType == "Heal") {
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait("Trait_Heal");
        }
        else {
            output.value = Math.floor(output.value * 1.5);
            this.isCombat = true;
        }
        let message = `(${effect.subType != "" ? `${effect.subType} ` : ""}Surge)`;

        if (effect.defense == "WillBreak") {
            this.addImpactTrait(`Trait_Will:Trait_Atk-Surge`);
        }
        else {
            this.addPointsRubric(output.value, message);
        }
        this.addTargetedPointsRubric(effect, output.value);
    }

    getImpatienceAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        switch (effect.subType) {
            case "Heal":
                if (effect.defense == "WillBreak") {
                    output.value *= 5;
                    this.addPointsRubric(0, `${output.value} (Heal Impatience)`);
                }
                else {
                    output.value *= 10;
                    this.addPointsRubric(output.value, `(Heal Impatience)`);
                }
                break;
            default:
                this.patience += output.value;
                break;
        }
        this.isSocial = true;
    }

    getFavorAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let message;
        switch (effect.subType) {
            case "Heal":
                if (effect.defense != "WillBreak") {
                    output.value *= 6;
                }
                message = `(Heal Favor)`;
                break;
            default:
                this.favor += output.value;
                this.lowFavor += output.lowValue;
                this.highFavor += output.highValue;
                if (effect.defense != "WillBreak") {
                    output.value *= (10 - (this.patience * (this.technique.action != "Full" ? 4 : 2)));
                }
                message = `(Favor)`;
                break;
        }

        if (effect.defense == "WillBreak") {
            message = `${output.value} (Favor)`;
            this.addPointsRubric(0, message);
        }
        else {
            this.addPointsRubric(output.value, message);
        }
        this.isSocial = true;
        this.addImpactTrait("Trait_Favor");
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getInfluenceAssessment(effect) {
        let subTypes = effect.subType.split(":");
        let points = 0;
        let message = "";
        switch (subTypes[0]) {
            case "Raise":
            case "Lower":
                if (effect.defense != "WillBreak") {
                    points = 14;
                }
                message = `(${subTypes[0]} Influence)`;
                break;
            case "Adjust":
                if (effect.defense != "WillBreak") {
                    points = 16;
                }
                message = `(${subTypes[0]} Influence)`;
                break;
            case "Add":
                if (subTypes.length > 1) {
                    if (subTypes[1] == "Low") {
                        points = 17;
                    } else if (subTypes[1] == "Moderate") {
                        points = 30;
                    }
                }
                message = `(${subTypes[0]} Influence)`;
                break;
        }

        this.isSocial = true;
        this.addImpactTrait("Trait_Influence");
        if (effect.defense == "WillBreak") {
            message = `${points} ${message}`;
            this.addPointsRubric(0, message);
        }
        else {
            this.addPointsRubric(points, message);
        }
    }

    getRequestAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value = Math.ceil(output.value * (2 - (this.patience * (this.technique.action != "Full" ? 0.5 : 0.25))));

        if (effect.subType == "Bargain") {
            output.value += 3;
        }

        if (effect.defense == "Enhance") {
            this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
            return;
        }

        this.request += output.value;
        this.lowRequest += output.lowValue;
        this.highRequest += output.highValue;
        let message = `(Request)`;
        this.addPointsRubric(output.value, message);
        this.addDefensePointsRubric(effect, output.value);
        this.isSocial = true;
        this.addImpactTrait("Trait_Request");
    }

    getTerrainAssessment(effect, attributeHandler) {
        let effectDefinition = WuxDef.Get(effect.effect);
        let value = effectDefinition.formula.getValue(attributeHandler);
        let message = "";
        switch (effect.subType) {
            case "Add":
                message = `(Add ${effectDefinition.getTitle()})`;
                break;
            case "Remove":
                value = Math.floor(value * 0.75);
                message = `(Remove ${effectDefinition.getTitle()})`;
                break;
        }

        this.addPointsRubric(value, message);
        this.addTargetedPointsRubric(effect, value);
        this.addImpactTrait("TechFilterType_Utility");
        this.addImpactTrait("Trait_Terrain");
    }

    getStructureAssessmentData(effect, attributeHandler) {
        if (effect.defense == "Enhance") {
            let pointMod = this.getDiceFormula(effect, attributeHandler).value * this.getStructureValueMod();
            this.addPointsRubric(0, `${pointMod} (max ${this.getEnhancementPoints()})`);
            return;
        }
        let output = this.getDiceFormula(effect, attributeHandler);
        switch (effect.subType) {
            case "Count":
                this.structureCount += output.value;
                break;
            case "HP":
                this.structureHP += output.value;
                break;
            case "Armor":
                this.structureArmor += output.value;
                break;
            case "Dimensions":
                break;
        }
    }

    getStructureAssessment() {
        if (this.structureCount > 0) {
            let value = this.structureCount * this.getStructureValueMod();
            let message = `(Structure)`;
            this.addPointsRubric(value, message);
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait("Trait_Structure");
        }
    }
    
    getStructureValueMod() {
        return Math.ceil(this.structureHP / 2) + Math.ceil(this.structureArmor);
    }

    getMoveAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);

        if (effect.defense == "Enhance") {
            switch (effect.subType) {
                case "Teleport":
                    output.value = Math.floor(output.value * 2);
                    break;
                case "Fly":
                case "FreeMove":
                    output.value = Math.floor(output.value * 1.5);
                    break;
                case "Invis":
                case "Sneak":
                    output.value = Math.floor(output.value * 2);
                    break;
                case "ForceMove":
                case "Pushed":
                case "Pulled":
                    output.value = Math.floor(output.value * (1 + (output.value * 0.5)));
                    break;
                case "Jump": {
                    let jumpHeight = parseInt(effect.effect);
                    output.value += (isNaN(jumpHeight) ? 0 : jumpHeight) * 2;
                    break;
                }
                case "Temporal":
                    output.value *= 3;
                    break;
            }
            this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
            return;
        }

        let impactTrait = `Trait_Move`;
        switch (effect.subType) {
            case "Teleport":
                output.value = Math.floor(output.value * 2);
                impactTrait = `Trait_Move-Special`;
                break;
            case "Fly":
            case "FreeMove":
                output.value = Math.floor(output.value * 1.5);
                impactTrait = `Trait_Move-Special`;
                break;
            case "Invis":
            case "Sneak":
                output.value = Math.floor(output.value * 2);
                impactTrait = `Trait_Move-Sneak`;
                break;
            case "ForceMove":
            case "Pushed":
            case "Pulled":
                output.value = Math.floor(output.value * (1 + (output.value * 0.5)));
                impactTrait = `Trait_ForceMove`;
                break;
            case "Fall":
                output.value = 2;
                impactTrait = `Trait_ForceMove`;
                break;
            case "Jump": {
                let height = parseInt(effect.effect);
                output.value += (isNaN(height) ? 0 : height) * 2;
                break;
            }
            case "Temporal":
                output.value *= 3;
                break;
        }
        let message = `(${effect.subType == "" ? "Move" : effect.subType})`;

        this.addPointsRubric(output.value, message);
        if (impactTrait != "") {
            this.isCombat = true;
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait(impactTrait);
        }
        this.addDefensePointsRubric(effect, output.value);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getEnAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value -= 1;
        output.value *= 2;
        let message = `(EN)`;
        this.addPointsRubric(output.value, message);
        this.addImpactTrait("TechFilterType_Utility");
        this.addImpactTrait(`Trait_EN`);
    }

    getFreeFocusAssessment() {
        this.addImpactTrait("TechFilterType_Utility");
        this.addPointsRubric(10, "(Free Focus)");
    }

    getStatusAssessment(effect, attributeHandler) {
        let state = WuxDef.Get(effect.effect);
        let value = 0;
        let message = "";
        switch (effect.subType) {
            case "Set":
            case "Add":
            case "Enhancing":
            case "Focus":
            case "Self":
                let onlySingleTarget = ["Paralyzed", "Frozen"];
                if (this.technique.target != "Target" && onlySingleTarget.includes(state.getTitle())) {
                    this.isInvalid = true;
                    this.invalidReason = `${state.getTitle()} can only target a single target`;
                    return;
                }

                value = parseInt(state.points);
                let formula = this.getDiceFormula(effect, attributeHandler);
                if (formula.value > 0) {
                    value *= formula.value;
                }
                message = `(Add ${state.getTitle()})`;

                if (effect.defense == "Enhance") {
                    this.addPointsRubric(0, `${value} (max ${this.getEnhancementPoints()})`);
                    return;
                }
                if (effect.defense == "WillBreak") {
                    message = `${value} (Add ${state.getTitle()})`;
                    this.addPointsRubric(0, message);
                }
                else {
                    let onlySingleTargetWillbreak = ["Jolted", "Blinded"];
                    if (this.technique.target != "Target" && onlySingleTargetWillbreak.includes(state.getTitle())) {
                        this.isInvalid = true;
                        this.invalidReason = `${state.getTitle()} can only target a single target`;
                        return;
                    }

                    this.addPointsRubric(value, message);
                    if (!state.isBeneficial) {
                        this.addDefensePointsRubric(effect, value, message);
                    }
                    this.addTargetedPointsRubric(effect, value);

                    if (effect.effect != "Stat_Engaged") {
                        this.statusCount++;
                        if (this.statusCount > 1) {
                            value = Math.floor(this.statusCount * 4);
                            this.addPointsRubric(value, `(MultiStat)`);
                        }
                    }
                }
                if (state.isBeneficial || !this.isCombat) {
                    this.addImpactTrait("TechFilterType_Utility");
                }
                if (state.type == "Emotion") {
                    this.addImpactTrait("TechFilterType_Emotion");
                }
                if (state.canBeFiltered) {
                    this.addImpactTrait(state.name);
                }
                break;
            case "Trigger":
                value = Math.floor(parseInt(state.points) * 0.5);
                message = `(Trigger ${state.getTitle()})`;

                this.addPointsRubric(value, message);
                this.addDefensePointsRubric(effect, value, message);
                this.addTargetedPointsRubric(effect, value);
                break;
            case "Remove":
                value = Math.floor(parseInt(state.points) * 0.75);
                message = `(Remove ${state.getTitle()})`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(value, message);
                    this.addImpactTrait(`Trait_Cleanse:${state.name}`);
                }
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");

                if (effect.effect != "Stat_Engaged") {
                    this.statusCount++;
                    if (this.statusCount > 1) {
                        let subvalue = Math.max(-2, -1 * value);
                        this.addPointsRubric(subvalue, `(MultiStat)`);
                    }
                }
                break;
            case "Choose":
                value = parseInt(state.points) + 2;
                message = `(Choose ${state.getTitle()})`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(value, message);
                    this.addImpactTrait("TechFilterType_Utility");
                }
                this.addTargetedPointsRubric(effect, value);
                break;
            case "Remove Any":
                value = 10;
                message = `(Remove Any)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");
                break;
            case "Remove All":
                value = 20;
                message = `(Remove All)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");
                break;
            case "Remove Will":
                value = 14;
                message = `(Remove Will)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");
                break;
        }
    }

    getBreakFocusAssessment() {
        let message = `(Break Focus)`;
        this.addPointsRubric(28, message);
        this.addImpactTrait("TechFilterType_Utility");
    }

    getCallAssistAssessment() {
        let message = `(Assist)`;
        this.addPointsRubric(5, message);
        this.addImpactTrait("TechFilterType_Utility");
    }

    addDefensePointsRubric(effect, points) {
        if (effect.defense == "Core") {
            let pointTotal = Math.ceil(points * this.defenseModifier);
            if (pointTotal != 0) {
                this.addPointsRubric(pointTotal, `(${this.defenseModName})`);
            }
        } else if (effect.defense == "") {
            let pointTotal = Math.ceil(points * 0.65);
            this.addPointsRubric(pointTotal, `(Unavoidable)`);
        }
    }

    addTargetedPointsRubric(effect, points) {
        if (effect.target == "Self") {
            return;
        }
        let output = this.getTargetPointsRubric(effect, points);
        if (output.points == 0) {
            return;
        }
        this.addPointsRubric(output.points, `(${output.name})`);
        this.pointsRubric += "\n";
    }

    getTargetPointsRubric(effect, points) {
        let output = {
            points: 0,
            name: 0
        }

        switch (this.target) {
            case "Targets":
            case "Spaces":
            case "Objects":
                output.points = Math.floor(points * (this.size - 1) * 0.65);
                output.name = `${this.size} ${this.target}`;
                break;
            case "Blast":
            case "Blast(3H)":
            case "Blast(5H)":
                output.points = Math.floor(points * this.getAreaPointMod(0.75, 1));
                output.name = `${this.target} ${this.size}`;
                break;
            case "Radial":
                output.points = Math.floor(points * this.getAreaPointMod(0.6, 1));
                output.name = `${this.target} ${this.size}`;
                break;
            case "Cone":
            case "Line":
                output.points = Math.floor(points * this.getAreaPointMod(0.4, 0.66));
                output.name = `${this.target} ${this.size}`;
                break;
            case "Wide Line":
                output.points = Math.floor(points * this.getAreaPointMod(0.6, 0.66));
                output.name = `${this.target} ${this.size}`;
                break;
        }

        if (this.onEnterEffect && effect.type != "Terrain") {
            output.points += 4;
            output.name += `${output.name != "" ? "; " : ""}On Enter`;
        }

        return output;
    }

    getAreaPointMod(baseMod, incrementMod) {
        let i = this.size;
        let output = 0;
        while (i > 0) {
            output += baseMod;
            baseMod *= incrementMod;
            i--;
        }
        return output;
    }

    addPointsRubric(points, message) {
        this.points += points;
        this.pointBreakdown[this.pointBreakdown.length - 1].points += points;
        if (this.pointsRubric != "") {
            this.pointsRubric += " + ";
        }
        if (this.pointBreakdown[this.pointBreakdown.length - 1].rubric != "") {
            this.pointBreakdown[this.pointBreakdown.length - 1].rubric += ` + ${points}`;
        }
        this.pointsRubric += `${points}${message}`;
        this.pointBreakdown[this.pointBreakdown.length - 1].rubric += message;
    }

    getDiceFormula(effect, attributeHandler) {
        let value = effect.formula.getValue(attributeHandler);
        let lowValue = value + effect.getLowDiceValue();
        let highValue = value + effect.getHighDiceValue();
        value += effect.getAverageDiceValue();
        return {value: value, lowValue: lowValue, highValue: highValue};
    }

    addImpactTrait(traitName) {
        let traitParts = traitName.split("-");
        let traitBase = traitParts[0];
        let traitType = "";
        if (traitParts.length > 1) {
            traitType = traitParts[1];
        }
        if (this.impactTraits[traitBase] == undefined || this.impactTraits[traitBase] == "") {
            this.impactTraits[traitBase] = traitType;
        }
    }
}

var WuxSheetMain = WuxSheetMain || (function () {
    const sectionBlockHeaderFooter = function () {
        return `<div class="wuxSectionHeaderFooter"></div>`;
    };
    const customInput = function (type, fieldName, className, extras) {
        if (extras == undefined) {
            extras = "";
        }
        return `<input type="${type}" class="${className}" name="${fieldName}"${extras} />`
    };

    var interactionElement = interactionElement || (function () {
        'use strict';
        var
            build = function (isExpanding, contents) {
                return `<div class="wuxInteractiveBlock${isExpanding ? " wuxInteractiveExpandingBlock" : ""}">\n${contents}\n</div>`;
            },

            buildCheckboxInput = function (fieldName, contents) {
                return `<div class="wuxInteractiveBlock">
                ${checkboxBlockIcon(fieldName, contents)}
                </div>`;
            },

            buildTooltipCheckboxInput = function (fieldName, infoFieldName, contents, infoContents) {

                return `<div class="wuxInteractiveBlock wuxTooltip">
                <span class="wuxTooltipText">${checkboxBlockIcon(fieldName, contents)}</span>
                <div class="wuxTooltipContent">\n${infoContents}\n</div>
                </div>`;
            },

            buildTooltipRadioInput = function (fieldName, infoFieldName, value, contents, infoContents) {
                return `<div class="wuxInteractiveBlock">
                ${WuxSheetMain.Info.Button(infoFieldName)}
                ${radioBlockIcon(fieldName, value, contents)}
                ${WuxSheetMain.HiddenField(infoFieldName, `<div class="wuxInfoContent">\n${infoContents}\n</div>`)}
                </div>`;
            },

            buildTooltipSelectInput = function (fieldName, infoFieldName, definitionGroup, showEmpty, className, contents, infoContents) {
                return `<div class="wuxInteractiveBlock">
                ${WuxSheetMain.Info.Button(infoFieldName)}
                ${select(fieldName, definitionGroup, showEmpty, className)}
                <div class="wuxInteractiveSelectContent">
                ${contents}
                </div>
                ${WuxSheetMain.HiddenField(infoFieldName, `<div class="wuxInfoContent">\n${infoContents}\n</div>`)}
                </div>`;

            },

            expandableBlockIcon = function (fieldName) {
                let flagName = "wuxInteractiveExpandIcon-flag";
                return `<div class="wuxInteractiveInnerExpandBlock">\n${customInput("checkbox", fieldName, "wuxInteractiveExpandingContent-flag")}
                ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveExpandIcon">&#9662;</span>
                ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveExpandAuxIcon">&#9656;</span>
                </div>`;
            },

            expandableBlockEmptyIcon = function () {
                return `<div class="wuxInteractiveInnerExpandBlock">\n<span class="wuxInteractiveExpandIcon">&nbsp;</span>\n</div>`;
            },

            innerBlock = function (contents) {
                return `<div class="wuxInteractiveInnerBlock">\n${contents}\n</div>`;
            },

            expandableBlockContents = function (fieldName, contents) {
                return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="${fieldName}">\n<div class="wuxInteractiveExpandingContent">\n${contents}\n</div>`;
            },

            checkboxBlockIcon = function (fieldName, contents, extras) {
                let flagName = "wuxInteractiveIcon-flag";
                return `<div class="wuxInteractiveInnerBlock">
                ${customInput("checkbox", fieldName, "wuxInteractiveContent-flag", extras)}
                    <div class="wuxInteractiveContent">
                    ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveIcon">&#9635;</span>
                    ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveAuxIcon">&#9634;</span>
                    ${customInput("hidden", fieldName, flagName)}\n${contents != undefined ? contents : ""}
                    </div>
                </div>`;
            },

            radioBlockIcon = function (fieldName, value, contents) {
                let flagName = "wuxInteractiveIcon-flag";
                return `<div class="wuxInteractiveInnerBlock">
                ${customInput("radio", fieldName, "wuxInteractiveContent-flag", ` value="${value}"`)}
                    <div class="wuxInteractiveContent">
                    ${customInput("radio", fieldName, "wuxInput", ` value="${value}"`)}
                    ${customInput("hidden", fieldName, flagName)}\n${contents != undefined ? contents : ""}
                    </div>
                </div>`;
            }

        return {
            Build: build,
            BuildCheckboxInput: buildCheckboxInput,
            BuildTooltipCheckboxInput: buildTooltipCheckboxInput,
            BuildTooltipRadioInput: buildTooltipRadioInput,
            BuildTooltipSelectInput: buildTooltipSelectInput,
            ExpandableBlockIcon: expandableBlockIcon,
            ExpandableBlockEmptyIcon: expandableBlockEmptyIcon,
            InnerBlock: innerBlock,
            ExpandableBlockContents: expandableBlockContents,
            CheckboxBlockIcon: checkboxBlockIcon
        }
    }());
    'use strict';

    const build = function (contents) {
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        <div class="wuxMainContent">
        ${contents}
        </div>`;
        },

        tab = function (contents) {
            return `<div class="wuxTab">\n${contents}\n</div>`;
        },

        tabHeader = function (contents) {
            return `<div class="wuxTabHeader">\n${contents}\n</div>`;
        },

        collapsibleTab = function (fieldName, title, contents) {
            return `<div class="wuxSegment">
            ${customInput("checkbox", fieldName, "wuxTab-flag", ` checked="checked"`)}
            ${tabHeader(interactionElement.ExpandableBlockIcon(fieldName) + (title.startsWith("<") ? title : `<span>${title}</span>`))}
            ${tab(contents)}
            </div>`;
        },

        tabBlock = function (contents) {
            return `<div class="wuxSectionBlock wuxLayoutItem">\n<div class="wuxTabContent">\n${contents}\n</div>\n</div>`;
        },

        collapsibleHeader = function (headerName, hiddenField, additionalButtons) {
            let headerButtons = `<span class="wuxStyleHeaderButtonContainer">
                        ${additionalButtons != undefined ? additionalButtons : ""}
                        ${WuxSheetMain.HiddenSpanFieldToggle(hiddenField,
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8857;</span> Show", "wuxStyleHeaderButton"),
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8853;</span> Hide", "wuxStyleHeaderButton")
            )}
            </span>`;
            return headerButtons + headerName;
        },
        collapsibleHeaderInverse = function (headerName, hiddenField, additionalButtons) {
            let headerButtons = `<span class="wuxStyleHeaderButtonContainer">
                        ${additionalButtons != undefined ? additionalButtons : ""}
                        ${WuxSheetMain.HiddenSpanFieldToggle(hiddenField,
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8853;</span> Hide", "wuxStyleHeaderButton"),
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8857;</span> Show", "wuxStyleHeaderButton")
            )}
            </span>`;
            return headerButtons + headerName;
        },

        sectionBlock = function (contents) {
            return `<div class="wuxSectionBlock">\n${contents}\n</div>`;
        },

        sectionBlockHeader = function (contents) {
            return `<div class="wuxSectionHeader">\n${contents}\n</div>\n${sectionBlockHeaderFooter()}`;
        },

        sectionBlockStyleHeader = function (contents) {
            return `<div class="wuxStyleSectionHeader">\n${contents}\n</div>\n${sectionBlockHeaderFooter()}`;
        },

        sectionBlockContents = function (contents) {
            return `<div class="wuxSectionContent">\n${contents}\n</div>`;
        },

        collapsibleSection = function (fieldName, title, contents) {
            return sectionBlock(`${customInput("checkbox", fieldName, "wuxSectionContent-flag")}
            ${sectionBlockHeader(interactionElement.ExpandableBlockIcon(fieldName) + `<span>${title}</span>`)}
            ${sectionBlockContents(contents)}`);
        },

        collapsibleStyleSection = function (fieldName, title, contents) {
            return sectionBlock(`${customInput("checkbox", fieldName, "wuxSectionContent-flag")}
            ${sectionBlockStyleHeader(interactionElement.ExpandableBlockIcon(fieldName) + title)}
            ${sectionBlockContents(contents)}`);
        },

        // string formatting
        header = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxHeader">${contents}</${htmlType}>`;
        },

        header2 = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxHeader2">${contents}</${htmlType}>`;
        },

        subheader = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxSubheader">${contents}</${htmlType}>`;
        },

        desc = function (contents) {
            return `<span class="wuxDescription">${contents}</span>`;
        },

        descField = function (fieldName) {
            return `<span class="wuxDescription" name="${fieldName}"></span>`;
        },

        span = function (fieldName, contents) {
            if (contents == undefined) {
                contents = "";
            }
            return `<span name="${fieldName}">${contents}</span>`;
        },

        row = function (contents) {
            return `<div class="wuxRow">${contents}</div>`;
        },

        multiRow = function (contents) {
            return `<div class="wuxMultiRow">${contents}</div>`;
        },

        input = function (type, fieldName, value, placeholder) {
            value = value == undefined ? "" : ` value="${value}"`;
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return customInput(type, fieldName, "wuxInput", value + placeholder);
        },

        inputLabel = function (contents) {
            return `<div class="wuxInputLabel">${contents}</div>`;
        },

        textarea = function (fieldName, className, placeholder) {
            if (className == undefined) {
                className = "";
            } else {
                className = ` class="${className}"`;
            }
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return `<textarea${className} name="${fieldName}"${placeholder}></textarea>`;
        },

        select = function (fieldName, definitionGroup, showEmpty, className) {
            if (className == undefined) {
                className = "wuxInput";
            } else {
                className = `wuxInput ${className}`;
            }

            let output = `<select class="${className}" name="${fieldName}" value="0">`;

            if (showEmpty == undefined || showEmpty) {
                output += `\n<option value="0">-</option>`;
            }

            for (let i = 0; i < definitionGroup.length; i++) {
                output += `\n<option value="${definitionGroup[i].variable}">${definitionGroup[i].title}</option>`;
            }
            output += `\n</select>`;
            return output;
        },

        button = function (fieldName, contents, className, value) {
            className = className == undefined ? "" : ` ${className}`;
            value = value == undefined ? "" : ` value="${value}"`;
            return `<div class="wuxButton${className}">
            <input type="checkbox" name="${fieldName}"${value}>
            <span>${contents}</span>
            </div>`;
        },

        pictosButton = function (fieldName, contents, className) {
            if (className == undefined) {
                className = "";
            } else {
                className = " " + className;
            }
            return `<div class="wuxPictosButton${className}">\n<input type="checkbox" name="${fieldName}">\n<span>${contents}</span>\n </div>`;
        },

        multiRowGroup = function (contents, containerCallback, rowSize) {
            let output = "";
            let rowContents = "";
            for (let i = 0; i < contents.length; i++) {
                rowContents += contents[i];
                if (i % rowSize == rowSize - 1) {
                    output += containerCallback(rowContents);
                    rowContents = "";
                }
            }
            if (rowContents != "") {
                output += containerCallback(rowContents);
            }

            return output;
        },

        hiddenField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenField">\n${contents}\n</div>\n`;
        },

        hiddenAuxField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenAuxField">\n${contents}\n</div>\n`;
        },

        hiddenFieldToggle = function (fieldName, onContents, offContents) {
            return `${hiddenField(fieldName, onContents)}
                ${hiddenAuxField(fieldName, offContents)}`;
        },

        hiddenIndexField = function (fieldName, index, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenIndexField${index}">\n${contents}\n</div>\n`;
        },

        hiddenIndexFieldWithVariable = function (fieldName, indexFieldName, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenIndexField" name="${indexFieldName}">\n${contents}\n</div>\n`;
        },

        hiddenUniqueIndexField = function (fieldName, index, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenUniqueIndexField${index}">\n${contents}\n</div>\n`;
        },

        hiddenAncestryField = function (ancestryType, contents) {
            let fieldName = "";
            switch (ancestryType) {
                case "Spirit":
                    fieldName = "wuxHiddenAncestrySpirit";
                    break;
            }
            return `<input type="hidden" class="wuxHiddenAncestry-flag" name="${WuxDef.GetAttribute("Ancestry")}" value="0">
            <div class="${fieldName}">\n${contents}\n</div>\n`;
        },

        hiddenSpanField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <span class="wuxHiddenInlineField">\n${contents}\n</span>\n`;
        },

        hiddenAuxSpanField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <span class="wuxHiddenInlineAuxField">\n${contents}\n</span>\n`;
        },

        hiddenSpanFieldToggle = function (fieldName, onContents, offContents) {
            return `${hiddenSpanField(fieldName, onContents)}
                ${hiddenAuxSpanField(fieldName, offContents)}`;
        },

        subMenuButton = function (fieldName, contents) {
            return `<div class="wuxSubMenuButton">
                <input type="checkbox" name="${fieldName}">
                <span class="wuxSubMenuText">l</span>
                <input type="hidden" class="wuxSubMenu-flag" name="${fieldName}" value="0">
                <div class="wuxSubMenuContent">\n${contents}\n</div>
            </div>`;
        },

        subMenuOptionButton = function (fieldName, contents, checkboxValue) {
            return `<div class="wuxButton wuxSubMenuOptionButton">
                <input type="checkbox" name="${fieldName}"${checkboxValue != undefined ? ` value="${checkboxValue}"` : ""}>
                ${contents}
            </div>`;
        },

        subMenuOptionRollButton = function (fieldName, contents, value) {
            return `<button class="wuxButton wuxSubMenuOptionButton" type="roll" value="${value}">
                <span>${contents}</span>
            </button>`;
        },

        subMenuOptionRollButtonWithVariableInput = function (fieldName, contents, variableName) {
            return `<input type="hidden" name="${fieldName}" value="0"/>
            <button class="wuxButton wuxSubMenuOptionButton" type="roll" value="@{${variableName}}">
                <span name="${WuxDef.GetAttribute("Chat_PostName")}">${contents}</span>
            </button>`;
        },

        subMenuOptionText = function (fieldName, placeholder) {
            return `<div class="wuxButton wuxSubMenuOptionButton">
                <input type="text" name="${fieldName}"${placeholder != undefined ? ` placeholder="${placeholder}"` : ""}>
            </div>`;
        };

    var info = info || (function () {
            'use strict';

            var
                button = function (fieldName, extras) {
                    return `<div class="wuxInfoButton"><input type="checkbox" name="${fieldName}" ${extras}><span>?</span></div>`;
                },

                contents = function (fieldName, contents) {
                    let output = `<div class="wuxInfoContent">\n${contents}\n</div>`;
                    return WuxSheetMain.HiddenField(fieldName, output);
                },

                defaultContents = function (definition) {
                    let output = "";
                    output += WuxDefinition.TooltipDescription(definition);
                    return contents(definition.getAttribute(WuxDef._info), output);
                }

            return {
                Button: button,
                Contents: contents,
                DefaultContents: defaultContents
            };
        }()),

        tooltip = tooltip || (function () {
            'use strict';

            var
                button = function (fieldName, contents) {
                    return `<div class="wuxTooltipButtonContainer">
                <div class="wuxTooltipButton wuxFloatRight">
                <input type="checkbox" name="${fieldName}">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
                },

                icon = function (contents) {
                    return `<div class="wuxTooltipButtonContainer">
                <div class="wuxTooltipButton wuxFloatRight">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
                },

                text = function (text, contents) {
                    return `<span class="wuxTooltip">
                <span class="wuxTooltipText">\n${text}\n</span>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </span>`;
                },

                inline = function (text, contents) {
                    return `<span class="wuxTooltip"><span class="wuxTooltipText">${text}</span><span class="wuxTooltipContent">${contents}</span></span>`;
                }

            return {
                Button: button,
                Icon: icon,
                Text: text,
                Inline: inline
            };
        }()),

        table = table || (function () {
            'use strict';

            var
                build = function (headers, data) {
                    let output = ``;
                    for (let i = 0; i < headers.length; i++) {
                        output += flexTableGroup(`${flexTableHeader(headers[i])}\n${flexTableData(data[i])}\n`);
                    }
                    return flexTable(output);
                },

                flexTable = function (contents) {
                    return `<div class="wuxFlexTable">\n${contents}\n</div>`;
                },

                flexTableReverse = function (contents) {
                    return `<div class="wuxFlexTable wuxFlexTableReverse">\n${contents}\n</div>`;
                },

                flexTableGroup = function (contents, className) {
                    return `<div class="wuxFlexTableItemGroup${className != undefined ? `${className}` : ""}">\n${contents}\n</div>`;
                },

                flexTableHeader = function (data) {
                    return `<span class="wuxFlexTableItemHeader">${data}</span>`;
                },

                flexTableSubheader = function (data) {
                    return `<span class="wuxFlexTableItemSubheader">${data}</span>`;
                },

                flexTableData = function (data) {
                    return `<span class="wuxFlexTableItemData">${data}</span>`;
                },

                flexTableInput = function (type, fieldName, placeholder) {
                    return `<input type="${type}" class="wuxFlexTableItemData wuxSizeSmall" name="${fieldName}" placeholder="${placeholder}">`;
                }

            return {
                Build: build,
                FlexTable: flexTable,
                FlexTableReverse: flexTableReverse,
                FlexTableGroup: flexTableGroup,
                FlexTableHeader: flexTableHeader,
                FlexTableSubheader: flexTableSubheader,
                FlexTableData: flexTableData,
                FlexTableInput: flexTableInput
            };
        }()),

        slotDisplay = function (label, stateAttrName, currentAttrName, maxAttrName) {
            return `<div class="wuxSlotSection"><span class="wuxSlotLabel">${label}</span><input type="hidden" class="wuxSlotStateFlag" name="${stateAttrName}" value="0"><span class="wuxSlotData"><span name="${currentAttrName}" value="0">0</span> <span class="wuxFontSize7">/ <span name="${maxAttrName}">0</span></span></span></div>`;
        },

        distinctSection = distinctSection || (function () {
            'use strict';
            var
                build = function (contents) {
                    return `<div class="wuxDistinctSection">${contents}</div>`;
                },

                field = function (title, contents) {
                    return `<div class="wuxDistinctField">
                    <span class="wuxDistinctTitle">${title}</span>
                    <span class="wuxDistinctData">${contents}</span>
                    </div>`;
                },

                inputField = function (title, contentType, contentName, placeholder) {
                    return `<div class="wuxDistinctField">
                    <span class="wuxDistinctTitle">${title}</span>
                    <input class="wuxDistinctData" type="${contentType}" name="${contentName}" ${placeholder ? `placeholder="${placeholder}"` : ""}>
                    </div>`;
                }
            return {
                Build: build,
                Field: field,
                InputField: inputField
            };
        }()),

        chat = chat || (function () {
            'use strict';
            var
                build = function () {
                    let contents = "";

                    contents += tags();
                    contents += chatType();
                    contents += chatPostTarget();
                    contents += WuxSheetMain.Row("&nbsp;");
                    contents += textArea();

                    let postTargetAttr = WuxDef.GetAttribute("Chat_PostTarget");
                    contents += WuxSheetMain.HiddenAuxField(postTargetAttr,
                        repeatingEmoteButtons("RepeatingActiveEmotes"));
                    contents += WuxSheetMain.HiddenField(postTargetAttr,
                        repeatingEmoteButtons("RepeatingActiveEmotesNotes"));

                    return contents;
                },

                tags = function () {
                    return WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_Target"));
                },

                chatType = function () {
                    return WuxSheetMain.Row(WuxSheetMain.Select(WuxDef.GetAttribute("Chat_Type"),
                        WuxDef.Filter([new DatabaseFilterData("group", "ChatType")]), false));
                },

                chatPostTarget = function () {
                    return WuxSheetMain.Row(WuxSheetMain.Select(WuxDef.GetAttribute("Chat_PostTarget"),
                        WuxDef.Filter([new DatabaseFilterData("group", "EmotePostType")]), false));
                },

                textArea = function () {
                    return WuxSheetMain.Textarea(WuxDef.GetAttribute("Chat_Message"), "wuxInput wuxHeight150");
                },

                repeatingEmoteButtons = function (groupName) {
                    return `<div class="wuxNoRepControl wuxEmotePostGroup">
                        <fieldset class="${WuxDef.GetVariable(groupName)}">
                            ${groupName == "RepeatingActiveEmotes" ? emotePostButton() : emoteNotePostButton()}
                            <input type="hidden" name="${WuxDef.GetAttribute("Chat_PostURL")}">
                        </fieldset>
                    </div>`;
                },

                emotePostButton = function () {
                    return `<button class="wuxPostButton" type="roll" value="${senderPostMessage()}">
                    <span name="${WuxDef.GetAttribute("Chat_PostName")}">emote</span>
                    </button>`;
                },

                emoteNotePostButton = function () {
                    return WuxSheetMain.Button(WuxDef.GetAttribute("Chat_PostEmoteNote"),
                        `<span name="${WuxDef.GetAttribute("Chat_PostName")}">emote</span>`, "wuxPostButton");
                },

                senderPostMessage = function () {
                    let chatMessage = `&{template:@{${WuxDef.GetVariable("Chat_Type")}}} `;
                    chatMessage += `{{url=@{${WuxDef.GetVariable("Chat_PostURL")}}}} `;
                    chatMessage += `{{emote=@{${WuxDef.GetVariable("Chat_PostName")}}}} `;
                    chatMessage += `{{name=@{${WuxDef.GetVariable("DisplayName")}}}} `;
                    chatMessage += `{{title=@{${WuxDef.GetVariable("DisplayName")}}@{${WuxDef.GetVariable("Chat_Target")}}}} `;
                    chatMessage += `{{language=@{${WuxDef.GetVariable("Chat_Language")}}}} `;
                    chatMessage += `{{message=@{${WuxDef.GetVariable("Chat_Message")}}}} `;
                    chatMessage += `@{${WuxDef.GetVariable("Chat_LanguageTag")}}`;
                    return chatMessage;
                }
            return {
                Build: build
            }
        }()),

        language = language || (function () {
            'use strict';
            var
                build = function () {
                    let contents = "";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_LanguageTag"), "wuxInput");

                    let languageAttr = WuxDef.GetAttribute("Chat_Language");
                    let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
                    for (let i = 0; i < languageFilters.length; i++) {
                        contents += WuxSheetMain.HiddenField(languageFilters[i].getAttribute(WuxDef._filter),
                            WuxSheetMain.InteractionElement.BuildTooltipRadioInput(languageAttr, languageFilters[i].title,
                                languageTitle(languageFilters[i]), WuxDefinition.TooltipDescription(languageFilters[i]))
                        );
                    }
                    return contents;
                },

                languageTitle = function (languageDef) {
                    return `<span class="wuxHeader2">${languageDef.title}</span><span class="wuxSubheader"> - ${languageDef.location}</span>`;
                }
            return {
                Build: build
            }

        }())

    ;
    return {
        Build: build,
        Tab: tab,
        TabHeader: tabHeader,
        CollapsibleTab: collapsibleTab,
        TabBlock: tabBlock,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleHeaderInverse: collapsibleHeaderInverse,
        SectionBlock: sectionBlock,
        SectionBlockHeader: sectionBlockHeader,
        SectionBlockHeaderFooter: sectionBlockHeaderFooter,
        SectionBlockContents: sectionBlockContents,
        CollapsibleSection: collapsibleSection,
        CollapsibleStyleSection: collapsibleStyleSection,
        Header: header,
        Header2: header2,
        Subheader: subheader,
        Desc: desc,
        DescField: descField,
        Span: span,
        Row: row,
        MultiRow: multiRow,
        Input: input,
        CustomInput: customInput,
        InputLabel: inputLabel,
        Textarea: textarea,
        Select: select,
        Button: button,
        PictosButton: pictosButton,
        MultiRowGroup: multiRowGroup,
        HiddenField: hiddenField,
        HiddenAuxField: hiddenAuxField,
        HiddenFieldToggle: hiddenFieldToggle,
        HiddenIndexField: hiddenIndexField,
        HiddenIndexFieldWithVariable: hiddenIndexFieldWithVariable,
        HiddenUniqueIndexField: hiddenUniqueIndexField,
        HiddenAncestryField: hiddenAncestryField,
        HiddenSpanField: hiddenSpanField,
        HiddenAuxSpanField: hiddenAuxSpanField,
        HiddenSpanFieldToggle: hiddenSpanFieldToggle,
        SubMenuButton: subMenuButton,
        SubMenuOptionButton: subMenuOptionButton,
        SubMenuOptionRollButton: subMenuOptionRollButton,
        SubMenuOptionRollButtonWithVariableInput: subMenuOptionRollButtonWithVariableInput,
        SubMenuOptionText: subMenuOptionText,
        Info: info,
        Tooltip: tooltip,
        Table: table,
        DistinctSection: distinctSection,
        InteractionElement: interactionElement,
        Chat: chat,
        Language: language,
        SlotDisplay: slotDisplay
    };
}());

var WuxDefinition = WuxDefinition || (function () {
    const definitionContents = function (definitionData) {
        let expandContents = "";
        if (definitionData.subGroup != "") {
            expandContents += WuxSheetMain.Desc(`<em>${definitionData.subGroup}</em>`);
        }
        expandContents += `\n${WuxSheetMain.Desc(definitionData.getDescription(`</span><span class="wuxDescription">`))}`;
        return expandContents;
    };
    const values = {};
    'use strict';

    const get = function () {
            return undefined;
        },
        getDefinition = function (key) {
            if (values[key] == undefined) {
                let definition = new DefinitionData();
                definition.name = `${key} Not Found`;
                return definition;
            }
            switch (values[key]["group"]) {
                case "Technique":
                    return new TechniqueDefinitionData(values[key]);
                case "Style":
                    return new TechniqueStyleDefinitionData(values[key]);
                case "Language":
                    return new LanguageDefinitionData(values[key]);
                case "Job":
                    return new JobDefinitionData(values[key]);
                case "Status":
                    return new StatusDefinitionData(values[key]);
                case "Goods":
                case "Gear":
                case "Consumable":
                    return new ItemDefinitionData(values[key]);
                default:
                    return new DefinitionData(values[key]);
            }
        },
        getStyle = function (key) {
            if (values[key] == undefined) {
                return undefined;
            }
            return new TechniqueStyle(values[key]);
        },
        getTechnique = function (key) {
            if (values[key] == undefined) {
                return undefined;
            }
            return new TechniqueData(values[key]);
        },
        getItem = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new UsableItemData(values[key]);
        },
        getGoods = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new GoodsData(values[key]);
        },
        getBasicPerk = function (key) {
            if (values[key] == undefined) {
                return undefined;
            }
            return new PerkData(values[key]);
        },
        getAttribute = function (key, mod, mod1) {
            let data = get(key);
            return data.getAttribute(mod, mod1);
        },
        getVariable = function (key, mod, mod1) {
            let data = get(key);
            return data.getVariable(mod, mod1);
        },
        getUntypedAttribute = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getAttribute(`-${getVariable(key, mod, mod1)}`);
        },
        getUntypedVariable = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getVariable(`-${getVariable(key, mod, mod1)}`);
        },
        getAbbreviation = function (key) {
            let data = get(key);
            if (data.abbreviation == "") {
                return data.title;
            } else {
                return data.abbreviation;
            }
        },
        getVariables = function (key, array, mod1) {
            let output = [];
            let data = get(key);
            for (let i = 0; i < array.length; i++) {
                output.push(data.getVariable(array[i], mod1));
            }
            return output;
        },
        getGroupVariables = function (filterData, mod1, mod2) {
            let data = filter(filterData);
            let output = [];
            for (let i = 0; i < data.length; i++) {
                output.push(data[i].getVariable(mod1, mod2));
            }
            return output;
        },
        getGroupVariablesTechnique = function (filterData, mod1, mod2) {
            let data = filter(filterData);
            let output = [];
            for (let i = 0; i < data.length; i++) {
                let definition = data[i].createDefinition(WuxDef.Get("Technique"));
                output.push(definition.getVariable(mod1, mod2));
            }
            return output;
        },
        getGroupVariablesStyle = function (filterData, mod1, mod2) {
            let data = filter(filterData);
            let output = [];
            for (let i = 0; i < data.length; i++) {
                let definition = data[i].createDefinition(WuxDef.Get("Style"));
                output.push(definition.getVariable(mod1, mod2));
            }
            return output;
        },
        getTitle = function (key) {
            let data = get(key);
            return data.title;
        },
        getDescription = function (key) {
            let data = get(key);
            return data.getDescription();
        },
        getName = function (name, baseDefinition) {
            return baseDefinition.isResource ? `${name}` : `${baseDefinition.abbreviation}_${name}`;
        },
        
        sortFilteredTechniquesByRequirement = function (techniquesFilter) {
            let technique = {};

            let techniquesByRequirements = new Dictionary();
            for (let i = 0; i <= 9; i++) {
                techniquesByRequirements.add(i, new Dictionary());
            }

            for (let i = 0; i < techniquesFilter.length; i++) {
                technique = new TechniqueData(techniquesFilter[i]);
                if (techniquesByRequirements.get(technique.tier) != undefined) {
                    if (!techniquesByRequirements.get(technique.tier).has(technique.affinity)) {
                        techniquesByRequirements.get(technique.tier).add(technique.affinity, []);
                    }
                    techniquesByRequirements.get(technique.tier).get(technique.affinity).push(technique);
                }
            }

            return techniquesByRequirements;
        },
        getByVariable = function (key) {

        },

        displayEntry = function (dictionary, key) {
            let output = "";
            let entryData = dictionary.get(key).descriptions;

            output += WuxSheetMain.Header2(key);
            for (let i = 0; i < entryData.length; i++) {
                output += "\n" + WuxSheetMain.Desc(entryData[i]);
            }

            return output;
        },
        tooltipDescription = function (definitionData) {
            return `${WuxSheetMain.Header2(definitionData.title)}\n${definitionContents(definitionData)}`;
        },
        displayCollapsibleTitle = function (definitionData) {
            if (definitionData == undefined) {
                return "";
            }
            let expandContents = definitionContents(definitionData);
            let expandFieldName = definitionData.getVariable(WuxDef._expand);

            let output = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
            ${WuxSheetMain.Header(definitionData.name, "span")}
            ${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

            return WuxSheetMain.InteractionElement.Build(true, output);
        },
        infoHeader = function (definition) {
            return `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(definition.getAttribute(WuxDef._info))}${definition.title}`)}
            ${WuxSheetMain.Info.DefaultContents(definition)}`;
        },

        buildHeader = function (definition) {
            return WuxSheetMain.Header2(`${WuxSheetMain.Tooltip.Text(definition.title, WuxDefinition.TooltipDescription(definition))}`);
        },

        buildText = function (definition, textContents) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Desc(textContents);
        },

        buildTextInput = function (definition, fieldName) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Input("text", fieldName);
        },

        buildTextarea = function (definition, fieldName, className, placeholder) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Textarea(fieldName, className, placeholder);
        },

        buildNumberInput = function (definition, fieldName, defaultValue) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Input("number", fieldName, defaultValue);
        },

        buildNumberLabelInput = function (definition, fieldName, labelContent) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.MultiRow(WuxSheetMain.Input("number", fieldName, "", "0") + WuxSheetMain.InputLabel(labelContent));
        },

        buildSelect = function (definition, fieldName, definitionGroup, showEmpty) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Select(fieldName, definitionGroup, showEmpty);
        }
    ;
    return {
        GetDefinition: getDefinition,
        GetStyle: getStyle,
        GetTechnique: getTechnique,
        GetItem: getItem,
        GetGoods: getGoods,
        GetBasicPerk: getBasicPerk,
        GetAttribute: getAttribute,
        GetVariable: getVariable,
        GetUntypedAttribute: getUntypedAttribute,
        GetUntypedVariable: getUntypedVariable,
        GetAbbreviation: getAbbreviation,
        GetVariables: getVariables,
        GetGroupVariables: getGroupVariables,
        GetGroupVariablesTechnique: getGroupVariablesTechnique,
        GetGroupVariablesStyle: getGroupVariablesStyle,
        GetTitle: getTitle,
        GetDescription: getDescription,
        GetName: getName,
        SortFilteredTechniquesByRequirement: sortFilteredTechniquesByRequirement,
        DisplayEntry: displayEntry,
        TooltipDescription: tooltipDescription,
        DefinitionContents: definitionContents,
        DisplayCollapsibleTitle: displayCollapsibleTitle,
        InfoHeader: infoHeader,
        BuildHeader: buildHeader,
        BuildText: buildText,
        BuildTextInput: buildTextInput,
        BuildTextarea: buildTextarea,
        BuildNumberInput: buildNumberInput,
        BuildNumberLabelInput: buildNumberLabelInput,
        BuildSelect: buildSelect
    }
}());

var WuxSheetSidebar = WuxSheetSidebar || (function () {
    const expandableTab = function (title, contents) {
        return `<div class="wuxSegment">
        ${WuxSheetMain.CustomInput("checkbox", WuxDef.GetAttribute("Page_Sidebar"), "wuxSideBarExtend", ` checked="checked"`)}
        ${tabHeader(`<span>&#10217&#10217 ${title}</span>`)}
        ${WuxSheetMain.Tab(`<div class="wuxFloatSidebarContents">${contents}</div>`)}
        </div>`;
    };
    const tabHeader = function (contents) {
        return `<div class="wuxFloatSidebarHeader">\n${contents}\n</div>`;
    };
    const collapsibleSection = function (header, fieldName, contents, defaultOpen) {
        return `<div class="wuxInteractiveBlock wuxSizeTiny">
        ${collapsibleSectionTitle(header, fieldName)}
        ${collapsibleSectionContent(contents, fieldName, defaultOpen)}
        </div>`;
    };
    const collapsibleSectionTitle = function (titleContent, fieldName) {
        return `<div class="wuxInteractiveInnerBlock">
            <input class="wuxInteractiveContent-flag" type="checkbox" name="${fieldName}">
            <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
            <span class="wuxInteractiveIcon">&#9656;</span>
            <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
            <span class="wuxInteractiveAuxIcon">&#9662;</span>
            
            ${titleContent}
        </div>`;
    };
    const collapsibleSectionContent = function (contents, fieldName, defaultOpen) {
        return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="${fieldName}">
            <div class="${defaultOpen ? "wuxInteractiveExpandingAuxContent" : "wuxInteractiveExpandingContent"}">
            ${contents}
        </div>`;
    };
    const buildStatusNames = function (statusDefs) {
        let output = "";
        for (let i = 0; i < statusDefs.length; i++) {
            // output += WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(statusDefs[i].getAttribute(),
            //     statusDefs[i].getAttribute(WuxDef._info), WuxSheetMain.Header2(statusDefs[i].title), WuxSheetMain.Desc(statusDefs[i].shortDescription));

            // output += WuxSheetMain.HiddenField(statusDefs[i].getAttribute(),
            //     collapsibleSubheader(WuxSheetMain.Header2(statusDefs[i].title), statusDefs[i].getAttribute(WuxDef._info), WuxSheetMain.Desc(statusDefs[i].shortDescription), false));

            output += WuxSheetMain.HiddenField(statusDefs[i].getAttribute(),
                `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock wuxSizeTiny">
                ${collapsibleSectionTitle(
                    WuxSheetMain.Subheader(WuxSheetMain.InteractionElement.CheckboxBlockIcon(statusDefs[i].getAttribute(), WuxSheetMain.Header2(statusDefs[i].title))),
                    statusDefs[i].getAttribute(WuxDef._info)
                )}
                ${collapsibleSectionContent(WuxSheetMain.Desc(statusDefs[i].shortDescription), statusDefs[i].getAttribute(WuxDef._info), false)}
                </div>`
            );
        }
        return output;
    };
    'use strict';

    const build = function (title, contents) {
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        <div class="wuxFloatSidebar">
        ${expandableTab(title, contents)}
        </div>`;
        },

        attributeSection = function (name, contents) {
            return `<div class="wuxDistinctSection wuxSizeInverse">\n<div class="wuxDistinctField">
            <span class="wuxDistinctSubtitle">${name}</span>
            <span class='wuxDistinctSubdata'>\n${contents}\n</span>
            </div>\n</div>`;
        },

        attributeSectionWithError = function (name, contents, errorFieldName) {
            return `<div class="wuxDistinctSection wuxSizeInverse">\n<div class="wuxDistinctField">
            <span class="wuxDistinctSubtitle">${name}</span>
            <input type="hidden" class="wuxErrorField-flag" name="${errorFieldName}" value="0">
            <span class='wuxDistinctSubdata'>\n${contents}\n</span>
            </div>\n</div>`;
        },

        collapsibleHeader = function (header, fieldName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxHeader">${header}</div>`, fieldName, contents, defaultOpen);
        },

        collapsibleSubheader = function (header, fieldName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxSubheader">${header}</div>`, fieldName, contents, defaultOpen);
        },

        buildPointsSection = function (attrName, header) {
            if (header == undefined) {
                header = `Build`;
            }
            let name = `Pts`;
            let output = `<span name='${attrName}' value="0">0</span>\n<span class="wuxFontSize7">/ </span>\n<span class="wuxFontSize7" name='${attrName}_max' value="0">0</span>`;
            return `<div class="wuxHeader">&nbsp;${header}</div>\n${attributeSectionWithError(name, output, `${attrName}_error`)}`;
        },

        buildChatSection = function () {
            let titleDefinition = WuxDef.Get("Title_Chat");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), WuxSheetMain.Chat.Build(), true);
        },

        buildLanguageSection = function () {
            let titleDefinition = WuxDef.Get("Title_LanguageSelect");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), WuxSheetMain.Language.Build(), true);
        },

        buildChecksSection = function () {
            let contents = "";

            let subGroups = WuxDef.Filter([new DatabaseFilterData("group", "SkillGroup")]);
            let skillGroupText = "";
            for (let i = 0; i < subGroups.length; i++) {
                if (skillGroupText != "") {
                    skillGroupText += "|";
                }
                skillGroupText += subGroups[i].getTitle();
            }
            let rollSkillValue = `!cskillgroupcheck @{${WuxDef.GetVariable("SheetName")}}@@@?{Choose a Skill Group to Roll|${skillGroupText}|Lore};?{Advantage|0}`;
            contents += `<button class="wuxButton wuxSizePercent" type="roll" value="${rollSkillValue}"><span>Roll Skill</span></button>`;

            let titleDefinition = WuxDef.Get("Check");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
        },

        buildBoonSection = function () {
            let boons = [];
            let boonsDefs = WuxDef.Filter([new DatabaseFilterData("group", "Boon")]);
            for (let i = 0; i < boonsDefs.length; i++) {
                boons.push(WuxSheetMain.InteractionElement.CheckboxBlockIcon(boonsDefs[i].getAttribute(), WuxSheetMain.Header2(boonsDefs[i].title)));
            }
            let output = WuxSheetMain.MultiRowGroup(boons, WuxSheetMain.Table.FlexTable, 3);

            let titleDefinition = WuxDef.Get("Title_Boon");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), output, true);
        },

        buildTechDebugSection = function () {
            let contents = "";
            let refreshTechDef = WuxDef.Get("RefreshTech");
            contents += WuxSheetMain.Button(refreshTechDef.getAttribute(), refreshTechDef.getTitle(), "wuxSizePercent");
            let sectionDefinition = WuxDef.Get("Action_FormeTechniques");
            let refreshField = sectionDefinition.getAttribute(WuxDef._refresh);
            contents += WuxSheetMain.Button(refreshField, "Update Techniques", "wuxSizePercent");

            let titleDefinition = WuxDef.Get("Title_Debug");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
        },

        buildGearDebugSection = function () {
            let contents = "";
            let updateDef = WuxDef.Get("Gear_UpdateEquipment");
            contents += WuxSheetMain.Button(updateDef.getAttribute(), updateDef.getTitle(), "wuxSizePercent");
            let removeDef = WuxDef.Get("Gear_RemoveEquipment");
            contents += WuxSheetMain.Button(removeDef.getAttribute(), removeDef.getTitle(), "wuxSizePercent");
            let updateConsuDef = WuxDef.Get("Gear_UpdateConsumables");
            contents += WuxSheetMain.Button(updateConsuDef.getAttribute(), updateConsuDef.getTitle(), "wuxSizePercent");
            let removeConsuDef = WuxDef.Get("Gear_RemoveConsumables");
            contents += WuxSheetMain.Button(removeConsuDef.getAttribute(), removeConsuDef.getTitle(), "wuxSizePercent");

            let titleDefinition = WuxDef.Get("Title_Debug");
            return collapsibleHeader(`${titleDefinition.getTitle()}`, titleDefinition.getAttribute(), contents, true);
        };
    return {
        Build: build,
        AttributeSection: attributeSection,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleSubheader: collapsibleSubheader,
        BuildPointsSection: buildPointsSection,
        BuildBoonSection: buildBoonSection,
        BuildChatSection: buildChatSection,
        BuildLanguageSection: buildLanguageSection,
        BuildChecksSection: buildChecksSection,
        BuildTechDebugSection: buildTechDebugSection,
        BuildGearDebugSection: buildGearDebugSection
    };
}());

var WuxSheetNavigation = WuxSheetNavigation || (function () {
    const overviewInfoContents = function (fieldName, tabFieldName) {
        let output = "";
        output += WuxSheet.PageDisplayInput(tabFieldName, "Overview");
        output += WuxSheet.PageDisplay("Overview", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Overview")));
        output += WuxSheet.PageDisplay("Details", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Details")));
        output += WuxSheet.PageDisplay("Post", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Post")));
        // output += WuxSheet.PageDisplay("Options", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Options")));
        return WuxSheetMain.Info.Contents(fieldName, output);
    };
    const mainPageNavigation = function (tabTitle, subheader, infoAttribute, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(tabTitle, WuxDef.GetAttribute("Page"), ["Actions", "Gear", "Character"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader, infoAttribute);

        return mainContents;
    };
    const buildMainSheetHeader = function (subheader, infoFieldName) {
        let header = `<input type="text" name="${WuxDef.GetAttribute("DisplayName")}" placeholder="Display Name" />`;
        return buildHeader(header, subheader, infoFieldName);
    };
    const trainingPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Training");
        let mainContents = "";
        mainContents += buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Knowledge", "Styles", "Training"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Training", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const advancementPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Advancement");
        let mainContents = buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Styles", "Knowledge", "Attributes", "Jobs", "Advancement"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Advancement", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const techniquesCorePageNavigation = function () {
        let tabFieldName = WuxDef.GetAttribute("Page");
        let learnDefinition = WuxDef.Get("Page_LearnTechniques");
        let setStyleDefinition = WuxDef.Get("Page_SetStyles");
        let actionsDefinition = WuxDef.Get("Page_Actions");
        return `${WuxSheet.PageDisplayInput(tabFieldName, "Styles")}
        ${WuxSheet.PageDisplay("Styles", mainPageNavigation(setStyleDefinition.title, setStyleDefinition.title, learnDefinition.getAttribute(WuxDef._info), ""))}
        ${WuxSheet.PageDisplay("Actions", mainPageNavigation(actionsDefinition.title, actionsDefinition.title, learnDefinition.getAttribute(WuxDef._info), ""))}`;
    };
    const techniquesInfoContents = function (infoFieldName, tabFieldName, pageFieldName) {
        let coreOutput = "";
        coreOutput += WuxSheet.PageDisplayInput(pageFieldName, "Styles");
        coreOutput += WuxSheet.PageDisplay("Styles", WuxDefinition.TooltipDescription(WuxDef.Get("Page_SetStyles")));
        coreOutput += WuxSheet.PageDisplay("Actions", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Actions")));

        let output = "";
        output += WuxSheet.PageDisplayInput(tabFieldName, "Builder");
        output += WuxSheet.PageDisplay("Builder", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Training", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Advancement", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Core", coreOutput);
        return WuxSheetMain.Info.Contents(infoFieldName, output);
    };
    const characterCreationNavigation = function (definition, subheader) {
        let mainContents = buildCharacterCreationTabs(definition.title);
        mainContents += buildExitStickyButtons(WuxDef.GetAttribute("PageSet_Character Creator"), false);
        mainContents += buildHeader("Character Creation", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const buildCharacterCreationTabs = function (sheetName) {
        let output = "";
        let tabNames = ["Advancement",  "Styles", "Gear", "Knowledge", "Attributes", "Jobs", "Origin"];

        for (let i = 0; i < tabNames.length; i++) {
            output += buildTabButton("radio", WuxDef.GetAttribute("Page"), tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
        }
        output = buildTabButtonRow(output);

        return output;
    };
    const buildExitStickyButtons = function (fieldName, showExit) {
        let output = "";
        // if (showExit) {
        //     output += buildTabButton("checkbox", `${fieldName}${WuxDef._exit}`, "Exit", "Exit", false, "") + "\n";
        // }
        output += buildTabButton("checkbox", `${fieldName}${WuxDef._finish}`, "Finish", "Finish", false, "") + "\n";
        output = buildTabButtonRow(output);

        return buildStickySideTab(output);
    };
    const partyManagerNavigation = function (tabTitle, subheader, infoAttribute, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(tabTitle, WuxDef.GetAttribute("Page"), ["NPC", "Notes"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader, infoAttribute);

        return mainContents;
    };
    'use strict';

    const buildSection = function (contents, infoContents) {
            return `<div class="wuxFloatHeader wuxStickyHeader">\n<div class="wuxSectionBlock wuxLargeLayoutItem">
        ${contents}
        ${infoContents}
        </div>\n</div>`;
        },

        buildCharacterCreationSplit = function (fieldName, mainContents, characterCreationContents) {
            return `${WuxSheet.PageSetPageDisplayInput()}
            ${WuxSheet.PageDisplay(fieldName, mainContents)}
            ${WuxSheet.PageDisplay("Builder", characterCreationContents)}`;
        },

        buildStickySideTab = function (contents) {
            return `<div class="wuxStickySideTab">\n${contents}\n</div>`;
        },

        buildTabButtonRow = function (contents) {
            return `<div class="wuxTabButtonRow">\n${contents}\n</div>`;
        },

        buildTabButton = function (type, fieldName, value, name, isSelected, buttonClasses) {
            return `<div class="wuxTabButton ${isSelected ? "wuxTabButtonSelected" : ""}">
            <input type="${type}" class="wuxTabButton ${buttonClasses}" name="${fieldName}" value="${value}"><span>${name}</span>
            </div>`;
        },

        buildTabs = function (sheetName, fieldName, tabNames) {
            let output = "";
            for (let i = 0; i < tabNames.length; i++) {
                output += buildTabButton("radio", fieldName, tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
            }
            output = buildTabButtonRow(output);

            return output;
        },

        buildHeader = function (header, subheader, infoFieldName) {
            return `<div class="wuxHeader2">${WuxSheetMain.Info.Button(infoFieldName)}${subheader}</div>\n<div class="wuxHeader">${header}</div>`;
        },

        buildOverviewPageNavigation = function (selectedTab) {
            let sideBarButtons = "";
            let tabFieldName = WuxDef.GetAttribute("PageSet_Core", WuxDef._tab);
            // sideBarButtons += buildTabButton("radio", tabFieldName, "Options", "Options", selectedTab == "Options", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Post", "Post", selectedTab == "Post", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Details", "Details", selectedTab == "Details", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Overview", "Overview", selectedTab == "Overview", "") + "\n";

            let definition = WuxDef.Get("Page_Character");
            return buildSection(mainPageNavigation(definition.title, WuxDef.GetTitle(`Page_${selectedTab}`), definition.getAttribute(WuxDef._info), buildStickySideTab(buildTabButtonRow(sideBarButtons))),
                overviewInfoContents(definition.getAttribute(WuxDef._info), tabFieldName));
        },

        buildGearPageNavigation = function () {
            let definition = WuxDef.Get("Page_Gear");
            let jinDisplay = `<div class="wuxSlotSection"><span class="wuxSlotLabel">${WuxDef.GetTitle("Title_YourJin")}</span><span class="wuxSlotData"><span name="${WuxDef.GetAttribute("Jin")}"></span><span> J</span></span></div>`;

            let finishButton = buildTabButton("checkbox", `${WuxDef.GetAttribute("PageSet_Character Creator")}${WuxDef._finish}`, "Finish", "Finish", false, "") + "\n";
            let gearCharacterCreationContents = buildCharacterCreationTabs(definition.title) +
                buildStickySideTab(jinDisplay + buildTabButtonRow(finishButton)) +
                buildHeader("Character Creation", definition.title, definition.getAttribute(WuxDef._info));

            let output = buildCharacterCreationSplit("Core",
                mainPageNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), buildStickySideTab(jinDisplay)),
                gearCharacterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildActionsPageNavigation = function () {
            let actionsDefinition = WuxDef.Get("Page_Actions");
            let techniquesDefinition = WuxDef.Get("Page_Styles");
            let output = `${WuxSheet.PageSetPageDisplayInput()}
            ${WuxSheet.PageDisplay("Core", 
                mainPageNavigation(actionsDefinition.title, actionsDefinition.title, actionsDefinition.getAttribute(WuxDef._info), ""))}
            ${WuxSheet.PageDisplay("Builder",
                characterCreationNavigation(techniquesDefinition, techniquesDefinition.title))}
            ${WuxSheet.PageDisplay("Advancement",
                advancementPageNavigation(techniquesDefinition, techniquesDefinition.title))}`;
            return buildSection(output, WuxSheetMain.Info.DefaultContents(actionsDefinition));
        },

        buildNpcPageNavigation = function () {
            let definition = WuxDef.Get("Page_NPC");
            return buildSection(partyManagerNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildNotesPageNavigation = function () {
            let definition = WuxDef.Get("Page_Notes");
            return buildSection(partyManagerNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildOriginPageNavigation = function (definition) {
            return buildSection(characterCreationNavigation(definition, definition.title), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildTrainingPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Training", trainingPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildAdvancementPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Advancement", advancementPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildTechniquesNavigation = function () {
            let learnDefinition = WuxDef.Get("Page_LearnTechniques");
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let pageFieldName = WuxDef.GetAttribute("Page");
            let learnSubtitle = learnDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Core", techniquesCorePageNavigation())}`;

            return buildSection(output, techniquesInfoContents(learnDefinition.getAttribute(WuxDef._info), tabFieldName, pageFieldName));
        },

        buildStylesNavigation = function (styleDefinitionName) {
            let styleDefinition = WuxDef.Get(styleDefinitionName);
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let pageFieldName = WuxDef.GetAttribute("Page");
            let learnSubtitle = styleDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(styleDefinition, learnSubtitle))}`;

            return buildSection(output, techniquesInfoContents(styleDefinition.getAttribute(WuxDef._info), tabFieldName, pageFieldName));
        };
    return {
        BuildOverviewPageNavigation: buildOverviewPageNavigation,
        BuildGearPageNavigation: buildGearPageNavigation,
        BuildActionsPageNavigation: buildActionsPageNavigation,
        BuildOriginPageNavigation: buildOriginPageNavigation,
        BuildNpcPageNavigation: buildNpcPageNavigation,
        BuildNotesPageNavigation: buildNotesPageNavigation,
        BuildTechniquesNavigation: buildTechniquesNavigation,
        BuildStylesNavigation: buildStylesNavigation,
        BuildTrainingPageNavigation: buildTrainingPageNavigation,
        BuildAdvancementPageNavigation: buildAdvancementPageNavigation
    };

}());

var WuxSheet = WuxSheet || (function () {
    'use strict';

    const pageDisplayInput = function (fieldName, value) {
        if (value == undefined) {
            value = "";
        } else {
            value = ` value="${value}"`;
        }
        return `<input type="hidden" class="wuxPageDisplay-Flag" name="${fieldName}"${value} />`
    },
        mainPageDisplayInput = function () {
            return pageDisplayInput(WuxDef.GetAttribute("Page"), "Origin");
        },
        pageSetPageDisplayInput = function () {
            return pageDisplayInput(WuxDef.GetAttribute("PageSet"), "Builder");
        },
        notePageDisplayInput = function () {
            return pageDisplayInput(WuxDef.GetAttribute("Note_PageDisplay"), "0");
        },
        pageDisplay = function (fieldName, contents) {
            return `<div class="wuxPageDisplay-${fieldName.replace(/[ .]/g, '')}">\n${contents}\n</div>`;
        }
    ;
    return {
        PageDisplayInput: pageDisplayInput,
        MainPageDisplayInput: mainPageDisplayInput,
        PageSetPageDisplayInput: pageSetPageDisplayInput,
        NotePageDisplayInput: notePageDisplayInput,
        PageDisplay: pageDisplay
    };
}());

var WuxCharacterSheetBuilders = WuxCharacterSheetBuilders || (function () {
    'use strict';

    var
        buildInfluences = function () {
            let contents = "";
            let influenceDef = WuxDef.Get("Soc_Influence");
            let usingInfluences = WuxDef.Get("Title_UsingInfluences");

            let influenceInfo = WuxDefinition.TooltipDescription(influenceDef);
            influenceInfo += WuxDefinition.TooltipDescription(usingInfluences);
            influenceInfo = WuxSheetMain.Info.Contents(influenceDef.getAttribute(WuxDef._info), influenceInfo);

            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(influenceDef.getAttribute(WuxDef._info))}${influenceDef.title}`)}
                ${influenceInfo}`;

            let influenceContents = WuxSheetMain.MultiRow(
                WuxSheetMain.Select(
                    WuxDef.GetAttribute("Soc_Severity"),
                    WuxDef.Filter([new DatabaseFilterData("group", "SeverityRank")]),
                    false,
                    "wuxInfluenceType") +
                WuxSheetMain.CustomInput(
                    "text",
                    influenceDef.getAttribute(),
                    "wuxInput wuxInfluenceDescription",
                    ` placeholder="Influence"`)
            );
            influenceContents += WuxSheetMain.Textarea(WuxDef.GetAttribute("Soc_InfluenceDesc"),
                "wuxInput wuxHeight30", WuxDef.GetTitle("Soc_InfluenceDesc"));

            contents += `<div>
                <fieldset class="${WuxDef.GetVariable("RepeatingInfluences")}">
                    ${influenceContents}
                </fieldset>
            </div>`;
            return WuxSheetMain.Table.FlexTableGroup(contents);
        },

        buildBackgroundBasics = function () {
            let contents = "";
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("DisplayName"), WuxDef.GetAttribute("DisplayName"));
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName"));
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
            contents += WuxDefinition.BuildSelect(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"),
                WuxDef.Filter([new DatabaseFilterData("group", "GenderType")]), true);
            contents += WuxDefinition.BuildSelect(WuxDef.Get("HomeRegion"), WuxDef.GetAttribute("HomeRegion"),
                WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
            contents += WuxDefinition.BuildSelect(WuxDef.Get("Ethnicity"), WuxDef.GetAttribute("Ethnicity"),
                WuxDef.Filter([new DatabaseFilterData("group", "RaceType")]), true);
            return WuxSheetMain.Table.FlexTableGroup(contents);
        },

        buildBackgroundBackstory = function () {
            let contents = "";
            contents += WuxDefinition.BuildTextarea(WuxDef.Get("QuickDescription"), WuxDef.GetAttribute("QuickDescription"),
                "wuxInput wuxHeight30");
            contents += WuxDefinition.BuildTextarea(WuxDef.Get("Backstory"), WuxDef.GetAttribute("Backstory"),
                "wuxInput wuxHeight150");
            return WuxSheetMain.Table.FlexTableGroup(contents);
        },

        buildBackgroundGenerator = function () {
            let leftColumn = "";
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenName"), WuxDef.GetAttribute("Note_GenName"));
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenFullName"), WuxDef.GetAttribute("Note_GenFullName"));
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenGender"), WuxDef.GetAttribute("Note_GenGender"));
            leftColumn += WuxDefinition.BuildSelect(WuxDef.Get("Note_GenHomeRegion"), WuxDef.GetAttribute("Note_GenHomeRegion"),
                WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenRace"), WuxDef.GetAttribute("Note_GenRace"));
            leftColumn = WuxSheetMain.Table.FlexTableGroup(leftColumn);

            let rightColumn = "";
            let generatorDefinition = WuxDef.Get("Note_GenerateCharacter");
            let useDefinition = WuxDef.Get("Note_UseGeneration");
            let clearDefinition = WuxDef.Get("Note_ClearBackground");
            rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenPersonality"), WuxDef.GetAttribute("Note_GenPersonality"));
            rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenMotivation"), WuxDef.GetAttribute("Note_GenMotivation"));
            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(generatorDefinition.getAttribute(), generatorDefinition.getTitle()));
            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(useDefinition.getAttribute(), useDefinition.getTitle()));
            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(clearDefinition.getAttribute(), clearDefinition.getTitle()));
            rightColumn = WuxSheetMain.Table.FlexTableGroup(rightColumn);

            return `${WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2)}`;
        },

        buildBackground = function () {
            let contents = "";
            contents += WuxSheetMain.Header("Basics");
            contents += `${WuxSheetMain.MultiRowGroup([buildBackgroundBasics(), buildBackgroundBackstory()], WuxSheetMain.Table.FlexTable, 2)}`;
            contents += WuxSheetMain.Header("Background Generator");
            contents += buildBackgroundGenerator();

            let definition = WuxDef.Get("Title_Background");
            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, WuxSheetMain.TabBlock(contents));
        }

    ;
    return {
        BuildInfluences: buildInfluences,
        BuildBackgroundBasics: buildBackgroundBasics,
        BuildBackgroundBackstory: buildBackgroundBackstory,
        BuildBackgroundGenerator: buildBackgroundGenerator,
        BuildBackground: buildBackground
    };
}());

// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

var DisplayCoreCharacterSheet = DisplayCoreCharacterSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = "";
            output += WuxSheet.PageDisplayInput(WuxDef.GetAttribute("PageSet_Core", WuxDef._tab));
            output += printOverview(sheetsDb);
            output += printDetails(sheetsDb);
            output += printPost();
            return WuxSheet.PageDisplay("Character", output);
        },

        printOverview = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Overview") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintOverview();
            return WuxSheet.PageDisplay("Overview", output);
        },

        printDetails = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Details") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintDetails();
            return WuxSheet.PageDisplay("Details", output);
        },

        printPost = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Post") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintPost();
            return WuxSheet.PageDisplay("Post", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printSidebar = function () {
                    let contents = "";
                    contents += WuxSheetSidebar.BuildChatSection();
                    contents += WuxSheetSidebar.BuildChecksSection();
                    contents += WuxSheetSidebar.BuildBoonSection();
                    // contents += WuxSheetSidebar.BuildLanguageSection();
                    return WuxSheetSidebar.Build("", contents);
                }

            return {
                PrintSidebar: printSidebar
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var

                printOverview = function () {
                    let contents = Overview.Build();
                    return WuxSheetMain.Build(contents);
                },
                Overview = Overview || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += buildCharacterSection();
                            return contents;
                        },

                        buildCharacterSection = function () {
                            let contents = "";
                            contents += WuxSheetMain.MultiRowGroup([basics(), WuxCharacterSheetBuilders.BuildInfluences()], WuxSheetMain.Table.FlexTable, 2);
                            contents += WuxSheetMain.MultiRowGroup([advancement(), resources()], WuxSheetMain.Table.FlexTable, 2);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_OverviewCharacter");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        basics = function () {
                            let contents = "";
                            contents += WuxDefinition.BuildText(WuxDef.Get("FullName"),
                                WuxSheetMain.Span(WuxDef.GetAttribute("FullName")));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("DisplayName"),
                                WuxDef.GetAttribute("DisplayName"));

                            let hiddenAttr = WuxDef.GetAttribute("AffinityAspect");
                            let affinityFilter = [WuxDef.Get("Unaspected")].concat(
                                WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])
                            );
                            contents += WuxSheetMain.HiddenFieldToggle(hiddenAttr,
                                WuxDefinition.BuildText(WuxDef.Get("Affinity"),
                                    WuxSheetMain.Span(WuxDef.GetAttribute("Affinity"))),
                                WuxDefinition.BuildSelect(WuxDef.Get("AffinityAspect"),
                                    WuxDef.GetAttribute("Affinity"), affinityFilter, false)
                            );

                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        advancement = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Advancement");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`, "wuxWidth160"));

                            let levelDefinition = WuxDef.Get("Level");
                            contents += WuxDefinition.BuildText(levelDefinition, WuxSheetMain.Span(levelDefinition.getAttribute()));

                            let xpDefinition = WuxDef.Get("XP");
                            let ppDefinition = WuxDef.Get("PP");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `To Level: ${xpDefinition.formula.getValue()}`)),
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(), `To Training Point: ${ppDefinition.formula.getValue()}`))],
                                WuxSheetMain.Table.FlexTable, 2);

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        resources = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Page_OverviewResources");
                            contents += WuxSheetMain.Header(`${titleDefinition.getTitle()}`);

                            let crDef = WuxDef.Get("CR");
                            let potencyDefinition = WuxDef.Get("SB_MAX");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(crDef, crDef.getAttribute(),
                                        `Max: <span name="${crDef.getAttribute(WuxDef._max)}"></span>`)),
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildText(potencyDefinition, WuxSheetMain.Span(potencyDefinition.getAttribute())))],
                                WuxSheetMain.Table.FlexTable, 2);

                            let vitalityDef = WuxDef.Get("Cmb_Vitality");
                            let surgeDef = WuxDef.Get("Surge");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(vitalityDef, vitalityDef.getAttribute(),
                                        `Max: <span name="${vitalityDef.getAttribute(WuxDef._max)}"></span>`)),
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(surgeDef, surgeDef.getAttribute(),
                                        `Max: <span name="${surgeDef.getAttribute(WuxDef._max)}"></span>`))],
                                WuxSheetMain.Table.FlexTable, 2);

                            let presetStatusDefs = WuxDef.Filter([new DatabaseFilterData("group", "Status")]).filter(def => def.presetStatus);
                            if (presetStatusDefs.length > 0) {
                                let statusSectionDef = WuxDef.Get("Page_OverviewStatus");
                                contents += WuxSheetMain.Header(statusSectionDef.getTitle());
                                let buildStatusTooltip = function (def) {
                                    let tip = `${WuxSheetMain.Header2(def.getTitle())}
                                        <span class="wuxDescription">${def.getDescription('</span><span class="wuxDescription">')}</span>`;
                                    let notes = [];
                                    if (def.endsOnRoundStart) notes.push("Ends on round start");
                                    if (def.endsOnTrigger) notes.push("Ends when triggered");
                                    if (notes.length > 0) tip += WuxSheetMain.Desc(notes.join(" · "));
                                    return tip;
                                };
                                let statusItems = presetStatusDefs.map(def =>
                                    WuxSheetMain.Table.FlexTableGroup(
                                        def.hasRanks
                                            ? WuxDefinition.BuildNumberLabelInput(def, def.getAttribute(), def.shortDescription)
                                            : WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                                def.getAttribute(),
                                                def.getAttribute(WuxDef._info),
                                                WuxSheetMain.Header2(def.getTitle()),
                                                buildStatusTooltip(def))));
                                contents += WuxSheetMain.MultiRowGroup(statusItems, WuxSheetMain.Table.FlexTable, 2);
                            }

                            let boonDefs = WuxDef.Filter([new DatabaseFilterData("group", "Boon")]);
                            if (boonDefs.length > 0) {
                                let boonSectionDef = WuxDef.Get("Title_Boon");
                                contents += WuxSheetMain.Header(boonSectionDef.getTitle());
                                let buildBoonTooltip = function (def) {
                                    return `${WuxSheetMain.Header2(def.getTitle())}
                                        <span class="wuxDescription">${def.getDescription('</span><span class="wuxDescription">')}</span>`;
                                };
                                let boonItems = boonDefs.map(def =>
                                    WuxSheetMain.Table.FlexTableGroup(
                                        WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                            def.getAttribute(),
                                            def.getAttribute(WuxDef._info),
                                            WuxSheetMain.Header2(def.getTitle()),
                                            buildBoonTooltip(def))));
                                contents += WuxSheetMain.MultiRowGroup(boonItems, WuxSheetMain.Table.FlexTable, 2);
                            }

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        }

                    return {
                        Build: build
                    }
                }()),

                printDetails = function () {
                    let contents = Details.Build();
                    return WuxSheetMain.Build(contents);
                },
                Details = Details || (function () {
                    'use strict';

                    var
                        build = function () {

                            let originDefinition = WuxDef.Get("Page_Origin");
                            let backgroundBuilder = new CharacterBackgroundBuilder();
                            let statSummaryDefinition = WuxDef.Get("Title_StatSummary");
                            let statsBuilder = new ExtendedCharacterStatisticsBuilder();

                            return `${WuxSheetMain.CollapsibleTab(statSummaryDefinition.getAttribute(WuxDef._tab, WuxDef._expand), statSummaryDefinition.title,
                                WuxSheetMain.TabBlock(statsBuilder.print()))}
                                ${WuxSheetMain.CollapsibleTab(originDefinition.getAttribute(WuxDef._tab, WuxDef._expand), originDefinition.title,
                                WuxSheetMain.TabBlock(backgroundBuilder.print()))}`;
                        }

                    return {
                        Build: build
                    }
                }()),

                printPost = function () {
                    let contents = Post.Build();
                    return WuxSheetMain.Build(contents);
                },
                Post = Post || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += new ChatDisplayBuilder().print();
                            contents += createNotebookDisplay();
                            return contents;
                        },


                        createNotebookDisplay = function () {
                            let notebookCount = parseInt(WuxDef.Get("Note_NotebookCount").formula.getValue());
                            let contents = WuxSheetMain.MultiRowGroup([notebookSelect(notebookCount), notebookPages(notebookCount)],
                                WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Title_Notebook");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        notebookSelect = function (notebookCount) {
                            let staticNotebooks = "";
                            for (let i = 0; i < notebookCount; i++) {
                                staticNotebooks += addStaticNotebooks(i);
                                staticNotebooks += WuxSheetMain.Row("&nbsp;");
                            }
                            let repeatingDef = WuxDef.Get("Notebooks");
                            let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                            <div>
                                ${staticNotebooks}
                                ${WuxSheetMain.Row("&nbsp;")}
                            </div>`;

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },
                        addStaticNotebooks = function (count) {
                            let nameDef = WuxDef.Get("Note_NotebookName");
                            let openDef = WuxDef.Get("Note_NotebookOpen");

                            return `
                            ${WuxSheetMain.CustomInput("text", nameDef.getAttribute(count),
                                "wuxInput wuxWidth160", ` placeholder="Notebook ${count + 1}"`)}
                            ${WuxSheetMain.Button(openDef.getAttribute(count), openDef.getTitle(), "wuxSmallButton")}`;
                        },

                        notebookPages = function (notebookCount) {
                            let contents = "";
                            contents += addStaticNotebookPagesDisplay(notebookCount);

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150 wuxFlexTableItemGroup2");
                        },
                        addStaticNotebookPagesDisplay = function (notebookCount) {
                            let repeatingDef = WuxDef.Get("NotebookPages");
                            let staticNotebookPages = "";
                            for (let i = 0; i < notebookCount; i++) {
                                staticNotebookPages += WuxSheetMain.HiddenUniqueIndexField(WuxDef.GetAttribute("Note_OpenNotebook"), i,
                                    `${WuxSheetMain.Header(WuxSheetMain.Span(WuxDef.GetAttribute("Note_NotebookName", i)) + "<span> Pages</span>")}
                                ${buildRepeater(repeatingDef.getVariable(i), addRepeaterContentsNotebookPages())}
                                ${WuxSheetMain.Row("&nbsp;")}`)
                            }
                            return `
                            <div>
                                ${staticNotebookPages}
                            </div>`;
                        },
                        addRepeaterContentsNotebookPages = function () {
                            let contents = "";
                            contents += addNotebookPageHeader();
                            contents += addNotebookPageContents();
                            contents += WuxSheetMain.Row("&nbsp;");
                            return contents;
                        },
                        addNotebookPageHeader = function () {
                            let deleteDef = WuxDef.Get("Note_PageDelete");
                            let templateDataDef = WuxDef.Get("Note_PageTemplateData");

                            return WuxSheetMain.MultiRow(
                                WuxSheetMain.Select(
                                    WuxDef.GetAttribute("Note_PageType"),
                                    WuxDef.Filter([new DatabaseFilterData("group", "PostType")]),
                                    false,
                                    "wuxInfluenceType") +
                                addPostButton() +
                                WuxSheetMain.Button(deleteDef.getAttribute(), deleteDef.getTitle(), "wuxSmallButton wuxNotebookButton") +
                                WuxSheetMain.CustomInput(
                                    "text",
                                    templateDataDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth50",
                                    `onfocus="this.select();" placeholder="${templateDataDef.getTitle()}"`)
                            );
                        },

                        addPostButton = function () {
                            let postDef = WuxDef.Get("Note_PagePost");
                            let templateDataDef = WuxDef.Get("Note_PageTemplateData");
                            return `<button class="wuxSmallButton wuxNotebookButton" type="roll" value="@{${templateDataDef.getVariable()}}">
                                <span>${postDef.getTitle()}</span>
                            </button>`;
                        },

                        addNotebookPageContents = function () {
                            let contents = "";

                            contents += WuxSheet.NotePageDisplayInput();
                            contents += WuxSheet.PageDisplay("0", addNotebookPageBasic());
                            contents += WuxSheet.PageDisplay("Character", addNotebookPageCharacter());
                            contents += WuxSheet.PageDisplay("Location", addNotebookPageLocation());
                            contents += WuxSheet.PageDisplay("Chapter", addNotebookPageChapter());
                            return contents;
                        },

                        addNotebookPageBasic = function () {
                            let contentsDef = WuxDef.Get("Note_PageContents");
                            return `${WuxSheetMain.Textarea(contentsDef.getAttribute(), "wuxInput wuxHeight30", contentsDef.getTitle())}`;
                        },

                        addNotebookPageCharacter = function () {
                            let charNameDef = WuxDef.Get("Note_PageCharName");
                            let charEmoteDef = WuxDef.Get("Note_PageCharEmote");
                            let charURLDef = WuxDef.Get("Note_PageCharURL");
                            let charLanguageDef = WuxDef.Get("Note_PageCharLanguage");
                            let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
                            for (let i = 0; i < languageFilters.length; i++) {
                                languageFilters[i].variable = languageFilters[i].title;
                            }

                            let contentsDef = WuxDef.Get("Note_PageContents");

                            return `${WuxSheetMain.MultiRow(
                                `${WuxSheetMain.CustomInput("text", charNameDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth120", `placeholder="${charNameDef.getTitle()}"`)}
                                    ${WuxSheetMain.CustomInput("text", charEmoteDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70", `placeholder="${charEmoteDef.getTitle()}"`)}
                                    ${WuxSheetMain.CustomInput("text", charURLDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth50", `placeholder="${charURLDef.getTitle()}"`)}
                                    ${WuxSheetMain.Select(charLanguageDef.getAttribute(), languageFilters, false, "wuxInput wuxInlineBlock wuxWidth120")}
                                `)}
                                ${WuxSheetMain.Textarea(contentsDef.getAttribute(), "wuxInput wuxHeight30", contentsDef.getTitle())}`;
                        },

                        addNotebookPageLocation = function () {
                            let locationDef = WuxDef.Get("Note_PageLocation");
                            let areaDef = WuxDef.Get("Note_PageArea");
                            let dateDef = WuxDef.Get("Note_PageDate");
                            let timeDef = WuxDef.Get("Note_PageTime");
                            let timeFilters = WuxDef.Filter([new DatabaseFilterData("group", "TimeType")]);

                            return `${WuxSheetMain.Input("text", locationDef.getAttribute(), "", locationDef.getTitle())}
                            ${WuxSheetMain.Input("text", areaDef.getAttribute(), "", areaDef.getTitle())}
                            ${WuxSheetMain.MultiRow(
                                `${WuxSheetMain.CustomInput("text", dateDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth120", `placeholder="${dateDef.getTitle()}"`)}
                                    ${WuxSheetMain.Select(timeDef.getAttribute(), timeFilters, false, "wuxInput wuxInlineBlock wuxWidth120")}
                                `)}`;
                        },

                        addNotebookPageChapter = function () {
                            let questNameDef = WuxDef.Get("Note_PageQuestName");
                            let chapterDef = WuxDef.Get("Note_PageChapter");
                            let partDef = WuxDef.Get("Note_PagePart");

                            return `${WuxSheetMain.Input("text", questNameDef.getAttribute(), "", questNameDef.getTitle())}
                            ${WuxSheetMain.MultiRow(
                                `<span class="wuxDescription wuxMarginRight5">${chapterDef.getTitle()}</span>
                                    ${WuxSheetMain.CustomInput("number", chapterDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70", `placeholder="${chapterDef.getTitle()}"`)}
                                    <span class="wuxDescription wuxMarginLeft5 wuxMarginRight5">${partDef.getTitle()}</span>
                                    ${WuxSheetMain.CustomInput("number", partDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70", `placeholder="${partDef.getTitle()}"`)}
                                `)}`;
                        },

                        buildRepeater = function (repeaterName, repeaterData, classes) {
                            return `<div${classes != undefined ? ` class="${classes}"` : ""}>
                                <fieldset class="${repeaterName}">
                                    ${repeaterData}
                                </fieldset>
                            </div>`;
                        }


                    return {
                        Build: build
                    }
                }())

            return {
                PrintOverview: printOverview,
                PrintDetails: printDetails,
                PrintPost: printPost
            }
        }());

    return {
        Print: print
    };
}());

var DisplayGearSheet = DisplayGearSheet || (function () {
    'use strict';

    var
        print = function () {
            let output = WuxSheetNavigation.BuildGearPageNavigation("Gear") +
                SideBarData.PrintEquipment() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("Gear", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printEquipment = function () {
                    let coreContents = `${WuxSheetSidebar.BuildChatSection()}
                        ${WuxSheetSidebar.BuildChecksSection()}
                        ${WuxSheetSidebar.BuildBoonSection()}
                        ${WuxSheetSidebar.BuildGearDebugSection()}`;
                    let builderContents = WuxSheetSidebar.BuildGearDebugSection();
                    let contents = `${WuxSheet.PageSetPageDisplayInput()}
                        ${WuxSheet.PageDisplay("Core", coreContents)}
                        ${WuxSheet.PageDisplay("Builder", builderContents)}`;
                    return WuxSheetSidebar.Build("", contents);
                }

            return {
                PrintEquipment: printEquipment
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += buildEquipment();
                    contents += buildConsumables();
                    contents += buildGearItems();
                    return WuxSheetMain.Build(contents);
                },

                buildConsumables = function () {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([slottedConsumables(), ownedConsumables()], WuxSheetMain.Table.FlexTableReverse, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearConsumables");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                ownedConsumables = function () {
                    let repeatingDef = WuxDef.Get("RepeatingConsumables");
                    let eqipmentIsVisibleAttr = WuxDef.GetAttribute("Gear_ConsumableIsVisible");
                    let repeaterContent = buildRepeater(repeatingDef.getVariable(), addRepeaterContentsConsumables());

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                    <div>
                        ${WuxSheetMain.HiddenFieldToggle(eqipmentIsVisibleAttr, repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${addConsumableFilterButtons()}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addConsumableFilterButtons = function () {
                    let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let autoEquipDef = WuxDef.Get("Gear_AutoEquipItems");
                    let autoEquip = [WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                            autoEquipDef.getAttribute(),
                            autoEquipDef.getAttribute(WuxDef._info),
                            WuxSheetMain.Header(autoEquipDef.getTitle()),
                            WuxDefinition.TooltipDescription(autoEquipDef)))];

                    let items = [];
                    for (let i = 0; i < consuTypes.length; i++) {
                        items.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(consuTypes[i].getAttribute(), searchButtonDef.getTitle(consuTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddConsumable"))}
                        ${WuxSheetMain.MultiRowGroup(autoEquip, WuxSheetMain.Table.FlexTable, 1)}
                        ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                addRepeaterContentsConsumables = function () {
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let equipDef = WuxDef.Get("Gear_Equip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(equipDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${equipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>`);

                    return WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents);
                },

                slottedConsumables = function () {
                    let syncedDef = WuxDef.Get("Title_EquippedInstantConsumables");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let unequipDef = WuxDef.Get("Gear_Unequip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let equippedIsVisibleAttr = WuxDef.GetAttribute("Gear_ConsumableIsVisible", WuxDef._gear);

                    let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
                    let rows = "";
                    for (let i = 0; i < consuTypes.length; i++) {
                        let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                        for (let j = 0; j < itemKeys.length; j++) {
                            let item = itemKeys[j];
                            if (item == undefined) {
                                continue;
                            }
                            let countMod = item.technique.fieldName.replace(/_/g, "");
                            let countAttribute = WuxDef.GetAttribute("ItemCount", countMod);
                            let displayData = new TechniqueDisplayData(item.technique);
                            displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                            displayData.technique.displayname = displayData.displayname;
                            displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                            displayData.itemName = item.name;
                            let rowContents = WuxSheetMain.MultiRow(`
                            <div class="wuxEquipableRow">
                                <div class="wuxEquipableBody">
                                    <div class="wuxEquipableName">
                                        <span class="wuxDescription" name="${countAttribute}" value="0">${item.name}</span>
                                        <span class="wuxDescription">${item.name}</span>
                                    </div>
                                    <div class="wuxEquipableButtonRow">
                                        <button class="wuxRepeatingTechActionButton" type="roll" value="${displayData.getSheetRollTemplate(true)}"><span style="color:#4caf50;">&#9654;</span><span> Use</span></button>
                                        ${WuxSheetMain.Button(buyDef.getAttribute(countMod), `<span style="color:#5bc0de;">&#9670;</span> ${buyDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                        ${WuxSheetMain.Button(unequipDef.getAttribute(countMod), `<span style="color:#c8a020;">&#9881;</span> ${unequipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                        ${WuxSheetMain.Button(inspectDef.getAttribute(countMod), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    </div>
                                </div>
                            </div>`);
                            rows += WuxSheetMain.HiddenField(countAttribute, rowContents);
                        }
                    }

                    let slotDisplay = WuxSheetMain.SlotDisplay("Slots", "attr_gear-consumableslotstate", WuxDef.GetAttribute("Gear_ConsumableSlot"), WuxDef.GetAttribute("ConsumableSlots"));

                    let unequipAllDef = WuxDef.Get("Gear_UnequipAll");
                    let contents = `${slotDisplay}
                        ${WuxSheetMain.Header(`${syncedDef.getTitle()}`)}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Gear_ConsumableSlot"), `<div style="float:right;">${WuxSheetMain.Button(unequipAllDef.getAttribute("consumable"), `<span style="color:#c8a020;">&#9881;</span> ${unequipAllDef.getTitle()}`, "wuxRepeatingTechActionButton")}</div>`)}
                        ${WuxSheetMain.HiddenFieldToggle(equippedIsVisibleAttr, `<div>${rows}</div>`, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}`;

                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                },

                buildGearItems = function () {
                    let contents = WuxSheetMain.MultiRowGroup([storedGear(), storedFoods()], WuxSheetMain.Table.FlexTable, 2);
                    contents = WuxSheetMain.TabBlock(contents);
                    let definition = WuxDef.Get("Page_GearItems");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                storedGear = function () {
                    let repeatingDef = WuxDef.Get("RepeatingGear");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>`);

                    let repeaterContent = buildRepeater("repeating_gear",
                        `<input type="hidden" name="${getGearAttribute("ItemMainGroup")}" value="0">` +
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                            ${WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Gear_GearIsVisible"), repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                            ${WuxSheetMain.Row("&nbsp;")}
                            ${addGearFilterButtons()}
                        </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addGearFilterButtons = function () {
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let gearTypes = WuxDef.Filter([new DatabaseFilterData("group", "GearType")]);
                    let gearItems = [];
                    for (let i = 0; i < gearTypes.length; i++) {
                        gearItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(gearTypes[i].getAttribute(), searchButtonDef.getTitle(gearTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    let goodsTypes = WuxDef.Filter([new DatabaseFilterData("group", "GoodsType")]);
                    for (let i = 0; i < goodsTypes.length; i++) {
                        gearItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(goodsTypes[i].getAttribute(), searchButtonDef.getTitle(goodsTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddGear"))}
                        ${WuxSheetMain.MultiRowGroup(gearItems, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                storedFoods = function () {
                    let repeatingDef = WuxDef.Get("RepeatingFoods");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");
                    let cookDef = WuxDef.Get("Gear_Cook");

                    let gearDef = WuxDef.Get("Gear");
                    let itemNameVar = gearDef.getVariable(`-${WuxDef.GetVariable("ItemName")}`);
                    let itemCountVar = gearDef.getVariable(`-${WuxDef.GetVariable("ItemCount")}`);
                    let cookButtonValue = `!addingredient @{${itemNameVar}}|||@{${itemCountVar}}|||@{character_name}`;

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <input type="hidden" name="${getGearAttribute("ItemName")}">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    <button class="wuxRepeatingTechActionButton" type="roll" value="${cookButtonValue}"><span style="color:#4caf50;">&#9874;</span> ${cookDef.getTitle("")}</button>
                                </div>
                            </div>
                        </div>`);

                    let repeaterContent = buildRepeater(repeatingDef.getVariable(),
                        `<input type="hidden" name="${getGearAttribute("ItemMainGroup")}" value="0">` +
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                            ${WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Gear_FoodIsVisible"), repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                            ${WuxSheetMain.Row("&nbsp;")}
                            ${addFoodsFilterButtons()}
                        </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addFoodsFilterButtons = function () {
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let foodTypes = WuxDef.Filter([new DatabaseFilterData("group", "FoodType")]);
                    let foodItems = [];
                    for (let i = 0; i < foodTypes.length; i++) {
                        foodItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(foodTypes[i].getAttribute(), searchButtonDef.getTitle(foodTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    let ingTypes = WuxDef.Filter([new DatabaseFilterData("group", "IngType")]);
                    for (let i = 0; i < ingTypes.length; i++) {
                        foodItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(ingTypes[i].getAttribute(), searchButtonDef.getTitle(ingTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddConsumable"))}
                        ${WuxSheetMain.MultiRowGroup(foodItems, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                buildEquipment = function () {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([equippedEquipment(), ownedEquipment()], WuxSheetMain.Table.FlexTableReverse, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearEquipment");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                ownedEquipment = function () {
                    let repeatingDef = WuxDef.Get("RepeatingEquipment");
                    let eqipmentIsVisibleAttr = WuxDef.GetAttribute("Gear_EquipmentIsVisible");
                    let repeaterContent = buildRepeater(repeatingDef.getVariable(), addRepeaterContentsEquipment());

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                    <div>
                        ${WuxSheetMain.HiddenFieldToggle(eqipmentIsVisibleAttr, repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${addEquipmentFilterButtons()}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                buildCurrency = function () {
                    let jinDef = WuxDef.Get("Jin");
                    return `${WuxSheetMain.Header(`${WuxDef.GetTitle("Page_GearCurrency")}`)}
                    <div class="wuxWidth160">
                        ${WuxDefinition.BuildHeader(jinDef)}
                        ${WuxSheetMain.CustomInput("number", jinDef.getAttribute(), "wuxInput wuxMinWidth100")}
                    </div>`;
                },

                addEquipmentFilterButtons = function () {
                    let equipmentTypes = WuxDef.Filter([new DatabaseFilterData("group", "EquipmentType")]);
                    let findByFilterDef = WuxDef.Get("Popup_FindItemsByFilter");
                    let findByTechniqueDef = WuxDef.Get("Popup_FindItemsByTechnique");
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let autoEquipDef = WuxDef.Get("Gear_AutoEquipItems");
                    let autoEquip = [WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                            autoEquipDef.getAttribute(),
                            autoEquipDef.getAttribute(WuxDef._info),
                            WuxSheetMain.Header(autoEquipDef.getTitle()),
                            WuxDefinition.TooltipDescription(autoEquipDef)))];
                    let items = [];
                    for (let i = 0; i < equipmentTypes.length; i++) {
                        items.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(equipmentTypes[i].getAttribute(), searchButtonDef.getTitle(equipmentTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(findByFilterDef.getAttribute(), findByFilterDef.getTitle(), "wuxWidth120"),
                        "wuxMaxWidth220"));
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(findByTechniqueDef.getAttribute(), findByTechniqueDef.getTitle(), "wuxWidth120"),
                        "wuxMaxWidth220"));
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddEquipment"))}
                        ${WuxSheetMain.MultiRowGroup(autoEquip, WuxSheetMain.Table.FlexTable, 1)}
                        ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                addRepeaterContentsEquipment = function () {
                    let equipDef = WuxDef.Get("Gear_Equip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");
                    let subGroupAttr = getGearAttribute("ItemSubGroup");
                    let equipButtonContent = '<span style="color:#c8a020;">&#9881;</span> ' + equipDef.getTitle('<span name="' + subGroupAttr + '"></span>');

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(equipDef.getAttribute(), equipButtonContent, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>`);

                    return WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents);
                },

                equippedEquipment = function () {
                    let repeatingDef = WuxDef.Get("RepeatingSyncedEquipment");
                    let unequipDef = WuxDef.Get("Gear_Unequip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let equippedIsVisibleAttr = WuxDef.GetAttribute("Gear_EquipmentIsVisible", WuxDef._gear);

                    let rowContents = WuxSheetMain.MultiRow(`
                    <div class="wuxEquipableRow">
                        <div class="wuxEquipableBody">
                            <div class="wuxEquipableName">
                                <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                            </div>
                            <div class="wuxEquipableButtonRow">
                                ${WuxSheetMain.Button(unequipDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${unequipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                            </div>
                        </div>
                    </div>`);

                    let repeaterContent = buildRepeater(repeatingDef.getVariable(),
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let slotDisplay = WuxSheetMain.SlotDisplay("Slots", "attr_gear-equipmentslotstate", WuxDef.GetAttribute("Equipment"), WuxDef.GetAttribute("EquipmentSlots"));

                    let traitsDisplay = WuxDefinition.BuildText(
                        WuxDef.Get("Gear_EquippedItemTraits"),
                        `<span name="${WuxDef.GetAttribute("Gear_EquippedItemTraits")}"></span>`);

                    let unequipAllDef = WuxDef.Get("Gear_UnequipAll");
                    let contents = `${buildCurrency()}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${slotDisplay}
                        ${traitsDisplay}
                        ${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Equipment"), `<div style="float:right;">${WuxSheetMain.Button(unequipAllDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${unequipAllDef.getTitle()}`, "wuxRepeatingTechActionButton")}</div>`)}
                        ${WuxSheetMain.HiddenFieldToggle(equippedIsVisibleAttr, `<div>${repeaterContent}</div>`, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}`;

                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                },

                getGearAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Gear");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },

                buildRepeater = function (repeaterName, repeaterData) {
                    return `<div class="wuxNoRepControl">
                                <fieldset class="${repeaterName}">
                                    ${repeaterData}
                                </fieldset>
                            </div>`;
                }

            return {
                Print: print
            }
        }());

    return {
        Print: print
    };
}());

var DisplayActionSheet = DisplayActionSheet || (function () {
    'use strict';

    var
        print = function () {
            let output = WuxSheetNavigation.BuildActionsPageNavigation("Actions") +
                SideBarData.Print() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("Actions", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                print = function () {
                    // contents += WuxSheetSidebar.BuildLanguageSection();
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("ActionsData",
                        WuxSheetSidebar.Build("", `${WuxSheetSidebar.BuildChatSection()}
                        ${WuxSheetSidebar.BuildChecksSection()}
                        ${WuxSheetSidebar.BuildBoonSection()}
                        ${WuxSheetSidebar.BuildTechDebugSection()}`))}
                    ${WuxSheet.PageDisplay("StylesData",
                        WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Technique"))))}`;
                },

                buildTechPointsSection = function (fieldName, header) {
                    return `${WuxSheetSidebar.BuildPointsSection(fieldName, header)}
                    ${WuxSheetSidebar.BuildTechDebugSection()}`;
                }

            return {
                Print: print
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += buildStylesList();
                    contents += buildEquipTech();
                    contents += buildFormeActions();
                    return WuxSheetMain.Build(contents);
                },

                buildEquipTech = function () {
                    let contents = WuxSheetMain.MultiRowGroup(
                        [buildJobSelection(), buildSpiritChangeSection()],
                        WuxSheetMain.Table.FlexTable, 2);
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get("Title_TechniqueChange");
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("ActionsData",
                        WuxSheetMain.HiddenField(sectionDef.getAttribute(WuxDef._build),
                            WuxSheetMain.CollapsibleTab(
                                sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                                sectionDef.getTitle(), contents)))}`;
                },

                buildFormeActions = function () {
                    let contents = "";

                    contents += buildBaseFilterButtons();
                    contents += repeatingFormeSection();
                    contents += buildInstantConsumablesSection();
                    contents += repeatingCustomTechniquesSection();

                    contents = WuxSheetMain.TabBlock(contents);
                    let sectionDef = WuxDef.Get("Title_Techniques");
                    return WuxSheetMain.CollapsibleTab(sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                        `${sectionDef.getTitle()}`, contents);
                },

                buildBaseFilterButtons = function () {
                    let titleDef = WuxDef.Get("TechBaseFilter");
                    let baseFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechBaseFilter")]);
                    let items = [];
                    for (let i = 0; i < baseFilters.length; i++) {
                        items.push(WuxSheetMain.Button(baseFilters[i].getAttribute(), baseFilters[i].getTitle(), "wuxWidth120"));
                    }
                    return WuxSheetMain.Header(titleDef.getTitle()) + WuxSheetMain.MultiRow(items.join(""));
                },

                buildJobSelection = function () {
                    let jobSelection = new JobSelectionBuilder();
                    let specialTechs = buildStaticTechniqueDisplay("Job Change");
                    let contents = WuxSheetMain.HiddenField(WuxDef.Get("AdvancementJob").getAttribute(),
                        jobSelection.print() + specialTechs);
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxFlexTableItemGroup");
                },
                buildSpiritChangeSection = function () {
                    let affinityFilter = [WuxDef.Get("Unaspected")].concat(
                        WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])
                    );
                    let affinitySelect = WuxSheetMain.Select(WuxDef.GetAttribute("Affinity"), affinityFilter, false);
                    let content = `${WuxSheetMain.Header(WuxDef.GetTitle("Title_ChangeAffinity"))}
                        ${affinitySelect}
                        <div class="wuxRow">&nbsp;</div>
                        ${buildStaticTechniqueDisplay("Spirit Change")}`;
                    let contents = WuxSheetMain.HiddenField(WuxDef.Get("Perk_Spirit Conduit").getAttribute(), content);
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxFlexTableItemGroup");
                },
                buildStaticTechniqueDisplay = function (techniqueName) {
                    let technique = WuxTechs.Get(techniqueName);
                    if (technique == undefined) {
                        return "";
                    }
                    let displayData = new TechniqueDisplayData(technique);
                    displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                    displayData.technique.displayname = displayData.displayname;
                    displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                    let techDisplayDataBuilder = new TechniqueDisplayBuilderUsable(displayData);
                    techDisplayDataBuilder.setFeatureBonusClasses("wuxActionFeature");
                    return techDisplayDataBuilder.print();
                },

                buildItemTechniqueDisplay = function (item) {
                    if (item == undefined || !item.hasTechnique) {
                        return "";
                    }
                    let displayData = new TechniqueDisplayData(item.technique);
                    displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                    displayData.technique.displayname = displayData.displayname;
                    displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                    displayData.itemName = item.name;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    let countAttribute = WuxDef.GetAttribute("ItemCount", countMod);
                    let techDisplayDataBuilder = new TechniqueDisplayBuilderUsableWithCount(displayData);
                    techDisplayDataBuilder.setFeatureBonusClasses("wuxActionFeature");
                    techDisplayDataBuilder.setCountAttribute(countAttribute);
                    return WuxSheetMain.HiddenField(countAttribute, techDisplayDataBuilder.print());
                },

                buildInstantConsumablesSection = function () {
                    let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
                    let output = "";
                    for (let i = 0; i < consuTypes.length; i++) {
                        let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                        for (let j = 0; j < itemKeys.length; j++) {
                            output += buildItemTechniqueDisplay(itemKeys[j]);
                        }
                    }
                    if (output == "") {
                        return "";
                    }
                    let sectionDef = WuxDef.Get("Title_InstantConsumables");
                    return `${WuxSheetMain.Header(sectionDef.getTitle())}
                    <div class="wuxFlexTable">${output}</div>
                    ${WuxSheetMain.Row("&nbsp;")}`;
                },
                repeatingFormeSection = function () {
                    let repeaterDefinition = WuxDef.Get("RepeatingFormeTech");
                    let repeatingVariable = repeaterDefinition.getVariable();
                    let sectionDefinition = WuxDef.Get("Action_FormeTechniques");
                    let refreshField = sectionDefinition.getAttribute(WuxDef._refresh);
                    let sortField = sectionDefinition.getAttribute(WuxDef._subfilter);
                    let filterField = sectionDefinition.getAttribute(WuxDef._learn);
                    let removeFilterField = sectionDefinition.getAttribute(WuxDef._filter);

                    let header = getFormeSectionHeader(
                        `<span>${sectionDefinition.getTitle()}</span>`, refreshField, filterField, removeFilterField);

                    let actionDisplay = WuxSheetMain.HiddenField(getActionTypeAttribute("TechIsVisible"),
                        printFormTechniqueFullActionDisplay());
                    let displayTechniquesContents = buildRepeater(repeatingVariable, actionDisplay);

                    return `${WuxSheetMain.Header(header)}
                    ${displayTechniquesContents}
                    ${WuxSheetMain.Row("&nbsp;")}`;
                },
                repeatingCustomTechniquesSection = function () {
                    let repeatingDef = WuxDef.Get("RepeatingCustomTech");
                    let setDataTechniqueAttr = WuxDef.GetAttribute("Action_SetData");

                    let header = `<span>${repeatingDef.getTitle()}</span>`;

                    let actionDisplay = WuxSheetMain.HiddenFieldToggle(
                        setDataTechniqueAttr,
                        printFormTechniqueFullActionDisplay(),
                        WuxSheetMain.Input("text", setDataTechniqueAttr));

                    let contents = `<div class="wuxRepeatingFlexSection">
                            <fieldset class="${repeatingDef.getVariable()}">
                            ${actionDisplay}
                            </fieldset>
                        </div>`;

                    return `${WuxSheetMain.Header(header)}
                    ${contents}
                    ${WuxSheetMain.Row("&nbsp;")}`;

                    // return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                getFormeSectionHeader = function (headerName, refreshField, filterField, removeFilterField) {
                    let headerButtons = "";
                    let loadFormeField = WuxDef.GetAttribute("Action_FormeLoadCount");
                    let loadFormeDef = WuxDef.Get("Action_FormeLoad");
                    headerButtons += WuxSheetMain.HiddenField(loadFormeField, WuxSheetMain.Button(loadFormeDef.getAttribute(),
                        `<span class='wuxStyleHeaderButtonIcon'>&#10227;</span>${loadFormeDef.getTitle(`<span name="${loadFormeField}"></span>`)}`,
                        "wuxStyleHeaderButton"));
                    headerButtons += WuxSheetMain.Button(filterField,
                        "<span class='wuxStyleHeaderButtonIcon'>&#9776;</span> Filter", "wuxStyleHeaderButton");
                    headerButtons += WuxSheetMain.HiddenSpanField(removeFilterField, WuxSheetMain.Button(removeFilterField,
                        "<span class='wuxStyleHeaderButtonIconClear'>&#10008;</span> Remove Filter", "wuxStyleHeaderButton", "0"));

                    headerButtons = `${WuxSheet.MainPageDisplayInput()}
                        ${WuxSheet.PageDisplay("Actions",
                        `<span class="wuxStyleHeaderButtonContainer">${headerButtons}</span>`)}`;
                    return headerButtons + headerName;
                },

                printFormTechniqueFullActionDisplay = function () {
                    let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilderUsable(WuxDef.Get("Action"));

                    return `<input type="hidden" name="${WuxDef.GetAttribute("Action_Use")}" value="" />
                    <input type="hidden" name="${getActionTypeAttribute("TechVersion")}" value="" />
                    ${techniqueDisplayBuilder.print()}`;
                },

                getActionTypeAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Action");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },

                buildStylesList = function () {
                    let contents = "";
                    contents += WuxSheetMain.MultiRowGroup([
                            styleListSection("RepeatingStyles"), buildStyleFilter()],
                        WuxSheetMain.Table.FlexTableReverse, 2);
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get("Page_Styles");
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("StylesData",
                        WuxSheetMain.CollapsibleTab(
                            sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                            sectionDef.getTitle(), contents))}`;
                },

                styleListSection = function (repeatingSectionName) {
                    let repeatingDef = WuxDef.Get(repeatingSectionName);
                    let styleIsVisibleAttr = WuxDef.GetAttribute("Action_StyleIsVisible");
                    let repeaterContent = buildRepeater(repeatingDef.getVariable(), addStyleListRepeaterContents());
                    let contents = `${WuxSheetMain.Header(repeatingDef.getTitle())}
                        ${WuxSheetMain.HiddenFieldToggle(styleIsVisibleAttr, `<div>${repeaterContent}${WuxSheetMain.Row("&nbsp;")}</div>`, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}`;
                    return WuxSheetMain.Table.FlexTableGroup(contents);
                },

                addStyleListRepeaterContents = function () {
                    let nameDef = WuxDef.Get("Forme_Name");
                    let inspectDef = WuxDef.Get("Forme_Inspect");
                    let deleteDef = WuxDef.Get("Forme_Delete");
                    let tierOutput = "";

                    return `<div class="wuxMultiRow" style="min-width: 300px;">
                        ${tierOutput}
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>
                    </div>`;
                },

                buildRepeater = function (repeaterName, repeaterData) {
                    return `<div class="wuxNoRepControl wuxRepeatingFlexSection">
                        <fieldset class="${repeaterName}">
                            ${repeaterData}
                        </fieldset>
                    </div>`;
                },

                buildStyleFilter = function () {
                    let titleDef = WuxDef.Get("Title_LearnNewStyles");
                    let contents = WuxSheetMain.Header(titleDef.getTitle());
                    contents += buildStyleFilterCheckboxes();
                    contents += WuxSheetMain.Header2(WuxDef.GetTitle("Title_QuickStyleFilter"));
                    contents += buildRecommendedStyleFilterButton();
                    contents += buildStyleAutoFilterButtons();
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                buildStyleFilterCheckboxes = function () {
                    let nonElementDef = WuxDef.Get("Forme_ShowFromNonElement");
                    let levelRestrictedDef = WuxDef.Get("Forme_ShowLevelRestricted");
                    let items = [
                        WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                nonElementDef.getAttribute(),
                                nonElementDef.getAttribute(WuxDef._info),
                                WuxSheetMain.Header(nonElementDef.getTitle()),
                                WuxDefinition.TooltipDescription(nonElementDef))),
                        WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                levelRestrictedDef.getAttribute(),
                                levelRestrictedDef.getAttribute(WuxDef._info),
                                WuxSheetMain.Header(levelRestrictedDef.getTitle()),
                                WuxDefinition.TooltipDescription(levelRestrictedDef)))
                    ];
                    return `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_StyleFilterOption"))}
                    ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 1)}`;
                },

                buildRecommendedStyleFilterButton = function () {
                    let recommendedFilterDef = WuxDef.Get("Forme_RecommendedStyles");
                    let customFilterDef = WuxDef.Get("Forme_CustomStyleFilter");
                    let items = [];
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(recommendedFilterDef.getAttribute(), recommendedFilterDef.getTitle(), "wuxWidth160 wuxFocusButton")
                    ));
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(customFilterDef.getAttribute(), customFilterDef.getTitle(), "wuxWidth160")
                    ));
                    return WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 1);
                },

                buildStyleAutoFilterButtons = function () {
                    let baseGroups = WuxDef.Filter([
                        new DatabaseFilterData("group", "TechAutoFilter"),
                        new DatabaseFilterData("subGroup", "BaseGroup")
                    ]);

                    let filterOptions = [];
                    for (let i = 0; i < baseGroups.length; i++) {
                        let groupDef = baseGroups[i];
                        let groupButtons = WuxDef.Filter([
                            new DatabaseFilterData("group", "TechAutoFilter"),
                            new DatabaseFilterData("subGroup", groupDef.getTitle())
                        ]);

                        let items = [];
                        for (let j = 0; j < groupButtons.length; j++) {
                            items.push(WuxSheetMain.Table.FlexTableGroup(
                                WuxSheetMain.Button(groupButtons[j].getAttribute(), groupButtons[j].getTitle(), "wuxWidth90")
                            ));
                        }

                        let expandField = groupDef.getAttribute(WuxDef._expand);
                        let categoryHeader = WuxSheetMain.Header2(
                            WuxSheetMain.CollapsibleHeaderInverse(`<span>${groupDef.getTitle()}</span>`, expandField));
                        let categoryContent = WuxSheetMain.HiddenField(expandField,
                            WuxSheetMain.Table.FlexTable(items.join("")));

                        filterOptions.push(WuxSheetMain.Table.FlexTableGroup(categoryHeader + categoryContent));
                    }
                    return WuxSheetMain.MultiRowGroup(filterOptions, WuxSheetMain.Table.FlexTable, 1);
                }

            return {
                Print: print
            }
        }());

    return {
        Print: print
    };
}());

var DisplayPopups = DisplayPopups || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += printInspectionPopup();
            output += printFilterPopup();
            return printBasePopupSheet(output);
        },

        printBasePopupSheet = function (contents) {
            let popupActiveAttr = WuxDef.GetAttribute("Popup_PopupActive");
            contents = `<div class="wuxPopupOverlay">
                <input type="checkbox" class="wuxInput wuxPopupOverlayClose" name="${popupActiveAttr}" value="0" />
                ${contents}
            </div>`;

            return `${WuxSheetMain.HiddenField(popupActiveAttr, contents)}
            ${printSubMenuOverlay()}`;
        },

        printSubMenuOverlay = function () {
            let submenuActiveAttr = WuxDef.GetAttribute("Popup_SubMenuActive");
            return WuxSheetMain.HiddenField(submenuActiveAttr, `<div class="wuxSubMenuOverlay">
            ${WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_SubMenuActiveId"), "")}
            ${WuxSheetMain.Input("checkbox", submenuActiveAttr, "0")}
            </div>`);
        },

        printInspectionPopup = function () {
            return buildBasePopup(WuxDef.GetAttribute("Popup_InspectPopupActive"), InspectionPopup.Print(), InspectionPopup.PrintHeader());
        },

        printFilterPopup = function () {
            return buildBasePopup(WuxDef.GetAttribute("Popup_FilterPopupActive"), FilterPopup.Print(), FilterPopup.PrintHeader());
        },

        buildBasePopup = function (attribute, popupContents, popupHeaderContents) {
            popupContents = `<div class="wuxPopup">
                <div class="wuxPopupHeader">
                    <span class="wuxPopupInnerHeader" name="${WuxDef.GetAttribute("Popup_PopupName")}">Name</span>
                    ${popupHeaderContents}
                    ${WuxSheetMain.Button(WuxDef.GetAttribute("Popup_PopupActive"), "Exit", "wuxPopupClose")}
                </div>
                ${popupContents}
            </div>`;
            return WuxSheetMain.HiddenField(attribute, popupContents);
        },

        InspectionPopup = InspectionPopup || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_InspectSelectType"), "") + "\n";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_InspectSelectId"), "") + "\n";
                    contents += buildInspectionPopupContentData(buildItemTemplate() + buildTechniqueTemplate());
                    contents += buildInspectionPopupContentData(buildItemRepeater());
                    return `<div class="wuxInspectionPopupContents">${contents}</div>`;
                },
                printHeader = function () {
                    return printAddButton();
                },

                buildInspectionPopupContentData = function (contents) {
                    return `<div class="wuxInspectionPopupContentData">${contents}</div>`;
                },

                buildItemTemplate = function () {
                    let popupDef = WuxDef.Get("Popup");
                    let itemRepeaterDisplayBuilder = new ItemRepeaterDisplayBuilder(popupDef);

                    let fieldName = popupDef.getAttribute(`-${WuxDef.GetVariable("ItemName")}`);
                    return WuxSheetMain.HiddenField(fieldName,
                        `${WuxSheetMain.Header("Item Data")}
                        ${itemRepeaterDisplayBuilder.print()}`);
                },

                buildTechniqueTemplate = function () {
                    let popupDef = WuxDef.Get("Popup");
                    let output = "";
                    for (let i = 0; i < 4; i++) {
                        let fieldName = popupDef.getAttribute(`-${WuxDef.GetVariable("TechIsVisible")}${i}`);
                        let techHeaderAttr = popupDef.getAttribute(`-${WuxDef.GetVariable("TechHeader")}${i}`);
                        let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilder(popupDef, i);
                        output += `<div>${WuxSheetMain.HiddenField(fieldName,
                            WuxSheetMain.HiddenField(techHeaderAttr, WuxSheetMain.Header2(WuxSheetMain.Span(techHeaderAttr))) +
                            techniqueDisplayBuilder.print())}</div>`;
                    }

                    let fieldName = popupDef.getAttribute(`-${WuxDef.GetVariable("TechIsVisible")}0`);
                    return WuxSheetMain.HiddenField(fieldName,
                        `${WuxSheetMain.Header("Technique")}
                        ${output}`);
                },

                printAddButton = function () {
                    let addType2Attr = WuxDef.GetAttribute("Popup_InspectAddType", "2");
                    let disabledPurchaseButton = `<div class="wuxButton wuxButtonDisabled"><span name="${addType2Attr}"></span></div>`;

                    let costDef = WuxDef.Get("Title_InspectionItemCost");
                    let jinAndCost = `<div style="display:flex;flex-direction:column;">` +
                        `<div class="wuxSlotSection"><span class="wuxSlotLabel">${WuxDef.GetTitle("Title_YourJin")}</span><span class="wuxSlotData"><span name="${WuxDef.GetAttribute("Jin")}"></span><span> J</span></span></div>` +
                        `<div class="wuxSlotSection"><span class="wuxSlotLabel">${costDef.getTitle()}</span><span class="wuxSlotData"><span name="${costDef.getAttribute()}"></span></span></div>` +
                        `</div>`;
                    let buttons = `<div style="display:flex;flex-direction:column;gap:4px;">` +
                        WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd", "2"),
                            WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Popup_InspectPurchaseAffordable"),
                                WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick", "2"),
                                    `<span name="${addType2Attr}"></span>`, "wuxPopupActionButton"),
                                disabledPurchaseButton)) +
                        WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"),
                            WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick"),
                                `<span name="${WuxDef.GetAttribute("Popup_InspectAddType")}">Add</span>`, "wuxPopupActionButton")) +
                        `</div>`;
                    return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd", "2"),
                        jinAndCost) + buttons;
                },

                buildItemRepeater = function () {
                    let itemSelectNameAttr = WuxDef.GetAttribute("Popup_ItemSelectName");
                    let itemSelectTypeAttr = WuxDef.GetAttribute("Popup_ItemSelectType");
                    let itemSelectDisplayAttr = WuxDef.GetAttribute("Popup_ItemSelectDisplay");
                    let itemSelectIsOnAttr = WuxDef.GetAttribute("Popup_ItemSelectIsOn");
                    let itemSelectVisibleAttr = WuxDef.GetAttribute("Popup_ItemSelectVisible");
                    let affinityIcons =
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayNeutral"), `<img class="wuxAffinityIcon wuxAffinityIconNeutral" src="https://i.imgur.com/5hQ5Bun.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayWood"), `<img class="wuxAffinityIcon wuxAffinityIconWood"    src="https://i.imgur.com/pjMuXYy.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayFire"), `<img class="wuxAffinityIcon wuxAffinityIconFire"    src="https://i.imgur.com/aD41Ap4.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayEarth"), `<img class="wuxAffinityIcon wuxAffinityIconEarth"   src="https://i.imgur.com/1efdxRx.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayMetal"), `<img class="wuxAffinityIcon wuxAffinityIconMetal"   src="https://i.imgur.com/CFQ9LJx.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayWater"), `<img class="wuxAffinityIcon wuxAffinityIconWater"   src="https://i.imgur.com/KAcJG5h.png">`);
                    let itemData = WuxSheetMain.HiddenField(itemSelectVisibleAttr,
                        WuxSheetMain.HiddenFieldToggle(itemSelectTypeAttr,
                            `${WuxSheetMain.Input("hidden", itemSelectNameAttr)}
                        <input type="hidden" class="wuxInspectionPopupSelectContainer-flag" name="${itemSelectIsOnAttr}">
                        ${WuxSheetMain.Button(itemSelectIsOnAttr, WuxSheetMain.Span(itemSelectDisplayAttr) + affinityIcons, "wuxInspectionPopupSelectContainer")}`,
                            `${WuxSheetMain.Header2(WuxSheetMain.Span(itemSelectDisplayAttr))}
                        ${WuxSheetMain.HiddenField(itemSelectNameAttr, WuxSheetMain.Desc(WuxSheetMain.Span(itemSelectNameAttr)))}`)
                    );

                    let groupDef = WuxDef.Get("Popup_InspectSelectGroup")
                    return `${WuxSheetMain.Header(`<span name="${groupDef.getAttribute()}">${groupDef.getTitle()}</span>`)}
                    ${buildRepeater(WuxDef.GetVariable("ItemPopupValues"), itemData)}`;
                },

                buildRepeater = function (repeaterName, repeaterData) {
                    return `<div class="wuxNoRepControl">
                        <fieldset class="${repeaterName}">
                            ${repeaterData}
                        </fieldset>
                    </div>`;
                }

            return {
                Print: print,
                PrintHeader: printHeader
            }
        }()),

        FilterPopup = FilterPopup || (function () {
            'use strict';

            var
                print = function () {
                    let filterPopupDisplayTypeAttr = WuxDef.GetAttribute("Popup_FilterPopupDisplayType");
                    let contents = `${printClearFilterButton()}
                    ${WuxSheet.PageDisplayInput(filterPopupDisplayTypeAttr)}
                    ${WuxSheet.PageDisplay("FilterTechnique", buildTechniqueFilters())}
                    ${WuxSheet.PageDisplay("FilterItem", buildItemFilters())}
                    ${printApplyFilterButton()}`;
                    return `<div class="wuxFilterPopupContents">${contents}</div>`;
                },
                printHeader = function () {
                    return printApplyFilterButton();
                },

                buildTechniqueFilters = function () {
                    let filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");
                    let filterDisplay = new FilterDisplayBuilder(filterDefinitions);
                    return `${filterDisplay.print()}`;
                },

                buildItemFilters = function () {
                    let filterDefinitions = new EquipmentFilterDefinitions("Popup_FindItemsByFilter");
                    let filterDisplay = new FilterDisplayBuilder(filterDefinitions);
                    return `${filterDisplay.print()}`;
                },

                printApplyFilterButton = function () {
                    let applyFilterDef = WuxDef.Get("Popup_ApplyFilter");
                    return WuxSheetMain.Button(applyFilterDef.getAttribute(), `<span">${applyFilterDef.getTitle()}</span>`, "wuxPopupActionButton");
                },

                printClearFilterButton = function () {
                    let clearFilterDef = WuxDef.Get("Popup_ClearFilter");
                    return WuxSheetMain.Button(clearFilterDef.getAttribute(), `<span">${clearFilterDef.getTitle()}</span>`, "wuxPopupActionButton");
                }

            return {
                Print: print,
                PrintHeader: printHeader
            }
        }());

    return {
        Print: print
    };
}());

var DisplayLoadingScreen = DisplayLoadingScreen || (function () {
    'use strict';

    var
        print = function () {
            return printLoadingScreen();
        },

        printLoadingScreen = function () {
            let popupActiveAttr = WuxDef.GetAttribute("Loading");
            let contents = `<div class="wuxPopupOverlay">
                <div class="wuxLoading">
                    Loading&nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" height="100px" width="100px">
                </div>
            </div>`;

            return `${WuxSheetMain.HiddenField(popupActiveAttr, contents)}`;
        }

    return {
        Print: print
    };
}());// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

var WuxSheetBackend = WuxSheetBackend || (function () {
    'use strict';

    const onChange = function (variables, contents, hasEvents) {
            let output = "";
            for (let i = 0; i < variables.length; i++) {
                if (output != "") {
                    output += " ";
                }
                output += `change:${variables[i]}`;
            }
            return `on("${output}", function (${hasEvents != undefined ? "eventinfo" : ""}) {\n${contents}\n});\n`;

            // return `on("${output}", function (eventinfo) {
            // if(eventinfo.sourceType === "sheetworker") return;
            // ${contents}
            // });\n`;
        }
    ;
    const onRemove = function (variables, contents) {
            let output = "";
            for (let i = 0; i < variables.length; i++) {
                if (output != "") {
                    output += " ";
                }
                output += `remove:${variables[i]}`;
            }
            return `on("${output}", function (eventinfo) {\n${contents}\n});\n`;
        }
    ;
    return {
        OnChange: onChange,
        OnRemove: onRemove
    };
}());

var BuilderBackend = BuilderBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerCharacterCreationFinishButton();
            output += listenerCharacterCreationSetAffinity();
            output += listenerCharacterCreationBonusAttributes();
            output += listenerUpdateStyleBuildPoints();
            output += listenerSeeStyleTechniques();
            return output;
        },

        listenerCharacterCreationFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Character Creator", WuxDef._finish)];
            let output = `WuxWorkerCharacterCreation.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationSetAffinity = function () {
            let groupVariableNames = [
                WuxDef.GetVariable("AffinityAspect"),
                WuxDef.GetVariable("AdvancedAffinity")];
            let output = `WuxWorkerCharacterCreation.SetAffinityValue(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationBonusAttributes = function () {
            let groupVariableNames = [WuxDef.GetVariable("BonusAttributePoints")];
            let output = `WuxWorkerCharacterCreation.SetBonusAttributes();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },

        listenerUpdateStyleBuildPoints = function () {
            let allStyles = WuxDef.Filter([new DatabaseFilterData("group", "Style")]);
            let groupVariableNames = [];
            for(let i = 0; i < allStyles.length; i++) {
                groupVariableNames = groupVariableNames.concat(
                    WuxTechs.GetGroupVariables(new DatabaseFilterData("style", allStyles[i].getTitle())));
            }
        
            let output = "";
            output += WuxSheetBackend.OnChange(groupVariableNames,`WuxWorkerStyles.UpdateBuildPoints(eventinfo, 1)`, true);
            return output;
        },
        listenerSeeStyleTechniques = function () {
            let allStyles = WuxDef.Filter([new DatabaseFilterData("group", "Style")]);
            let groupVariableNames = [];
            for(let i = 0; i < allStyles.length; i++) {
                groupVariableNames = groupVariableNames.concat(
                    WuxTechs.GetGroupVariables(new DatabaseFilterData("style", allStyles[i].getTitle()), WuxDef._info));
            }
            let output = `WuxWorkerStyles.SeeTechniques(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
        

    return {
        Print: print
    }
}())

var TrainingBackend = TrainingBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";

            output += listenerTrainingGoToPageSet();
            output += listenerTrainingFinishButton();
            output += listenerTrainingExitButton();
            output += listenerConvertPp();
            output += listenerSetTrainingPoints();
            output += listenerSetTrainingPointsUpdate();
            output += listenerSetAdvancementKnowledgePoints();
            output += listenerUpdateKnowledgeBuildPoints();
            output += listenerRemoveLoreSpecialization();
            output += listenerUpdateLoreDescription();
            return output;

        },
        listenerTrainingGoToPageSet = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_Training")];
            let output = `WuxWorkerTraining.GoToPageSet();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerTrainingFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._finish)];
            let output = `WuxWorkerTraining.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerTrainingExitButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._exit)];
            let output = `WuxWorkerTraining.ExitBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerConvertPp = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_TrainingConversion")];
            let output = `WuxWorkerTraining.ConvertPp();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetTrainingPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("BonusTraining")];
            let output = `WuxWorkerAdvancement.SetBonusTrainingAdvancementPoints();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetTrainingPointsUpdate = function () {
            let groupVariableNames = [WuxDef.GetVariable("TrainingTechniques")];
            let output = `WuxWorkerTraining.SetTrainingPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementKnowledgePoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("TrainingKnowledge")];
            let output = `WuxWorkerAdvancement.SetAdvancementPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateKnowledgeBuildPoints = function () {
            let loreRepeaterIds = [
                "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
                "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
            ];
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Language"), WuxDef._rank);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "LoreCategory"), WuxDef._rank));
            for (let i = 0; i < loreRepeaterIds.length; i++) {
                groupVariableNames.push(`${WuxDef.GetVariable(loreRepeaterIds[i])}:${WuxDef.GetVariable("Lore_Tier")}`);
            }
            let output = `WuxWorkerKnowledges.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerRemoveLoreSpecialization = function () {
            const loreRepeaterIds = [
                "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
                "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
            ];
            let repeaterVarNames = loreRepeaterIds.map(id => WuxDef.GetVariable(id));
            let output = `WuxWorkerKnowledges.UpdateBuildPoints(eventinfo)`;
            return WuxSheetBackend.OnRemove(repeaterVarNames, output);
        },

        listenerUpdateLoreDescription = function () {
            const loreRepeaterIds = [
                "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
                "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
            ];
            let groupVariableNames = [];
            for (let i = 0; i < loreRepeaterIds.length; i++) {
                groupVariableNames.push(`${WuxDef.GetVariable(loreRepeaterIds[i])}:${WuxDef.GetVariable("Lore_SubType")}`);
            }
            let output = `WuxWorkerKnowledges.SetLoreDescription(eventinfo)`;
            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}())

var AdvancementBackend = AdvancementBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerGoToPageSet();
            output += listenerFinishButton();
            output += listenerExitButton();
            output += listenerConvertXp();
            output += listenerSetLevel();
            output += listenerSetAdvancementPoints();
            output += listenerSetAdvancementPerkTransferPoints();
            output += listenerSetAdvancementJobSkillPerkPoints();
            output += listenerUpdatePerkPoints();
            output += listenerUpdateSecondAffinityBranch();
            output += listenerPerkAutoFilterButtons();
            output += listenerSetIsPlayer();
            output += listenerUpdateJobBuildPoints();
            output += listenerSeeJobTechniques();
            output += listenerUpdateSkillBuildPoints();
            output += listenerUpdateAttributeBuildPoints();

            return output;
        },
        listenerGoToPageSet = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_Advancement")];
            let output = `WuxWorkerAdvancement.GoToPageSet();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._finish)];
            let output = `WuxWorkerAdvancement.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerExitButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._exit)];
            let output = `WuxWorkerAdvancement.ExitBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerConvertXp = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_AdvancementConversion")];
            let output = `WuxWorkerAdvancement.ConvertXp();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetLevel = function () {
            let groupVariableNames = [WuxDef.GetVariable("Level")];
            let output = `WuxWorkerAdvancement.SetLevel(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementTechnique")];
            let output = `WuxWorkerAdvancement.SetAdvancementPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementJobSkillPerkPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementJob"),
                WuxDef.GetVariable("AdvancementSkill")];
            let output = `WuxWorkerPerks.SetJobSkillPerkPoints(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementPerkTransferPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementPerkTransfer")];
            let output = `WuxWorkerAdvancement.SetAdvancementPerkTransferPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdatePerkPoints = function () {
            let variables = [];
            WuxPerks.Iterate(function (perk) {
                if (perk.group === "Perk Technique") return;
                variables.push(new PerkData(perk).createDefinition(WuxDef.Get("Perk")).getVariable());
            });
            return WuxSheetBackend.OnChange(variables, `WuxWorkerPerks.UpdateBuildPoints(eventinfo)`, true);
        },
        listenerUpdateSecondAffinityBranch = function () {
            let perkDef = new PerkData(WuxPerks.Get("Second Affinity")).createDefinition(WuxDef.Get("Perk"));
            return WuxSheetBackend.OnChange(
                [perkDef.getVariable(WuxDef._affinity)],
                `WuxWorkerPerks.UpdateSecondAffinityBranch(eventinfo)`,
                true
            );
        },
        listenerPerkAutoFilterButtons = function () {
            let perkFilters = WuxDef.Filter([new DatabaseFilterData("group", "PerkAutoFilter")]);
            let groupVariableNames = perkFilters.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerInspectPopup.OpenPerkFilterTechniqueInspection(eventinfo)`, true);
        },
        listenerSetIsPlayer = function () {
            return WuxSheetBackend.OnChange([WuxDef.GetVariable("Title_IsPlayer")], `WuxWorkerPerks.SetIsPlayer(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`, true);
        },
        listenerUpdateJobBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"));
            let output = `WuxWorkerJobs.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSeeJobTechniques = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"), WuxDef._info);
            let output = `WuxWorkerJobs.SeeTechniques(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSkillBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Skill"), WuxDef._rank);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Skill"), WuxDef._expertise));
            let output = `WuxWorkerSkills.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateAttributeBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Attribute"));
            let output = `WuxWorkerAttributes.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}())

var OverviewBuilder = OverviewBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdateDisplayName();
            output += listenerUpdateCharacterSheetName();
            output += listenerUpdateSheetName();
            output += listenerSetAffinity();
            output += listenerGenerateCharacter();
            output += listenerUseGeneration();
            output += listenerClearBackground();
            output += listenerUpdateCR();
            output += listenerUpdateSurge();
            output += listenerUpdateVitality();
            output += listenerOriginBuilderFieldsUpdate();
            return output;
        },
        listenerUpdateDisplayName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("DisplayName")}`];
            let output = `WuxWorkerGeneral.UpdateDisplayName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateCharacterSheetName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("CharSheetName")}`];
            let output = `WuxWorkerGeneral.UpdateCharacterSheetName(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSheetName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("SheetName")}`];
            let output = `WuxWorkerGeneral.UpdateSheetName(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAffinity = function () {
            let groupVariableNames = [WuxDef.GetVariable("Affinity")];
            let output = `WuxWorkerGeneral.UpdatePrimaryAffinity(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerGenerateCharacter = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_GenerateCharacter")}`];
            let output = `WuxWorkerGeneral.GenerateCharacter();\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUseGeneration = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_UseGeneration")}`];
            let output = `WuxWorkerGeneral.UseGeneration();\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerClearBackground = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_ClearBackground")}`];
            let output = `WuxWorkerGeneral.ClearBackground();\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdateCR = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("CR")}`];
            let output = `WuxWorkerGeneral.UpdateCR(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSurge = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Surge")}`];
            let output = `WuxWorkerGeneral.UpdateSurge(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateVitality = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Cmb_Vitality")}`];
            let output = `WuxWorkerGeneral.UpdateVitality(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerOriginBuilderFieldsUpdate = function () {
            let groupVariableNames = [
                WuxDef.GetVariable("FullName"),
                WuxDef.GetVariable("Ancestry"),
                WuxDef.GetVariable("Ethnicity"),
                WuxDef.GetVariable("QuickDescription"),
                WuxDef.GetVariable("Jin"),
                WuxDef.GetVariable("Title"),
                WuxDef.GetVariable("Age"),
                WuxDef.GetVariable("Gender"),
                WuxDef.GetVariable("HomeRegion"),
                WuxDef.GetVariable("Backstory"),
                WuxDef.GetVariable("Note_GenName"),
                WuxDef.GetVariable("Note_GenFullName"),
                WuxDef.GetVariable("Note_GenGender"),
                WuxDef.GetVariable("Note_GenHomeRegion"),
                WuxDef.GetVariable("Note_GenRace"),
                WuxDef.GetVariable("Note_GenPersonality"),
                WuxDef.GetVariable("Note_GenMotivation")
            ];
            let output = `WuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        }

    return {
        Print: print
    }
}());

var FormeBuilder = FormeBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerEquipRepeatingForme();
            output += listenerInspectRepeatingForme();
            output += listenerSetFormeOptions();
            output += listenerJobSelect();
            output += listenerInspectListStyle();
            output += listenerDeleteListStyle();
            output += listenerInspectListPerk();
            output += listenerDeleteListPerk();
            return output;
        },
        listenerEquipRepeatingForme = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingJobStyles")}:${WuxDef.GetVariable("Forme_IsEquipped")}`],
                `WuxWorkerStyles.ToggleEquipJobStyle(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_IsEquipped")}`],
                `WuxWorkerStyles.ToggleEquipStyle(eventinfo)`, true)}
                `;
        },
        listenerInspectRepeatingForme = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingJobStyles")}:${WuxDef.GetVariable("Forme_SeeTechniques")}`],
                `WuxWorkerStyles.SeeJobTechniques(eventinfo)`, true)}
                    ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_SeeTechniques")}`],
                `WuxWorkerStyles.SeeStyleTechniques(eventinfo)`, true)}`;
        },
        listenerSetFormeOptions = function () {
            let jobEquipSlotDef = WuxDef.Get("Forme_JobSlot");
            let arteformSlotDef = WuxDef.Get("Forme_AdvancedSlot");
            let advancedSlotDef = WuxDef.Get("Forme_StyleSlot");
            let output = "";
            for (let i = 1; i <= 6; i++) {
                if (i <= 3) {
                    output += WuxSheetBackend.OnChange([jobEquipSlotDef.getVariable(i + WuxDef._build)],
                        `WuxWorkerStyles.UnequipSetJobStyle(eventinfo, ${i}, "${jobEquipSlotDef.getVariable(i)}")`, true);
                    output += WuxSheetBackend.OnChange([jobEquipSlotDef.getVariable(i + WuxDef._info)],
                        `WuxWorkerStyles.InspectSetJobStyle(eventinfo, ${i}, "${jobEquipSlotDef.getVariable(i)}")`, true);
                    output += WuxSheetBackend.OnChange([arteformSlotDef.getVariable(i + WuxDef._build)],
                        `WuxWorkerStyles.UnequipSetStyle(eventinfo, ${i}, "${arteformSlotDef.getVariable(i)}")`, true);
                    output += WuxSheetBackend.OnChange([arteformSlotDef.getVariable(i + WuxDef._info)],
                        `WuxWorkerStyles.InspectSetStyle(eventinfo, ${i}, "${arteformSlotDef.getVariable(i)}")`, true);
                }
                output += WuxSheetBackend.OnChange([advancedSlotDef.getVariable(i + WuxDef._build)],
                    `WuxWorkerStyles.UnequipSetStyle(eventinfo, ${i}, "${advancedSlotDef.getVariable(i)}")`, true);
                output += WuxSheetBackend.OnChange([advancedSlotDef.getVariable(i + WuxDef._info)],
                    `WuxWorkerStyles.InspectSetStyle(eventinfo, ${i}, "${advancedSlotDef.getVariable(i)}")`, true);
            }

            return output;
        },
        listenerJobSelect = function () {
            return `${WuxSheetBackend.OnChange([WuxDef.GetVariable("Forme_SelectJob")],
                `WuxWorkerJobs.EquipJobFromEvent(eventinfo)`, true)}`;
        },
        listenerInspectListStyle = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_Inspect")}`],
                `WuxWorkerStyles.InspectListStyle(eventinfo)`, true);
        },
        listenerDeleteListStyle = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_Delete")}`],
                `WuxWorkerStyles.DeleteListStyle(eventinfo)`, true);
        },
        listenerInspectListPerk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingPerks")}:${WuxDef.GetVariable("Forme_Inspect")}`],
                `WuxWorkerPerks.InspectListPerk(eventinfo)`, true);
        },
        listenerDeleteListPerk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingPerks")}:${WuxDef.GetVariable("Forme_Delete")}`],
                `WuxWorkerPerks.DeleteListPerk(eventinfo)`, true);
        }
    return {
        Print: print
    }
}());

var GearBuilder = GearBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerFindItemsButtons();
            output += listenerFindGearButtons();
            output += listenerFindGoodsButtons();
            output += listenerFindFoodButtons();
            output += listenerFindIngButtons();
            output += listenerBuyGearItem();
            output += listenerBuyGearItemBulk();
            output += listenerInspectGearItem();
            output += listenerDeleteGearItem();
            output += listenerBuyFoodsItem();
            output += listenerBuyFoodsItemBulk();
            output += listenerInspectFoodsItem();
            output += listenerDeleteFoodsItem();
            output += listenerFindConsumablesButtons();
            output += listenerBuyConsumable();
            output += listenerBuyConsumableBulk();
            output += listenerEquipConsumable();
            output += listenerUnequipConsumable();
            output += listenerDeleteRepeatingConsumable();
            output += listenerInspectRepeatingConsumable();
            output += listenerInspectSyncedConsumable();
            output += listenerBuySyncedConsumable();
            output += listenerPurchaseRepeatingEquipment();
            output += listenerEquipRepeatingEquipment();
            output += listenerEquipGearItem();
            output += listenerUnequipGearItem();
            output += listenerDeleteRepeatingEquipment();
            output += listenerInspectRepeatingEquipment();
            output += listenerInspectSyncedEquipment();
            output += listenerUpdateEquipment();
            output += listenerRemoveAllEquipment();
            output += listenerUnequipAllGear();
            output += listenerUpdateConsumables();
            output += listenerRemoveAllConsumables();
            output += listenerUnequipAllConsumables();
            output += listenerSetGearOptions();
            return output;
        },
        listenerFindItemsButtons = function () {
            let equipmentTypes = WuxDef.Filter([new DatabaseFilterData("group", "EquipmentType")]);
            let variables = equipmentTypes.map(def => def.getVariable());
            variables.push(WuxDef.GetVariable("Popup_FindItemsByFilter"));
            variables.push(WuxDef.GetVariable("Popup_FindItemsByTechnique"));
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindItems(eventinfo)`, true);
        },
        listenerFindGearButtons = function () {
            let gearTypes = WuxDef.Filter([new DatabaseFilterData("group", "GearType")]);
            let variables = gearTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindGear(eventinfo)`, true);
        },
        listenerFindGoodsButtons = function () {
            let goodsTypes = WuxDef.Filter([new DatabaseFilterData("group", "GoodsType")]);
            let variables = goodsTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindGoodsForGear(eventinfo)`, true);
        },
        listenerFindFoodButtons = function () {
            let foodTypes = WuxDef.Filter([new DatabaseFilterData("group", "FoodType")]);
            let variables = foodTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindFoodsItem(eventinfo)`, true);
        },
        listenerFindIngButtons = function () {
            let ingTypes = WuxDef.Filter([new DatabaseFilterData("group", "IngType")]);
            let variables = ingTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindIngsItem(eventinfo)`, true);
        },
        listenerBuyGearItem = function () {
            return WuxSheetBackend.OnChange(
                [`repeating_gear:${WuxDef.GetVariable("Gear_Buy")}`],
                `WuxWorkerGear.BuyGearItem(eventinfo)`, true);
        },
        listenerBuyGearItemBulk = function () {
            return WuxSheetBackend.OnChange(
                [`repeating_gear:${WuxDef.GetVariable("Gear_BuyBulk")}`],
                `WuxWorkerGear.BuyGearItemBulk(eventinfo)`, true);
        },
        listenerInspectGearItem = function () {
            return WuxSheetBackend.OnChange(
                [`repeating_gear:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectGearItem(eventinfo)`, true);
        },
        listenerDeleteGearItem = function () {
            return WuxSheetBackend.OnChange(
                [`repeating_gear:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteGearItem(eventinfo)`, true);
        },
        listenerBuyFoodsItem = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingFoods")}:${WuxDef.GetVariable("Gear_Buy")}`],
                `WuxWorkerGear.BuyFoodsItem(eventinfo)`, true);
        },
        listenerBuyFoodsItemBulk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingFoods")}:${WuxDef.GetVariable("Gear_BuyBulk")}`],
                `WuxWorkerGear.BuyFoodsItemBulk(eventinfo)`, true);
        },
        listenerInspectFoodsItem = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingFoods")}:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectFoodsItem(eventinfo)`, true);
        },
        listenerDeleteFoodsItem = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingFoods")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteFoodsItem(eventinfo)`, true);
        },
        listenerFindConsumablesButtons = function () {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let variables = consuTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindConsumables(eventinfo)`, true);
        },
        listenerBuyConsumable = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Buy")}`],
                `WuxWorkerGear.BuyConsumable(eventinfo)`, true);
        },
        listenerBuyConsumableBulk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_BuyBulk")}`],
                `WuxWorkerGear.BuyConsumableBulk(eventinfo)`, true);
        },
        listenerEquipConsumable = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Equip")}`],
                `WuxWorkerGear.EquipConsumable(eventinfo)`, true);
        },
        listenerUnequipConsumable = function () {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let output = "";
            for (let i = 0; i < consuTypes.length; i++) {
                let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                for (let j = 0; j < itemKeys.length; j++) {
                    let item = itemKeys[j];
                    if (item == undefined) continue;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    output += WuxSheetBackend.OnChange(
                        [WuxDef.GetVariable("Gear_Unequip", countMod)],
                        `WuxWorkerGear.UnequipConsumable(eventinfo, "${item.name}")`, true);
                }
            }
            return output;
        },
        listenerDeleteRepeatingConsumable = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteConsumable(eventinfo)`, true);
        },
        listenerInspectRepeatingConsumable = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectConsumable(eventinfo, "RepeatingConsumables")`, true);
        },
        listenerInspectSyncedConsumable = function () {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let output = "";
            for (let i = 0; i < consuTypes.length; i++) {
                let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                for (let j = 0; j < itemKeys.length; j++) {
                    let item = itemKeys[j];
                    if (item == undefined) continue;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    output += WuxSheetBackend.OnChange(
                        [WuxDef.GetVariable("Gear_Inspect", countMod)],
                        `WuxWorkerGear.InspectSyncedConsumable(eventinfo, "${item.name}")`, true);
                }
            }
            return output;
        },

        listenerBuySyncedConsumable = function () {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let output = "";
            for (let i = 0; i < consuTypes.length; i++) {
                let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                for (let j = 0; j < itemKeys.length; j++) {
                    let item = itemKeys[j];
                    if (item == undefined) continue;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    output += WuxSheetBackend.OnChange(
                        [WuxDef.GetVariable("Gear_Buy", countMod)],
                        `WuxWorkerGear.BuySyncedConsumable(eventinfo, "${item.name}")`, true);
                }
            }
            return output;
        },
        listenerEquipRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_ItemIsEquipped")}`],
                `WuxWorkerGear.ToggleEquipItem(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_EquipWeapon")}`],
                `WuxWorkerGear.EquipWeapon(eventinfo)`, true)}
                `;
        },
        listenerPurchaseRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Purchase")}`],
                `WuxWorkerGear.PurchaseGear(eventinfo, "RepeatingEquipment")`, true)}`;
        },
        listenerEquipGearItem = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Equip")}`],
                `WuxWorkerGear.EquipGear(eventinfo)`, true)}`;
        },
        listenerUnequipGearItem = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingSyncedEquipment")}:${WuxDef.GetVariable("Gear_Unequip")}`],
                `WuxWorkerGear.UnequipGear(eventinfo)`, true)}`;
        },
        listenerDeleteRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteGear(eventinfo, "RepeatingEquipment")`, true)}`;
        },
        listenerInspectRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectGear(eventinfo, "RepeatingEquipment")`, true)}`;
        },
        listenerInspectSyncedEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingSyncedEquipment")}:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectGear(eventinfo, "RepeatingSyncedEquipment")`, true)}`;
        },
        listenerUpdateEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UpdateEquipment")],
                `WuxWorkerGear.UpdateEquipment(eventinfo)`, true)}`;
        },
        listenerRemoveAllEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_RemoveEquipment")],
                `WuxWorkerGear.RemoveAllEquipment(eventinfo)`, true)}`;
        },
        listenerUnequipAllGear = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UnequipAll")],
                `WuxWorkerGear.UnequipAllGear(eventinfo)`, true)}`;
        },
        listenerUnequipAllConsumables = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UnequipAll", "consumable")],
                `WuxWorkerGear.UnequipAllConsumables(eventinfo)`, true)}`;
        },
        listenerUpdateConsumables = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UpdateConsumables")],
                `WuxWorkerGear.UpdateConsumables(eventinfo)`, true)}`;
        },
        listenerRemoveAllConsumables = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_RemoveConsumables")],
                `WuxWorkerGear.RemoveAllConsumables(eventinfo)`, true)}`;
        },
        listenerSetGearOptions = function () {
            let output = "";
            
            let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
            output += WuxSheetBackend.OnChange([weaponSlotDef.getVariable(1 + WuxDef._build)],
                `WuxWorkerGear.UnequipSetGear(eventinfo, 1, "${weaponSlotDef.getVariable(1)}")`, true);
            output += WuxSheetBackend.OnChange([weaponSlotDef.getVariable(1 + WuxDef._info)],
                `WuxWorkerGear.InspectSetGear(eventinfo, 1, "${weaponSlotDef.getVariable(1)}")`, true);
            
            let equipSlotDef = WuxDef.Get("Gear_EquipmentSlot");
            for (let i = 1; i <= 9; i++) {
                output += WuxSheetBackend.OnChange([equipSlotDef.getVariable(i + WuxDef._build)],
                    `WuxWorkerGear.UnequipSetGear(eventinfo, ${i}, "${equipSlotDef.getVariable(i)}")`, true);
                output += WuxSheetBackend.OnChange([equipSlotDef.getVariable(i + WuxDef._info)],
                    `WuxWorkerGear.InspectSetGear(eventinfo, ${i}, "${equipSlotDef.getVariable(i)}")`, true);
            }

            return output;
        }
    return {
        Print: print
    }
}());

var ActionBuilder = ActionBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerEnterActionsPage();
            output += listenerRankRepeatingStyles();
            output += listenerSetDataRepeatingStyles();
            output += listenerFormeButtonActions();
            output += listenerRefreshBasicActions();
            output += listenerTechniquesFilterPopup();
            output += listenerStyleAutoFilterButtons();
            output += listenerBaseFilterButtons();
            output += listenerUpdateTechniqueChangeVisibility();
            return output;
        },
        listenerEnterActionsPage = function () {
            return WuxSheetBackend.OnChange([WuxDef.GetVariable("Page")], `WuxWorkerActions.OnEnterActionsPage(eventinfo);\n`, true);
        },
        listenerRankRepeatingStyles = function () {
            let repeaters = ["RepeatingFormeTech"];
            let baseDef = WuxDef.Get("Action");
            let rankUpVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechRankUp")}`);
            let rankDownVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechRankDown")}`);
            
            let output = "";
            for (let i = 0; i < repeaters.length; i++) {
                let repeaterName = repeaters[i];
                let repeaterVar =  WuxDef.GetVariable(repeaterName);
                output += `${WuxSheetBackend.OnChange([`${repeaterVar}:${rankUpVar}`],
                    `WuxWorkerActions.RankUpTechnique(eventinfo, "${repeaterName}")`, true)}
                ${WuxSheetBackend.OnChange([`${repeaterVar}:${rankDownVar}`],
                    `WuxWorkerActions.RankDownTechnique(eventinfo, "${repeaterName}")`, true)}`;
            }
            
            return output;
        },
        listenerSetDataRepeatingStyles = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingCustomTech")}:${WuxDef.GetVariable("Action_SetData")}`],
                `WuxWorkerActions.SetCustomTechnique(eventinfo)`, true)}`;
        },
        listenerFormeButtonActions = function () {
            let output = "";

            let formeTechniqueDef = WuxDef.Get("Action_FormeTechniques");
            let refreshField = formeTechniqueDef.getVariable(WuxDef._refresh);
            output += `${WuxSheetBackend.OnChange([refreshField], `WuxWorkerActions.RefreshAllFormeActions()`, false)}`;
            let loadFormeField = WuxDef.GetVariable("Action_FormeLoad");
            output += `${WuxSheetBackend.OnChange([loadFormeField], `WuxWorkerActions.LoadFormeActions()`, false)}`;
            return output;
        },
        listenerRefreshBasicActions = function () {
            let output = "";

            output += `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RefreshTech")}`],
                `WuxWorkerActions.RemoveAllOldStyleData()`, false)}`;
            return output;
        },
        listenerTechniquesFilterPopup = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Action_FormeTechniques", WuxDef._learn)],
                `WuxWorkerFilterPopup.OpenFormeTechnique()`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter)],
                `WuxWorkerFilterPopup.RemoveFilter()`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Forme_CustomStyleFilter")],
                `WuxWorkerFilterPopup.OpenCustomStyleFilter()`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Forme_RecommendedStyles")],
                `WuxWorkerInspectPopup.OpenRecommendedStylesInspection()`, true)}`;
        },
        listenerStyleAutoFilterButtons = function () {
            let autoFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechAutoFilter")]);
            let groupVariableNames = [];
            for (let i = 0; i < autoFilters.length; i++) {
                groupVariableNames.push(autoFilters[i].getVariable());
            }
            return WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerInspectPopup.OpenStyleFilterTechniqueInspection(eventinfo)`, true);
        },
        listenerBaseFilterButtons = function () {
            let baseFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechBaseFilter")]);
            let groupVariableNames = [];
            for (let i = 0; i < baseFilters.length; i++) {
                groupVariableNames.push(baseFilters[i].getVariable());
            }
            return WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerActions.QuickFilterFormeActions(eventinfo)`, true);
        },
        listenerUpdateTechniqueChangeVisibility = function () {
            return WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("Perk_Spirit Conduit")],
                `WuxWorkerActions.UpdateTechniqueChangeVisibility()`, true);
        }
    return {
        Print: print
    }
}());

var PopupBuilder = PopupBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerOpenSubMenu();
            output += listenerCloseSubMenu();
            output += listenerClosePopup();
            output += listenerUpdateRepeatingItemInspectPopupItems();
            output += listenerInspectPopupButtons();
            output += listenerFilterPopupButtons();
            return output;
        },
        listenerOpenSubMenu = function () {
            let groupVariableNames = [];
            groupVariableNames.push(WuxDef.GetVariable("Note_OpenNotebookActions"));
            
            let notebookCount = parseInt(WuxDef.Get("Note_NotebookCount").formula.getValue());
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = groupVariableNames.concat([WuxDef.GetVariable("Note_NotebookActions", i)]);
            }
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingJobStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingAdvancedStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            let jobEquipSlotDef = WuxDef.Get("Forme_JobSlot");
            let arteformSlotDef = WuxDef.Get("Forme_AdvancedSlot");
            let advancedSlotDef = WuxDef.Get("Forme_StyleSlot");
            for (let i = 1; i <= 6; i++) {
                if (i <= 3) {
                    groupVariableNames = groupVariableNames.concat([jobEquipSlotDef.getVariable(i + WuxDef._submenu), 
                        arteformSlotDef.getVariable(i + WuxDef._submenu)]);
                }
                groupVariableNames = groupVariableNames.concat([advancedSlotDef.getVariable(i + WuxDef._submenu)]);
            }

            // let basicStyleFilters = WuxDef.Filter([new DatabaseFilterData("group", "BasicStyleGroup")]);
            // for (let i = 0; i < basicStyleFilters.length; i++) {
            //     let techniquesFilterData = WuxTechs.Filter([new DatabaseFilterData("style", basicStyleFilters[i].getTitle())]);
            //     for (let j = 0; j < techniquesFilterData.length; j++) {
            //         let techDef = techniquesFilterData[j].createDefinition(WuxDef.Get("Technique"));
            //         groupVariableNames = groupVariableNames.concat([techDef.getVariable(WuxDef._submenu)]);
            //     }
            // }

            let actionFieldName = `${WuxDef.GetVariable("Gear")}-${WuxDef.GetVariable("ItemAction")}`;
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingEquipment")}:${actionFieldName}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingConsumables")}:${actionFieldName}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingFoods")}:${actionFieldName}`]);
            
            for (let i = 1; i <= 3; i++) {
                groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingJobTech", i)}:${WuxDef.GetVariable("Action_Actions")}`]);
            }
            for (let i = 1; i <= 9; i++) {
                groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingAdvTech", i)}:${WuxDef.GetVariable("Action_Actions")}`]);
            }
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingGearTech")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicActions")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicRecovery")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicAttack")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicSocial")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingCustomTech")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"), WuxDef._expand));
            
            let output = `WuxWorkerGeneral.OpenSubMenu(eventinfo)`;
            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCloseSubMenu = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_SubMenuActive")}`];
            let output = `WuxWorkerGeneral.CloseSubMenu()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerClosePopup = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_PopupActive")}`];
            let output = `WuxWorkerGeneral.ClosePopup()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerInspectPopupButtons = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_InspectAddClick")}`],
                `WuxWorkerInspectPopup.AddSelectedInspectElement()`, false)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_InspectAddClick", "2")}`],
                `WuxWorkerInspectPopup.AddSelectedInspectElement2()`, false)}`;
        },
        listenerUpdateRepeatingItemInspectPopupItems = function () {
            let repeatingSection = WuxDef.GetVariable("ItemPopupValues");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Popup_ItemSelectIsOn")}`];
            let output = `WuxWorkerInspectPopup.SelectInspectionItemFromActiveGroup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerFilterPopupButtons = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_ApplyFilter")}`],
                `WuxWorkerFilterPopup.ApplyFilter()`, false)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_ClearFilter")}`],
                `WuxWorkerFilterPopup.ClearFilter()`, false)}`;
        }
    return {
        Print: print
    }
}());

var ChatBuilder = ChatBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdatePostContent();
            output += listenerUpdatePostType();
            output += listenerUpdateLanguage();
            output += listenerUpdateRepeatingChatSelection();
            output += listenerUpdateRepeatingChatEmoteSetName();
            output += listenerUpdateRepeatingChatEmoteSetInput();
            output += listenerUpdateRepeatingChatEmoteDefaultUrlUpdate();
            output += listenerUpdateRepeatingChatEmoteNameUpdate();
            output += listenerUpdateRepeatingChatEmoteUrlUpdate();
            output += listenerUpdateRepeatingChatPostTarget();
            
            let notebookCount = parseInt(WuxDef.Get("Note_NotebookCount").formula.getValue());
            output += listenerRepeatingNotebookOpen(notebookCount);
            output += listenerUpdateNotebookPageType(notebookCount);
            output += listenerUpdateNotebookPageTemplateData(notebookCount);
            output += listenerUpdateNotebookPageDelete(notebookCount);
            output += listenerUpdateNotebookPageData(notebookCount);
            return output;
        },
        listenerUpdatePostContent = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Message")}`];
            let output = `WuxWorkerChat.UpdatePostContent(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdatePostType = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Type")}`];
            let output = `WuxWorkerChat.UpdatePostType(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdateLanguage = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Language")}`];
            let output = `WuxWorkerChat.UpdateSelectedLanguage(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatSelection = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName", WuxDef._learn)}`];
            let output = `WuxWorkerChat.SelectOutfit(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetName = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName")}`];
            let output = `WuxWorkerChat.UpdateNameOutfit(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetInput = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitEmotes")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesGroup(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteDefaultUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefaultURL")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesDefaultUrl(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteNameUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefault")}`];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteName")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesName(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteURL")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesUrl(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatPostTarget = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingActiveEmotesNotes");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_PostEmoteNote")}`];
            let output = `WuxWorkerChat.PostToNotebook(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerRepeatingNotebookOpen = function (notebookCount) {
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [WuxDef.GetVariable("Note_NotebookOpen", i)];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.OpenNotebook(eventinfo, ${i})`, true);
            }

            return output;
        },
        listenerUpdateNotebookPageType = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [`${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageType")}`];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageType(eventinfo, ${i})`, true);
            }

            return output;
        },
        listenerUpdateNotebookPageTemplateData = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [`${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageTemplateData")}`];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageTemplateData(eventinfo, ${i})`, true);
            }

            return output
        },
        listenerUpdateNotebookPageDelete = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [`${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageDelete")}`];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageDelete(eventinfo, ${i})`, true);
            }

            return output;
        },
        listenerUpdateNotebookPageData = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageContents")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageLocation")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageArea")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageDate")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageTime")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharName")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharURL")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharEmote")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharLanguage")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageQuestName")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageChapter")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PagePart")}`
                ];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageData(eventinfo, ${i})`, true);
            }

            return output;
        }
    return {
        Print: print
    }
}());

// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

var BuildCharacterSheet = BuildCharacterSheet || (function () {
    'use strict';

    var
        printTech = function (sheetsDb) {
            let output = "";
            output += buildCharacterSheetTechHtml(sheetsDb);
            return output;
        },

        printBase = function (sheetsDb) {
            let output = "";
            output += buildCharacterSheetBaseHtml(sheetsDb);
            output += buildHiddenFields();
            output += buildSheetWorkerContainer(sheetsDb);
            return output;
        },

        buildCharacterSheetTechHtml = function (sheetsDb) {
            let output = "";
            // output += DisplayTechniquesSheet.Print(sheetsDb);
            return `<div class="wuxCharacterSheet">\n${WuxSheet.MainPageDisplayInput()}\n${output}\n`;
        },

        buildCharacterSheetBaseHtml = function (sheetsDb) {
            let output = "";
            output += DisplayOriginSheet.Print();
            output += DisplayTrainingSheet.Print(sheetsDb);
            output += DisplayAdvancementSheet.Print(sheetsDb);
            output += DisplayStylesSheet.Print(sheetsDb);
            output += DisplayCoreCharacterSheet.Print(sheetsDb);
            output += DisplayGearSheet.Print(sheetsDb);
            output += DisplayActionSheet.Print(sheetsDb);
            output += DisplayPopups.Print();
            output += DisplayLoadingScreen.Print();
            return `<div class="wuxCharacterSheet">
                ${WuxSheet.MainPageDisplayInput()}
                ${output}
            </div>`;
        },

        buildHiddenFields = function () {
            let output = "";
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Technique", WuxDef._page, WuxDef._learn));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("CombatDetails"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("JobSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("AdvancedSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("StyleSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("EquipmentSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("TargetHV"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("TargetFavor"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("XP"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("PP"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("TeamIndex"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Equipment", WuxDef._build), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Consumable", WuxDef._build), 0);

            let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", "Social")]);
            for (let i = 0; i < filteredStats.length; i++) {
                output += WuxSheetMain.Input("hidden", filteredStats[i].getAttribute());
            }

            return `<div class="wuxHiddenFields">
			${output}
			</div>`;
        },

        buildSheetWorkerContainer = function (sheetsDb) {
            let output = "";
            output += BuilderBackend.Print(sheetsDb);
            output += TrainingBackend.Print(sheetsDb);
            output += AdvancementBackend.Print(sheetsDb);
            output += OverviewBuilder.Print();
            output += FormeBuilder.Print();
            output += GearBuilder.Print();
            output += ActionBuilder.Print();
            output += PopupBuilder.Print();
            output += ChatBuilder.Print();
            return `<script type="text/worker">
			on("sheet:opened", function(eventinfo) {
				on_sheet_opened();
			});
			${output}
			`;
        }
    ;
    return {
        PrintBase: printBase,
        PrintTech: printTech
    };
}());

var DisplayOriginSheet = DisplayOriginSheet || (function () {
    'use strict';

    var
        print = function () {
            let definition = WuxDef.Get("Page_Origin");
            let output = WuxSheetNavigation.BuildOriginPageNavigation(definition) +
                SideBarData.Print() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("Origin", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                print = function () {
                    return WuxSheetSidebar.Build("", "");
                },

                buildTechPointsSection = function (fieldName, headerText) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName, headerText);
                }

            return {
                Print: print
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let output = "";
                    output += printBasics();

                    return output;
                },

                printBasics = function () {
                    let contents = buildBasicsData.Build();

                    return WuxSheetMain.Build(contents);
                },

                buildBasicsData = buildBasicsData || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            let definition = WuxDef.Get("Page_Origin");
                            let backgroundBuilder = new CharacterBackgroundBuilder();
                            contents += `${WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title,
                                WuxSheetMain.TabBlock(backgroundBuilder.print()))}`;
                            contents += new ChatDisplayBuilder(false).print();
                            return contents;
                        }

                    return {
                        Build: build
                    }
                }())

            return {
                Print: print
            }
        }());
    return {
        Print: print
    };
}());

var DisplayTrainingSheet = DisplayTrainingSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = "";
            output += printTraining();
            return output;
        },

        printTraining = function () {
            let definition = WuxDef.Get("Page_Training");
            let output = WuxSheetNavigation.BuildTrainingPageNavigation(definition) +
                SideBarData.PrintTraining() +
                MainContentData.PrintTraining();
            return WuxSheet.PageDisplay("Training", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printTraining = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Training")));
                },

                buildTechPointsSection = function (fieldName) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName);
                }

            return {
                PrintTraining: printTraining
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                printTraining = function () {
                    return WuxSheetMain.Build(training.Build());
                },

                training = training || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = WuxSheetMain.MultiRowGroup([buildConversion(), buildTraining()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Training");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildConversion = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_TrainingConversion");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            let ppDefinition = WuxDef.Get("PP");
                            contents += WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(), `To Training Point: ${ppDefinition.formula.getValue()}`);
                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Convert To TP`));

                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildTraining = function () {
                            let contents = "";
                            contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginTraining"));
                            contents += WuxDefinition.BuildText(WuxDef.Get("Training"),
                                `${WuxSheetMain.Span(WuxDef.GetAttribute("Training"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Training", WuxDef._max))}`);
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("BonusTraining"), WuxDef.GetAttribute("BonusTraining"));

                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingTechniques"), WuxDef.GetAttribute("TrainingTechniques"), `cost: 1 training point`);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        }

                    return {
                        Build: build
                    }
                })()

            return {
                PrintTraining: printTraining
            }
        }());

    return {
        Print: print
    };
}());

var DisplayAdvancementSheet = DisplayAdvancementSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = "";
            output += printAdvancement(sheetsDb);
            output += printJobs(sheetsDb);
            output += printAttributes(sheetsDb);
            output += printKnowledge(sheetsDb);
            return output;
        },

        printAdvancement = function () {
            let definition = WuxDef.Get("Page_Advancement");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintAdvancement() +
                MainContentData.PrintAdvancement();
            return WuxSheet.PageDisplay("Advancement", output);
        },

        printJobs = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Jobs");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintJobs() +
                MainContentData.PrintJobs(sheetsDb.job);
            return WuxSheet.PageDisplay("Jobs", output);
        },

        printAttributes = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Attributes");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintAttributes() +
                MainContentData.PrintAttributes(sheetsDb.skills);
            return WuxSheet.PageDisplay("Attributes", output);
        },

        printKnowledge = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Knowledge");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintKnowledge() +
                MainContentData.PrintKnowledge(sheetsDb.language, sheetsDb.lore);
            return WuxSheet.PageDisplay("Knowledge", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printAdvancement = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Advancement"), "Adv. Pts")
                        + buildTechPointsSection(WuxDef.GetAttribute("Perk"), "Perk Pts")
                    );
                },

                printJobs = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Job")));
                },

                printAttributes = function () {
                    let contents = `${buildTechPointsSection(WuxDef.GetAttribute("Attribute"), "Attr. Pts")}
                    ${buildTechPointsSection(WuxDef.GetAttribute("Skill"), "Skill Pts")}`;
                    return WuxSheetSidebar.Build("", contents);
                },
                
                printKnowledge = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Knowledge")));
                },

                buildTechPointsSection = function (fieldName, headerText) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName, headerText);
                }

            return {
                PrintAdvancement: printAdvancement,
                PrintJobs: printJobs,
                PrintAttributes: printAttributes,
                PrintKnowledge: printKnowledge
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                printAdvancement = function () {
                    let contents = "";

                    contents += buildAdvancement.Build();

                    return WuxSheetMain.Build(contents);
                },

                buildAdvancement = buildAdvancement || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += buildAdvancementTab();
                            contents += buildPerks();
                            contents += buildPerkTechniqueList();
                            return contents;
                        },

                        buildAdvancementTab = function () {
                            let leftColumn = WuxSheetMain.Table.FlexTableGroup(buildLevelStats() + buildTrainingConversion());
                            let rightColumn = WuxSheetMain.Table.FlexTableGroup(buildAdvancementStats());
                            let contents = WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Advancement");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildLevelStats = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Level");
                            contents += WuxSheetMain.Header(titleDefinition.getTitle());

                            let xpDefinition = WuxDef.Get("XP");
                            let conversionDef = WuxDef.Get("Title_AdvancementConversion");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(
                                        `${WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(),
                                            `To Level: ${xpDefinition.formula.getValue()}`)}
                                        ${WuxSheetMain.MultiRow(WuxSheetMain.Button(conversionDef.getAttribute(),
                                            `Convert To Levels`))}`),
                                    WuxSheetMain.Table.FlexTableGroup(
                                        WuxDefinition.BuildTextInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level")))
                                ],
                                WuxSheetMain.Table.FlexTable, 2);
                            contents += WuxDefinition.BuildText(WuxDef.Get("MaxCR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));

                            return contents;
                        },

                        buildTrainingConversion = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_TrainingConversion");
                            contents += WuxSheetMain.Header(titleDefinition.getTitle());

                            let conversionTitleDef = WuxDef.Get("Title_TrainingConversion");
                            let ppDefinition = WuxDef.Get("PP");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(
                                        `${WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(),
                                            `To Adv. Point: ${ppDefinition.formula.getValue()}`)}
                                        ${WuxSheetMain.MultiRow(WuxSheetMain.Button(conversionTitleDef.getAttribute(),
                                            `Convert To AP`))}`),
                                    WuxSheetMain.Table.FlexTableGroup(
                                        WuxDefinition.BuildTextInput(WuxDef.Get("BonusTraining"), WuxDef.GetAttribute("BonusTraining")))
                                ],
                                WuxSheetMain.Table.FlexTable, 2);

                            return contents;
                        },

                        buildAdvancementStats = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Advancement");
                            contents += WuxSheetMain.Header(titleDefinition.getTitle());

                            contents += WuxSheetMain.SlotDisplay("Adv. Pts", "", WuxDef.GetAttribute("Advancement"), WuxDef.GetAttribute("Advancement", WuxDef._max));
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementTechnique"), WuxDef.GetAttribute("AdvancementTechnique"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingKnowledge"), WuxDef.GetAttribute("TrainingKnowledge"), `cost: 1 advancement point`);

                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },
                        
                        buildPerks = function () {
                            let contents = "";
                            let perkDef = WuxDef.Get("Perk");
                            let perkPageDef = WuxDef.Get("Page_Perks");
                            contents += WuxSheetMain.Header(`${perkPageDef.getTitle()}`);
                            contents += WuxSheetMain.SlotDisplay("Perk Pts", "", perkDef.getAttribute(), perkDef.getAttribute(WuxDef._max));
                            let advJobDef = WuxDef.Get("AdvancementJob");
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementJob"), advJobDef.getAttribute(), `cost: 2 perk points`);
                            contents += WuxSheetMain.MultiRow(`<div class="wuxDescription">${advJobDef.getDescription()}</div>`);
                            let advSkillDef = WuxDef.Get("AdvancementSkill");
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementSkill"), advSkillDef.getAttribute(), `cost: 1 perk point`);
                            contents += WuxSheetMain.MultiRow(`<div class="wuxDescription">${advSkillDef.getDescription()}</div>`);

                            contents += buildBasicPerkList();
                            contents = WuxSheetMain.TabBlock(contents);
                            return WuxSheetMain.CollapsibleTab(perkPageDef.getAttribute(WuxDef._tab, WuxDef._expand), perkPageDef.title, contents);
                        },

                        buildBasicPerkList = function () {
                            let contents = "";
                            let groups = {};
                            WuxPerks.Iterate(function (perk) {
                                if (perk.group === "Perk Technique") return;
                                if (!groups.hasOwnProperty(perk.group)) {
                                    groups[perk.group] = [];
                                }
                                groups[perk.group].push(perk);
                            });
                            let groupNames = Object.keys(groups).sort((a, b) => {
                                if (a === "Character Perks") return 1;
                                if (b === "Character Perks") return -1;
                                return 0;
                            });
                            for (let groupName of groupNames) {
                                let perks = groups[groupName];
                                let fieldName = `attr_perk-group-${groupName.toLowerCase().replace(/\s+/g, "-")}`;
                                let headerFn = groupName === "Character Perks"
                                    ? WuxSheetMain.CollapsibleHeaderInverse
                                    : WuxSheetMain.CollapsibleHeader;
                                contents += WuxSheetMain.Header(headerFn(`<span>${groupName}</span>`, fieldName));
                                let columns = ["", ""];
                                for (let i = 0; i < perks.length; i++) {
                                    if (perks[i] == undefined) {
                                        continue;
                                    }
                                    columns[i % 2] += printBasicPerk(perks[i]);
                                }
                                let groupContents = WuxSheetMain.MultiRowGroup(
                                    [WuxSheetMain.Table.FlexTableGroup(columns[0]),
                                     WuxSheetMain.Table.FlexTableGroup(columns[1])],
                                    WuxSheetMain.Table.FlexTable, 2);
                                contents += groupName === "Character Perks"
                                    ? WuxSheetMain.HiddenField(fieldName, groupContents)
                                    : WuxSheetMain.HiddenAuxField(fieldName, groupContents);
                            }
                            return contents;
                        },

                        printBasicPerk = function (perk) {
                            let desc = (perk.descriptions || []).join("\n");
                            let perkInstance = new PerkData(perk);
                            let perkDef = perkInstance.createDefinition(WuxDef.Get("Perk"));
                            let inputRow = WuxSheetMain.Header2(perk.name);
                            if (perk.group === "Branch Perks") {
                                let label = WuxSheetMain.InputLabel(`Cost: ${perk.cost} perk point`);
                                if (perk.name === "Second Affinity") {
                                    let affinitySelect =
                                        WuxSheetMain.Select(perkDef.getAttribute(WuxDef._affinity),
                                            WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])) +
                                        WuxSheetMain.DescField(perkDef.getAttribute(WuxDef._learn));
                                    inputRow += `<div class="wuxInteractiveBlock">
                                        ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(perkDef.getAttribute(), label)}
                                        ${WuxSheetMain.InteractionElement.ExpandableBlockContents(perkDef.getAttribute(), affinitySelect)}
                                    </div>`;
                                } else {
                                    inputRow += WuxSheetMain.MultiRow(
                                        WuxSheetMain.InteractionElement.BuildCheckboxInput(perkDef.getAttribute(), label)
                                    );
                                }
                            } else {
                                let label = `Cost: ${perk.cost}${perkInstance.maxRank.hasFormula() ? ` perk point, Max: ${WuxSheetMain.Span(perkDef.getAttribute(WuxDef._max))}` : ""}`;
                                inputRow += WuxSheetMain.MultiRow(
                                    WuxSheetMain.Input("number", perkDef.getAttribute(), "", "0") +
                                    WuxSheetMain.InputLabel(label)
                                );
                            }
                            return inputRow + (desc !== "" ? WuxSheetMain.MultiRow(`<div class="wuxDescription">${desc}</div>`) : "");
                        },

                        buildPerkTechniqueList = function () {
                            let repeatingDef = WuxDef.Get("RepeatingPerks");

                            let nonElementDef = WuxDef.Get("Forme_ShowFromNonElement");
                            let levelRestrictedDef = WuxDef.Get("Forme_ShowLevelRestricted");
                            let filterCheckboxItems = [
                                WuxSheetMain.Table.FlexTableGroup(
                                    WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                        nonElementDef.getAttribute(),
                                        nonElementDef.getAttribute(WuxDef._info),
                                        WuxSheetMain.Header(nonElementDef.getTitle()),
                                        WuxDefinition.TooltipDescription(nonElementDef))),
                                WuxSheetMain.Table.FlexTableGroup(
                                    WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                        levelRestrictedDef.getAttribute(),
                                        levelRestrictedDef.getAttribute(WuxDef._info),
                                        WuxSheetMain.Header(levelRestrictedDef.getTitle()),
                                        WuxDefinition.TooltipDescription(levelRestrictedDef)))
                            ];
                            let filterCheckboxes = `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_StyleFilterOption"))}
                                ${WuxSheetMain.MultiRowGroup(filterCheckboxItems, WuxSheetMain.Table.FlexTable, 1)}`;
                            let perkFilterDefs = WuxDef.Filter([new DatabaseFilterData("group", "PerkAutoFilter")]);
                            let perkFilterButtons = perkFilterDefs.map(def =>
                                WuxSheetMain.Table.FlexTableGroup(
                                    WuxSheetMain.Button(def.getAttribute(), def.getTitle(), "wuxWidth160")));
                            let filterPanel = WuxSheetMain.Table.FlexTableGroup(
                                filterCheckboxes + 
                                WuxSheetMain.Header2(WuxDef.GetTitle("Title_PerkStyleFilter")) + 
                                WuxSheetMain.MultiRowGroup(perkFilterButtons, WuxSheetMain.Table.FlexTable, 1),
                                " wuxMinWidth350 wuxFlexTableItemGroup2");

                            let nameDef = WuxDef.Get("Forme_Name");
                            let inspectDef = WuxDef.Get("Forme_Inspect");
                            let deleteDef = WuxDef.Get("Forme_Delete");
                            let rowContents = `<div class="wuxMultiRow" style="min-width: 300px;">
                                <div class="wuxEquipableRow">
                                    <div class="wuxEquipableBody">
                                        <div class="wuxEquipableName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>
                                        <div class="wuxEquipableButtonRow">
                                            ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                            ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                            let perkIsVisibleAttr = WuxDef.GetAttribute("Action_PerkIsVisible");
                            let repeaterContent = `<div class="wuxNoRepControl wuxRepeatingFlexSection">
                                        <fieldset class="${repeatingDef.getVariable()}">
                                            ${rowContents}
                                        </fieldset>
                                    </div>`;
                            let repeaterSection = WuxSheetMain.Table.FlexTableGroup(
                                `${WuxSheetMain.Header(repeatingDef.getTitle())}
                                ${WuxSheetMain.HiddenFieldToggle(perkIsVisibleAttr, `<div>${repeaterContent}${WuxSheetMain.Row("&nbsp;")}</div>`, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}`);

                            let sectionDef = WuxDef.Get("Title_PerkTechniques");
                            let contents = WuxSheetMain.MultiRowGroup([repeaterSection, filterPanel], WuxSheetMain.Table.FlexTableReverse, 2);
                            contents = WuxSheetMain.TabBlock(contents);
                            return WuxSheetMain.CollapsibleTab(
                                sectionDef.getAttribute(WuxDef._expand),
                                sectionDef.getTitle(),
                                contents);
                        }
                    ;
                    return {
                        Build: build
                    }
                }()),

                printJobs = function (jobsDictionary) {
                    return WuxSheetMain.Build(buildJobs.Build(jobsDictionary));
                },

                buildJobs = buildJobs || (function () {
                    'use strict';

                    var
                        build = function (jobsDictionary) {
                            let output = "";
                            let jobClasses = WuxDef.Filter([new DatabaseFilterData("group", "JobClass")]);
                            for (let i = 0; i < jobClasses.length; i++) {
                                output += buildJobClass(jobClasses[i], jobsDictionary);
                            }
                            let sectionDef = WuxDef.Get("Title_JobsByDifficulty");
                            return WuxSheetMain.CollapsibleTab(sectionDef.getAttribute(WuxDef._tab, WuxDef._expand), sectionDef.getTitle(), WuxSheetMain.TabBlock(output));
                        },

                        buildJobClass = function (jobclassDefinition, jobsDictionary) {
                            let jobClassGroup = jobclassDefinition.name;
                            let jobs = jobsDictionary.filter(new DatabaseFilterData("group", jobClassGroup));
                            let jobData = [];
                            for (let i = 0; i < jobs.length; i++) {
                                jobData.push(buildJob(jobs[i]));
                            }
                            let hiddenField = jobclassDefinition.getAttribute(WuxDef._expand);
                            let headerContents = WuxSheetMain.CollapsibleHeader(`<span>${jobclassDefinition.getTitle()}</span>`, hiddenField);
                            let contents = WuxSheetMain.MultiRowGroup(jobData, WuxSheetMain.Table.FlexTable, 2);
                            return WuxSheetMain.Header(headerContents) + WuxSheetMain.HiddenAuxField(hiddenField, contents);
                        },

                        buildJob = function (job) {
                            let jobDefinition = job.createDefinition(WuxDef.Get("Job"));

                            let contents = `${buildJobHeader(job, jobDefinition)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
                            ${buildJobDescription(job)}
                            ${buildTechniquesButton(job, jobDefinition)}`;

                            return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), "Half wuxMinWidth220")}`;
                        },

                        buildJobHeader = function (job, jobDefinition) {
                            let interactHeader = `<span class="wuxHeader">${job.name}</span>`;

                            return WuxSheetMain.InteractionElement.BuildCheckboxInput(
                                jobDefinition.getAttribute(), interactHeader);
                        },

                        buildJobDescription = function (job) {
                            let roleGroupDef = WuxDef.Get(`JobGroup_${job.role}`);
                            let roleDisplay = job.role
                                ? WuxSheetMain.Tooltip.Inline(job.role, WuxDefinition.TooltipDescription(roleGroupDef))
                                : "";
                            let roleContent = `${WuxDef.GetTitle("Title_MainRole")}: ${roleDisplay}`;
                            if (job.subRole) {
                                let subRoleGroupDef = WuxDef.Get(`JobGroup_${job.subRole}`);
                                let subRoleDisplay = WuxSheetMain.Tooltip.Inline(job.subRole, WuxDefinition.TooltipDescription(subRoleGroupDef));
                                roleContent += ` | ${WuxDef.GetTitle("Title_SubRole")}: ${subRoleDisplay}`;
                            }
                            const difficultyClassKeys = ["", "JobClass_Simple", "JobClass_Intermediate", "JobClass_Advanced"];
                            let difficultyIcons = Format.PrintIcons(job.difficulty, 3, `★`, `☆`);
                            let difficultyClassDef = WuxDef.Get(difficultyClassKeys[job.difficulty] || "");
                            let difficultyDisplay = difficultyClassDef && job.difficulty > 0
                                ? WuxSheetMain.Tooltip.Inline(difficultyIcons, WuxDefinition.TooltipDescription(difficultyClassDef))
                                : difficultyIcons;
                            return WuxSheetMain.Desc(`<span>${roleContent}</span>
<span>Difficulty: ${difficultyDisplay}</span>
<span>Main Skills: ${printTechniqueSkills(job.skills)}</span>
<span>&nbsp;</span>
<span>${job.getDescription("</span><span>")}</span>`);
                        },

                        printTechniqueSkills = function (skills) {
                            let skillsOutput = "";
                            let skillSplit = skills.split(";");
                            for (let i = 0; i < skillSplit.length; i++) {
                                if (skillsOutput != "") {
                                    skillsOutput += "; ";
                                }
                                let skillData = skillSplit[i].split(":");
                                if (skillData.length > 1 && skillData[1] == "group") {
                                    skillsOutput += `Any ${skillData[0]}`;
                                }
                                else {
                                    skillsOutput += `${skillData[0]}`;
                                }
                            }
                            if (skillsOutput == "") {
                                skillsOutput = "None";
                            }
                            return skillsOutput;
                        },
                        
                        buildTechniquesButton = function (job, jobDefinition) {
                            return WuxSheetMain.Button(jobDefinition.getAttribute(WuxDef._info), 
                                `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`,
                                "", job.name);
                        }
                    ;
                    return {
                        Build: build
                    }
                }()),

                printAttributes = function (skillsDatabase) {
                    let contents = buildAttributes.Build(skillsDatabase);
                    return WuxSheetMain.Build(contents);
                },

                buildAttributes = buildAttributes || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let contents = buildAttributesSection();
                            contents += buildSkillsSection(database);
                            contents += buildStatSummarySection();
                            return contents;
                        },

                        buildAttributesSection = function () {
                            let contents = WuxSheetMain.MultiRowGroup(buildAttributes(), WuxSheetMain.Table.FlexTable, 3);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Attributes");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        buildAttributes = function () {
                            let attributes = WuxDef.Filter([new DatabaseFilterData("group", "Attribute")]);
                            let output = [];
                            let attributeValuesFilter = WuxDef.Filter([new DatabaseFilterData("group", "AttributeValue")]);
                            for (let i = 0; i < attributes.length; i++) {
                                output.push(printAttribute(attributes[i], attributeValuesFilter));
                            }
                            return output;
                        },
                        printAttribute = function (attributeDefinition, attributeValuesFilter) {
                            let contents = "";
                            contents += WuxSheetMain.Select(attributeDefinition.getAttribute(), attributeValuesFilter, false);
                            
                            let header = `${attributeDefinition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(attributeDefinition))}`;
                            let output = WuxSheetMain.Table.FlexTableHeader(header);
                            output += WuxSheetMain.Table.FlexTableData(contents);
                            return WuxSheetMain.Table.FlexTableGroup(output, " wuxMinWidth150");
                        },

                        buildSkillsSection = function (database) {
                            let skillGroups = ["ActiveSkills", "SocialSkills", "WorldSkills"];
                            let contents = "";
                            
                            for (let skillGroup of skillGroups) {
                                let definitionName = Format.GetDefinitionName("Page", skillGroup);
                                let definition = WuxDef.Get(definitionName);
                                let subGroups = WuxDef.Filter([new DatabaseFilterData("subGroup", skillGroup)]);

                                contents += `${WuxSheetMain.Header(definition.getTitle())}
                                ${WuxSheetMain.MultiRowGroup(buildSkillSubGroups(database, subGroups), WuxSheetMain.Table.FlexTable, 3)}
                                `;
                            }
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Skill");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        buildSkillSubGroups = function (database, subGroups) {
                            let output = [];
                            let groupName = "";
                            let filterSettings = new DatabaseFilterData("subGroup", "");
                            subGroups = subGroups.sort();
                            for (let i = 0; i < subGroups.length; i++) {
                                if (subGroups[i].name == "") {
                                    continue;
                                }
                                groupName = subGroups[i].getTitle();
                                filterSettings.value = [groupName];
                                let filteredData = database.filter(filterSettings);
                                output.push(printSkillSubGroup(groupName, filteredData));
                            }
                            return output;
                        },
                        printSkillSubGroup = function (groupName, filteredData) {
                            return `<div class="wuxFlexTableItemGroup wuxSkillGroup">
								<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName}</div>
								<div class="wuxFlexTableItemData wuxTextLeft">\n${buildSubSkillGroupSkills(filteredData)}\n</div>
							</div>`;
                        },
                        buildSubSkillGroupSkills = function (skillDataArray) {
                            let output = "";
                            for (let i = 0; i < skillDataArray.length; i++) {
                                output += printSkill(skillDataArray[i]);
                            }
                            return output;
                        },
                        
                        printSkill = function (skill) {
                            let skillDefinition = skill.createDefinition(WuxDef.Get("Skill"));
                            let interactHeader = printInteractiveSkillHeader(skill, skillDefinition);
                            let expertiseHeader = printInteractiveExpertiseHeader(skillDefinition);

                            return WuxSheetMain.HiddenFieldToggle(skillDefinition.getAttribute(WuxDef._learn),
                                    `<div class="wuxIsKeySkill">${interactHeader}</div>`,
                                    `${interactHeader}`) +
                                WuxSheetMain.Desc(skill.quickDescription) +
                                WuxSheetMain.HiddenField(skillDefinition.getAttribute(WuxDef._rank),
                                    `<div class="wuxMarginLeft20">${expertiseHeader}</div>`) + 
                                WuxSheetMain.Row("&nbsp;");
                        },
                        printInteractiveSkillHeader = function (skill, skillDefinition) {
                            let abilityScores = [WuxDef.GetAbbreviation(skill.abilityScore)];
                            if (skill.abilityScore2 != "") {
                                abilityScores.push(WuxDef.GetAbbreviation(skill.abilityScore2))
                            }
                            let attributesLine = `(${abilityScores.join("/")})`;
                            let interactHeader = `<span class="wuxHeader">${skill.name} ${attributesLine}</span>`;

                            return `<div class="wuxSkill">
                            ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                skillDefinition.getAttribute(WuxDef._rank),
                                skillDefinition.getAttribute(WuxDef._info),
                                interactHeader, WuxDefinition.TooltipDescription(skillDefinition))}
                            ${printSkillStat(skillDefinition, skillDefinition.getAttribute(), skillDefinition.getAttribute(WuxDef._info))}
                            </div>`;
                        },
                        printSkillStat = function(definition, fieldAttr, statCalculationField) {
                            return `<span class="wuxFloatRight">
                                ${WuxSheetMain.Tooltip.Text(WuxSheetMain.Span(fieldAttr),
                                    printStatCalculationTooltipContent(definition, statCalculationField))}
                            </span>`;
                        },
                        printStatCalculationTooltipContent = function(definitionData, statCalculationField) {
                            return `${WuxSheetMain.Header2(definitionData.title)}
                                <span class="wuxDescription" name="${statCalculationField}"></span>`;
                        },
                        printInteractiveExpertiseHeader = function (skillDefinition) {
                            let expertiseDef = WuxDef.Get("SkillExpertise");
                            let interactHeader = `<span class="wuxHeader">${expertiseDef.getTitle()}</span>`;

                            return WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                skillDefinition.getAttribute(WuxDef._expertise),
                                skillDefinition.getAttribute(WuxDef._info),
                                interactHeader,
                                WuxDefinition.TooltipDescription(expertiseDef)
                            );
                        },

                        buildStatSummarySection = function () {
                            let pageContents = `${buildJobSelection()}
                            ${buildStatSummary()}`;
                            let contents = WuxSheetMain.TabBlock(pageContents);

                            let definition = WuxDef.Get("Page_AffectedStats");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        buildJobSelection = function () {
                            let jobSelection = new JobSelectionBuilder();
                            return jobSelection.print();
                        },
                        buildStatSummary = function () {
                            let statsBuilder = new CharacterStatisticsBuilder();
                            return statsBuilder.print();
                        }
                        
                    ;
                    return {
                        Build: build
                    }
                }()),

                printKnowledge = function (languageDictionary, loreDictionary) {
                    return WuxSheetMain.Build(buildLanguageData.Build(languageDictionary) + buildLoreData.Build(loreDictionary));
                },

                buildLanguageData = buildLanguageData || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let leftColumn = buildCommonSection(database);
                            let rightColumn = buildGroupsColumn(database);
                            let contents = WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Language");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildCommonSection = function (database) {
                            let commonLanguages = database.filter([new DatabaseFilterData("location", "Common")]);
                            if (commonLanguages.length === 0) { return ""; }

                            let definition = WuxDef.Get("Title_LanguageCommon");
                            let header = WuxSheetMain.Header(definition.getTitle());

                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
                                ${header}
                                <div class="wuxFlexTableItemData wuxTextLeft">
                                    ${buildCommonLanguageSkills(commonLanguages)}
                                </div>
                            </div>`;
                        },

                        buildCommonLanguageSkills = function (filteredData) {
                            let output = "";
                            for (let i = 0; i < filteredData.length; i++) {
                                output += buildCommonLanguage(filteredData[i]);
                            }
                            return output;
                        },

                        buildCommonLanguage = function (knowledge) {
                            let knowledgeDefinition = knowledge.createDefinition(WuxDef.Get("Language"));
                            return `<div class="wuxSkill">
                                ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                    knowledgeDefinition.getAttribute(WuxDef._rank),
                                    knowledgeDefinition.getAttribute(WuxDef._info),
                                    buildInteractionMainBlock(knowledge, knowledgeDefinition),
                                    WuxDefinition.TooltipDescription(knowledgeDefinition))}
                                <span class="wuxSubheader"> - ${knowledge.group}</span>
                            </div>`;
                        },

                        buildGroupsColumn = function (database) {
                            let output = "";
                            let filterSettings = [new DatabaseFilterData("group", "")];
                            let languageGroups = database.getPropertyValues("group");
                            for (let i = 0; i < languageGroups.length; i++) {
                                let groupName = languageGroups[i];
                                filterSettings[0].value = [groupName];
                                let filteredData = database.filter(filterSettings);
                                let nonCommon = filteredData.filter(k => k.location !== "Common");
                                if (nonCommon.length > 0) {
                                    output += printGroup(groupName, nonCommon);
                                }
                            }
                            return WuxSheetMain.Table.FlexTableGroup(output);
                        },

                        printGroup = function (groupName, filteredData) {
                            let hiddenField = `attr_Language_${groupName.replace(/\s+/g, "")}_expand`;
                            let header = WuxSheetMain.Header(
                                WuxSheetMain.CollapsibleHeaderInverse(`<span>${groupName} Languages</span>`, hiddenField));
                            let body = WuxSheetMain.HiddenField(hiddenField, buildLanguageGroupSkills(filteredData));
                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
                                ${header}${body}
                            </div>`;
                        },

                        buildLanguageGroupSkills = function (filteredData) {
                            let output = "";
                            for (let i = 0; i < filteredData.length; i++) {
                                output += buildLanguage(filteredData[i]);
                            }
                            return output;
                        },

                        buildLanguage = function (knowledge) {
                            let knowledgeDefinition = knowledge.createDefinition(WuxDef.Get("Language"));
                            return `<div class="wuxSkill">
                                ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                    knowledgeDefinition.getAttribute(WuxDef._rank),
                                    knowledgeDefinition.getAttribute(WuxDef._info),
                                    buildInteractionMainBlock(knowledge, knowledgeDefinition),
                                    WuxDefinition.TooltipDescription(knowledgeDefinition))}
                                <span class="wuxSubheader"> - ${knowledge.location}</span>
                            </div>`;
                        },

                        buildInteractionMainBlock = function (knowledge, knowledgeDefinition) {
                            return `<span class="wuxHeader">${knowledgeDefinition.title}</span>`;
                        }

                    return {
                        Build: build
                    }
                })(),

                buildLoreData = buildLoreData || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let contents = WuxSheetMain.MultiRowGroup(buildGroups(database), WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Lore");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildGroups = function (database) {
                            let output = [];
                            let groupName = "";
                            let filterSettings = [new DatabaseFilterData("group", "")];
                            let filteredData = {};
                            let languageGroups = database.getPropertyValues("group");
                            for (let i = 0; i < languageGroups.length; i++) {
                                groupName = languageGroups[i];
                                filterSettings[0].value = [groupName];
                                filteredData = database.filter(filterSettings);
                                output.push(buildGroup(groupName, filteredData));
                            }
                            return output;
                        },

                        buildGroup = function (groupName, filteredData) {
                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
								<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName} Lore</div>
								<div class="wuxFlexTableItemData wuxTextLeft">
									${buildLoreGroupSkills(filteredData, groupName)}
								</div>
							</div>`;
                        },

                        buildLoreGroupSkills = function (knowledgeDataArray, groupName) {
                            let output = "";
                            let subLores = [];
                            for (let i = 0; i < knowledgeDataArray.length; i++) {
                                if (knowledgeDataArray[i].name == knowledgeDataArray[i].group) {
                                    output += buildMainLore(knowledgeDataArray[i]);
                                } else {
                                    subLores.push(knowledgeDataArray[i]);
                                }
                            }
                            output += buildSubLoreRepeater(groupName, subLores);
                            return output;
                        },

                        buildSubLoreRepeater = function (groupName, subLores) {
                            let tierOptions = WuxDef.Filter([new DatabaseFilterData("group", "LoreTier")]);

                            let subTypeSelect = `<select class="wuxInput wuxLoreDescription" name="${WuxDef.GetAttribute("Lore_SubType")}">
                                <option value="0">Choose Lore Type</option>
                                ${subLores.map(k => `<option value="${k.name}">${k.name}</option>`).join("\n                                ")}
                                <option value="1">Custom</option>
                            </select>`;

                            let repeaterContents = WuxSheetMain.MultiRow(
                                WuxSheetMain.Select(WuxDef.GetAttribute("Lore_Tier"), tierOptions, false, "wuxLoreType") +
                                subTypeSelect
                            );

                            repeaterContents += WuxSheetMain.HiddenIndexField(
                                WuxDef.GetAttribute("Lore_SubType"), 1,
                                WuxSheetMain.CustomInput("text", WuxDef.GetAttribute("Lore_Name"), "wuxLoreName", ` placeholder="${WuxDef.GetTitle("Lore_Name")}"`))

                            repeaterContents += `<span class="wuxLoreDescriptionArea" name="${WuxDef.GetAttribute("Lore_Description")}"></span>`;
                            repeaterContents += WuxSheetMain.Textarea(
                                WuxDef.GetAttribute("Lore_Description"), "wuxInput wuxHeight30 wuxLoreDescriptionArea", WuxDef.GetTitle("Lore_Description"));
                            repeaterContents += WuxSheetMain.Row("&nbsp;");

                            let specializedLoreDef = WuxDef.Get("Title_SpecializedLore");
                            return `<div class="wuxMarginLeft50">
                                ${WuxSheetMain.Header2(specializedLoreDef.getTitle(groupName))}
                                <div>
                                    <fieldset class="${WuxDef.GetVariable("Repeater" + groupName)}">
                                        ${repeaterContents}
                                    </fieldset>
                                </div>
                            </div>`;
                        },

                        buildMainLore = function (knowledge) {
                            let knowledgeDefinition = knowledge.createDefinition(WuxDef.Get("LoreCategory"));
                            return `<div class="wuxSkill">
                                ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                    knowledgeDefinition.getAttribute(WuxDef._rank),
                                    knowledgeDefinition.getAttribute(WuxDef._info),
                                    `<span class="wuxHeader">General ${knowledge.name}</span>`,
                                    WuxDefinition.TooltipDescription(knowledgeDefinition))}
                            </div>`;
                        }

                    return {
                        Build: build
                    }
                })();

            return {
                PrintAdvancement: printAdvancement,
                PrintJobs: printJobs,
                PrintAttributes: printAttributes,
                PrintKnowledge: printKnowledge
            }
        }())

    return {
        Print: print
    };
}());

var DisplayStylesSheet = DisplayStylesSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = WuxSheetNavigation.BuildStylesNavigation("Page_LearnTechniques") +
                SideBarData.Print() +
                MainContentData.Print(sheetsDb.styles);
            return WuxSheet.PageDisplay("Styles", output);
        },

        printTest = function (stylesDatabase) {
            let filters = [new DatabaseFilterData("group", "Style")];
            let filteredData = stylesDatabase.filter(filters);

            let output = "";
            for (let i = 0; i < filteredData.length; i++) {
                output += `${filteredData[i].name}, `;
            }
            return output;
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                print = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Technique")));
                },

                buildTechPointsSection = function (fieldName, header) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName, header);
                }

            return {
                Print: print
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var

                print = function (stylesDatabase) {
                    return WuxSheetMain.Build(build(stylesDatabase));
                },

                build = function (stylesDatabase) {
                    return "";
                    return  buildStyleGroups(stylesDatabase);
                },

                buildStyleGroups = function (stylesDatabase) {
                    let contents = "";
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "StyleGroup")]);
                    for (let i = 0; i < filteredData.length; i++) {
                        contents += buildStyleGroupContents(filteredData[i], stylesDatabase);
                    }

                    return contents;
                },
                
                buildStyleGroupContents = function (styleCategoryDefinition, stylesDatabase) {
                    let stylesFilter = WuxDef.Filter([
                        new DatabaseFilterData("subGroup", styleCategoryDefinition.getTitle()),
                        new DatabaseFilterData("group", "StyleSubGroup")
                    ]);

                    let styleOutput = "";
                    for (let i = 0; i < stylesFilter.length; i++) {
                        styleOutput += buildSubStyleGroupContents(stylesFilter[i], stylesDatabase);
                    }
                    return buildTechniqueStyleGroupTab(styleOutput, styleCategoryDefinition.name, styleCategoryDefinition.getTitle());
                },
                
                buildSubStyleGroupContents = function (subStyleCategoryDefinition, stylesDatabase) {
                    let hiddenField = subStyleCategoryDefinition.getAttribute(WuxDef._expand);
                    
                    let collapsibleHeaderContents = `<span>${(subStyleCategoryDefinition.getTitle())}</span>`;
                    let headerContents = WuxSheetMain.CollapsibleHeaderInverse(collapsibleHeaderContents, hiddenField);
                    
                    let header = WuxSheetMain.Header(headerContents);
                    let description = WuxSheetMain.Desc(subStyleCategoryDefinition.getDescription());
                    let contents = description + buildStyleGroupBasicEntries(subStyleCategoryDefinition, stylesDatabase);
                    
                    return header + WuxSheetMain.HiddenFieldToggle(hiddenField, contents, description);
                },

                buildStyleGroupBasicEntries = function (subStyleCategoryDefinition, stylesDatabase) {
                    let output = "";
                    let techFilterData = stylesDatabase.filter([
                        new DatabaseFilterData("subGroup", "Style"),
                        new DatabaseFilterData("styleCategory", subStyleCategoryDefinition.getTitle())
                    ]);
                    for (let i = 0; i < techFilterData.length; i++) {
                        let style = techFilterData[i];
                        let styleDef = style.createDefinition(WuxDef.Get("Style"));
                        output += buildStyleEntry(styleDef, style, style);
                        output += buildStyleGroupSubEntries(styleDef, style, stylesDatabase);
                    }
                    return `<div class="wuxMarginLeft50">${output}</div><div>&nbsp;</div>`;
                },
                buildStyleGroupSubEntries = function (styleDef, style, stylesDatabase) {
                    
                    let output = "";
                    let techFilterData = stylesDatabase.filter([new DatabaseFilterData("baseStyle", style.name)]);
                    for (let i = 0; i < techFilterData.length; i++) {
                        let subStyle = techFilterData[i];
                        let subStyleDef = subStyle.createDefinition(WuxDef.Get("Style"));
                        output += buildStyleEntry(subStyleDef, subStyle, styleDef);
                        output += buildStyleGroupSubEntries(subStyleDef, subStyle, stylesDatabase);
                    }
                    if (output == "") {
                        return "";
                    }
                    let description = `<div class="wuxDescription">These are advanced styles that are available once ${styleDef.getTitle()} is learned.</div>
                    <div class="wuxDescription">You must learn at least one technique from ${styleDef.getTitle()} to learn techniques from any of these styles.</div>
                    <div>&nbsp;</div>`;
                    output = description + output;

                    let hiddenField = styleDef.getAttribute(WuxDef._expand);
                    let headerContents = WuxSheetMain.CollapsibleHeaderInverse(`<span>${style.name} Advanced Styles</span>`, hiddenField);
                    let header = WuxSheetMain.Header2(headerContents);
                    
                    return `${header}${WuxSheetMain.HiddenField(hiddenField, `<div class="wuxMarginLeft50">${output}</div>`)}<div>&nbsp;</div>`;
                },
                
                buildStyleEntry = function (styleDef, style, partentStyleDef) {
                    return `<div class="wuxHeader">${style.name}</div>
                            ${buildStyleDescription(styleDef, style)}
                            ${buildStyleTechniquesFlexTable(styleDef, style, partentStyleDef)}`;

                },
                buildStyleDescription = function (styleDef, style) {
                    let output = "";
                    if (style.affinity != "") {
                        output += `<span>Affinity: ${style.affinity}</span>\n`;
                    }
                    output += `<span><em>Main Skills: ${printStyleSkills(style)}</em></span>\n`;
                    
                    if (style.isPermanent) {
                        output += `<span><em>Permanent Style.</em></span>\n<span><em>This style does not need to be equipped. All learned techniques are always available.</em></span>\n`;
                    }
                    let desc = styleDef.getDescription();
                    if (desc != "") {
                        output += `<span>&nbsp;</span>\n<span>${styleDef.getDescription()}</span>`;
                    }
                    return WuxSheetMain.Desc(output);
                },
                printStyleSkills = function (style) {
                    if (style.skills == "") {
                        return "None";
                    }
                    else {
                        let skillsOutput = "";
                        let skillSplit = style.skills.split(";");
                        for (let i = 0; i < skillSplit.length; i++) {
                            if (skillsOutput != "") {
                                skillsOutput += "; ";
                            }
                            let skillData = skillSplit[i].split(":");
                            if (skillData.length > 1 && skillData[1] == "group") {
                                skillsOutput += `Any ${skillData[0]}`;
                            }
                            else {
                                skillsOutput += `${skillData[0]}`;
                            }
                        }
                        return skillsOutput;
                    }
                },

                buildStyleTechniquesFlexTable = function (styleDef, style, partentStyleDef) {
                    let techFilterData = WuxTechs.Filter(new DatabaseFilterData("style", style.name));
                    let techStyles = [];
                    for (let i = 0; i < techFilterData.length; i++) {
                        techStyles.push(buildStyleTechniquesFlexTableEntry(styleDef, techFilterData[i], partentStyleDef));
                    }
                    if (techStyles.length == 0) {
                        return "";
                    }
                    return WuxSheetMain.MultiRowGroup(techStyles, WuxSheetMain.Table.FlexTable, 2);
                },
                buildStyleTechniquesFlexTableEntry = function (styleDef, technique, partentStyleDef) {
                    let contents = buildTechnique(styleDef, technique, partentStyleDef);
                    return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), " wuxMinWidth300")}`;
                },
                buildTechnique = function (styleDef, technique, partentStyleDef) {
                    let techDef = technique.createDefinition(WuxDef.Get("Technique"));
                    let infoButton = WuxSheetMain.Info.Button(techDef.getAttribute(WuxDef._info), `value="${technique.name}"`);
                    let interactHeader = `<span class="wuxHeader">${technique.name}</span>`;
                    let prerequisites = technique.getPrerequisites();
                    if (prerequisites != "") {
                        interactHeader = `<span>${interactHeader}<div class="wuxSubheader">[Prereq: ${prerequisites}]</div></span>`;
                    }
                    
                    if (styleDef.subGroup == "Style") {
                        return `<div class="wuxInteractiveBlock">
                        ${infoButton}
                        ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(techDef.getAttribute(), interactHeader)}
                        </div>`;
                    }
                    
                    return WuxSheetMain.HiddenFieldToggle(partentStyleDef.getAttribute(WuxDef._learn),
                        `<div class="wuxInteractiveBlock">
                        ${infoButton}
                        ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(techDef.getAttribute(), interactHeader)}
                        </div>`,
                    `<div class="wuxInteractiveBlock">${infoButton}
                            <div class="wuxInteractiveInnerBlock">
                                <div class="wuxInteractiveContent">${interactHeader}</div>
                            </div></div>`
                    );
                },
                
                getStyleTraits = function (style) {
                    let output = "";
                    let traits = WuxDef.GetValues(style.effects, ";");
                    for(let i = 0; i < traits.length; i++) {
                        output += printDefinitionTooltip(traits[i]);
                    }
                    if (output == "") {
                        return "None";
                    }
                    return output;
                },
                
                printDefinitionTooltip = function (definition) {
                    let subGroup = "";
                    if (definition.subGroup != "") {
                        subGroup = `<span class="wuxDescription"><em>${definition.subGroup}</em></span>`;
                    }
                    let description = "";
                    for (let j = 0; j < definition.descriptions.length; j++) {
                        description += `<span class="wuxDescription">${definition.descriptions[j]}</span>`;
                    }
                    return `<span class="wuxTooltip">
                        <span class="wuxTooltipText">${definition.getTitle()}</span>
                        <div class="wuxTooltipContent">
                            <div class="wuxHeader2">${definition.getTitle()}</div>
                            ${subGroup}
                            ${description}
                        </div>
                    </span>`;
                },

                buildTechniqueStyleGroupTab = function (contents, groupName, title) {
                    let styleDefinition = WuxDef.Get("StyleType");

                    return `${WuxSheetMain.CustomInput("hidden", styleDefinition.getAttribute(groupName, WuxDef._filter), "wuxFilterSegment-flag", ` value="0"`)}
					${WuxSheetMain.CollapsibleTab(styleDefinition.getAttribute(groupName, WuxDef._expand), title, WuxSheetMain.TabBlock(contents))}`;
                }

            return {
                Print: print
            };
        }())
    ;
    return {
        Print: print,
        PrintTest: printTest
    };
}());

var DisplayAdvancedSheet = DisplayAdvancedSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = WuxSheetNavigation.BuildStylesNavigation("Page_AdvancedStyles") +
                SideBarData.Print() +
                MainContentData.Print(sheetsDb.styles);
            return WuxSheet.PageDisplay("Adv. Styles", output);
        },

        printTest = function (stylesDatabase) {
            let filters = [new DatabaseFilterData("group", "Advanced")];
            let filteredData = stylesDatabase.filter(filters);

            let output = "";
            for (let i = 0; i < filteredData.length; i++) {
                output += `${filteredData[i].name}, `;
            }
            return output;
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                print = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Technique")));
                },

                buildTechPointsSection = function (fieldName, header) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName, header);
                }

            return {
                Print: print
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var

                print = function (stylesDatabase) {
                    return WuxSheetMain.Build(build(stylesDatabase));
                },

                build = function (stylesDatabase) {
                    return buildStyleGroups(stylesDatabase);
                },

                buildStyleGroups = function (stylesDatabase) {
                    let contents = "";
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "StyleGroup")]);
                    for (let i = 0; i < filteredData.length; i++) {
                        let subFilteredData = WuxDef.Filter([
                            new DatabaseFilterData("subGroup", filteredData[i].getTitle()),
                            new DatabaseFilterData("group", "StyleSubGroup")
                        ]);

                        let styleOutput = "";
                        for (let j = 0; j < subFilteredData.length; j++) {

                            let techFilterData = stylesDatabase.filter([
                                new DatabaseFilterData("group", "Advanced"),
                                new DatabaseFilterData("subGroup", subFilteredData[j].getTitle())
                            ]);
                            let techStyles = [];
                            for (let k = 0; k < techFilterData.length; k++) {
                                techStyles.push(buildStyleGroupFlexTableEntry(techFilterData[k]));
                            }
                            if (techStyles.length == 0) {
                                continue;
                            }
                            styleOutput += WuxSheetMain.Header(subFilteredData[j].getTitle());
                            styleOutput += WuxSheetMain.Table.FlexTable(techStyles);
                        }
                        if (styleOutput != "") {
                            contents += buildTechniqueStyleGroupTab(styleOutput, filteredData[i].name, filteredData[i].getTitle());
                        }
                    }

                    return contents;
                },

                buildStyleGroupFlexTableEntry = function (style) {
                    let styleDef = style.createDefinition(WuxDef.Get("Style"));

                    let contents = `${buildStyleHeader(styleDef, style)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
							${buildTierSelect(styleDef, style)}
                            ${buildStyleDescription(styleDef)}`;

                    return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), "Half wuxMinWidth220")}`;
                },

                buildStyleHeader = function (styleDef, style) {
                    return WuxSheetMain.Header2(`${WuxSheetMain.SubMenuButton(styleDef.getAttribute(WuxDef._expand), addSubmenuContents(styleDef, style))}
                        ${style.name}`
                    );
                },

                buildTierSelect = function (styleDef, style) {
                    let tierValues = [];
                    let def = new DefinitionData();
                    def.title = "Unranked";
                    def.variable = 0;
                    tierValues.push(def);
                    for (let i = 1; i <= style.maxTier; i++) {
                        def = new DefinitionData();
                        def.title = `Tier ${i}`;
                        def.variable = i;
                        tierValues.push(def);
                    }

                    return WuxSheetMain.Select(styleDef.getAttribute(), tierValues, false);
                },

                addSubmenuContents = function (styleDef, style) {
                    return `${WuxSheetMain.SubMenuOptionButton(styleDef.getAttribute(WuxDef._info), `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`, style.name)}
                    `;
                },

                buildStyleDescription = function (styleDef) {
                    return WuxSheetMain.Desc(styleDef.getDescription());
                },

                buildTechniqueStyleGroupTab = function (contents, groupName, title) {
                    let styleDefinition = WuxDef.Get("StyleType");

                    return `${WuxSheetMain.CustomInput("hidden", styleDefinition.getAttribute(groupName, WuxDef._filter), "wuxFilterSegment-flag", ` value="0"`)}
					${WuxSheetMain.CollapsibleTab(styleDefinition.getAttribute(groupName, WuxDef._expand), title, WuxSheetMain.TabBlock(contents))}`;
                }

            return {
                Print: print
            };
        }())
    ;
    return {
        Print: print,
        PrintTest: printTest
    };
}());class BaseFeatureDisplayBuilder {
    constructor() {
        this.featureBonusClasses = "";
    }
    
    setFeatureBonusClasses(featureBonusClasses) {
        this.featureBonusClasses = featureBonusClasses;
    }

    print () {
        return `<div class="wuxFeature${this.featureBonusClasses != "" ? ` ${this.featureBonusClasses}` : ""}">
            ${this.printHeaderBlock()}
            ${this.printInfoBlock()}
        </div>
        `;
    }

    printTooltip (name, tooltipName, descriptions) {
        if (descriptions.length > 0) {
            let descriptionData = `<span class="wuxDescription">${descriptions.join(`</span><br /><span class="wuxDescription">`)}</span>`;
            return this.printTooltipField(name, tooltipName, descriptionData);
        }
        else {
            return this.printSpan(name);
        }
    }
    printTooltipField (name, tooltipName, descriptionData) {
        return `<span class="wuxTooltip">
            <span class="wuxTooltipText"><strong>${name}</strong></span>
            <div class="wuxTooltipContent">
                <div class="wuxHeader2">${tooltipName}</div>
                ${descriptionData}
            </div>
        </span>`;
    }

    printHeaderBlock() {}
    printHeaderBlockField(contents) {
        return `<div class="wuxFeatureHeader">
            <div class="wuxFeatureHeaderDisplayBlock">
                <div class="wuxFeatureHeaderDisplayTitleBlock">
                    ${this.printName()}
                    ${this.printActionType()}
                </div>
                ${contents}
            </div>
        </div>`;

    }

    printName() {}
    printNameField (contents) {
        return `<div class="wuxFeatureHeaderName">${contents}</div>`;
    }

    printActionType() {}
    printActionTypeField (input, contents) {
        return `${input}
        <div class="wuxFeatureHeaderDisplayInfoActionType">${contents}</div>`;
    }

    printInfoBlock() {
        return `<div class="wuxFeatureInfoDisplayBlock">
            ${this.printTrigger()}
            ${this.printTraits()}
            ${this.printFlavorText()}
            ${this.printCoreEffects()}
            ${this.printOnEnter()}
            ${this.printCheckEffects()}
            ${this.printEndEffects()}
            ${this.printWillBreakEffects()}
        </div>`;
    }
    printInfoBlockField(contents) {
        return `<div class="wuxFeatureInfoDisplayBlock">
            ${contents}
        </div>`;
    }

}

class BaseTechniqueDisplayBuilder extends BaseFeatureDisplayBuilder {
    constructor() {
        super();
    }

    printHeaderBlock() {
        return this.printHeaderBlockField(
            `<div class="wuxFeatureHeaderDisplayInfoBlock">
            ${this.printRange()}
            ${this.printTargetType()}
        </div>
        <div class="wuxFeatureHeaderDisplayCostBlock">
            ${this.printEnCost()}
            ${this.printWillCost()}
        </div>`);
    }

    printInfoBlock() {
        return this.printInfoBlockField(
            `${this.printTrigger()}
            ${this.printTraits()}
            ${this.printFlavorText()}
            ${this.printCoreEffects()}
            ${this.printOnEnter()}
            ${this.printCheckEffects()}
            ${this.printEndEffects()}
            ${this.printWillBreakEffects()}
            ${this.printEnhancementEffects()}`);
    }

    printRange() {}
    printRangeField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoRange">${contents}</div>`
    }

    printTargetType() {}
    printTargetTypeField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoTargetType">${contents}</div>`;
    }

    printEnCost() {}
    printEnCostField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoEnCost">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> EN</span></div>`;
    }
    printWillCost() {}
    printWillCostField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoWillCost">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> Will</span></div>`;
    }

    printTrigger() {}
    printTriggerField (contents) {
        return `<div class="wuxFeatureHeaderInfoTrigger"><strong>Trigger.</strong> ${contents}</div>`;
    }

    printTraits() {}
    printTraitsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoTraits"><strong>${title}.</strong> ${contents}</div>`;
    }

    printFlavorText() {}
    printFlavorTextField (contents) {
        return `<div class="wuxFeatureHeaderInfoFlavor">${contents}</div>`;
    }

    printCoreEffects() {}
    printCoreEffectsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-Core">
            <input type="hidden" class="wuxFeatureHeader-flag" value="Core">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }

    printOnEnter() {}
    printOnEnterField(contents) {
        return `<div class="wuxFeatureHeaderInfoEffectOnEnter"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${contents}</span></div>`;
    }

    printCheckEffects() {}
    printCheckEffectsField (input, title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-Check">
            ${input}
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }

    printEndEffects() {}
    printEndEffectsField(contents) {
        return `<div class="wuxFeatureHeaderInfoEffect"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${contents}</span></div>`;
    }

    printWillBreakEffects() {}
    printWillBreakEffectsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-WillBreak">
            <input type="hidden" class="wuxFeatureHeader-flag" value="WillBreak">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }

    printEnhancementEffects() {}
    printEnhancementEffectsField(contents) {
        let enhancementDef = WuxDef.Get("Title_TechEnhancement");
        let title = this.printTooltip(enhancementDef.getTitle(), enhancementDef.getTitle(), enhancementDef.descriptions);
        return `<div class="wuxFeatureHeaderInfoEffect-Enhance">
            <input type="hidden" class="wuxFeatureHeader-flag" value="Enhance">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }
}

class TechniqueDisplayBuilder extends BaseTechniqueDisplayBuilder {
    constructor(displayData) {
        super();
        this.displayData = displayData;
    }
    printSpan (contents) {
        return `<span>${contents}</span>`;
    }

    printName() {
        return this.printNameField(this.printSpan(this.displayData.name));
    }
    printActionType () {
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="${this.displayData.actionType}">`,
            this.printSpan(this.displayData.actionName));
    }
    printRange() {
        return this.printRangeField(
            this.printTooltip(this.displayData.range, "Range", this.displayData.targetDesc));
    }
    printTargetType() {
        if (this.displayData.targetType == "") {
            return "";
        }
        return this.printTargetTypeField(this.printSpan(this.displayData.targetType));
    }
    printEnCost() {
        if (this.displayData.enCost == "") {
            return "";
        }
        return this.printEnCostField(this.printSpan(this.displayData.enCost));
    }
    printWillCost() {
        if (this.displayData.willCost == "") {
            return "";
        }
        return this.printWillCostField(this.printSpan(this.displayData.willCost));
    }
    printTrigger() {
        if (this.displayData.trigger == "") {
            return "";
        }
        return this.printTriggerField(this.printSpan(this.displayData.trigger));
    }
    printTraits() {
        if (this.displayData.traits == "") {
            return "";
        }
        return this.printTraitsField(
            this.printTooltip("Traits", "Traits", this.displayData.traitsDesc),
            this.printSpan(this.displayData.traits));
    }
    printFlavorText() {
        if (this.displayData.flavorText == "") {
            return "";
        }
        return this.printFlavorTextField(this.printSpan(this.displayData.flavorText));
    }
    printCoreEffects() {
        if (this.displayData.coreEffect == "") {
            return "";
        }
        return this.printCoreEffectsField(
            this.printTooltip("Effects", "Core Effects", this.displayData.coreEffect.effectTypeDesc),
            this.printSpan(this.displayData.getCoreEffects("\n"))
        );
    }
    printOnEnter() {
        if (!this.displayData.isOnEnter) {
            return "";
        }
        let onEnterDef = WuxDef.Get("Trait_OnEnter");
        return this.printOnEnterField(this.printTooltip("On Enter Effects", "On Enter Effects", onEnterDef.descriptions));
    }

    printCheckEffects() {
        if (this.displayData.checkEffect == "") {
            return "";
        }
        return this.printCheckEffectsField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="${this.displayData.coreDefense}">`,
            this.printTooltip(this.displayData.checkType, "Skill Check Effects", this.displayData.checkEffect.effectTypeDesc),
            this.printSpan(this.displayData.getCheckEffects("\n"))
        );
    }
    printEndEffects() {
        if (!this.displayData.endEffectDesc) {
            return "";
        }
        return this.printEndEffectsField(this.printSpan(this.displayData.endEffectDesc));
    }
    printWillBreakEffects() {
        if (this.displayData.willBreakEffect == "") {
            return "";
        }
        return this.printWillBreakEffectsField(
            this.printTooltip("Will Break Effects", "Will Break Effects", this.displayData.willBreakEffect.effectTypeDesc),
            this.printSpan(this.displayData.getWillBreakEffects("\n"))
        );
    }
    printEnhancementEffects() {
        if (this.displayData.enhanceEffect == "") {
            return "";
        }
        return this.printEnhancementEffectsField(
            this.printSpan(this.displayData.getEnhanceEffects("\n"))
        );
    }
}

class TechniqueDisplayBuilderUsable extends TechniqueDisplayBuilder {
    printName() {
        let contents = `<button class="wuxFeatureHeaderNameButton" type="roll" value="${this.displayData.getSheetRollTemplate(true)}">
            ${this.printSpan(this.displayData.name)}
        </button>`
        return this.printNameField(contents);
    }
}

class TechniqueDisplayBuilderUsableWithCount extends TechniqueDisplayBuilderUsable {
    setCountAttribute(countAttribute) {
        this.countAttribute = countAttribute;
    }
    printName() {
        let countInput = this.countAttribute
            ? `<span class="wuxFeatureHeaderNameCount" name="${this.countAttribute}">0</span>`
            : "";
        let contents = `${countInput}<button class="wuxFeatureHeaderNameButton" type="roll" value="${this.displayData.getSheetRollTemplate(true)}">
            ${this.printSpan(this.displayData.name)}
        </button>`
        return this.printNameField(contents);
    }
}

class TechniqueRepeaterDisplayBuilder extends BaseTechniqueDisplayBuilder {
    constructor(baseDefinition, rootSuffix) {
        super();
        this.baseDefinition = baseDefinition;
        this.rootSuffix = rootSuffix;
    }

    getActionTypeAttribute (attribute, suffix) {
        if (this.rootSuffix != undefined) {
            suffix = `${suffix != undefined ? suffix : ""}${this.rootSuffix}`;
        }
        return this.baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
    }
    printSpan (fieldName) {
        return `<span name="${fieldName}"></span>`;
    }
    printSpanActionTypeAttribute (attribute, suffix) {
        return `<span name="${this.getActionTypeAttribute(attribute, suffix)}"></span>`;
    }
    printAttributeTooltip (name, tooltipName, fieldName) {
        let descriptionData = `<span class="wuxDescription" name="${fieldName}"></span>`;
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printTooltipField(name, tooltipName, descriptionData),
            `${name}`);
    }

    printName() {
        let contents = this.printSpanActionTypeAttribute("TechName");
        return `<input type="hidden" name="${this.getActionTypeAttribute("TechTrueName")}">
        ${this.printNameField(contents)}`;
    }
    printActionType () {
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" name="${this.getActionTypeAttribute("TechActionType")}">`,
            this.printAttributeTooltip(`<span name="${this.getActionTypeAttribute("TechActionName")}"></span>`,
                "Action", this.getActionTypeAttribute("TechActionTooltip"))
        )
    }
    printRange() {
        let fieldName = this.getActionTypeAttribute("TechRange");
        return WuxSheetMain.HiddenField(fieldName,
            this.printRangeField(
                this.printAttributeTooltip(`<span name="${fieldName}"></span>`, "Range", this.getActionTypeAttribute("TechTargetDesc"))
            )
        );
    }
    printTargetType() {
        let fieldName = this.getActionTypeAttribute("TechTargetType");
        return WuxSheetMain.HiddenField(fieldName, this.printTargetTypeField(this.printSpan(fieldName)));
    }
    printEnCost() {
        let fieldName = this.getActionTypeAttribute("TechEnCost");
        return WuxSheetMain.HiddenField(fieldName, this.printEnCostField(this.printSpan(fieldName)));
    }
    printWillCost() {
        let fieldName = this.getActionTypeAttribute("TechWillCost");
        return WuxSheetMain.HiddenField(fieldName, this.printWillCostField(this.printSpan(fieldName)));
    }
    printTrigger() {
        let fieldName = this.getActionTypeAttribute("TechTrigger");
        return WuxSheetMain.HiddenField(fieldName, this.printTriggerField(this.printSpan(fieldName)));
    }
    printTraits() {
        let fieldName = this.getActionTypeAttribute("TechTraits");
        return WuxSheetMain.HiddenField(fieldName,
            this.printTraitsField(
                this.printAttributeTooltip("Traits", "Traits", this.getActionTypeAttribute("TechTraitsDesc")),
                this.printSpan(fieldName)
            )
        );
    }
    printFlavorText() {
        let fieldName = this.getActionTypeAttribute("TechFlavorText");
        return WuxSheetMain.HiddenField(fieldName, this.printFlavorTextField(this.printSpan(fieldName)));
    }
    printCoreEffects() {
        let fieldName = this.getActionTypeAttribute("TechCoreEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printCoreEffectsField(
                this.printAttributeTooltip("Effects", "Core Effects",
                    this.getActionTypeAttribute("TechCoreEffect", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
    printOnEnter() {
        let fieldName = this.getActionTypeAttribute("TechOnEnter");
        let onEnterDef = WuxDef.Get("Trait_OnEnter");
        return WuxSheetMain.HiddenField(fieldName,
            this.printOnEnterField(this.printTooltip("On Enter Effects", "On Enter Effects", onEnterDef.descriptions)));
    }

    printCheckEffects() {
        let fieldName = this.getActionTypeAttribute("TechCheckEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printCheckEffectsField(
                `<input type="hidden" class="wuxFeatureHeader-flag" name="${this.getActionTypeAttribute("TechCoreDefense")}">`,
                this.printAttributeTooltip(this.printSpanActionTypeAttribute("TechCheckTitle"), "Skill Check Effects",
                    this.getActionTypeAttribute("TechCheckEffect", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
    printEndEffects() {
        let fieldName = this.getActionTypeAttribute("TechEndEffect");
        return WuxSheetMain.HiddenField(fieldName, this.printEndEffectsField(this.printSpan(fieldName)));
    }
    printWillBreakEffects() {
        let fieldName = this.getActionTypeAttribute("TechWillBreakEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printWillBreakEffectsField(
                this.printAttributeTooltip("Will Break Effects", "Will Break Effects",
                    this.getActionTypeAttribute("TechWillBreakEffect", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
    printEnhancementEffects() {
        let fieldName = this.getActionTypeAttribute("TechEnhanceEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printEnhancementEffectsField(
                this.printSpan(fieldName)
            )
        );
    }
}

class TechniqueRepeaterDisplayBuilderUsable extends TechniqueRepeaterDisplayBuilder {
    printName() {
        let contents = `<button class="wuxFeatureHeaderNameButton" type="roll" value="@{${WuxDef.GetVariable("Action_Use")}}">
            ${this.printSpanActionTypeAttribute("TechName")}
        </button>`
        return this.printNameField(contents);
    }
    printEnhancementEffects() {
        let fieldName = this.getActionTypeAttribute("TechEnhanceEffect");

        let rankUpField = this.getActionTypeAttribute("TechRankUp");
        let rankUpButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankUp", WuxDef._info),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon'>&#43;</span> Increase Rank", "wuxFeatureButton"),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon'>&#43;</span> Increase Rank", "wuxFeatureButtonDisabled"));
        let rankDownField = this.getActionTypeAttribute("TechRankDown");
        let rankDownButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankDown", WuxDef._info),
            WuxSheetMain.Button(rankDownField, "<span class='wuxFeatureButtonIcon'>&#8722;</span> Decrease Rank", "wuxFeatureButton"),
            WuxSheetMain.Button(rankDownField, "<span class='wuxFeatureButtonIcon'>&#8722;</span> Decrease Rank", "wuxFeatureButtonDisabled"));
        let contents = `<div class="wuxFeatureHeaderInfoEffect-EnhanceButtons">${rankDownButton}${rankUpButton}</div>`;

        return WuxSheetMain.HiddenField(fieldName,
            `${this.printEnhancementEffectsField(this.printSpan(fieldName))}
            ${contents}`
        );
    }
}

class BaseItemDisplayBuilder extends BaseFeatureDisplayBuilder {
    constructor() {
        super();
    }

    printHeaderBlock() {
        return this.printHeaderBlockField(
            `<div class="wuxFeatureHeaderDisplayInfoBlock">
            ${this.printBulk()}
            ${this.printBaseValue()}
        </div>`);
    }

    printInfoBlock() {
        return this.printInfoBlockField(
            `${this.printFlavorText()}
            ${this.printTraits()}
            ${this.printCrafting()}`);
    }

    printBulk() {}
    printBulkField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoBulk">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> Bulk</span>${WuxSheetMain.HiddenSpanField(this.getActionTypeAttribute("ItemPerFive"), `<sub class="wuxFeatureHeaderDisplayInfoSubtitle">${WuxDef.GetTitle("ItemPerFive")}</sub>`)}</div>`;
    }
    printBaseValue() {}
    printBaseValueField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoCoin">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> J</span>${WuxSheetMain.HiddenSpanField(this.getActionTypeAttribute("ItemPerFive"), `<sub class="wuxFeatureHeaderDisplayInfoSubtitle">${WuxDef.GetTitle("ItemPerFive")}</sub>`)}</div>`;
    }

    printFlavorText() {}
    printFlavorTextField (contents) {
        return `<div class="wuxFeatureHeaderInfoFlavor">${contents}</div>`;
    }

    printTraits() {}
    printTraitsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoTraits"><strong>${title}.</strong> ${contents}</div>`;
    }

    printCrafting() {}
    printCraftingField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-Core">
            <input type="hidden" class="wuxFeatureHeader-flag" value="Core">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }
}

class ItemRepeaterDisplayBuilder extends BaseItemDisplayBuilder {
    constructor(baseDefinition, rootSuffix) {
        super();
        this.baseDefinition = baseDefinition;
        this.rootSuffix = rootSuffix;
    }

    getActionTypeAttribute (attribute, suffix) {
        if (this.rootSuffix != undefined) {
            suffix = `${suffix != undefined ? suffix : ""}${this.rootSuffix}`;
        }
        return this.baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
    }
    printSpan (fieldName) {
        return `<span name="${fieldName}"></span>`;
    }
    printSpanActionTypeAttribute (attribute, suffix) {
        return `<span name="${this.getActionTypeAttribute(attribute, suffix)}"></span>`;
    }
    printAttributeTooltip (name, tooltipName, fieldName) {
        let descriptionData = `<span class="wuxDescription" name="${fieldName}"></span>`;
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printTooltipField(name, tooltipName, descriptionData),
            `${name}`);
    }

    printName() {
        let contents = this.printSpanActionTypeAttribute("ItemName");
        return this.printNameField(contents);
    }
    printActionType () {
        let fieldName = this.getActionTypeAttribute("ItemGroup");
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="Item">`,
            this.printSpan(fieldName));
    }
    printBulk() {
        let fieldName = this.getActionTypeAttribute("ItemBulk");
        return WuxSheetMain.HiddenField(fieldName, this.printBulkField(this.printSpan(fieldName)));
    }
    printBaseValue() {
        let fieldName = this.getActionTypeAttribute("ItemBaseValue");
        return WuxSheetMain.HiddenField(fieldName, this.printBaseValueField(this.printSpan(fieldName)));
    }
    printFlavorText() {
        let fieldName = this.getActionTypeAttribute("ItemDescription");
        return WuxSheetMain.HiddenField(fieldName, this.printFlavorTextField(this.printSpan(fieldName)));
    }
    printTraits() {
        let fieldName = this.getActionTypeAttribute("ItemTrait");
        return WuxSheetMain.HiddenField(fieldName,
            this.printTraitsField(
                this.printAttributeTooltip("Traits", "Traits", this.getActionTypeAttribute("ItemTrait", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
    printCrafting() {
        let fieldName = this.getActionTypeAttribute("ItemCraft");
        return WuxSheetMain.HiddenField(fieldName,
            this.printCraftingField(
                this.printAttributeTooltip("Crafting", "Crafting",
                    this.getActionTypeAttribute("ItemCraft", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
}

class CharacterBackgroundBuilder {
    constructor() {
    }
    print() {
        return `${this.printBasics()}
            ${this.printOriginStats()}
            ${this.printGenerator()}`;
    }
    
    printBasics() {
        let definition = WuxDef.Get("Title_Background");
        let hiddenField = definition.getAttribute(WuxDef._expand);
        let header = WuxSheetMain.CollapsibleHeader(definition.getTitle(), hiddenField);
        let contents = WuxSheetMain.MultiRowGroup(
            [this.backgroundBasics(), this.backgroundBackstory()], 
            WuxSheetMain.Table.FlexTable, 2);
        return `${WuxSheetMain.Header(header)} 
        ${WuxSheetMain.HiddenAuxField(hiddenField, contents)}`;
    }

    backgroundBasics() {
        let isPlayerField = `${WuxSheet.MainPageDisplayInput()}
            ${WuxSheet.PageDisplay("OriginData", WuxDefinition.BuildSelect(WuxDef.Get("Title_IsPlayer"), WuxDef.GetAttribute("Title_IsPlayer"),
                WuxDef.Filter([new DatabaseFilterData("group", "IsPlayer")]), false))}`;


        let sheetNameField = `${WuxSheet.MainPageDisplayInput()}
                ${WuxSheet.PageDisplay("OriginData", WuxDefinition.BuildTextInput(WuxDef.Get("CharSheetName"), WuxDef.GetAttribute("CharSheetName")))}
                ${WuxSheet.PageDisplay("CharacterData", WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName")))}`;
        let nameFields = WuxSheetMain.MultiRowGroup([
                WuxSheetMain.Table.FlexTableGroup(sheetNameField),
                WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName")), " wuxFlexTableItemGroup2")],
            WuxSheetMain.Table.FlexTable, 2);
        
        let ancestryField = WuxDefinition.BuildSelect(WuxDef.Get("Ancestry"), WuxDef.GetAttribute("Ancestry"),
            WuxDef.Filter([new DatabaseFilterData("group", "AncestryType")]));
        let ethnicityField = `<input type="hidden" class="wuxAncestrySelection-flag" name="${WuxDef.GetAttribute("Ancestry")}" value="0">
            <div class="wuxAncestrySelection-Human">\n${WuxDefinition.BuildSelect(WuxDef.Get("Ethnicity"), WuxDef.GetAttribute("Ethnicity"),
            WuxDef.Filter([new DatabaseFilterData("group", "RaceType")]), true)}\n</div>`;
        let ancestryFields = WuxSheetMain.MultiRowGroup(
            [WuxSheetMain.Table.FlexTableGroup(ancestryField), WuxSheetMain.Table.FlexTableGroup(ethnicityField, " wuxFlexTableItemGroup2")],
            WuxSheetMain.Table.FlexTable, 2);
        
        let affinityField = WuxDefinition.BuildSelect(WuxDef.Get("Affinity"), WuxDef.GetAttribute("AffinityAspect"),
            [WuxDef.Get("Unaspected")].concat(WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])), 
            false);
        
        let quickDescriptionField = WuxDefinition.BuildTextarea(WuxDef.Get("QuickDescription"), WuxDef.GetAttribute("QuickDescription"),
            "wuxInput wuxHeight30");
        
        let startingJinField = `${WuxSheet.MainPageDisplayInput()}
                ${WuxSheet.PageDisplay("OriginData", WuxDefinition.BuildTextInput(WuxDef.Get("Title_StartingJin"), WuxDef.GetAttribute("Jin")))}`;
        
        return WuxSheetMain.Table.FlexTableGroup(`${isPlayerField}
        ${nameFields}
        ${ancestryFields}
        ${affinityField}
        ${quickDescriptionField}
        ${startingJinField}`);
    }

    backgroundBackstory() {
        let titleField = WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
        let ageGenderFields = WuxSheetMain.MultiRowGroup([
            WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"))),
            WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildSelect(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"),
                WuxDef.Filter([new DatabaseFilterData("group", "GenderType")]), true))
        ], WuxSheetMain.Table.FlexTable, 2);
        let homeRegionField = WuxDefinition.BuildSelect(WuxDef.Get("HomeRegion"), WuxDef.GetAttribute("HomeRegion"),
            WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
        let backgroundField = WuxDefinition.BuildTextarea(WuxDef.Get("Backstory"), WuxDef.GetAttribute("Backstory"),
            "wuxInput wuxHeight150");
        return WuxSheetMain.Table.FlexTableGroup(`${titleField}
        ${ageGenderFields}
        ${homeRegionField}
        ${backgroundField}`);
    }
    
    printOriginStats() {
        let contents = WuxSheetMain.MultiRowGroup([this.buildAdvancementData(), WuxCharacterSheetBuilders.BuildInfluences()],
            WuxSheetMain.Table.FlexTable, 2);
        return `${WuxSheet.MainPageDisplayInput()}
                ${WuxSheet.PageDisplay("OriginData", contents)}`;
    }
    
    buildAdvancementData() {
        let contents = "";
        contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginAdvancement"));
        contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
        contents += WuxDefinition.BuildText(WuxDef.Get("CR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));
        contents += WuxDefinition.BuildText(WuxDef.Get("Potency"), WuxSheetMain.Span(WuxDef.GetAttribute("Potency")));

        return WuxSheetMain.Table.FlexTableGroup(contents);
    }
    
    printGenerator() {
        let definition = WuxDef.Get("Title_BackgroundGenerator");
        let hiddenField = definition.getAttribute(WuxDef._expand);
        let header = WuxSheetMain.CollapsibleHeaderInverse(definition.getTitle(), hiddenField);
        return `${WuxSheetMain.Header(header)} 
        ${WuxSheetMain.HiddenField(hiddenField, this.backgroundGenerator())}`;
    }

    backgroundGenerator() {
        let leftColumn = "";
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenName"), WuxDef.GetAttribute("Note_GenName"));
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenFullName"), WuxDef.GetAttribute("Note_GenFullName"));
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenGender"), WuxDef.GetAttribute("Note_GenGender"));
        leftColumn += WuxDefinition.BuildSelect(WuxDef.Get("Note_GenHomeRegion"), WuxDef.GetAttribute("Note_GenHomeRegion"),
            WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenRace"), WuxDef.GetAttribute("Note_GenRace"));
        leftColumn = WuxSheetMain.Table.FlexTableGroup(leftColumn);

        let rightColumn = "";
        let generatorDefinition = WuxDef.Get("Note_GenerateCharacter");
        let useDefinition = WuxDef.Get("Note_UseGeneration");
        let clearDefinition = WuxDef.Get("Note_ClearBackground");
        rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenPersonality"), WuxDef.GetAttribute("Note_GenPersonality"));
        rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenMotivation"), WuxDef.GetAttribute("Note_GenMotivation"));
        rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(generatorDefinition.getAttribute(), generatorDefinition.getTitle()));
        rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(useDefinition.getAttribute(), useDefinition.getTitle()));
        rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(clearDefinition.getAttribute(), clearDefinition.getTitle()));
        rightColumn = WuxSheetMain.Table.FlexTableGroup(rightColumn);

        return `${WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2)}`;
    }
}

class CharacterStatisticsBuilder {
    constructor() {
    }
    print() {
        return `<div class="wuxCharacterStatistics">
            ${this.printBasics()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printDefenses()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printExpandedStats()}
        </div>`;
    }
    
    printBasics() {
        let fullNameDef = WuxDef.Get("FullName");
        let levelDef = WuxDef.Get("Level");
        let jobDef = WuxDef.Get("Forme_JobSlot");
        let crDef = WuxDef.Get("CR");

        let filteredStats = WuxDef.Filter([new DatabaseFilterData("subGroup", "CoreResource")]);
        let resourceContents = "";
        for (let definition of filteredStats) {
            resourceContents += `<div class="wuxRow">
            ${this.printStat(definition, definition.abbreviation,
                definition.getAttribute(WuxDef._max), definition.getAttribute(WuxDef._info))}
            </div>`;
        }
        
        return `${WuxSheetMain.Header(WuxSheetMain.Span(fullNameDef.getAttribute()))}
            <div class="wuxRow">
                <span>[</span><span>${crDef.getTitle()}</span><span> </span>${WuxSheetMain.Span(crDef.getAttribute())}<span>]</span>
                <span> </span>
                <span>${levelDef.abbreviation}</span>${WuxSheetMain.Span(levelDef.getAttribute())}
                <span> </span>
                ${WuxSheetMain.Span(jobDef.getAttribute())}
            </div>
            ${resourceContents}`;
    }
    printDefenses() {
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", ["Defense", "Sense"])]);
        let contents = this.printHeader(WuxDef.GetTitle("Defense"));
        for (let definition of filteredStats) {
            let abilityScores = [];
            let defenseDefinitionNames = definition.formula.getDefinitions();
            for (let defenseDefinitionName of defenseDefinitionNames) {
                if (defenseDefinitionName == "CR") {
                    continue;
                }
                let defenseDefinition = WuxDef.Get(defenseDefinitionName);
                abilityScores.push(defenseDefinition.abbreviation);
            }
            let attributesLine = "";
            if (abilityScores.length > 0) {
                attributesLine = `(${abilityScores.join("/")})`;
            }
            
            contents += this.printStat(definition, `${definition.getTitle()} ${attributesLine}`, 
                definition.getAttribute(), definition.getAttribute(WuxDef._info));
        }
        return contents;
    }
    
    printExpandedStats() {
        let contents = this.printHeader(WuxDef.GetTitle("Title_Conflict"));
        contents += this.printFilteredSubGroupStats("EnStat");
        contents += this.printFilteredSubGroupStats("MoveStat");
        contents += this.printFilteredSubGroupStats("CombatStat");
        return contents;
    }
    printFilteredSubGroupStats(subGroupName) {
        let contents = "";
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("subGroup", subGroupName)]);
        for (let definition of filteredStats) {
            contents += this.printStat(definition, definition.getTitle(),
                definition.getAttribute(), definition.getAttribute(WuxDef._info));
        }
        return `${contents}
        `;
    }
    
    printHeader(header) {
        return WuxSheetMain.Header(header);
    }

    printSetStat(definition, title, fieldAttr) {
        return `<div class="wuxFlexTableItemGroup">
            <strong>${WuxSheetMain.Tooltip.Text(title,
            this.printDefinitionTooltipContents(definition))}</strong>
            <div class="wuxCharacterStatisticsStat">
                ${WuxSheetMain.Span(fieldAttr)}
            </div>
        </div>`;
    }
    printDefinitionTooltipContents(definitionData) {
        return `${WuxSheetMain.Header2(definitionData.title)}
        <span class="wuxDescription">${definitionData.getDescription(`</span><span class="wuxDescription">`)}</span>`;
    }
    
    printStat(definition, title, fieldAttr, statCalculationField) {
        return `<div class="wuxFlexTableItemGroup">
            ${WuxSheetMain.Tooltip.Text(title,
            this.printDefinitionTooltipContents(definition))}
            <div class="wuxCharacterStatisticsStat">
                ${WuxSheetMain.Tooltip.Text(WuxSheetMain.Span(fieldAttr),
            this.printStatCalculationTooltipContent(definition, statCalculationField))}
            </div>
        </div>`;
    }
    printStatCalculationTooltipContent(definitionData, statCalculationField) {
        return `${WuxSheetMain.Header2(definitionData.title)}
        <span class="wuxDescription" name="${statCalculationField}"></span>`;
    }
    
}

class ExtendedCharacterStatisticsBuilder extends CharacterStatisticsBuilder {

    print() {
        let leftColumn = `<div class="wuxCharacterStatistics">
            ${this.printBasics()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printAttributes()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printDefenses()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printExpandedStats()}
        </div>`;
        let rightColumn = `<div class="wuxCharacterStatistics">
            ${this.printSkills()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printKnowledges()}
        </div>`;

        return WuxSheetMain.MultiRowGroup(
            [WuxSheetMain.Table.FlexTableGroup(leftColumn), WuxSheetMain.Table.FlexTableGroup(rightColumn)],
            WuxSheetMain.Table.FlexTable, 2);
    }
    
    printAttributes() {
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", "Attribute")]);
        let contents = this.printHeader(WuxDef.GetTitle("Attribute"));
        for (let definition of filteredStats) {
            contents += this.printSetStat(definition, definition.getTitle(), definition.getAttribute());
        }
        return contents;
    }

    printLoreStat(nameAttr, descAttr, statAttr) {
        return `<div class="wuxFlexTableItemGroup">
            ${WuxSheetMain.Tooltip.Text(
                `<span name="${nameAttr}"></span>`,
                `${WuxSheetMain.Header2(`<span name="${nameAttr}"></span>`)}<span class="wuxDescription" name="${descAttr}"></span>`
            )}
            <div class="wuxCharacterStatisticsStat">
                ${WuxSheetMain.Span(statAttr)}
            </div>
        </div>`;
    }

    printKnowledges() {
        const loreRepeaterIds = [
            "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
            "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
        ];
        let loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));
        let recallDef = WuxDef.Get("Recall");
        let generalLoreTitle = WuxDef.GetTitle("Title_GeneralLore");
        let loreCategoryDef = WuxDef.Get("Title_LoreCategory");
        let contents = this.printHeader(WuxDef.GetTitle("Page_Knowledge"));
        contents += WuxSheetMain.Row(this.printStat(recallDef, recallDef.getTitle(), recallDef.getAttribute(), recallDef.getAttribute(WuxDef._info)));

        for (let i = 0; i < loreCategoryDefinitions.length; i++) {
            let categoryDef = loreCategoryDefinitions[i];
            let repeaterDef = WuxDef.Get(loreRepeaterIds[i]);

            let categoryHeader = WuxSheetMain.Header2(loreCategoryDef.getTitle(categoryDef.getTitle()));

            let categoryContents = WuxSheetMain.HiddenField(categoryDef.getAttribute(WuxDef._rank),
                `<div class="wuxFlexTableItemGroup">${WuxSheetMain.Tooltip.Text(generalLoreTitle, this.printDefinitionTooltipContents(categoryDef))}</div>`);

            categoryContents += `<div class="wuxNoRepControl"><fieldset class="${repeaterDef.getVariable()}">
                ${this.printLoreStat(
                    WuxDef.GetAttribute("Lore_SubType"),
                    WuxDef.GetAttribute("Lore_Description"),
                    WuxDef.GetAttribute("Lore_Tier")
                )}
            </fieldset></div>`;

            contents += `<input type="hidden" class="wuxHiddenField-flag" name="${categoryDef.getAttribute("_display")}" value="0">
            <div class="wuxHiddenBlockField">
                ${categoryHeader}
                <div class="wuxFlexTable">
                    ${categoryContents}
                </div>
            </div>`;
        }
        return contents;
    }

    printSkills() {
        let contents = "";
        this.printHeader(WuxDef.GetTitle("Skill"));

        let skillGroups = ["ActiveSkills", "SocialSkills", "WorldSkills"];
        for (let skillGroup of skillGroups) {

            let subSkillGroups = WuxDef.Filter([new DatabaseFilterData("subGroup", skillGroup)]);
            for (let subSkillGroup of subSkillGroups) {
                contents += this.printHeader(`${subSkillGroup.getTitle()} Skills`);

                let skillDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Skill"),
                    new DatabaseFilterData("subGroup", subSkillGroup.getTitle())]);
                for (let definition of skillDefinitions) {
                    contents += this.printStat(definition, definition.getTitle(), definition.getAttribute(), definition.getAttribute(WuxDef._info));
                }
            }
        }
        return contents;
    }

}

class ChatDisplayBuilder {
    constructor(showLanguageSelect = true) {
        this.showLanguageSelect = showLanguageSelect;
    }
    print() {
        let sections = [this.outfitCollection()];
        if (this.showLanguageSelect) sections.push(this.languageSelect());
        let contents = WuxSheetMain.MultiRowGroup(sections, WuxSheetMain.Table.FlexTable, 2);
        contents = WuxSheetMain.TabBlock(contents);

        let definition = WuxDef.Get("Title_Emotes");
        return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
    }

    languageSelect() {
        let contents = "";
        let titleDefinition = WuxDef.Get("Title_LanguageSelect");
        contents += WuxDefinition.InfoHeader(titleDefinition);
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_LanguageTag"), "wuxInput");

        let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
        for (let i = 0; i < languageFilters.length; i++) {
            contents += WuxSheetMain.HiddenField(languageFilters[i].getAttribute(WuxDef._filter),
                WuxSheetMain.InteractionElement.BuildTooltipRadioInput(WuxDef.GetAttribute("Chat_Language"), WuxDef.GetAttribute("Chat_Language", WuxDef._info),
                    languageFilters[i].title,
                    this.languageTitle(languageFilters[i]), WuxDefinition.TooltipDescription(languageFilters[i]))
            );
        }

        return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
    }

    languageTitle(languageDef) {
        return `<span class="wuxHeader2">${languageDef.title}</span><span class="wuxSubheader"> - ${languageDef.location}</span>`;
    }

    outfitCollection() {
        let contents = "";
        let titleDefinition = WuxDef.Get("Title_Outfits");
        contents += WuxDefinition.InfoHeader(titleDefinition);
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_SetId"));
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_Emotes"));
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_PostName"));
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_PostURL"));

        let outfitNameDef = WuxDef.Get("Chat_OutfitName");
        let emoteContents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(outfitNameDef.getAttribute(WuxDef._expand))}
            ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(outfitNameDef.getAttribute(WuxDef._learn),
                WuxSheetMain.Header(WuxSheetMain.Span(outfitNameDef.getAttribute(), "New Outfit")))}
            ${WuxSheetMain.SectionBlockHeaderFooter()}
            ${WuxSheetMain.InteractionElement.ExpandableBlockContents(outfitNameDef.getAttribute(WuxDef._expand),
                WuxSheetMain.SectionBlockContents(this.buildOutfitContents()))}`;

        emoteContents = `<div class="wuxSectionBlock wuxMinWidth200 wuxMaxWidth220">
            ${WuxSheetMain.InteractionElement.Build(true, emoteContents)}
        </div>`;

        contents += `<div class="wuxRepeatingFlexSection">
            <fieldset class="${WuxDef.GetVariable("RepeatingOutfits")}">
                ${emoteContents}
            </fieldset>
        </div>`;
        return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150 wuxFlexTableItemGroup2");
    }

    buildOutfitContents() {
        let contents = "";
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_OutfitEmotes", WuxDef._true));

        let outfitNameDefinition = WuxDef.Get("Chat_OutfitName");
        contents += WuxSheetMain.Header2(outfitNameDefinition.title) + "\n" +
            WuxSheetMain.Input("text", outfitNameDefinition.getAttribute(), "New Outfit");

        let outfitEmotesDef = WuxDef.Get("Chat_OutfitEmotes");
        contents += WuxSheetMain.Header2(`${outfitEmotesDef.title}`) + "\n" +
            WuxSheetMain.Textarea(outfitEmotesDef.getAttribute(), "wuxInput wuxHeight60");

        contents += WuxSheetMain.Row("&nbsp;");

        let defaultNameDefinition = WuxDef.Get("Chat_OutfitDefault");
        let defaultURLDefinition = WuxDef.Get("Chat_OutfitDefaultURL");
        contents += WuxSheetMain.Header2(defaultNameDefinition.title) + "\n" +
            WuxSheetMain.Input("text", defaultNameDefinition.getAttribute());
        contents += WuxSheetMain.Header2(defaultURLDefinition.title) + "\n" +
            WuxSheetMain.Input("text", defaultURLDefinition.getAttribute(), "");
        contents += WuxSheetMain.Row("&nbsp;");

        let nameDefinition = WuxDef.Get("Chat_EmoteName");
        let urlDefinition = WuxDef.Get("Chat_EmoteURL");
        for (let i = 2; i <= 30; i++) {
            contents += WuxSheetMain.Header2(`${nameDefinition.title} ${i}`) + "\n" +
                WuxSheetMain.Input("text", nameDefinition.getAttribute() + i);
            contents += WuxSheetMain.Header2(`${urlDefinition.title} ${i}`) + "\n" +
                WuxSheetMain.Input("text", urlDefinition.getAttribute() + i);
        }

        return contents;
    }
}

class FilterDisplayBuilder {
    constructor(filterDefinitions) {
        this.filterDefinitions = filterDefinitions;
    }

    print() {
        return `<div class="wuxFilterSection">
            ${this.printContents()}
        </div>
        `;
    }

    printContents() {
        let output = "";
        let keys = this.filterDefinitions.getKeys();
        for (let key of keys) {
            let definitions = this.filterDefinitions.getDefinitions(key);
            if (definitions.length > 0) {
                output += this.printFilterEntry(key, definitions) + "\n";
            }
        }
        return output;
    }

    printFilterEntry(filterName, options) {
        let baseDefinition = WuxDef.Get(filterName);
        let optionsOutput = "";
        for(let i = 0; i < options.length; i++) {
            optionsOutput += this.printFilterOption(options[i]);
        }

        let expandField = baseDefinition.getAttribute(WuxDef._expand);
        let header = WuxSheetMain.Header(
            WuxSheetMain.CollapsibleHeaderInverse(`<span>${baseDefinition.getTitle()}</span>`, expandField));
        let content = WuxSheetMain.HiddenField(expandField,
            `${optionsOutput}
            ${WuxSheetMain.Row("&nbsp;")}`);
        return header + content;
    }
    printFilterOption(optionDefinition) {
        return this.printFilterData(WuxSheetMain.InteractionElement.BuildCheckboxInput(
            this.filterDefinitions.getCompoundAttribute(optionDefinition),
            optionDefinition.getTitle()));
    }

    printFilterData(contents) {
        return `<div class="wuxFilterPopupContentData">${contents}</div>
        `;
    }
}
class JobSelectionBuilder {
    constructor() {
        this.jobDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Job")]);
        this.jobSelectDefinition = WuxDef.Get("Forme_SelectJob");
    }

    print() {
        return `${WuxSheetMain.Header(this.jobSelectDefinition.getTitle())}
        <div class="wuxJobSelection">
        ${this.buildJobSelectButton()}
        </div>
        <div class="wuxRow">&nbsp;</div>`;
    }
    buildJobSelectButton() {
        let output = "";
        this.iterateJobs(jobDefinition => {
            output += this.printJobSelectButton(jobDefinition);
        });
        return output;
    }
    iterateJobs(callback) {
        for (let jobDefinition of this.jobDefinitions) {
            callback(jobDefinition);
        }
    }
    printJobSelectButton(jobDefinition) {
        let jobName = jobDefinition.getTitle();
        return WuxSheetMain.HiddenSpanField(jobDefinition.getAttribute(),
            `<input type="hidden" class="wuxJobSelection-flag" name="${jobDefinition.getAttribute(WuxDef._learn)}" />
            ${WuxSheetMain.Button(this.jobSelectDefinition.getAttribute(), jobName, "", jobName)}`
        );
    }
}
