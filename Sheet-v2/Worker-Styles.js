class EquipStyleWorker {
    constructor(subMenuOptionFieldName, repeatingSectionName) {
        this.attributeHandler = new WorkerAttributeHandler();
        this.styleRepeater = new WorkerRepeatingSectionHandler(repeatingSectionName);
        this.subMenuOptionFieldName = subMenuOptionFieldName;
        this.selectedId = "";
        this.actionFieldName = "";
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
        this.arteformFieldName = this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_IsArteform"));
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
    
    equipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName) {
        attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "on");
        let styleName = attrHandler.parseString(this.styleFieldName);
        attrHandler.addUpdate(emptySlotFieldName, styleName);
        
        WuxWorkerActions.PopulateStyleActions(actionFieldName, slotIndex, 
            attrHandler.parseString(this.styleFieldName), attrHandler.parseString(this.tierFieldName));
    }
    
    unequipSlot(attrHandler, actionFieldName, slotIndex, emptySlotFieldName) {
        attrHandler.addUpdate(this.styleRepeater.getFieldName(this.selectedId, WuxDef.GetVariable("Forme_IsEquipped")), "0");
        attrHandler.addUpdate(emptySlotFieldName, "0");
        
        // remove all items from a slot
        let repeatingWorker = new WorkerRepeatingSectionHandler(actionFieldName, slotIndex);
        repeatingWorker.getIds(function (repeater) {
            repeater.removeAllIds();
        });
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

var WuxWorkerStyles = WuxWorkerStyles || (function () {

    const populateStyleInspectionTechniques = function (attrHandler, itemPopupRepeater, styleName, maxDisplayTier, affinities, showTierHeaders) {
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${styleName} Techniques`);
        let style = WuxStyles.Get(styleName);
        let maxTier = Math.min(style.maxTier, maxDisplayTier);

        let selectedElement = null;
        let styleTechniques = WuxTechs.FilterAndSortTechniquesByRequirement(new DatabaseFilterData("style", styleName));

        Debug.Log(`Populate ${maxTier} tiers of ${styleName} techniques`);
        for (let tier = 1; tier <= maxTier; tier++) {
            Debug.Log(`Adding Style Techniques for ${styleName} at tier ${tier}`);

            let tierData = styleTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }
                
                if (showTierHeaders) {
                    addStyleTierHeaderToInspectionPopup(attrHandler, itemPopupRepeater, affinity, styleName, tier);
                }

                techsByAffinity.forEach(function (styleTechnique) {
                    let newRowId = itemPopupRepeater.generateRowId();
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
            techHeader += (techHeader == "" ? "" : "; ") + `${affinity} Affinity`;
            techDesc +=  (techDesc == "" ? "" : " ") + `and require ${affinity} affinity`;
        }

        let newRowId = itemPopupRepeater.generateRowId();
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), techHeader);
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "");
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectDesc")), techDesc);
        attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
    };
    
    const addStyles = function (attrHandler, styleWorker, advancedRepeater) {
        Debug.Log("Add Styles");

        let arteformSlots = [];
        let advancedSlots = [];
        let arteformDef = WuxDef.Get("Forme_ArteformSlot");
        let advancedDef = WuxDef.Get("Forme_StyleSlot");
        let maxSlots = 3;
        for (let i = 1; i <= maxSlots; i++) {
            arteformSlots.push(attrHandler.parseString(arteformDef.getVariable(i)));
            advancedSlots.push(attrHandler.parseString(advancedDef.getVariable(i)));
        }

        styleWorker.iterateBuildStats(function (styleVariableData) {
            let style = WuxStyles.GetByVariableName(styleVariableData.name);
            if (style.group != "") {
                let newRowId = advancedRepeater.generateRowId();
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Name")), style.name);
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Tier")), styleVariableData.value);
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Actions")), 0);
                attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_SeeTechniques")), 0);
                if (style.group == "Arteform") {
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsArteform")), "on");
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsEquipped")), arteformSlots.includes(style.name) ? "on" : 0);
                }
                else if (style.group == "Style") {
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsArteform")), 0);
                    attrHandler.addUpdate(advancedRepeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_IsEquipped")), advancedSlots.includes(style.name) ? "on" : 0);
                }
            }
        });
    };

    const equipJobStyle = function (eventinfo) {
        let countFieldName = "JobSlots";
        let slotName = "Forme_JobSlot";
        let maxSlots = 3;
        let actionFieldName = "RepeatingJobTech";

        let equipStyleWorker = new EquipStyleWorker(eventinfo.sourceAttribute, "RepeatingJobStyles");
        equipStyleWorker.setSelectIdFromEventinfo(eventinfo);
        equipStyleWorker.setupForEquip([countFieldName], [slotName], [maxSlots]);

        equipStyleWorker.styleRepeater.getIds(function (equipRepeater) {

            equipRepeater.iterate(function (id) {
                equipStyleWorker.attributeHandler.addMod(equipRepeater.getFieldName(id, WuxDef.GetVariable("Forme_Name")), 0);
            });

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
            });
            equipStyleWorker.attributeHandler.run();
        });
    };
    const unequipJobStyle = function (eventinfo) {
        let countFieldName = "JobSlots";
        let slotName = "Forme_JobSlot";
        let maxSlots = 3;
        let actionFieldName = "RepeatingJobTech";

        let equipStyleWorker = new EquipStyleWorker(eventinfo.sourceAttribute, "RepeatingJobStyles");
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
        equipStyleWorker.attributeHandler.run();
    };

    const equipStyle = function (eventinfo) {
        let arteformCountFieldName = "ArteformSlots";
        let advancedCountFieldName = "StyleSlots";
        let arteformSlotName = "Forme_ArteformSlot";
        let advancedSlotName = "Forme_StyleSlot";
        let arteformMaxSlots = 3;
        let advancedMaxSlots = 6;
        let actionFieldName = "RepeatingAdvTech";

        let equipStyleWorker = new EquipStyleWorker(eventinfo.sourceAttribute, "RepeatingStyles");
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
                        Debug.Log(`Equipping to Arteform Slot ${emptyEquipSlot.slotFieldName}`);
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
                    Debug.Log(`Equipping to Arteform Slot ${emptyEquipSlot.slotFieldName}`);
                }
                equipStyleWorker.equipSlot(attrHandler, actionFieldName, emptyEquipSlot.index, emptyEquipSlot.slotFieldName);
            });
            equipStyleWorker.attributeHandler.run();
        });
    };
    const unequipStyle = function (eventinfo) {
        let arteformCountFieldName = "ArteformSlots";
        let advancedCountFieldName = "StyleSlots";
        let arteformSlotName = "Forme_ArteformSlot";
        let advancedSlotName = "Forme_StyleSlot";
        let arteformMaxSlots = 3;
        let advancedMaxSlots = 6;
        let actionFieldName = "RepeatingAdvTech";

        let equipStyleWorker = new EquipStyleWorker(eventinfo.sourceAttribute, "RepeatingStyles");
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
                Debug.Log(`Found Arteform Slot ${emptyEquipSlot.slotFieldName}`);
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
        equipStyleWorker.attributeHandler.run();
    };
    const seeFormeTechniques = function (eventinfo, repeaterName) {
        Debug.Log("See Forme Techniques");
        
        let repeater = new WorkerRepeatingSectionHandler(repeaterName);
        let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
        let nameFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Name"));
        let tierFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Tier"));
        let actionFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Actions"));
        let seeTechniqueFieldName = eventinfo.sourceAttribute;
        let crFieldName = WuxDef.GetVariable("CR");

        WuxWorkerInspectPopup.OpenTechniqueInspection(
            function (attrHandler) {
                attrHandler.addMod([nameFieldName, tierFieldName, crFieldName]);
                attrHandler.addMod([WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("AdvancedBranch")]);
            },
            function (attrHandler, itemPopupRepeater) {
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                attrHandler.addUpdate(seeTechniqueFieldName, "0");
                attrHandler.addUpdate(actionFieldName, "0");
                let maxTier = attrHandler.parseInt(tierFieldName);
                let cr = attrHandler.parseInt(crFieldName);
                let affinities = [attrHandler.parseString(WuxDef.GetVariable("Affinity")),
                attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")),
                attrHandler.parseString(WuxDef.GetVariable("AdvancedBranch"))];
                
                return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater, 
                    attrHandler.parseString(nameFieldName), Math.min(maxTier, cr), affinities, false);
            });
    }
    const unequipSetTechSet = function (eventinfo, slotIndex, equipSlotFieldName, actionFieldName, repeatingSectionName) {
        let equipStyleWorker = new EquipStyleWorker(eventinfo.sourceAttribute, repeatingSectionName);
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
            equipStyleWorker.attributeHandler.run();
        });
    }
    'use strict';

    const updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Styles Build Points");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Style");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },

        updateStats = function (attributeHandler) {
            Debug.Log("Update Style Stats");
            let styleWorker = new WuxBasicWorkerBuild("Style");
            attributeHandler.addMod(styleWorker.attrBuildDraft);
            
            let maxSlots = 3;
            let arteformDef = WuxDef.Get("Forme_ArteformSlot");
            let advancedDef = WuxDef.Get("Forme_StyleSlot");
            for (let i = 1; i <= maxSlots; i++) {
                attributeHandler.addMod([arteformDef.getVariable(i), advancedDef.getVariable(i)]);
            }
            
            let advancedStyleValuesRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingStyles");
            advancedStyleValuesRepeatingSection.getIds(function (advancedRepeater) {
                advancedRepeater.removeAllIds();
            });
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                Debug.Log("Adding Style Stats");
                styleWorker.setBuildStatsDraft(attrHandler);

                addStyles(attrHandler, styleWorker, advancedStyleValuesRepeatingSection);

                styleWorker.cleanBuildStats();
                styleWorker.setBuildStatVariables(attrHandler);
                styleWorker.saveBuildStatsToFinal(attrHandler);
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

        unequipSetJob = function (eventinfo, slotIndex, equipSlotFieldName) {
            unequipSetTechSet(eventinfo, slotIndex, equipSlotFieldName,
                "RepeatingJobTech", "RepeatingJobStyles");
        },

        unequipSetStyle = function (eventinfo, slotIndex, equipSlotFieldName) {
            unequipSetTechSet(eventinfo, slotIndex, equipSlotFieldName,
                "RepeatingAdvTech", "RepeatingStyles");
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

                    return populateStyleInspectionTechniques(attrHandler, itemPopupRepeater, style, 9, true);
                }
            );
        },

        seeJobTechniques = function (eventinfo) {
            seeFormeTechniques(eventinfo, "RepeatingJobStyles");
        },

        seeStyleTechniques = function (eventinfo) {
            seeFormeTechniques(eventinfo, "RepeatingStyles");
        };

    return {
        UpdateBuildPoints: updateBuildPoints,
        UpdateStats: updateStats,
        ToggleEquipJobStyle: toggleEquipJobStyle,
        ToggleEquipStyle: toggleEquipStyle,
        UnequipSetJobStyle: unequipSetJob,
        UnequipSetStyle: unequipSetStyle,
        SeeTechniques: seeTechniques,
        SeeJobTechniques: seeJobTechniques,
        SeeStyleTechniques: seeStyleTechniques
    };
}());

