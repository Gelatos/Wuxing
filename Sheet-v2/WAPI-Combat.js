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

    var schemaVersion = "0.1.3",

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
                case "!conflictxp":
                    commandGainConflictXP();
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
        commandGainConflictXP = function () {
            let levelVar = WuxDef.GetVariable("Level");
            let crVar = WuxDef.GetVariable("CR");
            let vitalityVar = WuxDef.GetVariable("Cmb_Vitality");
            let xpDefinition = WuxDef.Get("XP");
            let ppDefinition = WuxDef.Get("PP");

            let allyTeam = TargetReference.GetActiveTargetsOnTeam(0);
            let allyTeamXp = [];
            let enemyTeam = TargetReference.GetActiveTargetsOnTeam(1);
            if (allyTeam.length == 0 || enemyTeam.length == 0) {
                Debug.LogError(`[commandGainConflictXP] Not enough teams to grant XP. Ally Team: ${allyTeam.length}, Enemy Team: ${enemyTeam.length}`);
                return;
            }
            for (let i = 0; i < allyTeam.length; i++) {
                allyTeamXp.push({level: 0, cr: 0, xp: 0.0, pp: 0.0, xpBreakdown: "", ppBreakdown: ""});
                let attributeHandler = new SandboxAttributeHandler(allyTeam[i].charId);
                attributeHandler.addMod([levelVar, crVar, xpDefinition.getVariable(), ppDefinition.getVariable()]);
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    allyTeamXp[i].level = attrHandler.parseInt(levelVar);
                    allyTeamXp[i].cr = attrHandler.parseInt(crVar);
                });
                attributeHandler.run();
            }
            
            for (let i = 0; i < enemyTeam.length; i++) {
                let attributeHandler = new SandboxAttributeHandler(enemyTeam[i].charId);
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let enemyLevel = attrHandler.parseInt(levelVar, 0, false);
                    let enemyCR = attrHandler.parseInt(crVar, 0, false);
                    let enemyVitality = attrHandler.parseInt(vitalityVar, 0, true);
                    if (enemyVitality <= 0) {
                        enemyVitality = 1;
                    }
                    
                    for (let j = 0; j < allyTeamXp.length; j++) {
                        let levelDiff = enemyLevel - allyTeamXp[j].level;
                        let crDiff = enemyCR - allyTeamXp[j].cr;
                        
                        let xpMod = (levelDiff > 0 ? Math.floor(levelDiff * 0.75) : Math.floor(levelDiff / 3)) + (crDiff * 2);
                        let xpGain = Math.max(1, 5 + xpMod) * enemyVitality;
                        
                        let ppMod = (levelDiff > 0 ? Math.floor(levelDiff * 0.75) : Math.floor(levelDiff / 2));
                        let ppGain = Math.max(1, 2 + ppMod) * enemyVitality;
                        
                        allyTeamXp[j].xp += xpGain;
                        if (allyTeamXp[j].xpBreakdown != "") {
                            allyTeamXp[j].xpBreakdown += " + ";
                        }
                        allyTeamXp[j].xpBreakdown += `${xpGain}(${enemyTeam[i].displayName})`;

                        allyTeamXp[j].pp += ppGain;
                        if (allyTeamXp[j].ppBreakdown != "") {
                            allyTeamXp[j].ppBreakdown += " + ";
                        }
                        allyTeamXp[j].ppBreakdown += `${ppGain}(${enemyTeam[i].displayName})`;
                    }
                });
                attributeHandler.run();
            }
            
            let message = "";
            let messages = [];
            messages.push("Conflict XP Results:");
            for (let i = 0; i < allyTeam.length; i++) {
                let attributeHandler = new SandboxAttributeHandler(allyTeam[i].charId);
                message = `${allyTeam[i].displayName} gains ${Format.ShowTooltip(allyTeamXp[i].xp, allyTeamXp[i].xpBreakdown)}` +
                    ` XP and ${Format.ShowTooltip(allyTeamXp[i].pp, allyTeamXp[i].ppBreakdown)} PP`;
                allyTeam[i].addModNoCap("XP", attributeHandler, allyTeamXp[i].xp, 
                    function (results, attrHandler, attributeVar) {
                        attrHandler.addUpdate(attributeVar, results.newValue, false);
                    });
                allyTeam[i].addModNoCap("PP", attributeHandler, allyTeamXp[i].pp,
                    function (results, attrHandler, attributeVar) {
                        attrHandler.addUpdate(attributeVar, results.newValue, false);
                    });
                attributeHandler.run();
                messages.push(message);
            }

            let systemMessage = new SystemInfoMessage(messages);
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
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
            let messages = [];
            messages.push(`Round ${state.WuxConflictManager.round} Begins!`);
            messages = messages.concat(setStartRoundTokens(startConflict));
            sendStartRoundMessage(messages);
        },
        
        setStartRoundTokens = function (startConflict) {
            let messages = [];
            TargetReference.IterateOverActiveTargetData(function (tokenTargetData) {
                let tokenEffect = new TokenTargetEffectsData(tokenTargetData);
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                attributeHandler.addAttribute([WuxDef.GetVariable("Status"),
                    WuxDef.GetVariable("HP"), WuxDef.GetVariable("WILL"),
                    WuxDef.GetVariable("Cmb_Armor"), WuxDef.GetVariable("CR")]);

                attributeHandler.addGetAttrCallback(function (attrGetter) {
                    let aflame = tokenTargetData.hasStatus(attrGetter, "Stat_Aflame");
                    Debug.Log(`[setStartRoundTokens] ${tokenTargetData.displayName} aflame status: ${aflame}`);
                    if (aflame != false && aflame > 0) {
                        let roll = new DamageRoll();
                        roll.rollDice(aflame, 6);
                        roll.setDamageType(WuxDef.GetTitle("Dmg_Fire"));
                        tokenEffect.addDamageRoll(roll);
                    }
                    let bleeding = tokenTargetData.hasStatus(attrGetter, "Stat_Bleeding");
                    if (bleeding != false && bleeding > 0) {
                        let roll = new DamageRoll();
                        roll.rollDice(bleeding, 6);
                        roll.setDamageType(WuxDef.GetTitle("Dmg_Tension"));
                        roll.setTraits("AP");
                        tokenEffect.addDamageRoll(roll);
                    }
                    if (tokenTargetData.hasStatus(attrGetter, "Stat_Doubt")) {
                        let roll = new DamageRoll();
                        roll.addModToRoll(5 + (5 * attrGetter.parseInt(WuxDef.GetVariable("CR"))));
                        roll.setDamageType("Will");
                        tokenEffect.addDamageRoll(roll);
                    }
                });
                
                attributeHandler.addFinishCallback(function (attrGetter) {
                    let newAttributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                    newAttributeHandler.addAttribute([WuxDef.GetVariable("Status"),
                        WuxDef.GetVariable("HP"), WuxDef.GetVariable("WILL"),
                        WuxDef.GetVariable("Cmb_Armor"), WuxDef.GetVariable("CR")]);
                    
                    tokenEffect.performDamageRolls(attrGetter, newAttributeHandler);
                    
                    if (tokenTargetData.hasStatus(newAttributeHandler, "Stat_Armored")) {
                        tokenTargetData.removeStatus(newAttributeHandler, "Stat_Armored");
                        messages.push(`${tokenTargetData.displayName} is no longer Armored`);
                    }
                    if (tokenTargetData.hasStatus(newAttributeHandler, "Stat_Dodge")) {
                        tokenTargetData.removeStatus(newAttributeHandler, "Stat_Dodge");
                        messages.push(`${tokenTargetData.displayName} is no longer Dodging`);
                    }
                    if (tokenTargetData.hasStatus(newAttributeHandler, "Stat_Hindered")) {
                        tokenTargetData.removeStatus(newAttributeHandler, "Stat_Hindered");
                        messages.push(`${tokenTargetData.displayName} is no longer Hindered`);
                    }
                    newAttributeHandler.addFinishCallback(function () {
                        messages = messages.concat(tokenEffect.effectMessages);
                    })
                    newAttributeHandler.run();
                });
                
                if (startConflict) {
                    tokenTargetData.setEnergyToStart(attributeHandler);
                }
                else {
                    tokenTargetData.addStartRoundEnergy(attributeHandler);
                }
                
                switch (state.WuxConflictManager.conflictType) {
                    case "Battle":
                        if (tokenTargetData.getDowned()) {
                            tokenTargetData.setMoveCharge(attributeHandler, 0);
                        }
                        else {
                            tokenTargetData.setDash(attributeHandler);
                        }
                        break;
                    case "Social":
                        tokenTargetData.addImpatience(attributeHandler, 1);
                        tokenTargetData.setTurnIcon(true);
                        break;
                }

                attributeHandler.run();
            });
            return messages;
        },
        sendStartRoundMessage = function (messages) {
            state.WuxConflictManager.activeTeamIndex = state.WuxConflictManager.startRoundTeamIndex;
            messages.push(getPhaseStartMessage());
            let systemMessage = new SystemInfoMessage(messages);
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
        },

        // end turn
        endTurn = function (msg) {
            setNextActiveTeam();
            TokenReference.IterateOverSelectedTokens(msg, function (tokenTargetData) {
                let messages = [];
                messages.push(`${tokenTargetData.displayName} Ends Turn`);
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.setMoveCharge(attributeHandler, 0);
                attributeHandler.run();
                messages = messages.concat(setEndTurnTokenUpkeep(tokenTargetData));
                sendEndTurnMessage(messages);
            });
        },
        setNextActiveTeam = function () {
            let activeTeam = state.WuxConflictManager.activeTeamIndex;
            activeTeam++;
            if (activeTeam >= state.WuxConflictManager.teams.length) {
                activeTeam = 0;
            }
            state.WuxConflictManager.activeTeamIndex = activeTeam;
        },

        setEndTurnTokenUpkeep = function (tokenTargetData) {
            let messages = [];
            tokenTargetData.setTurnIcon(false);
            
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            attributeHandler.addAttribute([WuxDef.GetVariable("Status")]);
            
            if (tokenTargetData.hasStatus(attributeHandler, "Stat_Jolted")) {
                tokenTargetData.removeStatus(attributeHandler, "Stat_Jolted");
                messages.push(`${tokenTargetData.displayName} is no longer Jolted`);
            }
            if (tokenTargetData.hasStatus(attributeHandler, "Stat_Quickened")) {
                tokenTargetData.removeStatus(attributeHandler, "Stat_Quickened");
                messages.push(`${tokenTargetData.displayName} is no longer Quickened`);
            }
            if (tokenTargetData.hasStatus(attributeHandler, "Stat_Surprised")) {
                tokenTargetData.removeStatus(attributeHandler, "Stat_Surprised");
                messages.push(`${tokenTargetData.displayName} is no longer Surprised`);
            }

            attributeHandler.run();
            return messages;
        },
        sendEndTurnMessage = function (messages) {
            messages.push(getPhaseStartMessage());
            let systemMessage = new SystemInfoMessage(messages);
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
        },
        getPhaseStartMessage = function () {
            let team = state.WuxConflictManager.teams[state.WuxConflictManager.activeTeamIndex];
            if (team == undefined) {
                Debug.LogError(`[getPhaseStartMessage] No team found at index ${state.WuxConflictManager.activeTeamIndex}.` + 
                    ` Current teams: ${JSON.stringify(state.WuxConflictManager.teams)}`);
                return "Phase Start!";
            }
            if (!team.isPlayer || team.lastActiveOwner == "") {
                return `${team.name} Phase Start!`;
            }
            return `${team.name} Phase Start!\n${team.lastActiveOwner}, select the next character to have a turn`;
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
            }
        },

        commandConsumeTechnique = function (msg, content) {
            let techniqueConsumptionResolver = new TechniqueConsumptionResolver(msg, content);
            techniqueConsumptionResolver.run();
        },
        commandUseTechnique = function (msg, content) {
            let techUseResolver = new TechniqueUseResolver(msg, content);
            techUseResolver.run();
        }
    ;

    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput
    };

}());

