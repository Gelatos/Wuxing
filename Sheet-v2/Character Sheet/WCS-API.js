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
                case "!dmg":
                    commandDealDamage(msg, content);
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
            let technique = JSON.parse(components[0]);
            let tokenData = getTokenDataFromTechnique(technique);

            // consume resources
            if (consumeTechniqueResources(tokenData, technique)) {
                displayTechnique(msg, tokenData, technique, components.length > 1 ? JSON.stringify(components[1]) : undefined);
            }
            else {
                WuxingMessages.SendSystemMessage(`${tokenData.displayName} does not have the resources to use ${technique.name}`);
            }
        },

        commandDealDamage = function (msg, content) {
            let tokenData;
            WuxingToken.IterateOverSelectedTokens(msg, function (token) {
                tokenData = WuxingTarget.FindActiveTargetDataByTokenId(token.get("_id"));
                WuxingToken.AddDamage(tokenData, parseInt(content));
            });
        }, 

        commandStartBattle = function () {

            let initiativeData = [];

            WuxingTarget.IterateOverActiveTargetData(function (targetData) {
                initiativeData.push(createInitiativeData(targetData));
                WuxingToken.SetTokenForBattle(targetData);
            });

            // sort the initiative data
            sortInitiativeData(initiativeData);

            // create the table data
            let tableData = [];
            let targetData;
            let obj;
            let firstPlayer = "";

            for (let i = 0; i < initiativeData.length; i++) {
                obj = initiativeData[i].split("@");
                targetData = WuxingTarget.FindActiveTargetDataByCharName(obj[1]);
                tableData.push([targetData.displayName, obj[0]]);

                if (i == 0) {
                    state.WuxingCombat.startSideIsAlly = targetData.isAlly;
                }

                if (firstPlayer == "" && targetData.owner != "") {
                    firstPlayer = targetData.owner;
                }
            }
            state.WuxingCombat.lastActivePlayer = firstPlayer;
            WuxingMessages.SendTableMessage(["Name", "Initiative"], tableData, ["GM"], undefined, true);
            commandStartRound();
        },

        commandStartRound = function () {

            WuxingTarget.IterateOverActiveTargetData(function (tokenData) {
                WuxingToken.ResetTempHp(tokenData);
                WuxingToken.AddKi(tokenData, 10, true);
                WuxingToken.SetTurnIcon(tokenData, true);
            });

            state.WuxingCombat.round++;
            let message = `Round ${state.WuxingCombat.round} Begins!\n`;
            if (state.WuxingCombat.startSideIsAlly) {
                message += `Ally Phase Start!\n${state.WuxingCombat.lastActivePlayer == "" ? "GM" : state.WuxingCombat.lastActivePlayer}, select the next character to have a turn`;
            }
            else {
                message += "Enemy Phase Start!";
            }
            WuxingMessages.SendSystemMessage(message, ["GM"]);
        },

        commandEndTurn = function (msg) {
            let message;
            WuxingToken.IterateOverSelectedTokens(msg, function (token) {
                WuxingToken.SetTurnIcon(tokenData, false);

                message = `${tokenData.displayName} Ends Turn\n${token.isAlly ? "Enemy" : "Ally"} Phase Start`;
                if (isAlly) {
                    if (tokenData.owner != "") {
                        state.WuxingCombat.lastActivePlayer = tokenData.owner;
                    }
                }
                else if (state.WuxingCombat.lastActivePlayer != "") {
                    message += `\n${state.WuxingCombat.lastActivePlayer}, select the next character to have a turn`;
                }

                WuxingMessages.SendSystemMessage(message);
            });
        },

        commandEndCombat = function () {
            WuxingTarget.IterateOverActiveTargetData(function(targetData) {
                WuxingToken.SetTokenForNarative(targetData);
            });
            WuxingTarget.ClearActiveTargetData();
            state.WuxingCombat.lastActivePlayer = "";
            state.WuxingCombat.round = 0;

            WuxingMessages.SendSystemMessage("Combat Has Finished", ["GM"]);
        },

        // Initiative Handling
        // ---------------------------

        rollInitiative = function() {

        },

        createInitiativeData = function(targetData) {
            let value = parseInt(getAttrByName(targetData.charId, "initiative"));
            let roll = randomInteger(20) + value;
            return `${roll < 10 ? "0" : ""}${roll}.${value < 10 ? "0" : ""}${value < 0 ? "0" : value}@${targetData.name}`;
        },

        sortInitiativeData = function(initiativeData) {
            initiativeData.sort();
            initiativeData.reverse();
        },

        // Technique Handling
        // ---------------------------
        
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
            if (resourceData.resourceName == "mana") {
                resourceData.resource = GetCharacterAttribute(targetData.charId, "ki");
                resourceData.cost *= 10;
            }
            else {
                resourceData.resource = GetCharacterAttribute(targetData.charId, resourceData.resourceName);
            }
            return resourceData;
        },

        consumeResourceData = function(targetData, resourceDatas) {
            _.each(resourceDatas, function (obj) {
                if (obj.resourceName == "mana") {
                    WuxingToken.AddKi(targetData, obj.cost * -1, false);
                }
                else {
                    obj.resource.set("current", obj.newVal);
                }
            });
        }


        displayTechnique = function (msg, tokenData, technique, weapon) {
            technique.username = tokenData.displayName;
            let output = TechniqueHandler.GetRollTemplate(technique);
            
            WuxingMessages.SendMessage(output, "", msg.who);
        },
        
        getTokenDataFromTechnique = function (technique) {
            return WuxingTarget.FindActiveTargetDataByCharName(technique.username);
        }
    ;

    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput
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
        switch (tag) {
            case "!m":
            case "!w":
            case "!y":
            case "!t":
            case "!d":
            case "!de":
                commandGetEmoteMessageOptions(msg, tag, content);
            return;
            case "!h":
            case "!r":
            case "!ry":
            case "!i":
            case "!a":
            case "!l":
            case "!s":
                commandSendFormattedMessage(msg, tag, content);
            return;
            case "!emotemessage":
                commandSendEmoteMessage(msg, content);
        }
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
    

    // Public Send Messages
    // ---------------------------
    sendSystemMessage = function (message, targets, sendUser, noarchive) {

        let output = `&{template:systemBox} {{message=${message}}}`;
        sendChatToTargets(output, targets, sendUser, noarchive);
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

        let output = `<div class="sheet-rolltemplate-systemBox"><div>&nbsp;</div><div class="sheet-formattedTextbox"><table class="sheet-wuxTable"><tr>${tableHeader}</tr>${tableRows}</table></div></div>`;

        sendChatToTargets(output, targets, sendUser, noarchive);
    }

    ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        SendMessage: sendChatToTargets,
        SendSystemMessage: sendSystemMessage,
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
            message = `${message} added as ${isAlly ? "allies" : "enemies"}`;
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
                    let index = tate.WuxingTarget.activeCharacters.tokenIds.indexOf(targetData.tokenId);
                    state.WuxingTarget.activeCharacters.targetData = targetData;
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

        // Target Data Creation
        // ---------------------------

        createTargetData = function (token, isAlly) {
            let charId = token.get("represents");
            if (charId != "") {
                let character = getObj('character', charId);
                let targetData = {
                    name: character.get("name"),
                    charId: charId,
                    tokenId: token.get("id"),
                    displayName: getAttrByName(charId, "nickname"),
                    owner: character.get("controlledby"),
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
        FindActiveTargetDataByTokenId: findActiveTargetDataByTokenId

    };

}());


