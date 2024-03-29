function GetAbilityScoreMod(score) {

	if (score <= 1) {
		return -3;
	}
	else if (score <= 6) {
		return -2;
	}
	else if (score <= 9) {
		return -1;
	}
	else if (score <= 12) {
		return 0;
	}
	else if (score <= 16) {
		return 1;
	}
	else if (score <= 21) {
		return 2;
	}
	else if (score <= 28) {
		return 3;
	}
	else if (score <= 37) {
		return 4;
	}
	else if (score <= 49) {
		return 5;
	}
	else if (score <= 63) {
		return 6;
	}
	else if (score <= 79) {
		return 7;
	}
	else if (score >= 80) {
		return 8;
	}

	return 0;
}
function GetProfBonusMod(score) {

	if (score <= 10) {
		return 3;
	}
	else if (score <= 20) {
		return 4;
	}
	else if (score <= 30) {
		return 5;
	}
	else if (score <= 40) {
		return 6;
	}
	else if (score >= 41) {
		return 7;
	}

	return 0;
}
function GetPathInfo(name) {
	switch (name.toLowerCase()) {
		case "common":
			return { "name": "Common", "description": "Common characters represent the majority of creatures found throughout Wuxing. They receive no special bonuses throughout character creation and as they advance.", "abilityScorePts": "30" }
		case "hero":
			return { "name": "Hero", "description": "Player characters typically fall into the Hero path. This path is represented by those who have the resolve to push boundaries and survive the impossible. This path grants characters bonuses at character creation, increased growths throughout their advancement, and some unique actions.", "abilityScorePts": "50" }
		case "paragon":
			return { "name": "Paragon", "description": "Paragon characters are those who excel beyond that of a hero into something very unique. They gain the bonuses of the Hero path characters plus additional benefits determined by the GM.", "abilityScorePts": "50" }
		default:
			return { "name": "", "description": "", "abilityScorePts": "" }

	}
}
function GetAncestryInfo(name) {
	switch (name.toLowerCase()) {
		case "human":
			return { "name": "Human", "description": "Humans are the most common intelligent ancestry in the world of Wuxing. There are multiple ethnicities of human, none granting any special bonuses but instead alter how they appear and are perceived in the world.", "moreDetails": "Ethnicities", "growths": { "CON": 1, "DEX": 1, "QCK": 1, "STR": 1, "CHA": 1, "INT": 1, "PER": 1, "WIL": 1, "hp": 0 }, "startingScores": { "CON": 7, "DEX": 7, "QCK": 7, "STR": 7, "CHA": 7, "INT": 7, "PER": 7, "WIL": 7 }, "hp": 15, "barrier": 0, "speed": 5, "spellForce": 1, "skillPointsPhysDefense": 1, "skillPointsSensDefense": 1, "skillPointsCoAcTc": 4, "skillPointsMgKnSo": 4, "skillPointsAny": 6, "gearSlots": "1 Head; 1 Body, 1 Arms, 1 Legs, 2 Hands", "techniques": "" }
		case "spirit":
			return { "name": "Spirit", "description": "Spirits are the principle definition of a magical creature. Their composition is made entirely from ether and an element aspected to it. Surviving off of ether alone, spirits’ lives can be eternal or short, depending on their will for survival, power, and entertainment.\n\nSpirits roam their boundless void of ether surviving and purveying the land of the material. Whenever they wish to, a spirit can manifest into the material world, possessing or living within anything they wish to experience life. However their reasoning to do so are as varied as humans.", "moreDetails": "", "growths": { "CON": 0, "DEX": 0, "QCK": 0, "STR": 0, "CHA": 1, "INT": 1, "PER": 1, "WIL": 1, "hp": 0 }, "startingScores": { "CON": 0, "DEX": 0, "QCK": 0, "STR": 0, "CHA": 5, "INT": 5, "PER": 5, "WIL": 5 }, "hp": 15, "barrier": 5, "speed": 5, "spellForce": 1, "skillPointsPhysDefense": 1, "skillPointsSensDefense": 1, "skillPointsCoAcTc": null, "skillPointsMgKnSo": 4, "skillPointsAny": 6, "gearSlots": "None", "techniques": "" }
		default:
			return { "name": "", "description": "", "moreDetails": "", "growths": [], "startingScores": [], "hp": 0, "barrier": 0, "speed": 0, "spellForce": 0, "skillPointsPhysDefense": 0, "skillPointsSensDefense": 0, "skillPointsCoAcTc": 0, "skillPointsMgKnSo": 0, "skillPointsAny": 0, "gearSlots": "", "techniques": "" }

	}
}
function GetAncestryTechniqueInfo(name) {
	switch (name.toLowerCase()) {
		case "#":
			return { "name": "#", "augmentBase": "undefined", "techniqueGroup": "undefined", "techniqueSubGroup": "undefined", "techniqueType": "undefined", "action": "undefined", "traits": "undefined", "limits": "undefined", "resourceCost": "undefined", "description": "undefined", "onSuccess": "undefined", "dConditions": "undefined", "tEffect": "undefined", "rEffect": "undefined", "trigger": "undefined", "requirement": "undefined", "prerequisite": "undefined", "skill": "undefined", "defense": "undefined", "range": "undefined", "rType": "undefined", "target": "undefined", "targetCode": "undefined", "dVal": "undefined", "dType": "undefined", "dBonus": "undefined", "damageType": "undefined", "element": "undefined", "augments": [] }
		case "n":
			return { "name": "N", "augmentBase": "undefined", "techniqueGroup": "undefined", "techniqueSubGroup": "undefined", "techniqueType": "undefined", "action": "undefined", "traits": "undefined", "limits": "undefined", "resourceCost": "undefined", "description": "undefined", "onSuccess": "undefined", "dConditions": "undefined", "tEffect": "undefined", "rEffect": "undefined", "trigger": "undefined", "requirement": "undefined", "prerequisite": "undefined", "skill": "undefined", "defense": "undefined", "range": "undefined", "rType": "undefined", "target": "undefined", "targetCode": "undefined", "dVal": "undefined", "dType": "undefined", "dBonus": "undefined", "damageType": "undefined", "element": "undefined", "augments": [] }
		case "/":
			return { "name": "/", "augmentBase": "undefined", "techniqueGroup": "undefined", "techniqueSubGroup": "undefined", "techniqueType": "undefined", "action": "undefined", "traits": "undefined", "limits": "undefined", "resourceCost": "undefined", "description": "undefined", "onSuccess": "undefined", "dConditions": "undefined", "tEffect": "undefined", "rEffect": "undefined", "trigger": "undefined", "requirement": "undefined", "prerequisite": "undefined", "skill": "undefined", "defense": "undefined", "range": "undefined", "rType": "undefined", "target": "undefined", "targetCode": "undefined", "dVal": "undefined", "dType": "undefined", "dBonus": "undefined", "damageType": "undefined", "element": "undefined", "augments": [] }
		case "a":
			return { "name": "A", "augmentBase": "undefined", "techniqueGroup": "undefined", "techniqueSubGroup": "undefined", "techniqueType": "undefined", "action": "undefined", "traits": "undefined", "limits": "undefined", "resourceCost": "undefined", "description": "undefined", "onSuccess": "undefined", "dConditions": "undefined", "tEffect": "undefined", "rEffect": "undefined", "trigger": "undefined", "requirement": "undefined", "prerequisite": "undefined", "skill": "undefined", "defense": "undefined", "range": "undefined", "rType": "undefined", "target": "undefined", "targetCode": "undefined", "dVal": "undefined", "dType": "undefined", "dBonus": "undefined", "damageType": "undefined", "element": "undefined", "augments": [] }
		default:
			return { "name": "", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }

	}
}
