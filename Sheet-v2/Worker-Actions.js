var WuxWorkerActions = WuxWorkerActions || (function () {
    // Same affinity fields/computation FormeTechniqueDatabase.setupPostGetAttr uses -
    // needed here too since rankTechnique/swapTechniqueVariant populate the
    // FormeTechniques repeater's variant buttons but don't otherwise build a full
    // FormeTechniqueDatabase instance.
    const getUserAffinityFields = function () {
        return [WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry")];
    };
    const getUserAffinities = function (attrHandler, affinityFields) {
        let advancedAffinities = attrHandler.parseString(affinityFields[1]).split(";").map(s => s.trim()).filter(s => s !== "");
        return [attrHandler.parseString(affinityFields[0]), ...advancedAffinities, attrHandler.parseString(affinityFields[2])];
    };
    const rankTechnique = function (attributeHandler, repeatingSectionName, sourceFieldName, rankChange) {
        let styleWorker = new WuxStyleWorkerBuild();
        attributeHandler.addMod([styleWorker.attrBuildDraft, styleWorker.attrMax]);

        let techniquesRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
        let selectedId = techniquesRepeater.getIdFromFieldName(sourceFieldName);
        let techniqueNameField = techniquesRepeater.getFieldName(
            selectedId, WuxDef.GetUntypedVariable("Action", "TechTrueName"));
        let crField = WuxDef.GetVariable("CR");
        let fullNameField = WuxDef.GetVariable("FullName");
        let affinityFields = getUserAffinityFields();

        attributeHandler.addMod([techniqueNameField, crField, fullNameField].concat(affinityFields));

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            styleWorker.setBuildStatsDraft(attrHandler);
            let techniqueName = attrHandler.parseString(techniqueNameField);
            Debug.Log(`Ranking ${rankChange > 0 ? "Up" : "Down"} ${techniqueName}`);
            // Rank is shared across variants, so it's always stored under the root
            // technique's own name/variable - the displayed technique (which may be a
            // variant) only matters for the rank cap and for what stays on screen.
            let displayTechnique = WuxTechs.Get(techniqueName);
            let rootTechnique = WuxTechs.Get(displayTechnique.getRootName());
            let updatingAttr = rootTechnique.createDefinition(WuxDef.Get("Technique")).getVariable();
            let newRank;
            let techniqueData = styleWorker.getTechniqueData(techniqueName);
            if (techniqueData != undefined) {
                newRank = techniqueData.rank + rankChange;
            }
            else {
                newRank = 1 + rankChange;
                styleWorker.changeWorkerAttribute(attributeHandler, updatingAttr, newRank, rootTechnique.techSet);
            }

            if (rankChange > 0) {
                let maxRank = displayTechnique.getMaxRank(attrHandler.parseInt(crField));
                newRank = Math.min(newRank, maxRank);
            }
            else {
                newRank = Math.max(newRank, 1);
            }
            Debug.Log(`${techniqueName} (shared with ${rootTechnique.name}) set to rank ${newRank}`);
            styleWorker.updateBuildStats(attrHandler, updatingAttr, {value: newRank, group: rootTechnique.techSet});
            styleWorker.updatePoints(attrHandler);

            let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
            techniqueAttributeHandler.setRepeaterData(techniquesRepeater);
            techniqueAttributeHandler.setId(selectedId);
            displayTechnique.setRank(newRank);
            let userAffinities = getUserAffinities(attrHandler, affinityFields);
            techniqueAttributeHandler.setTechniqueInfo(displayTechnique, true, {excludeCurrent: true, userAffinities: userAffinities});
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

    const updateAllActions = function (attributeHandler, filters, forceRebuild) {
        let formeTech = new FormeTechniqueDatabase(attributeHandler, filters);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            formeTech.setupPostGetAttr(attrHandler);
            formeTech.registerTechDictionary(attrHandler);

            // A separate, nested round-trip (mirrors Worker-InspectPopup.js's
            // getTargetData) just to read the live stat values every known
            // technique's own formulas reference - only known now that
            // registerTechDictionary has populated techDictionary. Only ever
            // read from (FormulaData.getCharacterString), never written to.
            let characterAttrHandler = new WorkerAttributeHandler();
            formeTech.addCharacterFormulaAttributes(characterAttrHandler);
            characterAttrHandler.addGetAttrCallback(function () {
                formeTech.updateDataAndVisibilityOfRepeaterTechniques(attrHandler, characterAttrHandler, forceRebuild);
                formeTech.addMissingTechniques(attrHandler, undefined, characterAttrHandler);
                formeTech.updateLoadTechniques(attrHandler);
            });
            characterAttrHandler.run();
        });
        attributeHandler.addFinishCallback(function () {
            formeTech.setSortOrder();
        });
    }

    // Builds the full tech dictionary (so boosters are registered for everything, same as updateAllActions),
    // but only pushes the newly-set job's own techniques into the repeater right away. Everything else stays
    // queued as "unset" for the incremental builder loop to pick up, instead of loading the whole kit at once.
    const updateJobActions = function (attributeHandler, jobName, filters) {
        let formeTech = new FormeTechniqueDatabase(attributeHandler, filters);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            formeTech.setupPostGetAttr(attrHandler);
            formeTech.registerTechDictionary(attrHandler);

            let characterAttrHandler = new WorkerAttributeHandler();
            formeTech.addCharacterFormulaAttributes(characterAttrHandler);
            characterAttrHandler.addGetAttrCallback(function () {
                formeTech.updateDataAndVisibilityOfRepeaterTechniques(attrHandler, characterAttrHandler);
                formeTech.addMissingJobTechniques(attrHandler, jobName, characterAttrHandler);
            });
            characterAttrHandler.run();
        });
        attributeHandler.addFinishCallback(function () {
            formeTech.setSortOrder();
        });
    }

    const updateBuilderActions = function (attributeHandler, filters) {
        let pageSetVariable = WuxDef.GetVariable("PageSet");
        let remainingVar = WuxDef.GetVariable("Technique", WuxDef._db);
        attributeHandler.addMod(pageSetVariable);
        attributeHandler.addMod(remainingVar);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            if (attrHandler.parseString(pageSetVariable) !== "Builder") {
                return;
            }
            let remaining = attrHandler.parseJSON(remainingVar);
            let attributeHandler2 = new WorkerAttributeHandler();
            if (Array.isArray(remaining) && remaining.length > 0) {
                let baseTech = new FormeTechniqueDatabaseBase(attributeHandler2);
                attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                    for (const name of remaining) {
                        let technique = WuxTechs.Get(name);
                        if (technique != undefined) {
                            baseTech.techDictionary.add(name, baseTech.createTechDictionaryTechnique(technique, 1, true));
                        }
                    }
                    let characterAttrHandler = new WorkerAttributeHandler();
                    baseTech.addCharacterFormulaAttributes(characterAttrHandler);
                    characterAttrHandler.addGetAttrCallback(function () {
                        baseTech.addMissingTechniques(attrHandler2, 1, characterAttrHandler);
                    });
                    characterAttrHandler.run();
                });
            } else {
                let formeTech = new FormeTechniqueDatabase(attributeHandler2, filters);
                attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                    formeTech.setupPostGetAttr(attrHandler2);
                    formeTech.registerTechDictionary(attrHandler2);
                    let characterAttrHandler = new WorkerAttributeHandler();
                    formeTech.addCharacterFormulaAttributes(characterAttrHandler);
                    characterAttrHandler.addGetAttrCallback(function () {
                        formeTech.updateDataAndVisibilityOfRepeaterTechniques(attrHandler2, characterAttrHandler);
                        formeTech.addMissingTechniques(attrHandler2, 1, characterAttrHandler);
                    });
                    characterAttrHandler.run();
                });
            }
            attributeHandler2.run();
        });
    }

    const triggerBuilderActionUpdate = function () {
        let attributeHandler = new WorkerAttributeHandler();
        updateBuilderActions(attributeHandler);
        attributeHandler.run();
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
        updateAllActionsFromMenuSilent = function (attributeHandler, runFn) {
            let formeTechniqueFilterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            attributeHandler.addMod(formeTechniqueFilterVariable);
            attributeHandler.addFinishCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                let filter = attrHandler.parseJSON(formeTechniqueFilterVariable);
                updateAllActions(attributeHandler2, filter);
                if (runFn) {
                    runFn(attributeHandler2);
                } else {
                    attributeHandler2.run();
                }
            });
        },
        updateAllActionsFromMenu = function (attributeHandler, onComplete) {
            let pageSetVariable = WuxDef.GetVariable("PageSet");
            attributeHandler.addMod(pageSetVariable);
            updateAllActionsFromMenuSilent(attributeHandler, function (attributeHandler2) {
                let loader = new LoadingScreenHandler(attributeHandler2);
                let result = loader.run();
                if (onComplete) {
                    result.then(onComplete);
                }
            });
        },
        updateJobActionsFromMenu = function (attributeHandler, jobName, onComplete) {
            let formeTechniqueFilterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            attributeHandler.addMod(formeTechniqueFilterVariable);
            attributeHandler.addFinishCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                let filter = attrHandler.parseJSON(formeTechniqueFilterVariable);
                updateJobActions(attributeHandler2, jobName, filter);
                let loader = new LoadingScreenHandler(attributeHandler2);
                let result = loader.run();
                if (onComplete) {
                    result.then(onComplete);
                }
            });
        },
        updateAllFormeActions = function (attributeHandler, filters, forceRebuild) {
            updateAllActions(attributeHandler, filters, forceRebuild);
        },
        refreshAllFormeActions = function () {
            Debug.Log(`Refreshing All Forme Actions`);
            let attributeHandler = new WorkerAttributeHandler();
            updateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },
        
        updateVisibilityOfFormeActions = function (attributeHandler) {
            Debug.Log(`Update Visibility of Forme Actions`);
            let pageSetVariable = WuxDef.GetVariable("PageSet");
            let formeTechniqueFilterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            attributeHandler.addMod(pageSetVariable, formeTechniqueFilterVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                let filter = attrHandler.parseJSON(formeTechniqueFilterVariable);
                updateVisibilityAllActions(attributeHandler2, filter);
                // Not also calling attributeHandler2.run() directly here - handing the
                // same instance to LoadingScreenHandler, which calls .run() on it
                // internally, was firing every getAttrCallback/finishCallback registered
                // on attributeHandler2 (updateVisibilityAllActions' whole callback,
                // including formeTech.setSortOrder()) twice per equip/unequip.
                let loader = new LoadingScreenHandler(attributeHandler2);
                loader.run();
            });
        },
        // Same filter-fetch/nested-handler shape as updateVisibilityOfFormeActions,
        // but drives the full updateAllActions path instead of the visibility-only
        // one - needed so a CR change (updateCR, Worker-General.js) actually reaches
        // updateRepeaterTechniqueDisplayInfo's CR-gate and rebuilds the character-aware
        // effect text, not just row visibility (which updateAllActions already covers
        // via setRepeaterTechniqueVisibility, so no separate visibility call is needed).
        updateFormeActionsForCRChange = function (attributeHandler) {
            Debug.Log(`Update Forme Actions For CR Change`);
            let pageSetVariable = WuxDef.GetVariable("PageSet");
            let formeTechniqueFilterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            attributeHandler.addMod(pageSetVariable, formeTechniqueFilterVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();
                let filter = attrHandler.parseJSON(formeTechniqueFilterVariable);
                updateAllActions(attributeHandler2, filter);
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
                let characterAttrHandler = new WorkerAttributeHandler();
                formeTech.addCharacterFormulaAttributes(characterAttrHandler);
                characterAttrHandler.addGetAttrCallback(function () {
                    formeTech.updateDataAndVisibilityOfRepeaterTechniques(attrHandler, characterAttrHandler);
                    formeTech.addMissingTechniques(attrHandler, undefined, characterAttrHandler);
                });
                characterAttrHandler.run();
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
        swapTechniqueVariant = function (attributeHandler, repeatingSectionName, sourceFieldName) {
            let styleWorker = new WuxStyleWorkerBuild();
            attributeHandler.addMod([styleWorker.attrBuildDraft, styleWorker.attrMax]);

            let techniquesRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
            let selectedId = techniquesRepeater.getIdFromFieldName(sourceFieldName);

            let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attributeHandler, "Action");
            techniqueAttributeHandler.setRepeaterData(techniquesRepeater, selectedId);

            let selectField = techniqueAttributeHandler.getVariantSelectFieldName();
            let slotFields = [];
            for (let i = 0; i < 6; i++) {
                slotFields.push(techniqueAttributeHandler.getVariantFieldName(i));
            }
            let affinityFields = getUserAffinityFields();
            // setTechniqueRankButtons (run via setTechniqueInfo below) needs CR fetched
            // ahead of time too, or it silently falls back to a default of 1 and makes
            // both rank buttons compute as disabled regardless of the real max rank.
            attributeHandler.addMod([selectField, WuxDef.GetVariable("CR")].concat(slotFields).concat(affinityFields));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);
                // Submitted as i+1 (1-6), not the raw 0-5 slot index - see printVariants,
                // WuxGS-FeatureDisplayBuilder.js, for why.
                let slotIndex = attrHandler.parseInt(selectField) - 1;
                if (isNaN(slotIndex) || slotIndex < 0 || slotIndex >= slotFields.length) {
                    return;
                }
                let slotValue = attrHandler.parseString(slotFields[slotIndex]);
                let separatorIndex = slotValue.indexOf(":");
                if (separatorIndex == -1) {
                    return;
                }
                let technique = WuxTechs.Get(slotValue.substring(separatorIndex + 1));
                if (technique == undefined) {
                    return;
                }
                // Rank is shared across variants (see rankTechnique) - carry it over
                // rather than letting the newly displayed variant reset to its default.
                let techniqueData = styleWorker.getTechniqueData(technique.name);
                if (techniqueData != undefined) {
                    technique.setRank(techniqueData.rank);
                }
                let userAffinities = getUserAffinities(attrHandler, affinityFields);
                techniqueAttributeHandler.setTechniqueInfo(technique, true, {excludeCurrent: true, userAffinities: userAffinities});
            });
            attributeHandler.run();
        },
        swapTechniqueVariantEvent = function (eventinfo, repeatingSection) {
            let attributeHandler = new WorkerAttributeHandler();
            swapTechniqueVariant(attributeHandler, repeatingSection, eventinfo.sourceAttribute);
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
                new TechniqueDataAttributeHandler(attributeHandler, "Action");
            techniqueAttributeHandler.setRepeaterData(actionRepeater);

            let selectedId = actionRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let technique = new TechniqueData(eventinfo.newValue);
            techniqueAttributeHandler.setId(selectedId);
            techniqueAttributeHandler.setTechniqueInfo(technique, true);
            techniqueAttributeHandler.setVisibilityAttribute(true);
            attributeHandler.run();
        },

        getBaseFilterLeafDefinitions = function () {
            return WuxDef.Filter([new DatabaseFilterData("group", "TechBaseFilter")])
                .filter(def => def.subGroup !== "BaseGroup");
        },

        applyBaseFilters = function (filters) {
            // Write the filter JSON to _filter so the "Remove Filter" button becomes visible,
            // and apply the filter directly since setAttrs is always silent and won't trigger onChange.
            let filterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            let filtersToStore = filters.length > 0 ? filters : 0;
            let loader = new LoadingScreenHandler();
            loader.showLoadingScreen(() => {
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addUpdate(filterVariable, JSON.stringify(filtersToStore));
                updateAllFormeActions(attributeHandler, filters.length > 0 ? filters : undefined);
                attributeHandler.addFinishCallback(() => {
                    loader.hideLoadingScreen();
                });
                attributeHandler.run();
            });
        },

        getBaseFilterCategoryKeys = function () {
            let baseGroups = WuxDef.Filter([
                new DatabaseFilterData("group", "TechBaseFilter"),
                new DatabaseFilterData("subGroup", "BaseGroup")
            ]);
            let categoryKeyByTitle = {};
            baseGroups.forEach(groupDef => {
                categoryKeyByTitle[groupDef.getTitle()] = groupDef.getDescription();
            });
            return categoryKeyByTitle;
        },

        quickFilterFormeActions = function () {
            Debug.Log("Quick Filter Forme Actions");
            let categoryKeyByTitle = getBaseFilterCategoryKeys();
            let allBaseFilters = getBaseFilterLeafDefinitions();
            let filterVariables = allBaseFilters.map(def => def.getVariable());

            // The Style filter computes its match values dynamically instead of from a static
            // description: it covers both the style currently equipped in the Job Forme slot
            // and every individually learned style.
            let styleWorker = new WuxStyleWorkerBuild();
            let jobSlotVariable = WuxDef.GetVariable("Forme_JobSlot");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(filterVariables);
            attributeHandler.addMod(styleWorker.attrBuildDraft);
            attributeHandler.addMod(jobSlotVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);
                let equippedJobStyle = attrHandler.parseString(jobSlotVariable);
                let learnedStyleNames = styleWorker.getStyles().map(technique => technique.name);

                let mergedRules = {};
                // A checked box always claims its key, even with zero values - an empty value
                // list still filters correctly (Database.filter treats it as "match nothing"),
                // so checking e.g. Style with no styles learned should show nothing, not everything.
                let addValues = function (key, values) {
                    if (mergedRules[key] == undefined) {
                        mergedRules[key] = new Set();
                    }
                    values.forEach(v => mergedRules[key].add(v));
                };

                for (let def of allBaseFilters) {
                    if (attrHandler.parseString(def.getVariable()) !== "on") {
                        continue;
                    }

                    if (def.name === "TechBaseFilter_Style") {
                        // "Job" and "Style" were merged into one checkbox, so this now needs to
                        // cover both: the equipped job's style, plus every individually learned
                        // style. sortingGroups.style[<style name>] only lists that style's variant
                        // techniques, not the base style technique itself - so also match the
                        // broad "Style" category to pick up the learned/equipped base(s). This
                        // can't leak in unlearned styles' bases since checkTechniqueIsVisibleInFilter
                        // only ever runs against techniques already registered in the kit.
                        let styleNames = learnedStyleNames.slice();
                        if (equippedJobStyle !== "") {
                            styleNames.push(equippedJobStyle);
                        }
                        addValues("style", styleNames.length > 0 ? styleNames.concat("Style") : []);
                        continue;
                    }

                    let key = categoryKeyByTitle[def.subGroup];
                    if (key == undefined || key === "") {
                        Debug.Log(`No filter key defined for category "${def.subGroup}"`);
                        continue;
                    }
                    let description = def.getDescription();
                    if (description === "") {
                        continue;
                    }
                    addValues(key, description.split(",").map(v => v.trim()).filter(v => v !== ""));
                }

                let filters = Object.keys(mergedRules).map(key => {
                    let values = Array.from(mergedRules[key]);
                    return new DatabaseFilterData(key, values.length === 1 ? values[0] : values);
                });
                applyBaseFilters(filters);
            });
            attributeHandler.run();
        },

        clearBaseFilterCheckboxes = function (attributeHandler) {
            let allBaseFilters = getBaseFilterLeafDefinitions();
            allBaseFilters.forEach(def => attributeHandler.addUpdate(def.getVariable(), 0));
        },

        clearBaseFilters = function () {
            Debug.Log("Clear All Base Filters");
            let attributeHandler = new WorkerAttributeHandler();
            clearBaseFilterCheckboxes(attributeHandler);
            attributeHandler.run();
            applyBaseFilters([]);
        },

        updateTechniqueChangeVisibility = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let advJobVar = WuxDef.GetVariable("AdvancementJob");
            let spiritConduitVar = WuxDef.GetVariable("Perk_Spirit Conduit");
            attributeHandler.addMod([advJobVar, spiritConduitVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let hasMultipleJobs = attrHandler.parseInt(advJobVar) > 0;
                let hasSpiritConduit = attrHandler.parseString(spiritConduitVar) !== "0" && attrHandler.parseString(spiritConduitVar) !== "";
                let isVisible = (hasMultipleJobs || hasSpiritConduit) ? "on" : "0";
                attrHandler.addUpdate(WuxDef.GetVariable("Title_TechniqueChange", WuxDef._build), isVisible);
            });
            attributeHandler.run();
        }
    ;

    const onEnterActionsPage = function (eventinfo) {
        if (eventinfo.newValue !== "Styles") return;
        let attributeHandler = new WorkerAttributeHandler();
        let pageSetVariable = WuxDef.GetVariable("PageSet");
        attributeHandler.addMod(pageSetVariable);
        attributeHandler.addFinishCallback(function (attrHandler) {
            if (attrHandler.parseString(pageSetVariable) !== "Builder") return;
            let attributeHandler2 = new WorkerAttributeHandler();
            updateAllActionsFromMenuSilent(attributeHandler2);
            attributeHandler2.run();
        });
        attributeHandler.run();
    }

    // Reached from the "More Info" buttons that replaced every technique
    // repeater row's hover tooltips (Range/Traits/Core Effects/Check
    // Effects/Will Break/Action - GoogleSheets/WuxGS-FeatureDisplayBuilder.js).
    // repeaterId defaults to the live FormeTechniques repeater, but the
    // generator's listener (WuxGS-Backend.js's listenerOpenTechniqueMoreInfo)
    // always passes it explicitly - confirmed every technique repeater
    // (RepeatingFormeTech, the technique catalog/Job Techniques popup's
    // TechPopupValues, RepeatingStyles, RepeatingPerks) builds its rows with
    // the same "Action" base definition (Worker-InspectPopup.js:469,1123,
    // Worker-Styles.js:754), so a single TechniqueDataAttributeHandler("Action")
    // works for all of them - only the repeater name differs. eventinfo.sourceAttribute
    // carries both which row was clicked and which section's button it was
    // (e.g. ..._techtraits_moreinfo vs ..._techcoreeffect_moreinfo), so one
    // shared listener per repeater dispatches every section's button on every
    // row to this single handler. The content is already sitting in that
    // row's own "_max" slot (written by setTechniqueInfo/TechniqueDisplayData
    // the last time the row was built) - this just forwards it to the Manual,
    // nothing recomputed here.
    const openTechniqueMoreInfo = function (eventinfo, repeaterId) {
        // Roll20 marks eventinfo.sourceType "sheetworker" (not "player") when a
        // change comes from another sheet worker's setAttrs() rather than a real
        // click - rewriting this same row's fields in bulk (rank change/variant
        // swap both go through setTechniqueInfo, WJS-Service.js, via
        // addRepeatingSectionRowUpdate) fires change events across the row,
        // including this button's own trigger, even though setTechniqueInfo
        // never explicitly writes it. Only an actual click has sourceType
        // "player", so that's checked alongside the "on" transition below.
        if (eventinfo.sourceType !== "player" || eventinfo.newValue !== "on") {
            return;
        }
        let repeater = new WorkerRepeatingSectionHandler(repeaterId || "RepeatingFormeTech");
        let rowId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
        let attributeHandler = new WorkerAttributeHandler();
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attributeHandler, "Action");
        techniqueAttributeHandler.setRepeaterData(repeater, rowId);

        // labelAttribute/labelSuffix (when set) point at the button's own
        // live visible text - e.g. Action's button shows TechActionName's
        // base slot ("Swift - 1/Turn"), not the "Action" title. labelText
        // covers the one section whose button text is just a fixed string
        // (Traits). The three effect-type sections (Core/Check/Will Break)
        // deliberately have neither set, so the default below falls through
        // to their own attribute's base slot - the effect's actual resolved
        // text ("You gain 1 ranks in the Burst Status"), not the generic
        // button label ("Effects"/"Will Break Effects") or the check line
        // ("Body vs. Evasion") - see each section's printAttributeTooltip
        // call in TechniqueRepeaterDisplayBuilder for what name each button
        // actually renders, and WJS-Service.js for how the base slot (vs.
        // _max) holds the effect text itself vs. its tooltip breakdown.
        // extraLabelAttribute (Range only): the target style span
        // (printTargetType, TechniqueRepeaterDisplayBuilder) sits next to the
        // Range button but isn't part of it - combined here into one header,
        // "{range} - {targetStyle}" (e.g. "1 - One Target"), since on the
        // card itself the two already read as one unit.
        let sections = [
            {attribute: "TechActionName", title: "Action"},
            {attribute: "TechTargetType", title: "Range", labelAttribute: "TechRange", extraLabelAttribute: "TechTargetType"},
            {attribute: "TechTraits", title: "Traits"},
            {attribute: "TechCoreEffect", title: "Core Effects"},
            {attribute: "TechCheckEffect", title: "Skill Check Effects"},
            {attribute: "TechWillBreakEffect", title: "Will Break Effects"}
        ];
        let section = sections.find((s) => techniqueAttributeHandler.getVariable(s.attribute, WuxDef._moreinfo) == eventinfo.sourceAttribute);
        if (section == undefined) {
            return;
        }

        let nameVar = techniqueAttributeHandler.getVariable("TechName");
        let trueNameVar = techniqueAttributeHandler.getVariable("TechTrueName");
        let rankVar = techniqueAttributeHandler.getVariable("TechRank");
        let contentVar = techniqueAttributeHandler.getVariable(section.attribute, WuxDef._max);
        let labelVar = section.labelText == undefined
            ? techniqueAttributeHandler.getVariable(section.labelAttribute || section.attribute, section.labelSuffix)
            : undefined;
        let extraLabelVar = section.extraLabelAttribute != undefined
            ? techniqueAttributeHandler.getVariable(section.extraLabelAttribute)
            : undefined;
        attributeHandler.addMod([nameVar, trueNameVar, rankVar, contentVar]);
        if (labelVar != undefined) {
            attributeHandler.addMod(labelVar);
        }
        if (extraLabelVar != undefined) {
            attributeHandler.addMod(extraLabelVar);
        }
        attributeHandler.addUpdate(eventinfo.sourceAttribute, "0");
        attributeHandler.addFinishCallback(function (attrHandler) {
            let techniqueName = attrHandler.parseString(nameVar);
            let trueName = attrHandler.parseString(trueNameVar);
            let rank = attrHandler.parseInt(rankVar, 0);
            let label = labelVar != undefined ? attrHandler.parseString(labelVar) : section.labelText;
            if (extraLabelVar != undefined) {
                label = `${label} - ${attrHandler.parseString(extraLabelVar)}`;
            }
            let isEffectSection = section.attribute == "TechCoreEffect" || section.attribute == "TechCheckEffect" || section.attribute == "TechWillBreakEffect";
            // For the three effect-type sections, the old bracket-crammed
            // breakdown (getXEffectTooltips) is dropped entirely in favor of
            // getEffectExplanationEntries' clean, separate entries below -
            // Action/Range/Traits don't have a structured equivalent yet, so
            // they keep showing their own "_max" slot text as-is.
            // A literal "" here doesn't reliably clear this field's earlier
            // value in Roll20 (same class of issue as the project's established
            // "never use \"\" as an empty sentinel" rule for hidden-field flags -
            // confirmed by a previous More Info click's leftover text staying
            // visible under a later click's title/subgroup that correctly
            // updated). A single space is a genuine value change, so it
            // actually overwrites the old text, and reads as blank.
            let description = isEffectSection ? " " : attrHandler.parseString(contentVar);
            let entries = [{
                title: label,
                subGroup: `${techniqueName} - ${section.title}`,
                description: description
            }];
            WuxWorkerManual.OpenManualWithContent(entries.concat(getEffectExplanationEntries(trueName, section.attribute, rank)));
        });
        attributeHandler.run();
    };

    // "On Enter Effects"/Enhancement header buttons (WuxGS-Backend.js's
    // listenerOpenTechniqueFixedMoreInfo) - the button points at one fixed,
    // technique-independent definition (Trait_OnEnter/Title_TechEnhancement),
    // but still renders inside each technique's own repeating row, so the
    // generator now binds it per repeater/row like openTechniqueMoreInfo above
    // instead of as a bare global attribute. That means eventinfo.sourceAttribute
    // here is the full row-qualified name (e.g. "...-XXXX_ttl-techenhancement_
    // moreinfo"), not the bare "ttl-techenhancement_moreinfo" the two fixed
    // definitions' own getVariable(_moreinfo) computes - matched with endsWith
    // rather than equality. Resets its own trigger back to "0" after dispatch,
    // same reason openTechniqueMoreInfo does - so it can be clicked again
    // without an intervening uncheck, and doesn't sit "on" for some other
    // row-touch event to pick back up later.
    const openTechniqueFixedMoreInfo = function (eventinfo) {
        if (eventinfo.newValue !== "on") {
            return;
        }
        let defs = [WuxDef.Get("Trait_OnEnter"), WuxDef.Get("Title_TechEnhancement")];
        let definition = defs.find((def) => eventinfo.sourceAttribute.endsWith(def.getVariable(WuxDef._moreinfo)));
        if (definition == undefined) {
            return;
        }
        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addUpdate(eventinfo.sourceAttribute, "0");
        attributeHandler.run();
        WuxWorkerManual.OpenManualWithDefinitions([definition.name]);
    };

    // For the three effect-type sections (Core/Check/Will Break), explains
    // every concept involved as its own clean {title, subGroup, description}
    // entry instead of one bracket-crammed string - both the definitions the
    // effect text itself is built from (Damage type, Status effects applied,
    // the skill-check/DC/Accurate/WillBreak definitions - TechniqueDisplayData.
    // getCoreEffectTooltipDefinitions/getCheckEffectTooltipDefinitions/
    // getWillBreakEffectTooltipDefinitions, WAPI-Database.js) and any
    // character stat the effect's own formula references (e.g. Jing,
    // Potency). GuideMoreInfoValues (the Manual's "MoreInfo" page) already
    // supports printing several entries at once, the same mechanism
    // openManualWithDefinitions uses for showing one status's writeup.
    // Action/Range/Traits don't have a structured (non-bracket-string)
    // equivalent yet, so they're skipped (sectionAttribute won't match any
    // branch below).
    // rank: WuxTechs.Get always returns a fresh technique at rank 0 (the base
    // data, WJS-TechDef.js) - rank is applied at runtime via setRank, never
    // baked into the lookup itself. Without re-applying the row's actual
    // current rank here, TechniqueEffect.getEffects()'s rank>1 enhancement
    // merge (WAPI-Database.js) never runs, so any stat (e.g. Potency) that
    // only enters an effect's formula through that merge - rather than being
    // in the base formula from rank 1 - silently never shows up here, even
    // though the card's own display text (built from a rank-correct technique
    // instance) shows it fine.
    const getEffectExplanationEntries = function (techniqueName, sectionAttribute, rank) {
        let technique = WuxTechs.Get(techniqueName);
        if (technique == undefined) {
            return [];
        }
        technique.setRank(rank);

        // Formula references are grabbed BEFORE constructing TechniqueDisplayData
        // below, not after - TechniqueDisplayData.setEffects (WAPI-Database.js)
        // builds enhanceEffect last, and TechniqueEffectDisplayEnhancmenteData.
        // importEffectData reassigns effect.formula in place (to the
        // enhancement's own, often-empty formula) for every effect that's both
        // check/core-gated AND enhancing (e.g. a Damage effect with
        // enhancing:"1") - a real, shared effect object mutation, not a copy.
        // Reading effect.formula fresh AFTER that constructor runs (the
        // original order here) meant this always saw the already-overwritten,
        // typically workers:[] formula instead of the real one, silently
        // dropping any stat (e.g. Potency) the base formula referenced. Once
        // captured into this array, the reference is unaffected by that later
        // reassignment on the effect object itself.
        let formulas = [];
        if (sectionAttribute == "TechCoreEffect" || sectionAttribute == "TechCheckEffect") {
            // "" = a core/free effect, "Core" = gated behind the technique's
            // skill check - same split TechniqueDisplayData.setEffects uses
            // (WAPI-Database.js) to sort effects into coreEffect vs. checkEffect.
            let wantedDefense = sectionAttribute == "TechCoreEffect" ? "" : "Core";
            technique.getEffects().iterate(function (effect) {
                if (effect.defense == wantedDefense) {
                    formulas.push(effect.formula);
                }
            });
        } else if (sectionAttribute == "TechWillBreakEffect" && technique.willBreakEffect != undefined) {
            formulas.push(technique.willBreakEffect.formula);
        }

        let displayData = new TechniqueDisplayData(technique);
        let conceptEntries = [];
        if (sectionAttribute == "TechCoreEffect") {
            conceptEntries = displayData.getCoreEffectTooltipDefinitions();
        } else if (sectionAttribute == "TechCheckEffect") {
            conceptEntries = displayData.getCheckEffectTooltipDefinitions();
        } else if (sectionAttribute == "TechWillBreakEffect" && technique.willBreakEffect != undefined) {
            conceptEntries = displayData.getWillBreakEffectTooltipDefinitions();
        }

        let definitions = new Dictionary();
        formulas.forEach(function (formula) {
            formula.workers.forEach(function (worker) {
                worker.definitionName.forEach(function (definitionName) {
                    if (definitionName == "" || definitions.has(definitionName)) {
                        return;
                    }
                    let definition = WuxDef.Get(definitionName);
                    if (definition != undefined && definition.descriptions.length > 0) {
                        definitions.add(definitionName, definition);
                    }
                });
            });
        });
        let statEntries = definitions.keys.map(function (key) {
            let definition = definitions.get(key);
            return {
                title: definition.getTitle(),
                subGroup: "Stat",
                description: definition.descriptions.filter(d => d !== "").join("\n\n")
            };
        });

        return conceptEntries.concat(statEntries);
    };

    return {
        UpdateAllActionsFromMenu: updateAllActionsFromMenu,
        UpdateAllFormeActions: updateAllFormeActions,
        UpdateJobActionsFromMenu: updateJobActionsFromMenu,
        RefreshAllFormeActions: refreshAllFormeActions,
        LoadFormeActions: loadFormeActions,
        UpdateVisibilityOfFormeActions: updateVisibilityOfFormeActions,
        UpdateFormeActionsForCRChange: updateFormeActionsForCRChange,
        RankUpTechnique: rankUpTechnique,
        RankDownTechnique: rankDownTechnique,
        SwapTechniqueVariant: swapTechniqueVariantEvent,
        RemoveAllOldStyleData: removeAllOldStyleData,
        SetCustomTechnique: setCustomTechnique,
        QuickFilterFormeActions: quickFilterFormeActions,
        ClearBaseFilters: clearBaseFilters,
        ClearBaseFilterCheckboxes: clearBaseFilterCheckboxes,
        UpdateTechniqueChangeVisibility: updateTechniqueChangeVisibility,
        TriggerBuilderActionUpdate: triggerBuilderActionUpdate,
        OnEnterActionsPage: onEnterActionsPage,
        OpenTechniqueMoreInfo: openTechniqueMoreInfo,
        OpenTechniqueFixedMoreInfo: openTechniqueFixedMoreInfo,
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
            attributeHandler.addMod([healValueVar,
                burnResVar, coldResVar, energyResVar, forceResVar, piercingResVar, psycheResVar,
                mvVar, mvDashVar, surgeDef.getVariable(), surgeDef.getVariable(WuxDef._max),
                vitalityDef.getVariable(), vitalityDef.getVariable(WuxDef._max)]);
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
            
            // grab all formulas that get modified based on techniques
            let allModifierDefs = [];
            let allModifierDefNames = new Set();
            let techniqueSetModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._techset));
            for (let item of techniqueSetModifierDefs) {
                if (!allModifierDefNames.has(item.name)) {
                    allModifierDefNames.add(item.name);
                    allModifierDefs.push(item);
                }
            }
            let techniqueModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._tech));
            for (let item of techniqueModifierDefs) {
                if (!allModifierDefNames.has(item.name)) {
                    allModifierDefNames.add(item.name);
                    allModifierDefs.push(item);
                }
            }
            let gearModifierDefs = WuxDef.Filter(new DatabaseFilterData("techMods", WuxDef._gear));
            for (let item of gearModifierDefs) {
                if (!allModifierDefNames.has(item.name)) {
                    allModifierDefNames.add(item.name);
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
                    attrHandler.addUpdate(techniqueModifierDefs[i].getVariable(WuxDef._tech, WuxDef._info), JSON.stringify([]));
                }
                for (let i = 0; i < gearModifierDefs.length; i++) {
                    attrHandler.addUpdate(gearModifierDefs[i].getVariable(WuxDef._gear), 0);
                    attrHandler.addUpdate(gearModifierDefs[i].getVariable(WuxDef._gear, WuxDef._info), JSON.stringify([]));
                }
                for (let i = 0; i < techniqueSetModifierDefs.length; i++) {
                    attrHandler.addUpdate(techniqueSetModifierDefs[i].getVariable(WuxDef._techset), 0);
                    attrHandler.addUpdate(techniqueSetModifierDefs[i].getVariable(WuxDef._techset, WuxDef._info), JSON.stringify([]));
                }
                
                // set the breakdown
                let attributeBreakdown = {};
                for (let definition of allModifierDefs) {
                    let formula = definition.formula.getBaseString();
                    let totalValue = definition.formula.getValue(attrHandler);
                    let baseValue = totalValue
                        - attrHandler.parseInt(definition.getVariable(WuxDef._perk))
                        - attrHandler.parseInt(definition.getVariable(WuxDef._tech))
                        - attrHandler.parseInt(definition.getVariable(WuxDef._gear))
                        - attrHandler.parseInt(definition.getVariable(WuxDef._techset));
                    attributeBreakdown[definition.name] = ["-- Base Calculation --", formula == baseValue ? formula : `${formula} = ${baseValue}`, ""];
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
                    variableInfo = attrHandler.parseJSON(definition.getVariable(WuxDef._perk));
                    if (variableInfo != 0) {
                        attributeBreakdown[definition.name].push("-- Perk Bonuses --");
                        attributeBreakdown[definition.name] = attributeBreakdown[definition.name].concat([`${variableInfo}`, ""]);
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
            Swift: 0,
            Assist: 1,
            Quick: 2,
            Full: 3,
            Reaction: 4,
            Brief:5,
            Short:6,
            Long:7,
            Passive:8
        };

        const entries = this.getEntries(techDictionary);

        // Sort them
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
class FormeTechniqueDatabaseBase {
    constructor(attributeHandler) {
        this.techDictionary = new Dictionary();
        this.sortList = [];
        this.endSortList = [];
        this.filters = 0;

        this.formeActionsRepeaterId = "RepeatingFormeTech";
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attributeHandler, "Action");
        attributeHandler.addRepeatingSection(this.formeActionsRepeaterId);
        attributeHandler.getRepeatingSection(this.formeActionsRepeaterId).addFieldNames([
            techniqueAttributeHandler.getVariable("TechTrueName"),
            techniqueAttributeHandler.getVariable("TechName", WuxDef._max),
            techniqueAttributeHandler.getVariable("TechActionType", WuxDef._max),
            // Computed-character-CR piggyback (getComputedCharacterCR/setComputedCharacterCR,
            // WJS-Service.js) - must be listed here or .run() never fetches it and the
            // CR-gate in updateRepeaterTechniqueDisplayInfo always reads "undefined".
            techniqueAttributeHandler.getVariable("TechActionType")
        ]);
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
            } else {
                this.endSortList.push(id);
            }
        }
    }
    // Collects every stat any currently-known technique's own effect formulas
    // reference (each effect plus its willBreakEffect, if any) and addMod's
    // them onto characterAttrHandler - must run after registerTechDictionary
    // populates techDictionary, since which techniques (and therefore which
    // stats) are involved isn't known any earlier. characterAttrHandler is a
    // separate WorkerAttributeHandler/round-trip from the one writing the
    // repeater's own fields (mirrors the nested-attributeHandler pattern
    // already used elsewhere, e.g. Worker-InspectPopup.js's getTargetData) -
    // it's only ever read from (FormulaData.getCharacterString), never
    // written to, so it doesn't need to share a fetch cycle with the writer.
    addCharacterFormulaAttributes(characterAttrHandler) {
        let attributes = [WuxDef.GetVariable("CR")];
        Object.values(this.techDictionary.values).forEach((techData) => {
            if (techData.isHeader) {
                return;
            }
            let technique = techData.technique;
            technique.getEffects().iterate((effect) => {
                attributes = attributes.concat(effect.formula.getAttributes());
            });
            if (technique.willBreakEffect != undefined) {
                attributes = attributes.concat(technique.willBreakEffect.formula.getAttributes());
            }
            attributes = attributes.concat(this.getSkillCheckAttributes(technique));
        });
        characterAttrHandler.addMod(attributes);
    }
    // Mirrors TechniqueDisplayData.printSkillCheck's parsing of technique.skill
    // (WAPI-Database.js) just far enough to know which live attribute(s) its
    // "Skill:value"/"Any Group:value" text will read - a "group" check needs
    // every skill in that subGroup pre-fetched, since printSkillCheck itself
    // takes the highest of them (same as an actual roll would, see
    // WAPI-Combat.js's getGroupSkillCheck).
    getSkillCheckAttributes(technique) {
        if (technique.skill == "") {
            return [];
        }
        let skillData = technique.skill.split(":");
        skillData[0] = skillData[0].trim();
        if (skillData.length > 1) {
            if (skillData[1] == "group") {
                return WuxDef.GetGroupVariables(new DatabaseFilterData("subGroup", skillData[0]));
            }
            else if (skillData[1] == "attr") {
                return [WuxDef.GetVariable(Format.GetDefinitionName("Attribute", skillData[0]))];
            }
        }
        return [WuxDef.GetVariable(Format.GetDefinitionName("Skill", skillData[0]))];
    }
    // characterAttrHandler (optional): passed through to setTechniqueInfo
    // (WJS-Service.js) so FormeTechniques' own effect text can show live stat
    // values instead of generic bracket text - see addCharacterFormulaAttributes
    // above and updateAllActions below for how it gets built and threaded in.
    updateDataAndVisibilityOfRepeaterTechniques(attrHandler, characterAttrHandler, forceRebuild) {
        let formeTechDatabase = this;
        this.iterateRepeaterTechniques(attrHandler, function (techniqueAttributeHandler, techniqueName, repeater, id) {
            if (formeTechDatabase.tryUpdateRepeaterTechniqueDisplayInfoSet(techniqueAttributeHandler, techniqueName, repeater, id, characterAttrHandler, forceRebuild)) {
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
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
        techniqueAttributeHandler.setRepeaterData(repeater);
        repeater.iterate((id) => {
            techniqueAttributeHandler.setId(id);
            let techniqueName = techniqueAttributeHandler.getTechniqueName();
            callback(techniqueAttributeHandler, techniqueName, repeater, id);
        });
    }
    tryUpdateRepeaterTechniqueDisplayInfoSet(techniqueAttributeHandler, techniqueName, repeater, id, characterAttrHandler, forceRebuild) {
        if (!this.techDictionary.has(techniqueName)) {
            Debug.Log(`Removing ${techniqueName} because it no longer exists in this kit.`);
            repeater.removeId(id);
            return false;
        }
        let techniqueData = this.techDictionary.get(techniqueName);
        if (techniqueData.isSet) {
            repeater.removeId(id);
            return false;
        }
        return this.tryUpdateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName, characterAttrHandler, forceRebuild);
    }
    tryUpdateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName, characterAttrHandler, forceRebuild) {
        if (this.techDictionary.has(techniqueName)) {
            this.updateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName, characterAttrHandler, forceRebuild);
            return true;
        }
        return false;
    }
    updateRepeaterTechniqueDisplayInfo(techniqueAttributeHandler, techniqueName, characterAttrHandler, forceRebuild) {
        let techniqueData = this.techDictionary.get(techniqueName);
        if (techniqueData.isHeader) {
            techniqueAttributeHandler.setHeaderInfo(techniqueName, techniqueData.headerText);
            this.techDictionary.get(techniqueName).isSet = true;
            this.setRepeaterTechniqueVisibility(techniqueAttributeHandler, techniqueName);
            return;
        }
        let techVersion = techniqueAttributeHandler.getTechniqueVersion();
        let technique = techniqueData.technique;
        technique.rank = techniqueData.techniqueRank;
        let variantOptions = {excludeCurrent: true, userAffinities: this.userAffinities};
        // Rebuild on a CR change too, not just a technique data version bump -
        // the character-aware effect text (FormulaData.getCharacterString)
        // depends on live stats that a CR change can affect (e.g. Potency),
        // and nothing else about this gate would otherwise notice that.
        let currentCR = characterAttrHandler != undefined
            ? characterAttrHandler.parseString(WuxDef.GetVariable("CR"))
            : undefined;
        let storedCR = techniqueAttributeHandler.getComputedCharacterCR();
        // forceRebuild is a mutable holder ({value: bool}, not a plain boolean) -
        // WJS-Advancement.js's finishBuild passes it in before attributeHandler.run()
        // has executed, and only sets .value once its own callback (registered right
        // after the Skill/Attribute build-point commit) actually runs during that same
        // cycle. Reading .value here, rather than a snapshotted boolean, is what lets
        // that later-set value reach this gate correctly.
        let forcedRebuild = forceRebuild != undefined && forceRebuild.value;
        if (technique.version != techVersion || (characterAttrHandler != undefined && storedCR != currentCR) || forcedRebuild) {
            Debug.Log(`Updating ${techniqueName} as it has a new version (${technique.version} != ${techVersion}), CR changed (${storedCR} != ${currentCR}), or a rebuild was forced (${forcedRebuild})`);
            techniqueAttributeHandler.setTechniqueInfo(technique, true, variantOptions, characterAttrHandler);
            if (characterAttrHandler != undefined) {
                techniqueAttributeHandler.setComputedCharacterCR(currentCR);
            }
        } else {
            if (Object.keys(technique.enhancementEffects).length > 0) {
                techniqueAttributeHandler.setTechniqueRankButtons(technique);
            }
            // Variant buttons are newer than this version-gate check, so rows loaded
            // before the feature existed still need this populated even though nothing
            // else about their display has changed.
            techniqueAttributeHandler.setTechniqueVariants(technique, variantOptions);
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
    addMissingTechniques(attrHandler, maxLoadCount, characterAttrHandler) {
        let unsetBaseTechniqueData = this.getUnsetTechniqueData();
        let repeater = attrHandler.getRepeatingSection(this.formeActionsRepeaterId);
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
        techniqueAttributeHandler.setRepeaterData(repeater);
        if (maxLoadCount == undefined) {
            maxLoadCount = unsetBaseTechniqueData.length;
        }

        let i = 0;
        while(i < maxLoadCount) {
            if (unsetBaseTechniqueData.length <= 0) {
                break;
            }
            let id = repeater.generateRowId();
            techniqueAttributeHandler.setId(id);
            this.tryUpdateRepeaterTechniqueDisplayInfoSet(techniqueAttributeHandler, unsetBaseTechniqueData[0].technique.name, repeater, id, characterAttrHandler);
            this.setSortId(unsetBaseTechniqueData[0].technique.name, id);
            unsetBaseTechniqueData.splice(0, 1);
            i++;
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Action_FormeLoadCount"), Math.max(unsetBaseTechniqueData.length, 0));
        let remainingNames = unsetBaseTechniqueData.map(data => data.technique.name);
        attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._db), JSON.stringify(remainingNames));
    }
    getUnsetTechniqueData() {
        Debug.Log(this.techDictionary);
        return Object.values(this.techDictionary.values).filter(v => !v.isSet);
    }
    // Immediately adds every unset technique belonging to a single job's kit (technique.style === jobName),
    // instead of waiting for the generic one-at-a-time builder queue to eventually reach them. Boosters are
    // already registered for these by the time this runs, since registerTechDictionary must be called first.
    addMissingJobTechniques(attrHandler, jobName, characterAttrHandler) {
        let unsetBaseTechniqueData = this.getUnsetTechniqueData();
        let jobTechniqueData = unsetBaseTechniqueData.filter((techData) => !techData.isHeader && techData.technique.style === jobName);

        let repeater = attrHandler.getRepeatingSection(this.formeActionsRepeaterId);
        let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
        techniqueAttributeHandler.setRepeaterData(repeater);

        jobTechniqueData.forEach((techData) => {
            let id = repeater.generateRowId();
            techniqueAttributeHandler.setId(id);
            this.tryUpdateRepeaterTechniqueDisplayInfoSet(techniqueAttributeHandler, techData.technique.name, repeater, id, characterAttrHandler);
            this.setSortId(techData.technique.name, id);
        });

        let remaining = this.getUnsetTechniqueData();
        attrHandler.addUpdate(WuxDef.GetVariable("Action_FormeLoadCount"), Math.max(remaining.length, 0));
        let remainingNames = remaining.map(data => data.technique.name);
        attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._db), JSON.stringify(remainingNames));
    }
}

