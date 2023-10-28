// ======== Ability Scores

function SetCharacterStatGrowths (update, statistics) {

	let abilityScoresList = GetAbilityScoreList(true);
	let score = "";
	for (let i = 0; i < abilityScoresList.length; i++) {
		score = abilityScoresList[i];
		update[`${score}_score`] = `${statistics.stats[score]}.${(statistics.modulus[score] < 10) ? `0${statistics.modulus[score]}` : statistics.modulus[score]}`;
		update[score] = GetAbilityScoreMod(statistics.stats[score]);
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

