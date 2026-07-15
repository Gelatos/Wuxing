// noinspection ES6ConvertVarToLetConst

class FilterPopupAttributeHandler extends BasePopupAttributeHandler {
    constructor(attrHandler, filterDefinitions, equipmentFilterDefinitions) {
        super(attrHandler);
        this.baseDefinition = WuxDef.Get("TechFilterPopup");
        this.filterDefinitions = filterDefinitions;
        this.equipmentFilterDefinitions = equipmentFilterDefinitions;
        this.sectionDefinition = WuxDef.Get("Action_FormeTechniques");
    }

    show(popupTitleDefinitionName) {
        super.show(popupTitleDefinitionName);
        this.resetFilterVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupActive"), "on");
    }

    hide() {
        super.hide();
        this.resetFilterVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupActive"), "0");
    }
    resetFilterVariables() {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupType"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupDisplayType"), "");
        let variables = this.filterDefinitions.getAllVariables();
        variables.forEach((variable) => {
            this.attrHandler.addUpdate(variable, 0);
        });
        if (this.equipmentFilterDefinitions) {
            this.equipmentFilterDefinitions.getAllVariables().forEach((variable) => {
                this.attrHandler.addUpdate(variable, 0);
            });
        }
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
                        // Technique fields store these tags inconsistently: some (e.g. group, itemTraits)
                        // use the full definition name ("Trait_Accurate"), others (e.g. skill, coreDefense,
                        // impacts, forms) use the bare title ("Accurate"). Include every representation so
                        // the OR-matching in Database.getSortedData() catches whichever format was used.
                        if (definition.abbreviation != "") {
                            activeValues.push(definition.abbreviation);
                        }
                        activeValues.push(definition.name);
                        if (definition.title != "" && definition.title != definition.name) {
                            activeValues.push(definition.title);
                        }
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
    getItemFilters() {
        if (!this.equipmentFilterDefinitions) { return 0; }
        let itemFilters = [];
        let keys = this.equipmentFilterDefinitions.getKeys();
        for (let key of keys) {
            let definitions = this.equipmentFilterDefinitions.getDefinitions(key);
            if (definitions.length > 0) {
                let baseDefinition = WuxDef.Get(key);
                let filterField = baseDefinition.getDescription("");
                let activeValues = [];
                definitions.forEach((definition) => {
                    if (this.attrHandler.parseString(this.equipmentFilterDefinitions.getCompoundVariable(definition)) == "on") {
                        let value;
                        if (definition.group === "Trait") {
                            value = definition.name.replace("Trait_", "");
                        } else {
                            value = definition.abbreviation != "" ? definition.abbreviation : definition.title;
                        }
                        activeValues.push(value);
                    }
                });
                if (activeValues.length > 0) {
                    itemFilters.push(new DatabaseFilterData(filterField, activeValues));
                }
            }
        }
        if (itemFilters.length == 0) {
            return 0;
        }
        return itemFilters;
    }
}

class FilterPopup {
    constructor(attributeHandler) {
        this.attributeHandler = attributeHandler;
        this.filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");
        this.equipmentFilterDefinitions = new EquipmentFilterDefinitions("Popup_FindItemsByFilter");
    }

    open(popupTitleDefinitionName, popupType, displayType) {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
            filterPopupAttrHandler.show(popupTitleDefinitionName);
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupType"), popupType);
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupDisplayType"), displayType);
        });
    }

    close() {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
            filterPopupAttrHandler.hide();
        });
    }

    clearFilter() {
        let filterPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
            filterPopupAttrHandler.resetFilterVariables();
        });
    }
}

class TechniqueFilterPopup extends FilterPopup {
    open() {
        super.open("Popup_FilterTechniquePopupName", "Forme", "Technique");
    }

