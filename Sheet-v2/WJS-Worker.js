var Debug = Debug || (function () {
    'use strict';
    var
        log = function (msg) {
            console.log(msg);
        },
        logError = function (msg) {
            console.log(`ERROR! ${msg}`);
        }

    return {
        Log: log,
        LogError: logError
    };
}());

class WorkerAttributeHandler extends AttributeHandler {
    run() {
        let attributeHandler = this;
        getAttrs(attributeHandler.mods, function (v) {
            attributeHandler.current = v;
            attributeHandler.getCallbacks.forEach((callback) => {
                callback(attributeHandler);
            });
            setAttrs(attributeHandler.update, {silent: true}, function () {
                attributeHandler.finishCallbacks.forEach((callback) => {
                    callback(attributeHandler);
                });
            });
        })
    }
}

class WuxWorkerBuildManager {
    constructor(definitionIds) {
        this.workers = [];
        if (Array.isArray(definitionIds)) {
            for (let i = 0; i < definitionIds.length; i++) {
                this.workers.push(new WuxWorkerBuild(definitionIds[i]));
            }
        } else {
            this.workers.push(new WuxWorkerBuild(definitionIds));
        }
    }

    iterate(callback) {
        this.workers.forEach((worker) => {
            callback(worker);
        });
    }

    setupAttributeHandlerForPointUpdate(attributeHandler) {
        let manager = this;
        manager.iterate(function (worker) {
            attributeHandler.addFormulaMods(worker.definition);
            attributeHandler.addMod(worker.attrBuildDraft);
        });
    }

    setAttributeHandlerPoints(attributeHandler) {
        this.iterate(function (worker) {
            worker.setBuildStatsDraft(attributeHandler);
            worker.setPointsMax(attributeHandler);
            worker.updatePoints(attributeHandler);
        });
    }

    onChangeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
        this.iterate(function (worker) {
            worker.changeWorkerAttribute(attributeHandler, updatingAttr, newValue);
        });
    }

    commitChanges(attributeHandler) {
        this.iterate(function (worker) {
            worker.commitChanges(attributeHandler);
        });
    }

    resetChanges(attributeHandler) {
        this.iterate(function (worker) {
            worker.resetChanges(attributeHandler);
        });
    }
}

class WuxWorkerBuild {
    constructor(definitionId) {
        this.definition = WuxDef.Get(definitionId);
        this.buildStats = {};

        this.attrBuildDraft = this.definition.getVariable(WuxDef._build);
        this.attrBuildFinal = this.definition.getVariable(WuxDef._build, WuxDef._max);
        this.attrMax = this.definition.getVariable(WuxDef._max);
    }

    setBuildStatsDraft(attributeHandler) {
        this.setBuildStats(this.attrBuildDraft, attributeHandler);
    }

    setBuildStatsFinal(attributeHandler) {
        this.setBuildStats(this.attrBuildFinal, attributeHandler);
    }

    setBuildStats(buildStatVersion, attributeHandler) {
        this.buildStats = new WorkerBuildStats();
        this.buildStats.import(attributeHandler.parseJSON(buildStatVersion));
    }

    setPointsMax(attributeHandler) {
        let max = this.definition.formula.getValue(attributeHandler);
        attributeHandler.addUpdate(this.attrMax, max);
    }

    updatePoints(attributeHandler) {
        let buildPoints = this.buildStats.getPointsTotal();
        let buildPointsMax = attributeHandler.parseInt(this.attrMax);

        attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
        attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
    }

    updateBuildStats(attributeHandler, updatingAttr, newValue) {
        let workerBuildStat = new WorkerBuildStat([updatingAttr, newValue]);
        this.buildStats.add(updatingAttr, workerBuildStat);
        attributeHandler.addUpdate(this.attrBuildDraft, JSON.stringify(this.buildStats));
    }

    updateMaxBuildStats(attributeHandler, updatingAttr, newValue) {
        let workerBuildStat = new WorkerBuildStat([updatingAttr, newValue]);
        this.buildStats.add(updatingAttr, workerBuildStat);
        attributeHandler.addUpdate(this.attrBuildFinal, JSON.stringify(this.buildStats));
    }

    getBuildVariables() {
        let splitVariable;
        let buildVariableNames = [];
        let buildVariables = [];
        for (let i = 0; i < this.definition.linkedGroups.length; i++) {
            if (this.definition.linkedGroups[i] != "") {
                splitVariable = this.definition.linkedGroups[i].split(":");
                if (splitVariable.length == 1) {
                    buildVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", splitVariable[0]));
                } else {
                    buildVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", splitVariable[0]), splitVariable[1]);
                }
                buildVariables = buildVariables.concat(buildVariableNames);
            }
        }
        return buildVariables;
    }

    cleanBuildStats() {
        this.buildStats.clean(this.getBuildVariables());
        this.buildStats.cleanValues();
    }

    setVariablesToBuildStats(attributeHandler) {
        this.buildStats.iterate(function (buildStat) {
            attributeHandler.addUpdate(buildStat.name, buildStat.value);
        });
    }

    saveBuildStatsToFinal(attributeHandler) {
        attributeHandler.addUpdate(this.attrBuildFinal, JSON.stringify(this.buildStats));
    }

    revertBuildStatsDraft(attributeHandler) {
        attributeHandler.addUpdate(this.attrBuildDraft, JSON.stringify(this.buildStats));
    }

    changeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
        let worker = this;

        console.log(`Updating ${worker.definition.name} variable ${updatingAttr} to ${newValue}`);
        attributeHandler.addMod(worker.attrMax);
        attributeHandler.addMod(worker.attrBuildDraft);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            worker.setBuildStatsDraft(attrHandler);
            worker.updateBuildStats(attrHandler, updatingAttr, newValue);
            worker.updatePoints(attrHandler);
        });
    }

    commitChanges(attributeHandler) {
        let worker = this;
        attributeHandler.addMod(worker.attrBuildDraft);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            worker.setBuildStatsDraft(attrHandler);
            worker.cleanBuildStats();
            worker.setBuildStatVariables(attrHandler);
            worker.saveBuildStatsToFinal(attrHandler);
        });
    }

    resetChanges(attributeHandler) {
        let worker = this;
        attributeHandler.addMod(worker.attrBuildFinal);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            worker.setBuildStatsFinal(attrHandler);
            worker.cleanBuildStats();
            worker.setBuildStatVariables(attrHandler);
            worker.revertBuildStatsDraft(attrHandler);
        });
    }

    setBuildStatVariables(attributeHandler) {
        this.buildStats.iterate(function (buildStat) {
            attributeHandler.addUpdate(buildStat.name, buildStat.value);
        });
    }
}

class WuxAdvancementWorkerBuild extends WuxWorkerBuild {
    constructor() {
        super("Advancement");
    }

    updatePoints(attributeHandler) {
        let buildPoints = 0;
        let advJobs = WuxDef.GetVariable("AdvancementJob");
        let advSkills = WuxDef.GetVariable("AdvancementSkill");
        let advTechs = WuxDef.GetVariable("AdvancementTechnique");

        if (this.buildStats.has(advJobs)) {
            buildPoints += this.buildStats.getIntValue(advJobs) * 2;
        }
        if (this.buildStats.has(advSkills)) {
            buildPoints += this.buildStats.getIntValue(advSkills) * 2;
        }
        if (this.buildStats.has(advTechs)) {
            buildPoints += this.buildStats.getIntValue(advTechs);
        }
        let buildPointsMax = attributeHandler.parseInt(this.attrMax);

        attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
        attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
    }

    getBuildVariables() {
        return [WuxDef.GetVariable("Level"), WuxDef.GetVariable("XP"),
            WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("AdvancementSkill"), WuxDef.GetVariable("AdvancementTechnique")];
    }

    updateLevel(attributeHandler, fieldName, level) {
        let worker = this;
        level = parseInt(level);
        attributeHandler.addUpdate(fieldName, level);
        attributeHandler.addMod(worker.attrBuildDraft);
        let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

        let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute"]);
        manager.setupAttributeHandlerForPointUpdate(attributeHandler);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let cr = worker.getCharacterRank(level);
            attrHandler.addUpdate(WuxDef.GetVariable("CR"), cr);
            combatDetailsHandler.onUpdateCR(attrHandler, cr);

            worker.setBuildStatsDraft(attrHandler);
            worker.updateBuildStats(attrHandler, fieldName, level);
            worker.setPointsMax(attrHandler);
            worker.updatePoints(attrHandler);
            manager.setAttributeHandlerPoints(attrHandler);
        });
        WuxWorkerTechniques.FilterTechniquesForLearn(attributeHandler);
    }

    convertXp(attributeHandler) {
        let worker = this;
        let xpDefinition = WuxDef.Get("XP");
        attributeHandler.addMod(xpDefinition.getVariable());
        attributeHandler.addMod(worker.attrBuildDraft);
        attributeHandler.addMod(worker.attrBuildFinal);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            worker.setBuildStatsFinal(attrHandler);
            let level = worker.buildStats.get(WuxDef.GetVariable("Level")).value;
            let xp = attrHandler.parseInt(xpDefinition.getVariable());
            let xpNeeded = xpDefinition.formula.getValue(attrHandler);

            worker.setBuildStatsDraft(attrHandler);

            while (xp >= xpNeeded) {
                level++;
                xp -= xpNeeded;
            }
            attrHandler.addUpdate(xpDefinition.getVariable(), xp);

            let attributeHandler2 = new WorkerAttributeHandler();
            worker.updateBuildStats(attributeHandler2, xpDefinition.getVariable(), xp);
            worker.updateLevel(attributeHandler2, WuxDef.GetVariable("Level"), level);
            attributeHandler2.run();
        });
    }

    getCharacterRank(level) {
        let cr = 1;
        let incrementer = 5;
        let modIncrementer = 5;
        let checkingLevel = 5;
        while (level >= checkingLevel) {
            cr++;
            incrementer += modIncrementer;
            checkingLevel += incrementer;
        }
        return cr;
    }

    changeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
        let worker = this;

        attributeHandler.addMod(worker.attrMax);
        attributeHandler.addMod(worker.attrBuildDraft);

        let manager = new WuxWorkerBuildManager(["Skill", "Job", "Technique", "Attribute"]);
        manager.setupAttributeHandlerForPointUpdate(attributeHandler);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            worker.setBuildStatsDraft(attrHandler);
            worker.updateBuildStats(attrHandler, updatingAttr, newValue);
            worker.updatePoints(attrHandler);
            manager.setAttributeHandlerPoints(attrHandler);
        });
    }
}

