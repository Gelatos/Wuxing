on("change:advancement-button-back", function () {

	update_advancement_back();
});

on("change:advancement-button-submit", function () {

	update_advancement_submit();
});

var update_advancement_back = function() {
	console.log ("Going back");
	
	let mod_attrs = [`advancement-previousPage`];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update["characterSheetDisplayStyle"] = v["advancement-previousPage"];
		update["advancement-previousPage"] = "";

		setAttrs(update, { silent: true });
	});

}

var update_advancement_submit = function() {
	console.log ("Submitting");

	let update = {};

	// update the sheet's statistics here

	update["characterSheetDisplayStyle"] = "Character";

	setAttrs(update, { silent: true });

}

