// ======== Techniques - Tech Slots

function GetTechSlotTechniquesFieldList() {
	return ["character-techslots-job", "character-techslots-active", "character-techslots-passive", "character-techslots-support",
		"techslotbonus-job", "techslotbonus-active", "techslotbonus-passive", "techslotbonus-support"];
}

on("change:techslotbonus-job change:techslotbonus-active change:techslotbonus-passive change:techslotbonus-support", function (eventinfo) {

	UpdateCharacterTechSlotCounts(GetFieldNameAttribute(eventinfo.sourceAttribute));
});

function UpdateCharacterTechSlotCounts(slotType) {

	let mod_attrs = ["base_level", `character-techslots-${slotType}`, `techslotbonus-${slotType}`];

	getAttrs(mod_attrs, function (v) {
		let update = {};
		update = SetCharacterTechSlotCounts(update, v, AttrParseInt(v, "base_level"), [slotType]);
		setAttrs(update, { silent: true });
	});
}

function SetCharacterTechSlotCounts(update, attrArray, totalLevel, slotTypes) {

	let defaultStats = GetStatisticsDefaults();
	let countMax = 0;
	let slotType = {};

	for (let i = 0; i < slotTypes.length; i++) {

		// determine the max count
		slotType = slotTypes[i];
		countMax = 0;
		switch (slotType) {
			case "job":
				countMax = defaultStats.techSlotJob;
				if (totalLevel >= 21) {
					countMax += 1;
				}
				break;
			case "active":
				countMax = defaultStats.techSlotActive;
				if (totalLevel >= 31) {
					countMax += 3;
				}
				else if (totalLevel >= 21) {
					countMax += 2;
				}
				else if (totalLevel >= 6) {
					countMax += 1;
				}
				break;
			case "passive":
				countMax = defaultStats.techSlotPassive;
				if (totalLevel >= 36) {
					countMax += 3;
				}
				else if (totalLevel >= 26) {
					countMax += 2;
				}
				else if (totalLevel >= 11) {
					countMax += 1;
				}
				break;
			case "support":
				countMax = defaultStats.techSlotSupport;
				if (totalLevel >= 36) {
					countMax += 3;
				}
				else if (totalLevel >= 26) {
					countMax += 2;
				}
				else if (totalLevel >= 11) {
					countMax += 1;
				}
				break;
		}

		if (countMax != 0) {
			let count = AttrParseString(attrArray, `character-techslots-${slotType}`);
			if (count != "") {
				count = count.split(";").length;
			}
			else {
				count = 0;
			}
			update[`techslot-${slotType}`] = countMax - count;
			update[`techslot-${slotType}_max`] = countMax;
		}
	}
	return update;
}




// ======== Techniques - Database Techniques

on("change:character-button-techniquesrefresh", function () {

	UpdateLearnedTechniques();
});

function UpdateLearnedTechniques() {

	let mod_attrs = ["techniques-jobTech", "techniques-learnedTech"];

	let repeatingSection = "repeating_learnedtechniques";

	getSectionIDs(repeatingSection, function (idArray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idArray, repeatingSection, ["technique-name", "technique-isDatabase"]));
		getAttrs(mod_attrs, function (v) {
			let activeLearnedTech = [];
			activeLearnedTech = SetCurrentDatabaseTech(activeLearnedTech, v, repeatingSection, idArray);

			let newTechniques = [];
			let technique = {};

			let jobTech = AttrParseString(v, "techniques-jobTech");
			jobTech = jobTech.split(";");
			for (let i = 0; i < jobTech.length; i++) {
				if (!activeLearnedTech.includes(jobTech[i].trim())) {
					technique = WuxingTechniques.Get(jobTech[i]);
					technique = SetTechniqueDataAugmentTechData(technique);
					newTechniques.push(technique);
				}
			}

			let learnedTech = AttrParseJSONDictionary(v, "techniques-learnedTech");
			for (let i = 0; i < learnedTech.keys.length; i++) {
				if (!activeLearnedTech.includes(learnedTech.keys[i])) {
					technique = WuxingTechniques.Get(learnedTech.keys[i]);
					technique = SetTechniqueDataAugmentTechData(technique);
					newTechniques.push(technique);
				}
			}

			let update = {};
			update = SetTechniqueDataList(update, repeatingSection, newTechniques, false, true);
			setAttrs(update, { silent: true });

		});
	});
}

function SetCurrentDatabaseTech(activeLearnedTech, attrArray, repeatingSection, idArray) {
	for (let i = 0; i < idArray.length; i++) {
		if (AttrParseString(attrArray, GetSectionIdName(repeatingSection, idArray[i], "technique-isDatabase")) == "1") {
			activeLearnedTech.push(AttrParseString(attrArray, GetSectionIdName(repeatingSection, idArray[i], "technique-name")));
		}
	}
	return activeLearnedTech;
}




// ======== Techniques - Select Technique

on("change:repeating_learnedtechniques:technique-select", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateCharacterTechniqueSelect();
});

