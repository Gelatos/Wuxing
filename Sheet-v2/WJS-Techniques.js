// ======== Submission

on("change:techniques-button-submit", function () {

	update_techniques_submit();
});

var update_techniques_submit = function () {

	let mod_attrs = ["techniques-nextPage", "techniques-learnedTech", "techniques-learnedNewTech"];
	getAttrs(mod_attrs, function (v) {

		let update = {};

		// set updates
		update["techniques-learnedTech"] = v["techniques-learnedNewTech"];
		
		update["techniques-button-clearfilter"] = "on";
		UpdateTechniquesClearFilter("on");
		
		update = GoToNextPage(update, "Character", "Techniques");
		
		setAttrs(update, { silent: true }, function() {
			UpdateLearnedTechniques();
		});

	});

}




// ======== Back Button

on("change:techniques-button-back", function () {

	update_techniques_back();
});

var update_techniques_back = function () {

	let mod_attrs = ["techniques-previousPage", "techniques-learnedTech"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update["techniques-learnedNewTech"] = v["techniques-learnedTech"];
		
		update["techniques-button-clearfilter"] = "on";
		UpdateTechniquesClearFilter("on");
		update["techniques-filteredTech"] = JSON.stringify({});
		update["techniques-remainingFilteredTech"] = 0;
		
		update["characterSheetDisplayStyle"] = v["techniques-previousPage"];
		update["techniques-previousPage"] = "";

		setAttrs(update, { silent: true });
	});

}




// ======== Point Fields

function GetTechniqueFieldsList() {

	return ["pathgeneral", "pathtraining",
		"discgeneral", "discWarfare", "discTalent", "discAcumen", "discMagic"];
}

function GetTechniquePointFieldsList(isMax) {
	let output = GetTechniqueFieldsList();
	for (let i = 0; i < output.length; i++) {
		output = `techpoints-${output[i]}${isMax ? "_max" : ""}`;
	}
	return output;
}

function GetTechniquePointBonusFieldsList() {
	let output = GetTechniqueFieldsList();
	for (let i = 0; i < output.length; i++) {
		output = `techbonus-${output[i]}`;
	}
	return output;
}

function SetTechniqueAdvancementFields(update, attrArray, totalLevel, techniques) {

	let techPoints = AttrParseJSON(attrArray, "techniques-techpoints");
	if (techPoints == "") {
		techPoints = GetTechniquesTechPointObj();
	}
	let learnedTech = AttrParseJSONDictionary(attrArray, "techniques-learnedNewTech");
	let pointField = "";

	for (let i = 0; i < techniques.keys.length; i++) {
		switch (techniques.keys[i]) {
			case "PS":
				pointField = "pathgeneral";
				techPoints[pointField] += techniques.values[techniques.keys[i]];
				update[`techpoints-${pointField}_max`] = techPoints[pointField] + AttrParseInt(attrArray, `techbonus-${pointField}`);
				break;
			case "TPS":
				pointField = "pathtraining";
				techPoints[pointField] += techniques.values[techniques.keys[i]];
				update[`techpoints-${pointField}_max`] = techPoints[pointField] + AttrParseInt(attrArray, `techbonus-${pointField}`);
				break;
			case "GD":
				pointField = "discgeneral";
				techPoints[pointField] += techniques.values[techniques.keys[i]];
				update[`techpoints-${pointField}_max`] = techPoints[pointField] + AttrParseInt(attrArray, `techbonus-${pointField}`);
				break;

			case "WD":
				pointField = "discWarfare";
				techPoints[pointField] += techniques.values[techniques.keys[i]];
				update[`techpoints-${pointField}_max`] = techPoints[pointField] + AttrParseInt(attrArray, `techbonus-${pointField}`);
				break;
			case "TD":
				pointField = "discTalent";
				techPoints[pointField] += techniques.values[techniques.keys[i]];
				update[`techpoints-${pointField}_max`] = techPoints[pointField] + AttrParseInt(attrArray, `techbonus-${pointField}`);
				break;
			case "AD":
				pointField = "discAcumen";
				techPoints[pointField] += techniques.values[techniques.keys[i]];
				update[`techpoints-${pointField}_max`] = techPoints[pointField] + AttrParseInt(attrArray, `techbonus-${pointField}`);
				break;
			case "MD":
				pointField = "discMagic";
				techPoints[pointField] += techniques.values[techniques.keys[i]];
				update[`techpoints-${pointField}_max`] = techPoints[pointField] + AttrParseInt(attrArray, `techbonus-${pointField}`);
				break;

			case "T": update = SetTechniquesJobTechniques(update, attrArray, techniques.values[techniques.keys[i]]); break;

			case "JTS": update = SetCharacterTechSlotCounts(update, attrArray, totalLevel, ["job"]); break;
			case "ATS": update = SetCharacterTechSlotCounts(update, attrArray, totalLevel, ["active"]); break;
			case "PTS": update = SetCharacterTechSlotCounts(update, attrArray, totalLevel, ["passive", "support"]); break;
		}
	}
	update["techniques-techpoints"] = JSON.stringify(techPoints);
	update = SetTechniquesPointCounts(update, techPoints, learnedTech);
	return update;
}

