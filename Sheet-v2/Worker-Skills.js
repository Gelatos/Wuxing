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
        
        getKeySkillTitles = function (jobWorker, styleWorker) {
            let keySkillTitles = new Set();

            jobWorker.iterateBuildStats(function (styleVariableData) {
                if (styleVariableData.value == null || styleVariableData.value <= 0) {
                    return;
                }
                let style = WuxStyles.GetByVariableName(styleVariableData.name);
                if (style == undefined) return;
                let skills = style.skills.split(";");
                for (let i = 0; i < skills.length; i++) {
                    let skill = skills[i].trim();
                    if (skill) {
                        Debug.Log(`Adding ${skill} to key skills`);
                        keySkillTitles.add(skill);
                    }
                }
            });

            let techniques = styleWorker.getTechniques();
            for (let i = 0; i < techniques.length; i++) {
                let skill = techniques[i].skill.trim();
                if (skill) {
                    Debug.Log(`Adding ${skill} to key skills`);
                    keySkillTitles.add(skill);
                }
            }

            return keySkillTitles;
        },

        updateKeySkills = function (attributeHandler) {
            let jobWorker = new WuxBasicWorkerBuild("Job");
            let styleWorker = new WuxStyleWorkerBuild();
            attributeHandler.addMod([jobWorker.attrBuildDraft, styleWorker.attrBuildDraft]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                jobWorker.setBuildStatsDraft(attrHandler);
                styleWorker.setBuildStatsDraft(attrHandler);

                let keySkillTitles = getKeySkillTitles(jobWorker, styleWorker);

                let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
                for (let i = 0; i < skillDefinitions.length; i++) {
                    let isKeySkill = keySkillTitles.has(skillDefinitions[i].title);
                    if (isKeySkill) {
                        Debug.Log(`Found ${skillDefinitions[i].title} as a skill in key skills`);
                    }
                    attrHandler.addUpdate(
                        skillDefinitions[i].getVariable(WuxDef._learn),
                        isKeySkill ? "on" : "0");
                }
            });
        }

    return {
        UpdateBuildPoints: updateBuildPoints,
        RefreshStats: refreshStats,
        UpdateStats: updateStats,
        UpdateKeySkills: updateKeySkills,
        GetKeySkillTitles: getKeySkillTitles
    };
}());

