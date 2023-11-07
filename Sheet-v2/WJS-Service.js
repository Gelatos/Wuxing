// ======== Attribute Values
function AttrParseString(attrArray, fieldName, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = "";
	}
	return attrArray[fieldName] == undefined || attrArray[fieldName] == "" ? defaultValue : attrArray[fieldName];
}

function AttrParseInt(attrArray, fieldName, defaultValue) {

	return ParseIntValue(attrArray[fieldName], defaultValue);
}

function ParseIntValue(value, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = 0;
	}
	return isNaN(parseInt(value)) ? defaultValue : parseInt(value);
}

function AttrParseFloat(attrArray, fieldName, defaultValue) {

	return ParseFloatValue(attrArray[fieldName], defaultValue);
}

function ParseFloatValue(value, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = 0;
	}
	return isNaN(parseFloat(value)) ? defaultValue : parseFloat(value);
}

function AttrParseJSON(attrArray, fieldName, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = "";
	}
	return attrArray[fieldName] == undefined ? defaultValue : attrArray[fieldName] == "" ? defaultValue : JSON.parse(attrArray[fieldName]);
}


// ======== Section Ids
function GetSectionIdValues(idarray, sectionName, variableArray) {
	var output = [];

	_.each(idarray, function (currentID) {
		_.each(variableArray, function (variableName) {
			output.push(GetSectionIdName(sectionName, currentID, variableName));
		});
	});

	return output;
}

function GetRepeatingSectionIdFromId(id, repeatingSection) {
	var len = repeatingSection.length + 1;
	return id.substr(len, 20);
}

function ClearAllSectionIds(repeatingSection) {

	getSectionIDs(repeatingSection, function (idarray) {
		_.each(idarray, function (currentID) {
			RemoveSectionId(repeatingSection, currentID);
		});
	});
}

function RemoveSectionId(repeatingSection, repeatingSectionId) {

	removeRepeatingRow(`${repeatingSection}_${repeatingSectionId}`);
}




  //// ======== Ability Scores

  function GetStatisticsDefaults(path) {
	return {
		carryCapacity: 40,
		vitality: 2,
		traumaLimit: path == "Common" ? 1 : 3,
		kiCharge: 5,
		kiLimit: 25,
		chakra: 1,
		spellForceLimit: 9,
		kiChargeLimit: 40,
		techSlotJob: 1,
		techSlotActive: 1,
		techSlotPassive: 1,
		techSlotSupport: 1
	}
  }
  
  function CreateAbilityScoreArrayData() {
	var output = {
	  CON: 0, DEX: 0,
	  QCK: 0, STR: 0,
	  CHA: 0, INT: 0,
	  PER: 0, WIL: 0
	}
	
	return output;
  }

function SetAbilityScoreUpdate(update, updateAttr, abilityScoreArray, suffix) {

	if (suffix == undefined) {
		suffix = "";
	}
	let list = GetAbilityScoreList(true);
	for (let i = 0; i < list.length; i++) {
		update[`${updateAttr}${list[i]}`] = abilityScoreArray[list[i]] + suffix;

	}
	return update;
}

function GetAbilityScoreList(isFields) {
	if (isFields) {
	return ["CON", "DEX", "QCK", "STR", "CHA", "INT", "PER", "WIL"];
	}
	else {
	return ["Constitution", "Dexterity", "Quickness", "Strength", "Charisma", "Intelligence", "Perception", "Willpower"];
	}
}

function SetCoreDataFieldArray(attrArray, fieldName) {

	let output = SetAbilityScoreFieldArray(attrArray, fieldName);
	output["pb"] = AttrParseInt(attrArray, "pb");

	return output;
}

function SetAbilityScoreFieldArray(attrArray, fieldName) {

	let output = {};
	let abList = GetAbilityScoreList(true);
	for (let i = 0; i < abList.length; i++) {
		output[abList[i]] = AttrParseInt(attrArray, `${fieldName}${abList[i]}`);
	}

	return output;
}

