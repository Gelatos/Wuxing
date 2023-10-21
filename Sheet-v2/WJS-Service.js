// Section Ids
function GetSectionIdValues (idarray, sectionName, variableArray) {
	var output = [];

	_.each(idarray, function (currentID) {
		_.each(variableArray, function (variableName) {
			output.push(GetSectionIdName(sectionName, currentID, variableName));
		});
	});

	return output;
}

function GetRepeatingSectionIdFromId (id, repeatingSection) {
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

function RemoveSectionId (repeatingSection, repeatingSectionId) {

	removeRepeatingRow(`${repeatingSection}_${repeatingSectionId}`);
}

// Ability Scores

function SetAbilityScoreUpdate(update, updateAttr, abilityScoreArray) {

	update[`${updateAttr}CON`] = abilityScoreArray.CON;
	update[`${updateAttr}DEX`] = abilityScoreArray.DEX;
	update[`${updateAttr}QCK`] = abilityScoreArray.QCK;
	update[`${updateAttr}STR`] = abilityScoreArray.STR;
	update[`${updateAttr}CHA`] = abilityScoreArray.CHA;
	update[`${updateAttr}INT`] = abilityScoreArray.INT;
	update[`${updateAttr}PER`] = abilityScoreArray.PER;
	update[`${updateAttr}WIL`] = abilityScoreArray.WIL;
	return update;
}

function GetAbilityScoreFieldNames(updateAttr) {
	return [`${updateAttr}CON`, `${updateAttr}DEX`, `${updateAttr}QCK`, `${updateAttr}STR`, `${updateAttr}CHA`, `${updateAttr}INT`, `${updateAttr}PER`, `${updateAttr}WIL`];
}

function GetAbilityScoreFieldIntegerArray(updateAttr, abilityScoreArray) {

	let output = [];
	output["CON"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}CON`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}CON`]);
	output["DEX"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}DEX`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}DEX`]);
	output["QCK"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}QCK`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}QCK`]);
	output["STR"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}STR`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}STR`]);
	output["CHA"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}CHA`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}CHA`]);
	output["INT"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}INT`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}INT`]);
	output["PER"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}PER`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}PER`]);
	output["WIL"] = isNaN(parseInt(abilityScoreArray[`${updateAttr}WIL`])) ? 0 : parseInt(abilityScoreArray[`${updateAttr}WIL`]);
	
	return output;
}

// Techniques

function GetTraitsDictionary (traits, traitType) {

	let output = [];
	if (traits != undefined) {
		let keywordsSplit = traits.split(";");

		let name = "";
		let lookup = "";
		let traitInfo;

		for(let i = 0; i < keywordsSplit.length; i++) {
			name = "" + keywordsSplit[i].trim();

			if (name.includes ("Impact") || name.includes ("Explosive")) {
			name = ReplaceDamageDice(name);
			}

			lookup = name;
			if (lookup.indexOf ("(") >= 0) {
				lookup = lookup.replace(/\([^)]*\)/g, "(X)");
			}
			
			switch(traitType.toLowerCase()) {
				case "technique": traitInfo = GetTechniqueTraitsInfo(lookup); break;
				case "weapon": traitInfo = GetWeaponTraitsInfo(lookup); break;
				case "ability": traitInfo = GetAbilityTraitsInfo(lookup); break;
				case "material": traitInfo = GetMaterialTraitsInfo(lookup); break;
			}
			traitInfo.name = name;
			output.push (traitInfo);
		}
	}

	return output;
}

function GetTechniqueDataArray (type, techniques) {
	let output = [];
	let techniqueList = techniques.split(";");
	let tech = "";
	let technique;

	for (let i = 0; i < techniqueList.length; i++) {
		tech = techniqueList[i].trim();
		console.log ("searching tech: " + tech);
		switch(type.toLowerCase()) {
			case "ancestry": 
				technique = GetAncestryTechniqueInfo(tech);
				console.log ("Found tech: " + technique.name);
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

