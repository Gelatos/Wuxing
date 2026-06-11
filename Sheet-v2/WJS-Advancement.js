var WuxWorkerCharacterCreation = WuxWorkerCharacterCreation || (function () {
	'use strict';

	var
		finishBuild = function () {
			Debug.Log("Finish Character Creation Build");
			let attributeHandler = new WorkerAttributeHandler();

			let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Attribute", "Technique", "Perk"]);
			pointManagers.commitChanges(attributeHandler);

			let trainingWorker = new WuxTrainingWorkerBuild();
			trainingWorker.commitChanges(attributeHandler);

			let advancementWorker = new WuxAdvancementWorkerBuild();
			advancementWorker.commitChanges(attributeHandler);
			
			WuxWorkerActions.UpdateAllFormeActions(attributeHandler);
			WuxWorkerAttributes.UpdateStats(attributeHandler);
			WuxWorkerPerks.UpdateStats(attributeHandler);
			WuxWorkerSkills.UpdateStats(attributeHandler);
			WuxWorkerKnowledges.UpdateStats(attributeHandler);
			WuxWorkerJobs.UpdateStats(attributeHandler);
			WuxWorkerStyles.UpdateStats(attributeHandler);
			WuxWorkerAdvancement.UpdateStats(attributeHandler);
			WuxWorkerGeneral.UpdateStats(attributeHandler);

			leavePageVariables(attributeHandler);
			
			let loader = new LoadingScreenHandler(attributeHandler);
			loader.run();
		},
		leavePageVariables = function (attributeHandler) {
			attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
			attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
			attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
		},
		setAffinityValue = function (eventinfo) {
			Debug.Log(`Setting ${eventinfo.sourceAttribute}`);

			let primaryAffinityVariable = WuxDef.GetVariable("Affinity");
			let affinityAspectVariable = WuxDef.GetVariable("AffinityAspect");
			let advancedAffinityVariable = WuxDef.GetVariable("AdvancedAffinity");
			let isPrimary = (eventinfo.sourceAttribute == primaryAffinityVariable || eventinfo.sourceAttribute == affinityAspectVariable);
			let attributeHandler = new WorkerAttributeHandler();
			let affinityVariable = eventinfo.sourceAttribute;

			let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

			attributeHandler.addMod(affinityVariable);
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				let variable = `${affinityVariable}${WuxDef._learn}`;
				let desc = WuxDef.GetDescription(`${WuxDef.GetAbbreviation()}${eventinfo.newValue}`);
				if (isPrimary) {
					attrHandler.addUpdate(primaryAffinityVariable, eventinfo.newValue);
					combatDetailsHandler.onUpdateAffinity(attrHandler, eventinfo.newValue);
				} else {
					// AdvancedAffinity stores a semicolon-delimited array. When Secondary
					// Affinity writes a new single value, preserve any non-AffinityType
					// entries (e.g. advanced branch names) from the previous array and
					// replace only the AffinityType slot.
					let allAffinityTitles = WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]).map(d => d.getTitle());
					let previousEntries = (eventinfo.previousValue || "").split(";").map(s => s.trim()).filter(s => s !== "" && !allAffinityTitles.includes(s));
					if (eventinfo.newValue && eventinfo.newValue !== "") {
						previousEntries.push(eventinfo.newValue);
					}
					attrHandler.addUpdate(advancedAffinityVariable, previousEntries.join(";"));
				}
				attrHandler.addUpdate(variable, desc);

			});
			if (eventinfo.sourceAttribute == primaryAffinityVariable) {
				WuxWorkerActions.UpdateVisibilityOfFormeActions(attributeHandler);
			}
			attributeHandler.run();
		},
		setBonusAttributes = function () {
			Debug.Log("Setting Bonus Attribute Points");
			let attributeHandler = new WorkerAttributeHandler();
			let attributesVariable = WuxDef.Get("Attribute");

			attributeHandler.addFormulaMods(attributesVariable);
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				let newValue = attributesVariable.formula.getValue(attrHandler);
				attrHandler.addUpdate(attributesVariable.getVariable(WuxDef._max), newValue);
			});
			attributeHandler.run();
		},
		setInnateDefense = function () {
			Debug.Log("Setting Innate Defense");
			let attributeHandler = new WorkerAttributeHandler();
			let innateDefenseVariable = WuxDef.GetVariable("InnateDefense");
			let braceDef = WuxDef.Get("Def_Brace");
			let fortitudeDef = WuxDef.Get("Def_Fortitude");
			let disruptionDef = WuxDef.Get("Def_Disruption");
			let hideDef = WuxDef.Get("Def_Hide");
			let reflexDef = WuxDef.Get("Def_Reflex");
			let evasionDef = WuxDef.Get("Def_Evasion");
			attributeHandler.addFormulaMods(braceDef);
			attributeHandler.addFormulaMods(fortitudeDef);
			attributeHandler.addFormulaMods(disruptionDef);
			attributeHandler.addFormulaMods(hideDef);
			attributeHandler.addFormulaMods(reflexDef);
			attributeHandler.addFormulaMods(evasionDef);

			attributeHandler.addMod(innateDefenseVariable);
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				attrHandler.addUpdate(braceDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(fortitudeDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(disruptionDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(hideDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(reflexDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(evasionDef.getVariable(WuxDef._expertise), 0);

				switch (attrHandler.parseString(innateDefenseVariable)) {
					case "BOD":
						setDefenseVariables(attrHandler, "Defense", "BOD", "Brace", "Fortitude");
						break;
					case "PRC":
						setDefenseVariables(attrHandler, "Defense", "PRC", "Disruption", "Hide");
						break;
					case "QCK":
						setDefenseVariables(attrHandler, "Defense", "QCK", "Reflex", "Evasion");
						break;
					default:
						attrHandler.addUpdate(WuxDef.GetVariable("InnateDefense", WuxDef._learn), "Choose an attribute");
						break;
				}

				attrHandler.addUpdate(braceDef.getVariable(), braceDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(fortitudeDef.getVariable(), fortitudeDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(disruptionDef.getVariable(), disruptionDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(hideDef.getVariable(), hideDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(reflexDef.getVariable(), reflexDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(evasionDef.getVariable(), evasionDef.formula.getValue(attrHandler));
			});
			attributeHandler.run();
		},
		setInnateSense = function () {
			Debug.Log("Setting Innate Sense");
			let attributeHandler = new WorkerAttributeHandler();
			let innateSenseVariable = WuxDef.GetVariable("InnateSense");
			let senseResolveDef = WuxDef.Get("Def_Resolve");
			let senseFreewillDef = WuxDef.Get("Def_Freewill");
			let senseInsightDef = WuxDef.Get("Def_Insight");
			let senseNoticeDef = WuxDef.Get("Def_Notice");
			let senseScrutinyDef = WuxDef.Get("Def_Scrutiny");
			let senseDetectDef = WuxDef.Get("Def_Detect");
			attributeHandler.addFormulaMods(senseResolveDef);
			attributeHandler.addFormulaMods(senseFreewillDef);
			attributeHandler.addFormulaMods(senseInsightDef);
			attributeHandler.addFormulaMods(senseNoticeDef);
			attributeHandler.addFormulaMods(senseScrutinyDef);
			attributeHandler.addFormulaMods(senseDetectDef);

			attributeHandler.addMod(innateSenseVariable);
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				attrHandler.addUpdate(senseResolveDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(senseFreewillDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(senseInsightDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(senseNoticeDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(senseScrutinyDef.getVariable(WuxDef._expertise), 0);
				attrHandler.addUpdate(senseDetectDef.getVariable(WuxDef._expertise), 0);

				switch (attrHandler.parseString(innateSenseVariable)) {
					case "CNV":
						setDefenseVariables(attrHandler, "Sense", "CNV", "Resolve", "Freewill");
						break;
					case "INT":
						setDefenseVariables(attrHandler, "Sense", "INT", "Insight", "Notice");
						break;
					case "RSN":
						setDefenseVariables(attrHandler, "Sense", "RSN", "Scrutiny", "Detect");
						break;
					default:
						attrHandler.addUpdate(WuxDef.GetVariable("InnateSense", WuxDef._learn), "Choose an attribute");
						break;
				}

				attrHandler.addUpdate(senseResolveDef.getVariable(), senseResolveDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(senseFreewillDef.getVariable(), senseFreewillDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(senseInsightDef.getVariable(), senseInsightDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(senseNoticeDef.getVariable(), senseNoticeDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(senseScrutinyDef.getVariable(), senseScrutinyDef.formula.getValue(attrHandler));
				attrHandler.addUpdate(senseDetectDef.getVariable(), senseDetectDef.formula.getValue(attrHandler));
			});
			attributeHandler.run();
		},
		setDefenseVariables = function (attrHandler, type, attribute, defense1, defense2) {
			let attrDefinition = WuxDef.Get(`Attr_${attribute}`);
			let def1Definition = WuxDef.Get(`Def_${defense1}`);
			let def2Definition = WuxDef.Get(`Def_${defense2}`);

			attrHandler.addUpdate(WuxDef.GetVariable(`Innate${type}`, WuxDef._learn), getDefenseDescription(type, attrDefinition, def1Definition, def2Definition));
			attrHandler.addUpdate(def1Definition.getVariable(WuxDef._expertise), 2);
			attrHandler.addUpdate(def2Definition.getVariable(WuxDef._expertise), 2);
		},
		getDefenseDescription = function (type, attrDefinition, def1Definition, def2Definition) {
			Debug.Log("Getting Defense Description");

			let output = `${attrDefinition.title} is associated with the following ${type}s:\n\n`;
			output += `${def1Definition.title}: ${def1Definition.getDescription()}\n\n${def2Definition.title}: ${def2Definition.getDescription()}`;
			Debug.Log(output);
			return output;
		}

	return {
		FinishBuild: finishBuild,
		SetAffinityValue: setAffinityValue,
		SetBonusAttributes: setBonusAttributes,
		SetInnateDefense: setInnateDefense,
		SetInnateSense: setInnateSense
	};
}());

var WuxWorkerTraining = WuxWorkerTraining || (function () {
	'use strict';

	var
		goToPageSet = function () {
			let attributeHandler = new WorkerAttributeHandler();
			attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Training");
			attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Training");
			attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Training"), "Training");

			attributeHandler.addMod(WuxDef.GetVariable("PP"));
			let worker = new WuxTrainingWorkerBuild();
			attributeHandler.addMod(worker.attrMax);
			attributeHandler.addMod(worker.attrBuildFinal);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				worker.setBuildStatsFinal(attrHandler);
				worker.updateMaxBuildStats(attrHandler, WuxDef.GetVariable("PP"), attrHandler.parseInt(WuxDef.GetVariable("PP")));
				worker.revertBuildStatsDraft(attrHandler);
			});

			WuxWorkerKnowledges.RefreshStats(attributeHandler);
			WuxWorkerStyles.RefreshStats(attributeHandler);
			WuxWorkerActions.UpdateVisibilityOfFormeActions(attributeHandler);

			attributeHandler.run();
		},
		finishBuild = function () {
			Debug.Log("Finish Training Build");
			let loader = new LoadingScreenHandler();
			loader.showLoadingScreen(() => {
				let attributeHandler = new WorkerAttributeHandler();

				let pointManagers = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
				pointManagers.commitChanges(attributeHandler);

				let trainingWorker = new WuxTrainingWorkerBuild();
				trainingWorker.commitChanges(attributeHandler);

				WuxWorkerKnowledges.UpdateStats(attributeHandler);
				WuxWorkerStyles.UpdateStats(attributeHandler);
				WuxWorkerActions.UpdateAllFormeActions(attributeHandler);

				leavePageVariables(attributeHandler);

				attributeHandler.addFinishCallback(() => {
					loader.hideLoadingScreen();
				});
				attributeHandler.run();
			});
		},
		exitBuild = function () {
			Debug.Log("Exit Training Build");
			let loader = new LoadingScreenHandler();
			loader.showLoadingScreen(() => {
				let crVar = WuxDef.GetVariable("CR");
				let crAttributeHandler = new WorkerAttributeHandler();
				crAttributeHandler.addMod(crVar);
				crAttributeHandler.addFinishCallback(function (crAttrHandler) {
					let attributeHandler = new WorkerAttributeHandler();
		
					let pointManagers = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
					pointManagers.resetChanges(attributeHandler);
		
					let trainingWorker = new WuxTrainingWorkerBuild();
					trainingWorker.resetChanges(attributeHandler);

					WuxWorkerKnowledges.UpdateStats(attributeHandler);
					WuxWorkerStyles.UpdateStats(attributeHandler);
					WuxWorkerActions.UpdateAllFormeActions(attributeHandler);
		
					leavePageVariables(attributeHandler);

					attributeHandler.addFinishCallback(() => {
						loader.hideLoadingScreen();
					});
					attributeHandler.run();

				});
				crAttributeHandler.run();
			});
		},
		leavePageVariables = function (attributeHandler) {
			attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
			attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
			attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
		},

		convertPp = function () {
			Debug.Log("Converting PP to Level");
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxTrainingWorkerBuild();
			worker.convertPp(attributeHandler);
			attributeHandler.run();
		},
		setTrainingPoints = function () {
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxTrainingWorkerBuild();
			worker.updateTrainingPoints(attributeHandler);
			attributeHandler.run();
		},
		setTrainingPointsUpdate = function (eventinfo) {
			Debug.Log("Setting Training Points Values");
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxTrainingWorkerBuild();
			worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			worker.updateTrainingPoints(attributeHandler);
			attributeHandler.run();
		}

	return {
		GoToPageSet: goToPageSet,
		FinishBuild: finishBuild,
		ExitBuild: exitBuild,
		ConvertPp: convertPp,
		SetTrainingPoints: setTrainingPoints,
		SetTrainingPointsUpdate: setTrainingPointsUpdate
	};
}());

var WuxWorkerAdvancement = WuxWorkerAdvancement || (function () {
	'use strict';

	var
		goToPageSet = function () {
			Debug.Log("Go to Advancement Page");
			let attributeHandler = new WorkerAttributeHandler();
			attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Advancement");
			attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Advancement");
			attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Advancement"), "Advancement");

			attributeHandler.addMod([WuxDef.GetVariable("XP"), WuxDef.GetVariable("CR")]);
			let worker = new WuxAdvancementWorkerBuild();
			attributeHandler.addMod(worker.attrMax);
			attributeHandler.addMod(worker.attrBuildFinal);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				worker.setBuildStatsFinal(attrHandler);
				worker.updateMaxBuildStats(attrHandler, WuxDef.GetVariable("XP"), attrHandler.parseInt(WuxDef.GetVariable("XP")));
				worker.revertBuildStatsDraft(attrHandler);
			});

			WuxWorkerAttributes.RefreshStats(attributeHandler);
			WuxWorkerPerks.RefreshStats(attributeHandler);
			WuxWorkerSkills.RefreshStats(attributeHandler);
			WuxWorkerJobs.RefreshStats(attributeHandler);
			WuxWorkerStyles.RefreshStats(attributeHandler);

			attributeHandler.run();
		},
		finishBuild = function () {
			Debug.Log("Finish Advancement Build");
			let loader = new LoadingScreenHandler();
			loader.showLoadingScreen(() => {
				let attributeHandler = new WorkerAttributeHandler();
	
				let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Attribute", "Perk"]);
				pointManagers.commitChanges(attributeHandler);
	
				let advancementWorker = new WuxAdvancementWorkerBuild();
				advancementWorker.commitChanges(attributeHandler);

				WuxWorkerAttributes.UpdateStats(attributeHandler);
				WuxWorkerPerks.UpdateStats(attributeHandler);
				WuxWorkerSkills.UpdateStats(attributeHandler);
				WuxWorkerJobs.UpdateStats(attributeHandler);
				WuxWorkerStyles.UpdateStats(attributeHandler);
				WuxWorkerActions.UpdateAllFormeActions(attributeHandler);
				updateStats(attributeHandler);
	
				leavePageVariables(attributeHandler);

				attributeHandler.addFinishCallback(() => {
					loader.hideLoadingScreen();
				});
				attributeHandler.run();
			});
		},
		exitBuild = function () {
			Debug.Log("Exit Advancement Build");
			let loader = new LoadingScreenHandler();
			loader.showLoadingScreen(() => {
				let attributeHandler = new WorkerAttributeHandler();
	
				let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Attribute", "Technique", "Perk"]);
				pointManagers.resetChanges(attributeHandler);
	
				let advancementWorker = new WuxAdvancementWorkerBuild();
				advancementWorker.resetChanges(attributeHandler);

				WuxWorkerAttributes.UpdateStats(attributeHandler);
				WuxWorkerPerks.UpdateStats(attributeHandler);
				WuxWorkerSkills.UpdateStats(attributeHandler);
				WuxWorkerJobs.UpdateStats(attributeHandler);
				WuxWorkerStyles.UpdateStats(attributeHandler);
				WuxWorkerActions.UpdateAllFormeActions(attributeHandler);
				updateStats(attributeHandler);
	
				leavePageVariables(attributeHandler);

				attributeHandler.addFinishCallback(() => {
					loader.hideLoadingScreen();
				});
				attributeHandler.run();
			});
		},
		leavePageVariables = function (attributeHandler) {
			attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
			attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
			attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
		},

		convertXp = function () {
			Debug.Log("Converting XP to Level");
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxAdvancementWorkerBuild();
			worker.convertXp(attributeHandler);
			attributeHandler.run();
		},
		setLevel = function (eventinfo) {
			Debug.Log("Setting Level");
			let attributeHandler = new WorkerAttributeHandler();
			let advWorker = new WuxAdvancementWorkerBuild();
			advWorker.updateLevel(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			let trnWorker = new WuxTrainingWorkerBuild();
			trnWorker.updateLevel(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			attributeHandler.run();
		},
		setAdvancementPointsUpdate = function (eventinfo) {
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxAdvancementWorkerBuild();
			worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			worker.updateAdvancementPoints(attributeHandler);
			attributeHandler.run();
		},
		setAdvancementPerkTransferPointsUpdate = function (eventinfo) {
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxAdvancementWorkerBuild();
			worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			worker.updateAdvancementPoints(attributeHandler);
			attributeHandler.run();
			WuxWorkerPerks.UpdateBuildPoints(eventinfo, eventinfo.newValue);
		},
		setAffinityStats = function (attributeHandler) {
			let affinityVariable = WuxDef.GetVariable("Affinity");
			let crVariable = WuxDef.GetVariable("CR");
			attributeHandler.addMod([affinityVariable, crVariable]);

			attributeHandler.addGetAttrCallback(function (attrHandler) {

				let crValue = attrHandler.parseInt(crVariable);
				let hpVar = WuxDef.GetVariable("HP", WuxDef._affinity);
				let willVar = WuxDef.GetVariable("WILL", WuxDef._affinity);
				let startEnVar = WuxDef.GetVariable("StartEN", WuxDef._affinity);
				let surgeVar = WuxDef.GetVariable("Surge", WuxDef._affinity);
				let mvSpeedVar = WuxDef.GetVariable("Cmb_Mv", WuxDef._affinity);
				let dashSpeedVar = WuxDef.GetVariable("Cmb_MvDash", WuxDef._affinity);
				let hvVar = WuxDef.GetVariable("Cmb_HV", WuxDef._affinity);
				let armorVar = WuxDef.GetVariable("Cmb_Armor", WuxDef._affinity);
				let burnResVar = WuxDef.GetVariable("Cmb_BurnResist", WuxDef._affinity);
				let coldResVar = WuxDef.GetVariable("Cmb_ColdResist", WuxDef._affinity);
				let energyResVar = WuxDef.GetVariable("Cmb_EnergyResist", WuxDef._affinity);
				let forceResVar = WuxDef.GetVariable("Cmb_ForceResist", WuxDef._affinity);
				let piercingResVar = WuxDef.GetVariable("Cmb_PiercingResist", WuxDef._affinity);

				attrHandler.addUpdate(hpVar, 0);
				attrHandler.addUpdate(willVar, 0);
				attrHandler.addUpdate(hvVar, 0);
				attrHandler.addUpdate(startEnVar, 0);
				attrHandler.addUpdate(surgeVar, 0);
				attrHandler.addUpdate(mvSpeedVar, 0);
				attrHandler.addUpdate(dashSpeedVar, 0);
				attrHandler.addUpdate(armorVar, 0);
				attrHandler.addUpdate(burnResVar, 0);
				attrHandler.addUpdate(coldResVar, 0);
				attrHandler.addUpdate(energyResVar, 0);
				attrHandler.addUpdate(forceResVar, 0);
				attrHandler.addUpdate(piercingResVar, 0);

				switch (attrHandler.get(affinityVariable)) {
					case "Wood":
						attrHandler.addUpdate(hpVar, (5 * crValue));
						attrHandler.addUpdate(willVar, (5 * crValue));
						attrHandler.addUpdate(attrHandler, 10 + (10 * crValue));
						attrHandler.addUpdate(energyResVar, crValue * 3);
						break;
					case "Fire":
						attrHandler.addUpdate(startEnVar, 2);
						attrHandler.addUpdate(mvSpeedVar, 1);
						attrHandler.addUpdate(dashSpeedVar, 2);
						attrHandler.addUpdate(burnResVar, crValue * 3);
						break;
					case "Earth":
						attrHandler.addUpdate(hpVar, 10 + (5 * crValue));
						attrHandler.addUpdate(surgeVar, 1);
						attrHandler.addUpdate(forceResVar, crValue * 3);
						break;
					case "Metal":
						attrHandler.addUpdate(startEnVar, 1);
						attrHandler.addUpdate(armorVar, crValue * 2);
						attrHandler.addUpdate(piercingResVar, crValue * 3);
						break;
					case "Water":
						attrHandler.addUpdate(hpVar, 5 + (5 * crValue));
						attrHandler.addUpdate(willVar, 5 + (5 * crValue));
						attrHandler.addUpdate(dashSpeedVar, 2);
						attrHandler.addUpdate(coldResVar, crValue * 3);
						break;

				}
			});
		},
		updateStats = function (attributeHandler) {
			let formulaDefinitions = [];
			formulaDefinitions = WuxDef.Filter(new DatabaseFilterData("formulaMods", "CR"));
			formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("formulaMods", "Level")));

			for (let i = 0; i < formulaDefinitions.length; i++) {
				attributeHandler.addFormulaMods(formulaDefinitions[i]);
			}

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				for (let i = 0; i < formulaDefinitions.length; i++) {
					if (formulaDefinitions[i].isResource) {
						attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
						attrHandler.addUpdate(formulaDefinitions[i].getVariable(WuxDef._max), formulaDefinitions[i].formula.getValue(attrHandler));
					} else {
						attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
					}
				}
			});
		}

	return {
		GoToPageSet: goToPageSet,
		FinishBuild: finishBuild,
		ExitBuild: exitBuild,
		ConvertXp: convertXp,
		SetLevel: setLevel,
		SetAdvancementPointsUpdate: setAdvancementPointsUpdate,
		SetAdvancementPerkTransferPointsUpdate: setAdvancementPerkTransferPointsUpdate,
		SetAffinityStats: setAffinityStats,
		UpdateStats: updateStats
	};
}());

var WuxWorkerPerks = WuxWorkerPerks || (function () {
	'use strict';

	var
		updateBuildPoints = function (eventinfo, perkCost) {
			Debug.Log("Update Perks");
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxPerkWorkerBuild();
			worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue, perkCost);
			attributeHandler.run();
		},

		refreshStats = function (attributeHandler) {
			Debug.Log("Refresh Perk Stats");
			let worker = new WuxPerkWorkerBuild();
			attributeHandler.addMod([worker.attrBuildDraft, worker.attrMax]);
			attributeHandler.addFormulaMods(worker.definition);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				worker.setBuildStatsDraft(attrHandler);

				worker.cleanBuildStats();
				worker.setPointsMax(attrHandler);
				worker.updatePoints(attrHandler);
				worker.revertBuildStatsDraft(attrHandler);
			});
		},
		updateStats = function (attributeHandler) {
			WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
		}

	return {
		UpdateBuildPoints: updateBuildPoints,
		RefreshStats: refreshStats,
		UpdateStats: updateStats
	};
}());

var WuxWorkerAttributes = WuxWorkerAttributes || (function () {
	'use strict';

	var
		updateBuildPoints = function (eventinfo) {
			Debug.Log("Update Attributes");
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxAttributeWorkerBuild();
			worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			updateStats(attributeHandler);
			WuxWorkerSkills.UpdateStats(attributeHandler);
			attributeHandler.run();
		},

		refreshStats = function (attributeHandler) {
			Debug.Log("Refresh Attribute Stats");
			let worker = new WuxAttributeWorkerBuild();
			attributeHandler.addMod([worker.attrBuildDraft, worker.attrMax]);
			attributeHandler.addFormulaMods(worker.definition);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				worker.setBuildStatsDraft(attrHandler);

				worker.cleanBuildStats();
				worker.setPointsMax(attrHandler);
				worker.updatePoints(attrHandler);
				worker.revertBuildStatsDraft(attrHandler);
			});
		},
		
		updateStats = function (attributeHandler) {
			let attributeDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Attribute"));
			let formulaDefinitions = [];

			for (let i = 0; i < attributeDefinitions.length; i++) {
				formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("formulaMods", attributeDefinitions[i].name)));
			}

			for (let i = 0; i < formulaDefinitions.length; i++) {
				attributeHandler.addFormulaMods(formulaDefinitions[i]);
			}

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				for (let i = 0; i < formulaDefinitions.length; i++) {
					if (formulaDefinitions[i].group == "Skill") {
						continue;
					}
					if (formulaDefinitions[i].isResource) {
						attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
						attrHandler.addUpdate(formulaDefinitions[i].getVariable(WuxDef._max), formulaDefinitions[i].formula.getValue(attrHandler));
					} else {
						attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].formula.getValue(attrHandler));
					}
				}
			});
		}

	return {
		UpdateBuildPoints: updateBuildPoints,
		RefreshStats: refreshStats,
		UpdateStats: updateStats
	};
}());

