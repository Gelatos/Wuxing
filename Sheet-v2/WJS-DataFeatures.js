// ======== Character Sheet Features
function GetDefensiveSkillsList(isFields) {
	if (isFields) {
		return ["brace", "insight", "notice", "presence", "reflex", "resolve"];
	}
	else {
		return ["Brace", "Insight", "Notice", "Presence", "Reflex", "Resolve"];
	}
}

function GetMartialSkillsList(isFields) {
	if (isFields) {
		return ["finesse", "lunge", "marksmanship", "might", "skirmish", "throw"];
	}
	else {
		return ["Finesse", "Lunge", "Marksmanship", "Might", "Skirmish", "Throw"];
	}
}

function GetChannelSkillsList(isFields) {
	if (isFields) {
		return ["assault", "conjure", "enchant", "ethereal", "field", "pummel"];
	}
	else {
		return ["Assault", "Conjure", "Enchant", "Ethereal", "Field", "Pummel"];
	}
}

function GetBodySkillsList(isFields) {
	if (isFields) {
		return ["acrobatics", "athletics", "fortitude", "legerdemain", "physique", "stealth"];
	}
	else {
		return ["Acrobatics", "Athletics", "Fortitude", "Legerdemain", "Physique", "Stealth"];
	}
}

function GetKnowledgeSkillsList(isFields) {
	if (isFields) {
		return ["academics", "culture", "investigation", "nature", "tracking", "vocation"];
	}
	else {
		return ["Academics", "Culture", "Investigation", "Nature", "Tracking", "Vocation"];
	}
}

function GetSocialSkillsList(isFields) {
	if (isFields) {
		return ["charm", "deception", "intimidation", "leadership", "negotiation", "performance"];
	}
	else {
		return ["Charm", "Deception", "Intimidation", "Leadership", "Negotiation", "Performance"];
	}
}

function GetTechnicalSkillsList(isFields) {
	if (isFields) {
		return ["artisan", "cook", "heal", "herbalism", "mechanical", "pilot"];
	}
	else {
		return ["Artisan", "Cook", "Heal", "Herbalism", "Mechanical", "Pilot"];
	}
}

function GetAllSkillsList(isFields) {
	if (isFields) {
		return ["brace", "insight", "notice", "presence", "reflex", "resolve", "finesse", "lunge", "marksmanship", "might", "skirmish", "throw", "assault", "conjure", "enchant", "ethereal", "field", "pummel", "acrobatics", "athletics", "fortitude", "legerdemain", "physique", "stealth", "academics", "culture", "investigation", "nature", "tracking", "vocation", "charm", "deception", "intimidation", "leadership", "negotiation", "performance", "artisan", "cook", "heal", "herbalism", "mechanical", "pilot"];
	}
	else {
		return ["Brace", "Insight", "Notice", "Presence", "Reflex", "Resolve", "Finesse", "Lunge", "Marksmanship", "Might", "Skirmish", "Throw", "Assault", "Conjure", "Enchant", "Ethereal", "Field", "Pummel", "Acrobatics", "Athletics", "Fortitude", "Legerdemain", "Physique", "Stealth", "Academics", "Culture", "Investigation", "Nature", "Tracking", "Vocation", "Charm", "Deception", "Intimidation", "Leadership", "Negotiation", "Performance", "Artisan", "Cook", "Heal", "Herbalism", "Mechanical", "Pilot"];
	}
}

function GetDefensivePhysSkillsList(isFields) {
	if (isFields) {
		return ["brace", "presence", "reflex"];
	}
	else {
		return ["Brace", "Presence", "Reflex"];
	}
}

function GetDefensiveSensSkillsList(isFields) {
	if (isFields) {
		return ["insight", "notice", "resolve"];
	}
	else {
		return ["Insight", "Notice", "Resolve"];
	}
}

function GetSkillsByAbilityScoreInfo(name) {
	switch (name.toLowerCase()) {
		case "str":
			return ["Brace", "Might", "Athletics", "Physique"]
		case "int":
			return ["Insight", "Enchant", "Field", "Academics", "Culture", "Nature", "Vocation", "Herbalism"]
		case "per":
			return ["Notice", "Assault", "Conjure", "Investigation", "Tracking", "Deception", "Negotiation", "Cook"]
		case "cha":
			return ["Presence", "Ethereal", "Charm", "Intimidation", "Leadership", "Performance"]
		case "qck":
			return ["Reflex", "Finesse", "Acrobatics", "Legerdemain", "Stealth", "Heal", "Pilot"]
		case "wil":
			return ["Resolve"]
		case "dex":
			return ["Lunge", "Marksmanship", "Skirmish", "Throw", "Pummel", "Artisan", "Mechanical"]
		case "con":
			return ["Fortitude"]
		default:
			return []

	}
}

