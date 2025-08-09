// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

var BuilderBackend = BuilderBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerCharacterCreationFinishButton();
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
        listenerCharacterCreationSetAffinity = function () {
            let groupVariableNames = [WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity")];
            let output = `WuxWorkerCharacterCreation.SetAffinityValue(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationBonusAttributes = function () {
            let groupVariableNames = [WuxDef.GetVariable("BonusAttributePoints")];
            let output = `WuxWorkerCharacterCreation.SetBonusAttributes();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },

        listenerUpdateStyleBuildPoints = function () {
            let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "Style")]);
            let normalStyles = [];
            let advancedStyles = [];
            for (let i = 0; i < filteredData.length; i++) {
                if (filteredData[i].mainGroup === "Style") {
                    normalStyles.push(filteredData[i].getVariable());
                } else if (filteredData[i].mainGroup === "Advanced") {
                    advancedStyles.push(filteredData[i].getVariable());
                }
            }
        
            let output = "";
            output += WuxSheetBackend.OnChange(normalStyles,`WuxWorkerStyles.UpdateBuildPoints(eventinfo, 1)`, true);
            output += WuxSheetBackend.OnChange(advancedStyles,`WuxWorkerStyles.UpdateBuildPoints(eventinfo, 2)`, true);
            return output;
        },
        listenerSeeStyleTechniques = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Style"), WuxDef._info);
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
            output += listenerUpdateKnowledgeBuildPoints();
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
            let output = `WuxWorkerTraining.SetTrainingPoints(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetTrainingPointsUpdate = function () {
            let groupVariableNames = [WuxDef.GetVariable("TrainingKnowledge"), WuxDef.GetVariable("TrainingTechniques")];
            let output = `WuxWorkerTraining.SetTrainingPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateKnowledgeBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Language"), WuxDef._rank);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "LoreCategory"), WuxDef._rank));
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Lore"), WuxDef._rank));
            let output = `WuxWorkerKnowledges.UpdateBuildPoints(eventinfo)`;

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
            output += listenerUpdatePerkPoints();
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
            let output = `WuxWorkerAdvancement.SetLevel(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("AdvancementSkill"), WuxDef.GetVariable("AdvancementTechnique")];
            let output = `WuxWorkerAdvancement.SetAdvancementPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdatePerkPoints = function () {
            let output = "";
            let techniqueDefinition = WuxDef.Get("Technique");
            let styleGroups = WuxDef.Filter([new DatabaseFilterData("group", "PerkGroup")]);
            for (let index = 0; index < styleGroups.length; index++) {
                let perkTechniques = WuxTechs.Filter(new DatabaseFilterData("style", styleGroups[index].getTitle()));

                for (let i = 0; i < perkTechniques.length; i++) {
                    let perkDef = perkTechniques[i].createDefinition(techniqueDefinition);
                    output += WuxSheetBackend.OnChange([perkDef.getVariable(WuxDef._rank)],
                        `WuxWorkerPerks.UpdateBuildPoints(eventinfo, ${perkTechniques[i].resourceCost})`, true);
                }
            }

            return output;
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
            output += listenerGenerateCharacter();
            output += listenerUseGeneration();
            output += listenerClearBackground();
            output += listenerUpdateStatus();
            output += listenerUpdateCR();
            output += listenerUpdateSurge();
            output += listenerUpdateVitality();
            return output;
        },
        listenerUpdateDisplayName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("DisplayName")}`];
            let output = `WuxWorkerGeneral.UpdateDisplayName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateCharacterSheetName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("CharSheetName")}`];
            let output = `WuxWorkerGeneral.UpdateCharacterSheetName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSheetName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("SheetName")}`];
            let output = `WuxWorkerGeneral.UpdateSheetName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerGenerateCharacter = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_GenerateCharacter")}`];
            let output = `WuxWorkerGeneral.GenerateCharacter()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUseGeneration = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_UseGeneration")}`];
            let output = `WuxWorkerGeneral.UseGeneration()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerClearBackground = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_ClearBackground")}`];
            let output = `WuxWorkerGeneral.ClearBackground()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdateStatus = function () {
            let output = "";
            let statuses = WuxDef.Filter([new DatabaseFilterData("group", "Status")]);
            for (let i = 0; i < statuses.length; i++) {
                let groupVariableNames = [(statuses[i].getVariable())];
                output += "\n" + WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerGeneral.UpdateStatus("${statuses[i].name}", eventinfo)`, true);
            }

            return output;
        },
        listenerUpdateCR = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("CR")}`];
            let output = `WuxWorkerGeneral.UpdateCR(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSurge = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Cmb_Surge")}`];
            let output = `WuxWorkerGeneral.UpdateSurge(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateVitality = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Cmb_Vitality")}`];
            let output = `WuxWorkerGeneral.UpdateVitality(eventinfo)`;

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
            output += listenerOpenItemInspectPopup();
            output += listenerPurchaseRepeatingEquipment();
            output += listenerEquipRepeatingEquipment();
            output += listenerDeleteRepeatingEquipment();
            output += listenerInspectRepeatingEquipment();
            output += listenerSetGearOptions();
            return output;
        },
        listenerOpenItemInspectPopup = function () {
            return `${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Page_AddMeleeWeapon"), WuxDef.GetVariable("Page_AddRangedWeapon"),
                    WuxDef.GetVariable("Page_AddTool"), WuxDef.GetVariable("Page_AddCommsTool"),
                    WuxDef.GetVariable("Page_AddLightTool"), WuxDef.GetVariable("Page_AddBindingsTool"),
                    WuxDef.GetVariable("Page_AddMiscTool"), WuxDef.GetVariable("Page_AddHeadGear"),
                    WuxDef.GetVariable("Page_AddFaceGear"), WuxDef.GetVariable("Page_AddChestGear"),
                    WuxDef.GetVariable("Page_AddArmGear"), WuxDef.GetVariable("Page_AddLegGear"),
                    WuxDef.GetVariable("Page_AddFootGear"), WuxDef.GetVariable("Page_AddMiscGear")],
                `WuxWorkerGear.OpenEquipmentAdditionItemInspection(eventinfo, "Add Equipment")`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Page_AddRecoveryItem"), WuxDef.GetVariable("Page_AddTonicItem"), 
                    WuxDef.GetVariable("Page_AddBombItem"), WuxDef.GetVariable("Page_AddBeverageItem")],
                `WuxWorkerGear.OpenEquipmentAdditionItemInspection(eventinfo, "Add Consumable")`, true)}
                ${WuxSheetBackend.OnChange(
                [WuxDef.GetVariable("Page_AddMaterial"), WuxDef.GetVariable("Page_AddCompound"),
                    WuxDef.GetVariable("Page_AddSupplement"), WuxDef.GetVariable("Page_AddAnimalGood"),
                    WuxDef.GetVariable("Page_AddFruit"), WuxDef.GetVariable("Page_AddVegetable"), WuxDef.GetVariable("Page_AddStarch")],
                `WuxWorkerGear.OpenEquipmentAdditionItemInspection(eventinfo, "Add Good")`, true)}`;
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
                `WuxWorkerGear.PurchaseGear(eventinfo, "RepeatingEquipment")`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Purchase")}`],
                `WuxWorkerGear.PurchaseGear(eventinfo, "RepeatingConsumables")`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingGoods")}:${WuxDef.GetVariable("Gear_Purchase")}`],
                `WuxWorkerGear.PurchaseGear(eventinfo, "RepeatingGoods")`, true)}`;
        },
        listenerDeleteRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteGear(eventinfo, "RepeatingEquipment")`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteGear(eventinfo, "RepeatingConsumables")`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingGoods")}:${WuxDef.GetVariable("Gear_Delete")}`],
                `WuxWorkerGear.DeleteGear(eventinfo, "RepeatingGoods")`, true)}`;
        },
        listenerInspectRepeatingEquipment = function () {
            return `${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingEquipment")}:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectGear(eventinfo, "RepeatingEquipment")`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingConsumables")}:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectGear(eventinfo, "RepeatingConsumables")`, true)}
                ${WuxSheetBackend.OnChange(
                [`${WuxDef.GetVariable("RepeatingGoods")}:${WuxDef.GetVariable("Gear_Inspect")}`],
                `WuxWorkerGear.InspectGear(eventinfo, "RepeatingGoods")`, true)}`;
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
            output += listenerInspectRepeatingStyles();
            output += listenerSetDataRepeatingStyles();
            output += listenerRefreshRepeatingActions();
            return output;
        },
        listenerInspectRepeatingStyles = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingBasicActions")}:${WuxDef.GetVariable("Action_Inspect")}`],
                `WuxWorkerActions.InspectTechniqueBasicAction(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingBasicRecovery")}:${WuxDef.GetVariable("Action_Inspect")}`],
                `WuxWorkerActions.InspectTechniqueBasicRecovery(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingBasicAttack")}:${WuxDef.GetVariable("Action_Inspect")}`],
                `WuxWorkerActions.InspectTechniqueBasicAttack(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingBasicSocial")}:${WuxDef.GetVariable("Action_Inspect")}`],
                `WuxWorkerActions.InspectTechniqueBasicSocial(eventinfo)`, true)}
                ${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingBasicSpirit")}:${WuxDef.GetVariable("Action_Inspect")}`],
                `WuxWorkerActions.InspectTechniqueBasicSpirit(eventinfo)`, true)}`;
        },
        listenerSetDataRepeatingStyles = function () {
            return `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("RepeatingCustomTech")}:${WuxDef.GetVariable("Action_SetData")}`],
                `WuxWorkerActions.SetCustomTechnique(eventinfo)`, true)}`;
        },
        listenerRefreshRepeatingActions = function () {
            let output = "";
            for (let i = 1; i <= 3; i++) {
                output += `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Forme_JobSlot", i)}${WuxDef._refresh}`],
                    `WuxWorkerActions.RefreshJobStyleActions(${i})`, false)}`;
                output += `${WuxSheetBackend.OnChange([`${WuxDef.GetVariable("Forme_AdvancedSlot", i)}${WuxDef._refresh}`],
                    `WuxWorkerActions.RefreshAdvancedStyleActions(${i})`, false)}`;
            }
            return output;
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
            output += listenerCloseInspectPopup();
            output += listenerUpdateRepeatingItemInspectPopupItems();
            output += listenerInspectPopupAddButton();
            return output;
        },
        listenerOpenSubMenu = function () {
            let groupVariableNames = [];
            groupVariableNames.push(WuxDef.GetVariable("Note_OpenNotebookActions"));
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("Notebooks")}:${WuxDef.GetVariable("Note_NotebookActions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingJobStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingAdvancedStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingStyles")}:${WuxDef.GetVariable("Forme_Actions")}`]);
            let jobEquipSlotDef = WuxDef.Get("Forme_JobSlot");
            let arteformSlotDef = WuxDef.Get("Forme_AdvancedSlot");
            let advancedSlotDef = WuxDef.Get("Forme_StyleSlot");
            for (let i = 1; i <= 6; i++) {
                if (i <= 3) {
                    groupVariableNames = groupVariableNames.concat([jobEquipSlotDef.getVariable(i + WuxDef._expand), 
                        arteformSlotDef.getVariable(i + WuxDef._expand)]);
                }
                groupVariableNames = groupVariableNames.concat([advancedSlotDef.getVariable(i + WuxDef._expand)]);
            }

            let actionFieldName = `${WuxDef.GetVariable("Gear")}-${WuxDef.GetVariable("ItemAction")}`;
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingEquipment")}:${actionFieldName}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingConsumables")}:${actionFieldName}`]);
            groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingGoods")}:${actionFieldName}`]);
            
            for (let i = 1; i <= 3; i++) {
                groupVariableNames = groupVariableNames.concat([`${WuxDef.GetVariable("RepeatingJobTech", i)}:${WuxDef.GetVariable("Action_Actions")}`]);
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
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Style"), WuxDef._expand));
            
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
        
        listenerCloseInspectPopup = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_InspectPopupActive")}`];
            let output = `WuxWorkerInspectPopup.ClosePopup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerInspectPopupAddButton = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_InspectAddClick")}`];
            let output = `WuxWorkerInspectPopup.AddSelectedInspectElement()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdateRepeatingItemInspectPopupItems = function () {
            let repeatingSection = WuxDef.GetVariable("ItemPopupValues");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Popup_ItemSelectIsOn")}`];
            let output = `WuxWorkerInspectPopup.SelectInspectionItemFromActiveGroup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
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
            output += listenerRepeatingNotebookOpen();
            output += listenerRepeatingNotebookDelete();
            output += listenerOpenedNotebookSave();
            output += listenerOpenedNotebookClose();
            output += listenerOpenedNotebookReload();
            output += listenerUpdateRepeatingChatPostTarget();
            output += listenerUpdateNotebookPageType();
            output += listenerUpdateNotebookPageTemplateData();
            output += listenerUpdateNotebookPageDelete();
            output += listenerUpdateNotebookPageData();
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
            let output = `WuxWorkerChat.UpdateSelectedLanguage(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatSelection = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName", WuxDef._learn)}`];
            let output = `WuxWorkerChat.SelectOutfit(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetName = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName")}`];
            let output = `WuxWorkerChat.UpdateNameOutfit(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetInput = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitEmotes")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesGroup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteDefaultUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefaultURL")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesDefaultUrl(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteNameUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefault")}`];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteName")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteURL")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesUrl(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerRepeatingNotebookOpen = function () {
            let repeatingSection = WuxDef.GetVariable("Notebooks");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Note_NotebookOpen")}`];
            let output = `WuxWorkerChat.OpenNotebook(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerRepeatingNotebookDelete = function () {
            let repeatingSection = WuxDef.GetVariable("Notebooks");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Note_NotebookDelete")}`];
            let output = `WuxWorkerChat.DeleteNotebook(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerOpenedNotebookSave = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_NotebookSave")}`];
            let output = `WuxWorkerChat.SaveOpenedNotebook()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerOpenedNotebookClose = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_NotebookClose")}`];
            let output = `WuxWorkerChat.CloseOpenedNotebook()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerOpenedNotebookReload = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Note_NotebookReload")}`];
            let output = `WuxWorkerChat.ReloadOpenedNotebook()`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdateRepeatingChatPostTarget = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingActiveEmotesNotes");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_PostEmoteNote")}`];
            let output = `WuxWorkerChat.PostToNotebook(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateNotebookPageType = function () {
            let repeatingSection = WuxDef.GetVariable("NotebookPages");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Note_PageType")}`];
            let output = `WuxWorkerChat.SetNotebookPageType(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateNotebookPageTemplateData = function () {
            let repeatingSection = WuxDef.GetVariable("NotebookPages");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Note_PageTemplateData")}`];
            let output = `WuxWorkerChat.SetNotebookPageTemplateData(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateNotebookPageDelete = function () {
            let repeatingSection = WuxDef.GetVariable("NotebookPages");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Note_PageDelete")}`];
            let output = `WuxWorkerChat.SetNotebookPageDelete(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateNotebookPageData = function () {
            let repeatingSection = WuxDef.GetVariable("NotebookPages");
            let groupVariableNames = [
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageContents")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageLocation")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageArea")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageDate")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageTime")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageCharName")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageCharURL")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageCharEmote")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageCharLanguage")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageQuestName")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PageChapter")}`,
                `${repeatingSection}:${WuxDef.GetVariable("Note_PagePart")}`
            ];
            let output = `WuxWorkerChat.SetNotebookPageData(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}());

