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
    const populateBasicActions = function (attributeHandler, repeatingSectionName, styleName) {
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
    const populateInspectionElements = function (attrHandler, popupRepeater, sectionRepeater, selectedId) {

        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `All Owned Equipment`);

        let selectedElement = null;
        sectionRepeater.iterate(function (id) {
            let techniqueName = attrHandler.parseString(sectionRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
            let technique = WuxTechs.Get(techniqueName);
            if (technique.techSet != "") {
                let newRowId = popupRepeater.generateRowId();
                attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), technique.name);
                attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Tech");

                if (id == selectedId) {
                    selectedElement = {
                        item: technique,
                        id: newRowId
                    }
                    attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
                } else {
                    attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                }
            }
        });

        return selectedElement;
    };

    const inspectTechnique = function (repeatingSectionName, inspectionField) {
        let styleRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
        let selectedId = styleRepeater.getIdFromFieldName(inspectionField);

        styleRepeater.getIds(function (techRepeater) {
            WuxWorkerInspectPopup.OpenTechniqueInspection(function (attrHandler) {
                    techRepeater.iterate(function (id) {
                        attrHandler.addMod(techRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
                    });
                },
                function (attrHandler, itemPopupRepeater) {
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                    attrHandler.addUpdate(techRepeater.getFieldName(selectedId, WuxDef.GetVariable("Action_Actions")), "0");
                    return populateInspectionElements(attrHandler, itemPopupRepeater, techRepeater, selectedId);
                }
            );
        });
    };
    'use strict';

    const populateAllBasicActions = function (attributeHandler)
    {
        populateBasicActions(attributeHandler, "RepeatingBasicActions", "Basic Action");
        populateBasicActions(attributeHandler, "RepeatingBasicRecovery", "Basic Recovery");
        populateBasicActions(attributeHandler, "RepeatingBasicAttack", "Basic Attack");
        populateBasicActions(attributeHandler, "RepeatingBasicSocial", "Basic Social");
    },

    inspectTechniqueBasicAction = function (eventinfo) {
        inspectTechnique("RepeatingBasicActions", eventinfo.sourceAttribute);
    },
    inspectTechniqueBasicRecovery = function (eventinfo) {
        inspectTechnique("RepeatingBasicRecovery", eventinfo.sourceAttribute);
    },
    inspectTechniqueBasicAttack = function (eventinfo) {
        inspectTechnique("RepeatingBasicAttack", eventinfo.sourceAttribute);
    },
    inspectTechniqueBasicSocial = function (eventinfo) {
        inspectTechnique("RepeatingBasicSocial", eventinfo.sourceAttribute);
    };

    return {
        PopulateAllBasicActions: populateAllBasicActions,
        InspectTechniqueBasicAction: inspectTechniqueBasicAction,
        InspectTechniqueBasicRecovery: inspectTechniqueBasicRecovery,
        InspectTechniqueBasicAttack: inspectTechniqueBasicAttack,
        InspectTechniqueBasicSocial: inspectTechniqueBasicSocial
    };
}());
