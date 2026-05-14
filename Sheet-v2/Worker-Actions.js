var WuxWorkerActions = WuxWorkerActions || (function () {
    const rankTechnique = function (attributeHandler, repeatingSectionName, sourceFieldName, rankChange) {
        let styleWorker = new WuxStyleWorkerBuild();
        attributeHandler.addMod([styleWorker.attrBuildDraft, styleWorker.attrMax]);

        let techniquesRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
        let selectedId = techniquesRepeater.getIdFromFieldName(sourceFieldName);
        let techniqueNameField = techniquesRepeater.getFieldName(
            selectedId, WuxDef.GetUntypedVariable("Action", "TechTrueName"));
        let crField = WuxDef.GetVariable("CR");
        
        attributeHandler.addMod([techniqueNameField, crField]);
        
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            styleWorker.setBuildStatsDraft(attrHandler);
            let techniqueName = attrHandler.parseString(techniqueNameField);
            Debug.Log(`Ranking ${rankChange > 0 ? "Up" : "Down"} ${techniqueName}`);
            let technique;
            let newRank;
            let updatingAttr;
            let techniqueData = styleWorker.getTechniqueData(techniqueName);
            if (techniqueData != undefined) {
                technique = techniqueData.technique;
                newRank = techniqueData.rank + rankChange;
                updatingAttr = technique.createDefinition(WuxDef.Get("Technique")).getVariable();
            }
            else {
                technique = WuxTechs.Get(techniqueName);
                newRank = 1 + rankChange;
                updatingAttr = technique.createDefinition(WuxDef.Get("Technique")).getVariable();
                styleWorker.changeWorkerAttribute(attributeHandler, updatingAttr, newRank, technique.techSet);
            }

            if (rankChange > 0) {
                let maxRank = technique.getMaxRank(attrHandler.parseInt(crField));
                newRank = Math.min(newRank, maxRank);
            }
            else {
                newRank = Math.max(newRank, 1);
            }
            Debug.Log(`${techniqueName} set to rank ${newRank}`);
            styleWorker.updateBuildStats(attrHandler, updatingAttr, {value: newRank, group: technique.techSet});
            styleWorker.updatePoints(attrHandler);

            let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", techniquesRepeater);
            techniqueAttributeHandler.setId(selectedId);
            technique.setRank(newRank);
            techniqueAttributeHandler.setTechniqueInfo(technique, true);
        });
        attributeHandler.run();
    }
    const getStyleSlotRepeaterIDs = function (repeaterSlotData, index, finishCallback) {
        if (index >= repeaterSlotData.length) {
            finishCallback(repeaterSlotData);
            return;
        }
        let slotData = repeaterSlotData[index];
        let styleRepeater = new WorkerRepeatingSectionHandler(slotData.name, slotData.index);
        styleRepeater.getIds(function (repeater) {
            repeaterSlotData[index].repeaterData = repeater;
            getStyleSlotRepeaterIDs(repeaterSlotData, index + 1, finishCallback);
        });
    }

    const updateAllActions = function (attributeHandler, filters) {
        let formeTech = new FormeTechniqueDatabase(attributeHandler, filters);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            formeTech.setupPostGetAttr(attrHandler);
            formeTech.registerTechDictionary(attrHandler);
            formeTech.updateDataAndVisibilityOfRepeaterTechniques(attrHandler);
            formeTech.addMissingTechniques(attrHandler);
            formeTech.updateLoadTechniques(attrHandler);
        });
        attributeHandler.addFinishCallback(function () {
            formeTech.setSortOrder();
        });
    }
    const updateVisibilityAllActions = function (attributeHandler, filters) {
        let formeTech = new FormeTechniqueDatabase(attributeHandler, filters);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            formeTech.setupPostGetAttr(attrHandler);
            formeTech.registerTechDictionary(attrHandler);
            formeTech.updateVisibilityOfRepeaterTechniques(attrHandler);
        });
        attributeHandler.addFinishCallback(function () {
            formeTech.setSortOrder();
        });
    }
    
    'use strict';

    const
        updateAllActionsFromMenu = function (attributeHandler)  {
            let pageSetVariable = WuxDef.GetVariable("PageSet");
            let formeTechniqueFilterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            attributeHandler.addMod(pageSetVariable, formeTechniqueFilterVariable);
            attributeHandler.addFinishCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                if (attrHandler.parseString(pageSetVariable) == "Core") {
                    let filter = attrHandler.parseJSON(formeTechniqueFilterVariable);
                    updateAllActions(attributeHandler2, filter);
                }
                else {
                    WuxWorkerActions.UpdateAllActionsInAdvancement(attributeHandler2);
                }
                let loader = new LoadingScreenHandler(attributeHandler2);
                loader.run();
            });
        },
        updateAllActionsInAdvancement = function (attributeHandler)  {
            updateAllActions(attributeHandler, [new DatabaseFilterData("style", "Style")]);
        },
        updateAllFormeActions = function (attributeHandler, filters) {
            updateAllActions(attributeHandler, filters);
        },
        refreshAllFormeActions = function () {
            Debug.Log(`Refreshing All Forme Actions`);
            let attributeHandler = new WorkerAttributeHandler();
            updateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },
        
        updateVisibilityOfAllActionsInAdvancement = function (attributeHandler)  {
            updateVisibilityAllActions(attributeHandler, [new DatabaseFilterData("style", "Style")]);
        },
        updateVisibilityOfFormeActions = function (attributeHandler) {
            Debug.Log(`Update Visibility of Forme Actions`);
            let pageSetVariable = WuxDef.GetVariable("PageSet");
            let formeTechniqueFilterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            attributeHandler.addMod(pageSetVariable, formeTechniqueFilterVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                if (attrHandler.parseString(pageSetVariable) == "Core") {
                    let filter = attrHandler.parseJSON(formeTechniqueFilterVariable);
                    updateVisibilityAllActions(attributeHandler2, filter);
                }
                else {
                    WuxWorkerActions.UpdateVisibilityOfAllActionsInAdvancement(attributeHandler2);
                }
                attributeHandler2.run();
                let loader = new LoadingScreenHandler(attributeHandler2);
                loader.run();
            });
        },
        loadFormeActions = function () {
            Debug.Log(`Load Forme Actions`);
            let attributeHandler = new WorkerAttributeHandler();
            let formeTech = new FormeTechniqueDatabase(attributeHandler);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                formeTech.setupPostGetAttr(attrHandler);
                formeTech.registerTechDictionary(attrHandler);
                formeTech.updateDataAndVisibilityOfRepeaterTechniques(attrHandler);
                formeTech.addMissingTechniques(attrHandler);
            });
            attributeHandler.addFinishCallback(function () {
                formeTech.setSortOrder();
            });
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },

        rankUpTechnique = function (eventinfo, repeatingSection) {
            let attributeHandler = new WorkerAttributeHandler();
            rankTechnique(attributeHandler, repeatingSection, eventinfo.sourceAttribute, 1);
        },
        rankDownTechnique = function (eventinfo, repeatingSection) {
            let attributeHandler = new WorkerAttributeHandler();
            rankTechnique(attributeHandler, repeatingSection, eventinfo.sourceAttribute, -1);
        },
        removeAllOldStyleData = function () {
            Debug.Log("Killing all old style repeaters");
            let maxAdvancedSlots = 3;
            let maxNormalSlots = 6;
            let repeaterNames = [
                {name: "RepeatingFormeTech"}, {name: "RepeatingBasicActions"},
                {name: "RepeatingBasicRecovery"}, {name: "RepeatingBasicAttack"},
                {name: "RepeatingBasicSocial"}, {name: "RepeatingBasicSpirit"}];
            for (let i = 1; i <= maxNormalSlots; i++) {
                if (i <= maxAdvancedSlots) {
                    repeaterNames.push({name: "RepeatingJobTech", id: i});
                    repeaterNames.push({name: "RepeatingAdvTech", id: i});
                }
                repeaterNames.push({name: "RepeatingAdvTech", id: i+3});
            }
            let attributeHandler = new WorkerAttributeHandler();
            for (let i = 0; i < repeaterNames.length; i++) {
                attributeHandler.addRepeatingSection(repeaterNames[i].name, repeaterNames[i].id);
            }
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                for (let i = 0; i < repeaterNames.length; i++) {
                    attrHandler.getRepeatingSection(repeaterNames[i].name, repeaterNames[i].id).removeAllIds();
                }
            });
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },

        setCustomTechnique = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let actionRepeater = new WorkerRepeatingSectionHandler("RepeatingCustomTech");
            
            let techniqueAttributeHandler = 
                new TechniqueDataAttributeHandler(attributeHandler, "Action", actionRepeater);

            let selectedId = actionRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let technique = new TechniqueData(eventinfo.newValue);
            techniqueAttributeHandler.setId(selectedId);
            techniqueAttributeHandler.setTechniqueInfo(technique, true);
            techniqueAttributeHandler.setVisibilityAttribute(true);
            attributeHandler.run();
        }
    ;

    return {
        UpdateAllActionsFromMenu: updateAllActionsFromMenu,
        UpdateAllActionsInAdvancement: updateAllActionsInAdvancement,
        UpdateAllFormeActions: updateAllFormeActions,
        RefreshAllFormeActions: refreshAllFormeActions,
        LoadFormeActions: loadFormeActions,
        UpdateVisibilityOfAllActionsInAdvancement: updateVisibilityOfAllActionsInAdvancement,
        UpdateVisibilityOfFormeActions: updateVisibilityOfFormeActions,
        RankUpTechnique: rankUpTechnique,
        RankDownTechnique: rankDownTechnique,
        RemoveAllOldStyleData: removeAllOldStyleData,
        SetCustomTechnique: setCustomTechnique,
    };
}());

