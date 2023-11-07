// ======== Submission

on("change:techniques-button-submit", function () {

	update_techniques_submit();
});

var update_techniques_submit = function () {

	let mod_attrs = ["base_level"];
	getAttrs(mod_attrs, function (v) {

		let update = {};

		// set updates
		update["characterSheetDisplayStyle"] = "Character";

		setAttrs(update, { silent: true });

	});

}




// ======== Point Fields

function GetTechniqueFieldsList() {

	return ["pathgeneral", "pathtraining",
		"skillgeneral", "skilldefensive", "skillmartial", "skillmagic", "skillbody", "skillknowledge", "skillsocial", "skilltechnical",
		"spellgeneral"];
}

function GetTechniquePointFieldsList(isMax) {
	let output = GetTechniqueFieldsList();
	for (let i = 0; i < output.length; i++) {
		output = `techpoints-${output[i]}${isMax ? "_max" : ""}`;
	}
	return output;
}

function SetTechniqueAdvancementFields(update, attrArray, totalLevel, techniques) {

	for (let i = 0; i < techniques.keys.length; i++) {
		switch (techniques.keys[i]) {
			case "PS": update = SetTechniquePointFields(update, attrArray, "pathgeneral", techniques.values[techniques.keys[i]]); break;
			case "TPS": update = SetTechniquePointFields(update, attrArray, "pathtraining", techniques.values[techniques.keys[i]]); break;
			case "SPS": update = SetTechniquePointFields(update, attrArray, "spellgeneral", techniques.values[techniques.keys[i]]); break;
			case "AS": update = SetTechniquePointFields(update, attrArray, "skillgeneral", techniques.values[techniques.keys[i]]); break;

			case "DS": update = SetTechniquePointFields(update, attrArray, "skilldefensive", techniques.values[techniques.keys[i]]); break;
			case "CS": update = SetTechniquePointFields(update, attrArray, "skillmartial", techniques.values[techniques.keys[i]]); break;
			case "MS": update = SetTechniquePointFields(update, attrArray, "skillmagic", techniques.values[techniques.keys[i]]); break;
			case "BS": update = SetTechniquePointFields(update, attrArray, "skillbody", techniques.values[techniques.keys[i]]); break;
			case "KS": update = SetTechniquePointFields(update, attrArray, "skillknowledge", techniques.values[techniques.keys[i]]); break;
			case "SS": update = SetTechniquePointFields(update, attrArray, "skillsocial", techniques.values[techniques.keys[i]]); break;
			case "TS": update = SetTechniquePointFields(update, attrArray, "skilltechnical", techniques.values[techniques.keys[i]]); break;

			case "T": update = SetTechniquesJobTechniques(update, attrArray, techniques.values[techniques.keys[i]]); break;

			case "JTS": update = SetCharacterTechSlotCounts(update, attrArray, totalLevel, ["job"]); break;
			case "ATS": update = SetCharacterTechSlotCounts(update, attrArray, totalLevel, ["active"]); break;
			case "PTS": update = SetCharacterTechSlotCounts(update, attrArray, totalLevel, ["passive", "support"]); break;
		}
	}

	return update;
}

function SetTechniquePointFields(update, attrArray, pointField, increase) {

	let workingField = `techpoints-${pointField}`;
	let count = AttrParseInt(attrArray, workingField);
	update[workingField] = count + increase;
	workingField = `techpoints-${pointField}_max`;
	count = AttrParseInt(attrArray, workingField);
	update[workingField] = count + increase;

	return update;
}

function SetTechniquesJobTechniques(update, attrArray, techniques) {

	if (techniques == undefined) {
		return;
	}
	let jobs = AttrParseString(attrArray, "techniques-jobTech");

	if (jobs != "") {
		jobs += ";";
	}
	jobs += techniques;
	update["techniques-jobTech"] = jobs;

	// update character sheet techniques by gaining these new techs
	update = AddCharacterClassTechniques(update, attrArray, techniques.split(";"));

	return update;
}




// ======== Technique Filter Clear

on("change:techniques-button-clearfilter", function (eventinfo) {
	UpdateTechniquesClearFilter(eventinfo.newValue);
});

function UpdateTechniquesClearFilter(value) {

	if (value == "on") {
		// clear the techniques
		ClearAllSectionIds("repeating_filteredtechniques");
	}

}




// ======== Technique Filter Getters
function GetTechniquesPathFilters() {
	return ["techniques-filter-pathsTraining", "techniques-filter-pathsGeneral"];
}

function GetTechniquesSkillFilters() {
	return ["techniques-filter-skillDefensive", "techniques-filter-skillMartial", "techniques-filter-skillMagic",
		"techniques-filter-skillBody", "techniques-filter-skillKnowledge", "techniques-filter-skillSocial", "techniques-filter-skillTechnical"];
}