function UpdateCharacterTechniqueSelect() {

	let repeatingLearned = "repeating_learnedtechniques";
	let repeatingQuick = "repeating_quicklearnedtechniques";
	let repeatingFull = "repeating_fulllearnedtechniques";
	let repeatingReaction = "repeating_reactionlearnedtechniques";
	let repeatingSwift = "repeating_swiftlearnedtechniques";
	let repeatingFree = "repeating_freelearnedtechniques";

	let mod_attrs = ["techslot-job_max", "techslot-active_max", "techslot-passive_max", "techslot-support_max"];
	getSectionIDs(repeatingLearned, function (learnedArray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(learnedArray, repeatingLearned,
			["technique-name", "technique-isDatabase", "technique-type", "technique-action", "technique-augment", "technique-select"
				// add all tech data
			]));
		getSectionIDs(repeatingFull, function (fullArray) {
			mod_attrs = mod_attrs.concat(GetSectionIdValues(fullArray, repeatingFull, ["technique-name"]));
			getSectionIDs(repeatingQuick, function (quickArray) {
				mod_attrs = mod_attrs.concat(GetSectionIdValues(quickArray, repeatingQuick, ["technique-name"]));
				getSectionIDs(repeatingReaction, function (reactionArray) {
					mod_attrs = mod_attrs.concat(GetSectionIdValues(reactionArray, repeatingReaction, ["technique-name"]));
					getSectionIDs(repeatingSwift, function (swiftArray) {
						mod_attrs = mod_attrs.concat(GetSectionIdValues(swiftArray, repeatingSwift, ["technique-name"]));
						getSectionIDs(repeatingFree, function (freeArray) {
							mod_attrs = mod_attrs.concat(GetSectionIdValues(freeArray, repeatingFree, ["technique-name"]));

							getAttrs(mod_attrs, function (v) {
								let selectedBaseActions = [];
								let customTechniquesList = new Dictionary();
								let actions = {
									full: CreateLearnedTechniquesDataObj(v, repeatingFull, fullArray),
									quick: CreateLearnedTechniquesDataObj(v, repeatingQuick, quickArray),
									reaction: CreateLearnedTechniquesDataObj(v, repeatingReaction, reactionArray),
									swift: CreateLearnedTechniquesDataObj(v, repeatingSwift, swiftArray),
									free: CreateLearnedTechniquesDataObj(v, repeatingFree, freeArray)
								}
								let slots = {
									job: AttrParseInt(v, "techslot-job_max"),
									active: AttrParseInt(v, "techslot-active_max"),
									passive: AttrParseInt(v, "techslot-passive_max"),
									support: AttrParseInt(v, "techslot-support_max")
								}
								let techName = "";

								// iterate through every learned technique and find the ones that are selected
								for (let i = 0; i < learnedArray.length; i++) {
									if (AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-select"), "0") != "0") {
										switch (AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-type"))) {
											case "Job": slots.job--; break;
											case "Active": slots.active--; break;
											case "Passive": slots.passive--; break;
											case "Support": slots.support--; break;
										}
										switch (AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-action"))) {
											case "Full":
												actions.full.addBaseTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Quick":
												actions.quick.addBaseTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Reaction":
												actions.reaction.addBaseTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Swift":
												actions.swift.addBaseTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Free":
												actions.free.addBaseTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
										}
										selectedBaseActions.push(AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")));
									}
									if (AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"), "0") != "1") {
										techName = AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name"));
										customTechniquesList.keys.push(techName);
										customTechniquesList.values[techName] = {
											name: techName,
											id: learnedArray[i]
										}
									}
								}

								// iterate through all of the learned techniques and find augments for the selected techniques
								for (let i = 0; i < learnedArray.length; i++) {
									if (selectedBaseActions.includes(AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-augment")))) {

										switch (AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-action"))) {
											case "Full":
												actions.full.addAugmentTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-augment")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Quick":
												actions.quick.addAugmentTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-augment")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Reaction":
												actions.reaction.addAugmentTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-augment")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Swift":
												actions.swift.addAugmentTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-augment")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
											case "Free":
												actions.free.addAugmentTech(
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-name")),
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-augment")),
													learnedArray[i],
													AttrParseString(v, GetSectionIdName(repeatingLearned, learnedArray[i], "technique-isDatabase"))
												);
												break;
										}
									}
								}

								SetCharacterTechniqueSelect(v, actions, slots, customTechniquesList, fullArray, quickArray, reactionArray, swiftArray, freeArray);
							});
						});
					});
				});
			});
		});
	});
}

function CreateLearnedTechniquesDataObj(attrArray, repeatingSection, idArray) {

	let output = {
		current: [],
		found: [],
		new: new Dictionary(),
		newCustom: new Dictionary(),

		addBaseTech: function (techName, techId, isDatabase) {
			if (this.current.includes(techName)) {
				this.found.push(techName);
			}
			else if (isDatabase == "1") {
				this.new.keys.push(techName);
				this.new.values[techName] = {
					name: techName,
					id: techId,
					isAugment: false,
					auguments: new Dictionary(),
					customAugments: new Dictionary()
				};
			}
			else {
				this.newCustom.keys.push(techName);
				this.newCustom.values[techName] = {
					name: techName,
					id: techId,
					isAugment: false,
					customAugments: new Dictionary()
				};
				return true;
			}
			return false;
		},

		addAugmentTech: function (techName, baseName, techId, isDatabase) {

			if (this.new.keys.includes(baseName)) {
				if (this.current.includes(techName)) {
					this.found.push(techName);
				}
				else if (isDatabase == "1") {
					this.new.values[baseName].auguments.keys.push(techName);
					this.new.values[baseName].auguments.values[techName] = {
						name: techName,
						id: techId
					};
				}
				else {
					this.new.values[baseName].customAugments.keys.push(techName);
					this.new.values[baseName].customAugments.values[techName] = {
						name: techName,
						id: techId
					};
					return true;
				}
			}
			else if (this.newCustom.keys.includes(baseName)) {
				if (this.current.includes(techName)) {
					this.found.push(techName);
				}
				else {
					this.newCustom.values[baseName].customAugments.keys.push(techName);
					this.newCustom.values[baseName].customAugments.values[techName] = {
						name: techName,
						id: techId
					};
					return true;
				}
			}
			else {
				if (this.current.includes(techName)) {
					this.found.push(techName);
				}
				else if (isDatabase == "1") {
					this.new.keys.push(techName);
					this.new.values[techName] = {
						name: techName,
						id: techId,
						isAugment: true
					};
				}
				else {
					this.newCustom.keys.push(techName);
					this.newCustom.values[techName] = {
						name: techName,
						id: techId,
						isAugment: true
					};
					return true;
				}
			}
			return false;
		}
	}

	for (let i = 0; i < idArray.length; i++) {
		output.current.push(attrArray[GetSectionIdName(repeatingSection, idArray[i], "technique-name")]);
	}

	return output;
}

function SetCharacterTechniqueSelect(attrArray, actions, slots, customTechniquesList, fullArray, quickArray, reactionArray, swiftArray, freeArray) {

	let repeatingQuick = "repeating_quicklearnedtechniques";
	let repeatingFull = "repeating_fulllearnedtechniques";
	let repeatingReaction = "repeating_reactionlearnedtechniques";
	let repeatingSwift = "repeating_swiftlearnedtechniques";
	let repeatingFree = "repeating_freelearnedtechniques";

	let update = {};
	update["techslot-job"] = slots.job;
	update["techslot-active"] = slots.active;
	update["techslot-passive"] = slots.passive;
	update["techslot-support"] = slots.support;

	update = SetCharacterActionsNewLearnedTechniques(update, attrArray, actions.full, repeatingFull, customTechniquesList);
	RemoveCharacterActionsLearnedTechniques(actions.full, fullArray, repeatingFull);
	update = SetCharacterActionsNewLearnedTechniques(update, attrArray, actions.quick, repeatingQuick, customTechniquesList);
	RemoveCharacterActionsLearnedTechniques(actions.full, quickArray, repeatingQuick);
	update = SetCharacterActionsNewLearnedTechniques(update, attrArray, actions.reaction, repeatingReaction, customTechniquesList);
	RemoveCharacterActionsLearnedTechniques(actions.full, reactionArray, repeatingReaction);
	update = SetCharacterActionsNewLearnedTechniques(update, attrArray, actions.swift, repeatingSwift, customTechniquesList);
	RemoveCharacterActionsLearnedTechniques(actions.full, swiftArray, repeatingSwift);
	update = SetCharacterActionsNewLearnedTechniques(update, attrArray, actions.free, repeatingFree, customTechniquesList);
	RemoveCharacterActionsLearnedTechniques(actions.full, freeArray, repeatingFree);

	setAttrs(update, { silent: true });
}

function SetCharacterActionsNewLearnedTechniques(update, attrArray, dataObj, repeatingSection, customTechniquesList) {

	let repeatingLearned = "repeating_learnedtechniques";
	let techName = "";
	let augName = "";
	let newTechniques = [];
	let technique = {};
	let baseCustomTechnique = {};

	for (let i = 0; i < dataObj.new.keys.length; i++) {
		techName = dataObj.new.keys[i];
		technique = WuxingTechniques.Get(techName);
		technique = SetTechniqueDataAugmentTechData(technique);
		newTechniques.push(technique);
		if (!dataObj.new.values[techName].isAugment) {
			for (let j = 0; j < dataObj.new.values[techName].auguments.keys.length; j++) {
				augName = dataObj.new.values[techName].auguments.keys[j];
				technique = WuxingTechniques.Get(augName);
				technique = SetTechniqueDataAugmentTechData(technique);
				newTechniques.push(technique);
			}
			for (let j = 0; j < dataObj.new.values[techName].customAugments.keys.length; j++) {
				// create the augment data
				augName = dataObj.new.values[techName].customAugments.keys[j];
				technique = CreateTechniqueDataFromRepeatingSection(attrArray, repeatingLearned, dataObj.new.values[techName].customAugments.values[augName].id);
				technique = SetTechniqueDataAugmentTechData(technique);
				newTechniques.push(technique);
			}
		}
	}

	// do the same for custom actions
	for (let i = 0; i < dataObj.newCustom.keys.length; i++) {
		techName = dataObj.newCustom.keys[i];
		technique = CreateTechniqueDataFromRepeatingSection(attrArray, repeatingLearned, dataObj.newCustom.values[techName].id);
		if (customTechniquesList.keys.includes(technique.augment)) {
			baseCustomTechnique = CreateTechniqueDataFromRepeatingSection(attrArray, repeatingLearned, customTechniquesList.values[technique.augment].id);
			technique = SetTechniqueDataAugmentTechData(technique, baseCustomTechnique);
		}
		newTechniques.push(technique);
		if (!dataObj.new.values[techName].isAugment) {
			for (let j = 0; j < dataObj.newCustom.values[techName].customAugments.keys.length; j++) {
				// create the augment data
				augName = dataObj.newCustom.values[techName].customAugments.keys[j];
				technique = CreateTechniqueDataFromRepeatingSection(attrArray, repeatingLearned, dataObj.newCustom.values[techName].customAugments.values[augName].id);
				if (customTechniquesList.keys.includes(technique.augment)) {
					baseCustomTechnique = CreateTechniqueDataFromRepeatingSection(attrArray, repeatingLearned, customTechniquesList.values[technique.augment].id);
					technique = SetTechniqueDataAugmentTechData(technique, baseCustomTechnique);
				}
				newTechniques.push(technique);
			}
		}
	}

	update = SetTechniqueDataList(update, repeatingSection, newTechniques, false, true);
	return update;
}

function RemoveCharacterActionsLearnedTechniques(dataObj, idArray, repeatingSection) {

	for (let i = 0; i < dataObj.current.length; i++) {
		if (!dataObj.found.includes(dataObj.current[i])) {
			RemoveSectionId(repeatingSection, idArray[i]);
		}
	}
}




// ======== Techniques - Custom Techniques

on("change:repeating_learnedtechniques:technique-edit", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateDefaultActiveCheckbox(eventinfo);
});