var WuxWorkerActionsService = WuxWorkerActionsService || (function () {
    const iteratePassiveStyleTechniques = function (techBoosters, callback) {
        iteratePassiveTechniques(techBoosters, function (techniqueName) {
            let technique = WuxTechs.Get(techniqueName);
            callback(technique);
        });
    }
    const iteratePassiveGearTechniques = function (gearBoosters, callback) {
        iteratePassiveTechniques(gearBoosters, function (itemName) {
            let item = WuxItems.Get(itemName);
            callback(item.technique);
        });
    }
    const iteratePassiveTechniques = function (passiveTechniqueArray, callback) {
        if (!Array.isArray(passiveTechniqueArray)) {
            return;
        }

        passiveTechniqueArray.forEach(function (techniqueName) {
            callback(techniqueName);
        });
    }

    const addBoostStyleTechFormulaMods = function (attrHandler, techBoosters) {
        iteratePassiveStyleTechniques(techBoosters, function (technique) {
            addBoostTechniqueFormulaMods(attrHandler, technique);
        });
    }
    const addBoostGearTechFormulaMods = function (attrHandler, gearBoosters) {
        iteratePassiveGearTechniques(gearBoosters, function (technique) {
            addBoostTechniqueFormulaMods(attrHandler, technique);
        });
    }
    const addBoostTechniqueFormulaMods = function (attrHandler, technique) {
        if (technique == undefined) {
            return;
        }
        technique.effects.iterate(function (techEffect) {
            if (techEffect.type == "Boost") {
                attrHandler.addFormulaMods(techEffect);
            }
        });
    }

    const addBoostStyleTechModifiers = function (attrHandler, techBoosters) {
        iteratePassiveStyleTechniques(techBoosters, function (technique) {
            addBoostTechniqueModifiers(attrHandler, technique, WuxDef._tech);
        });
    }
    const addBoostGearTechModifiers = function (attrHandler, gearBoosters) {
        iteratePassiveGearTechniques(gearBoosters, function (technique) {
            addBoostTechniqueModifiers(attrHandler, technique, WuxDef._gear);
        });
    }
    const addBoostTechniqueModifiers = function (attrHandler, technique, variableSuffix) {
        if (technique == undefined) {
            return;
        }
        
        technique.effects.iterate(function (techEffect) {
            if (techEffect.type == "Boost") {
                let boostDef = WuxDef.Get(techEffect.effect);
                
                let value = techEffect.formula.getValue(attrHandler);
                let boostEffectDescriptors = attrHandler.parseJSON(boostDef.getVariable(variableSuffix, WuxDef._info));
                if (boostEffectDescriptors == "") {
                    boostEffectDescriptors = [];
                }

                switch (techEffect.subType) {
                    case "Set":
                        let newValue = value - boostDef.formula.getValue(attrHandler);
                        attrHandler.addUpdate(boostDef.getVariable(WuxDef._techset), newValue);
                        boostEffectDescriptors.push(`${technique.name} Override`);
                        boostEffectDescriptors.push(`${techEffect.formula.getString()} = ${newValue}`);
                        boostEffectDescriptors.push("");
                        break;
                    default:
                        attrHandler.addUpdate(boostDef.getVariable(variableSuffix),
                            attrHandler.parseInt(boostDef.getVariable(variableSuffix)) + value);
                        boostEffectDescriptors.push(`${technique.name}`);
                        let formula = techEffect.formula.getString();
                        boostEffectDescriptors.push(formula == value ? formula : `${formula} = ${value}`);
                        boostEffectDescriptors.push("");
                        break;
                }
                attrHandler.addUpdate(boostDef.getVariable(variableSuffix, WuxDef._info), JSON.stringify(boostEffectDescriptors));
            }
        });
    }

    'use strict';

    const
        tryAddTechniqueToBoosters = function (attrHandler, technique, boosterFieldName) {
            if (technique == undefined) {
                return false;
            }
            if (technique.action == "Passive") {
                let passiveStyleTechniques = attrHandler.parseJSON(boosterFieldName);
                if (passiveStyleTechniques == "0" || passiveStyleTechniques == "") {
                    passiveStyleTechniques = [];
                }
                if (!passiveStyleTechniques.includes(technique.name)) {
                    passiveStyleTechniques.push(technique.name);
                    attrHandler.addUpdate(boosterFieldName, JSON.stringify(passiveStyleTechniques));
                }
                return true;
            }
            return false;
        },
        setTechniqueBoosters = function (attrHandler) {
            Debug.Log("Setting technique boosters");
            let techBoosters = attrHandler.parseJSON(WuxDef.GetVariable("BoostStyleTech"));
            let gearBoosters = attrHandler.parseJSON(WuxDef.GetVariable("BoostGearTech"));
            let perkBoosters = attrHandler.parseJSON(WuxDef.GetVariable("BoostPerkTech"));

            let braceVar = WuxDef.GetVariable("Def_Brace");
            let wardingVar = WuxDef.GetVariable("Def_Warding");
            let reflexVar = WuxDef.GetVariable("Def_Reflex");
            let evasionVar = WuxDef.GetVariable("Def_Evasion");
            let resolveVar = WuxDef.GetVariable("Def_Resolve");
            let insightVar = WuxDef.GetVariable("Def_Insight");
            let logicVar = WuxDef.GetVariable("Def_Logic");

            let healValueVar = WuxDef.GetVariable("Cmb_HV");
            let armorDefVar = WuxDef.GetVariable("Cmb_Armor");
            let burnResVar = WuxDef.GetVariable("Cmb_BurnResist");
            let coldResVar = WuxDef.GetVariable("Cmb_ColdResist");
            let energyResVar = WuxDef.GetVariable("Cmb_EnergyResist");
            let forceResVar = WuxDef.GetVariable("Cmb_ForceResist");
            let piercingResVar = WuxDef.GetVariable("Cmb_PiercingResist");
            let psycheResVar = WuxDef.GetVariable("Cmb_PsycheResist");
            let mvVar = WuxDef.GetVariable("Cmb_Mv");
            let mvDashVar = WuxDef.GetVariable("Cmb_MvDash");
            let surgeDef = WuxDef.Get("Surge");
            let vitalityDef = WuxDef.Get("Cmb_Vitality");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod([healValueVar, armorDefVar,
                burnResVar, coldResVar, energyResVar, forceResVar, piercingResVar, psycheResVar,
                mvVar, mvDashVar, surgeDef.getVariable(), surgeDef.getVariable(WuxDef._max),
                vitalityDef.getVariable(), vitalityDef.getVariable(WuxDef._max)]);
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
            
            // grab all formulas that get modified based on techniques 
            let allModifierDefs = [];
            let techniqueSetModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._techset));
            for (let item of techniqueSetModifierDefs) {
                if (!allModifierDefs.includes(item)) {
                    allModifierDefs.push(item);
                }
            }
            let techniqueModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._tech));
            for (let item of techniqueModifierDefs) {
                if (!allModifierDefs.includes(item)) {
                    allModifierDefs.push(item);
                }
            }
            let gearModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._gear));
            for (let item of gearModifierDefs) {
                if (!allModifierDefs.includes(item)) {
                    allModifierDefs.push(item);
                }
            }

            // add the formula mods
            for (let item of allModifierDefs) {
                attributeHandler.addFormulaMods(item);
            }

            addBoostStyleTechFormulaMods(attributeHandler, techBoosters);
            addBoostGearTechFormulaMods(attributeHandler, gearBoosters);
            addBoostStyleTechFormulaMods(attributeHandler, perkBoosters);

            attributeHandler.addGetAttrCallback(function (attrHandler) {

                // reset all statistics that have modifiers
                for (let i = 0; i < techniqueModifierDefs.length; i++) {
                    attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(WuxDef._tech), 0);
                }
                for (let i = 0; i < gearModifierDefs.length; i++) {
                    attrHandler.addUpdate(gearModifierDefs[i].getVariable(WuxDef._gear), 0);
                }
                for (let i = 0; i < techniqueSetModifierDefs.length; i++) {
                    attrHandler.addUpdate(techniqueSetModifierDefs[i].getVariable(WuxDef._techset), 0);
                }
                
                // set the breakdown
                let attributeBreakdown = {};
                for (let definition of allModifierDefs) {
                    let formula = definition.formula.getString();
                    let value = definition.formula.getValue(attrHandler);
                    attributeBreakdown[definition.name] = ["-- Base Calculation --", formula == value ? formula : `${formula} = ${value}`, ""];
                }

                addBoostStyleTechModifiers(attrHandler, techBoosters);
                addBoostGearTechModifiers(attrHandler, gearBoosters);
                addBoostStyleTechModifiers(attrHandler, perkBoosters);

                // recalculate all statistics that have modifiers
                for (let definition of allModifierDefs) {
                    let value = definition.formula.getValue(attrHandler);
                    if (definition.isResource) {
                        attrHandler.addUpdate(definition.getVariable(WuxDef._max), value);
                    } else {
                        attrHandler.addUpdate(definition.getVariable(), value);
                    }
                    let variableInfo = attrHandler.parseJSON(definition.getVariable(WuxDef._techset, WuxDef._info));
                    if (Array.isArray(variableInfo) && variableInfo.length > 0) {
                        attributeBreakdown[definition.name] = attributeBreakdown[definition.name].concat(variableInfo);
                    }
                    variableInfo = attrHandler.parseJSON(definition.getVariable(WuxDef._tech, WuxDef._info));
                    if (Array.isArray(variableInfo) && variableInfo.length > 0) {
                        attributeBreakdown[definition.name].push("-- Technique Bonuses --");
                        attributeBreakdown[definition.name] = attributeBreakdown[definition.name].concat(variableInfo);
                    }
                    variableInfo = attrHandler.parseJSON(definition.getVariable(WuxDef._gear, WuxDef._info));
                    if (Array.isArray(variableInfo) && variableInfo.length > 0) {
                        attributeBreakdown[definition.name].push("-- Gear Bonuses --");
                        attributeBreakdown[definition.name] = attributeBreakdown[definition.name].concat(variableInfo);
                    }
                    attrHandler.addUpdate(definition.getVariable(WuxDef._info), attributeBreakdown[definition.name].join("\n"));
                }
                
                // update combat details
                combatDetailsHandler.onUpdateDefenses(attrHandler,
                    attrHandler.parseInt(braceVar), attrHandler.parseInt(wardingVar),
                    attrHandler.parseInt(reflexVar), attrHandler.parseInt(evasionVar),
                    attrHandler.parseInt(resolveVar), attrHandler.parseInt(logicVar), 
                    attrHandler.parseInt(insightVar)
                );
                combatDetailsHandler.onUpdateHealValue(attrHandler, attrHandler.parseInt(healValueVar));
                combatDetailsHandler.onUpdateSurges(attrHandler, attrHandler.parseInt(surgeDef.getVariable()));
                combatDetailsHandler.onUpdateMaxSurges(attrHandler, attrHandler.parseInt(surgeDef.getVariable(WuxDef._max)));
                combatDetailsHandler.onUpdateVitality(attrHandler, attrHandler.parseInt(vitalityDef.getVariable()));
                combatDetailsHandler.onUpdateMaxVitality(attrHandler, attrHandler.parseInt(vitalityDef.getVariable(WuxDef._max)));
                combatDetailsHandler.onUpdateArmorValue(attrHandler, attrHandler.parseInt(armorDefVar));
                combatDetailsHandler.onUpdateResistanceValues(attrHandler, attrHandler.parseInt(burnResVar),
                    attrHandler.parseInt(coldResVar), attrHandler.parseInt(energyResVar),
                    attrHandler.parseInt(forceResVar), attrHandler.parseInt(piercingResVar),
                    attrHandler.parseInt(psycheResVar));
                combatDetailsHandler.onUpdateMoveSpeedValue(attrHandler, attrHandler.parseInt(mvVar));
                combatDetailsHandler.onUpdateDashSpeedValue(attrHandler, attrHandler.parseInt(mvDashVar));

            });
            attributeHandler.run();
        }

    return {
        TryAddTechniqueToBoosters: tryAddTechniqueToBoosters,
        SetTechniqueBoosters: setTechniqueBoosters
    }
}());

