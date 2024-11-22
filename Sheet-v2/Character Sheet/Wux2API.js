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

        WuxConflictManager.HandleInput(msg, tag, content);
        WuxTechniqueResolver.HandleInput(msg, tag, content);
        WuxMessage.HandleMessageInput(msg, tag, content);
        TargetReference.HandleInput(msg, tag, content);
        TokenReference.HandleInput(msg, tag, content);

        switch(tag) {
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

DebugLog = function (msg) {
    log(msg);
}

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

class TeamData {
    constructor(name, index, isPlayer, lastActiveOwner) {
        this.name = name;
        this.index = index;
        this.isPlayer = isPlayer;
        this.lastActiveOwner = lastActiveOwner;
    }
}

var WuxConflictManager = WuxConflictManager || (function () {
    'use strict';

    var schemaVersion = "0.1.2",

    checkInstall = function () {
        if (!state.hasOwnProperty('WuxConflictManager') || state.WuxConflictManager.version !== schemaVersion) {
            state.WuxConflictManager = {
                version: schemaVersion,
                conflictType: "",
                round: 0,
                teams: [],
                activeTeamIndex: 0,
                startRoundTeamIndex: 0,
            };
            setDefaultTeams();
        }
    },
    handleInput = function (msg, tag, content) {
        switch (tag) {
            case "!cmbstartbattle":
                commandStartBattle();
                break;
            case "!cmbstartsocial":
                commandStartSocial();
                break;
            case "!startround":
                commandStartRound();
                break;
            case "!endturn":
                commandEndTurn(msg);
                break;
            case "!endcombat":
                commandEndConflict();
                break;
        };
    },

    commandStartBattle = function () {
        state.WuxConflictManager.conflictType = "Battle";
        startConflict();
    },
    commandStartSocial = function () {
        state.WuxConflictManager.conflictType = "Social";
        startConflict();
    },
    commandStartRound = function () {
        startRound();
    },
    commandEndTurn = function (msg) {
        endTurn(msg);
    },
    commandEndConflict = function () {
        endConflict();
    },

    setDefaultTeams = function() {
        state.WuxConflictManager.teams = [];
        state.WuxConflictManager.teams.push(new TeamData("Ally", 0, true, ""));
        state.WuxConflictManager.teams.push(new TeamData("Enemy", 1, false, ""));
    },
    
    startConflict = function() {
        state.WuxConflictManager.round = 0;
        rollInitiative();
        setActiveTokensForConflict();
        startRound();
    },
    endConflict = function() {
        TargetReference.IterateOverActiveTargetData(function(tokenTargetData) {
            if (tokenTargetData != undefined) {
                TokenReference.ResetTokenDisplay(tokenTargetData);
            }
        });
        resetCombatStateVariables();
        
        let systemMessage = new SystemInfoMessage("Conflict Has Finished");
        systemMessage.setSender("System");
        WuxMessage.Send(systemMessage, "GM");
    },
    rollInitiative = function() {
        let initDef = WuxDef.Get("Initiative");
        let tableData = new TableMessage(["Name", initDef.title]);
        let tokenTargetDataArray = [];
        TargetReference.IterateOverActiveTargetData(function (tokenTargetData) {
            tokenTargetDataArray.push(tokenTargetData);
        });
        let results = tableData.addTargetModifierTable(tokenTargetDataArray, initDef.getVariable());
        state.WuxConflictManager.startRoundTeamIndex = results[0].tokenTargetData.teamIndex;
        
        let setTeams = [];
        let teamsToSet = state.WuxConflictManager.teams.length;
        for (let i = 0; i < teamsToSet; i++) {
            setTeams[i] = false;
        }
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (!setTeams[result.tokenTargetData.teamIndex]) {
                state.WuxConflictManager.teams[result.tokenTargetData.teamIndex].lastActiveOwner = result.tokenTargetData.owner;
                setTeams[result.tokenTargetData.teamIndex] = true;
                teamsToSet--;
                if (teamsToSet <= 0) {
                    break;
                }
            }
        };

        let systemMessage = new SystemInfoMessage(tableData.print());
        systemMessage.setSender("System");
        WuxMessage.Send(systemMessage);
    },
    resetCombatStateVariables = function() {
        TargetReference.ClearActiveTargetData();
        state.WuxConflictManager.round = 0;
        setDefaultTeams();
    },
    
    // round start
    startRound = function() {
        state.WuxConflictManager.round++;
        setStartRoundTokens();
        sendStartRoundMessage();
    },
    setStartRoundTokens = function() {
        TargetReference.IterateOverActiveTargetData(function (tokenTargetData) {
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            tokenTargetData.addEnergy(attributeHandler, 1);
            switch (state.WuxConflictManager.conflictType) {
                case "Battle":
                    tokenTargetData.setDash(attributeHandler);
                    break;
                case "Social":
                    tokenTargetData.addPatience(attributeHandler, -1);
                    tokenTargetData.setTurnIcon(true);
                    break;
            }
            
            attributeHandler.run();
        });
    },
    sendStartRoundMessage = function() {
        let message = `Round ${state.WuxConflictManager.round} Begins!\n`;
        state.WuxConflictManager.activeTeamIndex = state.WuxConflictManager.startRoundTeamIndex;
        message += getPhaseStartMessage();
        let systemMessage = new SystemInfoMessage(message);
        systemMessage.setSender("System");
        WuxMessage.Send(systemMessage);
    },

    // end turn
    endTurn = function(msg) {
        setNextActiveTeam();
        TokenReference.IterateOverSelectedTokens(msg, function (tokenTargetData) {
            TokenReference.SetTurnIcon(tokenTargetData, false);
            sendEndTurnMessage(tokenTargetData);
        });
    },
    setNextActiveTeam = function() {
        let activeTeam = state.WuxConflictManager.activeTeamIndex;
        activeTeam++;
        if (activeTeam >= state.WuxConflictManager.teams.length) {
            activeTeam == 0;
        }
        state.WuxConflictManager.activeTeamIndex = activeTeam;
    },
    sendEndTurnMessage = function(targetData) {
        let message = `${targetData.displayName} Ends Turn\n`;
        message += getPhaseStartMessage();
        let systemMessage = new SystemInfoMessage(message);
        systemMessage.setSender("System");
        WuxMessage.Send(systemMessage);
    },
    getPhaseStartMessage = function() {
        let team = state.WuxConflictManager.teams[state.WuxConflictManager.activeTeamIndex];
        if (team.isPlayer && team.lastActiveOwner != "") {
            return `${team.name} Phase Start!\n${team.lastActiveOwner}, select the next character to have a turn`;
        }
        else {
            return " Phase Start!";
        }
    },

    // Token State
    setActiveTokensForConflict = function() {
        TargetReference.IterateOverActiveTargetData(function (tokenTargetData) {
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            TokenReference.SetTokenForConflict(state.WuxConflictManager.conflictType, tokenTargetData, attributeHandler);
            attributeHandler.run();
        });
    }
    ;

    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput
    };

}());

var WuxTechniqueResolver = WuxTechniqueResolver || (function () {
    'use strict';

    var schemaVersion = "0.1.1",

        checkInstall = function () {
            if (!state.hasOwnProperty('WuxTechniqueResolver') || state.WuxTechniqueResolver.version !== schemaVersion) {
                state.WuxTechniqueResolver = {
                    version: schemaVersion
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
                case "!roll":
                    commandRollSkillCheck(msg, content);
                    break;
            };
        },
        
        commandConsumeTechnique = function (msg, content) {
            let components = content.split("|");
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
        commandRollSkillCheck = function (msg, content) {
            rollSkillCheck(msg, ParseIntValue(content));
        },

        // Technique Handling
        getUserTargetDataFromTechnique = function (technique) {
            return TargetReference.GetTokenTargetDataByName(technique.username);
        },
        getDefenderTargetDataFromTechnique = function (technique) {
            return TargetReference.GetTokenTargetData(technique.target);
        },

        // Math
        rollSkillCheck = function(msg, count) {
            let results = Dice.RollSkillCheck(count, 0);
            let message = `${Format.ShowTooltip(`Rolling Skill Check ${results.total}`, results.message)}`;
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
                    TokenReference.AddEnergy(targetData, obj.cost * -1, false);
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

    WuxConflictManager.CheckInstall();
    WuxTechniqueResolver.CheckInstall();
});

var WuxMessage = WuxMessage || (function () {
    'use strict';

    var
    parse = function (messageType, textMessage) {
        switch (messageType) {
            case "!m": return new SpeakEmoteMessage(textMessage);
            case "!w": return new WhisperEmoteMessage(textMessage);
            case "!y": return new YellEmoteMessage(textMessage);
            case "!t": return new ThinkEmoteMessage(textMessage);
            case "!d": return new DescEmoteMessage(textMessage);
            case "!intro": return new IntroEmoteMessage(textMessage);
            case "!a": return new AttackMessage(textMessage);
            case "!r": return new ResponseMessage(textMessage);
            case "!ry": return new ResponseYellMessage(textMessage);
            case "!i": return new InfoMessage(textMessage);
            case "!s": return new SystemInfoMessage(textMessage);
            case "!sa": return new SystemInfoAuxMessage(textMessage);
        }
        return undefined;
    },

    parseInput = function (msgContent) {
        let contentIndex = msgContent.indexOf(" ");
        if (contentIndex > 0) {
            return parse(msgContent.substring(0, contentIndex), msgContent.substring(contentIndex + 1));
        }
        return undefined;
    },

    parseType = function (type, textMessage) {
        if (textMessage == undefined) {
            textMessage = "";
        }
        switch (type) {
            case "ctmsg": return new SpeakEmoteMessage(textMessage);
            case "ctwsp": return new WhisperEmoteMessage(textMessage);
            case "ctyell": return new YellEmoteMessage(textMessage);
            case "ctthk": return new ThinkEmoteMessage(textMessage);
            case "ctdesc": return new DescEmoteMessage(textMessage);
            case "ctintro": return new IntroEmoteMessage(textMessage);
            case "attackBox": return new AttackMessage(textMessage);
            case "responseBox": return new ResponseMessage(textMessage);
            case "responseYellBox": return new ResponseYellMessage(textMessage);
            case "infoBox": return new InfoMessage(textMessage);
            case "systemInfoBox": return new SystemInfoMessage(textMessage);
            case "systemInfoAuxBox": return new SystemInfoAuxMessage(textMessage);
        }
        return undefined;
    },

    handleMessageInput = function (msg, tag, content) {
        let messageObject = parse(tag, content);
        if (messageObject != undefined) {
            let targetData = new TargetData(msg);
            createEmoteOptions(msg.who, targetData, messageObject);
        }
        else {
            switch (tag) {
                case "!setlang": 
                    let languageObj = new setLanguageObj(content);
                    languageObj.setCharacterLanguage(msg.who);
                break;
            }
        }
    },

    createEmoteOptions = function (sender, targetData, messageObject) {
        let attributeHandler = new SandboxAttributeHandler(targetData.charId);
		let emotesVar = WuxDef.GetVariable("Chat_Emotes");
        let languageVar = WuxDef.GetVariable("Language", WuxDef._true);
        let affinityVar = WuxDef.GetVariable("Affinity");

        attributeHandler.addMod([emotesVar, languageVar, affinityVar]);
        attributeHandler.addFinishCallback(function(attrHandler) {
            messageObject.setTitle(targetData.displayName);
            messageObject.setLanguageByTarget(targetData);
            messageObject.setAffinity(attrHandler.parseString(affinityVar));

            let output = "<div style='font-weight: bold'>Emotes</div>";
            let outfitEmoteSetData = new EmoteSetData(attrHandler.parseJSON(emotesVar));
            outfitEmoteSetData.iterate(function(emoteData) {
                if (emoteData.url != "") {
                    messageObject.setUrl(emoteData.url);
                    output += `<span class="sheet-wuxInlineRow">[${emoteData.name}](!&#13;${Format.SanitizeMacroRollTemplate(messageObject.printMacro())})${createImagePreview(emoteData.url)}</span> `;
                }
            });

            let languageList = attrHandler.parseJSON(languageVar);
            if (languageList != "" && languageList.length > 0) {
                output += `<div style='font-weight: bold'>Languages</div>`;

                let languageObj = new setLanguageObj(targetData);
                let objdata = "";
                for (let i = 0; i < languageList.length; i++) {
                    languageList[i] = languageList[i].trim();
                    languageObj.language = languageList[i];
                    objdata = languageObj.stringify();
                    output += `[${languageList[i]}](!setlang ${objdata}) `;
                }
            }

            messageObject.setSub(output);
            messageObject.url = outfitEmoteSetData.defaultEmote;
            messageObject.setSender("Emote Manager");

            send(messageObject, sender.split(" ")[0]);
        });
        attributeHandler.run();
    },

    createImagePreview = function (url) {
        return `<div class="sheet-wuxTooltipButton"><div class="sheet-wuxTooltipText">i</div><img class="sheet-wuxTooltipImagePreview" src="${url}"/></div>`;
    },

    send = function (messageObject, targets, archive) {
        if (targets == undefined || targets == "") {
            sendToChat(messageObject.sender, messageObject.printRollTemplate(), archive);
            return;
        }

        let message = messageObject.printRollTemplate();

        if (Array.isArray(targets)) {
            if (targets.length > 0) {
                for (let i = 0; i < targets.length; i++) {
                    sendToChat(messageObject.sender, `/w ${targets[i]} ${message}`, archive);
                }
            }
        }
        else {
            sendToChat(messageObject.sender, `/w ${targets} ${message}`, archive);
        }
    },

    sendToChat = function (sender, message, archive) {
        if (archive) {
            sendChat(sender, message);
        }
        else {
            sendChat(sender, message, null, {noarchive:true});
        }
    }
    
    return {
        Parse: parse,
        ParseInput: parseInput,
        ParseType: parseType,
        HandleMessageInput: handleMessageInput,
        Send: send
    };
}());

class setLanguageObj {
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (data instanceof TargetData) {
                this.importTargetData(data);
            }
            else if (typeof(data == "string")) {
                this.importJson(Format.ParseMacroJSON(data));
            }
            else {
                this.importJson(data);
            }
        }
    }
    createEmpty() {
        this.charId = "";
        this.charName = "";
        this.language = "";
    }
    importTargetData(data) {
        this.charId = data.charId;
        this.charName = data.charName;
    }
    importJson(json) {
        this.charId = json.charId;
        this.charName = json.charName;
        this.language = json.language;
    }

    stringify() {
        return Format.SanitizeMacroJSON(JSON.stringify(this));
    }

    setCharacterLanguage(sender) {
        let messageObject = new EmoteMessage();
        messageObject.setLanguage(this.language);

        let attributeHandler = new SandboxAttributeHandler(this.charId);
        attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Language"), messageObject.language);
        attributeHandler.addUpdate(WuxDef.GetVariable("Chat_LanguageTag"), messageObject.languageTag);
        attributeHandler.run();
            
        let message = `/w ${sender.split(" ")[0]} Set ${this.charName}'s language to ${this.language}`;
        sendChat("Emote Manager", message, null, {noarchive:true});
    }
}

class TableMessage {
    constructor(headers) {
        this.headers = headers;
        this.rows = [];
    }

    addRow(row) {
        this.rows.push(row);
    }

    print() {
        let tableHeader = "";
        for (let i = 0; i < this.headers.length; i++) {
            if (i == 0) {
                tableHeader += `<th>${this.headers[i]}</th>`;
            }
            else {
                tableHeader += `<th style="margin-left: 5px; text-align: right">${this.headers[i]}</th>`;
            }
        }

        let tableRow = "";
        let tableRows = "";
        for (let i = 0; i < this.rows.length; i++) {
            tableRow = "";
            for (let j = 0; j < this.rows[i].length; j++) {
                if (j == 0) {
                    tableRow += `<td>${this.rows[i][j]}</td>`;
                }
                else {
                    tableRow += `<td style="text-align: right>${this.rows[i][j]}</td>`;
                }
            }
            tableRows += `<tr>${tableRow}</tr>`;
        }

        return `<table class="sheet-wuxFlexTable"><tr>${tableHeader}</tr>${tableRows}</table>`;
    }

    addTargetModifierTable(tokenTargetDataArray, variableName) {
        
        let data = [];
        tokenTargetDataArray.forEach(tokenTargetData => {
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            let results;
            attributeHandler.addMod(variableName);
            
            attributeHandler.addFinishCallback(function(attrHandler) {
                let value = attrHandler.parseInt(variableName, 0, false);
                results = Dice.RollSkillCheck(0, value);
            });
            attributeHandler.run();
            results.tokenTargetData = tokenTargetData;
            data.push(results);
        });
        data.sort((a, b) => a.total - b.total);
        data.forEach(results => {
            this.addRow([results.tokenTargetData.displayName, `${Format.ShowTooltip(`${results.total}`, results.message)}`]);
        });
        return data;
    }
}

class EmoteSetData {
    constructor(json) {
        this.createEmpty();
        if (json != undefined) {
            this.importJson(json);
        }
    }

    importJson(json) {
        if (json.name == undefined) {
            console.log("EmoteSetData: No name found in json");
            return;
        }
        if (json.defaultEmote == undefined) {
            console.log("EmoteSetData: No defaultEmote found in json");
            return;
        }
        if (json.emotes == undefined) {
            console.log("EmoteSetData: No emotes found in json");
            return;
        }
        this.name = json.name;
        this.defaultEmote = json.defaultEmote;
        this.emotes = json.emotes;
    }

    createEmpty() {
        this.name = "";
        this.defaultEmote = "";
        this.emotes = [];
    }

    addEmote(name, url) {
        this.emotes.push(new EmoteData({name: name, url: url}));
    }

    iterate(callback) {
        for (let i = 0; i < this.emotes.length; i++) {
            callback(this.emotes[i]);
        }
    }
}

class EmoteData {
    constructor(json) {
        this.createEmpty();
        if (json != undefined) {
            this.importJson(json);
        }
    }

    importJson(json) {
        this.name = json.name;
        this.url = json.url;
    }

    createEmpty() {
        this.name = "";
        this.url = "";
    }   
}

class ChatMessage {
    constructor(msg) {
        this.createEmpty();
        if (msg != undefined) {
            this.message = msg;
        }
    }
    createEmpty() {
        this.sender = "";
        this.message = "";
    }

    setSender(sender) {
        this.sender = sender;
    }

    printRollTemplate() {
        return `&{template:${this.template}} ${this.printTemplateData()}`;
    }

    printMacro() {
        return `#${this.template} ${this.printTemplateData()}`;
    }

    printTemplateData() {
        return "";
    }

    printHtml() {
        return "";
    }
}

class SimpleMessage extends ChatMessage {

    createEmpty() {
        super.createEmpty();
        this.template = "";
    }

    printRollTemplate() {
        return `&{template:${this.template}} ${this.printTemplateData()}`;
    }

    printMacro() {
        return `#${this.template} ${this.printTemplateData()}`;
    }

    printTemplateData() {
        return `{{message=${this.message}}}`;
    }

    printHtml() {
        return `<div class="sheet-rolltemplate-${this.template}">
        <div>&nbsp;</div>
        <div class="sheet-formattedTextbox">${this.message}</div>
    </div>`;
    }
}

class AttackMessage extends SimpleMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "attackBox";
    }
}

class ResponseMessage extends SimpleMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "responseBox";
    }
}

class ResponseYellMessage extends SimpleMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "responseYellBox";
    }
}

class InfoMessage extends SimpleMessage {

    createEmpty() {
        super.createEmpty();
        this.template = "infoBox";
    }

    printHtml() {
        return `<div class="sheet-rolltemplate-${this.template}">
        <div>&nbsp;</div>
        <div class="sheet-formattedTextbox">
            <div class="sheet-inner-border">
                <div class="sheet-wuxTitle">${this.message}</div>
            </div>
        </div>
    </div>`;
    }
}

class SystemInfoMessage extends InfoMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "systemInfoBox";
    }
}

class SystemInfoAuxMessage extends InfoMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "systemInfoAuxBox";
    }
}

class EmoteMessage extends ChatMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "";
        this.title = "";
        this.url = "";
        this.language = "";
        this.affinity = "";
        this.languageTag = "";
        this.sub = "";
    }

    printTemplateData() {
        let template = `{{url=${this.url}}} {{message=${this.message}}} {{title=${this.title}}}`;
        if (this.language) {
            template += ` {{language=${this.language}}}`;
            if (this.languageTag) {
                template += ` ${this.languageTag}`;
            }
        }
        if (this.affinity) {
            template += ` {{${this.affinity}}}`;
        }
        if (this.sub) {
            template += ` {{sub=${this.sub}}}`;
        }
        return template;
    }

    setTitle(title) {
        this.title = title;
    }

    setLanguage(language) {
        this.language = language;

        if (language == undefined) {
            this.languageTag = "{{language-default=1}}";
        }
    
        switch (language.toLowerCase()) {
            case "minere":
                this.languageTag = "{{language-coastal=1}}";
                break;
            case "apollen":
                this.languageTag = "{{language-mountain=1}}";
                break;
            case "junal":
                this.languageTag = "{{language-desert=1}}";
                break;
            case "cert":
                this.languageTag = "{{language-plains=1}}";
                break;
            case "lib":
                this.languageTag = "{{language-rare=1}}";
                break;
    
    
            case "palmic":
            case "shorespeak":
            case "verdeni":
                this.languageTag = "{{language-coastal=1}}{{language-regional=1}}";
                break;
            case "crinere":
            case "vulca":
                this.languageTag = "{{language-coastal=1}}{{language-ancient=1}}";
                break;
    
            case "kleikan":
                this.languageTag = "{{language-mountain=1}}{{language-regional=1}}";
                break;
    
            case "byric":
            case "dustell":
            case "muralic":
                this.languageTag = "{{language-desert=1}}{{language-regional=1}}";
                break;
            case "shira":
                this.languageTag = "{{language-desert=1}}{{language-ancient=1}}";
                break;
    
            case "ciel":
            case "citeq":
            case "manstan":
            case "salkan":
            case "sansic":
            case "silq":
                this.languageTag = "{{language-plains=1}}{{language-regional=1}}";
                break;
    
            case "jovean":
                this.languageTag = "{{language-rare=1}}{{language-regional=1}}";
                break;
            case "mytikan":
                this.languageTag = "{{language-rare=1}}{{language-ancient=1}}";
                break;
    
            case "wolfwarg":
            case "beast":
            case "empathy":
            case "emotion":
            case "spirit":
                this.languageTag = "{{language-special=1}}";
                break;
    
            default:
                this.languageTag = "{{language-default=1}}";
        }
    }

    setLanguageByTarget(targetData) {
        this.language = `@{${targetData.charName}|chat-language}`;
        this.languageTag = `@{${targetData.charName}|chat-languagetag}`;
    }

    setUrl(url) {
        this.url = url;
    }

    setAffinity(affinity) {
        this.affinity = affinity.toLowerCase();
    }

    setSub(sub) {
        this.sub = sub;
    }
}

class SpeakEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctmsg";
    }

    setTitle(title) {
        super.setTitle(title + " says");
    }
}

class WhisperEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctwsp";
    }

    setTitle(title) {
        super.setTitle(title + " whispers");
    }
}

class YellEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctyell";
    }

    setTitle(title) {
        super.setTitle(title + " yells");
    }
}

class ThinkEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctthk";
    }

    setTitle(title) {
        super.setTitle(title + " thinks");
    }
}

class DescEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctdesc";
    }
}

class IntroEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctintro";
    }
}class TargetData {
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            let dataType = data.type;
            if (dataType == undefined) {
                dataType = data.get("_type");
            }
            if (dataType != undefined) {
                if (dataType == "api") {
                    this.importMessage(data);
                }
                if (dataType == "graphic") {
                    this.importTokenData(data);
                }
            }
            else if (data.charId != undefined) {
                this.importJSON(data);
            }
        }
    }

    createEmpty() {
        this.charId = "";
        this.charName = "";
        this.tokenId = "";
        this.displayName = "";
        this.owner = "";
        this.elem = "";
        this.teamIndex = 0;
    }

    importJSON(json) {
        this.charId = json.charId;
        this.charName = json.charName;
        this.tokenId = json.tokenId;
        this.displayName = json.displayName;
        this.owner = json.owner;
        this.elem = json.elem;
        this.teamIndex = json.teamIndex;
    }

    importMessage(msg) {
        if (msg.selected && msg.selected.length > 0) {
            this.importTokenData(TokenReference.GetToken(msg.selected[0]._id));
        }
    }

    importTokenData(token) {
        if (token == undefined) {
            DebugLog(`[TokenData] No token exists.`);
            return;
        }

        this.charId = token.get('represents');
        if (this.charId == undefined || this.charId == "") {
            DebugLog(`[TokenData] (${this.token.name}) has no representative character.`);
            return;
        }

        let character = getObj('character', this.charId);

        this.charName = character.get("name");
        this.tokenId = token.get("_id");

        let ownerId = character.get("controlledby").split(",")[0];
        if (ownerId != "") {
            this.owner = getObj("player", ownerId).get("_displayname");
        }

        let attributeHandler = new SandboxAttributeHandler(this.charId);
        let tokenData = this;
        let displayNameVar = WuxDef.GetVariable("DisplayName");
        let affinityVar = WuxDef.GetVariable("Affinity");
        attributeHandler.addMod(displayNameVar);
        attributeHandler.addMod(affinityVar);
        attributeHandler.addFinishCallback(function(attrHandler) {
            tokenData.displayName = attrHandler.parseString(displayNameVar);
            tokenData.elem = tokenData.getElementStatus(attrHandler.parseString(affinityVar));
        });
        attributeHandler.run();
    }

    getElementStatus (affinity) {
        switch (affinity) {
            case "Wood":
                return "status_green";
            case "Fire":
                return "status_red";
            case "Earth":
                return "status_brown";
            case "Metal":
                return "status_purple";
            case "Water":
                return "status_blue";
            default:
                return "status_pink";
        }
    }

    setTeamIndex(index) {
        this.teamIndex = index;
    }
}
class TokenTargetData extends TargetData {

    constructor(token, targetData) {
        if (targetData != undefined) {
            this.importJSON(data);
            this.token  = token;
        }
        else {
            super(token);
        }
    }
    createEmpty() {
        super.createEmpty();
        this.token = undefined;
    }
    importTokenData(token) {
        this.token = token;
        super.importTokenData(token);
    }

    // token bar
    initToken() {
        this.token.set("bar_location", "overlap_bottom");
    }
    setBar(barIndex, variableObj, showBar, showText) {
        if (variableObj == undefined) {
            this.token.set(`bar${barIndex}_link`, "");
            this.token.set(`bar${barIndex}_value`, "");
            this.token.set(`bar${barIndex}_max`, "");
        }
        else {
            this.token.set(`bar${barIndex}_link`, variableObj.get("_id"));
            this.token.set(`bar${barIndex}_value`, variableObj.get("current"));
            this.token.set(`bar${barIndex}_max`, variableObj.get("max"));
        }
        this.token.set(`showplayers_bar${barIndex}`, showBar);
        this.token.set(`showplayers_bar${barIndex}text`, showText ? "2" : "0");
    }
    setBarValue(barIndex, value) {
        this.token.set(`bar${barIndex}_value`, value);
    }

    // nameplate
    showTokenName(isShown) {
        if (isShown) {
            this.token.set("name", this.displayName);
            this.token.set("showname", true);
            this.token.set("showplayers_name", true);
        }
        else {
            this.token.set("showname", false);
        }
    }

    // tooltip
    showTooltip(isShown) { 
        this.token.set("show_tooltip", isShown);
    }
    setTooltip(value) {
        this.token.set("tooltip", value);
    }

    // status settings
    setEnergy(value) {
        this.token.set(this.elem, value);
    }
    setTurnIcon(value) {
        this.token.set("status_yellow", value);
    }

    // Modifiers
    setDisplayName() {
        let attributeHandler = new SandboxAttributeHandler(this.charId);
        let tokenData = this;
        let displayNameVar = WuxDef.GetVariable("DisplayName");
        attributeHandler.addMod(displayNameVar);
        attributeHandler.addFinishCallback(function(attrHandler) {
            tokenData.displayName = attrHandler.parseString(displayNameVar);
        });
        attributeHandler.run();
    }
    setPatience(attributeHandler, value) {
        let patienceVar = WuxDef.GetVariable("Soc_Patience");
        attributeHandler.addUpdate(patienceVar);
        attributeHandler.addUpdate(patienceVar, value, false);
        attributeHandler.addUpdate(patienceVar, value, true);

        this.token.set(`bar1_value`, value);
        this.token.set(`bar1_max`, value);
    }
    addPatience(attributeHandler, value) {
        let tokenTargetData = this;
        this.modifyResourceAttribute(attributeHandler, "Soc_Patience", value, this.addModifierToAttribute, function(results) {
            tokenTargetData.setBarValue(1, results.newValue);
            return results;
        });
    }
    setFavor(attributeHandler, value) {
        let patienceVar = WuxDef.GetVariable("Soc_Favor");
        attributeHandler.addUpdate(patienceVar);
        attributeHandler.addUpdate(patienceVar, value, true);
        this.token.set(`bar3_max`, value);
    }
    addFavor(attributeHandler, value) {
        let tokenTargetData = this;
        this.modifyResourceAttribute(attributeHandler, "Soc_Favor", value, this.addModifierToAttribute, function(results) {
            tokenTargetData.setBarValue(3, results.newValue);
            return results;
        });
    }
    addHp(attributeHandler, value) {
        this.modifyResourceAttribute(attributeHandler, "HP", value, 
            function(results, value) {
                this.addModifierToAttribute(results, value);
                if (!isNaN(parseInt(value)) && parseInt(value) < 0 && results.remainder < 0) {
                    while (results.remainder < 0) {
                        results.current = results.max;
                        let vitalityResult = this.addVitality(attributeHandler, -1);
                        if (vitalityResult.current == 0) {
                            // TODO: add the downed status
                        }
                        this.addModifierToAttribute(results, results.remainder);
                    }
                }
            }, 
            function(results) {
                this.setBarValue(1, results.newValue);
                return results;
        });
    }
    addVitality(attributeHandler, value) {
        this.modifyResourceAttribute(attributeHandler, "Vitality", value, this.addModifierToAttribute, function(results) {
            return results;
        });
    }
    addEnergy(attributeHandler, value) {
        let tokenTargetData = this;
        let chakraVar = WuxDef.GetVariable("Cmb_Chakra");
        attributeHandler.addMod(chakraVar);
        this.modifyResourceAttribute(attributeHandler, "EN", value, 
            function(results, value, attrHandler) {
                results.max = attrHandler.parseInt(chakraVar, 0, false);
                tokenTargetData.addModifierToAttribute(results, value);
            }, 
            function(results) {
                tokenTargetData.setEnergy(results.newValue);
                return results;
            }
        );
    }
    setDash(attributeHandler) {
        let tokenTargetData = this;
        let baseSpeedVar = WuxDef.GetVariable("Cmb_Mv");
        let maxSpeedVar = WuxDef.GetVariable("Cmb_MvPotency");
        attributeHandler.addMod(baseSpeedVar);
        attributeHandler.addMod(maxSpeedVar);
        attributeHandler.addFinishCallback(function(attrHandler) {
            let move = Math.ceil(attrHandler.parseInt(baseSpeedVar, 0, false), 
                Dice.RollDice(1, attrHandler.parseInt(maxSpeedVar, 0, false))
            );
            tokenTargetData.setTurnIcon(move);
        });
    }
    resetBattleTracks(attributeHandler) {
        let hpVar = WuxDef.GetVariable("HP");
        let willpowerVar = WuxDef.GetVariable("WILL");
        let enVar = WuxDef.GetVariable("EN");
        attributeHandler.addAttribute(hpVar);
        attributeHandler.addAttribute(willpowerVar);
        attributeHandler.addAttribute(enVar);
        attributeHandler.addFinishCallback(function(attrHandler) {
            attrHandler.addUpdate(hpVar, attrHandler.parseInt(hpVar, 0, true), false);
            attrHandler.addUpdate(willpowerVar, attrHandler.parseInt(willpowerVar, 0, true), false);
            attrHandler.addUpdate(enVar, 0, true);
        });
    }
    resetSocialTracks(attributeHandler, patienceVal) {
        let favorVar = WuxDef.GetVariable("Soc_Favor");
        let patienceVar = WuxDef.GetVariable("Soc_Patience");
        let willpowerVar = WuxDef.GetVariable("WILL");
        let enVar = WuxDef.GetVariable("EN");
        attributeHandler.addAttribute(favorVar);
        attributeHandler.addAttribute(patienceVar);
        attributeHandler.addAttribute(willpowerVar);
        attributeHandler.addAttribute(enVar);
        attributeHandler.addFinishCallback(function(attrHandler) {
            attrHandler.addUpdate(favorVar, 0, false);
            attrHandler.addUpdate(willpowerVar, attrHandler.parseInt(willpowerVar, 0, true), false);
            attrHandler.addUpdate(patienceVal, patienceVal, false);
            attrHandler.addUpdate(enVar, 0, true);
        });
    }

    modifyResourceAttribute(attributeHandler, attributeName, value, modCallback, finishCallback) {
        let results = {
            name: attributeName,
            current: 0,
            max: 0,
            newValue: 0,
            remainder: 0
        };
        let attributeVar = WuxDef.GetVariable(attributeName);
        attributeHandler.addAttribute(attributeVar);
        attributeHandler.addFinishCallback(function(attrHandler) {
            results.current = attrHandler.parseInt(attributeVar, 0, false);
            results.max = attrHandler.parseInt(attributeVar, 0, true);
            modCallback(results, value, attrHandler);
            attrHandler.addUpdate(attributeVar, results.newValue, false);
            finishCallback(results);
        });
    }
    addModifierToAttribute(results, value) {
        if (value == "max") {
            results.newValue = results.max;
        }
        else {
            results.newValue = results.current + parseInt(value);
            if (results.newValue < 0) {
                results.remainder = results.newValue;
                results.newValue = 0;
            }
            else if (results.newValue > results.max) {
                results.remainder = results.newValue - results.max;
                results.newValue = results.max;
            }
        }
    }
}

var TargetReference = TargetReference || (function () {
    'use strict';

    var schemaVersion = "0.1.2",

        checkInstall = function () {
            if (!state.hasOwnProperty('TargetReference') || state.TargetReference.version != schemaVersion) {
                log (`Setting Wuxing Target version to v${schemaVersion}`);
                state.TargetReference = {
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

        commandAddCharacter = function (msg, teamIndex) {
            let message = "";
            TokenReference.IterateOverSelectedTokens(msg, function (tokenTargetData) {
                tokenTargetData.setTeamIndex(teamIndex);
                addToActiveCharacters(tokenTargetData);
                if (tokenTargetData != undefined) {
                    if (message != "") {
                        message += ", ";
                    }
                    message += `${tokenTargetData.displayName}`;
                }
            });
            if (message == "") {
                message = "No characters selected";
            }
            else {
                message = `${message} added as ${state.WuxConflictManager.teams[teamIndex].name} unit(s)`;
            }
            let systemMessage = new SystemInfoMessage(message);
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage, "GM");

        },

        commandRemoveCharacter = function (msg) {
            TokenReference.IterateOverSelectedTokens(msg, function (tokenTargetData) {
                removeActiveTargetData(tokenTargetData.tokenId);
            });
        },

        commandClearActiveTargets = function () {
            clearActiveTargetData();
        },

        // Active Characters
        // ---------------------------

        getDefaultActiveCharacters = function () {
            return {
                targetData: {},
                names: {}
            };
        },

        iterateOverActiveTargetData = function (callback) {
            for (let targetData in state.TargetReference.activeCharacters.targetData) {
                let tokenTargetData = TokenReference.GetTokenData(targetData);
                if (tokenTargetData != undefined) {
                    callback(tokenTargetData);
                }
            }
        },

        addToActiveCharacters = function (tokenTargetData) {
            if (tokenTargetData == undefined) {
                DebugLog(`[TargetReference][addToActiveCharacters] No target data exists.`);
                return;
            }
            delete(tokenTargetData.token);
            if (state.TargetReference.activeCharacters.targetData.hasOwnProperty(tokenTargetData.tokenId)) {
                state.TargetReference.activeCharacters.targetData[tokenTargetData.tokenId] = tokenTargetData;
            }
            else {
                state.TargetReference.activeCharacters.targetData[tokenTargetData.tokenId] = tokenTargetData;
                state.TargetReference.activeCharacters.names[tokenTargetData.charName] = tokenTargetData.tokenId;
            }
        },

        removeActiveTargetData = function (tokenId) {
            if (state.TargetReference.activeCharacters.targetData[tokenId] != undefined) {
                let targetData = state.TargetReference.activeCharacters.targetData[tokenId];
                delete state.TargetReference.activeCharacters.names[targetData.charName];
                delete state.TargetReference.activeCharacters.targetData[tokenId];
            }
        },

        clearActiveTargetData = function () {
            state.TargetReference.activeCharacters = getDefaultActiveCharacters();
            let systemMessage = new SystemInfoMessage("Cleared Active Targets");
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage, "GM");
        },

        getTokenTargetData = function (tokenId) {
            if (state.TargetReference.activeCharacters.targetData[tokenId] == undefined) {
                return TokenReference.GetTokenData(tokenId);
            }
            return TokenReference.GetTokenData(state.TargetReference.activeCharacters.targetData[tokenId]);
        },

        getTokenTargetDataByName = function (characterName) {
            if (state.TargetReference.activeCharacters.names[characterName] == undefined) {
                return undefined;
            }
            return TokenReference.GetTokenData(state.TargetReference.activeCharacters.targetData[state.TargetReference.activeCharacters.names[characterName]]);
        }
        ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        IterateOverActiveTargetData: iterateOverActiveTargetData,
        ClearActiveTargetData: clearActiveTargetData,
        GetTokenTargetData: getTokenTargetData,
        GetTokenTargetDataByName: getTokenTargetDataByName
    };

}());