class WuxTrainingWorkerBuild extends WuxWorkerBuild {
    constructor() {
        super("Training");
    }

    setPointsMax(attributeHandler) {
        // do nothing

    }

    updatePoints(attributeHandler) {
        let buildPoints = 0;
        let advKnowledge = WuxDef.GetVariable("TrainingKnowledge");
        let advTechs = WuxDef.GetVariable("TrainingTechniques");

        if (this.buildStats.has(advKnowledge)) {
            console.log(`adding ${this.buildStats.getIntValue(advKnowledge)} to buildPoints`);
            buildPoints += this.buildStats.getIntValue(advKnowledge);
        }
        if (this.buildStats.has(advTechs)) {
            console.log(`adding ${this.buildStats.getIntValue(advTechs)} to buildPoints`);
            buildPoints += this.buildStats.getIntValue(advTechs);
        }
        let buildPointsMax = attributeHandler.parseInt(this.attrMax);
        console.log(`this.attrMax: ${this.attrMax} buildPoints: ${buildPoints}, buildPointsMax: ${buildPointsMax}`);

        attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
        attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
    }

    getBuildVariables() {
        return [WuxDef.GetVariable("Training", WuxDef._max), WuxDef.GetVariable("PP"),
            WuxDef.GetVariable("TrainingKnowledge"), WuxDef.GetVariable("TrainingTechniques")];
    }

    convertPp(attributeHandler) {
        let worker = this;
        let ppDefinition = WuxDef.Get("PP");
        attributeHandler.addMod(ppDefinition.getVariable());
        attributeHandler.addMod(worker.attrBuildDraft);
        attributeHandler.addMod(worker.attrBuildFinal);

        let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
        manager.setupAttributeHandlerForPointUpdate(attributeHandler);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            worker.setBuildStatsFinal(attrHandler);

            let trainingPoints = 0;
            if (worker.buildStats.has(worker.attrMax)) {
                trainingPoints = worker.buildStats.get(worker.attrMax).value;
            }
            let pp = attrHandler.parseInt(ppDefinition.getVariable());
            let xpNeeded = ppDefinition.formula.getValue(attrHandler);

            worker.setBuildStatsDraft(attrHandler);

            while (pp >= xpNeeded) {
                trainingPoints++;
                pp -= xpNeeded;
            }
            attrHandler.addUpdate(ppDefinition.getVariable(), pp);
            attrHandler.addUpdate(worker.attrMax, trainingPoints);

            worker.updateBuildStats(attrHandler, ppDefinition.getVariable(), pp);
            worker.updateBuildStats(attrHandler, worker.attrMax, trainingPoints);
            worker.setPointsMax(attrHandler);
            worker.updatePoints(attrHandler);
            manager.setAttributeHandlerPoints(attrHandler);
        });
    }

    updateTrainingPoints(attributeHandler) {
        let worker = this;
        attributeHandler.addMod(worker.attrMax);
        attributeHandler.addMod(worker.attrBuildDraft);

        let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
        manager.setupAttributeHandlerForPointUpdate(attributeHandler);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            console.log(`Updating ${worker.attrMax} to ${attributeHandler.parseInt(worker.attrMax)}`);

            worker.setBuildStatsDraft(attrHandler);
            worker.updateBuildStats(attrHandler, worker.attrMax, attributeHandler.parseInt(worker.attrMax));
            worker.setPointsMax(attrHandler);
            worker.updatePoints(attrHandler);
            manager.setAttributeHandlerPoints(attrHandler);
        });
    }

    changeWorkerAttribute(attributeHandler, updatingAttr, newValue) {
        let worker = this;

        attributeHandler.addMod(worker.attrMax);
        attributeHandler.addMod(worker.attrBuildDraft);

        let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
        manager.setupAttributeHandlerForPointUpdate(attributeHandler);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            worker.setBuildStatsDraft(attrHandler);
            worker.updateBuildStats(attrHandler, updatingAttr, newValue);
            worker.updatePoints(attrHandler);
            manager.setAttributeHandlerPoints(attrHandler);
        });
    }
}

class WuxAttributeWorkerBuild extends WuxWorkerBuild {
    constructor() {
        super("Attribute");
    }

    updatePoints(attributeHandler) {
        let buildPoints = this.getPointsTotal();
        let buildPointsMax = attributeHandler.parseInt(this.attrMax);

        attributeHandler.addUpdate(this.definition.getVariable(), buildPointsMax - buildPoints);
        attributeHandler.addUpdate(this.definition.getVariable(WuxDef._error), buildPoints == buildPointsMax ? "0" : buildPoints < buildPointsMax ? "1" : "-1");
    }

    getPointsTotal() {
        let points = 0;
        let hasSubtracted = false;
        if (this.buildStats.keys == undefined) {
            return points;
        }
        for (let i = 0; i < this.buildStats.keys.length; i++) {
            if (this.buildStats.values[this.buildStats.keys[i]].value == "on") {
                points++;
            } else {
                let value = parseInt(this.buildStats.values[this.buildStats.keys[i]].value);
                if (!isNaN(value)) {
                    if (value >= 0) {
                        points += value;
                    } else if (!hasSubtracted) {
                        hasSubtracted = true;
                        points += value;
                    }

                }
            }
        }
        return points;
    }
}

var WuxWorkerGeneral = WuxWorkerGeneral || (function () {
    'use strict';

    var
        updatePageState = function (eventinfo) {
            console.log("Update Page State");
            let attributeHandler = new WorkerAttributeHandler();
            switch (eventinfo.newValue) {
                case "Styles":
                    WuxWorkerTechniques.FilterTechniquesForStyleSet(attributeHandler);
                    attributeHandler.run();
                    break;
                case "Actions":
                    WuxWorkerTechniques.FilterTechniquesForActions(attributeHandler);
                    attributeHandler.run();
                    break;
            }
        },
        updateStats = function (attributeHandler) {
            let formulaDefinitions = WuxDef.Filter(new DatabaseFilterData("formulaMods", "CR"));
            formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("formulaMods", "Level")));
            formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("group", "General")));
            formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("group", "Combat")));
            formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("group", "Social")));

            for (let i = 0; i < formulaDefinitions.length; i++) {
                attributeHandler.addFormulaMods(formulaDefinitions[i]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                for (let i = 0; i < formulaDefinitions.length; i++) {
                    if (formulaDefinitions[i].isResource) {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(WuxDef._max), formulaDefinitions[i].formula.getValue(attrHandler));
                    } else {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                    }
                }
            });
        },
        updateDisplayName = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                combatDetailsHandler.onUpdateDisplayName(attrHandler, eventinfo.newValue);
            });
            attributeHandler.run();
        },
        updateStatus = function (statusName, eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let statusHandler = new StatusHandler(attributeHandler);
            statusHandler.changeStatus(statusName, eventinfo.newValue);
        }
    return {
        UpdatePageState: updatePageState,
        UpdateStats: updateStats,
        UpdateDisplayName: updateDisplayName,
        UpdateStatus: updateStatus
    };
}());

