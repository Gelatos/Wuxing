var upgrade_to_1_0_0 = function (doneupdating) {
	let manager = new WuxWorkerBuildManager("Job");
	let attributeHandler  = new WorkerAttributeHandler();
	attributeHandler.addUpdate("version", "0");

	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
	attributeHandler.get(attributeHandler, function () {
		manager.setAttributeHandlerPoints(attributeHandler);
		attributeHandler.set();
		doneupdating();
	});
};

var versioning = function () {
	getAttrs(["version"], function (v) {
		console.log("Checking version " + v["version"]);

		if (v["version"] === "1.0.0") {
			console.log("Wuxing Sheet modified from 5th Edition OGL by Roll20 v" + v["version"]);
		}
		else {
			upgrade_to_1_0_0(function () {
				// setAttrs({version: "1.0.0"});
				// versioning();
			});
		}
	});
}

var on_sheet_opened = function() {

	versioning();
};

