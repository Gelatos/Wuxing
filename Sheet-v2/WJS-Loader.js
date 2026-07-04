var wuxCurrentVersion = "2.0.0";

var upgrade_to_2_0_0 = function (currentVersion) {
	// Runs separately — clears old popup repeating section outside the main handler
	let inspectPopupOldItemsRepeater = new WorkerRepeatingSectionHandler("ItemPopupValues");
	inspectPopupOldItemsRepeater.getIds(function (itemPopupRepeater) {
		itemPopupRepeater.removeAllIds();
	});

	let styleWorker = new WuxStyleWorkerBuild();
	let attributeHandler = loaderAttrubuteHandler(currentVersion, "2.0.0");

	// Fixed-value updates — none of these depend on read attributes
	attributeHandler.addUpdate(WuxDef.GetVariable("Soc_Impatience"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("Soc_Impatience", WuxDef._max), 16);
	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementJob"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("AdvancementSkill"), 0);
	attributeHandler.addUpdate(WuxDef.GetVariable("Gear_EqipmentIsVisible"), "0");
	attributeHandler.addUpdate(WuxDef.GetVariable("Gear_EquippedItemTraits"), "None");
	attributeHandler.addUpdate(WuxDef.GetVariable("Jin"), 1000);
	attributeHandler.addUpdate(WuxDef.GetVariable("Loading"), "0");
	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Origin");
	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Builder");

	attributeHandler.addUpdate(WuxDef.GetVariable("Forme_JobSlot"), "");

	// Variables needed inside the callback — computed once here
	const affinityAspectVar = WuxDef.GetVariable("AffinityAspect");
	const affinityVar = WuxDef.GetVariable("Affinity");
	const knowledgeVar = WuxDef.GetVariable("TrainingKnowledge");
	const loreTierVar = WuxDef.GetVariable("Lore_Tier");
	const loreSubTypeVar = WuxDef.GetVariable("Lore_SubType");
	const loreNameVar = WuxDef.GetVariable("Lore_Name");
	const loreRepeaterIds = [
		"RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
		"RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
	];
	const loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));

	// Attributes to read
	attributeHandler.addMod(affinityVar);
	attributeHandler.addFormulaMods(styleWorker.definition);
	attributeHandler.addMod(styleWorker.attrBuildDraft);
	attributeHandler.addMod(styleWorker.attrMax);

	// Repeating sections (IDs fetched during run before the callback fires)
	attributeHandler.addRepeatingSection("RepeatingEquipment");
	attributeHandler.addRepeatingSection("RepeatingConsumables");
	attributeHandler.addRepeatingSection("RepeatingStyles");
	for (const loreRepeaterId of loreRepeaterIds) {
		attributeHandler.addRepeatingSection(loreRepeaterId);
		attributeHandler.getRepeatingSection(loreRepeaterId).addFieldNames([loreTierVar, loreSubTypeVar, loreNameVar]);
	}
	for (const loreCategoryDefinition of loreCategoryDefinitions) {
		attributeHandler.addMod(loreCategoryDefinition.getVariable(WuxDef._rank));
	}

	WuxWorkerGeneral.UpdatePerkMaxRanks(attributeHandler);

	let advancementWorker = new WuxAdvancementWorkerBuild();
	advancementWorker.updateAdvancementPoints(attributeHandler);

	let manager = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Attribute", "Perk", "Style"]);
	manager.setupAttributeHandlerForPointUpdate(attributeHandler);

	attributeHandler.addGetAttrCallback(function (attrHandler) {
		// Set affinity aspect from the current affinity value
		attrHandler.addUpdate(affinityAspectVar, attrHandler.parseString(affinityVar));

		// Clear old equipment and consumable rows
		attrHandler.getRepeatingSection("RepeatingEquipment").removeAllIds();
		attrHandler.getRepeatingSection("RepeatingConsumables").removeAllIds();

		// Migrate lore data to the new build stats format
		let loreWorker = new WuxLoreWorkerBuild();
		loreWorker.buildStats = new WorkerBuildStats();

		for (const loreCategoryDefinition of loreCategoryDefinitions) {
			let rawRank = attrHandler.parseString(loreCategoryDefinition.getVariable(WuxDef._rank));
			if (rawRank === "on" || parseInt(rawRank) > 0) {
				let key = `General ${loreCategoryDefinition.title}`;
				loreWorker.buildStats.add(key, new WorkerBuildStat([key, "on"]));
			}
		}
		for (const loreRepeaterId of loreRepeaterIds) {
			let repeater = attrHandler.getRepeatingSection(loreRepeaterId);
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

		// Reset style worker build stats (clears stale technique data)
		attrHandler.getRepeatingSection("RepeatingStyles").removeAllIds();
		styleWorker.setBuildStatsDraft(attrHandler);
		styleWorker.clearBuildStats();
		styleWorker.setPointsMax(attrHandler);
		styleWorker.updatePoints(attrHandler);
		styleWorker.revertBuildStatsDraft(attrHandler);

		// Rebuild all build point stats from current sheet state; Job and Perk are fully reset
		manager.iterate(function (worker) {
			if (worker.definition.name === "Job" || worker.definition.name === "Perk") {
				worker.buildStats = new WorkerBuildStats();
				for (const variable of worker.getBuildVariables()) {
					attrHandler.addUpdate(variable, "0");
				}
			} else {
				worker.setBuildStatsDraft(attrHandler);
			}

			attrHandler.addUpdate(worker.attrBuildDraft, JSON.stringify(worker.buildStats));
			worker.setPointsMax(attrHandler);
			worker.updatePoints(attrHandler);
		});

		// Re-run the advancement worker with TrainingKnowledge explicitly in the build stats,
		// since the old draft may not have included it.
		let advWorkerFix = new WuxAdvancementWorkerBuild();
		advWorkerFix.setBuildStatsDraft(attrHandler);
		let knowledgeCount = attrHandler.parseInt(knowledgeVar);
		advWorkerFix.buildStats.add(knowledgeVar, new WorkerBuildStat([knowledgeVar, knowledgeCount.toString()]));
		attrHandler.addUpdate(advWorkerFix.attrBuildDraft, JSON.stringify(advWorkerFix.buildStats));
		advWorkerFix.setPointsMax(attrHandler);
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

