var WuxWorkerGeneral = WuxWorkerGeneral || (function () {
    'use strict';

    var
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
        },
        updateCR = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
            let cr = parseInt(eventinfo.newValue);

            WuxWorkerAttributes.UpdateStats(attributeHandler);
            WuxWorkerSkills.UpdateStats(attributeHandler);
            WuxWorkerKnowledges.UpdateStats(attributeHandler);
            WuxWorkerTechniques.UpdateLearnedStats(attributeHandler);
            WuxWorkerAdvancement.UpdateStats(attributeHandler);
            updateStats(attributeHandler);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                combatDetailsHandler.onUpdateCR(attrHandler, cr);
            });
            attributeHandler.run();
        },
        openSubMenu = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "on");
            attributeHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActiveId"), eventinfo.sourceAttribute);
            attributeHandler.run();
        },
        closeSubMenu = function () {
            let idFieldName = WuxDef.GetVariable("Popup_SubMenuActiveId");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(idFieldName);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate(attrHandler.parseString(idFieldName), "0");
                attrHandler.addUpdate(idFieldName, "");
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            });
            attributeHandler.run();
        },
        closePopup = function () {
            let nameFieldName = WuxDef.GetVariable("Popup_InspectPopupName");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(nameFieldName);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                switch (attrHandler.parseString(nameFieldName)) {
                    case WuxDef.GetTitle("Popup_ItemInspectionName"):
                    case WuxDef.GetTitle("Popup_TechniqueInspectionName"):
                        WuxWorkerInspectPopup.ClosePopup();
                        break;
                }
            });
            attributeHandler.run();
        }
        
    return {
        UpdateStats: updateStats,
        UpdateDisplayName: updateDisplayName,
        UpdateStatus: updateStatus,
        UpdateCR: updateCR,
        OpenSubMenu: openSubMenu,
        CloseSubMenu: closeSubMenu,
        ClosePopup: closePopup
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

                    attributeHandler2.addMod(WuxDef.GetVariable("CR", WuxDef._max));
                    attributeHandler2.addMod(WuxDef.GetVariable("Affinity"));
                    attributeHandler2.addMod(WuxDef.GetVariable("AdvancedAffinity"));
                    attributeHandler2.addMod(WuxDef.GetVariable("AdvancedBranch"));

                    attributeHandler2.addGetAttrCallback(function (attrHandler2) {
                        let techniqueWorker = new WuxWorkerBuild("Technique");
                        techniqueWorker.setBuildStatsDraft(attrHandler2);
                        let workerVariableName = "";
                        let styleValue = "0";
                        let cr = attrHandler2.parseInt(WuxDef.GetVariable("CR", WuxDef._max));
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
            attributeHandler.addMod(WuxDef.GetVariable("CR", WuxDef._max));
            attributeHandler.addMod(WuxDef.GetVariable("Affinity"));
            attributeHandler.addMod(WuxDef.GetVariable("AdvancedAffinity"));
            attributeHandler.addMod(WuxDef.GetVariable("AdvancedBranch"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                techniqueWorker.setBuildStatsDraft(attrHandler);
                techniqueWorker.cleanBuildStats();
                let workerVariableName = "";
                let styleValue = "0";
                let cr = attrHandler.parseInt(WuxDef.GetVariable("CR", WuxDef._max));
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
            attrHandler.addUpdate(styleDefinition.getVariable(WuxDef._subfilter), isLearnable ? "0" : "1");
            attrHandler.addUpdate(styleDefinition.getVariable(), styleStatus);

            let techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", styleDefinition.title)]);
            for (let i = 0; i < techDefinitions.length; i++) {
                tier = parseInt(techDefinitions[i].tier);
                tier = isNaN(tier) ? 0 : tier;
                affinity = techDefinitions[i].affinity;
                isLearnable = !techDefinitions[i].isFree && styleStatus != "0" && tier <= cr && (affinity == "" || affinities.some(entry => entry.includes(affinity)));
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
            Debug.Log("Filter Techniques For Actions");
            let advStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Advanced")]);
            let specStyleDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Style"), new DatabaseFilterData("mainGroup", "Branched")]);
            let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));

            let styleWorker = new WuxWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);

            let jobStyleWorker = new WuxWorkerBuild("JobStyle");
            attributeHandler.addMod(jobStyleWorker.attrBuildDraft);

            let techniqueWorker = new WuxWorkerBuild("Technique");
            attributeHandler.addMod(techniqueWorker.attrBuildFinal);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);
                styleWorker.cleanBuildStats();
                jobStyleWorker.setBuildStatsDraft(attrHandler);
                jobStyleWorker.cleanBuildStats();
                techniqueWorker.setBuildStatsFinal(attrHandler);

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
                
                let healValueDefinition = WuxDef.Get("Cmb_HV");
                combatDetailsHandler.onUpdateHealValue(attrHandler, attrHandler.parseInt(healValueDefinition.getVariable()));
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

var WuxWorkerChat = WuxWorkerChat || (function () {
    'use strict';

    var
        selectOutfit = function (eventinfo) {
            Debug.Log(`Selecting outfit`);

            let outfitRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingOutfits");
            outfitRepeatingSection.getIds(function (outfitRepeater) {
                let emoteButtonRepeaterSection = new WorkerRepeatingSectionHandler("RepeatingActiveEmotes");
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
            Debug.Log(`Updating post content`);

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
            Debug.Log(`Updating selected language to ${eventinfo.newValue}`);
            let message = new EmoteMessage("");
            message.setLanguage(eventinfo.newValue);

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Chat_LanguageTag"), message.languageTag);
            Debug.Log(`setting language tag to ${message.languageTag}`);
            attributeHandler.run();
        },

        updateActiveEmoteSet = function (emoteButtonRepeater, attrHandler, outfitEmotes) {
            let emotesVar = WuxDef.GetVariable("Chat_Emotes");
            attrHandler.addUpdate(emotesVar, JSON.stringify(outfitEmotes));

            let newRowId;
            let postNameVar = WuxDef.GetVariable("Chat_PostName");
            let postUrlVar = WuxDef.GetVariable("Chat_PostURL");
            outfitEmotes.iterate(function (emote) {
                newRowId = generateRowID();
                attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newRowId, postNameVar), emote.name);
                attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newRowId, postUrlVar), emote.url);
            });
        },
        updateNameOutfit = function (eventinfo) {
            Debug.Log(`Renaming outfit ${eventinfo.previousValue} to ${eventinfo.newValue}`);
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
            Debug.Log(`Setting outfit emotes through a json submission`);
            let outfitRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingOutfits");
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

            let emoteButtonRepeaterSection = new WorkerRepeatingSectionHandler("RepeatingActiveEmotes");
            emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {

                let attributeHandler = new WorkerAttributeHandler();
                let setIdVar = WuxDef.GetVariable("Chat_SetId");
                attributeHandler.addMod(setIdVar);

                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitName")), outfitEmotes.name);
                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes")), JSON.stringify(outfitEmotes));
                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true)), JSON.stringify(outfitEmotes));
                Debug.Log(`Setting outfit emotes for ${outfitEmotes.name} to \n${JSON.stringify(outfitEmotes)}`);

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
            Debug.Log(`Setting outfit emotes through a name entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        updateOutfitEmotesDefaultUrl = function (eventinfo) {
            Debug.Log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        updateOutfitEmotesUrl = function (eventinfo) {
            Debug.Log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        setOutfitEmotesIndividualEntry = function (eventinfo) {
            let outfitRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingOutfits");
            outfitRepeatingSection.getIds(function (outfitRepeater) {
                let emoteButtonRepeaterSection = new WorkerRepeatingSectionHandler("RepeatingActiveEmotes");
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

