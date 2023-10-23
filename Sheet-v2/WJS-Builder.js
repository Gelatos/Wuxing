// Sheet Lisenters
on("change:builder-path", function (eventinfo) {

	update_builder_path_info(eventinfo.newValue);
});

on("change:builder-ancestry", function (eventinfo) {

	update_builder_ancestry_info(eventinfo.newValue);
});

on("change:builder-base-CON change:builder-base-DEX change:builder-base-QCK change:builder-base-STR change:builder-base-CHA change:builder-base-INT change:builder-base-PER change:builder-base-WIL", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_base_ability_scores();
});

on("change:builder-baseGrowth-CON change:builder-baseGrowth-DEX change:builder-baseGrowth-QCK change:builder-baseGrowth-STR change:builder-baseGrowth-CHA change:builder-baseGrowth-INT change:builder-baseGrowth-PER change:builder-baseGrowth-WIL", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_growth_ability_scores();
});

on("change:builder-baseAbilityScore-randomize", function () {

	update_builder_base_ability_scores_randomize();
});

on("change:builder-growthAbilityScore-randomize", function () {

	update_builder_growth_ability_scores_randomize();
});

on("change:builder-baseAbilityScore-reset", function () {

	update_builder_base_ability_scores_reset();
});

on("change:builder-growthAbilityScore-reset", function () {

	update_builder_growth_ability_scores_reset();
});

// Builder Skills Listeners
on("change:builder-skills-trainingDefensivephys-Brace change:builder-skills-trainingDefensivephys-Fortitude change:builder-skills-trainingDefensivephys-Presence change:builder-skills-trainingDefensivephys-Reflex", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_defensivePhys_skills();
});

on("change:builder-skills-trainingDefensivesens-Insight change:builder-skills-trainingDefensivesens-Notice change:builder-skills-trainingDefensivesens-Resolve", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_defensiveSens_skills();
});

on("change:builder-skills-Defensive-reset", function () {

	update_builder_defensive_skills_reset();
});

on("change:builder-skills-trainingPhysical-Archery change:builder-skills-trainingPhysical-Brawling change:builder-skills-trainingPhysical-LightBlade change:builder-skills-trainingPhysical-Hammer change:builder-skills-trainingPhysical-Handgun change:builder-skills-trainingPhysical-HeavyBlade change:builder-skills-trainingPhysical-Longarm change:builder-skills-trainingPhysical-Polearm change:builder-skills-trainingPhysical-Thrown change:builder-skills-trainingPhysical-Acrobatics change:builder-skills-trainingPhysical-Athletics change:builder-skills-trainingPhysical-Physique change:builder-skills-trainingPhysical-Palming change:builder-skills-trainingPhysical-Stealth change:builder-skills-trainingPhysical-Survival change:builder-skills-trainingPhysical-Artisan change:builder-skills-trainingPhysical-Cook change:builder-skills-trainingPhysical-Herbalism change:builder-skills-trainingPhysical-Mechanical change:builder-skills-trainingPhysical-Medicine change:builder-skills-trainingPhysical-Pilot", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_physical_skills();
});

on("change:builder-skills-Physical-reset", function () {

	update_builder_physical_skills_reset();
});

on("change:builder-skills-trainingMental-Assault change:builder-skills-trainingMental-Conjure change:builder-skills-trainingMental-Enchant change:builder-skills-trainingMental-Ethereal change:builder-skills-trainingMental-Field change:builder-skills-trainingMental-Structure change:builder-skills-trainingMental-Arcana change:builder-skills-trainingMental-Culture change:builder-skills-trainingMental-Engineering change:builder-skills-trainingMental-History change:builder-skills-trainingMental-Investigation change:builder-skills-trainingMental-Nature change:builder-skills-trainingMental-Deception change:builder-skills-trainingMental-Etiquette change:builder-skills-trainingMental-Intimidation change:builder-skills-trainingMental-Leadership change:builder-skills-trainingMental-Negotiation change:builder-skills-trainingMental-Performance", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_mental_skills();
});

on("change:builder-skills-Mental-reset", function () {

	update_builder_mental_skills_reset();
});