class TechniqueWillBreakEffects {
    constructor(techniqueName, sourceSheetName, targetTokenId) {
        this.techniqueName = techniqueName;
        this.sourceSheetName = sourceSheetName;
        this.targetTokenId = targetTokenId;
        this.willBreakEffects = new TechniqueEffectDatabase();
    }

    add(techniqueEffect) {
        techniqueEffect.defense = "";
        this.willBreakEffects.add(techniqueEffect.name, techniqueEffect);
    }
    
    addWillResetEffect(willDamage) {
        let willResetEffect = new TechniqueEffect();
        willResetEffect.name = "Will Overflow";
        willResetEffect.type = "WILL";
        willResetEffect.subType = "Overflow";
        willResetEffect.formula = new FormulaData(willDamage);
        this.add(willResetEffect);
    }

    getTechUseEffect() {
        let willBreakEffect = new TechniqueUseEffect();
        willBreakEffect.name = `${this.techniqueName} WillBreak`;
        willBreakEffect.effects = this.willBreakEffects;
        return willBreakEffect;
    }

    printWillBreakString() {
        let techUseEffect = this.getTechUseEffect();
        return techUseEffect.getUseTech(this.sourceSheetName) + `$$0$$${this.targetTokenId}`;
    }
}

class TechniqueResolverData {
    constructor(msg, content) {
        this.createEmpty();
        this.msg = msg;
        this.content = content;
        this.splitContent(content);
    }
    