function GetTechniquesWoodFilters() {
	return ["techniques-filter-spellWoodBasic", "techniques-filter-spellWoodWind"];
}

function GetTechniquesFireFilters() {
	return ["techniques-filter-spellFireBasic", "techniques-filter-spellFireLight"];
}

function GetTechniquesEarthFilters() {
	return ["techniques-filter-spellEarthBasic", "techniques-filter-spellEarthShadow"];
}

function GetTechniquesMetalFilters() {
	return ["techniques-filter-spellMetalBasic", "techniques-filter-spellMetalLightning"];
}

function GetTechniquesWaterFilters() {
	return ["techniques-filter-spellWaterBasic", "techniques-filter-spellWaterStorm"];
}

function GetTechniquesSpellFilters() {
	let mod_attrs = ["techniques-filter-spellWoodAll", "techniques-filter-spellFireAll", "techniques-filter-spellEarthAll",
		"techniques-filter-spellMetalAll", "techniques-filter-spellWaterAll"];
	mod_attrs = mod_attrs.concat(GetTechniquesWoodFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesFireFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesEarthFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesMetalFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesWaterFilters());

	return mod_attrs;
}

function UpdateTechniquesFilterSelection(fields, newValue) {
	let update = {};

	for (var i = 0; i < fields.length; i++) {
		update[fields[i]] = newValue;
	}

	setAttrs(update, { silent: true });
}




// ======== Technique Filter All Selection

on("change:techniques-filter-pathsAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesPathFilters());
});

on("change:techniques-filter-skillAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesSkillFilters());
});

on("change:techniques-filter-spellAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesSpellFilters());
});

on("change:techniques-filter-spellWoodAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesWoodFilters());
});

on("change:techniques-filter-spellFireAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesFireFilters());
});

on("change:techniques-filter-spellEarthAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesEarthFilters());
});

on("change:techniques-filter-spellMetalAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesMetalFilters());
});

on("change:techniques-filter-spellWaterAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesWaterFilters());
});

function UpdateTechniquesFilterSelectionAllFilter(newValue, fields) {
	UpdateTechniquesFilterSelection(fields, newValue);
}




// ======== Technique Filter Single Selection

on("change:techniques-filter-pathsTraining change:techniques-filter-pathsGeneral", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-pathsAll"]);
});

on("change:techniques-filter-skillDefensive change:techniques-filter-skillMartial change:techniques-filter-skillMagic techniques-filter-skillBody change:techniques-filter-skillKnowledge change:techniques-filter-skillSocial change:techniques-filter-skillTechnical", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-skillAll"]);
});

on("change:techniques-filter-spellWoodBasic change:techniques-filter-spellWoodWind", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-spellAll", "techniques-filter-spellWoodAll"]);
});

on("change:techniques-filter-spellFireBasic change:techniques-filter-spellFireLight", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-spellAll", "techniques-filter-spellFireAll"]);
});

on("change:techniques-filter-spellEarthBasic change:techniques-filter-spellEarthShadow", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-spellAll", "techniques-filter-spellEarthAll"]);
});

on("change:techniques-filter-spellMetalBasic change:techniques-filter-spellMetalLightning", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-spellAll", "techniques-filter-spellMetalAll"]);
});

on("change:techniques-filter-spellWaterBasic change:techniques-filter-spellWaterStorm", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-spellAll", "techniques-filter-spellWaterAll"]);
});

function UpdateTechniquesFilterSelectionSingleFilter(newValue, fields) {
	if (newValue != "on") {
		UpdateTechniquesFilterSelection(fields, 0);
	}
}





// ======== Technique Filter Submission
on("change:techniques-button-showtech", function () {
	UpdateTechniquesFilteredTechniques();
});

function UpdateTechniquesFilteredTechniques() {

	let mod_attrs = ["techniques-learnedNewTech",
		"techniques-filter-selectedtech", "techniques-filter-pathsAll", "techniques-filter-skillAll", "techniques-filter-spellAll",
		"techniques-filter-spellWoodAll", "techniques-filter-spellFireAll", "techniques-filter-spellEarthAll",
		"techniques-filter-spellMetalAll", "techniques-filter-spellWaterAll"
	];
	mod_attrs = mod_attrs.concat(GetTechniquesPathFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesSkillFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesWoodFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesFireFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesEarthFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesMetalFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesWaterFilters());

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let workingTechniqueNames = [];
		let workingTechniques = [];
		let learnedTech = AttrParseJSON(v, "techniques-learnedNewTech");
		if (learnedTech == "") {
			learnedTech = CreateDictionary();
		}
		update["techniques-button-clearfilter"] = 0;

		// compile a list of all the technique names that need to be added to the filtered techniques
		workingTechniqueNames = workingTechniqueNames.concat(GetTechniquesPathTechNames(v));
		workingTechniqueNames = workingTechniqueNames.concat(GetTechniquesSkillTechNames(v));
		workingTechniqueNames = workingTechniqueNames.concat(GetTechniquesSpellTechNames(v));
		if (learnedTech != "") {
			workingTechniqueNames = GetTechniquesLearnedTechNames(learnedTech.keys, workingTechniqueNames);
		}

		// iterate through the list of names
		for (var i = 0; i < workingTechniqueNames.length; i++) {
			workingTechniques.push(GetTechniquesInfo(workingTechniqueNames[i]));
		}
		update = SetTechniqueDataList(update, "repeating_filteredtechniques", workingTechniques, learnedTech, true);

		setAttrs(update, { silent: true });
	});
}

