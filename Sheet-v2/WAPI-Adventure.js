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
        addRoll(rolls, result, tables.allRarities, 8,  2, 5);
        addRoll(rolls, result, tables.allRarities, 10, 1, 5);
        addRoll(rolls, result, tables.allRarities, 12, 1, 3);
        addRoll(rolls, result, tables.rarity2Plus, 15, 1, 3);
        addRoll(rolls, result, tables.rarity2Plus, 18, 1, 3);
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

    // ─── RepeatingFoods (Goods) ─────────────────────────────────────────────────

    const getGearField = function (attributeKey) {
        return WuxDef.Get("Gear").getVariable("-" + WuxDef.GetVariable(attributeKey));
    };

    const addGoodsToCharacter = function (charId, itemCounts) {
        const repeater      = new SandboxRepeatingSectionHandler("RepeatingFoods", charId);
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
            const buyLabel     = WuxDef.Get("Gear_Buy").getTitle(`1 (${itemValue}J)`);
            const buyBulkLabel = WuxDef.Get("Gear_BuyBulk").getTitle(`10 (${itemValue * 10}J)`);

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
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${groupField}`,       current: "Goods" });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${itemGroupField}`,   current: itemGroup });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${bulkField}`,        current: itemBulk });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${subGroupField}`,    current: itemCategory });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${buyInfoField}`,     current: buyLabel });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${buyBulkInfoField}`, current: buyBulkLabel });
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

    // ─── Commands ───────────────────────────────────────────────────────────────

    var
        // !adventureoptions <location> — whispers the Adventure Options window.
        commandAdventureOptions = function (msg, locationTitle) {
            const locationData = getLocationData(locationTitle);
            const outputLines  = [
                "Adventure Options",
                `[Gather Materials (Any)](!gather ${locationTitle})`
            ];

            if (locationData != null && locationData.items.length > 0) {
                const itemOptions = locationData.items
                    .map(function (i) { return i.title || i.name; })
                    .join("|");
                outputLines.push(`[Gather Material](!gathermaterial ${locationTitle}@@@?{Choose Item|${itemOptions}})`);
            }

            const messageObject = new SystemInfoMessage(outputLines);
            messageObject.setSender("Wuxing");
            WuxMessage.SendToSender(messageObject, msg);
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
                    addGoodsToCharacter(tokenTargetData.charId, itemCounts);
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
                    addGoodsToCharacter(tokenTargetData.charId, itemCounts);
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
            }
        };

    return {
        HandleInput: handleInput
    };
}());
