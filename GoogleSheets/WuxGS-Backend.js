// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

var BuilderBackend = BuilderBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdatePageState();
            output += listenerCharacterCreationFinishButton();
            output += listenerCharacterCreationSetAffinity();
            output += listenerCharacterCreationBonusAttributes();
            output += listenerUpdateTechniqueBuildPoints();
            output += listenerUpdateStyleBuildPoints();
            output += listenerUpdateJobStyleBuildPoints();
            return output;
        },

        listenerUpdatePageState = function () {
            let groupVariableNames = [WuxDef.GetVariable("Page")];
            let output = `WuxWorkerGeneral.UpdatePageState(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerCharacterCreationFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Character Creator", WuxDef._finish)];
            let output = `WuxWorkerCharacterCreation.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationSetAffinity = function () {
            let groupVariableNames = [WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("AdvancedBranch")];
            let output = `WuxWorkerCharacterCreation.SetAffinityValue(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationBonusAttributes = function () {
            let groupVariableNames = [WuxDef.GetVariable("BonusAttributePoints")];
            let output = `WuxWorkerCharacterCreation.SetBonusAttributes();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdateTechniqueBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Technique"));
            let output = `WuxWorkerTechniques.UpdateTechniqueBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdateStyleBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Style"));
            let output = `WuxWorkerTechniques.UpdateStyleBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateJobStyleBuildPoints = function () {
            let output = "";
            let jobs = WuxDef.Filter([new DatabaseFilterData("group", "Job")]);
            for (let i = 0; i < jobs.length; i++) {
                let groupVariableNames = [(jobs[i].getVariable())];
                output += "\n" + WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerTechniques.UpdateJobStyleBuildPoints("${jobs[i].name}", eventinfo)`, true);
            }
            return output;
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
            let groupVariableNames = [WuxDef.GetVariable("Training", WuxDef._max)];
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
            output += listenerUpdateJobBuildPoints();
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

        listenerUpdateJobBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"), WuxDef._rank);
            let output = `WuxWorkerJobs.UpdateBuildPoints(eventinfo)`;

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
            output += listenerUpdateStatus();
            output += listenerUpdateCR();
            return output;
        },
        listenerUpdateDisplayName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("DisplayName")}`];
            let output = `WuxWorkerGeneral.UpdateDisplayName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
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
            output += listenerOpenItemInspectPopup();
            output += listenerCloseInspectPopup();
            output += listenerUpdateRepeatingItemInspectPopupItems();
            return output;
        },
        listenerOpenItemInspectPopup = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_AddHeadGear")}`];
            let output = `WuxWorkerInspectPopup.OpenItemInspection(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCloseInspectPopup = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_InspectPopupActive")}`];
            let output = `WuxWorkerInspectPopup.ClosePopup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
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
        }
    return {
        Print: print
    }
}());

