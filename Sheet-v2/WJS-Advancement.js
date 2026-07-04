var WuxWorkerCharacterCreation = WuxWorkerCharacterCreation || (function () {
	'use strict';

	var
		finishBuild = function () {
			Debug.Log("Finish Character Creation Build");
			let attributeHandler = new WorkerAttributeHandler();

			let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Attribute", "Technique"]);
			pointManagers.commitChanges(attributeHandler);

			let perkWorker = new WuxPerkWorkerBuild();
			perkWorker.commitChanges(attributeHandler);

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
				crAttributeHandler.addFinishCallback(function () {
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
			let advWorker = new WuxAdvancementWorkerBuild();
			advWorker.updateAdvancementPoints(attributeHandler);
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
			WuxWorkerKnowledges.RefreshStats(attributeHandler);

			attributeHandler.run();
		},
		finishBuild = function () {
			Debug.Log("Finish Advancement Build");
			let loader = new LoadingScreenHandler();
			loader.showLoadingScreen(() => {
				let attributeHandler = new WorkerAttributeHandler();
	
				let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Attribute"]);
				pointManagers.commitChanges(attributeHandler);

				let perkWorker = new WuxPerkWorkerBuild();
				perkWorker.commitChanges(attributeHandler);

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
	
				let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Attribute", "Technique"]);
				pointManagers.resetChanges(attributeHandler);

				let perkWorker = new WuxPerkWorkerBuild();
				perkWorker.resetChanges(attributeHandler);

				let advancementWorker = new WuxAdvancementWorkerBuild();
				advancementWorker.resetChanges(attributeHandler);

				WuxWorkerAttributes.UpdateStats(attributeHandler);
				WuxWorkerPerks.UpdateStats(attributeHandler);
				WuxWorkerSkills.UpdateStats(attributeHandler);
				WuxWorkerJobs.UpdateStats(attributeHandler);
				WuxWorkerStyles.UpdateStats(attributeHandler);
				WuxWorkerActions.UpdateAllFormeActions(attributeHandler);
				updateStats(attributeHandler);
				WuxWorkerPerks.RefreshStats(attributeHandler);
	
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
		setBonusTrainingAdvancementPoints = function () {
			Debug.Log("Setting Bonus Training Advancement Points");
			let attributeHandler = new WorkerAttributeHandler();
			let advWorker = new WuxAdvancementWorkerBuild();
			advWorker.updateAdvancementPoints(attributeHandler);
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
			let rank = parseInt(eventinfo.newValue) || 0;
			let ppCost = WuxDef.Get("PP").formula.getValue();

			let perkWorker = new WuxPerkWorkerBuild();
			perkWorker.changeCostOnly(attributeHandler, eventinfo.sourceAttribute, rank * ppCost);

			let advWorker = new WuxAdvancementWorkerBuild();
			advWorker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
			advWorker.updateAdvancementPoints(attributeHandler);

			attributeHandler.run();
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
					if (formulaDefinitions[i].group === "Type" || formulaDefinitions[i].group === "Perk") {
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
		GoToPageSet: goToPageSet,
		FinishBuild: finishBuild,
		ExitBuild: exitBuild,
		ConvertXp: convertXp,
		SetLevel: setLevel,
		SetBonusTrainingAdvancementPoints: setBonusTrainingAdvancementPoints,
		SetAdvancementPointsUpdate: setAdvancementPointsUpdate,
		SetAdvancementPerkTransferPointsUpdate: setAdvancementPerkTransferPointsUpdate,
		SetAffinityStats: setAffinityStats,
		UpdateStats: updateStats
	};
}());

var WuxWorkerPerks = WuxWorkerPerks || (function () {
	'use strict';

	var
		updateBuildPoints = function (eventinfo) {
			let perk = WuxPerks.GetByVariableName(eventinfo.sourceAttribute);
			if (perk == undefined) {
				Debug.LogError("Tried to update perk, but no perk was found");
				return;
			}
			Debug.Log(`Update Perk ${perk.name}`);
			let crAttributeHandler = new WorkerAttributeHandler();
			crAttributeHandler.addMod(WuxDef.GetVariable("CR", WuxDef._max));

			crAttributeHandler.addGetAttrCallback((crAttrHandler) => {

				let attributeHandler = new WorkerAttributeHandler();
				let worker = new WuxPerkWorkerBuild();

				if (perk.group === "Branch Perks") {
					let isChecked = eventinfo.newValue !== "" && eventinfo.newValue !== "0";
					let cost = isChecked ? perk.cost : 0;
					let advancedAffinityVar = WuxDef.GetVariable("AdvancedAffinity");
					let allAffinityTitles = WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]).map(d => d.getTitle());

					attributeHandler.addMod(worker.attrMax);
					attributeHandler.addMod(worker.attrBuildDraft);
					attributeHandler.addMod(advancedAffinityVar);

					if (perk.name === "Second Affinity") {
						let perkDef = new PerkData(perk).createDefinition(WuxDef.Get("Perk"));
						attributeHandler.addMod(perkDef.getVariable(WuxDef._affinity));
						attributeHandler.addGetAttrCallback(function (attrHandler) {
							let current = (attrHandler.parseString(advancedAffinityVar) || "").split(";").map(s => s.trim()).filter(s => s !== "" && !allAffinityTitles.includes(s));
							if (isChecked) {
								let selectedAffinity = attrHandler.parseString(perkDef.getVariable(WuxDef._affinity));
								if (selectedAffinity && selectedAffinity !== "") {
									current.push(selectedAffinity);
								}
							}
							attrHandler.addUpdate(advancedAffinityVar, current.join(";"));
							worker.setBuildStatsDraft(attrHandler);
							worker.updateBuildStats(attrHandler, eventinfo.sourceAttribute, cost);
							worker.updatePoints(attrHandler);
						});
					} else {
						attributeHandler.addGetAttrCallback(function (attrHandler) {
							if (perk.statVariable && perk.statVariable !== "") {
								let current = (attrHandler.parseString(advancedAffinityVar) || "").split(";").map(s => s.trim()).filter(s => s !== "" && s !== perk.statVariable);
								if (isChecked) {
									current.push(perk.statVariable);
								}
								attrHandler.addUpdate(advancedAffinityVar, current.join(";"));
							}
							worker.setBuildStatsDraft(attrHandler);
							worker.updateBuildStats(attrHandler, eventinfo.sourceAttribute, cost);
							worker.updatePoints(attrHandler);
						});
					}
				} else {
					let rank = parseInt(eventinfo.newValue) || 0;
					let max = perk.maxRank.getValue(crAttrHandler);
					if (rank > max) {
						rank = max;
						attributeHandler.addUpdate(eventinfo.sourceAttribute, max);
					}
					worker.changeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, rank, perk.cost);

					if (perk.statVariable && perk.statVariable !== "") {
						let increaseValue = rank * perk.increase;
						let statDef = WuxDef.Get(perk.statVariable);
						attributeHandler.addUpdate(statDef.getVariable(WuxDef._perk), increaseValue);
					}
				}
				if (perk.group === "Perk Technique") {
					WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
				} else {
					attributeHandler.addFinishCallback(function () {
						let statsHandler = new WorkerAttributeHandler();
						statsHandler.addMod([WuxDef.GetVariable("BoostStyleTech"), WuxDef.GetVariable("BoostGearTech"), WuxDef.GetVariable("BoostPerkTech")]);
						statsHandler.addGetAttrCallback(function (attrHandler) {
							WuxWorkerActionsService.SetTechniqueBoosters(attrHandler);
						});
						statsHandler.run();
					});
				}
				attributeHandler.run();
			});
			crAttributeHandler.run();
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
		},
		updateSecondAffinityBranch = function (eventinfo) {
			let secondAffinityPerk = WuxPerks.Get("Second Affinity");
			if (secondAffinityPerk == undefined) return;
			let perkDef = new PerkData(secondAffinityPerk).createDefinition(WuxDef.Get("Perk"));

			let attributeHandler = new WorkerAttributeHandler();
			let advancedAffinityVar = WuxDef.GetVariable("AdvancedAffinity");
			let allAffinityTitles = WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]).map(d => d.getTitle());

			attributeHandler.addMod(advancedAffinityVar);
			attributeHandler.addMod(perkDef.getVariable());
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				let isChecked = attrHandler.parseString(perkDef.getVariable()) !== "";
				let current = (attrHandler.parseString(advancedAffinityVar) || "").split(";").map(s => s.trim()).filter(s => s !== "" && !allAffinityTitles.includes(s));
				if (isChecked && eventinfo.newValue && eventinfo.newValue !== "") {
					current.push(eventinfo.newValue);
				}
				attrHandler.addUpdate(advancedAffinityVar, current.join(";"));
			});

			WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
			attributeHandler.run();
		},
		setJobSkillPerkPoints = function (eventinfo) {
			let attributeHandler = new WorkerAttributeHandler();
			let perkWorker = new WuxPerkWorkerBuild();
			let rank = parseInt(eventinfo.newValue) || 0;
			let cost = eventinfo.sourceAttribute === WuxDef.GetVariable("AdvancementJob") ? 2 : 1;
			perkWorker.changeCostOnly(attributeHandler, eventinfo.sourceAttribute, rank * cost);

			let manager = new WuxWorkerBuildManager(["Skill", "Job"]);
			manager.setupAttributeHandlerForPointUpdate(attributeHandler);
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				manager.setAttributeHandlerPoints(attrHandler);
			});

			attributeHandler.run();
		},

		inspectListPerk = function (eventinfo) {
			let worker = new WuxPerkWorkerBuild();
			let attributeHandler = new WorkerAttributeHandler();
			attributeHandler.addRepeatingSection("RepeatingPerks");
			let repeater = attributeHandler.getRepeatingSection("RepeatingPerks");
			let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
			let nameFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Name"));
			attributeHandler.addMod([nameFieldName, worker.attrBuildDraft]);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				let selectedPerkName = attrHandler.parseString(nameFieldName);

				worker.setBuildStatsDraft(attrHandler);

				let inventoryItems = [];
				let selectedItem = undefined;

				worker.iterateBuildStats(function (buildStat) {
					let perk = WuxPerks.GetByVariableName(buildStat.name);
					if (perk == undefined) return;
					if (perk.group !== "Perk Technique") return;
					if (buildStat.value == "0" || buildStat.value == 0) return;

					let technique = WuxTechs.Get(perk.name);
					if (technique == undefined) return;

					let iconAffinities = technique.getAffinityParts();
					let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
					for (let variant of variants) {
						let variantParts = variant.getAffinityParts();
						for (let part of variantParts) {
							if (!iconAffinities.includes(part)) iconAffinities.push(part);
						}
					}

					let item = new InspectionInventoryItem(perk.name, perk.name, false, undefined, undefined, iconAffinities);
					if (perk.name === selectedPerkName) {
						selectedItem = item;
					} else {
						inventoryItems.push(item);
					}
				});

				if (selectedItem !== undefined) {
					inventoryItems.unshift(selectedItem);
				}

				let attributeHandler2 = new WorkerAttributeHandler();
				WuxWorkerInspectPopup.OpenPerkTechniqueInspection(attributeHandler2, "Perk Techniques", inventoryItems, ["Add Perk Technique"]);
				attributeHandler2.run();
			});

			attributeHandler.run();
		},

		deleteListPerk = function (eventinfo) {
			let worker = new WuxPerkWorkerBuild();
			let attributeHandler = new WorkerAttributeHandler();
			attributeHandler.addRepeatingSection("RepeatingPerks");
			let repeater = attributeHandler.getRepeatingSection("RepeatingPerks");
			let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
			let nameFieldName = repeater.getFieldName(selectedId, WuxDef.GetVariable("Forme_Name"));
			attributeHandler.addMod([nameFieldName, worker.attrMax, worker.attrBuildDraft]);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				let perkName = attrHandler.parseString(nameFieldName);
				Debug.Log(`Deleting Perk Technique ${perkName}`);

				let perk = WuxPerks.Get(perkName);
				if (perk != undefined) {
					let perkAttr = perk.createDefinition(WuxDef.Get("Perk")).getVariable();
					worker.setBuildStatsDraft(attrHandler);
					worker.removeBuildStat(perkAttr);
					worker.updatePoints(attrHandler);
					worker.revertBuildStatsDraft(attrHandler);
				}
				repeater.removeId(selectedId);
			});
			WuxWorkerActions.UpdateAllActionsFromMenu(attributeHandler);
			attributeHandler.run();
		},

		setIsPlayer = function (eventinfo) {
			Debug.Log("eventinfo.newValue: " + eventinfo.newValue);
			let newValue = parseInt(eventinfo.newValue) || 0;
			if (newValue !== 1) return;
			let perk = WuxPerks.Get("Bonus Vitality");
			Debug.Log("perk is: " + perk.name);
			if (perk == undefined) return;
			let perkVar = new PerkData(perk).createDefinition(WuxDef.Get("Perk")).getVariable();
			let attributeHandler = new WorkerAttributeHandler();
			attributeHandler.addUpdate(perkVar, 1);
			attributeHandler.addFinishCallback(function () {
				updateBuildPoints({ sourceAttribute: perkVar, newValue: "1" });
			});
			attributeHandler.run();
		}

	return {
		UpdateBuildPoints: updateBuildPoints,
		UpdateSecondAffinityBranch: updateSecondAffinityBranch,
		SetJobSkillPerkPoints: setJobSkillPerkPoints,
		RefreshStats: refreshStats,
		UpdateStats: updateStats,
		InspectListPerk: inspectListPerk,
		DeleteListPerk: deleteListPerk,
		SetIsPlayer: setIsPlayer
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
			WuxWorkerActions.TriggerBuilderActionUpdate();
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

	const loreRepeaterIds = [
		"RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
		"RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
	];

	const loreTierVar = WuxDef.GetVariable("Lore_Tier");
	const loreSubTypeVar = WuxDef.GetVariable("Lore_SubType");
	const loreNameVar = WuxDef.GetVariable("Lore_Name");

	var
		addLoreRepeaters = function (attributeHandler) {
			for (let i = 0; i < loreRepeaterIds.length; i++) {
				attributeHandler.addRepeatingSection(loreRepeaterIds[i]);
				let repeater = attributeHandler.getRepeatingSection(loreRepeaterIds[i]);
				repeater.addFieldNames([loreTierVar, loreSubTypeVar, loreNameVar]);
			}
		},

		updateBuildPoints = function (eventinfo) {
			Debug.Log("Update Knowledge");
			let attributeHandler = new WorkerAttributeHandler();
			updateStats(attributeHandler);
			WuxWorkerActions.TriggerBuilderActionUpdate();
			attributeHandler.run();
		},

		refreshStats = function (attributeHandler) {
			Debug.Log("Refresh Knowledge Stats");
			let worker = new WuxWorkerBuild("Knowledge");
			attributeHandler.addMod([worker.attrBuildDraft, worker.attrMax]);

			attributeHandler.addGetAttrCallback(function (attrHandler) {
				worker.setBuildStatsDraft(attrHandler);
				worker.setPointsMax(attrHandler);
				worker.updatePoints(attrHandler);
			});
		},

		updateStats = function (attributeHandler) {
			let loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));
			let languageDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Language"));
			let knowledgeWorker = new WuxWorkerBuild("Knowledge");

			for (let i = 0; i < loreCategoryDefinitions.length; i++) {
				attributeHandler.addMod(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
			}
			for (let i = 0; i < languageDefinitions.length; i++) {
				attributeHandler.addMod(languageDefinitions[i].getVariable(WuxDef._rank));
			}

			addLoreRepeaters(attributeHandler);

			attributeHandler.addMod([WuxDef.GetVariable("CR"), WuxDef.GetVariable("Recall"), knowledgeWorker.attrMax]);
			attributeHandler.addGetAttrCallback(function (attrHandler) {
				let skillPointValue = 0;
				let skillRank = 0;
				let crValue = attrHandler.parseInt(WuxDef.GetVariable("CR"));
				let recallValue = attrHandler.parseInt(WuxDef.GetVariable("Recall"));
				let loreCategories = {};

				for (let i = 0; i < loreCategoryDefinitions.length; i++) {
					loreCategories[loreCategoryDefinitions[i].title] = {};
					let rawRankStr = attrHandler.parseString(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
					if (rawRankStr === "on" || attrHandler.parseInt(loreCategoryDefinitions[i].getVariable(WuxDef._rank)) > 0) {
						loreCategories[loreCategoryDefinitions[i].title]["General"] = 1;
					}
				}

				for (let i = 0; i < loreRepeaterIds.length; i++) {
					let repeater = attrHandler.getRepeatingSection(loreRepeaterIds[i]);
					let categoryName = loreCategoryDefinitions[i].title;
					if (loreCategories[categoryName] === undefined) {
						loreCategories[categoryName] = {};
					}
					repeater.iterate(function (id) {
						let tier = attrHandler.parseInt(repeater.getFieldName(id, loreTierVar));
						if (tier > 0) {
							let subType = attrHandler.parseString(repeater.getFieldName(id, loreSubTypeVar));
							let loreName = subType === "1"
								? attrHandler.parseString(repeater.getFieldName(id, loreNameVar))
								: subType;
							if (loreName !== "" && loreName !== "0") {
								skillPointValue = tier + crValue + recallValue;
								loreCategories[categoryName][loreName] = skillPointValue;
							}
						}
					});
				}

				attrHandler.addUpdate(WuxDef.GetVariable("Lore", WuxDef._true), JSON.stringify(loreCategories));

				let allLoreDefs = WuxDef.Filter(new DatabaseFilterData("group", "Lore"));
				for (let loreDef of allLoreDefs) {
					attrHandler.addUpdate(loreDef.getVariable("_display"), "0");
				}
				for (let i = 0; i < loreCategoryDefinitions.length; i++) {
					let categoryLores = loreCategories[loreCategoryDefinitions[i].title] || {};
					let hasAnyLore = Object.keys(categoryLores).length > 0;
					attrHandler.addUpdate(loreCategoryDefinitions[i].getVariable("_display"), hasAnyLore ? "1" : "0");
					let customCount = 0;
					for (let [loreName, skillValue] of Object.entries(categoryLores)) {
						if (loreName === "General") continue;
						let loreDef = WuxDef.Get(loreName);
						if (loreDef) {
							let rawTier = skillValue - crValue - recallValue;
							attrHandler.addUpdate(loreDef.getVariable("_display"), rawTier.toString());
						} else {
							customCount++;
						}
					}
					attrHandler.addUpdate(loreCategoryDefinitions[i].getVariable("_custom"), customCount.toString());
				}

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

				knowledgeWorker.buildStats = new WorkerBuildStats();
				for (let i = 0; i < languageDefinitions.length; i++) {
					let langRank = attrHandler.parseString(languageDefinitions[i].getVariable(WuxDef._rank));
					if (langRank === "on") {
						let rankAttr = languageDefinitions[i].getVariable(WuxDef._rank);
						knowledgeWorker.buildStats.add(rankAttr, new WorkerBuildStat([rankAttr, "on"]));
					}
				}
				for (let i = 0; i < loreCategoryDefinitions.length; i++) {
					let rawRank = attrHandler.parseString(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
					if (rawRank === "on" || attrHandler.parseInt(loreCategoryDefinitions[i].getVariable(WuxDef._rank)) > 0) {
						let rankAttr = loreCategoryDefinitions[i].getVariable(WuxDef._rank);
						knowledgeWorker.buildStats.add(rankAttr, new WorkerBuildStat([rankAttr, "on"]));
					}
				}
				for (let i = 0; i < loreRepeaterIds.length; i++) {
					let repeater = attrHandler.getRepeatingSection(loreRepeaterIds[i]);
					repeater.iterate(function (id) {
						let tier = attrHandler.parseInt(repeater.getFieldName(id, loreTierVar));
						if (tier > 0) {
							let tierAttr = repeater.getFieldName(id, loreTierVar);
							knowledgeWorker.buildStats.add(tierAttr, new WorkerBuildStat([tierAttr, tier.toString()]));
						}
					});
				}
				attrHandler.addUpdate(knowledgeWorker.attrBuildDraft, JSON.stringify(knowledgeWorker.buildStats));
				knowledgeWorker.updatePoints(attrHandler);

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
		},

		setLoreDescription = function (eventinfo) {
			let subType = eventinfo.newValue;
			let descAttr = eventinfo.sourceAttribute.replace(loreSubTypeVar, WuxDef.GetVariable("Lore_Description"));
			if (subType === "0" || subType === "") {
				return;
			}
			if (subType === "1") {
				let attributeHandler = new WorkerAttributeHandler();
				attributeHandler.addUpdate(descAttr, "");
				attributeHandler.run();
				return;
			}
			let loreDef = WuxDef.Get("Lore_" + subType);
			if (loreDef == undefined) {
				return;
			}
			let description = loreDef.getDescription("");
			let attributeHandler = new WorkerAttributeHandler();
			attributeHandler.addUpdate(descAttr, description);
			attributeHandler.run();
		}

	return {
		UpdateBuildPoints: updateBuildPoints,
		RefreshStats: refreshStats,
		UpdateStats: updateStats,
		SetLoreDescription: setLoreDescription
	};
}());
