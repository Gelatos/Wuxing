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
		return ["brawling", "finesse", "lunge", "marksmanship", "might", "throw"];
	}
	else {
		return ["Brawling", "Finesse", "Lunge", "Marksmanship", "Might", "Throw"];
	}
}

function GetMagicSkillsList(isFields) {
	if (isFields) {
		return ["assault", "conjure", "enchant", "ethereal", "field", "structure"];
	}
	else {
		return ["Assault", "Conjure", "Enchant", "Ethereal", "Field", "Structure"];
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
		return ["brace", "insight", "notice", "presence", "reflex", "resolve", "brawling", "finesse", "lunge", "marksmanship", "might", "throw", "assault", "conjure", "enchant", "ethereal", "field", "structure", "acrobatics", "athletics", "fortitude", "legerdemain", "physique", "stealth", "academics", "culture", "investigation", "nature", "tracking", "vocation", "charm", "deception", "intimidation", "leadership", "negotiation", "performance", "artisan", "cook", "heal", "herbalism", "mechanical", "pilot"];
	}
	else {
		return ["Brace", "Insight", "Notice", "Presence", "Reflex", "Resolve", "Brawling", "Finesse", "Lunge", "Marksmanship", "Might", "Throw", "Assault", "Conjure", "Enchant", "Ethereal", "Field", "Structure", "Acrobatics", "Athletics", "Fortitude", "Legerdemain", "Physique", "Stealth", "Academics", "Culture", "Investigation", "Nature", "Tracking", "Vocation", "Charm", "Deception", "Intimidation", "Leadership", "Negotiation", "Performance", "Artisan", "Cook", "Heal", "Herbalism", "Mechanical", "Pilot"];
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
			return ["Insight", "Field", "Structure", "Academics", "Culture", "Nature", "Vocation", "Herbalism"]
		case "per":
			return ["Notice", "Assault", "Conjure", "Investigation", "Tracking", "Deception", "Negotiation", "Cook"]
		case "cha":
			return ["Presence", "Enchant", "Ethereal", "Charm", "Intimidation", "Leadership", "Performance"]
		case "qck":
			return ["Reflex", "Finesse", "Acrobatics", "Legerdemain", "Stealth", "Heal", "Pilot"]
		case "wil":
			return ["Resolve"]
		case "dex":
			return ["Brawling", "Lunge", "Marksmanship", "Throw", "Artisan", "Mechanical"]
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
		case "brawling":
			return { "name": "Brawling", "description": "This skill governs most balanced, close range fighting styles such as with longswords, clubs, and fists. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "finesse":
			return { "name": "Finesse", "description": "Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character.", "group": "Martial", "subGroup": "", "abilityScore": "QCK" }
		case "lunge":
			return { "name": "Lunge", "description": "This is the skill for striking in melee with a polearm. These weapons will typically grant extended threat range, allowing one to attack from farther away. Techniques in this family tend to focus on multiple strikes and attacking multiple targets with quick and sweeping attacks.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "marksmanship":
			return { "name": "Marksmanship", "description": "The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. ", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "might":
			return { "name": "Might", "description": "This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. ", "group": "Martial", "subGroup": "", "abilityScore": "STR" }
		case "throw":
			return { "name": "Throw", "description": "When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "assault":
			return { "name": "Assault", "description": "These spells quickly form ether into a physical substance. Because the ether is formed quickly, these spells are well suited for launching at targets in a combat situation at the cost of keeping the ether stable for more than a few seconds.", "group": "Magic", "subGroup": "", "abilityScore": "PER" }
		case "conjure":
			return { "name": "Conjure", "description": "These spells form ether into a form of energy and stabilzes it so that it can linger in this form. Conjured magic is often unable to last for long and must be consumed quickly else disperse into ether.", "group": "Magic", "subGroup": "", "abilityScore": "PER" }
		case "enchant":
			return { "name": "Enchant", "description": "Spells that imbue a target with temporary or permanent change. These spells can typically cause effects in creatures such as emboldening their strength or heal their wounds.", "group": "Magic", "subGroup": "", "abilityScore": "CHA" }
		case "ethereal":
			return { "name": "Ethereal", "description": "Ethereal spells are unique in that they don't create any obvious physical manifestation but rather affect ether and the ethereal plane directly.", "group": "Magic", "subGroup": "", "abilityScore": "CHA" }
		case "field":
			return { "name": "Field", "description": "These spells affect existing terrain and environments by either modifying it or adding to it. ", "group": "Magic", "subGroup": "", "abilityScore": "INT" }
		case "structure":
			return { "name": "Structure", "description": "Spells that transform ether into physical objects and materials and reform it. Some spells in this class can affect physical aspected-materials and reform it as well.", "group": "Magic", "subGroup": "", "abilityScore": "INT" }
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
			return { "name": "Fighter", "category": "Warfare", "description": "The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. ", "growths": { "CON": 3, "DEX": 3, "QCK": 2, "STR": 4, "CHA": 0, "INT": 0, "PER": 1, "WIL": 2, "hp": 5 }, "aptitudes": { "warfare": 5, "magic": 0, "talent": 1, "acumen": 1 }, "prerequisite": "", "jobTechnique": "Second Wind", "advancement": [{ "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Shrug It Off", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Always Armored", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Always Armored +", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Undaunted", "type": "T" }] }
		case "interceptor":
			return { "name": "Interceptor", "category": "Warfare", "description": "The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies.", "growths": { "CON": 2, "DEX": 4, "QCK": 5, "STR": 3, "CHA": 0, "INT": 0, "PER": 3, "WIL": 2, "hp": 1 }, "aptitudes": { "warfare": 4, "magic": 1, "talent": 2, "acumen": 0 }, "prerequisite": "Trained in Notice", "jobTechnique": "Preemptive Strike", "advancement": [{ "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Preemptive Stagger", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Pounce", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Pounce and Step", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Critical Maim", "type": "T" }] }
		case "guardian":
			return { "name": "Guardian", "category": "Warfare", "description": "The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. ", "growths": { "CON": 2, "DEX": 2, "QCK": 4, "STR": 3, "CHA": 0, "INT": 0, "PER": 1, "WIL": 5, "hp": 3 }, "aptitudes": { "warfare": 3, "magic": 2, "talent": 2, "acumen": 0 }, "prerequisite": "Trained in Presence and Enchant", "jobTechnique": "Savior", "advancement": [{ "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Defender's Will", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Knock Away Savior", "type": "T" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Ironwill", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Savior's Retaliation", "type": "T" }] }
		case "spellslinger":
			return { "name": "Spellslinger", "category": "Magic", "description": "The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety.", "growths": { "CON": 3, "DEX": 4, "QCK": 3, "STR": 0, "CHA": 2, "INT": 0, "PER": 5, "WIL": 1, "hp": 2 }, "aptitudes": { "warfare": 2, "magic": 4, "talent": 0, "acumen": 1 }, "prerequisite": "Trained in Assault and Marksmanship", "jobTechnique": "Spellshot", "advancement": [{ "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Distant Spellshot", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Sharpshooter", "type": "T" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Focused Sharpshooter", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Bursting Spellshot", "type": "T" }] }
		case "athlete":
			return { "name": "Athlete", "category": "Talent", "description": "The athlete is a marvel at maneuverability. They feature an incredible method of getting in and out of combat with their Sprint technique. ", "growths": { "CON": 5, "DEX": 4, "QCK": 3, "STR": 3, "CHA": 1, "INT": 0, "PER": 1, "WIL": 0, "hp": 3 }, "aptitudes": { "warfare": 1, "magic": 0, "talent": 5, "acumen": 1 }, "prerequisite": "", "jobTechnique": "Sprint", "advancement": [{ "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Sprint Pass", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Bounding Sprint", "type": "T" }] }
		case "rogue":
			return { "name": "Rogue", "category": "Talent", "description": "The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. ", "growths": { "CON": 0, "DEX": 4, "QCK": 5, "STR": 0, "CHA": 2, "INT": 2, "PER": 3, "WIL": 3, "hp": 1 }, "aptitudes": { "warfare": 3, "magic": 0, "talent": 3, "acumen": 1 }, "prerequisite": "Trained in Finesse", "jobTechnique": "Sneak Attack", "advancement": [{ "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Sneaky Follow-Up", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Skulk Away", "type": "T" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Skulk Then Hide", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Gain a Warfare Discipline Technique", "type": "WD" }, { "name": "Assassinate", "type": "T" }] }
		case "scholar":
			return { "name": "Scholar", "category": "Acumen", "description": "The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too.", "growths": { "CON": 1, "DEX": 3, "QCK": 3, "STR": 0, "CHA": 0, "INT": 5, "PER": 4, "WIL": 3, "hp": 1 }, "aptitudes": { "warfare": 0, "magic": 1, "talent": 1, "acumen": 5 }, "prerequisite": "", "jobTechnique": "Foresight", "advancement": [{ "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Eclectic Knowledge", "type": "T" }, { "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Saw That Coming", "type": "T" }, { "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Point of Clarity", "type": "T" }, { "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "As You May Recall", "type": "T" }] }
		case "physician":
			return { "name": "Physician", "category": "Acumen", "description": "The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action.", "growths": { "CON": 3, "DEX": 1, "QCK": 3, "STR": 0, "CHA": 4, "INT": 0, "PER": 5, "WIL": 3, "hp": 1 }, "aptitudes": { "warfare": 0, "magic": 2, "talent": 2, "acumen": 3 }, "prerequisite": "Trained in Academics and Heal", "jobTechnique": "Emergency Care", "advancement": [{ "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "First Aid", "type": "T" }, { "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Nightingale", "type": "T" }, { "name": "Gain a Talent Discipline Technique", "type": "TD" }, { "name": "Cleansing Aid", "type": "T" }, { "name": "Gain a Magic Discipline Technique", "type": "MD" }, { "name": "Gain an Acumen Discipline Technique", "type": "AD" }, { "name": "Rhapsody", "type": "T" }] }
		default:
			return { "name": "", "category": "", "description": "", "growths": [], "aptitudes": [], "prerequisite": "", "jobTechnique": "", "advancement": [] }

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

function GetTrainingPathTechniquesList(isFields) {
	if (isFields) {
		return ["phys.DefensiveTraining", "phys.DefensiveTraining+", "sens.DefenseTraining", "sens.DefenseTraining+", "combatTraining", "combatTraining+", "combatTraining++", "magicTraining", "magicTraining+", "magicTraining++", "bodyTraining", "bodyTraining+", "bodyTraining++", "knowledgeTraining", "knowledgeTraining+", "knowledgeTraining++", "socialTraining", "socialTraining+", "socialTraining++", "technicalTraining", "technicalTraining+", "technicalTraining++"];
	}
	else {
		return ["Phys. Defensive Training", "Phys. Defensive Training +", "Sens. Defense Training", "Sens. Defense Training +", "Combat Training", "Combat Training +", "Combat Training ++", "Magic Training", "Magic Training +", "Magic Training ++", "Body Training", "Body Training +", "Body Training ++", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Technical Training", "Technical Training +", "Technical Training ++"];
	}
}

function GetGeneralPathTechniquesList(isFields) {
	if (isFields) {
		return ["affinity", "affinity+", "branchingOut", "branchingOut+", "chakraControl", "chakraControl+", "chakraControl++"];
	}
	else {
		return ["Affinity", "Affinity +", "Branching Out", "Branching Out +", "Chakra Control", "Chakra Control +", "Chakra Control ++"];
	}
}

function GetAllPathTechniquesList(isFields) {
	if (isFields) {
		return ["phys.DefensiveTraining", "phys.DefensiveTraining+", "sens.DefenseTraining", "sens.DefenseTraining+", "combatTraining", "combatTraining+", "combatTraining++", "magicTraining", "magicTraining+", "magicTraining++", "bodyTraining", "bodyTraining+", "bodyTraining++", "knowledgeTraining", "knowledgeTraining+", "knowledgeTraining++", "socialTraining", "socialTraining+", "socialTraining++", "technicalTraining", "technicalTraining+", "technicalTraining++", "affinity", "affinity+", "branchingOut", "branchingOut+", "chakraControl", "chakraControl+", "chakraControl++"];
	}
	else {
		return ["Phys. Defensive Training", "Phys. Defensive Training +", "Sens. Defense Training", "Sens. Defense Training +", "Combat Training", "Combat Training +", "Combat Training ++", "Magic Training", "Magic Training +", "Magic Training ++", "Body Training", "Body Training +", "Body Training ++", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Affinity", "Affinity +", "Branching Out", "Branching Out +", "Chakra Control", "Chakra Control +", "Chakra Control ++"];
	}
}

function GetTechniquesList(isFields) {
	if (isFields) {
		return ["extraFollow-UpAttack", "doubleFollow-UpAttack", "undying", "undying+", "kiStrike", "dropKick", "uppercut", "follow-UpGrapple", "crushingBlade", "staggeringBlade", "piledriver", "shreddingDriver", "pointBlankShot", "shotOnTheRun", "poleVault", "quickDraw", "rapidVolley", "rushingVolley"];
	}
	else {
		return ["Extra Follow-Up Attack", "Double Follow-Up Attack", "Undying", "Undying +", "Ki Strike", "Drop Kick", "Uppercut", "Follow-Up Grapple", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Point Blank Shot", "Shot on the Run", "Pole Vault", "Quick Draw", "Rapid Volley", "Rushing Volley"];
	}
}

function GetAllMartialTechniquesList(isFields) {
	if (isFields) {
		return ["extraFollow-UpAttack", "doubleFollow-UpAttack", "undying", "undying+", "kiStrike", "dropKick", "uppercut", "follow-UpGrapple", "crushingBlade", "staggeringBlade", "piledriver", "shreddingDriver", "pointBlankShot", "shotOnTheRun", "poleVault", "quickDraw", "rapidVolley", "rushingVolley"];
	}
	else {
		return ["Extra Follow-Up Attack", "Double Follow-Up Attack", "Undying", "Undying +", "Ki Strike", "Drop Kick", "Uppercut", "Follow-Up Grapple", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Point Blank Shot", "Shot on the Run", "Pole Vault", "Quick Draw", "Rapid Volley", "Rushing Volley"];
	}
}

function GetTechniquesList(isFields) {
	if (isFields) {
		return ["hPUp", "hPUp+", "hPUp++", "vitalityBoost", "vitalityBoost+", "vitalityBoost++", "acceleration", "powerVault", "expeditious", "quickClimb", "quickSwim", "poise", "catFall", "kipUp", "silentStride", "shove", "knockdown", "tumble", "fieldMedic"];
	}
	else {
		return ["HP Up", "HP Up+", "HP Up++", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++", "Acceleration", "Power Vault", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Shove", "Knockdown", "Tumble", "Field Medic"];
	}
}

function GetAllTalentTechniquesList(isFields) {
	if (isFields) {
		return ["hPUp", "hPUp+", "hPUp++", "vitalityBoost", "vitalityBoost+", "vitalityBoost++", "acceleration", "powerVault", "expeditious", "quickClimb", "quickSwim", "poise", "catFall", "kipUp", "silentStride", "shove", "knockdown", "tumble", "fieldMedic"];
	}
	else {
		return ["HP Up", "HP Up+", "HP Up++", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++", "Acceleration", "Power Vault", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Shove", "Knockdown", "Tumble", "Field Medic"];
	}
}

function GetTechniquesList(isFields) {
	if (isFields) {
		return ["stressRelease", "stressRelease+", "stressRelease++", "broadStudy", "experiencedTracker", "multilingual", "specializedKnowledge", "improvedInitiative", "createDiversion", "demoralize", "fascinate", "impersonator", "refocus", "refocus+", "sustainedChannel", "sustainedChannel+"];
	}
	else {
		return ["Stress Release", "Stress Release +", "Stress Release ++", "Broad Study", "Experienced Tracker", "Multilingual", "Specialized Knowledge", "Improved Initiative", "Create Diversion", "Demoralize", "Fascinate", "Impersonator", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +"];
	}
}

function GetAllAcumenTechniquesList(isFields) {
	if (isFields) {
		return ["stressRelease", "stressRelease+", "stressRelease++", "broadStudy", "experiencedTracker", "multilingual", "specializedKnowledge", "improvedInitiative", "createDiversion", "demoralize", "fascinate", "impersonator", "refocus", "refocus+", "sustainedChannel", "sustainedChannel+"];
	}
	else {
		return ["Stress Release", "Stress Release +", "Stress Release ++", "Broad Study", "Experienced Tracker", "Multilingual", "Specialized Knowledge", "Improved Initiative", "Create Diversion", "Demoralize", "Fascinate", "Impersonator", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +"];
	}
}

function GetFighterTechniquesList(isFields) {
	if (isFields) {
		return ["secondWind", "secondBreath", "undaunted", "alwaysArmored", "blockingExpert"];
	}
	else {
		return ["Second Wind", "Second Breath", "Undaunted", "Always Armored", "Blocking Expert"];
	}
}

function GetInterceptorTechniquesList(isFields) {
	if (isFields) {
		return ["preemptiveStrike", "preemptiveStagger", "criticalMaim", "pounce", "pounceAndStep"];
	}
	else {
		return ["Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Pounce", "Pounce and Step"];
	}
}

function GetSpellslingerTechniquesList(isFields) {
	if (isFields) {
		return ["spellshot", "follow-UpSpellshot", "burstingSpellshot", "sharpshooter", "focusedSharpshooter"];
	}
	else {
		return ["Spellshot", "Follow-Up Spellshot", "Bursting Spellshot", "Sharpshooter", "Focused Sharpshooter"];
	}
}

function GetGuardianTechniquesList(isFields) {
	if (isFields) {
		return ["savior", "knockAwaySavior", "savior'sRetaliation", "defender'sWill", "ironwill"];
	}
	else {
		return ["Savior", "Knock Away Savior", "Savior's Retaliation", "Defender's Will", "Ironwill"];
	}
}

function GetSpellbladeTechniquesList(isFields) {
	if (isFields) {
		return ["spellstrike"];
	}
	else {
		return ["Spellstrike"];
	}
}

function GetWarriorTechniquesList(isFields) {
	if (isFields) {
		return ["powerSkirmish"];
	}
	else {
		return ["Power Skirmish"];
	}
}

function GetRogueTechniquesList(isFields) {
	if (isFields) {
		return ["sneakAttack", "sneakyFollow-Up", "assassinate", "skulkAway", "skulkThenHide"];
	}
	else {
		return ["Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Skulk Away", "Skulk Then Hide"];
	}
}

function GetPhysicianTechniquesList(isFields) {
	if (isFields) {
		return ["emergencyCare", "nightingale", "rhapsody", "firstAid", "cleansingAid"];
	}
	else {
		return ["Emergency Care", "Nightingale", "Rhapsody", "First Aid", "Cleansing Aid"];
	}
}

function GetAthleteTechniquesList(isFields) {
	if (isFields) {
		return ["sprint", "sprintAway", "boundingSprint"];
	}
	else {
		return ["Sprint", "Sprint Away", "Bounding Sprint"];
	}
}

function GetArcanistTechniquesList(isFields) {
	if (isFields) {
		return ["metamagic"];
	}
	else {
		return ["Metamagic"];
	}
}

function GetInvestigatorTechniquesList(isFields) {
	if (isFields) {
		return ["strategize", "environmentalAwareness"];
	}
	else {
		return ["Strategize", "Environmental Awareness"];
	}
}

function GetScholarTechniquesList(isFields) {
	if (isFields) {
		return ["foresight", "sawThatComing", "asYouMayRecall", "eclecticKnowledge", "pointOfClarity"];
	}
	else {
		return ["Foresight", "Saw That Coming", "As You May Recall", "Eclectic Knowledge", "Point of Clarity"];
	}
}

function GetAllClassTechniquesList(isFields) {
	if (isFields) {
		return ["secondWind", "secondBreath", "undaunted", "alwaysArmored", "blockingExpert", "preemptiveStrike", "preemptiveStagger", "criticalMaim", "pounce", "pounceAndStep", "spellshot", "follow-UpSpellshot", "burstingSpellshot", "sharpshooter", "focusedSharpshooter", "savior", "knockAwaySavior", "savior'sRetaliation", "defender'sWill", "ironwill", "spellstrike", "powerSkirmish", "sneakAttack", "sneakyFollow-Up", "assassinate", "skulkAway", "skulkThenHide", "emergencyCare", "nightingale", "rhapsody", "firstAid", "cleansingAid", "sprint", "sprintAway", "boundingSprint", "metamagic", "strategize", "environmentalAwareness", "foresight", "sawThatComing", "asYouMayRecall", "eclecticKnowledge", "pointOfClarity"];
	}
	else {
		return ["Second Wind", "Second Breath", "Undaunted", "Always Armored", "Blocking Expert", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Pounce", "Pounce and Step", "Spellshot", "Follow-Up Spellshot", "Bursting Spellshot", "Sharpshooter", "Focused Sharpshooter", "Savior", "Knock Away Savior", "Savior's Retaliation", "Defender's Will", "Ironwill", "Spellstrike", "Power Skirmish", "Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Skulk Away", "Skulk Then Hide", "Emergency Care", "Nightingale", "Rhapsody", "First Aid", "Cleansing Aid", "Sprint", "Sprint Away", "Bounding Sprint", "Metamagic", "Strategize", "Environmental Awareness", "Foresight", "Saw That Coming", "As You May Recall", "Eclectic Knowledge", "Point of Clarity"];
	}
}

function GetArcaneCreationTechniquesList(isFields) {
	if (isFields) {
		return ["dustcraft", "shapeMaterial", "quickcraft", "improvedShaping", "greaterShaping", "legendaryShaping", "dustMaterial", "dustArea", "improvedDusting", "greaterDusting", "legendaryDusting", "formPillar", "formWall", "scatteredPillars", "greatWall", "steppingStones", "steppingPath", "shieldBlock", "glancingBlock", "aegis"];
	}
	else {
		return ["Dustcraft", "Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Pillar", "Form Wall", "Scattered Pillars", "Great Wall", "Stepping Stones", "Stepping Path", "Shield Block", "Glancing Block", "Aegis"];
	}
}

function GetArcaneManipulationTechniquesList(isFields) {
	if (isFields) {
		return ["camoflauge", "kinesis", "distantKinesis", "kineticStrike", "kineticThrow", "heavyKinesis"];
	}
	else {
		return ["Camoflauge", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis"];
	}
}

function GetArcaneTechniquesList(isFields) {
	if (isFields) {
		return ["dustcraft", "shapeMaterial", "quickcraft", "improvedShaping", "greaterShaping", "legendaryShaping", "dustMaterial", "dustArea", "improvedDusting", "greaterDusting", "legendaryDusting", "formPillar", "formWall", "scatteredPillars", "greatWall", "steppingStones", "steppingPath", "shieldBlock", "glancingBlock", "aegis", "camoflauge", "kinesis", "distantKinesis", "kineticStrike", "kineticThrow", "heavyKinesis"];
	}
	else {
		return ["Dustcraft", "Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Pillar", "Form Wall", "Scattered Pillars", "Great Wall", "Stepping Stones", "Stepping Path", "Shield Block", "Glancing Block", "Aegis", "Camoflauge", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis"];
	}
}

function GetWoodBasicTechniquesList(isFields) {
	if (isFields) {
		return ["cultivate", "entangle", "wildwood"];
	}
	else {
		return ["Cultivate", "Entangle", "Wildwood"];
	}
}

function GetWoodPoisonTechniquesList(isFields) {
	if (isFields) {
		return ["sicken", "spores", "sickeningCloud", "virulentSpores"];
	}
	else {
		return ["Sicken", "Spores", "Sickening Cloud", "Virulent Spores"];
	}
}

function GetWoodWindTechniquesList(isFields) {
	if (isFields) {
		return ["windStep", "updraft", "cloudedUpdraft", "windFall", "walkOnAir", "windBullet", "gust", "windsweep", "gale"];
	}
	else {
		return ["Wind Step", "Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air", "Wind Bullet", "Gust", "Windsweep", "Gale"];
	}
}

function GetWoodTechniquesList(isFields) {
	if (isFields) {
		return ["cultivate", "entangle", "wildwood", "sicken", "spores", "sickeningCloud", "virulentSpores", "windStep", "updraft", "cloudedUpdraft", "windFall", "walkOnAir", "windBullet", "gust", "windsweep", "gale"];
	}
	else {
		return ["Cultivate", "Entangle", "Wildwood", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Wind Step", "Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air", "Wind Bullet", "Gust", "Windsweep", "Gale"];
	}
}

function GetFireLightTechniquesList(isFields) {
	if (isFields) {
		return ["distortion", "lastingDistortion", "blurredLight", "lightRefraction", "light", "dancingLights", "flash", "sunlight"];
	}
	else {
		return ["Distortion", "Lasting Distortion", "Blurred Light", "Light Refraction", "Light", "Dancing Lights", "Flash", "Sunlight"];
	}
}

function GetFireBasicTechniquesList(isFields) {
	if (isFields) {
		return ["bonfire", "wallOfFire", "fieldOfFlame", "heatField", "burnGuard", "firebolt", "flameArrow", "fireball", "fireblast", "ragnarok"];
	}
	else {
		return ["Bonfire", "Wall of Fire", "Field of Flame", "Heat Field", "Burn Guard", "Firebolt", "Flame Arrow", "Fireball", "Fireblast", "Ragnarok"];
	}
}

function GetFireSmokeTechniquesList(isFields) {
	if (isFields) {
		return ["smokeCloud", "burningSmoke", "chokingSmoke"];
	}
	else {
		return ["Smoke Cloud", "Burning Smoke", "Choking Smoke"];
	}
}

function GetFireSoulTechniquesList(isFields) {
	if (isFields) {
		return ["fireStep", "liftoff", "jet"];
	}
	else {
		return ["Fire Step", "Liftoff", "Jet"];
	}
}

function GetFireTechniquesList(isFields) {
	if (isFields) {
		return ["distortion", "lastingDistortion", "blurredLight", "lightRefraction", "light", "dancingLights", "flash", "sunlight", "bonfire", "wallOfFire", "fieldOfFlame", "heatField", "burnGuard", "firebolt", "flameArrow", "fireball", "fireblast", "ragnarok", "smokeCloud", "burningSmoke", "chokingSmoke", "fireStep", "liftoff", "jet"];
	}
	else {
		return ["Distortion", "Lasting Distortion", "Blurred Light", "Light Refraction", "Light", "Dancing Lights", "Flash", "Sunlight", "Bonfire", "Wall of Fire", "Field of Flame", "Heat Field", "Burn Guard", "Firebolt", "Flame Arrow", "Fireball", "Fireblast", "Ragnarok", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Fire Step", "Liftoff", "Jet"];
	}
}

function GetEarthShadowTechniquesList(isFields) {
	if (isFields) {
		return ["shadowSteps", "shadowWalker", "darkness", "shadowWall", "nightfall"];
	}
	else {
		return ["Shadow Steps", "Shadow Walker", "Darkness", "Shadow Wall", "Nightfall"];
	}
}

function GetEarthBasicTechniquesList(isFields) {
	if (isFields) {
		return ["sandSurge", "sandSpout", "sandWave", "sandLauncher", "tremorsense"];
	}
	else {
		return ["Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Tremorsense"];
	}
}

function GetEarthGravityTechniquesList(isFields) {
	if (isFields) {
		return ["burden", "restrain", "prostration", "pressure", "widePressure", "deepPressure", "gravityWell"];
	}
	else {
		return ["Burden", "Restrain", "Prostration", "Pressure", "Wide Pressure", "Deep Pressure", "Gravity Well"];
	}
}

function GetEarthPowerTechniquesList(isFields) {
	if (isFields) {
		return ["powerFlex", "crushKnuckle", "impactKnuckle", "knuckleFlurry"];
	}
	else {
		return ["Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"];
	}
}

function GetEarthTechniquesList(isFields) {
	if (isFields) {
		return ["shadowSteps", "shadowWalker", "darkness", "shadowWall", "nightfall", "sandSurge", "sandSpout", "sandWave", "sandLauncher", "tremorsense", "burden", "restrain", "prostration", "pressure", "widePressure", "deepPressure", "gravityWell", "powerFlex", "crushKnuckle", "impactKnuckle", "knuckleFlurry"];
	}
	else {
		return ["Shadow Steps", "Shadow Walker", "Darkness", "Shadow Wall", "Nightfall", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Tremorsense", "Burden", "Restrain", "Prostration", "Pressure", "Wide Pressure", "Deep Pressure", "Gravity Well", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"];
	}
}

function GetWaterBasicTechniquesList(isFields) {
	if (isFields) {
		return ["geyser", "geyserLine", "greatGeyserLine", "seaSwell", "surf", "tidalWave", "coldField", "chillGuard"];
	}
	else {
		return ["Geyser", "Geyser Line", "Great Geyser Line", "Sea Swell", "Surf", "Tidal Wave", "Cold Field", "Chill Guard"];
	}
}

function GetWaterStormTechniquesList(isFields) {
	if (isFields) {
		return ["fogCloud", "sleet", "freezingSleet", "bindingSleet", "hail", "iceStorm", "fimbulwinter", "coldSnap", "frostbite", "freezebind", "coldBurst", "coldFront", "diamondDust"];
	}
	else {
		return ["Fog Cloud", "Sleet", "Freezing Sleet", "Binding Sleet", "Hail", "Ice Storm", "Fimbulwinter", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust"];
	}
}

function GetWaterTechniquesList(isFields) {
	if (isFields) {
		return ["geyser", "geyserLine", "greatGeyserLine", "seaSwell", "surf", "tidalWave", "coldField", "chillGuard", "fogCloud", "sleet", "freezingSleet", "bindingSleet", "hail", "iceStorm", "fimbulwinter", "coldSnap", "frostbite", "freezebind", "coldBurst", "coldFront", "diamondDust"];
	}
	else {
		return ["Geyser", "Geyser Line", "Great Geyser Line", "Sea Swell", "Surf", "Tidal Wave", "Cold Field", "Chill Guard", "Fog Cloud", "Sleet", "Freezing Sleet", "Binding Sleet", "Hail", "Ice Storm", "Fimbulwinter", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust"];
	}
}

function GetMetalBasicTechniquesList(isFields) {
	if (isFields) {
		return ["etherSense", "spiritSense"];
	}
	else {
		return ["Ether Sense", "Spirit Sense"];
	}
}

function GetMetalLightningTechniquesList(isFields) {
	if (isFields) {
		return ["lightningShaft", "shock", "lightningBolt", "plasmaArc", "fulgor"];
	}
	else {
		return ["Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor"];
	}
}

function GetMetalTechniquesList(isFields) {
	if (isFields) {
		return ["etherSense", "spiritSense", "lightningShaft", "shock", "lightningBolt", "plasmaArc", "fulgor"];
	}
	else {
		return ["Ether Sense", "Spirit Sense", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor"];
	}
}

function GetAllSpellTechniquesList(isFields) {
	if (isFields) {
		return ["dustcraft", "shapeMaterial", "quickcraft", "improvedShaping", "greaterShaping", "legendaryShaping", "dustMaterial", "dustArea", "improvedDusting", "greaterDusting", "legendaryDusting", "formPillar", "formWall", "scatteredPillars", "greatWall", "steppingStones", "steppingPath", "shieldBlock", "glancingBlock", "aegis", "camoflauge", "kinesis", "distantKinesis", "kineticStrike", "kineticThrow", "heavyKinesis", "cultivate", "entangle", "wildwood", "sicken", "spores", "sickeningCloud", "virulentSpores", "windStep", "updraft", "cloudedUpdraft", "windFall", "walkOnAir", "windBullet", "gust", "windsweep", "gale", "distortion", "lastingDistortion", "blurredLight", "lightRefraction", "light", "dancingLights", "flash", "sunlight", "bonfire", "wallOfFire", "fieldOfFlame", "heatField", "burnGuard", "firebolt", "flameArrow", "fireball", "fireblast", "ragnarok", "smokeCloud", "burningSmoke", "chokingSmoke", "fireStep", "liftoff", "jet", "shadowSteps", "shadowWalker", "darkness", "shadowWall", "nightfall", "sandSurge", "sandSpout", "sandWave", "sandLauncher", "tremorsense", "burden", "restrain", "prostration", "pressure", "widePressure", "deepPressure", "gravityWell", "powerFlex", "crushKnuckle", "impactKnuckle", "knuckleFlurry", "geyser", "geyserLine", "greatGeyserLine", "seaSwell", "surf", "tidalWave", "coldField", "chillGuard", "fogCloud", "sleet", "freezingSleet", "bindingSleet", "hail", "iceStorm", "fimbulwinter", "coldSnap", "frostbite", "freezebind", "coldBurst", "coldFront", "diamondDust", "etherSense", "spiritSense", "lightningShaft", "shock", "lightningBolt", "plasmaArc", "fulgor"];
	}
	else {
		return ["Dustcraft", "Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Form Pillar", "Form Wall", "Scattered Pillars", "Great Wall", "Stepping Stones", "Stepping Path", "Shield Block", "Glancing Block", "Aegis", "Camoflauge", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Cultivate", "Entangle", "Wildwood", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Wind Step", "Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air", "Wind Bullet", "Gust", "Windsweep", "Gale", "Distortion", "Lasting Distortion", "Blurred Light", "Light Refraction", "Light", "Dancing Lights", "Flash", "Sunlight", "Bonfire", "Wall of Fire", "Field of Flame", "Heat Field", "Burn Guard", "Firebolt", "Flame Arrow", "Fireball", "Fireblast", "Ragnarok", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Fire Step", "Liftoff", "Jet", "Shadow Steps", "Shadow Walker", "Darkness", "Shadow Wall", "Nightfall", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Tremorsense", "Burden", "Restrain", "Prostration", "Pressure", "Wide Pressure", "Deep Pressure", "Gravity Well", "Power Flex", "Crush Knuckle", "Impact Knuckle", "Knuckle Flurry", "Geyser", "Geyser Line", "Great Geyser Line", "Sea Swell", "Surf", "Tidal Wave", "Cold Field", "Chill Guard", "Fog Cloud", "Sleet", "Freezing Sleet", "Binding Sleet", "Hail", "Ice Storm", "Fimbulwinter", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Ether Sense", "Spirit Sense", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor"];
	}
}

function GetTechniquesInfo(name) {
	switch (name.toLowerCase()) {
		case "phys. defensive training":
			return { "name": "Phys. Defensive Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Physical Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 8", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Phys. Defensive Training +"] }
		case "phys. defensive training +":
			return { "name": "Phys. Defensive Training +", "augmentBase": "Phys. Defensive Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Physical Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sens. defense training":
			return { "name": "Sens. Defense Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Sensory Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 8", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sens. Defense Training +"] }
		case "sens. defense training +":
			return { "name": "Sens. Defense Training +", "augmentBase": "Sens. Defense Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Sensory Defensive skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "combat training":
			return { "name": "Combat Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Combat skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Combat Training +", "Combat Training ++"] }
		case "combat training +":
			return { "name": "Combat Training +", "augmentBase": "Combat Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Combat skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "combat training ++":
			return { "name": "Combat Training ++", "augmentBase": "Combat Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Combat skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "magic training":
			return { "name": "Magic Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Magic skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Magic Training +", "Magic Training ++"] }
		case "magic training +":
			return { "name": "Magic Training +", "augmentBase": "Magic Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Magic skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "magic training ++":
			return { "name": "Magic Training ++", "augmentBase": "Magic Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Magic skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "body training":
			return { "name": "Body Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Body Training +", "Body Training ++"] }
		case "body training +":
			return { "name": "Body Training +", "augmentBase": "Body Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "body training ++":
			return { "name": "Body Training ++", "augmentBase": "Body Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "knowledge training":
			return { "name": "Knowledge Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Knowledge Training +", "Knowledge Training ++"] }
		case "knowledge training +":
			return { "name": "Knowledge Training +", "augmentBase": "Knowledge Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "knowledge training ++":
			return { "name": "Knowledge Training ++", "augmentBase": "Knowledge Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "social training":
			return { "name": "Social Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Social Training +", "Social Training ++"] }
		case "social training +":
			return { "name": "Social Training +", "augmentBase": "Social Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "social training ++":
			return { "name": "Social Training ++", "augmentBase": "Social Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "technical training":
			return { "name": "Technical Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Technical Training +", "Technical Training ++"] }
		case "technical training +":
			return { "name": "Technical Training +", "augmentBase": "Technical Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "technical training ++":
			return { "name": "Technical Training ++", "augmentBase": "Technical Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "affinity":
			return { "name": "Affinity", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain another Elemental Affinity.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Affinity +"] }
		case "affinity +":
			return { "name": "Affinity +", "augmentBase": "Affinity", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain another Elemental Affinity.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 39", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "branching out":
			return { "name": "Branching Out", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You gain a new Branch. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Branching Out +"] }
		case "branching out +":
			return { "name": "Branching Out +", "augmentBase": "Branching Out", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You gain a new Branch. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 14", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "chakra control":
			return { "name": "Chakra Control", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Chakra increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 14", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Chakra Control +", "Chakra Control ++"] }
		case "chakra control +":
			return { "name": "Chakra Control +", "augmentBase": "Chakra Control", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Chakra increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 19", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "chakra control ++":
			return { "name": "Chakra Control ++", "augmentBase": "Chakra Control", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Chakra increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "extra follow-up attack":
			return { "name": "Extra Follow-Up Attack", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Reaction ", "traits": "Armament", "limits": "1/Round", "resourceCost": "", "description": "You perform a melee attack against your ally's target.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "An ally makes a melee or ranged attack against a character and you are engaged with the character.", "requirement": "", "prerequisite": "Character Level 4", "skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Double Follow-Up Attack"] }
		case "double follow-up attack":
			return { "name": "Double Follow-Up Attack", "augmentBase": "Extra Follow-Up Attack", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Reaction ", "traits": "Armament", "limits": "2/Round", "resourceCost": "", "description": "You perform a melee attack against your ally's target.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "An ally makes a melee or ranged attack against a character and you are engaged with the character.", "requirement": "", "prerequisite": "Character Level 24", "skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "undying":
			return { "name": "Undying", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Wound Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 19", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Undying +"] }
		case "undying +":
			return { "name": "Undying +", "augmentBase": "Undying", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Wound Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "ki strike":
			return { "name": "Ki Strike", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You wrap your body with ki and strike. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "Must be channeling ki", "prerequisite": "", "skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": ["Drop Kick", "Uppercut", "Follow-Up Grapple"] }
		case "drop kick":
			return { "name": "Drop Kick", "augmentBase": "Ki Strike", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "", "onSuccess": "The target gains the Prone status.", "dConditions": "C:Prone", "tEffect": "C:Prone", "rEffect": "", "trigger": "", "requirement": "The target must be Launched and you must be 1 space above the target.", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "2", "dType": "6", "dBonus": "Power", "damageType": "Force", "element": "", "augments": [] }
		case "uppercut":
			return { "name": "Uppercut", "augmentBase": "Ki Strike", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "The target gains the Launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "3", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": [] }
		case "follow-up grapple":
			return { "name": "Follow-Up Grapple", "augmentBase": "Ki Strike", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You attempt to grapple your ally's target.", "onSuccess": "Both you and the target gain the grappled status.", "dConditions": "S:Grappled", "tEffect": "S:Grappled;S*:Grappled", "rEffect": "", "trigger": "An ally makes a melee or ranged attack against a character and you are engaged with the character.", "requirement": "", "prerequisite": "", "skill": "Physique", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "0", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "crushing blade":
			return { "name": "Crushing Blade", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament [F]", "limits": "", "resourceCost": "", "description": "You attempt to power through any defense the foe has. Make a melee attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "Must be attacking with a Might weapon", "prerequisite": "Trained in Might", "skill": "Weapon", "defense": "Reflex DC", "range": "Weapon", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Staggering Blade"] }
		case "staggering blade":
			return { "name": "Staggering Blade", "augmentBase": "Crushing Blade", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "The target gains the Staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "piledriver":
			return { "name": "Piledriver", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament [F]; Brutal", "limits": "", "resourceCost": "2 Ki", "description": "You swing with incredible force at your target, attempting to launch them into the air. Make a melee attack. ", "onSuccess": "The target gains the Launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": "Must be attacking with a Might weapon", "prerequisite": "Trained in Might", "skill": "Weapon", "defense": "BR DC", "range": "Weapon", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shredding Driver"] }
		case "shredding driver":
			return { "name": "Shredding Driver", "augmentBase": "Piledriver", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "AP (4); Armament [F]; Brutal", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "point blank shot":
			return { "name": "Point Blank Shot", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You are treated as having threat 2 when equipped with a Bow or Handgun weapon.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Marksmanship", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shot on the Run"] }
		case "shot on the run":
			return { "name": "Shot on the Run", "augmentBase": "Point Blank Shot", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "When you use a Bow or Handgun weapon as a melee weapon, you may immediately move 1 space.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "pole vault":
			return { "name": "Pole Vault", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "", "description": "You increase your jump height by 2 on both horizontal and vertical jumps.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You jump during your movement.", "requirement": "You are wielding a Polearm weapon.", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "quick draw":
			return { "name": "Quick Draw", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You may ignore the 1 / Turn limit of the Equip action when equipping a weapon that does not have the Two-handed trait.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "rapid volley":
			return { "name": "Rapid Volley", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament; Brutal", "limits": "", "resourceCost": "", "description": "You strike fast to catch an evasive target. Make a melee attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "Must be attacking with a Polearm weapon", "prerequisite": "Trained in Polearm", "skill": "Weapon", "defense": "Brace DC", "range": "Weapon", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Rushing Volley"] }
		case "rushing volley":
			return { "name": "Rushing Volley", "augmentBase": "Rapid Volley", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament [F]; Brutal", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "hp up":
			return { "name": "HP Up", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain 10 Max HP.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["HP Up+", "HP Up++"] }
		case "hp up+":
			return { "name": "HP Up+", "augmentBase": "HP Up", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain 10 Max HP.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "hp up++":
			return { "name": "HP Up++", "augmentBase": "HP Up", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Gain 10 Max HP.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "vitality boost":
			return { "name": "Vitality Boost", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Vitality Boost +", "Vitality Boost ++"] }
		case "vitality boost +":
			return { "name": "Vitality Boost +", "augmentBase": "Vitality Boost", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 14", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "vitality boost ++":
			return { "name": "Vitality Boost ++", "augmentBase": "Vitality Boost", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 29", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "acceleration":
			return { "name": "Acceleration", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "Until the end of your turn, your speed increases by 2. You may then move up to half your speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Athletics", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Power Vault"] }
		case "power vault":
			return { "name": "Power Vault", "augmentBase": "Acceleration", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "Until the end of your turn, your horizontal and vertical jump distance is doubled.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "expeditious":
			return { "name": "Expeditious", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Athletics", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Quick Climb", "Quick Swim"] }
		case "quick climb":
			return { "name": "Quick Climb", "augmentBase": "Expeditious", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you climb you move at half your full speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "quick swim":
			return { "name": "Quick Swim", "augmentBase": "Expeditious", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you swim you move at your full speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "poise":
			return { "name": "Poise", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You always succeed at normal difficulty Acrobatics checks to maintain balance.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Acrobatics", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Cat Fall", "Kip Up"] }
		case "cat fall":
			return { "name": "Cat Fall", "augmentBase": "Poise", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "kip up":
			return { "name": "Kip Up", "augmentBase": "Poise", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn, you can get up from prone for free.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "silent stride":
			return { "name": "Silent Stride", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "If you are hidden and lose cover, you may use your standard move and not lose the hidden status as long as your move ends with you in cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Stealth", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "shove":
			return { "name": "Shove", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You try to ram into a character.", "onSuccess": "You may choose to push the target up to two spaces, directly away from you. If you move the target, you may follow the target up to the same distance you moved them.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "Target must be the same Size or smaller than you.", "prerequisite": "Trained in Physique", "skill": "Physique", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Knockdown"] }
		case "knockdown":
			return { "name": "Knockdown", "augmentBase": "Shove", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "Your target is also knocked prone. ", "dConditions": "C:Prone", "tEffect": "C:Prone", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "tumble":
			return { "name": "Tumble", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You move at least 1 space, up to your speed. During this movement, you can try to move through the space of one enemy. Attempt an Acrobatics check against the enemy’s Reflex DC as soon as you try to enter its space. ", "onSuccess": "You do not trigger engagement and may continue moving.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Acrobatics", "skill": "Acrobatics", "defense": "Reflex DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "field medic":
			return { "name": "Field Medic", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When treating wounds during a long rest, unless the wound has unique end conditions, you always succeed at your Medicine check.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Medicine", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "stress release":
			return { "name": "Stress Release", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Stress Release +", "Stress Release ++"] }
		case "stress release +":
			return { "name": "Stress Release +", "augmentBase": "Stress Release", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 19", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "stress release ++":
			return { "name": "Stress Release ++", "augmentBase": "Stress Release", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "broad study":
			return { "name": "Broad Study", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You are well read in a lot of different subjects. Gain a +1 bonus whenever making a Recall Knowledge check.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "experienced tracker":
			return { "name": "Experienced Tracker", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You track at your full speed.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Survival", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "multilingual":
			return { "name": "Multilingual", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "Multiple", "limits": "", "resourceCost": "", "description": "You gain three Languages.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "specialized knowledge":
			return { "name": "Specialized Knowledge", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "Multiple", "limits": "", "resourceCost": "", "description": "You gain three Lore Knowledges.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "improved initiative":
			return { "name": "Improved Initiative", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your initiative increases by 4.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "create diversion":
			return { "name": "Create Diversion", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "With a gesture, a trick, or some distracting words, you can create a diversion that draws creatures' attention elsewhere. ", "onSuccess": "Until the end of this turn, you have +1 advantage on the next attack roll against the target.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Deception", "skill": "Deception", "defense": "Insight DC", "range": "3", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "demoralize":
			return { "name": "Demoralize", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "With a sudden shout, a well-timed taunt, or a cutting putdown, you can shake an enemy's resolve. \n\nRegardless of your result, the target is temporarily immune to your attempts to Demoralize it for 5 minutes.", "onSuccess": "The target gains the frightened condition.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Intimidation", "skill": "Intimidation", "defense": "Resolve DC", "range": "5", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "fascinate":
			return { "name": "Fascinate", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "Through fancy footwork, vicious mockery, or a startling performance, you draw the attention of those nearby.\n\nRegardless of your result, targets are temporarily immune to your attempts to Fascinate them for 5 minutes.", "onSuccess": "The target gains the staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Performance", "skill": "Performance", "defense": "Insight DC", "range": "3", "rType": "Threat", "target": "Up to three targets", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "impersonator":
			return { "name": "Impersonator", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "If you spend 5 minutes studying a person you are trying to impersonate, you gain +1 advantage on all deception checks to pass yourself off as that person.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Deception", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "refocus":
			return { "name": "Refocus", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You quickly recenter. You may exchange one loaded tech slot with another technique.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character level 4", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Refocus +"] }
		case "refocus +":
			return { "name": "Refocus +", "augmentBase": "Refocus", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You may exchange two loaded tech slots with two other techniques.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sustained channel":
			return { "name": "Sustained Channel", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You may take 1 Stress to ignore the effects of overchanneling for 5 minutes.\n\nThe second time you use this action will cause you to instead take 3 Stress. Using this action a third time will cause you to instead take 6 Stress. Any uses after this causes instant death. These uses reset when you perform a long rest.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sustained Channel +"] }
		case "sustained channel +":
			return { "name": "Sustained Channel +", "augmentBase": "Sustained Channel", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "The duration before you feel the effects of overchanneling extends to 15 minutes.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 24", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "second wind":
			return { "name": "Second Wind", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "1 Vitality", "description": "You take a breath and refocus your senses. You restore your HP to full.", "onSuccess": "", "dConditions": "", "tEffect": "H:Vitality", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Second Breath", "Undaunted"] }
		case "second breath":
			return { "name": "Second Breath", "augmentBase": "Second Wind", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "2 Ki; 1 Vitality", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You take HP damage. ", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "undaunted":
			return { "name": "Undaunted", "augmentBase": "Second Wind", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "", "resourceCost": "3 Ki; 1 Chakra", "description": "Remove 1 Wound from yourself. In 5 minutes, or when you choose to do so early, you take 1 Wound.", "onSuccess": "", "dConditions": "", "tEffect": "R:Wound", "rEffect": "", "trigger": "", "requirement": "You have a wound.", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "always armored":
			return { "name": "Always Armored", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You have +1 Armor.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Blocking Expert"] }
		case "blocking expert":
			return { "name": "Blocking Expert", "augmentBase": "Always Armored", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You have +5 Block.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "preemptive strike":
			return { "name": "Preemptive Strike", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "Armament", "limits": "1/Round", "resourceCost": "", "description": "You perform a melee attack against the triggering character.", "onSuccess": "The target stops moving immediately and loses any unused movement.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "The target moves within your threat.", "requirement": "", "prerequisite": "", "skill": "Weapon", "defense": "BR DC", "range": "", "rType": "Threat", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Preemptive Stagger", "Critical Maim"] }
		case "preemptive stagger":
			return { "name": "Preemptive Stagger", "augmentBase": "Preemptive Strike", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "", "onSuccess": "The target gains the Staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "critical maim":
			return { "name": "Critical Maim", "augmentBase": "Preemptive Strike", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "The target loses 1 Quick Action or 1 Full Action.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "pounce":
			return { "name": "Pounce", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "If your weapon has threat, your threat with the weapon increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Pounce and Step"] }
		case "pounce and step":
			return { "name": "Pounce and Step", "augmentBase": "Pounce", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever you melee attack you may move 1 space after your attack. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "spellshot":
			return { "name": "Spellshot", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Spellslinger", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You use projectiles as a conduit for magic. Until the end of the turn, techniques with the volatile trait gain the range of your equipped weapon. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Follow-Up Spellshot", "Bursting Spellshot"] }
		case "follow-up spellshot":
			return { "name": "Follow-Up Spellshot", "augmentBase": "Spellshot", "techniqueGroup": "Class", "techniqueSubGroup": "Spellslinger", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may use one technique with the volatile trait and has only one target. The technique must target the same target or space of the triggering character. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "An ally makes a melee or ranged attack against a character and that character is within your weapon range. ", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "bursting spellshot":
			return { "name": "Bursting Spellshot", "augmentBase": "Spellshot", "techniqueGroup": "Class", "techniqueSubGroup": "Spellslinger", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Chakra", "description": "You may use one technique with the volatile trait. The technique must target the same target or space of the triggering technique. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You use the Full Shoot technique. ", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sharpshooter":
			return { "name": "Sharpshooter", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Spellslinger", "techniqueType": "Support", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "Your range with Bow and Longarm weapons increases by 3 until the end of your turn.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Focused Sharpshooter"] }
		case "focused sharpshooter":
			return { "name": "Focused Sharpshooter", "augmentBase": "Sharpshooter", "techniqueGroup": "Class", "techniqueSubGroup": "Spellslinger", "techniqueType": "Support", "action": "Swift", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "Your ranged attacks with Bow and Longarm weapons ignore Soft Cover until the end of your turn.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "savior":
			return { "name": "Savior", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Guardian", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You trade spaces with the triggering defending character and take the attack instead. The original attack is cancelled and the attacking character is forced to remake the melee attack against you. If the triggering defending character is adjacent to you after the attack, you may trade places with them. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "A character adjacent to you is hit by a melee attack.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Knock Away Savior", "Savior's Retaliation"] }
		case "knock away savior":
			return { "name": "Knock Away Savior", "augmentBase": "Savior", "techniqueGroup": "Class", "techniqueSubGroup": "Guardian", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "", "description": "After trading spaces with the defending character, you may move the character up to 2 spaces in any direction. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "savior's retaliation":
			return { "name": "Savior's Retaliation", "augmentBase": "Savior", "techniqueGroup": "Class", "techniqueSubGroup": "Guardian", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "After the attack against you is resolved you may immediately usd the Full Strike technique against the attacking character. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "defender's will":
			return { "name": "Defender's Will", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Guardian", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "Gain your Barrier and Block in Temporary HP. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Ironwill"] }
		case "ironwill":
			return { "name": "Ironwill", "augmentBase": "Defender's Will", "techniqueGroup": "Class", "techniqueSubGroup": "Guardian", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "Remove a condition affecting you. ", "onSuccess": "", "dConditions": "", "tEffect": "R:Condition", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "spellstrike":
			return { "name": "Spellstrike", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Spellblade", "techniqueType": "Job", "action": "Swift", "traits": "Affinity; AP (All)", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You infuse your weapon with your elemental affinity. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "You hit an adjacent creature with a melee attack.", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Mod", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Energy", "element": "", "augments": [] }
		case "power skirmish":
			return { "name": "Power Skirmish", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Warrior", "techniqueType": "Job", "action": "Full", "traits": "Armament [F]; Brutal", "limits": "", "resourceCost": "", "description": "Make a melee attack and add 2d3 to the damage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "The weapon must be Two-Handed.", "prerequisite": "", "skill": "", "defense": "BR DC", "range": "", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sneak attack":
			return { "name": "Sneak Attack", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Job", "action": "Swift", "traits": "AP (All)", "limits": "1/Turn", "resourceCost": "", "description": "You know how to strike subtly and exploit a foe’s distraction.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "You hit an adjacent creature with a finesse skill weapon and an ally is engaged with the target or you were hidden before you attacked.", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Mod", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "Piercing", "element": "", "augments": ["Sneaky Follow-Up", "Assassinate"] }
		case "sneaky follow-up":
			return { "name": "Sneaky Follow-Up", "augmentBase": "Sneak Attack", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You attack when it is not your turn. ", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "assassinate":
			return { "name": "Assassinate", "augmentBase": "Sneak Attack", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "The target must be Staggered when they were attacked.", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "5", "dType": "3", "dBonus": "", "damageType": "Piercing", "element": "", "augments": [] }
		case "skulk away":
			return { "name": "Skulk Away", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may move half your speed after performing a Follow-Up Attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Skulk Then Hide"] }
		case "skulk then hide":
			return { "name": "Skulk Then Hide", "augmentBase": "Skulk Away", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may use the Hide technique after moving. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "emergency care":
			return { "name": "Emergency Care", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You provide emergency first aid. The target may spend 1 Vitality to restore their HP to full. You may also clear a condition on the target.", "onSuccess": "", "dConditions": "", "tEffect": "H:Vitality;R:Condition", "rEffect": "", "trigger": "", "requirement": "You must have access to a Medkit.", "prerequisite": "", "skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Nightingale", "Rhapsody"] }
		case "nightingale":
			return { "name": "Nightingale", "augmentBase": "Emergency Care", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "The target may restore their HP to full. ", "onSuccess": "", "dConditions": "", "tEffect": "H:Full", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "rhapsody":
			return { "name": "Rhapsody", "augmentBase": "Emergency Care", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki; 1 Chakra", "description": "Remove 1 Wound from an adjacent character. This action consumes a Medkit.", "onSuccess": "", "dConditions": "", "tEffect": "R:Wound", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "first aid":
			return { "name": "First Aid", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Ki", "description": "The target may spend 1 Vitality to restore their HP to full.", "onSuccess": "", "dConditions": "", "tEffect": "H:Vitality", "rEffect": "", "trigger": "", "requirement": "You must have access to a Medkit.", "prerequisite": "", "skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Cleansing Aid"] }
		case "cleansing aid":
			return { "name": "Cleansing Aid", "augmentBase": "First Aid", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "Clear a condition on the target.", "onSuccess": "", "dConditions": "", "tEffect": "R:Condition", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sprint":
			return { "name": "Sprint", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Athlete", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may move up to your speed. During this movement you ignore engagement and your movement does not provoke reactions.", "onSuccess": "", "dConditions": "S:Engaged", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sprint Away", "Bounding Sprint"] }
		case "sprint away":
			return { "name": "Sprint Away", "augmentBase": "Sprint", "techniqueGroup": "Class", "techniqueSubGroup": "Athlete", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "A hostile character becomes engaged with you. ", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "bounding sprint":
			return { "name": "Bounding Sprint", "augmentBase": "Sprint", "techniqueGroup": "Class", "techniqueSubGroup": "Athlete", "techniqueType": "Job", "action": "Swift", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "Until the end of your current turn, you ignore engagement, your movement does not provoke reactions, and you may move through enemies' spaces.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Weapon", "defense": "BR DC", "range": "", "rType": "", "target": "One target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "metamagic":
			return { "name": "Metamagic", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Arcanist", "techniqueType": "Job", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "strategize":
			return { "name": "Strategize", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Investigator", "techniqueType": "Job", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "environmental awareness":
			return { "name": "Environmental Awareness", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Investigator", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you use Investigate to assess an environment you may ask one additional question upon passing your check.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "foresight":
			return { "name": "Foresight", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "Your studies have left you with uncanny prescience. When a condition in the following list is met, you may perform the action.\n• When you fail a recall knowledge check and used a specialized knowledge, try again.\n• When initiative is determined, gain 10 Ki.\n• When you are surprised, you may choose to act in the surprise round.\n• When an adjacent ally starts their turn, you allow the character to use the Dash technique once for free.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "Trigger conditions vary.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Saw That Coming", "As You May Recall"] }
		case "saw that coming":
			return { "name": "Saw That Coming", "augmentBase": "Foresight", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "2 Ki", "description": "You may include the following options:\n• When a character becomes engaged with you, you may move half your speed. \n• When an adjacent ally is targetted by an attack, you may use the reposition technique on them before the attack occurs. If the ally is not in the attacker's range, the attack automatically misses.\n• When an adjacent ally gains a condition, clear the condition.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "as you may recall":
			return { "name": "As You May Recall", "augmentBase": "Foresight", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Day", "resourceCost": "1 Chakra", "description": "Instead you may declare a flashback scene. The scene cannot be more than 1 minute long and having happened no more than a day's time. The scene may show you having prepared for an outcome. This may come in the form of having purchased/acquired a necessary item or having gathered information related to the present. \n\nThis flashback must be possible in accordance to established events. The GM may declare you need to perform a skill check to have the scene occur. The GM is the final arbiter of whether a flashback can be established and what the consequences are.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "eclectic knowledge":
			return { "name": "Eclectic Knowledge", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever a nearby character fails a recall knowledge check and you have not yet attempted to perform the same check, you may perform the same check with +1 advantage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Point of Clarity"] }
		case "point of clarity":
			return { "name": "Point of Clarity", "augmentBase": "Eclectic Knowledge", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever a nearby character fails a recall knowledge check and you are trained in the same skill, you may add +4 to their check by correcting any gaps in their knowledge.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "dustcraft":
			return { "name": "Dustcraft", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Swift", "traits": "Material", "limits": "1/Round", "resourceCost": "", "description": "You can move up to 10 lbs of unrestricted material dust up to 5 squares, as long as it remains within your range.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting"] }
		case "shape material":
			return { "name": "Shape Material", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You may craft an item using Tier 1 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "quickcraft":
			return { "name": "Quickcraft", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You may craft an item using Tier 1 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot. \nTreat a successful craft check as if it progressed the crafting time by 2 instead of 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "improved shaping":
			return { "name": "Improved Shaping", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You may craft an item using Tier 2 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "greater shaping":
			return { "name": "Greater Shaping", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "You may craft an item using Tier 3 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "legendary shaping":
			return { "name": "Legendary Shaping", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "You may craft an item using Tier 4 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 8", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "dust material":
			return { "name": "Dust Material", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You may attack an unattended item or structure made of Tier 1 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Structure", "defense": "Brace DC", "range": "3", "rType": "Threat", "target": "One Target", "targetCode": "Field", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": [] }
		case "dust area":
			return { "name": "Dust Area", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You may attack an area of unattended items and structures made of Tier 1 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "Cone 2", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "improved dusting":
			return { "name": "Improved Dusting", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "You may attack an unattended item or structure made of Tier 2 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": [] }
		case "greater dusting":
			return { "name": "Greater Dusting", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "You may attack an unattended item or structure made of Tier 3 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "5", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": [] }
		case "legendary dusting":
			return { "name": "Legendary Dusting", "augmentBase": "Dustcraft", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "You may attack an unattended item or structure made of Tier 4 material into dust.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 8", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "6", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "", "augments": [] }
		case "form pillar":
			return { "name": "Form Pillar", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "Affinity [M]; Focus [F]", "limits": "", "resourceCost": "2 Ki", "description": "You create a pillar in a space within range. The pillar is size 1 but 2 spaces high. The attack block and on hit listings only apply if a character is in the space you place the pillar. You may optionally choose to make the pillar raise slowly enough that it does not do damage.", "onSuccess": "The target gains the launched status and is pushed 1 space in a direction of their choosing.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "Structure", "defense": "PR DC", "range": "3", "rType": "Range", "target": "One Space", "targetCode": "Field", "dVal": "1", "dType": "6", "dBonus": "", "damageType": "Force", "element": "", "augments": ["Form Wall", "Scattered Pillars", "Great Wall"] }
		case "form wall":
			return { "name": "Form Wall", "augmentBase": "Form Pillar", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "You create two additional pillars, connecting them together to make a wall. Each pillar created must be adjacent to another pillar.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "scattered pillars":
			return { "name": "Scattered Pillars", "augmentBase": "Form Pillar", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "You create two additional pillars within range.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "great wall":
			return { "name": "Great Wall", "augmentBase": "Form Pillar", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "You create five additional pillars, connecting them together to make a wall. Each pillar created must be adjacent to another pillar.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "stepping stones":
			return { "name": "Stepping Stones", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Quick", "traits": "Affinity [M]; Focus", "limits": "", "resourceCost": "1 Ki", "description": "Disks of matter fly to points that you designate to make a new path. You can set them horizontally to make a path across the ground or atop a liquid, or anchor them into a vertical surface to make steps. Moving across the path lets a creature ignore difficult terrain and hazardous terrain from the ground beneath it.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "Line 3", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Stepping Path"] }
		case "stepping path":
			return { "name": "Stepping Path", "augmentBase": "Stepping Stones", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "Line 6", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "shield block":
			return { "name": "Shield Block", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Reaction", "traits": "Material", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You quickly create a shield of a material to block the triggering attack. Your DC increases by 5 against the attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You are attacked and the defense is Brace DC, BR DC, or BP DC.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Glancing Block", "Aegis"] }
		case "glancing block":
			return { "name": "Glancing Block", "augmentBase": "Shield Block", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "The hit becomes a glancing hit.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "aegis":
			return { "name": "Aegis", "augmentBase": "Shield Block", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "The hit becomes a miss.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "camoflauge":
			return { "name": "Camoflauge", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]; Material", "limits": "", "resourceCost": "1 Ki", "description": "You cover yourself with dust or loose material in the environment. As long as the material could blend in with your environment and you have soft cover, you may take the Hide action.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "kinesis":
			return { "name": "Kinesis", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Swift", "traits": "Focus; Material", "limits": "", "resourceCost": "", "description": "You can target one object within 2 spaces, made of a Tier 1 material and of 15 Bulk or less. The object floats at your side in your space. You are not considered to be holding the object with this technique. \n\nOnce per turn, you may move the object anywhere within 2 spaces of you. As long as you maintain focus, the object returns to your side at the end of your turn.\n\nCharacters can target the object as it is not on your person. You defend against their attacks using your Enchant DC.\n\nYou are only considered to be focusing with this technique if you are actively controlling an object. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis"] }
		case "distant kinesis":
			return { "name": "Distant Kinesis", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You may target an object up to 5 spaces away. This expanded range does not affect the distance you may move the object from you.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "kinetic strike":
			return { "name": "Kinetic Strike", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "When you use the Strike Technique, you may attack with the object as if you are at the object's location. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "kinetic throw":
			return { "name": "Kinetic Throw", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "When you throw an object and the object is the target of your kinesis technique, you may increase your throw range by 3.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "heavy kinesis":
			return { "name": "Heavy Kinesis", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "The object you target can be up to 40 Bulk, however you cannot move the object away from you nor attack with it.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "cultivate":
			return { "name": "Cultivate", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You provide nourishment to a plant and accelerate its growth by one day. This acceleration ages the plant's overall life. If the plant is mature it can bear fruit or flower. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "1", "rType": "Range", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Entangle", "Wildwood"] }
		case "entangle":
			return { "name": "Entangle", "augmentBase": "Cultivate", "techniqueGroup": "Wood", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "2 Ki", "description": "You cause ether to mimic the plant material and overgrow the area. The area becomes difficult terrain.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "wildwood":
			return { "name": "Wildwood", "augmentBase": "Cultivate", "techniqueGroup": "Wood", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "3 Ki", "description": "You cause ether to mimic the plant material and overgrow the area. The area becomes difficult terrain.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "5", "rType": "Range", "target": "Blast 2", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sicken":
			return { "name": "Sicken", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "You launch poisonous spores at your target.", "onSuccess": "The target gains the sickened condition.", "dConditions": "C:Sickened", "tEffect": "C:Sickened", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Poison Branch; Spellforce 2", "skill": "Assault", "defense": "Fortitude", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "1", "dType": "3", "dBonus": "", "damageType": "Tension", "element": "", "augments": ["Spores", "Sickening Cloud", "Virulent Spores"] }
		case "spores":
			return { "name": "Spores", "augmentBase": "Sicken", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "Roll 1d3. On a 3, the target takes one Stress.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sickening cloud":
			return { "name": "Sickening Cloud", "augmentBase": "Sicken", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "Burst 1", "targetCode": "", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Tension", "element": "", "augments": [] }
		case "virulent spores":
			return { "name": "Virulent Spores", "augmentBase": "Sicken", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "", "onSuccess": "When rolling the die, on a 2, the target takes one Stress.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Tension", "element": "", "augments": [] }
		case "wind step":
			return { "name": "Wind Step", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Wind Branch", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Updraft", "Clouded Updraft", "Wind Fall", "Walk on Air"] }
		case "updraft":
			return { "name": "Updraft", "augmentBase": "Wind Step", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "Reaction", "traits": "Focus", "limits": "1/Round", "resourceCost": "", "description": "You cause a sustained updraft on the ground below the target. This spell disperses fog, dust, and other particles in the same area. \n\nThose who make a vertical jump in the area increase their jump height by 3 spaces. Characters that end a fall within the area treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You or another character within range jump or fall.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "One Space", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "clouded updraft":
			return { "name": "Clouded Updraft", "augmentBase": "Wind Step", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "Reaction", "traits": "Focus", "limits": "1/Round", "resourceCost": "1 Ki", "description": "You cause a sustained updraft on the ground below the target. This spell disperses fog, dust, and other particles in the same area. \n\nThose who make a vertical jump in the area increase their jump height by 3 spaces. Characters that end a fall within the area treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "You or another character within range jump or fall.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "5", "rType": "Threat", "target": "Blast 2", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "wind fall":
			return { "name": "Wind Fall", "augmentBase": "Wind Step", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Treat falls as 4 spaces shorter.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "walk on air":
			return { "name": "Walk on Air", "augmentBase": "Wind Step", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn you may fly using your standard movement. However, at the end of your turn you immediately fall.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "wind bullet":
			return { "name": "Wind Bullet", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "1 Ki", "description": "You create a gust of wind and push a target. You may choose to not deal damage with this attack.", "onSuccess": "Push the target up to two spaces in any direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "4", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "1", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": ["Gust", "Windsweep", "Gale"] }
		case "gust":
			return { "name": "Gust", "augmentBase": "Wind Bullet", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "4", "rType": "Range", "target": "Line 3", "targetCode": "Single", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": [] }
		case "windsweep":
			return { "name": "Windsweep", "augmentBase": "Wind Bullet", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "", "onSuccess": "Push the target up to five spaces in any direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": [] }
		case "gale":
			return { "name": "Gale", "augmentBase": "Wind Bullet", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "", "onSuccess": "Instead, push the targets up to three spaces in any direction. Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "4", "rType": "Range", "target": "Blast 1", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Wood", "augments": [] }
		case "distortion":
			return { "name": "Distortion", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "", "description": "Your form wavers as an illusory duplicate of you forms beside you. The first attack against you until the end of the round has +1 Disadvantage.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Light Branch; Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Lasting Distortion"] }
		case "lasting distortion":
			return { "name": "Lasting Distortion", "augmentBase": "Distortion", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "The disadvantage from Distortion now lasts until the end of the round.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "blurred light":
			return { "name": "Blurred Light", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "1 Ki", "description": "As long as you remain in dim or darker light, you become invisible until the end of your next turn. Taking any action other than Stadard Move, Dash, or Hide breaks this invisibility.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Light Branch; Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Light Refraction"] }
		case "light refraction":
			return { "name": "Light Refraction", "augmentBase": "Blurred Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "Your invisiblity works in light, however instead it breaks if you take any action other than Hide.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "light":
			return { "name": "Light", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You can create an orb of light that either stays in one location or follows at your side. As a free action, you can move an orb of light up to 10 spaces. If the light leaves your line of sight or you fall unconscious, the light disappears.\n\nThe orb sheds bright light in a 4 space radius and dim light for an additional 4 spaces. The light can be colored as you like. Completely covering the object with something opaque blocks the light. \n\nThe orb of light is destroyed if it ever enters or is surrounded by the Darkness spell's area of effect.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Light branch", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Dancing Lights", "Flash", "Sunlight"] }
		case "dancing lights":
			return { "name": "Dancing Lights", "augmentBase": "Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "You can create up to three orbs at a time. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "flash":
			return { "name": "Flash", "augmentBase": "Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "As a quick action, you make a single orb of light flare.", "onSuccess": "The target gains the staggered condition.", "dConditions": "C:Staggered", "tEffect": "C:Staggered", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "Conjure", "defense": "Notice DC", "range": "10", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sunlight":
			return { "name": "Sunlight", "augmentBase": "Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "", "resourceCost": "", "description": "Your orbs of light are no longer destroyed by darkness spell's area of effect, however are still destroyed by the Nightfall spell's area of effect.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "bonfire":
			return { "name": "Bonfire", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "1 Ki", "description": "You cause a space within range to erupt in flame. Any character in the flame is attacked by this spell when it is conjured and then may move 1 space.\n\nAny character that starts their turn in or passes through this flame gains the aflame condition.", "onSuccess": "", "dConditions": "C:Aflame", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Field", "defense": "PR DC", "range": "3", "rType": "Range", "target": "One Space", "targetCode": "Field", "dVal": "1", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "", "augments": ["Wall of Fire", "Field of Flame"] }
		case "wall of fire":
			return { "name": "Wall of Fire", "augmentBase": "Bonfire", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Line 3", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "field of flame":
			return { "name": "Field of Flame", "augmentBase": "Bonfire", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "heat field":
			return { "name": "Heat Field", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may produce heat in one of the following ways. \n• You raise the temperature in a Burst 3 around you by up to 15°C.\n• You raise the temperature of an object you touch by 30°C.\n• You immediately dry a target wet creature or object.\nThese effects may cause objects to immediately begin to melt.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Burn Guard"] }
		case "burn guard":
			return { "name": "Burn Guard", "augmentBase": "Heat Field", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You automatically end the aflame condition on yourself.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "firebolt":
			return { "name": "Firebolt", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You launch a mote of fire at a foe.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "PR DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": ["Flame Arrow", "Fireball", "Fireblast", "Ragnarok"] }
		case "flame arrow":
			return { "name": "Flame Arrow", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "The target gains the aflame condition.", "dConditions": "C:Aflame", "tEffect": "C:Aflame", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "fireball":
			return { "name": "Fireball", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "Blast 1", "targetCode": "", "dVal": "4", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": [] }
		case "fireblast":
			return { "name": "Fireblast", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "Blast 2", "targetCode": "", "dVal": "5", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": [] }
		case "ragnarok":
			return { "name": "Ragnarok", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Ki; 1 Chakra", "description": "", "onSuccess": "The target gains the aflame condition.", "dConditions": "C:Aflame", "tEffect": "C:Aflame", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "", "rType": "", "target": "Blast 2", "targetCode": "", "dVal": "13", "dType": "3", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": [] }
		case "smoke cloud":
			return { "name": "Smoke Cloud", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Smoke", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "", "description": "You cause smoke to rise from the ground. This smoke is thick enough to provide soft cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Smoke branch", "skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Burning Smoke", "Choking Smoke"] }
		case "burning smoke":
			return { "name": "Burning Smoke", "augmentBase": "Smoke Cloud", "techniqueGroup": "Fire", "techniqueSubGroup": "Smoke", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "The smoke burns as it forms.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Field", "defense": "Presence DC", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": [] }
		case "choking smoke":
			return { "name": "Choking Smoke", "augmentBase": "Smoke Cloud", "techniqueGroup": "Fire", "techniqueSubGroup": "Smoke", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "The smoke suffocates those within.", "onSuccess": "The target gains the impaired condition.", "dConditions": "C:Impaired", "tEffect": "C:Impaired", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "Field", "defense": "Presence DC", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Burn", "element": "Fire", "augments": [] }
		case "fire step":
			return { "name": "Fire Step", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Soul", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Soul Branch; Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Liftoff", "Jet"] }
		case "liftoff":
			return { "name": "Liftoff", "augmentBase": "Fire Step", "techniqueGroup": "Fire", "techniqueSubGroup": "Soul", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Once during your standard move, you may move 2 spaces vertically. This movement does not count towards your total speed for this movement. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "jet":
			return { "name": "Jet", "augmentBase": "Fire Step", "techniqueGroup": "Fire", "techniqueSubGroup": "Soul", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn you may fly using your standard movement. However, at the end of your turn you immediately fall.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "shadow steps":
			return { "name": "Shadow Steps", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "1 Ki", "description": "As long as you remain in dim or darker light, you become invisible until the end of your next turn. Taking any action other than Stadard Move, Dash, or Hide breaks this invisibility.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Shadow Branch; Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shadow Walker"] }
		case "shadow walker":
			return { "name": "Shadow Walker", "augmentBase": "Shadow Steps", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "As part of Shadow Steps, you also impart Shadow Steps on all those adjacent to you.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "Burst 1", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "darkness":
			return { "name": "Darkness", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "2 Ki", "description": "You create an area of darkness. This darkness provides soft cover and eliminates any light sources within other than the Sunlight spell's orbs of light.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Shadow Branch; Spellforce 2", "skill": "", "defense": "", "range": "6", "rType": "Range", "target": "Blast 2", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Shadow Wall", "Nightfall"] }
		case "shadow wall":
			return { "name": "Shadow Wall", "augmentBase": "Darkness", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "Line 10", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "nightfall":
			return { "name": "Nightfall", "augmentBase": "Darkness", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "This darkness destroys the Sunlight spell's orbs of light.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "Blast 3", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sand surge":
			return { "name": "Sand Surge", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You cause sand to launch away from you at a target. You may choose to not deal damage with this attack.", "onSuccess": "You may choose to push the target up to two spaces, directly away from you.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "3", "dBonus": "", "damageType": "Force", "element": "Earth", "augments": ["Sand Spout", "Sand Wave", "Sand Launcher"] }
		case "sand spout":
			return { "name": "Sand Spout", "augmentBase": "Sand Surge", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Earth", "augments": [] }
		case "sand wave":
			return { "name": "Sand Wave", "augmentBase": "Sand Surge", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "Line 5", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "sand launcher":
			return { "name": "Sand Launcher", "augmentBase": "Sand Surge", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "1", "rType": "Threat", "target": "Line 5", "targetCode": "Single", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Earth", "augments": [] }
		case "tremorsense":
			return { "name": "Tremorsense", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You can sense creatures through vibration. When you use the Search technique you gain +1 Advantage on any creature on the same surface as you and within ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "burden":
			return { "name": "Burden", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "You force earth to cling to the targen, weighing them down. A creature becomes immune to this technique for 5 minutes after it is used on them.", "onSuccess": "The target gains the encumbered condition.", "dConditions": "C:Encumbered", "tEffect": "C:Encumbered", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Enchant", "defense": "BP DC", "range": "4", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Restrain", "Prostration"] }
		case "restrain":
			return { "name": "Restrain", "augmentBase": "Burden", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "The target gains the immobilzed condition.", "dConditions": "C:Immobilized", "tEffect": "C:Immobilized", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "prostration":
			return { "name": "Prostration", "augmentBase": "Burden", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "", "onSuccess": "The target gains the immobilzed condition and is knocked prone.", "dConditions": "C:Immobilized;C:Prone", "tEffect": "C:Immobilized;C:Prone", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "pressure":
			return { "name": "Pressure", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "3 Ki", "description": "You increase the effects of gravity within an area. The area is considered difficult terrain.\n\nAny character that starts their turn in or passes through this area gains the encumbered condition.", "onSuccess": "", "dConditions": "C:Encumbered", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Gravity branch; Spellforce 2", "skill": "", "defense": "", "range": "4", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Wide Pressure", "Deep Pressure", "Gravity Well"] }
		case "wide pressure":
			return { "name": "Wide Pressure", "augmentBase": "Pressure", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "4", "rType": "Range", "target": "Blast 2", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "deep pressure":
			return { "name": "Deep Pressure", "augmentBase": "Pressure", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Ki", "description": "Any character that starts their turn in or passes through this area also gains the immobilized condition.", "onSuccess": "", "dConditions": "C:Immobilized", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 7", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "gravity well":
			return { "name": "Gravity Well", "augmentBase": "Pressure", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Ki", "description": "Any character that starts their turn in or passes through this area also gains the immobilized condition and are pushed 1 space towards the center of the area.", "onSuccess": "", "dConditions": "C:Immobilized", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "4", "rType": "Range", "target": "Blast 2", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "power flex":
			return { "name": "Power Flex", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Power", "techniqueType": "Active", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You flex and imbue your body with ki, causing your muscles to momentarily double in size. You gain the Empowered condition.", "onSuccess": "", "dConditions": "C:Empowered", "tEffect": "C*:Empowered", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Crush Knuckle", "Impact Knuckle", "Knuckle Flurry"] }
		case "crush knuckle":
			return { "name": "Crush Knuckle", "augmentBase": "Power Flex", "techniqueGroup": "Earth", "techniqueSubGroup": "Power", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "1 Ki", "description": "After flexing, make an attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Power Branch; Spellforce 2", "skill": "Brawling", "defense": "Reflex DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": [] }
		case "impact knuckle":
			return { "name": "Impact Knuckle", "augmentBase": "Power Flex", "techniqueGroup": "Earth", "techniqueSubGroup": "Power", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "After flexing, you charge into the nearest target. Move up to half your speed in a straight line before making an attack.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Power Branch; Spellforce 3", "skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "4", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": [] }
		case "knuckle flurry":
			return { "name": "Knuckle Flurry", "augmentBase": "Power Flex", "techniqueGroup": "Earth", "techniqueSubGroup": "Power", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "After flexing, make three attacks. After each attack you gain the Empowered condition.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Power Branch; Spellforce 5", "skill": "Brawling", "defense": "BR DC", "range": "1", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "1", "dType": "3", "dBonus": "Power", "damageType": "Force", "element": "", "augments": [] }
		case "geyser":
			return { "name": "Geyser", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You cause water to blast upward.", "onSuccess": "The target gains the launched status.", "dConditions": "C:Launched", "tEffect": "C:Launched", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": ["Geyser Line", "Great Geyser Line"] }
		case "geyser line":
			return { "name": "Geyser Line", "augmentBase": "Geyser", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "Line 3", "targetCode": "Single", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "great geyser line":
			return { "name": "Great Geyser Line", "augmentBase": "Geyser", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "rType": "", "target": "Line 6", "targetCode": "Single", "dVal": "5", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": [] }
		case "sea swell":
			return { "name": "Sea Swell", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "Push the target one space in any direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "3", "rType": "Range", "target": "One Target", "targetCode": "Single", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": ["Surf", "Tidal Wave"] }
		case "surf":
			return { "name": "Surf", "augmentBase": "Sea Swell", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "3", "rType": "Range", "target": "Line 3", "targetCode": "Single", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": [] }
		case "tidal wave":
			return { "name": "Tidal Wave", "augmentBase": "Sea Swell", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "Instead, push the targets up to three spaces in any direction. Every target must be pushed in the same direction.", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "5", "rType": "Range", "target": "Blast 1", "targetCode": "Single", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Force", "element": "Water", "augments": [] }
		case "cold field":
			return { "name": "Cold Field", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "Swift", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may produce cold in one of the following ways. \n• You lower the temperature in a Burst 3 around you by up to 15°C.\n• You lower the temperature of an object you touch by 30°C.\nThese effects may cause objects to immediately begin to freeze.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Chill Guard"] }
		case "chill guard":
			return { "name": "Chill Guard", "augmentBase": "Cold Field", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You automatically end the chilled condition on yourself.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "fog cloud":
			return { "name": "Fog Cloud", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "1 Ki", "description": "You cause fog to rise from the ground. This fog is thick enough to provide soft cover.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Storm branch", "skill": "", "defense": "", "range": "3", "rType": "Threat", "target": "Blast 1", "targetCode": "Field", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Sleet", "Freezing Sleet", "Binding Sleet"] }
		case "sleet":
			return { "name": "Sleet", "augmentBase": "Fog Cloud", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Ki", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Field", "defense": "Presence DC", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": [] }
		case "freezing sleet":
			return { "name": "Freezing Sleet", "augmentBase": "Fog Cloud", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Ki", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "Field", "defense": "Presence DC", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": [] }
		case "binding sleet":
			return { "name": "Binding Sleet", "augmentBase": "Fog Cloud", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Ki", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "The target gains the immobilized condition.", "dConditions": "C:Immobilized", "tEffect": "C:Immobilized", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "Field", "defense": "Presence DC", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": [] }
		case "hail":
			return { "name": "Hail", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "2 Ki", "description": "You create a storm of hail. Any character in the storm is attacked by this spell when it is created and then may move 1 space.\n\nAny character that starts their turn in or passes through this storm gains the chilled condition.", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Storm Branch; Spellforce 2", "skill": "Field", "defense": "PR DC", "range": "3", "rType": "Range", "target": "Blast 1", "targetCode": "Field", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "", "augments": ["Ice Storm", "Fimbulwinter"] }
		case "ice storm":
			return { "name": "Ice Storm", "augmentBase": "Hail", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "", "augments": [] }
		case "fimbulwinter":
			return { "name": "Fimbulwinter", "augmentBase": "Hail", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "6 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 7", "skill": "", "defense": "", "range": "4", "rType": "Range", "target": "Blast 2", "targetCode": "", "dVal": "6", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "", "augments": [] }
		case "cold snap":
			return { "name": "Cold Snap", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "PR DC", "range": "2", "rType": "Threat", "target": "One Target", "targetCode": "Single", "dVal": "3", "dType": "3", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": ["Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust"] }
		case "frostbite":
			return { "name": "Frostbite", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "freezebind":
			return { "name": "Freezebind", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "The target gains the immobilzed condition.", "dConditions": "C:Immobilized", "tEffect": "C:Immobilized", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "cold burst":
			return { "name": "Cold Burst", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "0", "rType": "Threat", "target": "Burst 1", "targetCode": "", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": [] }
		case "cold front":
			return { "name": "Cold Front", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "", "onSuccess": "The target gains the chilled condition.", "dConditions": "C:Chilled", "tEffect": "C:Chilled", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "rType": "", "target": "Blast 1", "targetCode": "", "dVal": "6", "dType": "3", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": [] }
		case "diamond dust":
			return { "name": "Diamond Dust", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Ki; 1 Chakra", "description": "", "onSuccess": "The target gains the chilled and immobilized condition.", "dConditions": "C:Chilled;C:Immobilized", "tEffect": "C:Chilled;C:Immobilized", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "0", "rType": "Threat", "target": "Burst 2", "targetCode": "", "dVal": "8", "dType": "6", "dBonus": "", "damageType": "Cold", "element": "Water", "augments": [] }
		case "ether sense":
			return { "name": "Ether Sense", "augmentBase": "", "techniqueGroup": "Metal", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you are within 1 space of a source of stable ether you are made aware of what object is causing the ether.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": ["Spirit Sense"] }
		case "spirit sense":
			return { "name": "Spirit Sense", "augmentBase": "Ether Sense", "techniqueGroup": "Metal", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You can detect spirits residing within characters or objects you touch. When you touch a creature, make an Ethereal skill check. On success, you sense the spirit. ", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }
		case "lightning shaft":
			return { "name": "Lightning Shaft", "augmentBase": "", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You concentrate lightning in your hands before thrusting it forward.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Lightning Branch", "skill": "Assault", "defense": "PR DC", "range": "1", "rType": "Threat", "target": "Line 2", "targetCode": "Single", "dVal": "1", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": ["Shock", "Lightning Bolt", "Plasma Arc", "Fulgor"] }
		case "shock":
			return { "name": "Shock", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Ki", "description": "", "onSuccess": "The target gains the paralyzed condition.", "dConditions": "C:Paralyzed", "tEffect": "C:Paralyzed", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "One Target", "targetCode": "", "dVal": "2", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": [] }
		case "lightning bolt":
			return { "name": "Lightning Bolt", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Ki", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "rType": "", "target": "Line 6", "targetCode": "", "dVal": "3", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": [] }
		case "plasma arc":
			return { "name": "Plasma Arc", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Ki", "description": "When you strike a target you may target another with this spell as long as they are within 2 spaces of the last target. The next target does not have to be within this spell's range. You may chain this lightning up to 5 times.", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "4", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": [] }
		case "fulgor":
			return { "name": "Fulgor", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Ki; 1 Chakra", "description": "", "onSuccess": "The target gains the paralyzed condition.", "dConditions": "C:Paralyzed", "tEffect": "C:Paralyzed", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "", "rType": "", "target": "Line 8", "targetCode": "", "dVal": "8", "dType": "6", "dBonus": "", "damageType": "Energy", "element": "Metal", "augments": [] }
		default:
			return { "name": "", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "dConditions": "", "tEffect": "", "rEffect": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "rType": "", "target": "", "targetCode": "", "dVal": "", "dType": "", "dBonus": "", "damageType": "", "element": "", "augments": [] }

	}
}
