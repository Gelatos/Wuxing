// Sheet Lisenters
on("change:builder-path", function (eventinfo) {

	update_builder_path_info(eventinfo.newValue);
});

on("change:builder-ancestry", function (eventinfo) {

	update_builder_ancestry_info(eventinfo.newValue);
});

on("change:builder-base-CON change:builder-base-DEX change:builder-base-QCK change:builder-base-STR change:builder-base-CHA change:builder-base-INT change:builder-base-PER change:builder-base-WIL", function () {

	update_builder_base_ability_scores();
});

on("change:builder-baseGrowth-CON change:builder-baseGrowth-DEX change:builder-baseGrowth-QCK change:builder-baseGrowth-STR change:builder-baseGrowth-CHA change:builder-baseGrowth-INT change:builder-baseGrowth-PER change:builder-baseGrowth-WIL", function () {

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

// Sheet Functions
var update_builder_path_info = function(newValue) {

	let update = {};
	let pathData = GetPathInfo(newValue);
	update["builder-pathDesc"] = pathData.description;
	update["builder-baseAbilityScorePoints"] = pathData.abilityScorePts;
	update["builder-baseAbilityScorePoints_max"] = pathData.abilityScorePts;
	setAttrs(update, {silent: true});
}

var update_builder_ancestry_info = function(newValue) {

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

	setAttrs(update, {silent: true});
}

var update_builder_ancestrySkills = function(update, ancestryData) {

	// defensive skills
	update = update_builder_skill_fields(update, "Physical Defensive", ancestryData.skillPointsPhysDefense, "DefensivePhys");
	console.log("ancestryData.skillPointsPhysDefense: " + ancestryData.skillPointsPhysDefense);
	if (ancestryData.skillPointsPhysDefense > 0) {
		update["builder-skills-defensive"] = "1";
	}
	else {
		update["builder-skills-defensive"] = "0";
		update_builder_skills_defensive_reset();
	}

	return update;
}

var update_builder_skill_fields = function(update, skillName, count, fieldName) {

	if (count > 0) {
		update[`builder-skills-desc${fieldName}`] = `Become trained in ${count} ${skillName} skill${count > 1 ? "s" : ""}.`;
		update[`builder-skills-points${fieldName}_max`] = count;
	}
	else {
		update[`builder-skills-desc${fieldName}`] = "";
		update[`builder-skills-points${fieldName}_max`] = 0;
	}

	return update;
}

var update_builder_base_ability_scores = function() {
	update_builder_ability_scores ("builder-baseAbilityScorePoints", "builder-base-", 10, 40);
}

var update_builder_growth_ability_scores = function() {
	update_builder_ability_scores ("builder-growthAbilityScorePoints", "builder-baseGrowth-", 3, 16);
}

var update_builder_ability_scores = function(pointsAttr, absAttr, indivPointMax, pointsMax) {

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

		setAttrs(update, {silent: true});
	});
}

var update_builder_base_ability_scores_randomize = function() {
	update_builder_ability_scores_randomize ("builder-baseAbilityScorePoints", "builder-base-", 10);
}

var update_builder_growth_ability_scores_randomize = function() {
	update_builder_ability_scores_randomize ("builder-growthAbilityScorePoints", "builder-baseGrowth-", 3);
}

var update_builder_ability_scores_randomize = function(pointsAttr, absAttr, indivPointMax) {

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

		setAttrs(update, {silent: true});
	});
}

var update_builder_base_ability_scores_reset = function() {
	update_builder_ability_scores_reset ("builder-baseAbilityScorePoints", "builder-base-", 40);
}

var update_builder_growth_ability_scores_reset = function() {
	update_builder_ability_scores_reset ("builder-growthAbilityScorePoints", "builder-baseGrowth-", 16);
}

var update_builder_ability_scores_reset = function(pointsAttr, absAttr, pointsMax) {

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

		setAttrs(update, {silent: true});
	});
}

var update_builder_skills_defensivePhys = function() {
	update_builder_skills("DefensivePhys", GetDefensivePhysSkillsList(true));
}

var update_builder_skills_defensiveSens = function() {
	update_builder_skills("DefensiveSens", GetDefensiveSensSkillsList(true));
}

var update_builder_skills = function(fieldName, skillsArray) {

	let mod_attrs = [`builder-skills-points${fieldName}_max`];
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`builder-skills-training${fieldName}-`, "", skillsArray));
	
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

		setAttrs(update, {silent: true});
	});
}

var update_builder_skills_defensive_reset = function() {
	update_builder_skills_reset("DefensivePhys", GetDefensivePhysSkillsList(true));
	update_builder_skills_reset("DefensiveSens", GetDefensiveSensSkillsList(true));
}

var update_builder_skills_reset = function(fieldName, skillsArray) {
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

		setAttrs(update, {silent: true});
	});
}