class FormeTechniqueDatabase extends FormeTechniqueDatabaseBase {
    constructor(attributeHandler, filters) {
        super(attributeHandler);
        this.techSorter = new FormeTechniqueSort();
        this.userAffinities = "";
        this.userCr = 0;

        if (Array.isArray(filters)) {
            let filteredTechs = WuxTechs.Filter(filters);
            this.filters = [];
            filteredTechs.forEach((technique) => {
                this.filters.push(technique.name);
            });
            Debug.Log(`Filtering with: ${JSON.stringify(filters)}
            Filtered Techniques: ${JSON.stringify(this.filters)}`);
        }

        this.boosterFieldName = WuxDef.GetVariable("BoostStyleTech");
        attributeHandler.addMod(this.boosterFieldName);
        attributeHandler.addMod(WuxDef.GetVariable("CR"));

        this.setFormeSlotsDefinitionData();
        this.addFormeSlotVariables(attributeHandler);
        this.jobSlotVariable = WuxDef.GetVariable("Forme_JobSlot");
        attributeHandler.addMod(this.jobSlotVariable);

        this.equippedSlots = [];
        attributeHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry")]);
        attributeHandler.addMod([WuxDef.GetVariable("BoostStyleTech"), WuxDef.GetVariable("BoostGearTech"), WuxDef.GetVariable("BoostPerkTech")]);
        attributeHandler.addMod([WuxDef.GetVariable("FullName")]);
        attributeHandler.addMod([WuxDef.GetVariable("Perk_Spirit Conduit")]);

        this.jobWorker = new WuxJobWorkerBuild();
        attributeHandler.addMod(this.jobWorker.attrBuildDraft);

        this.styleWorker = new WuxStyleWorkerBuild();
        attributeHandler.addMod(this.styleWorker.attrBuildDraft);

        this.perkWorker = new WuxPerkWorkerBuild();
        attributeHandler.addMod(this.perkWorker.attrBuildDraft);

        this.gearBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);
        this.gearBuildMaxVar = WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max);
        attributeHandler.addMod(this.gearBuildVar);
        attributeHandler.addMod(this.gearBuildMaxVar);
        this.gearEquipBuild = [];
        this.gearEquipBuildMax = [];

        this.equippedItemTraitsVar = WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max);
        attributeHandler.addMod(this.equippedItemTraitsVar);
        this.equippedItemTraits = [];
    }
    setFormeSlotsDefinitionData() {
        this.formeDefinitions = [
            {
                mainDef: WuxDef.Get("Forme_StyleSlot"),
                max: parseInt(WuxDef.Get("Forme_StyleSlotCount").formula.getValue()),
                countDef: WuxDef.Get("StyleSlots")
            },
            {
                mainDef: WuxDef.Get("Gear_EquipmentSlot"),
                max: parseInt(WuxDef.Get("EquipmentSlots").formula.getValue()),
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
        
        let advancedAffinityRaw = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity"));
        let advancedAffinities = advancedAffinityRaw.split(";").map(s => s.trim()).filter(s => s !== "");
        this.userAffinities = [
            attrHandler.parseString(WuxDef.GetVariable("Affinity")),
            ...advancedAffinities,
            attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
        ];
        
        this.equippedSlots = [];
        this.equippedSlots.push(attrHandler.parseString(this.jobSlotVariable));
        for (let slot of this.formeDefinitions) {
            let count = attrHandler.parseInt(slot.countDef.getVariable());
            for (let i = 1; i <= count; i++) {
                this.equippedSlots.push(attrHandler.parseString(slot.mainDef.getVariable(i)));
            }
        }

        let gearBuildRaw = attrHandler.parseString(this.gearBuildVar);
        try { this.gearEquipBuild = JSON.parse(gearBuildRaw); } catch (e) {}
        if (!Array.isArray(this.gearEquipBuild)) this.gearEquipBuild = [];

        let gearBuildMaxRaw = attrHandler.parseString(this.gearBuildMaxVar);
        try { this.gearEquipBuildMax = JSON.parse(gearBuildMaxRaw); } catch (e) {}
        if (!Array.isArray(this.gearEquipBuildMax)) this.gearEquipBuildMax = [];

        let equippedItemTraitsRaw = attrHandler.parseString(this.equippedItemTraitsVar);
        try { this.equippedItemTraits = JSON.parse(equippedItemTraitsRaw); } catch (e) {}
        if (!Array.isArray(this.equippedItemTraits)) this.equippedItemTraits = [];
    }

    registerTechDictionary(attrHandler) {
        let formeTechDatabase = this;
        attrHandler.addUpdate(formeTechDatabase.boosterFieldName, "[]");
        formeTechDatabase.addAllBasicTechniques();
        formeTechDatabase.learnedJobStyleNames = new Set(formeTechDatabase.jobWorker.getStyles().map(s => s.style.name));
        formeTechDatabase.iterateAllTechniquesFromLearnedStyles(function (technique, techniqueRank) {
            let newEntry = formeTechDatabase.tryAddTechniqueToTechDictionary(technique, techniqueRank);
            if (newEntry != undefined && newEntry.isActive) {
                WuxWorkerActionsService.TryAddTechniqueToBoosters(attrHandler, technique, formeTechDatabase.boosterFieldName);
            }
        });
        formeTechDatabase.addGearItemTechniques(attrHandler);
        this.techSorter.getSortOrder("Action", formeTechDatabase.techDictionary);
        this.updateHeaderDictionary();
        this.sortList = [this.techSorter.listSize];
        WuxWorkerActionsService.SetTechniqueBoosters(attrHandler);
    }
    updateHeaderDictionary() {
        let visibleEntries = Object.entries(this.techDictionary.values)
            .filter(([, v]) => v.isVisible && !v.isHeader)
            .sort((a, b) => a[1].sortOrder - b[1].sortOrder);

        let sectionsWithVisibleMembers = new Set();
        let lastSectionName = undefined;
        let offset = 0;
        visibleEntries.forEach(([, techniqueData]) => {
            let sectionName = techniqueData.technique.action || "Other";
            sectionsWithVisibleMembers.add(sectionName);
            if (sectionName != lastSectionName) {
                let headerKey = `__Header_${sectionName}__`;
                this.techDictionary.add(headerKey, {
                    technique: {name: headerKey},
                    techniqueRank: 0,
                    isSet: false,
                    isActive: true,
                    isVisible: true,
                    isHeader: true,
                    headerText: sectionName,
                    sortOrder: techniqueData.sortOrder + offset
                });
                offset++;
                lastSectionName = sectionName;
            }
            techniqueData.sortOrder += offset;
        });
        this.techSorter.listSize += offset;

        // A section can have active members in the kit that are all currently filtered out,
        // leaving it with zero visible members. Explicitly register a hidden header for those
        // too, so an existing header row gets hidden via the same isVisible toggle every other
        // technique row already relies on, instead of depending on the row-removal cleanup path.
        let allSections = new Set();
        Object.values(this.techDictionary.values).forEach(v => {
            if (v.isHeader || !v.isActive) return;
            allSections.add(v.technique.action || "Other");
        });
        allSections.forEach(sectionName => {
            if (sectionsWithVisibleMembers.has(sectionName)) return;
            let headerKey = `__Header_${sectionName}__`;
            this.techDictionary.add(headerKey, {
                technique: {name: headerKey},
                techniqueRank: 0,
                isSet: false,
                isActive: true,
                isVisible: false,
                isHeader: true,
                headerText: sectionName,
                sortOrder: -1
            });
        });
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
        let allStyleTechniques = this.styleWorker.getAllStyleTechniqueData();
        for (const key in allStyleTechniques) {
            let techniqueData = allStyleTechniques[key];
            callback(techniqueData.technique, techniqueData.rank);
        }
        let allJobsArray = this.jobWorker.getStyles();
        allJobsArray.forEach((styleData) => {
            let filteredTechs = WuxTechs.Filter(new DatabaseFilterData("style", styleData.style.name));
            filteredTechs.forEach(tech => callback(tech, 1));
        });
        let allPerkTechniques = this.perkWorker.getPerkTechniques();
        allPerkTechniques.forEach((technique) => {
            callback(technique, 1);
        });
    }
    // A base technique and its variants (see getRootName()) are now shown as a single
    // row with buttons to switch between them, so only the root ever needs its own
    // dictionary entry - redirect here rather than at every caller.
    tryAddTechniqueToTechDictionary(technique, techniqueRank) {
        let rootTechnique = WuxTechs.Get(technique.getRootName());
        if (!this.techDictionary.has(rootTechnique.name)) {
            let isActive = this.checkTechniqueIsActive(rootTechnique);
            let newEntry = this.createTechDictionaryTechnique(rootTechnique, techniqueRank, isActive);
            this.techDictionary.add(rootTechnique.name, newEntry);
            return newEntry;
        }
        return undefined;
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

        if (this.learnedJobStyleNames) {
            let techSetParts = technique.techSet.split(";").map(s => s.trim());
            let isJobTechnique = techSetParts.some(part => this.learnedJobStyleNames.has(part));
            if (isJobTechnique && !this.checkTechniqueIsEquipped(technique, technique.techSet)) {
                return false;
            }
        }

        if (!this.checkTechniqueItemTraits(technique)) {
            return false;
        }

        return true;
    }
    checkTechniqueItemTraits(technique) {
        if (!technique.itemTraits || technique.itemTraits === "") return true;
        let requiredTraits = technique.itemTraits.split(";").map(s => s.trim()).filter(s => s !== "");
        if (requiredTraits.length === 0) return true;
        return requiredTraits.every(traitKey => {
            let def = WuxDef.Get(traitKey);
            if (def == undefined) return false;
            return this.equippedItemTraits.includes(def.getTitle());
        });
    }
    addGearItemTechniques(attrHandler) {
        let gearEquipSet = new Set(this.gearEquipBuild);
        this.gearEquipBuildMax.forEach(itemName => {
            let item = WuxItems.Get(itemName);
            if (item == undefined) return;
            let isEquipped = gearEquipSet.has(itemName);
            if (item.hasTechnique && item.technique != undefined) {
                this.tryAddGearTechniqueToTechDictionary(item.technique, isEquipped);
            }
            // Common techniques can themselves be a base with variants (e.g. "Quick Aid"
            // has "Dress Wound"/"Surge Healing" under techSet "Quick Aid"), but a base and
            // its variants now share one row with buttons to switch between them, so
            // tryAddGearTechniqueToTechDictionary's own root redirect is all that's needed -
            // no separate variant expansion here.
            let commonTechniques = item.getCommonTechniques ? item.getCommonTechniques() : [];
            commonTechniques.forEach(technique => {
                this.tryAddGearTechniqueToTechDictionary(technique, isEquipped);
            });
        });

        // Add one booster entry per equipped copy so passive boosts stack with duplicate equipment.
        let newGearBoosters = [];
        this.gearEquipBuild.forEach(itemName => {
            let item = WuxItems.Get(itemName);
            if (item == undefined || !item.hasTechnique || item.technique == undefined) return;
            if (item.technique.action == "Passive") {
                newGearBoosters.push(itemName);
            }
        });
        attrHandler.addUpdate(WuxDef.GetVariable("BoostGearTech"), JSON.stringify(newGearBoosters));
    }

    // Same deduplication as tryAddTechniqueToTechDictionary - a variant collapses to
    // its base's own entry rather than getting a row of its own.
    tryAddGearTechniqueToTechDictionary(technique, isEquipped) {
        let rootTechnique = WuxTechs.Get(technique.getRootName());
        if (rootTechnique == undefined) {
            return;
        }
        if (!this.techDictionary.has(rootTechnique.name)) {
            let isVisible = isEquipped && this.checkTechniqueIsVisibleInFilter(rootTechnique) && this.checkTechniqueItemTraits(rootTechnique);
            this.techDictionary.add(rootTechnique.name, {
                technique: rootTechnique,
                techniqueRank: 1,
                isSet: false,
                isActive: true,
                isVisible: isVisible,
                sortOrder: -1
            });
        }
    }
}