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
            if (technique.action == "Passive") {
                let index = passiveStyleTechniques.indexOf(technique.name);
                if (index >= 0) {
                    hasRemovedPassive = true;
                    passiveStyleTechniques.splice(index, 1);
                    attrHandler.addUpdate(boosterFieldName, JSON.stringify(passiveStyleTechniques));
                }
            }
        });

        actionRepeater.removeAllIds();
        return hasRemovedPassive;
    }
    const setTechniqueBoosters = function (attrHandler) {
        Debug.Log("Setting technique boosters");
        let techBoosters = attrHandler.parseJSON(WuxDef.GetVariable("BoostStyleTech"));
        let gearBoosters = attrHandler.parseJSON(WuxDef.GetVariable("BoostGearTech"));
        let perkBoosters = attrHandler.parseJSON(WuxDef.GetVariable("BoostPerkTech"));
        Debug.Log(`Boost Perk Tech: ${perkBoosters}`);

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
        });
        attributeHandler.run();
    }

    const addBoostStyleTechFormulaMods = function (attrHandler, techBoosters) {
        iteratePassiveStyleTechniques(techBoosters, function (technique) {
            Debug.Log(`Adding boost formula mods for ${technique.name}`);
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
                        Debug.Log(`Setting ${boostDef.getVariable()} to ${techEffect.formula.getValue(attrHandler)}`);
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
        attrHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity")]);
    };
    const addBoosterVariables = function (attrHandler) {
        attrHandler.addMod([WuxDef.GetVariable("BoostStyleTech"), WuxDef.GetVariable("BoostGearTech"), WuxDef.GetVariable("BoostPerkTech")]);
    };
    const getAffinities = function (attrHandler) {
        return [attrHandler.parseString(WuxDef.GetVariable("Affinity")),
            attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity"))];
    };
    const populateStyleTechniques = function (attrHandler, sectionRepeater, styleName, maxTier) {
        let hasAddedPassives = false;
        let styleTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", styleName));
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", sectionRepeater);
        let affinities = getAffinities(attrHandler);
        let boosterFieldName = WuxDef.GetVariable("BoostStyleTech");
        for (let tier = 1; tier <= maxTier; tier++) {
            let tierData = styleTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }
                if (!affinities.includes(affinity)) {
                    return;
                }

                techsByAffinity.forEach(function (technique) {
                    techniqueAttributeHandler.setId(sectionRepeater.generateRowId());
                    techniqueAttributeHandler.setTechniqueInfo(technique, true);
                    if (tryAddTechniqueToBoosters(attrHandler, technique, boosterFieldName)) {
                        hasAddedPassives = true;
                    }
                });
            });
        }
        return hasAddedPassives;
    };
    const populateGearTechniques = function (attrHandler, sectionRepeater, weaponSlotDef, equipSlotDef) {
        let hasAddedPassives = false;
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action", sectionRepeater);
        let boosterFieldName = WuxDef.GetVariable("BoostGearTech");

        let itemName = attrHandler.parseString(weaponSlotDef.getVariable(1));
        if (tryAddItemTechnique(attrHandler, techniqueAttributeHandler, sectionRepeater, boosterFieldName, itemName)) {
            hasAddedPassives = true;
        }

        for (let i = 1; i <= 9; i++) {
            itemName = attrHandler.parseString(equipSlotDef.getVariable(i));
            if (tryAddItemTechnique(attrHandler, techniqueAttributeHandler, sectionRepeater, boosterFieldName, itemName)) {
                hasAddedPassives = true;
            }
        }
        return hasAddedPassives;
    };
    const tryAddItemTechnique = function (attrHandler, techniqueAttributeHandler, sectionRepeater, boosterFieldName, itemName) {
        let item = WuxItems.Get(itemName);
        if (item.hasTechnique) {
            let technique = item.technique;
            techniqueAttributeHandler.setId(sectionRepeater.generateRowId());
            techniqueAttributeHandler.setTechniqueInfo(technique, true);
            if (tryAddTechniqueToBoosters(attrHandler, technique, boosterFieldName)) {
                return true;
            }
        }
        return false;
    }
    const populateBasicActions = function (attributeHandler, repeatingSectionName, styleName) {
        let actionRepeatingWorker = new WorkerRepeatingSectionHandler(repeatingSectionName);

        actionRepeatingWorker.getIds(function (repeater) {
            repeater.removeAllIds();
        });

        addAffinityVariables(attributeHandler);
        addBoosterVariables(attributeHandler);
        let crFieldName = WuxDef.GetVariable("CR");
        attributeHandler.addMod(crFieldName);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            populateStyleTechniques(attrHandler, actionRepeatingWorker, styleName, attrHandler.parseInt(crFieldName));
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
    'use strict';

    const updateStats = function (attributeHandler) {
            addBoosterVariables(attributeHandler);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                setTechniqueBoosters(attrHandler);
            });
        },

        populateAllBasicActions = function (attributeHandler) {
            populateBasicActions(attributeHandler, "RepeatingBasicActions", "Basic Action");
            populateBasicActions(attributeHandler, "RepeatingBasicRecovery", "Basic Recovery");
            populateBasicActions(attributeHandler, "RepeatingBasicAttack", "Basic Attack");
            populateBasicActions(attributeHandler, "RepeatingBasicSocial", "Basic Social");
        },

        populatePerkTechniques = function (attributeHandler) {
            let perkTechniques = WuxTechs.Filter(new DatabaseFilterData("techSet", "Perk"));
            let techniqueDef = WuxDef.Get("Technique");
            for (let i = 0; i < perkTechniques.length; i++) {
                let perkDef = perkTechniques[i].createDefinition(techniqueDef);
                attributeHandler.addMod(perkDef.getVariable(WuxDef._rank));
            }

            let boosterFieldName = WuxDef.GetVariable("BoostPerkTech");
            addBoosterVariables(attributeHandler);
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

        populateStyleActions = function (repeatingSectionName, repeatingSectionIndex, styleName, tier) {
            let actionsRepeatingWorker = new WorkerRepeatingSectionHandler(repeatingSectionName, repeatingSectionIndex);

            actionsRepeatingWorker.getIds(function (actionsRepeater) {
                let attributeHandler = new WorkerAttributeHandler();
                actionsRepeater.iterate(function (id) {
                    attributeHandler.addMod(actionsRepeater.getFieldName(id, WuxDef.GetUntypedVariable("Action", "TechName")));
                });

                addAffinityVariables(attributeHandler);
                addBoosterVariables(attributeHandler);
                let crFieldName = WuxDef.GetVariable("CR");
                attributeHandler.addMod(crFieldName);

                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let cr = attrHandler.parseInt(crFieldName);
                    let maxRank = Math.min(tier, cr);

                    let hasRemovedPassives = removeOldTechniqueActions(attrHandler, actionsRepeater, WuxDef.GetVariable("BoostStyleTech"));
                    let hasAddedPassives = populateStyleTechniques(attrHandler, actionsRepeatingWorker, styleName, maxRank);
                    if (hasRemovedPassives || hasAddedPassives) {
                        setTechniqueBoosters(attrHandler);
                    }
                });
                attributeHandler.run();
            });
        },
        populateGearActions = function () {
            let actionsRepeatingWorker = new WorkerRepeatingSectionHandler("RepeatingGearTech");
            actionsRepeatingWorker.getIds(function (actionsRepeater) {
                let attributeHandler = new WorkerAttributeHandler();
                
                let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
                let equipSlotDef = WuxDef.Get("Gear_EquipmentSlot");
                attributeHandler.addMod(weaponSlotDef.getVariable(1));
                for (let i = 1; i <= 9; i++) {
                    attributeHandler.addMod(equipSlotDef.getVariable(i));
                }
    
                addBoosterVariables(attributeHandler);
                attributeHandler.addGetAttrCallback(function (attrHandler) {
    
                    let hasRemovedPassives = removeOldTechniqueActions(attrHandler, actionsRepeater, WuxDef.GetVariable("BoostGearTech"));
                    let hasAddedPassives = populateGearTechniques(attrHandler, actionsRepeater, weaponSlotDef, equipSlotDef);
                    if (hasRemovedPassives || hasAddedPassives) {
                        setTechniqueBoosters(attrHandler);
                    }
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
        }
    ;

    return {
        UpdateStats: updateStats,
        PopulateAllBasicActions: populateAllBasicActions,
        PopulatePerkTechniques: populatePerkTechniques,
        InspectTechniqueBasicAction: inspectTechniqueBasicAction,
        InspectTechniqueBasicRecovery: inspectTechniqueBasicRecovery,
        InspectTechniqueBasicAttack: inspectTechniqueBasicAttack,
        InspectTechniqueBasicSocial: inspectTechniqueBasicSocial,
        PopulateStyleActions: populateStyleActions,
        PopulateGearActions: populateGearActions,
        RemoveStyleActions: removeStyleActions
    };
}());
