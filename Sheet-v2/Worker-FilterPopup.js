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

    open(popupTitleDefinitionName, popupType) {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
            filterPopupAttrHandler.show(popupTitleDefinitionName);
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupType"), popupType);
        });
    }

    close() {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
            filterPopupAttrHandler.hide();
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

class TechniqueFilterPopup extends FilterPopup {
    open() {
        super.open("Popup_FilterTechniquePopupName", "Forme");
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
            });
            this.attributeHandler.run();
        });
    }
}

class StyleFilterPopup extends FilterPopup {
    open() {
        super.open("Popup_CustomStylesFilterName", "CustomStyle");
    }

    applyFilter() {
        let filterPopup = this;
        this.attributeHandler.addMod(this.filterDefinitions.getAllVariables());

        let capturedFilters = [];

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions);
            let techniqueFilters = filterPopupAttrHandler.getTechniqueFilters();
            capturedFilters = Array.isArray(techniqueFilters) ? techniqueFilters : [];
            filterPopupAttrHandler.hide();
        });

        this.attributeHandler.addFinishCallback(function () {
            WuxWorkerInspectPopup.OpenCustomStyleFilterInspection(capturedFilters, WuxDef.GetTitle("Popup_CustomStylesFilterName"));
        });

        this.attributeHandler.run();
    }
}

var WuxWorkerFilterPopup = WuxWorkerFilterPopup || (function () {
    'use strict';

    const openFormeTechnique = function () {
            Debug.Log("Open Technique Filter Popup");
            let attributeHandler = new WorkerAttributeHandler();
            new TechniqueFilterPopup(attributeHandler).open();
            attributeHandler.run();
        },
        openCustomStyleFilter = function () {
            Debug.Log("Open Custom Style Filter Popup");
            let attributeHandler = new WorkerAttributeHandler();
            new StyleFilterPopup(attributeHandler).open();
            attributeHandler.run();
        },
        close = function () {
            let attributeHandler = new WorkerAttributeHandler();
            new FilterPopup(attributeHandler).close();
            attributeHandler.run();
        },
        applyFilter = function () {
            Debug.Log("Applying Filters");
            let popupTypeVar = WuxDef.GetVariable("Popup_FilterPopupType");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(popupTypeVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let popupType = attrHandler.parseString(popupTypeVar);
                let attributeHandler2 = new WorkerAttributeHandler();
                if (popupType === "Forme") {
                    new TechniqueFilterPopup(attributeHandler2).applyFilter();
                } else if (popupType === "CustomStyle") {
                    new StyleFilterPopup(attributeHandler2).applyFilter();
                }
            });

            attributeHandler.run();
        },
        removeFilter = function () {
            WuxWorkerActions.RefreshAllFormeActions();
        },
        clearFilter = function () {
            let attributeHandler = new WorkerAttributeHandler();
            new FilterPopup(attributeHandler).clearFilter();
            attributeHandler.run();
        };

    return {
        OpenFormeTechnique : openFormeTechnique,
        OpenCustomStyleFilter: openCustomStyleFilter,
        Close: close,
        ApplyFilter: applyFilter,
        RemoveFilter: removeFilter,
        ClearFilter: clearFilter
    };
}());