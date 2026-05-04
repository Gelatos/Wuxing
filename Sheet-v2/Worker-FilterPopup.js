// noinspection ES6ConvertVarToLetConst

class FilterPopupAttributeHandler extends BasePopupAttributeHandler {
    constructor(attrHandler) {
        super(attrHandler);
    }

    show(popupTitleDefinitionName) {
        super.show(popupTitleDefinitionName);
        this.resetFilterVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupActive"), "on");
    }

    hide() {
        super.hide();
        this.resetFilterVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupActive"), "0");
    }
    resetFilterVariables() {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupType"), "");
    };
}

var WuxWorkerFilterPopup = WuxWorkerFilterPopup || (function () {
    const setInspectionSelection = function (attrHandler, repeaterName, id) {
        let currentType = attrHandler.parseString(WuxDef.GetVariable("Popup_InspectSelectType"));
        let currentId = attrHandler.parseString(WuxDef.GetVariable("Popup_InspectSelectId"));
        if (currentType != "" && currentId != "") {
            let oldRepeater = new WorkerRepeatingSectionHandler(currentType);
            attrHandler.addUpdate(oldRepeater.getFieldName(currentId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "0");
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType"), repeaterName);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectId"), id);
    };
    'use strict';

    const openFormeTechnique = function () {
            Debug.Log("Open Technique Filter Popup");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterPopup = new FilterPopupAttributeHandler(attrHandler);
                filterPopup.show("Popup_FilterTechniquePopupName");
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupType"), "Forme");
            });
            attributeHandler.run();
        },
        close = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterPopup = new FilterPopupAttributeHandler(attrHandler);
                filterPopup.hide();
            });
            attributeHandler.run();
        };

    return {
        OpenFormeTechnique : openFormeTechnique,
        Close: close
    };
}());