on("ready", function () {
    'use strict';

    WuxingTarget.CheckInstall();
    WuxingToken.CheckInstall();
});

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

        getTargetToken = function (targetData) {
            if (state.WuxingToken.tokens[targetData.tokenId] == undefined) {
                let token = getObj('graphic', targetData.tokenId);
                addToken(token, targetData);
            }
            return state.WuxingToken.tokens[targetData.tokenId];
        },

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

        addToken = function(token, targetData) {
            state.WuxingToken.tokens[targetData.tokenId] = token;
        },

        setTokenForBattle = function (tokenData) {
            let token = getTargetToken(tokenData);

            // set vitals
            let hp = GetCharacterAttribute(tokenData.charId, "hp");
            token.set("bar1_link", hp.get("_id"));
            token.set("bar1_value", hp.get("max"));
            token.set("showplayers_bar1", true);
            token.set("showplayers_bar1text", "2");
            let tempHp = GetCharacterAttribute(tokenData.charId, "tempHp");
            token.set("bar2_link", tempHp.get("_id"));
            token.set("showplayers_bar2", true);
            token.set("showplayers_bar2text", "2");

            // set token name
            token.set("name", getAttrByName(tokenData.charId, "nickname"));
            token.set("showname", true);
            token.set("showplayers_name", true);
            token.set("bar_location", "overlap_bottom");

            // set the token element
            token.set(getAttrByName(tokenData.charId, "token_element"), true);

            // set tooltip
            token.set("show_tooltip", true);
            //token.set("tooltip", getAttrByName(tokenData.charId, "scan-summary"));
        },

        setTokenForNarative = function (tokenData) {
            let token = getTargetToken(tokenData);
            token.set("showplayers_bar1", false);
            token.set("showplayers_bar2", false);
            token.set("showname", false);
            token.set(getAttrByName(tokenData.charId, "token_element"), false);
            token.set("show_tooltip", false);
            token.set("status_yellow", false);
        },

        addHp = function (tokenData, value) {
            let token = getTargetToken(tokenData);

            let total = parseInt(getAttrByName(tokenData.charId, "hp")) + value;
            let remainder = 0;
            if (total < 0) {
                remainder = total;
                total = 0;
            }
            token.set("bar1_value", total);
            return remainder;
        },

        resetTempHp = function (tokenData) {
            let token = getTargetToken(tokenData);
            token.set("bar2_value", getAttrByName(tokenData.charId, "tempHpTotal"));
        },

        addTempHp = function (tokenData, value) {
            let token = getTargetToken(tokenData);
            let total = parseInt(token.get("bar2_value")) + value;
            let remainder = 0;
            if (total < 0) {
                remainder = total;
                total = 0;
            }
            token.set("bar2_value", total);
            return remainder;
        },

        addDamage = function (tokenData, value, stopAtTempHp) {
            let token = getTargetToken(tokenData);

            // make the damage value negative
            value *= -1;

            // first deal any damage to tempHp
            value = addTempHp(tokenData, value);

            // if damage remains, go to health damage
            if (!stopAtTempHp && value < 0) {
                let currentHp = parseInt(token.get("bar2_value"));
                let maxHp = parseInt(token.get("bar2_max"));
                let trauma = GetCharacterAttribute(tokenData.charId, "trauma");
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
                    let wounds = GetCharacterAttribute(tokenData.charId, "wounds");
                    wounds.set("current", parseInt(wounds.get("current")) + woundDamage);
                    trauma.set("current", parseInt(trauma.get("current")) + woundDamage);
                }
            }
        },

        addKi = function (tokenData, value, cap) {
            let token = getTargetToken(tokenData);
            let ki = GetCharacterAttribute(tokenData.charId, "ki");
            let newValue = parseInt(ki.get("current")) + value;
            if (cap && newValue > parseInt(ki.get("max"))) {
                newValue = parseInt(ki.get("max"));
            }
            ki.set("current", newValue);
            let mana = Math.floor(newValue / 10);
            token.set(tokenData.elem, mana);
        },

        setTurnIcon = function (tokenData, value) {
            let token = getTargetToken(tokenData);
            token.set("status_yellow", value);
        }


        ;
    return {
        CheckInstall: checkInstall,
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

var TechniqueHandler = TechniqueHandler || (function () {
    'use strict';

    var 
        getRollTemplate = function(technique) {
        
            let output = "";
        
            // if this is an augment, incorporate the base into the rolltemplate
            if (technique.augmentBase != "") {
                if (technique.augmentTech != undefined) {
                    technique = SetAugmentTechnique(technique, technique.augmentTech);
                }
            }
            else {
                output += "{{type-base=1}} ";
            }
        
            output += `{{Username=${technique.username}}}`;
            output += `{{Name=${technique.name}}}`;
            output += `{{Type=${technique.techniqueType}}}`;
            output += `{{type-${technique.techniqueType}=1}} `;
            output += `{{Group=${technique.techniqueSubGroup == "" ? technique.techniqueGroup : technique.techniqueSubGroup}}}`;
        
            // create the action line
            let actionLine = "";
            if (technique.action != "") {
                output += `{{type-${technique.action}=1}} `;
                actionLine += technique.action;
            }
            if (technique.limits != "") {
                if (actionLine != "") {
                    actionLine += "; ";
                }
                actionLine += technique.limits;
            }
            if (technique.resourceCost != "") {
                if (actionLine != "") {
                    actionLine += "; ";
                }
                actionLine += technique.resourceCost;
            }
            if (actionLine != "") {
                output += `{{ActionLine=${actionLine}}} `;
            }
            if (technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.prerequisite != "") {
                output += "{{type-FunctionBlock=1}} ";
        
                if (technique.traits != "") {
                    var traitsDb = getTraitsDictionary(technique.traits, "technique");
                    for (var i = 0; i < traitsDb.length; i++) {
                        output += `{{Trait${i}=${traitsDb[i].name}}} {{Trait${i}Desc=${traitsDb[i].description}}} `;
                    }
                }
                if (technique.trigger != "") {
                    output += `{{Trigger=${technique.trigger}}} `;
                }
                if (technique.requirement != "") {
                    output += `{{Requirement=${technique.requirement}}} `;
                }
                if (technique.prerequisite != "") {
                    output += `{{Prerequisites=${technique.prerequisite}}} `;
                }
            }
            if (technique.skill != "" || technique.defense != "" || technique.range != "" || technique.target != "" || (technique.dVal != "" && technique.dVal != 0) || technique.damageType != "") {
                output += "{{type-AttackBlock=1}} ";
        
                if (technique.range != "" || technique.target != "") {
                    output += "{{type-AttackBlockTarget=1}} ";
        
                    if (technique.range != "") {
                        output += `{{Range=${technique.range}}} {{RType=${technique.rType}}} `;
                    }
                    if (technique.target != "") {
                        output += `{{Target=${technique.target}}} `;
                    }
                }
                if (technique.skill != "") {
                    let skill = "";
                    if (technique.defense != "") {
                        if (technique.defense.indexOf("DC")) {
                            skill = technique.defense;
                        }
                        else {
                            skill = `${technique.defense} Check`;
                        }
                    }
                    else {
                        skill = "DC 15";
                    }
                    skill = `${technique.skill} vs. ${skill}`;
                    output += `{{SkillString=${skill}}} `;
                }
                if ((technique.dVal != "" && technique.dVal > 0) || technique.damageType != "") {
                    output += `{{DamageString=${FormatDamageString(technique)}}} `;
                }
            }
            if (technique.description != "" || technique.onSuccess != "") {
                output += "{{type-DescBlock=1}} ";
                if (technique.description != "") {
                    output += `{{Desc=${technique.description}}} `;
                }
                if (technique.onSuccess != "") {
                    output += `{{OnHit=${technique.onSuccess}}} `;
                }
            }
        
            
        
            output = `&{template:technique} ${output.trim()}`;
            return output;
        },
        
        getConsumeUsePost = function(technique) {
        
            // add technique data for the api
            technique.username = "@{character_name}";
            let usedTechData = JSON.stringify(technique);
        
            // add the equopped action at the end
            if (technique.traits != "" && (technique.traits.indexOf("Armament") >= 0 || technique.traits.indexOf("Arsenal") >= 0)) {
                usedTechData += "##@{technique-equippedWeapon}";
            }
        
            return `!ctech ${usedTechData}`;
        },

        getTraitsDictionary = function(traits, traitType) {

            let output = [];
            if (traits != undefined) {
                let keywordsSplit = traits.split(";");
        
                let name = "";
                let lookup = "";
                let traitInfo;
        
                for (let i = 0; i < keywordsSplit.length; i++) {
                    name = "" + keywordsSplit[i].trim();
        
                    if (name.includes("Impact") || name.includes("Explosive")) {
                        name = ReplaceDamageDice(name);
                    }
        
                    lookup = name;
                    if (lookup.indexOf("(") >= 0) {
                        lookup = lookup.replace(/\([^)]*\)/g, "(X)");
                    }
        
                    switch (traitType.toLowerCase()) {
                        case "technique": traitInfo = GetTechniqueTraitsInfo(lookup); break;
                        case "item": traitInfo = GetItemTraitsInfo(lookup); break;
                        case "ability": traitInfo = GetAbilityTraitsInfo(lookup); break;
                        case "material": traitInfo = GetMaterialTraitsInfo(lookup); break;
                    }
                    traitInfo.name = name;
                    output.push(traitInfo);
                }
            }
        
            return output;
        }

    ;
    return {
        GetRollTemplate: getRollTemplate,
        GetConsumeUsePost: getConsumeUsePost
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

// ====== Formatters

function CreateDictionary() {
    return {
        keys: [],
        values: {},

        add: function(key, value) {
            if (!this.keys.includes(key)) {
                this.keys.push(key);
            }
            this.values[key] = value;
        },
        has: function(key) {
            return this.keys.includes(key);
        }
    }
}

function ToCamelCase(inputString) {

    if (inputString == "") {
        return inputString;
    }

    // Split the input string by spaces and iterate through the words
    let words = inputString.split(' ');
    words[0] = words[0][0].toLowerCase() + words[0].slice(1);
    for (let i = 1; i < words.length; i++) {
        // Capitalize the first letter of each word (except the first word)
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    return words.join('');
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

// ======== Shared Features
function GetTechniqueTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "affinity":
			return { "name": "Affinity", "group": "Technique", "description": "This technique's element changes to one of your elemental affinities." }
		case "affinity [m]":
			return { "name": "Affinity [M]", "group": "Technique", "description": "This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice." }
		case "ap (x)":
			return { "name": "AP (X)", "group": "Technique", "description": "This technique adds armor piercing. Ignore up to X Armor on the target." }
		case "armament":
			return { "name": "Armament", "group": "Technique", "description": "This technique uses the skill, threat, and damage statistics of an equipped melee weapon." }
		case "armament [f]":
			return { "name": "Armament [F]", "group": "Technique", "description": "This technique uses the skill, threat, and damage statistics and all abilities of an equipped melee weapon." }
		case "arsenal":
			return { "name": "Arsenal", "group": "Technique", "description": "This technique uses the skill, range, and damage statistics of an equipped ranged weapon." }
		case "arsenal [f]":
			return { "name": "Arsenal [F]", "group": "Technique", "description": "This technique uses the skill, range, and damage statistics and all abilities of an equipped ranged weapon." }
		case "brutal":
			return { "name": "Brutal", "group": "Technique", "description": "When this technique deals damage, roll all damage dice twice and take only the highest results." }
		case "focus":
			return { "name": "Focus", "group": "Technique", "description": "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus [F] effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time." }
		case "focus [f]":
			return { "name": "Focus [F]", "group": "Technique", "description": "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus [F] effect at a time. When you take Trauma, all on going Focus [F] effects immediately end. The caster can end a Focus [F] technique at any time." }
		case "material":
			return { "name": "Material", "group": "Technique", "description": "This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique." }
		case "multiple":
			return { "name": "Multiple", "group": "Technique", "description": "This technique can be learned multiple times." }
		case "volatile":
			return { "name": "Volatile", "group": "Technique", "description": "This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally." }
		case "vortex":
			return { "name": "Vortex", "group": "Technique", "description": "This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape." }
		case "wall":
			return { "name": "Wall", "group": "Technique", "description": "This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material." }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

function GetItemTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "arcing":
			return { "name": "Arcing", "group": "Item", "description": "This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover." }
		case "shield":
			return { "name": "Shield", "group": "Item", "description": "This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility." }
		case "thrown":
			return { "name": "Thrown", "group": "Item", "description": "This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill." }
		case "two-handed":
			return { "name": "Two-Handed", "group": "Item", "description": "This weapon is required to be wielded in two hands." }
		case "loud":
			return { "name": "Loud", "group": "Item", "description": "This weapon creates a loud booming noise, audible to those within 300 feet of the source." }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

function GetAbilityTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "ap (x)":
			return { "name": "AP (X)", "group": "Ability", "description": "This weapon is armor piercing. Ignore up to X Armor on the target." }
		case "blast (x)":
			return { "name": "Blast (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters within a radius of X spaces, drawn from a point within range and line of sight. Cover and line of sight are calculated based on the center of the blast, rather than the attacker’s position." }
		case "cone (x)":
			return { "name": "Cone (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters within a cone, X spaces long and X spaces wide at its furthest point. The cone begins 1 space wide." }
		case "crushing":
			return { "name": "Crushing", "group": "Ability", "description": "This weapon can crush through defenses. Actions that target BR DC instead targets Reflex DC." }
		case "explosive (x/y)":
			return { "name": "Explosive (X/Y)", "group": "Ability", "description": "This weapon can explode on impact. Attacks made with this weapon affect characters within a radius of X spaces, drawn from the impact point, and deals X extra damage to all characters in the area." }
		case "impact (x)":
			return { "name": "Impact (X)", "group": "Ability", "description": "This weapon deals X extra damage." }
		case "knockback (x)":
			return { "name": "Knockback (X)", "group": "Ability", "description": "On a hit, the user may choose to knock their target X spaces in a straight line directly away from the point of origin." }
		case "line (x)":
			return { "name": "Line (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters in a straight line, X spaces long." }
		case "quick":
			return { "name": "Quick", "group": "Ability", "description": "This weapon is easy to maneuver allowing you to easily strike at enemies trying to evade you. Actions that target BR DC instead targets Brace DC." }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

function GetMaterialTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "flammable":
			return { "name": "Flammable", "group": "Material", "description": "This material will gain the aflame condition when exposed to fire." }
		case "flexible":
			return { "name": "Flexible", "group": "Material", "description": "Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage." }
		case "frozen":
			return { "name": "Frozen", "group": "Material", "description": "Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour." }
		case "sharp":
			return { "name": "Sharp", "group": "Material", "description": "Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin." }
		case "sturdy":
			return { "name": "Sturdy", "group": "Material", "description": "Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force." }
		case "transparent":
			return { "name": "Transparent", "group": "Material", "description": "A transparent material can be seen through due to its translucency. " }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

