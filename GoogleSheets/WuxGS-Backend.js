// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

var WuxSheetBackend = WuxSheetBackend || (function () {
    'use strict';

    const onChange = function (variables, contents, hasEvents) {
            let output = "";
            for (let i = 0; i < variables.length; i++) {
                if (output != "") {
                    output += " ";
                }
                output += `change:${variables[i]}`;
            }
            return `on("${output}", function (${hasEvents != undefined ? "eventinfo" : ""}) {\n${contents}\n});\n`;

            // return `on("${output}", function (eventinfo) {
            // if(eventinfo.sourceType === "sheetworker") return;
            // ${contents}
            // });\n`;
        }
    ;
    const onRemove = function (variables, contents) {
            let output = "";
            for (let i = 0; i < variables.length; i++) {
                if (output != "") {
                    output += " ";
                }
                output += `remove:${variables[i]}`;
            }
            return `on("${output}", function (eventinfo) {\n${contents}\n});\n`;
        }
    ;
    return {
        OnChange: onChange,
        OnRemove: onRemove
    };
}());

var BuilderBackend = BuilderBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerCharacterCreationFinishButton();
            output += listenerCharacterCreationNextSection();
            output += listenerCharacterCreationSetAffinity();
            output += listenerCharacterCreationBonusAttributes();
            output += listenerUpdateStyleBuildPoints();
            output += listenerSeeStyleTechniques();
            return output;
        },

        listenerCharacterCreationFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Character Creator", WuxDef._finish)];
            let output = `WuxWorkerCharacterCreation.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationNextSection = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_NextSection")];
            let output = `WuxWorkerCharacterCreation.GoToNextSection();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationSetAffinity = function () {
            let groupVariableNames = [
                WuxDef.GetVariable("AffinityAspect"),
                WuxDef.GetVariable("AdvancedAffinity")];
            let output = `WuxWorkerCharacterCreation.SetAffinityValue(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationBonusAttributes = function () {
            let groupVariableNames = [WuxDef.GetVariable("BonusAttributePoints")];
            let output = `WuxWorkerCharacterCreation.SetBonusAttributes();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },

        listenerUpdateStyleBuildPoints = function () {
            let allStyles = WuxDef.Filter([new DatabaseFilterData("group", "Style")]);
            let groupVariableNames = [];
            for(let i = 0; i < allStyles.length; i++) {
                groupVariableNames = groupVariableNames.concat(
                    WuxTechs.GetGroupVariables(new DatabaseFilterData("style", allStyles[i].getTitle())));
            }
        
            let output = "";
            output += WuxSheetBackend.OnChange(groupVariableNames,`WuxWorkerStyles.UpdateBuildPoints(eventinfo, 1)`, true);
            return output;
        },
        listenerSeeStyleTechniques = function () {
            let allStyles = WuxDef.Filter([new DatabaseFilterData("group", "Style")]);
            let groupVariableNames = [];
            for(let i = 0; i < allStyles.length; i++) {
                groupVariableNames = groupVariableNames.concat(
                    WuxTechs.GetGroupVariables(new DatabaseFilterData("style", allStyles[i].getTitle()), WuxDef._info));
            }
            let output = `WuxWorkerStyles.SeeTechniques(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
        

    return {
        Print: print
    }
}())

var TrainingBackend = TrainingBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";

            output += listenerTrainingGoToPageSet();
            output += listenerTrainingFinishButton();
            output += listenerTrainingExitButton();
            output += listenerConvertPp();
            output += listenerSetTrainingPoints();
            output += listenerSetTrainingPointsUpdate();
            output += listenerSetAdvancementKnowledgePoints();
            output += listenerUpdateKnowledgeBuildPoints();
            output += listenerRemoveLoreSpecialization();
            output += listenerUpdateLoreDescription();
            return output;

        },
        listenerTrainingGoToPageSet = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_Training")];
            let output = `WuxWorkerTraining.GoToPageSet();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerTrainingFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._finish)];
            let output = `WuxWorkerTraining.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerTrainingExitButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._exit)];
            let output = `WuxWorkerTraining.ExitBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerConvertPp = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_TrainingConversion")];
            let output = `WuxWorkerTraining.ConvertPp();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetTrainingPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("BonusTraining")];
            let output = `WuxWorkerAdvancement.SetBonusTrainingAdvancementPoints();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetTrainingPointsUpdate = function () {
            let groupVariableNames = [WuxDef.GetVariable("TrainingTechniques")];
            let output = `WuxWorkerTraining.SetTrainingPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementKnowledgePoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("TrainingKnowledge")];
            let output = `WuxWorkerAdvancement.SetAdvancementPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateKnowledgeBuildPoints = function () {
            let loreRepeaterIds = [
                "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
                "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
            ];
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Language"), WuxDef._rank);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "LoreCategory"), WuxDef._rank));
            for (let i = 0; i < loreRepeaterIds.length; i++) {
                groupVariableNames.push(`${WuxDef.GetVariable(loreRepeaterIds[i])}:${WuxDef.GetVariable("Lore_Tier")}`);
            }
            let output = `WuxWorkerKnowledges.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerRemoveLoreSpecialization = function () {
            const loreRepeaterIds = [
                "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
                "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
            ];
            let repeaterVarNames = loreRepeaterIds.map(id => WuxDef.GetVariable(id));
            let output = `WuxWorkerKnowledges.UpdateBuildPoints(eventinfo)`;
            return WuxSheetBackend.OnRemove(repeaterVarNames, output);
        },

        listenerUpdateLoreDescription = function () {
            const loreRepeaterIds = [
                "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
                "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
            ];
            let groupVariableNames = [];
            for (let i = 0; i < loreRepeaterIds.length; i++) {
                groupVariableNames.push(`${WuxDef.GetVariable(loreRepeaterIds[i])}:${WuxDef.GetVariable("Lore_SubType")}`);
            }
            let output = `WuxWorkerKnowledges.SetLoreDescription(eventinfo)`;
            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}())

var AdvancementBackend = AdvancementBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerGoToPageSet();
            output += listenerFinishButton();
            output += listenerExitButton();
            output += listenerConvertXp();
            output += listenerSetLevel();
            output += listenerSetAdvancementPoints();
            output += listenerSetAdvancementPerkTransferPoints();
            output += listenerSetAdvancementJobSkillPerkPoints();
            output += listenerUpdatePerkPoints();
            output += listenerUpdateSecondAffinityBranch();
            output += listenerPerkAutoFilterButtons();
            output += listenerSetIsPlayer();
            output += listenerUpdateJobBuildPoints();
            output += listenerSeeJobTechniques();
            output += listenerUpdateSkillBuildPoints();
            output += listenerUpdateAttributeBuildPoints();

            return output;
        },
        listenerGoToPageSet = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_Advancement")];
            let output = `WuxWorkerAdvancement.GoToPageSet();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._finish)];
            let output = `WuxWorkerAdvancement.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerExitButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._exit)];
            let output = `WuxWorkerAdvancement.ExitBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerConvertXp = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_AdvancementConversion")];
            let output = `WuxWorkerAdvancement.ConvertXp();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetLevel = function () {
            let groupVariableNames = [WuxDef.GetVariable("Level")];
            let output = `WuxWorkerAdvancement.SetLevel(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementTechnique")];
            let output = `WuxWorkerAdvancement.SetAdvancementPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementJobSkillPerkPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementJob"),
                WuxDef.GetVariable("AdvancementSkill")];
            let output = `WuxWorkerPerks.SetJobSkillPerkPoints(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementPerkTransferPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementPerkTransfer")];
            let output = `WuxWorkerAdvancement.SetAdvancementPerkTransferPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdatePerkPoints = function () {
            let variables = [];
            WuxPerks.Iterate(function (perk) {
                if (perk.group === "Perk Technique") return;
                variables.push(new PerkData(perk).createDefinition(WuxDef.Get("Perk")).getVariable());
            });
            return WuxSheetBackend.OnChange(variables, `WuxWorkerPerks.UpdateBuildPoints(eventinfo)`, true);
        },
        listenerUpdateSecondAffinityBranch = function () {
            let perkDef = new PerkData(WuxPerks.Get("Second Affinity")).createDefinition(WuxDef.Get("Perk"));
            return WuxSheetBackend.OnChange(
                [perkDef.getVariable(WuxDef._affinity)],
                `WuxWorkerPerks.UpdateSecondAffinityBranch(eventinfo)`,
                true
            );
        },
        listenerPerkAutoFilterButtons = function () {
            let perkFilters = WuxDef.Filter([new DatabaseFilterData("group", "PerkAutoFilter")]);
            let groupVariableNames = perkFilters.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerInspectPopup.OpenPerkFilterTechniqueInspection(eventinfo)`, true);
        },
        listenerSetIsPlayer = function () {
            return WuxSheetBackend.OnChange([WuxDef.GetVariable("Title_IsPlayer")], `WuxWorkerPerks.SetIsPlayer(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`, true);
        },
        listenerUpdateJobBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"));
            let output = `WuxWorkerJobs.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSeeJobTechniques = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"), WuxDef._info);
            let output = `WuxWorkerJobs.SeeTechniques(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSkillBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Skill"), WuxDef._rank);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Skill"), WuxDef._expertise));
            let output = `WuxWorkerSkills.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateAttributeBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Attribute"));
            let output = `WuxWorkerAttributes.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}())

