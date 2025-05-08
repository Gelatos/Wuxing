// noinspection ES6ConvertVarToLetConst

var WuxWorkerInspectPopup = WuxWorkerInspectPopup || (function () {
    const showPopup = function (updateCallback, getAttrCallback) {
        let attributeHandler = new WorkerAttributeHandler();

        getInspectionVariables(attributeHandler);
        updateCallback(attributeHandler);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            clearInspectionVariables(attrHandler);
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_PopupActive"), "on");
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "on");
        });
        attributeHandler.addGetAttrCallback(getAttrCallback);
        attributeHandler.run();
    };
    const closePopup = function () {
        let attributeHandler = new WorkerAttributeHandler();

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            clearInspectionVariables(attrHandler);
        });
        attributeHandler.run();
    };
    const getInspectionVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("Popup_InspectSelectType"), WuxDef.GetVariable("Popup_InspectSelectId")]);
    };
    const clearInspectionVariables = function (attrHandler) {
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType"), "");
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectId"), "");
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_PopupActive"), "0");
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "0");
    };
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
    const performAddSelectedInspectElement = function (attrHandler) {
        Debug.Log(`Adding Inspect Element ${attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName"))}`);
        switch (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType"))) {
            case "Add Equipment":
                performAddSelectedInspectElementEquipment(attrHandler,
                    WuxItems.Get(attrHandler.parseString(WuxDef.GetUntypedVariable("Popup", "ItemName")))
                );
                break;
        }
    };
    const performAddSelectedInspectElementEquipment = function (attrHandler, item) {
        Debug.Log(`Adding Equipment ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
        let newRowId = repeater.generateRowId();
        let displayData = new ItemDisplayData(item);

        let equipMenuText = getEquipMenuText(item);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemEquipMenu")), equipMenuText);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemName")), displayData.name);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemGroup")), displayData.group);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemStats")), displayData.stats);

        if (displayData.traits.length > 0) {
            let databaseAttributeHandler = new DatabaseItemAttributeHandler(attrHandler);
            databaseAttributeHandler.addDefinitions(displayData.traits, repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemTrait")), 3);
        }
        if (displayData.description != "") {
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_ItemDescription")), displayData.description);
        }
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

    const openItemInspection = function (updateCallback, setSelectedItemCallback) {
            Debug.Log("Open Item Popup");
            let repeaterName = "ItemPopupValues";

            let itemPopupValuesRepeatingSection = new WorkerRepeatingSectionHandler(repeaterName);
            itemPopupValuesRepeatingSection.getIds(function (itemPopupRepeater) {
                showPopup(updateCallback, function (attrHandler) {
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupName"), WuxDef.GetTitle("Popup_ItemInspectionName"));
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "0");
                    itemPopupRepeater.removeAllIds();

                    let selectedItem = setSelectedItemCallback(attrHandler, itemPopupRepeater);
                    if (selectedItem == null) {
                        Debug.LogError(`No items found`);
                        closePopup();
                    } else {
                        setInspectionSelection(attrHandler, repeaterName, selectedItem.id);
                        let itemAttributeHandler = new ItemDataAttributeHandler(attrHandler, "Popup");
                        itemAttributeHandler.setItemInfo(selectedItem.item);
                    }
                });
            });
        },

        openTechniqueInspection = function (updateCallback, setSelectedItemCallback) {
            Debug.Log("Open Technique Popup");
            let repeaterName = "ItemPopupValues";

            let techniquePopupValuesRepeatingSection = new WorkerRepeatingSectionHandler(repeaterName);
            techniquePopupValuesRepeatingSection.getIds(function (techniquePopupRepeater) {
                showPopup(updateCallback, function (attrHandler) {
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupName"), WuxDef.GetTitle("Popup_TechniqueInspectionName"));
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "0");
                    techniquePopupRepeater.removeAllIds();

                    let selectedItem = setSelectedItemCallback(attrHandler, techniquePopupRepeater);
                    if (selectedItem == null) {
                        Debug.LogError(`No items found`);
                        closePopup();
                    } else {
                        setInspectionSelection(attrHandler, repeaterName, selectedItem.id);
                        let itemAttributeHandler = new ItemDataAttributeHandler(attrHandler, "Popup");
                        itemAttributeHandler.clearItemInfo(attrHandler);
                        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Popup");
                        techniqueAttributeHandler.setTechniqueInfo(selectedItem.item);
                    }
                });
            });
        },

        selectInspectionItemFromActiveGroup = function (eventinfo) {
            Debug.Log("Selected Inspection Item");
            let repeaterName = "ItemPopupValues";

            let attributeHandler = new WorkerAttributeHandler();
            let itemPopupValuesRepeatingSection = new WorkerRepeatingSectionHandler(repeaterName);
            let selectedId = itemPopupValuesRepeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

            itemPopupValuesRepeatingSection.getIds(function (itemPopupRepeater) {

                let selectedItemNameFieldName = "";
                let selectedItemTypeFieldName = "";

                itemPopupRepeater.iterate(function (id) {
                    if (selectedId == id) {
                        selectedItemNameFieldName = itemPopupRepeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectName"));
                        selectedItemTypeFieldName = itemPopupRepeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectType"));
                    }
                });
                if (selectedItemNameFieldName != "") {
                    attributeHandler.addMod(selectedItemNameFieldName);
                    attributeHandler.addMod(selectedItemTypeFieldName);

                    getInspectionVariables(attributeHandler);
                    attributeHandler.addGetAttrCallback(function (attrHandler) {
                        let itemName = attrHandler.parseString(selectedItemNameFieldName);
                        let itemType = attrHandler.parseString(selectedItemTypeFieldName);

                        Debug.Log(`Got item ${itemName} with type ${itemType}`);
                        if (itemType == "Item") {
                            let item = WuxItems.Get(itemName);
                            let itemAttributeHandler = new ItemDataAttributeHandler(attrHandler, "Popup");
                            itemAttributeHandler.setItemInfo(item);
                        } else if (itemType == "Goods") {
                            let goods = WuxGoods.Get(itemName);
                            let itemAttributeHandler = new ItemDataAttributeHandler(attrHandler, "Popup");
                            itemAttributeHandler.setGoodsInfo(goods);
                        } else if (itemType == "Tech") {
                            let technique = WuxTechs.Get(itemName);
                            let itemAttributeHandler = new ItemDataAttributeHandler(attrHandler, "Popup");
                            itemAttributeHandler.clearItemInfo();
                            let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Popup");
                            techniqueAttributeHandler.setTechniqueInfo(technique);
                        }
                        setInspectionSelection(attrHandler, repeaterName, selectedId);
                    });

                } else {
                    Debug.LogError(`No item found for ${eventinfo.sourceAttribute}`);
                    attributeHandler.addGetAttrCallback(function (attrHandler) {
                        attrHandler.addUpdate(itemPopupRepeater.getFieldName(selectedId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                    });
                }
                attributeHandler.run();
            });
        },

        addSelectedInspectElement = function () {
            let attributeHandler = new WorkerAttributeHandler();

            attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
            attributeHandler.addMod(WuxDef.GetUntypedVariable("Popup", "ItemName"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                clearInspectionVariables(attrHandler);
                performAddSelectedInspectElement(attrHandler);
            });
            attributeHandler.run();
        };

    return {
        OpenItemInspection: openItemInspection,
        OpenTechniqueInspection: openTechniqueInspection,
        SelectInspectionItemFromActiveGroup: selectInspectionItemFromActiveGroup,
        ClosePopup: closePopup,
        AddSelectedInspectElement: addSelectedInspectElement
    };
}());