var WuxWorkerCharacterCreation = WuxWorkerCharacterCreation || (function () {
    'use strict';

    var
        finishBuild = function () {
            console.log("Finish Character Creation Build");
            let attributeHandler = new WorkerAttributeHandler();

            let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Attribute", "Technique"]);
            pointManagers.commitChanges(attributeHandler);

            let trainingWorker = new WuxTrainingWorkerBuild();
            trainingWorker.commitChanges(attributeHandler);

            let advancementWorker = new WuxAdvancementWorkerBuild();
            advancementWorker.commitChanges(attributeHandler);

            WuxWorkerAttributes.UpdateStats(attributeHandler);
            WuxWorkerSkills.UpdateStats(attributeHandler);
            WuxWorkerKnowledges.UpdateStats(attributeHandler);
            WuxWorkerTechniques.UpdateLearnedStats(attributeHandler);
            WuxWorkerAdvancement.UpdateStats(attributeHandler);
            WuxWorkerGeneral.UpdateStats(attributeHandler);

            leavePageVariables(attributeHandler);
            attributeHandler.run();
        },
        leavePageVariables = function (attributeHandler) {
            attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
            attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
            WuxWorkerTechniques.FilterTechniquesForCore(attributeHandler);
        },
        setAffinityValue = function (eventinfo) {
            Debug.Log(`Setting ${eventinfo.sourceAttribute}`);
            let attributeHandler = new WorkerAttributeHandler();
            let affinityVariable = eventinfo.sourceAttribute;

            attributeHandler.addMod(affinityVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let variable = `${affinityVariable}${WuxDef._learn}`;
                let desc = WuxDef.GetDescription(`${WuxDef.GetAbbreviation()}${eventinfo.newValue}`);
                Debug.Log(`Setting ${variable} to ${desc}`);
                attrHandler.addUpdate(variable, desc);
            });
            WuxWorkerTechniques.FilterTechniquesForLearn(attributeHandler);
            attributeHandler.run();
        },
        setBonusAttributes = function () {
            Debug.Log("Setting Bonus Attribute Points");
            let attributeHandler = new WorkerAttributeHandler();
            let attributesVariable = WuxDef.Get("Attribute");

            attributeHandler.addFormulaMods(attributesVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let newValue = attributesVariable.formula.getValue(attrHandler);
                attrHandler.addUpdate(attributesVariable.getVariable(WuxDef._max), newValue);
            });
            attributeHandler.run();
        },
        setInnateDefense = function () {
            console.log("Setting Innate Defense");
            let attributeHandler = new WorkerAttributeHandler();
            let innateDefenseVariable = WuxDef.GetVariable("InnateDefense");
            let braceDef = WuxDef.Get("Def_Brace");
            let fortitudeDef = WuxDef.Get("Def_Fortitude");
            let disruptionDef = WuxDef.Get("Def_Disruption");
            let hideDef = WuxDef.Get("Def_Hide");
            let reflexDef = WuxDef.Get("Def_Reflex");
            let evasionDef = WuxDef.Get("Def_Evasion");
            attributeHandler.addFormulaMods(braceDef);
            attributeHandler.addFormulaMods(fortitudeDef);
            attributeHandler.addFormulaMods(disruptionDef);
            attributeHandler.addFormulaMods(hideDef);
            attributeHandler.addFormulaMods(reflexDef);
            attributeHandler.addFormulaMods(evasionDef);

            attributeHandler.addMod(innateDefenseVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate(braceDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(fortitudeDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(disruptionDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(hideDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(reflexDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(evasionDef.getVariable(WuxDef._expertise), 0);

                switch (attrHandler.parseString(innateDefenseVariable)) {
                    case "BOD":
                        setDefenseVariables(attrHandler, "Defense", "BOD", "Brace", "Fortitude");
                        break;
                    case "PRC":
                        setDefenseVariables(attrHandler, "Defense", "PRC", "Disruption", "Hide");
                        break;
                    case "QCK":
                        setDefenseVariables(attrHandler, "Defense", "QCK", "Reflex", "Evasion");
                        break;
                    default:
                        attrHandler.addUpdate(WuxDef.GetVariable("InnateDefense", WuxDef._learn), "Choose an attribute");
                        break;
                }

                attrHandler.addUpdate(braceDef.getVariable(), braceDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(fortitudeDef.getVariable(), fortitudeDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(disruptionDef.getVariable(), disruptionDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(hideDef.getVariable(), hideDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(reflexDef.getVariable(), reflexDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(evasionDef.getVariable(), evasionDef.formula.getValue(attrHandler));
            });
            attributeHandler.run();
        },
        setInnateSense = function () {
            console.log("Setting Innate Sense");
            let attributeHandler = new WorkerAttributeHandler();
            let innateSenseVariable = WuxDef.GetVariable("InnateSense");
            let senseResolveDef = WuxDef.Get("Def_Resolve");
            let senseFreewillDef = WuxDef.Get("Def_Freewill");
            let senseInsightDef = WuxDef.Get("Def_Insight");
            let senseNoticeDef = WuxDef.Get("Def_Notice");
            let senseScrutinyDef = WuxDef.Get("Def_Scrutiny");
            let senseDetectDef = WuxDef.Get("Def_Detect");
            attributeHandler.addFormulaMods(senseResolveDef);
            attributeHandler.addFormulaMods(senseFreewillDef);
            attributeHandler.addFormulaMods(senseInsightDef);
            attributeHandler.addFormulaMods(senseNoticeDef);
            attributeHandler.addFormulaMods(senseScrutinyDef);
            attributeHandler.addFormulaMods(senseDetectDef);

            attributeHandler.addMod(innateSenseVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate(senseResolveDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(senseFreewillDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(senseInsightDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(senseNoticeDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(senseScrutinyDef.getVariable(WuxDef._expertise), 0);
                attrHandler.addUpdate(senseDetectDef.getVariable(WuxDef._expertise), 0);

                switch (attrHandler.parseString(innateSenseVariable)) {
                    case "CNV":
                        setDefenseVariables(attrHandler, "Sense", "CNV", "Resolve", "Freewill");
                        break;
                    case "INT":
                        setDefenseVariables(attrHandler, "Sense", "INT", "Insight", "Notice");
                        break;
                    case "RSN":
                        setDefenseVariables(attrHandler, "Sense", "RSN", "Scrutiny", "Detect");
                        break;
                    default:
                        attrHandler.addUpdate(WuxDef.GetVariable("InnateSense", WuxDef._learn), "Choose an attribute");
                        break;
                }

                attrHandler.addUpdate(senseResolveDef.getVariable(), senseResolveDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(senseFreewillDef.getVariable(), senseFreewillDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(senseInsightDef.getVariable(), senseInsightDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(senseNoticeDef.getVariable(), senseNoticeDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(senseScrutinyDef.getVariable(), senseScrutinyDef.formula.getValue(attrHandler));
                attrHandler.addUpdate(senseDetectDef.getVariable(), senseDetectDef.formula.getValue(attrHandler));
            });
            attributeHandler.run();
        },
        setDefenseVariables = function (attrHandler, type, attribute, defense1, defense2) {
            let attrDefinition = WuxDef.Get(`Attr_${attribute}`);
            let def1Definition = WuxDef.Get(`Def_${defense1}`);
            let def2Definition = WuxDef.Get(`Def_${defense2}`);

            attrHandler.addUpdate(WuxDef.GetVariable(`Innate${type}`, WuxDef._learn), getDefenseDescription(type, attrDefinition, def1Definition, def2Definition));
            attrHandler.addUpdate(def1Definition.getVariable(WuxDef._expertise), 2);
            attrHandler.addUpdate(def2Definition.getVariable(WuxDef._expertise), 2);
        },
        getDefenseDescription = function (type, attrDefinition, def1Definition, def2Definition) {
            console.log("Getting Defense Description");

            let output = `${attrDefinition.title} is associated with the following ${type}s:\n\n`;
            output += `${def1Definition.title}: ${def1Definition.getDescription()}\n\n${def2Definition.title}: ${def2Definition.getDescription()}`;
            console.log(output);
            return output;
        }

    return {
        FinishBuild: finishBuild,
        SetAffinityValue: setAffinityValue,
        SetBonusAttributes: setBonusAttributes,
        SetInnateDefense: setInnateDefense,
        SetInnateSense: setInnateSense
    };
}());

var WuxWorkerTraining = WuxWorkerTraining || (function () {
    'use strict';

    var
        goToPageSet = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Training");
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Training");
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Training"), "Training");

            attributeHandler.addMod(WuxDef.GetVariable("PP"));
            let worker = new WuxTrainingWorkerBuild();
            attributeHandler.addMod(worker.attrMax);
            attributeHandler.addMod(worker.attrBuildFinal);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                worker.setBuildStatsFinal(attrHandler);
                worker.updateMaxBuildStats(attrHandler, WuxDef.GetVariable("PP"), attrHandler.parseInt(WuxDef.GetVariable("PP")));
                worker.revertBuildStatsDraft(attrHandler);
            });

            WuxWorkerTechniques.UpdateTechniquesPageToLearn(attributeHandler);
            attributeHandler.run();
        },
        finishBuild = function () {
            console.log("Finish Training Build");
            let attributeHandler = new WorkerAttributeHandler();

            let pointManagers = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
            pointManagers.commitChanges(attributeHandler);

            let trainingWorker = new WuxTrainingWorkerBuild();
            trainingWorker.commitChanges(attributeHandler);

            WuxWorkerKnowledges.UpdateStats(attributeHandler);
            WuxWorkerTechniques.UpdateLearnedStats(attributeHandler);

            leavePageVariables(attributeHandler);
            attributeHandler.run();
        },
        exitBuild = function () {
            console.log("Exit Training Build");
            let attributeHandler = new WorkerAttributeHandler();

            let pointManagers = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
            pointManagers.resetChanges(attributeHandler);

            let trainingWorker = new WuxTrainingWorkerBuild();
            trainingWorker.resetChanges(attributeHandler);

            WuxWorkerKnowledges.UpdateStats(attributeHandler);
            WuxWorkerTechniques.UpdateLearnedStats(attributeHandler);

            leavePageVariables(attributeHandler);
            attributeHandler.run();
        },
        leavePageVariables = function (attributeHandler) {
            attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
            attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
            WuxWorkerTechniques.FilterTechniquesForCore(attributeHandler);
        },

        convertPp = function () {
            console.log("Converting PP to Level");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxTrainingWorkerBuild();
            worker.convertPp(attributeHandler);
            attributeHandler.run();
        },
        setTrainingPoints = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxTrainingWorkerBuild();
            worker.updateTrainingPoints(attributeHandler);
            attributeHandler.run();
        },
        setTrainingPointsUpdate = function (eventinfo) {
            console.log("Setting Training Points Values");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxTrainingWorkerBuild();
            worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        }

    return {
        GoToPageSet: goToPageSet,
        FinishBuild: finishBuild,
        ExitBuild: exitBuild,
        ConvertPp: convertPp,
        SetTrainingPoints: setTrainingPoints,
        SetTrainingPointsUpdate: setTrainingPointsUpdate
    };
}());

var WuxWorkerAdvancement = WuxWorkerAdvancement || (function () {
    'use strict';

    var
        goToPageSet = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Advancement");
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Advancement");
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Advancement"), "Advancement");

            attributeHandler.addMod(WuxDef.GetVariable("XP"));
            let worker = new WuxAdvancementWorkerBuild();
            attributeHandler.addMod(worker.attrMax);
            attributeHandler.addMod(worker.attrBuildFinal);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                worker.setBuildStatsFinal(attrHandler);
                worker.updateMaxBuildStats(attrHandler, WuxDef.GetVariable("XP"), attrHandler.parseInt(WuxDef.GetVariable("XP")));
                worker.revertBuildStatsDraft(attrHandler);
            });

            WuxWorkerTechniques.UpdateTechniquesPageToLearn(attributeHandler);
            attributeHandler.run();
        },
        finishBuild = function () {
            console.log("Finish Advancement Build");
            let attributeHandler = new WorkerAttributeHandler();

            let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Attribute", "Technique"]);
            pointManagers.commitChanges(attributeHandler);

            let advancementWorker = new WuxAdvancementWorkerBuild();
            advancementWorker.commitChanges(attributeHandler);

            WuxWorkerAttributes.UpdateStats(attributeHandler);
            WuxWorkerSkills.UpdateStats(attributeHandler);
            WuxWorkerTechniques.UpdateLearnedStats(attributeHandler);
            updateStats(attributeHandler);

            leavePageVariables(attributeHandler);
            attributeHandler.run();
        },
        exitBuild = function () {
            console.log("Exit Advancement Build");
            let attributeHandler = new WorkerAttributeHandler();

            let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Attribute", "Technique"]);
            pointManagers.resetChanges(attributeHandler);

            let advancementWorker = new WuxAdvancementWorkerBuild();
            advancementWorker.resetChanges(attributeHandler);

            WuxWorkerAttributes.UpdateStats(attributeHandler);
            WuxWorkerSkills.UpdateStats(attributeHandler);
            WuxWorkerTechniques.UpdateLearnedStats(attributeHandler);
            updateStats(attributeHandler);

            leavePageVariables(attributeHandler);
            attributeHandler.run();
        },
        leavePageVariables = function (attributeHandler) {
            attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
            attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
            WuxWorkerTechniques.FilterTechniquesForCore(attributeHandler);
        },

        convertXp = function () {
            console.log("Converting XP to Level");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxAdvancementWorkerBuild();
            worker.convertXp(attributeHandler);
            attributeHandler.run();
        },
        setLevel = function (eventinfo) {
            console.log("Setting Level");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxAdvancementWorkerBuild();
            worker.updateLevel(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        setAdvancementPointsUpdate = function (eventinfo) {
            console.log("Setting Advancement Points");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxAdvancementWorkerBuild();
            worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        setAffinityStats = function (attributeHandler) {
            let affinityVariable = WuxDef.GetVariable("Affinity");
            let crVariable = WuxDef.GetVariable("CR");
            attributeHandler.addMod([affinityVariable, crVariable]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {

                let crValue = attrHandler.parseInt(crVariable);
                let initiativeVar = WuxDef.GetVariable("Initiative", WuxDef._affinity);
                let hvVar = WuxDef.GetVariable("Combat_HV", WuxDef._affinity);
                let surgeVar = WuxDef.GetVariable("Combat_Surge", WuxDef._affinity);
                let armorVar = WuxDef.GetVariable("Combat_Armor", WuxDef._affinity);
                let resistanceVar = WuxDef.GetVariable("Combat_Resistance", WuxDef._affinity);
                let resistance = new ResistanceData();

                attrHandler.addUpdate(initiativeVar, 0);
                attrHandler.addUpdate(hvVar, 0);
                attrHandler.addUpdate(surgeVar, 0);
                attrHandler.addUpdate(armorVar, 0);
                attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));

                switch (attrHandler.get(affinityVariable)) {
                    case "Wood":
                        attrHandler.addUpdate(initiativeVar, crValue);
                        attrHandler.addUpdate(hvVar, crValue * 2);
                        resistance.addResistanceValue("Cold", crValue * 2);
                        attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
                        break;
                    case "Fire":
                        attrHandler.addUpdate(initiativeVar, crValue);
                        resistance.addResistanceValue("Fire", crValue * 2);
                        resistance.addResistanceValue("Burn", crValue);
                        attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
                        break;
                    case "Earth":
                        resistance.addResistanceValue("Fire", crValue * 2);
                        resistance.addResistanceValue("Piercing", crValue);
                        resistance.addResistanceValue("Shock", crValue * 2);
                        attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
                        break;
                    case "Metal":
                        attrHandler.addUpdate(armorVar, crValue);
                        resistance.addResistanceValue("Force", crValue);
                        resistance.addResistanceValue("Piercing", crValue);
                        attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
                        break;
                    case "Water":
                        attrHandler.addUpdate(surgeVar, 1);
                        resistance.addResistanceValue("Cold", crValue * 2);
                        resistance.addResistanceValue("Force", crValue);
                        attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
                        break;

                }
            });
        },
        updateStats = function (attributeHandler) {
            let formulaDefinitions = WuxDef.Filter(new DatabaseFilterData("formulaMods", "CR"));
            formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("formulaMods", "Level")));

            for (let i = 0; i < formulaDefinitions.length; i++) {
                attributeHandler.addFormulaMods(formulaDefinitions[i]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                for (let i = 0; i < formulaDefinitions.length; i++) {
                    if (formulaDefinitions[i].isResource) {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(WuxDef._max), formulaDefinitions[i].formula.getValue(attrHandler));
                    } else {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                    }
                }
            });
        }

    return {
        GoToPageSet: goToPageSet,
        FinishBuild: finishBuild,
        ExitBuild: exitBuild,
        ConvertXp: convertXp,
        SetLevel: setLevel,
        SetAdvancementPointsUpdate: setAdvancementPointsUpdate,
        SetAffinityStats: setAffinityStats,
        UpdateStats: updateStats
    };
}());

var WuxWorkerTechniques = WuxWorkerTechniques || (function () {
    'use strict';

    var
        updateTechniqueBuildPoints = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Technique");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        updateStyleBuildPoints = function (eventinfo) {
            Debug.Log(`Update Style Build Points for ${eventinfo.sourceAttribute}`);
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(WuxDef.GetVariable("Page"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                if (attrHandler.parseString(WuxDef.GetVariable("Page")) == "Techniques") {
                    let worker = new WuxWorkerBuildManager("Technique");
                    worker.onChangeWorkerAttribute(attributeHandler2, eventinfo.sourceAttribute, eventinfo.newValue);

                    attributeHandler2.addMod(WuxDef.GetVariable("CR"));
                    attributeHandler2.addMod(WuxDef.GetVariable("Affinity"));
                    attributeHandler2.addMod(WuxDef.GetVariable("AdvancedAffinity"));
                    attributeHandler2.addMod(WuxDef.GetVariable("AdvancedBranch"));

                    attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                        let techniqueWorker = new WuxWorkerBuild("Technique");
                        techniqueWorker.setBuildStatsDraft(attrHandler2);
                        let workerVariableName = "";
                        let styleValue = "0";
                        let cr = attrHandler2.parseInt(WuxDef.GetVariable("CR"));
                        let affinities = [attrHandler2.parseString(WuxDef.GetVariable("Affinity")), attrHandler2.parseString(WuxDef.GetVariable("AdvancedAffinity")), attrHandler2.parseString(WuxDef.GetVariable("AdvancedBranch"))];

                        let advStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Advanced")]);
                        for (let i = 0; i < advStyleDefinitions.length; i++) {
                            workerVariableName = advStyleDefinitions[i].getVariable();
                            if (workerVariableName == eventinfo.sourceAttribute) {
                                styleValue = eventinfo.newValue;
                                filterStyleTechniquesForLearn(advStyleDefinitions[i], styleValue.toString(), cr, affinities, attrHandler2, techniqueWorker);
                            }
                        }

                        let specStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Branched")]);
                        for (let i = 0; i < specStyleDefinitions.length; i++) {
                            workerVariableName = specStyleDefinitions[i].getVariable();
                            if (workerVariableName == eventinfo.sourceAttribute) {
                                styleValue = eventinfo.newValue;
                                filterStyleTechniquesForLearn(specStyleDefinitions[i], styleValue.toString(), cr, affinities, attrHandler2, techniqueWorker);
                            }
                        }

                        techniqueWorker.updatePoints(attrHandler2);
                    });

                } else if (attrHandler.parseString(WuxDef.GetVariable("Page")) == "Styles") {
                    let worker = new WuxWorkerBuildManager("Style");
                    worker.onChangeWorkerAttribute(attributeHandler2, eventinfo.sourceAttribute, eventinfo.newValue);
                    updateSetStyles(attributeHandler2);
                }
                attributeHandler2.run();
            });

            attributeHandler.run();
        },
        updateJobStyleBuildPoints = function (jobName, eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("JobStyle");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.addMod(WuxDef.GetVariable("Page"));

            if (eventinfo.newValue != 0) {
                let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let jobData = WuxDef.Get(jobName);
                    combatDetailsHandler.onUpdateJob(attrHandler, jobData);
                });
            }
            attributeHandler.addFinishCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                updateSetStyles(attributeHandler2);
                attributeHandler2.run();
            });
            attributeHandler.run();
        },
        updateTechniquesPageToLearn = function (attributeHandler) {
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "EqGear", WuxDef._filter), "1");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Job", WuxDef._filter), "1");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Advanced", WuxDef._filter), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Branched", WuxDef._filter), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Basic", WuxDef._filter), "1");
                attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._filter), "1");
                attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._subfilter), "1");
            });
            filterTechniquesForLearn(attributeHandler);
        },
        filterTechniquesForLearn = function (attributeHandler) {
            Debug.Log("Filter Techniques for Learn");
            let techniqueWorker = new WuxWorkerBuild("Technique");
            attributeHandler.addMod(techniqueWorker.attrBuildDraft);
            attributeHandler.addMod(WuxDef.GetVariable("CR"));
            attributeHandler.addMod(WuxDef.GetVariable("Affinity"));
            attributeHandler.addMod(WuxDef.GetVariable("AdvancedAffinity"));
            attributeHandler.addMod(WuxDef.GetVariable("AdvancedBranch"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                techniqueWorker.setBuildStatsDraft(attrHandler);
                techniqueWorker.cleanBuildStats();
                let workerVariableName = "";
                let styleValue = "0";
                let cr = attrHandler.parseInt(WuxDef.GetVariable("CR"));
                let affinities = [attrHandler.parseString(WuxDef.GetVariable("Affinity")), attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")), attrHandler.parseString(WuxDef.GetVariable("AdvancedBranch"))];

                let advStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Advanced")]);
                for (let i = 0; i < advStyleDefinitions.length; i++) {
                    workerVariableName = advStyleDefinitions[i].getVariable();
                    styleValue = techniqueWorker.buildStats.has(workerVariableName) ? techniqueWorker.buildStats.get(workerVariableName).value : "0";
                    filterStyleTechniquesForLearn(advStyleDefinitions[i], styleValue.toString(), cr, affinities, attrHandler, techniqueWorker);
                }

                let specStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Branched")]);
                for (let i = 0; i < specStyleDefinitions.length; i++) {
                    workerVariableName = specStyleDefinitions[i].getVariable();
                    styleValue = techniqueWorker.buildStats.has(workerVariableName) ? techniqueWorker.buildStats.get(workerVariableName).value : "0";
                    filterStyleTechniquesForLearn(specStyleDefinitions[i], styleValue.toString(), cr, affinities, attrHandler, techniqueWorker);
                }

                techniqueWorker.updatePoints(attrHandler);
            });
        },
        filterStyleTechniquesForLearn = function (styleDefinition, styleStatus, cr, affinities, attrHandler, techniqueWorker) {
            let workerVariableName = styleDefinition.getVariable();
            attrHandler.addUpdate(styleDefinition.getVariable(WuxDef._filter), "0");
            let tier = styleDefinition.tier;
            tier = isNaN(tier) ? 0 : tier;
            let affinity = styleDefinition.affinity.trim();
            let isLearnable = tier <= cr && (affinity == "" || affinities.some(entry => entry.includes(affinity)));
            Debug.Log(`Setting learnable tech for style ${styleDefinition.name}\naffinity: ${affinity} affinities: ${affinities} Learnable: ${isLearnable}`);
            attrHandler.addUpdate(styleDefinition.getVariable(WuxDef._subfilter), isLearnable ? "0" : "1");
            attrHandler.addUpdate(styleDefinition.getVariable(), styleStatus);

            let techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", styleDefinition.title)]);
            for (let i = 0; i < techDefinitions.length; i++) {
                tier = parseInt(techDefinitions[i].tier);
                tier = isNaN(tier) ? 0 : tier;
                affinity = techDefinitions[i].affinity;
                isLearnable = !techDefinitions[i].isFree && styleStatus != "0" && tier <= cr && (affinity == "" || affinities.some(entry => entry.includes(affinity)));
                Debug.Log(`Tech: ${techDefinitions[i].name} affinities: ${affinity == "" || affinities.some(entry => entry.includes(affinity)) ? "true" : "false"} Learnable: ${isLearnable}`);
                attrHandler.addUpdate(techDefinitions[i].getVariable(WuxDef._subfilter), isLearnable ? "0" : "1");

                workerVariableName = techDefinitions[i].getVariable();
                if (techniqueWorker.buildStats.has(workerVariableName)) {
                    if (!isLearnable) {
                        attrHandler.addUpdate(workerVariableName, 0);
                        techniqueWorker.updateBuildStats(attrHandler, workerVariableName, 0);
                    } else {
                        attrHandler.addUpdate(workerVariableName, techniqueWorker.buildStats.get(workerVariableName).value);
                    }
                }
                attrHandler.addUpdate(techDefinitions[i].getVariable(WuxDef._filter), "0");
            }
        },
        filterTechniquesForCore = function (attributeHandler) {
            let advStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), 
                new DatabaseFilterData("mainGroup", "Advanced")]);
            let specStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), 
                new DatabaseFilterData("mainGroup", "Branched")]);
            let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));
            let gearDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Gear"));

            let styleWorker = new WuxWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);

            let jobWorker = new WuxWorkerBuild("Job");
            attributeHandler.addMod(jobWorker.attrBuildDraft);

            let jobStyleWorker = new WuxWorkerBuild("JobStyle");
            attributeHandler.addMod(jobStyleWorker.attrBuildDraft);

            let techniqueWorker = new WuxWorkerBuild("Technique");
            attributeHandler.addMod(techniqueWorker.attrBuildFinal);

            let gearWorker = new WuxWorkerBuild("Gear");
            attributeHandler.addMod(gearWorker.attrBuildDraft);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);
                styleWorker.cleanBuildStats();
                jobWorker.setBuildStatsDraft(attrHandler);
                jobWorker.cleanBuildStats();
                jobStyleWorker.setBuildStatsDraft(attrHandler);
                jobStyleWorker.cleanBuildStats();
                techniqueWorker.setBuildStatsFinal(attrHandler);
                techniqueWorker.cleanBuildStats();

                let isVisible = false;
                let workerVariableName = "";
                let techDefinitions;
                for (let i = 0; i < advStyleDefinitions.length; i++) {
                    workerVariableName = advStyleDefinitions[i].getVariable();
                    isVisible = techniqueWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(workerVariableName, styleWorker.buildStats.has(workerVariableName) ? "0" : "1");

                    if (isVisible) {
                        techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", advStyleDefinitions[i].title)]);
                        for (let j = 0; j < techDefinitions.length; j++) {
                            workerVariableName = techDefinitions[j].getVariable();
                            isVisible = techDefinitions[j].isFree || techniqueWorker.buildStats.has(workerVariableName);
                            attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                            attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._subfilter), "1");
                            attrHandler.addUpdate(workerVariableName, "0");
                        }
                    }
                }
                for (let i = 0; i < specStyleDefinitions.length; i++) {
                    workerVariableName = specStyleDefinitions[i].getVariable();
                    isVisible = techniqueWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(workerVariableName, styleWorker.buildStats.has(workerVariableName) ? "0" : "1");

                    if (isVisible) {
                        techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", specStyleDefinitions[i].title)]);
                        for (let j = 0; j < techDefinitions.length; j++) {
                            workerVariableName = techDefinitions[j].getVariable();
                            isVisible = techDefinitions[j].isFree || techniqueWorker.buildStats.has(workerVariableName);
                            attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                            attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._subfilter), "1");
                            attrHandler.addUpdate(workerVariableName, "0");
                        }
                    }
                }

                for (let i = 0; i < jobDefinitions.length; i++) {
                    workerVariableName = jobDefinitions[i].getVariable();
                    attrHandler.addUpdate(workerVariableName, jobStyleWorker.buildStats.has(workerVariableName) ? "0" : "1");

                    workerVariableName = jobDefinitions[i].getVariable(WuxDef._rank);
                    if (jobWorker.buildStats.has(workerVariableName)) {
                        techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", jobDefinitions[i].title)]);
                        for (let j = 0; j < techDefinitions.length; j++) {
                            isVisible = techDefinitions[j].tier <= jobWorker.buildStats.get(workerVariableName).value;
                            attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                            attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._subfilter), "1");
                            attrHandler.addUpdate(techDefinitions[j].getVariable(), "0");
                        }
                    }
                }

                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "EqGear", WuxDef._filter), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Job", WuxDef._filter), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Advanced", WuxDef._filter), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Branched", WuxDef._filter), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._filter), "0");
            });
        },
        filterTechniquesForStyleSet = function (attributeHandler) {
            Debug.Log("Filter Techniques for Style Set");
            let advStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Advanced")]);
            let specStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Branched")]);
            let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));

            let styleWorker = new WuxWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);

            let jobStyleWorker = new WuxWorkerBuild("JobStyle");
            attributeHandler.addMod(jobStyleWorker.attrBuildDraft);

            let jobWorker = new WuxWorkerBuild("Job");
            attributeHandler.addMod(jobWorker.attrBuildFinal);

            let techniqueWorker = new WuxWorkerBuild("Technique");
            attributeHandler.addMod(techniqueWorker.attrBuildFinal);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);
                styleWorker.cleanBuildStats();
                jobStyleWorker.setBuildStatsDraft(attrHandler);
                jobStyleWorker.cleanBuildStats();
                jobWorker.setBuildStatsFinal(attrHandler);
                jobWorker.cleanBuildStats();
                techniqueWorker.setBuildStatsFinal(attrHandler);
                techniqueWorker.cleanBuildStats();

                let workerVariableName = "";
                let isStyleSet = "0";
                let isVisible = false;
                for (let i = 0; i < advStyleDefinitions.length; i++) {
                    workerVariableName = advStyleDefinitions[i].getVariable();
                    isStyleSet = styleWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(advStyleDefinitions[i].getVariable(), isStyleSet ? "on" : "0");

                    isVisible = techniqueWorker.buildStats.has(advStyleDefinitions[i].getVariable());
                    attrHandler.addUpdate(advStyleDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                    if (isVisible) {
                        filterStyleTechniquesForStyleSet(advStyleDefinitions[i], attrHandler, techniqueWorker);
                    }
                }
                for (let i = 0; i < specStyleDefinitions.length; i++) {
                    workerVariableName = specStyleDefinitions[i].getVariable();
                    isStyleSet = styleWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(specStyleDefinitions[i].getVariable(), isStyleSet ? "on" : "0");

                    isVisible = techniqueWorker.buildStats.has(specStyleDefinitions[i].getVariable());
                    attrHandler.addUpdate(specStyleDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                    if (isVisible) {
                        filterStyleTechniquesForStyleSet(specStyleDefinitions[i], attrHandler, techniqueWorker);
                    }
                }

                for (let i = 0; i < jobDefinitions.length; i++) {
                    workerVariableName = jobDefinitions[i].getVariable();
                    isStyleSet = jobStyleWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(jobDefinitions[i].getVariable(), isStyleSet ? "on" : "0");

                    isVisible = jobWorker.buildStats.has(jobDefinitions[i].getVariable(WuxDef._rank));
                    attrHandler.addUpdate(jobDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                    if (isVisible) {
                        filterJobTechniquesForStyleSet(jobDefinitions[i], attrHandler, parseInt(jobWorker.buildStats.get(jobDefinitions[i].getVariable(WuxDef._rank)).value));
                    }
                }

                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Basic", WuxDef._filter), "1");
                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "EqGear", WuxDef._filter), "1");
                attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._subfilter), "1");
            });
        },
        filterStyleTechniquesForStyleSet = function (styleDefinition, attrHandler, techniqueWorker) {
            let workerVariableName = "";
            let isVisible = false;

            let techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", styleDefinition.title)]);
            for (let i = 0; i < techDefinitions.length; i++) {
                workerVariableName = techDefinitions[i].getVariable();
                isVisible = techDefinitions[i].isFree || techniqueWorker.buildStats.has(workerVariableName);
                Debug.Log(`Filtering Technique ${techDefinitions[i].title} which is ${isVisible ? "visible" : "hidden"}`);
                attrHandler.addUpdate(techDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
            }
        },
        filterJobTechniquesForStyleSet = function (jobDefinition, attrHandler, jobTier) {
            let workerVariableName = "";
            let tier = 0;
            let isVisible = false;

            let techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", jobDefinition.title)]);
            for (let i = 0; i < techDefinitions.length; i++) {
                workerVariableName = techDefinitions[i].getVariable();
                tier = parseInt(techDefinitions[i].tier);
                tier = isNaN(tier) ? 0 : tier;
                isVisible = tier <= jobTier;
                Debug.Log(`Filtering Job Technique ${techDefinitions[i].title} which is ${isVisible ? "visible" : "hidden"} because ${tier} <= ${jobTier}`);
                attrHandler.addUpdate(techDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
            }
        },
        filterTechniquesForActions = function (attributeHandler) {
            let advStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Advanced")]);
            let specStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Branched")]);
            let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));

            let styleWorker = new WuxWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);

            let jobStyleWorker = new WuxWorkerBuild("JobStyle");
            attributeHandler.addMod(jobStyleWorker.attrBuildDraft);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);
                styleWorker.cleanBuildStats();
                jobStyleWorker.setBuildStatsDraft(attrHandler);
                jobStyleWorker.cleanBuildStats();

                let isVisible = false;
                let workerVariableName = "";
                for (let i = 0; i < advStyleDefinitions.length; i++) {
                    workerVariableName = advStyleDefinitions[i].getVariable();
                    isVisible = styleWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(advStyleDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                    if (isVisible) {
                        filterStyleTechniquesForStyleSet(advStyleDefinitions[i], attrHandler, techniqueWorker);
                    }
                }
                for (let i = 0; i < specStyleDefinitions.length; i++) {
                    workerVariableName = specStyleDefinitions[i].getVariable();
                    isVisible = styleWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(specStyleDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                    if (isVisible) {
                        filterStyleTechniquesForStyleSet(specStyleDefinitions[i], attrHandler, techniqueWorker);
                    }
                }

                for (let i = 0; i < jobDefinitions.length; i++) {
                    workerVariableName = jobDefinitions[i].getVariable();
                    isVisible = jobStyleWorker.buildStats.has(workerVariableName);
                    attrHandler.addUpdate(jobDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
                    if (isVisible) {
                        filterJobTechniquesForStyleSet(jobDefinitions[i], attrHandler, parseInt(jobWorker.buildStats.get(jobDefinitions[i].getVariable(WuxDef._rank)).value));
                    }
                }

                attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Basic", WuxDef._filter), "0");
                attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._subfilter), "0");
            });
        },
        updateLearnedStats = function (attributeHandler) {
            let jobStyleWorker = new WuxWorkerBuild("JobStyle");
            attributeHandler.addMod(jobStyleWorker.attrBuildFinal);
            attributeHandler.addMod(jobStyleWorker.attrMax);

            let jobWorker = new WuxWorkerBuild("Job");
            attributeHandler.addMod(jobWorker.attrBuildFinal);

            let styleWorker = new WuxWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildFinal);
            attributeHandler.addMod(styleWorker.attrMax);

            let techniqueWorker = new WuxWorkerBuild("Technique");
            attributeHandler.addMod(techniqueWorker.attrBuildFinal);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                jobStyleWorker.setBuildStatsFinal(attrHandler);
                jobWorker.setBuildStatsFinal(attrHandler);
                styleWorker.setBuildStatsFinal(attrHandler);
                techniqueWorker.setBuildStatsFinal(attrHandler);

                jobStyleWorker.buildStats.iterate(function (value, key) {
                    if (!jobWorker.buildStats.has(key) || !parseInt(jobWorker.buildStats.get(key)) > 0) {
                        jobStyleWorker.buildStats.set(key, "0");
                    }
                });
                styleWorker.buildStats.iterate(function (value, key) {
                    if (!techniqueWorker.buildStats.has(key) || !parseInt(techniqueWorker.buildStats.get(key)) > 0) {
                        styleWorker.buildStats.set(key, "0");
                    }
                });

                jobStyleWorker.cleanBuildStats(attrHandler);
                jobStyleWorker.updatePoints(attrHandler);
                jobStyleWorker.saveBuildStatsToFinal(attrHandler);
                styleWorker.cleanBuildStats(attrHandler);
                styleWorker.updatePoints(attrHandler);
                styleWorker.saveBuildStatsToFinal(attrHandler);
            });
        },
        updateSetStyles = function (attributeHandler) {
            Debug.Log("Update Set Styles");
            let jobStyleWorker = new WuxWorkerBuild("JobStyle");
            attributeHandler.addMod(jobStyleWorker.attrBuildDraft);

            let jobWorker = new WuxWorkerBuild("Job");
            attributeHandler.addMod(jobWorker.attrBuildFinal);

            let styleWorker = new WuxWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);

            let techniqueWorker = new WuxWorkerBuild("Technique");
            attributeHandler.addMod(techniqueWorker.attrBuildFinal);

            // grab all formulas that get modified based on techniques (_tech)
            let techniqueModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._tech));
            for (let i = 0; i < techniqueModifierDefs.length; i++) {
                attributeHandler.addFormulaMods(techniqueModifierDefs[i]);
            }

            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                jobStyleWorker.setBuildStatsDraft(attrHandler);
                jobWorker.setBuildStatsFinal(attrHandler);
                styleWorker.setBuildStatsDraft(attrHandler);
                techniqueWorker.setBuildStatsFinal(attrHandler);

                setDefaultStyleDictionary(styleWorker, techniqueWorker);

                addBoostTechniqueModifiers(techniqueWorker, styleWorker, jobWorker, jobStyleWorker);

                jobStyleWorker.saveBuildStatsToFinal(attrHandler);
                styleWorker.saveBuildStatsToFinal(attrHandler);
                
                let healValueData = WuxDef.Get("Cmb_HV");
                combatDetailsHandler.onUpdateHealValue(attrHandler, attrHandler.getValue(healValueData.getVariable()));
            });
        },
        setDefaultStyleDictionary = function (styleWorker, baseWorker) {
            styleWorker.buildStats.iterate(function (value, key) {
                if (!baseWorker.buildStats.has(key) || !parseInt(baseWorker.buildStats.get(key)) > 0) {
                    styleWorker.buildStats.set(key, "0");
                }
            });
        },
        addBoostTechniqueModifiers = function (techniqueWorker, styleWorker, jobWorker, jobStyleWorker) {
            let attributeHandler = new WorkerAttributeHandler();

            // grab all formulas that get modified based on techniques (_tech)
            let techniqueModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._tech));
            for (let i = 0; i < techniqueModifierDefs.length; i++) {
                attributeHandler.addFormulaMods(techniqueModifierDefs[i]);
            }
            let techniqueSetModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._techset));
            for (let i = 0; i < techniqueSetModifierDefs.length; i++) {
                attributeHandler.addFormulaMods(techniqueSetModifierDefs[i]);
            }

            let validBoostTechniques = getValidBoostTechniques(techniqueWorker, styleWorker, jobWorker, jobStyleWorker);
            validBoostTechniques.forEach(function (technique) {
                technique.passiveBoosts.forEach(function (boostJson) {
                    let boost = new TechniqueEffect(boostJson);
                    attributeHandler.addFormulaMods(boost);
                });
            });

            attributeHandler.addGetAttrCallback(function (attrHandler) {

                // recalculate all techniques that have modifiers
                for (let i = 0; i < techniqueModifierDefs.length; i++) {
                    attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(WuxDef._tech), 0);
                }
                for (let i = 0; i < techniqueSetModifierDefs.length; i++) {
                    attrHandler.addUpdate(techniqueSetModifierDefs[i].getVariable(WuxDef._techset), 0);
                }

                validBoostTechniques.forEach(function (technique) {
                    technique.passiveBoosts.forEach(function (boostJson) {
                        let boost = new TechniqueEffect(boostJson);
                        let boostDef = WuxDef.Get(boost.effect);
                        
                        switch (boost.subType) {
                            case "Set":
                                Debug.Log(`Setting ${boostDef.getVariable()} to ${boost.formula.getValue(attrHandler)}`);
                                attrHandler.addUpdate(boostDef.getVariable(WuxDef._techset), boost.formula.getValue(attrHandler) - boostDef.formula.getValue(attrHandler));
                                break;
                            default:
                                Debug.Log(`Setting ${boostDef.getVariable(WuxDef._tech)} to ${attrHandler.parseInt(boostDef.getVariable(WuxDef._tech)) + boost.formula.getValue(attrHandler)}`);
                                attrHandler.addUpdate(boostDef.getVariable(WuxDef._tech), 
                                    attrHandler.parseInt(boostDef.getVariable(WuxDef._tech)) + boost.formula.getValue(attrHandler));
                                break;
                        }
                    });
                });

                // recalculate all techniques that have modifiers
                for (let i = 0; i < techniqueModifierDefs.length; i++) {
                    if (techniqueModifierDefs[i].isResource) {
                        attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(WuxDef._max), techniqueModifierDefs[i].formula.getValue(attrHandler));
                    } else {
                        attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(), techniqueModifierDefs[i].formula.getValue(attrHandler));
                    }
                }
            });
            attributeHandler.run();
        },
        getValidBoostTechniques = function (techniqueWorker, styleWorker, jobWorker, jobStyleWorker) {
            let validBoostTechniques = [];
            styleWorker.buildStats.iterate(function (value, key) {
                if (value !== "0") {
                    let techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", key)]);
                    for (let i = 0; i < techDefinitions.length; i++) {
                        let workerVariableName = techDefinitions[i].getVariable();
                        let isLearned = techniqueWorker.buildStats.has(workerVariableName) && techniqueWorker.buildStats.get(workerVariableName).value != "0";
                        if (techDefinitions[i].passiveBoosts.length > 0 && isLearned) {
                            validBoostTechniques.push(techDefinitions[i]);
                        }
                    }
                }
            });

            let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));
            for (let i = 0; i < jobDefinitions.length; i++) {
                let workerVariableName = jobDefinitions[i].getVariable();
                if (jobStyleWorker.buildStats.has(workerVariableName) && jobStyleWorker.buildStats.get(workerVariableName).value != "0") {
                    let jobTier = parseInt(jobWorker.buildStats.get(jobDefinitions[i].getVariable(WuxDef._rank)).value);

                    let techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", jobDefinitions[i].title)]);
                    for (let i = 0; i < techDefinitions.length; i++) {
                        if (techDefinitions[i].passiveBoosts != undefined && techDefinitions[i].passiveBoosts.length > 0) {
                            let tier = parseInt(techDefinitions[i].tier);
                            tier = isNaN(tier) ? 0 : tier;
                            if (tier <= jobTier) {
                                validBoostTechniques.push(techDefinitions[i]);
                            }
                        }
                    }
                }
            }
            
            return validBoostTechniques;
        }

    return {
        UpdateTechniqueBuildPoints: updateTechniqueBuildPoints,
        UpdateStyleBuildPoints: updateStyleBuildPoints,
        UpdateJobStyleBuildPoints: updateJobStyleBuildPoints,
        UpdateTechniquesPageToLearn: updateTechniquesPageToLearn,
        FilterTechniquesForLearn: filterTechniquesForLearn,
        FilterTechniquesForCore: filterTechniquesForCore,
        FilterTechniquesForStyleSet: filterTechniquesForStyleSet,
        FilterTechniquesForActions: filterTechniquesForActions,
        UpdateLearnedStats: updateLearnedStats
    };
}());

