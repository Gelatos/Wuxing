// ======== Techniques

function GetTechSlotTechniquesFieldList() {
	return ["character-techslots-job", "character-techslots-active", "character-techslots-passive", "character-techslots-support",
		"techslotbonus-job", "techslotbonus-active", "techslotbonus-passive", "techslotbonus-support"];
}

on("change:techslotbonus-job change:techslotbonus-active change:techslotbonus-passive change:techslotbonus-support", function (eventinfo) {

	UpdateCharacterStatGrowths(GetFieldNameAttribute(eventinfo.sourceAttribute));
});

function UpdateCharacterTechSlotCounts(slotType) {

	let mod_attrs = ["base_level", `character-techslots-${slotType}`, `techslotbonus-${slotType}`];

	getAttrs(mod_attrs, function (v) {
		let update = {};
		update = SetCharacterTechSlotCounts(update, v, AttrParseInt(v, "base_level"), [slotType]);
		setAttrs(update, { silent: true });
	});
}

function SetCharacterTechSlotCounts(update, attrArray, totalLevel, slotTypes) {
	
	let defaultStats = GetStatisticsDefaults();
	let countMax = 0;
	let slotType = {};

	for (let i = 0; i < slotTypes.length; i++) {

		// determine the max count
		slotType = slotTypes[i];
		countMax = 0;
		switch(slotType) {
			case "job":
				countMax = defaultStats.techSlotJob;
				if (totalLevel >= 21) {
					countMax += 1;
				}
			break;
			case "active":
				countMax = defaultStats.techSlotActive;
				if (totalLevel >= 31) {
					countMax += 3;
				}
				else  if (totalLevel >= 21) {
					countMax += 2;
				}
				else  if (totalLevel >= 6) {
					countMax += 1;
				}
			break;
			case "passive":
				countMax = defaultStats.techSlotPassive;
				if (totalLevel >= 36) {
					countMax += 3;
				}
				else  if (totalLevel >= 26) {
					countMax += 2;
				}
				else  if (totalLevel >= 11) {
					countMax += 1;
				}
			break;
			case "support":
				countMax = defaultStats.techSlotSupport;
				if (totalLevel >= 36) {
					countMax += 3;
				}
				else  if (totalLevel >= 26) {
					countMax += 2;
				}
				else  if (totalLevel >= 11) {
					countMax += 1;
				}
			break;
		}

		if (countMax != 0) {
			let count = AttrParseString(attrArray, `character-techslots-${slotType}`);
			if (count != "") {
				count = count.split(";").length;
			}
			else {
				count = 0;
			}
			update[`techslot-${slotType}`] = countMax - count;
			update[`techslot-${slotType}_max`] = countMax;
		}
	}
	return update;
}

function AddCharacterClassTechniques(update, attrArray, techniqueNames) {

	let technique = {};

	// iterate through the names and add the techniques to the appropriate arrays
	for (let i = 0; i < techniqueNames.length; i++) {
		technique = GetClassTechniquesInfo(techniqueNames[i]);
	}

	return update;
}



// ======== Growths

function GetStatGrowthBonusList() {
	let growthArray = GetGrowthList(true);
	let output = ["statbonus_branchpoints", "statbonus_ki"];
	return output.concat(GetSectionIdNameFromArray(`statbonus_`, "", growthArray));
}

on("change:statbonus_CON change:statbonus_DEX change:statbonus_QCK change:statbonus_STR change:statbonus_CHA change:statbonus_INT change:statbonus_PER change:statbonus_WIL change:statbonus_hp change:statbonus_vitality change:statbonus_kiCharge change:statbonus_spellForce change:statbonus_branchpoints change:statbonus_ki", function () {

	UpdateCharacterStatGrowths();
});

