// ======= Messaging
// =================================================

function SendChatMessageToTargets(content, sendTarget) {

    // send the message to each target
    if (sendTarget != undefined) {
        let sentPublic = false;
        sendTarget = sendTarget.split(',');
        _.each(sendTarget, function(target) {
            if (target == "") {
                if (!sentPublic) {
                    sentPublic = true;
                    sendChat("Wuxing Manager", content);
                }
            }
            else {
                sendChat("Wuxing Manager", "/w " + target + " " + content, null, {noarchive:true});
            }
        });
    }
}

function SendSystemMessage(sceneMessages, sendTarget) {

    if (sceneMessages.length > 0) {
        SendChatMessageToTargets(GetFormattedMessage("s", ParseSceneMessages(sceneMessages)), sendTarget);
    }
}

function SendDmAlertMessage(sceneMessages) {

    if (sceneMessages.length > 0) {
        SendChatMessageToTargets(GetFormattedMessage("dmAlert", ParseSceneMessages(sceneMessages)), "GM");
    }
}

function SendCombatTrackerMessage(title, image, content, sendTarget) {

    let message = "<div class='sheet-rolltemplate-combatTracker'> \
        <div>&nbsp;</div> \
        <div class='sheet-container'> \
            <table> \
                <tr> \
                    <td class='sheet-tokenimageContainer'>\
                        <img class='sheet-tokenimage' src='" + image + "' width='50px' height='50px'  /> \
                    </td> \
                    <td style='padding-left: 5px;'><span class='sheet-wuxTemplateHeader'>" + title + "</span></td> \
                </tr> \
            </table> \
            <div class='sheet-templateBackground' style='overflow: hidden'> " + content + "</div> \
        </div> \
    </div>";
    SendChatMessageToTargets(message, sendTarget);
}

function ParseSceneMessages(sceneMessages) {
    // create the output message
    let content = "";
    _.each(sceneMessages, function(message) {
        if (message != "") {
            content += message + "<br />";
        }
    });
    return content;
}

function GetCharactersListFromTargetsMessage(targets) {

    // iterate through targets
    let characters = "";
    for (let i = 0; i < targets.length; i++) {
        
        // add character display output
        if (i > 0 && targets.length > 2) {
            characters += ", ";
        }
        if (i == targets.length - 1 && targets.length > 1) {
            if (targets.length == 2) {
                characters += " ";
            }
            characters += "and ";
        }
        characters += targets[i].displayName;
    };

    return characters;
}


// ======= On Kill Functions
// =================================================

function CommandDeathSave(content) {

    let contentSplit = content.split("@@");
    let targetData = GetActorTargetData(contentSplit[0])[0];
    let output = `<div class="sheet-title" style="width: 270px;">[${targetData.displayName}] Death Save</div>`;

    // grab successes
    let successesObj = GetCharacterAttribute(targetData.charId, "deathSaveSuccess");
    let successes = successesObj.get("current");
    successes = isNaN(parseInt(successes)) ? 0 : parseInt(successes);

    // make check
    let rng = randomInteger(20);
    let bonus = contentSplit[1];
    bonus = isNaN(parseInt(bonus)) ? 0 : parseInt(bonus);
    output += `<div>Death Save Roll: [${rng + bonus}]</div>
    `;
    if ((rng + bonus) >= 10) {
        if (rng == 20) {
            successes = 5;
        }
        else if (successes < 5) {
            successes++;
            successesObj.set("current", successes);
        }
        output += `<div>Success!</div>`;
        if (successes >= 5) {
            output += `<div>${targetData.displayName} has stabilized!</div>`;
        }
        else {
            output += `<div>Death Track successes: ${successes}</div>`;
        }
    }
    else {
        let failureObj = GetCharacterAttribute(targetData.charId, "deathSaveFailure");
        let failures = failureObj.get("current");
        failures = isNaN(parseInt(failures)) ? 0 : parseInt(failures);
        if (failures < 5) {
            failures++;
            failureObj.set("current", failures);
        }

        let vitality = 10;
        if (successes < 5) {
            let vitalityObj = GetCharacterAttribute(targetData.charId, "vitality");
            vitality = vitalityObj.get("current");
            vitality = isNaN(parseInt(vitality)) ? 0 : parseInt(vitality);
            if (vitality > 0) {
                vitality--;
                vitalityObj.set("current", vitality);
            }
        }

        output += `<div>Failure.</div>`;
        if (failures >= 5 || vitality <= 0) {
            output += `<div>${targetData.displayName} has died.</div>`;
        } 
        else {
            output += `<div>Death Track failures: ${failures}</div>${vitality < 10 ? `<div>Vitality: ${vitality}</div>` : ""}`;
        }
    }

    sendChat("CombatMaster", GetFormattedMessage("si", output));
}