// ======== Techniques - Custom Techniques Header
on("change:repeating_learnedtechniques:technique-isBase", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateDefaultActiveCheckbox(eventinfo);
	UpdateCharacterCustomTechniqueHeaderTypeFromBase(eventinfo, eventinfo.newValue);
});

function UpdateCharacterCustomTechniqueHeaderTypeFromBase(eventinfo, newValue) {

	if (newValue != "0") {
		let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
		let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);

		let mod_attrs = [GetSectionIdName(repeatingSection, id, "technique-action")];
		getAttrs(mod_attrs, function (v) {

			UpdateCharacterCustomTechniqueHeaderType(eventinfo, v[GetSectionIdName(repeatingSection, id, "technique-action")]);
		});
	}
	else {
		UpdateCharacterCustomTechniqueHeaderType(eventinfo, "Augment");
	}
}

on("change:repeating_learnedtechniques:technique-action", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateDefaultActiveCheckbox(eventinfo);
	UpdateCharacterCustomTechniqueHeaderType(eventinfo, eventinfo.newValue);
});

function UpdateCharacterCustomTechniqueHeaderType(eventinfo, newValue) {

	let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);

	let update = {};
	update[GetSectionIdName(repeatingSection, id, "technique-header")] = newValue;
	setAttrs(update, { silent: true });
}





