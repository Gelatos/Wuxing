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

		let basePath = AttrParseString(v, "builder-basePath");
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
			let physSkillsArray = GetCombatSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
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

	let defPhysSkillsArray = GetDefensivePhysSkillsList(true);
	let defSensSkillsArray = GetDefensiveSensSkillsList(true);
	let physSkillsArray = GetCombatSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
	let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));
	let choiceSkillsArray = physSkillsArray.concat(mentSkillsArray);

	let abilityScoreFieldArray = GetSectionIdNameFromArray("builder-base-", "", GetAbilityScoreList(true));
	let growthsFieldArray = GetSectionIdNameFromArray("builder-baseGrowth-", "", GetAbilityScoreList(true));
	let defPhysFieldArray = GetSectionIdNameFromArray(`builder-skills-trainingDefensivePhys-`, "", defPhysSkillsArray);
	let defSensFieldArray = GetSectionIdNameFromArray(`builder-skills-trainingDefensiveSens-`, "", defSensSkillsArray);
	let physicalFieldArray = GetSectionIdNameFromArray(`builder-skills-trainingPhysical-`, "", physSkillsArray);
	let mentalFieldArray = GetSectionIdNameFromArray(`builder-skills-trainingMental-`, "", mentSkillsArray);
	let choiceFieldArray = GetSectionIdNameFromArray(`builder-skills-trainingChoice-`, "", choiceSkillsArray);

	let mod_attrs = ["base_level", "builder-path", "builder-ancestry", "advancement-advancementGrowthsTotal"];
	mod_attrs = mod_attrs.concat(abilityScoreFieldArray).concat(growthsFieldArray).concat(defPhysFieldArray).concat(defSensFieldArray).concat(physicalFieldArray);
	mod_attrs = mod_attrs.concat(mentalFieldArray).concat(choiceFieldArray);

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let baseLevel = AttrParseInt(v, "base_level");
		let pathName = AttrParseString(v, "builder-path", "Common");
		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);
		let baseAbilityScores = SetAbilityScoreFieldArray(v, "builder-base-");
		let baseGrowths = SetGrowthFieldArray(v, "builder-baseGrowth-");
		let baseGrowthsTotal = MultiplyGrowths(baseGrowths, baseLevel);
		let baseSkills = [];
		let choiceSkills = [];
		let advancementGrowthsTotal = AttrParseJSON(v, "advancement-advancementGrowthsTotal");
		if (advancementGrowthsTotal == "") {
			advancementGrowthsTotal = CreateGrowthsArrayData();
		}

		// set skill arrays
		for (let i = 0; i < defPhysFieldArray.length; i++) {
			if (v[defPhysFieldArray[i]] == "on") {
				baseSkills.push(defPhysSkillsArray[i]);
			}
		}
		for (let i = 0; i < defSensFieldArray.length; i++) {
			if (v[defSensFieldArray[i]] == "on") {
				baseSkills.push(physSkillsArray[i]);
			}
		}
		for (let i = 0; i < physicalFieldArray.length; i++) {
			if (v[physicalFieldArray[i]] == "on") {
				baseSkills.push(defSensSkillsArray[i]);
			}
		}
		for (let i = 0; i < mentalFieldArray.length; i++) {
			if (v[mentalFieldArray[i]] == "on") {
				baseSkills.push(mentSkillsArray[i]);
			}
		}
		for (let i = 0; i < choiceFieldArray.length; i++) {
			if (v[choiceFieldArray[i]] == "on") {
				choiceSkills.push(choiceSkillsArray[i]);
			}
		}

		// set variables
		update["builder-basePath"] = pathName;
		update["builder-baseAncestry"] = ancestryName;
		update["builder-baseAbilityScores"] = JSON.stringify(baseAbilityScores);
		update["builder-baseGrowths"] = JSON.stringify(baseGrowths);
		update["builder-baseGrowthsTotal"] = JSON.stringify(baseGrowthsTotal);
		update["builder-baseSkills"] = JSON.stringify(baseSkills);
		update["builder-baseChoiceSkills"] = JSON.stringify(choiceSkills);
		let endingStatistics = GetCharacterStatGrowths(ancestryData, baseAbilityScores, baseGrowthsTotal, advancementGrowthsTotal);
		update = SetCharacterStatGrowths(update, endingStatistics);

		// update page position
		update["advancement-previousPage"] = "0";
		update["characterSheetDisplayStyle"] = "Advancement";

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
	update_builder_defensivePhys_skills();
	update_builder_defensiveSens_skills();
	update_builder_physical_skills();
	update_builder_mental_skills();
	update_builder_choice_skills();

	setAttrs(update, { silent: true });
}