    createEmpty() {
        this.msg = {};
        this.content = "";
        this.sourceSheetName = "";
        this.senderTokenTargetData = {};
        this.messages = [];
    }
    
    splitContent(content) {
        let splitContent = content.split("$$");
        if (splitContent.length < 2) {
            Debug.LogError(`[TechniqueResolverData] Invalid content format. Requires $$ in string. Received: ${content}`);
            return;
        }
        this.initializeData(splitContent);
    }
    
    initializeData(contentData) {
        this.initializeTechniqueData(contentData[0]);
        this.sourceSheetName = contentData[1];
        if (this.sourceSheetName.startsWith("-")) {
            // this is a token id, not a name
            this.senderTokenTargetData = TargetReference.GetTokenTargetData(this.sourceSheetName);
            if (this.senderTokenTargetData == undefined) {
                Debug.LogError(`[TechniqueResolverData] No sender token target data found for token id: ${this.sourceSheetName}`);
                return;
            }
            this.sourceSheetName = this.senderTokenTargetData.charName;
        }
        else {
            this.senderTokenTargetData = TargetReference.GetTokenTargetDataByName(this.sourceSheetName);
        }
    }
    
    initializeTechniqueData(data) {
        
    }

    run() {}

    addMessage(message) {
        if (message != undefined && message != "") {
            this.messages.push(message);
        }
    }

    getMessageObject() {
        let systemMessage = new SystemInfoMessage(this.messages);
        systemMessage.setSender("System");
        return systemMessage;
    }
}

class TechniqueConsumptionResolver extends TechniqueResolverData {
    constructor(msg, content) {
        super(msg, content);
    }
    
    createEmpty() {
        super.createEmpty();
        this.techniqueName = "";
        this.tokenEffect = {};
        this.resources = {};
        this.newResourceValues = {};
    }
    
    initializeData(contentData) {
        super.initializeData(contentData);
        if (this.senderTokenTargetData == undefined) {
            Debug.LogError(`[TechniqueConsumptionResolver] No sender token target data found for content: ${contentData}`);
            return;
        }
        this.tokenEffect = new TokenTargetEffectsData(this.senderTokenTargetData);
        this.addInitialMessage();
    }

    initializeTechniqueData(data) {
        let techniqueData = new TechniqueResources();
        techniqueData.importSandboxJson(data);
        this.techniqueName = techniqueData.name;
        
        let resourceNames = techniqueData.resourceCost.split(";");
        for (let i = 0; i < resourceNames.length; i++) {
            let resource = resourceNames[i].trim().split(" ", 2);
            this.resources[resource[1]] = parseInt(resource[0]);
        }
    }
    
    addInitialMessage() {
        this.addMessage(`${this.senderTokenTargetData.displayName} consumes resources for ${this.techniqueName}`);
    }
    