// ======== Techniques - Custom Techniques Function Block
on("change:repeating_learnedtechniques:technique-trigger change:repeating_learnedtechniques:technique-requirement change:repeating_learnedtechniques:technique-resourceCost", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateCharacterCustomTechniqueFunctionBlockDisplayState(eventinfo, eventinfo.newValue);
});

on("change:repeating_learnedtechniques:technique-traits", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateCharacterCustomTechniqueFunctionBlockDisplayState(eventinfo);
	UpdateCharacterCustomTechniqueTraits(eventinfo);
});

function UpdateCharacterCustomTechniqueFunctionBlockDisplayState(eventinfo) {

	if (eventinfo.newValue == "") {
		let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
		let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);
		let mod_attrs = GetSectionIdNameFromArray(repeatingSection, id, ["technique-traits", "technique-trigger", "technique-requirement", "technique-resourceCost"]);
		getAttrs(mod_attrs, function (v) {

			let newValue = "0";
			if (v[GetSectionIdName(repeatingSection, id, "technique-traits")] != ""
				|| v[GetSectionIdName(repeatingSection, id, "technique-trigger")] != ""
				|| v[GetSectionIdName(repeatingSection, id, "technique-requirement")] != ""
				|| v[GetSectionIdName(repeatingSection, id, "technique-resourceCost")] != "") {

				newValue = "1";
			}
			UpdateCharacterCustomTechniqueFunctionBlockDisplay(eventinfo, newValue);
		});
	}
	else {
		UpdateCharacterCustomTechniqueFunctionBlockDisplay(eventinfo, "1");
	}
}

function UpdateCharacterCustomTechniqueFunctionBlockDisplay(eventinfo, newValue) {

	let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);

	let update = {};
	update[GetSectionIdName(repeatingSection, id, "technique-functionBlock")] = newValue;
	setAttrs(update, { silent: true });
}

function UpdateCharacterCustomTechniqueTraits(eventinfo) {
	let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);

	let update = {};
	update = SetTechniqueDataTraits(update, repeatingSection, id, eventinfo.newValue);
	setAttrs(update, { silent: true });

}




// ======== Techniques - Custom Techniques Attack Block

on("change:repeating_learnedtechniques:technique-range change:repeating_learnedtechniques:technique-target change:repeating_learnedtechniques:technique-skill change:repeating_learnedtechniques:technique-defense change:repeating_learnedtechniques:technique-dieValue change:repeating_learnedtechniques:technique-dieType change:repeating_learnedtechniques:technique-addPower change:repeating_learnedtechniques:technique-damageType change:repeating_learnedtechniques:technique-element", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateCharacterCustomTechniqueFunctionBlockDisplayState(eventinfo);
});

function UpdateCharacterCustomTechniqueFunctionBlockDisplayState(eventinfo) {

	let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);
	let mod_attrs = GetSectionIdNameFromArray(repeatingSection, id, ["technique-range", "technique-target", "technique-skill", "technique-defense", "technique-dieValue", "technique-dieType", "technique-addPower", "technique-damageType", "technique-element"]);
	getAttrs(mod_attrs, function (v) {
		let update = {};

		let checkBlockTarget = "0";
		if (v[GetSectionIdName(repeatingSection, id, "technique-range")] != ""
			|| v[GetSectionIdName(repeatingSection, id, "technique-target")] != ""
		) {
			checkBlockTarget = "1";
		}
		let checkBlockSkill = "0";
		if (v[GetSectionIdName(repeatingSection, id, "technique-skill")] != ""
			|| v[GetSectionIdName(repeatingSection, id, "technique-defense")] != ""
		) {
			checkBlockSkill = "1";
		}
		let checkBlockDamage = "0";
		let dieValue = AttrParseInt(v, GetSectionIdName(repeatingSection, id, "technique-dieValue"));
		let powerOn = AttrParseString(v, GetSectionIdName(repeatingSection, id, "technique-addPower")) != "0" ? true : false;
		let dieType = AttrParseString(v, GetSectionIdName(repeatingSection, id, "technique-dieType"));
		if (dieValue > 0 || powerOn || dieType != "") {
			checkBlockDamage = "1";

			let damageString = "";
			let trueDamage = "";
			if (dieValue > 0) {
				damageString = `${dieValue}${dieType}`;
				trueDamage = `${dieValue}${dieType == "d6" ? "d" : "h"}`;
			}
			if (powerOn) {
				damageString += "+ P";
				trueDamage += ";Power";
			}

			damageString += ` ${v[GetSectionIdName(repeatingSection, id, "technique-damageType")]}`;
			let element = v[GetSectionIdName(repeatingSection, id, "technique-element")];
			if (element != "") {
				damageString += ` [${technique.element}]`;
			}
			update[GetSectionIdName(repeatingSection, id, "technique-damage")] = trueDamage;
			update[GetSectionIdName(repeatingSection, id, "technique-damageString")] = damageString;
		}

		update[GetSectionIdName(repeatingSection, id, "technique-checkBlockTarget")] = checkBlockTarget;
		update[GetSectionIdName(repeatingSection, id, "technique-checkBlockSkill")] = checkBlockSkill;
		update[GetSectionIdName(repeatingSection, id, "technique-checkBlockDamage")] = checkBlockDamage;

		if (checkBlockTarget == "1" || checkBlockSkill == "1" || checkBlockDamage == "1") {
			update[GetSectionIdName(repeatingSection, id, "technique-checkBlock")] = "1";
		}
		else {
			update[GetSectionIdName(repeatingSection, id, "technique-checkBlock")] = "0";
		}
		setAttrs(update, { silent: true });
	});
}




