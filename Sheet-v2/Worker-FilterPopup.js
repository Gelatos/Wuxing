// noinspection ES6ConvertVarToLetConst

class FilterPopupAttributeHandler extends BasePopupAttributeHandler {
    constructor(attrHandler, filterDefinitions) {
        super(attrHandler);
        this.baseDefinition = WuxDef.Get("TechFilterPopup");
        this.filterDefinitions = filterDefinitions;
        this.sectionDefinition = WuxDef.Get("Action_FormeTechniques");
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
        let variables = this.filterDefinitions.getAllVariables();
        variables.forEach((variable) => {
            this.attrHandler.addUpdate(variable, 0);
        });
    };
    setFilterActive() {
        this.attrHandler.addUpdate(this.getFilterVariable(), JSON.stringify(this.getTechniqueFilters()));
    }
    getTechniqueFilters() {
        let techniqueFilters = [];
        let keys = this.filterDefinitions.getKeys();
        for (let key of keys) {
            let definitions = this.filterDefinitions.getDefinitions(key);
            if (definitions.length > 0) {
                let baseDefinition = WuxDef.Get(key);
                let activeValues = [];
                definitions.forEach((definition) => {
                    if (this.attrHandler.parseString(this.filterDefinitions.getCompoundVariable(definition)) == "on") {
                        activeValues.push(definition.abbreviation != "" ? definition.abbreviation : definition.name);
                    }
                })
                if (activeValues.length > 0) {
                    techniqueFilters.push(new DatabaseFilterData(baseDefinition.getDescription(""), activeValues));
                }
            }
        }
        if (techniqueFilters.length == 0) {
            return 0;
        }
        return techniqueFilters;
    }
    getFilterVariable() {
        return this.sectionDefinition.getVariable(WuxDef._filter);
    }
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
            
            let filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");
            
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterPopup = new FilterPopupAttributeHandler(attrHandler, filterDefinitions);
                filterPopup.show("Popup_FilterTechniquePopupName");
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupType"), "Forme");
            });
            attributeHandler.run();
        },
        close = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");
            
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterPopup = new FilterPopupAttributeHandler(attrHandler, filterDefinitions);
                filterPopup.hide();
            });
            attributeHandler.run();
        },
        applyFilter = function () {
            Debug.Log("Applying Technique Filters");
            let loader = new LoadingScreenHandler();
            loader.showLoadingScreen(() => {
                let attributeHandler = new WorkerAttributeHandler();

                let filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");
                attributeHandler.addMod(filterDefinitions.getAllVariables());

                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let filterPopup = new FilterPopupAttributeHandler(attrHandler, filterDefinitions);
                    filterPopup.setFilterActive();
                    filterPopup.hide();
                });
                attributeHandler.addFinishCallback(function (attrHandler) {
                    let filterPopup = new FilterPopupAttributeHandler(attrHandler, filterDefinitions);
                    let attributeHandler2 = new WorkerAttributeHandler();
                    let filters = attrHandler.parseJSON(filterPopup.getFilterVariable());
                    WuxWorkerActions.UpdateAllFormeActions(attributeHandler2, filters);
                    attributeHandler2.addFinishCallback(() => {
                        loader.hideLoadingScreen();
                    });
                    attributeHandler2.run();
                })
                attributeHandler.run();
            });
        
        }, 
        removeFilter = function () {
            WuxWorkerActions.RefreshAllFormeActions();
        },
        clearFilter = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterPopup = new FilterPopupAttributeHandler(attrHandler, filterDefinitions);
                filterPopup.resetFilterVariables();
            });
            attributeHandler.run();
        };

    return {
        OpenFormeTechnique : openFormeTechnique,
        Close: close,
        ApplyFilter: applyFilter,
        RemoveFilter: removeFilter,
        ClearFilter: clearFilter
    };
}());