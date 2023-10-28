// ======== Ability Scores

function SetCharacterStatGrowths (update, ancestryData, baseAbilityScores, baseGrowths, advancementGrowths) {

	// convert growths to ability scores
	let currentGrowths = ConvertAbilityScorePointsToGrowths(AddGrowths(baseGrowths, AddGrowths(ancestryData.growths, advancementGrowths)));
	let abilityScores = AddAbilityScores(baseAbilityScores, AddAbilityScores(ancestryData.startingScores, MultiplyAbilityScores(currentGrowths, 0.01)));
	let abilityScoreModulus = ModulusAbilityScores(currentGrowths, 100);

	let abilityScoresList = GetAbilityScoreList(true);
	let score = "";
	for (let i = 0; i < abilityScoresList.length; i++) {
		score = abilityScoresList[i];
		update[`${score}_score`] = `${abilityScores[score]}.${(abilityScoreModulus[score] < 10) ? `0${abilityScoreModulus[score]}` : abilityScoreModulus[score]}`;
		update[score] = GetAbilityScoreMod(abilityScores[score]);
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

