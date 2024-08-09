on("chat:message", function(msg) {
    if (msg.type == "api" && msg.content != null) {

        let firstSpace = msg.content.indexOf(" ");
        if (firstSpace == -1) {
            firstSpace = msg.content.length;
        }
        let tag = msg.content.substring(0, firstSpace).toLowerCase().trim();
        let content = "";
        if (firstSpace < msg.content.length) {
             content = msg.content.substring(firstSpace).trim();
        }

        WuxingCombat.HandleInput(msg, tag, content);
        WuxingMessages.HandleInput(msg, tag, content);
        WuxingTarget.HandleInput(msg, tag, content);
        WuxingToken.HandleInput(msg, tag, content);

        switch(tag) {
            case "!m":
            case "!w":
            case "!y":
            case "!t":
            case "!d":
            case "!de":
                CommandGetEmoteMessageOptions(msg);
            return;
            case "!h":
            case "!r":
            case "!ry":
            case "!i":
            case "!a":
            case "!l":
            case "!s":
                CommandSendFormattedMessage(msg);
            return;
            case "!emotemessage":
                CommandSendEmoteMessage(msg);

            return;
            case "!markernames":
                let tokenMarkers = JSON.parse(Campaign().get("token_markers"));
                let chatMessage = '';
                _.each(tokenMarkers, marker => {
                    chatMessage += `<p><img src='${marker.url}'> ${marker.id}: ${marker.name}</p>`;
                });
                sendChat("Token Markers", chatMessage);

            return;
            case "!clearmarkers":
                if (!msg.selected && msg.selected[0]._type == "graphic") return;
                obj = getObj(msg.selected[0]._type, msg.selected[0]._id);
                obj.set("statusmarkers", "");
                SanitizeTokenConditions(obj, true);
                
            return;
            case "!gettokenmarkers":
                if (!msg.selected) return;
                if (msg.selected[0]._type !== "graphic") return;
                obj = getObj(msg.selected[0]._type, msg.selected[0]._id);
                currentMarkers = obj.get("statusmarkers");
                sendChat("Token Markers", currentMarkers);
                
            return;
            case "!target":
            case "!targetw":
                CommandTargetFunction(msg);
                
            return;
            case "!targetname":
            case "!targetnamew":
                CommandTargetNameFunction(msg);
                
            return;
            case "!token":
            case "!tokenw":  
                CommandTokenFunction(msg);  

            return;
            case "!c":
            case "!cw":
                CommandCharacterFunction(msg);
                
            return;
            case "!jp":
            case "!jpl":
            case "!jps":
            case "!jsa":
            case "!js":
            case "!ja":
            case "!jd":
            case "!jia":
            case "!jbt":
                CommandJukebox(msg);
                
            return;
            case "!setlang":
                CommandSetLanguage(msg);
                
            return;
            case "!help":
                CommandHelpCommands(msg, content);
                
            return;
            case "!deathsave":
                CommandDeathSave(content);
                
            return;
            case "!deathfailure":
                CommandDeathFailure(content);
                
            return;
            case "!roll20am":
                Roll20AM.InputController(msg);
                
            return;
    

            // Triggered Events
            case "!createability":
                OnTriggerCreateAbility(content);
                
            return;
            case "!linger":
                OnTriggerDyingInjury(content);
                
            return;
            case "!insp":
                OnTriggerInspiration(content);
                
            return;
            case "!spendresolve":
                OnTriggerResolve(content);
                
            return;
            case "!spendfate":
                OnTriggerFate(content);
                
            return;
            case "!check":
                OnTriggerInteractTarget(msg, content);
                
            return;
            case "!ctemplate":
                OnTriggerCallTemplate(msg, content);
                
            return;

            // Token Triggered Events
            case "!tatk":
                let contentSplit = content.split("$$$");
                CreateActionOutput(contentSplit[0], contentSplit[1]);
                
            return;
            case "!actionresults":
                CommandHandleActionResults(content);
                
            return;
            case "!healinj":
                CommandTargetHealInjury(content);
                
            return;
        }

        // GM Events
        if (playerIsGM(msg.playerid)) {
            switch(tag) {
                case "!cp":
                case "!cps":
                    CommandTargetPartyFunction(msg);
                return;
                case "!p":
                case "!ps":
                case "!pc":
                case "!pcs":
                    CommandPartyFunction(msg);
                    
                return;
                case "!startsession":
                    CommandStartSession(content);
                    
                return;
                case "!pta":
                    CommandAddToParty(msg);
                    
                return;
                case "!pt":
                    CommandSetParty(msg);
                    
                return;
                case "!sta":
                    CommandSetTokenAlly(msg);
                    
                return;
                case "!st":
                    CommandSetToken(msg);
                    
                return;
                case "!npc":
                    CommandSetNPC(msg);
                    
                return;
                case "!rndnpc":
                    CommandRandomizeNPC(msg);
                    
                return;
                case "!recast":
                    CommandRecastNPC(msg);
                    
                return;
                case "!castnpc":
                    CommandCastNPC(msg);
                    
                return;
                case "!intro":
                    IntroduceNPC(msg);
                    
                return;
                case "!showname":
                    ShowNameplates(msg);
                    
                return;
                case "!hidename":
                    HideNameplates(msg);
                    
                return;
                case "!img":
                    PrintTokenImageURL(msg);
                    
                return;
                case "!generatenpc":
                    CommandGenerateNPC(msg);
                    
                return;
                case "!assigntoken":
                    CommandAssignToken(msg);
                    
                return;
                case "!gainmorale":
                    TargetGainMorale(content);
                    
                return;
                case "!gainkarma":
                    TargetGainKarma(content);
                    
                return;
                case "!showmission":
                    CommandShowMission(content);
                    
                return;
                case "!completemission":
                    CommandCompleteMission(content);
                    
                return;
                case "!setmissionxp":
                    CommandSetMissionXp(content);
                    
                return;
                case "!setmissioncurrency":
                    CommandSetMissionCurrency(content);
                    
                return;
                case "!importpartystats":
                    CommandImportPartyStats(msg);
                    
                return;
                case "!sendpmnote":
                    log ("sending note");
                    CommandSendPmNote(content);
                    
                return;
            }
        }
    }

    if (msg.playerid.toLowerCase() != "api" && msg.rolltemplate) {

        if (["action"].indexOf(msg.rolltemplate) > -1 && msg.content.indexOf("charname=") > -1) {
            let cnamebase = msg.content.split("charname=")[1].split("}")[0];
            let cname = cnamebase ? cnamebase.replace(/}/g, '').trim() : (msg.content.split("{{name=")[1] || '').split("}}")[0].trim();
            let character = cname ? findObjs({
                name: cname,
                type: 'character'
            })[0] : undefined;
            let charId = character.get("_id");
            let playerid = msg.content.indexOf("playerid=") > -1 ? msg.content.split("playerid=")[1].split("}")[0] : msg.playerid;
            let player = getObj("player", playerid);
            HandleAction(msg, charId, player);
        }
        else if (["hiddenaction"].indexOf(msg.rolltemplate) > -1) {
            let cnamebase = msg.content.split("charname=")[1].split("}")[0];
            let cname = cnamebase ? cnamebase.replace(/}/g, '').trim() : (msg.content.split("{{name=")[1] || '').split("}}")[0].trim();
            let character = cname ? findObjs({
                name: cname,
                type: 'character'
            })[0] : undefined;
            let charId = character.get("_id");
            let playerid = msg.content.indexOf("playerid=") > -1 ? msg.content.split("playerid=")[1].split("}")[0] : msg.playerid;
            HandleHiddenAction(msg, charId, playerid);
        }
        else if (["technique"].indexOf(msg.rolltemplate) > -1) {
            if (msg.content.indexOf("##") >= 0) {
                let stringout = msg.content.split("##")[1];
                let js = JSON.parse(stringout);
                log (`js: ${js}`);
                log (`js: ${JSON.stringify(js)}`);
            }
        }
    }
});

// Data Retrieval
function GetCharacterAttribute (charId, attrName) {

    var returnVal = undefined;
    var chracterAttributes = findObjs({
        _characterid: charId,
        _type: "attribute",
        name: attrName
    }, {caseInsensitive: true});

    if (chracterAttributes.length > 0) {
        returnVal = chracterAttributes[0];
    }

    return returnVal;
}

function AttrParseInt(charId, fieldName, defaultValue) {

	return ParseIntValue(getAttrByName(charId, fieldName), defaultValue);
}

function ParseIntValue(value, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = 0;
	}
	return isNaN(parseInt(value)) ? defaultValue : parseInt(value);
}

function AttrParseFloat(charId, fieldName, defaultValue) {

	return ParseFloatValue(getAttrByName(charId, fieldName), defaultValue);
}


// attribute creation
function CreateRepeatingRowAttribute(repeatingSection, id, name, value, charId) {

    return createObj("attribute", {"name": GetSectionIdName(repeatingSection, id, name), "current": value, "_characterid": charId});
}

function CreateNormalAttribute(name, value, charId, max) {
    log (`Creating Attribute ${name} with value ${value}`);

    if (max != undefined) {
        return createObj("attribute", {"name": name, "current": value, "max": max, "_characterid": charId});
    }

    return createObj("attribute", {"name": name, "current": value, "_characterid": charId});
}

function CreateAbility (name, pattern, charId) {
    var checkAbility = findObjs({
        _type: 'ability',
        _characterid: charId,
        name: name
    });

    if (checkAbility[0]) {
        checkAbility[0].set({
            action: pattern
        });
    } else {
        createObj('ability', {
            name: name,
            action: pattern,
            characterid: charId,
            istokenaction: true
        });
    }
}

function RemoveRowData(charId, rowId) {
    var chracterAttributes = findObjs({
        _characterid: charId,
        _type: "attribute",
        name: rowId
    }, {caseInsensitive: true});
    
    if (chracterAttributes.length > 0)
    {
        chracterAttributes[0].remove(); 
    }
}

// uuid generation
function GenerateUUID() {

    var a = 0, b = [];
    return function() {
        var c = (new Date()).getTime() + 0, d = c === a;
        a = c;
        for (var e = new Array(8), f = 7; 0 <= f; f--) {
            e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
            c = Math.floor(c / 64);
        }
        c = e.join("");
        if (d) {
            for (f = 11; 0 <= f && 63 === b[f]; f--) {
                b[f] = 0;
            }
            b[f]++;
        } else {
            for (f = 0; 12 > f; f++) {
                b[f] = Math.floor(64 * Math.random());
            }
        }
        for (f = 0; 12 > f; f++){
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        }
        return c;
    };
};

function GenerateRowID() {

    return GenerateUUID().replace(/_/g, "Z");
};

// Sanitization
function SanitizeSheetRoll(roll) {
    var sheetRoll = roll;
    sheetRoll = sheetRoll.replace(/%/g, "&#37;");
    sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
    sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
    sheetRoll = sheetRoll.replace(/\</g, "&#60;");
    sheetRoll = sheetRoll.replace(/\>/g, "&#62;");
    sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
    sheetRoll = sheetRoll.replace(/@/g, "&#64;");
    sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
    sheetRoll = sheetRoll.replace(/]/g, "&#93;");
    sheetRoll = sheetRoll.replace(/\n/g, "<br />");
    return sheetRoll;
}

function SanitizeSheetRollAction(roll) {
    var sheetRoll = roll;
    sheetRoll = sheetRoll.replace(/\"/g, "&#34;");
    sheetRoll = sheetRoll.replace(/%/g, "&#37;");
    sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
    sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
    sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
    sheetRoll = sheetRoll.replace(/:/g, "COLON");
    sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
    sheetRoll = sheetRoll.replace(/@/g, "&#64;");
    sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
    sheetRoll = sheetRoll.replace(/]/g, "&#93;");
    sheetRoll = sheetRoll.replace(/\n/g, "&&");
    return sheetRoll;
}

function DesanitizeSheetRollAction(roll) {
    var sheetRoll = roll;
    sheetRoll = sheetRoll.replace(/COLON/g, ":");
    return sheetRoll;
}

function DesanitizeSheetRollActionNewLine(roll) {
    var sheetRoll = roll;
    sheetRoll = sheetRoll.replace(/&&/g, "\n");
    return sheetRoll;
}

function ParseSheetRollTechniqueJSON(stringifiedJSON) {
    stringifiedJSON = DesanitizeSheetRollAction(stringifiedJSON);
    let technique = JSON.parse(stringifiedJSON);
    technique.description = DesanitizeSheetRollActionNewLine(technique.description);
    return technique;
}



















// Old
// =================================================

function SendChatMessage(snd, msg, alt, opt) {
    
    if (alt == undefined) {
        sendChat(snd, msg);
    }
    else {
        sendChat(snd, msg, alt, opt);
    }
}



function CommandImportPartyStats(msg) {
    
    //  we're storing a list of party member IDs because these are used a lot
    if (state.mainParty == undefined) {
        state.mainParty = {};
    }
    state.mainParty.party = [];
    
    // set the party manager in the party because we use it a lot
    var partyManager = FindCharacter("PartyManager");
    state.mainParty.party["PartyManager"] = {
        name: "PartyManager",
        id: partyManager.id
    }
    
    // now get all of the party members in our party manager
    var partyList = getAttrByName(partyManager.id, "all_party_members");
    partyList = partyList.split(",");

    // iterate through the party
    _.each(partyList, function(charName) {
        charName = charName.trim();
        if (charName != "") {
            var characters = findObjs({
                _type: 'character',
                name: charName
            }, {caseInsensitive: true});
            if (characters.length > 0) {
                // this character is a party member. Add them to the list
                if (state.mainParty.party[charName] == undefined){
                    state.mainParty.party[charName] = {
                        name: charName,
                        id: characters[0].get("id")
                    };
                }
            }
        }
    });
    
    sendChat("Game Manager", "/w GM Character Importer has completed", null, {noarchive: true});
}

function FindCharacterIdFromParty(charName) {
    if (state.mainParty != undefined && state.mainParty.party != undefined && state.mainParty.party.includes(charName)) {
        return state.mainParty.party[charName].id;
    }
    return undefined;
}

function FindCharacterId(charName) {
    let character = FindCharacter(charName);
    if (character != undefined) {
        return character.get("id");
    }
    return "";
}

function FindCharacter(charName) {

    // log ("Finding Character " + charName);
    let charId = FindCharacterIdFromParty(charName);
    if (charId != undefined) {
        return getObj('character', charId);
    }
    else {
        var characters = findObjs({
            _type: 'character',
            name: charName
        }, {caseInsensitive: true});
        if (characters.length > 0) {
            // log ("Found Character " + charName + ": " + characters[0]);
            return characters[0];
        }

        characters = findObjs({_type: 'character'});
        characters.forEach(function(chr) { 
            if(chr.get('name') == charName) {
                // log ("Found Character " + charName + ": " + chr);
                return chr;
            }
        });
    }
    return undefined;
}

function GetCharacterPlayerId(character) {
    
    var players = character.get("controlledby");
    if (players.indexOf(",")) {
        players = players.split(",")[0].trim();
    }
    return players;
}

function GetPlayerNameFromId(id) {
    
    var players = findObjs({
        _id: id
    });
    var returnVal = "";
    _.each(players, function(obj) {
        if (returnVal == "") {
            returnVal = obj.get("_displayname");
        }
    });
    return returnVal;
}

function GetCharacter(charId) {
    return getObj('character', charId);
}

function GetSelectedCharacter(msg, sendingPlayerName, msgwho, ignoreToken, token) {
    
    // first get the selected character from whichever token is selected or passed
    if (ignoreToken == undefined) {
        ignoreToken = false;
    }
    if (!ignoreToken) {
        if (token == undefined && msg.selected != undefined && msg.selected != "") {
            let obj = msg.selected[0];
            token = getObj('graphic', obj._id);
        }
        if (token) {
            return getObj('character', token.get('represents'));
        }
    }

    if (sendingPlayerName == undefined) {
        sendingPlayerName = getObj('player', msg.playerid).get("_displayname").split(" ")[0];;
    }
    if (msgwho == undefined) {
        msgwho = "";
    }

    if (sendingPlayerName != msgwho) {
        return FindCharacter(msgwho);
    }
    
    sendChat("Game Manager", "/w " + sendingPlayerName + " There was an error in your message. You do not have a selected token or selected an invalid character.", null, {noarchive:true});
    return null;
}

function GetAttributeInt(charAtrr, state, defaultVal) {

    if (state == undefined) {
        state = "current";
    }

    return ParseInteger(charAtrr.get(state), defaultVal);
}

function ParseInteger(val, defaultVal) {
    if (defaultVal == undefined) {
        defaultVal = 0;
    }
    if (val == undefined) {
        return defaultVal;
    }
    return isNaN(parseInt(val)) ? defaultVal : parseInt(val);
}

function AddToCharacterAttribute(charId, objName, value, state) {

    if (state == undefined) {
        state = "current";
    }

    let obj = GetCharacterAttribute(charId, objName);
    if (obj != undefined) {
        obj.set(state, GetAttributeInt(obj, state) + value);
    }
}

function GetMessageTargetData(msg) {
    var output = [];

    if (msg.selected && msg.selected.length > 0) {
        let tokenData;
        for (let i = 0; i < msg.selected.length; i++) {
            tokenData = GetTokenIdTargetData(msg.selected[i]._id);
            if (tokenData != undefined) {
                output.push(tokenData);
            }
        }
    }
    return output;
}

function GetTokenIdTargetData(tokenId) {
    let token = getObj('graphic', tokenId);
    if (token != undefined) {
        return GetTokenTargetData(token);
    }
    log (`[EventData] No token with id ${tokenId} exists.`);
    return undefined;
}

function GetTokenTargetData(token) {
    let displayName, id, tokenName;
    if (token != undefined) {
        id = token.get('represents');
        if (id != undefined && id != "") {
            displayName = getAttrByName(id, "nickname");
            if (displayName == undefined || displayName.trim() == "") {
                tokenName = token.get("name");
                if (tokenName != "") {
                    displayName = tokenName;
                }
            }
            return FormTargetData(id, getObj("character", token.get('represents')).get("name"), token.get("_id"), displayName);
        }
        else {
            log (`[EventData] This token has no representative character.`);
            return undefined;
        }
    }
    log (`[EventData] No token exists.`);
    return undefined;
}

function GetTokenIdListTargetData(idList) {
    var output = [];

    let tokenIds = idList.split(",");
    let displayName, id, tokenName;
    for (let i = 0; i < tokenIds.length; i++) {
        tokenIds[i] = tokenIds[i].trim();
        if (tokenIds[i] != "") {
            token = getObj('graphic', tokenIds[i]);
            if (token) {
                id = token.get('represents');
                displayName = getAttrByName(id, "nickname");
                if (displayName == undefined || displayName.trim() == "") {
                    tokenName = token.get("name");
                    if (tokenName != "") {
                        displayName = tokenName;
                    }
                }
                output.push(FormTargetData(id, getObj("character", token.get('represents')).get("name"), tokenIds[i], displayName));
            }
        }
    }
    return output;
}

function GetIdListTargetData(idList) {
    var output = [];

    let charIds = idList.split(",");
    let displayName;
    for (let i = 0; i < charIds.length; i++) {
        charIds[i] = charIds[i].trim();
        if (charIds[i] != "") {
            character = GetCharacter(charIds[i]);
            if (character != undefined) {
                displayName = getAttrByName(charIds[i], "nickname");
                if (displayName == undefined || displayName == "") {
                    displayName = character.get("name");
                }
                output.push(FormTargetData(charIds[i], character.get("name"), "", displayName));
            }
        }
    }
    return output;
}

function GetActorTargetData(actorList) {
    var output = [];

    let actors = actorList.split(",");
    let id;
    let displayName;
    for (let i = 0; i < actors.length; i++) {
        actors[i] = actors[i].trim();
        if (actors[i] != "") {
            id = FindCharacterId(actors[i]);
            displayName = getAttrByName(id, "nickname");
            if (displayName == undefined || displayName.trim() == "") {
                displayName = actors[i];
            }
            output.push(FormTargetData(id, actors[i], "", displayName));
        }
    }
    return output;
}

function FormTargetData(charId, charName, tokenId, displayName) {
    return {
        charId: charId,
        charName: charName,
        tokenId: tokenId,
        displayName: displayName,
        token: undefined,

        getToken: function() {
            if (this.token == undefined) {
                this.token = getObj('graphic', this.tokenId);
            }
            return this.token;
        }
    };
}

var WuxingCombat = WuxingCombat || (function () {
    'use strict';

    var schemaVersion = "0.1.1",

        checkInstall = function () {
            if (!state.hasOwnProperty('WuxingCombat') || state.WuxingCombat.version !== schemaVersion) {
                state.WuxingCombat = {
                    version: schemaVersion,
                    lastActivePlayer: "",
                    round: 0,
                    startSideIsAlly: ""
                };
            }
        },

        // Input Commands
        // ---------------------------

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!ctech":
                    commandConsumeTechnique(msg, content);
                    break;
                case "!utech":
                    commandUseTechnique(msg, content);
                    break;
                case "!rtech":
                    commandResolveTechnique(msg, content);
                    break;
                case "!adv":
                    commandRollAdvantage(msg, content);
                    break;
                case "!cmbstartcombat":
                    commandStartBattle();
                    break;
                case "!startround":
                    commandStartRound();
                    break;
                case "!endturn":
                    commandEndTurn(msg);
                    break;
                case "!endcombat":
                    commandEndCombat();
                    break;
            };
        },
        
        commandConsumeTechnique = function (msg, content) {
            let components = content.split("##");
            log (DesanitizeSheetRollAction(components[0]));
            let technique = ParseSheetRollTechniqueJSON(components[0]);
            let weaponData = components.length > 1 ? JSON.parse(DesanitizeSheetRollAction(components[1])) : undefined;
            let targetData = getUserTargetDataFromTechnique(technique);
            TechniqueConsume.ConsumeTechnique(msg, targetData, technique, weaponData);
        },

        commandUseTechnique = function (msg, content) {
            let components = content.split("##");
            let technique = ParseSheetRollTechniqueJSON(components[0]);
            let weaponData = components.length > 1 ? JSON.parse(DesanitizeSheetRollAction(components[1])) : undefined;
            let userTargetData = getUserTargetDataFromTechnique(technique);
            let defenderTargetData = getDefenderTargetDataFromTechnique(technique);
            TechniqueUseResults.UseTechnique(msg, technique, weaponData, userTargetData, defenderTargetData);
        },

        commandResolveTechnique = function (msg, content) {
        },

        commandRollAdvantage = function (msg, content) {
            rollAdvantage(msg, ParseIntValue(content));
        },

        commandStartBattle = function () {
            startCombat();
        },

        commandStartRound = function () {
            startRound();
        },

        commandEndTurn = function (msg) {
            endTurn(msg);
        },

        commandEndCombat = function () {
            endCombat();
        },

        // Combat State
        // ---------------------------

        startCombat = function() {

            let initiativeData = [];
            WuxingTarget.IterateOverActiveTargetData(function (targetData) {
                initiativeData.push(createInitiativeData(targetData));
                WuxingToken.SetTokenForBattle(targetData);
            });

            // sort the initiative data
            initiativeData = Format.SortArrayDecrementing(initiativeData);
            setCombatStartingPhase(initiativeData);

            // create the table data
            let tableData = [];
            let data;

            for (let i = 0; i < initiativeData.length; i++) {
                data = parseInitiativeData(initiativeData[i]);
                tableData.push([data.targetData.displayName, data.value]);
                setCombatStartLastActivePlayer(data);
            }
            WuxingMessages.SendTableMessage(["Name", "Initiative"], tableData, ["GM"], undefined, true);
            startRound();
        },

        setCombatStartingPhase = function(initiativeData) {
            let obj = initiativeData[0].split("@");
            let targetData = WuxingTarget.FindActiveTargetDataByCharName(obj[1]);
            state.WuxingCombat.startSideIsAlly = targetData.isAlly;
        },

        setCombatStartLastActivePlayer = function(initiativeData) {
            if (state.WuxingCombat.lastActivePlayer == "" && initiativeData.targetData.owner != "") {
                state.WuxingCombat.lastActivePlayer = initiativeData.targetData.owner;
            }
        },

        startRound = function() {
            state.WuxingCombat.round++;
            setStartRoundTokens();
            sendStartRoundMessage();
        },

        setStartRoundTokens = function() {
            WuxingTarget.IterateOverActiveTargetData(function (tokenData) {
                WuxingToken.ResetTempHp(tokenData);
                WuxingToken.AddKi(tokenData, 10, true);
                WuxingToken.SetTurnIcon(tokenData, true);
            });
        },

        sendStartRoundMessage = function() {
            let message = `Round ${state.WuxingCombat.round} Begins!\n`;
            message += getPhaseStartMessage(state.WuxingCombat.startSideIsAlly);
            WuxingMessages.SendSystemMessage(message, ["GM"]);
        },

        endTurn = function(msg) {
            let targetData;
            WuxingToken.IterateOverSelectedTokens(msg, function (token) {
                targetData = WuxingTarget.FindActiveTargetDataByTokenId(token.get("_id"));
                WuxingToken.SetTurnIcon(targetData, false);
                sendEndTurnMessage(targetData);
            });
        },

        sendEndTurnMessage = function(targetData) {
            let message = `${targetData.displayName} Ends Turn\n`;
            message += getPhaseStartMessage(!targetData.isAlly);
            WuxingMessages.SendSystemMessage(message);
        },

        getPhaseStartMessage = function(enteringAllyPhase) {

            if (enteringAllyPhase) {
                return `Ally Phase Start!\n${state.WuxingCombat.lastActivePlayer == "" ? "GM" : state.WuxingCombat.lastActivePlayer}, select the next character to have a turn`;
            }
            else {
                return "Enemy Phase Start!";
            }
        },

        endCombat = function() {
            WuxingTarget.IterateOverActiveTargetData(function(targetData) {
                WuxingToken.SetTokenForNarative(targetData);
            });
            resetCombatStateVariables();
            WuxingMessages.SendSystemMessage("Combat Has Finished", ["GM"]);
        },

        resetCombatStateVariables = function() {
            WuxingTarget.ClearActiveTargetData();
            state.WuxingCombat.lastActivePlayer = "";
            state.WuxingCombat.round = 0;
        },

        // Initiative Handling
        // ---------------------------

        createInitiativeData = function(targetData) {
            let value = parseInt(getAttrByName(targetData.charId, "initiative"));
            let roll = randomInteger(20) + value;
            return `${roll < 10 ? "0" : ""}${roll}.${value < 10 ? "0" : ""}${value < 0 ? "0" : value}@${targetData.name}`;
        },

        parseInitiativeData = function(initiativeData) {
            let obj = initiativeData.split("@");
            return {
                targetData: WuxingTarget.FindActiveTargetDataByCharName(obj[1]),
                value: obj[0]
            }
        },

        // Technique Handling
        // ---------------------------
        
        getUserTargetDataFromTechnique = function (technique) {
            return WuxingTarget.FindActiveTargetDataByCharName(technique.username);
        },
        
        getDefenderTargetDataFromTechnique = function (technique) {
            return WuxingTarget.FindActiveTargetDataByTokenId(technique.target);
        },

        // Math
        // ---------------------------

        rollAdvantage = function(msg, count) {

            let highRolls = Dice.GetHighRolls(count, 6, 1);
            let total = Dice.TotalDice(highRolls.keeps);
            let message = `${Format.ShowTooltip(total, Format.ArrayToString(highRolls.rolls))} advantage roll`;
            WuxingMessages.SendSystemMessage(message, "",  msg.who);
        }
    ;

    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput
    };

}());

var TechniqueConsume = TechniqueConsume || (function () {
    'use strict';

    var
        consumeTechnique = function(msg, targetData, technique, weaponData) {

            // consume resources
            if (consumeTechniqueResources(targetData, technique)) {
                displayTechnique(msg, technique, weaponData);
            }
            else {
                WuxingMessages.SendSystemMessage(`${targetData.displayName} does not have the resources to use ${technique.name}`);
            }
        },
        
        consumeTechniqueResources = function (targetData, technique) {
            
            let resourceDatas = iterateOverResources(targetData, technique);
            if (resourceDatas == undefined) {
                return false;
            }
            consumeResourceData(targetData, resourceDatas);
            return true;
        },

        iterateOverResources = function(targetData, technique) {
            
            let resources = technique.resourceCost.split(";");
            let resource, resourceData;
            let resourceDatas = [];
            for (let i = 0; i < resources.length; i++) {
                resource = resources[i].trim().split(" ");
                if (resource.length > 1) {
                    resourceData = createResourceDataObj(targetData, resource);
                    if (resourceData == undefined) {
                        return undefined;
                    }
                    else {
                        resourceDatas.push(resourceData);
                    }
                }
            }
            return resourceDatas;
        },

        createResourceDataObj = function(targetData, resource) {
            let resourceData = {
                cost: ParseIntValue(resource[0]),
                resourceName: resource[1].toLowerCase(),
                resource: {},
                newVal: 0
            }
            resourceData = setResourceDataObjResource(targetData, resourceData);
            
            resourceData.newVal = ParseIntValue(resourceData.resource.get("current"));
            if (resourceData.newVal >= resourceData.cost) {
                resourceData.newVal -= resourceData.cost;
                return resourceData;
            }
            
            return undefined;
        },

        setResourceDataObjResource = function(targetData, resourceData) {
            resourceData.resource = GetCharacterAttribute(targetData.charId, resourceData.resourceName);
            return resourceData;
        },

        consumeResourceData = function(targetData, resourceDatas) {
            _.each(resourceDatas, function (obj) {
                if (obj.resourceName == "ki") {
                    WuxingToken.AddKi(targetData, obj.cost * -1, false);
                }
                else {
                    obj.resource.set("current", obj.newVal);
                }
            });
        }

        displayTechnique = function (msg, technique, weapon) {

            let output = FeatureService.GetRollTemplateFromTechnique(technique);

            technique.target = "@{target||token_id}";
            let useTech = SanitizeSheetRollAction(JSON.stringify(technique));

            if (weapon != undefined) {
                output += ItemHandler.GetTechniqueWeaponRollTemplate(weapon);
                useTech += `##${SanitizeSheetRollAction(JSON.stringify(weapon))}`;
            }
            output += `{{targetData=!utech ${useTech}}}`;
            WuxingMessages.SendMessage(output, "", msg.who);
            
        }
    ;
    return {
        ConsumeTechnique: consumeTechnique
    };

}());

