var upgrade_to_1_0_0 = function () {
	let attributeHandler = loaderAttrubuteHandler("0");
	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Origin");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Builder");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Core", WuxDef._tab), "Overview");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Training", WuxDef._tab), "Training");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Advancement", WuxDef._tab), "Advancement");

	attributeHandler.addUpdate(WuxDef.GetVariable("Level"), 1);
	attributeHandler.addUpdate(WuxDef.GetVariable("CR"), 1);
	attributeHandler.addUpdate(WuxDef.GetVariable("XP"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("PP"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementPoints"), 1);
	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementPoints", WuxDef._max), 1);

	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementJob"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementSkill"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementTechnique"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("TrainingKnowledge"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("TrainingTechniques"), 0);

	let manager = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Technique", "Attribute"]);
	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
	attributeHandler.addGetAttrCallback(function (attrHandler) {
		manager.setAttributeHandlerPoints(attrHandler);
	});
	
	attributeHandler.run();
};

var loaderAttrubuteHandler = function (version) {
	console.log(`Upgrading to ${version}`);
	let attributeHandler = new WorkerAttributeHandler();
	attributeHandler.addUpdate("version", version);
	// attributeHandler.addFinishCallback(versioning);
	return attributeHandler;
}

var versioning = function () {
	getAttrs(["version"], function (v) {
		console.log("Checking version " + v["version"]);

		switch(v["version"]) {
			case "1.0.0":
				console.log("Wuxing Sheet modified from 5th Edition OGL by Roll20 v" + v["version"]);
				break;
			default:
				upgrade_to_1_0_0();
		}
	});
}

var on_sheet_opened = function() {

	versioning();
};

