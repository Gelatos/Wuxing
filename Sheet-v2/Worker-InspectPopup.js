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
    const setItemInfo = function (attrHandler, item) {
        clearItemInfo(attrHandler);
        setSharedItemInfo(attrHandler, item);

        // set the technique info
        if (item.itemType == "UsableItem" && item.hasTechnique) {
            setTechniqueInfo(attrHandler, item.technique);
        } else {
            clearTechniqueInfo(attrHandler);
        }
    };
    const setGoodsInfo = function (attrHandler, item) {
        clearItemInfo(attrHandler);
        setSharedItemInfo(attrHandler, item);
        clearTechniqueInfo(attrHandler);
    };
    const setSharedItemInfo = function (attrHandler, item) {
        let displayData = new ItemDisplayData(item);
        Debug.Log(`Setting item info for ${displayData.name}`);

        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemName"), displayData.name);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemGroup"), displayData.group);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemStats"), displayData.stats);

        if (displayData.traits.length > 0) {
            addDefinitions(attrHandler, displayData.traits, WuxDef.GetVariable("Popup_ItemTrait"), 3);
        }
        if (displayData.description != "") {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemDescription"), displayData.description);
        }
        if (displayData.craftSkill != "") {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemCraftSkill"), displayData.craftSkill);
        }
        if (displayData.craftMaterials != "") {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemCraftMats"), displayData.craftMaterials);
        }
        if (displayData.craftComponents.length > 0) {
            for (let i = 0; i < displayData.craftComponents.length; i++) {
                let component = displayData.craftComponents[i];
                attrHandler.addUpdate(WuxDef.GetVariable(`Popup_ItemCraft`, i), component.name);
                attrHandler.addUpdate(WuxDef.GetVariable(`Popup_ItemCraft`, i + "desc0"), component.desc);
            }
        }
    };
    const clearItemInfo = function (attrHandler) {
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemName"), 0);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemGroup"), "");
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemStats"), "");
        clearDefinition(attrHandler, "Popup_ItemTrait", 0);
        clearDefinition(attrHandler, "Popup_ItemCraft", 1);
        clearDefinition(attrHandler, "Popup_ItemCraft", 2);
        clearDefinition(attrHandler, "Popup_ItemCraft", 3);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemDescription"), 0);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemCraftSkill"), 0);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_ItemCraftMats"), "");
        clearDefinition(attrHandler, "Popup_ItemCraft", 0);
        clearDefinition(attrHandler, "Popup_ItemCraft", 1);
        clearDefinition(attrHandler, "Popup_ItemCraft", 2);
        clearDefinition(attrHandler, "Popup_ItemCraft", 3);
    };
    const setTechniqueInfo = function (attrHandler, technique) {
        clearTechniqueInfo(attrHandler);

        let displayData = new TechniqueDisplayData(technique);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechName"), displayData.name);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechActionType"), displayData.actionType);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechResourceData"), displayData.resourceData);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechTargetingData"), displayData.targetData);
        if (displayData.traits.length > 0) {
            addDefinitions(attrHandler, displayData.traits, WuxDef.GetVariable("Popup_TechTrait"), 3);
        }

        if (displayData.trigger != "") {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechTrigger"), displayData.trigger);
        }
        if (displayData.requirements != "") {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechRequirements"), displayData.requirements);
        }
        if (displayData.itemTraits.length > 0) {
            addDefinitions(attrHandler, displayData.itemTraits, WuxDef.GetVariable("Popup_TechItemReq"), 2);
        }
        if (displayData.flavorText != "") {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechFlavorText"), displayData.flavorText);
        }
        if (displayData.effects.length > 0) {
            addTechniqueEffects(attrHandler, displayData.effects);
        }
        if (displayData.definitions.length > 0) {
            addDefinitions(attrHandler, displayData.definitions, WuxDef.GetVariable("Popup_TechDef"), 3);
        }
    };
    const clearDefinition = function (attrHandler, baseAttribute, index) {
        attrHandler.addUpdate(WuxDef.GetVariable(baseAttribute, index), 0);
        attrHandler.addUpdate(WuxDef.GetVariable(baseAttribute, `${index}desc0`), 0);
        attrHandler.addUpdate(WuxDef.GetVariable(baseAttribute, `${index}desc1`), 0);
        attrHandler.addUpdate(WuxDef.GetVariable(baseAttribute, `${index}desc2`), 0);
    };
    const addDefinitions = function (attrHandler, definitionData, prefix, descriptionMaxIndex) {
        for (let i = 0; i < definitionData.length; i++) {
            attrHandler.addUpdate(`${prefix}${i}`, definitionData[i].getTitle());

            for (let j = 0; j < definitionData[i].descriptions.length; j++) {
                if (j <= descriptionMaxIndex) {
                    attrHandler.addUpdate(`${prefix}${i}desc${j}`, definitionData[i].descriptions[j]);
                } else {
                    attrHandler.addUpdate(`${prefix}${i}desc${descriptionMaxIndex}`, definitionData[i].descriptions[j]);
                }
            }
        }
    };
    const addTechniqueEffects = function (attrHandler, effects) {
        let incrementer = 0;
        effects.forEach(function (effect) {
            if (effect.check != undefined) {
                attrHandler.addUpdate(WuxDef.GetVariable(`Popup_TechEffect`, `${incrementer}name`), effect.check);
                attrHandler.addUpdate(WuxDef.GetVariable(`Popup_TechEffect`, `${incrementer}desc`), effect.checkDescription);

                if (effect.effects != undefined) {
                    effect.effects.forEach(function (desc) {
                        if (desc != undefined) {
                            attrHandler.addUpdate(WuxDef.GetVariable(`Popup_TechEffect`, `${incrementer}`), desc);
                            incrementer++;
                        }
                    });
                }
                incrementer++;
            }
        });
    };
    const clearTechniqueInfo = function (attrHandler) {
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechActionType"), "");
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechName"), 0);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechDisplayName"), "");
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechResourceData"), "");
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechTargetingData"), "");
        clearDefinition(attrHandler, "Popup_TechTrait", 0);
        clearDefinition(attrHandler, "Popup_TechTrait", 1);
        clearDefinition(attrHandler, "Popup_TechTrait", 2);
        clearDefinition(attrHandler, "Popup_TechTrait", 3);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechTrigger"), 0);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechRequirements"), 0);
        clearDefinition(attrHandler, "Popup_TechItemReq", 0);
        clearDefinition(attrHandler, "Popup_TechItemReq", 1);
        clearDefinition(attrHandler, "Popup_TechItemReq", 2);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechFlavorText"), 0);
        clearTechEffects(attrHandler);
        clearDefinition(attrHandler, "Popup_TechDef", 0);
        clearDefinition(attrHandler, "Popup_TechDef", 1);
        clearDefinition(attrHandler, "Popup_TechDef", 2);
        clearDefinition(attrHandler, "Popup_TechDef", 3);
    };
    const clearTechEffects = function (attrHandler) {
        for (let i = 0; i < 10; i++) {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechEffect", i), 0);
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechEffect", `${i}name`), 0);
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_TechEffect", `${i}desc`), "");
        }
    };
    const performAddSelectedInspectElement = function (attrHandler) {
        switch (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType"))) {
            case "Add Wearable":
                performAddSelectedInspectElementWearable(attrHandler,
                    WuxItems.Get(attrHandler.parseString(WuxDef.GetVariable("Popup_ItemName")))
                );
                break;
        }
    };
    const performAddSelectedInspectElementWearable = function (attrHandler, item) {
        let repeater = new WorkerRepeatingSectionHandler("RepeatingWearables");
        let newRowId = repeater.generateRowId();
        let displayData = new ItemDisplayData(item);

        let equipMenuText = getEquipMenuText(item);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_WearableEquipMenu")), equipMenuText);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_WearableName")), displayData.name);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_WearableGroup")), displayData.group);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_WearableStats")), displayData.stats);

        if (displayData.traits.length > 0) {
            addDefinitions(attrHandler, displayData.traits, repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_WearableTrait")), 3);
        }
        if (displayData.description != "") {
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_WearableDescription")), displayData.description);
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
                        setItemInfo(attrHandler, selectedItem.item);
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
                        clearItemInfo(attrHandler);
                        setTechniqueInfo(attrHandler, selectedItem.item);
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
                            setItemInfo(attrHandler, item);
                        } else if (itemType == "Goods") {
                            let goods = WuxGoods.Get(itemName);
                            setGoodsInfo(attrHandler, goods);
                        } else if (itemType == "Tech") {
                            let technique = WuxTechs.Get(itemName);
                            clearItemInfo(attrHandler);
                            setTechniqueInfo(attrHandler, technique);
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
            attributeHandler.addMod(WuxDef.GetVariable("Popup_ItemName"));

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

