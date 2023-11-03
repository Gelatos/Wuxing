// ======= Helper Functions

function SetAdvancementBaseGrowths(update, baseGrowths, ancestryGrowths) {

	let growthArray = AddGrowths(baseGrowths, ancestryGrowths);

	update["advancement-baseGrowths"] = JSON.stringify(growthArray);
	return update;
}



// ======== Leave Button

on("change:builder-button-leave", function () {

	update_builder_leave();
});

var update_builder_leave = function () {

	let mod_attrs = ["builder-basePath", "builder-baseAncestry", "builder-baseGrowths", "builder-baseAbilityScores", "builder-baseSkills", "builder-baseChoiceSkills"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let basePath = AttrParseString(v, "builder-basePath", "Common");
		let baseAncestry = AttrParseString(v, "builder-baseAncestry");
		let baseGrowths = AttrParseJSON(v, "builder-baseGrowths");
		let baseAbilityScores = AttrParseJSON(v, "builder-baseAbilityScores");
		let baseSkills = AttrParseJSON(v, "builder-baseSkills");
		let baseChoiceSkills = AttrParseJSON(v, "builder-baseChoiceSkills");

		if (basePath != "") {
			update["builder-path"] = basePath;
		}
		if (baseAncestry != "") {
			update["builder-ancestry"] = baseAncestry;
		}
		if (baseGrowths != "") {
			update = SetAbilityScoreUpdate(update, "builder-base-", baseGrowths);
		}
		if (baseAbilityScores != "") {
			update = SetAbilityScoreUpdate(update, "builder-baseGrowth-", baseAbilityScores);
		}
		if (baseSkills != "" || baseChoiceSkills != "") {
			let physSkillsArray = GetMartialSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
			let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));

			if (baseSkills != "") {
				let defPhysSkillsArray = GetDefensivePhysSkillsList(true);
				let defSensSkillsArray = GetDefensiveSensSkillsList(true);
				for (let i = 0; i < defPhysSkillsArray.length; i++) {
					update[`builder-skills-trainingDefensivePhys-${defPhysSkillsArray[i]}`] = (baseSkills.includes(defPhysSkillsArray[i])) ? "on" : "0";
				}
				for (let i = 0; i < defSensSkillsArray.length; i++) {
					update[`builder-skills-trainingDefensiveSens-${defSensSkillsArray[i]}`] = (baseSkills.includes(defSensSkillsArray[i])) ? "on" : "0";
				}
				for (let i = 0; i < physSkillsArray.length; i++) {
					update[`builder-skills-trainingPhysical-${physSkillsArray[i]}`] = (baseSkills.includes(physSkillsArray[i])) ? "on" : "0";
				}
				for (let i = 0; i < mentSkillsArray.length; i++) {
					update[`builder-skills-trainingMental-${mentSkillsArray[i]}`] = (baseSkills.includes(mentSkillsArray[i])) ? "on" : "0";
				}
			}
			if (baseChoiceSkills != "") {
				let choiceSkillsArray = physSkillsArray.concat(mentSkillsArray);

				for (let i = 0; i < choiceSkillsArray.length; i++) {
					update[`builder-skills-trainingChoice-${choiceSkillsArray[i]}`] = (baseChoiceSkills.includes(choiceSkillsArray[i])) ? "on" : "0";
				}
			}
		}

		update["characterSheetDisplayStyle"] = "Character";

		setAttrs(update, { silent: true });
	});

}




// ======= Submission

on("change:builder-button-submit", function () {

	update_builder_submit();
});