function CommandDeathFailure(content) {
    let targetData = GetActorTargetData(content)[0];
    let output = `<div class="sheet-title" style="width: 270px;">[${targetData.displayName}] Death Track Failure</div>`;

    // grab successes
    let successesObj = GetCharacterAttribute(targetData.charId, "deathSaveSuccess");
    let successes = successesObj.get("current");
    successes = isNaN(parseInt(successes)) ? 0 : parseInt(successes);
    
    let failureObj = GetCharacterAttribute(targetData.charId, "deathSaveFailure");
    let failures = failureObj.get("current");
    failures = isNaN(parseInt(failures)) ? 0 : parseInt(failures);
    if (failures < 5) {
        failures++;
        failureObj.set("current", failures);
    }

    let vitality = 10;
    if (successes < 5) {
        let vitalityObj = GetCharacterAttribute(targetData.charId, "vitality");
        vitality = vitalityObj.get("current");
        vitality = isNaN(parseInt(vitality)) ? 0 : parseInt(vitality);
        if (vitality > 0) {
            vitality--;
            vitalityObj.set("current", vitality);
        }
    }

    if (failures >= 5 || vitality <= 0) {
        output += `<div>${targetData.displayName} has died.</div>`;
    } 
    else {
        output += `<div>Death Track failures: ${failures}</div>${vitality < 10 ? `<div>Vitality: ${vitality}</div>` : ""}`;
    }

    sendChat("CombatMaster", GetFormattedMessage("si", output));
}

function GetRandomDrop(character) {

    // get the number of random drops
    var partyManager = FindCharacter("PartyManager");
    var dropCount = Number(getAttrByName(character.id, "drop_rate"));

    // if we got any drops, get some drops
    if (dropCount > 0) {

        // get the number of items available
        var itemIndexCount = 0;
        var itemTotal = 0;
        var dropTableCounts = [];
        var dropTableTypes = [];

        // iterate through the inventory and grab data
        while (getAttrByName(character.id, "repeating_inventory_$" + itemIndexCount + "_itemname") != "") {
            itemTotal += Number(getAttrByName(character.id, "repeating_inventory_$" + itemIndexCount + "_itemcount"));
            log(itemTotal);
            dropTableCounts.push(itemTotal);
            dropTableTypes.push(getAttrByName(character.id, "repeating_inventory_$" + itemIndexCount + "_itemname") + " (" + getAttrByName(character.id, "repeating_inventory_$" + itemIndexCount + "_itemweight") + " lbs)");

            // increment the incrementer
            itemIndexCount++;
        }

        // get the current list of items
        var treasuryObj = GetCharacterAttribute(partyManager.get("_id"), "notes");
        var itemTypes = [];
        var itemCounts = [];
        if (treasuryObj != undefined) {
            itemTypes = treasuryObj.get("current").split(",");
        }
        for (var i = 0; i < itemTypes.length; i++) {
            var item = itemTypes[i].trim();
            var firstSplitIndex = item.indexOf(" ");
            itemCounts.push(Number(item.substr(0, firstSplitIndex).trim()));
            itemTypes[i] = item.substr(firstSplitIndex).trim();
        }

        // get the guaranteed drops
        var guaranteedDrop = getAttrByName(character.id, "guarantee_drop") + " (" + getAttrByName(character.id, "guaranteed_weight") + " lbs)";
        if (guaranteedDrop != "") {

            var dropAmt = 0;
            var dropTable = getAttrByName(character.id, "guaranteed_count").split("-");
            if (dropTable.length > 1) {
                dropAmt = Math.floor(Math.random() * Number(dropTable[1])) + Number(dropTable[0].trim());
            } else {
                dropAmt = Number(dropTable[0].trim());
            }

            // check if the item is already in the treasury
            var updated = false;
            for (var k = 0; k < itemTypes.length; k++) {
                if (itemTypes[k] == guaranteedDrop) {

                    // found the item. Update the count
                    itemCounts[k] += dropAmt;
                    updated = true;
                    break;
                }
            }

            if (!updated) {
                // The item didn't exist. add it
                itemTypes.push(guaranteedDrop);
                itemCounts.push(dropAmt);
            }
        }

        // now grab some drops
        for (var i = 0; i < dropCount; i++) {

            // grab a random index within range
            var randomItemIndex = Math.floor(Math.random() * itemTotal);

            // iterate through the item drop table
            for (var j = 0; j < dropTableCounts.length; j++) {

                // got the item
                if (randomItemIndex < dropTableCounts[j]) {

                    // check if the item is already in the treasury
                    var updated = false;
                    for (var k = 0; k < itemTypes.length; k++) {
                        if (itemTypes[k] == dropTableTypes[j]) {

                            // found the item. Update the count
                            itemCounts[k]++;
                            updated = true;
                            break;
                        }
                    }

                    if (!updated) {
                        // The item didn't exist. add it
                        itemTypes.push(dropTableTypes[j]);
                        itemCounts.push(1);
                    }
                    break;
                }
            }
        }

        // output the new item list
        if (itemCounts.length > 0 && treasuryObj != undefined) {
            var output = "";
            for (var i = 0; i < itemTypes.length; i++) {
                if (output != "") {
                    output += ", ";
                }
                if (itemCounts[i] != 0) {
                    output += itemCounts[i] + " " + itemTypes[i];
                }
            }

            treasuryObj.set("current", output);
        }
    }

}


// ======= Stat Roll Functions
// =================================================

