var WuxWorkerSkills = WuxWorkerSkills || (function () {
    'use strict';

    var
        updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Skills");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Skill");
            attributeHandler.addMod([WuxDef.GetVariable("CR")]);
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            updateStats(attributeHandler);
            attributeHandler.run();

        },

        refreshStats = function (attributeHandler) {
            Debug.Log("Refresh Skill Stats");
            let worker = new WuxWorkerBuild("Skill");
            attributeHandler.addMod([worker.attrBuildDraft, worker.attrMax]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                worker.setBuildStatsDraft(attrHandler);
                worker.cleanBuildStats();
                worker.updatePoints(attrHandler);
                worker.revertBuildStatsDraft(attrHandler);
            });
        },
        updateStats = function (attributeHandler) {
            let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
            for (let i = 0; i < skillDefinitions.length; i++) {
                attributeHandler.addFormulaMods(skillDefinitions[i]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let skillPointValue = 0;
                let skillPointValueNoCr = 0;
                let skillRank = 0;
                for (let i = 0; i < skillDefinitions.length; i++) {
                    skillPointValueNoCr = skillDefinitions[i].formula.getValue(attrHandler);
                    skillPointValue = skillPointValueNoCr;
                    skillRank = attrHandler.parseString(skillDefinitions[i].getVariable(WuxDef._rank));
                    if (skillRank == "on") {
                        skillPointValue += 1 + attrHandler.parseInt(WuxDef.GetVariable("CR"));
                    }
                    attrHandler.addUpdate(skillDefinitions[i].getVariable(WuxDef._max), skillPointValueNoCr);
                    attrHandler.addUpdate(skillDefinitions[i].getVariable(), skillPointValue);
                }
            });
        }

    return {
        UpdateBuildPoints: updateBuildPoints,
        RefreshStats: refreshStats,
        UpdateStats: updateStats
    };
}());