function UpdateCharacterStatGrowths() {

	let mod_attrs = ["pb", "builder-ancestry", "base_level", "character-baseGrowthStats"];
	mod_attrs = mod_attrs.concat(GetGrowthList(true));
	mod_attrs = mod_attrs.concat(GetDerivedBonusStatsList());
	mod_attrs = mod_attrs.concat(GetSkillTrainingFieldList());
	mod_attrs = mod_attrs.concat(GetBonusSkillsList());
	mod_attrs = mod_attrs.concat(GetStatGrowthBonusList());
	mod_attrs = mod_attrs.concat(GetBranchesTrainingList());

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		let startingStatistics = AttrParseJSON(v, "character-baseGrowthStats");
		let bonusGrowths = SetBonusGrowthFieldArray(v);

		update = SetCharacterStatGrowths(update, startingStatistics, bonusGrowths, ancestryData, GetGrowthList(true), v);
		v = SetAbilityScoreUpdate(v, "statscore_", update);
		v = SetAbilityScoreUpdate(v, "", update);
		coreData = SetAbilityScoreUpdate(v, "", update);
		update = SetDerivedStats(update, v, ancestryData, GetGrowthList(true));
		update = SetCharacterSkillsUpdateData(update, v, GetAllSkillsList(true), coreData);

		setAttrs(update, { silent: true });
	});

}

function SetCharacterStatGrowths(update, currentGrowths, bonusGrowths, ancestryData, growthList, attrArray) {

	update["character-baseGrowthStats"] = JSON.stringify(currentGrowths);

	let growths = GetCharacterStatGrowths(currentGrowths, bonusGrowths, ancestryData);
	update["ki_max"] = growths.scores["ki_max"];
	update["branchpoints_max"] = growths.scores["branchpoints"];
	update["branchpoints"] = growths.scores["branchpoints"] - GetBranchPointsTotal(attrArray);

	// iterate over the scores and update them
	let abilityScoresList = GetAbilityScoreList(true);
	let name = "";
	for (let i = 0; i < growthList.length; i++) {
		name = growthList[i];

		update[`statscore_${name}`] = `${growths.scores[name]}.${(growths.modulus[name] < 10) ? `0${growths.modulus[name]}` : growths.modulus[name]}`;
		if (abilityScoresList.includes(name)) {
			update[name] = GetAbilityScoreMod(growths.scores[name]);
		}
		else {
			update[`${name}_max`] = growths.scores[name];
		}
	}
	return update;
}

function GetCharacterStatGrowths(currentGrowths, bonusGrowths, ancestryData) {

	let defaultStats = GetStatisticsDefaults();
	let finalGrowths = AddGrowths(currentGrowths, MultiplyGrowths(bonusGrowths, 100));
	finalGrowths["vitality"] += (defaultStats["vitality"] * 100);
	finalGrowths["kiCharge"] += defaultStats["kiCharge"] * 100;
	finalGrowths["hp"] += (ancestryData["hp"] * 100) + finalGrowths["CON"];
	finalGrowths["spellForce"] += ancestryData["spellForce"] * 100;

	let output = {
		scores: MultiplyGrowths(finalGrowths, 0.01),
		modulus: ModulusGrowths(finalGrowths, 100)
	};

	// set caps
	if (output.scores["spellForce"] > defaultStats.spellForceLimit) {
		output.scores["spellForce"] = defaultStats.spellForceLimit;
		output.modulus["spellForce"] = 0;
	}
	if (output.scores["kiCharge"] > defaultStats.kiChargeLimit) {
		output.scores["kiCharge"] = defaultStats.kiChargeLimit;
		output.modulus["kiCharge"] = 0;
	}

	// update more scores
	output.scores["vitality"] += GetAbilityScoreMod(output.scores["CON"]);
	output.scores["ki_max"] = defaultStats.kiLimit + (5 * output.scores["spellForce"]) + bonusGrowths["kiLimit"];
	output.scores["branchpoints"] = Math.floor(output.scores["spellForce"] * 0.5) + bonusGrowths["branchpoints"];
	return output;
}




// ======== Derived Stat Setters

function GetDerivedBonusStatsList() {
	return ["statbonus_initiative", "statbonus_power", "statbonus_stress", "statbonus_barrier"];
}

on("change:statbonus_pb", function () {

	UpdateCharacterProficiencyBonus();
});