var TokenReference = TokenReference || (function () {
    'use strict';

    var schemaVersion = "0.1.0",

        checkInstall = function () {
            if (!state.hasOwnProperty('TokenReference') || state.TokenReference.version !== schemaVersion) {
                state.TokenReference = {
                    version: schemaVersion,
                    tokens: {}
                };
            }
            state.TokenReference.tokens = {};
        },

        // Input Commands
        // ---------------------------

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!css":
                    commandSetSocialData(msg, content);
                break;
                case "!creset":
                    commandResetToken(msg);
                break;
            };
        },

        commandSetSocialData = function (msg, content) {
            let contents = content.split(",");
            iterateOverSelectedTokens(msg, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.setPatience(attributeHandler, contents[0]);
                tokenTargetData.setFavor(attributeHandler, contents[1]);
                attributeHandler.run();
            });
        }, 

        commandResetToken = function (msg) {
            iterateOverSelectedTokens(msg, function (tokenTargetData) {
                resetTokenDisplay(tokenTargetData);
            });
        },

        // State Token Getters
        // ---------------------------

        getToken = function (tokenId) {
            let token = getObj('graphic', tokenId);
            if (token == undefined) {
                return undefined;
            }
            return token;
        },

        getTokenData = function (data) {
            let tokenData;
            if (data.tokenId != undefined) {
                if (state.TokenReference.tokens[data.tokenId] == undefined) {
                    let token = getToken(data.tokenId);
                    if (token == undefined) {
                        DebugLog(`[TokenReference][getToken] Token for ${data.charName} not found`);
                        return undefined;
                    }
                    tokenData = new TokenTargetData(token, data);
                    tokenData.setDisplayName();
                    addToken(tokenData, data);
                }
                else {
                    tokenData = state.TokenReference.tokens[data.tokenId];
                    tokenData.setDisplayName();
                }
            }
            else {
                if (state.TokenReference.tokens[data] == undefined) {
                    let token = getToken(data);
                    if (token == undefined) {
                        DebugLog(`[TokenReference][getToken] Token for id ${data} not found`);
                        return undefined;
                    }
                    tokenData = new TokenTargetData(token);
                    addToken(tokenData, data);
                }
                else {
                    tokenData = state.TokenReference.tokens[data];
                    tokenData.setDisplayName();
                }
            }
            return tokenData;
        },

        addToken = function(tokenData, targetData) {
            state.TokenReference.tokens[targetData.tokenId] = tokenData;
        },

        // Data Helper
        // ---------------------------

        iterateOverSelectedTokens = function (msg, callback) {
            _.each(msg.selected, function (obj) {
                let tokenTargetData = getTokenData(obj._id);

                if (tokenTargetData != undefined) {
                    callback(tokenTargetData);
                }
            });
        },

        // Token States
        // ---------------------------

        setTokenForConflict = function(conflictType, tokenTargetData, attributeHandler) {
            tokenTargetData.initToken();
            tokenTargetData.showTokenName(true);
            tokenTargetData.showTooltip(true);
    
            switch (conflictType) {
                case "Battle":
                    setTokenForBattle(tokenTargetData, attributeHandler);
                    break;
                case "Social":
                    setTokenForSocialBattle(tokenTargetData, attributeHandler);
                    break;
            }
        },
        setTokenForBattle = function (tokenTargetData, attributeHandler) {
            let hpVar = WuxDef.GetVariable("HP");
            let willpowerVar = WuxDef.GetVariable("WILL");
            let enVar = WuxDef.GetVariable("EN");
            attributeHandler.addAttribute(hpVar);
            attributeHandler.addAttribute(willpowerVar);
            attributeHandler.addAttribute(enVar);
    
            attributeHandler.addFinishCallback(function(attrHandler) {
                tokenTargetData.setBar(1, attrHandler.getAttribute(hpVar), true, true);
                tokenTargetData.setBar(2, attrHandler.getAttribute(willpowerVar), true, true);
                tokenTargetData.setEnergy(attrHandler.parseInt(enVar, 0, false));
            });
        },
        setTokenForSocialBattle = function (tokenTargetData, attributeHandler) {
            let patienceVar = WuxDef.GetVariable("Soc_Patience");
            let willpowerVar = WuxDef.GetVariable("WILL");
            let favorVar = WuxDef.GetVariable("Soc_Favor");
            let enVar = WuxDef.GetVariable("EN");
            attributeHandler.addAttribute(patienceVar);
            attributeHandler.addAttribute(willpowerVar);
            attributeHandler.addAttribute(favorVar);
            attributeHandler.addAttribute(enVar);
    
            attributeHandler.addFinishCallback(function(attrHandler) {
                tokenTargetData.setBar(1, attrHandler.getAttribute(patienceVar), true, true);
                tokenTargetData.setBar(2, attrHandler.getAttribute(willpowerVar), true, true);
                tokenTargetData.setBar(3, attrHandler.getAttribute(favorVar), true, true);
                tokenTargetData.setEnergy(attrHandler.parseInt(enVar, 0, false));
            });
        },
        resetTokenDisplay = function (tokenTargetData) {
            tokenTargetData.setBar(1, undefined, true, true);
            tokenTargetData.setBar(2, undefined, true, true);
            tokenTargetData.setBar(3, undefined, true, true);
            tokenTargetData.showTokenName(false);
            tokenTargetData.showTooltip(false);
            tokenTargetData.setEnergy(false);
            tokenTargetData.setTurnIcon(false);
        }

        ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        IterateOverSelectedTokens: iterateOverSelectedTokens,
        GetToken: getToken,
        GetTokenData: getTokenData,
        AddToken: addToken,
        SetTokenForConflict: setTokenForConflict,
        ResetTokenDisplay: resetTokenDisplay
    };

}());

on("ready", function () {
    'use strict';

    TargetReference.CheckInstall();
    TokenReference.CheckInstall();
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
            if (data != undefined) {
                this.add(data.name, data);
            }
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
    constructor(data, sortingProperties, dataCreationCallback) {
        super();
        if (sortingProperties != undefined) {
            this.addSortingroperties(sortingProperties);
        }

        this.import(data, dataCreationCallback);
    }
    importJson(json, dataCreationCallback) {
        super.importJson(json, dataCreationCallback);
        this.sortingGroups = json.sortingGroups;
    }

    add(key, value) {
        super.add(key, value);
        for (let property in this.sortingGroups) {
            if (value != undefined && value.hasOwnProperty(property)) {
                this.addSortingGroup(property, value[property], value);
            }
        }
    }
    
    addSortingroperties(sortingProperties) {
        this.sortingGroups = {};
        for (let i = 0; i < sortingProperties.length; i++) {
            this.sortingGroups[sortingProperties[i]] = {};
        }
    }
    addSortingGroup(property, propertyValue, newEntry) {
        if(this.sortingGroups != undefined) {
            if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
                this.sortingGroups[property][propertyValue] = [];
            }
            this.sortingGroups[property][propertyValue].push(newEntry.name);
        }
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

    constructor(data) {
        let filters = ["style", "group", "affinity", "tier", "isFree", "action", "skill", "range"];
        let dataCreation = function(data) {
            return new TechniqueData(data);
        };
        super(data, filters, dataCreation);
    }

    importJson(json) {
        let dataCreationCallback = function(data) {
            return new TechniqueData(data);
        }
        super.importJson(json, dataCreationCallback);
    }
    importSheets(dataArray) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = new TechniqueData(dataArray[i]);
            if (this.has(data.name)) {
                this.get(data.name).importEffectsFromTechnique(data);
            }
            else {
                this.add(data.name, data);
            }
        }
    }
    
    add(key, value) {
        super.add(key, value);

        let styles = value.techSet.split(";");
        for (let i = 0; i < styles.length; i++) {
            this.addSortingGroup("style", styles[i].trim(), value);
        }
    }
}
class ExtendedDescriptionDatabase extends Database {
    constructor(data) {
        let dataCreation = function(data) {
            let definition = new DefinitionData(data);
            if (definition.group == "Type") {
                definition.variable += `{0}{1}`;
            }
            return definition;
        };
        super(data, ["group", "subGroup", "formulaMods"], dataCreation);
    }

    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            if (data == undefined) {
                continue;
            }
            if (this.has(data.name)) {
                this.values[data.name].descriptions.push(data.descriptions[0]);
            }
            else {
                this.add(data.name, data);
            }
        }
    }

    add(key, value) {
        super.add(key, value);
        let formulaDefs = value.formula.getDefinitions();
        for (let i = 0; i < formulaDefs.length; i++) {
            this.addSortingGroup("formulaMods", formulaDefs[i], value);
        }
    }
}
class TechniqueEffectDatabase extends Database {
    constructor(data) {
        let dataCreation = function(data) {
            return new TechniqueEffect(data);
        };
        super(data, ["defense"], dataCreation);
    }
    
    importJson(json) {
        let dataCreationCallback = function(data) {
            return new TechniqueEffect(data);
        }
        super.importJson(json, dataCreationCallback);
    }
    importSheets(dataArray) {
        let dataCreationCallback = function(data) {
            return new TechniqueEffect(data);
        }
        super.importSheets(json, dataCreationCallback);
    }
}

class dbObj {
    constructor(data) {
        this.createEmpty();
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
        definition.name = baseDefinition.isResource ? `${this.name}` : `${baseDefinition.abbreviation}_${this.name}`;
        definition.fieldName = this.fieldName;
        definition.variable = `${baseDefinition.getVariable(`-${this.variable == "" ? this.fieldName : this.variable}`)}{0}`;
        definition.title = this.name;
        definition.group = baseDefinition.name;
        definition.subGroup = "";
        definition.descriptions = [this.description];
        definition.formula = baseDefinition.formula;
        definition.linkedGroups = [];
        definition.isResource = baseDefinition.isResource;
        return definition;
    }

}
class TechniqueData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.techSet = json.techSet;
        this.group = json.group;
        this.affinity = json.affinity;
        this.tier = json.tier;
        this.isFree = this.affinity == "" && this.tier <= 0;
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
        this.definitions = json.definitions;
        this.effects = new TechniqueEffectDatabase(json.effects);
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.techSet = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.affinity = "" + dataArray[i]; i++;
        this.tier = parseInt(dataArray[i]) == NaN ? 1 : parseInt(dataArray[i]); i++;
        this.isFree = this.affinity == "" && this.tier <= 0;
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
        this.effects = new TechniqueEffectDatabase();
        this.addEffect(new TechniqueEffect(dataArray.slice(i)));
    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.techSet = "";
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
        this.effects = new TechniqueEffectDatabase();
    }
    createDefinition(baseDefinition) {
        let definition = new TechniqueDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.techSet;
        definition.tier = this.tier;
        definition.affinity = this.affinity;
        definition.isFree = this.isFree;
        return definition;
    }

    importEffectsFromTechnique(technique) {
        let baseTechnique = this;
        technique.effects.iterate(function(effect) {
            baseTechnique.addEffect(effect);
        });
        technique.definitions.forEach(function(definition) {
            baseTechnique.addDefinition(definition);
        });
    }
    addEffect(effect) {
        switch (effect.type) {
            case "Definition":
                effect.setName(`D${this.definitions.length}`);
                this.addDefinition(effect.effect);
                break;
            case "Status":
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                if (effect.effect != "") {
                    this.addDefinition(effect.effect);
                }
                break;
            default:
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                break;
        }
    }
    addDefinition(definition) {
        if (!this.definitions.includes(definition)) {
            this.definitions.push(definition);
        }
    }

    getUseTech () {
        return `!utech ${this.formatTechniqueForSandbox()}`;
    }
    formatTechniqueForSandbox() {
        this.username = `@{${WuxDef.GetVariable("DisplayName")}}`;
        let usedTechData = JSON.stringify(this);
        return this.sanitizeSheetRollAction(usedTechData);
    }
    sanitizeSheetRollAction(roll) {
        var sheetRoll = roll;
        sheetRoll = sheetRoll.replace(/"/g, "QTE");
        sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        sheetRoll = sheetRoll.replace(/:/g, "COLON");
        sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\n/g, "&&");
        return sheetRoll;
    }
    importSandboxJson(jsonString) {
        jsonString = jsonString.replace(/QTE/g, '"');
        jsonString = jsonString.replace(/COLON/g, ":");
        jsonString = jsonString.replace(/&&/g, "\n");
        importJson(JSON.parse(jsonString));
    }
}
class TechniqueEffect extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.defense = json.defense;
        this.target = json.target;
        this.type = json.type;
        this.subType = json.subType;
        this.dVal = json.dVal;
        this.dType = json.dType;
        this.formula = new FormulaData(json.formula);
        this.effect = json.effect;
        this.traits = json.traits;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "";
        this.defense = "" + dataArray[i]; i++;
        this.target = "" + dataArray[i]; i++;
        this.type = "" + dataArray[i]; i++;
        this.subType = "" + dataArray[i]; i++;
        this.dVal = "" + dataArray[i]; i++;
        this.dType = "" + dataArray[i]; i++;
        this.formula = new FormulaData("" + dataArray[i]); i++;
        this.effect = "" + dataArray[i]; i++;
        this.traits = "" + dataArray[i]; i++;
    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.defense = "";
        this.target = "";
        this.type = "";
        this.subType = "";
        this.dVal = "";
        this.dType = "";
        this.formula = new FormulaData();
        this.effect = "";
        this.traits = "";
    }
    setName(name) {
        this.name = name;
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
    createDefinition(baseDefinition) {
        let definition = new TechniqueStyleDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.tier = this.cr;
        definition.affinity = this.affinity;
        definition.requirements = this.getRequirements();
        return definition;
    }
    getRequirements() {
        let requirements = "";

        if (this.cr > 1) {
            requirements += `You must be at least Character Rank ${this.cr}`;
        }
        if (this.affinity != "") {
            if (requirements != "") {
                requirements += "\n";
            }
            requirements += `You must have a ${this.affinity} affinity`;
        }
        if (requirements == "") {
            requirements = "None";
        }
        return requirements;
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
    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = `${this.group} Skill`;
        definition.formula = new FormulaData(`${this.abilityScore}`);
        definition.formula.addAttributes(definition.getFormulaMods(WuxDef._rank));
        return definition;
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
    createDefinition(baseDefinition) {
        let definition = new LanguageDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.location = this.location;
        return definition;
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
    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.group;
        definition.formula = new FormulaData(`Recall`);
        definition.formula.addAttributes(definition.getFormulaMods(WuxDef._rank));
        return definition;
    }
}
class JobData extends WuxDatabaseData {
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.prereq = "";
        this.techniques = [];
    }
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.description = json.description;
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
        this.prereq = "" + dataArray[i]; i++;
        this.techniques = this.createJobTechnique(dataArray.slice(i)); i++;
    }
    createDefinition(baseDefinition) {
        let definition = new JobDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.requirements = this.getRequirements();
        return definition;
    }

    getRequirements() {
        let requirements = "";

        if (this.prereq != "") {
            requirements += this.prereq;
        }
        if (requirements == "") {
            requirements = "None";
        }
        return requirements;
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
class StatusData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = json.fieldName;
        this.group = json.group;
        this.description = json.description;
        this.endsOnRoundStart = json.endsOnRoundStart;
    }
    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i]; i++;
        this.description = "" + dataArray[i]; i++;
        this.endsOnRoundStart = ("" + dataArray[i]) != ""; i++;
    }
    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.endsOnRoundStart = false;
    }
    createDefinition(baseDefinition) {
        let definition = new StatusDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.endsOnRoundStart = this.endsOnRoundStart;
        return definition;
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
class TemplateData extends dbObj {
    importJson(json) {

    }
    importSheets(dataArray) {
        let i = 0;

    }
    createEmpty() {

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

class DefinitionData extends WuxDatabaseData {
    importJson(json) {
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.title = json.title;
        this.group = json.group;
        this.subGroup = json.subGroup;
        this.descriptions = json.descriptions;
        this.abbreviation = json.abbreviation;
        this.variable = json.variable;
        this.baseFormula = json.baseFormula;
        this.modifiers = json.modifiers;
        this.formula = new FormulaData(json.formula);
        this.linkedGroups = json.linkedGroups;
        this.isResource = json.isResource;
    }
    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i]; i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.title = "" + dataArray[i]; i++;
        this.group = "" + dataArray[i]; i++;
        this.subGroup = "" + dataArray[i]; i++;
        this.descriptions = [("" + dataArray[i])]; i++;
        this.abbreviation = "" + dataArray[i]; i++;
        this.variable = "" + dataArray[i]; i++;
        this.baseFormula = "" + dataArray[i]; i++;
        this.modifiers = "" + dataArray[i]; i++;
        this.formula = new FormulaData(this.baseFormula);
        this.formula.addAttributes(this.getFormulaMods(this.modifiers));
        this.linkedGroups = Format.StringToArray("" + dataArray[i]); i++;
        this.isResource = dataArray[i]; i++;
        this.iterateExtraData(("" + dataArray[i]).split(";")); i++;
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
        this.baseFormula = "";
        this.modifiers = "";
        this.formula = new FormulaData();
        this.linkedGroups = [];
        this.isResource = false;
        
    }
    createDefinition(baseDefinition) {
        this.definition = "";
        let definition = super.createDefinition(baseDefinition);
        definition.title = this.title;
        definition.subGroup = this.subGroup;
        definition.descriptions = this.descriptions;
        definition.abbreviation = this.abbreviation;
        definition.formula = new FormulaData(this.baseFormula);
        definition.formula.addAttributes(definition.getFormulaMods(this.modifiers));
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
    getDescription() {
        let output = "";
        this.descriptions.forEach((description) => {
            output += description + "\n";
        });
        return output;
    }
    getFormulaMods(modifiers) {
        let mods = [];
        if (modifiers != "") {
            let modArray = modifiers.split(";");
            modArray.forEach((mod) => {
                mod = mod.trim();
                if (mod != "") {
                    mods.push(this.getVariable(mod));
                }
            });
        }
        return mods;
    }
    iterateExtraData(extraDataValues) {
        let dataSplit;
        let definition = this;
        extraDataValues.forEach(function(data) {
            if (data.trim().indexOf(":") != -1) {
                dataSplit = data.split(":");
                definition.setImportSheetExtraData(dataSplit[0].trim(), dataSplit[1].trim());
            }
        });
    }
    setImportSheetExtraData(property, value) {}
}
class TechniqueDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.tier = json.tier;
        this.affinity = json.affinity;
        this.isFree = json.isFree;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "tier":
                this.tier = parseInt(value);
                break;
            case "affinity":
                this.affinity = value;
                break;
            case "isFree":
                this.isFree = value.toLowerCase() == "true" ? true : false;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.tier = 0;
        this.affinity = "";
        this.isFree = false;
    }
}
class TechniqueStyleDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.cr = json.cr;
        this.affinity = json.affinity;
        this.requirements = json.requirements;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "cr":
                this.cr = parseInt(value);
                break;
            case "affinity":
                this.affinity = value;
                break;
            case "requirements":
                this.requirements = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.cr = 0;
        this.affinity = "";
        this.requirements = "";
    }
}
class LanguageDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.location = json.location;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "location":
                this.location = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.location = "";
    }
}
class JobDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.requirements = json.requirements;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "requirements":
                this.requirements = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.requirements = "";
    }
}
class StatusDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.endsOnRoundStart = json.endsOnRoundStart;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "endsOnRoundStart":
                this.endsOnRoundStart = value.toLowerCase() == "true" ? true : false;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.endsOnRoundStart = false;
    }
}

class TechniqueDisplayData {

    constructor(technique) {
        this.createEmpty();
        if (technique != undefined) {
            this.importTechnique(technique);
        }
    }

    importTechnique(technique) {
        this.setTechBasics(technique);
        this.setTechSetResourceData(technique);
        this.setTechTargetData(technique);
        this.setExtentionEffects(technique);
        this.setTraits(technique);
        this.setFlavorText(technique);
        this.setDefinitions(technique);
        this.setEffects(technique);
    }
    
    setTechBasics(technique) {
        this.technique = technique;
        this.name = technique.name;
        this.username = technique.username;
        this.definition = technique.createDefinition(WuxDef.Get("Technique"));
        this.fieldName = Format.ToFieldName(technique.name);
        this.actionType = technique.action;
        this.isFree = technique.isFree;
    }
    setTechSetResourceData(technique) {
        this.resourceData = technique.action;
        let skillData = WuxDef.Get(technique.skill);
        if (skillData != undefined) {
            this.resourceData += ` ${skillData.group}`;
        }
        else {
            this.resourceData += ` Action`;
        }
        if (technique.limits != "") {
            if (this.resourceData != "") {
                this.resourceData += "; ";
            }
            this.resourceData += technique.limits;
        }
        if (technique.resourceCost != "") {
            if (this.resourceData != "") {
                this.resourceData += "; ";
            }
            this.resourceData += technique.resourceCost;
        }
    }
    setTechTargetData(technique) {
        this.targetData = technique.skill == "" ? "No Check" : technique.skill;
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
        if (technique.definitions == undefined) {
            this.definitions = [];
            let definition = new DefinitionData();
            definition.title = "Error! No definitions found!";
            this.definitions.push(definition);
        }
        else {
            for (let i = 0; i < technique.definitions.length; i++) {
                this.definitions.push(WuxDef.Get(technique.definitions[i]));
            }
        }
    }
    setEffects(technique) {
        this.effects = [];
        let defenses = technique.effects.getPropertyValues("defense");
        let filteredTechniqueEffects;
        for(let i = 0; i < defenses.length; i++) {
            filteredTechniqueEffects = technique.effects.filter(new DatabaseFilterData("defense", defenses[i]));
            this.effects.push(defenses[i], new TechniqueEffectDisplayData(filteredTechniqueEffects));
        };
    }

    createEmpty() {
        this.technique = {};
        this.name = "";
        this.actionType = "";
        this.username = "";
        this.definition = {};
        this.fieldName = "";
        this.isFree = false;
        
        this.resourceData = "";
        this.targetData = "";

        this.trigger = "";
        this.requirements = "";
        this.itemTraits = [];

        this.flavorText = "";
        this.traits = [];
        this.effects = [];
        this.definitions = [];
    }

    getRollTemplate(addTechnique) {
        let output = "";

        output += `{{Username=${this.username}}}{{Name=${this.name}}}{{type-${this.actionType}=1}}`;
        if (this.resourceData != "") {
            output += `{{Resources=${this.resourceData}}}`;
        }
        if (this.targetData != "") {
            output += `{{Targeting=${this.targetData}}}`;
        }
        if (this.trigger != "") {
            output += `{{Trigger=${this.trigger}}}`;
        }
        if (this.requirements != "") {
            output += `{{Requirement=${this.requirements}}}`;
        }
        if (this.itemTraits.length > 0) {
            output += this.rollTemplateDefinitions(this.itemTraits, "ItemTrait");
        }
        if (this.flavorText != "") {
            output += `{{FlavorText=${this.flavorText}}}`;
        }
        if (this.traits.length > 0) {
            output += this.rollTemplateDefinitions(this.traits, "Trait");
        }
        if (this.effects.length > 0) {
            output += this.rollTemplateEffects();
        }
        if (this.definitions.length > 0) {
            output += this.rollTemplateDefinitions(this.definitions, "Def");
        }
        if (addTechnique) {
            if (this.technique.resourceCost != "") {
                let consumeData = {
                    username: this.username,
                    name: this.name,
                    resourceCost: this.resourceCost
                };
                output += `{{consumeData=!ctech ${this.technique.sanitizeSheetRollAction(JSON.stringify(consumeData))}}}`;
            }
            output += `{{targetData=${this.technique.getUseTech()}}}`;
        }

        return `&{template:technique} ${this.sanitizeSheetRollAction(output.trim())}`;
    }
    rollTemplateDefinitions(definition, traitType) {
        let output = "";
        for (let i = 0; i < definition.length; i++) {
            output += `{{${traitType}${i}=${definition[i].title}}} {{${traitType}${i}Desc=${definition[i].getDescription()}}} `;
        }
        return output;
    }
    rollTemplateEffects() {
        let output = "";
        let incrementer = 0;
        this.effects.forEach(function(effect) {
            if(effect.check != undefined) {
                output += `{{Effect${incrementer}Name=${effect.check}}}{{Effect${incrementer}Desc=${effect.checkDescription}}}`;
                if (effect.effects == undefined) {
                    output += `{{Effect${incrementer}=Error! No effects found!}}`;
                }
                else {
                    effect.effects.forEach(function(desc) {
                        output += `{{Effect${incrementer}=${desc}}}`;
                        incrementer++;
                    });
                }
                incrementer++;
            }
        });
        return output;
    }
    sanitizeSheetRollAction(roll) {
        var sheetRoll = roll;
        sheetRoll = sheetRoll.replace(/'/g, "&#39;");
        // sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        // sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        // sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        // sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        // sheetRoll = sheetRoll.replace(/"/g, "&#34;");
        // sheetRoll = sheetRoll.replace(/:/g, "");
        // sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        // sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        // sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        // sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        // sheetRoll = sheetRoll.replace(/\n/g, "&&");
        return sheetRoll;
    }
}
class TechniqueEffectDisplayData {
    
    constructor(techniqueEffects) {
        this.check = "";
        this.checkDescription = "";
        this.effects = [];
        
        this.importDefenseData(techniqueEffects[0]);
        this.importEffectData(techniqueEffects);
    }

    importDefenseData(techniqueEffect) {
        let defense = techniqueEffect.defense;
        let definition;

        if (isNaN(parseInt(defense))) {
            if (defense == "") {
                definition = WuxDef.Get("Title_TechEffect");
                this.check = definition.title;
                this.checkDescription = definition.getDescription();
            }
            else {
                definition = WuxDef.Get(defense);
                if (definition.group == "Result") {
                    this.check = `${definition.title}`;
                    this.checkDescription = `${definition.getDescription()}`;
                }
                else {
                    let definition2 = WuxDef.Get("Title_TechDefense");
                    this.check = `${definition2.title}${definition.title}`;
                    this.checkDescription = `${definition2.getDescription()}\n${definition.getDescription()}`;
                }
            }
        }
        else {
            definition = WuxDef.Get("Title_TechDC");
            this.check = `${definition.title}${defense}`;
            this.checkDescription = definition.getDescription();
        }
    }
    importEffectData(effectData) {
        for (let i = 0; i < effectData.length; i++) {
            this.effects.push(this.formatEffect(effectData[i]));
        }
    }

    formatEffect(effect) {
        let output = "";
        switch (effect.type) {
            case "HP":
                output = this.formatHpEffect(effect);
                break;
            case "WILL":
                output = this.formatWillEffect(effect);
                break;
            case "Patience":
                output = this.formatPatienceMeterEffect(effect);
                break;
            case "Favor":
                output = this.formatSocialMeterEffect(effect, WuxDef.GetTitle("Soc_Favor"));
                break;
            case "Persuade":
                output = this.formatPersuadeEffect(effect);
                break;
            case "Status":
                output = this.formatStatusEffect(effect);
                break;
            case "Boost":
                output = this.formatBoostEffect(effect);
                break;
            case "Dash":
                output = this.formatDashEffect(effect);
                break;
            case "Definition":
                // Do nothing
                break;
            case "":
                output = this.formatDescriptionEffect(effect);
                break;
        }
        
        return output;
    }
    formatHpEffect(effect) {
        let willpower = WuxDef.GetTitle("HP");
        switch (effect.subType) {
            case "Heal":
                return `Heal ${this.formatCalcBonus(effect)} ${willpower}`;
            case "Surge":
                return `If target has a surge, spend one and heal ${this.formatCalcBonus(effect)} ${willpower}`;
            default:
                return `${this.formatCalcBonus(effect)} ${WuxDef.GetTitle(effect.effect)} damage`;
        }
    }
    formatWillEffect(effect) {
        let willpower = WuxDef.GetTitle("WILL");
        switch (effect.subType) {
            case "Heal":
                return `Heal ${this.formatCalcBonus(effect)} ${willpower}`;
            default:
                return `${this.formatCalcBonus(effect)} ${willpower} damage`;
        }
    }
    formatSocialMeterEffect(effect, type) {
        switch (effect.subType) {
            case "Heal":
                return `Reduce target's ${type} by ${this.formatCalcBonus(effect)}`;
            default:
                return `Increase target's ${type} by ${this.formatCalcBonus(effect)}`;
        }
    }
    formatPatienceMeterEffect(effect) {
        let patience = WuxDef.GetTitle("Soc_Patience");
        switch (effect.subType) {
            case "Heal":
                return `Increase target's ${patience} by ${this.formatCalcBonus(effect)}`;
            default:
                return `Reduce target's ${patience} by ${this.formatCalcBonus(effect)}`;
        }
    }
    formatPersuadeEffect(effect) {
        return `Persuade target with ${this.formatCalcBonus(effect)}`;
    }
    formatStatusEffect(effect) {
        let state = WuxDef.Get(effect.effect);
        let target = "Target";
        let plural = "s";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
        }
        let ranks = this.formatCalcBonus(effect);
        switch (effect.subType) {
            case "Add": return `${target} gain${plural} the ${state.title} ${state.group}`;
            case "Remove": return `${target} lose${plural} the ${state.title} ${state.group}`;
            case "Remove Any": return `${target} lose${plural} any condition of your choice`;
            case "Remove All": return `${target} lose${plural} all conditions of your choice`;
            case "Remove Will": return `${target} lose${plural} all emotions of your choice`;
            case "Self": return `${target} gain${plural} the ${state.title} ${state.group} targeted towards the caster`;
            case "Choose": return `${target} gain${plural} the ${state.title} ${state.group} targeted towards a character of your choice`;
            default: return `${target} gain${plural} the ${state.title} ${state.group}`;
        }
    }
    formatBoostEffect(effect) {
        switch (effect.subType) {
            case "Set": return `${WuxDef.GetTitle(effect.effect)} is set to ${this.formatCalcBonus(effect)}`;
            default: return `${WuxDef.GetTitle(effect.effect)} increases by ${this.formatCalcBonus(effect)}`;
        }
    }
    formatDashEffect(effect) {
        return `You dash, rolling your Move Potency die to determine how many spaces you can move.`;
    }
    formatDescriptionEffect(effect) {
        return effect.effect;
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        let formulaString = "";
        try {
            formulaString = effect.formula.getString();
        }
        catch (e) {
            formulaString = `Something went wrong: ${JSON.stringify(effect.formula)}`;
        }
        if (formulaString != "" && output != "") {
            output += " + ";
        }
        return output + formulaString;
    }
    formatEffectDice(effect) {
        if (effect.dVal != "" && effect.dVal > 0) {
            return `${effect.dVal}d${effect.dType}`;
        }
        return "";
    }
}

class WuxRepeatingSection {
	constructor(definitionId) {
		this.definition = WuxDef.Get(definitionId);
        this.repeatingSection = this.definition.getVariable();
        this.ids = [];
	}

    getIds(callback) {
		let repeater = this;
		getSectionIDs(this.repeatingSection, function (ids) {
			ids.forEach(function (id) {
                repeater.ids.push(id);
			});
            callback(repeater);
		});
    }

    addIds(ids) {
        this.ids = this.ids.concat(ids);
    }
    clearIds() {
        this.ids = [];
    }
    iterate(callback) {
        for (let i = 0; i < this.ids.length; i++) {
            callback(this.ids[i]);
        }
    }
    getFieldName(id, fieldName) {
        return `${this.repeatingSection}_${id}_${fieldName}`;
    }
    addAttributeMods(attributeHandler, fieldNames) {
        let repeater = this;

        if (!Array.isArray(fieldNames)) {
            fieldNames = [fieldNames];
        }
        this.iterate(function (id) {
            for (let i = 0; i < fieldNames.length; i++) {
                attributeHandler.addMod(repeater.getFieldName(id, fieldNames[i]));
            }
        });
    }
    getIdFromFieldName(fieldName) {
        return fieldName.split("_")[2];
    }
    removeId(id) {
        removeRepeatingRow(this.repeatingSection + "_" + id);
    }
    removeAllIds() {
        for (let i = 0; i < this.ids.length; i++) {
            this.removeId(this.ids[i]);
        }
    }
}
class FormulaData {

    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (data.workers == undefined) {
                this.importFormula(data);
            }
            else {
                this.importJson(data);
            }
        }
    }

    createEmpty() {
        this.workers = [];
    }

    importJson(json) {
        this.workers = json.workers;
    }

    importFormula(data) {
        data = "" + data;
        if (data == "" || data == undefined) {
            return;
        }

        let formulaData = this;
        let definition = {};
        let modDefinition = {};
        let formulaVar = "";
        this.iterateFormulaComponents(data, function (definitionName, definitionNameModifier, multiplier, max) {
            if (isNaN(parseInt(definitionName))) {
                definition = WuxDef.Get(definitionName);
                if (definitionNameModifier == "") {
                    formulaVar = definition.getVariable();
                }
                else {
                    modDefinition = WuxDef.Get(definitionNameModifier);
                    formulaVar = definition.getVariable(modDefinition.getVariable());
                }

                formulaData.workers.push(formulaData.makeWorker(formulaVar, definitionName, 0, multiplier, max));
            }
            else {
                formulaData.workers.push(formulaData.makeWorker("", "", parseInt(definitionName), multiplier, max));
            }
        })
    }

    iterateFormulaComponents(baseFormula, callback) {
        let definitionName = "";
        let definitionNameModifier = "";
        let multiplier = 1;
        let max = 0;
        let formulaArray = baseFormula.split(";");
        formulaArray.forEach((formula) => {
            definitionName = formula.trim();
            max = 0;
            multiplier = 1;
            if (formula.indexOf("$") > -1) {
                let split = definitionName.split("$");
                definitionName = split[0];
                max = parseInt(split[1]);
            }
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

            callback(definitionName, definitionNameModifier, multiplier, max);
        });
    }

    addAttributes(attributes) {
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i] != "") {
                this.workers.push(this.makeWorker(attributes[i], "", 0, 1, 0));
            }
        }
    }

    makeWorker(variableName, definitionName, value, multiplier, max) {
        return {
            variableName: variableName,
            definitionName: definitionName,
            value: isNaN(parseInt(value)) ? 0 : parseInt(value),
            multiplier: isNaN(parseInt(multiplier)) ? 1 : parseInt(multiplier),
            max: max
        }
    }

    getAttributes() {
        let attributes = [];
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].variableName != "") {
                attributes.push(this.workers[i].variableName);
            }
        };
        return attributes;
    }

    getDefinitions() {
        let definitions = [];
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].definitionName != "") {
                definitions.push(this.workers[i].definitionName);
            }
        }
        return definitions;
    }

    hasFormula() {
        return this.workers.length > 0;
    }

    getValue(attributeHandler, printBreakdown) {
        let output = 0;
        let mod = 0;
        this.workers.forEach((worker) => {
            if (worker.variableName != "") {
                worker.value = attributeHandler.parseInt(worker.variableName);
                if (printBreakdown) {
                    console.log(`Adding ${worker.variableName}(${worker.value}) * ${worker.multiplier}`);
                }
            }
            else if (printBreakdown) {
                console.log(`Adding ${worker.value} * ${worker.multiplier}`);
            }
            mod = worker.value * worker.multiplier;
            if(worker.max > 0 && mod > worker.max) {
                mod = worker.max;
            }
            output += mod;
        });
        return output;
    }

    getString() {
        let output = "";
        let definition = {};
        this.workers.forEach((worker) => {
            if (worker.variableName != "") {
                if (worker.definitionName != "") {
                    definition = WuxDef.Get(worker.definitionName);
                    if (definition != undefined) {
                        if (output != "") {
                            output += " + ";
                        }
                        if (worker.multiplier != 1) {
                            output += `[${definition.title} x ${worker.multiplier}]`;
                        }
                        else {
                            output += `[${definition.title}]`;
                        }
                        
                        if (worker.max > 0) {
                            output += `(max:${worker.max})`;
                        }
                    }
                }
            }
            else {
                if (output != "") {
                    output += " + ";
                }
                output += worker.value;
            }
            
        });
        return output;
    }
}

class AttributeHandler {
	constructor(mods) {
		if (Array.isArray(mods)) {
			this.mods = mods;
		}
		else {
			this.mods = [];
			if (mods != undefined) {
			    this.mods.push(mods);
			}
		}
		this.current = {};
		this.update = {};
		this.getCallbacks = [];
		this.finishCallbacks = [];
	}
	addMod(mods) {
		if (Array.isArray(mods)) {
			this.mods = this.mods.concat(mods);
		}
		else {
			this.mods.push(mods);
		}
	}
	addFormulaMods(definition) {
        console.log(`Adding formula mods for ${definition.name}`);
		this.addMod(definition.formula.getAttributes());
	}
	addUpdate(attr, value) {
		this.update[attr] = value;
	}
	addGetAttrCallback(callback) {
		this.getCallbacks.push(callback);
	}
	addFinishCallback(callback) {
		this.finishCallbacks.push(callback);
	}
	run() {
	}

