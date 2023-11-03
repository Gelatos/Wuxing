function GetSkillTrainingFieldList() {
	return ["skills-baseSkills", "skills-baseChoiceSkills", "skills-baseExtraSkills"];
}

// ======== Back Button

on("change:skills-button-back", function () {

	update_skills_back();
});

var update_skills_back = function () {

	let mod_attrs = ["skills-baseSkills", "skills-baseChoiceSkills", "skills-previousPage"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let baseSkills = AttrParseJSON(v, "skills-baseSkills");
		let baseChoiceSkills = AttrParseJSON(v, "skills-baseChoiceSkills");

		if (baseSkills != "" || baseChoiceSkills != "") {
			let physSkillsArray = GetMartialSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
			let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));

			if (baseSkills != "") {
				let defPhysSkillsArray = GetDefensivePhysSkillsList(true);
				let defSensSkillsArray = GetDefensiveSensSkillsList(true);
				for (let i = 0; i < defPhysSkillsArray.length; i++) {
					update[`skills-trainingDefensivePhys-${defPhysSkillsArray[i]}`] = (baseSkills.includes(defPhysSkillsArray[i])) ? "on" : "0";
				}
				for (let i = 0; i < defSensSkillsArray.length; i++) {
					update[`skills-trainingDefensiveSens-${defSensSkillsArray[i]}`] = (baseSkills.includes(defSensSkillsArray[i])) ? "on" : "0";
				}
				for (let i = 0; i < physSkillsArray.length; i++) {
					update[`skills-trainingPhysical-${physSkillsArray[i]}`] = (baseSkills.includes(physSkillsArray[i])) ? "on" : "0";
				}
				for (let i = 0; i < mentSkillsArray.length; i++) {
					update[`skills-trainingMental-${mentSkillsArray[i]}`] = (baseSkills.includes(mentSkillsArray[i])) ? "on" : "0";
				}
			}
			if (baseChoiceSkills != "") {
				let choiceSkillsArray = physSkillsArray.concat(mentSkillsArray);

				for (let i = 0; i < choiceSkillsArray.length; i++) {
					update[`skills-trainingChoice-${choiceSkillsArray[i]}`] = (baseChoiceSkills.includes(choiceSkillsArray[i])) ? "on" : "0";
				}
			}
		}

		update["characterSheetDisplayStyle"] = v["skills-previousPage"];

		setAttrs(update, { silent: true });
	});

}




// ======= Submission

on("change:skills-button-submit", function () {

	update_skills_submit();
});


var update_skills_submit = function () {

	let abilityScoreArray = GetAbilityScoreList(true);
	let defPhysSkillsArray = GetDefensivePhysSkillsList(true);
	let defSensSkillsArray = GetDefensiveSensSkillsList(true);
	let physSkillsArray = GetMartialSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
	let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));
	let choiceSkillsArray = physSkillsArray.concat(mentSkillsArray);
	let allSkillsArray = GetAllSkillsList(true)

	let defPhysFieldArray = GetSectionIdNameFromArray(`skills-trainingDefensivePhys-`, "", defPhysSkillsArray);
	let defSensFieldArray = GetSectionIdNameFromArray(`skills-trainingDefensiveSens-`, "", defSensSkillsArray);
	let physicalFieldArray = GetSectionIdNameFromArray(`skills-trainingPhysical-`, "", physSkillsArray);
	let mentalFieldArray = GetSectionIdNameFromArray(`skills-trainingMental-`, "", mentSkillsArray);
	let choiceFieldArray = GetSectionIdNameFromArray(`skills-trainingChoice-`, "", choiceSkillsArray);
	let extraFieldArray = GetSectionIdNameFromArray(`skills-trainingExtra-`, "", allSkillsArray);
	let bonusFieldArray = GetSectionIdNameFromArray(`skillbonus_`, "", allSkillsArray);

	let mod_attrs = ["skills-nextPage", "pb"];
	mod_attrs = mod_attrs.concat(abilityScoreArray).concat(defPhysFieldArray).concat(defSensFieldArray).concat(physicalFieldArray);
	mod_attrs = mod_attrs.concat(mentalFieldArray).concat(choiceFieldArray).concat(extraFieldArray).concat(bonusFieldArray);

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let coreData = SetCoreDataFieldArray(v, "");

		let skillsUpdate = {
			baseSkillsTraining: [],
			choiceSkillsTraining: [],
			extraSkillsTraining: [],
			skillData: []
		}
		skillsUpdate = SetSkillTrainingSkillsUpdate(v, skillsUpdate, defPhysSkillsArray, "trainingDefensivePhys", "");
		skillsUpdate = SetSkillTrainingSkillsUpdate(v, skillsUpdate, defSensSkillsArray, "trainingDefensiveSens", "");
		skillsUpdate = SetSkillTrainingSkillsUpdate(v, skillsUpdate, physSkillsArray, "trainingPhysical", "trainingChoice");
		skillsUpdate = SetSkillTrainingSkillsUpdate(v, skillsUpdate, mentSkillsArray, "trainingMental", "trainingChoice");

		// set variables
		update["skills-baseSkills"] = JSON.stringify(skillsUpdate.baseSkillsTraining);
		update["skills-baseChoiceSkills"] = JSON.stringify(skillsUpdate.choiceSkillsTraining);
		update["skills-baseExtraSkills"] = JSON.stringify(skillsUpdate.extraSkillsTraining);
		update = SetCharacterSkills(update, skillsUpdate.skillData, coreData);

		// update page position
		update = GoToNextPage(update, AttrParseString(v, "skills-nextPage", "Advancement"), "Skills");

		setAttrs(update, { silent: true });
	});

}

