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
                case "!rollinit":
                    rollInitiative();
                    break;
            }
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

            let systemMessage = new SystemInfoMessage(tableData.print());
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage);
        },
        resetCombatStateVariables = function () {
            TargetReference.ClearActiveTargetData();
            state.WuxConflictManager.round = 0;
            state.WuxConflictManager.conflictType = "";
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
                tokenTargetData.refreshCombatDetails(attributeHandler);

                attributeHandler.addGetAttrCallback(function (attrGetter) {
                    if (!tokenTargetData.hasStatus(attrGetter, "Stat_Burn Aegis")) {
                        tokenEffect.takeAflameEffect(attrGetter);
                    }
                    tokenEffect.takeBleedingEffect(attrGetter);
                    tokenEffect.takeDoubtEffect(attrGetter);
                });
                
                attributeHandler.addFinishCallback(function (attrGetter) {
                    let newAttributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                    tokenEffect.performDamageRolls(attrGetter, newAttributeHandler);
                    removeStartOfRoundStatuses(tokenTargetData, newAttributeHandler, messages);
                    
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
                            tokenTargetData.addRun(attributeHandler);
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
        removeStartOfRoundStatuses = function (tokenTargetData, attrHandler, messages) {
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Armored")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Armored");
                messages.push(`${tokenTargetData.displayName} is no longer Armored`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Dodge")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Dodge");
                messages.push(`${tokenTargetData.displayName} is no longer Dodging`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Hindered")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Hindered");
                messages.push(`${tokenTargetData.displayName} is no longer Hindered`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Rally")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Rally");
                messages.push(`${tokenTargetData.displayName} is no longer Rallied`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Distracted")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Distracted");
                messages.push(`${tokenTargetData.displayName} is no longer Distracted`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Blinded")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Blinded");
                messages.push(`${tokenTargetData.displayName} is no longer Blinded`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Cold Aegis") && tokenTargetData.hasStatus(attrHandler, "Stat_Chilled")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Cold Aegis");
                tokenTargetData.removeStatus(attrHandler, "Stat_Chilled");
                messages.push(`${tokenTargetData.displayName} is no Chilled and Cold Aegis ends`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Burn Aegis") && tokenTargetData.hasStatus(attrHandler, "Stat_Aflame")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Burn Aegis");
                tokenTargetData.removeStatus(attrHandler, "Stat_Aflame");
                messages.push(`${tokenTargetData.displayName} is no Aflame and Burn Aegis ends`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Sand Aegis") && tokenTargetData.hasStatus(attrHandler, "Stat_Earthblight")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Sand Aegis");
                tokenTargetData.removeStatus(attrHandler, "Stat_Earthblight");
                messages.push(`${tokenTargetData.displayName} is no Earthblighted and Sand Aegis ends`);
            }
            if (tokenTargetData.hasStatus(attrHandler, "Stat_Shock Aegis") && tokenTargetData.hasStatus(attrHandler, "Stat_Jolted")) {
                tokenTargetData.removeStatus(attrHandler, "Stat_Shock Aegis");
                tokenTargetData.removeStatus(attrHandler, "Stat_Jolted");
                messages.push(`${tokenTargetData.displayName} is no Jolted and Shock Aegis ends`);
            }
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
                case "!chtech":
                    commandCheckTechnique(msg, content);
                    break;
                case "!utech":
                    commandUseTechnique(msg, content);
                    break;
                case "!utech2":
                    commandUseSecondaryTechnique(msg, content);
                    break;
                case "!sutech":
                    commandUseTechnique(msg, content);
                    break;
            }
        },

        commandConsumeTechnique = function (msg, content) {
            let techniqueConsumptionResolver = new TechniqueConsumptionResolver(msg, content);
            techniqueConsumptionResolver.initialize();
            techniqueConsumptionResolver.run();
        },
        commandCheckTechnique = function (msg, content) {
            let techniqueCheckResolver = new TechniqueCheckResolver(msg, content);
            techniqueCheckResolver.initialize();
            techniqueCheckResolver.run();
        },
        commandUseTechnique = function (msg, content) {
            let techUseResolver = new TechniqueUseResolver(msg, content);
            techUseResolver.initialize();
            techUseResolver.run();
        },
        commandUseSecondaryTechnique = function (msg, content) {
            let techUseResolver = new TechniqueUseResolver(msg, content, true);
            techUseResolver.initialize();
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
        this.addWillResetEffect();
    }

    add(techniqueEffect) {
        techniqueEffect.defense = "";
        this.willBreakEffects.add(techniqueEffect.name, techniqueEffect);
    }
    
    addWillResetEffect() {
        let willResetEffect = new TechniqueEffect();
        willResetEffect.name = "Will Overflow";
        willResetEffect.type = "WILL";
        willResetEffect.subType = "Overflow";
        willResetEffect.formula = new FormulaData(0);
        Debug.Log("Adding will reset effect");
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
        return techUseEffect.getUseTech(this.sourceSheetName, true) + `$$${this.targetTokenId}$$0`;
    }
}