function GetTechniquesTechPointObj() {
	return {
		"pathgeneral": 0,
		"pathtraining": 0,
		"discgeneral": 0,
		"discWarfare": 0,
		"discTalent": 0,
		"discAcumen": 0,
		"discMagic": 0
	};
}

function SetTechniquesPointCounts(update, techPointCaps, learnedTech) {

	let techPoints = GetTechniquesTechPointObj();
	let techData = {};
	let fallbackGroup = "";
	for (let i = 0; i < learnedTech.keys.length; i++) {
		techData = learnedTech.values[learnedTech.keys[i]];

		if (techData == undefined) {
			continue;
		}
		switch (techData.group) {
			case "pathgeneral": 
			case "pathtraining": 
				fallbackGroup = "pathgeneral"; 
				break;
			case "discgeneral": 
			case "discWarfare":
			case "discTalent":
			case "discAcumen":
			case "discMagic":
				fallbackGroup = "discgeneral";
				break;
		}

		if (parseInt(techPoints[techData.group]) < parseInt(techPointCaps[techData.group])) {
			techPoints[techData.group] = parseInt(techPoints[techData.group]) + parseInt(techData.count);
		}
		else {
			techPoints[fallbackGroup] = parseInt(techPoints[fallbackGroup]) + parseInt(techData.count);
		}
	}

	let fields = GetTechniqueFieldsList();
	for (let i = 0; i < fields.length; i++) {
		update[`techpoints-${fields[i]}`] = parseInt(techPointCaps[fields[i]]) - parseInt(techPoints[fields[i]]);
		switch(fields[i]) {
			case "pathgeneral": 
			case "discgeneral": 
				update[`techpoints-${fields[i]}-error`] = techPoints[fields[i]] > techPointCaps[fields[i]] ? "1" : "0";
				break;
		}
	}
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

function GetTechniquesDisciplineFilters() {
	return ["techniques-filter-discWarfare", "techniques-filter-discTalent", "techniques-filter-discAcumen", "techniques-filter-discMagic"];
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

on("change:techniques-filter-disciplineAll", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionAllFilter(eventinfo.newValue, GetTechniquesDisciplineFilters());
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

on("change:techniques-filter-discWarfare change:techniques-filter-discTalent change:techniques-filter-discAcumen techniques-filter-discMagic", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	UpdateTechniquesFilterSelectionSingleFilter(eventinfo.newValue, ["techniques-filter-disciplineAll"]);
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

on("change:techniques-button-loadfiltertech", function () {
	UpdateTechniquesLoadMoreFilteredTechniques();
});

function UpdateTechniquesFilteredTechniques() {

	let mod_attrs = ["techniques-learnedNewTech",
		"techniques-filter-selectedtech", "techniques-filter-pathsAll", "techniques-filter-disciplineAll", "techniques-filter-spellAll",
		"techniques-filter-spellWoodAll", "techniques-filter-spellFireAll", "techniques-filter-spellEarthAll",
		"techniques-filter-spellMetalAll", "techniques-filter-spellWaterAll"
	];
	mod_attrs = mod_attrs.concat(GetTechniquesPathFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesDisciplineFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesWoodFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesFireFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesEarthFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesMetalFilters());
	mod_attrs = mod_attrs.concat(GetTechniquesWaterFilters());

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let workingTechniqueNames = [];
		let learnedTech = AttrParseJSONDictionary(v, "techniques-learnedNewTech");
		update["techniques-button-clearfilter"] = 0;

		// compile a list of all the technique names that need to be added to the filtered techniques
		workingTechniqueNames = workingTechniqueNames.concat(GetTechniquesPathTechNames(v));
		workingTechniqueNames = workingTechniqueNames.concat(GetTechniquesSkillTechNames(v));
		workingTechniqueNames = workingTechniqueNames.concat(GetTechniquesSpellTechNames(v));
		workingTechniqueNames = GetTechniquesLearnedTechNames(learnedTech.keys, workingTechniqueNames);

		update = SetTechniquesFilteredTechniques(update, workingTechniqueNames, learnedTech);

		setAttrs(update, { silent: true });
	});
}

function UpdateTechniquesLoadMoreFilteredTechniques() {
    let mod_attrs = ["techniques-filteredTech", "techniques-learnedNewTech"];
    
    getAttrs(mod_attrs, function (v) {
		let update = {};
		let filteredTech = AttrParseJSON(v, "techniques-filteredTech");
		let learnedTech = AttrParseJSONDictionary(v, "techniques-learnedNewTech");
		
		update = SetTechniquesFilteredTechniques(update, filteredTech, learnedTech);

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

	if (AttrParseString(attrArray, "techniques-filter-disciplineAll") == "on") {
		workingTechniqueNames = workingTechniqueNames.concat(GetAllDisciplineTechniquesList(false));
	}
	else {
		if (AttrParseString(attrArray, "techniques-filter-discWarfare") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetAllWarfareTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-discTalent") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetAllTalentTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-discAcumen") == "on") {
			workingTechniqueNames = workingTechniqueNames.concat(GetAllAcumenTechniquesList(false));
		}
		if (AttrParseString(attrArray, "techniques-filter-discMagic") == "on") {
			workingTechniqueNames = GetTechniquesSpellTechNames(attrArray);
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

function SetTechniquesFilteredTechniques(update, filteredTech, learnedTech) {
    
    let workingTechniques = [];
    let iterator = 0;
	let technique = {};
		
	// iterate through the list of names
	while (iterator < 10 && filteredTech.length > 0) {
		technique = GetTechniquesInfo(filteredTech[0]);
		technique = SetTechniqueSelect(technique, learnedTech);
    	workingTechniques.push(technique);
    	filteredTech.splice(0, 1);
	    iterator++;
	}
	
    update = SetTechniqueDataList(update, "repeating_filteredtechniques", workingTechniques, true, true);
    update["techniques-filteredTech"] = JSON.stringify(filteredTech);
    update["techniques-remainingFilteredTech"] = filteredTech.length > 10 ? 10 : filteredTech.length;
    return update;
}


// ======== Technique Selection

on("change:repeating_filteredtechniques:technique-select", function (eventinfo) {
	UpdateTechniquesSelectedTechniques(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_filteredtechniques"), eventinfo.newValue);
});

function UpdateTechniquesSelectedTechniques(repeatingId, newValue) {

	let repeatingSection = "repeating_filteredtechniques";

	let mod_attrs = ["techniques-techpoints", "techniques-learnedNewTech"];
	mod_attrs = mod_attrs.concat(GetSectionIdValues([repeatingId], repeatingSection, ["technique-name", "technique-group"]));
	mod_attrs = mod_attrs.concat(GetTechniquePointFieldsList(false));
	mod_attrs = mod_attrs.concat(GetTechniquePointFieldsList(true));
	mod_attrs = mod_attrs.concat(GetTechniquePointBonusFieldsList());

	getAttrs(mod_attrs, function (v) {
		let update = {};

		let techName = AttrParseString(v, GetSectionIdName(repeatingSection, repeatingId, "technique-name"));
		if (techName == "") {
			return;
		}
		let techGroup = SetTechniquesTechGroup(AttrParseString(v, GetSectionIdName(repeatingSection, repeatingId, "technique-group")));

		let techPoints = AttrParseJSON(v, "techniques-techpoints");
		if (techPoints == "") {
			techPoints = GetTechniquesTechPointObj();
		}
		let learnedTech = AttrParseJSON(v, "techniques-learnedNewTech");
		if (learnedTech == "") {
			learnedTech = CreateDictionary();
		}
		learnedTech = SetTechniquesSelectedTechnique(learnedTech, techName, newValue, techGroup);
		update["techniques-learnedNewTech"] = JSON.stringify(learnedTech);

		update = SetTechniquesPointCounts(update, techPoints, learnedTech);

		setAttrs(update, { silent: true });
	});
}

function SetTechniquesTechGroup(techGroup) {

	switch (techGroup) {
		case "General Path":
			return "pathgeneral";

		case "Training Path":
			return "pathtraining";

		case "Warfare":
			return "discWarfare";
		case "Talent":
			return "discTalent";
		case "Acumen":
			return "discAcumen";
		case "Magic":
		case "Arcane":
		case "Wood":
		case "Fire":
		case "Earth":
		case "Metal":
		case "Water":
			return "discMagic";
	}
	return "";
}

function SetTechniquesSelectedTechnique(learnedTech, techName, newValue, techGroup) {

	if (newValue.toString() == "0") {
		// this technique is being unselected
		if (learnedTech.keys.indexOf(techName) >= 0) {
			learnedTech.keys.splice(learnedTech.keys.indexOf(techName), 1);
			delete learnedTech.values[techName];
		}
	}
	else if (learnedTech.keys.includes(techName)) {
		learnedTech.values[techName].count = newValue;
	}
	else {
		learnedTech.keys.push(techName);
		learnedTech.values[techName] = {
			count: newValue,
			group: techGroup
		}
	}

	return learnedTech;
}

