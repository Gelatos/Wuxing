on("change:advancement-button-back", function () {

	update_advancement_back();
});

var update_advancement_back = function () {

	let mod_attrs = [`advancement-previousPage`];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update["characterSheetDisplayStyle"] = v["advancement-previousPage"];
		update["advancement-previousPage"] = "";

		setAttrs(update, { silent: true });
	});

}

on("change:advancement-button-submit", function () {

	update_advancement_submit();
});

var update_advancement_submit = function () {

	let update = {};

	// update the sheet's statistics here

	update["characterSheetDisplayStyle"] = "Character";

	setAttrs(update, { silent: true });

}

// Advancement Listeners
on("change:advancement-level-Fighter_max change:advancement-level-Interceptor_max change:advancement-level-Marksman_max change:advancement-level-Rogue_max change:advancement-level-Physician_max change:advancement-level-Pugilist_max change:advancement-level-Scholar_max ", function (eventinfo) {

	var className = eventinfo.sourceAttribute.match(/[^-]*$/)[0];
	if (className.indexOf("_max") >= 0) {
		className = className.substring(0, className.indexOf("_max"));
	}
	update_advancement_class_level(className);
});



var update_advancement_class_level = function (classFieldName) {
	let mod_attrs = [`advancement-level-${classFieldName}`, `advancement-level-${classFieldName}_max`, `advancement-name-${classFieldName}`];

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let currentLevel = isNaN(parseInt(v[`advancement-level-${classFieldName}`])) ? 0 : parseInt(v[`advancement-level-${classFieldName}`]);
		let newLevel = isNaN(parseInt(v[`advancement-level-${classFieldName}_max`])) ? currentLevel : parseInt(v[`advancement-level-${classFieldName}_max`]);

		if (currentLevel > newLevel) {
			update[`advancement-level-${classFieldName}_max`] = currentLevel;
		}
		console.log (`currentLevel: ${currentLevel} newLevel: ${newLevel}`);
		let levelDifference = newLevel - currentLevel;
		update[`advancement-name-${classFieldName}_max`] = `${v[`advancement-name-${classFieldName}`]}${levelDifference > 0 ? `+${levelDifference}` : ""}`;
		setAttrs(update, { silent: true });
	});
}