var update_builder_ancestrySkills = function (update, ancestryData) {

	// defensive skills
	update = update_builder_skill_fields(update, "Physical Defensive", ancestryData.skillPointsPhysDefense, "DefensivePhys");
	update = update_builder_skill_fields(update, "Sensory Defensive", ancestryData.skillPointsSensDefense, "DefensiveSens");

	if (ancestryData.skillPointsPhysDefense > 0 || ancestryData.skillPointsSensDefense > 0) {
		update["builder-skills-Defensive"] = "1";
	}
	else {
		update["builder-skills-Defensive"] = "0";
		update_builder_defensive_skills_reset();
	}

	// physical skills
	update = update_builder_skill_fields(update, "Combat, Body, and/or Technical", ancestryData.skillPointsCoAcTc, "Physical");

	if (ancestryData.skillPointsCoAcTc > 0) {
		update["builder-skills-Physical"] = "1";
	}
	else {
		update["builder-skills-Physical"] = "0";
		update_builder_physical_skills_reset();
	}

	// mental skills
	update = update_builder_skill_fields(update, "Magic, Knowledge, and/or Social", ancestryData.skillPointsMgKnSo, "Mental");

	if (ancestryData.skillPointsMgKnSo > 0) {
		update["builder-skills-Mental"] = "1";
	}
	else {
		update["builder-skills-Mental"] = "0";
		update_builder_mental_skills_reset();
	}

	// choice skills
	update = update_builder_skill_fields(update, "additional", ancestryData.skillPointsAny, "Choice", " of choice, none can be from the defensive skill group.");

	if (ancestryData.skillPointsAny > 0) {
		update["builder-skills-Choice"] = "1";
	}
	else {
		update["builder-skills-Choice"] = "0";
		update_builder_mental_skills_reset();
	}

	return update;
}

var update_builder_skill_fields = function (update, skillName, count, fieldName, suffix) {

	if (suffix == undefined) {
		suffix = ".";
	}

	if (count > 0) {
		update[`builder-skills-desc${fieldName}`] = `Become trained in ${count} ${skillName} skill${count > 1 ? "s" : ""}${suffix}`;
		update[`builder-skills-points${fieldName}_max`] = count;
	}
	else {
		update[`builder-skills-desc${fieldName}`] = "";
		update[`builder-skills-points${fieldName}_max`] = 0;
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
		let pointCount = isNaN(parseInt(v[`${pointsAttr}`])) ? indivPointMax : parseInt(v[`${pointsAttr}`]);

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




// ======== Builder Skills Listeners
on("change:builder-skills-trainingdefensivePhys-brace change:builder-skills-trainingdefensivePhys-fortitude change:builder-skills-trainingdefensivePhys-presence change:builder-skills-trainingdefensivePhys-reflex", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_defensivePhys_skills();
});

on("change:builder-skills-trainingdefensiveSens-insight change:builder-skills-trainingdefensiveSens-notice change:builder-skills-trainingdefensiveSens-resolve", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_defensiveSens_skills();
});

on("change:builder-skills-defensive-reset", function () {

	update_builder_Defensive_skills_reset();
});

on("change:builder-skills-trainingphysical-archery change:builder-skills-trainingphysical-brawling change:builder-skills-trainingphysical-lightBlade change:builder-skills-trainingphysical-hammer change:builder-skills-trainingphysical-handgun change:builder-skills-trainingphysical-heavyBlade change:builder-skills-trainingphysical-longarm change:builder-skills-trainingphysical-polearm change:builder-skills-trainingphysical-thrown change:builder-skills-trainingphysical-acrobatics change:builder-skills-trainingphysical-athletics change:builder-skills-trainingphysical-physique change:builder-skills-trainingphysical-palming change:builder-skills-trainingphysical-stealth change:builder-skills-trainingphysical-survival change:builder-skills-trainingphysical-artisan change:builder-skills-trainingphysical-cook change:builder-skills-trainingphysical-herbalism change:builder-skills-trainingphysical-mechanical change:builder-skills-trainingphysical-medicine change:builder-skills-trainingphysical-pilot", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_physical_skills();
});

on("change:builder-skills-physical-reset", function () {

	update_builder_physical_skills_reset();
});

