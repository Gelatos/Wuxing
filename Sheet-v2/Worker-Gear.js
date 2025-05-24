var WuxWorkerGear = WuxWorkerGear || (function () {
    class EquipItemWorker {
        constructor() {
            this.attributeHandler = {};
            this.styleRepeater = {};
            this.selectedId = "";
            this.actionFieldName = "";
            this.subMenuOptionFieldName = "";
        }

        setEquipSetterValues(subMenuOptionFieldName, repeatingSectionName) {
            this.attributeHandler = new WorkerAttributeHandler();
            this.styleRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
            this.subMenuOptionFieldName = subMenuOptionFieldName;
        }

        setSelectIdFromEventinfo (eventinfo) {
            this.selectedId = this.styleRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            this.actionFieldName = this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Gear_ItemActions"));
        }
        setSelectIdFromName (attrHandler, styleRepeater, name) {
            let equipWorker = this;
            styleRepeater.iterate(function (id) {
                let styleName = styleRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName"));
                if (name == attrHandler.parseString(styleName)) {
                    equipWorker.selectedId = id;
                    return true;
                }
            });

            return equipWorker.selectedId != "";
        }
        setActionFieldName (actionFieldName) {
            this.actionFieldName = actionFieldName;
        }

        setupForEquip (countFieldNames, slotNames, maxSlots) {
            // get the selected style data
            this.styleFieldName = this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Gear_ItemName"));
            this.attributeHandler.addMod(this.styleFieldName);

            countFieldNames.forEach(fieldName => {
                let countField = WuxDef.GetVariable(fieldName);
                this.attributeHandler.addMod(countField);
            })
            let slotIndex = 0;
            slotNames.forEach(name => {
                let slotDef = WuxDef.Get(name);
                for (let i = 1; i <= maxSlots[slotIndex]; i++) {
                    let slotFieldName = slotDef.getVariable(i);
                    this.attributeHandler.addMod(slotFieldName);
                }
                slotIndex++;
            });
        }
        slotIsEmpty(slotContents) {
            return slotContents == "" || slotContents == "0";
        }

        closeMenu(attrHandler) {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            attrHandler.addUpdate(this.subMenuOptionFieldName, "0");
            attrHandler.addUpdate(this.actionFieldName, "0");
        }

        equipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName, styleName) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Gear_ItemIsEquipped")), "on");
            if (styleName == undefined) {
                styleName = attrHandler.parseString(this.styleFieldName);
                attrHandler.addUpdate(emptySlotFieldName, styleName);
            }

            WuxWorkerActions.PopulateGearActions();
        }

        unequipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Gear_ItemIsEquipped")), "0");
            attrHandler.addUpdate(emptySlotFieldName, "0");

            WuxWorkerActions.PopulateGearActions();
        }

        findMatchingEquippedSlot(attrHandler, repeater, slotContents) {
            let returnable = undefined;
            repeater.iterate(function (id) {
                let slotFieldName = repeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName"));
                if (slotContents == attrHandler.parseString(slotFieldName)) {
                    returnable = id;
                    return returnable;
                }
            });
            return returnable;
        }

        getEmptyEquipSlotFieldName(attrHandler, slotDef, countFieldName) {
            let maxCount = attrHandler.parseInt(countFieldName);
            Debug.Log(`Max Count is ${maxCount}`);
            for (let i = 1; i <= maxCount; i++) {
                let slotFieldName = slotDef.getVariable(i);
                let slotContents = attrHandler.parseString(slotFieldName);
                Debug.Log(`looking at slot ${i} with contents ${slotContents}`);
                if (this.slotIsEmpty(slotContents)) {
                    return {slotFieldName: slotFieldName, index: i};
                }
            }
            return undefined;
        }

        getEquippedSlotFieldName(attrHandler, slotDef, styleName, maxCount) {
            for (let i = 1; i <= maxCount; i++) {
                let slotFieldName = slotDef.getVariable(i);
                let slotContents = attrHandler.parseString(slotFieldName);
                if (slotContents == styleName) {
                    return {slotFieldName: slotFieldName, index: i};
                }
            }
            return undefined;
        }

        getLastEquipSlotFieldName(attrHandler, slotDef, countFieldName) {
            let maxCount = attrHandler.parseInt(countFieldName);
            return {slotFieldName: slotDef.getVariable(maxCount), index: maxCount};
        }

        unequipItemAtId(attrHandler, id) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemIsEquipped")), 0);
        }
    }

    const equipItem = function (eventinfo, countFieldName, slotName, maxSlots, setWeaponDamage) {
        let actionFieldName = "RepeatingGearTech";

        let equipItemWorker = new EquipItemWorker();
        equipItemWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingEquipment");
        equipItemWorker.setSelectIdFromEventinfo(eventinfo);
        equipItemWorker.setupForEquip([countFieldName], [slotName], [maxSlots]);

        equipItemWorker.styleRepeater.getIds(function (equipRepeater) {

            equipRepeater.iterate(function (id) {
                equipItemWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName")), 0);
            });

            equipItemWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
                equipItemWorker.closeMenu(attrHandler);
                let emptyEquipSlot = equipItemWorker.getEmptyEquipSlotFieldName(attrHandler, WuxDef.Get(slotName), WuxDef.GetVariable(countFieldName));
                
                if (emptyEquipSlot == undefined) {
                    emptyEquipSlot = equipItemWorker.getLastEquipSlotFieldName(attrHandler, WuxDef.Get(slotName), WuxDef.GetVariable(countFieldName));
                    let equippedId = equipItemWorker.findMatchingEquippedSlot(attrHandler, equipRepeater, attrHandler.parseString(emptyEquipSlot.slotFieldName));
                    Debug.Log(`Found Equipped ID at ${equippedId} which has name ${attrHandler.parseString(emptyEquipSlot.slotFieldName)}`);
                    if (equippedId != undefined) {
                        equipItemWorker.unequipItemAtId(attrHandler, equippedId);
                    }
                }
                equipItemWorker.equipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
                if (setWeaponDamage) {
                    setWeaponDamageValues(attrHandler, attrHandler.parseString(emptyEquipSlot.slotFieldName));
                }
            });
            equipItemWorker.attributeHandler.run();
        });
    };
    
    const setWeaponDamageValues = function (attrHandler, itemName) {
        let item = WuxItems.Get(itemName);
        if (item.hasTechnique) {
            for (let i = 0; i < item.technique.effects.keys.length; i++) {
                let techEffect = item.technique.effects.get(item.technique.effects.keys[i]);
                if (techEffect.type == "HP" && techEffect.subType == "") {
                    attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamage"), techEffect.effect);
                    attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamageVal"), `${WuxDef.GetTitle(techEffect.effect)} Damage`);
                    return;
                }
            }
        }

        attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamage"), "0");
        attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamageVal"), "Force Damage");
    }
    const unequipItem = function (eventinfo, countFieldNames, slotNames, maxSlots) {
        let actionFieldName = "RepeatingGearTech";

        let equipStyleWorker = new EquipItemWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingEquipment");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquip(countFieldNames, slotNames, maxSlots);

        equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let itemName = attrHandler.parseString(equipStyleWorker.styleFieldName);
            equipStyleWorker.closeMenu(attrHandler);
            for (let i = 0; i < slotNames.length; i++) {
                let emptyEquipSlot = equipStyleWorker.getEquippedSlotFieldName(attrHandler, WuxDef.Get(slotNames[i]),
                    itemName, maxSlots[i]);
                if (emptyEquipSlot != undefined) {
                    equipStyleWorker.unequipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
                    break;
                }
            }
        });
        equipStyleWorker.attributeHandler.run();
    };
    const unequipSetItem = function (eventinfo, slotIndex, equipSlotFieldName) {
        let actionFieldName = "RepeatingGearTech";
        let equipStyleWorker = new EquipItemWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingEquipment");
        equipStyleWorker.attributeHandler.addMod(equipSlotFieldName);

        equipStyleWorker.styleRepeater.getIds(function (equipRepeater) {
            equipRepeater.iterate(function (id) {
                equipStyleWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName")), 0);
            });
            equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
                let equippedStyleName = attrHandler.parseString(equipSlotFieldName);
                equipStyleWorker.setSelectIdFromName(attrHandler, equipRepeater, equippedStyleName);
                equipStyleWorker.setActionFieldName(equipSlotFieldName + WuxDef._expand)
                equipStyleWorker.closeMenu(attrHandler);
                equipStyleWorker.unequipSlot(attrHandler, actionFieldName, slotIndex, equipSlotFieldName);
            });
            equipStyleWorker.attributeHandler.run();
        });
    };;

    const seeSetItemTechniques = function (eventinfo, styleFieldName) {
        Debug.Log("See Item Techniques");

        let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
        let equipSlotDef = WuxDef.Get("Gear_EquipmentSlot");
        
        WuxWorkerInspectPopup.OpenItemInspection(function (attrHandler) {
                attrHandler.addMod(weaponSlotDef.getVariable(1));
                for (let i = 1; i <= 9; i++) {
                    attrHandler.addMod(equipSlotDef.getVariable(i));
                }
            },
            function (attrHandler, popupRepeater) {
                let styleName = attrHandler.parseString(styleFieldName);
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                attrHandler.addUpdate(styleFieldName + WuxDef._expand, "0");
                let selectedElement = null;

                let fieldName = weaponSlotDef.getVariable(1);
                let itemName = attrHandler.parseString(fieldName);
                let item = WuxItems.Get(itemName);
                if (item.group != "") {
                    let isOn = styleName == itemName;
                    let newRowId = createItemInspectionEquipmentListing(attrHandler, popupRepeater, item, isOn);
                    if (isOn) {
                        selectedElement = {
                            item: item,
                            id: newRowId
                        }
                    }
                }
                for (let i = 1; i <= 9; i++) {
                    fieldName = equipSlotDef.getVariable(i);
                    itemName = attrHandler.parseString(fieldName);
                    item = WuxItems.Get(itemName);
                    if (item.group != "") {
                        let isOn = styleName == itemName;
                        let newRowId = createItemInspectionEquipmentListing(attrHandler, popupRepeater, item, isOn);
                        if (isOn) {
                            selectedElement = {
                                item: item,
                                id: newRowId
                            }
                        }
                    }
                }
                return selectedElement;
            }
        );
        
    };
    const populateInspectionElements = function (attrHandler, popupRepeater, sectionRepeater, selectedId) {
        
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `All Owned Equipment`);
        
        let selectedElement = null;
        sectionRepeater.iterate(function (id) {
            let itemName = attrHandler.parseString(sectionRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName")));
            let item = WuxItems.Get(itemName);
            if (item.group != "") {
                let isOn = id == selectedId;
                let newRowId = createItemInspectionEquipmentListing(attrHandler, popupRepeater, item, isOn);
                if (isOn) {
                    selectedElement = {
                        item: item,
                        id: newRowId
                    }
                }
            }
        });

        return selectedElement;
    };
    const createItemInspectionEquipmentListing = function (attrHandler, popupRepeater, item, isOn) {
        let newRowId = popupRepeater.generateRowId();
        attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), item.name);
        attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Item");
        attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), isOn ? "on" : 0);
        return newRowId;
    }
    const populateItemInspectionEquipment = function (attrHandler, itemPopupRepeater, eventinfo) {
        let itemGroup = getItemGroupType(eventinfo);
        if (itemGroup == "") {
            return null;
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), 
            `${itemGroup.group}${itemGroup.category != undefined ? ` ${itemGroup.category}` : ""} Items`);

        let firstItem = null;
        let itemFilter;
        if (itemGroup.type == "Item") {
            if (itemGroup.category == undefined) {
                itemFilter = WuxItems.Filter([new DatabaseFilterData("group", itemGroup.group)]);
            }
            else {
                itemFilter = WuxItems.Filter([new DatabaseFilterData("group", itemGroup.group), new DatabaseFilterData("category", itemGroup.category)]);
            }
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
    const getItemGroupType = function (eventinfo) {

        switch (eventinfo.sourceAttribute) {
            case WuxDef.GetVariable("Page_AddMeleeWeapon"):
                return {
                    group: "Weapon",
                    category: "Melee",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddRangedWeapon"):
                return {
                    group: "Weapon",
                    category: "Ranged",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddCommsTool"):
                return {
                    group: "Tool",
                    category: "Comms",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddLightTool"):
                return {
                    group: "Tool",
                    category: "Light",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddBindingsTool"):
                return {
                    group: "Tool",
                    category: "Bindings",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddMiscTool"):
                return {
                    group: "Tool",
                    category: "",
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddHeadGear"):
                return {
                    group: "Head Gear",
                    category: undefined,
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddFaceGear"):
                return {
                    group: "Face Gear",
                    category: undefined,
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddChestGear"):
                return {
                    group: "Chest Gear",
                    category: undefined,
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddArmGear"):
                return {
                    group: "Arm Gear",
                    category: undefined,
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddLegGear"):
                return {
                    group: "Leg Gear",
                    category: undefined,
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddFootGear"):
                return {
                    group: "Foot Gear",
                    category: undefined,
                    type: "Item"
                };
            case WuxDef.GetVariable("Page_AddMiscGear"):
                return {
                    group: "Gear",
                    category: undefined,
                    type: "Item"
                };
        }
        return "";
    };
    'use strict';

    const toggleEquipItem = function (eventinfo) {
            if (eventinfo.newValue == "on") {
                equipItem(eventinfo, "EquipmentSlots", "Gear_EquipmentSlot", 9);
            }
            else {
                unequipItem(eventinfo, ["WeaponSlots", "EquipmentSlots"], ["Gear_WeaponSlot", "Gear_EquipmentSlot"], [1, 9]);
            }
        },

        equipWeapon = function (eventinfo) {
            equipItem(eventinfo, "WeaponSlots", "Gear_WeaponSlot", 1, true);
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

            EquipmentRepeater.getIds(function (equipRepeater) {
                WuxWorkerInspectPopup.OpenItemInspection(function (attrHandler) {
                        equipRepeater.iterate(function (id) {
                            attrHandler.addMod(equipRepeater.getFieldName(id, WuxDef.GetVariable("Gear_ItemName")));
                        });
                    },
                    function (attrHandler, itemPopupRepeater) {
                        attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                        attrHandler.addUpdate(equipRepeater.getFieldName(selectedId, WuxDef.GetVariable("Gear_ItemActions")), "0");
                        return populateInspectionElements(attrHandler, itemPopupRepeater, equipRepeater, selectedId);
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
        },

        unequipSetGear = function (eventinfo, slotIndex, equipSlotFieldName) {
            unequipSetItem(eventinfo, slotIndex, equipSlotFieldName);
        },

        inspectSetGear = function (eventinfo, slotIndex, equipSlotFieldName) {
            seeSetItemTechniques(eventinfo, equipSlotFieldName);
        };

    return {
        ToggleEquipItem: toggleEquipItem,
        EquipWeapon: equipWeapon,
        OpenSubMenu: openSubMenu,
        DeleteEquipment: deleteEquipment,
        InspectEquipment: inspectEquipment,
        OpenEquipmentAdditionItemInspection: openEquipmentAdditionItemInspection,
        UnequipSetGear: unequipSetGear,
        InspectSetGear: inspectSetGear
    };
}());

