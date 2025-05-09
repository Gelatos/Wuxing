var WuxWorkerActions = WuxWorkerActions || (function () {
    const tryAddTechniqueToBoosters = function (attrHandler, technique, boosterFieldName) {
        if (technique.action == "Passive") {
            let passiveStyleTechniques = attrHandler.parseJSON(boosterFieldName);
            if (passiveStyleTechniques == "0" || passiveStyleTechniques == "") {
                passiveStyleTechniques = [];
            }
            if (!passiveStyleTechniques.includes(technique.name)) {
                passiveStyleTechniques.push(technique.name);
                attrHandler.addUpdate(boosterFieldName, JSON.stringify(passiveStyleTechniques));
            }
        }
    };
    const addAffinityVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("AdvancedBranch")]);
    };
    const addBoosterVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("BoostStyleTech"), WuxDef.GetVariable("BoostGearTech")]);
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
        let boosterFieldName = WuxDef.GetVariable("BoostStyleTech");
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
                    tryAddTechniqueToBoosters(attrHandler, technique, boosterFieldName);
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
        addBoosterVariables(attributeHandler);
        let crFieldName = WuxDef.GetVariable("CR");
        attributeHandler.addMod(crFieldName);
        
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            populateStyleTechniques(attrHandler, repeatingWorker, styleName, attrHandler.parseInt(crFieldName));
        });
    };
    const populateInspectionElements = function (attrHandler, popupRepeater, sectionRepeater, inspectionTitle, selectedId) {

        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), inspectionTitle);

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

    const inspectTechnique = function (repeatingSectionName, inspectionField, inspectionTitle) {
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
                    return populateInspectionElements(attrHandler, itemPopupRepeater, techRepeater, inspectionTitle, selectedId);
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
        inspectTechnique("RepeatingBasicActions", eventinfo.sourceAttribute, "All Basic Action Techniques");
    },
    inspectTechniqueBasicRecovery = function (eventinfo) {
        inspectTechnique("RepeatingBasicRecovery", eventinfo.sourceAttribute, "All Basic Recovery Techniques");
    },
    inspectTechniqueBasicAttack = function (eventinfo) {
        inspectTechnique("RepeatingBasicAttack", eventinfo.sourceAttribute, "All Basic Attack Techniques");
    },
    inspectTechniqueBasicSocial = function (eventinfo) {
        inspectTechnique("RepeatingBasicSocial", eventinfo.sourceAttribute, "All Basic Social Techniques");
    }, 
        
    populateStyleActions = function (attributeHandler, repeatingSectionName, repeatingSectionIndex, styleName, tier) {
        let repeatingWorker = new WorkerRepeatingSectionHandler(repeatingSectionName, repeatingSectionIndex);

        repeatingWorker.getIds(function (repeater) {
            repeater.removeAllIds();
        });

        addAffinityVariables(attributeHandler);
        addBoosterVariables(attributeHandler);
        let crFieldName = WuxDef.GetVariable("CR");
        attributeHandler.addMod(crFieldName);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let cr = attrHandler.parseInt(crFieldName);
            let maxRank = Math.min(tier, cr);
            populateStyleTechniques(attrHandler, repeatingWorker, styleName, maxRank);
        });
    };

    return {
        PopulateAllBasicActions: populateAllBasicActions,
        InspectTechniqueBasicAction: inspectTechniqueBasicAction,
        InspectTechniqueBasicRecovery: inspectTechniqueBasicRecovery,
        InspectTechniqueBasicAttack: inspectTechniqueBasicAttack,
        InspectTechniqueBasicSocial: inspectTechniqueBasicSocial,
        PopulateStyleActions: populateStyleActions
    };
}());
