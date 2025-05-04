var WuxWorkerGear = WuxWorkerGear || (function () {
    let populateInspectionElements = function (attrHandler, popupRepeater, sectionRepeater, selectedId) {
        
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `All Owned Equipment`);
        
        let selectedElement = null;
        sectionRepeater.iterate(function (id) {
            let itemName = attrHandler.parseString(sectionRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName")));
            let item = WuxItems.Get(itemName);
            if (item.group != "") {
                let newRowId = popupRepeater.generateRowId();
                attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), item.name);
                attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Item");

                if (id == selectedId) {
                    selectedElement = {
                        item: item,
                        id: newRowId
                    }
                    attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
                } else {
                    attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                }
            }
        });

        return selectedElement;
    };
    let populateItemInspectionEquipment = function (attrHandler, itemPopupRepeater, eventinfo) {
        let itemGroup = getItemGroupType(eventinfo);
        if (itemGroup == "") {
            return null;
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${itemGroup.group} Items`);

        let firstItem = null;
        let itemFilter;
        if (itemGroup.type == "Item") {
            itemFilter = WuxItems.Filter([new DatabaseFilterData("group", itemGroup.group)]);
        } else if (itemGroup.type == "Goods") {
            itemFilter = WuxGoods.Filter([new DatabaseFilterData("group", itemGroup.group)]);
        }

        itemFilter.forEach(function (item) {
            let newRowId = itemPopupRepeater.generateRowId();
            attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), item.name);
            attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), itemGroup.type);

            if (firstItem == null) {
                firstItem = {
                    item: item,
                    id: newRowId
                }
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
            } else {
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
            }
        });

        return firstItem;
    };
    let getItemGroupType = function (eventinfo) {
        switch (eventinfo.sourceAttribute) {
            case WuxDef.GetVariable("Page_AddHeadGear"):
                return {
                    group: "Head Gear",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddFaceGear"):
                return {
                    group: "Face Gear",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddChestGear"):
                return {
                    group: "Chest Gear",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddArmGear"):
                return {
                    group: "Arm Gear",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddLegGear"):
                return {
                    group: "Leg Gear",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddFootGear"):
                return {
                    group: "Foot Gear",
                    type: "Item"
                };
        }
        return "";
    };
    'use strict';

    const equipEquipment = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let EquipmentRepeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
            let selectedId = EquipmentRepeater.getIdFromFieldName(eventinfo.sourceAttribute);

        },

        openSubMenu = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate()
            let EquipmentRepeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
            let selectedId = EquipmentRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            attributeHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "on");

            EquipmentRepeater.getIds(function (wearRepeater) {
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    wearRepeater.iterate(function (id) {
                        if (id != selectedId) {
                            attrHandler.addUpdate(wearRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemActions")), "0");
                        }
                    });
                });
                attributeHandler.run();
            });
        },

        deleteEquipment = function (eventinfo) {
            let EquipmentRepeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
            let selectedId = EquipmentRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            EquipmentRepeater.removeId(selectedId);

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            attributeHandler.run();
        },

        inspectEquipment = function (eventinfo) {
            let EquipmentRepeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
            let selectedId = EquipmentRepeater.getIdFromFieldName(eventinfo.sourceAttribute);

            EquipmentRepeater.getIds(function (wearRepeater) {
                WuxWorkerInspectPopup.OpenItemInspection(function (attrHandler) {
                        wearRepeater.iterate(function (id) {
                            attrHandler.addMod(wearRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName")));
                        });
                    },
                    function (attrHandler, itemPopupRepeater) {
                        attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                        attrHandler.addUpdate(wearRepeater.getFieldName(selectedId, WuxDef.GetVariable("Gear_ItemActions")), "0");
                        return populateInspectionElements(attrHandler, itemPopupRepeater, wearRepeater, selectedId);
                    }
                );
            });
        },

        openEquipmentAdditionItemInspection = function (eventinfo) {
            WuxWorkerInspectPopup.OpenItemInspection(function () {
                },
                function (attrHandler, itemPopupRepeater) {
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "on");
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), "Add Equipment");

                    return populateItemInspectionEquipment(attrHandler, itemPopupRepeater, eventinfo);
                });
        };

    return {
        EquipEquipment: equipEquipment,
        OpenSubMenu: openSubMenu,
        DeleteEquipment: deleteEquipment,
        InspectEquipment: inspectEquipment,
        OpenEquipmentAdditionItemInspection: openEquipmentAdditionItemInspection
    };
}());

