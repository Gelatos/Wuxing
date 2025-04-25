

var WuxWorkerStyles = WuxWorkerStyles || (function () {

    const populateStyleInspectionTechniques = function (attrHandler, itemPopupRepeater, styleName) {
        Debug.Log(`Populate Style Inspection Techniques for ${styleName}`);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${styleName} Techniques`);
        let style = WuxStyles.Get(styleName);
        let maxTier = style.maxTier;
        Debug.Log(`Max Tier for ${styleName} is ${maxTier}`);

        let selectedElement = null;
        let styleTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", styleName));

        for (let tier = 1; tier <= maxTier; tier++) {

            let tierData = styleTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }
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

                techsByAffinity.forEach(function (styleTechnique) {
                    newRowId = itemPopupRepeater.generateRowId();
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
    const addStyles = function (attrHandler, styleWorker, advancedRepeater, arteformRepeater) {
        let arteformSlot = WuxDef.GetVariable("Style_ArteformSlot");
        let advancedSlots = [WuxDef.GetVariable("Style_AdvancedSlot1"),
            WuxDef.GetVariable("Style_AdvancedSlot2"), WuxDef.GetVariable("Style_AdvancedSlot3")];

        styleWorker.iterateBuildStats(function (styleVariableData) {

            let style = WuxStyles.GetByVariableName(styleVariableData.name);
            if (style.group != "") {
                if (style.group == "Advanced") {
                    let newRowId = advancedRepeater.generateRowId();
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_Name")), style.name);
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_Actions")), style.name);
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_SeeTechniques")), style.name);
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_IsEquipped")), arteformSlot == style.name ? "on" : 0);
                }
                else if (style.group == "Arteform") {
                    let newRowId = arteformRepeater.generateRowId();
                    attrHandler.addUpdate(arteformRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_Name")), style.name);
                    attrHandler.addUpdate(arteformRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_Actions")), style.name);
                    attrHandler.addUpdate(arteformRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_SeeTechniques")), style.name);
                    attrHandler.addUpdate(arteformRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_IsEquipped")), advancedSlots.includes(style.name) ? "on" : 0);
                }
            }
        });
    };
    'use strict';

    const updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Styles");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Style");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },

        updateStats = function (attributeHandler) {
            let styleWorker = new WuxBasicWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);
            attributeHandler.addMod([WuxDef.GetVariable("Style_ArteformSlot"), WuxDef.GetVariable("Style_AdvancedSlot1"), 
                WuxDef.GetVariable("Style_AdvancedSlot2"), WuxDef.GetVariable("Style_AdvancedSlot3")]);

            let advancedStyleValuesRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingAdvancedStyles");
            let arteformStyleValuesRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingArteformStyles");
            advancedStyleValuesRepeatingSection.getIds(function (advancedRepeater) {
                arteformStyleValuesRepeatingSection.getIds(function (arteformRepeater) {
                    attributeHandler.addGetAttrCallback(function (attrHandler) {
                        styleWorker.setBuildStatsDraft(attrHandler);

                        arteformRepeater.removeAllIds();
                        advancedRepeater.removeAllIds();
                        addStyles(attrHandler, styleWorker, advancedRepeater, arteformRepeater);
                    });
                    attributeHandler.run();
                });
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

                    return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater, style);
                }
            );
        };

    return {
        UpdateBuildPoints: updateBuildPoints,
        UpdateStats: updateStats,
        SeeTechniques: seeTechniques
    };
}());

