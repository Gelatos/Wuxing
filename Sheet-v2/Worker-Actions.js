var WuxWorkerActions = WuxWorkerActions || (function () {
    const tryAddTechniqueToBoosters = function (attrHandler, technique, boosterFieldName) {
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
    };
    const removeOldTechniqueActions = function (attrHandler, actionRepeater, boosterFieldName) {

        let passiveStyleTechniques = attrHandler.parseJSON(boosterFieldName);
        if (passiveStyleTechniques == "0" || passiveStyleTechniques == "") {
            passiveStyleTechniques = [];
        }
        if (passiveStyleTechniques.length == 0) {
            return false;
        }
        let hasRemovedPassive = false;

        actionRepeater.iterate(function (id) {
            let techniqueName = attrHandler.parseString(actionRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
            let technique = WuxTechs.Get(techniqueName);
            if (technique == undefined) {
                return;
            }
            if (technique.action == "Passive") {
                let index = passiveStyleTechniques.indexOf(technique.name);
                if (index >= 0) {
                    hasRemovedPassive = true;
                    passiveStyleTechniques.splice(index, 1);
                    attrHandler.addUpdate(boosterFieldName, JSON.stringify(passiveStyleTechniques));
                }
            }
        });

        return hasRemovedPassive;
    }
    const setTechniqueBoosters = function (attrHandler) {
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
        let guileVar = WuxDef.GetVariable("Def_Guile");
        
        let healValueVar = WuxDef.GetVariable("Cmb_HV");
        let armorDefVar = WuxDef.GetVariable("Cmb_Armor");
        let surgeDef = WuxDef.Get("Surge");
        let vitalityDef = WuxDef.Get("Cmb_Vitality");
        Debug.Log(`Boost Perk Tech: ${perkBoosters}`);

        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addMod([healValueVar, armorDefVar,
            surgeDef.getVariable(), surgeDef.getVariable(WuxDef._max),
            vitalityDef.getVariable(), vitalityDef.getVariable(WuxDef._max)]);
        let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
        // grab all formulas that get modified based on techniques (_tech)
        let techniqueModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._tech));
        for (let i = 0; i < techniqueModifierDefs.length; i++) {
            attributeHandler.addFormulaMods(techniqueModifierDefs[i]);
        }
        let techniqueSetModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._techset));
        for (let i = 0; i < techniqueSetModifierDefs.length; i++) {
            attributeHandler.addFormulaMods(techniqueSetModifierDefs[i]);
        }

        addBoostStyleTechFormulaMods(attributeHandler, techBoosters);
        addBoostGearTechFormulaMods(attributeHandler, gearBoosters);
        addBoostStyleTechFormulaMods(attributeHandler, perkBoosters);

        attributeHandler.addGetAttrCallback(function (attrHandler) {

            // reset all techniques that have modifiers
            for (let i = 0; i < techniqueModifierDefs.length; i++) {
                attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(WuxDef._tech), 0);
            }
            for (let i = 0; i < techniqueSetModifierDefs.length; i++) {
                attrHandler.addUpdate(techniqueSetModifierDefs[i].getVariable(WuxDef._techset), 0);
            }

            addBoostStyleTechModifiers(attrHandler, techBoosters);
            addBoostGearTechModifiers(attrHandler, gearBoosters);
            addBoostStyleTechModifiers(attrHandler, perkBoosters);

            // recalculate all techniques that have modifiers
            for (let i = 0; i < techniqueModifierDefs.length; i++) {
                if (techniqueModifierDefs[i].isResource) {
                    attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(WuxDef._max), techniqueModifierDefs[i].formula.getValue(attrHandler));
                } else {
                    attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(), techniqueModifierDefs[i].formula.getValue(attrHandler));
                }
            }
            combatDetailsHandler.onUpdateDefenses(attrHandler,
                attrHandler.parseInt(braceVar), attrHandler.parseInt(wardingVar),
                attrHandler.parseInt(reflexVar), attrHandler.parseInt(evasionVar),
                attrHandler.parseInt(resolveVar), attrHandler.parseInt(insightVar),
                attrHandler.parseInt(guileVar)
            );
            
            combatDetailsHandler.onUpdateHealValue(attrHandler, attrHandler.parseInt(healValueVar));
            combatDetailsHandler.onUpdateSurges(attrHandler, attrHandler.parseInt(surgeDef.getVariable()));
            combatDetailsHandler.onUpdateMaxSurges(attrHandler, attrHandler.parseInt(surgeDef.getVariable(WuxDef._max)));
            combatDetailsHandler.onUpdateVitality(attrHandler, attrHandler.parseInt(vitalityDef.getVariable()));
            combatDetailsHandler.onUpdateMaxVitality(attrHandler, attrHandler.parseInt(vitalityDef.getVariable(WuxDef._max)));
            combatDetailsHandler.onUpdateArmorValue(attrHandler, attrHandler.parseInt(armorDefVar));
        });
        attributeHandler.run();
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
        Debug.Log(`Adding boost formula mods for ${technique.name}`);
        technique.effects.iterate(function (techEffect) {
            if (techEffect.type == "Boost") {
                attrHandler.addFormulaMods(techEffect);
            }
        });
    }

    const addBoostStyleTechModifiers = function (attrHandler, techBoosters) {
        iteratePassiveStyleTechniques(techBoosters, function (technique) {
            addBoostTechniqueModifiers(attrHandler, technique);
        });
    }
    const addBoostGearTechModifiers = function (attrHandler, gearBoosters) {
        iteratePassiveGearTechniques(gearBoosters, function (technique) {
            addBoostTechniqueModifiers(attrHandler, technique);
        });
    }
    const addBoostTechniqueModifiers = function (attrHandler, technique) {
        technique.effects.iterate(function (techEffect) {
            if (techEffect.type == "Boost") {
                let boostDef = WuxDef.Get(techEffect.effect);

                switch (techEffect.subType) {
                    case "Set":
                        attrHandler.addUpdate(boostDef.getVariable(WuxDef._techset), techEffect.formula.getValue(attrHandler) - boostDef.formula.getValue(attrHandler));
                        break;
                    default:
                        Debug.Log(`Setting ${boostDef.getVariable(WuxDef._tech)} to ${attrHandler.parseInt(boostDef.getVariable(WuxDef._tech)) + techEffect.formula.getValue(attrHandler)}`);
                        attrHandler.addUpdate(boostDef.getVariable(WuxDef._tech),
                            attrHandler.parseInt(boostDef.getVariable(WuxDef._tech)) + techEffect.formula.getValue(attrHandler));
                        break;
                }
            }
        });
    }

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
    const addAffinityVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry")]);
    };
    const addBoosterVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("BoostStyleTech"), WuxDef.GetVariable("BoostGearTech"), WuxDef.GetVariable("BoostPerkTech")]);
    };
    const addNameVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("FullName")]);
    };
    const getAffinities = function (attrHandler) {
        return [attrHandler.parseString(WuxDef.GetVariable("Affinity")),
            attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")),
            attrHandler.parseString(WuxDef.GetVariable("Ancestry"))];
    };
    const populateStyleTechniques = function (attrHandler, sectionRepeater, styleName, maxTier) {
        let hasAddedPassives = false;
        let styleTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", styleName));
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", sectionRepeater);
        let affinities = getAffinities(attrHandler);
        let boosterFieldName = WuxDef.GetVariable("BoostStyleTech");
        let sectionRepeaterIndex = 0;
        Debug.Log(`Populating Techniques for ${styleName} with tech count ${sectionRepeater.idLength()}`)
        for (let tier = 1; tier <= 9; tier++) {
            let tierData = styleTechniques.get(tier);
            tierData.iterate(function (techsByAffinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }

                techsByAffinity.forEach(function (technique) {
                    if (sectionRepeaterIndex >= sectionRepeater.idLength()) {
                        sectionRepeater.addIds(sectionRepeater.generateRowId());
                    }
                    techniqueAttributeHandler.setId(sectionRepeater.getIdAtIndex(sectionRepeaterIndex));
                    sectionRepeaterIndex++;
                    techniqueAttributeHandler.setTechniqueInfo(technique, true);
                    if (techniqueAttributeHandler.calcAndSetVisibility(affinities, maxTier)) {
                        if (tryAddTechniqueToBoosters(attrHandler, technique, boosterFieldName)) {
                            hasAddedPassives = true;
                        }
                    }
                });
            });
        }

        // remove extra techniques 
        sectionRepeater.removeAllIdsAfterIndex(sectionRepeaterIndex);
        return hasAddedPassives;
    };
    const populateGearTechniques = function (attrHandler, sectionRepeater, weaponSlotDef, equipSlotDef) {
        let hasAddedPassives = false;
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", sectionRepeater);
        let boosterFieldName = WuxDef.GetVariable("BoostGearTech");
        let sectionRepeaterIndex = 0;

        let itemName = attrHandler.parseString(weaponSlotDef.getVariable(1));
        let item = WuxItems.Get(itemName);
        if (item.hasTechnique) {
            if (sectionRepeaterIndex >= sectionRepeater.idLength()) {
                sectionRepeater.addIds(sectionRepeater.generateRowId());
            }
            techniqueAttributeHandler.setId(sectionRepeater.getIdAtIndex(sectionRepeaterIndex));
            sectionRepeaterIndex++;
            
            let technique = item.technique;
            techniqueAttributeHandler.setTechniqueInfo(technique, true);
            if (tryAddTechniqueToBoosters(attrHandler, technique, boosterFieldName)) {
                hasAddedPassives = true;
            }
        }

        for (let i = 1; i <= 9; i++) {
            itemName = attrHandler.parseString(equipSlotDef.getVariable(i));
            item = WuxItems.Get(itemName);
            if (item.hasTechnique) {
                if (sectionRepeaterIndex >= sectionRepeater.idLength()) {
                    sectionRepeater.addIds(sectionRepeater.generateRowId());
                }
                techniqueAttributeHandler.setId(sectionRepeater.getIdAtIndex(sectionRepeaterIndex));
                sectionRepeaterIndex++;

                let technique = item.technique;
                techniqueAttributeHandler.setTechniqueInfo(technique, true);
                if (tryAddTechniqueToBoosters(attrHandler, technique, boosterFieldName)) {
                    hasAddedPassives = true;
                }
            }
        }

        // remove extra techniques 
        sectionRepeater.removeAllIdsAfterIndex(sectionRepeaterIndex);
        
        return hasAddedPassives;
    };
    const populateBasicActions = function (attributeHandler, repeatingSectionName, styleName) {
        let actionRepeatingWorker = new WorkerRepeatingSectionHandler(repeatingSectionName);

        actionRepeatingWorker.getIds(function (repeater) {
            repeater.removeAllIds();
        });

        addAffinityVariables(attributeHandler);
        addBoosterVariables(attributeHandler);
        addNameVariables(attributeHandler);
        let crFieldName = WuxDef.GetVariable("CR");
        attributeHandler.addMod(crFieldName);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            populateStyleTechniques(attrHandler, actionRepeatingWorker, styleName, 9);
        });
    };
    const populateInspectionElements = function (attrHandler, popupRepeater, sectionRepeater, inspectionTitle, selectedId) {

        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), inspectionTitle);

        let selectedElement = null;
        sectionRepeater.iterate(function (id) {
            let techniqueName = attrHandler.parseString(sectionRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
            let technique = WuxTechs.Get(techniqueName);
            if (technique.techSet != "") {
                let newRowId = popupRepeater.generateRowId();
                attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), technique.name);
                attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Tech");

                if (id == selectedId) {
                    selectedElement = {
                        item: technique,
                        id: newRowId
                    }
                    attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
                } else {
                    attrHandler.addUpdate(popupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                }
            }
        });

        return selectedElement;
    };

    const inspectTechnique = function (repeatingSectionName, inspectionField, inspectionTitle) {
        let styleRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
        let selectedId = styleRepeater.getIdFromFieldName(inspectionField);

        styleRepeater.getIds(function (techRepeater) {
            WuxWorkerInspectPopup.OpenTechniqueInspection(function (attrHandler) {
                    techRepeater.iterate(function (id) {
                        attrHandler.addMod(techRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
                    });
                },
                function (attrHandler, itemPopupRepeater) {
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                    attrHandler.addUpdate(techRepeater.getFieldName(selectedId, WuxDef.GetVariable("Action_Actions")), "0");
                    return populateInspectionElements(attrHandler, itemPopupRepeater, techRepeater, inspectionTitle, selectedId);
                }
            );
        });
    };
    
    const refreshStyleActions = function (attributeHandler, repeatingSectionName, styleNameVar, repeatingSectionIndex, styleWorkerType) {
        let styleWorker = new WuxBasicWorkerBuild(styleWorkerType);
        attributeHandler.addMod([styleWorker.attrBuildDraft, styleNameVar]);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let styleName = attrHandler.parseString(styleNameVar);
            styleWorker.setBuildStatsDraft(attrHandler);
            styleWorker.iterateBuildStats(function (styleVariableData) {
                let style = WuxStyles.GetByVariableName(styleVariableData.name);
                if (style.group != "" && styleVariableData.value > 0 && style.name == styleName) {
                    populateStyleActions(repeatingSectionName, repeatingSectionIndex, styleName, styleVariableData.value);
                }
            });
        });
    }
    
    const getAllStyleSlotRepeaters = function() {
        let repeaterSlotIds = [];
        let jobStylesVar = "RepeatingJobTech";
        let normalStylesVar = "RepeatingAdvTech";
        let maxAdvancedSlots = 3;
        let maxNormalSlots = 6;
        for (let i = 1; i <= maxNormalSlots; i++) {
            if (i <= maxAdvancedSlots) {
                repeaterSlotIds.push({name: jobStylesVar, index: i, repeaterData: {}});
                repeaterSlotIds.push({name: normalStylesVar, index: i, repeaterData: {}});
            }
            repeaterSlotIds.push({name: normalStylesVar, index: i + maxAdvancedSlots, repeaterData: {}});
        }
        return repeaterSlotIds;
    }

    const getStyleSlotRepeaterIDs = function (repeaterSlotData, index, finishCallback) {
        if (index >= repeaterSlotData.length) {
            finishCallback(repeaterSlotData);
            return;
        }
        let slotData = repeaterSlotData[index];
        let styleRepeater = new WorkerRepeatingSectionHandler(slotData.name, slotData.index);
        Debug.Log(`Style Repeater IDs: ${styleRepeater.repeatingSection}`);
        styleRepeater.getIds(function (repeater) {
            repeaterSlotData[index].repeaterData = repeater;
            getStyleSlotRepeaterIDs(repeaterSlotData, index + 1, finishCallback);
        });
    }
    'use strict';

    const 
        updateAllActiveStyleActions = function (attributeHandler, repeaterSlotData, cr) {
            let baseDefinitionName = "Action";
            addBoosterVariables(attributeHandler);
            addAffinityVariables(attributeHandler);
            addNameVariables(attributeHandler);
            
            for (let i = 0; i < repeaterSlotData.length; i++) {
                let slotData = repeaterSlotData[i];
                for (let j = 0; j < slotData.repeaterData.ids.length; j++) {
                    let id = slotData.repeaterData.ids[j];
                    let techniqueAttributeHandler = new TechniqueDataAttributeHandler(
                        attributeHandler, baseDefinitionName, slotData.repeaterData, id);
                    attributeHandler.addMod(techniqueAttributeHandler.getVariable("TechName"));
                    attributeHandler.addMod(techniqueAttributeHandler.getVariable("TechTier"));
                    attributeHandler.addMod(techniqueAttributeHandler.getVariable("TechAffinity"));
                }
            }
    
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let affinities = getAffinities(attrHandler);
                let boosterFieldName = WuxDef.GetVariable("BoostStyleTech");
    
                attrHandler.addUpdate(boosterFieldName, "[]");
                for (let i = 0; i < repeaterSlotData.length; i++) {
                    let slotData = repeaterSlotData[i];
                    for (let j = 0; j < slotData.repeaterData.ids.length; j++) {
                        let id = slotData.repeaterData.ids[j];
                        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(
                            attributeHandler, baseDefinitionName, slotData.repeaterData, id);
                        let techName = attrHandler.parseString(techniqueAttributeHandler.getVariable("TechName"));
                        if (techName == "") {
                            continue;
                        }
                        if (techniqueAttributeHandler.calcAndSetVisibility(affinities, 9, cr)) { // TODO: Set the max tier based on style level
                            let technique = WuxTechs.Get(techName);
                            tryAddTechniqueToBoosters(attrHandler, technique, boosterFieldName);
                        }
                    }
                }
                setTechniqueBoosters(attrHandler);
            });
        },

        getAllStyleSlotRepeaterIDs = function (finishCallback) {
            let repeaterSlotData = getAllStyleSlotRepeaters();
            Debug.Log(`Getting Style Slot Repeater IDs for ${repeaterSlotData.length} slots`);
            getStyleSlotRepeaterIDs(repeaterSlotData, 0, finishCallback);
        },

        populateAllBasicActions = function (attributeHandler) {
            populateBasicActions(attributeHandler, "RepeatingBasicActions", "Basic Action");
            populateBasicActions(attributeHandler, "RepeatingBasicRecovery", "Basic Recovery");
            populateBasicActions(attributeHandler, "RepeatingBasicAttack", "Basic Attack");
            populateBasicActions(attributeHandler, "RepeatingBasicSocial", "Basic Social");
            populateBasicActions(attributeHandler, "RepeatingBasicSpirit", "Basic Spirit");
        },
        
        populatePerkTechniques = function (attributeHandler) {

            let perkTechniques = [];
            let techniqueDef = WuxDef.Get("Technique");
            let styleGroups = WuxDef.Filter([new DatabaseFilterData("group", "PerkGroup")]);
            for (let index = 0; index < styleGroups.length; index++) {
                perkTechniques = perkTechniques.concat(WuxTechs.Filter(new DatabaseFilterData("style", styleGroups[index].getTitle())));
            }
        
            for (let i = 0; i < perkTechniques.length; i++) {
                let perkDef = perkTechniques[i].createDefinition(techniqueDef);
                attributeHandler.addMod(perkDef.getVariable(WuxDef._rank));
            }

            let boosterFieldName = WuxDef.GetVariable("BoostPerkTech");
            addBoosterVariables(attributeHandler);
            addNameVariables(attributeHandler);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                
                let perkBoosters = [];
                for (let i = 0; i < perkTechniques.length; i++) {
                    let technique = perkTechniques[i];
                    let perkDef = technique.createDefinition(techniqueDef);
                    let techRank = attrHandler.parseString(perkDef.getVariable(WuxDef._rank));
                    if (technique.name == "Affinity") {
                        if (techRank == "0") {
                            attrHandler.addUpdate(WuxDef.GetVariable("Affinity"), "0");
                        }
                    } else if (technique.name == "Second Affinity") {
                        if (techRank == "0") {
                            attrHandler.addUpdate(WuxDef.GetVariable("AdvancedAffinity"), "0");
                        }
                    }
                    else if (techRank != "0") {
                        Debug.Log(`Adding technique ${technique.name} with rank ${techRank} to boosters`);
                        perkBoosters.push(technique.name);
                    }
                }

                attrHandler.addUpdate(boosterFieldName, JSON.stringify(perkBoosters));
                setTechniqueBoosters(attrHandler);
            });
        },

        inspectTechniqueBasicAction = function (eventinfo) {
            inspectTechnique("RepeatingBasicActions", eventinfo.sourceAttribute, "All Basic Action Techniques");
        },
        inspectTechniqueBasicRecovery = function (eventinfo) {
            inspectTechnique("RepeatingBasicRecovery", eventinfo.sourceAttribute, "All Basic Recovery Techniques");
        },
        inspectTechniqueBasicAttack = function (eventinfo) {
            inspectTechnique("RepeatingBasicAttack", eventinfo.sourceAttribute, "All Basic Attack Techniques");
        },
        inspectTechniqueBasicSocial = function (eventinfo) {
            inspectTechnique("RepeatingBasicSocial", eventinfo.sourceAttribute, "All Basic Social Techniques");
        },
        inspectTechniqueBasicSpirit = function (eventinfo) {
            inspectTechnique("RepeatingBasicSpirit", eventinfo.sourceAttribute, "All Basic Spirit Techniques");
        },

        populateStyleActions = function (repeatingSectionName, repeatingSectionIndex, styleName, tier) {
            let actionsRepeatingWorker = new WorkerRepeatingSectionHandler(repeatingSectionName, repeatingSectionIndex);

            actionsRepeatingWorker.getIds(function (actionsRepeater) {
                let attributeHandler = new WorkerAttributeHandler();
                actionsRepeater.iterate(function (id) {
                    attributeHandler.addMod(actionsRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
                });

                addAffinityVariables(attributeHandler);
                addBoosterVariables(attributeHandler);
                addNameVariables(attributeHandler);
                let crFieldName = WuxDef.GetVariable("CR");
                attributeHandler.addMod(crFieldName);

                attributeHandler.addGetAttrCallback(function (attrHandler) {

                    let hasRemovedPassives = removeOldTechniqueActions(attrHandler, actionsRepeater, WuxDef.GetVariable("BoostStyleTech"));
                    let hasAddedPassives = populateStyleTechniques(attrHandler, actionsRepeater, styleName, tier);
                    if (hasRemovedPassives || hasAddedPassives) {
                        setTechniqueBoosters(attrHandler);
                    }
                });
                attributeHandler.run();
            });
        },
        refreshJobStyleActions = function (repeatingSectionIndex) {
            Debug.Log(`Refreshing Job Style Actions in slot ${repeatingSectionIndex}`);
            let attributeHandler = new WorkerAttributeHandler();
            refreshStyleActions(attributeHandler, "RepeatingJobTech",
                WuxDef.GetVariable("Forme_JobSlot", repeatingSectionIndex), repeatingSectionIndex, "Job");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        refreshAdvancedStyleActions = function (repeatingSectionIndex) {
            Debug.Log(`Refreshing Advanced Style Actions in slot ${repeatingSectionIndex}`);
            let attributeHandler = new WorkerAttributeHandler();
            refreshStyleActions(attributeHandler, "RepeatingAdvTech",
                WuxDef.GetVariable("Forme_AdvancedSlot", repeatingSectionIndex), repeatingSectionIndex, "Style");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        refreshStandardStyleActions = function (repeatingSectionIndex) {
            Debug.Log(`Refreshing Standard Style Actions in slot ${repeatingSectionIndex}`);
            let attributeHandler = new WorkerAttributeHandler();
            refreshStyleActions(attributeHandler, "RepeatingAdvTech",
                WuxDef.GetVariable("Forme_StyleSlot", parseInt(repeatingSectionIndex)-3), repeatingSectionIndex, "Style");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        populateAllActions = function () {
            Debug.Log("Populating all style actions");
            let attributeHandler = new WorkerAttributeHandler();
            // let maxAdvancedSlots = 3;
            // let maxNormalSlots = 6;
            // for (let i = 1; i <= maxNormalSlots; i++) {
            //     if (i <= maxAdvancedSlots) {
            //         refreshStyleActions(attributeHandler, "RepeatingJobTech",
            //             WuxDef.GetVariable("Forme_JobSlot", i), i, "Job");
            //         refreshStyleActions(attributeHandler, "RepeatingAdvTech",
            //             WuxDef.GetVariable("Forme_AdvancedSlot", i), i, "Style");
            //     }
            //     refreshStyleActions(attributeHandler, "RepeatingAdvTech",
            //         WuxDef.GetVariable("Forme_StyleSlot", i), i + 3, "Style");
            // }
            
            populateBasicActions(attributeHandler, "RepeatingBasicActions", "Basic Action");
            populateBasicActions(attributeHandler, "RepeatingBasicRecovery", "Basic Recovery");
            populateBasicActions(attributeHandler, "RepeatingBasicAttack", "Basic Attack");
            populateBasicActions(attributeHandler, "RepeatingBasicSocial", "Basic Social");
            populateBasicActions(attributeHandler, "RepeatingBasicSpirit", "Basic Spirit");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        refreshBasicActions = function () {
            let attributeHandler = new WorkerAttributeHandler();
            populateBasicActions(attributeHandler, "RepeatingBasicActions", "Basic Action");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        refreshBasicRecovery = function () {
            let attributeHandler = new WorkerAttributeHandler();
            populateBasicActions(attributeHandler, "RepeatingBasicRecovery", "Basic Recovery");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        refreshBasicAttack = function () {
            let attributeHandler = new WorkerAttributeHandler();
            populateBasicActions(attributeHandler, "RepeatingBasicAttack", "Basic Attack");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        refreshBasicSocial = function () {
            let attributeHandler = new WorkerAttributeHandler();
            populateBasicActions(attributeHandler, "RepeatingBasicSocial", "Basic Social");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        refreshBasicSpirit = function () {
            let attributeHandler = new WorkerAttributeHandler();
            populateBasicActions(attributeHandler, "RepeatingBasicSpirit", "Basic Spirit");
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },
        populateGearActions = function () {
            let actionsRepeatingWorker = new WorkerRepeatingSectionHandler("RepeatingGearTech");
            actionsRepeatingWorker.getIds(function (actionsRepeater) {
                actionsRepeater.removeAllIds();
                let attributeHandler = new WorkerAttributeHandler();
                
                let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
                let equipSlotDef = WuxDef.Get("Gear_EquipmentSlot");
                attributeHandler.addMod(weaponSlotDef.getVariable(1));
                for (let i = 1; i <= 9; i++) {
                    attributeHandler.addMod(equipSlotDef.getVariable(i));
                }
    
                addBoosterVariables(attributeHandler);
                addNameVariables(attributeHandler);
                attributeHandler.addGetAttrCallback(function (attrHandler) {


                    attrHandler.addUpdate(WuxDef.GetVariable("BoostGearTech"), "[]");
                    removeOldTechniqueActions(attrHandler, actionsRepeater, WuxDef.GetVariable("BoostGearTech"));
                    populateGearTechniques(attrHandler, actionsRepeater, weaponSlotDef, equipSlotDef);
                    setTechniqueBoosters(attrHandler);
                });
                attributeHandler.run();
            });
        },
        removeStyleActions = function (repeatingSectionName, repeatingSectionIndex) {
            let actionsRepeatingWorker = new WorkerRepeatingSectionHandler(repeatingSectionName, repeatingSectionIndex);

            actionsRepeatingWorker.getIds(function (actionsRepeater) {
                let attributeHandler = new WorkerAttributeHandler();
                actionsRepeater.iterate(function (id) {
                    attributeHandler.addMod(actionsRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
                });
                addBoosterVariables(attributeHandler);

                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    actionsRepeater.removeAllIds();
                    if (removeOldTechniqueActions(attrHandler, actionsRepeater, WuxDef.GetVariable("BoostStyleTech"))) {
                        setTechniqueBoosters(attrHandler);
                    }
                });
                attributeHandler.run();
            });
        },
        removeAllStyleBoosters = function (attrHandler) {
            attrHandler.addUpdate(WuxDef.GetVariable("BoostStyleTech"), "[]");
        },

        setCustomTechnique = function (eventinfo) {
            Debug.Log(`Setting custom technique for ${eventinfo.sourceAttribute} to ${eventinfo.newValue}`);
            let attributeHandler = new WorkerAttributeHandler();
            let actionRepeater = new WorkerRepeatingSectionHandler("RepeatingCustomTech");
            
            let techniqueAttributeHandler = 
                new TechniqueDataAttributeHandler(attributeHandler, "Action", actionRepeater);

            let selectedId = actionRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let technique = new TechniqueData(eventinfo.newValue);
            Debug.Log(`Setting technique ${technique.name} with id ${selectedId}`);
            techniqueAttributeHandler.setId(selectedId);
            techniqueAttributeHandler.setTechniqueInfo(technique, true);
            techniqueAttributeHandler.setVisibilityAttribute(true);
            attributeHandler.run();
        }
    ;

    return {
        UpdateAllActiveStyleActions: updateAllActiveStyleActions,
        GetAllStyleSlotRepeaterIDs: getAllStyleSlotRepeaterIDs,
        PopulateAllBasicActions: populateAllBasicActions,
        PopulatePerkTechniques: populatePerkTechniques,
        InspectTechniqueBasicAction: inspectTechniqueBasicAction,
        InspectTechniqueBasicRecovery: inspectTechniqueBasicRecovery,
        InspectTechniqueBasicAttack: inspectTechniqueBasicAttack,
        InspectTechniqueBasicSocial: inspectTechniqueBasicSocial,
        InspectTechniqueBasicSpirit: inspectTechniqueBasicSpirit,
        PopulateStyleActions: populateStyleActions,
        RefreshJobStyleActions: refreshJobStyleActions,
        RefreshAdvancedStyleActions: refreshAdvancedStyleActions,
        RefreshStandardStyleActions: refreshStandardStyleActions,
        PopulateAllActions: populateAllActions,
        RefreshBasicActions: refreshBasicActions,
        RefreshBasicRecovery: refreshBasicRecovery,
        RefreshBasicAttack: refreshBasicAttack,
        RefreshBasicSocial: refreshBasicSocial,
        RefreshBasicSpirit: refreshBasicSpirit,
        PopulateGearActions: populateGearActions,
        RemoveStyleActions: removeStyleActions,
        RemoveAllStyleBoosters: removeAllStyleBoosters,
        SetCustomTechnique: setCustomTechnique,
    };
}());