function AddAbilityScores(array1, array2) {

	return {
		CON: (array1.CON + array2.CON),
		DEX: (array1.DEX + array2.DEX),
		QCK: (array1.QCK + array2.QCK),
		STR: (array1.STR + array2.STR),
		CHA: (array1.CHA + array2.CHA),
		INT: (array1.INT + array2.INT),
		PER: (array1.PER + array2.PER),
		WIL: (array1.WIL + array2.WIL)
	}
}

function MultiplyAbilityScores(array1, val) {

	return {
		CON: Math.floor(array1.CON * val),
		DEX: Math.floor(array1.DEX * val),
		QCK: Math.floor(array1.QCK * val),
		STR: Math.floor(array1.STR * val),
		CHA: Math.floor(array1.CHA * val),
		INT: Math.floor(array1.INT * val),
		PER: Math.floor(array1.PER * val),
		WIL: Math.floor(array1.WIL * val)
	}
}

function ModulusAbilityScores(array1, val) {

	return {
		CON: (array1.CON % val),
		DEX: (array1.DEX % val),
		QCK: (array1.QCK % val),
		STR: (array1.STR % val),
		CHA: (array1.CHA % val),
		INT: (array1.INT % val),
		PER: (array1.PER % val),
		WIL: (array1.WIL % val)
	}
}



// ======== Growths

function GetGrowthList(isFields) {
	if (isFields) {
	return GetAbilityScoreList(isFields).concat(["hp", "vitality", "kiCharge", "spellForce"]);
	}
	else {
	return GetAbilityScoreList(isFields).concat(["HP", "Vitality", "Ki Charge", "Spellforce"]);
	}
}

function CreateGrowthsArrayData() {

	var output = CreateAbilityScoreArrayData();
	output.hp = 0;
	output.vitality = 0;
	output.kiCharge = 0;
	output.spellForce = 0;

	return output;
}

function ConvertAbilityScorePointsToGrowths(growthData) {

	let abilityScoreGrowthRate = 20;
	let hpGrowthRate = 50;
	let vitalityGrowthRate = 5;
	let kiChargeGrowthRate = 5;
	let spellForceGrowthRate = 6;
	return {
		CON: (growthData.CON * abilityScoreGrowthRate),
		DEX: (growthData.DEX * abilityScoreGrowthRate),
		QCK: (growthData.QCK * abilityScoreGrowthRate),
		STR: (growthData.STR * abilityScoreGrowthRate),
		CHA: (growthData.CHA * abilityScoreGrowthRate),
		INT: (growthData.INT * abilityScoreGrowthRate),
		PER: (growthData.PER * abilityScoreGrowthRate),
		WIL: (growthData.WIL * abilityScoreGrowthRate),
		hp: (growthData.hp * hpGrowthRate),
		vitality: (growthData.vitality * vitalityGrowthRate),
		kiCharge: (growthData.kiCharge * kiChargeGrowthRate),
		spellForce: (growthData.spellForce * spellForceGrowthRate)
	}
}

function SetGrowthFieldArray(attrArray, fieldName) {

	let output = SetAbilityScoreFieldArray(attrArray, fieldName);
	output.hp = AttrParseInt(attrArray, `${fieldName}hp`);
	output.vitality = AttrParseInt(attrArray, `${fieldName}vitality`);
	output.kiCharge = AttrParseInt(attrArray, `${fieldName}kiCharge`);
	output.spellForce = AttrParseInt(attrArray, `${fieldName}spellForce`);

	return output;
}

function SetBonusGrowthFieldArray(attrArray) {

	let fieldName = "statbonus_";
	let output = SetAbilityScoreFieldArray(attrArray, fieldName);
	output.hp = AttrParseInt(attrArray, `${fieldName}hp`);
	output.vitality = AttrParseInt(attrArray, `${fieldName}vitality`);
	output.kiCharge = AttrParseInt(attrArray, `${fieldName}kiCharge`);
	output.spellForce = AttrParseInt(attrArray, `${fieldName}spellForce`);

	output.branchpoints = AttrParseInt(attrArray, `${fieldName}branchpoints`);
	output.kiLimit = AttrParseInt(attrArray, `${fieldName}ki`);

	return output;
}

