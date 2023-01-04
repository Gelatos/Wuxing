// ======= Clones
// =================================================

function SetPartyManagerClone(charId) {
    
    // get party manager
    var partyManager = FindCharacter("PartyManager");
    SetClone(partyManager, charId);
}

function SetCloneManagerClone(charId) {
    
    // get party manager
    var cloneManager = FindCharacter("CloneManager");
    SetClone(cloneManager, charId);
}

function SetClone(manager, charId) {
    
    // get party manager
    var charName = GetCharacter(charId).get('name');
    var cloneName = GetCharacterAttribute(manager.id, "npc_name");
    var cloneExpanded = GetCharacterAttribute(manager.id, "isExpandedClone");

    if (cloneName.get("current") != charName) {
        cloneExpanded.set("current", "0");
        cloneName.set("current", charName);
        ClearPartyManagerCloneBase(manager.id);
        
        AddPartyManagerCloneTraitOptions(manager.id, charId);
        AddPartyManagerCloneAttackOptions(manager.id, charId);
    }
    else if (cloneExpanded.get("current") == "0") {
        cloneExpanded.set("current", "1");
        ClearPartyManagerCloneSpells(manager.id);

        AddPartyManagerAttributeOptions(manager.id, charName, charId);
        AddPartyManagerCloneResources(manager.id, charId, charName);
        AddPartyManagerCloneSpellOptions(manager.id, charId);
    }
    else if (cloneExpanded.get("current") == "1") {
        cloneExpanded.set("current", "2");
        ClearPartyManagerCloneResources(manager.id);

        AddPartyManagerExpandedCloneResources(manager.id, charId, charName);
        AddPartyManagerSkillOptions(manager.id, charName, charId);
    }
}

function ClearPartyManagerCloneBase(partyManagerId) {

    // declare variables
    let repeatingIds = "";

    // iterate through all of the trait ids
    repeatingIds = getAttrByName(partyManagerId, "allTraitIds");
    if (repeatingIds != "") {
        repeatingIds = repeatingIds.split(",");
        _.each(repeatingIds, function(repeatingId) {
            // get the attack data for the attack id
            RemoveRowData(partyManagerId, "repeating_npctrait_" + repeatingId + "_name");
            RemoveRowData(partyManagerId, "repeating_npctrait_" + repeatingId + "_rollTrait");
            RemoveRowData(partyManagerId, "repeating_npctrait_" + repeatingId + "_desc");
        });
    }

    // iterate through all of the attack ids
    repeatingIds = getAttrByName(partyManagerId, "allAttackIds");
    if (repeatingIds != "") {
        repeatingIds = repeatingIds.split(",");
        _.each(repeatingIds, function(repeatingId) {
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_atkname");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_rollbase");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_hasAttackFlag");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_attackString");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_hasDamageFlag");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_damageString");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_hasDamage2Flag");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_damage2String");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_descFlag");
            RemoveRowData(partyManagerId, "repeating_attack_" + repeatingId + "_atk_desc");
        });
    }
}

function ClearPartyManagerCloneSpells(partyManagerId) {

    // iterate through all of the spell ids
    repeatingIds = getAttrByName(partyManagerId, "allSpellIds");
    if (repeatingIds != "") {
        repeatingIds = repeatingIds.split(",");
        _.each(repeatingIds, function(repeatingId) {
            // get the attack data for the attack id
            RemoveRowData(partyManagerId, "repeating_spell-9_" + repeatingId + "_spellname");
            RemoveRowData(partyManagerId, "repeating_spell-9_" + repeatingId + "_spellmemo");
            RemoveRowData(partyManagerId, "repeating_spell-9_" + repeatingId + "_rollcontent");
            RemoveRowData(partyManagerId, "repeating_spell-9_" + repeatingId + "_rollcontentdamage");
            RemoveRowData(partyManagerId, "repeating_spell-9_" + repeatingId + "_spellmana");
        });
    }

}