function GetTechniquesPathTechNames(attrArray) {
	let workingTechniqueNames = [];

	if (AttrParseString(attrArray, "techniques-filter-pathsAll") == "on") {
		workingTechniqueNames = workingTechniqueNames.concat(GetAllPathTechniquesList(false));
	}
	else {
		if (AttrParseString(attrArray, "techniques-filter-pathsTraining") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetTrainingPathTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-pathsGeneral") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetGeneralPathTechniquesList(false));
		}
	}

	return workingTechniqueNames;
}

function GetTechniquesSkillTechNames(attrArray) {
	let workingTechniqueNames = [];

	if (AttrParseString(attrArray, "techniques-filter-skillAll") == "on") {
		workingTechniqueNames = workingTechniqueNames.concat(GetAllSkillTechniquesList(false));
	}
	else {
		if (AttrParseString(attrArray, "techniques-filter-skillDefensive") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetDefensiveSkillTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-skillMartial") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetMartialSkillTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-skillMagic") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetMagicSkillTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-skillBody") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetBodySkillTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-skillKnowledge") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetKnowledgeSkillTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-skillSocial") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetSocialSkillTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-skillTechnical") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetTechnicalSkillTechniquesList(false));
		}
	}

	return workingTechniqueNames;
}

function GetTechniquesSpellTechNames(attrArray) {
	let workingTechniqueNames = [];

	if (AttrParseString(attrArray, "techniques-filter-spellAll") == "on") {
		workingTechniqueNames = workingTechniqueNames.concat(GetAllSpellTechniquesList(false));
	}
	else {
		if (AttrParseString(attrArray, "techniques-filter-spellWoodAll") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetWoodTechniquesList(false));
		}
		else {
			if (AttrParseString(attrArray, "techniques-filter-spellWoodBasic") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetWoodBasicTechniquesList(false));
			}
			if (AttrParseString(attrArray, "techniques-filter-spellWoodWind") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetWoodWindTechniquesList(false));
			}
		}

		if (AttrParseString(attrArray, "techniques-filter-spellFireAll") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetFireTechniquesList(false));
		}
		else {
			if (AttrParseString(attrArray, "techniques-filter-spellFireBasic") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetFireBasicTechniquesList(false));
			}
			if (AttrParseString(attrArray, "techniques-filter-spellFireLight") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetFireLightTechniquesList(false));
			}
		}

		if (AttrParseString(attrArray, "techniques-filter-spellEarthAll") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetEarthTechniquesList(false));
		}
		else {
			if (AttrParseString(attrArray, "techniques-filter-spellEarthBasic") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetEarthBasicTechniquesList(false));
			}
			if (AttrParseString(attrArray, "techniques-filter-spellEarthShadow") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetEarthShadowTechniquesList(false));
			}
		}

		if (AttrParseString(attrArray, "techniques-filter-spellMetalAll") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetMetalTechniquesList(false));
		}
		else {
			if (AttrParseString(attrArray, "techniques-filter-spellMetalBasic") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetMetalBasicTechniquesList(false));
			}
			if (AttrParseString(attrArray, "techniques-filter-spellMetalLightning") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetMetalLightningTechniquesList(false));
			}
		}

		if (AttrParseString(attrArray, "techniques-filter-spellWaterAll") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetWaterTechniquesList(false));
		}
		else {
			if (AttrParseString(attrArray, "techniques-filter-spellWaterBasic") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetWaterBasicTechniquesList(false));
			}
			if (AttrParseString(attrArray, "techniques-filter-spellWaterStorm") == "on") {
				workingTechniqueNames = workingTechniqueNames.concat(GetWaterStormTechniquesList(false));
			}
		}

	}

	return workingTechniqueNames;
}

function GetTechniquesLearnedTechNames(learnedTech, workingTechniqueNames) {

	for (var i = 0; i < learnedTech.length; i++) {
		if (!workingTechniqueNames.includes(learnedTech[i])) {
			workingTechniqueNames.push(learnedTech[i]);
		}
	}
	return workingTechniqueNames;
}