var WuxWorkerKnowledges = WuxWorkerKnowledges || (function () {
    'use strict';

    var
        updateBuildPoints = function (eventinfo) {
            console.log("Update Knowledge");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Knowledge");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        updateStats = function (attributeHandler) {
            let loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));
            let loreDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Lore"));
            let languageDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Language"));

            for (let i = 0; i < loreCategoryDefinitions.length; i++) {
                attributeHandler.addMod(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
            }
            for (let i = 0; i < loreDefinitions.length; i++) {
                attributeHandler.addMod(loreDefinitions[i].getVariable(WuxDef._rank));
            }
            for (let i = 0; i < languageDefinitions.length; i++) {
                attributeHandler.addMod(languageDefinitions[i].getVariable(WuxDef._rank));
            }

            attributeHandler.addMod(["CR", "Recall"]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let skillPointValue = 0;
                let skillRank = 0;
                let loreCategories = {};
                for (let i = 0; i < loreCategoryDefinitions.length; i++) {
                    loreCategories[loreCategoryDefinitions[i].title] = {};

                    skillRank = attrHandler.parseInt(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
                    if (skillRank > 0) {
                        skillPointValue = skillRank + attrHandler.parseInt(WuxDef.GetVariable("CR")) + attrHandler.parseInt(WuxDef.GetVariable("Recall"));
                        loreCategories[loreCategoryDefinitions[i].title]["General"] = skillPointValue;
                    }
                }
                for (let i = 0; i < loreDefinitions.length; i++) {
                    skillRank = attrHandler.parseInt(loreDefinitions[i].getVariable(WuxDef._rank));
                    if (skillRank > 0) {
                        skillPointValue = skillRank + attrHandler.parseInt(WuxDef.GetVariable("CR")) + attrHandler.parseInt(WuxDef.GetVariable("Recall"));
                        loreCategories[loreDefinitions[i].subGroup][loreDefinitions[i].title] = skillPointValue;
                    }
                }
                attrHandler.addUpdate(WuxDef.GetVariable("Lore", WuxDef._true), JSON.stringify(loreCategories));

                let languages = [];
                for (let i = 0; i < languageDefinitions.length; i++) {
                    skillRank = attrHandler.parseString(languageDefinitions[i].getVariable(WuxDef._rank));
                    if (skillRank == "on") {
                        languages.push(languageDefinitions[i].title);
                    }
                    attrHandler.addUpdate(languageDefinitions[i].getVariable(WuxDef._filter), skillRank == "on" ? "1" : "0");
                }
                attrHandler.addUpdate(WuxDef.GetVariable("Language", WuxDef._true), JSON.stringify(languages));
            });
        }

    return {
        UpdateBuildPoints: updateBuildPoints,
        UpdateStats: updateStats
    };
}());