on("change:builder-skills-trainingmental-assault change:builder-skills-trainingmental-conjure change:builder-skills-trainingmental-enchant change:builder-skills-trainingmental-ethereal change:builder-skills-trainingmental-field change:builder-skills-trainingmental-structure change:builder-skills-trainingmental-arcana change:builder-skills-trainingmental-culture change:builder-skills-trainingmental-engineering change:builder-skills-trainingmental-history change:builder-skills-trainingmental-investigation change:builder-skills-trainingmental-nature change:builder-skills-trainingmental-deception change:builder-skills-trainingmental-etiquette change:builder-skills-trainingmental-intimidation change:builder-skills-trainingmental-leadership change:builder-skills-trainingmental-negotiation change:builder-skills-trainingmental-performance", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_mental_skills();
});

on("change:builder-skills-mental-reset", function () {

	update_builder_mental_skills_reset();
});

on("change:builder-skills-trainingchoice-archery change:builder-skills-trainingchoice-brawling change:builder-skills-trainingchoice-lightBlade change:builder-skills-trainingchoice-hammer change:builder-skills-trainingchoice-handgun change:builder-skills-trainingchoice-heavyBlade change:builder-skills-trainingchoice-longarm change:builder-skills-trainingchoice-polearm change:builder-skills-trainingchoice-thrown change:builder-skills-trainingchoice-acrobatics change:builder-skills-trainingchoice-athletics change:builder-skills-trainingchoice-physique change:builder-skills-trainingchoice-palming change:builder-skills-trainingchoice-stealth change:builder-skills-trainingchoice-survival change:builder-skills-trainingchoice-artisan change:builder-skills-trainingchoice-cook change:builder-skills-trainingchoice-herbalism change:builder-skills-trainingchoice-mechanical change:builder-skills-trainingchoice-medicine change:builder-skills-trainingchoice-pilot change:builder-skills-trainingchoice-assault change:builder-skills-trainingchoice-conjure change:builder-skills-trainingchoice-enchant change:builder-skills-trainingchoice-ethereal change:builder-skills-trainingchoice-field change:builder-skills-trainingchoice-structure change:builder-skills-trainingchoice-arcana change:builder-skills-trainingchoice-culture change:builder-skills-trainingchoice-engineering change:builder-skills-trainingchoice-history change:builder-skills-trainingchoice-investigation change:builder-skills-trainingchoice-nature change:builder-skills-trainingchoice-deception change:builder-skills-trainingchoice-etiquette change:builder-skills-trainingchoice-intimidation change:builder-skills-trainingchoice-leadership change:builder-skills-trainingchoice-negotiation change:builder-skills-trainingchoice-performance", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_choice_skills();
});

on("change:builder-skills-choice-reset", function () {

	update_builder_choice_skills_reset();
});


var update_builder_defensivePhys_skills = function () {
	update_builder_skills("DefensivePhys", GetDefensivePhysSkillsList(true));
}

var update_builder_defensiveSens_skills = function () {
	update_builder_skills("DefensiveSens", GetDefensiveSensSkillsList(true));
}

var update_builder_physical_skills = function () {
	update_builder_skills("Physical", GetCombatSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true)));
}

var update_builder_mental_skills = function () {
	update_builder_skills("Mental", GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true)));
}

var update_builder_skills = function (fieldName, skillsArray) {

	let mod_attrs = [`builder-skills-points${fieldName}_max`];
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-training${fieldName}-`, "", skillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingChoice-`, "", skillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointMax = isNaN(parseInt(v[`builder-skills-points${fieldName}_max`])) ? 0 : parseInt(v[`builder-skills-points${fieldName}_max`]);
		let pointCount = pointMax;

		for (let i = 0; i < skillsArray.length; i++) {
			if (v[`builder-skills-training${fieldName}-${skillsArray[i]}`] == "on") {
				pointCount--;
			}
			update[`builder-skills-trainingChoice-${skillsArray[i]}`] = v[`builder-skills-training${fieldName}-${skillsArray[i]}`];
		}

		update[`builder-skills-points${fieldName}`] = pointCount;
		update[`builder-skills-points${fieldName}-error`] = pointCount < 0 ? "1" : "0";

		setAttrs(update, { silent: true });
	});
}

