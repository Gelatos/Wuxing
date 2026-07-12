var WuxAdventureManager = WuxAdventureManager || (function () {
    'use strict';

    // ─── Loot Tables ────────────────────────────────────────────────────────────

    // Weights: rarity 1 = 8, 2 = 4, 3 = 2, 4 = 1 (each half the previous).
    // Returns { allRarities, rarity2Plus } where each is { slots: [rarity], byRarity: {...} }.
    const buildLootTables = function (items) {
        const byRarity = { 1: [], 2: [], 3: [], 4: [] };
        items.forEach(function (item) {
            const r = item.rarity;
            if (r >= 1 && r <= 4) byRarity[r].push(item);
        });

        const weights = { 1: 8, 2: 4, 3: 2, 4: 1 };

        const buildSlots = function (rarities) {
            let slots = [];
            rarities.forEach(function (r) {
                if (byRarity[r].length === 0) return;
                for (let w = 0; w < weights[r]; w++) {
                    slots.push(r);
                }
            });
            return slots;
        };

        return {
            allRarities: { slots: buildSlots([1, 2, 3, 4]), byRarity: byRarity },
            rarity2Plus: { slots: buildSlots([2, 3, 4]),    byRarity: byRarity }
        };
    };

    const pickFromTable = function (table) {
        if (table.slots.length === 0) return null;
        const rarity = table.slots[Math.floor(Math.random() * table.slots.length)];
        const group = table.byRarity[rarity];
        if (!group || group.length === 0) return null;
        return group[Math.floor(Math.random() * group.length)];
    };

    // Returns [{item, count}] for each roll unlocked by the dice result (random items).
    // Roll 1 (≥7):  base 2, max 6
    // Roll 2 (≥8):  base 2, max 5
    // Roll 3 (≥10): base 1, max 5
    // Roll 4 (≥12): base 1, max 3
    // Roll 5 (≥15, rarity 2+): base 1, max 3
    // Roll 6 (≥18, rarity 2+): base 1, max 3
    const addRoll = function (rolls, result, table, threshold, base, cap) {
        if (result < threshold) return;
        const item = pickFromTable(table);
        if (item == null) return;
        rolls.push({ item: item, count: Math.min(base + (result - threshold), cap) });
    };

    const resolveLoot = function (result, tables) {
        let rolls = [];
        addRoll(rolls, result, tables.allRarities, 7,  2, 6);
        rolls = rolls.concat(resolveExtraLoot(result, tables));
        return rolls;
    };

    // Returns the count of the specific chosen item from roll 1.
    // Threshold = 7 + ceil(rarity * 1.5), base 2, cap 4 (max 6 total). Returns 0 if below threshold.
    const resolveSpecificItemCount = function (result, item) {
        const threshold = 6 + Math.ceil((item.rarity || 1) * (item.rarity || 1) * 0.77);
        if (result < threshold) return 0;
        return Math.min(2 + (result - threshold), 6);
    };

    // Returns [{item, count}] for rolls 2-6 only (random items from the table).
    const resolveExtraLoot = function (result, tables) {
        const rolls = [];
        addRoll(rolls, result, tables.allRarities, 8,  1, 5);
        addRoll(rolls, result, tables.allRarities, 11, 1, 5);
        addRoll(rolls, result, tables.allRarities, 13, 1, 3);
        addRoll(rolls, result, tables.rarity2Plus, 16, 1, 3);
        addRoll(rolls, result, tables.rarity2Plus, 19, 1, 3);
        return rolls;
    };

    // ─── Location Lookup ────────────────────────────────────────────────────────

    // Returns { locationDef, items } or null if the location/filter is invalid.
    const getLocationData = function (locationTitle) {
        const locationTypes = WuxDef.Filter(new DatabaseFilterData("group", "LocationType"));
        let locationDef = null;
        for (let i = 0; i < locationTypes.length; i++) {
            if (locationTypes[i].title.toLowerCase() === locationTitle.trim().toLowerCase()) {
                locationDef = locationTypes[i];
                break;
            }
        }
        if (locationDef == null) return null;

        const desc = locationDef.getDescription("");
        let filterValues = [];
        const match = desc.match(/location:([^|;]+)/);
        if (match) {
            filterValues = match[1].split(",").map(function (s) { return s.trim(); }).filter(function (s) { return s !== ""; });
        }
        if (filterValues.length === 0) return null;

        const items = WuxGoods.Filter([new DatabaseFilterData("location", filterValues)]);
        return { locationDef: locationDef, items: items };
    };

    // ─── Repeating Section Goods ─────────────────────────────────────────────────

    const getGearField = function (attributeKey) {
        return WuxDef.Get("Gear").getVariable("-" + WuxDef.GetVariable(attributeKey));
    };

    // Finds an existing character attribute or creates it, then sets its current value.
    const setCharacterAttribute = function (charId, attrName, value) {
        const attr = findObjs({ _characterid: charId, _type: "attribute", name: attrName })[0];
        if (attr) {
            attr.set("current", value);
        } else {
            createObj("attribute", { _characterid: charId, name: attrName, current: value });
        }
    };

    const addItemsToSection = function (charId, itemCounts, sectionName, mainGroup) {
        const repeater      = new SandboxRepeatingSectionHandler(sectionName, charId);
        const nameField     = getGearField("ItemName");
        const countField    = getGearField("ItemCount");
        const visibleField  = getGearField("ItemIsVisible");
        const groupField    = getGearField("ItemMainGroup");
        const itemGroupField= getGearField("ItemGroup");
        const bulkField     = getGearField("ItemBulk");
        const subGroupField = getGearField("ItemSubGroup");
        const buyInfoField  = WuxDef.GetVariable("Gear_Buy", WuxDef._info);
        const buyBulkInfoField = WuxDef.GetVariable("Gear_BuyBulk", WuxDef._info);
        const prefix        = `${repeater.repeatingSection}_`;
        const nameSuffix    = `_${nameField}`;

        // Find existing rows and map itemName → rowId.
        const existingRowIds = {};
        findObjs({ _characterid: charId, _type: "attribute" })
            .forEach(function (a) {
                const n = a.get("name");
                if (n.startsWith(prefix) && n.endsWith(nameSuffix)) {
                    const rowId = n.slice(prefix.length, n.length - nameSuffix.length);
                    existingRowIds[a.get("current")] = rowId;
                }
            });

        Object.keys(itemCounts).forEach(function (itemName) {
            const count = itemCounts[itemName];
            const item  = WuxGoods.Get(itemName);
            const itemValue = item != undefined ? (parseInt(item.value) || 0) : 0;
            const buyLabel     = WuxDef.Get("Gear_Buy").getTitle(`5 (${itemValue}J)`);
            const buyBulkLabel = WuxDef.Get("Gear_BuyBulk").getTitle(`50 (${itemValue * 10}J)`);

            if (existingRowIds[itemName] !== undefined) {
                const rowId       = existingRowIds[itemName];
                const countAttrName = `${prefix}${rowId}_${countField}`;
                const countAttr   = findObjs({ _characterid: charId, _type: "attribute", name: countAttrName })[0];
                if (countAttr) {
                    const current = parseInt(countAttr.get("current")) || 0;
                    countAttr.set("current", current + count);
                }
            } else {
                const rowId       = repeater.generateRowId();
                const itemGroup   = item != undefined ? (item.group    || "") : "";
                const itemBulk    = item != undefined ? (item.bulk     || "") : "";
                const itemCategory= item != undefined ? (item.category || "") : "";
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${nameField}`,        current: itemName });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${countField}`,       current: count });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${visibleField}`,     current: "on" });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${groupField}`,       current: mainGroup });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${itemGroupField}`,   current: itemGroup });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${bulkField}`,        current: itemBulk });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${subGroupField}`,    current: itemCategory });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${buyInfoField}`,     current: buyLabel });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${buyBulkInfoField}`, current: buyBulkLabel });
            }
        });

        // Flip the section's none-check so the sheet stops showing "empty".
        const noneCheckDef = sectionName === "RepeatingFoods" ? "Gear_FoodIsVisible" : "Gear_GearIsVisible";
        const noneCheckVar = WuxDef.GetVariable(noneCheckDef);
        const noneAttr = findObjs({ _characterid: charId, _type: "attribute", name: noneCheckVar })[0];
        if (noneAttr) {
            noneAttr.set("current", "on");
        } else {
            createObj("attribute", { _characterid: charId, name: noneCheckVar, current: "on" });
        }
    };

    const addGoodsToCharacter = function (charId, itemCounts) {
        addItemsToSection(charId, itemCounts, "RepeatingFoods", "Goods");
    };

    // Returns a character's current RepeatingFoods count for an item (0 if not present).
    const getFoodsItemCount = function (charId, itemName) {
        const nameField  = getGearField("ItemName");
        const countField = getGearField("ItemCount");
        const repeater    = new SandboxRepeatingSectionHandler("RepeatingFoods", charId);
        const prefix      = `${repeater.repeatingSection}_`;
        const nameSuffix  = `_${nameField}`;

        let count = 0;
        findObjs({ _characterid: charId, _type: "attribute" }).forEach(function (a) {
            const n = a.get("name");
            if (n.startsWith(prefix) && n.endsWith(nameSuffix) && a.get("current") === itemName) {
                const rowId = n.slice(prefix.length, n.length - nameSuffix.length);
                const countAttr = findObjs({ _characterid: charId, _type: "attribute", name: `${prefix}${rowId}_${countField}` })[0];
                if (countAttr) count = parseInt(countAttr.get("current")) || 0;
            }
        });
        return count;
    };

    const addAnimalGoodToCharacter = function (charId, itemCounts) {
        addItemsToSection(charId, itemCounts, "RepeatingGear", "Animal Good");
    };

    // Adds gathered items to a character, routing by group the same way Hunt does:
    // Animal Good and Material goods go to RepeatingGear, everything else to RepeatingFoods.
    const addGatheredItems = function (charId, itemCounts) {
        const foodItems = {};
        const gearItems = {};
        Object.keys(itemCounts).forEach(function (itemName) {
            const item  = WuxGoods.Get(itemName);
            const group = item ? item.group : "";
            if (group === "Animal Good" || group === "Material") {
                gearItems[itemName] = itemCounts[itemName];
            } else {
                foodItems[itemName] = itemCounts[itemName];
            }
        });
        if (Object.keys(foodItems).length > 0) addGoodsToCharacter(charId, foodItems);
        if (Object.keys(gearItems).length > 0) addAnimalGoodToCharacter(charId, gearItems);
    };

    // Creates a new RepeatingCooking row for an ingredient and returns its row id.
    const createCookingRow = function (charId, itemName, itemGroup) {
        const repeater        = new SandboxRepeatingSectionHandler("RepeatingCooking", charId);
        const nameField       = getGearField("ItemName");
        const countField      = getGearField("ItemCount");
        const visibleField    = getGearField("ItemIsVisible");
        const mainGroupField  = getGearField("ItemMainGroup");
        const itemGroupField  = getGearField("ItemGroup");
        const rowId           = repeater.generateRowId();
        const prefix          = `${repeater.repeatingSection}_${rowId}_`;

        createObj("attribute", { _characterid: charId, name: `${prefix}${nameField}`,      current: itemName });
        createObj("attribute", { _characterid: charId, name: `${prefix}${countField}`,     current: 1 });
        createObj("attribute", { _characterid: charId, name: `${prefix}${visibleField}`,   current: "on" });
        createObj("attribute", { _characterid: charId, name: `${prefix}${mainGroupField}`, current: "Goods" });
        createObj("attribute", { _characterid: charId, name: `${prefix}${itemGroupField}`, current: itemGroup });

        return rowId;
    };

    // Increments an existing RepeatingCooking row's count by 1 using its cached row id.
    const incrementCookingRowCount = function (charId, rowId) {
        if (rowId === undefined) return;
        const repeater       = new SandboxRepeatingSectionHandler("RepeatingCooking", charId);
        const countField     = getGearField("ItemCount");
        const countAttrName  = `${repeater.repeatingSection}_${rowId}_${countField}`;
        const countAttr      = findObjs({ _characterid: charId, _type: "attribute", name: countAttrName })[0];
        if (countAttr) {
            const current = parseInt(countAttr.get("current")) || 0;
            countAttr.set("current", current + 1);
        }
    };

    // Decrements an existing RepeatingCooking row's count by 1 using its cached row id,
    // clamped to 0. Returns the resulting count (0 if the row/attribute doesn't exist).
    const decrementCookingRowCount = function (charId, rowId) {
        if (rowId === undefined) return 0;
        const repeater       = new SandboxRepeatingSectionHandler("RepeatingCooking", charId);
        const countField     = getGearField("ItemCount");
        const countAttrName  = `${repeater.repeatingSection}_${rowId}_${countField}`;
        const countAttr      = findObjs({ _characterid: charId, _type: "attribute", name: countAttrName })[0];
        if (!countAttr) return 0;
        const newCount = Math.max(0, (parseInt(countAttr.get("current")) || 0) - 1);
        countAttr.set("current", newCount);
        return newCount;
    };

    // Deletes every attribute belonging to a RepeatingCooking row using its cached row id.
    const deleteCookingRow = function (charId, rowId) {
        if (rowId === undefined) return;
        const repeater = new SandboxRepeatingSectionHandler("RepeatingCooking", charId);
        const prefix   = `${repeater.repeatingSection}_${rowId}_`;
        findObjs({ _characterid: charId, _type: "attribute" }).forEach(function (a) {
            if (a.get("name").startsWith(prefix)) {
                a.remove();
            }
        });
    };

    // Deletes every row in a character's RepeatingCooking section.
    const clearCookingRows = function (charId) {
        const repeater = new SandboxRepeatingSectionHandler("RepeatingCooking", charId);
        const prefix   = `${repeater.repeatingSection}_`;
        findObjs({ _characterid: charId, _type: "attribute" }).forEach(function (a) {
            if (a.get("name").startsWith(prefix)) {
                a.remove();
            }
        });
    };

    // ─── Notice Roll Runner ─────────────────────────────────────────────────────

    // Rolls Notice for each target, then calls onResult(result, noticeRoll, tokenTargetData).
    const runGatherCheck = function (targets, tables, onResult) {
        const noticeVar = WuxDef.GetVariable("Skill_Notice");
        _.each(targets, function (tokenTargetData) {
            const advantage  = tokenTargetData.getAdvantage();
            const dieRoll    = new DieRoll();
            dieRoll.rollCheck(advantage);
            const noticeRoll = new DieRoll(dieRoll);

            const attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            attributeHandler.addMod(noticeVar);
            attributeHandler.addFinishCallback(function (attrHandler) {
                const noticeMod = attrHandler.parseInt(noticeVar, 0, false);
                noticeRoll.addModToRoll(noticeMod);
                onResult(noticeRoll.total, noticeRoll, tokenTargetData);
            });
            attributeHandler.run();
        });
    };

    // ─── Meal Helpers ───────────────────────────────────────────────────────────

    const getMeals = function () {
        return WuxItems.Filter([new DatabaseFilterData("group", ["Basic Meal", "Meal"])]);
    };

    // ─── Commands ───────────────────────────────────────────────────────────────

    var
        // !adventureoptions [location|||waterSource] — shows the Adventure Options window.
        // If location is provided, saves both values to state. If omitted, reads from state.
        commandAdventureOptions = function (msg, content) {
            const parts       = content ? content.split("|||") : [];
            const locationArg = parts[0] ? parts[0].trim() : "";
            const waterArg    = parts[1] ? parts[1].trim() : null;
            const isExplicit  = !!locationArg;

            const resolved     = isExplicit ? locationArg : (state.WuxAdventureState || {}).currentLocation || "";
            const waterSource  = waterArg !== null ? waterArg : (state.WuxAdventureState || {}).waterSource || "";

            if (!resolved) {
                sendChat("System", `/w "${msg.who}" No location is set. Use the location picker to set one first.`, null, { noarchive: true });
                return;
            }

            if (isExplicit) {
                state.WuxAdventureState.currentLocation = resolved;
                state.WuxAdventureState.waterSource     = waterSource;
            }

            const locationData = getLocationData(resolved);
            const outputLines  = [
                `Adventure Options`,
                `Current Environment: ${resolved}`,
                waterSource && waterSource !== "No Water" ? `Water Source: ${waterSource}` : "",
                `[Gather Materials (Any)](!gather ${resolved})`
            ].filter(function (l) { return l !== ""; });

            if (locationData != null && locationData.items.length > 0) {
                const itemOptions = locationData.items
                    .map(function (i) { return i.title || i.name; })
                    .join("|");
                outputLines.push(`[Gather Material](!gathermaterial ${resolved}@@@?{Choose Item|${itemOptions}})`);
            }

            outputLines.push(`[See All Materials](!seematerials)`);
            outputLines.push(`[Hunt](!hunt)`);
            if (waterSource && waterSource !== "No Water") {
                outputLines.push(`[Fish](!fish)`);
            }
            outputLines.push(`<div>&nbsp</div><div style='font-weight: bold'>Cooking</div>`);
            outputLines.push(`[View Cooking](!viewcooking)`);

            const messageObject = new SystemInfoMessage(outputLines);
            messageObject.setSender("Wuxing");
            if (isExplicit) {
                WuxMessage.Send(messageObject);
            } else {
                WuxMessage.SendToSender(messageObject, msg);
            }
        },

        // !gather <LocationTitle> — rolls Notice for each selected token and grants random loot.
        commandGather = function (msg, targets, locationTitle) {
            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected for gathering.`, null, { noarchive: true });
                return;
            }
            const locationData = getLocationData(locationTitle);
            if (locationData == null) {
                sendChat("System", `/w GM Unknown location or no filter defined: "${locationTitle}".`, null, { noarchive: true });
                return;
            }
            if (locationData.items.length === 0) {
                sendChat("System", `/w GM No items found for location: ${locationData.locationDef.title}.`, null, { noarchive: true });
                return;
            }

            const tables = buildLootTables(locationData.items);
            runGatherCheck(targets, tables, function (result, noticeRoll, tokenTargetData) {
                const lootRolls  = resolveLoot(result, tables);
                const itemCounts = {};
                lootRolls.forEach(function (loot) {
                    itemCounts[loot.item.name] = (itemCounts[loot.item.name] || 0) + loot.count;
                });

                if (Object.keys(itemCounts).length > 0) {
                    addGatheredItems(tokenTargetData.charId, itemCounts);
                }

                const rollDisplay = Format.ShowTooltip(result.toString(), noticeRoll.message);
                const outputLines = [
                    `${tokenTargetData.displayName} — Gathering: ${locationData.locationDef.title}`,
                    `Notice Check: ${rollDisplay}`
                ];
                if (lootRolls.length === 0) {
                    outputLines.push(`No materials found (need 7+).`);
                } else {
                    outputLines.push(`Materials gathered:`);
                    lootRolls.forEach(function (loot) {
                        outputLines.push(`${loot.item.title || loot.item.name} x${loot.count}`);
                    });
                }

                const messageObject = new SystemInfoMessage(outputLines);
                messageObject.setSender(tokenTargetData.displayName || "Wuxing");
                WuxMessage.SendToSenderAndGM(messageObject, msg);
            });
        },

        // !gathermaterial <location>@@@<itemName> — rolls Notice for a specific item.
        // Roll 1 uses a rarity-based threshold and gives the chosen item; rolls 2-6 give random loot.
        commandGatherSpecific = function (msg, targets, locationTitle, itemName) {
            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected for gathering.`, null, { noarchive: true });
                return;
            }
            const item = WuxGoods.Get(itemName);
            if (item == undefined) {
                sendChat("System", `/w GM Unknown item: "${itemName}".`, null, { noarchive: true });
                return;
            }
            const locationData = getLocationData(locationTitle);
            if (locationData == null) {
                sendChat("System", `/w GM Unknown location or no filter defined: "${locationTitle}".`, null, { noarchive: true });
                return;
            }

            const threshold   = 7 + Math.floor((item.rarity || 1) * 1.5);
            const tables      = buildLootTables(locationData.items);
            const itemDisplay = item.title || item.name;

            runGatherCheck(targets, tables, function (result, noticeRoll, tokenTargetData) {
                const specificCount = resolveSpecificItemCount(result, item);
                const extraRolls    = resolveExtraLoot(result, tables);

                const itemCounts = {};
                if (specificCount > 0) {
                    itemCounts[item.name] = specificCount;
                }
                extraRolls.forEach(function (loot) {
                    itemCounts[loot.item.name] = (itemCounts[loot.item.name] || 0) + loot.count;
                });

                if (Object.keys(itemCounts).length > 0) {
                    addGatheredItems(tokenTargetData.charId, itemCounts);
                }

                const rollDisplay = Format.ShowTooltip(result.toString(), noticeRoll.message);
                const outputLines = [
                    `${tokenTargetData.displayName} — Gathering: ${itemDisplay}`,
                    `Notice Check: ${rollDisplay} (need ${threshold}+)`
                ];
                if (specificCount === 0 && extraRolls.length === 0) {
                    outputLines.push(`No materials found (need ${threshold}+).`);
                } else {
                    if (specificCount > 0) {
                        outputLines.push(`${itemDisplay} x${specificCount}`);
                    }
                    extraRolls.forEach(function (loot) {
                        outputLines.push(`${loot.item.title || loot.item.name} x${loot.count}`);
                    });
                }

                const messageObject = new SystemInfoMessage(outputLines);
                messageObject.setSender(tokenTargetData.displayName || "Wuxing");
                WuxMessage.SendToSenderAndGM(messageObject, msg);
            });
        },

        // Applies a single meal's technique effects to one token's character sheet.
        applyMealToToken = function (msg, tokenTargetData, meal, technique, isSavory) {
            const surgeVar = WuxDef.GetVariable("Surge");
            const attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            const mealLabel = isSavory ? `Savoury ${meal.name}` : meal.name;
            const outputLines = [`${tokenTargetData.displayName} enjoys a ${mealLabel}`];

            attributeHandler.addFinishCallback(function (attrHandler) {
                technique.effects.iterate(function (effect) {
                    if (effect.target === "Surge" && effect.type === "Heal") {
                        const base = parseInt(effect.dVal) || 0;
                        const bonus = effect.formula.getValue(attrHandler);
                        const healAmount = base + bonus;
                        if (healAmount > 0) {
                            const current = attrHandler.parseInt(surgeVar, 0, false);
                            const max = attrHandler.parseInt(surgeVar, 0, true);
                            const newValue = Math.min(current + healAmount, max);
                            attrHandler.addUpdate(surgeVar, newValue);
                            const breakdown = bonus > 0 ? `${base} + ${bonus}` : `${base}`;
                            outputLines.push(`${tokenTargetData.displayName} gains ${Format.ShowTooltip(healAmount, breakdown)} Surge`);
                        }
                    } else if (effect.target === "Status" && effect.type === "Add") {
                        const defName = Format.GetDefinitionName("Status", effect.effect);
                        const statusDef = WuxDef.Get(defName);
                        if (statusDef && statusDef.presetStatus) {
                            if (statusDef.hasRanks) {
                                const rank = parseInt(effect.dVal) || 1;
                                attrHandler.addUpdate(statusDef.getVariable(), rank);
                                outputLines.push(`${tokenTargetData.displayName} gains ${statusDef.getTitle()} ${rank}`);
                            } else {
                                attrHandler.addUpdate(statusDef.getVariable(), "on");
                                outputLines.push(`${tokenTargetData.displayName} gains ${statusDef.getTitle()}`);
                            }
                        }
                    } else if (effect.target === "Status" && effect.type === "Remove") {
                        const defName = Format.GetDefinitionName("Status", effect.effect);
                        const statusDef = WuxDef.Get(defName);
                        if (statusDef && statusDef.presetStatus) {
                            attrHandler.addUpdate(statusDef.getVariable(), statusDef.hasRanks ? 0 : "");
                            outputLines.push(`${tokenTargetData.displayName} loses ${statusDef.getTitle()}`);
                        }
                    }
                });

                if (isSavory) {
                    const savorVar = WuxDef.GetVariable("Boon_Savor");
                    attrHandler.addUpdate(savorVar, "on");
                    outputLines.push(`${tokenTargetData.displayName} gains Savoury Boon`);
                }

                const messageObject = new SystemInfoMessage(outputLines);
                messageObject.setSender(tokenTargetData.displayName || "Wuxing");
                WuxMessage.SendToSenderAndGM(messageObject, msg);
            });

            attributeHandler.run();
        },

        // !givemeal <mealName>[|||savoury] — feeds a meal to each selected token.
        // If "savoury" is appended, also applies the Savoury Boon to each character.
        commandGiveMeal = function (msg, targets, content) {
            const parts    = content.split("|||");
            const mealName = parts[0] ? parts[0].trim() : "";
            const isSavory = parts[1] ? parts[1].trim().toLowerCase() === "savoury" : false;

            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected.`, null, { noarchive: true });
                return;
            }
            const meal = WuxItems.Get(mealName);
            if (meal == undefined) {
                sendChat("System", `/w GM Unknown meal: "${mealName}".`, null, { noarchive: true });
                return;
            }
            const technique = WuxTechs.Get(mealName);
            if (technique == undefined) {
                sendChat("System", `/w GM No technique found for meal: "${mealName}".`, null, { noarchive: true });
                return;
            }
            targets.forEach(function (tokenTargetData) {
                applyMealToToken(msg, tokenTargetData, meal, technique, isSavory);
            });
        },

        // ─── Cooking Event ───────────────────────────────────────────────────────────

        cookingSchemaVersion = "0.2.0",
        adventureSchemaVersion = "0.2.0",

        checkInstall = function () {
            if (!state.hasOwnProperty("WuxCookingEvent") || state.WuxCookingEvent.version !== cookingSchemaVersion) {
                state.WuxCookingEvent = {
                    version: cookingSchemaVersion,
                    active: false,
                    initiatorName: "",
                    ingredients: {},
                    tokens: {}
                };
            }
            if (!state.hasOwnProperty("WuxAdventureState") || state.WuxAdventureState.version !== adventureSchemaVersion) {
                state.WuxAdventureState = {
                    version: adventureSchemaVersion,
                    currentLocation: "",
                    waterSource: ""
                };
            }
        },

        // Removes items from a character's RepeatingFoods section.
        // itemCounts: { "Item Name": quantityToRemove, ... }
        deductGoodsFromCharacter = function (charId, itemCounts) {
            const nameField  = getGearField("ItemName");
            const countField = getGearField("ItemCount");
            const repeater   = new SandboxRepeatingSectionHandler("RepeatingFoods", charId);
            const prefix     = `${repeater.repeatingSection}_`;
            const nameSuffix = `_${nameField}`;

            const existingRowIds = {};
            findObjs({ _characterid: charId, _type: "attribute" })
                .forEach(function (a) {
                    const n = a.get("name");
                    if (n.startsWith(prefix) && n.endsWith(nameSuffix)) {
                        const rowId = n.slice(prefix.length, n.length - nameSuffix.length);
                        existingRowIds[a.get("current")] = rowId;
                    }
                });

            Object.keys(itemCounts).forEach(function (itemName) {
                const rowId = existingRowIds[itemName];
                if (rowId === undefined) return;
                const countAttrName = `${prefix}${rowId}_${countField}`;
                const countAttr = findObjs({ _characterid: charId, _type: "attribute", name: countAttrName })[0];
                if (countAttr) {
                    const current = parseInt(countAttr.get("current")) || 0;
                    countAttr.set("current", Math.max(0, current - itemCounts[itemName]));
                }
            });
        },

        // Returns a formatted ingredient list string for display. If viewerCharName is
        // given, that contributor's own name is shown as "You" instead of their name.
        formatIngredientList = function (viewerCharName) {
            const ingredients = state.WuxCookingEvent.ingredients;
            const entries = Object.values(ingredients);
            if (entries.length === 0) return "No ingredients";

            const groups = {};
            entries.forEach(function (ing) {
                const group = (WuxGoods.Get(ing.name) || {}).group || "Other";
                if (!groups[group]) groups[group] = [];
                groups[group].push(ing);
            });

            const groupNames = Object.keys(groups).sort();
            const sections = [];
            groupNames.forEach(function (group) {
                const ings = groups[group].sort(function (a, b) { return a.name.localeCompare(b.name); });
                const total = ings.reduce(function (sum, ing) { return sum + ing.quantity; }, 0);
                const lines = [`[${group}] (${total})`];
                ings.forEach(function (ing) {
                    const contributorName = viewerCharName != undefined && ing.charName === viewerCharName
                        ? "You" : ing.charName;
                    const entry = ing.quantity > 1
                        ? `${ing.name} x${ing.quantity} (${contributorName})`
                        : `${ing.name} (${contributorName})`;
                    lines.push(`  ${entry}`);
                });
                sections.push(lines.join("\n"));
            });
            return sections.join("\n\n");
        },

        // Returns the recipe name the cooking event currently predicts, defaulting to
        // Tasty Meal when there aren't enough ingredients contributed yet to predict one.
        getCurrentRecipeName = function () {
            const ingredients   = state.WuxCookingEvent.ingredients;
            const totalQuantity = Object.values(ingredients).reduce(function (sum, ing) { return sum + ing.quantity; }, 0);
            return totalQuantity > 0 ? predictMeal(ingredients) : "Tasty Meal";
        },

        // Returns the "Feeds: X (Y ingredients)" text for the cooking event's current ingredients.
        getFeedsText = function () {
            const ingredients   = state.WuxCookingEvent.ingredients;
            const totalQuantity = Object.values(ingredients).reduce(function (sum, ing) { return sum + ing.quantity; }, 0);
            const feeds         = Math.floor(totalQuantity / 5);
            return totalQuantity >= 5
                ? `Feeds: ${feeds} (${totalQuantity} ingredient${totalQuantity !== 1 ? "s" : ""})`
                : `Feeds: None (min 5 ingredients to cook)`;
        },

        // Returns the feeds text plus how many people are involved in the cooking event
        // and a reminder of how many more meals are needed for everyone to eat.
        getMealCountText = function () {
            const ingredients      = state.WuxCookingEvent.ingredients;
            const totalQuantity    = Object.values(ingredients).reduce(function (sum, ing) { return sum + ing.quantity; }, 0);
            const feeds            = Math.floor(totalQuantity / 5);
            const remainder        = totalQuantity % 5;
            const neededForNext    = remainder === 0 ? 5 : 5 - remainder;
            const participantCount = Object.keys(state.WuxCookingEvent.tokens).length;
            const stillNeeded      = Math.max(0, participantCount - feeds);

            return [
                getFeedsText(),
                `${neededForNext} more ingredient${neededForNext !== 1 ? "s" : ""} needed for another meal.`,
                "",
                `${participantCount} ${participantCount === 1 ? "person is" : "people are"} involved in this cooking event.`,
                stillNeeded > 0
                    ? `You need ${stillNeeded} more meal${stillNeeded !== 1 ? "s" : ""} for everyone to eat.`
                    : `You have enough meals for everyone to eat.`
            ].join("\n");
        },

        // Writes the current recipe (name + description) to a participating token's character sheet.
        applyActiveRecipeToToken = function (tokenTargetData) {
            const recipeName = getCurrentRecipeName();
            const recipeItem = WuxItems.Get(recipeName);
            const description = recipeItem && recipeItem.description ? recipeItem.description : "";

            const activeRecipeVar     = WuxDef.GetVariable("Gear_ActiveRecipe");
            const activeRecipeInfoVar = WuxDef.GetVariable("Gear_ActiveRecipe", WuxDef._info);

            setCharacterAttribute(tokenTargetData.charId, activeRecipeVar, recipeName);
            setCharacterAttribute(tokenTargetData.charId, activeRecipeInfoVar, description);
        },

        // Clears a participant's RepeatingCooking rows and empties the Active Meal data
        // (Gear_ActiveRecipe back to "0") so the Cooking Events section hides again.
        clearCookingDataForToken = function (participant) {
            clearCookingRows(participant.charId);

            const activeRecipeVar     = WuxDef.GetVariable("Gear_ActiveRecipe");
            const activeRecipeInfoVar = WuxDef.GetVariable("Gear_ActiveRecipe", WuxDef._info);

            setCharacterAttribute(participant.charId, activeRecipeVar, "0");
            setCharacterAttribute(participant.charId, activeRecipeInfoVar, "");
            setCharacterAttribute(participant.charId, WuxDef.GetVariable("Gear_CookingIsVisible"), "0");
        },

        // Shows/hides a character's RepeatingCooking rows (vs. a "None" placeholder)
        // depending on whether they currently have any contributed ingredients.
        updateCookingVisibility = function (charId) {
            const hasContributions = Object.values(state.WuxCookingEvent.ingredients)
                .some(function (ing) { return ing.charId === charId; });
            setCharacterAttribute(charId, WuxDef.GetVariable("Gear_CookingIsVisible"), hasContributions ? "on" : "0");
        },

        // Pushes the current predicted recipe (if changed), the meal count, and each
        // participant's personalized ingredient list to every character in the cooking event.
        broadcastCookingUpdate = function (recipeChanged) {
            const activeIngredientListVar = WuxDef.GetVariable("Gear_ActiveIngredientList");
            const mealCountVar            = WuxDef.GetVariable("Gear_MealCount");
            const mealCountText            = getMealCountText();
            Object.values(state.WuxCookingEvent.tokens).forEach(function (participant) {
                if (recipeChanged) {
                    applyActiveRecipeToToken(participant);
                }
                setCharacterAttribute(participant.charId, activeIngredientListVar, formatIngredientList(participant.charName));
                setCharacterAttribute(participant.charId, mealCountVar, mealCountText);
                updateCookingVisibility(participant.charId);
            });
        },

        // Returns a character's Cook skill value.
        getCookSkillValue = function (charId) {
            const cookSkillVar = WuxDef.GetVariable("Skill_Cook");
            const attributeHandler = new SandboxAttributeHandler(charId);
            attributeHandler.addMod(cookSkillVar);
            let cookMod = 0;
            attributeHandler.addFinishCallback(function (attrHandler) {
                cookMod = attrHandler.parseInt(cookSkillVar, 0, false);
            });
            attributeHandler.run();
            return cookMod;
        },

        // Writes each participant's Cook skill value to Gear_CookingScore, marking
        // whoever has the highest score (ties included) with "(You have the highest Cook skill)".
        updateCookingScores = function () {
            const participants = Object.values(state.WuxCookingEvent.tokens);
            if (participants.length === 0) return;

            const scores = participants.map(function (participant) {
                return { participant: participant, score: getCookSkillValue(participant.charId) };
            });
            const bestScore = scores.reduce(function (max, s) { return Math.max(max, s.score); }, -Infinity);

            const cookingScoreVar = WuxDef.GetVariable("Gear_CookingScore");
            scores.forEach(function (s) {
                const label = s.score === bestScore ? `${s.score} (You have the highest Cook skill)` : `${s.score}`;
                setCharacterAttribute(s.participant.charId, cookingScoreVar, label);
            });
        },

        commandViewCooking = function (msg) {
            if (!state.WuxCookingEvent.active) {
                sendChat("System", `/w "${msg.who}" No cooking event is in progress.`, null, { noarchive: true });
                return;
            }
            const ingredients   = state.WuxCookingEvent.ingredients;
            const hasIngredients = Object.keys(ingredients).length > 0;
            const totalQuantity = hasIngredients
                ? Object.values(ingredients).reduce(function (sum, ing) { return sum + ing.quantity; }, 0)
                : 0;
            const predicted     = hasIngredients ? predictMeal(ingredients) : null;
            const predictedItem = predicted ? WuxItems.Get(predicted) : null;

            const outputLines   = [
                predicted ? `Recipe: ${predicted}` : "",
                predictedItem && predictedItem.description ? predictedItem.description : "",
                `-------------------`,
                `Cooking contributions:`,
                hasIngredients ? formatIngredientList() : "No ingredients contributed yet.",
                `-------------------`,
                getMealCountText(),
                `[View Recipes](!viewrecipes)`,
                totalQuantity >= 5 ? `[Cook](!cook)` : ""
            ].filter(function (l) { return l !== ""; });
            const messageObject = new SystemInfoMessage(outputLines);
            messageObject.setSender("Wuxing");
            WuxMessage.SendToSender(messageObject, msg);
        },

        commandEndCooking = function (msg) {
            if (!playerIsGM(msg.playerid)) {
                sendChat("System", `/w "${msg.who}" Only GMs can end a cooking event.`, null, { noarchive: true });
                return;
            }
            if (!state.WuxCookingEvent.active) {
                sendChat("System", `/w GM No cooking event is in progress.`, null, { noarchive: true });
                return;
            }

            // Return every contributed ingredient to its owner's RepeatingFoods, as if each had been deleted.
            const returnByChar = {};
            Object.values(state.WuxCookingEvent.ingredients).forEach(function (ing) {
                if (!returnByChar[ing.charId]) returnByChar[ing.charId] = {};
                returnByChar[ing.charId][ing.name] = (returnByChar[ing.charId][ing.name] || 0) + ing.quantity;
            });
            Object.keys(returnByChar).forEach(function (charId) {
                addGoodsToCharacter(charId, returnByChar[charId]);
            });

            // Clear RepeatingCooking and reset the Active Recipe for every participant.
            Object.values(state.WuxCookingEvent.tokens).forEach(function (participant) {
                clearCookingDataForToken(participant);
            });

            state.WuxCookingEvent.active = false;
            state.WuxCookingEvent.initiatorName = "";
            state.WuxCookingEvent.ingredients = {};
            state.WuxCookingEvent.tokens = {};
            sendChat("System", `/w GM Cooking event ended. Ingredients cleared.`, null, { noarchive: true });
        },

        formatNameList = function (names) {
            if (names.length === 1) return names[0];
            if (names.length === 2) return `${names[0]} and ${names[1]}`;
            return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
        },

        commandSeeMaterials = function (msg) {
            const foodGroups    = ["Compound", "Fruit", "Protein", "Starch", "Sugar", "Supplement", "Vegetable"];
            const currentLocation = (state.WuxAdventureState || {}).currentLocation || "";
            const locationData    = currentLocation ? getLocationData(currentLocation) : null;
            const items           = locationData ? locationData.items.filter(function (item) {
                return foodGroups.indexOf(item.group) !== -1;
            }) : WuxGoods.Filter([new DatabaseFilterData("group", foodGroups)]);

            const grouped = {};
            foodGroups.forEach(function (g) { grouped[g] = []; });
            items.forEach(function (item) {
                if (grouped[item.group]) grouped[item.group].push(item);
            });

            const sections = foodGroups
                .filter(function (g) { return grouped[g].length > 0; })
                .map(function (g) {
                    const sorted  = grouped[g].sort(function (a, b) { return a.name.localeCompare(b.name); });
                    const recipes = WuxItems.Filter([new DatabaseFilterData("goodsComponents", g)]);
                    const recipeList = recipes.length > 0
                        ? `Used in Recipes: ${formatNameList(recipes.map(function (r) { return r.name; }))}`
                        : "";
                    const lines   = [`[${g}]`];
                    sorted.forEach(function (item) {
                        const suffix = recipeList ? ` — ${recipeList}` : "";
                        lines.push(`  ${item.name}${suffix}`);
                    });
                    return lines.join("\n");
                });

            const outputLines = [
                "Available Materials",
                sections.join("\n\n")
            ];
            const messageObject = new SystemInfoMessage(outputLines);
            messageObject.setSender("Wuxing");
            WuxMessage.SendToSender(messageObject, msg);
        },

        // !hunt — GM only. Rolls Notice (DC 7) then the best Athletic skill (DC 10) for each
        // selected token. On success picks a random AnimalType, rolls a loot table 3+2+1 times
        // (plus 1 per point over 10), and adds Protein items to RepeatingFoods and Animal Good
        // items to RepeatingGear.
        commandHunt = function (msg) {
            if (!playerIsGM(msg.playerid)) {
                sendChat("System", `/w "${msg.who}" Only GMs can initiate a hunt.`, null, { noarchive: true });
                return;
            }
            const targets = TokenReference.GetTokenTargetDataArray(msg);
            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected.`, null, { noarchive: true });
                return;
            }

            const animalTypes = WuxDef.Filter([new DatabaseFilterData("group", "AnimalType")]);
            if (animalTypes.length === 0) {
                sendChat("System", `/w GM No AnimalType definitions found.`, null, { noarchive: true });
                return;
            }

            const noticeVar    = WuxDef.GetVariable("Skill_Notice");
            const athleticDefs = WuxDef.Filter([new DatabaseFilterData("subGroup", "Athletics")]);

            _.each(targets, function (tokenTargetData) {
                const advantage = tokenTargetData.getAdvantage();

                const noticeDie   = new DieRoll();
                noticeDie.rollCheck(advantage);
                const athleticDie = new DieRoll();
                athleticDie.rollCheck(advantage);

                const attrHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                attrHandler.addMod(noticeVar);
                athleticDefs.forEach(function (skillDef) {
                    attrHandler.addMod(WuxDef.GetVariable(skillDef.name));
                });

                attrHandler.addFinishCallback(function (handler) {
                    const noticeMod   = handler.parseInt(noticeVar, 0, false);
                    noticeDie.addModToRoll(noticeMod);
                    const noticeTotal = noticeDie.total;
                    const noticeDisp  = Format.ShowTooltip(noticeTotal.toString(), noticeDie.message);

                    if (noticeTotal < 7) {
                        const out = new SystemInfoMessage([
                            `${tokenTargetData.displayName} — Hunting`,
                            `Notice Check: ${noticeDisp}`,
                            `No creatures found.`
                        ]);
                        out.setSender(tokenTargetData.displayName || "Wuxing");
                        WuxMessage.SendToSenderAndGM(out, msg);
                        return;
                    }

                    // Pick the athletic skill with the highest modifier.
                    let bestMod  = -Infinity;
                    let bestDef  = null;
                    athleticDefs.forEach(function (skillDef) {
                        const mod = handler.parseInt(WuxDef.GetVariable(skillDef.name), 0, false);
                        if (mod > bestMod) { bestMod = mod; bestDef = skillDef; }
                    });

                    athleticDie.addModToRoll(bestMod);
                    const athleticTotal = athleticDie.total;
                    const skillName     = bestDef ? bestDef.title : "Athletics";
                    const athleticDisp  = Format.ShowTooltip(athleticTotal.toString(), athleticDie.message);

                    if (athleticTotal < 10) {
                        const out = new SystemInfoMessage([
                            `${tokenTargetData.displayName} — Hunting`,
                            `Notice Check: ${noticeDisp}`,
                            `${skillName} Check: ${athleticDisp}`,
                            `Failed Hunt.`
                        ]);
                        out.setSender(tokenTargetData.displayName || "Wuxing");
                        WuxMessage.SendToSenderAndGM(out, msg);
                        return;
                    }

                    // Pick a random animal type and get its goods.
                    const animalDef    = animalTypes[Math.floor(Math.random() * animalTypes.length)];
                    const desc         = animalDef.getDescription("");
                    const locMatch     = desc.match(/location:([^|;]+)/);
                    const filterValues = locMatch
                        ? locMatch[1].split(",").map(function (s) { return s.trim(); }).filter(Boolean)
                        : [];
                    const animalGoods  = filterValues.length > 0
                        ? WuxGoods.Filter([new DatabaseFilterData("location", filterValues)])
                        : [];

                    if (animalGoods.length === 0) {
                        const out = new SystemInfoMessage([
                            `${tokenTargetData.displayName} — Hunting`,
                            `Notice Check: ${noticeDisp}`,
                            `${skillName} Check: ${athleticDisp}`,
                            `No loot items defined for ${animalDef.title}.`
                        ]);
                        out.setSender(tokenTargetData.displayName || "Wuxing");
                        WuxMessage.SendToSenderAndGM(out, msg);
                        return;
                    }

                    const pickItem = function () {
                        return animalGoods[Math.floor(Math.random() * animalGoods.length)];
                    };

                    // Roll 3 times granting 3, 2, 1. Each point over 10 = 1 bonus roll.
                    const itemCounts = {};
                    const addLoot = function (item, count) {
                        itemCounts[item.name] = (itemCounts[item.name] || 0) + count;
                    };
                    addLoot(pickItem(), 3);
                    addLoot(pickItem(), 2);
                    addLoot(pickItem(), 1);
                    const bonusRolls = athleticTotal - 10;
                    for (let i = 0; i < bonusRolls; i++) {
                        addLoot(pickItem(), 1);
                    }

                    // Route items by group to the correct repeating section.
                    const foodItems = {};
                    const gearItems = {};
                    Object.keys(itemCounts).forEach(function (itemName) {
                        const item  = WuxGoods.Get(itemName);
                        const group = item ? item.group : "";
                        if (group === "Protein") {
                            foodItems[itemName] = itemCounts[itemName];
                        } else if (group === "Animal Good") {
                            gearItems[itemName] = itemCounts[itemName];
                        }
                    });
                    if (Object.keys(foodItems).length > 0) addGoodsToCharacter(tokenTargetData.charId, foodItems);
                    if (Object.keys(gearItems).length > 0) addAnimalGoodToCharacter(tokenTargetData.charId, gearItems);

                    const outputLines = [
                        `${tokenTargetData.displayName} — Hunting: ${animalDef.title}`,
                        `Notice Check: ${noticeDisp}`,
                        `${skillName} Check: ${athleticDisp}`,
                        `Items obtained:`
                    ];
                    Object.keys(itemCounts).sort().forEach(function (itemName) {
                        const item    = WuxGoods.Get(itemName);
                        const display = item ? (item.title || item.name) : itemName;
                        outputLines.push(`  ${display} x${itemCounts[itemName]}`);
                    });

                    const out = new SystemInfoMessage(outputLines);
                    out.setSender(tokenTargetData.displayName || "Wuxing");
                    WuxMessage.SendToSenderAndGM(out, msg);
                });

                attrHandler.run();
            });
        },

        // !fish — GM only. Rolls the best Athletic skill (DC 8) for each selected token and
        // grants loot from items matching the current water source location. Requires a water
        // source to be set in state. The [Fish] button in Adventure Options is hidden when none
        // is set.
        commandFish = function (msg) {
            if (!playerIsGM(msg.playerid)) {
                sendChat("System", `/w "${msg.who}" Only GMs can initiate fishing.`, null, { noarchive: true });
                return;
            }
            const targets = TokenReference.GetTokenTargetDataArray(msg);
            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected.`, null, { noarchive: true });
                return;
            }

            const waterSource = (state.WuxAdventureState || {}).waterSource || "";
            if (!waterSource || waterSource === "No Water") {
                sendChat("System", `/w GM No water source is set.`, null, { noarchive: true });
                return;
            }

            const fishItems = WuxGoods.Filter([new DatabaseFilterData("location", [waterSource])]);
            if (fishItems.length === 0) {
                sendChat("System", `/w GM No items found for water source: ${waterSource}.`, null, { noarchive: true });
                return;
            }

            const tables        = buildLootTables(fishItems);
            const athleticDefs  = WuxDef.Filter([new DatabaseFilterData("subGroup", "Athletics")]);

            _.each(targets, function (tokenTargetData) {
                const advantage   = tokenTargetData.getAdvantage();
                const athleticDie = new DieRoll();
                athleticDie.rollCheck(advantage);

                const attrHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                athleticDefs.forEach(function (skillDef) {
                    attrHandler.addMod(WuxDef.GetVariable(skillDef.name));
                });

                attrHandler.addFinishCallback(function (handler) {
                    let bestMod = -Infinity;
                    let bestDef = null;
                    athleticDefs.forEach(function (skillDef) {
                        const mod = handler.parseInt(WuxDef.GetVariable(skillDef.name), 0, false);
                        if (mod > bestMod) { bestMod = mod; bestDef = skillDef; }
                    });

                    athleticDie.addModToRoll(bestMod);
                    const athleticTotal = athleticDie.total;
                    const skillName     = bestDef ? bestDef.title : "Athletics";
                    const athleticDisp  = Format.ShowTooltip(athleticTotal.toString(), athleticDie.message);

                    if (athleticTotal < 8) {
                        const out = new SystemInfoMessage([
                            `${tokenTargetData.displayName} — Fishing: ${waterSource}`,
                            `${skillName} Check: ${athleticDisp}`,
                            `No catch.`
                        ]);
                        out.setSender(tokenTargetData.displayName || "Wuxing");
                        WuxMessage.SendToSenderAndGM(out, msg);
                        return;
                    }

                    const rolls = [];
                    addRoll(rolls, athleticTotal, tables.allRarities, 8,  1, 3);
                    addRoll(rolls, athleticTotal, tables.allRarities, 10, 1, 2);
                    addRoll(rolls, athleticTotal, tables.allRarities, 12, 1, 2);
                    addRoll(rolls, athleticTotal, tables.allRarities, 14, 1, 2);

                    const itemCounts = {};
                    rolls.forEach(function (loot) {
                        itemCounts[loot.item.name] = (itemCounts[loot.item.name] || 0) + loot.count;
                    });

                    const foodItems = {};
                    const gearItems = {};
                    Object.keys(itemCounts).forEach(function (itemName) {
                        const item  = WuxGoods.Get(itemName);
                        const group = item ? item.group : "";
                        if (group === "Protein" || group === "Seafood") {
                            foodItems[itemName] = itemCounts[itemName];
                        } else if (group === "Animal Good") {
                            gearItems[itemName] = itemCounts[itemName];
                        }
                    });
                    if (Object.keys(foodItems).length > 0) addGoodsToCharacter(tokenTargetData.charId, foodItems);
                    if (Object.keys(gearItems).length > 0) addAnimalGoodToCharacter(tokenTargetData.charId, gearItems);

                    const outputLines = [
                        `${tokenTargetData.displayName} — Fishing: ${waterSource}`,
                        `${skillName} Check: ${athleticDisp}`,
                        `Items caught:`
                    ];
                    Object.keys(itemCounts).sort().forEach(function (itemName) {
                        const item    = WuxGoods.Get(itemName);
                        const display = item ? (item.title || item.name) : itemName;
                        outputLines.push(`  ${display} x${itemCounts[itemName]}`);
                    });

                    const out = new SystemInfoMessage(outputLines);
                    out.setSender(tokenTargetData.displayName || "Wuxing");
                    WuxMessage.SendToSenderAndGM(out, msg);
                });

                attrHandler.run();
            });
        },

        commandRest = function (msg) {
            if (!playerIsGM(msg.playerid)) {
                sendChat("System", `/w "${msg.who}" Only GMs can call a rest.`, null, { noarchive: true });
                return;
            }
            const targets = TokenReference.GetTokenTargetDataArray(msg);
            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected.`, null, { noarchive: true });
                return;
            }

            const surgeVar     = WuxDef.GetVariable("Surge");
            const exhaustedDef = WuxDef.Get("Stat_Exhausted");
            const restBoonVar  = WuxDef.GetVariable("Boon_Rest");

            const results = new Array(targets.length);
            let pending   = targets.length;

            targets.forEach(function (tokenTargetData, index) {
                const attrHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                attrHandler.addFinishCallback(function (handler) {
                    const surgeMax = handler.parseInt(surgeVar, 0, true);
                    handler.addUpdate(surgeVar, surgeMax);
                    if (exhaustedDef && exhaustedDef.presetStatus) {
                        handler.addUpdate(exhaustedDef.getVariable(), exhaustedDef.hasRanks ? 0 : "");
                    }
                    handler.addUpdate(restBoonVar, "on");

                    results[index] = { name: tokenTargetData.displayName, surgeMax: surgeMax };
                    pending--;

                    if (pending === 0) {
                        const nameList   = formatNameList(results.map(function (r) { return r.name; }));
                        const isSingle   = results.length === 1;
                        const outputLines = [
                            `${nameList} take${isSingle ? "s" : ""} a rest`
                        ];
                        results.forEach(function (r) {
                            outputLines.push(`${isSingle ? "" : `${r.name}: `}Surge restored to ${r.surgeMax}`);
                        });
                        outputLines.push("Exhaustion removed");
                        outputLines.push("Rest Boon granted");

                        const messageObject = new SystemInfoMessage(outputLines);
                        messageObject.setSender("Wuxing");
                        WuxMessage.SendToSenderAndGM(messageObject, msg);
                    }
                });
                attrHandler.run();
            });
        },

        formatComponentsForDisplay = function (componentsStr) {
            if (!componentsStr || componentsStr.trim() === "") return "5 Any";
            return componentsStr.split(";").map(function (part) {
                part = part.trim();
                if (!part) return "";
                const spaceIdx = part.indexOf(" ");
                const count    = part.substring(0, spaceIdx);
                const typeStr  = part.substring(spaceIdx + 1).trim();
                const display  = typeStr.indexOf("_") !== -1
                    ? typeStr.replace("_", " (") + ")"
                    : typeStr;
                return `${count} ${display}`;
            }).filter(Boolean).join(", ");
        },

        commandViewRecipes = function (msg) {
            const meals = getMeals();
            const sections = meals.map(function (meal) {
                const components = formatComponentsForDisplay(meal.components);
                const desc       = meal.description || "";
                return desc
                    ? `${meal.name}\n  ${desc}\n  Recipe: ${components}`
                    : `${meal.name}\n  Recipe: ${components}`;
            });
            const outputLines = [
                "Meal Recipes",
                sections.join("\n\n")
            ];
            const messageObject = new SystemInfoMessage(outputLines);
            messageObject.setSender("Wuxing");
            WuxMessage.SendToSender(messageObject, msg);
        },

        commandStartCooking = function (msg) {
            if (!playerIsGM(msg.playerid)) {
                sendChat("System", `/w "${msg.who}" Only GMs can start a cooking event.`, null, { noarchive: true });
                return;
            }

            const targets = TokenReference.GetTokenTargetDataArray(msg);
            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected. Select the tokens joining the cooking event first.`, null, { noarchive: true });
                return;
            }

            const wasActive = state.WuxCookingEvent.active;
            if (!wasActive) {
                state.WuxCookingEvent.active = true;
                state.WuxCookingEvent.initiatorName = msg.who;
                state.WuxCookingEvent.ingredients = {};
                state.WuxCookingEvent.tokens = {};
            }

            targets.forEach(function (tokenTargetData) {
                if (!state.WuxCookingEvent.tokens[tokenTargetData.charId]) {
                    state.WuxCookingEvent.tokens[tokenTargetData.charId] = {
                        charId: tokenTargetData.charId,
                        tokenId: tokenTargetData.tokenId,
                        charName: tokenTargetData.charName,
                        displayName: tokenTargetData.displayName
                    };
                }
                applyActiveRecipeToToken(tokenTargetData);
                updateCookingVisibility(tokenTargetData.charId);
                setCharacterAttribute(tokenTargetData.charId, WuxDef.GetVariable("Gear_ActiveIngredientList"), formatIngredientList(tokenTargetData.charName));
            });

            // Set once the full participant roster is known so the "people involved" count is accurate.
            const mealCountText = getMealCountText();
            Object.values(state.WuxCookingEvent.tokens).forEach(function (participant) {
                setCharacterAttribute(participant.charId, WuxDef.GetVariable("Gear_MealCount"), mealCountText);
            });

            updateCookingScores();

            const participantNames = Object.values(state.WuxCookingEvent.tokens)
                .map(function (t) { return t.displayName; });

            const outputLines = wasActive
                ? [
                    "Cooking Event Updated",
                    `Joined: ${formatNameList(targets.map(function (t) { return t.displayName; }))}`,
                    `Participants: ${formatNameList(participantNames)}`,
                    `[View Recipes](!viewrecipes)`
                ]
                : [
                    "Cooking Event Started",
                    `Participants: ${formatNameList(participantNames)}`,
                    `Add ingredients using your character sheet's Cook button on each item.`,
                    `When ready, use [Cook](!cook) to make the skill check.`,
                    `[View Recipes](!viewrecipes)`
                ];
            const messageObject = new SystemInfoMessage(outputLines);
            messageObject.setSender("Wuxing");
            WuxMessage.Send(messageObject);
        },

        // Content: "ingredientName|||inventoryCount|||charName"
        commandAddIngredient = function (msg, content) {
            if (!state.WuxCookingEvent.active) {
                sendChat("System", `/w "${msg.who}" No cooking event is in progress.`, null, { noarchive: true });
                return;
            }
            const parts          = content.split("|||");
            const ingredientName = parts[0] ? parts[0].trim() : "";
            const inventoryCount = parts[1] ? (parseInt(parts[1].trim()) || 0) : 0;
            const charName       = parts[2] ? parts[2].trim() : msg.who;

            if (!ingredientName) {
                sendChat("System", `/w "${msg.who}" Invalid ingredient.`, null, { noarchive: true });
                return;
            }

            const characters = findObjs({ _type: "character", name: charName });
            if (characters.length === 0) {
                return;
            }
            const charId = characters[0].id;

            if (getFoodsItemCount(charId, ingredientName) <= 0) {
                return;
            }

            const key           = `${ingredientName}:::${charName}`;
            const ingredients   = state.WuxCookingEvent.ingredients;
            const previousRecipe = getCurrentRecipeName();

            deductGoodsFromCharacter(charId, { [ingredientName]: 1 });

            if (ingredients[key]) {
                ingredients[key].quantity += 1;
                incrementCookingRowCount(charId, ingredients[key].rowId);
            } else {
                const itemGroup = (WuxGoods.Get(ingredientName) || {}).group || "";
                const rowId = createCookingRow(charId, ingredientName, itemGroup);
                ingredients[key] = {
                    name: ingredientName,
                    charName: charName,
                    charId: charId,
                    quantity: 1,
                    inventoryCount: inventoryCount,
                    rowId: rowId
                };
            }

            const recipeChanged = getCurrentRecipeName() !== previousRecipe;
            broadcastCookingUpdate(recipeChanged);
        },

        // Content: "ingredientName|||charName"
        commandRemoveIngredient = function (msg, content) {
            if (!state.WuxCookingEvent.active) {
                sendChat("System", `/w "${msg.who}" No cooking event is in progress.`, null, { noarchive: true });
                return;
            }
            const parts          = content.split("|||");
            const ingredientName = parts[0] ? parts[0].trim() : "";
            const charName       = parts[1] ? parts[1].trim() : msg.who;

            if (!ingredientName) {
                sendChat("System", `/w "${msg.who}" Invalid ingredient.`, null, { noarchive: true });
                return;
            }

            const characters = findObjs({ _type: "character", name: charName });
            if (characters.length === 0) {
                return;
            }
            const charId = characters[0].id;

            const key         = `${ingredientName}:::${charName}`;
            const ingredients = state.WuxCookingEvent.ingredients;
            const ingredient  = ingredients[key];
            if (!ingredient) {
                return;
            }

            const previousRecipe = getCurrentRecipeName();

            ingredient.quantity -= 1;
            decrementCookingRowCount(charId, ingredient.rowId);

            if (ingredient.quantity <= 0) {
                deleteCookingRow(charId, ingredient.rowId);
                delete ingredients[key];
            }

            addGoodsToCharacter(charId, { [ingredientName]: 1 });

            const recipeChanged = getCurrentRecipeName() !== previousRecipe;
            broadcastCookingUpdate(recipeChanged);
        },

        // Content: "ingredientName|||charName"
        // Removes an ingredient's entire contributed quantity from the cooking event and
        // returns all of it to the character's RepeatingFoods.
        commandDeleteIngredient = function (msg, content) {
            if (!state.WuxCookingEvent.active) {
                sendChat("System", `/w "${msg.who}" No cooking event is in progress.`, null, { noarchive: true });
                return;
            }
            const parts          = content.split("|||");
            const ingredientName = parts[0] ? parts[0].trim() : "";
            const charName       = parts[1] ? parts[1].trim() : msg.who;

            if (!ingredientName) {
                sendChat("System", `/w "${msg.who}" Invalid ingredient.`, null, { noarchive: true });
                return;
            }

            const characters = findObjs({ _type: "character", name: charName });
            if (characters.length === 0) {
                return;
            }
            const charId = characters[0].id;

            const key         = `${ingredientName}:::${charName}`;
            const ingredients = state.WuxCookingEvent.ingredients;
            const ingredient  = ingredients[key];
            if (!ingredient) {
                return;
            }

            const previousRecipe = getCurrentRecipeName();
            const removedQuantity = ingredient.quantity;

            deleteCookingRow(charId, ingredient.rowId);
            delete ingredients[key];

            addGoodsToCharacter(charId, { [ingredientName]: removedQuantity });

            const recipeChanged = getCurrentRecipeName() !== previousRecipe;
            broadcastCookingUpdate(recipeChanged);
        },

        parseComponentRequirements = function (componentsStr) {
            const requirements = {};
            componentsStr.split(";").forEach(function (part) {
                part = part.trim();
                if (!part) return;
                const spaceIdx = part.indexOf(" ");
                const count    = parseInt(part.substring(0, spaceIdx));
                const typeStr  = part.substring(spaceIdx + 1).trim();
                // "Supplement_Energy" → "Supplement:Energy"
                const typeKey  = typeStr.indexOf("_") !== -1 ? typeStr.replace("_", ":") : typeStr;
                requirements[typeKey] = (requirements[typeKey] || 0) + count;
            });
            return requirements;
        },

        buildIngredientTypeCounts = function (ingredients) {
            const counts = {};
            Object.values(ingredients).forEach(function (ing) {
                const goods = WuxGoods.Get(ing.name);
                if (goods && goods.group && goods.group !== "") {
                    // Count by plain group (e.g. "Supplement")
                    counts[goods.group] = (counts[goods.group] || 0) + ing.quantity;
                    // Also count by group:category for subcategory requirements
                    if (goods.category && goods.category !== "") {
                        const subKey = `${goods.group}:${goods.category}`;
                        counts[subKey] = (counts[subKey] || 0) + ing.quantity;
                    }
                }
            });
            return counts;
        },

        matchesMealRecipe = function (typeCounts, totalQuantity, requirements) {
            for (const typeKey in requirements) {
                if (typeKey === "Any") continue;
                const required = requirements[typeKey];
                const actual   = typeCounts[typeKey] || 0;
                if (actual * 5 < required * totalQuantity) return false;
            }
            return true;
        },

        predictMeal = function (ingredients) {
            const totalQuantity = Object.values(ingredients).reduce(function (sum, ing) { return sum + ing.quantity; }, 0);
            if (totalQuantity === 0) return "No ingredients";
            const typeCounts = buildIngredientTypeCounts(ingredients);
            const meals = getMeals();
            for (let i = 0; i < meals.length; i++) {
                const m = meals[i];
                if (m.name === "Bland Meal" || m.name === "Tasty Meal") continue;
                if (!m.components || m.components.trim() === "" || m.components.trim() === "5 Any") continue;
                const recipe = parseComponentRequirements(m.components);
                if (matchesMealRecipe(typeCounts, totalQuantity, recipe)) return m.name;
            }
            return "Tasty Meal";
        },

        // Content (optional): a character name — used by each character's own "Cook Meal"
        // sheet button so any participant can trigger the cook as themselves. When omitted,
        // falls back to the classic GM/selected-token flow.
        commandCook = function (msg, content) {
            const charName = content ? content.trim() : "";
            if (!charName && !playerIsGM(msg.playerid)) {
                sendChat("System", `/w "${msg.who}" Only GMs can trigger the cook.`, null, { noarchive: true });
                return;
            }
            if (!state.WuxCookingEvent.active) {
                sendChat("System", `/w GM No cooking event is in progress.`, null, { noarchive: true });
                return;
            }
            const ingredients = state.WuxCookingEvent.ingredients;
            if (Object.keys(ingredients).length === 0) {
                sendChat("System", `/w GM No ingredients have been added.`, null, { noarchive: true });
                return;
            }

            const cookTarget   = charName
                ? TargetReference.GetTargetDataByName(charName)
                : (function () {
                    const targets = TokenReference.GetTokenTargetDataArray(msg);
                    return targets.length > 0 ? targets[0] : null;
                })();
            const cookSkillVar = WuxDef.GetVariable("Skill_Cook");
            const cookCharId   = cookTarget ? cookTarget.charId : null;

            const performCook = function (cookMod, cookName) {
                const roll = new DieRoll();
                roll.rollSkillCheck(0, cookMod);

                const isBland  = roll.total < 9;
                const hasSavor = roll.total >= 12;

                const totalQuantity = Object.values(ingredients).reduce(function (sum, ing) { return sum + ing.quantity; }, 0);
                const feeds = Math.floor(totalQuantity / 5);

                const cookedMealName = isBland ? "Bland Meal" : predictMeal(ingredients);
                const mealLabel      = hasSavor ? `Savoury ${cookedMealName}` : cookedMealName;

                // Deduct ingredients from each character's supplies
                const deductByChar = {};
                Object.keys(ingredients).forEach(function (key) {
                    const ing = ingredients[key];
                    if (!deductByChar[ing.charName]) deductByChar[ing.charName] = {};
                    deductByChar[ing.charName][ing.name] = (deductByChar[ing.charName][ing.name] || 0) + ing.quantity;
                });
                Object.keys(deductByChar).forEach(function (charName) {
                    const chars = findObjs({ _type: "character", name: charName });
                    if (chars.length > 0) {
                        deductGoodsFromCharacter(chars[0].id, deductByChar[charName]);
                    }
                });

                Object.values(state.WuxCookingEvent.tokens).forEach(function (participant) {
                    clearCookingDataForToken(participant);
                });

                state.WuxCookingEvent.active = false;
                state.WuxCookingEvent.initiatorName = "";
                state.WuxCookingEvent.ingredients = {};
                state.WuxCookingEvent.tokens = {};

                const rollDisplay = Format.ShowTooltip(roll.total, roll.message);
                const giveMealCmd = hasSavor
                    ? `[Give Meal](!givemeal ${cookedMealName}|||savoury)`
                    : `[Give Meal](!givemeal ${cookedMealName})`;
                const outputLines = [
                    `${cookName} cooks a meal`,
                    `Cook Check: ${rollDisplay}`,
                    `Created a ${mealLabel} for ${feeds}`,
                    giveMealCmd
                ];

                const messageObject = new SystemInfoMessage(outputLines);
                messageObject.setSender(cookName || "Wuxing");
                WuxMessage.Send(messageObject);
            };

            if (cookCharId) {
                const attributeHandler = new SandboxAttributeHandler(cookCharId);
                attributeHandler.addMod(cookSkillVar);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    const cookMod = attrHandler.parseInt(cookSkillVar, 0, false);
                    performCook(cookMod, cookTarget.displayName);
                });
                attributeHandler.run();
            } else {
                performCook(0, state.WuxCookingEvent.initiatorName);
            }
        },

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!adventureoptions":
                    commandAdventureOptions(msg, content);
                    break;
                case "!gather":
                    commandGather(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!gathermaterial": {
                    const parts    = content.split("@@@");
                    const location = parts[0] ? parts[0].trim() : "";
                    const itemName = parts[1] ? parts[1].trim() : "";
                    commandGatherSpecific(msg, TokenReference.GetTokenTargetDataArray(msg), location, itemName);
                    break;
                }
                case "!givemeal":
                    commandGiveMeal(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!startcooking":
                    commandStartCooking(msg);
                    break;
                case "!addingredient":
                    commandAddIngredient(msg, content);
                    break;
                case "!removeingredient":
                    commandRemoveIngredient(msg, content);
                    break;
                case "!deleteingredient":
                    commandDeleteIngredient(msg, content);
                    break;
                case "!cook":
                    commandCook(msg, content);
                    break;
                case "!viewcooking":
                    commandViewCooking(msg);
                    break;
                case "!endcooking":
                    commandEndCooking(msg);
                    break;
                case "!viewrecipes":
                    commandViewRecipes(msg);
                    break;
                case "!rest":
                    commandRest(msg);
                    break;
                case "!seematerials":
                    commandSeeMaterials(msg);
                    break;
                case "!hunt":
                    commandHunt(msg);
                    break;
                case "!fish":
                    commandFish(msg);
                    break;
            }
        };

    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput
    };
}());
