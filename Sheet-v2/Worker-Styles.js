

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
    'use strict';

    const updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Styles");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Style");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
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
        SeeTechniques: seeTechniques
    };
}());

