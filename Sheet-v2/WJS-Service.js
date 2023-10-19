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

// Techniques

function GetTraitsDictionary (traits) {

	var output = [];
	if (traits != undefined) {
		var splits = traits.split(",");

		var count = 6;
		for (var i = 0; i < splits.length; i++) {

			var traitInfo = GetTraitInfo(splits[i].trim());
			if (traitInfo.name != "") {
				output.push(traitInfo);
				count--;
				if (count <= 0) {
					break;
				}
			}
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
	var traitsDb = GetTraitsDictionary(technique.traits);
	for (var i = 0; i < 6; i++) {
		if (i < traitsDb.length) {
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i)] = traitsDb[i].name;
			update[GetSectionIdName(repeatingSection, newrowid, "technique-traits" + i + "Desc")] = traitsDb[i].desc;
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
	update[GetSectionIdName(repeatingSection, newrowid, "technique-description")] = technique.description;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-onSuccess")] = technique.onSuccess;

	// set the attack block
	update[GetSectionIdName(repeatingSection, newrowid, "technique-attackBlock")] = 
	(technique.skill != "" || technique.defense != "" || technique.range != "" || technique.target != "" || technique.damage != "" || technique.damageType != "") ? "1" : "0";

	update[GetSectionIdName(repeatingSection, newrowid, "technique-skill")] = technique.skill;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-defense")] = technique.defense;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-range")] = technique.range;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-target")] = technique.target;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-targetCode")] = technique.targetCode;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-onHit")] = technique.onHit;

	// set the damage
	update[GetSectionIdName(repeatingSection, newrowid, "technique-damage")] = technique.damage;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-damageType")] = technique.damageType;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-element")] = technique.element;
	update[GetSectionIdName(repeatingSection, newrowid, "technique-specBonus")] = technique.specBonus;
	if (technique.damageType != "") {
		let damageString = `${FormatDamageString(technique.damage)}${technique.damageType}${technique.element == "" ? "" : ` [${technique.element}]`}`;
		update[GetSectionIdName(repeatingSection, newrowid, "technique-damageString")] = damageString;
	}

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

