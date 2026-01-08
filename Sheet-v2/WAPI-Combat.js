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
                    if (tokenTargetData.hasStatus(newAttributeHandler, "Stat_Rally")) {
                        tokenTargetData.removeStatus(newAttributeHandler, "Stat_Rally");
                        messages.push(`${tokenTargetData.displayName} is no longer Rallied`);
                    }
                    if (tokenTargetData.hasStatus(newAttributeHandler, "Stat_Distracted")) {
                        tokenTargetData.removeStatus(newAttributeHandler, "Stat_Distracted");
                        messages.push(`${tokenTargetData.displayName} is no longer Distracted`);
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
                case "!chtech":
                    commandCheckTechnique(msg, content);
                    break;
                case "!utech":
                    if (state.WuxConflictManager.conflictType == "Social") {
                        sendToChat(msg.sender, `!sutech ${content}$$?{Advantage|0}`, false);
                    }
                    else {
                        commandUseTechnique(msg, content);
                    }
                    break;
                case "!sutech":
                    commandUseTechnique(msg, content);
                    break;
            }
        },

        commandConsumeTechnique = function (msg, content) {
            let techniqueConsumptionResolver = new TechniqueConsumptionResolver(msg, content);
            techniqueConsumptionResolver.run();
        },
        commandCheckTechnique = function (msg, content) {
            let techniqueCheckResolver = new TechniqueCheckResolver(msg, content);
            techniqueCheckResolver.run();
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
        return techUseEffect.getUseTech(this.sourceSheetName, true) + `$$0$$${this.targetTokenId}`;
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
        let willDamageRoll = new DamageRoll();
        willDamageRoll.addModToRoll(resourceObject.resourceValue);
        
        let willBreakTechEffect = new TechniqueEffect();
        willBreakTechEffect.name = "T0";
        willBreakTechEffect.target = "Self";
        willBreakTechEffect.type = "HP";
        let damageCalc = (5 + (attrHandler.parseInt(WuxDef.GetVariable("CR")) * 5));
        willBreakTechEffect.formula = new FormulaData("" + damageCalc);
        willBreakTechEffect.effect = "Tension";
        willBreakTechEffect.traits = "AP";
        
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
            Debug.Log(`[TechniqueSkill] TechniqueData created`);
        }
        catch {
            Debug.Log(`[TechniqueSkill] Forming TechniqueData from a name`);
            let techniqueData = WuxTechs.Get(data);
            if (techniqueData == undefined) {
                let item = WuxItems.Get(data);
                if (item == undefined) {
                    return;
                }
                techniqueData = item.technique;
            }
            this.technique.name = techniqueData.name;
            this.technique.skill = techniqueData.skill;
            this.technique.effects = new TechniqueEffectDatabase(techniqueData.effects);
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
        senderAttributeHandler.addMod(WuxDef.GetVariable("Status"));
        senderAttributeHandler.addMod(WuxDef.GetVariable("CR"));
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

    tryGetSenderSkillCheck(techSkillCheckResolver, senderAttributeHandler) {
        if (techSkillCheckResolver.technique.skill == "") {
            return;
        }

        let skillCheckVar = WuxDef.GetVariable(Format.GetDefinitionName("Skill", techSkillCheckResolver.technique.skill));
        senderAttributeHandler.addMod(skillCheckVar);

        senderAttributeHandler.addGetAttrCallback(function (attrHandler) {
            techSkillCheckResolver.skillCheckValue = attrHandler.parseInt(skillCheckVar);
        });
    }

    getTargetData(techSkillCheckResolver, senderAttributeHandler) {
        senderAttributeHandler.addFinishCallback(function (senderAttrHandler) {
            let targetAttributeHandler = new SandboxAttributeHandler(techSkillCheckResolver.targetTokenEffect.tokenTargetData.charId);
            techSkillCheckResolver.tryGetDefensesAndAttributes(techSkillCheckResolver, targetAttributeHandler);
            techSkillCheckResolver.performEffects(techSkillCheckResolver, senderAttrHandler, targetAttributeHandler);
            targetAttributeHandler.run();
        })
    }

    tryGetDefensesAndAttributes(techSkillCheckResolver, targetAttributeHandler) {
        targetAttributeHandler.addMod(WuxDef.GetVariable("Status"));
        targetAttributeHandler.addMod(WuxDef.GetVariable("CR"));
        techSkillCheckResolver.targetTokenEffect.tokenTargetData.refreshCombatDetails(targetAttributeHandler);
        techSkillCheckResolver.technique.effects.iterate(function (techniqueEffect) {
            if (techniqueEffect.defense.startsWith("Def_")) {
                let defenseDef = WuxDef.Get(techniqueEffect.defense);
                targetAttributeHandler.addMod(defenseDef.getVariable());
            }
            if (techniqueEffect.target != "Self") {
                techSkillCheckResolver.tryGetAttributesFromTechniqueEffect(techniqueEffect, targetAttributeHandler);
            }
        });
    }

    performEffects(techSkillCheckResolver, senderAttrHandler, targetAttributeHandler) {
        // ADD CODE TO PERFORM EFFECTS
    }
    
    getAdvantageBonus(techSkillCheckResolver, senderAttributeHandler, targetAttributeHandler, removeStatus) {
        let advantage = techSkillCheckResolver.advantage;

        // add advantages based on sender statuses
        if (techSkillCheckResolver.technique.action != "Assist") {
            if (techSkillCheckResolver.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Downed")) {
                advantage -= 1;
                techSkillCheckResolver.addMessage(`${techSkillCheckResolver.senderTokenEffect.tokenTargetData.displayName} is Downed: +1 Disadvantage`);
            }
        }
        if (techSkillCheckResolver.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Impaired")) {
            advantage -= 1;
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.senderTokenEffect.tokenTargetData.displayName} is Impaired: +1 Disadvantage`);
        }
        if (techSkillCheckResolver.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Sickened")) {
            advantage -= 1;
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.senderTokenEffect.tokenTargetData.displayName} is Sickened: +1 Disadvantage`);
        }
        if (techSkillCheckResolver.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Encouraged")) {
            advantage -= 1;
            if (removeStatus) {
                techSkillCheckResolver.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Encouraged");
            }
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.senderTokenEffect.tokenTargetData.displayName} is Encouraged: +1 Advantage. Removed Encouraged status.`);
        }
        let distracted = techSkillCheckResolver.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Distracted");
        if (distracted != false && distracted > 0) {
            advantage -= distracted;
            if (removeStatus) {
                techSkillCheckResolver.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Distracted");
            }
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.senderTokenEffect.tokenTargetData.displayName} is Distracted: +${distracted} Disadvantage. Removed Distracted status.`);
        }
        let rally = techSkillCheckResolver.senderTokenEffect.tokenTargetData.hasStatus(senderAttributeHandler, "Stat_Rally");
        if (rally != false && rally > 0) {
            advantage += rally;
            if (removeStatus) {
                techSkillCheckResolver.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Rally");
            }
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.senderTokenEffect.tokenTargetData.displayName} is Rallied: +${rally} Advantage. Removed Rally status.`);
        }

        // add advantages based on what statuses the target has
        if (techSkillCheckResolver.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Hindered")) {
            advantage += 1;
            if (removeStatus) {
                techSkillCheckResolver.targetTokenEffect.tokenTargetData.removeStatus(targetAttributeHandler, "Stat_Hindered");
            }
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.targetTokenEffect.tokenTargetData.displayName} is Hindered: +1 Advantage. Removed Hindered status.`);
        }
        if (techSkillCheckResolver.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Restrained")) {
            advantage += 1;
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.targetTokenEffect.tokenTargetData.displayName} is Restrained: +1 Advantage`);
        }
        if (techSkillCheckResolver.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Frozen")) {
            advantage += 2;
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.targetTokenEffect.tokenTargetData.displayName} is Frozen: +2 Advantage`);
        }
        if (techSkillCheckResolver.targetTokenEffect.tokenTargetData.hasStatus(targetAttributeHandler, "Stat_Paralyzed")) {
            advantage += 2;
            techSkillCheckResolver.addMessage(`${techSkillCheckResolver.targetTokenEffect.tokenTargetData.displayName} is Paralyzed: +2 Advantage`);
        }
        
        return advantage;
    }
}

