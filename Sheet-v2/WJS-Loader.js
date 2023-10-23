var upgrade_to_1_0_0 = function (doneupdating) {
	update_builder_path_info("Common");
	update_builder_ancestry_info("Human");
	doneupdating();
};

var versioning = function () {
	getAttrs(["version"], function (v) {
		console.log("Checking version " + v["version"]);

		if (v["version"] === "1.0.0") {
			console.log("Wuxing Sheet modified from 5th Edition OGL by Roll20 v" + v["version"]);
		}
		else {
			upgrade_to_1_0_0(function () {
				setAttrs({version: "1.0.0"});
				versioning();
			});
		}
	});
}

var on_sheet_opened = function() {

	versioning();
};