var TechniqueUseResults = TechniqueUseResults || (function () {
    'use strict';

    var
        useTechnique = function(msg, technique, weaponData, userTargetData, defenderTargetData) {

            let skillCheck = makeTechniqueSkillCheck(technique, weaponData, userTargetData, defenderTargetData);
            let skillCheckMessage = createTechniqueSkillCheckOutput(skillCheck, technique, weaponData, userTargetData, defenderTargetData);
            let resultsMessage = createTechniqueResultsOutput(skillCheck, technique, weaponData, userTargetData, defenderTargetData);

            WuxingMessages.SendMessage(skillCheckMessage, "", msg.who);
            WuxingMessages.SendMessage(resultsMessage, ["GM"], msg.who);
        },

        makeTechniqueSkillCheck = function(technique, weaponData, userTargetData, defenderTargetData) {

            let output = {
                compareResults: {},
                userSkill: getTechniqueUserSkillRoll(technique, userTargetData, weaponData),
                defenderSkill: getTechniqueDefenderSkillRoll(technique, defenderTargetData, weaponData)
            }

            output.compareResults = compareTechniqueSkillChecks(output.userSkill, output.defenderSkill);
            return output;
        },

        getTechniqueUserSkillRoll = function(technique, userTargetData, weaponData) {
            
            let skillData = getBasicTechniqueSkillRollTypeData(technique.skill, technique, weaponData);
            skillData = getTechniqueSkillAttr(skillData, userTargetData);
            return getTechniqueSkillRoll(skillData);
        },

        getTechniqueDefenderSkillRoll = function(technique, defenderTargetData, weaponData) {
            
            if (technique.defense == "") {
                return getBasicCheckSkillData();
            }
            let skillData = getBasicTechniqueSkillRollTypeData(technique.defense, technique, weaponData);
            skillData = getTechniqueDefenderAttr(skillData, technique, defenderTargetData, weaponData);
            return getTechniqueSkillRoll(skillData);
        },

        getTechniqueSkillAttr = function(skillData, targetData) {
            skillData.attrSkill = `skill_${skillData.attrSkill}`;
            skillData.skillValue = ParseIntValue(getAttrByName(targetData.charId, skillData.attrSkill));
            return skillData;
        },

        getSkillRollData = function() {
            return {
                isDC: false,
                skillFull: "",
                attrSkill: "",
                roll: 0,
                skillValue: 0,
                total: 0
            };
        }

        getBasicCheckSkillData = function() {
            let output = getSkillRollData();
            output.isDC = true;
            output.skillFull = "Basic";
            output.roll = 15;
            output.total = 15;
            return output;
        }

        getTechniqueDefenderAttr = function(skillData, technique, targetData, weaponData) {
            // determine if any traits change the defender's defense
            skillData.skillValue = -10;
            skillData = getTechniqueDefenderAttrTraitMods(skillData, technique, targetData, weaponData);
            if (skillData.skillValue == -10) {
                skillData = getTechniqueDefenderAttrCombinedDefenseMods(skillData, targetData);
            }
            if (skillData.skillValue == -10) {
                skillData.skillValue = ParseIntValue(getAttrByName(targetData.charId, `skill_${skillData.attrSkill}`));
            }
            return skillData;
        },

        getTechniqueDefenderAttrTraitMods = function(skillData, technique, targetData, weaponData) {
            if (skillData.skillFull == "BR DC") {
                if (technique.traits.indexOf("Armament [F]") >= 0) {
                    if (weaponData.abilities.indexOf("Quick") >= 0) {
                        skillData.skillFull += "[Brace]";
                        skillData.attrSkill = "skill_brace";
                        skillData.skillValue = ParseIntValue(getAttrByName(targetData.charId, skillData.attrSkill));
                    }
                    else if (weaponData.abilities.indexOf("Crushing") >= 0) {
                        skillData.skillFull += "[Reflex]";
                        skillData.attrSkill = "skill_reflex";
                        skillData.skillValue = ParseIntValue(getAttrByName(targetData.charId, skillData.attrSkill));
                    }
                }
            }
            return skillData;
        },

        getTechniqueDefenderAttrCombinedDefenseMods = function(skillData, targetData) {

            switch(skillData.skillFull) {
                case "BR DC":
                    skillData = getBetterCombinedDefense(skillData, targetData, "skill_brace", "Brace", "skill_reflex", "Reflex");
                    break;
                case "PR DC":
                    skillData = getBetterCombinedDefense(skillData, targetData, "skill_presence", "Presence", "skill_reflex", "Reflex");
                    break;
                case "BP DC":
                    skillData = getBetterCombinedDefense(skillData, targetData, "skill_brace", "Brace", "skill_presence", "Presence");
                    break;
            }
            return skillData;
        },

        getBetterCombinedDefense = function(skillData, targetData, attr1, name1, attr2, name2) {

            let mod1 = ParseIntValue(getAttrByName(targetData.charId, attr1));
            let mod2 = ParseIntValue(getAttrByName(targetData.charId, attr2));
            skillData.skillFull += mod1 >= mod2 ? `[${name1}]` : `[${name2}]`;
            skillData.attrSkill = mod1 >= mod2 ? attr1 : attr2;
            skillData.skillValue = mod1 >= mod2 ? mod1 : mod2;
            return skillData;
        },

        getTechniqueSkillRoll = function(skillData) {
            
            skillData.roll = skillData.isDC ? 10 : randomInteger(20);
            skillData.total = skillData.roll + skillData.skillValue;

            return skillData;
        },

        getBasicTechniqueSkillRollTypeData = function(skill, technique, weaponData) {
            let skillData = getSkillRollData();

            if (skill == "Weapon") {
                skillData = setSkillRollDataFromWeapon(skillData, technique, weaponData);
            }
            else {
                skillData = parseSkillRollDataFromTechnique(skillData, skill);
            }
            return skillData;
        },

        setSkillRollDataFromWeapon = function(skillData, technique, weaponData) {
            if (technique.rType == "Range" && weaponData.traits.indexOf("Thrown") >= 0) {
                skillData.skillFull = "Throw";
                skillData.attrSkill = "throw";
            }
            else {
                skillData.skillFull = weaponData.skill;
                skillData.attrSkill = Format.ToCamelCase(weaponData.skill);
            }
            return skillData;
        },

        parseSkillRollDataFromTechnique = function(skillData, skill) {
            skillData.skillFull = skill;
            let splitIndex = skill.lastIndexOf(" ");
            if (splitIndex > 0) {
                skillData.isDC = skillData.skillFull.substring(splitIndex).trim() == "DC" ? true : false;
                if (skillData.isDC) {
                    skillData.attrSkill = Format.ToCamelCase(skill.substring(0, splitIndex));
                }
            }
            if (skillData.attrSkill == "") {
                skillData.attrSkill = Format.ToCamelCase(skill);
            }
            return skillData;
        },

        compareTechniqueSkillChecks = function(userSkill, defenderSkill) {
            if (userSkill.total >= defenderSkill.total + 10) {
                return "Critical Hit";
            }
            else if (userSkill.total >= defenderSkill.total) {
                return "Hit";
            }
            else if (userSkill.total >= defenderSkill.total - 5) {
                return "Glancing Hit";
            }
            
            return "Miss";
        },

        createTechniqueSkillCheckOutput = function(skillCheck, technique, weaponData, userTargetData, defenderTargetData) {
            let techUseDisplayData = createTechUseDisplaytData();
            techUseDisplayData = setTechUseDisplayTechniqueData(techUseDisplayData, technique);
            techUseDisplayData = setTechUseDisplayWeaponData(techUseDisplayData, technique, weaponData);
            techUseDisplayData = setTechUseDisplayUserTargetData(techUseDisplayData, userTargetData);
            techUseDisplayData = setTechUseDisplayDefTargetData(techUseDisplayData, technique, defenderTargetData);
            techUseDisplayData = setTechUseDisplaySkillCheckData(techUseDisplayData, skillCheck);
            return displayUsedTechnique(techUseDisplayData);
        },

        createTechniqueResultsOutput = function(skillCheck, technique, weaponData, userTargetData, defenderTargetData) {
            let message = "This would be a message with damages";

            return message;
        },

        createTechUseDisplaytData = function() {
            return {
                name: "",
                traits: "",
                description: "",
                onSuccess: "",
                damage: "",
                weaponTraits: "",
                weaponAbilities: "",
                userName: "",
                defenderName: "",
                defArmor: "",
                userSkillName: "",
                userSkillRollDetails: "",
                defSkillName: "",
                defSkillRollDetails: ""
            }
        },

        setTechUseDisplayTechniqueData = function(techUseDisplayData, technique) {
            techUseDisplayData.name = technique.name;
            techUseDisplayData.traits = technique.traits;
            techUseDisplayData.description = technique.description;
            techUseDisplayData.onSuccess = technique.onSuccess;
            techUseDisplayData.damage = FeatureService.GetDamageString(technique);
            return techUseDisplayData;
        },

        setTechUseDisplayWeaponData = function(techUseDisplayData, technique, weaponData) {
            if (technique.traits.indexOf("Armament") >= 0) {
                techUseDisplayData.weaponTraits = weaponData.traits;
                techUseDisplayData.damage = FeatureService.GetDamageString(weaponData);
                if (technique.traits.indexOf("Armament [F]") >= 0) {
                    techUseDisplayData.weaponAbilities = weaponData.abilities;
                }
            }
            return techUseDisplayData;
        },

        setTechUseDisplayUserTargetData = function(techUseDisplayData, userTargetData) {
            techUseDisplayData.userName = userTargetData.displayName;
            return techUseDisplayData;
        },

        setTechUseDisplayDefTargetData = function(techUseDisplayData, technique, defenderTargetData) {
            if (technique.defense != "") {
                techUseDisplayData.defenderName = defenderTargetData.displayName;
                techUseDisplayData.defArmor = ParseIntValue(getAttrByName(defenderTargetData.charId, "armor"));
            }
            return techUseDisplayData;
        },

        setTechUseDisplaySkillCheckData = function(techUseDisplayData, skillCheck) {
            let skillRoll = setTechUseDisplaySkillCheckMessage(skillCheck.userSkill);
            techUseDisplayData.userSkillName = skillRoll.name;
            techUseDisplayData.userSkillRollDetails = skillRoll.details;
            skillRoll = setTechUseDisplaySkillCheckMessage(skillCheck.defenderSkill);
            techUseDisplayData.defSkillName = skillRoll.name;
            techUseDisplayData.defSkillRollDetails = skillRoll.details;
            return techUseDisplayData;
        },

        setTechUseDisplaySkillCheckMessage = function(skillCheckRollData) {
            return {
                name: `${skillCheckRollData.total} [${skillCheckRollData.skillFull}]`,
                details: `${skillCheckRollData.roll} (Roll) + ${skillCheckRollData.skillValue} (Mod)`
            };
        },

        displayUsedTechnique = function(techData) {
            let message = "";
            message += `{{Name=${techData.name}}} `;
            message += `{{Targets=${techData.userName}${techData.defenderName != "" ? ` vs. ${techData.defenderName}` : ""}}} `;
            message += FeatureService.RollTemplateTraits(techData.traits, "technique", "Trait");
            message += FeatureService.RollTemplateTraits(techData.weaponTraits, "item", "WpnTrait");
            message += FeatureService.RollTemplateTraits(techData.weaponAbilities, "ability", "WpnAbility");

            if (techData.description != "" || techData.onSuccess != "") {
                message += "{{type-DescBlock=1}} ";
                message += techData.description != "" ? `{{Desc=${techData.description}}}` : "";
                message += techData.onSuccess != "" ? `{{OnHit=${techData.onSuccess}}}` : "";
            }
            if (techData.damage != "" || techData.userSkillName != "") {
                message += "{{type-CheckBlock=1}} ";
                message += techData.damage != "" ? `{{DamageString=${techData.damage}}} ` : "";
                message += techData.defArmor != "" ? `{{armor=${techData.defArmor}}} ` : "";
                if (techData.userSkillName != "") {
                    message += `{{skillRoll=${techData.userSkillName}}} {{skillDetails=${techData.userSkillRollDetails}}} `;
                    message += `{{defSkillRoll=${techData.defSkillName}}} {{defSkillDetails=${techData.defSkillRollDetails}}} `;
                }
            }
            return `&{template:usetechnique} ${message}`;
        }
    ;
    return {
        UseTechnique: useTechnique
    };

}());


on("ready", function () {
    'use strict';

    WuxingCombat.CheckInstall();
});

var WuxingMessages = WuxingMessages || (function() {
    'use strict';
    
    var schemaVersion = "0.1.0",

    checkInstall = function() {
        if( ! state.hasOwnProperty('WuxingMessages') || state.WuxingMessages.version !== schemaVersion) {
            state.WuxingMessages = {
                version: schemaVersion
            };
        }
    },

    // Commands
    // ---------------------------
    handleInput = function(msg, tag, content){
        
    },
    
    // Send Targets
    // ---------------------------
    sendChatToTargets = function (message, targets, sendUser, noarchive) {
        if (sendUser == undefined) {
            sendUser = "Wuxing Manager";
        }

        // send the message to each target
        if (targets != undefined && Array.isArray(targets)) {
            _.each(targets, function(target) {
                if (target != "") {
                    if (noarchive) {
                        sendChat(sendUser, "/w " + target + " " + message);
                    }
                    else {
                        sendChat(sendUser, "/w " + target + " " + message, null, {noarchive:true});
                    }
                }
            });
        }
        else {
            if (noarchive) {
                sendChat(sendUser, message);
            }
            else {
                sendChat(sendUser, message, null, {noarchive:true});
            }
        }
    },
    

    // RollTemplates
    // ---------------------------
    formatRollTemplateOutput = function(rollTemplateStyle, data) {
        let output = "";
        for (let i = 0; i < data.length; i++) {
            output += `{{${data[i][0]}=${data[i][1]}}}`;
        }
        return `&{template:${rollTemplateStyle}} ${output}`;
    }

    sanitizeRollTemplate = function (message) {
        message = message.replace(/\n/g, "<br />");
        return message;
    },

    formatSystemMessage = function (message) {
        message = sanitizeRollTemplate(message);
        return `<div class="sheet-rolltemplate-systemBox"><div>&nbsp;</div><div class="sheet-formattedTextbox">${message}</div></div>`;
    },

    formatInfoRollTemplateMessage = function (message) {
        return formatRollTemplateOutput("infoBox", [
            ["message", message]
        ]);
    },
    

    // Public Send Messages
    // ---------------------------
    sendSystemMessage = function (message, targets, sendUser, noarchive) {

        sendChatToTargets(formatSystemMessage(message), targets, sendUser, noarchive);
    },

    sendInfoMessage = function (message, targets, sendUser, noarchive) {

        sendChatToTargets(formatInfoRollTemplateMessage(message), targets, sendUser, noarchive);
    },

    sendTableMessage = function (headers, tableData, targets, sendUser, noarchive) {

        let tableHeader = "";
        for (let i = 0; i < headers.length; i++) {
            tableHeader += `<th class="sheet-wuxTableHeader">${headers[i]}</th>`;
        }

        let tableRow = "";
        let tableRows = "";
        for (let i = 0; i < tableData.length; i++) {
            tableRow = "";
            for (let j = 0; j < tableData[i].length; j++) {
                tableRow += `<td class="sheet-wuxTableData">${tableData[i][j]}</td>`;
            }
            tableRows += `<tr>${tableRow}</tr>`;
        }

        let output = formatSystemMessage(`<table class="sheet-wuxTable"><tr>${tableHeader}</tr>${tableRows}</table>`);

        sendChatToTargets(output, targets, sendUser, noarchive);
    }

    ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        SendMessage: sendChatToTargets,
        SendSystemMessage: sendSystemMessage,
        SendInfoMessage: sendInfoMessage,
        SendTableMessage: sendTableMessage
    };

}());


on("ready",function(){
    'use strict';

	WuxingMessages.CheckInstall(); 
});


// ======= Emote Object
// =================================================

function GetChatData() {
    return {
        target: undefined,
        message: "",
        chatType: "",
        sender: "",

        setChatDataFromMsg: function (msg) {
            let sendingPlayer = getObj('player', msg.playerid);
            this.sender = sendingPlayer.get("_displayname").split(" ")[0];
        
            // grab the selected character
            let targets = GetMessageTargetData(msg);
            if (targets.length > 0) {
                this.target = targets[0];
            }
            else {
                this.target = GetActorTargetData(msg.who.split(" ")[0])[0];
            }

        },

        setChatMessageFromMsgContent: function(msgContent) {
            this.chatType = "m";
    
            if (msgContent.indexOf("!m ") == 0) {
                this.chatType = "m";
                this.message = msgContent.replace("!m ", "");
            }
            else if (msgContent.indexOf("!w ") == 0) {
                this.chatType = "w";
                this.message = msgContent.replace("!w ", "");
            }
            else if (msgContent.indexOf("!y ") == 0) {
                this.chatType = "y";
                this.message = msgContent.replace("!y ", "");
            }
            else if (msgContent.indexOf("!t ") == 0) {
                this.chatType = "t";
                this.message = msgContent.replace("!t ", "");
            }
            else if (msgContent.indexOf("!d ") == 0) {
                this.chatType = "d";
                this.message = msgContent.replace("!d ", "");
            }
            else if (msgContent.indexOf("!de ") == 0) {
                this.chatType = "de";
                this.message = msgContent.replace("!de ", "");
            }
            this.message = ReplaceSpecialCharactersHTML(this.message);
        },

        sendEmoteOption: function() {

            if (this.target == undefined) {
                sendChat("Emote Manager", `/w ${this.sender} There was an error. Could not find character.`, null, {noarchive:true});
                return;
            }

            if (this.target.charId == "") {
                sendChat("Emote Manager", `/w ${this.sender} There was an error. You do not have a character selected.`, null, {noarchive:true});
                return;
            }

            // get emote list 
            let emoteData = GetOutfitEmoteData(this.target);
            if (!emoteData.isSet) {
                sendChat("Emote Manager", `/w ${this.sender} There was an error. ${emoteData.error}`, 
                    null, {noarchive:true}
                );
                return;
            }
            
            // get effects
            let element = SetSpiritRealmEffect(this.target);
            let languageButtons = GetLanguageButtons(this.target, this.chatType, this.message);
    
            // create the emote buttons
            let emoteButtons = "";
            emoteData.emotes.sort();
            for (var i = 0; i < emoteData.emotes.length; i++)
            {
                var emoteSplit = emoteData.emotes[i].split("@");
                emoteButtons += "[" + emoteSplit[0] + "]";
                emoteButtons += "(!&#13;";
                emoteButtons += GetEmoteMessage(this.target, this.chatType, this.message, emoteSplit[1], false, element) + " )";
                emoteButtons += " ";
            }
            emoteButtons = ReplaceBraces(emoteButtons);
            
            // write the final message
            let sendMessage = `/w ${this.sender} ${GetEmoteMessage(this.target, this.chatType, this.message, emoteData.activeURL, true, element)} {{sub=<div style='font-weight: bold'>Emotes</div>${emoteButtons}`;
            if (languageButtons != "")
            {
                sendMessage += "<br /><div style='font-weight: bold'>Languages</div>";
                sendMessage += languageButtons;
            }
            sendMessage += "}}";
            sendChat("Emote Manager", sendMessage, null, {noarchive:true});
        }
    };
}

// ======= Command Functions
// =================================================

function CommandGetEmoteMessageOptions(msg) {
    
    // grab message data
    let chatData = GetChatData();
    chatData.setChatDataFromMsg(msg);

    chatData.setChatMessageFromMsgContent(msg.content);
    chatData.sendEmoteOption();
}

function CommandSendFormattedMessage(msg) {
    
    // grab message data
    var sendingPlayer = getObj('player', msg.playerid);
    var sendingPlayerName = sendingPlayer.get("_displayname").split(" ")[0];
    
    ParseFormattedCommand(msg, msg.content, sendingPlayerName);
}

function CommandSetOutfit(msg) {
    
    var modifiers = msg.content.replace("!setoutfit ", "");

    // grab message data
    var sendingPlayer = getObj('player', msg.playerid);
    var sendingPlayerName = sendingPlayer.get("_displayname").split(" ")[0];
    var msgwho = msg.who.split(" ")[0];

    // grab the selected character
    var character = GetSelectedCharacter(msg, sendingPlayerName, msgwho);
    if (character != null) {
        SetOutfit(sendingPlayerName, character, modifiers);
    }
}

function CommandSetLanguage(msg) {

    // grab message data
    let messageParts = msg.content.replace("!setlang ", "").split("@@@");
    let chatData = GetChatData();
    chatData.setChatDataFromMsg(msg);

    var sendingPlayer = getObj('player', msg.playerid);
    var sendingPlayerName = sendingPlayer.get("_displayname").split(" ")[0];

    SetLanguage(sendingPlayerName, chatData.target, messageParts[0]);
    chatData.setChatMessageFromMsgContent(messageParts[1]);
    chatData.sendEmoteOption();
}

// ======= Replace Functions
// =================================================