var OverviewBuilder = OverviewBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdateDisplayName();
            output += listenerUpdateCharacterSheetName();
            output += listenerUpdateSheetName();
            output += listenerSetAffinity();
            output += listenerGenerateCharacter();
            output += listenerUseGeneration();
            output += listenerClearBackground();
            output += listenerUpdateCR();
            output += listenerUpdateSurge();
            output += listenerUpdateVitality();
            output += listenerOriginBuilderFieldsUpdate();
            output += listenerUpdatePersonalityDescription();
            output += listenerUpdateMotivationDescription();
            return output;
        },
        listenerUpdateDisplayName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("DisplayName")}`];
            let output = `WuxWorkerGeneral.UpdateDisplayName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateCharacterSheetName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("CharSheetName")}`];
            let output = `WuxWorkerGeneral.UpdateCharacterSheetName(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSheetName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("SheetName")}`];
            let output = `WuxWorkerGeneral.UpdateSheetName(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAffinity = function () {
            let groupVariableNames = [WuxDef.GetVariable("Affinity")];
            let output = `WuxWorkerGeneral.UpdatePrimaryAffinity(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerGenerateCharacter = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_GenerateCharacter")}`];
            let output = `WuxWorkerGeneral.GenerateCharacter();\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUseGeneration = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_UseGeneration")}`];
            let output = `WuxWorkerGeneral.UseGeneration();\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerClearBackground = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_ClearBackground")}`];
            let output = `WuxWorkerGeneral.ClearBackground();\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdateCR = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("CR")}`];
            let output = `WuxWorkerGeneral.UpdateCR(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSurge = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Surge")}`];
            let output = `WuxWorkerGeneral.UpdateSurge(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateVitality = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Cmb_Vitality")}`];
            let output = `WuxWorkerGeneral.UpdateVitality(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerOriginBuilderFieldsUpdate = function () {
            let groupVariableNames = [
                WuxDef.GetVariable("FullName"),
                WuxDef.GetVariable("Ancestry"),
                WuxDef.GetVariable("Ethnicity"),
                WuxDef.GetVariable("QuickDescription"),
                WuxDef.GetVariable("Jin"),
                WuxDef.GetVariable("Title"),
                WuxDef.GetVariable("Age"),
                WuxDef.GetVariable("Gender"),
                WuxDef.GetVariable("HomeRegion"),
                WuxDef.GetVariable("Backstory"),
                WuxDef.GetVariable("Note_GenName"),
                WuxDef.GetVariable("Note_GenFullName"),
                WuxDef.GetVariable("Note_GenGender"),
                WuxDef.GetVariable("Note_GenHomeRegion"),
                WuxDef.GetVariable("Note_GenRace"),
                WuxDef.GetVariable("Note_GenPersonality"),
                WuxDef.GetVariable("Note_GenMotivation")
            ];
            let output = `WuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdatePersonalityDescription = function () {
            let groupVariableNames = [WuxDef.GetVariable("Soc_Personality")];
            let output = `WuxWorkerGeneral.UpdatePersonalityDescription(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateMotivationDescription = function () {
            let groupVariableNames = [WuxDef.GetVariable("Soc_Motivation")];
            let output = `WuxWorkerGeneral.UpdateMotivationDescription(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }

    return {
        Print: print
    }
}());

