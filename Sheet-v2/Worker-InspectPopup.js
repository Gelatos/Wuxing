// noinspection ES6ConvertVarToLetConst

class InspectionInventoryItem {
    constructor(displayString, databaseName, isTitle, affinity, tier, iconAffinities) {
        this.display = displayString;
        this.name = databaseName;
        this.isTitle = isTitle;
        this.affinity = affinity || "";
        this.tier = tier || 0;
        this.iconAffinities = iconAffinities || [];
    }
}
class InspectionInventoryItemHandler {
    constructor() {
        this.items = [];
    }
    addItem(inspectionInventoryItem) {
        this.items.push(inspectionInventoryItem);
    }
}
class FilteredTechniquesInventoryItemHandler extends InspectionInventoryItemHandler {
    constructor(filters, titleCallback, displayCallback) {
        super();

        let filteredTechniques = this.getFilteredTechniques(filters);
        if (filteredTechniques.length() == 0) {
            return;
        }

        let inventoryItemHandler = this;
        let maxTier = 9;
        for (let tier = 1; tier <= maxTier; tier++) {

            let tierData = filteredTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }

                // add the title
                if (titleCallback != undefined) {
                    let techHeader = titleCallback(tier, affinity);
                    if (techHeader != undefined) {
                        inventoryItemHandler.addItem(techHeader);
                    }
                }

                // add the techniques
                techsByAffinity.forEach(function (technique) {
                    let display = technique.name;
                    let iconAffinities = [];
                    if (displayCallback != undefined) {
                        let result = displayCallback(technique);
                        if (result !== null && typeof result === "object") {
                            display = result.display;
                            iconAffinities = result.iconAffinities || [];
                        } else {
                            display = result;
                        }
                    }
                    let inventoryItem = new InspectionInventoryItem(display, technique.name, false, undefined, undefined, iconAffinities);
                    inventoryItemHandler.addItem(inventoryItem);
                });
            });
        }
    }
    
    getFilteredTechniques(filters) {
        let filteredTechniques = WuxTechs.Filter(filters);
        return WuxTechs.SortFilteredTechniquesByRequirement(filteredTechniques);
    }
}

class FilteredStylesInventoryItemHandler extends FilteredTechniquesInventoryItemHandler {
    getFilteredTechniques(filters) {
        let allStyleNames = [...WuxTechs.GetSortedGroup("style", "Style"), "Style"];
        let filteredTechniques = WuxTechs.Filter([...filters, new DatabaseFilterData("style", allStyleNames)]);
        let newFilteredTechniquesList = [];
        let addedFilteredTechniqueNames = [];
        
        for (let technique of filteredTechniques) {
            if (technique == undefined || addedFilteredTechniqueNames.includes(technique.name)) {
                continue;
            }
            
            if (technique.techSet == "Style") {
                addedFilteredTechniqueNames.push(technique.name);
                newFilteredTechniquesList.push(technique);
                continue;
            }
            
            if (addedFilteredTechniqueNames.includes(technique.techSet)) {
                continue;
            }

            let baseTechnique = WuxTechs.Get(technique.techSet);
            if (baseTechnique != undefined && baseTechnique.techSet == "Style") {
                addedFilteredTechniqueNames.push(baseTechnique.name);
                newFilteredTechniquesList.push(baseTechnique);
            }
        }

        return WuxTechs.SortFilteredTechniquesByRequirement(newFilteredTechniquesList);
    }
}

const getTechHeader = function (affinity) {
    if (affinity === "") return "0";
    let parts = affinity.split(";").map(s => s.trim()).filter(s => s !== "");
    if (parts.length === 0) return "0";
    let list;
    if (parts.length === 1) {
        list = parts[0];
    } else if (parts.length === 2) {
        list = `${parts[0]} or ${parts[1]}`;
    } else {
        list = `${parts.slice(0, -1).join(", ")}, or ${parts[parts.length - 1]}`;
    }
    return `Requires ${list} affinity`;
};