function ReplaceSpecialCharactersHTML(str) {
	if (str != "undefined" && str != "" && str != null) {
		str = str.replace(/\'/gi, "&lsquo;");
		str = str.replace(/\xE9/gi, "&eacute;");
		str = str.replace(/\`/gi, "&lsquo;");
        str = str.replace(/\"/gi, "&lsquo;");
        str = str.replace(/\(/gi, "&#40;");
        str = str.replace(/\)/gi, "&#41;");
        str = str.replace(/\{/gi, "&#123;");
        str = str.replace(/\}/gi, "&#125;");
	}
	return str;
}

function ReplaceBraces(str) {
	if (str != "undefined" && str != "" && str != null) {
        str = str.replace(/\{/gi, "&#123;");
        str = str.replace(/\}/gi, "&#125;");
	}
	return str;
}

function RestoreSpecialCharactersHTML(str) {
    
	if (str != "undefined" && str != "" && str != null) {
		str = str.replace(/&lsquo;/gi, "'");
	}
	return str;
}

// ======= Get Emote Data Functions
// =================================================

function GetEmoteURL(charId, emote) {
    
    // find the emote
    var emoteURL = "";
    
    var emotesFromSheet = getAttrByName(charId, "emote_activesetemotes");
    if (emotesFromSheet != "") {
        emoteList = emotesFromSheet.split(",");
        let emoteData = [];
        for (var i = 0; i < emoteList.length; i++) {
            emoteData = emoteList[i].split("@");
            if (emoteData[0].toLowerCase() == emote.toLowerCase()) {
                emoteURL = emoteData[1];
                break;
            }
        };
    }

    if (emoteURL == "") {
        emoteURL = getAttrByName(charId, "emote_activesetimageurl");
    }
    return emoteURL;
}

// ======= Set Emote Data Functions
// =================================================

function SetOutfit(sendingPlayerName, character, modifier) {
    
    // begin message
    var sceneMessage = "/w " + sendingPlayerName;
    var lastEmoteURL = "";
    
    for (var i = 0; i < Number(getAttrByName(character.id, "outfitCount")); i++) {
        // get all of the character's emotes
        if (getAttrByName(character.id, "repeating_emoteOutfits_$" + i + "_name") == modifier) {
            var emoteList = getAttrByName(character.id, "repeating_emoteOutfits_$" + i + "_emoteSet").split(",");
            lastEmoteURL = getAttrByName(character.id, "repeating_emoteOutfits_$" + i + "_emoteSetURL");
            
            var outfitObj = GetCharacterAttribute(character.get("_id"), "emote_set");
            var activesetimageurlObj = GetCharacterAttribute(character.get("_id"), "emote_activesetimageurl");
            var activesetemotesObj = GetCharacterAttribute(character.get("_id"), "emote_activesetemotes");
            if (outfitObj != undefined && activesetimageurlObj != undefined && activesetemotesObj != undefined)
            {
                outfitObj.set("current", modifier);
                activesetimageurlObj.set("current", lastEmoteURL);
                activesetemotesObj.set("current", emoteList);
            }
        }
    }
    
    if (lastEmoteURL != "") {
        var sceneMessage = " Setting to outfit " + modifier + "<br /><img src='" + lastEmoteURL + "'>";
        sendChat("Emote Manager", "/w " + sendingPlayerName + sceneMessage, null, {noarchive:true});
    }
    else {
        sendChat("Emote Manager", "/w " + sendingPlayerName + " There was an error in your message. That outfit does not exist.", null, {noarchive:true});
    }

}

function SetLanguage(sendingPlayerName, target, language) {
    
    // get the language name
    if (language == "" || language == undefined) {
        language = "None";
    }
    language = GetLanguageName(language);

    let languageObj = GetCharacterAttribute(target.charId, "speaking_language");
    if (languageObj != null) {
        languageObj.set("current", language);
    }
    else {
        sendChat("Emote Manager", "/w " + sendingPlayerName + " There was an error in your message. This character doesn't have speaking_language set.", null, {noarchive:true});
    }
}

// ======= Send Functions
// =================================================

function ParseEmoteCommand(message, sendingPlayerName, target) {
    
    var chatType = "m";
    
    if (message.indexOf("!m ") == 0) {
        chatType = "m";
        message = message.replace("!m ", "");
    }
    else if (message.indexOf("!w ") == 0) {
        chatType = "w";
        message = message.replace("!w ", "");
    }
    else if (message.indexOf("!y ") == 0) {
        chatType = "y";
        message = message.replace("!y ", "");
    }
    else if (message.indexOf("!t ") == 0) {
        chatType = "t";
        message = message.replace("!t ", "");
    }
    else if (message.indexOf("!d ") == 0) {
        chatType = "d";
        message = message.replace("!d ", "");
    }
    else if (message.indexOf("!de ") == 0) {
        chatType = "de";
        message = message.replace("!de ", "");
    }
    message = ReplaceSpecialCharactersHTML(message);
}

function ParseFormattedCommand(msg, message, sendingPlayerName) {
            
    // determine the message type
    var chatType = "i";
    if (msg.content.indexOf("!h ") !== -1) {
        chatType = "h";
        message = msg.content.replace("!h ", "");
    }
    else if (msg.content.indexOf("!r ") !== -1) {
        chatType = "r";
        message = msg.content.replace("!r ", "");
    }
    else if (msg.content.indexOf("!ry ") !== -1) {
        chatType = "ry";
        message = msg.content.replace("!ry ", "");
    }
    else if (msg.content.indexOf("!i ") !== -1) {
        chatType = "i";
        message = msg.content.replace("!i ", "");
    }
    else if (msg.content.indexOf("!a ") !== -1) {
        chatType = "a";
        message = msg.content.replace("!a ", "");
    }
    else if (msg.content.indexOf("!l ") !== -1) {
        chatType = "l";
        message = msg.content.replace("!l ", "");
    }
    else if (msg.content.indexOf("!s ") !== -1) {
        chatType = "s";
        message = msg.content.replace("!s ", "");
    }

    SendFormattedMessage(sendingPlayerName, chatType, message, false);
    
}

function GetOutfitEmoteData(target) {

    let emoteData = {
        isSet: false,
        error: "",
        emotes: [],
        activeURL: "",
    };
    
    let emotesFromSheet = getAttrByName(target.charId, "emote_activesetemotes");
    if (emotesFromSheet != "") {
        emoteData.isSet = true;
        emoteData.emotes = emotesFromSheet.split(",");
        emoteData.activeURL = getAttrByName(target.charId, "emote_activesetimageurl");
    }
    else {
        emoteData.error = "This character has no emotes or does not have an emote outfit set.";
    }

    return emoteData;
}

function SetSpiritRealmEffect(target) {
    
    let spiritRealm = getAttrByName(target.charId, "status-ethereal");
    let element = "";
    if (spiritRealm == "1") {
        if (target.tokenId != "") {
            var token = getObj("graphic", target.tokenId);
            element = GetTokenElement(token);
        }
        if (element == "") {
            element = getAttrByName(target.charId, "prime_element");
        }
    }

    return element;
}

function GetLanguageButtons(target, chatType, message) {
    let languageButtons = "";
    let languageList = getAttrByName(target.charId, "language_allLanguages");
    if (languageList == "") {
        let isNPC = getAttrByName(target.charId, "npc");
        if (isNPC != undefined && isNPC == true) {
            languageList = "Minere,Apollen,Junal,Lib,Jovean,None";
        }
    }

    if (languageList != undefined) {
        languageList = languageList.split(",");
        for (let i = 0; i < languageList.length; i++) {
            if(languageList[i] != "") {
                languageButtons += "[" + languageList[i] + "](!setlang ";
                languageButtons += languageList[i] + "@@@" + "!" + chatType + " " + message + ")";
                languageButtons += " ";
            }
        }
    }

    return languageButtons;
}

function GetEmoteMessage(target, chatType, message, imageUrl, useTemplate, element, chattemplateTitle) {

    if (chattemplateTitle == undefined) {
        chattemplateTitle = target.displayName;
    }

    // get the language
    let language = GetSelectedLanguage(target.charId);
    let languageTag = GetLanguageTag(language);

    // see if there's a target for the message
    var messageTarget = "";
    var messageTargetCheck = message.indexOf("/");
    if (messageTargetCheck != -1) {
        var messageTargetSubStr = message.substr(messageTargetCheck + 1);
        var endOfMessage = messageTargetSubStr.indexOf("/");
        messageTarget = messageTargetSubStr.substr(0, endOfMessage);
        if (!messageTarget.startsWith(",") && messageTarget.toLowerCase().indexOf("to") != 0)
        {
            messageTarget = "to " + messageTarget;
        }
        // punctuation
        if (!messageTarget.startsWith(",") && !messageTarget.startsWith(" ")) {
            messageTarget = " " + messageTarget;
        }
        message = message.substr(messageTargetCheck + endOfMessage + 2).trim();
    }

    // format the output
    var chattemplate = "ctmsg";
    switch (chatType) {
        case "m":
            chattemplate = "ctmsg";
            chattemplateTitle += " says";
            break;
        case "w":
            chattemplate = "ctwsp";  
            chattemplateTitle += " whispers"; 
            break;
        case "y":
            chattemplate = "ctyell";
            chattemplateTitle += " yells";
            break;
        case "t":
            chattemplate = "ctthk";
            break;
        case "d":
            chattemplate = "ctdesc";
            message = chattemplateTitle + " " + message;
            break;
        case "de":
            chattemplate = "ctdesc";
            break;
        case "interact":
            chattemplate = "ctinteract";
            chattemplateTitle += " says";
            break;
        case "intro":
            chattemplate = "ctintro";
            break;
    }
    chattemplateTitle += messageTarget;
    
    // create the output
    var sendMessage = "";
    if (useTemplate) {
        sendMessage += "&{template:" + chattemplate + "} ";
    }
    else {
        sendMessage += "#" + chattemplate + " ";
    }
    sendMessage += "{{url=" + imageUrl + "}} ";
    sendMessage += "{{title=" + chattemplateTitle + "}} ";
    sendMessage += "{{message=" + message + "}} ";
    sendMessage += "{{language=" + language + "}} ";
    sendMessage += languageTag;
    if (element != "") {
        sendMessage += `{{spirit=1}}{{${element.toLowerCase()}=1}}`;
    }
    return sendMessage;
}

function SendFormattedMessage(sender, chatType, message, noarchive) {
    if (noarchive) {
        sendChat(sender, GetFormattedMessage(chatType, message), null, {noarchive:true});
    }
    else {
        sendChat(sender, GetFormattedMessage(chatType, message));
    }
}

// ======= Message Formats Functions
// =================================================

function GetStatusMessage(emoteUrl, titleMessage, message) {
    
    // grab display settings
    var emoteData = emoteUrl.split("@");
    
    var messageStyle = "border: 1px solid grey; background-color: #fff; font-family: Courier, monospace;";

    var messages = message.split("/");
    var content = "<table>";
    for (i = 0; i < messages.length; i++) {
        if (messages[i] != "")
        {
            var split = messages[i].split("@");
            content += "<tr>";
            content += "<td style='font-size: 10px; ";
            content += split.length > 2 ? split[2] : "";
            content += ">" + split[0] + "</td>";
            content += "<td style='text-align: right; width: 30px; font-size: 10px; ";
            content += split.length > 3 ? split[3] : "";
            content += "'>" + split[1] + "</td>";
            content += "</tr>";
        }
    }
    content += "</table>";
    
    // set the output
    var sceneMessage = "";
    sceneMessage += "<div>&nbsp;</div>";
    sceneMessage += "<table style='border: 0px solid black; margin: 0px -40px 0px -40px;'>";
    sceneMessage +=   "<tr>";
    sceneMessage +=     "<td rowspan='2' style='min-width: " + emoteData[1] + "px; vertical-align: top; border: 0px; padding: 0px; margin: 0px;'>";
    sceneMessage +=         "<img src='" + emoteData[0] + "' style='min-width: " + emoteData[1] + "px;'>";
    sceneMessage +=     "</td>";
    sceneMessage +=     "<td style='border: 0px; padding: 0px; margin: 0px; text-align: left;'>";
    sceneMessage +=       "<div style='display: inline-block; padding: 3px 10px 3px 10px; margin: 5px 50px 0px 25px; min-width: 30px; ";
    sceneMessage +=       "border-radius: 5px 5px 5px 5px; background-color: #444; color: white; font-size: 12px;'>";
    sceneMessage +=         titleMessage;
    sceneMessage +=       "</div>";
    sceneMessage +=     "</td>";
    sceneMessage +=   "</tr>";
    sceneMessage +=   "<tr>";
    sceneMessage +=     "<td style='border: 0px; padding: 0px; margin: 0px; text-align: left;'>";
    sceneMessage +=       "<div style='display: inline-block; padding: 5px; margin: 5px 50px 0px 25px; min-width: 30px; ";
    sceneMessage +=       "vertical-align: top; background-color: #fff; ";
    sceneMessage +=       messageStyle + "'>";
    sceneMessage +=         content;
    sceneMessage +=       "</div>";
    sceneMessage +=     "</td>";
    sceneMessage +=   "</tr>";
    sceneMessage += "</table>";
    
    return sceneMessage;
}

function GetFormattedMessage(chatType, message) {

    // declare variables
    let content = "";
    let template = "";
    let sceneMessage = "";
    
    switch (chatType) {
        case "i": 
            template = "infoBox"; 
            content = message;
        break;
        case "sia": 
            template = "systemInfoAuxBox"; 
            content = message;
        break;
        case "si": 
            template = "systemInfoBox"; 
            content = message;
        break;
        case "r": 
            template = "responseBox"; 
            content = message;
        break;
        case "ry": 
            template = "responseYellBox"; 
            content = message;
        break;
        case "s": 
            template = "systemBox"; 
            content = message;
        break;
    }
    if (template != "") {
        sceneMessage = "&{template:" + template + "} {{message=" + content + "}}";
        return sceneMessage;
    }
    
    switch (chatType) {
        case "a": 
            template = "sheet-rolltemplate-attackBox"; 
            content = message;
            break;
        case "dmAlert": 
            template = "sheet-rolltemplate-dmAlert";
            content = message;
            break;
    }

    if (template != "") {
        sceneMessage += "<div class='" + template + "'>";
        sceneMessage += "<div>&nbsp;</div>";
        sceneMessage += "<div class='sheet-formattedTextbox'>";
        sceneMessage += content;
        sceneMessage += "</div></div>";
        return sceneMessage;
    }

    // declare more variables
    let textStyle = "";
    let messages = message.split("/");
    let i = 0;
    
    switch (chatType) {
        case "h":
            textStyle = "border: 3px ridge #555; background-color: #fff;";
            
            content += "<span style='font-family: Georgia, serif; font-size: 16px; font-weight: bold;'>" + messages[0].trim() + "</span>";
            for (i = 1; i < messages.length; i++) {
                if (i == messages.length - 1) {
                    content += "<br /><span style='font-family: Courier, monospace; font-size: 12px;'>" + messages[i].trim() + "</span>";
                }
                else
                {
                    content += "<br /><span style='font-family: Georgia, serif; font-size: 14px;'>" + messages[i].trim() + "</span>";
                }
            }
            break;
        case "g":
            textStyle = "border: 1px solid grey; background-color: #e9f7f7; font-family: Courier, monospace;";
            
            content = "<span style='width: 180px; display: inline-block; font-weight: bold;'>" + messages[0] + " Checks</span>";
            for (i = 1; i < messages.length; i++) {
                if (messages[i] != "")
                {
                    var split = messages[i].split("@");
                    content += "<br /><span style='width: 120px; display: inline-block;'>" + split[1] + "</span>";
                    content += "<span style='width: 60px; display: inline-block; text-align: right;'>" + split[0] + "</span>";
                }
            }
            break;
        case "l":
            textStyle = "border: 1px solid grey; background-color: #e9ffe7;";
            content = message;
            break;
    }
        
    sceneMessage = "<div>&nbsp;</div>";
    sceneMessage += "<div style='position: relative; margin: 0px 10px 0px -10px; display: inline-block; font-size: 12px; padding: 5px; vertical-align: top; ";
    sceneMessage += textStyle + "'>" + content + "</div>";
    return sceneMessage;
}

function GetCutInMessage(charName, charId, message, subMessage) {
    let charImage = getAttrByName(charId, "emote_activesetcutinimageurl");

    if (charImage != undefined && charImage != "" && charImage != "0") {
        return "&{template:cutinBox} {{header=" + charName + "}} {{url=" + charImage + "}} {{message=" + message + "}} {{sub=" + subMessage + "}}";
    }
    else {
        charImage = getAttrByName(charId, "emote_activesetfireimageurl");
        return GetSkilledActionMessage(charName, charImage, message, subMessage);
    }

}

function GetSkilledActionMessage(charName, imageUrl, message, subMessage) {

    return "&{template:action} {{username=" + charName + "}} {{image=" + imageUrl + "}} {{rname=" + message + "}} {{description=" + subMessage + "}}";
}

function GetFoldingMessaage(header, contents) {

    var message = "<div class='sheet-wuxTemplateFoldSection'>";
    message += "<span class='sheet-wuxTemplateFoldHeader'>" + header + "</span>";
    message += "<div class='sheet-wuxTemplateFold'>" + contents + "</div>";
    message += "</div>";
    return message;
}

// Language Functions
// =================================================

function GetSelectedLanguage(charId) {
    
    var language = getAttrByName(charId, "speaking_language");
    if (language == "" || language == undefined) {
        language = "None";
    }
    
    // make sure it's formatted properly
	return GetLanguageName(language);
}

var WuxingTarget = WuxingTarget || (function () {
    'use strict';

    var schemaVersion = "0.1.0",

        checkInstall = function () {
            if (!state.hasOwnProperty('WuxingTarget') || state.WuxingTarget.version != schemaVersion) {
                log (`Setting Wuxing Target version to v${WuxingTarget.schemaVersion}`);
                state.WuxingTarget = {
                    version: schemaVersion,
                    activeCharacters: getDefaultActiveCharacters()
                };
            }
        },

        // Input Commands
        // ---------------------------

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!actadd":
                    commandAddCharacter(msg, content);
                    break;
                case "!actrem":
                    commandRemoveCharacter(msg);
                    break;
                case "!actclr":
                    commandClearActiveTargets();
                    break;
            };
        },

        commandAddCharacter = function (msg, content) {
            let isAlly = content == "true" ? true : false;
            let tokenData;
            let message = "";
            WuxingToken.IterateOverSelectedTokens(msg, function (token) {
                tokenData = addCombatTokenToActiveTargets(token, isAlly);
                if (tokenData != undefined) {
                    if (message != "") {
                        message += ", ";
                    }
                    message += `${tokenData.displayName}`;
                }
            });
            message = `${message} added as ${isAlly ? "ally" : "enemy"} unit(s)`;
            WuxingMessages.SendSystemMessage(message, ["GM"]);

        },

        commandRemoveCharacter = function (msg) {
            WuxingToken.IterateOverSelectedTokens(msg, function (token) {
                removeActiveTargetData(token.get("id"));
            });
        },

        commandClearActiveTargets = function () {
            clearActiveTargetData();
        },

        // Active Characters
        // ---------------------------

        getDefaultActiveCharacters = function () {
            return {
                charNames: [],
                tokenIds: [],
                targetData: []
            };
        },

        iterateOverActiveTargetData = function (callback) {
            _.each(state.WuxingTarget.activeCharacters.targetData, function (obj) {
                callback(obj);
            });
        },

        addToActiveCharacters = function (targetData) {
            if (targetData != undefined) {
                if (state.WuxingTarget.activeCharacters.tokenIds.includes(targetData.tokenId)) {
                    let index = state.WuxingTarget.activeCharacters.tokenIds.indexOf(targetData.tokenId);
                    state.WuxingTarget.activeCharacters.targetData[index] = targetData;
                }
                else {
                    state.WuxingTarget.activeCharacters.charNames.push(targetData.name);
                    state.WuxingTarget.activeCharacters.tokenIds.push(targetData.tokenId);
                    state.WuxingTarget.activeCharacters.targetData.push(targetData);
                }
            }
        },

        addCombatTokenToActiveTargets = function (token, isAlly) {
            let targetData = createTargetData(token, isAlly);
            addToActiveCharacters(targetData);
            return targetData;
        },

        removeActiveTargetData = function (tokenId) {
            for (var i = 0; i < state.WuxingTarget.activeCharacters.tokenId.length; i++) {
                if (state.WuxingTarget.activeCharacters.tokenId[i] == tokenId) {
                    state.WuxingTarget.activeCharacters.charNames[i].splice(i, 1);
                    state.WuxingTarget.activeCharacters.tokenIds[i].splice(i, 1);
                    state.WuxingTarget.activeCharacters.targetData[i].splice(i, 1);
                    break;
                }
            }
        },

        clearActiveTargetData = function () {
            state.WuxingTarget.activeCharacters = getDefaultActiveCharacters();
        },

        // Token Data Search
        // ---------------------------

        findActiveTargetDataByCharName = function (characterName) {
            let index = state.WuxingTarget.activeCharacters.charNames.indexOf(characterName);
            if (index >= 0) {
                return state.WuxingTarget.activeCharacters.targetData[index];
            }
            return undefined;
        },

        findActiveTargetDataByTokenId = function (tokenId) {
            let index = state.WuxingTarget.activeCharacters.tokenIds.indexOf(tokenId);
            if (index >= 0) {
                return state.WuxingTarget.activeCharacters.targetData[index];
            }
            return undefined;
        },

        getTargetDataByToken = function (token) {
            let index = state.WuxingTarget.activeCharacters.tokenIds.indexOf(token.get("_id"));
            if (index >= 0) {
                return state.WuxingTarget.activeCharacters.targetData[index];
            }
            else {
                return createTargetData(token, false);
            }
        },

        // Target Data Creation
        // ---------------------------

        createTargetData = function (token, isAlly) {
            let charId = token.get("represents");
            if (charId != "") {
                let character = getObj('character', charId);
                let ownerId = character.get("controlledby").split(",")[0];
                let ownerName = "";
                if (ownerId != "") {
                    ownerName = getObj("player", ownerId).get("_displayname");
                }
                let targetData = {
                    name: character.get("name"),
                    charId: charId,
                    tokenId: token.get("id"),
                    displayName: getAttrByName(charId, "nickname"),
                    owner: ownerName,
                    elem: getAttrByName(charId, "token_element"),
                    isAlly: isAlly
                };
                WuxingToken.AddToken(token, targetData);
                return targetData;
            }
            return undefined;
        }


        ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        IterateOverActiveTargetData: iterateOverActiveTargetData,
        ClearActiveTargetData: clearActiveTargetData,
        FindActiveTargetDataByCharName: findActiveTargetDataByCharName,
        FindActiveTargetDataByTokenId: findActiveTargetDataByTokenId,
        GetTargetDataByToken: getTargetDataByToken

    };

}());

var WuxingToken = WuxingToken || (function () {
    'use strict';

    var schemaVersion = "0.1.0",

        checkInstall = function () {
            if (!state.hasOwnProperty('WuxingToken') || state.WuxingToken.version !== schemaVersion) {
                state.WuxingToken = {
                    version: schemaVersion,
                    tokens: {}
                };
            }
            state.WuxingToken.tokens = {};
        },

        // Input Commands
        // ---------------------------

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!dmg":
                    commandDealDamage(msg, content);
                    break;
            };
        },

        commandDealDamage = function (msg, content) {
            let targetData;
            iterateOverSelectedTokens(msg, function (token) {
                targetData = WuxingTarget.GetTargetDataByToken(token);
                addDamage(targetData, token, parseInt(content));
            });
        }, 

        // State Token Getters
        // ---------------------------

        getTargetToken = function (targetData) {
            if (state.WuxingToken.tokens[targetData.tokenId] == undefined) {
                let token = getObj('graphic', targetData.tokenId);
                addToken(token, targetData);
            }
            return state.WuxingToken.tokens[targetData.tokenId];
        },

        addToken = function(token, targetData) {
            state.WuxingToken.tokens[targetData.tokenId] = token;
        },

        // Data Helper
        // ---------------------------

        iterateOverSelectedTokens = function (msg, callback) {
            let token;
            _.each(msg.selected, function (obj) {

                // set token variables
                token = getObj('graphic', obj._id);

                if (token != undefined) {
                    callback(token);
                }
            });
        },

        // Token State
        // ---------------------------

        setTokenForBattle = function (targetData, token) {
            if (token == undefined) {
                token = getTargetToken(targetData);
            }

            // set vitals
            let hp = GetCharacterAttribute(targetData.charId, "hp");
            token.set("bar1_link", hp.get("_id"));
            token.set("bar1_value", hp.get("max"));
            token.set("bar1_max", hp.get("max"));
            token.set("showplayers_bar1", true);
            token.set("showplayers_bar1text", "2");
            let tempHp = GetCharacterAttribute(targetData.charId, "tempHp");
            token.set("bar2_link", tempHp.get("_id"));
            token.set("bar2_max", "0");
            token.set("showplayers_bar2", true);
            token.set("showplayers_bar2text", "2");

            // set token name
            token.set("name", getAttrByName(targetData.charId, "nickname"));
            token.set("showname", true);
            token.set("showplayers_name", true);
            token.set("bar_location", "overlap_bottom");

            // set the token element
            token.set(getAttrByName(targetData.charId, "token_element"), true);

            // set tooltip
            token.set("show_tooltip", true);
            //token.set("tooltip", getAttrByName(tokenData.charId, "scan-summary"));
        },

        setTokenForNarative = function (targetData, token) {
            if (token == undefined) {
                token = getTargetToken(targetData);
                if (token == undefined) {
                    return;
                }
            }
            token.set("bar1_link", "");
            token.set("bar1_value", "");
            token.set("bar1_max", "");
            token.set("showplayers_bar1", false);
            token.set("bar2_link", "");
            token.set("bar2_value", "");
            token.set("bar2_max", "");
            token.set("showplayers_bar2", false);
            token.set("showname", false);
            token.set(getAttrByName(targetData.charId, "token_element"), false);
            token.set("show_tooltip", false);
            token.set("status_yellow", false);
        },

        addHp = function (targetData, token, value) {
            if (token == undefined) {
                token = getTargetToken(targetData);
                if (token == undefined) {
                    return;
                }
            }

            let total = parseInt(getAttrByName(targetData.charId, "hp")) + value;
            let remainder = 0;
            if (total < 0) {
                remainder = total;
                total = 0;
            }
            token.set("bar1_value", total);
            return remainder;
        },

        resetTempHp = function (targetData, token) {
            if (token == undefined) {
                token = getTargetToken(targetData);
                if (token == undefined) {
                    return;
                }
            }
            token.set("bar2_value", getAttrByName(targetData.charId, "tempHpTotal"));
        },

        addTempHp = function (targetData, value) {
            if (token == undefined) {
                token = getTargetToken(targetData);
                if (token == undefined) {
                    return;
                }
            }
            let total = parseInt(token.get("bar2_value")) + value;
            let remainder = 0;
            if (total < 0) {
                remainder = total;
                total = 0;
            }
            token.set("bar2_value", total);
            return remainder;
        },

        addDamage = function (targetData, token, value, stopAtTempHp) {
            if (token == undefined) {
                token = getTargetToken(targetData);
                if (token == undefined) {
                    return;
                }
            }

            // make the damage value negative
            value *= -1;

            // first deal any damage to tempHp
            value = addTempHp(targetData, value);

            // if damage remains, go to health damage
            if (!stopAtTempHp && value < 0) {
                let currentHp = parseInt(token.get("bar2_value"));
                let maxHp = parseInt(token.get("bar2_max"));
                let trauma = GetCharacterAttribute(targetData.charId, "trauma");
                let woundDamage = 0;

                while (value < 0) {
                    currentHp += value;
                    value = 0;
                    if (currentHp <= 0) {
                        woundDamage++;
                        if (parseInt(trauma.get("current")) + woundDamage < parseInt(trauma.get("max"))) {
                            value = currentHp;
                            currentHp = maxHp;
                        }
                        else {
                            currentHp = 0;
                        }
                    }
                }

                // set damage
                token.set("bar2_value", currentHp);
                if (woundDamage > 0) {
                    let wounds = GetCharacterAttribute(targetData.charId, "wounds");
                    wounds.set("current", parseInt(wounds.get("current")) + woundDamage);
                    trauma.set("current", parseInt(trauma.get("current")) + woundDamage);
                }
            }
        },

        addKi = function (tokenData, value, cap) {
            let token = getTargetToken(tokenData);
            if (token == undefined) {
                return;
            }
            let ki = GetCharacterAttribute(tokenData.charId, "ki");
            let newValue = parseInt(ki.get("current")) + value;
            if (cap && newValue > parseInt(ki.get("max"))) {
                newValue = parseInt(ki.get("max"));
            }
            ki.set("current", newValue);
            token.set(tokenData.elem, newValue);
        },

        setTurnIcon = function (tokenData, value) {
            let token = getTargetToken(tokenData);
            if (token == undefined) {
                return;
            }
            token.set("status_yellow", value);
        }


        ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        IterateOverSelectedTokens: iterateOverSelectedTokens,
        AddToken: addToken,
        SetTokenForBattle: setTokenForBattle,
        SetTokenForNarative: setTokenForNarative,
        AddHp: addHp,
        ResetTempHp: resetTempHp,
        AddTempHp: addTempHp,
        AddDamage: addDamage,
        AddKi: addKi,
        SetTurnIcon: setTurnIcon
    };

}());

on("ready", function () {
    'use strict';

    WuxingTarget.CheckInstall();
    WuxingToken.CheckInstall();
});















// ======= Base
// =================================================
function CommandCharacterFunction(msg) {

    var content = "";
    let targets = GetMessageTargetData(msg);
    let sendTargets = "";

    // get the content rules and determine if this is a whispered message
    if (msg.content.indexOf("!cw ") == 0) {
        content = msg.content.replace("!cw ", "");
        sendTargets = "GM";
    }
    else if (msg.content.indexOf("!cp ") == 0) {
        content = msg.content.replace("!cp ", "");
        sendTargets = "GM";
    }
    else if (msg.content.indexOf("!cps ") == 0) {
        content = msg.content.replace("!cps ", "");
    }
    else {
        content = msg.content.replace("!c ", "");
    }

    // get the action and modifiers
    var actionEnd = content.trim().indexOf(" ");
    var action = "";
    var modifiers = "";
    if (actionEnd == -1) {
        action = content;
        modifiers = "";
    } else {
        action = content.substring(0, actionEnd);
        modifiers = content.substring(actionEnd).trim();
    }

    TargetOptions(msg, action, modifiers, sendTargets, targets);
}

function CommandTokenFunction(msg) {

    var content = "";
    let sendTargets = "";

    // get the content rules and determine if this is a whispered message
    if (msg.content.indexOf("!tokenw ") == 0) {
        content = msg.content.replace("!tokenw ", "");
        sendTargets = "GM";
    } else {
        content = msg.content.replace("!token ", "");
    }

    // split the content
    var contentSplit = content.split("@@@");
    let targets = GetTokenIdListTargetData(contentSplit[0]);

    if (targets.length > 0) {

        // get the action and modifiers
        var actionEnd = contentSplit[1].trim().indexOf(" ");
        var action = "";
        var modifiers = "";
        if (actionEnd == -1) {
            action = contentSplit[1];
            modifiers = "";
        } else {
            action = contentSplit[1].substring(0, actionEnd);
            modifiers = contentSplit[1].substring(actionEnd).trim();
        }

        TargetOptions(msg, action, modifiers, sendTargets, targets);
    }
}

function CommandTargetFunction(msg) {

    var content = "";
    let sendTargets = "";

    if (msg.content.indexOf("!target ") !== -1) {
        content = msg.content.replace("!target ", "").trim();
    }
    else if (msg.content.indexOf("!targetw ") !== -1) {
        sendTargets = "GM";
        content = msg.content.replace("!targetw ", "").trim();
    }

    // split the content
    var contentSplit = content.split("@@@");
    let targets = GetIdListTargetData(contentSplit[0]);
    GetTargetOptionsFromTargetList(msg, sendTargets, contentSplit, targets);
}

function CommandTargetNameFunction(msg) {

    var content = "";
    let sendTargets = "";

    if (msg.content.indexOf("!targetname ") !== -1) {
        content = msg.content.replace("!targetname ", "").trim();
    }
    else if (msg.content.indexOf("!targetnamew ") !== -1) {
        sendTargets = "GM";
        content = msg.content.replace("!targetnamew ", "").trim();
    }

    // split the content
    var contentSplit = content.split("@@@");
    let targets = GetActorTargetData(contentSplit[0]);
    GetTargetOptionsFromTargetList(msg, sendTargets, contentSplit, targets);
}

function GetTargetOptionsFromTargetList(msg, sendTargets, contentSplit, targets) {
    if (targets.length > 0) {

        // get the action and modifiers
        var actionEnd = contentSplit[1].trim().indexOf(" ");
        var action = "";
        var modifiers = "";
        if (actionEnd == -1) {
            action = contentSplit[1];
            modifiers = "";
        } else {
            action = contentSplit[1].substring(0, actionEnd);
            modifiers = contentSplit[1].substring(actionEnd).trim();
        }

        TargetOptions(msg, action, modifiers, sendTargets, targets);
    }
}

function CommandTargetPartyFunction(msg) {
    // this calls a character target function if there are targets selected,
    // otherwise, calls a party target function

    if (msg.selected == undefined) {
        CommandPartyFunction(msg);
    }
    else {
        CommandCharacterFunction(msg);
    }
}

function CommandPartyFunction(msg) {

    // get variables
    var content = "";
    var partyManager = FindCharacter("PartyManager");
    let targets = GetActorTargetData(getAttrByName(partyManager.id, "current_party_members"));
    let sendTargets = "";


    if (msg.content.indexOf("!p") !== -1) {
        if (msg.content.indexOf("!ps ") !== -1) {
            content = msg.content.replace("!ps ", "");
        } else {
            sendTargets = "GM";
            content = msg.content.replace("!p ", "");
        }
    }
    else if (msg.content.indexOf("!cps") !== -1) {
        content = msg.content.replace("!cps ", "");
    }
    else if (msg.content.indexOf("!cp") !== -1) {
        sendTargets = "GM";
        content = msg.content.replace("!cp ", "");
    }

    // get the action and modifiers
    var actionEnd = content.trim().indexOf(" ");
    var action = "";
    var modifiers = "";
    if (actionEnd == -1) {
        action = content;
        modifiers = "";
    } else {
        action = content.substr(0, actionEnd);
        modifiers = content.substr(actionEnd).trim();
    }

    TargetOptions(msg, action, modifiers, sendTargets, targets);
}

function TargetOptions(msg, action, modifiers, sendTargets, targets) {

    let sendingPlayerName = "GM";
    let player = getObj('player', msg.playerid);
    if (player != undefined) {
        sendingPlayerName = player.get("_displayname").split(" ")[0];
    }

    if (playerIsGM(msg.playerid)) {
        switch (action.toLowerCase()) {
            // TURN
            case "startturn":

            // EXPERIENCE
            case "xp":
                TargetAddExp(sendTargets, targets, modifiers);
                return;
            case "setlevelxp":
                TargetSetBaseLevelExp(sendTargets, targets);
                return;

            // INSPIRATION
            case "gainmorale":
                TargetsGainMorale(sendTargets, targets, modifiers);
                return;
            case "gainkarma":
                TargetsGainKarma(sendTargets, targets, modifiers);
                return;

            // SOCIAL
            case "addsocial":
                TargetAddSocializingCharacter(sendTargets, targets, modifiers);
                return;

            // REST
            case "brief":
                TargetSetBriefRested(sendTargets, targets);
                return;
            case "short":
                TargetSetShortRested(sendTargets, targets);
                return;
            case "long":
                TargetSetLongRested(sendTargets, targets, modifiers);
                return;

            // DOWNTIME
            case "addweek":
                TargetAddWeek(targets, modifiers);
                return;
            case "clone":
                _.each(targets, function (target) {
                    SetCloneManagerClone(target.charId);
                });
                return;

        }
    }

    switch (action.toLowerCase()) {
        // CHAT 
        case "name":
            TargetSetValue(sendingPlayerName, targets, "name", "nickname", modifiers);
            break;
        case "lang":
            TargetSetValue(sendingPlayerName, targets, "language", "speaking_language", modifiers);
            break;

        // INSPIRATION 
        case "insp":
            TargetSpendInspiration(sendTargets, targets);
            break;
        case "morale":
            TargetRequestMorale(targets);
            break;
        case "resolve":
            TargetSpendResolve(sendTargets, targets);
            break;
        case "karma":
            TargetRequestKarma(targets);
            break;
        case "fate":
            TargetSpendFate(sendTargets, targets);
            break;

        // SKILLS
        case "rollinit":
            TargetGetCompareChart(sendTargets, targets, "Initiative", "initiative_bonus");
            break;
        case "sensepresence":
            TargetGetCompareChart(sendTargets, targets, "Sense Presence", "sensepresence_mod");
            break;
        case "sensemotive":
            TargetGetCompareChart(sendTargets, targets, "Sense Motive", "sensemotive_mod");
            break;

        // MONEY
        case "jin":
            TargetModifyValue(sendTargets, targets, "Jin", false, "jin", modifiers);
            break;
        case "jins":
            TargetModifyValue(sendTargets, targets, "Jin", true, "jin_storage", modifiers);
            break;
        case "frt":
            TargetModifyValue(sendTargets, targets, "Forta", false, "frt", modifiers);
            break;
        case "frts":
            TargetModifyValue(sendTargets, targets, "Forta", true, "frt_storage", modifiers);
            break;
        case "syr":
            TargetModifyValue(sendTargets, targets, "Syre", false, "syr", modifiers);
            break;
        case "syrs":
            TargetModifyValue(sendTargets, targets, "Syre", true, "syr_storage", modifiers);
            break;
        case "gp":
            TargetModifyValue(sendTargets, targets, "Gold", false, "gp", modifiers);
            break;
        case "gps":
            TargetModifyValue(sendTargets, targets, "Gold", true, "gp_storage", modifiers);
            break;
        case "cp":
            TargetModifyValue(sendTargets, targets, "CP", false, "cp", modifiers);
            break;
        case "cps":
            TargetModifyValue(sendTargets, targets, "CP", true, "cp_storage", modifiers);
            break;

        // CHARACTER OPTION
        case "inspoptions":
            if (playerIsGM(msg.playerid)) {
                TargetInspirationOptions(targets, "GM");
            }
            else {
                TargetInspirationOptions(targets, sendingPlayerName);
            }
            break;
        default:
            sendChat("Wuxing Manager", "/w " + sendingPlayerName + ` You have entered an invalid command: ${action}`, null, {
                noarchive: true
            });
            break;
    }
}


// ======= Exp
// =================================================
function TargetAddExp(sendTargets, targets, xp) {

    // declare variables
    var sceneMessages = [];
    let xpObj, xpMod, newXp, val, level, nextLevelExp, currentlevelExp, percent;
    let expBar;
    let subtargets = [];

    // iterate through targets
    _.each(targets, function (mainTarget) {
        xpShare = getAttrByName(mainTarget.charId, "shareExp");
        subtargets = [];
        subtargets.push(mainTarget);
        if (xpShare != undefined && xpShare != "") {
            subtargets = subtargets.concat(GetActorTargetData(xpShare));
        }

        _.each(subtargets, function (target) {
            xpObj = GetCharacterAttribute(target.charId, "experience");
            xpMod = parseInt(getAttrByName(target.charId, "expMultiplier"));
            xpMod = (isNaN(xpMod) || xpMod == 0) ? "1" : xpMod;

            if (xpObj != undefined) {
                newXp = Math.floor(xp * xpMod);
                val = parseInt(xpObj.get("current")) + parseInt(newXp);
                xpObj.set("current", val);
                sceneMessages.push(target.displayName + " earned " + newXp + " exp");

                // get level data
                level = isNaN(parseInt(getAttrByName(target.charId, "base_level"))) ? 1 : parseInt(getAttrByName(target.charId, "base_level"));
                currentlevelExp = parseInt(GetExpToNextLevel(level - 1));
                nextLevelExp = parseInt(GetExpToNextLevel(level));
                expBar = `${val}/${nextLevelExp}`;
                nextLevelExp -= currentlevelExp;
                val -= currentlevelExp;
                if (val > nextLevelExp) {
                    val = nextLevelExp;
                }
                if (val < 0) {
                    val = 0;
                }
                percent = parseInt(val * 100 / nextLevelExp);
                sceneMessages.push(`<div class="sheet-experienceBox"><div class="sheet-experienceBoxInner" style="width:${percent}%">&nbsp;</div><div class="sheet-experienceBoxExp">${expBar}</div></div>`);

                if (val >= nextLevelExp) {
                    sceneMessages.push("<span style='color:red'>" + target.displayName + " has leveled up!</span>");
                }
            }
        });
    });

    // Send the system message
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSetBaseLevelExp(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    let xpObj, level, xpMod, newXp, val;

    // iterate through targets
    _.each(targets, function (target) {
        xpObj = GetCharacterAttribute(target.charId, "experience");
        level = parseInt(getAttrByName(target.charId, "level"));

        if (xpObj != undefined && !isNaN(level)) {
            newXp = GetExpToNextLevel(level - 1);
            xpObj.set("current", newXp);
        }
    });

    // Send the system message
    SendSystemMessage(sceneMessages, sendTargets);
}


// ======= Core statistics
// =================================================
function TargetGetCompareChart(sendTargets, targets, title, attrs) {

    // modify variables
    attrs = attrs.split(",");

    // declare variables
    let sceneMessages = [];
    let totalmod = 0;
    let mod, roll, rolltwo, rollLine;

    // iterate through targets
    _.each(targets, function (target) {

        // calculate the total mod
        totalmod = 0;
        _.each(attrs, function (attr) {
            if (attr != "") {
                mod = parseInt(getAttrByName(target.charId, attr.trim()));
                totalmod += isNaN(mod) ? 0 : mod;
            }
        });

        // roll the check
        roll = randomInteger(20) + totalmod;
        rolltwo = randomInteger(20) + totalmod;

        // format the roll
        rollLine = "";
        if (roll < 10) {
            rollLine += "0";
        }
        rollLine += roll + " | ";

        if (rolltwo < 10) {
            rollLine += "0";
        }
        rollLine += rolltwo + "@" + target.displayName;
        sceneMessages.push(rollLine);
    });

    // sort the lines 
    let output = "";
    sceneMessages.sort();
    sceneMessages.reverse();
    _.each(sceneMessages, function (sceneMessage) {
        output += sceneMessage + "/";
    });

    SendChatMessageToTargets(GetFormattedMessage("g", title + "/" + output), sendTargets);
}

function TargetSetValue(sendTargets, targets, title, attr, newValue) {

    // begin message
    let subMessage = ` has ${title} set to ${newValue}`;

    // declare variables
    let sceneMessages = [];
    let attrObj;

    // iterate through targets
    _.each(targets, function (target) {

        attrObj = GetCharacterAttribute(target.charId, attr);
        if (attrObj != undefined) {
            attrObj.set("current", newValue);

            // add to messages
            sceneMessages.push(target.displayName + subMessage);
        }
    });

    // Send the system messages
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetModifyValue(sendTargets, targets, title, isStorage, attr, count) {

    // modify couunt
    count = parseInt(count.trim());
    if (isNaN(count)) return;

    // begin message
    let subMessage = "";
    if (count > 0) {
        subMessage = " has gained " + count + " " + title;
    } else if (count < 0) {
        subMessage = " has lost " + Math.abs(count) + " " + title;
    }
    if (isStorage) {
        subMessage += " (placed into storage)";
    }

    // declare variables
    let sceneMessages = [];
    let gmSceneMessage = ["<strong>Current " + title + " values</strong>"];
    let currencyObj, val;

    // iterate through targets
    _.each(targets, function (target) {

        currencyObj = GetCharacterAttribute(target.charId, attr);
        if (currencyObj != undefined) {
            val = parseInt(currencyObj.get("current")) + count;
            currencyObj.set("current", val);

            // add to messagesv
            sceneMessages.push(target.displayName + subMessage);
            gmSceneMessage.push(target.displayName + " is at " + val + " " + title);
        }
    });

    // Send the system messages
    SendSystemMessage(gmSceneMessage, "/w GM ");
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSetBriefRested(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var briefrestResources, briefrestResource;
    let repeatingSection = "repeating_resources";

    // iterate through targets
    _.each(targets, function (target) {

        // recover their barrier
        target.getToken().set("bar2_value", target.getToken().get("bar2_max"));

        // restore their short rest recovery values
        briefrestResources = getAttrByName(target.charId, "briefRestResources");
        if (briefrestResources != "") {
            briefrestResources = briefrestResources.split(",");
            _.each(briefrestResources, function (id) {
                briefrestResource = GetCharacterAttribute(target.charId, GetSectionIdName(repeatingSection, id, "resourcecount"));
                if (briefrestResource != undefined) {
                    briefrestResource.set("current", briefrestResource.get("max"));
                }
            });
        }

        // turn off any auto off defenses
        let autoOffDefenses = getAttrByName(target.charId, "defAutoOffOnBriefRest");
        if (autoOffDefenses != undefined && autoOffDefenses != "") {

            // create an array of each id
            if (autoOffDefenses.indexOf("@@") >= 0) {
                autoOffDefenses = autoOffDefenses.split("@@");
            }
            else {
                autoOffDefenses = [autoOffDefenses];
            }

            // iterate through each id
            for (let i = 0; i < autoOffDefenses.length; i++) {
                DeactivateDefense(target.charId, autoOffDefenses[i]);
            }
        }
    });

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have finished a brief rest.");
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has finished a brief rest.");
    }
    sceneMessages.push("\nAll barrier has been fully recovered.");
    SendSystemMessage(sceneMessages, sendTargets);

}

function TargetSetShortRested(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var barrierObj, kiObj, shortrestResources, shortrestResource;
    let repeatingSection = "repeating_resources";

    // iterate through targets
    _.each(targets, function (target) {

        // recover their barrier
        barrierObj = GetCharacterAttribute(target.charId, "barrier");
        if (barrierObj != undefined) {
            barrierObj.set("current", barrierObj.get("max"));
        }

        // recover their ki
        kiObj = GetCharacterAttribute(target.charId, "ki");
        if (kiObj != undefined) {
            kiObj.set("current", kiObj.get("max"));
        }

        // restore their short rest recovery values
        shortrestResources = getAttrByName(target.charId, "shortRestResources");
        if (shortrestResources != "") {
            shortrestResources = shortrestResources.split(",");
            _.each(shortrestResources, function (id) {
                shortrestResource = GetCharacterAttribute(target.charId, GetSectionIdName(repeatingSection, id, "resourcecount"));
                if (shortrestResource != undefined) {
                    shortrestResource.set("current", shortrestResource.get("max"));
                }
            });
        }
    });

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have finished a short rest.");
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has finished a short rest.");
    }
    sceneMessages.push("\nAll barrier and ki have been fully recovered.");
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSetLongRested(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];
    var lodgingName = "";
    var lodgingResolve = 0;
    var lodgingMorale = 0;
    var morale = 0;
    var resolve = 0;
    var barrierObj, kiObj, vitObj, moraleObj, resolveObj, longrestResources, longrestResource;
    let repeatingSection = "repeating_resources";

    // set up lodging  
    if (modifiers != "") {
        let splits = modifiers.split("@@@");
        lodgingName = splits[0];
        lodgingMorale = isNaN(parseInt(splits[1])) ? 0 : parseInt(splits[1]);
        resolveObj = GetAdjustedResolveAndMorale(0, 0, lodgingMorale);
        lodgingResolve = resolveObj.resolve;
        lodgingMorale = resolveObj.morale;
    }
    else {
        // the character is lodging at home
        lodgingName = "at Home";
    }

    // punctuation
    if (!lodgingName.startsWith(",") && !lodgingName.startsWith(" ")) {
        lodgingName = " " + lodgingName;
    }
    if (!lodgingName.endsWith(".") && !lodgingName.endsWith("!") && !lodgingName.endsWith("?")) {
        lodgingName = lodgingName + ".";
    }

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have finished a long rest" + lodgingName);
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has finished a long rest" + lodgingName);
    }
    sceneMessages.push("\nSome vitality, and all barrier and ki have been recovered.");
    SendSystemMessage(sceneMessages, sendTargets);

    // iterate through targets
    _.each(targets, function (target) {

        // recover their barrier
        barrierObj = GetCharacterAttribute(target.charId, "barrier");
        if (barrierObj != undefined) {
            barrierObj.set("current", barrierObj.get("max"));
        }

        // recover their ki
        kiObj = GetCharacterAttribute(target.charId, "ki");
        if (kiObj != undefined) {
            kiObj.set("current", kiObj.get("max"));
        }

        // recover their vitality
        vitObj = GetCharacterAttribute(target.charId, "vitality");
        if (vitObj != undefined) {
            let vitalityBonus = Number(getAttrByName(target.charId, "constitution_mod"));
            if (vitalityBonus < 1) {
                vitalityBonus = 1;
            }
            let val = Number(vitObj.get("current")) + vitalityBonus;
            if (Number(val) > vitObj.get("max")) {
                val = vitObj.get("max");
            }
            vitObj.set("current", val);
        }

        // restore their long rest recovery values
        longrestResources = getAttrByName(target.charId, "longRestResources");
        if (longrestResources != "") {
            longrestResources = longrestResources.split(",");
            _.each(longrestResources, function (id) {
                longrestResource = GetCharacterAttribute(target.charId, GetSectionIdName(repeatingSection, id, "resourcecount"));
                if (longrestResource != undefined) {
                    longrestResource.set("current", longrestResource.get("max"));
                }
            });
        }

        // set lodging rewards for the target if they're at home
        if (modifiers == "") {
            lodgingResolve = getAttrByName(target.charId, "lifestyle_resolve");
            if (lodgingResolve == null) {
                lodgingResolve = 0;
            }
            lodgingMorale = getAttrByName(target.charId, "lifestyle_morale");
            if (lodgingMorale == null) {
                lodgingMorale = 0;
            }
        }

        // set morale and resolve
        moraleObj = GetCharacterAttribute(target.charId, "morale");
        if (moraleObj != undefined) {
            var resolveObj = GetCharacterAttribute(target.charId, "resolve");
            if (resolveObj != undefined) {
                resolve = isNaN(parseInt(resolveObj.get("current"))) ? 0 : parseInt(resolveObj.get("current"));
                morale = isNaN(parseInt(moraleObj.get("current"))) ? 0 : parseInt(moraleObj.get("current"));
                if (lodgingResolve > resolve || (lodgingResolve == resolve && lodgingMorale > morale)) {

                    resolveObj.set("current", lodgingResolve);
                    moraleObj.set("current", lodgingMorale);

                    SendChatMessageToTargets(target.displayName + " has " + lodgingResolve + " resolve and " + lodgingMorale + " morale.",
                        GetCharacter(target.charId).get('controlledby'));
                }
            }
        }
    });
}

// ======= Lifestyles
// =================================================
function TargetAddWeek(targets, modifiers) {

    // declare variables
    var sceneMessages = [];
    let weekName, weekSpecial = 0;
    let splits = modifiers.split("@@@");
    weekName = splits[0];
    if (splits.length > 1) {
        weekSpecial = splits[1];
    }
    let newId;
    sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " added " + weekName);

    // iterate through targets
    _.each(targets, function (target) {
        newId = GenerateRowID();
        createObj("attribute", {
            "name": "repeating_downtime_" + newId + "_week",
            "current": weekName,
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_downtime_" + newId + "_special",
            "current": weekSpecial,
            "_characterid": target.charId
        });
    });

    SendSystemMessage(sceneMessages, "GM");
}

function TargetAddSocializingCharacter(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];

    // !c addsocial Name@Race@Gender@Class@Profession@Rapport@favors
    var nameId = 0;
    var raceId = 1;
    var genderId = 2;
    var classId = 3;
    var professionId = 4;
    var rapportId = 5;
    var favorsId = 6;
    var newId;
    var settings = modifiers.split("@");

    // iterate through targets
    _.each(targets, function (target) {
        newId = GenerateRowID();
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_name",
            "current": settings[nameId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_race",
            "current": settings[raceId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_gender",
            "current": settings[genderId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_classCategory",
            "current": settings[classId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_profession",
            "current": settings[professionId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_rapport",
            "current": settings[rapportId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_favors",
            "current": settings[favorsId],
            "_characterid": target.charId
        });
    });

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have gained the friendship of " + settings[nameId] + "!");
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has gained the friendship of " + settings[nameId] + "!");
    }
    sceneMessages.push(settings[nameId] + " can now be selected in the socializing menu.");
    SendSystemMessage(sceneMessages, sendTargets);
}

// ======= Inspiration Functions
// =================================================

// Inspiration
function TargetSpendInspiration(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var resourceObj, charImage;

    // iterate through targets
    _.each(targets, function (target) {
        resourceObj = GetCharacterAttribute(target.charId, "inspiration");
        if (resourceObj != undefined && resourceObj.get("current") == "on") {
            resourceObj.set("current", 0);
            SendChatMessageToTargets(GetCutInMessage(target.displayName, target.charId, "Inspiration", "Reroll their last check and take the higher result."), sendTargets);

        } else {
            SendChatMessageToTargets(target.displayName + " has no inspiration.", sendTargets);
        }
    });
}

// Resolve and Morale
function TargetRequestMorale(targets) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages.push(target.displayName + " is requesting Morale.");
        sceneMessages.push(GetRequestMoraleLine(target.charName, target.charId));
        sceneMessages.push(GetRequestKarmaLine(target.charName, target.charId));
        sceneMessages.push("[No](!gainmorale 0@" + target.charName + ")");
    });

    // Send the system message
    SendDmAlertMessage(sceneMessages);
}

function TargetGainMorale(modifiers) {

    // get modifiers
    let mods = modifiers.split("@");
    let roll = mods[0];
    let charName = mods[1].trim();
    let charId = mods[2].trim();

    if (parseInt(roll) == 0) {
        SendChatMessageToTargets(" No, you do not gain morale for " + charName, charName);
    } else {
        // declare variables
        let sceneMessages = TargetSetMorale(charId, charName, GetInspirationRoll(roll));
        SendSystemMessage(sceneMessages, "");
    }
}

function TargetsGainMorale(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages = sceneMessages.concat(TargetSetMorale(target.charId, target.displayName, GetInspirationRoll(modifiers)));
    });

    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSpendResolve(sendTargets, targets) {

    // declare variables
    let sceneMessages = [];
    let resolve, dieRoll, message;

    // iterate through targets
    _.each(targets, function (target) {
        resolve = parseInt(getAttrByName(target.charId, "resolve"));
        if (!isNaN(resolve) && resolve > 0) {

            // determine the die roll to add
            dieRoll = "";
            if (resolve == 2) {
                dieRoll = "1d4";
            }
            else if (resolve == 3) {
                dieRoll = "1d6";
            }
            else if (resolve >= 4) {
                resolve = 4;
                dieRoll = "2d4";
            }

            // adjust morale and resolve
            TargetSetMorale(target.charId, target.displayName, 0, -1);

            // send message
            message = "Gain advantage on your last roll. ";
            if (dieRoll != "") {
                message += "<br />Add [[" + dieRoll + "]] to the highest result of your roll.";
            }
            SendChatMessageToTargets(GetCutInMessage(target.displayName, target.charId, "Resolve", message), sendTargets);


        } else {
            SendChatMessageToTargets(target.displayName + " has no resolve.", sendTargets);
        }
    });
}

// Fate and Karma
function TargetRequestKarma(targets) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages.push(target.displayName + " is requesting Karma.");
        sceneMessages.push(GetRequestKarmaLine(target.charName, target.charId));
        sceneMessages.push(GetRequestMoraleLine(target.charName, target.charId));
        sceneMessages.push("[No](!gainkarma 0@" + target.charName + ")");
    });

    // Send the system message
    SendDmAlertMessage(sceneMessages);
}

function TargetGainKarma(modifiers) {

    // get modifiers
    let mods = modifiers.split("@");
    let roll = mods[0];
    let charName = mods[1].trim();
    let charId = mods[2].trim();

    if (parseInt(roll) == 0) {
        SendChatMessageToTargets(" No, you do not gain karma for " + charName, charName);
    } else {
        // declare variables
        let sceneMessages = TargetSetKarma(charId, charName, GetInspirationRoll(roll));
        SendSystemMessage(sceneMessages, "");
    }
}

function TargetsGainKarma(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages = sceneMessages.concat(TargetSetKarma(target.charId, target.displayName, GetInspirationRoll(modifiers)));
    });

    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSpendFate(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var resourceObj;

    // iterate through targets
    _.each(targets, function (target) {
        resourceObj = GetCharacterAttribute(target.charId, "fate");
        if (resourceObj != undefined && !isNaN(parseInt(resourceObj.get("current"))) && parseInt(resourceObj.get("current")) > 0) {

            // reduce fate
            resourceObj.set("current", parseInt(resourceObj.get("current")) - 1);

            // send the message
            message = "(a) Choose to automatically succeed on your last check; or";
            message += "<br />(b) If dying, immediately gain 1 Hit Point.";
            SendChatMessageToTargets(GetCutInMessage(target.displayName, target.charId, "Fate", message), sendTargets);

        } else {
            SendChatMessageToTargets(target.displayName + " has no fate.", sendTargets);
        }
    });
}

// Rolls
function GetInspirationRoll(type) {
    switch (parseInt(type)) {
        case 1:
            return randomInteger(5);
        case 5:
            return 5 + randomInteger(5);
        case 10:
            return 10 + randomInteger(10);
        case 25:
            return 25 + randomInteger(15);
    }
    return isNaN(parseInt(type)) ? 0 : parseInt(type);
}

function GetRequestMoraleLine(charName, charId) {
    message = "";
    message += "[1M](!gainmorale 1@" + charName + "@" + charId + ") ";
    message += "[5M](!gainmorale 5@" + charName + "@" + charId + ") ";
    message += "[10M](!gainmorale 10@" + charName + "@" + charId + ") ";
    message += "[25M](!gainmorale 25@" + charName + "@" + charId + ") ";
    return message;
}

function GetRequestKarmaLine(charName, charId) {
    message = "";
    message += "[1K](!gainkarma 1@" + charName + "@" + charId + ") ";
    message += "[5K](!gainkarma 5@" + charName + "@" + charId + ") ";
    message += "[10K](!gainkarma 10@" + charName + "@" + charId + ") ";
    message += "[25K](!gainkarma 25@" + charName + "@" + charId + ") ";
    return message;
}

function TargetSetMorale(charId, displayName, modMorale, modResolve) {
    if (modResolve == undefined) {
        modResolve = 0;
    }

    let sceneMessages = [];

    // get the morale object
    let moraleObj = GetCharacterAttribute(charId, "morale");
    if (moraleObj != undefined) {
        let morale = isNaN(parseInt(moraleObj.get("current"))) ? 0 : parseInt(moraleObj.get("current"));

        sceneMessages.push(displayName + " has gained " + modMorale + " Morale.");
        var resolveObj = GetCharacterAttribute(charId, "resolve");
        if (resolveObj != undefined) {
            let resolve = isNaN(parseInt(resolveObj.get("current"))) ? 0 : parseInt(resolveObj.get("current"));
            let adjustedResolveObj = GetAdjustedResolveAndMorale(resolve, morale, modMorale, modResolve);

            // set resolve if it's changed
            if (adjustedResolveObj.resolve != resolve) {
                sceneMessages.push("Gained " + (parseInt(adjustedResolveObj.resolve) - resolve) + " Resolve.");
                resolveObj.set("current", adjustedResolveObj.resolve);
            }

            // set morale
            moraleObj.set("current", adjustedResolveObj.morale);
        }
        else {
            moraleObj.set("current", morale + parseInt(modMorale));
        }
    }

    return sceneMessages;
}

function TargetSetKarma(charId, displayName, value) {

    let sceneMessages = [];
    if (value != 0) {

        // get the karma object
        let karmaObj = GetCharacterAttribute(charId, "karma");
        if (karmaObj != undefined) {
            let karma = isNaN(parseInt(karmaObj.get("current"))) ? 0 : parseInt(karmaObj.get("current"));

            sceneMessages.push(displayName + " has gained " + value + " Karma.");
            var fateObj = GetCharacterAttribute(charId, "fate");
            if (fateObj != undefined) {
                let fate = isNaN(parseInt(fateObj.get("current"))) ? 0 : parseInt(fateObj.get("current"));
                let adjustedFateObj = GetAdjustedFateAndKarma(fate, karma, value);

                // set fate if it's changed
                if (adjustedFateObj.fate != fate) {
                    sceneMessages.push("Gained " + (parseInt(adjustedFateObj.fate) - fate) + " Fate.");
                    fateObj.set("current", adjustedFateObj.fate);
                }

                // set karma
                karmaObj.set("current", adjustedFateObj.karma);
            }
            else {
                karmaObj.set("current", karma + parseInt(value));
            }

        }
    }

    return sceneMessages;
}

// ======= Sheet Options Functions
// =================================================
function TargetInspirationOptions(targets, sendingPlayerName) {

    // declare variables
    let token;

    // iterate through targets
    for (let i = 0; i < targets.length; i++) {
        token = getObj('graphic', targets[i].tokenId);
        SendInspirationOptions(token.get('name'), getAttrByName(targets[i].charId, "emote_activesetimageurl"), targets[i].charId, sendingPlayerName);
    }
}

function TargetShowActiveQuests(targets, sendingPlayerName) {

}

// Create Options
function SendInspirationOptions(name, image, charId, sendTarget) {

    let sceneMessages = [];
    let title, content;
    if (name.substr(name.length - 1) != "s") {
        title = name + "'s Inspired";
    }
    else {
        title = name + "' Inspired";
    }

    var inspiration = GetCharacterAttribute(charId, "inspiration");
    if (inspiration != undefined && inspiration.get("current") == "on") {
        sceneMessages.push("<p>[Use Inspiration](!target " + charId + "@@@insp" + ")</p>");
    }
    else {
        sceneMessages.push("<p>" + name + " has no inspiration.</p>");
    }

    var resolveObj = GetCharacterAttribute(charId, "resolve");
    var resolve = 0;
    if (resolveObj != undefined) {
        resolve = isNaN(parseInt(resolveObj.get("current"))) ? 0 : parseInt(resolveObj.get("current"));
    }
    if (resolve > 0) {
        sceneMessages.push("<p>[Use Resolve](!target " + charId + "@@@resolve" + ") (" + resolve + " remaining)</p>");
    }
    else {
        sceneMessages.push("<p>" + name + " has no resolve.</p>");
    }

    var fateObj = GetCharacterAttribute(charId, "fate");
    var fate = 0;
    if (fateObj != undefined) {
        fate = isNaN(parseInt(fateObj.get("current"))) ? 0 : parseInt(fateObj.get("current"));
    }
    if (fate > 0) {
        sceneMessages.push("<p>[Use Fate](!target " + charId + "@@@fate" + ") (" + fate + " remaining)</p>");
    }
    else {
        sceneMessages.push("<p>" + name + " has no fate.</p>");
    }

    var moraleObj = GetCharacterAttribute(charId, "morale");
    var morale = 0;
    var nextMoraleValue = 10 + (resolve * 10);
    if (moraleObj != undefined) {
        morale = parseInt(moraleObj.get("current"));
    }
    var toNextMorale = nextMoraleValue - morale;

    var karmaObj = GetCharacterAttribute(charId, "karma");
    var karma = 0;
    if (karmaObj != undefined) {
        karma = parseInt(karmaObj.get("current"));
    }
    var toNextKarma = 50 - karma;

    // add request statements
    if (sendTarget == "GM") {
        sceneMessages.push("<p>Give Morale: " + GetRequestMoraleLine(name, charId) + "</p>");
        sceneMessages.push("<p>Give Karma: " + GetRequestKarmaLine(name, charId) + "</p>");
    }
    else {
        sceneMessages.push("<p>[Request Morale](!target " + charId + "@@@morale" + ")<br />For when you're feeling great.<br />(" + toNextMorale + " morale to next Resolve)</p>");
        sceneMessages.push("<p>[Request Karma](!target " + charId + "@@@karma" + ")<br />For when the world could be more fair.<br />(" + toNextKarma + " karma to next Fate)</p>");
    }

    content = "";
    _.each(sceneMessages, function (message) {
        if (message != "") {
            content += message;
        }
    });

    SendCombatTrackerMessage(title, image, content, sendTarget);
}


// ======= Condition Functions
// =================================================

function AddTokenCondition(token, conditionList, sourceName, sourceData, conditionSaveDc, conditionPower) {

    if (sourceName == undefined) sourceName = "Condition";
    if (conditionSaveDc == undefined) conditionSaveDc = 10;
    conditionSaveDc = isNaN(parseInt(conditionSaveDc)) ? 10 : parseInt(conditionSaveDc);
    if (conditionPower == undefined) conditionPower = 0;
    conditionPower = isNaN(parseInt(conditionPower)) ? 0 : parseInt(conditionPower);

    let resultsConditionMessages = {
        title: sourceName,
        desc: "",
        img: ""
    };

    // get token information
    let tokenStatusMarkers = token.get("statusmarkers");
    let conditionSource = GetTokenSourceConditionData();
    conditionSource.setSourceConditionData(sourceName, sourceData, conditionSaveDc, conditionPower);

    // sanitize all of the results
    let conditions = conditionList.replace(/\]/g, "").split("[");
    let conditionSourceConditions = [];
    let primaryCondition = "";
    let conditionData, printData;
    for (let i = 0; i < conditions.length; i++) {
        log("conditions[" + i + "]: " + conditions[i]);

        if (conditions[i] != "") {
            // determine what to print based on the condition type
            conditionData = GetTokenConditionData();
            conditionData.setConditionData(conditions[i], sourceName, sourceData, conditionSaveDc);
            log("conditionData: " + conditionData.getConditionDataString());
            if (primaryCondition == "") {
                if (conditionData.isSpec) {
                    primaryCondition = "0";
                }
                else {
                    primaryCondition = conditionData.name;
                }
            }
            printData = conditionData.getPrintoutData();
            resultsConditionMessages.desc += (resultsConditionMessages.desc == "" ? "" : "\n") + printData.desc;
            if (conditionData.isTemp) {
                // add whatever condition this is to the token markers
                if (!TokenHasStatusMarker(token, conditionData.name) && GetTokenStatusMarkerData(conditionData.name).name != "") {
                    tokenStatusMarkers += GetTokenStatusMarkerName(conditionSource.name);
                }
            }
            else {
                // this is a condition that's remaining on the token and is part of the source effect
                conditionSourceConditions.push(conditionData);
            }
        }
    }

    // if there are conditions to add, create condition source data to add to the token
    if (conditionSourceConditions != "") {
        conditionSource.conditions = conditionSourceConditions;

        // check the current sources on the token for any sources that are identical to the one we just created
        let currentConditions = SanitizeTokenConditions(token);
        let setCondition, setIncrementer = false;
        let newConditionIndex = 1;
        for (let i = 0; i < currentConditions.length; i++) {
            log(`currentConditions[${i}]: ${currentConditions[i].getSourceConditionDataString()}`);

            // determine if this condition matches our current condition
            if (currentConditions[i].sourceName == sourceName) {
                setCondition = true;
                if (currentConditions[i].sourcePower > conditionPower || (currentConditions[i].sourcePower == conditionPower && currentConditions[i].sourceDC > conditionSaveDc)) {
                    resultsConditionMessages.desc = "Superior version of condition already exists on target. Keeping original.";
                }
                else {
                    conditionSource.conditionIndex = currentConditions[i].conditionIndex;
                    conditionSource.sourceImage = currentConditions[i].sourceImage;
                    currentConditions[i] = conditionSource;
                }
                break;
            }

            // set incrementer data
            if (!setIncrementer && currentConditions[i].conditionIndex != 0) {
                if (newConditionIndex != currentConditions[i].conditionIndex) {
                    setIncrementer = true;
                }
                else {
                    newConditionIndex++;
                }
            }
        }

        // if the condition hasn't been set, then add it to the list and add a condition marker on the target
        if (!setCondition) {
            if (TokenHasStatusMarker(token, primaryCondition)) {
                conditionSource.conditionIndex = newConditionIndex;
                conditionSource.sourceImage = `${newConditionIndex}`;
            }
            else {
                conditionSource.conditionIndex = 0;
                conditionSource.sourceImage = primaryCondition;
            }
            tokenStatusMarkers += GetTokenStatusMarkerName(conditionSource.sourceImage);
            currentConditions.push(conditionSource);
        }
        resultsConditionMessages.img = conditionSource.sourceImage;
        SetTokenConditionSources(token, currentConditions);
    }

    // set the token data
    token.set("statusmarkers", tokenStatusMarkers);

    return resultsConditionMessages;
}

function GetTokenActiveConditionsPrintout(token) {
    let currentConditions = SanitizeTokenConditions(token);

    let printData = [];
    for (let i = 0; i < currentConditions.length; i++) {
        printData.push(currentConditions[i].getPrintoutData());
    }
    return printData;
}

function SanitizeTokenConditions(token, setTokenConditions) {

    if (setTokenConditions == undefined) setTokenConditions = false;

    // iterate through the conditions on the token
    let currentConditions = GetTokenConditionSources(token);
    let finalConditionList = [];
    for (let i = 0; i < currentConditions.length; i++) {
        if (TokenHasStatusMarker(token, currentConditions[i].sourceImage)) {
            finalConditionList.push(currentConditions[i]);
        }
    }

    if (setTokenConditions && currentConditions.length != finalConditionList.length) {
        SetTokenConditionSources(token, finalConditionList);
    }
    return finalConditionList;
}

// Data Objects
function GetTokenSourceConditionData() {
    return {
        conditionIndex: 0,
        sourceName: "",
        sourceCharId: ``,
        sourceCharName: ``,
        sourceDC: 0,
        sourcePower: 0,
        sourceImage: "",
        rounds: 0,
        isSpec: false,
        conditions: [],

        setSourceConditionData: function (sourceName, sourceData, sourceDC, sourcePower) {
            this.sourceName = sourceName;
            this.sourceCharId = sourceData.charId;
            this.sourceCharName = sourceData.displayName;
            this.sourceDC = sourceDC;
            this.sourcePower = sourcePower;
        },

        setSourceConditionDataFromString: function (content) {
            let contentData = content.split("|");
            this.conditionIndex = contentData[0].trim();

            let data, dataType = "";
            for (let i = 0; i < contentData.length; i++) {
                data = contentData[i];
                dataType = "";
                if (data.indexOf(">") > 0) {
                    dataType = data.substring(0, data.indexOf(">")).toLowerCase().trim();
                    data = data.substring(data.indexOf(">") + 1);
                }
                switch (dataType) {
                    case "n":
                        this.sourceName = data.trim();
                        break;
                    case "sid":
                        this.sourceCharId = data.trim();
                        break;
                    case "scn":
                        this.sourceCharName = data.trim();
                        break;
                    case "sdc":
                        this.sourceDC = data.trim();
                        break;
                    case "sp":
                        this.sourcePower = data.trim();
                        break;
                    case "si":
                        this.sourceImage = data.trim();
                        break;
                    case "r":
                        this.rounds = data.trim();
                        break;
                    case "cd":
                        let conditions = data.trim().replace(/\]/g, "").split("[");
                        let conditionData = [];
                        let sourceData = FormTargetData(this.sourceCharId, this.sourceCharName, "", this.sourceCharName);
                        for (let i = 0; i < conditions.length; i++) {
                            if (conditions[i] != "") {

                                // determine what to print based on the condition type
                                conditionData = GetTokenConditionData();
                                conditionData.setConditionData(conditions[i], this.sourceName, sourceData, this.sourceDC);
                                if (conditionData.isSpec) {
                                    this.isSpec = true;
                                }
                                log(`Creating condition ${i}: ${conditionData.getConditionDataString()} from: ${conditions[i]}`);
                                this.conditions.push(conditionData);
                            }
                        }
                        break;
                }
            }
        },

        getSourceConditionDataString: function () {
            let output = `${this.conditionIndex}|n>${this.sourceName}|sid>${this.sourceCharId}|scn>${this.sourceCharName}|sdc>${this.sourceDC}|sp>${this.sourcePower}|si>${this.sourceImage}|r>${this.rounds}|cd>`;
            for (let i = 0; i < this.conditions.length; i++) {
                output += this.conditions[i].getConditionDataString();
            }
            return `{${output}}`;
        },

        getPrintoutData: function () {
            let output = {
                title: this.sourceName,
                source: this.sourceCharName,
                rounds: this.rounds,
                desc: "",
                img: this.sourceImage,

                getStatusMarkerImage: function () {
                    return GetTokenStatusMarkerData(this.img).img
                }
            };

            let conditionPrint = "";
            for (let i = 0; i < this.conditions.length; i++) {
                conditionPrint = this.conditions[i].getPrintoutData();
                output.desc += (output.desc == "" ? "" : "\n") + conditionPrint.desc;
            }

            return output;
        }
    };
}

function GetTokenConditionData() {
    return {
        name: ``,
        desc: ``,
        sourceName: ``,
        sourceCharId: ``,
        sourceCharName: ``,
        endConditions: ``,
        isTemp: true,
        isSpec: false,

        setConditionData: function (content, sourceName, targetData, conditionSaveDc) {
            content = content.replace(/\[/g, "");
            content = content.replace(/\]/g, "");

            let contentData = content.split("@");
            this.name = contentData[0].trim();
            if (this.name.toLowerCase() == "spec") {
                this.isSpec = true;
                this.name = sourceName;
            }
            this.sourceName = sourceName;
            this.sourceCharId = targetData.charId;
            this.sourceCharName = targetData.displayName;

            let data = "";
            let dataType = "";
            let desc = "";
            for (let i = 0; i < contentData.length; i++) {
                data = contentData[i];
                dataType = "";
                if (data.indexOf(">") > 0) {
                    dataType = data.substring(0, data.indexOf(">")).toLowerCase().trim();
                    data = data.substring(data.indexOf(">") + 1);
                }
                switch (dataType) {
                    case "d":
                        desc = data.trim();
                        if (desc.indexOf("{DC}") >= 0) {
                            desc = desc.replace(/\{DC\}/g, `DC ${conditionSaveDc}`);
                        }
                        if (desc.indexOf("{Name}") >= 0) {
                            desc = desc.replace(/\{Name\}/g, `DC ${targetData.displayName}`);
                        }
                        this.desc = desc;

                        break;
                    case "e":
                        desc = data.trim();
                        if (desc.indexOf("{DC}") >= 0) {
                            desc = desc.replace(/\{DC\}/g, `DC ${conditionSaveDc}`);
                        }
                        if (desc.indexOf("{Name}") >= 0) {
                            desc = desc.replace(/\{Name\}/g, `DC ${targetData.displayName}`);
                        }
                        this.endConditions = desc;
                        this.isTemp = false;
                        break;
                    case "sn":
                        this.sourceName = data.trim();
                        break;
                }
            }
        },

        getConditionDataString: function () {
            return `[${this.name}@d>${this.desc}@e>${this.endConditions}]`;
        },

        getPrintoutData: function () {
            let output = {
                title: this.name,
                desc: this.desc
            };

            if (this.name.toLowerCase() == "pushed") {
                output.desc = `Target is pushed ${this.desc}.`;
            }

            if (this.name.toLowerCase() == "prone") {
                output.desc = `Target is knocked prone.`;
            }
            else {
                let conditionData = GetCondition(this.name);
                if (conditionData.name != "") {
                    output.desc += (output.desc == "" ? "" : "\n") + `[${conditionData.name}] ${conditionData.short}`;
                }
            }

            if (this.endConditions != "") {
                output.desc += `\n<strong>End Conditions:</strong> ${this.endConditions}`;
            }
            return output;
        }
    };
}

// token source condition access
function GetTokenConditionSources(token) {

    let tokenGmNotes = token.get("gmnotes");
    if (tokenGmNotes == undefined || tokenGmNotes == "") {
        return [];
    }

    tokenGmNotes = tokenGmNotes.replace(/\}/g, "");
    let sources = tokenGmNotes.split("{").sort();
    let source;
    let output = [];
    for (let i = 0; i < sources.length; i++) {
        log(`[GetTokenConditionSources] ${i}: ${sources[i]}`);
        if (sources[i].trim() != "") {
            source = GetTokenSourceConditionData();
            source.setSourceConditionDataFromString(sources[i]);
            output.push(source);
        }
    }
    return output;
}

function SetTokenConditionSources(token, sources) {

    let currentConditions = "";
    for (let i = 0; i < sources.length; i++) {
        currentConditions += sources[i].getSourceConditionDataString();
    }
    token.set("gmnotes", currentConditions);
    return currentConditions;
}

// token status markers
function GetTokenStatusMarkerData(status) {

    switch (String(status).toLowerCase()) {
        case "marked":
            return {
                name: "marked",
                id: 1376671,
                img: "https://i.imgur.com/o1wvgVy.png"
            }
        case "checkmarked":
            return {
                name: "checkmarked",
                id: 1376826,
                img: "https://i.imgur.com/B78hAtj.png"
            }
        case "crossmarked":
            return {
                name: "crossmarked",
                id: 1376828,
                img: "https://i.imgur.com/MoXIyZh.png"
            }
        case "blinded":
            return {
                name: "blinded",
                id: 1376831,
                img: "https://i.imgur.com/5tszb9V.png"
            }
        case "charmed":
            return {
                name: "charmed",
                id: 1376833,
                img: "https://i.imgur.com/KM2HYP2.png"
            }
        case "deafened":
            return {
                name: "deafened",
                id: 1376834,
                img: "https://i.imgur.com/6c93LTQ.png"
            }
        case "frightened":
            return {
                name: "frightened",
                id: 1376836,
                img: "https://i.imgur.com/NvgItHK.png"
            }
        case "grappled":
            return {
                name: "grappled",
                id: 1376839,
                img: "https://i.imgur.com/LCiOfYL.png"
            }
        case "incapacitated":
            return {
                name: "incapacitated",
                id: 1376840,
                img: "https://i.imgur.com/NMCM4c9.png"
            }
        case "invisible":
            return {
                name: "invisible",
                id: 1376842,
                img: "https://i.imgur.com/X1LLTzw.png"
            }
        case "paralyzed":
            return {
                name: "paralyzed",
                id: 1376844,
                img: "https://i.imgur.com/qRZPpAi.png"
            }
        case "poisoned":
            return {
                name: "poisoned",
                id: 1376846,
                img: "https://i.imgur.com/xupjfHJ.png"
            }
        case "prone":
            return {
                name: "prone",
                id: 1376848,
                img: "https://i.imgur.com/Rc4nxMs.png"
            }
        case "restrained":
            return {
                name: "restrained",
                id: 1376850,
                img: "https://i.imgur.com/Zz53JZx.png"
            }
        case "staggered":
            return {
                name: "staggered",
                id: 1376852,
                img: "https://i.imgur.com/w9jd98k.png"
            }
        case "stunned":
            return {
                name: " stunned",
                id: 1376854,
                img: "https://i.imgur.com/9K6aLQk.png"
            }
        case "1":
            return {
                name: "1",
                id: 1376861,
                img: "https://i.imgur.com/0ybAAep.png"
            }
        case "2":
            return {
                name: "2",
                id: 1376862,
                img: "https://i.imgur.com/XYw7bDF.png"
            }
        case "3":
            return {
                name: "3",
                id: 1376863,
                img: "https://i.imgur.com/vEn0TUm.png"
            }
        case "4":
            return {
                name: "4",
                id: 1376864,
                img: "https://i.imgur.com/CrggiqP.png"
            }
        case "5":
            return {
                name: "5",
                id: 1376865,
                img: "https://i.imgur.com/vShVhyH.png"
            }
        case "6":
            return {
                name: "6",
                id: 1376868,
                img: "https://i.imgur.com/epUbuX1.png"
            }
        case "7":
            return {
                name: "7",
                id: 1376868,
                img: "https://i.imgur.com/LK4xXjj.png"
            }
        case "8":
            return {
                name: "8",
                id: 1376868,
                img: "https://i.imgur.com/mViHBTk.png"
            }
        case "concentration":
            return {
                name: "concentration",
                id: 4171912,
                img: ""
            }
    }

    return {
        name: "",
        id: 0
    }
}

function GetTokenStatusMarkerName(status) {
    var data = GetTokenStatusMarkerData(status);
    if (data.name == "") {
        return "";
    }
    else {
        return data.name + "::" + data.id;
    }
}

function TokenHasStatusMarker(token, condition) {
    return token.get("statusmarkers").indexOf(GetTokenStatusMarkerName(condition)) > -1;
}

// ====== Classes

class Dictionary {

    constructor() {
        this.keys = [];
        this.values = {};
    }
    import(data, dataCreationCallback) {
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, dataCreationCallback);
            }
            else if (typeof data == "string") {
                this.importStringifiedJson(data, dataCreationCallback);
            }
            else {
                this.importJson(data, dataCreationCallback);
            }
        }
    }
    importStringifiedJson(stringifiedJSON, dataCreationCallback) {
        if (stringifiedJSON == undefined || stringifiedJSON == "") {
            return;
        }
        this.importJson(JSON.parse(stringifiedJSON), dataCreationCallback);
    }
    importJson(json, dataCreationCallback) {
        if (json == undefined) {
            return;
        }
        this.keys = json.keys;
        if (dataCreationCallback != undefined) {
            this.values = {};
            for(let i = 0; i < json.keys.length; i++) {
                this.values[json.keys[i]] = dataCreationCallback(json.values[json.keys[i]]);
            }
        }
        else {
            this.values = json.values;
        }
    }
    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            this.add(data.name, data);
        }
    }
    add(key, value) {
        if (!this.keys.includes(key)) {
            this.keys.push(key);
        }
        this.values[key] = value;
    }
    get(key) {
        return this.values[key];
    }
    getkey(index) {
        return this.keys[index];
    }
    getByIndex(index) {
        return this.get(this.getkey(index));
    }
    set(key, value) {
        this.values[key] = value;
    }
    has(key) {
        return this.keys.includes(key);
    }
    iterate(callback) {
        for (let i = 0; i < this.keys.length; i++) {
            callback(this.values[this.keys[i]], this.keys[i]);
        }
    }
    clean(validKeys) {
        let keys = this.keys.filter(key => validKeys.includes(key));
        let values = {};
        for (let i = 0; i < keys.length; i++) {
            values[keys[i]] = this.values[keys[i]];
        }
        this.keys = keys;
        this.values = values;
    }
}
class DatabaseFilterData {
    constructor(property, value) {
        this.property = property;
        this.value = value;
    }
}
class Database extends Dictionary {
    constructor(sortingProperties, data, dataCreationCallback) {
        super();
        this.sortingGroups = {};
        for (let i = 0; i < sortingProperties.length; i++) {
            this.sortingGroups[sortingProperties[i]] = {};
        }

        this.import(data, dataCreationCallback);
    }
    importJson(json, dataCreationCallback) {
        super.importJson(json, dataCreationCallback);
        this.sortingGroups = json.sortingGroups;
    }

    add(key, value) {
        super.add(key, value);
        let propertyValue = "";
        for (let property in this.sortingGroups) {
            if (value.hasOwnProperty(property)) {
                this.addSortingGroup(property, value[property], value.name);
            }
        }
    }
    
    addSortingGroup(property, propertyValue, valueName) {
        if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
            this.sortingGroups[property][propertyValue] = [];
        }
        this.sortingGroups[property][propertyValue].push(valueName);
    }

    filter(filterData) {
        
        let filteredGroup;
        if(Array.isArray(filterData)) {
            filteredGroup = this.getSortedGroup(filterData[0].property, filterData[0].value);
            let nextFilter = [];
            for (let i = 1; i < filterData.length; i++) {
                if (filteredGroup == undefined || filteredGroup.length == 0) {
                    return [];
                }
                nextFilter = this.getSortedGroup(filterData[i].property, filterData[i].value);
                filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
            }
        }
        else {
            filteredGroup = this.getSortedGroup(filterData.property, filterData.value);
        }
        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return this.getGroupData(filteredGroup);
    }

    getSortedGroup(property, propertyValue) {
        return this.sortingGroups[property][propertyValue];
    }

    getGroupData(group) {
        let output = [];
        for (let i = 0; i < group.length; i++) {
            output.push(this.get(group[i]));
        }
        return output;
    }

    getPropertyValues(property) {
        let output = [];
        for (let key in this.sortingGroups[property]) {
            output.push(key);
        }
        return output;
    }

    getValuesByProperty(property) {
        let output = [];
        for (let key in this.values) {
            output.push(this.values[key][property]);
        }
        return output;
    }
}
class ExtendedTechniqueDatabase extends Database {
    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            switch (data.name) {
                case "-":
                    this.get(data.linkedTech).importEffectTechnique(data);
                    break;
                case "!":
                    this.get(data.linkedTech).importOngoingTechnique(data);
                    break;
                default:
                    this.add(data.name, data);
                    break;
            }
        }
    }
}
class ExtendedDescriptionDatabase extends Database {
    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        let formulaDefs;
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            if (this.has(data.name)) {
                this.values[data.name].descriptions.push(data.descriptions[0]);
            }
            else {
                this.add(data.name, data);
                formulaDefs = data.getFormulaDefinitions();
                for (let i = 0; i < formulaDefs.length; i++) {
                    this.addSortingGroup("formulaMods", formulaDefs[i], data.name);
                }
            }
        }
    }
}

class dbObj {
    constructor(data) {
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data);
            }
            else if (typeof data == "string") {
                this.importStringifiedJson(data);
            }
            else {
                this.importJson(data);
            }
        }
        else {
            this.createEmpty();
        }
    }
    importStringifiedJson(stringifiedJSON) {
        if (stringifiedJSON == undefined || stringifiedJSON == "") {
            return;
        }
        let json = JSON.parse(stringifiedJSON);
        this.importJson(json);
    }
    importJson(json) { }
    importSheets(dataArray) { }
    createEmpty() { }
}

class WuxDatabaseData extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.description = json.description;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
    }
    createDefinition(baseDefinition) {
        let definition = new DefinitionData();
        definition.name = `${baseDefinition.name}_${this.name}`;
        definition.fieldName = this.fieldName;
        definition.variable = `${baseDefinition.getVariable(this.variable == "" ? this.fieldName : this.variable)}{0}`;
        definition.title = this.name;
        definition.group = baseDefinition.name;
        definition.subGroup = "";
        definition.descriptions = [this.description];
        definition.formula = baseDefinition.formula;
        definition.modifiers = baseDefinition.modifiers;
        definition.linkedGroups = baseDefinition.linkedGroups;
        definition.isResource = baseDefinition.isResource;
        return definition;
    }

}
class TechniqueData extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.techSet = json.techSet;
        this.linkedTech = json.linkedTech;
        this.group = json.group;
        this.affinity = json.affinity;
        this.tier = json.tier;
        this.isFree = this.affinity == "" && this.tier <= 1;
        this.action = json.action;
        this.traits = json.traits;
        this.resourceCost = json.resourceCost;
        this.limits = json.limits;
        this.skill = json.skill;
        this.range = json.range;
        this.target = json.target;
        this.requirement = json.requirement;
        this.itemTraits = json.itemTraits;
        this.trigger = json.trigger;
        this.flavorText = json.flavorText;
        this.definitions = Array.isArray(json.definitions) ? json.definitions : [];
        this.autoEffects = json.autoEffects;
        this.effects = new Dictionary();
        this.effects.importJson(json.effects);
        this.onGoingTech = new TechniqueData(json.onGoingTech);
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.techSet = "" + dataArray[i]; i++;
        this.linkedTech = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.affinity = "" + dataArray[i]; i++;
        this.tier = parseInt(dataArray[i]) == NaN ? 1 : parseInt(dataArray[i]); i++;
        this.isFree = this.affinity == "" && this.tier <= 1;
        this.action = "" + dataArray[i]; i++;
        this.traits = "" + dataArray[i]; i++;
        this.resourceCost = "" + dataArray[i]; i++;
        this.limits = "" + dataArray[i]; i++;
        this.skill = "" + dataArray[i]; i++;
        this.range = "" + dataArray[i]; i++;
        this.target = "" + dataArray[i]; i++;
        this.requirement = "" + dataArray[i]; i++;
        this.itemTraits = "" + dataArray[i]; i++;
        this.trigger = "" + dataArray[i]; i++;
        this.flavorText = "" + dataArray[i]; i++;
        this.definitions = [];
        this.autoEffects = [];
        this.effects = new Dictionary();
        this.onGoingTech = undefined;
        this.importEffectSheet(dataArray.slice(i));
    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.techSet = "";
        this.linkedTech = "";
        this.group = "";
        this.affinity = "";
        this.tier = 0;
        this.isFree = false;
        this.action = "";
        this.traits = "";
        this.resourceCost = "";
        this.limits = "";
        this.skill = "";
        this.range = "";
        this.target = "";
        this.requirement = "";
        this.itemTraits = "";
        this.trigger = "";
        this.flavorText = "";
        this.definitions = [];
        this.autoEffects = [];
        this.effects = new Dictionary();
        this.onGoingTech = undefined;
    }

    setAugmentTechValues(baseTechnique) {

        if (this.name == "") {
            return baseTechnique;
        }
        this.techSet = this.setAugmentTechValue(this.techSet, baseTechnique.techSet);
        this.linkedTech = this.setAugmentTechValue(this.linkedTech, baseTechnique.linkedTech);
        this.group = this.setAugmentTechValue(this.group, baseTechnique.group);
        this.tier = this.setAugmentTechValue(this.tier, baseTechnique.tier);
        this.action = this.setAugmentTechValue(this.action, baseTechnique.action);
        this.traits = this.setAugmentTechValue(this.traits, baseTechnique.traits);
        this.resourceCost = this.setAugmentTechValue(this.resourceCost, baseTechnique.resourceCost);
        this.limits = this.setAugmentTechValue(this.limits, baseTechnique.limits);
        this.skill = this.setAugmentTechValue(this.skill, baseTechnique.skill);
        this.range = this.setAugmentTechValue(this.range, baseTechnique.range);
        this.target = this.setAugmentTechValue(this.target, baseTechnique.target);
        this.requirement = this.setAugmentTechValue(this.requirement, baseTechnique.requirement);
        this.itemTraits = this.setAugmentTechValue(this.itemTraits, baseTechnique.itemTraits);
        this.trigger = this.setAugmentTechValue(this.trigger, baseTechnique.trigger);
        this.flavorText = this.setAugmentTechValue(this.flavorText, baseTechnique.flavorText);
    }
    setAugmentTechValue (augmentValue, baseValue) {
        if (augmentValue == "-") {
            return "";
        }
        else if (augmentValue == "") {
            return baseValue;
        }
        return augmentValue;
    }

    importEffectSheet(dataArray) {
        let i = 0;
        let defense = "" + dataArray[i]; i++;
        let onPass = "" + dataArray[i]; i++;
        let effect = new TechniqueEffect(dataArray.slice(i)); i++;

        if (effect.type == "Definition") {
            this.addDefinition(effect.effect);
            return;
        }

        if (effect.type == "" && effect.effect == "") {
            return;
        }
        
        if (defense == "") {
            this.autoEffects.push(effect);
        }
        else {
            this.addEffect(defense, onPass, effect);
        }

        if (effect.type == "Condition") {
            this.addDefinition(effect.effect);
        }
    }
    importEffectTechnique(technique) {
        if (technique.autoEffects.length > 0) {
            this.autoEffects = this.autoEffects.concat(technique.autoEffects);
        }
        else {
            let effect = technique.effects.getByIndex(0);
            if (effect != undefined) {
                let isOnPass = effect.onPass.length > 0;
                this.addEffect(technique.effects.getkey(0), isOnPass, isOnPass ? effect.onPass[0] : effect.auto[0]);
            }
        }

        if (technique.definitions.length > 0) {
            this.addDefinition(technique.definitions[0]);
        }
    }
    addEffect(defense, onPass, effect) {
        if (!this.effects.has(defense)) {
            this.effects.add(defense, {onPass: [], auto: []});
        }
        if (onPass == "1") {
            this.effects.get(defense).onPass.push(effect);
        }
        else {
            this.effects.get(defense).auto.push(effect);
        }
    }

    importOngoingTechnique(technique) {
        if (this.onGoingTech == undefined) {
            this.onGoingTech = technique;
        }
        else {
            this.onGoingTech.importEffectTechnique(technique);
        }
    }

    addDefinition(definition) {
        if (!this.definitions.includes(definition)) {
            this.definitions.push(definition);
        }
    }
}
class TechniqueEffect extends dbObj {
    importJson(json) {
        this.target = json.target;
        this.type = json.type;
        this.subType = json.subType;
        this.dVal = json.dVal;
        this.dType = json.dType;
        this.dBonus = json.dBonus;
        this.effect = json.effect;
        this.traits = json.traits;
    }
    importSheets(dataArray) {
        let i = 0;
        this.target = "" + dataArray[i]; i++;
        this.type = "" + dataArray[i]; i++;
        this.subType = "" + dataArray[i]; i++;
        this.dVal = "" + dataArray[i]; i++;
        this.dType = "" + dataArray[i]; i++;
        this.dBonus = "" + dataArray[i]; i++;
        this.effect = "" + dataArray[i]; i++;
        this.traits = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.target = "";
        this.type = "";
        this.subType = "";
        this.dVal = "";
        this.dType = "";
        this.dBonus = "";
        this.effect = "";
        this.traits = "";
    }
}
class TechniqueStyle extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.description = json.description;
        this.affinity = json.affinity;
        this.cr = json.cr;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.affinity = "" + dataArray[i]; i++;
        this.cr = parseInt(dataArray[i]); i++;
    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.affinity = "";
        this.cr = 0;
    }
}
class SkillData extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.abilityScore = json.abilityScore;
        this.description = json.description;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = "" + dataArray[i]; i++;
        this.abilityScore = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;

    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.abilityScore = "";
        this.description = "";
    }
}
class LanguageData extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.location = json.location;
        this.description = json.description;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = "" + dataArray[i]; i++;
        this.location = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.location = "";
        this.description = "";
    }
}
class LoreData extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = json.fieldName;
        this.group = json.group;
        this.description = json.description;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
    }
}
class JobData extends WuxDatabaseData {
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.attributes = new AttributeGroupData();
        this.roles = this.createRolesArray();
        this.prereq = "";
        this.techniques = [];
    }
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.description = json.description;
        this.attributes = json.attributes;
        this.roles = json.roles;
        this.prereq = json.prereq;
        this.techniques = json.techniques;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.attributes = new AttributeGroupData(dataArray.slice(i)); i += 7;
        this.roles = this.createRolesArray(dataArray.slice(i)); i += 5;
        this.prereq = "" + dataArray[i]; i++;
        this.techniques = this.createJobTechnique(dataArray.slice(i)); i++;
    }

    createRolesArray(modArray) {

        var output = {
            generalist: 0,
            athlete: 0,
            defender: 0,
            marksman: 0,
            skirmisher: 0
        };

        if (modArray != undefined) {
            let i = 0;
            output.generalist = parseInt(modArray[i]); i++;
            output.athlete = parseInt(modArray[i]); i++;
            output.defender = parseInt(modArray[i]); i++;
            output.marksman = parseInt(modArray[i]); i++;
            output.skirmisher = parseInt(modArray[i]); i++;
        };

        return output;
    }
    createJobTechnique(modArray) {
        var output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({ name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0 });
            i++;
        }
        return output;
    }
}
class RoleData extends WuxDatabaseData {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.techniques = this.createTechnique(dataArray.slice(i)); i++;

    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.techniques = [];
    }

    createTechnique(modArray) {
        var output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({ name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0 });
            i++;
        }
        return output;
    }
}
class AttributeGroupData extends dbObj {
    importJson(json) {

    }
    importSheets(modArray) {
        let i = 0;
        this.bod = parseInt(modArray[i]); i++;
        this.prc = parseInt(modArray[i]); i++;
        this.qck = parseInt(modArray[i]); i++;
        this.cnv = parseInt(modArray[i]); i++;
        this.int = parseInt(modArray[i]); i++;
        this.rsn = parseInt(modArray[i]); i++;
        this.removeAttributeNaN();

    }
    createEmpty() {
        this.bod = 0;
        this.prc = 0;
        this.qck = 0;
        this.cnv = 0;
        this.int = 0;
        this.rsn = 0;
    }

    removeAttributeNaN() {
        if (isNaN(this.bod)) {
            this.bod = 0;
        }
        if (isNaN(this.prc)) {
            this.prc = 0;
        }
        if (isNaN(this.qck)) {
            this.qck = 0;
        }
        if (isNaN(this.cnv)) {
            this.cnv = 0;
        }
        if (isNaN(this.int)) {
            this.int = 0;
        }
        if (isNaN(this.rsn)) {
            this.rsn = 0;
        }
    }

    getAttributeNames() {
        return ["Body", "Precision", "Quickness", "Conviction", "Intuition", "Reason"];
    }

    getAttributeAbrNames() {
        return ["BOD", "PRC", "QCK", "CNV", "INT", "RSN"];
    }

    convertAttributesToArr() {
        let output = [];
        output.push(this.bod);
        output.push(this.prc);
        output.push(this.qck);
        output.push(this.cnv);
        output.push(this.int);
        output.push(this.rsn);
        return output;
    }
}
class DefinitionData extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.title = json.title;
        this.group = json.group;
        this.subGroup = json.subGroup;
        this.descriptions = json.descriptions;
        this.abbreviation = json.abbreviation;
        this.variable = json.variable;
        this.formula = json.formula;
        this.modifiers = json.modifiers;
        this.linkedGroups = json.linkedGroups;
        this.isResource = json.isResource;
        this.modAttrs = [];
        this.formulaCalculations = [];
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.title = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.subGroup = "" + dataArray[i]; i++;
        this.descriptions = [("" + dataArray[i])]; i++;
        this.abbreviation = "" + dataArray[i]; i++;
        this.variable = "" + dataArray[i]; i++;
        this.formula = "" + dataArray[i]; i++;
        this.modifiers = "" + dataArray[i]; i++;
        this.linkedGroups = Format.StringToArray("" + dataArray[i]).push(this.name); i++;
        this.isResource = dataArray[i] == "TRUE"; i++;
        this.modAttrs = [];
        this.formulaCalculations = [];
    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.title = "";
        this.group = "";
        this.subGroup = "";
        this.descriptions = [];
        this.abbreviation = "";
        this.variable = "";
        this.formula = "";
        this.modifiers = "";
        this.linkedGroups = [];
        this.isResource = false;
        this.modAttrs = [];
        this.formulaCalculations = [];
    }
    createDefinition(baseDefinition) {
        this.definition = "";
        let definition = super.createDefinition(baseDefinition);
        definition.descriptions = this.descriptions;
        definition.formula = this.formula;
        definition.modifiers = this.modifiers;
        definition.linkedGroups = this.linkedGroups;
        definition.isResource = this.isResource;

        delete this.description;
        
        return definition;
    }
    getVariables(array, mod1) {
        let output = [];
        for(let i = 0; i < array.length; i++) {
            output.push(this.getVariable(array[i], mod1));
        }
        return output;
    }
    getVariable(mod, mod1) {
        if (mod == undefined) {
            mod = "";
        }
        
        if (mod1 != undefined) {
            mod = [mod, mod1];
        }
        
        let i = 0;
        return this.variable.replace(/{(\d+)}/g, function(_,m) {
            i = parseInt(m);
            if (Array.isArray(mod) && i < mod.length && mod[i] != undefined) {
                return mod[i];
            }
            else if (i == 0) {
                return mod;
            }
            return "";
        });
    }
    getAttribute(mod, mod1) {
        return `attr_${this.getVariable(mod, mod1)}`;
    }
    setFormulaData() {
        let baseDefinition = this;
        this.modAttrs = [];
        this.formulaCalculations = [];
        
        if(this.formula == "") {
            return;
        }

        let definition = {};
        let modDefinition = {};
        let formulaVar = "";
        this.iterateFormulaComponents(function (definitionName, definitionNameModifier, multiplier) {
            if (isNaN(parseInt(definitionName))) {
                definition = WuxDef.Get(definitionName);
                if (definitionNameModifier == "") {
                    formulaVar = definition.getVariable();
                }
                else {
                    modDefinition = WuxDef.Get(definitionNameModifier);
                    formulaVar = definition.getVariable(modDefinition.getVariable());
                }
                baseDefinition.formulaCalculations.push(new WorkerFormula(formulaVar, 0, multiplier));
                baseDefinition.modAttrs.push(formulaVar);
            }
            else {
                baseDefinition.formulaCalculations.push(new WorkerFormula("", parseInt(definitionName), multiplier));
            }
        })

        let modArray = this.modifiers.split(";");
        modArray.forEach((mod) => {
            this.formulaCalculations.push(new WorkerFormula(mod, 0, 1));
            this.modAttrs.push(this.getVariable(mod));
        });
    }
    getFormulaDefinitions() {
        let output = [];
        
        this.iterateFormulaComponents(function (definitionName) {
            if (isNaN(parseInt(definitionName))) {
                output.push(definitionName);
            }
        });
        return output;
    }
    iterateFormulaComponents(callback) {
        let definitionName = "";
        let definitionNameModifier = "";
        let multiplier = 1;

        let formulaArray = this.formula.split(";");
        formulaArray.forEach((formula) => {
            definitionName = formula.trim();
            
            multiplier = 1;
            if (formula.indexOf("*") > -1) {
                let split = definitionName.split("*");
                definitionName = split[0];
                multiplier = split[1];
            }
            
            definitionNameModifier = "";
            if (formula.indexOf(":") > -1) {
                let split = definitionName.split(":");
                definitionName = split[0];
                definitionNameModifier = split[1];
            }

            callback(definitionName, definitionNameModifier, multiplier);
        });
    }
    getFormulaValue(attributeHandler) {
        let output = 0;
        this.formulaCalculations.forEach((formula) => {
            output += formula.getValue(attributeHandler);
        });
        return output;
    }
}
class TemplateData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;

    }
    createEmpty() {

    }
}
class TechniqueDisplayData {

    constructor(technique) {
        if (technique != undefined) {
            this.importTechnique(technique);
        }
        else {
            this.createEmpty();
        }
    }

    importTechnique(technique) {
        this.createEmpty();
        this.setTechBasics(technique);
        this.setTechSetData(technique);
        this.setTechActionData(technique);
        this.setTechTargetData(technique);
        this.setExtentionEffects(technique);
        this.setTraits(technique);
        this.setFlavorText(technique);
        this.setDefinitions(technique);
        this.setAutoEffects(technique);
        this.setEffects(technique);
        this.setOngoingEffects(technique);
    }
    
    setTechBasics(technique) {
        this.technique = technique;
        this.name = technique.name;
        this.username = technique.username;
        this.fieldName = Format.ToCamelCase(technique.name);
        this.actionType = technique.action;
        this.isFree = technique.isFree;
    }
    setTechSetData(technique) {
        this.techSetDisplay = technique.affinity;
        this.techSetTitle = technique.skill == "" ? "No Check" : technique.skill;
        this.techSetSub = technique.techSet == "" ? "No Style" : technique.techSet;
        if (technique.linkedTech == "") {
            this.techSetSub2 = "Free";
        }
        else if (technique.isFree) {
            this.techSetSub2 = `No Restrictions`;
        }
        else if (technique.affinity == "" && technique.tier > 1) {
            this.techSetSub2 = `CR ${Format.Romanize(technique.tier)}`;
        }
        else if (technique.tier <= 1) {
            this.techSetSub2 = `${technique.affinity}`;
        }
        else {
            this.techSetSub2 = `${technique.affinity} | CR ${Format.Romanize(technique.tier)}`;
        }
    }
    setTechActionData(technique) {
        this.actionData = "";
        if (technique.action != "") {
            this.actionData += technique.action;
        }
        if (technique.limits != "") {
            if (this.actionData != "") {
                this.actionData += "; ";
            }
            this.actionData += technique.limits;
        }
        if (technique.resourceCost != "") {
            if (this.actionData != "") {
                this.actionData += "; ";
            }
            this.actionData += technique.resourceCost;
        }
    }
    setTechTargetData(technique) {
        if (technique.range != "") {
            this.targetData = `Range: ${technique.range}`;
        }
        if (technique.target != "") {
            if (this.targetData != "") {
                this.targetData += "; ";
            }
            this.targetData += `${technique.target}`;
        }
    }
    setExtentionEffects(technique) {
        this.requirements = technique.requirement;
        this.itemTraits = WuxDef.GetValues(technique.itemTraits, ";");
        this.trigger = technique.trigger;
    }
    setTraits(technique) {
        this.traits = WuxDef.GetValues(technique.traits, ";");
    }
    setFlavorText(technique) {
        this.flavorText = technique.flavorText;
    }
    setDefinitions(technique) {
        this.definitions = WuxDef.GetValues(technique.definitions, ";");
        // if (technique.definitions.length > 0) {
        //     let conditionDefinition = "";
        //     let description = "";
        //     for (let i = 0; i < technique.definitions.length; i++) {
        //         conditionDefinition = WuxDef.Get(technique.definitions[i]);
        //         description = conditionDefinition.descriptions.join("\n");
        //         this.definitions.push(`[${conditionDefinition.group}: ${conditionDefinition.name}] ${description}`);
        //     }
        // }
    }

    setAutoEffects(technique) {
        this.autoEffects = new TechniqueEffectDisplayData(technique.autoEffects);
    }
    setEffects(technique) {
        this.effects = new Dictionary();
        technique.effects.iterate((effect, defense) => {
            this.effects.add(defense, new TechniqueEffectDisplayData(effect));
        });
    }
    setOngoingEffects(technique) {
    }

    createEmpty() {
        this.technique = {};
        this.name = "";
        this.actionType = "";
        this.username = "";
        this.fieldName = "";
        this.isFree = false;

        this.techSetDisplay = "";
        this.techSetTitle = "";
        this.techSetSub = "";
        this.techSetSub2 = "";
        
        this.actionData = "";
        this.targetData = "";

        this.trigger = "";
        this.requirements = "";
        this.itemTraits = [];

        this.traits = [];
        this.flavorText = "";
        this.definitions = [];

        this.autoEffects = [];
        this.effects = new Dictionary();
        this.ongoingEffects = undefined;
    }
}
class TechniqueEffectDisplayData {
    constructor(techniqueEffect) {
        this.createEmptyDefense();
        if (Array.isArray(techniqueEffect)) {
            this.auto = this.importEffectData(techniqueEffect);
        }
        else if (techniqueEffect != undefined) {
            this.importTechniqueEffect(techniqueEffect);
        }
    }

    createEmptyDefense() {
        this.auto = [];
        this.onPass = [];
    }

    importTechniqueEffect(techniqueEffect) {
        if (techniqueEffect.auto.length > 0) {
            this.auto = this.importEffectData(techniqueEffect.auto);
        }
        if (techniqueEffect.onPass.length > 0) {
            this.onPass = this.importEffectData(techniqueEffect.onPass);
        }
    }

    importEffectData(effectData) {
        let output = [];
        for (let i = 0; i < effectData.length; i++) {
            output.push(this.formatEffect(effectData[i]));
        }

        return output;
    }

    formatEffect(effect) {
        let output = "";
        switch (effect.type) {
            case "Damage":
                output = this.formatDamageEffect(effect);
            break;
            case "Condition":
                output = this.formatConditionEffect(effect);
            break;
            case "Definition":
            break;
            case "":
                output = this.formatDescriptionEffect(effect);
            break;
        }
        
        return output;
    }

    formatDamageEffect(effect) {
        return `[${this.formatCalcBonus(effect)}] ${effect.effect} damage`;
    }

    formatConditionEffect(effect) {
        let condition = WuxDef.Get(effect.effect);
        let target = effect.target == "Self" ? "You" : "Target";
        let ranks = this.formatCalcBonus(effect);
        switch (effect.subType) {
            case "Add": return `${target} gains the ${condition.name} ${condition.group}`;
            case "Remove": return `${target} loses the ${condition.name} ${condition.group}`;
            case "Remove Any": return `${target} loses any condition of your choice`;
            case "Rank Up": return `${target} gains [${ranks}] rank in the ${condition.name} ${condition.group}`;
            case "Rank Down": return `${target} loses [${ranks}] rank in the ${condition.name} ${condition.group}`;
            default: return `${target} gains the ${condition.name} ${condition.group}`;
        }
    }
    
    formatDescriptionEffect(effect) {
        return effect.effect;
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        let bonusEffects = effect.dBonus.split(";");
        for(let i = 0; i < bonusEffects.length; i++) {
            bonusEffects[i] = bonusEffects[i].trim();
            if (output != "") {
                output += "; ";
            }
            if (isNaN(parseInt(bonusEffects[i]))) {
                output += `${WuxDef.GetAbbreviation(bonusEffects[i])}`;
            }
            else {
                output += `${bonusEffects[i]}`;
            }
        }
        return output;
    }

    formatEffectDice(effect) {
        if (effect.dVal != "" && effect.dVal > 0) {
            return `${effect.dVal}d${effect.dType}`;
        }
        return "";
    }
}
class WorkerBuildStat extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToCamelCase(this.name);
        this.value = json.value;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
        this.value = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.fieldName = Format.ToCamelCase(this.name);
        this.value = "0";
    }
}
class WorkerBuildStats extends Dictionary {

    getPointsTotal() {
        let points = 0;
        for (let i = 0; i < this.keys.length; i++) {
            if (this.values[this.keys[i]].value == "on") {
                points++;
            }
            else {
                points += isNaN(parseInt(this.values[this.keys[i]].value)) ? 0 : parseInt(this.values[this.keys[i]].value);
            }
        }
        return points;
    }
}
class WorkerFormula {
    constructor(modName, value, multiplier) {
        this.modName = modName == undefined ? "" : modName;
        this.value = isNaN(parseInt(value)) ? 0 : parseInt(value);
        this.multiplier = isNaN(parseInt(multiplier)) ? 1 : parseInt(multiplier);
    }
    getValue(attributeHandler) {
        if (this.modName != "") {
            this.value = attributeHandler.parseInt(this.modName);
        }
        
        return this.value * this.multiplier;
    }
}

// ====== Formatters

var FeatureService = FeatureService || (function () {
    'use strict';

    var

        // Display Technique (Variants)
        // ------------------------,

        getRollTemplate = function (techDisplayData) {

            let output = "";

            output += `{{Username=${techDisplayData.username}}}{{Name=${techDisplayData.name}}}{{SlotType=${techDisplayData.slotFooter}}}{{Source=${techDisplayData.slotSource}}}{{UsageInfo=${techDisplayData.usageInfo}}}${techDisplayData.traits.length > 0 ? rollTemplateTraits(techDisplayData.traits, "Trait") : ""}${techDisplayData.trigger ? `{{Trigger=${techDisplayData.trigger}}}` : ""}${techDisplayData.requirement ? `{{Requirement=${techDisplayData.requirement}}}` : ""}${techDisplayData.item ? `{{Item=${techDisplayData.item}}}` : ""}${techDisplayData.range ? `{{Range=${techDisplayData.range}}}` : ""}${techDisplayData.target ? `{{Target=${techDisplayData.target}}}` : ""}${techDisplayData.skill ? `{{SkillString=${techDisplayData.skill}}}` : ""}${techDisplayData.damage ? `{{DamageString=${techDisplayData.damage}}}` : ""}${techDisplayData.description ? `{{Desc=${techDisplayData.description}}}` : ""}${techDisplayData.onHit ? `{{OnHit=${techDisplayData.onHit}}}` : ""}${techDisplayData.conditions ? `{{Conditions=${techDisplayData.conditions}}}` : ""}`;

            output += ` {{type-${techDisplayData.slotType}=1}} ${techDisplayData.slotIsPath ? "{{isPath=1}} " : ""}{{type-${techDisplayData.actionType}=1}} ${techDisplayData.isFunctionBlock ? "{{type-FunctionBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlockTarget=1}} " : ""}${techDisplayData.isDescBlock ? "{{type-DescBlock=1}} " : ""}`;

            return `&{template:technique} ${output.trim()}`;
        },

        getRollTemplateFromTechnique = function (technique) {
            return getRollTemplate(new TechniqueDisplayData(technique));
        },

        getConsumeUsePost = function (technique) {

            // add technique data for the api
            technique.username = "@{character_name}";
            let usedTechData = JSON.stringify(technique);

            // add the equopped action at the end
            if (technique.traits != "" && (technique.traits.indexOf("Armament") >= 0 || technique.traits.indexOf("Arsenal") >= 0)) {
                usedTechData += "##@{technique-equippedWeapon}";
            }

            return `!ctech ${usedTechData}`;
        },

        // Formatting
        // ------------------------,

        rollTemplateTraits = function (traitsDb, rtPrefix) {
            let output = "";
            for (var i = 0; i < traitsDb.length; i++) {
                output += `{{${rtPrefix}${i}=${traitsDb[i].name}}} {{${rtPrefix}${i}Desc=${traitsDb[i].description}}} `;
            }
            return output;
        },

        getDamageString = function (feature) {

            var output = "";

            if (feature.dVal != "" && feature.dVal > 0) {
                output += feature.dVal + "d" + feature.dType;
            }
            if (feature.dBonus != "" && feature.dBonus != undefined) {
                var elements = feature.dBonus.split(";");
                for (var i = 0; i < elements.length; i++) {
                    output += `+${elements[i]}`;
                }
            }
            if (feature.damageType != "") {
                output += ` ${feature.damageType}`;
            }
            if (feature.element != undefined && feature.element != "") {
                output += ` [${feature.element}]`;
            }

            return output;
        },

        getPrerequisiteString = function (feature) {
            var output = "";

            return output;
        },

        // Technique Effects
        // ------------------------,

        getActionEffects = function (effects) {
            let actionEffectsObj = getActionEffectObj();

            if (effects != undefined && effects != "") {
                let keywordsSplit = effects.split(";");

                for (let i = 0; i < keywordsSplit.length; i++) {
                    parseActionEffect(actionEffectsObj, keywordsSplit[i]);
                }

            }

            return actionEffectsObj;
        },

        parseActionEffect = function (actionEffectsObj, actionEffect) {
            let data = actionEffect.split(":");
            let action = data[0];
            let effect = data[1];

            let targetSelf = false;
            if (action.includes("*")) {
                targetSelf = true;
                action = action.replace("*", "");
            }

            setActionEffectData(actionEffectsObj, action, effect, targetSelf);
        },

        setActionEffectData = function (actionEffectsObj, action, effect, targetSelf) {
            switch (action) {
                case "S": actionEffectsObj.addState(effect, targetSelf); break;
                case "C": actionEffectsObj.addCondition(effect, targetSelf); break;
                case "R": actionEffectsObj.addRemoval(effect, targetSelf); break;
                case "SR": actionEffectsObj.addStatusRemoval(effect, targetSelf); break;
                case "H": actionEffectsObj.addHeal(effect, targetSelf); break;
                case "T": actionEffectsObj.addTempHeal(effect, targetSelf); break;
                case "K": actionEffectsObj.addKiRecovery(effect, targetSelf); break;
            }
        },

        getActionEffectObj = function () {
            return {
                states: [],
                conditions: [],
                removals: [],
                statusRemovals: [],
                heals: [],
                tempHeals: [],
                kiRecoveries: [],

                createTargetData: function (name, targetSelf) {
                    return { name: name, targetSelf: targetSelf };
                },

                addState: function (name, targetSelf) {
                    this.states.push(this.createTargetData(name, targetSelf));
                },

                addCondition: function (name, targetSelf) {
                    this.conditions.push(this.createTargetData(name, targetSelf));
                },

                addRemoval: function (name, targetSelf) {
                    this.removals.push(this.createTargetData(name, targetSelf));
                },

                addStatusRemoval: function (name, targetSelf) {
                    this.statusRemovals.push(this.createTargetData(name, targetSelf));
                },

                addHeal: function (name, targetSelf) {
                    this.heals.push(this.createTargetData(name, targetSelf));
                },

                addTempHeal: function (name, targetSelf) {
                    this.tempHeals.push(this.createTargetData(name, targetSelf));
                },

                addKiRecovery: function (name, targetSelf) {
                    this.kiRecoveries.push(this.createTargetData(name, targetSelf));
                }
            };
        }

        ;
    return {
        GetRollTemplate: getRollTemplate,
        GetRollTemplateFromTechnique: getRollTemplateFromTechnique,
        GetConsumeUsePost: getConsumeUsePost,
        RollTemplateTraits: rollTemplateTraits,
        GetDamageString: getDamageString,
        GetPrerequisiteString: getPrerequisiteString,
        GetActionEffects: getActionEffects
    };

}());

var ItemHandler = ItemHandler || (function () {
    'use strict';

    var
        getTechniqueWeaponRollTemplate = function (itemData) {
            let output = "";
            output += `{{WpnName=${itemData.name}}} `;

            output += FeatureService.RollTemplateTraits(WuxDef.Get(itemData.traits), "WpnTrait");
            output += FeatureService.RollTemplateTraits(WuxDef.Get(itemData.abilities), "WpnAbility");

            if (itemData.range != "") {
                output += `{{WpnRange=${itemData.range}}} `;
            }
            if (itemData.threat != "") {
                output += `{{WpnThreat=${itemData.threat}}} `;
            }
            output += `{{WpnDamage=${itemData.damageString}}} `;
            output += `{{WpnSkill=${itemData.skill}}} `;

            return output;
        }

        ;
    return {
        GetTechniqueWeaponRollTemplate: getTechniqueWeaponRollTemplate
    };
}());

var Format = Format || (function () {
    'use strict';

    var
        toCamelCase = function (inputString) {

            if (inputString == "" || inputString == undefined) {
                return inputString;
            }

            // Split the input string by spaces and iterate through the words
            let words = inputString.split(' ');
            words[0] = words[0][0].toLowerCase() + words[0].slice(1);
            for (let i = 1; i < words.length; i++) {
                if (words[i].length > 0) {
                    // Capitalize the first letter of each word (except the first word)
                    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
                }
            }

            return words.join('');
        },

        toUpperCamelCase = function (inputString) {

            if (inputString == "" || inputString == undefined) {
                return inputString;
            }

            // Split the input string by spaces and iterate through the words
            let words = inputString.split(" ");

            for (let i = 0; i < words.length; i++) {
                // Capitalize the first letter of each word 
                words[i] = words[i][0].toUpperCase() + words[i].slice(1);
            }

            return words.join('');
        },

        romanize = function (num) {
            if (isNaN(num))
                return NaN;
            var digits = String(+num).split(""),
                key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                       "","I","II","III","IV","V","VI","VII","VIII","IX"],
                roman = "",
                i = 3;
            while (i--)
                roman = (key[+digits.pop() + (i * 10)] || "") + roman;
            return Array(+digits.join("") + 1).join("M") + roman;
        },

        // Array Formatting
        // ------------------------

        stringToArray = function (string, delimeter) {
            if (string == "" || string == undefined) {
                return [];
            }

            if (delimeter == undefined) {
                delimeter = ";";
            }
            let arr = string.split(delimeter);
            return arr.map(s => s.trim());
        },

        arrayToString = function (array, delimeter) {
            if (delimeter == undefined) {
                delimeter = ", ";
            }
            let output = "";
            _.each(array, function (obj) {
                if (output != "") {
                    output += delimeter;
                }
                output += obj;
            });
            return output;
        },

        sortArrayDecrementing = function (array) {
            array.sort();
            array.reverse();
            return array;
        },

        // Chat Formatting
        // ------------------------

        showTooltip = function (message, tooltip) {
            return `[${message}](#" class="showtip" title="${SanitizeSheetRoll(tooltip)})`;
        },


        // Chat Formatting
        // ------------------------

        sanitizeSheetRoll = function (roll) {
            var sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/%/g, "&#37;");
            sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
            sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
            sheetRoll = sheetRoll.replace(/\</g, "&#60;");
            sheetRoll = sheetRoll.replace(/\>/g, "&#62;");
            sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
            sheetRoll = sheetRoll.replace(/@/g, "&#64;");
            sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
            sheetRoll = sheetRoll.replace(/]/g, "&#93;");
            sheetRoll = sheetRoll.replace(/\n/g, "<br />");
            return sheetRoll;
        },

        sanitizeSheetRollAction = function (roll) {
            var sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/%/g, "&#37;");
            sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
            sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
            sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
            sheetRoll = sheetRoll.replace(/:/g, "");
            sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
            sheetRoll = sheetRoll.replace(/@/g, "&#64;");
            sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
            sheetRoll = sheetRoll.replace(/]/g, "&#93;");
            sheetRoll = sheetRoll.replace(/\n/g, "&&");
            return sheetRoll;
        }

        ;
    return {
        ToCamelCase: toCamelCase,
        ToUpperCamelCase: toUpperCamelCase,
        Romanize: romanize,
        StringToArray: stringToArray,
        ArrayToString: arrayToString,
        SortArrayDecrementing: sortArrayDecrementing,
        ShowTooltip: showTooltip,
        SanitizeSheetRoll: sanitizeSheetRoll,
        SanitizeSheetRollAction: sanitizeSheetRollAction
    };
}());