    applyFilter() {
        let loader = new LoadingScreenHandler();
        loader.showLoadingScreen(() => {
            let filterPopup = this;
            this.attributeHandler.addMod(this.filterDefinitions.getAllVariables());
            // A custom filter from the popup replaces whatever the quick filter checkboxes
            // had set, so uncheck them - otherwise they'd still show as active while no
            // longer reflecting what's actually being filtered.
            WuxWorkerActions.ClearBaseFilterCheckboxes(this.attributeHandler);

            this.attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
                filterPopupAttrHandler.setFilterActive();
                filterPopupAttrHandler.hide();
            });
            this.attributeHandler.addFinishCallback(function (attrHandler) {
                let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
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
        super.open("Popup_CustomStylesFilterName", "CustomStyle", "Technique");
    }

    applyFilter() {
        let filterPopup = this;
        this.attributeHandler.addMod(this.filterDefinitions.getAllVariables());

        let capturedFilters = [];

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
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

class ItemTechFilterPopup extends FilterPopup {
    open() {
        super.open("Popup_CustomItemTechFilter", "ItemTechFilter", "Technique");
    }

    applyFilter() {
        let filterPopup = this;
        this.attributeHandler.addMod(this.filterDefinitions.getAllVariables());

        let capturedItems = [];

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
            let techniqueFilters = filterPopupAttrHandler.getTechniqueFilters();
            filterPopupAttrHandler.hide();

            let techFilters = Array.isArray(techniqueFilters) ? [...techniqueFilters] : [];
            techFilters.push(new DatabaseFilterData("style", "Gear"));

            let matchingTechniques = WuxTechs.Filter(techFilters);

            let itemNameSet = new Set();
            for (let technique of matchingTechniques) {
                let commonTechItems = WuxItems.GetSortedGroup("commonTechniques", technique.name);
                for (let itemName of commonTechItems) {
                    itemNameSet.add(itemName);
                }
                if (WuxItems.Has(technique.name)) {
                    itemNameSet.add(technique.name);
                }
            }

            capturedItems = Array.from(itemNameSet).map(name => WuxItems.Get(name)).filter(item => item != undefined);
        });

        this.attributeHandler.addFinishCallback(function () {
            WuxWorkerInspectPopup.OpenItemListInspection(capturedItems, WuxDef.GetTitle("Popup_CustomItemTechFilter"), ["Add Equipment", "Purchase Equipment"]);
        });

        this.attributeHandler.run();
    }
}

class ItemFilterPopup extends FilterPopup {
    open() {
        super.open("Popup_CustomItemsFilter", "ItemFilter", "Item");
    }

    applyFilter() {
        let filterPopup = this;
        this.attributeHandler.addMod(this.equipmentFilterDefinitions.getAllVariables());

        let capturedFilters = [];

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let filterPopupAttrHandler = new FilterPopupAttributeHandler(attrHandler, filterPopup.filterDefinitions, filterPopup.equipmentFilterDefinitions);
            let itemFilters = filterPopupAttrHandler.getItemFilters();
            capturedFilters = Array.isArray(itemFilters) ? itemFilters : [];
            filterPopupAttrHandler.hide();
        });

        this.attributeHandler.addFinishCallback(function () {
            WuxWorkerInspectPopup.OpenItemFilterInspection(capturedFilters, WuxDef.GetTitle("Popup_CustomItemsFilter"), ["Add Equipment", "Purchase Equipment"]);
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
        openItemFilter = function () {
            Debug.Log("Open Item Filter Popup");
            let attributeHandler = new WorkerAttributeHandler();
            new ItemFilterPopup(attributeHandler).open();
            attributeHandler.run();
        },
        openItemTechFilter = function () {
            Debug.Log("Open Item Technique Filter Popup");
            let attributeHandler = new WorkerAttributeHandler();
            new ItemTechFilterPopup(attributeHandler).open();
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
                } else if (popupType === "ItemFilter") {
                    new ItemFilterPopup(attributeHandler2).applyFilter();
                } else if (popupType === "ItemTechFilter") {
                    new ItemTechFilterPopup(attributeHandler2).applyFilter();
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
        OpenItemFilter: openItemFilter,
        OpenItemTechFilter: openItemTechFilter,
        Close: close,
        ApplyFilter: applyFilter,
        RemoveFilter: removeFilter,
        ClearFilter: clearFilter
    };
}());