var WuxWorkerGeneral = WuxWorkerGeneral || (function () {
    'use strict';

    var
        updateStats = function (attributeHandler, combatDetailsHandler) {
            Debug.Log("Update General Stats");
            let formulaDefinitions = WuxDef.Filter(new DatabaseFilterData("formulaMods", "CR"));
            
            let newFilter = WuxDef.Filter(new DatabaseFilterData("formulaMods", "Level"));
            formulaDefinitions = formulaDefinitions.concat(newFilter);
            
            newFilter = WuxDef.Filter(new DatabaseFilterData("group", "General"));
            formulaDefinitions = formulaDefinitions.concat(newFilter);
            
            newFilter = WuxDef.Filter(new DatabaseFilterData("group", "Combat"));
            formulaDefinitions = formulaDefinitions.concat(newFilter);
            
            newFilter = WuxDef.Filter(new DatabaseFilterData("group", "Social"));
            formulaDefinitions = formulaDefinitions.concat(newFilter);

            let healValueVar = WuxDef.GetVariable("Cmb_HV");
            let mvSpeedVar = WuxDef.GetVariable("Cmb_Mv");
            let mvDashVar = WuxDef.GetVariable("Cmb_MvDash");
            let surgeDef = WuxDef.Get("Surge");
            let vitalityDef = WuxDef.Get("Cmb_Vitality");
            let hpDef = WuxDef.Get("HP");
            let willDef = WuxDef.Get("WILL");
            let startEnDef = WuxDef.Get("StartEN");
            let roundEnDef = WuxDef.Get("RoundEN");
            let cmbHvDef = WuxDef.Get("Cmb_HV");
            let cmbMvDef = WuxDef.Get("Cmb_Mv");
            let cmbMvDashDef = WuxDef.Get("Cmb_MvDash");
            let crVar = WuxDef.GetVariable("CR");
            attributeHandler.addMod([healValueVar, mvSpeedVar, mvDashVar, crVar,
                surgeDef.getVariable(), surgeDef.getVariable(WuxDef._max),
                vitalityDef.getVariable(), vitalityDef.getVariable(WuxDef._max)]);

            for (let i = 0; i < formulaDefinitions.length; i++) {
                attributeHandler.addFormulaMods(formulaDefinitions[i]);
            }

            let perkDefName = WuxDef.Get("Perk").name;
            // Build-point-pool definitions (Skill/Job/Knowledge/Attribute/Perk/Technique)
            // all have formulas referencing CR (e.g. Technique's is "2;CR:_max;
            // AdvancementTechnique"), so they match the formulaMods=CR filter above and
            // land in formulaDefinitions alongside true stat fields like HP/EN. Their
            // base slot isn't a plain formula output though - it's "remaining points"
            // (max minus spent), maintained separately by each definition's own
            // WuxWorkerBuild.updatePoints()/setPointsMax() (see refreshStats in
            // Worker-Jobs.js/Worker-Styles.js/etc). Blindly overwriting it here with the
            // raw formula result (which computes the MAX, not the remainder) reset it to
            // "full" every time this ran - confirmed via diagnostic logging, this is what
            // was resetting the Style Points display after a job change (refreshStatEvaluations,
            // Worker-Jobs.js, calls this on every job equip). The existing perkDefName check
            // only ever excluded individual perks (whose own group is "Perk"), not this
            // whole class of definition, so it's extended here to name-match all of them.
            let buildPointPoolNames = ["Skill", "Job", "Knowledge", "Attribute", "Perk", "Technique"];
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                for (let i = 0; i < formulaDefinitions.length; i++) {
                    if (formulaDefinitions[i].group === perkDefName) { continue; }
                    if (buildPointPoolNames.includes(formulaDefinitions[i].name)) { continue; }
                    // Plain player-set fields with no formula at all (e.g. Soc_Personality/
                    // Soc_Motivation - selects the player picks once, not computed stats)
                    // still match the formulaMods=CR/Level or group=General/Combat/Social
                    // filters above if they merely happen to live in one of those groups.
                    // formula.getValue() on an empty formula returns 0, so leaving them in
                    // this loop silently reset every such field back to blank on every
                    // recompute (Level/Job/Attribute change, etc) - same class of bug as
                    // the buildPointPoolNames case above, just for fields with no formula
                    // at all rather than the wrong kind of formula.
                    if (!formulaDefinitions[i].formula.hasFormula()) { continue; }
                    if (formulaDefinitions[i].isResource) {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(WuxDef._max), formulaDefinitions[i].formula.getValue(attrHandler));
                    } else {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                    }
                }

                let crValue = attrHandler.parseInt(crVar);

                // Starting EN: average 5, above/below at a difference of 1, great at 2.
                let startEnValue = attrHandler.parseInt(startEnDef.getVariable());
                let startEnEvaluation = Format.EvaluateAgainstAverage(startEnValue, 5, true, 1, 2);
                attrHandler.addUpdate(startEnDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(startEnEvaluation));

                // EN Charge (RoundEN) always reads as average.
                attrHandler.addUpdate(roundEnDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(0));

                // Base Speed: average 4, above/below at a difference of 1, great at more than 3 (4).
                let mvSpeedValue = attrHandler.parseInt(mvSpeedVar);
                let mvSpeedEvaluation = Format.EvaluateAgainstAverage(mvSpeedValue, 4, true, 1, 4);
                attrHandler.addUpdate(cmbMvDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(mvSpeedEvaluation));

                // Dash Speed: same thresholds as Base Speed, average 2.
                attrHandler.addUpdate(cmbMvDashDef.getVariable(WuxDef._evaluation),
                    Format.EvaluationToAttrValue(Format.EvaluateAgainstAverage(attrHandler.parseInt(mvDashVar), 2, true, 1, 4)));

                // Regen Value: average 15 + CR*10, above/below at a difference of 10, great at 30.
                let healValue = attrHandler.parseInt(healValueVar);
                let healEvaluation = Format.EvaluateAgainstAverage(healValue, 15 + crValue * 10, true, 5 + crValue * 5, 5 + crValue * 10);
                attrHandler.addUpdate(cmbHvDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(healEvaluation));

                // HP: average 35 + CR*30, above/below at a difference of 10 + CR*10, great at 15 + CR*20.
                let hpValue = attrHandler.parseInt(hpDef.getVariable());
                let hpEvaluation = Format.EvaluateAgainstAverage(hpValue, 25 + crValue * 25, true, crValue * 10, 10 + crValue * 20);
                attrHandler.addUpdate(hpDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(hpEvaluation));

                // Willpower: average 25 + CR*15, above/below at a difference of 5 + CR*5, great at 10 + CR*10.
                let willValue = attrHandler.parseInt(willDef.getVariable());
                let willEvaluation = Format.EvaluateAgainstAverage(willValue, 25 + crValue * 15, true, 5 + crValue * 5, 10 + crValue * 10);
                attrHandler.addUpdate(willDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(willEvaluation));

                // Surge: average 3, above/below at a difference of 1, great at 2.
                let surgeValue = attrHandler.parseInt(surgeDef.getVariable());
                let surgeEvaluation = Format.EvaluateAgainstAverage(surgeValue, 3, true, 1, 2);
                attrHandler.addUpdate(surgeDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(surgeEvaluation));

                // Vitality: average 0, above/below at a difference of 1, great at 2.
                let vitalityValue = attrHandler.parseInt(vitalityDef.getVariable());
                let vitalityEvaluation = Format.EvaluateAgainstAverage(vitalityValue, 0, true, 1, 2);
                attrHandler.addUpdate(vitalityDef.getVariable(WuxDef._evaluation), Format.EvaluationToAttrValue(vitalityEvaluation));

                if (combatDetailsHandler != undefined) {
                    combatDetailsHandler.onUpdateHealValue(attrHandler, attrHandler.parseInt(healValueVar));
                    combatDetailsHandler.onUpdateMoveSpeedValue(attrHandler, attrHandler.parseInt(mvSpeedVar));
                    combatDetailsHandler.onUpdateDashSpeedValue(attrHandler, attrHandler.parseInt(mvDashVar));
                    combatDetailsHandler.onUpdateSurges(attrHandler, attrHandler.parseInt(surgeDef.getVariable()));
                    combatDetailsHandler.onUpdateMaxSurges(attrHandler, attrHandler.parseInt(surgeDef.getVariable(WuxDef._max)));
                    combatDetailsHandler.onUpdateVitality(attrHandler, attrHandler.parseInt(vitalityDef.getVariable()));
                    combatDetailsHandler.onUpdateMaxVitality(attrHandler, attrHandler.parseInt(vitalityDef.getVariable(WuxDef._max)));
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
        updateCharacterSheetName = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let spacesLessName = eventinfo.newValue.replace(/\s+/g, '');
                attrHandler.addUpdate("character_name", spacesLessName);
                attrHandler.addUpdate(WuxDef.GetVariable("CharSheetName"), spacesLessName);
                attrHandler.addUpdate(WuxDef.GetVariable("SheetName"), spacesLessName);
                attrHandler.addUpdate(WuxDef.GetVariable("DisplayName"), eventinfo.newValue);
                combatDetailsHandler.onUpdateDisplayName(attrHandler, eventinfo.newValue);
            });
            attributeHandler.run();
        },
        updateSheetName = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let spacesLessName = eventinfo.newValue.replace(/\s+/g, '');
                attrHandler.addUpdate("character_name", spacesLessName);
                attrHandler.addUpdate(WuxDef.GetVariable("SheetName"), spacesLessName);
            });
            attributeHandler.run();
        },
        updatePersonalityDescription = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let description = eventinfo.newValue === "0" ? "" : WuxDef.Get(eventinfo.newValue).descriptions[0];
                attrHandler.addUpdate(WuxDef.GetVariable("Soc_Personality", WuxDef._db), description);
            });
            attributeHandler.run();
        },
        updateMotivationDescription = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let description = eventinfo.newValue === "0" ? "" : WuxDef.Get(eventinfo.newValue).descriptions[0];
                attrHandler.addUpdate(WuxDef.GetVariable("Soc_Motivation", WuxDef._db), description);
            });
            attributeHandler.run();
        },
        updatePrimaryAffinity = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);

            // Opening the matching Magic filter category (and Special Magic, which always
            // opens alongside any elemental affinity) on the Actions page.
            let affinityMagicAutoFilterCategories = {
                Wood: "AutoFilter_WoodMagic",
                Fire: "AutoFilter_FireMagic",
                Earth: "AutoFilter_EarthMagic",
                Metal: "AutoFilter_MetalMagic",
                Water: "AutoFilter_WaterMagic"
            };
            let affinity = eventinfo.newValue;
            if (affinity != undefined && affinity !== "") {
                attributeHandler.addUpdate(WuxDef.Get("AutoFilter_SpecialMagic").getVariable(WuxDef._expand), "1");
                if (affinityMagicAutoFilterCategories.hasOwnProperty(affinity)) {
                    attributeHandler.addUpdate(WuxDef.Get(affinityMagicAutoFilterCategories[affinity]).getVariable(WuxDef._expand), "1");
                }
            }

            attributeHandler.run();
        },
        getTitleFromDefinitionName = function (name) {
            if (name == undefined || name === "" || name === "0") {
                return "";
            }
            return WuxDef.Get(name).title;
        },
        getDefinitionNameFromTitle = function (groupName, title) {
            if (title == undefined || title === "") {
                return "0";
            }
            let match = WuxDef.Filter([new DatabaseFilterData("group", groupName)]).find(definition => definition.title === title);
            return match != undefined ? match.name : "0";
        },
        generateCharacter = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let nameVar = WuxDef.GetVariable("DisplayName");
            let fullNameVar = WuxDef.GetVariable("FullName");
            let ethnicityVar = WuxDef.GetVariable("Ethnicity");
            let genderVar = WuxDef.GetVariable("Gender");
            let homeRegionVar = WuxDef.GetVariable("HomeRegion");
            let personalityVar = WuxDef.GetVariable("Soc_Personality");
            let motivationVar = WuxDef.GetVariable("Soc_Motivation");
            attributeHandler.addMod([nameVar, fullNameVar, ethnicityVar, genderVar, homeRegionVar, personalityVar, motivationVar]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let generator = new WuxingHumanCharacterGenerator();
                generator.character.firstName = attrHandler.parseString(nameVar);
                generator.character.fullName = attrHandler.parseString(fullNameVar);
                generator.character.ancestry = attrHandler.parseString(ethnicityVar);
                generator.character.gender = attrHandler.parseString(genderVar);
                generator.character.homeRegion = attrHandler.parseString(homeRegionVar);
                generator.character.personality = getTitleFromDefinitionName(attrHandler.parseString(personalityVar));
                generator.character.motivation = getTitleFromDefinitionName(attrHandler.parseString(motivationVar));
                generator.generateCharacter();
                attrHandler.addUpdate(WuxDef.GetVariable("Note_GenName"), generator.character.firstName);
                attrHandler.addUpdate(WuxDef.GetVariable("Note_GenFullName"), generator.character.fullName);
                attrHandler.addUpdate(WuxDef.GetVariable("Note_GenRace"), generator.character.ancestry);
                attrHandler.addUpdate(WuxDef.GetVariable("Note_GenGender"), generator.character.gender);
                attrHandler.addUpdate(WuxDef.GetVariable("Note_GenHomeRegion"), generator.character.homeRegion);
                attrHandler.addUpdate(WuxDef.GetVariable("Note_GenPersonality"), generator.character.personality);
                attrHandler.addUpdate(WuxDef.GetVariable("Note_GenMotivation"), generator.character.motivation);
            });
            attributeHandler.run();

        },
        useGeneration = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let nameVar = WuxDef.GetVariable("Note_GenName");
            let fullNameVar = WuxDef.GetVariable("Note_GenFullName");
            let genderVar = WuxDef.GetVariable("Note_GenGender");
            let homeRegionVar = WuxDef.GetVariable("Note_GenHomeRegion");
            let raceVar = WuxDef.GetVariable("Note_GenRace");
            let personalityVar = WuxDef.GetVariable("Note_GenPersonality");
            let motivationVar = WuxDef.GetVariable("Note_GenMotivation");
            attributeHandler.addMod([nameVar, fullNameVar, genderVar, homeRegionVar, raceVar, personalityVar, motivationVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate("character_name", attrHandler.parseString(nameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("SheetName"), attrHandler.parseString(nameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("DisplayName"), attrHandler.parseString(nameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("FullName"), attrHandler.parseString(fullNameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("Gender"), attrHandler.parseString(genderVar));
                attrHandler.addUpdate(WuxDef.GetVariable("HomeRegion"), attrHandler.parseString(homeRegionVar));
                attrHandler.addUpdate(WuxDef.GetVariable("Ethnicity"), attrHandler.parseString(raceVar));

                let personalityName = getDefinitionNameFromTitle("PersonalityType", attrHandler.parseString(personalityVar));
                let motivationName = getDefinitionNameFromTitle("MotivationType", attrHandler.parseString(motivationVar));
                attrHandler.addUpdate(WuxDef.GetVariable("Soc_Personality"), personalityName);
                attrHandler.addUpdate(WuxDef.GetVariable("Soc_Motivation"), motivationName);
                attrHandler.addUpdate(WuxDef.GetVariable("Soc_Personality", WuxDef._db), personalityName === "0" ? "" : WuxDef.Get(personalityName).descriptions[0]);
                attrHandler.addUpdate(WuxDef.GetVariable("Soc_Motivation", WuxDef._db), motivationName === "0" ? "" : WuxDef.Get(motivationName).descriptions[0]);
            });
            attributeHandler.run();
        },
        clearBackground = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate(WuxDef.GetVariable("SheetName"), "");
                attrHandler.addUpdate(WuxDef.GetVariable("DisplayName"), "");
                attrHandler.addUpdate(WuxDef.GetVariable("FullName"), "");
                attrHandler.addUpdate(WuxDef.GetVariable("Gender"), "");
                attrHandler.addUpdate(WuxDef.GetVariable("HomeRegion"), "");
            });
            attributeHandler.run();
        },
        backgroundExportFields = [
            "Title_IsPlayer", "CharSheetName", "SheetName", "DisplayName", "FullName", "Ancestry", "Ethnicity",
            "AffinityAspect", "QuickDescription", "Title", "Age", "Gender", "HomeRegion", "Backstory",
            "Level", "Potency", "Jin",
            "Note_GenName", "Note_GenFullName", "Note_GenGender", "Note_GenHomeRegion", "Note_GenRace",
            "Note_GenPersonality", "Note_GenMotivation"
        ],

        // Temporary bulk-data tool: snapshots this character's background/origin fields,
        // core Attribute scores, selected Skills, and each Outfit's already-computed emote
        // JSON into the (otherwise unused) base Backstory attribute, so it can be
        // copied out and pasted into another character's Backstory field to bulk-
        // apply the same data (see importBackgroundData).
        exportBackgroundData = function () {
            let attributeHandler = new WorkerAttributeHandler();

            let backgroundVars = backgroundExportFields.map(name => WuxDef.GetVariable(name));
            let crMaxVar = WuxDef.GetVariable("CR", WuxDef._max);
            attributeHandler.addMod(backgroundVars);
            attributeHandler.addMod(crMaxVar);

            let attributeDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Attribute"));
            attributeHandler.addMod(attributeDefinitions.map(definition => definition.getVariable()));

            let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
            for (let skillDefinition of skillDefinitions) {
                attributeHandler.addMod([skillDefinition.getVariable(WuxDef._rank), skillDefinition.getVariable(WuxDef._expertise)]);
            }

            let outfitEmotesVar = WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true);
            attributeHandler.addRepeatingSection("RepeatingOutfits");
            let outfitRepeater = attributeHandler.getRepeatingSection("RepeatingOutfits");
            outfitRepeater.addFieldNames([outfitEmotesVar]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                // Without a Full Name, an exported snapshot pasted into another
                // character would be indistinguishable from that character's own
                // (never-exported) blank state - skip the export entirely rather
                // than write a Backstory payload that looks like a real snapshot.
                if (attrHandler.parseString(WuxDef.GetVariable("FullName")) === "") {
                    return;
                }

                let backgroundData = {};
                for (let i = 0; i < backgroundExportFields.length; i++) {
                    backgroundData[backgroundExportFields[i]] = attrHandler.parseString(backgroundVars[i]);
                }
                backgroundData["CR_max"] = attrHandler.parseString(crMaxVar);

                let attributeData = {};
                for (let definition of attributeDefinitions) {
                    attributeData[definition.name] = attrHandler.parseString(definition.getVariable());
                }

                let skillData = [];
                for (let skillDefinition of skillDefinitions) {
                    if (attrHandler.parseString(skillDefinition.getVariable(WuxDef._rank)) === "on") {
                        skillData.push({
                            name: skillDefinition.name,
                            expertise: attrHandler.parseString(skillDefinition.getVariable(WuxDef._expertise)) === "on"
                        });
                    }
                }

                let outfitData = [];
                outfitRepeater.iterate(function (id) {
                    let raw = attrHandler.parseString(outfitRepeater.getFieldName(id, outfitEmotesVar));
                    if (raw !== "") {
                        try { outfitData.push(JSON.parse(raw)); } catch (e) { /* skip malformed row */ }
                    }
                });

                let exportData = {
                    background: backgroundData,
                    attributes: attributeData,
                    skills: skillData,
                    outfits: outfitData
                };
                attrHandler.addUpdate(WuxDef.GetVariable("Backstory"), JSON.stringify(exportData));
            });

            attributeHandler.run();
        },

        // Fires when Backstory is set by hand (e.g. pasting a snapshot copied from
        // exportBackgroundData on another character). Silent worker writes never trigger
        // this listener, so it only reacts to a genuine manual paste, not the export itself.
        importBackgroundData = async function (eventinfo) {
            let importData;
            try {
                importData = JSON.parse(eventinfo.newValue);
            } catch (e) {
                return;
            }
            if (importData == null || typeof importData !== "object") {
                return;
            }

            let attributeHandler = new WorkerAttributeHandler();

            if (importData.background != undefined) {
                for (let key of backgroundExportFields) {
                    if (importData.background[key] != undefined) {
                        attributeHandler.addUpdate(WuxDef.GetVariable(key), importData.background[key]);
                    }
                }
                if (importData.background["CR_max"] != undefined) {
                    attributeHandler.addUpdate(WuxDef.GetVariable("CR", WuxDef._max), importData.background["CR_max"]);
                }
            }

            // Besides writing the raw scores/ranks directly (below), also fold the same
            // changes into the Attribute/Skill build workers' own draft bookkeeping, the
            // same way changeWorkerAttribute() would per-field on a normal edit - otherwise
            // their "points spent vs max" tracking goes stale against the imported values.
            let attributeWorker = new WuxAttributeWorkerBuild();
            let skillWorker = new WuxSkillWorkerBuild();
            attributeHandler.addMod([attributeWorker.attrMax, attributeWorker.attrBuildDraft,
                skillWorker.attrMax, skillWorker.attrBuildDraft]);

            if (importData.attributes != undefined) {
                for (let key of Object.keys(importData.attributes)) {
                    let definition = WuxDef.Get(key);
                    if (definition != undefined) {
                        attributeHandler.addUpdate(definition.getVariable(), importData.attributes[key]);
                    }
                }
            }

            if (Array.isArray(importData.skills)) {
                let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
                for (let skillDefinition of skillDefinitions) {
                    attributeHandler.addUpdate(skillDefinition.getVariable(WuxDef._rank), "0");
                    attributeHandler.addUpdate(skillDefinition.getVariable(WuxDef._expertise), "0");
                }
                for (let skillEntry of importData.skills) {
                    let skillDefinition = WuxDef.Get(skillEntry.name);
                    if (skillDefinition != undefined) {
                        attributeHandler.addUpdate(skillDefinition.getVariable(WuxDef._rank), "on");
                        if (skillEntry.expertise) {
                            attributeHandler.addUpdate(skillDefinition.getVariable(WuxDef._expertise), "on");
                        }
                    }
                }
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                if (importData.attributes != undefined) {
                    attributeWorker.setBuildStatsDraft(attrHandler);
                    for (let key of Object.keys(importData.attributes)) {
                        let definition = WuxDef.Get(key);
                        if (definition != undefined) {
                            attributeWorker.addBuildStat(attrHandler, definition.getVariable(), importData.attributes[key]);
                        }
                    }
                    attrHandler.addUpdate(attributeWorker.attrBuildDraft, JSON.stringify(attributeWorker.buildStats));
                    attributeWorker.updatePoints(attrHandler);
                }

                if (Array.isArray(importData.skills)) {
                    let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
                    skillWorker.setBuildStatsDraft(attrHandler);
                    for (let skillDefinition of skillDefinitions) {
                        skillWorker.addBuildStat(attrHandler, skillDefinition.getVariable(WuxDef._rank), "0");
                        skillWorker.addBuildStat(attrHandler, skillDefinition.getVariable(WuxDef._expertise), "0");
                    }
                    for (let skillEntry of importData.skills) {
                        let skillDefinition = WuxDef.Get(skillEntry.name);
                        if (skillDefinition != undefined) {
                            skillWorker.addBuildStat(attrHandler, skillDefinition.getVariable(WuxDef._rank), "on");
                            if (skillEntry.expertise) {
                                skillWorker.addBuildStat(attrHandler, skillDefinition.getVariable(WuxDef._expertise), "on");
                            }
                        }
                    }
                    attrHandler.addUpdate(skillWorker.attrBuildDraft, JSON.stringify(skillWorker.buildStats));
                    skillWorker.updatePoints(attrHandler);
                }
            });

            let firstImportedOutfitId;
            let firstImportedOutfitEmotes;
            if (Array.isArray(importData.outfits)) {
                let outfitRepeater = new WorkerRepeatingSectionHandler("RepeatingOutfits");
                for (let outfitEmotes of importData.outfits) {
                    let rowId = outfitRepeater.generateRowId();
                    if (firstImportedOutfitId == undefined) {
                        firstImportedOutfitId = rowId;
                        firstImportedOutfitEmotes = outfitEmotes;
                    }
                    attributeHandler.addUpdate(outfitRepeater.getFieldName(rowId, WuxDef.GetVariable("Chat_OutfitName")), outfitEmotes.name || "");
                    attributeHandler.addUpdate(outfitRepeater.getFieldName(rowId, WuxDef.GetVariable("Chat_OutfitEmotes")), JSON.stringify(outfitEmotes));
                    attributeHandler.addUpdate(outfitRepeater.getFieldName(rowId, WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true)), JSON.stringify(outfitEmotes));
                }
            }

            WuxWorkerSkills.UpdateStats(attributeHandler);
            WuxWorkerAttributes.UpdateStats(attributeHandler);
            await attributeHandler.run();

            // Level and Affinity each have their own derived side effects (CR/Training
            // draft, combat details, magic auto-filters) that a plain attribute write
            // wouldn't trigger - run their direct variants now that the base import above
            // has landed, then refresh the action list once everything has settled.
            if (importData.background != undefined) {
                if (importData.background["Level"] != undefined) {
                    await WuxWorkerAdvancement.SetLevelDirect(importData.background["Level"]);
                }
                if (importData.background["AffinityAspect"] != undefined) {
                    WuxWorkerCharacterCreation.SetAffinityValueDirect(importData.background["AffinityAspect"]);
                }
            }
            if (firstImportedOutfitId != undefined) {
                // Use the outfit data already in hand rather than SelectOutfitDirect,
                // which would re-read it back from RepeatingOutfits - a brand new
                // repeating row (just created above) is not guaranteed to be visible
                // to a freshly issued getSectionIDs() call yet.
                await WuxWorkerChat.SelectOutfitWithData(firstImportedOutfitId, new EmoteSetData(firstImportedOutfitEmotes));
            }
            WuxWorkerActions.TriggerBuilderActionUpdate();
        },
        updatePerkMaxRanks = function (attributeHandler) {
            Debug.Log(`Updating Perk Max Ranks`);
            let perkEntries = [];
            WuxPerks.Iterate(function (perk) {
                let perkInstance = new PerkData(perk);
                perkEntries.push({ instance: perkInstance, def: perkInstance.createDefinition(WuxDef.Get("Perk")) });
            });
            perkEntries.forEach(entry => attributeHandler.addMod(entry.instance.maxRank.getAttributes()));
            attributeHandler.addMod(WuxDef.GetVariable("CR", WuxDef._max));
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                perkEntries.forEach(entry => {
                    if (entry.instance.maxRank.hasFormula()) {
                        Debug.Log(`Updating Perk ${entry.instance.name} Max Rank to ${entry.instance.maxRank.getValue(attrHandler)}`);
                        attrHandler.addUpdate(entry.def.getVariable(WuxDef._max), entry.instance.maxRank.getValue(attrHandler));
                    }
                });
            });
        },
        updateCR = function (eventinfo) {
            Debug.Log("Updating CR");
            let cr = parseInt(eventinfo.newValue);
            let loader = new LoadingScreenHandler();
            loader.showLoadingScreen(() => {
                let attributeHandler = new WorkerAttributeHandler();
                let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

                WuxWorkerSkills.UpdateStats(attributeHandler);
                WuxWorkerKnowledges.UpdateStats(attributeHandler);
                WuxWorkerActions.UpdateVisibilityOfFormeActions(attributeHandler);
                updateStats(attributeHandler, combatDetailsHandler);
                updatePerkMaxRanks(attributeHandler);

                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    combatDetailsHandler.onUpdateCR(attrHandler, cr);
                });
                attributeHandler.addFinishCallback(() => {
                    loader.hideLoadingScreen();
                });
                attributeHandler.run();
            });
        },
        updateSurge = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
            let value = parseInt(eventinfo.newValue);
            combatDetailsHandler.onUpdateSurges(attributeHandler, value);
            attributeHandler.run();
        },
        updateVitality = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
            let value = parseInt(eventinfo.newValue);
            combatDetailsHandler.onUpdateVitality(attributeHandler, value);
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
            let attributeHandler = new WorkerAttributeHandler();
            let nameFieldName = WuxDef.GetVariable("Popup_PopupName");
            attributeHandler.addMod(nameFieldName);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                switch (attrHandler.parseString(nameFieldName)) {
                    case WuxDef.GetTitle("Popup_ItemInspectionName"):
                    case WuxDef.GetTitle("Popup_EquipmentInspectionName"):
                    case WuxDef.GetTitle("Popup_ConsumablesInspectionName"):
                    case WuxDef.GetTitle("Popup_GearInspectionName"):
                    case WuxDef.GetTitle("Popup_TechniqueInspectionName"):
                    case WuxDef.GetTitle("Popup_PerkInspectionName"):
                    case WuxDef.GetTitle("Popup_GoodsInspectionName"):
                        WuxWorkerInspectPopup.Close();
                        break;
                    case WuxDef.GetTitle("Popup_FilterTechniquePopupName"):
                    case WuxDef.GetTitle("Popup_CustomStylesFilterName"):
                        WuxWorkerFilterPopup.Close();
                        break;
                }
            });
            attributeHandler.run();
        }
        
    return {
        UpdatePerkMaxRanks: updatePerkMaxRanks,
        UpdateStats: updateStats,
        UpdateDisplayName: updateDisplayName,
        UpdateCharacterSheetName: updateCharacterSheetName,
        UpdateSheetName: updateSheetName,
        UpdatePersonalityDescription: updatePersonalityDescription,
        UpdateMotivationDescription: updateMotivationDescription,
        UpdatePrimaryAffinity: updatePrimaryAffinity,
        GenerateCharacter: generateCharacter,
        UseGeneration: useGeneration,
        ClearBackground: clearBackground,
        ExportBackgroundData: exportBackgroundData,
        ImportBackgroundData: importBackgroundData,
        UpdateCR: updateCR,
        UpdateSurge: updateSurge,
        UpdateVitality: updateVitality,
        OpenSubMenu: openSubMenu,
        CloseSubMenu: closeSubMenu,
        ClosePopup: closePopup
    };
}());