    getCurrentValue(fieldName) {
        return this.current[fieldName];
    }
    getUpdateValue(fieldName) {
        return this.update[fieldName];
    }
    validateDefaultValue(defaultValue, newDefaultValue) {
		if (defaultValue == undefined) {
			return newDefaultValue;
		}
        return defaultValue;
    }

	parseString(fieldName, defaultValue) {
		defaultValue = this.validateDefaultValue(defaultValue, "");
        let output = this.databaseParseString(fieldName);
        if (output == undefined || output == "") {
            output = defaultValue;
        }
        return output;
	}
    databaseParseString(fieldName) {
        if (this.update[fieldName] != undefined) {
            return this.getUpdateValue(fieldName);
        }
        else if (this.current[fieldName] != undefined) {
            return this.getCurrentValue(fieldName);
        }
        return undefined;
    }
	parseInt(fieldName, defaultValue) {
		defaultValue = this.validateDefaultValue(defaultValue, 0);
        let output = this.databaseParseInt(fieldName);
        if (output == undefined || isNaN(output) || output == "") {
            output = defaultValue;
        }
        return output;
	}
    databaseParseInt(fieldName) {
        if (this.update[fieldName] != undefined) {
            return parseInt(this.getUpdateValue(fieldName));
		}
		else if (this.current[fieldName] != undefined) {
            return parseInt(this.getCurrentValue(fieldName));
		}
        return undefined;
    }
	parseFloat(fieldName, defaultValue) {
		defaultValue = this.validateDefaultValue(defaultValue, 0);
        let output = this.databaseParseFloat(fieldName);
        if (output == undefined || isNaN(output) || output == "") {
            output = defaultValue;
        }
        return output;
	}
    databaseParseFloat(fieldName) {
        if (this.update[fieldName] != undefined) {
            return parseFloat(this.getUpdateValue(fieldName));
        }
        else if (this.current[fieldName] != undefined) {
            return parseFloat(this.getCurrentValue(fieldName));
        }
        return undefined;
    }
	parseJSON(fieldName, defaultValue) {
		defaultValue = this.validateDefaultValue(defaultValue, "");
        let output = this.databaseParseJSON(fieldName);
        if (output == undefined || output == "") {
            output = defaultValue;
        }
        return output;
	}
    databaseParseJSON(fieldName) {
        if (this.update[fieldName] != undefined) {
            return JSON.parse(this.getUpdateValue(fieldName));
        }
        else if (this.current[fieldName] != undefined) {
            return JSON.parse(this.getCurrentValue(fieldName));
        }
        return undefined;
    }
}
class SandboxAttributeHandler extends AttributeHandler {
    constructor(characterId, mods) {
        super(mods);
        this.characterId = characterId;
        this.attributes = {};
        this.maxCheck = false;
    }
    setMaxCheck(isMax) {
        if (isMax == undefined) {
            this.maxCheck = false;
        }
        this.maxCheck = isMax;
    }
    getUpdateValue(fieldName) {
        return this.update[fieldName].get(this.maxCheck ? "max" : "current");
    }
    parseString(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseString(fieldName, defaultValue);
    }
    databaseParseString(fieldName) {
        let output = super.databaseParseString(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return this.attributes[fieldName].get(this.maxCheck ? "max" : "current");
        }
        return output;
    }
            
    parseInt(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseInt(fieldName, defaultValue);
    }
    databaseParseInt(fieldName) {
        let output = super.databaseParseInt(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return parseInt(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
        }
        return output;
    }
    parseFloat(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseFloat(fieldName, defaultValue);
    }
    databaseParseFloat(fieldName) {
        let output = super.databaseParseFloat(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return parseFloat(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
        }
        return output;
    }
    parseJSON(fieldName, defaultValue, isMax) {
        this.setMaxCheck(isMax);
        return super.parseJSON(fieldName, defaultValue);
    }
    databaseParseJSON(fieldName) {
        let output = super.databaseParseJSON(fieldName);
        if (output == undefined && this.attributes[fieldName] != undefined) {
            return JSON.parse(this.attributes[fieldName].get(this.maxCheck ? "max" : "current"));
        }
        return output;
    }

    addAttribute(attr) {
        if (this.attributes.hasOwnProperty(attr)) {
            return;
        }
        DebugLog(`Adding attribute ${attr}`);
        this.attributes[attr] = this.getCharacterAttribute(attr);
    }
    getAttribute(attr) {
        if (!this.attributes.hasOwnProperty(attr)) {
            return undefined;
        }
        return this.attributes[attr];
    }
	addUpdate(attr, value, isMax) {
        if (this.attributes[attr] == undefined) {
            this.addAttribute(attr);
        }
        super.addUpdate(attr, {type: isMax ? "max" : "current", value: value});
	}
	run() {
		let attributeHandler = this;
        attributeHandler.mods.forEach((property) => {
            attributeHandler.current[property] = getAttrByName(this.characterId, property);
        });

        attributeHandler.finishCallbacks.forEach((callback) => {
            callback(attributeHandler);
        });

        // set the update changes
        let attribute = {};
        let updateData = {};
        for (const property in attributeHandler.update) {
            attribute = attributeHandler.attributes[property];
            updateData = attributeHandler.update[property];
            if (attribute != undefined && updateData != undefined) {
                attribute.set(updateData.type, updateData.value);
            }
        };
	}

    getCharacterAttribute (attrName) {
        var returnVal = undefined;
        var chracterAttributes = findObjs({
            _characterid: this.characterId,
            _type: "attribute",
            name: attrName
        }, {caseInsensitive: true});
    
        if (chracterAttributes.length > 0) {
            returnVal = chracterAttributes[0];
        }
    
        return returnVal;
    }
}
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

    cleanValues() {
        let key = "";
        let keys = [];
        let values = {};
        for (let i = 0; i < this.keys.length; i++) {
            key = this.keys[i];
            if (parseInt(this.values[key].value) != 0) {
                keys.push(key);
                values[key] = this.values[key];
            }
        }
        this.keys = keys;
        this.values = values;
    }
}
class WorkerFormula {
    constructor(variableName, definitionName, value, multiplier) {
        this.variableName = variableName;
        this.definitionName = definitionName;
        this.value = isNaN(parseInt(value)) ? 0 : parseInt(value);
        this.multiplier = isNaN(parseInt(multiplier)) ? 1 : parseInt(multiplier);
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
                case "K": actionEffectsObj.addEnergyRecovery(effect, targetSelf); break;
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

                addEnergyRecovery: function (name, targetSelf) {
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
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].trim();
            }
            return arr;
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