function ClearPartyManagerCloneResources(partyManagerId) {

    // iterate through all of the trait ids
    repeatingIds = getAttrByName(partyManagerId, "allResources");
    if (repeatingIds != "") {
        repeatingIds = repeatingIds.split(",");
        _.each(repeatingIds, function(repeatingId) {
            // get the attack data for the attack id
            RemoveRowData(partyManagerId, "repeating_resources_" + repeatingId + "_resourcename");
            RemoveRowData(partyManagerId, "repeating_resources_" + repeatingId + "_resourcecount");
        });
    }
}

function AddPartyManagerAttributeOptions(partyManagerId, charName, charId) {

    let image = getAttrByName(charId, "emote_activesetimageurl");
    AddPartyManagerAttribute("Strength", partyManagerId, charName, charId, image);
    AddPartyManagerAttribute("Dexterity", partyManagerId, charName, charId, image);
    AddPartyManagerAttribute("Constitution", partyManagerId, charName, charId, image);
    AddPartyManagerAttribute("Intelligence", partyManagerId, charName, charId, image);
    AddPartyManagerAttribute("Wisdom", partyManagerId, charName, charId, image);
    AddPartyManagerAttribute("Charisma", partyManagerId, charName, charId, image);
}

function AddPartyManagerAttribute(attrName, partyManagerId, charName, charId, image) {
    var attrMod, setAttr;

    attrMod = getAttrByName(charId, attrName.toLowerCase());
    setAttr = GetCharacterAttribute(partyManagerId, attrName.toLowerCase());
    if (setAttr != undefined) { 
        setAttr.set("current", attrMod);
    }

    setAttr = GetCharacterAttribute(partyManagerId, "roll" + attrName);
    if (setAttr != undefined) { 
        setAttr.set("current",  GetAttributeRoll(attrName, charName, image));
    }
}