// ======== Techniques - Custom Techniques Description Block

on("change:repeating_learnedtechniques:technique-description change:repeating_learnedtechniques:technique-onSuccess", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateCharacterCustomTechniqueDescription(eventinfo);
});

function UpdateCharacterCustomTechniqueDescription(eventinfo) {

	let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);
	let mod_attrs = GetSectionIdNameFromArray(repeatingSection, id, ["technique-description", "technique-onSuccess"]);
	getAttrs(mod_attrs, function (v) {

		let update = {};
		let newValue = "0";
		if (v[GetSectionIdName(repeatingSection, id, "technique-description")] != ""
			|| v[GetSectionIdName(repeatingSection, id, "technique-onSuccess")] != "") {

			newValue = "1";
		}
		update[GetSectionIdName(repeatingSection, id, "technique-descriptionBlock")] = newValue;
		setAttrs(update, { silent: true });
	});
}




// ======== Gear - Prefabs

on("change:repeating_gearequipment:item-prefab", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateCharacterGearPrefab(eventinfo);
});

function UpdateCharacterGearPrefab(eventinfo) {

	let repeatingSection = GetRepeatingSectionFromFieldName(eventinfo.sourceAttribute);
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);
	let itemData = {};

	switch(repeatingSection) {
		case "repeating_gearequipment":
			itemData = GetEquipmentInfo(eventinfo.newValue == undefined ? "" : eventinfo.newValue);
		break;
	}

	if (itemData != {}) {
		let update = {};
		update = SetItemData(update, repeatingSection, id, itemData, false);
		setAttrs(update, { silent: true });
	}
}




// ======== Gear - Equipment

on("change:repeating_gearequipment:item-equipState", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateCharacterGearEquipItem(eventinfo);
});

function UpdateCharacterGearEquipItem(eventinfo) {

	let repeatingSection = "repeating_gearequipment";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);
	let abilityScoreArray = GetAbilityScoreList(true);
	let mod_attrs = ["pb", "statbonus_block", "statbonus_armor", "statbonus_reflexPen", "statbonus_speedPen", 
		"statbonus_reflex", "skills-baseSkills", "skills-baseChoiceSkills", "skills-baseExtraSkills", 
		"statbonus_speed", "builder-ancestry"
	];
	mod_attrs = mod_attrs.concat(abilityScoreArray);

	getSectionIDs(repeatingSection, function (idArray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idArray, repeatingSection, ["item-name", "item-traits", "item-abilities", "item-equipState",
			"item-skill", "item-dieValue", "item-dieType", "item-addPower", "item-damageType", "item-range", "item-threat", "item-block", "item-armor", "item-reflexPen", "item-speedPen"
		]));
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idArray, repeatingSection, ["item-equipState"]));
		getAttrs(mod_attrs, function (v) {

			let update = {};
			let ancestryData = GetAncestryInfo(AttrParseString(v, "builder-ancestry", "Human"));
			let coreData = SetCoreDataFieldArray(v, "");

			let armorBonuses = {
				block: 0, 
				armor: 0,
				reflexPen: 0,
				speedPen: 0
			}

			let newEquippedItemState = eventinfo.newValue;
			let equipState = "";
			let itemData = {};
			for (let i = 0; i < idArray.length; i++) {
				equipState = AttrParseString(v, GetSectionIdName(repeatingSection, idArray[i], "item-equipState"));
				if (equipState != "") {
					if (equipState == newEquippedItemState && idArray[i] != id) {
						update[GetSectionIdName(repeatingSection, idArray[i], "item-equipState")] = "";
					}
					else {
						itemData = CreateEquipmentItemDataFromRepeatingSection(v, repeatingSection, idArray[i]);
						switch(equipState) {
							case "Main":
								update = SetCharacterEquippedWeapon(update, itemData, "equipment-main");
							break;
							case "Sub":
								update = SetCharacterEquippedWeapon(update, itemData, "equipment-sub");
							break;
							case "Support":
								update = SetCharacterEquippedWeapon(update, itemData, "equipment-support");
							break;
							case "Chest":
							case "Head":
							case "Arms":
							case "Legs":
								armorBonuses.block += itemData.block;
								armorBonuses.armor += itemData.armor;
								armorBonuses.reflexPen += itemData.reflexPen;
								armorBonuses.speedPen += itemData.speedPen;
							break;
						}
					}
				}
				else if (idArray[i] == id) {
					switch(eventinfo.previousValue) {
						case "Main":
							update["equipment-main"] = "";
						break;
						case "Sub":
							update["equipment-sub"] = "";
						break;
						case "Support":
							update["equipment-support"] = "";
						break;
					}
				}
			}
			update["statscore_block"] = armorBonuses.block;
			update["block"] = armorBonuses.block + AttrParseInt(v, "statbonus_block");
			update["armor"] = armorBonuses.armor + AttrParseInt(v, "statbonus_armor");

			update["reflexPen"] = armorBonuses.reflexPen + AttrParseInt(v, "statbonus_reflexPen");
			v["reflexPen"] = update["reflexPen"];
			update = SetCharacterSkillsUpdateData(update, v, ["reflex"], coreData);

			update["speedPen"] = armorBonuses.speedPen + AttrParseInt(v, "statbonus_speedPen");
			v["speedPen"] = update["speedPen"];
			update = SetCharacterSpeed(update, v, ancestryData);

			setAttrs(update, { silent: true });

		});
	});
}

function SetCharacterEquippedWeapon(update, itemData, gearSlot) {

	let weaponData = ConvertEquipmentDataToWeaponData(itemData);
	update[gearSlot] = JSON.stringify(weaponData);
	return update;
}




