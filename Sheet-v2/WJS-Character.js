// ======== Ability Scores

function SetCharacterStatGrowths (update, statistics) {

	let abilityScoresList = GetAbilityScoreList(true);
	let score = "";
	for (let i = 0; i < abilityScoresList.length; i++) {
		score = abilityScoresList[i];
		update[`${score}_score`] = `${statistics.stats[score]}.${(statistics.modulus[score] < 10) ? `0${statistics.modulus[score]}` : statistics.modulus[score]}`;
		update[score] = statistics.mods[score];
	}

	return update;
}




// ======== Skills

function SetCharacterSkills (update, skillData, abilityScoreData, coreStats, callback) {

	for (let i = 0; i < skillData.length; i++) {
		
	}
}

// var update_skills_training = function (skillArray, callback) {

// 	var skill_attrs = ["pb", "strength_mod", "dexterity_mod", "constitution_mod", "intelligence_mod", "wisdom_mod", "charisma_mod", "ac_totalArmorFlexibility"];

// 	_.each(skillArray, function (skill) {
// 		skill_attrs.push("skillproficiency-" + skill, "skillabilityscore-" + skill, "skillmod-" + skill, "skillspecs-" + skill);
// 	});

// 	getAttrs(skill_attrs, function (v) {
// 		var update = {};
// 		let prof = 0;
// 		let proficiency = 0;
// 		let abilityScore = 0;
// 		let specArray = "";
// 		let armorFlexibility = isNaN(parseInt(v["ac_totalArmorFlexibility"])) ? 0 : parseInt(v["ac_totalArmorFlexibility"]);

// 		_.each(skillArray, function (skill) {

// 			// determine proficiency
// 			console.log("UPDATING SKILL: " + skill);
// 			proficiency = GetProfRankBonus(v["skillproficiency-" + skill], false, v["pb"]);
// 			prof = proficiency;
// 			prof += isNaN(parseInt(v["skillmod-" + skill])) ? 0 : parseInt(v["skillmod-" + skill]);

// 			abilityScore = v["skillabilityscore-" + skill].toLowerCase();
// 			prof += isNaN(parseInt(v[abilityScore + "_mod"])) ? 0 : parseInt(v[abilityScore + "_mod"]);
// 			if (abilityScore == "strength" || abilityScore == "dexterity") {
// 				prof += armorFlexibility;
// 			}

// 			update[skill + "_mod"] = prof;

// 			specArray += v["skillspecs-" + skill];
// 		});

// 		if (callback != undefined) {
// 			setAttrs(update, {
// 				silent: true
// 			}, callback);
// 		} else {
// 			setAttrs(update, {
// 				silent: true
// 			}, function () {
// 				update_specializations(specArray.split(",").filter(n => n));
// 				update_knowledge_skills();
// 				update_all_language_skills();
// 			});
// 		}

// 	});
// }



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

