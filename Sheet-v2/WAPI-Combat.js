var WuxingCombat = WuxingCombat || (function () {
    'use strict';

    var schemaVersion = "0.1.1",

        checkInstall = function () {
            if (!state.hasOwnProperty('WuxingCombat') || state.WuxingCombat.version !== schemaVersion) {
                state.WuxingCombat = {
                    version: schemaVersion,
                    lastActivePlayer: "",
                    round: 0,
                    startSideIsAlly: "",
                    activeCharacters: getDefaultActiveCharacters()
                };
            }
        },

        getDefaultActiveCharacters = function () {
            return {
                charNames: [],
                tokenIds: [],
                tokenData: []
            };
        },

        // Commands
        // ---------------------------

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!dmg":
                    commandDealDamage(msg, content);
                    break;
                case "!combataddcharacter":
                    commandAddCharacter(msg, content);
                    break;
                case "!combatremovecharacter":
                    commandRemoveCharacter(msg);
                    break;
                case "!rollinitiative":
                    commandRollInitiative();
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

        commandDealDamage = function (msg, content) {
            let tokenData;
            iterateOverSelectedTokens(msg, function (token) {
                tokenData = findTokenDataByTokenId(token.get("_id"));
                addTokenDataDamage(tokenData, parseInt(content));
            });
        },

        commandAddCharacter = function (msg, content) {
            let isAlly = content == "true" ? true : false;
            let tokenData;
            let message = "";
            iterateOverSelectedTokens(msg, function (token) {
                tokenData = createTokenData(token, getObj('character', token.get("represents")), isAlly);
                if (tokenData != undefined) {
                    if (message != "") {
                        message += ", ";
                    }
                    message += `${tokenData.displayName}`;
                    setTokenDataDefault(tokenData);
                }
            });
            message = `${message} added as ${isAlly ? "allies" : "enemies"}`;
            WuxingMessages.SendSystemMessage(message, "GM");

        },

        commandRemoveCharacter = function (msg) {
            iterateOverSelectedTokens(msg, function (token) {
                removeTokenData(token.get("id"));
            });
        },

        commandRollInitiative = function () {
            let initiativeData = [];
            let roll, tokenData, value;

            iterateOverActiveTokenData(function (tokenData) {
                // calculate the total mod
                value = parseInt(getAttrByName(tokenData.charId, "initiative"));
                roll = randomInteger(20) + value;
                initiativeData.push(`${roll < 10 ? "0" : ""}${roll}.${value < 10 ? "0" : ""}${value < 0 ? "0" : value}@${tokenData.name}`);
            });

            // sort the initiative data
            initiativeData.sort();
            initiativeData.reverse();

            // create the table data
            let tableData = [];
            let obj;
            let firstPlayer = "";

            for (let i = 0; i < initiativeData.length; i++) {
                obj = initiativeData[i].split("@");
                tokenData = findTokenDataByCharacterName(obj[1]);
                tableData.push([tokenData.displayName, obj[0]]);

                if (i == 0) {
                    state.WuxingCombat.startSideIsAlly = tokenData.isAlly;
                }

                if (firstPlayer == "" && tokenData.owner != "") {
                    firstPlayer = tokenData.owner;
                }
            }
            state.WuxingCombat.lastActivePlayer = firstPlayer;
            WuxingMessages.SendTableMessage(["Name", "Initiative"], tableData, "GM", undefined, true);
        },

        commandStartRound = function () {

            iterateOverActiveTokenData(function (tokenData) {
                resetTokenDataTempHp(tokenData);
                addTokenDataKi(tokenData, 10, true);
                setTokenDataTurnIcon(tokenData, true);

            });
            
            state.WuxingCombat.round++;
            let message = `Round ${state.WuxingCombat.round} Begins!\n`;
            if (state.WuxingCombat.startSideIsAlly) {
                message += `Ally Phase Start!\n${state.WuxingCombat.lastActivePlayer}, select the next character to have a turn`;
            }
            else {
                message += "Enemy Phase Start!";
            }
            WuxingMessages.SendSystemMessage(message, "GM");
        },

        commandEndTurn = function (msg) {
            let message;
            iterateOverSelectedTokens(msg, function (token) {
                setTokenDataTurnIcon(tokenData, false);

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
            removeAllTokenData();
            state.WuxingCombat.lastActivePlayer = "";
            state.WuxingCombat.round = 0;

            WuxingMessages.SendSystemMessage("Combat Has Finished", "GM");
        },

        // Active Token Data Creation and Removal
        // ---------------------------
        createTokenData = function (token, character, isAlly) {
            if (character != undefined && character != "") {
                let charId = token.get("represents");
                let output = {
                    name: character.get("name"),
                    displayName: getAttrByName(charId, "nickname"),
                    owner: character.get("controlledby"),
                    charId: charId,
                    token: token,
                    tokenId: token.get("id"),
                    elem: getAttrByName(charId, "token_element"),
                    isAlly: isAlly
                };
                state.WuxingCombat.activeCharacters.charNames.push(output.name);
                state.WuxingCombat.activeCharacters.tokenIds.push(output.tokenId);
                state.WuxingCombat.activeCharacters.tokenData.push(output);
                return output;
            }
            return undefined;
        },

        removeTokenData = function (tokenId) {
            for (var i = 0; i < state.WuxingCombat.activeCharacters.tokenId.length; i++) {
                if (state.WuxingCombat.activeCharacters.tokenId[i] == tokenId) {
                    state.WuxingCombat.activeCharacters.charNames[i].splice(i, 1);
                    state.WuxingCombat.activeCharacters.tokenIds[i].splice(i, 1);
                    state.WuxingCombat.activeCharacters.tokenData[i].splice(i, 1);
                    break;
                }
            }
        },

        removeAllTokenData = function () {
            state.WuxingCombat.activeCharacters = getDefaultActiveCharacters();
        },

        iterateOverActiveTokenData = function (callback) {
            _.each(state.WuxingCombat.activeCharacters.tokenData, function (obj) {
                callback(obj);
            });
        },

        findTokenDataByCharacterName = function (characterName) {
            let index = state.WuxingCombat.activeCharacters.charNames.indexOf(characterName);
            if (index >= 0) {
                return state.WuxingCombat.activeCharacters.tokenData[index];
            }
            return undefined;
        },

        findTokenDataByTokenId = function (tokenId) {
            let index = state.WuxingCombat.activeCharacters.tokenIds.indexOf(tokenId);
            if (index >= 0) {
                return state.WuxingCombat.activeCharacters.tokenData[index];
            }
            return undefined;
        },

        // Token Data Manipulation
        // ---------------------------

        setTokenDataDefault = function (tokenData) {

            // set vitals
            let hp = GetCharacterAttribute(tokenData.charId, "hp");
            tokenData.token.set("bar1_link", hp.get("_id"));
            tokenData.token.set("bar1_value", hp.get("max"));
            tokenData.token.set("showplayers_bar1", true);
            tokenData.token.set("showplayers_bar1text", "2");
            let tempHp = GetCharacterAttribute(tokenData.charId, "tempHp");
            tokenData.token.set("bar2_link", tempHp.get("_id"));
            tokenData.token.set("showplayers_bar2", true);
            tokenData.token.set("showplayers_bar2text", "2");

            // set token name
            tokenData.token.set("name", getAttrByName(tokenData.charId, "nickname"));
            tokenData.token.set("showname", true);
            tokenData.token.set("showplayers_name", true);
            tokenData.token.set("bar_location", "overlap_bottom");

            // set the token element
            tokenData.token.set(getAttrByName(tokenData.charId, "token_element"), true);

            // set tooltip
            tokenData.token.set("show_tooltip", true);
            //tokenData.token.set("tooltip", getAttrByName(tokenData.charId, "scan-summary"));
        },

        addTokenDataHp = function (tokenData, value) {
            let total = parseInt(getAttrByName(tokenData.charId, "hp")) + value;
            let remainder = 0;
            if (total < 0) {
                remainder = total;
                total = 0;
            }
            tokenData.token.set("bar1_value", total);
            return remainder;
        },

        resetTokenDataTempHp = function (tokenData) {
            log ("token: " + tokenData.token);
            tokenData.token.set("bar2_value", getAttrByName(tokenData.charId, "tempHpTotal"));
        },

        addTokenDataTempHp = function (tokenData, value) {
            let total = parseInt(tokenData.token.get("bar2_value")) + value;
            let remainder = 0;
            if (total < 0) {
                remainder = total;
                total = 0;
            }
            tokenData.token.set("bar2_value", total);
            return remainder;
        },

        addTokenDataDamage = function (tokenData, value, stopAtTempHp) {

            // make the damage value negative
            value *= -1;

            // first deal any damage to tempHp
            value = addTokenDataTempHp(tokenData, value);

            // if damage remains, go to health damage
            if (!stopAtTempHp && value < 0) {
                let currentHp = parseInt(tokenData.token.get("bar2_value"));
                let maxHp = parseInt(tokenData.token.get("bar2_max"));
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
                tokenData.token.set("bar2_value", currentHp);
                if (woundDamage > 0) {
                    let wounds = GetCharacterAttribute(tokenData.charId, "wounds");
                    wounds.set("current", parseInt(wounds.get("current")) + woundDamage);
                    trauma.set("current", parseInt(trauma.get("current")) + woundDamage);
                }
            }
        }

    addTokenDataKi = function (tokenData, value, cap) {
        let ki = GetCharacterAttribute(tokenData.charId, "ki");
        let newValue = parseInt(ki.get("current")) + value;
        if (cap && newValue > parseInt(ki.get("max"))) {
            newValue = parseInt(ki.get("max"));
        }
        ki.set("current", newValue);
        let mana = Math.floor(newValue / 10);
        tokenData.token.set(tokenData.elem, mana);
    },

        setTokenDataTurnIcon = function (tokenData, value) {
            tokenData.token.set("status_yellow", value);
        },

        // Token Manipulation
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