class FormeTechniqueSort {
    constructor() {
        this.listSize = 0;
    }

    getSortOrder(sortStyle, techDictionary) {
        switch (sortStyle) {
            case "Action":
                this.sortByActionType(techDictionary);
                return;
        }
    }
    
    sortByActionType (techDictionary) {
        const actionPriority = {
            Full: 0,
            Quick: 1,
            Assist: 2,
            Swift: 3,
            Reaction: 4,
            Brief:5,
            Short:6,
            Long:7,
            Passive:8
        };

        const entries = this.getEntries(techDictionary);

        // 2️⃣ Sort them
        entries.sort(([, a], [, b]) => {
            const aAction = a.technique?.action || "";
            const bAction = b.technique?.action || "";

            const aPriority = actionPriority[aAction] ?? 999;
            const bPriority = actionPriority[bAction] ?? 999;

            // First: action priority
            if (aPriority !== bPriority) {
                return aPriority - bPriority;
            }

            // Final: alphabetical (always)
            return a.technique?.name.localeCompare(b.technique?.name);
        });

        this.updateSortOrder(techDictionary, entries);
    }
    
    getEntries(techDictionary) {
        return Object.entries(techDictionary.values)
            .filter(([, v]) => v.isVisible);
    }
    
    updateSortOrder(techDictionary, entries) {
        entries.forEach(([key, value], index) => {
            techDictionary.values[key].sortOrder = index;
        });
        this.listSize = entries.length;
    }
}
class FormeTechniqueDatabase {
    constructor(attributeHandler, filters) {
        this.techDictionary = new Dictionary();
        this.techSorter = new FormeTechniqueSort();
        this.sortList = [];
        this.endSortList = [];
        this.userAffinities = "";
        this.userCr = 0;

        this.filters = 0;
        if (Array.isArray(filters)) {
            let filteredTechs = WuxTechs.Filter(filters);
            this.filters = [];
            filteredTechs.forEach((technique) => {
                this.filters.push(technique.name);
            })
            Debug.Log(`Filtering with: ${JSON.stringify(filters)}
            Filtered Techniques: ${JSON.stringify(this.filters)}`);
        }

        this.boosterFieldName = WuxDef.GetVariable("BoostStyleTech");
        attributeHandler.addMod(this.boosterFieldName);
        attributeHandler.addMod(WuxDef.GetVariable("CR"));

        this.formeActionsRepeaterId = "RepeatingFormeTech";
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attributeHandler, "Action");
        attributeHandler.addRepeatingSection(this.formeActionsRepeaterId);
        attributeHandler.getRepeatingSection(this.formeActionsRepeaterId).addFieldNames([
            techniqueAttributeHandler.getVariable("TechTrueName"),
            techniqueAttributeHandler.getVariable("TechVersion"),
            techniqueAttributeHandler.getVariable("TechIsVisible")
        ]);

