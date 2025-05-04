var WuxWorkerActions = WuxWorkerActions || (function () {
    
    const addAffinityVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("AdvancedBranch")]);
    };
    const getAffinities = function (attrHandler) {
        return [attrHandler.parseString(WuxDef.GetVariable("Affinity")),
            attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")),
            attrHandler.parseString(WuxDef.GetVariable("AdvancedBranch"))];
    };
    const populateStyleTechniques = function (attrHandler, sectionRepeater, styleName, maxTier) {

        let styleTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", styleName));
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", sectionRepeater);
        let affinities = getAffinities(attrHandler);
        for (let tier = 1; tier <= maxTier; tier++) {
            let tierData = styleTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }
                if (!affinities.includes(affinity)) {
                    return;
                }
                
                techsByAffinity.forEach(function (technique) {
                    techniqueAttributeHandler.setId(sectionRepeater.generateRowId());
                    techniqueAttributeHandler.setTechniqueInfo(technique, true);
                });
            });
        }
    };

    const populateBasicActions = function (attributeHandler, repeatingSectionName, styleName)
    {
        let repeatingWorker = new WorkerRepeatingSectionHandler(repeatingSectionName);

        repeatingWorker.getIds(function (repeater) {
            repeater.removeAllIds();
        });

        addAffinityVariables(attributeHandler);
        let crFieldName = WuxDef.GetVariable("CR");
        attributeHandler.addMod(crFieldName);
        
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            populateStyleTechniques(attrHandler, repeatingWorker, styleName, attrHandler.parseInt(crFieldName));
        });
    };
    'use strict';

    const populateAllBasicActions = function (attributeHandler)
    {
        populateBasicActions(attributeHandler, "RepeatingBasicActions", "Basic Action");
        populateBasicActions(attributeHandler, "RepeatingBasicRecovery", "Basic Recovery");
        populateBasicActions(attributeHandler, "RepeatingBasicAttack", "Basic Attack");
        populateBasicActions(attributeHandler, "RepeatingBasicSocial", "Basic Social");
    };

    return {
        PopulateAllBasicActions: populateAllBasicActions
    };
}());