// ======== Statistics - Growths

function GetStatGrowthBonusList() {
	let growthArray = GetGrowthList(true);
	let output = ["statbonus_branchpoints", "statbonus_ki"];
	return output.concat(GetSectionIdNameFromArray(`statbonus_`, "", growthArray));
}

on("change:statbonus_CON change:statbonus_DEX change:statbonus_QCK change:statbonus_STR change:statbonus_CHA change:statbonus_INT change:statbonus_PER change:statbonus_WIL change:statbonus_hp change:statbonus_vitality change:statbonus_kiCharge change:statbonus_spellForce change:statbonus_branchpoints change:statbonus_ki", function () {

	UpdateCharacterStatGrowths();
});

function UpdateCharacterStatGrowths() {

	let mod_attrs = ["pb", "builder-ancestry", "base_level", "character-baseGrowthStats"];
	mod_attrs = mod_attrs.concat(GetGrowthList(true));
	mod_attrs = mod_attrs.concat(GetDerivedBonusStatsList());
	mod_attrs = mod_attrs.concat(GetSkillTrainingFieldList());
	mod_attrs = mod_attrs.concat(GetBonusSkillsList());
	mod_attrs = mod_attrs.concat(GetStatGrowthBonusList());
	mod_attrs = mod_attrs.concat(GetBranchesTrainingList());

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		let startingStatistics = AttrParseJSON(v, "character-baseGrowthStats");
		let bonusGrowths = SetBonusGrowthFieldArray(v);

		update = SetCharacterStatGrowths(update, startingStatistics, bonusGrowths, ancestryData, GetGrowthList(true), v);
		v = SetAbilityScoreUpdate(v, "statscore_", update);
		v = SetAbilityScoreUpdate(v, "", update);
		coreData = SetAbilityScoreUpdate(v, "", update);
		update = SetDerivedStats(update, v, ancestryData, GetGrowthList(true));
		update = SetCharacterSkillsUpdateData(update, v, GetAllSkillsList(true), coreData);

		setAttrs(update, { silent: true });
	});

}

function SetCharacterStatGrowths(update, currentGrowths, bonusGrowths, ancestryData, growthList, attrArray) {

	update["character-baseGrowthStats"] = JSON.stringify(currentGrowths);

	let growths = GetCharacterStatGrowths(currentGrowths, bonusGrowths, ancestryData);
	update["ki_max"] = growths.scores["ki_max"];
	update["branchpoints_max"] = growths.scores["branchpoints"];
	update["branchpoints"] = growths.scores["branchpoints"] - GetBranchPointsTotal(attrArray);

	// iterate over the scores and update them
	let abilityScoresList = GetAbilityScoreList(true);
	let name = "";
	for (let i = 0; i < growthList.length; i++) {
		name = growthList[i];

		update[`statscore_${name}`] = `${growths.scores[name]}.${(growths.modulus[name] < 10) ? `0${growths.modulus[name]}` : growths.modulus[name]}`;
		if (abilityScoresList.includes(name)) {
			update[name] = GetAbilityScoreMod(growths.scores[name]);
		}
		else {
			update[`${name}_max`] = growths.scores[name];
		}
	}
	return update;
}

function GetCharacterStatGrowths(currentGrowths, bonusGrowths, ancestryData) {

	let defaultStats = GetStatisticsDefaults();
	let finalGrowths = AddGrowths(currentGrowths, MultiplyGrowths(bonusGrowths, 100));
	finalGrowths["hp"] += (ancestryData["hp"] * 100) + finalGrowths["CON"];

	let output = {
		scores: MultiplyGrowths(finalGrowths, 0.01),
		modulus: ModulusGrowths(finalGrowths, 100)
	};

	// update more scores
	output.scores["vitality"] += Math.max(GetAbilityScoreMod(output.scores["CON"]), 0);
	output.scores["ki_max"] = defaultStats.kiLimit + bonusGrowths["kiLimit"];
	output.scores["branchpoints"] = Math.floor(output.scores["spellForce"] * 0.5) + bonusGrowths["branchpoints"];
	return output;
}




// ======== Statistics - Derived Stat Setters

function GetDerivedBonusStatsList() {
	return ["statbonus_initiative", "statbonus_power", "statbonus_stress", "statbonus_barrier", "statbonus_capacity"];
}

on("change:statbonus_pb", function () {

	UpdateCharacterProficiencyBonus();
});

function UpdateCharacterProficiencyBonus() {

	let mod_attrs = ["pb", "statbonus_pb", "builder-ancestry", "base_level"];
	mod_attrs = mod_attrs.concat(GetGrowthList(true));
	mod_attrs = mod_attrs.concat(GetDerivedBonusStatsList());
	mod_attrs = mod_attrs.concat(GetSkillTrainingFieldList());
	mod_attrs = mod_attrs.concat(GetBonusSkillsList());

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let coreData = SetCoreDataFieldArray(v, "");
		coreData["pb"] = AttrParseInt(v, "statbonus_pb") + GetProfBonusMod(AttrParseInt(v, "base_level"));
		update["pb"] = coreData["pb"];

		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		update = SetDerivedStats(update, v, ancestryData, GetGrowthList(true));
		update = SetCharacterSkillsUpdateData(update, v, GetAllSkillsList(true), coreData);

		setAttrs(update, { silent: true });
	});
}

on("change:statbonus_initiative change:statbonus_power change:statbonus_stress change:statbonus_barrier", function (eventinfo) {

	UpdateCharacterDerivedStat(GetFieldNameAttribute(eventinfo.sourceAttribute));

});

