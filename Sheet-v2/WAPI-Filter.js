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

