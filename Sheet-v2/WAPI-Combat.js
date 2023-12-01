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
                // WuxingToken.AddKi(tokenData, 10, true);
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
        
        consumeTechniqueResources = function (tokenData, technique) {
            
            let canConsumeAllResources = true;
            let resources = technique.resourceCost.split(";");
            let charResources = [];
            let resource = "";
            let cost, charResourceCost = 0;
            let charResource = {};
            _.each(resources, function (obj) {
                obj = obj.trim();
                if (obj != "") {
                    obj = obj.split(" ");
                    if (obj.length > 1) {
                        cost =  ParseIntValue(obj[0]);
                        resource = obj[1].toLowerCase();
                        if (resource == "Mana") {
                            charResource = GetCharacterAttribute(tokenData.charId, "ki");
                            charResourceCost = ParseIntValue(charResource.get("current"));

                            if (charResourceCost < cost) {
                                canConsumeAllResources = false;
                            }
                            charResources.push({
                                resource: "Mana",
                                cost: cost
                            });
                        }
                        else {
                            charResource = GetCharacterAttribute(tokenData.charId, resource);
                            charResourceCost = Math.floor(ParseIntValue(charResource.get("current")) / 10);

                            if (charResourceCost < cost) {
                                canConsumeAllResources = false;
                            }
                            charResources.push({
                                resource: charResource,
                                cost: cost
                            });
                        }
                    }
                }
            });
            
            if (canConsumeAllResources) {
                if (charResources.length > 0) {
                    _.each(charResources, function (obj) {
                        if (obj.resource == "Mana") {
                            WuxingToken.AddKi(tokenData, obj.cost * -1, false);
                        }
                        else {
                            obj.resource.set("current", ParseIntValue(charResource.get("current")) - obj.cost);
                        }
                    });
                }
            }
            
            return canConsumeAllResources;
        },

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