function CommandRollStats(rollData) {

    // split the data
    var previousRolls = rollData.split(",");
    var rollType = 4;

    // get the rolls
    var rolls = [];
    if (previousRolls.length <= 1) {

        if (previousRolls[0] != "") {
            rollType = Math.abs(Number(previousRolls[0]));
        }

        // new set of rolls. Time to get dice
        for (var i = 0; i < 6; i++) {
            rolls[i] = Roll4d6DropLowest();
        }
    } else {
        rollType = Number(previousRolls[0]);

        // determine what to do with these values
        if (rollType == 0) {
            rolls[0] = Number(previousRolls[1]);
        } else {
            rolls[0] = Roll4d6DropLowest();
        }

        // get the rest of the numbers
        for (var i = 1; i < previousRolls.length; i++) {
            rolls[i] = Number(previousRolls[i + 1]);
        }
    }

    // now determine how we output this data
    var output = "";
    if (rollType == 0) {
        // final roll
        output += "Stat Roll: Final Stats /";
        for (var i = 0; i < 5; i++) {
            output += rolls[i] + ", ";
        }
        output += rolls[5];
        output += "/ Add 1 to two separate values and these will be your final stats after racial modifiers.";
    } else {
        var newRerollCount = Number(rollType) - 1;

        // print the intro
        output += "Stat Roll /";
        output += rollType + " rerolls remaining /";
        output += "Your rolls are displayed on the section below. /";
        output += "You have a number of rerolls displayed above. /";
        output += "Any reroll must be kept. /";
        output += "Press a number to reroll that value /";
        output += "or select 'reroll all' or 'keep' /";

        // make a button for each value
        for (var i = 0; i < 6; i++) {

            // begin the button
            output += "[" + rolls[i] + "](!rollstats ";
            output += newRerollCount + ",";
            output += rolls[i] + ",";

            // get the rest of the values
            for (var j = 0; j < 6; j++) {
                if (j != i) {
                    output += rolls[j] + ",";
                }
            }
            output += ")";
        }

        // make the reroll all button
        output += "/ [Reroll All](!rollstats -" + newRerollCount + ") ";

        // make the keep button
        output += "[Keep](!rollstats 0,";
        for (var i = 0; i < 5; i++) {
            output += rolls[i] + ",";
        }
        output += rolls[5] + ")";
    }

    SendFormattedMessage("Stat Roll Manager", "h", output, false);
}

function Roll4d6DropLowest() {

    var rolls = RollMultipleDice(4, 6);

    // sort the dice
    rolls.sort();
    rolls.reverse();

    // now total and return
    var result = rolls[0] + rolls[1] + rolls[2];
    return result;
}

function RollMultipleDice(quantity, dieType) {

    var rolls = [];

    // get 3 dice
    var k = 0;
    var outputString = "";
    for (k = 0; k < quantity; k++) {
        rolls[k] = Math.ceil(Math.random() * dieType);
        outputString += " + " + rolls[k];
    }

    return rolls;
}


// ======= Token Functions
// =================================================

