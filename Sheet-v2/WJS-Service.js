// ======== Attribute Values
function AttrParseString(attrArray, fieldName, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = "";
	}
	return attrArray[fieldName] == undefined ? defaultValue : attrArray[fieldName];
}

function AttrParseInt(attrArray, fieldName, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = 0;
	}
	return isNaN(parseInt(attrArray[fieldName])) ? defaultValue : parseInt(attrArray[fieldName]);
}

function AttrParseFloat(attrArray, fieldName, defaultValue) {
	if (defaultValue == undefined) {
		defaultValue = 0;
	}
	return isNaN(parseFloat(attrArray[fieldName])) ? defaultValue : parseFloat(attrArray[fieldName]);
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

	update[`${updateAttr}CON`] = abilityScoreArray.CON + suffix;
	update[`${updateAttr}DEX`] = abilityScoreArray.DEX + suffix;
	update[`${updateAttr}QCK`] = abilityScoreArray.QCK + suffix;
	update[`${updateAttr}STR`] = abilityScoreArray.STR + suffix;
	update[`${updateAttr}CHA`] = abilityScoreArray.CHA + suffix;
	update[`${updateAttr}INT`] = abilityScoreArray.INT + suffix;
	update[`${updateAttr}PER`] = abilityScoreArray.PER + suffix;
	update[`${updateAttr}WIL`] = abilityScoreArray.WIL + suffix;
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

function AddGrowths(array1, array2) {

	let output = AddAbilityScores(array1, array2);

	output.hp = (array1.hp + array2.hp);
	output.vitality = (array1.vitality + array2.vitality);
	output.kiCharge = (array1.kiCharge + array2.kiCharge);
	output.spellForce = (array1.spellForce + array2.spellForce);

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

function SetTechniqueDataList(update, repeatingSection, techniqueList) {

	// start by clearing the section Ids
	ClearAllSectionIds(repeatingSection);
	let newrowid;

	// iterate through each technique
	for (let i = 0; i < techniqueList.length; i++) {
		newrowid = generateRowID();
		update = SetTechniqueData(update, newrowid, repeatingSection, techniqueList[i]);

		// iterate through the augments and get them as well
		for (let j = 0; j < techniqueList[i].augments.length; j++) {
			newrowid = generateRowID();
			update = SetTechniqueData(update, newrowid, repeatingSection, techniqueList[i].augments[j]);
		}
	}

	return update;

}

function SetTechniqueData(update, newrowid, repeatingSection, technique) {

	update[GetSectionIdName(repeatingSection, newrowid, "technique-header")] = technique.augmentBase == "" ? technique.action : "Augment";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-name")] = technique.name;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-augmentBase")] = technique.augmentBase == "" ? "Base" : technique.augmentBase;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-group")] = technique.techniqueSubGroup == "" ? technique.techniqueGroup : technique.techniqueSubGroup;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-type")] = technique.techniqueType;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-action")] = technique.action;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-limits")] = technique.limits;

	// set the function block
	update[GetSectionIdName(repeatingSection, newrowid, "technique-functionBlock")] =
		(technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.prerequisite != "" || technique.resourceCost != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, newrowid, "technique-traits")] = technique.traits;
	var traitsDb = GetTraitsDictionary(technique.traits, "technique");
	for (var i = 0; i < 6; i++) {
		if (i < traitsDb.length) {
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i)] = traitsDb[i].name;
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i + "Desc")] = traitsDb[i].description;
		} else {
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i)] = "";
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i + "Desc")] = "";
		}
	}
	update[GetSectionIdName(repeatingSection, newrowid, "technique-trigger")] = technique.trigger;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-requirement")] = technique.requirement;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-prerequisite")] = technique.prerequisite;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-resourceCost")] = technique.resourceCost;

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