        this.setFormeSlotsDefinitionData();
        this.addFormeSlotVariables(attributeHandler);
        this.jobSlotVariable = WuxDef.GetVariable("Forme_JobSlot");
        attributeHandler.addMod(this.jobSlotVariable);
        
        this.equippedSlots = [];
        attributeHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry")]);
        attributeHandler.addMod([WuxDef.GetVariable("BoostStyleTech"), WuxDef.GetVariable("BoostGearTech"), WuxDef.GetVariable("BoostPerkTech")]);
        attributeHandler.addMod([WuxDef.GetVariable("FullName")]);

        this.jobWorker = new WuxJobWorkerBuild();
        attributeHandler.addMod(this.jobWorker.attrBuildDraft);

        this.styleWorker = new WuxStyleWorkerBuild();
        attributeHandler.addMod(this.styleWorker.attrBuildDraft);

        this.perkWorker = new WuxPerkWorkerBuild();
        attributeHandler.addMod(this.perkWorker.attrBuildDraft);
    }
    setFormeSlotsDefinitionData () {
        this.formeDefinitions = [
            {
                mainDef: WuxDef.Get("Forme_StyleSlot"),
                max: parseInt(WuxDef.Get("Forme_StyleSlotCount").formula.getValue()),
                countDef: WuxDef.Get("StyleSlots")
            },
            {
                mainDef: WuxDef.Get("Gear_EquipmentSlot"),
                max: parseInt(WuxDef.Get("Gear_EquipmentSlotCount").formula.getValue()),
                countDef: WuxDef.Get("EquipmentSlots")
            }
        ];
    }
    addFormeSlotVariables(attrHandler) {
        this.formeDefinitions.forEach(function (slot) {
            attrHandler.addMod(slot.countDef.getVariable());
            for (let i = 1; i <= slot.max; i++) {
                attrHandler.addMod(slot.mainDef.getVariable(i));
            }
        });
    };
    
    setupPostGetAttr(attrHandler, cr) {
        this.jobWorker.setBuildStatsDraft(attrHandler);
        this.styleWorker.setBuildStatsDraft(attrHandler);
        this.perkWorker.setBuildStatsDraft(attrHandler);
        if (cr == undefined) {
            this.userCr = attrHandler.parseInt(WuxDef.GetVariable("CR"));
        } else {
            this.userCr = cr;
        }
        
        this.userAffinities = [attrHandler.parseString(WuxDef.GetVariable("Affinity")),
            attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")),
            attrHandler.parseString(WuxDef.GetVariable("Ancestry"))];
        
        this.equippedSlots = [];
        this.equippedSlots.push(attrHandler.parseString(this.jobSlotVariable));
        for (let slot of this.formeDefinitions) {
            let count = attrHandler.parseInt(slot.countDef.getVariable());
            for (let i = 1; i <= count; i++) {
                this.equippedSlots.push(attrHandler.parseString(slot.mainDef.getVariable(i)));
            }
        }
    }

    registerTechDictionary(attrHandler) {
        let formeTechDatabase = this;
        attrHandler.addUpdate(formeTechDatabase.boosterFieldName, []);
        formeTechDatabase.addAllBasicTechniques();
        formeTechDatabase.iterateAllTechniquesFromLearnedStyles(function (technique, techniqueRank) {
            let newEntry = formeTechDatabase.tryAddTechniqueToTechDictionary(technique, techniqueRank);
            if (newEntry != undefined && newEntry.isActive) {
                WuxWorkerActionsService.TryAddTechniqueToBoosters(attrHandler, technique, formeTechDatabase.boosterFieldName);
            }
        });
        this.techSorter.getSortOrder("Action", formeTechDatabase.techDictionary);
        this.sortList = [this.techSorter.listSize];
        WuxWorkerActionsService.SetTechniqueBoosters(attrHandler);
    }
    addAllBasicTechniques() {
        let allBasicTechniques = this.styleWorker.getAllBasicTechniqueData();
        let filteredTechs = WuxTechs.Filter(new DatabaseFilterData("style", "Basic"));
        filteredTechs.forEach(technique => {
            if (!this.techDictionary.has(technique.name)) {
                let isActive = this.checkTechniqueIsActive(technique);
                let techniqueData = allBasicTechniques[technique.name];
                let techniqueRank = 1;
                if (techniqueData != undefined) {
                    techniqueRank = techniqueData.rank;
                }
                let newEntry = this.createTechDictionaryTechnique(technique, techniqueRank, isActive);
                this.techDictionary.add(technique.name, newEntry);
            }
        });
    }
    iterateAllTechniquesFromLearnedStyles(callback) {
        let allJobsArray = this.jobWorker.getStyles();
        allJobsArray.forEach((styleData) => {
            let filteredTechs = WuxTechs.Filter(new DatabaseFilterData("style", styleData.style.name));
            filteredTechs.forEach(tech => callback(tech, 1));
        });
        let allStyleTechniques = this.styleWorker.getAllStyleTechniqueData();
        for (const key in allStyleTechniques) {
            let techniqueData = allStyleTechniques[key];
            callback(techniqueData.technique, techniqueData.rank);
        }
        let allPerkTechniques = this.perkWorker.getPermanentTechniques();
        allPerkTechniques.forEach((technique) => {
            callback(technique, 1);
        });
    }
    tryAddTechniqueToTechDictionary(technique, techniqueRank) {
        if (!this.techDictionary.has(technique.name)) {
            let isActive = this.checkTechniqueIsEquipped(technique, technique.techSet)
                && this.checkTechniqueIsActive(technique);
            let newEntry = this.createTechDictionaryTechnique(technique, techniqueRank, isActive);
            this.techDictionary.add(technique.name, newEntry);
            return newEntry;
        }
        return undefined;
    }
    createTechDictionaryTechnique(technique, techniqueRank, isActive) {
        let isVisible = isActive && this.checkTechniqueIsVisibleInFilter(technique);
        return {
            technique: technique,
            techniqueRank: techniqueRank,
            isSet: false,
            isActive: isActive,
            isVisible: isVisible,
            sortOrder: -1
        };
        
    }
    checkTechniqueIsEquipped(technique, styleName) {
        if (styleName.includes(";")) {
            let styleParts = styleName.split(";").map(s => s.trim());
            if (!styleParts.some(part => this.equippedSlots.includes(part))) {
                return false;
            }
        }
        else if (styleName != "" && !this.equippedSlots.includes(styleName)) {
            return false;
        }
        return true;
    }
    checkTechniqueIsActive(technique) {
        if (technique.tier > this.userCr) {
            return false;
        }

        if (technique.affinity.includes(";")) {
            let affinityParts = technique.affinity.split(";").map(s => s.trim());
            if (!affinityParts.some(part => this.userAffinities.includes(part))) {
                return false;
            }
        }
        else if (technique.affinity != "" && !this.userAffinities.includes(technique.affinity)) {
            return false;
        }
        
        return true;
    }
    checkTechniqueIsVisibleInFilter(technique) {
        if (this.filters == 0) {
            return true;
        }
        let value = this.filters.includes(technique.name);
        if (!value) {
            Debug.Log(`${technique.name} is not visible due to filters.`);
        }
        return value;
    }
    
    setSortOrder() {
        let sortedIds = this.sortList.filter(v => v !== undefined);
        sortedIds = sortedIds.concat(this.endSortList);
        let sectionName = WuxDef.GetVariable(this.formeActionsRepeaterId).substring("repeating_".length);
        setSectionOrder(sectionName, sortedIds);
    }
    setSortId(techniqueName, id) {
        let techData = this.techDictionary.get(techniqueName);
        if (techData != undefined) {
            let sortOrderIndex = techData.sortOrder;
            if (sortOrderIndex >= 0) {
                this.sortList[sortOrderIndex] = id;
            }
            else {
                this.endSortList.push(id);
            }
        }
    }

    updateDataAndVisibilityOfRepeaterTechniques(attrHandler) {
        let formeTechDatabase = this;
        this.iterateRepeaterTechniques(attrHandler, function (techniqueAttributeHandler, techniqueName, repeater, id) {
            if (formeTechDatabase.tryUpdateRepeaterTechniqueDisplayInfoSet(techniqueAttributeHandler, techniqueName, repeater, id)) {
                formeTechDatabase.setSortId(techniqueName, id);
            }
        });
    }
    updateVisibilityOfRepeaterTechniques(attrHandler) {
        let formeTechDatabase = this;
        this.iterateRepeaterTechniques(attrHandler, function (techniqueAttributeHandler, techniqueName, repeater, id) {
            formeTechDatabase.setRepeaterTechniqueVisibility(techniqueAttributeHandler, techniqueName);
            formeTechDatabase.setSortId(techniqueName, id);
        });
    }

    iterateRepeaterTechniques(attrHandler, callback) {
        let repeater = attrHandler.getRepeatingSection(this.formeActionsRepeaterId);
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", repeater);
        repeater.iterate((id) => {
            techniqueAttributeHandler.setId(id);
            let techniqueName = techniqueAttributeHandler.getTechniqueName();
            callback(techniqueAttributeHandler, techniqueName, repeater, id);
        });
    }

    tryUpdateRepeaterTechniqueDisplayInfoSet(techniqueAttributeHandler, techniqueName, repeater, id) {
        if (!this.techDictionary.has(techniqueName)) {
            // this technique is not valid. Remove it
            Debug.Log(`Removing ${techniqueName} because it no longer exists in this kit.`);
            repeater.removeId(id);
            return false;
        }
        let techniqueData = this.techDictionary.get(techniqueName);
        if (techniqueData.isSet) {
            repeater.removeId(id);
            return false;
        }

        return this.tryUpdateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName);
        
        
    }
    tryUpdateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName) {
        if (this.techDictionary.has(techniqueName)) {
            this.updateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName);
            return true;
        }
        return false;
    }
    updateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName) {
        let techVersion = techniqueAttributeHandler.getTechniqueVersion();
        let techniqueData = this.techDictionary.get(techniqueName);
        let technique = techniqueData.technique;
        if (technique.version != techVersion) {
            Debug.Log(`Updating ${techniqueName} as it has a new version (${technique.version} != ${techVersion})`);
            technique.rank = techniqueData.techniqueRank;
            techniqueAttributeHandler.setTechniqueInfo(technique, true);
        }
        this.techDictionary.get(techniqueName).isSet = true;
        this.setRepeaterTechniqueVisibility(techniqueAttributeHandler, techniqueName);
    }
    setRepeaterTechniqueVisibility(techniqueAttributeHandler, techniqueName) {
        if (this.techDictionary.has(techniqueName)) {
            techniqueAttributeHandler.setVisibilityAttribute(this.techDictionary.get(techniqueName).isVisible);
        }
    }
    
    updateLoadTechniques(attrHandler) {
        let unsetBaseTechniqueData = this.getUnsetTechniqueData();
        attrHandler.addUpdate(WuxDef.GetVariable("Action_FormeLoadCount"), unsetBaseTechniqueData.length);
    }
    addMissingTechniques(attrHandler) {
        let unsetBaseTechniqueData = this.getUnsetTechniqueData();
        let repeater = attrHandler.getRepeatingSection(this.formeActionsRepeaterId);
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", repeater);
        let maxLoadCount = unsetBaseTechniqueData.length;
        
        let i = 0;
        while(i < maxLoadCount) {
            if (unsetBaseTechniqueData.length <= 0) {
                break;
            }
            let id = repeater.generateRowId();
            techniqueAttributeHandler.setId(id);
            this.tryUpdateRepeaterTechniqueDisplayInfoSet(techniqueAttributeHandler, unsetBaseTechniqueData[0].technique.name, repeater, id);
            this.setSortId(unsetBaseTechniqueData[0].technique.name, id);
            unsetBaseTechniqueData.splice(0, 1);
            i++;
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Action_FormeLoadCount"), Math.max(unsetBaseTechniqueData.length, 0));
    }
    getUnsetTechniqueData() {
        Debug.Log(this.techDictionary);

        return Object.values(this.techDictionary.values).filter(v =>
            !v.isSet
        );
    }
}