class TechniqueCheckResolver extends TechniqueSkillCheckResolver {
    
    performEffects(techCheckResolver, senderAttrHandler, targetAttributeHandler) {
        targetAttributeHandler.addFinishCallback(function (targetAttrHandler) {
            techCheckResolver.getPassChance(techCheckResolver, senderAttrHandler, targetAttrHandler);
            techCheckResolver.printMessages();
        });
    }
    
    getPassChance(techCheckResolver, senderAttrHandler, targetAttrHandler) {
        let defenseChecks = [];
        techCheckResolver.technique.effects.iterate(function (techniqueEffect) {
            if (defenseChecks.includes(techniqueEffect.defense) || techniqueEffect.defense == "WillBreak") {
                return;
            }
            defenseChecks.push(techniqueEffect.defense);
            
            let defenseName = `DC ${techniqueEffect.defense}`;
            let dcValue = parseInt(techniqueEffect.defense);
            if (isNaN(dcValue)) {
                let defenseDef = WuxDef.Get(techniqueEffect.defense);
                defenseName = defenseDef.getTitle();
                dcValue = targetAttrHandler.parseInt(defenseDef.getVariable());
            }
            
            let skillCheckDifference = dcValue - techCheckResolver.skillCheckValue;
            let advantage = techCheckResolver.getAdvantageBonus(techCheckResolver,
                senderAttrHandler, targetAttrHandler, false);
            let odds = techCheckResolver.probAtLeastKeep(advantage, skillCheckDifference);

            techCheckResolver.addMessage(`Vs. ${defenseName}: ${odds}`);
        });
        
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

    tryGetSenderAttributes(techUseResolver, senderAttributeHandler) {
        
        super.tryGetSenderAttributes(techUseResolver, senderAttributeHandler);
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

    rollSkillCheck(techSkillCheckResolver, attrSetters) {
        if (techSkillCheckResolver.technique.skill == "") {
            return;
        }

        let advantage = this.getAdvantageBonus(techSkillCheckResolver, attrSetters.sender, attrSetters.target, true);

        techSkillCheckResolver.skillCheck = new DieRoll();
        techSkillCheckResolver.skillCheck.rollCheck(advantage);
        techSkillCheckResolver.skillCheck.addModToRoll(techSkillCheckResolver.skillCheckValue, techSkillCheckResolver.technique.skill);
        techSkillCheckResolver.addMessage(`${techSkillCheckResolver.technique.skill} Check: ` +
            Format.ShowTooltip(`${techSkillCheckResolver.skillCheck.total}`, techSkillCheckResolver.skillCheck.message));
    }

    checkPassDc(techniqueEffect, techSkillCheckResolver, targetAttrHandler) {
        if (techniqueEffect.defense == "") {
            return true;
        }
        if (techSkillCheckResolver.failedEvasion) {
            return false;
        }

        let message = "";
        let dcValue = parseInt(techniqueEffect.defense);
        if (isNaN(dcValue)) {
            let defenseDef = WuxDef.Get(techniqueEffect.defense);
            message = `Vs. ${defenseDef.getTitle()}`;
            dcValue = targetAttrHandler.parseInt(defenseDef.getVariable());
            if (techSkillCheckResolver.targetTokenEffect.tokenTargetData.hasStatus(targetAttrHandler, "Stat_Dodge")) {
                techSkillCheckResolver.targetTokenEffect.tokenTargetData.removeStatus(targetAttrHandler, "Stat_Dodge");
                if (techniqueEffect.defense == "Def_Evasion") {
                    dcValue += 6;
                }
                techSkillCheckResolver.addMessage(`${techSkillCheckResolver.targetTokenEffect.tokenTargetData.displayName}: +6 Evasion. Removed Dodge status.`);
            }

            if (techSkillCheckResolver.targetTokenEffect.tokenTargetData.getDowned()) {
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

        let pass = techSkillCheckResolver.skillCheck.total >= dcValue;
        if (!pass && techniqueEffect.defense == "Def_Evasion") {
            techSkillCheckResolver.failedEvasion = true;
            message += "Failed Evasion. No further effects will be applied.";
        }
        message += pass ? "Success!" : "Failure!";
        techSkillCheckResolver.addMessage(message);
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
            case "Burst Damage":
                let burstDamageRank = techUseResolver.senderTokenEffect.tokenTargetData.hasStatus(attrSetters.sender, "Stat_Burst");
                if (burstDamageRank == false || burstDamageRank <= 0) {
                    techUseResolver.addMessage(`No Burst condition. No bonus damage.`);
                    break;
                }
                
                let modifiedTechniqueEffect = new TechniqueEffect(techniqueEffect);
                modifiedTechniqueEffect.dVal *= burstDamageRank;
                modifiedTechniqueEffect.formula.setMultipliers(burstDamageRank);
                techUseResolver.senderTokenEffect.tokenTargetData.removeStatus(attrSetters.sender, "Stat_Burst");
                techUseResolver.addMessage(`Removed Burst (Rank ${burstDamageRank}) condition.`);

                roll = techUseResolver.calculateFormula(modifiedTechniqueEffect, attrGetters.sender);
                let burstDamageType = techUseResolver.getDamageType(attrGetters, techniqueEffect);
                roll.setDamageType(burstDamageType);
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
                let damageType = techUseResolver.getDamageType(attrGetters, techniqueEffect);
                roll.setDamageType(damageType);
                roll.setTraits(techniqueEffect.traits);
                tokenEffect.addDamageRoll(roll);
        }
    }
    
    getDamageType(attrGetters, techniqueEffect) {
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
        return damageType;
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