function GetCharacterStatGrowthTotals (ancestryData, baseAbilityScores, baseGrowths, advancementGrowths) {

	// convert growths to ability scores
	let currentGrowths = ConvertAbilityScorePointsToGrowths(AddGrowths(baseGrowths, AddGrowths(ancestryData.growths, advancementGrowths)));
	currentGrowths = AddGrowths(currentGrowths, MultiplyGrowths(baseAbilityScores, 100));
	currentGrowths = AddGrowths(currentGrowths, MultiplyGrowths(ancestryData.startingScores, 100));

	return currentGrowths;
}

function AddGrowths(array1, array2) {

	let output = AddAbilityScores(array1, array2);

	output.hp = (ParseIntValue(array1.hp) + ParseIntValue(array2.hp));
	output.vitality = (ParseIntValue(array1.vitality) + ParseIntValue(array2.vitality));
	output.kiCharge = (ParseIntValue(array1.kiCharge) + ParseIntValue(array2.kiCharge));
	output.spellForce = (ParseIntValue(array1.spellForce) + ParseIntValue(array2.spellForce));

	return output;
}

function MultiplyGrowths(array1, val) {

	let output = MultiplyAbilityScores(array1, val);

	output.hp = Math.floor(array1.hp * val);
	output.vitality = Math.floor(array1.vitality * val);
	output.kiCharge = Math.floor(array1.kiCharge * val);
	output.spellForce = Math.floor(array1.spellForce * val);

	return output;
}

function ModulusGrowths(array1, val) {

	let output = ModulusAbilityScores(array1, val);

	output.hp = (array1.hp % val);
	output.vitality = (array1.vitality % val);
	output.kiCharge = (array1.kiCharge % val);
	output.spellForce = (array1.spellForce % val);

	return output;
}




// ======== Techniques

function GetTraitsDictionary(traits, traitType) {

	let output = [];
	if (traits != undefined) {
		let keywordsSplit = traits.split(";");

		let name = "";
		let lookup = "";
		let traitInfo;

		for (let i = 0; i < keywordsSplit.length; i++) {
			name = "" + keywordsSplit[i].trim();

			if (name.includes("Impact") || name.includes("Explosive")) {
				name = ReplaceDamageDice(name);
			}

			lookup = name;
			if (lookup.indexOf("(") >= 0) {
				lookup = lookup.replace(/\([^)]*\)/g, "(X)");
			}

			switch (traitType.toLowerCase()) {
				case "technique": traitInfo = GetTechniqueTraitsInfo(lookup); break;
				case "weapon": traitInfo = GetWeaponTraitsInfo(lookup); break;
				case "ability": traitInfo = GetAbilityTraitsInfo(lookup); break;
				case "material": traitInfo = GetMaterialTraitsInfo(lookup); break;
			}
			traitInfo.name = name;
			output.push(traitInfo);
		}
	}

	return output;
}

function GetTechniqueDataArray(type, techniques) {
	let output = [];
	let techniqueList = techniques.split(";");
	let tech = "";
	let technique;

	for (let i = 0; i < techniqueList.length; i++) {
		tech = techniqueList[i].trim();
		switch (type.toLowerCase()) {
			case "ancestry":
				technique = GetAncestryTechniqueInfo(tech);
				if (technique.name != "") {
					output.push(technique);
				}
				break;
		}
	}
	return output;
}

function SetTechniqueDataList(update, repeatingSection, techniqueList, selectedTechniques, autoExpand) {

	// start by clearing the section Ids
	let newrowid;
	let name = "";

	// iterate through each technique
	for (let i = 0; i < techniqueList.length; i++) {
		newrowid = generateRowID();
		name = techniqueList[i];
		update = SetTechniqueData(update, newrowid, repeatingSection, name, TechniqueIsSelected(selectedTechniques, name), autoExpand);
	}

	return update;

}

function TechniqueIsSelected(selectedTechniques, name) {
	if (selectedTechniques == undefined) {
		return 0;
	}
	else if (selectedTechniques.keys.includes(name)) {
		return selectedTechniques.values[name];
	}
	return 0;
}