var Dice = Dice || (function () {
    'use strict';

    var
        rollDice = function (dieValue, dieType) {
            let rolls = [];
            while (dieValue > 0) {
                dieValue--;
                rolls.push(randomInteger(dieType));
            }
            return rolls;
        },

        totalDice = function (rolls) {
            let total = 0;
            _.each(rolls, function (obj) {
                total += obj;
            });
            return total;
        },

        getHighRolls = function (dieValue, dieType, keepCount) {
            let output = {
                rolls: [],
                keeps: []
            }
            output.rolls = rollDice(dieValue, dieType);
            output.rolls = Format.SortArrayDecrementing(output.rolls);
            for (let i = 0; i < keepCount; i++) {
                if (keepCount <= output.rolls.length) {
                    output.keeps.push(output.rolls[i]);
                }
            }
            return output;
        }

        ;
    return {
        RollDice: rollDice,
        TotalDice: totalDice,
        GetHighRolls: getHighRolls
    };
}());


// ====== Section Ids

function GetSectionIdName(sectionName, currentID, variableName) {

    if (variableName.startsWith("attr")) {
        variableName = variableName.substr(4);
    }

    if (currentID != "") {
        if (!variableName.startsWith("_")) {
            variableName = "_" + variableName;
        }
        if (!sectionName.endsWith("_")) {
            sectionName += "_";
        }
    }
    return sectionName + currentID + variableName;
}