function UpdateCharacterProficiencyBonus() {

	let mod_attrs = ["pb", "statbonus_pb", "builder-ancestry", "base_level"];
	mod_attrs = mod_attrs.concat(GetGrowthList(true));
	mod_attrs = mod_attrs.concat(GetDerivedBonusStatsList());
	mod_attrs = mod_attrs.concat(GetSkillTrainingFieldList());
	mod_attrs = mod_attrs.concat(GetBonusSkillsList());

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let coreData = SetCoreDataFieldArray(v, "");
		coreData["pb"] = AttrParseInt(v, "statbonus_pb") + GetProfBonusMod(AttrParseInt(v, "base_level"));
		update["pb"] = coreData["pb"];

		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		update = SetDerivedStats(update, v, ancestryData, GetGrowthList(true));
		update = SetCharacterSkillsUpdateData(update, v, GetAllSkillsList(true), coreData);

		setAttrs(update, { silent: true });
	});
}

on("change:statbonus_initiative change:statbonus_power change:statbonus_stress change:statbonus_barrier", function (eventinfo) {

	console.log(`updating: ${GetFieldNameAttribute(eventinfo.sourceAttribute)}`);
	UpdateCharacterDerivedStat(GetFieldNameAttribute(eventinfo.sourceAttribute));

});

function UpdateCharacterDerivedStat(fieldName) {

	let mod_attrs = ["pb", "builder-ancestry"];
	mod_attrs = mod_attrs.concat(GetAbilityScoreList(true));
	let growthList = [];

	switch (fieldName) {
		case "initiative": mod_attrs = mod_attrs.concat(["statbonus_initiative", "QCK"]); growthList.push("QCK"); break;
		case "power": mod_attrs = mod_attrs.concat(["statbonus_power", "STR"]); growthList.push("STR"); console.log("POWER"); break;
		case "barrier": mod_attrs = mod_attrs.concat(["statbonus_barrier", "WIL"]); growthList.push("WIL"); break;
		case "stress": mod_attrs = mod_attrs.concat(["statbonus_stress", "WIL"]); growthList.push("WIL"); break;
	}

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		update = SetDerivedStats(update, v, ancestryData, growthList);

		setAttrs(update, { silent: true });
	});
}

function SetDerivedStats(update, attrArray, ancestryData, growthList) {

	let name = "";

	for (let i = 0; i < growthList.length; i++) {
		name = growthList[i];
		switch (name) {
			case "QCK":
				update["initiative"] = AttrParseInt(attrArray, "pb") + AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_initiative");
				break;
			case "STR":
				update["power"] = AttrParseInt(attrArray, "pb") + AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_power");
				// let defaultStats = GetStatisticsDefaults();
				// update["carryCapacity"] = defaultStats["carryCapacity"] + AttrParseInt(attrArray, `statscore_${name}`) + AttrParseInt(attrArray, "statbonus_carryCapacity");
				break;
			case "WIL":
				update["barrier"] = parseInt(ancestryData.barrier) + AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_barrier");
				update["stress_max"] = AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_stress");
				break;
		}
	}

	return update;
}




// ======== Branches 
function GetBranchesTrainingList() {
	return GetSectionIdNameFromArray(`branch-`, "", GetBranchesList(true));
}



// ======== Branch Listeners
on("change:branch-health change:branch-wind change:branch-poison change:branch-light change:branch-smoke change:branch-soul change:branch-power change:branch-shadow change:branch-gravity change:branch-lightning change:branch-force change:branch-blood change:branch-restoration change:branch-storm change:branch-time ", function (eventinfo) {

	UpdateCharacterBranch(eventinfo.newValue);
});
//-- end

function UpdateCharacterBranch(branchValue) {

	let mod_attrs = ["branchpoints"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let branchpoints = AttrParseInt(v, "branchpoints");
		branchpoints += (branchValue == "0" || branchValue == "") ? 1 : -1;

		update["branchpoints"] = branchpoints;
		update[`branchpoints-error`] = branchpoints < 0 ? "1" : "0";

		setAttrs(update, { silent: true });
	});

}

function GetBranchPointsTotal(attrArray) {

	let branches = GetBranchesList(true);
	let total = 0;
	for (let i = 0; i < branches.length; i++) {
		total += attrArray[`branch-${branches[i]}`] == "on" ? 1 : 0;
	}
	return total;
}




// ======== Other Stat Setters

on("change:statbonus_speed", function () {

	UpdateCharacterSpeed();
});