class FilteredItemsInventoryItemHandler extends InspectionInventoryItemHandler {
    constructor(filters) {
        super();
        let filteredItems = WuxItems.Filter(filters);
        for (let item of filteredItems) {
            if (item == undefined) continue;
            this.addItem(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
    }
}

class InspectPopupAttributeHandler extends BasePopupAttributeHandler {
    constructor(attrHandler) {
        super(attrHandler);
        this.repeater = attrHandler.getRepeatingSection("ItemPopupValues");
        this.titleDefinitionName = "";
        this.itemDataAttributeHandler = new ItemDataAttributeHandler(this.attrHandler, "Popup");
        this.techniqueAttributeHandler = new TechniqueDataAttributeHandler(this.attrHandler, "Popup");
    }

    show(inventoryTitle, inventoryItems, addType) {
        super.show(this.titleDefinitionName);
        this.resetInspectionVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "on");
        
        this.setPopupType(this.titleDefinitionName);
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), inventoryTitle);
        this.initializePopup();
        this.iterateAndSetItems(inventoryItems);
        this.setAddType(addType);
    }
    hide() {
        super.hide();
        this.resetInspectionVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "0");
    }
    resetInspectionVariables() {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectId"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "0");
    };
    setPopupType(popupType) {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType"), popupType);
    }
    setAddType(addType) {
        if (addType == undefined) {
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "0");
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), "");
            return;
        }
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "on");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), addType);
    }

    initializePopup(attrHandler) {}

    hideTechnique(index) {
        this.techniqueAttributeHandler.setBaseSuffix(index);
        this.techniqueAttributeHandler.setVisibilityAttribute(false);
        this.attrHandler.addRepeatingSectionRowUpdate(
            this.techniqueAttributeHandler.repeater?.definitionId,
            this.techniqueAttributeHandler.getVariable("TechHeader"),
            "0"
        );
    }

    iterateAndSetItems(itemData) {
        if (itemData.length === 0) {
            this.repeater.ids.forEach(id => this.setInventoryItemVisibility(id, false));
            this.onNoItems();
            return;
        }
        let setSelectedItem = false;
        let iterator = 0;
        while (iterator < this.repeater.ids.length) {
            let id = this.repeater.ids[iterator];
            if (iterator < itemData.length) {
                let item = itemData[iterator];
                this.setInventoryItemData(id, item);
                if (!setSelectedItem && !item.isTitle) {
                    this.setSelectedItem(id, item.name);
                    setSelectedItem = true;
                }
            }
            else {
                this.setInventoryItemVisibility(id, false);
            }
            iterator++;
        }
        while (iterator < itemData.length) {
            let id = this.repeater.generateRowId();
            let item = itemData[iterator];
            this.setInventoryItemData(id, item);
            if (!setSelectedItem && !item.isTitle) {
                this.setSelectedItem(id, item.name);
                setSelectedItem = true;
            }
            iterator++;
        }
    }
    onNoItems() {
        let id = this.repeater.ids.length > 0 ? this.repeater.ids[0] : this.repeater.generateRowId();
        this.setInventoryItemData(id, new InspectionInventoryItem("No items available", "", true));
    }
    setInventoryItemVisibility(id, isVisible) {
        let itemSelectVisibleAttr = WuxDef.GetVariable("Popup_ItemSelectVisible");
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectVisibleAttr), isVisible ? "on" : "0");

    }
    setInventoryItemData(id, itemData) {
        let itemSelectTypeAttr = WuxDef.GetVariable("Popup_ItemSelectType");
        let itemSelectDisplayAttr = WuxDef.GetVariable("Popup_ItemSelectDisplay");
        let itemSelectNameAttr = WuxDef.GetVariable("Popup_ItemSelectName");
        let itemSelectOnAttr = WuxDef.GetVariable("Popup_ItemSelectIsOn");

        this.setInventoryItemVisibility(id, true);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectTypeAttr), itemData.isTitle ? "0" : "on");
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectDisplayAttr), itemData.display);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectNameAttr), itemData.name);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectOnAttr), "0");
        if (!itemData.isTitle) {
            this.setInventoryItemAffinityIcons(id, itemData.iconAffinities);
        }
    }
    setInventoryItemAffinityIcons(id, iconAffinities) {
        const branchToElement = {
            "Corrosion": "Wood",
            "Light":     "Fire",
            "Shadow":    "Earth",
            "Blood":     "Metal",
            "Time":      "Water"
        };
        const normalizedAffinities = iconAffinities.map(a => branchToElement[a] ?? a);
        const affinityFields = {
            "Neutral": WuxDef.GetVariable("Popup_ItemSelectDisplayNeutral"),
            "Wood":    WuxDef.GetVariable("Popup_ItemSelectDisplayWood"),
            "Fire":    WuxDef.GetVariable("Popup_ItemSelectDisplayFire"),
            "Earth":   WuxDef.GetVariable("Popup_ItemSelectDisplayEarth"),
            "Metal":   WuxDef.GetVariable("Popup_ItemSelectDisplayMetal"),
            "Water":   WuxDef.GetVariable("Popup_ItemSelectDisplayWater")
        };
        for (let affinity in affinityFields) {
            let value = normalizedAffinities.includes(affinity) ? "0" : "on";
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, affinityFields[affinity]), value);
        }
    }

    setSelectedItem(selectedItemId, itemName) {
        this.clearLastSelectedItem(selectedItemId);
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectId"), selectedItemId);
        this.attrHandler.addUpdate(this.repeater.getFieldName(selectedItemId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
        this.setSelectedItemData(itemName);
    }
    clearLastSelectedItem() {
        let currentId = this.attrHandler.parseString(WuxDef.GetVariable("Popup_InspectSelectId"));
        if (currentId != "") {
            this.attrHandler.addUpdate(this.repeater.getFieldName(currentId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "0");
        }
    }
    setSelectedItemData(selectedItemName) {}
}
class TechniqueInspectPopupAttributeHandler extends InspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_TechniqueInspectionName";
    }

    initializePopup() {
        super.initializePopup();
        this.itemDataAttributeHandler.clearItemInfo();
    }
    setSelectedItemData(selectedItemName) {
        let technique = WuxTechs.Get(selectedItemName);
        if (technique == undefined) {
            this.hideTechnique(0);
            return;
        }
        this.techniqueAttributeHandler.setBaseSuffix(0);
        this.techniqueAttributeHandler.setTechniqueInfo(technique);
        this.techniqueAttributeHandler.setVisibilityAttribute(true);
        this.attrHandler.addRepeatingSectionRowUpdate(
            this.techniqueAttributeHandler.repeater?.definitionId,
            this.techniqueAttributeHandler.getVariable("TechHeader"),
            getTechHeader(technique.affinity)
        );

        // get the variants
        let techniqueVariants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
        for (let i = 0; i < 3; i++) {
            let index = parseInt(i) + 1;
            if (techniqueVariants.length > i) {
                this.techniqueAttributeHandler.setBaseSuffix(index);
                this.techniqueAttributeHandler.setTechniqueInfo(techniqueVariants[i]);
                this.techniqueAttributeHandler.setVisibilityAttribute(true);
                this.attrHandler.addRepeatingSectionRowUpdate(
                    this.techniqueAttributeHandler.repeater?.definitionId,
                    this.techniqueAttributeHandler.getVariable("TechHeader"),
                    getTechHeader(techniqueVariants[i].affinity)
                );
            }
            else {
                this.hideTechnique(index);
            }
        }
    }

    onNoItems() {
        super.onNoItems();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }
}
class ItemInspectPopupAttributeHandler extends InspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_ItemInspectionName";
    }

    initializePopup() {
        super.initializePopup();
        this.itemDataAttributeHandler.clearItemInfo();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }

    setSelectedItemData(selectedItemName) {
        let item = WuxItems.Get(selectedItemName);
        if (item == undefined) {
            this.itemDataAttributeHandler.clearItemInfo();
            for (let i = 0; i <= 3; i++) {
                this.hideTechnique(i);
            }
            return;
        }

        // Show item stats and its embedded technique (written to the default/no-suffix slot)
        this.itemDataAttributeHandler.setItemInfo(item);

        // Show common Gear techniques in slots 1-3: each base technique followed by its
        // variants (using the technique name as the style filter), identical to the
        // technique inspection pattern.
        let commonTechniques = item.getCommonTechniques ? item.getCommonTechniques() : [];
        let allCommonTechniques = [];
        for (let technique of commonTechniques) {
            allCommonTechniques.push(technique);
            let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
            for (let variant of variants) {
                allCommonTechniques.push(variant);
            }
        }
        for (let i = 0; i < 3; i++) {
            let index = i + 1;
            if (i < allCommonTechniques.length) {
                let t = allCommonTechniques[i];
                this.techniqueAttributeHandler.setBaseSuffix(index);
                this.techniqueAttributeHandler.setTechniqueInfo(t);
                this.techniqueAttributeHandler.setVisibilityAttribute(true);
                this.attrHandler.addRepeatingSectionRowUpdate(
                    this.techniqueAttributeHandler.repeater?.definitionId,
                    this.techniqueAttributeHandler.getVariable("TechHeader"),
                    getTechHeader(t.affinity)
                );
            } else {
                this.hideTechnique(index);
            }
        }
    }

    onNoItems() {
        super.onNoItems();
        this.itemDataAttributeHandler.clearItemInfo();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }
}