function GetSectionIdNameFromArray(sectionName, currentID, variableNames) {
    let output = [];
    for (let i = 0; i < variableNames.length; i++) {
        output.push(GetSectionIdName(sectionName, currentID, variableNames[i]));
    }
    return output;
}

function GetFieldNameAttribute(fieldName) {
    if (fieldName.indexOf("_") >= 0) {
        fieldName = fieldName.match(/_([^_]*)$/)[1];
    }
    if (fieldName.indexOf("-") >= 0) {
        fieldName = fieldName.match(/-(?!.*-)(.*)$/)[1];
    }
    return fieldName;
}

function GetRepeatingSectionFromFieldName(fieldName) {
    if (fieldName.indexOf("_") >= 0) {
        fieldName = fieldName.substring(fieldName.indexOf("_") + 1);
        if (fieldName.indexOf("_") >= 0) {
            fieldName = "repeating_" + fieldName.substring(0, fieldName.indexOf("_"));
        }
    }
    return fieldName;
}

function GetRepeatingSectionIdFromId(id, repeatingSection) {
    var len = repeatingSection.length + 1;
    return id.substr(len, 20);
}

// ====== Language

function GetLanguageName(language) {

    switch (language.toLowerCase()) {
        case "minere":
        case "min":
        case "m":
            return "Minere";
        case "apollen":
        case "apo":
        case "apol":
        case "a":
            return "Apollen";
        case "junal":
        case "jun":
        case "j":
            return "Junal";
        case "cert":
        case "cer":
        case "c":
            return "Cert";
        case "lib":
        case "l":
            return "Lib";
        case "jovean":
        case "novan":
            return "Jovean";

        case "byric":
            return "Byric";
        case "ciel":
            return "Ciel";
        case "citeq":
            return "Citeq";
        case "crinere":
            return "Crinere";
        case "dustell":
            return "Dustell";
        case "kleikan":
            return "Kleikan";
        case "manstan":
            return "Manstan";
        case "muralic":
            return "Muralic";
        case "mytikan":
            return "Mytikan";
        case "palmic":
            return "Palmic";
        case "salkan":
            return "Salkan";
        case "sansic":
            return "Sansic";
        case "shira":
            return "Shira";
        case "shorespeak":
            return "Shorespeak";
        case "silq":
            return "Silq";
        case "spirit":
            return "Spirit";
        case "verdeni":
            return "Verdeni";
        case "vulca":
            return "Vulca";
        case "wolfwarg":
            return "Wolfwarg";
        case "beast":
            return "Beast";
        case "emotion":
            return "Emotion";
        case "empathy":
            return "Empathy";

        default:
            return "";
    }
}

