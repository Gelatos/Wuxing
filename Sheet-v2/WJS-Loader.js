var upgrade_to_1_0_0 = function () {
	let attributeHandler = new WorkerAttributeHandler();
	attributeHandler.addUpdate("version", "0");

	let manager = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Technique", "Attribute"]);
	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Origin");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Builder");
	attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
	attributeHandler.addUpdate(WuxDef.GetVariable("Level"), 1);
	attributeHandler.addUpdate(WuxDef.GetVariable("CR"), 1);

	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
	attributeHandler.addGetAttrCallback(function (attrHandler) {
		manager.setAttributeHandlerPoints(attrHandler);
	});
	
	// attributeHandler.addFinishCallback(versioning);
	attributeHandler.run();
};

var versioning = function () {
	getAttrs(["version"], function (v) {
		console.log("Checking version " + v["version"]);

		if (v["version"] === "1.0.0") {
			console.log("Wuxing Sheet modified from 5th Edition OGL by Roll20 v" + v["version"]);
		}
		else {
			upgrade_to_1_0_0();
		}
	});
}

var on_sheet_opened = function() {

	versioning();
};

