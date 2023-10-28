// ======== Submission

on("change:techniques-button-submit", function () {

	update_techniques_submit();
});

var update_techniques_submit = function () {

	let mod_attrs = ["base_level"];
	getAttrs(mod_attrs, function (v) {

		let update = {};

		// set updates
		update["characterSheetDisplayStyle"] = "Character";

		setAttrs(update, { silent: true });

	});

}