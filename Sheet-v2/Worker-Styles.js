var WuxWorkerStyles = WuxWorkerStyles || (function () {

    class EquipStyleWorker {
        constructor() {
            this.attributeHandler = {};
            this.styleRepeater = {};
            this.selectedId = "";
            this.actionFieldName = "";
            this.subMenuOptionFieldName = "";
        }

        setEquipSetterValues(subMenuOptionFieldName, repeatingSectionName) {
            this.attributeHandler = new WorkerAttributeHandler();
            this.styleRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
            this.subMenuOptionFieldName = subMenuOptionFieldName;
        }

        setSelectIdFromEventinfo (eventinfo) {
            this.selectedId = this.styleRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
            this.actionFieldName = this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_Actions"));
        }
        setSelectIdFromName (attrHandler, styleRepeater, name) {
            let equipWorker = this;
            styleRepeater.iterate(function (id) {
                let styleName = styleRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name"));
                if (name == attrHandler.parseString(styleName)) {
                    equipWorker.selectedId = id;
                    return true;
                }
            });

            return equipWorker.selectedId != "";
        }
        setActionFieldName (actionFieldName) {
            this.actionFieldName = actionFieldName;
        }

        setupForEquip (countFieldNames, slotNames, maxSlots) {
            // get the selected style data
            this.styleFieldName = this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_Name"));
            this.attributeHandler.addMod(this.styleFieldName);
            this.tierFieldName = this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_Tier"));
            this.attributeHandler.addMod(this.tierFieldName);

            countFieldNames.forEach(fieldName => {
                let countField = WuxDef.GetVariable(fieldName);
                this.attributeHandler.addMod(countField);
            })
            let slotIndex = 0;
            slotNames.forEach(name => {
                let slotDef = WuxDef.Get(name);
                for (let i = 1; i <= maxSlots[slotIndex]; i++) {
                    let slotFieldName = slotDef.getVariable(i);
                    this.attributeHandler.addMod(slotFieldName);
                }
                slotIndex++;
            });
        }

        setupForEquipStyle (countFieldNames, slotNames, maxSlots) {
            this.setupForEquip(countFieldNames, slotNames, maxSlots);
            this.arteformFieldName = this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_IsAdvanced"));
            this.attributeHandler.addMod(this.arteformFieldName);
        }

        slotIsEmpty(slotContents) {
            return slotContents == "" || slotContents == "0";
        }

        closeMenu(attrHandler, equipSlot) {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            attrHandler.addUpdate(this.subMenuOptionFieldName, "0");
            attrHandler.addUpdate(this.actionFieldName, "0");
            if (equipSlot != undefined) {
                attrHandler.addUpdate(equipSlot + WuxDef._submenu, "0");
            }
        }

        equipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName, styleName, tier) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "on");
            if (styleName == undefined) {
                styleName = attrHandler.parseString(this.styleFieldName);
                attrHandler.addUpdate(emptySlotFieldName, styleName);
            }
            if (tier == undefined) {
                tier = attrHandler.parseString(this.tierFieldName);
            }
        }

        unequipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "0");
            attrHandler.addUpdate(emptySlotFieldName, "0");
        }

        findMatchingEquippedSlot(attrHandler, repeater, slotContents) {
            let returnable = undefined;
            repeater.iterate(function (id) {
                let slotFieldName = repeater.getFieldName(id, WuxDef.GetVariable("Forme_Name"));
                if (slotContents == attrHandler.parseString(slotFieldName)) {
                    returnable = id;
                    return returnable;
                }
            });
            return returnable;
        }

        getEmptyEquipSlotFieldName(attrHandler, slotDef, countFieldName) {
            let maxCount = attrHandler.parseInt(countFieldName);
            for (let i = 1; i <= maxCount; i++) {
                let slotFieldName = slotDef.getVariable(i);
                let slotContents = attrHandler.parseString(slotFieldName);
                if (this.slotIsEmpty(slotContents)) {
                    return {slotFieldName: slotFieldName, index: i};
                }
            }
            return undefined;
        }

        getEquippedSlotFieldName(attrHandler, slotDef, styleName, maxCount) {
            for (let i = 1; i <= maxCount; i++) {
                let slotFieldName = slotDef.getVariable(i);
                let slotContents = attrHandler.parseString(slotFieldName);
                if (slotContents == styleName) {
                    return {slotFieldName: slotFieldName, index: i};
                }
            }
            return undefined;
        }

        getLastEquipSlotFieldName(attrHandler, slotDef, countFieldName) {
            let maxCount = attrHandler.parseInt(countFieldName);
            return {slotFieldName: slotDef.getVariable(maxCount), index: maxCount};
        }

        unequipStyleAtId(attrHandler, id) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(id, WuxDef.GetVariable("Forme_IsEquipped")), 0);
        }
    }

    const populateStyleInspectionTechniques = function (attrHandler, itemPopupRepeater, style, selectedTechnique, maxTier, affinities, showTierHeaders, restrictToAffinities) {
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${style.name} Techniques`);

        let selectedElement = null;
        let styleTechniques = WuxTechs.Filter(new DatabaseFilterData("style", style.name));
        styleTechniques = WuxTechs.SortFilteredTechniquesByRequirement(styleTechniques);

        for (let tier = 1; tier <= maxTier; tier++) {

            let tierData = styleTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }
                
                if (restrictToAffinities) {
                    if (affinity.includes(";")) {
                        let affinityParts = affinity.split(";").map(s => s.trim());
                        if (affinity != "" && !affinityParts.some(part => affinities.includes(part))) {
                            return;
                        }
                    }
                    else if (affinity != "" && !affinities.includes(affinity)) {
                        return;
                    }
                }
                
                if (showTierHeaders) {
                    addStyleTierHeaderToInspectionPopup(attrHandler, itemPopupRepeater, affinity, style.name, Format.GetLevelPrerequisites(tier));
                }

                techsByAffinity.forEach(function (styleTechnique) {
                    let newRowId = itemPopupRepeater.getNextId();
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), styleTechnique.name);
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Tech");

                    if (selectedElement == null && (styleTechnique.name == selectedTechnique || selectedTechnique == "")) {
                        selectedElement = {
                            item: styleTechnique,
                            id: newRowId
                        }
                        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
                    } else {
                        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
                    }
                });
            });
        }

        itemPopupRepeater.removeAllIdsAfterIteratorIndex();
        return selectedElement;
    };
    const addStyleTierHeaderToInspectionPopup = function (attrHandler, itemPopupRepeater, affinity, styleName, level) {
        let techHeader = "";
        let techDesc = "";
        if (level != 0) {
            techHeader += `Level ${level}`;
            techDesc += `These techniques are learnable upon reaching Level ${level}`;
        }
        if (affinity != "") {
            if (affinity.includes(";")) {
                let affinities = affinity.split(";");
                let affinityOutput = "";
                for (let i = 0; i < affinities.length; i++) {
                    if (i == affinities.length - 1) {
                        if (affinityOutput != "") {
                            affinityOutput += " or ";
                        }
                    }
                    else if (affinityOutput != "") {
                        affinityOutput += ", ";
                    }
                    affinityOutput += affinities[i].trim();
                }
                techHeader += (techHeader == "" ? "" : "; ") + `${affinityOutput} Affinity`;
                techDesc +=  (techDesc == "" ? "" : " ") + `and require ${affinityOutput} affinity`;
            }
            else {
                techHeader += (techHeader == "" ? "" : "; ") + `${affinity} Affinity`;
                techDesc +=  (techDesc == "" ? "" : " ") + `and require ${affinity} affinity`;
            }
        }

        let newRowId = itemPopupRepeater.getNextId();
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), techHeader);
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "");
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectDesc")), techDesc);
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
    };

    const equipJobStyle = function (eventinfo) {
        let countFieldName = "JobSlots";
        let slotName = "Forme_JobSlot";
        let maxSlots = parseInt(WuxDef.Get("Forme_JobSlotCount").formula.getValue());
        let actionFieldName = "RepeatingJobTech";

        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingJobStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquip([countFieldName], [slotName], [maxSlots]);

        equipStyleWorker.styleRepeater.getIds(function (equipRepeater) {

            equipRepeater.iterate(function (id) {
                equipStyleWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name")), 0);
            });
            let combatDetailsHandler = new CombatDetailsHandler(equipStyleWorker.attributeHandler);

            equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
                let emptyEquipSlot = equipStyleWorker.getEmptyEquipSlotFieldName(attrHandler, WuxDef.Get(slotName), WuxDef.GetVariable(countFieldName));
                if (emptyEquipSlot == undefined) {
                    emptyEquipSlot = equipStyleWorker.getLastEquipSlotFieldName(attrHandler, WuxDef.Get(slotName), WuxDef.GetVariable(countFieldName));
                    let equippedId = equipStyleWorker.findMatchingEquippedSlot(attrHandler, equipRepeater, attrHandler.parseString(emptyEquipSlot.slotFieldName));
                    Debug.Log(`Found Equipped ID at ${equippedId} which has name ${attrHandler.parseString(emptyEquipSlot.slotFieldName)}`);
                    if (equippedId != undefined) {
                        equipStyleWorker.unequipStyleAtId(attrHandler, equippedId);
                    }
                }
                equipStyleWorker.equipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
                Debug.Log(`Equipping Job Style ${attrHandler.parseString(equipStyleWorker.styleFieldName)}`);
                combatDetailsHandler.onUpdateJob(attrHandler, attrHandler.parseString(equipStyleWorker.styleFieldName));
                equipStyleWorker.closeMenu(attrHandler, emptyEquipSlot.slotFieldName);
            });
            WuxWorkerActions.UpdateVisibilityOfFormeActions(equipStyleWorker.attributeHandler);
            let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
            loader.run();
        });
    };
    const unequipJobStyle = function (eventinfo) {
        let countFieldName = "JobSlots";
        let slotName = "Forme_JobSlot";
        let maxSlots = parseInt(WuxDef.Get("Forme_JobSlotCount").formula.getValue());
        let actionFieldName = "RepeatingJobTech";

        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingJobStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquip([countFieldName], [slotName], [maxSlots]);

        equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let styleName = attrHandler.parseString(equipStyleWorker.styleFieldName);
            let emptyEquipSlot = equipStyleWorker.getEquippedSlotFieldName(attrHandler, WuxDef.Get(slotName),
                styleName, maxSlots);
            if (emptyEquipSlot != undefined) {
                equipStyleWorker.unequipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
                equipStyleWorker.closeMenu(attrHandler, emptyEquipSlot.slotFieldName);
            }
            else {
                Debug.Log(`No Job Slot found for ${styleName}`);
                equipStyleWorker.closeMenu(attrHandler);
                // attrHandler.addUpdate(equipStyleWorker.styleRepeater.getFieldName(equipStyleWorker.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "on");
            }
        });
        WuxWorkerActions.UpdateVisibilityOfFormeActions(equipStyleWorker.attributeHandler);
        let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
        loader.run();
    };

    const equipStyle = function (eventinfo) {
        let arteformCountFieldName = "AdvancedSlots";
        let advancedCountFieldName = "StyleSlots";
        let arteformSlotName = "Forme_AdvancedSlot";
        let advancedSlotName = "Forme_StyleSlot";
        let advancedMaxSlots = parseInt(WuxDef.Get("Forme_StyleSlotCount").formula.getValue());
        let actionFieldName = "RepeatingAdvTech";

        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquipStyle([advancedCountFieldName], 
            [advancedSlotName], [advancedMaxSlots]);

        equipStyleWorker.styleRepeater.getIds(function (equipRepeater) {

            equipRepeater.iterate(function (id) {
                equipStyleWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name")), 0);
            });

            equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
                Debug.Log(`Equipping ${attrHandler.parseString(equipStyleWorker.styleFieldName)}`);
                let emptyEquipSlot = equipStyleWorker.getEmptyEquipSlotFieldName(
                    attrHandler, WuxDef.Get(arteformSlotName), WuxDef.GetVariable(arteformCountFieldName));
                if (emptyEquipSlot == undefined) {
                    if (attrHandler.parseString(equipStyleWorker.arteformFieldName) == "on") {
                        emptyEquipSlot = equipStyleWorker.getLastEquipSlotFieldName(
                            attrHandler, WuxDef.Get(arteformSlotName), WuxDef.GetVariable(arteformCountFieldName));
                        let equippedId = equipStyleWorker.findMatchingEquippedSlot(
                            attrHandler, equipRepeater, attrHandler.parseString(emptyEquipSlot.slotFieldName));
                        if (equippedId != undefined) {
                            equipStyleWorker.unequipStyleAtId(attrHandler, equippedId);
                        }
                        Debug.Log(`Equipping to Advanced Slot ${emptyEquipSlot.slotFieldName}`);
                    }
                    else {
                        emptyEquipSlot = equipStyleWorker.getEmptyEquipSlotFieldName(
                            attrHandler, WuxDef.Get(advancedSlotName), WuxDef.GetVariable(advancedCountFieldName));
                        if (emptyEquipSlot == undefined) {
                            emptyEquipSlot = equipStyleWorker.getLastEquipSlotFieldName(
                                attrHandler, WuxDef.Get(advancedSlotName), WuxDef.GetVariable(advancedCountFieldName));
                            let equippedId = equipStyleWorker.findMatchingEquippedSlot(
                                attrHandler, equipRepeater, attrHandler.parseString(emptyEquipSlot.slotFieldName));
                            if (equippedId != undefined) {
                                equipStyleWorker.unequipStyleAtId(attrHandler, equippedId);
                            }
                        }
                        Debug.Log(`Equipping to Style Slot ${emptyEquipSlot.slotFieldName} `);
                    }
                }
                else {
                    Debug.Log(`Equipping to Advanced Slot ${emptyEquipSlot.slotFieldName}`);
                }
                equipStyleWorker.equipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
                equipStyleWorker.closeMenu(attrHandler, emptyEquipSlot.slotFieldName);
            });
            WuxWorkerActions.UpdateVisibilityOfFormeActions(equipStyleWorker.attributeHandler);
            let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
            loader.run();
        });
    };
    const unequipStyle = function (eventinfo) {
        let advancedCountFieldName = "StyleSlots";
        let advancedSlotName = "Forme_StyleSlot";
        let advancedMaxSlots = parseInt(WuxDef.Get("Forme_StyleSlotCount").formula.getValue());
        let actionFieldName = "RepeatingAdvTech";

        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquipStyle([advancedCountFieldName], 
            [advancedSlotName], [advancedMaxSlots]);

        equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
            
            let styleName = attrHandler.parseString(equipStyleWorker.styleFieldName);
            Debug.Log(`Unequip ${styleName}`);
            // let emptyEquipSlot = equipStyleWorker.getEquippedSlotFieldName(attrHandler, WuxDef.Get(arteformSlotName),
            //     styleName, arteformMaxSlots);
            // if (emptyEquipSlot != undefined) {
            //     Debug.Log(`Found Advanced Slot ${emptyEquipSlot.slotFieldName}`);
            //     equipStyleWorker.unequipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
            //     equipStyleWorker.closeMenu(attrHandler, emptyEquipSlot.slotFieldName);
            // }
            // else {
                let emptyEquipSlot = equipStyleWorker.getEquippedSlotFieldName(attrHandler, WuxDef.Get(advancedSlotName),
                    styleName, advancedMaxSlots);
                if (emptyEquipSlot != undefined) {
                    Debug.Log(`Found Style Slot ${emptyEquipSlot.slotFieldName} `);
                    equipStyleWorker.unequipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
                    equipStyleWorker.closeMenu(attrHandler, emptyEquipSlot.slotFieldName);
                }
                else {
                    // attrHandler.addUpdate(equipStyleWorker.styleRepeater.getFieldName(equipStyleWorker.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "on");
                    Debug.Log(`No Style Slot found for ${styleName}`);
                    equipStyleWorker.closeMenu(attrHandler);
                }
            // }
        });

        WuxWorkerActions.UpdateVisibilityOfFormeActions(equipStyleWorker.attributeHandler);
        let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
        loader.run();
    };
    const seeFormeTechniques = function (repeater, selectedId, actionFieldName, seeTechniqueFieldName) {
        Debug.Log("See Forme Techniques");
        
        let nameFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Name"));
        let tierFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Tier"));
        let crFieldName = WuxDef.GetVariable("CR");

        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addMod([nameFieldName, tierFieldName, crFieldName]);
        attributeHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry")]);

        WuxWorkerInspectPopup.OpenTechniqueInspection(attributeHandler, function (attrHandler, itemPopupRepeater) {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            attrHandler.addUpdate(seeTechniqueFieldName, "0");
            attrHandler.addUpdate(actionFieldName, "0");
            let maxTier = attrHandler.parseInt(tierFieldName);
            let cr = attrHandler.parseInt(crFieldName);
            let advancedAffinityRaw = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity"));
            let advancedAffinities = advancedAffinityRaw.split(";").map(s => s.trim()).filter(s => s !== "");
            let affinities = [
                attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                ...advancedAffinities,
                attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
            ];

            let style = WuxStyles.Get(attrHandler.parseString(nameFieldName));
            return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater,
                style, "", Math.min(maxTier, cr), affinities, false, true);
        });
        attributeHandler.run();
    }
    const seeSetFormeTechniques = function (eventinfo, repeaterName, styleFieldName) {
        Debug.Log("See Forme Techniques");

        let formeRepeatingWorker = new WorkerRepeatingSectionHandler(repeaterName);
        formeRepeatingWorker.getIds(function (formeRepeater) {
            let attributeHandler = new WorkerAttributeHandler();
            formeRepeater.iterate(function (id) {
                attributeHandler.addMod(formeRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name")), 0);
            });
            attributeHandler.addMod(styleFieldName);
            
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let styleName = attrHandler.parseString(styleFieldName);
                formeRepeater.iterate(function (id) {
                    let idName = attrHandler.parseString(formeRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name")));
                    if (styleName == idName) {
                        seeFormeTechniques(formeRepeater, id, styleFieldName + WuxDef._expand, eventinfo.sourceAttribute);
                    }
                });
            });
            attributeHandler.run();
        });
    }
    const unequipSetTechSet = function (eventinfo, slotIndex, equipSlotFieldName, actionFieldName, repeatingSectionName) {
        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, repeatingSectionName);
        equipStyleWorker.attributeHandler.addMod(equipSlotFieldName);

        equipStyleWorker.styleRepeater.getIds(function (advancedRepeater) {
            advancedRepeater.iterate(function (id) {
                equipStyleWorker.attributeHandler.addMod(advancedRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name")), 0);
            });
            equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
                let equippedStyleName = attrHandler.parseString(equipSlotFieldName);
                equipStyleWorker.setSelectIdFromName(attrHandler, advancedRepeater, equippedStyleName);
                equipStyleWorker.setActionFieldName(equipSlotFieldName + WuxDef._expand)
                equipStyleWorker.unequipSlot(attrHandler, actionFieldName, slotIndex, equipSlotFieldName);
                equipStyleWorker.closeMenu(attrHandler, equipSlotFieldName);
            });
            WuxWorkerActions.UpdateVisibilityOfFormeActions(equipStyleWorker.attributeHandler);
            let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
            loader.run();
        });
    }
    'use strict';

    const
        updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Technique Build Points");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxStyleWorkerBuild();
            let technique = WuxTechs.GetByVariableName(eventinfo.sourceAttribute);
            worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue, technique.techSet);
            WuxWorkerSkills.UpdateKeySkills(attributeHandler);
            attributeHandler.run();
        },
        
        refreshStats = function (attributeHandler) {
            Debug.Log("Refresh Style Stats");
            let styleWorker = new WuxStyleWorkerBuild();
            attributeHandler.addMod([styleWorker.attrBuildDraft, styleWorker.attrMax]);
            attributeHandler.addFormulaMods(styleWorker.definition);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);

                styleWorker.cleanBuildStats();
                styleWorker.setPointsMax(attrHandler);
                styleWorker.updatePoints(attrHandler);
                styleWorker.revertBuildStatsDraft(attrHandler);
            });
        },

        updateStats = function (attributeHandler) {
            Debug.Log("Update Style Stats");
            let styleWorker = new WuxStyleWorkerBuild();
            attributeHandler.addMod(styleWorker.attrBuildDraft);

            let maxNormalStyles = parseInt(WuxDef.Get("Forme_StyleSlotCount").formula.getValue());
            let normalStylesDef = WuxDef.Get("Forme_StyleSlot");
            for (let i = 1; i <= maxNormalStyles; i++) {
                attributeHandler.addMod(normalStylesDef.getVariable(i));
            }

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);
                styleWorker.cleanBuildStats();

                styleWorker.setBuildStatVariables(attrHandler);
                styleWorker.saveBuildStatsToFinal(attrHandler);
                styleWorker.revertBuildStatsDraft(attrHandler);
            });
        },

        toggleEquipJobStyle = function (eventinfo) {
            if (eventinfo.newValue == "on") {
                equipJobStyle(eventinfo);
            }
            else {
                unequipJobStyle(eventinfo);
            }
        },

        toggleEquipStyle = function (eventinfo) {
            if (eventinfo.newValue == "on") {
                equipStyle(eventinfo);
            }
            else {
                unequipStyle(eventinfo);
            }
        },

        seeTechniques = function (eventinfo) {
            Debug.Log(`See ${eventinfo.newValue} Techniques`);
            let technique = WuxTechs.Get(eventinfo.newValue);
            if (technique == undefined) {
                return;
            }

            let attributeHandler = new WorkerAttributeHandler();
            WuxWorkerInspectPopup.OpenTechniqueInspection(attributeHandler, function (attrHandler, itemPopupRepeater) {
                let style = WuxStyles.Get(technique.techSet);

                attrHandler.addUpdate(eventinfo.sourceAttribute, "0");
                attrHandler.addUpdate(WuxDef.GetVariable(WuxDef.GetName(style, WuxDef.Get("Style")), WuxDef._expand), "0");
                let advancedAffinityRaw = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity"));
                let advancedAffinities = advancedAffinityRaw.split(";").map(s => s.trim()).filter(s => s !== "");
                let affinities = [
                    attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                    ...advancedAffinities,
                    attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
                ];

                return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater,
                    style, technique.name, 9, affinities, true, false);
            });
            attributeHandler.run();
        },

        seeJobTechniques = function (eventinfo) {
            let repeater = new WorkerRepeatingSectionHandler("RepeatingJobStyles");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let actionFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Actions"));
            let seeTechniqueFieldName = eventinfo.sourceAttribute;
            seeFormeTechniques(repeater, selectedId, actionFieldName, seeTechniqueFieldName);
        },

        seeStyleTechniques = function (eventinfo) {
            let repeater = new WorkerRepeatingSectionHandler("RepeatingStyles");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let actionFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Actions"));
            let seeTechniqueFieldName = eventinfo.sourceAttribute;
            seeFormeTechniques(repeater, selectedId, actionFieldName, seeTechniqueFieldName);
        },

        unequipSetJob = function (eventinfo, slotIndex, equipSlotFieldName) {
            unequipSetTechSet(eventinfo, slotIndex, equipSlotFieldName,
                "RepeatingJobTech", "RepeatingJobStyles");
        },

        unequipSetStyle = function (eventinfo, slotIndex, equipSlotFieldName) {
            unequipSetTechSet(eventinfo, slotIndex, equipSlotFieldName,
                "RepeatingAdvTech", "RepeatingStyles");
        },

        inspectSetJobStyle = function (eventinfo, slotIndex, equipSlotFieldName) {
            seeSetFormeTechniques(eventinfo, "RepeatingJobStyles", equipSlotFieldName);
        },

        inspectSetStyle = function (eventinfo, slotIndex, equipSlotFieldName) {
            seeSetFormeTechniques(eventinfo, "RepeatingStyles", equipSlotFieldName);
        },

        deleteListStyle = function (eventinfo) {
            let worker = new WuxStyleWorkerBuild();
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingStyles");
            let repeater = attributeHandler.getRepeatingSection("RepeatingStyles");
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
            let nameFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Name"));
            attributeHandler.addMod([nameFieldName, worker.attrMax, worker.attrBuildDraft]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let styleName = attrHandler.parseString(nameFieldName);
                Debug.Log(`Deleting Style ${styleName}`);

                let variantStyles = WuxStyles.Filter(new DatabaseFilterData("style", styleName));

                worker.setBuildStatsDraft(attrHandler);
                worker.removeBuildStat(styleName);
                for (let variantStyle of variantStyles) {
                    worker.removeBuildStat(variantStyle.name);
                }
                worker.updatePoints(attrHandler);
                worker.revertBuildStatsDraft(attrHandler);
                repeater.removeId(selectedId);
                let anyRemaining = false;
                repeater.iterate(function (id) {
                    if (id !== selectedId) anyRemaining = true;
                });
                attrHandler.addUpdate(WuxDef.GetVariable("Action_StyleIsVisible"), anyRemaining ? "on" : "0");
            });
            WuxWorkerSkills.UpdateKeySkills(attributeHandler);
            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        // Debug-only (buildTechDebugSection, WuxGS-MainSheet.js, hidden once
        // PageSet is "Core"). Deliberately does NOT derive which build stats to
        // remove from RepeatingStyles' own rows (unlike deleteListStyle above) -
        // a row can end up deleted (e.g. by an earlier, buggy run of this same
        // function) without its matching build stat ever being cleaned up, and
        // once the row is gone there's nothing left to iterate to find it. This
        // instead clears every non-Basic build-stat entry directly (same
        // Basic-vs-styled distinction WuxStyleWorkerBuild.initializeData already
        // draws), so it can't be left out of sync with RepeatingStyles.
        // One-time repair: rebuilds the "Technique" build-stats draft
        // (attrBuildDraft) from RepeatingStyles' own rows, for characters where
        // the two have drifted out of sync (confirmed via diagnostic logging on
        // 2026 test data: attrBuildDraft read back completely empty -
        // {"keys":[],"values":{}} - despite RepeatingStyles still correctly
        // listing several learned styles). Mirrors performAddItem's exact write
        // shape (TechniqueInspectionPopup, Worker-InspectPopup.js) for each row:
        // the base style at {value:1, group:"Style"} plus every one of its
        // variants at {value:1, group:technique.techSet}. Not wired to any
        // button - run once from the browser console as
        // WuxWorkerStyles.RepairStyleBuildStatsFromRows() after confirming (as
        // here) that RepeatingStyles itself is still intact.
        repairStyleBuildStatsFromRows = function () {
            let worker = new WuxStyleWorkerBuild();
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingStyles");
            let repeater = attributeHandler.getRepeatingSection("RepeatingStyles");
            let formeNameVar = WuxDef.GetVariable("Forme_Name");
            attributeHandler.getRepeatingSection("RepeatingStyles").addFieldNames([formeNameVar]);
            attributeHandler.addMod([worker.attrMax, worker.attrBuildDraft]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                worker.setBuildStatsDraft(attrHandler);
                Debug.Log(`[RepairStyleBuildStatsFromRows] rows found: ${repeater.ids.length}, draft keys before: ${JSON.stringify(worker.buildStats.keys)}`);

                repeater.ids.forEach(function (id) {
                    let styleName = attrHandler.parseString(repeater.getFieldName(id, formeNameVar));
                    let baseTechnique = WuxTechs.Get(styleName);
                    if (baseTechnique == undefined) {
                        Debug.Log(`[RepairStyleBuildStatsFromRows] could not find technique "${styleName}" - skipping`);
                        return;
                    }
                    worker.updateBuildStats(attrHandler, baseTechnique.name, {value: 1, group: "Style"});
                    WuxTechs.Filter(new DatabaseFilterData("style", styleName)).forEach(function (technique) {
                        worker.updateBuildStats(attrHandler, technique.name, {value: 1, group: technique.techSet});
                    });
                });

                Debug.Log(`[RepairStyleBuildStatsFromRows] draft keys after rebuild: ${JSON.stringify(worker.buildStats.keys)}`);
                worker.updatePoints(attrHandler);
                Debug.Log(`[RepairStyleBuildStatsFromRows] points total: ${worker.buildStats.getPointsTotal()}, max: ${attrHandler.parseInt(worker.attrMax)}`);
            });
            WuxWorkerSkills.UpdateKeySkills(attributeHandler);
            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        deleteAllLearnedStyles = function () {
            let worker = new WuxStyleWorkerBuild();
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingStyles");
            let repeater = attributeHandler.getRepeatingSection("RepeatingStyles");
            attributeHandler.addMod([worker.attrMax, worker.attrBuildDraft]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                worker.setBuildStatsDraft(attrHandler);
                Debug.Log(`[DeleteAllLearnedStyles] rows found: ${repeater.ids.length}, draft keys before: ${JSON.stringify(worker.buildStats.keys)}`);

                let keysToRemove = worker.buildStats.keys.filter(function (key) {
                    let technique = WuxTechs.Get(key);
                    return technique == undefined || technique.techSet != "Basic";
                });
                keysToRemove.forEach(function (key) {
                    Debug.Log(`Deleting Style ${key}`);
                    worker.removeBuildStat(key);
                });

                // Clear out whatever RepeatingStyles rows still exist too - copy
                // first since removeId splices the real repeater.ids array, and
                // mutating it while forEach is still walking it would shift
                // indices and silently skip every other row.
                repeater.ids.slice().forEach(function (id) {
                    repeater.removeId(id);
                });

                Debug.Log(`[DeleteAllLearnedStyles] draft keys after removal: ${JSON.stringify(worker.buildStats.keys)}`);
                worker.updatePoints(attrHandler);
                Debug.Log(`[DeleteAllLearnedStyles] points total after removal: ${worker.buildStats.getPointsTotal()}, max: ${attrHandler.parseInt(worker.attrMax)}`);
                worker.revertBuildStatsDraft(attrHandler);
                attrHandler.addUpdate(WuxDef.GetVariable("Action_StyleIsVisible"), "0");
            });
            WuxWorkerSkills.UpdateKeySkills(attributeHandler);
            WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
            attributeHandler.run();
        },

        // Writes the full technique display (header/effects/variants) for one
        // RepeatingStyles row, using the same "Action"-prefixed fields and
        // TechniqueDataAttributeHandler.setTechniqueInfo the live Actions tab and
        // technique catalog already use - Roll20 auto-scopes these to whichever
        // repeater's fieldset they're rendered inside (printLearnedStyleFullDisplay,
        // WuxGS-Base.js), so no new fields were needed. excludeCurrent drops the
        // style's own variant button from its own row (same reasoning as the
        // catalog); userAffinities restricts variant buttons to what the character
        // can actually use, matching the live tab's own variant-button convention -
        // undefined (no filtering) when "Show Element-Restricted Techniques" is on.
        // TechShowEffects is deliberately left untouched here - it's a per-row user
        // toggle (WuxGS-Base.js), and the compiled HTML's own default ("0", hidden)
        // already covers a freshly-created or never-touched row correctly, so
        // writing it here would just risk stomping a state the player already set.
        populateStyleTechniqueDisplay = function (attrHandler, repeater, id, styleName, userAffinities) {
            let technique = WuxTechs.Get(styleName);
            if (technique == undefined) {
                return;
            }
            let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
            techniqueAttributeHandler.setRepeaterData(repeater, id);
            techniqueAttributeHandler.setTechniqueInfo(technique, false, {excludeCurrent: true, userAffinities: userAffinities});
        },

        // One-time backfill for styles learned before this display existed - not
        // wired to any button, run once from the browser console as
        // WuxWorkerStyles.RefreshStyleListDisplay() after adding the full-card
        // display. Styles learned after that point populate immediately via
        // performAddItem (Worker-InspectPopup.js), which calls
        // populateStyleTechniqueDisplay directly.
        refreshStyleListDisplay = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("RepeatingStyles");
            let repeater = attributeHandler.getRepeatingSection("RepeatingStyles");
            let formeNameVar = WuxDef.GetVariable("Forme_Name");
            repeater.addFieldNames([formeNameVar]);
            attributeHandler.addMod([
                WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry"),
                WuxDef.GetVariable("Forme_ShowFromNonElement")
            ]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let showElementRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
                let advancedAffinities = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")).split(";").map(s => s.trim()).filter(s => s !== "");
                let userAffinities = showElementRestricted ? undefined : [
                    attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                    ...advancedAffinities,
                    attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
                ];
                repeater.ids.forEach(function (id) {
                    let styleName = attrHandler.parseString(repeater.getFieldName(id, formeNameVar));
                    populateStyleTechniqueDisplay(attrHandler, repeater, id, styleName, userAffinities);
                });
            });
            attributeHandler.run();
        }

    ;

    return {
        UpdateBuildPoints: updateBuildPoints,
        RefreshStats: refreshStats,
        UpdateStats: updateStats,
        ToggleEquipJobStyle: toggleEquipJobStyle,
        ToggleEquipStyle: toggleEquipStyle,
        UnequipSetJobStyle: unequipSetJob,
        UnequipSetStyle: unequipSetStyle,
        SeeTechniques: seeTechniques,
        SeeJobTechniques: seeJobTechniques,
        SeeStyleTechniques: seeStyleTechniques,
        InspectSetJobStyle: inspectSetJobStyle,
        InspectSetStyle: inspectSetStyle,
        DeleteListStyle: deleteListStyle,
        DeleteAllLearnedStyles: deleteAllLearnedStyles,
        RepairStyleBuildStatsFromRows: repairStyleBuildStatsFromRows,
        PopulateStyleTechniqueDisplay: populateStyleTechniqueDisplay,
        RefreshStyleListDisplay: refreshStyleListDisplay
    };
}());