function AddPartyManagerSkillOptions(partyManagerId, charName, charId) {

    let image = getAttrByName(charId, "emote_activesetimageurl");
    AddPartyManagerSkill("Acrobatics", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Animal Handling", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Arcana", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Athletics", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Deception", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("History", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Insight", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Intimidation", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Investigation", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Medicine", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Nature", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Perception", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Performance", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Persuasion", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Religion", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Sleight of Hand", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Stealth", partyManagerId, charName, charId, image);
    AddPartyManagerSkill("Survival", partyManagerId, charName, charId, image);
}

function AddPartyManagerSkill(attrName, partyManagerId, charName, charId, image) {
    var attrMod, setAttr;
    var lowercaseSkill = attrName.toLowerCase().replace(/ /g, "_");

    attrMod = getAttrByName(charId, lowercaseSkill + "_bonus");
    setAttr = GetCharacterAttribute(partyManagerId, lowercaseSkill + "_bonus");
    if (setAttr != undefined) { 
        setAttr.set("current", attrMod);
    }

    setAttr = GetCharacterAttribute(partyManagerId, "roll" + lowercaseSkill);
    if (setAttr != undefined) { 
        setAttr.set("current",  GetSkillRoll(attrName, charName, image));
    }
}

function AddPartyManagerCloneResources(partyManagerId, charId, charName) {

    let setAttr;

    // add speed
    var speed = getAttrByName(charId, "speed");
    if (speed != "") {
        setAttr = GetCharacterAttribute(partyManagerId, "speed");
        if (setAttr != undefined) {
            setAttr.set("current", speed);
        }
    }

    // add ac
    var ac = getAttrByName(charId, "ac_barrier");
    if (ac != undefined) {
        setAttr = GetCharacterAttribute(partyManagerId, "ac_barrier");
        if (setAttr != undefined) {
            setAttr.set("current", ac);
        }
    }
    var ac = getAttrByName(charId, "ac_shatterbarrier");
    if (ac != undefined) {
        setAttr = GetCharacterAttribute(partyManagerId, "ac_shatterbarrier");
        if (setAttr != undefined) {
            setAttr.set("current", ac);
        }
    }

    // add vitality
    var vitality = GetCharacterAttribute(charId, "vitality");
    if (vitality != undefined) {
        setAttr = GetCharacterAttribute(partyManagerId, "vitality");
        if (setAttr != undefined) {
            setAttr.set("current", vitality.get("current"));
            setAttr.set("max", vitality.get("max"));
        }
    }

    // add surge
    var surge = getAttrByName(charId, "surge_bonus");
    if (surge != "") {
        setAttr = GetCharacterAttribute(partyManagerId, "surge_bonus");
        if (setAttr != undefined) {
            setAttr.set("current", surge);
        }
    }

    // add ki
    var ki = GetCharacterAttribute(charId, "ki");
    if (ki != undefined) {
        setAttr = GetCharacterAttribute(partyManagerId, "ki");
        if (setAttr != undefined) {
            setAttr.set("current", ki.get("current"));
            setAttr.set("max", ki.get("max"));
        }
    }
}

function AddPartyManagerExpandedCloneResources(partyManagerId, charId, charName) {

    var newId, newRowRef;
    var newIds = "";

    // add specialized resources
    var specialResourceIds = getAttrByName(charId, "allResources");
    var resourceName, resourceCount;
    if (specialResourceIds != "") {
        specialResourceIds = specialResourceIds.split(",");
        _.each(specialResourceIds, function(id) {
            resourceName = getAttrByName(charId, "repeating_resources_" + id + "_resourcename");
            resourceCount = getAttrByName(charId, "repeating_resources_" + id + "_resourcecount");
            if (resourceName != "") {
                // add the new row
                newId = generateRowID();
                newRowRef = "repeating_resources_" + newId;
                newIds += newId + ",";
                createObj("attribute", {"name": newRowRef + "_resourcename", "current": resourceName, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_resourcecount", "current": resourceCount, "_characterid": partyManagerId});
            }
        });

        let allIdsObj = GetCharacterAttribute(partyManagerId, "allResources");
        allIdsObj.set("current", newIds.substr(0, (newIds.length > 0 ? newIds.length - 1 : 0)));
    }
}

function AddPartyManagerCloneTraitOptions(partyManagerId, charId) {
    
    // declare variables
    var traitIds = "";
    var newTraitIds = "";
    var traitName = "";
    var traitRoll = "";
    var traitDesc = "";
    var newId, newRowRef;

    // iterate through all of the attack ids
    traitIds = getAttrByName(charId, "allTraitIds");
    if (traitIds != "") {
        traitIds = traitIds.split(",");
        for (var j = 0; j < traitIds.length - 1; j++) {

            // get the attack data for the attack id
            traitName = getAttrByName(charId, "repeating_npctrait_" + traitIds[j] + "_name");
            traitRoll = getAttrByName(charId, "repeating_npctrait_" + traitIds[j] + "_rollTrait");
            traitDesc = getAttrByName(charId, "repeating_npctrait_" + traitIds[j] + "_desc");

            // add the attack to the send message
            if (traitName != "" && traitRoll != "") {
                // add the new row
                newId = generateRowID();
                newRowRef = "repeating_npctrait_" + newId;
                newTraitIds += newId + ",";
                createObj("attribute", {"name": newRowRef + "_name", "current": traitName, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_rollTrait", "current": traitRoll, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_desc", "current": traitDesc, "_characterid": partyManagerId});
            }
        }

        let allIdsObj = GetCharacterAttribute(partyManagerId, "allTraitIds");
        allIdsObj.set("current", newTraitIds.substr(0, (newTraitIds.length > 0 ? newTraitIds.length - 1 : 0)));
    }
}

function AddPartyManagerCloneAttackOptions(partyManagerId, charId) {

    // declare variables
    var attackIds = "";
    var newAttackIds = "";
    var attackName = "";
    var attackRoll = "";
    var hasAttackFlag = "";
    var attackString = "";
    var hasDamageFlag = "";
    var damageString = "";
    var hasDamage2Flag = "";
    var damage2String = "";
    var descFlag = "";
    var atk_desc = "";
    var newId, newRowRef;

    // iterate through all of the attack ids
    attackIds = getAttrByName(charId, "allAttackIds");
    if (attackIds != "") {
        attackIds = attackIds.split(",");
        for (var j = 0; j < attackIds.length - 1; j++) {

            // get the attack data for the attack id
            attackName = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_atkname");
            attackRoll = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_rollbase");
            hasAttackFlag = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_hasAttackFlag");
            attackString = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_attackString");
            hasDamageFlag = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_hasDamageFlag");
            damageString = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_damageString");
            hasDamage2Flag = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_hasDamage2Flag");
            damage2String = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_damage2String");
            descFlag = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_descFlag");
            atk_desc = getAttrByName(charId, "repeating_attack_" + attackIds[j] + "_atk_desc");

            // add the attack to the send message
            if (attackName != "" && attackRoll != "") {
                // add the new row
                newId = generateRowID();
                newRowRef = "repeating_attack_" + newId;
                newAttackIds += newId + ",";
                createObj("attribute", {"name": newRowRef + "_atkname", "current": attackName, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_rollbase", "current": attackRoll, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_hasAttackFlag", "current": hasAttackFlag, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_attackString", "current": attackString, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_hasDamageFlag", "current": hasDamageFlag, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_damageString", "current": damageString, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_hasDamage2Flag", "current": hasDamage2Flag, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_damage2String", "current": damage2String, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_descFlag", "current": descFlag, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_atk_desc", "current": atk_desc, "_characterid": partyManagerId});
            }
        }

        let allIdsObj = GetCharacterAttribute(partyManagerId, "allAttackIds");
        allIdsObj.set("current", newAttackIds.substr(0, (newAttackIds.length > 0 ? newAttackIds.length - 1 : 0)));
    }
}

function AddPartyManagerCloneSpellOptions(partyManagerId, charId) {

    // declare variables
    var allSpellIds = "";
    var newSpellIds = "";
    var spellName = "";
    var spellMemo = "";
    var spellRoll = "";
    var spellRollDmg = "";
    var spellMana = "";
    var newId, newRowRef;

    // iterate through all of the attack ids
    allSpellIds = getAttrByName(charId, "allSpellIds");
    if (allSpellIds != "") {
        allSpellIds = allSpellIds.split(",");
        for (var j = 0; j < allSpellIds.length - 1; j++) {

            // get the attack data for the attack id
            spellName = getAttrByName(charId, "repeating_spell-9_" + allSpellIds[j] + "_spellname");
            spellMemo = getAttrByName(charId, "repeating_spell-9_" + allSpellIds[j] + "_spellmemo");
            spellRoll = getAttrByName(charId, "repeating_spell-9_" + allSpellIds[j] + "_rollcontent");
            spellRollDmg = getAttrByName(charId, "repeating_spell-9_" + allSpellIds[j] + "_rollcontentdamage");
            spellMana = getAttrByName(charId, "repeating_spell-9_" + allSpellIds[j] + "_spellmana");

            // add the attack to the send message
            if (spellName != "" && spellRoll != "") {
                // add the new row
                newId = generateRowID();
                newRowRef = "repeating_spell-9_" + newId;
                newSpellIds += newId + ",";
                createObj("attribute", {"name": newRowRef + "_spellname", "current": spellName, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_spellmemo", "current": spellMemo, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_rollcontent", "current": spellRoll, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_rollcontentdamage", "current": spellRollDmg, "_characterid": partyManagerId});
                createObj("attribute", {"name": newRowRef + "_spellmana", "current": spellMana, "_characterid": partyManagerId});
            }
        }

        let allIdsObj = GetCharacterAttribute(partyManagerId, "allSpellIds");
        allIdsObj.set("current", newSpellIds.substr(0, (newSpellIds.length > 0 ? newSpellIds.length - 1 : 0)));
    }
}

// ======= Notes
// =================================================

function CommandStartSession(options) {

    // get party manager
    var partyManager = FindCharacter("PartyManager");

    // grab data
    options = options.trim().split("@@");
    var StartSessionTitle = options[0];
    var StartSessionChapter = options[1];
    var StartSessionPart = options[2];
    var StartSessionHistory = options[3];
    var StartSessionNewChapter = options[4];
    let message = `&{template:quest} {{chapter=1}} {{title=${StartSessionTitle}}} {{sub=Chapter ${StartSessionChapter}}} {{footer= Part ${StartSessionPart}}} `;
    SendChatMessageToTargets(message, "");

    if (StartSessionHistory != "") {
        StartSessionHistory = StartSessionHistory.replace(/\//g, "</p><p>");
        SendChatMessageToTargets(`&{template:historyBox} {{message=<p>${StartSessionHistory}</p>}}`, "");
    }

    if (StartSessionNewChapter == "1") {
        
        let sceneMessages = [];
        let targets = GetActorTargetData(getAttrByName(partyManager.id, "current_party_members"));
        let resourceObj;

        _.each(targets, function(target) {
            resourceObj = GetCharacterAttribute(target.charId, "inspiration");
            if (resourceObj != undefined) {
                resourceObj.set("current", "on");
                sceneMessages.push(target.displayName + " has gained inspiration.");
            }
        });
        SendSystemMessage(sceneMessages, "GM");
    }
}

// ======= NPC Generation
// =================================================

function CommandGenerateNPC(msg) {
    
    // get variables
    var options = msg.content.replace("!generateNPC", "").trim().split("@");
    
    // create the character
    var newCharacter = GetBlankCharacter();

    // Class
    if (options[3] != "" && options[3] != "?") {
        newCharacter.classCategory = options[3];
    } else {
        newCharacter.classCategory = "Low";
    }

    // Nationality
    if (options[2] != "" && options[2] != "?") {
        newCharacter.nationality = options[2];
    } else {
        newCharacter.nationality = CharacterNationalityGenerator();
    }

    // Race
    if (options[1] != "" && options[1] != "?") {
        newCharacter.race = options[1];
    } else {
        newCharacter.race = CharacterRaceGenerator(newCharacter.nationality);
    }

    // Gender
    if (options[0] != "" && options[0] != "?") {
        newCharacter.gender = options[0];
    } else {
        newCharacter.gender = CharacterGenderGenerator();
    }

    // The rest of it
    newCharacter.name = CharacterNameGenerator(newCharacter.nationality, newCharacter.race, newCharacter.gender);
    newCharacter.nature = CharacterNatureGenerator();
    newCharacter.sector = CharacterSectorGenerator(newCharacter.classCategory);
    newCharacter.profession = CharacterProfessionGenerator(newCharacter.classCategory, newCharacter.sector);
    
    // get party manager
    var partyManager = FindCharacter("PartyManager");
    
    // assign variables
    var generatorName = GetCharacterAttribute(partyManager.get("_id"), "generatorName");
    if (generatorName != undefined) {
        generatorName.set("current", newCharacter.name);
    }
    var generatorRace = GetCharacterAttribute(partyManager.get("_id"), "generatorRace");
    if (generatorRace != undefined) {
        generatorRace.set("current", newCharacter.race);
    }
    var generatorGender = GetCharacterAttribute(partyManager.get("_id"), "generatorGender");
    if (generatorGender != undefined) {
        generatorGender.set("current", newCharacter.gender);
    }
    var generatorNationality = GetCharacterAttribute(partyManager.get("_id"), "generatorNationality");
    if (generatorNationality != undefined) {
        generatorNationality.set("current", newCharacter.nationality);
    }
    var generatorNatureDisplay = GetCharacterAttribute(partyManager.get("_id"), "generatorNatureDisplay");
    if (generatorNatureDisplay != undefined) {
        generatorNatureDisplay.set("current", newCharacter.nature);
    }
    var generatorClass = GetCharacterAttribute(partyManager.get("_id"), "generatorClass");
    if (generatorClass != undefined) {
        generatorClass.set("current", newCharacter.classCategory);
    }
    var generatorSector = GetCharacterAttribute(partyManager.get("_id"), "generatorSector");
    if (generatorSector != undefined) {
        generatorSector.set("current", newCharacter.sector);
    }
    var generatorProfession = GetCharacterAttribute(partyManager.get("_id"), "generatorProfession");
    if (generatorProfession != undefined) {
        generatorProfession.set("current", newCharacter.profession.title);
    }

    // Outfit
    if (options[4] != "" && options[4] != "?") {
        var generatorOutfit = GetCharacterAttribute(partyManager.get("_id"), "generatorOutfit");
        
        if (generatorOutfit != undefined)
        {
            var output = "";
            
            switch (newCharacter.race) {
                case "Coastborne":
                    output += "Co";
                    break;
                case "Suntouched":
                    output += "Su";
                    break;
                case "Sandfolk":
                    output += "Sa";
                    break;
                case "Plains-kin":
                    output += "Pl";
                    break;
                case "Frostcloaked":
                    output += "Fr";
                    break;
            }
            
            switch (newCharacter.gender) {
                case "Male":
                    output += "M";
                    break;
                case "Female":
                    output += "F";
                    break;
            }
            
            output += options[4];
            
            generatorOutfit.set("current", output);
        }
    }
    
}

// ======= Mission
// =================================================

function CommandCompleteMission(msg, options) {
    
    // split up the options
    let data = options.split(" @@ ");
    let style = data[0];
    let type = data[1];
    let title = data[2];
    let subtitle = data[3];
    let exp = data[4];
    let otherRewards = data[5];
    let targets = GetActorTargetData(data[6]);
    
    // send the mission complete message
    let missionOutput = "&{template:quest} {{" + style + "}} ";
    missionOutput += "{{header=" + type + "}} ";
    missionOutput += "{{title=" + title + "}} ";
    missionOutput += "{{sub=" + subtitle + "}} ";
    missionOutput += "{{footer=" + exp + "XP " + otherRewards + "}} ";
    missionOutput += "{{complete=1}}";
    sendChat('Game Manager', missionOutput);
    
    // calculate and grant the exp
    exp = Math.floor(parseInt(exp, 10) / targets.length);
    TargetAddExp("", targets, exp);
}

function CommandSetMissionXp(msg, options) {
    
    log ("options: " + options);
    // split up the options
    let data = options.split(" @@ ");
    let id = data[0];
    let style = data[1];
    let targets = GetActorTargetData(data[2]);
    let charLevel = 0;
    let xp = 0;

    _.each(targets, function(target) {
        charLevel = getAttrByName(target.charId, "level");

        switch(charLevel) {
            case 1:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 10; break;
                    case "2": xp += 25; break;
                    case "3": xp += 50; break;
                    case "4": xp += 75; break;
                    case "5": xp += 100; break;
                }
                break;
            case 2:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 20; break;
                    case "2": xp += 50; break;
                    case "3": xp += 100; break;
                    case "4": xp += 150; break;
                    case "5": xp += 200; break;
                }
                break;
            case 3:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 30; break;
                    case "2": xp += 75; break;
                    case "3": xp += 150; break;
                    case "4": xp += 225; break;
                    case "5": xp += 400; break;
                }
                break;
            case 4:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 50; break;
                    case "2": xp += 125; break;
                    case "3": xp += 250; break;
                    case "4": xp += 375; break;
                    case "5": xp += 500; break;
                }
                break;
            case 5:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 100; break;
                    case "2": xp += 250; break;
                    case "3": xp += 500; break;
                    case "4": xp += 750; break;
                    case "5": xp += 1100; break;
                }
                break;
            case 6:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 120; break;
                    case "2": xp += 300; break;
                    case "3": xp += 600; break;
                    case "4": xp += 900; break;
                    case "5": xp += 1400; break;
                }
                break;
            case 7:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 150; break;
                    case "2": xp += 350; break;
                    case "3": xp += 750; break;
                    case "4": xp += 1100; break;
                    case "5": xp += 1700; break;
                }
                break;
            case 8:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 200; break;
                    case "2": xp += 450; break;
                    case "3": xp += 900; break;
                    case "4": xp += 1400; break;
                    case "5": xp += 2100; break;
                }
                break;
            case 9:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 250; break;
                    case "2": xp += 550; break;
                    case "3": xp += 1100; break;
                    case "4": xp += 1600; break;
                    case "5": xp += 2400; break;
                }
                break;
            case 10:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 300; break;
                    case "2": xp += 600; break;
                    case "3": xp += 1200; break;
                    case "4": xp += 1900; break;
                    case "5": xp += 2800; break;
                }
                break;
            case 11:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 350; break;
                    case "2": xp += 800; break;
                    case "3": xp += 1600; break;
                    case "4": xp += 2400; break;
                    case "5": xp += 3600; break;
                }
                break;
            case 12:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 400; break;
                    case "2": xp += 1000; break;
                    case "3": xp += 2000; break;
                    case "4": xp += 3000; break;
                    case "5": xp += 4500; break;
                }
                break;
            case 13:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 450; break;
                    case "2": xp += 1100; break;
                    case "3": xp += 2200; break;
                    case "4": xp += 3400; break;
                    case "5": xp += 5100; break;
                }
                break;
            case 14:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 500; break;
                    case "2": xp += 1250; break;
                    case "3": xp += 2500; break;
                    case "4": xp += 3800; break;
                    case "5": xp += 5700; break;
                }
                break;
            case 15:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 600; break;
                    case "2": xp += 1400; break;
                    case "3": xp += 2800; break;
                    case "4": xp += 4300; break;
                    case "5": xp += 6400; break;
                }
                break;
            case 16:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 700; break;
                    case "2": xp += 1600; break;
                    case "3": xp += 3200; break;
                    case "4": xp += 4800; break;
                    case "5": xp += 7200; break;
                }
                break;
            case 17:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 800; break;
                    case "2": xp += 2000; break;
                    case "3": xp += 3900; break;
                    case "4": xp += 5900; break;
                    case "5": xp += 8800; break;
                }
                break;
            case 18:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 900; break;
                    case "2": xp += 2100; break;
                    case "3": xp += 4200; break;
                    case "4": xp += 6300; break;
                    case "5": xp += 9500; break;
                }
                break;
            case 19:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 1000; break;
                    case "2": xp += 2400; break;
                    case "3": xp += 4900; break;
                    case "4": xp += 7300; break;
                    case "5": xp += 10900; break;
                }
                break;
            case 20:
                switch (style) {
                    case "0": xp += 0; break;
                    case "1": xp += 1200; break;
                    case "2": xp += 2800; break;
                    case "3": xp += 5700; break;
                    case "4": xp += 8500; break;
                    case "5": xp += 12700; break;
                }
                break;
        }
    });

    // set the xp
    var partyManager = FindCharacter("PartyManager");
    var missionXpObj = GetCharacterAttribute(partyManager.get("_id"), "repeating_mainchaptermissions_" + id + "_exp");
    if (missionXpObj != undefined) {
        missionXpObj.set("current", xp);
    }
}

// ======= Party
// =================================================

function CommandSetParty(msg) {
    let targetList = "";
    targetList = AddSelectedTokensToPartyList(msg, targetList);
    SetParty(targetList);
}

function CommandAddToParty(msg) {
    var partyManager = FindCharacter("PartyManager");
    let targetList = getAttrByName(partyManager.id, "current_party_members");
    if (targetList == undefined) {
        targetList = "";
    }

    targetList = AddSelectedTokensToPartyList(msg, targetList);
    SetParty(targetList);
}

function AddSelectedTokensToPartyList(msg, targetList) {

    let targets = GetMessageTargetData(msg);
    for (let i = 0; i < targets.length; i++) {
        if (targetList.length > 0) {
            targetList += ",";
        }
        targetList += targets[i].charName;
    }

    return targetList;
}

function SetParty(partyList) {

    if (partyList != "") {
        var partyManager = FindCharacter("PartyManager");
        let currentMembers = GetCharacterAttribute(partyManager.id, "current_party_members");
        if (currentMembers != undefined) {
            currentMembers.set("current", partyList);
        }
        SendChatMessageToTargets("Setting the party to " + partyList, "GM");
    }

}