    run() {
        let attributeHandler = new SandboxAttributeHandler(this.tokenEffect.tokenTargetData.charId);
        let techniqueConsumptionResolver = this;
        this.checkIfResourcesAvailable(techniqueConsumptionResolver, attributeHandler);
        this.tryConsumeResources(techniqueConsumptionResolver, attributeHandler);
        attributeHandler.run();
    }
    
    checkIfResourcesAvailable(techniqueConsumptionResolver, attributeHandler) {

        this.iterateResources((resourceName, resourceValue) => {
            switch (resourceName) {
                case "EN":
                    this.checkConsumeEnergy(techniqueConsumptionResolver, attributeHandler, resourceName, resourceValue);
                    break;
                case "WILL":
                    this.checkConsumeWill(techniqueConsumptionResolver, attributeHandler, resourceName, resourceValue);
                    break;
            }
        });
    }
    
    checkConsumeEnergy(techniqueConsumptionResolver, attributeHandler, resourceName, resourceValue) {
        this.tokenEffect.tokenTargetData.addEnergy(attributeHandler, resourceValue * -1, function (results, attrHandler, attributeVar) {
            if (results.remainder < 0) {
                techniqueConsumptionResolver.newResourceValues[resourceName] = techniqueConsumptionResolver.getResourceObject(false);
                return;
            }

            techniqueConsumptionResolver.newResourceValues[resourceName] = techniqueConsumptionResolver.getResourceObject(
                true, resourceName, resourceValue, attributeVar, results, techniqueConsumptionResolver.consumeEnergy);
        });
    }
    
    consumeEnergy(techniqueConsumptionResolver, attrHandler, resourceObject) {
        let message = `Consumed ${resourceObject.resourceValue} ${WuxDef.GetTitle(resourceObject.resourceName)}`;
        techniqueConsumptionResolver.tokenEffect.addMessage(message);
        
        attrHandler.addMod(resourceObject.attributeVar);
        techniqueConsumptionResolver.tokenEffect.tokenTargetData.applyResultsToEnergy(
            resourceObject.results, attrHandler, resourceObject.attributeVar, techniqueConsumptionResolver.tokenEffect.tokenTargetData);
    }
    
    checkConsumeWill(techniqueConsumptionResolver, attributeHandler, resourceName, resourceValue) {
        this.tokenEffect.tokenTargetData.addWill(attributeHandler, resourceValue * -1, function (results, attrHandler, attributeVar) {
            techniqueConsumptionResolver.newResourceValues[resourceName] = techniqueConsumptionResolver.getResourceObject(
                true, resourceName, resourceValue, attributeVar, results, techniqueConsumptionResolver.consumeWill);
        });
    }
    
    consumeWill(techniqueConsumptionResolver, attrHandler, resourceObject) {
        let techniqueEffect = new TechniqueEffect();
        techniqueEffect.name = "T0";
        techniqueEffect.target = "Self";
        techniqueEffect.type = "HP";
        techniqueEffect.forumla = 5 + (attrHandler.parseInt(WuxDef.GetVariable("CR")) * 5);
        techniqueEffect.effect = "Tension";
        techniqueEffect.traits = "AP";
        
        let willDamageRoll = new DamageRoll();
        willDamageRoll.addModToRoll(resourceObject.resourceValue);
        
        let willBreakEffect = new TechniqueWillBreakEffects("Magic", 
            techniqueConsumptionResolver.sourceSheetName, techniqueConsumptionResolver.tokenEffect.tokenTargetData.tokenId);
        willBreakEffect.add(techniqueEffect);
        techniqueConsumptionResolver.tokenEffect.takeWillDamage(attrHandler, willDamageRoll, willBreakEffect);
    }

    tryConsumeResources(techniqueConsumptionResolver, attributeHandler) {
        attributeHandler.addFinishCallback(function () {
            if (techniqueConsumptionResolver.checkIfCanConsumeResources(techniqueConsumptionResolver)) {
                techniqueConsumptionResolver.consumeResources(techniqueConsumptionResolver);
            }
            else {
                techniqueConsumptionResolver.printPrivateMessages();
            }
        });
    }

    checkIfCanConsumeResources(techniqueConsumptionResolver) {
        let success = true;
        this.iterateResources((resourceName) => {
            if (!techniqueConsumptionResolver.newResourceValues[resourceName].isConsumable) {
                success = false;
                techniqueConsumptionResolver.addMessage(`Not enough ${WuxDef.GetTitle(resourceName)} to use this technique`);
            }
        });
        return success;
    }
    
    consumeResources(techniqueConsumptionResolver) {
        let attributeHandler = new SandboxAttributeHandler(this.tokenEffect.tokenTargetData.charId);
        let crVar = WuxDef.GetVariable("CR");
        attributeHandler.addMod(crVar, 0);
        
        techniqueConsumptionResolver.iterateResources((resourceName) => {
            if (techniqueConsumptionResolver.newResourceValues.hasOwnProperty(resourceName)) {
                let resourceObject = techniqueConsumptionResolver.newResourceValues[resourceName];
                resourceObject.callback(techniqueConsumptionResolver, attributeHandler, resourceObject);
            }
        });

        attributeHandler.addFinishCallback(function () {
            techniqueConsumptionResolver.printPrivateMessages();
        });

        attributeHandler.run();
    }
    
    printPrivateMessages() {
        this.messages = this.messages.concat(this.tokenEffect.effectMessages);
        let systemMessage = this.getMessageObject();
        WuxMessage.SendToSenderAndGM(systemMessage, this.msg);
    }
    
