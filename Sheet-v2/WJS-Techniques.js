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

