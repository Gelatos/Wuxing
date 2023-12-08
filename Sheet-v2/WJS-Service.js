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
		capacity: 40,
		vitality: 2,
		traumaLimit: path == "Common" ? 1 : 3,
		kiCharge: 5,
		kiLimit: 25,
		chakra: 1,
		spellForceLimit: 9,
		kiChargeLimit: 30,
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

function SetTechniqueDataAugmentTechData(technique, baseTech) {
	if (technique.augmentBase == "") {
		return technique;
	}

	if (baseTech == undefined) {
		baseTech = GetAugmentBaseDatabaseTechnique(technique);
	}
	technique.augmentTech = baseTech;
	return technique;
}

function GetAugmentBaseDatabaseTechnique(technique) {
	// grab the base technique
	let newTechnique = {};
	switch (technique.techniqueGroup) {
		case "Ancestry":
			newTechnique = GetAncestryTechniqueInfo(technique.augmentBase);
			break;
		default:
			newTechnique = GetTechniquesInfo(technique.augmentBase);
			break;
	}
	return newTechnique;
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

	technique.username = "@{nickname}";
	update[GetSectionIdName(repeatingSection, id, "technique-select")] = technique.select != undefined ? technique.select : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-expand")] = autoExpand ? "on" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-isDatabase")] = isDatabase ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-edit")] = "0";

	let isBase = technique.augmentBase == "";
	update[GetSectionIdName(repeatingSection, id, "technique-header")] = isBase || technique.isSpecAugment ? technique.action : "Augment";
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
	var isWeapon = technique.traits.toLowerCase().indexOf("armament") >= 0 || technique.traits.toLowerCase().indexOf("arsenal") >= 0;
	update[GetSectionIdName(repeatingSection, id, "technique-functionBlock")] =
		(technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.prerequisite != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-traits")] = technique.traits;
	update = SetTechniqueDataTraits(update, repeatingSection, id, technique.traits);

	update[GetSectionIdName(repeatingSection, id, "technique-trigger")] = technique.trigger;
	update[GetSectionIdName(repeatingSection, id, "technique-requirement")] = technique.requirement;
	update[GetSectionIdName(repeatingSection, id, "technique-prerequisite")] = technique.prerequisite;
	update[GetSectionIdName(repeatingSection, id, "technique-resourceCost")] = technique.resourceCost;
	update[GetSectionIdName(repeatingSection, id, "technique-isMultiple")] = isMultiple ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-isWeapon")] = isWeapon ? "1" : "0";

	// set the description
	update[GetSectionIdName(repeatingSection, id, "technique-descriptionBlock")] = (technique.description != "" || technique.onSuccess != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-description")] = technique.description;
	update[GetSectionIdName(repeatingSection, id, "technique-onSuccess")] = technique.onSuccess;

	// set the attack block
	update[GetSectionIdName(repeatingSection, id, "technique-attackBlock")] =
		(technique.skill != "" || technique.defense != "" || technique.rType != "" || technique.target != "" || (technique.dVal != "" && technique.dVal != 0) || technique.damageType != "") ? "1" : "0";

	update[GetSectionIdName(repeatingSection, id, "technique-attackBlockTarget")] = (technique.rType != "" || technique.target != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-range")] = technique.range;
	update[GetSectionIdName(repeatingSection, id, "technique-rType")] = technique.rType;
	update[GetSectionIdName(repeatingSection, id, "technique-target")] = technique.target;
	update[GetSectionIdName(repeatingSection, id, "technique-targetCode")] = technique.targetCode;

	update[GetSectionIdName(repeatingSection, id, "technique-attackBlockSkill")] = (technique.skill != "" || technique.defense != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-skill")] = technique.skill;
	update[GetSectionIdName(repeatingSection, id, "technique-defense")] = technique.defense;

	// set the damage
	update[GetSectionIdName(repeatingSection, id, "technique-attackBlockDamage")] = (technique.damage != "" || technique.damageType != "") ? "1" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-dieValue")] = technique.dVal;
	update[GetSectionIdName(repeatingSection, id, "technique-dieType")] = technique.dType;
	update[GetSectionIdName(repeatingSection, id, "technique-addPower")] = technique.dBonus.indexOf("Power") >= 0 ? "on" : "0";
	update[GetSectionIdName(repeatingSection, id, "technique-damageType")] = technique.damageType;
	update[GetSectionIdName(repeatingSection, id, "technique-element")] = technique.element;
	update[GetSectionIdName(repeatingSection, id, "technique-damageString")] = Format.DamageString(technique);
	update[GetSectionIdName(repeatingSection, id, "technique-onInfo")] = TechniqueHandler.GetRollTemplate(technique);
	update[GetSectionIdName(repeatingSection, id, "technique-onUse")] = TechniqueHandler.GetConsumeUsePost(technique);

	return update;
}

function SetAugmentTechnique(technique, baseTechnique) {

	// passive and permanent techniques are displayed exactly as is when referenced
	if (technique.techniqueType == "Permanent" || technique.techniqueType == "Passive") {
		return technique;
	}

	if (baseTechnique == undefined) {
		return technique;
	}
	
	// replacing statistics
	baseTechnique.isSpecAugment = true;
	baseTechnique.name = technique.name;
	baseTechnique.augmentBase = technique.augmentBase;
	if (technique.techniqueGroup != "") {
		baseTechnique.techniqueGroup = technique.techniqueGroup;
	}
	if (technique.techniqueSubGroup != "") {
		baseTechnique.techniqueSubGroup = technique.techniqueSubGroup;
	}
	if (technique.techniqueType != "") {
		baseTechnique.techniqueType = technique.techniqueType;
	}
	if (technique.action != "") {
		baseTechnique.action = technique.action;
	}
	if (technique.traits != "") {
		baseTechnique.traits = technique.traits;
	}
	if (technique.limits != "") {
		baseTechnique.limits = technique.limits;
	}
	if (technique.resourceCost != "") {
		baseTechnique.resourceCost = technique.resourceCost;
	}
	if (technique.trigger != "") {
		baseTechnique.trigger = technique.trigger;
	}
	if (technique.requirement != "") {
		baseTechnique.requirement = technique.requirement;
	}
	if (technique.prerequisite != "") {
		baseTechnique.prerequisite = technique.prerequisite;
	}
	if (technique.skill != "") {
		baseTechnique.skill = technique.skill;
	}
	if (technique.defense != "") {
		baseTechnique.defense = technique.defense;
	}
	if (technique.range != "") {
		baseTechnique.range = technique.range;
	}
	if (technique.rType != "") {
		baseTechnique.rType = technique.rType;
	}
	if (technique.target != "") {
		baseTechnique.target = technique.target;
	}
	if (technique.targetCode != "") {
		baseTechnique.targetCode = technique.targetCode;
	}
	if (technique.onHit != "") {
		baseTechnique.onHit = technique.onHit;
	}
	if (technique.dVal != "") {
		baseTechnique.dVal = technique.dVal;
	}
	if (technique.dType != "") {
		baseTechnique.dType = technique.dType;
	}
	if (technique.dBonus != "") {
		baseTechnique.dBonus = technique.dBonus;
	}
	if (technique.damageType != "") {
		baseTechnique.damageType = technique.damageType;
	}
	if (technique.element != "") {
		baseTechnique.element = technique.element;
	}
	if (technique.specBonus != "") {
		baseTechnique.specBonus = technique.specBonus;
	}

	// additive statistics
	if (technique.description != "") {
		if (baseTechnique.description != "") {
			baseTechnique.description += "\n";
		}
		baseTechnique.description += technique.description;
	}
	if (technique.onSuccess != "") {
		if (baseTechnique.onSuccess != "") {
			baseTechnique.onSuccess += "\n";
		}
		baseTechnique.onSuccess += technique.onSuccess;
	}

	return baseTechnique;
}

function SetTechniqueDataTraits(update, repeatingSection, id, traits) {

	var traitsDb = WuxingTraits.GetDictionary(traits, "technique");
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

function CreateTechniqueDataFromRepeatingSection(attrArray, repeatingSection, id) {

}




// ======== Items

function SetItemData(update, repeatingSection, id, item, autoExpand) {

	update[GetSectionIdName(repeatingSection, id, "item-expand")] = autoExpand ? "on" : "0";

	update[GetSectionIdName(repeatingSection, id, "item-name")] = item.name;
	update[GetSectionIdName(repeatingSection, id, "item-type")] = item.type;
	update[GetSectionIdName(repeatingSection, id, "item-group")] = item.group;
	update[GetSectionIdName(repeatingSection, id, "item-traits")] = item.traits;
	update = SetItemDataTraits(update, repeatingSection, id, item.traits);
	update[GetSectionIdName(repeatingSection, id, "item-bulk")] = item.bulk;
	update[GetSectionIdName(repeatingSection, id, "item-valuetier")] = item.value;
	update[GetSectionIdName(repeatingSection, id, "item-valuetype")] = "CP";
	update[GetSectionIdName(repeatingSection, id, "item-value")] = GetItemValueInCP(item);

	// set crafting rules
	update[GetSectionIdName(repeatingSection, id, "item-complexity")] = item.complexity == "" ? "0:Artisan" : item.complexity;
	update[GetSectionIdName(repeatingSection, id, "item-time")] = item.time;
	update[GetSectionIdName(repeatingSection, id, "item-components")] = item.components;

	switch(item.type) {
		case "Weapon":
		case "Chest Armor":
		case "Head Armor":
		case "Arms Armor":
		case "Legs Armor":
			update[GetSectionIdName(repeatingSection, id, "item-abilities")] = item.abilities;
			update = SetItemDataAbilities(update, repeatingSection, id, item.abilities);
			update[GetSectionIdName(repeatingSection, id, "item-skill")] = item.skill;
			update[GetSectionIdName(repeatingSection, id, "item-damage")] = item.dmg;
			update[GetSectionIdName(repeatingSection, id, "item-damageType")] = item.damageType;
			update[GetSectionIdName(repeatingSection, id, "item-dieValue")] = item.dVal;
			update[GetSectionIdName(repeatingSection, id, "item-dieType")] = item.dType;
			update[GetSectionIdName(repeatingSection, id, "item-addPower")] = item.dBonus.indexOf("Power") >= 0 ? "on" : "0";
			update[GetSectionIdName(repeatingSection, id, "item-damageString")] = Format.DamageString(item);
			update[GetSectionIdName(repeatingSection, id, "item-range")] = item.range;
			update[GetSectionIdName(repeatingSection, id, "item-threat")] = item.threat;
			update[GetSectionIdName(repeatingSection, id, "item-block")] = item.block;
			update[GetSectionIdName(repeatingSection, id, "item-armor")] = item.armor;
			update[GetSectionIdName(repeatingSection, id, "item-reflexPen")] = item.reflexPen;
			update[GetSectionIdName(repeatingSection, id, "item-speedPen")] = item.speedPen;
		break;
	}

	return update;
}

function SetItemDataTraits(update, repeatingSection, id, traits) {

	var traitsDb = WuxingTraits.GetDictionary(traits, "item");
	for (var i = 0; i < 6; i++) {
		if (i < traitsDb.length) {
			update[GetSectionIdName(repeatingSection, id, "item-traits" + i)] = traitsDb[i].name;
			update[GetSectionIdName(repeatingSection, id, "item-traits" + i + "Desc")] = traitsDb[i].description;
		} else {
			update[GetSectionIdName(repeatingSection, id, "item-traits" + i)] = "0";
			update[GetSectionIdName(repeatingSection, id, "item-traits" + i + "Desc")] = "";
		}
	}
	return update;
}

function SetItemDataAbilities(update, repeatingSection, id, abilities) {

	var traitsDb = WuxingTraits.GetDictionary(abilities, "ability");
	for (var i = 0; i < 6; i++) {
		if (i < traitsDb.length) {
			update[GetSectionIdName(repeatingSection, id, "item-ability" + i)] = traitsDb[i].name;
			update[GetSectionIdName(repeatingSection, id, "item-ability" + i + "Desc")] = traitsDb[i].description;
		} else {
			update[GetSectionIdName(repeatingSection, id, "item-ability" + i)] = "0";
			update[GetSectionIdName(repeatingSection, id, "item-ability" + i + "Desc")] = "";
		}
	}
	return update;
}

function GetItemValueInCP(itemData) {

  var baseValue = 10;
  var incrementer = itemData.value;
  var valueMultiplier = 4;
  while (incrementer > 0) {
    baseValue *= valueMultiplier;
    if (valueMultiplier > 2) {
      valueMultiplier--;
    }
    incrementer--;
  }
  var bulkValue = baseValue / 20;

  return baseValue + (itemData.bulk * bulkValue);
}

function CreateItemDataFromRepeatingSection(attrArray, repeatingSection, id) {

	let itemData = GetGearInfo("");
	itemData.name = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-name"));
	itemData.type = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-type"));
	itemData.group = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-group"));
	itemData.traits = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-traits"));
	itemData.bulk = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-bulk"));
	itemData.value = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-valuetier"));
	itemData.complexity = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-complexity"));
	itemData.time = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-time"));
	itemData.components = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-components"));
	return itemData;
}

function CreateEquipmentItemDataFromRepeatingSection(attrArray, repeatingSection, id) {

	let itemData = CreateItemDataFromRepeatingSection(attrArray, repeatingSection, id);
	itemData.abilities = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-abilities"));
	itemData.skill = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-skill"));
	itemData.dVal = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-dieValue"));
	itemData.dType = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-dieType"));
	itemData.dBonus = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-addPower")) == "on" ? "Power" : "";
	itemData.damageType = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-damageType"));
	itemData.range = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-range"));
	itemData.threat = AttrParseString(attrArray, GetSectionIdName(repeatingSection, id, "item-threat"));
	itemData.block = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-block"));
	itemData.armor = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-armor"));
	itemData.reflexPen = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-reflexPen"));
	itemData.speedPen = AttrParseInt(attrArray, GetSectionIdName(repeatingSection, id, "item-speedPen"));
	log (JSON.stringify(itemData));
	return itemData;
}

function ConvertEquipmentDataToWeaponData(itemData) {
	let weaponData = {};

	weaponData.name = itemData.name;
	weaponData.traits = itemData.traits;
	weaponData.abilities = itemData.abilities;
	weaponData.skill = itemData.skill;
	weaponData.damageString = Format.DamageString(itemData);
	weaponData.dType = itemData.dType;
	weaponData.dVal = itemData.dVal;
	weaponData.dBonus = itemData.dBonus;
	weaponData.damageType = itemData.damageType;
	weaponData.range = itemData.range;
	weaponData.threat = itemData.threat;
	log ("post: " + JSON.stringify(itemData));
	return weaponData;
}




// ======== General Sheetworker

function GoToNextPage(update, nextPage, currentPage) {
	update[`${Format.ToCamelCase(nextPage)}-previousPage`] = currentPage;
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

function log (output) {
	console.log(output);
}