    getResourceObject(isConsumable, resourceName, resourceValue, attributeVar, results, callback) {
        return {
            isConsumable: isConsumable,
            resourceName: resourceName,
            resourceValue: resourceValue,
            attributeVar: attributeVar,
            results: results,
            callback: callback
        }
    }
    
    iterateResources(callback) {
        for (let resourceName in this.resources) {
            if (this.resources.hasOwnProperty(resourceName)) {
                callback(resourceName, this.resources[resourceName]);
            }
        }
    }
}

class TechniqueTargetObjectCollection {
    constructor (sender, target) {
        this.sender = sender;
        this.target = target;
    }
    
    getObjByTarget(techniqueEffect) {
        if (techniqueEffect.target == "Self") {
            return this.sender;
        }
        else {
            return this.target;
        }
    }
}

class TechniqueUseResolver extends TechniqueResolverData {
    constructor(msg, content) {
        super(msg, content);
        this.startTime = Date.now();
    }
    
    createEmpty() {
        super.createEmpty();
        this.technique = {};
        this.skillCheck = 0;
        this.skillCheckValue = 0;
        this.advantage = 0;
        this.failedEvasion = false;
        this.senderTokenEffect = {};
        this.targetTokenEffect = {};
    }

    initializeData(contentData) {
        super.initializeData(contentData);
        if (this.senderTokenTargetData == undefined) {
            Debug.LogError(`[TechniqueUseResolver] No sender token target data found for content: ${contentData}`);
            return;
        }
        this.senderTokenEffect = new TokenTargetEffectsData(this.senderTokenTargetData);
        
        let targetToken = TargetReference.GetTokenTargetData(contentData[3]);
        if (targetToken == undefined) {
            return;
        }
        this.targetTokenEffect = new TokenTargetEffectsData(targetToken);
        this.advantage = parseInt(contentData[2]);
        this.addInitialMessage();
    }

    initializeTechniqueData(data) {
        this.technique = new TechniqueUseEffect();
        this.technique.importSandboxJson(data);
    }

