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
            let armorDefVar = WuxDef.GetVariable("Cmb_Armor");
            let mvSpeedVar = WuxDef.GetVariable("Cmb_Mv");
            let mvDashVar = WuxDef.GetVariable("Cmb_MvDash");
            let surgeDef = WuxDef.Get("Surge");
            let vitalityDef = WuxDef.Get("Cmb_Vitality");
            let hpDef = WuxDef.Get("HP");
            let willDef = WuxDef.Get("WILL");
            let startEnDef = WuxDef.Get("StartEN");
            let roundEnDef = WuxDef.Get("RoundEN");
            let cmbHvDef = WuxDef.Get("Cmb_HV");
            let cmbArmorDef = WuxDef.Get("Cmb_Armor");
            let cmbMvDef = WuxDef.Get("Cmb_Mv");
            let cmbMvDashDef = WuxDef.Get("Cmb_MvDash");
            let crVar = WuxDef.GetVariable("CR");
            attributeHandler.addMod([healValueVar, armorDefVar, mvSpeedVar, mvDashVar, crVar,
                surgeDef.getVariable(), surgeDef.getVariable(WuxDef._max),
                vitalityDef.getVariable(), vitalityDef.getVariable(WuxDef._max)]);

            for (let i = 0; i < formulaDefinitions.length; i++) {
                attributeHandler.addFormulaMods(formulaDefinitions[i]);
            }

            let perkDefName = WuxDef.Get("Perk").name;
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                for (let i = 0; i < formulaDefinitions.length; i++) {
                    if (formulaDefinitions[i].group === perkDefName) { continue; }
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
                attrHandler.addUpdate(startEnDef.getVariable(WuxDef._evaluation), startEnEvaluation);

                // EN Charge (RoundEN) always reads as average.
                attrHandler.addUpdate(roundEnDef.getVariable(WuxDef._evaluation), 0);

                // Base Speed: average 4, above/below at a difference of 1, great at more than 3 (4).
                let mvSpeedValue = attrHandler.parseInt(mvSpeedVar);
                let mvSpeedEvaluation = Format.EvaluateAgainstAverage(mvSpeedValue, 4, true, 1, 4);
                attrHandler.addUpdate(cmbMvDef.getVariable(WuxDef._evaluation), mvSpeedEvaluation);

                // Dash Speed: same thresholds as Base Speed, average 2.
                attrHandler.addUpdate(cmbMvDashDef.getVariable(WuxDef._evaluation),
                    Format.EvaluateAgainstAverage(attrHandler.parseInt(mvDashVar), 2, true, 1, 4));

                // Regen Value: average 15 + CR*10, above/below at a difference of 10, great at 30.
                let healValue = attrHandler.parseInt(healValueVar);
                let healEvaluation = Format.EvaluateAgainstAverage(healValue, 15 + crValue * 10, true, 5 + crValue * 5, 5 + crValue * 10);
                attrHandler.addUpdate(cmbHvDef.getVariable(WuxDef._evaluation), healEvaluation);

                // Armor: average CR, never below average, above at +CR, great at +CR*2.
                let armorValue = attrHandler.parseInt(armorDefVar);
                let armorEvaluation = Format.EvaluateAgainstAverage(armorValue, crValue, false, crValue, crValue * 2);
                attrHandler.addUpdate(cmbArmorDef.getVariable(WuxDef._evaluation), armorEvaluation);

                // HP: average 35 + CR*30, above/below at a difference of 10 + CR*10, great at 15 + CR*20.
                let hpValue = attrHandler.parseInt(hpDef.getVariable());
                let hpEvaluation = Format.EvaluateAgainstAverage(hpValue, 25 + crValue * 25, true, crValue * 10, 20 + crValue * 20);
                attrHandler.addUpdate(hpDef.getVariable(WuxDef._evaluation), hpEvaluation);

                // Willpower: average 25 + CR*15, above/below at a difference of 5 + CR*5, great at 10 + CR*10.
                let willValue = attrHandler.parseInt(willDef.getVariable());
                let willEvaluation = Format.EvaluateAgainstAverage(willValue, 25 + crValue * 15, true, 5 + crValue * 5, 10 + crValue * 10);
                attrHandler.addUpdate(willDef.getVariable(WuxDef._evaluation), willEvaluation);

                // Surge: average 3, above/below at a difference of 1, great at 2.
                let surgeValue = attrHandler.parseInt(surgeDef.getVariable());
                let surgeEvaluation = Format.EvaluateAgainstAverage(surgeValue, 3, true, 1, 2);
                attrHandler.addUpdate(surgeDef.getVariable(WuxDef._evaluation), surgeEvaluation);

                // Vitality: average 0, above/below at a difference of 1, great at 2.
                let vitalityValue = attrHandler.parseInt(vitalityDef.getVariable());
                let vitalityEvaluation = Format.EvaluateAgainstAverage(vitalityValue, 0, true, 1, 2);
                attrHandler.addUpdate(vitalityDef.getVariable(WuxDef._evaluation), vitalityEvaluation);

                if (combatDetailsHandler != undefined) {
                    combatDetailsHandler.onUpdateHealValue(attrHandler, attrHandler.parseInt(healValueVar));
                    combatDetailsHandler.onUpdateArmorValue(attrHandler, attrHandler.parseInt(armorDefVar));
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
        UpdateCR: updateCR,
        UpdateSurge: updateSurge,
        UpdateVitality: updateVitality,
        OpenSubMenu: openSubMenu,
        CloseSubMenu: closeSubMenu,
        ClosePopup: closePopup
    };
}());

