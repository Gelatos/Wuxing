

var WuxWorkerStyles = WuxWorkerStyles || (function () {

    const populateStyleInspectionTechniques = function (attrHandler, itemPopupRepeater, styleName, maxDisplayTier, showTierHeaders) {
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${styleName} Techniques`);
        let style = WuxStyles.Get(styleName);
        let maxTier = Math.min(style.maxTier, maxDisplayTier);

        let selectedElement = null;
        let styleTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", styleName));

        Debug.Log(`Populate ${maxTier} tiers of ${styleName} techniques`);
        for (let tier = 1; tier <= maxTier; tier++) {
            Debug.Log(`Adding Style Techniques for ${styleName} at tier ${tier}`);

            let tierData = styleTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }
                
                if (showTierHeaders) {
                    addStyleTierHeaderToInspectionPopup(attrHandler, itemPopupRepeater, affinity, styleName, tier);
                }

                techsByAffinity.forEach(function (styleTechnique) {
                    let newRowId = itemPopupRepeater.generateRowId();
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), styleTechnique.name);
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Tech");

                    if (selectedElement == null) {
                        selectedElement = {
                            item: styleTechnique,
                            id: newRowId
                        }
                        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
                    } else {
                        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                    }
                });
            });
        }

        return selectedElement;
    };
    const addStyleTierHeaderToInspectionPopup = function (attrHandler, itemPopupRepeater, affinity, styleName, tier) {
        let techHeader = "";
        let techDesc = "";
        if (tier != 0) {
            techHeader += `Tier ${tier}`;
            techDesc += `These techniques are learned upon reaching ${styleName} Tier ${tier}`;
        }
        if (affinity != "") {
            techHeader += (techHeader == "" ? "" : "; ") + `${affinity} Affinity`;
            techDesc +=  (techDesc == "" ? "" : " ") + `and require ${affinity} affinity`;
        }

        let newRowId = itemPopupRepeater.generateRowId();
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), techHeader);
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "");
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectDesc")), techDesc);
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
    };
    
    const addStyles = function (attrHandler, styleWorker, advancedRepeater) {
        Debug.Log("Add Styles");
        let arteformSlot = WuxDef.GetVariable("Forme_ArteformSlot");
        let advancedSlots = [WuxDef.GetVariable("Forme_ArteformSlot"),
            WuxDef.GetVariable("Forme_AdvancedSlot2"), WuxDef.GetVariable("Forme_AdvancedSlot3")];

        styleWorker.iterateBuildStats(function (styleVariableData) {
            let style = WuxStyles.GetByVariableName(styleVariableData.name);
            Debug.Log(`Style is named ${style.name} which is in group ${style.group}`);
            if (style.group != "") {
                let newRowId = advancedRepeater.generateRowId();
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Name")), style.name);
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Tier")), styleVariableData.value);
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Actions")), 0);
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_SeeTechniques")), 0);
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsEquipped")), arteformSlot == style.name ? "on" : 0);
            }
        });
    };
    
    const seeFormeTechniques = function (eventinfo, repeaterName) {
        Debug.Log("See Forme Techniques");
        
        let repeater = new WorkerRepeatingSectionHandler(repeaterName);
        let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
        let nameFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Name"));
        let tierFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Tier"));
        let actionFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Actions"));
        let seeTechniqueFieldName = eventinfo.sourceAttribute;
        let crFieldName = WuxDef.GetVariable("CR");

        WuxWorkerInspectPopup.OpenTechniqueInspection(
            function (attrHandler) {
                attrHandler.addMod([nameFieldName, tierFieldName, crFieldName]);
            },
            function (attrHandler, itemPopupRepeater) {
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                attrHandler.addUpdate(seeTechniqueFieldName, "0");
                attrHandler.addUpdate(actionFieldName, "0");
                let maxTier = attrHandler.parseInt(tierFieldName);
                let cr = attrHandler.parseInt(crFieldName);
                
                return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater, 
                    attrHandler.parseString(nameFieldName), Math.min(maxTier, cr), false);
            });
    }
    'use strict';

    const updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Styles Build Points");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Style");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },

        updateStats = function (attributeHandler) {
            Debug.Log("Update Style Stats");
            let styleWorker = new WuxBasicWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);
            attributeHandler.addMod([WuxDef.GetVariable("Forme_ArteformSlot"), WuxDef.GetVariable("Forme_AdvancedSlot2"), WuxDef.GetVariable("Forme_AdvancedSlot3")]);

            let advancedStyleValuesRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingAdvancedStyles");
            advancedStyleValuesRepeatingSection.getIds(function (advancedRepeater) {
                advancedRepeater.removeAllIds();
            });
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                Debug.Log("Adding Style Stats");
                styleWorker.setBuildStatsDraft(attrHandler);

                addStyles(attrHandler, styleWorker, advancedStyleValuesRepeatingSection);

                styleWorker.cleanBuildStats();
                styleWorker.setBuildStatVariables(attrHandler);
                styleWorker.saveBuildStatsToFinal(attrHandler);
            });
        },

        seeTechniques = function (eventinfo) {
            Debug.Log("See Techniques");
            
            WuxWorkerInspectPopup.OpenTechniqueInspection(function () {
                },
                function (attrHandler, itemPopupRepeater) {
                    let style = eventinfo.newValue;

                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                    attrHandler.addUpdate(eventinfo.sourceAttribute, "0");
                    attrHandler.addUpdate(WuxDef.GetVariable(WuxDef.GetName(style, WuxDef.Get("Style")), WuxDef._expand), "0");

                    return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater, style, 9, true);
                }
            );
        },

        seeJobTechniques = function (eventinfo) {
            seeFormeTechniques(eventinfo, "RepeatingJobStyles");
        },

        seeAdvancedTechniques = function (eventinfo) {
            seeFormeTechniques(eventinfo, "RepeatingAdvancedStyles");
        };

    return {
        UpdateBuildPoints: updateBuildPoints,
        UpdateStats: updateStats,
        SeeTechniques: seeTechniques,
        SeeJobTechniques: seeJobTechniques,
        SeeAdvancedTechniques: seeAdvancedTechniques
    };
}());

