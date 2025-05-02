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

        sectionRepeater.removeAllIds();
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
                    techniqueAttributeHandler.setTechniqueInfo(technique);
                });
            });
        }
    };
    'use strict';

    const populateBasicActions = function (attributeHandler)
    {
        addAffinityVariables(attributeHandler);
        let crFieldName = WuxDef.GetVariable("CR");
        attributeHandler.addMod(crFieldName);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            populateStyleTechniques(attrHandler,
                new WorkerRepeatingSectionHandler("RepeatingBasicActions"),
                "Basic Action", attrHandler.parseInt(crFieldName));
            populateStyleTechniques(attrHandler,
                new WorkerRepeatingSectionHandler("RepeatingBasicRecovery"),
                "Basic Recovery", attrHandler.parseInt(crFieldName));
            populateStyleTechniques(attrHandler,
                new WorkerRepeatingSectionHandler("RepeatingBasicAttack"),
                "Basic Attack", attrHandler.parseInt(crFieldName));
            populateStyleTechniques(attrHandler,
                new WorkerRepeatingSectionHandler("RepeatingBasicSocial"),
                "Basic Social", attrHandler.parseInt(crFieldName));
        });
        
        attributeHandler.run();
    };

    return {
        PopulateBasicActions: populateBasicActions
    };
}());