function SetSkillTrainingSkillsUpdate(attrArray, skillsUpdate, skillArray, baseField, choiceField) {

	let skillName = "";
	let skill = {};

	// set skill arrays
	for (let i = 0; i < skillArray.length; i++) {
		skillName = skillArray[i];
		skill = GetSkillsInfo(skillName);
		skill.bonus = AttrParseInt(attrArray, `skillbonus_${skillName}`);
		skill.isTrained = false;

		if (baseField != "" && attrArray[`skills-${baseField}-${skillName}`] == "on") {
			skillsUpdate.baseSkillsTraining.push(skillName);
			skill.isTrained = true;
		}
		if (choiceField != "" && attrArray[`skills-${choiceField}-${skillName}`] == "on") {
			skillsUpdate.choiceSkillsTraining.push(skillName);
			skill.isTrained = true;
		}
		if (attrArray[`skills-trainingExtra-${skillName}`] == "on") {
			skillsUpdate.extraSkillsTraining.push(skillName);
			skill.isTrained = true;
		}
		skillsUpdate.skillData.push(skill);
	}

	return skillsUpdate;

}

// ======== Builder Skills Listeners
on("change:skills-trainingdefensivePhys-brace change:skills-trainingdefensivePhys-presence change:skills-trainingdefensivePhys-reflex", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skills_defensivePhys_skills();
});

on("change:skills-trainingdefensiveSens-insight change:skills-trainingdefensiveSens-notice change:skills-trainingdefensiveSens-resolve", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skills_defensiveSens_skills();
});

on("change:skills-defensive-reset", function () {

	update_skills_Defensive_skills_reset();
});

on("change:skills-trainingphysical-brawling change:skills-trainingphysical-finesse change:skills-trainingphysical-marksmanship change:skills-trainingphysical-might change:skills-trainingphysical-polearm change:skills-trainingphysical-throw change:skills-trainingphysical-acrobatics change:skills-trainingphysical-athletics change:skills-trainingphysical-fortitude change:skills-trainingphysical-legerdemain change:skills-trainingphysical-physique change:skills-trainingphysical-stealth change:skills-trainingphysical-artisan change:skills-trainingphysical-cook change:skills-trainingphysical-heal change:skills-trainingphysical-herbalism change:skills-trainingphysical-mechanical change:skills-trainingphysical-pilot", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skills_physical_skills();
});

on("change:skills-physical-reset", function () {

	update_skills_physical_skills_reset();
});