class InspectionPopup {
    constructor(attributeHandler) {
        this.attributeHandler = attributeHandler;
        this.inspectPopupAttrHandler = undefined;
        this.inspectPopupInventoryId = "ItemPopupValues";
    }
    open(inventoryTitle, inventoryItems, addType) {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        this.attributeHandler.addMod([WuxDef.GetVariable("Popup_InspectSelectId")]);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            inspectPopup.inspectPopupAttrHandler.show(inventoryTitle, inventoryItems, addType);
        });
    }
    close() {
        let inspectPopup = this;
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            inspectPopup.inspectPopupAttrHandler.hide();
        });
    }
    selectItem(selectedId) {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        let repeater = this.attributeHandler.getRepeatingSection(this.inspectPopupInventoryId);
        let inventoryItemNameVar = repeater.getFieldName(selectedId, WuxDef.GetVariable("Popup_ItemSelectName"))
        this.attributeHandler.addMod([WuxDef.GetVariable("Popup_InspectSelectId"), inventoryItemNameVar]);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            inspectPopup.inspectPopupAttrHandler.setSelectedItem(selectedId, attrHandler.parseString(inventoryItemNameVar));
        });
    }

    setup(attrHandler) {
        this.inspectPopupAttrHandler = new InspectPopupAttributeHandler(attrHandler);
    }
    
    addItem() {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        
        let itemNameVar = WuxDef.GetVariable("Popup_ItemSelectName");
        let selectedIdVar = WuxDef.GetVariable("Popup_InspectSelectId");
        this.attributeHandler.getRepeatingSection(this.inspectPopupInventoryId).addFieldNames([itemNameVar]);
        this.attributeHandler.addMod(selectedIdVar);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            
            let repeater = inspectPopup.attributeHandler.getRepeatingSection(inspectPopup.inspectPopupInventoryId);
            let selectedItemId = attrHandler.parseString(selectedIdVar);
            let itemName = attrHandler.parseString(repeater.getFieldName(selectedItemId, itemNameVar));
            inspectPopup.performAddItem(attrHandler, itemName);
        });
    }
    
    performAddItem(attrHandler, itemName) {}
}
class PerkTechniqueInspectPopupAttributeHandler extends InspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_PerkInspectionName";
    }

    initializePopup() {
        super.initializePopup();
        this.itemDataAttributeHandler.clearItemInfo();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }

    setSelectedItemData(selectedItemName) {
        let technique = WuxTechs.Get(selectedItemName);
        if (technique == undefined) {
            this.hideTechnique(0);
            return;
        }
        this.techniqueAttributeHandler.setBaseSuffix(0);
        this.techniqueAttributeHandler.setTechniqueInfo(technique);
        this.techniqueAttributeHandler.setVisibilityAttribute(true);
        this.attrHandler.addRepeatingSectionRowUpdate(
            this.techniqueAttributeHandler.repeater?.definitionId,
            this.techniqueAttributeHandler.getVariable("TechHeader"),
            getTechHeader(technique.affinity)
        );

        let techniqueVariants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
        for (let i = 0; i < 3; i++) {
            let index = parseInt(i) + 1;
            if (techniqueVariants.length > i) {
                this.techniqueAttributeHandler.setBaseSuffix(index);
                this.techniqueAttributeHandler.setTechniqueInfo(techniqueVariants[i]);
                this.techniqueAttributeHandler.setVisibilityAttribute(true);
                this.attrHandler.addRepeatingSectionRowUpdate(
                    this.techniqueAttributeHandler.repeater?.definitionId,
                    this.techniqueAttributeHandler.getVariable("TechHeader"),
                    getTechHeader(techniqueVariants[i].affinity)
                );
            } else {
                this.hideTechnique(index);
            }
        }
    }

    onNoItems() {
        super.onNoItems();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }
}

class PerkTechniqueInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new PerkTechniqueInspectPopupAttributeHandler(attrHandler);
    }

    addItem() {
        let worker = new WuxPerkWorkerBuild();
        this.attributeHandler.addMod([worker.attrMax, worker.attrBuildDraft]);
        this.attributeHandler.addRepeatingSection("RepeatingPerks");
        super.addItem();
        WuxWorkerActions.UpdateAllActionsFromMenu(this.attributeHandler);
    }

    performAddItem(attrHandler, itemName) {
        Debug.Log(`Adding Perk Technique ${itemName}`);
        let technique = WuxTechs.Get(itemName);
        if (technique == undefined) return;
        let repeater = attrHandler.getRepeatingSection("RepeatingPerks");
        attrHandler.addUpdate(
            repeater.getFieldName(repeater.generateRowId(), WuxDef.GetVariable("Forme_Name")),
            technique.name);

        let perk = WuxPerks.Get(itemName);
        if (perk == undefined) return;
        let perkAttr = perk.createDefinition(WuxDef.Get("Perk")).getVariable();
        let worker = new WuxPerkWorkerBuild();
        worker.setBuildStatsDraft(attrHandler);
        worker.updateBuildStats(attrHandler, perkAttr, perk.cost);
        worker.updatePoints(attrHandler);
    }
}

class TechniqueInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new TechniqueInspectPopupAttributeHandler(attrHandler);
    }

    addItem() {
        let worker = new WuxStyleWorkerBuild();
        let styleRepeaterId = "RepeatingStyles";
        this.attributeHandler.addMod([worker.attrMax, worker.attrBuildDraft]);
        this.attributeHandler.addRepeatingSection(styleRepeaterId);
        super.addItem();
        WuxWorkerSkills.UpdateKeySkills(this.attributeHandler);
        WuxWorkerActions.UpdateAllActionsFromMenu(this.attributeHandler);
    }

    performAddItem(attrHandler, itemName) {
        Debug.Log(`Adding Style ${itemName}`);

        let baseTechnique = WuxTechs.Get(itemName);
        if (baseTechnique == undefined) {
            return;
        }
        
        let worker = new WuxStyleWorkerBuild();
        let styleRepeaterId = "RepeatingStyles";
        
        // only the base technique gets add to the styles list
        let repeater = attrHandler.getRepeatingSection(styleRepeaterId);
        attrHandler.addUpdate(
            repeater.getFieldName(repeater.generateRowId(), WuxDef.GetVariable("Forme_Name")), 
            baseTechnique.name);
        
        // add all the techniques to the style worker as this is how we track styles tracked and their level
        worker.setBuildStatsDraft(attrHandler);
        worker.updateBuildStats(attrHandler, baseTechnique.name, {value: 1, group: "Style"});
        
        let variantTechniques = WuxTechs.Filter(new DatabaseFilterData("style", itemName));
        variantTechniques.forEach(function (technique) {
            worker.updateBuildStats(attrHandler, technique.name, {value: 1, group: technique.techSet});
        });
        worker.updatePoints(attrHandler);
    }
}
class ItemInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new ItemInspectPopupAttributeHandler(attrHandler);
    }

    addItem (attrHandler) {
        Debug.Log(`Adding Inspect Element ${attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName"))}`);
        switch (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType"))) {
            case "Add Equipment":
                this.performAddSelectedInspectElementEquipment(attrHandler,
                    WuxItems.Get(attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName")))
                );
                break;
            case "Add Consumable":
                this.performAddSelectedInspectElementConsumable(attrHandler,
                    WuxItems.Get(attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName")))
                );
                break;
            case "Add Good":
                this.performAddSelectedInspectElementGoods(attrHandler,
                    WuxGoods.Get(attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName")))
                );
                break;
        }
    };

    performAddSelectedInspectElementEquipment(attrHandler, item) {
        Debug.Log(`Adding Equipment ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
        let newRowId = repeater.generateRowId();
        this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
    };
    performAddSelectedInspectElementConsumable(attrHandler, item) {
        Debug.Log(`Adding Consumable ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingConsumables");
        let newRowId = repeater.generateRowId();
        this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
        this.performAddSelectedInspectElementTechnique(attrHandler, repeater, newRowId, item.technique);

    };
    performAddSelectedInspectElementGoods(attrHandler, item) {
        Debug.Log(`Adding Goods ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingGoods");
        let newRowId = repeater.generateRowId();
        this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
    };
    getGearVariable(variable, suffix) {
        let baseDefinition = WuxDef.Get("Gear");
        return baseDefinition.getVariable(`-${WuxDef.GetVariable(variable, suffix)}`);
    };
    performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item) {
        let displayData = new ItemDisplayData(item);

        let equipMenuText = this.getEquipMenuText(item);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemEquipMenu")), equipMenuText);
        let purchaseMenuText = `${WuxDef.GetTitle("Gear_Purchase")} (${item.value})`;
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_Purchase", WuxDef._tab)), purchaseMenuText);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemName")), displayData.name);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemGroup")), displayData.group);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemStats")), displayData.stats);

        if (displayData.traits.length > 0) {
            let databaseAttributeHandler = new DatabaseItemAttributeHandler(attrHandler);
            databaseAttributeHandler.addDefinitions(displayData.traits, repeater.getFieldName(newRowId, this.getGearVariable("ItemTrait")), 3);
        }
        if (displayData.description != "") {
            attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemDescription")), displayData.description);
        }
    };
    performAddSelectedInspectElementTechnique(attrHandler, repeater, newRowId, technique) {
        let techniqueItemAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
        techniqueItemAttributeHandler.setRepeaterData(repeater);
        techniqueItemAttributeHandler.setId(newRowId);
        techniqueItemAttributeHandler.setTechniqueInfo(technique, true);
        techniqueItemAttributeHandler.setVisibilityAttribute(true);
    };
    getEquipMenuText(item) {
        switch (item.group) {
            case "Head Gear":
                return WuxDef.GetTitle("Gear_EquipHead");
            case "Face Gear":
                return WuxDef.GetTitle("Gear_EquipFace");
            case "Chest Gear":
                return WuxDef.GetTitle("Gear_EquipChest");
            case "Arm Gear":
                return WuxDef.GetTitle("Gear_EquipArm");
            case "Leg Gear":
                return WuxDef.GetTitle("Gear_EquipLeg");
            case "Foot Gear":
                return WuxDef.GetTitle("Gear_EquipFoot");
        }

        return WuxDef.GetTitle("Gear_Equip");
    };
}

var WuxWorkerInspectPopup = WuxWorkerInspectPopup || (function () {
    const getOpenInspectionPopup = function (callback) {
        let attributeHandler = new WorkerAttributeHandler();
        let selectTypeVariable = WuxDef.GetVariable("Popup_InspectSelectType");
        attributeHandler.addMod(selectTypeVariable);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let attributeHandler2 = new WorkerAttributeHandler();
            let inspectPopup;
            switch(attrHandler.parseString(selectTypeVariable)) {
                case "Popup_TechniqueInspectionName":
                    inspectPopup = new TechniqueInspectionPopup(attributeHandler2);
                    break;
                case "Popup_PerkInspectionName":
                    inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler2);
                    break;
                case "Popup_ItemInspectionName":
                    inspectPopup = new ItemInspectionPopup(attributeHandler2);
                    break;
            }
            if (inspectPopup != undefined) {
                callback(inspectPopup);
            }
        });
        attributeHandler.run();
    }
    'use strict';

    const openItemInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
            Debug.Log("Open Item Popup");
            let inspectPopup = new ItemInspectionPopup(attributeHandler);
            inspectPopup.open(inventoryTitle, inventoryItems, addType);
        },

        openTechniqueInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
            Debug.Log("Open Technique Popup");
            let inspectPopup = new TechniqueInspectionPopup(attributeHandler);
            inspectPopup.open(inventoryTitle, inventoryItems, addType);
        },

        openPerkTechniqueInspection = function (attributeHandler, inventoryTitle, inventoryItems) {
            Debug.Log("Open Perk Technique Popup");
            let inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler);
            inspectPopup.open(inventoryTitle, inventoryItems);
        },
        
        close = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let inspectPopup = new InspectionPopup(attributeHandler);
            inspectPopup.close();
            attributeHandler.run();
        },

        selectInspectionItemFromActiveGroup = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let selectTypeVariable = WuxDef.GetVariable("Popup_InspectSelectType");
            attributeHandler.addMod(selectTypeVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();

                let repeater = new WorkerRepeatingSectionHandler("ItemPopupValues");
                let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
                
                let inspectPopup;
                switch(attrHandler.parseString(selectTypeVariable)) {
                    case "Popup_TechniqueInspectionName":
                        inspectPopup = new TechniqueInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_PerkInspectionName":
                        inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_ItemInspectionName":
                        inspectPopup = new ItemInspectionPopup(attributeHandler2);
                        break;
                }
                if (inspectPopup != undefined) {
                    inspectPopup.selectItem(selectedId);
                }
                attributeHandler2.run();
            });
            attributeHandler.run();
        },

        addSelectedInspectElement = function () {
            getOpenInspectionPopup((inspectPopup) => {
                inspectPopup.addItem();
                inspectPopup.close();
                inspectPopup.attributeHandler.run();
            });
        };

    const performItemFilterInspection = function (filters, title, addType) {
        let inventoryItems = new FilteredItemsInventoryItemHandler(filters);
        let attributeHandler = new WorkerAttributeHandler();
        openItemInspection(attributeHandler, title, inventoryItems.items, addType);
        attributeHandler.run();
    };

    const openItemFilterInspection = function (filters, title, addType) {
        Debug.Log("Open Item Filter Inspection");
        performItemFilterInspection(filters, title, addType);
    };

    const performStyleFilterInspection = function (filters, title) {
        let inventoryItems = new FilteredStylesInventoryItemHandler(filters,
            function (tier, affinity) {
                let level = Format.GetLevelPrerequisites(tier);
                let itemTitle = level > 0 ? `Level ${level}` : "";
                if (affinity !== "") {
                    itemTitle = itemTitle !== "" ? `${affinity} - ${itemTitle}` : affinity;
                }
                if (itemTitle === "") {
                    itemTitle = "Level 1";
                }
                return new InspectionInventoryItem(itemTitle, "", true, affinity, tier);
            },
            function (technique) {
                let iconAffinities = technique.getAffinityParts();
                let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
                
                for (let i = 0; i < variants.length; i++) {
                    let variantTechnique = variants[i];
                    let variantParts = variantTechnique.getAffinityParts();
                    for (let j = 0; j < variantParts.length; j++) {
                        if (!iconAffinities.includes(variantParts[j])) {
                            iconAffinities.push(variantParts[j]);
                        }
                    }
                }
                return { display: technique.name, iconAffinities: iconAffinities };
            }
        );

        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addMod([
            WuxDef.GetVariable("Forme_ShowFromNonElement"),
            WuxDef.GetVariable("Forme_ShowLevelRestricted"),
            WuxDef.GetVariable("Affinity"),
            WuxDef.GetVariable("AdvancedAffinity"),
            WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("CR", WuxDef._max)
        ]);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let showFromNonElement = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement"));
            let showLevelRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowLevelRestricted"));
            let advancedAffinityRaw = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity"));
            let advancedAffinities = advancedAffinityRaw.split(";").map(s => s.trim()).filter(s => s !== "");
            let userAffinities = [
                attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                ...advancedAffinities,
                attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
            ];
            let userCr = attrHandler.parseInt(WuxDef.GetVariable("CR", WuxDef._max));

            let filteredItems = inventoryItems.items.filter(function (item) {
                if (item.isTitle) {
                    if (showFromNonElement === "0" && item.affinity !== "") {
                        if (item.affinity.includes(";")) {
                            let affinityParts = item.affinity.split(";").map(s => s.trim());
                            if (!affinityParts.some(part => userAffinities.includes(part))) return false;
                        } else if (!userAffinities.includes(item.affinity)) {
                            return false;
                        }
                    }
                    if (showLevelRestricted === "0" && item.tier > 0) {
                        if (item.tier > userCr) return false;
                    }
                    return true;
                }

                let technique = WuxTechs.Get(item.name);
                if (technique == undefined) {
                    return false;
                }

                if (showFromNonElement === "0") {
                    if (technique.affinity.includes(";")) {
                        let affinityParts = technique.affinity.split(";").map(s => s.trim());
                        if (!affinityParts.some(part => userAffinities.includes(part))) {
                            return false;
                        }
                    } else if (technique.affinity != "" && !userAffinities.includes(technique.affinity)) {
                        return false;
                    }
                }

                if (showLevelRestricted === "0") {
                    if (technique.tier > userCr) {
                        return false;
                    }
                }

                return true;
            });

            let attributeHandler2 = new WorkerAttributeHandler();
            openTechniqueInspection(attributeHandler2, title, filteredItems, "Add Style");
            attributeHandler2.run();
        });

        attributeHandler.run();
    };

    const openCustomStyleFilterInspection = function (filters, title) {
        Debug.Log("Open Custom Style Filter Inspection");
        performStyleFilterInspection(filters, title);
    };

    const openStyleFilterTechniqueInspection = function (eventinfo) {
        Debug.Log("Open Style Filter Technique Inspection");

        // Find the TechAutoFilter definition that matches the button that was pressed
        let allAutoFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechAutoFilter")]);
        let pressedDef = null;
        for (let i = 0; i < allAutoFilters.length; i++) {
            if (allAutoFilters[i].getVariable() === eventinfo.sourceAttribute) {
                pressedDef = allAutoFilters[i];
                break;
            }
        }
        if (pressedDef == null) {
            Debug.Log(`No TechAutoFilter definition found for attribute: ${eventinfo.sourceAttribute}`);
            return;
        }

        // Parse filter rules from the definition's description.
        // Format: "key:value1, value2; key2:value3" where:
        //   ","  separates multiple values for one rule (OR'd together)
        //   ";"  separates additional filter rules on the same line (AND'd together)
        //   "\n" (multiple description entries) also separates rules (AND'd together)
        // Keys map directly to ExtendedTechniqueDatabase sorting properties:
        //   "group", "keywords", "affinity", "style", "tier", "action", etc.
        let description = pressedDef.getDescription();
        if (description === "") {
            Debug.Log(`No filter rules defined for "${pressedDef.getTitle()}"`);
            return;
        }

        let filters = [];
        let rules = description.split("\n").flatMap(line => line.split(";"));
        for (let rule of rules) {
            rule = rule.trim();
            if (rule === "") continue;
            let colonIndex = rule.indexOf(":");
            if (colonIndex === -1) continue;
            let key = rule.substring(0, colonIndex).trim();
            let values = rule.substring(colonIndex + 1).split(",").map(v => v.trim()).filter(v => v !== "");
            if (values.length === 0) continue;
            filters.push(new DatabaseFilterData(key, values.length === 1 ? values[0] : values));
        }

        if (filters.length === 0) {
            Debug.Log(`No valid filter rules found for "${pressedDef.getTitle()}"`);
            return;
        }
        Debug.Log(`Filters: ${JSON.stringify(filters)}`);

        performStyleFilterInspection(filters, pressedDef.getTitle());
    };

    const performPerkFilterInspection = function (filters, title) {
        let matchingPerks = WuxPerks.Filter(filters);
        let techniques = [];
        let techniqueIconAffinities = {};
        for (let perk of matchingPerks) {
            Debug.Log(`Found Perk ${perk.name}`);
            let technique = WuxTechs.Get(perk.name);
            if (technique == undefined) continue;
            let iconAffinities = technique.getAffinityParts();
            let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
            for (let i = 0; i < variants.length; i++) {
                let variantParts = variants[i].getAffinityParts();
                for (let j = 0; j < variantParts.length; j++) {
                    if (!iconAffinities.includes(variantParts[j])) {
                        iconAffinities.push(variantParts[j]);
                    }
                }
            }
            techniqueIconAffinities[technique.name] = iconAffinities;
            techniques.push(technique);
        }

        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addMod([
            WuxDef.GetVariable("Forme_ShowFromNonElement"),
            WuxDef.GetVariable("Forme_ShowLevelRestricted"),
            WuxDef.GetVariable("Affinity"),
            WuxDef.GetVariable("AdvancedAffinity"),
            WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("CR", WuxDef._max)
        ]);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let showFromNonElement = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement"));
            let showLevelRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowLevelRestricted"));
            let advancedAffinityRaw = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity"));
            let advancedAffinities = advancedAffinityRaw.split(";").map(s => s.trim()).filter(s => s !== "");
            let userAffinities = [
                attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                ...advancedAffinities,
                attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
            ];
            let userCr = attrHandler.parseInt(WuxDef.GetVariable("CR", WuxDef._max));

            let filteredTechniques = techniques.filter(function (technique) {
                if (showFromNonElement === "0") {
                    if (technique.affinity.includes(";")) {
                        let affinityParts = technique.affinity.split(";").map(s => s.trim());
                        if (!affinityParts.some(part => userAffinities.includes(part))) return false;
                    } else if (technique.affinity !== "" && !userAffinities.includes(technique.affinity)) {
                        return false;
                    }
                }
                if (showLevelRestricted === "0") {
                    if (technique.tier > userCr) return false;
                }
                return true;
            });

            let sortedTechniques = WuxTechs.SortFilteredTechniquesByRequirement(filteredTechniques);
            let sortedItems = [];
            for (let tier = 1; tier <= 9; tier++) {
                let tierData = sortedTechniques.get(tier);
                tierData.iterate(function (techsByAffinity, affinity) {
                    if (techsByAffinity.length == 0) return;
                    let level = Format.GetLevelPrerequisites(tier);
                    let itemTitle = level > 0 ? `Level ${level}` : "";
                    if (affinity !== "") {
                        itemTitle = itemTitle !== "" ? `${affinity} - ${itemTitle}` : affinity;
                    }
                    if (itemTitle === "") itemTitle = "Level 1";
                    sortedItems.push(new InspectionInventoryItem(itemTitle, "", true, affinity, tier));
                    techsByAffinity.forEach(function (technique) {
                        let iconAffinities = techniqueIconAffinities[technique.name] || [];
                        sortedItems.push(new InspectionInventoryItem(technique.name, technique.name, false, technique.affinity, technique.tier, iconAffinities));
                    });
                });
            }

            let attributeHandler2 = new WorkerAttributeHandler();
            let inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler2);
            inspectPopup.open(title, sortedItems, "Add Perk Technique");
            attributeHandler2.run();
        });

        attributeHandler.run();
    };

    const openPerkFilterTechniqueInspection = function (eventinfo) {
        Debug.Log("Open Perk Filter Technique Inspection");

        let allPerkFilters = WuxDef.Filter([new DatabaseFilterData("group", "PerkAutoFilter")]);
        let pressedDef = null;
        for (let i = 0; i < allPerkFilters.length; i++) {
            if (allPerkFilters[i].getVariable() === eventinfo.sourceAttribute) {
                pressedDef = allPerkFilters[i];
                break;
            }
        }
        if (pressedDef == null) {
            Debug.Log(`No PerkAutoFilter definition found for attribute: ${eventinfo.sourceAttribute}`);
            return;
        }

        let description = pressedDef.getDescription();
        if (description === "") {
            Debug.Log(`No filter rules defined for "${pressedDef.getTitle()}"`);
            return;
        }

        let filters = [];
        let rules = description.split("\n").flatMap(line => line.split(";"));
        for (let rule of rules) {
            rule = rule.trim();
            if (rule === "") continue;
            let colonIndex = rule.indexOf(":");
            if (colonIndex === -1) continue;
            let key = rule.substring(0, colonIndex).trim();
            let values = rule.substring(colonIndex + 1).split(",").map(v => v.trim()).filter(v => v !== "");
            if (values.length === 0) continue;
            filters.push(new DatabaseFilterData(key, values.length === 1 ? values[0] : values));
        }

        if (filters.length === 0) {
            Debug.Log(`No valid filter rules found for "${pressedDef.getTitle()}"`);
            return;
        }

        performPerkFilterInspection(filters, pressedDef.getTitle());
    };

    return {
        OpenItemInspection: openItemInspection,
        OpenItemFilterInspection: openItemFilterInspection,
        OpenTechniqueInspection: openTechniqueInspection,
        OpenPerkTechniqueInspection: openPerkTechniqueInspection,
        OpenStyleFilterTechniqueInspection: openStyleFilterTechniqueInspection,
        OpenPerkFilterTechniqueInspection: openPerkFilterTechniqueInspection,
        OpenCustomStyleFilterInspection: openCustomStyleFilterInspection,
        SelectInspectionItemFromActiveGroup: selectInspectionItemFromActiveGroup,
        Close: close,
        AddSelectedInspectElement: addSelectedInspectElement
    };
}());

