on("change:advancement-button-back", function () {

	update_advancement_back();
});

var update_advancement_back = function() {
	
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

var update_advancement_submit = function() {

	let update = {};

	// update the sheet's statistics here

	update["characterSheetDisplayStyle"] = "Character";

	setAttrs(update, { silent: true });

}

on("change:advancement-button-submit", function () {
	
	var className = inputString.match(/[^-]*$/)[0];
	if (className.indexOf("_max") >= 0) {
		className = className.substring(0, className.indexOf("_max"));
	} 

});

var update_advancement_class_level = function(classFieldName, newValue) {
	let mod_attrs =`advancement-level-${classFieldName}`];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let currentLevel = iaNaN(parseInt(v[`advancement-level-${classFieldName}`])) ? 0 : parseInt(v[`advancement-level-${classFieldName}`]);

		if(currentLevel > newValue) {

			update[`advancement-level-${classFieldName}_max`] = currentLevel;

			setAttrs(update, { silent: true });
		}
	});
} 