function UpdateCharacterSpeed() {

	let mod_attrs = ["statbonus_speed", "builder-ancestry"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let ancestryData = GetAncestryInfo(AttrParseString(v, "builder-ancestry", "Human"));
		update = SetCharacterSpeed(update, v, ancestryData);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterSpeed(update, attrArray, ancestryData) {

	update["speed"] = parseInt(ancestryData.speed) + AttrParseInt(attrArray, "statbonus_speed");
	return update;
}

on("change:statbonus_chakra", function () {

	UpdateCharacterChakra();
});

function UpdateCharacterChakra() {

	let mod_attrs = ["statbonus_chakra"];

	getAttrs(mod_attrs, function (v) {
		let update = {};
		update = SetCharacterChakra(update, v);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterChakra(update, attrArray) {

	let defaultStats = GetStatisticsDefaults();
	update["chakra_max"] = defaultStats.chakra + AttrParseInt(attrArray, "statbonus_chakra");
	return update;
}

on("change:statbonus_armor", function () {

	UpdateCharacterArmor();
});

function UpdateCharacterArmor() {

	let mod_attrs = ["statbonus_armor"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update = SetCharacterArmor(update, v);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterArmor(update, attrArray) {

	update["armor"] = AttrParseInt(attrArray, "statbonus_armor");
	return update;
}

on("change:statbonus_block", function () {

	UpdateCharacterBlock();
});

function UpdateCharacterBlock() {

	let mod_attrs = ["statbonus_block"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update = SetCharacterBlock(update, v);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterBlock(update, attrArray) {

	update["block"] = AttrParseInt(attrArray, "statbonus_block");
	return update;
}

on("change:statbonus_trauma", function () {

	UpdateCharacterTraumaLimit();
});

function UpdateCharacterTraumaLimit() {

	let mod_attrs = ["statbonus_trauma", "builder-basePath"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let basePath = AttrParseString(v, "builder-basePath", "Common");
		update = SetCharacterTraumaLimit(update, v, basePath);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterTraumaLimit(update, attrArray, path) {

	let defaultStats = GetStatisticsDefaults(path);
	update["trauma_max"] = defaultStats.traumaLimit + AttrParseInt(attrArray, "statbonus_trauma");
	return update;
}




// ======== Character Skills Update
on("change:skillbonus_brace change:skillbonus_insight change:skillbonus_notice change:skillbonus_presence change:skillbonus_reflex change:skillbonus_resolve change:skillbonus_brawling change:skillbonus_finesse change:skillbonus_marksmanship change:skillbonus_might change:skillbonus_polearm change:skillbonus_throw change:skillbonus_assault change:skillbonus_conjure change:skillbonus_enchant change:skillbonus_ethereal change:skillbonus_field change:skillbonus_structure change:skillbonus_acrobatics change:skillbonus_athletics change:skillbonus_fortitude change:skillbonus_legerdemain change:skillbonus_physique change:skillbonus_stealth change:skillbonus_academics change:skillbonus_culture change:skillbonus_investigation change:skillbonus_nature change:skillbonus_tracking change:skillbonus_vocation change:skillbonus_charm change:skillbonus_deception change:skillbonus_intimidation change:skillbonus_leadership change:skillbonus_negotiation change:skillbonus_performance change:skillbonus_artisan change:skillbonus_cook change:skillbonus_heal change:skillbonus_herbalism change:skillbonus_mechanical change:skillbonus_pilot", function (eventinfo) {

	UpdateCharacterSingleSkill(eventinfo.sourceAttribute);
});

function GetBonusSkillsList() {
	return ["skillbonus_brace", "skillbonus_insight", "skillbonus_notice", "skillbonus_presence", "skillbonus_reflex", "skillbonus_resolve", "skillbonus_brawling", "skillbonus_finesse", "skillbonus_marksmanship", "skillbonus_might", "skillbonus_polearm", "skillbonus_throw", "skillbonus_assault", "skillbonus_conjure", "skillbonus_enchant", "skillbonus_ethereal", "skillbonus_field", "skillbonus_structure", "skillbonus_acrobatics", "skillbonus_athletics", "skillbonus_fortitude", "skillbonus_legerdemain", "skillbonus_physique", "skillbonus_stealth", "skillbonus_academics", "skillbonus_culture", "skillbonus_investigation", "skillbonus_nature", "skillbonus_tracking", "skillbonus_vocation", "skillbonus_charm", "skillbonus_deception", "skillbonus_intimidation", "skillbonus_leadership", "skillbonus_negotiation", "skillbonus_performance", "skillbonus_artisan", "skillbonus_cook", "skillbonus_heal", "skillbonus_herbalism", "skillbonus_mechanical", "skillbonus_pilot"];
}
// -- end


function UpdateCharacterSingleSkill(fieldName) {

	UpdateCharacterSkills([GetFieldNameAttribute(fieldName)]);
}

function UpdateCharacterSkills(skillsList) {
	let abilityScoreArray = GetAbilityScoreList(true);
	let bonusFieldArray = GetSectionIdNameFromArray(`skillbonus_`, "", skillsList);
	let mod_attrs = ["pb", "skills-baseSkills", "skills-baseChoiceSkills", "skills-baseExtraSkills"];
	mod_attrs = mod_attrs.concat(abilityScoreArray).concat(bonusFieldArray);

	getAttrs(mod_attrs, function (v) {
		let update = {};

		// set variables
		let coreData = SetCoreDataFieldArray(v, "");
		update = SetCharacterSkillsUpdateData(update, v, skillsList, coreData);

		setAttrs(update, { silent: true });
	});
}


// ======== Skills Setters

function SetCharacterSkillsUpdateData(update, attrArray, skillsList, coreData) {
	let skillTrainingList = AttrParseJSON(attrArray, "skills-baseSkills", []).concat(AttrParseJSON(attrArray, "skills-baseChoiceSkills", [])).concat(AttrParseJSON(attrArray, "skills-baseExtraSkills", []));
	let skillData = CreateCharacterSkillsUpdateData(attrArray, skillsList, skillTrainingList);

	// set variables
	return SetCharacterSkills(update, skillData, coreData);
}

function CreateCharacterSkillsUpdateData(attrArray, skillArray, trainingList) {

	let skillData = [];
	let skillName = "";
	let skill = {};

	// set skill arrays
	for (let i = 0; i < skillArray.length; i++) {
		skillName = skillArray[i];
		skill = GetSkillsInfo(skillName);
		skill.bonus = AttrParseInt(attrArray, `skillbonus_${skillName}`);
		skill.isTrained = trainingList.includes(skillName);
		skillData.push(skill);
	}

	return skillData;

}

function SetCharacterSkills(update, skillData, coreData) {

	let skill = {};
	let total = 0;
	for (let i = 0; i < skillData.length; i++) {
		skill = skillData[i];
		total = parseInt(coreData[skill.abilityScore]) + skill.bonus + (skill.isTrained ? coreData["pb"] : 0);
		update[`skill_${ToCamelCase(skill.name)}`] = total;
	}

	return update;
}



// ======== Advancement Button

on("change:character-button-advancement", function () {

	update_character_toAdvancement();
});

var update_character_toAdvancement = function () {
	let update = {};

	update["advancement-previousPage"] = "Character";
	update["characterSheetDisplayStyle"] = "Advancement";

	setAttrs(update, { silent: true });
}

on("change:character-button-builder", function () {

	update_character_toBuilder();
});

var update_character_toBuilder = function () {
	let update = {};

	update["builder-previousPage"] = "Character";
	update["builder-nextPage"] = "Character";
	update["characterSheetDisplayStyle"] = "0";

	setAttrs(update, { silent: true });
}

on("change:character-button-skills", function () {

	update_character_toSkills();
});

var update_character_toSkills = function () {
	let update = {};

	update["skills-previousPage"] = "Character";
	update["skills-nextPage"] = "Character";
	update["characterSheetDisplayStyle"] = "Skills";

	setAttrs(update, { silent: true });
}

on("change:character-button-techniques", function () {

	update_character_toTechniques();
});

var update_character_toTechniques = function () {
	let update = {};

	update["techniques-previousPage"] = "Character";
	update["techniques-nextPage"] = "Character";
	update["characterSheetDisplayStyle"] = "Techniques";

	setAttrs(update, { silent: true });
}