function SetToken(tokens, options, tokenType) {
    
    // iterate through the selected tokens
    if (Array.isArray(tokens) && tokens.length > 0) {

        let token = {};
        let tokenStatusMarkers = "";
        let element = "";
        let charId;

        let npcNationality = "";
        let generatorNpcNationality = "";
        let npcGender = "";
        let npcRace = "";
        let npcNature = "";
        
        let tokenName = "";
        let hp = "";
        let br = "";

        if (tokenType == "Generic") {
            let partyManager = FindCharacter("PartyManager");
            generatorNpcNationality = getAttrByName(partyManager.get("_id"), "generatorNewNationality");
            if (generatorNpcNationality == undefined || generatorNpcNationality == "" || generatorNpcNationality == "?") {
                generatorNpcNationality = CharacterNationalityGenerator();
            }
        }

        _.each(tokens, function (obj) {
            
            // set token variables
            token = getObj('graphic', obj._id);

            if (token != undefined) {
                charId = token.get("represents");
                element = "";
                tokenName = "";

                if (tokenType == "Generic") {
                    tokenStatusMarkers = token.get("statusmarkers").split(",");
                    
                    // get current token status
                    for (var i = 0; i < tokenStatusMarkers.length; i++) {
                        
                        if (tokenStatusMarkers[i].indexOf("green") == 0) {
                            element = "wood";
                        }
                        else if (tokenStatusMarkers[i].indexOf("red") == 0) {
                            element = "fire";
                        }
                        else if (tokenStatusMarkers[i].indexOf("brown") == 0) {
                            element = "earth";
                        }
                        else if (tokenStatusMarkers[i].indexOf("purple") == 0) {
                            element = "metal";
                        }
                        else if (tokenStatusMarkers[i].indexOf("blue") == 0) {
                            element = "water";
                        }
                    }
                    
                    // set the npc element
                    if (options.includes ("n")) {
                        element = "";
                    }
                    else if (options.includes ("g") || options.includes ("wood")) {
                        element = "wood";
                    }
                    else if (options.includes ("r") || options.includes ("fire")) {
                        element = "fire";
                    }
                    else if (options.includes ("o") || options.includes ("earth")) {
                        element = "earth";
                    }
                    else if (options.includes ("v") || options.includes ("metal")) {
                        element = "metal";
                    }
                    else if (options.includes ("b") || options.includes ("water")) {
                        element = "water";
                    }
                    else if (options.includes ("reset") || options.includes ("ov") || element == "") {
                        var rng = Math.ceil((Math.random() * 5));
                        switch (rng) {
                            case 1:
                                element = "wood";
                                break;
                            case 2:
                                element = "fire";
                                break;
                            case 3:
                                element = "earth";
                                break;
                            case 4:
                                element = "metal";
                                break;
                            case 5:
                                element = "water";
                                break;
                            default:
                                element = "wood";
                                break;
                        }
                    }

                    npcNationality = getAttrByName(charId, "homeland");
                    if (npcNationality == "") {
                        npcNationality = generatorNpcNationality;
                    }
                    
                    // generate a name for the character
                    npcGender = getAttrByName(charId, "gender");
                    if (npcGender != "Male" && npcGender != "Female") {
                        npcGender = CharacterGenderGenerator();
                    }
                    npcRace = getAttrByName(charId, "skin");
                    if (npcRace == "") {
                        npcRace = CharacterRaceGenerator(npcNationality);
                    }
                    tokenName = CharacterNameGenerator(npcNationality, npcRace, npcGender).split(" ")[0];
                    npcNature = CharacterNatureGenerator();
                    
                    sendChat("Token Manager", `/w GM ${tokenName} has a ${npcNature} nature.`, null, {noarchive:true});

                    // set vitals
                    hp = GetCharacterAttribute(charId, "hp");
                    br = GetCharacterAttribute(charId, "barrier");
                    token.set("bar1_max", hp.get("max"));
                    token.set("bar2_max", br.get("max"));
                }
                else if (charId != undefined && charId != "") {
                    element = getAttrByName(charId, "prime_element");

                    // set the name
                    tokenName = getAttrByName(charId, "nickname");
                    if (tokenName == undefined || tokenName == "") {
                        tokenName = getAttrByName(charId, "character_name");
                        if (tokenName == undefined || tokenName == "") {
                            tokenName = token.get("name");
                        }
                        else {
                            tokenName = tokenName.split(" ")[0];
                        }
                    }

                    // set vitals
                    hp = GetCharacterAttribute(charId, "hp");
                    token.set("bar1_link", hp.get("_id"));
                    br = GetCharacterAttribute(charId, "barrier");
                    token.set("bar2_link", br.get("_id"));

                    token.set("showplayers_bar1", tokenType == "Ally");
                    token.set("showplayers_bar1text", (tokenType == "Ally" ? "2" : "0"));
                }

                // set token name
                token.set("name", tokenName);
                token.set("showplayers_bar2", true);
                token.set("bar_location", "overlap_bottom");

                // set the token element
                token.set("status_red", (element.toLowerCase() == "fire" ? true : false));
                token.set("status_blue", (element.toLowerCase() == "water" ? true : false));
                token.set("status_green", (element.toLowerCase() == "wood" ? true : false));
                token.set("status_purple", (element.toLowerCase() == "metal" ? true : false));
                token.set("status_brown", (element.toLowerCase() == "earth" ? true : false));
                token.set("status_yellow", (element.toLowerCase() == "" ? true : false));
            }
        });
    } else {
        sendChat("Game Manager", "/w GM You do not have a selected token.", null, {
            noarchive: true
        });
    }
}

function ShowNameplates(msg) {
    // iterate through the selected tokens
    if (msg.selected != undefined && msg.selected != "" && msg.selected.length > 0) {

        let token = {};
        _.each(msg.selected, function (obj) {
            
            // set token variables
            token = getObj('graphic', obj._id);
            token.set("showname", true);
        });
    }
}

function PrintTokenImageURL(msg) {
    // iterate through the selected tokens
    if (msg.selected != undefined && msg.selected != "" && msg.selected.length > 0) {

        let token = {};
        _.each(msg.selected, function (obj) {
            
            // set token variables
            token = getObj('graphic', obj._id);
            if (token != undefined && token != "") {
                sendChat("Game Manager", "/w GM Token URL: " + token.get("imgsrc"), null, {
                    noarchive: true
                });
            }
        });
    }
}

function GetTokenElement(token) {

    var tokenElement = "";
    var tokenData = token.get("statusmarkers").split(",");
    for (var i = 0; i < tokenData.length; i++) {

        if (tokenData[i].indexOf("green") == 0) {
            tokenElement = "Wood";
            break;
        } else if (tokenData[i].indexOf("red") == 0) {
            tokenElement = "Fire";
            break;
        } else if (tokenData[i].indexOf("brown") == 0) {
            tokenElement = "Earth";
            break;
        } else if (tokenData[i].indexOf("purple") == 0) {
            tokenElement = "Metal";
            break;
        } else if (tokenData[i].indexOf("blue") == 0) {
            tokenElement = "Water";
            break;
        }
    }

    return tokenElement;
}

function CommandSetToken(msg) {

    // get npc options
    var options = msg.content.replace("!st", "").trim().split(",");
    for (var i = 0; i < options.length; i++) {
        options[i] = options[i].trim();
    }

    SetToken(msg.selected, options, "NPC");
}

function CommandSetTokenAlly(msg) {

    // get npc options
    var options = msg.content.replace("!sta", "").trim().split(",");
    for (var i = 0; i < options.length; i++) {
        options[i] = options[i].trim();
    }

    SetToken(msg.selected, options, "Ally");
}