on("change:skills-trainingmental-assault change:skills-trainingmental-conjure change:skills-trainingmental-enchant change:skills-trainingmental-ethereal change:skills-trainingmental-field change:skills-trainingmental-structure change:skills-trainingmental-academics change:skills-trainingmental-culture change:skills-trainingmental-investigation change:skills-trainingmental-nature change:skills-trainingmental-tracking change:skills-trainingmental-vocation change:skills-trainingmental-charm change:skills-trainingmental-deception change:skills-trainingmental-intimidation change:skills-trainingmental-leadership change:skills-trainingmental-negotiation change:skills-trainingmental-performance", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skills_mental_skills();
});

on("change:skills-mental-reset", function () {

	update_skills_mental_skills_reset();
});

on("change:skills-trainingchoice-brawling change:skills-trainingchoice-finesse change:skills-trainingchoice-marksmanship change:skills-trainingchoice-might change:skills-trainingchoice-polearm change:skills-trainingchoice-throw change:skills-trainingchoice-acrobatics change:skills-trainingchoice-athletics change:skills-trainingchoice-fortitude change:skills-trainingchoice-legerdemain change:skills-trainingchoice-physique change:skills-trainingchoice-stealth change:skills-trainingchoice-artisan change:skills-trainingchoice-cook change:skills-trainingchoice-heal change:skills-trainingchoice-herbalism change:skills-trainingchoice-mechanical change:skills-trainingchoice-pilot change:skills-trainingchoice-assault change:skills-trainingchoice-conjure change:skills-trainingchoice-enchant change:skills-trainingchoice-ethereal change:skills-trainingchoice-field change:skills-trainingchoice-structure change:skills-trainingchoice-academics change:skills-trainingchoice-culture change:skills-trainingchoice-investigation change:skills-trainingchoice-nature change:skills-trainingchoice-tracking change:skills-trainingchoice-vocation change:skills-trainingchoice-charm change:skills-trainingchoice-deception change:skills-trainingchoice-intimidation change:skills-trainingchoice-leadership change:skills-trainingchoice-negotiation change:skills-trainingchoice-performance", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skills_choice_skills();
});

on("change:skills-choice-reset", function () {

	update_skills_choice_skills_reset();
});
// -- End

var update_skills_defensivePhys_skills = function () {
	update_skills_training("DefensivePhys", GetDefensivePhysSkillsList(true));
}

var update_skills_defensiveSens_skills = function () {
	update_skills_training("DefensiveSens", GetDefensiveSensSkillsList(true));
}

var update_skills_physical_skills = function () {
	update_skills_training("Physical", GetMartialSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true)));
}

var update_skills_mental_skills = function () {
	update_skills_training("Mental", GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true)));
}

var update_skills_training = function (fieldName, skillsArray) {

	let mod_attrs = [`skills-points${fieldName}_max`];
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-training${fieldName}-`, "", skillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingChoice-`, "", skillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointMax = isNaN(parseInt(v[`skills-points${fieldName}_max`])) ? 0 : parseInt(v[`skills-points${fieldName}_max`]);
		let pointCount = pointMax;

		for (let i = 0; i < skillsArray.length; i++) {
			if (v[`skills-training${fieldName}-${skillsArray[i]}`] == "on") {
				pointCount--;
			}
			update[`skills-trainingChoice-${skillsArray[i]}`] = v[`skills-training${fieldName}-${skillsArray[i]}`];
		}

		update[`skills-points${fieldName}`] = pointCount;
		update[`skills-points${fieldName}-error`] = pointCount < 0 ? "1" : "0";

		setAttrs(update, { silent: true });
	});
}

