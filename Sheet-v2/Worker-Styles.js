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

        closeMenu(attrHandler) {
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
            attrHandler.addUpdate(this.subMenuOptionFieldName, "0");
            attrHandler.addUpdate(this.actionFieldName, "0");
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

            WuxWorkerActions.PopulateStyleActions(actionFieldName, slotIndex, styleName, tier);
        }

        unequipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName) {
            attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "0");
            attrHandler.addUpdate(emptySlotFieldName, "0");

            WuxWorkerActions.RemoveStyleActions(actionFieldName, slotIndex);
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

    const populateStyleInspectionTechniques = function (attrHandler, itemPopupRepeater, styleName, maxDisplayTier, affinities, showTierHeaders, restrictToAffinities) {
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${styleName} Techniques`);
        let style = WuxStyles.Get(styleName);
        let maxTier = Math.min(style.maxTier, maxDisplayTier);

        let selectedElement = null;
        let styleTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", styleName));

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
                    addStyleTierHeaderToInspectionPopup(attrHandler, itemPopupRepeater, affinity, styleName, tier);
                }

                techsByAffinity.forEach(function (styleTechnique) {
                    let newRowId = itemPopupRepeater.getNextId();
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), styleTechnique.name);
                    attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Tech");

                    if (selectedElement == null) {
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
    const addStyleTierHeaderToInspectionPopup = function (attrHandler, itemPopupRepeater, affinity, styleName, tier) {
        let techHeader = "";
        let techDesc = "";
        if (tier != 0) {
            techHeader += `Tier ${tier}`;
            techDesc += `These techniques are learned upon reaching ${styleName} Tier ${tier}`;
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
        let maxSlots = 3;
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
                equipStyleWorker.closeMenu(attrHandler);
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
            });
            let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
            loader.run();
        });
    };
    const unequipJobStyle = function (eventinfo) {
        let countFieldName = "JobSlots";
        let slotName = "Forme_JobSlot";
        let maxSlots = 3;
        let actionFieldName = "RepeatingJobTech";

        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingJobStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquip([countFieldName], [slotName], [maxSlots]);

        equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
            let styleName = attrHandler.parseString(equipStyleWorker.styleFieldName);
            equipStyleWorker.closeMenu(attrHandler);
            let emptyEquipSlot = equipStyleWorker.getEquippedSlotFieldName(attrHandler, WuxDef.Get(slotName),
                styleName, maxSlots);
            if (emptyEquipSlot != undefined) {
                equipStyleWorker.unequipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
            }
            else {
                Debug.Log(`No Job Slot found for ${styleName}`);
                // attrHandler.addUpdate(equipStyleWorker.styleRepeater.getFieldName(equipStyleWorker.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "on");
            }
        });
        let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
        loader.run();
    };

    const equipStyle = function (eventinfo) {
        let arteformCountFieldName = "AdvancedSlots";
        let advancedCountFieldName = "StyleSlots";
        let arteformSlotName = "Forme_AdvancedSlot";
        let advancedSlotName = "Forme_StyleSlot";
        let arteformMaxSlots = 3;
        let advancedMaxSlots = 6;
        let actionFieldName = "RepeatingAdvTech";

        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquipStyle([arteformCountFieldName, advancedCountFieldName], 
            [arteformSlotName, advancedSlotName], [arteformMaxSlots, advancedMaxSlots]);

        equipStyleWorker.styleRepeater.getIds(function (equipRepeater) {

            equipRepeater.iterate(function (id) {
                equipStyleWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name")), 0);
            });

            equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
                equipStyleWorker.closeMenu(attrHandler);
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
                        
                        // arteform and advanced slots share the same repeaters. So this increments by the max count
                        emptyEquipSlot.index += arteformMaxSlots;
                    }
                }
                else {
                    Debug.Log(`Equipping to Advanced Slot ${emptyEquipSlot.slotFieldName}`);
                }
                equipStyleWorker.equipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
            });
            let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
            loader.run();
        });
    };
    const unequipStyle = function (eventinfo) {
        let arteformCountFieldName = "AdvancedSlots";
        let advancedCountFieldName = "StyleSlots";
        let arteformSlotName = "Forme_AdvancedSlot";
        let advancedSlotName = "Forme_StyleSlot";
        let arteformMaxSlots = 3;
        let advancedMaxSlots = 6;
        let actionFieldName = "RepeatingAdvTech";

        let equipStyleWorker = new EquipStyleWorker();
        equipStyleWorker.setEquipSetterValues(eventinfo.sourceAttribute, "RepeatingStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquipStyle([arteformCountFieldName, advancedCountFieldName], 
            [arteformSlotName, advancedSlotName], [arteformMaxSlots, advancedMaxSlots]);

        equipStyleWorker.attributeHandler.addGetAttrCallback(function (attrHandler) {
            equipStyleWorker.closeMenu(attrHandler);
            
            let styleName = attrHandler.parseString(equipStyleWorker.styleFieldName);
            Debug.Log(`Unequip ${styleName}`);
            let emptyEquipSlot = equipStyleWorker.getEquippedSlotFieldName(attrHandler, WuxDef.Get(arteformSlotName),
                styleName, arteformMaxSlots);
            if (emptyEquipSlot != undefined) {
                Debug.Log(`Found Advanced Slot ${emptyEquipSlot.slotFieldName}`);
                equipStyleWorker.unequipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
            }
            else {
                emptyEquipSlot = equipStyleWorker.getEquippedSlotFieldName(attrHandler, WuxDef.Get(advancedSlotName),
                    styleName, advancedMaxSlots);
                if (emptyEquipSlot != undefined) {
                    Debug.Log(`Found Style Slot ${emptyEquipSlot.slotFieldName} `);
                    equipStyleWorker.unequipSlot(attrHandler, actionFieldName, emptyEquipSlot.index + arteformMaxSlots, emptyEquipSlot.slotFieldName);
                }
                else {
                    // attrHandler.addUpdate(equipStyleWorker.styleRepeater.getFieldName(equipStyleWorker.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "on");
                    Debug.Log(`No Style Slot found for ${styleName}`);
                }
            }
        });
        let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
        loader.run();
    };
    const seeFormeTechniques = function (repeater, selectedId, actionFieldName, seeTechniqueFieldName) {
        Debug.Log("See Forme Techniques");
        
        let nameFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Name"));
        let tierFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Tier"));
        let crFieldName = WuxDef.GetVariable("CR");

        WuxWorkerInspectPopup.OpenTechniqueInspection(
            function (attrHandler) {
                attrHandler.addMod([nameFieldName, tierFieldName, crFieldName]);
                attrHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry")]);
            },
            function (attrHandler, itemPopupRepeater) {
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                attrHandler.addUpdate(seeTechniqueFieldName, "0");
                attrHandler.addUpdate(actionFieldName, "0");
                let maxTier = attrHandler.parseInt(tierFieldName);
                let cr = attrHandler.parseInt(crFieldName);
                let affinities = [attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                    attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")),
                    attrHandler.parseString(WuxDef.GetVariable("Ancestry"))];
                
                return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater, 
                    attrHandler.parseString(nameFieldName), Math.min(maxTier, cr), affinities, false, true);
            }
        );
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
                equipStyleWorker.closeMenu(attrHandler);
                equipStyleWorker.unequipSlot(attrHandler, actionFieldName, slotIndex, equipSlotFieldName);
            });
            let loader = new LoadingScreenHandler(equipStyleWorker.attributeHandler);
            loader.run();
        });
    }
    'use strict';

    const
        addStyles = function (attrHandler, styleWorker, advancedRepeater) {
            let jobSlots = [];
            let advancedSlots = [];
            let normalSlots = [];
            let jobStyles = WuxDef.Get("Forme_JobSlot");
            let advancedStyles = WuxDef.Get("Forme_AdvancedSlot");
            let normalStyles = WuxDef.Get("Forme_StyleSlot");
            let maxAdvancedSlots = 3;
            let maxNormalSlots = 6;
            for (let i = 1; i <= maxNormalSlots; i++) {
                if (i <= maxAdvancedSlots) {
                    jobSlots.push({name: attrHandler.parseString(jobStyles.getVariable(i)), index: i});
                    advancedSlots.push({name: attrHandler.parseString(advancedStyles.getVariable(i)), index: i});
                    normalSlots.push({name: attrHandler.parseString(advancedStyles.getVariable(i)), index: i});
                }
                normalSlots.push({name: attrHandler.parseString(normalStyles.getVariable(i)), index: i + maxAdvancedSlots});
            }

            styleWorker.iterateBuildStats(function (styleVariableData) {
                let style = WuxStyles.GetByVariableName(styleVariableData.name);
                if (style.group != "" && styleVariableData.value > 0) {
                    let newRowId = advancedRepeater.generateRowId();
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Name")), style.name);
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Tier")), styleVariableData.value);
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Actions")), 0);
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_SeeTechniques")), 0);
                    let matchingSlotData = undefined;
                    let actionFieldName = "";
                    switch (style.group) {
                        case "Job":
                            Debug.Log(`Checking through ${JSON.stringify(jobSlots)} for ${style.name}`);
                            actionFieldName = "RepeatingJobTech";
                            jobSlots.forEach(function (slot) {
                                if(slot.name == style.name) {
                                    matchingSlotData = slot;
                                }
                            });
                            break;
                        case "Advanced":
                            actionFieldName = "RepeatingAdvTech";
                            attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsAdvanced")), "on");
                            advancedSlots.forEach(function (slot) {
                                if(slot.name == style.name) {
                                    matchingSlotData = slot;
                                }
                            });
                            break;
                        case "Style":
                            actionFieldName = "RepeatingAdvTech";
                            attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsAdvanced")), 0);
                            normalSlots.forEach(function (slot) {
                                if(slot.name == style.name) {
                                    matchingSlotData = slot;
                                }
                            });
                            break;
                    }

                    if (matchingSlotData != undefined) {
                        attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsEquipped")), "on");
                        let equipStyleWorker = new EquipStyleWorker();
                        equipStyleWorker.styleRepeater = advancedRepeater;
                        equipStyleWorker.selectedId = newRowId;
                        equipStyleWorker.styleFieldName = advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Actions"));
                        equipStyleWorker.equipSlot(attrHandler, actionFieldName, matchingSlotData.index, matchingSlotData.name, style.name, styleVariableData.value);
                    }
                    else {
                        attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsEquipped")), 0);
                    }
                }
            });
        },
        
        updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Styles Build Points");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxStyleWorkerBuild();
            worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },
        
        refreshStats = function (attributeHandler) {
            Debug.Log("Refresh Style Stats");
            let styleWorker = new WuxStyleWorkerBuild();
            attributeHandler.addMod([styleWorker.attrBuildDraft, styleWorker.attrMax]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);

                styleWorker.cleanBuildStats();
                styleWorker.updatePoints(attrHandler);
                styleWorker.revertBuildStatsDraft(attrHandler);
            });
        },

        updateStats = function (attributeHandler) {
            Debug.Log("Update Style Stats");
            let styleWorker = new WuxStyleWorkerBuild();
            attributeHandler.addMod(styleWorker.attrBuildDraft);

            let maxAdvancedStyles = 3;
            let maxNormalStyles = 6;
            let advancedStylesDef = WuxDef.Get("Forme_AdvancedSlot");
            let normalStylesDef = WuxDef.Get("Forme_StyleSlot");
            for (let i = 1; i <= maxNormalStyles; i++) {
                if (i <= maxAdvancedStyles) {
                    attributeHandler.addMod(advancedStylesDef.getVariable(i));
                }
                attributeHandler.addMod(normalStylesDef.getVariable(i));
            }

            let advancedStyleValuesRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingStyles");
            advancedStyleValuesRepeatingSection.getIds(function (advancedRepeater) {
                advancedRepeater.removeAllIds();
            });

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                styleWorker.setBuildStatsDraft(attrHandler);

                addStyles(attrHandler, styleWorker, advancedStyleValuesRepeatingSection);

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
            Debug.Log("See Techniques");
            
            WuxWorkerInspectPopup.OpenTechniqueInspection(function () {
                },
                function (attrHandler, itemPopupRepeater) {
                    let style = eventinfo.newValue;

                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                    attrHandler.addUpdate(eventinfo.sourceAttribute, "0");
                    attrHandler.addUpdate(WuxDef.GetVariable(WuxDef.GetName(style, WuxDef.Get("Style")), WuxDef._expand), "0");
                    let affinities = [attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                        attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")),
                        attrHandler.parseString(WuxDef.GetVariable("Ancestry"))];

                    return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater, style, 9, affinities, true, false);
                }
            );
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
        }
    
    ;

    return {
        AddStyles: addStyles,
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
        InspectSetStyle: inspectSetStyle
    };
}());