function UpdateCharacterDerivedStat(fieldName) {

	let mod_attrs = ["pb", "builder-ancestry"];
	mod_attrs = mod_attrs.concat(GetAbilityScoreList(true));
	let growthList = [];

	switch (fieldName) {
		case "initiative": mod_attrs = mod_attrs.concat(["statbonus_initiative", "QCK"]); growthList.push("QCK"); break;
		case "power": mod_attrs = mod_attrs.concat(["statbonus_power", "STR"]); growthList.push("STR"); break;
		case "barrier": mod_attrs = mod_attrs.concat(["statbonus_barrier", "WIL"]); growthList.push("WIL"); break;
		case "stress": mod_attrs = mod_attrs.concat(["statbonus_stress", "WIL"]); growthList.push("WIL"); break;
	}

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		update = SetDerivedStats(update, v, ancestryData, growthList);

		setAttrs(update, { silent: true });
	});
}

function SetDerivedStats(update, attrArray, ancestryData, growthList) {

	let name = "";
	let total = 0;

	for (let i = 0; i < growthList.length; i++) {
		name = growthList[i];
		switch (name) {
			case "QCK":
				update["initiative"] = AttrParseInt(attrArray, "pb") + AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_initiative");
				break;
			case "STR":
				update["power"] = AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_power");
				let defaultStats = GetStatisticsDefaults();
				update["capacity_max"] = defaultStats["capacity"] + AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_capacity");
				break;
			case "WIL":
				total = parseInt(ancestryData.barrier) + AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_barrier");
				update["barrier"] = total
				update["tempHpTotal"] = total + AttrParseInt("block");

				total = AttrParseInt(attrArray, name) + AttrParseInt(attrArray, "statbonus_stress");
				update["stress_max"] = Math.max(0, total);
				break;
		}
	}

	return update;
}




// ======== Statistics - Branches 
function GetBranchesTrainingList() {
	return GetSectionIdNameFromArray(`branch-`, "", GetBranchesList(true));
}



// ======== Branch Listeners
on("change:branch-health change:branch-wind change:branch-poison change:branch-light change:branch-smoke change:branch-soul change:branch-power change:branch-shadow change:branch-gravity change:branch-lightning change:branch-force change:branch-blood change:branch-restoration change:branch-storm change:branch-time ", function (eventinfo) {

	UpdateCharacterBranch(eventinfo.newValue);
});
//-- end

function UpdateCharacterBranch(branchValue) {

	let mod_attrs = ["branchpoints"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let branchpoints = AttrParseInt(v, "branchpoints");
		branchpoints += (branchValue == "0" || branchValue == "") ? 1 : -1;

		update["branchpoints"] = branchpoints;
		update[`branchpoints-error`] = branchpoints < 0 ? "1" : "0";

		setAttrs(update, { silent: true });
	});

}

function GetBranchPointsTotal(attrArray) {

	let branches = GetBranchesList(true);
	let total = 0;
	for (let i = 0; i < branches.length; i++) {
		total += attrArray[`branch-${branches[i]}`] == "on" ? 1 : 0;
	}
	return total;
}




// ======== Statistics - Other Stat Setters

on("change:statbonus_speed", function () {

	UpdateCharacterSpeed();
});