var update_skills_choice_skills = function () {

	let mod_attrs = [`skills-pointsChoice_max`];
	let physSkillsArray = GetMartialSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
	let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));

	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingPhysical-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingMental-`, "", mentSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingChoice-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingChoice-`, "", mentSkillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let pointMax = isNaN(parseInt(v[`skills-pointsChoice_max`])) ? 0 : parseInt(v[`skills-pointsChoice_max`]);
		let pointCount = pointMax;

		for (let i = 0; i < physSkillsArray.length; i++) {

			if (v[`skills-trainingPhysical-${physSkillsArray[i]}`] == "on" && v[`skills-trainingChoice-${physSkillsArray[i]}`] != "on") {
				update[`skills-trainingChoice-${physSkillsArray[i]}`] = "on";
			}
			else if (v[`skills-trainingChoice-${physSkillsArray[i]}`] == "on" && v[`skills-trainingPhysical-${physSkillsArray[i]}`] != "on") {
				pointCount--;
			}
		}
		for (let i = 0; i < mentSkillsArray.length; i++) {
			if (v[`skills-trainingMental-${mentSkillsArray[i]}`] == "on" && v[`skills-trainingChoice-${mentSkillsArray[i]}`] != "on") {
				update[`skills-trainingChoice-${mentSkillsArray[i]}`] = "on";
			}
			else if (v[`skills-trainingChoice-${mentSkillsArray[i]}`] == "on" && v[`skills-trainingMental-${mentSkillsArray[i]}`] != "on") {
				pointCount--;
			}
		}

		update[`skills-pointsChoice`] = pointCount;
		update[`skills-pointsChoice-error`] = pointCount < 0 ? "1" : "0";

		setAttrs(update, { silent: true });
	});
}

var update_skills_defensive_skills_reset = function () {
	update_skills_reset("DefensivePhys", GetDefensivePhysSkillsList(true));
	update_skills_reset("DefensiveSens", GetDefensiveSensSkillsList(true));
}

var update_skills_physical_skills_reset = function () {
	update_skills_reset("Physical", GetMartialSkillsList(true));
	update_skills_reset("Physical", GetBodySkillsList(true));
	update_skills_reset("Physical", GetTechnicalSkillsList(true));
}

var update_skills_mental_skills_reset = function () {
	update_skills_reset("Mental", GetMagicSkillsList(true));
	update_skills_reset("Mental", GetKnowledgeSkillsList(true));
	update_skills_reset("Mental", GetSocialSkillsList(true));
}

var update_skills_reset = function (fieldName, skillsArray) {
	let mod_attrs = [`skills-points${fieldName}_max`];
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-training${fieldName}-`, "", skillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};

		for (let i = 0; i < skillsArray.length; i++) {
			if (v[`skills-training${fieldName}-${skillsArray[i]}`] != 0) {
				update[`skills-training${fieldName}-${skillsArray[i]}`] = 0;
				update[`skills-trainingChoice-${skillsArray[i]}`] = 0;
			}
		}

		let pointMax = parseInt(v[`skills-points${fieldName}_max`]);
		update[`skills-points${fieldName}`] = pointMax;
		update[`skills-points${fieldName}-error`] = "0";

		setAttrs(update, { silent: true });
	});
}

var update_skills_choice_skills_reset = function () {
	let mod_attrs = [`skills-pointsChoice_max`];
	let physSkillsArray = GetMartialSkillsList(true).concat(GetBodySkillsList(true)).concat(GetTechnicalSkillsList(true));
	let mentSkillsArray = GetMagicSkillsList(true).concat(GetKnowledgeSkillsList(true)).concat(GetSocialSkillsList(true));

	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingPhysical-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingMental-`, "", mentSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingChoice-`, "", physSkillsArray));
	mod_attrs = mod_attrs.concat(GetSectionIdNameFromArray(`skills-trainingChoice-`, "", mentSkillsArray));

	getAttrs(mod_attrs, function (v) {
		let update = {};

		for (let i = 0; i < physSkillsArray.length; i++) {

			if (v[`skills-trainingChoice-${physSkillsArray[i]}`] == "on" && v[`skills-trainingPhysical-${physSkillsArray[i]}`] != "on") {
				update[`skills-trainingChoice-${physSkillsArray[i]}`] = 0;
			}
		}
		for (let i = 0; i < mentSkillsArray.length; i++) {
			if (v[`skills-trainingChoice-${mentSkillsArray[i]}`] == "on" && v[`skills-trainingMental-${mentSkillsArray[i]}`] != "on") {
				update[`skills-trainingChoice-${mentSkillsArray[i]}`] = 0;
			}
		}

		let pointMax = parseInt(v[`skills-pointsChoice_max`]);
		update[`skills-pointsChoice`] = pointMax;
		update[`skills-pointsChoice-error`] = "0";

		setAttrs(update, { silent: true });
	});
}