function CommandRandomizeNPC(msg) {

    RecastNPC(msg)
}

function CommandRecastNPC(msg) {

    RecastNPC(msg)
    msg.content =  msg.content.replace("!recast", "!npc");
    CommandSetNPC(msg);
}

function RecastNPC(msg) {

    let charId = "";
    let displayStyle = "";
    let charNameList = "";
    let charName = "";
    let character = "";
    let avatar = "";
    let maxRerolls = 5;
    let rerolls = 0;
    _.each(msg.selected, function (obj) {
            
        // set token variables
        token = getObj('graphic', obj._id);

        if (token != undefined) {
            charId = token.get("represents");
            displayStyle = getAttrByName(charId, "emoteDisplayStyle");
            if (displayStyle == "Recast") {
                charNameList = getAttrByName(charId, "recastCharacterNames").split(",");
                if (charNameList.length > 1) {
                    rerolls = 0;
                    while (rerolls < maxRerolls) {
                        rerolls++;
                        charName = charNameList[randomInteger(charNameList.length) - 1];
                        character = FindCharacter(charName);
                        if (character != undefined) {
                            token.set("represents", character.get("_id"));
                            avatar = character.get("avatar");
                            avatar = avatar.replace(/max\.png/,'thumb.png');
                            avatar = avatar.replace(/med\.png/,'thumb.png');
                            token.set("imgsrc", avatar);
                            break;
                        }
                    }
                }
            }
        }
    });
}

function CommandSetNPC(msg) {
    
    // get npc options
    var options = msg.content.replace("!npc", "").trim().split(",");
    for (var i = 0; i < options.length; i++) {
        options[i] = options[i].trim();
    }
    
    if (options.includes ("help")) {
        var message = "Your options are: <br />";
        message += "ov: Treat as fresh<br />";
        message += "reset: reset the tally.<br />";
        message += "n: set all selection to no element.<br />";
        message += "g: set all selection to wood.<br />";
        message += "r: set all selection to fire.<br />";
        message += "o: set all selection to earth.<br />";
        message += "v: set all selection to metal.<br />";
        message += "b: set all selection to water.";
        
        sendChat("Game Manager", "/w GM " + message, null, {
            noarchive: true
        });
        return;
    }
    
    // reset the state data if necessary
    if (!state.npcData || options.includes("reset")) {
        state.npcData = {
            none: 1,
            wood: 1,
            fire: 1,
            earth: 1,
            metal: 1,
            water: 1
        };
    }

    SetToken(msg.selected, options, "Generic");
}

function CommandCastNPC(msg) {

    // get npc options
    var options = msg.content.replace("!castnpc", "").trim().split("@@@");
    for (var i = 0; i < options.length; i++) {
        options[i] = options[i].trim();
    }

    let tokenName, bio, hp, barrier = "";
    let chracters, charObj, nicknameObj, fullnameObj, hpObj, barrierObj;

    _.each(msg.selected, function (obj) {
            
        // set token variables
        token = getObj('graphic', obj._id);

        if (token != undefined) {
            charId = token.get("represents");
            displayStyle = getAttrByName(charId, "emoteDisplayStyle");
            
            // set name
            tokenName = token.get("name");
            nicknameObj = GetCharacterAttribute(charId, "nickname");
            if (nicknameObj != undefined && nicknameObj != "") {
                if (nicknameObj.get("current").trim() == "" || nicknameObj.get("current").trim() == "-") {
                    nicknameObj.set("current", tokenName);

                    fullnameObj = GetCharacterAttribute(charId, "full_name");
                    if (fullnameObj != undefined && fullnameObj != "") {
                        fullnameObj.set("current", tokenName);
                    }
                }
            }
            
            // set hp and barrier
            hp = isNaN(parseInt(token.get("bar1_value"))) ? 0 : parseInt(token.get("bar1_value"));
            hpObj = GetCharacterAttribute(charId, "hp");
            if (hpObj != undefined && hpObj != "") {
                if (hp == 0 && parseInt(hpObj.get("current")) == 0) 
                {
                    hpObj.set("current", hpObj.get("max"));
                }
                else {
                    hpObj.set("current", hp);
                }
                token.set("bar1_link", hpObj.get("_id"));
            }
            barrier = isNaN(parseInt(token.get("bar2_value"))) ? 0 : parseInt(token.get("bar2_value"));
            barrierObj = GetCharacterAttribute(charId, "barrier");
            if (barrierObj != undefined && barrierObj != "") {
                if (barrier == 0 && parseInt(barrierObj.get("current")) == 0) 
                {
                    barrierObj.set("current", barrierObj.get("max"));
                }
                else {
                    barrierObj.set("current", barrier);
                }
                barrierObj.set("bar2_link", barrierObj.get("_id"));
            }

            // set character data
            chracters = findObjs({
                _id: charId,
                _type: "character"
            }, {caseInsensitive: true});
            
            if (chracters.length > 0) {
                charObj = chracters[0];
                charObj.set("name", tokenName);
                charObj.set("inplayerjournals", "all");
                if (options.length > 0) {
                    bio = `<p><b>${tokenName}</b><br><i>${options[0]}</i></p><p>Age ${options[1]}</p><p>${options[2]}</p>`;
                    charObj.set("bio", bio);
                }
            }

        }
    });

    var newMsg = msg;
    newMsg.content = "!token-mod --set defaulttoken";
    TokenMod.HandleInput(newMsg);
}