var update_builder_submit = function () {

	let skillsList = GetAllSkillsList();

	let abilityScoreFieldArray = GetSectionIdNameFromArray("builder-base-", "", GetAbilityScoreList(true));
	let growthsFieldArray = GetSectionIdNameFromArray("builder-baseGrowth-", "", GetAbilityScoreList(true));

	let growthArray = GetGrowthList(true);
	let mod_attrs = ["pb", "builder-nextPage", "base_level", "builder-path", "builder-ancestry", "builder-prime_element", 
		"advancement-advancementGrowthsTotal", "statbonus_speed", "statbonus_chakra"];

	mod_attrs = mod_attrs.concat(abilityScoreFieldArray).concat(growthsFieldArray);
	mod_attrs = mod_attrs.concat(growthArray);
	mod_attrs = mod_attrs.concat(GetBonusSkillsList());
	mod_attrs = mod_attrs.concat(GetStatGrowthBonusList());
	mod_attrs = mod_attrs.concat(GetDerivedBonusStatsList());

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let baseLevel = AttrParseInt(v, "base_level");
		let pathName = AttrParseString(v, "builder-path", "Common");
		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);
		let baseAbilityScores = SetAbilityScoreFieldArray(v, "builder-base-");
		let baseGrowths = SetGrowthFieldArray(v, "builder-baseGrowth-");
		let baseGrowthsTotal = MultiplyGrowths(baseGrowths, baseLevel);
		let advancementGrowthsTotal = AttrParseJSON(v, "advancement-advancementGrowthsTotal");
		if (advancementGrowthsTotal == "") {
			advancementGrowthsTotal = CreateGrowthsArrayData();
		}
		let endingStatistics = GetCharacterStatGrowthTotals(ancestryData, baseAbilityScores, baseGrowthsTotal, advancementGrowthsTotal);
		let bonusGrowths = SetBonusGrowthFieldArray(v);
		let coreData = SetCoreDataFieldArray(v, "");

		// set variables
		update["builder-basePath"] = pathName;
		update["prime_element"] = v["builder-prime_element"];
		update["builder-baseAncestry"] = ancestryName;
		update["builder-baseAbilityScores"] = JSON.stringify(baseAbilityScores);
		update["builder-baseGrowths"] = JSON.stringify(baseGrowths);
		update["builder-baseGrowthsTotal"] = JSON.stringify(baseGrowthsTotal);
		update = SetCharacterStatGrowths(update, endingStatistics, bonusGrowths, ancestryData, growthArray);
		v = SetAbilityScoreUpdate(v, "statscore_", update);
		v = SetAbilityScoreUpdate(v, "", update);
		coreData = SetAbilityScoreUpdate(v, "", update);
		update = SetDerivedStats(update, v, ancestryData, growthArray);
		update = SetCharacterSkillsUpdateData(update, v, skillsList, coreData);
		update = SetCharacterSpeed(update, v, ancestryData);
		update = SetCharacterChakra(update, v);
		update = SetCharacterTraumaLimit(update, v, pathName);

		// update page position
		update = GoToNextPage(update, AttrParseString(v, "builder-nextPage", "Skills"), "0");

		setAttrs(update, { silent: true });
	});

}



// ======= Path Update

on("change:builder-path", function (eventinfo) {

	update_builder_path_info(eventinfo.newValue);
});

var update_builder_path_info = function (newValue) {

	let update = {};
	let pathData = GetPathInfo(newValue);
	update["builder-pathDesc"] = pathData.description;
	update["builder-baseAbilityScorePoints"] = pathData.abilityScorePts;
	update["builder-baseAbilityScorePoints_max"] = pathData.abilityScorePts;
	setAttrs(update, { silent: true });
}



// ======= Ancestry Update

on("change:builder-ancestry", function (eventinfo) {

	update_builder_ancestry_info(eventinfo.newValue);
});