var WuxWorkerJobs = WuxWorkerJobs || (function () {
    'use strict';

    var
        updateBuildPoints = function (eventinfo) {
            console.log("Update Jobs");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Job");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        }

    return {
        UpdateBuildPoints: updateBuildPoints
    };
}());

var WuxWorkerSkills = WuxWorkerSkills || (function () {
    'use strict';

    var
        updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Skills");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Skill");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        updateStats = function (attributeHandler) {
            let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
            for (let i = 0; i < skillDefinitions.length; i++) {
                attributeHandler.addFormulaMods(skillDefinitions[i]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let skillPointValue = 0;
                let skillRank = 0;
                for (let i = 0; i < skillDefinitions.length; i++) {
                    skillPointValue = skillDefinitions[i].formula.getValue(attrHandler);
                    skillRank = attrHandler.parseString(skillDefinitions[i].getVariable(WuxDef._rank));
                    if (skillRank == "on") {
                        skillPointValue = skillPointValue + 2 + attrHandler.parseInt(WuxDef.GetVariable("CR"));
                    }
                    attrHandler.addUpdate(skillDefinitions[i].getVariable(), skillPointValue);
                }
            });
        }

    return {
        UpdateBuildPoints: updateBuildPoints,
        UpdateStats: updateStats
    };
}());

