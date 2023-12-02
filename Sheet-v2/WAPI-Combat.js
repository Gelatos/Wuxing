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
                case "!dmg":
                    commandDealDamage(msg, content);
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
            let technique = JSON.parse(components[0]);
            let targetData = getUserTargetDataFromTechnique(technique);

            // consume resources
            if (consumeTechniqueResources(targetData, technique)) {
                displayTechnique(msg, technique, components.length > 1 ? JSON.parse(components[1]) : undefined);
            }
            else {
                WuxingMessages.SendSystemMessage(`${targetData.displayName} does not have the resources to use ${technique.name}`);
            }
        },

        commandUseTechnique = function (msg, content) {
            let components = content.split("##");
            let technique = JSON.parse(components[0]);
            let weaponData = JSON.parse(components[1]);

            useTechnique(msg, technique, weaponData);
        },

        commandDealDamage = function (msg, content) {
            let tokenData;
            WuxingToken.IterateOverSelectedTokens(msg, function (token) {
                tokenData = WuxingTarget.FindActiveTargetDataByTokenId(token.get("_id"));
                WuxingToken.AddDamage(tokenData, parseInt(content));
            });
        }, 

        commandRollAdvantage = function (msg, content) {
            rollAdvantage(msg, ParseIntValue(content));
        },

        commandStartBattle = function () {

            let initiativeData = [];

            WuxingTarget.IterateOverActiveTargetData(function (targetData) {
                initiativeData.push(createInitiativeData(targetData));
                WuxingToken.SetTokenForBattle(targetData);
            });

            // sort the initiative data
            initiativeData = Format.SortArrayDecrementing(initiativeData);

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

        displayTechnique = function (msg, technique, weapon) {

            let output = TechniqueHandler.GetRollTemplate(technique);

            technique.target = "@{target||token_id}";
            let useTech = SanitizeSheetRollAction(JSON.stringify(technique));

            if (weapon != undefined) {
                output += ItemHandler.GetTechniqueWeaponRollTemplate(weapon);
                useTech += `##${SanitizeSheetRollAction(JSON.stringify(weapon))}`;
            }
            output += `{{targetData=!utech ${useTech}}}`;
            WuxingMessages.SendMessage(output, "", msg.who);
            
        },
        
        getUserTargetDataFromTechnique = function (technique) {
            return WuxingTarget.FindActiveTargetDataByCharName(technique.username);
        },
        
        getDefenderTargetDataFromTechnique = function (technique) {
            return WuxingTarget.FindActiveTargetDataByTokenId(technique.target);
        },

        // Technique Handling
        // ---------------------------

        useTechnique = function(msg, technique, weaponData) {

            let userTargetData = getUserTargetDataFromTechnique(technique);
            let defenderTargetData = getDefenderTargetDataFromTechnique(technique);
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


on("ready", function () {
    'use strict';

    WuxingCombat.CheckInstall();
});