var FormeBuilder = FormeBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerEquipRepeatingForme();
            output += listenerInspectRepeatingForme();
            output += listenerSetFormeOptions();
            output += listenerJobSelect();
            output += listenerDeleteListStyle();
            output += listenerSwapStyleListTechniqueVariant();
            output += listenerDeleteAllLearnedStyles();
            output += listenerInspectListPerk();
            output += listenerDeleteListPerk();
            return output;
        },
        listenerEquipRepeatingForme = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingJobStyles")}:${WuxDef.GetVariable("Forme_IsEquipped")}`],
                `WuxWorkerStyles.ToggleEquipJobStyle(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_IsEquipped")}`],
                `WuxWorkerStyles.ToggleEquipStyle(eventinfo)`, true)}
                `;
        },
        listenerInspectRepeatingForme = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingJobStyles")}:${WuxDef.GetVariable("Forme_SeeTechniques")}`],
                `WuxWorkerStyles.SeeJobTechniques(eventinfo)`, true)}
                    ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_SeeTechniques")}`],
                `WuxWorkerStyles.SeeStyleTechniques(eventinfo)`, true)}`;
        },
        listenerSetFormeOptions = function () {
            let jobEquipSlotDef = WuxDef.Get("Forme_JobSlot");
            let arteformSlotDef = WuxDef.Get("Forme_AdvancedSlot");
            let advancedSlotDef = WuxDef.Get("Forme_StyleSlot");
            let output = "";
            for (let i = 1; i <= 6; i++) {
                if (i <= 3) {
                    output += WuxSheetBackend.OnChange([jobEquipSlotDef.getVariable(i + WuxDef._build)],
                        `WuxWorkerStyles.UnequipSetJobStyle(eventinfo, ${i}, "${jobEquipSlotDef.getVariable(i)}")`, true);
                    output += WuxSheetBackend.OnChange([jobEquipSlotDef.getVariable(i + WuxDef._info)],
                        `WuxWorkerStyles.InspectSetJobStyle(eventinfo, ${i}, "${jobEquipSlotDef.getVariable(i)}")`, true);
                    output += WuxSheetBackend.OnChange([arteformSlotDef.getVariable(i + WuxDef._build)],
                        `WuxWorkerStyles.UnequipSetStyle(eventinfo, ${i}, "${arteformSlotDef.getVariable(i)}")`, true);
                    output += WuxSheetBackend.OnChange([arteformSlotDef.getVariable(i + WuxDef._info)],
                        `WuxWorkerStyles.InspectSetStyle(eventinfo, ${i}, "${arteformSlotDef.getVariable(i)}")`, true);
                }
                output += WuxSheetBackend.OnChange([advancedSlotDef.getVariable(i + WuxDef._build)],
                    `WuxWorkerStyles.UnequipSetStyle(eventinfo, ${i}, "${advancedSlotDef.getVariable(i)}")`, true);
                output += WuxSheetBackend.OnChange([advancedSlotDef.getVariable(i + WuxDef._info)],
                    `WuxWorkerStyles.InspectSetStyle(eventinfo, ${i}, "${advancedSlotDef.getVariable(i)}")`, true);
            }

            return output;
        },
        listenerJobSelect = function () {
            return `${WuxSheetBackend.OnChange([WuxDef.GetVariable("Forme_SelectJob")],
                `WuxWorkerJobs.EquipJobFromEvent(eventinfo)`, true)}`;
        },
        listenerDeleteListStyle = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_Delete")}`],
                `WuxWorkerStyles.DeleteListStyle(eventinfo)`, true);
        },
        // Learned Styles' full-card display's variant quick-switch buttons
        // (TechVariant pair 3, same shared click trigger as the catalog/live tab -
        // see TechniqueDataAttributeHandler.getVariantSelectFieldName, WJS-Service.js),
        // scoped to "RepeatingStyles". SwapCatalogTechniqueVariant's second param
        // picks the non-catalog branch (no Select button/Popup_InspectShowAdd
        // concept for an already-learned style).
        listenerSwapStyleListTechniqueVariant = function () {
            let baseDef = WuxDef.Get("Action");
            let variantSelectVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechVariant", "3")}`);
            let repeaterVar = WuxDef.GetVariable("RepeatingStyles");

            return WuxSheetBackend.OnChange([`${repeaterVar}:${variantSelectVar}`],
                `WuxWorkerInspectPopup.SwapCatalogTechniqueVariant(eventinfo, "RepeatingStyles")`, true);
        },
        listenerDeleteAllLearnedStyles = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("Forme_DeleteAllStyles")}`],
                `WuxWorkerStyles.DeleteAllLearnedStyles()`, false);
        },
        listenerInspectListPerk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingPerks")}:${WuxDef.GetVariable("Forme_Inspect")}`],
                `WuxWorkerPerks.InspectListPerk(eventinfo)`, true);
        },
        listenerDeleteListPerk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingPerks")}:${WuxDef.GetVariable("Forme_Delete")}`],
                `WuxWorkerPerks.DeleteListPerk(eventinfo)`, true);
        }
    return {
        Print: print
    }
}());

