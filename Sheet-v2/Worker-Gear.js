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
            this.actionFieldName = this.styleRepeater.getFieldName(this.selectedId, getGearVariable("ItemAction"));
        }
        setSelectIdFromName (attrHandler, styleRepeater, name) {
            let equipWorker = this;
            styleRepeater.iterate(function (id) {
                let styleName = styleRepeater.getFieldName(id, getGearVariable("ItemName"));
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
            this.styleFieldName = this.styleRepeater.getFieldName(this.selectedId, getGearVariable("ItemName"));
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
        }

        unequipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Gear_ItemIsEquipped")), "0");
            attrHandler.addUpdate(emptySlotFieldName, "0");
        }

        findMatchingEquippedSlot(attrHandler, repeater, slotContents) {
            let returnable = undefined;
            repeater.iterate(function (id) {
                let slotFieldName = repeater.getFieldName(id, getGearVariable("ItemName"));
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
                equipItemWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, getGearVariable("ItemName")), 0);
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
            WuxWorkerActions.UpdateAllActionsFromMenu(equipItemWorker.attributeHandler);
            let loader = new LoadingScreenHandler(equipItemWorker.attributeHandler);
            loader.run();
        });
    };
    
    const setWeaponDamageValues = function (attrHandler, itemName) {
        let combatDetailsHandler = new CombatDetailsHandler(attrHandler);
        let item = WuxItems.Get(itemName);
        if (item.hasTechnique) {
            for (let i = 0; i < item.technique.effects.keys.length; i++) {
                let techEffect = item.technique.effects.get(item.technique.effects.keys[i]);
                if (techEffect.type == "HP" && techEffect.subType == "") {
                    attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamage"), techEffect.effect);
                    attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamageVal"), WuxDef.GetTitle(techEffect.effect));
                    combatDetailsHandler.onUpdateWeaponDamageType(attrHandler, WuxDef.GetTitle(techEffect.effect));
                    return;
                }
            }
        }

        attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamage"), "0");
        attrHandler.addUpdate(WuxDef.GetVariable("WeaponDamageVal"), WuxDef.GetTitle("Def_Force"));
        combatDetailsHandler.onUpdateWeaponDamageType(attrHandler, WuxDef.GetTitle("Def_Force"));
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
        WuxWorkerActions.UpdateAllActionsFromMenu(equipStyleWorker.attributeHandler);
        let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
        loader.run();
    };
    const unequipSetItem = function (eventinfo, slotIndex, equipSlotFieldName) {
        let actionFieldName = "RepeatingGearTech";
        let equipStyleWorker = new EquipItemWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingEquipment");
        equipStyleWorker.attributeHandler.addMod(equipSlotFieldName);

        equipStyleWorker.styleRepeater.getIds(function (equipRepeater) {
            equipRepeater.iterate(function (id) {
                equipStyleWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, getGearVariable("ItemName")), 0);
            });
            equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
                let equippedStyleName = attrHandler.parseString(equipSlotFieldName);
                equipStyleWorker.setSelectIdFromName(attrHandler, equipRepeater, equippedStyleName);
                equipStyleWorker.setActionFieldName(equipSlotFieldName + WuxDef._expand)
                equipStyleWorker.closeMenu(attrHandler);
                equipStyleWorker.unequipSlot(attrHandler, actionFieldName, slotIndex, equipSlotFieldName);
            });
            WuxWorkerActions.UpdateAllActionsFromMenu(equipStyleWorker.attributeHandler);
            let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
            loader.run();
        });
    };

    const seeSetItemTechniques = function (eventinfo, styleFieldName, itemType) {
        Debug.Log("See Item Techniques");

        let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
        let equipSlotDef = WuxDef.Get("Gear_EquipmentSlot");
        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addMod(weaponSlotDef.getVariable(1));
        for (let i = 1; i <= 9; i++) {
            attributeHandler.addMod(equipSlotDef.getVariable(i));
        }
        
        WuxWorkerInspectPopup.OpenItemInspection(attributeHandler, function (attrHandler, popupRepeater) {
            let styleName = attrHandler.parseString(styleFieldName);
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            attrHandler.addUpdate(styleFieldName + WuxDef._expand, "0");
            let selectedElement = null;

            let fieldName = weaponSlotDef.getVariable(1);
            let itemName = attrHandler.parseString(fieldName);
            let item = WuxItems.Get(itemName);
            if (item.group != "") {
                let isOn = styleName == itemName;
                let newRowId = createItemInspectionEquipmentListing(attrHandler, popupRepeater, item, itemType, isOn);
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
                    let newRowId = createItemInspectionEquipmentListing(attrHandler, popupRepeater, item, itemType, isOn);
                    if (isOn) {
                        selectedElement = {
                            item: item,
                            id: newRowId
                        }
                    }
                }
            }
            return selectedElement;
        });
        attributeHandler.run();
        
    };
    const populateInspectionElements = function (attrHandler, popupRepeater, sectionRepeater, selectedId, itemType) {
        
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `All Owned Equipment`);
        
        let selectedElement = null;
        sectionRepeater.iterate(function (id) {
            let itemName = attrHandler.parseString(sectionRepeater.getFieldName(id, getGearVariable("ItemName")));
            let item = WuxItems.Get(itemName);
            if (item.group != "") {
                let isOn = id == selectedId;
                let newRowId = createItemInspectionEquipmentListing(attrHandler, popupRepeater, item, itemType, isOn);
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
    const createItemInspectionEquipmentListing = function (attrHandler, popupRepeater, item, itemType, isOn) {
        let newRowId = popupRepeater.getNextId();
        attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), item.name);
        attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), itemType);
        attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), isOn ? "on" : 0);
        return newRowId;
    }
    const getGearVariable = function (attribute, suffix) {
        let baseDefinition = WuxDef.Get("Gear");
        return baseDefinition.getVariable(`-${WuxDef.GetVariable(attribute, suffix)}`);
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
        
        purchaseGear = function (eventinfo, repeatingSectionName) {
            let attributeHandler = new WorkerAttributeHandler();
            let EquipmentRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
            let selectedId = EquipmentRepeater.getIdFromFieldName(eventinfo.sourceAttribute);

            attributeHandler.addMod(EquipmentRepeater.getFieldName(selectedId, getGearVariable("ItemName")));

            let jinVar = WuxDef.GetVariable("Currency_Jin");
            attributeHandler.addMod(jinVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(EquipmentRepeater.getFieldName(selectedId, getGearVariable("ItemName")));
                let item = WuxItems.Get(itemName);
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                attrHandler.addUpdate(EquipmentRepeater.getFieldName(selectedId, getGearVariable("ItemAction")), "0");

                let cost = parseInt(item.value);
                if (isNaN(cost)) {
                    cost = 0;
                }
                let jin = attrHandler.parseInt(jinVar);
                jin -= cost;
                attrHandler.addUpdate(jinVar, jin.toString());
            });
            attributeHandler.run();
        },

        updateEquipmentVisibility = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingEquipment");
            let repeater = attributeHandler.getRepeatingSection("RepeatingEquipment");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            repeater.addFieldNames([itemIsVisibleVar]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let anyVisible = false;
                repeater.iterate(function (id) {
                    if (attrHandler.parseString(repeater.getFieldName(id, itemIsVisibleVar)) === "on") {
                        anyVisible = true;
                    }
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), anyVisible ? "on" : "0");
            });

            attributeHandler.run();
        },

        equipGear = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingEquipment");
            attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");

            let equipRepeater = attributeHandler.getRepeatingSection("RepeatingEquipment");
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncedEquipment");
            let selectedId = equipRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);

            equipRepeater.addFieldNames([itemNameVar, itemIsVisibleVar]);
            syncedRepeater.addFieldNames([itemNameVar]);
            attributeHandler.addMod(equipBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(equipRepeater.getFieldName(selectedId, itemNameVar));

                let equipBuildRaw = attrHandler.parseString(equipBuildVar);
                let equipBuild = [];
                try { equipBuild = JSON.parse(equipBuildRaw); } catch (e) {}
                if (!Array.isArray(equipBuild)) equipBuild = [];
                equipBuild.push(itemName);
                attrHandler.addUpdate(equipBuildVar, JSON.stringify(equipBuild));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), equipBuild.length.toString());
                let slotOpenState = equipBuild.length < attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots")) ? "0" : "on";

                attrHandler.addUpdate(equipRepeater.getFieldName(selectedId, itemIsVisibleVar), "0");

                let anyVisible = false;
                equipRepeater.iterate(function (id) {
                    if (id !== selectedId && attrHandler.parseString(equipRepeater.getFieldName(id, itemIsVisibleVar)) === "on") {
                        anyVisible = true;
                    }
                    attrHandler.addUpdate(equipRepeater.getFieldName(id, getGearVariable("ItemSlotOpen")), slotOpenState);
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), anyVisible ? "on" : "0");

                syncedRepeater.iterate(function (id) {
                    if (attrHandler.parseString(syncedRepeater.getFieldName(id, itemNameVar)) === itemName) {
                        attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemIsVisibleVar), "on");
                        return true;
                    }
                });
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        unequipGear = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingEquipment");
            attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");

            let equipRepeater = attributeHandler.getRepeatingSection("RepeatingEquipment");
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncedEquipment");
            let selectedId = syncedRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);

            equipRepeater.addFieldNames([itemNameVar]);
            syncedRepeater.addFieldNames([itemNameVar]);
            attributeHandler.addMod(equipBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(syncedRepeater.getFieldName(selectedId, itemNameVar));

                let equipBuildRaw = attrHandler.parseString(equipBuildVar);
                let equipBuild = [];
                try { equipBuild = JSON.parse(equipBuildRaw); } catch (e) {}
                if (!Array.isArray(equipBuild)) equipBuild = [];
                let index = equipBuild.indexOf(itemName);
                if (index !== -1) equipBuild.splice(index, 1);
                attrHandler.addUpdate(equipBuildVar, JSON.stringify(equipBuild));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), equipBuild.length.toString());
                let slotOpenState = equipBuild.length < attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots")) ? "0" : "on";

                attrHandler.addUpdate(syncedRepeater.getFieldName(selectedId, itemIsVisibleVar), "0");

                equipRepeater.iterate(function (id) {
                    if (attrHandler.parseString(equipRepeater.getFieldName(id, itemNameVar)) === itemName) {
                        attrHandler.addUpdate(equipRepeater.getFieldName(id, itemIsVisibleVar), "on");
                    }
                    attrHandler.addUpdate(equipRepeater.getFieldName(id, getGearVariable("ItemSlotOpen")), slotOpenState);
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), "on");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        deleteGear = function (eventinfo, repeatingSectionName) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection(repeatingSectionName);
            attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");

            let equipRepeater = attributeHandler.getRepeatingSection(repeatingSectionName);
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncedEquipment");
            let selectedId = equipRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let equipBuildMaxVar = WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max);
            equipRepeater.addFieldNames([itemNameVar, itemIsVisibleVar]);
            syncedRepeater.addFieldNames([itemNameVar]);
            attributeHandler.addMod(equipBuildMaxVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let deletedItemName = attrHandler.parseString(equipRepeater.getFieldName(selectedId, itemNameVar));

                equipRepeater.removeId(selectedId);

                syncedRepeater.iterate(function (id) {
                    if (attrHandler.parseString(syncedRepeater.getFieldName(id, itemNameVar)) === deletedItemName) {
                        syncedRepeater.removeId(id);
                        return true;
                    }
                });

                let anyVisible = false;
                equipRepeater.iterate(function (id) {
                    if (id !== selectedId && attrHandler.parseString(equipRepeater.getFieldName(id, itemIsVisibleVar)) === "on") {
                        anyVisible = true;
                    }
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), anyVisible ? "on" : "0");

                let equipBuildMaxRaw = attrHandler.parseString(equipBuildMaxVar);
                let equipBuildMax = [];
                try { equipBuildMax = JSON.parse(equipBuildMaxRaw); } catch (e) {}
                if (!Array.isArray(equipBuildMax)) equipBuildMax = [];
                let index = equipBuildMax.indexOf(deletedItemName);
                if (index !== -1) equipBuildMax.splice(index, 1);
                attrHandler.addUpdate(equipBuildMaxVar, JSON.stringify(equipBuildMax));
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        inspectGear = function (eventinfo, repeatingSectionName) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection(repeatingSectionName);
            let repeater = attributeHandler.getRepeatingSection(repeatingSectionName);
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            repeater.addFieldNames([itemNameVar]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let inventoryItems = [];
                let selectedItem = undefined;

                repeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(repeater.getFieldName(id, itemNameVar));
                    let item = WuxItems.Get(itemName);
                    if (item == undefined || item.group === "") return;

                    let inventoryItem = new InspectionInventoryItem(itemName, itemName, false);
                    if (id === selectedId) {
                        selectedItem = inventoryItem;
                    } else {
                        inventoryItems.push(inventoryItem);
                    }
                });

                if (selectedItem !== undefined) {
                    inventoryItems.unshift(selectedItem);
                }

                let attributeHandler2 = new WorkerAttributeHandler();
                WuxWorkerInspectPopup.OpenItemInspection(attributeHandler2, "Owned Equipment", inventoryItems);
                attributeHandler2.run();
            });

            attributeHandler.run();
        },

        unequipSetGear = function (eventinfo, slotIndex, equipSlotFieldName) {
            unequipSetItem(eventinfo, slotIndex, equipSlotFieldName);
        },

        inspectSetGear = function (eventinfo, slotIndex, equipSlotFieldName) {
            seeSetItemTechniques(eventinfo, equipSlotFieldName, "Gear");
        },

        openFindItems = function (eventinfo) {
            if (eventinfo.sourceAttribute === WuxDef.GetVariable("Popup_FindItemsByFilter")) {
                WuxWorkerFilterPopup.OpenItemFilter();
                return;
            }
            if (eventinfo.sourceAttribute === WuxDef.GetVariable("Popup_FindItemsByTechnique")) {
                WuxWorkerFilterPopup.OpenItemTechFilter();
                return;
            }

            let equipmentTypes = WuxDef.Filter([new DatabaseFilterData("group", "EquipmentType")]);
            let matchedDef;
            for (let i = 0; i < equipmentTypes.length; i++) {
                if (equipmentTypes[i].getVariable() === eventinfo.sourceAttribute) {
                    matchedDef = equipmentTypes[i];
                    break;
                }
            }
            if (matchedDef == undefined) { return; }

            let filters = [];
            for (let i = 0; i < matchedDef.descriptions.length; i++) {
                let parts = matchedDef.descriptions[i].split(":");
                if (parts.length === 2) {
                    filters.push(new DatabaseFilterData(parts[0], parts[1]));
                }
            }

            WuxWorkerInspectPopup.OpenItemFilterInspection(filters, matchedDef.title, ["Add Equipment", "Purchase Equipment"]);
        },

        updateEquipment = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingEquipment");
            attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");

            let equipRepeater = attributeHandler.getRepeatingSection("RepeatingEquipment");
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncedEquipment");
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            equipRepeater.addFieldNames([itemNameVar]);
            syncedRepeater.addFieldNames([itemNameVar]);

            let equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);
            let equipBuildMaxVar = WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max);
            attributeHandler.addMod(equipBuildVar);
            attributeHandler.addMod(equipBuildMaxVar);
            attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let equipBuildRaw = attrHandler.parseString(equipBuildVar);
                let equipBuild = [];
                try { equipBuild = JSON.parse(equipBuildRaw); } catch (e) {}
                if (!Array.isArray(equipBuild)) equipBuild = [];

                let equipBuildMaxRaw = attrHandler.parseString(equipBuildMaxVar);
                let equipBuildMax = [];
                try { equipBuildMax = JSON.parse(equipBuildMaxRaw); } catch (e) {}
                if (!Array.isArray(equipBuildMax)) equipBuildMax = [];

                equipBuildMax = [...new Set(equipBuildMax)];
                equipBuild = [...new Set(equipBuild.filter(name => equipBuildMax.includes(name)))];

                let equipSet = new Set(equipBuild);
                let slotsMax = attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots"));
                let slotOpenState = equipBuild.length < slotsMax ? "0" : "on";

                let anyVisible = false;
                equipRepeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(equipRepeater.getFieldName(id, itemNameVar));
                    let isEquipped = equipSet.has(itemName);
                    if (!isEquipped) anyVisible = true;
                    attrHandler.addUpdate(equipRepeater.getFieldName(id, itemIsVisibleVar), isEquipped ? "0" : "on");
                    attrHandler.addUpdate(equipRepeater.getFieldName(id, getGearVariable("ItemSlotOpen")), slotOpenState);
                });

                syncedRepeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(syncedRepeater.getFieldName(id, itemNameVar));
                    attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemIsVisibleVar), equipSet.has(itemName) ? "on" : "0");
                });

                attrHandler.addUpdate(equipBuildVar, JSON.stringify(equipBuild));
                attrHandler.addUpdate(equipBuildMaxVar, JSON.stringify(equipBuildMax));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), equipBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), anyVisible ? "on" : "0");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        removeAllEquipment = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingEquipment");
            attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");

            let equipRepeater = attributeHandler.getRepeatingSection("RepeatingEquipment");
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncedEquipment");
            equipRepeater.addFieldNames([getGearVariable("ItemName")]);
            syncedRepeater.addFieldNames([getGearVariable("ItemName")]);

            let equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);
            let equipBuildMaxVar = WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                equipRepeater.iterate(function (id) {
                    equipRepeater.removeId(id);
                });
                syncedRepeater.iterate(function (id) {
                    syncedRepeater.removeId(id);
                });

                attrHandler.addUpdate(equipBuildVar, JSON.stringify([]));
                attrHandler.addUpdate(equipBuildMaxVar, JSON.stringify([]));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), "0");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        }

    return {
        ToggleEquipItem: toggleEquipItem,
        EquipWeapon: equipWeapon,
        PurchaseGear: purchaseGear,
        EquipGear: equipGear,
        UnequipGear: unequipGear,
        DeleteGear: deleteGear,
        InspectGear: inspectGear,
        UnequipSetGear: unequipSetGear,
        InspectSetGear: inspectSetGear,
        OpenFindItems: openFindItems,
        UpdateEquipmentVisibility: updateEquipmentVisibility,
        UpdateEquipment: updateEquipment,
        RemoveAllEquipment: removeAllEquipment
    };
}());