function CommandAssignToken(msg) {
    
    // get variables
    var options = msg.content.replace("!assignToken", "").trim().split("@");

    if (msg.selected != undefined && msg.selected != "" && msg.selected.length > 0) {

        _.each(msg.selected, function (obj) {
            var token;
            token = getObj('graphic', obj._id);
            if (token) {
                token.set("name", options[0].split(" ")[0]);
                token.set("gmnotes", "!" + options[1]);
                sendChat("Game Manager", "/w GM Token assigned name " + options[0].split(" ")[0], null, {
                    noarchive: true
                });
            }
        });
    } else {
        sendChat("Game Manager", "/w GM There was an error in your message. You do not have a selected token.", null, {
            noarchive: true
        });
    }
    
}

function CommandSetAltitude(msg) {

    var altitude = msg.content.replace("!alt ", "").trim();
    if (altitude == "") altitude = 0;
    
    // iterate through the selected tokens
    if (msg.selected != undefined && msg.selected != "" && msg.selected.length > 0) {

        _.each(msg.selected, function (obj) {
            
            // get the token information
            var token;
            token = getObj('graphic', obj._id);
            if (token) {
                log ("setting to pink " + (altitude == 0 ? false : altitude));
                token.set("status_pink", (altitude == 0 ? false : altitude));
            }
        });
    }
}

function SetMinionNameOnCharacterSheet(target) {
    // set minion data
    let difficultyStyleObj = GetCharacterAttribute(target.charId, "difficultyStyle");
    if (difficultyStyleObj != undefined && difficultyStyleObj == "3") {
        let nicknameObj = GetCharacterAttribute(target.charId, "nickname");
        if (nicknameObj != undefined) {
            nicknameObj.set("current", target.getToken().get("name"));
        }
    }
}


// ======= OnTrigger Functions
// =================================================

function OnTriggerSpellLookup(msg) {
    var sendingPlayer = getObj('player', msg.playerid);
    var sendingPlayerName = sendingPlayer.get("_displayname").split(" ")[0];
    var sendString = "/w " + sendingPlayerName + " &{template:spell}" + msg.content.substr(12);

    sendChat('player|' + msg.playerid, sendString, null, {
        noarchive: true
    });
}

function OnTriggerDyingInjury(injuryData) {
    
    var injuryDataSplit = injuryData.split("@@");
    var injuryType = injuryDataSplit[0];
    var injuryHp = injuryDataSplit[1];
    var charId = injuryDataSplit[2];
    var characterName = injuryDataSplit[3];
    var tokenId = injuryDataSplit[4];

    var injuryPreset;
    if (injuryType == "major") {
        injuryType = "Major Injury";
        injuryPreset = GetMajorInjury();
    } 
    else if (injuryType == "severe") {
        injuryType = "Severe Injury";
        injuryPreset = GetSevereInjury();

        // give the character fate
        var fateObj = GetCharacterAttribute(charId, "fate");
        if (fateObj != undefined) {
            fateObj.set("current", Number(fateObj.get("current")) + 1);
        }
    }
    
    if (injuryPreset.name != "") {
        let newInjuryData = GetInjuryData();
        newInjuryData.setData("Active", characterName, charId, injuryPreset.name, injuryHp);
        log ("newInjuryData: " + newInjuryData.state);
        TargetAddInjury(newInjuryData, true);

        // set the injury on the token
        // if (tokenId != "") {
        //     var token = getObj("graphic", tokenId);
        //     if (token == "") return;
        //     AddTokenCondition(token, injuryData.status, "Injury");
        // }
        
    }
}