function UpdateCharacterSpeed() {

	let mod_attrs = ["statbonus_speed", "builder-ancestry", "speedPen"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let ancestryData = GetAncestryInfo(AttrParseString(v, "builder-ancestry", "Human"));
		update = SetCharacterSpeed(update, v, ancestryData);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterSpeed(update, attrArray, ancestryData) {

	update["speed"] = parseInt(ancestryData.speed) + AttrParseInt(attrArray, "statbonus_speed") + AttrParseInt(attrArray, "speedPen");
	return update;
}

on("change:statbonus_chakra", function () {

	UpdateCharacterChakra();
});

function UpdateCharacterChakra() {

	let mod_attrs = ["statbonus_chakra"];

	getAttrs(mod_attrs, function (v) {
		let update = {};
		update = SetCharacterChakra(update, v);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterChakra(update, attrArray) {

	let defaultStats = GetStatisticsDefaults();
	update["chakra_max"] = defaultStats.chakra + AttrParseInt(attrArray, "statbonus_chakra");
	return update;
}

on("change:statbonus_armor", function () {

	UpdateCharacterArmor();
});

function UpdateCharacterArmor() {

	let mod_attrs = ["statbonus_armor"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update = SetCharacterArmor(update, v);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterArmor(update, attrArray) {

	update["armor"] = AttrParseInt(attrArray, "statbonus_armor");
	return update;
}

on("change:statbonus_block", function () {

	UpdateCharacterBlock();
});

function UpdateCharacterBlock() {

	let mod_attrs = ["statbonus_block", "statscore_block", "barrier"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update = SetCharacterBlock(update, v);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterBlock(update, attrArray) {

	let total = AttrParseInt(attrArray, "statscore_block") + AttrParseInt(attrArray, "statbonus_block");
	update["block"] = total;
	update["tempHpTotal"] = total + AttrParseInt(attrArray, "barrier");
	return update;
}

on("change:statbonus_trauma", function () {

	UpdateCharacterTraumaLimit();
});

function UpdateCharacterTraumaLimit() {

	let mod_attrs = ["statbonus_trauma", "builder-basePath"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let basePath = AttrParseString(v, "builder-basePath", "Common");
		update = SetCharacterTraumaLimit(update, v, basePath);

		setAttrs(update, { silent: true });
	});
}

function SetCharacterTraumaLimit(update, attrArray, path) {

	let defaultStats = GetStatisticsDefaults(path);
	update["trauma_max"] = defaultStats.traumaLimit + AttrParseInt(attrArray, "statbonus_trauma");
	return update;
}




// ======== Character Skills Update
on("change:skillbonus_brace change:skillbonus_insight change:skillbonus_notice change:skillbonus_presence change:skillbonus_reflex change:skillbonus_resolve change:skillbonus_brawling change:skillbonus_finesse change:skillbonus_lunge change:skillbonus_marksmanship change:skillbonus_might change:skillbonus_throw change:skillbonus_assault change:skillbonus_conjure change:skillbonus_enchant change:skillbonus_ethereal change:skillbonus_field change:skillbonus_structure change:skillbonus_acrobatics change:skillbonus_athletics change:skillbonus_fortitude change:skillbonus_legerdemain change:skillbonus_physique change:skillbonus_stealth change:skillbonus_academics change:skillbonus_culture change:skillbonus_investigation change:skillbonus_nature change:skillbonus_tracking change:skillbonus_vocation change:skillbonus_charm change:skillbonus_deception change:skillbonus_intimidation change:skillbonus_leadership change:skillbonus_negotiation change:skillbonus_performance change:skillbonus_artisan change:skillbonus_cook change:skillbonus_heal change:skillbonus_herbalism change:skillbonus_mechanical change:skillbonus_pilot", function (eventinfo) {

	UpdateCharacterSingleSkill(eventinfo.sourceAttribute);
});

function GetBonusSkillsList() {
	return ["skillbonus_brace", "skillbonus_insight", "skillbonus_notice", "skillbonus_presence", "skillbonus_reflex", "skillbonus_resolve", "skillbonus_brawling", "skillbonus_finesse", "skillbonus_lunge", "skillbonus_marksmanship", "skillbonus_might", "skillbonus_throw", "skillbonus_assault", "skillbonus_conjure", "skillbonus_enchant", "skillbonus_ethereal", "skillbonus_field", "skillbonus_structure", "skillbonus_acrobatics", "skillbonus_athletics", "skillbonus_fortitude", "skillbonus_legerdemain", "skillbonus_physique", "skillbonus_stealth", "skillbonus_academics", "skillbonus_culture", "skillbonus_investigation", "skillbonus_nature", "skillbonus_tracking", "skillbonus_vocation", "skillbonus_charm", "skillbonus_deception", "skillbonus_intimidation", "skillbonus_leadership", "skillbonus_negotiation", "skillbonus_performance", "skillbonus_artisan", "skillbonus_cook", "skillbonus_heal", "skillbonus_herbalism", "skillbonus_mechanical", "skillbonus_pilot"];
}
// -- end


function UpdateCharacterSingleSkill(fieldName) {

	UpdateCharacterSkills([GetFieldNameAttribute(fieldName)]);
}

function UpdateCharacterSkills(skillsList) {
	let abilityScoreArray = GetAbilityScoreList(true);
	let bonusFieldArray = GetSectionIdNameFromArray(`skillbonus_`, "", skillsList);
	let mod_attrs = ["pb", "skills-baseSkills", "skills-baseChoiceSkills", "skills-baseExtraSkills", "reflexPen"];
	mod_attrs = mod_attrs.concat(abilityScoreArray).concat(bonusFieldArray);

	getAttrs(mod_attrs, function (v) {
		let update = {};

		// set variables
		let coreData = SetCoreDataFieldArray(v, "");
		update = SetCharacterSkillsUpdateData(update, v, skillsList, coreData);

		setAttrs(update, { silent: true });
	});
}


// ======== Skills Setters

function SetCharacterSkillsUpdateData(update, attrArray, skillsList, coreData) {
	let skillTrainingList = AttrParseJSON(attrArray, "skills-baseSkills", []).concat(AttrParseJSON(attrArray, "skills-baseChoiceSkills", [])).concat(AttrParseJSON(attrArray, "skills-baseExtraSkills", []));
	let skillData = CreateCharacterSkillsUpdateData(attrArray, skillsList, skillTrainingList);

	// set variables
	return SetCharacterSkills(update, skillData, coreData);
}

function CreateCharacterSkillsUpdateData(attrArray, skillArray, trainingList) {

	let skillData = [];
	let skillName = "";
	let skill = {};

	// set skill arrays
	for (let i = 0; i < skillArray.length; i++) {
		skillName = skillArray[i];
		skill = GetSkillsInfo(skillName);
		skill.bonus = AttrParseInt(attrArray, `skillbonus_${skillName}`);
		if (skillName == "reflex") {
			skill.bonus += AttrParseInt(attrArray, `reflexPen`);
		}
		skill.isTrained = trainingList.includes(skillName);
		skillData.push(skill);
	}

	return skillData;

}

function SetCharacterSkills(update, skillData, coreData) {

	let skill = {};
	let total = 0;
	for (let i = 0; i < skillData.length; i++) {
		skill = skillData[i];
		total = parseInt(coreData[skill.abilityScore]) + skill.bonus + (skill.isTrained ? coreData["pb"] : 0);
		update[`skill_${Format.ToCamelCase(skill.name)}`] = total;
	}

	return update;
}



// ======== Advancement Button

on("change:character-button-advancement", function () {

	update_character_toAdvancement();
});

var update_character_toAdvancement = function () {
	let update = {};

	update["advancement-previousPage"] = "Character";
	update["characterSheetDisplayStyle"] = "Advancement";

	setAttrs(update, { silent: true });
}

on("change:character-button-builder", function () {

	update_character_toBuilder();
});

var update_character_toBuilder = function () {
	let update = {};

	update["builder-previousPage"] = "Character";
	update["builder-nextPage"] = "Character";
	update["characterSheetDisplayStyle"] = "0";

	setAttrs(update, { silent: true });
}

on("change:character-button-skills", function () {

	update_character_toSkills();
});

var update_character_toSkills = function () {
	let update = {};

	update["tabSection-origin-AncestrySkills"] = "0";
	update["tabSection-origin-ExtraSkills"] = "on";
	update["skills-previousPage"] = "Character";
	update["skills-nextPage"] = "Character";
	update["characterSheetDisplayStyle"] = "Skills";

	setAttrs(update, { silent: true });
}

on("change:character-button-techniques", function () {

	update_character_toTechniques();
});

var update_character_toTechniques = function () {
	let update = {};

	update["techniques-previousPage"] = "Character";
	update["techniques-nextPage"] = "Character";
	update["characterSheetDisplayStyle"] = "Techniques";

	setAttrs(update, { silent: true });
}

