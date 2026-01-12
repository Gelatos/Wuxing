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
                worker.setPointsMax(attrHandler);
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
        },
        
        updateKeySkills = function (attributeHandler) {
            let jobWorker = new WuxBasicWorkerBuild("Job");
            let styleWorker = new WuxStyleWorkerBuild();
            attributeHandler.addMod([jobWorker.attrBuildDraft, styleWorker.attrBuildDraft]);
            
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let styleSkillDictionary = new Dictionary();
                jobWorker.setBuildStatsDraft(attrHandler);
                styleWorker.setBuildStatsDraft(attrHandler);

                jobWorker.iterateBuildStats(function (styleVariableData) {
                    let style = WuxStyles.GetByVariableName(styleVariableData.name);
                    let skills = style.skills.split(";");
                    for (let i = 0; i < skills.length; i++) {
                        let skill = skills[i].trim();
                        styleSkillDictionary.add(skill, 0);
                        Debug.Log(`Adding ${skill} to key skills`);
                    }
                });

                styleWorker.iterateBuildStats(function (styleVariableData) {
                    let style = WuxStyles.GetByVariableName(styleVariableData.name);
                    let skills = style.skills.split(";");
                    for (let i = 0; i < skills.length; i++) {
                        let skill = skills[i].trim();
                        styleSkillDictionary.add(skill, 0);
                        Debug.Log(`Adding ${skill} to key skills`);
                    }
                });

                let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
                for (let i = 0; i < skillDefinitions.length; i++) {
                    if (styleSkillDictionary.keys.includes(skillDefinitions[i].title)) {
                        Debug.Log(`Found ${skillDefinitions[i].title} as a skill in key skills`);
                    }
                    attrHandler.addUpdate(
                        skillDefinitions[i].getVariable(WuxDef._learn), 
                        styleSkillDictionary.keys.includes(skillDefinitions[i].title) ? "on" : "0");
                }
                
            });
        }

    return {
        UpdateBuildPoints: updateBuildPoints,
        RefreshStats: refreshStats,
        UpdateStats: updateStats,
        UpdateKeySkills: updateKeySkills
    };
}());