var GearBuilder = GearBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerFindItemsButtons();
            output += listenerFindGearButtons();
            output += listenerFindGoodsButtons();
            output += listenerFindFoodButtons();
            output += listenerFindIngButtons();
            output += listenerBuyGearItem();
            output += listenerBuyGearItemBulk();
            output += listenerDeleteGearItem();
            output += listenerBuyFoodsItem();
            output += listenerBuyFoodsItemBulk();
            output += listenerDeleteFoodsItem();
            output += listenerFindConsumablesButtons();
            output += listenerBuyConsumable();
            output += listenerBuyConsumableBulk();
            output += listenerEquipConsumable();
            output += listenerUnequipConsumable();
            output += listenerDeleteRepeatingConsumable();
            output += listenerBuySyncedConsumable();
            output += listenerPurchaseRepeatingEquipment();
            output += listenerEquipRepeatingEquipment();
            output += listenerEquipGearItem();
            output += listenerUnequipGearItem();
            output += listenerDeleteRepeatingEquipment();
            output += listenerUpdateEquipment();
            output += listenerRemoveAllEquipment();
            output += listenerUnequipAllGear();
            output += listenerUpdateConsumables();
            output += listenerRemoveAllConsumables();
            output += listenerUnequipAllConsumables();
            output += listenerConsumeCookingIngredients();
            output += listenerSetGearOptions();
            return output;
        },
        listenerFindItemsButtons = function () {
            let equipmentTypes = WuxDef.Filter([new DatabaseFilterData("group", "EquipmentType")]);
            let variables = equipmentTypes.map(def => def.getVariable());
            variables.push(WuxDef.GetVariable("Popup_FindItemsByFilter"));
            variables.push(WuxDef.GetVariable("Popup_FindItemsByTechnique"));
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindItems(eventinfo)`, true);
        },
        listenerFindGearButtons = function () {
            let gearTypes = WuxDef.Filter([new DatabaseFilterData("group", "GearType")]);
            let variables = gearTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindGear(eventinfo)`, true);
        },
        listenerFindGoodsButtons = function () {
            let goodsTypes = WuxDef.Filter([new DatabaseFilterData("group", "GoodsType")]);
            let variables = goodsTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindGoodsForGear(eventinfo)`, true);
        },
        listenerFindFoodButtons = function () {
            let foodTypes = WuxDef.Filter([new DatabaseFilterData("group", "FoodType")]);
            let variables = foodTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindFoodsItem(eventinfo)`, true);
        },
        listenerFindIngButtons = function () {
            let ingTypes = WuxDef.Filter([new DatabaseFilterData("group", "IngType")]);
            let variables = ingTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindIngsItem(eventinfo)`, true);
        },
        listenerBuyGearItem = function () {
            return WuxSheetBackend.OnChange(
                [`repeating_gear:${WuxDef.GetVariable("Gear_Buy")}`],
                `WuxWorkerGear.BuyGearItem(eventinfo)`, true);
        },
        listenerBuyGearItemBulk = function () {
            return WuxSheetBackend.OnChange(
                [`repeating_gear:${WuxDef.GetVariable("Gear_BuyBulk")}`],
                `WuxWorkerGear.BuyGearItemBulk(eventinfo)`, true);
        },
        listenerDeleteGearItem = function () {
            return WuxSheetBackend.OnChange(
                [`repeating_gear:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteGearItem(eventinfo)`, true);
        },
        listenerBuyFoodsItem = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingFoods")}:${WuxDef.GetVariable("Gear_Buy")}`],
                `WuxWorkerGear.BuyFoodsItem(eventinfo)`, true);
        },
        listenerBuyFoodsItemBulk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingFoods")}:${WuxDef.GetVariable("Gear_BuyBulk")}`],
                `WuxWorkerGear.BuyFoodsItemBulk(eventinfo)`, true);
        },
        listenerDeleteFoodsItem = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingFoods")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteFoodsItem(eventinfo)`, true);
        },
        listenerFindConsumablesButtons = function () {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let variables = consuTypes.map(def => def.getVariable());
            return WuxSheetBackend.OnChange(variables, `WuxWorkerGear.OpenFindConsumables(eventinfo)`, true);
        },
        listenerBuyConsumable = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Buy")}`],
                `WuxWorkerGear.BuyConsumable(eventinfo)`, true);
        },
        listenerBuyConsumableBulk = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_BuyBulk")}`],
                `WuxWorkerGear.BuyConsumableBulk(eventinfo)`, true);
        },
        listenerEquipConsumable = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Equip")}`],
                `WuxWorkerGear.EquipConsumable(eventinfo)`, true);
        },
        listenerUnequipConsumable = function () {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let output = "";
            for (let i = 0; i < consuTypes.length; i++) {
                let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                for (let j = 0; j < itemKeys.length; j++) {
                    let item = itemKeys[j];
                    if (item == undefined) continue;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    output += WuxSheetBackend.OnChange(
                        [WuxDef.GetVariable("Gear_Unequip", countMod)],
                        `WuxWorkerGear.UnequipConsumable(eventinfo, "${item.name}")`, true);
                }
            }
            return output;
        },
        listenerDeleteRepeatingConsumable = function () {
            return WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteConsumable(eventinfo)`, true);
        },
        listenerBuySyncedConsumable = function () {
            let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
            let output = "";
            for (let i = 0; i < consuTypes.length; i++) {
                let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                for (let j = 0; j < itemKeys.length; j++) {
                    let item = itemKeys[j];
                    if (item == undefined) continue;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    output += WuxSheetBackend.OnChange(
                        [WuxDef.GetVariable("Gear_Buy", countMod)],
                        `WuxWorkerGear.BuySyncedConsumable(eventinfo, "${item.name}")`, true);
                }
            }
            return output;
        },
        listenerEquipRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_ItemIsEquipped")}`],
                `WuxWorkerGear.ToggleEquipItem(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_EquipWeapon")}`],
                `WuxWorkerGear.EquipWeapon(eventinfo)`, true)}
                `;
        },
        listenerPurchaseRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Purchase")}`],
                `WuxWorkerGear.PurchaseGear(eventinfo, "RepeatingEquipment")`, true)}`;
        },
        listenerEquipGearItem = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Equip")}`],
                `WuxWorkerGear.EquipGear(eventinfo)`, true)}`;
        },
        listenerUnequipGearItem = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingSyncedEquipment")}:${WuxDef.GetVariable("Gear_Unequip")}`],
                `WuxWorkerGear.UnequipGear(eventinfo)`, true)}`;
        },
        listenerDeleteRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteGear(eventinfo, "RepeatingEquipment")`, true)}`;
        },
        listenerUpdateEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UpdateEquipment")],
                `WuxWorkerGear.UpdateEquipment(eventinfo)`, true)}`;
        },
        listenerRemoveAllEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_RemoveEquipment")],
                `WuxWorkerGear.RemoveAllEquipment(eventinfo)`, true)}`;
        },
        listenerUnequipAllGear = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UnequipAll")],
                `WuxWorkerGear.UnequipAllGear(eventinfo)`, true)}`;
        },
        listenerUnequipAllConsumables = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UnequipAll", "consumable")],
                `WuxWorkerGear.UnequipAllConsumables(eventinfo)`, true)}`;
        },
        listenerConsumeCookingIngredients = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_ConsumeIngredients")],
                `WuxWorkerGear.ConsumeCookingIngredients(eventinfo)`, true)}`;
        },
        listenerUpdateConsumables = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_UpdateConsumables")],
                `WuxWorkerGear.UpdateConsumables(eventinfo)`, true)}`;
        },
        listenerRemoveAllConsumables = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Gear_RemoveConsumables")],
                `WuxWorkerGear.RemoveAllConsumables(eventinfo)`, true)}`;
        },
        listenerSetGearOptions = function () {
            let output = "";
            
            let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
            output += WuxSheetBackend.OnChange([weaponSlotDef.getVariable(1 + WuxDef._build)],
                `WuxWorkerGear.UnequipSetGear(eventinfo, 1, "${weaponSlotDef.getVariable(1)}")`, true);
            output += WuxSheetBackend.OnChange([weaponSlotDef.getVariable(1 + WuxDef._info)],
                `WuxWorkerGear.InspectSetGear(eventinfo, 1, "${weaponSlotDef.getVariable(1)}")`, true);
            
            let equipSlotDef = WuxDef.Get("Gear_EquipmentSlot");
            for (let i = 1; i <= 9; i++) {
                output += WuxSheetBackend.OnChange([equipSlotDef.getVariable(i + WuxDef._build)],
                    `WuxWorkerGear.UnequipSetGear(eventinfo, ${i}, "${equipSlotDef.getVariable(i)}")`, true);
                output += WuxSheetBackend.OnChange([equipSlotDef.getVariable(i + WuxDef._info)],
                    `WuxWorkerGear.InspectSetGear(eventinfo, ${i}, "${equipSlotDef.getVariable(i)}")`, true);
            }

            return output;
        }
    return {
        Print: print
    }
}());