function GetSkillsInfo(name) {
	switch (name.toLowerCase()) {
		case "brace":
			return { "name": "Brace", "description": "Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects.", "group": "Defensive", "subGroup": "Physical Defense", "abilityScore": "STR" }
		case "insight":
			return { "name": "Insight", "description": "Insight represents a character's ability to parse conversation and judge mental states. This defense is typically used when information is being hidden in text or speech or to detect when someone is concealing their true thoughts.", "group": "Defensive", "subGroup": "Sensory Defense", "abilityScore": "INT" }
		case "notice":
			return { "name": "Notice", "description": "Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's stealth attempts or to hear a distant or quiet noise.", "group": "Defensive", "subGroup": "Sensory Defense", "abilityScore": "PER" }
		case "presence":
			return { "name": "Presence", "description": "Presence is a character's ability to force their will over their environment. It is used to disrupt ether as it means to affect a character.", "group": "Defensive", "subGroup": "Physical Defense", "abilityScore": "CHA" }
		case "reflex":
			return { "name": "Reflex", "description": "Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball.", "group": "Defensive", "subGroup": "Physical Defense", "abilityScore": "QCK" }
		case "resolve":
			return { "name": "Resolve", "description": "Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in.", "group": "Defensive", "subGroup": "Sensory Defense", "abilityScore": "WIL" }
		case "finesse":
			return { "name": "Finesse", "description": "Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character.", "group": "Martial", "subGroup": "", "abilityScore": "QCK" }
		case "lunge":
			return { "name": "Lunge", "description": "The skill to use attacks that force one to lunge forward, either with a polearm or their own body. Techniques that use this skill typically extend a weapon's threat, allowing more control of a battlefield.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "marksmanship":
			return { "name": "Marksmanship", "description": "The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. ", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "might":
			return { "name": "Might", "description": "This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. ", "group": "Martial", "subGroup": "", "abilityScore": "STR" }
		case "skirmish":
			return { "name": "Skirmish", "description": "This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "throw":
			return { "name": "Throw", "description": "When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "assault":
			return { "name": "Assault", "description": "These spells quickly form ether into a physical substance. Because the ether is formed quickly, these spells are well suited for launching at targets in a combat situation at the cost of keeping the ether stable for more than a few seconds.", "group": "Channel", "subGroup": "", "abilityScore": "PER" }
		case "conjure":
			return { "name": "Conjure", "description": "These spells form ether into a form of energy and stabilzes it so that it can linger in this form. Conjured magic is often unable to last for long and must be consumed quickly else disperse into ether.", "group": "Channel", "subGroup": "", "abilityScore": "PER" }
		case "enchant":
			return { "name": "Enchant", "description": "Spells that imbue a target with temporary or permanent change. These spells can typically cause effects in creatures such as emboldening their strength or heal their wounds.", "group": "Channel", "subGroup": "", "abilityScore": "INT" }
		case "ethereal":
			return { "name": "Ethereal", "description": "Ethereal spells are unique in that they don't create any obvious physical manifestation but rather affect ether and the ethereal plane directly.", "group": "Channel", "subGroup": "", "abilityScore": "CHA" }
		case "field":
			return { "name": "Field", "description": "These spells affect existing terrain and environments by either modifying it or adding to it. ", "group": "Channel", "subGroup": "", "abilityScore": "INT" }
		case "pummel":
			return { "name": "Pummel", "description": "This skill covers techniques that momentarily empower ones own body to deliver a strike. These skills are always meant to be achieved in melee range.", "group": "Channel", "subGroup": "", "abilityScore": "DEX" }
		case "acrobatics":
			return { "name": "Acrobatics", "description": "Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. ", "group": "Body", "subGroup": "", "abilityScore": "QCK" }
		case "athletics":
			return { "name": "Athletics", "description": "Your Athletics check covers movement through an environment such as when climbing, jumping, or swimming.", "group": "Body", "subGroup": "", "abilityScore": "STR" }
		case "fortitude":
			return { "name": "Fortitude", "description": "Fortitude is a character's ability to resist environmental or internal harm such as from severe heat or cold, poisons or sickness.", "group": "Body", "subGroup": "", "abilityScore": "CON" }
		case "legerdemain":
			return { "name": "Legerdemain", "description": "Legerdemain is sleight-of-hand skill that gives a character the ability to snag, hide, and pass off small objects.", "group": "Body", "subGroup": "", "abilityScore": "QCK" }
		case "physique":
			return { "name": "Physique", "description": "The Physique skill represents a character’s raw strength and endurance. It is the base skill for actions that allow one to shove or grapple and can be used to allow one to lift or carry objects that may fall outside normal rules.", "group": "Body", "subGroup": "", "abilityScore": "STR" }
		case "stealth":
			return { "name": "Stealth", "description": "Make a Stealth check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. ", "group": "Body", "subGroup": "", "abilityScore": "QCK" }
		case "academics":
			return { "name": "Academics", "description": "This type of knowledge includes college subjects such as history, arithmetic, chemistry, technology, and magical theory.", "group": "Knowledge", "subGroup": "Recall Knowledge", "abilityScore": "INT" }
		case "culture":
			return { "name": "Culture", "description": "Your culture check measures your ability to recall lore about a civilization's practices, philosophies, laws, and religions. ", "group": "Knowledge", "subGroup": "Recall Knowledge", "abilityScore": "INT" }
		case "investigation":
			return { "name": "Investigation", "description": "This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. ", "group": "Knowledge", "subGroup": "", "abilityScore": "PER" }
		case "nature":
			return { "name": "Nature", "description": "Nature is the recall skill that governs the natural world. You would use a nature check to get information on geography, the planes, and creatures such as human and animal physiology and the nature of spirits.", "group": "Knowledge", "subGroup": "Recall Knowledge", "abilityScore": "INT" }
		case "tracking":
			return { "name": "Tracking", "description": "Make a Tracking check to follow tracks, hunt wild game, or guide your group through wastelands. ", "group": "Knowledge", "subGroup": "", "abilityScore": "PER" }
		case "vocation":
			return { "name": "Vocation", "description": "Vocational knowledge deals with subjects related to trades, professions, and occupations. Things like journalism, crafting, business, and so on.", "group": "Knowledge", "subGroup": "Recall Knowledge", "abilityScore": "INT" }
		case "charm":
			return { "name": "Charm", "description": "Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. ", "group": "Social", "subGroup": "Social Influence", "abilityScore": "CHA" }
		case "deception":
			return { "name": "Deception", "description": "Telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. ", "group": "Social", "subGroup": "Social Influence", "abilityScore": "PER" }
		case "intimidation":
			return { "name": "Intimidation", "description": "When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve.", "group": "Social", "subGroup": "Social Influence", "abilityScore": "CHA" }
		case "leadership":
			return { "name": "Leadership", "description": "Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable.", "group": "Social", "subGroup": "", "abilityScore": "CHA" }
		case "negotiation":
			return { "name": "Negotiation", "description": "Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals.", "group": "Social", "subGroup": "Social Influence", "abilityScore": "PER" }
		case "performance":
			return { "name": "Performance", "description": "Your Performance check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment. ", "group": "Social", "subGroup": "", "abilityScore": "CHA" }
		case "artisan":
			return { "name": "Artisan", "description": "This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. ", "group": "Technical", "subGroup": "Crafting", "abilityScore": "DEX" }
		case "cook":
			return { "name": "Cook", "description": "Food is important for survival, so making it enjoyable is a craft of great appreciation. This skill requires cook's utensils in order to cook most food at a minimum, while different dishes may require access to a stove, oven, or other large appliances.", "group": "Technical", "subGroup": "Crafting", "abilityScore": "PER" }
		case "heal":
			return { "name": "Heal", "description": "Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition.", "group": "Technical", "subGroup": "", "abilityScore": "QCK" }
		case "herbalism":
			return { "name": "Herbalism", "description": "The skill to create medicinal and chemical compounds such as drugs, perfumes, and poisons.", "group": "Technical", "subGroup": "Crafting", "abilityScore": "INT" }
		case "mechanical":
			return { "name": "Mechanical", "description": "This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery.", "group": "Technical", "subGroup": "Crafting", "abilityScore": "DEX" }
		case "pilot":
			return { "name": "Pilot", "description": "When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. ", "group": "Technical", "subGroup": "", "abilityScore": "QCK" }
		default:
			return { "name": "", "description": "", "group": "", "subGroup": "", "abilityScore": "" }

	}
}

function GetClassesInfo(name) {
	switch (name.toLowerCase()) {
		case "fighter":
			return {
				"name": "Fighter", "category": "Warfare", "description": "The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. ", "growths": { "CON": 3, "DEX": 3, "QCK": 2, "STR": 4, "CHA": 0, "INT": 0, "PER": 1, "WIL": 2, "hp": 5 },
				"aptitudes": { "warfare": 5, "magic": 0, "talent": 2, "acumen": 1 },
				"prerequisite": "", "jobTechnique": "Second Wind", "advancement": [{ "name": "Shrug It Off", "type": "Always Armored" },
				{ "name": "Always Armored +", "type": "Undaunted" }]
			}
		case "interceptor":
			return {
				"name": "Interceptor", "category": "Warfare", "description": "The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies.", "growths": { "CON": 2, "DEX": 4, "QCK": 5, "STR": 3, "CHA": 0, "INT": 0, "PER": 3, "WIL": 2, "hp": 1 },
				"aptitudes": { "warfare": 4, "magic": 0, "talent": 2, "acumen": 2 },
				"prerequisite": "Trained in Notice", "jobTechnique": "Preemptive Strike", "advancement": [{ "name": "Preemptive Stagger", "type": "Pounce" },
				{ "name": "Pounce and Step", "type": "Critical Maim" }]
			}
		case "guardian":
			return {
				"name": "Guardian", "category": "Warfare", "description": "The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. ", "growths": { "CON": 2, "DEX": 2, "QCK": 4, "STR": 3, "CHA": 0, "INT": 0, "PER": 1, "WIL": 5, "hp": 3 },
				"aptitudes": { "warfare": 3, "magic": 3, "talent": 2, "acumen": 0 },
				"prerequisite": "Trained in Presence and Enchant", "jobTechnique": "Savior", "advancement": [{ "name": "Defender's Will", "type": "Knock Away Savior" },
				{ "name": "Ironwill", "type": "Savior's Retaliation" }]
			}
		case "spellslinger":
			return {
				"name": "Spellslinger", "category": "Magic", "description": "The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety.", "growths": { "CON": 3, "DEX": 4, "QCK": 3, "STR": 0, "CHA": 2, "INT": 0, "PER": 5, "WIL": 1, "hp": 2 },
				"aptitudes": { "warfare": 3, "magic": 4, "talent": 0, "acumen": 1 },
				"prerequisite": "Trained in Assault and Marksmanship", "jobTechnique": "Spellshot", "advancement": [{ "name": "Distant Spellshot", "type": "Sharpshooter" },
				{ "name": "Focused Sharpshooter", "type": "Bursting Spellshot" }]
			}
		case "athlete":
			return {
				"name": "Athlete", "category": "Talent", "description": "The athlete is a marvel at maneuverability. They feature an incredible method of getting in and out of combat with their Sprint technique. ", "growths": { "CON": 5, "DEX": 4, "QCK": 3, "STR": 3, "CHA": 1, "INT": 0, "PER": 1, "WIL": 0, "hp": 3 },
				"aptitudes": { "warfare": 2, "magic": 0, "talent": 5, "acumen": 1 },
				"prerequisite": "", "jobTechnique": "Sprint", "advancement": [{ "name": "", "type": "Sprint Pass" },
				{ "name": "", "type": "Bounding Sprint" }]
			}
		case "rogue":
			return {
				"name": "Rogue", "category": "Talent", "description": "The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. ", "growths": { "CON": 0, "DEX": 4, "QCK": 5, "STR": 0, "CHA": 2, "INT": 2, "PER": 3, "WIL": 3, "hp": 1 },
				"aptitudes": { "warfare": 3, "magic": 0, "talent": 3, "acumen": 2 },
				"prerequisite": "Trained in Finesse", "jobTechnique": "Sneak Attack", "advancement": [{ "name": "Sneaky Follow-Up", "type": "Skulk Away" },
				{ "name": "Skulk Then Hide", "type": "Assassinate" }]
			}
		case "scholar":
			return {
				"name": "Scholar", "category": "Acumen", "description": "The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too.", "growths": { "CON": 1, "DEX": 3, "QCK": 3, "STR": 0, "CHA": 0, "INT": 5, "PER": 4, "WIL": 3, "hp": 1 },
				"aptitudes": { "warfare": 0, "magic": 3, "talent": 1, "acumen": 4 },
				"prerequisite": "", "jobTechnique": "Foresight", "advancement": [{ "name": "Eclectic Knowledge", "type": "Saw That Coming" },
				{ "name": "Point of Clarity", "type": "As You May Recall" }]
			}
		case "physician":
			return {
				"name": "Physician", "category": "Acumen", "description": "The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action.", "growths": { "CON": 3, "DEX": 1, "QCK": 3, "STR": 0, "CHA": 4, "INT": 0, "PER": 5, "WIL": 3, "hp": 1 },
				"aptitudes": { "warfare": 0, "magic": 3, "talent": 2, "acumen": 3 },
				"prerequisite": "Trained in Academics and Heal", "jobTechnique": "Emergency Care", "advancement": [{ "name": "First Aid", "type": "Nightingale" },
				{ "name": "Cleansing Aid", "type": "Rhapsody" }]
			}
		default:
			return {
				"name": "", "category": "", "description": "", "growths": [],
				"aptitudes": [],
				"prerequisite": "", "jobTechnique": "", "advancement": []
			}

	}
}

function GetClassesList(isFields) {
	if (isFields) {
		return ["fighter", "interceptor", "guardian", "spellslinger", "athlete", "rogue", "scholar", "physician"];
	}
	else {
		return ["Fighter", "Interceptor", "Guardian", "Spellslinger", "Athlete", "Rogue", "Scholar", "Physician"];
	}
}

function GetBranchesInfo(name) {
	switch (name.toLowerCase()) {
		case "health":
			return { "name": "Health", "group": "Wood", "isSpecial": "false", "description": "undefined" }
		case "wind":
			return { "name": "Wind", "group": "Wood", "isSpecial": "false", "description": "undefined" }
		case "poison":
			return { "name": "Poison", "group": "Wood", "isSpecial": "true", "description": "undefined" }
		case "light":
			return { "name": "Light", "group": "Fire", "isSpecial": "false", "description": "undefined" }
		case "smoke":
			return { "name": "Smoke", "group": "Fire", "isSpecial": "false", "description": "undefined" }
		case "soul":
			return { "name": "Soul", "group": "Fire", "isSpecial": "false", "description": "undefined" }
		case "power":
			return { "name": "Power", "group": "Earth", "isSpecial": "false", "description": "undefined" }
		case "shadow":
			return { "name": "Shadow", "group": "Earth", "isSpecial": "false", "description": "undefined" }
		case "gravity":
			return { "name": "Gravity", "group": "Earth", "isSpecial": "true", "description": "undefined" }
		case "lightning":
			return { "name": "Lightning", "group": "Metal", "isSpecial": "false", "description": "undefined" }
		case "force":
			return { "name": "Force", "group": "Metal", "isSpecial": "false", "description": "undefined" }
		case "blood":
			return { "name": "Blood", "group": "Metal", "isSpecial": "true", "description": "undefined" }
		case "restoration":
			return { "name": "Restoration", "group": "Water", "isSpecial": "false", "description": "undefined" }
		case "storm":
			return { "name": "Storm", "group": "Water", "isSpecial": "false", "description": "undefined" }
		case "time":
			return { "name": "Time", "group": "Water", "isSpecial": "true", "description": "undefined" }
		default:
			return { "name": "", "group": "", "isSpecial": "", "description": "" }

	}
}

function GetBranchesList(isFields) {
	if (isFields) {
		return ["health", "wind", "poison", "light", "smoke", "soul", "power", "shadow", "gravity", "lightning", "force", "blood", "restoration", "storm", "time"];
	}
	else {
		return ["Health", "Wind", "Poison", "Light", "Smoke", "Soul", "Power", "Shadow", "Gravity", "Lightning", "Force", "Blood", "Restoration", "Storm", "Time"];
	}
}

var WuxingTechniques = WuxingTechniques || (function () {
	'use strict';

	var
		database = {
			"Quick Strike": {
				"name": "Quick Strike", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "Armament", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Quick Shoot": {
				"name": "Quick Shoot", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "Armament", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Range", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Break Free": {
				"name": "Break Free", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You attempt to end a grapple or restraining effect by breaking the grappler's grip.", "onSuccess": "", "dConditions": "S:Grappled", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "You are grappled.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Physique", "defense": "Physique DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Dash": {
				"name": "Dash", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You move at least 1 space, up to half your speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Escape": {
				"name": "Escape", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You attempt to end a grapple or restraining effect by wrigglnig loose.", "onSuccess": "", "dConditions": "S:Grappled", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "You are grappled.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Acrobatics", "defense": "Physique DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Grapple": {
				"name": "Grapple", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You attempt to grapple a character.", "onSuccess": "Both you and the target gain the grappled status.", "dConditions": "S:Grappled", "tEffect": "S:Grappled;S*:Grappled", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Physique", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Hide": {
				"name": "Hide", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "Simple", "limits": "", "resourceCost": "", "description": "To Hide, you must not be Engaged and you must either be outside of any enemies’ line of sight, obscured by sufficient cover, or invisible. If you Hide while meeting one of these criteria, you gain the Hidden status.\nHard cover is sufficient to Hide as long as it is large enough to totally conceal you, but soft cover is only sufficient if you are completely inside an area or zone that grants soft cover.", "onSuccess": "", "dConditions": "S:Hidden;S:Engaged", "tEffect": "S*:Hidden", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Mount": {
				"name": "Mount", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "Simple", "limits": "", "resourceCost": "", "description": "You climb onto or into an object, usually a vehicle.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Prepare": {
				"name": "Prepare", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You get ready to take an action at a specific time or when a specific condition is met. As a quick action, you can prepare any other quick action and specify a trigger. Until the start of your next turn, when it is triggered, you can take this action as a reaction.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Reposition": {
				"name": "Reposition", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You use your strength to force another character into another position. ", "onSuccess": "You may choose to move the target one space, either to a space within reach or one space directly away from you. ", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "Target must be the same Size or smaller than you.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Physique", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Seach": {
				"name": "Seach", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You try to find a hidden character.", "onSuccess": "The target immediately loses Hidden and can be located again by any character.", "dConditions": "S:Hidden", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "Target must be a character you suspect is Hidden.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Investigate", "defense": "Stealth DC", "range": "5", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Full Strike": {
				"name": "Full Strike", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "Armament+; Brutal", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Full Shoot": {
				"name": "Full Shoot", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "Armament+; Brutal", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Aid": {
				"name": "Aid", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You try to remove a condition afffecting you or an ally. Choose one of the following:\n• Clear a condition on yourself.\n• Clear an adjacent allied character’s condition. ", "onSuccess": "", "dConditions": "", "tEffect": "R:Condition", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Encourage": {
				"name": "Encourage", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "Simple", "limits": "", "resourceCost": "", "description": "You offer words of inspiration to a character. ", "onSuccess": "The target gains the Encouraged condition. ", "dConditions": "C:Encouraged", "tEffect": "C:Encouraged", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Leadership", "defense": "", "range": "5", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Stabilize": {
				"name": "Stabilize", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Vitality", "description": "You restore your HP to full and can clear a condition on yourself.", "onSuccess": "", "dConditions": "", "tEffect": "H*:100%;R*:Vitality;R*:Condition", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Skill Check": {
				"name": "Skill Check", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You undertake an activity that isn’t covered by other actions but has a clear goal and is sufficiently complex to require a roll. The parameters and outcomes of Skill Checks are up to the GM, but they must be involved enough to require a full action. If you want to do something that can be done quickly, no action is required.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Surge": {
				"name": "Surge", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You gain an amount of Ki equal to your Ki Charge. If this value would take you over your Ki Limit, you cap your ki to your Ki Limit.", "onSuccess": "", "dConditions": "", "tEffect": "K*:Surge;R*:Surge", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Surge Beyond Limits": {
				"name": "Surge Beyond Limits", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You gain an amount of Ki equal to your Ki Charge. Your ki can increase beyond your Ki Limit.\nWhenever you gain Ki and it pushes you over your Ki Limit you immediately take 1 stress and gain the Dying condition. ", "onSuccess": "", "dConditions": "", "tEffect": "K*:SurgeB;R*:Surge", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Follow-Up Attack": {
				"name": "Follow-Up Attack", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Reaction", "traits": "Armament", "limits": "1/Round", "resourceCost": "", "description": "You perform a melee attack against your ally's target.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "An ally makes a melee or ranged attack against a character.", "requirement": { "ot": "This attack must be made against the target of the attack.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Grab an Edge": {
				"name": "Grab an Edge", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You can try to grab the ledge, potentially stopping your fall. You must succeed at a Reflex save. ", "onSuccess": "You stop at the edge. If an adjacent space is unoccupied you may immediately climb up and move to the space.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "When you fall off or past an edge or other handhold", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Reflex", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Total Defense": {
				"name": "Total Defense", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You count as having Resistance to all damage from the triggering attack, and until the end of your next turn, all other attacks against you are made at +1 Disadvantage.\nDue to the stress of defending, you cannot take reactions until the end of your next turn and on that turn, you can only take one quick action – you cannot standard move, take full actions, or take free actions.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You are hit by an attack and damage has been rolled.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Equip": {
				"name": "Equip", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You equip a weapon or piece of gear. You may optionally unequip and stow any weapon(s) or gear you are currently wielding to free up space.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Interact": {
				"name": "Interact", "augmentBase": "", "techniqueSource": "Basic", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You use your hand or hands to manipulate an object or the terrain. You can grab an unattended or stored object, open a door, or produce some similar effect. You might have to attempt a skill check to determine if your Interact action was successful.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Change Tech Slots": {
				"name": "Change Tech Slots", "augmentBase": "", "techniqueSource": "Hero", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You recenter yourself to enter a new mental state. You may reconfigure your current tech slot loadout with a new combination of techniques you have learned.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Hold Out": {
				"name": "Hold Out", "augmentBase": "", "techniqueSource": "Hero", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Reaction", "traits": "", "limits": "1/Rest", "resourceCost": "", "description": "You are not knocked unconscious. ", "onSuccess": "", "dConditions": "S:Unconscious", "tEffect": "SR*:Unconscious", "rEffect": "", "trigger": "You take a wound and it would knock you unconscious.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Overdrive": {
				"name": "Overdrive", "augmentBase": "", "techniqueSource": "Hero", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "1 Vitality; 1 Chakra", "description": "You gain one additional Quick Action this turn. \nThe second time you use this action will cause you to take 3 Stress at the end of your turn. Using this action a third time will cause you to take 6 Stress at the end of your turn. Any uses after this causes instant death. These uses reset when you perform a long rest.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Nothing": {
				"name": "Nothing", "augmentBase": "", "techniqueSource": "Creature", "techniqueGroup": "", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "Armament", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Martial Training": {
				"name": "Martial Training", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Martial skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Martial Training +", "Martial Training ++"]
			},
			"Martial Training +": {
				"name": "Martial Training +", "augmentBase": "Martial Training", "techniqueSource": "Warfare", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Martial skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Martial Training ++": {
				"name": "Martial Training ++", "augmentBase": "Martial Training", "techniqueSource": "Warfare", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Martial skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"HP Up": {
				"name": "HP Up", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain 10 Max HP.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["HP Up+", "HP Up++"]
			},
			"HP Up+": {
				"name": "HP Up+", "augmentBase": "HP Up", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain 10 Max HP.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"HP Up++": {
				"name": "HP Up++", "augmentBase": "HP Up", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain 10 Max HP.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Vitality Boost": {
				"name": "Vitality Boost", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Vitality Boost +", "Vitality Boost ++"]
			},
			"Vitality Boost +": {
				"name": "Vitality Boost +", "augmentBase": "Vitality Boost", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Vitality Boost ++": {
				"name": "Vitality Boost ++", "augmentBase": "Vitality Boost", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Undying": {
				"name": "Undying", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Wound Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Undying +"]
			},
			"Undying +": {
				"name": "Undying +", "augmentBase": "Undying", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Wound Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Ki Strike": {
				"name": "Ki Strike", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You wrap your body with ki and strike. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "Must be channeling ki", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": ["Drop Kick", "Uppercut", "Follow-Up Grapple"]
			},
			"Drop Kick": {
				"name": "Drop Kick", "augmentBase": "Ki Strike", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You wrap your body with ki and strike. ", "onSuccess": "The target gains the Prone status.", "dConditions": "C:Prone", "tEffect": "C:Prone", "rEffect": "", "trigger": "", "requirement": { "ot": "The target must be Launched and you must be 1 space above the target.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "6", "dBonus": "Power", "damageType": "Force", "element": "", "augments": []
			},
			"Uppercut": {
				"name": "Uppercut", "augmentBase": "Ki Strike", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You wrap your body with ki and strike. ", "onSuccess": "The target gains the Launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": []
			},
			"Follow-Up Grapple": {
				"name": "Follow-Up Grapple", "augmentBase": "Ki Strike", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You attempt to grapple your ally's target.", "onSuccess": "Both you and the target gain the grappled status.", "dConditions": "S:Grappled", "tEffect": "S:Grappled;S*:Grappled", "rEffect": "", "trigger": "An ally makes a melee or ranged attack against a character and you are engaged with the character.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Physique", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "0", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": []
			},
			"Crushing Blade": {
				"name": "Crushing Blade", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Armament+", "limits": "", "resourceCost": "", "description": "You attempt to power through any defense the foe has. Make a melee attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "Large Sword; Sword" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Might", "ot": "" },
				"skill": "Weapon", "defense": "Reflex DC", "range": "Weapon", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Staggering Blade"]
			},
			"Staggering Blade": {
				"name": "Staggering Blade", "augmentBase": "Crushing Blade", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Armament+", "limits": "", "resourceCost": "2 Ki", "description": "You attempt to power through any defense the foe has. Make a melee attack.", "onSuccess": "The target gains the Staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "Large Sword; Sword" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "Reflex DC", "range": "Weapon", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Piledriver": {
				"name": "Piledriver", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Armament+; Brutal", "limits": "", "resourceCost": "2 Ki", "description": "You swing with incredible force at your target, attempting to launch them into the air. Make a melee attack. ", "onSuccess": "The target gains the Launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "Large Hammer; Hammer" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Might", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shredding Driver"]
			},
			"Shredding Driver": {
				"name": "Shredding Driver", "augmentBase": "Piledriver", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "AP (4); Armament+; Brutal", "limits": "", "resourceCost": "3 Ki", "description": "You swing with incredible force at your target, attempting to launch them into the air. Make a melee attack. ", "onSuccess": "The target gains the Launched status.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "Large Hammer; Hammer" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Point Blank Shot": {
				"name": "Point Blank Shot", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You are treated as having threat 2 when equipped with a Bow or Handgun weapon.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Marksmanship", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shot on the Run"]
			},
			"Shot on the Run": {
				"name": "Shot on the Run", "augmentBase": "Point Blank Shot", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "When you use a Bow or Handgun weapon as a melee weapon, you may immediately move 1 space.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Pole Vault": {
				"name": "Pole Vault", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "", "description": "You increase your jump height by 2 on both horizontal and vertical jumps.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You jump during your movement.", "requirement": { "ot": "", "wpn": "Spear; Staff" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Quick Draw": {
				"name": "Quick Draw", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You may ignore the 1 / Turn limit of the Equip action when equipping a weapon that does not have the Two-handed trait.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Rapid Volley": {
				"name": "Rapid Volley", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Armament; Brutal", "limits": "", "resourceCost": "", "description": "You strike fast to catch an evasive target. Make a melee attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "Spear; Staff" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Skirmish", "ot": "" },
				"skill": "Weapon", "defense": "Brace DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Rushing Volley"]
			},
			"Rushing Volley": {
				"name": "Rushing Volley", "augmentBase": "Rapid Volley", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Armament+; Brutal", "limits": "", "resourceCost": "2 Ki", "description": "You strike fast to catch an evasive target. Make a melee attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "Spear; Staff" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "Brace DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Extra Follow-Up Attack": {
				"name": "Extra Follow-Up Attack", "augmentBase": "", "techniqueSource": "Warfare", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may perform Follow-Up Attack 2/Round.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 4, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Extra Follow-Up Attack +"]
			},
			"Extra Follow-Up Attack +": {
				"name": "Extra Follow-Up Attack +", "augmentBase": "Extra Follow-Up Attack", "techniqueSource": "Warfare", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may perform Follow-Up Attack 4/Round.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 4, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Physical Training": {
				"name": "Physical Training", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Physical Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 8, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Physical Training +"]
			},
			"Physical Training +": {
				"name": "Physical Training +", "augmentBase": "Physical Training", "techniqueSource": "Talent", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Physical Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 8, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Body Training": {
				"name": "Body Training", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Body Training +", "Body Training ++"]
			},
			"Body Training +": {
				"name": "Body Training +", "augmentBase": "Body Training", "techniqueSource": "Talent", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Body Training ++": {
				"name": "Body Training ++", "augmentBase": "Body Training", "techniqueSource": "Talent", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Technical Training": {
				"name": "Technical Training", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Technical Training +", "Technical Training ++"]
			},
			"Technical Training +": {
				"name": "Technical Training +", "augmentBase": "Technical Training", "techniqueSource": "Talent", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Technical Training ++": {
				"name": "Technical Training ++", "augmentBase": "Technical Training", "techniqueSource": "Talent", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Acceleration": {
				"name": "Acceleration", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "Until the end of your turn, your speed increases by 2. You may then move up to half your speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Athletics", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Power Vault"]
			},
			"Power Vault": {
				"name": "Power Vault", "augmentBase": "Acceleration", "techniqueSource": "Talent", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "Until the end of your turn, your horizontal and vertical jump distance is doubled.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Expeditious": {
				"name": "Expeditious", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Athletics", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Quick Climb", "Quick Swim"]
			},
			"Quick Climb": {
				"name": "Quick Climb", "augmentBase": "Expeditious", "techniqueSource": "Talent", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you climb you move at half your full speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Quick Swim": {
				"name": "Quick Swim", "augmentBase": "Expeditious", "techniqueSource": "Talent", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you swim you move at your full speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Poise": {
				"name": "Poise", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You always succeed at normal difficulty Acrobatics checks to maintain balance.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Acrobatics", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Cat Fall", "Kip Up"]
			},
			"Cat Fall": {
				"name": "Cat Fall", "augmentBase": "Poise", "techniqueSource": "Talent", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Kip Up": {
				"name": "Kip Up", "augmentBase": "Poise", "techniqueSource": "Talent", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn, you can get up from prone for free.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Silent Stride": {
				"name": "Silent Stride", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "If you are hidden and lose cover, you may use your standard move and not lose the hidden status as long as your move ends with you in cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Stealth", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Shove": {
				"name": "Shove", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You try to ram into a character.", "onSuccess": "You may choose to push the target up to two spaces, directly away from you. If you move the target, you may follow the target up to the same distance you moved them.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "Target must be the same Size or smaller than you.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Physique", "ot": "" },
				"skill": "Physique", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Knockdown"]
			},
			"Knockdown": {
				"name": "Knockdown", "augmentBase": "Shove", "techniqueSource": "Talent", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You try to ram into a character.", "onSuccess": "Your target is also knocked prone. ", "dConditions": "C:Prone", "tEffect": "C:Prone", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Physique", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Tumble": {
				"name": "Tumble", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You move at least 1 space, up to your speed. During this movement, you can try to move through the space of one enemy. Attempt an Acrobatics check against the enemy’s Reflex DC as soon as you try to enter its space. ", "onSuccess": "You do not trigger engagement and may continue moving.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Acrobatics", "ot": "" },
				"skill": "Acrobatics", "defense": "Reflex DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Field Medic": {
				"name": "Field Medic", "augmentBase": "", "techniqueSource": "Talent", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When treating wounds during a long rest, unless the wound has unique end conditions, you always succeed at your Medicine check.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Medicine", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Stress Release": {
				"name": "Stress Release", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Stress Release +", "Stress Release ++"]
			},
			"Stress Release +": {
				"name": "Stress Release +", "augmentBase": "Stress Release", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Stress Release ++": {
				"name": "Stress Release ++", "augmentBase": "Stress Release", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Sensory Training": {
				"name": "Sensory Training", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Sensory Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 8, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sensory Training +"]
			},
			"Sensory Training +": {
				"name": "Sensory Training +", "augmentBase": "Sensory Training", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Sensory Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 8, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Broad Study": {
				"name": "Broad Study", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You are well read in a lot of different subjects. Gain a +1 bonus whenever making a Recall Knowledge check.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Experienced Tracker": {
				"name": "Experienced Tracker", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You track at your full speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Survival", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Multilingual": {
				"name": "Multilingual", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You gain three Languages.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Multilingual +"]
			},
			"Multilingual +": {
				"name": "Multilingual +", "augmentBase": "Multilingual", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You gain three Languages.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Specialized Lore": {
				"name": "Specialized Lore", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You gain three Lore Knowledges.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Specialized Lore +", "Specialized Lore ++"]
			},
			"Specialized Lore +": {
				"name": "Specialized Lore +", "augmentBase": "Specialized Lore", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You gain three Lore Knowledges.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Specialized Lore ++": {
				"name": "Specialized Lore ++", "augmentBase": "Specialized Lore", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You gain three Lore Knowledges.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Improved Initiative": {
				"name": "Improved Initiative", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your initiative increases by 4.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Knowledge Training": {
				"name": "Knowledge Training", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Knowledge Training +", "Knowledge Training ++"]
			},
			"Knowledge Training +": {
				"name": "Knowledge Training +", "augmentBase": "Knowledge Training", "techniqueSource": "Acumen", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Knowledge Training ++": {
				"name": "Knowledge Training ++", "augmentBase": "Knowledge Training", "techniqueSource": "Acumen", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Social Training": {
				"name": "Social Training", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Social Training +", "Social Training ++"]
			},
			"Social Training +": {
				"name": "Social Training +", "augmentBase": "Social Training", "techniqueSource": "Acumen", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Social Training ++": {
				"name": "Social Training ++", "augmentBase": "Social Training", "techniqueSource": "Acumen", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Cunning Action": {
				"name": "Cunning Action", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "With a gesture, a trick, or some distracting words, you can create a diversion that draws creatures' attention elsewhere. ", "onSuccess": "Until the end of this turn, you have +1 advantage on the next attack roll against the target.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Deception", "ot": "" },
				"skill": "Deception", "defense": "Insight DC", "range": "3", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Demoralize": {
				"name": "Demoralize", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "With a sudden shout, a well-timed taunt, or a cutting putdown, you can shake an enemy's resolve. \n\nRegardless of your result, the target is temporarily immune to your attempts to Demoralize it for 5 minutes.", "onSuccess": "The target gains the frightened condition.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Intimidation", "ot": "" },
				"skill": "Intimidation", "defense": "Resolve DC", "range": "5", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Fascinate": {
				"name": "Fascinate", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "Through fancy footwork, vicious mockery, or a startling performance, you draw the attention of those nearby.\n\nRegardless of your result, targets are temporarily immune to your attempts to Fascinate them for 5 minutes.", "onSuccess": "The target gains the staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Performance", "ot": "" },
				"skill": "Performance", "defense": "Insight DC", "range": "3", "rType": "Threat", "target": "Up to three targets", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Impersonator": {
				"name": "Impersonator", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "If you spend 5 minutes studying a person you are trying to impersonate, you gain +1 advantage on all deception checks to pass yourself off as that person.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "Deception", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Refocus": {
				"name": "Refocus", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You quickly recenter. You may exchange one loaded tech slot with another technique.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 4, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Refocus +"]
			},
			"Refocus +": {
				"name": "Refocus +", "augmentBase": "Refocus", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You may exchange two loaded tech slots with two other techniques.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 4, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Sustained Channel": {
				"name": "Sustained Channel", "augmentBase": "", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You may take 1 Stress to ignore the effects of overchanneling for 5 minutes.\n\nThe second time you use this action will cause you to instead take 3 Stress. Using this action a third time will cause you to instead take 6 Stress. Any uses after this causes instant death. These uses reset when you perform a long rest.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sustained Channel +"]
			},
			"Sustained Channel +": {
				"name": "Sustained Channel +", "augmentBase": "Sustained Channel", "techniqueSource": "Acumen", "techniqueGroup": "Boon", "family": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "The duration before you feel the effects of overchanneling extends to 15 minutes.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Ki Control": {
				"name": "Ki Control", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Ki Limit increases by 2.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Ki Control +", "Ki Control ++"]
			},
			"Ki Control +": {
				"name": "Ki Control +", "augmentBase": "Ki Control", "techniqueSource": "Magic", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Ki Limit increases by 2.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Ki Control ++": {
				"name": "Ki Control ++", "augmentBase": "Ki Control", "techniqueSource": "Magic", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Ki Limit increases by 2.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Surge Value": {
				"name": "Surge Value", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Ki Charge increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 8, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Surge Value +"]
			},
			"Surge Value +": {
				"name": "Surge Value +", "augmentBase": "Surge Value", "techniqueSource": "Magic", "techniqueGroup": "Boon", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Ki Charge increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": 8, "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Channel Training": {
				"name": "Channel Training", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Channel skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Channel Training +", "Channel Training ++"]
			},
			"Channel Training +": {
				"name": "Channel Training +", "augmentBase": "Channel Training", "techniqueSource": "Magic", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Channel skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Channel Training ++": {
				"name": "Channel Training ++", "augmentBase": "Channel Training", "techniqueSource": "Magic", "techniqueGroup": "Training", "family": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Channel skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Dustcraft": {
				"name": "Dustcraft", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Swift", "traits": "Material", "limits": "1/Round", "resourceCost": "", "description": "You can move up to 10 lbs of unrestricted material dust up to 5 squares, as long as it remains within your range.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting"]
			},
			"Shape Material": {
				"name": "Shape Material", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You may craft an item using Tier 1 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Quickcraft": {
				"name": "Quickcraft", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Material", "limits": "1/Round", "resourceCost": "2 Ki", "description": "You may craft an item using Tier 1 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot. \nTreat a successful craft check as if it progressed the crafting time by 2 instead of 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Improved Shaping": {
				"name": "Improved Shaping", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "2 Ki", "description": "You may craft an item using Tier 2 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Greater Shaping": {
				"name": "Greater Shaping", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "3 Ki", "description": "You may craft an item using Tier 3 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Legendary Shaping": {
				"name": "Legendary Shaping", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "4 Ki", "description": "You may craft an item using Tier 4 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Dust Material": {
				"name": "Dust Material", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You may attack an unattended item or structure made of Tier 1 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Structure", "defense": "Brace DC", "range": "3", "rType": "Threat", "target": "One Target", "targetCode": "Field", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": []
			},
			"Dust Area": {
				"name": "Dust Area", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "2 Ki", "description": "You may attack an area of unattended items and structures made of Tier 1 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "Cone 2", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Improved Dusting": {
				"name": "Improved Dusting", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "3 Ki", "description": "You may attack an unattended item or structure made of Tier 2 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": []
			},
			"Greater Dusting": {
				"name": "Greater Dusting", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "4 Ki", "description": "You may attack an unattended item or structure made of Tier 3 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "5", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": []
			},
			"Legendary Dusting": {
				"name": "Legendary Dusting", "augmentBase": "Dustcraft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "1/Round", "resourceCost": "5 Ki", "description": "You may attack an unattended item or structure made of Tier 4 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "6", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": []
			},
			"Form Path": {
				"name": "Form Path", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Affinity+; Focus+", "limits": "", "resourceCost": "1 Ki", "description": "Disks of matter fly to points that you designate to make a new path. You can set them horizontally to make a path across the ground or atop a liquid, or anchor them into a vertical surface to make steps. Moving across the path lets a creature ignore difficult terrain and hazardous terrain from the ground beneath it.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Line 3", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Form Pillar", "Stepping Path", "Form Wall", "Scattered Pillars", "Great Wall"]
			},
			"Form Pillar": {
				"name": "Form Pillar", "augmentBase": "Form Path", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Affinity+; Focus+", "limits": "", "resourceCost": "2 Ki", "description": "You create a pillar in a space within range. The pillar is size 1 and 2 spaces high. Any character that shares the space with the pillar is attacked by this magic. You may optionally choose to make the pillar raise slowly enough that it does not do damage.", "onSuccess": "The target gains the launched status and is pushed 1 space in a direction of their choosing.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Structure", "defense": "PR DC", "range": "3", "rType": "Range", "target": "One Space", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "", "augments": []
			},
			"Stepping Path": {
				"name": "Stepping Path", "augmentBase": "Form Path", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Affinity+; Focus+", "limits": "", "resourceCost": "2 Ki", "description": "Disks of matter fly to points that you designate to make a new path. You can set them horizontally to make a path across the ground or atop a liquid, or anchor them into a vertical surface to make steps. Moving across the path lets a creature ignore difficult terrain and hazardous terrain from the ground beneath it.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Line 6", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Form Wall": {
				"name": "Form Wall", "augmentBase": "Form Path", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Affinity+; Focus+", "limits": "", "resourceCost": "3 Ki", "description": "You create three pillars in three spaces within range. Each pillar must be adjacent to another pillar created by this spell. The pillar is size 1 and 2 spaces high. Any character that shares the space with the pillar is attacked by this magic. You may optionally choose to make the pillar raise slowly enough that it does not do damage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "One Space", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "", "augments": []
			},
			"Scattered Pillars": {
				"name": "Scattered Pillars", "augmentBase": "Form Path", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Affinity+; Focus+", "limits": "", "resourceCost": "4 Ki", "description": "You create three pillars in three spaces within range. The pillar is size 1 and 2 spaces high. Any character that shares the space with the pillar is attacked by this magic. You may optionally choose to make the pillar raise slowly enough that it does not do damage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "One Space", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "", "augments": []
			},
			"Great Wall": {
				"name": "Great Wall", "augmentBase": "Form Path", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Affinity+; Focus+", "limits": "", "resourceCost": "5 Ki", "description": "You create six pillars in three spaces within range. Each pillar must be adjacent to another pillar created by this spell. The pillar is size 1 and 2 spaces high. Any character that shares the space with the pillar is attacked by this magic. You may optionally choose to make the pillar raise slowly enough that it does not do damage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "One Space", "targetCode": "Field", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Force", "element": "", "augments": []
			},
			"Cultivate": {
				"name": "Cultivate", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You provide nourishment to a plant and accelerate its growth by one day. This acceleration ages the plant's overall life. If the plant is mature it can bear fruit or flower. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Wood", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Range", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Entangle", "Wildwood"]
			},
			"Entangle": {
				"name": "Entangle", "augmentBase": "Cultivate", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "2 Ki", "description": "You cause ether to mimic the plant material of the area and cause it to overgrow wildly. The area becomes difficult terrain.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Wildwood": {
				"name": "Wildwood", "augmentBase": "Cultivate", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "3 Ki", "description": "You cause ether to mimic the plant material of the area and cause it to overgrow wildly. The area becomes difficult terrain.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Range", "target": "Blast 2", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Distortion": {
				"name": "Distortion", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "", "description": "Your form wavers as an illusory duplicate of you forms beside you. The first attack against you until the end of the round has +1 Disadvantage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "Light", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Lasting Distortion"]
			},
			"Lasting Distortion": {
				"name": "Lasting Distortion", "augmentBase": "Distortion", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "3 Ki", "description": "The disadvantage from Distortion now lasts until the end of the round.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Camoflauge": {
				"name": "Camoflauge", "augmentBase": "Path", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+; Material", "limits": "", "resourceCost": "1 Ki", "description": "You cover yourself with dust or loose material in the environment. As long as the material could blend in with your environment and you have soft cover, you may take the Hide action.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Blurred Light": {
				"name": "Blurred Light", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "1 Ki", "description": "As long as you remain in dim or darker light, you become invisible until the end of your next turn. Taking any action other than Stadard Move, Dash, or Hide breaks this invisibility.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "Light", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Light Refraction"]
			},
			"Light Refraction": {
				"name": "Light Refraction", "augmentBase": "Blurred Light", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "1 Ki", "description": "Your invisiblity works in light, however instead it breaks if you take any action other than Hide.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Shadow Steps": {
				"name": "Shadow Steps", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "1 Ki", "description": "As long as you remain in dim or darker light, you become invisible until the end of your next turn. Taking any action other than Stadard Move, Dash, or Hide breaks this invisibility.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "Shadow", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shadow Walker"]
			},
			"Shadow Walker": {
				"name": "Shadow Walker", "augmentBase": "Shadow Steps", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "4 Ki", "description": "As part of Shadow Steps, you also impart Shadow Steps on all those adjacent to you.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "Burst 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Water Blast": {
				"name": "Water Blast", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "Push the target one space in any direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Water", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": ["Geyser", "Geyser Line", "Surf", "Great Geyser Line", "Tidal Wave"]
			},
			"Geyser": {
				"name": "Geyser", "augmentBase": "Water Blast", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": []
			},
			"Geyser Line": {
				"name": "Geyser Line", "augmentBase": "Water Blast", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "Line 3", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": []
			},
			"Surf": {
				"name": "Surf", "augmentBase": "Water Blast", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "Line 3", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": []
			},
			"Great Geyser Line": {
				"name": "Great Geyser Line", "augmentBase": "Water Blast", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Ki", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "Line 6", "targetCode": "Single", "dVal": "5", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": []
			},
			"Tidal Wave": {
				"name": "Tidal Wave", "augmentBase": "Water Blast", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "Instead, push the targets up to three spaces in any direction. Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "5", "rType": "Range", "target": "Blast 1", "targetCode": "Single", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": []
			},
			"Sand Surge": {
				"name": "Sand Surge", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You cause sand to launch away from you at a target. You may choose to not deal damage with this attack.", "onSuccess": "You may choose to push the target up to two spaces, directly away from you.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Earth", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "Force", "element": "Earth", "augments": ["Sand Spout", "Sand Wave", "Sand Launcher"]
			},
			"Sand Spout": {
				"name": "Sand Spout", "augmentBase": "Sand Surge", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You cause sand to launch away from you at a target. You may choose to not deal damage with this attack.", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Earth", "augments": []
			},
			"Sand Wave": {
				"name": "Sand Wave", "augmentBase": "Sand Surge", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You cause sand to launch away from you at a target. You may choose to not deal damage with this attack.", "onSuccess": "You may choose to push the target up to two spaces, directly away from you.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "1", "rType": "Threat", "target": "Line 5", "targetCode": "Single", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "Force", "element": "Earth", "augments": []
			},
			"Sand Launcher": {
				"name": "Sand Launcher", "augmentBase": "Sand Surge", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Ki", "description": "You cause sand to launch away from you at a target. You may choose to not deal damage with this attack.", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "1", "rType": "Threat", "target": "Line 5", "targetCode": "Single", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Earth", "augments": []
			},
			"Fog Cloud": {
				"name": "Fog Cloud", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "1 Ki", "description": "You cause fog to rise from the ground. This fog is thick enough to provide soft cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Storm", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter"]
			},
			"Sleet": {
				"name": "Sleet", "augmentBase": "Fog Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus; Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "Presence DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Freezing Sleet": {
				"name": "Freezing Sleet", "augmentBase": "Fog Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus; Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "Presence DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Hail": {
				"name": "Hail", "augmentBase": "Fog Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus; Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You create a storm of hail. Any character in the storm is attacked by this spell when it is created and then may move 1 space.\n\nAny character that starts their turn in or passes through this storm gains the chilled condition.", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Binding Sleet": {
				"name": "Binding Sleet", "augmentBase": "Fog Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus; Volatile", "limits": "", "resourceCost": "4 Ki", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "The target gains the immobilized condition.", "dConditions": "C:Immobilized", "tEffect": "C:Immobilized", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "Presence DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Ice Storm": {
				"name": "Ice Storm", "augmentBase": "Fog Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus; Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You cause fog to rise from the ground. This fog is thick enough to provide soft cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Fimbulwinter": {
				"name": "Fimbulwinter", "augmentBase": "Fog Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus; Volatile", "limits": "", "resourceCost": "6 Ki", "description": "You cause fog to rise from the ground. This fog is thick enough to provide soft cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "PR DC", "range": "4", "rType": "Range", "target": "Blast 2", "targetCode": "Field", "dVal": "6", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Smoke Cloud": {
				"name": "Smoke Cloud", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "", "description": "You cause smoke to rise from the ground. This smoke is thick enough to provide soft cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Smoke", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Burning Smoke", "Choking Smoke"]
			},
			"Burning Smoke": {
				"name": "Burning Smoke", "augmentBase": "Smoke Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "The smoke burns as it forms.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "Presence DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Choking Smoke": {
				"name": "Choking Smoke", "augmentBase": "Smoke Cloud", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "The smoke suffocates those within.", "onSuccess": "The target gains the impaired condition.", "dConditions": "C:Impaired", "tEffect": "C:Impaired", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Field", "defense": "Presence DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Heat Field": {
				"name": "Heat Field", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may produce heat in one of the following ways. \n• You raise the temperature in a Burst 3 around you by up to 15°C.\n• You raise the temperature of an object you touch by 30°C.\n• You immediately dry a target wet creature or object.\nThese effects may cause objects to immediately begin to melt.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Fire", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Burn Guard"]
			},
			"Burn Guard": {
				"name": "Burn Guard", "augmentBase": "Heat Field", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You automatically end the aflame condition on yourself.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Cold Field": {
				"name": "Cold Field", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may produce cold in one of the following ways. \n• You lower the temperature in a Burst 3 around you by up to 15°C.\n• You lower the temperature of an object you touch by 30°C.\nThese effects may cause objects to immediately begin to freeze.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Water", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Chill Guard"]
			},
			"Chill Guard": {
				"name": "Chill Guard", "augmentBase": "Cold Field", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You automatically end the chilled condition on yourself.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Ether Sense": {
				"name": "Ether Sense", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you are within 1 space of a source of stable ether you are made aware of what object is causing the ether.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Metal", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Spirit Sense"]
			},
			"Spirit Sense": {
				"name": "Spirit Sense", "augmentBase": "Ether Sense", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You can detect spirits residing within characters or objects you touch. When you touch a creature, make an Ethereal skill check. On success, you sense the spirit. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Sicken": {
				"name": "Sicken", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You launch poisonous spores at your target.", "onSuccess": "The target gains the sickened condition.", "dConditions": "C:Sickened", "tEffect": "C:Sickened", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "Poison", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "Fortitude", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "1", "dType": "3", "dBonus": "", "damageType": "Tension", "element": "", "augments": ["Spores", "Sickening Cloud", "Virulent Spores"]
			},
			"Spores": {
				"name": "Spores", "augmentBase": "Sicken", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "You launch poisonous spores at your target.", "onSuccess": "Roll 1d3. On a 3, the target takes one Stress.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "Fortitude", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "1", "dType": "3", "dBonus": "", "damageType": "Tension", "element": "", "augments": []
			},
			"Sickening Cloud": {
				"name": "Sickening Cloud", "augmentBase": "Sicken", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "You launch poisonous spores at your target.", "onSuccess": "The target gains the sickened condition.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "Fortitude", "range": "3", "rType": "Range", "target": "Burst 1", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Tension", "element": "", "augments": []
			},
			"Virulent Spores": {
				"name": "Virulent Spores", "augmentBase": "Sicken", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "You launch poisonous spores at your target.", "onSuccess": "When rolling the die, on a 2, the target takes one Stress.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "Fortitude", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Tension", "element": "", "augments": []
			},
			"Wind Step": {
				"name": "Wind Step", "augmentBase": "Path", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Wind", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air"]
			},
			"Updraft": {
				"name": "Updraft", "augmentBase": "Wind Step", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Reaction", "traits": "Focus", "limits": "1/Round", "resourceCost": "", "description": "You cause a sustained updraft on the ground below the target. This spell disperses fog, dust, and other particles in the same area. \n\nThose who make a vertical jump in the area increase their jump height by 3 spaces. Characters that end a fall within the area treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You or another character within range jump or fall.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "One Space", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Clouded Updraft": {
				"name": "Clouded Updraft", "augmentBase": "Wind Step", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Reaction", "traits": "Focus", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You cause a sustained updraft on the ground below the target. This spell disperses fog, dust, and other particles in the same area. \n\nThose who make a vertical jump in the area increase their jump height by 3 spaces. Characters that end a fall within the area treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You or another character within range jump or fall.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "Blast 2", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Wind Fall": {
				"name": "Wind Fall", "augmentBase": "Wind Step", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Walk on Air": {
				"name": "Walk on Air", "augmentBase": "Wind Step", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn you may fly using your standard movement. However, at the end of your turn you immediately fall.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Fire Step": {
				"name": "Fire Step", "augmentBase": "Path", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "Soul", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Liftoff", "Jet"]
			},
			"Liftoff": {
				"name": "Liftoff", "augmentBase": "Fire Step", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Once during your standard move, you may move 2 spaces vertically. This movement does not count towards your total speed for this movement. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Jet": {
				"name": "Jet", "augmentBase": "Fire Step", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn you may fly using your standard movement. However, at the end of your turn you immediately fall.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Tremorsense": {
				"name": "Tremorsense", "augmentBase": "Path", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You can sense creatures through vibration. When you use the Search technique you gain +1 Advantage on any creature on the same surface as you and within ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Earth", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Firebolt": {
				"name": "Firebolt", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You launch a mote of fire at a foe.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Fire", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": ["Bonfire", "Flame Arrow", "Fireball", "Wall of Fire", "Field of Flame", "Fireblast", "Ragnarok"]
			},
			"Bonfire": {
				"name": "Bonfire", "augmentBase": "Firebolt", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Focus+; Volatile", "limits": "", "resourceCost": "1 Ki", "description": "You cause a space within range to erupt in flame. Any character in the flame is attacked by this spell when it is conjured and then may move 1 space.\n\nAny character that starts their turn in or passes through this flame gains the aflame condition.", "onSuccess": "", "dConditions": "C:Aflame", "tEffect": "", "rEffect": "C:Aflame", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Conjure", "defense": "PR DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Field", "dVal": "1", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Flame Arrow": {
				"name": "Flame Arrow", "augmentBase": "Firebolt", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You launch an arrow of fire at a foe that sets them on fire.", "onSuccess": "The target gains the aflame condition.", "dConditions": "C:Aflame", "tEffect": "C:Aflame", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Fireball": {
				"name": "Fireball", "augmentBase": "Firebolt", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You launch a bolt of fire at a target that on impact explodes.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Single", "dVal": "4", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Wall of Fire": {
				"name": "Wall of Fire", "augmentBase": "Firebolt", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Focus+; Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You cause an area within range to erupt in flame. Any character in the flame is attacked by this spell when it is conjured and then may move 1 space.\n\nAny character that starts their turn in or passes through this flame gains the aflame condition.", "onSuccess": "", "dConditions": "C:Aflame", "tEffect": "", "rEffect": "C:Aflame", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Conjure", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Line 3", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Field of Flame": {
				"name": "Field of Flame", "augmentBase": "Firebolt", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Focus+; Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You cause an area within range to erupt in flame. Any character in the flame is attacked by this spell when it is conjured and then may move 1 space.\n\nAny character that starts their turn in or passes through this flame gains the aflame condition.", "onSuccess": "", "dConditions": "C:Aflame", "tEffect": "", "rEffect": "C:Aflame", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Conjure", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Fireblast": {
				"name": "Fireblast", "augmentBase": "Firebolt", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Ki", "description": "You launch a bolt of fire at a target that on impact explodes.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Blast 2", "targetCode": "Single", "dVal": "5", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Ragnarok": {
				"name": "Ragnarok", "augmentBase": "Firebolt", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "7 Ki; 1 Chakra", "description": "You create a massive ball of fire that consumes a wide area, setting everything ablaze.", "onSuccess": "The target gains the aflame condition.", "dConditions": "C:Aflame", "tEffect": "C:Aflame", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Blast 2", "targetCode": "Single", "dVal": "13", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": []
			},
			"Lightning Shaft": {
				"name": "Lightning Shaft", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You concentrate lightning in your hands before thrusting it forward.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Lightning", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "1", "rType": "Threat", "target": "Line 2", "targetCode": "Single", "dVal": "1", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": ["Shock", "Lightning Bolt", "Plasma Arc", "Fulgor"]
			},
			"Shock": {
				"name": "Shock", "augmentBase": "Lightning Shaft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You touch a foe with electricity concentrated into your palm.", "onSuccess": "The target gains the paralyzed condition.", "dConditions": "C:Paralyzed", "tEffect": "C:Paralyzed", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": []
			},
			"Lightning Bolt": {
				"name": "Lightning Bolt", "augmentBase": "Lightning Shaft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You sent a bolt of lightning from your fingertips in a direction of your choice.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "1", "rType": "Threat", "target": "Line 6", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": []
			},
			"Plasma Arc": {
				"name": "Plasma Arc", "augmentBase": "Lightning Shaft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Ki", "description": "When you strike a target you may target another with this spell as long as they are within 2 spaces of the last target. The next target does not have to be within this spell's range. You may chain this lightning up to 5 times.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "1", "rType": "Threat", "target": "Line 2", "targetCode": "Single", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": []
			},
			"Fulgor": {
				"name": "Fulgor", "augmentBase": "Lightning Shaft", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "7 Ki; 1 Chakra", "description": "You concentrate lightning in your hands before thrusting it forward.", "onSuccess": "The target gains the paralyzed condition.", "dConditions": "C:Paralyzed", "tEffect": "C:Paralyzed", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "1", "rType": "Threat", "target": "Line 8", "targetCode": "Single", "dVal": "8", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": []
			},
			"Kinesis": {
				"name": "Kinesis", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "Focus; Material", "limits": "", "resourceCost": "", "description": "You can target one object within 2 spaces, made of a Tier 1 material and of 15 Bulk or less. The object floats at your side in your space. You are not considered to be holding the object with this technique. \n\nOnce per turn, you may move the object anywhere within 2 spaces of you. As long as you maintain focus, the object returns to your side at the end of your turn.\n\nCharacters can target the object as it is not on your person. You defend against their attacks using your Enchant DC.\n\nYou are only considered to be focusing with this technique if you are actively controlling an object. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis"]
			},
			"Distant Kinesis": {
				"name": "Distant Kinesis", "augmentBase": "Kinesis", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "Focus; Material", "limits": "", "resourceCost": "", "description": "You may target an object up to 5 spaces away. This expanded range does not affect the distance you may move the object from you.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Kinetic Strike": {
				"name": "Kinetic Strike", "augmentBase": "Kinesis", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "Focus; Material", "limits": "", "resourceCost": "", "description": "When you use the Strike Technique, you may attack with the object as if you are at the object's location. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Kinetic Throw": {
				"name": "Kinetic Throw", "augmentBase": "Kinesis", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "Focus; Material", "limits": "", "resourceCost": "", "description": "When you throw an object and the object is the target of your kinesis technique, you may increase your throw range by 3.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Heavy Kinesis": {
				"name": "Heavy Kinesis", "augmentBase": "Kinesis", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "Focus; Material", "limits": "", "resourceCost": "", "description": "The object you target can be up to 40 Bulk, however you cannot move the object away from you nor attack with it.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Cold Snap": {
				"name": "Cold Snap", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Water", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "2", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": ["Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust"]
			},
			"Frostbite": {
				"name": "Frostbite", "augmentBase": "Cold Snap", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "2", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Freezebind": {
				"name": "Freezebind", "augmentBase": "Cold Snap", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "The target gains the immobilzed condition.", "dConditions": "C:Immobilized", "tEffect": "C:Immobilized", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "2", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Cold Burst": {
				"name": "Cold Burst", "augmentBase": "Cold Snap", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "0", "rType": "Threat", "target": "Burst 1", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Cold Front": {
				"name": "Cold Front", "augmentBase": "Cold Snap", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Ki", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "2", "rType": "Threat", "target": "Blast 1", "targetCode": "Single", "dVal": "6", "dType": "3", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Diamond Dust": {
				"name": "Diamond Dust", "augmentBase": "Cold Snap", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "7 Ki; 1 Chakra", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "The target gains the chilled and immobilized condition.", "dConditions": "C:Chilled;C:Immobilized", "tEffect": "C:Chilled;C:Immobilized", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "PR DC", "range": "0", "rType": "Threat", "target": "Burst 2", "targetCode": "Single", "dVal": "8", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": []
			},
			"Burden": {
				"name": "Burden", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You force earth to cling to the target, weighing them down. A creature becomes immune to this technique for 5 minutes after it is used on them.", "onSuccess": "The target gains the encumbered condition.", "dConditions": "C:Encumbered", "tEffect": "C:Encumbered", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Gravity", "tr": "", "ot": "" },
				"skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Pressure", "Restrain", "Wide Pressure", "Prostration", "Deep Pressure", "Gravity Well"]
			},
			"Pressure": {
				"name": "Pressure", "augmentBase": "Burden", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "3 Ki", "description": "You increase the effects of gravity within an area. The area is considered difficult terrain.\n\nAny character that starts their turn in or passes through this area gains the encumbered condition.", "onSuccess": "The target gains the encumbered condition.", "dConditions": "C:Encumbered", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Restrain": {
				"name": "Restrain", "augmentBase": "Burden", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "You weigh a target down with gravity. A creature becomes immune to this technique for 5 minutes after it is used on them.", "onSuccess": "The target gains the immobilzed condition.", "dConditions": "C:Immobilized", "tEffect": "C:Immobilized", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Wide Pressure": {
				"name": "Wide Pressure", "augmentBase": "Burden", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "5 Ki", "description": "You increase the effects of gravity within an area. The area is considered difficult terrain.\n\nAny character that starts their turn in or passes through this area gains the encumbered condition.", "onSuccess": "The target gains the encumbered condition.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "Blast 2", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Prostration": {
				"name": "Prostration", "augmentBase": "Burden", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "You force gravity to weigh down on a creature such that they are forced to the ground. A creature becomes immune to this technique for 5 minutes after it is used on them.", "onSuccess": "The target gains the immobilzed condition and is knocked prone.", "dConditions": "C:Immobilized;C:Prone", "tEffect": "C:Immobilized;C:Prone", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Deep Pressure": {
				"name": "Deep Pressure", "augmentBase": "Burden", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "5 Ki", "description": "You increase the effects of gravity within an area. The area is considered difficult terrain.\n\nAny character that starts their turn in or passes through this area also gains the immobilized condition.", "onSuccess": "The target gains the encumbered condition.", "dConditions": "C:Immobilized", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Gravity Well": {
				"name": "Gravity Well", "augmentBase": "Burden", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Full", "traits": "Focus+", "limits": "", "resourceCost": "7 Ki", "description": "You increase the effects of gravity within an area. The area is considered difficult terrain.\n\nAny character that starts their turn in or passes through this area also gains the immobilized condition and are pushed 1 space towards the center of the area.", "onSuccess": "The target gains the encumbered condition.", "dConditions": "C:Immobilized", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "Blast 2", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Shield Block": {
				"name": "Shield Block", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Reaction", "traits": "Material", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You quickly create a shield of a material to block the triggering attack. Your DC increases by 5 against the attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You are attacked and the defense is Brace DC, BR DC, or BP DC.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Glancing Block", "Aegis"]
			},
			"Glancing Block": {
				"name": "Glancing Block", "augmentBase": "Shield Block", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Reaction", "traits": "Material", "limits": "1/Round", "resourceCost": "2 Ki", "description": "The hit becomes a glancing hit.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You are attacked and the defense is Brace DC, BR DC, or BP DC.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Aegis": {
				"name": "Aegis", "augmentBase": "Shield Block", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Reaction", "traits": "Material", "limits": "1/Round", "resourceCost": "4 Ki", "description": "The hit becomes a miss.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You are attacked and the defense is Brace DC, BR DC, or BP DC.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Light": {
				"name": "Light", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You can create an orb of light that either stays in one location or follows at your side. As a free action, you can move an orb of light up to 10 spaces. If the light leaves your line of sight or you fall unconscious, the light disappears.\n\nThe orb sheds bright light in a 4 space radius and dim light for an additional 4 spaces. The light can be colored as you like. Completely covering the object with something opaque blocks the light. \n\nThe orb of light is destroyed if it ever enters or is surrounded by the Darkness spell's area of effect.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Light", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Dancing Lights", "Flash", "Sunlight"]
			},
			"Dancing Lights": {
				"name": "Dancing Lights", "augmentBase": "Light", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You can create up to three orbs at a time. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Flash": {
				"name": "Flash", "augmentBase": "Light", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "As a quick action, you make a single orb of light flare.", "onSuccess": "The target gains the staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Conjure", "defense": "Notice DC", "range": "10", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Sunlight": {
				"name": "Sunlight", "augmentBase": "Light", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "Your orbs of light are no longer destroyed by darkness spell's area of effect, however are still destroyed by the Nightfall spell's area of effect.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Darkness": {
				"name": "Darkness", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "2 Ki", "description": "You create an area of darkness. This darkness provides soft cover and eliminates any light sources within other than the Sunlight spell's orbs of light.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "Shadow", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "6", "rType": "Range", "target": "Blast 2", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shadow Wall", "Nightfall"]
			},
			"Shadow Wall": {
				"name": "Shadow Wall", "augmentBase": "Darkness", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "3 Ki", "description": "You create an area of darkness. This darkness provides soft cover and eliminates any light sources within other than the Sunlight spell's orbs of light.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "6", "rType": "Range", "target": "Line 10", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Nightfall": {
				"name": "Nightfall", "augmentBase": "Darkness", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "4 Ki", "description": "This darkness destroys the Sunlight spell's orbs of light.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": 2, "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "6", "rType": "Range", "target": "Blast 3", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Wind Bullet": {
				"name": "Wind Bullet", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "1 Ki", "description": "You create a gust of wind and push a target. You may choose to not deal damage with this attack.", "onSuccess": "Push the target up to two spaces in any direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Wind", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "4", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "1", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": ["Gust", "Windsweep", "Gale"]
			},
			"Gust": {
				"name": "Gust", "augmentBase": "Wind Bullet", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You create a gust of wind and push a target. You may choose to not deal damage with this attack.", "onSuccess": "Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "4", "rType": "Range", "target": "Line 3", "targetCode": "Single", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": []
			},
			"Windsweep": {
				"name": "Windsweep", "augmentBase": "Wind Bullet", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Ki", "description": "You create a gust of wind and push a target. You may choose to not deal damage with this attack.", "onSuccess": "Push the target up to five spaces in any direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "4", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": []
			},
			"Gale": {
				"name": "Gale", "augmentBase": "Wind Bullet", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "5 Ki", "description": "You create a gust of wind and push a target. You may choose to not deal damage with this attack.", "onSuccess": "Instead, push the targets up to three spaces in any direction. Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Assault", "defense": "BP DC", "range": "4", "rType": "Range", "target": "Blast 1", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": []
			},
			"Power Flex": {
				"name": "Power Flex", "augmentBase": "", "techniqueSource": "Magic", "techniqueGroup": "Path", "family": "", "techniqueType": "Active", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You flex and imbue your body with ki, causing your muscles to momentarily double in size. You gain the Empowered condition.", "onSuccess": "", "dConditions": "C:Empowered", "tEffect": "C*:Empowered", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "Power", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"]
			},
			"Crush Knuckle": {
				"name": "Crush Knuckle", "augmentBase": "Power Flex", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "After flexing, make an attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Brawling", "defense": "Reflex DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": []
			},
			"Impact Knuckle": {
				"name": "Impact Knuckle", "augmentBase": "Power Flex", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "2 Ki", "description": "After flexing, you charge into the nearest target. Move up to half your speed in a straight line before making an attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "4", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": []
			},
			"Knuckle Flurry": {
				"name": "Knuckle Flurry", "augmentBase": "Power Flex", "techniqueSource": "Magic", "techniqueGroup": "Augment", "family": "", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "1/Round", "resourceCost": "4 Ki", "description": "After flexing, make three attacks. After each attack you gain the Empowered condition.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "1", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": []
			},
			"Second Wind": {
				"name": "Second Wind", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Fighter", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "1 Vitality", "description": "You take a breath and refocus your senses. You restore your HP to full.", "onSuccess": "", "dConditions": "", "tEffect": "H*:100%;R*:Vitality", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Second Breath", "Undaunted"]
			},
			"Second Breath": {
				"name": "Second Breath", "augmentBase": "Second Wind", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Fighter", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "2 Ki; 1 Vitality", "description": "You take a breath and refocus your senses. You restore your HP to full.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You take HP damage. ", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Undaunted": {
				"name": "Undaunted", "augmentBase": "Second Wind", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Fighter", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "3 Ki; 1 Chakra", "description": "Remove 1 Wound from yourself. In 5 minutes you take 1 Wound. You may choose to take this wound earlier.", "onSuccess": "", "dConditions": "", "tEffect": "R*:Wound", "rEffect": "", "trigger": "", "requirement": { "ot": "You have a wound.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Always Armored": {
				"name": "Always Armored", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Fighter", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You have +1 Armor.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Blocking Expert"]
			},
			"Blocking Expert": {
				"name": "Blocking Expert", "augmentBase": "Always Armored", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Fighter", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You have +5 Block.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Preemptive Strike": {
				"name": "Preemptive Strike", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "Armament", "limits": "1/Round", "resourceCost": "", "description": "You perform a melee attack against the triggering character.", "onSuccess": "The target stops moving immediately and loses any unused movement.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "The target moves within your threat.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Preemptive Stagger", "Critical Maim"]
			},
			"Preemptive Stagger": {
				"name": "Preemptive Stagger", "augmentBase": "Preemptive Strike", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "Armament", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You perform a melee attack against the triggering character.", "onSuccess": "The target gains the Staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "The target moves within your threat.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Critical Maim": {
				"name": "Critical Maim", "augmentBase": "Preemptive Strike", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "Armament", "limits": "1/Round", "resourceCost": "3 Ki", "description": "You perform a melee attack against the triggering character.", "onSuccess": "The target loses 1 Quick Action or 1 Full Action.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "The target moves within your threat.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Pounce": {
				"name": "Pounce", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Interceptor", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "If your weapon has threat, your threat with the weapon increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Pounce and Step"]
			},
			"Pounce and Step": {
				"name": "Pounce and Step", "augmentBase": "Pounce", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Interceptor", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever you melee attack you may move 1 space after your attack. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Spellshot": {
				"name": "Spellshot", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Spellslinger", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You use projectiles as a conduit for magic. Until the end of the turn, techniques with the volatile trait gain the range of your equipped weapon. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Follow-Up Spellshot", "Bursting Spellshot"]
			},
			"Follow-Up Spellshot": {
				"name": "Follow-Up Spellshot", "augmentBase": "Spellshot", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Spellslinger", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You may use one technique with the volatile trait and has only one target. The technique must target the same target or space of the triggering character. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "An ally makes a melee or ranged attack against a character and that character is within your weapon range. ", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Bursting Spellshot": {
				"name": "Bursting Spellshot", "augmentBase": "Spellshot", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Spellslinger", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Chakra", "description": "You may use one technique with the volatile trait. The technique must target the same target or space of the triggering technique. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You use the Full Shoot technique. ", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Sharpshooter": {
				"name": "Sharpshooter", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Spellslinger", "techniqueType": "Support", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "Your range with Bow and Longarm weapons increases by 3 until the end of your turn.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Focused Sharpshooter"]
			},
			"Focused Sharpshooter": {
				"name": "Focused Sharpshooter", "augmentBase": "Sharpshooter", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Spellslinger", "techniqueType": "Support", "action": "Swift", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "Your ranged attacks with Bow and Longarm weapons ignore Soft Cover until the end of your turn.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Savior": {
				"name": "Savior", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Guardian", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You trade spaces with the triggering defending character and take the attack instead. The original attack is cancelled and the attacking character is forced to remake the melee attack against you. If the triggering defending character is adjacent to you after the attack, you may trade places with them. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "A character adjacent to you is hit by a melee attack.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Knock Away Savior", "Savior's Retaliation"]
			},
			"Knock Away Savior": {
				"name": "Knock Away Savior", "augmentBase": "Savior", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Guardian", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "After trading spaces with the defending character, you may move the character up to 2 spaces in any direction. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "A character adjacent to you is hit by a melee attack.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Savior's Retaliation": {
				"name": "Savior's Retaliation", "augmentBase": "Savior", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Guardian", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "After the attack against you is resolved you may immediately usd the Full Strike technique against the attacking character. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "A character adjacent to you is hit by a melee attack.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Defender's Will": {
				"name": "Defender's Will", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Guardian", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "Gain your Barrier and Block in Temporary HP. ", "onSuccess": "", "dConditions": "", "tEffect": "T*:Barrier;T*:Block", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Ironwill"]
			},
			"Ironwill": {
				"name": "Ironwill", "augmentBase": "Defender's Will", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Guardian", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "Remove a condition affecting you. ", "onSuccess": "", "dConditions": "", "tEffect": "R*:Condition", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Spellstrike": {
				"name": "Spellstrike", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Spellblade", "techniqueType": "Job", "action": "Swift", "traits": "Affinity; AP (All)", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You infuse your weapon with your elemental affinity. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "You hit an adjacent creature with a melee attack.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Mod", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Energy", "element": "", "augments": []
			},
			"Power Skirmish": {
				"name": "Power Skirmish", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Warrior", "techniqueType": "Job", "action": "Full", "traits": "Armament+; Brutal", "limits": "", "resourceCost": "", "description": "Make a melee attack and add 2d3 to the damage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "The weapon must be Two-Handed.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "BR DC", "range": "", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Sneak Attack": {
				"name": "Sneak Attack", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Rogue", "techniqueType": "Job", "action": "Swift", "traits": "AP (All)", "limits": "1/Turn", "resourceCost": "", "description": "You know how to strike subtly and exploit a foe’s distraction.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "You hit an adjacent creature with a finesse skill weapon and an ally is engaged with the target or you were hidden before you attacked.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Mod", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "Piercing", "element": "", "augments": ["Sneaky Follow-Up", "Assassinate"]
			},
			"Sneaky Follow-Up": {
				"name": "Sneaky Follow-Up", "augmentBase": "Sneak Attack", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Rogue", "techniqueType": "Job", "action": "Reaction", "traits": "AP (All)", "limits": "1/Turn", "resourceCost": "", "description": "You know how to strike subtly and exploit a foe’s distraction.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You attack when it is not your turn. ", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Mod", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "Piercing", "element": "", "augments": []
			},
			"Assassinate": {
				"name": "Assassinate", "augmentBase": "Sneak Attack", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Rogue", "techniqueType": "Job", "action": "Swift", "traits": "AP (All)", "limits": "1/Turn", "resourceCost": "2 Ki", "description": "You know how to strike subtly and exploit a foe’s distraction.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "The target must be Staggered when they were attacked.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Mod", "dVal": "5", "dType": "3", "dBonus": "", "damageType": "Piercing", "element": "", "augments": []
			},
			"Skulk Away": {
				"name": "Skulk Away", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Rogue", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may move half your speed after performing a Follow-Up Attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Skulk Then Hide"]
			},
			"Skulk Then Hide": {
				"name": "Skulk Then Hide", "augmentBase": "Skulk Away", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Rogue", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may use the Hide technique after moving. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Emergency Care": {
				"name": "Emergency Care", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You provide emergency first aid. The target may spend 1 Vitality to restore their HP to full. You may also clear a condition on the target.", "onSuccess": "", "dConditions": "", "tEffect": "H:100%;R:Vitality;R:Condition", "rEffect": "", "trigger": "", "requirement": { "ot": "You must have access to a Medkit.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Nightingale", "Rhapsody"]
			},
			"Nightingale": {
				"name": "Nightingale", "augmentBase": "Emergency Care", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "The target may restore their HP to full. ", "onSuccess": "", "dConditions": "", "tEffect": "H:100%", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Rhapsody": {
				"name": "Rhapsody", "augmentBase": "Emergency Care", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki; 1 Chakra", "description": "Remove 1 Wound from an adjacent character. This action consumes a Medkit.", "onSuccess": "", "dConditions": "", "tEffect": "R:Wound", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"First Aid": {
				"name": "First Aid", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Physician", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "The target may spend 1 Vitality to restore their HP to full.", "onSuccess": "", "dConditions": "", "tEffect": "H:100%;R:Vitality", "rEffect": "", "trigger": "", "requirement": { "ot": "You must have access to a Medkit.", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Cleansing Aid"]
			},
			"Cleansing Aid": {
				"name": "Cleansing Aid", "augmentBase": "First Aid", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Physician", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "Clear a condition on the target.", "onSuccess": "", "dConditions": "", "tEffect": "R:Condition", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Sprint": {
				"name": "Sprint", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Athlete", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may move up to your speed. During this movement you ignore engagement and your movement does not provoke reactions.", "onSuccess": "", "dConditions": "S:Engaged", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sprint Away", "Bounding Sprint"]
			},
			"Sprint Away": {
				"name": "Sprint Away", "augmentBase": "Sprint", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Athlete", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You may move up to your speed. During this movement you ignore engagement and your movement does not provoke reactions.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "A hostile character becomes engaged with you. ", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Bounding Sprint": {
				"name": "Bounding Sprint", "augmentBase": "Sprint", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Athlete", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "Until the end of your current turn, you ignore engagement, your movement does not provoke reactions, and you may move through enemies' spaces.", "onSuccess": "", "dConditions": "S:Engaged", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "Weapon", "defense": "BR DC", "range": "", "rType": "", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Metamagic": {
				"name": "Metamagic", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Arcanist", "techniqueType": "Job", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Strategize": {
				"name": "Strategize", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Investigator", "techniqueType": "Job", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Environmental Awareness": {
				"name": "Environmental Awareness", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Investigator", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you use Investigate to assess an environment you may ask one additional question upon passing your check.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Foresight": {
				"name": "Foresight", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "Your studies have left you with uncanny prescience. When a condition in the following list is met, you may perform the action.\n• When you fail a recall knowledge check and used a specialized knowledge, try again.\n• When initiative is determined, gain 10 Ki.\n• When you are surprised, you may choose to act in the surprise round.\n• When an adjacent ally starts their turn, you allow the character to use the Dash technique once for free.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "Trigger conditions vary.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Saw That Coming", "As You May Recall"]
			},
			"Saw That Coming": {
				"name": "Saw That Coming", "augmentBase": "Foresight", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "2 Ki", "description": "You may include the following options:\n• When a character becomes engaged with you, you may move half your speed. \n• When an adjacent ally is targetted by an attack, you may use the reposition technique on them before the attack occurs. If the ally is not in the attacker's range, the attack automatically misses.\n• When an adjacent ally gains a condition, clear the condition.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "Trigger conditions vary.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"As You May Recall": {
				"name": "As You May Recall", "augmentBase": "Foresight", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Day", "resourceCost": "1 Chakra", "description": "Instead you may declare a flashback scene. The scene cannot be more than 1 minute long and having happened no more than a day's time. The scene may show you having prepared for an outcome. This may come in the form of having purchased/acquired a necessary item or having gathered information related to the present. \n\nThis flashback must be possible in accordance to established events. The GM may declare you need to perform a skill check to have the scene occur. The GM is the final arbiter of whether a flashback can be established and what the consequences are.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "Trigger conditions vary.", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			},
			"Eclectic Knowledge": {
				"name": "Eclectic Knowledge", "augmentBase": "", "techniqueSource": "Class", "techniqueGroup": "", "family": "Scholar", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever a nearby character fails a recall knowledge check and you have not yet attempted to perform the same check, you may perform the same check with +1 advantage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Point of Clarity"]
			},
			"Point of Clarity": {
				"name": "Point of Clarity", "augmentBase": "Eclectic Knowledge", "techniqueSource": "Class", "techniqueGroup": "Augment", "family": "Scholar", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever a nearby character fails a recall knowledge check and you are trained in the same skill, you may add +4 to their check by correcting any gaps in their knowledge.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": { "ot": "", "wpn": "" },
				"prerequisite": { "lv": "", "wr": "", "tl": "", "ac": "", "mg": "", "br": "", "tr": "", "ot": "" },
				"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
			}
		},
		filterData = {
			"uniqueSource": {
				"keys": ["Basic", "Hero", "Creature", "Warfare", "Talent", "Acumen", "Magic", "Class"],
				"values": {
					"Basic": ["Quick Strike", "Quick Shoot", "Break Free", "Dash", "Escape", "Grapple", "Hide", "Mount", "Prepare", "Reposition", "Seach", "Full Strike", "Full Shoot", "Aid", "Encourage", "Stabilize", "Skill Check", "Surge", "Surge Beyond Limits", "Follow-Up Attack", "Grab an Edge", "Total Defense", "Equip", "Interact"],
					"Hero": ["Change Tech Slots", "Hold Out", "Overdrive"],
					"Creature": ["Nothing"],
					"Warfare": ["Martial Training", "Martial Training +", "Martial Training ++", "HP Up", "HP Up+", "HP Up++", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++", "Undying", "Undying +", "Ki Strike", "Drop Kick", "Uppercut", "Follow-Up Grapple", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Point Blank Shot", "Shot on the Run", "Pole Vault", "Quick Draw", "Rapid Volley", "Rushing Volley", "Extra Follow-Up Attack", "Extra Follow-Up Attack +"],
					"Talent": ["Physical Training", "Physical Training +", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Acceleration", "Power Vault", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Shove", "Knockdown", "Tumble", "Field Medic"],
					"Acumen": ["Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Cunning Action", "Demoralize", "Fascinate", "Impersonator", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +"],
					"Magic": ["Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +", "Channel Training", "Channel Training +", "Channel Training ++", "Dustcraft", "Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Path", "Form Pillar", "Stepping Path", "Form Wall", "Scattered Pillars", "Great Wall", "Cultivate", "Entangle", "Wildwood", "Distortion", "Lasting Distortion", "Camoflauge", "Blurred Light", "Light Refraction", "Shadow Steps", "Shadow Walker", "Water Blast", "Geyser", "Geyser Line", "Surf", "Great Geyser Line", "Tidal Wave", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Heat Field", "Burn Guard", "Cold Field", "Chill Guard", "Ether Sense", "Spirit Sense", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Wind Step", "Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air", "Fire Step", "Liftoff", "Jet", "Tremorsense", "Firebolt", "Bonfire", "Flame Arrow", "Fireball", "Wall of Fire", "Field of Flame", "Fireblast", "Ragnarok", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Burden", "Pressure", "Restrain", "Wide Pressure", "Prostration", "Deep Pressure", "Gravity Well", "Shield Block", "Glancing Block", "Aegis", "Light", "Dancing Lights", "Flash", "Sunlight", "Darkness", "Shadow Wall", "Nightfall", "Wind Bullet", "Gust", "Windsweep", "Gale", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"],
					"Class": ["Second Wind", "Second Breath", "Undaunted", "Always Armored", "Blocking Expert", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Pounce", "Pounce and Step", "Spellshot", "Follow-Up Spellshot", "Bursting Spellshot", "Sharpshooter", "Focused Sharpshooter", "Savior", "Knock Away Savior", "Savior's Retaliation", "Defender's Will", "Ironwill", "Spellstrike", "Power Skirmish", "Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Skulk Away", "Skulk Then Hide", "Emergency Care", "Nightingale", "Rhapsody", "First Aid", "Cleansing Aid", "Sprint", "Sprint Away", "Bounding Sprint", "Metamagic", "Strategize", "Environmental Awareness", "Foresight", "Saw That Coming", "As You May Recall", "Eclectic Knowledge", "Point of Clarity"]
				}
			},
			"uniqueGroup": {
				"keys": ["Boon", "Path", "Training"],
				"values": {
					"Training": ["Martial Training", "Martial Training +", "Martial Training ++", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Channel Training", "Channel Training +", "Channel Training ++"],
					"Boon": ["HP Up", "HP Up+", "HP Up++", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++", "Undying", "Undying +", "Pole Vault", "Quick Draw", "Physical Training", "Physical Training +", "Field Medic", "Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Impersonator", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +", "Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +"],
					"Path": ["Ki Strike", "Crushing Blade", "Piledriver", "Point Blank Shot", "Rapid Volley", "Extra Follow-Up Attack", "Acceleration", "Expeditious", "Poise", "Shove", "Tumble", "Cunning Action", "Demoralize", "Fascinate", "Dustcraft", "Form Path", "Cultivate", "Distortion", "Camoflauge", "Blurred Light", "Shadow Steps", "Water Blast", "Sand Surge", "Fog Cloud", "Smoke Cloud", "Heat Field", "Cold Field", "Ether Sense", "Sicken", "Wind Step", "Fire Step", "Tremorsense", "Firebolt", "Lightning Shaft", "Kinesis", "Cold Snap", "Burden", "Shield Block", "Light", "Darkness", "Wind Bullet", "Power Flex"]
				}
			},
			"uniqueType": {
				"keys": ["Active", "Job", "Passive", "Permanent", "Standard", "Support"],
				"values": {
					"Standard": ["Quick Strike", "Quick Shoot", "Break Free", "Dash", "Escape", "Grapple", "Hide", "Mount", "Prepare", "Reposition", "Seach", "Full Strike", "Full Shoot", "Aid", "Encourage", "Stabilize", "Skill Check", "Surge", "Surge Beyond Limits", "Follow-Up Attack", "Grab an Edge", "Total Defense", "Equip", "Interact", "Change Tech Slots", "Hold Out", "Overdrive", "Nothing", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +"],
					"Permanent": ["Martial Training", "HP Up", "Vitality Boost", "Undying", "Pole Vault", "Quick Draw", "Physical Training", "Physical Training +", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Field Medic", "Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Impersonator", "Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +", "Channel Training", "Channel Training +", "Channel Training ++"],
					"Active": ["Ki Strike", "Drop Kick", "Uppercut", "Follow-Up Grapple", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Rapid Volley", "Rushing Volley", "Shove", "Knockdown", "Water Blast", "Geyser", "Geyser Line", "Surf", "Great Geyser Line", "Tidal Wave", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Firebolt", "Bonfire", "Flame Arrow", "Fireball", "Wall of Fire", "Field of Flame", "Fireblast", "Ragnarok", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Wind Bullet", "Gust", "Windsweep", "Gale", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"],
					"Passive": ["Point Blank Shot", "Shot on the Run", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Heat Field", "Burn Guard", "Cold Field", "Chill Guard", "Ether Sense", "Spirit Sense", "Wind Step", "Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air", "Fire Step", "Liftoff", "Jet", "Tremorsense", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Light", "Dancing Lights", "Flash", "Sunlight", "Always Armored", "Blocking Expert", "Pounce", "Pounce and Step", "Skulk Away", "Skulk Then Hide", "Environmental Awareness", "Eclectic Knowledge", "Point of Clarity"],
					"Support": ["Acceleration", "Power Vault", "Tumble", "Cunning Action", "Demoralize", "Fascinate", "Dustcraft", "Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Path", "Form Pillar", "Stepping Path", "Form Wall", "Scattered Pillars", "Great Wall", "Cultivate", "Entangle", "Wildwood", "Distortion", "Lasting Distortion", "Camoflauge", "Blurred Light", "Light Refraction", "Shadow Steps", "Shadow Walker", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Burden", "Pressure", "Restrain", "Wide Pressure", "Prostration", "Deep Pressure", "Gravity Well", "Shield Block", "Glancing Block", "Aegis", "Darkness", "Shadow Wall", "Nightfall", "Sharpshooter", "Focused Sharpshooter", "Defender's Will", "Ironwill", "First Aid", "Cleansing Aid"],
					"Job": ["Second Wind", "Second Breath", "Undaunted", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Spellshot", "Follow-Up Spellshot", "Bursting Spellshot", "Savior", "Knock Away Savior", "Savior's Retaliation", "Spellstrike", "Power Skirmish", "Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Emergency Care", "Nightingale", "Rhapsody", "Sprint", "Sprint Away", "Bounding Sprint", "Metamagic", "Strategize", "Foresight", "Saw That Coming", "As You May Recall"]
				}
			},
			"uniqueAction": {
				"keys": ["Free", "Full", "Quick", "Reaction", "Swift"],
				"values": {
					"Quick": ["Quick Strike", "Quick Shoot", "Break Free", "Dash", "Escape", "Grapple", "Hide", "Mount", "Prepare", "Reposition", "Seach", "Nothing", "Ki Strike", "Drop Kick", "Uppercut", "Acceleration", "Power Vault", "Shove", "Knockdown", "Tumble", "Cunning Action", "Demoralize", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +", "Quickcraft", "Form Path", "Stepping Path", "Distortion", "Lasting Distortion", "Darkness", "Shadow Wall", "Nightfall", "Crush Knuckle", "Impact Knuckle", "Defender's Will", "Ironwill", "First Aid", "Cleansing Aid"],
					"Full": ["Full Strike", "Full Shoot", "Aid", "Encourage", "Stabilize", "Skill Check", "Surge", "Surge Beyond Limits", "Change Tech Slots", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Rapid Volley", "Rushing Volley", "Fascinate", "Shape Material", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Pillar", "Form Wall", "Scattered Pillars", "Great Wall", "Cultivate", "Entangle", "Wildwood", "Camoflauge", "Blurred Light", "Light Refraction", "Shadow Steps", "Shadow Walker", "Water Blast", "Geyser", "Geyser Line", "Surf", "Great Geyser Line", "Tidal Wave", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Firebolt", "Bonfire", "Flame Arrow", "Fireball", "Wall of Fire", "Field of Flame", "Fireblast", "Ragnarok", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Burden", "Pressure", "Restrain", "Wide Pressure", "Prostration", "Deep Pressure", "Gravity Well", "Wind Bullet", "Gust", "Windsweep", "Gale", "Knuckle Flurry", "Power Skirmish", "Emergency Care", "Nightingale", "Rhapsody"],
					"Reaction": ["Follow-Up Attack", "Grab an Edge", "Total Defense", "Hold Out", "Follow-Up Grapple", "Pole Vault", "Updraft", "Clouded Updraft", "Shield Block", "Glancing Block", "Aegis", "Second Breath", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Follow-Up Spellshot", "Bursting Spellshot", "Savior", "Knock Away Savior", "Savior's Retaliation", "Sneaky Follow-Up", "Sprint Away", "Foresight", "Saw That Coming", "As You May Recall"],
					"Swift": ["Equip", "Interact", "Overdrive", "Point Blank Shot", "Shot on the Run", "Quick Draw", "Dustcraft", "Heat Field", "Cold Field", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Light", "Dancing Lights", "Flash", "Sunlight", "Power Flex", "Second Wind", "Undaunted", "Spellshot", "Sharpshooter", "Focused Sharpshooter", "Spellstrike", "Sneak Attack", "Assassinate", "Sprint", "Bounding Sprint"],
					"Free": ["Martial Training", "HP Up", "Vitality Boost", "Undying", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Physical Training", "Physical Training +", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Field Medic", "Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Impersonator", "Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +", "Channel Training", "Channel Training +", "Channel Training ++", "Burn Guard", "Chill Guard", "Ether Sense", "Spirit Sense", "Wind Step", "Wind Fall", "Walk on Air", "Fire Step", "Liftoff", "Jet", "Tremorsense", "Always Armored", "Blocking Expert", "Pounce", "Pounce and Step", "Skulk Away", "Skulk Then Hide", "Environmental Awareness", "Eclectic Knowledge", "Point of Clarity"]
				}
			},
			"uniqueTraits": {
				"keys": ["AP (X)", "Affinity", "Affinity+", "Armament", "Armament+", "Brutal", "Focus", "Focus+", "Material", "Simple", "Volatile"],
				"values": {
					"Armament": ["Quick Strike", "Quick Shoot", "Follow-Up Attack", "Nothing", "Rapid Volley", "Preemptive Strike"],
					"Simple": ["Hide", "Mount", "Encourage"],
					"Armament+": ["Full Strike", "Full Shoot", "Crushing Blade", "Piledriver", "Shredding Driver", "Rushing Volley", "Power Skirmish"],
					"Brutal": ["Full Strike", "Full Shoot", "Piledriver", "Shredding Driver", "Rapid Volley", "Rushing Volley", "Power Skirmish"],
					"AP (X)": ["Shredding Driver", "Spellstrike", "Sneak Attack"],
					"Material": ["Dustcraft", "Camoflauge", "Kinesis", "Shield Block"],
					"Affinity+": ["Form Path"],
					"Focus+": ["Form Path", "Wildwood", "Camoflauge", "Blurred Light", "Shadow Steps", "Bonfire", "Wall of Fire", "Field of Flame", "Pressure", "Wide Pressure", "Deep Pressure", "Gravity Well"],
					"Focus": ["Entangle", "Distortion", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Updraft", "Clouded Updraft", "Kinesis", "Darkness"],
					"Volatile": ["Water Blast", "Sand Surge", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Burning Smoke", "Choking Smoke", "Firebolt", "Bonfire", "Wall of Fire", "Field of Flame", "Lightning Shaft", "Cold Snap", "Wind Bullet"],
					"Affinity": ["Spellstrike"]
				}
			},
			"uniqueReqWeapon": {
				"keys": ["Hammer", "Large Hammer", "Large Sword", "Spear", "Staff", "Sword"],
				"values": {
					"Large Sword": ["Crushing Blade"],
					"Sword": ["Crushing Blade"],
					"Large Hammer": ["Piledriver"],
					"Hammer": ["Piledriver"],
					"Spear": ["Pole Vault", "Rapid Volley"],
					"Staff": ["Pole Vault", "Rapid Volley"]
				}
			},
			"uniqueBranch": {
				"keys": ["Earth", "Fire", "Gravity", "Light", "Lightning", "Metal", "Poison", "Power", "Shadow", "Smoke", "Soul", "Storm", "Water", "Wind", "Wood"],
				"values": {
					"Wood": ["Cultivate"],
					"Light": ["Distortion", "Blurred Light", "Light"],
					"Shadow": ["Shadow Steps", "Darkness"],
					"Water": ["Water Blast", "Cold Field", "Cold Snap"],
					"Earth": ["Sand Surge", "Tremorsense"],
					"Storm": ["Fog Cloud"],
					"Smoke": ["Smoke Cloud"],
					"Fire": ["Heat Field", "Firebolt"],
					"Metal": ["Ether Sense"],
					"Poison": ["Sicken"],
					"Wind": ["Wind Step", "Wind Bullet"],
					"Soul": ["Fire Step"],
					"Lightning": ["Lightning Shaft"],
					"Gravity": ["Burden"],
					"Power": ["Power Flex"]
				}
			},
			"uniqueSkill": {
				"keys": ["Acrobatics", "Assault", "Brawling", "Conjure", "Deception", "Enchant", "Field", "Intimidation", "Investigate", "Leadership", "Performance", "Physique", "Reflex", "Structure", "Weapon"],
				"values": {
					"Weapon": ["Quick Strike", "Quick Shoot", "Full Strike", "Full Shoot", "Follow-Up Attack", "Nothing", "Crushing Blade", "Piledriver", "Rapid Volley", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Preemptive Strike", "Bounding Sprint"],
					"Physique": ["Break Free", "Grapple", "Reposition", "Follow-Up Grapple", "Shove"],
					"Acrobatics": ["Escape", "Tumble"],
					"Investigate": ["Seach"],
					"Leadership": ["Encourage"],
					"Reflex": ["Grab an Edge"],
					"Brawling": ["Ki Strike", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"],
					"Deception": ["Cunning Action"],
					"Intimidation": ["Demoralize"],
					"Performance": ["Fascinate"],
					"Structure": ["Dust Material", "Form Pillar"],
					"Assault": ["Water Blast", "Sand Surge", "Sicken", "Firebolt", "Lightning Shaft", "Cold Snap", "Wind Bullet"],
					"Field": ["Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Burning Smoke", "Choking Smoke"],
					"Conjure": ["Bonfire", "Wall of Fire", "Field of Flame", "Flash"],
					"Enchant": ["Burden"]
				}
			},
			"uniqueDefense": {
				"keys": ["BP DC", "BR DC", "PR DC", "Presence DC", "Brace DC", "Insight DC", "Notice DC", "Resolve DC", "Fortitude DC", "Physique DC", "Stealth DC", "Reflex DC", "Fortitude"],
				"values": {
					"BP DC": ["Water Blast", "Sand Surge", "Burden", "Wind Bullet"],
					"BR DC": ["Quick Strike", "Quick Shoot", "Grapple", "Reposition", "Full Strike", "Full Shoot", "Follow-Up Attack", "Nothing", "Ki Strike", "Follow-Up Grapple", "Piledriver", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Shove", "Impact Knuckle", "Knuckle Flurry", "Preemptive Strike", "Power Skirmish", "Bounding Sprint"],
					"PR DC": ["Form Pillar", "Hail", "Ice Storm", "Fimbulwinter", "Firebolt", "Bonfire", "Wall of Fire", "Field of Flame", "Lightning Shaft", "Cold Snap"],
					"Presence DC": ["Sleet", "Freezing Sleet", "Binding Sleet", "Burning Smoke", "Choking Smoke"],
					"Brace DC": ["Rapid Volley", "Dust Material"],
					"Insight DC": ["Cunning Action", "Fascinate"],
					"Notice DC": ["Flash"],
					"Resolve DC": ["Demoralize"],
					"Fortitude DC": [],
					"Physique DC": ["Break Free", "Escape"],
					"Stealth DC": ["Seach"],
					"Reflex DC": ["Crushing Blade", "Tumble", "Crush Knuckle"],
					"Fortitude": ["Sicken"]
				}
			},
			"uniqueRange": {
				"keys": ["Range", "Threat"],
				"values": {
					"Threat": ["Quick Strike", "Break Free", "Escape", "Grapple", "Reposition", "Seach", "Full Strike", "Aid", "Encourage", "Stabilize", "Follow-Up Attack", "Nothing", "Ki Strike", "Follow-Up Grapple", "Crushing Blade", "Piledriver", "Rapid Volley", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Shove", "Tumble", "Cunning Action", "Demoralize", "Fascinate", "Dustcraft", "Shape Material", "Dust Material", "Dust Area", "Sand Surge", "Sand Wave", "Sand Launcher", "Updraft", "Clouded Updraft", "Lightning Shaft", "Cold Snap", "Cold Burst", "Diamond Dust", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry", "Preemptive Strike", "Power Skirmish", "Emergency Care", "First Aid"],
					"Range": ["Quick Shoot", "Full Shoot", "Form Path", "Cultivate", "Entangle", "Wildwood", "Water Blast", "Surf", "Tidal Wave", "Sand Spout", "Fog Cloud", "Fimbulwinter", "Smoke Cloud", "Sicken", "Firebolt", "Wall of Fire", "Field of Flame", "Burden", "Flash", "Darkness", "Wind Bullet", "Gust", "Gale"]
				}
			},
			"includeBaseSource": {
				"keys": ["Basic", "Hero", "Creature", "Warfare", "Talent", "Acumen", "Magic", "Class"],
				"values": {
					"Basic": ["Quick Strike", "Quick Shoot", "Break Free", "Dash", "Escape", "Grapple", "Hide", "Mount", "Prepare", "Reposition", "Seach", "Full Strike", "Full Shoot", "Aid", "Encourage", "Stabilize", "Skill Check", "Surge", "Surge Beyond Limits", "Follow-Up Attack", "Grab an Edge", "Total Defense", "Equip", "Interact"],
					"Hero": ["Change Tech Slots", "Hold Out", "Overdrive"],
					"Creature": ["Nothing"],
					"Warfare": ["Martial Training", "Martial Training +", "Martial Training ++", "HP Up", "HP Up+", "HP Up++", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++", "Undying", "Undying +", "Ki Strike", "Drop Kick", "Uppercut", "Follow-Up Grapple", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Point Blank Shot", "Shot on the Run", "Pole Vault", "Quick Draw", "Rapid Volley", "Rushing Volley", "Extra Follow-Up Attack", "Extra Follow-Up Attack +"],
					"Talent": ["Physical Training", "Physical Training +", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Acceleration", "Power Vault", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Shove", "Knockdown", "Tumble", "Field Medic"],
					"Acumen": ["Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Cunning Action", "Demoralize", "Fascinate", "Impersonator", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +"],
					"Magic": ["Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +", "Channel Training", "Channel Training +", "Channel Training ++", "Dustcraft", "Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Path", "Form Pillar", "Stepping Path", "Form Wall", "Scattered Pillars", "Great Wall", "Cultivate", "Entangle", "Wildwood", "Distortion", "Lasting Distortion", "Camoflauge", "Blurred Light", "Light Refraction", "Shadow Steps", "Shadow Walker", "Water Blast", "Geyser", "Geyser Line", "Surf", "Great Geyser Line", "Tidal Wave", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Heat Field", "Burn Guard", "Cold Field", "Chill Guard", "Ether Sense", "Spirit Sense", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Wind Step", "Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air", "Fire Step", "Liftoff", "Jet", "Tremorsense", "Firebolt", "Bonfire", "Flame Arrow", "Fireball", "Wall of Fire", "Field of Flame", "Fireblast", "Ragnarok", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Burden", "Pressure", "Restrain", "Wide Pressure", "Prostration", "Deep Pressure", "Gravity Well", "Shield Block", "Glancing Block", "Aegis", "Light", "Dancing Lights", "Flash", "Sunlight", "Darkness", "Shadow Wall", "Nightfall", "Wind Bullet", "Gust", "Windsweep", "Gale", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"],
					"Class": ["Second Wind", "Second Breath", "Undaunted", "Always Armored", "Blocking Expert", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Pounce", "Pounce and Step", "Spellshot", "Follow-Up Spellshot", "Bursting Spellshot", "Sharpshooter", "Focused Sharpshooter", "Savior", "Knock Away Savior", "Savior's Retaliation", "Defender's Will", "Ironwill", "Spellstrike", "Power Skirmish", "Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Skulk Away", "Skulk Then Hide", "Emergency Care", "Nightingale", "Rhapsody", "First Aid", "Cleansing Aid", "Sprint", "Sprint Away", "Bounding Sprint", "Metamagic", "Strategize", "Environmental Awareness", "Foresight", "Saw That Coming", "As You May Recall", "Eclectic Knowledge", "Point of Clarity"]
				}
			},
			"includeBaseGroup": {
				"keys": ["Boon", "Path", "Training"],
				"values": {
					"Training": ["Martial Training", "Martial Training +", "Martial Training ++", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Channel Training", "Channel Training +", "Channel Training ++"],
					"Boon": ["HP Up", "HP Up+", "HP Up++", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++", "Undying", "Undying +", "Pole Vault", "Quick Draw", "Physical Training", "Physical Training +", "Field Medic", "Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Impersonator", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +", "Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +"],
					"Path": ["Ki Strike", "Crushing Blade", "Piledriver", "Point Blank Shot", "Rapid Volley", "Extra Follow-Up Attack", "Acceleration", "Expeditious", "Poise", "Shove", "Tumble", "Cunning Action", "Demoralize", "Fascinate", "Dustcraft", "Form Path", "Cultivate", "Distortion", "Camoflauge", "Blurred Light", "Shadow Steps", "Water Blast", "Sand Surge", "Fog Cloud", "Smoke Cloud", "Heat Field", "Cold Field", "Ether Sense", "Sicken", "Wind Step", "Fire Step", "Tremorsense", "Firebolt", "Lightning Shaft", "Kinesis", "Cold Snap", "Burden", "Shield Block", "Light", "Darkness", "Wind Bullet", "Power Flex"]
				}
			},
			"includeBaseType": {
				"keys": ["Active", "Job", "Passive", "Permanent", "Standard", "Support"],
				"values": {
					"Standard": ["Quick Strike", "Quick Shoot", "Break Free", "Dash", "Escape", "Grapple", "Hide", "Mount", "Prepare", "Reposition", "Seach", "Full Strike", "Full Shoot", "Aid", "Encourage", "Stabilize", "Skill Check", "Surge", "Surge Beyond Limits", "Follow-Up Attack", "Grab an Edge", "Total Defense", "Equip", "Interact", "Change Tech Slots", "Hold Out", "Overdrive", "Nothing", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +"],
					"Permanent": ["Martial Training", "HP Up", "Vitality Boost", "Undying", "Pole Vault", "Quick Draw", "Physical Training", "Physical Training +", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Field Medic", "Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Impersonator", "Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +", "Channel Training", "Channel Training +", "Channel Training ++"],
					"Active": ["Ki Strike", "Drop Kick", "Uppercut", "Follow-Up Grapple", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Rapid Volley", "Rushing Volley", "Shove", "Knockdown", "Water Blast", "Geyser", "Geyser Line", "Surf", "Great Geyser Line", "Tidal Wave", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Firebolt", "Bonfire", "Flame Arrow", "Fireball", "Wall of Fire", "Field of Flame", "Fireblast", "Ragnarok", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Wind Bullet", "Gust", "Windsweep", "Gale", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"],
					"Passive": ["Point Blank Shot", "Shot on the Run", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Heat Field", "Burn Guard", "Cold Field", "Chill Guard", "Ether Sense", "Spirit Sense", "Wind Step", "Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air", "Fire Step", "Liftoff", "Jet", "Tremorsense", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Light", "Dancing Lights", "Flash", "Sunlight", "Always Armored", "Blocking Expert", "Pounce", "Pounce and Step", "Skulk Away", "Skulk Then Hide", "Environmental Awareness", "Eclectic Knowledge", "Point of Clarity"],
					"Support": ["Acceleration", "Power Vault", "Tumble", "Cunning Action", "Demoralize", "Fascinate", "Dustcraft", "Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Path", "Form Pillar", "Stepping Path", "Form Wall", "Scattered Pillars", "Great Wall", "Cultivate", "Entangle", "Wildwood", "Distortion", "Lasting Distortion", "Camoflauge", "Blurred Light", "Light Refraction", "Shadow Steps", "Shadow Walker", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Burden", "Pressure", "Restrain", "Wide Pressure", "Prostration", "Deep Pressure", "Gravity Well", "Shield Block", "Glancing Block", "Aegis", "Darkness", "Shadow Wall", "Nightfall", "Sharpshooter", "Focused Sharpshooter", "Defender's Will", "Ironwill", "First Aid", "Cleansing Aid"],
					"Job": ["Second Wind", "Second Breath", "Undaunted", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Spellshot", "Follow-Up Spellshot", "Bursting Spellshot", "Savior", "Knock Away Savior", "Savior's Retaliation", "Spellstrike", "Power Skirmish", "Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Emergency Care", "Nightingale", "Rhapsody", "Sprint", "Sprint Away", "Bounding Sprint", "Metamagic", "Strategize", "Foresight", "Saw That Coming", "As You May Recall"]
				}
			},
			"includeBaseAction": {
				"keys": ["Free", "Full", "Quick", "Reaction", "Swift"],
				"values": {
					"Quick": ["Quick Strike", "Quick Shoot", "Break Free", "Dash", "Escape", "Grapple", "Hide", "Mount", "Prepare", "Reposition", "Seach", "Nothing", "Ki Strike", "Drop Kick", "Uppercut", "Acceleration", "Power Vault", "Shove", "Knockdown", "Tumble", "Cunning Action", "Demoralize", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +", "Dustcraft", "Quickcraft", "Form Path", "Stepping Path", "Distortion", "Lasting Distortion", "Darkness", "Shadow Wall", "Nightfall", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Defender's Will", "Ironwill", "First Aid", "Cleansing Aid"],
					"Full": ["Full Strike", "Full Shoot", "Aid", "Encourage", "Stabilize", "Skill Check", "Surge", "Surge Beyond Limits", "Change Tech Slots", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Rapid Volley", "Rushing Volley", "Fascinate", "Dustcraft", "Shape Material", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Path", "Form Pillar", "Form Wall", "Scattered Pillars", "Great Wall", "Cultivate", "Entangle", "Wildwood", "Camoflauge", "Blurred Light", "Light Refraction", "Shadow Steps", "Shadow Walker", "Water Blast", "Geyser", "Geyser Line", "Surf", "Great Geyser Line", "Tidal Wave", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Firebolt", "Bonfire", "Flame Arrow", "Fireball", "Wall of Fire", "Field of Flame", "Fireblast", "Ragnarok", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Burden", "Pressure", "Restrain", "Wide Pressure", "Prostration", "Deep Pressure", "Gravity Well", "Wind Bullet", "Gust", "Windsweep", "Gale", "Power Flex", "Knuckle Flurry", "Power Skirmish", "Emergency Care", "Nightingale", "Rhapsody"],
					"Reaction": ["Follow-Up Attack", "Grab an Edge", "Total Defense", "Hold Out", "Ki Strike", "Follow-Up Grapple", "Pole Vault", "Wind Step", "Updraft", "Clouded Updraft", "Shield Block", "Glancing Block", "Aegis", "Second Wind", "Second Breath", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Spellshot", "Follow-Up Spellshot", "Bursting Spellshot", "Savior", "Knock Away Savior", "Savior's Retaliation", "Sneak Attack", "Sneaky Follow-Up", "Sprint", "Sprint Away", "Foresight", "Saw That Coming", "As You May Recall"],
					"Swift": ["Equip", "Interact", "Overdrive", "Point Blank Shot", "Shot on the Run", "Quick Draw", "Dustcraft", "Heat Field", "Cold Field", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Light", "Dancing Lights", "Flash", "Sunlight", "Power Flex", "Second Wind", "Undaunted", "Spellshot", "Sharpshooter", "Focused Sharpshooter", "Spellstrike", "Sneak Attack", "Assassinate", "Sprint", "Bounding Sprint"],
					"Free": ["Martial Training", "HP Up", "Vitality Boost", "Undying", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Physical Training", "Physical Training +", "Body Training", "Body Training +", "Body Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Field Medic", "Stress Release", "Stress Release +", "Stress Release ++", "Sensory Training", "Sensory Training +", "Broad Study", "Experienced Tracker", "Multilingual", "Multilingual +", "Specialized Lore", "Specialized Lore +", "Specialized Lore ++", "Improved Initiative", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Impersonator", "Ki Control", "Ki Control +", "Ki Control ++", "Surge Value", "Surge Value +", "Channel Training", "Channel Training +", "Channel Training ++", "Heat Field", "Burn Guard", "Cold Field", "Chill Guard", "Ether Sense", "Spirit Sense", "Wind Step", "Wind Fall", "Walk on Air", "Fire Step", "Liftoff", "Jet", "Tremorsense", "Always Armored", "Blocking Expert", "Pounce", "Pounce and Step", "Skulk Away", "Skulk Then Hide", "Environmental Awareness", "Eclectic Knowledge", "Point of Clarity"]
				}
			},
			"includeBaseTraits": {
				"keys": ["AP (X)", "Affinity", "Affinity+", "Armament", "Armament+", "Brutal", "Focus", "Focus+", "Material", "Simple", "Volatile"],
				"values": {
					"Armament": ["Quick Strike", "Quick Shoot", "Follow-Up Attack", "Nothing", "Rapid Volley", "Preemptive Strike"],
					"Simple": ["Hide", "Mount", "Encourage"],
					"Armament+": ["Full Strike", "Full Shoot", "Crushing Blade", "Piledriver", "Shredding Driver", "Rapid Volley", "Rushing Volley", "Power Skirmish"],
					"Brutal": ["Full Strike", "Full Shoot", "Piledriver", "Shredding Driver", "Rapid Volley", "Rushing Volley", "Power Skirmish"],
					"AP (X)": ["Piledriver", "Shredding Driver", "Spellstrike", "Sneak Attack"],
					"Material": ["Dustcraft", "Camoflauge", "Kinesis", "Shield Block"],
					"Affinity+": ["Form Path"],
					"Focus+": ["Form Path", "Cultivate", "Wildwood", "Camoflauge", "Blurred Light", "Shadow Steps", "Firebolt", "Bonfire", "Wall of Fire", "Field of Flame", "Burden", "Pressure", "Wide Pressure", "Deep Pressure", "Gravity Well"],
					"Focus": ["Cultivate", "Entangle", "Distortion", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Wind Step", "Updraft", "Clouded Updraft", "Kinesis", "Darkness"],
					"Volatile": ["Water Blast", "Sand Surge", "Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Firebolt", "Bonfire", "Wall of Fire", "Field of Flame", "Lightning Shaft", "Cold Snap", "Wind Bullet"],
					"Affinity": ["Spellstrike"]
				}
			},
			"includeBaseReqWeapon": {
				"keys": ["Hammer", "Large Hammer", "Large Sword", "Spear", "Staff", "Sword"],
				"values": {
					"Large Sword": ["Crushing Blade"],
					"Sword": ["Crushing Blade"],
					"Large Hammer": ["Piledriver"],
					"Hammer": ["Piledriver"],
					"Spear": ["Pole Vault", "Rapid Volley"],
					"Staff": ["Pole Vault", "Rapid Volley"]
				}
			},
			"includeBaseBranch": {
				"keys": ["Earth", "Fire", "Gravity", "Light", "Lightning", "Metal", "Poison", "Power", "Shadow", "Smoke", "Soul", "Storm", "Water", "Wind", "Wood"],
				"values": {
					"Wood": ["Cultivate"],
					"Light": ["Distortion", "Blurred Light", "Light"],
					"Shadow": ["Shadow Steps", "Darkness"],
					"Water": ["Water Blast", "Cold Field", "Cold Snap"],
					"Earth": ["Sand Surge", "Tremorsense"],
					"Storm": ["Fog Cloud"],
					"Smoke": ["Smoke Cloud"],
					"Fire": ["Heat Field", "Firebolt"],
					"Metal": ["Ether Sense"],
					"Poison": ["Sicken"],
					"Wind": ["Wind Step", "Wind Bullet"],
					"Soul": ["Fire Step"],
					"Lightning": ["Lightning Shaft"],
					"Gravity": ["Burden"],
					"Power": ["Power Flex"]
				}
			},
			"includeBaseSkill": {
				"keys": ["Acrobatics", "Assault", "Brawling", "Conjure", "Deception", "Enchant", "Field", "Intimidation", "Investigate", "Leadership", "Performance", "Physique", "Reflex", "Structure", "Weapon"],
				"values": {
					"Weapon": ["Quick Strike", "Quick Shoot", "Full Strike", "Full Shoot", "Follow-Up Attack", "Nothing", "Crushing Blade", "Piledriver", "Rapid Volley", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Preemptive Strike", "Sprint", "Bounding Sprint"],
					"Physique": ["Break Free", "Grapple", "Reposition", "Ki Strike", "Follow-Up Grapple", "Shove"],
					"Acrobatics": ["Escape", "Tumble"],
					"Investigate": ["Seach"],
					"Leadership": ["Encourage"],
					"Reflex": ["Grab an Edge"],
					"Brawling": ["Ki Strike", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"],
					"Deception": ["Cunning Action"],
					"Intimidation": ["Demoralize"],
					"Performance": ["Fascinate"],
					"Structure": ["Dustcraft", "Dust Material", "Form Path", "Form Pillar"],
					"Assault": ["Water Blast", "Sand Surge", "Sicken", "Firebolt", "Lightning Shaft", "Cold Snap", "Wind Bullet"],
					"Field": ["Fog Cloud", "Sleet", "Freezing Sleet", "Hail", "Binding Sleet", "Ice Storm", "Fimbulwinter", "Smoke Cloud", "Burning Smoke", "Choking Smoke"],
					"Conjure": ["Firebolt", "Bonfire", "Wall of Fire", "Field of Flame", "Light", "Flash"],
					"Enchant": ["Burden"]
				}
			},
			"includeBaseDefense": {
				"keys": ["BR DC", "Physique DC", "Stealth DC", "Reflex DC", "Brace DC", "Insight DC", "Resolve DC", "PR DC", "BP DC", "Presence DC", "Fortitude", "Notice DC"],
				"values": {
					"BR DC": ["Quick Strike", "Quick Shoot", "Grapple", "Reposition", "Full Strike", "Full Shoot", "Follow-Up Attack", "Nothing", "Ki Strike", "Follow-Up Grapple", "Piledriver", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Shove", "Power Flex", "Impact Knuckle", "Knuckle Flurry", "Preemptive Strike", "Power Skirmish", "Sprint", "Bounding Sprint"],
					"Physique DC": ["Break Free", "Escape"],
					"Stealth DC": ["Seach"],
					"Reflex DC": ["Crushing Blade", "Tumble", "Power Flex", "Crush Knuckle"],
					"Brace DC": ["Rapid Volley", "Dustcraft", "Dust Material"],
					"Insight DC": ["Cunning Action", "Fascinate"],
					"Resolve DC": ["Demoralize"],
					"PR DC": ["Form Path", "Form Pillar", "Fog Cloud", "Hail", "Ice Storm", "Fimbulwinter", "Firebolt", "Bonfire", "Wall of Fire", "Field of Flame", "Lightning Shaft", "Cold Snap"],
					"BP DC": ["Water Blast", "Sand Surge", "Burden", "Wind Bullet"],
					"Presence DC": ["Fog Cloud", "Sleet", "Freezing Sleet", "Binding Sleet", "Smoke Cloud", "Burning Smoke", "Choking Smoke"],
					"Fortitude": ["Sicken"],
					"Notice DC": ["Light", "Flash"]
				}
			},
			"includeBaseRange": {
				"keys": ["Range", "Threat"],
				"values": {
					"Threat": ["Quick Strike", "Break Free", "Escape", "Grapple", "Reposition", "Seach", "Full Strike", "Aid", "Encourage", "Stabilize", "Follow-Up Attack", "Nothing", "Ki Strike", "Follow-Up Grapple", "Crushing Blade", "Piledriver", "Rapid Volley", "Extra Follow-Up Attack", "Extra Follow-Up Attack +", "Shove", "Tumble", "Cunning Action", "Demoralize", "Fascinate", "Dustcraft", "Shape Material", "Dust Material", "Dust Area", "Sand Surge", "Sand Wave", "Sand Launcher", "Wind Step", "Updraft", "Clouded Updraft", "Lightning Shaft", "Cold Snap", "Cold Burst", "Diamond Dust", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry", "Preemptive Strike", "Power Skirmish", "Emergency Care", "First Aid"],
					"Range": ["Quick Shoot", "Full Shoot", "Form Path", "Cultivate", "Entangle", "Wildwood", "Water Blast", "Surf", "Tidal Wave", "Sand Surge", "Sand Spout", "Fog Cloud", "Fimbulwinter", "Smoke Cloud", "Sicken", "Firebolt", "Wall of Fire", "Field of Flame", "Burden", "Light", "Flash", "Darkness", "Wind Bullet", "Gust", "Gale"]
				}
			}
		},

		get = function (name) {
			let data = database[name];
			if (data == undefined) {
				return {
					"name": "", "augmentBase": "", "techniqueSource": "", "techniqueGroup": "", "family": "", "techniqueType": "", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": {},
					"prerequisite": {},
					"skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": []
				};
			}
			return data;
		},
		getTechniqueFilterData = function () {
			return {
				options: {
					includeBases: false
				},
				name: "",
				source: [],
				group: [],
				type: [],
				action: [],
				traits: [],
				reqWeapon: [],
				branch: [],
				skill: [],
				defense: [],
				range: []
			};
		},
		filterTechniques = function (techniques, filters) {
			techniques = filterTechniquesByStats(techniques, filters);
			techniques = filterTechniquesByName(techniques, filters);
			return techniques;
		},
		filterTechniquesByStats = function (techniques, filters) {
			if (techniques == undefined) {
				techniques = getFilteredTechniquesList(filters.source,
					filters.options.includeBases ? this.filterData.includeBaseSource : this.filterData.uniqueSource);
			}
			else {
				getFilteredTechniques(techniques, filters.source,
					filters.options.includeBases ? this.filterData.includeBaseSource : this.filterData.uniqueSource);
			}
			getFilteredTechniques(techniques, filters.group,
				filters.options.includeBases ? this.filterData.includeBaseGroup : this.filterData.uniqueGroup);
			getFilteredTechniques(techniques, filters.type,
				filters.options.includeBases ? this.filterData.includeBaseType : this.filterData.uniqueType);
			getFilteredTechniques(techniques, filters.action,
				filters.options.includeBases ? this.filterData.includeBaseAction : this.filterData.uniqueAction);
			getFilteredTechniques(techniques, filters.traits,
				filters.options.includeBases ? this.filterData.includeBaseTraits : this.filterData.uniqueTraits);
			getFilteredTechniques(techniques, filters.reqWeapon,
				filters.options.includeBases ? this.filterData.includeBaseReqWeapon : this.filterData.uniqueReqWeapon);
			getFilteredTechniques(techniques, filters.branch,
				filters.options.includeBases ? this.filterData.includeBaseBranch : this.filterData.uniqueBranch);
			getFilteredTechniques(techniques, filters.skill,
				filters.options.includeBases ? this.filterData.includeBaseSkill : this.filterData.uniqueSkill);
			getFilteredTechniques(techniques, filters.defense,
				filters.options.includeBases ? this.filterData.includeBaseDefense : this.filterData.uniqueDefense);
			getFilteredTechniques(techniques, filters.range,
				filters.options.includeBases ? this.filterData.includeBaseRange : this.filterData.uniqueRange);
			return techniques;
		},
		getFilteredTechniques = function (techniques, filters, sourceFilterData) {
			if (filters.length == 0) {
				return techniques;
			}
			let filterList = getFilteredTechniquesList(filters, sourceFilterData);
			return techniques.filter(item => filterList.includes(item));
		},
		getFilteredTechniquesList = function (filters, sourceFilterData) {
			let filteredTechniques = sourceFilterData.values[filters[0]];
			let set = {};
			let i = 1;

			while (i < filters.length - 1) {
				set = new Set(...filteredTechniques, ...sourceFilterData.values[filters[i]]);
				filteredTechniques = Array.from(set);
				i++;
			}

			return filteredTechniques;
		},
		filterTechniquesByName = function (techniques, filters) {
			if (filters.name.trim() == "") {
				return techniques;
			}
			return techniques.filter(item => item.includes(filters.name));
		}
		;
	return {
		Get: get,
		GetTechniqueFilterData: getTechniqueFilterData,
		FilterTechniques: filterTechniques
	};
}());