var WuxWorkerKnowledges = WuxWorkerKnowledges || (function () {
	'use strict';

	var
		updateBuildPoints = function (eventinfo) {
			Debug.Log("Update Knowledge");
			let attributeHandler = new WorkerAttributeHandler();
			let worker = new WuxWorkerBuild("Knowledge");
			worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			updateStats(attributeHandler);
			attributeHandler.run();
		},

		refreshStats = function (attributeHandler) {
			Debug.Log("Refresh Knowledge Stats");
			let worker = new WuxWorkerBuild("Knowledge");
			attributeHandler.addMod([worker.attrBuildDraft, worker.attrMax]);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				worker.setBuildStatsDraft(attrHandler);

				worker.cleanBuildStats();
				worker.setPointsMax(attrHandler);
				worker.updatePoints(attrHandler);
				worker.revertBuildStatsDraft(attrHandler);
			});
		},
		updateStats = function (attributeHandler) {
			let loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));
			let loreDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Lore"));
			let languageDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Language"));

			for (let i = 0; i < loreCategoryDefinitions.length; i++) {
				attributeHandler.addMod(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
			}
			for (let i = 0; i < loreDefinitions.length; i++) {
				attributeHandler.addMod(loreDefinitions[i].getVariable(WuxDef._rank));
			}
			for (let i = 0; i < languageDefinitions.length; i++) {
				attributeHandler.addMod(languageDefinitions[i].getVariable(WuxDef._rank));
			}

			attributeHandler.addMod([WuxDef.GetVariable("CR"), WuxDef.GetVariable("Recall")]);
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				let skillPointValue = 0;
				let skillRank = 0;
				let loreCategories = {};
				for (let i = 0; i < loreCategoryDefinitions.length; i++) {
					loreCategories[loreCategoryDefinitions[i].title] = {};

					skillRank = attrHandler.parseInt(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
					if (skillRank > 0) {
						skillPointValue = skillRank + attrHandler.parseInt(WuxDef.GetVariable("CR")) + attrHandler.parseInt(WuxDef.GetVariable("Recall"));
						loreCategories[loreCategoryDefinitions[i].title]["General"] = skillPointValue;
					}
				}
				for (let i = 0; i < loreDefinitions.length; i++) {
					skillRank = attrHandler.parseInt(loreDefinitions[i].getVariable(WuxDef._rank));
					if (skillRank > 0) {
						skillPointValue = skillRank + attrHandler.parseInt(WuxDef.GetVariable("CR")) + attrHandler.parseInt(WuxDef.GetVariable("Recall"));
						loreCategories[loreDefinitions[i].subGroup][loreDefinitions[i].title] = skillPointValue;
					}
				}
				attrHandler.addUpdate(WuxDef.GetVariable("Lore", WuxDef._true), JSON.stringify(loreCategories));

				let languages = [];
				for (let i = 0; i < languageDefinitions.length; i++) {
					skillRank = attrHandler.parseString(languageDefinitions[i].getVariable(WuxDef._rank));
					if (skillRank == "on") {
						languages.push(languageDefinitions[i].title);
					}
					attrHandler.addUpdate(languageDefinitions[i].getVariable(WuxDef._filter), skillRank == "on" ? "1" : "0");
				}
				attrHandler.addUpdate(WuxDef.GetVariable("Language", WuxDef._true), JSON.stringify(languages));
			});
		}

	return {
		UpdateBuildPoints: updateBuildPoints,
		RefreshStats: refreshStats,
		UpdateStats: updateStats
	};
}());
