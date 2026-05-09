var WuxWorkerJobs = WuxWorkerJobs || (function () {
    'use strict';

    const updateBuildPoints = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxJobWorkerBuild();
            worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            WuxWorkerSkills.UpdateKeySkills(attributeHandler);
            WuxWorkerActions.UpdateAllActionsInAdvancement(attributeHandler);

            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },

        refreshStats = function (attributeHandler) {
            let jobWorker = new WuxBasicWorkerBuild("Job");
            attributeHandler.addMod([jobWorker.attrBuildDraft, jobWorker.attrMax]);
            attributeHandler.addFormulaMods(jobWorker.definition);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                jobWorker.setBuildStatsDraft(attrHandler);

                jobWorker.cleanBuildStats();
                jobWorker.setPointsMax(attrHandler);
                jobWorker.updatePoints(attrHandler);
                jobWorker.setBuildStatVariables(attrHandler);
            });
        },

        updateStats = function (attributeHandler) {
            Debug.Log("Update Job Stats");
            let jobWorker = new WuxJobWorkerBuild();
            attributeHandler.addMod(jobWorker.attrBuildDraft);

            let maxJobSlots = parseInt(WuxDef.Get("Forme_JobSlotCount").formula.getValue());
            let jobSlotDef = WuxDef.Get("Forme_JobSlot");
            for (let i = 1; i <= maxJobSlots; i++) {
                attributeHandler.addMod(jobSlotDef.getVariable(i));
            }
            attributeHandler.addMod(jobSlotDef.getVariable());

            let styleRepeaterId = "RepeatingJobStyles";
            attributeHandler.addRepeatingSection(styleRepeaterId);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attributeHandler.getRepeatingSection(styleRepeaterId).removeAllIds();
                jobWorker.setBuildStatsDraft(attrHandler);

                WuxWorkerStyles.AddStyles(attrHandler, jobWorker, attributeHandler.getRepeatingSection(styleRepeaterId));

                jobWorker.cleanBuildStats();
                jobWorker.setBuildStatVariables(attrHandler);
                jobWorker.saveBuildStatsToFinal(attrHandler);
                jobWorker.revertBuildStatsDraft(attrHandler);
            });
        },

        seeTechniques = function (eventinfo) {
            let jobName = eventinfo.newValue;
            Debug.Log(`See Techniques for ${jobName}`);
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(eventinfo.sourceAttribute, "0");
            let inventoryTitle = `${jobName} Techniques`;
            let inventoryItems = new FilteredTechniquesInventoryItemHandler(
                new DatabaseFilterData("style", jobName),
                (tier) => {
                    if (tier > 1) {
                        let level = Format.GetLevelPrerequisites(tier);
                        return new InspectionInventoryItem(`Level ${level}`,
                            `These techniques are gained upon reaching Level ${level}`, 
                            true);
                    }
                });
            if (inventoryItems.items.length == 0) {
                return;
            }
            WuxWorkerInspectPopup.OpenTechniqueInspection(attributeHandler, inventoryTitle, inventoryItems.items);
            attributeHandler.run();
        },

        equipJob = function (attributeHandler, jobName) {
            if (jobName == "0") {
                return;
            }
            let jobSlotVariable = WuxDef.GetVariable("Forme_JobSlot");
            attributeHandler.addMod(jobSlotVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let jobDef = WuxDef.Get(Format.GetDefinitionName("Job", jobName));
                let lastJobName = attrHandler.parseString(jobSlotVariable);
                if (lastJobName != "") {
                    let lastJobDef = WuxDef.Get(Format.GetDefinitionName("Job", lastJobName));
                    attributeHandler.addUpdate(lastJobDef.getVariable(WuxDef._learn), "0");
                }
                attributeHandler.addUpdate(jobDef.getVariable(WuxDef._learn), "on");
                attributeHandler.addUpdate(jobSlotVariable, jobName);
            });
        },
    
        equipJobFromEvent = function (eventinfo) {
            let jobName = eventinfo.newValue;
            Debug.Log(`Equipping ${jobName}`);
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
            equipJob(attributeHandler, jobName);
            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        };

    return {
        UpdateBuildPoints: updateBuildPoints,
        RefreshStats: refreshStats,
        UpdateStats: updateStats,
        SeeTechniques: seeTechniques,
        EquipJob: equipJob,
        EquipJobFromEvent: equipJobFromEvent
    };
}());

