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

function AttrParseJSONDictionary(attrArray, fieldName) {
	return attrArray[fieldName] == undefined ? defaultValue : attrArray[fieldName] == "" ? CreateDictionary() : JSON.parse(attrArray[fieldName]);
}


// ======== Section Ids
function GetSectionIdValues(idarray, repeatingSection, variableArray) {
	var output = [];

	_.each(idarray, function (currentID) {
		_.each(variableArray, function (variableName) {
			output.push(GetSectionIdName(repeatingSection, currentID, variableName));
		});
	});

	return output;
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

function SetTechniqueDataList(update, repeatingSection, techniqueList, autoExpand, isDatabase) {

	// start by clearing the section Ids
	let newrowid;
	let technique;

	// iterate through each technique
	for (let i = 0; i < techniqueList.length; i++) {
		newrowid = generateRowID();
		technique = techniqueList[i];
		update = SetTechniqueData(update, repeatingSection, newrowid, technique, autoExpand, isDatabase);
	}

	return update;

}

function SetTechniqueSelect(technique, selectedTechniques) {
	technique.select = selectedTechniques.keys.includes(technique.name);
	return technique;
}

function SetTechniqueData(update, repeatingSection, id, technique, autoExpand, isDatabase) {

	update[GetSectionIdName(repeatingSection, id, "technique-select")] = technique.select != undefined ? technique.select : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-expand")] = autoExpand ? "on" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-isDatabase")] = isDatabase ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-edit")] = "0";

	let isBase = technique.augmentBase == "";
	update[GetSectionIdName(repeatingSection, id, "technique-header")] = isBase ? technique.action : "Augment";
	update[GetSectionIdName(repeatingSection, id, "technique-name")] = technique.name;
	update[GetSectionIdName(repeatingSection, id, "technique-isBase")] = isBase ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-augmentBase")] = technique.augmentBase;
	update[GetSectionIdName(repeatingSection, id, "technique-displaygroup")] = technique.techniqueSubGroup == "" ? technique.techniqueGroup : technique.techniqueSubGroup;
	update[GetSectionIdName(repeatingSection, id, "technique-group")] = technique.techniqueGroup;
	update[GetSectionIdName(repeatingSection, id, "technique-subgroup")] = technique.techniqueSubGroup;
	update[GetSectionIdName(repeatingSection, id, "technique-type")] = technique.techniqueType;
	update[GetSectionIdName(repeatingSection, id, "technique-action")] = technique.action;
	update[GetSectionIdName(repeatingSection, id, "technique-limits")] = technique.limits;

	// set the function block
	var isMultiple = technique.traits.toLowerCase().indexOf("multiple") >= 0;
	update[GetSectionIdName(repeatingSection, id, "technique-functionBlock")] =
		(technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.prerequisite != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-traits")] = technique.traits;
	update = SetTechniqueDataTraits(update, repeatingSection, id, technique.traits);

	update[GetSectionIdName(repeatingSection, id, "technique-trigger")] = technique.trigger;
	update[GetSectionIdName(repeatingSection, id, "technique-requirement")] = technique.requirement;
	update[GetSectionIdName(repeatingSection, id, "technique-prerequisite")] = technique.prerequisite;
	update[GetSectionIdName(repeatingSection, id, "technique-resourceCost")] = technique.resourceCost;
	update[GetSectionIdName(repeatingSection, id, "technique-isMultiple")] = isMultiple ? "1" : "0";

	// set the description
	update[GetSectionIdName(repeatingSection, id, "technique-descriptionBlock")] = (technique.description != "" || technique.onSuccess != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-description")] = technique.description;
	update[GetSectionIdName(repeatingSection, id, "technique-onSuccess")] = technique.onSuccess;

	// set the attack block
	update[GetSectionIdName(repeatingSection, id, "technique-attackBlock")] =
		(technique.skill != "" || technique.defense != "" || technique.range != "" || technique.target != "" || technique.damage != "" || technique.damageType != "") ? "1" : "0";

	update[GetSectionIdName(repeatingSection, id, "technique-attackBlockTarget")] = (technique.range != "" || technique.target != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-range")] = technique.range;
	update[GetSectionIdName(repeatingSection, id, "technique-target")] = technique.target;
	update[GetSectionIdName(repeatingSection, id, "technique-targetCode")] = technique.targetCode;

	update[GetSectionIdName(repeatingSection, id, "technique-attackBlockSkill")] = (technique.skill != "" || technique.defense != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-skill")] = technique.skill;
	update[GetSectionIdName(repeatingSection, id, "technique-defense")] = technique.defense;

	// set the damage
	update[GetSectionIdName(repeatingSection, id, "technique-attackBlockDamage")] = (technique.damage != "" || technique.damageType != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-damage")] = technique.damage;
	update[GetSectionIdName(repeatingSection, id, "technique-damageType")] = technique.damageType;
	update[GetSectionIdName(repeatingSection, id, "technique-element")] = technique.element;
	if (technique.damageType != "") {
		update = SetTechniqueDataDamageString(update, repeatingSection, id, technique.damage, technique.damageType, technique.element);
	}

	// set use data
	update = SetTechniqueUseData(update, technique, repeatingSection, id);

	return update;
}

function SetTechniqueUseData(update, technique, repeatingSection, id) {

	let output = "";

	// if this is an augment, incorporate the base into the rolltemplate
	if (technique.augmentBase != "") {
		technique = SetAugmentTechnique(technique);
	}
	else {
		output += "{{type-base=1}} ";
	}

	output += `{{Username=@{nickname}}}`;
	output += `{{Name=${technique.name}}}`;
	output += `{{Type=${technique.techniqueType}}}`;
	output += `{{type-${technique.techniqueType}=1}} `;
	output += `{{Group=${technique.techniqueSubGroup == "" ? technique.techniqueGroup : technique.techniqueSubGroup}}}`;

	// create the action line
	let actionLine = "";
	if (technique.action != "") {
		output += `{{type-${technique.action}=1}} `;
		actionLine += technique.action;
	}
	if (technique.limits != "") {
		if (actionLine != "") {
			actionLine += "; ";
		}
		actionLine += technique.limits;
	}
	if (technique.resourceCost != "") {
		if (actionLine != "") {
			actionLine += "; ";
		}
		actionLine += technique.resourceCost;
	}
	if (actionLine != "") {
		output += `{{ActionLine=${actionLine}}} `;
	}
	if (technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.prerequisite != "") {
		output += "{{type-FunctionBlock=1}} ";

		if (technique.traits != "") {
			var traitsDb = GetTraitsDictionary(technique.traits, "technique");
			for (var i = 0; i < traitsDb.length; i++) {
				if (traitsDb[i].name.indexOf("Armament") >= 0) {
					output += "{{weapon=@{technique-equippedWeapon}}} ";
				}
				output += `{{Trait${i}=${traitsDb[i].name}}} {{Trait${i}Desc=${traitsDb[i].description}}} `;
			}
		}
		if (technique.trigger != "") {
			output += `{{Trigger=${technique.trigger}}} `;
		}
		if (technique.requirement != "") {
			output += `{{Requirement=${technique.requirement}}} `;
		}
		if (technique.prerequisite != "") {
			output += `{{Prerequisites=${technique.prerequisite}}} `;
		}
	}
	if (technique.skill != "" || technique.defense != "" || technique.range != "" || technique.target != "" || technique.damage != "" || technique.damageType != "") {
		output += "{{type-AttackBlock=1}} ";

		if (technique.range != "" || technique.target != "") {
			output += "{{type-AttackBlockTarget=1}} ";

			if (technique.range != "") {
				output += `{{Range=${technique.range}}} `;
			}
			if (technique.target != "") {
				output += `{{Target=${technique.target}}} `;
			}
		}
		if (technique.skill != "") {
			let skill = "";
			if (technique.defense != "") {
				if (technique.defense.indexOf("DC")) {
					skill = technique.defense;
				}
				else {
					skill = `${technique.defense} Check`;
				}
			}
			else {
				skill = "DC 15";
			}
			skill = `${technique.skill} vs. ${skill}`;
			output += `{{SkillString=${skill}}} `;
		}
		if (technique.damage != "" || technique.damageType != "") {
			let damageString = `${FormatDamageString(technique.damage)}${technique.damageType}${technique.element == "" ? "" : ` [${technique.element}]`}`;
			output += `{{DamageString=${damageString}}} `;
		}
	}
	if (technique.description != "" || technique.onSuccess != "") {
		output += "{{type-DescBlock=1}} ";
		if (technique.description != "") {
			output += `{{Desc=${technique.description}}} `;
		}
		if (technique.onSuccess != "") {
			output += `{{OnHit=${technique.onSuccess}}} `;
		}
	}

	// add technique data for the api
	let usedTechData = JSON.stringify({
		resources: technique.resourceCost,
		traits: technique.traits,
		onSuccess: technique.onSuccess,
		onHit: technique.onHit,
		specBonus: technique.specBonus,

		hasCheck: (technique.skill != "" || technique.defense != "") ? true : false,
		skill: technique.skill,
		defense: technique.defense,

		hasDamage: (technique.damage != "" || technique.damageType != "") ? true : false,
		damage: technique.damage,
		damageType: technique.damageType,
		element: technique.element
	});
	output += `##${usedTechData}`;

	output = `&{template:technique} ${output.trim()}`;
	update[GetSectionIdName(repeatingSection, id, "technique-onUse")] = output;
	return update;
}

function SetAugmentTechnique(technique) {

	// passive and permanent techniques are displayed exactly as is when referenced
	if (technique.techniqueType == "Permanent" || technique.techniqueType == "Passive") {
		return technique;
	}

	// grab the base technique
	let newTechnique = {};
	switch (technique.techniqueGroup) {
		case "Class":
			newTechnique = GetClassTechniquesInfo(technique.augmentBase);
			break;
		case "Ancestry":
			newTechnique = GetAncestryTechniqueInfo(technique.augmentBase);
			break;
		default:
			newTechnique = GetTechniquesInfo(technique.augmentBase);
	}
	
	// replacing statistics
	newTechnique.name = technique.name;
	newTechnique.augmentBase = technique.augmentBase;
	if (technique.techniqueGroup != "") {
		newTechnique.techniqueGroup = technique.techniqueGroup;
	}
	if (technique.techniqueSubGroup != "") {
		newTechnique.techniqueSubGroup = technique.techniqueSubGroup;
	}
	if (technique.techniqueType != "") {
		newTechnique.techniqueType = technique.techniqueType;
	}
	if (technique.action != "") {
		newTechnique.action = technique.action;
	}
	if (technique.traits != "") {
		newTechnique.traits = technique.traits;
	}
	if (technique.limits != "") {
		newTechnique.limits = technique.limits;
	}
	if (technique.resourceCost != "") {
		newTechnique.resourceCost = technique.resourceCost;
	}
	if (technique.trigger != "") {
		newTechnique.trigger = technique.trigger;
	}
	if (technique.requirement != "") {
		newTechnique.requirement = technique.requirement;
	}
	if (technique.prerequisite != "") {
		newTechnique.prerequisite = technique.prerequisite;
	}
	if (technique.skill != "") {
		newTechnique.skill = technique.skill;
	}
	if (technique.defense != "") {
		newTechnique.defense = technique.defense;
	}
	if (technique.range != "") {
		newTechnique.range = technique.range;
	}
	if (technique.target != "") {
		newTechnique.target = technique.target;
	}
	if (technique.targetCode != "") {
		newTechnique.targetCode = technique.targetCode;
	}
	if (technique.onHit != "") {
		newTechnique.onHit = technique.onHit;
	}
	if (technique.damage != "") {
		newTechnique.damage = technique.damage;
	}
	if (technique.damageType != "") {
		newTechnique.damageType = technique.damageType;
	}
	if (technique.element != "") {
		newTechnique.element = technique.element;
	}
	if (technique.specBonus != "") {
		newTechnique.specBonus = technique.specBonus;
	}

	// additive statistics
	if (technique.description != "") {
		if (newTechnique.description != "") {
			newTechnique.description += "\n";
		}
		newTechnique.description += technique.description;
	}
	if (technique.onSuccess != "") {
		if (newTechnique.onSuccess != "") {
			newTechnique.onSuccess += "\n";
		}
		newTechnique.onSuccess += technique.onSuccess;
	}

	return newTechnique;
}

function SetTechniqueDataTraits(update, repeatingSection, id, traits) {

	var traitsDb = GetTraitsDictionary(traits, "technique");
	for (var i = 0; i < 6; i++) {
		if (i < traitsDb.length) {
			update[GetSectionIdName(repeatingSection, id, "technique-traits" + i)] = traitsDb[i].name;
			update[GetSectionIdName(repeatingSection, id, "technique-traits" + i + "Desc")] = traitsDb[i].description;
		} else {
			update[GetSectionIdName(repeatingSection, id, "technique-traits" + i)] = "0";
			update[GetSectionIdName(repeatingSection, id, "technique-traits" + i + "Desc")] = "";
		}
	}
	return update;
}

function SetTechniqueDataDamageString(update, repeatingSection, id, damage, damageType, element) {
	let damageString = `${FormatDamageString(damage)}${damageType}${element == "" ? "" : ` [${element}]`}`;
	update[GetSectionIdName(repeatingSection, id, "technique-damageString")] = damageString;

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




// ======== General Sheetworker

function GoToNextPage(update, nextPage, currentPage) {
	update[`${ToCamelCase(nextPage)}-previousPage`] = currentPage;
	update["characterSheetDisplayStyle"] = nextPage;
	return update;
}

function UpdateDefaultActiveCheckbox(eventinfo, correctNewValue) {
	
	if (eventinfo.previousValue == eventinfo.newValue) {
		let update = {};
		eventinfo.newValue = correctNewValue == undefined ? "0" : correctNewValue;
		update[eventinfo.sourceAttribute] = eventinfo.newValue;
		setAttrs(update, { silent: true });
	}
}

function Log (output) {
	console.log(output);
}

