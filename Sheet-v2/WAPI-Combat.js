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
                    tokenTargetData.addStartRoundEnergy(attributeHandler);
                }
                
                switch (state.WuxConflictManager.conflictType) {
                    case "Battle":
                        tokenTargetData.setDash(attributeHandler);
                        break;
                    case "Social":
                        tokenTargetData.addImpatience(attributeHandler, 1);
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
                tokenTargetData.setTurnIcon(false);
                sendEndTurnMessage(tokenTargetData);
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
        sendEndTurnMessage = function (targetData) {
            let message = `${targetData.displayName} Ends Turn\n`;
            message += getPhaseStartMessage();
            let systemMessage = new SystemInfoMessage(message);
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
        this.senderTokenTargetData = TargetReference.GetTokenTargetDataByName(this.sourceSheetName);
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
        let effectDatabase = new TechniqueEffectDatabase();
        effectDatabase.add(techniqueEffect.name, techniqueEffect);
        
        let willBreakEffect = new TechniqueUseEffect();
        willBreakEffect.name = "Magic Will Break";
        willBreakEffect.effects = effectDatabase;
        let willBreakEffectString = willBreakEffect.getUseTech(techniqueConsumptionResolver.sourceSheetName);
        techniqueConsumptionResolver.tokenEffect.takeWillDamage(attrHandler, resourceObject.resourceValue, willBreakEffectString);
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
            Debug.Log(`Consuming resources for ${resourceName}`);
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

class TechniqueUseResolver extends TechniqueResolverData {
    constructor(msg, content) {
        super(msg, content);
    }
    
    createEmpty() {
        super.createEmpty();
        this.technique = {};
        this.skillCheck = 0;
        this.advantage = 0;
        this.senderTokenEffect = {};
        this.targetTokenEffect = {};
    }

    initializeData(contentData) {
        super.initializeData(contentData);
        this.senderTokenEffect = new TokenTargetEffectsData(this.senderTokenTargetData);
        this.targetTokenEffect = new TokenTargetEffectsData(TargetReference.GetTokenTargetData(contentData[3]));
        this.advantage = ParseIntValue(contentData[2]);
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
        let techUseResolver = this;
        let senderAttributeHandler = new SandboxAttributeHandler(this.senderTokenEffect.tokenTargetData.charId);
        techUseResolver.tryGetSenderSkillCheck(techUseResolver, senderAttributeHandler);
        techUseResolver.tryGetSenderAttributes(techUseResolver, senderAttributeHandler);
        techUseResolver.getTargetData(techUseResolver, senderAttributeHandler);
        senderAttributeHandler.run();
    }
    
    tryGetSenderSkillCheck(techUseResolver, senderAttributeHandler) {
        if (techUseResolver.technique.skill == "") {
            return;
        }
        
        let skillCheckVar = WuxDef.GetVariable(Format.GetDefinitionName("Skill", techUseResolver.technique.skill));
        senderAttributeHandler.addMod(skillCheckVar);
        
        senderAttributeHandler.addGetAttrCallback(function (attrHandler) {
            let skillValue = attrHandler.parseInt(skillCheckVar);
            techUseResolver.skillCheck = new DieRoll();
            techUseResolver.skillCheck.rollCheck(techUseResolver.advantage);
            techUseResolver.skillCheck.addModToRoll(skillValue);
            techUseResolver.addMessage(`${techUseResolver.technique.skill} Check: ` + 
                Format.ShowTooltip(`${techUseResolver.skillCheck.total}`, techUseResolver.skillCheck.message));
        });
    }

    tryGetSenderAttributes(techUseResolver, senderAttributeHandler) {
        techUseResolver.technique.effects.iterate(function (techniqueEffect) {
            if (techniqueEffect.target == "Self") {
                techUseResolver.tryGetAttributesFromTechniqueEffect(techniqueEffect, senderAttributeHandler);
            }
            senderAttributeHandler.addMod(techniqueEffect.formula.getAttributes());
        });
    }
    
    tryGetAttributesFromTechniqueEffect(techniqueEffect, attributeHandler) {
        switch (techniqueEffect.type) {
            case "HP":
                attributeHandler.addMod("HP");
                switch (techniqueEffect.subType) {
                    case "Surge":
                        attributeHandler.addMod("Cmb_Surge");
                        break;
                    case "":
                        attributeHandler.addMod("Cmb_Armor");
                        break;
                }
                break;
            case "WILL":
                attributeHandler.addMod("WILL");
                break;
            case "Vitality":
                attributeHandler.addMod("Cmb_Vitality");
                break;
            case "Impatience":
                attributeHandler.addMod("Soc_Impatience");
                break;
            case "Favor":
                attributeHandler.addMod("Soc_Favor");
                break;
            case "EN":
                attributeHandler.addMod("EN");
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
        techUseResolver.technique.effects.iterate(function (techniqueEffect) {
            if (techniqueEffect.defense.startsWith("Def_")) {
                let defenseDef = WuxDef.get(techniqueEffect.defense);
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
            let willBreakEffects = new TechniqueEffectDatabase();
            let techDisplayData = new TechniqueEffectDisplayUseData("", 
                techUseResolver.senderTokenEffect.tokenTargetData.displayName, techUseResolver.targetTokenEffect.tokenTargetData.displayName);
            techUseResolver.technique.effects.iterate(function (techniqueEffect) {
                if (techniqueEffect.defense != currentCheck) {
                    currentCheck = techniqueEffect.defense;
                    if (currentCheck == "WillBreak") {
                        willBreakEffects.add(techniqueEffect.name, techniqueEffect);
                        return;
                    }
                    
                    passCheck = techUseResolver.checkPassDc(techniqueEffect, techUseResolver, targetAttrHandler);
                }
                
                if (passCheck) {
                    techUseResolver.addEffects(techniqueEffect, techUseResolver, senderAttrHandler, targetAttrHandler, techDisplayData);
                }
            });
            
            techUseResolver.printMessages();
        });
    }
    
    checkPassDc(techniqueEffect, techUseResolver, targetAttrHandler) {
        if (techniqueEffect.defense == "") {
            return true;
        }
        
        let message = "";
        let dcValue = parseInt(techniqueEffect.defense);
        if (isNaN(dcValue)) {
            let defenseDef = WuxDef.get(techniqueEffect.defense);
            dcValue = targetAttrHandler.parseInt(defenseDef.getVariable());
            message = `Vs. ${defenseDef.getTitle()} (DC ${dcValue}): `;
        }
        else {
            message = `Vs. DC ${dcValue}: `;
        }
        
        let pass = techUseResolver.skillCheck.total >= dcValue;
        message += pass ? "Success!" : "Failure!";
        techUseResolver.addMessage(message);
        return pass;
    }
    
    addEffects(techniqueEffect, techUseResolver, senderAttrHandler, targetAttrHandler, techDisplayData) {

        switch (techniqueEffect.type) {
            case "HP":
            case "WILL":
            case "Favor":
                return;
            case "Vitality":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Impatience":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Influence":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Request":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Status":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Resistance":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Advantage":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "Move":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
            case "EN":
                techUseResolver.addMessage(techDisplayData.formatEffect(techniqueEffect));
                break;
        }
    }

    printMessages() {
        this.messages = this.messages.concat(this.senderTokenEffect.effectMessages);
        this.messages = this.messages.concat(this.targetTokenEffect.effectMessages);
        let systemMessage = this.getMessageObject();
        WuxMessage.Send(systemMessage);
    }
}


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

