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
            WuxWorkerActions.TriggerBuilderActionUpdate();
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
        
        // Skills whose training should auto-open the matching Actions page filter category.
        // Any Skill with subGroup Persuade/Cunning is treated as a Social skill.
        skillAutoFilterCategories = {
            Martial: "AutoFilter_MeleeWeapons",
            Aim: "AutoFilter_RangedWeapons",
            Physique: "AutoFilter_Athletics",
            Agility: "AutoFilter_Athletics"
        },
        socialSkillSubGroups = ["Persuade", "Cunning"],

        updateStats = function (attributeHandler) {
            let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
            for (let i = 0; i < skillDefinitions.length; i++) {
                attributeHandler.addFormulaMods(skillDefinitions[i]);
                attributeHandler.addMod([skillDefinitions[i].getVariable(WuxDef._rank),
                    skillDefinitions[i].getVariable(WuxDef._expertise)]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let skillExpertiseDef = WuxDef.Get("SkillExpertise");
                let crValue = attrHandler.parseInt(WuxDef.GetVariable("CR"));
                let trainingBonus = 2 + crValue;
                let averageSkillValue = 1 + crValue;

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

                        let autoFilterCategory = skillAutoFilterCategories[skillDefinition.title]
                            || (socialSkillSubGroups.includes(skillDefinition.subGroup) ? "AutoFilter_Social" : undefined);
                        if (autoFilterCategory != undefined) {
                            attrHandler.addUpdate(WuxDef.Get(autoFilterCategory).getVariable(WuxDef._expand), "1");
                        }
                    }
                    attrHandler.addUpdate(skillDefinition.getVariable(WuxDef._max), skillPointValueNoCr);
                    attrHandler.addUpdate(skillDefinition.getVariable(), skillPointValue);
                    attrHandler.addUpdate(skillDefinition.getVariable(WuxDef._info), skillInfo.join(`\n`));
                    // Skills never read as below average - anything under average still shows as average.
                    let skillEvaluation = Format.EvaluateAgainstAverage(skillPointValue, averageSkillValue, false);
                    let skillEvaluationVar = skillDefinition.getVariable(WuxDef._evaluation);
                    attrHandler.addUpdate(skillEvaluationVar, Format.EvaluationToAttrValue(skillEvaluation));
                });
            });
        },
        
        // Mirrors FormeTechniqueDatabase.checkTechniqueItemTraits (Worker-Actions.js) -
        // a learned technique whose required gear trait (e.g. Bow, Longshot) isn't
        // currently equipped isn't actually usable, so it shouldn't count toward key
        // skills on its own. Kept as a free function here (rather than reusing that
        // class) since FormeTechniqueDatabase pulls in a lot of unrelated
        // affinity/job-style/filter setup this doesn't need.
        checkTechniqueItemTraits = function (technique, equippedItemTraits) {
            if (!technique.itemTraits || technique.itemTraits === "") return true;
            let requiredTraits = technique.itemTraits.split(";").map(s => s.trim()).filter(s => s !== "");
            if (requiredTraits.length === 0) return true;
            return requiredTraits.every(traitKey => {
                let def = WuxDef.Get(traitKey);
                if (def == undefined) return false;
                return equippedItemTraits.includes(def.getTitle());
            });
        },

        getKeySkillTitles = function (jobWorker, styleWorker, equippedItemTraits) {
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
                        keySkillTitles.add(skill);
                    }
                }
            });

            let techniques = styleWorker.getTechniques();
            for (let i = 0; i < techniques.length; i++) {
                if (!checkTechniqueItemTraits(techniques[i], equippedItemTraits)) {
                    continue;
                }
                let skill = techniques[i].skill.trim();
                if (skill) {
                    keySkillTitles.add(skill);
                }
            }

            return keySkillTitles;
        },

        updateKeySkills = function (attributeHandler) {
            let jobWorker = new WuxBasicWorkerBuild("Job");
            let styleWorker = new WuxStyleWorkerBuild();
            let equippedItemTraitsVar = WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max);
            attributeHandler.addMod([jobWorker.attrBuildDraft, styleWorker.attrBuildDraft, equippedItemTraitsVar]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                jobWorker.setBuildStatsDraft(attrHandler);
                styleWorker.setBuildStatsDraft(attrHandler);

                let equippedItemTraits = [];
                try { equippedItemTraits = JSON.parse(attrHandler.parseString(equippedItemTraitsVar)); } catch (e) {}
                if (!Array.isArray(equippedItemTraits)) equippedItemTraits = [];

                let keySkillTitles = getKeySkillTitles(jobWorker, styleWorker, equippedItemTraits);

                let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
                for (let i = 0; i < skillDefinitions.length; i++) {
                    let isKeySkill = keySkillTitles.has(skillDefinitions[i].title);
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

