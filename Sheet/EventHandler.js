on("chat:message", function(msg) {
    if (msg.type == "api" && msg.content != null) {

        if (msg.content.toLowerCase().indexOf("!m ") == 0 || msg.content.toLowerCase().indexOf("!w ") == 0 
            || msg.content.toLowerCase().indexOf("!y ") == 0 || msg.content.toLowerCase().indexOf("!t ") == 0 
            || msg.content.toLowerCase().indexOf("!d ") == 0 || msg.content.toLowerCase().indexOf("!de ") == 0) {
            
            CommandGetEmoteMessageOptions(msg);
        }
        else if (msg.content.toLowerCase().indexOf("!h ") !== -1 || msg.content.toLowerCase().indexOf("!r ") !== -1 || 
                 msg.content.toLowerCase().indexOf("!ry ") !== -1 || 
                 msg.content.toLowerCase().indexOf("!i ") !== -1 || msg.content.toLowerCase().indexOf("!a ") !== -1 || 
                 msg.content.toLowerCase().indexOf("!l ") !== -1 || msg.content.toLowerCase().indexOf("!s ") !== -1) {
            
            CommandSendFormattedMessage(msg);
        }
        else if (msg.content.toLowerCase().indexOf("!emoteMessage ") != -1) {
            
            CommandSendEmoteMessage(msg);
        }
        else if (msg.content.toLowerCase().indexOf("!markernames") != -1) {
            let tokenMarkers = JSON.parse(Campaign().get("token_markers"));
            let chatMessage = '';
            _.each(tokenMarkers, marker => {
                chatMessage += `<p><img src='${marker.url}'> ${marker.id}: ${marker.name}</p>`;
            });
            sendChat("Token Markers", chatMessage);
        } 
        else if(msg.content.split(" ")[0].toLowerCase() === '!clearmarkers') {
            if (!msg.selected && msg.selected[0]._type == "graphic") return;
            obj = getObj(msg.selected[0]._type, msg.selected[0]._id);
            obj.set("statusmarkers", "");
            SanitizeTokenConditions(obj, true);
        }
        else if(msg.content.split(" ")[0].toLowerCase() === '!gettokenmarkers') {
            if (!msg.selected) return;
            if (msg.selected[0]._type !== "graphic") return;
            obj = getObj(msg.selected[0]._type, msg.selected[0]._id);
            currentMarkers = obj.get("statusmarkers");
            sendChat("Token Markers", currentMarkers);
        }
        else if (msg.content.indexOf("!target ") !== -1 || msg.content.indexOf("!targetw ") !== -1) {
            
            CommandTargetFunction(msg);
        }
        else if (msg.content.indexOf("!token ") !== -1 || msg.content.indexOf("!tokenw ") !== -1) {
            
            CommandTokenFunction(msg);
        }
        else if (msg.content.indexOf("!c ") !== -1 || msg.content.indexOf("!cw ") !== -1) {
            
            CommandCharacterFunction(msg);
        }
        else if (msg.content.indexOf("!alt ") !== -1) {
            
            CommandSetAltitude(msg);
        }
        else if (msg.content.indexOf("!j") !== -1) {
            
            CommandJukebox(msg);
        }
        else if (msg.content.indexOf("!setoutfit ") !== -1) {
            
            CommandSetOutfit(msg);
        }
        else if (msg.content.indexOf("!setlang ") !== -1) {
            
            CommandSetLanguage(msg);
        }
        else if (msg.content.indexOf("!help") !== -1) {
            
            var options = msg.content.replace("!help", "").trim().toLowerCase();
            CommandHelpCommands(msg, options);
        }
        else if (msg.content.indexOf("!deathsave ") !== -1) {
            
            var content = msg.content.replace("!deathsave ", "");
            CommandDeathSave(content);
        }
        else if (msg.content.indexOf("!deathfailure ") !== -1) {
            
            var content = msg.content.replace("!deathfailure ", "");
            CommandDeathFailure(content);
        }
        else if (msg.content.indexOf("!roll20AM ") !== -1) {

            Roll20AM.InputController(msg);
        }
        
        // Triggered Events
        else if (msg.content.indexOf("!spelllookup ") !== -1) {
            
            OnTriggerSpellLookup(msg);
        }
        else if (msg.content.indexOf("!linger ") !== -1) {
            
            var content = msg.content.replace("!linger ", "");
            OnTriggerDyingInjury(content);
        }
        else if (msg.content.indexOf("!surge ") !== -1) {
            
            var content = msg.content.replace("!surge ", "");
            OnTriggerSurge(msg, content);
        }
        else if (msg.content.indexOf("!insp ") !== -1) {
            
            var content = msg.content.replace("!insp ", "");
            OnTriggerInspiration(content);
        }
        else if (msg.content.indexOf("!spendresolve ") !== -1) {
            
            var content = msg.content.replace("!spendresolve ", "");
            OnTriggerResolve(content);
        }
        else if (msg.content.indexOf("!spendfate ") !== -1) {
            
            var content = msg.content.replace("!spendfate ", "");
            OnTriggerFate(content);
        }
        else if (msg.content.indexOf("!resetweek ") !== -1) {
            
            var content = msg.content.replace("!resetweek ", "");
            OnTriggerResetWeek(msg, content);
        }
        else if (msg.content.indexOf("!check ") !== -1) {
            
            var content = msg.content.replace("!check ", "");
            OnTriggerInteractTarget(msg, content);
        }
        else if (msg.content.indexOf("!interactopt ") !== -1) {
            
            var content = msg.content.replace("!interactopt ", "");
            GetInteractionOptions(msg, content);
        }
        else if (msg.content.indexOf("!interactgenshop ") !== -1) {
            
            var content = msg.content.replace("!interactgenshop ", "");
            PurchaseGenericShopItem(msg, content);
        }
        else if (msg.content.indexOf("!ctemplate ") !== -1) {
            
            var content = msg.content.replace("!ctemplate ", "");
            OnTriggerCallTemplate(msg, content);
        }

        // Token Triggered Events
        else if (msg.content.indexOf("!tatk ") !== -1) {
            var content = msg.content.replace("!tatk ", "");
            var contentSplit = content.split("$$$");
            CreateActionOutput(contentSplit[0], contentSplit[1]);
        }
        else if (msg.content.indexOf("!actionResults ") !== -1) {
            var content = msg.content.replace("!actionResults ", "");
            CommandHandleActionResults(content);
        }
        else if (msg.content.indexOf("!healinj ") !== -1) {
            var content = msg.content.replace("!healinj ", "");
            CommandTargetHealInjury(content);
        }
        
        // GM Events
        else if (playerIsGM(msg.playerid)) {
            if (msg.content.indexOf("!p ") !== -1 || msg.content.indexOf("!ps ") !== -1 ||
                msg.content.indexOf("!pc ") !== -1 || msg.content.indexOf("!pcs ") !== -1) {
                CommandPartyFunction(msg);
            }
            else if (msg.content.indexOf("!startsession ") !== -1) {
                var options = msg.content.replace("!startsession ", "").trim();
                CommandStartSession(options);
            }
            else if (msg.content.indexOf("!pta") !== -1) {
                CommandAddToParty(msg);
            }
            else if (msg.content.indexOf("!pt") !== -1) {
                CommandSetParty(msg);
            }
            else if (msg.content.indexOf("!sta") !== -1) {
                CommandSetTokenAlly(msg);
            }
            else if (msg.content.indexOf("!st") !== -1) {
                CommandSetToken(msg);
            }
            else if (msg.content.indexOf("!npc") !== -1) {
                CommandSetNPC(msg);
            }
            else if (msg.content.indexOf("!rndnpc") !== -1) {
                CommandRandomizeNPC(msg);
            }
            else if (msg.content.indexOf("!recast") !== -1) {
                CommandRecastNPC(msg);
            }
            else if (msg.content.indexOf("!castnpc") !== -1) {
                CommandCastNPC(msg);
            }
            else if (msg.content.indexOf("!show") !== -1) {
                ShowNameplates(msg);
            }
            else if (msg.content.indexOf("!img") !== -1) {
                PrintTokenImageURL(msg);
            }
            else if (msg.content.indexOf("!fail") !== -1) {
                CommandCritFail();
            }
            else if (msg.content.indexOf("!generateNPC") !== -1) {
                CommandGenerateNPC(msg);
            }
            else if (msg.content.indexOf("!assignToken") !== -1) {
                CommandAssignToken(msg);
            }
            else if (msg.content.indexOf("!gainmorale ") !== -1) {
                var options = msg.content.replace("!gainmorale ", "").trim();
                TargetGainMorale(options);
            }
            else if (msg.content.indexOf("!gainkarma ") !== -1) {
                var options = msg.content.replace("!gainkarma ", "").trim();
                TargetGainKarma(options);
            }
            else if (msg.content.indexOf("!completeMission ") !== -1) {
                var options = msg.content.replace("!completeMission ", "").trim();
                CommandCompleteMission(msg, options);
            }
            else if (msg.content.indexOf("!setmissionxp ") !== -1) {
                var options = msg.content.replace("!setmissionxp ", "").trim();
                CommandSetMissionXp(msg, options);
            }
            else if (msg.content.indexOf("!importPartyStats") !== -1) {
                CommandImportPartyStats(msg);
            }
        }
    }

    if (msg.playerid.toLowerCase() != "api" && msg.rolltemplate) {
        log ("rolltemplate: " + msg.content);

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
    }
});

