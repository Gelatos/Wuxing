var wuxCurrentVersion = "2.0.0";

var upgrade_to_2_0_0 = function (currentVersion) {
	// From 1.0.9: clear old popup values
	let inspectPopupOldItemsRepeater = new WorkerRepeatingSectionHandler("ItemPopupValues");
	inspectPopupOldItemsRepeater.getIds(function (itemPopupRepeater) {
		itemPopupRepeater.removeAllIds();
	});

	let styleWorker = new WuxStyleWorkerBuild();
	let attributeHandler = loaderAttrubuteHandler(currentVersion, "2.0.0");

	// From 1.0.7: Soc_Impatience, AffinityAspect
	attributeHandler.addUpdate(WuxDef.GetVariable("Soc_Impatience"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("Soc_Impatience", WuxDef._max), 16);
	let affinityAspectVar = WuxDef.GetVariable("AffinityAspect");
	attributeHandler.addUpdate(affinityAspectVar, 0);
	let affinityVar = WuxDef.GetVariable("Affinity");
	attributeHandler.addMod(affinityVar);

	// From 1.0.11: Equipment, Consumables, Lore repeaters
	attributeHandler.addRepeatingSection("RepeatingEquipment");
	attributeHandler.addRepeatingSection("RepeatingConsumables");
	let loreRepeaterIds = [
		"RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
		"RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
	];
	let loreTierVar = WuxDef.GetVariable("Lore_Tier");
	let loreSubTypeVar = WuxDef.GetVariable("Lore_SubType");
	let loreNameVar = WuxDef.GetVariable("Lore_Name");
	let loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));

	for (let i = 0; i < loreCategoryDefinitions.length; i++) {
		attributeHandler.addMod(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
	}
	for (let i = 0; i < loreRepeaterIds.length; i++) {
		attributeHandler.addRepeatingSection(loreRepeaterIds[i]);
		let repeater = attributeHandler.getRepeatingSection(loreRepeaterIds[i]);
		repeater.addFieldNames([loreTierVar, loreSubTypeVar, loreNameVar]);
	}

	// From 1.0.12: Styles repeater, StyleWorker, UpdatePerkMaxRanks, Advancement, Build managers
	attributeHandler.addRepeatingSection("RepeatingStyles");
	attributeHandler.addMod(styleWorker.attrBuildDraft);
	attributeHandler.addMod(styleWorker.attrMax);

	WuxWorkerGeneral.UpdatePerkMaxRanks(attributeHandler);

	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementJob"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementSkill"), 0);

	let advancementWorker = new WuxAdvancementWorkerBuild();
	advancementWorker.updateAdvancementPoints(attributeHandler);

	let techniqueManager = new WuxWorkerBuildManager(["Technique"]);
	techniqueManager.setupAttributeHandlerForPointUpdate(attributeHandler);

	let manager = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Attribute", "Perk", "Style"]);
	manager.setupAttributeHandlerForPointUpdate(attributeHandler);

	attributeHandler.addGetAttrCallback(function (attrHandler) {
		// From 1.0.7: Technique build stats
		techniqueManager.iterate(function (worker) {
			attrHandler.addUpdate(affinityAspectVar, attrHandler.parseString(affinityVar));
			worker.setBuildStatsDraft(attrHandler);
			attrHandler.addUpdate(worker.attrBuildDraft, JSON.stringify(worker.buildStats));
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});

		// From 1.0.11: Lore migration and page reset
		attributeHandler.getRepeatingSection("RepeatingEquipment").removeAllIds();
		attributeHandler.getRepeatingSection("RepeatingConsumables").removeAllIds();
		attrHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), "0");
		attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits"), "None");
		attrHandler.addUpdate(WuxDef.GetVariable("Jin"), 1000);
		attributeHandler.addUpdate(WuxDef.GetVariable("Loading"), "0");
		attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Origin");
		attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Builder");

		let loreWorker = new WuxLoreWorkerBuild();
		loreWorker.buildStats = new WorkerBuildStats();

		for (let i = 0; i < loreCategoryDefinitions.length; i++) {
			let rawRank = attrHandler.parseString(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
			if (rawRank === "on" || parseInt(rawRank) > 0) {
				let key = `General ${loreCategoryDefinitions[i].title}`;
				loreWorker.buildStats.add(key, new WorkerBuildStat([key, "on"]));
			}
		}
		for (let i = 0; i < loreRepeaterIds.length; i++) {
			let repeater = attrHandler.getRepeatingSection(loreRepeaterIds[i]);
			repeater.iterate(function (id) {
				let tier = attrHandler.parseInt(repeater.getFieldName(id, loreTierVar));
				if (tier > 0) {
					let subType = attrHandler.parseString(repeater.getFieldName(id, loreSubTypeVar));
					let loreName = subType === "1"
						? attrHandler.parseString(repeater.getFieldName(id, loreNameVar))
						: subType;
					if (loreName !== "" && loreName !== "0") {
						loreWorker.buildStats.add(loreName, new WorkerBuildStat([loreName, tier.toString()]));
					}
				}
			});
		}
		attrHandler.addUpdate(loreWorker.attrBuildDraft, JSON.stringify(loreWorker.buildStats));

		// From 1.0.12: Styles and all build stats
		attributeHandler.getRepeatingSection("RepeatingStyles").removeAllIds();
		styleWorker.setBuildStatsDraft(attrHandler);
		styleWorker.clearBuildStats();
		styleWorker.updatePoints(attrHandler);
		styleWorker.revertBuildStatsDraft(attrHandler);

		manager.iterate(function (worker) {
			worker.setBuildStatsDraft(attrHandler);

			if (worker.definition.name === "Job") {
				worker.buildStats.iterate(function (buildStat) {
					buildStat.value = "on";
					attrHandler.addUpdate(buildStat.name, "on");
				});
			}

			attrHandler.addUpdate(worker.attrBuildDraft, JSON.stringify(worker.buildStats));
			worker.setPointsMax(attributeHandler);
			worker.updatePoints(attributeHandler);
		});

		// Re-run the advancement worker with TrainingKnowledge explicitly in the build stats,
		// since the old draft may not have included it.
		let advWorkerFix = new WuxAdvancementWorkerBuild();
		advWorkerFix.setBuildStatsDraft(attrHandler);
		let knowledgeVar = WuxDef.GetVariable("TrainingKnowledge");
		let knowledgeCount = attrHandler.parseInt(knowledgeVar);
		advWorkerFix.buildStats.add(knowledgeVar, new WorkerBuildStat([knowledgeVar, knowledgeCount.toString()]));
		attrHandler.addUpdate(advWorkerFix.attrBuildDraft, JSON.stringify(advWorkerFix.buildStats));
		advWorkerFix.setPointsMax(attributeHandler);
		advWorkerFix.updatePoints(attrHandler);
	});

	WuxWorkerJobs.RefreshStats(attributeHandler);
	WuxWorkerSkills.RefreshStats(attributeHandler);
	attributeHandler.addFinishCallback(function () {
		WuxWorkerActions.TriggerBuilderActionUpdate();
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

	attributeHandler.addFinishCallback(function () {
		WuxWorkerActions.TriggerBuilderActionUpdate();
	});

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
			case "1.0.11":
			case "1.0.10":
			case "1.0.9":
			case "1.0.8":
			case "1.0.7":
			case "1.0.6":
			case "1.0.5":
			case "1.0.4":
			case "1.0.3":
			case "1.0.2":
			case "1.0.1":
			case "1.0.0":
				upgrade_to_2_0_0(v["version"]);
				break;
			default:
				upgrade_to_1_0_0(v["version"]);
		}
	});
}

var on_sheet_opened = function() {

	versioning();
};