function SetTechniqueData(update, newrowid, repeatingSection, technique, select, autoExpand) {

	update[GetSectionIdName(repeatingSection, newrowid, "technique-select")] = select;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-expand")] = autoExpand ? "on" : "0";

	update[GetSectionIdName(repeatingSection, newrowid, "technique-header")] = technique.augmentBase == "" ? technique.action : "Augment";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-name")] = technique.name;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-augmentBase")] = technique.augmentBase == "" ? "Base" : technique.augmentBase;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-group")] = technique.techniqueSubGroup == "" ? technique.techniqueGroup : technique.techniqueSubGroup;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-type-flag")] = technique.techniqueType != "" ? "1" : "0";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-type")] = technique.techniqueType;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-action")] = technique.action;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-limits")] = technique.limits;

	// set the function block
	var isMultiple = false;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-functionBlock")] =
		(technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.prerequisite != "" || technique.resourceCost != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-traits")] = technique.traits;
	var traitsDb = GetTraitsDictionary(technique.traits, "technique");
	for (var i = 0; i < 6; i++) {
		if (i < traitsDb.length) {
			if (traitsDb[i].name.toLowerCase() == "multiple") {
				isMultiple = true;
			}
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i)] = traitsDb[i].name;
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i + "Desc")] = traitsDb[i].description;
		} else {
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i)] = "0";
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i + "Desc")] = "";
		}
	}
	update[GetSectionIdName(repeatingSection, newrowid, "technique-trigger")] = technique.trigger;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-requirement")] = technique.requirement;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-prerequisite")] = technique.prerequisite;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-resourceCost")] = technique.resourceCost;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-isMultiple")] = isMultiple ? "1" : "0";

	// set the description
	update[GetSectionIdName(repeatingSection, newrowid, "technique-descriptionBlock")] = (technique.description != "" || technique.onSuccess != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-description")] = technique.description;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-onSuccess")] = technique.onSuccess;

	// set the attack block
	update[GetSectionIdName(repeatingSection, newrowid, "technique-attackBlock")] =
		(technique.skill != "" || technique.defense != "" || technique.range != "" || technique.target != "" || technique.damage != "" || technique.damageType != "") ? "1" : "0";

	update[GetSectionIdName(repeatingSection, newrowid, "technique-attackBlockTarget")] = (technique.range != "" || technique.target != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-range")] = technique.range;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-target")] = technique.target;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-targetCode")] = technique.targetCode;

	update[GetSectionIdName(repeatingSection, newrowid, "technique-attackBlockSkill")] = (technique.skill != "" || technique.defense != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-skill")] = technique.skill;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-defense")] = technique.defense;

	// set the damage
	update[GetSectionIdName(repeatingSection, newrowid, "technique-attackBlockDamage")] = (technique.damage != "" || technique.damageType != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-damage")] = technique.damage;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-damageType")] = technique.damageType;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-element")] = technique.element;
	if (technique.damageType != "") {
		let damageString = `${FormatDamageString(technique.damage)}${technique.damageType}${technique.element == "" ? "" : ` [${technique.element}]`}`;
		update[GetSectionIdName(repeatingSection, newrowid, "technique-damageString")] = damageString;
	}

	// set special data
	update[GetSectionIdName(repeatingSection, newrowid, "technique-onHit")] = technique.onHit;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-specBonus")] = technique.specBonus;

	return update;
}




// ======== Damage Values

function FormatDamageString(element, condensed) {
	var output = "";
	var damage = "";
	var elements = element.split(";");
	for (var i = 0; i < elements.length; i++) {
		damage = ReplaceDamageDice(elements[i]).trim();
		if (condensed && damage == "Power") {
			damage = "P";
		}

		// form output string
		if (output != "") {
			output += "+ ";
		}
		output += `${damage} `;
	}
	return output;
}

function ReplaceDamageDice(element) {
	// Define a regular expression and the replacement string
	var regexH = /(\d+)h/g;
	var replacementH = '$1d3';
	var regexD = /(\d+)d/g;
	var replacementD = '$1d6';

	// Use String.replace() with the regular expression
	return element.replace(regexD, replacementD).replace(regexH, replacementH);
}




// ======== Page Progression

function GoToNextPage(update, nextPage, currentPage) {
	update[`${ToCamelCase(nextPage)}-previousPage`] = currentPage;
	update["characterSheetDisplayStyle"] = nextPage;
	return update;
}

