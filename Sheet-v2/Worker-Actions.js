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

        clearBaseFilterCheckboxes = function (attributeHandler) {
            let allBaseFilters = getBaseFilterLeafDefinitions();
            allBaseFilters.forEach(def => attributeHandler.addUpdate(def.getVariable(), 0));
        },

        // Shared tail end of every filter-selection path (a fixed preset, a
        // custom filter, or a brand-new custom filter's initial "everything
        // visible" list) - reads the technique-name list straight out of
        // already-computed data instead of recomputing it via WuxTechs.Filter,
        // and skips the loading screen entirely (unlike
        // updateAllActionsFromMenu's LoadingScreenHandler usage) since reading
        // precomputed data is fast enough not to need one. filterNames ==
        // undefined clears the filter outright (this.filters == 0, "All"),
        // leaving only the job/CR-based restrictions FormeTechniqueDatabase
        // already applies independent of any filter. Always builds its own
        // fresh WorkerAttributeHandler rather than accepting the caller's -
        // every caller reaches this from inside its own already-fired
        // addGetAttrCallback, and AttributeHandler's getCallbacks/
        // finishCallbacks arrays are never cleared between .run() calls, so
        // reusing that same handler here would re-queue and re-fire the
        // caller's own callback on this function's own nested .run(),
        // cascading into a runaway recursive loop that never reaches
        // setAttrsAsync - exactly what was silently blocking every filter
        // switch. Callers that need to bundle their own writes (clearing the
        // previous selection's flag, etc.) do so on their own handler and
        // call this afterward instead, as a separate round trip.
        applyTechniqueFilterNames = function (filterNames) {
            let attributeHandler = new WorkerAttributeHandler();
            let filterVariable = WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter);
            attributeHandler.addUpdate(filterVariable, JSON.stringify(filterNames != undefined ? filterNames : 0));

            // Any filter application (a real switch, or the tail end of
            // finishing an edit) always leaves edit mode fully off - "if the
            // player swaps to any other filter, immediately exit edit mode".
            // This is also wuxFilterEditMode-flag's own value
            // (buildCustomFilterDetails/buildFilterEditModeSection), so it
            // un-hides the Edit button and re-hides the Filter Edit Mode
            // section too.
            let editDef = WuxDef.Get("Forme_EditFilter");
            attributeHandler.addUpdate(editDef.getVariable(), "0");

            let formeTech = new FormeTechniqueDatabase(attributeHandler, filterNames);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                formeTech.setupPostGetAttr(attrHandler);
                formeTech.registerTechDictionary(attrHandler);
                formeTech.updateVisibilityOfRepeaterTechniques(attrHandler);
                // Every technique's own row reverts from Hide/Show back to
                // the normal rank buttons - "all techniques should swap back
                // to their normal display method".
                formeTech.setFilterEditMode(attrHandler, false);
            });
            attributeHandler.addFinishCallback(function () {
                formeTech.setSortOrder();
            });
            attributeHandler.run();
        },

        // The Techniques section's All/Basic Actions/Basic Social/Job + Style
        // radio buttons (GoogleSheets/WuxGS-Base.js's buildFilterPresetButtons)
        // - reads the technique-name list straight out of the persisted
        // FormeTechniqueFilterPresets JSON (FilterPresets attribute, written by
        // FormeTechniqueDatabase.updateFilterPresets).
        applyTechniqueFilterPreset = function (eventinfo) {
            let presetName = eventinfo.newValue;
            let presetsVariable = WuxDef.GetVariable("Action_FormeTechniques", "FilterPresets");
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod([presetsVariable, customFilterIdVariable]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterNames;
                if (presetName !== "All") {
                    let presets = attrHandler.parseJSON(presetsVariable) || {};
                    let preset = presets[presetName];
                    filterNames = preset != undefined ? preset.TechniquesThatAreVisible : [];
                }

                // Picking a fixed preset deselects whatever custom filter was
                // active - only the one row remembered by
                // customFilterIdVariable ever needs clearing (mirrors
                // Worker-Chat.js's selectOutfitWithData).
                let selectedCustomFilterId = attrHandler.parseString(customFilterIdVariable);
                if (selectedCustomFilterId !== "0") {
                    let customFilterRepeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
                    let selectField = WuxDef.GetVariable("Forme_CustomFilterName", WuxDef._learn);
                    attrHandler.addUpdate(customFilterRepeater.getFieldName(selectedCustomFilterId, selectField), "0");
                    attrHandler.addUpdate(customFilterIdVariable, "0");
                }

                applyTechniqueFilterNames(filterNames);
            });
            attributeHandler.run();
        },

        // Marks customFilterId as the selected filter (deselecting whatever
        // custom filter was previously active, same one-row-only clearing as
        // applyTechniqueFilterPreset's own deselect) and applies filterNames.
        // Also clears the fixed presets' own radio value - none of their
        // static values will ever match a row id anyway, so this alone
        // already shows none of them selected, but writing it explicitly
        // means the stored value never lingers as a stale preset name.
        // Shared by both a real click (selectTechFilter) and a brand-new
        // filter's auto-select (addTechFilter).
        selectTechFilterWithData = function (newSelectionId, filterNames) {
            let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
            let selectField = WuxDef.GetVariable("Forme_CustomFilterName", WuxDef._learn);
            let nameField = WuxDef.GetVariable("Forme_CustomFilterName");
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");
            let filterPresetVariable = WuxDef.GetVariable("Action_FormeTechniques", "FilterPreset");
            let selectedNameVariable = WuxDef.GetVariable("Forme_CustomFilterName", "Selected");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod([customFilterIdVariable, repeater.getFieldName(newSelectionId, nameField)]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let previousId = attrHandler.parseString(customFilterIdVariable);
                if (previousId !== "0" && previousId !== newSelectionId) {
                    attrHandler.addUpdate(repeater.getFieldName(previousId, selectField), "0");
                }
                attrHandler.addUpdate(repeater.getFieldName(newSelectionId, selectField), "on");
                attrHandler.addUpdate(customFilterIdVariable, newSelectionId);
                attrHandler.addUpdate(filterPresetVariable, "0");
                // Custom Filter Details' own name field is a separate,
                // non-repeating copy (buildCustomFilterDetails) - keep it in
                // sync with whichever row is now selected.
                attrHandler.addUpdate(selectedNameVariable, attrHandler.parseString(repeater.getFieldName(newSelectionId, nameField)));
                applyTechniqueFilterNames(filterNames);
            });
            attributeHandler.run();
        },

        // A custom filter row's own "select this filter" checkbox
        // (GoogleSheets/WuxGS-Base.js's buildFilterPresetButtons, bound across
        // every RepeatingTechFilters row by WuxGS-Backend.js's
        // listenerSelectTechFilter). No eventinfo.newValue guard, same as
        // RepeatingOutfits' own selectOutfit - both checking and unchecking
        // this row's control are fine to treat as "select this filter".
        selectTechFilter = function (eventinfo) {
            let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
            let newSelectionId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let filterDataVar = WuxDef.GetVariable("Forme_FilterData");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(repeater.getFieldName(newSelectionId, filterDataVar));
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let filterNames;
                try {
                    filterNames = JSON.parse(attrHandler.parseString(repeater.getFieldName(newSelectionId, filterDataVar)));
                } catch (e) {}
                if (!Array.isArray(filterNames)) {
                    filterNames = [];
                }
                selectTechFilterWithData(newSelectionId, filterNames);
            });
            attributeHandler.run();
        },

        // Title_AddTechFilter (GoogleSheets/WuxGS-Base.js's
        // buildFilterPresetButtons, styled like the Emotes section's Add
        // Outfit button) - creates a new RepeatingTechFilters row starting
        // with every technique the character currently has visible (per
        // spec), defaults its name to "Custom Filter <count>" (count
        // includes the new row itself - the first one made is "Custom
        // Filter 1"), and selects it immediately. getIds is needed first
        // just to count the existing rows before generateRowId adds one
        // more to that same list.
        addTechFilter = function () {
            Debug.Log("Adding Custom Filter");
            let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
            repeater.getIds(function (repeater) {
                let existingCount = repeater.ids.length;
                let newId = repeater.generateRowId();
                let defaultName = `Custom Filter ${existingCount + 1}`;
                let nameVar = WuxDef.GetVariable("Forme_CustomFilterName");
                let filterDataVar = WuxDef.GetVariable("Forme_FilterData");
                // Every technique this filter has ever been offered -
                // piggybacked onto Forme_FilterData's own max slot, same
                // convention as Forme_EditFilter/Forme_Hide's max-slot flags
                // elsewhere in this feature.
                let knownDataVar = WuxDef.GetVariable("Forme_FilterData", WuxDef._max);

                let attributeHandler = new WorkerAttributeHandler();
                let formeTech = new FormeTechniqueDatabase(attributeHandler);
                let allTechniqueNames = [];
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    formeTech.setupPostGetAttr(attrHandler);
                    formeTech.registerTechDictionary(attrHandler);
                    allTechniqueNames = Object.entries(formeTech.techDictionary.values)
                        .filter(([, techData]) => !techData.isHeader)
                        .map(([name]) => name);

                    attrHandler.addUpdate(repeater.getFieldName(newId, nameVar), defaultName);
                    attrHandler.addUpdate(repeater.getFieldName(newId, filterDataVar), JSON.stringify(allTechniqueNames));
                    // Everything's included by default, so everything's
                    // already "known" too - updateCustomFilters() only
                    // needs to onboard techniques the character learns
                    // after this point.
                    attrHandler.addUpdate(repeater.getFieldName(newId, knownDataVar), JSON.stringify(allTechniqueNames));
                    // Custom Filter Details is now its own collapsible
                    // section (WuxGS-Base.js's buildCustomFilterDetails) -
                    // force it back open on every new filter, even if the
                    // player collapsed it while looking at an earlier one,
                    // so the filter they just created is immediately visible.
                    attrHandler.addUpdate(WuxDef.GetVariable("Title_CustomFilterDetails", WuxDef._expand), "0");
                });
                attributeHandler.addFinishCallback(function () {
                    formeTech.setSortOrder();
                    selectTechFilterWithData(newId, allTechniqueNames);
                });
                attributeHandler.run();
            });
        },

        // Custom Filter Details' own name text input (buildCustomFilterDetails,
        // a non-repeating live copy of whichever row is selected) - writes
        // the new value back into that one row's real Forme_CustomFilterName.
        renameTechFilter = function (eventinfo) {
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");
            let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
            let nameVar = WuxDef.GetVariable("Forme_CustomFilterName");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(customFilterIdVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let customFilterId = attrHandler.parseString(customFilterIdVariable);
                if (customFilterId === "0") {
                    return;
                }
                attrHandler.addUpdate(repeater.getFieldName(customFilterId, nameVar), eventinfo.newValue);
            });
            attributeHandler.run();
        },

        // Forme_DeleteFilter (Custom Filter Details) - removes the selected
        // row outright and falls back to "All", same shape as
        // applyTechniqueFilterPreset's own "All" branch.
        deleteTechFilter = function () {
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(customFilterIdVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let customFilterId = attrHandler.parseString(customFilterIdVariable);
                if (customFilterId === "0") {
                    return;
                }
                let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
                repeater.removeId(customFilterId);

                attrHandler.addUpdate(customFilterIdVariable, "0");
                let filterPresetVariable = WuxDef.GetVariable("Action_FormeTechniques", "FilterPreset");
                attrHandler.addUpdate(filterPresetVariable, "All");
                applyTechniqueFilterNames(undefined);
            });
            attributeHandler.run();
        },

        // Forme_EditFilter (Custom Filter Details) - the button itself is
        // hidden once edit mode starts (buildFilterEditModeSection takes its
        // place), so this checkbox only ever gets checked, never unchecked
        // by the user - "finish" is Forme_FinishFilter's own separate button
        // now (finishTechFilter). Only reachable while a custom filter is
        // actually selected - the button itself is inside
        // buildCustomFilterDetails, which is hidden otherwise.
        editTechFilter = function () {
            enterTechFilterEditMode();
        },

        // Reads the selected custom filter's own Forme_FilterData, then
        // builds a full FormeTechniqueDatabase (needed for
        // setFilterEditMode's row iteration) and marks every technique in
        // edit mode against that filter's current contents.
        enterTechFilterEditMode = function () {
            Debug.Log("Entering Custom Filter Edit Mode");
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(customFilterIdVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let customFilterId = attrHandler.parseString(customFilterIdVariable);
                if (customFilterId === "0") {
                    return;
                }

                let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
                let filterDataVar = WuxDef.GetVariable("Forme_FilterData");
                let attributeHandler2 = new WorkerAttributeHandler();
                attributeHandler2.addMod(repeater.getFieldName(customFilterId, filterDataVar));
                attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                    let filterNames;
                    try {
                        filterNames = JSON.parse(attrHandler2.parseString(repeater.getFieldName(customFilterId, filterDataVar)));
                    } catch (e) {}
                    if (!Array.isArray(filterNames)) {
                        filterNames = [];
                    }

                    let attributeHandler3 = new WorkerAttributeHandler();
                    let formeTech = new FormeTechniqueDatabase(attributeHandler3);
                    attributeHandler3.addGetAttrCallback(function (attrHandler3) {
                        formeTech.setupPostGetAttr(attrHandler3);
                        // true - every owned technique gets sectioned, not
                        // just the ones currently eligible/visible, since
                        // Filter Edit Mode is about to force them all
                        // visible below.
                        formeTech.registerTechDictionary(attrHandler3, true);
                        // Writes each row's real sortId/header placement
                        // from the techDictionary just built above - without
                        // this, setSortOrder() (the finish callback below)
                        // has nothing to apply and today's sort silently
                        // reverts to whatever order the section was in
                        // before edit mode was entered.
                        formeTech.updateVisibilityOfRepeaterTechniques(attrHandler3);
                        formeTech.setFilterEditMode(attrHandler3, true, filterNames);
                    });
                    attributeHandler3.addFinishCallback(function () {
                        formeTech.setSortOrder();
                    });
                    attributeHandler3.run();
                });
                attributeHandler2.run();
            });
            attributeHandler.run();
        },

        // Ends edit mode by re-applying whichever filter is actually active
        // (a custom filter if CustomFilterId is set, otherwise the fixed
        // preset named by FilterPreset) - applyTechniqueFilterNames's own
        // tail already clears edit mode/resets the button label as a side
        // effect of applying any filter, so this only needs to resolve which
        // filterNames to apply.
        finishTechFilter = function () {
            let filterPresetVariable = WuxDef.GetVariable("Action_FormeTechniques", "FilterPreset");
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");
            let presetsVariable = WuxDef.GetVariable("Action_FormeTechniques", "FilterPresets");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod([filterPresetVariable, customFilterIdVariable, presetsVariable]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let customFilterId = attrHandler.parseString(customFilterIdVariable);
                if (customFilterId !== "0") {
                    let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
                    let filterDataVar = WuxDef.GetVariable("Forme_FilterData");
                    let attributeHandler2 = new WorkerAttributeHandler();
                    attributeHandler2.addMod(repeater.getFieldName(customFilterId, filterDataVar));
                    attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                        let filterNames;
                        try {
                            filterNames = JSON.parse(attrHandler2.parseString(repeater.getFieldName(customFilterId, filterDataVar)));
                        } catch (e) {}
                        if (!Array.isArray(filterNames)) {
                            filterNames = [];
                        }
                        applyTechniqueFilterNames(filterNames);
                    });
                    attributeHandler2.run();
                    return;
                }

                let presetName = attrHandler.parseString(filterPresetVariable);
                let filterNames;
                if (presetName !== "All" && presetName !== "0") {
                    let presets = attrHandler.parseJSON(presetsVariable) || {};
                    let preset = presets[presetName];
                    filterNames = preset != undefined ? preset.TechniquesThatAreVisible : [];
                }
                applyTechniqueFilterNames(filterNames);
            });
            attributeHandler.run();
        },

        // Forme_Hide/Forme_Show (a technique's own row, edit mode only) -
        // adds/removes this technique from the custom filter currently being
        // edited and flips its own Forme_Hide max-slot flag so the clicked
        // button immediately swaps to its opposite (TechniqueRepeaterDisplayBuilderUsable.
        // printFilterEditButtons).
        setTechniqueInFilter = function (eventinfo, makeVisible) {
            let techniquesRepeater = new WorkerRepeatingSectionHandler("RepeatingFormeTech");
            let selectedId = techniquesRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let techniqueNameField = techniquesRepeater.getFieldName(
                selectedId, WuxDef.GetUntypedVariable("Action", "TechTrueName"));
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod([techniqueNameField, customFilterIdVariable]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let customFilterId = attrHandler.parseString(customFilterIdVariable);
                if (customFilterId === "0") {
                    return;
                }
                let techniqueName = attrHandler.parseString(techniqueNameField);

                let filterRepeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
                let filterDataVar = WuxDef.GetVariable("Forme_FilterData");
                let attributeHandler2 = new WorkerAttributeHandler();
                attributeHandler2.addMod(filterRepeater.getFieldName(customFilterId, filterDataVar));
                attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                    let filterNames;
                    try {
                        filterNames = JSON.parse(attrHandler2.parseString(filterRepeater.getFieldName(customFilterId, filterDataVar)));
                    } catch (e) {}
                    if (!Array.isArray(filterNames)) {
                        filterNames = [];
                    }

                    let inFilter = filterNames.includes(techniqueName);
                    if (makeVisible && !inFilter) {
                        filterNames.push(techniqueName);
                    } else if (!makeVisible && inFilter) {
                        filterNames = filterNames.filter(name => name !== techniqueName);
                    }
                    attrHandler2.addUpdate(filterRepeater.getFieldName(customFilterId, filterDataVar), JSON.stringify(filterNames));

                    let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler2, "Action");
                    techniqueAttributeHandler.setRepeaterData(techniquesRepeater);
                    techniqueAttributeHandler.setId(selectedId);
                    let inFilterFlagVar = techniqueAttributeHandler.getVariable("Forme_Hide", WuxDef._max);
                    attrHandler2.addRepeatingSectionRowUpdate(techniquesRepeater.definitionId, inFilterFlagVar, makeVisible ? "1" : "0");
                    // Keeps the card-border indicator (setFilterEditMode's
                    // own comment) in sync with this single-row toggle too.
                    let isVisibleFlagVar = techniqueAttributeHandler.getVariable("Forme_Show", WuxDef._max);
                    attrHandler2.addRepeatingSectionRowUpdate(techniquesRepeater.definitionId, isVisibleFlagVar, makeVisible ? "1" : "0");
                });
                attributeHandler2.run();
            });
            attributeHandler.run();
        },
        hideTechniqueInFilter = function (eventinfo) {
            setTechniqueInFilter(eventinfo, false);
        },
        showTechniqueInFilter = function (eventinfo) {
            setTechniqueInFilter(eventinfo, true);
        },

        // Shared tail for Hide All/Show All/Show By Filter (Forme_HideAll/
        // Forme_ShowAll/Forme_SetCustomFilter, buildFilterEditModeSection) -
        // overwrites the filter being edited's own Forme_FilterData outright
        // (unlike setTechniqueInFilter's single add/remove) and repaints
        // every technique row's Hide/Show state to match in the same pass,
        // via the same FormeTechniqueDatabase/setFilterEditMode shape
        // enterTechFilterEditMode itself uses.
        applyFilterEditSelection = function (filterNames) {
            let customFilterIdVariable = WuxDef.GetVariable("Action_FormeTechniques", "CustomFilterId");
            let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
            let filterDataVar = WuxDef.GetVariable("Forme_FilterData");
            let knownDataVar = WuxDef.GetVariable("Forme_FilterData", WuxDef._max);

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(customFilterIdVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let customFilterId = attrHandler.parseString(customFilterIdVariable);
                if (customFilterId === "0") {
                    return;
                }

                let attributeHandler2 = new WorkerAttributeHandler();
                let formeTech = new FormeTechniqueDatabase(attributeHandler2);
                attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                    formeTech.setupPostGetAttr(attrHandler2);
                    // Same "include everyone, then actually apply the
                    // resulting order" pair as enterTechFilterEditMode -
                    // see its own comments.
                    formeTech.registerTechDictionary(attrHandler2, true);
                    formeTech.updateVisibilityOfRepeaterTechniques(attrHandler2);
                    formeTech.setFilterEditMode(attrHandler2, true, filterNames);

                    // Writes the deliberate selection itself, plus marks
                    // every currently-owned technique "known" (not just the
                    // ones in filterNames) via Forme_FilterData's own max
                    // slot - registerTechDictionary skips
                    // updateCustomFilters() during Filter Edit Mode
                    // specifically so this is the only writer of that pair
                    // for this round trip, and marking everything known
                    // here means a technique this action deliberately left
                    // out (Hide All, or one Show By Filter's criteria just
                    // didn't match) won't look "never seen" and get
                    // silently re-added by a later updateCustomFilters()
                    // pass.
                    let allTechniqueNames = Object.entries(formeTech.techDictionary.values)
                        .filter(([, techData]) => !techData.isHeader)
                        .map(([name]) => name);
                    attrHandler2.addUpdate(repeater.getFieldName(customFilterId, filterDataVar), JSON.stringify(filterNames));
                    attrHandler2.addUpdate(repeater.getFieldName(customFilterId, knownDataVar), JSON.stringify(allTechniqueNames));
                });
                attributeHandler2.addFinishCallback(function () {
                    formeTech.setSortOrder();
                });
                attributeHandler2.run();
            });
            attributeHandler.run();
        },

        // Forme_HideAll - every technique in the filter being edited is
        // removed at once.
        hideAllTechniques = function () {
            Debug.Log("Hiding All Techniques In Filter");
            applyFilterEditSelection([]);
        },

        // Forme_ShowAll - every technique the character currently has
        // becomes included in the filter being edited.
        showAllTechniques = function () {
            Debug.Log("Showing All Techniques In Filter");
            let attributeHandler = new WorkerAttributeHandler();
            let formeTech = new FormeTechniqueDatabase(attributeHandler);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                formeTech.setupPostGetAttr(attrHandler);
                formeTech.registerTechDictionary(attrHandler);
                let allTechniqueNames = Object.entries(formeTech.techDictionary.values)
                    .filter(([, techData]) => !techData.isHeader)
                    .map(([name]) => name);
                applyFilterEditSelection(allTechniqueNames);
            });
            attributeHandler.run();
        },

        // Forme_SetCustomFilter (Sheet-v2/Worker-FilterPopup.js's
        // SetCustomFilterPopup) - matchedTechniqueFilters is either a
        // DatabaseFilterData[] (something was picked in the popup) or
        // undefined (nothing was picked, meaning "match everything
        // currently in the kit" - same result as Show All).
        applyFilterEditSelectionFromPopup = function (matchedTechniqueFilters) {
            if (matchedTechniqueFilters == undefined) {
                showAllTechniques();
                return;
            }
            let matchingNames = WuxTechs.Filter(matchedTechniqueFilters).map((technique) => technique.name);
            applyFilterEditSelection(matchingNames);
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
        ApplyTechniqueFilterPreset: applyTechniqueFilterPreset,
        SelectTechFilter: selectTechFilter,
        AddTechFilter: addTechFilter,
        RenameTechFilter: renameTechFilter,
        DeleteTechFilter: deleteTechFilter,
        EditTechFilter: editTechFilter,
        FinishTechFilter: finishTechFilter,
        HideTechniqueInFilter: hideTechniqueInFilter,
        ShowTechniqueInFilter: showTechniqueInFilter,
        HideAllTechniques: hideAllTechniques,
        ShowAllTechniques: showAllTechniques,
        ApplyFilterEditSelectionFromPopup: applyFilterEditSelectionFromPopup,
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

    // includeAll - Filter Edit Mode needs a real computed sortOrder for
    // every owned technique, not just the ones currently isVisible (see
    // FormeTechniqueDatabaseBase.updateHeaderDictionary's own comment) -
    // otherwise a technique this sort skips keeps its default sortOrder of
    // -1, which setSortId reads as "append to the very end, unsorted"
    // instead of placing it in its actual action-priority position.
    getSortOrder(sortStyle, techDictionary, includeAll) {
        switch (sortStyle) {
            case "Action":
                this.sortByActionType(techDictionary, includeAll);
                return;
        }
    }

    sortByActionType (techDictionary, includeAll) {
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

        const entries = this.getEntries(techDictionary, includeAll);

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
    
    getEntries(techDictionary, includeAll) {
        return Object.entries(techDictionary.values)
            .filter(([, v]) => includeAll || v.isVisible);
    }
    
    updateSortOrder(techDictionary, entries) {
        entries.forEach(([key, value], index) => {
            techDictionary.values[key].sortOrder = index;
        });
        this.listSize = entries.length;
    }
}

// One precomputed preset - SortingGroupName is this preset's own name (also
// its key in FormeTechniqueFilterPresets below), SortingOrderOfTechniques is
// its technique names in the exact order FormeTechniqueSort would display
// them, and TechniquesThatAreVisible is the same set as a plain name list
// (checkTechniqueIsVisibleInFilter-shaped) for fast membership checks - this
// is what applyTechniqueFilterPreset reads directly instead of recomputing
// via WuxTechs.Filter.
class FormeTechniqueFilterPresetData {
    constructor(sortingGroupName, techniques) {
        this.SortingGroupName = sortingGroupName;
        this.SortingOrderOfTechniques = techniques.map(technique => technique.name);
        this.TechniquesThatAreVisible = techniques.map(technique => technique.name);
    }
}

// Dictionary of every preset filter, keyed by its own SortingGroupName -
// populated by FormeTechniqueDatabase.updateFilterPresets, not filled in
// statically here, since "Job + Style" depends on the current character's
// learned styles/equipped job and can't be known ahead of time.
var FormeTechniqueFilterPresets = FormeTechniqueFilterPresets || {};

// The two presets with a fixed, character-independent WuxTechs filter.
// "Job + Style" isn't listed here - it's computed dynamically in
// FormeTechniqueDatabase.updateFilterPresets instead, since it depends on
// the current character's own learned styles/equipped job.
var staticFormeTechniqueFilterPresetRules = {
    "Basic Actions": [new DatabaseFilterData("style", "Basic"), new DatabaseFilterData("group", ["TechFilterType_Combat", "TechFilterType_Utility"])],
    "Basic Social": [new DatabaseFilterData("style", "Basic"), new DatabaseFilterData("group", "TechFilterType_Social")]
};

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
    // Custom-filter edit mode - writes every RepeatingFormeTech row's own
    // Forme_EditFilter max-slot flag (TechniqueRepeaterDisplayBuilderUsable.
    // printEnhancementEffects/printFilterEditButtons swap between the rank
    // buttons and Hide/Show based on it) in one pass, same
    // iterateRepeaterTechniques/addRepeatingSectionRowUpdate shape
    // updateVisibilityOfRepeaterTechniques itself uses. Entering edit mode
    // (isEditing) also forces every technique visible regardless of the
    // active filter ("every technique should then be shown") and seeds each
    // row's own Forme_Hide max-slot flag from inFilterNames (the filter
    // being edited's own current contents) so the correct one of
    // Hide/Show shows immediately. Exiting just clears the flag - the caller
    // (applyTechniqueFilterNames) is responsible for restoring real filter
    // visibility afterward via its own updateVisibilityOfRepeaterTechniques
    // call.
    setFilterEditMode(attrHandler, isEditing, inFilterNames) {
        let inFilterSet = new Set(inFilterNames || []);
        this.iterateRepeaterTechniques(attrHandler, function (techniqueAttributeHandler, techniqueName, repeater) {
            let editFlagVar = techniqueAttributeHandler.getVariable("Forme_EditFilter", WuxDef._max);
            attrHandler.addRepeatingSectionRowUpdate(repeater.definitionId, editFlagVar, isEditing ? "1" : "0");
            // "Would this technique be visible if the filter being edited
            // were applied right now?" - piggybacked onto Forme_Show's own
            // max slot (same "enabled flag on the clickable field's own max
            // slot" convention as inFilterFlagVar below), read by
            // TechniqueRepeaterDisplayBuilderUsable.print() to border the
            // card (WCSS-Specialized.css). Unlike inFilterFlagVar - which
            // deliberately stays whatever it last was outside edit mode -
            // this one is explicitly cleared on exit, since the border
            // should never show outside edit mode.
            let isVisibleFlagVar = techniqueAttributeHandler.getVariable("Forme_Show", WuxDef._max);
            if (isEditing) {
                let inFilter = inFilterSet.has(techniqueName);
                let inFilterFlagVar = techniqueAttributeHandler.getVariable("Forme_Hide", WuxDef._max);
                attrHandler.addRepeatingSectionRowUpdate(repeater.definitionId, inFilterFlagVar, inFilter ? "1" : "0");
                attrHandler.addRepeatingSectionRowUpdate(repeater.definitionId, isVisibleFlagVar, inFilter ? "1" : "0");
                techniqueAttributeHandler.setVisibilityAttribute(true);
            } else {
                attrHandler.addRepeatingSectionRowUpdate(repeater.definitionId, isVisibleFlagVar, "0");
            }
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
            if (filters.length === 0 || typeof filters[0] === "string") {
                // Already a precomputed technique-name list (a preset's own
                // TechniquesThatAreVisible, FormeTechniqueFilterPresets) -
                // skip WuxTechs.Filter(filters) entirely, since the whole
                // point of a preset is to have already done that work ahead
                // of time. An empty list (Hide All, or a custom filter with
                // nothing in it) is unambiguously this case too - treating
                // it as a raw DatabaseFilterData[] criteria array instead
                // (the old filters.length > 0 check) called
                // WuxTechs.Filter([]), which crashes reading .property off
                // filterData[0] === undefined.
                this.filters = filters;
            } else {
                let filteredTechs = WuxTechs.Filter(filters);
                this.filters = [];
                filteredTechs.forEach((technique) => {
                    this.filters.push(technique.name);
                });
            }
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

    // includeAllForSections is threaded straight through to
    // updateHeaderDictionary - see its own comment. Only Filter Edit Mode's
    // entry points (enterTechFilterEditMode/applyFilterEditSelection) pass
    // true; every other caller omits it and keeps today's "only currently-
    // visible techniques get sectioned" behavior.
    registerTechDictionary(attrHandler, includeAllForSections) {
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
        this.techSorter.getSortOrder("Action", formeTechDatabase.techDictionary, includeAllForSections);
        this.updateHeaderDictionary(includeAllForSections);
        this.sortList = [this.techSorter.listSize];
        WuxWorkerActionsService.SetTechniqueBoosters(attrHandler);
        // Every registerTechDictionary run is already a "this character's
        // technique kit may have changed" event (job/style change, new
        // WuxTechs content after a sheet update, etc.), so the preset filters
        // are refreshed here too rather than needing their own separate
        // trigger.
        this.updateFilterPresets(attrHandler);
        // Same "kit may have changed" trigger, for every custom filter -
        // newly learned techniques get unioned into each one (never removed,
        // so a technique the user has deliberately taken out of one custom
        // filter stays out). A separate round trip (RepeatingTechFilters
        // isn't registered on attrHandler the way RepeatingFormeTech is) that
        // no-ops immediately if no custom filters exist yet. Skipped for
        // Filter Edit Mode's own registrations (includeAllForSections) -
        // those already read/write Forme_FilterData themselves in the same
        // round trip (enterTechFilterEditMode/applyFilterEditSelection), and
        // this runs as a separate, independently-timed handler chain of its
        // own; running both against the same row risked one silently
        // clobbering the other depending on which finished first.
        if (!includeAllForSections) {
            this.updateCustomFilters();
        }
    }
    // Builds/refreshes every entry in FormeTechniqueFilterPresets against the
    // currently-loaded WuxTechs and (for "Job + Style") this character's
    // current learned styles/equipped job - requires setupPostGetAttr to have
    // already run (styleWorker/equippedSlots), same precondition
    // registerTechDictionary itself has at every call site. Also persists the
    // whole dictionary to Action_FormeTechniques' own FilterPresets attribute
    // (a hidden field, GoogleSheets/WuxGS-Base.js's buildFilterPresetButtons)
    // so applyTechniqueFilterPreset can read it back without recomputing -
    // an in-memory-only object never survives past this one worker call.
    updateFilterPresets(attrHandler) {
        for (let name in staticFormeTechniqueFilterPresetRules) {
            let techniques = WuxTechs.Filter(staticFormeTechniqueFilterPresetRules[name]);
            FormeTechniqueFilterPresets[name] = new FormeTechniqueFilterPresetData(name, this.buildSortedTechniqueList(techniques));
        }

        // The equipped job's style plus every individually learned style,
        // plus the literal "Style" tag to also pick up the learned/equipped
        // base style technique(s) themselves.
        let learnedStyleNames = this.styleWorker.getStyles().map(technique => technique.name);
        let equippedJobStyle = this.equippedSlots[0];
        let styleNames = learnedStyleNames.slice();
        if (equippedJobStyle != undefined && equippedJobStyle !== "") {
            styleNames.push(equippedJobStyle);
        }
        let styleTechniques = styleNames.length > 0
            ? WuxTechs.Filter([new DatabaseFilterData("style", styleNames.concat("Style"))])
            : [];
        // "Job + Style" also always shows every Gear technique the character
        // owns (not just currently-equipped ones - same "everything learned/
        // owned, not just active" shape as learnedStyleNames above) and every
        // learned Perk technique, so the preset covers the character's full
        // kit rather than just their trained styles.
        let jobStyleTechniques = styleTechniques.concat(this.collectGearTechniques(), this.perkWorker.getPerkTechniques());
        FormeTechniqueFilterPresets["Job + Style"] = new FormeTechniqueFilterPresetData("Job + Style", this.buildSortedTechniqueList(jobStyleTechniques));

        let presetsVariable = WuxDef.GetVariable("Action_FormeTechniques", "FilterPresets");
        attrHandler.addUpdate(presetsVariable, JSON.stringify(FormeTechniqueFilterPresets));
    }
    // Unions every technique currently in this.techDictionary into each
    // RepeatingTechFilters row's own Forme_FilterData list, adding whatever
    // this filter has never seen before (a newly learned job/style's
    // techniques) and leaving everything else untouched - a technique the
    // user has deliberately removed from one custom filter was already in
    // its list once, so it's never re-added just because it's still in the
    // kit. That distinction needs its own tracking (Forme_FilterData's own
    // max slot, a companion list of every technique name ever unioned into
    // this filter) rather than just checking Forme_FilterData's own current
    // contents - a removed technique disappears from Forme_FilterData too,
    // so checking that alone can't tell "never seen" apart from
    // "deliberately excluded" and was re-adding exclusions right back in
    // every time this ran.
    updateCustomFilters() {
        let allTechniqueNames = Object.entries(this.techDictionary.values)
            .filter(([, techData]) => !techData.isHeader)
            .map(([name]) => name);
        if (allTechniqueNames.length === 0) {
            return;
        }

        let repeater = new WorkerRepeatingSectionHandler("RepeatingTechFilters");
        let filterDataVar = WuxDef.GetVariable("Forme_FilterData");
        let knownDataVar = WuxDef.GetVariable("Forme_FilterData", WuxDef._max);
        repeater.getIds(function (repeater) {
            if (repeater.ids.length === 0) {
                return;
            }
            let attributeHandler = new WorkerAttributeHandler();
            repeater.addAttributeMods(attributeHandler, [filterDataVar, knownDataVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                repeater.iterate(function (id) {
                    let existing;
                    try {
                        existing = JSON.parse(attrHandler.parseString(repeater.getFieldName(id, filterDataVar)));
                    } catch (e) {}
                    if (!Array.isArray(existing)) {
                        existing = [];
                    }
                    let known;
                    try {
                        known = JSON.parse(attrHandler.parseString(repeater.getFieldName(id, knownDataVar)));
                    } catch (e) {}
                    if (!Array.isArray(known)) {
                        // A filter created before this max slot was used
                        // for known-technique tracking - treat whatever's
                        // currently included as already known, so this
                        // one-time migration doesn't resurrect anything the
                        // player already excluded before then.
                        known = existing.slice();
                    }
                    let knownSet = new Set(known);
                    let grown = existing.slice();
                    let grownKnown = known.slice();
                    let changed = false;
                    allTechniqueNames.forEach((name) => {
                        if (!knownSet.has(name)) {
                            grown.push(name);
                            grownKnown.push(name);
                            changed = true;
                        }
                    });
                    if (changed) {
                        attrHandler.addUpdate(repeater.getFieldName(id, filterDataVar), JSON.stringify(grown));
                        attrHandler.addUpdate(repeater.getFieldName(id, knownDataVar), JSON.stringify(grownKnown));
                    }
                });
            });
            attributeHandler.run();
        });
    }
    // Runs the exact same action-type-then-alphabetical sort
    // FormeTechniqueSort applies to the live RepeatingFormeTech list, against
    // an arbitrary standalone technique array - a fresh Dictionary/sorter pair
    // so this never touches this.techDictionary/this.techSorter's own state.
    buildSortedTechniqueList(techniques) {
        let tempDictionary = new Dictionary();
        techniques.forEach((technique) => {
            tempDictionary.add(technique.name, { technique: technique, isVisible: true });
        });
        let sorter = new FormeTechniqueSort();
        sorter.getSortOrder("Action", tempDictionary);
        return Object.entries(tempDictionary.values)
            .sort(([, a], [, b]) => a.sortOrder - b.sortOrder)
            .map(([, value]) => value.technique);
    }
    // includeAllForSections - Filter Edit Mode shows every owned technique
    // (setFilterEditMode forces every row visible, including ones this
    // character can't currently use/equip), so headers/sortOrder offsets
    // need to account for ALL of them too, not just the ones isVisible
    // under whatever filter/eligibility state happens to be active right
    // now - otherwise a hidden technique's sortOrder never gets the offset
    // from headers inserted ahead of it and it lands in the wrong section.
    updateHeaderDictionary(includeAllForSections) {
        let visibleEntries = Object.entries(this.techDictionary.values)
            .filter(([, v]) => (includeAllForSections || v.isVisible) && !v.isHeader)
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
            if (v.isHeader || (!includeAllForSections && !v.isActive)) return;
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
    // Same item/technique iteration as addGearItemTechniques below, but
    // returning root technique objects instead of writing into
    // techDictionary - used by updateFilterPresets to fold every owned
    // Gear technique into the "Job + Style" preset.
    collectGearTechniques() {
        let techniques = [];
        this.gearEquipBuildMax.forEach(itemName => {
            let item = WuxItems.Get(itemName);
            if (item == undefined) return;
            if (item.hasTechnique && item.technique != undefined) {
                techniques.push(item.technique);
            }
            let commonTechniques = item.getCommonTechniques ? item.getCommonTechniques() : [];
            commonTechniques.forEach(technique => techniques.push(technique));
        });
        return techniques
            .map(technique => WuxTechs.Get(technique.getRootName()))
            .filter(technique => technique != undefined);
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