    addInitialMessage() {
        this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} uses ${this.technique.name} on ${this.targetTokenEffect.tokenTargetData.displayName}`);
    }
    
    run() {
        if (this.senderTokenTargetData == undefined || this.targetTokenEffect.tokenTargetData == undefined) {
            return;
        }
        let techUseResolver = this;
        let senderAttributeHandler = new SandboxAttributeHandler(this.senderTokenEffect.tokenTargetData.charId);
        techUseResolver.tryGetSenderAttributes(techUseResolver, senderAttributeHandler);
        techUseResolver.tryGetSenderSkillCheck(techUseResolver, senderAttributeHandler);
        techUseResolver.getTargetData(techUseResolver, senderAttributeHandler);
        senderAttributeHandler.run();
    }

    tryGetSenderAttributes(techUseResolver, senderAttributeHandler) {
        senderAttributeHandler.addMod(WuxDef.GetVariable("Status"));
        senderAttributeHandler.addMod(WuxDef.GetVariable("CR"));
        techUseResolver.senderTokenEffect.tokenTargetData.refreshCombatDetails(senderAttributeHandler);
        techUseResolver.technique.effects.iterate(function (techniqueEffect) {
            if (techniqueEffect.target == "Self") {
                techUseResolver.tryGetAttributesFromTechniqueEffect(techniqueEffect, senderAttributeHandler);
            }
            if (techniqueEffect.effect == "Dmg_Weapon") {
                senderAttributeHandler.addMod(WuxDef.GetVariable("WeaponDamage"));
            }
            senderAttributeHandler.addMod(techniqueEffect.formula.getAttributes());
        });
    }

    tryGetSenderSkillCheck(techUseResolver, senderAttributeHandler) {
        if (techUseResolver.technique.skill == "") {
            return;
        }

        let skillCheckVar = WuxDef.GetVariable(Format.GetDefinitionName("Skill", techUseResolver.technique.skill));
        senderAttributeHandler.addMod(skillCheckVar);

        senderAttributeHandler.addGetAttrCallback(function (attrHandler) {
            techUseResolver.skillCheckValue = attrHandler.parseInt(skillCheckVar);
        });
    }
    
    tryGetAttributesFromTechniqueEffect(techniqueEffect, attributeHandler) {
        switch (techniqueEffect.type) {
            case "HP":
                attributeHandler.addMod(WuxDef.GetVariable("HP"));
                switch (techniqueEffect.subType) {
                    case "Surge":
                        attributeHandler.addMod(WuxDef.GetVariable("Surge"));
                        break;
                    case "":
                        attributeHandler.addMod(WuxDef.GetVariable("Cmb_Armor"));
                        break;
                }
                if (techniqueEffect.formula.hasWorker(WuxDef.GetVariable("TargetHV"))) {
                    attributeHandler.addMod(WuxDef.GetVariable("Cmb_HV"));
                }
                break;
            case "WILL":
                attributeHandler.addMod(WuxDef.GetVariable("WILL"));
                break;
            case "Vitality":
                attributeHandler.addMod(WuxDef.GetVariable("Cmb_Vitality"));
                break;
            case "Impatience":
                attributeHandler.addMod(WuxDef.GetVariable("Soc_Impatience"));
                break;
            case "Favor":
            case "Request":
                let favorDef = WuxDef.Get("Soc_Favor");
                attributeHandler.addMod(favorDef.getVariable());
                attributeHandler.addMod(favorDef.getVariable(WuxDef._max));
                break;
            case "EN":
                attributeHandler.addMod(WuxDef.GetVariable("EN"));
                break;
        }
    }
    
    getTargetData(techUseResolver, senderAttributeHandler) {
        senderAttributeHandler.addFinishCallback(function (senderAttrHandler) {
            let targetAttributeHandler = new SandboxAttributeHandler(techUseResolver.targetTokenEffect.tokenTargetData.charId);
            techUseResolver.tryGetDefensesAndAttributes(techUseResolver, targetAttributeHandler);
            techUseResolver.performEffects(techUseResolver, senderAttrHandler, targetAttributeHandler);
            targetAttributeHandler.run();
        })
    }

    tryGetDefensesAndAttributes(techUseResolver, targetAttributeHandler) {
        targetAttributeHandler.addMod(WuxDef.GetVariable("Status"));
        targetAttributeHandler.addMod(WuxDef.GetVariable("CR"));
        techUseResolver.targetTokenEffect.tokenTargetData.refreshCombatDetails(targetAttributeHandler);
        techUseResolver.technique.effects.iterate(function (techniqueEffect) {
            if (techniqueEffect.defense.startsWith("Def_")) {
                let defenseDef = WuxDef.Get(techniqueEffect.defense);
                targetAttributeHandler.addMod(defenseDef.getVariable());
            }
            if (techniqueEffect.target != "Self") {
                techUseResolver.tryGetAttributesFromTechniqueEffect(techniqueEffect, targetAttributeHandler);
            }
        });
    }
    
    performEffects(techUseResolver, senderAttrHandler, targetAttributeHandler) {
        targetAttributeHandler.addFinishCallback(function (targetAttrHandler) {
            let currentCheck = "";
            let passCheck = true;
            let willBreakEffect = new TechniqueWillBreakEffects(techUseResolver.technique.name,
                techUseResolver.sourceSheetName, techUseResolver.targetTokenEffect.tokenTargetData.tokenId);
            let techDisplayData = new TechniqueEffectDisplayUseData("", 
                techUseResolver.senderTokenEffect.tokenTargetData.displayName, techUseResolver.targetTokenEffect.tokenTargetData.displayName);

            let attrGetters = new TechniqueTargetObjectCollection(senderAttrHandler, targetAttrHandler);
            let attrSetters = new TechniqueTargetObjectCollection(
                new SandboxAttributeHandler(techUseResolver.senderTokenEffect.tokenTargetData.charId),
                new SandboxAttributeHandler(techUseResolver.targetTokenEffect.tokenTargetData.charId));

            techUseResolver.rollSkillCheck(techUseResolver, attrSetters);
            
            techUseResolver.technique.effects.iterate(function (techniqueEffect) {
                if (techniqueEffect.defense != currentCheck) {
                    currentCheck = techniqueEffect.defense;
                    if (currentCheck == "WillBreak") {
                        willBreakEffect.add(techniqueEffect);
                        return;
                    }
                    
                    passCheck = techUseResolver.checkPassDc(techniqueEffect, techUseResolver, targetAttrHandler);
                }
                
                if (passCheck) {
                    techUseResolver.addEffects(techniqueEffect, techUseResolver, attrGetters, attrSetters, techDisplayData);
                }
            });

            techUseResolver.applySetters(techUseResolver, attrGetters, attrSetters, willBreakEffect);
        });
    }
    
    rollSkillCheck(techUseResolver, attrSetters) {
        let advantage = techUseResolver.advantage;
        
        // add advantages based on sender statuses
        if (techUseResolver.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Impaired")) {
            advantage -= 1;
            techUseResolver.addMessage(`${techUseResolver.senderTokenEffect.tokenTargetData.displayName} is Impaired: -1 Advantage`);
        }
        if (techUseResolver.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Sickened")) {
            advantage -= 1;
            techUseResolver.addMessage(`${techUseResolver.senderTokenEffect.tokenTargetData.displayName} is Sickened: -1 Advantage`);
        }
        
        // add advantages based on what statuses the target has
        if (techUseResolver.targetTokenEffect.tokenTargetData.hasStatus(attrSetters.target, "Stat_Hindered")) {
            advantage += 1;
            techUseResolver.targetTokenEffect.tokenTargetData.removeStatus(attrSetters.target, "Stat_Hindered");
            techUseResolver.addMessage(`${techUseResolver.targetTokenEffect.tokenTargetData.displayName} is Hindered: +1 Advantage. Removed Hindered status.`);
        }
        if (techUseResolver.targetTokenEffect.tokenTargetData.hasStatus(attrSetters.target, "Stat_Restrained")) {
            advantage += 1;
            techUseResolver.addMessage(`${techUseResolver.targetTokenEffect.tokenTargetData.displayName} is Restrained: +1 Advantage`);
        }
        
        techUseResolver.skillCheck = new DieRoll();
        techUseResolver.skillCheck.rollCheck(advantage);
        techUseResolver.skillCheck.addModToRoll(techUseResolver.skillCheckValue, techUseResolver.technique.skill);
        techUseResolver.addMessage(`${techUseResolver.technique.skill} Check: ` +
            Format.ShowTooltip(`${techUseResolver.skillCheck.total}`, techUseResolver.skillCheck.message));
    }
    
    checkPassDc(techniqueEffect, techUseResolver, targetAttrHandler) {
        if (techniqueEffect.defense == "") {
            return true;
        }
        if (techUseResolver.failedEvasion) {
            return false;
        }
        
        let message = "";
        let dcValue = parseInt(techniqueEffect.defense);
        if (isNaN(dcValue)) {
            let defenseDef = WuxDef.Get(techniqueEffect.defense);
            message = `Vs. ${defenseDef.getTitle()}`;
            dcValue = targetAttrHandler.parseInt(defenseDef.getVariable());
            if (techUseResolver.targetTokenEffect.tokenTargetData.hasStatus(targetAttrHandler, "Stat_Dodge")) {
                techUseResolver.targetTokenEffect.tokenTargetData.removeStatus(targetAttrHandler, "Stat_Dodge");
                if (techniqueEffect.defense == "Def_Evasion") {
                    dcValue += 6;
                }
                techUseResolver.addMessage(`${techUseResolver.targetTokenEffect.tokenTargetData.displayName}: +6 Evasion. Removed Dodge status.`);
            }
            
            if (techUseResolver.targetTokenEffect.tokenTargetData.getDowned()) {
                message += " (Downed -5)";
                dcValue -= 5;
            }
            if (dcValue < 0) {
                dcValue = 0;
            }
            message += `: `;
        }
        else {
            message = `Vs. DC ${dcValue}: `;
        }
        
        let pass = techUseResolver.skillCheck.total >= dcValue;
        if (!pass && techniqueEffect.defense == "Def_Evasion") {
            techUseResolver.failedEvasion = true;
            message += "Failed Evasion. No further effects will be applied.";
        }
        message += pass ? "Success!" : "Failure!";
        techUseResolver.addMessage(message);
        return pass;
    }
    
    addEffects(techniqueEffect, techUseResolver, attrGetters, attrSetters, techDisplayData) {

        switch (techniqueEffect.type) {
            case "HP":
                techUseResolver.addHPEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters);
                break;
            case "WILL":
                techUseResolver.addWillEffect(techniqueEffect, techUseResolver, attrGetters);
                break;
            case "EN":
                techUseResolver.addEnergyEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters);
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Favor":
                techUseResolver.addFavorEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters);
                break;
            case "Vitality":
                techUseResolver.addAttributeValue(techniqueEffect, "Cmb_Vitality", techUseResolver, attrGetters, attrSetters);
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Impatience":
                techUseResolver.addAttributeValue(techniqueEffect, "Soc_Impatience", techUseResolver, attrGetters, attrSetters);
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Request":
                techUseResolver.addRequestCheck(techniqueEffect, techUseResolver, attrGetters);
                break;
            case "Status":
                techUseResolver.addStatusEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters);
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Influence":
            case "Resistance":
            case "Advantage":
            case "Move":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
        }
    }
    
    applySetters(techUseResolver, attrGetters, attrSetters, willBreakEffect) {
        techUseResolver.senderTokenEffect.performDamageRolls(attrGetters.sender, attrSetters.sender, willBreakEffect);
        techUseResolver.targetTokenEffect.performDamageRolls(attrGetters.target, attrSetters.target, willBreakEffect);
        techUseResolver.senderTokenEffect.performStatusResults(attrSetters.sender);
        techUseResolver.targetTokenEffect.performStatusResults(attrSetters.target);
        attrSetters.sender.run();
        attrSetters.target.run();
        techUseResolver.printMessages();
    }
    
    addHPEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters) {
        let roll = "";
        let tokenEffect = techUseResolver.getTargetTokenEffect(techniqueEffect, techUseResolver);
        
        switch (techniqueEffect.subType) {
            case "Surge":
                let surgeValue = attrGetters.getObjByTarget(techniqueEffect).parseInt(WuxDef.GetVariable("Surge"));
                if (surgeValue <= 0) {
                    if(!tokenEffect.hasSurged()) {
                        techUseResolver.addMessage("Cannot Surge, no Surge available");
                    }
                    tokenEffect.setSpendSurge();
                    return;
                }
                if(!tokenEffect.hasSurged()) {
                    tokenEffect.spendSurge(attrSetters.getObjByTarget(techniqueEffect));
                }
                
                roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
                if (techniqueEffect.formula.hasWorker(WuxDef.GetVariable("TargetHV"))) {
                    let hvValue = attrGetters.getObjByTarget(techniqueEffect).parseInt(WuxDef.GetVariable("Cmb_HV"));
                    Debug.Log(`Adding HV Value of ${hvValue} to Surge Heal`);
                    roll.addModToRoll(hvValue, "HV");
                }
                roll.setDamageType("HP Heal");
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
                break;
            case "Heal":
                roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
                roll.setDamageType("HP Heal");
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
                break;
            default:
                roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
                if (techUseResolver.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Empowered")) {
                    roll.addModToRoll(attrGetters.sender.parseInt("CR") + 3, "Empowered");
                    techUseResolver.senderTokenEffect.tokenTargetData.removeStatus(attrSetters.sender, "Stat_Empowered");
                    techUseResolver.addMessage(`Removed Empowered status.`);
                }
                let damageType = WuxDef.GetTitle(techniqueEffect.effect);
                if (damageType == "Weapon") {
                    damageType = attrGetters.sender.parseString(WuxDef.GetVariable("WeaponDamage"));
                    if (damageType == "" || damageType == 0) {
                        damageType = WuxDef.GetTitle("Dmg_Force");
                    }
                    else {
                        damageType = WuxDef.GetTitle(damageType);
                    }
                }
                roll.setDamageType(damageType);
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
        }
    }

    addWillEffect(techniqueEffect, techUseResolver, attrGetters) {
        let roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = techUseResolver.getTargetTokenEffect(techniqueEffect, techUseResolver);

        switch (techniqueEffect.subType) {
            case "Heal":
                roll.setDamageType("Will Heal");
                break;
            case "Full":
                roll.setDamageType("Will Full Heal");
                break;
            case "Overflow":
                roll.setDamageType("Will Overflow");
                break;
            default:
                roll.setDamageType("Will");
                break;
        }
        tokenEffect.addDamageRoll(roll);
    }
    
    addEnergyEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters) {
        let roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = techUseResolver.getTargetTokenEffect(techniqueEffect, techUseResolver);
        tokenEffect.tokenTargetData.addEnergy(attrSetters.getObjByTarget(techniqueEffect), roll.total);
    }

    addFavorEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters) {
        let roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = techUseResolver.getTargetTokenEffect(techniqueEffect, techUseResolver);

        switch (techniqueEffect.subType) {
            case "Heal":
                tokenEffect.tokenTargetData.addFavor(attrSetters.getObjByTarget(techniqueEffect), roll.total * -1);
                techUseResolver.addMessage(`${tokenEffect.tokenTargetData.displayName} loses ${Format.ShowTooltip(roll.total, roll.message)} Favor`);
                break;
            default:
                tokenEffect.tokenTargetData.addFavor(attrSetters.getObjByTarget(techniqueEffect), roll.total);
                techUseResolver.addMessage(`${tokenEffect.tokenTargetData.displayName} gains ${Format.ShowTooltip(roll.total, roll.message)} Favor`);
                break;
        }
    }

    addRequestCheck(techniqueEffect, techUseResolver, attrGetters) {
        let roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
        if (techniqueEffect.formula.hasWorker(WuxDef.GetVariable("TargetFavor"))) {
            let favorDef = WuxDef.Get("Soc_Favor");
            let favorValue = attrGetters.getObjByTarget(techniqueEffect).parseInt(favorDef.getVariable());
            let favorMax = attrGetters.getObjByTarget(techniqueEffect).parseInt(favorDef.getVariable(WuxDef._max));
            roll.addModToRoll(Math.min(favorValue, favorMax));
        }
        let message = `Request Check: ${Format.ShowTooltip(roll.total, roll.message)}`;
        techUseResolver.addMessage(message);
    }
    
    addStatusEffect(techniqueEffect, techUseResolver, attrGetters, attrSetters) {
        let tokenEffect = techUseResolver.getTargetTokenEffect(techniqueEffect, techUseResolver);
        let roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);

        switch (techniqueEffect.subType) {
            case "Set":
                tokenEffect.addStatusResult(techniqueEffect.effect, "set", roll.total);
                break;
            case "Add":
            case "Self":
            case "Choose":
                tokenEffect.addStatusResult(techniqueEffect.effect, "add", roll.total);
                break;
            case "Remove":
                tokenEffect.addStatusResult(techniqueEffect.effect, "remove", roll.total);
                break;
            case "Remove Any":
            case "Remove All":
                tokenEffect.setRemoveStatusType(attrSetters.getObjByTarget(techniqueEffect), "Condition");
                break;
            case "Remove Will":
                tokenEffect.setRemoveStatusType(attrSetters.getObjByTarget(techniqueEffect), "Emotion");
                break;
        }
        
    }
    
    addAttributeValue(techniqueEffect, attrName, techUseResolver, attrGetters, attrSetters) {
        let roll = techUseResolver.calculateFormula(techniqueEffect, attrGetters.sender);
        let attrValue = attrGetters.getObjByTarget(techniqueEffect).parseInt(attrName);
        attrSetters.getObjByTarget(techniqueEffect).addUpdate(attrName, attrValue + roll.total);
    }
    
    calculateFormula(techniqueEffect, senderAttrHandler) {
        let dVal = parseInt(techniqueEffect.dVal);
        dVal = isNaN(dVal) ? 0 : dVal;
        let dType = parseInt(techniqueEffect.dType);
        dType = isNaN(dType) ? 0 : dType;
        let roll = new DamageRoll();
        if (techniqueEffect.traits.includes("Brutal")) {
            roll.dropRollDice(dVal * 2, dType, dVal, true);
        }
        else {
            roll.rollDice(dVal, dType);
        }
        roll.addModToRoll(techniqueEffect.formula.getValue(senderAttrHandler), "Base Mod");
        return roll;
    }
    
    getTargetTokenEffect(techniqueEffect, techUseResolver) {
        if (techniqueEffect.target == "Self") {
            return techUseResolver.senderTokenEffect;
        }
        else {
            return techUseResolver.targetTokenEffect;
        }
    }

    printMessages() {
        this.messages = this.messages.concat(this.senderTokenEffect.effectMessages);
        this.messages = this.messages.concat(this.targetTokenEffect.effectMessages);
        let systemMessage = this.getMessageObject();
        WuxMessage.Send(systemMessage);
        Debug.LogShout(this.msg, `[TechniqueUseResolver] Finished with duration of ${Date.now() - this.startTime}`);
        
        if (this.senderTokenEffect.removeStatusMessage != "") {
            let systemMessage = new SystemInfoMessage(this.senderTokenEffect.removeStatusMessage);
            systemMessage.setSender("System");
            WuxMessage.SendToSenderAndGM(systemMessage, this.msg);
        }
        if (this.targetTokenEffect.removeStatusMessage != "") {
            let systemMessage = new SystemInfoMessage(this.targetTokenEffect.removeStatusMessage);
            systemMessage.setSender("System");
            WuxMessage.SendToSenderAndGM(systemMessage, this.msg);
        }
    }
}

on("ready", function () {
    'use strict';

    WuxConflictManager.CheckInstall();
    WuxTechniqueResolver.CheckInstall();
});

