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
                briefrestResource = GetCharacterAttribute(target.charId, RowId.BuildId(repeatingSection, id, "resourcecount"));
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
                shortrestResource = GetCharacterAttribute(target.charId, RowId.BuildId(repeatingSection, id, "resourcecount"));
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
                longrestResource = GetCharacterAttribute(target.charId, RowId.BuildId(repeatingSection, id, "resourcecount"));
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
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.description = json.description;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.variable = "";
    }
    createDefinition(baseDefinition) {
        let definition = new DefinitionData();
        definition.name = baseDefinition.isResource ? `${this.name}` : `${baseDefinition.name}_${this.name}`;
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
        definition.setFormulaData();
        return definition;
    }

}
class TechniqueData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
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
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
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
        super.createEmpty();
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
            this.addEffect(defense, effect);
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
                this.addEffect(technique.effects.getkey(0), effect[0]);
            }
        }

        if (technique.definitions.length > 0) {
            this.addDefinition(technique.definitions[0]);
        }
    }
    addEffect(defense, effect) {
        if (!this.effects.has(defense)) {
            this.effects.add(defense, []);
        }
        this.effects.get(defense).push(effect);
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
        this.createEmpty();
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
        this.createEmpty();
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
        super.createEmpty();
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
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.description = json.description;
        this.affinity = json.affinity;
        this.cr = json.cr;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.affinity = "" + dataArray[i]; i++;
        this.cr = parseInt(dataArray[i]); i++;
    }
    createEmpty() {
        super.createEmpty();
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
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.abilityScore = json.abilityScore;
        this.description = json.description;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.abilityScore = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;

    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.abilityScore = "";
        this.description = "";
    }
}
class LanguageData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.location = json.location;
        this.description = json.description;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.location = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.location = "";
        this.description = "";
    }
}
class LoreData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = json.fieldName;
        this.group = json.group;
        this.description = json.description;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
    }
}
class JobData extends WuxDatabaseData {
    createEmpty() {
        super.createEmpty();
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
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.description = json.description;
        this.attributes = json.attributes;
        this.roles = json.roles;
        this.prereq = json.prereq;
        this.techniques = json.techniques;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
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
        this.createEmpty();

    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.techniques = this.createTechnique(dataArray.slice(i)); i++;

    }
    createEmpty() {
        super.createEmpty();
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
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
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
        this.modAttrs = json.modAttrs;
        this.formulaCalculations = json.formulaCalculations;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.title = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.subGroup = "" + dataArray[i]; i++;
        this.descriptions = [("" + dataArray[i])]; i++;
        this.abbreviation = "" + dataArray[i]; i++;
        this.variable = "" + dataArray[i]; i++;
        this.formula = "" + dataArray[i]; i++;
        this.modifiers = "" + dataArray[i]; i++;
        this.linkedGroups = Format.StringToArray("" + dataArray[i]).push(this.name); i++;
        this.isResource = dataArray[i]; i++;
        this.setFormulaData();
    }
    createEmpty() {
        super.createEmpty();
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
        definition.title = this.title;
        definition.subGroup = this.subGroup;
        definition.descriptions = this.descriptions;
        definition.formula = this.formula;
        definition.modifiers = this.modifiers;
        definition.linkedGroups = this.linkedGroups;
        definition.isResource = this.isResource;
        definition.setFormulaData();

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
    getDescription() {
        let output = "";
        this.descriptions.forEach((description) => {
            output += description + "\n";
        });
        return output;
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

        if (this.modifiers != "") {
            let modArray = this.modifiers.split(";");
            modArray.forEach((mod) => {
                this.formulaCalculations.push(new WorkerFormula(mod, 0, 1));
                this.modAttrs.push(this.getVariable(mod));
            });
        }
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
            if (formula.modName != "") {
                formula.value = attributeHandler.parseInt(formula.modName);
            }
            output += formula.value * formula.multiplier;
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
        this.fieldName = Format.ToFieldName(technique.name);
        this.actionType = technique.action;
        this.isFree = technique.isFree;
    }
    setTechSetData(technique) {
        this.techSetDisplay = technique.affinity;
        this.techSetTitle = technique.skill == "" ? "No Check" : technique.skill;

        let subText = "";
        if (technique.limits != "") {
            if (subText != "") {
                subText += "; ";
            }
            subText += technique.limits;
        }
        if (technique.resourceCost != "") {
            if (subText != "") {
                subText += "; ";
            }
            subText += technique.resourceCost;
        }
        this.techSetSub = subText == "" ? "-" : subText;
    }
    setTechTargetData(technique) {
        this.targetData = "";
        if (technique.action != "") {
            this.targetData += technique.action;
        }
        if (technique.range != "") {
            if (this.targetData != "") {
                this.targetData += "; ";
            }
            this.targetData += `Range: ${technique.range}`;
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
        this.autoEffects = new TechniqueEffectDisplayData.Get(technique.autoEffects);
    }
    setEffects(technique) {
        this.effects = new Dictionary();
        technique.effects.iterate((effect, defense) => {
            this.effects.add(defense, new TechniqueEffectDisplayData.Get(effect));
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

var TechniqueEffectDisplayData = TechniqueEffectDisplayData || (function () {
    'use strict';

    var
    get = function (techniqueEffect) {
        return importEffectData(techniqueEffect);
    },

    importEffectData = function (effectData) {
        let data = [];
        for (let i = 0; i < effectData.length; i++) {
            data.push(formatEffect(effectData[i]));
        }
        return data;
    },

    formatEffect = function (effect) {
        let output = "";
        switch (effect.type) {
            case "Damage":
                output = formatDamageEffect(effect);
                break;
            case "Status":
                output = formatStatusEffect(effect);
                break;
            case "Condition":
                output = formatConditionEffect(effect);
                break;
            case "Definition":
                break;
            case "":
                output = formatDescriptionEffect(effect);
                break;
        }
        
        return output;
    },

    formatDamageEffect = function (effect) {
        return `[${formatCalcBonus(effect)}] ${effect.effect} damage`;
    },

    formatStatusEffect = function (effect) {
        return formatStateEffect(effect, `Status_${effect.effect}`);
    },

    formatConditionEffect = function (effect) {
        return formatStateEffect(effect, `Condition_${effect.effect}`);
    },

    formatStateEffect = function (effect, effectName) {
        let state = WuxDef.Get(effectName);
        let target = "Target";
        let plural = "s";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
        }
        let ranks = formatCalcBonus(effect);
        switch (effect.subType) {
            case "Add": return `${target} gain${plural} the ${state.title} ${state.group}`;
            case "Remove": return `${target} lose${plural} the ${state.title} ${state.group}`;
            case "Remove Any": return `${target} lose${plural} any condition of your choice`;
            case "Rank Up": return `${target} gain${plural} [${ranks}] rank in the ${state.title} ${state.group}`;
            case "Rank Down": return `${target} lose${plural} [${ranks}] rank in the ${state.title} ${state.group}`;
            default: return `${target} gain${plural} the ${state.title} ${state.group}`;
        }
    },
    
    formatDescriptionEffect = function (effect) {
        return effect.effect;
    },

    formatCalcBonus = function (effect) {
        let output = formatEffectDice(effect);
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
    },

    formatEffectDice = function (effect) {
        if (effect.dVal != "" && effect.dVal > 0) {
            return `${effect.dVal}d${effect.dType}`;
        }
        return "";
    }

    return {
        Get: get
    }
}());

class WorkerBuildStat extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.value = parseInt(json.value);
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.value = "" + dataArray[i]; i++;
    }
    createEmpty() {
        this.name = "";
        this.value = "0";
    }
}
class WorkerBuildStats extends Dictionary {

    constructor() {
        super();
    }

    getIntValue(name) {
        let stat = this.get(name);
        return stat == undefined ? 0 : isNaN(parseInt(stat.value)) ? 0 : parseInt(stat.value);
    }

    getPointsTotal() {
        let points = 0;
        if (this.keys == undefined) {
            return points;
        }
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
}
class ResistanceData {
    constructor(json) {
        if (json != undefined) {
            this.importJson(json);
        }
        else {
            this.createEmpty();
        }
    }

    importJson(json) {
        this.damageTypes = json.damageTypes;
        for (let i = 0; i < this.damageTypes.length; i++) {
            this[this.damageTypes[i]] = json[this.damageTypes[i]];
        }
    }

    createEmpty() {
        let damageTypeDefs = WuxDef.Filter(new DatabaseFilterData("group", "DamageType"));
        this.damageTypes = [];
        for (let i = 0; i < damageTypeDefs.length; i++) {
            this.damageTypes.push(damageTypeDefs[i].name);
            this[damageTypeDefs[i].name] = 0;
        }
    }

    addResistanceData(resistanceData) {
        for (let i = 0; i < this.damageTypes.length; i++) {
            this[this.damageTypes[i]] += resistanceData[this.damageTypes[i]];
        }
    }

    addResistanceValue(damageType, value) {
        this[damageType] += value;
    }

    getResistanceValue(damageType) {
        return this[damageType];
    }

    getResistanceString(damageType) {
        if (this[damageType] == 0) {
            return "";
        }
        else if (this[damageType] > 0) {
            return `${damageType} Resistance: ${this[damageType]}`;
        }
        else {
            return `${damageType} Weakness: ${Math.abs(this[damageType])}`;
        }
    }

    getAllResistancesString() {
        let output = "";
        for (let i = 0; i < this.damageTypes.length; i++) {
            if (this[this.damageTypes[i]] > 0) {
                if (output != "") {
                    output += "\n";
                }
                output += `${damageType}: ${this[damageType]}`;
            }
        }
        
        return output;
    }

    getAllWeaknessesString() {
        let output = "";
        for (let i = 0; i < this.damageTypes.length; i++) {
            if (this[this.damageTypes[i]] < 0) {
                if (output != "") {
                    output += "\n";
                }
                output += `${damageType}: ${this[damageType]}`;
            }
        }
        
        return output;
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

        toFieldName = function (inputString) {
            return inputString.toLowerCase().replace(/ /g, "_");
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
        ToFieldName: toFieldName,
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

var RowId = RowId || (function () {
    'use strict';

    var
        buildId = function (sectionName, currentID, variableName) {

            if (variableName.startsWith("attr")) {
                variableName = variableName.substr(4);
            }
            return `${sectionName}${!sectionName.endsWith("_") ? "_" : ""}${currentID}${!variableName.startsWith("_") ? "_" : ""}${variableName}`;
        },
        buildIdFromArray = function (sectionName, currentID, variableNames) {
            let output = [];
            for (let i = 0; i < variableNames.length; i++) {
                output.push(buildId(sectionName, currentID, variableNames[i]));
            }
            return output;
        }

        ;
    return {
        BuildId: buildId,
        BuildIdFromArray: buildIdFromArray
    };
})();


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

//Definitions Database
var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "Combat", "Social", "DamageType", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_Training", "Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "TrainingKnowledge", "TrainingTechniques", "PP", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Combat", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion", "Sense_Social", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill", "Full Name", "Display Name", "Background", "Age", "Gender", "Homeland", "HP", "WILL", "EN", "Initiative", "Affinity", "InnateDefense", "InnateSense", "Recall", "Carrying Capacity", "Combat_HV", "Combat_Armor", "Combat_Resistance", "Combat_ResistanceDesc", "Combat_WeaknessDesc", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Chakra", "Combat_Move Speed", "Combat_Move Potency", "Social_Approval", "Social_Patience", "Burn", "Cold", "Energy", "Force", "Piercing", "Shock", "Tension", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Style_Basic Set", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Unarmed Strike", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "group": "Type", "description": "", "variable": "atr-{0}{1}", "title": "Attributes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 }]
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "group": "Type", "description": "", "variable": "skl-{0}{1}", "title": "Skills", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Job": {
				"name": "Job", "fieldName": "job", "group": "Type", "description": "", "variable": "job-{0}{1}", "title": "Jobs", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Role": {
				"name": "Role", "fieldName": "role", "group": "Type", "description": "", "variable": "rol-{0}{1}", "title": "Roles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "group": "Type", "description": "", "variable": "knw-{0}{1}", "title": "Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "10;TrainingKnowledge", "modifiers": "", "linkedGroups": 3, "isResource": "", "modAttrs": ["trn-tp_knowledge"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "trn-tp_knowledge", "value": 0, "multiplier": 1 }]
			},
			"Language": {
				"name": "Language", "fieldName": "language", "group": "Type", "description": "", "variable": "lng-{0}{1}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "group": "Type", "description": "", "variable": "lor-{0}{1}", "title": "Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "fieldName": "style", "group": "Type", "description": "", "variable": "sty-{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "group": "Type", "description": "", "variable": "tch-{0}{1}", "title": "Techniques", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"PageSet": {
				"name": "PageSet", "fieldName": "pageset", "group": "Type", "description": "", "variable": "pgs-{0}{1}", "title": "Page Set", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page": {
				"name": "Page", "fieldName": "page", "group": "Type", "description": "", "variable": "pag-{0}{1}", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title": {
				"name": "Title", "fieldName": "title", "group": "Type", "description": "", "variable": "ttl-{0}{1}", "title": "Title", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "group": "Type", "description": "", "variable": "adv-{0}{1}", "title": "Advancement", "subGroup": "", "descriptions": ["Advancement Points are gained whenever you level. ", "Every level you gain grants you one advancement point."],
				"abbreviation": "", "formula": "Level", "modifiers": "", "linkedGroups": 1, "isResource": true, "modAttrs": ["adv-level"],
				"formulaCalculations": [{ "modName": "adv-level", "value": 0, "multiplier": 1 }]
			},
			"Training": {
				"name": "Training", "fieldName": "training", "group": "Type", "description": "", "variable": "trn-{0}{1}", "title": "Training Points", "subGroup": "", "descriptions": ["Training points are gained through training. You can spend training points on bonus build points for both knowledge and techniques. ", "Whenever you gain PP, you gain one Training Point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": true, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "group": "Type", "description": "", "variable": "def-{0}{1}", "title": "Defense", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "group": "Type", "description": "", "variable": "sen-{0}{1}", "title": "Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AffinityType": {
				"name": "AffinityType", "fieldName": "affinitytype", "group": "Type", "description": "", "variable": "afn-{0}{1}", "title": "Affinity Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateDefenseType": {
				"name": "InnateDefenseType", "fieldName": "innatedefensetype", "group": "Type", "description": "", "variable": "idf-{0}{1}", "title": "Innate Defense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateSenseType": {
				"name": "InnateSenseType", "fieldName": "innatesensetype", "group": "Type", "description": "", "variable": "isn-{0}{1}", "title": "Innate Sense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "group": "Type", "description": "", "variable": "cmb-{0}{1}", "title": "Combat", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "fieldName": "social", "group": "Type", "description": "", "variable": "soc-{0}{1}", "title": "Social", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"DamageType": {
				"name": "DamageType", "fieldName": "damagetype", "group": "Type", "description": "", "variable": "dmg-{0}{1}", "title": "Damage Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": true, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "group": "Type", "description": "", "variable": "tra-{0}{1}", "title": "Traits", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status": {
				"name": "Status", "fieldName": "status", "group": "Type", "description": "", "variable": "sts-{0}{1}", "title": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "group": "Type", "description": "", "variable": "cnd-{0}{1}", "title": "Condition", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "group": "VariableMod", "description": "", "variable": "_max", "title": "Max", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "group": "VariableMod", "description": "", "variable": "_true", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "group": "VariableMod", "description": "", "variable": "_rank", "title": "Rank", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "group": "VariableMod", "description": "", "variable": "_build", "title": "Build", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "group": "VariableMod", "description": "", "variable": "_filter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "group": "VariableMod", "description": "", "variable": "_expand", "title": "Expand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "group": "VariableMod", "description": "", "variable": "_tab", "title": "Tab", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "group": "VariableMod", "description": "", "variable": "_page", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_info": {
				"name": "_info", "fieldName": "_info", "group": "VariableMod", "description": "", "variable": "_info", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "group": "VariableMod", "description": "", "variable": "_exit", "title": "Exit", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "group": "VariableMod", "description": "", "variable": "_finish", "title": "Finish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "group": "VariableMod", "description": "", "variable": "_origin", "title": "Origin", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "group": "VariableMod", "description": "", "variable": "_learn", "title": "Learn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "group": "VariableMod", "description": "", "variable": "_pts", "title": "Points", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "group": "VariableMod", "description": "", "variable": "_tech", "title": "Technique Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "group": "VariableMod", "description": "", "variable": "_expertise", "title": "Expertise Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "group": "VariableMod", "description": "", "variable": "_gear", "title": "Gear Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_affinity": {
				"name": "_affinity", "fieldName": "_affinity", "group": "VariableMod", "description": "", "variable": "_affinity", "title": "Affinity Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "group": "VariableMod", "description": "", "variable": "_error", "title": "Error", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "group": "AffinityType", "description": "", "variable": "Wood", "title": "Wood", "subGroup": "", "descriptions": ["Wood is the element of growth, cooperation, and idealism. Magical techniques of the wood element tend to affect large groups and areas.", "A Wood affinity grants the following:\nInitiative bonus equal to your Character Rank.\nHeal Value bonus equal to your Character Rank x 2.\nCold Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "group": "AffinityType", "description": "", "variable": "Fire", "title": "Fire", "subGroup": "", "descriptions": ["Fire is the element of expansion, spontaneity, and vigor. Magical techniques of the fire element tend to spread fire swiftly in a variety of impact areas.", "A Fire affinity grants the following:\nInitiative bonus equal to your Character Rank.\nBurn Resistance bonus equal to your Character Rank.\nFire Resistance bonus equal to your Character Rank x 2.", ""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "group": "AffinityType", "description": "", "variable": "Earth", "title": "Earth", "subGroup": "", "descriptions": ["Earth is the element of stability, patience, and practicality. Magical techniques of the earth element tend to be simple and direct in functionality.", "An Earth affinity grants the following:\nFire Resistance bonus equal to your Character Rank x 2.\nPiercing Resistance bonus equal to your Character Rank.\nShock Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "group": "AffinityType", "description": "", "variable": "Metal", "title": "Metal", "subGroup": "", "descriptions": ["Metal is the element of recession, rigidity, and quality. Magical techniques of the metal element tend to be strong and durable but costly.", "A Metal affinity grants the following:\nArmor bonus equal to your Character Rank.\nForce Resistance bonus equal to your Character Rank.\nPiercing Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "fieldName": "water", "group": "AffinityType", "description": "", "variable": "Water", "title": "Water", "subGroup": "", "descriptions": ["Water is the element of conservation, flexibility, and wisdom. Magical techniques of the water element tend to use little energy allowing them to quickly come into effect and disappear soon after.", "A Water affinity grants the following:\nSurge bonus equal to 1.\nCold Resistance bonus equal to your Character Rank x 2.\nForce Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"BOD": {
				"name": "BOD", "fieldName": "bod", "group": "InnateDefenseType", "description": "", "variable": "BOD", "title": "Body", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PRC": {
				"name": "PRC", "fieldName": "prc", "group": "InnateDefenseType", "description": "", "variable": "PRC", "title": "Precision", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"QCK": {
				"name": "QCK", "fieldName": "qck", "group": "InnateDefenseType", "description": "", "variable": "QCK", "title": "Quickness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"CNV": {
				"name": "CNV", "fieldName": "cnv", "group": "InnateSenseType", "description": "", "variable": "CNV", "title": "Conviction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"INT": {
				"name": "INT", "fieldName": "int", "group": "InnateSenseType", "description": "", "variable": "INT", "title": "Intuition ", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"RSN": {
				"name": "RSN", "fieldName": "rsn", "group": "InnateSenseType", "description": "", "variable": "RSN", "title": "Reason", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributevaluemediocre", "group": "AttributeValue", "description": "", "variable": "0", "title": "Mediocre (+0)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributevaluegreat", "group": "AttributeValue", "description": "", "variable": "3", "title": "Great (+3)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributevaluegood", "group": "AttributeValue", "description": "", "variable": "2", "title": "Good (+2)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributevalueaverage", "group": "AttributeValue", "description": "", "variable": "1", "title": "Average (+1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributevaluebad", "group": "AttributeValue", "description": "", "variable": "-1", "title": "Bad (-1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier0": {
				"name": "JobTier0", "fieldName": "jobtier0", "group": "JobTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier1": {
				"name": "JobTier1", "fieldName": "jobtier1", "group": "JobTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier2": {
				"name": "JobTier2", "fieldName": "jobtier2", "group": "JobTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier3": {
				"name": "JobTier3", "fieldName": "jobtier3", "group": "JobTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier0": {
				"name": "LoreTier0", "fieldName": "loretier0", "group": "LoreTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier1": {
				"name": "LoreTier1", "fieldName": "loretier1", "group": "LoreTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier2": {
				"name": "LoreTier2", "fieldName": "loretier2", "group": "LoreTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier3": {
				"name": "LoreTier3", "fieldName": "loretier3", "group": "LoreTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Character Creator": {
				"name": "PageSet_Character Creator", "fieldName": "character_creator", "group": "PageSet", "description": "", "variable": "pgs-character_creator{0}", "title": "Character Creator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Core": {
				"name": "PageSet_Core", "fieldName": "core", "group": "PageSet", "description": "", "variable": "pgs-core{0}", "title": "Core", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Advancement": {
				"name": "PageSet_Advancement", "fieldName": "advancement", "group": "PageSet", "description": "", "variable": "pgs-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Training": {
				"name": "PageSet_Training", "fieldName": "training", "group": "PageSet", "description": "", "variable": "pgs-training{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "group": "Page", "description": "", "variable": "pag-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["This is the Character Creator. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, press Finish to populate this character's stats.", "On this page you can set your character's origins including their name, their primary element, and ancestry. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Jobs": {
				"name": "Page_Jobs", "fieldName": "jobs", "group": "Page", "description": "", "variable": "pag-jobs{0}", "title": "Jobs", "subGroup": "", "descriptions": ["Jobs are a unique type of Style which broadly represents a character's role. A job will always grant bonuses to a character's combat or social stats, defenses, and special techniques to determine how the character acts in a conflict. When entering a conflict, only one job may be set at a time. ", "On this page, you can see the number of job points you have available to spend on the left column. Each time you spend a job point you may gain a rank in one job. A job's maximum rank is equal to your Character Rank.", "Gaining a rank in a job often grants new techniques to use when a job's techniques are active.", "You gain a number of job points equal to your Character Rank. You may choose to gain additional job points by spending advancement points on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Skills": {
				"name": "Page_Skills", "fieldName": "skills", "group": "Page", "description": "", "variable": "pag-skills{0}", "title": "Skills", "subGroup": "", "descriptions": ["Skills represent a broad application of techniques and ability. Anytime you do anything complex in Wuxing you will be making a skill check to determine your success. In addition, most techniques will require the use of a skill to function.", "Skills are all tied to one of the six attributes. As a base, a skill modifier is equal to its associated attribute. When you are trained in a skill your modifier increases by 2 + your Character Rank.", "On this page you can see the number of skill points you have available to spend on the left column. Each time you spend a skill point you may become trained in one skill. To train a skill you must check the skill off on the checkbox.", "You gain a number of skill points equal to 8 + your Character Rank. You may choose to gain additional skill points by spending advancement points on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Knowledge": {
				"name": "Page_Knowledge", "fieldName": "knowledge", "group": "Page", "description": "", "variable": "pag-knowledge{0}", "title": "Knowledge", "subGroup": "", "descriptions": ["Knowledge represents information a character knows on a subject. Knowledge can be divided into two categories, languages and lore. ", "Languages are divided by the locations of the world where they are used. Learning a language allows one to speak, read, and write the language. ", "Lore is knowledge of a single broad topic. Whenever you use the Recall Knowledge technique, you will roll with the modifier of an appropriate lore knowledge for the subject you wish to recall knowledge for. When you make a lore check your modifier is equal to your lore's rank + your Character Rank.", "Lore is divided into categories based on the context of their usage. Each category has a General knowledge that can be trained. Normally, you cannot make a lore check without having an associated lore, however having the general knowledge of the subject will allow it. When making a general lore check, your modifier is equal to your Character Rank.", "On this page you can see the number of knowledge points you have available to spend on the left column. Each time you spend a knowledge point you may raise the rank of any lore or learn a language. To raise the rank of a lore, you may change the value of a lore with its dropdown. To learn a language you must check the language off on the checkbox.", "You gain a number of skill points equal to 8 + your Character Rank. You may choose to gain additional knowledge points by spending training points through training on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Attributes": {
				"name": "Page_Attributes", "fieldName": "attributes", "group": "Page", "description": "", "variable": "pag-attributes{0}", "title": "Attributes", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "Attributes range from a +3 bonus to a -1 penalty. Whenever you raise an attribute to a rank you spend an equal number of attribute points.", "By reducing an attribute below 0, you gain an equal number of attribute points. At most, a character can have one attribute at a -1 penalty.", "You gain a number of attribute points equal to 6 + your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Styles": {
				"name": "Page_Styles", "fieldName": "styles", "group": "Page", "description": "", "variable": "pag-styles{0}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_LearnTechniques": {
				"name": "Page_LearnTechniques", "fieldName": "learntechniques", "group": "Page", "description": "", "variable": "pag-learntechniques{0}", "title": "Learn Styles and Techniques", "subGroup": "", "descriptions": ["Each technique allows a character to perform a variety of actions including granting bonuses to the character, performing attacks, manipulate others, or maneuvering around the world.", "All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can learn general styles and techniques. This page contains general styles and techniques that are available to all characters as long as they meet the requirements to learn the style or technique.", "When learning a style often the style will grant a set of techniques that are learned as part of the style. These are listed as Free Techniques in the Style's entry.", "You gain a number of technique points equal to 6 + your Character Rank x 2. You may choose to gain additional technique points by spending advancement points on level up. You may also choose to gain additional technique points by spending training points through training on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_SetStyles": {
				"name": "Page_SetStyles", "fieldName": "setstyles", "group": "Page", "description": "", "variable": "pag-setstyles{0}", "title": "Set Styles", "subGroup": "", "descriptions": ["All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can set which styles are currently active on the character, allowing them to be used in the Actions Page. You can set both job styles and general styles. Basic styles are always set. ", ""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "group": "Page", "description": "", "variable": "pag-character{0}", "title": "Character", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "group": "Page", "description": "", "variable": "pag-overview{0}", "title": "Overview", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "group": "Page", "description": "", "variable": "pag-details{0}", "title": "Details", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "group": "Page", "description": "", "variable": "pag-chat{0}", "title": "Chat", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "group": "Page", "description": "", "variable": "pag-options{0}", "title": "Options", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "group": "Page", "description": "", "variable": "pag-gear{0}", "title": "Gear", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Actions": {
				"name": "Page_Actions", "fieldName": "actions", "group": "Page", "description": "", "variable": "pag-actions{0}", "title": "Actions", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Training": {
				"name": "Page_Training", "fieldName": "training", "group": "Page", "description": "", "variable": "pag-training{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Advancement": {
				"name": "Page_Advancement", "fieldName": "advancement", "group": "Page", "description": "", "variable": "pag-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Origin": {
				"name": "Title_Origin", "fieldName": "origin", "group": "Title", "description": "", "variable": "ttl-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["These are the origin details of your character. They make no mechanical differences to your character, however may impact how you roleplay your character."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_OriginStats": {
				"name": "Title_OriginStats", "fieldName": "originstats", "group": "Title", "description": "", "variable": "ttl-originstats{0}", "title": "Origin Statistics", "subGroup": "", "descriptions": ["These are your characters core statistics that are set at character creation and cannot change. Each stat can affect how your character plays. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_OriginAdvancement": {
				"name": "Title_OriginAdvancement", "fieldName": "originadvancement", "group": "Title", "description": "", "variable": "ttl-originadvancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "Here you can set your character's level. You may also spend any advancement points gained from increasing your character level on additional build points for jobs, skills, or techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_OriginTraining": {
				"name": "Title_OriginTraining", "fieldName": "origintraining", "group": "Title", "description": "", "variable": "ttl-origintraining{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "Here you can set any training points your character may have gained prior to character creation. You may also immediately spend these points on further build points."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Advancement": {
				"name": "Title_Advancement", "fieldName": "advancement", "group": "Title", "description": "", "variable": "ttl-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "In this section you can see your current level and track their experience. When you are ready, you may also access the advancement menu which will allow you to spend gained build points from leveling up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Training": {
				"name": "Title_Training", "fieldName": "training", "group": "Title", "description": "", "variable": "ttl-training{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "In this section you can see how many training points you have gained along with your current PP values. When you are ready, you may also access the training menu which will calculate your current training points and allow you to spend them to learn new knowledge and techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Level": {
				"name": "Level", "fieldName": "level", "group": "Advancement", "description": "", "variable": "adv-level{0}", "title": "Character Level", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"CR": {
				"name": "CR", "fieldName": "cr", "group": "Advancement", "description": "", "variable": "adv-cr{0}", "title": "Character Rank", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level.", "Your Character rank begins at 1. \nAt 5th Level it increases to 2.\nAt 15th Level it increases to 3.\nAt 30th Level it increases to 4.\nAt 50th Level it increases to 5."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"XP": {
				"name": "XP", "fieldName": "xp", "group": "Advancement", "description": "", "variable": "adv-xp{0}", "title": "Experience", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "", "formula": "30", "modifiers": "", "linkedGroups": 1, "isResource": true, "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 30, "multiplier": 1 }]
			},
			"AdvancementJob": {
				"name": "AdvancementJob", "fieldName": "advancementjob", "group": "Advancement", "description": "", "variable": "adv-ap_job{0}", "title": "Job Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Job Points. These job points can be used to increase tier in a job. You must spend 2 advancement points to gain 1 job point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AdvancementSkill": {
				"name": "AdvancementSkill", "fieldName": "advancementskill", "group": "Advancement", "description": "", "variable": "adv-ap_skill{0}", "title": "Skill Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Skill Points. These skill points can be used to learn a new skill. You must spend 2 advancement points to gain 1 skill point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AdvancementTechnique": {
				"name": "AdvancementTechnique", "fieldName": "advancementtechnique", "group": "Advancement", "description": "", "variable": "adv-ap_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 advancement points to gain 1 technique point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier": {
				"name": "JobTier", "fieldName": "jobtier", "group": "Advancement", "description": "", "variable": "adv-jobtier{0}", "title": "Job Tier", "subGroup": "", "descriptions": ["Your job tier represents your skill in this job. Any tier above 0 allows you to choose this job as a set job style. Each tier will unlock the use of additional techniques as shown below.", "Your maximum job tier in any job is equal to your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTechniques": {
				"name": "JobTechniques", "fieldName": "jobtechniques", "group": "Advancement", "description": "", "variable": "adv-jobtechniques{0}", "title": "Job Techniques", "subGroup": "", "descriptions": ["These techniques are gained when reaching the listed tier in the job. These techniques often help you perform tasks related to your job."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"TrainingKnowledge": {
				"name": "TrainingKnowledge", "fieldName": "trainingknowledge", "group": "Training", "description": "", "variable": "trn-tp_knowledge{0}", "title": "Knowledge Points", "subGroup": "", "descriptions": ["You can spend training points to gain Knowledge Points. These knowledge points can be used to increase tier in a job. You must spend 1 training points to gain 1 knowledge point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"TrainingTechniques": {
				"name": "TrainingTechniques", "fieldName": "trainingtechniques", "group": "Training", "description": "", "variable": "trn-tp_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend training points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 training points to gain 1 technique point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PP": {
				"name": "PP", "fieldName": "pp", "group": "Training", "description": "", "variable": "trn-pp{0}", "title": "Progression", "subGroup": "", "descriptions": ["PP is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime at a rate of 1 per day. You may gain an additional PP if a character devotes an entire day to training. ", "Once a character reaches 12 TP, they may spend their PP to gain a new knowledge or technique."],
				"abbreviation": "", "formula": "12", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 12, "multiplier": 1 }]
			},
			"Attribute_BOD": {
				"name": "Attribute_BOD", "fieldName": "bod", "group": "Attribute", "description": "", "variable": "atr-bod{0}", "title": "Body", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_PRC": {
				"name": "Attribute_PRC", "fieldName": "prc", "group": "Attribute", "description": "", "variable": "atr-prc{0}", "title": "Precision", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_QCK": {
				"name": "Attribute_QCK", "fieldName": "qck", "group": "Attribute", "description": "", "variable": "atr-qck{0}", "title": "Quickness", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_CNV": {
				"name": "Attribute_CNV", "fieldName": "cnv", "group": "Attribute", "description": "", "variable": "atr-cnv{0}", "title": "Conviction", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_INT": {
				"name": "Attribute_INT", "fieldName": "int", "group": "Attribute", "description": "", "variable": "atr-int{0}", "title": "Intuition ", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_RSN": {
				"name": "Attribute_RSN", "fieldName": "rsn", "group": "Attribute", "description": "", "variable": "atr-rsn{0}", "title": "Reason", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Combat": {
				"name": "Defense_Combat", "fieldName": "combat", "group": "Defense", "description": "", "variable": "def-combat{0}", "title": "Combat Sense", "subGroup": "Combined Defense", "descriptions": ["Combat Defense is a character's ability to use all their defenses available to defend themselves in combat. This defense is equal to the highest defense between a character's Brace, Disruption, and Reflex defenses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Brace": {
				"name": "Defense_Brace", "fieldName": "brace", "group": "Defense", "description": "", "variable": "def-brace{0}", "title": "Brace", "subGroup": "Combat Defense", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_expertise; _tech;_gear", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-bod", "def-brace_expertise", "def-brace _tech", "def-brace_gear"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Defense_Fortitude": {
				"name": "Defense_Fortitude", "fieldName": "fortitude", "group": "Defense", "description": "", "variable": "def-fortitude{0}", "title": "Fortitude", "subGroup": "Defense", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-bod", "def-fortitude_expertise", "def-fortitude _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Defense_Disruption": {
				"name": "Defense_Disruption", "fieldName": "disruption", "group": "Defense", "description": "", "variable": "def-disruption{0}", "title": "Disruption", "subGroup": "Combat Defense", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_expertise; _tech;_gear", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-prc", "def-disruption_expertise", "def-disruption _tech", "def-disruption_gear"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Defense_Hide": {
				"name": "Defense_Hide", "fieldName": "hide", "group": "Defense", "description": "", "variable": "def-hide{0}", "title": "Hide", "subGroup": "Defense", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-prc", "def-hide_expertise", "def-hide _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Defense_Reflex": {
				"name": "Defense_Reflex", "fieldName": "reflex", "group": "Defense", "description": "", "variable": "def-reflex{0}", "title": "Reflex", "subGroup": "Combat Defense", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "formula": "7;Attribute_QCK", "modifiers": "_expertise; _tech;_gear", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-qck", "def-reflex_expertise", "def-reflex _tech", "def-reflex_gear"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Defense_Evasion": {
				"name": "Defense_Evasion", "fieldName": "evasion", "group": "Defense", "description": "", "variable": "def-evasion{0}", "title": "Evasion", "subGroup": "Defense", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "formula": "4;Attribute_QCK", "modifiers": "_expertise; _tech;_gear", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-qck", "def-evasion_expertise", "def-evasion _tech", "def-evasion_gear"],
				"formulaCalculations": [{ "modName": "", "value": 4, "multiplier": 1 },
				{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Sense_Social": {
				"name": "Sense_Social", "fieldName": "social", "group": "Sense", "description": "", "variable": "sen-social{0}", "title": "Social Sense", "subGroup": "Combined Sense", "descriptions": ["Social Sense is your ability to use all of your social senses at once to make a read on a situation. This sense is equal to the highest sese between your Insight, Scrutiny, and Resolve."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Insight": {
				"name": "Sense_Insight", "fieldName": "insight", "group": "Sense", "description": "", "variable": "sen-insight{0}", "title": "Insight", "subGroup": "Social Sense", "descriptions": ["Insight represents a character's ability to sense emotional state and sudden changes in behaviour. It is useful when detecting someone is trying to charm or deceive you. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-int", "sen-insight_expertise", "sen-insight _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Notice": {
				"name": "Sense_Notice", "fieldName": "notice", "group": "Sense", "description": "", "variable": "sen-notice{0}", "title": "Notice", "subGroup": "Sense", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-int", "sen-notice_expertise", "sen-notice _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Scrutiny": {
				"name": "Sense_Scrutiny", "fieldName": "scrutiny", "group": "Sense", "description": "", "variable": "sen-scrutiny{0}", "title": "Scrutiny", "subGroup": "Social Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning. It is often used in defense against another's attempts at lying and from being tripped up against a skilled negotiator. "],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-rsn", "sen-scrutiny_expertise", "sen-scrutiny _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Detect": {
				"name": "Sense_Detect", "fieldName": "detect", "group": "Sense", "description": "", "variable": "sen-detect{0}", "title": "Detect", "subGroup": "Sense", "descriptions": ["Detect is a character's ability to immediately analyze an effect or location for anything that is out of place or is not behaving normally. It is most often used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-rsn", "sen-detect_expertise", "sen-detect _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Resolve": {
				"name": "Sense_Resolve", "fieldName": "resolve", "group": "Sense", "description": "", "variable": "sen-resolve{0}", "title": "Resolve", "subGroup": "Social Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "formula": "7;Attribute_CNV", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-cnv", "sen-resolve_expertise", "sen-resolve _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Freewill": {
				"name": "Sense_Freewill", "fieldName": "freewill", "group": "Sense", "description": "", "variable": "sen-freewill{0}", "title": "Freewill", "subGroup": "Sense", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "formula": "10;Attribute_CNV", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-cnv", "sen-freewill_expertise", "sen-freewill _tech"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Full Name": {
				"name": "Full Name", "fieldName": "full_name", "group": "General", "description": "", "variable": "full_name", "title": "Full Name", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "fieldName": "display_name", "group": "General", "description": "", "variable": "display_name", "title": "Display Name", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Background": {
				"name": "Background", "fieldName": "background", "group": "General", "description": "", "variable": "background", "title": "Background", "subGroup": "", "descriptions": ["This is the background story of your character. Add any details on the character's past here."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Age": {
				"name": "Age", "fieldName": "age", "group": "General", "description": "", "variable": "age", "title": "Age", "subGroup": "", "descriptions": ["This represents how old the character is in years."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Gender": {
				"name": "Gender", "fieldName": "gender", "group": "General", "description": "", "variable": "gender", "title": "Gender", "subGroup": "", "descriptions": ["The gender the character identifies as."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Homeland": {
				"name": "Homeland", "fieldName": "homeland", "group": "General", "description": "", "variable": "homeland", "title": "Homeland", "subGroup": "", "descriptions": ["Where this character grew up. This will usually shape their perspectives in the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"HP": {
				"name": "HP", "fieldName": "hp", "group": "General", "description": "", "variable": "hp{0}", "title": "Hit Points", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "HP", "formula": "10; CR*10; Level; Attribute_BOD", "modifiers": "_tech;_affinity", "linkedGroups": 1, "isResource": true, "modAttrs": ["adv-cr", "adv-level", "atr-bod", "hp_tech", "hp_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 10 },
				{ "modName": "adv-level", "value": 0, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"WILL": {
				"name": "WILL", "fieldName": "will", "group": "General", "description": "", "variable": "will{0}", "title": "Willpower", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "formula": "10;CR*10;Level;Attribute_CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": true, "modAttrs": ["adv-cr", "adv-level", "atr-cnv", "will_tech"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 10 },
				{ "modName": "adv-level", "value": 0, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"EN": {
				"name": "EN", "fieldName": "en", "group": "General", "description": "", "variable": "en{0}", "title": "Energy", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": true, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "group": "General", "description": "", "variable": "initiative{0}", "title": "Initiative", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "formula": "CR;Attribute_QCK", "modifiers": "_tech;_affinity", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "atr-qck", "initiative_tech", "initiative_affinity"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "group": "General", "description": "", "variable": "affinity{0}", "title": "Affinity", "subGroup": "", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity.", "Your chosen affinity grants weaknesses and resistances to certain elemental damage types."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateDefense": {
				"name": "InnateDefense", "fieldName": "innatedefense", "group": "General", "description": "", "variable": "innatefefense{0}", "title": "Innate Defense", "subGroup": "", "descriptions": ["You are especially proficient in a physical attribute when it comes to defending yourself. Check the Attributes page for more details on each of these attributes and what defenses they apply to.", "All defenses that key off of your chosen attribute gains a permanent +2 bonus. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateSense": {
				"name": "InnateSense", "fieldName": "innatesense", "group": "General", "description": "", "variable": "innatesense{0}", "title": "Innate Sense", "subGroup": "", "descriptions": ["You are especially proficient in a mental attribute when it comes to detecting attacks against you. Check the Attributes page for more details on each of these attributes and what defenses they apply to. ", "All senses that key off of your chosen attribute gains a permanent +2 bonus."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Recall": {
				"name": "Recall", "fieldName": "recall", "group": "General", "description": "", "variable": "recall{0}", "title": "Recall", "subGroup": "", "descriptions": ["Recall is your ability to remember information learned in the past. It is used as a modifier when using Recall Knowledge to gain information. "],
				"abbreviation": "", "formula": "Attribute_RSN", "modifiers": "_tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-rsn", "recall_tech"],
				"formulaCalculations": [{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carrying_capacity", "group": "Gear", "description": "", "variable": "capacity{0}", "title": "Carrying Capacity", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "formula": "40;Attribute_BOD*20", "modifiers": "_tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["atr-bod", "capacity_tech"],
				"formulaCalculations": [{ "modName": "", "value": 40, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 20 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Combat_HV": {
				"name": "Combat_HV", "fieldName": "hv", "group": "Combat", "description": "", "variable": "cmb-hv{0}", "title": "Heal Value", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from some healing abilities."],
				"abbreviation": "", "formula": "5;CR*4;Attribute_CNV", "modifiers": "_tech;_affinity", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "atr-cnv", "cmb-hv_tech", "cmb-hv_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 5, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 4 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Combat_Armor": {
				"name": "Combat_Armor", "fieldName": "armor", "group": "Combat", "description": "", "variable": "cmb-armor{0}", "title": "Armor", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "formula": "0", "modifiers": "_tech;_gear;_affinity", "linkedGroups": 1, "isResource": "", "modAttrs": ["cmb-armor_tech", "cmb-armor_gear", "cmb-armor_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Combat_Resistance": {
				"name": "Combat_Resistance", "fieldName": "resistance", "group": "Combat", "description": "", "variable": "cmb-resistance{0}", "title": "Resistance", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "_tech;_gear;_affinity", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_ResistanceDesc": {
				"name": "Combat_ResistanceDesc", "fieldName": "resistancedesc", "group": "Combat", "description": "", "variable": "cmb-resistancedesc{0}", "title": "Resistance", "subGroup": "", "descriptions": ["Resistance reduces damage of specific damage types by a value equal to the resistance's type. The resistance calculation happens after armor is applied."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_WeaknessDesc": {
				"name": "Combat_WeaknessDesc", "fieldName": "weaknessdesc", "group": "Combat", "description": "", "variable": "cmb-weaknessdesc{0}", "title": "Weakness", "subGroup": "", "descriptions": ["Weakness is the opposite of Resistance, increasing damage against you when hit by specific damage types by a value equal to the weakness' type. The weakness calculation happens after armor is applied."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Durability": {
				"name": "Combat_Durability", "fieldName": "durability", "group": "Combat", "description": "", "variable": "cmb-durability{0}", "title": "Durability", "subGroup": "", "descriptions": ["Durability is the number of times a character can restore their HP back to full when their HP drops to 0."],
				"abbreviation": "", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": true, "modAttrs": ["cmb-durability_tech"],
				"formulaCalculations": [{ "modName": "", "value": 2, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Combat_Surge": {
				"name": "Combat_Surge", "fieldName": "surge", "group": "Combat", "description": "", "variable": "cmb-surge{0}", "title": "Healing Surge", "subGroup": "", "descriptions": ["Healing Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "formula": "4", "modifiers": "_tech;_affinity", "linkedGroups": 1, "isResource": "", "modAttrs": ["cmb-surge_tech", "cmb-surge_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 4, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Combat_Chakra": {
				"name": "Combat_Chakra", "fieldName": "chakra", "group": "Combat", "description": "", "variable": "cmb-chakra{0}", "title": "Chakra", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "formula": "3;CR", "modifiers": "", "linkedGroups": 1, "isResource": true, "modAttrs": ["adv-cr"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 }]
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "group": "", "description": "", "variable": "", "title": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Speed": {
				"name": "Combat_Move Speed", "fieldName": "move_speed", "group": "Combat", "description": "", "variable": "cmb-movespeed{0}", "title": "Move Speed", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they make a standard move."],
				"abbreviation": "", "formula": "3", "modifiers": "_tech;_gear", "linkedGroups": 1, "isResource": "", "modAttrs": ["cmb-movespeed_tech", "cmb-movespeed_gear"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Combat_Move Potency": {
				"name": "Combat_Move Potency", "fieldName": "move_potency", "group": "Combat", "description": "", "variable": "cmb-movepotency{0}", "title": "Move Potency", "subGroup": "", "descriptions": ["At the start of a combat round this value is rolled to determine the number of spaces the character may move. If the value is less than their move speed, the value becomes equal to their move speed. "],
				"abbreviation": "", "formula": "6", "modifiers": "_tech", "linkedGroups": 1, "isResource": "", "modAttrs": ["cmb-movepotency_tech"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Social_Approval": {
				"name": "Social_Approval", "fieldName": "approval", "group": "Social", "description": "", "variable": "soc-approval{0}", "title": "Approval Resistance", "subGroup": "", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "formula": "20;CR*15;Level;Attribute_CNV", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-level", "atr-cnv"],
				"formulaCalculations": [{ "modName": "", "value": 20, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 15 },
				{ "modName": "adv-level", "value": 0, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 }]
			},
			"Social_Patience": {
				"name": "Social_Patience", "fieldName": "patience", "group": "Social", "description": "", "variable": "soc-patience{0}", "title": "Patience", "subGroup": "", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "formula": "CR*10;", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", ""],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 10 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Burn": {
				"name": "Burn", "fieldName": "burn", "group": "DamageType", "description": "", "variable": "dmg-burn{0}", "title": "Burn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Cold": {
				"name": "Cold", "fieldName": "cold", "group": "DamageType", "description": "", "variable": "dmg-cold{0}", "title": "Cold", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Energy": {
				"name": "Energy", "fieldName": "energy", "group": "DamageType", "description": "", "variable": "dmg-energy{0}", "title": "Energy", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Force": {
				"name": "Force", "fieldName": "force", "group": "DamageType", "description": "", "variable": "dmg-force{0}", "title": "Force", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Piercing": {
				"name": "Piercing", "fieldName": "piercing", "group": "DamageType", "description": "", "variable": "dmg-piercing{0}", "title": "Piercing", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Shock": {
				"name": "Shock", "fieldName": "shock", "group": "DamageType", "description": "", "variable": "dmg-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Tension": {
				"name": "Tension", "fieldName": "tension", "group": "DamageType", "description": "", "variable": "dmg-tension{0}", "title": "Tension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "group": "Trait", "description": "", "variable": "tra-accurate{0}", "title": "Accurate", "subGroup": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "group": "Trait", "description": "", "variable": "tra-affinity{0}", "title": "Affinity", "subGroup": "Technique Trait", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "group": "Trait", "description": "", "variable": "tra-affinity+{0}", "title": "Affinity+", "subGroup": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "ap", "group": "Trait", "description": "", "variable": "tra-ap{0}", "title": "AP:X", "subGroup": "Technique Trait", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "group": "Trait", "description": "", "variable": "tra-brutal{0}", "title": "Brutal", "subGroup": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Evadible": {
				"name": "Trait_Evadible", "fieldName": "evadible", "group": "Trait", "description": "", "variable": "tra-evadible{0}", "title": "Evadible", "subGroup": "Technique Trait", "descriptions": ["When making a check against a target, compare your check results against the target's evasion. On failure, none of the technique's effects take effect. A target may always choose to not evade a technique. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "group": "Trait", "description": "", "variable": "tra-focus{0}", "title": "Focus", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "group": "Trait", "description": "", "variable": "tra-focus+{0}", "title": "Focus+", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "group": "Trait", "description": "", "variable": "tra-material{0}", "title": "Material", "subGroup": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "group": "Trait", "description": "", "variable": "tra-simple{0}", "title": "Simple", "subGroup": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "group": "Trait", "description": "", "variable": "tra-volatile{0}", "title": "Volatile", "subGroup": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "group": "Trait", "description": "", "variable": "tra-vortex{0}", "title": "Vortex", "subGroup": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "group": "Trait", "description": "", "variable": "tra-weapon{0}", "title": "Weapon", "subGroup": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "group": "Trait", "description": "", "variable": "tra-wall{0}", "title": "Wall", "subGroup": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "group": "Trait", "description": "", "variable": "tra-arcing{0}", "title": "Arcing", "subGroup": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "group": "Trait", "description": "", "variable": "tra-shield{0}", "title": "Shield", "subGroup": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "group": "Trait", "description": "", "variable": "tra-thrown{0}", "title": "Thrown", "subGroup": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-handed", "group": "Trait", "description": "", "variable": "tra-two-handed{0}", "title": "Two-Handed", "subGroup": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "group": "Trait", "description": "", "variable": "tra-loud{0}", "title": "Loud", "subGroup": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "group": "Trait", "description": "", "variable": "tra-flammable{0}", "title": "Flammable", "subGroup": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "group": "Trait", "description": "", "variable": "tra-flexible{0}", "title": "Flexible", "subGroup": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "group": "Trait", "description": "", "variable": "tra-frozen{0}", "title": "Frozen", "subGroup": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "group": "Trait", "description": "", "variable": "tra-sharp{0}", "title": "Sharp", "subGroup": "Material Trait", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "group": "Trait", "description": "", "variable": "tra-sturdy{0}", "title": "Sturdy", "subGroup": "Material Trait", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "group": "Trait", "description": "", "variable": "tra-transparent{0}", "title": "Transparent", "subGroup": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Downed": {
				"name": "Status_Downed", "fieldName": "downed", "group": "Status", "description": "", "variable": "sts-downed{0}", "title": "Downed", "subGroup": "", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Engaged": {
				"name": "Status_Engaged", "fieldName": "engaged", "group": "Status", "description": "", "variable": "sts-engaged{0}", "title": "Engaged", "subGroup": "", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Ethereal": {
				"name": "Status_Ethereal", "fieldName": "ethereal", "group": "Status", "description": "", "variable": "sts-ethereal{0}", "title": "Ethereal", "subGroup": "", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Grappled": {
				"name": "Status_Grappled", "fieldName": "grappled", "group": "Status", "description": "", "variable": "sts-grappled{0}", "title": "Grappled", "subGroup": "", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Hidden": {
				"name": "Status_Hidden", "fieldName": "hidden", "group": "Status", "description": "", "variable": "sts-hidden{0}", "title": "Hidden", "subGroup": "", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Initiative Penalty": {
				"name": "Status_Initiative Penalty", "fieldName": "initiative_penalty", "group": "Status", "description": "", "variable": "sts-initiative_penalty{0}", "title": "Initiative Penalty", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Invisible": {
				"name": "Status_Invisible", "fieldName": "invisible", "group": "Status", "description": "", "variable": "sts-invisible{0}", "title": "Invisible", "subGroup": "", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Restrained": {
				"name": "Status_Restrained", "fieldName": "restrained", "group": "Status", "description": "", "variable": "sts-restrained{0}", "title": "Restrained", "subGroup": "", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Unconscious": {
				"name": "Status_Unconscious", "fieldName": "unconscious", "group": "Status", "description": "", "variable": "sts-unconscious{0}", "title": "Unconscious", "subGroup": "", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Aflame": {
				"name": "Condition_Aflame", "fieldName": "aflame", "group": "Condition", "description": "", "variable": "cnd-aflame{0}", "title": "Aflame", "subGroup": "", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Angered": {
				"name": "Condition_Angered", "fieldName": "angered", "group": "Condition", "description": "", "variable": "cnd-angered{0}", "title": "Angered", "subGroup": "", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Chilled": {
				"name": "Condition_Chilled", "fieldName": "chilled", "group": "Condition", "description": "", "variable": "cnd-chilled{0}", "title": "Chilled", "subGroup": "", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Delayed": {
				"name": "Condition_Delayed", "fieldName": "delayed", "group": "Condition", "description": "", "variable": "cnd-delayed{0}", "title": "Delayed", "subGroup": "", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Disgusted": {
				"name": "Condition_Disgusted", "fieldName": "disgusted", "group": "Condition", "description": "", "variable": "cnd-disgusted{0}", "title": "Disgusted", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Dying": {
				"name": "Condition_Dying", "fieldName": "dying", "group": "Condition", "description": "", "variable": "cnd-dying{0}", "title": "Dying", "subGroup": "", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Empowered": {
				"name": "Condition_Empowered", "fieldName": "empowered", "group": "Condition", "description": "", "variable": "cnd-empowered{0}", "title": "Empowered", "subGroup": "", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encouraged": {
				"name": "Condition_Encouraged", "fieldName": "encouraged", "group": "Condition", "description": "", "variable": "cnd-encouraged{0}", "title": "Encouraged", "subGroup": "", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encumbered": {
				"name": "Condition_Encumbered", "fieldName": "encumbered", "group": "Condition", "description": "", "variable": "cnd-encumbered{0}", "title": "Encumbered", "subGroup": "", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Frightened": {
				"name": "Condition_Frightened", "fieldName": "frightened", "group": "Condition", "description": "", "variable": "cnd-frightened{0}", "title": "Frightened", "subGroup": "", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Hasted": {
				"name": "Condition_Hasted", "fieldName": "hasted", "group": "Condition", "description": "", "variable": "cnd-hasted{0}", "title": "Hasted", "subGroup": "", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Immobilized": {
				"name": "Condition_Immobilized", "fieldName": "immobilized", "group": "Condition", "description": "", "variable": "cnd-immobilized{0}", "title": "Immobilized", "subGroup": "", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Impaired": {
				"name": "Condition_Impaired", "fieldName": "impaired", "group": "Condition", "description": "", "variable": "cnd-impaired{0}", "title": "Impaired", "subGroup": "", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Joyful": {
				"name": "Condition_Joyful", "fieldName": "joyful", "group": "Condition", "description": "", "variable": "cnd-joyful{0}", "title": "Joyful", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Launched": {
				"name": "Condition_Launched", "fieldName": "launched", "group": "Condition", "description": "", "variable": "cnd-launched{0}", "title": "Launched", "subGroup": "", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Paralyzed": {
				"name": "Condition_Paralyzed", "fieldName": "paralyzed", "group": "Condition", "description": "", "variable": "cnd-paralyzed{0}", "title": "Paralyzed", "subGroup": "", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Prone": {
				"name": "Condition_Prone", "fieldName": "prone", "group": "Condition", "description": "", "variable": "cnd-prone{0}", "title": "Prone", "subGroup": "", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Saddened": {
				"name": "Condition_Saddened", "fieldName": "saddened", "group": "Condition", "description": "", "variable": "cnd-saddened{0}", "title": "Saddened", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Sickened": {
				"name": "Condition_Sickened", "fieldName": "sickened", "group": "Condition", "description": "", "variable": "cnd-sickened{0}", "title": "Sickened", "subGroup": "", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Staggered": {
				"name": "Condition_Staggered", "fieldName": "staggered", "group": "Condition", "description": "", "variable": "cnd-staggered{0}", "title": "Staggered", "subGroup": "", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Stunned": {
				"name": "Condition_Stunned", "fieldName": "stunned", "group": "Condition", "description": "", "variable": "cnd-stunned{0}", "title": "Stunned", "subGroup": "", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Surprised": {
				"name": "Condition_Surprised", "fieldName": "surprised", "group": "Condition", "description": "", "variable": "cnd-surprised{0}", "title": "Surprised", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Basic Set": {
				"name": "Style_Basic Set", "fieldName": "basic_set", "group": "Style", "description": "", "variable": "sty-basic_set{0}", "title": "Basic Set", "subGroup": "", "descriptions": ["A standard list of techniques. Anyone can perform these techniques. "],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "swordplay", "group": "Style", "description": "", "variable": "sty-swordplay{0}", "title": "Swordplay", "subGroup": "", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "ki_extension", "group": "Style", "description": "", "variable": "sty-ki_extension{0}", "title": "Ki Extension", "subGroup": "", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "group": "Skill", "description": "", "variable": "skl-acrobatics{0}", "title": "Acrobatics", "subGroup": "", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "group": "Skill", "description": "", "variable": "skl-agility{0}", "title": "Agility", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "group": "Skill", "description": "", "variable": "skl-analyze{0}", "title": "Analyze", "subGroup": "", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "group": "Skill", "description": "", "variable": "skl-build{0}", "title": "Build", "subGroup": "", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "group": "Skill", "description": "", "variable": "skl-channel{0}", "title": "Channel", "subGroup": "", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "group": "Skill", "description": "", "variable": "skl-charm{0}", "title": "Charm", "subGroup": "", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "group": "Skill", "description": "", "variable": "skl-command{0}", "title": "Command", "subGroup": "", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "group": "Skill", "description": "", "variable": "skl-concoct{0}", "title": "Concoct", "subGroup": "", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "group": "Skill", "description": "", "variable": "skl-cook{0}", "title": "Cook", "subGroup": "", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "group": "Skill", "description": "", "variable": "skl-deception{0}", "title": "Deception", "subGroup": "", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "group": "Skill", "description": "", "variable": "skl-disguise{0}", "title": "Disguise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "group": "Skill", "description": "", "variable": "skl-empathy{0}", "title": "Empathy", "subGroup": "", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "group": "Skill", "description": "", "variable": "skl-enchant{0}", "title": "Enchant", "subGroup": "", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "group": "Skill", "description": "", "variable": "skl-finesse{0}", "title": "Finesse", "subGroup": "", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "group": "Skill", "description": "", "variable": "skl-flexibility{0}", "title": "Flexibility", "subGroup": "", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "group": "Skill", "description": "", "variable": "skl-grappling{0}", "title": "Grappling", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "group": "Skill", "description": "", "variable": "skl-heal{0}", "title": "Heal", "subGroup": "", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "group": "Skill", "description": "", "variable": "skl-intimidation{0}", "title": "Intimidation", "subGroup": "", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "group": "Skill", "description": "", "variable": "skl-leadership{0}", "title": "Leadership", "subGroup": "", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "group": "Skill", "description": "", "variable": "skl-maneuver{0}", "title": "Maneuver", "subGroup": "", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "group": "Skill", "description": "", "variable": "skl-medicine{0}", "title": "Medicine", "subGroup": "", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "group": "Skill", "description": "", "variable": "skl-might{0}", "title": "Might", "subGroup": "", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "group": "Skill", "description": "", "variable": "skl-negotiation{0}", "title": "Negotiation", "subGroup": "", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "group": "Skill", "description": "", "variable": "skl-palming{0}", "title": "Palming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "group": "Skill", "description": "", "variable": "skl-physique{0}", "title": "Physique", "subGroup": "", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "group": "Skill", "description": "", "variable": "skl-pilot{0}", "title": "Pilot", "subGroup": "", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "group": "Skill", "description": "", "variable": "skl-resonance{0}", "title": "Resonance", "subGroup": "", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "group": "Skill", "description": "", "variable": "skl-search{0}", "title": "Search", "subGroup": "", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "group": "Skill", "description": "", "variable": "skl-shoot{0}", "title": "Shoot", "subGroup": "", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "group": "Skill", "description": "", "variable": "skl-skirmish{0}", "title": "Skirmish", "subGroup": "", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "group": "Skill", "description": "", "variable": "skl-sneak{0}", "title": "Sneak", "subGroup": "", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "group": "Skill", "description": "", "variable": "skl-survival{0}", "title": "Survival", "subGroup": "", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "group": "Skill", "description": "", "variable": "skl-throw{0}", "title": "Throw", "subGroup": "", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "group": "Skill", "description": "", "variable": "skl-tinker{0}", "title": "Tinker", "subGroup": "", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "group": "Skill", "description": "", "variable": "skl-traversal{0}", "title": "Traversal", "subGroup": "", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Language_Minere": {
				"name": "Language_Minere", "fieldName": "minere", "group": "Language", "description": "", "variable": "lng-minere{0}", "title": "Minere", "subGroup": "", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Junal": {
				"name": "Language_Junal", "fieldName": "junal", "group": "Language", "description": "", "variable": "lng-junal{0}", "title": "Junal", "subGroup": "", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Apollen": {
				"name": "Language_Apollen", "fieldName": "apollen", "group": "Language", "description": "", "variable": "lng-apollen{0}", "title": "Apollen", "subGroup": "", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Lib": {
				"name": "Language_Lib", "fieldName": "lib", "group": "Language", "description": "", "variable": "lng-lib{0}", "title": "Lib", "subGroup": "", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Cert": {
				"name": "Language_Cert", "fieldName": "cert", "group": "Language", "description": "", "variable": "lng-cert{0}", "title": "Cert", "subGroup": "", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Byric": {
				"name": "Language_Byric", "fieldName": "byric", "group": "Language", "description": "", "variable": "lng-byric{0}", "title": "Byric", "subGroup": "", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Dustell": {
				"name": "Language_Dustell", "fieldName": "dustell", "group": "Language", "description": "", "variable": "lng-dustell{0}", "title": "Dustell", "subGroup": "", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Muralic": {
				"name": "Language_Muralic", "fieldName": "muralic", "group": "Language", "description": "", "variable": "lng-muralic{0}", "title": "Muralic", "subGroup": "", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shira": {
				"name": "Language_Shira", "fieldName": "shira", "group": "Language", "description": "", "variable": "lng-shira{0}", "title": "Shira", "subGroup": "", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Ciel": {
				"name": "Language_Ciel", "fieldName": "ciel", "group": "Language", "description": "", "variable": "lng-ciel{0}", "title": "Ciel", "subGroup": "", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Citeq": {
				"name": "Language_Citeq", "fieldName": "citeq", "group": "Language", "description": "", "variable": "lng-citeq{0}", "title": "Citeq", "subGroup": "", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Manstan": {
				"name": "Language_Manstan", "fieldName": "manstan", "group": "Language", "description": "", "variable": "lng-manstan{0}", "title": "Manstan", "subGroup": "", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Salkan": {
				"name": "Language_Salkan", "fieldName": "salkan", "group": "Language", "description": "", "variable": "lng-salkan{0}", "title": "Salkan", "subGroup": "", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Sansic": {
				"name": "Language_Sansic", "fieldName": "sansic", "group": "Language", "description": "", "variable": "lng-sansic{0}", "title": "Sansic", "subGroup": "", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Silq": {
				"name": "Language_Silq", "fieldName": "silq", "group": "Language", "description": "", "variable": "lng-silq{0}", "title": "Silq", "subGroup": "", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Kleikan": {
				"name": "Language_Kleikan", "fieldName": "kleikan", "group": "Language", "description": "", "variable": "lng-kleikan{0}", "title": "Kleikan", "subGroup": "", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Crinere": {
				"name": "Language_Crinere", "fieldName": "crinere", "group": "Language", "description": "", "variable": "lng-crinere{0}", "title": "Crinere", "subGroup": "", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Palmic": {
				"name": "Language_Palmic", "fieldName": "palmic", "group": "Language", "description": "", "variable": "lng-palmic{0}", "title": "Palmic", "subGroup": "", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shorespeak": {
				"name": "Language_Shorespeak", "fieldName": "shorespeak", "group": "Language", "description": "", "variable": "lng-shorespeak{0}", "title": "Shorespeak", "subGroup": "", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Verdeni": {
				"name": "Language_Verdeni", "fieldName": "verdeni", "group": "Language", "description": "", "variable": "lng-verdeni{0}", "title": "Verdeni", "subGroup": "", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Vulca": {
				"name": "Language_Vulca", "fieldName": "vulca", "group": "Language", "description": "", "variable": "lng-vulca{0}", "title": "Vulca", "subGroup": "", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Emotion": {
				"name": "Language_Emotion", "fieldName": "emotion", "group": "Language", "description": "", "variable": "lng-emotion{0}", "title": "Emotion", "subGroup": "", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Empathy": {
				"name": "Language_Empathy", "fieldName": "empathy", "group": "Language", "description": "", "variable": "lng-empathy{0}", "title": "Empathy", "subGroup": "", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Wolfwarg": {
				"name": "Language_Wolfwarg", "fieldName": "wolfwarg", "group": "Language", "description": "", "variable": "lng-wolfwarg{0}", "title": "Wolfwarg", "subGroup": "", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Jovean": {
				"name": "Language_Jovean", "fieldName": "jovean", "group": "Language", "description": "", "variable": "lng-jovean{0}", "title": "Jovean", "subGroup": "", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Mytikan": {
				"name": "Language_Mytikan", "fieldName": "mytikan", "group": "Language", "description": "", "variable": "lng-mytikan{0}", "title": "Mytikan", "subGroup": "", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Academics": {
				"name": "Lore_Academics", "fieldName": "academics", "group": "Lore", "description": "", "variable": "lor-academics{0}", "title": "Academics", "subGroup": "", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "group": "Lore", "description": "", "variable": "lor-health{0}", "title": "Health", "subGroup": "", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "group": "Lore", "description": "", "variable": "lor-mana{0}", "title": "Mana", "subGroup": "", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "group": "Lore", "description": "", "variable": "lor-mathematics{0}", "title": "Mathematics", "subGroup": "", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "group": "Lore", "description": "", "variable": "lor-nature{0}", "title": "Nature", "subGroup": "", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "group": "Lore", "description": "", "variable": "lor-school{0}", "title": "School", "subGroup": "", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "group": "Lore", "description": "", "variable": "lor-spirit{0}", "title": "Spirit", "subGroup": "", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "group": "Lore", "description": "", "variable": "lor-warfare{0}", "title": "Warfare", "subGroup": "", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "group": "Lore", "description": "", "variable": "lor-zoology{0}", "title": "Zoology", "subGroup": "", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Profession": {
				"name": "Lore_Profession", "fieldName": "profession", "group": "Lore", "description": "", "variable": "lor-profession{0}", "title": "Profession", "subGroup": "", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "group": "Lore", "description": "", "variable": "lor-farming{0}", "title": "Farming", "subGroup": "", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "group": "Lore", "description": "", "variable": "lor-fishing{0}", "title": "Fishing", "subGroup": "", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "group": "Lore", "description": "", "variable": "lor-hunting{0}", "title": "Hunting", "subGroup": "", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "group": "Lore", "description": "", "variable": "lor-legal{0}", "title": "Legal", "subGroup": "", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "group": "Lore", "description": "", "variable": "lor-mercantile{0}", "title": "Mercantile", "subGroup": "", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "group": "Lore", "description": "", "variable": "lor-mining{0}", "title": "Mining", "subGroup": "", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Craftmanship": {
				"name": "Lore_Craftmanship", "fieldName": "craftmanship", "group": "Lore", "description": "", "variable": "lor-craftmanship{0}", "title": "Craftmanship", "subGroup": "", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "group": "Lore", "description": "", "variable": "lor-alchemy{0}", "title": "Alchemy", "subGroup": "", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "group": "Lore", "description": "", "variable": "lor-architecture{0}", "title": "Architecture", "subGroup": "", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "group": "Lore", "description": "", "variable": "lor-brewing{0}", "title": "Brewing", "subGroup": "", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "group": "Lore", "description": "", "variable": "lor-cooking{0}", "title": "Cooking", "subGroup": "", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "group": "Lore", "description": "", "variable": "lor-engineering{0}", "title": "Engineering", "subGroup": "", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "group": "Lore", "description": "", "variable": "lor-glassblowing{0}", "title": "Glassblowing", "subGroup": "", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "group": "Lore", "description": "", "variable": "lor-leatherworking{0}", "title": "Leatherworking", "subGroup": "", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "group": "Lore", "description": "", "variable": "lor-sculpting{0}", "title": "Sculpting", "subGroup": "", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "group": "Lore", "description": "", "variable": "lor-smithing{0}", "title": "Smithing", "subGroup": "", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "group": "Lore", "description": "", "variable": "lor-weaving{0}", "title": "Weaving", "subGroup": "", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Geography": {
				"name": "Lore_Geography", "fieldName": "geography", "group": "Lore", "description": "", "variable": "lor-geography{0}", "title": "Geography", "subGroup": "", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "group": "Lore", "description": "", "variable": "lor-aridsha{0}", "title": "Aridsha", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "group": "Lore", "description": "", "variable": "lor-ceres{0}", "title": "Ceres", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "group": "Lore", "description": "", "variable": "lor-colswei{0}", "title": "Colswei", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "group": "Lore", "description": "", "variable": "lor-khem{0}", "title": "Khem", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "group": "Lore", "description": "", "variable": "lor-novus{0}", "title": "Novus", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "group": "Lore", "description": "", "variable": "lor-walthair{0}", "title": "Walthair", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "group": "Lore", "description": "", "variable": "lor-wayling{0}", "title": "Wayling", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "ethereal_plane", "group": "Lore", "description": "", "variable": "lor-ethereal_plane{0}", "title": "Ethereal Plane", "subGroup": "", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_History": {
				"name": "Lore_History", "fieldName": "history", "group": "Lore", "description": "", "variable": "lor-history{0}", "title": "History", "subGroup": "", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridsha_history", "group": "Lore", "description": "", "variable": "lor-aridsha_history{0}", "title": "Aridsha History", "subGroup": "", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceres_history", "group": "Lore", "description": "", "variable": "lor-ceres_history{0}", "title": "Ceres History", "subGroup": "", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colswei_history", "group": "Lore", "description": "", "variable": "lor-colswei_history{0}", "title": "Colswei History", "subGroup": "", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khem_history", "group": "Lore", "description": "", "variable": "lor-khem_history{0}", "title": "Khem History", "subGroup": "", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novus_history", "group": "Lore", "description": "", "variable": "lor-novus_history{0}", "title": "Novus History", "subGroup": "", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthair_history", "group": "Lore", "description": "", "variable": "lor-walthair_history{0}", "title": "Walthair History", "subGroup": "", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "wayling_history", "group": "Lore", "description": "", "variable": "lor-wayling_history{0}", "title": "Wayling History", "subGroup": "", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Culture": {
				"name": "Lore_Culture", "fieldName": "culture", "group": "Lore", "description": "", "variable": "lor-culture{0}", "title": "Culture", "subGroup": "", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "group": "Lore", "description": "", "variable": "lor-art{0}", "title": "Art", "subGroup": "", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "group": "Lore", "description": "", "variable": "lor-etiquette{0}", "title": "Etiquette", "subGroup": "", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "group": "Lore", "description": "", "variable": "lor-fashion{0}", "title": "Fashion", "subGroup": "", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "group": "Lore", "description": "", "variable": "lor-games{0}", "title": "Games", "subGroup": "", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "group": "Lore", "description": "", "variable": "lor-music{0}", "title": "Music", "subGroup": "", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "group": "Lore", "description": "", "variable": "lor-scribing{0}", "title": "Scribing", "subGroup": "", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "group": "Lore", "description": "", "variable": "lor-theater{0}", "title": "Theater", "subGroup": "", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Religion": {
				"name": "Lore_Religion", "fieldName": "religion", "group": "Lore", "description": "", "variable": "lor-religion{0}", "title": "Religion", "subGroup": "", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "church_of_kongkwei", "group": "Lore", "description": "", "variable": "lor-church_of_kongkwei{0}", "title": "Church of Kongkwei", "subGroup": "", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "group": "Lore", "description": "", "variable": "lor-guidance{0}", "title": "Guidance", "subGroup": "", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life's_circle", "group": "Lore", "description": "", "variable": "lor-life's_circle{0}", "title": "Life's Circle", "subGroup": "", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "ocean_court", "group": "Lore", "description": "", "variable": "lor-ocean_court{0}", "title": "Ocean Court", "subGroup": "", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "group": "Lore", "description": "", "variable": "lor-sylvan{0}", "title": "Sylvan", "subGroup": "", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "group": "Lore", "description": "", "variable": "lor-zushaon{0}", "title": "Zushaon", "subGroup": "", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Trainee": {
				"name": "Job_Trainee", "fieldName": "trainee", "group": "Job", "description": "", "variable": "job-trainee{0}", "title": "Trainee", "subGroup": "", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "interceptor", "group": "Job", "description": "", "variable": "job-interceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "guardian", "group": "Job", "description": "", "variable": "job-guardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "spellslinger", "group": "Job", "description": "", "variable": "job-spellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "warrior", "group": "Job", "description": "", "variable": "job-warrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "rogue", "group": "Job", "description": "", "variable": "job-rogue{0}", "title": "Rogue", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "scholar", "group": "Job", "description": "", "variable": "job-scholar{0}", "title": "Scholar", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "physician", "group": "Job", "description": "", "variable": "job-physician{0}", "title": "Physician", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Role_Generalist": {
				"name": "Role_Generalist", "fieldName": "generalist", "group": "Role", "description": "", "variable": "rol-generalist{0}", "title": "Generalist", "subGroup": "", "descriptions": ["Very general"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Defender": {
				"name": "Role_Defender", "fieldName": "defender", "group": "Role", "description": "", "variable": "rol-defender{0}", "title": "Defender", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Athlete": {
				"name": "Role_Athlete", "fieldName": "athlete", "group": "Role", "description": "", "variable": "rol-athlete{0}", "title": "Athlete", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Skirmisher": {
				"name": "Role_Skirmisher", "fieldName": "skirmisher", "group": "Role", "description": "", "variable": "rol-skirmisher{0}", "title": "Skirmisher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Marksman": {
				"name": "Role_Marksman", "fieldName": "marksman", "group": "Role", "description": "", "variable": "rol-marksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Break Free": {
				"name": "Technique_Break Free", "fieldName": "break_free", "group": "Technique", "description": "", "variable": "tch-break_free{0}", "title": "Break Free", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dash": {
				"name": "Technique_Dash", "fieldName": "dash", "group": "Technique", "description": "", "variable": "tch-dash{0}", "title": "Dash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Escape": {
				"name": "Technique_Escape", "fieldName": "escape", "group": "Technique", "description": "", "variable": "tch-escape{0}", "title": "Escape", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Grapple": {
				"name": "Technique_Grapple", "fieldName": "grapple", "group": "Technique", "description": "", "variable": "tch-grapple{0}", "title": "Grapple", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hide": {
				"name": "Technique_Hide", "fieldName": "hide", "group": "Technique", "description": "", "variable": "tch-hide{0}", "title": "Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Mount": {
				"name": "Technique_Mount", "fieldName": "mount", "group": "Technique", "description": "", "variable": "tch-mount{0}", "title": "Mount", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Prepare": {
				"name": "Technique_Prepare", "fieldName": "prepare", "group": "Technique", "description": "", "variable": "tch-prepare{0}", "title": "Prepare", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Reposition": {
				"name": "Technique_Reposition", "fieldName": "reposition", "group": "Technique", "description": "", "variable": "tch-reposition{0}", "title": "Reposition", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Seach": {
				"name": "Technique_Seach", "fieldName": "seach", "group": "Technique", "description": "", "variable": "tch-seach{0}", "title": "Seach", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Aid": {
				"name": "Technique_Aid", "fieldName": "aid", "group": "Technique", "description": "", "variable": "tch-aid{0}", "title": "Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Encourage": {
				"name": "Technique_Encourage", "fieldName": "encourage", "group": "Technique", "description": "", "variable": "tch-encourage{0}", "title": "Encourage", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stabilize": {
				"name": "Technique_Stabilize", "fieldName": "stabilize", "group": "Technique", "description": "", "variable": "tch-stabilize{0}", "title": "Stabilize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skill Check": {
				"name": "Technique_Skill Check", "fieldName": "skill_check", "group": "Technique", "description": "", "variable": "tch-skill_check{0}", "title": "Skill Check", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Unarmed Strike": {
				"name": "Technique_Unarmed Strike", "fieldName": "unarmed_strike", "group": "Technique", "description": "", "variable": "tch-unarmed_strike{0}", "title": "Unarmed Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Build Rapport": {
				"name": "Technique_Build Rapport", "fieldName": "build_rapport", "group": "Technique", "description": "", "variable": "tch-build_rapport{0}", "title": "Build Rapport", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Build Pressure": {
				"name": "Technique_Build Pressure", "fieldName": "build_pressure", "group": "Technique", "description": "", "variable": "tch-build_pressure{0}", "title": "Build Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Captivate": {
				"name": "Technique_Captivate", "fieldName": "captivate", "group": "Technique", "description": "", "variable": "tch-captivate{0}", "title": "Captivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Demand": {
				"name": "Technique_Demand", "fieldName": "demand", "group": "Technique", "description": "", "variable": "tch-demand{0}", "title": "Demand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Grab an Edge": {
				"name": "Technique_Grab an Edge", "fieldName": "grab_an_edge", "group": "Technique", "description": "", "variable": "tch-grab_an_edge{0}", "title": "Grab an Edge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Interact": {
				"name": "Technique_Interact", "fieldName": "interact", "group": "Technique", "description": "", "variable": "tch-interact{0}", "title": "Interact", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Second Wind": {
				"name": "Technique_Second Wind", "fieldName": "second_wind", "group": "Technique", "description": "", "variable": "tch-second_wind{0}", "title": "Second Wind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Second Breath": {
				"name": "Technique_Second Breath", "fieldName": "second_breath", "group": "Technique", "description": "", "variable": "tch-second_breath{0}", "title": "Second Breath", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undaunted": {
				"name": "Technique_Undaunted", "fieldName": "undaunted", "group": "Technique", "description": "", "variable": "tch-undaunted{0}", "title": "Undaunted", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Preemptive Strike": {
				"name": "Technique_Preemptive Strike", "fieldName": "preemptive_strike", "group": "Technique", "description": "", "variable": "tch-preemptive_strike{0}", "title": "Preemptive Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Preemptive Stagger": {
				"name": "Technique_Preemptive Stagger", "fieldName": "preemptive_stagger", "group": "Technique", "description": "", "variable": "tch-preemptive_stagger{0}", "title": "Preemptive Stagger", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Critical Maim": {
				"name": "Technique_Critical Maim", "fieldName": "critical_maim", "group": "Technique", "description": "", "variable": "tch-critical_maim{0}", "title": "Critical Maim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spellshot": {
				"name": "Technique_Spellshot", "fieldName": "spellshot", "group": "Technique", "description": "", "variable": "tch-spellshot{0}", "title": "Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Follow-Up Spellshot": {
				"name": "Technique_Follow-Up Spellshot", "fieldName": "follow-up_spellshot", "group": "Technique", "description": "", "variable": "tch-follow-up_spellshot{0}", "title": "Follow-Up Spellshot", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bursting Spellshot": {
				"name": "Technique_Bursting Spellshot", "fieldName": "bursting_spellshot", "group": "Technique", "description": "", "variable": "tch-bursting_spellshot{0}", "title": "Bursting Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Savior": {
				"name": "Technique_Savior", "fieldName": "savior", "group": "Technique", "description": "", "variable": "tch-savior{0}", "title": "Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knock Away Savior": {
				"name": "Technique_Knock Away Savior", "fieldName": "knock_away_savior", "group": "Technique", "description": "", "variable": "tch-knock_away_savior{0}", "title": "Knock Away Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Savior's Retaliation": {
				"name": "Technique_Savior's Retaliation", "fieldName": "savior's_retaliation", "group": "Technique", "description": "", "variable": "tch-savior's_retaliation{0}", "title": "Savior's Retaliation", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spellstrike": {
				"name": "Technique_Spellstrike", "fieldName": "spellstrike", "group": "Technique", "description": "", "variable": "tch-spellstrike{0}", "title": "Spellstrike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Skirmish": {
				"name": "Technique_Power Skirmish", "fieldName": "power_skirmish", "group": "Technique", "description": "", "variable": "tch-power_skirmish{0}", "title": "Power Skirmish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sneak Attack": {
				"name": "Technique_Sneak Attack", "fieldName": "sneak_attack", "group": "Technique", "description": "", "variable": "tch-sneak_attack{0}", "title": "Sneak Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sneaky Follow-Up": {
				"name": "Technique_Sneaky Follow-Up", "fieldName": "sneaky_follow-up", "group": "Technique", "description": "", "variable": "tch-sneaky_follow-up{0}", "title": "Sneaky Follow-Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Assassinate": {
				"name": "Technique_Assassinate", "fieldName": "assassinate", "group": "Technique", "description": "", "variable": "tch-assassinate{0}", "title": "Assassinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Emergency Care": {
				"name": "Technique_Emergency Care", "fieldName": "emergency_care", "group": "Technique", "description": "", "variable": "tch-emergency_care{0}", "title": "Emergency Care", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Nightingale": {
				"name": "Technique_Nightingale", "fieldName": "nightingale", "group": "Technique", "description": "", "variable": "tch-nightingale{0}", "title": "Nightingale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Rhapsody": {
				"name": "Technique_Rhapsody", "fieldName": "rhapsody", "group": "Technique", "description": "", "variable": "tch-rhapsody{0}", "title": "Rhapsody", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Metamagic": {
				"name": "Technique_Metamagic", "fieldName": "metamagic", "group": "Technique", "description": "", "variable": "tch-metamagic{0}", "title": "Metamagic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Strategize": {
				"name": "Technique_Strategize", "fieldName": "strategize", "group": "Technique", "description": "", "variable": "tch-strategize{0}", "title": "Strategize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Foresight": {
				"name": "Technique_Foresight", "fieldName": "foresight", "group": "Technique", "description": "", "variable": "tch-foresight{0}", "title": "Foresight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Saw That Coming": {
				"name": "Technique_Saw That Coming", "fieldName": "saw_that_coming", "group": "Technique", "description": "", "variable": "tch-saw_that_coming{0}", "title": "Saw That Coming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_As You May Recall": {
				"name": "Technique_As You May Recall", "fieldName": "as_you_may_recall", "group": "Technique", "description": "", "variable": "tch-as_you_may_recall{0}", "title": "As You May Recall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Generalist": {
				"name": "Technique_Generalist", "fieldName": "generalist", "group": "Technique", "description": "", "variable": "tch-generalist{0}", "title": "Generalist", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender": {
				"name": "Technique_Defender", "fieldName": "defender", "group": "Technique", "description": "", "variable": "tch-defender{0}", "title": "Defender", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender II": {
				"name": "Technique_Defender II", "fieldName": "defender_ii", "group": "Technique", "description": "", "variable": "tch-defender_ii{0}", "title": "Defender II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Will": {
				"name": "Technique_Defender's Will", "fieldName": "defender's_will", "group": "Technique", "description": "", "variable": "tch-defender's_will{0}", "title": "Defender's Will", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Taunt": {
				"name": "Technique_Defender's Taunt", "fieldName": "defender's_taunt", "group": "Technique", "description": "", "variable": "tch-defender's_taunt{0}", "title": "Defender's Taunt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Recovery": {
				"name": "Technique_Defender's Recovery", "fieldName": "defender's_recovery", "group": "Technique", "description": "", "variable": "tch-defender's_recovery{0}", "title": "Defender's Recovery", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher": {
				"name": "Technique_Skirmisher", "fieldName": "skirmisher", "group": "Technique", "description": "", "variable": "tch-skirmisher{0}", "title": "Skirmisher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher II": {
				"name": "Technique_Skirmisher II", "fieldName": "skirmisher_ii", "group": "Technique", "description": "", "variable": "tch-skirmisher_ii{0}", "title": "Skirmisher II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher's Step": {
				"name": "Technique_Skirmisher's Step", "fieldName": "skirmisher's_step", "group": "Technique", "description": "", "variable": "tch-skirmisher's_step{0}", "title": "Skirmisher's Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher's Strike": {
				"name": "Technique_Skirmisher's Strike", "fieldName": "skirmisher's_strike", "group": "Technique", "description": "", "variable": "tch-skirmisher's_strike{0}", "title": "Skirmisher's Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman": {
				"name": "Technique_Marksman", "fieldName": "marksman", "group": "Technique", "description": "", "variable": "tch-marksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman II": {
				"name": "Technique_Marksman II", "fieldName": "marksman_ii", "group": "Technique", "description": "", "variable": "tch-marksman_ii{0}", "title": "Marksman II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Longshot": {
				"name": "Technique_Marksman's Longshot", "fieldName": "marksman's_longshot", "group": "Technique", "description": "", "variable": "tch-marksman's_longshot{0}", "title": "Marksman's Longshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Sight": {
				"name": "Technique_Marksman's Sight", "fieldName": "marksman's_sight", "group": "Technique", "description": "", "variable": "tch-marksman's_sight{0}", "title": "Marksman's Sight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Strike": {
				"name": "Technique_Marksman's Strike", "fieldName": "marksman's_strike", "group": "Technique", "description": "", "variable": "tch-marksman's_strike{0}", "title": "Marksman's Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete": {
				"name": "Technique_Athlete", "fieldName": "athlete", "group": "Technique", "description": "", "variable": "tch-athlete{0}", "title": "Athlete", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete II": {
				"name": "Technique_Athlete II", "fieldName": "athlete_ii", "group": "Technique", "description": "", "variable": "tch-athlete_ii{0}", "title": "Athlete II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete's Sprint": {
				"name": "Technique_Athlete's Sprint", "fieldName": "athlete's_sprint", "group": "Technique", "description": "", "variable": "tch-athlete's_sprint{0}", "title": "Athlete's Sprint", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete's Reach": {
				"name": "Technique_Athlete's Reach", "fieldName": "athlete's_reach", "group": "Technique", "description": "", "variable": "tch-athlete's_reach{0}", "title": "Athlete's Reach", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bounding Sprint": {
				"name": "Technique_Bounding Sprint", "fieldName": "bounding_sprint", "group": "Technique", "description": "", "variable": "tch-bounding_sprint{0}", "title": "Bounding Sprint", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skulk Away": {
				"name": "Technique_Skulk Away", "fieldName": "skulk_away", "group": "Technique", "description": "", "variable": "tch-skulk_away{0}", "title": "Skulk Away", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skulk Then Hide": {
				"name": "Technique_Skulk Then Hide", "fieldName": "skulk_then_hide", "group": "Technique", "description": "", "variable": "tch-skulk_then_hide{0}", "title": "Skulk Then Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_First Aid": {
				"name": "Technique_First Aid", "fieldName": "first_aid", "group": "Technique", "description": "", "variable": "tch-first_aid{0}", "title": "First Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleansing Aid": {
				"name": "Technique_Cleansing Aid", "fieldName": "cleansing_aid", "group": "Technique", "description": "", "variable": "tch-cleansing_aid{0}", "title": "Cleansing Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Environmental Awareness": {
				"name": "Technique_Environmental Awareness", "fieldName": "environmental_awareness", "group": "Technique", "description": "", "variable": "tch-environmental_awareness{0}", "title": "Environmental Awareness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Eclectic Knowledge": {
				"name": "Technique_Eclectic Knowledge", "fieldName": "eclectic_knowledge", "group": "Technique", "description": "", "variable": "tch-eclectic_knowledge{0}", "title": "Eclectic Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Point of Clarity": {
				"name": "Technique_Point of Clarity", "fieldName": "point_of_clarity", "group": "Technique", "description": "", "variable": "tch-point_of_clarity{0}", "title": "Point of Clarity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Pole Vault": {
				"name": "Technique_Pole Vault", "fieldName": "pole_vault", "group": "Technique", "description": "", "variable": "tch-pole_vault{0}", "title": "Pole Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Draw": {
				"name": "Technique_Quick Draw", "fieldName": "quick_draw", "group": "Technique", "description": "", "variable": "tch-quick_draw{0}", "title": "Quick Draw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extension Strike": {
				"name": "Technique_Extension Strike", "fieldName": "extension_strike", "group": "Technique", "description": "", "variable": "tch-extension_strike{0}", "title": "Extension Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Step Extension": {
				"name": "Technique_Step Extension", "fieldName": "step_extension", "group": "Technique", "description": "", "variable": "tch-step_extension{0}", "title": "Step Extension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lasting Extension": {
				"name": "Technique_Lasting Extension", "fieldName": "lasting_extension", "group": "Technique", "description": "", "variable": "tch-lasting_extension{0}", "title": "Lasting Extension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Far Strike": {
				"name": "Technique_Far Strike", "fieldName": "far_strike", "group": "Technique", "description": "", "variable": "tch-far_strike{0}", "title": "Far Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extension Strike +": {
				"name": "Technique_Extension Strike +", "fieldName": "extension_strike_+", "group": "Technique", "description": "", "variable": "tch-extension_strike_+{0}", "title": "Extension Strike +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Slash": {
				"name": "Technique_Quick Slash", "fieldName": "quick_slash", "group": "Technique", "description": "", "variable": "tch-quick_slash{0}", "title": "Quick Slash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Precision Blade": {
				"name": "Technique_Precision Blade", "fieldName": "precision_blade", "group": "Technique", "description": "", "variable": "tch-precision_blade{0}", "title": "Precision Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Armor Piercer": {
				"name": "Technique_Armor Piercer", "fieldName": "armor_piercer", "group": "Technique", "description": "", "variable": "tch-armor_piercer{0}", "title": "Armor Piercer", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Slash II": {
				"name": "Technique_Quick Slash II", "fieldName": "quick_slash_ii", "group": "Technique", "description": "", "variable": "tch-quick_slash_ii{0}", "title": "Quick Slash II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleave": {
				"name": "Technique_Cleave", "fieldName": "cleave", "group": "Technique", "description": "", "variable": "tch-cleave{0}", "title": "Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Crushing Blade": {
				"name": "Technique_Crushing Blade", "fieldName": "crushing_blade", "group": "Technique", "description": "", "variable": "tch-crushing_blade{0}", "title": "Crushing Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Cleave": {
				"name": "Technique_Great Cleave", "fieldName": "great_cleave", "group": "Technique", "description": "", "variable": "tch-great_cleave{0}", "title": "Great Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleave +": {
				"name": "Technique_Cleave +", "fieldName": "cleave_+", "group": "Technique", "description": "", "variable": "tch-cleave_+{0}", "title": "Cleave +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sudden Cleave": {
				"name": "Technique_Sudden Cleave", "fieldName": "sudden_cleave", "group": "Technique", "description": "", "variable": "tch-sudden_cleave{0}", "title": "Sudden Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Cleave II": {
				"name": "Technique_Great Cleave II", "fieldName": "great_cleave_ii", "group": "Technique", "description": "", "variable": "tch-great_cleave_ii{0}", "title": "Great Cleave II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Flex": {
				"name": "Technique_Power Flex", "fieldName": "power_flex", "group": "Technique", "description": "", "variable": "tch-power_flex{0}", "title": "Power Flex", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Crush Knuckle": {
				"name": "Technique_Crush Knuckle", "fieldName": "crush_knuckle", "group": "Technique", "description": "", "variable": "tch-crush_knuckle{0}", "title": "Crush Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Impact Knuckle": {
				"name": "Technique_Impact Knuckle", "fieldName": "impact_knuckle", "group": "Technique", "description": "", "variable": "tch-impact_knuckle{0}", "title": "Impact Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knuckle Flurry": {
				"name": "Technique_Knuckle Flurry", "fieldName": "knuckle_flurry", "group": "Technique", "description": "", "variable": "tch-knuckle_flurry{0}", "title": "Knuckle Flurry", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Water Blast": {
				"name": "Technique_Water Blast", "fieldName": "water_blast", "group": "Technique", "description": "", "variable": "tch-water_blast{0}", "title": "Water Blast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Geyser": {
				"name": "Technique_Geyser", "fieldName": "geyser", "group": "Technique", "description": "", "variable": "tch-geyser{0}", "title": "Geyser", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Geyser Line": {
				"name": "Technique_Geyser Line", "fieldName": "geyser_line", "group": "Technique", "description": "", "variable": "tch-geyser_line{0}", "title": "Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surf": {
				"name": "Technique_Surf", "fieldName": "surf", "group": "Technique", "description": "", "variable": "tch-surf{0}", "title": "Surf", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Geyser Line": {
				"name": "Technique_Great Geyser Line", "fieldName": "great_geyser_line", "group": "Technique", "description": "", "variable": "tch-great_geyser_line{0}", "title": "Great Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tidal Wave": {
				"name": "Technique_Tidal Wave", "fieldName": "tidal_wave", "group": "Technique", "description": "", "variable": "tch-tidal_wave{0}", "title": "Tidal Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Surge": {
				"name": "Technique_Sand Surge", "fieldName": "sand_surge", "group": "Technique", "description": "", "variable": "tch-sand_surge{0}", "title": "Sand Surge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Spout": {
				"name": "Technique_Sand Spout", "fieldName": "sand_spout", "group": "Technique", "description": "", "variable": "tch-sand_spout{0}", "title": "Sand Spout", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Wave": {
				"name": "Technique_Sand Wave", "fieldName": "sand_wave", "group": "Technique", "description": "", "variable": "tch-sand_wave{0}", "title": "Sand Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Launcher": {
				"name": "Technique_Sand Launcher", "fieldName": "sand_launcher", "group": "Technique", "description": "", "variable": "tch-sand_launcher{0}", "title": "Sand Launcher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sicken": {
				"name": "Technique_Sicken", "fieldName": "sicken", "group": "Technique", "description": "", "variable": "tch-sicken{0}", "title": "Sicken", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spores": {
				"name": "Technique_Spores", "fieldName": "spores", "group": "Technique", "description": "", "variable": "tch-spores{0}", "title": "Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sickening Cloud": {
				"name": "Technique_Sickening Cloud", "fieldName": "sickening_cloud", "group": "Technique", "description": "", "variable": "tch-sickening_cloud{0}", "title": "Sickening Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Virulent Spores": {
				"name": "Technique_Virulent Spores", "fieldName": "virulent_spores", "group": "Technique", "description": "", "variable": "tch-virulent_spores{0}", "title": "Virulent Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"]
				,
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Firebolt": {
				"name": "Technique_Firebolt", "fieldName": "firebolt", "group": "Technique", "description": "", "variable": "tch-firebolt{0}", "title": "Firebolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Flame Arrow": {
				"name": "Technique_Flame Arrow", "fieldName": "flame_arrow", "group": "Technique", "description": "", "variable": "tch-flame_arrow{0}", "title": "Flame Arrow", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fireball": {
				"name": "Technique_Fireball", "fieldName": "fireball", "group": "Technique", "description": "", "variable": "tch-fireball{0}", "title": "Fireball", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fireblast": {
				"name": "Technique_Fireblast", "fieldName": "fireblast", "group": "Technique", "description": "", "variable": "tch-fireblast{0}", "title": "Fireblast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ragnarok": {
				"name": "Technique_Ragnarok", "fieldName": "ragnarok", "group": "Technique", "description": "", "variable": "tch-ragnarok{0}", "title": "Ragnarok", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bonfire": {
				"name": "Technique_Bonfire", "fieldName": "bonfire", "group": "Technique", "description": "", "variable": "tch-bonfire{0}", "title": "Bonfire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wall of Fire": {
				"name": "Technique_Wall of Fire", "fieldName": "wall_of_fire", "group": "Technique", "description": "", "variable": "tch-wall_of_fire{0}", "title": "Wall of Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Field of Flame": {
				"name": "Technique_Field of Flame", "fieldName": "field_of_flame", "group": "Technique", "description": "", "variable": "tch-field_of_flame{0}", "title": "Field of Flame", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lightning Shaft": {
				"name": "Technique_Lightning Shaft", "fieldName": "lightning_shaft", "group": "Technique", "description": "", "variable": "tch-lightning_shaft{0}", "title": "Lightning Shaft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shock": {
				"name": "Technique_Shock", "fieldName": "shock", "group": "Technique", "description": "", "variable": "tch-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lightning Bolt": {
				"name": "Technique_Lightning Bolt", "fieldName": "lightning_bolt", "group": "Technique", "description": "", "variable": "tch-lightning_bolt{0}", "title": "Lightning Bolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Plasma Arc": {
				"name": "Technique_Plasma Arc", "fieldName": "plasma_arc", "group": "Technique", "description": "", "variable": "tch-plasma_arc{0}", "title": "Plasma Arc", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fulgor": {
				"name": "Technique_Fulgor", "fieldName": "fulgor", "group": "Technique", "description": "", "variable": "tch-fulgor{0}", "title": "Fulgor", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Snap": {
				"name": "Technique_Cold Snap", "fieldName": "cold_snap", "group": "Technique", "description": "", "variable": "tch-cold_snap{0}", "title": "Cold Snap", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Frostbite": {
				"name": "Technique_Frostbite", "fieldName": "frostbite", "group": "Technique", "description": "", "variable": "tch-frostbite{0}", "title": "Frostbite", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Freezebind": {
				"name": "Technique_Freezebind", "fieldName": "freezebind", "group": "Technique", "description": "", "variable": "tch-freezebind{0}", "title": "Freezebind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Burst": {
				"name": "Technique_Cold Burst", "fieldName": "cold_burst", "group": "Technique", "description": "", "variable": "tch-cold_burst{0}", "title": "Cold Burst", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Front": {
				"name": "Technique_Cold Front", "fieldName": "cold_front", "group": "Technique", "description": "", "variable": "tch-cold_front{0}", "title": "Cold Front", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Diamond Dust": {
				"name": "Technique_Diamond Dust", "fieldName": "diamond_dust", "group": "Technique", "description": "", "variable": "tch-diamond_dust{0}", "title": "Diamond Dust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Bullet": {
				"name": "Technique_Wind Bullet", "fieldName": "wind_bullet", "group": "Technique", "description": "", "variable": "tch-wind_bullet{0}", "title": "Wind Bullet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gust": {
				"name": "Technique_Gust", "fieldName": "gust", "group": "Technique", "description": "", "variable": "tch-gust{0}", "title": "Gust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Windsweep": {
				"name": "Technique_Windsweep", "fieldName": "windsweep", "group": "Technique", "description": "", "variable": "tch-windsweep{0}", "title": "Windsweep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gale": {
				"name": "Technique_Gale", "fieldName": "gale", "group": "Technique", "description": "", "variable": "tch-gale{0}", "title": "Gale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Darkness": {
				"name": "Technique_Darkness", "fieldName": "darkness", "group": "Technique", "description": "", "variable": "tch-darkness{0}", "title": "Darkness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Wall": {
				"name": "Technique_Shadow Wall", "fieldName": "shadow_wall", "group": "Technique", "description": "", "variable": "tch-shadow_wall{0}", "title": "Shadow Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Nightfall": {
				"name": "Technique_Nightfall", "fieldName": "nightfall", "group": "Technique", "description": "", "variable": "tch-nightfall{0}", "title": "Nightfall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fog Cloud": {
				"name": "Technique_Fog Cloud", "fieldName": "fog_cloud", "group": "Technique", "description": "", "variable": "tch-fog_cloud{0}", "title": "Fog Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sleet": {
				"name": "Technique_Sleet", "fieldName": "sleet", "group": "Technique", "description": "", "variable": "tch-sleet{0}", "title": "Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Freezing Sleet": {
				"name": "Technique_Freezing Sleet", "fieldName": "freezing_sleet", "group": "Technique", "description": "", "variable": "tch-freezing_sleet{0}", "title": "Freezing Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hail": {
				"name": "Technique_Hail", "fieldName": "hail", "group": "Technique", "description": "", "variable": "tch-hail{0}", "title": "Hail", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Binding Sleet": {
				"name": "Technique_Binding Sleet", "fieldName": "binding_sleet", "group": "Technique", "description": "", "variable": "tch-binding_sleet{0}", "title": "Binding Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ice Storm": {
				"name": "Technique_Ice Storm", "fieldName": "ice_storm", "group": "Technique", "description": "", "variable": "tch-ice_storm{0}", "title": "Ice Storm", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fimbulwinter": {
				"name": "Technique_Fimbulwinter", "fieldName": "fimbulwinter", "group": "Technique", "description": "", "variable": "tch-fimbulwinter{0}", "title": "Fimbulwinter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Smoke Cloud": {
				"name": "Technique_Smoke Cloud", "fieldName": "smoke_cloud", "group": "Technique", "description": "", "variable": "tch-smoke_cloud{0}", "title": "Smoke Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burning Smoke": {
				"name": "Technique_Burning Smoke", "fieldName": "burning_smoke", "group": "Technique", "description": "", "variable": "tch-burning_smoke{0}", "title": "Burning Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Choking Smoke": {
				"name": "Technique_Choking Smoke", "fieldName": "choking_smoke", "group": "Technique", "description": "", "variable": "tch-choking_smoke{0}", "title": "Choking Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Acceleration": {
				"name": "Technique_Acceleration", "fieldName": "acceleration", "group": "Technique", "description": "", "variable": "tch-acceleration{0}", "title": "Acceleration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Vault": {
				"name": "Technique_Power Vault", "fieldName": "power_vault", "group": "Technique", "description": "", "variable": "tch-power_vault{0}", "title": "Power Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Expeditious": {
				"name": "Technique_Expeditious", "fieldName": "expeditious", "group": "Technique", "description": "", "variable": "tch-expeditious{0}", "title": "Expeditious", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Climb": {
				"name": "Technique_Quick Climb", "fieldName": "quick_climb", "group": "Technique", "description": "", "variable": "tch-quick_climb{0}", "title": "Quick Climb", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Swim": {
				"name": "Technique_Quick Swim", "fieldName": "quick_swim", "group": "Technique", "description": "", "variable": "tch-quick_swim{0}", "title": "Quick Swim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Poise": {
				"name": "Technique_Poise", "fieldName": "poise", "group": "Technique", "description": "", "variable": "tch-poise{0}", "title": "Poise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cat Fall": {
				"name": "Technique_Cat Fall", "fieldName": "cat_fall", "group": "Technique", "description": "", "variable": "tch-cat_fall{0}", "title": "Cat Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kip Up": {
				"name": "Technique_Kip Up", "fieldName": "kip_up", "group": "Technique", "description": "", "variable": "tch-kip_up{0}", "title": "Kip Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Silent Stride": {
				"name": "Technique_Silent Stride", "fieldName": "silent_stride", "group": "Technique", "description": "", "variable": "tch-silent_stride{0}", "title": "Silent Stride", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shove": {
				"name": "Technique_Shove", "fieldName": "shove", "group": "Technique", "description": "", "variable": "tch-shove{0}", "title": "Shove", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knockdown": {
				"name": "Technique_Knockdown", "fieldName": "knockdown", "group": "Technique", "description": "", "variable": "tch-knockdown{0}", "title": "Knockdown", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tumble": {
				"name": "Technique_Tumble", "fieldName": "tumble", "group": "Technique", "description": "", "variable": "tch-tumble{0}", "title": "Tumble", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Field Medic": {
				"name": "Technique_Field Medic", "fieldName": "field_medic", "group": "Technique", "description": "", "variable": "tch-field_medic{0}", "title": "Field Medic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Camoflauge": {
				"name": "Technique_Camoflauge", "fieldName": "camoflauge", "group": "Technique", "description": "", "variable": "tch-camoflauge{0}", "title": "Camoflauge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Blurred Light": {
				"name": "Technique_Blurred Light", "fieldName": "blurred_light", "group": "Technique", "description": "", "variable": "tch-blurred_light{0}", "title": "Blurred Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Light Refraction": {
				"name": "Technique_Light Refraction", "fieldName": "light_refraction", "group": "Technique", "description": "", "variable": "tch-light_refraction{0}", "title": "Light Refraction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Steps": {
				"name": "Technique_Shadow Steps", "fieldName": "shadow_steps", "group": "Technique", "description": "", "variable": "tch-shadow_steps{0}", "title": "Shadow Steps", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Walker": {
				"name": "Technique_Shadow Walker", "fieldName": "shadow_walker", "group": "Technique", "description": "", "variable": "tch-shadow_walker{0}", "title": "Shadow Walker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Step": {
				"name": "Technique_Wind Step", "fieldName": "wind_step", "group": "Technique", "description": "", "variable": "tch-wind_step{0}", "title": "Wind Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Updraft": {
				"name": "Technique_Updraft", "fieldName": "updraft", "group": "Technique", "description": "", "variable": "tch-updraft{0}", "title": "Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Clouded Updraft": {
				"name": "Technique_Clouded Updraft", "fieldName": "clouded_updraft", "group": "Technique", "description": "", "variable": "tch-clouded_updraft{0}", "title": "Clouded Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Fall": {
				"name": "Technique_Wind Fall", "fieldName": "wind_fall", "group": "Technique", "description": "", "variable": "tch-wind_fall{0}", "title": "Wind Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Walk on Air": {
				"name": "Technique_Walk on Air", "fieldName": "walk_on_air", "group": "Technique", "description": "", "variable": "tch-walk_on_air{0}", "title": "Walk on Air", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fire Step": {
				"name": "Technique_Fire Step", "fieldName": "fire_step", "group": "Technique", "description": "", "variable": "tch-fire_step{0}", "title": "Fire Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Liftoff": {
				"name": "Technique_Liftoff", "fieldName": "liftoff", "group": "Technique", "description": "", "variable": "tch-liftoff{0}", "title": "Liftoff", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Jet": {
				"name": "Technique_Jet", "fieldName": "jet", "group": "Technique", "description": "", "variable": "tch-jet{0}", "title": "Jet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cunning Action": {
				"name": "Technique_Cunning Action", "fieldName": "cunning_action", "group": "Technique", "description": "", "variable": "tch-cunning_action{0}", "title": "Cunning Action", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Demoralize": {
				"name": "Technique_Demoralize", "fieldName": "demoralize", "group": "Technique", "description": "", "variable": "tch-demoralize{0}", "title": "Demoralize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fascinate": {
				"name": "Technique_Fascinate", "fieldName": "fascinate", "group": "Technique", "description": "", "variable": "tch-fascinate{0}", "title": "Fascinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Impersonator": {
				"name": "Technique_Impersonator", "fieldName": "impersonator", "group": "Technique", "description": "", "variable": "tch-impersonator{0}", "title": "Impersonator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ether Sense": {
				"name": "Technique_Ether Sense", "fieldName": "ether_sense", "group": "Technique", "description": "", "variable": "tch-ether_sense{0}", "title": "Ether Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spirit Sense": {
				"name": "Technique_Spirit Sense", "fieldName": "spirit_sense", "group": "Technique", "description": "", "variable": "tch-spirit_sense{0}", "title": "Spirit Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tremorsense": {
				"name": "Technique_Tremorsense", "fieldName": "tremorsense", "group": "Technique", "description": "", "variable": "tch-tremorsense{0}", "title": "Tremorsense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dustcraft": {
				"name": "Technique_Dustcraft", "fieldName": "dustcraft", "group": "Technique", "description": "", "variable": "tch-dustcraft{0}", "title": "Dustcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shape Material": {
				"name": "Technique_Shape Material", "fieldName": "shape_material", "group": "Technique", "description": "", "variable": "tch-shape_material{0}", "title": "Shape Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quickcraft": {
				"name": "Technique_Quickcraft", "fieldName": "quickcraft", "group": "Technique", "description": "", "variable": "tch-quickcraft{0}", "title": "Quickcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Shaping": {
				"name": "Technique_Improved Shaping", "fieldName": "improved_shaping", "group": "Technique", "description": "", "variable": "tch-improved_shaping{0}", "title": "Improved Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Greater Shaping": {
				"name": "Technique_Greater Shaping", "fieldName": "greater_shaping", "group": "Technique", "description": "", "variable": "tch-greater_shaping{0}", "title": "Greater Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Legendary Shaping": {
				"name": "Technique_Legendary Shaping", "fieldName": "legendary_shaping", "group": "Technique", "description": "", "variable": "tch-legendary_shaping{0}", "title": "Legendary Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dust Material": {
				"name": "Technique_Dust Material", "fieldName": "dust_material", "group": "Technique", "description": "", "variable": "tch-dust_material{0}", "title": "Dust Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dust Area": {
				"name": "Technique_Dust Area", "fieldName": "dust_area", "group": "Technique", "description": "", "variable": "tch-dust_area{0}", "title": "Dust Area", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Dusting": {
				"name": "Technique_Improved Dusting", "fieldName": "improved_dusting", "group": "Technique", "description": "", "variable": "tch-improved_dusting{0}", "title": "Improved Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Greater Dusting": {
				"name": "Technique_Greater Dusting", "fieldName": "greater_dusting", "group": "Technique", "description": "", "variable": "tch-greater_dusting{0}", "title": "Greater Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Legendary Dusting": {
				"name": "Technique_Legendary Dusting", "fieldName": "legendary_dusting", "group": "Technique", "description": "", "variable": "tch-legendary_dusting{0}", "title": "Legendary Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Path": {
				"name": "Technique_Form Path", "fieldName": "form_path", "group": "Technique", "description": "", "variable": "tch-form_path{0}", "title": "Form Path", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Pillar": {
				"name": "Technique_Form Pillar", "fieldName": "form_pillar", "group": "Technique", "description": "", "variable": "tch-form_pillar{0}", "title": "Form Pillar", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stepping Path": {
				"name": "Technique_Stepping Path", "fieldName": "stepping_path", "group": "Technique", "description": "", "variable": "tch-stepping_path{0}", "title": "Stepping Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Wall": {
				"name": "Technique_Form Wall", "fieldName": "form_wall", "group": "Technique", "description": "", "variable": "tch-form_wall{0}", "title": "Form Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Scattered Pillars": {
				"name": "Technique_Scattered Pillars", "fieldName": "scattered_pillars", "group": "Technique", "description": "", "variable": "tch-scattered_pillars{0}", "title": "Scattered Pillars", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Wall": {
				"name": "Technique_Great Wall", "fieldName": "great_wall", "group": "Technique", "description": "", "variable": "tch-great_wall{0}", "title": "Great Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cultivate": {
				"name": "Technique_Cultivate", "fieldName": "cultivate", "group": "Technique", "description": "", "variable": "tch-cultivate{0}", "title": "Cultivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Entangle": {
				"name": "Technique_Entangle", "fieldName": "entangle", "group": "Technique", "description": "", "variable": "tch-entangle{0}", "title": "Entangle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wildwood": {
				"name": "Technique_Wildwood", "fieldName": "wildwood", "group": "Technique", "description": "", "variable": "tch-wildwood{0}", "title": "Wildwood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Distortion": {
				"name": "Technique_Distortion", "fieldName": "distortion", "group": "Technique", "description": "", "variable": "tch-distortion{0}", "title": "Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lasting Distortion": {
				"name": "Technique_Lasting Distortion", "fieldName": "lasting_distortion", "group": "Technique", "description": "", "variable": "tch-lasting_distortion{0}", "title": "Lasting Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Heat Field": {
				"name": "Technique_Heat Field", "fieldName": "heat_field", "group": "Technique", "description": "", "variable": "tch-heat_field{0}", "title": "Heat Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burn Guard": {
				"name": "Technique_Burn Guard", "fieldName": "burn_guard", "group": "Technique", "description": "", "variable": "tch-burn_guard{0}", "title": "Burn Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Field": {
				"name": "Technique_Cold Field", "fieldName": "cold_field", "group": "Technique", "description": "", "variable": "tch-cold_field{0}", "title": "Cold Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Chill Guard": {
				"name": "Technique_Chill Guard", "fieldName": "chill_guard", "group": "Technique", "description": "", "variable": "tch-chill_guard{0}", "title": "Chill Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinesis": {
				"name": "Technique_Kinesis", "fieldName": "kinesis", "group": "Technique", "description": "", "variable": "tch-kinesis{0}", "title": "Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Distant Kinesis": {
				"name": "Technique_Distant Kinesis", "fieldName": "distant_kinesis", "group": "Technique", "description": "", "variable": "tch-distant_kinesis{0}", "title": "Distant Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinetic Strike": {
				"name": "Technique_Kinetic Strike", "fieldName": "kinetic_strike", "group": "Technique", "description": "", "variable": "tch-kinetic_strike{0}", "title": "Kinetic Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinetic Throw": {
				"name": "Technique_Kinetic Throw", "fieldName": "kinetic_throw", "group": "Technique", "description": "", "variable": "tch-kinetic_throw{0}", "title": "Kinetic Throw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Heavy Kinesis": {
				"name": "Technique_Heavy Kinesis", "fieldName": "heavy_kinesis", "group": "Technique", "description": "", "variable": "tch-heavy_kinesis{0}", "title": "Heavy Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burden": {
				"name": "Technique_Burden", "fieldName": "burden", "group": "Technique", "description": "", "variable": "tch-burden{0}", "title": "Burden", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Pressure": {
				"name": "Technique_Pressure", "fieldName": "pressure", "group": "Technique", "description": "", "variable": "tch-pressure{0}", "title": "Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Restrain": {
				"name": "Technique_Restrain", "fieldName": "restrain", "group": "Technique", "description": "", "variable": "tch-restrain{0}", "title": "Restrain", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wide Pressure": {
				"name": "Technique_Wide Pressure", "fieldName": "wide_pressure", "group": "Technique", "description": "", "variable": "tch-wide_pressure{0}", "title": "Wide Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Prostration": {
				"name": "Technique_Prostration", "fieldName": "prostration", "group": "Technique", "description": "", "variable": "tch-prostration{0}", "title": "Prostration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Deep Pressure": {
				"name": "Technique_Deep Pressure", "fieldName": "deep_pressure", "group": "Technique", "description": "", "variable": "tch-deep_pressure{0}", "title": "Deep Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gravity Well": {
				"name": "Technique_Gravity Well", "fieldName": "gravity_well", "group": "Technique", "description": "", "variable": "tch-gravity_well{0}", "title": "Gravity Well", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shield Block": {
				"name": "Technique_Shield Block", "fieldName": "shield_block", "group": "Technique", "description": "", "variable": "tch-shield_block{0}", "title": "Shield Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Glancing Block": {
				"name": "Technique_Glancing Block", "fieldName": "glancing_block", "group": "Technique", "description": "", "variable": "tch-glancing_block{0}", "title": "Glancing Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Aegis": {
				"name": "Technique_Aegis", "fieldName": "aegis", "group": "Technique", "description": "", "variable": "tch-aegis{0}", "title": "Aegis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Light": {
				"name": "Technique_Light", "fieldName": "light", "group": "Technique", "description": "", "variable": "tch-light{0}", "title": "Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dancing Lights": {
				"name": "Technique_Dancing Lights", "fieldName": "dancing_lights", "group": "Technique", "description": "", "variable": "tch-dancing_lights{0}", "title": "Dancing Lights", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Flash": {
				"name": "Technique_Flash", "fieldName": "flash", "group": "Technique", "description": "", "variable": "tch-flash{0}", "title": "Flash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sunlight": {
				"name": "Technique_Sunlight", "fieldName": "sunlight", "group": "Technique", "description": "", "variable": "tch-sunlight{0}", "title": "Sunlight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release": {
				"name": "Technique_Stress Release", "fieldName": "stress_release", "group": "Technique", "description": "", "variable": "tch-stress_release{0}", "title": "Stress Release", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release +": {
				"name": "Technique_Stress Release +", "fieldName": "stress_release_+", "group": "Technique", "description": "", "variable": "tch-stress_release_+{0}", "title": "Stress Release +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release ++": {
				"name": "Technique_Stress Release ++", "fieldName": "stress_release_++", "group": "Technique", "description": "", "variable": "tch-stress_release_++{0}", "title": "Stress Release ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sensory Training": {
				"name": "Technique_Sensory Training", "fieldName": "sensory_training", "group": "Technique", "description": "", "variable": "tch-sensory_training{0}", "title": "Sensory Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sensory Training +": {
				"name": "Technique_Sensory Training +", "fieldName": "sensory_training_+", "group": "Technique", "description": "", "variable": "tch-sensory_training_+{0}", "title": "Sensory Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Broad Study": {
				"name": "Technique_Broad Study", "fieldName": "broad_study", "group": "Technique", "description": "", "variable": "tch-broad_study{0}", "title": "Broad Study", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Experienced Tracker": {
				"name": "Technique_Experienced Tracker", "fieldName": "experienced_tracker", "group": "Technique", "description": "", "variable": "tch-experienced_tracker{0}", "title": "Experienced Tracker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Multilingual": {
				"name": "Technique_Multilingual", "fieldName": "multilingual", "group": "Technique", "description": "", "variable": "tch-multilingual{0}", "title": "Multilingual", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Multilingual +": {
				"name": "Technique_Multilingual +", "fieldName": "multilingual_+", "group": "Technique", "description": "", "variable": "tch-multilingual_+{0}", "title": "Multilingual +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore": {
				"name": "Technique_Specialized Lore", "fieldName": "specialized_lore", "group": "Technique", "description": "", "variable": "tch-specialized_lore{0}", "title": "Specialized Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore +": {
				"name": "Technique_Specialized Lore +", "fieldName": "specialized_lore_+", "group": "Technique", "description": "", "variable": "tch-specialized_lore_+{0}", "title": "Specialized Lore +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore ++": {
				"name": "Technique_Specialized Lore ++", "fieldName": "specialized_lore_++", "group": "Technique", "description": "", "variable": "tch-specialized_lore_++{0}", "title": "Specialized Lore ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Initiative": {
				"name": "Technique_Improved Initiative", "fieldName": "improved_initiative", "group": "Technique", "description": "", "variable": "tch-improved_initiative{0}", "title": "Improved Initiative", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training": {
				"name": "Technique_Knowledge Training", "fieldName": "knowledge_training", "group": "Technique", "description": "", "variable": "tch-knowledge_training{0}", "title": "Knowledge Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training +": {
				"name": "Technique_Knowledge Training +", "fieldName": "knowledge_training_+", "group": "Technique", "description": "", "variable": "tch-knowledge_training_+{0}", "title": "Knowledge Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training ++": {
				"name": "Technique_Knowledge Training ++", "fieldName": "knowledge_training_++", "group": "Technique", "description": "", "variable": "tch-knowledge_training_++{0}", "title": "Knowledge Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training": {
				"name": "Technique_Social Training", "fieldName": "social_training", "group": "Technique", "description": "", "variable": "tch-social_training{0}", "title": "Social Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training +": {
				"name": "Technique_Social Training +", "fieldName": "social_training_+", "group": "Technique", "description": "", "variable": "tch-social_training_+{0}", "title": "Social Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training ++": {
				"name": "Technique_Social Training ++", "fieldName": "social_training_++", "group": "Technique", "description": "", "variable": "tch-social_training_++{0}", "title": "Social Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Refocus": {
				"name": "Technique_Refocus", "fieldName": "refocus", "group": "Technique", "description": "", "variable": "tch-refocus{0}", "title": "Refocus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Refocus +": {
				"name": "Technique_Refocus +", "fieldName": "refocus_+", "group": "Technique", "description": "", "variable": "tch-refocus_+{0}", "title": "Refocus +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sustained Channel": {
				"name": "Technique_Sustained Channel", "fieldName": "sustained_channel", "group": "Technique", "description": "", "variable": "tch-sustained_channel{0}", "title": "Sustained Channel", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sustained Channel +": {
				"name": "Technique_Sustained Channel +", "fieldName": "sustained_channel_+", "group": "Technique", "description": "", "variable": "tch-sustained_channel_+{0}", "title": "Sustained Channel +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control": {
				"name": "Technique_Ki Control", "fieldName": "ki_control", "group": "Technique", "description": "", "variable": "tch-ki_control{0}", "title": "Ki Control", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control +": {
				"name": "Technique_Ki Control +", "fieldName": "ki_control_+", "group": "Technique", "description": "", "variable": "tch-ki_control_+{0}", "title": "Ki Control +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control ++": {
				"name": "Technique_Ki Control ++", "fieldName": "ki_control_++", "group": "Technique", "description": "", "variable": "tch-ki_control_++{0}", "title": "Ki Control ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surge Value": {
				"name": "Technique_Surge Value", "fieldName": "surge_value", "group": "Technique", "description": "", "variable": "tch-surge_value{0}", "title": "Surge Value", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surge Value +": {
				"name": "Technique_Surge Value +", "fieldName": "surge_value_+", "group": "Technique", "description": "", "variable": "tch-surge_value_+{0}", "title": "Surge Value +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training": {
				"name": "Technique_Channel Training", "fieldName": "channel_training", "group": "Technique", "description": "", "variable": "tch-channel_training{0}", "title": "Channel Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training +": {
				"name": "Technique_Channel Training +", "fieldName": "channel_training_+", "group": "Technique", "description": "", "variable": "tch-channel_training_+{0}", "title": "Channel Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training ++": {
				"name": "Technique_Channel Training ++", "fieldName": "channel_training_++", "group": "Technique", "description": "", "variable": "tch-channel_training_++{0}", "title": "Channel Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Physical Training": {
				"name": "Technique_Physical Training", "fieldName": "physical_training", "group": "Technique", "description": "", "variable": "tch-physical_training{0}", "title": "Physical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Physical Training +": {
				"name": "Technique_Physical Training +", "fieldName": "physical_training_+", "group": "Technique", "description": "", "variable": "tch-physical_training_+{0}", "title": "Physical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training": {
				"name": "Technique_Body Training", "fieldName": "body_training", "group": "Technique", "description": "", "variable": "tch-body_training{0}", "title": "Body Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training +": {
				"name": "Technique_Body Training +", "fieldName": "body_training_+", "group": "Technique", "description": "", "variable": "tch-body_training_+{0}", "title": "Body Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training ++": {
				"name": "Technique_Body Training ++", "fieldName": "body_training_++", "group": "Technique", "description": "", "variable": "tch-body_training_++{0}", "title": "Body Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training": {
				"name": "Technique_Technical Training", "fieldName": "technical_training", "group": "Technique", "description": "", "variable": "tch-technical_training{0}", "title": "Technical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training +": {
				"name": "Technique_Technical Training +", "fieldName": "technical_training_+", "group": "Technique", "description": "", "variable": "tch-technical_training_+{0}", "title": "Technical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training ++": {
				"name": "Technique_Technical Training ++", "fieldName": "technical_training_++", "group": "Technique", "description": "", "variable": "tch-technical_training_++{0}", "title": "Technical Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training": {
				"name": "Technique_Martial Training", "fieldName": "martial_training", "group": "Technique", "description": "", "variable": "tch-martial_training{0}", "title": "Martial Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training +": {
				"name": "Technique_Martial Training +", "fieldName": "martial_training_+", "group": "Technique", "description": "", "variable": "tch-martial_training_+{0}", "title": "Martial Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training ++": {
				"name": "Technique_Martial Training ++", "fieldName": "martial_training_++", "group": "Technique", "description": "", "variable": "tch-martial_training_++{0}", "title": "Martial Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up": {
				"name": "Technique_HP Up", "fieldName": "hp_up", "group": "Technique", "description": "", "variable": "tch-hp_up{0}", "title": "HP Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up+": {
				"name": "Technique_HP Up+", "fieldName": "hp_up+", "group": "Technique", "description": "", "variable": "tch-hp_up+{0}", "title": "HP Up+", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up++": {
				"name": "Technique_HP Up++", "fieldName": "hp_up++", "group": "Technique", "description": "", "variable": "tch-hp_up++{0}", "title": "HP Up++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost": {
				"name": "Technique_Vitality Boost", "fieldName": "vitality_boost", "group": "Technique", "description": "", "variable": "tch-vitality_boost{0}", "title": "Vitality Boost", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost +": {
				"name": "Technique_Vitality Boost +", "fieldName": "vitality_boost_+", "group": "Technique", "description": "", "variable": "tch-vitality_boost_+{0}", "title": "Vitality Boost +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost ++": {
				"name": "Technique_Vitality Boost ++", "fieldName": "vitality_boost_++", "group": "Technique", "description": "", "variable": "tch-vitality_boost_++{0}", "title": "Vitality Boost ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undying": {
				"name": "Technique_Undying", "fieldName": "undying", "group": "Technique", "description": "", "variable": "tch-undying{0}", "title": "Undying", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undying +": {
				"name": "Technique_Undying +", "fieldName": "undying_+", "group": "Technique", "description": "", "variable": "tch-undying_+{0}", "title": "Undying +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extra Follow-Up Attack": {
				"name": "Technique_Extra Follow-Up Attack", "fieldName": "extra_follow-up_attack", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack{0}", "title": "Extra Follow-Up Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extra Follow-Up Attack +": {
				"name": "Technique_Extra Follow-Up Attack +", "fieldName": "extra_follow-up_attack_+", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack_+{0}", "title": "Extra Follow-Up Attack +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Change Tech Slots": {
				"name": "Technique_Change Tech Slots", "fieldName": "change_tech_slots", "group": "Technique", "description": "", "variable": "tch-change_tech_slots{0}", "title": "Change Tech Slots", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hold Out": {
				"name": "Technique_Hold Out", "fieldName": "hold_out", "group": "Technique", "description": "", "variable": "tch-hold_out{0}", "title": "Hold Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"Technique_Overdrive": {
				"name": "Technique_Overdrive", "fieldName": "overdrive", "group": "Technique", "description": "", "variable": "tch-overdrive{0}", "title": "Overdrive", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": 1, "isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			}
		},
		sortingGroups = { "group": { "Type": ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "Combat", "Social", "DamageType", "Trait", "Status", "Condition"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error"], "AffinityType": ["Wood", "Fire", "Earth", "Metal", "Water"], "InnateDefenseType": ["BOD", "PRC", "QCK"], "InnateSenseType": ["CNV", "INT", "RSN"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "JobTier": ["JobTier0", "JobTier1", "JobTier2", "JobTier3"], "LoreTier": ["LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3"], "PageSet": ["PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training"], "Page": ["Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement"], "Title": ["Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_Training"], "Advancement": ["Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques"], "Training": ["TrainingKnowledge", "TrainingTechniques", "PP"], "Attribute": ["Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN"], "Defense": ["Defense_Combat", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion"], "Sense": ["Sense_Social", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill"], "General": ["Full Name", "Display Name", "Background", "Age", "Gender", "Homeland", "HP", "WILL", "EN", "Initiative", "Affinity", "InnateDefense", "InnateSense", "Recall"], "Gear": ["Carrying Capacity"], "Combat": ["Combat_HV", "Combat_Armor", "Combat_Resistance", "Combat_ResistanceDesc", "Combat_WeaknessDesc", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Combat_Move Speed", "Combat_Move Potency"], "": ["Chakra"], "Social": ["Social_Approval", "Social_Patience"], "DamageType": ["Burn", "Cold", "Energy", "Force", "Piercing", "Shock", "Tension"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent"], "Status": ["Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious"], "Condition": ["Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised"], "Style": ["Style_Basic Set", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan"], "Lore": ["Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "Role": ["Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Technique": ["Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Unarmed Strike", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"] }, "formulaMods": { "CR": ["Attribute", "Skill", "Job", "Technique", "HP", "WILL", "Initiative", "Combat_HV", "Combat_Chakra", "Social_Approval", "Social_Patience", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "AdvancementSkill": ["Skill", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "AdvancementJob": ["Job", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "": ["Role", "Language", "Lore", "PageSet", "Page", "Title", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "Combat", "Social", "DamageType", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_Training", "Level", "CR", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "TrainingKnowledge", "TrainingTechniques", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Combat", "Sense_Social", "Full Name", "Display Name", "Background", "Age", "Gender", "Homeland", "EN", "Affinity", "InnateDefense", "InnateSense", "Combat_Resistance", "Combat_ResistanceDesc", "Combat_WeaknessDesc", "Chakra", "Social_Patience", "Burn", "Cold", "Energy", "Force", "Piercing", "Shock", "Tension", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "TrainingKnowledge": ["Knowledge"], "AdvancementTechnique": ["Technique"], "TrainingTechniques": ["Technique"], "Level": ["Advancement", "HP", "WILL", "Social_Approval"], "Attribute_BOD": ["Defense_Brace", "Defense_Fortitude", "HP", "Carrying Capacity"], "Attribute_PRC": ["Defense_Disruption", "Defense_Hide"], "Attribute_QCK": ["Defense_Reflex", "Defense_Evasion", "Initiative"], "Attribute_INT": ["Sense_Insight", "Sense_Notice"], "Attribute_RSN": ["Sense_Scrutiny", "Sense_Detect", "Recall"], "Attribute_CNV": ["Sense_Resolve", "Sense_Freewill", "WILL", "Combat_HV", "Social_Approval"] } },
		_max = "_max",
		_true = "_true",
		_rank = "_rank",
		_build = "_build",
		_filter = "_filter",
		_expand = "_expand",
		_tab = "_tab",
		_page = "_page",
		_info = "_info",
		_exit = "_exit",
		_finish = "_finish",
		_origin = "_origin",
		_learn = "_learn",
		_pts = "_pts",
		_tech = "_tech",
		_expertise = "_expertise",
		_gear = "_gear",
		_affinity = "_affinity",
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
		},
		getTitle = function (key) {
			let data = get(key);
			return data.title;
		},
		getDescription = function (key) {
			let data = get(key);
			return data.getDescription();
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
		GetTitle: getTitle,
		GetDescription: getDescription,
		_max: _max,
		_true: _true,
		_rank: _rank,
		_build: _build,
		_filter: _filter,
		_expand: _expand,
		_tab: _tab,
		_page: _page,
		_info: _info,
		_exit: _exit,
		_finish: _finish,
		_origin: _origin,
		_learn: _learn,
		_pts: _pts,
		_tech: _tech,
		_expertise: _expertise,
		_gear: _gear,
		_affinity: _affinity,
		_error: _error
	};
}());
