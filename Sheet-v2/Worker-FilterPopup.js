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

class FilterPopup {
    constructor(attributeHandler) {
        this.attributeHandler = attributeHandler;
        this.filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");
    }
    open() {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
            filterPopupAttrHandler.show("Popup_FilterTechniquePopupName");
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupType"), "Forme");
        });
    }
    close() {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
            filterPopupAttrHandler.hide();
        });
    }
    
    applyFilter() {
        let loader = new LoadingScreenHandler();
        loader.showLoadingScreen(() => {
            let filterPopup = this;
            this.attributeHandler.addMod(this.filterDefinitions.getAllVariables());

            this.attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
                filterPopupAttrHandler.setFilterActive();
                filterPopupAttrHandler.hide();
            });
            this.attributeHandler.addFinishCallback(function (attrHandler) {
                let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
                let attributeHandler2 = new WorkerAttributeHandler();
                let filters = attrHandler.parseJSON(filterPopupAttrHandler.getFilterVariable());
                WuxWorkerActions.UpdateAllFormeActions(attributeHandler2, filters);
                attributeHandler2.addFinishCallback(() => {
                    loader.hideLoadingScreen();
                });
                attributeHandler2.run();
            })
            attributeHandler.run();
        });
    }
    
    clearFilter() {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
            filterPopupAttrHandler.resetFilterVariables();
        });
    }
}

var WuxWorkerFilterPopup = WuxWorkerFilterPopup || (function () {
    'use strict';

    const openFormeTechnique = function () {
            Debug.Log("Open Technique Filter Popup");
            let attributeHandler = new WorkerAttributeHandler();
            let filterPopup = new FilterPopup(attributeHandler);
            filterPopup.open();
            attributeHandler.run();
        },
        close = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let filterPopup = new FilterPopup(attributeHandler);
            filterPopup.close();
            attributeHandler.run();
        },
        applyFilter = function () {
            Debug.Log("Applying Technique Filters");
            let attributeHandler = new WorkerAttributeHandler();
            let filterPopup = new FilterPopup(attributeHandler);
            filterPopup.applyFilter();
            attributeHandler.run();
        
        }, 
        removeFilter = function () {
            WuxWorkerActions.RefreshAllFormeActions();
        },
        clearFilter = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let filterPopup = new FilterPopup();
            filterPopup.clearFilter();
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