function GetLanguageTag(language) {

    if (language == undefined) {
        return "{{language-default=1}}";
    }

    switch (language.toLowerCase()) {
        case "minere":
            return "{{language-coastal=1}}";
        case "apollen":
            return "{{language-mountain=1}}";
        case "junal":
            return "{{language-desert=1}}";
        case "cert":
            return "{{language-plains=1}}";
        case "lib":
            return "{{language-rare=1}}";


        case "palmic":
        case "shorespeak":
        case "verdeni":
            return "{{language-coastal=1}}{{language-regional=1}}";
        case "crinere":
        case "vulca":
            return "{{language-coastal=1}}{{language-ancient=1}}";

        case "kleikan":
            return "{{language-mountain=1}}{{language-regional=1}}";

        case "byric":
        case "dustell":
        case "muralic":
            return "{{language-desert=1}}{{language-regional=1}}";
        case "shira":
            return "{{language-desert=1}}{{language-ancient=1}}";

        case "ciel":
        case "citeq":
        case "manstan":
        case "salkan":
        case "sansic":
        case "silq":
            return "{{language-plains=1}}{{language-regional=1}}";

        case "jovean":
            return "{{language-rare=1}}{{language-regional=1}}";
        case "mytikan":
            return "{{language-rare=1}}{{language-ancient=1}}";

        case "wolfwarg":
        case "beast":
        case "empathy":
        case "emotion":
        case "spirit":
            return "{{language-special=1}}";

        default:
            return "{{language-default=1}}";
    }
}

// ===== Generators
// =================================================

function GetBlankCharacter() {
    return {
        name: "",
        nationality: "",
        nature: "",
        ancestry: "",
        gender: "",
        classCategory: "",
        sector: "",
        profession: "",
        rapport: 0,
        favors: 0
    };
}

function CharacterNationalityGenerator() {
    var rnd = Math.floor(Math.random() * 5);
    switch (rnd) {
        case 0:
            return "Minerva";
        case 1:
            return "Apollo";
        case 2:
            return "Juno";
        case 3:
            return "Ceres";
        case 4:
            return "Liber";
        default:
            return "Minerva";
    }
}

function CharacterRaceGenerator(nationality) {
    var races = [];

    // change the odds based on nationality
    switch (nationality) {
        case "Minerva":
            races = GetRaceList(60, 12, 10, 17, 1);
            break;
        case "Apollo":
            races = GetRaceList(3, 85, 2, 10, 0);
            break;
        case "Juno":
            races = GetRaceList(3, 2, 80, 10, 5);
            break;
        case "Ceres":
            races = GetRaceList(10, 30, 4, 55, 1);
            break;
        case "Liber":
            races = GetRaceList(1, 0, 2, 2, 95);
            break;
        default:
            races = GetRaceList(20, 20, 20, 20, 20);
            break;
    }

    // roll on the randomizer
    var rnd = Math.floor(Math.random() * 100);

    for (var i = 0; i < races.length; i++) {
        if (rnd < races[i].odds) {
            return races[i].race;
        }
        rnd -= races[i].odds;
    }

    return "Coastborne";
}

function CharacterGenderGenerator() {
    var rnd = Math.floor(Math.random() * 2);
    if (rnd == 0) {
        return "Male";
    } else {
        return "Female";
    }
}

function CharacterNameGenerator(nationality, race, gender) {
    var firstNameList = [""];
    var lastNameList = [""];
    var firstName = "";
    var lastName = "";
    var rnd = 0;

    // Choose whether to select a name based on race or nationality. 
    rnd = Math.random() * 100;

    // The logic here is that race has less of an effect than nationality on first names
    if (rnd < 70) {
        firstNameList = GetNameList(nationality, gender);
    } else {
        firstNameList = GetNameList(race, gender);
    }

    // The logic here is that race has more of an effect than nationality on last names
    if (rnd < 15) {
        lastNameList = GetNameList(nationality, "last");
    } else {
        lastNameList = GetNameList(race, "last");
    }

    // choose the names
    firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];

    if (lastName != "") {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
}

function CharacterNatureGenerator() {
    var natures = GetNatureList();

    var rnd = Math.floor(Math.random() * natures.length);

    return natures[rnd];
}

function CharacterClassGenerator(venueClass) {
    // set up variables
    var maxRoll = 0;
    var eliteRoll = 0;
    var highRoll = 0;
    var mediumRoll = 0;
    var lowRoll = 0;


    // these represent ratios or chances each class might show up
    var eliteMod = 1;
    var highMod = 9;
    var mediumMod = 60;
    var lowMod = 120;


    // first we need to determine the maxRoll value which represents the highest possible roll
    maxRoll += eliteMod;
    eliteRoll = maxRoll;
    maxRoll += highMod;
    highRoll = maxRoll;


    // add the other sets if the class is potentially lower
    if (venueClass != "High") {
        maxRoll += mediumMod;
        mediumRoll = maxRoll;
    }
    if (venueClass != "High" && venueClass != "Medium") {
        maxRoll += lowMod;
        lowRoll = maxRoll;
    }


    // select a random number within the Max Range
    var rnd = Math.floor(Math.random() * maxRoll);


    // return a class
    if (rnd <= eliteRoll) {
        return "Elite";
    } else if (rnd <= highRoll) {
        return "High";
    } else if (rnd <= mediumRoll) {
        return "Medium";
    } else {
        return "Low";
    }
}

function CharacterSectorGenerator(classCategory) {
    var sectors = GetSectorProbabilityList(classCategory);
    var i = 0;

    // determine the number of odds
    var maxRnd = 0;
    for (i = 0; i < sectors.length; i++) {
        maxRnd += sectors[i].odds;
    }

    // select a random sector
    var rnd = Math.floor(Math.random() * maxRnd);
    for (i = 0; i < sectors.length; i++) {
        if (rnd < sectors[i].odds) {
            return sectors[i].sector;
        }
        rnd -= sectors[i].odds;
    }

    return "";
}

function CharacterProfessionGenerator(classCategory, sector) {
    var professions = GetProfessionList(sector);
    var professionsList = [];

    switch (classCategory) {
        case "Elite":
            professionsList = professions.elite;
            break;
        case "High":
            professionsList = professions.high;
            break;
        case "Medium":
            professionsList = professions.medium;
            break;
        case "Low":
        default:
            professionsList = professions.low;
            break;
    }

    // select a random number within the list
    var rnd = Math.floor(Math.random() * professionsList.length);

    return professionsList[rnd];
}

