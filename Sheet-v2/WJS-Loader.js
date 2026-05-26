var wuxCurrentVersion = "1.0.9";

var upgrade_to_1_0_9 = function (currentVersion) {
	let attributeHandler = loaderAttrubuteHandler(currentVersion, "1.0.9");
	let inspectPopupOldItemsRepeater = new WorkerRepeatingSectionHandler("ItemPopupValues");
	inspectPopupOldItemsRepeater.getIds(function (itemPopupRepeater) {
		itemPopupRepeater.removeAllIds();
	});
	attributeHandler.run();
}

var upgrade_to_1_0_7 = function (currentVersion) {
	let attributeHandler = loaderAttrubuteHandler(currentVersion, "1.0.7");
	
	attributeHandler.addUpdate(WuxDef.GetVariable("Soc_Impatience"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("Soc_Impatience", WuxDef._max), 16);

	let affinityAspectVar = WuxDef.GetVariable("AffinityAspect");
	attributeHandler.addUpdate(affinityAspectVar, 0);
	let affinityVar = WuxDef.GetVariable("Affinity");
	attributeHandler.addMod(affinityVar);
	
	let manager = new WuxWorkerBuildManager(["Technique"]);
	manager.setupAttributeHandlerForPointUpdate(attributeHandler);

	attributeHandler.addGetAttrCallback(function (attrHandler) {
		manager.iterate(function(worker) {
			attrHandler.addUpdate(affinityAspectVar, attrHandler.parseString(affinityVar));
			
			worker.setBuildStatsDraft(attrHandler);
			attrHandler.addUpdate(worker.attrBuildDraft, JSON.stringify(worker.buildStats));
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});
	});

	attributeHandler.run();
};

var upgrade_to_1_0_0 = function (currentVersion) {
	let attributeHandler = loaderAttrubuteHandler(currentVersion, "1.0.0");
	attributeHandler.addUpdate(WuxDef.GetVariable("Loading"), "0");
	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Origin");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Builder");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Core", WuxDef._tab), "Overview");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Training", WuxDef._tab), "Training");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Advancement", WuxDef._tab), "Advancement");
	attributeHandler.addUpdate(WuxDef.GetVariable("EN"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("EN", WuxDef._max), 9);
	attributeHandler.addUpdate(WuxDef.GetVariable("MvCharge"), 0);

	let statBonusFilter = WuxDef.Filter([new DatabaseFilterData("group", "StatBonus")]);
	for (let i = 0; i < statBonusFilter.length; i++) {
		attributeHandler.addFormulaMods(statBonusFilter[i]);
	}

	let advancementWorker = new WuxAdvancementWorkerBuild();
	advancementWorker.setBuildStatsDraft(attributeHandler);
	attributeHandler.addUpdate(WuxDef.GetVariable("XP"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("Vitality", WuxDef._max), 1);
	advancementWorker.updateLevel(attributeHandler, WuxDef.GetVariable("Level"), 1);

	let trainingWorker = new WuxTrainingWorkerBuild();
	trainingWorker.setBuildStatsDraft(attributeHandler);
	attributeHandler.addUpdate(WuxDef.GetVariable("PP"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("Training"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("Training", WuxDef._max), 0);
	trainingWorker.updateTrainingPoints(attributeHandler);

	let manager = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Attribute", "Perk"]);
	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
	
	attributeHandler.addGetAttrCallback(function (attrHandler) {
			
		// update all slots
		let jobDef = WuxDef.Get("JobSlots");
		attrHandler.addUpdate(jobDef.getVariable(), jobDef.formula.getValue(attrHandler));
		let arteformDef = WuxDef.Get("AdvancedSlots");
		attrHandler.addUpdate(arteformDef.getVariable(), arteformDef.formula.getValue(attrHandler));
		let advancedDef = WuxDef.Get("StyleSlots");
		attrHandler.addUpdate(advancedDef.getVariable(), advancedDef.formula.getValue(attrHandler));
		let weaponDef = WuxDef.Get("WeaponSlots");
		attrHandler.addUpdate(weaponDef.getVariable(), weaponDef.formula.getValue(attrHandler));
		let equipmentDef = WuxDef.Get("EquipmentSlots");
		attrHandler.addUpdate(equipmentDef.getVariable(), equipmentDef.formula.getValue(attrHandler));
		
		manager.iterate(function(worker) {
			worker.setBuildStatsDraft(attrHandler);
			attrHandler.addUpdate(worker.attrBuildDraft, JSON.stringify(worker.buildStats));
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});

		for (let i = 0; i < statBonusFilter.length; i++) {
			attrHandler.addUpdate(statBonusFilter[i].getVariable(), statBonusFilter[i].formula.getValue(attrHandler));
		}
	});

	WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
	
	attributeHandler.run();
};

var loaderAttrubuteHandler = function (currentVersion, newVersion) {
	console.log(`Upgrading v${currentVersion} to v${newVersion}`);
	let attributeHandler = new WorkerAttributeHandler();
	attributeHandler.addUpdate("version", newVersion);
	if (currentVersion != newVersion) {
		attributeHandler.addFinishCallback(versioning);
	}
	return attributeHandler;
}

var versioning = function () {
	getAttrs(["version"], function (v) {
		console.log("Checking version " + v["version"]);

		switch(v["version"]) {
			case wuxCurrentVersion:
				console.log(`Wuxing Sheet modified from 5th Edition OGL by Roll20 v${wuxCurrentVersion}`);
				break;
			case "1.0.8":
			case "1.0.7":
				upgrade_to_1_0_9(v["version"]);
				break;
			case "1.0.6":
			case "1.0.5":
			case "1.0.4":
			case "1.0.3":
			case "1.0.2":
			case "1.0.1":
			case "1.0.0":
				upgrade_to_1_0_7(v["version"]);
				break;
			default:
				upgrade_to_1_0_0(v["version"]);
		}
	});
}

var on_sheet_opened = function() {

	versioning();
};

