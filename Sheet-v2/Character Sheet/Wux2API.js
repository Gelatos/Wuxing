on("chat:message", function (msg) {
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

        switch (tag) {
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
            switch (tag) {
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
                    log("sending note");
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
                log(`js: ${js}`);
                log(`js: ${JSON.stringify(js)}`);
            }
        }
    }
});

var Debug = Debug || (function () {
    'use strict';
    var
        logMessage = function (msg) {
            log(msg);
        },
        logError = function (msg) {
            log(`Error! ${msg}`);
            sendChat("System Error", `/w GM ${msg}`, null, { noarchive: true });
        }

    return {
        Log: logMessage,
        LogError: logError
    };
}());

// Data Retrieval
function GetCharacterAttribute(charId, attrName) {

    var returnVal = undefined;
    var chracterAttributes = findObjs({
        _characterid: charId,
        _type: "attribute",
        name: attrName
    }, { caseInsensitive: true });

    if (chracterAttributes.length > 0) {
        returnVal = chracterAttributes[0];
    }

    return returnVal;
}

function ParseIntValue(value, defaultValue) {
    if (defaultValue == undefined) {
        defaultValue = 0;
    }
    return isNaN(parseInt(value)) ? defaultValue : parseInt(value);
}


// attribute creation
function CreateRepeatingRowAttribute(repeatingSection, id, name, value, charId) {

    return createObj("attribute", { "name": GetSectionIdName(repeatingSection, id, name), "current": value, "_characterid": charId });
}

function CreateNormalAttribute(name, value, charId, max) {
    log(`Creating Attribute ${name} with value ${value}`);

    if (max != undefined) {
        return createObj("attribute", { "name": name, "current": value, "max": max, "_characterid": charId });
    }

    return createObj("attribute", { "name": name, "current": value, "_characterid": charId });
}

function CreateAbility(name, pattern, charId) {
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
    }, { caseInsensitive: true });

    if (chracterAttributes.length > 0) {
        chracterAttributes[0].remove();
    }
}

// uuid generation
function GenerateUUID() {

    let a = 0, b = [];
    return function () {
        let c = (new Date()).getTime() + 0, d = c === a;
        a = c;
        for (let e = new Array(8), f = 7; 0 <= f; f--) {
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
        for (f = 0; 12 > f; f++) {
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        }
        return c;
    };
}

function GenerateRowID() {

    return GenerateUUID().replace(/_/g, "Z");
}

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
    _.each(partyList, function (charName) {
        charName = charName.trim();
        if (charName != "") {
            var characters = findObjs({
                _type: 'character',
                name: charName
            }, { caseInsensitive: true });
            if (characters.length > 0) {
                // this character is a party member. Add them to the list
                if (state.mainParty.party[charName] == undefined) {
                    state.mainParty.party[charName] = {
                        name: charName,
                        id: characters[0].get("id")
                    };
                }
            }
        }
    });

    sendChat("Game Manager", "/w GM Character Importer has completed", null, { noarchive: true });
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
        }, { caseInsensitive: true });
        if (characters.length > 0) {
            // log ("Found Character " + charName + ": " + characters[0]);
            return characters[0];
        }

        characters = findObjs({ _type: 'character' });
        characters.forEach(function (chr) {
            if (chr.get('name') == charName) {
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
    _.each(players, function (obj) {
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

    sendChat("Game Manager", "/w " + sendingPlayerName + " There was an error in your message. You do not have a selected token or selected an invalid character.", null, { noarchive: true });
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
    log(`[EventData] No token with id ${tokenId} exists.`);
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
            log(`[EventData] This token has no representative character.`);
            return undefined;
        }
    }
    log(`[EventData] No token exists.`);
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

        getToken: function () {
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
            }
            ;
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

        setDefaultTeams = function () {
            state.WuxConflictManager.teams = [];
            state.WuxConflictManager.teams.push(new TeamData("Ally", 0, true, ""));
            state.WuxConflictManager.teams.push(new TeamData("Enemy", 1, false, ""));
        },

        startConflict = function () {
            state.WuxConflictManager.round = 0;
            if (!TargetReference.HasActiveTargets()) {
                Debug.LogError(`[startConflict] No Active Targets for Conflict`);
                return;
            }
            rollInitiative();
            setActiveTokensForConflict();
            startRound(true);
        },
        endConflict = function () {
            TargetReference.IterateOverActiveTargetData(function (tokenTargetData) {
                if (tokenTargetData != undefined) {
                    TokenReference.ResetTokenDisplay(tokenTargetData);
                }
            });
            resetCombatStateVariables();

            let systemMessage = new SystemInfoMessage("Conflict Has Finished");
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage, "GM");
        },
        rollInitiative = function () {
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
            }
            ;

            let systemMessage = new SystemInfoMessage(tableData.print());
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
        },
        resetCombatStateVariables = function () {
            TargetReference.ClearActiveTargetData();
            state.WuxConflictManager.round = 0;
            setDefaultTeams();
        },

        // round start
        startRound = function (startConflict) {
            state.WuxConflictManager.round++;
            setStartRoundTokens(startConflict);
            sendStartRoundMessage();
        },
        
        setStartRoundTokens = function (startConflict) {
            TargetReference.IterateOverActiveTargetData(function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                if (startConflict) {
                    tokenTargetData.setEnergyToStart(attributeHandler);
                }
                else {
                    tokenTargetData.addEnergy(attributeHandler, 1);
                }
                
                switch (state.WuxConflictManager.conflictType) {
                    case "Battle":
                        tokenTargetData.setDash(attributeHandler);
                        break;
                    case "Social":
                        tokenTargetData.addImpatience(attributeHandler, -1);
                        tokenTargetData.setTurnIcon(true);
                        break;
                }

                attributeHandler.run();
            });
        },
        sendStartRoundMessage = function () {
            let message = `Round ${state.WuxConflictManager.round} Begins!\n`;
            state.WuxConflictManager.activeTeamIndex = state.WuxConflictManager.startRoundTeamIndex;
            message += getPhaseStartMessage();
            let systemMessage = new SystemInfoMessage(message);
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
        },

        // end turn
        endTurn = function (msg) {
            setNextActiveTeam();
            TokenReference.IterateOverSelectedTokens(msg, function (tokenTargetData) {
                TokenReference.SetTurnIcon(tokenTargetData, false);
                sendEndTurnMessage(tokenTargetData);
            });
        },
        setNextActiveTeam = function () {
            let activeTeam = state.WuxConflictManager.activeTeamIndex;
            activeTeam++;
            if (activeTeam >= state.WuxConflictManager.teams.length) {
                activeTeam == 0;
            }
            state.WuxConflictManager.activeTeamIndex = activeTeam;
        },
        sendEndTurnMessage = function (targetData) {
            let message = `${targetData.displayName} Ends Turn\n`;
            message += getPhaseStartMessage();
            let systemMessage = new SystemInfoMessage(message);
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
        },
        getPhaseStartMessage = function () {
            let team = state.WuxConflictManager.teams[state.WuxConflictManager.activeTeamIndex];
            if (team.isPlayer && team.lastActiveOwner != "") {
                return `${team.name} Phase Start!\n${team.lastActiveOwner}, select the next character to have a turn`;
            } else {
                return " Phase Start!";
            }
        },

        // Token State
        setActiveTokensForConflict = function () {
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
            }
            ;
        },

        commandConsumeTechnique = function (msg, content) {
            ResourceConsumption.Use(msg, content);
        },
        commandUseTechnique = function (msg, content) {
            CheckTechnique.Use(msg, content);
        },
        commandResolveTechnique = function (msg, content) {
        },
        commandRollSkillCheck = function (msg, content) {
            rollSkillCheck(msg, ParseIntValue(content));
        },

        ResourceConsumption = ResourceConsumption || (function () {

            var resourceData = {},
                tokenTargetData = {},
                resources = {},
                messages = [],

                use = function (msg, content) {
                    initializeData(content);
                    if (tokenTargetData == undefined) {
                        Debug.Log(`[ResourceConsumption] ${resourceData.sheetname} tokenData not found`);
                        return;
                    }

                    setResources();
                    consumeResources();
                    printMessages();
                },

                initializeData = function (content) {
                    resourceData = new TechniqueResources();
                    resourceData.importSandboxJson(content);
                    tokenTargetData = TargetReference.GetTokenTargetDataByName(resourceData.sheetname);
                    messages = [];
                },

                setResources = function () {
                    resources = {};
                    let resourceNames = resourceData.resourceCost.split(";");
                    for (let i = 0; i < resourceNames.length; i++) {
                        let resource = resourceNames[i].trim().split(" ", 2);
                        resources[resource[1]] = parseInt(resource[0]);
                    }
                },

                consumeResources = function () {
                    let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                    let failure = false;
                    let enChange = 999;

                    for (let resourceName in resources) {
                        let resourceValue = resources[resourceName];
                        let resourceTitle = WuxDef.GetTitle(resourceName);
                        switch (resourceName) {
                            case undefined:
                                break;
                            case "EN":
                                tokenTargetData.addEnergy(attributeHandler, resourceValue * -1, function (results, attrHandler, attributeVar) {
                                    if (results.remainder < 0) {
                                        failure = true;
                                        messages = [];
                                        messages.push(`Not enough ${resourceTitle} to use this technique`);
                                    } else {
                                        messages.push(`Consumed ${resourceValue} ${resourceTitle}`);
                                        attrHandler.addUpdate(attributeVar, results.newValue, false);
                                        enChange = results.newValue;
                                    }
                                });
                                break;
                            case "Boon":
                                messages.push(`! You must manually consume a boon to use this technique !`);
                                break;
                            default:
                                tokenTargetData.modifyResourceAttribute(attributeHandler, resourceName, resourceValue * -1, tokenTargetData.addModifierToAttribute,
                                    function (results, attrHandler, attributeVar) {
                                        if (results.remainder < 0) {
                                            failure = true;
                                            messages = [];
                                            messages.push(`Not enough ${resourceTitle} to use this technique`);
                                        } else {
                                            messages.push(`Consumed ${resourceValue} ${resourceTitle}`);
                                            attrHandler.addUpdate(attributeVar, results.newValue, false);
                                        }
                                        return results;
                                    }
                                );
                                break;
                        }
                        if (failure) {
                            break;
                        }
                    }
                    if (!failure) {
                        attributeHandler.run();
                        if (enChange != 999) {
                            tokenTargetData.setEnergy(enChange);
                        }
                    }
                },

                printMessages = function () {
                    let message = `${resourceData.sheetname} uses ${resourceData.name}`;
                    for (let i = 0; i < messages.length; i++) {
                        message += `\n${messages[i]}`;
                    }

                    let systemMessage = new SystemInfoMessage(message);
                    systemMessage.setSender("System");
                    WuxMessage.Send(systemMessage, "GM");
                }

            return {
                Use: use
            }
        }()),

        CheckTechnique = CheckTechnique || (function () {
            var techniqueData = {},
                userTokenTargetData = {},
                targetTokenTargetData = {},
                messages = [],

                use = function (msg, content) {
                    initializeData(content);
                    if (userTokenTargetData == undefined || targetTokenTargetData == undefined) {
                        Debug.LogError(`[CheckTechnique] tokenData not found`);
                        return;
                    }
                    Debug.Log(`[CheckTechnique] got ${JSON.stringify(techniqueData)}`);
                },

                initializeData = function (content) {
                    let contentData = content.split("$$");
                    techniqueData = new TechniqueData();
                    techniqueData.importSandboxJson(contentData[0]);
                    userTokenTargetData = TargetReference.GetTokenTargetDataByName(contentData[1]);
                    targetTokenTargetData = TargetReference.GetTokenTargetData(contentData[2]);
                    messages = [];
                },

                printMessages = function () {
                    let message = `${resourceData.sheetname} uses ${resourceData.name}`;
                    for (let i = 0; i < messages.length; i++) {
                        message += `\n${messages[i]}`;
                    }

                    let systemMessage = new SystemInfoMessage(message);
                    systemMessage.setSender("System");
                    WuxMessage.Send(systemMessage, "GM");
                }

            return {
                Use: use
            }
        }()),


        // Technique Handling
        getUserTargetDataFromTechnique = function (technique) {
            return TargetReference.GetTokenTargetDataByName(technique.sheetname);
        },
        getDefenderTargetDataFromTechnique = function (technique) {
            return TargetReference.GetTokenTargetData(technique.target);
        },

        // Math
        rollSkillCheck = function (msg, count) {
            let results = new DieRoll();
            results.rollSkillCheck(count, 0);
            let message = `${Format.ShowTooltip(`Rolling Skill Check ${results.total}`, results.message)}`;
            WuxingMessages.SendSystemMessage(message, "", msg.who);
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
        consumeTechnique = function (msg, targetData, technique, weaponData) {

            // consume resources
            if (consumeTechniqueResources(targetData, technique)) {
                displayTechnique(msg, technique, weaponData);
            } else {
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

        iterateOverResources = function (targetData, technique) {

            let resources = technique.resourceCost.split(";");
            let resource, resourceData;
            let resourceDatas = [];
            for (let i = 0; i < resources.length; i++) {
                resource = resources[i].trim().split(" ");
                if (resource.length > 1) {
                    resourceData = createResourceDataObj(targetData, resource);
                    if (resourceData == undefined) {
                        return undefined;
                    } else {
                        resourceDatas.push(resourceData);
                    }
                }
            }
            return resourceDatas;
        },

        createResourceDataObj = function (targetData, resource) {
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

        setResourceDataObjResource = function (targetData, resourceData) {
            resourceData.resource = GetCharacterAttribute(targetData.charId, resourceData.resourceName);
            return resourceData;
        },

        consumeResourceData = function (targetData, resourceDatas) {
            _.each(resourceDatas, function (obj) {
                if (obj.resourceName == "ki") {
                    TokenReference.AddEnergy(targetData, obj.cost * -1, false);
                } else {
                    obj.resource.set("current", obj.newVal);
                }
            });
        },

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
        useTechnique = function (msg, technique, weaponData, userTargetData, defenderTargetData) {

            let skillCheck = makeTechniqueSkillCheck(technique, weaponData, userTargetData, defenderTargetData);
            let skillCheckMessage = createTechniqueSkillCheckOutput(skillCheck, technique, weaponData, userTargetData, defenderTargetData);
            let resultsMessage = createTechniqueResultsOutput(skillCheck, technique, weaponData, userTargetData, defenderTargetData);

            WuxingMessages.SendMessage(skillCheckMessage, "", msg.who);
            WuxingMessages.SendMessage(resultsMessage, ["GM"], msg.who);
        },

        makeTechniqueSkillCheck = function (technique, weaponData, userTargetData, defenderTargetData) {

            let output = {
                compareResults: {},
                userSkill: getTechniqueUserSkillRoll(technique, userTargetData, weaponData),
                defenderSkill: getTechniqueDefenderSkillRoll(technique, defenderTargetData, weaponData)
            }

            output.compareResults = compareTechniqueSkillChecks(output.userSkill, output.defenderSkill);
            return output;
        },

        getTechniqueUserSkillRoll = function (technique, userTargetData, weaponData) {

            let skillData = getBasicTechniqueSkillRollTypeData(technique.skill, technique, weaponData);
            skillData = getTechniqueSkillAttr(skillData, userTargetData);
            return getTechniqueSkillRoll(skillData);
        },

        getTechniqueDefenderSkillRoll = function (technique, defenderTargetData, weaponData) {

            if (technique.defense == "") {
                return getBasicCheckSkillData();
            }
            let skillData = getBasicTechniqueSkillRollTypeData(technique.defense, technique, weaponData);
            skillData = getTechniqueDefenderAttr(skillData, technique, defenderTargetData, weaponData);
            return getTechniqueSkillRoll(skillData);
        },

        getTechniqueSkillAttr = function (skillData, targetData) {
            skillData.attrSkill = `skill_${skillData.attrSkill}`;
            skillData.skillValue = ParseIntValue(getAttrByName(targetData.charId, skillData.attrSkill));
            return skillData;
        },

        getSkillRollData = function () {
            return {
                isDC: false,
                skillFull: "",
                attrSkill: "",
                roll: 0,
                skillValue: 0,
                total: 0
            };
        },

    getBasicCheckSkillData = function () {
        let output = getSkillRollData();
        output.isDC = true;
        output.skillFull = "Basic";
        output.roll = 15;
        output.total = 15;
        return output;
    },

    getTechniqueDefenderAttr = function (skillData, technique, targetData, weaponData) {
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

        getTechniqueDefenderAttrTraitMods = function (skillData, technique, targetData, weaponData) {
            if (skillData.skillFull == "BR DC") {
                if (technique.traits.indexOf("Armament [F]") >= 0) {
                    if (weaponData.abilities.indexOf("Quick") >= 0) {
                        skillData.skillFull += "[Brace]";
                        skillData.attrSkill = "skill_brace";
                        skillData.skillValue = ParseIntValue(getAttrByName(targetData.charId, skillData.attrSkill));
                    } else if (weaponData.abilities.indexOf("Crushing") >= 0) {
                        skillData.skillFull += "[Reflex]";
                        skillData.attrSkill = "skill_reflex";
                        skillData.skillValue = ParseIntValue(getAttrByName(targetData.charId, skillData.attrSkill));
                    }
                }
            }
            return skillData;
        },

        getTechniqueDefenderAttrCombinedDefenseMods = function (skillData, targetData) {

            switch (skillData.skillFull) {
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

        getBetterCombinedDefense = function (skillData, targetData, attr1, name1, attr2, name2) {

            let mod1 = ParseIntValue(getAttrByName(targetData.charId, attr1));
            let mod2 = ParseIntValue(getAttrByName(targetData.charId, attr2));
            skillData.skillFull += mod1 >= mod2 ? `[${name1}]` : `[${name2}]`;
            skillData.attrSkill = mod1 >= mod2 ? attr1 : attr2;
            skillData.skillValue = mod1 >= mod2 ? mod1 : mod2;
            return skillData;
        },

        getTechniqueSkillRoll = function (skillData) {

            skillData.roll = skillData.isDC ? 10 : randomInteger(20);
            skillData.total = skillData.roll + skillData.skillValue;

            return skillData;
        },

        getBasicTechniqueSkillRollTypeData = function (skill, technique, weaponData) {
            let skillData = getSkillRollData();

            if (skill == "Weapon") {
                skillData = setSkillRollDataFromWeapon(skillData, technique, weaponData);
            } else {
                skillData = parseSkillRollDataFromTechnique(skillData, skill);
            }
            return skillData;
        },

        setSkillRollDataFromWeapon = function (skillData, technique, weaponData) {
            if (technique.rType == "Range" && weaponData.traits.indexOf("Thrown") >= 0) {
                skillData.skillFull = "Throw";
                skillData.attrSkill = "throw";
            } else {
                skillData.skillFull = weaponData.skill;
                skillData.attrSkill = Format.ToCamelCase(weaponData.skill);
            }
            return skillData;
        },

        parseSkillRollDataFromTechnique = function (skillData, skill) {
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

        compareTechniqueSkillChecks = function (userSkill, defenderSkill) {
            if (userSkill.total >= defenderSkill.total + 10) {
                return "Critical Hit";
            } else if (userSkill.total >= defenderSkill.total) {
                return "Hit";
            } else if (userSkill.total >= defenderSkill.total - 5) {
                return "Glancing Hit";
            }

            return "Miss";
        },

        createTechniqueSkillCheckOutput = function (skillCheck, technique, weaponData, userTargetData, defenderTargetData) {
            let techUseDisplayData = createTechUseDisplaytData();
            techUseDisplayData = setTechUseDisplayTechniqueData(techUseDisplayData, technique);
            techUseDisplayData = setTechUseDisplayWeaponData(techUseDisplayData, technique, weaponData);
            techUseDisplayData = setTechUseDisplayUserTargetData(techUseDisplayData, userTargetData);
            techUseDisplayData = setTechUseDisplayDefTargetData(techUseDisplayData, technique, defenderTargetData);
            techUseDisplayData = setTechUseDisplaySkillCheckData(techUseDisplayData, skillCheck);
            return displayUsedTechnique(techUseDisplayData);
        },

        createTechniqueResultsOutput = function (skillCheck, technique, weaponData, userTargetData, defenderTargetData) {
            let message = "This would be a message with damages";

            return message;
        },

        createTechUseDisplaytData = function () {
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

        setTechUseDisplayTechniqueData = function (techUseDisplayData, technique) {
            techUseDisplayData.name = technique.name;
            techUseDisplayData.traits = technique.traits;
            techUseDisplayData.description = technique.description;
            techUseDisplayData.onSuccess = technique.onSuccess;
            techUseDisplayData.damage = FeatureService.GetDamageString(technique);
            return techUseDisplayData;
        },

        setTechUseDisplayWeaponData = function (techUseDisplayData, technique, weaponData) {
            if (technique.traits.indexOf("Armament") >= 0) {
                techUseDisplayData.weaponTraits = weaponData.traits;
                techUseDisplayData.damage = FeatureService.GetDamageString(weaponData);
                if (technique.traits.indexOf("Armament [F]") >= 0) {
                    techUseDisplayData.weaponAbilities = weaponData.abilities;
                }
            }
            return techUseDisplayData;
        },

        setTechUseDisplayUserTargetData = function (techUseDisplayData, userTargetData) {
            techUseDisplayData.userName = userTargetData.displayName;
            return techUseDisplayData;
        },

        setTechUseDisplayDefTargetData = function (techUseDisplayData, technique, defenderTargetData) {
            if (technique.defense != "") {
                techUseDisplayData.defenderName = defenderTargetData.displayName;
                techUseDisplayData.defArmor = ParseIntValue(getAttrByName(defenderTargetData.charId, "armor"));
            }
            return techUseDisplayData;
        },

        setTechUseDisplaySkillCheckData = function (techUseDisplayData, skillCheck) {
            let skillRoll = setTechUseDisplaySkillCheckMessage(skillCheck.userSkill);
            techUseDisplayData.userSkillName = skillRoll.name;
            techUseDisplayData.userSkillRollDetails = skillRoll.details;
            skillRoll = setTechUseDisplaySkillCheckMessage(skillCheck.defenderSkill);
            techUseDisplayData.defSkillName = skillRoll.name;
            techUseDisplayData.defSkillRollDetails = skillRoll.details;
            return techUseDisplayData;
        },

        setTechUseDisplaySkillCheckMessage = function (skillCheckRollData) {
            return {
                name: `${skillCheckRollData.total} [${skillCheckRollData.skillFull}]`,
                details: `${skillCheckRollData.roll} (Roll) + ${skillCheckRollData.skillValue} (Mod)`
            };
        },

        displayUsedTechnique = function (techData) {
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
                case "!d":
                case "!de": return new DescEmoteMessage(textMessage);
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
                if (messageObject instanceof EmoteMessage) {
                    let targetData = new TargetData(msg);
                    if (tag == "!d") {
                        messageObject.message = `${targetData.displayName} ${messageObject.message}`;
                    }
                    createEmoteOptions(msg.who, targetData, messageObject);
                }
                else {
                    messageObject.setSender(msg.who);
                    send(messageObject, undefined, true);
                }
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
            attributeHandler.addFinishCallback(function (attrHandler) {
                messageObject.setTitle(targetData.displayName);
                messageObject.setLanguageByTarget(targetData);
                messageObject.setAffinity(attrHandler.parseString(affinityVar));

                let output = "<div style='font-weight: bold'>Emotes</div>";
                let outfitEmoteSetData = new EmoteSetData(attrHandler.parseJSON(emotesVar));
                outfitEmoteSetData.iterate(function (emoteData) {
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
            return `<div class="sheet-wuxTooltipButton"><div class="sheet-wuxTooltipText">i</div><img class="sheet-wuxTooltipImagePreview" src="${url}" alt="Emote"/></div>`;
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
                sendChat(sender, message, null, { noarchive: true });
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
            else if (typeof (data == "string")) {
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
        sendChat("Emote Manager", message, null, { noarchive: true });
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
                tableHeader += `<th style="margin-left: 15px; text-align: right">${this.headers[i]}</th>`;
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
                    tableRow += `<td style="text-align: right">${this.rows[i][j]}</td>`;
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

            attributeHandler.addFinishCallback(function (attrHandler) {
                let value = attrHandler.parseInt(variableName, 0, false);
                results = new DieRoll();
                results.rollSkillCheck(0, value);
            });
            attributeHandler.run();
            results.tokenTargetData = tokenTargetData;
            data.push(results);
        });
        data.sort((a, b) => b.total - a.total);
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
        this.emotes.push(new EmoteData({ name: name, url: url }));
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
        this.baseConstructor(data);
    }

    baseConstructor(data) {
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
            Debug.Log(`[TargetData] No token exists.`);
            return;
        }

        this.charId = token.get('represents');
        if (this.charId == undefined || this.charId == "") {
            Debug.LogError(`[TargetData] (${this.token.name}) has no representative character.`);
            return;
        }
        this.tokenId = token.get("_id");

        let character = getObj('character', this.charId);

        this.charName = character.get("name");
        this.setOwner(character);
        this.setCharacterData();
    }

    getElementStatus(affinity) {
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

    findCharacterByName(characterName) {
        let characters = findObjs({
            _type: 'character',
            name: characterName
        }, { caseInsensitive: true });
        if (characters.length > 0) {
            return characters[0];
        }

        characters = findObjs({ _type: 'character' });
        characters.forEach(function (chr) {
            if (chr.get('name') == characterName) {
                return chr;
            }
        });
        return undefined;
    }

    importCharacterByName(characterName) {
        let character = this.findCharacterByName(characterName);
        if (character == undefined) {
            Debug.LogError(`[importCharacterByName] Error. Character ${characterName} could not be found.`);
            return;
        }

        this.charId = character.get("_id");
        this.charName = character.get("name");
        this.setOwner(character);
        this.setCharacterData();
    }

    setOwner(character) {
        let ownerId = character.get("controlledby").split(",")[0];
        if (ownerId != "") {
            this.owner = getObj("player", ownerId).get("_displayname");
        }
    }
    setCharacterData() {
        let attributeHandler = new SandboxAttributeHandler(this.charId);
        let targetData = this;
        let displayNameVar = WuxDef.GetVariable("DisplayName");
        let affinityVar = WuxDef.GetVariable("Affinity");
        attributeHandler.addMod(displayNameVar);
        attributeHandler.addMod(affinityVar);
        attributeHandler.addFinishCallback(function (attrHandler) {
            targetData.displayName = attrHandler.parseString(displayNameVar);
            targetData.elem = targetData.getElementStatus(attrHandler.parseString(affinityVar));
        });
        attributeHandler.run();
    }

    setTeamIndex(index) {
        this.teamIndex = index;
    }
}
class TokenTargetData extends TargetData {
    constructor(token, targetData) {
        super(undefined);
        if (token == undefined) {
            return;
        }

        if (targetData != undefined) {
            this.importJSON(targetData);
            this.token = token;
        }
        else {
            this.baseConstructor(token);
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

    importTokenDataOnPlayerPage() {
        var tokens = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            represents: this.charId
        });
        if (tokens.length == 0) {
            return;
        }
        this.token = tokens[0];
        this.tokenId = this.token.get("_id");
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
        Debug.Log(`Setting Tooltip to ${value}`);
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
        attributeHandler.addFinishCallback(function (attrHandler) {
            tokenData.displayName = attrHandler.parseString(displayNameVar);
        });
        attributeHandler.run();
    }
    setImpatience(attributeHandler, value) {
        let patienceVar = WuxDef.GetVariable("Soc_Impatience");
        attributeHandler.addUpdate(patienceVar);
        attributeHandler.addUpdate(patienceVar, value, false);
        attributeHandler.addUpdate(patienceVar, value, true);

        this.token.set(`bar1_value`, value);
        this.token.set(`bar1_max`, value);
    }
    addImpatience(attributeHandler, value) {
        let tokenTargetData = this;
        this.modifyResourceAttribute(attributeHandler, "Soc_Impatience", value, this.addModifierToAttribute, function (results, attrHandler, attributeVar) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
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
        this.modifyResourceAttribute(attributeHandler, "Soc_Favor", value, this.addModifierToAttribute, function (results, attrHandler, attributeVar) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
            tokenTargetData.setBarValue(3, results.newValue);
            return results;
        });
    }
    addHp(attributeHandler, value) {
        this.modifyResourceAttribute(attributeHandler, "HP", value,
            function (results, value) {
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
            function (results, attrHandler, attributeVar) {
                attrHandler.addUpdate(attributeVar, results.newValue, false);
                this.setBarValue(1, results.newValue);
                return results;
            });
    }
    addVitality(attributeHandler, value) {
        this.modifyResourceAttribute(attributeHandler, "Vitality", value, this.addModifierToAttribute, function (results, attrHandler, attributeVar) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
            return results;
        });
    }
    addEnergy(attributeHandler, value, resultsCallback) {
        let tokenTargetData = this;
        attributeHandler.addMod(chakraVar);
        this.modifyResourceAttribute(attributeHandler, "EN", value,
            function (results, value) {
                tokenTargetData.addModifierToAttribute(results, value);
            },
            function (results, attrHandler, attributeVar) {
                if (resultsCallback != undefined) {
                    resultsCallback(results, attrHandler, attributeVar);
                }
                else {
                    attrHandler.addUpdate(attributeVar, results.newValue, false);
                    tokenTargetData.setEnergy(results.newValue);
                }
                return results;
            }
        );
    }
    setEnergyToStart(attributeHandler, resultsCallback) {
        let tokenTargetData = this;
        let startEnVar = WuxDef.GetVariable("StartEN");
        attributeHandler.addMod(startEnVar);
        this.modifyResourceAttribute(attributeHandler, "EN", 0,
            function (results, value, attrHandler) {
                tokenTargetData.setModifierToAttribute(results, attrHandler.parseInt(startEnVar));
            },
            function (results, attrHandler, attributeVar) {
                if (resultsCallback != undefined) {
                    resultsCallback(results, attrHandler, attributeVar);
                }
                else {
                    attrHandler.addUpdate(attributeVar, results.newValue, false);
                    tokenTargetData.setEnergy(results.newValue);
                }
                return results;
            }
        );
    }
    addMoveCharge(value) {
        let current = parseInt(this.token.get("status_yellow"));
        let newValue = (isNaN(current) ? 0 : current) + parseInt(value);
        this.setTurnIcon(newValue);
    }
    setDash(attributeHandler) {
        let tokenTargetData = this;
        let baseSpeedVar = WuxDef.GetVariable("Cmb_Mv");
        let maxSpeedVar = WuxDef.GetVariable("Cmb_MvPotency");
        if (baseSpeedVar > maxSpeedVar) {
            baseSpeedVar = maxSpeedVar;
        }
        attributeHandler.addMod(baseSpeedVar);
        attributeHandler.addMod(maxSpeedVar);
        attributeHandler.addFinishCallback(function (attrHandler) {
            let dieRoll = new DieRoll();
            dieRoll.rollDice(1, attrHandler.parseInt(maxSpeedVar, 0, false));

            let move = Math.ceil(attrHandler.parseInt(baseSpeedVar, 0, false), dieRoll);
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
        attributeHandler.addFinishCallback(function (attrHandler) {
            attrHandler.addUpdate(hpVar, attrHandler.parseInt(hpVar, 0, true), false);
            attrHandler.addUpdate(willpowerVar, attrHandler.parseInt(willpowerVar, 0, true), false);
            attrHandler.addUpdate(enVar, 0, true);
        });
    }
    resetSocialTracks(attributeHandler, patienceVal) {
        let favorVar = WuxDef.GetVariable("Soc_Favor");
        let patienceVar = WuxDef.GetVariable("Soc_Impatience");
        let willpowerVar = WuxDef.GetVariable("WILL");
        let enVar = WuxDef.GetVariable("EN");
        attributeHandler.addAttribute(favorVar);
        attributeHandler.addAttribute(patienceVar);
        attributeHandler.addAttribute(willpowerVar);
        attributeHandler.addAttribute(enVar);
        attributeHandler.addFinishCallback(function (attrHandler) {
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
        attributeHandler.addFinishCallback(function (attrHandler) {
            results.current = attrHandler.parseInt(attributeVar, 0, false);
            results.max = attrHandler.parseInt(attributeVar, 0, true);
            modCallback(results, value, attrHandler);
            finishCallback(results, attrHandler, attributeVar);
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
    setModifierToAttribute(results, value) {
        if (value == "max") {
            results.newValue = results.max;
        }
        else {
            results.newValue = parseInt(value);
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
                log(`Setting Wuxing Target version to v${schemaVersion}`);
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
                case "!tss":
                    commandSetSocialData(TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!ten":
                    commandAddEnergy(TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!tmove":
                    commandAddMoveCharge(TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!treset":
                    commandResetToken(TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tshowgroup":
                    commandShowGroup(TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!cshowgroup":
                    content = getCharacterSheetTarget(content);
                    commandShowGroup(content.targets, content.content);
                    break;
                case "!tskillgroupcheck":
                    commandRollSkillGroupCheck(TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!cskillgroupcheck":
                    content = getCharacterSheetTarget(content);
                    commandRollSkillGroupCheck(content.targets, content.content);
                    break;
                case "!intro":
                    commandIntroduce(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
            }
        },

        commandAddCharacter = function (msg, teamIndex) {
            let message = "";
            TokenReference.IterateOverSelectedTokens(msg, function (tokenTargetData) {
                if (tokenTargetData != undefined) {
                    tokenTargetData.setTeamIndex(teamIndex);
                    addToActiveCharacters(tokenTargetData);
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

        getCharacterSheetTarget = function (content) {
            let output = {
                content: "",
                targets: []
            }
            let contentSplit = content.split("@@@");
            output.content = contentSplit[1];

            let target = getTargetDataByName(contentSplit[0]);
            if (target != undefined) {
                output.targets.push(target);
            }

            return output;
        },

        commandSetSocialData = function (targets, content) {
            let contents = content.split(",");
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.setImpatience(attributeHandler, contents[0]);
                tokenTargetData.setFavor(attributeHandler, contents[1]);
                attributeHandler.run();
            });
        },

        commandAddEnergy = function (targets, content) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.addEnergy(attributeHandler, content);
                attributeHandler.run();
            });
        },

        commandAddMoveCharge = function (targets, content) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.addMoveCharge(content);
                attributeHandler.run();
            });
        },

        commandResetToken = function (targets) {
            _.each(targets, function (tokenTargetData) {
                resetTokenDisplay(tokenTargetData);
            });
        },

        commandShowGroup = function (targets, content) {
            content = content.split(";");
            let group = content[0];
            let advantage = content.length > 1 ? content[1] : 0;
            let tableName = "";
            switch (group) {
                case "Defenses": group = "Defense"; tableName = "Defenses"; break;
                case "Senses": group = "Sense"; tableName = "Senses"; break;
                default: tableName = content; break;
            }

            let groupArray = WuxDef.Filter(new DatabaseFilterData("group", group));
            if (groupArray.length == 0) {
                Debug.LogError(`[commandShowGroup] The group (${group}) is empty!`);
            }
            else {
                _.each(targets, function (tokenTargetData) {
                    checkModifiers(tableName, tokenTargetData, groupArray, false, advantage);
                });
            }
        },

        commandRollSkillGroupCheck = function (targets, content) {
            content = content.split(";");
            let subGroup = content[0];
            let advantage = content.length > 1 ? content[1] : 0;
            let tableName = `${content}`;

            if (subGroup == "Lore") {

            }
            else {
                let groupArray = WuxDef.Filter(new DatabaseFilterData("subGroup", subGroup));
                _.each(targets, function (tokenTargetData) {
                    checkModifiers(tableName, tokenTargetData, groupArray, true, advantage);
                });
            }
        },
        
        commandIntroduce = function (msg, targets) {
            let characters, charObj = {};
            let sender = msg.who;
            let introNameVar = WuxDef.GetVariable("IntroName");
            let emotesVar = WuxDef.GetVariable("Chat_Emotes");
            let titleVar = WuxDef.GetVariable("Title");
            let ageVar = WuxDef.GetVariable("Age");
            let genderVar = WuxDef.GetVariable("Gender");
            let quickDescVar = WuxDef.GetVariable("QuickDescription");

            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
    
                attributeHandler.addMod([introNameVar, emotesVar, titleVar, ageVar, genderVar, quickDescVar]);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    let outfitEmoteSetData = new EmoteSetData(attrHandler.parseJSON(emotesVar));
                    let messageObject = new IntroEmoteMessage(sender, msg);
                    messageObject.setTitle(attrHandler.parseString(introNameVar));
                    messageObject.message = `${attrHandler.parseString(titleVar)}\nAge ${attrHandler.parseString(ageVar)}; ${attrHandler.parseString(genderVar)}`;
                    messageObject.url = outfitEmoteSetData.defaultEmote;
                    messageObject.setSender(sender);
                    WuxMessage.Send(messageObject);
    
                    // set character data
                    characters = findObjs({
                        _id: tokenTargetData.charId,
                        _type: "character"
                    }, {caseInsensitive: true});
    
                    if (characters.length > 0) {
                        charObj = characters[0];
                        let bio = `<p><b>${attrHandler.parseString(introNameVar)}</b><br><i>${attrHandler.parseString(titleVar)}</i></p>`;
                        bio += `<p>Age ${attrHandler.parseString(ageVar)}; ${attrHandler.parseString(genderVar)}</p>`;
                        bio += `<p>${attrHandler.parseString(quickDescVar)}</p>`;
                        charObj.set("bio", bio);
                        charObj.set("inplayerjournals", "all");
                    }
                });
                attributeHandler.run();
            });

        },

        // Data Checkers

        checkModifiers = function (tableName, tokenTargetData, definitions, addSkillCheck, advantage) {
            let tableData = new TableMessage([tokenTargetData.displayName, tableName]);
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            let dieRoll = new DieRoll();
            dieRoll.rollCheck(advantage);

            _.each(definitions, function (modDefinition) {
                let variable = modDefinition.getVariable();
                attributeHandler.addMod(variable);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    let value = attrHandler.parseString(variable, 0, false);
                    if (addSkillCheck) {
                        let results = new DieRoll(dieRoll);
                        results.addModToRoll(value);
                        tableData.addRow([modDefinition.title, `${Format.ShowTooltip(`${results.total}`, results.message)}`]);
                    }
                    else {
                        tableData.addRow([modDefinition.title, value]);
                    }
                });
            });
            attributeHandler.run();

            let message = tableData.print();
            let systemMessage = new SystemInfoMessage(message);
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
        },

        // Active Characters

        getDefaultActiveCharacters = function () {
            return {
                targetData: {},
                names: {}
            };
        },

        hasActiveTargets = function() {
            return Object.keys(state.TargetReference.activeCharacters.targetData).length > 0;
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
                Debug.LogError(`[TargetReference][addToActiveCharacters] No target data exists.`);
                return;
            }
            delete (tokenTargetData.token);
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
                let tokenTargetData = new TokenTargetData();
                tokenTargetData.importCharacterByName(characterName);
                if (tokenTargetData.charId == "") {
                    Debug.LogError(`[TargetReference][getTargetDataByName] No target data exists for ${characterName}`);
                    return undefined;
                }
                tokenTargetData.importTokenDataOnPlayerPage();
                if (tokenTargetData.tokenId == "") {
                    Debug.LogError(`[TargetReference][getTargetDataByName] No token data exists for ${characterName}`);
                    return undefined;
                }
                return tokenTargetData;
            }
            return TokenReference.GetTokenData(state.TargetReference.activeCharacters.targetData[state.TargetReference.activeCharacters.names[characterName]]);
        },

        getTargetDataByName = function (characterName) {
            if (state.TargetReference.activeCharacters.names[characterName] == undefined) {
                let targetData = new TargetData();
                targetData.importCharacterByName(characterName);
                if (targetData.charId == "") {
                    Debug.LogError(`[TargetReference][getTargetDataByName] No target data exists for ${characterName}`);
                    return undefined;
                }
                return targetData;
            }
            return TokenReference.GetTokenData(state.TargetReference.activeCharacters.targetData[state.TargetReference.activeCharacters.names[characterName]]);
        }
        ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        HasActiveTargets: hasActiveTargets,
        IterateOverActiveTargetData: iterateOverActiveTargetData,
        ClearActiveTargetData: clearActiveTargetData,
        GetTokenTargetData: getTokenTargetData,
        GetTokenTargetDataByName: getTokenTargetDataByName,
        GetTargetDataByName: getTargetDataByName
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
                        Debug.LogError(`[TokenReference][getToken] Token for ${data.charName} not found`);
                        return undefined;
                    }
                    tokenData = new TokenTargetData(token, data);
                    if (tokenData == undefined) {
                        Debug.LogError(`[TokenReference][getToken] Tokendata for ${data.charName} could not be created`);
                        return undefined;
                    }
                    tokenData.setDisplayName();
                    addToken(tokenData, data.tokenId);
                }
                else {
                    tokenData = state.TokenReference.tokens[data.tokenId];
                    if (tokenData == undefined) {
                        Debug.LogError(`[TokenReference][getToken] Something went wrong. Tokendata for ${data.charName} is undefined`);
                        return undefined;
                    }
                    tokenData.setDisplayName();
                }
            }
            else {
                if (state.TokenReference.tokens[data] == undefined) {
                    let token = getToken(data);
                    if (token == undefined) {
                        Debug.LogError(`[TokenReference][getToken] Token for id ${data} not found`);
                        return undefined;
                    }
                    tokenData = new TokenTargetData(token);
                    if (tokenData == undefined) {
                        Debug.LogError(`[TokenReference][getToken] Tokendata for id ${data} could not be created`);
                        return undefined;
                    }
                    tokenData.setDisplayName();
                    addToken(tokenData, data);
                }
                else {
                    tokenData = state.TokenReference.tokens[data];
                    if (tokenData == undefined) {
                        Debug.LogError(`[TokenReference][getToken] Something went wrong. Tokendata for ${data} is undefined`);
                        return undefined;
                    }
                    tokenData.setDisplayName();
                }
            }
            return tokenData;
        },

        addToken = function (tokenData, tokenId) {
            state.TokenReference.tokens[tokenId] = tokenData;
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

        getFirstSelectedToken = function (msg) {
            if (msg.selected.length == 0) {
                Debug.Log(`[TokenReference][commandShowDefenses] No token selected`);
                return undefined;
            }
            let tokenId = msg.selected[0]._id;
            if (tokenId == undefined) {
                Debug.Log(`[TokenReference][commandShowDefenses] No token selected`);
                return undefined;
            }
            return getTokenData(msg.selected[0]);
        },

        getTokenTargetDataArray = function (msg) {
            let tokenTargetDataArray = [];
            iterateOverSelectedTokens(msg, function (tokenTargetData) {
                tokenTargetDataArray.push(tokenTargetData);
            });
            return tokenTargetDataArray;
        },

        // Token States
        // ---------------------------

        setTokenForConflict = function (conflictType, tokenTargetData, attributeHandler) {
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
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

            attributeHandler.addFinishCallback(function (attrHandler) {
                tokenTargetData.setBar(1, attrHandler.getAttribute(hpVar), true, true);
                tokenTargetData.setBar(2, attrHandler.getAttribute(willpowerVar), true, true);
                tokenTargetData.setEnergy(attrHandler.parseInt(enVar, 0, false));
                combatDetailsHandler.onUpdateDisplayStyle(attrHandler, "Battle");
                tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler));
            });
        },
        setTokenForSocialBattle = function (tokenTargetData, attributeHandler) {
            let patienceVar = WuxDef.GetVariable("Soc_Impatience");
            let willpowerVar = WuxDef.GetVariable("WILL");
            let favorVar = WuxDef.GetVariable("Soc_Favor");
            let enVar = WuxDef.GetVariable("EN");
            attributeHandler.addAttribute(patienceVar);
            attributeHandler.addAttribute(willpowerVar);
            attributeHandler.addAttribute(favorVar);
            attributeHandler.addAttribute(enVar);
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

            attributeHandler.addFinishCallback(function (attrHandler) {
                tokenTargetData.setBar(1, attrHandler.getAttribute(patienceVar), true, true);
                tokenTargetData.setBar(2, attrHandler.getAttribute(willpowerVar), true, true);
                tokenTargetData.setBar(3, attrHandler.getAttribute(favorVar), true, true);
                tokenTargetData.setEnergy(attrHandler.parseInt(enVar, 0, false));
                combatDetailsHandler.onUpdateDisplayStyle(attrHandler, "Social");
                tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler));
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
        IterateOverSelectedTokens: iterateOverSelectedTokens,
        GetTokenTargetDataArray: getTokenTargetDataArray,
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
// noinspection JSUnusedGlobalSymbols,JSUnresolvedReference,SpellCheckingInspection,ES6ConvertVarToLetConst

class Dictionary {

    constructor() {
        this.keys = [];
        this.values = {};
    }

    import(data, dataCreationCallback) {
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, dataCreationCallback);
            } else if (typeof data == "string") {
                this.importStringifiedJson(data, dataCreationCallback);
            } else {
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
            for (let i = 0; i < json.keys.length; i++) {
                this.values[json.keys[i]] = dataCreationCallback(json.values[json.keys[i]]);
            }
        } else {
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
        if (this.sortingGroups != undefined) {
            if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
                this.sortingGroups[property][propertyValue] = [];
            }
            this.sortingGroups[property][propertyValue].push(newEntry.name);
        }
    }

    filter(filterData) {

        let filteredGroup;
        if (Array.isArray(filterData)) {
            filteredGroup = this.getSortedGroup(filterData[0].property, filterData[0].value);
            let nextFilter = [];
            for (let i = 1; i < filterData.length; i++) {
                if (filteredGroup == undefined || filteredGroup.length == 0) {
                    return [];
                }
                nextFilter = this.getSortedGroup(filterData[i].property, filterData[i].value);
                if (nextFilter != undefined && nextFilter.length > 0) {
                    filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
                }
            }
        } else {
            filteredGroup = this.getSortedGroup(filterData.property, filterData.value);
        }
        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return this.getGroupData(filteredGroup);
    }

    getSortedGroup(property, propertyValue) {
        if (!this.sortingGroups.hasOwnProperty(property)) {
            let keys = "";
            for (let key in this.sortingGroups) {
                keys += `${key}, `;
            }
            Debug.Log (`Tried to find property ${property} but it does not exist in the database. Valid properties are ${keys}`);
            return [];
        }
        if (!this.sortingGroups[property].hasOwnProperty(propertyValue)) {
            let keys = "";
            for (let key in this.sortingGroups[property]) {
                keys += `${key}, `;
            }
            Debug.Log (`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
            return [];
        }
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
        let dataCreation = function (data) {
            return new TechniqueData(data);
        };
        super(data, filters, dataCreation);
    }

    importJson(json) {
        let dataCreationCallback = function (data) {
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
            } else {
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

class ExtendedTechniqueStyleDatabase extends Database {

    constructor(data, techDb) {
        let filters = ["group", "mainGroup", "subGroup", "cr"];
        let dataCreation = function (data) {
            return new TechniqueStyle(data);
        };
        super(data, filters, dataCreation);
        this.techDb = techDb;

        this.importStyles(data, dataCreation);
    }
    
    import(data, dataCreationCallback) {
        // overriding the import process
    }
    
    importStyles(data, dataCreationCallback) {
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data, dataCreationCallback);
            } else if (typeof data == "string") {
                this.importStringifiedJson(data, dataCreationCallback);
            } else {
                this.importJson(data, dataCreationCallback);
            }
        }
    }

    importJson(json) {
        let dataCreationCallback = function (data) {
            return new TechniqueStyle(data);
        }
        super.importJson(json, dataCreationCallback);
    }

    importSheets(dataArray) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = new TechniqueStyle(dataArray[i]);
            this.setMaxTier(data);
            this.add(data.name, data);
        }
    }
    
    setMaxTier(techniqueStyle) {
        let tier = 0;
        let filterData = this.techDb.filter(new DatabaseFilterData("style", techniqueStyle.name));
        for (let i = 0; i < filterData.length; i++) {
            if (filterData[i].tier > tier) {
                tier = filterData[i].tier;
            }
        }
        techniqueStyle.maxTier = tier;
    }
    
}

class ExtendedUsableItemDatabase extends Database {

    constructor(data, dataCreationCallback) {
        let filters = ["group", "subGroup", "category", "action", "skill", "range"];
        super(data, filters, dataCreationCallback);
    }

    importJson(json, dataCreationCallback) {
        super.importJson(json, dataCreationCallback);
    }

    importSheets(dataArray, dataCreationCallback) {
        let data = {};
        for (let i = 0; i < dataArray.length; i++) {
            data = dataCreationCallback(dataArray[i]);
            if (this.has(data.name)) {
                this.get(data.name).technique.importEffectsFromTechnique(data.technique);
            } else {
                this.add(data.name, data);
            }
        }
    }
}

class ExtendedDescriptionDatabase extends Database {
    constructor(data) {
        let dataCreation = function (data) {
            let definition = new DefinitionData(data);
            if (definition.group == "Type") {
                definition.variable += `{0}{1}`;
            }
            return definition;
        };
        super(data, ["group", "subGroup", "mainGroup", "formulaMods", "techMods", "hasMax"], dataCreation);
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
            } else {
                this.add(data.name, data);
            }
        }
    }

    add(key, value) {
        super.add(key, value);
        let formulaDefs = value.formula.getDefinitions();
        if (value.subGroup != undefined && value.subGroup.includes(";")) {
            let subGroups = value.subGroup.split(";");
            for (let i = 0; i < subGroups.length; i++) {
                this.addSortingGroup("subGroup", subGroups[i].trim(), value);
            }

        }
        for (let i = 0; i < formulaDefs.length; i++) {
            this.addSortingGroup("formulaMods", formulaDefs[i], value);
        }
        if (value.modifiers.includes(WuxDef._tech)) {
            this.addSortingGroup("techMods", WuxDef._tech, value);
        }
        if (value.modifiers.includes(WuxDef._techset)) {
            this.addSortingGroup("techMods", WuxDef._techset, value);
        }
        if (value.isResource) {
            this.addSortingGroup("hasMax", "true", value);
        }
    }
}

class TechniqueEffectDatabase extends Database {
    constructor(data) {
        let dataCreation = function (data) {
            return new TechniqueEffect(data);
        };
        super(data, ["type"], dataCreation);
    }

    importJson(json) {
        let dataCreationCallback = function (data) {
            return new TechniqueEffect(data);
        }
        super.importJson(json, dataCreationCallback);
    }

    importSheets(dataArray) {
        let dataCreationCallback = function (data) {
            return new TechniqueEffect(data);
        }
        super.importSheets(dataArray, dataCreationCallback);
    }

    getBoostEffects() {
        return this.filter(new DatabaseFilterData("type", "Boost"));
    }
}

class dbObj {
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (Array.isArray(data)) {
                this.importSheets(data);
            } else if (typeof data == "string") {
                this.importStringifiedJson(data);
            } else {
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

    importJson(json) {
    }

    importSheets(dataArray) {
    }

    createEmpty() {
    }
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
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        return i;
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
        definition.descriptions = this.getDescriptions();
        definition.formula = baseDefinition.formula;
        definition.linkedGroups = [];
        definition.isResource = baseDefinition.isResource;
        return definition;
    }

    getDescriptions() {
        return [this.description];
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
        this.tier = parseInt(json.tier);
        this.isFree = this.affinity == "" && this.tier <= 0;
        this.action = json.action;
        this.traits = json.traits;
        this.resourceCost = json.resourceCost;
        this.limits = json.limits;
        this.skill = json.skill;
        this.range = json.range;
        this.target = json.target;
        this.size = parseInt(json.size);
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
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.techSet = "" + dataArray[i];
        i++;
        this.group = "" + dataArray[i];
        i++;
        this.affinity = "" + dataArray[i];
        i++;
        this.tier = parseInt(dataArray[i]);
        this.tier = isNaN(this.tier) ? 0 : this.tier;
        i++;
        this.isFree = this.affinity == "" && this.tier <= 0;
        this.action = "" + dataArray[i];
        i++;
        this.traits = "" + dataArray[i];
        i++;
        this.resourceCost = "" + dataArray[i];
        i++;
        this.limits = "" + dataArray[i];
        i++;
        this.skill = "" + dataArray[i];
        i++;
        this.range = "" + dataArray[i];
        i++;
        this.target = "" + dataArray[i];
        i++;
        this.size = parseInt(dataArray[i]);
        i++;
        this.requirement = "" + dataArray[i];
        i++;
        this.itemTraits = "" + dataArray[i];
        i++;
        this.trigger = "" + dataArray[i];
        i++;
        this.flavorText = "" + dataArray[i];
        i++;
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
        this.size = 0;
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
        if (this.action == "Passive") {
            definition.passiveBoosts = this.effects.getBoostEffects();
        }
        definition.jsonData = this;
        return definition;
    }

    importEffectsFromTechnique(technique) {
        let baseTechnique = this;
        technique.effects.iterate(function (effect) {
            baseTechnique.addEffect(effect);
        });
        technique.definitions.forEach(function (definition) {
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
            case "Move":
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                let moveTypes = ["Pushed", "Pulled", "ForceMove", "Fly", "Float", "FreeMove", "Teleport"];
                if (!moveTypes.some(moveType => effect.subType.includes(moveType))) {
                    this.addDefinition(effect.subType);
                }
                let moveDefs = effect.formula.getDefinitions();
                moveDefs.forEach(moveDef => this.addDefinition(moveDef.name));
                break;
            case "Terrain":
                effect.setName(`T${this.effects.keys.length}`);
                this.effects.add(effect.name, effect);
                this.addDefinition(effect.effect);
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

    getUseTech() {
        return `!utech ${this.formatTechniqueForSandbox()}`;
    }

    formatTechniqueForSandbox() {
        this.displayname = ``;
        this.sheetname = ``;
        return `${this.sanitizeSheetRollAction(JSON.stringify(this))}$$@{${WuxDef.GetVariable("SheetName")}}`;
    }

    sanitizeSheetRollAction(sheetRoll) {
        sheetRoll = sheetRoll.replace(/"/g, "%%");
        sheetRoll = sheetRoll.replace(/:/g, "&&");
        sheetRoll = sheetRoll.replace(/{/g, "<<");
        sheetRoll = sheetRoll.replace(/}/g, ">>");
        sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        return sheetRoll;
    }

    unsanitizeSheetRollAction(jsonString) {
        jsonString = jsonString.replace(/%%/g, '"');
        jsonString = jsonString.replace(/&&/g, ":");
        jsonString = jsonString.replace(/<</g, "{");
        jsonString = jsonString.replace(/>>/g, "}");
        return JSON.parse(jsonString);
    }

    importSandboxJson(jsonString) {
        this.importJson(this.unsanitizeSheetRollAction(jsonString));
    }
}

class TechniqueEffect extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.defense = json.defense;
        this.target = json.target;
        this.type = json.type;
        this.subType = json.subType;
        this.duration = json.duration;
        this.dVal = json.dVal;
        this.dType = json.dType;
        this.formula = new FormulaData(json.formula);
        this.effect = json.effect;
        this.traits = json.traits;
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "";
        this.defense = "" + dataArray[i];
        i++;
        this.target = "" + dataArray[i];
        i++;
        this.type = "" + dataArray[i];
        i++;
        this.subType = "" + dataArray[i];
        i++;
        this.duration = "" + dataArray[i];
        i++;
        this.dVal = "" + dataArray[i];
        i++;
        this.dType = "" + dataArray[i];
        i++;
        this.formula = new FormulaData("" + dataArray[i]);
        i++;
        this.effect = "" + dataArray[i];
        switch(this.type) {
            case "HP":
            case "Resistance":
                this.effect = `${WuxDef.GetAbbreviation("DamageType")}_${this.effect}`;
                break;
            case "Status":
                this.effect = `${WuxDef.GetAbbreviation("Status")}_${this.effect}`;
                break;
            case "Terrain":
                this.effect = `${WuxDef.GetAbbreviation("TerrainFxType")}_${this.effect}`;
                break;
        }
        i++;
        this.traits = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.defense = "";
        this.target = "";
        this.type = "";
        this.subType = "";
        this.duration = "";
        this.dVal = "";
        this.dType = "";
        this.formula = new FormulaData();
        this.effect = "";
        this.traits = "";
    }

    setName(name) {
        this.name = name;
    }
    
    getAverageDiceValue() {
        if (this.dVal > 0) {
            return Math.floor(this.dVal * (this.dType / 2 + 0.5));
        }
        return 0;
    }
    getLowDiceValue() {
        return isNaN(parseInt(this.dVal)) ? 0 : parseInt(this.dVal);
    }
    getHighDiceValue() {
        let output = this.dVal * this.dType;
        return isNaN(output) ? 0 : output;
    }
}

class TechniqueResources extends dbObj {
    importJson(json) {
        this.sheetname = json.sheetname;
        this.name = json.name;
        this.resourceCost = json.resourceCost;
    }

    importSheets(dataArray) {
        let i = 0;
        this.sheetname = "" + dataArray[i];
        i++;
        this.name = "" + dataArray[i];
        i++;
        this.resourceCost = "" + dataArray[i];
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.sheetname = "";
        this.name = "";
        this.resourceCost = "";
    }

    sanitizeSheetRollAction(sheetRoll) {
        sheetRoll = sheetRoll.replace(/"/g, "%%");
        sheetRoll = sheetRoll.replace(/:/g, "&&");
        sheetRoll = sheetRoll.replace(/%/g, "&#37;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
        sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
        sheetRoll = sheetRoll.replace(/@/g, "&#64;");
        sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
        sheetRoll = sheetRoll.replace(/]/g, "&#93;");
        sheetRoll = sheetRoll.replace(/\(/g, "&#40;");
        sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
        return sheetRoll;
    }

    unsanitizeSheetRollAction(jsonString) {
        jsonString = jsonString.replace(/%%/g, '"');
        jsonString = jsonString.replace(/&&/g, ":");
        return JSON.parse(jsonString);
    }

    importSandboxJson(jsonString) {
        this.importJson(this.unsanitizeSheetRollAction(jsonString));
    }
}

class TechniqueStyle extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.subGroup = json.subGroup;
        this.description = json.description;
        this.affinity = json.affinity;
        this.cr = json.cr;
        this.maxTier = json.maxTier;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.subGroup = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.affinity = "" + dataArray[i];
        i++;
        this.cr = parseInt(dataArray[i]);
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.subGroup = "";
        this.description = "";
        this.affinity = "";
        this.cr = 0;
        this.maxTier = 0;
    }

    createDefinition(baseDefinition) {
        let definition = new TechniqueStyleDefinitionData(super.createDefinition(baseDefinition));
        definition.mainGroup = this.group;
        definition.subGroup = this.subGroup;
        definition.tier = this.cr;
        definition.affinity = this.affinity;
        definition.requirements = this.getRequirements();
        definition.formula = new FormulaData();
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
            if (this.affinity.includes(";")) {
                let affinities = this.affinity.split(";");
                let affinityOutput = "";
                for (let i = 0; i < affinities.length; i++) {
                    if (i == affinities.length - 1) {
                        if (affinityOutput != "") {
                            affinityOutput += " or ";
                        }
                    }
                    else if (affinityOutput != "") {
                        affinityOutput += ", ";
                    }
                    affinityOutput += affinities[i].trim();
                }
                requirements += `You must have ${affinityOutput} affinity`;
            }
            else {
                requirements += `You must have ${this.affinity} affinity`;
            }
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
        this.subGroup = json.subGroup;
        this.abilityScore = json.abilityScore;
        this.description = json.description;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.subGroup = "" + dataArray[i];
        i++;
        this.abilityScore = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;

    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.subGroup = "";
        this.abilityScore = "";
        this.description = "";
    }

    createDefinition(baseDefinition) {
        let definition = super.createDefinition(baseDefinition);
        definition.subGroup = this.subGroup;
        definition.formula = new FormulaData(`${this.abilityScore}`);
        definition.formula.addAttributes(definition.getFormulaMods(`${WuxDef._rank}`));
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
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.location = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
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
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
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
        this.category = "";
        this.description = "";
        this.shortDescription = "";
        this.defenses = "";
        this.techniques = [];
    }

    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = json.group;
        this.category = json.category;
        this.description = json.description;
        this.shortDescription = json.shortDescription;
        this.defenses = json.defenses;
        this.techniques = json.techniques;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.category = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.shortDescription = "" + dataArray[i];
        i++;
        this.defenses = "" + dataArray[i];
        i++;
        this.techniques = this.createJobTechnique(dataArray.slice(i));
        i++;
    }

    createDefinition(baseDefinition) {
        let definition = new JobDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.requirements = this.getRequirements();
        definition.formula = new FormulaData();
        return definition;
    }

    getRequirements() {
        return "None";
    }

    createJobTechnique(modArray) {
        let output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0});
            i++;
        }
        return output;
    }
    
    convertToStyle() {
        let style = new TechniqueStyle();
        style.createEmpty();
        style.name = this.name;
        style.fieldName = this.fieldName;
        style.group = "Job";
        style.subGroup = this.group;
        style.description = this.description;
        style.affinity = "";
        style.cr = 0;
        style.maxTier = 6;
        return style;
    }
}

class ArchetypeData extends WuxDatabaseData {

}

class StatusData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.fieldName = json.fieldName;
        this.group = json.group;
        this.description = json.description;
        this.shortDescription = json.shortDescription;
        this.points = json.points;
        this.endsOnRoundStart = json.endsOnRoundStart;
        this.endsOnTrigger = json.endsOnTrigger;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.shortDescription = "" + dataArray[i];
        i++;
        this.points = "" + dataArray[i];
        i++;
        this.endsOnRoundStart = ("" + dataArray[i]) != "";
        i++;
        this.endsOnTrigger = ("" + dataArray[i]) != "";
        i++;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.fieldName = "";
        this.group = "";
        this.description = "";
        this.shortDescription = "";
        this.points = 0;
        this.endsOnRoundStart = false;
        this.endsOnTrigger = false;
    }

    createDefinition(baseDefinition) {
        let definition = new StatusDefinitionData(super.createDefinition(baseDefinition));
        
        definition.subGroup = this.group;
        definition.shortDescription = this.shortDescription;
        definition.points = this.points;
        definition.endsOnRoundStart = this.endsOnRoundStart;
        definition.endsOnTrigger = this.endsOnTrigger;
        return definition;
    }
    
    getDescriptions() {
        let output = [this.description];
        if (this.endsOnRoundStart && this.endsOnTrigger) {
            output.push(`This ${this.group} ends when it is triggered or at the start of the next round.`);
        }
        else if (this.endsOnRoundStart) {
            output.push(`This ${this.group} ends at the start of the next round.`);
        }
        else if (this.endsOnTrigger) {
            output.push(`This ${this.group} ends when it is triggered.`);
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
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.group = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        this.techniques = this.createTechnique(dataArray.slice(i));
        i++;

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
        let output = [];
        let i = 0;
        let data = "";
        let dataSplit = {};
        while (true) {
            if (modArray[i] == undefined || modArray[i] == "") {
                break;
            }
            data = "" + modArray[i];
            dataSplit = data.split(";");
            output.push({name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0});
            i++;
        }
        return output;
    }
}

class ItemData extends WuxDatabaseData {
    importJson(json) {
        this.createEmpty();
        this.name = json.name;
        this.group = json.group;
        this.category = json.category;
        this.bulk = json.bulk;
        this.value = json.value;
        this.traits = json.traits;
        this.description = json.description;
    }

    importSheets(dataArray) {
        this.createEmpty();
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.group = "" + dataArray[i];
        i++;
        this.category = "" + dataArray[i];
        i++;
        this.bulk = parseInt(dataArray[i]);
        i++;
        this.value = parseInt(dataArray[i]);
        i++;
        this.traits = "" + dataArray[i];
        i++;
        this.description = "" + dataArray[i];
        i++;
        return i;
    }

    createEmpty() {
        super.createEmpty();
        this.name = "";
        this.group = "";
        this.category = "";
        this.itemType = "None";
        this.bulk = 0;
        this.value = 0;
        this.traits = "";
        this.description = "";
    }

    createDefinition(baseDefinition) {
        let definition = new ItemDefinitionData(super.createDefinition(baseDefinition));
        definition.subGroup = this.group;
        definition.category = this.category;
        definition.value = this.value;
        return definition;
    }
}

class GoodsData extends ItemData {
    importJson(json) {
        super.importJson(json);
        this.affinity = json.affinity;
        this.location = json.location;
        this.rarity = json.rarity;
    }

    importSheets(dataArray) {
        let i = super.importSheets(dataArray);
        this.affinity = "" + dataArray[i];
        i++;
        this.location = "" + dataArray[i];
        i++;
        this.rarity = parseInt(dataArray[i]);
        i++;
        return i;
    }

    createEmpty() {
        super.createEmpty();
        this.itemType = "Goods";
        this.affinity = "";
        this.location = "";
        this.rarity = 0;
    }
}

class UsableItemData extends ItemData {
    importJson(json) {
        super.importJson(json);
        this.valMod = json.valMod;
        this.skill = json.skill;
        this.dc = json.dc;
        this.time = json.time;
        this.components = json.components;
        this.technique = new TechniqueData(json.technique);
        this.hasTechnique = json.hasTechnique;
    }

    importSheets(dataArray) {
        let i = super.importSheets(dataArray);
        this.valMod = parseInt(dataArray[i]);
        i++;
        this.skill = "" + dataArray[i];
        i++;
        this.dc = isNaN(parseInt(dataArray[i])) ? 0 : parseInt(dataArray[i]);
        i++;
        this.time = isNaN(parseInt(dataArray[i])) ? 1 : parseInt(dataArray[i]);
        i++;
        this.components = "" + dataArray[i];
        i++;
        let techData = [this.name, "Item", "", "", 0].concat(dataArray.slice(i));
        this.technique = new TechniqueData(techData);
        this.hasTechnique = dataArray[i] != "";
        i++;
        return i;
    }

    createEmpty() {
        super.createEmpty();
        this.itemType = "UsableItem";
        this.valMod = 0;
        this.skill = "";
        this.dc = 0;
        this.time = 0;
        this.components = "";
        this.technique = new TechniqueData();
        this.hasTechnique = false;
    }

    createDefinition(baseDefinition) {
        let definition = new ItemDefinitionData(super.createDefinition(baseDefinition));
        definition.techInfo = this.technique;
        return definition;
    }
}

class AttributeGroupData extends dbObj {
    importJson(json) {

    }

    importSheets(modArray) {
        let i = 0;
        this.bod = parseInt(modArray[i]);
        i++;
        this.prc = parseInt(modArray[i]);
        i++;
        this.qck = parseInt(modArray[i]);
        i++;
        this.cnv = parseInt(modArray[i]);
        i++;
        this.int = parseInt(modArray[i]);
        i++;
        this.rsn = parseInt(modArray[i]);
        i++;
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

    }

    createEmpty() {

    }
}

// Definitions
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
        this.name = "" + dataArray[i];
        i++;
        this.fieldName = Format.ToFieldName(this.name);
        this.title = "" + dataArray[i];
        i++;
        this.group = "" + dataArray[i];
        i++;
        this.subGroup = "" + dataArray[i];
        i++;
        this.descriptions = [("" + dataArray[i])];
        i++;
        this.abbreviation = "" + dataArray[i];
        i++;
        this.variable = "" + dataArray[i];
        i++;
        this.baseFormula = "" + dataArray[i];
        i++;
        this.modifiers = "" + dataArray[i];
        i++;
        this.formula = new FormulaData(this.baseFormula);
        this.formula.addAttributes(this.getFormulaMods(this.modifiers));
        this.linkedGroups = Format.StringToArray("" + dataArray[i]);
        i++;
        this.isResource = dataArray[i];
        i++;
        this.iterateExtraData(("" + dataArray[i]).split(";"));
        i++;
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
        definition.modifiers = this.modifiers;
        definition.formula = new FormulaData(this.baseFormula);
        definition.formula.addAttributes(definition.getFormulaMods(this.modifiers));
        definition.linkedGroups = this.linkedGroups;
        definition.isResource = this.isResource;

        delete this.description;

        return definition;
    }

    getTitle() {
        return this.title;
    }

    getVariables(array, mod1) {
        let output = [];
        for (let i = 0; i < array.length; i++) {
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
        return this.variable.replace(/{(\d+)}/g, function (_, m) {
            i = parseInt(m);
            if (Array.isArray(mod) && i < mod.length && mod[i] != undefined) {
                return mod[i];
            } else if (i == 0) {
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
        extraDataValues.forEach(function (data) {
            if (data.trim().indexOf(":") != -1) {
                dataSplit = data.split(":");
                definition.setImportSheetExtraData(dataSplit[0].trim(), dataSplit[1].trim());
            }
        });
    }

    setImportSheetExtraData(property, value) {
    }
}

class TechniqueDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.tier = json.tier;
        this.affinity = json.affinity;
        this.isFree = json.isFree;
        this.passiveBoosts = json.passiveBoosts;
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
                this.isFree = value.toLowerCase() == "true";
                break;
            case "passiveBoosts":
                this.passiveBoosts = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.tier = 0;
        this.affinity = "";
        this.isFree = false;
        this.passiveBoosts = [];
    }

    isPassive() {
        return this.passiveBoosts.length > 0;
    }
}

class TechniqueStyleDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.mainGroup = json.mainGroup;
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
        this.mainGroup = "";
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
        this.shortDescription = json.shortDescription;
        this.points = json.points;
        this.endsOnRoundStart = json.endsOnRoundStart;
        this.endsOnTrigger = json.endsOnTrigger;
    }

    setImportSheetExtraData(property, value) {
        switch (property) {
            case "endsOnRoundStart":
                this.endsOnRoundStart = value.toLowerCase() == "true";
                break;
            case "endsOnTrigger":
                this.endsOnTrigger = value.toLowerCase() == "true";
                break;
            case "shortDescription":
                this.shortDescription = value;
                break;
        }
    }

    createEmpty() {
        super.createEmpty();
        this.shortDescription = "";
        this.points = 0;
        this.endsOnRoundStart = false;
        this.endsOnTrigger = false;
    }
}

class ItemDefinitionData extends DefinitionData {
    importJson(json) {
        super.importJson(json);
        this.category = json.category;
        this.value = json.value;
        this.bulk = json.bulk;
        this.traits = json.traits;
        this.description = json.description;
        this.techInfo = json.techInfo;
    }
    createEmpty() {
        super.createEmpty();
        this.category = "";
        this.value = 0;
        this.bulk = 0;
        this.traits = "";
        this.description = "";
        this.techInfo = {};
    }
}

// Special Display
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
        this.displayname = technique.displayname;
        this.sheetname = technique.sheetname;
        this.definition = technique.createDefinition(WuxDef.Get("Technique"));
        this.fieldName = Format.ToFieldName(technique.name);
        this.actionType = technique.action;
        this.isFree = technique.isFree;
    }

    setTechSetResourceData(technique) {
        this.resourceData = "";
        if (technique.action == "Brief" || technique.action == "Short" || technique.action == "Long") {
            this.resourceData = `During a ${technique.action} Rest`;
        }
        else if (technique.group != "") {
            this.resourceData = `${technique.action} ${technique.group}`;
        }
        else {
            this.resourceData = `${technique.action} Action`;
        }
        if (technique.limits != "") {
            if (this.resourceData != "") {
                this.resourceData += "; ";
            }
            this.resourceData += technique.limits;
        }
        if (technique.resourceCost != "") {
            let resourceNames = technique.resourceCost.split(";");
            for (let i = 0; i < resourceNames.length; i++) {
                let resource = resourceNames[i].trim().split(" ", 2);
                let resourceName = WuxDef.GetTitle(resource[1]);

                if (this.resourceData != "") {
                    this.resourceData += "; ";
                }
                this.resourceData += `${resource[0]} ${resourceName}`
            }
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
            if (technique.size > 0) {
                if (technique.target.includes("Target")) {
                    this.targetData += `${technique.size} ${technique.target}`;
                }
                else {
                    this.targetData += `${technique.target} ${technique.size}`;
                }
            }
        }
    }

    setExtentionEffects(technique) {
        this.requirements = technique.requirement;
        this.itemTraits = WuxDef.GetValues(technique.itemTraits, ";");
        this.trigger = technique.trigger;
    }

    setTraits(technique) {
        this.traits = WuxDef.GetValues(technique.traits, ";", "Trait_");
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
        } else {
            for (let i = 0; i < technique.definitions.length; i++) {
                this.definitions.push(WuxDef.Get(technique.definitions[i]));
            }
        }
    }

    setEffects(technique) {
        this.effects = [];
        let techDisplayData = this;
        let filteredTechniqueEffects = [];
        let defense = "";
        technique.effects.iterate(function (effect) {
            if (effect.defense == defense) {
                filteredTechniqueEffects.push(effect);
            }
            else {
                if (filteredTechniqueEffects.length > 0) {
                    techDisplayData.effects.push(new TechniqueEffectDisplayData(filteredTechniqueEffects));
                    filteredTechniqueEffects = [];
                }
                filteredTechniqueEffects.push(effect);
                defense = effect.defense;
            }
        });
        if (filteredTechniqueEffects.length > 0) {
            techDisplayData.effects.push(new TechniqueEffectDisplayData(filteredTechniqueEffects));
        }
    }

    createEmpty() {
        this.technique = {};
        this.name = "";
        this.actionType = "";
        this.displayname = "";
        this.sheetname = "";
        this.definition = {};
        this.fieldName = "";
        this.isFree = false;

        this.resourceData = "";
        this.targetData = "";
        this.traits = [];

        this.trigger = "";
        this.requirements = "";
        this.itemTraits = [];

        this.flavorText = "";
        this.effects = [];
        this.definitions = [];
    }

    getRollTemplate(addTechnique) {
        let output = "";

        output += `{{Displayname=${this.displayname}}}{{Name=${this.name}}}{{type-${this.actionType}=1}}`;
        if (this.resourceData != "") {
            output += `{{Resources=${this.resourceData}}}`;
        }
        if (this.targetData != "") {
            output += `{{Targeting=${this.targetData}}}`;
        }
        if (this.traits.length > 0) {
            output += this.rollTemplateDefinitions(this.traits, "Trait");
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
        if (this.effects.length > 0) {
            output += this.rollTemplateEffects();
        }
        if (this.definitions.length > 0) {
            output += this.rollTemplateDefinitions(this.definitions, "Def");
        }
        if (addTechnique) {
            if (this.technique.resourceCost != "") {
                let consumeData = new TechniqueResources([this.technique.sheetname, this.technique.name, this.technique.resourceCost]);
                output += `{{consumeData=!ctech ${consumeData.sanitizeSheetRollAction(JSON.stringify(consumeData))}}}`;
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
        this.effects.forEach(function (effect) {
            if (effect.check != undefined) {
                output += `{{Effect${incrementer}Name=${effect.check}}}{{Effect${incrementer}Desc=${effect.checkDescription}}}`;
                if (effect.effects != undefined) {
                    effect.effects.forEach(function (desc) {
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
        let sheetRoll = roll;
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
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "Def_Evasion") {
                definition = WuxDef.Get("Title_TechEvasion");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "TechOnEnter") {
                definition = WuxDef.Get("Title_TechOnEnter");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "TechOnEndFocus") {
                definition = WuxDef.Get("Title_TechOnEndFocus");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else if (defense == "TechNewTargets") {
                definition = WuxDef.Get("Title_TechNewTargets");
                this.check = definition.getTitle();
                this.checkDescription = definition.getDescription();
            }
            else {
                definition = WuxDef.Get(defense);
                if (definition.group == "Result") {
                    this.check = `${definition.getTitle()}`;
                    this.checkDescription = `${definition.getDescription()}`;
                } else {
                    let definition2 = WuxDef.Get("Title_TechDefense");
                    this.check = `${definition2.getTitle()}${definition.getTitle()}`;
                    this.checkDescription = `${definition2.getDescription()}\n${definition.getDescription()}`;
                }
            }
        } else {
            definition = WuxDef.Get("Title_TechDC");
            this.check = `${definition.getTitle()}${defense}`;
            this.checkDescription = definition.getDescription();
        }
    }

    importEffectData(effectData) {
        for (let i = 0; i < effectData.length; i++) {
            let formattedEffect = this.formatEffect(effectData[i]);
            if (formattedEffect != "") {
                this.effects.push(formattedEffect);
            }
        }
    }

    formatEffect(effect) {
        let output= this.formatTemporaryEffect(effect);
        switch (effect.type) {
            case "HP":
                output += this.formatHpEffect(effect);
                break;
            case "WILL":
                output += this.formatWillEffect(effect);
                break;
            case "Vitality":
                output += this.formatVitalityEffect(effect);
                break;
            case "Impatience":
                output += this.formatImpatienceMeterEffect(effect);
                break;
            case "Favor":
                output += this.formatSocialMeterEffect(effect, WuxDef.GetTitle("Soc_Favor"));
                break;
            case "Influence":
                output += this.formatInfluenceMeterEffect(effect);
                break;
            case "Request":
                output += this.formatRequestEffect(effect);
                break;
            case "Status":
                output += this.formatStatusEffect(effect);
                break;
            case "Resistance":
                output += this.formatResistanceEffect(effect);
                break;
            case "Advantage":
                output += this.formatAdvantageEffect(effect);
                break;
            case "Boost":
                output += this.formatBoostEffect(effect);
                break;
            case "Terrain":
                output += this.formatTerrainEffect(effect);
                break;
            case "Structure":
                output += this.formatStructureEffect(effect);
                break;
            case "Move":
                output += this.formatMoveEffect(effect);
                break;
            case "EN":
                output += this.formatEnEffect(effect);
                break;
            case "Definition":
                // Do nothing
                break;
            case "Desc":
            case "":
                output += this.formatDescriptionEffect(effect);
                break;
        }

        return output;
    }

    formatTemporaryEffect(effect) {
        switch (effect.duration) {
            case "Trigger":
                return "Against the triggering effect, ";
            case "Turn":
                return "Until the end of the turn, ";
            case "Round":
                return "Until the end of the round, ";
            case "Focus":
                return "Until you lose focus, ";
            case "Conflict":
                return "Until the end of the conflict, ";
        }
        return "";
    }

    formatHpEffect(effect) {
        let hp = WuxDef.GetTitle("HP");
        switch (effect.subType) {
            case "Heal":
                return `Heal ${this.formatCalcBonus(effect)} ${hp}`;
            case "Surge":
                return `If target has a surge, they must spend one and heal ${this.formatCalcBonus(effect)} ${hp}`;
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

    formatVitalityEffect(effect) {
        let vitality = WuxDef.GetTitle("Cmb_Vitality");
        switch (effect.subType) {
            case "Heal":
                return `Gain ${this.formatCalcBonus(effect)} ${vitality}`;
            default:
                return `Lose ${this.formatCalcBonus(effect)} ${vitality}`;
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

    formatInfluenceMeterEffect(effect) {
        let subTypes = effect.subType.split(":");
        switch (subTypes[0]) {
            case "Raise":
                return `You raise the severity of an influence on your target.`;
            case "Lower":
                return `You lower the severity of an influence on your target.`;
            case "Adjust":
                return `You raise or lower the severity of an influence on your target.`;
            case "Reveal":
                return "A related influence to the statement is revealed to you. You learn whether the influence is supportive or oppositional.";
            case "RevealNeg":
                return "A related oppositional influence to the statement is revealed to you.";
            case "RevealPos":
                return "A related supportive influence to the statement is revealed to you.";
            case "Add":
                return `The target gains the influence, "${effect.effect}" which is at ${subTypes[1]} Severity. This influence is removed if the target becomes hostile towards you or the social conflict ends. `;
        }
    }

    formatImpatienceMeterEffect(effect) {
        let impatience = WuxDef.GetTitle("Soc_Impatience");
        switch (effect.subType) {
            case "Heal":
                return `Reduce target's ${impatience} by ${this.formatCalcBonus(effect)}`;
            default:
                return `Increase target's ${impatience} by ${this.formatCalcBonus(effect)}`;
        }
    }

    formatRequestEffect(effect) {
        return `Make a request check on the target with ${this.formatCalcBonus(effect)}`;
    }

    formatStatusEffect(effect) {
        let state = WuxDef.Get(effect.effect);
        let target = "Target";
        let plural = "s";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
        }

        switch (effect.subType) {
            case "Add":
                return `${target} gain${plural} the ${state.title} ${state.group}`;
            case "Remove":
                return `${target} lose${plural} the ${state.title} ${state.group}`;
            case "Remove Any":
                return `${target} lose${plural} any condition of your choice`;
            case "Remove All":
                return `${target} lose${plural} all conditions of your choice`;
            case "Remove Will":
                return `${target} lose${plural} all emotions of their choice`;
            case "Self":
                return `${target} gain${plural} the ${state.title} ${state.group} targeted towards the caster`;
            case "Choose":
                return `${target} gain${plural} the ${state.title} ${state.group} targeted towards a character of your choice`;
            default:
                return `${target} gain${plural} the ${state.title} ${state.group}`;
        }
    }
    
    formatResistanceEffect(effect) {
        let target = "Target";
        let plural = "s";
        let copulas = "is";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
        }
        let resistance = WuxDef.GetTitle("Resistance");
        let damageType = WuxDef.GetTitle(effect.effect);
        return `${target} gain${plural} ${this.formatCalcBonus(effect)} ${resistance} against ${damageType} damage`;
    }

    formatAdvantageEffect(effect) {
        let target = "The Target";
        let plural = "s";
        let owner = "their";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
            owner = "your";
        }
        let formatCalc = this.formatCalcBonus(effect);

        switch (effect.subType) {
            case "Opponent":
                return `The next ${effect.effect} made against ${target} gains +${Math.abs(formatCalc)} ${formatCalc > 0 ? "Advantage" : "Disadvantage"}`;
            default:
                return `${target} gain${plural} +${Math.abs(formatCalc)} ${formatCalc > 0 ? "Advantage" : "Disadvantage"} on ${owner} next ${effect.effect}`;
        }
    }

    formatBoostEffect(effect) {
        switch (effect.subType) {
            case "Set":
                return `${WuxDef.GetTitle(effect.effect)} is set to ${this.formatCalcBonus(effect)}`;
            case "Penalty":
                return `${WuxDef.GetTitle(effect.effect)} decreases by ${this.formatCalcBonus(effect)}`;
            default:
                return `${WuxDef.GetTitle(effect.effect)} increases by ${this.formatCalcBonus(effect)}`;
        }
    }

    formatTerrainEffect(effect) {
        let terrainType = WuxDef.GetTitle(effect.effect);
        switch (effect.subType) {
            case "Add":
                return `The area is considered [${terrainType}].`;
            case "Remove":
                return `Any effects in the area considered [${terrainType}] are removed.`;
        }
    }

    formatStructureEffect(effect) {
        switch (effect.subType) {
            case "Count":
                return `You create ${this.formatCalcBonus(effect)} ${effect.effect} in the targeted spaces.`;
            case "Height":
                return `Each ${effect.effect} is ${this.formatCalcBonus(effect)} spaces high.`;
            case "HP":
                return `Each ${effect.effect} has ${this.formatCalcBonus(effect)} ${WuxDef.GetTitle("HP")}.`;
            default:
                return effect.effect;
        }
    }

    formatMoveEffect(effect) {
        let target = "Target";
        let plural = "s";
        let copulas = "is";
        if (effect.target == "Self") {
            target = "You";
            plural = "";
            copulas = "are";
        }
        
        switch (effect.subType) {
            case "Charge":
                return `${target} gain${plural} ${this.formatCalcBonus(effect)} Move Charge.`;
            case "Pushed":
                return `${target} ${copulas} Pushed ${this.formatCalcBonus(effect)} spaces ${effect.effect == "" ? "from you." : effect.effect}`;
            case "Pulled":
                return `${target} ${copulas} Pulled ${this.formatCalcBonus(effect)} spaces ${effect.effect == "" ? "towards you." : effect.effect}`;
            case "ForceMove":
                return `${target} ${copulas} Force Moved ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "." : " " + effect.effect}`;
            case "Aloft":
                return `${target} stays aloft and moves up to ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "." : " " + effect.effect}`;
            case "Float":
                return `${target} Float${plural}.`;
            case "FreeMove":
                return `${target} may Free Move up to ${this.formatCalcBonus(effect)} spaces${effect.effect == "" ? "." : " " + effect.effect}`;
            case "Sneak":
                return `${target} may Move up to ${this.formatCalcBonus(effect)} spaces. Your movement does not break your hidden status.`;
            case "Invis":
                return `${target} may Move up to ${this.formatCalcBonus(effect)} spaces. Your movement does not break your hidden or invisible status.`;
            default:
                return `${target} may Move up to ${this.formatCalcBonus(effect)} spaces.`;
        }
    }

    formatEnEffect(effect) {
        let effectTotal = this.formatCalcBonus(effect);
        if (effect.target == "Self") {
            return `You gain ${effectTotal} ${WuxDef.GetTitle("EN")}`;
        } else {
            return `Target gains ${effectTotal} ${WuxDef.GetTitle("EN")}`;
        }
    }

    formatDescriptionEffect(effect) {
        return effect.effect;
    }

    getTargetString(effect, plural) {
        let output = {
            target: "",
            plural: ""
        };
        if (effect.target == "Self") {
            output.target = "You";
            output.plural = "";
        } else {
            output.target = "Target";
            output.plural = plural;
        }
        return output;
    }

    formatCalcBonus(effect) {
        let output = this.formatEffectDice(effect);
        let formulaString;
        try {
            formulaString = effect.formula.getString();
        } catch (e) {
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

class ItemDisplayData {
    constructor(item) {
        this.createEmpty();
        if (item != undefined) {
            this.importItem(item);
        }
    }

    importItem(item) {
        this.item = item;
        this.name = item.name;
        this.displayname = item.displayname;
        this.sheetname = item.sheetname;
        this.group = `${item.group}${item.category != "" ? ` (${item.category})` : ""}`;
        this.stats = `Base Value: ${item.value}; Bulk: ${item.bulk}`;
        this.traits = WuxDef.GetValues(item.traits, ";", "Trait_");
        this.description = item.description;
        
        if (item.itemType == "UsableItem") {
            this.craftSkill = `DC ${item.dc} ${item.skill} Check; Time: ${item.time}`;
            this.craftMaterials = item.skill == "Build" ? `${item.bulk}` : "";
            if (item.components != "") {
                this.craftComponents = this.getComponents(item.components);
            }
        }
    }

    getComponents(components) {
        let setDelimiter = ";";
        let quantityDelimiter = " ";
        let typeDelimiter = "_";
        
        components = components.split(setDelimiter);

        let output = [];
        let splitter = "";
        let quantity = "";
        let type = "";
        let name = "";
        let item = {};

        for (let i = 0; i < components.length; i++) {
            item = undefined;
            let firstIndex = components[i].indexOf(quantityDelimiter);
            quantity = components[i].substring(0, firstIndex);
            splitter = components[i].substring(firstIndex + 1).split(typeDelimiter);
            type = splitter[0];
            name = splitter[1];
            switch (type) {
                case "Goods":
                    item = WuxGoods.Get(name);
                    break;
                case "GoodsCat":
                    output.push({
                        quantity: quantity,
                        type: "Goods Category",
                        item: item,
                        name: `${quantity} ${item.name}`,
                        desc: item.description
                    });
                    break;
                default:
                    item = WuxItems.Get(name);
                    break;
            }
            
            if (item != undefined) {
                output.push({
                    quantity: quantity,
                    type: type,
                    item: item,
                    name: `${quantity} ${item.name}`,
                    desc: item.description
                });
            }
        }

        return output;
    }

    createEmpty() {
        this.item = {};
        this.name = "";
        this.displayname = "";
        this.sheetname = "";
        this.group = "";
        this.stats = "";
        this.traits = [];
        this.description = "";
        this.craftSkill = "";
        this.craftMaterials = "";
        this.craftComponents = [];
    }
}

// Helper

class FormulaData {

    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (data.workers == undefined) {
                this.importFormula(data);
            } else {
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
        this.iterateFormulaComponentsForImport(data, function (definitionName, definitionNameModifier, multiplier, max) {
            if (isNaN(parseInt(definitionName))) {
                definition = WuxDef.Get(definitionName);
                if (definitionNameModifier == "") {
                    formulaVar = definition.getVariable();
                } else {
                    modDefinition = WuxDef.Get(definitionNameModifier);
                    formulaVar = definition.getVariable(modDefinition.getVariable());
                }

                formulaData.workers.push(formulaData.makeWorker(formulaVar, definitionName, 0, multiplier, max));
            } else {
                formulaData.workers.push(formulaData.makeWorker("", "", parseInt(definitionName), multiplier, max));
            }
        })
    }

    iterateFormulaComponentsForImport(baseFormula, callback) {
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
        }
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

    getValue(attributeHandler, printName) {
        let output = 0;
        let mod = 0;
        let printOutput = "";
        this.workers.forEach((worker) => {
            if (worker.variableName != "") {
                worker.value = attributeHandler.parseInt(worker.variableName);
                if (printName != undefined) {
                    printOutput = this.addPrintModifier(printOutput, `${worker.variableName}(${worker.value})`, worker.multiplier);
                }
            } else if (printName != undefined) {
                printOutput = this.addPrintModifier(printOutput, `${worker.value}`, worker.multiplier);
            }
            mod = worker.value * worker.multiplier;
            if (worker.max > 0 && mod > worker.max) {
                mod = worker.max;
            }
            output += mod;
        });
        if (printName != undefined) {
            Debug.Log(`${printName} Formula: ${printOutput} = ${output}`);
        }
        return output;
    }
    addPrintModifier(printOutput, value, multiplier) {
        if (printOutput != "") {
            printOutput += ` + `;
        }
        printOutput += value;
        if (multiplier != 1) {
            printOutput += `*${multiplier}`;
        }
        return printOutput;
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
                            if (worker.multiplier > 1) {
                                output += `[${definition.title} x ${worker.multiplier}]`;
                            } else {
                                switch (worker.multiplier) {
                                    case 0.5:
                                        output += `[½ ${definition.title}]`;
                                        break;
                                    case 0.33:
                                        output += `[⅓ ${definition.title}]`;
                                        break;
                                    case 0.25:
                                        output += `[¼ ${definition.title}]`;
                                        break;
                                    case 0.2:
                                        output += `[⅕ ${definition.title}]`;
                                        break;
                                }
                            }
                        } else {
                            output += `[${definition.title}]`;
                        }

                        if (worker.max > 0) {
                            output += `(max:${worker.max})`;
                        }
                    }
                }
            } else {
                if (output != "") {
                    output += " + ";
                }
                output += worker.value;
            }

        });
        return output;
    }
}

class DieRoll {
    constructor(dieRoll) {
        this.createEmpty();
        if (dieRoll != undefined) {
            this.clone(dieRoll);
        }
    }

    createEmpty() {
        this.rolls = [];
        this.keeps = [];
        this.message = "";
        this.total = 0;
    }

    clone(dieRoll) {
        this.rolls = dieRoll.rolls;
        this.keeps = dieRoll.keeps;
        this.message = dieRoll.message;
        this.total = dieRoll.total;
    }

    rollDice(dieValue, dieType) {
        this.rolls = [];
        this.message = "Rolls(";
        let dieRoll = 0;
        while (dieValue > 0) {
            dieValue--;
            dieRoll = randomInteger(dieType);
            this.rolls.push(dieRoll);
            this.message += `${dieRoll}`;
            if (dieValue > 0) {
                this.message += `, `;
            }
        }
        this.message += `)`;
        this.total = this.totalValues(this.rolls);
    }

    totalValues(values) {
        let total = 0;
        _.each(values, function (obj) {
            total += obj;
        });
        return total;
    }

    sortRollsAscending() {
        this.rolls.sort();
    }

    sortRollsDescending() {
        this.rolls = Format.SortArrayDecrementing(this.rolls);
    }

    dropRollDice(dieCount, dieType, keepCount, keepHigh) {
        this.rollDice(dieCount, dieType);
        if (keepHigh) {
            this.sortRollsDescending();
        } else {
            this.sortRollsAscending();
        }

        this.message = "Rolls(";
        for (let i = 0; i < this.rolls.length; i++) {
            if (i < keepCount) {
                this.keeps.push(this.rolls[i]);
                this.message += `[${this.rolls[i]}]`;
            } else {
                this.message += `${this.rolls[i]}`;
            }
            if (i < this.rolls.length - 1) {
                this.message += `, `;
            }
        }
        this.message += `)`;
        this.total = this.totalValues(this.keeps);
    }

    rollCheck(advantages) {
        let dieCount = 2 + Math.abs(advantages);
        let dieType = 6;
        this.dropRollDice(dieCount, dieType, 2, advantages >= 0);
    }

    addModToRoll(mod) {
        this.total += mod;
        this.message += ` + Mod[${mod}]`;
    }

    rollSkillCheck(advantages, mod) {
        this.rollCheck(advantages);
        this.addModToRoll(mod);
    }
}

class ResistanceData {
    constructor(json) {
        if (json != undefined) {
            this.importJson(json);
        } else {
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
        } else if (this[damageType] > 0) {
            return `${damageType} Resistance: ${this[damageType]}`;
        } else {
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

class StatusHandler {
    constructor(attributeHandler) {
        this.attributeHandler = attributeHandler;
        this.statusDef = WuxDef.Get("Status");
        this.attributeHandler.addMod(this.statusDef.getVariable());
        this.combatDetailsHandler = new CombatDetailsHandler(this.attributeHandler);
    }

    changeStatus(statusName, newValue) {
        let statusHandler = this;
        let status = WuxDef.Get(statusName);
        if (status == undefined) {
            Debug.LogError(`[StatusHandler][addStatus] Tried to add incorrect status ${statusName}`);
            return;
        }
        this.attributeHandler.addUpdate(status.getVariable(), newValue);
        this.attributeHandler.addMod(this.statusDef.getVariable());
        
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let statuses = attrHandler.parseJSON(statusHandler.statusDef.getVariable());
            if (statuses == undefined || statuses == "" || statuses == "0") {
                statuses = [];
            }
            if (!Array.isArray(statuses)) {
                statuses = [statuses];
            }
            if (newValue == "on") {
                if (statuses.includes(statusName)) {
                    return;
                }
                statuses.push(statusName);
                attrHandler.addUpdate(statusHandler.statusDef.getVariable(), JSON.stringify(statuses));
            } else if (newValue == 0) {
                let statusIndex = statuses.indexOf(statusName);
                if (statusIndex == -1) {
                    return;
                }
                statuses.splice(statusIndex, 1);
                attrHandler.addUpdate(statusHandler.statusDef.getVariable(), JSON.stringify(statuses));
            }

            statusHandler.combatDetailsHandler.onUpdateStatus(attrHandler, statuses);
        });
        this.attributeHandler.run();
    }
}

class CombatDetails {
    constructor(json) {
        this.createEmpty();
        if (json != undefined) {
            this.importJson(json);
        }
    }

    createEmpty() {
        this.displayStyle = "";
        this.displayName = "";
        this.cr = 1;
        this.job = "";
        this.jobDefenses = "";
        this.status = [];
        this.healvalue = 0;
        this.surges = 2;
        this.maxsurges = 2;
        this.vitality = 1;
        this.maxvitality = 1;
        this.supportiveInfluence = 0;
        this.opposingInfluence = 0;
    }

    importJson(json) {
        this.displayStyle = json.displayStyle != undefined ? json.displayStyle : "";
        this.displayName = json.displayName != undefined ? json.displayName : "";
        this.cr = json.cr != undefined ? json.cr : 1;
        this.job = json.job != undefined ? json.job : "";
        this.jobDefenses = json.jobDefenses != undefined ? json.jobDefenses : "";
        this.status = json.status != undefined ? json.status : [];
        this.healvalue = json.healvalue;
        this.surges = json.surges != undefined ? json.surges : 2;
        this.maxsurges = json.maxsurges != undefined ? json.maxsurges : 2;
        this.vitality = json.vitality != undefined ? json.vitality : 1;
        this.maxvitality = json.maxvitality != undefined ? json.maxvitality : 1;
        this.supportiveInfluence = json.supportiveInfluence != undefined ? json.supportiveInfluence : 0;
        this.opposingInfluence = json.opposingInfluence != undefined ? json.opposingInfluence : 0;
    }

    printTooltip() {
        let output = `${this.displayName} [CR${this.cr}] ${this.job}`;
        output += ` =========================== `;
        output += `${this.jobDefenses} - `;

        switch (this.displayStyle) {
            case "Battle":
                output += `HV:${this.healvalue}`;
                output += `.Surges:`;
                for (let i = 0; i < this.maxsurges; i++) {
                    output += i < this.surges ? `⛊` : `⛉`;
                }
                output += `.Vit:`;
                for (let i = 0; i < this.maxvitality; i++) {
                    output += i < this.vitality ? `♥` : `♡`;
                }
                break;
            case "Social":
                output += `Influences:`;
                for (let i = 0; i < 3; i++) {
                    output += i < this.supportiveInfluence ? `▲` : `△`;
                }
                for (let i = 0; i < 3; i++) {
                    output += i < this.opposingInfluence ? `▼` : `▽`;
                }
                break;
        }
        output += this.printTooltipStatus();
        return output;
    }

    printTooltipStatus() {
        let output = ` ==========STATUS========== `;

        if (this.status.length == 0) {
            output += `None`;
        } else {
            let statuses = "";
            let conditions = "";
            let emotions = "";
            for (let i = 0; i < this.status.length; i++) {
                let statusDef = WuxDef.Get(this.status[i]);
                switch (statusDef.subGroup) {
                    case "Status":
                        statuses = this.addStatusToTooltip(statusDef, "Status", statuses);
                        break;
                    case "Condition":
                        conditions = this.addStatusToTooltip(statusDef, "Conditions", conditions);
                        break;
                    case "Emotion":
                        emotions = this.addStatusToTooltip(statusDef, "Emotions", emotions);
                        break;
                }
            }
            output += statuses != "" ? `${statuses} ` : "";
            output += conditions != "" ? `${conditions} ` : "";
            output += emotions != "" ? `${emotions} ` : "";
        }

        return output;
    }

    addStatusToTooltip(statusDef, groupname, group) {
        if (group == "") {
            group = `${groupname}:`;
        } else {
            group += ";";
        }
        group += statusDef.title();
        return group;
    }
}

class CombatDetailsHandler {
    constructor(attributeHandler) {
        this.combatDetailsVar = WuxDef.GetVariable("CombatDetails");
        attributeHandler.addMod(this.combatDetailsVar);
        this.combatDetails = new CombatDetails();
    }

    printTooltip(attrHandler) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        return this.combatDetails.printTooltip();
    }

    onUpdateDisplayStyle(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.displayStyle = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateDisplayName(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.displayName = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateCR(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.cr = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateJob(attrHandler, jobDef) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.job = jobDef.title;
        this.combatDetails.jobDefenses = jobDef.defenses;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateHealValue(attrHandler, healValue) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.healvalue = healValue;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateStatus(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.status = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateSurges(attrHandler, value) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.surges = value;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }

    onUpdateInfluences(attrHandler, support, oppose) {
        this.combatDetails.importJson(attrHandler.parseJSON(this.combatDetailsVar));
        this.combatDetails.supportiveInfluence = support;
        this.combatDetails.opposingInfluence = oppose;
        attrHandler.addUpdate(this.combatDetailsVar, JSON.stringify(this.combatDetails));
    }
}

class AttributeHandler {
    constructor(mods) {
        if (Array.isArray(mods)) {
            this.mods = mods;
        } else {
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
        } else {
            this.mods.push(mods);
        }
    }

    addFormulaMods(definition, printLog) {
        if (printLog) {
            Debug.Log(`Adding formula mods for ${definition.name}`);
        }
        this.addMod(definition.formula.getAttributes());
    }

    addUpdate(attr, value) {
        if (value == undefined) {
            Debug.LogError(`[AttributeHandler][addUpdate] Tried to add undefined value for ${attr}. This is not allowed.`);
            return;
        }
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
        } else if (this.current[fieldName] != undefined) {
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
        } else if (this.current[fieldName] != undefined) {
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
        } else if (this.current[fieldName] != undefined) {
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
        if (this.update[fieldName] != undefined && this.update[fieldName] != "") {
            try {
                return JSON.parse(this.getUpdateValue(fieldName));
            }
            catch {
                return undefined;
            }
        } else if (this.current[fieldName] != undefined && this.current[fieldName] != "") {
            try {
                return JSON.parse(this.getCurrentValue(fieldName));
            }
            catch {
                return undefined;
            }
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
        return this.update[fieldName][this.maxCheck ? "max" : "current"];
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
        Debug.Log(`[SandboxAttributeHandler][addAttribute] Adding attribute ${attr}`);
        this.attributes[attr] = this.getCharacterAttribute(attr);
    }

    getAttribute(attr) {
        if (!this.attributes.hasOwnProperty(attr)) {
            return undefined;
        }
        return this.attributes[attr];
    }

    addUpdate(attr, value, isMax) {
        Debug.Log(`Adding update ${attr} with value ${value}`);
        if (this.attributes[attr] == undefined) {
            Debug.Log(`Adding the attribute ${attr}`);
            this.addAttribute(attr);
        }

        if (this.update[attr] != undefined && this.update[attr] != "") {
            this.update[attr][isMax ? "max" : "current"] = value;
        } else {
            let newUpdate = {};
            newUpdate[isMax ? "max" : "current"] = value;
            super.addUpdate(attr, newUpdate);
        }
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
        for (let property in attributeHandler.update) {
            attribute = attributeHandler.attributes[property];
            updateData = attributeHandler.update[property];
            if (attribute != undefined && updateData != undefined) {
                for (let subProperty in updateData) {
                    attribute.set(subProperty, updateData[subProperty]);
                }
            }
        }
        
    }

    getCharacterAttribute(attrName) {
        let returnVal = undefined;
        let chracterAttributes = findObjs({
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


class RepeatingSectionHandler {
    constructor(definitionId, variableId) {
        this.definition = WuxDef.Get(definitionId);
        this.repeatingSection = this.definition.getVariable(variableId);
        this.ids = [];
        this.fieldNames = [];
    }

    addIds(ids) {
        if (Array.isArray(ids)) {
            this.ids = this.ids.concat(ids);
        } else {
            this.ids.push(ids);
        }
    }

    clearIds() {
        this.ids = [];
    }

    generateRowId() {
        return "";
    }
    
    addFieldNames(fieldNames) {
        if (Array.isArray(fieldNames)) {
            this.fieldNames = this.fieldNames.concat(fieldNames);
        } else {
            this.fieldNames.push(fieldNames);
        }
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
        
    }

    removeAllIds() {
        for (let i = 0; i < this.ids.length; i++) {
            this.removeId(this.ids[i]);
        }
    }
}

class SandboxRepeatingSectionHandler extends RepeatingSectionHandler {
    
    constructor(definitionId, characterId, variableId) {
        super(definitionId, variableId);
        this.characterId = characterId;
    }

    generateUUID() {
        let a = 0, b = [];
        return function () {
            let c = (new Date()).getTime() + 0, d = c === a;
            a = c;
            for (let e = new Array(8), f = 7; 0 <= f; f--) {
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
            for (f = 0; 12 > f; f++) {
                c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
            }
            return c;
        };
    }

    generateRowId() {
        return this.generateUUID().replace(/_/g, "Z");
    }
    
    findRepeatingRowIdAttribute(id) {
        let chracterAttributes = findObjs({
            _characterid: this.characterId,
            _type: "attribute",
            name: id
        }, { caseInsensitive: true });

        if (chracterAttributes.length > 0) {
            return chracterAttributes[0];
        }
        return undefined;
    }
    
    removeId(id) {
        super.removeId(id);
        
        if (this.fieldNames.length == 0) {
            Debug.LogError(`[RepeatingSectionHandler][removeId] No field names to remove for ${this.repeatingSection}`);
            return;
        }
        
        for(let i = 0; i < this.fieldNames.length; i++) {
            let chracterAttribute = this.findRepeatingRowIdAttribute(this.getFieldName(id, this.fieldNames[i]));
            if (chracterAttribute != undefined) {
                chracterAttribute.remove();
            }
        }
    }
}

class WorkerBuildStat extends dbObj {
    importJson(json) {
        this.name = json.name;
        this.value = parseInt(json.value);
    }

    importSheets(dataArray) {
        let i = 0;
        this.name = "" + dataArray[i];
        i++;
        this.value = "" + dataArray[i];
        i++;
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
            } else {
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

            output += `{{Displayname=${techDisplayData.displayname}}}{{Name=${techDisplayData.name}}}{{SlotType=${techDisplayData.slotFooter}}}{{Source=${techDisplayData.slotSource}}}{{UsageInfo=${techDisplayData.usageInfo}}}${techDisplayData.traits.length > 0 ? rollTemplateTraits(techDisplayData.traits, "Trait") : ""}${techDisplayData.trigger ? `{{Trigger=${techDisplayData.trigger}}}` : ""}${techDisplayData.requirement ? `{{Requirement=${techDisplayData.requirement}}}` : ""}${techDisplayData.item ? `{{Item=${techDisplayData.item}}}` : ""}${techDisplayData.range ? `{{Range=${techDisplayData.range}}}` : ""}${techDisplayData.target ? `{{Target=${techDisplayData.target}}}` : ""}${techDisplayData.skill ? `{{SkillString=${techDisplayData.skill}}}` : ""}${techDisplayData.damage ? `{{DamageString=${techDisplayData.damage}}}` : ""}${techDisplayData.description ? `{{Desc=${techDisplayData.description}}}` : ""}${techDisplayData.onHit ? `{{OnHit=${techDisplayData.onHit}}}` : ""}${techDisplayData.conditions ? `{{Conditions=${techDisplayData.conditions}}}` : ""}`;
            output += ` {{type-${techDisplayData.slotType}=1}} ${techDisplayData.slotIsPath ? "{{isPath=1}} " : ""}{{type-${techDisplayData.actionType}=1}} ${techDisplayData.isFunctionBlock ? "{{type-FunctionBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlock=1}} " : ""}${techDisplayData.isCheckBlock ? "{{type-CheckBlockTarget=1}} " : ""}${techDisplayData.isDescBlock ? "{{type-DescBlock=1}} " : ""}`;

            return `&{template:technique} ${output.trim()}`;
        },

        getRollTemplateFromTechnique = function (technique) {
            return getRollTemplate(new TechniqueDisplayData(technique));
        },

        // Formatting
        // ------------------------,

        rollTemplateTraits = function (traitsDb, rtPrefix) {
            let output = "";
            for (let i = 0; i < traitsDb.length; i++) {
                output += `{{${rtPrefix}${i}=${traitsDb[i].name}}} {{${rtPrefix}${i}Desc=${traitsDb[i].description}}} `;
            }
            return output;
        },

        getDamageString = function (feature) {

            let output = "";

            if (feature.dVal != "" && feature.dVal > 0) {
                output += feature.dVal + "d" + feature.dType;
            }
            if (feature.dBonus != "" && feature.dBonus != undefined) {
                let elements = feature.dBonus.split(";");
                for (let i = 0; i < elements.length; i++) {
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

        getPrerequisiteString = function () {
            return "";
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
                case "S":
                    actionEffectsObj.addState(effect, targetSelf);
                    break;
                case "C":
                    actionEffectsObj.addCondition(effect, targetSelf);
                    break;
                case "R":
                    actionEffectsObj.addRemoval(effect, targetSelf);
                    break;
                case "SR":
                    actionEffectsObj.addStatusRemoval(effect, targetSelf);
                    break;
                case "H":
                    actionEffectsObj.addHeal(effect, targetSelf);
                    break;
                case "T":
                    actionEffectsObj.addTempHeal(effect, targetSelf);
                    break;
                case "K":
                    actionEffectsObj.addEnergyRecovery(effect, targetSelf);
                    break;
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
                    return {name: name, targetSelf: targetSelf};
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
        RollTemplateTraits: rollTemplateTraits,
        GetDamageString: getDamageString,
        GetPrerequisiteString: getPrerequisiteString,
        GetActionEffects: getActionEffects
    };

}());

var ItemHandler = ItemHandler || (function () {
    'use strict';

    let getTechniqueWeaponRollTemplate = function (itemData) {
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

    let toCamelCase = function (inputString) {

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
            let digits = String(+num).split(""),
                key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
            let roman = "",
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
            macro = macro.replace(/}/gi, "&#125;");
            return macro;
        },

        parseMacroJSON = function (macro) {
            macro = macro.replace(/%#/g, '"');
            return JSON.parse(macro);
        },

        sanitizeMacroRollTemplate = function (roll) {
            let sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/\{/gi, "&#123;");
            sheetRoll = sheetRoll.replace(/}/gi, "&#125;");
            return sheetRoll;
        },

        sanitizeSheetRoll = function (roll) {
            let sheetRoll = roll;
            sheetRoll = sheetRoll.replace(/%/g, "&#37;");
            sheetRoll = sheetRoll.replace(/\)/g, "&#41;");
            sheetRoll = sheetRoll.replace(/\*/g, "&#42;");
            sheetRoll = sheetRoll.replace(/</g, "&#60;");
            sheetRoll = sheetRoll.replace(/>/g, "&#62;");
            sheetRoll = sheetRoll.replace(/\?/g, "&#63;");
            sheetRoll = sheetRoll.replace(/@/g, "&#64;");
            sheetRoll = sheetRoll.replace(/\[/g, "&#91;");
            sheetRoll = sheetRoll.replace(/]/g, "&#93;");
            sheetRoll = sheetRoll.replace(/\n/g, "<br />");
            return sheetRoll;
        },

        sanitizeSheetRollAction = function (roll) {
            let sheetRoll = roll;
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

var RowId = RowId || (function () {
    'use strict';

    let buildId = function (sectionName, currentID, variableName) {

            if (variableName.startsWith("attr")) {
                variableName = variableName.substring(4);
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
        variableName = variableName.substring(4);
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
    let len = repeatingSection.length + 1;
    return id.substring(len, 20);
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
    let rnd = Math.floor(Math.random() * 5);
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
    let races;

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
    let rnd = Math.floor(Math.random() * 100);

    for (let i = 0; i < races.length; i++) {
        if (rnd < races[i].odds) {
            return races[i].race;
        }
        rnd -= races[i].odds;
    }

    return "Coastborne";
}

function CharacterGenderGenerator() {
    let rnd = Math.floor(Math.random() * 2);
    if (rnd == 0) {
        return "Male";
    } else {
        return "Female";
    }
}

function CharacterNameGenerator(nationality, race, gender) {
    let firstNameList;
    let lastNameList;
    let firstName;
    let lastName;
    let rnd;

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
    let natures = GetNatureList();

    let rnd = Math.floor(Math.random() * natures.length);

    return natures[rnd];
}

function CharacterClassGenerator(venueClass) {
    // set up variables
    let maxRoll = 0;
    let eliteRoll;
    let highRoll;
    let mediumRoll = 0;


    // these represent ratios or chances each class might show up
    let eliteMod = 1;
    let highMod = 9;
    let mediumMod = 60;
    let lowMod = 120;
    

    // first, we need to determine the maxRoll value which represents the highest possible roll
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
    }


    // select a random number within the Max Range
    let rnd = Math.floor(Math.random() * maxRoll);


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
    let sectors = GetSectorProbabilityList(classCategory);
    let i;

    // determine the number of odds
    let maxRnd = 0;
    for (i = 0; i < sectors.length; i++) {
        maxRnd += sectors[i].odds;
    }

    // select a random sector
    let rnd = Math.floor(Math.random() * maxRnd);
    for (i = 0; i < sectors.length; i++) {
        if (rnd < sectors[i].odds) {
            return sectors[i].sector;
        }
        rnd -= sectors[i].odds;
    }

    return "";
}

function CharacterProfessionGenerator(classCategory, sector) {
    let professions = GetProfessionList(sector);
    let professionsList;

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
    let rnd = Math.floor(Math.random() * professionsList.length);

    return professionsList[rnd];
}

var WuxDef = WuxDef || (function() {
    'use strict';

    var
        keys = ["Attribute","Skill","Archetype","Job","JobStyle","Knowledge","Language","LoreCategory","Lore","Style","StyleType","Forme","Action","Technique","System","PageSet","Page","Title","Popup","Data","Advancement","Training","Perk","Defense","Sense","InnateDefenseType","InnateSenseType","General","Chat","Combat","Social","Influence","SeverityRank","DamageType","TerrainFxType","Trait","Status","Condition","Emotion","Boon","PerkGroup","JobGroup","StyleGroup","StyleSubGroup","AdvancedGroup","GearGroup","ResourceType","Goods","Gear","Consumable","Currency","ToolSlot","ConsumableSlot","_max","_true","_rank","_build","_filter","_subfilter","_expand","_tab","_page","_info","_exit","_finish","_origin","_learn","_pts","_tech","_techset","_expertise","_gear","_affinity","_error","Attr_BOD","Attr_PRC","Attr_QCK","Attr_CNV","Attr_INT","Attr_RSN","Check","CombatDetails","FlatDC","Title_Boon","BoostStyleTech","BoostGearTech","BoostPerkTech","Level","CR","MaxCR","XP","AdvancementJob","AdvancementSkill","AdvancementTechnique","JobTier","JobTechniques","LearnStyle","StyleTechniques","StyleFreeTechniques","TrainingKnowledge","TrainingTechniques","PP","BonusTraining","Def_Brace","Def_Fortitude","Def_Warding","Def_Hide","Def_Reflex","Def_Evasion","Def_Resolve","Def_Freewill","Def_Insight","Def_Notice","Def_Guile","Def_Scrutiny","WillBreak","CharSheetName","SheetName","FullName","DisplayName","IntroName","QuickDescription","Backstory","Age","Gender","Homeland","Ancestry","Affinity","AdvancedAffinity","BonusAttributePoints","JobSlots","AdvancedSlots","StyleSlots","WeaponSlots","EquipmentSlots","Currency_Jin","Currency_Gold","Currency_CP","HP","WILL","EN","StartEN","Cmb_Chakra","Chakra","Power","Accuracy","Artistry","Charisma","Recall","Initiative","CarryingCapacity","Cmb_Vitality","Cmb_Surge","Cmb_HV","Cmb_Armor","Cmb_Hardness","Resistance","Weakness","Cmb_ResistanceDesc","Cmb_WeaknessDesc","Cmb_Mv","Cmb_MvPotency","MvCharge","Soc_Favor","RepeatingInfluences","Soc_Influence","Title_UsingInfluences","Soc_InfluenceDesc","Soc_Severity","Severity","Soc_RequestCheck","Soc_SupportInfluence","Soc_OpposeInfluence","Soc_Impatience","Trait_Arcanify","Trait_Arcing","Trait_Break","Trait_Delayed","Trait_Envoke","Trait_Focus","Trait_Holdfast","Trait_Illusion","Trait_Materialize","Trait_Resonator","Trait_Seeking","Trait_Transmute","Trait_AP","Trait_Brutal","Trait_Optional","Trait_Ammunition","Trait_Axe","Trait_Bow","Trait_Ingested","Trait_Hammer","Trait_Handgun","Trait_Inhalent","Trait_Knife","Trait_Longshot","Trait_Loud","Trait_Magitech","Trait_MaxBulk15","Trait_MaxBulk60","Trait_MaxBulk120","Trait_MaxBulk250","Trait_Medkit","Trait_MinBulk15","Trait_MinBulk60","Trait_MinBulk120","Trait_MinBulk250","Trait_MinDust15","Trait_MinDust60","Trait_MinDust120","Trait_Polearm","Trait_Resonant","Trait_Scattershot","Trait_Sharp","Trait_Sturdy","Trait_Sword","Trait_Edible","Trait_Flammable","Trait_Flexible","Trait_Frozen","Trait_Transparent","Human","Spirit","Wood","WoodF","Fire","FireF","Earth","EarthF","Metal","MetalF","Water","WaterF","Def_BOD","Def_PRC","Def_QCK","Def_CNV","Def_INT","Def_RSN","AttributeValueMediocre","AttributeValueGreat","AttributeValueGood","AttributeValueAverage","AttributeValueBad","JobTier0","JobTier1","JobTier2","JobTier3","JobTier4","JobTier5","JobTier6","LoreTier0","LoreTier1","LoreTier2","LoreTier3","GeneralLoreTier0","GeneralLoreTier1","LoreCat_Academics","LoreCat_Profession","LoreCat_Craftmanship","LoreCat_Geography","LoreCat_History","LoreCat_Culture","LoreCat_Religion","Speak","Whisper","Yell","Think","Describe","Boon_Rest","Boon_Savor","Boon_Truth","InfluenceTrait","InfluenceIdeal","InfluenceBond","InfluenceGoal","Svr_LowSeverity","Svr_ModerateSeverity","Svr_HighSeverity","Dmg_Burn","Dmg_Cold","Dmg_Energy","Dmg_Fire","Dmg_Force","Dmg_Piercing","Dmg_Shock","Dmg_Tension","Dmg_Weapon","Ter_Darkness","Ter_Fog","Ter_Harsh","Ter_Heavy","Ter_Liftstream","Ter_Light","Ter_Slippery","Ter_Sodden","PerkGroup_Origin Perks","PerkGroup_Stat Boost Perks","PerkGroup_Slot Perks","JobGroup_Vanguard","JobGroup_Operator","JobGroup_Athlete","JobGroup_Strategist","JobGroup_Waymaker","JobGroup_Advocate","JobGroup_Esper","StyleGroup_Melee Weaponry","StyleGroup_Ranged Weaponry","StyleGroup_Martial Arts","StyleGroup_Arcanification Magic","StyleGroup_Fluctuation Magic","StyleGroup_Materialization Magic","StyleGroup_Transformation Magic","StyleGroup_Athletics","StyleGroup_Speechcraft","StyleSubGroup_Mighty Weapons","StyleSubGroup_Skirmish Weapons","StyleSubGroup_Finesse Weapons","StyleSubGroup_Shoot Weapons","StyleSubGroup_Throw Weapons","StyleSubGroup_Martial Arts","StyleSubGroup_Kinetics","StyleSubGroup_Evocation","StyleSubGroup_Channelling","StyleSubGroup_Enchantment","StyleSubGroup_Fluctuation","StyleSubGroup_Battlesmithing","StyleSubGroup_Conjury","StyleSubGroup_Transmulation","StyleSubGroup_Physiomancy","StyleSubGroup_Brawn","StyleSubGroup_Stealth","StyleSubGroup_Acrobatics","StyleSubGroup_Persuasion","StyleSubGroup_Cunning","GearGroup_HeadGear","GearGroup_FaceGear","GearGroup_ChestGear","GearGroup_ArmGear","GearGroup_LegGear","GearGroup_FootGear","PageSet_Character Creator","PageSet_Core","PageSet_TechType","PageSet_Advancement","PageSet_Training","Page_Origin","Page_Jobs","Page_Skills","Page_ActiveSkills","Fight","Cast","Athletics","Page_SocialSkills","Persuade","Cunning","Page_TechnicalSkills","Craft","Device","Investigate","Page_Knowledge","Page_Attributes","Page_Styles","Page_LearnTechniques","Page_AdvancedStyles","Page_Forme","Page_JobStyles","Page_Character","Page_Overview","Page_OverviewCharacter","Page_OverviewResources","Page_OverviewStatus","Page_Details","Page_Chat","Page_Options","Page_Gear","Page_Equipped","Page_GearCurrency","Page_GearEquipment","Page_GearItems","Page_GearConsumables","Page_GearGoods","Page_SlotEmpty","Page_AddItem","Page_AddMeleeWeapon","Page_AddRangedWeapon","Page_AddTool","Page_AddCommsTool","Page_AddLightTool","Page_AddBindingsTool","Page_AddMiscTool","Page_AddHeadGear","Page_AddFaceGear","Page_AddChestGear","Page_AddArmGear","Page_AddLegGear","Page_AddFootGear","Page_AddMiscGear","Page_AddRecoveryItem","Page_AddTonicItem","Page_AddBombItem","Page_AddBeverageItem","Page_AddMaterial","Page_AddCompound","Page_AddAnimalGood","Page_AddSupplement","Page_AddFruit","Page_AddVegetable","Page_AddStarch","Page_Actions","Page_Training","Page_Advancement","Page_Perks","Page_Sidebar","Title_Origin","Title_Background","Title_OriginAdvancement","Title_OriginTraining","Title_Advancement","Title_AdvancementConversion","Title_Training","Title_TrainingConversion","Title_ShowTechnique","Title_UseTechnique","Title_Chat","Title_LanguageSelect","Title_Skills","Title_Emotes","Title_Outfits","Title_EquippedGear","Loading","Popup_PopupActive","Popup_SubMenuActive","Popup_SubMenuActiveId","Popup_InspectPopupActive","Popup_InspectPopupName","Popup_ItemInspectionName","Popup_TechniqueInspectionName","Popup_InspectSelectGroup","Popup_InspectSelectType","Popup_InspectSelectId","TechPopupValues","ItemPopupValues","Popup_InspectShowAdd","Popup_InspectAddType","Popup_InspectAddClick","Popup_ItemSelectName","Popup_ItemSelectType","Popup_ItemSelectDesc","Popup_ItemSelectIsOn","Chat_Type","Chat_Target","Chat_Message","Chat_Language","Chat_LanguageTag","Chat_PostContent","RepeatingActiveEmotes","Chat_SetId","Chat_Emotes","Chat_DefaultEmote","Chat_PostName","Chat_PostURL","Chat_OutfitName","Chat_OutfitEmotes","Chat_EmoteName","Chat_EmoteURL","RepeatingOutfits","Chat_OutfitDefault","Chat_OutfitDefaultURL","Forme_SeeTechniques","RepeatingJobStyles","RepeatingStyles","Forme_Name","Forme_Tier","Forme_IsAdvanced","Forme_Actions","Forme_IsEquipped","Forme_Equip","Forme_EquipAdvanced","Forme_Unequip","Forme_JobSlot","Forme_AdvancedSlot","Forme_StyleSlot","Action_Use","Action_Inspect","Action_Actions","Action_SetData","Action_Techniques","RepeatingJobTech","RepeatingAdvTech","RepeatingGearTech","RepeatingBasicActions","RepeatingBasicRecovery","RepeatingBasicAttack","RepeatingBasicSocial","RepeatingBasicSpirit","RepeatingCustomTech","TechActionType","TechName","TechDisplayName","TechResourceData","TechTargetingData","TechTrait","TechTrigger","TechRequirements","TechItemReq","TechFlavorText","TechEffect","TechDef","ItemName","ItemAction","ItemCount","ItemGroup","ItemStats","ItemTrait","ItemDescription","ItemCraftSkill","ItemCraftMats","ItemCraft","Gear_Equip","Gear_EquipHead","Gear_EquipFace","Gear_EquipChest","Gear_EquipArm","Gear_EquipLeg","Gear_EquipFoot","Gear_Unequip","Gear_Purchase","Gear_Delete","Gear_Inspect","Gear_EquipmentSlot","RepeatingEquipment","RepeatingConsumables","RepeatingGoods","Gear_ItemName","Gear_ItemActions","Gear_ItemType","Gear_EquipWeapon","Gear_ItemIsEquipped","Gear_ItemEquipMenu","Gear_ItemGroup","Gear_ItemStats","Gear_ItemTrait","Gear_ItemDescription","Gear_WeaponSlot","WeaponDamage","WeaponDamageVal","System_Crafting","System_CraftingComponent","CraftBulk","CraftResources","CraftSkill","CraftDC","CraftTime","System_Cooking","System_HighQualityMeals","Title_ResourceCost","Title_Targetting","Title_Range","Title_Patterns","Line","Cone","Blast","Burst","Zone","Title_ValidTargets","Title_LineOfSight","Title_Cover","Title_TechEffect","Title_TechDC","Title_TechEvasion","Title_TechDefense","Title_TechOnRound","Title_TechOnTurn","Title_TechOnEnter","Title_TechOnEndFocus","Title_TechNewTargets","Move","Adjacency","Obstruction","StrideRoll","MaxStride","FreeMove","Pulled","Pushed","ForceMove","Jump","Fly","Lifting","Falling","Teleport","Bulk","Style_Basic Action","Style_Basic Recovery","Style_Basic Attack","Style_Basic Social","Style_Basic Spirit","Style_Hammering Arte","Style_Cleaving Arte","Style_Battering Arte","Style_Berserker Arte","Style_Mauler Arte","Style_Avenger Arte","Style_Chargestrike Arte","Style_Overwhelming Arte","Style_Arcanestrike Arte","Style_Duelist Arte","Style_Swashbuckling Arte","Style_Phalanx Arte","Style_Jumpspear Arte","Style_Spellblade Arte","Style_Fencer Arte","Style_Sky Pike Arte","Style_Finesse Blade Arte","Style_Whip Arte","Style_Flashcut Arte","Style_Trickster Arte","Style_Forceful Fist Arte","Style_Stepflow Arte","Style_Aerial Arte","Style_Wrestling Arte","Style_Galegrip Arte","Style_Powerarm Arte","Style_Swaying Palm Arte","Style_Skyfall Arte","Style_Ironhold Arte","Style_Heaven's Reach Arte","Style_Rapid Strikes Arte","Style_Archery Arte","Style_Trick Arrow Arte","Style_Gunslinger Arte","Style_Sentry Arte","Style_Longsight Arte","Style_Scatterpoint Arte","Style_Bowmaster Arte","Style_Pistolero Arte","Style_Bomber Arte","Style_Daggerthrow Arte","Style_Blasting Flames","Style_Shock Bomb","Style_Arcane Spellshot","Style_Flaming Sphere","Style_Lightning Shot","Style_Area Spark","Style_Binding Cold","Style_Chilling Blast","Style_Hellfire","Style_Storm Caller","Style_Sheer Cold","Style_Whispering Wind","Style_Bursting Fire","Style_Fire Field","Style_Close Circuit","Style_Ice Storm","Style_Manification","Style_Light Control","Style_Darkness Weaving","Style_Sound Control","Style_Arcane Conduit","Style_Freeform Flight","Style_Ether Magic","Style_Time Control","Style_Levitation","Style_Kinetic Assault","Style_Surging Dust","Style_Dust Impact","Style_Propelling Force","Style_Binding Winds","Style_Telekinesis","Style_Windsweep","Style_Gravity Force","Style_Surging Water","Style_Throwcraft","Style_Conjure Blades","Style_Conjure Skyfall","Style_Warsmith","Style_Structural Magic","Style_Clouded Shroud","Style_Arbormaking","Style_Floral Shroud","Style_Smoke Field","Style_Stonemaking","Style_Iron Walls","Style_Glacial Walls","Style_Misty Terrtain","Style_Structural Mastery","Style_Poison Spore","Style_Dust Shaping","Style_Unshaping","Style_Plant Growth","Style_Calming Blooms","Style_Verdant Armory","Style_Terrain Molding","Style_Ground Splitter","Style_Earthen Armory","Style_Water Shape","Style_Icy Terrain","Style_Frozen Armory","Style_Geomancy","Style_Cryomancy","Style_Healing Hands","Style_Earthen Endurance","Style_Propelling Motion","Style_Soul Surge","Style_Blood Flux","Style_Powerwake","Style_Enduring Body","Style_Traversal","Style_Hidden Footing","Style_Remotion","Style_Evasive Maneuvers","Style_Unbeatable Brawn","Style_Unrelenting Motion","Style_Shadow Walking","Style_Reactive Defense","Style_Invigorating Rally","Style_Avowed","Style_Social Grace","Style_Flattery","Style_Deft Negotiator","Style_Sales Tactics","Style_Taunting Wit","Style_Underminer","Style_Intimidating Fear","Style_Beguiling Instinct","Style_Stillheart","Style_Connecting Bond","Skill_Agility","Skill_Alchemy","Skill_Analyze","Skill_Build","Skill_Channel","Skill_Charm","Skill_Conjure","Skill_Cook","Skill_Demoralize","Skill_Empathy","Skill_Enchant","Skill_Finesse","Skill_Glyphwork","Skill_Grappling","Skill_Heal","Skill_Inspire","Skill_Kinesis","Skill_Might","Skill_Misdirect","Skill_Physique","Skill_Pilot","Skill_Rationalize","Skill_Resonance","Skill_Search","Skill_Shape","Skill_Shoot","Skill_Skirmish","Skill_Sneak","Skill_Throw","Skill_Tinker","Lang_Minere","Lang_Junal","Lang_Apollen","Lang_Lib","Lang_Cert","Lang_Byric","Lang_Dustell","Lang_Muralic","Lang_Shira","Lang_Ciel","Lang_Citeq","Lang_Manstan","Lang_Salkan","Lang_Sansic","Lang_Silq","Lang_Kleikan","Lang_Crinere","Lang_Palmic","Lang_Shorespeak","Lang_Verdeni","Lang_Vulca","Lang_Emotion","Lang_Empathy","Lang_Wolfwarg","Lang_Jovean","Lang_Mytikan","Lore_Health","Lore_Mana","Lore_Mathematics","Lore_Nature","Lore_School","Lore_Spirit","Lore_Warfare","Lore_Zoology","Lore_Arboriculture","Lore_Farming","Lore_Fishing","Lore_Hunting","Lore_Legal","Lore_Mercantile","Lore_Mining","Lore_Alchemy","Lore_Architecture","Lore_Brewing","Lore_Cooking","Lore_Engineering","Lore_Glassblowing","Lore_Leatherworking","Lore_Sculpting","Lore_Smithing","Lore_Weaving","Lore_Aridsha","Lore_Ceres","Lore_Colswei","Lore_Khem","Lore_Novus","Lore_Walthair","Lore_Wayling","Lore_Ethereal Plane","Lore_Aridsha History","Lore_Ceres History","Lore_Colswei History","Lore_Khem History","Lore_Novus History","Lore_Walthair History","Lore_Wayling History","Lore_Art","Lore_Etiquette","Lore_Fashion","Lore_Games","Lore_Music","Lore_Scribing","Lore_Theater","Lore_Church of Kongkwei","Lore_Guidance","Lore_Life's Circle","Lore_Ocean Court","Lore_Sylvan","Lore_Zushaon","Job_Fighter","Job_Sentinel","Job_Warden","Job_Bulwark","Job_Hunter","Job_Sniper","Job_Trooper","Job_Warmage","Job_Alchemist","Job_Brawler","Job_Kineticist","Job_Rogue","Job_Labourer","Job_Tactician","Job_Magus","Job_Scholar","Job_Inquisitor","Job_Detective","Job_Culinarian","Job_Bard","Job_Medic","Job_Spellwright","Job_Empath","Job_Merchant","Job_Orator","Job_Hardliner","Job_Etherealist","Job_Shade","JStyle_Fighter","JStyle_Sentinel","JStyle_Warden","JStyle_Bulwark","JStyle_Hunter","JStyle_Sniper","JStyle_Trooper","JStyle_Warmage","JStyle_Alchemist","JStyle_Brawler","JStyle_Kineticist","JStyle_Rogue","JStyle_Labourer","JStyle_Tactician","JStyle_Magus","JStyle_Scholar","JStyle_Inquisitor","JStyle_Detective","JStyle_Culinarian","JStyle_Bard","JStyle_Medic","JStyle_Spellwright","JStyle_Empath","JStyle_Merchant","JStyle_Orator","JStyle_Hardliner","JStyle_Etherealist","JStyle_Shade","Stat_Blinded","Stat_Downed","Stat_Dying","Stat_Engaged","Stat_Ethereal","Stat_Exhausted","Stat_Float","Stat_Frozen","Stat_Grappled","Stat_Hidden","Stat_Invisible","Stat_Paralyzed","Stat_Restrained","Stat_Unconscious","Stat_Aflame","Stat_Armored","Stat_Bleeding","Stat_Chilled","Stat_Dodge","Stat_Encumbered","Stat_Empowered","Stat_Hindered","Stat_Immobilized","Stat_Impaired","Stat_Jolted","Stat_Prone","Stat_Quickened","Stat_Shielded","Stat_Sickened","Stat_Stunned","Stat_Angered","Stat_Calmed","Stat_Doubt","Stat_Encouraged","Stat_Frightened","Stat_Flustered","Stat_Overjoyed","Stat_Persevering","Stat_Receptive","Stat_Surprised","Stat_Steadfast"],
        values = {"Attribute":{"name":"Attribute","fieldName":"attribute","group":"Type","description":"","variable":"atr{0}{1}","title":"Attributes","subGroup":"","descriptions":[""],
                "abbreviation":"Attr","baseFormula":"6;CR:_max;BonusAttributePoints","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":6,"multiplier":1,"max":0},
                        {"variableName":"adv-cr_max","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"bonusattrpt","definitionName":"BonusAttributePoints","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":["Attribute"],
                "isResource":""},
            "Skill":{"name":"Skill","fieldName":"skill","group":"Type","description":"","variable":"skl{0}{1}","title":"Skills","subGroup":"","descriptions":[""],
                "abbreviation":"Skill","baseFormula":"Level$4;CR:_max;AdvancementSkill","modifiers":"","formula":{"workers":[{"variableName":"adv-level","definitionName":"Level","value":0,"multiplier":1,"max":4},
                        {"variableName":"adv-cr_max","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"adv-ap_skill","definitionName":"AdvancementSkill","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":["Skill:_rank"],
                "isResource":""},
            "Archetype":{"name":"Archetype","fieldName":"archetype","group":"Type","description":"","variable":"arc{0}{1}","title":"Archetype","subGroup":"","descriptions":[""],
                "abbreviation":"Archetype","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Job":{"name":"Job","fieldName":"job","group":"Type","description":"","variable":"job{0}{1}","title":"Jobs","subGroup":"","descriptions":[""],
                "abbreviation":"Job","baseFormula":"CR:_max;AdvancementJob","modifiers":"","formula":{"workers":[{"variableName":"adv-cr_max","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"adv-ap_job","definitionName":"AdvancementJob","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":["Job"],
                "isResource":""},
            "JobStyle":{"name":"JobStyle","fieldName":"jobstyle","group":"Type","description":"","variable":"jbs{0}{1}","title":"Job","subGroup":"","descriptions":[""],
                "abbreviation":"JStyle","baseFormula":"1","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Knowledge":{"name":"Knowledge","fieldName":"knowledge","group":"Type","description":"","variable":"knw{0}{1}","title":"Knowledge","subGroup":"","descriptions":[""],
                "abbreviation":"Know","baseFormula":"3;CR:_max*1;TrainingKnowledge","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0},
                        {"variableName":"adv-cr_max","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"trn-tp_knowledge","definitionName":"TrainingKnowledge","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":["Language:_rank","Lore:_rank","LoreCategory:_rank"],
                "isResource":""},
            "Language":{"name":"Language","fieldName":"language","group":"Type","description":"","variable":"lng{0}{1}","title":"Language","subGroup":"","descriptions":[""],
                "abbreviation":"Lang","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCategory":{"name":"LoreCategory","fieldName":"lorecategory","group":"Type","description":"","variable":"lrc{0}{1}","title":"Lore Category","subGroup":"","descriptions":[""],
                "abbreviation":"LoreCat","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Lore":{"name":"Lore","fieldName":"lore","group":"Type","description":"","variable":"lor{0}{1}","title":"Lore","subGroup":"","descriptions":[""],
                "abbreviation":"Lore","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Style":{"name":"Style","fieldName":"style","group":"Type","description":"","variable":"sty{0}{1}","title":"Styles","subGroup":"","descriptions":[""],
                "abbreviation":"Style","baseFormula":"CR:_max*3;AdvancementTechnique;TrainingTechniques","modifiers":"","formula":{"workers":[{"variableName":"adv-cr_max","definitionName":"CR","value":0,"multiplier":3,"max":0},
                        {"variableName":"adv-ap_technique","definitionName":"AdvancementTechnique","value":0,"multiplier":1,"max":0},
                        {"variableName":"trn-tp_technique","definitionName":"TrainingTechniques","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":["Style"],
                "isResource":""},
            "StyleType":{"name":"StyleType","fieldName":"styletype","group":"Type","description":"","variable":"stt{0}{1}","title":"Styles","subGroup":"","descriptions":[""],
                "abbreviation":"StyleType","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme":{"name":"Forme","fieldName":"forme","group":"Type","description":"","variable":"forme{0}{1}","title":"Forme","subGroup":"","descriptions":[""],
                "abbreviation":"Forme","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Action":{"name":"Action","fieldName":"action","group":"Type","description":"","variable":"act{0}{1}","title":"Action","subGroup":"","descriptions":[""],
                "abbreviation":"Action","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Technique":{"name":"Technique","fieldName":"technique","group":"Type","description":"","variable":"tch{0}{1}","title":"Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"Tech","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "System":{"name":"System","fieldName":"system","group":"Type","description":"","variable":"sys{0}{1}","title":"System","subGroup":"","descriptions":[""],
                "abbreviation":"System","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PageSet":{"name":"PageSet","fieldName":"pageset","group":"Type","description":"","variable":"pgs{0}{1}","title":"Page Set","subGroup":"","descriptions":[""],
                "abbreviation":"PageSet","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page":{"name":"Page","fieldName":"page","group":"Type","description":"","variable":"pag{0}{1}","title":"Page","subGroup":"","descriptions":[""],
                "abbreviation":"Page","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title":{"name":"Title","fieldName":"title","group":"Type","description":"","variable":"ttl{0}{1}","title":"Title","subGroup":"","descriptions":["","This is a title given to the character to briefly describe them. Shown when an introduction call is made."],
                "abbreviation":"Title","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup":{"name":"Popup","fieldName":"popup","group":"Type","description":"","variable":"popup{0}{1}","title":"Popup","subGroup":"","descriptions":[""],
                "abbreviation":"Popup","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Data":{"name":"Data","fieldName":"data","group":"Type","description":"","variable":"data{0}{1}","title":"Data","subGroup":"","descriptions":[""],
                "abbreviation":"Data","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":true},
            "Advancement":{"name":"Advancement","fieldName":"advancement","group":"Type","description":"","variable":"adv{0}{1}","title":"Advancement Points","subGroup":"","descriptions":["Advancement Points are gained whenever you level. ","Every level you gain grants you one advancement point."],
                "abbreviation":"Adv","baseFormula":"Level","modifiers":"","formula":{"workers":[{"variableName":"adv-level","definitionName":"Level","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "Training":{"name":"Training","fieldName":"training","group":"Type","description":"","variable":"trn{0}{1}","title":"Training Points","subGroup":"","descriptions":["Training points are gained through training and whenever you level. You can spend training points on bonus build points for both knowledge and techniques. ","Whenever you gain 30 PP, you gain one Training Point."],
                "abbreviation":"Trn","baseFormula":"3;Level;BonusTraining","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0},
                        {"variableName":"adv-level","definitionName":"Level","value":0,"multiplier":1,"max":0},
                        {"variableName":"trn-bonustraining","definitionName":"BonusTraining","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "Perk":{"name":"Perk","fieldName":"perk","group":"Type","description":"","variable":"perk{0}{1}","title":"Perk Points","subGroup":"","descriptions":["Perks are bonuses granted to a character to represent special aspects of how they function as a character. To purchase a perk, select it from the list by checking its checkbox.","There is a limit as to how many perks a character may have based on the points they have gained. "],
                "abbreviation":"Perk","baseFormula":"CR:_max*2","modifiers":"","formula":{"workers":[{"variableName":"adv-cr_max","definitionName":"CR","value":0,"multiplier":2,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Defense":{"name":"Defense","fieldName":"defense","group":"Type","description":"","variable":"def{0}{1}","title":"Defense","subGroup":"","descriptions":["A defense protects a character from physical harm"],
                "abbreviation":"Def","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Sense":{"name":"Sense","fieldName":"sense","group":"Type","description":"","variable":"sen{0}{1}","title":"Sense","subGroup":"","descriptions":[""],
                "abbreviation":"Def","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "InnateDefenseType":{"name":"InnateDefenseType","fieldName":"innatedefensetype","group":"Type","description":"","variable":"idf{0}{1}","title":"Innate Defense Type","subGroup":"","descriptions":[""],
                "abbreviation":"Def","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "InnateSenseType":{"name":"InnateSenseType","fieldName":"innatesensetype","group":"Type","description":"","variable":"isn{0}{1}","title":"Innate Sense Type","subGroup":"","descriptions":[""],
                "abbreviation":"Def","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "General":{"name":"General","fieldName":"general","group":"Type","description":"","variable":"gen{0}{1}","title":"General","subGroup":"","descriptions":[""],
                "abbreviation":"Gen","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":true},
            "Chat":{"name":"Chat","fieldName":"chat","group":"Type","description":"","variable":"chat{0}{1}","title":"Chat","subGroup":"","descriptions":[""],
                "abbreviation":"Chat","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Combat":{"name":"Combat","fieldName":"combat","group":"Type","description":"","variable":"cmb{0}{1}","title":"Combat","subGroup":"","descriptions":["These statistics determine how well a character can survive in dangerous situations"],
                "abbreviation":"Cmb","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Social":{"name":"Social","fieldName":"social","group":"Type","description":"","variable":"soc{0}{1}","title":"Social","subGroup":"","descriptions":[""],
                "abbreviation":"Soc","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Influence":{"name":"Influence","fieldName":"influence","group":"Type","description":"","variable":"inf{0}{1}","title":"Influence","subGroup":"","descriptions":["","All Influences are given a severity associated with them. This represents how much of an effect the specific influence has on the character. These severities are +1 Low, +2 Moderate, and +3 High.","At character creation, all characters begin with one Moderate influence and one Low influence. Influences can be gained or lost as a character progresses through a story."],
                "abbreviation":"Inf","baseFormula":"2;CR:_max","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0},
                        {"variableName":"adv-cr_max","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"inf","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "SeverityRank":{"name":"SeverityRank","fieldName":"severityrank","group":"Type","description":"","variable":"sev{0}{1}","title":"Severity Rank","subGroup":"","descriptions":[""],
                "abbreviation":"Svr","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "DamageType":{"name":"DamageType","fieldName":"damagetype","group":"Type","description":"","variable":"dmg{0}{1}","title":"Damage Type","subGroup":"","descriptions":[""],
                "abbreviation":"Dmg","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TerrainFxType":{"name":"TerrainFxType","fieldName":"terrainfxtype","group":"Type","description":"","variable":"ter{0}{1}","title":"Terrain Effect Type","subGroup":"","descriptions":[""],
                "abbreviation":"Ter","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait":{"name":"Trait","fieldName":"trait","group":"Type","description":"","variable":"trt{0}{1}","title":"Traits","subGroup":"","descriptions":[""],
                "abbreviation":"Trait","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Status":{"name":"Status","fieldName":"status","group":"Type","description":"","variable":"sts{0}{1}","title":"Status","subGroup":"","descriptions":[""],
                "abbreviation":"Stat","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Condition":{"name":"Condition","fieldName":"condition","group":"Type","description":"","variable":"cnd{0}{1}","title":"Conditions","subGroup":"","descriptions":[""],
                "abbreviation":"Stat","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Emotion":{"name":"Emotion","fieldName":"emotion","group":"Type","description":"","variable":"emo{0}{1}","title":"Emotions","subGroup":"","descriptions":[""],
                "abbreviation":"Stat","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Boon":{"name":"Boon","fieldName":"boon","group":"Type","description":"","variable":"boon{0}{1}","title":"Boon","subGroup":"","descriptions":["",""],
                "abbreviation":"Boon","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PerkGroup":{"name":"PerkGroup","fieldName":"perkgroup","group":"Type","description":"","variable":"perkgroup{0}{1}","title":"Perk Group","subGroup":"","descriptions":[""],
                "abbreviation":"PerkGroup","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup":{"name":"JobGroup","fieldName":"jobgroup","group":"Type","description":"","variable":"jobgroup{0}{1}","title":"Archetype","subGroup":"","descriptions":[""],
                "abbreviation":"JobGroup","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup":{"name":"StyleGroup","fieldName":"stylegroup","group":"Type","description":"","variable":"stylegroup{0}{1}","title":"Style Group","subGroup":"","descriptions":[""],
                "abbreviation":"StyleGroup","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup":{"name":"StyleSubGroup","fieldName":"stylesubgroup","group":"Type","description":"","variable":"stylesubgroup{0}{1}","title":"StyleSubGroup","subGroup":"","descriptions":[""],
                "abbreviation":"StyleSubGroup","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AdvancedGroup":{"name":"AdvancedGroup","fieldName":"advancedgroup","group":"Type","description":"","variable":"advancedgroup{0}{1}","title":"Advanced Group","subGroup":"","descriptions":[""],
                "abbreviation":"AdvancedGroup","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GearGroup":{"name":"GearGroup","fieldName":"geargroup","group":"Type","description":"","variable":"geargroup{0}{1}","title":"Gear Group","subGroup":"","descriptions":[""],
                "abbreviation":"GearGroup","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ResourceType":{"name":"ResourceType","fieldName":"resourcetype","group":"Type","description":"","variable":"resourcetype{0}{1}","title":"Resource Type","subGroup":"","descriptions":[""],
                "abbreviation":"ResourceType","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Goods":{"name":"Goods","fieldName":"goods","group":"Type","description":"","variable":"goods{0}{1}","title":"Goods","subGroup":"","descriptions":[""],
                "abbreviation":"Goods","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear":{"name":"Gear","fieldName":"gear","group":"Type","description":"","variable":"gear{0}{1}","title":"Gear","subGroup":"","descriptions":[""],
                "abbreviation":"Gear","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Consumable":{"name":"Consumable","fieldName":"consumable","group":"Type","description":"","variable":"consu{0}{1}","title":"Consumable","subGroup":"","descriptions":[""],
                "abbreviation":"Consu","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Currency":{"name":"Currency","fieldName":"currency","group":"Type","description":"","variable":"crn{0}{1}","title":"Currency","subGroup":"","descriptions":[""],
                "abbreviation":"Currency","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ToolSlot":{"name":"ToolSlot","fieldName":"toolslot","group":"Type","description":"","variable":"toolslot{0}{1}","title":"Tool Slot","subGroup":"","descriptions":[""],
                "abbreviation":"ToolSlot","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ConsumableSlot":{"name":"ConsumableSlot","fieldName":"consumableslot","group":"Type","description":"","variable":"consuslot{0}{1}","title":"Consumable Slot","subGroup":"","descriptions":[""],
                "abbreviation":"ConsuSlot","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_max":{"name":"_max","fieldName":"_max","group":"VariableMod","description":"","variable":"_max","title":"Max","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_true":{"name":"_true","fieldName":"_true","group":"VariableMod","description":"","variable":"_true","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_rank":{"name":"_rank","fieldName":"_rank","group":"VariableMod","description":"","variable":"_rank","title":"Rank","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_build":{"name":"_build","fieldName":"_build","group":"VariableMod","description":"","variable":"_build","title":"Build","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_filter":{"name":"_filter","fieldName":"_filter","group":"VariableMod","description":"","variable":"_filter","title":"Filter","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_subfilter":{"name":"_subfilter","fieldName":"_subfilter","group":"VariableMod","description":"","variable":"_subfilter","title":"Filter","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_expand":{"name":"_expand","fieldName":"_expand","group":"VariableMod","description":"","variable":"_expand","title":"Expand","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_tab":{"name":"_tab","fieldName":"_tab","group":"VariableMod","description":"","variable":"_tab","title":"Tab","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_page":{"name":"_page","fieldName":"_page","group":"VariableMod","description":"","variable":"_page","title":"Page","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_info":{"name":"_info","fieldName":"_info","group":"VariableMod","description":"","variable":"_info","title":"Page","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_exit":{"name":"_exit","fieldName":"_exit","group":"VariableMod","description":"","variable":"_exit","title":"Exit","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_finish":{"name":"_finish","fieldName":"_finish","group":"VariableMod","description":"","variable":"_finish","title":"Finish","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_origin":{"name":"_origin","fieldName":"_origin","group":"VariableMod","description":"","variable":"_origin","title":"Origin","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_learn":{"name":"_learn","fieldName":"_learn","group":"VariableMod","description":"","variable":"_learn","title":"Learn","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_pts":{"name":"_pts","fieldName":"_pts","group":"VariableMod","description":"","variable":"_pts","title":"Points","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_tech":{"name":"_tech","fieldName":"_tech","group":"VariableMod","description":"","variable":"_tech","title":"Technique Bonus","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_techset":{"name":"_techset","fieldName":"_techset","group":"VariableMod","description":"","variable":"_techset","title":"Technique Bonus","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_expertise":{"name":"_expertise","fieldName":"_expertise","group":"VariableMod","description":"","variable":"_expertise","title":"Expertise Bonus","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_gear":{"name":"_gear","fieldName":"_gear","group":"VariableMod","description":"","variable":"_gear","title":"Gear Bonus","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_affinity":{"name":"_affinity","fieldName":"_affinity","group":"VariableMod","description":"","variable":"_affinity","title":"Affinity Bonus","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "_error":{"name":"_error","fieldName":"_error","group":"VariableMod","description":"","variable":"_error","title":"Error","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Attr_BOD":{"name":"Attr_BOD","fieldName":"bod","group":"Attribute","description":"","variable":"atr-bod{0}","title":"Body","subGroup":"","descriptions":[""],
                "abbreviation":"BOD","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Attr_PRC":{"name":"Attr_PRC","fieldName":"prc","group":"Attribute","description":"","variable":"atr-prc{0}","title":"Precision","subGroup":"","descriptions":[""],
                "abbreviation":"PRC","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Attr_QCK":{"name":"Attr_QCK","fieldName":"qck","group":"Attribute","description":"","variable":"atr-qck{0}","title":"Quickness","subGroup":"","descriptions":["Quickness is your reflexes and your ability to react quickly to situations. "],
                "abbreviation":"QCK","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Attr_CNV":{"name":"Attr_CNV","fieldName":"cnv","group":"Attribute","description":"","variable":"atr-cnv{0}","title":"Conviction","subGroup":"","descriptions":[""],
                "abbreviation":"CNV","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Attr_INT":{"name":"Attr_INT","fieldName":"int","group":"Attribute","description":"","variable":"atr-int{0}","title":"Intuition ","subGroup":"","descriptions":[""],
                "abbreviation":"INT","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Attr_RSN":{"name":"Attr_RSN","fieldName":"rsn","group":"Attribute","description":"","variable":"atr-rsn{0}","title":"Reason","subGroup":"","descriptions":[""],
                "abbreviation":"RSN","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Check":{"name":"Check","fieldName":"check","group":"Untyped","description":"","variable":"check","title":"Checks","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CombatDetails":{"name":"CombatDetails","fieldName":"combatdetails","group":"Untyped","description":"","variable":"cmbdtls","title":"Combat Details","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "FlatDC":{"name":"FlatDC","fieldName":"flatdc","group":"Untyped","description":"","variable":"","title":"Flat DC","subGroup":"","descriptions":["A flat DC is a term used to represent a DC that is a consistent DC and is not in opposition to a character. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Boon":{"name":"Title_Boon","fieldName":"boon","group":"Title","description":"","variable":"ttl-boon{0}","title":"Boons","subGroup":"","descriptions":["Boons are resources that can be called upon in critical moments via powerful techniques. These boons are usually gained by performing acts of self care and motivation.","Boons come in three different variations; Boons of Rest, Savor, and Impulse. These three types of boons have different conditions when they become available. Once a boon is gained you cannot gain another boon of that type until that boon is spent or is expired. As such, you can at most have three boons available at a time. ","When a technique requires that a boon is spent you may choose to spend any boon you currently have available. If none are available you cannot use the technique. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "BoostStyleTech":{"name":"BoostStyleTech","fieldName":"booststyletech","group":"Untyped","description":"","variable":"booststyletech","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "BoostGearTech":{"name":"BoostGearTech","fieldName":"boostgeartech","group":"Untyped","description":"","variable":"boostgeartech","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "BoostPerkTech":{"name":"BoostPerkTech","fieldName":"boostperktech","group":"Untyped","description":"","variable":"boostperktech","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Level":{"name":"Level","fieldName":"level","group":"Advancement","description":"","variable":"adv-level{0}","title":"Character Level","subGroup":"","descriptions":["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
                "abbreviation":"Lv","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CR":{"name":"CR","fieldName":"cr","group":"Advancement","description":"","variable":"adv-cr{0}","title":"Character Rank","subGroup":"","descriptions":["Your character rank applies to many of the values you record on your character sheet. This value limits the maximum tier of techniques a style can grant and also increases many statistics.","Usually, this value is equal to its maximum value. It may be reduced in special situations where power is restricted. For example, a character may have the experience of a higher leveled character but lacks the power. Alternatively they may simply be holding back or are depowered for whatever reason."],
                "abbreviation":"CR","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":true},
            "MaxCR":{"name":"MaxCR","fieldName":"maxcr","group":"Advancement","description":"","variable":"adv-effcr{0}","title":"Max Character Rank","subGroup":"","descriptions":["Your character rank applies to many of the values you record on your character sheet. ","Your max character rank also increases many of the points given at character creation and through advancement. ","Max character rank increases as you level. \nAt 1st level, it begins at 1. \nAt 4th Level it increases to 2.\nAt 9th Level it increases to 3.\nAt 15th Level it increases to 4.\nAt 22nd Level it increases to 5.\nAt 30th Level it increases to 6.\nAt 39th Level it increases to 7.\nAt 49th Level it increases to 8.\nAt 60th Level it increases to 9."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "XP":{"name":"XP","fieldName":"xp","group":"Advancement","description":"","variable":"adv-xp{0}","title":"Experience","subGroup":"","descriptions":["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
                "abbreviation":"XP","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":30,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "AdvancementJob":{"name":"AdvancementJob","fieldName":"advancementjob","group":"Advancement","description":"","variable":"adv-ap_job{0}","title":"Job Points","subGroup":"","descriptions":["You can spend advancement points to gain Job Points. These job points can be used to increase tier in a job. You must spend 2 advancement points to gain 1 job point."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AdvancementSkill":{"name":"AdvancementSkill","fieldName":"advancementskill","group":"Advancement","description":"","variable":"adv-ap_skill{0}","title":"Skill Points","subGroup":"","descriptions":["You can spend advancement points to gain Skill Points. These skill points can be used to learn a new skill. You must spend 2 advancement points to gain 1 skill point."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AdvancementTechnique":{"name":"AdvancementTechnique","fieldName":"advancementtechnique","group":"Advancement","description":"","variable":"adv-ap_technique{0}","title":"Technique Points","subGroup":"","descriptions":["You can spend advancement points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 advancement points to gain 1 technique point."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier":{"name":"JobTier","fieldName":"jobtier","group":"Advancement","description":"","variable":"adv-jobtier{0}","title":"Job Tier","subGroup":"","descriptions":["Your job tier represents your skill in this job. Any tier above 0 allows you to choose this job as a set job style. Each tier will unlock the use of additional techniques as shown below.","Your maximum job tier in any job is equal to your Character Rank."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTechniques":{"name":"JobTechniques","fieldName":"jobtechniques","group":"Advancement","description":"","variable":"adv-jobtechniques{0}","title":"Job Techniques","subGroup":"","descriptions":["These techniques are gained when reaching the listed tier in the job. These techniques often help you perform tasks related to your job."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[]
                ,
                "isResource":""},
            "LearnStyle":{"name":"LearnStyle","fieldName":"learnstyle","group":"Advancement","description":"","variable":"adv-learnstyle{0}","title":"Learn Style","subGroup":"","descriptions":["In order to learn techniques in a style, the style must first be learned. To learn this style, check the box to the left. This box may be disabled if you lack the requirements necessary to learn this style, as shown in the style's requirements.","Learning a style always costs one Technique Point. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleTechniques":{"name":"StyleTechniques","fieldName":"styletechniques","group":"Advancement","description":"","variable":"adv-styletechniques{0}","title":"Technique Requirements","subGroup":"","descriptions":["Most techniques require you to reach certain requirements to learn them. These requirements are listed here above a list of techniques that meet these restrictions. ","To learn techniques in this category, check the box in the technique's entry. This checkbox may be disabled if you lack the requirements necessary to learn this technique."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleFreeTechniques":{"name":"StyleFreeTechniques","fieldName":"stylefreetechniques","group":"Advancement","description":"","variable":"adv-stylefreetechniques{0}","title":"Free Techniques","subGroup":"","descriptions":["These techniques are automatically learned when this style is learned. You do not need to spend Technique Points to learn these techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TrainingKnowledge":{"name":"TrainingKnowledge","fieldName":"trainingknowledge","group":"Training","description":"","variable":"trn-tp_knowledge{0}","title":"Knowledge Points","subGroup":"","descriptions":["You can spend training points to gain Knowledge Points. These knowledge points can be used to increase tier in a job. You must spend 1 training points to gain 1 knowledge point."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TrainingTechniques":{"name":"TrainingTechniques","fieldName":"trainingtechniques","group":"Training","description":"","variable":"trn-tp_technique{0}","title":"Technique Points","subGroup":"","descriptions":["You can spend training points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 training points to gain 1 technique point."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PP":{"name":"PP","fieldName":"pp","group":"Training","description":"","variable":"trn-pp{0}","title":"Progression","subGroup":"","descriptions":["PP is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime at a rate of 1 per day. You may gain an additional PP if a character devotes an entire day to training. ","Once a character reaches 30 PP, they may spend their PP to gain a new knowledge or technique."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":30,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "BonusTraining":{"name":"BonusTraining","fieldName":"bonustraining","group":"Training","description":"","variable":"trn-bonustraining{0}","title":"Bonus Training Points","subGroup":"","descriptions":["Bonus training points are gained by spending PP - experience gained when performing tasks.","Whenever you gain 30 PP, you gain one Training Point."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":true},
            "Def_Brace":{"name":"Def_Brace","fieldName":"brace","group":"Defense","description":"","variable":"def-brace{0}","title":"Brace","subGroup":"Combat Defense","descriptions":["Brace is your ability to resist a physical force by holding strong and blocking. Many fast attacks and pushing effects are defended against by brace."],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech;_gear","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-brace_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-brace_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-brace_gear","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Fortitude":{"name":"Def_Fortitude","fieldName":"fortitude","group":"Defense","description":"","variable":"def-fortitude{0}","title":"Fortitude","subGroup":"Defense","descriptions":["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-fortitude_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-fortitude_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Warding":{"name":"Def_Warding","fieldName":"warding","group":"Defense","description":"","variable":"def-disruption{0}","title":"Warding","subGroup":"Combat Defense","descriptions":["Warding defense represents an attempt to disrupt the ether of a magical effect. This defense is reliable for large area attacks that cannot be braced against and dodging is infeasible. "],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech;_gear","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-disruption_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-disruption_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-disruption_gear","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Hide":{"name":"Def_Hide","fieldName":"hide","group":"Defense","description":"","variable":"def-hide{0}","title":"Hide","subGroup":"Defense","descriptions":["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-hide_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-hide_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Reflex":{"name":"Def_Reflex","fieldName":"reflex","group":"Defense","description":"","variable":"def-reflex{0}","title":"Reflex","subGroup":"Combat Defense","descriptions":["Reflex is a quick maneuver to take a hit in a way that you can recover from. Slow attacks and situations that require you to get out of the way will target this defense."],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech;_gear","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-reflex_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-reflex_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-reflex_gear","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Evasion":{"name":"Def_Evasion","fieldName":"evasion","group":"Defense","description":"","variable":"def-evasion{0}","title":"Evasion","subGroup":"Defense","descriptions":["Evasion is your ability to complete evade an attack. Some especially slow attacks can be evaded and will check against evasion."],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech;_gear","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-evasion_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-evasion_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"def-evasion_gear","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Resolve":{"name":"Def_Resolve","fieldName":"resolve","group":"Sense","description":"","variable":"sen-resolve{0}","title":"Resolve","subGroup":"Social Sense","descriptions":["Resolve is the ability to persevere when your will is attacked. Your resolve will defend you from attacks against your Willpower and any other attempts that check against your convictions. "],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-resolve_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-resolve_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Freewill":{"name":"Def_Freewill","fieldName":"freewill","group":"Sense","description":"","variable":"sen-freewill{0}","title":"Freewill","subGroup":"Sense","descriptions":["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":10,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-freewill_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-freewill_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Insight":{"name":"Def_Insight","fieldName":"insight","group":"Sense","description":"","variable":"sen-insight{0}","title":"Insight","subGroup":"Social Sense","descriptions":["Insight is your ability to sense emotion and manipulation. This is your defense against those who would use deception to manipulate your actions. It is also used as a defense against those that would try to use charisma to gain your favor. "],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-insight_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-insight_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Notice":{"name":"Def_Notice","fieldName":"notice","group":"Sense","description":"","variable":"sen-notice{0}","title":"Notice","subGroup":"Sense","descriptions":["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-notice_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-notice_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Guile":{"name":"Def_Guile","fieldName":"guile","group":"Sense","description":"","variable":"sen-guile{0}","title":"Guile","subGroup":"Social Sense","descriptions":["Guile is one's ability to conceal their own thoughts and feelings. It is the defense for those that do not wish to reveal their intentions or motivations. It is used to defend against those that wish to understand your influences or manipulate your feelings on them."],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-guile_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-guile_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Def_Scrutiny":{"name":"Def_Scrutiny","fieldName":"scrutiny","group":"Sense","description":"","variable":"sen-scrutiny{0}","title":"Scrutiny","subGroup":"Sense","descriptions":["Scrutiny represents your ability to find holes in another's logical reasoning or things out of sorts. It is often used in defense against another's attempts at lying or to find those obscurred in plain sight."],
                "abbreviation":"","baseFormula":"","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-scrutiny_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"sen-scrutiny_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "WillBreak":{"name":"WillBreak","fieldName":"willbreak","group":"Result","description":"","variable":"","title":"Will Break","subGroup":"","descriptions":["When a character's Willpower depletes to zero they can suffer from a technique's will break effects. You can choose to not trigger a technique's will break effects. When a will break is triggered, the effects listed occur to the target and then their Willpower restores to full."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CharSheetName":{"name":"CharSheetName","fieldName":"charsheetname","group":"Origin","description":"","variable":"charsheetname","title":"Character Sheet Name","subGroup":"","descriptions":["The name of the character sheet. This is the name of the character as written in the character's Journal entry."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "SheetName":{"name":"SheetName","fieldName":"sheetname","group":"Origin","description":"","variable":"sheetname","title":"Sheet Name","subGroup":"","descriptions":["The name of the character sheet. This is the name of the character as written in the character's Journal entry."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "FullName":{"name":"FullName","fieldName":"fullname","group":"Origin","description":"","variable":"full_name","title":"Full Name","subGroup":"","descriptions":["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "DisplayName":{"name":"DisplayName","fieldName":"displayname","group":"Origin","description":"","variable":"display_name","title":"Display Name","subGroup":"","descriptions":["This is the name that is displayed when your character speaks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "IntroName":{"name":"IntroName","fieldName":"introname","group":"Origin","description":"","variable":"intro_name","title":"Intro Name","subGroup":"","descriptions":["This is the name Display Name will change to when an Introduction call is made"],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "QuickDescription":{"name":"QuickDescription","fieldName":"quickdescription","group":"Origin","description":"","variable":"quickdescription","title":"Quick Description","subGroup":"","descriptions":["A short description of what this character is about"],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Backstory":{"name":"Backstory","fieldName":"backstory","group":"Origin","description":"","variable":"backstory","title":"Backstory","subGroup":"","descriptions":["This is the background story of your character. Add any details on the character's past here."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Age":{"name":"Age","fieldName":"age","group":"Origin","description":"","variable":"age","title":"Age","subGroup":"","descriptions":["This represents how old the character is in years."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gender":{"name":"Gender","fieldName":"gender","group":"Origin","description":"","variable":"gender","title":"Gender","subGroup":"","descriptions":["The gender the character identifies as."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Homeland":{"name":"Homeland","fieldName":"homeland","group":"Origin","description":"","variable":"homeland","title":"Homeland","subGroup":"","descriptions":["Where this character grew up. This will usually shape their perspectives in the world."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Ancestry":{"name":"Ancestry","fieldName":"ancestry","group":"Untyped","description":"","variable":"ancestry","title":"Ancestry","subGroup":"","descriptions":["Ancestry represents your characters species and background. This unlocks certain techniques and styles which are locked to specific ancestries. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Affinity":{"name":"Affinity","fieldName":"affinity","group":"Untyped","description":"","variable":"affinity{0}","title":"Elemental Affinity","subGroup":"","descriptions":["Characters that are able to cast spells have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity before they may be taken.","Your chosen affinity grants weaknesses and resistances to certain elemental damage types."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AdvancedAffinity":{"name":"AdvancedAffinity","fieldName":"advancedaffinity","group":"Untyped","description":"","variable":"affinity2{0}","title":"Advanced Affinity","subGroup":"","descriptions":["An advanced affinity is a special trait the character may have that allows them to use more magic. This is typically reserved for special characters or player characters. An advanced affinity either comes as an advanced elemental branch allowing the character to cast special magic, or as a secondary element."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "BonusAttributePoints":{"name":"BonusAttributePoints","fieldName":"bonusattributepoints","group":"Untyped","description":"","variable":"bonusattrpt","title":"Bonus Attribute Points","subGroup":"","descriptions":["These are bonus points granted to spend on Attributes. ","Player characters typically start with 1 point here"],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobSlots":{"name":"JobSlots","fieldName":"jobslots","group":"Untyped","description":"","variable":"jobslotcount{0}","title":"Job Slots","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"1","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0},
                        {"variableName":"jobslotcount_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"jobslotcount_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "AdvancedSlots":{"name":"AdvancedSlots","fieldName":"advancedslots","group":"Untyped","description":"","variable":"advancedslotcount{0}","title":"Advanced Slots","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"1","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0},
                        {"variableName":"advancedslotcount_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"advancedslotcount_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSlots":{"name":"StyleSlots","fieldName":"styleslots","group":"Untyped","description":"","variable":"styleslotcount{0}","title":"Style Slots","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"2","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0},
                        {"variableName":"styleslotcount_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"styleslotcount_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "WeaponSlots":{"name":"WeaponSlots","fieldName":"weaponslots","group":"Untyped","description":"","variable":"weaponslotcount{0}","title":"Weapon Slots","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"1","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0},
                        {"variableName":"weaponslotcount_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"weaponslotcount_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "EquipmentSlots":{"name":"EquipmentSlots","fieldName":"equipmentslots","group":"Untyped","description":"","variable":"equipmentslotcount{0}","title":"Equipment Slots","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"5","modifiers":"_expertise; _tech","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0},
                        {"variableName":"equipmentslotcount_expertise","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"equipmentslotcount_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Currency_Jin":{"name":"Currency_Jin","fieldName":"jin","group":"Currency","description":"","variable":"crn-jin{0}","title":"Jin","subGroup":"","descriptions":["The currency of Minerva. This is paper money accepted throughout the continent of Wuxing due to Minerva's trade agreements throughout the land."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Currency_Gold":{"name":"Currency_Gold","fieldName":"gold","group":"Currency","description":"","variable":"crn-gold{0}","title":"Gold","subGroup":"","descriptions":["A rare resource known for its usages in magical material building. It was the preferred trading material until its use as a magical binding made it more scarse. Still, many small communities will use it for trade."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Currency_CP":{"name":"Currency_CP","fieldName":"cp","group":"Currency","description":"","variable":"crn-cp{0}","title":"CP","subGroup":"","descriptions":["A coin currency that is popular in Apollo, Juno, and smaller civilizations. It is largely being replaced by the Minervan Jin due to the inconvenience of coins, but change at this scale is often difficult."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "HP":{"name":"HP","fieldName":"hp","group":"General","description":"","variable":"gen-hp{0}","title":"Hit Points","subGroup":"","descriptions":["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
                "abbreviation":"HP","baseFormula":"","modifiers":"_tech;_affinity","formula":{"workers":[{"variableName":"","definitionName":"","value":35,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":5,"max":0},
                        {"variableName":"adv-level","definitionName":"Level","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-hp_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-hp_affinity","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "WILL":{"name":"WILL","fieldName":"will","group":"General","description":"","variable":"gen-will{0}","title":"Willpower","subGroup":"","descriptions":["Willpower is a character's ability to stay invested in a situation. "],
                "abbreviation":"WILL","baseFormula":"","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":15,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":15,"max":0},
                        {"variableName":"adv-level","definitionName":"Level","value":0,"multiplier":0,"max":0},
                        {"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-will_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "EN":{"name":"EN","fieldName":"en","group":"Untyped","description":"","variable":"en","title":"EN","subGroup":"","descriptions":["EN is a resource used to power techniques. "],
                "abbreviation":"EN","baseFormula":"9","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":9,"multiplier":1,"max":0},
                        {"variableName":"en","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "StartEN":{"name":"StartEN","fieldName":"starten","group":"General","description":"","variable":"gen-starten{0}","title":"Starting EN","subGroup":"","descriptions":["This is how much EN you start with when finishing a rest."],
                "abbreviation":"","baseFormula":"","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0},
                        {"variableName":"gen-starten_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_Chakra":{"name":"Cmb_Chakra","fieldName":"chakra","group":"Combat","description":"","variable":"cmb-chakra{0}","title":"Chakra","subGroup":"","descriptions":["Chakra is a source of ki within one's own body. It is the fuel for one's magic and allows them to use magical techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-chakra_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "Chakra":{"name":"Chakra","fieldName":"chakra","group":"","description":"","variable":"","title":"","subGroup":"","descriptions":["Whenever a technique consumes WILL as a resource and a will break is caused, chakra is reduced by 1 and the character takes HP damage. If chakra is ever at 0, the character can no longer use techniques that consume WILL as a resource.","After completing a full rest, chakra is restored to full."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Power":{"name":"Power","fieldName":"power","group":"General","description":"","variable":"gen-power{0}","title":"Power","subGroup":"","descriptions":["Power is used as a potency bonus for some techniques reliant on physical force. "],
                "abbreviation":"","baseFormula":"","modifiers":"_techset","formula":{"workers":[{"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-power_techset","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Accuracy":{"name":"Accuracy","fieldName":"accuracy","group":"General","description":"","variable":"gen-accuracy{0}","title":"Accuracy","subGroup":"","descriptions":["Accuracy is used as a potency bonus for some techniques reliant on precision. "],
                "abbreviation":"","baseFormula":"","modifiers":"_techset","formula":{"workers":[{"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-accuracy_techset","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Artistry":{"name":"Artistry","fieldName":"artistry","group":"General","description":"","variable":"gen-artistry{0}","title":"Artistry","subGroup":"","descriptions":["Artistry is your attention to the details that would impact one's emotions. It is used as a potency bonus when creating crafted items or creating a performance. "],
                "abbreviation":"","baseFormula":"","modifiers":"_techset","formula":{"workers":[{"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-artistry_techset","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Charisma":{"name":"Charisma","fieldName":"charisma","group":"General","description":"","variable":"gen-charisma{0}","title":"Charisma","subGroup":"","descriptions":["Charisma is used as a potency bonus for some techniques reliant on communication. "],
                "abbreviation":"","baseFormula":"","modifiers":"_techset","formula":{"workers":[{"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-charisma_techset","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Recall":{"name":"Recall","fieldName":"recall","group":"General","description":"","variable":"gen-recall{0}","title":"Recall","subGroup":"","descriptions":["Recall is your ability to remember information learned in the past. It is used as a modifier when using Recall Knowledge to gain information. "],
                "abbreviation":"","baseFormula":"","modifiers":"_techset","formula":{"workers":[{"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-recall_techset","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Initiative":{"name":"Initiative","fieldName":"initiative","group":"General","description":"","variable":"gen-initiative{0}","title":"Initiative","subGroup":"","descriptions":["The Initiative skill is used to determine whoever acts first in a conflict. "],
                "abbreviation":"","baseFormula":"","modifiers":"_tech;_gear;_affinity","formula":{"workers":[{"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":1,"max":0},
                        {"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-initiative_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-initiative_gear","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"gen-initiative_affinity","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "CarryingCapacity":{"name":"CarryingCapacity","fieldName":"carryingcapacity","group":"General","description":"","variable":"gen-capacity{0}","title":"Carrying Capacity","subGroup":"","descriptions":["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
                "abbreviation":"","baseFormula":"","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":40,"multiplier":1,"max":0},
                        {"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":20,"max":0},
                        {"variableName":"gen-capacity_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_Vitality":{"name":"Cmb_Vitality","fieldName":"vitality","group":"Combat","description":"","variable":"cmb-vitality{0}","title":"Vitality","subGroup":"Life","descriptions":["Whenever you are reduced to zero HP, your HP restores to full and you lose one vitality. Unlike most resources, vitality can be reduced below 0.","Whenever vitality is lost check if it is below 1. If it is, you gain the Downed status. If the character already had the Downed status, they also gain the Dying and Unconscious statuses which may ultimately kill them.","Most characters will have a max vitality of 1. Player characters will usually start with 3 while special characters can have any amount.","After completing a full rest, 1 vitality is healed."],
                "abbreviation":"","baseFormula":"","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0},
                        {"variableName":"cmb-vitality_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "Cmb_Surge":{"name":"Cmb_Surge","fieldName":"surge","group":"Combat","description":"","variable":"cmb-surge{0}","title":"Healing Surge","subGroup":"Life","descriptions":["Healing surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP.","After completing a brief rest, healing surge is restored to full."],
                "abbreviation":"","baseFormula":"","modifiers":"_tech;_affinity","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":0,"max":0},
                        {"variableName":"cmb-surge_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-surge_affinity","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "Cmb_HV":{"name":"Cmb_HV","fieldName":"hv","group":"Combat","description":"","variable":"cmb-hv{0}","title":"Heal Value","subGroup":"Life","descriptions":["This value is a standard amount of HP you recover from some healing abilities."],
                "abbreviation":"HV","baseFormula":"","modifiers":"_tech;_affinity","formula":{"workers":[{"variableName":"","definitionName":"","value":15,"multiplier":1,"max":0},
                        {"variableName":"adv-cr","definitionName":"CR","value":0,"multiplier":10,"max":0},
                        {"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-hv_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-hv_affinity","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_Armor":{"name":"Cmb_Armor","fieldName":"armor","group":"Combat","description":"","variable":"cmb-armor{0}","title":"Armor","subGroup":"Life","descriptions":["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
                "abbreviation":"","baseFormula":"","modifiers":"_tech;_gear;_affinity","formula":{"workers":[{"variableName":"","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-armor_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-armor_gear","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-armor_affinity","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_Hardness":{"name":"Cmb_Hardness","fieldName":"hardness","group":"Combat","description":"","variable":"cmb-hardness{0}","title":"Hardness","subGroup":"Life","descriptions":["Hardness reduces damage from all damage sources by its value. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Resistance":{"name":"Resistance","fieldName":"resistance","group":"Untyped","description":"","variable":"resistance","title":"Resistance","subGroup":"Life","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Weakness":{"name":"Weakness","fieldName":"weakness","group":"Untyped","description":"","variable":"weakness","title":"Resistance","subGroup":"Life","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_ResistanceDesc":{"name":"Cmb_ResistanceDesc","fieldName":"resistancedesc","group":"Combat","description":"","variable":"cmb-resistancedesc{0}","title":"Resistance","subGroup":"Life","descriptions":["Resistance reduces damage of specific damage types by a value equal to the resistance's type. The resistance calculation happens after armor is applied."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_WeaknessDesc":{"name":"Cmb_WeaknessDesc","fieldName":"weaknessdesc","group":"Combat","description":"","variable":"cmb-weaknessdesc{0}","title":"Weakness","subGroup":"Life","descriptions":["Weakness is the opposite of Resistance, increasing damage against you when hit by specific damage types by a value equal to the weakness' type. The weakness calculation happens after armor is applied."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_Mv":{"name":"Cmb_Mv","fieldName":"mv","group":"Combat","description":"","variable":"cmb-movespeed{0}","title":"Base Speed","subGroup":"Movement","descriptions":["Base Speed is the base number of spaces a character can move. This value can never be over a character's Move Potency."],
                "abbreviation":"Mv","baseFormula":"","modifiers":"_tech;_gear","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0},
                        {"variableName":"cmb-movespeed_tech","definitionName":"","value":0,"multiplier":1,"max":0},
                        {"variableName":"cmb-movespeed_gear","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Cmb_MvPotency":{"name":"Cmb_MvPotency","fieldName":"mvpotency","group":"Combat","description":"","variable":"cmb-movepotency{0}","title":"Speed Potency","subGroup":"Movement","descriptions":["Speed Potency is used to determine the maximum number of spaces a character can gain when performing a Stride Roll."],
                "abbreviation":"","baseFormula":"","modifiers":"_tech","formula":{"workers":[{"variableName":"","definitionName":"","value":6,"multiplier":1,"max":0},
                        {"variableName":"cmb-movepotency_tech","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "MvCharge":{"name":"MvCharge","fieldName":"mvcharge","group":"Untyped","description":"","variable":"moveCharge","title":"Move Charge","subGroup":"Movement","descriptions":["Move Charge is a resource that can be spent to move. When you perform a move and it uses your Move Charge to determine the number of spaces, you lose all of your move charge as soon as you complete your movement. You do not lose your Move Charge if you do not move at all.","In combat, you gain move charge at the start of every round and whenever a technique allows you to perform a Stride Roll."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Soc_Favor":{"name":"Soc_Favor","fieldName":"favor","group":"Social","description":"","variable":"soc-favor{0}","title":"Favor","subGroup":"","descriptions":["Favor is how much your social opponent(s) are being likeable to you. Favor can be leveraged by opponents to create a more favorable decision for them. ","When favor is used for an influence check, you add the target's favor value (capped to half of the persuade DC) to your persuasion check."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":30,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":true},
            "RepeatingInfluences":{"name":"RepeatingInfluences","fieldName":"repeatinginfluences","group":"Untyped","description":"","variable":"repeating_influences","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Soc_Influence":{"name":"Soc_Influence","fieldName":"influence","group":"Social","description":"","variable":"soc-influence{0}","title":"Influences","subGroup":"","descriptions":["Influences are the the aspects of a character that connect them to the world. An influence is always something of some importance to the character. A character should never have an influence they don't care about, otherwise it's not an influence on their character.","An influence is written as a few words to describe a personality trait, bond, or ideal. Each Influence should be clearly defined and unique. Descriptors like “Skilled” or “Determined” are too general, since they could fit nearly any context. Instead, choose something more distinct, like “Street Duelist” or “Focused Studier.” These influences can then be further explained in a description for when it would be used if necessary."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_UsingInfluences":{"name":"Title_UsingInfluences","fieldName":"usinginfluences","group":"Title","description":"","variable":"ttl-usinginfluences{0}","title":"Using Influences","subGroup":"","descriptions":["Influences can be used to better perform skill checks. Whenenver a character makes a skill check, if they feel like the skill check is related to an influence they may draw on the influence to gain advantage. The number of advantages gained are equal to the influence's severity. Using an influence in this way always closts a Boon.","Whenever you play your character and leverage an influence you may gain a Boon of Truth. Gaining this boon is usually reserved for particularly dramatic uses of your influence.","Influences are used to modify social checks. Whenenver making a check that modifies favor, if your statements reference your target's influences it may grant you advantage or disadvantage to your check.","Influences also modify persuade checks. Whenever performing a persuade check you will add or removed 1d6 to the check result. This value can increase by +5 on a moderate influence, or +10 on a severe.","Only the most supportive influence and most opposing influence may affect any one persuade or favor roll."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Soc_InfluenceDesc":{"name":"Soc_InfluenceDesc","fieldName":"influencedesc","group":"Social","description":"","variable":"soc-influencedesc{0}","title":"Description","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Soc_Severity":{"name":"Soc_Severity","fieldName":"severity","group":"Social","description":"","variable":"soc-severity{0}","title":"Using Influences","subGroup":"","descriptions":["All Influences are given a severity associated with them. This represents how much of an effect the specific influence has on the character. These severities are +1 Low, +2 Moderate, and +3 High.","","Only the most supportive influence and most opposing influence may affect any one persuasion roll."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Severity":{"name":"Severity","fieldName":"severity","group":"","description":"","variable":"","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Soc_RequestCheck":{"name":"Soc_RequestCheck","fieldName":"requestcheck","group":"Social","description":"","variable":"soc-requestcheck{0}","title":"Request Check","subGroup":"","descriptions":["A request check is performed when a character attempts to convince another to do something. When making a request check a character must first make a request of the target. The nature of the request will set the difficulty class (DC) of the request check. Most request checks will require that you roll some dice and add relevant modifiers such as favor. ","Finally you will always add any relevant influence modifiers to the check. An influence may support or oppose a request. If the influence is supportive of a request, you will add its severity modifier to the request check. An opposing influence will likewise subtract its severity modifier from the request check. Only one influence can support or oppose a request. If multiple influences apply to support or oppose a request, only the highest severity influence will count each for support and oppose.","Usually some kind of influence is required over the target in order to convince them to do anything more complicated than a simple request. Most of the DCs for more complicated requests require the bonuses granted from a supporting influence.","A request check is always performed with a request to be made of the target. This usually comes in the form of a task. The nature of the task will determine the DC of the request check.","Simple Tasks - DC 15. These are tasks a character could perform without a lot of effort or risk on their part. Examples include offering information, gaining access to a relatively insecure location, or being given an insignificant amount of coin or dust.","Inconvenient Tasks - DC 30. These tasks pose some kind of non-physical hindrance to the character. These may minorly impact their social lives or cause them to anger an authority without seriously disrupting their lives. Persuading a character to offer information that may be difficult to trace back to the character or getting them to ask another for a favor are some examples of this task.","Disruptive Tasks - DC 40. These are tasks that are risky to the character. These tasks can delve into possible physical harm such as guarding a location that isn't currently hostile. These requests can also involve the performance of crime or subterfuge, as long as the character believes the risks are not grave enough to lead to imprisonment or ostracization.","Serious Tasks - DC 50. These tasks can cause serious harm to a character. These can be physical in nature such as a task to actively engage in battle. They can also be societal such as performing a crime that could face imprisonment. These tasks should not appear to be out of the skillset of the character but should obviously provide serious risk to their person.","Life-Changing Tasks - DC 60. These tasks are daunting and require great will to be convinced of performing. These tasks can motivate a character to risk death or a complete change in their place in society. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Soc_SupportInfluence":{"name":"Soc_SupportInfluence","fieldName":"supportinfluence","group":"Social","description":"","variable":"soc-support_influence{0}","title":"Support Influence","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[]
                ,
                "isResource":""},
            "Soc_OpposeInfluence":{"name":"Soc_OpposeInfluence","fieldName":"opposeinfluence","group":"Social","description":"","variable":"soc-oppose_influence{0}","title":"Oppose Influence","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Soc_Impatience":{"name":"Soc_Impatience","fieldName":"impatience","group":"Social","description":"","variable":"soc-impatience{0}","title":"Impatience","subGroup":"","descriptions":["Impatience is a measure of how much a character will tolerate another's attempts at socializing before removing themselves."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Arcanify":{"name":"Trait_Arcanify","fieldName":"arcanify","group":"Trait","description":"","variable":"trt-arcanify{0}","title":"Arcanify","subGroup":"Technique Trait","descriptions":["You must have an elemental aspect to use this technique. This technique forms ether into energy. What kind of energy that is formed is variable, but generally wood can create sound, fire creates light, heat or fire, earth creates shadow, metal creates electricity and can mimic energy, and water creates cold or sound. ","As these effects are energy, they can impart their energy to a subject without disappearing. An object that has caught fire does not extinguish when a technique ends."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Arcing":{"name":"Trait_Arcing","fieldName":"arcing","group":"Trait","description":"","variable":"trt-arcing{0}","title":"Arcing","subGroup":"Technique Trait","descriptions":["Arcing techniques are designed to lob projectiles over obstacles. They can be used to target targets without line of sight, although they are still affected by cover and the attack must be physically possible - an Arcing attacks still can’t fire through 50 feet of metal."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Break":{"name":"Trait_Break","fieldName":"break","group":"Trait","description":"","variable":"trt-break{0}","title":"Break","subGroup":"Technique Trait","descriptions":["This technique breaks apart an object by targeting its materials and reducing it to dust.","In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that uses the same technique in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Delayed":{"name":"Trait_Delayed","fieldName":"delayed","group":"Trait","description":"","variable":"trt-delayed{0}","title":"Delayed","subGroup":"Technique Trait","descriptions":["When this technique is used the resource costs are consumed immediately and a target character or object is chosen. All other effects do not occur until later. ","Once the next round starts, the technique may only be triggered after three turns have passed. All other effects of the technique can be performed on the user's turn as a Swift action. ","Only one Delayed technique may be activated per turn."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Envoke":{"name":"Trait_Envoke","fieldName":"envoke","group":"Trait","description":"","variable":"trt-envoke{0}","title":"Envoke","subGroup":"Technique Trait","descriptions":["This technique creates a persistent effect over an area by frequently converting ether into energy. These techniques always have On Enter effects that occur whenever a character enters the affected zone. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Focus":{"name":"Trait_Focus","fieldName":"focus","group":"Trait","description":"","variable":"trt-focus{0}","title":"Focus","subGroup":"Technique Trait","descriptions":["This technique creates an effect that has persistent effects over multiple round as long as you maintain focus. ","At the beginning of a round you must choose one technique to maintain your focus on if you have any active techniques. Any technique that lacks focus immediately ends.","You automatically lose focus after 10 minutes of focusing on a technique."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Holdfast":{"name":"Trait_Holdfast","fieldName":"holdfast","group":"Trait","description":"","variable":"trt-holdfast{0}","title":"Holdfast","subGroup":"Technique Trait","descriptions":["When this technique is used the resource costs are consumed immediately but all other effects are delayed. ","Once the next round starts, the technique may only be triggered after three turns have passed. All other effects of the technique can be performed on the user's turn as a Swift action. ","Only one Holdfast technique may be activated per turn."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Illusion":{"name":"Trait_Illusion","fieldName":"illusion","group":"Trait","description":"","variable":"trt-illusion{0}","title":"Illusion","subGroup":"Technique Trait","descriptions":["This uses energy to create a visual effect in the target location. The illusion blocks line of sight and provides soft cover to those behind it.","Characters with reason to immediately suspect the illusion is false (such as when the illusion appears in front of them) disbelieve it. Otherwise, a character may make a DC 13 Analyze skill check to understand the illusion is false."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Materialize":{"name":"Trait_Materialize","fieldName":"materialize","group":"Trait","description":"","variable":"trt-materialize{0}","title":"Materialize","subGroup":"Technique Trait","descriptions":["You must have an elemental aspect to use this technique. This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice. The material created lasts for 5 minutes or until focus is lost on the technique."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Resonator":{"name":"Trait_Resonator","fieldName":"resonator","group":"Trait","description":"","variable":"trt-resonator{0}","title":"Kinesis","subGroup":"Technique Trait","descriptions":["You must have an elemental aspect to use this technique. This technique requires a material source, usually required to be an object. This technique imparts ether into the target, allowing you to manipulate it in some way. Usually this means it can be moved or activated. ","You grant the target the Resonant trait with you as a source. Other characters are prevented from using a resonating technique on the target while you are the source. If the object is in your space or adjacent to you, you are treated as if you are holding the object. The Resonant trait is removed at the start of the next round unless you maintain focus, or if you dismiss it freely. ","In order to affect a material with this technique, you must have an affinity to the material."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Seeking":{"name":"Trait_Seeking","fieldName":"seeking","group":"Trait","description":"","variable":"trt-seeking{0}","title":"","subGroup":"Technique Trait","descriptions":["Seeking techniques completely ignore cover and line of sight, as long as it is physically possible to reach the target. Seeking techniques are usually self-guided, self- propelled, and able to navigate complex environments."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Transmute":{"name":"Trait_Transmute","fieldName":"transmute","group":"Trait","description":"","variable":"trt-transmute{0}","title":"Transmute","subGroup":"Technique Trait","descriptions":["You must have an elemental aspect to use this technique. This technique requires a material source. It modifies or shifts an object's properties by using ether. ","In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that uses the same technique in the same round on the same material who has access to any missing elements may supplement for the use of this technique.","A transmute effect requires 5 minutes of focus for the form to hold and be made permanent, otherwise it reverts to its original form. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_AP":{"name":"Trait_AP","fieldName":"ap","group":"Trait","description":"","variable":"trt-ap{0}","title":"Armor-Piercing","subGroup":"Effect Trait","descriptions":["This technique pierces through armor. Ignore all armor on the target."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Brutal":{"name":"Trait_Brutal","fieldName":"brutal","group":"Trait","description":"","variable":"trt-brutal{0}","title":"Brutal","subGroup":"Effect Trait","descriptions":["When this technique's effect has you roll dice, roll all dice twice and take only the highest results."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Optional":{"name":"Trait_Optional","fieldName":"optional","group":"Trait","description":"","variable":"trt-optional{0}","title":"Optional","subGroup":"Effect Trait","descriptions":["You may choose whether these effects occur."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Ammunition":{"name":"Trait_Ammunition","fieldName":"ammunition","group":"Trait","description":"","variable":"trt-ammunition{0}","title":"Ammunition","subGroup":"Item Trait","descriptions":["This weapon takes ammunition and can fire it."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Axe":{"name":"Trait_Axe","fieldName":"axe","group":"Trait","description":"","variable":"trt-axe{0}","title":"Axe","subGroup":"Item Trait","descriptions":["A bladed weapon with a sharp edge mounted on a handle, designed for chopping."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Bow":{"name":"Trait_Bow","fieldName":"bow","group":"Trait","description":"","variable":"trt-bow{0}","title":"Bow","subGroup":"Item Trait","descriptions":["A ranged weapon that uses the elasticity of a string and a curved piece of wood or other material to launch arrows."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Ingested":{"name":"Trait_Ingested","fieldName":"ingested","group":"Trait","description":"","variable":"trt-ingested{0}","title":"Ingested","subGroup":"Item Trait","descriptions":["This consumable must be eaten to take effect. This cannot be done if the character has the Sickened condition or are prevented from eating in some way. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Hammer":{"name":"Trait_Hammer","fieldName":"hammer","group":"Trait","description":"","variable":"trt-hammer{0}","title":"Hammer","subGroup":"Item Trait","descriptions":["A blunt-force weapon with a heavy head, often designed to crush armor or break bones."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Handgun":{"name":"Trait_Handgun","fieldName":"handgun","group":"Trait","description":"","variable":"trt-handgun{0}","title":"Handgun","subGroup":"Item Trait","descriptions":["A small, portable firearm designed for use with one or both hands."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Inhalent":{"name":"Trait_Inhalent","fieldName":"inhalent","group":"Trait","description":"","variable":"trt-inhalent{0}","title":"Inhalent","subGroup":"Item Trait","descriptions":["This item is meant to be activated (usually by burning it) then breathed deeply to have its effects occur. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Knife":{"name":"Trait_Knife","fieldName":"knife","group":"Trait","description":"","variable":"trt-knife{0}","title":"Knife","subGroup":"Item Trait","descriptions":["A small, bladed weapon used for cutting, stabbing, or throwing."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Longshot":{"name":"Trait_Longshot","fieldName":"longshot","group":"Trait","description":"","variable":"trt-longshot{0}","title":"Longshot","subGroup":"Item Trait","descriptions":["This weapon is capable of firing ammunition at a long range."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Loud":{"name":"Trait_Loud","fieldName":"loud","group":"Trait","description":"","variable":"trt-loud{0}","title":"Loud","subGroup":"Item Trait","descriptions":["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Magitech":{"name":"Trait_Magitech","fieldName":"magitech","group":"Trait","description":"","variable":"trt-magitech{0}","title":"Magitech","subGroup":"Item Trait","descriptions":["This item contains pnevmarite and requires the use of ki to function. Usually, an item that requires ki only requires input once every minute."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MaxBulk15":{"name":"Trait_MaxBulk15","fieldName":"maxbulk15","group":"Trait","description":"","variable":"trt-maxbulk15{0}","title":"Bulk 15[MAX]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 15 or less. ","An object of Bulk 15 is typically something up to 20 lbs and can easily be carried in both of a person's hands. Examples include large swords, boxes (1.5 feet cubed), a small creature, or many armor pieces. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MaxBulk60":{"name":"Trait_MaxBulk60","fieldName":"maxbulk60","group":"Trait","description":"","variable":"trt-maxbulk60{0}","title":"Bulk 60[MAX]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 60 or less. ","An object of Bulk 60 is usually small or medium sized and up to a weight of 100 lbs. Examples include tables, book shelves, crates (4 foot cubed), or small children. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MaxBulk120":{"name":"Trait_MaxBulk120","fieldName":"maxbulk120","group":"Trait","description":"","variable":"trt-maxbulk120{0}","title":"Bulk 120[MAX]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 120 or less. ","An object of Bulk 120 is usually medium or large sized and up to a weight of 250 lbs. Examples include many medium to large size animals, large crates (6.5 feet cubed), and adult humans. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MaxBulk250":{"name":"Trait_MaxBulk250","fieldName":"maxbulk250","group":"Trait","description":"","variable":"trt-maxbulk250{0}","title":"Bulk 250[MAX]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 250 or less. ","An object of Bulk 250 is usually large to gigantic sized and up to a weight of 800 lbs. Examples include many large size animals, small buildings (15 feet cubed), and up to 4 adult humans. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Medkit":{"name":"Trait_Medkit","fieldName":"medkit","group":"Trait","description":"","variable":"trt-medkit{0}","title":"Medkit","subGroup":"Item Trait","descriptions":["A box full of supplies for the purposes of treating injuries."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MinBulk15":{"name":"Trait_MinBulk15","fieldName":"minbulk15","group":"Trait","description":"","variable":"trt-minbulk15{0}","title":"Bulk 15[MIN]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 15 or more. ","An object of Bulk 15 is typically something up to 20 lbs and can easily be carried in both of a person's hands. Examples include large swords, boxes (1.5 feet cubed), a small creature, or many armor pieces. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MinBulk60":{"name":"Trait_MinBulk60","fieldName":"minbulk60","group":"Trait","description":"","variable":"trt-minbulk60{0}","title":"Bulk 60[MIN]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 60 or more. ","An object of Bulk 60 is usually small or medium sized and up to a weight of 100 lbs. Examples include tables, book shelves, crates (4 foot cubed), or small children. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MinBulk120":{"name":"Trait_MinBulk120","fieldName":"minbulk120","group":"Trait","description":"","variable":"trt-minbulk120{0}","title":"Bulk 120[MIN]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 120 or more. ","An object of Bulk 120 is usually medium or large sized and up to a weight of 250 lbs. Examples include many medium to large size animals, large crates (6.5 feet cubed), and adult humans. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MinBulk250":{"name":"Trait_MinBulk250","fieldName":"minbulk250","group":"Trait","description":"","variable":"trt-minbulk250{0}","title":"Bulk 250[MIN]","subGroup":"Item Trait","descriptions":["The object must be of or carrying Bulk 250 or move. ","An object of Bulk 250 is usually large to gigantic sized and up to a weight of 800 lbs. Examples include many large size animals, small buildings (15 feet cubed), and up to 4 adult humans. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MinDust15":{"name":"Trait_MinDust15","fieldName":"mindust15","group":"Trait","description":"","variable":"trt-mindust15{0}","title":"15 Dust[MIN]","subGroup":"Item Trait","descriptions":["You must have at least 15 motes of Dust.","Dust is always a physical material that is in liquid or gas form like water or mist. Alternatively, dust can be material ground so small that a lot of it can behave like a liquid, for example sand. ","15 motes of dust can be contained to a small box about 1.5 feet cubed."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MinDust60":{"name":"Trait_MinDust60","fieldName":"mindust60","group":"Trait","description":"","variable":"trt-mindust60{0}","title":"60 Dust[MIN]","subGroup":"Item Trait","descriptions":["You must have at least 60 motes of Dust.","Dust is always a physical material that is in liquid or gas form like water or mist. Alternatively, dust can be material ground so small that a lot of it can behave like a liquid, for example sand. ","60 motes of dust can be contained to a small box about 4 feet cubed."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_MinDust120":{"name":"Trait_MinDust120","fieldName":"mindust120","group":"Trait","description":"","variable":"trt-mindust120{0}","title":"120 Dust[MIN]","subGroup":"Item Trait","descriptions":["You must have at least 120 motes of Dust.","Dust is always a physical material that is in liquid or gas form like water or mist. Alternatively, dust can be material ground so small that a lot of it can behave like a liquid, for example sand. ","120 motes of dust can be contained to a small box about 6.5 feet cubed."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Polearm":{"name":"Trait_Polearm","fieldName":"polearm","group":"Trait","description":"","variable":"trt-polearm{0}","title":"Polearm","subGroup":"Item Trait","descriptions":["A weapon with a long shaft and often a combat head, which may include a blade, spike, or hammer."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Resonant":{"name":"Trait_Resonant","fieldName":"resonant","group":"Trait","description":"","variable":"trt-resonant{0}","title":"Resonant","subGroup":"Item Trait","descriptions":["This object has ether affecting it and can be sensed with the Resonance skill. Usually an object with the Resonant trait will have a source."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Scattershot":{"name":"Trait_Scattershot","fieldName":"scattershot","group":"Trait","description":"","variable":"trt-scattershot{0}","title":"Scattershot","subGroup":"Item Trait","descriptions":["This weapon is capable of firing ammunition that scatters in a large burst."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Sharp":{"name":"Trait_Sharp","fieldName":"sharp","group":"Trait","description":"","variable":"trt-sharp{0}","title":"Sharp","subGroup":"Item Trait","descriptions":["Sharp items have a bladed edge and are durable enough to cut through soft material."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Sturdy":{"name":"Trait_Sturdy","fieldName":"sturdy","group":"Trait","description":"","variable":"trt-sturdy{0}","title":"Sturdy","subGroup":"Item Trait","descriptions":["Sturdy items are especially durable and resilient."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Sword":{"name":"Trait_Sword","fieldName":"sword","group":"Trait","description":"","variable":"trt-sword{0}","title":"Sword","subGroup":"Item Trait","descriptions":["A long, bladed weapon with a sharp edge, often used for slashing, thrusting, or cutting."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Edible":{"name":"Trait_Edible","fieldName":"edible","group":"Trait","description":"","variable":"trt-edible{0}","title":"Edible","subGroup":"Goods Trait","descriptions":["This item is meant to be eaten."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Flammable":{"name":"Trait_Flammable","fieldName":"flammable","group":"Trait","description":"","variable":"trt-flammable{0}","title":"Flammable","subGroup":"Goods Trait","descriptions":["This material will gain the aflame condition when exposed to fire."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Flexible":{"name":"Trait_Flexible","fieldName":"flexible","group":"Trait","description":"","variable":"trt-flexible{0}","title":"Flexible","subGroup":"Goods Trait","descriptions":["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Frozen":{"name":"Trait_Frozen","fieldName":"frozen","group":"Trait","description":"","variable":"trt-frozen{0}","title":"Frozen","subGroup":"Goods Trait","descriptions":["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Trait_Transparent":{"name":"Trait_Transparent","fieldName":"transparent","group":"Trait","description":"","variable":"trt-transparent{0}","title":"Transparent","subGroup":"Goods Trait","descriptions":["A transparent material can be seen through due to its translucency. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Human":{"name":"Human","fieldName":"human","group":"AncestryType","description":"","variable":"human","title":"Human","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Spirit":{"name":"Spirit","fieldName":"spirit","group":"AncestryType","description":"","variable":"spirit","title":"Spirit","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Wood":{"name":"Wood","fieldName":"wood","group":"AffinityType","description":"","variable":"Wood","title":"Wood Affinity","subGroup":"","descriptions":["Wood is the element of growth, cooperation, and idealism. Magical techniques of the wood element tend to affect large groups and areas."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "WoodF":{"name":"WoodF","fieldName":"woodf","group":"AffinityTypeDesc","description":"","variable":"","title":"","subGroup":"","descriptions":["A Wood affinity grants the following:\nInitiative bonus equal to your Character Rank.\nHeal Value bonus equal to your Character Rank x 2.\nCold Resistance bonus equal to your Character Rank x 2."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Fire":{"name":"Fire","fieldName":"fire","group":"AffinityType","description":"","variable":"Fire","title":"Fire Affinity","subGroup":"","descriptions":["Fire is the element of expansion, spontaneity, and vigor. Magical techniques of the fire element tend to spread fire swiftly in a variety of impact areas."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "FireF":{"name":"FireF","fieldName":"firef","group":"AffinityTypeDesc","description":"","variable":"","title":"","subGroup":"","descriptions":["A Fire affinity grants the following:\nInitiative bonus equal to your Character Rank.\nBurn Resistance bonus equal to your Character Rank.\nFire Resistance bonus equal to your Character Rank x 2."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Earth":{"name":"Earth","fieldName":"earth","group":"AffinityType","description":"","variable":"Earth","title":"Earth Affinity","subGroup":"","descriptions":["Earth is the element of stability, patience, and practicality. Magical techniques of the earth element tend to be simple and direct in functionality."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "EarthF":{"name":"EarthF","fieldName":"earthf","group":"AffinityTypeDesc","description":"","variable":"","title":"","subGroup":"","descriptions":["An Earth affinity grants the following:\nFire Resistance bonus equal to your Character Rank x 2.\nPiercing Resistance bonus equal to your Character Rank.\nShock Resistance bonus equal to your Character Rank x 2."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Metal":{"name":"Metal","fieldName":"metal","group":"AffinityType","description":"","variable":"Metal","title":"Metal Affinity","subGroup":"","descriptions":["Metal is the element of recession, rigidity, and quality. Magical techniques of the metal element tend to be strong and durable but costly."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "MetalF":{"name":"MetalF","fieldName":"metalf","group":"AffinityTypeDesc","description":"","variable":"","title":"","subGroup":"","descriptions":["A Metal affinity grants the following:\nArmor bonus equal to your Character Rank.\nForce Resistance bonus equal to your Character Rank.\nPiercing Resistance bonus equal to your Character Rank."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Water":{"name":"Water","fieldName":"water","group":"AffinityType","description":"","variable":"Water","title":"Water Affinity","subGroup":"","descriptions":["Water is the element of conservation, flexibility, and wisdom. Magical techniques of the water element tend to use little energy allowing them to quickly come into effect and disappear soon after."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "WaterF":{"name":"WaterF","fieldName":"waterf","group":"AffinityTypeDesc","description":"","variable":"","title":"","subGroup":"","descriptions":["A Water affinity grants the following:\nSurge bonus equal to 1.\nCold Resistance bonus equal to your Character Rank x 2.\nForce Resistance bonus equal to your Character Rank."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Def_BOD":{"name":"Def_BOD","fieldName":"bod","group":"InnateDefenseType","description":"","variable":"idf-BOD{0}","title":"Body","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Def_PRC":{"name":"Def_PRC","fieldName":"prc","group":"InnateDefenseType","description":"","variable":"idf-PRC{0}","title":"Precision","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Def_QCK":{"name":"Def_QCK","fieldName":"qck","group":"InnateDefenseType","description":"","variable":"idf-QCK{0}","title":"Quickness","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Def_CNV":{"name":"Def_CNV","fieldName":"cnv","group":"InnateSenseType","description":"","variable":"isn-CNV{0}","title":"Conviction","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Def_INT":{"name":"Def_INT","fieldName":"int","group":"InnateSenseType","description":"","variable":"isn-INT{0}","title":"Intuition ","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Def_RSN":{"name":"Def_RSN","fieldName":"rsn","group":"InnateSenseType","description":"","variable":"isn-RSN{0}","title":"Reason","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AttributeValueMediocre":{"name":"AttributeValueMediocre","fieldName":"attributevaluemediocre","group":"AttributeValue","description":"","variable":"0","title":"Mediocre (+0)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AttributeValueGreat":{"name":"AttributeValueGreat","fieldName":"attributevaluegreat","group":"AttributeValue","description":"","variable":"3","title":"Great (+3)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AttributeValueGood":{"name":"AttributeValueGood","fieldName":"attributevaluegood","group":"AttributeValue","description":"","variable":"2","title":"Good (+2)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AttributeValueAverage":{"name":"AttributeValueAverage","fieldName":"attributevalueaverage","group":"AttributeValue","description":"","variable":"1","title":"Average (+1)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "AttributeValueBad":{"name":"AttributeValueBad","fieldName":"attributevaluebad","group":"AttributeValue","description":"","variable":"-1","title":"Bad (-1)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier0":{"name":"JobTier0","fieldName":"jobtier0","group":"JobTier","description":"","variable":"0","title":"Unranked","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier1":{"name":"JobTier1","fieldName":"jobtier1","group":"JobTier","description":"","variable":"1","title":"Tier 1","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier2":{"name":"JobTier2","fieldName":"jobtier2","group":"JobTier","description":"","variable":"2","title":"Tier 2","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier3":{"name":"JobTier3","fieldName":"jobtier3","group":"JobTier","description":"","variable":"3","title":"Tier 3","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier4":{"name":"JobTier4","fieldName":"jobtier4","group":"JobTier","description":"","variable":"4","title":"Tier 4","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier5":{"name":"JobTier5","fieldName":"jobtier5","group":"JobTier","description":"","variable":"5","title":"Tier 5","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobTier6":{"name":"JobTier6","fieldName":"jobtier6","group":"JobTier","description":"","variable":"6","title":"Tier 6","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreTier0":{"name":"LoreTier0","fieldName":"loretier0","group":"LoreTier","description":"","variable":"0","title":"-","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreTier1":{"name":"LoreTier1","fieldName":"loretier1","group":"LoreTier","description":"","variable":"1","title":"Tier 1","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreTier2":{"name":"LoreTier2","fieldName":"loretier2","group":"LoreTier","description":"","variable":"2","title":"Tier 2","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreTier3":{"name":"LoreTier3","fieldName":"loretier3","group":"LoreTier","description":"","variable":"3","title":"Tier 3","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GeneralLoreTier0":{"name":"GeneralLoreTier0","fieldName":"generalloretier0","group":"GeneralLoreTier","description":"","variable":"0","title":"-","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GeneralLoreTier1":{"name":"GeneralLoreTier1","fieldName":"generalloretier1","group":"GeneralLoreTier","description":"","variable":"1","title":"Tier 1","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCat_Academics":{"name":"LoreCat_Academics","fieldName":"academics","group":"LoreCategory","description":"","variable":"lrc-Academics{0}","title":"Academics","subGroup":"","descriptions":["","This represents general education for academic study for the purposes of functioning in modern society."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCat_Profession":{"name":"LoreCat_Profession","fieldName":"profession","group":"LoreCategory","description":"","variable":"lrc-Profession{0}","title":"Profession","subGroup":"","descriptions":["","Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCat_Craftmanship":{"name":"LoreCat_Craftmanship","fieldName":"craftmanship","group":"LoreCategory","description":"","variable":"lrc-Craftmanship{0}","title":"Craftmanship","subGroup":"","descriptions":["","The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCat_Geography":{"name":"LoreCat_Geography","fieldName":"geography","group":"LoreCategory","description":"","variable":"lrc-Geography{0}","title":"Geography","subGroup":"","descriptions":["","Geography represents general knowledge of terrains and locations within an area."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCat_History":{"name":"LoreCat_History","fieldName":"history","group":"LoreCategory","description":"","variable":"lrc-History{0}","title":"History","subGroup":"","descriptions":["","History knowledges represent known history of civilizations and any legends that may exist."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCat_Culture":{"name":"LoreCat_Culture","fieldName":"culture","group":"LoreCategory","description":"","variable":"lrc-Culture{0}","title":"Culture","subGroup":"","descriptions":["","Culture knowledge represents information on societal customs, art, and entertainment options."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "LoreCat_Religion":{"name":"LoreCat_Religion","fieldName":"religion","group":"LoreCategory","description":"","variable":"lrc-Religion{0}","title":"Religion","subGroup":"","descriptions":["","Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Speak":{"name":"Speak","fieldName":"speak","group":"ChatType","description":"","variable":"ctmsg","title":"Speak","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Whisper":{"name":"Whisper","fieldName":"whisper","group":"ChatType","description":"","variable":"ctwsp","title":"Whisper","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Yell":{"name":"Yell","fieldName":"yell","group":"ChatType","description":"","variable":"ctyell","title":"Yell","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Think":{"name":"Think","fieldName":"think","group":"ChatType","description":"","variable":"ctthk","title":"Think","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Describe":{"name":"Describe","fieldName":"describe","group":"ChatType","description":"","variable":"ctdesc","title":"Describe","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Boon_Rest":{"name":"Boon_Rest","fieldName":"rest","group":"Boon","description":"","variable":"boon-rest{0}","title":"Rest","subGroup":"","descriptions":["A boon representing restfulness. This boon is usually gained after finishing a night's rest with at least 6 hours of sleep. This boon can only be gained once every 24 hours. This boon is lost after 24 hours without sleep."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Boon_Savor":{"name":"Boon_Savor","fieldName":"savor","group":"Boon","description":"","variable":"boon-savor{0}","title":"Savor","subGroup":"","descriptions":["A boon for being well fed. This boon is usually gained not just by eating but rather after enjoying a satisfying, well-cooked meal. See the rules of cooking for more information. This boon can only be gained once every 6 hours. This boon is lost after 24 hours of not eating."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Boon_Truth":{"name":"Boon_Truth","fieldName":"truth","group":"Boon","description":"","variable":"boon-truth{0}","title":"Truth","subGroup":"","descriptions":["A boon for feelings true to oneself. This boon is usually gained after performing dramatic actions related to your influences. This boon can only be gained as per your GM, but generally can only be gained once per 24 hours. A boon of truth is lost in times of extreme duress as determined by your GM."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "InfluenceTrait":{"name":"InfluenceTrait","fieldName":"influencetrait","group":"InfluenceType","description":"","variable":"trait","title":"Trait","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "InfluenceIdeal":{"name":"InfluenceIdeal","fieldName":"influenceideal","group":"InfluenceType","description":"","variable":"ideal","title":"Ideal","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "InfluenceBond":{"name":"InfluenceBond","fieldName":"influencebond","group":"InfluenceType","description":"","variable":"bond","title":"Bond","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "InfluenceGoal":{"name":"InfluenceGoal","fieldName":"influencegoal","group":"InfluenceType","description":"","variable":"goal","title":"Goal","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Svr_LowSeverity":{"name":"Svr_LowSeverity","fieldName":"lowseverity","group":"SeverityRank","description":"","variable":"sev-low{0}","title":"+1 Low","subGroup":"","descriptions":["A low severity influence is usually notable in the short term and not important to who that character is. These influences can be long term goals but are also often fleeting desires from the moment they are formed. ","These influences grant 1 advantage or disadvantage on checks that leverage the influence. They also add or remove 1d6 to an associated request check. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Svr_ModerateSeverity":{"name":"Svr_ModerateSeverity","fieldName":"moderateseverity","group":"SeverityRank","description":"","variable":"sev-moderate{0}","title":"+2 Moderate","subGroup":"","descriptions":["A moderate severity influence are typically formed long term and have a hold on the character's convictions and desires. These influences can sway decisions even when tangentially related to a situation. Moderate influences often dicate how the character lives their daily lives. These influences can usually be leveraged to persuade a character to work outside of their self interest and stick their neck out for a greater cause.","These influences grant 2 advantages or disadvantages on checks that leverage the influence. They also add or remove 1d6+5 to an associated request check. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Svr_HighSeverity":{"name":"Svr_HighSeverity","fieldName":"highseverity","group":"SeverityRank","description":"","variable":"sev-high{0}","title":"+3 High","subGroup":"","descriptions":["High severity influences are the most important beliefs, relationships, and goals of a character. These define who they are as a person, often guiding their behavior in all aspects of their lives. They can persuade a character to take great action that may even alter their own lives.","These influences grant 3 advantages or disadvantages on checks that leverage the influence. They also add or remove 1d6+10 to an associated request check."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Burn":{"name":"Dmg_Burn","fieldName":"burn","group":"DamageType","description":"","variable":"dmg-burn{0}","title":"Burn","subGroup":"Energy","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Cold":{"name":"Dmg_Cold","fieldName":"cold","group":"DamageType","description":"","variable":"dmg-cold{0}","title":"Cold","subGroup":"Energy","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Energy":{"name":"Dmg_Energy","fieldName":"energy","group":"DamageType","description":"","variable":"dmg-energy{0}","title":"Energy","subGroup":"Energy","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Fire":{"name":"Dmg_Fire","fieldName":"fire","group":"DamageType","description":"","variable":"dmg-fire{0}","title":"Fire","subGroup":"Energy","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Force":{"name":"Dmg_Force","fieldName":"force","group":"DamageType","description":"","variable":"dmg-force{0}","title":"Force","subGroup":"Physical","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Piercing":{"name":"Dmg_Piercing","fieldName":"piercing","group":"DamageType","description":"","variable":"dmg-piercing{0}","title":"Piercing","subGroup":"Physical","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Shock":{"name":"Dmg_Shock","fieldName":"shock","group":"DamageType","description":"","variable":"dmg-shock{0}","title":"Shock","subGroup":"Energy","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Tension":{"name":"Dmg_Tension","fieldName":"tension","group":"DamageType","description":"","variable":"dmg-tension{0}","title":"Tension","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Dmg_Weapon":{"name":"Dmg_Weapon","fieldName":"weapon","group":"DamageType","description":"","variable":"dmg-weapon{0}","title":"Weapon","subGroup":"Physical","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Ter_Darkness":{"name":"Ter_Darkness","fieldName":"darkness","group":"TerrainFxType","description":"","variable":"ter-darkness{0}","title":"Darkness","subGroup":"","descriptions":["This area is covered in shadow that is difficult to see through. Everything within is considered to be in soft cover and dim light."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":6,"multiplier":1,"max":0}]},
                "linkedGroups":[]
                ,
                "isResource":""},
            "Ter_Fog":{"name":"Ter_Fog","fieldName":"fog","group":"TerrainFxType","description":"","variable":"ter-fog{0}","title":"Fog","subGroup":"","descriptions":["This area is covered in fine particles that are difficult to see through. Everything within is considered to be in soft cover."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":6,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Ter_Harsh":{"name":"Ter_Harsh","fieldName":"harsh","group":"TerrainFxType","description":"","variable":"ter-harsh{0}","title":"Harsh","subGroup":"","descriptions":["When entering a space that is harsh, you spend an additional space of movement."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":4,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Ter_Heavy":{"name":"Ter_Heavy","fieldName":"heavy","group":"TerrainFxType","description":"","variable":"ter-heavy{0}","title":"Heavy","subGroup":"","descriptions":["When entering a space that is heavy, you spend an additional space of movement."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":4,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Ter_Liftstream":{"name":"Ter_Liftstream","fieldName":"liftstream","group":"TerrainFxType","description":"","variable":"ter-liftstream{0}","title":"Liftstream","subGroup":"","descriptions":["Characters who make a vertical jump increase their jump height by up to 3 spaces. ","Characters that end a fall within the area treat falls as 4 spaces shorter."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Ter_Light":{"name":"Ter_Light","fieldName":"light","group":"TerrainFxType","description":"","variable":"ter-light{0}","title":"Light","subGroup":"","descriptions":["This area is bathed in light. This eliminates darkness in the area."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Ter_Slippery":{"name":"Ter_Slippery","fieldName":"slippery","group":"TerrainFxType","description":"","variable":"ter-slippery{0}","title":"Slippery","subGroup":"","descriptions":["Once per round, when you move over a space that is slippery, make a DC10 Agility check. On failure, your movement ends and you gain the Prone condition."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":8,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Ter_Sodden":{"name":"Ter_Sodden","fieldName":"sodden","group":"TerrainFxType","description":"","variable":"ter-sodden{0}","title":"Sodden","subGroup":"","descriptions":["Once per round, when you enter a space that is sodden you lose all remaining spaces of movement as the ground causes you to cling to it. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"","definitionName":"","value":7,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "PerkGroup_Origin Perks":{"name":"PerkGroup_Origin Perks","fieldName":"origin_perks","group":"PerkGroup","description":"","variable":"perkgroup-originperk{0}","title":"Origin Perks","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PerkGroup_Stat Boost Perks":{"name":"PerkGroup_Stat Boost Perks","fieldName":"stat_boost_perks","group":"PerkGroup","description":"","variable":"perkgroup-statboostperk{0}","title":"Stat Boost Perks","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PerkGroup_Slot Perks":{"name":"PerkGroup_Slot Perks","fieldName":"slot_perks","group":"PerkGroup","description":"","variable":"perkgroup-slotperk{0}","title":"Slot Perks","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup_Vanguard":{"name":"JobGroup_Vanguard","fieldName":"vanguard","group":"JobGroup","description":"","variable":"jobgroup-vanguard{0}","title":"Vanguard","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup_Operator":{"name":"JobGroup_Operator","fieldName":"operator","group":"JobGroup","description":"","variable":"jobgroup-operator{0}","title":"Operator","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup_Athlete":{"name":"JobGroup_Athlete","fieldName":"athlete","group":"JobGroup","description":"","variable":"jobgroup-athlete{0}","title":"Athlete","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup_Strategist":{"name":"JobGroup_Strategist","fieldName":"strategist","group":"JobGroup","description":"","variable":"jobgroup-strategist{0}","title":"Strategist","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup_Waymaker":{"name":"JobGroup_Waymaker","fieldName":"waymaker","group":"JobGroup","description":"","variable":"jobgroup-waymaker{0}","title":"Waymaker","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup_Advocate":{"name":"JobGroup_Advocate","fieldName":"advocate","group":"JobGroup","description":"","variable":"jobgroup-advocate{0}","title":"Advocate","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "JobGroup_Esper":{"name":"JobGroup_Esper","fieldName":"esper","group":"JobGroup","description":"","variable":"jobgroup-esper{0}","title":"Esper","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Melee Weaponry":{"name":"StyleGroup_Melee Weaponry","fieldName":"melee_weaponry","group":"StyleGroup","description":"","variable":"stylegroup-melee_weaponry{0}","title":"Melee Weaponry","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Ranged Weaponry":{"name":"StyleGroup_Ranged Weaponry","fieldName":"ranged_weaponry","group":"StyleGroup","description":"","variable":"stylegroup-ranged_weaponry{0}","title":"Ranged Weaponry","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Martial Arts":{"name":"StyleGroup_Martial Arts","fieldName":"martial_arts","group":"StyleGroup","description":"","variable":"stylegroup-martial_arts{0}","title":"Martial Arts","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Arcanification Magic":{"name":"StyleGroup_Arcanification Magic","fieldName":"arcanification_magic","group":"StyleGroup","description":"","variable":"stylegroup-arcanification_magic{0}","title":"Arcanification Magic","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Fluctuation Magic":{"name":"StyleGroup_Fluctuation Magic","fieldName":"fluctuation_magic","group":"StyleGroup","description":"","variable":"stylegroup-fluctuation_magic{0}","title":"Fluctuation Magic","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Materialization Magic":{"name":"StyleGroup_Materialization Magic","fieldName":"materialization_magic","group":"StyleGroup","description":"","variable":"stylegroup-materialization_magic{0}","title":"Materialization Magic","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Transformation Magic":{"name":"StyleGroup_Transformation Magic","fieldName":"transformation_magic","group":"StyleGroup","description":"","variable":"stylegroup-transformation_magic{0}","title":"Transformation Magic","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Athletics":{"name":"StyleGroup_Athletics","fieldName":"athletics","group":"StyleGroup","description":"","variable":"stylegroup-athletics{0}","title":"Athletics","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleGroup_Speechcraft":{"name":"StyleGroup_Speechcraft","fieldName":"speechcraft","group":"StyleGroup","description":"","variable":"stylegroup-speechcraft{0}","title":"Speechcraft","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Mighty Weapons":{"name":"StyleSubGroup_Mighty Weapons","fieldName":"mighty_weapons","group":"StyleSubGroup","description":"","variable":"stylesubgroup-mightyweapons{0}","title":"Mighty Weapons","subGroup":"Melee Weaponry","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Skirmish Weapons":{"name":"StyleSubGroup_Skirmish Weapons","fieldName":"skirmish_weapons","group":"StyleSubGroup","description":"","variable":"stylesubgroup-skirmishweapons{0}","title":"Skirmish Weapons","subGroup":"Melee Weaponry","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Finesse Weapons":{"name":"StyleSubGroup_Finesse Weapons","fieldName":"finesse_weapons","group":"StyleSubGroup","description":"","variable":"stylesubgroup-finesseweapons{0}","title":"Finesse Weapons","subGroup":"Melee Weaponry","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Shoot Weapons":{"name":"StyleSubGroup_Shoot Weapons","fieldName":"shoot_weapons","group":"StyleSubGroup","description":"","variable":"stylesubgroup-rangedweapons{0}","title":"Shoot Weapons","subGroup":"Ranged Weaponry","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Throw Weapons":{"name":"StyleSubGroup_Throw Weapons","fieldName":"throw_weapons","group":"StyleSubGroup","description":"","variable":"stylesubgroup-throwweapons{0}","title":"Throw Weapons","subGroup":"Ranged Weaponry","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Martial Arts":{"name":"StyleSubGroup_Martial Arts","fieldName":"martial_arts","group":"StyleSubGroup","description":"","variable":"stylesubgroup-martialarts{0}","title":"Martial Arts","subGroup":"Martial Arts","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Kinetics":{"name":"StyleSubGroup_Kinetics","fieldName":"kinetics","group":"StyleSubGroup","description":"","variable":"stylesubgroup-kinetics{0}","title":"Kinetics","subGroup":"Martial Arts","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Evocation":{"name":"StyleSubGroup_Evocation","fieldName":"evocation","group":"StyleSubGroup","description":"","variable":"stylesubgroup-evocation{0}","title":"Evocation","subGroup":"Arcanification Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Channelling":{"name":"StyleSubGroup_Channelling","fieldName":"channelling","group":"StyleSubGroup","description":"","variable":"stylesubgroup-channelling{0}","title":"Channelling","subGroup":"Arcanification Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Enchantment":{"name":"StyleSubGroup_Enchantment","fieldName":"enchantment","group":"StyleSubGroup","description":"","variable":"stylesubgroup-enchantment{0}","title":"Enchantment","subGroup":"Arcanification Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Fluctuation":{"name":"StyleSubGroup_Fluctuation","fieldName":"fluctuation","group":"StyleSubGroup","description":"","variable":"stylesubgroup-fluctuation{0}","title":"Fluctuation","subGroup":"Fluctuation Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Battlesmithing":{"name":"StyleSubGroup_Battlesmithing","fieldName":"battlesmithing","group":"StyleSubGroup","description":"","variable":"stylesubgroup-battlesmithing{0}","title":"Battlesmithing","subGroup":"Materialization Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Conjury":{"name":"StyleSubGroup_Conjury","fieldName":"conjury","group":"StyleSubGroup","description":"","variable":"stylesubgroup-conjury{0}","title":"Conjury","subGroup":"Materialization Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Transmulation":{"name":"StyleSubGroup_Transmulation","fieldName":"transmulation","group":"StyleSubGroup","description":"","variable":"stylesubgroup-transmutation{0}","title":"Transmulation","subGroup":"Transformation Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Physiomancy":{"name":"StyleSubGroup_Physiomancy","fieldName":"physiomancy","group":"StyleSubGroup","description":"","variable":"stylesubgroup-physiomancy{0}","title":"Physiomancy","subGroup":"Transformation Magic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Brawn":{"name":"StyleSubGroup_Brawn","fieldName":"brawn","group":"StyleSubGroup","description":"","variable":"stylesubgroup-brawn{0}","title":"Brawn","subGroup":"Athletics","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Stealth":{"name":"StyleSubGroup_Stealth","fieldName":"stealth","group":"StyleSubGroup","description":"","variable":"stylesubgroup-stealth{0}","title":"Stealth","subGroup":"Athletics","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Acrobatics":{"name":"StyleSubGroup_Acrobatics","fieldName":"acrobatics","group":"StyleSubGroup","description":"","variable":"stylesubgroup-acrobatics{0}","title":"Acrobatics","subGroup":"Athletics","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Persuasion":{"name":"StyleSubGroup_Persuasion","fieldName":"persuasion","group":"StyleSubGroup","description":"","variable":"stylesubgroup-persuasion{0}","title":"Persuasion","subGroup":"Speechcraft","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StyleSubGroup_Cunning":{"name":"StyleSubGroup_Cunning","fieldName":"cunning","group":"StyleSubGroup","description":"","variable":"stylesubgroup-cunning{0}","title":"Cunning","subGroup":"Speechcraft","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GearGroup_HeadGear":{"name":"GearGroup_HeadGear","fieldName":"headgear","group":"GearGroup","description":"","variable":"geargroup-headgear{0}","title":"Head Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GearGroup_FaceGear":{"name":"GearGroup_FaceGear","fieldName":"facegear","group":"GearGroup","description":"","variable":"geargroup-facegear{0}","title":"Face Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GearGroup_ChestGear":{"name":"GearGroup_ChestGear","fieldName":"chestgear","group":"GearGroup","description":"","variable":"geargroup-chestgear{0}","title":"Chest Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GearGroup_ArmGear":{"name":"GearGroup_ArmGear","fieldName":"armgear","group":"GearGroup","description":"","variable":"geargroup-armgear{0}","title":"Arm Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GearGroup_LegGear":{"name":"GearGroup_LegGear","fieldName":"leggear","group":"GearGroup","description":"","variable":"geargroup-leggear{0}","title":"Leg Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "GearGroup_FootGear":{"name":"GearGroup_FootGear","fieldName":"footgear","group":"GearGroup","description":"","variable":"geargroup-footgear{0}","title":"Foot Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PageSet_Character Creator":{"name":"PageSet_Character Creator","fieldName":"character_creator","group":"PageSet","description":"","variable":"pgs-character_creator{0}","title":"Character Creator","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PageSet_Core":{"name":"PageSet_Core","fieldName":"core","group":"PageSet","description":"","variable":"pgs-core{0}","title":"Core","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PageSet_TechType":{"name":"PageSet_TechType","fieldName":"techtype","group":"PageSet","description":"","variable":"pgs-techtype{0}","title":"TechType","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PageSet_Advancement":{"name":"PageSet_Advancement","fieldName":"advancement","group":"PageSet","description":"","variable":"pgs-advancement{0}","title":"Advancement","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "PageSet_Training":{"name":"PageSet_Training","fieldName":"training","group":"PageSet","description":"","variable":"pgs-training{0}","title":"Training","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Origin":{"name":"Page_Origin","fieldName":"origin","group":"Page","description":"","variable":"pag-origin{0}","title":"Origin","subGroup":"","descriptions":["This is the Character Creator. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ","Once you have finished character creation, press Finish to populate this character's stats.","On this page you can set your character's origins including their name, their primary element, and ancestry. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Jobs":{"name":"Page_Jobs","fieldName":"jobs","group":"Page","description":"","variable":"pag-jobs{0}","title":"Jobs","subGroup":"","descriptions":["Jobs are a unique type of Style which broadly represents a character's role. A job will always grant bonuses to a character's combat or social stats, defenses, and special techniques to determine how the character acts in a conflict. When entering a conflict, only one job may be set at a time. ","On this page, you can see the number of job points you have available to spend on the left column. Each time you spend a job point you may gain a rank in one job. A job's maximum rank is equal to your Character Rank.","Gaining a rank in a job often grants new techniques to use when a job's techniques are active.","You gain a number of job points equal to your Character Rank. You may choose to gain additional job points by spending advancement points on level up."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Skills":{"name":"Page_Skills","fieldName":"skills","group":"Page","description":"","variable":"pag-skills{0}","title":"Skills","subGroup":"","descriptions":["Skills represent a broad application of techniques and ability. Anytime you do anything complex in Wuxing you will be making a skill check to determine your success. In addition, most techniques will require the use of a skill to function.","Skills are all tied to one of the six attributes. As a base, a skill modifier is equal to its associated attribute. When you are trained in a skill your modifier increases by 2 + your Character Rank.","On this page you can see the number of skill points you have available to spend on the left column. Each time you spend a skill point you may become trained in one skill. To train a skill you must check the skill off on the checkbox.","You begin play with 3 skill points and gain an additional 2 at 2nd, 3rd, and 4th level. You gain an additional skill point whenever you increase in Character Rank. You may choose to gain additional skill points by spending advancement points on level up."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_ActiveSkills":{"name":"Page_ActiveSkills","fieldName":"activeskills","group":"Page","description":"","variable":"pag-activeskills{0}","title":"Active Skills","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Fight":{"name":"Fight","fieldName":"fight","group":"ActiveSkills","description":"","variable":"","title":"Fight","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Cast":{"name":"Cast","fieldName":"cast","group":"ActiveSkills","description":"","variable":"","title":"Cast","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Athletics":{"name":"Athletics","fieldName":"athletics","group":"ActiveSkills","description":"","variable":"","title":"Athletics","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_SocialSkills":{"name":"Page_SocialSkills","fieldName":"socialskills","group":"Page","description":"","variable":"pag-socialskills{0}","title":"Social Skills","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Persuade":{"name":"Persuade","fieldName":"persuade","group":"SocialSkills","description":"","variable":"","title":"Persuade","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Cunning":{"name":"Cunning","fieldName":"cunning","group":"SocialSkills","description":"","variable":"","title":"Cunning","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_TechnicalSkills":{"name":"Page_TechnicalSkills","fieldName":"technicalskills","group":"Page","description":"","variable":"pag-technicalskills{0}","title":"Technical Skills","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Craft":{"name":"Craft","fieldName":"craft","group":"TechnicalSkills","description":"","variable":"","title":"Craft","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Device":{"name":"Device","fieldName":"device","group":"TechnicalSkills","description":"","variable":"","title":"Device","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Investigate":{"name":"Investigate","fieldName":"investigate","group":"TechnicalSkills","description":"","variable":"","title":"Investigate","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Knowledge":{"name":"Page_Knowledge","fieldName":"knowledge","group":"Page","description":"","variable":"pag-knowledge{0}","title":"Knowledge","subGroup":"","descriptions":["Knowledge represents information a character knows on a subject. Knowledge can be divided into two categories, languages and lore. ","Languages are divided by the locations of the world where they are used. Learning a language allows one to speak, read, and write the language. ","Lore is knowledge of a single broad topic. Whenever you use the Recall Knowledge technique, you will roll with the modifier of an appropriate lore knowledge for the subject you wish to recall knowledge for. When you make a lore check your modifier is equal to your lore's rank + your Character Rank.","Lore is divided into categories based on the context of their usage. Each category has a General knowledge that can be trained. Normally, you cannot make a lore check without having an associated lore, however having the general knowledge of the subject will allow it. When making a general lore check, your modifier is equal to your Character Rank.","On this page you can see the number of knowledge points you have available to spend on the left column. Each time you spend a knowledge point you may raise the rank of any lore or learn a language. To raise the rank of a lore, you may change the value of a lore with its dropdown. To learn a language you must check the language off on the checkbox.","You gain a number of skill points equal to 6 + your Character Rank. You may choose to gain additional knowledge points by spending training points through training on level up."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Attributes":{"name":"Page_Attributes","fieldName":"attributes","group":"Page","description":"","variable":"pag-attributes{0}","title":"Attributes","subGroup":"","descriptions":["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ","Attributes range from a +3 bonus to a -1 penalty. Whenever you raise an attribute to a rank you spend an equal number of attribute points.","By reducing an attribute below 0, you gain an equal number of attribute points. At most, a character can gain only one attribute point in this way.","You gain a number of attribute points equal to 6 + your Character Rank."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Styles":{"name":"Page_Styles","fieldName":"styles","group":"Page","description":"","variable":"pag-styles{0}","title":"Styles","subGroup":"","descriptions":["",""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_LearnTechniques":{"name":"Page_LearnTechniques","fieldName":"learntechniques","group":"Page","description":"","variable":"pag-learntechniques{0}","title":"Styles","subGroup":"","descriptions":["Each technique allows a character to perform a variety of actions including granting bonuses to the character, performing attacks, manipulate others, or maneuvering around the world.","All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.","On this page you can learn general styles and techniques. This page contains general styles and techniques that are available to all characters as long as they meet the requirements to learn the style or technique.","When learning a style often the style will grant a set of techniques that are learned as part of the style. These are listed as Free Techniques in the Style's entry.","You begin play with 4 technique points and gain an additional point at 2nd, 3rd, and 4th level. You gain an additional 3 technique points whenever you increase in Character Rank. You may choose to gain additional technique points by spending advancement points on level up. You may also choose to gain additional technique points by spending training points through training on level up."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AdvancedStyles":{"name":"Page_AdvancedStyles","fieldName":"advancedstyles","group":"Page","description":"","variable":"pag-advancedstyles{0}","title":"Adv. Styles","subGroup":"","descriptions":["Advanced styles are special styles that grant more techniques than a normal style. As such, a character typically can equip fewer advanced styles."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Forme":{"name":"Page_Forme","fieldName":"forme","group":"Page","description":"","variable":"pag-forme{0}","title":"Forme","subGroup":"","descriptions":["All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.","On this page you can set which styles are currently active on the character, allowing them to be used in the Actions Page. You can set both job styles and general styles. Basic styles are always set. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_JobStyles":{"name":"Page_JobStyles","fieldName":"jobstyles","group":"Page","description":"","variable":"pag-jobstyles{0}","title":"Jobs","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Character":{"name":"Page_Character","fieldName":"character","group":"Page","description":"","variable":"pag-character{0}","title":"Character","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Overview":{"name":"Page_Overview","fieldName":"overview","group":"Page","description":"","variable":"pag-overview{0}","title":"Overview","subGroup":"","descriptions":["The Overview section shows quick information about your character. In addition, this is where you access both Advancement and Training to improve or change your character's build."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_OverviewCharacter":{"name":"Page_OverviewCharacter","fieldName":"overviewcharacter","group":"Page","description":"","variable":"pag-overviewcharacter{0}","title":"Character Data","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_OverviewResources":{"name":"Page_OverviewResources","fieldName":"overviewresources","group":"Page","description":"","variable":"pag-overviewresources{0}","title":"Resources","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_OverviewStatus":{"name":"Page_OverviewStatus","fieldName":"overviewstatus","group":"Page","description":"","variable":"pag-overviewstatus{0}","title":"Status","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Details":{"name":"Page_Details","fieldName":"details","group":"Page","description":"","variable":"pag-details{0}","title":"Details","subGroup":"","descriptions":["The Details section contains all of your character's vital statistics. You can use this page to see exact numbers of each of their stats."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Chat":{"name":"Page_Chat","fieldName":"chat","group":"Page","description":"","variable":"pag-chat{0}","title":"Chat","subGroup":"","descriptions":["This is the Chat section. Here you can set your character emotes for the chat's messaging system. You can also use the Chat Post Box to send messages to the chat and select which language you are speaking from the language selection."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Options":{"name":"Page_Options","fieldName":"options","group":"Page","description":"","variable":"pag-options{0}","title":"Options","subGroup":"","descriptions":["This is the Options section. Here you will find various display options in the character sheet."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Gear":{"name":"Page_Gear","fieldName":"gear","group":"Page","description":"","variable":"pag-gear{0}","title":"Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Equipped":{"name":"Page_Equipped","fieldName":"equipped","group":"Page","description":"","variable":"pag-equipped{0}","title":"Equipped","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_GearCurrency":{"name":"Page_GearCurrency","fieldName":"gearcurrency","group":"Page","description":"","variable":"pag-gearcurrency{0}","title":"Currency","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_GearEquipment":{"name":"Page_GearEquipment","fieldName":"gearequipment","group":"Page","description":"","variable":"pag-gearequipment{0}","title":"Equipment","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_GearItems":{"name":"Page_GearItems","fieldName":"gearitems","group":"Page","description":"","variable":"pag-gearitems{0}","title":"Items","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_GearConsumables":{"name":"Page_GearConsumables","fieldName":"gearconsumables","group":"Page","description":"","variable":"pag-gearconsumables{0}","title":"Consumables","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_GearGoods":{"name":"Page_GearGoods","fieldName":"geargoods","group":"Page","description":"","variable":"pag-geargoods{0}","title":"Goods","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_SlotEmpty":{"name":"Page_SlotEmpty","fieldName":"slotempty","group":"Page","description":"","variable":"pag-slotempty{0}","title":"Empty","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddItem":{"name":"Page_AddItem","fieldName":"additem","group":"Page","description":"","variable":"pag-additem{0}","title":"Add Item","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddMeleeWeapon":{"name":"Page_AddMeleeWeapon","fieldName":"addmeleeweapon","group":"Page","description":"","variable":"pag-addmeleeweapon{0}","title":"Add Melee Weapon","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddRangedWeapon":{"name":"Page_AddRangedWeapon","fieldName":"addrangedweapon","group":"Page","description":"","variable":"pag-addrangedweapon{0}","title":"Add Ranged Weapon","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddTool":{"name":"Page_AddTool","fieldName":"addtool","group":"Page","description":"","variable":"pag-addtool{0}","title":"Add Tool","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddCommsTool":{"name":"Page_AddCommsTool","fieldName":"addcommstool","group":"Page","description":"","variable":"pag-addcommstool{0}","title":"Add Comms Tool","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddLightTool":{"name":"Page_AddLightTool","fieldName":"addlighttool","group":"Page","description":"","variable":"pag-addlighttool{0}","title":"Add Light Tool","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddBindingsTool":{"name":"Page_AddBindingsTool","fieldName":"addbindingstool","group":"Page","description":"","variable":"pag-addbindingstool{0}","title":"Add Bindings Tool","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddMiscTool":{"name":"Page_AddMiscTool","fieldName":"addmisctool","group":"Page","description":"","variable":"pag-addmisctool{0}","title":"Add Misc Tool","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddHeadGear":{"name":"Page_AddHeadGear","fieldName":"addheadgear","group":"Page","description":"","variable":"pag-addheadgear{0}","title":"Add Head Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddFaceGear":{"name":"Page_AddFaceGear","fieldName":"addfacegear","group":"Page","description":"","variable":"pag-addfacegear{0}","title":"Add Face Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddChestGear":{"name":"Page_AddChestGear","fieldName":"addchestgear","group":"Page","description":"","variable":"pag-addchestgear{0}","title":"Add Chest Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddArmGear":{"name":"Page_AddArmGear","fieldName":"addarmgear","group":"Page","description":"","variable":"pag-addarmgear{0}","title":"Add Arm Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddLegGear":{"name":"Page_AddLegGear","fieldName":"addleggear","group":"Page","description":"","variable":"pag-addleggear{0}","title":"Add Leg Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddFootGear":{"name":"Page_AddFootGear","fieldName":"addfootgear","group":"Page","description":"","variable":"pag-addfootgear{0}","title":"Add Foot Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddMiscGear":{"name":"Page_AddMiscGear","fieldName":"addmiscgear","group":"Page","description":"","variable":"pag-addmiscgear{0}","title":"Add Misc Gear","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddRecoveryItem":{"name":"Page_AddRecoveryItem","fieldName":"addrecoveryitem","group":"Page","description":"","variable":"pag-addrecoveryitem{0}","title":"Add Recovery","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddTonicItem":{"name":"Page_AddTonicItem","fieldName":"addtonicitem","group":"Page","description":"","variable":"pag-addtonicitem{0}","title":"Add Tonic","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddBombItem":{"name":"Page_AddBombItem","fieldName":"addbombitem","group":"Page","description":"","variable":"pag-addbombitem{0}","title":"Add Bomb","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddBeverageItem":{"name":"Page_AddBeverageItem","fieldName":"addbeverageitem","group":"Page","description":"","variable":"pag-addbeverageitem{0}","title":"Add Beverage","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddMaterial":{"name":"Page_AddMaterial","fieldName":"addmaterial","group":"Page","description":"","variable":"pag-addmaterial{0}","title":"Add Material","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddCompound":{"name":"Page_AddCompound","fieldName":"addcompound","group":"Page","description":"","variable":"pag-addcompound{0}","title":"Add Compound","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddAnimalGood":{"name":"Page_AddAnimalGood","fieldName":"addanimalgood","group":"Page","description":"","variable":"pag-addanimalgood{0}","title":"Add Animal Good","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddSupplement":{"name":"Page_AddSupplement","fieldName":"addsupplement","group":"Page","description":"","variable":"pag-addsupplement{0}","title":"Add Supplement","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddFruit":{"name":"Page_AddFruit","fieldName":"addfruit","group":"Page","description":"","variable":"pag-addfruit{0}","title":"Add Fruit","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddVegetable":{"name":"Page_AddVegetable","fieldName":"addvegetable","group":"Page","description":"","variable":"pag-addvegetable{0}","title":"Add Vegetable","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_AddStarch":{"name":"Page_AddStarch","fieldName":"addstarch","group":"Page","description":"","variable":"pag-addstarch{0}","title":"Add Starch","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Actions":{"name":"Page_Actions","fieldName":"actions","group":"Page","description":"","variable":"pag-actions{0}","title":"Actions","subGroup":"","descriptions":["This is the Actions section. Here you can use any action available to your character."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Training":{"name":"Page_Training","fieldName":"training","group":"Page","description":"","variable":"pag-training{0}","title":"Training","subGroup":"","descriptions":["Characters can spend time learning new skills in their own free time. In this page you can track your progress learning and potentially gain ranks in knowledge or learn new techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Advancement":{"name":"Page_Advancement","fieldName":"advancement","group":"Page","description":"","variable":"pag-advancement{0}","title":"Advancement","subGroup":"","descriptions":["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Perks":{"name":"Page_Perks","fieldName":"perks","group":"Page","description":"","variable":"pag-perks{0}","title":"Perks","subGroup":"","descriptions":["Perks are bonuses granted to a character to represent special aspects of how they function as a character. To purchase a perk, select it from the list by checking its checkbox."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Page_Sidebar":{"name":"Page_Sidebar","fieldName":"sidebar","group":"Page","description":"","variable":"pag-sidebar{0}","title":"Sidebar","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Origin":{"name":"Title_Origin","fieldName":"origin","group":"Title","description":"","variable":"ttl-origin{0}","title":"Origin","subGroup":"","descriptions":["These are the origin details of your character. They make no mechanical differences to your character, however may impact how you roleplay your character."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Background":{"name":"Title_Background","fieldName":"background","group":"Title","description":"","variable":"ttl-background{0}","title":"Background","subGroup":"","descriptions":["Background established additional details on your character including backstory, physical traits, how they prefer to be called, and other details."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_OriginAdvancement":{"name":"Title_OriginAdvancement","fieldName":"originadvancement","group":"Title","description":"","variable":"ttl-originadvancement{0}","title":"Advancement","subGroup":"","descriptions":["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ","Here you can set your character's level. You may also spend any advancement points gained from increasing your character level on additional build points for jobs, skills, or techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_OriginTraining":{"name":"Title_OriginTraining","fieldName":"origintraining","group":"Title","description":"","variable":"ttl-origintraining{0}","title":"Training","subGroup":"","descriptions":["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.","Here you can set any training points your character may have gained prior to character creation. You may also immediately spend these points on further build points."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[]
                ,
                "isResource":""},
            "Title_Advancement":{"name":"Title_Advancement","fieldName":"advancement","group":"Title","description":"","variable":"ttl-advancement{0}","title":"Advancement","subGroup":"","descriptions":["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ","In this section you can see your current level and track their experience. When you are ready, you may also access the advancement menu which will allow you to spend gained build points from leveling up."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_AdvancementConversion":{"name":"Title_AdvancementConversion","fieldName":"advancementconversion","group":"Title","description":"","variable":"ttl-advancementconversion{0}","title":"Conversion","subGroup":"","descriptions":["Experience Points are used to grant levels to your character. You can convert experience points (XP) into levels by using the convert to levels button below."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Training":{"name":"Title_Training","fieldName":"training","group":"Title","description":"","variable":"ttl-training{0}","title":"Training","subGroup":"","descriptions":["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.","In this section you can see how many training points you have gained along with your current PP values. When you are ready, you may also access the training menu which will calculate your current training points and allow you to spend them to learn new knowledge and techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TrainingConversion":{"name":"Title_TrainingConversion","fieldName":"trainingconversion","group":"Title","description":"","variable":"ttl-trainingconversion{0}","title":"Conversion","subGroup":"","descriptions":["PP is used to gain Training Points for your character. You can convert PP into Training Points by using the convert to TP button below."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_ShowTechnique":{"name":"Title_ShowTechnique","fieldName":"showtechnique","group":"Title","description":"","variable":"ttl-showtechnique{0}","title":"Show Technique","subGroup":"","descriptions":["Clicking this button will send the technique information to chat, allowing others to see its details.","Showing the technique in this way does not consume any resources. It is purely for display."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_UseTechnique":{"name":"Title_UseTechnique","fieldName":"usetechnique","group":"Title","description":"","variable":"ttl-usetechnique{0}","title":"Use Technique","subGroup":"","descriptions":["Clicking this button will use the technique, automatically consuming any resources the technique uses. The technique will be sent to the DM and then targets may be selected."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Chat":{"name":"Title_Chat","fieldName":"chat","group":"Title","description":"","variable":"ttl-chat{0}","title":"Chat","subGroup":"","descriptions":["This is the chat post box system. Here you can write posts for your character to say and then send the messages to chat.","To use the post box, first select the type of message you would like to send. You have access to all the standard emote messages of Speak, Whisper, Yell, Think, and Describe.","You may then write what you wish to be included in your message in the large textarea below. Once your message is complete, you may press one of the emote buttons below to send your message. If you do not see any emote buttons, be sure to select an outfit first.","If you would rather use the standard keyword system as used in the chat, you may also begin your chat message with !m, !w, and the like. The system will detect your tag and then change the emote message type accordingly."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_LanguageSelect":{"name":"Title_LanguageSelect","fieldName":"languageselect","group":"Title","description":"","variable":"ttl-languageselect{0}","title":"Language Select","subGroup":"","descriptions":["Select your language from the options below. This will change how your message is displayed in chat and also show what language you are using."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Skills":{"name":"Title_Skills","fieldName":"skills","group":"Title","description":"","variable":"ttl-skills{0}","title":"Skills","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Emotes":{"name":"Title_Emotes","fieldName":"emotes","group":"Title","description":"","variable":"ttl-emotes{0}","title":"Emotes","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Outfits":{"name":"Title_Outfits","fieldName":"outfits","group":"Title","description":"","variable":"ttl-outfits{0}","title":"Outfits","subGroup":"","descriptions":["You can add in your character art from here to populate your character's emotes.","Press the Plus (+) button below to add a new instance of an outfit. From there you can populate the outfit data with emotes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_EquippedGear":{"name":"Title_EquippedGear","fieldName":"equippedgear","group":"Title","description":"","variable":"ttl-equippedgear{0}","title":"Equipped Gear","subGroup":"","descriptions":["This is the gear you currently have equipped. You can see what techniques they grant you on the Actions tab."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Loading":{"name":"Loading","fieldName":"loading","group":"Untyped","description":"","variable":"loading","title":"Loading","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_PopupActive":{"name":"Popup_PopupActive","fieldName":"popupactive","group":"Popup","description":"","variable":"popup-popupactive{0}","title":"PopupActive","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_SubMenuActive":{"name":"Popup_SubMenuActive","fieldName":"submenuactive","group":"Popup","description":"","variable":"popup-submenuactive{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_SubMenuActiveId":{"name":"Popup_SubMenuActiveId","fieldName":"submenuactiveid","group":"Popup","description":"","variable":"popup-submenuactiveid{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectPopupActive":{"name":"Popup_InspectPopupActive","fieldName":"inspectpopupactive","group":"Popup","description":"","variable":"popup-inspectpopupactive{0}","title":"InspectPopupActive","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectPopupName":{"name":"Popup_InspectPopupName","fieldName":"inspectpopupname","group":"Popup","description":"","variable":"popup-inspectpopupname{0}","title":"InspectPopupName","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_ItemInspectionName":{"name":"Popup_ItemInspectionName","fieldName":"iteminspectionname","group":"Popup","description":"","variable":"popup-iteminspectionname{0}","title":"Item Inspection","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_TechniqueInspectionName":{"name":"Popup_TechniqueInspectionName","fieldName":"techniqueinspectionname","group":"Popup","description":"","variable":"popup-techniqueinspectionname{0}","title":"Technique Inspection","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectSelectGroup":{"name":"Popup_InspectSelectGroup","fieldName":"inspectselectgroup","group":"Popup","description":"","variable":"popup-itemselectgroup{0}","title":"Items In Group","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectSelectType":{"name":"Popup_InspectSelectType","fieldName":"inspectselecttype","group":"Popup","description":"","variable":"popup-inspectselecttype{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectSelectId":{"name":"Popup_InspectSelectId","fieldName":"inspectselectid","group":"Popup","description":"","variable":"popup-inspectselectid{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechPopupValues":{"name":"TechPopupValues","fieldName":"techpopupvalues","group":"Untyped","description":"","variable":"repeating_techpopupvalues","title":"Style Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemPopupValues":{"name":"ItemPopupValues","fieldName":"itempopupvalues","group":"Untyped","description":"","variable":"repeating_itempopupvalues","title":"Group Items","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectShowAdd":{"name":"Popup_InspectShowAdd","fieldName":"inspectshowadd","group":"Popup","description":"","variable":"popup-inspectshowadd{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectAddType":{"name":"Popup_InspectAddType","fieldName":"inspectaddtype","group":"Popup","description":"","variable":"popup-inspectaddtype{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_InspectAddClick":{"name":"Popup_InspectAddClick","fieldName":"inspectaddclick","group":"Popup","description":"","variable":"popup-inspectaddclick{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_ItemSelectName":{"name":"Popup_ItemSelectName","fieldName":"itemselectname","group":"Popup","description":"","variable":"popup-itemselectname{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_ItemSelectType":{"name":"Popup_ItemSelectType","fieldName":"itemselecttype","group":"Popup","description":"","variable":"popup-itemselecttype{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_ItemSelectDesc":{"name":"Popup_ItemSelectDesc","fieldName":"itemselectdesc","group":"Popup","description":"","variable":"popup-itemselectdesc{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Popup_ItemSelectIsOn":{"name":"Popup_ItemSelectIsOn","fieldName":"itemselectison","group":"Popup","description":"","variable":"popup-itemselectison{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_Type":{"name":"Chat_Type","fieldName":"type","group":"Chat","description":"","variable":"chat-type{0}","title":"ChatType","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_Target":{"name":"Chat_Target","fieldName":"target","group":"Chat","description":"","variable":"chat-target{0}","title":"ChatTarget","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_Message":{"name":"Chat_Message","fieldName":"message","group":"Chat","description":"","variable":"chat-message{0}","title":"ChatMessage","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_Language":{"name":"Chat_Language","fieldName":"language","group":"Chat","description":"","variable":"chat-language{0}","title":"Language","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_LanguageTag":{"name":"Chat_LanguageTag","fieldName":"languagetag","group":"Chat","description":"","variable":"chat-languagetag{0}","title":"Language","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_PostContent":{"name":"Chat_PostContent","fieldName":"postcontent","group":"Chat","description":"","variable":"chat-postcontent{0}","title":"ChatContent","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingActiveEmotes":{"name":"RepeatingActiveEmotes","fieldName":"repeatingactiveemotes","group":"Untyped","description":"","variable":"repeating_activeemotes","title":"RepeatingActiveEmotes","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_SetId":{"name":"Chat_SetId","fieldName":"setid","group":"Chat","description":"","variable":"chat-emoteset_id{0}","title":"SetId","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_Emotes":{"name":"Chat_Emotes","fieldName":"emotes","group":"Chat","description":"","variable":"chat-emoteset{0}","title":"Emotes","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_DefaultEmote":{"name":"Chat_DefaultEmote","fieldName":"defaultemote","group":"Chat","description":"","variable":"chat-default_emote{0}","title":"DefaultEmote","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_PostName":{"name":"Chat_PostName","fieldName":"postname","group":"Chat","description":"","variable":"chat-post_name{0}","title":"PostName","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_PostURL":{"name":"Chat_PostURL","fieldName":"posturl","group":"Chat","description":"","variable":"chat-post_url{0}","title":"PostURL","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_OutfitName":{"name":"Chat_OutfitName","fieldName":"outfitname","group":"Chat","description":"","variable":"chat-outfit_name{0}","title":"Outfit Name","subGroup":"","descriptions":["This is the name of the outfit or emote set. Give it a name to differentiate it from other emote sets."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_OutfitEmotes":{"name":"Chat_OutfitEmotes","fieldName":"outfitemotes","group":"Chat","description":"","variable":"chat-outfit_emotes{0}","title":"Outfit Emotes","subGroup":"","descriptions":["This is a JSON file of the emote set. This is used to populate chat data. You can either replace the text here with data containing the emote set's data or you may fill in each emote individually below."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_EmoteName":{"name":"Chat_EmoteName","fieldName":"emotename","group":"Chat","description":"","variable":"chat-emote_name{0}","title":"Emote Name","subGroup":"","descriptions":["This is the name of an individual emote. This is what this emote will be referred to when selecting it from this character's available emotes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_EmoteURL":{"name":"Chat_EmoteURL","fieldName":"emoteurl","group":"Chat","description":"","variable":"chat-emote_url{0}","title":"Emote URL","subGroup":"","descriptions":["This is a URL that references the emote's image. This is the image that will be shown when this emote is used."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingOutfits":{"name":"RepeatingOutfits","fieldName":"repeatingoutfits","group":"Untyped","description":"","variable":"repeating_emotes","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_OutfitDefault":{"name":"Chat_OutfitDefault","fieldName":"outfitdefault","group":"Chat","description":"","variable":"chat-outfit_default_name{0}","title":"Default Emote Name","subGroup":"","descriptions":["This is the name of an individual emote. This is what this emote will be referred to when selecting it from this character's available emotes.","The default emote name is the emote that will be shown whenever the character appears in various UIs where the character is not speaking."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Chat_OutfitDefaultURL":{"name":"Chat_OutfitDefaultURL","fieldName":"outfitdefaulturl","group":"Chat","description":"","variable":"chat-outfit_default_url{0}","title":"Default Emote URL","subGroup":"","descriptions":["This is a URL that references the emote's image. This is the image that will be shown when this emote is used.","The default emote url is the emote that will be shown whenever the character appears in various UIs where the character is not speaking."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_SeeTechniques":{"name":"Forme_SeeTechniques","fieldName":"seetechniques","group":"Forme","description":"","variable":"forme-seetechniques{0}","title":"See Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingJobStyles":{"name":"RepeatingJobStyles","fieldName":"repeatingjobstyles","group":"Untyped","description":"","variable":"repeating_jobstyles","title":"Jobs","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingStyles":{"name":"RepeatingStyles","fieldName":"repeatingstyles","group":"Untyped","description":"","variable":"repeating_styles","title":"Styles","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_Name":{"name":"Forme_Name","fieldName":"name","group":"Forme","description":"","variable":"forme-name{0}","title":"Name","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_Tier":{"name":"Forme_Tier","fieldName":"tier","group":"Forme","description":"","variable":"forme-tier{0}","title":"Tier","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_IsAdvanced":{"name":"Forme_IsAdvanced","fieldName":"isadvanced","group":"Forme","description":"","variable":"forme-isadvanced{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_Actions":{"name":"Forme_Actions","fieldName":"actions","group":"Forme","description":"","variable":"forme-actions{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_IsEquipped":{"name":"Forme_IsEquipped","fieldName":"isequipped","group":"Forme","description":"","variable":"forme-isequipped{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_Equip":{"name":"Forme_Equip","fieldName":"equip","group":"Forme","description":"","variable":"forme-equip{0}","title":"Equip","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_EquipAdvanced":{"name":"Forme_EquipAdvanced","fieldName":"equipadvanced","group":"Forme","description":"","variable":"forme-equipadvanced{0}","title":"Equip Adv. Style","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_Unequip":{"name":"Forme_Unequip","fieldName":"unequip","group":"Forme","description":"","variable":"forme-unequip{0}","title":"Unequip","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_JobSlot":{"name":"Forme_JobSlot","fieldName":"jobslot","group":"Forme","description":"","variable":"forme-jobslot{0}","title":"Job Slot","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_AdvancedSlot":{"name":"Forme_AdvancedSlot","fieldName":"advancedslot","group":"Forme","description":"","variable":"forme-advancedslot{0}","title":"Advanced or Normal Style Slot","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Forme_StyleSlot":{"name":"Forme_StyleSlot","fieldName":"styleslot","group":"Forme","description":"","variable":"forme-styleslot{0}","title":"Style Slot","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Action_Use":{"name":"Action_Use","fieldName":"use","group":"Action","description":"","variable":"act-use{0}","title":"Use","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Action_Inspect":{"name":"Action_Inspect","fieldName":"inspect","group":"Action","description":"","variable":"act-inspect{0}","title":"Inspect","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Action_Actions":{"name":"Action_Actions","fieldName":"actions","group":"Action","description":"","variable":"act-actions{0}","title":"Actions","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Action_SetData":{"name":"Action_SetData","fieldName":"setdata","group":"Action","description":"","variable":"act-setdata{0}","title":"SetData","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Action_Techniques":{"name":"Action_Techniques","fieldName":"techniques","group":"Action","description":"","variable":"act-techniques{0}","title":"Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingJobTech":{"name":"RepeatingJobTech","fieldName":"repeatingjobtech","group":"Untyped","description":"","variable":"repeating_jobtech{0}","title":"Job Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingAdvTech":{"name":"RepeatingAdvTech","fieldName":"repeatingadvtech","group":"Untyped","description":"","variable":"repeating_advtech{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingGearTech":{"name":"RepeatingGearTech","fieldName":"repeatinggeartech","group":"Untyped","description":"","variable":"repeating_geartech{0}","title":"Gear Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingBasicActions":{"name":"RepeatingBasicActions","fieldName":"repeatingbasicactions","group":"Untyped","description":"","variable":"repeating_basicaction","title":"Basic Action Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingBasicRecovery":{"name":"RepeatingBasicRecovery","fieldName":"repeatingbasicrecovery","group":"Untyped","description":"","variable":"repeating_basicrecovery","title":"Basic Recovery Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingBasicAttack":{"name":"RepeatingBasicAttack","fieldName":"repeatingbasicattack","group":"Untyped","description":"","variable":"repeating_basicattack","title":"Basic Attack Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingBasicSocial":{"name":"RepeatingBasicSocial","fieldName":"repeatingbasicsocial","group":"Untyped","description":"","variable":"repeating_basicsocial","title":"Basic Social Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingBasicSpirit":{"name":"RepeatingBasicSpirit","fieldName":"repeatingbasicspirit","group":"Untyped","description":"","variable":"repeating_basicspirit","title":"Basic Spirit Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingCustomTech":{"name":"RepeatingCustomTech","fieldName":"repeatingcustomtech","group":"Untyped","description":"","variable":"repeating_customtech","title":"Custom Techniques","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechActionType":{"name":"TechActionType","fieldName":"techactiontype","group":"Untyped","description":"","variable":"techactiontype{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechName":{"name":"TechName","fieldName":"techname","group":"Untyped","description":"","variable":"techname{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechDisplayName":{"name":"TechDisplayName","fieldName":"techdisplayname","group":"Untyped","description":"","variable":"techdisplayname{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechResourceData":{"name":"TechResourceData","fieldName":"techresourcedata","group":"Untyped","description":"","variable":"techresourcedata{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechTargetingData":{"name":"TechTargetingData","fieldName":"techtargetingdata","group":"Untyped","description":"","variable":"techtargetingdata{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechTrait":{"name":"TechTrait","fieldName":"techtrait","group":"Untyped","description":"","variable":"techtrait{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechTrigger":{"name":"TechTrigger","fieldName":"techtrigger","group":"Untyped","description":"","variable":"techtrigger{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechRequirements":{"name":"TechRequirements","fieldName":"techrequirements","group":"Untyped","description":"","variable":"techrequirements{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechItemReq":{"name":"TechItemReq","fieldName":"techitemreq","group":"Untyped","description":"","variable":"techitemreq{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechFlavorText":{"name":"TechFlavorText","fieldName":"techflavortext","group":"Untyped","description":"","variable":"techflavortext{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechEffect":{"name":"TechEffect","fieldName":"techeffect","group":"Untyped","description":"","variable":"techeffect{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "TechDef":{"name":"TechDef","fieldName":"techdef","group":"Untyped","description":"","variable":"techdef{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemName":{"name":"ItemName","fieldName":"itemname","group":"Untyped","description":"","variable":"itemname{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemAction":{"name":"ItemAction","fieldName":"itemaction","group":"Untyped","description":"","variable":"itemaction{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemCount":{"name":"ItemCount","fieldName":"itemcount","group":"Untyped","description":"","variable":"itemcount{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemGroup":{"name":"ItemGroup","fieldName":"itemgroup","group":"Untyped","description":"","variable":"itemgroup{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemStats":{"name":"ItemStats","fieldName":"itemstats","group":"Untyped","description":"","variable":"itemstats{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemTrait":{"name":"ItemTrait","fieldName":"itemtrait","group":"Untyped","description":"","variable":"itemtrait{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemDescription":{"name":"ItemDescription","fieldName":"itemdescription","group":"Untyped","description":"","variable":"itemdescription{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemCraftSkill":{"name":"ItemCraftSkill","fieldName":"itemcraftskill","group":"Untyped","description":"","variable":"itemcraftskill{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemCraftMats":{"name":"ItemCraftMats","fieldName":"itemcraftmats","group":"Untyped","description":"","variable":"itemcraftmats{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ItemCraft":{"name":"ItemCraft","fieldName":"itemcraft","group":"Untyped","description":"","variable":"itemcraft{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_Equip":{"name":"Gear_Equip","fieldName":"equip","group":"Gear","description":"","variable":"gear-equip{0}","title":"Equip","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipHead":{"name":"Gear_EquipHead","fieldName":"equiphead","group":"Gear","description":"","variable":"gear-equiphead{0}","title":"Equip (Head)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipFace":{"name":"Gear_EquipFace","fieldName":"equipface","group":"Gear","description":"","variable":"gear-equipface{0}","title":"Equip (Face)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipChest":{"name":"Gear_EquipChest","fieldName":"equipchest","group":"Gear","description":"","variable":"gear-equipchest{0}","title":"Equip (Chest)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipArm":{"name":"Gear_EquipArm","fieldName":"equiparm","group":"Gear","description":"","variable":"gear-equiparm{0}","title":"Equip (Arm)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipLeg":{"name":"Gear_EquipLeg","fieldName":"equipleg","group":"Gear","description":"","variable":"gear-equipleg{0}","title":"Equip (Leg)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipFoot":{"name":"Gear_EquipFoot","fieldName":"equipfoot","group":"Gear","description":"","variable":"gear-equipfoot{0}","title":"Equip (Foot)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_Unequip":{"name":"Gear_Unequip","fieldName":"unequip","group":"Gear","description":"","variable":"gear-unequip{0}","title":"Unequip","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_Purchase":{"name":"Gear_Purchase","fieldName":"purchase","group":"Gear","description":"","variable":"gear-purchase{0}","title":"Purchase","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_Delete":{"name":"Gear_Delete","fieldName":"delete","group":"Gear","description":"","variable":"gear-delete{0}","title":"Delete Entry","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_Inspect":{"name":"Gear_Inspect","fieldName":"inspect","group":"Gear","description":"","variable":"gear-inspect{0}","title":"Inspect","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipmentSlot":{"name":"Gear_EquipmentSlot","fieldName":"equipmentslot","group":"Gear","description":"","variable":"gear-equipmentslot{0}","title":"Equipment Slot","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingEquipment":{"name":"RepeatingEquipment","fieldName":"repeatingequipment","group":"Untyped","description":"","variable":"repeating_equipment","title":"Owned Equipment","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingConsumables":{"name":"RepeatingConsumables","fieldName":"repeatingconsumables","group":"Untyped","description":"","variable":"repeating_consumables","title":"Consumables","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "RepeatingGoods":{"name":"RepeatingGoods","fieldName":"repeatinggoods","group":"Untyped","description":"","variable":"repeating_goods","title":"Goods","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemName":{"name":"Gear_ItemName","fieldName":"itemname","group":"Gear","description":"","variable":"gear-itemname{0}","title":"Name","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemActions":{"name":"Gear_ItemActions","fieldName":"itemactions","group":"Gear","description":"","variable":"gear-itemactions{0}","title":"Actions","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemType":{"name":"Gear_ItemType","fieldName":"itemtype","group":"Gear","description":"","variable":"gear-itemtype{0}","title":"Type","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_EquipWeapon":{"name":"Gear_EquipWeapon","fieldName":"equipweapon","group":"Gear","description":"","variable":"gear-equipweapon{0}","title":"Equip (Weapon)","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemIsEquipped":{"name":"Gear_ItemIsEquipped","fieldName":"itemisequipped","group":"Gear","description":"","variable":"gear-itemisequipped{0}","title":"Equip","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemEquipMenu":{"name":"Gear_ItemEquipMenu","fieldName":"itemequipmenu","group":"Gear","description":"","variable":"gear-itemequipmenu{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemGroup":{"name":"Gear_ItemGroup","fieldName":"itemgroup","group":"Gear","description":"","variable":"gear-itemgroup{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemStats":{"name":"Gear_ItemStats","fieldName":"itemstats","group":"Gear","description":"","variable":"gear-itemstats{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemTrait":{"name":"Gear_ItemTrait","fieldName":"itemtrait","group":"Gear","description":"","variable":"gear-itemtrait{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_ItemDescription":{"name":"Gear_ItemDescription","fieldName":"itemdescription","group":"Gear","description":"","variable":"gear-itemdescription{0}","title":"","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Gear_WeaponSlot":{"name":"Gear_WeaponSlot","fieldName":"weaponslot","group":"Gear","description":"","variable":"gear-weaponslot{0}","title":"Weapon Slot","subGroup":"","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "WeaponDamage":{"name":"WeaponDamage","fieldName":"weapondamage","group":"Untyped","description":"","variable":"weapondamage","title":"Weapon Damage","subGroup":"Damage","descriptions":["A type of damage your wielded weapon deals."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "WeaponDamageVal":{"name":"WeaponDamageVal","fieldName":"weapondamageval","group":"Untyped","description":"","variable":"weapondamageval","title":"","subGroup":"Damage","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "System_Crafting":{"name":"System_Crafting","fieldName":"crafting","group":"System","description":"","variable":"sys-crafting{0}","title":"Crafting","subGroup":"","descriptions":["Crafting allows one to create items and objects, as long as the crafter has the resources and skills available to them. ","Usually when crafting the first step is to determine the blueprint or recipe. A blueprint will create an object or structure, while a recipe will most often create a consumable.","When crafting, first verify that you are trained in the appropriate skill. No training in the skill will result in an automatic failure. ","Next, make a skill check using the skill of the item against the DC value. If the value is 0, no check is required. If the check succeeds, crafting proceeds successfully. On failure only time is wasted.","You must perform a new crafting check every time a time interval passes. Once all time intervals pass, the craft completes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "System_CraftingComponent":{"name":"System_CraftingComponent","fieldName":"craftingcomponent","group":"System","description":"","variable":"sys-craftingcomponent{0}","title":"Crafting Components","subGroup":"","descriptions":["Most items will list the rules to how they are crafted in their blueprint or recipe listing in the form of their crafting components."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CraftBulk":{"name":"CraftBulk","fieldName":"craftbulk","group":"CraftingComp","description":"","variable":"","title":"Bulk","subGroup":"","descriptions":["For the purposes of crafting, bulk determines how many units of materials are needed to craft the item. ","The materials used for crafting the bulk of the item are up to the crafter. When picking materials work with your GM and your best judgment to determine what materials are appropriate. A mirror with a frame made of rock might be reasonable, a frame made of cloth might not be.","The materials you use to craft are consumed to create the item. When the material is carried in dust form, magic must be used to recreate the dust into a usable form."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CraftResources":{"name":"CraftResources","fieldName":"craftresources","group":"CraftingComp","description":"","variable":"","title":"Resources","subGroup":"","descriptions":["These are some items necessary to craft the blueprint or recipe. If this is a blueprint, these materials are not accounted for in the bulk listing."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CraftSkill":{"name":"CraftSkill","fieldName":"craftskill","group":"CraftingComp","description":"","variable":"","title":"Skill","subGroup":"","descriptions":["The base skill used to craft the item. This skill will usually be build for blueprints - however you can usually substitute with the shape skill when working with magic. Cook or alchemy is always used for recipes. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CraftDC":{"name":"CraftDC","fieldName":"craftdc","group":"CraftingComp","description":"","variable":"","title":"Craft DC","subGroup":"","descriptions":["This value is always a number. It represents the skill check DC the crafter must beat to make progress in their craft."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "CraftTime":{"name":"CraftTime","fieldName":"crafttime","group":"CraftingComp","description":"","variable":"","title":"Craft Time","subGroup":"","descriptions":["The time interval to create the item.","For blueprints, the craft time is measured in days. When using magic to craft, it is instead measured in rounds.","For recipes, the craft time is measured in hours."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "System_Cooking":{"name":"System_Cooking","fieldName":"cooking","group":"System","description":"","variable":"sys-cooking{0}","title":"Cooking","subGroup":"","descriptions":["Cooking allows the creation of food for nutrition and if done well enough, to improve morale. The rules of cooking are very similar to crafting. You will begin by choosing ingredients and then consume them all in the process of cooking by making a Cook skill check. ","When starting to cook, you may choose to follow a recipe or go freestyle. A recipe will determine what ingredients you require, the dc of your skill check, and how many skill checks you will need to make. ","Choosing to go freestyle only requires that you add at least one edible goods item. However, to cook a high quality meal you need to add at least one edible goods from at least four different groups of items. ","Once all goods are prepared, make a Cook skill check. You always pass and create edible food on a roll of 6 or higher. Listed DCs for recipes are always for high quality variants of a meal. The DC for a freestyle meal is 14.","A high quality meal always requires that the cook has access to Kitchen's Tools. Some locations to prepare a meal can make a DC easier to pass or be required for a recipe.","When cooking, you may cook multiple meals at once. When doing this you multiply the number of ingredients spent by the number of meals you are making. However you still roll just one roll. You can make a maximum of 10 meals in this way per roll.","Usually eating happens shortly after a meal has been cooked. Cooking and eating a Freestyle meal always takes the length of a Short Rest. Meals prepared from a recipe sometimes requires a longer period of time before the meal is ready for consumption.","A character can only consume one meal every 4-6 hours."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "System_HighQualityMeals":{"name":"System_HighQualityMeals","fieldName":"highqualitymeals","group":"System","description":"","variable":"sys-highqualitymeals{0}","title":"High Quality Meals","subGroup":"","descriptions":["A high quality meal is made and served at ideal temperatures, is well prepared, and nutritious. These meals always need to be consumed as soon as they are finished being prepared, otherwise they lose the high quality trait.","A character that consumes a high quality meal always gains their Savor Boon. Some recipes and preparations from certain character abilities may add additional benefits to consuming a high quality meal."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[]
                ,
                "isResource":""},
            "Title_ResourceCost":{"name":"Title_ResourceCost","fieldName":"resourcecost","group":"Title","description":"","variable":"ttl-resourcecost{0}","title":"Resource Cost","subGroup":"Technique","descriptions":["Some techniques require that resources are spent before the technique can be used. You must pay these resources else the technique fails. Generally, resource costs fall into four categories: EN, WILL, Chakra, or Boon. ","EN is the most straightforward and common resource. EN is gained while in conflict and is spent as per a technique states.","WILL represents a willpower cost of the technique, most commonly associated when using magic. Whenever WILL is reduced to zero, a Will Break is caused. ","Whenever you cause a Will Break through a technique's WILL resource cost, you take tension damage equal to 5 + [5 x Character Rank] and your Chakra is reduced by 1. If Chakra is ever reduced to 0, you can no longer use and techniques that have a WILL resource cost.","Chakra is a rare resource for powerful techniques. It usually causes all the effects of a resource cost Will Break. ","Boon is a rare resource cost for particularly potent techniques. When consuming a Boon, remove a check from an active boon."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Targetting":{"name":"Title_Targetting","fieldName":"targetting","group":"Title","description":"","variable":"ttl-targetting{0}","title":"Targetting","subGroup":"Technique","descriptions":["To attack a creature or object, the target must be within range and within the attacker's line of sight. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Range":{"name":"Title_Range","fieldName":"range","group":"Title","description":"","variable":"ttl-range{0}","title":"Range","subGroup":"Technique","descriptions":["Range is measured from any edge of the attacking character, unless specified otherwise. Targets must be inside range values to be valid targets."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Patterns":{"name":"Title_Patterns","fieldName":"patterns","group":"Title","description":"","variable":"ttl-patterns{0}","title":"Patterns","subGroup":"Technique","descriptions":["Some techniques have special attack patterns as their target: Line, Cone, Blast, and Burst. These techniques affect all targets within a defined area. A separate skill roll is made for each target.","Some patterns will also include a Height indicator show in parentheses with a number, such as 2H or 4H. These indicate how many spaces tall the pattern affects.","Some patterns will also list a Range. In these cases, the technique's origin point can be drawn from a point within the range specified and line of sight. For example, an attack with Blast 2 and Range10 would affect a Blast 2 area centered on any point within Range 10."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Line":{"name":"Line","fieldName":"line","group":"PatternType","description":"","variable":"","title":"Line X","subGroup":"","descriptions":["Affects characters in a straight line, X spaces long."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Cone":{"name":"Cone","fieldName":"cone","group":"PatternType","description":"","variable":"","title":"Cone X","subGroup":"","descriptions":["Affects characters within a cone, X spaces long and X spaces wide at its furthest point. The cone begins at one space wide and increases the width by 1 as distance increases."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Blast":{"name":"Blast","fieldName":"blast","group":"PatternType","description":"","variable":"","title":"Blast X","subGroup":"","descriptions":["Affects characters within a radius of X spaces, drawn from a point within range and line of sight. Cover and line of sight for the technique are calculated based on the center of the blast, rather than the position of the user."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Burst":{"name":"Burst","fieldName":"burst","group":"PatternType","description":"","variable":"","title":"Burst X","subGroup":"","descriptions":["Affects characters within a radius of X spaces, centered on but not including the space the point is drawn from. Cover and line of sight for the technique are calculated based on the center of the burst, rather than the position of the user."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Zone":{"name":"Zone","fieldName":"zone","group":"PatternType","description":"","variable":"","title":"Zone","subGroup":"","descriptions":["This effects the whole area where the scene currently exists. This maximizes out to 10 squares in each direction, but the zone may be bigger or smaller, depending on the GM."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_ValidTargets":{"name":"Title_ValidTargets","fieldName":"validtargets","group":"Title","description":"","variable":"ttl-validtargets{0}","title":"Valid Targets","subGroup":"","descriptions":["The following are valid targets for attacks and effects:","• other characters;\n• objects that aren’t held or worn;\n• spaces in the environment or on the ground.","To attack or take an action against a target, by default the target must be within range and within the attacker’s line of sight. Unless otherwise specified, characters can’t target themselves."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_LineOfSight":{"name":"Title_LineOfSight","fieldName":"lineofsight","group":"Title","description":"","variable":"ttl-lineofsight{0}","title":"Line of Sight","subGroup":"","descriptions":["Characters can only target targets that they can see, at least partially. If it’s not possible to trace a line to some part of a target – perhaps because it’s completely blocked by cover or terrain – then they can’t be targetted.","Line of sight doesn’t imply visibility alone, but also a clear path for your attack – line of effect. Even if you can somehow see an area that’s behind a solid wall, you can’t attack targets within."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_Cover":{"name":"Title_Cover","fieldName":"cover","group":"Title","description":"","variable":"ttl-cover{0}","title":"Cover","subGroup":"","descriptions":["On the battlefield, all sorts of obstructions can separate an attacker from their target. The two that matter most are soft cover and hard cover.","Soft cover includes smoke, foliage, trees, blinding light, dust clouds, low hills, and low walls. As the name implies, soft cover isn’t solid enough to reliably block enemy fire, but it does cause visual interference or profile reduction sufficient to make aiming difficult. Any time a target is obscured or obstructed somehow, it has soft cover, adding 1 disadvantage to any ranged attacks.","Hard cover includes ruined buildings, tall walls, reinforced emplacements, and destroyed vehicles. Hard cover is solid enough to block shots and hide behind, and adds 2 disadvantage to any ranged attacks. Characters only benefit from hard cover if they are adjacent to whatever they’re using for cover and are the same Size or smaller. A Size 2 character couldn’t get hard cover while hiding behind a Size 1 rock, for example. If a character is obscured by hard cover but isn’t adjacent, they don’t get hard cover; however, they might still get soft cover.","Characters can only benefit from one type of cover at a time – their benefits don’t stack.","Unless specified, characters never grant cover to objects or other characters. ","To determine if a character has soft cover, simply draw a line from the center of one character to the center of another. If a line can be drawn mostly unbroken, it’s a clear shot and neither character has soft cover. If the line is significantly obstructed or is broken up by smoke, trees, or fences the target has soft cover. Targets also have soft cover if they are obstructed by objects that would give hard cover, but which they aren’t adjacent to.","If a character is adjacent to hard cover, they benefit from that cover against all characters – except for characters that flank them. When using a grid map, targets are flanked if it is possible to draw a line that is totally clear of hard cover between one of the spaces occupied by the attacker and one occupied by the target.","If a character in hard cover could shoot over, through, or around the source of their cover, the cover does not block their line of sight or obscure their attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechEffect":{"name":"Title_TechEffect","fieldName":"techeffect","group":"Title","description":"","variable":"ttl-techeffect{0}","title":"Effects","subGroup":"","descriptions":["This contains the effects that will occur when this technique is used. There is no skill check necessary. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechDC":{"name":"Title_TechDC","fieldName":"techdc","group":"Title","description":"","variable":"ttl-techdc{0}","title":"DC ","subGroup":"","descriptions":["Your skill check must meet or exceed this value for the following effects to occur. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechEvasion":{"name":"Title_TechEvasion","fieldName":"techevasion","group":"Title","description":"","variable":"ttl-techevasion{0}","title":"vs. Evasion","subGroup":"","descriptions":["Your skill check must meet or exceed the target's Evasion value. Unlike most defense checks, this check must be made for any additional effect below this effect to occur. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechDefense":{"name":"Title_TechDefense","fieldName":"techdefense","group":"Title","description":"","variable":"ttl-techdefense{0}","title":"vs. ","subGroup":"","descriptions":["Your skill check must meet or exceed the target's listed defense or sense value in order for the below effects to occur."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechOnRound":{"name":"Title_TechOnRound","fieldName":"techonround","group":"Title","description":"","variable":"ttl-techonround{0}","title":"On Round Start","subGroup":"","descriptions":["The effects below this entry occur at the start of the next round during the Pre-round phase."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechOnTurn":{"name":"Title_TechOnTurn","fieldName":"techonturn","group":"Title","description":"","variable":"ttl-techonturn{0}","title":"On End Turn","subGroup":"","descriptions":["The effects below this entry occur at the end of the user's turn. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechOnEnter":{"name":"Title_TechOnEnter","fieldName":"techonenter","group":"Title","description":"","variable":"ttl-techonenter{0}","title":"On Enter","subGroup":"","descriptions":["As long as this effect persists, the effects below this entry all occur to any character that starts their turn in or enters the affected spaces. The effect can only trigger on a character once per round. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechOnEndFocus":{"name":"Title_TechOnEndFocus","fieldName":"techonendfocus","group":"Title","description":"","variable":"ttl-techonendfocus{0}","title":"On End Focus","subGroup":"","descriptions":["Once focus is ended, the following effects occur."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Title_TechNewTargets":{"name":"Title_TechNewTargets","fieldName":"technewtargets","group":"Title","description":"","variable":"ttl-technewtargets{0}","title":"New Targets","subGroup":"","descriptions":["This technique affects new targets beyond the technique's header. Read the below section for details on what everything below this line are targetting."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Move":{"name":"Move","fieldName":"move","group":"Untyped","description":"","variable":"","title":"Move","subGroup":"Movement","descriptions":["When a character moves, that character can move into any adjacent space, as long as the space isn’t occupied by an obstruction and is one that they would be able to move in. For example, characters can't move straight up unless they can fly.","Each space you move consumes 1 space of your movement on conpletion of the move. When moving diagonally, you must consume 1 additional space of movement upon entering the space. You are unable to move any more spaces once you are at 0 movement.","Sometimes a character will be required to swim to enter a large body of liquid or climb when moving across a terrain vertically. These are special forms of movement done as part of any Move action.","When swimming or climbing you must consume 1 additional space of movement upon entering the space. A successful DC 10 Physique skill check may be required before entering a space if it is especially difficult to swim or climb."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Adjacency":{"name":"Adjacency","fieldName":"adjacency","group":"Untyped","description":"","variable":"","title":"Adjacency","subGroup":"Movement","descriptions":["Characters are considered adjacent to another character or object when they are within one space of it vertically, horizontally, or diagonally."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Obstruction":{"name":"Obstruction","fieldName":"obstruction","group":"Untyped","description":"","variable":"","title":"Obstruction","subGroup":"Movement","descriptions":["An obstruction is anything that blocks passage, preventing movement into its space entirely. Obstructions are typically environmental but other characters can also be obstructions. Characters are obstructed by any solid objects or characters that are the same Size as them or larger.","Characters can freely pass through spaces occupied by obstructions smaller than them, including other characters; however, they can’t end a movement in a space that is occupied by another character or object unless specified. This means that a Size 2 character, for example, could move through the space of a Size 1 character or object, but could not finish its move in the same space.","Allied characters never cause obstruction, but characters still can’t end moves in their space."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "StrideRoll":{"name":"StrideRoll","fieldName":"strideroll","group":"Untyped","description":"","variable":"strideroll","title":"Stride Roll","subGroup":"Movement","descriptions":["A Stride Roll is a check for movement. When you perform a Stride Roll, roll a die value equal to your Move Potency. You gain Move Charge equal to the result. If you roll below your Base Move you instead gain Move Charge equal to your Base Move."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "MaxStride":{"name":"MaxStride","fieldName":"maxstride","group":"Untyped","description":"","variable":"maxstride","title":"Max Stride","subGroup":"Movement","descriptions":["A Max Stride gives you Move Charge equal to your Move Potency."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "FreeMove":{"name":"FreeMove","fieldName":"freemove","group":"Untyped","description":"","variable":"freemove","title":"Free Move","subGroup":"Movement","descriptions":["This is a normal move action however it does not force you to become Engaged until you finish moving. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Pulled":{"name":"Pulled","fieldName":"pulled","group":"Untyped","description":"","variable":"pulled","title":"Pulled","subGroup":"Movement","descriptions":["When you are pulled you always have a source. You will move in a straight line towards the source until you have moved all of the spaces of movement or are stopped by an obstruction. This movement does not trigger the Engaged status until you finish moving. ","If a pulled character is stopped by an obstruction they are injured by the impact. The character takes 1d6+1 force damage for each additional space they would have moved."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Pushed":{"name":"Pushed","fieldName":"pushed","group":"Untyped","description":"","variable":"pushed","title":"Pushed","subGroup":"Movement","descriptions":["When you are pushed you always have a source. You will move in a straight line away from the source until you have moved all of the spaces of movement or are stopped by an obstruction. This movement does not trigger the Engaged status until you finish moving. ","If a pushed character is stopped by an obstruction they are injured by the impact. The character takes 1d6+1 force damage for each additional space they would have moved."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "ForceMove":{"name":"ForceMove","fieldName":"forcemove","group":"Untyped","description":"","variable":"forcemove","title":"Force Moved","subGroup":"Movement","descriptions":["When you are force moved your movement is controlled by another source. You will move as the source dictates until you have moved all of the spaces of movement. This movement does not trigger the Engaged status until you finish moving. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Jump":{"name":"Jump","fieldName":"jump","group":"Untyped","description":"","variable":"jump","title":"Jump","subGroup":"Movement","descriptions":["To perform a jump you must start from solid ground. ","When a character jumps they are moving in the air. They are not subjected to terrain effects, however are still subject to on enter effects in any spaces they share. ","After finishing a jump the character will naturally fall. The technique user can choose to have the character immediately fall or fall at the end of the turn."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Fly":{"name":"Fly","fieldName":"fly","group":"Untyped","description":"","variable":"fly","title":"Fly","subGroup":"Movement","descriptions":["When a character flies they are moving in the air. They are not subjected to terrain effects, however are still subject to on enter effects in any spaces they share. ","After finishing flight the character will naturally fall. The technique user can choose to have the character immediately fall or fall at the end of the turn."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Lifting":{"name":"Lifting","fieldName":"lifting","group":"Untyped","description":"","variable":"lifting","title":"Lifting and Dragging","subGroup":"Movement","descriptions":["Characters can drag characters or objects up to one Size larger than themselves but are Encumbered while doing so. They can also lift characters or objects of equal or lesser Size overhead but are Immobilized while doing so. While dragging or lifting, characters can’t take reactions."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Falling":{"name":"Falling","fieldName":"falling","group":"Untyped","description":"","variable":"falling","title":"Falling","subGroup":"Movement","descriptions":["Characters fall when they are in the open air and do not have a way to remain there such as by flying or floating. In standard circumstances, characters fall 10 spaces per round.","Unless specified otherwise, characters fall when a character that caused the movement decides it is appropriate or at the end of the active character's turn, whichever happens first. For example, a character that jumps may choose to stay in the air until they finish an attack before landing. Alternatively, a character that pushes another over a ledge gets to choose whether the character falls immediately or lingers in the air so that they may be attacked further before falling.","This movement does not trigger the Engaged status until you finish moving. ","Characters take damage when they fall three or more spaces and cannot recover before hitting the ground. A character that lands on the ground after a fall take 1d6+1 force damage for every two spaces fallen, to a maximum of 10d6+10."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Teleport":{"name":"Teleport","fieldName":"teleport","group":"Untyped","description":"","variable":"","title":"","subGroup":"","descriptions":["When a character teleports they immediately move to their destination space without impedement."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Bulk":{"name":"Bulk","fieldName":"bulk","group":"Rules","description":"","variable":"","title":"Bulk","subGroup":"Gear","descriptions":["Bulk is a concept to represent both an object's weight and size to determine encumbrance. It helps easily define how much effort it takes to carry this object. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":""},
            "Style_Basic Action":{"name":"Style_Basic Action","fieldName":"style_basic_action","group":"Style","description":"","variable":"sty-basic_action{0}","title":"Basic Action","subGroup":"Basic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Basic Recovery":{"name":"Style_Basic Recovery","fieldName":"style_basic_recovery","group":"Style","description":"","variable":"sty-basic_recovery{0}","title":"Basic Recovery","subGroup":"Basic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Basic Attack":{"name":"Style_Basic Attack","fieldName":"style_basic_attack","group":"Style","description":"","variable":"sty-basic_attack{0}","title":"Basic Attack","subGroup":"Basic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Basic Social":{"name":"Style_Basic Social","fieldName":"style_basic_social","group":"Style","description":"","variable":"sty-basic_social{0}","title":"Basic Social","subGroup":"Basic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Basic Spirit":{"name":"Style_Basic Spirit","fieldName":"style_basic_spirit","group":"Style","description":"","variable":"sty-basic_spirit{0}","title":"Basic Spirit","subGroup":"Basic","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Hammering Arte":{"name":"Style_Hammering Arte","fieldName":"style_hammering_arte","group":"Style","description":"","variable":"sty-hammering_arte{0}","title":"Hammering Arte","subGroup":"Mighty Weapons","descriptions":["A Might-focused style that deals large focused damage that can pierce armor."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Cleaving Arte":{"name":"Style_Cleaving Arte","fieldName":"style_cleaving_arte","group":"Style","description":"","variable":"sty-cleaving_arte{0}","title":"Cleaving Arte","subGroup":"Mighty Weapons","descriptions":["A Might-focused style that deals large damage to multiple close targets."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Battering Arte":{"name":"Style_Battering Arte","fieldName":"style_battering_arte","group":"Style","description":"","variable":"sty-battering_arte{0}","title":"Battering Arte","subGroup":"Mighty Weapons","descriptions":["A Might-focused style that knocks foes up and away."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Berserker Arte":{"name":"Style_Berserker Arte","fieldName":"style_berserker_arte","group":"Style","description":"","variable":"sty-berserker_arte{0}","title":"Berserker Arte","subGroup":"Mighty Weapons","descriptions":["A Might-focused style that deals extra damage at the risk of reducing their own defenses."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Mauler Arte":{"name":"Style_Mauler Arte","fieldName":"style_mauler_arte","group":"Style","description":"","variable":"sty-mauler_arte{0}","title":"Mauler Arte","subGroup":"Mighty Weapons","descriptions":["A Might-focused style that crushes through defenses to control the positioning of their foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"Hammering Arte","requirements":"You must have Hammering Arte affinity","tier":null},
            "Style_Avenger Arte":{"name":"Style_Avenger Arte","fieldName":"style_avenger_arte","group":"Style","description":"","variable":"sty-avenger_arte{0}","title":"Avenger Arte","subGroup":"Mighty Weapons","descriptions":["A Might-focused style that persues foes with a singular drive to eliminate them."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"Berserker Arte","requirements":"You must have Berserker Arte affinity","tier":null},
            "Style_Chargestrike Arte":{"name":"Style_Chargestrike Arte","fieldName":"style_chargestrike_arte","group":"Style","description":"","variable":"sty-chargestrike_arte{0}","title":"Chargestrike Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that charges ki into a weapon to release it in one large blow."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Overwhelming Arte":{"name":"Style_Overwhelming Arte","fieldName":"style_overwhelming_arte","group":"Style","description":"","variable":"sty-overwhelming_arte{0}","title":"Overwhelming Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that can attack both Brace and Reflex defenses to overwhelm their foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Arcanestrike Arte":{"name":"Style_Arcanestrike Arte","fieldName":"style_arcanestrike_arte","group":"Style","description":"","variable":"sty-arcanestrike_arte{0}","title":"Arcanestrike Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that surges energy into their attacks before striking."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Duelist Arte":{"name":"Style_Duelist Arte","fieldName":"style_duelist_arte","group":"Style","description":"","variable":"sty-duelist_arte{0}","title":"Duelist Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that leaps into battle to exploit the hindered condition for greater damage."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Swashbuckling Arte":{"name":"Style_Swashbuckling Arte","fieldName":"style_swashbuckling_arte","group":"Style","description":"","variable":"sty-swashbuckling_arte{0}","title":"Swashbuckling Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that hinders their foes and uses clever footwork to disengage."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Phalanx Arte":{"name":"Style_Phalanx Arte","fieldName":"style_phalanx_arte","group":"Style","description":"","variable":"sty-phalanx_arte{0}","title":"Phalanx Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that employs long reaching attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Jumpspear Arte":{"name":"Style_Jumpspear Arte","fieldName":"style_jumpspear_arte","group":"Style","description":"","variable":"sty-jumpspear_arte{0}","title":"Jumpspear Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that grants great movement capabilities to strike from above."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Spellblade Arte":{"name":"Style_Spellblade Arte","fieldName":"style_spellblade_arte","group":"Style","description":"","variable":"sty-spellblade_arte{0}","title":"Spellblade Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish and Enchant-focused style that allows enchanting one's own attacks with magic before striking."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Fencer Arte":{"name":"Style_Fencer Arte","fieldName":"style_fencer_arte","group":"Style","description":"","variable":"sty-fencer_arte{0}","title":"Fencer Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that creates advantages with flourishing strikes and pierces defenses with their quick piercing attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Sky Pike Arte":{"name":"Style_Sky Pike Arte","fieldName":"style_sky_pike_arte","group":"Style","description":"","variable":"sty-sky_pike_arte{0}","title":"Sky Pike Arte","subGroup":"Skirmish Weapons","descriptions":["A Skirmish-focused style that launches themselves into the air to deal bonus damage if attacking from above."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Finesse Blade Arte":{"name":"Style_Finesse Blade Arte","fieldName":"style_finesse_blade_arte","group":"Style","description":"","variable":"sty-finesse_blade_arte{0}","title":"Finesse Blade Arte","subGroup":"Finesse Weapons","descriptions":["A Finesse-focused style that allows you to attack both Brace and Reflex defenses."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Whip Arte":{"name":"Style_Whip Arte","fieldName":"style_whip_arte","group":"Style","description":"","variable":"sty-whip_arte{0}","title":"Whip Arte","subGroup":"Finesse Weapons","descriptions":["A Finesse-focused style that attacks from a distance and hinders foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Flashcut Arte":{"name":"Style_Flashcut Arte","fieldName":"style_flashcut_arte","group":"Style","description":"","variable":"sty-flashcut_arte{0}","title":"Flashcut Arte","subGroup":"Finesse Weapons","descriptions":["A Finesse-focused style that uses quickdraw attacks to tear through enemies' defenses."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Trickster Arte":{"name":"Style_Trickster Arte","fieldName":"style_trickster_arte","group":"Style","description":"","variable":"sty-trickster_arte{0}","title":"Trickster Arte","subGroup":"Finesse Weapons","descriptions":["A Finesse-focused style that attacks from a distance with a whip and knocks foes to the ground."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Forceful Fist Arte":{"name":"Style_Forceful Fist Arte","fieldName":"style_forceful_fist_arte","group":"Style","description":"","variable":"sty-forceful_fist_arte{0}","title":"Forceful Fist Arte","subGroup":"Martial Arts","descriptions":["A Grapping-focused style that knocks foes around with powerful melee attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Stepflow Arte":{"name":"Style_Stepflow Arte","fieldName":"style_stepflow_arte","group":"Style","description":"","variable":"sty-stepflow_arte{0}","title":"Stepflow Arte","subGroup":"Martial Arts","descriptions":["A Grapping-focused style allowing one to freely weave through combat and reposition others."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Aerial Arte":{"name":"Style_Aerial Arte","fieldName":"style_aerial_arte","group":"Style","description":"","variable":"sty-aerial_arte{0}","title":"Aerial Arte","subGroup":"Martial Arts","descriptions":["A Grapping-focused style that relies on aerial attacks to defeat their enemies."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Wrestling Arte":{"name":"Style_Wrestling Arte","fieldName":"style_wrestling_arte","group":"Style","description":"","variable":"sty-wrestling_arte{0}","title":"Wrestling Arte","subGroup":"Martial Arts","descriptions":["A Grapping-focused style that grapples foes and ensures they do not get away."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Galegrip Arte":{"name":"Style_Galegrip Arte","fieldName":"style_galegrip_arte","group":"Style","description":"","variable":"sty-galegrip_arte{0}","title":"Galegrip Arte","subGroup":"Martial Arts","descriptions":["A Grapping-focused style that uses maneuverability to grab foes and knock them prone."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Powerarm Arte":{"name":"Style_Powerarm Arte","fieldName":"style_powerarm_arte","group":"Style","description":"","variable":"sty-powerarm_arte{0}","title":"Powerarm Arte","subGroup":"Martial Arts","descriptions":["A Grappling-focused style that aims to overpower foes with a variety of powerful punches."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Swaying Palm Arte":{"name":"Style_Swaying Palm Arte","fieldName":"style_swaying_palm_arte","group":"Style","description":"","variable":"sty-swaying_palm_arte{0}","title":"Swaying Palm Arte","subGroup":"Martial Arts","descriptions":["A Grappling and Agility-focused style that allows one to quickly to maneuver around the battlefield to strike."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Skyfall Arte":{"name":"Style_Skyfall Arte","fieldName":"style_skyfall_arte","group":"Style","description":"","variable":"sty-skyfall_arte{0}","title":"Skyfall Arte","subGroup":"Martial Arts","descriptions":["A Grappling and Enchant-focused style that allows one to perform acrobatic maneuvers that strike hard from above. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Ironhold Arte":{"name":"Style_Ironhold Arte","fieldName":"style_ironhold_arte","group":"Style","description":"","variable":"sty-ironhold_arte{0}","title":"Ironhold Arte","subGroup":"Martial Arts","descriptions":["A Grappling-focused style that forces foes to submission through powerful grabbing techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Heaven's Reach Arte":{"name":"Style_Heaven's Reach Arte","fieldName":"style_heaven's_reach_arte","group":"Style","description":"","variable":"sty-heaven's_reach_arte{0}","title":"Heaven's Reach Arte","subGroup":"Martial Arts","descriptions":["A Grappling and Physique-focused style that gives great jumping mobility to grapple others regardless of where they are."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Rapid Strikes Arte":{"name":"Style_Rapid Strikes Arte","fieldName":"style_rapid_strikes_arte","group":"Style","description":"","variable":"sty-rapid_strikes_arte{0}","title":"Rapid Strikes Arte","subGroup":"Kinetics","descriptions":["A Grapping-focused style that quickly attacks foes with unavoidable attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Archery Arte":{"name":"Style_Archery Arte","fieldName":"style_archery_arte","group":"Style","description":"","variable":"sty-archery_arte{0}","title":"Archery Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style focused on archery techniques for focused fire on distant foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Trick Arrow Arte":{"name":"Style_Trick Arrow Arte","fieldName":"style_trick_arrow_arte","group":"Style","description":"","variable":"sty-trick_arrow_arte{0}","title":"Trick Arrow Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style allowing one to launch arrows at multiple targets."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Gunslinger Arte":{"name":"Style_Gunslinger Arte","fieldName":"style_gunslinger_arte","group":"Style","description":"","variable":"sty-gunslinger_arte{0}","title":"Gunslinger Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style that fires at single targets with high accuracy and hindering shots."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Sentry Arte":{"name":"Style_Sentry Arte","fieldName":"style_sentry_arte","group":"Style","description":"","variable":"sty-sentry_arte{0}","title":"Sentry Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style that keeps areas under constant fire to suppress movement."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Longsight Arte":{"name":"Style_Longsight Arte","fieldName":"style_longsight_arte","group":"Style","description":"","variable":"sty-longsight_arte{0}","title":"Longsight Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style that requres a longshot weapon to fire from great ranges and weakens foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Scatterpoint Arte":{"name":"Style_Scatterpoint Arte","fieldName":"style_scatterpoint_arte","group":"Style","description":"","variable":"sty-scatterpoint_arte{0}","title":"Scatterpoint Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style that requres a scattershot weapon to shoot multiple foes at once."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Bowmaster Arte":{"name":"Style_Bowmaster Arte","fieldName":"style_bowmaster_arte","group":"Style","description":"","variable":"sty-bowmaster_arte{0}","title":"Bowmaster Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style focused on bowman techniques to fire at foes from a distance."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Pistolero Arte":{"name":"Style_Pistolero Arte","fieldName":"style_pistolero_arte","group":"Style","description":"","variable":"sty-pistolero_arte{0}","title":"Pistolero Arte","subGroup":"Shoot Weapons","descriptions":["A Shoot-focused style that uses multiple gun techniques to gain advantage over their enemies."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Bomber Arte":{"name":"Style_Bomber Arte","fieldName":"style_bomber_arte","group":"Style","description":"","variable":"sty-bomber_arte{0}","title":"Bomber Arte","subGroup":"Throw Weapons","descriptions":["A Throw-focused style that grants improved damage for thrown bombs."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Daggerthrow Arte":{"name":"Style_Daggerthrow Arte","fieldName":"style_daggerthrow_arte","group":"Style","description":"","variable":"sty-daggerthrow_arte{0}","title":"Daggerthrow Arte","subGroup":"Throw Weapons","descriptions":["A Throw-focused style that launches thrown daggers at foes in fans or with precision attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Blasting Flames":{"name":"Style_Blasting Flames","fieldName":"style_blasting_flames","group":"Style","description":"","variable":"sty-blasting_flames{0}","title":"Blasting Flames","subGroup":"Evocation","descriptions":["Fire. A Throw-focused style that launches bombs that both explode immediately and after a delayed time for more power."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Shock Bomb":{"name":"Style_Shock Bomb","fieldName":"style_shock_bomb","group":"Style","description":"","variable":"sty-shock_bomb{0}","title":"Shock Bomb","subGroup":"Evocation","descriptions":["Metal. A Throw-focused style that creates large bursts of electricity and delayed blast bombs."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Arcane Spellshot":{"name":"Style_Arcane Spellshot","fieldName":"style_arcane_spellshot","group":"Style","description":"","variable":"sty-arcane_spellshot{0}","title":"Arcane Spellshot","subGroup":"Evocation","descriptions":["Fire/Metal. A Shoot-focused style that creates powerful ranged single target energy attacks to be launched at foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Flaming Sphere":{"name":"Style_Flaming Sphere","fieldName":"style_flaming_sphere","group":"Style","description":"","variable":"sty-flaming_sphere{0}","title":"Flaming Sphere","subGroup":"Evocation","descriptions":["Fire. A Shoot-focused style that causes fire to blast at a target point and engulf the area."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Lightning Shot":{"name":"Style_Lightning Shot","fieldName":"style_lightning_shot","group":"Style","description":"","variable":"sty-lightning_shot{0}","title":"Lightning Shot","subGroup":"Evocation","descriptions":["Metal. A Shoot-focused style that mixes both line piercing lightning attacks and targeted lightning spells that stuns foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Area Spark":{"name":"Style_Area Spark","fieldName":"style_area_spark","group":"Style","description":"","variable":"sty-area_spark{0}","title":"Area Spark","subGroup":"Evocation","descriptions":["Metal. A Shoot-focused style that fires lighting at a point to spread and hinder foes. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Binding Cold":{"name":"Style_Binding Cold","fieldName":"style_binding_cold","group":"Style","description":"","variable":"sty-binding_cold{0}","title":"Binding Cold","subGroup":"Evocation","descriptions":["Water. A Shoot-focused style that deals with single target spells that can slow or immobilize foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Chilling Blast":{"name":"Style_Chilling Blast","fieldName":"style_chilling_blast","group":"Style","description":"","variable":"sty-chilling_blast{0}","title":"Chilling Blast","subGroup":"Evocation","descriptions":["Water. A Shoot-focused style that creates chilling ice to freeze targets over. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Hellfire":{"name":"Style_Hellfire","fieldName":"style_hellfire","group":"Style","description":"","variable":"sty-hellfire{0}","title":"Hellfire","subGroup":"Evocation","descriptions":["Fire. A Throw and Channel-focused style that allows many methods to blanket areas in fire."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[]
                ,
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Storm Caller":{"name":"Style_Storm Caller","fieldName":"style_storm_caller","group":"Style","description":"","variable":"sty-storm_caller{0}","title":"Storm Caller","subGroup":"Evocation","descriptions":["Metal. A Shoot-focused style that wields lightning to directly harm its targets."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Sheer Cold":{"name":"Style_Sheer Cold","fieldName":"style_sheer_cold","group":"Style","description":"","variable":"sty-sheer_cold{0}","title":"Sheer Cold","subGroup":"Evocation","descriptions":["Water. A Shoot and Channel-focused style that slings many binding and slowing spells both at single targets and areas."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Whispering Wind":{"name":"Style_Whispering Wind","fieldName":"style_whispering_wind","group":"Style","description":"","variable":"sty-whispering_wind{0}","title":"Whispering Wind","subGroup":"Channelling","descriptions":["Wood. A style that allows one to communicate over long distances with the wind."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Bursting Fire":{"name":"Style_Bursting Fire","fieldName":"style_bursting_fire","group":"Style","description":"","variable":"sty-bursting_fire{0}","title":"Bursting Fire","subGroup":"Channelling","descriptions":["Fire. A Channel-focused style that explodes flames around the caster."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Fire Field":{"name":"Style_Fire Field","fieldName":"style_fire_field","group":"Style","description":"","variable":"sty-fire_field{0}","title":"Fire Field","subGroup":"Channelling","descriptions":["Fire. A Channel-focused style that sets an area aflame burning all who enter."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Close Circuit":{"name":"Style_Close Circuit","fieldName":"style_close_circuit","group":"Style","description":"","variable":"sty-close_circuit{0}","title":"Close Circuit","subGroup":"Channelling","descriptions":["Metal. A Channel-focused style that causes electricity to surge around the caster."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Ice Storm":{"name":"Style_Ice Storm","fieldName":"style_ice_storm","group":"Style","description":"","variable":"sty-ice_storm{0}","title":"Ice Storm","subGroup":"Channelling","descriptions":["Water. A Channel-focused style that conjures storms of snow and ice to freeze and bind those within."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Manification":{"name":"Style_Manification","fieldName":"style_manification","group":"Style","description":"","variable":"sty-manification{0}","title":"Manification","subGroup":"Channelling","descriptions":["Wood. A Channel-focused style that manipulates magic after its cast to mimic or end its effects. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Light Control":{"name":"Style_Light Control","fieldName":"style_light_control","group":"Style","description":"","variable":"sty-light_control{0}","title":"Light Control","subGroup":"Channelling","descriptions":["Fire. A Channel and Enchant-focused style that manipulates light to create illusions and copy imagery. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Darkness Weaving":{"name":"Style_Darkness Weaving","fieldName":"style_darkness_weaving","group":"Style","description":"","variable":"sty-darkness_weaving{0}","title":"Darkness Weaving","subGroup":"Channelling","descriptions":["Earth. A Channel and Enchant-focused style that creates darkness to blind, conceal, and harm. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Sound Control":{"name":"Style_Sound Control","fieldName":"style_sound_control","group":"Style","description":"","variable":"sty-sound_control{0}","title":"Sound Control","subGroup":"Channelling","descriptions":["Water. A Channel-focused style that allows distant communication and attacking with sound based attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Arcane Conduit":{"name":"Style_Arcane Conduit","fieldName":"style_arcane_conduit","group":"Style","description":"","variable":"sty-arcane_conduit{0}","title":"Arcane Conduit","subGroup":"Enchantment","descriptions":["Fire/Metal/Water. An Enchant-focused style that allows one to impart and remove energy into people and objects. This allows one to heat or cool and channel magic into one's weapon attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Freeform Flight":{"name":"Style_Freeform Flight","fieldName":"style_freeform_flight","group":"Style","description":"","variable":"sty-freeform_flight{0}","title":"Freeform Flight","subGroup":"Enchantment","descriptions":["Wood/Fire/Metal. An Enchant-focused style allowing one to fly through the air."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Ether Magic":{"name":"Style_Ether Magic","fieldName":"style_ether_magic","group":"Style","description":"","variable":"sty-ether_magic{0}","title":"Ether Magic","subGroup":"Enchantment","descriptions":["Metal. An Enchant and Resonance-focused style that manipulates ether directly to communicate with others, detect magic, and mimic spells. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Time Control":{"name":"Style_Time Control","fieldName":"style_time_control","group":"Style","description":"","variable":"sty-time_control{0}","title":"Time Control","subGroup":"Enchantment","descriptions":["Water. A Enchant-focused style that allows the slowing of time to teleport and prepare actions. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Levitation":{"name":"Style_Levitation","fieldName":"style_levitation","group":"Style","description":"","variable":"sty-levitation{0}","title":"Levitation","subGroup":"Fluctuation","descriptions":["A style that resonates objects in order to lift them to one's side."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Kinetic Assault":{"name":"Style_Kinetic Assault","fieldName":"style_kinetic_assault","group":"Style","description":"","variable":"sty-kinetic_assault{0}","title":"Kinetic Assault","subGroup":"Fluctuation","descriptions":["A Kinesis-focused style that uses resonant objects to lauch the object at foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Surging Dust":{"name":"Style_Surging Dust","fieldName":"style_surging_dust","group":"Style","description":"","variable":"sty-surging_dust{0}","title":"Surging Dust","subGroup":"Fluctuation","descriptions":["A Kinesis-focused style that launches dust at targets to quickly push them with physical force."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Dust Impact":{"name":"Style_Dust Impact","fieldName":"style_dust_impact","group":"Style","description":"","variable":"sty-dust_impact{0}","title":"Dust Impact","subGroup":"Fluctuation","descriptions":["A Kinesis-focused style that swings large quantities of dust at targets to strike and push."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Propelling Force":{"name":"Style_Propelling Force","fieldName":"style_propelling_force","group":"Style","description":"","variable":"sty-propelling_force{0}","title":"Propelling Force","subGroup":"Fluctuation","descriptions":["Wood/Metal. A Kinesis-focused style that propels an instantaneous force in an area to push targets."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Binding Winds":{"name":"Style_Binding Winds","fieldName":"style_binding_winds","group":"Style","description":"","variable":"sty-binding_winds{0}","title":"Binding Winds","subGroup":"Fluctuation","descriptions":["Wood. A Kinesis-focused style uses wind to immobilize foes and prevent allies from freefall."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Telekinesis":{"name":"Style_Telekinesis","fieldName":"style_telekinesis","group":"Style","description":"","variable":"sty-telekinesis{0}","title":"Telekinesis","subGroup":"Fluctuation","descriptions":["A Kinesis-focused style that combines the ability to levitate objects with many techniques that allow one to attack with these objects."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Windsweep":{"name":"Style_Windsweep","fieldName":"style_windsweep","group":"Style","description":"","variable":"sty-windsweep{0}","title":"Windsweep","subGroup":"Fluctuation","descriptions":["Wood. A Kinesis-focused style that creates powerful winds to restrain and lift."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Gravity Force":{"name":"Style_Gravity Force","fieldName":"style_gravity_force","group":"Style","description":"","variable":"sty-gravity_force{0}","title":"Gravity Force","subGroup":"Fluctuation","descriptions":["Earth. A Kinesis-focused style that creates powerful vertical forces to lift and restrain. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Surging Water":{"name":"Style_Surging Water","fieldName":"style_surging_water","group":"Style","description":"","variable":"sty-surging_water{0}","title":"Surging Water","subGroup":"Fluctuation","descriptions":["Water. A Kinesis-focused style that leverages large amounts of water to push and batter targets."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Throwcraft":{"name":"Style_Throwcraft","fieldName":"style_throwcraft","group":"Style","description":"","variable":"sty-throwcraft{0}","title":"Throwcraft","subGroup":"Battlesmithing","descriptions":["A Throw-focused style allowing one to quickly create spears and disks to throw immediately."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Conjure Blades":{"name":"Style_Conjure Blades","fieldName":"style_conjure_blades","group":"Style","description":"","variable":"sty-conjure_blades{0}","title":"Conjure Blades","subGroup":"Battlesmithing","descriptions":["A Conjure-focused style allowing one to quickly create blades to spin or launch in a volley in an area."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Conjure Skyfall":{"name":"Style_Conjure Skyfall","fieldName":"style_conjure_skyfall","group":"Style","description":"","variable":"sty-conjure_skyfall{0}","title":"Conjure Skyfall","subGroup":"Battlesmithing","descriptions":["A Conjure-focused style that creates a barrage of objects to fall into an area."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Warsmith":{"name":"Style_Warsmith","fieldName":"style_warsmith","group":"Style","description":"","variable":"sty-warsmith{0}","title":"Warsmith","subGroup":"Battlesmithing","descriptions":["A Throw and Conjure-focused style focused around battle conjurations."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Structural Magic":{"name":"Style_Structural Magic","fieldName":"style_structural_magic","group":"Style","description":"","variable":"sty-structural_magic{0}","title":"Structural Magic","subGroup":"Conjury","descriptions":["A Conjure-focused style that makes large structures that can work as paths or walls."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Clouded Shroud":{"name":"Style_Clouded Shroud","fieldName":"style_clouded_shroud","group":"Style","description":"","variable":"sty-clouded_shroud{0}","title":"Clouded Shroud","subGroup":"Conjury","descriptions":["A Conjure-focused style that creates clouds of dust that can obscure and slash at foes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Arbormaking":{"name":"Style_Arbormaking","fieldName":"style_arbormaking","group":"Style","description":"","variable":"sty-arbormaking{0}","title":"Arbormaking","subGroup":"Conjury","descriptions":["Wood. A Conjure-focused style that allows the creation of trees as individual elements and walls."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Floral Shroud":{"name":"Style_Floral Shroud","fieldName":"style_floral_shroud","group":"Style","description":"","variable":"sty-floral_shroud{0}","title":"Floral Shroud","subGroup":"Conjury","descriptions":["Wood. A Conjure-focused style that creates pollen and petals that can obscure and sicken with smelling pollen."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Smoke Field":{"name":"Style_Smoke Field","fieldName":"style_smoke_field","group":"Style","description":"","variable":"sty-smoke_field{0}","title":"Smoke Field","subGroup":"Conjury","descriptions":["Fire. A Conjure-focused style that creates clouds of smoke to hide and choke."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Stonemaking":{"name":"Style_Stonemaking","fieldName":"style_stonemaking","group":"Style","description":"","variable":"sty-stonemaking{0}","title":"Stonemaking","subGroup":"Conjury","descriptions":["Earth. A Conjure-focused style that uses rock to create walls, both in parts and as massive lines."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Iron Walls":{"name":"Style_Iron Walls","fieldName":"style_iron_walls","group":"Style","description":"","variable":"sty-iron_walls{0}","title":"Iron Walls","subGroup":"Conjury","descriptions":["Metal. A Conjure-focused style using steel to quickly put up walls that remain sturdy and consume less space."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Glacial Walls":{"name":"Style_Glacial Walls","fieldName":"style_glacial_walls","group":"Style","description":"","variable":"sty-glacial_walls{0}","title":"Glacial Walls","subGroup":"Conjury","descriptions":["Water. A Conjure-focused style that uses ice as walls that can create chilling and damaging fields."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Misty Terrtain":{"name":"Style_Misty Terrtain","fieldName":"style_misty_terrtain","group":"Style","description":"","variable":"sty-misty_terrtain{0}","title":"Misty Terrtain","subGroup":"Conjury","descriptions":["Water. A Conjure-focused style that creates obscuring mist that can hide and freeze."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Structural Mastery":{"name":"Style_Structural Mastery","fieldName":"style_structural_mastery","group":"Style","description":"","variable":"sty-structural_mastery{0}","title":"Structural Mastery","subGroup":"Conjury","descriptions":["A Conjure-focused style that makes large structures that can work as paths, columns, or walls."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Poison Spore":{"name":"Style_Poison Spore","fieldName":"style_poison_spore","group":"Style","description":"","variable":"sty-poison_spore{0}","title":"Poison Spore","subGroup":"Conjury","descriptions":["Wood. A Conjure-focused style that creates clouds of poisonous spores and antidotes for these poisons."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Dust Shaping":{"name":"Style_Dust Shaping","fieldName":"style_dust_shaping","group":"Style","description":"","variable":"sty-dust_shaping{0}","title":"Dust Shaping","subGroup":"Transmulation","descriptions":["A Shape-focused style allowing one to shape dust into any kind of material as the user desires."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Unshaping":{"name":"Style_Unshaping","fieldName":"style_unshaping","group":"Style","description":"","variable":"sty-unshaping{0}","title":"Unshaping","subGroup":"Transmulation","descriptions":["A Shape-focused style allowing one to destroy material into dust."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Plant Growth":{"name":"Style_Plant Growth","fieldName":"style_plant_growth","group":"Style","description":"","variable":"sty-plant_growth{0}","title":"Plant Growth","subGroup":"Transmulation","descriptions":["Wood. A Shape-focused style that alters plantlife into entangling roots and thorny bramble patches."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Calming Blooms":{"name":"Style_Calming Blooms","fieldName":"style_calming_blooms","group":"Style","description":"","variable":"sty-calming_blooms{0}","title":"Calming Blooms","subGroup":"Transmulation","descriptions":["Wood. A Shape-focused style that provides healing through calming meadows and aromas."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Verdant Armory":{"name":"Style_Verdant Armory","fieldName":"style_verdant_armory","group":"Style","description":"","variable":"sty-verdant_armory{0}","title":"Verdant Armory","subGroup":"Transmulation","descriptions":["Wood. A Shape-focused style that molds plantlife into armor and spiny walls and cacti."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Terrain Molding":{"name":"Style_Terrain Molding","fieldName":"style_terrain_molding","group":"Style","description":"","variable":"sty-terrain_molding{0}","title":"Terrain Molding","subGroup":"Transmulation","descriptions":["Earth. A Shape-focused style that molds earth into new terrain."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Ground Splitter":{"name":"Style_Ground Splitter","fieldName":"style_ground_splitter","group":"Style","description":"","variable":"sty-ground_splitter{0}","title":"Ground Splitter","subGroup":"Transmulation","descriptions":["Earth. A Shape-focused style that cracks the earth with holes and quakes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Earthen Armory":{"name":"Style_Earthen Armory","fieldName":"style_earthen_armory","group":"Style","description":"","variable":"sty-earthen_armory{0}","title":"Earthen Armory","subGroup":"Transmulation","descriptions":["Earth. A Shape-focused style that molds earth into armor and walls."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Water Shape":{"name":"Style_Water Shape","fieldName":"style_water_shape","group":"Style","description":"","variable":"sty-water_shape{0}","title":"Water Shape","subGroup":"Transmulation","descriptions":["Water. A Shape-focused style that changes water into slicks to slow or healing fields."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Icy Terrain":{"name":"Style_Icy Terrain","fieldName":"style_icy_terrain","group":"Style","description":"","variable":"sty-icy_terrain{0}","title":"Icy Terrain","subGroup":"Transmulation","descriptions":["Water. A Shape-focused style that freezes water to create slippery pathways and allows quick traversal for the caster."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Frozen Armory":{"name":"Style_Frozen Armory","fieldName":"style_frozen_armory","group":"Style","description":"","variable":"sty-frozen_armory{0}","title":"Frozen Armory","subGroup":"Transmulation","descriptions":["Water. A Shape-focused style that molds ice into shields and walls."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Geomancy":{"name":"Style_Geomancy","fieldName":"style_geomancy","group":"Style","description":"","variable":"sty-geomancy{0}","title":"Geomancy","subGroup":"Transmulation","descriptions":["Earth. A Shape-focused style that alters the terrain with rocks, lava, and quakes."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Cryomancy":{"name":"Style_Cryomancy","fieldName":"style_cryomancy","group":"Style","description":"","variable":"sty-cryomancy{0}","title":"Cryomancy","subGroup":"Transmulation","descriptions":["Water. A Shape-focused style that alters the terrain with ice, storms, and walls."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Healing Hands":{"name":"Style_Healing Hands","fieldName":"style_healing_hands","group":"Style","description":"","variable":"sty-healing_hands{0}","title":"Healing Hands","subGroup":"Physiomancy","descriptions":["Wood/Water. A Heal-focused style that allows one to use healing magic to mend wounds and end debilitating conditions."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Earthen Endurance":{"name":"Style_Earthen Endurance","fieldName":"style_earthen_endurance","group":"Style","description":"","variable":"sty-earthen_endurance{0}","title":"Earthen Endurance","subGroup":"Physiomancy","descriptions":["Earth. A Heal-focused style providing strong defenses and allowing one to carry more."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Propelling Motion":{"name":"Style_Propelling Motion","fieldName":"style_propelling_motion","group":"Style","description":"","variable":"sty-propelling_motion{0}","title":"Propelling Motion","subGroup":"Physiomancy","descriptions":["Earth. A Heal-focused style granting additional movement options to run and leap."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Soul Surge":{"name":"Style_Soul Surge","fieldName":"style_soul_surge","group":"Style","description":"","variable":"sty-soul_surge{0}","title":"Soul Surge","subGroup":"Physiomancy","descriptions":["Fire. A Heal-focused branch style that bolsters the body through empowerment of the soul providing healing and strength. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Blood Flux":{"name":"Style_Blood Flux","fieldName":"style_blood_flux","group":"Style","description":"","variable":"sty-blood_flux{0}","title":"Blood Flux","subGroup":"Physiomancy","descriptions":["Metal. A Heal-focused branch style allowing the manipulation of blood to both paralyze and cleanse. This magic is generally considered taboo in all cultures. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Powerwake":{"name":"Style_Powerwake","fieldName":"style_powerwake","group":"Style","description":"","variable":"sty-powerwake{0}","title":"Powerwake","subGroup":"Brawn","descriptions":["A Physique-focused style allowing one to power through attacks and strong movement abilities."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Enduring Body":{"name":"Style_Enduring Body","fieldName":"style_enduring_body","group":"Style","description":"","variable":"sty-enduring_body{0}","title":"Enduring Body","subGroup":"Brawn","descriptions":["A Physique-focused style that provides strong defenses and abilities to increase carrying capacity."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Traversal":{"name":"Style_Traversal","fieldName":"style_traversal","group":"Style","description":"","variable":"sty-traversal{0}","title":"Traversal","subGroup":"Brawn","descriptions":["A Physique-focused style that allows one to bolster move speed and ignore movement restrictions."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Hidden Footing":{"name":"Style_Hidden Footing","fieldName":"style_hidden_footing","group":"Style","description":"","variable":"sty-hidden_footing{0}","title":"Hidden Footing","subGroup":"Stealth","descriptions":["A Sneak-focused style allowing one to stay hidden and mobile."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Remotion":{"name":"Style_Remotion","fieldName":"style_remotion","group":"Style","description":"","variable":"sty-remotion{0}","title":"Remotion","subGroup":"Acrobatics","descriptions":["An Agility-focused style that gives the user tremendous balance to stay on their feet and avoid attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Evasive Maneuvers":{"name":"Style_Evasive Maneuvers","fieldName":"style_evasive_maneuvers","group":"Style","description":"","variable":"sty-evasive_maneuvers{0}","title":"Evasive Maneuvers","subGroup":"Acrobatics","descriptions":["An Agility-focused style granting incredible evasion skills to avoid attacks and other characters."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Unbeatable Brawn":{"name":"Style_Unbeatable Brawn","fieldName":"style_unbeatable_brawn","group":"Style","description":"","variable":"sty-unbeatable_brawn{0}","title":"Unbeatable Brawn","subGroup":"Brawn","descriptions":["A Physique-focused style providing healing and movement abilities with the Empowered condition."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Unrelenting Motion":{"name":"Style_Unrelenting Motion","fieldName":"style_unrelenting_motion","group":"Style","description":"","variable":"sty-unrelenting_motion{0}","title":"Unrelenting Motion","subGroup":"Brawn","descriptions":["A Physique and Agility-focused style that grants strong movement abilities to reduce movement restrictions."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Shadow Walking":{"name":"Style_Shadow Walking","fieldName":"style_shadow_walking","group":"Style","description":"","variable":"sty-shadow_walking{0}","title":"Shadow Walking","subGroup":"Stealth","descriptions":["A Sneak and Enchant-focused style allowing one to stay hidden and become invisible."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Reactive Defense":{"name":"Style_Reactive Defense","fieldName":"style_reactive_defense","group":"Style","description":"","variable":"sty-reactive_defense{0}","title":"Reactive Defense","subGroup":"Acrobatics","descriptions":["An Agility and Physique-focused style with a focus on evasive attacks and counters."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Advanced","affinity":"","requirements":"None","tier":null},
            "Style_Invigorating Rally":{"name":"Style_Invigorating Rally","fieldName":"style_invigorating_rally","group":"Style","description":"","variable":"sty-invigorating_rally{0}","title":"Invigorating Rally","subGroup":"Persuasion","descriptions":["An Inspire-focused style that motivates others through encouraging words and providing benefits to end conditions."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Avowed":{"name":"Style_Avowed","fieldName":"style_avowed","group":"Style","description":"","variable":"sty-avowed{0}","title":"Avowed","subGroup":"Persuasion","descriptions":["An Inspire-focused style that encourages greatness in others to inspire action."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Social Grace":{"name":"Style_Social Grace","fieldName":"style_social_grace","group":"Style","description":"","variable":"sty-social_grace{0}","title":"Social Grace","subGroup":"Persuasion","descriptions":["A Charm-focused style used to forge connection through charming talk and simple proposals."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Flattery":{"name":"Style_Flattery","fieldName":"style_flattery","group":"Style","description":"","variable":"sty-flattery{0}","title":"Flattery","subGroup":"Persuasion","descriptions":["A Charm-focused style allowing you to manipulate others to your whims, beguiling them for your desires."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Deft Negotiator":{"name":"Style_Deft Negotiator","fieldName":"style_deft_negotiator","group":"Style","description":"","variable":"sty-deft_negotiator{0}","title":"Deft Negotiator","subGroup":"Persuasion","descriptions":["A Rationalize-focused style allowing you to break will to gain others' trust and quickly bring them to the correct decision."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Sales Tactics":{"name":"Style_Sales Tactics","fieldName":"style_sales_tactics","group":"Style","description":"","variable":"sty-sales_tactics{0}","title":"Sales Tactics","subGroup":"Persuasion","descriptions":["A Rationalize-focused style to pressure others into action and to make a quick purchase."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Taunting Wit":{"name":"Style_Taunting Wit","fieldName":"style_taunting_wit","group":"Style","description":"","variable":"sty-taunting_wit{0}","title":"Taunting Wit","subGroup":"Cunning","descriptions":["A Demoralize-focused style about provoking anger out of foes to make yourself their target or to redirect it elsewhere."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Underminer":{"name":"Style_Underminer","fieldName":"style_underminer","group":"Style","description":"","variable":"sty-underminer{0}","title":"Underminer","subGroup":"Cunning","descriptions":["A Demoralize-focused style where you use your words to stave off manipulators and taunt them into giving up."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Intimidating Fear":{"name":"Style_Intimidating Fear","fieldName":"style_intimidating_fear","group":"Style","description":"","variable":"sty-intimidating_fear{0}","title":"Intimidating Fear","subGroup":"Cunning","descriptions":["A Demoralize-focused style used to frighten others into submitting themselves to your demands. And if fear doesn't work, anger can do just as well."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Beguiling Instinct":{"name":"Style_Beguiling Instinct","fieldName":"style_beguiling_instinct","group":"Style","description":"","variable":"sty-beguiling_instinct{0}","title":"Beguiling Instinct","subGroup":"Cunning","descriptions":["A Misdirect-focused style that charms others into listening to you and sows seeds of doubt to damage their will."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Stillheart":{"name":"Style_Stillheart","fieldName":"style_stillheart","group":"Style","description":"","variable":"sty-stillheart{0}","title":"Stillheart","subGroup":"Cunning","descriptions":["An Empathy-focused style making It hard to attack your willpower due to your tranquil aura and to influence others' motivations."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Style_Connecting Bond":{"name":"Style_Connecting Bond","fieldName":"style_connecting_bond","group":"Style","description":"","variable":"sty-connecting_bond{0}","title":"Connecting Bond","subGroup":"Cunning","descriptions":["An Empathy-focused style allowing you to heal others' willpower damage and reveal their motivations."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","mainGroup":"Style","affinity":"","requirements":"None","tier":null},
            "Skill_Agility":{"name":"Skill_Agility","fieldName":"agility","group":"Skill","description":"","variable":"skl-agility{0}","title":"Agility","subGroup":"Athletics","descriptions":["Agility is an active skill used for feats of dexterity and reflex. This skill will most often find use whenever a technique requires swift or reflexive action such as quickly dodging an attack or keeping your balance."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-agility_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Alchemy":{"name":"Skill_Alchemy","fieldName":"alchemy","group":"Skill","description":"","variable":"skl-alchemy{0}","title":"Alchemy","subGroup":"Craft","descriptions":["Alchemy is a technical skill used when making alchemical creations. These creations typically take the form of medicines, poisons, salves, oils, and other consumable crafts."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-alchemy_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Analyze":{"name":"Skill_Analyze","fieldName":"analyze","group":"Skill","description":"","variable":"skl-analyze{0}","title":"Analyze","subGroup":"Investigate","descriptions":["Analyze is a technical skill used when information must be parsed quickly and efficiently. This skill is often used to find hidden clues that would not be in plain sight. It is also used whenever one wishes to quickly learn about a subject written in text or requires one to reason through a problem. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-analyze_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Build":{"name":"Skill_Build","fieldName":"build","group":"Skill","description":"","variable":"skl-build{0}","title":"Build","subGroup":"Craft","descriptions":["Build is an active skill used whenever you are creating an object through precise technique. This skill is used mostly when you wish to create through the use of tools but some complicated items will require build to represent the precision required in the object being created."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-build_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Channel":{"name":"Skill_Channel","fieldName":"channel","group":"Skill","description":"","variable":"skl-channel{0}","title":"Channel","subGroup":"Cast","descriptions":["Channel is an active skill for maintaining concentration on energy ether and manipulating it. This skill will often be a base for magical effects that linger but are impermanent such as lingering flames, winds, or other elements."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-channel_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Charm":{"name":"Skill_Charm","fieldName":"charm","group":"Skill","description":"","variable":"skl-charm{0}","title":"Charm","subGroup":"Persuade","descriptions":["Charm is a social skill used when attempting to meet another emotionally. This can be done through empathy, support, romance, and allure. Charm is used both for persuasion and deception, as long as the attempt is meant to appeal emotionally. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-charm_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Conjure":{"name":"Skill_Conjure","fieldName":"conjure","group":"Skill","description":"","variable":"skl-conjure{0}","title":"Conjure","subGroup":"Cast","descriptions":["Conjure is an active skill used to add form to ether by manipulating it into solid material. Many magical techniques spontaneously give form to ether - this skill is for when the ether is made solid and in large amounts."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-conjure_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Cook":{"name":"Skill_Cook","fieldName":"cook","group":"Skill","description":"","variable":"skl-cook{0}","title":"Cook","subGroup":"Craft","descriptions":["Cook is a technical skill used when dealing with ingredients to be used for consumption and nutrition. This skill is not only used for traditional cooking but anytime food is prepared such as creating beverages. Food is an important resource to survive and keep spirits high. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-cook_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Demoralize":{"name":"Skill_Demoralize","fieldName":"demoralize","group":"Skill","description":"","variable":"skl-demoralize{0}","title":"Demoralize","subGroup":"Cunning","descriptions":["Demoralize is a social skill associated with negativity and intimidating behaviour. Techniques that key off this skill usually attack willpower and invoke many negative emotions to control others' behaviour. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-demoralize_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Empathy":{"name":"Skill_Empathy","fieldName":"empathy","group":"Skill","description":"","variable":"skl-empathy{0}","title":"Empathy","subGroup":"Cunning","descriptions":["Empathy is a social skill used to actively detect another's emotional state. Empathy will often be used to sense another's convictions and influences. It can also see use when seeing through emotional deception. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-empathy_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Enchant":{"name":"Skill_Enchant","fieldName":"enchant","group":"Skill","description":"","variable":"skl-enchant{0}","title":"Enchant","subGroup":"Cast","descriptions":["Enchant is an active skill that gathers ki from the body and concentrates it to a single point. This is most often used to create temporary enhancements to one's own body or another's. Sometimes Enchant is used to surround an object with one's own ki to provide unique effects. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-enchant_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Finesse":{"name":"Skill_Finesse","fieldName":"finesse","group":"Skill","description":"","variable":"skl-finesse{0}","title":"Finesse","subGroup":"Fight","descriptions":["Finesse is an active skill used for fighting with quick and dextrous attacks. This skill is most commonly used as an attacking skill with weapon techniques that rely on a combination of speed and precision."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-finesse_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Glyphwork":{"name":"Skill_Glyphwork","fieldName":"glyphwork","group":"Skill","description":"","variable":"skl-glyphwork{0}","title":"Glyphwork","subGroup":"Device","descriptions":["Glyphwork is a technical skill that allows one to create and manipulate pnevmarite technology. If a device requires magical tooling, this skill will often be used to work with it. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-glyphwork_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Grappling":{"name":"Skill_Grappling","fieldName":"grappling","group":"Skill","description":"","variable":"skl-grappling{0}","title":"Grappling","subGroup":"Fight","descriptions":["Grappling is an active skill that represents attacking with one's own body. Wrestling and forcing movement are always grapple skill checks. In addition, many strikes from fists or kicks are often grappling checks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-grappling_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[]
                ,
                "isResource":""},
            "Skill_Heal":{"name":"Skill_Heal","fieldName":"heal","group":"Skill","description":"","variable":"skl-heal{0}","title":"Heal","subGroup":"Cast","descriptions":["Heal is an active skill used to perform medical procedures such as first aid and using healing magic. It includes long-term medical support for disease and illness and in circumstances where surgery is required."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-heal_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Inspire":{"name":"Skill_Inspire","fieldName":"inspire","group":"Skill","description":"","variable":"skl-inspire{0}","title":"Inspire","subGroup":"Persuade","descriptions":["Inspire is a social skill used to evoke feelings of hope and to counter dispair. Inspire is used when motivating action. Techniques that use inspire often provide emotional boosts and bolster willpower. Inspire is also often used in persuasion attempts to convince another to help. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-inspire_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Kinesis":{"name":"Skill_Kinesis","fieldName":"kinesis","group":"Skill","description":"","variable":"skl-kinesis{0}","title":"Kinesis","subGroup":"Cast","descriptions":["Kinesis is an active skill to manipulate ether that creates forces and maintaining it. Usually this is used for techniques that require precise movement of objects or areas."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-kinesis_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Might":{"name":"Skill_Might","fieldName":"might","group":"Skill","description":"","variable":"skl-might{0}","title":"Might","subGroup":"Fight","descriptions":["Might is an active skill about using strength to beat a foe down. This skill is frequently used in weapon techniques with a focus on heavy swings and feats of power."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-might_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Misdirect":{"name":"Skill_Misdirect","fieldName":"misdirect","group":"Skill","description":"","variable":"skl-misdirect{0}","title":"Misdirect","subGroup":"Cunning","descriptions":["Misdirect is a social skill used to obscure information through lies or omitting facts. Misdirect is most often applicable when using outright lies or tactics that try to redirect a conversation or one's attention."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-misdirect_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Physique":{"name":"Skill_Physique","fieldName":"physique","group":"Skill","description":"","variable":"skl-physique{0}","title":"Physique","subGroup":"Athletics","descriptions":["Physique is an active skill used when strength is required to perform. This skill comes into play when a technique requires raw power such as shoving, jumping, climbing, or lifting."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-physique_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Pilot":{"name":"Skill_Pilot","fieldName":"pilot","group":"Skill","description":"","variable":"skl-pilot{0}","title":"Pilot","subGroup":"Device","descriptions":["Pilot is an active skill used to maneuver vehicles and machinery. Most complicated machinery will require a pilot check to utilize the device any many techniques with pilot allow you to perform complicated maneuvers with pilot."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-qck","definitionName":"Attr_QCK","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-pilot_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Rationalize":{"name":"Skill_Rationalize","fieldName":"rationalize","group":"Skill","description":"","variable":"skl-rationalize{0}","title":"Rationalize","subGroup":"Persuade","descriptions":["Rationalize is a social skill used when persuading another through reason and logic. Rationalize is usually a tool for negotiation when appealing to a logical mindset such as when pragmatism is necessary. It can also be used to deceive using misinformation and selling it as truth."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-rationalize_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Resonance":{"name":"Skill_Resonance","fieldName":"resonance","group":"Skill","description":"","variable":"skl-resonance{0}","title":"Resonance","subGroup":"Investigate","descriptions":["Resonance is a technical skill used to detect the presence of ether. This can be used to detect density of ether in an area but also can be used to determine if a material was made through ether. Complicated techniques can rely on resonance to remove the ether completely."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-cnv","definitionName":"Attr_CNV","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-resonance_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Search":{"name":"Skill_Search","fieldName":"search","group":"Skill","description":"","variable":"skl-search{0}","title":"Search","subGroup":"Investigate","descriptions":["Search is a technical skill used to find the hidden and anything that can be found with one's senses. Usually this is used to find characters hiding but can also be used to find hidden objects."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-int","definitionName":"Attr_INT","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-search_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Shape":{"name":"Skill_Shape","fieldName":"shape","group":"Skill","description":"","variable":"skl-shape{0}","title":"Shape","subGroup":"Cast","descriptions":["Shape is an active skill used to transmute material into new objects and items through magic. Many building techniques require one to use shape to manipulate a material to accurately represent the intended form and ensure its durability."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-rsn","definitionName":"Attr_RSN","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-shape_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Shoot":{"name":"Skill_Shoot","fieldName":"shoot","group":"Skill","description":"","variable":"skl-shoot{0}","title":"Shoot","subGroup":"Fight","descriptions":["Shoot is an active skill focused on aiming at targets at a distance. It's commonly used with ranged weapon techniques and ranged spells. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-shoot_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Skirmish":{"name":"Skill_Skirmish","fieldName":"skirmish","group":"Skill","description":"","variable":"skl-skirmish{0}","title":"Skirmish","subGroup":"Fight","descriptions":["Skirmish is an active skill for striking characters with melee attacks. It is exclusively an attacking skill for techniques that benefit from precise strikes to maximize effectiveness. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-skirmish_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Sneak":{"name":"Skill_Sneak","fieldName":"sneak","group":"Skill","description":"","variable":"skl-sneak{0}","title":"Sneak","subGroup":"Athletics","descriptions":["Sneak is an active skill to conceal your presence. This will often be used to keep yourself hidden while performing other actions such as quick movement or stealthy attacks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-sneak_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Throw":{"name":"Skill_Throw","fieldName":"throw","group":"Skill","description":"","variable":"skl-throw{0}","title":"Throw","subGroup":"Fight","descriptions":["Throw is an active skill that allows one to throw objects accurately and far. This can be used to throw objects but also whenever a spell requires one to toss or lob an effect."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-bod","definitionName":"Attr_BOD","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-throw_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Skill_Tinker":{"name":"Skill_Tinker","fieldName":"tinker","group":"Skill","description":"","variable":"skl-tinker{0}","title":"Tinker","subGroup":"Device","descriptions":["Tinker is a technical skill that allows one to create and manipulate machinery and technology. This skill can be used to disarm traps and locks. Otherwise, this will also be used when constructing complicated technology that require gears, pulleys, or other devices that require moving parts."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"atr-prc","definitionName":"Attr_PRC","value":0,"multiplier":1,"max":0},
                        {"variableName":"skl-tinker_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lang_Minere":{"name":"Lang_Minere","fieldName":"lang_minere","group":"Language","description":"","variable":"lng-minere{0}","title":"Minere","subGroup":"Walthair","descriptions":["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Common"},
            "Lang_Junal":{"name":"Lang_Junal","fieldName":"lang_junal","group":"Language","description":"","variable":"lng-junal{0}","title":"Junal","subGroup":"Aridsha","descriptions":["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Common"},
            "Lang_Apollen":{"name":"Lang_Apollen","fieldName":"lang_apollen","group":"Language","description":"","variable":"lng-apollen{0}","title":"Apollen","subGroup":"Khem","descriptions":["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Common"},
            "Lang_Lib":{"name":"Lang_Lib","fieldName":"lang_lib","group":"Language","description":"","variable":"lng-lib{0}","title":"Lib","subGroup":"Colswei","descriptions":["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Common"},
            "Lang_Cert":{"name":"Lang_Cert","fieldName":"lang_cert","group":"Language","description":"","variable":"lng-cert{0}","title":"Cert","subGroup":"Ceres","descriptions":["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Common"},
            "Lang_Byric":{"name":"Lang_Byric","fieldName":"lang_byric","group":"Language","description":"","variable":"lng-byric{0}","title":"Byric","subGroup":"Aridsha","descriptions":["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Baryan Ascent"},
            "Lang_Dustell":{"name":"Lang_Dustell","fieldName":"lang_dustell","group":"Language","description":"","variable":"lng-dustell{0}","title":"Dustell","subGroup":"Aridsha","descriptions":["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Aridsha"},
            "Lang_Muralic":{"name":"Lang_Muralic","fieldName":"lang_muralic","group":"Language","description":"","variable":"lng-muralic{0}","title":"Muralic","subGroup":"Aridsha","descriptions":["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Aridsha"},
            "Lang_Shira":{"name":"Lang_Shira","fieldName":"lang_shira","group":"Language","description":"","variable":"lng-shira{0}","title":"Shira","subGroup":"Aridsha","descriptions":["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Ancient"},
            "Lang_Ciel":{"name":"Lang_Ciel","fieldName":"lang_ciel","group":"Language","description":"","variable":"lng-ciel{0}","title":"Ciel","subGroup":"Ceres","descriptions":["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Capitol"},
            "Lang_Citeq":{"name":"Lang_Citeq","fieldName":"lang_citeq","group":"Language","description":"","variable":"lng-citeq{0}","title":"Citeq","subGroup":"Ceres","descriptions":["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"South West Ceres"},
            "Lang_Manstan":{"name":"Lang_Manstan","fieldName":"lang_manstan","group":"Language","description":"","variable":"lng-manstan{0}","title":"Manstan","subGroup":"Ceres","descriptions":["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Southern Ceres"},
            "Lang_Salkan":{"name":"Lang_Salkan","fieldName":"lang_salkan","group":"Language","description":"","variable":"lng-salkan{0}","title":"Salkan","subGroup":"Ceres","descriptions":["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"North West Ceres"},
            "Lang_Sansic":{"name":"Lang_Sansic","fieldName":"lang_sansic","group":"Language","description":"","variable":"lng-sansic{0}","title":"Sansic","subGroup":"Ceres","descriptions":["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Eastern Ceres"},
            "Lang_Silq":{"name":"Lang_Silq","fieldName":"lang_silq","group":"Language","description":"","variable":"lng-silq{0}","title":"Silq","subGroup":"Ceres","descriptions":["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Western Ceres"},
            "Lang_Kleikan":{"name":"Lang_Kleikan","fieldName":"lang_kleikan","group":"Language","description":"","variable":"lng-kleikan{0}","title":"Kleikan","subGroup":"Khem","descriptions":["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Klef"},
            "Lang_Crinere":{"name":"Lang_Crinere","fieldName":"lang_crinere","group":"Language","description":"","variable":"lng-crinere{0}","title":"Crinere","subGroup":"Walthair","descriptions":["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Ancient"},
            "Lang_Palmic":{"name":"Lang_Palmic","fieldName":"lang_palmic","group":"Language","description":"","variable":"lng-palmic{0}","title":"Palmic","subGroup":"Walthair","descriptions":["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Tropical Seas"},
            "Lang_Shorespeak":{"name":"Lang_Shorespeak","fieldName":"lang_shorespeak","group":"Language","description":"","variable":"lng-shorespeak{0}","title":"Shorespeak","subGroup":"Walthair","descriptions":["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"East Sea"},
            "Lang_Verdeni":{"name":"Lang_Verdeni","fieldName":"lang_verdeni","group":"Language","description":"","variable":"lng-verdeni{0}","title":"Verdeni","subGroup":"Walthair","descriptions":["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Verdant Key"},
            "Lang_Vulca":{"name":"Lang_Vulca","fieldName":"lang_vulca","group":"Language","description":"","variable":"lng-vulca{0}","title":"Vulca","subGroup":"Walthair","descriptions":["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Ancient"},
            "Lang_Emotion":{"name":"Lang_Emotion","fieldName":"lang_emotion","group":"Language","description":"","variable":"lng-emotion{0}","title":"Emotion","subGroup":"Special","descriptions":["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Spirit"},
            "Lang_Empathy":{"name":"Lang_Empathy","fieldName":"lang_empathy","group":"Language","description":"","variable":"lng-empathy{0}","title":"Empathy","subGroup":"Special","descriptions":["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Ancient Spirit"},
            "Lang_Wolfwarg":{"name":"Lang_Wolfwarg","fieldName":"lang_wolfwarg","group":"Language","description":"","variable":"lng-wolfwarg{0}","title":"Wolfwarg","subGroup":"Special","descriptions":["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Cesplangrah"},
            "Lang_Jovean":{"name":"Lang_Jovean","fieldName":"lang_jovean","group":"Language","description":"","variable":"lng-jovean{0}","title":"Jovean","subGroup":"Special","descriptions":["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Ancient"},
            "Lang_Mytikan":{"name":"Lang_Mytikan","fieldName":"lang_mytikan","group":"Language","description":"","variable":"lng-mytikan{0}","title":"Mytikan","subGroup":"Special","descriptions":["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","location":"Ancient"},
            "Lore_Health":{"name":"Lore_Health","fieldName":"health","group":"Lore","description":"","variable":"lor-health{0}","title":"Health","subGroup":"Academics","descriptions":["This covers the study of human physiology and health."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-health_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Mana":{"name":"Lore_Mana","fieldName":"mana","group":"Lore","description":"","variable":"lor-mana{0}","title":"Mana","subGroup":"Academics","descriptions":["The study of ki, ether, and magic. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-mana_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Mathematics":{"name":"Lore_Mathematics","fieldName":"mathematics","group":"Lore","description":"","variable":"lor-mathematics{0}","title":"Mathematics","subGroup":"Academics","descriptions":["Mathematics knowledge represents an understanding of math and calculations."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-mathematics_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Nature":{"name":"Lore_Nature","fieldName":"nature","group":"Lore","description":"","variable":"lor-nature{0}","title":"Nature","subGroup":"Academics","descriptions":["Nature knowledge grants an understanding of various types of plant life and their uses."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-nature_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_School":{"name":"Lore_School","fieldName":"school","group":"Lore","description":"","variable":"lor-school{0}","title":"School","subGroup":"Academics","descriptions":["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-school_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Spirit":{"name":"Lore_Spirit","fieldName":"spirit","group":"Lore","description":"","variable":"lor-spirit{0}","title":"Spirit","subGroup":"Academics","descriptions":["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-spirit_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Warfare":{"name":"Lore_Warfare","fieldName":"warfare","group":"Lore","description":"","variable":"lor-warfare{0}","title":"Warfare","subGroup":"Academics","descriptions":["Warfare knowledge covers various tactics used in war and the management of an army."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-warfare_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Zoology":{"name":"Lore_Zoology","fieldName":"zoology","group":"Lore","description":"","variable":"lor-zoology{0}","title":"Zoology","subGroup":"Academics","descriptions":["This knowledge represents physiological knowledge of living creatures of the world."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-zoology_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Arboriculture":{"name":"Lore_Arboriculture","fieldName":"arboriculture","group":"Lore","description":"","variable":"lor-arboriculture{0}","title":"Arboriculture","subGroup":"Profession","descriptions":["Arboriculture is the knowledge of trees, shrubs, and their care, maintenance, and gathering."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-arboriculture_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Farming":{"name":"Lore_Farming","fieldName":"farming","group":"Lore","description":"","variable":"lor-farming{0}","title":"Farming","subGroup":"Profession","descriptions":["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-farming_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Fishing":{"name":"Lore_Fishing","fieldName":"fishing","group":"Lore","description":"","variable":"lor-fishing{0}","title":"Fishing","subGroup":"Profession","descriptions":["Fishing knowledge covers all aspects of fishing."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-fishing_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Hunting":{"name":"Lore_Hunting","fieldName":"hunting","group":"Lore","description":"","variable":"lor-hunting{0}","title":"Hunting","subGroup":"Profession","descriptions":["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-hunting_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Legal":{"name":"Lore_Legal","fieldName":"legal","group":"Lore","description":"","variable":"lor-legal{0}","title":"Legal","subGroup":"Profession","descriptions":["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-legal_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Mercantile":{"name":"Lore_Mercantile","fieldName":"mercantile","group":"Lore","description":"","variable":"lor-mercantile{0}","title":"Mercantile","subGroup":"Profession","descriptions":["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-mercantile_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Mining":{"name":"Lore_Mining","fieldName":"mining","group":"Lore","description":"","variable":"lor-mining{0}","title":"Mining","subGroup":"Profession","descriptions":["Mining knowledge represents information related to breaking apart rock for material."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-mining_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Alchemy":{"name":"Lore_Alchemy","fieldName":"alchemy","group":"Lore","description":"","variable":"lor-alchemy{0}","title":"Alchemy","subGroup":"Craftmanship","descriptions":["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-alchemy_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Architecture":{"name":"Lore_Architecture","fieldName":"architecture","group":"Lore","description":"","variable":"lor-architecture{0}","title":"Architecture","subGroup":"Craftmanship","descriptions":["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-architecture_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Brewing":{"name":"Lore_Brewing","fieldName":"brewing","group":"Lore","description":"","variable":"lor-brewing{0}","title":"Brewing","subGroup":"Craftmanship","descriptions":["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-brewing_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Cooking":{"name":"Lore_Cooking","fieldName":"cooking","group":"Lore","description":"","variable":"lor-cooking{0}","title":"Cooking","subGroup":"Craftmanship","descriptions":["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-cooking_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Engineering":{"name":"Lore_Engineering","fieldName":"engineering","group":"Lore","description":"","variable":"lor-engineering{0}","title":"Engineering","subGroup":"Craftmanship","descriptions":["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-engineering_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Glassblowing":{"name":"Lore_Glassblowing","fieldName":"glassblowing","group":"Lore","description":"","variable":"lor-glassblowing{0}","title":"Glassblowing","subGroup":"Craftmanship","descriptions":["When working with and shaping glass, the skill of glassblowing is required."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-glassblowing_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Leatherworking":{"name":"Lore_Leatherworking","fieldName":"leatherworking","group":"Lore","description":"","variable":"lor-leatherworking{0}","title":"Leatherworking","subGroup":"Craftmanship","descriptions":["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-leatherworking_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Sculpting":{"name":"Lore_Sculpting","fieldName":"sculpting","group":"Lore","description":"","variable":"lor-sculpting{0}","title":"Sculpting","subGroup":"Craftmanship","descriptions":["Sculpting allows one to use soft material like clay and shape it into a desired form."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-sculpting_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Smithing":{"name":"Lore_Smithing","fieldName":"smithing","group":"Lore","description":"","variable":"lor-smithing{0}","title":"Smithing","subGroup":"Craftmanship","descriptions":["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-smithing_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Weaving":{"name":"Lore_Weaving","fieldName":"weaving","group":"Lore","description":"","variable":"lor-weaving{0}","title":"Weaving","subGroup":"Craftmanship","descriptions":["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-weaving_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Aridsha":{"name":"Lore_Aridsha","fieldName":"aridsha","group":"Lore","description":"","variable":"lor-aridsha{0}","title":"Aridsha","subGroup":"Geography","descriptions":["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-aridsha_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Ceres":{"name":"Lore_Ceres","fieldName":"ceres","group":"Lore","description":"","variable":"lor-ceres{0}","title":"Ceres","subGroup":"Geography","descriptions":["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-ceres_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Colswei":{"name":"Lore_Colswei","fieldName":"colswei","group":"Lore","description":"","variable":"lor-colswei{0}","title":"Colswei","subGroup":"Geography","descriptions":["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-colswei_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Khem":{"name":"Lore_Khem","fieldName":"khem","group":"Lore","description":"","variable":"lor-khem{0}","title":"Khem","subGroup":"Geography","descriptions":["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-khem_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Novus":{"name":"Lore_Novus","fieldName":"novus","group":"Lore","description":"","variable":"lor-novus{0}","title":"Novus","subGroup":"Geography","descriptions":["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-novus_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Walthair":{"name":"Lore_Walthair","fieldName":"walthair","group":"Lore","description":"","variable":"lor-walthair{0}","title":"Walthair","subGroup":"Geography","descriptions":["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-walthair_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Wayling":{"name":"Lore_Wayling","fieldName":"wayling","group":"Lore","description":"","variable":"lor-wayling{0}","title":"Wayling","subGroup":"Geography","descriptions":["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-wayling_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Ethereal Plane":{"name":"Lore_Ethereal Plane","fieldName":"ethereal_plane","group":"Lore","description":"","variable":"lor-ethereal_plane{0}","title":"Ethereal Plane","subGroup":"Geography","descriptions":["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-ethereal_plane_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Aridsha History":{"name":"Lore_Aridsha History","fieldName":"aridsha_history","group":"Lore","description":"","variable":"lor-aridsha_history{0}","title":"Aridsha History","subGroup":"History","descriptions":["This check represents history of Juno and the Aridsha desert region to the west. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-aridsha_history_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Ceres History":{"name":"Lore_Ceres History","fieldName":"ceres_history","group":"Lore","description":"","variable":"lor-ceres_history{0}","title":"Ceres History","subGroup":"History","descriptions":["This check represents history of Capitol City and the Ceres plains to the north."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-ceres_history_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Colswei History":{"name":"Lore_Colswei History","fieldName":"colswei_history","group":"Lore","description":"","variable":"lor-colswei_history{0}","title":"Colswei History","subGroup":"History","descriptions":["This check represents history of Liber and the frozen lands of the Colswei in the south."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-colswei_history_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Khem History":{"name":"Lore_Khem History","fieldName":"khem_history","group":"Lore","description":"","variable":"lor-khem_history{0}","title":"Khem History","subGroup":"History","descriptions":["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-khem_history_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Novus History":{"name":"Lore_Novus History","fieldName":"novus_history","group":"Lore","description":"","variable":"lor-novus_history{0}","title":"Novus History","subGroup":"History","descriptions":["This check represents history of Novus and the Blessed Lands beyond the ocean."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-novus_history_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Walthair History":{"name":"Lore_Walthair History","fieldName":"walthair_history","group":"Lore","description":"","variable":"lor-walthair_history{0}","title":"Walthair History","subGroup":"History","descriptions":["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-walthair_history_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Wayling History":{"name":"Lore_Wayling History","fieldName":"wayling_history","group":"Lore","description":"","variable":"lor-wayling_history{0}","title":"Wayling History","subGroup":"History","descriptions":["This check represents history of the central grasslands and marsh of Wayling."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-wayling_history_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Art":{"name":"Lore_Art","fieldName":"art","group":"Lore","description":"","variable":"lor-art{0}","title":"Art","subGroup":"Culture","descriptions":["Art knowledge details information on the world of art and the artists behind famous works of art."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-art_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Etiquette":{"name":"Lore_Etiquette","fieldName":"etiquette","group":"Lore","description":"","variable":"lor-etiquette{0}","title":"Etiquette","subGroup":"Culture","descriptions":["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-etiquette_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Fashion":{"name":"Lore_Fashion","fieldName":"fashion","group":"Lore","description":"","variable":"lor-fashion{0}","title":"Fashion","subGroup":"Culture","descriptions":["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-fashion_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Games":{"name":"Lore_Games","fieldName":"games","group":"Lore","description":"","variable":"lor-games{0}","title":"Games","subGroup":"Culture","descriptions":["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."]
                ,
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-games_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Music":{"name":"Lore_Music","fieldName":"music","group":"Lore","description":"","variable":"lor-music{0}","title":"Music","subGroup":"Culture","descriptions":["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-music_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Scribing":{"name":"Lore_Scribing","fieldName":"scribing","group":"Lore","description":"","variable":"lor-scribing{0}","title":"Scribing","subGroup":"Culture","descriptions":["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-scribing_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Theater":{"name":"Lore_Theater","fieldName":"theater","group":"Lore","description":"","variable":"lor-theater{0}","title":"Theater","subGroup":"Culture","descriptions":["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-theater_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Church of Kongkwei":{"name":"Lore_Church of Kongkwei","fieldName":"church_of_kongkwei","group":"Lore","description":"","variable":"lor-church_of_kongkwei{0}","title":"Church of Kongkwei","subGroup":"Religion","descriptions":["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-church_of_kongkwei_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Guidance":{"name":"Lore_Guidance","fieldName":"guidance","group":"Lore","description":"","variable":"lor-guidance{0}","title":"Guidance","subGroup":"Religion","descriptions":["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-guidance_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Life's Circle":{"name":"Lore_Life's Circle","fieldName":"life's_circle","group":"Lore","description":"","variable":"lor-life's_circle{0}","title":"Life's Circle","subGroup":"Religion","descriptions":["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-life's_circle_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Ocean Court":{"name":"Lore_Ocean Court","fieldName":"ocean_court","group":"Lore","description":"","variable":"lor-ocean_court{0}","title":"Ocean Court","subGroup":"Religion","descriptions":["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-ocean_court_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Sylvan":{"name":"Lore_Sylvan","fieldName":"sylvan","group":"Lore","description":"","variable":"lor-sylvan{0}","title":"Sylvan","subGroup":"Religion","descriptions":["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-sylvan_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Lore_Zushaon":{"name":"Lore_Zushaon","fieldName":"zushaon","group":"Lore","description":"","variable":"lor-zushaon{0}","title":"Zushaon","subGroup":"Religion","descriptions":["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[{"variableName":"gen-recall","definitionName":"Recall","value":0,"multiplier":1,"max":0},
                        {"variableName":"lor-zushaon_rank","definitionName":"","value":0,"multiplier":1,"max":0}]},
                "linkedGroups":[],
                "isResource":""},
            "Job_Fighter":{"name":"Job_Fighter","fieldName":"job_fighter","group":"Job","description":"","variable":"job-fighter{0}","title":"Fighter","subGroup":"Vanguard","descriptions":["The art of war is about being the one that survives to the end and the fighter is the embodiment of this. Armed with methods to self sustain and heal, the fighter is a well spring of sustained combat.\nThe fighter is made to be very self sufficient, however it excels most when it can be provided healing. A teammate that can heal the fighter without spending its resources will see the fighter staying more effective.\nFighters like having a high body attribute as it increases their HP stat. The fighter doesn't want for any particular skills however might will allow it to use its body attribute to attack as well."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Sentinel":{"name":"Job_Sentinel","fieldName":"job_sentinel","group":"Job","description":"","variable":"job-sentinel{0}","title":"Sentinel","subGroup":"Vanguard","descriptions":["Ever on the lookout for their allies, the sentinel is a protector and wall. The sentinel excels at defense and will throw themselves into the line of danger whenever and wherever their allies are threatened.\nThe sentinel's abilities allow it to move across the battlefield to protect allies and take attacks, but its range is often short. The sentinel can find itself struggling against ranged attackers so having some way to deal with those is usually helpful for the sentinel.\nSentinels appreciate both a high body and precision attribute as the former will raise its HP and some of its techniques require the latter. The sentinel will do well with training in the skirmish skill as its techniques key off of it."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Warden":{"name":"Job_Warden","fieldName":"job_warden","group":"Job","description":"","variable":"job-warden{0}","title":"Warden","subGroup":"Vanguard","descriptions":["The warden is a master of the ethereal, able to weave it into armor to protect themselves and their allies. By providing temporary shields, a warden is a fluid defender prioritizing charging into battle.\nThe warden has a few ways to defend themselves but especially in melee combat does the full arsenal unlock. As such, learning additional techniques to improve their melee combat is beneficial to the warden.\nAs their mantles are based on the enchant skill, wardens often do well with the skill trained. Like all vanguards, wardens want a high body attribute along with a high quickness for their enchant."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Bulwark":{"name":"Job_Bulwark","fieldName":"job_bulwark","group":"Job","description":"","variable":"job-bulwark{0}","title":"Bulwark","subGroup":"Vanguard","descriptions":["Bulwarks are masters of conjury as they use their skills to instantly materialize structures. With this skill they create blockades to funnel foes and shield their allies.\nThe Bulwark can gain many benefits when using techniques that use the Materialize trait, however lacks any techniques to do so naturally. The job is created with walls in mind and providing structures for cover.\nConjure is a very useful skill for Bulwark as it allows them to provide bonuses to the objects they create. Body is also a great attribute to have as it bolsters their own HP and provides bonuses to the conjure skill."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Hunter":{"name":"Job_Hunter","fieldName":"job_hunter","group":"Job","description":"","variable":"job-hunter{0}","title":"Hunter","subGroup":"Operator","descriptions":["Stalking their prey, a hunter is a focused predator of their enemies. By assigning a creature as their quarry, a hunter can track them easily and strike with pinpoint accuracy through any armor they possess.\nA hunter is best utilized as a ranged attacker and benefits from attacks that keep them at a distance. They also fair very well against heavily armored characters due to their ability to add armor-piercing to their ranged attacks.\nGiving the hunter training in the shoot skill will always be beneficial as many of its abilities require its use. As such, hunters appreciate a high precision attribute to help support their techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Sniper":{"name":"Job_Sniper","fieldName":"job_sniper","group":"Job","description":"","variable":"job-sniper{0}","title":"Sniper","subGroup":"Operator","descriptions":["The sniper is a damage focused job that protects itself by keeping its distance. It is known for its accuracy, even allowing it to see through soft cover allowing it to counter those who may try to hide in mist or fog on a battlefield.\nA Sniper benefits from using techniques from a long range. Styles that allow a sniper to maintain distance are to its benefit. While distance will allow a Sniper some amount of protection, having ways to maintain cover or create it are always beneficial to a Sniper.\nSnipers like to have a high Precision attribute to allow it to use its Shoot-based techniques accurately. Likewise, a Sniper benefits from having training in the Shoot skill."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Trooper":{"name":"Job_Trooper","fieldName":"job_trooper","group":"Job","description":"","variable":"job-trooper{0}","title":"Trooper","subGroup":"Operator","descriptions":["Staying guard over their watch, a trooper is a master of keeping guard over an area. Those who enter a trooper's overwatch are bound to be hit with the trooper's variety of techniques.\nA trooper tends to benefit from ranged techniques of all types, as long as the character can use them within the trooper's medium length range.\nTroopers tend to prefer a high precision and shoot skill to allow them to make full use of their kit. As such, a trooper should also be built to have a ranged weapon in hand."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Warmage":{"name":"Job_Warmage","fieldName":"job_warmage","group":"Job","description":"","variable":"job-warmage{0}","title":"Warmage","subGroup":"Operator","descriptions":["By covering the field in explosions, the warmage intends to level groups. They provide methods to improve area attacks allowing them to shield their allies from their attacks.\nWith a lot of emphasis on area attacks, techniques that target bursts, blasts, and cones are always useful to the warmage - but especially any blast abilities.\nThere are a variety of techniques that can create area effects, but damaging ones typically are keyed off of shoot or throw skills. As with all operators, the warmage enjoys some benefit from a high precion attribute."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Alchemist":{"name":"Job_Alchemist","fieldName":"job_alchemist","group":"Job","description":"","variable":"job-alchemist{0}","title":"Alchemist","subGroup":"Operator","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Brawler":{"name":"Job_Brawler","fieldName":"job_brawler","group":"Job","description":"","variable":"job-brawler{0}","title":"Brawler","subGroup":"Athlete","descriptions":["The brawler is a fistfighter keen on getting into the fight. They specialize at weakening foes so that they can setup combos for themselves and others - both on their own turns and on their allies' by setting up flanking opportunities.\nA brawler can reliably inflict its targets with the Hindered status. As such, the brawler pairs well with any techniques that allow the brawler or its teammates to take advantage of the Hindered status.\nA brawler appreciates both a high body and quickness attribute. The former as the grappling skill keys off of it while quickness will grant the brawler a lot of move speed. Grappling is a very useful skill for the brawler as its main techniques require it."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Kineticist":{"name":"Job_Kineticist","fieldName":"job_kineticist","group":"Job","description":"","variable":"job-kineticist{0}","title":"Kineticist","subGroup":"Athlete","descriptions":["The kineticist is a highly mobile caster that expertly throws objects and magic. By attacking, the kineticist stores excess ki into their body to release it into a burst of movement.\nWhen building a kineticist, try to focus on techniques that will allow them to attack from a short distance or benefit from movement. The kineticist lacks ways to protect themselves so any defensive techniques are likely to help a kineticist.\nKineticists tend to benefit from a high precision and quickness attribute. Kinesis is always helpful to train as it allows a Kineticist to make full use of their abilities."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Rogue":{"name":"Job_Rogue","fieldName":"job_rogue","group":"Job","description":"","variable":"job-rogue{0}","title":"Rogue","subGroup":"Athlete","descriptions":["The rogue is an expert at exploiting distractions and disappearing quickly. Their abilities allow them to strike hard then disappear into hiding again.\nWhile the rogue can hide in cover more easily than most, they lack a method to reliably create cover. They pair well with techniques and teammates that can create that cover for them.\nRogues, like all athletes, prefer having a high quickness to gain a lot of movement. Many rogues will find training in sneak and finesse skills will be advantageous to their job but aren't necessary to succeed."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Labourer":{"name":"Job_Labourer","fieldName":"job_labourer","group":"Job","description":"","variable":"job-labourer{0}","title":"Labourer","subGroup":"Athlete","descriptions":["Some tasks simply require sustained effort and the labourer is keenly built to retain their endurance for such situations. With many techniques that allow them to maintain energy, the labourer can keep energy high and hold out to the end of a task.\nA labourer appreciates training in the endurance skill as it allows them to make full use of all of their techniques, however this is far from a mandatory skill. Much like all athletes, the quickness attribute will help a labourer maintain sustained and fast movement."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Tactician":{"name":"Job_Tactician","fieldName":"job_tactician","group":"Job","description":"","variable":"job-tactician{0}","title":"Tactician","subGroup":"Strategist","descriptions":["Tacticians are masters of controlling a battlefield. Their techniques emphasize positioning and allow them to move their allies and grant them bonus actions. \nA tactician's techniques require them to be close to their allies with a slight lean towards being in melee so anything to help defend them in this position is helpful. \nA tactician benefits from training in the Analyze skill as some of its techniques require it to unlock their full potential. As such, tacticians also appreciate a high Reason attribute to bolster their skill to the fullest. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Magus":{"name":"Job_Magus","fieldName":"job_magus","group":"Job","description":"","variable":"job-magus{0}","title":"Magus","subGroup":"Strategist","descriptions":["A master of the envocation, the magus is an area manipulator and trickster. By creating fields, mists, fires, and floods, the magus seeks to spread ether to hinder their foes.\nThe magus has many ways to bolster their envocation techniques; learning some will allow you to take advantage of these benefits. The magus lacks methods to truly defend themselves and benefits well from protection.\nThe channel skill is often used to empower envocation techniques and therefore will always be a great technique for magi. As such, a high intuition is quite beneficial to them."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Scholar":{"name":"Job_Scholar","fieldName":"job_scholar","group":"Job","description":"","variable":"job-scholar{0}","title":"Scholar","subGroup":"Strategist","descriptions":["A scholar is an expert in information and rational thinking. Their expertise gives them innate advantages when recalling facts. \nWith this knowledge, scholars can use it to back their own arguments. They benefit from techniques that allow them to use the rationalize skill to help convince others of their opinions. \nHaving many Lore Knowledges is always helpful to a scholar. Rationalize is an important skill for scholars that want to use their knowledge in social conflict. Because of these skills, scholars tend to benefit from a high reason attribute. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Inquisitor":{"name":"Job_Inquisitor","fieldName":"job_inquisitor","group":"Job","description":"","variable":"job-inquisitor{0}","title":"Inquisitor","subGroup":"Strategist","descriptions":["The inquisitor is a master of analyzing people for what they may be hiding. An inquisitor is especially skilled at learning a character's motivations and can do with this information as they see fit.\nAn inquisitor gains a variety of ways to learn influences but lacks methods to capitaliize on this information. Learning techniques that allow the inquisitor to reduce a character's willpower can be of a large boon to the inquisitor as their own techniques can reduce it.\nThe analyze skill is the inquisitor's most important skill as it is foundational to all of its deductions. Having a high reason attribute can help with these checks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Detective":{"name":"Job_Detective","fieldName":"job_detective","group":"Job","description":"","variable":"job-detective{0}","title":"Detective","subGroup":"Waymaker","descriptions":["Always on the hunt for clues, the detective is a master of analyzing a case. Skilled in environmental awareness, a detective can find anything out of place and reveal the truths of the world. \nA detective is best when needing to search an environment for anything out of place. Learning techniques that allow the detective to enhance their searching ability usually pairs well with their abilities.\nThe search skill shows up often in the detective's techniques as it is used to find clues and learn information. Having a high insight attribute can help with these checks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Culinarian":{"name":"Job_Culinarian","fieldName":"job_culinarian","group":"Job","description":"","variable":"job-culinarian{0}","title":"Culinarian","subGroup":"Waymaker","descriptions":["Creating wonderfully nutritious meals to benefit their companions, a culinarian is a master of food. When preparing for an adventure, a culinarian's skill with food preparation are unmatched.\nA culinarian doesn't benefit much from specific techniques as most styles do not grant bonuses to cooking.\nThe cook skill is very important for a culinarian. As such, a high insight attribute can help make these checks even better."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Bard":{"name":"Job_Bard","fieldName":"job_bard","group":"Job","description":"","variable":"job-bard{0}","title":"Bard","subGroup":"Waymaker","descriptions":["Bards are amazing performers that inspire their allies. They have many abilities that grant advantage on skill checks allowing their allies to act at their best capabilities. They also have a great ability to heal Will.\nA bard works best when it can inspire others, so having additional ways to grant advantages is usually a boon for the bard. Unlike many Advocate jobs, a bard can function well in a battlefield but you may want to find ways to bolster its survivability when doing this.\nA bard benefits from having training in the Inspire skill as many of its techniques unlock additional effects with a good check. As such, bards tend to appreciate a high conviction attribute."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Medic":{"name":"Job_Medic","fieldName":"job_medic","group":"Job","description":"","variable":"job-medic{0}","title":"Medic","subGroup":"Waymaker","descriptions":["The medic is a medical practitioner and expert healer. They provide action efficient healing with Medkits and can remove conditions easily.\nWhile the medic can heal with its own techniques, it lacks any kind of range with its skills. Longer range healing or methods to increase their movement can help with this constraint.\nMedics benefit from having training in the fortify skill as they can provide extra effects with this skill. As such, the intuition attribute can help bolster their heal checks. As with all waymakers, medics also appreciate a good conviction score to improve their willpower."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Spellwright":{"name":"Job_Spellwright","fieldName":"job_spellwright","group":"Job","description":"","variable":"job-spellwright{0}","title":"Spellwright","subGroup":"Waymaker","descriptions":["A spellwright is a master of shaping magic which allows one to transmute material quickly into objects and structures. \nWhile a spellwright is able to perform marvelous feats to objects, they innately lack any techniques to create them. A spellwright needs access to techniques that will allow them to create objects and structures to make full use of their skills.\nThe shape skill is required to make full use of a spellwright's abilities. Naturally, they also enjoy a high body attribute to further bolster their shape skill. Otherwise, like many Waymakers, conviction is also a strong attribute."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Empath":{"name":"Job_Empath","fieldName":"job_empath","group":"Job","description":"","variable":"job-empath{0}","title":"Empath","subGroup":"Advocate","descriptions":["An empath is an expert in helping others reduce the tension in their lives. They can help calm negative emotions and reduce damage against will, even stepping in when times are tough.\nWhile an empath can reduce the amount of incoming Will damage, they lack much to progress in a social conflict. Treat them as a defensive tool against aggressive will attacks.\nAs their name suggests, an empath benefits from the empathy skill as many of their techniques become more powerful with successful checks. Similarly, an empath enjoys a high intuition attribute to bolster their empathy skill."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Merchant":{"name":"Job_Merchant","fieldName":"job_merchant","group":"Job","description":"","variable":"job-merchant{0}","title":"Merchant","subGroup":"Advocate","descriptions":["The merchant is an expert negotiator. By gaining bonuses when granting favor and having methods to prevent a failed request, a merchant will make the sale - whether its a product or an earnest request. \nMerchants excel when they are able to increase favor and have methods to accelerate their favor gain. They lack methods to manipulate another's influences so having techniques or another's help in this area is usually fruitful.\nThe charm skill is very helpful to the merchant as it unlocks many of the techniques of the merchant. As such, a high Insight attribute is usually appreciated by a merchant."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Orator":{"name":"Job_Orator","fieldName":"job_orator","group":"Job","description":"","variable":"job-orator{0}","title":"Orator","subGroup":"Advocate","descriptions":["Orators are excellent at convincing others to follow their whims. With their carefully crafted words, they pull others into their charms and use implication to carve through an argument.\nThe orator is exceptional at attacking another's will and converting it into favor for themselves. They prefer having techniques that compliment this play style, preferring to break anothers' will over anything else.\nWhen building an orator, the Misdirect skill is very useful to make their techniques more effective. As such, mesmers tend to enjoy a high conviction attribute. Insight is also great to improve their own willpower."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Hardliner":{"name":"Job_Hardliner","fieldName":"job_hardliner","group":"Job","description":"","variable":"job-hardliner{0}","title":"Hardliner","subGroup":"Advocate","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Etherealist":{"name":"Job_Etherealist","fieldName":"job_etherealist","group":"Job","description":"","variable":"job-etherealist{0}","title":"Etherealist","subGroup":"Esper","descriptions":["Communicators with spirits and the ethereal, an etherealist is a master of the spirit realm. As much of their communication has come in the form of emotional awareness, they've become excellent readers of ones thoughts and hidden influences.\nThe etherealist gains many techniques that allow them to easily communicate with spirits, however lacks many options to aid themselves directly in conversation. Having a method to reliably make requests is likely to help the etherealist blossom.\nBoth the resonance and empathy skills are very useful to the etherealist as many of their techniques key off of these. As such, intuition is a highly valuable attribute to an etherealist."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Job_Shade":{"name":"Job_Shade","fieldName":"job_shade","group":"Job","description":"","variable":"job-shade{0}","title":"Shade","subGroup":"Esper","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Fighter":{"name":"JStyle_Fighter","fieldName":"jstyle_fighter","group":"JobStyle","description":"","variable":"jbs-fighter{0}","title":"Fighter","subGroup":"Vanguard","descriptions":["The art of war is about being the one that survives to the end and the fighter is the embodiment of this. Armed with methods to self sustain and heal, the fighter is a well spring of sustained combat.\nThe fighter is made to be very self sufficient, however it excels most when it can be provided healing. A teammate that can heal the fighter without spending its resources will see the fighter staying more effective.\nFighters like having a high body attribute as it increases their HP stat. The fighter doesn't want for any particular skills however might will allow it to use its body attribute to attack as well."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Sentinel":{"name":"JStyle_Sentinel","fieldName":"jstyle_sentinel","group":"JobStyle","description":"","variable":"jbs-sentinel{0}","title":"Sentinel","subGroup":"Vanguard","descriptions":["Ever on the lookout for their allies, the sentinel is a protector and wall. The sentinel excels at defense and will throw themselves into the line of danger whenever and wherever their allies are threatened.\nThe sentinel's abilities allow it to move across the battlefield to protect allies and take attacks, but its range is often short. The sentinel can find itself struggling against ranged attackers so having some way to deal with those is usually helpful for the sentinel.\nSentinels appreciate both a high body and precision attribute as the former will raise its HP and some of its techniques require the latter. The sentinel will do well with training in the skirmish skill as its techniques key off of it."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Warden":{"name":"JStyle_Warden","fieldName":"jstyle_warden","group":"JobStyle","description":"","variable":"jbs-warden{0}","title":"Warden","subGroup":"Vanguard","descriptions":["The warden is a master of the ethereal, able to weave it into armor to protect themselves and their allies. By providing temporary shields, a warden is a fluid defender prioritizing charging into battle.\nThe warden has a few ways to defend themselves but especially in melee combat does the full arsenal unlock. As such, learning additional techniques to improve their melee combat is beneficial to the warden.\nAs their mantles are based on the enchant skill, wardens often do well with the skill trained. Like all vanguards, wardens want a high body attribute along with a high quickness for their enchant."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Bulwark":{"name":"JStyle_Bulwark","fieldName":"jstyle_bulwark","group":"JobStyle","description":"","variable":"jbs-bulwark{0}","title":"Bulwark","subGroup":"Vanguard","descriptions":["Bulwarks are masters of conjury as they use their skills to instantly materialize structures. With this skill they create blockades to funnel foes and shield their allies.\nThe Bulwark can gain many benefits when using techniques that use the Materialize trait, however lacks any techniques to do so naturally. The job is created with walls in mind and providing structures for cover.\nConjure is a very useful skill for Bulwark as it allows them to provide bonuses to the objects they create. Body is also a great attribute to have as it bolsters their own HP and provides bonuses to the conjure skill."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Hunter":{"name":"JStyle_Hunter","fieldName":"jstyle_hunter","group":"JobStyle","description":"","variable":"jbs-hunter{0}","title":"Hunter","subGroup":"Operator","descriptions":["Stalking their prey, a hunter is a focused predator of their enemies. By assigning a creature as their quarry, a hunter can track them easily and strike with pinpoint accuracy through any armor they possess.\nA hunter is best utilized as a ranged attacker and benefits from attacks that keep them at a distance. They also fair very well against heavily armored characters due to their ability to add armor-piercing to their ranged attacks.\nGiving the hunter training in the shoot skill will always be beneficial as many of its abilities require its use. As such, hunters appreciate a high precision attribute to help support their techniques."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Sniper":{"name":"JStyle_Sniper","fieldName":"jstyle_sniper","group":"JobStyle","description":"","variable":"jbs-sniper{0}","title":"Sniper","subGroup":"Operator","descriptions":["The sniper is a damage focused job that protects itself by keeping its distance. It is known for its accuracy, even allowing it to see through soft cover allowing it to counter those who may try to hide in mist or fog on a battlefield.\nA Sniper benefits from using techniques from a long range. Styles that allow a sniper to maintain distance are to its benefit. While distance will allow a Sniper some amount of protection, having ways to maintain cover or create it are always beneficial to a Sniper.\nSnipers like to have a high Precision attribute to allow it to use its Shoot-based techniques accurately. Likewise, a Sniper benefits from having training in the Shoot skill."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Trooper":{"name":"JStyle_Trooper","fieldName":"jstyle_trooper","group":"JobStyle","description":"","variable":"jbs-trooper{0}","title":"Trooper","subGroup":"Operator","descriptions":["Staying guard over their watch, a trooper is a master of keeping guard over an area. Those who enter a trooper's overwatch are bound to be hit with the trooper's variety of techniques.\nA trooper tends to benefit from ranged techniques of all types, as long as the character can use them within the trooper's medium length range.\nTroopers tend to prefer a high precision and shoot skill to allow them to make full use of their kit. As such, a trooper should also be built to have a ranged weapon in hand."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Warmage":{"name":"JStyle_Warmage","fieldName":"jstyle_warmage","group":"JobStyle","description":"","variable":"jbs-warmage{0}","title":"Warmage","subGroup":"Operator","descriptions":["By covering the field in explosions, the warmage intends to level groups. They provide methods to improve area attacks allowing them to shield their allies from their attacks.\nWith a lot of emphasis on area attacks, techniques that target bursts, blasts, and cones are always useful to the warmage - but especially any blast abilities.\nThere are a variety of techniques that can create area effects, but damaging ones typically are keyed off of shoot or throw skills. As with all operators, the warmage enjoys some benefit from a high precion attribute."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Alchemist":{"name":"JStyle_Alchemist","fieldName":"jstyle_alchemist","group":"JobStyle","description":"","variable":"jbs-alchemist{0}","title":"Alchemist","subGroup":"Operator","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Brawler":{"name":"JStyle_Brawler","fieldName":"jstyle_brawler","group":"JobStyle","description":"","variable":"jbs-brawler{0}","title":"Brawler","subGroup":"Athlete","descriptions":["The brawler is a fistfighter keen on getting into the fight. They specialize at weakening foes so that they can setup combos for themselves and others - both on their own turns and on their allies' by setting up flanking opportunities.\nA brawler can reliably inflict its targets with the Hindered status. As such, the brawler pairs well with any techniques that allow the brawler or its teammates to take advantage of the Hindered status.\nA brawler appreciates both a high body and quickness attribute. The former as the grappling skill keys off of it while quickness will grant the brawler a lot of move speed. Grappling is a very useful skill for the brawler as its main techniques require it."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Kineticist":{"name":"JStyle_Kineticist","fieldName":"jstyle_kineticist","group":"JobStyle","description":"","variable":"jbs-kineticist{0}","title":"Kineticist","subGroup":"Athlete","descriptions":["The kineticist is a highly mobile caster that expertly throws objects and magic. By attacking, the kineticist stores excess ki into their body to release it into a burst of movement.\nWhen building a kineticist, try to focus on techniques that will allow them to attack from a short distance or benefit from movement. The kineticist lacks ways to protect themselves so any defensive techniques are likely to help a kineticist.\nKineticists tend to benefit from a high precision and quickness attribute. Kinesis is always helpful to train as it allows a Kineticist to make full use of their abilities."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Rogue":{"name":"JStyle_Rogue","fieldName":"jstyle_rogue","group":"JobStyle","description":"","variable":"jbs-rogue{0}","title":"Rogue","subGroup":"Athlete","descriptions":["The rogue is an expert at exploiting distractions and disappearing quickly. Their abilities allow them to strike hard then disappear into hiding again.\nWhile the rogue can hide in cover more easily than most, they lack a method to reliably create cover. They pair well with techniques and teammates that can create that cover for them.\nRogues, like all athletes, prefer having a high quickness to gain a lot of movement. Many rogues will find training in sneak and finesse skills will be advantageous to their job but aren't necessary to succeed."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Labourer":{"name":"JStyle_Labourer","fieldName":"jstyle_labourer","group":"JobStyle","description":"","variable":"jbs-labourer{0}","title":"Labourer","subGroup":"Athlete","descriptions":["Some tasks simply require sustained effort and the labourer is keenly built to retain their endurance for such situations. With many techniques that allow them to maintain energy, the labourer can keep energy high and hold out to the end of a task.\nA labourer appreciates training in the endurance skill as it allows them to make full use of all of their techniques, however this is far from a mandatory skill. Much like all athletes, the quickness attribute will help a labourer maintain sustained and fast movement."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Tactician":{"name":"JStyle_Tactician","fieldName":"jstyle_tactician","group":"JobStyle","description":"","variable":"jbs-tactician{0}","title":"Tactician","subGroup":"Strategist","descriptions":["Tacticians are masters of controlling a battlefield. Their techniques emphasize positioning and allow them to move their allies and grant them bonus actions. \nA tactician's techniques require them to be close to their allies with a slight lean towards being in melee so anything to help defend them in this position is helpful. \nA tactician benefits from training in the Analyze skill as some of its techniques require it to unlock their full potential. As such, tacticians also appreciate a high Reason attribute to bolster their skill to the fullest. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Magus":{"name":"JStyle_Magus","fieldName":"jstyle_magus","group":"JobStyle","description":"","variable":"jbs-magus{0}","title":"Magus","subGroup":"Strategist","descriptions":["A master of the envocation, the magus is an area manipulator and trickster. By creating fields, mists, fires, and floods, the magus seeks to spread ether to hinder their foes.\nThe magus has many ways to bolster their envocation techniques; learning some will allow you to take advantage of these benefits. The magus lacks methods to truly defend themselves and benefits well from protection.\nThe channel skill is often used to empower envocation techniques and therefore will always be a great technique for magi. As such, a high intuition is quite beneficial to them."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Scholar":{"name":"JStyle_Scholar","fieldName":"jstyle_scholar","group":"JobStyle","description":"","variable":"jbs-scholar{0}","title":"Scholar","subGroup":"Strategist","descriptions":["A scholar is an expert in information and rational thinking. Their expertise gives them innate advantages when recalling facts. \nWith this knowledge, scholars can use it to back their own arguments. They benefit from techniques that allow them to use the rationalize skill to help convince others of their opinions. \nHaving many Lore Knowledges is always helpful to a scholar. Rationalize is an important skill for scholars that want to use their knowledge in social conflict. Because of these skills, scholars tend to benefit from a high reason attribute. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Inquisitor":{"name":"JStyle_Inquisitor","fieldName":"jstyle_inquisitor","group":"JobStyle","description":"","variable":"jbs-inquisitor{0}","title":"Inquisitor","subGroup":"Strategist","descriptions":["The inquisitor is a master of analyzing people for what they may be hiding. An inquisitor is especially skilled at learning a character's motivations and can do with this information as they see fit.\nAn inquisitor gains a variety of ways to learn influences but lacks methods to capitaliize on this information. Learning techniques that allow the inquisitor to reduce a character's willpower can be of a large boon to the inquisitor as their own techniques can reduce it.\nThe analyze skill is the inquisitor's most important skill as it is foundational to all of its deductions. Having a high reason attribute can help with these checks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Detective":{"name":"JStyle_Detective","fieldName":"jstyle_detective","group":"JobStyle","description":"","variable":"jbs-detective{0}","title":"Detective","subGroup":"Waymaker","descriptions":["Always on the hunt for clues, the detective is a master of analyzing a case. Skilled in environmental awareness, a detective can find anything out of place and reveal the truths of the world. \nA detective is best when needing to search an environment for anything out of place. Learning techniques that allow the detective to enhance their searching ability usually pairs well with their abilities.\nThe search skill shows up often in the detective's techniques as it is used to find clues and learn information. Having a high insight attribute can help with these checks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Culinarian":{"name":"JStyle_Culinarian","fieldName":"jstyle_culinarian","group":"JobStyle","description":"","variable":"jbs-culinarian{0}","title":"Culinarian","subGroup":"Waymaker","descriptions":["Creating wonderfully nutritious meals to benefit their companions, a culinarian is a master of food. When preparing for an adventure, a culinarian's skill with food preparation are unmatched.\nA culinarian doesn't benefit much from specific techniques as most styles do not grant bonuses to cooking.\nThe cook skill is very important for a culinarian. As such, a high insight attribute can help make these checks even better."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Bard":{"name":"JStyle_Bard","fieldName":"jstyle_bard","group":"JobStyle","description":"","variable":"jbs-bard{0}","title":"Bard","subGroup":"Waymaker","descriptions":["Bards are amazing performers that inspire their allies. They have many abilities that grant advantage on skill checks allowing their allies to act at their best capabilities. They also have a great ability to heal Will.\nA bard works best when it can inspire others, so having additional ways to grant advantages is usually a boon for the bard. Unlike many Advocate jobs, a bard can function well in a battlefield but you may want to find ways to bolster its survivability when doing this.\nA bard benefits from having training in the Inspire skill as many of its techniques unlock additional effects with a good check. As such, bards tend to appreciate a high conviction attribute."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Medic":{"name":"JStyle_Medic","fieldName":"jstyle_medic","group":"JobStyle","description":"","variable":"jbs-medic{0}","title":"Medic","subGroup":"Waymaker","descriptions":["The medic is a medical practitioner and expert healer. They provide action efficient healing with Medkits and can remove conditions easily.\nWhile the medic can heal with its own techniques, it lacks any kind of range with its skills. Longer range healing or methods to increase their movement can help with this constraint.\nMedics benefit from having training in the fortify skill as they can provide extra effects with this skill. As such, the intuition attribute can help bolster their heal checks. As with all waymakers, medics also appreciate a good conviction score to improve their willpower."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Spellwright":{"name":"JStyle_Spellwright","fieldName":"jstyle_spellwright","group":"JobStyle","description":"","variable":"jbs-spellwright{0}","title":"Spellwright","subGroup":"Waymaker","descriptions":["A spellwright is a master of shaping magic which allows one to transmute material quickly into objects and structures. \nWhile a spellwright is able to perform marvelous feats to objects, they innately lack any techniques to create them. A spellwright needs access to techniques that will allow them to create objects and structures to make full use of their skills.\nThe shape skill is required to make full use of a spellwright's abilities. Naturally, they also enjoy a high body attribute to further bolster their shape skill. Otherwise, like many Waymakers, conviction is also a strong attribute."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[]
                ,
                "isResource":"","requirements":"None"},
            "JStyle_Empath":{"name":"JStyle_Empath","fieldName":"jstyle_empath","group":"JobStyle","description":"","variable":"jbs-empath{0}","title":"Empath","subGroup":"Advocate","descriptions":["An empath is an expert in helping others reduce the tension in their lives. They can help calm negative emotions and reduce damage against will, even stepping in when times are tough.\nWhile an empath can reduce the amount of incoming Will damage, they lack much to progress in a social conflict. Treat them as a defensive tool against aggressive will attacks.\nAs their name suggests, an empath benefits from the empathy skill as many of their techniques become more powerful with successful checks. Similarly, an empath enjoys a high intuition attribute to bolster their empathy skill."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Merchant":{"name":"JStyle_Merchant","fieldName":"jstyle_merchant","group":"JobStyle","description":"","variable":"jbs-merchant{0}","title":"Merchant","subGroup":"Advocate","descriptions":["The merchant is an expert negotiator. By gaining bonuses when granting favor and having methods to prevent a failed request, a merchant will make the sale - whether its a product or an earnest request. \nMerchants excel when they are able to increase favor and have methods to accelerate their favor gain. They lack methods to manipulate another's influences so having techniques or another's help in this area is usually fruitful.\nThe charm skill is very helpful to the merchant as it unlocks many of the techniques of the merchant. As such, a high Insight attribute is usually appreciated by a merchant."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Orator":{"name":"JStyle_Orator","fieldName":"jstyle_orator","group":"JobStyle","description":"","variable":"jbs-orator{0}","title":"Orator","subGroup":"Advocate","descriptions":["Orators are excellent at convincing others to follow their whims. With their carefully crafted words, they pull others into their charms and use implication to carve through an argument.\nThe orator is exceptional at attacking another's will and converting it into favor for themselves. They prefer having techniques that compliment this play style, preferring to break anothers' will over anything else.\nWhen building an orator, the Misdirect skill is very useful to make their techniques more effective. As such, mesmers tend to enjoy a high conviction attribute. Insight is also great to improve their own willpower."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Hardliner":{"name":"JStyle_Hardliner","fieldName":"jstyle_hardliner","group":"JobStyle","description":"","variable":"jbs-hardliner{0}","title":"Hardliner","subGroup":"Advocate","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Etherealist":{"name":"JStyle_Etherealist","fieldName":"jstyle_etherealist","group":"JobStyle","description":"","variable":"jbs-etherealist{0}","title":"Etherealist","subGroup":"Esper","descriptions":["Communicators with spirits and the ethereal, an etherealist is a master of the spirit realm. As much of their communication has come in the form of emotional awareness, they've become excellent readers of ones thoughts and hidden influences.\nThe etherealist gains many techniques that allow them to easily communicate with spirits, however lacks many options to aid themselves directly in conversation. Having a method to reliably make requests is likely to help the etherealist blossom.\nBoth the resonance and empathy skills are very useful to the etherealist as many of their techniques key off of these. As such, intuition is a highly valuable attribute to an etherealist."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "JStyle_Shade":{"name":"JStyle_Shade","fieldName":"jstyle_shade","group":"JobStyle","description":"","variable":"jbs-shade{0}","title":"Shade","subGroup":"Esper","descriptions":[""],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","requirements":"None"},
            "Stat_Blinded":{"name":"Stat_Blinded","fieldName":"stat_blinded","group":"Status","description":"","variable":"sts-blinded{0}","title":"Blinded","subGroup":"Status","descriptions":["A blinded character cannot see and automatically fails any skill checks requiring line of sight and has +1 Disadvantage on all Active skill checks. Characters have +1 Advantage when attacking this character."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"15","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Downed":{"name":"Stat_Downed","fieldName":"stat_downed","group":"Status","description":"","variable":"sts-downed{0}","title":"Downed","subGroup":"Status","descriptions":["A downed character is severely injured. You automatically fail all skill checks from the active category. All attacks against this character have +1 Advantage and they receive no Move Charge at the start of a round. \nThis condition ends automatically after 1 hour of rest."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Cannot use Attack or Activity Techniques\nIncoming attacks +1 Adv.\nNo Start of Round Move Charge.","points":"5","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Dying":{"name":"Stat_Dying","fieldName":"stat_dying","group":"Status","description":"","variable":"sts-dying{0}","title":"Dying","subGroup":"Status","descriptions":["A dying character will usually also gain the unconscious condition. At the start of each round, a dying character rolls 2d6. On a 7 or lower, they lose [20 x CR] HP. On a 12 they lose the dying condition. If a character's HP reduces to 0 while dying, the character dies. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"5","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Engaged":{"name":"Stat_Engaged","fieldName":"stat_engaged","group":"Status","description":"","variable":"sts-engaged{0}","title":"Engaged","subGroup":"Status","descriptions":["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose all Move Charge."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"If moving when gaining this status, lose all move charge.","points":"0","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Ethereal":{"name":"Stat_Ethereal","fieldName":"stat_ethereal","group":"Status","description":"","variable":"sts-ethereal{0}","title":"Ethereal","subGroup":"Status","descriptions":["You are in the spirit realm. If you have a physical body it is treated as unconscious. Nothing in the physical plane may interact with your ethereal form and likewise, you may not interact with characters or objects in the physical plane."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Is in Spirit Realm.","points":"0","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Exhausted":{"name":"Stat_Exhausted","fieldName":"stat_exhausted","group":"Status","description":"","variable":"sts-exhausted{0}","title":"Exhausted","subGroup":"Status","descriptions":["You are exhausted from lack of rest. You have +1 Disadvantage on all checks. Exhausted can only be removed by completing a Long Rest."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Float":{"name":"Stat_Float","fieldName":"stat_float","group":"Status","description":"","variable":"sts-float{0}","title":"Float","subGroup":"Status","descriptions":["The character is floating and does not fall naturally. The character cannot make any voluntary movements except for fly. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Does not fall. Can only use Fly move actions. ","points":"3","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Frozen":{"name":"Stat_Frozen","fieldName":"stat_frozen","group":"Status","description":"","variable":"sts-frozen{0}","title":"Frozen","subGroup":"Status","descriptions":["A frozen character can't use actions or reactions, and cannot move - even involunatarily. Attacks are made against them at +1 Advantage."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"20","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Grappled":{"name":"Stat_Grappled","fieldName":"stat_grappled","group":"Status","description":"","variable":"sts-grappled{0}","title":"Grappled","subGroup":"Status","descriptions":["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes restrained but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Grappling checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\n\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a swift action"],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Cannot Dash or take reactions. The character that is not the controller becomes restrained and moves with the controller.","points":"5","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Hidden":{"name":"Stat_Hidden","fieldName":"stat_hidden","group":"Status","description":"","variable":"sts-hidden{0}","title":"Hidden","subGroup":"Status","descriptions":["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search.\nTo remain hidden, you must not be Engaged and you must either be outside of any enemies’ line of sight, obscured by sufficient cover, or invisible. If you Hide while meeting one of these criteria, you gain the Hidden status.\nHard cover is sufficient to Hide as long as it is large enough to totally conceal you, but soft cover is only sufficient if you are completely inside an area or zone that grants soft cover."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Can't be targeted by hostile techniques.\nDon't cause engaged.\nHostile creatures can only know approximate location.","points":"6","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Invisible":{"name":"Stat_Invisible","fieldName":"stat_invisible","group":"Status","description":"","variable":"sts-invisible{0}","title":"Invisible","subGroup":"Status","descriptions":["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright before an attack roll is made. Attacks made by an Invisible character gain +1 advantage. Invisible characters can always Hide, even without cover."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"All attacks against have a 50 percent chance to miss. Attacks gain +1 advantage.","points":"15","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Paralyzed":{"name":"Stat_Paralyzed","fieldName":"stat_paralyzed","group":"Status","description":"","variable":"sts-paralyzed{0}","title":"Paralyzed","subGroup":"Status","descriptions":["A paralyzed character can't use actions or reactions, and can speak only falteringly. Attacks are made against them at +1 Advantage."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"20","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Restrained":{"name":"Stat_Restrained","fieldName":"stat_restrained","group":"Status","description":"","variable":"sts-restrained{0}","title":"Restrained","subGroup":"Status","descriptions":["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Cannot voluntarily Move.\nAttacks against you gain +1 Advantage.","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Unconscious":{"name":"Stat_Unconscious","fieldName":"stat_unconscious","group":"Status","description":"","variable":"sts-unconscious{0}","title":"Unconscious","subGroup":"Status","descriptions":["An unconscious character cannot take actions, can’t move or speak, and is unaware of its surroundings.\nThe character drops whatever it’s holding and falls prone.\nAll of the character's defenses and senses are considered to be 0."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"25","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Aflame":{"name":"Stat_Aflame","fieldName":"stat_aflame","group":"Status","description":"","variable":"sts-aflame{0}","title":"Aflame","subGroup":"Condition","descriptions":["You are on fire. At the start of each round you take 1d6 fire damage. This condition ends when you are doused by water."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"At start of round, take 1d6 Fire Damage.","points":"6","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Armored":{"name":"Stat_Armored","fieldName":"stat_armored","group":"Status","description":"","variable":"sts-armored{0}","title":"Armored","subGroup":"Condition","descriptions":["You are considered to have additional Armor equal to 2 x your Character Rank.","This Condition ends at the start of the next round."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"6","endsOnRoundStart":true,"endsOnTrigger":false},
            "Stat_Bleeding":{"name":"Stat_Bleeding","fieldName":"stat_bleeding","group":"Status","description":"","variable":"sts-bleeding{0}","title":"Bleeding","subGroup":"Condition","descriptions":["You are bleeding. At the start of each round you take 1d6 tension [AP] damage."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"At start of round, take 1d6 Tension [AP] Damage.","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Chilled":{"name":"Stat_Chilled","fieldName":"stat_chilled","group":"Status","description":"","variable":"sts-chilled{0}","title":"Chilled","subGroup":"Condition","descriptions":["The character's base speed is 0. This condition ends when you are warmed or on fire."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Base Speed is 0.","points":"4","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Dodge":{"name":"Stat_Dodge","fieldName":"stat_dodge","group":"Status","description":"","variable":"sts-dodge{0}","title":"Dodge","subGroup":"Condition","descriptions":["Your Evasion defense increases by 12 vs. the next Attack made against you. This triggers even if the attack does not target Evasion.","This Condition ends when it is triggered or at the start of the next round."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"7","endsOnRoundStart":true,"endsOnTrigger":true},
            "Stat_Encumbered":{"name":"Stat_Encumbered","fieldName":"stat_encumbered","group":"Status","description":"","variable":"sts-encumbered{0}","title":"Encumbered","subGroup":"Condition","descriptions":["Whenever this character gains Move Charge, it is reduced by 3 (minimum 1)."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Move Charge -3 (min 1)","points":"6","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Empowered":{"name":"Stat_Empowered","fieldName":"stat_empowered","group":"Status","description":"","variable":"sts-empowered{0}","title":"Empowered","subGroup":"Condition","descriptions":["The next time you deal damage with an attack and the attack adds your [Power] to the damage, you add 5 to the damage. ","This Condition ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"Add 5 to your [Power] damage.","points":"5","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Hindered":{"name":"Stat_Hindered","fieldName":"stat_hindered","group":"Status","description":"","variable":"sts-hindered{0}","title":"Hindered","subGroup":"Condition","descriptions":["Skill checks against a hindered target receive +1 Advantage. Hindered is also required to use some techniques.","This Condition ends when it is triggered or at the start of the next round."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"3","endsOnRoundStart":true,"endsOnTrigger":true},
            "Stat_Immobilized":{"name":"Stat_Immobilized","fieldName":"stat_immobilized","group":"Status","description":"","variable":"sts-immobilized{0}","title":"Immobilized","subGroup":"Condition","descriptions":["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Impaired":{"name":"Stat_Impaired","fieldName":"stat_impaired","group":"Status","description":"","variable":"sts-impaired{0}","title":"Impaired","subGroup":"Condition","descriptions":["Impaired characters receive +1 Disadvantage on all skill checks."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Jolted":{"name":"Stat_Jolted","fieldName":"stat_jolted","group":"Status","description":"","variable":"sts-jolted{0}","title":"Jolted","subGroup":"Condition","descriptions":["A quickened character cannot become jolted. A jolted character can only perform one quick action on their turn. They cannot perform any full actions. ","This Condition ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Prone":{"name":"Stat_Prone","fieldName":"stat_prone","group":"Status","description":"","variable":"sts-prone{0}","title":"Prone","subGroup":"Condition","descriptions":["Skill checks against Prone targets within range 1 of them receive +1 Advantage. \nProne characters count as moving in difficult terrain. Characters can stand and remove Prone by spending 2 Move Charge, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"4","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Quickened":{"name":"Stat_Quickened","fieldName":"stat_quickened","group":"Status","description":"","variable":"sts-quickened{0}","title":"Quickened","subGroup":"Condition","descriptions":["On your turn, you can perform one additional Quick action. If you are jolted, the jolted condition immediately ends. If you are stunned, both this condition and the stunned condition ends. ","This Condition ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"12","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Shielded":{"name":"Stat_Shielded","fieldName":"stat_shielded","group":"Status","description":"","variable":"sts-shielded{0}","title":"Shielded","subGroup":"Condition","descriptions":["The next time you take damage, halve the damage.","This Condition ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"6","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Sickened":{"name":"Stat_Sickened","fieldName":"stat_sickened","group":"Status","description":"","variable":"sts-sickened{0}","title":"Sickened","subGroup":"Condition","descriptions":["Sickened characters receive +1 Disadvantage on all skill checks. You can't willingly ingest anything while Sickened."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Stunned":{"name":"Stat_Stunned","fieldName":"stat_stunned","group":"Status","description":"","variable":"sts-stunned{0}","title":"Stunned","subGroup":"Condition","descriptions":["A stunned character can only perform one quick action on their turn. They cannot perform any full actions. If you are quickened, both this condition and the quickened condition ends."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"12","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Angered":{"name":"Stat_Angered","fieldName":"stat_angered","group":"Status","description":"","variable":"sts-angered{0}","title":"Angered","subGroup":"Emotion","descriptions":["The character is furious with another character. When this character makes an attack or social skill check and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the skill check. An Angered character can only have one character be the target of this emotion and will have the target replaced by a new target if this emotion is gained again. If you are calmed, the calmed emotion ends."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Calmed":{"name":"Stat_Calmed","fieldName":"stat_calmed","group":"Status","description":"","variable":"sts-calmed{0}","title":"Calmed","subGroup":"Emotion","descriptions":["You lose 1 impatience at the start of the round. If you are angered or frightened, the angered and frightened emotions end."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"10","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Doubt":{"name":"Stat_Doubt","fieldName":"stat_doubt","group":"Status","description":"","variable":"sts-doubt{0}","title":"Doubt","subGroup":"Emotion","descriptions":["At the start of the round, you lose 5 x CR Willpower. This cannot cause a Will Break."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Encouraged":{"name":"Stat_Encouraged","fieldName":"stat_encouraged","group":"Status","description":"","variable":"sts-encouraged{0}","title":"Encouraged","subGroup":"Emotion","descriptions":["As a swift action, gain +1 Advantage on your next skill check.","This Emotion ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"5","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Frightened":{"name":"Stat_Frightened","fieldName":"stat_frightened","group":"Status","description":"","variable":"sts-frightened{0}","title":"Frightened","subGroup":"Emotion","descriptions":["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. A frightened character can only have one character be the target of this emotion and will have the target replaced by a new target if this emotion is gained again. If you are calmed, the calmed emotion ends."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Flustered":{"name":"Stat_Flustered","fieldName":"stat_flustered","group":"Status","description":"","variable":"sts-flustered{0}","title":"Flustered","subGroup":"Emotion","descriptions":["All skill checks against a flustered target receive +1 Advantage and persuade checks against the target increase by 3. "],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"5","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Overjoyed":{"name":"Stat_Overjoyed","fieldName":"stat_overjoyed","group":"Status","description":"","variable":"sts-overjoyed{0}","title":"Overjoyed","subGroup":"Emotion","descriptions":["As a reaction to failing a skill check, reroll the skill check.","This Emotion ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"10","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Persevering":{"name":"Stat_Persevering","fieldName":"stat_persevering","group":"Status","description":"","variable":"sts-persevering{0}","title":"Persevering","subGroup":"Emotion","descriptions":["As a swift action, end one condition affecting you. ","This Emotion ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"10","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Receptive":{"name":"Stat_Receptive","fieldName":"stat_receptive","group":"Status","description":"","variable":"sts-receptive{0}","title":"Receptive","subGroup":"Emotion","descriptions":["All persuade checks against the target increase by 4."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"8","endsOnRoundStart":false,"endsOnTrigger":false},
            "Stat_Surprised":{"name":"Stat_Surprised","fieldName":"stat_surprised","group":"Status","description":"","variable":"sts-surprised{0}","title":"Surprised","subGroup":"Emotion","descriptions":["A surprised character can only perform one quick action on their turn. They cannot perform any full actions.","This Emotion ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"10","endsOnRoundStart":false,"endsOnTrigger":true},
            "Stat_Steadfast":{"name":"Stat_Steadfast","fieldName":"stat_steadfast","group":"Status","description":"","variable":"sts-steadfast{0}","title":"Steadfast","subGroup":"Emotion","descriptions":["If you were at more than 1 HP and are reduced to 0, you drop to 1 HP instead. ","This Emotion ends when it is triggered."],
                "abbreviation":"","baseFormula":"","modifiers":"","formula":{"workers":[]},
                "linkedGroups":[],
                "isResource":"","shortDescription":"","points":"12","endsOnRoundStart":false,"endsOnTrigger":true}},
        sortingGroups = {"group":{"Type":["Attribute","Skill","Archetype","Job","JobStyle","Knowledge","Language","LoreCategory","Lore","Style","StyleType","Forme","Action","Technique","System","PageSet","Page","Title","Popup","Data","Advancement","Training","Perk","Defense","Sense","InnateDefenseType","InnateSenseType","General","Chat","Combat","Social","Influence","SeverityRank","DamageType","TerrainFxType","Trait","Status","Condition","Emotion","Boon","PerkGroup","JobGroup","StyleGroup","StyleSubGroup","AdvancedGroup","GearGroup","ResourceType","Goods","Gear","Consumable","Currency","ToolSlot","ConsumableSlot"],"VariableMod":["_max","_true","_rank","_build","_filter","_subfilter","_expand","_tab","_page","_info","_exit","_finish","_origin","_learn","_pts","_tech","_techset","_expertise","_gear","_affinity","_error"],"Attribute":["Attr_BOD","Attr_PRC","Attr_QCK","Attr_CNV","Attr_INT","Attr_RSN"],"Untyped":["Check","CombatDetails","FlatDC","BoostStyleTech","BoostGearTech","BoostPerkTech","Ancestry","Affinity","AdvancedAffinity","BonusAttributePoints","JobSlots","AdvancedSlots","StyleSlots","WeaponSlots","EquipmentSlots","EN","Resistance","Weakness","MvCharge","RepeatingInfluences","Loading","TechPopupValues","ItemPopupValues","RepeatingActiveEmotes","RepeatingOutfits","RepeatingJobStyles","RepeatingStyles","RepeatingJobTech","RepeatingAdvTech","RepeatingGearTech","RepeatingBasicActions","RepeatingBasicRecovery","RepeatingBasicAttack","RepeatingBasicSocial","RepeatingBasicSpirit","RepeatingCustomTech","TechActionType","TechName","TechDisplayName","TechResourceData","TechTargetingData","TechTrait","TechTrigger","TechRequirements","TechItemReq","TechFlavorText","TechEffect","TechDef","ItemName","ItemAction","ItemCount","ItemGroup","ItemStats","ItemTrait","ItemDescription","ItemCraftSkill","ItemCraftMats","ItemCraft","RepeatingEquipment","RepeatingConsumables","RepeatingGoods","WeaponDamage","WeaponDamageVal","Move","Adjacency","Obstruction","StrideRoll","MaxStride","FreeMove","Pulled","Pushed","ForceMove","Jump","Fly","Lifting","Falling","Teleport"],"Title":["Title_Boon","Title_UsingInfluences","Title_Origin","Title_Background","Title_OriginAdvancement","Title_OriginTraining","Title_Advancement","Title_AdvancementConversion","Title_Training","Title_TrainingConversion","Title_ShowTechnique","Title_UseTechnique","Title_Chat","Title_LanguageSelect","Title_Skills","Title_Emotes","Title_Outfits","Title_EquippedGear","Title_ResourceCost","Title_Targetting","Title_Range","Title_Patterns","Title_ValidTargets","Title_LineOfSight","Title_Cover","Title_TechEffect","Title_TechDC","Title_TechEvasion","Title_TechDefense","Title_TechOnRound","Title_TechOnTurn","Title_TechOnEnter","Title_TechOnEndFocus","Title_TechNewTargets"],"Advancement":["Level","CR","MaxCR","XP","AdvancementJob","AdvancementSkill","AdvancementTechnique","JobTier","JobTechniques","LearnStyle","StyleTechniques","StyleFreeTechniques"],"Training":["TrainingKnowledge","TrainingTechniques","PP","BonusTraining"],"Defense":["Def_Brace","Def_Fortitude","Def_Warding","Def_Hide","Def_Reflex","Def_Evasion"],"Sense":["Def_Resolve","Def_Freewill","Def_Insight","Def_Notice","Def_Guile","Def_Scrutiny"],"Result":["WillBreak"],"Origin":["CharSheetName","SheetName","FullName","DisplayName","IntroName","QuickDescription","Backstory","Age","Gender","Homeland"],"Currency":["Currency_Jin","Currency_Gold","Currency_CP"],"General":["HP","WILL","StartEN","Power","Accuracy","Artistry","Charisma","Recall","Initiative","CarryingCapacity"],"Combat":["Cmb_Chakra","Cmb_Vitality","Cmb_Surge","Cmb_HV","Cmb_Armor","Cmb_Hardness","Cmb_ResistanceDesc","Cmb_WeaknessDesc","Cmb_Mv","Cmb_MvPotency"],"":["Chakra","Severity"],"Social":["Soc_Favor","Soc_Influence","Soc_InfluenceDesc","Soc_Severity","Soc_RequestCheck","Soc_SupportInfluence","Soc_OpposeInfluence","Soc_Impatience"],"Trait":["Trait_Arcanify","Trait_Arcing","Trait_Break","Trait_Delayed","Trait_Envoke","Trait_Focus","Trait_Holdfast","Trait_Illusion","Trait_Materialize","Trait_Resonator","Trait_Seeking","Trait_Transmute","Trait_AP","Trait_Brutal","Trait_Optional","Trait_Ammunition","Trait_Axe","Trait_Bow","Trait_Ingested","Trait_Hammer","Trait_Handgun","Trait_Inhalent","Trait_Knife","Trait_Longshot","Trait_Loud","Trait_Magitech","Trait_MaxBulk15","Trait_MaxBulk60","Trait_MaxBulk120","Trait_MaxBulk250","Trait_Medkit","Trait_MinBulk15","Trait_MinBulk60","Trait_MinBulk120","Trait_MinBulk250","Trait_MinDust15","Trait_MinDust60","Trait_MinDust120","Trait_Polearm","Trait_Resonant","Trait_Scattershot","Trait_Sharp","Trait_Sturdy","Trait_Sword","Trait_Edible","Trait_Flammable","Trait_Flexible","Trait_Frozen","Trait_Transparent"],"AncestryType":["Human","Spirit"],"AffinityType":["Wood","Fire","Earth","Metal","Water"],"AffinityTypeDesc":["WoodF","FireF","EarthF","MetalF","WaterF"],"InnateDefenseType":["Def_BOD","Def_PRC","Def_QCK"],"InnateSenseType":["Def_CNV","Def_INT","Def_RSN"],"AttributeValue":["AttributeValueMediocre","AttributeValueGreat","AttributeValueGood","AttributeValueAverage","AttributeValueBad"],"JobTier":["JobTier0","JobTier1","JobTier2","JobTier3","JobTier4","JobTier5","JobTier6"],"LoreTier":["LoreTier0","LoreTier1","LoreTier2","LoreTier3"],"GeneralLoreTier":["GeneralLoreTier0","GeneralLoreTier1"],"LoreCategory":["LoreCat_Academics","LoreCat_Profession","LoreCat_Craftmanship","LoreCat_Geography","LoreCat_History","LoreCat_Culture","LoreCat_Religion"],"ChatType":["Speak","Whisper","Yell","Think","Describe"],"Boon":["Boon_Rest","Boon_Savor","Boon_Truth"],"InfluenceType":["InfluenceTrait","InfluenceIdeal","InfluenceBond","InfluenceGoal"],"SeverityRank":["Svr_LowSeverity","Svr_ModerateSeverity","Svr_HighSeverity"],"DamageType":["Dmg_Burn","Dmg_Cold","Dmg_Energy","Dmg_Fire","Dmg_Force","Dmg_Piercing","Dmg_Shock","Dmg_Tension","Dmg_Weapon"],"TerrainFxType":["Ter_Darkness","Ter_Fog","Ter_Harsh","Ter_Heavy","Ter_Liftstream","Ter_Light","Ter_Slippery","Ter_Sodden"],"PerkGroup":["PerkGroup_Origin Perks","PerkGroup_Stat Boost Perks","PerkGroup_Slot Perks"],"JobGroup":["JobGroup_Vanguard","JobGroup_Operator","JobGroup_Athlete","JobGroup_Strategist","JobGroup_Waymaker","JobGroup_Advocate","JobGroup_Esper"],"StyleGroup":["StyleGroup_Melee Weaponry","StyleGroup_Ranged Weaponry","StyleGroup_Martial Arts","StyleGroup_Arcanification Magic","StyleGroup_Fluctuation Magic","StyleGroup_Materialization Magic","StyleGroup_Transformation Magic","StyleGroup_Athletics","StyleGroup_Speechcraft"],"StyleSubGroup":["StyleSubGroup_Mighty Weapons","StyleSubGroup_Skirmish Weapons","StyleSubGroup_Finesse Weapons","StyleSubGroup_Shoot Weapons","StyleSubGroup_Throw Weapons","StyleSubGroup_Martial Arts","StyleSubGroup_Kinetics","StyleSubGroup_Evocation","StyleSubGroup_Channelling","StyleSubGroup_Enchantment","StyleSubGroup_Fluctuation","StyleSubGroup_Battlesmithing","StyleSubGroup_Conjury","StyleSubGroup_Transmulation","StyleSubGroup_Physiomancy","StyleSubGroup_Brawn","StyleSubGroup_Stealth","StyleSubGroup_Acrobatics","StyleSubGroup_Persuasion","StyleSubGroup_Cunning"],"GearGroup":["GearGroup_HeadGear","GearGroup_FaceGear","GearGroup_ChestGear","GearGroup_ArmGear","GearGroup_LegGear","GearGroup_FootGear"],"PageSet":["PageSet_Character Creator","PageSet_Core","PageSet_TechType","PageSet_Advancement","PageSet_Training"],"Page":["Page_Origin","Page_Jobs","Page_Skills","Page_ActiveSkills","Page_SocialSkills","Page_TechnicalSkills","Page_Knowledge","Page_Attributes","Page_Styles","Page_LearnTechniques","Page_AdvancedStyles","Page_Forme","Page_JobStyles","Page_Character","Page_Overview","Page_OverviewCharacter","Page_OverviewResources","Page_OverviewStatus","Page_Details","Page_Chat","Page_Options","Page_Gear","Page_Equipped","Page_GearCurrency","Page_GearEquipment","Page_GearItems","Page_GearConsumables","Page_GearGoods","Page_SlotEmpty","Page_AddItem","Page_AddMeleeWeapon","Page_AddRangedWeapon","Page_AddTool","Page_AddCommsTool","Page_AddLightTool","Page_AddBindingsTool","Page_AddMiscTool","Page_AddHeadGear","Page_AddFaceGear","Page_AddChestGear","Page_AddArmGear","Page_AddLegGear","Page_AddFootGear","Page_AddMiscGear","Page_AddRecoveryItem","Page_AddTonicItem","Page_AddBombItem","Page_AddBeverageItem","Page_AddMaterial","Page_AddCompound","Page_AddAnimalGood","Page_AddSupplement","Page_AddFruit","Page_AddVegetable","Page_AddStarch","Page_Actions","Page_Training","Page_Advancement","Page_Perks","Page_Sidebar"],"ActiveSkills":["Fight","Cast","Athletics"],"SocialSkills":["Persuade","Cunning"],"TechnicalSkills":["Craft","Device","Investigate"],"Popup":["Popup_PopupActive","Popup_SubMenuActive","Popup_SubMenuActiveId","Popup_InspectPopupActive","Popup_InspectPopupName","Popup_ItemInspectionName","Popup_TechniqueInspectionName","Popup_InspectSelectGroup","Popup_InspectSelectType","Popup_InspectSelectId","Popup_InspectShowAdd","Popup_InspectAddType","Popup_InspectAddClick","Popup_ItemSelectName","Popup_ItemSelectType","Popup_ItemSelectDesc","Popup_ItemSelectIsOn"],"Chat":["Chat_Type","Chat_Target","Chat_Message","Chat_Language","Chat_LanguageTag","Chat_PostContent","Chat_SetId","Chat_Emotes","Chat_DefaultEmote","Chat_PostName","Chat_PostURL","Chat_OutfitName","Chat_OutfitEmotes","Chat_EmoteName","Chat_EmoteURL","Chat_OutfitDefault","Chat_OutfitDefaultURL"],"Forme":["Forme_SeeTechniques","Forme_Name","Forme_Tier","Forme_IsAdvanced","Forme_Actions","Forme_IsEquipped","Forme_Equip","Forme_EquipAdvanced","Forme_Unequip","Forme_JobSlot","Forme_AdvancedSlot","Forme_StyleSlot"],"Action":["Action_Use","Action_Inspect","Action_Actions","Action_SetData","Action_Techniques"],"Gear":["Gear_Equip","Gear_EquipHead","Gear_EquipFace","Gear_EquipChest","Gear_EquipArm","Gear_EquipLeg","Gear_EquipFoot","Gear_Unequip","Gear_Purchase","Gear_Delete","Gear_Inspect","Gear_EquipmentSlot","Gear_ItemName","Gear_ItemActions","Gear_ItemType","Gear_EquipWeapon","Gear_ItemIsEquipped","Gear_ItemEquipMenu","Gear_ItemGroup","Gear_ItemStats","Gear_ItemTrait","Gear_ItemDescription","Gear_WeaponSlot"],"System":["System_Crafting","System_CraftingComponent","System_Cooking","System_HighQualityMeals"],"CraftingComp":["CraftBulk","CraftResources","CraftSkill","CraftDC","CraftTime"],"PatternType":["Line","Cone","Blast","Burst","Zone"],"Rules":["Bulk"],"Style":["Style_Basic Action","Style_Basic Recovery","Style_Basic Attack","Style_Basic Social","Style_Basic Spirit","Style_Hammering Arte","Style_Cleaving Arte","Style_Battering Arte","Style_Berserker Arte","Style_Mauler Arte","Style_Avenger Arte","Style_Chargestrike Arte","Style_Overwhelming Arte","Style_Arcanestrike Arte","Style_Duelist Arte","Style_Swashbuckling Arte","Style_Phalanx Arte","Style_Jumpspear Arte","Style_Spellblade Arte","Style_Fencer Arte","Style_Sky Pike Arte","Style_Finesse Blade Arte","Style_Whip Arte","Style_Flashcut Arte","Style_Trickster Arte","Style_Forceful Fist Arte","Style_Stepflow Arte","Style_Aerial Arte","Style_Wrestling Arte","Style_Galegrip Arte","Style_Powerarm Arte","Style_Swaying Palm Arte","Style_Skyfall Arte","Style_Ironhold Arte","Style_Heaven's Reach Arte","Style_Rapid Strikes Arte","Style_Archery Arte","Style_Trick Arrow Arte","Style_Gunslinger Arte","Style_Sentry Arte","Style_Longsight Arte","Style_Scatterpoint Arte","Style_Bowmaster Arte","Style_Pistolero Arte","Style_Bomber Arte","Style_Daggerthrow Arte","Style_Blasting Flames","Style_Shock Bomb","Style_Arcane Spellshot","Style_Flaming Sphere","Style_Lightning Shot","Style_Area Spark","Style_Binding Cold","Style_Chilling Blast","Style_Hellfire","Style_Storm Caller","Style_Sheer Cold","Style_Whispering Wind","Style_Bursting Fire","Style_Fire Field","Style_Close Circuit","Style_Ice Storm","Style_Manification","Style_Light Control","Style_Darkness Weaving","Style_Sound Control","Style_Arcane Conduit","Style_Freeform Flight","Style_Ether Magic","Style_Time Control","Style_Levitation","Style_Kinetic Assault","Style_Surging Dust","Style_Dust Impact","Style_Propelling Force","Style_Binding Winds","Style_Telekinesis","Style_Windsweep","Style_Gravity Force","Style_Surging Water","Style_Throwcraft","Style_Conjure Blades","Style_Conjure Skyfall","Style_Warsmith","Style_Structural Magic","Style_Clouded Shroud","Style_Arbormaking","Style_Floral Shroud","Style_Smoke Field","Style_Stonemaking","Style_Iron Walls","Style_Glacial Walls","Style_Misty Terrtain","Style_Structural Mastery","Style_Poison Spore","Style_Dust Shaping","Style_Unshaping","Style_Plant Growth","Style_Calming Blooms","Style_Verdant Armory","Style_Terrain Molding","Style_Ground Splitter","Style_Earthen Armory","Style_Water Shape","Style_Icy Terrain","Style_Frozen Armory","Style_Geomancy","Style_Cryomancy","Style_Healing Hands","Style_Earthen Endurance","Style_Propelling Motion","Style_Soul Surge","Style_Blood Flux","Style_Powerwake","Style_Enduring Body","Style_Traversal","Style_Hidden Footing","Style_Remotion","Style_Evasive Maneuvers","Style_Unbeatable Brawn","Style_Unrelenting Motion","Style_Shadow Walking","Style_Reactive Defense","Style_Invigorating Rally","Style_Avowed","Style_Social Grace","Style_Flattery","Style_Deft Negotiator","Style_Sales Tactics","Style_Taunting Wit","Style_Underminer","Style_Intimidating Fear","Style_Beguiling Instinct","Style_Stillheart","Style_Connecting Bond"],"Skill":["Skill_Agility","Skill_Alchemy","Skill_Analyze","Skill_Build","Skill_Channel","Skill_Charm","Skill_Conjure","Skill_Cook","Skill_Demoralize","Skill_Empathy","Skill_Enchant","Skill_Finesse","Skill_Glyphwork","Skill_Grappling","Skill_Heal","Skill_Inspire","Skill_Kinesis","Skill_Might","Skill_Misdirect","Skill_Physique","Skill_Pilot","Skill_Rationalize","Skill_Resonance","Skill_Search","Skill_Shape","Skill_Shoot","Skill_Skirmish","Skill_Sneak","Skill_Throw","Skill_Tinker"],"Language":["Lang_Minere","Lang_Junal","Lang_Apollen","Lang_Lib","Lang_Cert","Lang_Byric","Lang_Dustell","Lang_Muralic","Lang_Shira","Lang_Ciel","Lang_Citeq","Lang_Manstan","Lang_Salkan","Lang_Sansic","Lang_Silq","Lang_Kleikan","Lang_Crinere","Lang_Palmic","Lang_Shorespeak","Lang_Verdeni","Lang_Vulca","Lang_Emotion","Lang_Empathy","Lang_Wolfwarg","Lang_Jovean","Lang_Mytikan"],"Lore":["Lore_Health","Lore_Mana","Lore_Mathematics","Lore_Nature","Lore_School","Lore_Spirit","Lore_Warfare","Lore_Zoology","Lore_Arboriculture","Lore_Farming","Lore_Fishing","Lore_Hunting","Lore_Legal","Lore_Mercantile","Lore_Mining","Lore_Alchemy","Lore_Architecture","Lore_Brewing","Lore_Cooking","Lore_Engineering","Lore_Glassblowing","Lore_Leatherworking","Lore_Sculpting","Lore_Smithing","Lore_Weaving","Lore_Aridsha","Lore_Ceres","Lore_Colswei","Lore_Khem","Lore_Novus","Lore_Walthair","Lore_Wayling","Lore_Ethereal Plane","Lore_Aridsha History","Lore_Ceres History","Lore_Colswei History","Lore_Khem History","Lore_Novus History","Lore_Walthair History","Lore_Wayling History","Lore_Art","Lore_Etiquette","Lore_Fashion","Lore_Games","Lore_Music","Lore_Scribing","Lore_Theater","Lore_Church of Kongkwei","Lore_Guidance","Lore_Life's Circle","Lore_Ocean Court","Lore_Sylvan","Lore_Zushaon"],"Job":["Job_Fighter","Job_Sentinel","Job_Warden","Job_Bulwark","Job_Hunter","Job_Sniper","Job_Trooper","Job_Warmage","Job_Alchemist","Job_Brawler","Job_Kineticist","Job_Rogue","Job_Labourer","Job_Tactician","Job_Magus","Job_Scholar","Job_Inquisitor","Job_Detective","Job_Culinarian","Job_Bard","Job_Medic","Job_Spellwright","Job_Empath","Job_Merchant","Job_Orator","Job_Hardliner","Job_Etherealist","Job_Shade"],"JobStyle":["JStyle_Fighter","JStyle_Sentinel","JStyle_Warden","JStyle_Bulwark","JStyle_Hunter","JStyle_Sniper","JStyle_Trooper","JStyle_Warmage","JStyle_Alchemist","JStyle_Brawler","JStyle_Kineticist","JStyle_Rogue","JStyle_Labourer","JStyle_Tactician","JStyle_Magus","JStyle_Scholar","JStyle_Inquisitor","JStyle_Detective","JStyle_Culinarian","JStyle_Bard","JStyle_Medic","JStyle_Spellwright","JStyle_Empath","JStyle_Merchant","JStyle_Orator","JStyle_Hardliner","JStyle_Etherealist","JStyle_Shade"],"Status":["Stat_Blinded","Stat_Downed","Stat_Dying","Stat_Engaged","Stat_Ethereal","Stat_Exhausted","Stat_Float","Stat_Frozen","Stat_Grappled","Stat_Hidden","Stat_Invisible","Stat_Paralyzed","Stat_Restrained","Stat_Unconscious","Stat_Aflame","Stat_Armored","Stat_Bleeding","Stat_Chilled","Stat_Dodge","Stat_Encumbered","Stat_Empowered","Stat_Hindered","Stat_Immobilized","Stat_Impaired","Stat_Jolted","Stat_Prone","Stat_Quickened","Stat_Shielded","Stat_Sickened","Stat_Stunned","Stat_Angered","Stat_Calmed","Stat_Doubt","Stat_Encouraged","Stat_Frightened","Stat_Flustered","Stat_Overjoyed","Stat_Persevering","Stat_Receptive","Stat_Surprised","Stat_Steadfast"]
            },"subGroup":{"":["Attribute","Skill","Archetype","Job","JobStyle","Knowledge","Language","LoreCategory","Lore","Style","StyleType","Forme","Action","Technique","System","PageSet","Page","Title","Popup","Data","Advancement","Training","Perk","Defense","Sense","InnateDefenseType","InnateSenseType","General","Chat","Combat","Social","Influence","SeverityRank","DamageType","TerrainFxType","Trait","Status","Condition","Emotion","Boon","PerkGroup","JobGroup","StyleGroup","StyleSubGroup","AdvancedGroup","GearGroup","ResourceType","Goods","Gear","Consumable","Currency","ToolSlot","ConsumableSlot","_max","_true","_rank","_build","_filter","_subfilter","_expand","_tab","_page","_info","_exit","_finish","_origin","_learn","_pts","_tech","_techset","_expertise","_gear","_affinity","_error","Attr_BOD","Attr_PRC","Attr_QCK","Attr_CNV","Attr_INT","Attr_RSN","Check","CombatDetails","FlatDC","Title_Boon","BoostStyleTech","BoostGearTech","BoostPerkTech","Level","CR","MaxCR","XP","AdvancementJob","AdvancementSkill","AdvancementTechnique","JobTier","JobTechniques","LearnStyle","StyleTechniques","StyleFreeTechniques","TrainingKnowledge","TrainingTechniques","PP","BonusTraining","WillBreak","CharSheetName","SheetName","FullName","DisplayName","IntroName","QuickDescription","Backstory","Age","Gender","Homeland","Ancestry","Affinity","AdvancedAffinity","BonusAttributePoints","JobSlots","AdvancedSlots","StyleSlots","WeaponSlots","EquipmentSlots","Currency_Jin","Currency_Gold","Currency_CP","HP","WILL","EN","StartEN","Cmb_Chakra","Chakra","Power","Accuracy","Artistry","Charisma","Recall","Initiative","CarryingCapacity","Soc_Favor","RepeatingInfluences","Soc_Influence","Title_UsingInfluences","Soc_InfluenceDesc","Soc_Severity","Severity","Soc_RequestCheck","Soc_SupportInfluence","Soc_OpposeInfluence","Soc_Impatience","Human","Spirit","Wood","WoodF","Fire","FireF","Earth","EarthF","Metal","MetalF","Water","WaterF","Def_BOD","Def_PRC","Def_QCK","Def_CNV","Def_INT","Def_RSN","AttributeValueMediocre","AttributeValueGreat","AttributeValueGood","AttributeValueAverage","AttributeValueBad","JobTier0","JobTier1","JobTier2","JobTier3","JobTier4","JobTier5","JobTier6","LoreTier0","LoreTier1","LoreTier2","LoreTier3","GeneralLoreTier0","GeneralLoreTier1","LoreCat_Academics","LoreCat_Profession","LoreCat_Craftmanship","LoreCat_Geography","LoreCat_History","LoreCat_Culture","LoreCat_Religion","Speak","Whisper","Yell","Think","Describe","Boon_Rest","Boon_Savor","Boon_Truth","InfluenceTrait","InfluenceIdeal","InfluenceBond","InfluenceGoal","Svr_LowSeverity","Svr_ModerateSeverity","Svr_HighSeverity","Dmg_Tension","Ter_Darkness","Ter_Fog","Ter_Harsh","Ter_Heavy","Ter_Liftstream","Ter_Light","Ter_Slippery","Ter_Sodden","PerkGroup_Origin Perks","PerkGroup_Stat Boost Perks","PerkGroup_Slot Perks","JobGroup_Vanguard","JobGroup_Operator","JobGroup_Athlete","JobGroup_Strategist","JobGroup_Waymaker","JobGroup_Advocate","JobGroup_Esper","StyleGroup_Melee Weaponry","StyleGroup_Ranged Weaponry","StyleGroup_Martial Arts","StyleGroup_Arcanification Magic","StyleGroup_Fluctuation Magic","StyleGroup_Materialization Magic","StyleGroup_Transformation Magic","StyleGroup_Athletics","StyleGroup_Speechcraft","GearGroup_HeadGear","GearGroup_FaceGear","GearGroup_ChestGear","GearGroup_ArmGear","GearGroup_LegGear","GearGroup_FootGear","PageSet_Character Creator","PageSet_Core","PageSet_TechType","PageSet_Advancement","PageSet_Training","Page_Origin","Page_Jobs","Page_Skills","Page_ActiveSkills","Fight","Cast","Athletics","Page_SocialSkills","Persuade","Cunning","Page_TechnicalSkills","Craft","Device","Investigate","Page_Knowledge","Page_Attributes","Page_Styles","Page_LearnTechniques","Page_AdvancedStyles","Page_Forme","Page_JobStyles","Page_Character","Page_Overview","Page_OverviewCharacter","Page_OverviewResources","Page_OverviewStatus","Page_Details","Page_Chat","Page_Options","Page_Gear","Page_Equipped","Page_GearCurrency","Page_GearEquipment","Page_GearItems","Page_GearConsumables","Page_GearGoods","Page_SlotEmpty","Page_AddItem","Page_AddMeleeWeapon","Page_AddRangedWeapon","Page_AddTool","Page_AddCommsTool","Page_AddLightTool","Page_AddBindingsTool","Page_AddMiscTool","Page_AddHeadGear","Page_AddFaceGear","Page_AddChestGear","Page_AddArmGear","Page_AddLegGear","Page_AddFootGear","Page_AddMiscGear","Page_AddRecoveryItem","Page_AddTonicItem","Page_AddBombItem","Page_AddBeverageItem","Page_AddMaterial","Page_AddCompound","Page_AddAnimalGood","Page_AddSupplement","Page_AddFruit","Page_AddVegetable","Page_AddStarch","Page_Actions","Page_Training","Page_Advancement","Page_Perks","Page_Sidebar","Title_Origin","Title_Background","Title_OriginAdvancement","Title_OriginTraining","Title_Advancement","Title_AdvancementConversion","Title_Training","Title_TrainingConversion","Title_ShowTechnique","Title_UseTechnique","Title_Chat","Title_LanguageSelect","Title_Skills","Title_Emotes","Title_Outfits","Title_EquippedGear","Loading","Popup_PopupActive","Popup_SubMenuActive","Popup_SubMenuActiveId","Popup_InspectPopupActive","Popup_InspectPopupName","Popup_ItemInspectionName","Popup_TechniqueInspectionName","Popup_InspectSelectGroup","Popup_InspectSelectType","Popup_InspectSelectId","TechPopupValues","ItemPopupValues","Popup_InspectShowAdd","Popup_InspectAddType","Popup_InspectAddClick","Popup_ItemSelectName","Popup_ItemSelectType","Popup_ItemSelectDesc","Popup_ItemSelectIsOn","Chat_Type","Chat_Target","Chat_Message","Chat_Language","Chat_LanguageTag","Chat_PostContent","RepeatingActiveEmotes","Chat_SetId","Chat_Emotes","Chat_DefaultEmote","Chat_PostName","Chat_PostURL","Chat_OutfitName","Chat_OutfitEmotes","Chat_EmoteName","Chat_EmoteURL","RepeatingOutfits","Chat_OutfitDefault","Chat_OutfitDefaultURL","Forme_SeeTechniques","RepeatingJobStyles","RepeatingStyles","Forme_Name","Forme_Tier","Forme_IsAdvanced","Forme_Actions","Forme_IsEquipped","Forme_Equip","Forme_EquipAdvanced","Forme_Unequip","Forme_JobSlot","Forme_AdvancedSlot","Forme_StyleSlot","Action_Use","Action_Inspect","Action_Actions","Action_SetData","Action_Techniques","RepeatingJobTech","RepeatingAdvTech","RepeatingGearTech","RepeatingBasicActions","RepeatingBasicRecovery","RepeatingBasicAttack","RepeatingBasicSocial","RepeatingBasicSpirit","RepeatingCustomTech","TechActionType","TechName","TechDisplayName","TechResourceData","TechTargetingData","TechTrait","TechTrigger","TechRequirements","TechItemReq","TechFlavorText","TechEffect","TechDef","ItemName","ItemAction","ItemCount","ItemGroup","ItemStats","ItemTrait","ItemDescription","ItemCraftSkill","ItemCraftMats","ItemCraft","Gear_Equip","Gear_EquipHead","Gear_EquipFace","Gear_EquipChest","Gear_EquipArm","Gear_EquipLeg","Gear_EquipFoot","Gear_Unequip","Gear_Purchase","Gear_Delete","Gear_Inspect","Gear_EquipmentSlot","RepeatingEquipment","RepeatingConsumables","RepeatingGoods","Gear_ItemName","Gear_ItemActions","Gear_ItemType","Gear_EquipWeapon","Gear_ItemIsEquipped","Gear_ItemEquipMenu","Gear_ItemGroup","Gear_ItemStats","Gear_ItemTrait","Gear_ItemDescription","Gear_WeaponSlot","System_Crafting","System_CraftingComponent","CraftBulk","CraftResources","CraftSkill","CraftDC","CraftTime","System_Cooking","System_HighQualityMeals","Line","Cone","Blast","Burst","Zone","Title_ValidTargets","Title_LineOfSight","Title_Cover","Title_TechEffect","Title_TechDC","Title_TechEvasion","Title_TechDefense","Title_TechOnRound","Title_TechOnTurn","Title_TechOnEnter","Title_TechOnEndFocus","Title_TechNewTargets","Teleport"],"Combat Defense":["Def_Brace","Def_Warding","Def_Reflex"],"Defense":["Def_Fortitude","Def_Hide","Def_Evasion"],"Social Sense":["Def_Resolve","Def_Insight","Def_Guile"],"Sense":["Def_Freewill","Def_Notice","Def_Scrutiny"],"Life":["Cmb_Vitality","Cmb_Surge","Cmb_HV","Cmb_Armor","Cmb_Hardness","Resistance","Weakness","Cmb_ResistanceDesc","Cmb_WeaknessDesc"],"Movement":["Cmb_Mv","Cmb_MvPotency","MvCharge","Move","Adjacency","Obstruction","StrideRoll","MaxStride","FreeMove","Pulled","Pushed","ForceMove","Jump","Fly","Lifting","Falling"],"Technique Trait":["Trait_Arcanify","Trait_Arcing","Trait_Break","Trait_Delayed","Trait_Envoke","Trait_Focus","Trait_Holdfast","Trait_Illusion","Trait_Materialize","Trait_Resonator","Trait_Seeking","Trait_Transmute"],"Effect Trait":["Trait_AP","Trait_Brutal","Trait_Optional"],"Item Trait":["Trait_Ammunition","Trait_Axe","Trait_Bow","Trait_Ingested","Trait_Hammer","Trait_Handgun","Trait_Inhalent","Trait_Knife","Trait_Longshot","Trait_Loud","Trait_Magitech","Trait_MaxBulk15","Trait_MaxBulk60","Trait_MaxBulk120","Trait_MaxBulk250","Trait_Medkit","Trait_MinBulk15","Trait_MinBulk60","Trait_MinBulk120","Trait_MinBulk250","Trait_MinDust15","Trait_MinDust60","Trait_MinDust120","Trait_Polearm","Trait_Resonant","Trait_Scattershot","Trait_Sharp","Trait_Sturdy","Trait_Sword"],"Goods Trait":["Trait_Edible","Trait_Flammable","Trait_Flexible","Trait_Frozen","Trait_Transparent"],"Energy":["Dmg_Burn","Dmg_Cold","Dmg_Energy","Dmg_Fire","Dmg_Shock"],"Physical":["Dmg_Force","Dmg_Piercing","Dmg_Weapon"],"Melee Weaponry":["StyleSubGroup_Mighty Weapons","StyleSubGroup_Skirmish Weapons","StyleSubGroup_Finesse Weapons"],"Ranged Weaponry":["StyleSubGroup_Shoot Weapons","StyleSubGroup_Throw Weapons"],"Martial Arts":["StyleSubGroup_Martial Arts","StyleSubGroup_Kinetics","Style_Forceful Fist Arte","Style_Stepflow Arte","Style_Aerial Arte","Style_Wrestling Arte","Style_Galegrip Arte","Style_Powerarm Arte","Style_Swaying Palm Arte","Style_Skyfall Arte","Style_Ironhold Arte","Style_Heaven's Reach Arte"],"Arcanification Magic":["StyleSubGroup_Evocation","StyleSubGroup_Channelling","StyleSubGroup_Enchantment"],"Fluctuation Magic":["StyleSubGroup_Fluctuation"],"Materialization Magic":["StyleSubGroup_Battlesmithing","StyleSubGroup_Conjury"],"Transformation Magic":["StyleSubGroup_Transmulation","StyleSubGroup_Physiomancy"],"Athletics":["StyleSubGroup_Brawn","StyleSubGroup_Stealth","StyleSubGroup_Acrobatics","Skill_Agility","Skill_Physique","Skill_Sneak"],"Speechcraft":["StyleSubGroup_Persuasion","StyleSubGroup_Cunning"],"Damage":["WeaponDamage","WeaponDamageVal"],"Technique":["Title_ResourceCost","Title_Targetting","Title_Range","Title_Patterns"],"Gear":["Bulk"],"Basic":["Style_Basic Action","Style_Basic Recovery","Style_Basic Attack","Style_Basic Social","Style_Basic Spirit"],"Mighty Weapons":["Style_Hammering Arte","Style_Cleaving Arte","Style_Battering Arte","Style_Berserker Arte","Style_Mauler Arte","Style_Avenger Arte"],"Skirmish Weapons":["Style_Chargestrike Arte","Style_Overwhelming Arte","Style_Arcanestrike Arte","Style_Duelist Arte","Style_Swashbuckling Arte","Style_Phalanx Arte","Style_Jumpspear Arte","Style_Spellblade Arte","Style_Fencer Arte","Style_Sky Pike Arte"],"Finesse Weapons":["Style_Finesse Blade Arte","Style_Whip Arte","Style_Flashcut Arte","Style_Trickster Arte"],"Kinetics":["Style_Rapid Strikes Arte"],"Shoot Weapons":["Style_Archery Arte","Style_Trick Arrow Arte","Style_Gunslinger Arte","Style_Sentry Arte","Style_Longsight Arte","Style_Scatterpoint Arte","Style_Bowmaster Arte","Style_Pistolero Arte"],"Throw Weapons":["Style_Bomber Arte","Style_Daggerthrow Arte"],"Evocation":["Style_Blasting Flames","Style_Shock Bomb","Style_Arcane Spellshot","Style_Flaming Sphere","Style_Lightning Shot","Style_Area Spark","Style_Binding Cold","Style_Chilling Blast","Style_Hellfire","Style_Storm Caller","Style_Sheer Cold"],"Channelling":["Style_Whispering Wind","Style_Bursting Fire","Style_Fire Field","Style_Close Circuit","Style_Ice Storm","Style_Manification","Style_Light Control","Style_Darkness Weaving","Style_Sound Control"],"Enchantment":["Style_Arcane Conduit","Style_Freeform Flight","Style_Ether Magic","Style_Time Control"],"Fluctuation":["Style_Levitation","Style_Kinetic Assault","Style_Surging Dust","Style_Dust Impact","Style_Propelling Force","Style_Binding Winds","Style_Telekinesis","Style_Windsweep","Style_Gravity Force","Style_Surging Water"],"Battlesmithing":["Style_Throwcraft","Style_Conjure Blades","Style_Conjure Skyfall","Style_Warsmith"],"Conjury":["Style_Structural Magic","Style_Clouded Shroud","Style_Arbormaking","Style_Floral Shroud","Style_Smoke Field","Style_Stonemaking","Style_Iron Walls","Style_Glacial Walls","Style_Misty Terrtain","Style_Structural Mastery","Style_Poison Spore"],"Transmulation":["Style_Dust Shaping","Style_Unshaping","Style_Plant Growth","Style_Calming Blooms","Style_Verdant Armory","Style_Terrain Molding","Style_Ground Splitter","Style_Earthen Armory","Style_Water Shape","Style_Icy Terrain","Style_Frozen Armory","Style_Geomancy","Style_Cryomancy"],"Physiomancy":["Style_Healing Hands","Style_Earthen Endurance","Style_Propelling Motion","Style_Soul Surge","Style_Blood Flux"],"Brawn":["Style_Powerwake","Style_Enduring Body","Style_Traversal","Style_Unbeatable Brawn","Style_Unrelenting Motion"],"Stealth":["Style_Hidden Footing","Style_Shadow Walking"],"Acrobatics":["Style_Remotion","Style_Evasive Maneuvers","Style_Reactive Defense"],"Persuasion":["Style_Invigorating Rally","Style_Avowed","Style_Social Grace","Style_Flattery","Style_Deft Negotiator","Style_Sales Tactics"],"Cunning":["Style_Taunting Wit","Style_Underminer","Style_Intimidating Fear","Style_Beguiling Instinct","Style_Stillheart","Style_Connecting Bond","Skill_Demoralize","Skill_Empathy","Skill_Misdirect"],"Craft":["Skill_Alchemy","Skill_Build","Skill_Cook"],"Investigate":["Skill_Analyze","Skill_Resonance","Skill_Search"],"Cast":["Skill_Channel","Skill_Conjure","Skill_Enchant","Skill_Heal","Skill_Kinesis","Skill_Shape"],"Persuade":["Skill_Charm","Skill_Inspire","Skill_Rationalize"],"Fight":["Skill_Finesse","Skill_Grappling","Skill_Might","Skill_Shoot","Skill_Skirmish","Skill_Throw"],"Device":["Skill_Glyphwork","Skill_Pilot","Skill_Tinker"],"Walthair":["Lang_Minere","Lang_Crinere","Lang_Palmic","Lang_Shorespeak","Lang_Verdeni","Lang_Vulca"],"Aridsha":["Lang_Junal","Lang_Byric","Lang_Dustell","Lang_Muralic","Lang_Shira"],"Khem":["Lang_Apollen","Lang_Kleikan"],"Colswei":["Lang_Lib"],"Ceres":["Lang_Cert","Lang_Ciel","Lang_Citeq","Lang_Manstan","Lang_Salkan","Lang_Sansic","Lang_Silq"],"Special":["Lang_Emotion","Lang_Empathy","Lang_Wolfwarg","Lang_Jovean","Lang_Mytikan"],"Academics":["Lore_Health","Lore_Mana","Lore_Mathematics","Lore_Nature","Lore_School","Lore_Spirit","Lore_Warfare","Lore_Zoology"],"Profession":["Lore_Arboriculture","Lore_Farming","Lore_Fishing","Lore_Hunting","Lore_Legal","Lore_Mercantile","Lore_Mining"],"Craftmanship":["Lore_Alchemy","Lore_Architecture","Lore_Brewing","Lore_Cooking","Lore_Engineering","Lore_Glassblowing","Lore_Leatherworking","Lore_Sculpting","Lore_Smithing","Lore_Weaving"],"Geography":["Lore_Aridsha","Lore_Ceres","Lore_Colswei","Lore_Khem","Lore_Novus","Lore_Walthair","Lore_Wayling","Lore_Ethereal Plane"],"History":["Lore_Aridsha History","Lore_Ceres History","Lore_Colswei History","Lore_Khem History","Lore_Novus History","Lore_Walthair History","Lore_Wayling History"],"Culture":["Lore_Art","Lore_Etiquette","Lore_Fashion","Lore_Games","Lore_Music","Lore_Scribing","Lore_Theater"],"Religion":["Lore_Church of Kongkwei","Lore_Guidance","Lore_Life's Circle","Lore_Ocean Court","Lore_Sylvan","Lore_Zushaon"],"Vanguard":["Job_Fighter","Job_Sentinel","Job_Warden","Job_Bulwark","JStyle_Fighter","JStyle_Sentinel","JStyle_Warden","JStyle_Bulwark"],"Operator":["Job_Hunter","Job_Sniper","Job_Trooper","Job_Warmage","Job_Alchemist","JStyle_Hunter","JStyle_Sniper","JStyle_Trooper","JStyle_Warmage","JStyle_Alchemist"],"Athlete":["Job_Brawler","Job_Kineticist","Job_Rogue","Job_Labourer","JStyle_Brawler","JStyle_Kineticist","JStyle_Rogue","JStyle_Labourer"],"Strategist":["Job_Tactician","Job_Magus","Job_Scholar","Job_Inquisitor","JStyle_Tactician","JStyle_Magus","JStyle_Scholar","JStyle_Inquisitor"],"Waymaker":["Job_Detective","Job_Culinarian","Job_Bard","Job_Medic","Job_Spellwright","JStyle_Detective","JStyle_Culinarian","JStyle_Bard","JStyle_Medic","JStyle_Spellwright"],"Advocate":["Job_Empath","Job_Merchant","Job_Orator","Job_Hardliner","JStyle_Empath","JStyle_Merchant","JStyle_Orator","JStyle_Hardliner"],"Esper":["Job_Etherealist","Job_Shade","JStyle_Etherealist","JStyle_Shade"],"Status":["Stat_Blinded","Stat_Downed","Stat_Dying","Stat_Engaged","Stat_Ethereal","Stat_Exhausted","Stat_Float","Stat_Frozen","Stat_Grappled","Stat_Hidden","Stat_Invisible","Stat_Paralyzed","Stat_Restrained","Stat_Unconscious"],"Condition":["Stat_Aflame","Stat_Armored","Stat_Bleeding","Stat_Chilled","Stat_Dodge","Stat_Encumbered","Stat_Empowered","Stat_Hindered","Stat_Immobilized","Stat_Impaired","Stat_Jolted","Stat_Prone","Stat_Quickened","Stat_Shielded","Stat_Sickened","Stat_Stunned"],"Emotion":["Stat_Angered","Stat_Calmed","Stat_Doubt","Stat_Encouraged","Stat_Frightened","Stat_Flustered","Stat_Overjoyed","Stat_Persevering","Stat_Receptive","Stat_Surprised","Stat_Steadfast"]},"mainGroup":{"Style":["Style_Basic Action","Style_Basic Recovery","Style_Basic Attack","Style_Basic Social","Style_Basic Spirit","Style_Hammering Arte","Style_Cleaving Arte","Style_Battering Arte","Style_Berserker Arte","Style_Chargestrike Arte","Style_Overwhelming Arte","Style_Arcanestrike Arte","Style_Duelist Arte","Style_Swashbuckling Arte","Style_Phalanx Arte","Style_Jumpspear Arte","Style_Finesse Blade Arte","Style_Whip Arte","Style_Forceful Fist Arte","Style_Stepflow Arte","Style_Aerial Arte","Style_Wrestling Arte","Style_Galegrip Arte","Style_Rapid Strikes Arte","Style_Archery Arte","Style_Trick Arrow Arte","Style_Gunslinger Arte","Style_Sentry Arte","Style_Longsight Arte","Style_Scatterpoint Arte","Style_Bomber Arte","Style_Daggerthrow Arte","Style_Blasting Flames","Style_Shock Bomb","Style_Arcane Spellshot","Style_Flaming Sphere","Style_Lightning Shot","Style_Area Spark","Style_Binding Cold","Style_Chilling Blast","Style_Whispering Wind","Style_Bursting Fire","Style_Fire Field","Style_Close Circuit","Style_Ice Storm","Style_Arcane Conduit","Style_Freeform Flight","Style_Levitation","Style_Kinetic Assault","Style_Surging Dust","Style_Dust Impact","Style_Propelling Force","Style_Binding Winds","Style_Throwcraft","Style_Conjure Blades","Style_Conjure Skyfall","Style_Structural Magic","Style_Clouded Shroud","Style_Arbormaking","Style_Floral Shroud","Style_Smoke Field","Style_Stonemaking","Style_Iron Walls","Style_Glacial Walls","Style_Misty Terrtain","Style_Dust Shaping","Style_Unshaping","Style_Plant Growth","Style_Calming Blooms","Style_Verdant Armory","Style_Terrain Molding","Style_Ground Splitter","Style_Earthen Armory","Style_Water Shape","Style_Icy Terrain","Style_Frozen Armory","Style_Healing Hands","Style_Earthen Endurance","Style_Propelling Motion","Style_Powerwake","Style_Enduring Body","Style_Traversal","Style_Hidden Footing","Style_Remotion","Style_Evasive Maneuvers","Style_Invigorating Rally","Style_Avowed","Style_Social Grace","Style_Flattery","Style_Deft Negotiator","Style_Sales Tactics","Style_Taunting Wit","Style_Underminer","Style_Intimidating Fear","Style_Beguiling Instinct","Style_Stillheart","Style_Connecting Bond"],"Advanced":["Style_Mauler Arte","Style_Avenger Arte","Style_Spellblade Arte","Style_Fencer Arte","Style_Sky Pike Arte","Style_Flashcut Arte","Style_Trickster Arte","Style_Powerarm Arte","Style_Swaying Palm Arte","Style_Skyfall Arte","Style_Ironhold Arte","Style_Heaven's Reach Arte","Style_Bowmaster Arte","Style_Pistolero Arte","Style_Hellfire","Style_Storm Caller","Style_Sheer Cold","Style_Manification","Style_Light Control","Style_Darkness Weaving","Style_Sound Control","Style_Ether Magic","Style_Time Control","Style_Telekinesis","Style_Windsweep","Style_Gravity Force","Style_Surging Water","Style_Warsmith","Style_Structural Mastery","Style_Poison Spore","Style_Geomancy","Style_Cryomancy","Style_Soul Surge","Style_Blood Flux","Style_Unbeatable Brawn","Style_Unrelenting Motion","Style_Shadow Walking","Style_Reactive Defense"]},"formulaMods":{"CR":["Attribute","Skill","Job","Knowledge","Style","Perk","Influence","Def_Brace","Def_Fortitude","Def_Warding","Def_Hide","Def_Reflex","Def_Evasion","Def_Resolve","Def_Freewill","Def_Insight","Def_Notice","Def_Guile","Def_Scrutiny","HP","WILL","Cmb_Chakra","Recall","Initiative","Cmb_Surge","Cmb_HV"],"BonusAttributePoints":["Attribute"],"Level":["Skill","Advancement","Training","HP","WILL"],"AdvancementSkill":["Skill"],"AdvancementJob":["Job"],"TrainingKnowledge":["Knowledge"],"AdvancementTechnique":["Style"],"TrainingTechniques":["Style"],"BonusTraining":["Training"],"Attr_BOD":["Def_Brace","Def_Fortitude","HP","Power","CarryingCapacity","Skill_Conjure","Skill_Grappling","Skill_Might","Skill_Physique","Skill_Throw"],"Attr_PRC":["Def_Warding","Def_Hide","Accuracy","Skill_Kinesis","Skill_Shoot","Skill_Skirmish","Skill_Sneak","Skill_Tinker"],"Attr_QCK":["Def_Reflex","Def_Evasion","Initiative","Skill_Agility","Skill_Enchant","Skill_Finesse","Skill_Glyphwork","Skill_Pilot"],"Attr_CNV":["Def_Resolve","Def_Freewill","WILL","Charisma","Cmb_HV","Skill_Channel","Skill_Demoralize","Skill_Inspire","Skill_Misdirect","Skill_Resonance"],"Attr_INT":["Def_Insight","Def_Notice","Artistry","Skill_Charm","Skill_Cook","Skill_Empathy","Skill_Heal","Skill_Search"],"Attr_RSN":["Def_Guile","Def_Scrutiny","Recall","Skill_Alchemy","Skill_Analyze","Skill_Build","Skill_Rationalize","Skill_Shape"],"Recall":["Lore_Health","Lore_Mana","Lore_Mathematics","Lore_Nature","Lore_School","Lore_Spirit","Lore_Warfare","Lore_Zoology","Lore_Arboriculture","Lore_Farming","Lore_Fishing","Lore_Hunting","Lore_Legal","Lore_Mercantile","Lore_Mining","Lore_Alchemy","Lore_Architecture","Lore_Brewing","Lore_Cooking","Lore_Engineering","Lore_Glassblowing","Lore_Leatherworking","Lore_Sculpting","Lore_Smithing","Lore_Weaving","Lore_Aridsha","Lore_Ceres","Lore_Colswei","Lore_Khem","Lore_Novus","Lore_Walthair","Lore_Wayling","Lore_Ethereal Plane","Lore_Aridsha History","Lore_Ceres History","Lore_Colswei History","Lore_Khem History","Lore_Novus History","Lore_Walthair History","Lore_Wayling History","Lore_Art","Lore_Etiquette","Lore_Fashion","Lore_Games","Lore_Music","Lore_Scribing","Lore_Theater","Lore_Church of Kongkwei","Lore_Guidance","Lore_Life's Circle","Lore_Ocean Court","Lore_Sylvan","Lore_Zushaon"]},"techMods":{"_tech":["Influence","Def_Brace","Def_Fortitude","Def_Warding","Def_Hide","Def_Reflex","Def_Evasion","Def_Resolve","Def_Freewill","Def_Insight","Def_Notice","Def_Guile","Def_Scrutiny","JobSlots","AdvancedSlots","StyleSlots","WeaponSlots","EquipmentSlots","HP","WILL","EN","StartEN","Cmb_Chakra","Power","Accuracy","Artistry","Charisma","Recall","Initiative","CarryingCapacity","Cmb_Vitality","Cmb_Surge","Cmb_HV","Cmb_Armor","Cmb_Mv","Cmb_MvPotency"],"_techset":["Power","Accuracy","Artistry","Charisma","Recall"]},"hasMax":{"true":["Data","Advancement","Training","General","CR","XP","BonusTraining","HP","WILL","EN","Cmb_Chakra","Cmb_Vitality","Cmb_Surge","Soc_Favor"]}},
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
        _techset = "_techset",
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
                case "Goods":
                case "Gear":
                case "Consumable":
                    return new ItemDefinitionData(values[key]);
                default:
                    return new DefinitionData(values[key]);
            }
        },
        getValues = function (keyArray, delimiter, prefix) {
            if (keyArray == undefined || keyArray == "") {
                return [];
            }
            if (typeof keyArray == "string") {
                keyArray = keyArray.split(delimiter);
            }
            if (prefix == undefined) {
                prefix = "";
            }

            let output = [];
            let name = "";
            let lookup = "";
            let dataInfo;

            for (let i = 0; i < keyArray.length; i++) {
                name = `${prefix}${keyArray[i].trim()}`;

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
            } else {
                filteredGroup = getSortedGroup(filterData.property, filterData.value);
            }
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            return getGroupData(filteredGroup);
        },
        getSortedGroup = function (property, propertyValue) {
            if (!sortingGroups.hasOwnProperty(property)) {
                let keys = "";
                for (let key in sortingGroups) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find property ${property} but it does not exist in the database. Valid properties are ${keys}`);
            }
            if (!sortingGroups[property].hasOwnProperty(propertyValue)) {
                let keys = "";
                for (let key in sortingGroups[property]) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
            }
            return sortingGroups[property][propertyValue];
        },
        getGroupData = function (group) {
            let output = [];
            for (let i = 0; i < group.length; i++) {
                output.push(get(group[i]));
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
        getUntypedAttribute = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getAttribute(`-${getVariable(key, mod, mod1)}`);
        },
        getUntypedVariable = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getVariable(`-${getVariable(key, mod, mod1)}`);
        },
        getAbbreviation = function (key) {
            let data = get(key);
            if (data.abbreviation == "") {
                return data.title;
            } else {
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
        },
        getName = function (name, baseDefinition) {
            return baseDefinition.isResource ? `${name}` : `${baseDefinition.abbreviation}_${name}`;
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
        GetUntypedAttribute: getUntypedAttribute,
        GetUntypedVariable: getUntypedVariable,
        GetAbbreviation: getAbbreviation,
        GetVariables: getVariables,
        GetGroupVariables: getGroupVariables,
        GetTitle: getTitle,
        GetDescription: getDescription,
        GetName: getName,
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
        _techset: _techset,
        _expertise: _expertise,
        _gear: _gear,
        _affinity: _affinity,
        _error: _error
    };
}());
