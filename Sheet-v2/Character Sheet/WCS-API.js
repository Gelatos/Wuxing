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
        this.variable = "";
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
        definition.setFormulaData();
        return definition;
    }

}
class TechniqueData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
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
        this.createEmpty();
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
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.description = json.description;
        this.affinity = json.affinity;
        this.cr = json.cr;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
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
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.abilityScore = json.abilityScore;
        this.description = json.description;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
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
        this.fieldName = Format.ToCamelCase(this.name);
        this.group = json.group;
        this.location = json.location;
        this.description = json.description;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
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
        this.fieldName = Format.ToCamelCase(this.name);
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
        this.fieldName = Format.ToCamelCase(this.name);
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
        this.createEmpty();

    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToCamelCase(this.name);
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
        this.modAttrs = json.modAttrs;
        this.formulaCalculations = json.formulaCalculations;
    }
    importSheets(dataArray) {
        this.createEmpty();
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
        definition.subGroup = this.subGroup;
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

//Definitions Database
var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "Character Creator", "Core", "Advancement", "Training Page", "Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill", "Full Name", "Display Name", "Level", "XP", "Training", "CR", "HP", "WILL", "EN", "Initiative", "Carrying Capacity", "Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Chakra", "Combat_Move Speed", "Combat_Move Potency", "Social_Approval", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Style_Basic Set", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "group": "Type", "description": "", "variable": "ATR{0}{1}", "title": "Attributes", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "When assigning attributes you may assign them a value. They range from a +3 bonus to a -1 penalty. Assigning an attribute a penalty will grant you more points to assign to other attributes.", "Normally, a character can have at most one attribute at a -1 penalty."],
				"abbreviation": "", "formula": "7", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATR"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "group": "Type", "description": "", "variable": "SKL{0}{1}", "title": "Skills", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKL"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job": {
				"name": "Job", "fieldName": "job", "group": "Type", "description": "", "variable": "JOB{0}{1}", "title": "Jobs", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOB"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Role": {
				"name": "Role", "fieldName": "role", "group": "Type", "description": "", "variable": "ROL{0}{1}", "title": "Roles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "group": "Type", "description": "", "variable": "KNW{0}{1}", "title": "Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "10", "modifiers": "_techBonus", "linkedGroups": 3, "isResource": false, "modAttrs": ["KNW"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Language": {
				"name": "Language", "fieldName": "language", "group": "Type", "description": "", "variable": "LNG{0}{1}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "group": "Type", "description": "", "variable": "LOR{0}{1}", "title": "Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "fieldName": "style", "group": "Type", "description": "", "variable": "STY{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STY"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "group": "Type", "description": "", "variable": "TCH{0}{1}", "title": "Techniques", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCH"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Page Set": {
				"name": "Page Set", "fieldName": "pageSet", "group": "Type", "description": "", "variable": "PGS{0}{1}", "title": "Page Set", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page": {
				"name": "Page", "fieldName": "page", "group": "Type", "description": "", "variable": "PAG{0}{1}", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "group": "Type", "description": "", "variable": "DEF{0}{1}", "title": "Defense", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "group": "Type", "description": "", "variable": "SEN{0}{1}", "title": "Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "group": "Type", "description": "", "variable": "AFN{0}{1}", "title": "Affinity", "subGroup": "", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "group": "Type", "description": "", "variable": "CMB{0}{1}", "title": "Combat", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "fieldName": "social", "group": "Type", "description": "", "variable": "SOC{0}{1}", "title": "Social", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "group": "Type", "description": "", "variable": "TRA{0}{1}", "title": "Traits", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status": {
				"name": "Status", "fieldName": "status", "group": "Type", "description": "", "variable": "STS{0}{1}", "title": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "group": "Type", "description": "", "variable": "CND{0}{1}", "title": "Condition", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "group": "VariableMod", "description": "", "variable": "_max", "title": "Max", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "group": "VariableMod", "description": "", "variable": "_true", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "group": "VariableMod", "description": "", "variable": "_rank", "title": "Rank", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "group": "VariableMod", "description": "", "variable": "_build", "title": "Build", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "group": "VariableMod", "description": "", "variable": "_filter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "group": "VariableMod", "description": "", "variable": "_expand", "title": "Expand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "group": "VariableMod", "description": "", "variable": "_tab", "title": "Tab", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "group": "VariableMod", "description": "", "variable": "_page", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "group": "VariableMod", "description": "", "variable": "_exit", "title": "Exit", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "group": "VariableMod", "description": "", "variable": "_finish", "title": "Finish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "group": "VariableMod", "description": "", "variable": "_origin", "title": "Origin", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "group": "VariableMod", "description": "", "variable": "_learn", "title": "Learn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "group": "VariableMod", "description": "", "variable": "_pts", "title": "Points", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "group": "VariableMod", "description": "", "variable": "_tech", "title": "Technique Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "group": "VariableMod", "description": "", "variable": "_expertise", "title": "Expertise Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "group": "VariableMod", "description": "", "variable": "_gear", "title": "Gear Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "group": "VariableMod", "description": "", "variable": "_error", "title": "Error", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "group": "Affinity", "description": "", "variable": "wood", "title": "Wood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "group": "Affinity", "description": "", "variable": "fire", "title": "Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "group": "Affinity", "description": "", "variable": "earth", "title": "Earth", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "group": "Affinity", "description": "", "variable": "metal", "title": "Metal", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "fieldName": "water", "group": "Affinity", "description": "", "variable": "water", "title": "Water", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributeValueMediocre", "group": "AttributeValue", "description": "", "variable": "0", "title": "Mediocre (+0)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributeValueGreat", "group": "AttributeValue", "description": "", "variable": "3", "title": "Great (+3)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributeValueGood", "group": "AttributeValue", "description": "", "variable": "2", "title": "Good (+2)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributeValueAverage", "group": "AttributeValue", "description": "", "variable": "1", "title": "Average (+1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributeValueBad", "group": "AttributeValue", "description": "", "variable": "-1", "title": "Bad (-1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Creator": {
				"name": "Character Creator", "fieldName": "characterCreator", "group": "PageSet", "description": "", "variable": "builder", "title": "Character Creator", "subGroup": "", "descriptions": ["This is the Character Creator where you can create a new character. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, select Finish to populate your character. Alternatively, you can select Exit to do character creation at another time. This is not recommended.", "You can always return to this page from Options."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Core": {
				"name": "Core", "fieldName": "core", "group": "PageSet", "description": "", "variable": "core", "title": "Core", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "group": "PageSet", "description": "", "variable": "advancement", "title": "Advancement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Training Page": {
				"name": "Training Page", "fieldName": "trainingPage", "group": "PageSet", "description": "", "variable": "training", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "group": "Page", "description": "", "variable": "PAGorigin{0}", "title": "Origin", "subGroup": "", "descriptions": ["This is the Character Origin Page. Here you will set your character's name, their primary element, and ancestry. There are also some prebuild options to allow you to quickly build a character by choosing a Background and Archetype. These are optional choices to help steer your character into specific directions. You are always able to ignore these and just take on character creation from scratch."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Basics": {
				"name": "Page_Basics", "fieldName": "basics", "group": "Page", "description": "", "variable": "PAGbasics{0}", "title": "Basics", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "group": "Page", "description": "", "variable": "PAGcharacter{0}", "title": "Character", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "group": "Page", "description": "", "variable": "PAGoverview{0}", "title": "Overview", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "group": "Page", "description": "", "variable": "PAGdetails{0}", "title": "Details", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "group": "Page", "description": "", "variable": "PAGchat{0}", "title": "Chat", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "group": "Page", "description": "", "variable": "PAGoptions{0}", "title": "Options", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "group": "Page", "description": "", "variable": "PAGgear{0}", "title": "Gear", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_BOD": {
				"name": "Attribute_BOD", "fieldName": "bOD", "group": "Attribute", "description": "", "variable": "ATRbod{0}", "title": "BOD", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRbod"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_PRC": {
				"name": "Attribute_PRC", "fieldName": "pRC", "group": "Attribute", "description": "", "variable": "ATRprc{0}", "title": "PRC", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRprc"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_QCK": {
				"name": "Attribute_QCK", "fieldName": "qCK", "group": "Attribute", "description": "", "variable": "ATRqck{0}", "title": "QCK", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRqck"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_CNV": {
				"name": "Attribute_CNV", "fieldName": "cNV", "group": "Attribute", "description": "", "variable": "ATRcnv{0}", "title": "CNV", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRcnv"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_INT": {
				"name": "Attribute_INT", "fieldName": "iNT", "group": "Attribute", "description": "", "variable": "ATRint{0}", "title": "INT", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRint"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_RSN": {
				"name": "Attribute_RSN", "fieldName": "rSN", "group": "Attribute", "description": "", "variable": "ATRrsn{0}", "title": "RSN", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRrsn"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Defense_Brace": {
				"name": "Defense_Brace", "fieldName": "brace", "group": "Defense", "description": "", "variable": "DEFbrace{0}", "title": "Brace", "subGroup": "", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Fortitude": {
				"name": "Defense_Fortitude", "fieldName": "fortitude", "group": "Defense", "description": "", "variable": "DEFfortitude{0}", "title": "Fortitude", "subGroup": "", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Disruption": {
				"name": "Defense_Disruption", "fieldName": "disruption", "group": "Defense", "description": "", "variable": "DEFdisruption{0}", "title": "Disruption", "subGroup": "", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Hide": {
				"name": "Defense_Hide", "fieldName": "hide", "group": "Defense", "description": "", "variable": "DEFhide{0}", "title": "Hide", "subGroup": "", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Reflex": {
				"name": "Defense_Reflex", "fieldName": "reflex", "group": "Defense", "description": "", "variable": "DEFreflex{0}", "title": "Reflex", "subGroup": "", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "formula": "7;Attribute_QCK", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Evasion": {
				"name": "Defense_Evasion", "fieldName": "evasion", "group": "Defense", "description": "", "variable": "DEFevasion{0}", "title": "Evasion", "subGroup": "", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "formula": "4;Attribute_QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Insight": {
				"name": "Sense_Insight", "fieldName": "insight", "group": "Sense", "description": "", "variable": "SENinsight{0}", "title": "Insight", "subGroup": "", "descriptions": ["Insight represents a character's ability to sense emotional state and sudden changes in behaviour. It is useful when detecting someone is trying to charm or deceive you. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Notice": {
				"name": "Sense_Notice", "fieldName": "notice", "group": "Sense", "description": "", "variable": "SENnotice{0}", "title": "Notice", "subGroup": "", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Scrutiny": {
				"name": "Sense_Scrutiny", "fieldName": "scrutiny", "group": "Sense", "description": "", "variable": "SENscrutiny{0}", "title": "Scrutiny", "subGroup": "", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning. It is often used in defense against another's attempts at lying and from being tripped up against a skilled negotiator. "],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Detect": {
				"name": "Sense_Detect", "fieldName": "detect", "group": "Sense", "description": "", "variable": "SENdetect{0}", "title": "Detect", "subGroup": "", "descriptions": ["Detect is a character's ability to immediately analyze an effect or location for anything that is out of place or is not behaving normally. It is most often used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Resolve": {
				"name": "Sense_Resolve", "fieldName": "resolve", "group": "Sense", "description": "", "variable": "SENresolve{0}", "title": "Resolve", "subGroup": "", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "formula": "7;Attribute_CNV", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Freewill": {
				"name": "Sense_Freewill", "fieldName": "freewill", "group": "Sense", "description": "", "variable": "SENfreewill{0}", "title": "Freewill", "subGroup": "", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "formula": "10;Attribute_CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Full Name": {
				"name": "Full Name", "fieldName": "fullName", "group": "General", "description": "", "variable": "full_name", "title": "Full Name", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "fieldName": "displayName", "group": "General", "description": "", "variable": "display_name", "title": "Display Name", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Level": {
				"name": "Level", "fieldName": "level", "group": "General", "description": "", "variable": "level", "title": "Character Level", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"XP": {
				"name": "XP", "fieldName": "xP", "group": "General", "description": "", "variable": "xp", "title": "Experience", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "XP", "formula": "30", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["xp"],
				"formulaCalculations": [{ "modName": "", "value": 30, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Training": {
				"name": "Training", "fieldName": "training", "group": "General", "description": "", "variable": "training", "title": "Training", "subGroup": "", "descriptions": ["Training is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime for about a week."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"CR": {
				"name": "CR", "fieldName": "cR", "group": "General", "description": "", "variable": "cr", "title": "Character Rank", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level."],
				"abbreviation": "CR", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"HP": {
				"name": "HP", "fieldName": "hP", "group": "General", "description": "", "variable": "hp", "title": "Hit Points", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "HP", "formula": "10; CR*10; Level; Attribute_BOD", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "level", "ATRbod", "hp"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 10 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "ATRbod", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"WILL": {
				"name": "WILL", "fieldName": "wILL", "group": "General", "description": "", "variable": "will", "title": "Willpower", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "formula": "10;CR*10;Level;Attribute_CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "level", "ATRcnv", "will"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 10 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "ATRcnv", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"EN": {
				"name": "EN", "fieldName": "eN", "group": "General", "description": "", "variable": "en", "title": "Energy", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "group": "General", "description": "", "variable": "initiative", "title": "Initiative", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "formula": "CR;Attribute_QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRqck", "initiative"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "ATRqck", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carryingCapacity", "group": "Gear", "description": "", "variable": "capacity", "title": "Carrying Capacity", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "formula": "40;Attribute_BOD*20", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRbod", "capacity"],
				"formulaCalculations": [{ "modName": "", "value": 40, "multiplier": 1 },
				{ "modName": "ATRbod", "value": 0, "multiplier": 20 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Combat_HV": {
				"name": "Combat_HV", "fieldName": "hV", "group": "Combat", "description": "", "variable": "CMBhv{0}", "title": "HV", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from healing abilities."],
				"abbreviation": "", "formula": "2;CR*2;Attribute_CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Armor": {
				"name": "Combat_Armor", "fieldName": "armor", "group": "Combat", "description": "", "variable": "CMBarmor{0}", "title": "Armor", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "formula": "0", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Durability": {
				"name": "Combat_Durability", "fieldName": "durability", "group": "Combat", "description": "", "variable": "CMBdurability{0}", "title": "Durability", "subGroup": "", "descriptions": ["Durability is the number of times a character can restore their HP back to full when their HP drops to 0."],
				"abbreviation": "", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Surge": {
				"name": "Combat_Surge", "fieldName": "surge", "group": "Combat", "description": "", "variable": "CMBsurge{0}", "title": "Surge", "subGroup": "", "descriptions": ["Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Chakra": {
				"name": "Combat_Chakra", "fieldName": "chakra", "group": "Combat", "description": "", "variable": "CMBchakra{0}", "title": "Chakra", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "formula": "3;CR", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "group": "", "description": "", "variable": "", "title": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Speed": {
				"name": "Combat_Move Speed", "fieldName": "moveSpeed", "group": "Combat", "description": "", "variable": "CMBmoveSpeed{0}", "title": "Move Speed", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they make a standard move."],
				"abbreviation": "", "formula": "3", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Potency": {
				"name": "Combat_Move Potency", "fieldName": "movePotency", "group": "Combat", "description": "", "variable": "CMBmovePotency{0}", "title": "Move Potency", "subGroup": "", "descriptions": ["At the start of a combat round this value is rolled to determine the number of spaces the character may move. If the value is less than their move speed, the value becomes equal to their move speed. "],
				"abbreviation": "", "formula": "6", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Approval": {
				"name": "Social_Approval", "fieldName": "approval", "group": "Social", "description": "", "variable": "SOCapproval{0}", "title": "Approval", "subGroup": "", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "formula": "20;CR*15;Level;Attribute_CNV", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Patience": {
				"name": "Social_Patience", "fieldName": "patience", "group": "Social", "description": "", "variable": "SOCpatience{0}", "title": "Patience", "subGroup": "", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "formula": "CR*10;", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "group": "Trait", "description": "", "variable": "TRAaccurate{0}", "title": "Accurate", "subGroup": "", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "group": "Trait", "description": "", "variable": "TRAaffinity{0}", "title": "Affinity", "subGroup": "", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "group": "Trait", "description": "", "variable": "TRAaffinity+{0}", "title": "Affinity+", "subGroup": "", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "aP", "group": "Trait", "description": "", "variable": "TRAaP{0}", "title": "AP", "subGroup": "", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "group": "Trait", "description": "", "variable": "TRAbrutal{0}", "title": "Brutal", "subGroup": "", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "group": "Trait", "description": "", "variable": "TRAfocus{0}", "title": "Focus", "subGroup": "", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "group": "Trait", "description": "", "variable": "TRAfocus+{0}", "title": "Focus+", "subGroup": "", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "group": "Trait", "description": "", "variable": "TRAmaterial{0}", "title": "Material", "subGroup": "", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "group": "Trait", "description": "", "variable": "TRAsimple{0}", "title": "Simple", "subGroup": "", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "group": "Trait", "description": "", "variable": "TRAvolatile{0}", "title": "Volatile", "subGroup": "", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "group": "Trait", "description": "", "variable": "TRAvortex{0}", "title": "Vortex", "subGroup": "", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "group": "Trait", "description": "", "variable": "TRAweapon{0}", "title": "Weapon", "subGroup": "", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "group": "Trait", "description": "", "variable": "TRAwall{0}", "title": "Wall", "subGroup": "", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "group": "Trait", "description": "", "variable": "TRAarcing{0}", "title": "Arcing", "subGroup": "", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "group": "Trait", "description": "", "variable": "TRAshield{0}", "title": "Shield", "subGroup": "", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "group": "Trait", "description": "", "variable": "TRAthrown{0}", "title": "Thrown", "subGroup": "", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-Handed", "group": "Trait", "description": "", "variable": "TRAtwo-Handed{0}", "title": "Two-Handed", "subGroup": "", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "group": "Trait", "description": "", "variable": "TRAloud{0}", "title": "Loud", "subGroup": "", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "group": "Trait", "description": "", "variable": "TRAflammable{0}", "title": "Flammable", "subGroup": "", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "group": "Trait", "description": "", "variable": "TRAflexible{0}", "title": "Flexible", "subGroup": "", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "group": "Trait", "description": "", "variable": "TRAfrozen{0}", "title": "Frozen", "subGroup": "", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "group": "Trait", "description": "", "variable": "TRAsharp{0}", "title": "Sharp", "subGroup": "", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "group": "Trait", "description": "", "variable": "TRAsturdy{0}", "title": "Sturdy", "subGroup": "", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "group": "Trait", "description": "", "variable": "TRAtransparent{0}", "title": "Transparent", "subGroup": "", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Downed": {
				"name": "Status_Downed", "fieldName": "downed", "group": "Status", "description": "", "variable": "STSdowned{0}", "title": "Downed", "subGroup": "", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Engaged": {
				"name": "Status_Engaged", "fieldName": "engaged", "group": "Status", "description": "", "variable": "STSengaged{0}", "title": "Engaged", "subGroup": "", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Ethereal": {
				"name": "Status_Ethereal", "fieldName": "ethereal", "group": "Status", "description": "", "variable": "STSethereal{0}", "title": "Ethereal", "subGroup": "", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Grappled": {
				"name": "Status_Grappled", "fieldName": "grappled", "group": "Status", "description": "", "variable": "STSgrappled{0}", "title": "Grappled", "subGroup": "", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Hidden": {
				"name": "Status_Hidden", "fieldName": "hidden", "group": "Status", "description": "", "variable": "STShidden{0}", "title": "Hidden", "subGroup": "", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Initiative Penalty": {
				"name": "Status_Initiative Penalty", "fieldName": "initiativePenalty", "group": "Status", "description": "", "variable": "STSinitiativePenalty{0}", "title": "Initiative Penalty", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Invisible": {
				"name": "Status_Invisible", "fieldName": "invisible", "group": "Status", "description": "", "variable": "STSinvisible{0}", "title": "Invisible", "subGroup": "", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Restrained": {
				"name": "Status_Restrained", "fieldName": "restrained", "group": "Status", "description": "", "variable": "STSrestrained{0}", "title": "Restrained", "subGroup": "", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Unconscious": {
				"name": "Status_Unconscious", "fieldName": "unconscious", "group": "Status", "description": "", "variable": "STSunconscious{0}", "title": "Unconscious", "subGroup": "", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Aflame": {
				"name": "Condition_Aflame", "fieldName": "aflame", "group": "Condition", "description": "", "variable": "CNDaflame{0}", "title": "Aflame", "subGroup": "", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Angered": {
				"name": "Condition_Angered", "fieldName": "angered", "group": "Condition", "description": "", "variable": "CNDangered{0}", "title": "Angered", "subGroup": "", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Chilled": {
				"name": "Condition_Chilled", "fieldName": "chilled", "group": "Condition", "description": "", "variable": "CNDchilled{0}", "title": "Chilled", "subGroup": "", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Delayed": {
				"name": "Condition_Delayed", "fieldName": "delayed", "group": "Condition", "description": "", "variable": "CNDdelayed{0}", "title": "Delayed", "subGroup": "", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Disgusted": {
				"name": "Condition_Disgusted", "fieldName": "disgusted", "group": "Condition", "description": "", "variable": "CNDdisgusted{0}", "title": "Disgusted", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Dying": {
				"name": "Condition_Dying", "fieldName": "dying", "group": "Condition", "description": "", "variable": "CNDdying{0}", "title": "Dying", "subGroup": "", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Empowered": {
				"name": "Condition_Empowered", "fieldName": "empowered", "group": "Condition", "description": "", "variable": "CNDempowered{0}", "title": "Empowered", "subGroup": "", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encouraged": {
				"name": "Condition_Encouraged", "fieldName": "encouraged", "group": "Condition", "description": "", "variable": "CNDencouraged{0}", "title": "Encouraged", "subGroup": "", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encumbered": {
				"name": "Condition_Encumbered", "fieldName": "encumbered", "group": "Condition", "description": "", "variable": "CNDencumbered{0}", "title": "Encumbered", "subGroup": "", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Frightened": {
				"name": "Condition_Frightened", "fieldName": "frightened", "group": "Condition", "description": "", "variable": "CNDfrightened{0}", "title": "Frightened", "subGroup": "", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Hasted": {
				"name": "Condition_Hasted", "fieldName": "hasted", "group": "Condition", "description": "", "variable": "CNDhasted{0}", "title": "Hasted", "subGroup": "", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Immobilized": {
				"name": "Condition_Immobilized", "fieldName": "immobilized", "group": "Condition", "description": "", "variable": "CNDimmobilized{0}", "title": "Immobilized", "subGroup": "", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Impaired": {
				"name": "Condition_Impaired", "fieldName": "impaired", "group": "Condition", "description": "", "variable": "CNDimpaired{0}", "title": "Impaired", "subGroup": "", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Joyful": {
				"name": "Condition_Joyful", "fieldName": "joyful", "group": "Condition", "description": "", "variable": "CNDjoyful{0}", "title": "Joyful", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Launched": {
				"name": "Condition_Launched", "fieldName": "launched", "group": "Condition", "description": "", "variable": "CNDlaunched{0}", "title": "Launched", "subGroup": "", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Paralyzed": {
				"name": "Condition_Paralyzed", "fieldName": "paralyzed", "group": "Condition", "description": "", "variable": "CNDparalyzed{0}", "title": "Paralyzed", "subGroup": "", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Prone": {
				"name": "Condition_Prone", "fieldName": "prone", "group": "Condition", "description": "", "variable": "CNDprone{0}", "title": "Prone", "subGroup": "", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Saddened": {
				"name": "Condition_Saddened", "fieldName": "saddened", "group": "Condition", "description": "", "variable": "CNDsaddened{0}", "title": "Saddened", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Sickened": {
				"name": "Condition_Sickened", "fieldName": "sickened", "group": "Condition", "description": "", "variable": "CNDsickened{0}", "title": "Sickened", "subGroup": "", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Staggered": {
				"name": "Condition_Staggered", "fieldName": "staggered", "group": "Condition", "description": "", "variable": "CNDstaggered{0}", "title": "Staggered", "subGroup": "", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Stunned": {
				"name": "Condition_Stunned", "fieldName": "stunned", "group": "Condition", "description": "", "variable": "CNDstunned{0}", "title": "Stunned", "subGroup": "", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Surprised": {
				"name": "Condition_Surprised", "fieldName": "surprised", "group": "Condition", "description": "", "variable": "CNDsurprised{0}", "title": "Surprised", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Basic Set": {
				"name": "Style_Basic Set", "fieldName": "basicSet", "group": "Style", "description": "", "variable": "STYbasicSet{0}", "title": "Basic Set", "subGroup": "", "descriptions": ["A standard list of techniques. Anyone can perform these techniques. "],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STYbasicSet"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "swordplay", "group": "Style", "description": "", "variable": "STYswordplay{0}", "title": "Swordplay", "subGroup": "", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STYswordplay"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "kiExtension", "group": "Style", "description": "", "variable": "STYkiExtension{0}", "title": "Ki Extension", "subGroup": "", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STYkiExtension"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "group": "Skill", "description": "", "variable": "SKLacrobatics{0}", "title": "Acrobatics", "subGroup": "", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLacrobatics_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "group": "Skill", "description": "", "variable": "SKLagility{0}", "title": "Agility", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLagility_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "group": "Skill", "description": "", "variable": "SKLanalyze{0}", "title": "Analyze", "subGroup": "", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLanalyze_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "group": "Skill", "description": "", "variable": "SKLbuild{0}", "title": "Build", "subGroup": "", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLbuild_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "group": "Skill", "description": "", "variable": "SKLchannel{0}", "title": "Channel", "subGroup": "", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLchannel_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "group": "Skill", "description": "", "variable": "SKLcharm{0}", "title": "Charm", "subGroup": "", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLcharm_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "group": "Skill", "description": "", "variable": "SKLcommand{0}", "title": "Command", "subGroup": "", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLcommand_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "group": "Skill", "description": "", "variable": "SKLconcoct{0}", "title": "Concoct", "subGroup": "", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLconcoct_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "group": "Skill", "description": "", "variable": "SKLcook{0}", "title": "Cook", "subGroup": "", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLcook_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "group": "Skill", "description": "", "variable": "SKLdeception{0}", "title": "Deception", "subGroup": "", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLdeception_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "group": "Skill", "description": "", "variable": "SKLdisguise{0}", "title": "Disguise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLdisguise_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "group": "Skill", "description": "", "variable": "SKLempathy{0}", "title": "Empathy", "subGroup": "", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLempathy_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "group": "Skill", "description": "", "variable": "SKLenchant{0}", "title": "Enchant", "subGroup": "", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLenchant_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "group": "Skill", "description": "", "variable": "SKLfinesse{0}", "title": "Finesse", "subGroup": "", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLfinesse_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "group": "Skill", "description": "", "variable": "SKLflexibility{0}", "title": "Flexibility", "subGroup": "", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLflexibility_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "group": "Skill", "description": "", "variable": "SKLgrappling{0}", "title": "Grappling", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLgrappling_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "group": "Skill", "description": "", "variable": "SKLheal{0}", "title": "Heal", "subGroup": "", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLheal_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "group": "Skill", "description": "", "variable": "SKLintimidation{0}", "title": "Intimidation", "subGroup": "", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLintimidation_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "group": "Skill", "description": "", "variable": "SKLleadership{0}", "title": "Leadership", "subGroup": "", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLleadership_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "group": "Skill", "description": "", "variable": "SKLmaneuver{0}", "title": "Maneuver", "subGroup": "", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLmaneuver_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "group": "Skill", "description": "", "variable": "SKLmedicine{0}", "title": "Medicine", "subGroup": "", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLmedicine_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "group": "Skill", "description": "", "variable": "SKLmight{0}", "title": "Might", "subGroup": "", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLmight_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "group": "Skill", "description": "", "variable": "SKLnegotiation{0}", "title": "Negotiation", "subGroup": "", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLnegotiation_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "group": "Skill", "description": "", "variable": "SKLpalming{0}", "title": "Palming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLpalming_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "group": "Skill", "description": "", "variable": "SKLphysique{0}", "title": "Physique", "subGroup": "", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLphysique_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "group": "Skill", "description": "", "variable": "SKLpilot{0}", "title": "Pilot", "subGroup": "", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLpilot_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "group": "Skill", "description": "", "variable": "SKLresonance{0}", "title": "Resonance", "subGroup": "", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLresonance_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "group": "Skill", "description": "", "variable": "SKLsearch{0}", "title": "Search", "subGroup": "", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLsearch_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "group": "Skill", "description": "", "variable": "SKLshoot{0}", "title": "Shoot", "subGroup": "", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLshoot_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "group": "Skill", "description": "", "variable": "SKLskirmish{0}", "title": "Skirmish", "subGroup": "", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLskirmish_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "group": "Skill", "description": "", "variable": "SKLsneak{0}", "title": "Sneak", "subGroup": "", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLsneak_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "group": "Skill", "description": "", "variable": "SKLsurvival{0}", "title": "Survival", "subGroup": "", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLsurvival_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "group": "Skill", "description": "", "variable": "SKLthrow{0}", "title": "Throw", "subGroup": "", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLthrow_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "group": "Skill", "description": "", "variable": "SKLtinker{0}", "title": "Tinker", "subGroup": "", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."]
				,
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLtinker_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "group": "Skill", "description": "", "variable": "SKLtraversal{0}", "title": "Traversal", "subGroup": "", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLtraversal_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Language_Minere": {
				"name": "Language_Minere", "fieldName": "minere", "group": "Language", "description": "", "variable": "LNGminere{0}", "title": "Minere", "subGroup": "", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Junal": {
				"name": "Language_Junal", "fieldName": "junal", "group": "Language", "description": "", "variable": "LNGjunal{0}", "title": "Junal", "subGroup": "", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Apollen": {
				"name": "Language_Apollen", "fieldName": "apollen", "group": "Language", "description": "", "variable": "LNGapollen{0}", "title": "Apollen", "subGroup": "", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Lib": {
				"name": "Language_Lib", "fieldName": "lib", "group": "Language", "description": "", "variable": "LNGlib{0}", "title": "Lib", "subGroup": "", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Cert": {
				"name": "Language_Cert", "fieldName": "cert", "group": "Language", "description": "", "variable": "LNGcert{0}", "title": "Cert", "subGroup": "", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Byric": {
				"name": "Language_Byric", "fieldName": "byric", "group": "Language", "description": "", "variable": "LNGbyric{0}", "title": "Byric", "subGroup": "", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Dustell": {
				"name": "Language_Dustell", "fieldName": "dustell", "group": "Language", "description": "", "variable": "LNGdustell{0}", "title": "Dustell", "subGroup": "", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Muralic": {
				"name": "Language_Muralic", "fieldName": "muralic", "group": "Language", "description": "", "variable": "LNGmuralic{0}", "title": "Muralic", "subGroup": "", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shira": {
				"name": "Language_Shira", "fieldName": "shira", "group": "Language", "description": "", "variable": "LNGshira{0}", "title": "Shira", "subGroup": "", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Ciel": {
				"name": "Language_Ciel", "fieldName": "ciel", "group": "Language", "description": "", "variable": "LNGciel{0}", "title": "Ciel", "subGroup": "", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Citeq": {
				"name": "Language_Citeq", "fieldName": "citeq", "group": "Language", "description": "", "variable": "LNGciteq{0}", "title": "Citeq", "subGroup": "", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Manstan": {
				"name": "Language_Manstan", "fieldName": "manstan", "group": "Language", "description": "", "variable": "LNGmanstan{0}", "title": "Manstan", "subGroup": "", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Salkan": {
				"name": "Language_Salkan", "fieldName": "salkan", "group": "Language", "description": "", "variable": "LNGsalkan{0}", "title": "Salkan", "subGroup": "", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Sansic": {
				"name": "Language_Sansic", "fieldName": "sansic", "group": "Language", "description": "", "variable": "LNGsansic{0}", "title": "Sansic", "subGroup": "", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Silq": {
				"name": "Language_Silq", "fieldName": "silq", "group": "Language", "description": "", "variable": "LNGsilq{0}", "title": "Silq", "subGroup": "", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Kleikan": {
				"name": "Language_Kleikan", "fieldName": "kleikan", "group": "Language", "description": "", "variable": "LNGkleikan{0}", "title": "Kleikan", "subGroup": "", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Crinere": {
				"name": "Language_Crinere", "fieldName": "crinere", "group": "Language", "description": "", "variable": "LNGcrinere{0}", "title": "Crinere", "subGroup": "", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Palmic": {
				"name": "Language_Palmic", "fieldName": "palmic", "group": "Language", "description": "", "variable": "LNGpalmic{0}", "title": "Palmic", "subGroup": "", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shorespeak": {
				"name": "Language_Shorespeak", "fieldName": "shorespeak", "group": "Language", "description": "", "variable": "LNGshorespeak{0}", "title": "Shorespeak", "subGroup": "", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Verdeni": {
				"name": "Language_Verdeni", "fieldName": "verdeni", "group": "Language", "description": "", "variable": "LNGverdeni{0}", "title": "Verdeni", "subGroup": "", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Vulca": {
				"name": "Language_Vulca", "fieldName": "vulca", "group": "Language", "description": "", "variable": "LNGvulca{0}", "title": "Vulca", "subGroup": "", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Emotion": {
				"name": "Language_Emotion", "fieldName": "emotion", "group": "Language", "description": "", "variable": "LNGemotion{0}", "title": "Emotion", "subGroup": "", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Empathy": {
				"name": "Language_Empathy", "fieldName": "empathy", "group": "Language", "description": "", "variable": "LNGempathy{0}", "title": "Empathy", "subGroup": "", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Wolfwarg": {
				"name": "Language_Wolfwarg", "fieldName": "wolfwarg", "group": "Language", "description": "", "variable": "LNGwolfwarg{0}", "title": "Wolfwarg", "subGroup": "", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Jovean": {
				"name": "Language_Jovean", "fieldName": "jovean", "group": "Language", "description": "", "variable": "LNGjovean{0}", "title": "Jovean", "subGroup": "", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Mytikan": {
				"name": "Language_Mytikan", "fieldName": "mytikan", "group": "Language", "description": "", "variable": "LNGmytikan{0}", "title": "Mytikan", "subGroup": "", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Academics": {
				"name": "Lore_Academics", "fieldName": "academics", "group": "Lore", "description": "", "variable": "LORacademics{0}", "title": "Academics", "subGroup": "", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "group": "Lore", "description": "", "variable": "LORhealth{0}", "title": "Health", "subGroup": "", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "group": "Lore", "description": "", "variable": "LORmana{0}", "title": "Mana", "subGroup": "", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "group": "Lore", "description": "", "variable": "LORmathematics{0}", "title": "Mathematics", "subGroup": "", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "group": "Lore", "description": "", "variable": "LORnature{0}", "title": "Nature", "subGroup": "", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "group": "Lore", "description": "", "variable": "LORschool{0}", "title": "School", "subGroup": "", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "group": "Lore", "description": "", "variable": "LORspirit{0}", "title": "Spirit", "subGroup": "", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "group": "Lore", "description": "", "variable": "LORwarfare{0}", "title": "Warfare", "subGroup": "", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "group": "Lore", "description": "", "variable": "LORzoology{0}", "title": "Zoology", "subGroup": "", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Profession": {
				"name": "Lore_Profession", "fieldName": "profession", "group": "Lore", "description": "", "variable": "LORprofession{0}", "title": "Profession", "subGroup": "", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "group": "Lore", "description": "", "variable": "LORfarming{0}", "title": "Farming", "subGroup": "", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "group": "Lore", "description": "", "variable": "LORfishing{0}", "title": "Fishing", "subGroup": "", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "group": "Lore", "description": "", "variable": "LORhunting{0}", "title": "Hunting", "subGroup": "", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "group": "Lore", "description": "", "variable": "LORlegal{0}", "title": "Legal", "subGroup": "", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "group": "Lore", "description": "", "variable": "LORmercantile{0}", "title": "Mercantile", "subGroup": "", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "group": "Lore", "description": "", "variable": "LORmining{0}", "title": "Mining", "subGroup": "", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Craftmanship": {
				"name": "Lore_Craftmanship", "fieldName": "craftmanship", "group": "Lore", "description": "", "variable": "LORcraftmanship{0}", "title": "Craftmanship", "subGroup": "", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "group": "Lore", "description": "", "variable": "LORalchemy{0}", "title": "Alchemy", "subGroup": "", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "group": "Lore", "description": "", "variable": "LORarchitecture{0}", "title": "Architecture", "subGroup": "", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "group": "Lore", "description": "", "variable": "LORbrewing{0}", "title": "Brewing", "subGroup": "", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "group": "Lore", "description": "", "variable": "LORcooking{0}", "title": "Cooking", "subGroup": "", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "group": "Lore", "description": "", "variable": "LORengineering{0}", "title": "Engineering", "subGroup": "", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "group": "Lore", "description": "", "variable": "LORglassblowing{0}", "title": "Glassblowing", "subGroup": "", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "group": "Lore", "description": "", "variable": "LORleatherworking{0}", "title": "Leatherworking", "subGroup": "", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "group": "Lore", "description": "", "variable": "LORsculpting{0}", "title": "Sculpting", "subGroup": "", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "group": "Lore", "description": "", "variable": "LORsmithing{0}", "title": "Smithing", "subGroup": "", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "group": "Lore", "description": "", "variable": "LORweaving{0}", "title": "Weaving", "subGroup": "", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Geography": {
				"name": "Lore_Geography", "fieldName": "geography", "group": "Lore", "description": "", "variable": "LORgeography{0}", "title": "Geography", "subGroup": "", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "group": "Lore", "description": "", "variable": "LORaridsha{0}", "title": "Aridsha", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "group": "Lore", "description": "", "variable": "LORceres{0}", "title": "Ceres", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "group": "Lore", "description": "", "variable": "LORcolswei{0}", "title": "Colswei", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "group": "Lore", "description": "", "variable": "LORkhem{0}", "title": "Khem", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "group": "Lore", "description": "", "variable": "LORnovus{0}", "title": "Novus", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "group": "Lore", "description": "", "variable": "LORwalthair{0}", "title": "Walthair", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "group": "Lore", "description": "", "variable": "LORwayling{0}", "title": "Wayling", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "etherealPlane", "group": "Lore", "description": "", "variable": "LORetherealPlane{0}", "title": "Ethereal Plane", "subGroup": "", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_History": {
				"name": "Lore_History", "fieldName": "history", "group": "Lore", "description": "", "variable": "LORhistory{0}", "title": "History", "subGroup": "", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridshaHistory", "group": "Lore", "description": "", "variable": "LORaridshaHistory{0}", "title": "Aridsha History", "subGroup": "", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceresHistory", "group": "Lore", "description": "", "variable": "LORceresHistory{0}", "title": "Ceres History", "subGroup": "", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colsweiHistory", "group": "Lore", "description": "", "variable": "LORcolsweiHistory{0}", "title": "Colswei History", "subGroup": "", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khemHistory", "group": "Lore", "description": "", "variable": "LORkhemHistory{0}", "title": "Khem History", "subGroup": "", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novusHistory", "group": "Lore", "description": "", "variable": "LORnovusHistory{0}", "title": "Novus History", "subGroup": "", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthairHistory", "group": "Lore", "description": "", "variable": "LORwalthairHistory{0}", "title": "Walthair History", "subGroup": "", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "waylingHistory", "group": "Lore", "description": "", "variable": "LORwaylingHistory{0}", "title": "Wayling History", "subGroup": "", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Culture": {
				"name": "Lore_Culture", "fieldName": "culture", "group": "Lore", "description": "", "variable": "LORculture{0}", "title": "Culture", "subGroup": "", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "group": "Lore", "description": "", "variable": "LORart{0}", "title": "Art", "subGroup": "", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "group": "Lore", "description": "", "variable": "LORetiquette{0}", "title": "Etiquette", "subGroup": "", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "group": "Lore", "description": "", "variable": "LORfashion{0}", "title": "Fashion", "subGroup": "", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "group": "Lore", "description": "", "variable": "LORgames{0}", "title": "Games", "subGroup": "", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "group": "Lore", "description": "", "variable": "LORmusic{0}", "title": "Music", "subGroup": "", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "group": "Lore", "description": "", "variable": "LORscribing{0}", "title": "Scribing", "subGroup": "", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "group": "Lore", "description": "", "variable": "LORtheater{0}", "title": "Theater", "subGroup": "", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Religion": {
				"name": "Lore_Religion", "fieldName": "religion", "group": "Lore", "description": "", "variable": "LORreligion{0}", "title": "Religion", "subGroup": "", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "churchOfKongkwei", "group": "Lore", "description": "", "variable": "LORchurchOfKongkwei{0}", "title": "Church of Kongkwei", "subGroup": "", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "group": "Lore", "description": "", "variable": "LORguidance{0}", "title": "Guidance", "subGroup": "", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life'sCircle", "group": "Lore", "description": "", "variable": "LORlife'sCircle{0}", "title": "Life's Circle", "subGroup": "", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "oceanCourt", "group": "Lore", "description": "", "variable": "LORoceanCourt{0}", "title": "Ocean Court", "subGroup": "", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "group": "Lore", "description": "", "variable": "LORsylvan{0}", "title": "Sylvan", "subGroup": "", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "group": "Lore", "description": "", "variable": "LORzushaon{0}", "title": "Zushaon", "subGroup": "", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Trainee": {
				"name": "Job_Trainee", "fieldName": "trainee", "group": "Job", "description": "", "variable": "JOBtrainee{0}", "title": "Trainee", "subGroup": "", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBtrainee_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "interceptor", "group": "Job", "description": "", "variable": "JOBinterceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBinterceptor_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "guardian", "group": "Job", "description": "", "variable": "JOBguardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBguardian_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "spellslinger", "group": "Job", "description": "", "variable": "JOBspellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBspellslinger_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "warrior", "group": "Job", "description": "", "variable": "JOBwarrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBwarrior_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "rogue", "group": "Job", "description": "", "variable": "JOBrogue{0}", "title": "Rogue", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBrogue_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "scholar", "group": "Job", "description": "", "variable": "JOBscholar{0}", "title": "Scholar", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBscholar_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "physician", "group": "Job", "description": "", "variable": "JOBphysician{0}", "title": "Physician", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBphysician_techBonus"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Role_Generalist": {
				"name": "Role_Generalist", "fieldName": "generalist", "group": "Role", "description": "", "variable": "ROLgeneralist{0}", "title": "Generalist", "subGroup": "", "descriptions": ["Very general"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Defender": {
				"name": "Role_Defender", "fieldName": "defender", "group": "Role", "description": "", "variable": "ROLdefender{0}", "title": "Defender", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Athlete": {
				"name": "Role_Athlete", "fieldName": "athlete", "group": "Role", "description": "", "variable": "ROLathlete{0}", "title": "Athlete", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Skirmisher": {
				"name": "Role_Skirmisher", "fieldName": "skirmisher", "group": "Role", "description": "", "variable": "ROLskirmisher{0}", "title": "Skirmisher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Marksman": {
				"name": "Role_Marksman", "fieldName": "marksman", "group": "Role", "description": "", "variable": "ROLmarksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Break Free": {
				"name": "Technique_Break Free", "fieldName": "breakFree", "group": "Technique", "description": "", "variable": "TCHbreakFree{0}", "title": "Break Free", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbreakFree_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dash": {
				"name": "Technique_Dash", "fieldName": "dash", "group": "Technique", "description": "", "variable": "TCHdash{0}", "title": "Dash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdash_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Escape": {
				"name": "Technique_Escape", "fieldName": "escape", "group": "Technique", "description": "", "variable": "TCHescape{0}", "title": "Escape", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHescape_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Grapple": {
				"name": "Technique_Grapple", "fieldName": "grapple", "group": "Technique", "description": "", "variable": "TCHgrapple{0}", "title": "Grapple", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgrapple_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hide": {
				"name": "Technique_Hide", "fieldName": "hide", "group": "Technique", "description": "", "variable": "TCHhide{0}", "title": "Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHhide_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Mount": {
				"name": "Technique_Mount", "fieldName": "mount", "group": "Technique", "description": "", "variable": "TCHmount{0}", "title": "Mount", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmount_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Prepare": {
				"name": "Technique_Prepare", "fieldName": "prepare", "group": "Technique", "description": "", "variable": "TCHprepare{0}", "title": "Prepare", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHprepare_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Reposition": {
				"name": "Technique_Reposition", "fieldName": "reposition", "group": "Technique", "description": "", "variable": "TCHreposition{0}", "title": "Reposition", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHreposition_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Seach": {
				"name": "Technique_Seach", "fieldName": "seach", "group": "Technique", "description": "", "variable": "TCHseach{0}", "title": "Seach", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHseach_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Aid": {
				"name": "Technique_Aid", "fieldName": "aid", "group": "Technique", "description": "", "variable": "TCHaid{0}", "title": "Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHaid_techBonus"]
				,
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Encourage": {
				"name": "Technique_Encourage", "fieldName": "encourage", "group": "Technique", "description": "", "variable": "TCHencourage{0}", "title": "Encourage", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHencourage_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stabilize": {
				"name": "Technique_Stabilize", "fieldName": "stabilize", "group": "Technique", "description": "", "variable": "TCHstabilize{0}", "title": "Stabilize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHstabilize_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skill Check": {
				"name": "Technique_Skill Check", "fieldName": "skillCheck", "group": "Technique", "description": "", "variable": "TCHskillCheck{0}", "title": "Skill Check", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHskillCheck_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Build Rapport": {
				"name": "Technique_Build Rapport", "fieldName": "buildRapport", "group": "Technique", "description": "", "variable": "TCHbuildRapport{0}", "title": "Build Rapport", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbuildRapport_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Build Pressure": {
				"name": "Technique_Build Pressure", "fieldName": "buildPressure", "group": "Technique", "description": "", "variable": "TCHbuildPressure{0}", "title": "Build Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbuildPressure_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Captivate": {
				"name": "Technique_Captivate", "fieldName": "captivate", "group": "Technique", "description": "", "variable": "TCHcaptivate{0}", "title": "Captivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcaptivate_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Demand": {
				"name": "Technique_Demand", "fieldName": "demand", "group": "Technique", "description": "", "variable": "TCHdemand{0}", "title": "Demand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdemand_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Grab an Edge": {
				"name": "Technique_Grab an Edge", "fieldName": "grabAnEdge", "group": "Technique", "description": "", "variable": "TCHgrabAnEdge{0}", "title": "Grab an Edge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgrabAnEdge_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Interact": {
				"name": "Technique_Interact", "fieldName": "interact", "group": "Technique", "description": "", "variable": "TCHinteract{0}", "title": "Interact", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHinteract_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Second Wind": {
				"name": "Technique_Second Wind", "fieldName": "secondWind", "group": "Technique", "description": "", "variable": "TCHsecondWind{0}", "title": "Second Wind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsecondWind_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Second Breath": {
				"name": "Technique_Second Breath", "fieldName": "secondBreath", "group": "Technique", "description": "", "variable": "TCHsecondBreath{0}", "title": "Second Breath", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsecondBreath_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undaunted": {
				"name": "Technique_Undaunted", "fieldName": "undaunted", "group": "Technique", "description": "", "variable": "TCHundaunted{0}", "title": "Undaunted", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHundaunted_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Preemptive Strike": {
				"name": "Technique_Preemptive Strike", "fieldName": "preemptiveStrike", "group": "Technique", "description": "", "variable": "TCHpreemptiveStrike{0}", "title": "Preemptive Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpreemptiveStrike_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Preemptive Stagger": {
				"name": "Technique_Preemptive Stagger", "fieldName": "preemptiveStagger", "group": "Technique", "description": "", "variable": "TCHpreemptiveStagger{0}", "title": "Preemptive Stagger", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpreemptiveStagger_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Critical Maim": {
				"name": "Technique_Critical Maim", "fieldName": "criticalMaim", "group": "Technique", "description": "", "variable": "TCHcriticalMaim{0}", "title": "Critical Maim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcriticalMaim_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spellshot": {
				"name": "Technique_Spellshot", "fieldName": "spellshot", "group": "Technique", "description": "", "variable": "TCHspellshot{0}", "title": "Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHspellshot_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Follow-Up Spellshot": {
				"name": "Technique_Follow-Up Spellshot", "fieldName": "follow-UpSpellshot", "group": "Technique", "description": "", "variable": "TCHfollow-UpSpellshot{0}", "title": "Follow-Up Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfollow-UpSpellshot_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bursting Spellshot": {
				"name": "Technique_Bursting Spellshot", "fieldName": "burstingSpellshot", "group": "Technique", "description": "", "variable": "TCHburstingSpellshot{0}", "title": "Bursting Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHburstingSpellshot_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Savior": {
				"name": "Technique_Savior", "fieldName": "savior", "group": "Technique", "description": "", "variable": "TCHsavior{0}", "title": "Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsavior_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knock Away Savior": {
				"name": "Technique_Knock Away Savior", "fieldName": "knockAwaySavior", "group": "Technique", "description": "", "variable": "TCHknockAwaySavior{0}", "title": "Knock Away Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHknockAwaySavior_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Savior's Retaliation": {
				"name": "Technique_Savior's Retaliation", "fieldName": "savior'sRetaliation", "group": "Technique", "description": "", "variable": "TCHsavior'sRetaliation{0}", "title": "Savior's Retaliation", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsavior'sRetaliation_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spellstrike": {
				"name": "Technique_Spellstrike", "fieldName": "spellstrike", "group": "Technique", "description": "", "variable": "TCHspellstrike{0}", "title": "Spellstrike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHspellstrike_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Skirmish": {
				"name": "Technique_Power Skirmish", "fieldName": "powerSkirmish", "group": "Technique", "description": "", "variable": "TCHpowerSkirmish{0}", "title": "Power Skirmish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpowerSkirmish_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sneak Attack": {
				"name": "Technique_Sneak Attack", "fieldName": "sneakAttack", "group": "Technique", "description": "", "variable": "TCHsneakAttack{0}", "title": "Sneak Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsneakAttack_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sneaky Follow-Up": {
				"name": "Technique_Sneaky Follow-Up", "fieldName": "sneakyFollow-Up", "group": "Technique", "description": "", "variable": "TCHsneakyFollow-Up{0}", "title": "Sneaky Follow-Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsneakyFollow-Up_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Assassinate": {
				"name": "Technique_Assassinate", "fieldName": "assassinate", "group": "Technique", "description": "", "variable": "TCHassassinate{0}", "title": "Assassinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHassassinate_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Emergency Care": {
				"name": "Technique_Emergency Care", "fieldName": "emergencyCare", "group": "Technique", "description": "", "variable": "TCHemergencyCare{0}", "title": "Emergency Care", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHemergencyCare_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Nightingale": {
				"name": "Technique_Nightingale", "fieldName": "nightingale", "group": "Technique", "description": "", "variable": "TCHnightingale{0}", "title": "Nightingale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHnightingale_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Rhapsody": {
				"name": "Technique_Rhapsody", "fieldName": "rhapsody", "group": "Technique", "description": "", "variable": "TCHrhapsody{0}", "title": "Rhapsody", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHrhapsody_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Metamagic": {
				"name": "Technique_Metamagic", "fieldName": "metamagic", "group": "Technique", "description": "", "variable": "TCHmetamagic{0}", "title": "Metamagic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmetamagic_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Strategize": {
				"name": "Technique_Strategize", "fieldName": "strategize", "group": "Technique", "description": "", "variable": "TCHstrategize{0}", "title": "Strategize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHstrategize_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Foresight": {
				"name": "Technique_Foresight", "fieldName": "foresight", "group": "Technique", "description": "", "variable": "TCHforesight{0}", "title": "Foresight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHforesight_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Saw That Coming": {
				"name": "Technique_Saw That Coming", "fieldName": "sawThatComing", "group": "Technique", "description": "", "variable": "TCHsawThatComing{0}", "title": "Saw That Coming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsawThatComing_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_As You May Recall": {
				"name": "Technique_As You May Recall", "fieldName": "asYouMayRecall", "group": "Technique", "description": "", "variable": "TCHasYouMayRecall{0}", "title": "As You May Recall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHasYouMayRecall_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Generalist": {
				"name": "Technique_Generalist", "fieldName": "generalist", "group": "Technique", "description": "", "variable": "TCHgeneralist{0}", "title": "Generalist", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgeneralist_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender": {
				"name": "Technique_Defender", "fieldName": "defender", "group": "Technique", "description": "", "variable": "TCHdefender{0}", "title": "Defender", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdefender_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender II": {
				"name": "Technique_Defender II", "fieldName": "defenderII", "group": "Technique", "description": "", "variable": "TCHdefenderII{0}", "title": "Defender II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdefenderII_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Will": {
				"name": "Technique_Defender's Will", "fieldName": "defender'sWill", "group": "Technique", "description": "", "variable": "TCHdefender'sWill{0}", "title": "Defender's Will", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdefender'sWill_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Taunt": {
				"name": "Technique_Defender's Taunt", "fieldName": "defender'sTaunt", "group": "Technique", "description": "", "variable": "TCHdefender'sTaunt{0}", "title": "Defender's Taunt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdefender'sTaunt_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Recovery": {
				"name": "Technique_Defender's Recovery", "fieldName": "defender'sRecovery", "group": "Technique", "description": "", "variable": "TCHdefender'sRecovery{0}", "title": "Defender's Recovery", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdefender'sRecovery_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher": {
				"name": "Technique_Skirmisher", "fieldName": "skirmisher", "group": "Technique", "description": "", "variable": "TCHskirmisher{0}", "title": "Skirmisher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHskirmisher_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher II": {
				"name": "Technique_Skirmisher II", "fieldName": "skirmisherII", "group": "Technique", "description": "", "variable": "TCHskirmisherII{0}", "title": "Skirmisher II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHskirmisherII_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher's Step": {
				"name": "Technique_Skirmisher's Step", "fieldName": "skirmisher'sStep", "group": "Technique", "description": "", "variable": "TCHskirmisher'sStep{0}", "title": "Skirmisher's Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHskirmisher'sStep_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher's Strike": {
				"name": "Technique_Skirmisher's Strike", "fieldName": "skirmisher'sStrike", "group": "Technique", "description": "", "variable": "TCHskirmisher'sStrike{0}", "title": "Skirmisher's Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHskirmisher'sStrike_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman": {
				"name": "Technique_Marksman", "fieldName": "marksman", "group": "Technique", "description": "", "variable": "TCHmarksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmarksman_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman II": {
				"name": "Technique_Marksman II", "fieldName": "marksmanII", "group": "Technique", "description": "", "variable": "TCHmarksmanII{0}", "title": "Marksman II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmarksmanII_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Longshot": {
				"name": "Technique_Marksman's Longshot", "fieldName": "marksman'sLongshot", "group": "Technique", "description": "", "variable": "TCHmarksman'sLongshot{0}", "title": "Marksman's Longshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmarksman'sLongshot_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Sight": {
				"name": "Technique_Marksman's Sight", "fieldName": "marksman'sSight", "group": "Technique", "description": "", "variable": "TCHmarksman'sSight{0}", "title": "Marksman's Sight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmarksman'sSight_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Strike": {
				"name": "Technique_Marksman's Strike", "fieldName": "marksman'sStrike", "group": "Technique", "description": "", "variable": "TCHmarksman'sStrike{0}", "title": "Marksman's Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmarksman'sStrike_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete": {
				"name": "Technique_Athlete", "fieldName": "athlete", "group": "Technique", "description": "", "variable": "TCHathlete{0}", "title": "Athlete", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHathlete_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete II": {
				"name": "Technique_Athlete II", "fieldName": "athleteII", "group": "Technique", "description": "", "variable": "TCHathleteII{0}", "title": "Athlete II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHathleteII_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete's Sprint": {
				"name": "Technique_Athlete's Sprint", "fieldName": "athlete'sSprint", "group": "Technique", "description": "", "variable": "TCHathlete'sSprint{0}", "title": "Athlete's Sprint", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHathlete'sSprint_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete's Reach": {
				"name": "Technique_Athlete's Reach", "fieldName": "athlete'sReach", "group": "Technique", "description": "", "variable": "TCHathlete'sReach{0}", "title": "Athlete's Reach", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHathlete'sReach_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bounding Sprint": {
				"name": "Technique_Bounding Sprint", "fieldName": "boundingSprint", "group": "Technique", "description": "", "variable": "TCHboundingSprint{0}", "title": "Bounding Sprint", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHboundingSprint_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skulk Away": {
				"name": "Technique_Skulk Away", "fieldName": "skulkAway", "group": "Technique", "description": "", "variable": "TCHskulkAway{0}", "title": "Skulk Away", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHskulkAway_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skulk Then Hide": {
				"name": "Technique_Skulk Then Hide", "fieldName": "skulkThenHide", "group": "Technique", "description": "", "variable": "TCHskulkThenHide{0}", "title": "Skulk Then Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHskulkThenHide_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_First Aid": {
				"name": "Technique_First Aid", "fieldName": "firstAid", "group": "Technique", "description": "", "variable": "TCHfirstAid{0}", "title": "First Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfirstAid_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleansing Aid": {
				"name": "Technique_Cleansing Aid", "fieldName": "cleansingAid", "group": "Technique", "description": "", "variable": "TCHcleansingAid{0}", "title": "Cleansing Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcleansingAid_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Environmental Awareness": {
				"name": "Technique_Environmental Awareness", "fieldName": "environmentalAwareness", "group": "Technique", "description": "", "variable": "TCHenvironmentalAwareness{0}", "title": "Environmental Awareness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHenvironmentalAwareness_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Eclectic Knowledge": {
				"name": "Technique_Eclectic Knowledge", "fieldName": "eclecticKnowledge", "group": "Technique", "description": "", "variable": "TCHeclecticKnowledge{0}", "title": "Eclectic Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHeclecticKnowledge_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Point of Clarity": {
				"name": "Technique_Point of Clarity", "fieldName": "pointOfClarity", "group": "Technique", "description": "", "variable": "TCHpointOfClarity{0}", "title": "Point of Clarity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpointOfClarity_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Pole Vault": {
				"name": "Technique_Pole Vault", "fieldName": "poleVault", "group": "Technique", "description": "", "variable": "TCHpoleVault{0}", "title": "Pole Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpoleVault_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Draw": {
				"name": "Technique_Quick Draw", "fieldName": "quickDraw", "group": "Technique", "description": "", "variable": "TCHquickDraw{0}", "title": "Quick Draw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHquickDraw_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extension Strike": {
				"name": "Technique_Extension Strike", "fieldName": "extensionStrike", "group": "Technique", "description": "", "variable": "TCHextensionStrike{0}", "title": "Extension Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHextensionStrike_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Step Extension": {
				"name": "Technique_Step Extension", "fieldName": "stepExtension", "group": "Technique", "description": "", "variable": "TCHstepExtension{0}", "title": "Step Extension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHstepExtension_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lasting Extension": {
				"name": "Technique_Lasting Extension", "fieldName": "lastingExtension", "group": "Technique", "description": "", "variable": "TCHlastingExtension{0}", "title": "Lasting Extension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlastingExtension_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Far Strike": {
				"name": "Technique_Far Strike", "fieldName": "farStrike", "group": "Technique", "description": "", "variable": "TCHfarStrike{0}", "title": "Far Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfarStrike_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extension Strike +": {
				"name": "Technique_Extension Strike +", "fieldName": "extensionStrike+", "group": "Technique", "description": "", "variable": "TCHextensionStrike+{0}", "title": "Extension Strike +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHextensionStrike+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defense Piercer ": {
				"name": "Technique_Defense Piercer ", "fieldName": "defensePiercer", "group": "Technique", "description": "", "variable": "TCHdefensePiercer{0}", "title": "Defense Piercer ", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdefensePiercer_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Slash": {
				"name": "Technique_Quick Slash", "fieldName": "quickSlash", "group": "Technique", "description": "", "variable": "TCHquickSlash{0}", "title": "Quick Slash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHquickSlash_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Precision Blade": {
				"name": "Technique_Precision Blade", "fieldName": "precisionBlade", "group": "Technique", "description": "", "variable": "TCHprecisionBlade{0}", "title": "Precision Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHprecisionBlade_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Armor Piercer": {
				"name": "Technique_Armor Piercer", "fieldName": "armorPiercer", "group": "Technique", "description": "", "variable": "TCHarmorPiercer{0}", "title": "Armor Piercer", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHarmorPiercer_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Slash II": {
				"name": "Technique_Quick Slash II", "fieldName": "quickSlashII", "group": "Technique", "description": "", "variable": "TCHquickSlashII{0}", "title": "Quick Slash II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHquickSlashII_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleave": {
				"name": "Technique_Cleave", "fieldName": "cleave", "group": "Technique", "description": "", "variable": "TCHcleave{0}", "title": "Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcleave_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Crushing Blade": {
				"name": "Technique_Crushing Blade", "fieldName": "crushingBlade", "group": "Technique", "description": "", "variable": "TCHcrushingBlade{0}", "title": "Crushing Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcrushingBlade_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Cleave": {
				"name": "Technique_Great Cleave", "fieldName": "greatCleave", "group": "Technique", "description": "", "variable": "TCHgreatCleave{0}", "title": "Great Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgreatCleave_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleave +": {
				"name": "Technique_Cleave +", "fieldName": "cleave+", "group": "Technique", "description": "", "variable": "TCHcleave+{0}", "title": "Cleave +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcleave+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sudden Cleave": {
				"name": "Technique_Sudden Cleave", "fieldName": "suddenCleave", "group": "Technique", "description": "", "variable": "TCHsuddenCleave{0}", "title": "Sudden Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsuddenCleave_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Cleave II": {
				"name": "Technique_Great Cleave II", "fieldName": "greatCleaveII", "group": "Technique", "description": "", "variable": "TCHgreatCleaveII{0}", "title": "Great Cleave II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgreatCleaveII_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Flex": {
				"name": "Technique_Power Flex", "fieldName": "powerFlex", "group": "Technique", "description": "", "variable": "TCHpowerFlex{0}", "title": "Power Flex", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpowerFlex_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Crush Knuckle": {
				"name": "Technique_Crush Knuckle", "fieldName": "crushKnuckle", "group": "Technique", "description": "", "variable": "TCHcrushKnuckle{0}", "title": "Crush Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcrushKnuckle_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Impact Knuckle": {
				"name": "Technique_Impact Knuckle", "fieldName": "impactKnuckle", "group": "Technique", "description": "", "variable": "TCHimpactKnuckle{0}", "title": "Impact Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHimpactKnuckle_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knuckle Flurry": {
				"name": "Technique_Knuckle Flurry", "fieldName": "knuckleFlurry", "group": "Technique", "description": "", "variable": "TCHknuckleFlurry{0}", "title": "Knuckle Flurry", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHknuckleFlurry_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Water Blast": {
				"name": "Technique_Water Blast", "fieldName": "waterBlast", "group": "Technique", "description": "", "variable": "TCHwaterBlast{0}", "title": "Water Blast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwaterBlast_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Geyser": {
				"name": "Technique_Geyser", "fieldName": "geyser", "group": "Technique", "description": "", "variable": "TCHgeyser{0}", "title": "Geyser", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgeyser_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Geyser Line": {
				"name": "Technique_Geyser Line", "fieldName": "geyserLine", "group": "Technique", "description": "", "variable": "TCHgeyserLine{0}", "title": "Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgeyserLine_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surf": {
				"name": "Technique_Surf", "fieldName": "surf", "group": "Technique", "description": "", "variable": "TCHsurf{0}", "title": "Surf", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsurf_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Geyser Line": {
				"name": "Technique_Great Geyser Line", "fieldName": "greatGeyserLine", "group": "Technique", "description": "", "variable": "TCHgreatGeyserLine{0}", "title": "Great Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgreatGeyserLine_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tidal Wave": {
				"name": "Technique_Tidal Wave", "fieldName": "tidalWave", "group": "Technique", "description": "", "variable": "TCHtidalWave{0}", "title": "Tidal Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHtidalWave_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Surge": {
				"name": "Technique_Sand Surge", "fieldName": "sandSurge", "group": "Technique", "description": "", "variable": "TCHsandSurge{0}", "title": "Sand Surge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsandSurge_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Spout": {
				"name": "Technique_Sand Spout", "fieldName": "sandSpout", "group": "Technique", "description": "", "variable": "TCHsandSpout{0}", "title": "Sand Spout", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsandSpout_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Wave": {
				"name": "Technique_Sand Wave", "fieldName": "sandWave", "group": "Technique", "description": "", "variable": "TCHsandWave{0}", "title": "Sand Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsandWave_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Launcher": {
				"name": "Technique_Sand Launcher", "fieldName": "sandLauncher", "group": "Technique", "description": "", "variable": "TCHsandLauncher{0}", "title": "Sand Launcher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsandLauncher_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sicken": {
				"name": "Technique_Sicken", "fieldName": "sicken", "group": "Technique", "description": "", "variable": "TCHsicken{0}", "title": "Sicken", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsicken_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spores": {
				"name": "Technique_Spores", "fieldName": "spores", "group": "Technique", "description": "", "variable": "TCHspores{0}", "title": "Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHspores_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sickening Cloud": {
				"name": "Technique_Sickening Cloud", "fieldName": "sickeningCloud", "group": "Technique", "description": "", "variable": "TCHsickeningCloud{0}", "title": "Sickening Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsickeningCloud_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Virulent Spores": {
				"name": "Technique_Virulent Spores", "fieldName": "virulentSpores", "group": "Technique", "description": "", "variable": "TCHvirulentSpores{0}", "title": "Virulent Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHvirulentSpores_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Firebolt": {
				"name": "Technique_Firebolt", "fieldName": "firebolt", "group": "Technique", "description": "", "variable": "TCHfirebolt{0}", "title": "Firebolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfirebolt_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Flame Arrow": {
				"name": "Technique_Flame Arrow", "fieldName": "flameArrow", "group": "Technique", "description": "", "variable": "TCHflameArrow{0}", "title": "Flame Arrow", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHflameArrow_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fireball": {
				"name": "Technique_Fireball", "fieldName": "fireball", "group": "Technique", "description": "", "variable": "TCHfireball{0}", "title": "Fireball", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfireball_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fireblast": {
				"name": "Technique_Fireblast", "fieldName": "fireblast", "group": "Technique", "description": "", "variable": "TCHfireblast{0}", "title": "Fireblast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfireblast_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ragnarok": {
				"name": "Technique_Ragnarok", "fieldName": "ragnarok", "group": "Technique", "description": "", "variable": "TCHragnarok{0}", "title": "Ragnarok", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHragnarok_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bonfire": {
				"name": "Technique_Bonfire", "fieldName": "bonfire", "group": "Technique", "description": "", "variable": "TCHbonfire{0}", "title": "Bonfire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbonfire_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wall of Fire": {
				"name": "Technique_Wall of Fire", "fieldName": "wallOfFire", "group": "Technique", "description": "", "variable": "TCHwallOfFire{0}", "title": "Wall of Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwallOfFire_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Field of Flame": {
				"name": "Technique_Field of Flame", "fieldName": "fieldOfFlame", "group": "Technique", "description": "", "variable": "TCHfieldOfFlame{0}", "title": "Field of Flame", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfieldOfFlame_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lightning Shaft": {
				"name": "Technique_Lightning Shaft", "fieldName": "lightningShaft", "group": "Technique", "description": "", "variable": "TCHlightningShaft{0}", "title": "Lightning Shaft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlightningShaft_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shock": {
				"name": "Technique_Shock", "fieldName": "shock", "group": "Technique", "description": "", "variable": "TCHshock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHshock_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lightning Bolt": {
				"name": "Technique_Lightning Bolt", "fieldName": "lightningBolt", "group": "Technique", "description": "", "variable": "TCHlightningBolt{0}", "title": "Lightning Bolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlightningBolt_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Plasma Arc": {
				"name": "Technique_Plasma Arc", "fieldName": "plasmaArc", "group": "Technique", "description": "", "variable": "TCHplasmaArc{0}", "title": "Plasma Arc", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHplasmaArc_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fulgor": {
				"name": "Technique_Fulgor", "fieldName": "fulgor", "group": "Technique", "description": "", "variable": "TCHfulgor{0}", "title": "Fulgor", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfulgor_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Snap": {
				"name": "Technique_Cold Snap", "fieldName": "coldSnap", "group": "Technique", "description": "", "variable": "TCHcoldSnap{0}", "title": "Cold Snap", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcoldSnap_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Frostbite": {
				"name": "Technique_Frostbite", "fieldName": "frostbite", "group": "Technique", "description": "", "variable": "TCHfrostbite{0}", "title": "Frostbite", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfrostbite_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Freezebind": {
				"name": "Technique_Freezebind", "fieldName": "freezebind", "group": "Technique", "description": "", "variable": "TCHfreezebind{0}", "title": "Freezebind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfreezebind_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Burst": {
				"name": "Technique_Cold Burst", "fieldName": "coldBurst", "group": "Technique", "description": "", "variable": "TCHcoldBurst{0}", "title": "Cold Burst", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcoldBurst_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Front": {
				"name": "Technique_Cold Front", "fieldName": "coldFront", "group": "Technique", "description": "", "variable": "TCHcoldFront{0}", "title": "Cold Front", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcoldFront_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Diamond Dust": {
				"name": "Technique_Diamond Dust", "fieldName": "diamondDust", "group": "Technique", "description": "", "variable": "TCHdiamondDust{0}", "title": "Diamond Dust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdiamondDust_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Bullet": {
				"name": "Technique_Wind Bullet", "fieldName": "windBullet", "group": "Technique", "description": "", "variable": "TCHwindBullet{0}", "title": "Wind Bullet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwindBullet_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gust": {
				"name": "Technique_Gust", "fieldName": "gust", "group": "Technique", "description": "", "variable": "TCHgust{0}", "title": "Gust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgust_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Windsweep": {
				"name": "Technique_Windsweep", "fieldName": "windsweep", "group": "Technique", "description": "", "variable": "TCHwindsweep{0}", "title": "Windsweep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwindsweep_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gale": {
				"name": "Technique_Gale", "fieldName": "gale", "group": "Technique", "description": "", "variable": "TCHgale{0}", "title": "Gale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgale_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Darkness": {
				"name": "Technique_Darkness", "fieldName": "darkness", "group": "Technique", "description": "", "variable": "TCHdarkness{0}", "title": "Darkness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdarkness_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Wall": {
				"name": "Technique_Shadow Wall", "fieldName": "shadowWall", "group": "Technique", "description": "", "variable": "TCHshadowWall{0}", "title": "Shadow Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHshadowWall_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Nightfall": {
				"name": "Technique_Nightfall", "fieldName": "nightfall", "group": "Technique", "description": "", "variable": "TCHnightfall{0}", "title": "Nightfall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHnightfall_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fog Cloud": {
				"name": "Technique_Fog Cloud", "fieldName": "fogCloud", "group": "Technique", "description": "", "variable": "TCHfogCloud{0}", "title": "Fog Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfogCloud_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sleet": {
				"name": "Technique_Sleet", "fieldName": "sleet", "group": "Technique", "description": "", "variable": "TCHsleet{0}", "title": "Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsleet_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Freezing Sleet": {
				"name": "Technique_Freezing Sleet", "fieldName": "freezingSleet", "group": "Technique", "description": "", "variable": "TCHfreezingSleet{0}", "title": "Freezing Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfreezingSleet_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hail": {
				"name": "Technique_Hail", "fieldName": "hail", "group": "Technique", "description": "", "variable": "TCHhail{0}", "title": "Hail", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHhail_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Binding Sleet": {
				"name": "Technique_Binding Sleet", "fieldName": "bindingSleet", "group": "Technique", "description": "", "variable": "TCHbindingSleet{0}", "title": "Binding Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbindingSleet_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ice Storm": {
				"name": "Technique_Ice Storm", "fieldName": "iceStorm", "group": "Technique", "description": "", "variable": "TCHiceStorm{0}", "title": "Ice Storm", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHiceStorm_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fimbulwinter": {
				"name": "Technique_Fimbulwinter", "fieldName": "fimbulwinter", "group": "Technique", "description": "", "variable": "TCHfimbulwinter{0}", "title": "Fimbulwinter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfimbulwinter_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Smoke Cloud": {
				"name": "Technique_Smoke Cloud", "fieldName": "smokeCloud", "group": "Technique", "description": "", "variable": "TCHsmokeCloud{0}", "title": "Smoke Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsmokeCloud_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burning Smoke": {
				"name": "Technique_Burning Smoke", "fieldName": "burningSmoke", "group": "Technique", "description": "", "variable": "TCHburningSmoke{0}", "title": "Burning Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHburningSmoke_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Choking Smoke": {
				"name": "Technique_Choking Smoke", "fieldName": "chokingSmoke", "group": "Technique", "description": "", "variable": "TCHchokingSmoke{0}", "title": "Choking Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHchokingSmoke_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Acceleration": {
				"name": "Technique_Acceleration", "fieldName": "acceleration", "group": "Technique", "description": "", "variable": "TCHacceleration{0}", "title": "Acceleration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHacceleration_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Vault": {
				"name": "Technique_Power Vault", "fieldName": "powerVault", "group": "Technique", "description": "", "variable": "TCHpowerVault{0}", "title": "Power Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpowerVault_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Expeditious": {
				"name": "Technique_Expeditious", "fieldName": "expeditious", "group": "Technique", "description": "", "variable": "TCHexpeditious{0}", "title": "Expeditious", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHexpeditious_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Climb": {
				"name": "Technique_Quick Climb", "fieldName": "quickClimb", "group": "Technique", "description": "", "variable": "TCHquickClimb{0}", "title": "Quick Climb", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHquickClimb_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Swim": {
				"name": "Technique_Quick Swim", "fieldName": "quickSwim", "group": "Technique", "description": "", "variable": "TCHquickSwim{0}", "title": "Quick Swim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHquickSwim_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Poise": {
				"name": "Technique_Poise", "fieldName": "poise", "group": "Technique", "description": "", "variable": "TCHpoise{0}", "title": "Poise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpoise_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cat Fall": {
				"name": "Technique_Cat Fall", "fieldName": "catFall", "group": "Technique", "description": "", "variable": "TCHcatFall{0}", "title": "Cat Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcatFall_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kip Up": {
				"name": "Technique_Kip Up", "fieldName": "kipUp", "group": "Technique", "description": "", "variable": "TCHkipUp{0}", "title": "Kip Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHkipUp_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Silent Stride": {
				"name": "Technique_Silent Stride", "fieldName": "silentStride", "group": "Technique", "description": "", "variable": "TCHsilentStride{0}", "title": "Silent Stride", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsilentStride_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shove": {
				"name": "Technique_Shove", "fieldName": "shove", "group": "Technique", "description": "", "variable": "TCHshove{0}", "title": "Shove", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHshove_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knockdown": {
				"name": "Technique_Knockdown", "fieldName": "knockdown", "group": "Technique", "description": "", "variable": "TCHknockdown{0}", "title": "Knockdown", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHknockdown_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tumble": {
				"name": "Technique_Tumble", "fieldName": "tumble", "group": "Technique", "description": "", "variable": "TCHtumble{0}", "title": "Tumble", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHtumble_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Field Medic": {
				"name": "Technique_Field Medic", "fieldName": "fieldMedic", "group": "Technique", "description": "", "variable": "TCHfieldMedic{0}", "title": "Field Medic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfieldMedic_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Camoflauge": {
				"name": "Technique_Camoflauge", "fieldName": "camoflauge", "group": "Technique", "description": "", "variable": "TCHcamoflauge{0}", "title": "Camoflauge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcamoflauge_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Blurred Light": {
				"name": "Technique_Blurred Light", "fieldName": "blurredLight", "group": "Technique", "description": "", "variable": "TCHblurredLight{0}", "title": "Blurred Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHblurredLight_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Light Refraction": {
				"name": "Technique_Light Refraction", "fieldName": "lightRefraction", "group": "Technique", "description": "", "variable": "TCHlightRefraction{0}", "title": "Light Refraction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlightRefraction_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Steps": {
				"name": "Technique_Shadow Steps", "fieldName": "shadowSteps", "group": "Technique", "description": "", "variable": "TCHshadowSteps{0}", "title": "Shadow Steps", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHshadowSteps_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Walker": {
				"name": "Technique_Shadow Walker", "fieldName": "shadowWalker", "group": "Technique", "description": "", "variable": "TCHshadowWalker{0}", "title": "Shadow Walker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHshadowWalker_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Step": {
				"name": "Technique_Wind Step", "fieldName": "windStep", "group": "Technique", "description": "", "variable": "TCHwindStep{0}", "title": "Wind Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwindStep_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Updraft": {
				"name": "Technique_Updraft", "fieldName": "updraft", "group": "Technique", "description": "", "variable": "TCHupdraft{0}", "title": "Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHupdraft_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Clouded Updraft": {
				"name": "Technique_Clouded Updraft", "fieldName": "cloudedUpdraft", "group": "Technique", "description": "", "variable": "TCHcloudedUpdraft{0}", "title": "Clouded Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcloudedUpdraft_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Fall": {
				"name": "Technique_Wind Fall", "fieldName": "windFall", "group": "Technique", "description": "", "variable": "TCHwindFall{0}", "title": "Wind Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwindFall_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Walk on Air": {
				"name": "Technique_Walk on Air", "fieldName": "walkOnAir", "group": "Technique", "description": "", "variable": "TCHwalkOnAir{0}", "title": "Walk on Air", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwalkOnAir_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fire Step": {
				"name": "Technique_Fire Step", "fieldName": "fireStep", "group": "Technique", "description": "", "variable": "TCHfireStep{0}", "title": "Fire Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfireStep_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Liftoff": {
				"name": "Technique_Liftoff", "fieldName": "liftoff", "group": "Technique", "description": "", "variable": "TCHliftoff{0}", "title": "Liftoff", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHliftoff_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Jet": {
				"name": "Technique_Jet", "fieldName": "jet", "group": "Technique", "description": "", "variable": "TCHjet{0}", "title": "Jet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHjet_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cunning Action": {
				"name": "Technique_Cunning Action", "fieldName": "cunningAction", "group": "Technique", "description": "", "variable": "TCHcunningAction{0}", "title": "Cunning Action", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcunningAction_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Demoralize": {
				"name": "Technique_Demoralize", "fieldName": "demoralize", "group": "Technique", "description": "", "variable": "TCHdemoralize{0}", "title": "Demoralize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdemoralize_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fascinate": {
				"name": "Technique_Fascinate", "fieldName": "fascinate", "group": "Technique", "description": "", "variable": "TCHfascinate{0}", "title": "Fascinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHfascinate_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Impersonator": {
				"name": "Technique_Impersonator", "fieldName": "impersonator", "group": "Technique", "description": "", "variable": "TCHimpersonator{0}", "title": "Impersonator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHimpersonator_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ether Sense": {
				"name": "Technique_Ether Sense", "fieldName": "etherSense", "group": "Technique", "description": "", "variable": "TCHetherSense{0}", "title": "Ether Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHetherSense_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spirit Sense": {
				"name": "Technique_Spirit Sense", "fieldName": "spiritSense", "group": "Technique", "description": "", "variable": "TCHspiritSense{0}", "title": "Spirit Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHspiritSense_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tremorsense": {
				"name": "Technique_Tremorsense", "fieldName": "tremorsense", "group": "Technique", "description": "", "variable": "TCHtremorsense{0}", "title": "Tremorsense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHtremorsense_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dustcraft": {
				"name": "Technique_Dustcraft", "fieldName": "dustcraft", "group": "Technique", "description": "", "variable": "TCHdustcraft{0}", "title": "Dustcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdustcraft_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shape Material": {
				"name": "Technique_Shape Material", "fieldName": "shapeMaterial", "group": "Technique", "description": "", "variable": "TCHshapeMaterial{0}", "title": "Shape Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHshapeMaterial_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quickcraft": {
				"name": "Technique_Quickcraft", "fieldName": "quickcraft", "group": "Technique", "description": "", "variable": "TCHquickcraft{0}", "title": "Quickcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHquickcraft_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Shaping": {
				"name": "Technique_Improved Shaping", "fieldName": "improvedShaping", "group": "Technique", "description": "", "variable": "TCHimprovedShaping{0}", "title": "Improved Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHimprovedShaping_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Greater Shaping": {
				"name": "Technique_Greater Shaping", "fieldName": "greaterShaping", "group": "Technique", "description": "", "variable": "TCHgreaterShaping{0}", "title": "Greater Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgreaterShaping_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Legendary Shaping": {
				"name": "Technique_Legendary Shaping", "fieldName": "legendaryShaping", "group": "Technique", "description": "", "variable": "TCHlegendaryShaping{0}", "title": "Legendary Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlegendaryShaping_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dust Material": {
				"name": "Technique_Dust Material", "fieldName": "dustMaterial", "group": "Technique", "description": "", "variable": "TCHdustMaterial{0}", "title": "Dust Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdustMaterial_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dust Area": {
				"name": "Technique_Dust Area", "fieldName": "dustArea", "group": "Technique", "description": "", "variable": "TCHdustArea{0}", "title": "Dust Area", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdustArea_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Dusting": {
				"name": "Technique_Improved Dusting", "fieldName": "improvedDusting", "group": "Technique", "description": "", "variable": "TCHimprovedDusting{0}", "title": "Improved Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHimprovedDusting_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Greater Dusting": {
				"name": "Technique_Greater Dusting", "fieldName": "greaterDusting", "group": "Technique", "description": "", "variable": "TCHgreaterDusting{0}", "title": "Greater Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgreaterDusting_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Legendary Dusting": {
				"name": "Technique_Legendary Dusting", "fieldName": "legendaryDusting", "group": "Technique", "description": "", "variable": "TCHlegendaryDusting{0}", "title": "Legendary Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlegendaryDusting_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Path": {
				"name": "Technique_Form Path", "fieldName": "formPath", "group": "Technique", "description": "", "variable": "TCHformPath{0}", "title": "Form Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHformPath_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Pillar": {
				"name": "Technique_Form Pillar", "fieldName": "formPillar", "group": "Technique", "description": "", "variable": "TCHformPillar{0}", "title": "Form Pillar", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHformPillar_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stepping Path": {
				"name": "Technique_Stepping Path", "fieldName": "steppingPath", "group": "Technique", "description": "", "variable": "TCHsteppingPath{0}", "title": "Stepping Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsteppingPath_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Wall": {
				"name": "Technique_Form Wall", "fieldName": "formWall", "group": "Technique", "description": "", "variable": "TCHformWall{0}", "title": "Form Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHformWall_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Scattered Pillars": {
				"name": "Technique_Scattered Pillars", "fieldName": "scatteredPillars", "group": "Technique", "description": "", "variable": "TCHscatteredPillars{0}", "title": "Scattered Pillars", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHscatteredPillars_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Wall": {
				"name": "Technique_Great Wall", "fieldName": "greatWall", "group": "Technique", "description": "", "variable": "TCHgreatWall{0}", "title": "Great Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgreatWall_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cultivate": {
				"name": "Technique_Cultivate", "fieldName": "cultivate", "group": "Technique", "description": "", "variable": "TCHcultivate{0}", "title": "Cultivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcultivate_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Entangle": {
				"name": "Technique_Entangle", "fieldName": "entangle", "group": "Technique", "description": "", "variable": "TCHentangle{0}", "title": "Entangle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHentangle_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wildwood": {
				"name": "Technique_Wildwood", "fieldName": "wildwood", "group": "Technique", "description": "", "variable": "TCHwildwood{0}", "title": "Wildwood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwildwood_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Distortion": {
				"name": "Technique_Distortion", "fieldName": "distortion", "group": "Technique", "description": "", "variable": "TCHdistortion{0}", "title": "Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdistortion_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lasting Distortion": {
				"name": "Technique_Lasting Distortion", "fieldName": "lastingDistortion", "group": "Technique", "description": "", "variable": "TCHlastingDistortion{0}", "title": "Lasting Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlastingDistortion_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Heat Field": {
				"name": "Technique_Heat Field", "fieldName": "heatField", "group": "Technique", "description": "", "variable": "TCHheatField{0}", "title": "Heat Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHheatField_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burn Guard": {
				"name": "Technique_Burn Guard", "fieldName": "burnGuard", "group": "Technique", "description": "", "variable": "TCHburnGuard{0}", "title": "Burn Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHburnGuard_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Field": {
				"name": "Technique_Cold Field", "fieldName": "coldField", "group": "Technique", "description": "", "variable": "TCHcoldField{0}", "title": "Cold Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHcoldField_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Chill Guard": {
				"name": "Technique_Chill Guard", "fieldName": "chillGuard", "group": "Technique", "description": "", "variable": "TCHchillGuard{0}", "title": "Chill Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHchillGuard_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinesis": {
				"name": "Technique_Kinesis", "fieldName": "kinesis", "group": "Technique", "description": "", "variable": "TCHkinesis{0}", "title": "Kinesis", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHkinesis_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Distant Kinesis": {
				"name": "Technique_Distant Kinesis", "fieldName": "distantKinesis", "group": "Technique", "description": "", "variable": "TCHdistantKinesis{0}", "title": "Distant Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdistantKinesis_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinetic Strike": {
				"name": "Technique_Kinetic Strike", "fieldName": "kineticStrike", "group": "Technique", "description": "", "variable": "TCHkineticStrike{0}", "title": "Kinetic Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHkineticStrike_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinetic Throw": {
				"name": "Technique_Kinetic Throw", "fieldName": "kineticThrow", "group": "Technique", "description": "", "variable": "TCHkineticThrow{0}", "title": "Kinetic Throw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHkineticThrow_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Heavy Kinesis": {
				"name": "Technique_Heavy Kinesis", "fieldName": "heavyKinesis", "group": "Technique", "description": "", "variable": "TCHheavyKinesis{0}", "title": "Heavy Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHheavyKinesis_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burden": {
				"name": "Technique_Burden", "fieldName": "burden", "group": "Technique", "description": "", "variable": "TCHburden{0}", "title": "Burden", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHburden_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Pressure": {
				"name": "Technique_Pressure", "fieldName": "pressure", "group": "Technique", "description": "", "variable": "TCHpressure{0}", "title": "Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHpressure_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Restrain": {
				"name": "Technique_Restrain", "fieldName": "restrain", "group": "Technique", "description": "", "variable": "TCHrestrain{0}", "title": "Restrain", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHrestrain_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wide Pressure": {
				"name": "Technique_Wide Pressure", "fieldName": "widePressure", "group": "Technique", "description": "", "variable": "TCHwidePressure{0}", "title": "Wide Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHwidePressure_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Prostration": {
				"name": "Technique_Prostration", "fieldName": "prostration", "group": "Technique", "description": "", "variable": "TCHprostration{0}", "title": "Prostration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHprostration_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Deep Pressure": {
				"name": "Technique_Deep Pressure", "fieldName": "deepPressure", "group": "Technique", "description": "", "variable": "TCHdeepPressure{0}", "title": "Deep Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdeepPressure_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gravity Well": {
				"name": "Technique_Gravity Well", "fieldName": "gravityWell", "group": "Technique", "description": "", "variable": "TCHgravityWell{0}", "title": "Gravity Well", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHgravityWell_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shield Block": {
				"name": "Technique_Shield Block", "fieldName": "shieldBlock", "group": "Technique", "description": "", "variable": "TCHshieldBlock{0}", "title": "Shield Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHshieldBlock_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Glancing Block": {
				"name": "Technique_Glancing Block", "fieldName": "glancingBlock", "group": "Technique", "description": "", "variable": "TCHglancingBlock{0}", "title": "Glancing Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHglancingBlock_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Aegis": {
				"name": "Technique_Aegis", "fieldName": "aegis", "group": "Technique", "description": "", "variable": "TCHaegis{0}", "title": "Aegis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHaegis_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Light": {
				"name": "Technique_Light", "fieldName": "light", "group": "Technique", "description": "", "variable": "TCHlight{0}", "title": "Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHlight_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dancing Lights": {
				"name": "Technique_Dancing Lights", "fieldName": "dancingLights", "group": "Technique", "description": "", "variable": "TCHdancingLights{0}", "title": "Dancing Lights", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHdancingLights_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Flash": {
				"name": "Technique_Flash", "fieldName": "flash", "group": "Technique", "description": "", "variable": "TCHflash{0}", "title": "Flash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHflash_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sunlight": {
				"name": "Technique_Sunlight", "fieldName": "sunlight", "group": "Technique", "description": "", "variable": "TCHsunlight{0}", "title": "Sunlight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsunlight_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release": {
				"name": "Technique_Stress Release", "fieldName": "stressRelease", "group": "Technique", "description": "", "variable": "TCHstressRelease{0}", "title": "Stress Release", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHstressRelease_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release +": {
				"name": "Technique_Stress Release +", "fieldName": "stressRelease+", "group": "Technique", "description": "", "variable": "TCHstressRelease+{0}", "title": "Stress Release +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHstressRelease+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release ++": {
				"name": "Technique_Stress Release ++", "fieldName": "stressRelease++", "group": "Technique", "description": "", "variable": "TCHstressRelease++{0}", "title": "Stress Release ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHstressRelease++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sensory Training": {
				"name": "Technique_Sensory Training", "fieldName": "sensoryTraining", "group": "Technique", "description": "", "variable": "TCHsensoryTraining{0}", "title": "Sensory Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsensoryTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sensory Training +": {
				"name": "Technique_Sensory Training +", "fieldName": "sensoryTraining+", "group": "Technique", "description": "", "variable": "TCHsensoryTraining+{0}", "title": "Sensory Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsensoryTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Broad Study": {
				"name": "Technique_Broad Study", "fieldName": "broadStudy", "group": "Technique", "description": "", "variable": "TCHbroadStudy{0}", "title": "Broad Study", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbroadStudy_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Experienced Tracker": {
				"name": "Technique_Experienced Tracker", "fieldName": "experiencedTracker", "group": "Technique", "description": "", "variable": "TCHexperiencedTracker{0}", "title": "Experienced Tracker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHexperiencedTracker_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Multilingual": {
				"name": "Technique_Multilingual", "fieldName": "multilingual", "group": "Technique", "description": "", "variable": "TCHmultilingual{0}", "title": "Multilingual", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmultilingual_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Multilingual +": {
				"name": "Technique_Multilingual +", "fieldName": "multilingual+", "group": "Technique", "description": "", "variable": "TCHmultilingual+{0}", "title": "Multilingual +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmultilingual+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore": {
				"name": "Technique_Specialized Lore", "fieldName": "specializedLore", "group": "Technique", "description": "", "variable": "TCHspecializedLore{0}", "title": "Specialized Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHspecializedLore_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore +": {
				"name": "Technique_Specialized Lore +", "fieldName": "specializedLore+", "group": "Technique", "description": "", "variable": "TCHspecializedLore+{0}", "title": "Specialized Lore +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHspecializedLore+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore ++": {
				"name": "Technique_Specialized Lore ++", "fieldName": "specializedLore++", "group": "Technique", "description": "", "variable": "TCHspecializedLore++{0}", "title": "Specialized Lore ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHspecializedLore++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Initiative": {
				"name": "Technique_Improved Initiative", "fieldName": "improvedInitiative", "group": "Technique", "description": "", "variable": "TCHimprovedInitiative{0}", "title": "Improved Initiative", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHimprovedInitiative_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training": {
				"name": "Technique_Knowledge Training", "fieldName": "knowledgeTraining", "group": "Technique", "description": "", "variable": "TCHknowledgeTraining{0}", "title": "Knowledge Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHknowledgeTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training +": {
				"name": "Technique_Knowledge Training +", "fieldName": "knowledgeTraining+", "group": "Technique", "description": "", "variable": "TCHknowledgeTraining+{0}", "title": "Knowledge Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHknowledgeTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training ++": {
				"name": "Technique_Knowledge Training ++", "fieldName": "knowledgeTraining++", "group": "Technique", "description": "", "variable": "TCHknowledgeTraining++{0}", "title": "Knowledge Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHknowledgeTraining++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training": {
				"name": "Technique_Social Training", "fieldName": "socialTraining", "group": "Technique", "description": "", "variable": "TCHsocialTraining{0}", "title": "Social Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsocialTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training +": {
				"name": "Technique_Social Training +", "fieldName": "socialTraining+", "group": "Technique", "description": "", "variable": "TCHsocialTraining+{0}", "title": "Social Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsocialTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training ++": {
				"name": "Technique_Social Training ++", "fieldName": "socialTraining++", "group": "Technique", "description": "", "variable": "TCHsocialTraining++{0}", "title": "Social Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsocialTraining++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Refocus": {
				"name": "Technique_Refocus", "fieldName": "refocus", "group": "Technique", "description": "", "variable": "TCHrefocus{0}", "title": "Refocus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHrefocus_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Refocus +": {
				"name": "Technique_Refocus +", "fieldName": "refocus+", "group": "Technique", "description": "", "variable": "TCHrefocus+{0}", "title": "Refocus +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHrefocus+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sustained Channel": {
				"name": "Technique_Sustained Channel", "fieldName": "sustainedChannel", "group": "Technique", "description": "", "variable": "TCHsustainedChannel{0}", "title": "Sustained Channel", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsustainedChannel_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sustained Channel +": {
				"name": "Technique_Sustained Channel +", "fieldName": "sustainedChannel+", "group": "Technique", "description": "", "variable": "TCHsustainedChannel+{0}", "title": "Sustained Channel +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsustainedChannel+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control": {
				"name": "Technique_Ki Control", "fieldName": "kiControl", "group": "Technique", "description": "", "variable": "TCHkiControl{0}", "title": "Ki Control", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHkiControl_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control +": {
				"name": "Technique_Ki Control +", "fieldName": "kiControl+", "group": "Technique", "description": "", "variable": "TCHkiControl+{0}", "title": "Ki Control +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHkiControl+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control ++": {
				"name": "Technique_Ki Control ++", "fieldName": "kiControl++", "group": "Technique", "description": "", "variable": "TCHkiControl++{0}", "title": "Ki Control ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHkiControl++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surge Value": {
				"name": "Technique_Surge Value", "fieldName": "surgeValue", "group": "Technique", "description": "", "variable": "TCHsurgeValue{0}", "title": "Surge Value", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsurgeValue_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surge Value +": {
				"name": "Technique_Surge Value +", "fieldName": "surgeValue+", "group": "Technique", "description": "", "variable": "TCHsurgeValue+{0}", "title": "Surge Value +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHsurgeValue+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training": {
				"name": "Technique_Channel Training", "fieldName": "channelTraining", "group": "Technique", "description": "", "variable": "TCHchannelTraining{0}", "title": "Channel Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHchannelTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training +": {
				"name": "Technique_Channel Training +", "fieldName": "channelTraining+", "group": "Technique", "description": "", "variable": "TCHchannelTraining+{0}", "title": "Channel Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHchannelTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training ++": {
				"name": "Technique_Channel Training ++", "fieldName": "channelTraining++", "group": "Technique", "description": "", "variable": "TCHchannelTraining++{0}", "title": "Channel Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHchannelTraining++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Physical Training": {
				"name": "Technique_Physical Training", "fieldName": "physicalTraining", "group": "Technique", "description": "", "variable": "TCHphysicalTraining{0}", "title": "Physical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHphysicalTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Physical Training +": {
				"name": "Technique_Physical Training +", "fieldName": "physicalTraining+", "group": "Technique", "description": "", "variable": "TCHphysicalTraining+{0}", "title": "Physical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHphysicalTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training": {
				"name": "Technique_Body Training", "fieldName": "bodyTraining", "group": "Technique", "description": "", "variable": "TCHbodyTraining{0}", "title": "Body Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbodyTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training +": {
				"name": "Technique_Body Training +", "fieldName": "bodyTraining+", "group": "Technique", "description": "", "variable": "TCHbodyTraining+{0}", "title": "Body Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbodyTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training ++": {
				"name": "Technique_Body Training ++", "fieldName": "bodyTraining++", "group": "Technique", "description": "", "variable": "TCHbodyTraining++{0}", "title": "Body Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHbodyTraining++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training": {
				"name": "Technique_Technical Training", "fieldName": "technicalTraining", "group": "Technique", "description": "", "variable": "TCHtechnicalTraining{0}", "title": "Technical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHtechnicalTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training +": {
				"name": "Technique_Technical Training +", "fieldName": "technicalTraining+", "group": "Technique", "description": "", "variable": "TCHtechnicalTraining+{0}", "title": "Technical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHtechnicalTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training ++": {
				"name": "Technique_Technical Training ++", "fieldName": "technicalTraining++", "group": "Technique", "description": "", "variable": "TCHtechnicalTraining++{0}", "title": "Technical Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHtechnicalTraining++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training": {
				"name": "Technique_Martial Training", "fieldName": "martialTraining", "group": "Technique", "description": "", "variable": "TCHmartialTraining{0}", "title": "Martial Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmartialTraining_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training +": {
				"name": "Technique_Martial Training +", "fieldName": "martialTraining+", "group": "Technique", "description": "", "variable": "TCHmartialTraining+{0}", "title": "Martial Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmartialTraining+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training ++": {
				"name": "Technique_Martial Training ++", "fieldName": "martialTraining++", "group": "Technique", "description": "", "variable": "TCHmartialTraining++{0}", "title": "Martial Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHmartialTraining++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up": {
				"name": "Technique_HP Up", "fieldName": "hPUp", "group": "Technique", "description": "", "variable": "TCHhPUp{0}", "title": "HP Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHhPUp_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up+": {
				"name": "Technique_HP Up+", "fieldName": "hPUp+", "group": "Technique", "description": "", "variable": "TCHhPUp+{0}", "title": "HP Up+", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHhPUp+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up++": {
				"name": "Technique_HP Up++", "fieldName": "hPUp++", "group": "Technique", "description": "", "variable": "TCHhPUp++{0}", "title": "HP Up++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHhPUp++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost": {
				"name": "Technique_Vitality Boost", "fieldName": "vitalityBoost", "group": "Technique", "description": "", "variable": "TCHvitalityBoost{0}", "title": "Vitality Boost", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHvitalityBoost_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost +": {
				"name": "Technique_Vitality Boost +", "fieldName": "vitalityBoost+", "group": "Technique", "description": "", "variable": "TCHvitalityBoost+{0}", "title": "Vitality Boost +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHvitalityBoost+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost ++": {
				"name": "Technique_Vitality Boost ++", "fieldName": "vitalityBoost++", "group": "Technique", "description": "", "variable": "TCHvitalityBoost++{0}", "title": "Vitality Boost ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHvitalityBoost++_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undying": {
				"name": "Technique_Undying", "fieldName": "undying", "group": "Technique", "description": "", "variable": "TCHundying{0}", "title": "Undying", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHundying_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undying +": {
				"name": "Technique_Undying +", "fieldName": "undying+", "group": "Technique", "description": "", "variable": "TCHundying+{0}", "title": "Undying +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHundying+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extra Follow-Up Attack": {
				"name": "Technique_Extra Follow-Up Attack", "fieldName": "extraFollow-UpAttack", "group": "Technique", "description": "", "variable": "TCHextraFollow-UpAttack{0}", "title": "Extra Follow-Up Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHextraFollow-UpAttack_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extra Follow-Up Attack +": {
				"name": "Technique_Extra Follow-Up Attack +", "fieldName": "extraFollow-UpAttack+", "group": "Technique", "description": "", "variable": "TCHextraFollow-UpAttack+{0}", "title": "Extra Follow-Up Attack +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHextraFollow-UpAttack+_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Change Tech Slots": {
				"name": "Technique_Change Tech Slots", "fieldName": "changeTechSlots", "group": "Technique", "description": "", "variable": "TCHchangeTechSlots{0}", "title": "Change Tech Slots", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHchangeTechSlots_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hold Out": {
				"name": "Technique_Hold Out", "fieldName": "holdOut", "group": "Technique", "description": "", "variable": "TCHholdOut{0}", "title": "Hold Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHholdOut_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			},
			"Technique_Overdrive": {
				"name": "Technique_Overdrive", "fieldName": "overdrive", "group": "Technique", "description": "", "variable": "TCHoverdrive{0}", "title": "Overdrive", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": ["level", "TCHoverdrive_techBonus"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "_techBonus", "value": 0, "multiplier": 1 }]
			}
		},
		sortingGroups = {
			"group": {
				"Type": ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error"], "Affinity": ["Wood", "Fire", "Earth", "Metal", "Water"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "PageSet": ["Character Creator", "Core", "Advancement", "Training Page"], "Page": ["Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear"], "Attribute": ["Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN"], "Defense": ["Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion"], "Sense": ["Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill"], "General": ["Full Name", "Display Name", "Level", "XP", "Training", "CR", "HP", "WILL", "EN", "Initiative"], "Gear": ["Carrying Capacity"], "Combat": ["Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Combat_Move Speed", "Combat_Move Potency"], "": ["Chakra"], "Social": ["Social_Approval", "Social_Patience"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent"], "Status": ["Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious"], "Condition": ["Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised"], "Style": ["Style_Basic Set", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan"], "Lore": ["Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "Role": ["Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"]
				, "Technique": ["Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"]
			}, "formulaMods": { "CR": ["Skill", "Job", "HP", "WILL", "Initiative", "Combat_HV", "Combat_Chakra", "Social_Approval", "Social_Patience", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "": ["Role", "Language", "Lore", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "Character Creator", "Core", "Advancement", "Training Page", "Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Full Name", "Display Name", "Level", "Training", "CR", "EN", "Chakra", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Level": ["Technique", "HP", "WILL", "Social_Approval"], "Attribute_BOD": ["Defense_Brace", "Defense_Fortitude", "HP", "Carrying Capacity"], "Attribute_PRC": ["Defense_Disruption", "Defense_Hide"], "Attribute_QCK": ["Defense_Reflex", "Defense_Evasion", "Initiative"], "Attribute_INT": ["Sense_Insight", "Sense_Notice"], "Attribute_RSN": ["Sense_Scrutiny", "Sense_Detect"], "Attribute_CNV": ["Sense_Resolve", "Sense_Freewill", "WILL", "Combat_HV", "Social_Approval"] }
		},
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