        sanitizeMacroJSON = function (macro) {
            macro = macro.replace(/"/g, "%#");
            macro = macro.replace(/\{/gi, "&#123;");
            macro = macro.replace(/\}/gi, "&#125;");
            return macro;
        },

        parseMacroJSON = function (macro) {
            macro = macro.replace(/%#/g, '"');
            return JSON.parse(macro);
        },

        sanitizeMacroRollTemplate = function (roll) {
            var sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/\{/gi, "&#123;");
            sheetRoll = sheetRoll.replace(/\}/gi, "&#125;");
            return sheetRoll;
        },

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
        SanitizeMacroJSON: sanitizeMacroJSON,
        ParseMacroJSON: parseMacroJSON,
        SanitizeMacroRollTemplate: sanitizeMacroRollTemplate,
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

        dropRollDice = function (dieCount, dieType, keepCount, keepHigh) {
            let output = {
                rolls: [],
                keeps: [],
                message: ""
            }
            output.rolls = rollDice(dieCount, dieType);
            if (keepHigh) {
                output.rolls = Format.SortArrayDecrementing(output.rolls);
            }
            else {
                output.rolls.sort();
            }

            output.message = "Rolls(";
            for (let i = 0; i < output.rolls.length; i++) {
                if (i < keepCount) {
                    output.keeps.push(output.rolls[i]);
                    output.message += `[${output.rolls[i]}]`;
                }
                else {
                    output.message += `${output.rolls[i]}`;
                }
                if (i < output.rolls.length - 1) {
                    output.message += `, `;
                }
            }
            output.message += `)`;
            
            return output;
        },

        rollSkillCheck = function(advantages, mod) {
            let dieCount = 2 + Math.abs(advantages);
            let dieType = 6;
            let roll = dropRollDice(dieCount, dieType, 2, advantages >= 0);
            let total = totalDice(roll.keeps) + mod;
            let message = `${roll.message} + Mod[${mod}]`;
            return {
                rolls: roll.rolls,
                keeps: roll.keeps,
                message: message,
                total: total
            };
        }

        ;
    return {
        RollDice: rollDice,
        TotalDice: totalDice,
        DropRollDice: dropRollDice,
        RollSkillCheck: rollSkillCheck
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
		keys = ["Attribute", "Skill", "Job", "JobStyle", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "General", "Chat", "Combat", "Social", "SeverityRank", "DamageType", "Trait", "Status", "Condition", "Emotion", "Boon", "_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "GeneralLoreTier0", "GeneralLoreTier1", "Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "Speak", "Whisper", "Yell", "Think", "Describe", "PageSet_Character Creator", "PageSet_Core", "PageSet_TechType", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_AdvancementConversion", "Title_Training", "Title_TrainingConversion", "Title_ShowTechnique", "Title_UseTechnique", "Title_Chat", "Title_LanguageSelect", "Title_Emotes", "Title_Outfits", "Title_TechEffect", "Title_TechDC", "Title_TechDefense", "Chat_Type", "Chat_Target", "Chat_Message", "Chat_Language", "Chat_LanguageTag", "Chat_PostContent", "RepeatingActiveEmotes", "Chat_SetId", "Chat_Emotes", "Chat_DefaultEmote", "Chat_PostName", "Chat_PostURL", "Chat_OutfitName", "Chat_OutfitEmotes", "Chat_EmoteName", "Chat_EmoteURL", "RepeatingOutfits", "Chat_OutfitDefault", "Chat_OutfitDefaultURL", "Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "LearnStyle", "StyleTechniques", "StyleFreeTechniques", "TrainingKnowledge", "TrainingTechniques", "PP", "Attr_BOD", "Attr_PRC", "Attr_QCK", "Attr_CNV", "Attr_INT", "Attr_RSN", "Def_Brace", "Def_Fortitude", "Def_Disruption", "Def_Hide", "Def_Reflex", "Def_Evasion", "Def_Insight", "Def_Notice", "Def_Guile", "Def_Scrutiny", "Def_Resolve", "Def_Freewill", "CombatDefense", "SocialSense", "WillBreak", "FullName", "DisplayName", "Background", "Age", "Gender", "Homeland", "Affinity", "InnateDefense", "InnateSense", "Title_Boon", "Boon_Rest", "Boon_Nourishment", "Boon_Inspiration", "HP", "WILL", "EN", "Cmb_Chakra", "Chakra", "Initiative", "Recall", "Power", "Accuracy", "Spellforce", "Charisma", "Carrying Capacity", "Cmb_HV", "Cmb_Armor", "Resistance", "Cmb_ResistanceDesc", "Cmb_WeaknessDesc", "Cmb_Vitality", "Cmb_Surge", "Cmb_Mv", "Cmb_MvPotency", "Dash", "MaxDash", "Soc_Favor", "RepeatingInfluences", "Soc_Influence", "InfluenceTrait", "InfluenceIdeal", "InfluenceBond", "InfluenceGoal", "Soc_Severity", "Svr_LowSeverity", "Svr_ModerateSeverity", "Svr_HighSeverity", "Soc_PersuadeCheck", "Soc_PersuadeRequest", "Soc_Patience", "Dmg_Burn", "Dmg_Cold", "Dmg_Energy", "Dmg_Fire", "Dmg_Force", "Dmg_Patience", "Dmg_Piercing", "Dmg_Shock", "Dmg_Tension", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Light", "Trait_Sharp", "Trait_Sturdy", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Transparent", "Style_Basic Action", "Style_Basic Attack", "Style_Basic Activity", "Style_Basic Social", "Style_Basic Support", "Style_Charm Unrestrained", "Style_Inspiring Presence", "Style_Deft Negotiator", "Style_Abrasive Wit", "Style_Tyrannical Voice", "Style_Calming Empathy", "Skill_Acrobatics", "Skill_Alchemy", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Cook", "Skill_Demoralize", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Inspire", "Skill_Might", "Skill_Pilot", "Skill_Rationalize", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Skill_Warding", "Lang_Minere", "Lang_Junal", "Lang_Apollen", "Lang_Lib", "Lang_Cert", "Lang_Byric", "Lang_Dustell", "Lang_Muralic", "Lang_Shira", "Lang_Ciel", "Lang_Citeq", "Lang_Manstan", "Lang_Salkan", "Lang_Sansic", "Lang_Silq", "Lang_Kleikan", "Lang_Crinere", "Lang_Palmic", "Lang_Shorespeak", "Lang_Verdeni", "Lang_Vulca", "Lang_Emotion", "Lang_Empathy", "Lang_Wolfwarg", "Lang_Jovean", "Lang_Mytikan", "LoreCat_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "LoreCat_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "LoreCat_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "LoreCat_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "LoreCat_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "LoreCat_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "LoreCat_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "JStyle_Interceptor", "JStyle_Guardian", "JStyle_Spellslinger", "JStyle_Warrior", "JStyle_Rogue", "JStyle_Scholar", "JStyle_Physician", "Stat_Downed", "Stat_Dying", "Stat_Engaged", "Stat_Ethereal", "Stat_Grappled", "Stat_Hidden", "Stat_Invisible", "Stat_Multiact", "Stat_Restrained", "Stat_Unconscious", "Stat_Aflame", "Stat_Chilled", "Stat_Delayed", "Stat_Empowered", "Stat_Encumbered", "Stat_Hasted", "Stat_Immobilized", "Stat_Impaired", "Stat_Launched", "Stat_Paralyzed", "Stat_Persevering", "Stat_Prone", "Stat_Sickened", "Stat_Staggered", "Stat_Stunned", "Stat_Angered", "Stat_Disgusted", "Stat_Doubt", "Stat_Encouraged", "Stat_Frightened", "Stat_Flustered", "Stat_Receptive", "Stat_Joyful", "Stat_Saddened", "Stat_Surprised", "Tech_Hide", "Tech_Mount", "Tech_Move", "Tech_Prepare", "Tech_Interact", "Tech_Detect Ether", "Tech_Detect Creature", "Tech_Dash", "Tech_Break Free", "Tech_Escape", "Tech_Move Silently", "Tech_Reposition", "Tech_Grab an Edge", "Tech_Aid", "Tech_Stabilize", "Tech_Reassure", "Tech_Calm Mind", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Favor", "Tech_Agitate", "Tech_Emphasize", "Tech_Request", "Tech_Sense Motive", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Fighter", "Tech_Fighter II", "Tech_Marksman", "Tech_Marksman II", "Tech_Mage", "Tech_Mage II", "Tech_Teacher", "Tech_Teacher II", "Tech_Influencer", "Tech_Influencer II", "Tech_Motivator", "Tech_Motivator II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Swift Rebuttal", "Tech_Build Pressure", "Tech_Appeal", "Tech_Insist", "Tech_Proposal", "Tech_Advocate", "Tech_Dismiss", "Tech_Flatter", "Tech_Beguile", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Charming Request", "Tech_Pander", "Tech_Flatter II", "Tech_Invigorate", "Tech_Enthusiasm", "Tech_Meditate", "Tech_Zeal", "Tech_Deepen Connection", "Tech_Bravado", "Tech_Motivational Speech", "Tech_Invigorate II", "Tech_Diplomacy", "Tech_Fast Talk", "Tech_Quick Request", "Tech_Segue", "Tech_Increase Tension", "Tech_Diplomacy II", "Tech_Final Push", "Tech_Subvert", "Tech_Indifference", "Tech_Spite", "Tech_Ridicule", "Tech_Unfazed", "Tech_Subvert II", "Tech_Redirect Anger", "Tech_Threaten", "Tech_Taunt", "Tech_Domineer", "Tech_Tyrannize", "Tech_Command", "Tech_Threaten II", "Tech_Rage", "Tech_Tranquility", "Tech_Simple Request", "Tech_Small Talk", "Tech_Guidance", "Tech_Mindfulness", "Tech_Tranquility II", "Tech_Sympathy", "Tech_Serenity of Mind", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Mean", "Tech_Fuel the Fire", "Tech_Veiled Anger", "Tech_Oppress", "Tech_Bellow", "Tech_Bulldoze", "Tech_Enforcement", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Intrigue", "Tech_Consideration", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Close it Out", "Tech_Obtuse", "Tech_Reconsider", "Tech_Evil Eye", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Reel'Em In", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "group": "Type", "description": "", "variable": "atr{0}{1}", "title": "Attributes", "subGroup": "", "descriptions": [""],
				"abbreviation": "Attr", "baseFormula": "6;CR", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 6, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Attribute"],
				"isResource": ""
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "group": "Type", "description": "", "variable": "skl{0}{1}", "title": "Skills", "subGroup": "", "descriptions": [""],
				"abbreviation": "Skill", "baseFormula": "Level*2$8;CR;AdvancementSkill", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 2, "max": 8 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_skill", "definitionName": "AdvancementSkill", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Skill:_rank"],
				"isResource": ""
			},
			"Job": {
				"name": "Job", "fieldName": "job", "group": "Type", "description": "", "variable": "job{0}{1}", "title": "Jobs", "subGroup": "", "descriptions": [""],
				"abbreviation": "Job", "baseFormula": "CR;AdvancementJob", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Job:_rank"],
				"isResource": ""
			},
			"JobStyle": {
				"name": "JobStyle", "fieldName": "jobstyle", "group": "Type", "description": "", "variable": "jbs{0}{1}", "title": "Job", "subGroup": "", "descriptions": [""],
				"abbreviation": "JStyle", "baseFormula": "1", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": ["Job"],
				"isResource": ""
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "group": "Type", "description": "", "variable": "knw{0}{1}", "title": "Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "Know", "baseFormula": "6;TrainingKnowledge", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 6, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_knowledge", "definitionName": "TrainingKnowledge", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Language:_rank", "Lore:_rank", "LoreCategory:_rank"],
				"isResource": ""
			},
			"Language": {
				"name": "Language", "fieldName": "language", "group": "Type", "description": "", "variable": "lng{0}{1}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "Lang", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCategory": {
				"name": "LoreCategory", "fieldName": "lorecategory", "group": "Type", "description": "", "variable": "lrc{0}{1}", "title": "Lore Category", "subGroup": "", "descriptions": [""],
				"abbreviation": "LoreCat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "group": "Type", "description": "", "variable": "lor{0}{1}", "title": "Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "Lore", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Style": {
				"name": "Style", "fieldName": "style", "group": "Type", "description": "", "variable": "sty{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "Style", "baseFormula": "3", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": ["Style", "JobStyle"],
				"isResource": ""
			},
			"StyleType": {
				"name": "StyleType", "fieldName": "styletype", "group": "Type", "description": "", "variable": "stt{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "StyleType", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "group": "Type", "description": "", "variable": "tch{0}{1}", "title": "Techniques", "subGroup": "", "descriptions": [""],
				"abbreviation": "Tech", "baseFormula": "Level*1$4;CR*3;AdvancementTechnique;TrainingTechniques", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Technique", "Style"],
				"isResource": ""
			},
			"PageSet": {
				"name": "PageSet", "fieldName": "pageset", "group": "Type", "description": "", "variable": "pgs{0}{1}", "title": "Page Set", "subGroup": "", "descriptions": [""],
				"abbreviation": "PageSet", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page": {
				"name": "Page", "fieldName": "page", "group": "Type", "description": "", "variable": "pag{0}{1}", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "Page", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title": {
				"name": "Title", "fieldName": "title", "group": "Type", "description": "", "variable": "ttl{0}{1}", "title": "Title", "subGroup": "", "descriptions": [""],
				"abbreviation": "Title", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "group": "Type", "description": "", "variable": "adv{0}{1}", "title": "Advancement", "subGroup": "", "descriptions": ["Advancement Points are gained whenever you level. ", "Every level you gain grants you one advancement point."],
				"abbreviation": "Adv", "baseFormula": "Level", "modifiers": "", "formula": { "workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": true
			},
			"Training": {
				"name": "Training", "fieldName": "training", "group": "Type", "description": "", "variable": "trn{0}{1}", "title": "Training Points", "subGroup": "", "descriptions": ["Training points are gained through training. You can spend training points on bonus build points for both knowledge and techniques. ", "Whenever you gain PP, you gain one Training Point."],
				"abbreviation": "Trn", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": true
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "group": "Type", "description": "", "variable": "def{0}{1}", "title": "Defense", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "group": "Type", "description": "", "variable": "sen{0}{1}", "title": "Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AffinityType": {
				"name": "AffinityType", "fieldName": "affinitytype", "group": "Type", "description": "", "variable": "afn{0}{1}", "title": "Affinity Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Aff", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateDefenseType": {
				"name": "InnateDefenseType", "fieldName": "innatedefensetype", "group": "Type", "description": "", "variable": "idf{0}{1}", "title": "Innate Defense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateSenseType": {
				"name": "InnateSenseType", "fieldName": "innatesensetype", "group": "Type", "description": "", "variable": "isn{0}{1}", "title": "Innate Sense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"General": {
				"name": "General", "fieldName": "general", "group": "Type", "description": "", "variable": "gen{0}{1}", "title": "General", "subGroup": "", "descriptions": [""],
				"abbreviation": "Gen", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": true
			},
			"Chat": {
				"name": "Chat", "fieldName": "chat", "group": "Type", "description": "", "variable": "chat{0}{1}", "title": "Chat", "subGroup": "", "descriptions": [""],
				"abbreviation": "Chat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "group": "Type", "description": "", "variable": "cmb{0}{1}", "title": "Combat", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "Cmb", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Social": {
				"name": "Social", "fieldName": "social", "group": "Type", "description": "", "variable": "soc{0}{1}", "title": "Social", "subGroup": "", "descriptions": [""],
				"abbreviation": "Soc", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"SeverityRank": {
				"name": "SeverityRank", "fieldName": "severityrank", "group": "Type", "description": "", "variable": "sev{0}{1}", "title": "Severity Rank", "subGroup": "", "descriptions": [""],
				"abbreviation": "Svr", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"DamageType": {
				"name": "DamageType", "fieldName": "damagetype", "group": "Type", "description": "", "variable": "dmg{0}{1}", "title": "Damage Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Dmg", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "group": "Type", "description": "", "variable": "trt{0}{1}", "title": "Traits", "subGroup": "", "descriptions": [""],
				"abbreviation": "Trait", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Status": {
				"name": "Status", "fieldName": "status", "group": "Type", "description": "", "variable": "sts{0}{1}", "title": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "Stat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "group": "Type", "description": "", "variable": "cnd{0}{1}", "title": "Condition", "subGroup": "", "descriptions": [""],
				"abbreviation": "Stat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Emotion": {
				"name": "Emotion", "fieldName": "emotion", "group": "Type", "description": "", "variable": "emo{0}{1}", "title": "Emotion", "subGroup": "", "descriptions": [""],
				"abbreviation": "Stat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Boon": {
				"name": "Boon", "fieldName": "boon", "group": "Type", "description": "", "variable": "boon{0}{1}", "title": "Boon", "subGroup": "", "descriptions": [""],
				"abbreviation": "Boon", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "group": "VariableMod", "description": "", "variable": "_max", "title": "Max", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "group": "VariableMod", "description": "", "variable": "_true", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "group": "VariableMod", "description": "", "variable": "_rank", "title": "Rank", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "group": "VariableMod", "description": "", "variable": "_build", "title": "Build", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "group": "VariableMod", "description": "", "variable": "_filter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_subfilter": {
				"name": "_subfilter", "fieldName": "_subfilter", "group": "VariableMod", "description": "", "variable": "_subfilter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "group": "VariableMod", "description": "", "variable": "_expand", "title": "Expand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "group": "VariableMod", "description": "", "variable": "_tab", "title": "Tab", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "group": "VariableMod", "description": "", "variable": "_page", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_info": {
				"name": "_info", "fieldName": "_info", "group": "VariableMod", "description": "", "variable": "_info", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "group": "VariableMod", "description": "", "variable": "_exit", "title": "Exit", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "group": "VariableMod", "description": "", "variable": "_finish", "title": "Finish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "group": "VariableMod", "description": "", "variable": "_origin", "title": "Origin", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "group": "VariableMod", "description": "", "variable": "_learn", "title": "Learn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "group": "VariableMod", "description": "", "variable": "_pts", "title": "Points", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "group": "VariableMod", "description": "", "variable": "_tech", "title": "Technique Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "group": "VariableMod", "description": "", "variable": "_expertise", "title": "Expertise Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "group": "VariableMod", "description": "", "variable": "_gear", "title": "Gear Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_affinity": {
				"name": "_affinity", "fieldName": "_affinity", "group": "VariableMod", "description": "", "variable": "_affinity", "title": "Affinity Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "group": "VariableMod", "description": "", "variable": "_error", "title": "Error", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "group": "AffinityType", "description": "", "variable": "Wood", "title": "Wood", "subGroup": "", "descriptions": ["Wood is the element of growth, cooperation, and idealism. Magical techniques of the wood element tend to affect large groups and areas.", "A Wood affinity grants the following:\nInitiative bonus equal to your Character Rank.\nHeal Value bonus equal to your Character Rank x 2.\nCold Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "group": "AffinityType", "description": "", "variable": "Fire", "title": "Fire", "subGroup": "", "descriptions": ["Fire is the element of expansion, spontaneity, and vigor. Magical techniques of the fire element tend to spread fire swiftly in a variety of impact areas.", "A Fire affinity grants the following:\nInitiative bonus equal to your Character Rank.\nBurn Resistance bonus equal to your Character Rank.\nFire Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "group": "AffinityType", "description": "", "variable": "Earth", "title": "Earth", "subGroup": "", "descriptions": ["Earth is the element of stability, patience, and practicality. Magical techniques of the earth element tend to be simple and direct in functionality.", "An Earth affinity grants the following:\nFire Resistance bonus equal to your Character Rank x 2.\nPiercing Resistance bonus equal to your Character Rank.\nShock Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "group": "AffinityType", "description": "", "variable": "Metal", "title": "Metal", "subGroup": "", "descriptions": ["Metal is the element of recession, rigidity, and quality. Magical techniques of the metal element tend to be strong and durable but costly.", "A Metal affinity grants the following:\nArmor bonus equal to your Character Rank.\nForce Resistance bonus equal to your Character Rank.\nPiercing Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Water": {
				"name": "Water", "fieldName": "water", "group": "AffinityType", "description": "", "variable": "Water", "title": "Water", "subGroup": "", "descriptions": ["Water is the element of conservation, flexibility, and wisdom. Magical techniques of the water element tend to use little energy allowing them to quickly come into effect and disappear soon after.", "A Water affinity grants the following:\nSurge bonus equal to 1.\nCold Resistance bonus equal to your Character Rank x 2.\nForce Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"BOD": {
				"name": "BOD", "fieldName": "bod", "group": "InnateDefenseType", "description": "", "variable": "BOD", "title": "Body", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PRC": {
				"name": "PRC", "fieldName": "prc", "group": "InnateDefenseType", "description": "", "variable": "PRC", "title": "Precision", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"QCK": {
				"name": "QCK", "fieldName": "qck", "group": "InnateDefenseType", "description": "", "variable": "QCK", "title": "Quickness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"CNV": {
				"name": "CNV", "fieldName": "cnv", "group": "InnateSenseType", "description": "", "variable": "CNV", "title": "Conviction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"INT": {
				"name": "INT", "fieldName": "int", "group": "InnateSenseType", "description": "", "variable": "INT", "title": "Intuition ", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"RSN": {
				"name": "RSN", "fieldName": "rsn", "group": "InnateSenseType", "description": "", "variable": "RSN", "title": "Reason", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributevaluemediocre", "group": "AttributeValue", "description": "", "variable": "0", "title": "Mediocre (+0)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributevaluegreat", "group": "AttributeValue", "description": "", "variable": "3", "title": "Great (+3)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributevaluegood", "group": "AttributeValue", "description": "", "variable": "2", "title": "Good (+2)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributevalueaverage", "group": "AttributeValue", "description": "", "variable": "1", "title": "Average (+1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributevaluebad", "group": "AttributeValue", "description": "", "variable": "-1", "title": "Bad (-1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier0": {
				"name": "JobTier0", "fieldName": "jobtier0", "group": "JobTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier1": {
				"name": "JobTier1", "fieldName": "jobtier1", "group": "JobTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier2": {
				"name": "JobTier2", "fieldName": "jobtier2", "group": "JobTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier3": {
				"name": "JobTier3", "fieldName": "jobtier3", "group": "JobTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier0": {
				"name": "LoreTier0", "fieldName": "loretier0", "group": "LoreTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier1": {
				"name": "LoreTier1", "fieldName": "loretier1", "group": "LoreTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier2": {
				"name": "LoreTier2", "fieldName": "loretier2", "group": "LoreTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier3": {
				"name": "LoreTier3", "fieldName": "loretier3", "group": "LoreTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"GeneralLoreTier0": {
				"name": "GeneralLoreTier0", "fieldName": "generalloretier0", "group": "GeneralLoreTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"GeneralLoreTier1": {
				"name": "GeneralLoreTier1", "fieldName": "generalloretier1", "group": "GeneralLoreTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Academics": {
				"name": "Academics", "fieldName": "academics", "group": "LoreCategory", "description": "", "variable": "Academics", "title": "Academics", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Profession": {
				"name": "Profession", "fieldName": "profession", "group": "LoreCategory", "description": "", "variable": "Profession", "title": "Profession", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Craftmanship": {
				"name": "Craftmanship", "fieldName": "craftmanship", "group": "LoreCategory", "description": "", "variable": "Craftmanship", "title": "Craftmanship", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Geography": {
				"name": "Geography", "fieldName": "geography", "group": "LoreCategory", "description": "", "variable": "Geography", "title": "Geography", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"History": {
				"name": "History", "fieldName": "history", "group": "LoreCategory", "description": "", "variable": "History", "title": "History", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Culture": {
				"name": "Culture", "fieldName": "culture", "group": "LoreCategory", "description": "", "variable": "Culture", "title": "Culture", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Religion": {
				"name": "Religion", "fieldName": "religion", "group": "LoreCategory", "description": "", "variable": "Religion", "title": "Religion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Speak": {
				"name": "Speak", "fieldName": "speak", "group": "ChatType", "description": "", "variable": "ctmsg", "title": "Speak", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Whisper": {
				"name": "Whisper", "fieldName": "whisper", "group": "ChatType", "description": "", "variable": "ctwsp", "title": "Whisper", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Yell": {
				"name": "Yell", "fieldName": "yell", "group": "ChatType", "description": "", "variable": "ctyell", "title": "Yell", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Think": {
				"name": "Think", "fieldName": "think", "group": "ChatType", "description": "", "variable": "ctthk", "title": "Think", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Describe": {
				"name": "Describe", "fieldName": "describe", "group": "ChatType", "description": "", "variable": "ctdesc", "title": "Describe", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Character Creator": {
				"name": "PageSet_Character Creator", "fieldName": "character_creator", "group": "PageSet", "description": "", "variable": "pgs-character_creator{0}", "title": "Character Creator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Core": {
				"name": "PageSet_Core", "fieldName": "core", "group": "PageSet", "description": "", "variable": "pgs-core{0}", "title": "Core", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_TechType": {
				"name": "PageSet_TechType", "fieldName": "techtype", "group": "PageSet", "description": "", "variable": "pgs-techtype{0}", "title": "TechType", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Advancement": {
				"name": "PageSet_Advancement", "fieldName": "advancement", "group": "PageSet", "description": "", "variable": "pgs-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Training": {
				"name": "PageSet_Training", "fieldName": "training", "group": "PageSet", "description": "", "variable": "pgs-training{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "group": "Page", "description": "", "variable": "pag-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["This is the Character Creator. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, press Finish to populate this character's stats.", "On this page you can set your character's origins including their name, their primary element, and ancestry. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Jobs": {
				"name": "Page_Jobs", "fieldName": "jobs", "group": "Page", "description": "", "variable": "pag-jobs{0}", "title": "Jobs", "subGroup": "", "descriptions": ["Jobs are a unique type of Style which broadly represents a character's role. A job will always grant bonuses to a character's combat or social stats, defenses, and special techniques to determine how the character acts in a conflict. When entering a conflict, only one job may be set at a time. ", "On this page, you can see the number of job points you have available to spend on the left column. Each time you spend a job point you may gain a rank in one job. A job's maximum rank is equal to your Character Rank.", "Gaining a rank in a job often grants new techniques to use when a job's techniques are active.", "You gain a number of job points equal to your Character Rank. You may choose to gain additional job points by spending advancement points on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Skills": {
				"name": "Page_Skills", "fieldName": "skills", "group": "Page", "description": "", "variable": "pag-skills{0}", "title": "Skills", "subGroup": "", "descriptions": ["Skills represent a broad application of techniques and ability. Anytime you do anything complex in Wuxing you will be making a skill check to determine your success. In addition, most techniques will require the use of a skill to function.", "Skills are all tied to one of the six attributes. As a base, a skill modifier is equal to its associated attribute. When you are trained in a skill your modifier increases by 2 + your Character Rank.", "On this page you can see the number of skill points you have available to spend on the left column. Each time you spend a skill point you may become trained in one skill. To train a skill you must check the skill off on the checkbox.", "You begin play with 3 skill points and gain an additional 2 at 2nd, 3rd, and 4th level. You gain an additional skill point whenever you increase in Character Rank. You may choose to gain additional skill points by spending advancement points on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Knowledge": {
				"name": "Page_Knowledge", "fieldName": "knowledge", "group": "Page", "description": "", "variable": "pag-knowledge{0}", "title": "Knowledge", "subGroup": "", "descriptions": ["Knowledge represents information a character knows on a subject. Knowledge can be divided into two categories, languages and lore. ", "Languages are divided by the locations of the world where they are used. Learning a language allows one to speak, read, and write the language. ", "Lore is knowledge of a single broad topic. Whenever you use the Recall Knowledge technique, you will roll with the modifier of an appropriate lore knowledge for the subject you wish to recall knowledge for. When you make a lore check your modifier is equal to your lore's rank + your Character Rank.", "Lore is divided into categories based on the context of their usage. Each category has a General knowledge that can be trained. Normally, you cannot make a lore check without having an associated lore, however having the general knowledge of the subject will allow it. When making a general lore check, your modifier is equal to your Character Rank.", "On this page you can see the number of knowledge points you have available to spend on the left column. Each time you spend a knowledge point you may raise the rank of any lore or learn a language. To raise the rank of a lore, you may change the value of a lore with its dropdown. To learn a language you must check the language off on the checkbox.", "You gain a number of skill points equal to 6 + your Character Rank. You may choose to gain additional knowledge points by spending training points through training on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Attributes": {
				"name": "Page_Attributes", "fieldName": "attributes", "group": "Page", "description": "", "variable": "pag-attributes{0}", "title": "Attributes", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "Attributes range from a +3 bonus to a -1 penalty. Whenever you raise an attribute to a rank you spend an equal number of attribute points.", "By reducing an attribute below 0, you gain an equal number of attribute points. At most, a character can have one attribute at a -1 penalty.", "You gain a number of attribute points equal to 6 + your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Styles": {
				"name": "Page_Styles", "fieldName": "styles", "group": "Page", "description": "", "variable": "pag-styles{0}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": []
				,
				"isResource": ""
			},
			"Page_LearnTechniques": {
				"name": "Page_LearnTechniques", "fieldName": "learntechniques", "group": "Page", "description": "", "variable": "pag-learntechniques{0}", "title": "Techniques", "subGroup": "", "descriptions": ["Each technique allows a character to perform a variety of actions including granting bonuses to the character, performing attacks, manipulate others, or maneuvering around the world.", "All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can learn general styles and techniques. This page contains general styles and techniques that are available to all characters as long as they meet the requirements to learn the style or technique.", "When learning a style often the style will grant a set of techniques that are learned as part of the style. These are listed as Free Techniques in the Style's entry.", "You begin play with 4 technique points and gain an additional point at 2nd, 3rd, and 4th level. You gain an additional 3 technique points whenever you increase in Character Rank. You may choose to gain additional technique points by spending advancement points on level up. You may also choose to gain additional technique points by spending training points through training on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_SetStyles": {
				"name": "Page_SetStyles", "fieldName": "setstyles", "group": "Page", "description": "", "variable": "pag-setstyles{0}", "title": "Styles", "subGroup": "", "descriptions": ["All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can set which styles are currently active on the character, allowing them to be used in the Actions Page. You can set both job styles and general styles. Basic styles are always set. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "group": "Page", "description": "", "variable": "pag-character{0}", "title": "Character", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "group": "Page", "description": "", "variable": "pag-overview{0}", "title": "Overview", "subGroup": "", "descriptions": ["The Overview section shows quick information about your character. In addition, this is where you access both Advancement and Training to improve or change your character's build."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "group": "Page", "description": "", "variable": "pag-details{0}", "title": "Details", "subGroup": "", "descriptions": ["The Details section contains all of your character's vital statistics. You can use this page to see exact numbers of each of their stats."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "group": "Page", "description": "", "variable": "pag-chat{0}", "title": "Chat", "subGroup": "", "descriptions": ["This is the Chat section. Here you can set your character emotes for the chat's messaging system. You can also use the Chat Post Box to send messages to the chat and select which language you are speaking from the language selection."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "group": "Page", "description": "", "variable": "pag-options{0}", "title": "Options", "subGroup": "", "descriptions": ["This is the Options section. Here you will find various display options in the character sheet."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "group": "Page", "description": "", "variable": "pag-gear{0}", "title": "Gear", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Actions": {
				"name": "Page_Actions", "fieldName": "actions", "group": "Page", "description": "", "variable": "pag-actions{0}", "title": "Actions", "subGroup": "", "descriptions": ["This is the Actions section. Here you can use any action available to your character."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Training": {
				"name": "Page_Training", "fieldName": "training", "group": "Page", "description": "", "variable": "pag-training{0}", "title": "Training", "subGroup": "", "descriptions": ["Characters can spend time learning new skills in their own free time. In this page you can track your progress learning and potentially gain ranks in knowledge or learn new techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Advancement": {
				"name": "Page_Advancement", "fieldName": "advancement", "group": "Page", "description": "", "variable": "pag-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Origin": {
				"name": "Title_Origin", "fieldName": "origin", "group": "Title", "description": "", "variable": "ttl-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["These are the origin details of your character. They make no mechanical differences to your character, however may impact how you roleplay your character."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_OriginStats": {
				"name": "Title_OriginStats", "fieldName": "originstats", "group": "Title", "description": "", "variable": "ttl-originstats{0}", "title": "Origin Statistics", "subGroup": "", "descriptions": ["These are your characters core statistics that are set at character creation and cannot change. Each stat can affect how your character plays. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_OriginAdvancement": {
				"name": "Title_OriginAdvancement", "fieldName": "originadvancement", "group": "Title", "description": "", "variable": "ttl-originadvancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "Here you can set your character's level. You may also spend any advancement points gained from increasing your character level on additional build points for jobs, skills, or techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_OriginTraining": {
				"name": "Title_OriginTraining", "fieldName": "origintraining", "group": "Title", "description": "", "variable": "ttl-origintraining{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "Here you can set any training points your character may have gained prior to character creation. You may also immediately spend these points on further build points."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Advancement": {
				"name": "Title_Advancement", "fieldName": "advancement", "group": "Title", "description": "", "variable": "ttl-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "In this section you can see your current level and track their experience. When you are ready, you may also access the advancement menu which will allow you to spend gained build points from leveling up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_AdvancementConversion": {
				"name": "Title_AdvancementConversion", "fieldName": "advancementconversion", "group": "Title", "description": "", "variable": "ttl-advancementconversion{0}", "title": "Conversion", "subGroup": "", "descriptions": ["Experience Points are used to grant levels to your character. You can convert experience points (XP) into levels by using the convert to levels button below."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Training": {
				"name": "Title_Training", "fieldName": "training", "group": "Title", "description": "", "variable": "ttl-training{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "In this section you can see how many training points you have gained along with your current PP values. When you are ready, you may also access the training menu which will calculate your current training points and allow you to spend them to learn new knowledge and techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TrainingConversion": {
				"name": "Title_TrainingConversion", "fieldName": "trainingconversion", "group": "Title", "description": "", "variable": "ttl-trainingconversion{0}", "title": "Conversion", "subGroup": "", "descriptions": ["PP is used to gain Training Points for your character. You can convert PP into Training Points by using the convert to TP button below."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_ShowTechnique": {
				"name": "Title_ShowTechnique", "fieldName": "showtechnique", "group": "Title", "description": "", "variable": "ttl-showtechnique{0}", "title": "Show Technique", "subGroup": "", "descriptions": ["Clicking this button will send the technique information to chat, allowing others to see its details.", "Showing the technique in this way does not consume any resources. It is purely for display."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_UseTechnique": {
				"name": "Title_UseTechnique", "fieldName": "usetechnique", "group": "Title", "description": "", "variable": "ttl-usetechnique{0}", "title": "Use Technique", "subGroup": "", "descriptions": ["Clicking this button will use the technique, automatically consuming any resources the technique uses. The technique will be sent to the DM and then targets may be selected."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Chat": {
				"name": "Title_Chat", "fieldName": "chat", "group": "Title", "description": "", "variable": "ttl-chat{0}", "title": "Chat", "subGroup": "", "descriptions": ["This is the chat post box system. Here you can write posts for your character to say and then send the messages to chat.", "To use the post box, first select the type of message you would like to send. You have access to all the standard emote messages of Speak, Whisper, Yell, Think, and Describe.", "You may then write what you wish to be included in your message in the large textarea below. Once your message is complete, you may press one of the emote buttons below to send your message. If you do not see any emote buttons, be sure to select an outfit first.", "If you would rather use the standard keyword system as used in the chat, you may also begin your chat message with !m, !w, and the like. The system will detect your tag and then change the emote message type accordingly."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_LanguageSelect": {
				"name": "Title_LanguageSelect", "fieldName": "languageselect", "group": "Title", "description": "", "variable": "ttl-languageselect{0}", "title": "Language Select", "subGroup": "", "descriptions": ["Select your language from the options below. This will change how your message is displayed in chat and also show what language you are using."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Emotes": {
				"name": "Title_Emotes", "fieldName": "emotes", "group": "Title", "description": "", "variable": "ttl-emotes{0}", "title": "Emotes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Outfits": {
				"name": "Title_Outfits", "fieldName": "outfits", "group": "Title", "description": "", "variable": "ttl-outfits{0}", "title": "Outfits", "subGroup": "", "descriptions": ["You can add in your character art from here to populate your character's emotes.", "Press the Plus (+) button below to add a new instance of an outfit. From there you can populate the outfit data with emotes."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TechEffect": {
				"name": "Title_TechEffect", "fieldName": "techeffect", "group": "Title", "description": "", "variable": "ttl-techeffect{0}", "title": "Effects", "subGroup": "", "descriptions": ["This contains the effects that will occur when this technique is used. There is no skill check necessary. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TechDC": {
				"name": "Title_TechDC", "fieldName": "techdc", "group": "Title", "description": "", "variable": "ttl-techdc{0}", "title": "DC ", "subGroup": "", "descriptions": ["Your skill check must meet or exceed this value for the following effects to occur. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TechDefense": {
				"name": "Title_TechDefense", "fieldName": "techdefense", "group": "Title", "description": "", "variable": "ttl-techdefense{0}", "title": "vs. ", "subGroup": "", "descriptions": ["Your skill check must meet or exceed the target's Defense value listed. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Type": {
				"name": "Chat_Type", "fieldName": "type", "group": "Chat", "description": "", "variable": "chat-type{0}", "title": "ChatType", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Target": {
				"name": "Chat_Target", "fieldName": "target", "group": "Chat", "description": "", "variable": "chat-target{0}", "title": "ChatTarget", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Message": {
				"name": "Chat_Message", "fieldName": "message", "group": "Chat", "description": "", "variable": "chat-message{0}", "title": "ChatMessage", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Language": {
				"name": "Chat_Language", "fieldName": "language", "group": "Chat", "description": "", "variable": "chat-language{0}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_LanguageTag": {
				"name": "Chat_LanguageTag", "fieldName": "languagetag", "group": "Chat", "description": "", "variable": "chat-languagetag{0}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_PostContent": {
				"name": "Chat_PostContent", "fieldName": "postcontent", "group": "Chat", "description": "", "variable": "chat-postcontent{0}", "title": "ChatContent", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"RepeatingActiveEmotes": {
				"name": "RepeatingActiveEmotes", "fieldName": "repeatingactiveemotes", "group": "Untyped", "description": "", "variable": "repeating_activeemotes", "title": "RepeatingActiveEmotes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_SetId": {
				"name": "Chat_SetId", "fieldName": "setid", "group": "Chat", "description": "", "variable": "chat-emoteset_id{0}", "title": "SetId", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Emotes": {
				"name": "Chat_Emotes", "fieldName": "emotes", "group": "Chat", "description": "", "variable": "chat-emoteset{0}", "title": "Emotes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_DefaultEmote": {
				"name": "Chat_DefaultEmote", "fieldName": "defaultemote", "group": "Chat", "description": "", "variable": "chat-default_emote{0}", "title": "DefaultEmote", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_PostName": {
				"name": "Chat_PostName", "fieldName": "postname", "group": "Chat", "description": "", "variable": "chat-post_name{0}", "title": "PostName", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_PostURL": {
				"name": "Chat_PostURL", "fieldName": "posturl", "group": "Chat", "description": "", "variable": "chat-post_url{0}", "title": "PostURL", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitName": {
				"name": "Chat_OutfitName", "fieldName": "outfitname", "group": "Chat", "description": "", "variable": "chat-outfit_name{0}", "title": "Outfit Name", "subGroup": "", "descriptions": ["This is the name of the outfit or emote set. Give it a name to differentiate it from other emote sets."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitEmotes": {
				"name": "Chat_OutfitEmotes", "fieldName": "outfitemotes", "group": "Chat", "description": "", "variable": "chat-outfit_emotes{0}", "title": "Outfit Emotes", "subGroup": "", "descriptions": ["This is a JSON file of the emote set. This is used to populate chat data. You can either replace the text here with data containing the emote set's data or you may fill in each emote individually below."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_EmoteName": {
				"name": "Chat_EmoteName", "fieldName": "emotename", "group": "Chat", "description": "", "variable": "chat-emote_name{0}", "title": "Emote Name", "subGroup": "", "descriptions": ["This is the name of an individual emote. This is what this emote will be referred to when selecting it from this character's available emotes."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_EmoteURL": {
				"name": "Chat_EmoteURL", "fieldName": "emoteurl", "group": "Chat", "description": "", "variable": "chat-emote_url{0}", "title": "Emote URL", "subGroup": "", "descriptions": ["This is a URL that references the emote's image. This is the image that will be shown when this emote is used."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"RepeatingOutfits": {
				"name": "RepeatingOutfits", "fieldName": "repeatingoutfits", "group": "Untyped", "description": "", "variable": "repeating_emotes", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitDefault": {
				"name": "Chat_OutfitDefault", "fieldName": "outfitdefault", "group": "Chat", "description": "", "variable": "chat-outfit_default_name{0}", "title": "Default Emote Name", "subGroup": "", "descriptions": ["This is the name of an individual emote. This is what this emote will be referred to when selecting it from this character's available emotes.", "The default emote name is the emote that will be shown whenever the character appears in various UIs where the character is not speaking."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitDefaultURL": {
				"name": "Chat_OutfitDefaultURL", "fieldName": "outfitdefaulturl", "group": "Chat", "description": "", "variable": "chat-outfit_default_url{0}", "title": "Default Emote URL", "subGroup": "", "descriptions": ["This is a URL that references the emote's image. This is the image that will be shown when this emote is used.", "The default emote url is the emote that will be shown whenever the character appears in various UIs where the character is not speaking."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Level": {
				"name": "Level", "fieldName": "level", "group": "Advancement", "description": "", "variable": "adv-level{0}", "title": "Character Level", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"CR": {
				"name": "CR", "fieldName": "cr", "group": "Advancement", "description": "", "variable": "adv-cr{0}", "title": "Character Rank", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level.", "Your Character rank begins at 1. \nAt 5th Level it increases to 2.\nAt 15th Level it increases to 3.\nAt 30th Level it increases to 4.\nAt 50th Level it increases to 5."],
				"abbreviation": "CR", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"XP": {
				"name": "XP", "fieldName": "xp", "group": "Advancement", "description": "", "variable": "adv-xp{0}", "title": "Experience", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "XP", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 30, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": true
			},
			"AdvancementJob": {
				"name": "AdvancementJob", "fieldName": "advancementjob", "group": "Advancement", "description": "", "variable": "adv-ap_job{0}", "title": "Job Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Job Points. These job points can be used to increase tier in a job. You must spend 2 advancement points to gain 1 job point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AdvancementSkill": {
				"name": "AdvancementSkill", "fieldName": "advancementskill", "group": "Advancement", "description": "", "variable": "adv-ap_skill{0}", "title": "Skill Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Skill Points. These skill points can be used to learn a new skill. You must spend 2 advancement points to gain 1 skill point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AdvancementTechnique": {
				"name": "AdvancementTechnique", "fieldName": "advancementtechnique", "group": "Advancement", "description": "", "variable": "adv-ap_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 advancement points to gain 1 technique point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier": {
				"name": "JobTier", "fieldName": "jobtier", "group": "Advancement", "description": "", "variable": "adv-jobtier{0}", "title": "Job Tier", "subGroup": "", "descriptions": ["Your job tier represents your skill in this job. Any tier above 0 allows you to choose this job as a set job style. Each tier will unlock the use of additional techniques as shown below.", "Your maximum job tier in any job is equal to your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTechniques": {
				"name": "JobTechniques", "fieldName": "jobtechniques", "group": "Advancement", "description": "", "variable": "adv-jobtechniques{0}", "title": "Job Techniques", "subGroup": "", "descriptions": ["These techniques are gained when reaching the listed tier in the job. These techniques often help you perform tasks related to your job."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LearnStyle": {
				"name": "LearnStyle", "fieldName": "learnstyle", "group": "Advancement", "description": "", "variable": "adv-learnstyle{0}", "title": "Learn Style", "subGroup": "", "descriptions": ["In order to learn techniques in a style, the style must first be learned. To learn this style, check the box to the left. This box may be disabled if you lack the requirements necessary to learn this style, as shown in the style's requirements.", "Learning a style always costs one Technique Point. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"StyleTechniques": {
				"name": "StyleTechniques", "fieldName": "styletechniques", "group": "Advancement", "description": "", "variable": "adv-styletechniques{0}", "title": "Technique Requirements", "subGroup": "", "descriptions": ["Most techniques require you to reach certain requirements to learn them. These requirements are listed here above a list of techniques that meet these restrictions. ", "To learn techniques in this category, check the box in the technique's entry. This checkbox may be disabled if you lack the requirements necessary to learn this technique."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"StyleFreeTechniques": {
				"name": "StyleFreeTechniques", "fieldName": "stylefreetechniques", "group": "Advancement", "description": "", "variable": "adv-stylefreetechniques{0}", "title": "Free Techniques", "subGroup": "", "descriptions": ["These techniques are automatically learned when this style is learned. You do not need to spend Technique Points to learn these techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"TrainingKnowledge": {
				"name": "TrainingKnowledge", "fieldName": "trainingknowledge", "group": "Training", "description": "", "variable": "trn-tp_knowledge{0}", "title": "Knowledge Points", "subGroup": "", "descriptions": ["You can spend training points to gain Knowledge Points. These knowledge points can be used to increase tier in a job. You must spend 1 training points to gain 1 knowledge point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"TrainingTechniques": {
				"name": "TrainingTechniques", "fieldName": "trainingtechniques", "group": "Training", "description": "", "variable": "trn-tp_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend training points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 training points to gain 1 technique point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PP": {
				"name": "PP", "fieldName": "pp", "group": "Training", "description": "", "variable": "trn-pp{0}", "title": "Progression", "subGroup": "", "descriptions": ["PP is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime at a rate of 1 per day. You may gain an additional PP if a character devotes an entire day to training. ", "Once a character reaches 60 TP, they may spend their PP to gain a new knowledge or technique."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 60, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_BOD": {
				"name": "Attr_BOD", "fieldName": "bod", "group": "Attribute", "description": "", "variable": "atr-bod{0}", "title": "Body", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "BOD", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_PRC": {
				"name": "Attr_PRC", "fieldName": "prc", "group": "Attribute", "description": "", "variable": "atr-prc{0}", "title": "Precision", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "PRC", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_QCK": {
				"name": "Attr_QCK", "fieldName": "qck", "group": "Attribute", "description": "", "variable": "atr-qck{0}", "title": "Quickness", "subGroup": "Attribute", "descriptions": ["Quickness is your reflexes and your ability to react quickly to situations. "],
				"abbreviation": "QCK", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_CNV": {
				"name": "Attr_CNV", "fieldName": "cnv", "group": "Attribute", "description": "", "variable": "atr-cnv{0}", "title": "Conviction", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "CNV", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_INT": {
				"name": "Attr_INT", "fieldName": "int", "group": "Attribute", "description": "", "variable": "atr-int{0}", "title": "Intuition ", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "INT", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_RSN": {
				"name": "Attr_RSN", "fieldName": "rsn", "group": "Attribute", "description": "", "variable": "atr-rsn{0}", "title": "Reason", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "RSN", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Brace": {
				"name": "Def_Brace", "fieldName": "brace", "group": "Defense", "description": "", "variable": "def-brace{0}", "title": "Brace", "subGroup": "Combat Defense", "descriptions": ["Brace is your ability to resist a physical force by holding strong and blocking. Many fast attacks and pushing effects are defended against by brace."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-brace_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-brace_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-brace_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Fortitude": {
				"name": "Def_Fortitude", "fieldName": "fortitude", "group": "Defense", "description": "", "variable": "def-fortitude{0}", "title": "Fortitude", "subGroup": "Defense", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-fortitude_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-fortitude_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Disruption": {
				"name": "Def_Disruption", "fieldName": "disruption", "group": "Defense", "description": "", "variable": "def-disruption{0}", "title": "Disruption", "subGroup": "Combat Defense", "descriptions": ["Disruption defense represents an attempt to disrupt an attack's impact. This can be done via parrying with a weapon or weakening the ether in a spell. This defense is reliable for large area attacks that cannot be braced against."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-disruption_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-disruption_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-disruption_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Hide": {
				"name": "Def_Hide", "fieldName": "hide", "group": "Defense", "description": "", "variable": "def-hide{0}", "title": "Hide", "subGroup": "Defense", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-hide_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-hide_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Reflex": {
				"name": "Def_Reflex", "fieldName": "reflex", "group": "Defense", "description": "", "variable": "def-reflex{0}", "title": "Reflex", "subGroup": "Combat Defense", "descriptions": ["Reflex is a quick maneuver to take a hit in a way that you can recover from. Slow attacks and situations that require you to get out of the way will target this defense."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-reflex_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-reflex_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-reflex_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Evasion": {
				"name": "Def_Evasion", "fieldName": "evasion", "group": "Defense", "description": "", "variable": "def-evasion{0}", "title": "Evasion", "subGroup": "Defense", "descriptions": ["Evasion is your ability to complete evade an attack. Some especially slow attacks can be evaded and will check against evasion."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 4, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-evasion_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-evasion_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-evasion_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Insight": {
				"name": "Def_Insight", "fieldName": "insight", "group": "Sense", "description": "", "variable": "sen-insight{0}", "title": "Insight", "subGroup": "Social Sense", "descriptions": ["Insight is your defense against emotional manipulation. It is commonly used as a defense against those that would try to request a task of you or those who wish to curry your favor."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-insight_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-insight_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Notice": {
				"name": "Def_Notice", "fieldName": "notice", "group": "Sense", "description": "", "variable": "sen-notice{0}", "title": "Notice", "subGroup": "Sense", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-notice_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-notice_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Guile": {
				"name": "Def_Guile", "fieldName": "guile", "group": "Sense", "description": "", "variable": "sen-guile{0}", "title": "Guile", "subGroup": "Social Sense", "descriptions": ["Guile is one's ability to conceal their own thoughts and feelings on a situation. It is used to defend against those that wish to understand your influences or manipulate your feelings on them."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-guile_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-guile_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Scrutiny": {
				"name": "Def_Scrutiny", "fieldName": "scrutiny", "group": "Sense", "description": "", "variable": "sen-scrutiny{0}", "title": "Scrutiny", "subGroup": "Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning or things out of sorts. It is often used in defense against another's attempts at lying, used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-scrutiny_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-scrutiny_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Resolve": {
				"name": "Def_Resolve", "fieldName": "resolve", "group": "Sense", "description": "", "variable": "sen-resolve{0}", "title": "Resolve", "subGroup": "Social Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. Attacks against your willpower tend to be defended against by your resolve."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-resolve_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-resolve_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Freewill": {
				"name": "Def_Freewill", "fieldName": "freewill", "group": "Sense", "description": "", "variable": "sen-freewill{0}", "title": "Freewill", "subGroup": "Sense", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 10, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-freewill_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-freewill_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"CombatDefense": {
				"name": "CombatDefense", "fieldName": "combatdefense", "group": "Special Defense", "description": "", "variable": "combat", "title": "Combat Defense", "subGroup": "Special Defense", "descriptions": ["Combat Defense is a character's ability to use all their defenses available to defend themselves in combat. This defense is equal to the highest defense between a character's Brace, Disruption, and Reflex defenses."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"SocialSense": {
				"name": "SocialSense", "fieldName": "socialsense", "group": "Special Defense", "description": "", "variable": "", "title": "Social Sense", "subGroup": "Special Defense", "descriptions": ["Social Sense is your ability to use all of your social senses at once to make a read on a situation. This sense is equal to the highest sese between your Insight, Scrutiny, and Resolve."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"WillBreak": {
				"name": "WillBreak", "fieldName": "willbreak", "group": "Result", "description": "", "variable": "", "title": "Will Break", "subGroup": "", "descriptions": ["When a character's Willpower depletes to zero they can suffer from a technique's will break. You can choose to not trigger a technique's will break. When a will break is triggered, the effects listed below occur to the target and then their Willpower restores to full."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"FullName": {
				"name": "FullName", "fieldName": "fullname", "group": "Origin", "description": "", "variable": "full_name", "title": "Full Name", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"DisplayName": {
				"name": "DisplayName", "fieldName": "displayname", "group": "Origin", "description": "", "variable": "display_name", "title": "Display Name", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Background": {
				"name": "Background", "fieldName": "background", "group": "Origin", "description": "", "variable": "background", "title": "Background", "subGroup": "", "descriptions": ["This is the background story of your character. Add any details on the character's past here."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Age": {
				"name": "Age", "fieldName": "age", "group": "Origin", "description": "", "variable": "age", "title": "Age", "subGroup": "", "descriptions": ["This represents how old the character is in years."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Gender": {
				"name": "Gender", "fieldName": "gender", "group": "Origin", "description": "", "variable": "gender", "title": "Gender", "subGroup": "", "descriptions": ["The gender the character identifies as."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Homeland": {
				"name": "Homeland", "fieldName": "homeland", "group": "Origin", "description": "", "variable": "homeland", "title": "Homeland", "subGroup": "", "descriptions": ["Where this character grew up. This will usually shape their perspectives in the world."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "group": "OriginStat", "description": "", "variable": "affinity{0}", "title": "Elemental Affinity", "subGroup": "", "descriptions": ["Characters that are able to cast spells have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity before they may be taken.", "Your chosen affinity grants weaknesses and resistances to certain elemental damage types."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateDefense": {
				"name": "InnateDefense", "fieldName": "innatedefense", "group": "OriginStat", "description": "", "variable": "innatefefense{0}", "title": "Innate Defense", "subGroup": "", "descriptions": ["You are especially proficient in a physical attribute when it comes to defending yourself. Check the Attributes page for more details on each of these attributes and what defenses they apply to.", "All defenses that key off of your chosen attribute gains a permanent +2 bonus. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateSense": {
				"name": "InnateSense", "fieldName": "innatesense", "group": "OriginStat", "description": "", "variable": "innatesense{0}", "title": "Innate Sense", "subGroup": "", "descriptions": ["You are especially proficient in a mental attribute when it comes to detecting attacks against you. Check the Attributes page for more details on each of these attributes and what defenses they apply to. ", "All senses that key off of your chosen attribute gains a permanent +2 bonus."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Boon": {
				"name": "Title_Boon", "fieldName": "boon", "group": "Title", "description": "", "variable": "ttl-boon{0}", "title": "Boons", "subGroup": "", "descriptions": ["Boons are resources that can be called upon in critical moments via powerful techniques. These boons are usually gained by performing acts of self care and motivation.", "Boons come in three different variations; Boons of Rest, nourishment, and inspiration. These three types of boons have different conditions when they become available. Once a boon is gained you cannot gain another boon of that type until that boon is spent or is expired. As such, you can at most have three boons available at a time. ", "When a technique requires that a boon is spent you may choose to spend any boon you currently have available. If none are available you cannot use the technique. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Boon_Rest": {
				"name": "Boon_Rest", "fieldName": "rest", "group": "Boon", "description": "", "variable": "boon-rest{0}", "title": "Boon of Rest", "subGroup": "", "descriptions": ["A boon representing restfulness. This boon is usually gained after finishing a night's rest with at least 6 hours of sleep. This boon is lost after 24 hours without sleep."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Boon_Nourishment": {
				"name": "Boon_Nourishment", "fieldName": "nourishment", "group": "Boon", "description": "", "variable": "boon-nourishment{0}", "title": "Boon of Nourishment", "subGroup": "", "descriptions": ["A boon for being well fed. This boon is usually gained not just by eating but rather after enjoying a satisfying, well-cooked meal. See the rules of cooking for more information. This boon is lost after 24 hours of not eating."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Boon_Inspiration": {
				"name": "Boon_Inspiration", "fieldName": "inspiration", "group": "Boon", "description": "", "variable": "boon-inspiration{0}", "title": "Boon of Inspiration", "subGroup": "", "descriptions": ["A boon for feelings of motivation. This boon is usually gained after performing significant acts that are based on the character's influences. A boon of inspiration is lost in times of extreme duress as determined by your GM."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"HP": {
				"name": "HP", "fieldName": "hp", "group": "General", "description": "", "variable": "gen-hp{0}", "title": "Hit Points", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "]
				,
				"abbreviation": "HP", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 10, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 10, "max": 0 },
					{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-hp_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-hp_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"WILL": {
				"name": "WILL", "fieldName": "will", "group": "General", "description": "", "variable": "gen-will{0}", "title": "Willpower", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 5, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 10, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-will_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"EN": {
				"name": "EN", "fieldName": "en", "group": "General", "description": "", "variable": "gen-en{0}", "title": "Energy", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": true
			},
			"Cmb_Chakra": {
				"name": "Cmb_Chakra", "fieldName": "chakra", "group": "Combat", "description": "", "variable": "cmb-chakra{0}", "title": "Chakra", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 2, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "group": "", "description": "", "variable": "", "title": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "group": "General", "description": "", "variable": "gen-initiative{0}", "title": "Initiative", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-initiative_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-initiative_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Recall": {
				"name": "Recall", "fieldName": "recall", "group": "General", "description": "", "variable": "gen-recall{0}", "title": "Recall", "subGroup": "", "descriptions": ["Recall is your ability to remember information learned in the past. It is used as a modifier when using Recall Knowledge to gain information. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-recall_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Power": {
				"name": "Power", "fieldName": "power", "group": "General", "description": "", "variable": "gen-power{0}", "title": "Power", "subGroup": "", "descriptions": ["Power is used as a potency bonus for some techniques reliant on physical force. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-power_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Accuracy": {
				"name": "Accuracy", "fieldName": "accuracy", "group": "General", "description": "", "variable": "gen-accuracy{0}", "title": "Accuracy", "subGroup": "", "descriptions": ["Accuracy is used as a potency bonus for some techniques reliant on precision. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-accuracy_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Spellforce": {
				"name": "Spellforce", "fieldName": "spellforce", "group": "General", "description": "", "variable": "gen-spellforce{0}", "title": "Spellforce", "subGroup": "", "descriptions": ["Spellforce is used as a potency bonus for some techniques reliant on how well ether is transformed. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-spellforce_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Charisma": {
				"name": "Charisma", "fieldName": "charisma", "group": "General", "description": "", "variable": "gen-charisma{0}", "title": "Charisma", "subGroup": "", "descriptions": ["Charisma is used as a potency bonus for some techniques reliant on communication. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-charisma_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carrying_capacity", "group": "General", "description": "", "variable": "gen-capacity{0}", "title": "Carrying Capacity", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 40, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 20, "max": 0 },
					{ "variableName": "gen-capacity_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_HV": {
				"name": "Cmb_HV", "fieldName": "hv", "group": "Combat", "description": "", "variable": "cmb-hv{0}", "title": "Heal Value", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from some healing abilities."],
				"abbreviation": "HV", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 5, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 4, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-hv_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-hv_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_Armor": {
				"name": "Cmb_Armor", "fieldName": "armor", "group": "Combat", "description": "", "variable": "cmb-armor{0}", "title": "Armor", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-armor_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-armor_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-armor_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Resistance": {
				"name": "Resistance", "fieldName": "resistance", "group": "Untyped", "description": "", "variable": "resistance", "title": "Resistance", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "_tech;_gear;_affinity", "formula": {
					"workers": [{ "variableName": "resistance", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "resistance", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "resistance", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_ResistanceDesc": {
				"name": "Cmb_ResistanceDesc", "fieldName": "resistancedesc", "group": "Combat", "description": "", "variable": "cmb-resistancedesc{0}", "title": "Resistance", "subGroup": "", "descriptions": ["Resistance reduces damage of specific damage types by a value equal to the resistance's type. The resistance calculation happens after armor is applied."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_WeaknessDesc": {
				"name": "Cmb_WeaknessDesc", "fieldName": "weaknessdesc", "group": "Combat", "description": "", "variable": "cmb-weaknessdesc{0}", "title": "Weakness", "subGroup": "", "descriptions": ["Weakness is the opposite of Resistance, increasing damage against you when hit by specific damage types by a value equal to the weakness' type. The weakness calculation happens after armor is applied."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_Vitality": {
				"name": "Cmb_Vitality", "fieldName": "vitality", "group": "Combat", "description": "", "variable": "cmb-vitality{0}", "title": "Vitality", "subGroup": "", "descriptions": ["Whenever a character is reduced to zero HP, their HP restores to full and they lose one vitality. If the character has no vitality to lose, they instead gain the Downed status. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-vitality_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"Cmb_Surge": {
				"name": "Cmb_Surge", "fieldName": "surge", "group": "Combat", "description": "", "variable": "cmb-surge{0}", "title": "Healing Surge", "subGroup": "", "descriptions": ["Healing Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 4, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-surge_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-surge_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"Cmb_Mv": {
				"name": "Cmb_Mv", "fieldName": "mv", "group": "Combat", "description": "", "variable": "cmb-movespeed{0}", "title": "Move Speed", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they take a standard move action. "],
				"abbreviation": "Mv", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-movespeed_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-movespeed_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_MvPotency": {
				"name": "Cmb_MvPotency", "fieldName": "mvpotency", "group": "Combat", "description": "", "variable": "cmb-movepotency{0}", "title": "Move Potency", "subGroup": "", "descriptions": ["Move Potency is sometimes used to determine the maximum number of spaces a character can use in a Dash or the total number of squares in a Max Dash. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 6, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-movepotency_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Dash": {
				"name": "Dash", "fieldName": "dash", "group": "Untyped", "description": "", "variable": "", "title": "Dash", "subGroup": "", "descriptions": ["A Dash is a check for movement. When you perform a Dash, roll a die value equal to your Move Potency. You may then move the number of spaces you rolled. If you roll below your Move Speed you instead move that many spaces. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"MaxDash": {
				"name": "MaxDash", "fieldName": "maxdash", "group": "Untyped", "description": "", "variable": "", "title": "Max Dash", "subGroup": "", "descriptions": ["A Max Dash allows you to move a number of spaces equal to your Move Potency. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Favor": {
				"name": "Soc_Favor", "fieldName": "favor", "group": "Social", "description": "", "variable": "soc-favor{0}", "title": "Favor", "subGroup": "", "descriptions": ["Favor is how much your social opponent(s) are being likeable to you. Favor can be leveraged by opponents to create a more favorable decision for them. ", "When favor is used for an influence check, you add the target's favor value (capped to half of the persuade DC) to your persuasion check."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 30, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": true
			},
			"RepeatingInfluences": {
				"name": "RepeatingInfluences", "fieldName": "repeatinginfluences", "group": "Untyped", "description": "", "variable": "repeating_influences", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Influence": {
				"name": "Soc_Influence", "fieldName": "influence", "group": "Social", "description": "", "variable": "soc-influence{0}", "title": "Influence", "subGroup": "", "descriptions": ["Influences are the ideas, goals, and feelings of a character. These influences come through life in various ways from new relationships, opinions, and knowledge. Influence is used to help determine what kind of arguments will affect your character.", "An influence is usually written as a one line description of an idea or relationship the character has. An influence is always something of some importance to the character. A character should never have an influence they don't care about, otherwise it's not an influence on their character.", "Influences tend to fit into one of four categories:", "Traits: These are the personality traits of a character. They often define small but significant aspects of a character's personality. (\"Is always the most level headed person in the room\", \"Quick to flirt with anyone attractive\", \"Duty before fun\")", "Ideals: These are the beliefs and drives of a character. These are typically strong feelings the character maintains and will often change how a character reacts in a situation. (\"No one can tell me what to do\", \"Traditions from my home must always be maintained\")", "Bonds: These are the people a character has connections with. They are most often characters you care about but can also be represented by a group. (\"My spouse\", \"My guildmates\")", "Goals: These are the objectives the character wishes to fulfil. They are often concrete and related to a specific task in the near future. (\"I must free the hostages\", \"I want to kill all the rats in the basement\")", "Most characters will begin play with at least one Trait, Ideal, and Bond. A character can gain or lose influences as their story progresses. This is most often with goals as a character's goals change and fluctuate as they receive information, but is not limited to the other types."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InfluenceTrait": {
				"name": "InfluenceTrait", "fieldName": "influencetrait", "group": "InfluenceType", "description": "", "variable": "trait", "title": "Trait", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InfluenceIdeal": {
				"name": "InfluenceIdeal", "fieldName": "influenceideal", "group": "InfluenceType", "description": "", "variable": "ideal", "title": "Ideal", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InfluenceBond": {
				"name": "InfluenceBond", "fieldName": "influencebond", "group": "InfluenceType", "description": "", "variable": "bond", "title": "Bond", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InfluenceGoal": {
				"name": "InfluenceGoal", "fieldName": "influencegoal", "group": "InfluenceType", "description": "", "variable": "goal", "title": "Goal", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Severity": {
				"name": "Soc_Severity", "fieldName": "severity", "group": "Social", "description": "", "variable": "soc-severity{0}", "title": "Severity", "subGroup": "", "descriptions": ["All Influences are given a severity associated with them. This represents how much of an effect the specific influence has on the character. These severities are Low, Moderate, and High.", "When a character attempts a persuade check, their check is modified by any influences the target has that are relevant to the persuasion. An influence in support of the persuasion will add its severity as a bonus to the check. Likewise, an influence that is opposing to a persuasion with add its severity as a penalty.", "Only the most supportive influence and most opposing influence may affect any one persuasion roll."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Svr_LowSeverity": {
				"name": "Svr_LowSeverity", "fieldName": "lowseverity", "group": "SeverityRank", "description": "", "variable": "sev-low{0}", "title": "Low", "subGroup": "", "descriptions": ["A low severity influence is usually notable in the short term and not important to who that character is. These influences can be long term goals but are also often fleeting desires from the moment they are formed. ", "These influences grant 1 advantage or disadvantage on social checks that leverage the influence. They also add or remove 1d6 to an associated persuade check. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Svr_ModerateSeverity": {
				"name": "Svr_ModerateSeverity", "fieldName": "moderateseverity", "group": "SeverityRank", "description": "", "variable": "sev-moderate{0}", "title": "Moderate", "subGroup": "", "descriptions": ["A moderate severity influence are typically formed long term and have a hold on the character's convictions and desires. These influences can sway decisions even when tangentially related to a situation. Moderate influences often dicate how the character lives their daily lives. These influences can usually be leveraged to persuade a character to work outside of their self interest and stick their neck out for a greater cause.", "These influences grant 2 advantages or disadvantages on social checks that leverage the influence. They also add or remove 1d6+5 to an associated persuade check. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Svr_HighSeverity": {
				"name": "Svr_HighSeverity", "fieldName": "highseverity", "group": "SeverityRank", "description": "", "variable": "sev-high{0}", "title": "High", "subGroup": "", "descriptions": ["High severity influences are the most important beliefs, relationships, and goals of a character. These define who they are as a person, often guiding their behavior in all aspects of their lives. They can persuade a character to take great action that may even alter their own lives.", "These influences grant 3 advantages or disadvantages on social checks that leverage the influence. They also add or remove 1d6+10 to an associated persuade check."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_PersuadeCheck": {
				"name": "Soc_PersuadeCheck", "fieldName": "persuadecheck", "group": "Social", "description": "", "variable": "soc-persuadecheck{0}", "title": "Persuade Check", "subGroup": "", "descriptions": ["A persuade check is performed when a character attempts to persuade another. When making a persuade check a character must first make a request of the target. The nature of the request will set the difficulty class (DC) of the persuade check. Most persuade checks will require that you roll some dice and add relevant modifiers such as rapport or pressure. Finally you will always add any relevant influence modifiers to the check.", "Usually some kind of influence is required over the target in order to convince them to do anything more complicated than a simple request. Most of the DCs for more complicated requests require the bonuses granted from a supporting influence."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_PersuadeRequest": {
				"name": "Soc_PersuadeRequest", "fieldName": "persuaderequest", "group": "Social", "description": "", "variable": "soc-persuaderequest{0}", "title": "Persuade Requests", "subGroup": "", "descriptions": ["A persuade check is always performed with a request to be made of the target. This usually comes in the form of a task. The nature of the task will determine the DC of the persuade check.", "Simple Tasks - DC 15. These are tasks a character could perform without a lot of effort or risk on their part. Examples include offering information, gaining access to a relatively insecure location, or being given an insignificant amount of coin or dust.", "Inconvenient Tasks - DC 30. These tasks pose some kind of non-physical hindrance to the character. These may minorly impact their social lives or cause them to anger an authority without seriously disrupting their lives. Persuading a character to offer information that may be difficult to trace back to the character or getting them to ask another for a favor are some examples of this task.", "Disruptive Tasks - DC 40. These are tasks that are risky to the character. These tasks can delve into possible physical harm such as guarding a location that isn't currently hostile. These requests can also involve the performance of crime or subterfuge, as long as the character believes the risks are not grave enough to lead to imprisonment or ostracization.", "Serious Tasks - DC 50. These tasks can cause serious harm to a character. These can be physical in nature such as a task to actively engage in battle. They can also be societal such as performing a crime that could face imprisonment. These tasks should not appear to be out of the skillset of the character but should obviously provide serious risk to their person.", "Life-Changing Tasks - DC 60. These tasks are daunting and require great will to be convinced of performing. These tasks can motivate a character to risk death or a complete change in their place in society. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Patience": {
				"name": "Soc_Patience", "fieldName": "patience", "group": "Social", "description": "", "variable": "soc-patience{0}", "title": "Patience", "subGroup": "", "descriptions": ["Patience is a measure of how much a character will tolerate another's attempts at socializing before removing themselves.", "This value is unique to NPCs and is adjusted based on a character's hostility towards the party and conviction towards their stance in the argument. Having any patience at all implies the character can be convinced to change their opinion. If a character will not change their stance, their patience should be 0.", "Some guidelines for setting patience.", "3-5. Reserved for hostile characters or those that are unlikely to budge from their opinion.", "6-10. Characters that can be persuaded but with some difficulty. One will need to be efficient and effective with their techniques to persuade this person.", "11-20. These characters are willing to hear an argument but will not tolerate stalling. ", "21+ These characters are willing to hear every point made and are unlikely to end a social conflict by running out of patience.", "When a character's patience runs out, that character is no longer willing to participate in a social conflict and can no longer be persuaded. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 10, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Burn": {
				"name": "Dmg_Burn", "fieldName": "burn", "group": "DamageType", "description": "", "variable": "dmg-burn{0}", "title": "Burn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Cold": {
				"name": "Dmg_Cold", "fieldName": "cold", "group": "DamageType", "description": "", "variable": "dmg-cold{0}", "title": "Cold", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Energy": {
				"name": "Dmg_Energy", "fieldName": "energy", "group": "DamageType", "description": "", "variable": "dmg-energy{0}", "title": "Energy", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Fire": {
				"name": "Dmg_Fire", "fieldName": "fire", "group": "DamageType", "description": "", "variable": "dmg-fire{0}", "title": "Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Force": {
				"name": "Dmg_Force", "fieldName": "force", "group": "DamageType", "description": "", "variable": "dmg-force{0}", "title": "Force", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Patience": {
				"name": "Dmg_Patience", "fieldName": "patience", "group": "DamageType", "description": "", "variable": "dmg-patience{0}", "title": "Patience", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Piercing": {
				"name": "Dmg_Piercing", "fieldName": "piercing", "group": "DamageType", "description": "", "variable": "dmg-piercing{0}", "title": "Piercing", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Shock": {
				"name": "Dmg_Shock", "fieldName": "shock", "group": "DamageType", "description": "", "variable": "dmg-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Tension": {
				"name": "Dmg_Tension", "fieldName": "tension", "group": "DamageType", "description": "", "variable": "dmg-tension{0}", "title": "Tension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "group": "Trait", "description": "", "variable": "trt-accurate{0}", "title": "Accurate", "subGroup": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "group": "Trait", "description": "", "variable": "trt-affinity{0}", "title": "Affinity", "subGroup": "Technique Trait", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "group": "Trait", "description": "", "variable": "trt-affinity+{0}", "title": "Affinity+", "subGroup": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "ap", "group": "Trait", "description": "", "variable": "trt-ap{0}", "title": "AP:X", "subGroup": "Technique Trait", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "group": "Trait", "description": "", "variable": "trt-brutal{0}", "title": "Brutal", "subGroup": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Evadible": {
				"name": "Trait_Evadible", "fieldName": "evadible", "group": "Trait", "description": "", "variable": "trt-evadible{0}", "title": "Evadible", "subGroup": "Technique Trait", "descriptions": ["When making a check against a target, compare your check results against the target's evasion. On failure, none of the technique's effects take effect. A target may always choose to not evade a technique. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "group": "Trait", "description": "", "variable": "trt-focus{0}", "title": "Focus", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "group": "Trait", "description": "", "variable": "trt-focus+{0}", "title": "Focus+", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "group": "Trait", "description": "", "variable": "trt-material{0}", "title": "Material", "subGroup": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "group": "Trait", "description": "", "variable": "trt-simple{0}", "title": "Simple", "subGroup": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "group": "Trait", "description": "", "variable": "trt-volatile{0}", "title": "Volatile", "subGroup": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "group": "Trait", "description": "", "variable": "trt-vortex{0}", "title": "Vortex", "subGroup": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "group": "Trait", "description": "", "variable": "trt-weapon{0}", "title": "Weapon", "subGroup": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "group": "Trait", "description": "", "variable": "trt-wall{0}", "title": "Wall", "subGroup": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "group": "Trait", "description": "", "variable": "trt-arcing{0}", "title": "Arcing", "subGroup": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "group": "Trait", "description": "", "variable": "trt-shield{0}", "title": "Shield", "subGroup": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "group": "Trait", "description": "", "variable": "trt-thrown{0}", "title": "Thrown", "subGroup": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-handed", "group": "Trait", "description": "", "variable": "trt-two-handed{0}", "title": "Two-Handed", "subGroup": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "group": "Trait", "description": "", "variable": "trt-loud{0}", "title": "Loud", "subGroup": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Light": {
				"name": "Trait_Light", "fieldName": "light", "group": "Trait", "description": "", "variable": "trt-light{0}", "title": "Light", "subGroup": "Item Trait", "descriptions": ["A light item is 10 lbs or less and can easily be moved with one hand."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "group": "Trait", "description": "", "variable": "trt-sharp{0}", "title": "Sharp", "subGroup": "Item Trait", "descriptions": ["Sharp items have a bladed edge and are durable enough to cut through soft material."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "group": "Trait", "description": "", "variable": "trt-sturdy{0}", "title": "Sturdy", "subGroup": "Item Trait", "descriptions": ["Sturdy items are especially durable and resilient."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "group": "Trait", "description": "", "variable": "trt-flammable{0}", "title": "Flammable", "subGroup": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "group": "Trait", "description": "", "variable": "trt-flexible{0}", "title": "Flexible", "subGroup": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "group": "Trait", "description": "", "variable": "trt-frozen{0}", "title": "Frozen", "subGroup": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "group": "Trait", "description": "", "variable": "trt-transparent{0}", "title": "Transparent", "subGroup": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Style_Basic Action": {
				"name": "Style_Basic Action", "fieldName": "style_basic_action", "group": "Style", "description": "", "variable": "sty-basic_action{0}", "title": "Basic Action", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Attack": {
				"name": "Style_Basic Attack", "fieldName": "style_basic_attack", "group": "Style", "description": "", "variable": "sty-basic_attack{0}", "title": "Basic Attack", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Activity": {
				"name": "Style_Basic Activity", "fieldName": "style_basic_activity", "group": "Style", "description": "", "variable": "sty-basic_activity{0}", "title": "Basic Activity", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Social": {
				"name": "Style_Basic Social", "fieldName": "style_basic_social", "group": "Style", "description": "", "variable": "sty-basic_social{0}", "title": "Basic Social", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Support": {
				"name": "Style_Basic Support", "fieldName": "style_basic_support", "group": "Style", "description": "", "variable": "sty-basic_support{0}", "title": "Basic Support", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Charm Unrestrained": {
				"name": "Style_Charm Unrestrained", "fieldName": "style_charm_unrestrained", "group": "Style", "description": "", "variable": "sty-charm_unrestrained{0}", "title": "Charm Unrestrained", "subGroup": "Standard", "descriptions": ["Your charm has an unperceptable control over others. Using this skill, you manipulate others to your whims, beguiling them for your desires."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Inspiring Presence": {
				"name": "Style_Inspiring Presence", "fieldName": "style_inspiring_presence", "group": "Style", "description": "", "variable": "sty-inspiring_presence{0}", "title": "Inspiring Presence", "subGroup": "Standard", "descriptions": ["Your words inspire greatness in others and can move people to take action. This style motivates allies out of bad situations and allows one to gain favor quickly through unmatched enthusiasm."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Deft Negotiator": {
				"name": "Style_Deft Negotiator", "fieldName": "style_deft_negotiator", "group": "Style", "description": "", "variable": "sty-deft_negotiator{0}", "title": "Deft Negotiator", "subGroup": "Standard", "descriptions": ["You are well versed in diplomacy and use it to put pressure on others. Using your skills, you can break their will to gain their trust and quickly bring them to the correct decision."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Abrasive Wit": {
				"name": "Style_Abrasive Wit", "fieldName": "style_abrasive_wit", "group": "Style", "description": "", "variable": "sty-abrasive_wit{0}", "title": "Abrasive Wit", "subGroup": "Standard", "descriptions": ["Manipulators rub you the wrong way, especially if they try to use their charms on your or your friends. You use your tongue to stave them off and taunt them into giving up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Tyrannical Voice": {
				"name": "Style_Tyrannical Voice", "fieldName": "style_tyrannical_voice", "group": "Style", "description": "", "variable": "sty-tyrannical_voice{0}", "title": "Tyrannical Voice", "subGroup": "Standard", "descriptions": ["Fear exists everywhere and you will use it to control others. You frighten others into submitting themselves to your demands and if that doesn't work, anger can do just as well."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Calming Empathy": {
				"name": "Style_Calming Empathy", "fieldName": "style_calming_empathy", "group": "Style", "description": "", "variable": "sty-calming_empathy{0}", "title": "Calming Empathy", "subGroup": "Standard", "descriptions": ["You are calm, cool, and meditative. Its hard to attack your willpower with your tranquil aura. This tranquility even bleeds to others as they find it easy to confide with you."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "group": "Skill", "description": "", "variable": "skl-acrobatics{0}", "title": "Acrobatics", "subGroup": "Active Skill", "descriptions": ["Acrobatics is an active skill used in feats of balance and quick motion. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-acrobatics_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Alchemy": {
				"name": "Skill_Alchemy", "fieldName": "alchemy", "group": "Skill", "description": "", "variable": "skl-alchemy{0}", "title": "Alchemy", "subGroup": "Technical Skill", "descriptions": ["Alchemy is a technical skill used when making alchemical creations. These creations typically take the form of medicines, poisons, salves, oils, and other consumable crafts."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-alchemy_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "group": "Skill", "description": "", "variable": "skl-analyze{0}", "title": "Analyze", "subGroup": "Technical Skill", "descriptions": ["Analyze is a technical skill used when information must be parsed quickly and efficiently. This skill is often used to find hidden clues that would not be in plain sight. It is also used whenever one wishes to quickly learn about a subject written in text or requires one to reason through a problem. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-analyze_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "group": "Skill", "description": "", "variable": "skl-build{0}", "title": "Build", "subGroup": "Active Skill", "descriptions": ["Build is an active skill used whenever you are creating an object. This skill is used both when you wish to create through the use of tools or creating through magic by manipulating dust or ether."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-build_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "group": "Skill", "description": "", "variable": "skl-channel{0}", "title": "Channel", "subGroup": "Active Skill", "descriptions": ["Channel is an active skill for maintaining concentration on maintaining volatile ether. This skill will often be a base for magical effects that linger but are impermanent such as lingering flames, winds, or other elements."]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-channel_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "group": "Skill", "description": "", "variable": "skl-charm{0}", "title": "Charm", "subGroup": "Social Skill", "descriptions": ["Charm is a social skill used when attempting to meet another emotionally. This can be done through empathy, support, romance, and allure. Charm is used both for persuasion and deception, as long as the attempt is meant to appeal emotionally. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-charm_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "group": "Skill", "description": "", "variable": "skl-cook{0}", "title": "Cook", "subGroup": "Technical Skill", "descriptions": ["Cook is a technical skill used when dealing with ingredients to be used for consumption and nutrition. This skill is not only used for traditional cooking but anytime food is prepared such as creating beverages. Food is an important resource to survive and keep spirits high. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-cook_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Demoralize": {
				"name": "Skill_Demoralize", "fieldName": "demoralize", "group": "Skill", "description": "", "variable": "skl-demoralize{0}", "title": "Demoralize", "subGroup": "Social Skill", "descriptions": ["Demoralize is a social skill associated with negativity and intimidating behaviour. Techniques that key off this skill usually attack willpower and invoke many negative emotions to control others' behaviour. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-demoralize_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "group": "Skill", "description": "", "variable": "skl-empathy{0}", "title": "Empathy", "subGroup": "Social Skill", "descriptions": ["Empathy is a social skill used to actively detect another's emotional state. Empathy will often be used to sense another's convictions and influences. It can also see use when seeing through emotional deception. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-empathy_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "group": "Skill", "description": "", "variable": "skl-enchant{0}", "title": "Enchant", "subGroup": "Active Skill", "descriptions": ["Enchant is an active skill that gathers ki from the body and concentrates it to a single point. This is most often used to heal wounds or create temporary enhancements to one's own body or another's. Sometimes Enchant is used to surround an object with one's own ki to provide unique effects. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-enchant_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "group": "Skill", "description": "", "variable": "skl-finesse{0}", "title": "Finesse", "subGroup": "Active Skill", "descriptions": ["Finesse is an active skill used for feats of dexterity and reflex. This skill is most commonly used as an attacking skill with weapon techniques that rely on a combination of speed and precision. This skill will also find use whenever a technique requires swift or reflexive action. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-finesse_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Inspire": {
				"name": "Skill_Inspire", "fieldName": "inspire", "group": "Skill", "description": "", "variable": "skl-inspire{0}", "title": "Inspire", "subGroup": "Social Skill", "descriptions": ["Inspire is a social skill used to evoke feelings of hope and to counter dispair. Inspire is used when motivating action. Techniques that use inspire often provide emotional boosts and bolster willpower. Inspire is also often used in persuasion attempts to convince another to help. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-inspire_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "group": "Skill", "description": "", "variable": "skl-might{0}", "title": "Might", "subGroup": "Active Skill", "descriptions": ["Might is an active skill about using strength to force your way through. This skill is frequently used in weapon techniques with a focus on heavy swings and feats of power. It also comes into play when a technique requires raw might such as shoving and lifting. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-might_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "group": "Skill", "description": "", "variable": "skl-pilot{0}", "title": "Pilot", "subGroup": "Technical Skill", "descriptions": ["Pilot is an active skill used to maneuver vehicles and machinery. Most complicated machinery will require a pilot check to utilize the device any many techniques with pilot allow you to perform complicated maneuvers with pilot."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-pilot_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Rationalize": {
				"name": "Skill_Rationalize", "fieldName": "rationalize", "group": "Skill", "description": "", "variable": "skl-rationalize{0}", "title": "Rationalize", "subGroup": "Social Skill", "descriptions": ["Rationalize is a social skill used when persuading another through reason and logic. Rationalize is usually a tool for negotiation when appealing to a logical mindset such as when pragmatism is necessary. It can also be used to deceive using misinformation and selling it as truth."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-rationalize_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "group": "Skill", "description": "", "variable": "skl-resonance{0}", "title": "Resonance", "subGroup": "Technical Skill", "descriptions": ["Resonance is a technical skill used to detect the presence of ether. This can be used to detect density of ether in an area but also can be used to determine if a material was made through ether. Complicated techniques can rely on resonance to remove the ether completely."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-resonance_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "group": "Skill", "description": "", "variable": "skl-search{0}", "title": "Search", "subGroup": "Technical Skill", "descriptions": ["Search is a technical skill used to find the hidden and anything that can be found with one's senses. Usually this is used to find characters hiding but can also be used to find hidden objects."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-search_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "group": "Skill", "description": "", "variable": "skl-shoot{0}", "title": "Shoot", "subGroup": "Active Skill", "descriptions": ["Shoot is an active skill focused on aiming at targets at a distance. It's commonly used with ranged weapon techniques and ranged spells. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-shoot_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "group": "Skill", "description": "", "variable": "skl-skirmish{0}", "title": "Skirmish", "subGroup": "Active Skill", "descriptions": ["Skirmish is an active skill for striking characters with melee attacks. It is exclusively an attacking skill for techniques that benefit from precise strikes to maximize effectiveness. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-skirmish_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "group": "Skill", "description": "", "variable": "skl-sneak{0}", "title": "Sneak", "subGroup": "Active Skill", "descriptions": ["Sneak is an active skill to conceal your presence. This will often be used to keep yourself hidden while performing other actions such as quick movement or stealthy attacks."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-sneak_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "group": "Skill", "description": "", "variable": "skl-throw{0}", "title": "Throw", "subGroup": "Active Skill", "descriptions": ["Throw is an active skill that allows one to throw objects accurately and far. This can be used to throw objects but also whenever a spell requires one to toss or lob an effect."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-throw_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "group": "Skill", "description": "", "variable": "skl-tinker{0}", "title": "Tinker", "subGroup": "Technical Skill", "descriptions": ["Tinker is a technical skill that allows one to create and manipulate machinery and technology. This skill can be used to disarm traps and locks. Otherwise, this will also be used when constructing complicated technology that require gears, pulleys, or other devices that require moving parts."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-tinker_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "group": "Skill", "description": "", "variable": "skl-traversal{0}", "title": "Traversal", "subGroup": "Active Skill", "descriptions": ["Traversal is an active skill that governs a character's movement. This can be used to do complex acts of climbing, running, swimming, or even flying."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-traversal_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Warding": {
				"name": "Skill_Warding", "fieldName": "warding", "group": "Skill", "description": "", "variable": "skl-warding{0}", "title": "Warding", "subGroup": "Active Skill", "descriptions": ["Warding is an active skill for creating defensive magical effects that manipulate ether directly. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-warding_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lang_Minere": {
				"name": "Lang_Minere", "fieldName": "lang_minere", "group": "Language", "description": "", "variable": "lng-minere{0}", "title": "Minere", "subGroup": "Walthair", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Junal": {
				"name": "Lang_Junal", "fieldName": "lang_junal", "group": "Language", "description": "", "variable": "lng-junal{0}", "title": "Junal", "subGroup": "Aridsha", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Apollen": {
				"name": "Lang_Apollen", "fieldName": "lang_apollen", "group": "Language", "description": "", "variable": "lng-apollen{0}", "title": "Apollen", "subGroup": "Khem", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Lib": {
				"name": "Lang_Lib", "fieldName": "lang_lib", "group": "Language", "description": "", "variable": "lng-lib{0}", "title": "Lib", "subGroup": "Colswei", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Cert": {
				"name": "Lang_Cert", "fieldName": "lang_cert", "group": "Language", "description": "", "variable": "lng-cert{0}", "title": "Cert", "subGroup": "Ceres", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Byric": {
				"name": "Lang_Byric", "fieldName": "lang_byric", "group": "Language", "description": "", "variable": "lng-byric{0}", "title": "Byric", "subGroup": "Aridsha", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Baryan Ascent"
			},
			"Lang_Dustell": {
				"name": "Lang_Dustell", "fieldName": "lang_dustell", "group": "Language", "description": "", "variable": "lng-dustell{0}", "title": "Dustell", "subGroup": "Aridsha", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Aridsha"
			},
			"Lang_Muralic": {
				"name": "Lang_Muralic", "fieldName": "lang_muralic", "group": "Language", "description": "", "variable": "lng-muralic{0}", "title": "Muralic", "subGroup": "Aridsha", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Aridsha"
			},
			"Lang_Shira": {
				"name": "Lang_Shira", "fieldName": "lang_shira", "group": "Language", "description": "", "variable": "lng-shira{0}", "title": "Shira", "subGroup": "Aridsha", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Ciel": {
				"name": "Lang_Ciel", "fieldName": "lang_ciel", "group": "Language", "description": "", "variable": "lng-ciel{0}", "title": "Ciel", "subGroup": "Ceres", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Capitol"
			},
			"Lang_Citeq": {
				"name": "Lang_Citeq", "fieldName": "lang_citeq", "group": "Language", "description": "", "variable": "lng-citeq{0}", "title": "Citeq", "subGroup": "Ceres", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "South West Ceres"
			},
			"Lang_Manstan": {
				"name": "Lang_Manstan", "fieldName": "lang_manstan", "group": "Language", "description": "", "variable": "lng-manstan{0}", "title": "Manstan", "subGroup": "Ceres", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Southern Ceres"
			},
			"Lang_Salkan": {
				"name": "Lang_Salkan", "fieldName": "lang_salkan", "group": "Language", "description": "", "variable": "lng-salkan{0}", "title": "Salkan", "subGroup": "Ceres", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "North West Ceres"
			},
			"Lang_Sansic": {
				"name": "Lang_Sansic", "fieldName": "lang_sansic", "group": "Language", "description": "", "variable": "lng-sansic{0}", "title": "Sansic", "subGroup": "Ceres", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Eastern Ceres"
			},
			"Lang_Silq": {
				"name": "Lang_Silq", "fieldName": "lang_silq", "group": "Language", "description": "", "variable": "lng-silq{0}", "title": "Silq", "subGroup": "Ceres", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Western Ceres"
			},
			"Lang_Kleikan": {
				"name": "Lang_Kleikan", "fieldName": "lang_kleikan", "group": "Language", "description": "", "variable": "lng-kleikan{0}", "title": "Kleikan", "subGroup": "Khem", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Klef"
			},
			"Lang_Crinere": {
				"name": "Lang_Crinere", "fieldName": "lang_crinere", "group": "Language", "description": "", "variable": "lng-crinere{0}", "title": "Crinere", "subGroup": "Walthair", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Palmic": {
				"name": "Lang_Palmic", "fieldName": "lang_palmic", "group": "Language", "description": "", "variable": "lng-palmic{0}", "title": "Palmic", "subGroup": "Walthair", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Tropical Seas"
			},
			"Lang_Shorespeak": {
				"name": "Lang_Shorespeak", "fieldName": "lang_shorespeak", "group": "Language", "description": "", "variable": "lng-shorespeak{0}", "title": "Shorespeak", "subGroup": "Walthair", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "East Sea"
			},
			"Lang_Verdeni": {
				"name": "Lang_Verdeni", "fieldName": "lang_verdeni", "group": "Language", "description": "", "variable": "lng-verdeni{0}", "title": "Verdeni", "subGroup": "Walthair", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Verdant Key"
			},
			"Lang_Vulca": {
				"name": "Lang_Vulca", "fieldName": "lang_vulca", "group": "Language", "description": "", "variable": "lng-vulca{0}", "title": "Vulca", "subGroup": "Walthair", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Emotion": {
				"name": "Lang_Emotion", "fieldName": "lang_emotion", "group": "Language", "description": "", "variable": "lng-emotion{0}", "title": "Emotion", "subGroup": "Special", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Spirit"
			},
			"Lang_Empathy": {
				"name": "Lang_Empathy", "fieldName": "lang_empathy", "group": "Language", "description": "", "variable": "lng-empathy{0}", "title": "Empathy", "subGroup": "Special", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient Spirit"
			},
			"Lang_Wolfwarg": {
				"name": "Lang_Wolfwarg", "fieldName": "lang_wolfwarg", "group": "Language", "description": "", "variable": "lng-wolfwarg{0}", "title": "Wolfwarg", "subGroup": "Special", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Cesplangrah"
			},
			"Lang_Jovean": {
				"name": "Lang_Jovean", "fieldName": "lang_jovean", "group": "Language", "description": "", "variable": "lng-jovean{0}", "title": "Jovean", "subGroup": "Special", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Mytikan": {
				"name": "Lang_Mytikan", "fieldName": "lang_mytikan", "group": "Language", "description": "", "variable": "lng-mytikan{0}", "title": "Mytikan", "subGroup": "Special", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"LoreCat_Academics": {
				"name": "LoreCat_Academics", "fieldName": "academics", "group": "LoreCategory", "description": "", "variable": "lrc-academics{0}", "title": "Academics", "subGroup": "Academics", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-academics_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "group": "Lore", "description": "", "variable": "lor-health{0}", "title": "Health", "subGroup": "Academics", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-health_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "group": "Lore", "description": "", "variable": "lor-mana{0}", "title": "Mana", "subGroup": "Academics", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mana_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "group": "Lore", "description": "", "variable": "lor-mathematics{0}", "title": "Mathematics", "subGroup": "Academics", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mathematics_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "group": "Lore", "description": "", "variable": "lor-nature{0}", "title": "Nature", "subGroup": "Academics", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-nature_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "group": "Lore", "description": "", "variable": "lor-school{0}", "title": "School", "subGroup": "Academics", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-school_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "group": "Lore", "description": "", "variable": "lor-spirit{0}", "title": "Spirit", "subGroup": "Academics", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-spirit_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "group": "Lore", "description": "", "variable": "lor-warfare{0}", "title": "Warfare", "subGroup": "Academics", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-warfare_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "group": "Lore", "description": "", "variable": "lor-zoology{0}", "title": "Zoology", "subGroup": "Academics", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-zoology_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Profession": {
				"name": "LoreCat_Profession", "fieldName": "profession", "group": "LoreCategory", "description": "", "variable": "lrc-profession{0}", "title": "Profession", "subGroup": "Profession", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-profession_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "group": "Lore", "description": "", "variable": "lor-farming{0}", "title": "Farming", "subGroup": "Profession", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-farming_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "group": "Lore", "description": "", "variable": "lor-fishing{0}", "title": "Fishing", "subGroup": "Profession", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-fishing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "group": "Lore", "description": "", "variable": "lor-hunting{0}", "title": "Hunting", "subGroup": "Profession", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-hunting_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "group": "Lore", "description": "", "variable": "lor-legal{0}", "title": "Legal", "subGroup": "Profession", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-legal_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "group": "Lore", "description": "", "variable": "lor-mercantile{0}", "title": "Mercantile", "subGroup": "Profession", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mercantile_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "group": "Lore", "description": "", "variable": "lor-mining{0}", "title": "Mining", "subGroup": "Profession", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mining_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Craftmanship": {
				"name": "LoreCat_Craftmanship", "fieldName": "craftmanship", "group": "LoreCategory", "description": "", "variable": "lrc-craftmanship{0}", "title": "Craftmanship", "subGroup": "Craftmanship", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-craftmanship_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "group": "Lore", "description": "", "variable": "lor-alchemy{0}", "title": "Alchemy", "subGroup": "Craftmanship", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-alchemy_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "group": "Lore", "description": "", "variable": "lor-architecture{0}", "title": "Architecture", "subGroup": "Craftmanship", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-architecture_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "group": "Lore", "description": "", "variable": "lor-brewing{0}", "title": "Brewing", "subGroup": "Craftmanship", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-brewing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "group": "Lore", "description": "", "variable": "lor-cooking{0}", "title": "Cooking", "subGroup": "Craftmanship", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-cooking_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "group": "Lore", "description": "", "variable": "lor-engineering{0}", "title": "Engineering", "subGroup": "Craftmanship", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-engineering_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "group": "Lore", "description": "", "variable": "lor-glassblowing{0}", "title": "Glassblowing", "subGroup": "Craftmanship", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-glassblowing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "group": "Lore", "description": "", "variable": "lor-leatherworking{0}", "title": "Leatherworking", "subGroup": "Craftmanship", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-leatherworking_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "group": "Lore", "description": "", "variable": "lor-sculpting{0}", "title": "Sculpting", "subGroup": "Craftmanship", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-sculpting_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "group": "Lore", "description": "", "variable": "lor-smithing{0}", "title": "Smithing", "subGroup": "Craftmanship", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-smithing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "group": "Lore", "description": "", "variable": "lor-weaving{0}", "title": "Weaving", "subGroup": "Craftmanship", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-weaving_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Geography": {
				"name": "LoreCat_Geography", "fieldName": "geography", "group": "LoreCategory", "description": "", "variable": "lrc-geography{0}", "title": "Geography", "subGroup": "Geography", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-geography_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "group": "Lore", "description": "", "variable": "lor-aridsha{0}", "title": "Aridsha", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-aridsha_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "group": "Lore", "description": "", "variable": "lor-ceres{0}", "title": "Ceres", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ceres_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "group": "Lore", "description": "", "variable": "lor-colswei{0}", "title": "Colswei", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-colswei_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "group": "Lore", "description": "", "variable": "lor-khem{0}", "title": "Khem", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-khem_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "group": "Lore", "description": "", "variable": "lor-novus{0}", "title": "Novus", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-novus_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "group": "Lore", "description": "", "variable": "lor-walthair{0}", "title": "Walthair", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-walthair_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "group": "Lore", "description": "", "variable": "lor-wayling{0}", "title": "Wayling", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-wayling_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "ethereal_plane", "group": "Lore", "description": "", "variable": "lor-ethereal_plane{0}", "title": "Ethereal Plane", "subGroup": "Geography", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ethereal_plane_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_History": {
				"name": "LoreCat_History", "fieldName": "history", "group": "LoreCategory", "description": "", "variable": "lrc-history{0}", "title": "History", "subGroup": "History", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridsha_history", "group": "Lore", "description": "", "variable": "lor-aridsha_history{0}", "title": "Aridsha History", "subGroup": "History", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-aridsha_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceres_history", "group": "Lore", "description": "", "variable": "lor-ceres_history{0}", "title": "Ceres History", "subGroup": "History", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ceres_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": []
				,
				"isResource": ""
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colswei_history", "group": "Lore", "description": "", "variable": "lor-colswei_history{0}", "title": "Colswei History", "subGroup": "History", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-colswei_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khem_history", "group": "Lore", "description": "", "variable": "lor-khem_history{0}", "title": "Khem History", "subGroup": "History", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-khem_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novus_history", "group": "Lore", "description": "", "variable": "lor-novus_history{0}", "title": "Novus History", "subGroup": "History", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-novus_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthair_history", "group": "Lore", "description": "", "variable": "lor-walthair_history{0}", "title": "Walthair History", "subGroup": "History", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-walthair_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "wayling_history", "group": "Lore", "description": "", "variable": "lor-wayling_history{0}", "title": "Wayling History", "subGroup": "History", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-wayling_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Culture": {
				"name": "LoreCat_Culture", "fieldName": "culture", "group": "LoreCategory", "description": "", "variable": "lrc-culture{0}", "title": "Culture", "subGroup": "Culture", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-culture_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "group": "Lore", "description": "", "variable": "lor-art{0}", "title": "Art", "subGroup": "Culture", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-art_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "group": "Lore", "description": "", "variable": "lor-etiquette{0}", "title": "Etiquette", "subGroup": "Culture", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-etiquette_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "group": "Lore", "description": "", "variable": "lor-fashion{0}", "title": "Fashion", "subGroup": "Culture", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-fashion_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "group": "Lore", "description": "", "variable": "lor-games{0}", "title": "Games", "subGroup": "Culture", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-games_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "group": "Lore", "description": "", "variable": "lor-music{0}", "title": "Music", "subGroup": "Culture", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-music_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "group": "Lore", "description": "", "variable": "lor-scribing{0}", "title": "Scribing", "subGroup": "Culture", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-scribing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "group": "Lore", "description": "", "variable": "lor-theater{0}", "title": "Theater", "subGroup": "Culture", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-theater_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Religion": {
				"name": "LoreCat_Religion", "fieldName": "religion", "group": "LoreCategory", "description": "", "variable": "lrc-religion{0}", "title": "Religion", "subGroup": "Religion", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-religion_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "church_of_kongkwei", "group": "Lore", "description": "", "variable": "lor-church_of_kongkwei{0}", "title": "Church of Kongkwei", "subGroup": "Religion", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-church_of_kongkwei_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "group": "Lore", "description": "", "variable": "lor-guidance{0}", "title": "Guidance", "subGroup": "Religion", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-guidance_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life's_circle", "group": "Lore", "description": "", "variable": "lor-life's_circle{0}", "title": "Life's Circle", "subGroup": "Religion", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-life's_circle_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "ocean_court", "group": "Lore", "description": "", "variable": "lor-ocean_court{0}", "title": "Ocean Court", "subGroup": "Religion", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ocean_court_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "group": "Lore", "description": "", "variable": "lor-sylvan{0}", "title": "Sylvan", "subGroup": "Religion", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-sylvan_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "group": "Lore", "description": "", "variable": "lor-zushaon{0}", "title": "Zushaon", "subGroup": "Religion", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-zushaon_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "job_interceptor", "group": "Job", "description": "", "variable": "job-interceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Finesse"
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "job_guardian", "group": "Job", "description": "", "variable": "job-guardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Might"
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "job_spellslinger", "group": "Job", "description": "", "variable": "job-spellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Shoot"
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "job_warrior", "group": "Job", "description": "", "variable": "job-warrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Skirmish"
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "job_rogue", "group": "Job", "description": "", "variable": "job-rogue{0}", "title": "Rogue", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Stealth"
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "job_scholar", "group": "Job", "description": "", "variable": "job-scholar{0}", "title": "Scholar", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Analyze"
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "job_physician", "group": "Job", "description": "", "variable": "job-physician{0}", "title": "Physician", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Heal"
			},
			"JStyle_Interceptor": {
				"name": "JStyle_Interceptor", "fieldName": "jstyle_interceptor", "group": "JobStyle", "description": "", "variable": "jbs-interceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Finesse"
			},
			"JStyle_Guardian": {
				"name": "JStyle_Guardian", "fieldName": "jstyle_guardian", "group": "JobStyle", "description": "", "variable": "jbs-guardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Might"
			},
			"JStyle_Spellslinger": {
				"name": "JStyle_Spellslinger", "fieldName": "jstyle_spellslinger", "group": "JobStyle", "description": "", "variable": "jbs-spellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Shoot"
			},
			"JStyle_Warrior": {
				"name": "JStyle_Warrior", "fieldName": "jstyle_warrior", "group": "JobStyle", "description": "", "variable": "jbs-warrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Skirmish"
			},
			"JStyle_Rogue": {
				"name": "JStyle_Rogue", "fieldName": "jstyle_rogue", "group": "JobStyle", "description": "", "variable": "jbs-rogue{0}", "title": "Rogue", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Stealth"
			},
			"JStyle_Scholar": {
				"name": "JStyle_Scholar", "fieldName": "jstyle_scholar", "group": "JobStyle", "description": "", "variable": "jbs-scholar{0}", "title": "Scholar", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Analyze"
			},
			"JStyle_Physician": {
				"name": "JStyle_Physician", "fieldName": "jstyle_physician", "group": "JobStyle", "description": "", "variable": "jbs-physician{0}", "title": "Physician", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Heal"
			},
			"Stat_Downed": {
				"name": "Stat_Downed", "fieldName": "stat_downed", "group": "Status", "description": "", "variable": "sts-downed{0}", "title": "Downed", "subGroup": "Status", "descriptions": ["A downed character is severely injured. Techniques with skill checks in the Athletics, Combat, Creation, or Manipulate skill groups consume two quick actions if they are quick and cannot be used if they are a full action or reaction. In addition, all of their defenses are reduced by 5 and their Move Speed is reduced to 0. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Dying": {
				"name": "Stat_Dying", "fieldName": "stat_dying", "group": "Status", "description": "", "variable": "sts-dying{0}", "title": "Dying", "subGroup": "Status", "descriptions": ["A dying character loses 10 HP each turn. If a character's HP reduces to 0 while dying, the character instead dies. ", "At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Engaged": {
				"name": "Stat_Engaged", "fieldName": "stat_engaged", "group": "Status", "description": "", "variable": "sts-engaged{0}", "title": "Engaged", "subGroup": "Status", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Ethereal": {
				"name": "Stat_Ethereal", "fieldName": "stat_ethereal", "group": "Status", "description": "", "variable": "sts-ethereal{0}", "title": "Ethereal", "subGroup": "Status", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Grappled": {
				"name": "Stat_Grappled", "fieldName": "stat_grappled", "group": "Status", "description": "", "variable": "sts-grappled{0}", "title": "Grappled", "subGroup": "Status", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\n\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Hidden": {
				"name": "Stat_Hidden", "fieldName": "stat_hidden", "group": "Status", "description": "", "variable": "sts-hidden{0}", "title": "Hidden", "subGroup": "Status", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search.\nTo remain hidden, you must not be Engaged and you must either be outside of any enemies’ line of sight, obscured by sufficient cover, or invisible. If you Hide while meeting one of these criteria, you gain the Hidden status.\nHard cover is sufficient to Hide as long as it is large enough to totally conceal you, but soft cover is only sufficient if you are completely inside an area or zone that grants soft cover."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Invisible": {
				"name": "Stat_Invisible", "fieldName": "stat_invisible", "group": "Status", "description": "", "variable": "sts-invisible{0}", "title": "Invisible", "subGroup": "Status", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Multiact": {
				"name": "Stat_Multiact", "fieldName": "stat_multiact", "group": "Status", "description": "", "variable": "sts-multiact{0}", "title": "Multiact", "subGroup": "Status", "descriptions": ["This character is pushing their limits. Each time a character starts their turn in a round after their first one, they gain a rank of Multiact. All skill checks made by the character gain a penalty equal to their Multiact rank. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Restrained": {
				"name": "Stat_Restrained", "fieldName": "stat_restrained", "group": "Status", "description": "", "variable": "sts-restrained{0}", "title": "Restrained", "subGroup": "Status", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Unconscious": {
				"name": "Stat_Unconscious", "fieldName": "stat_unconscious", "group": "Status", "description": "", "variable": "sts-unconscious{0}", "title": "Unconscious", "subGroup": "Status", "descriptions": ["An unconscious character cannot take actions, can’t move or speak, and is unaware of its surroundings.\nThe character drops whatever it’s holding and falls prone.\nAll of the character's defenses and senses are considered to be 0."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Aflame": {
				"name": "Stat_Aflame", "fieldName": "stat_aflame", "group": "Status", "description": "", "variable": "sts-aflame{0}", "title": "Aflame", "subGroup": "Condition", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Chilled": {
				"name": "Stat_Chilled", "fieldName": "stat_chilled", "group": "Status", "description": "", "variable": "sts-chilled{0}", "title": "Chilled", "subGroup": "Condition", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Delayed": {
				"name": "Stat_Delayed", "fieldName": "stat_delayed", "group": "Status", "description": "", "variable": "sts-delayed{0}", "title": "Delayed", "subGroup": "Condition", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Empowered": {
				"name": "Stat_Empowered", "fieldName": "stat_empowered", "group": "Status", "description": "", "variable": "sts-empowered{0}", "title": "Empowered", "subGroup": "Condition", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Encumbered": {
				"name": "Stat_Encumbered", "fieldName": "stat_encumbered", "group": "Status", "description": "", "variable": "sts-encumbered{0}", "title": "Encumbered", "subGroup": "Condition", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Hasted": {
				"name": "Stat_Hasted", "fieldName": "stat_hasted", "group": "Status", "description": "", "variable": "sts-hasted{0}", "title": "Hasted", "subGroup": "Condition", "descriptions": ["When this character ends their turn the character becomes able to act again in the round without increasing the Multiact penalty. The hasted condition then ends. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Immobilized": {
				"name": "Stat_Immobilized", "fieldName": "stat_immobilized", "group": "Status", "description": "", "variable": "sts-immobilized{0}", "title": "Immobilized", "subGroup": "Condition", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Impaired": {
				"name": "Stat_Impaired", "fieldName": "stat_impaired", "group": "Status", "description": "", "variable": "sts-impaired{0}", "title": "Impaired", "subGroup": "Condition", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Launched": {
				"name": "Stat_Launched", "fieldName": "stat_launched", "group": "Status", "description": "", "variable": "sts-launched{0}", "title": "Launched", "subGroup": "Condition", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Paralyzed": {
				"name": "Stat_Paralyzed", "fieldName": "stat_paralyzed", "group": "Status", "description": "", "variable": "sts-paralyzed{0}", "title": "Paralyzed", "subGroup": "Condition", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Persevering": {
				"name": "Stat_Persevering", "fieldName": "stat_persevering", "group": "Status", "description": "", "variable": "sts-persevering{0}", "title": "Persevering", "subGroup": "Condition", "descriptions": ["As a swift action, a character with this condition may end it to end one other condition affecting them. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Prone": {
				"name": "Stat_Prone", "fieldName": "stat_prone", "group": "Status", "description": "", "variable": "sts-prone{0}", "title": "Prone", "subGroup": "Condition", "descriptions": ["Skill checks against Prone targets within range 1 of them receive +1 Advantage. \nProne characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Sickened": {
				"name": "Stat_Sickened", "fieldName": "stat_sickened", "group": "Status", "description": "", "variable": "sts-sickened{0}", "title": "Sickened", "subGroup": "Condition", "descriptions": ["Sickened characters receive +1 Disadvantage on all skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Staggered": {
				"name": "Stat_Staggered", "fieldName": "stat_staggered", "group": "Status", "description": "", "variable": "sts-staggered{0}", "title": "Staggered", "subGroup": "Condition", "descriptions": ["Skill checks against a staggered target receive +1 Advantage. When a character takes advantage of this condition the character loses the staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Stunned": {
				"name": "Stat_Stunned", "fieldName": "stat_stunned", "group": "Status", "description": "", "variable": "sts-stunned{0}", "title": "Stunned", "subGroup": "Condition", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Angered": {
				"name": "Stat_Angered", "fieldName": "stat_angered", "group": "Status", "description": "", "variable": "sts-angered{0}", "title": "Angered", "subGroup": "Emotion", "descriptions": ["The character is furious with another character. When this character makes an attack or social skill check and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the skill check. An Angered character can only have one character be the target of this emotion and will have the target replaced by a new target if this emotion is gained again."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Disgusted": {
				"name": "Stat_Disgusted", "fieldName": "stat_disgusted", "group": "Status", "description": "", "variable": "sts-disgusted{0}", "title": "Disgusted", "subGroup": "Emotion", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Doubt": {
				"name": "Stat_Doubt", "fieldName": "stat_doubt", "group": "Status", "description": "", "variable": "sts-doubt{0}", "title": "Doubt", "subGroup": "Emotion", "descriptions": ["At the start of the round, you lose 5 Willpower. This cannot cause a Will Break."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Encouraged": {
				"name": "Stat_Encouraged", "fieldName": "stat_encouraged", "group": "Status", "description": "", "variable": "sts-encouraged{0}", "title": "Encouraged", "subGroup": "Emotion", "descriptions": ["As a swift action, a character with this condition may end it to gain +1 Advantage on their next skill check."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Frightened": {
				"name": "Stat_Frightened", "fieldName": "stat_frightened", "group": "Status", "description": "", "variable": "sts-frightened{0}", "title": "Frightened", "subGroup": "Emotion", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. A frightened character can only have one character be the target of this emotion and will have the target replaced by a new target if this emotion is gained again."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Flustered": {
				"name": "Stat_Flustered", "fieldName": "stat_flustered", "group": "Status", "description": "", "variable": "sts-flustered{0}", "title": "Flustered", "subGroup": "Emotion", "descriptions": ["All skill checks against a flustered target receive +1 Advantage and persuade checks against the target increase by 3. When a character takes advantage of this will the character loses the flustered emotion."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Receptive": {
				"name": "Stat_Receptive", "fieldName": "stat_receptive", "group": "Status", "description": "", "variable": "sts-receptive{0}", "title": "Receptive", "subGroup": "Emotion", "descriptions": ["All persuade checks against the target increase by 4."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Joyful": {
				"name": "Stat_Joyful", "fieldName": "stat_joyful", "group": "Status", "description": "", "variable": "sts-joyful{0}", "title": "Joyful", "subGroup": "Emotion", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Saddened": {
				"name": "Stat_Saddened", "fieldName": "stat_saddened", "group": "Status", "description": "", "variable": "sts-saddened{0}", "title": "Saddened", "subGroup": "Emotion", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Stat_Surprised": {
				"name": "Stat_Surprised", "fieldName": "stat_surprised", "group": "Status", "description": "", "variable": "sts-surprised{0}", "title": "Surprised", "subGroup": "Emotion", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "endsOnRoundStart": false
			},
			"Tech_Hide": {
				"name": "Tech_Hide", "fieldName": "tech_hide", "group": "Technique", "description": "", "variable": "tch-hide{0}", "title": "Hide", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Mount": {
				"name": "Tech_Mount", "fieldName": "tech_mount", "group": "Technique", "description": "", "variable": "tch-mount{0}", "title": "Mount", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Move": {
				"name": "Tech_Move", "fieldName": "tech_move", "group": "Technique", "description": "", "variable": "tch-move{0}", "title": "Move", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Prepare": {
				"name": "Tech_Prepare", "fieldName": "tech_prepare", "group": "Technique", "description": "", "variable": "tch-prepare{0}", "title": "Prepare", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Interact": {
				"name": "Tech_Interact", "fieldName": "tech_interact", "group": "Technique", "description": "", "variable": "tch-interact{0}", "title": "Interact", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Detect Ether": {
				"name": "Tech_Detect Ether", "fieldName": "tech_detect_ether", "group": "Technique", "description": "", "variable": "tch-detect_ether{0}", "title": "Detect Ether", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Detect Creature": {
				"name": "Tech_Detect Creature", "fieldName": "tech_detect_creature", "group": "Technique", "description": "", "variable": "tch-detect_creature{0}", "title": "Detect Creature", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dash": {
				"name": "Tech_Dash", "fieldName": "tech_dash", "group": "Technique", "description": "", "variable": "tch-dash{0}", "title": "Dash", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Break Free": {
				"name": "Tech_Break Free", "fieldName": "tech_break_free", "group": "Technique", "description": "", "variable": "tch-break_free{0}", "title": "Break Free", "subGroup": "Basic Activity", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Escape": {
				"name": "Tech_Escape", "fieldName": "tech_escape", "group": "Technique", "description": "", "variable": "tch-escape{0}", "title": "Escape", "subGroup": "Basic Activity", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Move Silently": {
				"name": "Tech_Move Silently", "fieldName": "tech_move_silently", "group": "Technique", "description": "", "variable": "tch-move_silently{0}", "title": "Move Silently", "subGroup": "Basic Activity", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reposition": {
				"name": "Tech_Reposition", "fieldName": "tech_reposition", "group": "Technique", "description": "", "variable": "tch-reposition{0}", "title": "Reposition", "subGroup": "Basic Activity", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Grab an Edge": {
				"name": "Tech_Grab an Edge", "fieldName": "tech_grab_an_edge", "group": "Technique", "description": "", "variable": "tch-grab_an_edge{0}", "title": "Grab an Edge", "subGroup": "Basic Activity", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": []
				,
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Aid": {
				"name": "Tech_Aid", "fieldName": "tech_aid", "group": "Technique", "description": "", "variable": "tch-aid{0}", "title": "Aid", "subGroup": "Basic Support", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stabilize": {
				"name": "Tech_Stabilize", "fieldName": "tech_stabilize", "group": "Technique", "description": "", "variable": "tch-stabilize{0}", "title": "Stabilize", "subGroup": "Basic Support", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reassure": {
				"name": "Tech_Reassure", "fieldName": "tech_reassure", "group": "Technique", "description": "", "variable": "tch-reassure{0}", "title": "Reassure", "subGroup": "Basic Support", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Calm Mind": {
				"name": "Tech_Calm Mind", "fieldName": "tech_calm_mind", "group": "Technique", "description": "", "variable": "tch-calm_mind{0}", "title": "Calm Mind", "subGroup": "Basic Support", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Grapple": {
				"name": "Tech_Grapple", "fieldName": "tech_grapple", "group": "Technique", "description": "", "variable": "tch-grapple{0}", "title": "Grapple", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Unarmed Strike": {
				"name": "Tech_Unarmed Strike", "fieldName": "tech_unarmed_strike", "group": "Technique", "description": "", "variable": "tch-unarmed_strike{0}", "title": "Unarmed Strike", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Basic Slash": {
				"name": "Tech_Basic Slash", "fieldName": "tech_basic_slash", "group": "Technique", "description": "", "variable": "tch-basic_slash{0}", "title": "Basic Slash", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Throw": {
				"name": "Tech_Throw", "fieldName": "tech_throw", "group": "Technique", "description": "", "variable": "tch-throw{0}", "title": "Throw", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Heavy Strike": {
				"name": "Tech_Heavy Strike", "fieldName": "tech_heavy_strike", "group": "Technique", "description": "", "variable": "tch-heavy_strike{0}", "title": "Heavy Strike", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Build Favor": {
				"name": "Tech_Build Favor", "fieldName": "tech_build_favor", "group": "Technique", "description": "", "variable": "tch-build_favor{0}", "title": "Build Favor", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Agitate": {
				"name": "Tech_Agitate", "fieldName": "tech_agitate", "group": "Technique", "description": "", "variable": "tch-agitate{0}", "title": "Agitate", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Emphasize": {
				"name": "Tech_Emphasize", "fieldName": "tech_emphasize", "group": "Technique", "description": "", "variable": "tch-emphasize{0}", "title": "Emphasize", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Request": {
				"name": "Tech_Request", "fieldName": "tech_request", "group": "Technique", "description": "", "variable": "tch-request{0}", "title": "Request", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sense Motive": {
				"name": "Tech_Sense Motive", "fieldName": "tech_sense_motive", "group": "Technique", "description": "", "variable": "tch-sense_motive{0}", "title": "Sense Motive", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Defender": {
				"name": "Tech_Defender", "fieldName": "tech_defender", "group": "Technique", "description": "", "variable": "tch-defender{0}", "title": "Defender", "subGroup": "Warrior; Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Defender II": {
				"name": "Tech_Defender II", "fieldName": "tech_defender_ii", "group": "Technique", "description": "", "variable": "tch-defender_ii{0}", "title": "Defender II", "subGroup": "Warrior; Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Athlete": {
				"name": "Tech_Athlete", "fieldName": "tech_athlete", "group": "Technique", "description": "", "variable": "tch-athlete{0}", "title": "Athlete", "subGroup": "Rogue", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Athlete II": {
				"name": "Tech_Athlete II", "fieldName": "tech_athlete_ii", "group": "Technique", "description": "", "variable": "tch-athlete_ii{0}", "title": "Athlete II", "subGroup": "Rogue", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Fighter": {
				"name": "Tech_Fighter", "fieldName": "tech_fighter", "group": "Technique", "description": "", "variable": "tch-fighter{0}", "title": "Fighter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Fighter II": {
				"name": "Tech_Fighter II", "fieldName": "tech_fighter_ii", "group": "Technique", "description": "", "variable": "tch-fighter_ii{0}", "title": "Fighter II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Marksman": {
				"name": "Tech_Marksman", "fieldName": "tech_marksman", "group": "Technique", "description": "", "variable": "tch-marksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Marksman II": {
				"name": "Tech_Marksman II", "fieldName": "tech_marksman_ii", "group": "Technique", "description": "", "variable": "tch-marksman_ii{0}", "title": "Marksman II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Mage": {
				"name": "Tech_Mage", "fieldName": "tech_mage", "group": "Technique", "description": "", "variable": "tch-mage{0}", "title": "Mage", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Mage II": {
				"name": "Tech_Mage II", "fieldName": "tech_mage_ii", "group": "Technique", "description": "", "variable": "tch-mage_ii{0}", "title": "Mage II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Teacher": {
				"name": "Tech_Teacher", "fieldName": "tech_teacher", "group": "Technique", "description": "", "variable": "tch-teacher{0}", "title": "Teacher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Teacher II": {
				"name": "Tech_Teacher II", "fieldName": "tech_teacher_ii", "group": "Technique", "description": "", "variable": "tch-teacher_ii{0}", "title": "Teacher II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Influencer": {
				"name": "Tech_Influencer", "fieldName": "tech_influencer", "group": "Technique", "description": "", "variable": "tch-influencer{0}", "title": "Influencer", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Influencer II": {
				"name": "Tech_Influencer II", "fieldName": "tech_influencer_ii", "group": "Technique", "description": "", "variable": "tch-influencer_ii{0}", "title": "Influencer II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Motivator": {
				"name": "Tech_Motivator", "fieldName": "tech_motivator", "group": "Technique", "description": "", "variable": "tch-motivator{0}", "title": "Motivator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Motivator II": {
				"name": "Tech_Motivator II", "fieldName": "tech_motivator_ii", "group": "Technique", "description": "", "variable": "tch-motivator_ii{0}", "title": "Motivator II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Second Wind": {
				"name": "Tech_Second Wind", "fieldName": "tech_second_wind", "group": "Technique", "description": "", "variable": "tch-second_wind{0}", "title": "Second Wind", "subGroup": "Warrior", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Second Breath": {
				"name": "Tech_Second Breath", "fieldName": "tech_second_breath", "group": "Technique", "description": "", "variable": "tch-second_breath{0}", "title": "Second Breath", "subGroup": "Warrior", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Undaunted": {
				"name": "Tech_Undaunted", "fieldName": "tech_undaunted", "group": "Technique", "description": "", "variable": "tch-undaunted{0}", "title": "Undaunted", "subGroup": "Warrior", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Preemptive Strike": {
				"name": "Tech_Preemptive Strike", "fieldName": "tech_preemptive_strike", "group": "Technique", "description": "", "variable": "tch-preemptive_strike{0}", "title": "Preemptive Strike", "subGroup": "Interceptor", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Preemptive Stagger": {
				"name": "Tech_Preemptive Stagger", "fieldName": "tech_preemptive_stagger", "group": "Technique", "description": "", "variable": "tch-preemptive_stagger{0}", "title": "Preemptive Stagger", "subGroup": "Interceptor", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Critical Maim": {
				"name": "Tech_Critical Maim", "fieldName": "tech_critical_maim", "group": "Technique", "description": "", "variable": "tch-critical_maim{0}", "title": "Critical Maim", "subGroup": "Interceptor", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Spellshot": {
				"name": "Tech_Spellshot", "fieldName": "tech_spellshot", "group": "Technique", "description": "", "variable": "tch-spellshot{0}", "title": "Spellshot", "subGroup": "Spellslinger", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Follow-Up Spellshot": {
				"name": "Tech_Follow-Up Spellshot", "fieldName": "tech_follow-up_spellshot", "group": "Technique", "description": "", "variable": "tch-follow-up_spellshot{0}", "title": "Follow-Up Spellshot", "subGroup": "Spellslinger", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Bursting Spellshot": {
				"name": "Tech_Bursting Spellshot", "fieldName": "tech_bursting_spellshot", "group": "Technique", "description": "", "variable": "tch-bursting_spellshot{0}", "title": "Bursting Spellshot", "subGroup": "Spellslinger", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Savior": {
				"name": "Tech_Savior", "fieldName": "tech_savior", "group": "Technique", "description": "", "variable": "tch-savior{0}", "title": "Savior", "subGroup": "Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Knock Away Savior": {
				"name": "Tech_Knock Away Savior", "fieldName": "tech_knock_away_savior", "group": "Technique", "description": "", "variable": "tch-knock_away_savior{0}", "title": "Knock Away Savior", "subGroup": "Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Savior's Retaliation": {
				"name": "Tech_Savior's Retaliation", "fieldName": "tech_savior's_retaliation", "group": "Technique", "description": "", "variable": "tch-savior's_retaliation{0}", "title": "Savior's Retaliation", "subGroup": "Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Spellstrike": {
				"name": "Tech_Spellstrike", "fieldName": "tech_spellstrike", "group": "Technique", "description": "", "variable": "tch-spellstrike{0}", "title": "Spellstrike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Power Skirmish": {
				"name": "Tech_Power Skirmish", "fieldName": "tech_power_skirmish", "group": "Technique", "description": "", "variable": "tch-power_skirmish{0}", "title": "Power Skirmish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Sneak Attack": {
				"name": "Tech_Sneak Attack", "fieldName": "tech_sneak_attack", "group": "Technique", "description": "", "variable": "tch-sneak_attack{0}", "title": "Sneak Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Sneaky Follow-Up": {
				"name": "Tech_Sneaky Follow-Up", "fieldName": "tech_sneaky_follow-up", "group": "Technique", "description": "", "variable": "tch-sneaky_follow-up{0}", "title": "Sneaky Follow-Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Assassinate": {
				"name": "Tech_Assassinate", "fieldName": "tech_assassinate", "group": "Technique", "description": "", "variable": "tch-assassinate{0}", "title": "Assassinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Emergency Care": {
				"name": "Tech_Emergency Care", "fieldName": "tech_emergency_care", "group": "Technique", "description": "", "variable": "tch-emergency_care{0}", "title": "Emergency Care", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Nightingale": {
				"name": "Tech_Nightingale", "fieldName": "tech_nightingale", "group": "Technique", "description": "", "variable": "tch-nightingale{0}", "title": "Nightingale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Rhapsody": {
				"name": "Tech_Rhapsody", "fieldName": "tech_rhapsody", "group": "Technique", "description": "", "variable": "tch-rhapsody{0}", "title": "Rhapsody", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Metamagic": {
				"name": "Tech_Metamagic", "fieldName": "tech_metamagic", "group": "Technique", "description": "", "variable": "tch-metamagic{0}", "title": "Metamagic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Strategize": {
				"name": "Tech_Strategize", "fieldName": "tech_strategize", "group": "Technique", "description": "", "variable": "tch-strategize{0}", "title": "Strategize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Foresight": {
				"name": "Tech_Foresight", "fieldName": "tech_foresight", "group": "Technique", "description": "", "variable": "tch-foresight{0}", "title": "Foresight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Saw That Coming": {
				"name": "Tech_Saw That Coming", "fieldName": "tech_saw_that_coming", "group": "Technique", "description": "", "variable": "tch-saw_that_coming{0}", "title": "Saw That Coming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_As You May Recall": {
				"name": "Tech_As You May Recall", "fieldName": "tech_as_you_may_recall", "group": "Technique", "description": "", "variable": "tch-as_you_may_recall{0}", "title": "As You May Recall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Defender's Will": {
				"name": "Tech_Defender's Will", "fieldName": "tech_defender's_will", "group": "Technique", "description": "", "variable": "tch-defender's_will{0}", "title": "Defender's Will", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Defender's Taunt": {
				"name": "Tech_Defender's Taunt", "fieldName": "tech_defender's_taunt", "group": "Technique", "description": "", "variable": "tch-defender's_taunt{0}", "title": "Defender's Taunt", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Defender's Recovery": {
				"name": "Tech_Defender's Recovery", "fieldName": "tech_defender's_recovery", "group": "Technique", "description": "", "variable": "tch-defender's_recovery{0}", "title": "Defender's Recovery", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher": {
				"name": "Tech_Skirmisher", "fieldName": "tech_skirmisher", "group": "Technique", "description": "", "variable": "tch-skirmisher{0}", "title": "Skirmisher", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher II": {
				"name": "Tech_Skirmisher II", "fieldName": "tech_skirmisher_ii", "group": "Technique", "description": "", "variable": "tch-skirmisher_ii{0}", "title": "Skirmisher II", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher's Step": {
				"name": "Tech_Skirmisher's Step", "fieldName": "tech_skirmisher's_step", "group": "Technique", "description": "", "variable": "tch-skirmisher's_step{0}", "title": "Skirmisher's Step", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher's Strike": {
				"name": "Tech_Skirmisher's Strike", "fieldName": "tech_skirmisher's_strike", "group": "Technique", "description": "", "variable": "tch-skirmisher's_strike{0}", "title": "Skirmisher's Strike", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman's Longshot": {
				"name": "Tech_Marksman's Longshot", "fieldName": "tech_marksman's_longshot", "group": "Technique", "description": "", "variable": "tch-marksman's_longshot{0}", "title": "Marksman's Longshot", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman's Sight": {
				"name": "Tech_Marksman's Sight", "fieldName": "tech_marksman's_sight", "group": "Technique", "description": "", "variable": "tch-marksman's_sight{0}", "title": "Marksman's Sight", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman's Strike": {
				"name": "Tech_Marksman's Strike", "fieldName": "tech_marksman's_strike", "group": "Technique", "description": "", "variable": "tch-marksman's_strike{0}", "title": "Marksman's Strike", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Athlete's Sprint": {
				"name": "Tech_Athlete's Sprint", "fieldName": "tech_athlete's_sprint", "group": "Technique", "description": "", "variable": "tch-athlete's_sprint{0}", "title": "Athlete's Sprint", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Athlete's Reach": {
				"name": "Tech_Athlete's Reach", "fieldName": "tech_athlete's_reach", "group": "Technique", "description": "", "variable": "tch-athlete's_reach{0}", "title": "Athlete's Reach", "subGroup": "Athlete", "descriptions": [""]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bounding Sprint": {
				"name": "Tech_Bounding Sprint", "fieldName": "tech_bounding_sprint", "group": "Technique", "description": "", "variable": "tch-bounding_sprint{0}", "title": "Bounding Sprint", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skulk Away": {
				"name": "Tech_Skulk Away", "fieldName": "tech_skulk_away", "group": "Technique", "description": "", "variable": "tch-skulk_away{0}", "title": "Skulk Away", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skulk Then Hide": {
				"name": "Tech_Skulk Then Hide", "fieldName": "tech_skulk_then_hide", "group": "Technique", "description": "", "variable": "tch-skulk_then_hide{0}", "title": "Skulk Then Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_First Aid": {
				"name": "Tech_First Aid", "fieldName": "tech_first_aid", "group": "Technique", "description": "", "variable": "tch-first_aid{0}", "title": "First Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cleansing Aid": {
				"name": "Tech_Cleansing Aid", "fieldName": "tech_cleansing_aid", "group": "Technique", "description": "", "variable": "tch-cleansing_aid{0}", "title": "Cleansing Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Environmental Awareness": {
				"name": "Tech_Environmental Awareness", "fieldName": "tech_environmental_awareness", "group": "Technique", "description": "", "variable": "tch-environmental_awareness{0}", "title": "Environmental Awareness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Eclectic Knowledge": {
				"name": "Tech_Eclectic Knowledge", "fieldName": "tech_eclectic_knowledge", "group": "Technique", "description": "", "variable": "tch-eclectic_knowledge{0}", "title": "Eclectic Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Point of Clarity": {
				"name": "Tech_Point of Clarity", "fieldName": "tech_point_of_clarity", "group": "Technique", "description": "", "variable": "tch-point_of_clarity{0}", "title": "Point of Clarity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Swift Rebuttal": {
				"name": "Tech_Swift Rebuttal", "fieldName": "tech_swift_rebuttal", "group": "Technique", "description": "", "variable": "tch-swift_rebuttal{0}", "title": "Swift Rebuttal", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Build Pressure": {
				"name": "Tech_Build Pressure", "fieldName": "tech_build_pressure", "group": "Technique", "description": "", "variable": "tch-build_pressure{0}", "title": "Build Pressure", "subGroup": "Deft Negotiator; Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Appeal": {
				"name": "Tech_Appeal", "fieldName": "tech_appeal", "group": "Technique", "description": "", "variable": "tch-appeal{0}", "title": "Appeal", "subGroup": "Charm Unrestrained; Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Insist": {
				"name": "Tech_Insist", "fieldName": "tech_insist", "group": "Technique", "description": "", "variable": "tch-insist{0}", "title": "Insist", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Proposal": {
				"name": "Tech_Proposal", "fieldName": "tech_proposal", "group": "Technique", "description": "", "variable": "tch-proposal{0}", "title": "Proposal", "subGroup": "Deft Negotiator; Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Advocate": {
				"name": "Tech_Advocate", "fieldName": "tech_advocate", "group": "Technique", "description": "", "variable": "tch-advocate{0}", "title": "Advocate", "subGroup": "Charm Unrestrained; Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Dismiss": {
				"name": "Tech_Dismiss", "fieldName": "tech_dismiss", "group": "Technique", "description": "", "variable": "tch-dismiss{0}", "title": "Dismiss", "subGroup": "Abrasive Wit; Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Flatter": {
				"name": "Tech_Flatter", "fieldName": "tech_flatter", "group": "Technique", "description": "", "variable": "tch-flatter{0}", "title": "Flatter", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Beguile": {
				"name": "Tech_Beguile", "fieldName": "tech_beguile", "group": "Technique", "description": "", "variable": "tch-beguile{0}", "title": "Beguile", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Magnetic Charm": {
				"name": "Tech_Magnetic Charm", "fieldName": "tech_magnetic_charm", "group": "Technique", "description": "", "variable": "tch-magnetic_charm{0}", "title": "Magnetic Charm", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Disarming Gaze": {
				"name": "Tech_Disarming Gaze", "fieldName": "tech_disarming_gaze", "group": "Technique", "description": "", "variable": "tch-disarming_gaze{0}", "title": "Disarming Gaze", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Charming Request": {
				"name": "Tech_Charming Request", "fieldName": "tech_charming_request", "group": "Technique", "description": "", "variable": "tch-charming_request{0}", "title": "Charming Request", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Pander": {
				"name": "Tech_Pander", "fieldName": "tech_pander", "group": "Technique", "description": "", "variable": "tch-pander{0}", "title": "Pander", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Flatter II": {
				"name": "Tech_Flatter II", "fieldName": "tech_flatter_ii", "group": "Technique", "description": "", "variable": "tch-flatter_ii{0}", "title": "Flatter II", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Invigorate": {
				"name": "Tech_Invigorate", "fieldName": "tech_invigorate", "group": "Technique", "description": "", "variable": "tch-invigorate{0}", "title": "Invigorate", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Enthusiasm": {
				"name": "Tech_Enthusiasm", "fieldName": "tech_enthusiasm", "group": "Technique", "description": "", "variable": "tch-enthusiasm{0}", "title": "Enthusiasm", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Meditate": {
				"name": "Tech_Meditate", "fieldName": "tech_meditate", "group": "Technique", "description": "", "variable": "tch-meditate{0}", "title": "Meditate", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Zeal": {
				"name": "Tech_Zeal", "fieldName": "tech_zeal", "group": "Technique", "description": "", "variable": "tch-zeal{0}", "title": "Zeal", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Deepen Connection": {
				"name": "Tech_Deepen Connection", "fieldName": "tech_deepen_connection", "group": "Technique", "description": "", "variable": "tch-deepen_connection{0}", "title": "Deepen Connection", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Bravado": {
				"name": "Tech_Bravado", "fieldName": "tech_bravado", "group": "Technique", "description": "", "variable": "tch-bravado{0}", "title": "Bravado", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Motivational Speech": {
				"name": "Tech_Motivational Speech", "fieldName": "tech_motivational_speech", "group": "Technique", "description": "", "variable": "tch-motivational_speech{0}", "title": "Motivational Speech", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Invigorate II": {
				"name": "Tech_Invigorate II", "fieldName": "tech_invigorate_ii", "group": "Technique", "description": "", "variable": "tch-invigorate_ii{0}", "title": "Invigorate II", "subGroup": "Inspiring Presence", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Diplomacy": {
				"name": "Tech_Diplomacy", "fieldName": "tech_diplomacy", "group": "Technique", "description": "", "variable": "tch-diplomacy{0}", "title": "Diplomacy", "subGroup": "Deft Negotiator", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fast Talk": {
				"name": "Tech_Fast Talk", "fieldName": "tech_fast_talk", "group": "Technique", "description": "", "variable": "tch-fast_talk{0}", "title": "Fast Talk", "subGroup": "Deft Negotiator", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Quick Request": {
				"name": "Tech_Quick Request", "fieldName": "tech_quick_request", "group": "Technique", "description": "", "variable": "tch-quick_request{0}", "title": "Quick Request", "subGroup": "Deft Negotiator", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Segue": {
				"name": "Tech_Segue", "fieldName": "tech_segue", "group": "Technique", "description": "", "variable": "tch-segue{0}", "title": "Segue", "subGroup": "Deft Negotiator", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Increase Tension": {
				"name": "Tech_Increase Tension", "fieldName": "tech_increase_tension", "group": "Technique", "description": "", "variable": "tch-increase_tension{0}", "title": "Increase Tension", "subGroup": "Deft Negotiator", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Diplomacy II": {
				"name": "Tech_Diplomacy II", "fieldName": "tech_diplomacy_ii", "group": "Technique", "description": "", "variable": "tch-diplomacy_ii{0}", "title": "Diplomacy II", "subGroup": "Deft Negotiator", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Final Push": {
				"name": "Tech_Final Push", "fieldName": "tech_final_push", "group": "Technique", "description": "", "variable": "tch-final_push{0}", "title": "Final Push", "subGroup": "Deft Negotiator", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Subvert": {
				"name": "Tech_Subvert", "fieldName": "tech_subvert", "group": "Technique", "description": "", "variable": "tch-subvert{0}", "title": "Subvert", "subGroup": "Abrasive Wit", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Indifference": {
				"name": "Tech_Indifference", "fieldName": "tech_indifference", "group": "Technique", "description": "", "variable": "tch-indifference{0}", "title": "Indifference", "subGroup": "Abrasive Wit", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Spite": {
				"name": "Tech_Spite", "fieldName": "tech_spite", "group": "Technique", "description": "", "variable": "tch-spite{0}", "title": "Spite", "subGroup": "Abrasive Wit", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Ridicule": {
				"name": "Tech_Ridicule", "fieldName": "tech_ridicule", "group": "Technique", "description": "", "variable": "tch-ridicule{0}", "title": "Ridicule", "subGroup": "Abrasive Wit", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Unfazed": {
				"name": "Tech_Unfazed", "fieldName": "tech_unfazed", "group": "Technique", "description": "", "variable": "tch-unfazed{0}", "title": "Unfazed", "subGroup": "Abrasive Wit", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Subvert II": {
				"name": "Tech_Subvert II", "fieldName": "tech_subvert_ii", "group": "Technique", "description": "", "variable": "tch-subvert_ii{0}", "title": "Subvert II", "subGroup": "Abrasive Wit", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Redirect Anger": {
				"name": "Tech_Redirect Anger", "fieldName": "tech_redirect_anger", "group": "Technique", "description": "", "variable": "tch-redirect_anger{0}", "title": "Redirect Anger", "subGroup": "Abrasive Wit", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Threaten": {
				"name": "Tech_Threaten", "fieldName": "tech_threaten", "group": "Technique", "description": "", "variable": "tch-threaten{0}", "title": "Threaten", "subGroup": "Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Taunt": {
				"name": "Tech_Taunt", "fieldName": "tech_taunt", "group": "Technique", "description": "", "variable": "tch-taunt{0}", "title": "Taunt", "subGroup": "Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Domineer": {
				"name": "Tech_Domineer", "fieldName": "tech_domineer", "group": "Technique", "description": "", "variable": "tch-domineer{0}", "title": "Domineer", "subGroup": "Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Tyrannize": {
				"name": "Tech_Tyrannize", "fieldName": "tech_tyrannize", "group": "Technique", "description": "", "variable": "tch-tyrannize{0}", "title": "Tyrannize", "subGroup": "Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Command": {
				"name": "Tech_Command", "fieldName": "tech_command", "group": "Technique", "description": "", "variable": "tch-command{0}", "title": "Command", "subGroup": "Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Threaten II": {
				"name": "Tech_Threaten II", "fieldName": "tech_threaten_ii", "group": "Technique", "description": "", "variable": "tch-threaten_ii{0}", "title": "Threaten II", "subGroup": "Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Rage": {
				"name": "Tech_Rage", "fieldName": "tech_rage", "group": "Technique", "description": "", "variable": "tch-rage{0}", "title": "Rage", "subGroup": "Tyrannical Voice", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Tranquility": {
				"name": "Tech_Tranquility", "fieldName": "tech_tranquility", "group": "Technique", "description": "", "variable": "tch-tranquility{0}", "title": "Tranquility", "subGroup": "Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Simple Request": {
				"name": "Tech_Simple Request", "fieldName": "tech_simple_request", "group": "Technique", "description": "", "variable": "tch-simple_request{0}", "title": "Simple Request", "subGroup": "Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Small Talk": {
				"name": "Tech_Small Talk", "fieldName": "tech_small_talk", "group": "Technique", "description": "", "variable": "tch-small_talk{0}", "title": "Small Talk", "subGroup": "Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Guidance": {
				"name": "Tech_Guidance", "fieldName": "tech_guidance", "group": "Technique", "description": "", "variable": "tch-guidance{0}", "title": "Guidance", "subGroup": "Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Mindfulness": {
				"name": "Tech_Mindfulness", "fieldName": "tech_mindfulness", "group": "Technique", "description": "", "variable": "tch-mindfulness{0}", "title": "Mindfulness", "subGroup": "Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Tranquility II": {
				"name": "Tech_Tranquility II", "fieldName": "tech_tranquility_ii", "group": "Technique", "description": "", "variable": "tch-tranquility_ii{0}", "title": "Tranquility II", "subGroup": "Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Sympathy": {
				"name": "Tech_Sympathy", "fieldName": "tech_sympathy", "group": "Technique", "description": "", "variable": "tch-sympathy{0}", "title": "Sympathy", "subGroup": "Calming Empathy", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Serenity of Mind": {
				"name": "Tech_Serenity of Mind", "fieldName": "tech_serenity_of_mind", "group": "Technique", "description": "", "variable": "tch-serenity_of_mind{0}", "title": "Serenity of Mind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Clemency": {
				"name": "Tech_Clemency", "fieldName": "tech_clemency", "group": "Technique", "description": "", "variable": "tch-clemency{0}", "title": "Clemency", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Emotional Intelligence": {
				"name": "Tech_Emotional Intelligence", "fieldName": "tech_emotional_intelligence", "group": "Technique", "description": "", "variable": "tch-emotional_intelligence{0}", "title": "Emotional Intelligence", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Mean": {
				"name": "Tech_Mean", "fieldName": "tech_mean", "group": "Technique", "description": "", "variable": "tch-mean{0}", "title": "Mean", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fuel the Fire": {
				"name": "Tech_Fuel the Fire", "fieldName": "tech_fuel_the_fire", "group": "Technique", "description": "", "variable": "tch-fuel_the_fire{0}", "title": "Fuel the Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Veiled Anger": {
				"name": "Tech_Veiled Anger", "fieldName": "tech_veiled_anger", "group": "Technique", "description": "", "variable": "tch-veiled_anger{0}", "title": "Veiled Anger", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Oppress": {
				"name": "Tech_Oppress", "fieldName": "tech_oppress", "group": "Technique", "description": "", "variable": "tch-oppress{0}", "title": "Oppress", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bellow": {
				"name": "Tech_Bellow", "fieldName": "tech_bellow", "group": "Technique", "description": "", "variable": "tch-bellow{0}", "title": "Bellow", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bulldoze": {
				"name": "Tech_Bulldoze", "fieldName": "tech_bulldoze", "group": "Technique", "description": "", "variable": "tch-bulldoze{0}", "title": "Bulldoze", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Enforcement": {
				"name": "Tech_Enforcement", "fieldName": "tech_enforcement", "group": "Technique", "description": "", "variable": "tch-enforcement{0}", "title": "Enforcement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bluster": {
				"name": "Tech_Bluster", "fieldName": "tech_bluster", "group": "Technique", "description": "", "variable": "tch-bluster{0}", "title": "Bluster", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Give No Quarter": {
				"name": "Tech_Give No Quarter", "fieldName": "tech_give_no_quarter", "group": "Technique", "description": "", "variable": "tch-give_no_quarter{0}", "title": "Give No Quarter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Eye on the Prize": {
				"name": "Tech_Eye on the Prize", "fieldName": "tech_eye_on_the_prize", "group": "Technique", "description": "", "variable": "tch-eye_on_the_prize{0}", "title": "Eye on the Prize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Intrigue": {
				"name": "Tech_Intrigue", "fieldName": "tech_intrigue", "group": "Technique", "description": "", "variable": "tch-intrigue{0}", "title": "Intrigue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Consideration": {
				"name": "Tech_Consideration", "fieldName": "tech_consideration", "group": "Technique", "description": "", "variable": "tch-consideration{0}", "title": "Consideration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Compromise": {
				"name": "Tech_Compromise", "fieldName": "tech_compromise", "group": "Technique", "description": "", "variable": "tch-compromise{0}", "title": "Compromise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Appeal to Reason": {
				"name": "Tech_Appeal to Reason", "fieldName": "tech_appeal_to_reason", "group": "Technique", "description": "", "variable": "tch-appeal_to_reason{0}", "title": "Appeal to Reason", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Common Ground": {
				"name": "Tech_Common Ground", "fieldName": "tech_common_ground", "group": "Technique", "description": "", "variable": "tch-common_ground{0}", "title": "Common Ground", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Silver Tongue": {
				"name": "Tech_Silver Tongue", "fieldName": "tech_silver_tongue", "group": "Technique", "description": "", "variable": "tch-silver_tongue{0}", "title": "Silver Tongue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dig Deep": {
				"name": "Tech_Dig Deep", "fieldName": "tech_dig_deep", "group": "Technique", "description": "", "variable": "tch-dig_deep{0}", "title": "Dig Deep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Debate": {
				"name": "Tech_Debate", "fieldName": "tech_debate", "group": "Technique", "description": "", "variable": "tch-debate{0}", "title": "Debate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Close it Out": {
				"name": "Tech_Close it Out", "fieldName": "tech_close_it_out", "group": "Technique", "description": "", "variable": "tch-close_it_out{0}", "title": "Close it Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Obtuse": {
				"name": "Tech_Obtuse", "fieldName": "tech_obtuse", "group": "Technique", "description": "", "variable": "tch-obtuse{0}", "title": "Obtuse", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reconsider": {
				"name": "Tech_Reconsider", "fieldName": "tech_reconsider", "group": "Technique", "description": "", "variable": "tch-reconsider{0}", "title": "Reconsider", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Evil Eye": {
				"name": "Tech_Evil Eye", "fieldName": "tech_evil_eye", "group": "Technique", "description": "", "variable": "tch-evil_eye{0}", "title": "Evil Eye", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Seeds of Doubt": {
				"name": "Tech_Seeds of Doubt", "fieldName": "tech_seeds_of_doubt", "group": "Technique", "description": "", "variable": "tch-seeds_of_doubt{0}", "title": "Seeds of Doubt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_White Lie": {
				"name": "Tech_White Lie", "fieldName": "tech_white_lie", "group": "Technique", "description": "", "variable": "tch-white_lie{0}", "title": "White Lie", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reel'Em In": {
				"name": "Tech_Reel'Em In", "fieldName": "tech_reel'em_in", "group": "Technique", "description": "", "variable": "tch-reel'em_in{0}", "title": "Reel'Em In", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Pole Vault": {
				"name": "Tech_Pole Vault", "fieldName": "tech_pole_vault", "group": "Technique", "description": "", "variable": "tch-pole_vault{0}", "title": "Pole Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Draw": {
				"name": "Tech_Quick Draw", "fieldName": "tech_quick_draw", "group": "Technique", "description": "", "variable": "tch-quick_draw{0}", "title": "Quick Draw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extension Strike": {
				"name": "Tech_Extension Strike", "fieldName": "tech_extension_strike", "group": "Technique", "description": "", "variable": "tch-extension_strike{0}", "title": "Extension Strike", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Step Extension": {
				"name": "Tech_Step Extension", "fieldName": "tech_step_extension", "group": "Technique", "description": "", "variable": "tch-step_extension{0}", "title": "Step Extension", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lasting Extension": {
				"name": "Tech_Lasting Extension", "fieldName": "tech_lasting_extension", "group": "Technique", "description": "", "variable": "tch-lasting_extension{0}", "title": "Lasting Extension", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Far Strike": {
				"name": "Tech_Far Strike", "fieldName": "tech_far_strike", "group": "Technique", "description": "", "variable": "tch-far_strike{0}", "title": "Far Strike", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extension Strike +": {
				"name": "Tech_Extension Strike +", "fieldName": "tech_extension_strike_+", "group": "Technique", "description": "", "variable": "tch-extension_strike_+{0}", "title": "Extension Strike +", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Slash": {
				"name": "Tech_Quick Slash", "fieldName": "tech_quick_slash", "group": "Technique", "description": "", "variable": "tch-quick_slash{0}", "title": "Quick Slash", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Precision Blade": {
				"name": "Tech_Precision Blade", "fieldName": "tech_precision_blade", "group": "Technique", "description": "", "variable": "tch-precision_blade{0}", "title": "Precision Blade", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Armor Piercer": {
				"name": "Tech_Armor Piercer", "fieldName": "tech_armor_piercer", "group": "Technique", "description": "", "variable": "tch-armor_piercer{0}", "title": "Armor Piercer", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Quick Slash II": {
				"name": "Tech_Quick Slash II", "fieldName": "tech_quick_slash_ii", "group": "Technique", "description": "", "variable": "tch-quick_slash_ii{0}", "title": "Quick Slash II", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Cleave": {
				"name": "Tech_Cleave", "fieldName": "tech_cleave", "group": "Technique", "description": "", "variable": "tch-cleave{0}", "title": "Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Crushing Blade": {
				"name": "Tech_Crushing Blade", "fieldName": "tech_crushing_blade", "group": "Technique", "description": "", "variable": "tch-crushing_blade{0}", "title": "Crushing Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Cleave": {
				"name": "Tech_Great Cleave", "fieldName": "tech_great_cleave", "group": "Technique", "description": "", "variable": "tch-great_cleave{0}", "title": "Great Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cleave +": {
				"name": "Tech_Cleave +", "fieldName": "tech_cleave_+", "group": "Technique", "description": "", "variable": "tch-cleave_+{0}", "title": "Cleave +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sudden Cleave": {
				"name": "Tech_Sudden Cleave", "fieldName": "tech_sudden_cleave", "group": "Technique", "description": "", "variable": "tch-sudden_cleave{0}", "title": "Sudden Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Cleave II": {
				"name": "Tech_Great Cleave II", "fieldName": "tech_great_cleave_ii", "group": "Technique", "description": "", "variable": "tch-great_cleave_ii{0}", "title": "Great Cleave II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Power Flex": {
				"name": "Tech_Power Flex", "fieldName": "tech_power_flex", "group": "Technique", "description": "", "variable": "tch-power_flex{0}", "title": "Power Flex", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Crush Knuckle": {
				"name": "Tech_Crush Knuckle", "fieldName": "tech_crush_knuckle", "group": "Technique", "description": "", "variable": "tch-crush_knuckle{0}", "title": "Crush Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Impact Knuckle": {
				"name": "Tech_Impact Knuckle", "fieldName": "tech_impact_knuckle", "group": "Technique", "description": "", "variable": "tch-impact_knuckle{0}", "title": "Impact Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knuckle Flurry": {
				"name": "Tech_Knuckle Flurry", "fieldName": "tech_knuckle_flurry", "group": "Technique", "description": "", "variable": "tch-knuckle_flurry{0}", "title": "Knuckle Flurry", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Water Blast": {
				"name": "Tech_Water Blast", "fieldName": "tech_water_blast", "group": "Technique", "description": "", "variable": "tch-water_blast{0}", "title": "Water Blast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Geyser": {
				"name": "Tech_Geyser", "fieldName": "tech_geyser", "group": "Technique", "description": "", "variable": "tch-geyser{0}", "title": "Geyser", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Geyser Line": {
				"name": "Tech_Geyser Line", "fieldName": "tech_geyser_line", "group": "Technique", "description": "", "variable": "tch-geyser_line{0}", "title": "Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Surf": {
				"name": "Tech_Surf", "fieldName": "tech_surf", "group": "Technique", "description": "", "variable": "tch-surf{0}", "title": "Surf", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Geyser Line": {
				"name": "Tech_Great Geyser Line", "fieldName": "tech_great_geyser_line", "group": "Technique", "description": "", "variable": "tch-great_geyser_line{0}", "title": "Great Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tidal Wave": {
				"name": "Tech_Tidal Wave", "fieldName": "tech_tidal_wave", "group": "Technique", "description": "", "variable": "tch-tidal_wave{0}", "title": "Tidal Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Surge": {
				"name": "Tech_Sand Surge", "fieldName": "tech_sand_surge", "group": "Technique", "description": "", "variable": "tch-sand_surge{0}", "title": "Sand Surge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Spout": {
				"name": "Tech_Sand Spout", "fieldName": "tech_sand_spout", "group": "Technique", "description": "", "variable": "tch-sand_spout{0}", "title": "Sand Spout", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Wave": {
				"name": "Tech_Sand Wave", "fieldName": "tech_sand_wave", "group": "Technique", "description": "", "variable": "tch-sand_wave{0}", "title": "Sand Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Launcher": {
				"name": "Tech_Sand Launcher", "fieldName": "tech_sand_launcher", "group": "Technique", "description": "", "variable": "tch-sand_launcher{0}", "title": "Sand Launcher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sicken": {
				"name": "Tech_Sicken", "fieldName": "tech_sicken", "group": "Technique", "description": "", "variable": "tch-sicken{0}", "title": "Sicken", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Spores": {
				"name": "Tech_Spores", "fieldName": "tech_spores", "group": "Technique", "description": "", "variable": "tch-spores{0}", "title": "Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sickening Cloud": {
				"name": "Tech_Sickening Cloud", "fieldName": "tech_sickening_cloud", "group": "Technique", "description": "", "variable": "tch-sickening_cloud{0}", "title": "Sickening Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Virulent Spores": {
				"name": "Tech_Virulent Spores", "fieldName": "tech_virulent_spores", "group": "Technique", "description": "", "variable": "tch-virulent_spores{0}", "title": "Virulent Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Firebolt": {
				"name": "Tech_Firebolt", "fieldName": "tech_firebolt", "group": "Technique", "description": "", "variable": "tch-firebolt{0}", "title": "Firebolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Flame Arrow": {
				"name": "Tech_Flame Arrow", "fieldName": "tech_flame_arrow", "group": "Technique", "description": "", "variable": "tch-flame_arrow{0}", "title": "Flame Arrow", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fireball": {
				"name": "Tech_Fireball", "fieldName": "tech_fireball", "group": "Technique", "description": "", "variable": "tch-fireball{0}", "title": "Fireball", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fireblast": {
				"name": "Tech_Fireblast", "fieldName": "tech_fireblast", "group": "Technique", "description": "", "variable": "tch-fireblast{0}", "title": "Fireblast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ragnarok": {
				"name": "Tech_Ragnarok", "fieldName": "tech_ragnarok", "group": "Technique", "description": "", "variable": "tch-ragnarok{0}", "title": "Ragnarok", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bonfire": {
				"name": "Tech_Bonfire", "fieldName": "tech_bonfire", "group": "Technique", "description": "", "variable": "tch-bonfire{0}", "title": "Bonfire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wall of Fire": {
				"name": "Tech_Wall of Fire", "fieldName": "tech_wall_of_fire", "group": "Technique", "description": "", "variable": "tch-wall_of_fire{0}", "title": "Wall of Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Field of Flame": {
				"name": "Tech_Field of Flame", "fieldName": "tech_field_of_flame", "group": "Technique", "description": "", "variable": "tch-field_of_flame{0}", "title": "Field of Flame", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lightning Shaft": {
				"name": "Tech_Lightning Shaft", "fieldName": "tech_lightning_shaft", "group": "Technique", "description": "", "variable": "tch-lightning_shaft{0}", "title": "Lightning Shaft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shock": {
				"name": "Tech_Shock", "fieldName": "tech_shock", "group": "Technique", "description": "", "variable": "tch-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lightning Bolt": {
				"name": "Tech_Lightning Bolt", "fieldName": "tech_lightning_bolt", "group": "Technique", "description": "", "variable": "tch-lightning_bolt{0}", "title": "Lightning Bolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Plasma Arc": {
				"name": "Tech_Plasma Arc", "fieldName": "tech_plasma_arc", "group": "Technique", "description": "", "variable": "tch-plasma_arc{0}", "title": "Plasma Arc", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fulgor": {
				"name": "Tech_Fulgor", "fieldName": "tech_fulgor", "group": "Technique", "description": "", "variable": "tch-fulgor{0}", "title": "Fulgor", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Snap": {
				"name": "Tech_Cold Snap", "fieldName": "tech_cold_snap", "group": "Technique", "description": "", "variable": "tch-cold_snap{0}", "title": "Cold Snap", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Frostbite": {
				"name": "Tech_Frostbite", "fieldName": "tech_frostbite", "group": "Technique", "description": "", "variable": "tch-frostbite{0}", "title": "Frostbite", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Freezebind": {
				"name": "Tech_Freezebind", "fieldName": "tech_freezebind", "group": "Technique", "description": "", "variable": "tch-freezebind{0}", "title": "Freezebind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Burst": {
				"name": "Tech_Cold Burst", "fieldName": "tech_cold_burst", "group": "Technique", "description": "", "variable": "tch-cold_burst{0}", "title": "Cold Burst", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Front": {
				"name": "Tech_Cold Front", "fieldName": "tech_cold_front", "group": "Technique", "description": "", "variable": "tch-cold_front{0}", "title": "Cold Front", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Diamond Dust": {
				"name": "Tech_Diamond Dust", "fieldName": "tech_diamond_dust", "group": "Technique", "description": "", "variable": "tch-diamond_dust{0}", "title": "Diamond Dust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wind Bullet": {
				"name": "Tech_Wind Bullet", "fieldName": "tech_wind_bullet", "group": "Technique", "description": "", "variable": "tch-wind_bullet{0}", "title": "Wind Bullet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Gust": {
				"name": "Tech_Gust", "fieldName": "tech_gust", "group": "Technique", "description": "", "variable": "tch-gust{0}", "title": "Gust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Windsweep": {
				"name": "Tech_Windsweep", "fieldName": "tech_windsweep", "group": "Technique", "description": "", "variable": "tch-windsweep{0}", "title": "Windsweep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Gale": {
				"name": "Tech_Gale", "fieldName": "tech_gale", "group": "Technique", "description": "", "variable": "tch-gale{0}", "title": "Gale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Darkness": {
				"name": "Tech_Darkness", "fieldName": "tech_darkness", "group": "Technique", "description": "", "variable": "tch-darkness{0}", "title": "Darkness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shadow Wall": {
				"name": "Tech_Shadow Wall", "fieldName": "tech_shadow_wall", "group": "Technique", "description": "", "variable": "tch-shadow_wall{0}", "title": "Shadow Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Nightfall": {
				"name": "Tech_Nightfall", "fieldName": "tech_nightfall", "group": "Technique", "description": "", "variable": "tch-nightfall{0}", "title": "Nightfall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fog Cloud": {
				"name": "Tech_Fog Cloud", "fieldName": "tech_fog_cloud", "group": "Technique", "description": "", "variable": "tch-fog_cloud{0}", "title": "Fog Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sleet": {
				"name": "Tech_Sleet", "fieldName": "tech_sleet", "group": "Technique", "description": "", "variable": "tch-sleet{0}", "title": "Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Freezing Sleet": {
				"name": "Tech_Freezing Sleet", "fieldName": "tech_freezing_sleet", "group": "Technique", "description": "", "variable": "tch-freezing_sleet{0}", "title": "Freezing Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Hail": {
				"name": "Tech_Hail", "fieldName": "tech_hail", "group": "Technique", "description": "", "variable": "tch-hail{0}", "title": "Hail", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Binding Sleet": {
				"name": "Tech_Binding Sleet", "fieldName": "tech_binding_sleet", "group": "Technique", "description": "", "variable": "tch-binding_sleet{0}", "title": "Binding Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ice Storm": {
				"name": "Tech_Ice Storm", "fieldName": "tech_ice_storm", "group": "Technique", "description": "", "variable": "tch-ice_storm{0}", "title": "Ice Storm", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fimbulwinter": {
				"name": "Tech_Fimbulwinter", "fieldName": "tech_fimbulwinter", "group": "Technique", "description": "", "variable": "tch-fimbulwinter{0}", "title": "Fimbulwinter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Smoke Cloud": {
				"name": "Tech_Smoke Cloud", "fieldName": "tech_smoke_cloud", "group": "Technique", "description": "", "variable": "tch-smoke_cloud{0}", "title": "Smoke Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Burning Smoke": {
				"name": "Tech_Burning Smoke", "fieldName": "tech_burning_smoke", "group": "Technique", "description": "", "variable": "tch-burning_smoke{0}", "title": "Burning Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Choking Smoke": {
				"name": "Tech_Choking Smoke", "fieldName": "tech_choking_smoke", "group": "Technique", "description": "", "variable": "tch-choking_smoke{0}", "title": "Choking Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Acceleration": {
				"name": "Tech_Acceleration", "fieldName": "tech_acceleration", "group": "Technique", "description": "", "variable": "tch-acceleration{0}", "title": "Acceleration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Power Vault": {
				"name": "Tech_Power Vault", "fieldName": "tech_power_vault", "group": "Technique", "description": "", "variable": "tch-power_vault{0}", "title": "Power Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Expeditious": {
				"name": "Tech_Expeditious", "fieldName": "tech_expeditious", "group": "Technique", "description": "", "variable": "tch-expeditious{0}", "title": "Expeditious", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Climb": {
				"name": "Tech_Quick Climb", "fieldName": "tech_quick_climb", "group": "Technique", "description": "", "variable": "tch-quick_climb{0}", "title": "Quick Climb", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Swim": {
				"name": "Tech_Quick Swim", "fieldName": "tech_quick_swim", "group": "Technique", "description": "", "variable": "tch-quick_swim{0}", "title": "Quick Swim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Poise": {
				"name": "Tech_Poise", "fieldName": "tech_poise", "group": "Technique", "description": "", "variable": "tch-poise{0}", "title": "Poise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cat Fall": {
				"name": "Tech_Cat Fall", "fieldName": "tech_cat_fall", "group": "Technique", "description": "", "variable": "tch-cat_fall{0}", "title": "Cat Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kip Up": {
				"name": "Tech_Kip Up", "fieldName": "tech_kip_up", "group": "Technique", "description": "", "variable": "tch-kip_up{0}", "title": "Kip Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Silent Stride": {
				"name": "Tech_Silent Stride", "fieldName": "tech_silent_stride", "group": "Technique", "description": "", "variable": "tch-silent_stride{0}", "title": "Silent Stride", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shove": {
				"name": "Tech_Shove", "fieldName": "tech_shove", "group": "Technique", "description": "", "variable": "tch-shove{0}", "title": "Shove", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knockdown": {
				"name": "Tech_Knockdown", "fieldName": "tech_knockdown", "group": "Technique", "description": "", "variable": "tch-knockdown{0}", "title": "Knockdown", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tumble": {
				"name": "Tech_Tumble", "fieldName": "tech_tumble", "group": "Technique", "description": "", "variable": "tch-tumble{0}", "title": "Tumble", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Field Medic": {
				"name": "Tech_Field Medic", "fieldName": "tech_field_medic", "group": "Technique", "description": "", "variable": "tch-field_medic{0}", "title": "Field Medic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Camoflauge": {
				"name": "Tech_Camoflauge", "fieldName": "tech_camoflauge", "group": "Technique", "description": "", "variable": "tch-camoflauge{0}", "title": "Camoflauge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Blurred Light": {
				"name": "Tech_Blurred Light", "fieldName": "tech_blurred_light", "group": "Technique", "description": "", "variable": "tch-blurred_light{0}", "title": "Blurred Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Light Refraction": {
				"name": "Tech_Light Refraction", "fieldName": "tech_light_refraction", "group": "Technique", "description": "", "variable": "tch-light_refraction{0}", "title": "Light Refraction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shadow Steps": {
				"name": "Tech_Shadow Steps", "fieldName": "tech_shadow_steps", "group": "Technique", "description": "", "variable": "tch-shadow_steps{0}", "title": "Shadow Steps", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shadow Walker": {
				"name": "Tech_Shadow Walker", "fieldName": "tech_shadow_walker", "group": "Technique", "description": "", "variable": "tch-shadow_walker{0}", "title": "Shadow Walker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wind Step": {
				"name": "Tech_Wind Step", "fieldName": "tech_wind_step", "group": "Technique", "description": "", "variable": "tch-wind_step{0}", "title": "Wind Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Updraft": {
				"name": "Tech_Updraft", "fieldName": "tech_updraft", "group": "Technique", "description": "", "variable": "tch-updraft{0}", "title": "Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Clouded Updraft": {
				"name": "Tech_Clouded Updraft", "fieldName": "tech_clouded_updraft", "group": "Technique", "description": "", "variable": "tch-clouded_updraft{0}", "title": "Clouded Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wind Fall": {
				"name": "Tech_Wind Fall", "fieldName": "tech_wind_fall", "group": "Technique", "description": "", "variable": "tch-wind_fall{0}", "title": "Wind Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Walk on Air": {
				"name": "Tech_Walk on Air", "fieldName": "tech_walk_on_air", "group": "Technique", "description": "", "variable": "tch-walk_on_air{0}", "title": "Walk on Air", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fire Step": {
				"name": "Tech_Fire Step", "fieldName": "tech_fire_step", "group": "Technique", "description": "", "variable": "tch-fire_step{0}", "title": "Fire Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Liftoff": {
				"name": "Tech_Liftoff", "fieldName": "tech_liftoff", "group": "Technique", "description": "", "variable": "tch-liftoff{0}", "title": "Liftoff", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Jet": {
				"name": "Tech_Jet", "fieldName": "tech_jet", "group": "Technique", "description": "", "variable": "tch-jet{0}", "title": "Jet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cunning Action": {
				"name": "Tech_Cunning Action", "fieldName": "tech_cunning_action", "group": "Technique", "description": "", "variable": "tch-cunning_action{0}", "title": "Cunning Action", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Demoralize": {
				"name": "Tech_Demoralize", "fieldName": "tech_demoralize", "group": "Technique", "description": "", "variable": "tch-demoralize{0}", "title": "Demoralize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fascinate": {
				"name": "Tech_Fascinate", "fieldName": "tech_fascinate", "group": "Technique", "description": "", "variable": "tch-fascinate{0}", "title": "Fascinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Impersonator": {
				"name": "Tech_Impersonator", "fieldName": "tech_impersonator", "group": "Technique", "description": "", "variable": "tch-impersonator{0}", "title": "Impersonator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ether Sense": {
				"name": "Tech_Ether Sense", "fieldName": "tech_ether_sense", "group": "Technique", "description": "", "variable": "tch-ether_sense{0}", "title": "Ether Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Spirit Sense": {
				"name": "Tech_Spirit Sense", "fieldName": "tech_spirit_sense", "group": "Technique", "description": "", "variable": "tch-spirit_sense{0}", "title": "Spirit Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tremorsense": {
				"name": "Tech_Tremorsense", "fieldName": "tech_tremorsense", "group": "Technique", "description": "", "variable": "tch-tremorsense{0}", "title": "Tremorsense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dustcraft": {
				"name": "Tech_Dustcraft", "fieldName": "tech_dustcraft", "group": "Technique", "description": "", "variable": "tch-dustcraft{0}", "title": "Dustcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shape Material": {
				"name": "Tech_Shape Material", "fieldName": "tech_shape_material", "group": "Technique", "description": "", "variable": "tch-shape_material{0}", "title": "Shape Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quickcraft": {
				"name": "Tech_Quickcraft", "fieldName": "tech_quickcraft", "group": "Technique", "description": "", "variable": "tch-quickcraft{0}", "title": "Quickcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Improved Shaping": {
				"name": "Tech_Improved Shaping", "fieldName": "tech_improved_shaping", "group": "Technique", "description": "", "variable": "tch-improved_shaping{0}", "title": "Improved Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Greater Shaping": {
				"name": "Tech_Greater Shaping", "fieldName": "tech_greater_shaping", "group": "Technique", "description": "", "variable": "tch-greater_shaping{0}", "title": "Greater Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Legendary Shaping": {
				"name": "Tech_Legendary Shaping", "fieldName": "tech_legendary_shaping", "group": "Technique", "description": "", "variable": "tch-legendary_shaping{0}", "title": "Legendary Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dust Material": {
				"name": "Tech_Dust Material", "fieldName": "tech_dust_material", "group": "Technique", "description": "", "variable": "tch-dust_material{0}", "title": "Dust Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dust Area": {
				"name": "Tech_Dust Area", "fieldName": "tech_dust_area", "group": "Technique", "description": "", "variable": "tch-dust_area{0}", "title": "Dust Area", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Improved Dusting": {
				"name": "Tech_Improved Dusting", "fieldName": "tech_improved_dusting", "group": "Technique", "description": "", "variable": "tch-improved_dusting{0}", "title": "Improved Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Greater Dusting": {
				"name": "Tech_Greater Dusting", "fieldName": "tech_greater_dusting", "group": "Technique", "description": "", "variable": "tch-greater_dusting{0}", "title": "Greater Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": []
				,
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Legendary Dusting": {
				"name": "Tech_Legendary Dusting", "fieldName": "tech_legendary_dusting", "group": "Technique", "description": "", "variable": "tch-legendary_dusting{0}", "title": "Legendary Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Form Path": {
				"name": "Tech_Form Path", "fieldName": "tech_form_path", "group": "Technique", "description": "", "variable": "tch-form_path{0}", "title": "Form Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Form Pillar": {
				"name": "Tech_Form Pillar", "fieldName": "tech_form_pillar", "group": "Technique", "description": "", "variable": "tch-form_pillar{0}", "title": "Form Pillar", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stepping Path": {
				"name": "Tech_Stepping Path", "fieldName": "tech_stepping_path", "group": "Technique", "description": "", "variable": "tch-stepping_path{0}", "title": "Stepping Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Form Wall": {
				"name": "Tech_Form Wall", "fieldName": "tech_form_wall", "group": "Technique", "description": "", "variable": "tch-form_wall{0}", "title": "Form Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Scattered Pillars": {
				"name": "Tech_Scattered Pillars", "fieldName": "tech_scattered_pillars", "group": "Technique", "description": "", "variable": "tch-scattered_pillars{0}", "title": "Scattered Pillars", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Wall": {
				"name": "Tech_Great Wall", "fieldName": "tech_great_wall", "group": "Technique", "description": "", "variable": "tch-great_wall{0}", "title": "Great Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cultivate": {
				"name": "Tech_Cultivate", "fieldName": "tech_cultivate", "group": "Technique", "description": "", "variable": "tch-cultivate{0}", "title": "Cultivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Entangle": {
				"name": "Tech_Entangle", "fieldName": "tech_entangle", "group": "Technique", "description": "", "variable": "tch-entangle{0}", "title": "Entangle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wildwood": {
				"name": "Tech_Wildwood", "fieldName": "tech_wildwood", "group": "Technique", "description": "", "variable": "tch-wildwood{0}", "title": "Wildwood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Distortion": {
				"name": "Tech_Distortion", "fieldName": "tech_distortion", "group": "Technique", "description": "", "variable": "tch-distortion{0}", "title": "Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lasting Distortion": {
				"name": "Tech_Lasting Distortion", "fieldName": "tech_lasting_distortion", "group": "Technique", "description": "", "variable": "tch-lasting_distortion{0}", "title": "Lasting Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Heat Field": {
				"name": "Tech_Heat Field", "fieldName": "tech_heat_field", "group": "Technique", "description": "", "variable": "tch-heat_field{0}", "title": "Heat Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Burn Guard": {
				"name": "Tech_Burn Guard", "fieldName": "tech_burn_guard", "group": "Technique", "description": "", "variable": "tch-burn_guard{0}", "title": "Burn Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Field": {
				"name": "Tech_Cold Field", "fieldName": "tech_cold_field", "group": "Technique", "description": "", "variable": "tch-cold_field{0}", "title": "Cold Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Chill Guard": {
				"name": "Tech_Chill Guard", "fieldName": "tech_chill_guard", "group": "Technique", "description": "", "variable": "tch-chill_guard{0}", "title": "Chill Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kinesis": {
				"name": "Tech_Kinesis", "fieldName": "tech_kinesis", "group": "Technique", "description": "", "variable": "tch-kinesis{0}", "title": "Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Distant Kinesis": {
				"name": "Tech_Distant Kinesis", "fieldName": "tech_distant_kinesis", "group": "Technique", "description": "", "variable": "tch-distant_kinesis{0}", "title": "Distant Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kinetic Strike": {
				"name": "Tech_Kinetic Strike", "fieldName": "tech_kinetic_strike", "group": "Technique", "description": "", "variable": "tch-kinetic_strike{0}", "title": "Kinetic Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kinetic Throw": {
				"name": "Tech_Kinetic Throw", "fieldName": "tech_kinetic_throw", "group": "Technique", "description": "", "variable": "tch-kinetic_throw{0}", "title": "Kinetic Throw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Heavy Kinesis": {
				"name": "Tech_Heavy Kinesis", "fieldName": "tech_heavy_kinesis", "group": "Technique", "description": "", "variable": "tch-heavy_kinesis{0}", "title": "Heavy Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Burden": {
				"name": "Tech_Burden", "fieldName": "tech_burden", "group": "Technique", "description": "", "variable": "tch-burden{0}", "title": "Burden", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Pressure": {
				"name": "Tech_Pressure", "fieldName": "tech_pressure", "group": "Technique", "description": "", "variable": "tch-pressure{0}", "title": "Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Restrain": {
				"name": "Tech_Restrain", "fieldName": "tech_restrain", "group": "Technique", "description": "", "variable": "tch-restrain{0}", "title": "Restrain", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wide Pressure": {
				"name": "Tech_Wide Pressure", "fieldName": "tech_wide_pressure", "group": "Technique", "description": "", "variable": "tch-wide_pressure{0}", "title": "Wide Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Prostration": {
				"name": "Tech_Prostration", "fieldName": "tech_prostration", "group": "Technique", "description": "", "variable": "tch-prostration{0}", "title": "Prostration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Deep Pressure": {
				"name": "Tech_Deep Pressure", "fieldName": "tech_deep_pressure", "group": "Technique", "description": "", "variable": "tch-deep_pressure{0}", "title": "Deep Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Gravity Well": {
				"name": "Tech_Gravity Well", "fieldName": "tech_gravity_well", "group": "Technique", "description": "", "variable": "tch-gravity_well{0}", "title": "Gravity Well", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shield Block": {
				"name": "Tech_Shield Block", "fieldName": "tech_shield_block", "group": "Technique", "description": "", "variable": "tch-shield_block{0}", "title": "Shield Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Glancing Block": {
				"name": "Tech_Glancing Block", "fieldName": "tech_glancing_block", "group": "Technique", "description": "", "variable": "tch-glancing_block{0}", "title": "Glancing Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Aegis": {
				"name": "Tech_Aegis", "fieldName": "tech_aegis", "group": "Technique", "description": "", "variable": "tch-aegis{0}", "title": "Aegis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Light": {
				"name": "Tech_Light", "fieldName": "tech_light", "group": "Technique", "description": "", "variable": "tch-light{0}", "title": "Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dancing Lights": {
				"name": "Tech_Dancing Lights", "fieldName": "tech_dancing_lights", "group": "Technique", "description": "", "variable": "tch-dancing_lights{0}", "title": "Dancing Lights", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Flash": {
				"name": "Tech_Flash", "fieldName": "tech_flash", "group": "Technique", "description": "", "variable": "tch-flash{0}", "title": "Flash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sunlight": {
				"name": "Tech_Sunlight", "fieldName": "tech_sunlight", "group": "Technique", "description": "", "variable": "tch-sunlight{0}", "title": "Sunlight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stress Release": {
				"name": "Tech_Stress Release", "fieldName": "tech_stress_release", "group": "Technique", "description": "", "variable": "tch-stress_release{0}", "title": "Stress Release", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stress Release +": {
				"name": "Tech_Stress Release +", "fieldName": "tech_stress_release_+", "group": "Technique", "description": "", "variable": "tch-stress_release_+{0}", "title": "Stress Release +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stress Release ++": {
				"name": "Tech_Stress Release ++", "fieldName": "tech_stress_release_++", "group": "Technique", "description": "", "variable": "tch-stress_release_++{0}", "title": "Stress Release ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sensory Training": {
				"name": "Tech_Sensory Training", "fieldName": "tech_sensory_training", "group": "Technique", "description": "", "variable": "tch-sensory_training{0}", "title": "Sensory Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sensory Training +": {
				"name": "Tech_Sensory Training +", "fieldName": "tech_sensory_training_+", "group": "Technique", "description": "", "variable": "tch-sensory_training_+{0}", "title": "Sensory Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Broad Study": {
				"name": "Tech_Broad Study", "fieldName": "tech_broad_study", "group": "Technique", "description": "", "variable": "tch-broad_study{0}", "title": "Broad Study", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Experienced Tracker": {
				"name": "Tech_Experienced Tracker", "fieldName": "tech_experienced_tracker", "group": "Technique", "description": "", "variable": "tch-experienced_tracker{0}", "title": "Experienced Tracker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Multilingual": {
				"name": "Tech_Multilingual", "fieldName": "tech_multilingual", "group": "Technique", "description": "", "variable": "tch-multilingual{0}", "title": "Multilingual", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Multilingual +": {
				"name": "Tech_Multilingual +", "fieldName": "tech_multilingual_+", "group": "Technique", "description": "", "variable": "tch-multilingual_+{0}", "title": "Multilingual +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Specialized Lore": {
				"name": "Tech_Specialized Lore", "fieldName": "tech_specialized_lore", "group": "Technique", "description": "", "variable": "tch-specialized_lore{0}", "title": "Specialized Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Specialized Lore +": {
				"name": "Tech_Specialized Lore +", "fieldName": "tech_specialized_lore_+", "group": "Technique", "description": "", "variable": "tch-specialized_lore_+{0}", "title": "Specialized Lore +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Specialized Lore ++": {
				"name": "Tech_Specialized Lore ++", "fieldName": "tech_specialized_lore_++", "group": "Technique", "description": "", "variable": "tch-specialized_lore_++{0}", "title": "Specialized Lore ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Improved Initiative": {
				"name": "Tech_Improved Initiative", "fieldName": "tech_improved_initiative", "group": "Technique", "description": "", "variable": "tch-improved_initiative{0}", "title": "Improved Initiative", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knowledge Training": {
				"name": "Tech_Knowledge Training", "fieldName": "tech_knowledge_training", "group": "Technique", "description": "", "variable": "tch-knowledge_training{0}", "title": "Knowledge Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knowledge Training +": {
				"name": "Tech_Knowledge Training +", "fieldName": "tech_knowledge_training_+", "group": "Technique", "description": "", "variable": "tch-knowledge_training_+{0}", "title": "Knowledge Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knowledge Training ++": {
				"name": "Tech_Knowledge Training ++", "fieldName": "tech_knowledge_training_++", "group": "Technique", "description": "", "variable": "tch-knowledge_training_++{0}", "title": "Knowledge Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Social Training": {
				"name": "Tech_Social Training", "fieldName": "tech_social_training", "group": "Technique", "description": "", "variable": "tch-social_training{0}", "title": "Social Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Social Training +": {
				"name": "Tech_Social Training +", "fieldName": "tech_social_training_+", "group": "Technique", "description": "", "variable": "tch-social_training_+{0}", "title": "Social Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Social Training ++": {
				"name": "Tech_Social Training ++", "fieldName": "tech_social_training_++", "group": "Technique", "description": "", "variable": "tch-social_training_++{0}", "title": "Social Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Refocus": {
				"name": "Tech_Refocus", "fieldName": "tech_refocus", "group": "Technique", "description": "", "variable": "tch-refocus{0}", "title": "Refocus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Refocus +": {
				"name": "Tech_Refocus +", "fieldName": "tech_refocus_+", "group": "Technique", "description": "", "variable": "tch-refocus_+{0}", "title": "Refocus +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sustained Channel": {
				"name": "Tech_Sustained Channel", "fieldName": "tech_sustained_channel", "group": "Technique", "description": "", "variable": "tch-sustained_channel{0}", "title": "Sustained Channel", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sustained Channel +": {
				"name": "Tech_Sustained Channel +", "fieldName": "tech_sustained_channel_+", "group": "Technique", "description": "", "variable": "tch-sustained_channel_+{0}", "title": "Sustained Channel +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ki Control": {
				"name": "Tech_Ki Control", "fieldName": "tech_ki_control", "group": "Technique", "description": "", "variable": "tch-ki_control{0}", "title": "Ki Control", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ki Control +": {
				"name": "Tech_Ki Control +", "fieldName": "tech_ki_control_+", "group": "Technique", "description": "", "variable": "tch-ki_control_+{0}", "title": "Ki Control +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ki Control ++": {
				"name": "Tech_Ki Control ++", "fieldName": "tech_ki_control_++", "group": "Technique", "description": "", "variable": "tch-ki_control_++{0}", "title": "Ki Control ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Surge Value": {
				"name": "Tech_Surge Value", "fieldName": "tech_surge_value", "group": "Technique", "description": "", "variable": "tch-surge_value{0}", "title": "Surge Value", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Surge Value +": {
				"name": "Tech_Surge Value +", "fieldName": "tech_surge_value_+", "group": "Technique", "description": "", "variable": "tch-surge_value_+{0}", "title": "Surge Value +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Channel Training": {
				"name": "Tech_Channel Training", "fieldName": "tech_channel_training", "group": "Technique", "description": "", "variable": "tch-channel_training{0}", "title": "Channel Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Channel Training +": {
				"name": "Tech_Channel Training +", "fieldName": "tech_channel_training_+", "group": "Technique", "description": "", "variable": "tch-channel_training_+{0}", "title": "Channel Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Channel Training ++": {
				"name": "Tech_Channel Training ++", "fieldName": "tech_channel_training_++", "group": "Technique", "description": "", "variable": "tch-channel_training_++{0}", "title": "Channel Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Physical Training": {
				"name": "Tech_Physical Training", "fieldName": "tech_physical_training", "group": "Technique", "description": "", "variable": "tch-physical_training{0}", "title": "Physical Training", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Physical Training +": {
				"name": "Tech_Physical Training +", "fieldName": "tech_physical_training_+", "group": "Technique", "description": "", "variable": "tch-physical_training_+{0}", "title": "Physical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Body Training": {
				"name": "Tech_Body Training", "fieldName": "tech_body_training", "group": "Technique", "description": "", "variable": "tch-body_training{0}", "title": "Body Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Body Training +": {
				"name": "Tech_Body Training +", "fieldName": "tech_body_training_+", "group": "Technique", "description": "", "variable": "tch-body_training_+{0}", "title": "Body Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Body Training ++": {
				"name": "Tech_Body Training ++", "fieldName": "tech_body_training_++", "group": "Technique", "description": "", "variable": "tch-body_training_++{0}", "title": "Body Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Technical Training": {
				"name": "Tech_Technical Training", "fieldName": "tech_technical_training", "group": "Technique", "description": "", "variable": "tch-technical_training{0}", "title": "Technical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Technical Training +": {
				"name": "Tech_Technical Training +", "fieldName": "tech_technical_training_+", "group": "Technique", "description": "", "variable": "tch-technical_training_+{0}", "title": "Technical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Technical Training ++": {
				"name": "Tech_Technical Training ++", "fieldName": "tech_technical_training_++", "group": "Technique", "description": "", "variable": "tch-technical_training_++{0}", "title": "Technical Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Martial Training": {
				"name": "Tech_Martial Training", "fieldName": "tech_martial_training", "group": "Technique", "description": "", "variable": "tch-martial_training{0}", "title": "Martial Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Martial Training +": {
				"name": "Tech_Martial Training +", "fieldName": "tech_martial_training_+", "group": "Technique", "description": "", "variable": "tch-martial_training_+{0}", "title": "Martial Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Martial Training ++": {
				"name": "Tech_Martial Training ++", "fieldName": "tech_martial_training_++", "group": "Technique", "description": "", "variable": "tch-martial_training_++{0}", "title": "Martial Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_HP Up": {
				"name": "Tech_HP Up", "fieldName": "tech_hp_up", "group": "Technique", "description": "", "variable": "tch-hp_up{0}", "title": "HP Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_HP Up+": {
				"name": "Tech_HP Up+", "fieldName": "tech_hp_up+", "group": "Technique", "description": "", "variable": "tch-hp_up+{0}", "title": "HP Up+", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_HP Up++": {
				"name": "Tech_HP Up++", "fieldName": "tech_hp_up++", "group": "Technique", "description": "", "variable": "tch-hp_up++{0}", "title": "HP Up++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Vitality Boost": {
				"name": "Tech_Vitality Boost", "fieldName": "tech_vitality_boost", "group": "Technique", "description": "", "variable": "tch-vitality_boost{0}", "title": "Vitality Boost", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Vitality Boost +": {
				"name": "Tech_Vitality Boost +", "fieldName": "tech_vitality_boost_+", "group": "Technique", "description": "", "variable": "tch-vitality_boost_+{0}", "title": "Vitality Boost +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Vitality Boost ++": {
				"name": "Tech_Vitality Boost ++", "fieldName": "tech_vitality_boost_++", "group": "Technique", "description": "", "variable": "tch-vitality_boost_++{0}", "title": "Vitality Boost ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Undying": {
				"name": "Tech_Undying", "fieldName": "tech_undying", "group": "Technique", "description": "", "variable": "tch-undying{0}", "title": "Undying", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Undying +": {
				"name": "Tech_Undying +", "fieldName": "tech_undying_+", "group": "Technique", "description": "", "variable": "tch-undying_+{0}", "title": "Undying +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extra Follow-Up Attack": {
				"name": "Tech_Extra Follow-Up Attack", "fieldName": "tech_extra_follow-up_attack", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack{0}", "title": "Extra Follow-Up Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extra Follow-Up Attack +": {
				"name": "Tech_Extra Follow-Up Attack +", "fieldName": "tech_extra_follow-up_attack_+", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack_+{0}", "title": "Extra Follow-Up Attack +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Change Tech Slots": {
				"name": "Tech_Change Tech Slots", "fieldName": "tech_change_tech_slots", "group": "Technique", "description": "", "variable": "tch-change_tech_slots{0}", "title": "Change Tech Slots", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Hold Out": {
				"name": "Tech_Hold Out", "fieldName": "tech_hold_out", "group": "Technique", "description": "", "variable": "tch-hold_out{0}", "title": "Hold Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Overdrive": {
				"name": "Tech_Overdrive", "fieldName": "tech_overdrive", "group": "Technique", "description": "", "variable": "tch-overdrive{0}", "title": "Overdrive", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			}
		},
		sortingGroups = {
			"group": { "Type": ["Attribute", "Skill", "Job", "JobStyle", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "General", "Chat", "Combat", "Social", "SeverityRank", "DamageType", "Trait", "Status", "Condition", "Emotion", "Boon"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error"], "AffinityType": ["Wood", "Fire", "Earth", "Metal", "Water"], "InnateDefenseType": ["BOD", "PRC", "QCK"], "InnateSenseType": ["CNV", "INT", "RSN"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "JobTier": ["JobTier0", "JobTier1", "JobTier2", "JobTier3"], "LoreTier": ["LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3"], "GeneralLoreTier": ["GeneralLoreTier0", "GeneralLoreTier1"], "LoreCategory": ["Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "LoreCat_Academics", "LoreCat_Profession", "LoreCat_Craftmanship", "LoreCat_Geography", "LoreCat_History", "LoreCat_Culture", "LoreCat_Religion"], "ChatType": ["Speak", "Whisper", "Yell", "Think", "Describe"], "PageSet": ["PageSet_Character Creator", "PageSet_Core", "PageSet_TechType", "PageSet_Advancement", "PageSet_Training"], "Page": ["Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement"], "Title": ["Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_AdvancementConversion", "Title_Training", "Title_TrainingConversion", "Title_ShowTechnique", "Title_UseTechnique", "Title_Chat", "Title_LanguageSelect", "Title_Emotes", "Title_Outfits", "Title_TechEffect", "Title_TechDC", "Title_TechDefense", "Title_Boon"], "Chat": ["Chat_Type", "Chat_Target", "Chat_Message", "Chat_Language", "Chat_LanguageTag", "Chat_PostContent", "Chat_SetId", "Chat_Emotes", "Chat_DefaultEmote", "Chat_PostName", "Chat_PostURL", "Chat_OutfitName", "Chat_OutfitEmotes", "Chat_EmoteName", "Chat_EmoteURL", "Chat_OutfitDefault", "Chat_OutfitDefaultURL"], "Untyped": ["RepeatingActiveEmotes", "RepeatingOutfits", "Resistance", "Dash", "MaxDash", "RepeatingInfluences"], "Advancement": ["Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "LearnStyle", "StyleTechniques", "StyleFreeTechniques"], "Training": ["TrainingKnowledge", "TrainingTechniques", "PP"], "Attribute": ["Attr_BOD", "Attr_PRC", "Attr_QCK", "Attr_CNV", "Attr_INT", "Attr_RSN"], "Defense": ["Def_Brace", "Def_Fortitude", "Def_Disruption", "Def_Hide", "Def_Reflex", "Def_Evasion"], "Sense": ["Def_Insight", "Def_Notice", "Def_Guile", "Def_Scrutiny", "Def_Resolve", "Def_Freewill"], "Special Defense": ["CombatDefense", "SocialSense"], "Result": ["WillBreak"], "Origin": ["FullName", "DisplayName", "Background", "Age", "Gender", "Homeland"], "OriginStat": ["Affinity", "InnateDefense", "InnateSense"], "Boon": ["Boon_Rest", "Boon_Nourishment", "Boon_Inspiration"], "General": ["HP", "WILL", "EN", "Initiative", "Recall", "Power", "Accuracy", "Spellforce", "Charisma", "Carrying Capacity"], "Combat": ["Cmb_Chakra", "Cmb_HV", "Cmb_Armor", "Cmb_ResistanceDesc", "Cmb_WeaknessDesc", "Cmb_Vitality", "Cmb_Surge", "Cmb_Mv", "Cmb_MvPotency"], "": ["Chakra"], "Social": ["Soc_Favor", "Soc_Influence", "Soc_Severity", "Soc_PersuadeCheck", "Soc_PersuadeRequest", "Soc_Patience"], "InfluenceType": ["InfluenceTrait", "InfluenceIdeal", "InfluenceBond", "InfluenceGoal"], "SeverityRank": ["Svr_LowSeverity", "Svr_ModerateSeverity", "Svr_HighSeverity"], "DamageType": ["Dmg_Burn", "Dmg_Cold", "Dmg_Energy", "Dmg_Fire", "Dmg_Force", "Dmg_Patience", "Dmg_Piercing", "Dmg_Shock", "Dmg_Tension"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Light", "Trait_Sharp", "Trait_Sturdy", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Transparent"], "Style": ["Style_Basic Action", "Style_Basic Attack", "Style_Basic Activity", "Style_Basic Social", "Style_Basic Support", "Style_Charm Unrestrained", "Style_Inspiring Presence", "Style_Deft Negotiator", "Style_Abrasive Wit", "Style_Tyrannical Voice", "Style_Calming Empathy"], "Skill": ["Skill_Acrobatics", "Skill_Alchemy", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Cook", "Skill_Demoralize", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Inspire", "Skill_Might", "Skill_Pilot", "Skill_Rationalize", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Skill_Warding"], "Language": ["Lang_Minere", "Lang_Junal", "Lang_Apollen", "Lang_Lib", "Lang_Cert", "Lang_Byric", "Lang_Dustell", "Lang_Muralic", "Lang_Shira", "Lang_Ciel", "Lang_Citeq", "Lang_Manstan", "Lang_Salkan", "Lang_Sansic", "Lang_Silq", "Lang_Kleikan", "Lang_Crinere", "Lang_Palmic", "Lang_Shorespeak", "Lang_Verdeni", "Lang_Vulca", "Lang_Emotion", "Lang_Empathy", "Lang_Wolfwarg", "Lang_Jovean", "Lang_Mytikan"], "Lore": ["Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "JobStyle": ["JStyle_Interceptor", "JStyle_Guardian", "JStyle_Spellslinger", "JStyle_Warrior", "JStyle_Rogue", "JStyle_Scholar", "JStyle_Physician"], "Status": ["Stat_Downed", "Stat_Dying", "Stat_Engaged", "Stat_Ethereal", "Stat_Grappled", "Stat_Hidden", "Stat_Invisible", "Stat_Multiact", "Stat_Restrained", "Stat_Unconscious", "Stat_Aflame", "Stat_Chilled", "Stat_Delayed", "Stat_Empowered", "Stat_Encumbered", "Stat_Hasted", "Stat_Immobilized", "Stat_Impaired", "Stat_Launched", "Stat_Paralyzed", "Stat_Persevering", "Stat_Prone", "Stat_Sickened", "Stat_Staggered", "Stat_Stunned", "Stat_Angered", "Stat_Disgusted", "Stat_Doubt", "Stat_Encouraged", "Stat_Frightened", "Stat_Flustered", "Stat_Receptive", "Stat_Joyful", "Stat_Saddened", "Stat_Surprised"], "Technique": ["Tech_Hide", "Tech_Mount", "Tech_Move", "Tech_Prepare", "Tech_Interact", "Tech_Detect Ether", "Tech_Detect Creature", "Tech_Dash", "Tech_Break Free", "Tech_Escape", "Tech_Move Silently", "Tech_Reposition", "Tech_Grab an Edge", "Tech_Aid", "Tech_Stabilize", "Tech_Reassure", "Tech_Calm Mind", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Favor", "Tech_Agitate", "Tech_Emphasize", "Tech_Request", "Tech_Sense Motive", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Fighter", "Tech_Fighter II", "Tech_Marksman", "Tech_Marksman II", "Tech_Mage", "Tech_Mage II", "Tech_Teacher", "Tech_Teacher II", "Tech_Influencer", "Tech_Influencer II", "Tech_Motivator", "Tech_Motivator II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Swift Rebuttal", "Tech_Build Pressure", "Tech_Appeal", "Tech_Insist", "Tech_Proposal", "Tech_Advocate", "Tech_Dismiss", "Tech_Flatter", "Tech_Beguile", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Charming Request", "Tech_Pander", "Tech_Flatter II", "Tech_Invigorate", "Tech_Enthusiasm", "Tech_Meditate", "Tech_Zeal", "Tech_Deepen Connection", "Tech_Bravado", "Tech_Motivational Speech", "Tech_Invigorate II", "Tech_Diplomacy", "Tech_Fast Talk", "Tech_Quick Request", "Tech_Segue", "Tech_Increase Tension", "Tech_Diplomacy II", "Tech_Final Push", "Tech_Subvert", "Tech_Indifference", "Tech_Spite", "Tech_Ridicule", "Tech_Unfazed", "Tech_Subvert II", "Tech_Redirect Anger", "Tech_Threaten", "Tech_Taunt", "Tech_Domineer", "Tech_Tyrannize", "Tech_Command", "Tech_Threaten II", "Tech_Rage", "Tech_Tranquility", "Tech_Simple Request", "Tech_Small Talk", "Tech_Guidance", "Tech_Mindfulness", "Tech_Tranquility II", "Tech_Sympathy", "Tech_Serenity of Mind", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Mean", "Tech_Fuel the Fire", "Tech_Veiled Anger", "Tech_Oppress", "Tech_Bellow", "Tech_Bulldoze", "Tech_Enforcement", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Intrigue", "Tech_Consideration", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Close it Out", "Tech_Obtuse", "Tech_Reconsider", "Tech_Evil Eye", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Reel'Em In", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"] }, "subGroup": {
				"": ["Attribute", "Skill", "Job", "JobStyle", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "General", "Chat", "Combat", "Social", "SeverityRank", "DamageType", "Trait", "Status", "Condition", "Emotion", "Boon", "_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "GeneralLoreTier0", "GeneralLoreTier1", "Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "Speak", "Whisper", "Yell", "Think", "Describe", "PageSet_Character Creator", "PageSet_Core", "PageSet_TechType", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_AdvancementConversion", "Title_Training", "Title_TrainingConversion", "Title_ShowTechnique", "Title_UseTechnique", "Title_Chat", "Title_LanguageSelect", "Title_Emotes", "Title_Outfits", "Title_TechEffect", "Title_TechDC", "Title_TechDefense", "Chat_Type", "Chat_Target", "Chat_Message", "Chat_Language", "Chat_LanguageTag", "Chat_PostContent", "RepeatingActiveEmotes", "Chat_SetId", "Chat_Emotes", "Chat_DefaultEmote", "Chat_PostName", "Chat_PostURL", "Chat_OutfitName", "Chat_OutfitEmotes", "Chat_EmoteName", "Chat_EmoteURL", "RepeatingOutfits", "Chat_OutfitDefault", "Chat_OutfitDefaultURL", "Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "LearnStyle", "StyleTechniques", "StyleFreeTechniques", "TrainingKnowledge", "TrainingTechniques", "PP", "WillBreak", "FullName", "DisplayName", "Background", "Age", "Gender", "Homeland", "Affinity", "InnateDefense", "InnateSense", "Title_Boon", "Boon_Rest", "Boon_Nourishment", "Boon_Inspiration", "HP", "WILL", "EN", "Cmb_Chakra", "Chakra", "Initiative", "Recall", "Power", "Accuracy", "Spellforce", "Charisma", "Carrying Capacity", "Cmb_HV", "Cmb_Armor", "Resistance", "Cmb_ResistanceDesc", "Cmb_WeaknessDesc", "Cmb_Vitality", "Cmb_Surge", "Cmb_Mv", "Cmb_MvPotency", "Dash", "MaxDash", "Soc_Favor", "RepeatingInfluences", "Soc_Influence", "InfluenceTrait", "InfluenceIdeal", "InfluenceBond", "InfluenceGoal", "Soc_Severity", "Svr_LowSeverity", "Svr_ModerateSeverity", "Svr_HighSeverity", "Soc_PersuadeCheck", "Soc_PersuadeRequest", "Soc_Patience", "Dmg_Burn", "Dmg_Cold", "Dmg_Energy", "Dmg_Fire", "Dmg_Force", "Dmg_Patience", "Dmg_Piercing", "Dmg_Shock", "Dmg_Tension", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "JStyle_Interceptor", "JStyle_Guardian", "JStyle_Spellslinger", "JStyle_Warrior", "JStyle_Rogue", "JStyle_Scholar", "JStyle_Physician", "Tech_Fighter", "Tech_Fighter II", "Tech_Marksman", "Tech_Marksman II", "Tech_Mage", "Tech_Mage II", "Tech_Teacher", "Tech_Teacher II", "Tech_Influencer", "Tech_Influencer II", "Tech_Motivator", "Tech_Motivator II", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Swift Rebuttal", "Tech_Serenity of Mind", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Mean", "Tech_Fuel the Fire", "Tech_Veiled Anger", "Tech_Oppress", "Tech_Bellow", "Tech_Bulldoze", "Tech_Enforcement", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Intrigue", "Tech_Consideration", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Close it Out", "Tech_Obtuse", "Tech_Reconsider", "Tech_Evil Eye", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Reel'Em In", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "Attribute": ["Attr_BOD", "Attr_PRC", "Attr_QCK", "Attr_CNV", "Attr_INT", "Attr_RSN"], "Combat Defense": ["Def_Brace", "Def_Disruption", "Def_Reflex"], "Defense": ["Def_Fortitude", "Def_Hide", "Def_Evasion"], "Social Sense": ["Def_Insight", "Def_Guile", "Def_Resolve"], "Sense": ["Def_Notice", "Def_Scrutiny", "Def_Freewill"], "Special Defense": ["CombatDefense", "SocialSense"], "Technique Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall"], "Item Trait": ["Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Light", "Trait_Sharp", "Trait_Sturdy"], "Material Trait": ["Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Transparent"], "Basic": ["Style_Basic Action", "Style_Basic Attack", "Style_Basic Activity", "Style_Basic Social", "Style_Basic Support"], "Standard": ["Style_Charm Unrestrained", "Style_Inspiring Presence", "Style_Deft Negotiator", "Style_Abrasive Wit", "Style_Tyrannical Voice", "Style_Calming Empathy"], "Active Skill": ["Skill_Acrobatics", "Skill_Build", "Skill_Channel", "Skill_Enchant", "Skill_Finesse", "Skill_Might", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Throw", "Skill_Traversal", "Skill_Warding"], "Technical Skill": ["Skill_Alchemy", "Skill_Analyze", "Skill_Cook", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Tinker"], "Social Skill": ["Skill_Charm", "Skill_Demoralize", "Skill_Empathy", "Skill_Inspire", "Skill_Rationalize"], "Walthair": ["Lang_Minere", "Lang_Crinere", "Lang_Palmic", "Lang_Shorespeak", "Lang_Verdeni", "Lang_Vulca"], "Aridsha": ["Lang_Junal", "Lang_Byric", "Lang_Dustell", "Lang_Muralic", "Lang_Shira"], "Khem": ["Lang_Apollen", "Lang_Kleikan"], "Colswei": ["Lang_Lib"], "Ceres": ["Lang_Cert", "Lang_Ciel", "Lang_Citeq", "Lang_Manstan", "Lang_Salkan", "Lang_Sansic", "Lang_Silq"], "Special": ["Lang_Emotion", "Lang_Empathy", "Lang_Wolfwarg", "Lang_Jovean", "Lang_Mytikan"], "Academics": ["LoreCat_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology"], "Profession": ["LoreCat_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining"], "Craftmanship": ["LoreCat_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving"], "Geography": ["LoreCat_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane"], "History": ["LoreCat_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History"], "Culture": ["LoreCat_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater"], "Religion": ["LoreCat_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Status": ["Stat_Downed", "Stat_Dying", "Stat_Engaged", "Stat_Ethereal", "Stat_Grappled", "Stat_Hidden", "Stat_Invisible", "Stat_Multiact", "Stat_Restrained", "Stat_Unconscious"], "Condition": ["Stat_Aflame", "Stat_Chilled", "Stat_Delayed", "Stat_Empowered", "Stat_Encumbered", "Stat_Hasted", "Stat_Immobilized", "Stat_Impaired", "Stat_Launched", "Stat_Paralyzed", "Stat_Persevering", "Stat_Prone", "Stat_Sickened", "Stat_Staggered", "Stat_Stunned"], "Emotion": ["Stat_Angered", "Stat_Disgusted", "Stat_Doubt", "Stat_Encouraged", "Stat_Frightened", "Stat_Flustered", "Stat_Receptive", "Stat_Joyful", "Stat_Saddened", "Stat_Surprised"], "Basic Action": ["Tech_Hide", "Tech_Mount", "Tech_Move", "Tech_Prepare", "Tech_Interact", "Tech_Detect Ether", "Tech_Detect Creature", "Tech_Dash"], "Basic Activity": ["Tech_Break Free", "Tech_Escape", "Tech_Move Silently", "Tech_Reposition", "Tech_Grab an Edge"], "Basic Support": ["Tech_Aid", "Tech_Stabilize", "Tech_Reassure", "Tech_Calm Mind"], "Basic Attack": ["Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike"], "Basic Social": ["Tech_Build Favor", "Tech_Agitate", "Tech_Emphasize", "Tech_Request", "Tech_Sense Motive"], "Warrior; Guardian": ["Tech_Defender", "Tech_Defender II"], "Rogue": ["Tech_Athlete", "Tech_Athlete II"], "Warrior": ["Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted"], "Interceptor": ["Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim"], "Spellslinger": ["Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot"], "Guardian": ["Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation"], "Defender": ["Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery"], "Skirmisher": ["Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike"], "Marksman": ["Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike"], "Athlete": ["Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint"], "Deft Negotiator; Tyrannical Voice": ["Tech_Build Pressure", "Tech_Proposal"], "Charm Unrestrained; Calming Empathy": ["Tech_Appeal"], "Inspiring Presence": ["Tech_Insist", "Tech_Invigorate", "Tech_Enthusiasm", "Tech_Meditate", "Tech_Zeal", "Tech_Deepen Connection", "Tech_Bravado", "Tech_Motivational Speech", "Tech_Invigorate II"], "Charm Unrestrained; Inspiring Presence": ["Tech_Advocate"], "Abrasive Wit; Tyrannical Voice": ["Tech_Dismiss"], "Charm Unrestrained": ["Tech_Flatter", "Tech_Beguile", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Charming Request", "Tech_Pander", "Tech_Flatter II"], "Deft Negotiator": ["Tech_Diplomacy", "Tech_Fast Talk", "Tech_Quick Request", "Tech_Segue", "Tech_Increase Tension", "Tech_Diplomacy II", "Tech_Final Push"], "Abrasive Wit": ["Tech_Subvert", "Tech_Indifference", "Tech_Spite", "Tech_Ridicule", "Tech_Unfazed", "Tech_Subvert II", "Tech_Redirect Anger"], "Tyrannical Voice": ["Tech_Threaten", "Tech_Taunt", "Tech_Domineer", "Tech_Tyrannize", "Tech_Command", "Tech_Threaten II", "Tech_Rage"], "Calming Empathy": ["Tech_Tranquility", "Tech_Simple Request", "Tech_Small Talk", "Tech_Guidance", "Tech_Mindfulness", "Tech_Tranquility II", "Tech_Sympathy"], "Ki Extension": ["Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +"], "Swordplay": ["Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II"]
			}, "formulaMods": { "CR": ["Attribute", "Skill", "Job", "Technique", "HP", "WILL", "Cmb_Chakra", "Initiative", "Recall", "Power", "Accuracy", "Spellforce", "Charisma", "Cmb_HV", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Tech_Hide", "Tech_Mount", "Tech_Move", "Tech_Prepare", "Tech_Interact", "Tech_Detect Ether", "Tech_Detect Creature", "Tech_Dash", "Tech_Break Free", "Tech_Escape", "Tech_Move Silently", "Tech_Reposition", "Tech_Grab an Edge", "Tech_Aid", "Tech_Stabilize", "Tech_Reassure", "Tech_Calm Mind", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Favor", "Tech_Agitate", "Tech_Emphasize", "Tech_Request", "Tech_Sense Motive", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Fighter", "Tech_Fighter II", "Tech_Marksman", "Tech_Marksman II", "Tech_Mage", "Tech_Mage II", "Tech_Teacher", "Tech_Teacher II", "Tech_Influencer", "Tech_Influencer II", "Tech_Motivator", "Tech_Motivator II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Swift Rebuttal", "Tech_Build Pressure", "Tech_Appeal", "Tech_Insist", "Tech_Proposal", "Tech_Advocate", "Tech_Dismiss", "Tech_Flatter", "Tech_Beguile", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Charming Request", "Tech_Pander", "Tech_Flatter II", "Tech_Invigorate", "Tech_Enthusiasm", "Tech_Meditate", "Tech_Zeal", "Tech_Deepen Connection", "Tech_Bravado", "Tech_Motivational Speech", "Tech_Invigorate II", "Tech_Diplomacy", "Tech_Fast Talk", "Tech_Quick Request", "Tech_Segue", "Tech_Increase Tension", "Tech_Diplomacy II", "Tech_Final Push", "Tech_Subvert", "Tech_Indifference", "Tech_Spite", "Tech_Ridicule", "Tech_Unfazed", "Tech_Subvert II", "Tech_Redirect Anger", "Tech_Threaten", "Tech_Taunt", "Tech_Domineer", "Tech_Tyrannize", "Tech_Command", "Tech_Threaten II", "Tech_Rage", "Tech_Tranquility", "Tech_Simple Request", "Tech_Small Talk", "Tech_Guidance", "Tech_Mindfulness", "Tech_Tranquility II", "Tech_Sympathy", "Tech_Serenity of Mind", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Mean", "Tech_Fuel the Fire", "Tech_Veiled Anger", "Tech_Oppress", "Tech_Bellow", "Tech_Bulldoze", "Tech_Enforcement", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Intrigue", "Tech_Consideration", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Close it Out", "Tech_Obtuse", "Tech_Reconsider", "Tech_Evil Eye", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Reel'Em In", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "Level": ["Skill", "Technique", "Advancement", "HP", "Tech_Hide", "Tech_Mount", "Tech_Move", "Tech_Prepare", "Tech_Interact", "Tech_Detect Ether", "Tech_Detect Creature", "Tech_Dash", "Tech_Break Free", "Tech_Escape", "Tech_Move Silently", "Tech_Reposition", "Tech_Grab an Edge", "Tech_Aid", "Tech_Stabilize", "Tech_Reassure", "Tech_Calm Mind", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Favor", "Tech_Agitate", "Tech_Emphasize", "Tech_Request", "Tech_Sense Motive", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Fighter", "Tech_Fighter II", "Tech_Marksman", "Tech_Marksman II", "Tech_Mage", "Tech_Mage II", "Tech_Teacher", "Tech_Teacher II", "Tech_Influencer", "Tech_Influencer II", "Tech_Motivator", "Tech_Motivator II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Swift Rebuttal", "Tech_Build Pressure", "Tech_Appeal", "Tech_Insist", "Tech_Proposal", "Tech_Advocate", "Tech_Dismiss", "Tech_Flatter", "Tech_Beguile", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Charming Request", "Tech_Pander", "Tech_Flatter II", "Tech_Invigorate", "Tech_Enthusiasm", "Tech_Meditate", "Tech_Zeal", "Tech_Deepen Connection", "Tech_Bravado", "Tech_Motivational Speech", "Tech_Invigorate II", "Tech_Diplomacy", "Tech_Fast Talk", "Tech_Quick Request", "Tech_Segue", "Tech_Increase Tension", "Tech_Diplomacy II", "Tech_Final Push", "Tech_Subvert", "Tech_Indifference", "Tech_Spite", "Tech_Ridicule", "Tech_Unfazed", "Tech_Subvert II", "Tech_Redirect Anger", "Tech_Threaten", "Tech_Taunt", "Tech_Domineer", "Tech_Tyrannize", "Tech_Command", "Tech_Threaten II", "Tech_Rage", "Tech_Tranquility", "Tech_Simple Request", "Tech_Small Talk", "Tech_Guidance", "Tech_Mindfulness", "Tech_Tranquility II", "Tech_Sympathy", "Tech_Serenity of Mind", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Mean", "Tech_Fuel the Fire", "Tech_Veiled Anger", "Tech_Oppress", "Tech_Bellow", "Tech_Bulldoze", "Tech_Enforcement", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Intrigue", "Tech_Consideration", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Close it Out", "Tech_Obtuse", "Tech_Reconsider", "Tech_Evil Eye", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Reel'Em In", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "AdvancementSkill": ["Skill"], "AdvancementJob": ["Job", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "TrainingKnowledge": ["Knowledge"], "AdvancementTechnique": ["Technique", "Tech_Hide", "Tech_Mount", "Tech_Move", "Tech_Prepare", "Tech_Interact", "Tech_Detect Ether", "Tech_Detect Creature", "Tech_Dash", "Tech_Break Free", "Tech_Escape", "Tech_Move Silently", "Tech_Reposition", "Tech_Grab an Edge", "Tech_Aid", "Tech_Stabilize", "Tech_Reassure", "Tech_Calm Mind", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Favor", "Tech_Agitate", "Tech_Emphasize", "Tech_Request", "Tech_Sense Motive", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Fighter", "Tech_Fighter II", "Tech_Marksman", "Tech_Marksman II", "Tech_Mage", "Tech_Mage II", "Tech_Teacher", "Tech_Teacher II", "Tech_Influencer", "Tech_Influencer II", "Tech_Motivator", "Tech_Motivator II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Swift Rebuttal", "Tech_Build Pressure", "Tech_Appeal", "Tech_Insist", "Tech_Proposal", "Tech_Advocate", "Tech_Dismiss", "Tech_Flatter", "Tech_Beguile", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Charming Request", "Tech_Pander", "Tech_Flatter II", "Tech_Invigorate", "Tech_Enthusiasm", "Tech_Meditate", "Tech_Zeal", "Tech_Deepen Connection", "Tech_Bravado", "Tech_Motivational Speech", "Tech_Invigorate II", "Tech_Diplomacy", "Tech_Fast Talk", "Tech_Quick Request", "Tech_Segue", "Tech_Increase Tension", "Tech_Diplomacy II", "Tech_Final Push", "Tech_Subvert", "Tech_Indifference", "Tech_Spite", "Tech_Ridicule", "Tech_Unfazed", "Tech_Subvert II", "Tech_Redirect Anger", "Tech_Threaten", "Tech_Taunt", "Tech_Domineer", "Tech_Tyrannize", "Tech_Command", "Tech_Threaten II", "Tech_Rage", "Tech_Tranquility", "Tech_Simple Request", "Tech_Small Talk", "Tech_Guidance", "Tech_Mindfulness", "Tech_Tranquility II", "Tech_Sympathy", "Tech_Serenity of Mind", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Mean", "Tech_Fuel the Fire", "Tech_Veiled Anger", "Tech_Oppress", "Tech_Bellow", "Tech_Bulldoze", "Tech_Enforcement", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Intrigue", "Tech_Consideration", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Close it Out", "Tech_Obtuse", "Tech_Reconsider", "Tech_Evil Eye", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Reel'Em In", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "TrainingTechniques": ["Technique", "Tech_Hide", "Tech_Mount", "Tech_Move", "Tech_Prepare", "Tech_Interact", "Tech_Detect Ether", "Tech_Detect Creature", "Tech_Dash", "Tech_Break Free", "Tech_Escape", "Tech_Move Silently", "Tech_Reposition", "Tech_Grab an Edge", "Tech_Aid", "Tech_Stabilize", "Tech_Reassure", "Tech_Calm Mind", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Favor", "Tech_Agitate", "Tech_Emphasize", "Tech_Request", "Tech_Sense Motive", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Fighter", "Tech_Fighter II", "Tech_Marksman", "Tech_Marksman II", "Tech_Mage", "Tech_Mage II", "Tech_Teacher", "Tech_Teacher II", "Tech_Influencer", "Tech_Influencer II", "Tech_Motivator", "Tech_Motivator II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Swift Rebuttal", "Tech_Build Pressure", "Tech_Appeal", "Tech_Insist", "Tech_Proposal", "Tech_Advocate", "Tech_Dismiss", "Tech_Flatter", "Tech_Beguile", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Charming Request", "Tech_Pander", "Tech_Flatter II", "Tech_Invigorate", "Tech_Enthusiasm", "Tech_Meditate", "Tech_Zeal", "Tech_Deepen Connection", "Tech_Bravado", "Tech_Motivational Speech", "Tech_Invigorate II", "Tech_Diplomacy", "Tech_Fast Talk", "Tech_Quick Request", "Tech_Segue", "Tech_Increase Tension", "Tech_Diplomacy II", "Tech_Final Push", "Tech_Subvert", "Tech_Indifference", "Tech_Spite", "Tech_Ridicule", "Tech_Unfazed", "Tech_Subvert II", "Tech_Redirect Anger", "Tech_Threaten", "Tech_Taunt", "Tech_Domineer", "Tech_Tyrannize", "Tech_Command", "Tech_Threaten II", "Tech_Rage", "Tech_Tranquility", "Tech_Simple Request", "Tech_Small Talk", "Tech_Guidance", "Tech_Mindfulness", "Tech_Tranquility II", "Tech_Sympathy", "Tech_Serenity of Mind", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Mean", "Tech_Fuel the Fire", "Tech_Veiled Anger", "Tech_Oppress", "Tech_Bellow", "Tech_Bulldoze", "Tech_Enforcement", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Intrigue", "Tech_Consideration", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Close it Out", "Tech_Obtuse", "Tech_Reconsider", "Tech_Evil Eye", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Reel'Em In", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "Attr_BOD": ["Def_Brace", "Def_Fortitude", "HP", "Power", "Carrying Capacity", "Skill_Enchant", "Skill_Might", "Skill_Throw", "Skill_Traversal"], "Attr_PRC": ["Def_Disruption", "Def_Hide", "Accuracy", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Tinker"], "Attr_QCK": ["Def_Reflex", "Def_Evasion", "Initiative", "Skill_Acrobatics", "Skill_Finesse", "Skill_Pilot", "Skill_Warding"], "Attr_INT": ["Def_Insight", "Def_Notice", "Spellforce", "Skill_Charm", "Skill_Cook", "Skill_Empathy", "Skill_Search"], "Attr_RSN": ["Def_Guile", "Def_Scrutiny", "Recall", "Skill_Alchemy", "Skill_Analyze", "Skill_Build", "Skill_Rationalize"], "Attr_CNV": ["Def_Resolve", "Def_Freewill", "WILL", "Charisma", "Cmb_HV", "Skill_Channel", "Skill_Demoralize", "Skill_Inspire", "Skill_Resonance"], "Recall": ["LoreCat_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "LoreCat_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "LoreCat_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "LoreCat_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "LoreCat_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "LoreCat_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "LoreCat_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"] }
		},
		_max = "_max",
		_true = "_true",
		_rank = "_rank",
		_build = "_build",
		_filter = "_filter",
		_subfilter = "_subfilter",
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
			if (values[key] == undefined) {
				let definition = new DefinitionData();
				definition.name = `${key} Not Found`;
				return definition;
			}
			switch (values[key]["group"]) {
				case "Technique":
					return new TechniqueDefinitionData(values[key]);
				case "Style":
					return new TechniqueStyleDefinitionData(values[key]);
				case "Language":
					return new LanguageDefinitionData(values[key]);
				case "Job":
					return new JobDefinitionData(values[key]);
				case "Status":
					return new StatusDefinitionData(values[key]);
				default:
					return new DefinitionData(values[key]);
			}
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
				return data.title;
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
		_subfilter: _subfilter,
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
