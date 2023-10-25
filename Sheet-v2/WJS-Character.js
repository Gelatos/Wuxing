on("change:character-button-advancement", function () {

	update_character_toAdvancement();
});

var update_character_toAdvancement = function () {
	let update = {};

	update["advancement-previousPage"] = "Character";
	update["characterSheetDisplayStyle"] = "Advancement";

	setAttrs(update, { silent: true });
}