var update_builder_ancestry_info = function (newValue) {

	// get database info
	let ancestryData = GetAncestryInfo(newValue);
	let ancestryTechniques = GetTechniqueDataArray("Ancestry", ancestryData.techniques);

	// create update data
	let update = {};
	update["builder-ancestryDesc"] = ancestryData.description;
	update["builder-starting-HP"] = ancestryData.hp;
	update["builder-starting-Barrier"] = ancestryData.barrier;
	update["builder-starting-Speed"] = ancestryData.speed;
	update = SetAbilityScoreUpdate(update, "builder-starting-", ancestryData.startingScores);
	update = SetAbilityScoreUpdate(update, "builder-growth-", ConvertAbilityScorePointsToGrowths(ancestryData.growths), "%");
	update["builder-growth-HP"] = ancestryData.growths.hp;
	update["builder-growth-Vitality"] = ancestryData.growths.vitality;
	update["builder-growth-KiCharge"] = ancestryData.growths.kiCharge;
	update["builder-growth-Spellforce"] = ancestryData.growths.spellForce;

	// create the techniques and update the skills
	update = SetTechniqueDataList(update, "repeating_ancestrytechniques", ancestryTechniques);
	update = update_builder_ancestrySkills(update, ancestryData);
	update_skills_defensivePhys_skills();
	update_skills_defensiveSens_skills();
	update_skills_physical_skills();
	update_skills_mental_skills();
	update_skills_choice_skills();

	setAttrs(update, { silent: true });
}

var update_builder_ancestrySkills = function (update, ancestryData) {

	// defensive skills
	update = update_skills_fields(update, "Physical Defensive", ancestryData.skillPointsPhysDefense, "DefensivePhys");
	update = update_skills_fields(update, "Sensory Defensive", ancestryData.skillPointsSensDefense, "DefensiveSens");

	if (ancestryData.skillPointsPhysDefense > 0 || ancestryData.skillPointsSensDefense > 0) {
		update["skills-Defensive"] = "1";
	}
	else {
		update["skills-Defensive"] = "0";
		update_skills_defensive_skills_reset();
	}

	// physical skills
	update = update_skills_fields(update, "Combat, Body, and/or Technical", ancestryData.skillPointsCoAcTc, "Physical");

	if (ancestryData.skillPointsCoAcTc > 0) {
		update["skills-Physical"] = "1";
	}
	else {
		update["skills-Physical"] = "0";
		update_skills_physical_skills_reset();
	}

	// mental skills
	update = update_skills_fields(update, "Magic, Knowledge, and/or Social", ancestryData.skillPointsMgKnSo, "Mental");

	if (ancestryData.skillPointsMgKnSo > 0) {
		update["skills-Mental"] = "1";
	}
	else {
		update["skills-Mental"] = "0";
		update_skills_mental_skills_reset();
	}

	// choice skills
	update = update_skills_fields(update, "additional", ancestryData.skillPointsAny, "Choice", " of choice, none can be from the defensive skill group.");

	if (ancestryData.skillPointsAny > 0) {
		update["skills-Choice"] = "1";
	}
	else {
		update["skills-Choice"] = "0";
		update_skills_mental_skills_reset();
	}

	return update;
}

var update_skills_fields = function (update, skillName, count, fieldName, suffix) {

	if (suffix == undefined) {
		suffix = ".";
	}

	if (count > 0) {
		update[`skills-desc${fieldName}`] = `Become trained in ${count} ${skillName} skill${count > 1 ? "s" : ""}${suffix}`;
		update[`skills-points${fieldName}_max`] = count;
	}
	else {
		update[`skills-desc${fieldName}`] = "";
		update[`skills-points${fieldName}_max`] = 0;
	}

	return update;
}



// ======== Update base ability scores

on("change:builder-base-CON change:builder-base-DEX change:builder-base-QCK change:builder-base-STR change:builder-base-CHA change:builder-base-INT change:builder-base-PER change:builder-base-WIL", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_base_ability_scores();
});

var update_builder_base_ability_scores = function () {
	update_builder_ability_scores("builder-baseAbilityScorePoints", "builder-base-", 10, 40);
}



// ======== Update ability score growths

on("change:builder-baseGrowth-CON change:builder-baseGrowth-DEX change:builder-baseGrowth-QCK change:builder-baseGrowth-STR change:builder-baseGrowth-CHA change:builder-baseGrowth-INT change:builder-baseGrowth-PER change:builder-baseGrowth-WIL", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_growth_ability_scores();
});

var update_builder_growth_ability_scores = function () {
	update_builder_ability_scores("builder-growthAbilityScorePoints", "builder-baseGrowth-", 3, 16);
}

