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
                attrHandler.addUpdate(WuxDef.GetVariable("IntroName"), eventinfo.newValue);
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
        updateFullName = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                attrHandler.addUpdate(WuxDef.GetVariable("IntroName"), eventinfo.newValue);
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
        UpdateFullName: updateFullName,
        UpdateStatus: updateStatus,
        UpdateCR: updateCR,
        OpenSubMenu: openSubMenu,
        CloseSubMenu: closeSubMenu,
        ClosePopup: closePopup
    };
}());