var WuxWorkerAttributes = WuxWorkerAttributes || (function () {
    'use strict';

    var
        updateBuildPoints = function (eventinfo) {
            console.log("Update Attributes");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxAttributeWorkerBuild();
            worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        updateStats = function (attributeHandler) {
            let attributeDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Attribute"));
            let formulaDefinitions = [];

            for (let i = 0; i < attributeDefinitions.length; i++) {
                formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("formulaMods", attributeDefinitions[i].name)));
            }

            for (let i = 0; i < formulaDefinitions.length; i++) {
                attributeHandler.addFormulaMods(formulaDefinitions[i]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                for (let i = 0; i < formulaDefinitions.length; i++) {
                    if (formulaDefinitions[i].isResource) {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(WuxDef._max), formulaDefinitions[i].formula.getValue(attrHandler));
                    } else {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                    }
                }
            });
        }

    return {
        UpdateBuildPoints: updateBuildPoints,
        UpdateStats: updateStats
    };
}());

var WuxWorkerChat = WuxWorkerChat || (function () {
    'use strict';

    var
        selectOutfit = function (eventinfo) {
            console.log(`Selecting outfit`);

            let outfitRepeatingSection = new WuxRepeatingSection("RepeatingOutfits");
            outfitRepeatingSection.getIds(function (outfitRepeater) {
                let emoteButtonRepeaterSection = new WuxRepeatingSection("RepeatingActiveEmotes");
                emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {
                    emoteButtonRepeater.removeAllIds();

                    let attributeHandler = new WorkerAttributeHandler();
                    let setIdVar = WuxDef.GetVariable("Chat_SetId");
                    let outfitEmotesVar = WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true);
                    let outfitSelectVar = WuxDef.GetVariable("Chat_OutfitName", WuxDef._learn);
                    attributeHandler.addMod(setIdVar);
                    outfitRepeater.addAttributeMods(attributeHandler, [outfitEmotesVar]);

                    attributeHandler.addGetAttrCallback(function (attrHandler) {
                        let setId = attrHandler.parseString(setIdVar);
                        let newSelectionId = outfitRepeater.getIdFromFieldName(eventinfo.sourceAttribute);

                        outfitRepeater.iterate(function (id) {
                            if (setId == id) {
                                attrHandler.addUpdate(outfitRepeater.getFieldName(id, outfitSelectVar), "0");
                            }
                        });
                        attrHandler.addUpdate(outfitRepeater.getFieldName(newSelectionId, outfitSelectVar), "on");
                        attrHandler.addUpdate(setIdVar, newSelectionId);
                        let emotesString = attrHandler.parseString(outfitRepeater.getFieldName(newSelectionId, outfitEmotesVar));
                        let outfitEmotes = new EmoteSetData(JSON.parse(emotesString));
                        updateActiveEmoteSet(emoteButtonRepeater, attrHandler, outfitEmotes);
                    });
                    attributeHandler.run();
                });
            });
        },

        updatePostContent = function (eventinfo) {
            console.log(`Updating post content`);

            let messageObj = WuxMessage.ParseInput(eventinfo.newValue);

            if (messageObj != undefined) {
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Message"), messageObj.message);
                attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Type"), messageObj.template);
                if (messageObj instanceof EmoteMessage) {
                    messageObj.setTitle("");
                    attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Target"), messageObj.title);
                }
                attributeHandler.run();
            }


        },

        updatePostType = function (eventinfo) {

            let attributeHandler = new WorkerAttributeHandler();
            let messageObj = WuxMessage.ParseType(eventinfo.newValue);
            if (messageObj == undefined) {
                messageObj = new SpeakEmoteMessage("");
            }
            if (messageObj instanceof EmoteMessage) {
                messageObj.setTitle("");
                attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Target"), messageObj.title);
            }
            attributeHandler.run();
        },

        updateSelectedLanguage = function (eventinfo) {
            console.log(`Updating selected language to ${eventinfo.newValue}`);
            let message = new EmoteMessage("");
            message.setLanguage(eventinfo.newValue);

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Chat_LanguageTag"), message.languageTag);
            console.log(`setting language tag to ${message.languageTag}`);
            attributeHandler.run();
        },

        updateActiveEmoteSet = function (emoteButtonRepeater, attrHandler, outfitEmotes) {
            let emotesVar = WuxDef.GetVariable("Chat_Emotes");
            attrHandler.addUpdate(emotesVar, JSON.stringify(outfitEmotes));

            let newrowid;
            let postNameVar = WuxDef.GetVariable("Chat_PostName");
            let postUrlVar = WuxDef.GetVariable("Chat_PostURL");
            outfitEmotes.iterate(function (emote) {
                newrowid = generateRowID();
                attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newrowid, postNameVar), emote.name);
                attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newrowid, postUrlVar), emote.url);
            });
        },
        updateNameOutfit = function (eventinfo) {
            console.log(`Renaming outfit ${eventinfo.previousValue} to ${eventinfo.newValue}`);
            let attributeHandler = new WorkerAttributeHandler();
            let setIdVar = WuxDef.GetVariable("Chat_SetId");
            let updateId = outfitRepeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

            attributeHandler.addMod(setIdVar);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let setId = attrHandler.parseString(setIdVar);
                if (setId == updateId) {
                    attrHandler.addUpdate(setIdVar, eventinfo.newValue);
                }
            });
            attributeHandler.run();
        },
        updateOutfitEmotesGroup = function (eventinfo) {
            console.log(`Setting outfit emotes through a json submission`);
            let outfitRepeatingSection = new WuxRepeatingSection("RepeatingOutfits");
            let jsonData = "";

            try {
                jsonData = JSON.parse(eventinfo.newValue);
            } catch (e) {
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addUpdate(eventinfo.sourceAttribute, "Invalid JSON. This field could not be read as a JSON object.");
                attributeHandler.run();
                return;
            }

            let outfitEmotes = new EmoteSetData(jsonData);

            if (outfitEmotes.name == "") {
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addUpdate(eventinfo.sourceAttribute, "Invalid Data. This field must contain a JSON object with a 'name', 'defaultEmote', and 'emotes' array.");
                attributeHandler.run();
                return;
            }

            let updateId = outfitRepeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

            let emoteButtonRepeaterSection = new WuxRepeatingSection("RepeatingActiveEmotes");
            emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {

                let attributeHandler = new WorkerAttributeHandler();
                let setIdVar = WuxDef.GetVariable("Chat_SetId");
                attributeHandler.addMod(setIdVar);

                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitName")), outfitEmotes.name);
                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes")), JSON.stringify(outfitEmotes));
                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true)), JSON.stringify(outfitEmotes));
                console.log(`Setting outfit emotes for ${outfitEmotes.name} to \n${JSON.stringify(outfitEmotes)}`);

                let emoteIndex = 2;
                outfitEmotes.iterate(function (emote) {
                    if (emote.url == outfitEmotes.defaultEmote) {
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitDefault")), emote.name);
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitDefaultURL")), emote.url);
                    } else {
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteName")}${emoteIndex}`), emote.name);
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteURL")}${emoteIndex}`), emote.url);
                        emoteIndex++;
                    }
                });

                while (emoteIndex <= 30) {
                    attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteName")}${emoteIndex}`), "");
                    attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteURL")}${emoteIndex}`), "");
                    emoteIndex++;
                }

                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let setId = attrHandler.parseString(setIdVar);
                    if (setId == updateId) {
                        emoteButtonRepeater.removeAllIds();
                        updateActiveEmoteSet(emoteButtonRepeater, attrHandler, outfitEmotes);
                    }
                });
                attributeHandler.run();
            });

        },
        updateOutfitEmotesName = function (eventinfo) {
            console.log(`Setting outfit emotes through a name entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        updateOutfitEmotesDefaultUrl = function (eventinfo) {
            console.log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        updateOutfitEmotesUrl = function (eventinfo) {
            console.log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        setOutfitEmotesIndividualEntry = function (eventinfo) {
            let outfitRepeatingSection = new WuxRepeatingSection("RepeatingOutfits");
            outfitRepeatingSection.getIds(function (outfitRepeater) {
                let emoteButtonRepeaterSection = new WuxRepeatingSection("RepeatingActiveEmotes");
                emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {
                    emoteButtonRepeater.removeAllIds();

                    let updateId = outfitRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
                    let attributeHandler = new WorkerAttributeHandler();
                    let setIdVar = WuxDef.GetVariable("Chat_SetId");
                    let setNameVar = WuxDef.GetVariable("Chat_OutfitName");
                    let defaultNameVar = WuxDef.GetVariable("Chat_OutfitDefault");
                    let defaultUrlVar = WuxDef.GetVariable("Chat_OutfitDefaultURL");
                    let emoteNameVar = WuxDef.GetVariable("Chat_EmoteName");
                    let emoteUrlVar = WuxDef.GetVariable("Chat_EmoteURL");
                    let outfitEmotesVar = WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true);
                    attributeHandler.addMod(setIdVar);
                    attributeHandler.addMod(outfitRepeater.getFieldName(updateId, setNameVar));
                    attributeHandler.addMod(outfitRepeater.getFieldName(updateId, defaultNameVar));
                    attributeHandler.addMod(outfitRepeater.getFieldName(updateId, defaultNameVar));
                    attributeHandler.addMod(outfitRepeater.getFieldName(updateId, defaultUrlVar));
                    attributeHandler.addMod(outfitRepeater.getFieldName(updateId, outfitEmotesVar));
                    for (let i = 2; i <= 30; i++) {
                        attributeHandler.addMod(outfitRepeater.getFieldName(updateId, `${emoteNameVar}${i}`));
                        attributeHandler.addMod(outfitRepeater.getFieldName(updateId, `${emoteUrlVar}${i}`));
                    }

                    attributeHandler.addGetAttrCallback(function (attrHandler) {
                        let setId = attrHandler.parseString(setIdVar);

                        let outfitEmotes = new EmoteSetData();
                        outfitEmotes.name = attrHandler.parseString(outfitRepeater.getFieldName(updateId, setNameVar));
                        outfitEmotes.defaultEmote = attrHandler.parseString(outfitRepeater.getFieldName(updateId, defaultUrlVar));
                        outfitEmotes.addEmote(attrHandler.parseString(outfitRepeater.getFieldName(updateId, defaultNameVar)),
                            attrHandler.parseString(outfitRepeater.getFieldName(updateId, defaultUrlVar)));

                        let emoteName = "";

                        for (let i = 2; i <= 30; i++) {
                            emoteName = attrHandler.parseString(outfitRepeater.getFieldName(updateId, `${emoteNameVar}${i}`));
                            if (emoteName != "") {
                                outfitEmotes.addEmote(emoteName, attrHandler.parseString(outfitRepeater.getFieldName(updateId, `${emoteUrlVar}${i}`)));
                            }
                        }
                        attrHandler.addUpdate(outfitRepeater.getFieldName(updateId, outfitEmotesVar), JSON.stringify(outfitEmotes));
                        attrHandler.addUpdate(outfitRepeater.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes")), JSON.stringify(outfitEmotes));

                        if (setId == updateId) {
                            emoteButtonRepeater.removeAllIds();
                            updateActiveEmoteSet(emoteButtonRepeater, attrHandler, outfitEmotes);
                        }
                    });
                    attributeHandler.run();

                });

            });
        }
    return {
        SelectOutfit: selectOutfit,
        UpdatePostContent: updatePostContent,
        UpdatePostType: updatePostType,
        UpdateSelectedLanguage: updateSelectedLanguage,
        UpdateNameOutfit: updateNameOutfit,
        UpdateOutfitEmotesGroup: updateOutfitEmotesGroup,
        UpdateOutfitEmotesName: updateOutfitEmotesName,
        UpdateOutfitEmotesDefaultUrl: updateOutfitEmotesDefaultUrl,
        UpdateOutfitEmotesUrl: updateOutfitEmotesUrl
    };
}());