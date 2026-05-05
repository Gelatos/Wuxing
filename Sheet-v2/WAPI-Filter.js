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
        let definitions = [];
        if (key == undefined) {
            let keys = this.getKeys();
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                definitions = definitions.concat(this.definitionDatabase[key]);
            }
        }
        else {
            definitions = this.definitionDatabase[key];
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
        this.definitionDatabase["FilterType_DamageType"] = WuxDef.Filter(new DatabaseFilterData("group", "DamageType"));

        let statusDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Status"));
        statusDefinitions = statusDefinitions.filter(item => item.canBeFiltered);
        this.definitionDatabase["FilterType_StatusGood"] = statusDefinitions.filter(item => item.isBeneficial);
        this.definitionDatabase["FilterType_StatusBad"] = statusDefinitions.filter(item => !item.isBeneficial);
    }
}