class TechniqueResolverData {
    constructor(msg, content) {
        this.createEmpty();
        this.msg = msg;
        this.content = content;
    }
    
    createEmpty() {
        this.msg = {};
        this.content = "";
        this.sourceSheetName = "";
        this.senderTokenTargetData = {};
        this.messages = [];
    }
    
    initialize() {
        this.splitContent(this.content);
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
        let willDamageRoll = new DamageRoll();
        willDamageRoll.addModToRoll(resourceObject.resourceValue);
        
        let willBreakTechEffect = new TechniqueEffect();
        willBreakTechEffect.name = "T0";
        willBreakTechEffect.target = "Self";
        willBreakTechEffect.type = "HP";
        willBreakTechEffect.subType = "Cast WillBreak";
        
        let willBreakEffect = new TechniqueWillBreakEffects("Magic", 
            techniqueConsumptionResolver.sourceSheetName, techniqueConsumptionResolver.tokenEffect.tokenTargetData.tokenId);
        willBreakEffect.add(willBreakTechEffect);
        
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

class TechniqueSkillCheckResolver extends TechniqueResolverData {
    constructor(msg, content, useSecondaryTechniques) {
        super(msg, content);
        this.startTime = Date.now();
        this.useSecondaryTechniques = (useSecondaryTechniques == true);
    }

    createEmpty() {
        super.createEmpty();
        this.technique = {};
        this.skillCheck = 0;
        this.skillCheckValue = 0;
        this.advantage = 0;
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

        let targetToken = TargetReference.GetTokenTargetData(contentData[2]);
        if (targetToken == undefined) {
            return;
        }
        this.targetTokenEffect = new TokenTargetEffectsData(targetToken);
        if (contentData.length >= 4) {
            this.advantage = parseInt(contentData[3]);
        }
        this.addInitialMessage();
    }

    initializeTechniqueData(data) {
        this.technique = new TechniqueUseEffect();
        try {
            this.technique.importSandboxJson(data);
            this.technique.setup();
        }
        catch {
            let techniqueData = WuxTechs.Get(data);
            if (techniqueData == undefined) {
                let item = WuxItems.Get(data);
                if (item == undefined) {
                    return;
                }
                techniqueData = item.technique;
            }
            this.technique.importFromTechnique(techniqueData, this.useSecondaryTechniques);
            this.technique.setup();
        }
    }

    addInitialMessage() {
        this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} uses ${this.technique.name} on ${this.targetTokenEffect.tokenTargetData.displayName}`);
    }

    run() {
        if (this.senderTokenTargetData == undefined || this.targetTokenEffect.tokenTargetData == undefined) {
            return;
        }
        let techSkillCheckResolver = this;
        let senderAttributeHandler = new SandboxAttributeHandler(this.senderTokenEffect.tokenTargetData.charId);
        techSkillCheckResolver.tryGetSenderAttributes(techSkillCheckResolver, senderAttributeHandler);
        techSkillCheckResolver.tryGetSenderSkillCheck(techSkillCheckResolver, senderAttributeHandler);
        techSkillCheckResolver.getTargetData(techSkillCheckResolver, senderAttributeHandler);
        senderAttributeHandler.run();
    }

    tryGetSenderAttributes(techSkillCheckResolver, senderAttributeHandler) {
        this.senderTokenEffect.tokenTargetData.refreshCombatDetails(senderAttributeHandler);
        senderAttributeHandler.addMod(WuxDef.GetVariable("CR"));
    }

    tryGetSenderSkillCheck(techSkillCheckResolver, senderAttributeHandler) {
        if (techSkillCheckResolver.technique.skill == "") {
            return;
        }

        switch (techSkillCheckResolver.technique.skillType) {
            case "":
                this.getSimpleSkillCheck(techSkillCheckResolver, senderAttributeHandler);
                break;
            case "group":
                this.getGroupSkillCheck(techSkillCheckResolver, senderAttributeHandler, techSkillCheckResolver.technique.skill);
                break;
            case "attr":
                this.getAttrSkillCheck(techSkillCheckResolver, senderAttributeHandler);
                break;
            default:
                this.getSimpleSkillCheck(techSkillCheckResolver, senderAttributeHandler);
                break;
        }
    }

    getSimpleSkillCheck(techSkillCheckResolver, senderAttributeHandler) {
        let skillCheckVar = WuxDef.GetVariable(Format.GetDefinitionName("Skill", techSkillCheckResolver.technique.skill));
        senderAttributeHandler.addMod(skillCheckVar);

        senderAttributeHandler.addGetAttrCallback(function (attrHandler) {
            techSkillCheckResolver.skillCheckValue = attrHandler.parseInt(skillCheckVar);
        });
    }

    getGroupSkillCheck(techSkillCheckResolver, senderAttributeHandler, skillGroup) {
        let skillFilters = WuxDef.GetGroupVariables(new DatabaseFilterData("subGroup", skillGroup));
        Debug.Log(`${skillGroup} Skill Group: ${JSON.stringify(skillFilters)}`);
        senderAttributeHandler.addMod(skillFilters);

        senderAttributeHandler.addGetAttrCallback(function (attrHandler) {
            techSkillCheckResolver.skillCheckValue = 0;
            let checkValue = 0;
            for (let i = 0; i < skillFilters.length; i++) {
                checkValue = attrHandler.parseInt(skillFilters[i]);
                if (checkValue > techSkillCheckResolver.skillCheckValue) {
                    techSkillCheckResolver.skillCheckValue = checkValue;
                }
            }
        });
    }

    getAttrSkillCheck(techSkillCheckResolver, senderAttributeHandler) {
        let attributeCheckVar = WuxDef.GetVariable(Format.GetDefinitionName("Attribute", techSkillCheckResolver.technique.skill));
        Debug.Log(`Adding mod ${attributeCheckVar}`);
        senderAttributeHandler.addMod(attributeCheckVar);

        senderAttributeHandler.addGetAttrCallback(function (attrHandler) {
            techSkillCheckResolver.skillCheckValue = attrHandler.parseInt(attributeCheckVar);
        });
    }

    getTargetData(techSkillCheckResolver, senderAttributeHandler) {
        this.targetTokenEffect.tokenTargetData.refreshCombatDetails(senderAttributeHandler);
        senderAttributeHandler.addFinishCallback(function (senderAttrHandler) {
            let targetAttributeHandler = new SandboxAttributeHandler(techSkillCheckResolver.targetTokenEffect.tokenTargetData.charId);
            techSkillCheckResolver.tryGetDefensesAndAttributes(techSkillCheckResolver, targetAttributeHandler);
            techSkillCheckResolver.performEffects(techSkillCheckResolver, senderAttrHandler, targetAttributeHandler);
            targetAttributeHandler.run();
        })
    }

    tryGetDefensesAndAttributes(techSkillCheckResolver, targetAttributeHandler) {
        targetAttributeHandler.addMod(WuxDef.GetVariable("CR"));
        techSkillCheckResolver.targetTokenEffect.tokenTargetData.refreshCombatDetails(targetAttributeHandler);
    }

    performEffects(techSkillCheckResolver, senderAttrHandler, targetAttributeHandler) {
        // ADD CODE TO PERFORM EFFECTS
    }
    
    getDodgeDefense() {
        if (this.technique.impacts.includes("Truehit")) {
            return undefined;
        }
        if (this.technique.coreDefense == "Brace" || this.technique.coreDefense == "Warding") {
            return "Evasion";
        }
        if (this.technique.coreDefense == "Ego" || this.technique.coreDefense == "Resolve") {
            return "Insight";
        }
        return undefined;
    }
    
    getAdvantageBonus(senderAttributeHandler, targetAttributeHandler, removeStatus) {
        let advantage = this.advantage;
        
        // add the source token's advantage
        let tokenAdvantage = this.senderTokenEffect.tokenTargetData.getAdvantage();
        if (tokenAdvantage != 0) {
            advantage += tokenAdvantage;
            this.senderTokenEffect.tokenTargetData.setAdvantageIcon(false);
        }

        // add advantages based on sender statuses
        if (this.technique.action != "Assist") {
            let downed = this.senderTokenEffect.tokenTargetData.getStatusRank(senderAttributeHandler, "Stat_Downed");
            if (downed > 0) {
                advantage -= downed;
                this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Downed: +${downed} Disadvantage`);
            }
        }
        if (this.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Impaired")) {
            advantage -= 1;
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Impaired: +1 Disadvantage`);
        }
        if (this.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Sickened")) {
            advantage -= 1;
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Sickened: +1 Disadvantage`);
        }
        if (this.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Soaked")) {
            advantage -= 1;
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Soaked: +1 Disadvantage`);
        }
        if (this.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Blinded")) {
            advantage -= 2;
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Blinded: +2 Disadvantage`);
        }
        if (this.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Encouraged")) {
            advantage -= 1;
            if (removeStatus) {
                this.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Encouraged");
            }
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Encouraged: +1 Advantage. Removed Encouraged status.`);
        }
        let distracted = this.senderTokenEffect.tokenTargetData.getStatusRank(senderAttributeHandler, "Stat_Distracted");
        if (distracted > 0) {
            advantage -= distracted;
            if (removeStatus) {
                this.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Distracted");
            }
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Distracted: +${distracted} Disadvantage. Removed Distracted status.`);
        }
        let rally = this.senderTokenEffect.tokenTargetData.getStatusRank(senderAttributeHandler, "Stat_Rally");
        if (rally > 0) {
            advantage += rally;
            if (removeStatus) {
                this.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Rally");
            }
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Rallied: +${rally} Advantage. Removed Rally status.`);
        }

        // add advantages based on what statuses the target has
        if (this.technique.getTraits().includes("Social")) {
            let agreeable = this.targetTokenEffect.tokenTargetData.getStatusRank(targetAttributeHandler, "Stat_Agreeable");
            if (agreeable > 0) {
                advantage += agreeable;
                this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Agreeable: +${agreeable} Advantage.`);
            }
            let oppositional = this.targetTokenEffect.tokenTargetData.getStatusRank(targetAttributeHandler, "Stat_Oppositional");
            if (oppositional > 0) {
                advantage -= oppositional;
                this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Oppositional: +${oppositional} Disadvantage.`);
            }
        }
        if (this.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Hindered")) {
            advantage += 1;
            if (removeStatus) {
                this.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Hindered");
            }
            this.addMessage(`${this.targetTokenEffect.tokenTargetData.displayName} is Hindered: +1 Advantage. Removed Hindered status.`);
        }
        if (this.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Prone")) {
            advantage += 1;
            this.addMessage(`${this.targetTokenEffect.tokenTargetData.displayName} is Prone: +1 Advantage`);
        }
        if (this.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Restrained")) {
            advantage += 1;
            this.addMessage(`${this.targetTokenEffect.tokenTargetData.displayName} is Restrained: +1 Advantage`);
        }
        if (this.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Frozen")) {
            advantage += 2;
            this.addMessage(`${this.targetTokenEffect.tokenTargetData.displayName} is Frozen: +2 Advantage`);
        }
        if (this.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Paralyzed")) {
            advantage += 2;
            this.addMessage(`${this.targetTokenEffect.tokenTargetData.displayName} is Paralyzed: +2 Advantage`);
        }
        if (this.targetTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Blinded")) {
            advantage += 1;
            this.addMessage(`${this.senderTokenEffect.tokenTargetData.displayName} is Blinded: +1 Advantage`);
        }
        
        return advantage;
    }
}

class TechniqueCheckResolver extends TechniqueSkillCheckResolver {
    
    performEffects(techCheckResolver, senderAttrHandler, targetAttributeHandler) {
        this.printPassChance();
        this.printMessages();
        targetAttributeHandler.addFinishCallback(function (targetAttrHandler) {
            techCheckResolver.printPassChance(senderAttrHandler, targetAttrHandler);
        });
    }
    
    printPassChance(senderAttrHandler, targetAttrHandler) {
        let dodgeDefense = this.getDodgeDefense();
        if (dodgeDefense != undefined) {
            this.getPassChance(dodgeDefense, senderAttrHandler, targetAttrHandler);
        }
        this.getPassChance(this.technique.coreDefense, senderAttrHandler, targetAttrHandler);
    }
    
    getPassChance(defense, senderAttrHandler, targetAttrHandler) {
        if (defense == "") {
            return;
        }
        let defenseName = `DC ${defense}`;
        let dcValue = parseInt(defense);
        if (isNaN(dcValue)) {
            defenseName = defense;
            dcValue = this.targetTokenEffect.tokenTargetData.combatDetails.getDefense(defense);
        }
        
        let skillCheckDifference = dcValue - this.skillCheckValue;
        if (this.technique.impacts.includes("Accurate")) {
            skillCheckDifference -= 2;
        }
        let advantage = this.getAdvantageBonus(senderAttrHandler, targetAttrHandler, false);
        let odds = this.probAtLeastKeep(advantage, skillCheckDifference);

        this.addMessage(`Vs. ${defenseName}: ${odds}`);
    }
    
    probAtLeastKeep(n, target) {
        
        const minSum = 2;
        const maxSum = 12;

        if (target <= minSum) return "100%";
        if (target > maxSum) return "0%";
        
        let totalDice = 2 + Math.abs(n);
        if (totalDice > 8) totalDice = 8;

        const keepMode = n >= 0 ? 'highest' : 'lowest';
        const k = 2; // always keep 2 dice

        const totalOutcomes = Math.pow(6, totalDice);
        let successful = 0;

        function recurse(i, cur) {
            if (i === totalDice) {
                const sorted = cur.slice().sort((a, b) => a - b);
                let sum;

                if (keepMode === 'highest') {
                    sum = sorted[totalDice - 1] + sorted[totalDice - 2];
                } else {
                    sum = sorted[0] + sorted[1];
                }

                if (sum >= target) successful++;
                return;
            }

            for (let f = 1; f <= 6; f++) {
                cur[i] = f;
                recurse(i + 1, cur);
            }
        }

        recurse(0, new Array(totalDice));

        const percent = Math.round((successful / totalOutcomes) * 100);
        return percent + "%";
    }

    printMessages() {
        this.messages = this.messages.concat(this.senderTokenEffect.effectMessages);
        this.messages = this.messages.concat(this.targetTokenEffect.effectMessages);
        let systemMessage = this.getMessageObject();
        WuxMessage.SendToSender(systemMessage, this.msg);

    }
    
}

class TechniqueUseResolver extends TechniqueSkillCheckResolver {
    
    createEmpty() {
        super.createEmpty();
        this.passedDodge = false;
        this.passedCheck = false;
    }

    tryGetSenderAttributes(techUseResolver, senderAttributeHandler) {
        
        super.tryGetSenderAttributes(techUseResolver, senderAttributeHandler);
        techUseResolver.senderTokenEffect.tokenTargetData.refreshCombatDetails(senderAttributeHandler);
        techUseResolver.technique.effects.iterate(function (techniqueEffect) {
            senderAttributeHandler.addMod(techniqueEffect.formula.getAttributes());
        });
    }
    
    performEffects(techUseResolver, senderAttrHandler, targetAttributeHandler) {
        targetAttributeHandler.addFinishCallback(function (targetAttrHandler) {
            let passCheck = true;
            let willBreakEffect = new TechniqueWillBreakEffects(techUseResolver.technique.name,
                techUseResolver.sourceSheetName, techUseResolver.targetTokenEffect.tokenTargetData.tokenId);
            let techDisplayData = new TechniqueEffectDisplayUseData("", 
                techUseResolver.senderTokenEffect.tokenTargetData.displayName, techUseResolver.targetTokenEffect.tokenTargetData.displayName);

            let attrGetters = new TechniqueTargetObjectCollection(senderAttrHandler, targetAttrHandler);
            let attrSetters = new TechniqueTargetObjectCollection(
                new SandboxAttributeHandler(techUseResolver.senderTokenEffect.tokenTargetData.charId),
                new SandboxAttributeHandler(techUseResolver.targetTokenEffect.tokenTargetData.charId));

            techUseResolver.rollSkillCheck(attrSetters);
            techUseResolver.checkDc(attrSetters);
            
            if (techUseResolver.technique.effects.useDefaultWillBreak) {
                willBreakEffect.add(techUseResolver.technique.effects.getDefaultWillbreak());
            }
            
            techUseResolver.technique.effects.iterate(function (techniqueEffect) {
                if (techniqueEffect.defense == "WillBreak") {
                    willBreakEffect.add(techniqueEffect);
                    return;
                }
                if (techniqueEffect.defense == "Def_Evasion") {
                    passCheck = techUseResolver.passedDodge;
                    
                    // this is doing damage halving differently. turn it off
                    techUseResolver.targetTokenEffect.halveAllDamage = false;
                }
                else if (techniqueEffect.defense == "") {
                    passCheck = true;
                }
                else {
                    Debug.Log("vs a defense. Seeing if passed: " + passCheck);
                }
                
                if (passCheck) {
                    techUseResolver.addEffects(techniqueEffect, attrGetters, attrSetters, techDisplayData);
                }
            });

            techUseResolver.applySetters(attrGetters, attrSetters, willBreakEffect);
        });
    }

    rollSkillCheck(attrSetters) {
        if (this.technique.skill == "") {
            return;
        }

        let advantage = this.getAdvantageBonus(attrSetters.sender, attrSetters.target, true);

        this.skillCheck = new DieRoll();
        this.skillCheck.rollCheck(advantage);
        this.skillCheck.addModToRoll(this.skillCheckValue, this.technique.skill);
        if (this.technique.impacts.includes("Accurate")) {
            this.skillCheck.addModToRoll(2, "Accurate");
        }
        this.addMessage(`${this.technique.skill} Check: ` +
            Format.ShowTooltip(`${this.skillCheck.total}`, this.skillCheck.message));
    }
    
    checkDc(targetAttrHandler) {
        let dodgeDefense = this.getDodgeDefense();
        if (dodgeDefense != undefined) {
            this.passedDodge = this.checkPassDefense(dodgeDefense, targetAttrHandler);
        }
        else {
            this.passedDodge = true;
        }
        
        if (this.passedDodge) {
            this.passedCheck = this.checkPassDefense(this.technique.coreDefense, targetAttrHandler);
            this.targetTokenEffect.halveAllDamage = !this.passedCheck;
        }
        else {
            this.passedCheck = this.passedDodge;
        }
    }
    
    checkPassDefense(defense, targetAttrHandler) {
        if (defense == "") {
            return true;
        }
        let message = "";
        let dcValue = parseInt(defense);
        if (isNaN(dcValue)) {
            message = `Vs. ${defense}`;
            dcValue = this.targetTokenEffect.tokenTargetData.combatDetails.getDefense(defense);
            if (this.targetTokenEffect.tokenTargetData.hasStatus(targetAttrHandler, "Stat_Dodge") && defense == "Evasion") {
                this.targetTokenEffect.tokenTargetData.removeStatus(targetAttrHandler, "Stat_Dodge");
                this.addMessage(`${this.targetTokenEffect.tokenTargetData.displayName}: +5 Evasion. Removed Dodge status.`);
            }

            if (dcValue < 0) {
                dcValue = 0;
            }
            message += `: `;
        }
        else {
            message = `Vs. DC ${dcValue}: `;
        }
        let pass = this.skillCheck.total >= dcValue;
        message += pass ? "Success!" : "Failure!";
        this.addMessage(message);
        return pass;
    }
    
    addEffects(techniqueEffect, attrGetters, attrSetters, techDisplayData) {

        switch (techniqueEffect.type) {
            case "Damage":
                this.addDamageEffect(techniqueEffect, attrGetters, attrSetters);
                break;
            case "HP":
                this.addHPEffect(techniqueEffect, attrGetters, attrSetters);
                break;
            case "WILL":
                this.addWillEffect(techniqueEffect, attrGetters);
                break;
            case "EN":
                this.addEnergyEffect(techniqueEffect, attrGetters, attrSetters);
                this.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Favor":
                this.addFavorEffect(techniqueEffect, attrGetters, attrSetters);
                break;
            case "Vitality":
                this.addVitalityEffect(techniqueEffect, attrGetters, attrSetters);
                break;
            case "Impatience":
                this.addImpatienceEffect(techniqueEffect, attrGetters, attrSetters);
                break;
            case "Request":
                this.addRequestCheck(techniqueEffect, attrGetters);
                break;
            case "Status":
                this.addStatusEffect(techniqueEffect, attrGetters, attrSetters);
                this.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Influence":
            case "Resistance":
            case "Advantage":
            case "Move":
                this.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
        }
    }
    
    applySetters(attrGetters, attrSetters, willBreakEffect) {
        this.senderTokenEffect.performDamageRolls(attrGetters.sender, attrSetters.sender, willBreakEffect);
        this.targetTokenEffect.performDamageRolls(attrGetters.target, attrSetters.target, willBreakEffect);
        this.senderTokenEffect.performStatusResults(attrSetters.sender);
        this.targetTokenEffect.performStatusResults(attrSetters.target);
        attrSetters.sender.run();
        attrSetters.target.run();
        this.printMessages();
    }

    addDamageEffect(techniqueEffect, attrGetters, attrSetters) {
        let roll = "";
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect);
        let subTypeParts = techniqueEffect.subType.split(":");
        let subType = subTypeParts[0];
        
        if (subType == "Burst Damage") {
            let burstDamageRank = this.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Burst");
            if (burstDamageRank == false || burstDamageRank <= 0) {
                this.addMessage(`No Burst condition. No bonus damage.`);
                return;
            }

            let modifiedTechniqueEffect = new TechniqueEffect(techniqueEffect);
            modifiedTechniqueEffect.dVal *= burstDamageRank;
            modifiedTechniqueEffect.formula.setMultipliers(burstDamageRank);
            this.senderTokenEffect.tokenTargetData.removeStatus(attrSetters.sender, "Stat_Burst");
            this.addMessage(`Removed Burst (Rank ${burstDamageRank}) condition.`);

            roll = this.calculateFormula(modifiedTechniqueEffect, attrGetters.sender);
            let burstDamageType = this.getDamageType(attrGetters, techniqueEffect);
            roll.setDamageType(burstDamageType);
            roll.setTraits(techniqueEffect.traits);
            tokenEffect.addDamageRoll(roll);
        }
        else if (subType == "Status") {
            let statusEffectName = Format.GetDefinitionName("Status", subTypeParts[1]);
            if (tokenEffect.hasStatus(attrSetters.getObjByTarget(techniqueEffect), statusEffectName)) {
                let statusEffect = WuxDef.GetTitle(statusEffectName);
                this.addMessage(`Adding bonus damage from ${statusEffect} conditional`);

                let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
                let damageType = this.getDamageType(attrGetters, techniqueEffect);
                roll.setDamageType(damageType);
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
            }
        }
        else if (subType == "Cond") {
            let statusEffectName = Format.GetDefinitionName("Status", subTypeParts[1]);
            if (this.senderTokenEffect.hasStatus(attrSetters.getObjByTarget(techniqueEffect), statusEffectName)) {
                let statusEffect = WuxDef.GetTitle(statusEffectName);
                this.addMessage(`Adding bonus damage from ${statusEffect} conditional`);

                let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
                let damageType = this.getDamageType(attrGetters, techniqueEffect);
                roll.setDamageType(damageType);
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
            }
        }
        if (techniqueEffect.effect == "Psyche") {
            let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
            roll.setDamageType("Psyche");
        }
        else {
            roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
            if (this.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Empowered")) {
                roll.addModToRoll(attrGetters.sender.parseInt("CR") + 3, "Empowered");
                this.senderTokenEffect.tokenTargetData.removeStatus(attrSetters.sender, "Stat_Empowered");
                this.addMessage(`Removed Empowered status.`);
            }
            let damageType = this.getDamageType(attrGetters, techniqueEffect);
            roll.setDamageType(damageType);
            roll.setTraits(techniqueEffect.traits);
        }
        tokenEffect.addDamageRoll(roll);
    }
    
    addHPEffect(techniqueEffect, attrGetters, attrSetters) {
        let roll = "";
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect);
        let subTypeParts = techniqueEffect.subType.split(":");
        let subType = subTypeParts[0];
        
        switch (subType) {
            case "Surge":
                let surgeValue = this.getTargetTokenEffect(techniqueEffect).tokenTargetData.combatDetails.getSurge();
                if (surgeValue <= 0) {
                    if(!tokenEffect.hasSurged()) {
                        this.addMessage("Cannot Surge, no Surge available");
                    }
                    tokenEffect.setSpendSurge();
                    return;
                }
                if(!tokenEffect.hasSurged()) {
                    tokenEffect.spendSurge(attrSetters.getObjByTarget(techniqueEffect));
                }
                
                roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
                if (techniqueEffect.formula.hasWorker(WuxDef.GetVariable("TargetHV"))) {
                    let hvValue = this.getTargetTokenEffect(techniqueEffect).getRegenValue();
                    roll.addModToRoll(hvValue, "HV");
                }
                roll.setDamageType("HP Heal");
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
                break;
            case "Heal":
                roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
                roll.setDamageType("HP Heal");
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
                break;
            case "Burst Damage":
                let burstDamageRank = this.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Burst");
                if (burstDamageRank == false || burstDamageRank <= 0) {
                    this.addMessage(`No Burst condition. No bonus damage.`);
                    break;
                }
                
                let modifiedTechniqueEffect = new TechniqueEffect(techniqueEffect);
                modifiedTechniqueEffect.dVal *= burstDamageRank;
                modifiedTechniqueEffect.formula.setMultipliers(burstDamageRank);
                this.senderTokenEffect.tokenTargetData.removeStatus(attrSetters.sender, "Stat_Burst");
                this.addMessage(`Removed Burst (Rank ${burstDamageRank}) condition.`);

                roll = this.calculateFormula(modifiedTechniqueEffect, attrGetters.sender);
                let burstDamageType = this.getDamageType(attrGetters, techniqueEffect);
                roll.setDamageType(burstDamageType);
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
                
                break;
            case "Status":
                let statusEffectName = Format.GetDefinitionName("Status", subTypeParts[1]);
                if (tokenEffect.hasStatus(attrSetters.getObjByTarget(techniqueEffect), statusEffectName)) {
                    let statusEffect = WuxDef.GetTitle(statusEffectName);
                    this.addMessage(`Adding bonus damage from ${statusEffect} conditional`);
                    
                    let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
                    let damageType = this.getDamageType(attrGetters, techniqueEffect);
                    roll.setDamageType(damageType);
                    roll.setTraits(techniqueEffect.traits);
                    tokenEffect.addDamageRoll(roll);
                }
                break;
            case "Cast WillBreak":
                tokenEffect.takeCastWillbreakEffect(attrSetters.getObjByTarget(techniqueEffect));
                break;
            default:
                roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
                if (this.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Empowered")) {
                    roll.addModToRoll(attrGetters.sender.parseInt("CR") + 3, "Empowered");
                    this.senderTokenEffect.tokenTargetData.removeStatus(attrSetters.sender, "Stat_Empowered");
                    this.addMessage(`Removed Empowered status.`);
                }
                let damageType = this.getDamageType(attrGetters, techniqueEffect);
                roll.setDamageType(damageType);
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
        }
    }
    
    getDamageType(techniqueEffect) {
        let damageType = WuxDef.GetTitle(techniqueEffect.effect);
        if (damageType == "Weapon") {
            damageType = this.senderTokenEffect.tokenTargetData.combatDetails.getWeaponDamage();
        }
        return damageType;
    }

    addWillEffect(techniqueEffect, attrGetters) {
        let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect);

        switch (techniqueEffect.subType) {
            case "Heal":
                roll.setDamageType("Will Heal");
                break;
            case "Full":
                roll.setDamageType("Will Full Heal");
                break;
            case "Overflow":
                Debug.Log("Overflow registered");
                roll.setDamageType("Will Overflow");
                break;
            default:
                roll.setDamageType("Psyche");
                break;
        }
        tokenEffect.addDamageRoll(roll);
    }
    
    addEnergyEffect(techniqueEffect, attrGetters, attrSetters) {
        let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect);
        tokenEffect.tokenTargetData.addEnergy(attrSetters.getObjByTarget(techniqueEffect), roll.total);
    }

    addFavorEffect(techniqueEffect, attrGetters, attrSetters) {
        let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect, this);

        switch (techniqueEffect.subType) {
            case "Heal":
                tokenEffect.tokenTargetData.addFavor(attrSetters.getObjByTarget(techniqueEffect), roll.total * -1);
                this.addMessage(`${tokenEffect.tokenTargetData.displayName} loses ${Format.ShowTooltip(roll.total, roll.message)} Favor`);
                break;
            default:
                tokenEffect.tokenTargetData.addFavor(attrSetters.getObjByTarget(techniqueEffect), roll.total);
                this.addMessage(`${tokenEffect.tokenTargetData.displayName} gains ${Format.ShowTooltip(roll.total, roll.message)} Favor`);
                break;
        }
    }

    addVitalityEffect(techniqueEffect, attrGetters, attrSetters) {
        let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect, this);

        switch (techniqueEffect.subType) {
            case "Heal":
                tokenEffect.tokenTargetData.addVitality(attrSetters.getObjByTarget(techniqueEffect), roll.total);
                this.addMessage(`${tokenEffect.tokenTargetData.displayName} gains ${Format.ShowTooltip(roll.total, roll.message)} Vitality`);
                break;
            default:
                tokenEffect.tokenTargetData.addVitality(attrSetters.getObjByTarget(techniqueEffect), roll.total * -1);
                this.addMessage(`${tokenEffect.tokenTargetData.displayName} loses ${Format.ShowTooltip(roll.total, roll.message)} Vitality`);
                break;
        }
    }

    addImpatienceEffect(techniqueEffect, attrGetters, attrSetters) {
        let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect);

        switch (techniqueEffect.subType) {
            case "Heal":
                tokenEffect.tokenTargetData.addImpatience(attrSetters.getObjByTarget(techniqueEffect), roll.total * -1);
                this.addMessage(`${tokenEffect.tokenTargetData.displayName} loses ${Format.ShowTooltip(roll.total, roll.message)} Impatience`);
                break;
            default:
                tokenEffect.tokenTargetData.addImpatience(attrSetters.getObjByTarget(techniqueEffect), roll.total);
                this.addMessage(`${tokenEffect.tokenTargetData.displayName} gains ${Format.ShowTooltip(roll.total, roll.message)} Impatience`);
                break;
        }
    }

    addRequestCheck(techniqueEffect, attrGetters) {
        let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
        if (techniqueEffect.formula.hasWorker(WuxDef.GetVariable("TargetFavor"))) {
            let favorValue = this.targetTokenEffect.getFavor();
            let favorMax = this.targetTokenEffect.getMaxFavor();
            roll.addModToRoll(Math.min(favorValue, favorMax), "Favor");
        }
        let agreeable = this.targetTokenEffect.tokenTargetData.getStatusRank(attrGetters.target, "Stat_Agreeable");
        if (agreeable > 0) {
            roll.addModToRoll(agreeable * 5, "Agreeable");
        }
        let oppositional = this.targetTokenEffect.tokenTargetData.getStatusRank(attrGetters.target, "Stat_Oppositional");
        if (oppositional > 0) {
            roll.addModToRoll(oppositional * -5, "Oppositional");
        }
        
        let message = `Request Check: ${Format.ShowTooltip(roll.total, roll.message)}`;
        this.addMessage(message);
    }
    
    addStatusEffect(techniqueEffect, attrGetters, attrSetters) {
        let tokenEffect = this.getTargetTokenEffect(techniqueEffect);
        let roll = this.calculateFormula(techniqueEffect, attrGetters.sender);
        let attrHandler = attrSetters.getObjByTarget(techniqueEffect);

        switch (techniqueEffect.subType) {
            case "Set":
                tokenEffect.tryAddStatusResult(techniqueEffect.effect, "set", roll.total, attrHandler);
                break;
            case "Add":
            case "Self":
            case "Choose":
                tokenEffect.tryAddStatusResult(techniqueEffect.effect, "add", roll.total, attrHandler);
                break;
            case "Trigger":
                switch (techniqueEffect.subType) {
                    case "Stat_Aflame":
                        tokenEffect.takeAflameEffect(attrHandler);
                        break;
                }
                break;
            case "Remove":
                tokenEffect.tryAddStatusResult(techniqueEffect.effect, "remove", roll.total);
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
    
    getTargetTokenEffect(techniqueEffect) {
        if (techniqueEffect.target == "Self") {
            return this.senderTokenEffect;
        }
        else {
            return this.targetTokenEffect;
        }
    }

    printMessages() {
        this.messages = this.messages.concat(this.senderTokenEffect.effectMessages);
        this.messages = this.messages.concat(this.targetTokenEffect.effectMessages);
        let systemMessage = this.getMessageObject();
        WuxMessage.Send(systemMessage);
        Debug.Log(this.msg, `[TechniqueResolver] Calculated with a duration of ${(Date.now() - this.startTime)/1000} seconds`);
        
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

