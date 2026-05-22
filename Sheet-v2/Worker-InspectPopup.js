// noinspection ES6ConvertVarToLetConst

class InspectionInventoryItem {
    constructor(displayString, databaseName, isTitle) {
        this.display = displayString;
        this.name = databaseName;
        this.isTitle = isTitle;
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
    constructor(filters, titleCallback) {
        super();

        let filteredTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(filters);
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
                    let inventoryItem = new InspectionInventoryItem(technique.name, technique.name, false);
                    inventoryItemHandler.addItem(inventoryItem);
                });
            });
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
    };
    setPopupType(popupType) {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType"), popupType);
    }
    setAddType(addType) {
        if (addType == undefined) {
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), "");
            return;
        }
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), addType);
    }

    initializePopup(attrHandler) {}

    iterateAndSetItems(itemData) {
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
    setInventoryItemVisibility(id, isVisible) {
        let itemSelectVisibleAttr = WuxDef.GetVariable("Popup_ItemSelectVisible");
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectVisibleAttr), isVisible ? "on" : "0");

    }
    setInventoryItemData(id, itemData) {
        let itemSelectTypeAttr = WuxDef.GetVariable("Popup_ItemSelectType");
        let itemSelectDisplayAttr = WuxDef.GetVariable("Popup_ItemSelectDisplay");
        let itemSelectNameAttr = WuxDef.GetVariable("Popup_ItemSelectName");

        this.setInventoryItemVisibility(id, true);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectTypeAttr), itemData.isTitle ? "0" : "on");
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectDisplayAttr), itemData.display);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectNameAttr), itemData.name);
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
        
        // get the variants
        let techniqueVariants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
        for (let i = 1; i <= 3; i++) {
            if (techniqueVariants.length >= i) {
                this.techniqueAttributeHandler.setBaseSuffix(i);
                this.techniqueAttributeHandler.setTechniqueInfo(techniqueVariants[i]);
                this.techniqueAttributeHandler.setVisibilityAttribute(true);
            }
            else {
                this.hideTechnique(i);
            }
        }
    }
    
    hideTechnique(index) {
        this.techniqueAttributeHandler.setBaseSuffix(index);
        this.techniqueAttributeHandler.setVisibilityAttribute(false);
    }
}
class ItemInspectPopupAttributeHandler extends InspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_ItemInspectionName";
    }

    setSelectedItemData(selectedItemName) {
        let item = WuxItems.Get(selectedItemName);
        if (item == undefined) {
            this.itemDataAttributeHandler.clearItemInfo(this.attrHandler);
        }
        this.itemDataAttributeHandler.setItemInfo(item);
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
}
class TechniqueInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new TechniqueInspectPopupAttributeHandler(attrHandler);
    }
}
class ItemInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new ItemInspectPopupAttributeHandler(attrHandler);
    }
}

var WuxWorkerInspectPopup = WuxWorkerInspectPopup || (function () {
    const performAddSelectedInspectElement = function (attrHandler) {
        Debug.Log(`Adding Inspect Element ${attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName"))}`);
        switch (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType"))) {
            case "Add Equipment":
                performAddSelectedInspectElementEquipment(attrHandler,
                    WuxItems.Get(attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName")))
                );
                break;
            case "Add Consumable":
                performAddSelectedInspectElementConsumable(attrHandler,
                    WuxItems.Get(attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName")))
                );
                break;
            case "Add Good":
                performAddSelectedInspectElementGoods(attrHandler,
                    WuxGoods.Get(attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName")))
                );
                break;
        }
    };

    const getGearVariable = function (variable, suffix) {
        let baseDefinition = WuxDef.Get("Gear");
        return baseDefinition.getVariable(`-${WuxDef.GetVariable(variable, suffix)}`);
    };

    const performAddSelectedInspectElementEquipment = function (attrHandler, item) {
        Debug.Log(`Adding Equipment ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
        let newRowId = repeater.generateRowId();
        performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
    };
    const performAddSelectedInspectElementConsumable = function (attrHandler, item) {
        Debug.Log(`Adding Consumable ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingConsumables");
        let newRowId = repeater.generateRowId();
        performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
        performAddSelectedInspectElementTechnique(attrHandler, repeater, newRowId, item.technique);
        
    };
    const performAddSelectedInspectElementGoods = function (attrHandler, item) {
        Debug.Log(`Adding Goods ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingGoods");
        let newRowId = repeater.generateRowId();
        performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
    };
    const performAddSelectedInspectElementItem = function (attrHandler, repeater, newRowId, item) {
        let displayData = new ItemDisplayData(item);

        let equipMenuText = getEquipMenuText(item);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemEquipMenu")), equipMenuText);
        let purchaseMenuText = `${WuxDef.GetTitle("Gear_Purchase")} (${item.value})`;
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_Purchase", WuxDef._tab)), purchaseMenuText);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, getGearVariable("ItemName")), displayData.name);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, getGearVariable("ItemGroup")), displayData.group);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, getGearVariable("ItemStats")), displayData.stats);

        if (displayData.traits.length > 0) {
            let databaseAttributeHandler = new DatabaseItemAttributeHandler(attrHandler);
            databaseAttributeHandler.addDefinitions(displayData.traits, repeater.getFieldName(newRowId, getGearVariable("ItemTrait")), 3);
        }
        if (displayData.description != "") {
            attrHandler.addUpdate(repeater.getFieldName(newRowId, getGearVariable("ItemDescription")), displayData.description);
        }
    };
    const performAddSelectedInspectElementTechnique = function (attrHandler, repeater, newRowId, technique) {
        let techniqueItemAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
        techniqueItemAttributeHandler.setRepeaterData(repeater);
        techniqueItemAttributeHandler.setId(newRowId);
        techniqueItemAttributeHandler.setTechniqueInfo(technique, true);
        techniqueItemAttributeHandler.setVisibilityAttribute(true);
    };
    const getEquipMenuText = function (item) {
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
            let attributeHandler = new WorkerAttributeHandler();

            attributeHandler.addMod([WuxDef.GetVariable("Popup_InspectAddType"), 
                WuxDef.GetUntypedVariable("Popup", "ItemName"),
                WuxDef.GetVariable("FullName")]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let inspectPopup = new InspectPopupAttributeHandler(attrHandler);
                inspectPopup.hide();
                performAddSelectedInspectElement(attrHandler);
            });
            attributeHandler.run();
        };

    return {
        OpenItemInspection: openItemInspection,
        OpenTechniqueInspection: openTechniqueInspection,
        SelectInspectionItemFromActiveGroup: selectInspectionItemFromActiveGroup,
        Close: close,
        AddSelectedInspectElement: addSelectedInspectElement
    };
}());