function OnTriggerSurge(msg, content) {
    
    // get options
    var options = content.split("@@");
    var surgeLevel = options[0].substr(6);
    surgeLevel = isNaN(parseInt(surgeLevel, 10)) ? 1 : parseInt(surgeLevel, 10);
    var character = FindCharacter(options[1]);
    var baseSurge = isNaN(parseInt(options[2], 10)) ? 0 : parseInt(options[2], 10);
    var surgeResist = isNaN(parseInt(options[3], 10)) ? 0 : parseInt(options[3], 10);
    
    if (character != undefined) {
        // determine vitality damage
        var vitalityDamage = 0;
        for(var i = 0; i < surgeLevel; i++) {
            vitalityDamage += randomInteger(4);
        }
        vitalityDamage -= surgeResist;
        if (vitalityDamage <= 0) {
            vitalityDamage = 0;
        }

        // increase ki
        var surgeTotal = baseSurge * surgeLevel;
        var ki = GetCharacterAttribute(character.id, "ki");
        var kiValue = isNaN(parseInt(ki.get("current"), 10)) ? 0 : parseInt(ki.get("current"), 10) + baseSurge * surgeLevel;
        if (kiValue > ki.get("max")) {
            kiValue = ki.get("max");
        }
        ki.set("current", kiValue);

        // set vitality
        var vitality = GetCharacterAttribute(character.id, "vitality");
        var vitalityValue = vitality.get("current") - vitalityDamage;
        vitality.set("current", vitalityValue);
        
        var vitalityHPMod = Math.floor((vitalityValue - 10) / 2);
        var vitalityMessage = "";
        if (vitalityHPMod < 0) {
            var trueHP = getAttrByName(character.id, "hpTrue");
            trueHP = isNaN(parseInt(trueHP, 10)) ? 0 : parseInt(trueHP, 10);
            
            var vitalityHPDamage = Math.ceil(trueHP * (vitalityHPMod / 5));
            var hpValue = trueHP + vitalityHPDamage;
            if (hpValue < 0) {
                hpValue = 0;
            }
            
            var hp = GetCharacterAttribute(character.id, "hp");
            var hpDifference = parseInt(hp.get("max")) - hpValue;
            hp.set("max", hpValue);
            
            if (hpDifference > 0) {
                vitalityMessage = "<br />" + character.get("name") + "'s max HP is reduced by " + hpDifference;
            }
            if (hpValue == 0) {
                vitalityMessage = "<br />" + character.get("name") + "'s max HP is below zero. " + character.get("name") + " is dying.";
            }
        }

        var skillMessage = `&{template:action} {{username=${character.get("name")}}} {{rname=Surge}} {{image=${getAttrByName(character.id, "emote_activesetimageurl")}}} {{action2=1}}`;
        skillMessage += `{{description=${character.get("name")} gains ${surgeTotal} ki. ${character.get("name")} takes ${vitalityDamage} vitality damage.${vitalityMessage}}}`;
        sendChat('Game Manager', skillMessage);
    }
}

function OnTriggerInspiration(content) {
    let target = GetActorTargetData(content);
    TargetSpendInspiration("", target);
}

function OnTriggerResolve(content) {
    let target = GetActorTargetData(content);
    TargetSpendResolve("", target);
}

function OnTriggerFate(content) {
    let target = GetActorTargetData(content);
    TargetSpendFate("", target);
}

function OnTriggerResetWeek(msg, content) {
    
    if (playerIsGM(msg.playerid)) {
        var options = content.split("@");
        var character = FindCharacter(options[0]);
        var sectionId = options[1];

        if (character != undefined) {
            log ("OnTriggerResetWeek: " + character.name);
                 
            var mainActivity = GetSafeCharacterAttribute(character.id, sectionId + "_mainActivityDetails");
            if (mainActivity != undefined) {
                mainActivity.set("current", 0);
            }
            var minorActivity = GetSafeCharacterAttribute(character.id, sectionId + "_minorActivityDetails");
            if (minorActivity != undefined) {
                minorActivity.set("current", 0);
            }
            var downtimeMainActivityLock = GetSafeCharacterAttribute(character.id, "downtimeMainActivityLocked");
            if (downtimeMainActivityLock != undefined) {
                downtimeMainActivityLock.set("current", 0);
            }
            var downtimeMinorActivityLock = GetSafeCharacterAttribute(character.id, "downtimeMinorActivityLocked");
            if (downtimeMinorActivityLock != undefined) {
                downtimeMinorActivityLock.set("current", 0);
            }
            var downtimeMainActivity = GetSafeCharacterAttribute(character.id, "downtimeMainActivityDetails");
            if (downtimeMainActivity != undefined) {
                downtimeMainActivity.set("current", 0);
            }
            var downtimeMinorActivity = GetSafeCharacterAttribute(character.id, "downtimeMinorActivityDetails");
            if (downtimeMinorActivity != undefined) {
                downtimeMinorActivity.set("current", 0);
            }
            var downtimeActivityList = GetSafeCharacterAttribute(character.id, "downtimeShowActivityList");
            if (downtimeActivityList != undefined) {
                downtimeActivityList.set("current", 0);
            }

        }
    }
}

function OnTriggerCallTemplate (msg, content) {
    var splits = content.split("@@@");
    var sheetName = splits[0];
    var template = splits[1];
    template = template.replaceAll("[sheet]", "@{" + sheetName);

    sendChat(msg.who, `&{template:${template}`);

}

// ======= Jukebox Functions
// =================================================