on("change:builder-skills-trainingChoice-Archery change:builder-skills-trainingChoice-Brawling change:builder-skills-trainingChoice-LightBlade change:builder-skills-trainingChoice-Hammer change:builder-skills-trainingChoice-Handgun change:builder-skills-trainingChoice-HeavyBlade change:builder-skills-trainingChoice-Longarm change:builder-skills-trainingChoice-Polearm change:builder-skills-trainingChoice-Thrown change:builder-skills-trainingChoice-Acrobatics change:builder-skills-trainingChoice-Athletics change:builder-skills-trainingChoice-Physique change:builder-skills-trainingChoice-Palming change:builder-skills-trainingChoice-Stealth change:builder-skills-trainingChoice-Survival change:builder-skills-trainingChoice-Artisan change:builder-skills-trainingChoice-Cook change:builder-skills-trainingChoice-Herbalism change:builder-skills-trainingChoice-Mechanical change:builder-skills-trainingChoice-Medicine change:builder-skills-trainingChoice-Pilot change:builder-skills-trainingChoice-Assault change:builder-skills-trainingChoice-Conjure change:builder-skills-trainingChoice-Enchant change:builder-skills-trainingChoice-Ethereal change:builder-skills-trainingChoice-Field change:builder-skills-trainingChoice-Structure change:builder-skills-trainingChoice-Arcana change:builder-skills-trainingChoice-Culture change:builder-skills-trainingChoice-Engineering change:builder-skills-trainingChoice-History change:builder-skills-trainingChoice-Investigation change:builder-skills-trainingChoice-Nature change:builder-skills-trainingChoice-Deception change:builder-skills-trainingChoice-Etiquette change:builder-skills-trainingChoice-Intimidation change:builder-skills-trainingChoice-Leadership change:builder-skills-trainingChoice-Negotiation change:builder-skills-trainingChoice-Performance", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_builder_choice_skills();
});

on("change:builder-skills-Choice-reset", function () {

	update_builder_choice_skills_reset();
});

on("change:builder-button-submit", function () {

	update_builder_submit();
});



// Sheet Functions
var update_builder_path_info = function (newValue) {

	let update = {};
	let pathData = GetPathInfo(newValue);
	update["builder-pathDesc"] = pathData.description;
	update["builder-baseAbilityScorePoints"] = pathData.abilityScorePts;
	update["builder-baseAbilityScorePoints_max"] = pathData.abilityScorePts;
	setAttrs(update, { silent: true });
}

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
	update = SetAbilityScoreUpdate(update, "builder-growth-", ancestryData.growths);
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

var update_builder_base_ability_scores = function () {
	update_builder_ability_scores("builder-baseAbilityScorePoints", "builder-base-", 10, 40);
}

var update_builder_growth_ability_scores = function () {
	update_builder_ability_scores("builder-growthAbilityScorePoints", "builder-baseGrowth-", 3, 16);
}

var update_builder_ability_scores = function (pointsAttr, absAttr, indivPointMax, pointsMax) {

	let mod_attrs = [`${pointsAttr}_max`];
	mod_attrs = mod_attrs.concat(GetAbilityScoreFieldNames(absAttr));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointCount = 0;
		let pointMax = isNaN(parseInt(v[`${pointsAttr}_max`])) ? pointsMax : parseInt(v[`${pointsAttr}_max`]);

		let abilityScoreNames = GetAbilityScoreFieldNames("");
		let abilityScores = GetAbilityScoreFieldIntegerArray(absAttr, v);
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

var update_builder_base_ability_scores_randomize = function () {
	update_builder_ability_scores_randomize("builder-baseAbilityScorePoints", "builder-base-", 10);
}

var update_builder_growth_ability_scores_randomize = function () {
	update_builder_ability_scores_randomize("builder-growthAbilityScorePoints", "builder-baseGrowth-", 3);
}

var update_builder_ability_scores_randomize = function (pointsAttr, absAttr, indivPointMax) {

	let mod_attrs = [pointsAttr];
	mod_attrs = mod_attrs.concat(GetAbilityScoreFieldNames(absAttr));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointCount = isNaN(parseInt(v[`${pointsAttr}`])) ? pointMax : parseInt(v[`${pointsAttr}`]);

		let abilityScoreNames = GetAbilityScoreFieldNames("");
		let abilityScores = GetAbilityScoreFieldIntegerArray(absAttr, v);
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

		let abilityScoreNames = GetAbilityScoreFieldNames("");
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

var update_builder_submit = function () {
	let update = {};

	// update the sheet's statistics here

	update["advancement-previousPage"] = "0";
	update["characterSheetDisplayStyle"] = "LevelUp";

	setAttrs(update, { silent: true });
}

