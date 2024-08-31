var upgrade_to_1_0_0 = function () {
	let attributeHandler = loaderAttrubuteHandler("0");
	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Origin");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Builder");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Core", WuxDef._tab), "Overview");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_TechType", WuxDef._tab), "Style");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Training", WuxDef._tab), "Training");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Advancement", WuxDef._tab), "Advancement");

	let advancementWorker = new WuxAdvancementWorkerBuild();
	advancementWorker.setBuildStatsDraft(attributeHandler);
	attributeHandler.addUpdate(WuxDef.GetVariable("XP"), 0);
	advancementWorker.updateLevel(attributeHandler, WuxDef.GetVariable("Level"), 1);

	let trainingWorker = new WuxTrainingWorkerBuild();
	trainingWorker.setBuildStatsDraft(attributeHandler);
	attributeHandler.addUpdate(WuxDef.GetVariable("PP"), 0);
	trainingWorker.updateTrainingPoints(attributeHandler, WuxDef.GetVariable("Training"), 0);

	let manager = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Technique", "Attribute", "Style", "JobStyle"]);
	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
	attributeHandler.addGetAttrCallback(function (attrHandler) {
		manager.iterate(function(worker) {
			worker.setBuildStatsDraft(attrHandler);
			attrHandler.addUpdate(worker.attrBuildDraft, JSON.stringify(worker.buildStats));
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});
	});

	WuxWorkerTechniques.FilterTechniquesForLearn(attributeHandler);
	
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