on('change:campaign:turnorder', function(obj, prev) {

    if(obj.get('turnorder') === prev.turnorder) return;

    let turnorder = (obj.get('turnorder') === "") ? [] : JSON.parse(obj.get('turnorder'));
    let prevTurnorder = (prev.turnorder === "") ? [] : JSON.parse(prev.turnorder);

    if(turnorder.length && prevTurnorder.length && turnorder[0].id !== prevTurnorder[0].id){
        let tokenObj = findObjs({_id:turnorder[0].id, _pageid:Campaign().get("playerpageid"), _type: 'graphic'})[0];
        let target = GetTokenTargetData(tokenObj);
        if (target != undefined) {
            StartCharacterTurn(target);
        }
    }
});



function SendChatMessage(snd, msg, alt, opt) {
    
    if (alt == undefined) {
        sendChat(snd, msg);
    }
    else {
        sendChat(snd, msg, alt, opt);
    }
}

// ======= Help

function CommandHelpCommands(msg, options) {
    
    // format the message
    var sendingPlayer = getObj('player', msg.playerid);
    var sendingPlayerName = sendingPlayer.get("_displayname").split(" ")[0];
    var sendString = "/w " + sendingPlayerName;
    
    switch(options)
    {
        case "gen":
        case "general":
        case "various":
        case "misc":
            // Misc Commands
            sendString += " <div>&nbsp;</div>";
            sendString += "<div style='position: relative; margin: 0px 10px 0px -30px; display: inline-block; font-size: 12px; padding: 5px; vertical-align: top; ";
            sendString += "border: 1px solid grey; background-color: #e9f7f7; font-family: Courier, monospace;'>";
            sendString += "<b style='font-size: 14px;'>Misc Commands</b>";
            sendString += "<br /><span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "These are various commands useful to all players.";
            sendString += "</span>";
            sendString += "<hr /><table style='border: 0px;'>";
            sendString += GetHelpTableLine("!rollstats", "Roll a set of stats for a new character.");
            if (playerIsGM(msg.playerid)) {
                sendString += GetHelpTableLine("start", "Starts the session");
                sendString += GetHelpTableLine("fail", "Randomly selects a critical fail event");
                sendString += GetHelpTableLine("npc", "Sets NPC stats");
            }
            sendString += "</table>";
            sendString += "</div>";
            break;
        case "chat":
            // Chat Commands
            sendString += " <div>&nbsp;</div>";
            sendString += "<div style='position: relative; margin: 0px 10px 0px -30px; display: inline-block; font-size: 12px; padding: 5px; vertical-align: top; ";
            sendString += "border: 1px solid grey; background-color: #e9f7f7; font-family: Courier, monospace;'>";
            sendString += "<b style='font-size: 14px;'>Character Commands</b>";
            sendString += "<br /><span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "These commands only work when a character is selected. ";
            sendString += "A character can be selected either by selecting their token on the map or via the as selector below this chat window.";
            sendString += "</span>";
            sendString += "<br /><span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "Messaged, Whispered, and Yelled messages all can be modified.";
            sendString += "Add a / followed by a message and ending with another / to have the message spoken to a specific person or group";
            sendString += "</span>";
            sendString += "<br /><span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "Example: !y /these dumbasses beside her/ You are all dumbasses!";
            sendString += "</span>";
            sendString += "<hr /><table style='border: 0px;'>";
            sendString += GetHelpTableLine("!m", "Say a message said aloud");
            sendString += GetHelpTableLine("!w", "Whisper a message said quietly");
            sendString += GetHelpTableLine("!y", "Yell a message said loudly");
            sendString += GetHelpTableLine("!t", "Send a message that is thought");
            sendString += GetHelpTableLine("!d", "Send a message describing an action");
            sendString += "</table>";
            sendString += "</div>";
            break;
        case "char":
        case "target":
            // Misc Commands
            sendString += " <div>&nbsp;</div>";
            sendString += "<div style='position: relative; margin: 0px 10px 0px -30px; display: inline-block; font-size: 12px; padding: 5px; vertical-align: top; ";
            sendString += "border: 1px solid grey; background-color: #e9f7f7; font-family: Courier, monospace;'>";
            sendString += "<b style='font-size: 14px;'>Character Commands</b>";
            sendString += "<br /><span style='width: 260px; display: inline-block; font-size: 10px;'>";
            if (playerIsGM(msg.playerid)) {
                sendString += "These commands start with !p, !pc, !u, or !c. <br />";
                sendString += "They can be followed with an 's' for shouted messages. <br />";
            } else {
                sendString += "These commands start with \"!c \" and affect whatever character you have selected on the map or in your character chat menu. <br />";
                sendString += "After the \"!c \" you need to add a command to determine what you are doing with the selected character.";
            }
            sendString += "Use one of the commands below to perform an action.";
            sendString += "</span><hr />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px; font-weight: bold;'>";
            sendString += "Emote Related";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "Change aspects of how you display emotes. These require that you supply a type ";
            sendString += "that you write in anywhere after the command.";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>Example: !c lang 1</span>";
            sendString += "<table style='border: 0px;'>";
            sendString += GetHelpTableLine("o", "Get a list of outfits on the character that can be selected as the worn outfit.");
            sendString += GetHelpTableLine("lang", "Changes the speaking language to a supplied language number or the supplied language.");
            sendString += "</table>";
            
            if (playerIsGM(msg.playerid)) {
                sendString += "<br />";
                sendString += "<span style='width: 260px; display: inline-block; font-size: 10px; font-weight: bold;'>";
                sendString += "XP Related";
                sendString += "</span><br />";
                sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>";
                sendString += "Grant XP to Targets. Follow command with amount.";
                sendString += "</span>";
                sendString += "<hr /><table style='border: 0px;'>";
                sendString += GetHelpTableLine("xp", "Grants XP.");
                sendString += GetHelpTableLine("kxp", "Kills selected and grants XP from kill to targets.");
                sendString += "</table>";
            }
            
            sendString += "<br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px; font-weight: bold;'>";
            sendString += "Special Related";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "Request or spend special currencies.";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>Example: !c mor</span>";
            sendString += "<table style='border: 0px;'>";
            sendString += GetHelpTableLine("inspiration, insp", "Spends Inspiration if you have any.");
            sendString += GetHelpTableLine("morale, mor", "Requests Morale from the GM. Additional commands after this one will be sent to the GM and can be used to give reason for your request. For example: !c mor I want Morale");
            sendString += GetHelpTableLine("resolve, res", "Spends your highest tier of Resolve if you have any.");
            sendString += GetHelpTableLine("karma, kar", "Requests Karma from the GM. Additional commands after this one will be sent to the GM and can be used to give reason for your request. For example: !c kar I want Karma");
            sendString += GetHelpTableLine("fate", "Spends 1 Fate if you have any.");
            sendString += "</table>";
            
            sendString += "<br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px; font-weight: bold;'>";
            sendString += "Currency Related";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "Grants currency. Follow command with amount. Add an 's' to the end of the command to add to storage instead.";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>Example: !c jins 200</span>";
            sendString += "<table style='border: 0px;'>";
            sendString += GetHelpTableLine("jin", "Adds Jin.");
            sendString += GetHelpTableLine("frt", "Adds Forta.");
            sendString += GetHelpTableLine("syr", "Adds Syre.");
            sendString += GetHelpTableLine("gp", "Adds Gold.");
            sendString += GetHelpTableLine("cp", "Adds Copper.");
            sendString += "</table>";
            
            sendString += "<br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px; font-weight: bold;'>";
            sendString += "Skill Related";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "Call a skill check roll.";
            sendString += "</span><br />";
            sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>Example: !c per</span>";
            sendString += "<table style='border: 0px;'>";
            sendString += GetHelpTableLine("acrobatics, acr", "Roll acrobatics");
            sendString += GetHelpTableLine("animalhandling, ani", "Roll animal handling");
            sendString += GetHelpTableLine("athletics, ath", "Roll athletics");
            sendString += GetHelpTableLine("deception, dec", "Roll deception");
            sendString += GetHelpTableLine("history, his", "Roll history");
            sendString += GetHelpTableLine("insight, ins", "Roll insight");
            sendString += GetHelpTableLine("intimidation, inti", "Roll intimidation");
            sendString += GetHelpTableLine("investigation, inv", "Roll investigation");
            sendString += GetHelpTableLine("medicine, med", "Roll medicine");
            sendString += GetHelpTableLine("nature, nat", "Roll nature");
            sendString += GetHelpTableLine("perception, per", "Roll perception");
            sendString += GetHelpTableLine("performance, prf, perf", "Roll performance");
            sendString += GetHelpTableLine("persuasion, prs, pers", "Roll persuasion");
            sendString += GetHelpTableLine("religion, rel", "Roll religion");
            sendString += GetHelpTableLine("sleightOfHand, sle", "Roll sleightOfHand");
            sendString += GetHelpTableLine("stealth, ste", "Roll stealth");
            sendString += GetHelpTableLine("survival, sur", "Roll survival");
            sendString += "</table>";
            
            if (playerIsGM(msg.playerid)) {
                sendString += "<br />";
                sendString += "<span style='width: 260px; display: inline-block; font-size: 10px; font-weight: bold;'>";
                sendString += "Rest Related";
                sendString += "</span><br />";
                sendString += "<span style='width: 260px; display: inline-block; font-size: 10px;'>";
                sendString += "Cause a type of rest to be performed.";
                sendString += "</span>";
                sendString += "<table style='border: 0px;'>";
                sendString += GetHelpTableLine("brief", "Recover all of the party's barrier");
                sendString += GetHelpTableLine("long", "Restores all spell slots, barrier, and heals 1 hit point");
                sendString += "</table>";
            }
            sendString += "</div>";
            break;
        default:
            // Help Commands
            sendString += " <div>&nbsp;</div>";
            sendString += "<div style='position: relative; margin: 0px 10px 0px -30px; display: inline-block; font-size: 12px; padding: 5px; vertical-align: top; ";
            sendString += "border: 1px solid grey; background-color: #e9f7f7; font-family: Courier, monospace;'>";
            sendString += "<b style='font-size: 14px;'>Help Commands</b>";
            sendString += "<br /><span style='width: 260px; display: inline-block; font-size: 10px;'>";
            sendString += "Please choose a help option below or add one of the following commands after !help to go directly to the section next time.";
            sendString += "</span>";
            sendString += "<table style='border: 0px;'>";
            sendString += GetHelpTableLine("misc", "[Misc](!help misc)");
            sendString += GetHelpTableLine("chat", "[Chat](!help chat)");
            sendString += GetHelpTableLine("char", "[Character](!help char)");
            sendString += "</div>";
            break;
            
    }
    sendChat("API Help", sendString, null, {noarchive:true});
} 

