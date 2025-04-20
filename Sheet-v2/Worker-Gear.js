var WuxWorkerGear = WuxWorkerGear || (function () {
    let populateInspectionElements = function (attrHandler, itemPopupRepeater, wearRepeater, selectedId) {
        
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `All Owned Wearables`);
        
        let selectedElement = null;
        wearRepeater.iterate(function (id) {
            let itemName = attrHandler.parseString(wearRepeater.getFieldName(id, WuxDef.GetVariable("Gear_WearableName")));
            let item = WuxItems.Get(itemName);
            Debug.Log(`Item is named ${itemName} which is in group ${item.group}`);
            if (item.group != "") {
                let newRowId = itemPopupRepeater.generateRowId();
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), item.name);
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Item");

                if (id == selectedId) {
                    selectedElement = {
                        item: item,
                        id: newRowId
                    }
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
                } else {
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                }
            }
        });

        return selectedElement;
    };
    let populateItemInspectionWearables = function (attrHandler, itemPopupRepeater, eventinfo) {
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

    const equipWearable = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let wearablesRepeater = new WorkerRepeatingSectionHandler("RepeatingWearables");
            let selectedId = wearablesRepeater.getIdFromFieldName(eventinfo.sourceAttribute);

        },

        openSubMenu = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate()
            let wearablesRepeater = new WorkerRepeatingSectionHandler("RepeatingWearables");
            let selectedId = wearablesRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            attributeHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "on");

            wearablesRepeater.getIds(function (wearRepeater) {
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    wearRepeater.iterate(function (id) {
                        if (id != selectedId) {
                            attrHandler.addUpdate(wearRepeater.getFieldName(id, WuxDef.GetVariable("Gear_WearablesActions")), "0");
                        }
                    });
                });
                attributeHandler.run();
            });
        },

        deleteWearable = function (eventinfo) {
            let wearablesRepeater = new WorkerRepeatingSectionHandler("RepeatingWearables");
            let selectedId = wearablesRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            wearablesRepeater.removeId(selectedId);

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            attributeHandler.run();
        },

        inspectWearable = function (eventinfo) {
            let wearablesRepeater = new WorkerRepeatingSectionHandler("RepeatingWearables");
            let selectedId = wearablesRepeater.getIdFromFieldName(eventinfo.sourceAttribute);

            wearablesRepeater.getIds(function (wearRepeater) {
                WuxWorkerInspectPopup.OpenItemInspection(function (attrHandler) {
                        wearRepeater.iterate(function (id) {
                            attrHandler.addMod(wearRepeater.getFieldName(id, WuxDef.GetVariable("Gear_WearableName")));
                        });
                    },
                    function (attrHandler, itemPopupRepeater) {
                        attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                        attrHandler.addUpdate(wearRepeater.getFieldName(selectedId, WuxDef.GetVariable("Gear_WearablesActions")), "0");
                        return populateInspectionElements(attrHandler, itemPopupRepeater, wearRepeater, selectedId);
                    }
                );
            });
        },

        openWearableAdditionItemInspection = function (eventinfo) {
            WuxWorkerInspectPopup.OpenItemInspection(function () {
                },
                function (attrHandler, itemPopupRepeater) {
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "on");
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), "Add Wearable");

                    return populateItemInspectionWearables(attrHandler, itemPopupRepeater, eventinfo);
                });
        };

    return {
        EquipWearable: equipWearable,
        OpenSubMenu: openSubMenu,
        DeleteWearable: deleteWearable,
        InspectWearable: inspectWearable,
        OpenWearableAdditionItemInspection: openWearableAdditionItemInspection
    };
}());