var update_builder_ability_scores = function (pointsAttr, absAttr, indivPointMax, pointsMax) {

	let mod_attrs = [`${pointsAttr}_max`];
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(absAttr, "", GetAbilityScoreList(true)));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointCount = 0;
		let pointMax = isNaN(parseInt(v[`${pointsAttr}_max`])) ? pointsMax : parseInt(v[`${pointsAttr}_max`]);

		let abilityScoreNames = GetAbilityScoreList(true);
		let abilityScores = SetAbilityScoreFieldArray(v, absAttr);
		for (let i = 0; i < abilityScoreNames.length; i++) {
			pointCount += abilityScores[abilityScoreNames[i]];
			update[`${pointsAttr}-error-${abilityScoreNames[i]}`] =
				(abilityScores[abilityScoreNames[i]] > indivPointMax || abilityScores[abilityScoreNames[i]] < 0) ? "1" : "0";
		}
		pointCount = pointMax - pointCount;
		update[`${pointsAttr}`] = pointCount;
		update[`${pointsAttr}-error`] = pointCount < 0 ? "1" : "0";

		setAttrs(update, { silent: true });
	});
}



// ======== Ability Score Randomizers

on("change:builder-baseAbilityScore-randomize", function () {

	update_builder_base_ability_scores_randomize();
});

on("change:builder-growthAbilityScore-randomize", function () {

	update_builder_growth_ability_scores_randomize();
});

var update_builder_base_ability_scores_randomize = function () {
	update_builder_ability_scores_randomize("builder-baseAbilityScorePoints", "builder-base-", 10);
}

var update_builder_growth_ability_scores_randomize = function () {
	update_builder_ability_scores_randomize("builder-growthAbilityScorePoints", "builder-baseGrowth-", 3);
}

var update_builder_ability_scores_randomize = function (pointsAttr, absAttr, indivPointMax) {

	let mod_attrs = [pointsAttr];
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(absAttr, "", GetAbilityScoreList(true)));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointCount = AttrParseInt(v, pointsAttr, indivPointMax);

		let abilityScoreNames = GetAbilityScoreList(true);
		let abilityScores = SetAbilityScoreFieldArray(v, absAttr);
		let rng = 0;

		while (pointCount > 0) {
			rng = Math.floor(Math.random() * 8);
			if (abilityScores[abilityScoreNames[rng]] < indivPointMax) {
				abilityScores[abilityScoreNames[rng]]++;
				pointCount--;
			}
		}

		for (let i = 0; i < abilityScoreNames.length; i++) {
			update[`${absAttr}${abilityScoreNames[i]}`] = abilityScores[abilityScoreNames[i]];
		}
		update[`${pointsAttr}`] = pointCount;

		setAttrs(update, { silent: true });
	});
}



// ======== Ability Score Resetters

on("change:builder-baseAbilityScore-reset", function () {

	update_builder_base_ability_scores_reset();
});

on("change:builder-growthAbilityScore-reset", function () {

	update_builder_growth_ability_scores_reset();
});

var update_builder_base_ability_scores_reset = function () {
	update_builder_ability_scores_reset("builder-baseAbilityScorePoints", "builder-base-", 40);
}

var update_builder_growth_ability_scores_reset = function () {
	update_builder_ability_scores_reset("builder-growthAbilityScorePoints", "builder-baseGrowth-", 16);
}

var update_builder_ability_scores_reset = function (pointsAttr, absAttr, pointsMax) {

	let mod_attrs = [`${pointsAttr}_max`];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let abilityScoreNames = GetAbilityScoreList(true);
		for (let i = 0; i < abilityScoreNames.length; i++) {
			update[`${absAttr}${abilityScoreNames[i]}`] = 0;
			update[`${pointsAttr}-error-${abilityScoreNames[i]}`] = 0;
		}

		let pointMax = isNaN(parseInt(v[`${pointsAttr}_max`])) ? pointsMax : parseInt(v[`${pointsAttr}_max`]);
		update[`${pointsAttr}`] = pointMax;
		update[`${pointsAttr}-error`] = "0";

		setAttrs(update, { silent: true });
	});
}