function CommandJukebox(msg) {
    
    if (!state.jukebox)
    {
        state.jukebox = {
            allowPlayerInput: false,
            currentlyPlaying: ""
        };
    }
    
    var sendingPlayerName = getObj('player', msg.playerid).get("_displayname").split(" ")[0];
    
    if (playerIsGM(msg.playerid) || state.jukebox.allowPlayerInput) {

        if (msg.content.indexOf("!jp") !== -1) {
            // JukeboxPlay(msg, sendingPlayerName, content);

            var content = msg.content;
            var newMsg = msg;
            if (msg.content.indexOf("!jpl ") !== -1) {
                content = content.replace("!jpl ", "");
                newMsg.content = "!roll20AM --edit,mode,shuffle|";
            } 
            else if (msg.content.indexOf("!jps ") !== -1) {
                content = content.replace("!jps ", "");
                newMsg.content = "!roll20AM --edit,mode,random,single|";
            }
            else {
                content = content.replace("!jp ", "");
                newMsg.content = "!roll20AM --edit,mode,loop|";
            }
            content = content.trim();
            newMsg.content += content;
            
            Roll20AM.StopAll(msg.who);
            Roll20AM.InputController(msg);
            newMsg.content = "!roll20AM --audio,play|" + content;
            Roll20AM.InputController(msg);
        }
        else if (msg.content.indexOf("!jsa") !== -1) {
            Roll20AM.StopAll(msg.who);
            // JukeboxStop(msg);
        }
        else if (msg.content.indexOf("!js") !== -1) {
            var content = msg.content.replace("!js ", "");
            content = content.trim();
            JukeboxStopCheck(msg, sendingPlayerName, content);
        }
        else if (msg.content.indexOf("!ja") !== -1) {
            JukeboxAllowPlayerInput(msg);
        }
        else if (msg.content.indexOf("!jd") !== -1) {
            JukeboxDenyPlayerInput(msg);
        }
        else if (msg.content.indexOf("!jia") !== -1) {
            Roll20AM.RemoveJukebox(msg.who);
            Roll20AM.ImportJukebox(msg.who);
            // JukeboxImportAll(msg);
        }
    }
    else
    {
        sendChat("Jukebox Manager", "/w " + sendingPlayerName + " Sorry, the jukebox is currently locked", null, {
            noarchive: true
        });
        sendChat("Jukebox Manager", "/w GM The jukebox is currently locked but " + sendingPlayerName + " wants to use it", null, {
            noarchive: true
        });
    }
}

function JukeboxPlay(msg, sendingPlayerName, content) {

    // first stop anything playing
    if (state.jukebox.currentlyPlaying != content)
    {
        JukeboxStop(msg);
    }
    
    // play the track/playlist
    if (state.jukebox.trackDetails[content] != undefined) {
        var track = getObj('jukeboxtrack', state.jukebox.trackDetails[content].id);
        track.set('playing', true);
        track.set('softstop', false);
        track.set('loop', true);
    }
    else if (state.jukebox.playLists[content] != undefined) {
        // TODO: Make playlists play
        // playJukeboxPlaylist(state.jukebox.playLists[content].id);
    }
    
    state.jukebox.currentlyPlaying = content;
    
    // send a message
    sendChat("Jukebox Manager", "/w GM Playing " + content, null, {
        noarchive: true
    });
    if (!state.jukebox.allowPlayerInput) {
        sendChat("Jukebox Manager", "/w GM The jukebox is currently locked", null, {
            noarchive: true
        });
    }
}

function JukeboxStopCheck(msg, sendingPlayerName, content) {
    
    if (playerIsGM(msg.playerid) || state.jukebox.currentlyPlaying == content)
    {
        sendChat("Jukebox Manager", "/w GM Stoping " + state.jukebox.currentlyPlaying, null, {
            noarchive: true
        });
        sendChat("Jukebox Manager", "/w " + sendingPlayerName + " Stoping " + state.jukebox.currentlyPlaying, null, {
            noarchive: true
        });
        JukeboxStop(msg);
    }
    else
    {
        sendChat("Jukebox Manager", "/w " + sendingPlayerName + " That song is not playing.", null, {
            noarchive: true
        });
    }
}

function JukeboxStop(msg) {
    
    if (state.jukebox.currentlyPlaying != "")
    {
        // play the track/playlist
        if (state.jukebox.trackDetails[state.jukebox.currentlyPlaying] != undefined) {
            var track = getObj('jukeboxtrack', state.jukebox.trackDetails[state.jukebox.currentlyPlaying].id);
            if (track != undefined) {
                log ("got track " + track.get('title') + ": " + track.get('playing') + " softstop: " + track.get('softstop'));
                track.set('playing', false);
            }
        }
        else {
            stopJukeboxPlaylist();
        }

        state.jukebox.currentlyPlaying = "";
    }
}

function JukeboxAllowPlayerInput(msg) {
    state.jukebox.allowPlayerInput = true;
    
    sendChat("Jukebox Manager", "/w GM Setting Player Jukebox input to Allowed.", null, {
        noarchive: true
    });
}

function JukeboxDenyPlayerInput(msg) {
    state.jukebox.allowPlayerInput = false;
    
    sendChat("Jukebox Manager", "/w GM Setting Player Jukebox input to Denied.", null, {
        noarchive: true
    });
}

function JukeboxImportAll(msg) {
    
    state.jukebox.playLists = {};  
    state.jukebox.trackDetails = {};
    
    var lists = JSON.parse(Campaign().get('jukeboxfolder'));
    var tagName,track,title,unique,trackID,trackDetails;
    
    var jukeboxtracks = findObjs({_type: 'jukeboxtrack'});
    jukeboxtracks.forEach(function(track) { 
        title = track.get('title')
        trackID = track.get('_id')  

        if (state.jukebox.trackDetails[title] == undefined){
            state.jukebox.trackDetails[title] = {
                id:trackID,
                title:title
            }  
         }  
     });   
    
    lists.forEach(function(list) { 
        if (list.n != undefined){
            if (!state.jukebox.playLists[list.n]) {
                state.jukebox.playLists[list.n] = {
                    title: list.n,
                    id: list.id
                } 
            }
        } 
    });     

    sendChat("Jukebox Manager", "/w GM All Playlists and Tracks have been imported", null, {
        noarchive: true
    });
}