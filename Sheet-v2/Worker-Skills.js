var WuxWorkerSkills = WuxWorkerSkills || (function () {
    'use strict';

    var
        updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Skills");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxSkillWorkerBuild();
            attributeHandler.addMod([WuxDef.GetVariable("CR")]);
            worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            updateStats(attributeHandler);
            attributeHandler.run();

        },

        refreshStats = function (attributeHandler) {
            Debug.Log("Refresh Skill Stats");
            let worker = new WuxSkillWorkerBuild();
            attributeHandler.addMod([worker.attrBuildDraft, worker.attrMax]);
            attributeHandler.addFormulaMods(worker.definition);

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
                attributeHandler.addMod([skillDefinitions[i].getVariable(WuxDef._rank), 
                    skillDefinitions[i].getVariable(WuxDef._expertise)]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let skillExpertiseDef = WuxDef.Get("SkillExpertise");
                let trainingBonus = 2 + attrHandler.parseInt(WuxDef.GetVariable("CR"));
                
                skillDefinitions.forEach(skillDefinition => {
                    let skillInfo = [];
                    let skillPointValueNoCr = skillDefinition.formula.getValue(attrHandler);
                    skillInfo = skillInfo.concat(["-- Base Calculation --", 
                        `${skillDefinition.formula.getString()} = ${skillPointValueNoCr}`, ""]);
                    
                    let skillPointValue = skillPointValueNoCr;
                    let skillRank = attrHandler.parseString(skillDefinition.getVariable(WuxDef._rank));
                    let skillExpertise = attrHandler.parseString(skillDefinition.getVariable(WuxDef._expertise));
                    if (skillRank == "on") {
                        if (skillExpertise == "on") {
                            skillExpertise = skillExpertiseDef.formula.getValue();
                            skillPointValue = skillExpertise;
                            skillInfo = [`-- ${skillExpertiseDef.getTitle()} --`, skillExpertise, ""];
                        }
                        skillPointValue += trainingBonus;
                        skillInfo = skillInfo.concat(["-- Training Bonus --", `2 + [CR] = ${trainingBonus}`, ""]);
                    }
                    attrHandler.addUpdate(skillDefinition.getVariable(WuxDef._max), skillPointValueNoCr);
                    attrHandler.addUpdate(skillDefinition.getVariable(), skillPointValue);
                    attrHandler.addUpdate(skillDefinition.getVariable(WuxDef._info), skillInfo.join(`\n`));
                });
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
                    if (styleVariableData.value == null || styleVariableData.value <= 0) {
                        return;
                    }
                    let style = WuxStyles.GetByVariableName(styleVariableData.name);
                    let skills = style.skills.split(";");
                    for (let i = 0; i < skills.length; i++) {
                        let skill = skills[i].trim();
                        styleSkillDictionary.add(skill, 0);
                        Debug.Log(`Adding ${skill} to key skills`);
                    }
                });

                let styles = styleWorker.getStyles();
                for (let i = 0; i < styles.length; i++) {
                    let style = styles[i].style;
                    let skills = style.skills.split(";");
                    for (let i = 0; i < skills.length; i++) {
                        let skill = skills[i].trim();
                        styleSkillDictionary.add(skill, 0);
                        Debug.Log(`Adding ${skill} to key skills`);
                    }
                }

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