var ActionBuilder = ActionBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerEnterActionsPage();
            output += listenerRankRepeatingStyles();
            output += listenerSwapTechniqueVariant();
            output += listenerSetDataRepeatingStyles();
            output += listenerFormeButtonActions();
            output += listenerRefreshBasicActions();
            output += listenerTechniquesFilterPopup();
            output += listenerStyleAutoFilterButtons();
            output += listenerBaseFilterButtons();
            output += listenerClearBaseFilters();
            output += listenerUpdateTechniqueChangeVisibility();
            return output;
        },
        listenerEnterActionsPage = function () {
            return WuxSheetBackend.OnChange([WuxDef.GetVariable("Page")], `WuxWorkerActions.OnEnterActionsPage(eventinfo);\n`, true);
        },
        listenerRankRepeatingStyles = function () {
            let repeaters = ["RepeatingFormeTech"];
            let baseDef = WuxDef.Get("Action");
            let rankUpVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechRankUp")}`);
            let rankDownVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechRankDown")}`);
            
            let output = "";
            for (let i = 0; i < repeaters.length; i++) {
                let repeaterName = repeaters[i];
                let repeaterVar =  WuxDef.GetVariable(repeaterName);
                output += `${WuxSheetBackend.OnChange([`${repeaterVar}:${rankUpVar}`],
                    `WuxWorkerActions.RankUpTechnique(eventinfo, "${repeaterName}")`, true)}
                ${WuxSheetBackend.OnChange([`${repeaterVar}:${rankDownVar}`],
                    `WuxWorkerActions.RankDownTechnique(eventinfo, "${repeaterName}")`, true)}`;
            }
            
            return output;
        },
        listenerSwapTechniqueVariant = function () {
            let repeaters = ["RepeatingFormeTech"];
            let baseDef = WuxDef.Get("Action");
            let variantSelectVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechVariant", "3")}`);

            let output = "";
            for (let i = 0; i < repeaters.length; i++) {
                let repeaterName = repeaters[i];
                let repeaterVar = WuxDef.GetVariable(repeaterName);
                output += WuxSheetBackend.OnChange([`${repeaterVar}:${variantSelectVar}`],
                    `WuxWorkerActions.SwapTechniqueVariant(eventinfo, "${repeaterName}")`, true);
            }

            return output;
        },
        listenerSetDataRepeatingStyles = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingCustomTech")}:${WuxDef.GetVariable("Action_SetData")}`],
                `WuxWorkerActions.SetCustomTechnique(eventinfo)`, true)}`;
        },
        listenerFormeButtonActions = function () {
            let output = "";

            let formeTechniqueDef = WuxDef.Get("Action_FormeTechniques");
            let refreshField = formeTechniqueDef.getVariable(WuxDef._refresh);
            output += `${WuxSheetBackend.OnChange([refreshField], `WuxWorkerActions.RefreshAllFormeActions()`, false)}`;
            let loadFormeField = WuxDef.GetVariable("Action_FormeLoad");
            output += `${WuxSheetBackend.OnChange([loadFormeField], `WuxWorkerActions.LoadFormeActions()`, false)}`;
            return output;
        },
        listenerRefreshBasicActions = function () {
            let output = "";

            output += `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RefreshTech")}`],
                `WuxWorkerActions.RemoveAllOldStyleData()`, false)}`;
            return output;
        },
        listenerTechniquesFilterPopup = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Action_FormeTechniques", WuxDef._learn)],
                `WuxWorkerFilterPopup.OpenFormeTechnique()`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Action_FormeTechniques", WuxDef._filter)],
                `WuxWorkerFilterPopup.RemoveFilter()`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Forme_CustomStyleFilter")],
                `WuxWorkerFilterPopup.OpenCustomStyleFilter()`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Forme_RecommendedStyles")],
                `WuxWorkerInspectPopup.OpenRecommendedStylesInspection()`, true)}`;
        },
        listenerStyleAutoFilterButtons = function () {
            let autoFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechAutoFilter")]);
            let groupVariableNames = [];
            for (let i = 0; i < autoFilters.length; i++) {
                groupVariableNames.push(autoFilters[i].getVariable());
            }
            return WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerInspectPopup.OpenStyleFilterTechniqueInspection(eventinfo)`, true);
        },
        listenerBaseFilterButtons = function () {
            let baseFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechBaseFilter")])
                .filter(def => def.subGroup !== "BaseGroup");
            let groupVariableNames = [];
            for (let i = 0; i < baseFilters.length; i++) {
                groupVariableNames.push(baseFilters[i].getVariable());
            }
            return WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerActions.QuickFilterFormeActions()`, true);
        },
        listenerClearBaseFilters = function () {
            return WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Action_ClearFilter")],
                `WuxWorkerActions.ClearBaseFilters()`, true);
        },
        listenerUpdateTechniqueChangeVisibility = function () {
            return WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("Perk_Spirit Conduit")],
                `WuxWorkerActions.UpdateTechniqueChangeVisibility()`, true);
        }
    return {
        Print: print
    }
}());

