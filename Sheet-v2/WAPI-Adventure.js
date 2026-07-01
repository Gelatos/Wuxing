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

    // Returns [{item, count}] for each roll unlocked by the dice result.
    // Roll 1 (≥7): base 2, cap at +5 over threshold
    // Roll 2 (≥9): base 1, cap at +5 over threshold
    // Roll 3 (≥12): base 1, cap at +3 over threshold
    // Roll 4 (≥15, rarity 2+): base 1, cap at +3 over threshold
    // Roll 5 (≥18, rarity 2+): base 1, cap at +3 over threshold
    const resolveLoot = function (result, tables) {
        const rolls = [];

        const addRoll = function (table, threshold, base, cap) {
            if (result < threshold) return;
            const item = pickFromTable(table);
            if (item == null) return;
            const count = base + Math.min(result - threshold, cap);
            rolls.push({ item: item, count: count });
        };

        addRoll(tables.allRarities, 7,  2, 5);
        addRoll(tables.allRarities, 9,  1, 5);
        addRoll(tables.allRarities, 12, 1, 3);
        addRoll(tables.rarity2Plus, 15, 1, 3);
        addRoll(tables.rarity2Plus, 18, 1, 3);

        return rolls;
    };

    // ─── RepeatingGear (Goods) ──────────────────────────────────────────────────

    // Goods are stored in repeating_gear with ItemMainGroup = "Goods".
    // Field names mirror the getGearVariable helper in Worker-Gear.js.
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
                const rowId    = repeater.generateRowId();
                const itemGroup   = item != undefined ? (item.group || "") : "";
                const itemBulk    = item != undefined ? (item.bulk  || "") : "";
                const itemCategory= item != undefined ? (item.category || "") : "";
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${nameField}`,      current: itemName });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${countField}`,     current: count });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${visibleField}`,   current: "on" });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${groupField}`,     current: "Goods" });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${itemGroupField}`, current: itemGroup });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${bulkField}`,      current: itemBulk });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${subGroupField}`,  current: itemCategory });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${buyInfoField}`,   current: buyLabel });
                createObj("attribute", { _characterid: charId, name: `${prefix}${rowId}_${buyBulkInfoField}`, current: buyBulkLabel });
            }
        });
    };

    // ─── Commands ───────────────────────────────────────────────────────────────

    var
        // !gatheroptions — whispers a clickable [Gather Materials] button to the sender.
        commandShowOptions = function (msg) {
            const locationTypes = WuxDef.Filter(new DatabaseFilterData("group", "LocationType"));
            const options = locationTypes.map(function (lt) { return lt.title; }).join("|");
            const output  = `[Gather Materials](!gather ?{Choose Location|${options}})`;
            const messageObject = new SystemInfoMessage(output);
            messageObject.setSender("Wuxing");
            WuxMessage.SendToSender(messageObject, msg);
        },

        // !gather <LocationTitle> — rolls Notice for each selected token and grants loot.
        commandGather = function (msg, targets, locationTitle) {
            if (targets.length === 0) {
                sendChat("System", `/w GM No tokens selected for gathering.`, null, { noarchive: true });
                return;
            }

            // Match the chosen title to a LocationType definition.
            const locationTypes = WuxDef.Filter(new DatabaseFilterData("group", "LocationType"));
            let locationDef = null;
            for (let i = 0; i < locationTypes.length; i++) {
                if (locationTypes[i].title.toLowerCase() === locationTitle.trim().toLowerCase()) {
                    locationDef = locationTypes[i];
                    break;
                }
            }
            if (locationDef == null) {
                sendChat("System", `/w GM Unknown location: "${locationTitle}".`, null, { noarchive: true });
                return;
            }

            // Parse location filter values from description, e.g. "location:Coastal, Any".
            const desc = locationDef.getDescription("");
            let filterValues = [];
            const match = desc.match(/location:([^|;]+)/);
            if (match) {
                filterValues = match[1].split(",").map(function (s) { return s.trim(); }).filter(function (s) { return s !== ""; });
            }
            if (filterValues.length === 0) {
                sendChat("System", `/w GM No filter defined for ${locationDef.title}.`, null, { noarchive: true });
                return;
            }

            // Get all goods that match this location.
            const items = WuxGoods.Filter([new DatabaseFilterData("location", filterValues)]);
            if (items.length === 0) {
                sendChat("System", `/w GM No items found for location: ${locationDef.title}.`, null, { noarchive: true });
                return;
            }

            const tables    = buildLootTables(items);
            const noticeVar = WuxDef.GetVariable("Skill_Notice");

            _.each(targets, function (tokenTargetData) {
                const advantage = tokenTargetData.getAdvantage();
                const dieRoll   = new DieRoll();
                dieRoll.rollCheck(advantage);
                const noticeRoll = new DieRoll(dieRoll);

                const attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                attributeHandler.addMod(noticeVar);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    const noticeMod = attrHandler.parseInt(noticeVar, 0, false);
                    noticeRoll.addModToRoll(noticeMod);
                    const result = noticeRoll.total;

                    const lootRolls = resolveLoot(result, tables);

                    // Accumulate item counts (multiple rolls can give the same item).
                    const itemCounts = {};
                    lootRolls.forEach(function (loot) {
                        const name = loot.item.name;
                        itemCounts[name] = (itemCounts[name] || 0) + loot.count;
                    });

                    if (Object.keys(itemCounts).length > 0) {
                        addGoodsToCharacter(tokenTargetData.charId, itemCounts);
                    }

                    // Build result message (SystemInfoMessage handles array: element 0 = title).
                    const rollDisplay  = Format.ShowTooltip(result.toString(), noticeRoll.message);
                    const outputLines  = [
                        `${tokenTargetData.displayName} — Gathering: ${locationDef.title}`,
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
                attributeHandler.run();
            });
        },

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!gatheroptions":
                    commandShowOptions(msg);
                    break;
                case "!gather":
                    commandGather(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
            }
        };

    return {
        HandleInput: handleInput
    };
}());