function GetHelpTableLine(title, message) {
    
    var sendString = "";
    sendString += "<tr style='border-bottom: 1px solid #ddd;'>";
    sendString +=   "<td style='width: 80px; display: inline-block; vertical-align: top; ";
    sendString +=   "font-size: 9px; line-height: 10px; font-weight: bold; '>";
    sendString +=     title;
    sendString +=   "</td>";
    sendString +=   "<td style='width: 170px; display: inline-block; text-align: right; ";
    sendString +=   "font-size: 8px; line-height: 10px;'>"; 
    sendString +=     message;
    sendString +=   "</td>";
    sendString += "</tr>";
    return sendString;
}

// Data Retrieval Functions
// =================================================

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

function GetCharacterAttribute(characterId, attrName) {
    
    var returnVal = GetSafeCharacterAttribute(characterId, attrName);
    
    if (returnVal == undefined) {
        log ("attrName " + attrName + " does not exist.");
    }
    
    return returnVal;
}

function GetSafeCharacterAttribute(characterId, attrName) {
    
    var returnVal = undefined;
    var chracterAttributes = findObjs({
        _characterid: characterId,
        _type: "attribute",
        name: attrName
    }, {caseInsensitive: true});
    
    if (chracterAttributes.length > 0) {
        returnVal = chracterAttributes[0];
    }
    
    return returnVal;
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
            if (getAttrByName(id, "difficultyStyle") == "3" || displayName == undefined || displayName.trim() == "") {
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
                if (getAttrByName(id, "difficultyStyle") == "3" || displayName == undefined || displayName.trim() == "") {
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
    log ("actorList: " + actorList);

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

var generateUUID = (function() {
    "use strict";

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
}()),

generateRowID = function () {
    "use strict";
    return generateUUID().replace(/_/g, "Z");
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