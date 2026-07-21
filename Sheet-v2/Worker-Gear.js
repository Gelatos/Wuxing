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

    const equipSlotStateAttr = "gear-equipmentslotstate";
    const consuSlotStateAttr = "gear-consumableslotstate";
    const apparelSlotVar = WuxDef.GetVariable("Gear_EquipmentSlot", WuxDef._gear);

    const getSlotState = function (count, max) {
        if (count > max) return "over";
        if (count >= max && max > 0) return "full";
        return "0";
    };

    const collectEquippedTraits = function (equipBuild) {
        let allTitles = new Set();
        equipBuild.forEach(function (itemName) {
            let item = WuxItems.Get(itemName);
            if (item == undefined || !item.traits || item.traits === "") return;
            WuxDef.GetValues(item.traits, ";", "Trait_").forEach(function (def) {
                allTitles.add(def.getTitle());
            });
        });
        let sorted = [...allTitles].sort();
        return { jsonArray: sorted, display: sorted.length > 0 ? sorted.join(", ") : "None" };
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
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), anyVisible ? "on" : "0");
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
            let itemCountVar = getGearVariable("ItemCount");
            let equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);

            equipRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            syncedRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            attributeHandler.addMod(equipBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));
            attributeHandler.addMod(apparelSlotVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(equipRepeater.getFieldName(selectedId, itemNameVar));

                let equipBuildRaw = attrHandler.parseString(equipBuildVar);
                let equipBuild = [];
                try { equipBuild = JSON.parse(equipBuildRaw); } catch (e) {}
                if (!Array.isArray(equipBuild)) equipBuild = [];
                equipBuild.push(itemName);

                // Apparel slot enforcement: swap out any item already occupying this slot
                let slotJson = {};
                try { slotJson = JSON.parse(attrHandler.parseString(apparelSlotVar) || "{}"); } catch (e) {}
                if (typeof slotJson !== "object" || slotJson === null) slotJson = {};

                let item = WuxItems.Get(itemName);
                if (item != undefined && item.group === "Apparel" && item.category !== "") {
                    let slot = item.category;
                    let oldItemName = slotJson[slot];
                    if (oldItemName != undefined && oldItemName !== itemName) {
                        let oldIndex = equipBuild.indexOf(oldItemName);
                        if (oldIndex !== -1) equipBuild.splice(oldIndex, 1);

                        syncedRepeater.iterate(function (id) {
                            if (attrHandler.parseString(syncedRepeater.getFieldName(id, itemNameVar)) === oldItemName) {
                                attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemIsVisibleVar), "0");
                                attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemCountVar), 0);
                                return true;
                            }
                        });

                        let foundInBase = false;
                        equipRepeater.iterate(function (id) {
                            if (attrHandler.parseString(equipRepeater.getFieldName(id, itemNameVar)) === oldItemName) {
                                foundInBase = true;
                                let currentCount = attrHandler.parseInt(equipRepeater.getFieldName(id, itemCountVar)) || 0;
                                attrHandler.addUpdate(equipRepeater.getFieldName(id, itemCountVar), currentCount + 1);
                                attrHandler.addUpdate(equipRepeater.getFieldName(id, itemIsVisibleVar), "on");
                            }
                        });
                        if (!foundInBase) {
                            let swapRepeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
                            let swapRowId = swapRepeater.generateRowId();
                            let oldItem = WuxItems.Get(oldItemName);
                            attrHandler.addUpdate(swapRepeater.getFieldName(swapRowId, itemNameVar), oldItemName);
                            attrHandler.addUpdate(swapRepeater.getFieldName(swapRowId, itemIsVisibleVar), "on");
                            attrHandler.addUpdate(swapRepeater.getFieldName(swapRowId, itemCountVar), 1);
                            attrHandler.addUpdate(swapRepeater.getFieldName(swapRowId, getGearVariable("ItemSubGroup")), oldItem != undefined && oldItem.group === "Apparel" ? (oldItem.category || "") : "");
                        }
                    }
                    slotJson[slot] = itemName;
                    attrHandler.addUpdate(apparelSlotVar, JSON.stringify(slotJson));
                }

                attrHandler.addUpdate(equipBuildVar, JSON.stringify(equipBuild));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), equipBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible", WuxDef._gear), equipBuild.length > 0 ? "on" : "0");
                let slotsMax = attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots"));
                attrHandler.addUpdate(equipSlotStateAttr, getSlotState(equipBuild.length, slotsMax));

                let equippedTraits = collectEquippedTraits(equipBuild);
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max), JSON.stringify(equippedTraits.jsonArray));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits"), equippedTraits.display);

                let currentCount = attrHandler.parseInt(equipRepeater.getFieldName(selectedId, itemCountVar)) || 1;
                let newCount = currentCount - 1;
                attrHandler.addUpdate(equipRepeater.getFieldName(selectedId, itemCountVar), newCount);
                if (newCount <= 0) {
                    attrHandler.addUpdate(equipRepeater.getFieldName(selectedId, itemIsVisibleVar), "0");
                }

                let anyVisible = false;
                equipRepeater.iterate(function (id) {
                    let isVisible = id === selectedId
                        ? newCount > 0
                        : attrHandler.parseString(equipRepeater.getFieldName(id, itemIsVisibleVar)) === "on";
                    if (isVisible) anyVisible = true;
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), anyVisible ? "on" : "0");

                syncedRepeater.iterate(function (id) {
                    if (attrHandler.parseString(syncedRepeater.getFieldName(id, itemNameVar)) === itemName) {
                        let syncedCount = attrHandler.parseInt(syncedRepeater.getFieldName(id, itemCountVar)) || 0;
                        attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemCountVar), syncedCount + 1);
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

            let itemCountVar = getGearVariable("ItemCount");
            equipRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            syncedRepeater.addFieldNames([itemNameVar, itemCountVar]);
            attributeHandler.addMod(equipBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));
            attributeHandler.addMod(apparelSlotVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(syncedRepeater.getFieldName(selectedId, itemNameVar));

                let equipBuildRaw = attrHandler.parseString(equipBuildVar);
                let equipBuild = [];
                try { equipBuild = JSON.parse(equipBuildRaw); } catch (e) {}
                if (!Array.isArray(equipBuild)) equipBuild = [];
                let index = equipBuild.indexOf(itemName);
                if (index !== -1) equipBuild.splice(index, 1);

                // Remove from apparel slot JSON if applicable
                let item = WuxItems.Get(itemName);
                if (item != undefined && item.group === "Apparel" && item.category !== "") {
                    let slotJson = {};
                    try { slotJson = JSON.parse(attrHandler.parseString(apparelSlotVar) || "{}"); } catch (e) {}
                    if (typeof slotJson !== "object" || slotJson === null) slotJson = {};
                    if (slotJson[item.category] === itemName) {
                        delete slotJson[item.category];
                        attrHandler.addUpdate(apparelSlotVar, JSON.stringify(slotJson));
                    }
                }

                attrHandler.addUpdate(equipBuildVar, JSON.stringify(equipBuild));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), equipBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible", WuxDef._gear), equipBuild.length > 0 ? "on" : "0");
                let slotsMax = attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots"));
                attrHandler.addUpdate(equipSlotStateAttr, getSlotState(equipBuild.length, slotsMax));

                let equippedTraits = collectEquippedTraits(equipBuild);
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max), JSON.stringify(equippedTraits.jsonArray));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits"), equippedTraits.display);

                let syncedCount = attrHandler.parseInt(syncedRepeater.getFieldName(selectedId, itemCountVar)) || 1;
                let newSyncedCount = Math.max(0, syncedCount - 1);
                attrHandler.addUpdate(syncedRepeater.getFieldName(selectedId, itemCountVar), newSyncedCount);
                if (newSyncedCount <= 0) {
                    attrHandler.addUpdate(syncedRepeater.getFieldName(selectedId, itemIsVisibleVar), "0");
                }

                let foundInBase = false;
                equipRepeater.iterate(function (id) {
                    if (attrHandler.parseString(equipRepeater.getFieldName(id, itemNameVar)) === itemName) {
                        foundInBase = true;
                        let currentCount = attrHandler.parseInt(equipRepeater.getFieldName(id, itemCountVar)) || 0;
                        attrHandler.addUpdate(equipRepeater.getFieldName(id, itemCountVar), currentCount + 1);
                        attrHandler.addUpdate(equipRepeater.getFieldName(id, itemIsVisibleVar), "on");
                    }
                });
                if (!foundInBase) {
                    let newRepeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
                    let newRowId = newRepeater.generateRowId();
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemNameVar), itemName);
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemIsVisibleVar), "on");
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemCountVar), 1);
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, getGearVariable("ItemSubGroup")), item != undefined && item.group === "Apparel" ? (item.category || "") : "");
                }
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), "on");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        deleteGear = function (eventinfo, repeatingSectionName) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection(repeatingSectionName);

            let equipRepeater = attributeHandler.getRepeatingSection(repeatingSectionName);
            let selectedId = equipRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let equipBuildMaxVar = WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max);
            equipRepeater.addFieldNames([itemNameVar, itemIsVisibleVar]);
            attributeHandler.addMod(equipBuildMaxVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let deletedItemName = attrHandler.parseString(equipRepeater.getFieldName(selectedId, itemNameVar));

                equipRepeater.removeId(selectedId);

                let anyVisible = false;
                equipRepeater.iterate(function (id) {
                    if (id !== selectedId && attrHandler.parseString(equipRepeater.getFieldName(id, itemIsVisibleVar)) === "on") {
                        anyVisible = true;
                    }
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), anyVisible ? "on" : "0");

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
                let groups = {};
                let selectedSubGroup = null;

                repeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(repeater.getFieldName(id, itemNameVar));
                    let item = WuxItems.Get(itemName);
                    if (item == undefined || item.group === "") return;

                    let subGroupKey = item.category;
                    if (!groups[subGroupKey]) {
                        let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                        groups[subGroupKey] = { title: subGroupTitle, selected: [], rest: [] };
                    }

                    let inventoryItem = new InspectionInventoryItem(itemName, itemName, false);
                    if (id === selectedId) {
                        groups[subGroupKey].selected.push(inventoryItem);
                        selectedSubGroup = subGroupKey;
                    } else {
                        groups[subGroupKey].rest.push(inventoryItem);
                    }
                });

                let groupKeys = Object.keys(groups).sort();
                if (selectedSubGroup !== null) {
                    let idx = groupKeys.indexOf(selectedSubGroup);
                    if (idx !== -1) {
                        groupKeys.splice(idx, 1);
                        groupKeys.unshift(selectedSubGroup);
                    }
                }

                let inventoryItems = [];
                for (let key of groupKeys) {
                    inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
                    inventoryItems = inventoryItems.concat(groups[key].selected);
                    inventoryItems = inventoryItems.concat(groups[key].rest);
                }

                let attributeHandler2 = new WorkerAttributeHandler();
                WuxWorkerInspectPopup.OpenItemInspection(attributeHandler2, "Owned Equipment", inventoryItems);
                attributeHandler2.run();
            });

            attributeHandler.run();
        },

        buyConsumable = function (eventinfo) {
            buyConsumableWithCount(eventinfo, 1);
        },

        buyConsumableBulk = function (eventinfo) {
            buyConsumableWithCount(eventinfo, 10);
        },

        buyConsumableWithCount = function (eventinfo, quantity) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingConsumables");

            let consuRepeater = attributeHandler.getRepeatingSection("RepeatingConsumables");
            let selectedId = consuRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let jinVar = WuxDef.GetVariable("Jin");

            consuRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            attributeHandler.addMod(jinVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(consuRepeater.getFieldName(selectedId, itemNameVar));
                let item = WuxItems.Get(itemName);

                let cost = parseInt(item.value) || 0;
                let totalCost = cost * quantity;
                let jin = attrHandler.parseInt(jinVar);
                jin -= totalCost;
                attrHandler.addUpdate(jinVar, jin.toString());

                let currentCount = attrHandler.parseInt(consuRepeater.getFieldName(selectedId, itemCountVar)) || 0;
                let newCount = currentCount + quantity;
                attrHandler.addUpdate(consuRepeater.getFieldName(selectedId, itemCountVar), newCount);
                attrHandler.addUpdate(consuRepeater.getFieldName(selectedId, itemIsVisibleVar), "on");
            });

            attributeHandler.run();
        },

        equipConsumable = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingConsumables");

            let consuRepeater = attributeHandler.getRepeatingSection("RepeatingConsumables");
            let selectedId = consuRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);

            consuRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            attributeHandler.addMod(consuBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("ConsumableSlots"));

            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let itemCountAttrMap = {};
            for (let i = 0; i < consuTypes.length; i++) {
                let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                for (let j = 0; j < itemKeys.length; j++) {
                    let item = itemKeys[j];
                    if (item == undefined) continue;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    let countAttr = WuxDef.GetVariable("ItemCount", countMod);
                    itemCountAttrMap[item.name] = countAttr;
                    attributeHandler.addMod(countAttr);
                }
            }

            let wasAlreadyEquipped = false;
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(consuRepeater.getFieldName(selectedId, itemNameVar));

                let consuBuildRaw = attrHandler.parseString(consuBuildVar);
                let consuBuild = [];
                try { consuBuild = JSON.parse(consuBuildRaw); } catch (e) {}
                if (!Array.isArray(consuBuild)) consuBuild = [];
                wasAlreadyEquipped = consuBuild.indexOf(itemName) !== -1;
                consuBuild.push(itemName);
                attrHandler.addUpdate(consuBuildVar, JSON.stringify(consuBuild));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableSlot"), consuBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible", WuxDef._gear), consuBuild.length > 0 ? "on" : "0");
                let slotsMax = attrHandler.parseInt(WuxDef.GetVariable("ConsumableSlots"));
                attrHandler.addUpdate(consuSlotStateAttr, getSlotState(consuBuild.length, slotsMax));

                let currentCount = attrHandler.parseInt(consuRepeater.getFieldName(selectedId, itemCountVar)) || 1;
                let newCount = currentCount - 1;
                attrHandler.addUpdate(consuRepeater.getFieldName(selectedId, itemCountVar), newCount);
                if (newCount <= 0) {
                    attrHandler.addUpdate(consuRepeater.getFieldName(selectedId, itemIsVisibleVar), "0");
                }

                let anyVisible = false;
                consuRepeater.iterate(function (id) {
                    let isVisible = id === selectedId
                        ? newCount > 0
                        : attrHandler.parseString(consuRepeater.getFieldName(id, itemIsVisibleVar)) === "on";
                    if (isVisible) anyVisible = true;
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible"), anyVisible ? "on" : "0");

                let countAttr = itemCountAttrMap[itemName];
                if (countAttr != undefined) {
                    let currentItemCount = attrHandler.parseInt(countAttr) || 0;
                    attrHandler.addUpdate(countAttr, currentItemCount + 1);
                }
            });

            attributeHandler.addFinishCallback(function () {
                // Only rebuild the Forme Techniques action menu if this item wasn't already
                // equipped — its techniques are already present in the menu otherwise.
                if (!wasAlreadyEquipped) {
                    let actionsAttributeHandler = new WorkerAttributeHandler();
                    WuxWorkerActions.UpdateAllActionsFromMenu(actionsAttributeHandler);
                    actionsAttributeHandler.run();
                }
            });

            attributeHandler.run();
        },

        unequipConsumable = function (eventinfo, itemName) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingConsumables");

            let consuRepeater = attributeHandler.getRepeatingSection("RepeatingConsumables");
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);

            consuRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            attributeHandler.addMod(consuBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("ConsumableSlots"));

            let item = WuxItems.Get(itemName);
            let countAttr = undefined;
            if (item != undefined) {
                let countMod = item.technique.fieldName.replace(/_/g, "");
                countAttr = WuxDef.GetVariable("ItemCount", countMod);
                attributeHandler.addMod(countAttr);
            }

            let wasLastUnit = false;
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let consuBuildRaw = attrHandler.parseString(consuBuildVar);
                let consuBuild = [];
                try { consuBuild = JSON.parse(consuBuildRaw); } catch (e) {}
                if (!Array.isArray(consuBuild)) consuBuild = [];
                let index = consuBuild.indexOf(itemName);
                if (index !== -1) consuBuild.splice(index, 1);
                wasLastUnit = consuBuild.indexOf(itemName) === -1;
                attrHandler.addUpdate(consuBuildVar, JSON.stringify(consuBuild));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableSlot"), consuBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible", WuxDef._gear), consuBuild.length > 0 ? "on" : "0");
                let slotsMax = attrHandler.parseInt(WuxDef.GetVariable("ConsumableSlots"));
                attrHandler.addUpdate(consuSlotStateAttr, getSlotState(consuBuild.length, slotsMax));

                if (countAttr != undefined) {
                    let currentItemCount = attrHandler.parseInt(countAttr) || 1;
                    attrHandler.addUpdate(countAttr, Math.max(0, currentItemCount - 1));
                }

                let foundInBase = false;
                consuRepeater.iterate(function (id) {
                    if (attrHandler.parseString(consuRepeater.getFieldName(id, itemNameVar)) === itemName) {
                        foundInBase = true;
                        let currentCount = attrHandler.parseInt(consuRepeater.getFieldName(id, itemCountVar)) || 0;
                        attrHandler.addUpdate(consuRepeater.getFieldName(id, itemCountVar), currentCount + 1);
                        attrHandler.addUpdate(consuRepeater.getFieldName(id, itemIsVisibleVar), "on");
                    }
                });
                if (!foundInBase) {
                    let newRepeater = new WorkerRepeatingSectionHandler("RepeatingConsumables");
                    let newRowId = newRepeater.generateRowId();
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemNameVar), itemName);
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemIsVisibleVar), "on");
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemCountVar), 1);
                }
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible"), "on");
            });

            attributeHandler.addFinishCallback(function () {
                // Only rebuild the Forme Techniques action menu if that was the last equipped
                // unit of this item — its techniques stay available while any unit remains.
                if (wasLastUnit) {
                    let actionsAttributeHandler = new WorkerAttributeHandler();
                    WuxWorkerActions.UpdateAllActionsFromMenu(actionsAttributeHandler);
                    actionsAttributeHandler.run();
                }
            });

            attributeHandler.run();
        },

        deleteConsumable = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingConsumables");

            let consuRepeater = attributeHandler.getRepeatingSection("RepeatingConsumables");
            let selectedId = consuRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let consuBuildMaxVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build + WuxDef._max);

            consuRepeater.addFieldNames([itemNameVar, itemIsVisibleVar]);
            attributeHandler.addMod(consuBuildMaxVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let deletedItemName = attrHandler.parseString(consuRepeater.getFieldName(selectedId, itemNameVar));

                consuRepeater.removeId(selectedId);

                let anyVisible = false;
                consuRepeater.iterate(function (id) {
                    if (id !== selectedId && attrHandler.parseString(consuRepeater.getFieldName(id, itemIsVisibleVar)) === "on") {
                        anyVisible = true;
                    }
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible"), anyVisible ? "on" : "0");

                let consuBuildMaxRaw = attrHandler.parseString(consuBuildMaxVar);
                let consuBuildMax = [];
                try { consuBuildMax = JSON.parse(consuBuildMaxRaw); } catch (e) {}
                if (!Array.isArray(consuBuildMax)) consuBuildMax = [];
                let idx = consuBuildMax.indexOf(deletedItemName);
                if (idx !== -1) consuBuildMax.splice(idx, 1);
                attrHandler.addUpdate(consuBuildMaxVar, JSON.stringify(consuBuildMax));
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        inspectConsumable = function (eventinfo, repeatingSectionName) {
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
                WuxWorkerInspectPopup.OpenConsumableInspection(attributeHandler2, "Owned Consumables", inventoryItems, ["Add Consumable"]);
                attributeHandler2.run();
            });

            attributeHandler.run();
        },

        buySyncedConsumable = function (eventinfo, itemName) {
            let item = WuxItems.Get(itemName);
            if (item == undefined) return;

            let countMod = item.technique.fieldName.replace(/_/g, "");
            let countAttr = WuxDef.GetVariable("ItemCount", countMod);
            let jinVar = WuxDef.GetVariable("Jin");
            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(jinVar);
            attributeHandler.addMod(countAttr);
            attributeHandler.addMod(consuBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("ConsumableSlots"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let cost = parseInt(item.value) || 0;
                let jin = attrHandler.parseInt(jinVar);
                attrHandler.addUpdate(jinVar, (jin - cost).toString());

                let currentCount = attrHandler.parseInt(countAttr) || 0;
                attrHandler.addUpdate(countAttr, currentCount + 1);

                // Keep the equipped-slot tracking (used by Unequip All, slot count/state) in sync.
                let consuBuildRaw = attrHandler.parseString(consuBuildVar);
                let consuBuild = [];
                try { consuBuild = JSON.parse(consuBuildRaw); } catch (e) {}
                if (!Array.isArray(consuBuild)) consuBuild = [];
                consuBuild.push(itemName);
                attrHandler.addUpdate(consuBuildVar, JSON.stringify(consuBuild));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableSlot"), consuBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible", WuxDef._gear), consuBuild.length > 0 ? "on" : "0");
                let slotsMax = attrHandler.parseInt(WuxDef.GetVariable("ConsumableSlots"));
                attrHandler.addUpdate(consuSlotStateAttr, getSlotState(consuBuild.length, slotsMax));
            });

            attributeHandler.run();
        },

        inspectSyncedConsumable = function (eventinfo, itemName) {
            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(consuBuildVar);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let consuBuildRaw = attrHandler.parseString(consuBuildVar);
                let consuBuild = [];
                try { consuBuild = JSON.parse(consuBuildRaw); } catch (e) {}
                if (!Array.isArray(consuBuild)) consuBuild = [];

                let equippedNames = new Set(consuBuild);
                let inventoryItems = [];
                let selectedItem = undefined;

                equippedNames.forEach(function (name) {
                    let inventoryItem = new InspectionInventoryItem(name, name, false);
                    if (name === itemName) {
                        selectedItem = inventoryItem;
                    } else {
                        inventoryItems.push(inventoryItem);
                    }
                });

                if (selectedItem !== undefined) {
                    inventoryItems.unshift(selectedItem);
                }

                let attributeHandler2 = new WorkerAttributeHandler();
                WuxWorkerInspectPopup.OpenConsumableInspection(attributeHandler2, "Equipped Consumables", inventoryItems, ["Add Consumable"]);
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

        openFindGear = function (eventinfo) {
            let gearTypes = WuxDef.Filter([new DatabaseFilterData("group", "GearType")]);
            let matchedDef;
            for (let i = 0; i < gearTypes.length; i++) {
                if (gearTypes[i].getVariable() === eventinfo.sourceAttribute) {
                    matchedDef = gearTypes[i];
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

            WuxWorkerInspectPopup.OpenGearFilterInspection(filters, matchedDef.title, ["Add Gear", "Purchase Gear"]);
        },

        openFindGoods = function (eventinfo) {
            let goodsTypes = WuxDef.Filter([new DatabaseFilterData("group", "GoodsType")]);
            let matchedDef;
            for (let i = 0; i < goodsTypes.length; i++) {
                if (goodsTypes[i].getVariable() === eventinfo.sourceAttribute) {
                    matchedDef = goodsTypes[i];
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

            WuxWorkerInspectPopup.OpenGoodsFilterInspection(filters, matchedDef.title, ["Add Good", "Purchase Good"]);
        },

        buyGearItemWithCount = function (eventinfo, isBulk) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingGear");
            let repeater = attributeHandler.getRepeatingSection("RepeatingGear");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let itemMainGroupVar = getGearVariable("ItemMainGroup");
            let jinVar = WuxDef.GetVariable("Jin");
            repeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar, itemMainGroupVar]);
            attributeHandler.addMod(jinVar);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(repeater.getFieldName(selectedId, itemNameVar));
                let mainGroup = attrHandler.parseString(repeater.getFieldName(selectedId, itemMainGroupVar));
                let isGoods = mainGroup === "Goods";
                let item = isGoods ? WuxGoods.Get(itemName) : WuxItems.Get(itemName);
                if (item == undefined) return;
                let cost = parseInt(item.value) || 0;
                let quantity = isGoods ? (isBulk ? 50 : 5) : (isBulk ? 10 : 1);
                let costMultiplier = isBulk ? 10 : 1;
                attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost * costMultiplier).toString());
                let currentCount = attrHandler.parseInt(repeater.getFieldName(selectedId, itemCountVar)) || 0;
                attrHandler.addUpdate(repeater.getFieldName(selectedId, itemCountVar), currentCount + quantity);
                attrHandler.addUpdate(repeater.getFieldName(selectedId, itemIsVisibleVar), "on");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_GearIsVisible"), "on");
            });
            attributeHandler.run();
        },

        buyGearItem = function (eventinfo) {
            buyGearItemWithCount(eventinfo, false);
        },

        buyGearItemBulk = function (eventinfo) {
            buyGearItemWithCount(eventinfo, true);
        },

        buyGoodsItemWithCount = function (eventinfo, quantity, costMultiplier) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingGoods");
            let repeater = attributeHandler.getRepeatingSection("RepeatingGoods");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let jinVar = WuxDef.GetVariable("Jin");
            repeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            attributeHandler.addMod(jinVar);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(repeater.getFieldName(selectedId, itemNameVar));
                let item = WuxGoods.Get(itemName);
                if (item == undefined) return;
                let cost = parseInt(item.value) || 0;
                attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost * costMultiplier).toString());
                let currentCount = attrHandler.parseInt(repeater.getFieldName(selectedId, itemCountVar)) || 0;
                attrHandler.addUpdate(repeater.getFieldName(selectedId, itemCountVar), currentCount + quantity);
                attrHandler.addUpdate(repeater.getFieldName(selectedId, itemIsVisibleVar), "on");
            });
            attributeHandler.run();
        },

        buyGoodsItem = function (eventinfo) {
            buyGoodsItemWithCount(eventinfo, 5, 1);
        },

        buyGoodsItemBulk = function (eventinfo) {
            buyGoodsItemWithCount(eventinfo, 50, 10);
        },

        inspectGearItem = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingGear");
            let repeater = attributeHandler.getRepeatingSection("RepeatingGear");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemMainGroupVar = getGearVariable("ItemMainGroup");
            repeater.addFieldNames([itemNameVar, itemMainGroupVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let groups = {};
                let selectedSubGroup = null;
                repeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(repeater.getFieldName(id, itemNameVar));
                    let mainGroup = attrHandler.parseString(repeater.getFieldName(id, itemMainGroupVar));
                    let item = mainGroup === "Goods" ? WuxGoods.Get(itemName) : WuxItems.Get(itemName);
                    if (item == undefined || item.group === "") return;
                    let subGroupKey = item.category;
                    if (!groups[subGroupKey]) {
                        let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                        groups[subGroupKey] = { title: subGroupTitle, selected: [], rest: [] };
                    }
                    let databaseName = mainGroup === "Goods" ? `Goods:${itemName}` : itemName;
                    let inventoryItem = new InspectionInventoryItem(itemName, databaseName, false);
                    if (id === selectedId) {
                        groups[subGroupKey].selected.push(inventoryItem);
                        selectedSubGroup = subGroupKey;
                    } else {
                        groups[subGroupKey].rest.push(inventoryItem);
                    }
                });
                let groupKeys = Object.keys(groups).sort();
                if (selectedSubGroup !== null) {
                    let idx = groupKeys.indexOf(selectedSubGroup);
                    if (idx !== -1) { groupKeys.splice(idx, 1); groupKeys.unshift(selectedSubGroup); }
                }
                let inventoryItems = [];
                for (let key of groupKeys) {
                    inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
                    inventoryItems = inventoryItems.concat(groups[key].selected);
                    inventoryItems = inventoryItems.concat(groups[key].rest);
                }
                let attributeHandler2 = new WorkerAttributeHandler();
                WuxWorkerInspectPopup.OpenGearInspection(attributeHandler2, "Owned Gear", inventoryItems, ["Add Gear", "Purchase Gear"]);
                attributeHandler2.run();
            });
            attributeHandler.run();
        },

        inspectGoodsItem = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingGoods");
            let repeater = attributeHandler.getRepeatingSection("RepeatingGoods");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            repeater.addFieldNames([itemNameVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let groups = {};
                let selectedSubGroup = null;
                repeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(repeater.getFieldName(id, itemNameVar));
                    let item = WuxGoods.Get(itemName);
                    if (item == undefined || item.group === "") return;
                    let subGroupKey = item.category;
                    if (!groups[subGroupKey]) {
                        let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                        groups[subGroupKey] = { title: subGroupTitle, selected: [], rest: [] };
                    }
                    let inventoryItem = new InspectionInventoryItem(itemName, itemName, false);
                    if (id === selectedId) {
                        groups[subGroupKey].selected.push(inventoryItem);
                        selectedSubGroup = subGroupKey;
                    } else {
                        groups[subGroupKey].rest.push(inventoryItem);
                    }
                });
                let groupKeys = Object.keys(groups).sort();
                if (selectedSubGroup !== null) {
                    let idx = groupKeys.indexOf(selectedSubGroup);
                    if (idx !== -1) { groupKeys.splice(idx, 1); groupKeys.unshift(selectedSubGroup); }
                }
                let inventoryItems = [];
                for (let key of groupKeys) {
                    inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
                    inventoryItems = inventoryItems.concat(groups[key].selected);
                    inventoryItems = inventoryItems.concat(groups[key].rest);
                }
                let attributeHandler2 = new WorkerAttributeHandler();
                WuxWorkerInspectPopup.OpenGoodsInspection(attributeHandler2, "Owned Goods", inventoryItems, ["Add Good", "Purchase Good"]);
                attributeHandler2.run();
            });
            attributeHandler.run();
        },

        deleteGearItem = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingGear");
            let repeater = attributeHandler.getRepeatingSection("RepeatingGear");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            repeater.addFieldNames([itemIsVisibleVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                repeater.removeId(selectedId);
                let anyVisible = false;
                repeater.iterate(function (id) {
                    if (id !== selectedId && attrHandler.parseString(repeater.getFieldName(id, itemIsVisibleVar)) === "on") {
                        anyVisible = true;
                    }
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_GearIsVisible"), anyVisible ? "on" : "0");
            });
            attributeHandler.run();
        },

        deleteGoodsItem = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingGoods");
            let repeater = attributeHandler.getRepeatingSection("RepeatingGoods");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            repeater.addFieldNames([getGearVariable("ItemIsVisible")]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                repeater.removeId(selectedId);
            });
            attributeHandler.run();
        },

        openFindGoodsForGear = function (eventinfo) {
            let goodsTypes = WuxDef.Filter([new DatabaseFilterData("group", "GoodsType")]);
            let matchedDef;
            for (let i = 0; i < goodsTypes.length; i++) {
                if (goodsTypes[i].getVariable() === eventinfo.sourceAttribute) {
                    matchedDef = goodsTypes[i];
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

            WuxWorkerInspectPopup.OpenGoodsForGearFilterInspection(filters, matchedDef.title, ["Add Gear", "Purchase Gear"]);
        },

        openFindFoodsItem = function (eventinfo) {
            let foodTypes = WuxDef.Filter([new DatabaseFilterData("group", "FoodType")]);
            let matchedDef;
            for (let i = 0; i < foodTypes.length; i++) {
                if (foodTypes[i].getVariable() === eventinfo.sourceAttribute) {
                    matchedDef = foodTypes[i];
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

            WuxWorkerInspectPopup.OpenFoodsFilterInspection(filters, matchedDef.title, ["Add Food", "Purchase Food"]);
        },

        openFindIngsItem = function (eventinfo) {
            let ingTypes = WuxDef.Filter([new DatabaseFilterData("group", "IngType")]);
            let matchedDef;
            for (let i = 0; i < ingTypes.length; i++) {
                if (ingTypes[i].getVariable() === eventinfo.sourceAttribute) {
                    matchedDef = ingTypes[i];
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

            WuxWorkerInspectPopup.OpenIngsFilterInspection(filters, matchedDef.title, ["Add Ingredient", "Purchase Ingredient"]);
        },

        buyFoodsItemWithCount = function (eventinfo, isBulk) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingFoods");
            let repeater = attributeHandler.getRepeatingSection("RepeatingFoods");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let itemMainGroupVar = getGearVariable("ItemMainGroup");
            let jinVar = WuxDef.GetVariable("Jin");
            repeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar, itemMainGroupVar]);
            attributeHandler.addMod(jinVar);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let itemName = attrHandler.parseString(repeater.getFieldName(selectedId, itemNameVar));
                let mainGroup = attrHandler.parseString(repeater.getFieldName(selectedId, itemMainGroupVar));
                let isGoods = mainGroup === "Goods";
                let item = isGoods ? WuxGoods.Get(itemName) : WuxItems.Get(itemName);
                if (item == undefined) return;
                let cost = parseInt(item.value) || 0;
                let quantity = isGoods ? (isBulk ? 50 : 5) : (isBulk ? 10 : 1);
                let costMultiplier = isBulk ? 10 : 1;
                attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost * costMultiplier).toString());
                let currentCount = attrHandler.parseInt(repeater.getFieldName(selectedId, itemCountVar)) || 0;
                attrHandler.addUpdate(repeater.getFieldName(selectedId, itemCountVar), currentCount + quantity);
                attrHandler.addUpdate(repeater.getFieldName(selectedId, itemIsVisibleVar), "on");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_FoodIsVisible"), "on");
            });
            attributeHandler.run();
        },

        buyFoodsItem = function (eventinfo) {
            buyFoodsItemWithCount(eventinfo, false);
        },

        buyFoodsItemBulk = function (eventinfo) {
            buyFoodsItemWithCount(eventinfo, true);
        },

        inspectFoodsItem = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingFoods");
            let repeater = attributeHandler.getRepeatingSection("RepeatingFoods");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemNameVar = getGearVariable("ItemName");
            let itemMainGroupVar = getGearVariable("ItemMainGroup");
            repeater.addFieldNames([itemNameVar, itemMainGroupVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let groups = {};
                let selectedSubGroup = null;
                repeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(repeater.getFieldName(id, itemNameVar));
                    let mainGroup = attrHandler.parseString(repeater.getFieldName(id, itemMainGroupVar));
                    let item = mainGroup === "Goods" ? WuxGoods.Get(itemName) : WuxItems.Get(itemName);
                    if (item == undefined || item.group === "") return;
                    let subGroupKey = item.category;
                    if (!groups[subGroupKey]) {
                        let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                        groups[subGroupKey] = { title: subGroupTitle, selected: [], rest: [] };
                    }
                    let databaseName = mainGroup === "Goods" ? `Goods:${itemName}` : itemName;
                    let inventoryItem = new InspectionInventoryItem(itemName, databaseName, false);
                    if (id === selectedId) {
                        groups[subGroupKey].selected.push(inventoryItem);
                        selectedSubGroup = subGroupKey;
                    } else {
                        groups[subGroupKey].rest.push(inventoryItem);
                    }
                });
                let groupKeys = Object.keys(groups).sort();
                if (selectedSubGroup !== null) {
                    let idx = groupKeys.indexOf(selectedSubGroup);
                    if (idx !== -1) { groupKeys.splice(idx, 1); groupKeys.unshift(selectedSubGroup); }
                }
                let inventoryItems = [];
                for (let key of groupKeys) {
                    inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
                    inventoryItems = inventoryItems.concat(groups[key].selected);
                    inventoryItems = inventoryItems.concat(groups[key].rest);
                }
                let attributeHandler2 = new WorkerAttributeHandler();
                WuxWorkerInspectPopup.OpenFoodsInspection(attributeHandler2, "Owned Foods", inventoryItems, ["Add Food", "Purchase Food"]);
                attributeHandler2.run();
            });
            attributeHandler.run();
        },

        deleteFoodsItem = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingFoods");
            let repeater = attributeHandler.getRepeatingSection("RepeatingFoods");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            repeater.addFieldNames([itemIsVisibleVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                repeater.removeId(selectedId);
                let anyVisible = false;
                repeater.iterate(function (id) {
                    if (id !== selectedId && attrHandler.parseString(repeater.getFieldName(id, itemIsVisibleVar)) === "on") {
                        anyVisible = true;
                    }
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_FoodIsVisible"), anyVisible ? "on" : "0");
            });
            attributeHandler.run();
        },

        openFindConsumables = function (eventinfo) {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let matchedDef;
            for (let i = 0; i < consuTypes.length; i++) {
                if (consuTypes[i].getVariable() === eventinfo.sourceAttribute) {
                    matchedDef = consuTypes[i];
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

            WuxWorkerInspectPopup.OpenConsumableFilterInspection(filters, matchedDef.title);
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
                attrHandler.addUpdate(equipSlotStateAttr, getSlotState(equipBuild.length, slotsMax));

                let anyVisible = false;
                equipRepeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(equipRepeater.getFieldName(id, itemNameVar));
                    let isEquipped = equipSet.has(itemName);
                    if (!isEquipped) anyVisible = true;
                    attrHandler.addUpdate(equipRepeater.getFieldName(id, itemIsVisibleVar), isEquipped ? "0" : "on");
                });

                syncedRepeater.iterate(function (id) {
                    let itemName = attrHandler.parseString(syncedRepeater.getFieldName(id, itemNameVar));
                    attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemIsVisibleVar), equipSet.has(itemName) ? "on" : "0");
                });

                attrHandler.addUpdate(equipBuildVar, JSON.stringify(equipBuild));
                attrHandler.addUpdate(equipBuildMaxVar, JSON.stringify(equipBuildMax));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), equipBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), anyVisible ? "on" : "0");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        updateConsumables = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingConsumables");
            attributeHandler.addRepeatingSection("RepeatingSyncConsumables");

            let consuRepeater = attributeHandler.getRepeatingSection("RepeatingConsumables");
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncConsumables");
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            consuRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            syncedRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);

            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);
            let consuBuildMaxVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build + WuxDef._max);
            attributeHandler.addMod(consuBuildVar);
            attributeHandler.addMod(consuBuildMaxVar);
            attributeHandler.addMod(WuxDef.GetVariable("ConsumableSlots"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let consuBuildRaw = attrHandler.parseString(consuBuildVar);
                let consuBuild = [];
                try { consuBuild = JSON.parse(consuBuildRaw); } catch (e) {}
                if (!Array.isArray(consuBuild)) consuBuild = [];

                let consuBuildMaxRaw = attrHandler.parseString(consuBuildMaxVar);
                let consuBuildMax = [];
                try { consuBuildMax = JSON.parse(consuBuildMaxRaw); } catch (e) {}
                if (!Array.isArray(consuBuildMax)) consuBuildMax = [];

                consuBuildMax = [...new Set(consuBuildMax)];
                consuBuild = consuBuild.filter(name => consuBuildMax.includes(name));

                let slotsMax = attrHandler.parseInt(WuxDef.GetVariable("ConsumableSlots"));
                attrHandler.addUpdate(consuSlotStateAttr, getSlotState(consuBuild.length, slotsMax));

                let anyVisible = false;
                consuRepeater.iterate(function (id) {
                    let count = attrHandler.parseInt(consuRepeater.getFieldName(id, itemCountVar)) || 0;
                    let visible = count > 0;
                    if (visible) anyVisible = true;
                    attrHandler.addUpdate(consuRepeater.getFieldName(id, itemIsVisibleVar), visible ? "on" : "0");
                });

                syncedRepeater.iterate(function (id) {
                    let syncedCount = attrHandler.parseInt(syncedRepeater.getFieldName(id, itemCountVar)) || 0;
                    attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemIsVisibleVar), syncedCount > 0 ? "on" : "0");
                });

                attrHandler.addUpdate(consuBuildVar, JSON.stringify(consuBuild));
                attrHandler.addUpdate(consuBuildMaxVar, JSON.stringify(consuBuildMax));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableSlot"), consuBuild.length.toString());
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), anyVisible ? "on" : "0");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        removeAllConsumables = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingConsumables");
            attributeHandler.addRepeatingSection("RepeatingSyncConsumables");

            let consuRepeater = attributeHandler.getRepeatingSection("RepeatingConsumables");
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncConsumables");
            consuRepeater.addFieldNames([getGearVariable("ItemName")]);
            syncedRepeater.addFieldNames([getGearVariable("ItemName")]);

            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);
            let consuBuildMaxVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build + WuxDef._max);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                consuRepeater.removeAllIds();
                syncedRepeater.removeAllIds();

                attrHandler.addUpdate(consuBuildVar, JSON.stringify([]));
                attrHandler.addUpdate(consuBuildMaxVar, JSON.stringify([]));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableSlot"), "0");
                attrHandler.addUpdate(consuSlotStateAttr, "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), "0");
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
                equipRepeater.removeAllIds();
                syncedRepeater.removeAllIds();

                attrHandler.addUpdate(equipBuildVar, JSON.stringify([]));
                attrHandler.addUpdate(equipBuildMaxVar, JSON.stringify([]));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), "0");
                attrHandler.addUpdate(equipSlotStateAttr, "0");
                attrHandler.addUpdate(apparelSlotVar, JSON.stringify({}));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max), JSON.stringify([]));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits"), "None");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        unequipAllGear = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingEquipment");
            attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");

            let equipRepeater = attributeHandler.getRepeatingSection("RepeatingEquipment");
            let syncedRepeater = attributeHandler.getRepeatingSection("RepeatingSyncedEquipment");
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);

            equipRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            syncedRepeater.addFieldNames([itemIsVisibleVar]);
            attributeHandler.addMod(equipBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let equipBuildRaw = attrHandler.parseString(equipBuildVar);
                let equipBuild = [];
                try { equipBuild = JSON.parse(equipBuildRaw); } catch (e) {}
                if (!Array.isArray(equipBuild)) equipBuild = [];

                let returnCounts = {};
                equipBuild.forEach(function (itemName) {
                    returnCounts[itemName] = (returnCounts[itemName] || 0) + 1;
                });

                syncedRepeater.iterate(function (id) {
                    attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemIsVisibleVar), "0");
                    attrHandler.addUpdate(syncedRepeater.getFieldName(id, itemCountVar), 0);
                });

                equipRepeater.iterate(function (id) {
                    let rowItemName = attrHandler.parseString(equipRepeater.getFieldName(id, itemNameVar));
                    if (rowItemName && returnCounts[rowItemName] != undefined) {
                        let currentCount = attrHandler.parseInt(equipRepeater.getFieldName(id, itemCountVar)) || 0;
                        attrHandler.addUpdate(equipRepeater.getFieldName(id, itemCountVar), currentCount + returnCounts[rowItemName]);
                        attrHandler.addUpdate(equipRepeater.getFieldName(id, itemIsVisibleVar), "on");
                        delete returnCounts[rowItemName];
                    }
                });

                for (let itemName in returnCounts) {
                    let newRepeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
                    let newRowId = newRepeater.generateRowId();
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemNameVar), itemName);
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemIsVisibleVar), "on");
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemCountVar), returnCounts[itemName]);
                }

                attrHandler.addUpdate(equipBuildVar, JSON.stringify([]));
                attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible", WuxDef._gear), "0");
                attrHandler.addUpdate(equipSlotStateAttr, "0");
                attrHandler.addUpdate(apparelSlotVar, JSON.stringify({}));
                let equippedTraits = collectEquippedTraits([]);
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max), JSON.stringify(equippedTraits.jsonArray));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits"), equippedTraits.display);
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), "on");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        unequipAllConsumables = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingConsumables");

            let consuRepeater = attributeHandler.getRepeatingSection("RepeatingConsumables");
            let itemNameVar = getGearVariable("ItemName");
            let itemIsVisibleVar = getGearVariable("ItemIsVisible");
            let itemCountVar = getGearVariable("ItemCount");
            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);

            consuRepeater.addFieldNames([itemNameVar, itemIsVisibleVar, itemCountVar]);
            attributeHandler.addMod(consuBuildVar);
            attributeHandler.addMod(WuxDef.GetVariable("ConsumableSlots"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let consuBuildRaw = attrHandler.parseString(consuBuildVar);
                let consuBuild = [];
                try { consuBuild = JSON.parse(consuBuildRaw); } catch (e) {}
                if (!Array.isArray(consuBuild)) consuBuild = [];

                let returnCounts = {};
                consuBuild.forEach(function (itemName) {
                    returnCounts[itemName] = (returnCounts[itemName] || 0) + 1;
                });

                for (let itemName in returnCounts) {
                    let item = WuxItems.Get(itemName);
                    if (item != undefined) {
                        let countMod = item.technique.fieldName.replace(/_/g, "");
                        attrHandler.addUpdate(WuxDef.GetVariable("ItemCount", countMod), 0);
                    }
                }

                consuRepeater.iterate(function (id) {
                    let rowItemName = attrHandler.parseString(consuRepeater.getFieldName(id, itemNameVar));
                    if (rowItemName && returnCounts[rowItemName] != undefined) {
                        let currentCount = attrHandler.parseInt(consuRepeater.getFieldName(id, itemCountVar)) || 0;
                        attrHandler.addUpdate(consuRepeater.getFieldName(id, itemCountVar), currentCount + returnCounts[rowItemName]);
                        attrHandler.addUpdate(consuRepeater.getFieldName(id, itemIsVisibleVar), "on");
                        delete returnCounts[rowItemName];
                    }
                });

                for (let itemName in returnCounts) {
                    let newRepeater = new WorkerRepeatingSectionHandler("RepeatingConsumables");
                    let newRowId = newRepeater.generateRowId();
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemNameVar), itemName);
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemIsVisibleVar), "on");
                    attrHandler.addUpdate(newRepeater.getFieldName(newRowId, itemCountVar), returnCounts[itemName]);
                }

                attrHandler.addUpdate(consuBuildVar, JSON.stringify([]));
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableSlot"), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible", WuxDef._gear), "0");
                attrHandler.addUpdate(consuSlotStateAttr, "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), "on");
            });

            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        // Clears this character's RepeatingCooking rows and marks Gear_CookingIsVisible
        // "on" as a locked-in flag — entirely client-side, no API call, so a large group
        // locking in can't freeze the API. Does NOT touch Gear_ActiveRecipe: the character
        // should still see the cooking event (recipe, meal count, Cook button) after
        // locking in, just with their own contribution list cleared. The GM-side !cook
        // command reads this same flag off every participant before allowing a cook.
        consumeCookingIngredients = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingCooking");
            let cookingRepeater = attributeHandler.getRepeatingSection("RepeatingCooking");

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                cookingRepeater.removeAllIds();
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_CookingIsVisible"), "on");
            });

            attributeHandler.run();
        }

    const buildConsuItemCountMap = function (attributeHandler) {
        let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
        let itemCountAttrMap = {};
        for (let i = 0; i < consuTypes.length; i++) {
            let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
            for (let j = 0; j < itemKeys.length; j++) {
                let item = itemKeys[j];
                if (item == undefined) continue;
                let countMod = item.technique.fieldName.replace(/_/g, "");
                let countAttr = WuxDef.GetVariable("ItemCount", countMod);
                itemCountAttrMap[item.name] = countAttr;
                attributeHandler.addMod(countAttr);
            }
        }
        return itemCountAttrMap;
    };

    const canAutoEquipGear = function (attrHandler, item) {
        if (attrHandler.parseString(WuxDef.GetVariable("Gear_AutoEquipItems")) !== "on") return false;
        const equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);
        let equipBuild = [];
        try { equipBuild = JSON.parse(attrHandler.parseString(equipBuildVar)); } catch (e) {}
        if (!Array.isArray(equipBuild)) equipBuild = [];
        if (equipBuild.length >= attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots"))) return false;
        if (item.group === "Apparel" && item.category !== "") {
            let slotJson = {};
            try { slotJson = JSON.parse(attrHandler.parseString(apparelSlotVar) || "{}"); } catch (e) {}
            if (typeof slotJson !== "object" || slotJson === null) slotJson = {};
            if (slotJson[item.category] != undefined) return false;
        }
        return true;
    };

    const canAutoEquipConsumable = function (attrHandler) {
        if (attrHandler.parseString(WuxDef.GetVariable("Gear_AutoEquipItems")) !== "on") return false;
        const consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);
        let consuBuild = [];
        try { consuBuild = JSON.parse(attrHandler.parseString(consuBuildVar)); } catch (e) {}
        if (!Array.isArray(consuBuild)) consuBuild = [];
        return consuBuild.length < attrHandler.parseInt(WuxDef.GetVariable("ConsumableSlots"));
    };

    // Called after eligibility is confirmed. Updates build state only — base/synced repeater
    // rows are handled by the caller before this is invoked.
    const autoEquipGear = function (attrHandler, item, existingRepeater) {
        const equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);
        let equipBuild = [];
        try { equipBuild = JSON.parse(attrHandler.parseString(equipBuildVar)); } catch (e) {}
        if (!Array.isArray(equipBuild)) equipBuild = [];
        const slotsMax = attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots"));

        let slotJson = {};
        try { slotJson = JSON.parse(attrHandler.parseString(apparelSlotVar) || "{}"); } catch (e) {}
        if (typeof slotJson !== "object" || slotJson === null) slotJson = {};
        if (item.group === "Apparel" && item.category !== "") {
            slotJson[item.category] = item.name;
            attrHandler.addUpdate(apparelSlotVar, JSON.stringify(slotJson));
        }

        equipBuild.push(item.name);
        attrHandler.addUpdate(equipBuildVar, JSON.stringify(equipBuild));
        attrHandler.addUpdate(WuxDef.GetVariable("Equipment"), equipBuild.length.toString());
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible", WuxDef._gear), "on");
        attrHandler.addUpdate(equipSlotStateAttr, getSlotState(equipBuild.length, slotsMax));

        const equippedTraits = collectEquippedTraits(equipBuild);
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max), JSON.stringify(equippedTraits.jsonArray));
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits"), equippedTraits.display);

        // Update ItemSlotOpen on existing base inventory items
        const newSlotOpenState = equipBuild.length >= slotsMax ? "on" : "0";
        const slotOpenVar = getGearVariable("ItemSlotOpen");
        existingRepeater.iterate(function (id) {
            attrHandler.addUpdate(existingRepeater.getFieldName(id, slotOpenVar), newSlotOpenState);
        });
    };

    const autoEquipConsumable = function (attrHandler, item, existingRepeater, itemCountAttrMap) {
        const consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);
        let consuBuild = [];
        try { consuBuild = JSON.parse(attrHandler.parseString(consuBuildVar)); } catch (e) {}
        if (!Array.isArray(consuBuild)) consuBuild = [];
        const slotsMax = attrHandler.parseInt(WuxDef.GetVariable("ConsumableSlots"));

        consuBuild.push(item.name);
        attrHandler.addUpdate(consuBuildVar, JSON.stringify(consuBuild));
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableSlot"), consuBuild.length.toString());
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible", WuxDef._gear), "on");
        attrHandler.addUpdate(consuSlotStateAttr, getSlotState(consuBuild.length, slotsMax));

        // Update ItemSlotOpen on existing inventory items
        const newSlotOpenState = consuBuild.length >= slotsMax ? "on" : "0";
        const slotOpenVar = getGearVariable("ItemSlotOpen");
        existingRepeater.iterate(function (id) {
            attrHandler.addUpdate(existingRepeater.getFieldName(id, slotOpenVar), newSlotOpenState);
        });

        if (itemCountAttrMap) {
            const countAttr = itemCountAttrMap[item.name];
            if (countAttr != undefined) {
                attrHandler.addUpdate(countAttr, (attrHandler.parseInt(countAttr) || 0) + 1);
            }
        }
    };

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
        OpenFindGear: openFindGear,
        OpenFindGoods: openFindGoods,
        OpenFindGoodsForGear: openFindGoodsForGear,
        OpenFindFoodsItem: openFindFoodsItem,
        OpenFindIngsItem: openFindIngsItem,
        BuyGearItem: buyGearItem,
        BuyGearItemBulk: buyGearItemBulk,
        BuyGoodsItem: buyGoodsItem,
        BuyGoodsItemBulk: buyGoodsItemBulk,
        BuyFoodsItem: buyFoodsItem,
        BuyFoodsItemBulk: buyFoodsItemBulk,
        InspectGearItem: inspectGearItem,
        InspectGoodsItem: inspectGoodsItem,
        InspectFoodsItem: inspectFoodsItem,
        DeleteGearItem: deleteGearItem,
        DeleteGoodsItem: deleteGoodsItem,
        DeleteFoodsItem: deleteFoodsItem,
        OpenFindConsumables: openFindConsumables,
        BuyConsumable: buyConsumable,
        BuyConsumableBulk: buyConsumableBulk,
        BuySyncedConsumable: buySyncedConsumable,
        EquipConsumable: equipConsumable,
        UnequipConsumable: unequipConsumable,
        DeleteConsumable: deleteConsumable,
        InspectConsumable: inspectConsumable,
        InspectSyncedConsumable: inspectSyncedConsumable,
        UpdateEquipmentVisibility: updateEquipmentVisibility,
        UpdateEquipment: updateEquipment,
        RemoveAllEquipment: removeAllEquipment,
        UpdateConsumables: updateConsumables,
        RemoveAllConsumables: removeAllConsumables,
        UnequipAllGear: unequipAllGear,
        UnequipAllConsumables: unequipAllConsumables,
        ConsumeCookingIngredients: consumeCookingIngredients,
        BuildConsuItemCountMap: buildConsuItemCountMap,
        CanAutoEquipGear: canAutoEquipGear,
        CanAutoEquipConsumable: canAutoEquipConsumable,
        AutoEquipGear: autoEquipGear,
        AutoEquipConsumable: autoEquipConsumable
    };
}());

