var WuxWorkerGeneral = WuxWorkerGeneral || (function () {
    'use strict';

    var
        updateStats = function (attributeHandler) {
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

            for (let i = 0; i < formulaDefinitions.length; i++) {
                attributeHandler.addFormulaMods(formulaDefinitions[i]);
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                for (let i = 0; i < formulaDefinitions.length; i++) {
                    if (formulaDefinitions[i].isResource) {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(WuxDef._max), formulaDefinitions[i].formula.getValue(attrHandler));
                    } else {
                        attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
                    }
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
                attrHandler.addUpdate(WuxDef.GetVariable("FullName"), eventinfo.newValue);
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
        generateCharacter = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let nameVar = WuxDef.GetVariable("DisplayName");
            let fullNameVar = WuxDef.GetVariable("FullName");
            let raceVar = WuxDef.GetVariable("Ethnicity");
            let genderVar = WuxDef.GetVariable("Gender");
            let homeRegionVar = WuxDef.GetVariable("HomeRegion");
            attributeHandler.addMod([nameVar, fullNameVar, genderVar, homeRegionVar]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let generator = new WuxingHumanCharacterGenerator();
                generator.character.firstName = attrHandler.parseString(nameVar);
                generator.character.fullName = attrHandler.parseString(fullNameVar);
                generator.character.ancestry = attrHandler.parseString(raceVar);
                generator.character.gender = attrHandler.parseString(genderVar);
                generator.character.homeRegion = attrHandler.parseString(homeRegionVar);
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
            attributeHandler.addMod([nameVar, fullNameVar, genderVar, homeRegionVar]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate("character_name", attrHandler.parseString(nameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("SheetName"), attrHandler.parseString(nameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("DisplayName"), attrHandler.parseString(nameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("FullName"), attrHandler.parseString(fullNameVar));
                attrHandler.addUpdate(WuxDef.GetVariable("Gender"), attrHandler.parseString(genderVar));
                attrHandler.addUpdate(WuxDef.GetVariable("HomeRegion"), attrHandler.parseString(homeRegionVar));
                attrHandler.addUpdate(WuxDef.GetVariable("Ethnicity"), attrHandler.parseString(raceVar));
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
        updateStatus = function (statusName, eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let statusHandler = new StatusHandler(attributeHandler);
            statusHandler.changeStatus(statusName, eventinfo.newValue);
        },
        updateCR = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
            let cr = parseInt(eventinfo.newValue);

            WuxWorkerAttributes.UpdateStats(attributeHandler);
            WuxWorkerPerks.UpdateStats(attributeHandler);
            WuxWorkerSkills.UpdateStats(attributeHandler);
            WuxWorkerKnowledges.UpdateStats(attributeHandler);
            WuxWorkerJobs.UpdateStats(attributeHandler);
            WuxWorkerStyles.UpdateStats(attributeHandler);
            WuxWorkerAdvancement.UpdateStats(attributeHandler);
            WuxWorkerActions.UpdateStats(attributeHandler);
            updateStats(attributeHandler);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                combatDetailsHandler.onUpdateCR(attrHandler, cr);
            });
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
            let nameFieldName = WuxDef.GetVariable("Popup_InspectPopupName");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod(nameFieldName);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                switch (attrHandler.parseString(nameFieldName)) {
                    case WuxDef.GetTitle("Popup_ItemInspectionName"):
                    case WuxDef.GetTitle("Popup_TechniqueInspectionName"):
                        WuxWorkerInspectPopup.ClosePopup();
                        break;
                }
            });
            attributeHandler.run();
        }
        
    return {
        UpdateStats: updateStats,
        UpdateDisplayName: updateDisplayName,
        UpdateCharacterSheetName: updateCharacterSheetName,
        UpdateSheetName: updateSheetName,
        GenerateCharacter: generateCharacter,
        UseGeneration: useGeneration,
        ClearBackground: clearBackground,
        UpdateStatus: updateStatus,
        UpdateCR: updateCR,
        OpenSubMenu: openSubMenu,
        CloseSubMenu: closeSubMenu,
        ClosePopup: closePopup
    };
}());