var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "Character Creator", "Core", "Advancement", "Training Page", "Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Full Name", "Display Name", "Level", "XP", "Training", "CR", "HP", "WILL", "EN", "Initiative", "Carrying Capacity", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill", "Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Chakra", "Combat_Move Speed", "Combat_Move Potency", "Social_Approval", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Style_Basic Set", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "title": "Attributes", "group": "Type", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "When assigning attributes you may assign them a value. They range from a +3 bonus to a -1 penalty. Assigning an attribute a penalty will grant you more points to assign to other attributes.", "Normally, a character can have at most one attribute at a -1 penalty."],
				"abbreviation": "", "variable": "ATR{0}{1}", "formula": "7", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "title": "Skills", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}{1}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job": {
				"name": "Job", "fieldName": "job", "title": "Jobs", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "JOB{0}{1}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role": {
				"name": "Role", "fieldName": "role", "title": "Roles", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "title": "Knowledge", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "KNW{0}{1}", "formula": "10", "modifiers": "_techBonus", "linkedGroups": 3, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language": {
				"name": "Language", "fieldName": "language", "title": "Language", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "LNG{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "title": "Lore", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "LOR{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "fieldName": "style", "title": "Styles", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "STY{0}{1}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "title": "Techniques", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "TCH{0}{1}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page Set": {
				"name": "Page Set", "fieldName": "pageSet", "title": "Page Set", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PGS{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page": {
				"name": "Page", "fieldName": "page", "title": "Page", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAG{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "title": "Defense", "group": "Type", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "variable": "DEF{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "title": "Sense", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SEN{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "title": "Affinity", "group": "Type", "subGroup": "", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity."],
				"abbreviation": "", "variable": "AFN{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "title": "Combat", "group": "Type", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "variable": "CMB{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "fieldName": "social", "title": "Social", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SOC{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "title": "Traits", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "TRA{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status": {
				"name": "Status", "fieldName": "status", "title": "Status", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "STS{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "title": "Condition", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "CND{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "title": "Max", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_max", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "title": "", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_true", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "title": "Rank", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_rank", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "title": "Build", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_build", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "title": "Filter", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_filter", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "title": "Expand", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_expand", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "title": "Tab", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_tab", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "title": "Page", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_page", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "title": "Exit", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_exit", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "title": "Finish", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_finish", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "title": "Origin", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_origin", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "title": "Learn", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_learn", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "title": "Points", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_pts", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "title": "Technique Bonus", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_tech", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "title": "Expertise Bonus", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_expertise", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "title": "Gear Bonus", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_gear", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "title": "Error", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_error", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "title": "Wood", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "wood", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "title": "Fire", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "fire", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "title": "Earth", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "earth", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "title": "Metal", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "metal", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "fieldName": "water", "title": "Water", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "water", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributeValueMediocre", "title": "Mediocre (+0)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "0", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributeValueGreat", "title": "Great (+3)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "3", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributeValueGood", "title": "Good (+2)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "2", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributeValueAverage", "title": "Average (+1)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "1", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributeValueBad", "title": "Bad (-1)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "-1", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Creator": {
				"name": "Character Creator", "fieldName": "characterCreator", "title": "Character Creator", "group": "PageSet", "subGroup": "", "descriptions": ["This is the Character Creator where you can create a new character. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, select Finish to populate your character. Alternatively, you can select Exit to do character creation at another time. This is not recommended.", "You can always return to this page from Options."],
				"abbreviation": "", "variable": "builder", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Core": {
				"name": "Core", "fieldName": "core", "title": "Core", "group": "PageSet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "core", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "title": "Advancement", "group": "PageSet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "advancement", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Training Page": {
				"name": "Training Page", "fieldName": "trainingPage", "title": "Training", "group": "PageSet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "training", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "title": "Origin", "group": "Page", "subGroup": "", "descriptions": ["This is the Character Origin Page. Here you will set your character's name, their primary element, and ancestry. There are also some prebuild options to allow you to quickly build a character by choosing a Background and Archetype. These are optional choices to help steer your character into specific directions. You are always able to ignore these and just take on character creation from scratch."],
				"abbreviation": "", "variable": "PAGorigin{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Basics": {
				"name": "Page_Basics", "fieldName": "basics", "title": "Basics", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGbasics{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "title": "Character", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGcharacter{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "title": "Overview", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGoverview{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "title": "Details", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGdetails{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "title": "Chat", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGchat{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "title": "Options", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGoptions{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "title": "Gear", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGgear{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Full Name": {
				"name": "Full Name", "fieldName": "fullName", "title": "Full Name", "group": "General", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "variable": "full_name", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "fieldName": "displayName", "title": "Display Name", "group": "General", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "variable": "display_name", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Level": {
				"name": "Level", "fieldName": "level", "title": "Character Level", "group": "General", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "variable": "level", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"XP": {
				"name": "XP", "fieldName": "xP", "title": "Experience", "group": "General", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "XP", "variable": "xp", "formula": "30", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Training": {
				"name": "Training", "fieldName": "training", "title": "Training", "group": "General", "subGroup": "", "descriptions": ["Training is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime for about a week."],
				"abbreviation": "", "variable": "training", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"CR": {
				"name": "CR", "fieldName": "cR", "title": "Character Rank", "group": "General", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level."],
				"abbreviation": "CR", "variable": "cr", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"HP": {
				"name": "HP", "fieldName": "hP", "title": "Hit Points", "group": "General", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "HP", "variable": "hp", "formula": "10;CR*10;Level;BOD*2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"WILL": {
				"name": "WILL", "fieldName": "wILL", "title": "Willpower", "group": "General", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "variable": "will", "formula": "10;CR*10;Level;CNV*2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"EN": {
				"name": "EN", "fieldName": "eN", "title": "Energy", "group": "General", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "variable": "en", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "title": "Initiative", "group": "General", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "variable": "initiative", "formula": "CR;QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carryingCapacity", "title": "Carrying Capacity", "group": "Gear", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "variable": "capacity", "formula": "40;BOD*20", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_BOD": {
				"name": "Attribute_BOD", "fieldName": "bOD", "title": "BOD", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRbod{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_PRC": {
				"name": "Attribute_PRC", "fieldName": "pRC", "title": "PRC", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRprc{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_QCK": {
				"name": "Attribute_QCK", "fieldName": "qCK", "title": "QCK", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRqck{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_CNV": {
				"name": "Attribute_CNV", "fieldName": "cNV", "title": "CNV", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRcnv{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_INT": {
				"name": "Attribute_INT", "fieldName": "iNT", "title": "INT", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRint{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_RSN": {
				"name": "Attribute_RSN", "fieldName": "rSN", "title": "RSN", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRrsn{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Brace": {
				"name": "Defense_Brace", "fieldName": "brace", "title": "Brace", "group": "Defense", "subGroup": "", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "variable": "DEFbrace{0}", "formula": "7;BOD", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Fortitude": {
				"name": "Defense_Fortitude", "fieldName": "fortitude", "title": "Fortitude", "group": "Defense", "subGroup": "", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "variable": "DEFfortitude{0}", "formula": "7;BOD", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Disruption": {
				"name": "Defense_Disruption", "fieldName": "disruption", "title": "Disruption", "group": "Defense", "subGroup": "", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "variable": "DEFdisruption{0}", "formula": "7;PRC", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Hide": {
				"name": "Defense_Hide", "fieldName": "hide", "title": "Hide", "group": "Defense", "subGroup": "", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "variable": "DEFhide{0}", "formula": "7;PRC", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Reflex": {
				"name": "Defense_Reflex", "fieldName": "reflex", "title": "Reflex", "group": "Defense", "subGroup": "", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "variable": "DEFreflex{0}", "formula": "7;QCK", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Evasion": {
				"name": "Defense_Evasion", "fieldName": "evasion", "title": "Evasion", "group": "Defense", "subGroup": "", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "variable": "DEFevasion{0}", "formula": "4;QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Insight": {
				"name": "Sense_Insight", "fieldName": "insight", "title": "Insight", "group": "Sense", "subGroup": "", "descriptions": ["Insight represents a character's ability to sense emotional state and sudden changes in behaviour. It is useful when detecting someone is trying to charm or deceive you. "],
				"abbreviation": "", "variable": "SENinsight{0}", "formula": "7;INT", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Notice": {
				"name": "Sense_Notice", "fieldName": "notice", "title": "Notice", "group": "Sense", "subGroup": "", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "variable": "SENnotice{0}", "formula": "7;INT", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Scrutiny": {
				"name": "Sense_Scrutiny", "fieldName": "scrutiny", "title": "Scrutiny", "group": "Sense", "subGroup": "", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning. It is often used in defense against another's attempts at lying and from being tripped up against a skilled negotiator. "],
				"abbreviation": "", "variable": "SENscrutiny{0}", "formula": "7;RSN", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Detect": {
				"name": "Sense_Detect", "fieldName": "detect", "title": "Detect", "group": "Sense", "subGroup": "", "descriptions": ["Detect is a character's ability to immediately analyze an effect or location for anything that is out of place or is not behaving normally. It is most often used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "variable": "SENdetect{0}", "formula": "7;RSN", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Resolve": {
				"name": "Sense_Resolve", "fieldName": "resolve", "title": "Resolve", "group": "Sense", "subGroup": "", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "variable": "SENresolve{0}", "formula": "7;CNV", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Freewill": {
				"name": "Sense_Freewill", "fieldName": "freewill", "title": "Freewill", "group": "Sense", "subGroup": "", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "variable": "SENfreewill{0}", "formula": "10;CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_HV": {
				"name": "Combat_HV", "fieldName": "hV", "title": "HV", "group": "Combat", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from healing abilities."],
				"abbreviation": "", "variable": "CMBhv{0}", "formula": "2;CR*2;CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Armor": {
				"name": "Combat_Armor", "fieldName": "armor", "title": "Armor", "group": "Combat", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "variable": "CMBarmor{0}", "formula": "0", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Durability": {
				"name": "Combat_Durability", "fieldName": "durability", "title": "Durability", "group": "Combat", "subGroup": "", "descriptions": ["Durability is the number of times a character can restore their HP back to full when their HP drops to 0."],
				"abbreviation": "", "variable": "CMBdurability{0}", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Surge": {
				"name": "Combat_Surge", "fieldName": "surge", "title": "Surge", "group": "Combat", "subGroup": "", "descriptions": ["Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "variable": "CMBsurge{0}", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Chakra": {
				"name": "Combat_Chakra", "fieldName": "chakra", "title": "Chakra", "group": "Combat", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "variable": "CMBchakra{0}", "formula": "3;CR", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "title": "", "group": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Speed": {
				"name": "Combat_Move Speed", "fieldName": "moveSpeed", "title": "Move Speed", "group": "Combat", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they make a standard move."],
				"abbreviation": "", "variable": "CMBmoveSpeed{0}", "formula": "3", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Potency": {
				"name": "Combat_Move Potency", "fieldName": "movePotency", "title": "Move Potency", "group": "Combat", "subGroup": "", "descriptions": ["At the start of a combat round this value is rolled to determine the number of spaces the character may move. If the value is less than their move speed, the value becomes equal to their move speed. "],
				"abbreviation": "", "variable": "CMBmovePotency{0}", "formula": "6", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Approval": {
				"name": "Social_Approval", "fieldName": "approval", "title": "Approval", "group": "Social", "subGroup": "", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "variable": "SOCapproval{0}", "formula": "10;CR*10;Level;CNV*2", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Patience": {
				"name": "Social_Patience", "fieldName": "patience", "title": "Patience", "group": "Social", "subGroup": "", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "variable": "SOCpatience{0}", "formula": "CR*10;", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "title": "Accurate", "group": "Trait", "subGroup": "", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "variable": "TRAaccurate{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "title": "Affinity", "group": "Trait", "subGroup": "", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "variable": "TRAaffinity{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "title": "Affinity+", "group": "Trait", "subGroup": "", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "variable": "TRAaffinity+{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "aP", "title": "AP", "group": "Trait", "subGroup": "", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "variable": "TRAaP{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "title": "Brutal", "group": "Trait", "subGroup": "", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "variable": "TRAbrutal{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "title": "Focus", "group": "Trait", "subGroup": "", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "variable": "TRAfocus{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "title": "Focus+", "group": "Trait", "subGroup": "", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "variable": "TRAfocus+{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "title": "Material", "group": "Trait", "subGroup": "", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "variable": "TRAmaterial{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "title": "Simple", "group": "Trait", "subGroup": "", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "variable": "TRAsimple{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "title": "Volatile", "group": "Trait", "subGroup": "", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "variable": "TRAvolatile{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "title": "Vortex", "group": "Trait", "subGroup": "", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "variable": "TRAvortex{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "title": "Weapon", "group": "Trait", "subGroup": "", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "variable": "TRAweapon{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "title": "Wall", "group": "Trait", "subGroup": "", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "variable": "TRAwall{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "title": "Arcing", "group": "Trait", "subGroup": "", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "variable": "TRAarcing{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "title": "Shield", "group": "Trait", "subGroup": "", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "variable": "TRAshield{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "title": "Thrown", "group": "Trait", "subGroup": "", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "variable": "TRAthrown{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-Handed", "title": "Two-Handed", "group": "Trait", "subGroup": "", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "variable": "TRAtwo-Handed{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "title": "Loud", "group": "Trait", "subGroup": "", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "variable": "TRAloud{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "title": "Flammable", "group": "Trait", "subGroup": "", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "variable": "TRAflammable{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "title": "Flexible", "group": "Trait", "subGroup": "", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "variable": "TRAflexible{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "title": "Frozen", "group": "Trait", "subGroup": "", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "variable": "TRAfrozen{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "title": "Sharp", "group": "Trait", "subGroup": "", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "variable": "TRAsharp{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "title": "Sturdy", "group": "Trait", "subGroup": "", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "variable": "TRAsturdy{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "title": "Transparent", "group": "Trait", "subGroup": "", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "variable": "TRAtransparent{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Downed": {
				"name": "Status_Downed", "fieldName": "downed", "title": "Downed", "group": "Status", "subGroup": "", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "variable": "STSdowned{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Engaged": {
				"name": "Status_Engaged", "fieldName": "engaged", "title": "Engaged", "group": "Status", "subGroup": "", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "variable": "STSengaged{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Ethereal": {
				"name": "Status_Ethereal", "fieldName": "ethereal", "title": "Ethereal", "group": "Status", "subGroup": "", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "variable": "STSethereal{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Grappled": {
				"name": "Status_Grappled", "fieldName": "grappled", "title": "Grappled", "group": "Status", "subGroup": "", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "variable": "STSgrappled{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Hidden": {
				"name": "Status_Hidden", "fieldName": "hidden", "title": "Hidden", "group": "Status", "subGroup": "", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "variable": "STShidden{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Initiative Penalty": {
				"name": "Status_Initiative Penalty", "fieldName": "initiativePenalty", "title": "Initiative Penalty", "group": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "STSinitiativePenalty{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Invisible": {
				"name": "Status_Invisible", "fieldName": "invisible", "title": "Invisible", "group": "Status", "subGroup": "", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "variable": "STSinvisible{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Restrained": {
				"name": "Status_Restrained", "fieldName": "restrained", "title": "Restrained", "group": "Status", "subGroup": "", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "variable": "STSrestrained{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Unconscious": {
				"name": "Status_Unconscious", "fieldName": "unconscious", "title": "Unconscious", "group": "Status", "subGroup": "", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "variable": "STSunconscious{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Aflame": {
				"name": "Condition_Aflame", "fieldName": "aflame", "title": "Aflame", "group": "Condition", "subGroup": "", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "variable": "CNDaflame{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Angered": {
				"name": "Condition_Angered", "fieldName": "angered", "title": "Angered", "group": "Condition", "subGroup": "", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "variable": "CNDangered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Chilled": {
				"name": "Condition_Chilled", "fieldName": "chilled", "title": "Chilled", "group": "Condition", "subGroup": "", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "variable": "CNDchilled{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Delayed": {
				"name": "Condition_Delayed", "fieldName": "delayed", "title": "Delayed", "group": "Condition", "subGroup": "", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "variable": "CNDdelayed{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Disgusted": {
				"name": "Condition_Disgusted", "fieldName": "disgusted", "title": "Disgusted", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDdisgusted{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Dying": {
				"name": "Condition_Dying", "fieldName": "dying", "title": "Dying", "group": "Condition", "subGroup": "", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "variable": "CNDdying{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Empowered": {
				"name": "Condition_Empowered", "fieldName": "empowered", "title": "Empowered", "group": "Condition", "subGroup": "", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "variable": "CNDempowered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encouraged": {
				"name": "Condition_Encouraged", "fieldName": "encouraged", "title": "Encouraged", "group": "Condition", "subGroup": "", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "variable": "CNDencouraged{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encumbered": {
				"name": "Condition_Encumbered", "fieldName": "encumbered", "title": "Encumbered", "group": "Condition", "subGroup": "", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "variable": "CNDencumbered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Frightened": {
				"name": "Condition_Frightened", "fieldName": "frightened", "title": "Frightened", "group": "Condition", "subGroup": "", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "variable": "CNDfrightened{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Hasted": {
				"name": "Condition_Hasted", "fieldName": "hasted", "title": "Hasted", "group": "Condition", "subGroup": "", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "variable": "CNDhasted{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Immobilized": {
				"name": "Condition_Immobilized", "fieldName": "immobilized", "title": "Immobilized", "group": "Condition", "subGroup": "", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "variable": "CNDimmobilized{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Impaired": {
				"name": "Condition_Impaired", "fieldName": "impaired", "title": "Impaired", "group": "Condition", "subGroup": "", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "variable": "CNDimpaired{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Joyful": {
				"name": "Condition_Joyful", "fieldName": "joyful", "title": "Joyful", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDjoyful{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Launched": {
				"name": "Condition_Launched", "fieldName": "launched", "title": "Launched", "group": "Condition", "subGroup": "", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "variable": "CNDlaunched{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Paralyzed": {
				"name": "Condition_Paralyzed", "fieldName": "paralyzed", "title": "Paralyzed", "group": "Condition", "subGroup": "", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "variable": "CNDparalyzed{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Prone": {
				"name": "Condition_Prone", "fieldName": "prone", "title": "Prone", "group": "Condition", "subGroup": "", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "variable": "CNDprone{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Saddened": {
				"name": "Condition_Saddened", "fieldName": "saddened", "title": "Saddened", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDsaddened{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Sickened": {
				"name": "Condition_Sickened", "fieldName": "sickened", "title": "Sickened", "group": "Condition", "subGroup": "", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "variable": "CNDsickened{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Staggered": {
				"name": "Condition_Staggered", "fieldName": "staggered", "title": "Staggered", "group": "Condition", "subGroup": "", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "variable": "CNDstaggered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Stunned": {
				"name": "Condition_Stunned", "fieldName": "stunned", "title": "Stunned", "group": "Condition", "subGroup": "", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "variable": "CNDstunned{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Surprised": {
				"name": "Condition_Surprised", "fieldName": "surprised", "title": "Surprised", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDsurprised{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Basic Set": {
				"name": "Style_Basic Set", "fieldName": "basicSet", "title": "Basic Set", "group": "Style", "subGroup": "", "descriptions": ["A standard list of techniques. Anyone can perform these techniques. "],
				"abbreviation": "", "variable": "STY{0}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "swordplay", "title": "Swordplay", "group": "Style", "subGroup": "", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "variable": "STY{0}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "kiExtension", "title": "Ki Extension", "group": "Style", "subGroup": "", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "variable": "STY{0}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "title": "Acrobatics", "group": "Skill", "subGroup": "", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "title": "Agility", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "title": "Analyze", "group": "Skill", "subGroup": "", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "title": "Build", "group": "Skill", "subGroup": "", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "title": "Channel", "group": "Skill", "subGroup": "", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "title": "Charm", "group": "Skill", "subGroup": "", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "title": "Command", "group": "Skill", "subGroup": "", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "title": "Concoct", "group": "Skill", "subGroup": "", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "title": "Cook", "group": "Skill", "subGroup": "", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "title": "Deception", "group": "Skill", "subGroup": "", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "title": "Disguise", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "title": "Empathy", "group": "Skill", "subGroup": "", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "title": "Enchant", "group": "Skill", "subGroup": "", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "title": "Finesse", "group": "Skill", "subGroup": "", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "title": "Flexibility", "group": "Skill", "subGroup": "", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "title": "Grappling", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "title": "Heal", "group": "Skill", "subGroup": "", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "title": "Intimidation", "group": "Skill", "subGroup": "", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "title": "Leadership", "group": "Skill", "subGroup": "", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "title": "Maneuver", "group": "Skill", "subGroup": "", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "title": "Medicine", "group": "Skill", "subGroup": "", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "title": "Might", "group": "Skill", "subGroup": "", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "title": "Negotiation", "group": "Skill", "subGroup": "", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "title": "Palming", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "title": "Physique", "group": "Skill", "subGroup": "", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "title": "Pilot", "group": "Skill", "subGroup": "", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "title": "Resonance", "group": "Skill", "subGroup": "", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "title": "Search", "group": "Skill", "subGroup": "", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "title": "Shoot", "group": "Skill", "subGroup": "", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "title": "Skirmish", "group": "Skill", "subGroup": "", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "title": "Sneak", "group": "Skill", "subGroup": "", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "title": "Survival", "group": "Skill", "subGroup": "", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "title": "Throw", "group": "Skill", "subGroup": "", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "title": "Tinker", "group": "Skill", "subGroup": "", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "title": "Traversal", "group": "Skill", "subGroup": "", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Minere": {
				"name": "Language_Minere", "fieldName": "minere", "title": "Minere", "group": "Language", "subGroup": "", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Junal": {
				"name": "Language_Junal", "fieldName": "junal", "title": "Junal", "group": "Language", "subGroup": "", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Apollen": {
				"name": "Language_Apollen", "fieldName": "apollen", "title": "Apollen", "group": "Language", "subGroup": "", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Lib": {
				"name": "Language_Lib", "fieldName": "lib", "title": "Lib", "group": "Language", "subGroup": "", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Cert": {
				"name": "Language_Cert", "fieldName": "cert", "title": "Cert", "group": "Language", "subGroup": "", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Byric": {
				"name": "Language_Byric", "fieldName": "byric", "title": "Byric", "group": "Language", "subGroup": "", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Dustell": {
				"name": "Language_Dustell", "fieldName": "dustell", "title": "Dustell", "group": "Language", "subGroup": "", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Muralic": {
				"name": "Language_Muralic", "fieldName": "muralic", "title": "Muralic", "group": "Language", "subGroup": "", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shira": {
				"name": "Language_Shira", "fieldName": "shira", "title": "Shira", "group": "Language", "subGroup": "", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Ciel": {
				"name": "Language_Ciel", "fieldName": "ciel", "title": "Ciel", "group": "Language", "subGroup": "", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Citeq": {
				"name": "Language_Citeq", "fieldName": "citeq", "title": "Citeq", "group": "Language", "subGroup": "", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Manstan": {
				"name": "Language_Manstan", "fieldName": "manstan", "title": "Manstan", "group": "Language", "subGroup": "", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Salkan": {
				"name": "Language_Salkan", "fieldName": "salkan", "title": "Salkan", "group": "Language", "subGroup": "", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Sansic": {
				"name": "Language_Sansic", "fieldName": "sansic", "title": "Sansic", "group": "Language", "subGroup": "", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Silq": {
				"name": "Language_Silq", "fieldName": "silq", "title": "Silq", "group": "Language", "subGroup": "", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Kleikan": {
				"name": "Language_Kleikan", "fieldName": "kleikan", "title": "Kleikan", "group": "Language", "subGroup": "", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Crinere": {
				"name": "Language_Crinere", "fieldName": "crinere", "title": "Crinere", "group": "Language", "subGroup": "", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Palmic": {
				"name": "Language_Palmic", "fieldName": "palmic", "title": "Palmic", "group": "Language", "subGroup": "", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shorespeak": {
				"name": "Language_Shorespeak", "fieldName": "shorespeak", "title": "Shorespeak", "group": "Language", "subGroup": "", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Verdeni": {
				"name": "Language_Verdeni", "fieldName": "verdeni", "title": "Verdeni", "group": "Language", "subGroup": "", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Vulca": {
				"name": "Language_Vulca", "fieldName": "vulca", "title": "Vulca", "group": "Language", "subGroup": "", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Emotion": {
				"name": "Language_Emotion", "fieldName": "emotion", "title": "Emotion", "group": "Language", "subGroup": "", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Empathy": {
				"name": "Language_Empathy", "fieldName": "empathy", "title": "Empathy", "group": "Language", "subGroup": "", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Wolfwarg": {
				"name": "Language_Wolfwarg", "fieldName": "wolfwarg", "title": "Wolfwarg", "group": "Language", "subGroup": "", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Jovean": {
				"name": "Language_Jovean", "fieldName": "jovean", "title": "Jovean", "group": "Language", "subGroup": "", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Mytikan": {
				"name": "Language_Mytikan", "fieldName": "mytikan", "title": "Mytikan", "group": "Language", "subGroup": "", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Academics": {
				"name": "Lore_Academics", "fieldName": "academics", "title": "Academics", "group": "Lore", "subGroup": "", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "title": "Health", "group": "Lore", "subGroup": "", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "title": "Mana", "group": "Lore", "subGroup": "", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "title": "Mathematics", "group": "Lore", "subGroup": "", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "title": "Nature", "group": "Lore", "subGroup": "", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "title": "School", "group": "Lore", "subGroup": "", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "title": "Spirit", "group": "Lore", "subGroup": "", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "title": "Warfare", "group": "Lore", "subGroup": "", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "title": "Zoology", "group": "Lore", "subGroup": "", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Profession": {
				"name": "Lore_Profession", "fieldName": "profession", "title": "Profession", "group": "Lore", "subGroup": "", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "title": "Farming", "group": "Lore", "subGroup": "", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "title": "Fishing", "group": "Lore", "subGroup": "", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "title": "Hunting", "group": "Lore", "subGroup": "", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "title": "Legal", "group": "Lore", "subGroup": "", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "title": "Mercantile", "group": "Lore", "subGroup": "", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "title": "Mining", "group": "Lore", "subGroup": "", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Craftmanship": {
				"name": "Lore_Craftmanship", "fieldName": "craftmanship", "title": "Craftmanship", "group": "Lore", "subGroup": "", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "title": "Alchemy", "group": "Lore", "subGroup": "", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "title": "Architecture", "group": "Lore", "subGroup": "", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "title": "Brewing", "group": "Lore", "subGroup": "", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "title": "Cooking", "group": "Lore", "subGroup": "", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "title": "Engineering", "group": "Lore", "subGroup": "", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "title": "Glassblowing", "group": "Lore", "subGroup": "", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "title": "Leatherworking", "group": "Lore", "subGroup": "", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "title": "Sculpting", "group": "Lore", "subGroup": "", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "title": "Smithing", "group": "Lore", "subGroup": "", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "title": "Weaving", "group": "Lore", "subGroup": "", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Geography": {
				"name": "Lore_Geography", "fieldName": "geography", "title": "Geography", "group": "Lore", "subGroup": "", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "title": "Aridsha", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "title": "Ceres", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "title": "Colswei", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "title": "Khem", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "title": "Novus", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "title": "Walthair", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "title": "Wayling", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "etherealPlane", "title": "Ethereal Plane", "group": "Lore", "subGroup": "", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_History": {
				"name": "Lore_History", "fieldName": "history", "title": "History", "group": "Lore", "subGroup": "", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridshaHistory", "title": "Aridsha History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceresHistory", "title": "Ceres History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colsweiHistory", "title": "Colswei History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khemHistory", "title": "Khem History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novusHistory", "title": "Novus History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthairHistory", "title": "Walthair History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "waylingHistory", "title": "Wayling History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Culture": {
				"name": "Lore_Culture", "fieldName": "culture", "title": "Culture", "group": "Lore", "subGroup": "", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "title": "Art", "group": "Lore", "subGroup": "", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "title": "Etiquette", "group": "Lore", "subGroup": "", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "title": "Fashion", "group": "Lore", "subGroup": "", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "title": "Games", "group": "Lore", "subGroup": "", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "title": "Music", "group": "Lore", "subGroup": "", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "title": "Scribing", "group": "Lore", "subGroup": "", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "title": "Theater", "group": "Lore", "subGroup": "", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Religion": {
				"name": "Lore_Religion", "fieldName": "religion", "title": "Religion", "group": "Lore", "subGroup": "", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "churchOfKongkwei", "title": "Church of Kongkwei", "group": "Lore", "subGroup": "", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "title": "Guidance", "group": "Lore", "subGroup": "", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life'sCircle", "title": "Life's Circle", "group": "Lore", "subGroup": "", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "oceanCourt", "title": "Ocean Court", "group": "Lore", "subGroup": "", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "title": "Sylvan", "group": "Lore", "subGroup": "", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "title": "Zushaon", "group": "Lore", "subGroup": "", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Trainee": {
				"name": "Job_Trainee", "fieldName": "trainee", "title": "Trainee", "group": "Job", "subGroup": "", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "interceptor", "title": "Interceptor", "group": "Job", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "guardian", "title": "Guardian", "group": "Job", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "spellslinger", "title": "Spellslinger", "group": "Job", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "warrior", "title": "Warrior", "group": "Job", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "rogue", "title": "Rogue", "group": "Job", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "scholar", "title": "Scholar", "group": "Job", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "physician", "title": "Physician", "group": "Job", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Generalist": {
				"name": "Role_Generalist", "fieldName": "generalist", "title": "Generalist", "group": "Role", "subGroup": "", "descriptions": ["Very general"],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Defender": {
				"name": "Role_Defender", "fieldName": "defender", "title": "Defender", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Athlete": {
				"name": "Role_Athlete", "fieldName": "athlete", "title": "Athlete", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Skirmisher": {
				"name": "Role_Skirmisher", "fieldName": "skirmisher", "title": "Skirmisher", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Marksman": {
				"name": "Role_Marksman", "fieldName": "marksman", "title": "Marksman", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Break Free": {
				"name": "Technique_Break Free", "fieldName": "breakFree", "title": "Break Free", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dash": {
				"name": "Technique_Dash", "fieldName": "dash", "title": "Dash", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Escape": {
				"name": "Technique_Escape", "fieldName": "escape", "title": "Escape", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grapple": {
				"name": "Technique_Grapple", "fieldName": "grapple", "title": "Grapple", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hide": {
				"name": "Technique_Hide", "fieldName": "hide", "title": "Hide", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Mount": {
				"name": "Technique_Mount", "fieldName": "mount", "title": "Mount", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prepare": {
				"name": "Technique_Prepare", "fieldName": "prepare", "title": "Prepare", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Reposition": {
				"name": "Technique_Reposition", "fieldName": "reposition", "title": "Reposition", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Seach": {
				"name": "Technique_Seach", "fieldName": "seach", "title": "Seach", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aid": {
				"name": "Technique_Aid", "fieldName": "aid", "title": "Aid", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Encourage": {
				"name": "Technique_Encourage", "fieldName": "encourage", "title": "Encourage", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stabilize": {
				"name": "Technique_Stabilize", "fieldName": "stabilize", "title": "Stabilize", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skill Check": {
				"name": "Technique_Skill Check", "fieldName": "skillCheck", "title": "Skill Check", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Rapport": {
				"name": "Technique_Build Rapport", "fieldName": "buildRapport", "title": "Build Rapport", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Pressure": {
				"name": "Technique_Build Pressure", "fieldName": "buildPressure", "title": "Build Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Captivate": {
				"name": "Technique_Captivate", "fieldName": "captivate", "title": "Captivate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demand": {
				"name": "Technique_Demand", "fieldName": "demand", "title": "Demand", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grab an Edge": {
				"name": "Technique_Grab an Edge", "fieldName": "grabAnEdge", "title": "Grab an Edge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Interact": {
				"name": "Technique_Interact", "fieldName": "interact", "title": "Interact", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Wind": {
				"name": "Technique_Second Wind", "fieldName": "secondWind", "title": "Second Wind", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Breath": {
				"name": "Technique_Second Breath", "fieldName": "secondBreath", "title": "Second Breath", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undaunted": {
				"name": "Technique_Undaunted", "fieldName": "undaunted", "title": "Undaunted", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Strike": {
				"name": "Technique_Preemptive Strike", "fieldName": "preemptiveStrike", "title": "Preemptive Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Stagger": {
				"name": "Technique_Preemptive Stagger", "fieldName": "preemptiveStagger", "title": "Preemptive Stagger", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Critical Maim": {
				"name": "Technique_Critical Maim", "fieldName": "criticalMaim", "title": "Critical Maim", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellshot": {
				"name": "Technique_Spellshot", "fieldName": "spellshot", "title": "Spellshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Follow-Up Spellshot": {
				"name": "Technique_Follow-Up Spellshot", "fieldName": "follow-UpSpellshot", "title": "Follow-Up Spellshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bursting Spellshot": {
				"name": "Technique_Bursting Spellshot", "fieldName": "burstingSpellshot", "title": "Bursting Spellshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior": {
				"name": "Technique_Savior", "fieldName": "savior", "title": "Savior", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knock Away Savior": {
				"name": "Technique_Knock Away Savior", "fieldName": "knockAwaySavior", "title": "Knock Away Savior", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior's Retaliation": {
				"name": "Technique_Savior's Retaliation", "fieldName": "savior'sRetaliation", "title": "Savior's Retaliation", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellstrike": {
				"name": "Technique_Spellstrike", "fieldName": "spellstrike", "title": "Spellstrike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Skirmish": {
				"name": "Technique_Power Skirmish", "fieldName": "powerSkirmish", "title": "Power Skirmish", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneak Attack": {
				"name": "Technique_Sneak Attack", "fieldName": "sneakAttack", "title": "Sneak Attack", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneaky Follow-Up": {
				"name": "Technique_Sneaky Follow-Up", "fieldName": "sneakyFollow-Up", "title": "Sneaky Follow-Up", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Assassinate": {
				"name": "Technique_Assassinate", "fieldName": "assassinate", "title": "Assassinate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Emergency Care": {
				"name": "Technique_Emergency Care", "fieldName": "emergencyCare", "title": "Emergency Care", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightingale": {
				"name": "Technique_Nightingale", "fieldName": "nightingale", "title": "Nightingale", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Rhapsody": {
				"name": "Technique_Rhapsody", "fieldName": "rhapsody", "title": "Rhapsody", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Metamagic": {
				"name": "Technique_Metamagic", "fieldName": "metamagic", "title": "Metamagic", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Strategize": {
				"name": "Technique_Strategize", "fieldName": "strategize", "title": "Strategize", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Foresight": {
				"name": "Technique_Foresight", "fieldName": "foresight", "title": "Foresight", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Saw That Coming": {
				"name": "Technique_Saw That Coming", "fieldName": "sawThatComing", "title": "Saw That Coming", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_As You May Recall": {
				"name": "Technique_As You May Recall", "fieldName": "asYouMayRecall", "title": "As You May Recall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Generalist": {
				"name": "Technique_Generalist", "fieldName": "generalist", "title": "Generalist", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender": {
				"name": "Technique_Defender", "fieldName": "defender", "title": "Defender", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender II": {
				"name": "Technique_Defender II", "fieldName": "defenderII", "title": "Defender II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Will": {
				"name": "Technique_Defender's Will", "fieldName": "defender'sWill", "title": "Defender's Will", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Taunt": {
				"name": "Technique_Defender's Taunt", "fieldName": "defender'sTaunt", "title": "Defender's Taunt", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Recovery": {
				"name": "Technique_Defender's Recovery", "fieldName": "defender'sRecovery", "title": "Defender's Recovery", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher": {
				"name": "Technique_Skirmisher", "fieldName": "skirmisher", "title": "Skirmisher", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher II": {
				"name": "Technique_Skirmisher II", "fieldName": "skirmisherII", "title": "Skirmisher II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Step": {
				"name": "Technique_Skirmisher's Step", "fieldName": "skirmisher'sStep", "title": "Skirmisher's Step", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Strike": {
				"name": "Technique_Skirmisher's Strike", "fieldName": "skirmisher'sStrike", "title": "Skirmisher's Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman": {
				"name": "Technique_Marksman", "fieldName": "marksman", "title": "Marksman", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman II": {
				"name": "Technique_Marksman II", "fieldName": "marksmanII", "title": "Marksman II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Longshot": {
				"name": "Technique_Marksman's Longshot", "fieldName": "marksman'sLongshot", "title": "Marksman's Longshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Sight": {
				"name": "Technique_Marksman's Sight", "fieldName": "marksman'sSight", "title": "Marksman's Sight", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Strike": {
				"name": "Technique_Marksman's Strike", "fieldName": "marksman'sStrike", "title": "Marksman's Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete": {
				"name": "Technique_Athlete", "fieldName": "athlete", "title": "Athlete", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete II": {
				"name": "Technique_Athlete II", "fieldName": "athleteII", "title": "Athlete II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete's Sprint": {
				"name": "Technique_Athlete's Sprint", "fieldName": "athlete'sSprint", "title": "Athlete's Sprint", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": []
				,
				"formulaCalculations": []
			},
			"Technique_Athlete's Reach": {
				"name": "Technique_Athlete's Reach", "fieldName": "athlete'sReach", "title": "Athlete's Reach", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bounding Sprint": {
				"name": "Technique_Bounding Sprint", "fieldName": "boundingSprint", "title": "Bounding Sprint", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Away": {
				"name": "Technique_Skulk Away", "fieldName": "skulkAway", "title": "Skulk Away", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Then Hide": {
				"name": "Technique_Skulk Then Hide", "fieldName": "skulkThenHide", "title": "Skulk Then Hide", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_First Aid": {
				"name": "Technique_First Aid", "fieldName": "firstAid", "title": "First Aid", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleansing Aid": {
				"name": "Technique_Cleansing Aid", "fieldName": "cleansingAid", "title": "Cleansing Aid", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Environmental Awareness": {
				"name": "Technique_Environmental Awareness", "fieldName": "environmentalAwareness", "title": "Environmental Awareness", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Eclectic Knowledge": {
				"name": "Technique_Eclectic Knowledge", "fieldName": "eclecticKnowledge", "title": "Eclectic Knowledge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Point of Clarity": {
				"name": "Technique_Point of Clarity", "fieldName": "pointOfClarity", "title": "Point of Clarity", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pole Vault": {
				"name": "Technique_Pole Vault", "fieldName": "poleVault", "title": "Pole Vault", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Draw": {
				"name": "Technique_Quick Draw", "fieldName": "quickDraw", "title": "Quick Draw", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike": {
				"name": "Technique_Extension Strike", "fieldName": "extensionStrike", "title": "Extension Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Step Extension": {
				"name": "Technique_Step Extension", "fieldName": "stepExtension", "title": "Step Extension", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Extension": {
				"name": "Technique_Lasting Extension", "fieldName": "lastingExtension", "title": "Lasting Extension", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Far Strike": {
				"name": "Technique_Far Strike", "fieldName": "farStrike", "title": "Far Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike +": {
				"name": "Technique_Extension Strike +", "fieldName": "extensionStrike+", "title": "Extension Strike +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defense Piercer ": {
				"name": "Technique_Defense Piercer ", "fieldName": "defensePiercer", "title": "Defense Piercer ", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash": {
				"name": "Technique_Quick Slash", "fieldName": "quickSlash", "title": "Quick Slash", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Precision Blade": {
				"name": "Technique_Precision Blade", "fieldName": "precisionBlade", "title": "Precision Blade", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Armor Piercer": {
				"name": "Technique_Armor Piercer", "fieldName": "armorPiercer", "title": "Armor Piercer", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash II": {
				"name": "Technique_Quick Slash II", "fieldName": "quickSlashII", "title": "Quick Slash II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave": {
				"name": "Technique_Cleave", "fieldName": "cleave", "title": "Cleave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crushing Blade": {
				"name": "Technique_Crushing Blade", "fieldName": "crushingBlade", "title": "Crushing Blade", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave": {
				"name": "Technique_Great Cleave", "fieldName": "greatCleave", "title": "Great Cleave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave +": {
				"name": "Technique_Cleave +", "fieldName": "cleave+", "title": "Cleave +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sudden Cleave": {
				"name": "Technique_Sudden Cleave", "fieldName": "suddenCleave", "title": "Sudden Cleave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave II": {
				"name": "Technique_Great Cleave II", "fieldName": "greatCleaveII", "title": "Great Cleave II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Flex": {
				"name": "Technique_Power Flex", "fieldName": "powerFlex", "title": "Power Flex", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crush Knuckle": {
				"name": "Technique_Crush Knuckle", "fieldName": "crushKnuckle", "title": "Crush Knuckle", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Impact Knuckle": {
				"name": "Technique_Impact Knuckle", "fieldName": "impactKnuckle", "title": "Impact Knuckle", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knuckle Flurry": {
				"name": "Technique_Knuckle Flurry", "fieldName": "knuckleFlurry", "title": "Knuckle Flurry", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Water Blast": {
				"name": "Technique_Water Blast", "fieldName": "waterBlast", "title": "Water Blast", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser": {
				"name": "Technique_Geyser", "fieldName": "geyser", "title": "Geyser", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser Line": {
				"name": "Technique_Geyser Line", "fieldName": "geyserLine", "title": "Geyser Line", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surf": {
				"name": "Technique_Surf", "fieldName": "surf", "title": "Surf", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Geyser Line": {
				"name": "Technique_Great Geyser Line", "fieldName": "greatGeyserLine", "title": "Great Geyser Line", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tidal Wave": {
				"name": "Technique_Tidal Wave", "fieldName": "tidalWave", "title": "Tidal Wave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Surge": {
				"name": "Technique_Sand Surge", "fieldName": "sandSurge", "title": "Sand Surge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Spout": {
				"name": "Technique_Sand Spout", "fieldName": "sandSpout", "title": "Sand Spout", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Wave": {
				"name": "Technique_Sand Wave", "fieldName": "sandWave", "title": "Sand Wave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Launcher": {
				"name": "Technique_Sand Launcher", "fieldName": "sandLauncher", "title": "Sand Launcher", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sicken": {
				"name": "Technique_Sicken", "fieldName": "sicken", "title": "Sicken", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spores": {
				"name": "Technique_Spores", "fieldName": "spores", "title": "Spores", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sickening Cloud": {
				"name": "Technique_Sickening Cloud", "fieldName": "sickeningCloud", "title": "Sickening Cloud", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Virulent Spores": {
				"name": "Technique_Virulent Spores", "fieldName": "virulentSpores", "title": "Virulent Spores", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Firebolt": {
				"name": "Technique_Firebolt", "fieldName": "firebolt", "title": "Firebolt", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flame Arrow": {
				"name": "Technique_Flame Arrow", "fieldName": "flameArrow", "title": "Flame Arrow", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireball": {
				"name": "Technique_Fireball", "fieldName": "fireball", "title": "Fireball", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireblast": {
				"name": "Technique_Fireblast", "fieldName": "fireblast", "title": "Fireblast", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ragnarok": {
				"name": "Technique_Ragnarok", "fieldName": "ragnarok", "title": "Ragnarok", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bonfire": {
				"name": "Technique_Bonfire", "fieldName": "bonfire", "title": "Bonfire", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wall of Fire": {
				"name": "Technique_Wall of Fire", "fieldName": "wallOfFire", "title": "Wall of Fire", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field of Flame": {
				"name": "Technique_Field of Flame", "fieldName": "fieldOfFlame", "title": "Field of Flame", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Shaft": {
				"name": "Technique_Lightning Shaft", "fieldName": "lightningShaft", "title": "Lightning Shaft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shock": {
				"name": "Technique_Shock", "fieldName": "shock", "title": "Shock", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Bolt": {
				"name": "Technique_Lightning Bolt", "fieldName": "lightningBolt", "title": "Lightning Bolt", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Plasma Arc": {
				"name": "Technique_Plasma Arc", "fieldName": "plasmaArc", "title": "Plasma Arc", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fulgor": {
				"name": "Technique_Fulgor", "fieldName": "fulgor", "title": "Fulgor", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Snap": {
				"name": "Technique_Cold Snap", "fieldName": "coldSnap", "title": "Cold Snap", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Frostbite": {
				"name": "Technique_Frostbite", "fieldName": "frostbite", "title": "Frostbite", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezebind": {
				"name": "Technique_Freezebind", "fieldName": "freezebind", "title": "Freezebind", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Burst": {
				"name": "Technique_Cold Burst", "fieldName": "coldBurst", "title": "Cold Burst", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Front": {
				"name": "Technique_Cold Front", "fieldName": "coldFront", "title": "Cold Front", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Diamond Dust": {
				"name": "Technique_Diamond Dust", "fieldName": "diamondDust", "title": "Diamond Dust", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Bullet": {
				"name": "Technique_Wind Bullet", "fieldName": "windBullet", "title": "Wind Bullet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gust": {
				"name": "Technique_Gust", "fieldName": "gust", "title": "Gust", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Windsweep": {
				"name": "Technique_Windsweep", "fieldName": "windsweep", "title": "Windsweep", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gale": {
				"name": "Technique_Gale", "fieldName": "gale", "title": "Gale", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Darkness": {
				"name": "Technique_Darkness", "fieldName": "darkness", "title": "Darkness", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Wall": {
				"name": "Technique_Shadow Wall", "fieldName": "shadowWall", "title": "Shadow Wall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightfall": {
				"name": "Technique_Nightfall", "fieldName": "nightfall", "title": "Nightfall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fog Cloud": {
				"name": "Technique_Fog Cloud", "fieldName": "fogCloud", "title": "Fog Cloud", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sleet": {
				"name": "Technique_Sleet", "fieldName": "sleet", "title": "Sleet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezing Sleet": {
				"name": "Technique_Freezing Sleet", "fieldName": "freezingSleet", "title": "Freezing Sleet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hail": {
				"name": "Technique_Hail", "fieldName": "hail", "title": "Hail", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Binding Sleet": {
				"name": "Technique_Binding Sleet", "fieldName": "bindingSleet", "title": "Binding Sleet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ice Storm": {
				"name": "Technique_Ice Storm", "fieldName": "iceStorm", "title": "Ice Storm", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fimbulwinter": {
				"name": "Technique_Fimbulwinter", "fieldName": "fimbulwinter", "title": "Fimbulwinter", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Smoke Cloud": {
				"name": "Technique_Smoke Cloud", "fieldName": "smokeCloud", "title": "Smoke Cloud", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burning Smoke": {
				"name": "Technique_Burning Smoke", "fieldName": "burningSmoke", "title": "Burning Smoke", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Choking Smoke": {
				"name": "Technique_Choking Smoke", "fieldName": "chokingSmoke", "title": "Choking Smoke", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Acceleration": {
				"name": "Technique_Acceleration", "fieldName": "acceleration", "title": "Acceleration", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Vault": {
				"name": "Technique_Power Vault", "fieldName": "powerVault", "title": "Power Vault", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Expeditious": {
				"name": "Technique_Expeditious", "fieldName": "expeditious", "title": "Expeditious", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Climb": {
				"name": "Technique_Quick Climb", "fieldName": "quickClimb", "title": "Quick Climb", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Swim": {
				"name": "Technique_Quick Swim", "fieldName": "quickSwim", "title": "Quick Swim", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Poise": {
				"name": "Technique_Poise", "fieldName": "poise", "title": "Poise", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cat Fall": {
				"name": "Technique_Cat Fall", "fieldName": "catFall", "title": "Cat Fall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kip Up": {
				"name": "Technique_Kip Up", "fieldName": "kipUp", "title": "Kip Up", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Silent Stride": {
				"name": "Technique_Silent Stride", "fieldName": "silentStride", "title": "Silent Stride", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shove": {
				"name": "Technique_Shove", "fieldName": "shove", "title": "Shove", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knockdown": {
				"name": "Technique_Knockdown", "fieldName": "knockdown", "title": "Knockdown", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tumble": {
				"name": "Technique_Tumble", "fieldName": "tumble", "title": "Tumble", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field Medic": {
				"name": "Technique_Field Medic", "fieldName": "fieldMedic", "title": "Field Medic", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Camoflauge": {
				"name": "Technique_Camoflauge", "fieldName": "camoflauge", "title": "Camoflauge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Blurred Light": {
				"name": "Technique_Blurred Light", "fieldName": "blurredLight", "title": "Blurred Light", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light Refraction": {
				"name": "Technique_Light Refraction", "fieldName": "lightRefraction", "title": "Light Refraction", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Steps": {
				"name": "Technique_Shadow Steps", "fieldName": "shadowSteps", "title": "Shadow Steps", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Walker": {
				"name": "Technique_Shadow Walker", "fieldName": "shadowWalker", "title": "Shadow Walker", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Step": {
				"name": "Technique_Wind Step", "fieldName": "windStep", "title": "Wind Step", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Updraft": {
				"name": "Technique_Updraft", "fieldName": "updraft", "title": "Updraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Clouded Updraft": {
				"name": "Technique_Clouded Updraft", "fieldName": "cloudedUpdraft", "title": "Clouded Updraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Fall": {
				"name": "Technique_Wind Fall", "fieldName": "windFall", "title": "Wind Fall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Walk on Air": {
				"name": "Technique_Walk on Air", "fieldName": "walkOnAir", "title": "Walk on Air", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fire Step": {
				"name": "Technique_Fire Step", "fieldName": "fireStep", "title": "Fire Step", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Liftoff": {
				"name": "Technique_Liftoff", "fieldName": "liftoff", "title": "Liftoff", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Jet": {
				"name": "Technique_Jet", "fieldName": "jet", "title": "Jet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cunning Action": {
				"name": "Technique_Cunning Action", "fieldName": "cunningAction", "title": "Cunning Action", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demoralize": {
				"name": "Technique_Demoralize", "fieldName": "demoralize", "title": "Demoralize", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fascinate": {
				"name": "Technique_Fascinate", "fieldName": "fascinate", "title": "Fascinate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Impersonator": {
				"name": "Technique_Impersonator", "fieldName": "impersonator", "title": "Impersonator", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ether Sense": {
				"name": "Technique_Ether Sense", "fieldName": "etherSense", "title": "Ether Sense", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spirit Sense": {
				"name": "Technique_Spirit Sense", "fieldName": "spiritSense", "title": "Spirit Sense", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tremorsense": {
				"name": "Technique_Tremorsense", "fieldName": "tremorsense", "title": "Tremorsense", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dustcraft": {
				"name": "Technique_Dustcraft", "fieldName": "dustcraft", "title": "Dustcraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shape Material": {
				"name": "Technique_Shape Material", "fieldName": "shapeMaterial", "title": "Shape Material", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quickcraft": {
				"name": "Technique_Quickcraft", "fieldName": "quickcraft", "title": "Quickcraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Shaping": {
				"name": "Technique_Improved Shaping", "fieldName": "improvedShaping", "title": "Improved Shaping", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Shaping": {
				"name": "Technique_Greater Shaping", "fieldName": "greaterShaping", "title": "Greater Shaping", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Shaping": {
				"name": "Technique_Legendary Shaping", "fieldName": "legendaryShaping", "title": "Legendary Shaping", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Material": {
				"name": "Technique_Dust Material", "fieldName": "dustMaterial", "title": "Dust Material", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Area": {
				"name": "Technique_Dust Area", "fieldName": "dustArea", "title": "Dust Area", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Dusting": {
				"name": "Technique_Improved Dusting", "fieldName": "improvedDusting", "title": "Improved Dusting", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Dusting": {
				"name": "Technique_Greater Dusting", "fieldName": "greaterDusting", "title": "Greater Dusting", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Dusting": {
				"name": "Technique_Legendary Dusting", "fieldName": "legendaryDusting", "title": "Legendary Dusting", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Path": {
				"name": "Technique_Form Path", "fieldName": "formPath", "title": "Form Path", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Pillar": {
				"name": "Technique_Form Pillar", "fieldName": "formPillar", "title": "Form Pillar", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stepping Path": {
				"name": "Technique_Stepping Path", "fieldName": "steppingPath", "title": "Stepping Path", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Wall": {
				"name": "Technique_Form Wall", "fieldName": "formWall", "title": "Form Wall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Scattered Pillars": {
				"name": "Technique_Scattered Pillars", "fieldName": "scatteredPillars", "title": "Scattered Pillars", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Wall": {
				"name": "Technique_Great Wall", "fieldName": "greatWall", "title": "Great Wall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cultivate": {
				"name": "Technique_Cultivate", "fieldName": "cultivate", "title": "Cultivate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Entangle": {
				"name": "Technique_Entangle", "fieldName": "entangle", "title": "Entangle", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wildwood": {
				"name": "Technique_Wildwood", "fieldName": "wildwood", "title": "Wildwood", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distortion": {
				"name": "Technique_Distortion", "fieldName": "distortion", "title": "Distortion", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Distortion": {
				"name": "Technique_Lasting Distortion", "fieldName": "lastingDistortion", "title": "Lasting Distortion", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heat Field": {
				"name": "Technique_Heat Field", "fieldName": "heatField", "title": "Heat Field", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burn Guard": {
				"name": "Technique_Burn Guard", "fieldName": "burnGuard", "title": "Burn Guard", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Field": {
				"name": "Technique_Cold Field", "fieldName": "coldField", "title": "Cold Field", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Chill Guard": {
				"name": "Technique_Chill Guard", "fieldName": "chillGuard", "title": "Chill Guard", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinesis": {
				"name": "Technique_Kinesis", "fieldName": "kinesis", "title": "Kinesis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distant Kinesis": {
				"name": "Technique_Distant Kinesis", "fieldName": "distantKinesis", "title": "Distant Kinesis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Strike": {
				"name": "Technique_Kinetic Strike", "fieldName": "kineticStrike", "title": "Kinetic Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Throw": {
				"name": "Technique_Kinetic Throw", "fieldName": "kineticThrow", "title": "Kinetic Throw", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heavy Kinesis": {
				"name": "Technique_Heavy Kinesis", "fieldName": "heavyKinesis", "title": "Heavy Kinesis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burden": {
				"name": "Technique_Burden", "fieldName": "burden", "title": "Burden", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pressure": {
				"name": "Technique_Pressure", "fieldName": "pressure", "title": "Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Restrain": {
				"name": "Technique_Restrain", "fieldName": "restrain", "title": "Restrain", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wide Pressure": {
				"name": "Technique_Wide Pressure", "fieldName": "widePressure", "title": "Wide Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prostration": {
				"name": "Technique_Prostration", "fieldName": "prostration", "title": "Prostration", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Deep Pressure": {
				"name": "Technique_Deep Pressure", "fieldName": "deepPressure", "title": "Deep Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gravity Well": {
				"name": "Technique_Gravity Well", "fieldName": "gravityWell", "title": "Gravity Well", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shield Block": {
				"name": "Technique_Shield Block", "fieldName": "shieldBlock", "title": "Shield Block", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Glancing Block": {
				"name": "Technique_Glancing Block", "fieldName": "glancingBlock", "title": "Glancing Block", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aegis": {
				"name": "Technique_Aegis", "fieldName": "aegis", "title": "Aegis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light": {
				"name": "Technique_Light", "fieldName": "light", "title": "Light", "group": "Technique", "subGroup": "", "descriptions": [null]
				,
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dancing Lights": {
				"name": "Technique_Dancing Lights", "fieldName": "dancingLights", "title": "Dancing Lights", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flash": {
				"name": "Technique_Flash", "fieldName": "flash", "title": "Flash", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sunlight": {
				"name": "Technique_Sunlight", "fieldName": "sunlight", "title": "Sunlight", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release": {
				"name": "Technique_Stress Release", "fieldName": "stressRelease", "title": "Stress Release", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release +": {
				"name": "Technique_Stress Release +", "fieldName": "stressRelease+", "title": "Stress Release +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release ++": {
				"name": "Technique_Stress Release ++", "fieldName": "stressRelease++", "title": "Stress Release ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training": {
				"name": "Technique_Sensory Training", "fieldName": "sensoryTraining", "title": "Sensory Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training +": {
				"name": "Technique_Sensory Training +", "fieldName": "sensoryTraining+", "title": "Sensory Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Broad Study": {
				"name": "Technique_Broad Study", "fieldName": "broadStudy", "title": "Broad Study", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Experienced Tracker": {
				"name": "Technique_Experienced Tracker", "fieldName": "experiencedTracker", "title": "Experienced Tracker", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual": {
				"name": "Technique_Multilingual", "fieldName": "multilingual", "title": "Multilingual", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual +": {
				"name": "Technique_Multilingual +", "fieldName": "multilingual+", "title": "Multilingual +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore": {
				"name": "Technique_Specialized Lore", "fieldName": "specializedLore", "title": "Specialized Lore", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore +": {
				"name": "Technique_Specialized Lore +", "fieldName": "specializedLore+", "title": "Specialized Lore +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore ++": {
				"name": "Technique_Specialized Lore ++", "fieldName": "specializedLore++", "title": "Specialized Lore ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Initiative": {
				"name": "Technique_Improved Initiative", "fieldName": "improvedInitiative", "title": "Improved Initiative", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training": {
				"name": "Technique_Knowledge Training", "fieldName": "knowledgeTraining", "title": "Knowledge Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training +": {
				"name": "Technique_Knowledge Training +", "fieldName": "knowledgeTraining+", "title": "Knowledge Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training ++": {
				"name": "Technique_Knowledge Training ++", "fieldName": "knowledgeTraining++", "title": "Knowledge Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training": {
				"name": "Technique_Social Training", "fieldName": "socialTraining", "title": "Social Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training +": {
				"name": "Technique_Social Training +", "fieldName": "socialTraining+", "title": "Social Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training ++": {
				"name": "Technique_Social Training ++", "fieldName": "socialTraining++", "title": "Social Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus": {
				"name": "Technique_Refocus", "fieldName": "refocus", "title": "Refocus", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus +": {
				"name": "Technique_Refocus +", "fieldName": "refocus+", "title": "Refocus +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel": {
				"name": "Technique_Sustained Channel", "fieldName": "sustainedChannel", "title": "Sustained Channel", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel +": {
				"name": "Technique_Sustained Channel +", "fieldName": "sustainedChannel+", "title": "Sustained Channel +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control": {
				"name": "Technique_Ki Control", "fieldName": "kiControl", "title": "Ki Control", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control +": {
				"name": "Technique_Ki Control +", "fieldName": "kiControl+", "title": "Ki Control +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control ++": {
				"name": "Technique_Ki Control ++", "fieldName": "kiControl++", "title": "Ki Control ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value": {
				"name": "Technique_Surge Value", "fieldName": "surgeValue", "title": "Surge Value", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value +": {
				"name": "Technique_Surge Value +", "fieldName": "surgeValue+", "title": "Surge Value +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training": {
				"name": "Technique_Channel Training", "fieldName": "channelTraining", "title": "Channel Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training +": {
				"name": "Technique_Channel Training +", "fieldName": "channelTraining+", "title": "Channel Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training ++": {
				"name": "Technique_Channel Training ++", "fieldName": "channelTraining++", "title": "Channel Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training": {
				"name": "Technique_Physical Training", "fieldName": "physicalTraining", "title": "Physical Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training +": {
				"name": "Technique_Physical Training +", "fieldName": "physicalTraining+", "title": "Physical Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training": {
				"name": "Technique_Body Training", "fieldName": "bodyTraining", "title": "Body Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training +": {
				"name": "Technique_Body Training +", "fieldName": "bodyTraining+", "title": "Body Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training ++": {
				"name": "Technique_Body Training ++", "fieldName": "bodyTraining++", "title": "Body Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training": {
				"name": "Technique_Technical Training", "fieldName": "technicalTraining", "title": "Technical Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training +": {
				"name": "Technique_Technical Training +", "fieldName": "technicalTraining+", "title": "Technical Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training ++": {
				"name": "Technique_Technical Training ++", "fieldName": "technicalTraining++", "title": "Technical Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training": {
				"name": "Technique_Martial Training", "fieldName": "martialTraining", "title": "Martial Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training +": {
				"name": "Technique_Martial Training +", "fieldName": "martialTraining+", "title": "Martial Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training ++": {
				"name": "Technique_Martial Training ++", "fieldName": "martialTraining++", "title": "Martial Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up": {
				"name": "Technique_HP Up", "fieldName": "hPUp", "title": "HP Up", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up+": {
				"name": "Technique_HP Up+", "fieldName": "hPUp+", "title": "HP Up+", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up++": {
				"name": "Technique_HP Up++", "fieldName": "hPUp++", "title": "HP Up++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost": {
				"name": "Technique_Vitality Boost", "fieldName": "vitalityBoost", "title": "Vitality Boost", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost +": {
				"name": "Technique_Vitality Boost +", "fieldName": "vitalityBoost+", "title": "Vitality Boost +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost ++": {
				"name": "Technique_Vitality Boost ++", "fieldName": "vitalityBoost++", "title": "Vitality Boost ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying": {
				"name": "Technique_Undying", "fieldName": "undying", "title": "Undying", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying +": {
				"name": "Technique_Undying +", "fieldName": "undying+", "title": "Undying +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack": {
				"name": "Technique_Extra Follow-Up Attack", "fieldName": "extraFollow-UpAttack", "title": "Extra Follow-Up Attack", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack +": {
				"name": "Technique_Extra Follow-Up Attack +", "fieldName": "extraFollow-UpAttack+", "title": "Extra Follow-Up Attack +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Change Tech Slots": {
				"name": "Technique_Change Tech Slots", "fieldName": "changeTechSlots", "title": "Change Tech Slots", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hold Out": {
				"name": "Technique_Hold Out", "fieldName": "holdOut", "title": "Hold Out", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Overdrive": {
				"name": "Technique_Overdrive", "fieldName": "overdrive", "title": "Overdrive", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			}
		},
		sortingGroups = { "group": { "Type": ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error"], "Affinity": ["Wood", "Fire", "Earth", "Metal", "Water"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "PageSet": ["Character Creator", "Core", "Advancement", "Training Page"], "Page": ["Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear"], "General": ["Full Name", "Display Name", "Level", "XP", "Training", "CR", "HP", "WILL", "EN", "Initiative"], "Gear": ["Carrying Capacity"], "Attribute": ["Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN"], "Defense": ["Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion"], "Sense": ["Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill"], "Combat": ["Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Combat_Move Speed", "Combat_Move Potency"], "": ["Chakra"], "Social": ["Social_Approval", "Social_Patience"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent"], "Status": ["Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious"], "Condition": ["Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised"], "Style": ["Style_Basic Set", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan"], "Lore": ["Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "Role": ["Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Technique": ["Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"] }, "formulaMods": { "CR": ["Skill", "Job", "HP", "WILL", "Initiative", "Combat_HV", "Combat_Chakra", "Social_Approval", "Social_Patience", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "": ["Role", "Language", "Lore", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "Character Creator", "Core", "Advancement", "Training Page", "Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Full Name", "Display Name", "Level", "Training", "CR", "EN", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Chakra", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Level": ["Technique", "HP", "WILL", "Social_Approval"], "BOD": ["HP", "Carrying Capacity", "Defense_Brace", "Defense_Fortitude"], "CNV": ["WILL", "Sense_Resolve", "Sense_Freewill", "Combat_HV", "Social_Approval"], "QCK": ["Initiative", "Defense_Reflex", "Defense_Evasion"], "PRC": ["Defense_Disruption", "Defense_Hide"], "INT": ["Sense_Insight", "Sense_Notice"], "RSN": ["Sense_Scrutiny", "Sense_Detect"] } },
		_max = "_max",
		_true = "_true",
		_rank = "_rank",
		_build = "_build",
		_filter = "_filter",
		_expand = "_expand",
		_tab = "_tab",
		_page = "_page",
		_exit = "_exit",
		_finish = "_finish",
		_origin = "_origin",
		_learn = "_learn",
		_pts = "_pts",
		_tech = "_tech",
		_expertise = "_expertise",
		_gear = "_gear",
		_error = "_error",

		get = function (key) {
			return new DefinitionData(values[key]);
		},
		getValues = function (keyArray, delimeter) {
			if (keyArray == undefined || keyArray == "") {
				return [];
			}
			if (typeof keyArray == "string") {
				keyArray = keyArray.split(delimeter);
			}

			let output = [];
			let name = "";
			let lookup = "";
			let dataInfo;

			for (let i = 0; i < keyArray.length; i++) {
				name = "" + keyArray[i].trim();

				lookup = name;
				if (lookup.indexOf("(") >= 0) {
					lookup = lookup.replace(/\([^)]*\)/g, "(X)");
				}

				dataInfo = get(lookup);
				if (dataInfo != undefined) {
					dataInfo.name = name;
					output.push(dataInfo);
				}
			}

			return output;
		},
		has = function (key) {
			return keys.includes(key);
		},
		iterate = function (callback) {
			for (let i = 0; i < keys.length; i++) {
				callback(values[keys[i]]);
			}
		},
		filter = function (filterData) {
			let filteredGroup;
			if (Array.isArray(filterData)) {
				filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
				let nextFilter = [];
				for (let i = 1; i < filterData.length; i++) {
					if (filteredGroup == undefined || filteredGroup.length == 0) {
						return [];
					}
					nextFilter = getSortedGroup(filterData[i].property, filterData[i].value);
					filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
				}
			}
			else {
				filteredGroup = getSortedGroup(filterData.property, filterData.value);
			}
			if (filteredGroup == undefined || filteredGroup.length == 0) {
				return [];
			}
			return getGroupData(filteredGroup);
		},
		getSortedGroup = function (property, propertyValue) {
			return sortingGroups[property][propertyValue];
		},
		getGroupData = function (group) {
			let output = [];
			for (let i = 0; i < group.length; i++) {
				output.push(get(group[i]));
			}
			return output;
		},
		getPropertyValues = function (property) {
			let output = [];
			for (let key in sortingGroups[property]) {
				output.push(key);
			}
			return output;
		},
		getAttribute = function (key, mod, mod1) {
			let data = get(key);
			return data.getAttribute(mod, mod1);
		},
		getVariable = function (key, mod, mod1) {
			let data = get(key);
			return data.getVariable(mod, mod1);
		},
		getAbbreviation = function (key) {
			let data = get(key);
			if (data.abbreviation == "") {
				return data.name;
			}
			else {
				return data.abbreviation;
			}
		},
		getVariables = function (key, array, mod1) {
			let output = [];
			let data = get(key);
			for (let i = 0; i < array.length; i++) {
				output.push(data.getVariable(array[i], mod1));
			}
			return output;
		},
		getGroupVariables = function (filterData, mod1, mod2) {
			let data = filter(filterData);
			let output = [];
			for (let i = 0; i < data.length; i++) {
				output.push(data[i].getVariable(mod1, mod2));
			}
			return output;
		}
		;
	return {
		Get: get,
		GetValues: getValues,
		Has: has,
		Iterate: iterate,
		Filter: filter,
		GetSortedGroup: getSortedGroup,
		GetAttribute: getAttribute,
		GetVariable: getVariable,
		GetAbbreviation: getAbbreviation,
		GetVariables: getVariables,
		GetGroupVariables: getGroupVariables,
		_max: _max,
		_true: _true,
		_rank: _rank,
		_build: _build,
		_filter: _filter,
		_expand: _expand,
		_tab: _tab,
		_page: _page,
		_exit: _exit,
		_finish: _finish,
		_origin: _origin,
		_learn: _learn,
		_pts: _pts,
		_tech: _tech,
		_expertise: _expertise,
		_gear: _gear,
		_error: _error
	};
}());
