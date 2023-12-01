var upgrade_to_1_0_0 = function (doneupdating) {
	update_builder_path_info("Common");
	update_builder_ancestry_info("Human");
	setAttrs({hp: "0", hp_max: "0", tempHp: "0", tempHp_max: "0", ki: "0", ki_max: "0", vitality: "0", trauma: "0", stress: "0", wounds: "0", chakra: "0"});
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

