// ====== Classes

class Dictionary {

    constructor() {
        this.keys = [];
        this.values = {};
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
    has(key) {
        return this.keys.includes(key);
    }
    iterate(callback) {
        for (let i = 0; i < this.keys.length; i++) {
            callback(this.values[this.keys[i]]);
        }
    }
}

class DatabaseFilterData {
    constructor(property, value) {
        this.property = property;
        this.value = value;
    }
}
class Database extends Dictionary {
    constructor(sortingProperties, data, dataCreationCallback) {
        super();
        this.sortingGroups = {};
        for (let i = 0; i < sortingProperties.length; i++) {
            this.sortingGroups[sortingProperties[i]] = {};
        }

        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, dataCreationCallback);
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
        let json = JSON.parse(stringifiedJSON);
        this.importJson(json);
    }
    importJson(json) {
        this.keys = json.keys;
        this.values = json.values;
        this.sortingGroups = json.sortingGroups;
    }
    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            this.add(data.name, data);
        }
    }

    add(key, value) {
        super.add(key, value);
        let propertyValue = "";
        for (let property in this.sortingGroups) {
            propertyValue = value[property];
            if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
                this.sortingGroups[property][propertyValue] = [];
            }
            this.sortingGroups[property][propertyValue].push(value.name);
        }
    }

    filter(filterData) {
        let filteredGroup = this.getSortedGroup(filterData[0].property, filterData[0].value);
        let filters = [];
        for (let i = 1; i < filterData.length; i++) {
            filters = this.getSortedGroup(filterData[i].property, filterData[i].value);
            filteredGroup = filteredGroup.filter(item => filters.includes(item))
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
}
class ExtendedDescriptionDatabase extends Database {
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
}

class dbObj {
    constructor(data) {
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
        else {
            createEmpty();
        }
    }
    importStringifiedJson(stringifiedJSON) {
        let json = JSON.parse(stringifiedJSON);
        this.importJson(json);
    }
    importJson(json) { }
    importSheets(dataArray) { }
    createEmpty() { }
}
class TechniqueData extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.augment = json.augment;
        this.group = json.group;
        this.category = json.category;
        this.acquisition = json.acquisition;
        this.action = json.action;
        this.traits = json.traits;
        this.limits = json.limits;
        this.resourceCost = json.resourceCost;
        this.flavorText = json.flavorText;
        this.description = json.description;
        this.onSuccess = json.onSuccess;
        this.dConditions = json.dConditions;
        this.tEffect = json.tEffect;
        this.ongDesc = json.ongDesc;
        this.ongSave = json.ongSave;
        this.ongEft = json.ongEft;
        this.trigger = json.trigger;
        this.requirement = json.requirement;
        this.item = json.item;
        this.prerequisite = json.prerequisite;
        this.skill = json.skill;
        this.defense = json.defense;
        this.range = json.range;
        this.rType = json.rType;
        this.target = json.target;
        this.targetCode = json.targetCode;
        this.dVal = json.dVal;
        this.dType = json.dType;
        this.dBonus = json.dBonus;
        this.damageType = json.damageType;
        this.element = json.element;

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.augment = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.category = "" + dataArray[i]; i++;
        this.acquisition = "" + dataArray[i]; i++;
        this.action = "" + dataArray[i]; i++;
        this.traits = "" + dataArray[i]; i++;
        this.limits = "" + dataArray[i]; i++;
        this.resourceCost = "" + dataArray[i]; i++;
        this.flavorText = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.onSuccess = "" + dataArray[i]; i++;
        this.dConditions = "" + dataArray[i]; i++;
        this.tEffect = "" + dataArray[i]; i++;
        this.ongDesc = "" + dataArray[i]; i++;
        this.ongSave = "" + dataArray[i]; i++;
        this.ongEft = "" + dataArray[i]; i++;
        this.trigger = "" + dataArray[i]; i++;
        this.requirement = "" + dataArray[i]; i++;
        this.item = "" + dataArray[i]; i++;
        this.prerequisite = this.createPrerequisiteData(dataArray.slice(i)); i += 4;
        this.skill = "" + dataArray[i]; i++;
        this.defense = "" + dataArray[i]; i++;
        this.range = "" + dataArray[i]; i++;
        this.rType = "" + dataArray[i]; i++;
        this.target = "" + dataArray[i]; i++;
        this.targetCode = "" + dataArray[i]; i++;
        this.dVal = "" + dataArray[i]; i++;
        this.dType = "" + dataArray[i]; i++;
        this.dBonus = "" + dataArray[i]; i++;
        this.damageType = "" + dataArray[i]; i++;
        this.element = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.augment = "";
        this.group = "";
        this.category = "";
        this.acquisition = "";
        this.action = "";
        this.traits = "";
        this.limits = "";
        this.resourceCost = "";
        this.flavorText = "";
        this.description = "";
        this.onSuccess = "";
        this.dConditions = "";
        this.tEffect = "";
        this.ongDesc = "";
        this.ongSave = "";
        this.ongEft = "";
        this.trigger = "";
        this.requirement = "";
        this.item = "";
        this.prerequisite = this.createPrerequisiteData();
        this.skill = "";
        this.defense = "";
        this.range = "";
        this.rType = "";
        this.target = "";
        this.targetCode = "";
        this.dVal = "";
        this.dType = "";
        this.dBonus = "";
        this.damageType = "";
        this.element = "";
        this.augments = [];
    }

    createPrerequisiteData(dataArray) {
        let output = {
            lv: 0,
            ap: "",
            tr: 0,
            ot: ""
        };
        if (dataArray != undefined) {
            let i = 0;
            output.lv = parseInt(dataArray[i]); i++;
            output.ap = "" + dataArray[i]; i++;
            output.tr = parseInt(dataArray[i]); i++;
            output.ot = "" + dataArray[i]; i++;
        }
        return output;
    }
    
    trySetAugmentTechValues(techDatabase) {
        if (this.augment != "") {
            this.setAugmentTechValues(techDatabase.get(this.augment));
        }
    }
    setAugmentTechValues(baseTechnique) {

        if (this.name == "") {
            return baseTechnique;
        }
        this.acquisition = this.setAugmentTechValue(this.acquisition, baseTechnique.acquisition);
        this.action = this.setAugmentTechValue(this.action, baseTechnique.action);
        this.traits = this.setAugmentTechValue(this.traits, baseTechnique.traits);
        this.limits = this.setAugmentTechValue(this.limits, baseTechnique.limits);
        this.resourceCost = this.setAugmentTechValue(this.resourceCost, baseTechnique.resourceCost);
        this.trigger = this.setAugmentTechValue(this.trigger, baseTechnique.trigger);
        this.requirement = this.setAugmentTechValue(this.requirement, baseTechnique.requirement);
        this.item = this.setAugmentTechValue(this.item, baseTechnique.item);
        this.prerequisite.lv = this.setAugmentTechValue(this.prerequisite.lv, baseTechnique.prerequisite.lv);
        this.prerequisite.ap = this.setAugmentTechValue(this.prerequisite.ap, baseTechnique.prerequisite.ap);
        this.prerequisite.tr = this.setAugmentTechValue(this.prerequisite.tr, baseTechnique.prerequisite.tr);
        this.prerequisite.ot = this.setAugmentTechValue(this.prerequisite.ot, baseTechnique.prerequisite.ot);
        this.skill = this.setAugmentTechValue(this.skill, baseTechnique.skill);
        this.defense = this.setAugmentTechValue(this.defense, baseTechnique.defense);
        this.range = this.setAugmentTechValue(this.range, baseTechnique.range);
        this.rType = this.setAugmentTechValue(this.rType, baseTechnique.rType);
        this.target = this.setAugmentTechValue(this.target, baseTechnique.target);
        this.targetCode = this.setAugmentTechValue(this.targetCode, baseTechnique.targetCode);
        this.dVal = this.setAugmentTechValue(this.dVal, baseTechnique.dVal);
        this.dType = this.setAugmentTechValue(this.dType, baseTechnique.dType);
        this.dBonus = this.setAugmentTechValue(this.dBonus, baseTechnique.dBonus);
        this.damageType = this.setAugmentTechValue(this.damageType, baseTechnique.damageType);
        this.element = this.setAugmentTechValue(this.element, baseTechnique.element);
        this.description = this.setAugmentTechValue(this.description, baseTechnique.description);
        this.onSuccess = this.setAugmentTechValue(this.onSuccess, baseTechnique.onSuccess);
        this.tEffect = this.setAugmentTechValue(this.tEffect, baseTechnique.tEffect);
        this.rEffect = this.setAugmentTechValue(this.rEffect, baseTechnique.rEffect);
        this.dConditions = this.setAugmentTechValue(this.dConditions, baseTechnique.dConditions);
    }

    setAugmentTechValue (augmentValue, baseValue) {
        if (augmentValue == "-") {
            return "";
        }
        else if (augmentValue == "") {
            return baseValue;
        }
        return augmentValue;
    }
}
class SkillData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.abilityScore = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;

    }
    createEmpty() {
        this.name = "";
        this.group = "";
        this.abilityScore = "";
        this.description = "";
    }
}
class LanguageData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.location = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.group = "";
        this.location = "";
        this.description = "";
    }
}
class LoreData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;

    }
    createEmpty() {
        this.name = "";
        this.group = "";
        this.description = "";
    }
}
class JobData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.attributes = new AttributeGroupData(dataArray.slice(i)); i += 7;
        this.roles = this.createRolesArray(dataArray.slice(i)); i += 5;
        this.prereq = "" + dataArray[i]; i++;
        this.techniques = this.createJobTechnique(dataArray.slice(i)); i++;
    }
    createEmpty() {
        this.name = "";
        this.group = "";
        this.description = "";
        this.attributes = new AttributeGroupData();
        this.roles = this.createRolesArray();
        this.prereq = "";
        this.techniques = [];
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
class RoleData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.techniques = this.createTechnique(dataArray.slice(i)); i++;

    }
    createEmpty() {
        this.name = "";
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
class DefinitionData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.descriptions = [("" + dataArray[i])]; i++;
        this.abbreviation = "" + dataArray[i]; i++;
        this.variable = "" + dataArray[i]; i++;
        this.formula = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.group = "";
        this.descriptions = [];
        this.abbreviation = "";
        this.variable = "";
        this.formula = "";
    }
    
    getVariable(mod) {
        if (mod == undefined) {
            return this.variable
        }
        else if (Array.isArray(mod)) {
            return this.variable.replace(/{(\d+)}/g, function(_,m) {
                return mod[--m];
            });
        }
        return this.variable.replace(/{(\d+)}/g, function(_,m) {
            return mod;
        });
    }
    getAttribute(mod) {
        return `attr_${this.getVariable(mod)}`;
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

// ====== Formatters

var FeatureService = FeatureService || (function () {
    'use strict';

    var

        // Display Technique (Private)
        // ------------------------,

        getTechniqueDisplayDataObj = function () {
            return {
                name: "",
                username: "",
                fieldName: "",
                actionType: "",
                usageInfo: "",
                isArmament: false,

                slotType: "",
                slotIsPath: false,
                slotSource: "",
                slotFooter: "",

                prerequisite: "",
                trigger: "",

                isFunctionBlock: false,
                traits: [],
                requirement: "",
                item: "",

                isCheckBlock: false,
                isCheckBlockTarget: false,
                target: "",
                rType: "",
                range: "",
                skill: "",
                damage: "",

                isDescBlock: false,
                description: "",
                onHit: "",
                conditions: "",

                technique: {}
            };

        },

        getTechniqueDisplayData = function (technique) {
            let techDisplayData = getTechniqueDisplayDataObj();
            setTechniqueDisplayDataBase(techDisplayData, technique);
            setTechniqueDisplayDataName(techDisplayData, technique);
            setTechniqueDisplayDataUsageInfo(techDisplayData, technique);
            setTechniqueDisplayDataSlotData(techDisplayData, technique);
            setTechniqueDisplayDataFunctionBlock(techDisplayData, technique);
            setTechniqueDisplayDataCheckBlock(techDisplayData, technique);
            setTechniqueDisplayDataDescriptionBlock(techDisplayData, technique);
            return techDisplayData;
        },

        setTechniqueDisplayDataBase = function (techDisplayData, technique) {
            techDisplayData.technique = technique;
            techDisplayData.isArmament = technique.item != "";
        },

        setTechniqueDisplayDataName = function (techDisplayData, technique) {
            techDisplayData.name = technique.name;
            techDisplayData.username = technique.username;
            techDisplayData.fieldName = Format.ToCamelCase(technique.name);
        },

        setTechniqueDisplayDataUsageInfo = function (techDisplayData, technique) {
            techDisplayData.actionType = technique.action;

            techDisplayData.usageInfo = "";
            if (technique.action != "") {
                techDisplayData.usageInfo += technique.action;
            }
            if (technique.limits != "") {
                if (techDisplayData.usageInfo != "") {
                    techDisplayData.usageInfo += "; ";
                }
                techDisplayData.usageInfo += technique.limits;
            }
            if (technique.resourceCost != "") {
                if (techDisplayData.usageInfo != "") {
                    techDisplayData.usageInfo += "; ";
                }
                techDisplayData.usageInfo += technique.resourceCost;
            }
        },

        setTechniqueDisplayDataSlotData = function (techDisplayData, technique) {
            techDisplayData.slotType = technique.group;
            techDisplayData.slotIsPath = technique.acquisition == "Free";
            techDisplayData.slotFooter = `${technique.group}`;
            techDisplayData.slotSource = technique.group;

        },

        setTechniqueDisplayDataFunctionBlock = function (techDisplayData, technique) {

            techDisplayData.prerequisite = getPrerequisiteString(technique);

            techDisplayData.isFunctionBlock = technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.item != "";
            if (techDisplayData.isFunctionBlock) {
                techDisplayData.traits = DefinitionDatabase.GetValues(technique.traits);
                techDisplayData.requirement = techDisplayData.requirement;
                techDisplayData.item = techDisplayData.item;
                techDisplayData.trigger = technique.trigger;
            }
        },

        setTechniqueDisplayDataCheckBlock = function (techDisplayData, technique) {
            techDisplayData.isCheckBlock = technique.skill != "" || technique.defense != "" || technique.range != "" || technique.target != "" || (technique.dVal != "" && technique.dVal != 0) || technique.damageType != "";

            if (techDisplayData.isCheckBlock) {
                setTechniqueDisplayDataCheckBlockRange(techDisplayData, technique);
                setTechniqueDisplayDataCheckBlockSkill(techDisplayData, technique);
                setTechniqueDisplayDataCheckBlockDamage(techDisplayData, technique);
            }
        },

        setTechniqueDisplayDataCheckBlockRange = function (techDisplayData, technique) {
            if (technique.range != "" || technique.target != "") {
                techDisplayData.isCheckBlockTarget = true;
                techDisplayData.target = technique.target;

                if (technique.range != "") {
                    techDisplayData.rType = technique.rType;
                    techDisplayData.range = technique.range;
                }
            }
        },

        setTechniqueDisplayDataCheckBlockSkill = function (techDisplayData, technique) {
            if (technique.skill != "") {
                techDisplayData.skill = "";
                if (technique.defense != "" && technique.defense != undefined) {
                    techDisplayData.skill = technique.defense;
                }
                else {
                    techDisplayData.skill = "DC 15";
                }
                techDisplayData.skill = `${technique.skill} vs. ${techDisplayData.skill}`;
            }
        },

        setTechniqueDisplayDataCheckBlockDamage = function (techDisplayData, technique) {
            if ((technique.dVal != "" && technique.dVal > 0) || technique.damageType != "") {
                techDisplayData.damage = getDamageString(technique);
            }
        },

        setTechniqueDisplayDataDescriptionBlock = function (techDisplayData, technique) {

            techDisplayData.isDescBlock = technique.description != "" || technique.onSuccess != "";
            if (techDisplayData.isDescBlock) {
                techDisplayData.description = technique.description;
                techDisplayData.onHit = technique.onSuccess;
                setTechniqueDisplayDataDescriptionBlockConditions(techDisplayData, technique);
            }
        },

        setTechniqueDisplayDataDescriptionBlockConditions = function (techDisplayData, technique) {

            let actionEffects = getActionEffects(technique.dConditions);
            let output = "";

            let status = {};
            let description = "";
            for (let i = 0; i < actionEffects.states.length; i++) {
                status = DefinitionDatabase.GetValues(actionEffects.states[i].name);
                description = "";
                for (let j = 0; j < status.description.length; j++) {
                    description += `${status.description[j]}\n`;
                }
                if (output != "") {
                    output += "\n";
                }
                output += `[State: ${status.name}] ${description}`;
            }
            for (let i = 0; i < actionEffects.conditions.length; i++) {
                status = DefinitionDatabase.GetValues(actionEffects.conditions[i].name);
                description = "";
                for (let j = 0; j < status.description.length; j++) {
                    description += `${status.description[j]}\n`;
                }
                if (output != "") {
                    output += "\n";
                }
                output += `[Condition: ${status.name}] ${description}`;
            }

            techDisplayData.conditions = output;
        },

        // Display Technique (Variants)
        // ------------------------,

        getRollTemplate = function (techDisplayData) {

            let output = "";

            output += `{{Username=${techDisplayData.username}}}{{Name=${techDisplayData.name}}}{{SlotType=${techDisplayData.slotFooter}}}{{Source=${techDisplayData.slotSource}}}{{UsageInfo=${techDisplayData.usageInfo}}}${techDisplayData.traits.length > 0 ? rollTemplateTraits(techDisplayData.traits, "Trait") : ""}${techDisplayData.trigger ? `{{Trigger=${techDisplayData.trigger}}}` : ""}${techDisplayData.requirement ? `{{Requirement=${techDisplayData.requirement}}}` : ""}${techDisplayData.item ? `{{Item=${techDisplayData.item}}}` : ""}${techDisplayData.range ? `{{Range=${techDisplayData.range}}}` : ""}${techDisplayData.target ? `{{Target=${techDisplayData.target}}}` : ""}${techDisplayData.skill ? `{{SkillString=${techDisplayData.skill}}}` : ""}${techDisplayData.damage ? `{{DamageString=${techDisplayData.damage}}}` : ""}${techDisplayData.description ? `{{Desc=${techDisplayData.description}}}` : ""}${techDisplayData.onHit ? `{{OnHit=${techDisplayData.onHit}}}` : ""}${techDisplayData.conditions ? `{{Conditions=${techDisplayData.conditions}}}` : ""}`;

            output += ` {{type-${techDisplayData.slotType}=1}} ${techDisplayData.slotIsPath ? "{{isPath=1}} " : ""}{{type-${techDisplayData.actionType}=1}} ${techDisplayData.isFunctionBlock ? "{{type-FunctionBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlockTarget=1}} " : ""}${techDisplayData.isDescBlock ? "{{type-DescBlock=1}} " : ""}`;

            return `&{template:technique} ${output.trim()}`;
        },

        getRollTemplateFromTechnique = function (technique) {
            let techDisplayData = getTechniqueDisplayData(technique);
            return getRollTemplate(techDisplayData);
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

            if (feature.augment != "") {
                output += `${feature.augment} Technique`;
            }

            if (feature.prerequisite != undefined) {
                if (feature.prerequisite.lv > 0) {
                    if (output != "") {
                        output += "; ";
                    }
                    output += `Character Level ${feature.prerequisite.lv}`;
                }
                if (feature.prerequisite.ap > 0) {
                    if (output != "") {
                        output += "; ";
                    }
                    switch (feature.prerequisite.ap) {
                        case "Wood":
                        case "Fire":
                        case "Earth":
                        case "Metal":
                        case "Water":
                            output += `${feature.prerequisite.ap} Element`;
                            break;
                        default:
                            output += `${feature.prerequisite.ap} Branch`;
                            break;
                    }
                }
                if (feature.prerequisite.tr > 0) {
                    if (output != "") {
                        output += "; ";
                    }
                    output += `Trained in ${feature.prerequisite.tr}`;
                }
                if (feature.prerequisite.ot != "") {
                    if (output != "") {
                        output += "; ";
                    }
                    output += feature.prerequisite.ot;
                }
            }

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
        GetTechniqueDisplayData: getTechniqueDisplayData,
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

            output += FeatureService.RollTemplateTraits(DefinitionDatabase.Get(itemData.traits), "WpnTrait");
            output += FeatureService.RollTemplateTraits(DefinitionDatabase.Get(itemData.abilities), "WpnAbility");

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

        // Array Formatting
        // ------------------------

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
        ArrayToString: arrayToString,
        SortArrayDecrementing: sortArrayDecrementing,
        ShowTooltip: showTooltip,
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

function GetLanguageTag(language) {

    if (language == undefined) {
        return "{{language-default=1}}";
    }

    switch (language.toLowerCase()) {
        case "minere":
            return "{{language-coastal=1}}";
        case "apollen":
            return "{{language-mountain=1}}";
        case "junal":
            return "{{language-desert=1}}";
        case "cert":
            return "{{language-plains=1}}";
        case "lib":
            return "{{language-rare=1}}";


        case "palmic":
        case "shorespeak":
        case "verdeni":
            return "{{language-coastal=1}}{{language-regional=1}}";
        case "crinere":
        case "vulca":
            return "{{language-coastal=1}}{{language-ancient=1}}";

        case "kleikan":
            return "{{language-mountain=1}}{{language-regional=1}}";

        case "byric":
        case "dustell":
        case "muralic":
            return "{{language-desert=1}}{{language-regional=1}}";
        case "shira":
            return "{{language-desert=1}}{{language-ancient=1}}";

        case "ciel":
        case "citeq":
        case "manstan":
        case "salkan":
        case "sansic":
        case "silq":
            return "{{language-plains=1}}{{language-regional=1}}";

        case "jovean":
            return "{{language-rare=1}}{{language-regional=1}}";
        case "mytikan":
            return "{{language-rare=1}}{{language-ancient=1}}";

        case "wolfwarg":
        case "beast":
        case "empathy":
        case "emotion":
        case "spirit":
            return "{{language-special=1}}";

        default:
            return "{{language-default=1}}";
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

