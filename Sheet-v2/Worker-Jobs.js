

var WuxWorkerJobs = WuxWorkerJobs || (function () {
    
    const populateJobInspectionTechniques = function (attrHandler, itemPopupRepeater, job) {
        Debug.Log(`Populate Job Inspection Techniques for ${job}`);
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${job} Techniques`);
        let maxTier = 6;
        
        let selectedElement = null;
        let jobTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", job));
        
        for (let tier = 1; tier <= maxTier; tier++) {

            let tierData = jobTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }
                let techHeader = "";
                let techDesc = "";
                if (tier != 0) {
                    techHeader += `Tier ${tier}`;
                    techDesc += `These techniques are learned upon reaching ${job} Tier ${tier}`;
                }
                if (affinity != "") {
                    techHeader += (techHeader == "" ? "" : "; ") + `${affinity} Affinity`;
                    techDesc +=  (techDesc == "" ? "" : " ") + `and require ${affinity} affinity`;
                }

                let newRowId = itemPopupRepeater.generateRowId();
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), techHeader);
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "");
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectDesc")), techDesc);
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                
                techsByAffinity.forEach(function (jobTechnique) {
                    newRowId = itemPopupRepeater.generateRowId();
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), jobTechnique.name);
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Tech");

                    if (selectedElement == null) {
                        selectedElement = {
                            item: jobTechnique,
                            id: newRowId
                        }
                        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
                    } else {
                        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                    }
                });
            });
        }

        return selectedElement;
    };
    const addStyles = function (attrHandler, jobWorker, jobStylesRepeater) {
        let jobSlot = WuxDef.GetVariable("Style_JobSlot");
        Debug.Log(`Here with ${JSON.stringify(jobWorker.buildStats)}`);

        jobWorker.iterateBuildStats(function (jobStyleVariableData) {
            let jobStyle = WuxStyles.GetByVariableName(jobStyleVariableData.name);
            Debug.Log(`Adding ${JSON.stringify(jobStyleVariableData)} to repeater`);

            if (jobStyle.group != "") {
                let newRowId = jobStylesRepeater.generateRowId();
                attrHandler.addUpdate(jobStylesRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_Name")), jobStyle.name);
                attrHandler.addUpdate(jobStylesRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_IsEquipped")), jobSlot == jobStyle.name ? "on" : 0);
                attrHandler.addUpdate(jobStylesRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_Actions")), jobStyle.name);
                attrHandler.addUpdate(jobStylesRepeater.getFieldName(newRowId, WuxDef.GetVariable("Style_SeeTechniques")), jobStyle.name);
            }
        });
    };
    'use strict';

    const updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Jobs");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Job");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        
        updateStats = function (attributeHandler) {
            let jobWorker = new WuxBasicWorkerBuild("Job");
            attributeHandler.addMod(jobWorker.attrBuildDraft);
            attributeHandler.addMod(WuxDef.GetVariable("Style_JobSlot"));

            let repeaterName = "RepeatingJobStyles";
            let jobStyleValuesRepeatingSection = new WorkerRepeatingSectionHandler(repeaterName);
            jobStyleValuesRepeatingSection.getIds(function (jobStylesRepeater) {
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    jobWorker.setBuildStatsDraft(attrHandler);
                    jobStylesRepeater.removeAllIds();
                    addStyles(attrHandler, jobWorker, jobStylesRepeater);
                });
                attributeHandler.run();
            });
        },

        seeTechniques = function (eventinfo) {
            Debug.Log("See Techniques");
            WuxWorkerInspectPopup.OpenTechniqueInspection(function () {
                },
                function (attrHandler, itemPopupRepeater) {
                    let job = eventinfo.newValue;
                    
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                    attrHandler.addUpdate(eventinfo.sourceAttribute, "0");
                    attrHandler.addUpdate(WuxDef.GetVariable(WuxDef.GetName(job, WuxDef.Get("Job")), WuxDef._expand), "0");

                    return populateJobInspectionTechniques(attrHandler, itemPopupRepeater, job);
                }
            );
        };

    return {
        UpdateBuildPoints: updateBuildPoints,
        UpdateStats: updateStats,
        SeeTechniques: seeTechniques
    };
}());