var update_builder_choice_skills = function () {

	let mod_attrs = [`builder-skills-pointsChoice_max`];
	let physSkillsArray = GetCombatSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
	let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));

	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingPhysical-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingMental-`, "", mentSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingChoice-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingChoice-`, "", mentSkillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointMax = isNaN(parseInt(v[`builder-skills-pointsChoice_max`])) ? 0 : parseInt(v[`builder-skills-pointsChoice_max`]);
		let pointCount = pointMax;

		for (let i = 0; i < physSkillsArray.length; i++) {

			if (v[`builder-skills-trainingPhysical-${physSkillsArray[i]}`] == "on" && v[`builder-skills-trainingChoice-${physSkillsArray[i]}`] != "on") {
				update[`builder-skills-trainingChoice-${physSkillsArray[i]}`] = "on";
			}
			else if (v[`builder-skills-trainingChoice-${physSkillsArray[i]}`] == "on" && v[`builder-skills-trainingPhysical-${physSkillsArray[i]}`] != "on") {
				pointCount--;
			}
		}
		for (let i = 0; i < mentSkillsArray.length; i++) {
			if (v[`builder-skills-trainingMental-${mentSkillsArray[i]}`] == "on" && v[`builder-skills-trainingChoice-${mentSkillsArray[i]}`] != "on") {
				update[`builder-skills-trainingChoice-${mentSkillsArray[i]}`] = "on";
			}
			else if (v[`builder-skills-trainingChoice-${mentSkillsArray[i]}`] == "on" && v[`builder-skills-trainingMental-${mentSkillsArray[i]}`] != "on") {
				pointCount--;
			}
		}

		update[`builder-skills-pointsChoice`] = pointCount;
		update[`builder-skills-pointsChoice-error`] = pointCount < 0 ? "1" : "0";

		setAttrs(update, { silent: true });
	});
}

var update_builder_defensive_skills_reset = function () {
	update_builder_skills_reset("DefensivePhys", GetDefensivePhysSkillsList(true));
	update_builder_skills_reset("DefensiveSens", GetDefensiveSensSkillsList(true));
}

var update_builder_physical_skills_reset = function () {
	update_builder_skills_reset("Physical", GetCombatSkillsList(true));
	update_builder_skills_reset("Physical", GetBodySkillsList(true));
	update_builder_skills_reset("Physical", GetTechnicalSkillsList(true));
}

var update_builder_mental_skills_reset = function () {
	update_builder_skills_reset("Mental", GetMagicSkillsList(true));
	update_builder_skills_reset("Mental", GetKnowledgeSkillsList(true));
	update_builder_skills_reset("Mental", GetSocialSkillsList(true));
}

var update_builder_skills_reset = function (fieldName, skillsArray) {
	let mod_attrs = [`builder-skills-points${fieldName}_max`];
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-training${fieldName}-`, "", skillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};

		for (let i = 0; i < skillsArray.length; i++) {
			if (v[`builder-skills-training${fieldName}-${skillsArray[i]}`] != 0) {
				update[`builder-skills-training${fieldName}-${skillsArray[i]}`] = 0;
				update[`builder-skills-trainingChoice-${skillsArray[i]}`] = 0;
			}
		}

		let pointMax = parseInt(v[`builder-skills-points${fieldName}_max`]);
		update[`builder-skills-points${fieldName}`] = pointMax;
		update[`builder-skills-points${fieldName}-error`] = "0";

		setAttrs(update, { silent: true });
	});
}

var update_builder_choice_skills_reset = function () {
	let mod_attrs = [`builder-skills-pointsChoice_max`];
	let physSkillsArray = GetCombatSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
	let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));

	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingPhysical-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingMental-`, "", mentSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingChoice-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-trainingChoice-`, "", mentSkillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};

		for (let i = 0; i < physSkillsArray.length; i++) {

			if (v[`builder-skills-trainingChoice-${physSkillsArray[i]}`] == "on" && v[`builder-skills-trainingPhysical-${physSkillsArray[i]}`] != "on") {
				update[`builder-skills-trainingChoice-${physSkillsArray[i]}`] = 0;
			}
		}
		for (let i = 0; i < mentSkillsArray.length; i++) {
			if (v[`builder-skills-trainingChoice-${mentSkillsArray[i]}`] == "on" && v[`builder-skills-trainingMental-${mentSkillsArray[i]}`] != "on") {
				update[`builder-skills-trainingChoice-${mentSkillsArray[i]}`] = 0;
			}
		}

		let pointMax = parseInt(v[`builder-skills-pointsChoice_max`]);
		update[`builder-skills-pointsChoice`] = pointMax;
		update[`builder-skills-pointsChoice-error`] = "0";

		setAttrs(update, { silent: true });
	});
}