var PopupBuilder = PopupBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerOpenSubMenu();
            output += listenerCloseSubMenu();
            output += listenerClosePopup();
            output += listenerUpdateRepeatingItemInspectPopupItems();
            output += listenerCatalogTechniqueSelectButton();
            output += listenerSwapCatalogTechniqueVariant();
            output += listenerItemTechniqueSections();
            output += listenerUpdateItemSelectedQuantity();
            output += listenerAdjustItemSelectedQuantity();
            output += listenerLoadMoreCatalogTechniques();
            output += listenerLoadMoreCatalogItems();
            output += listenerInspectPopupButtons();
            output += listenerFilterPopupButtons();
            return output;
        },
        listenerOpenSubMenu = function () {
            let groupVariableNames = [];
            groupVariableNames.push(WuxDef.GetVariable("Note_OpenNotebookActions"));
            
            let notebookCount = parseInt(WuxDef.Get("Note_NotebookCount").formula.getValue());
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = groupVariableNames.concat([WuxDef.GetVariable("Note_NotebookActions", i)]);
            }
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingJobStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingAdvancedStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            let jobEquipSlotDef = WuxDef.Get("Forme_JobSlot");
            let arteformSlotDef = WuxDef.Get("Forme_AdvancedSlot");
            let advancedSlotDef = WuxDef.Get("Forme_StyleSlot");
            for (let i = 1; i <= 6; i++) {
                if (i <= 3) {
                    groupVariableNames = groupVariableNames.concat([jobEquipSlotDef.getVariable(i + WuxDef._submenu), 
                        arteformSlotDef.getVariable(i + WuxDef._submenu)]);
                }
                groupVariableNames = groupVariableNames.concat([advancedSlotDef.getVariable(i + WuxDef._submenu)]);
            }

            // let basicStyleFilters = WuxDef.Filter([new DatabaseFilterData("group", "BasicStyleGroup")]);
            // for (let i = 0; i < basicStyleFilters.length; i++) {
            //     let techniquesFilterData = WuxTechs.Filter([new DatabaseFilterData("style", basicStyleFilters[i].getTitle())]);
            //     for (let j = 0; j < techniquesFilterData.length; j++) {
            //         let techDef = techniquesFilterData[j].createDefinition(WuxDef.Get("Technique"));
            //         groupVariableNames = groupVariableNames.concat([techDef.getVariable(WuxDef._submenu)]);
            //     }
            // }

            let actionFieldName = `${WuxDef.GetVariable("Gear")}-${WuxDef.GetVariable("ItemAction")}`;
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingEquipment")}:${actionFieldName}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingConsumables")}:${actionFieldName}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingFoods")}:${actionFieldName}`]);
            
            for (let i = 1; i <= 3; i++) {
                groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingJobTech", i)}:${WuxDef.GetVariable("Action_Actions")}`]);
            }
            for (let i = 1; i <= 9; i++) {
                groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingAdvTech", i)}:${WuxDef.GetVariable("Action_Actions")}`]);
            }
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingGearTech")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicActions")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicRecovery")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicAttack")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingBasicSocial")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingCustomTech")}:${WuxDef.GetVariable("Action_Actions")}`]);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"), WuxDef._expand));
            
            let output = `WuxWorkerGeneral.OpenSubMenu(eventinfo)`;
            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCloseSubMenu = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_SubMenuActive")}`];
            let output = `WuxWorkerGeneral.CloseSubMenu()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerClosePopup = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_PopupActive")}`];
            let output = `WuxWorkerGeneral.ClosePopup()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerInspectPopupButtons = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_InspectAddClick")}`],
                `WuxWorkerInspectPopup.AddSelectedInspectElement()`, false)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_InspectAddClick", "2")}`],
                `WuxWorkerInspectPopup.AddSelectedInspectElement2()`, false)}`;
        },
        // Old select-list flow only (every popup type except the technique catalog,
        // which has its own repeater/select button below) - "ItemPopupValues".
        listenerUpdateRepeatingItemInspectPopupItems = function () {
            let repeatingSection = WuxDef.GetVariable("ItemPopupValues");
            let groupVariableNames = [
                `${repeatingSection}:${WuxDef.GetVariable("Popup_ItemSelectIsOn")}`
            ];
            let output = `WuxWorkerInspectPopup.SelectInspectionItemFromActiveGroup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        // Catalog cards' Select button (TechRequirement's max slot - see
        // printCatalogSelectSection, WuxGS-Base.js), scoped to the technique
        // catalog's own dedicated "TechPopupValues" repeater. Reuses the same
        // handler as the old select-list's click container above - both just need
        // eventinfo.sourceAttribute to find the row id (selectInspectionItemFromActiveGroup,
        // Worker-InspectPopup.js).
        listenerCatalogTechniqueSelectButton = function () {
            let repeatingSection = WuxDef.GetVariable("TechPopupValues");
            let baseDef = WuxDef.Get("Action");
            let catalogSelectVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechRequirement", WuxDef._max)}`);
            let groupVariableNames = [`${repeatingSection}:${catalogSelectVar}`];
            let output = `WuxWorkerInspectPopup.SelectInspectionItemFromActiveGroup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        // Catalog cards' variant quick-switch buttons (TechVariant pair 3, the
        // shared click trigger every slot submits its own index to - see
        // TechniqueDataAttributeHandler.getVariantSelectFieldName, WJS-Service.js)
        // reuse the exact same field shape as the live Actions tab's own variant
        // buttons (listenerSwapTechniqueVariant above), scoped to the technique
        // catalog's own "TechPopupValues" repeater instead of "RepeatingFormeTech".
        listenerSwapCatalogTechniqueVariant = function () {
            let baseDef = WuxDef.Get("Action");
            let variantSelectVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechVariant", "3")}`);
            let repeaterVar = WuxDef.GetVariable("TechPopupValues");

            return WuxSheetBackend.OnChange([`${repeaterVar}:${variantSelectVar}`],
                `WuxWorkerInspectPopup.SwapCatalogTechniqueVariant(eventinfo)`, true);
        },
        // Every item card's technique display (printCatalogItemTechniqueSection,
        // WuxGS-Base.js) reuses the same variant quick-switch mechanism -
        // SwapCatalogTechniqueVariant's second param picks the non-catalog branch
        // (no Select button/Popup_InspectShowAdd concept here, same as Learned
        // Styles' own use of this) for every repeaterId except "ItemPopupValues"
        // itself (its default param) - see registerItemTechniqueListeners below
        // for the full list of repeaters this is bound to.
        listenerSwapItemTechniqueVariant = function (repeaterId) {
            let baseDef = WuxDef.Get("Action");
            let variantSelectVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechVariant", "3")}`);
            let repeaterVar = WuxDef.GetVariable(repeaterId);

            return WuxSheetBackend.OnChange([`${repeaterVar}:${variantSelectVar}`],
                `WuxWorkerInspectPopup.SwapCatalogTechniqueVariant(eventinfo, "${repeaterId}")`, true);
        },
        // Lazily populates an item card's associated technique the first time its
        // Show/Hide Effects button reveals it (populateItemAssociatedTechnique,
        // Worker-InspectPopup.js) - bound to TechShowEffects toggling within the
        // given repeater, same field/toggle Learned Styles uses, but here the
        // toggle ALSO drives a worker fetch instead of being purely CSS-driven.
        listenerPopulateItemAssociatedTechnique = function (repeaterId) {
            let baseDef = WuxDef.Get("Action");
            let showEffectsVar = baseDef.getVariable(`-${WuxDef.GetVariable("TechShowEffects")}`);
            let repeaterVar = WuxDef.GetVariable(repeaterId);
            let repeaterIdArg = repeaterId != undefined ? `, "${repeaterId}"` : "";

            return WuxSheetBackend.OnChange([`${repeaterVar}:${showEffectsVar}`],
                `WuxWorkerInspectPopup.PopulateItemAssociatedTechnique(eventinfo${repeaterIdArg})`, true);
        },
        // Item catalog's quantity field (Popup_ItemSelectCount, printCatalogItemFullDisplay,
        // WuxGS-Base.js) - drives the selected-highlight, per-item cost display,
        // and the popup header's grand total/Purchase affordability
        // (updateItemSelectedQuantity, Worker-InspectPopup.js).
        listenerUpdateItemSelectedQuantity = function () {
            let repeaterVar = WuxDef.GetVariable("ItemPopupValues");
            let countVar = WuxDef.GetVariable("Popup_ItemSelectCount");

            return WuxSheetBackend.OnChange([`${repeaterVar}:${countVar}`],
                `WuxWorkerInspectPopup.UpdateItemSelectedQuantity(eventinfo)`, true);
        },
        // Quantity stepper's -/+ buttons (wuxQuantityStepButton,
        // printCatalogItemFullDisplay, WuxGS-Base.js) - piggybacked onto
        // Popup_ItemSelectCount's own max slot (decrement) and "2" suffix
        // (increment), matching adjustItemSelectedQuantity's own convention.
        listenerAdjustItemSelectedQuantity = function () {
            let repeaterVar = WuxDef.GetVariable("ItemPopupValues");
            let decrementVar = WuxDef.GetVariable("Popup_ItemSelectCount", WuxDef._max);
            let incrementVar = WuxDef.GetVariable("Popup_ItemSelectCount", "2");

            return `${WuxSheetBackend.OnChange([`${repeaterVar}:${decrementVar}`],
                `WuxWorkerInspectPopup.AdjustItemSelectedQuantity(eventinfo, -1)`, true)}
                ${WuxSheetBackend.OnChange([`${repeaterVar}:${incrementVar}`],
                `WuxWorkerInspectPopup.AdjustItemSelectedQuantity(eventinfo, 1)`, true)}`;
        },
        // Every repeater that carries an item card with a technique reveal
        // (printCatalogItemTechniqueSection, WuxGS-Base.js) - the item catalog
        // itself plus the five "owned item" repeaters on the Gear tab. Variant
        // buttons work the same way in all of them.
        itemTechniqueRepeaterIds = ["ItemPopupValues", "RepeatingEquipment", "RepeatingSyncedEquipment",
            "RepeatingGear", "RepeatingConsumables", "RepeatingFoods"],
        // The item catalog shows its technique eagerly (setInventoryItemData,
        // Worker-InspectPopup.js) - no Show/Hide Effects button, so no click to
        // populate on. Only the five Gear tab repeaters still need this listener.
        lazyPopulateItemTechniqueRepeaterIds = ["RepeatingEquipment", "RepeatingSyncedEquipment",
            "RepeatingGear", "RepeatingConsumables", "RepeatingFoods"],
        listenerItemTechniqueSections = function () {
            let output = "";
            for (let repeaterId of itemTechniqueRepeaterIds) {
                output += listenerSwapItemTechniqueVariant(repeaterId);
            }
            for (let repeaterId of lazyPopulateItemTechniqueRepeaterIds) {
                output += listenerPopulateItemAssociatedTechnique(repeaterId);
            }
            return output;
        },
        // The technique catalog's Load More button (Popup_LoadMore, no suffix) -
        // lives outside the repeater's own fieldset (see printCatalogLoadMoreButton/
        // repeatingCatalogTechSection, WuxGS-Base.js), so this is a plain page-level
        // click, not scoped to a repeating row.
        listenerLoadMoreCatalogTechniques = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_LoadMore")}`];
            let output = `WuxWorkerInspectPopup.LoadMoreCatalogTechniques()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        // The item catalog's own Load More button (Popup_LoadMore, suffix "1") -
        // same page-level, non-repeater-scoped click as the technique catalog's.
        listenerLoadMoreCatalogItems = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_LoadMore", "1")}`];
            let output = `WuxWorkerInspectPopup.LoadMoreCatalogItems()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerFilterPopupButtons = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_ApplyFilter")}`],
                `WuxWorkerFilterPopup.ApplyFilter()`, false)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Popup_ClearFilter")}`],
                `WuxWorkerFilterPopup.ClearFilter()`, false)}`;
        }
    return {
        Print: print
    }
}());

var ChatBuilder = ChatBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdatePostContent();
            output += listenerUpdatePostType();
            output += listenerUpdateLanguage();
            output += listenerUpdateRepeatingChatSelection();
            output += listenerUpdateRepeatingChatEmoteSetName();
            output += listenerUpdateRepeatingChatEmoteSetInput();
            output += listenerUpdateRepeatingChatEmoteDefaultUrlUpdate();
            output += listenerUpdateRepeatingChatEmoteNameUpdate();
            output += listenerUpdateRepeatingChatEmoteUrlUpdate();
            output += listenerUpdateRepeatingChatPostTarget();
            
            let notebookCount = parseInt(WuxDef.Get("Note_NotebookCount").formula.getValue());
            output += listenerRepeatingNotebookOpen(notebookCount);
            output += listenerUpdateNotebookPageType(notebookCount);
            output += listenerUpdateNotebookPageTemplateData(notebookCount);
            output += listenerUpdateNotebookPageDelete(notebookCount);
            output += listenerUpdateNotebookPageData(notebookCount);
            return output;
        },
        listenerUpdatePostContent = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Message")}`];
            let output = `WuxWorkerChat.UpdatePostContent(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdatePostType = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Type")}`];
            let output = `WuxWorkerChat.UpdatePostType(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdateLanguage = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Language")}`];
            let output = `WuxWorkerChat.UpdateSelectedLanguage(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatSelection = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName", WuxDef._learn)}`];
            let output = `WuxWorkerChat.SelectOutfit(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetName = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName")}`];
            let output = `WuxWorkerChat.UpdateNameOutfit(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetInput = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitEmotes")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesGroup(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteDefaultUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefaultURL")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesDefaultUrl(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteNameUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefault")}`];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteName")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesName(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteURL")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesUrl(eventinfo);\nWuxWorkerActions.TriggerBuilderActionUpdate();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatPostTarget = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingActiveEmotesNotes");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_PostEmoteNote")}`];
            let output = `WuxWorkerChat.PostToNotebook(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerRepeatingNotebookOpen = function (notebookCount) {
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [WuxDef.GetVariable("Note_NotebookOpen", i)];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.OpenNotebook(eventinfo, ${i})`, true);
            }

            return output;
        },
        listenerUpdateNotebookPageType = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [`${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageType")}`];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageType(eventinfo, ${i})`, true);
            }

            return output;
        },
        listenerUpdateNotebookPageTemplateData = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [`${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageTemplateData")}`];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageTemplateData(eventinfo, ${i})`, true);
            }

            return output
        },
        listenerUpdateNotebookPageDelete = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [`${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageDelete")}`];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageDelete(eventinfo, ${i})`, true);
            }

            return output;
        },
        listenerUpdateNotebookPageData = function (notebookCount) {
            let repeatingSection = WuxDef.Get("NotebookPages");
            let groupVariableNames = [];
            let output = "";
            for (let i = 0; i < notebookCount; i++) {
                groupVariableNames = [
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageContents")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageLocation")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageArea")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageDate")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageTime")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharName")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharURL")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharEmote")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageCharLanguage")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageQuestName")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PageChapter")}`,
                    `${repeatingSection.getVariable(i)}:${WuxDef.GetVariable("Note_PagePart")}`
                ];
                output += WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerChat.SetNotebookPageData(eventinfo, ${i})`, true);
            }

            return output;
        }
    return {
        Print: print
    }
}());

