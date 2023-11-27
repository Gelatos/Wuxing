function GetTechniqueTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "affinity":
			return { "name": "Affinity", "group": "Technique", "description": "This technique's element changes to one of your elemental affinities." }
		case "affinity [m]":
			return { "name": "Affinity [M]", "group": "Technique", "description": "This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice." }
		case "ap (x)":
			return { "name": "AP (X)", "group": "Technique", "description": "This technique adds armor piercing. Ignore up to X Armor on the target." }
		case "armament":
			return { "name": "Armament", "group": "Technique", "description": "This technique uses the skill, threat, and damage statistics of an equipped melee weapon." }
		case "armament [f]":
			return { "name": "Armament [F]", "group": "Technique", "description": "This technique uses the skill, threat, and damage statistics and all abilities of an equipped melee weapon." }
		case "arsenal":
			return { "name": "Arsenal", "group": "Technique", "description": "This technique uses the skill, range, and damage statistics of an equipped ranged weapon." }
		case "arsenal [f]":
			return { "name": "Arsenal [F]", "group": "Technique", "description": "This technique uses the skill, range, and damage statistics and all abilities of an equipped ranged weapon." }
		case "brutal":
			return { "name": "Brutal", "group": "Technique", "description": "When this technique deals damage, roll all damage dice twice and take only the highest results." }
		case "focus":
			return { "name": "Focus", "group": "Technique", "description": "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus [F] effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time." }
		case "focus [f]":
			return { "name": "Focus [F]", "group": "Technique", "description": "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus [F] effect at a time. When you take Trauma, all on going Focus [F] effects immediately end. The caster can end a Focus [F] technique at any time." }
		case "material":
			return { "name": "Material", "group": "Technique", "description": "This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique." }
		case "multiple":
			return { "name": "Multiple", "group": "Technique", "description": "This technique can be learned multiple times." }
		case "volatile":
			return { "name": "Volatile", "group": "Technique", "description": "This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally." }
		case "vortex":
			return { "name": "Vortex", "group": "Technique", "description": "This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape." }
		case "wall":
			return { "name": "Wall", "group": "Technique", "description": "This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material." }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

function GetItemTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "arcing":
			return { "name": "Arcing", "group": "Item", "description": "This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover." }
		case "shield":
			return { "name": "Shield", "group": "Item", "description": "This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility." }
		case "thrown":
			return { "name": "Thrown", "group": "Item", "description": "This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill." }
		case "two-handed":
			return { "name": "Two-Handed", "group": "Item", "description": "This weapon is required to be wielded in two hands." }
		case "loud":
			return { "name": "Loud", "group": "Item", "description": "This weapon creates a loud booming noise, audible to those within 300 feet of the source." }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

function GetAbilityTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "ap (x)":
			return { "name": "AP (X)", "group": "Ability", "description": "This weapon is armor piercing. Ignore up to X Armor on the target." }
		case "blast (x)":
			return { "name": "Blast (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters within a radius of X spaces, drawn from a point within range and line of sight. Cover and line of sight are calculated based on the center of the blast, rather than the attacker’s position." }
		case "cone (x)":
			return { "name": "Cone (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters within a cone, X spaces long and X spaces wide at its furthest point. The cone begins 1 space wide." }
		case "crushing":
			return { "name": "Crushing", "group": "Ability", "description": "This weapon can crush through defenses. Actions that target BR DC instead targets Reflex DC." }
		case "explosive (x/y)":
			return { "name": "Explosive (X/Y)", "group": "Ability", "description": "This weapon can explode on impact. Attacks made with this weapon affect characters within a radius of X spaces, drawn from the impact point, and deals X extra damage to all characters in the area." }
		case "impact (x)":
			return { "name": "Impact (X)", "group": "Ability", "description": "This weapon deals X extra damage." }
		case "knockback (x)":
			return { "name": "Knockback (X)", "group": "Ability", "description": "On a hit, the user may choose to knock their target X spaces in a straight line directly away from the point of origin." }
		case "line (x)":
			return { "name": "Line (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters in a straight line, X spaces long." }
		case "quick":
			return { "name": "Quick", "group": "Ability", "description": "This weapon is easy to maneuver allowing you to easily strike at enemies trying to evade you. Actions that target BR DC instead targets Brace DC." }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

function GetMaterialTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "flammable":
			return { "name": "Flammable", "group": "Material", "description": "This material will gain the aflame condition when exposed to fire." }
		case "flexible":
			return { "name": "Flexible", "group": "Material", "description": "Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage." }
		case "frozen":
			return { "name": "Frozen", "group": "Material", "description": "Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour." }
		case "sharp":
			return { "name": "Sharp", "group": "Material", "description": "Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin." }
		case "sturdy":
			return { "name": "Sturdy", "group": "Material", "description": "Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force." }
		case "transparent":
			return { "name": "Transparent", "group": "Material", "description": "A transparent material can be seen through due to its translucency. " }
		default:
			return { "name": "", "group": "", "description": "" }

	}
}

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
			return { "name": "Fighter", "category": "Warfare", "description": "The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. ", "growths": { "CON": 4, "DEX": 4, "QCK": 2, "STR": 3, "CHA": 0, "INT": 0, "PER": 0, "WIL": 1, "hp": 3, "vitality": 5, "kiCharge": 1, "spellForce": 0 }, "prerequisite": "", "jobTechnique": "Second Wind", "advancement": [{ "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Shrug It Off", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Always Armored", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Always Armored +", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Undaunted", "type": "T" }] }
		case "interceptor":
			return { "name": "Interceptor", "category": "Warfare", "description": "The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies.", "growths": { "CON": 2, "DEX": 4, "QCK": 5, "STR": 2, "CHA": 0, "INT": 0, "PER": 3, "WIL": 3, "hp": 0, "vitality": 2, "kiCharge": 0, "spellForce": 0 }, "prerequisite": "Trained in Notice", "jobTechnique": "Preemptive Strike", "advancement": [{ "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Preemptive Stagger", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Pounce", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Pounce and Step", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Critical Maim", "type": "T" }] }
		case "marksman":
			return { "name": "Marksman", "category": "Warfare", "description": "", "growths": { "CON": 3, "DEX": 4, "QCK": 3, "STR": 0, "CHA": 2, "INT": 0, "PER": 5, "WIL": 1, "hp": 0, "vitality": 0, "kiCharge": 2, "spellForce": 2 }, "prerequisite": "Trained in Assault and Marksmanship", "jobTechnique": "Spellshot", "advancement": [{ "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Gain a Magic Skill Technique.", "type": "MS" }, { "name": "", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Distant Spell", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "", "type": "T" }, { "name": "Gain a Magic Skill Technique.", "type": "MS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "", "type": "T" }] }
		case "paladin":
			return { "name": "Paladin", "category": "Warfare", "description": "", "growths": { "CON": 1, "DEX": 3, "QCK": 2, "STR": 4, "CHA": 0, "INT": 0, "PER": 0, "WIL": 5, "hp": 3, "vitality": 3, "kiCharge": 0, "spellForce": 1 }, "prerequisite": "Trained in Presence and Enchant", "jobTechnique": "Savior", "advancement": [{ "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Magic Skill Technique.", "type": "MS" }, { "name": "Defender's Will", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Knock Away Savior", "type": "T" }, { "name": "Gain a Magic Skill Technique.", "type": "MS" }, { "name": "Ironwill", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Magic Skill Technique.", "type": "MS" }, { "name": "Savior's Retaliation", "type": "T" }] }
		case "rogue":
			return { "name": "Rogue", "category": "Talent", "description": "The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. ", "growths": { "CON": 0, "DEX": 5, "QCK": 4, "STR": 0, "CHA": 2, "INT": 2, "PER": 3, "WIL": 3, "hp": 1, "vitality": 0, "kiCharge": 0, "spellForce": 0 }, "prerequisite": "", "jobTechnique": "Sneak Attack", "advancement": [{ "name": "Gain a Body Skill Technique.", "type": "BS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Sneaky Follow-Up", "type": "T" }, { "name": "Gain a Body Skill Technique.", "type": "BS" }, { "name": "Skulk Away", "type": "T" }, { "name": "Gain a Body Skill Technique.", "type": "BS" }, { "name": "Then Hide", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Gain a Body Skill Technique.", "type": "BS" }, { "name": "Assassinate", "type": "T" }] }
		case "pugilist":
			return { "name": "Pugilist", "category": "Talent", "description": "The pugilist is a martial artist and athlete whose own body is a weapon. They feature an incredible method of getting in and out of combat with their Sprint. When they are in combat, their Flurry of Blows allows them to attack more often and combo off their foes' conditions.", "growths": { "CON": 4, "DEX": 4, "QCK": 3, "STR": 3, "CHA": 0, "INT": 0, "PER": 1, "WIL": 0, "hp": 4, "vitality": 2, "kiCharge": 0, "spellForce": 0 }, "prerequisite": "Trained in Athletics and Brawling", "jobTechnique": "Flurry of Blows", "advancement": [{ "name": "Gain a Body Skill Technique.", "type": "BS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Sprint", "type": "T" }, { "name": "Gain a Body Skill Technique.", "type": "BS" }, { "name": "Throw Down", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Burst Sprint", "type": "T" }, { "name": "Gain a Body Skill Technique.", "type": "BS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Stunning Strike", "type": "T" }] }
		case "physician":
			return { "name": "Physician", "category": "Acumen", "description": "The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action.", "growths": { "CON": 3, "DEX": 0, "QCK": 3, "STR": 0, "CHA": 4, "INT": 0, "PER": 5, "WIL": 3, "hp": 0, "vitality": 0, "kiCharge": 2, "spellForce": 2 }, "prerequisite": "Trained in Academics and Heal", "jobTechnique": "Emergency Care", "advancement": [{ "name": "Gain a Technical Skill Technique.", "type": "TS" }, { "name": "Gain a Knowledge Skill Technique.", "type": "KS" }, { "name": "First Aid", "type": "T" }, { "name": "Gain a Technical Skill Technique.", "type": "TS" }, { "name": "Nightingale", "type": "T" }, { "name": "Gain a Knowledge Skill Technique.", "type": "KS" }, { "name": "Cleansing Aid", "type": "T" }, { "name": "Gain a Technical Skill Technique.", "type": "TS" }, { "name": "Gain a Knowledge Skill Technique.", "type": "KS" }, { "name": "Rhapsody", "type": "T" }] }
		case "scholar":
			return { "name": "Scholar", "category": "Acumen", "description": "The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too.", "growths": { "CON": 1, "DEX": 3, "QCK": 3, "STR": 0, "CHA": 0, "INT": 5, "PER": 4, "WIL": 2, "hp": 0, "vitality": 1, "kiCharge": 3, "spellForce": 0 }, "prerequisite": "Trained in Academics", "jobTechnique": "Foresight", "advancement": [{ "name": "Gain a Knowledge Skill Technique.", "type": "KS" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Eclectic Knowledge", "type": "T" }, { "name": "Gain a Knowledge Skill Technique.", "type": "KS" }, { "name": "Saw That Coming", "type": "T" }, { "name": "Gain a Knowledge Skill Technique.", "type": "KS" }, { "name": "Point of Clarity", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Knowledge Skill Technique.", "type": "KS" }, { "name": "As You May Recall", "type": "T" }] }
		default:
			return { "name": "", "category": "", "description": "", "growths": [], "prerequisite": "", "jobTechnique": "", "advancement": [] }

	}
}

function GetClassesList(isFields) {
	if (isFields) {
		return ["fighter", "interceptor", "marksman", "paladin", "rogue", "pugilist", "physician", "scholar"];
	}
	else {
		return ["Fighter", "Interceptor", "Marksman", "Paladin", "Rogue", "Pugilist", "Physician", "Scholar"];
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
		return ["combatReflexes", "combatReflexes+", "refocus", "refocus+", "sustainedChannel", "sustainedChannel+", "affinity", "affinity+", "branchingOut", "branchingOut+", "chakraControl", "chakraControl+", "chakraControl++", "stressRelease", "stressRelease+", "stressRelease++", "undying", "undying+", "vitalityBoost", "vitalityBoost+", "vitalityBoost++"];
	}
	else {
		return ["Combat Reflexes", "Combat Reflexes +", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +", "Affinity", "Affinity +", "Branching Out", "Branching Out +", "Chakra Control", "Chakra Control +", "Chakra Control ++", "Stress Release", "Stress Release +", "Stress Release ++", "Undying", "Undying +", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++"];
	}
}

function GetAllPathTechniquesList(isFields) {
	if (isFields) {
		return ["phys.DefensiveTraining", "phys.DefensiveTraining+", "sens.DefenseTraining", "sens.DefenseTraining+", "combatTraining", "combatTraining+", "combatTraining++", "magicTraining", "magicTraining+", "magicTraining++", "bodyTraining", "bodyTraining+", "bodyTraining++", "knowledgeTraining", "knowledgeTraining+", "knowledgeTraining++", "socialTraining", "socialTraining+", "socialTraining++", "technicalTraining", "technicalTraining+", "technicalTraining++", "combatReflexes", "combatReflexes+", "refocus", "refocus+", "sustainedChannel", "sustainedChannel+", "affinity", "affinity+", "branchingOut", "branchingOut+", "chakraControl", "chakraControl+", "chakraControl++", "stressRelease", "stressRelease+", "stressRelease++", "undying", "undying+", "vitalityBoost", "vitalityBoost+", "vitalityBoost++"];
	}
	else {
		return ["Phys. Defensive Training", "Phys. Defensive Training +", "Sens. Defense Training", "Sens. Defense Training +", "Combat Training", "Combat Training +", "Combat Training ++", "Magic Training", "Magic Training +", "Magic Training ++", "Body Training", "Body Training +", "Body Training ++", "Knowledge Training", "Knowledge Training +", "Knowledge Training ++", "Social Training", "Social Training +", "Social Training ++", "Technical Training", "Technical Training +", "Technical Training ++", "Combat Reflexes", "Combat Reflexes +", "Refocus", "Refocus +", "Sustained Channel", "Sustained Channel +", "Affinity", "Affinity +", "Branching Out", "Branching Out +", "Chakra Control", "Chakra Control +", "Chakra Control ++", "Stress Release", "Stress Release +", "Stress Release ++", "Undying", "Undying +", "Vitality Boost", "Vitality Boost +", "Vitality Boost ++"];
	}
}

function GetDefensiveSkillTechniquesList(isFields) {
	if (isFields) {
		return ["hPUp", "improvedInitiative"];
	}
	else {
		return ["HP Up", "Improved Initiative"];
	}
}

function GetMartialSkillTechniquesList(isFields) {
	if (isFields) {
		return ["brawler", "crushingBlade", "staggeringBlade", "piledriver", "shreddingDriver", "pointBlankShot", "shotOnTheRun", "poleVault", "quickDraw", "rapidVolley", "rushingVolley", "sharpshooter", "deadeye", "uppercut", "followUpLauncher"];
	}
	else {
		return ["Brawler", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Point Blank Shot", "Shot on the Run", "Pole Vault", "Quick Draw", "Rapid Volley", "Rushing Volley", "Sharpshooter", "Deadeye", "Uppercut", "Follow Up Launcher"];
	}
}

function GetMagicSkillTechniquesList(isFields) {
	if (isFields) {
		return ["learnSpell"];
	}
	else {
		return ["Learn Spell"];
	}
}

function GetBodySkillTechniquesList(isFields) {
	if (isFields) {
		return ["acceleration", "powerVault", "expeditious", "quickClimb", "quickSwim", "poise", "catFall", "kipUp", "silentStride", "armoredStealth", "shove", "knockdown", "tumble"];
	}
	else {
		return ["Acceleration", "Power Vault", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Armored Stealth", "Shove", "Knockdown", "Tumble"];
	}
}

function GetKnowledgeSkillTechniquesList(isFields) {
	if (isFields) {
		return ["broadStudy", "experiencedTracker", "multilingual", "specializedKnowledge"];
	}
	else {
		return ["Broad Study", "Experienced Tracker", "Multilingual", "Specialized Knowledge"];
	}
}

function GetSocialSkillTechniquesList(isFields) {
	if (isFields) {
		return ["createDiversion", "demoralize", "fascinate", "impersonator"];
	}
	else {
		return ["Create Diversion", "Demoralize", "Fascinate", "Impersonator"];
	}
}

function GetTechnicalSkillTechniquesList(isFields) {
	if (isFields) {
		return ["firstAid"];
	}
	else {
		return ["First Aid"];
	}
}

function GetAllSkillTechniquesList(isFields) {
	if (isFields) {
		return ["hPUp", "improvedInitiative", "brawler", "crushingBlade", "staggeringBlade", "piledriver", "shreddingDriver", "pointBlankShot", "shotOnTheRun", "poleVault", "quickDraw", "rapidVolley", "rushingVolley", "sharpshooter", "deadeye", "uppercut", "followUpLauncher", "learnSpell", "acceleration", "powerVault", "expeditious", "quickClimb", "quickSwim", "poise", "catFall", "kipUp", "silentStride", "armoredStealth", "shove", "knockdown", "tumble", "broadStudy", "experiencedTracker", "multilingual", "specializedKnowledge", "createDiversion", "demoralize", "fascinate", "impersonator", "firstAid"];
	}
	else {
		return ["HP Up", "Improved Initiative", "Brawler", "Crushing Blade", "Staggering Blade", "Piledriver", "Shredding Driver", "Point Blank Shot", "Shot on the Run", "Pole Vault", "Quick Draw", "Rapid Volley", "Rushing Volley", "Sharpshooter", "Deadeye", "Uppercut", "Follow Up Launcher", "Learn Spell", "Acceleration", "Power Vault", "Expeditious", "Quick Climb", "Quick Swim", "Poise", "Cat Fall", "Kip Up", "Silent Stride", "Armored Stealth", "Shove", "Knockdown", "Tumble", "Broad Study", "Experienced Tracker", "Multilingual", "Specialized Knowledge", "Create Diversion", "Demoralize", "Fascinate", "Impersonator", "First Aid"];
	}
}

function GetFighterTechniquesList(isFields) {
	if (isFields) {
		return ["secondWind", "shrugItOff", "undaunted", "alwaysArmored", "blockingExpert"];
	}
	else {
		return ["Second Wind", "Shrug It Off", "Undaunted", "Always Armored", "Blocking Expert"];
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

function GetMarksmanTechniquesList(isFields) {
	if (isFields) {
		return ["spellshot", "distantSpell"];
	}
	else {
		return ["Spellshot", "Distant Spell"];
	}
}

function GetPaladinTechniquesList(isFields) {
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
		return ["sneakAttack", "sneakyFollow-Up", "assassinate", "skulkAway", "thenHide"];
	}
	else {
		return ["Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Skulk Away", "Then Hide"];
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

function GetPugilistTechniquesList(isFields) {
	if (isFields) {
		return ["flurryOfBlows", "throwDown", "stunningStrike", "sprint", "run"];
	}
	else {
		return ["Flurry of Blows", "Throw Down", "Stunning Strike", "Sprint", "Run"];
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
		return ["secondWind", "shrugItOff", "undaunted", "alwaysArmored", "blockingExpert", "preemptiveStrike", "preemptiveStagger", "criticalMaim", "pounce", "pounceAndStep", "spellshot", "distantSpell", "savior", "knockAwaySavior", "savior'sRetaliation", "defender'sWill", "ironwill", "spellstrike", "powerSkirmish", "sneakAttack", "sneakyFollow-Up", "assassinate", "skulkAway", "thenHide", "emergencyCare", "nightingale", "rhapsody", "firstAid", "cleansingAid", "flurryOfBlows", "throwDown", "stunningStrike", "sprint", "run", "metamagic", "strategize", "environmentalAwareness", "foresight", "sawThatComing", "asYouMayRecall", "eclecticKnowledge", "pointOfClarity"];
	}
	else {
		return ["Second Wind", "Shrug It Off", "Undaunted", "Always Armored", "Blocking Expert", "Preemptive Strike", "Preemptive Stagger", "Critical Maim", "Pounce", "Pounce and Step", "Spellshot", "Distant Spell", "Savior", "Knock Away Savior", "Savior's Retaliation", "Defender's Will", "Ironwill", "Spellstrike", "Power Skirmish", "Sneak Attack", "Sneaky Follow-Up", "Assassinate", "Skulk Away", "Then Hide", "Emergency Care", "Nightingale", "Rhapsody", "First Aid", "Cleansing Aid", "Flurry of Blows", "Throw Down", "Stunning Strike", "Sprint", "Run", "Metamagic", "Strategize", "Environmental Awareness", "Foresight", "Saw That Coming", "As You May Recall", "Eclectic Knowledge", "Point of Clarity"];
	}
}

function GetArcaneCreationTechniquesList(isFields) {
	if (isFields) {
		return ["shapeMaterial", "quickcraft", "improvedShaping", "greaterShaping", "legendaryShaping", "dustMaterial", "dustArea", "improvedDusting", "greaterDusting", "legendaryDusting", "createPillar", "createWall", "scatteredPillars", "greatWall", "steppingStones", "steppingPath", "shieldBlock", "glancingBlock", "aegis"];
	}
	else {
		return ["Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Create Pillar", "Create Wall", "Scattered Pillars", "Great Wall", "Stepping Stones", "Stepping Path", "Shield Block", "Glancing Block", "Aegis"];
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
		return ["shapeMaterial", "quickcraft", "improvedShaping", "greaterShaping", "legendaryShaping", "dustMaterial", "dustArea", "improvedDusting", "greaterDusting", "legendaryDusting", "createPillar", "createWall", "scatteredPillars", "greatWall", "steppingStones", "steppingPath", "shieldBlock", "glancingBlock", "aegis", "camoflauge", "kinesis", "distantKinesis", "kineticStrike", "kineticThrow", "heavyKinesis"];
	}
	else {
		return ["Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Create Pillar", "Create Wall", "Scattered Pillars", "Great Wall", "Stepping Stones", "Stepping Path", "Shield Block", "Glancing Block", "Aegis", "Camoflauge", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis"];
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
		return ["updraft", "greatUpdraft", "windStep", "windFall", "walkOnAir", "windBullet", "gust", "windsweep", "gale"];
	}
	else {
		return ["Updraft", "Great Updraft", "Wind Step", "Wind Fall", "Walk on Air", "Wind Bullet", "Gust", "Windsweep", "Gale"];
	}
}

function GetWoodTechniquesList(isFields) {
	if (isFields) {
		return ["cultivate", "entangle", "wildwood", "sicken", "spores", "sickeningCloud", "virulentSpores", "updraft", "greatUpdraft", "windStep", "windFall", "walkOnAir", "windBullet", "gust", "windsweep", "gale"];
	}
	else {
		return ["Cultivate", "Entangle", "Wildwood", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Updraft", "Great Updraft", "Wind Step", "Wind Fall", "Walk on Air", "Wind Bullet", "Gust", "Windsweep", "Gale"];
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
		return ["bonfire", "wallOfFire", "fieldOfFlame", "produceHeat", "burnGuard", "firebolt", "flameArrow", "fireball", "fireblast", "ragnarok"];
	}
	else {
		return ["Bonfire", "Wall of Fire", "Field of Flame", "Produce Heat", "Burn Guard", "Firebolt", "Flame Arrow", "Fireball", "Fireblast", "Ragnarok"];
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
		return ["distortion", "lastingDistortion", "blurredLight", "lightRefraction", "light", "dancingLights", "flash", "sunlight", "bonfire", "wallOfFire", "fieldOfFlame", "produceHeat", "burnGuard", "firebolt", "flameArrow", "fireball", "fireblast", "ragnarok", "smokeCloud", "burningSmoke", "chokingSmoke", "fireStep", "liftoff", "jet"];
	}
	else {
		return ["Distortion", "Lasting Distortion", "Blurred Light", "Light Refraction", "Light", "Dancing Lights", "Flash", "Sunlight", "Bonfire", "Wall of Fire", "Field of Flame", "Produce Heat", "Burn Guard", "Firebolt", "Flame Arrow", "Fireball", "Fireblast", "Ragnarok", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Fire Step", "Liftoff", "Jet"];
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

function GetEarthTechniquesList(isFields) {
	if (isFields) {
		return ["shadowSteps", "shadowWalker", "darkness", "shadowWall", "nightfall", "sandSurge", "sandSpout", "sandWave", "sandLauncher", "tremorsense", "burden", "restrain", "prostration", "pressure", "widePressure", "deepPressure", "gravityWell"];
	}
	else {
		return ["Shadow Steps", "Shadow Walker", "Darkness", "Shadow Wall", "Nightfall", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Tremorsense", "Burden", "Restrain", "Prostration", "Pressure", "Wide Pressure", "Deep Pressure", "Gravity Well"];
	}
}

function GetWaterBasicTechniquesList(isFields) {
	if (isFields) {
		return ["geyser", "geyserLine", "greatGeyserLine", "seaSwell", "surf", "tidalWave", "produceCold", "chillGuard"];
	}
	else {
		return ["Geyser", "Geyser Line", "Great Geyser Line", "Sea Swell", "Surf", "Tidal Wave", "Produce Cold", "Chill Guard"];
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
		return ["geyser", "geyserLine", "greatGeyserLine", "seaSwell", "surf", "tidalWave", "produceCold", "chillGuard", "fogCloud", "sleet", "freezingSleet", "bindingSleet", "hail", "iceStorm", "fimbulwinter", "coldSnap", "frostbite", "freezebind", "coldBurst", "coldFront", "diamondDust"];
	}
	else {
		return ["Geyser", "Geyser Line", "Great Geyser Line", "Sea Swell", "Surf", "Tidal Wave", "Produce Cold", "Chill Guard", "Fog Cloud", "Sleet", "Freezing Sleet", "Binding Sleet", "Hail", "Ice Storm", "Fimbulwinter", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust"];
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
		return ["shapeMaterial", "quickcraft", "improvedShaping", "greaterShaping", "legendaryShaping", "dustMaterial", "dustArea", "improvedDusting", "greaterDusting", "legendaryDusting", "createPillar", "createWall", "scatteredPillars", "greatWall", "steppingStones", "steppingPath", "shieldBlock", "glancingBlock", "aegis", "camoflauge", "kinesis", "distantKinesis", "kineticStrike", "kineticThrow", "heavyKinesis", "cultivate", "entangle", "wildwood", "sicken", "spores", "sickeningCloud", "virulentSpores", "updraft", "greatUpdraft", "windStep", "windFall", "walkOnAir", "windBullet", "gust", "windsweep", "gale", "distortion", "lastingDistortion", "blurredLight", "lightRefraction", "light", "dancingLights", "flash", "sunlight", "bonfire", "wallOfFire", "fieldOfFlame", "produceHeat", "burnGuard", "firebolt", "flameArrow", "fireball", "fireblast", "ragnarok", "smokeCloud", "burningSmoke", "chokingSmoke", "fireStep", "liftoff", "jet", "shadowSteps", "shadowWalker", "darkness", "shadowWall", "nightfall", "sandSurge", "sandSpout", "sandWave", "sandLauncher", "tremorsense", "burden", "restrain", "prostration", "pressure", "widePressure", "deepPressure", "gravityWell", "geyser", "geyserLine", "greatGeyserLine", "seaSwell", "surf", "tidalWave", "produceCold", "chillGuard", "fogCloud", "sleet", "freezingSleet", "bindingSleet", "hail", "iceStorm", "fimbulwinter", "coldSnap", "frostbite", "freezebind", "coldBurst", "coldFront", "diamondDust", "etherSense", "spiritSense", "lightningShaft", "shock", "lightningBolt", "plasmaArc", "fulgor"];
	}
	else {
		return ["Shape Material", "Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping", "Dust Material", "Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting", "Create Pillar", "Create Wall", "Scattered Pillars", "Great Wall", "Stepping Stones", "Stepping Path", "Shield Block", "Glancing Block", "Aegis", "Camoflauge", "Kinesis", "Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis", "Cultivate", "Entangle", "Wildwood", "Sicken", "Spores", "Sickening Cloud", "Virulent Spores", "Updraft", "Great Updraft", "Wind Step", "Wind Fall", "Walk on Air", "Wind Bullet", "Gust", "Windsweep", "Gale", "Distortion", "Lasting Distortion", "Blurred Light", "Light Refraction", "Light", "Dancing Lights", "Flash", "Sunlight", "Bonfire", "Wall of Fire", "Field of Flame", "Produce Heat", "Burn Guard", "Firebolt", "Flame Arrow", "Fireball", "Fireblast", "Ragnarok", "Smoke Cloud", "Burning Smoke", "Choking Smoke", "Fire Step", "Liftoff", "Jet", "Shadow Steps", "Shadow Walker", "Darkness", "Shadow Wall", "Nightfall", "Sand Surge", "Sand Spout", "Sand Wave", "Sand Launcher", "Tremorsense", "Burden", "Restrain", "Prostration", "Pressure", "Wide Pressure", "Deep Pressure", "Gravity Well", "Geyser", "Geyser Line", "Great Geyser Line", "Sea Swell", "Surf", "Tidal Wave", "Produce Cold", "Chill Guard", "Fog Cloud", "Sleet", "Freezing Sleet", "Binding Sleet", "Hail", "Ice Storm", "Fimbulwinter", "Cold Snap", "Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust", "Ether Sense", "Spirit Sense", "Lightning Shaft", "Shock", "Lightning Bolt", "Plasma Arc", "Fulgor"];
	}
}

function GetTechniquesInfo(name) {
	switch (name.toLowerCase()) {
		case "phys. defensive training":
			return { "name": "Phys. Defensive Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Physical Defensive skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 8", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Phys. Defensive Training +"] }
		case "phys. defensive training +":
			return { "name": "Phys. Defensive Training +", "augmentBase": "Phys. Defensive Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Physical Defensive skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sens. defense training":
			return { "name": "Sens. Defense Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Sensory Defensive skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 8", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Sens. Defense Training +"] }
		case "sens. defense training +":
			return { "name": "Sens. Defense Training +", "augmentBase": "Sens. Defense Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Sensory Defensive skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "combat training":
			return { "name": "Combat Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Combat skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Combat Training +", "Combat Training ++"] }
		case "combat training +":
			return { "name": "Combat Training +", "augmentBase": "Combat Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Combat skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "combat training ++":
			return { "name": "Combat Training ++", "augmentBase": "Combat Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Combat skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "magic training":
			return { "name": "Magic Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Magic skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Magic Training +", "Magic Training ++"] }
		case "magic training +":
			return { "name": "Magic Training +", "augmentBase": "Magic Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Magic skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "magic training ++":
			return { "name": "Magic Training ++", "augmentBase": "Magic Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Magic skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "body training":
			return { "name": "Body Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Body Training +", "Body Training ++"] }
		case "body training +":
			return { "name": "Body Training +", "augmentBase": "Body Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "body training ++":
			return { "name": "Body Training ++", "augmentBase": "Body Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Body skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "knowledge training":
			return { "name": "Knowledge Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Knowledge Training +", "Knowledge Training ++"] }
		case "knowledge training +":
			return { "name": "Knowledge Training +", "augmentBase": "Knowledge Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "knowledge training ++":
			return { "name": "Knowledge Training ++", "augmentBase": "Knowledge Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Knowledge skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "social training":
			return { "name": "Social Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Social Training +", "Social Training ++"] }
		case "social training +":
			return { "name": "Social Training +", "augmentBase": "Social Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "social training ++":
			return { "name": "Social Training ++", "augmentBase": "Social Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Social skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "technical training":
			return { "name": "Technical Training", "augmentBase": "", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Technical Training +", "Technical Training ++"] }
		case "technical training +":
			return { "name": "Technical Training +", "augmentBase": "Technical Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 18", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "technical training ++":
			return { "name": "Technical Training ++", "augmentBase": "Technical Training", "techniqueGroup": "Training Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Become trained in one Technical skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 33", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "combat reflexes":
			return { "name": "Combat Reflexes", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "Until the end of the round, your Follow-Up Attack technique can be used 3/Round, but only 1/Turn.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 9", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Combat Reflexes +"] }
		case "combat reflexes +":
			return { "name": "Combat Reflexes +", "augmentBase": "Combat Reflexes", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "Increase the round limit to 4/Round, but only 2/Turn.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 24", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "refocus":
			return { "name": "Refocus", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You quickly recenter. You may exchange one loaded tech slot with another technique.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character level 9", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Refocus +"] }
		case "refocus +":
			return { "name": "Refocus +", "augmentBase": "Refocus", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You may exchange two loaded tech slots with two other techniques.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sustained channel":
			return { "name": "Sustained Channel", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You may take 1 Stress to ignore the effects of overchanneling for 5 minutes.\n\nThe second time you use this action will cause you to instead take 3 Stress. Using this action a third time will cause you to instead take 6 Stress. Any uses after this causes instant death. These uses reset when you perform a long rest.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Sustained Channel +"] }
		case "sustained channel +":
			return { "name": "Sustained Channel +", "augmentBase": "Sustained Channel", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Standard", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "The duration before you feel the effects of overchanneling extends to 15 minutes.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 24", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "affinity":
			return { "name": "Affinity", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Gain another Elemental Affinity.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Affinity +"] }
		case "affinity +":
			return { "name": "Affinity +", "augmentBase": "Affinity", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Gain another Elemental Affinity.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 39", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "branching out":
			return { "name": "Branching Out", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You gain a new Branch. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Branching Out +"] }
		case "branching out +":
			return { "name": "Branching Out +", "augmentBase": "Branching Out", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You gain a new Branch. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 14", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "chakra control":
			return { "name": "Chakra Control", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Chakra increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 14", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Chakra Control +", "Chakra Control ++"] }
		case "chakra control +":
			return { "name": "Chakra Control +", "augmentBase": "Chakra Control", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Chakra increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 19", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "chakra control ++":
			return { "name": "Chakra Control ++", "augmentBase": "Chakra Control", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Chakra increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "stress release":
			return { "name": "Stress Release", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Stress Release +", "Stress Release ++"] }
		case "stress release +":
			return { "name": "Stress Release +", "augmentBase": "Stress Release", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 19", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "stress release ++":
			return { "name": "Stress Release ++", "augmentBase": "Stress Release", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Stress Limit increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "undying":
			return { "name": "Undying", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Wound Limit increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 19", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Undying +"] }
		case "undying +":
			return { "name": "Undying +", "augmentBase": "Undying", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Wound Limit increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 34", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "vitality boost":
			return { "name": "Vitality Boost", "augmentBase": "", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Vitality Boost +", "Vitality Boost ++"] }
		case "vitality boost +":
			return { "name": "Vitality Boost +", "augmentBase": "Vitality Boost", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 14", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "vitality boost ++":
			return { "name": "Vitality Boost ++", "augmentBase": "Vitality Boost", "techniqueGroup": "General Path", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Vitality increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Character Level 29", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "hp up":
			return { "name": "HP Up", "augmentBase": "", "techniqueGroup": "Defensive Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Gain a bonus to HP equal to half your character level. Whenever you gain an even numbered character level you also gain 1 HP.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "improved initiative":
			return { "name": "Improved Initiative", "augmentBase": "", "techniqueGroup": "Defensive Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your initiative increases by 4.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "brawler":
			return { "name": "Brawler", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your Unarmed Strike damage increases to 2d3.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Human Ancestry", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "crushing blade":
			return { "name": "Crushing Blade", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament [F]", "limits": "", "resourceCost": "", "description": "You attempt to power through any defense the foe has. Make a melee attack.", "onSuccess": "", "trigger": "", "requirement": "Must be attacking with a Might weapon", "prerequisite": "Trained in Might", "skill": "Weapon", "defense": "Reflex DC", "range": "", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Staggering Blade"] }
		case "staggering blade":
			return { "name": "Staggering Blade", "augmentBase": "Crushing Blade", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "The target gains the Staggered condition.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Staggered", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "piledriver":
			return { "name": "Piledriver", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament [F]; Brutal", "limits": "", "resourceCost": "2 Mana", "description": "You swing with incredible force at your target, attempting to launch them into the air. Make a melee attack. ", "onSuccess": "The target gains the Launched status.", "trigger": "", "requirement": "Must be attacking with a Might weapon", "prerequisite": "Trained in Might", "skill": "Weapon", "defense": "BR DC", "range": "", "target": "One Target", "targetCode": "Single", "onHit": "Status:Launched", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Shredding Driver"] }
		case "shredding driver":
			return { "name": "Shredding Driver", "augmentBase": "Piledriver", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "AP (4); Armament [F]; Brutal", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "point blank shot":
			return { "name": "Point Blank Shot", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You are treated as having threat 2 when equipped with a Bow or Handgun weapon.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Marksmanship", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Shot on the Run"] }
		case "shot on the run":
			return { "name": "Shot on the Run", "augmentBase": "Point Blank Shot", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you use a Bow or Handgun weapon as a melee weapon, you may immediately move 1 space.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "pole vault":
			return { "name": "Pole Vault", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "", "description": "You increase your jump height by 2 on both horizontal and vertical jumps.", "onSuccess": "", "trigger": "You jump during your movement.", "requirement": "You are wielding a Polearm weapon.", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "quick draw":
			return { "name": "Quick Draw", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may ignore the 1 / Turn limit of the Equip action when equipping a weapon that does not have the Two-handed trait.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "rapid volley":
			return { "name": "Rapid Volley", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament; Brutal", "limits": "", "resourceCost": "", "description": "You strike fast to catch an evasive target. Make a melee attack.", "onSuccess": "", "trigger": "", "requirement": "Must be attacking with a Polearm weapon", "prerequisite": "Trained in Polearm", "skill": "Weapon", "defense": "Brace DC", "range": "", "target": "One target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Rushing Volley"] }
		case "rushing volley":
			return { "name": "Rushing Volley", "augmentBase": "Rapid Volley", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Full", "traits": "Armament [F]; Brutal", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sharpshooter":
			return { "name": "Sharpshooter", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your range with Bow and Longarm weapons increases by 4 until the end of your turn.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Marksmanship", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Deadeye"] }
		case "deadeye":
			return { "name": "Deadeye", "augmentBase": "Sharpshooter", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Free", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "Your ranged attacks with Bow and Longarm weapons ignore Soft Cover until the end of your turn.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "uppercut":
			return { "name": "Uppercut", "augmentBase": "", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "Armament", "limits": "", "resourceCost": "2 Mana", "description": "You deal a blow to the target that knocks them off their feet. Make a melee attack. ", "onSuccess": "The target gains the Launched status.", "trigger": "", "requirement": "Must be attacking with a Brawling weapon", "prerequisite": "Trained in Brawling", "skill": "Weapon", "defense": "BR DC", "range": "", "target": "One target", "targetCode": "Single", "onHit": "Status:Launched", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Follow Up Launcher"] }
		case "follow up launcher":
			return { "name": "Follow Up Launcher", "augmentBase": "Uppercut", "techniqueGroup": "Martial Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "Before the end of your turn, if you attack the same character with a Brawling melee attack, they do not lose the Launched status.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "learn spell":
			return { "name": "Learn Spell", "augmentBase": "", "techniqueGroup": "Magic Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "Multiple", "limits": "", "resourceCost": "", "description": "Learn a Spell Technique that you meet the prerequisites for. This technique can be taken multiple times, each time you learn a new spell technique.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "acceleration":
			return { "name": "Acceleration", "augmentBase": "", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "1 Mana", "description": "Until the end of your turn, your speed increases by 2. You may then move up to half your speed.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Athletics", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Power Vault"] }
		case "power vault":
			return { "name": "Power Vault", "augmentBase": "Acceleration", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "Until the end of your turn, your horizontal and vertical jump distance is doubled.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "expeditious":
			return { "name": "Expeditious", "augmentBase": "", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Athletics", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Quick Climb", "Quick Swim"] }
		case "quick climb":
			return { "name": "Quick Climb", "augmentBase": "Expeditious", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "When you climb you move at half your full speed.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "quick swim":
			return { "name": "Quick Swim", "augmentBase": "Expeditious", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "When you swim you move at your full speed.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "poise":
			return { "name": "Poise", "augmentBase": "", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You always succeed at normal difficulty Acrobatics checks to maintain balance.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Acrobatics", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Cat Fall", "Kip Up"] }
		case "cat fall":
			return { "name": "Cat Fall", "augmentBase": "Poise", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Treat falls as 4 spaces shorter.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "kip up":
			return { "name": "Kip Up", "augmentBase": "Poise", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn, you can get up from prone for free.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "silent stride":
			return { "name": "Silent Stride", "augmentBase": "", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "If you are hidden and lose cover, you may use your standard move and not lose the hidden status as long as your move ends with you in cover.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Stealth", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Armored Stealth"] }
		case "armored stealth":
			return { "name": "Armored Stealth", "augmentBase": "Silent Stride", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You ignore your Flexibility penalty on the stealth skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "shove":
			return { "name": "Shove", "augmentBase": "", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You try to ram into a character.", "onSuccess": "You may choose to push the target up to two spaces, directly away from you. If you move the target, you may follow the target up to the same distance you moved them.", "trigger": "", "requirement": "Target must be the same Size or smaller than you.", "prerequisite": "Trained in Physique", "skill": "Physique", "defense": "BR DC", "range": "1", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Knockdown"] }
		case "knockdown":
			return { "name": "Knockdown", "augmentBase": "Shove", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Active", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "Your target is also knocked prone. ", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Status:Prone", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "tumble":
			return { "name": "Tumble", "augmentBase": "", "techniqueGroup": "Body Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "You move at least 1 space, up to your speed. During this movement, you can try to move through the space of one enemy. Attempt an Acrobatics check against the enemy’s Reflex DC as soon as you try to enter its space. ", "onSuccess": "You do not trigger engagement and may continue moving.", "trigger": "", "requirement": "", "prerequisite": "Trained in Acrobatics", "skill": "Acrobatics", "defense": "Reflex DC", "range": "1", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "broad study":
			return { "name": "Broad Study", "augmentBase": "", "techniqueGroup": "Knowledge Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You are well read in a lot of different subjects. Gain a +1 bonus whenever making a Recall Knowledge check.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "experienced tracker":
			return { "name": "Experienced Tracker", "augmentBase": "", "techniqueGroup": "Knowledge Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You track at your full speed.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Survival", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "multilingual":
			return { "name": "Multilingual", "augmentBase": "", "techniqueGroup": "Knowledge Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "Multiple", "limits": "", "resourceCost": "", "description": "You gain three Languages.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "specialized knowledge":
			return { "name": "Specialized Knowledge", "augmentBase": "", "techniqueGroup": "Knowledge Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "Multiple", "limits": "", "resourceCost": "", "description": "You gain three Lore Knowledges.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "create diversion":
			return { "name": "Create Diversion", "augmentBase": "", "techniqueGroup": "Social Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "With a gesture, a trick, or some distracting words, you can create a diversion that draws creatures' attention elsewhere. ", "onSuccess": "Until the end of this turn, you have +1 advantage on the next attack roll against the target.", "trigger": "", "requirement": "", "prerequisite": "Trained in Deception", "skill": "Deception", "defense": "Insight DC", "range": "3", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "demoralize":
			return { "name": "Demoralize", "augmentBase": "", "techniqueGroup": "Social Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "", "description": "With a sudden shout, a well-timed taunt, or a cutting putdown, you can shake an enemy's resolve. \n\nRegardless of your result, the target is temporarily immune to your attempts to Demoralize it for 5 minutes.", "onSuccess": "The target gains the frightened condition.", "trigger": "", "requirement": "", "prerequisite": "Trained in Intimidation", "skill": "Intimidation", "defense": "Resolve DC", "range": "5", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "fascinate":
			return { "name": "Fascinate", "augmentBase": "", "techniqueGroup": "Social Skill", "techniqueSubGroup": "", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "Through fancy footwork, vicious mockery, or a startling performance, you draw the attention of those nearby.\n\nRegardless of your result, targets are temporarily immune to your attempts to Fascinate them for 5 minutes.", "onSuccess": "The target gains the staggered condition.", "trigger": "", "requirement": "", "prerequisite": "Trained in Performance", "skill": "Performance", "defense": "Insight DC", "range": "3", "target": "Up to three targets", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "impersonator":
			return { "name": "Impersonator", "augmentBase": "", "techniqueGroup": "Social Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "If you spend 5 minutes studying a person you are trying to impersonate, you gain +1 advantage on all deception checks to pass yourself off as that person.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Deception", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "first aid":
			return { "name": "First Aid", "augmentBase": "", "techniqueGroup": "Technical Skill", "techniqueSubGroup": "", "techniqueType": "Permanent", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "When treating wounds during a long rest, unless the wound has unique end conditions, you always succeed at your Medicine check.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Trained in Medicine", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "second wind":
			return { "name": "Second Wind", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Job", "action": "Free", "traits": "", "limits": "1/Round", "resourceCost": "1 Vitality", "description": "You take a breath and refocus your senses. You restore your HP to full.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Shrug It Off", "Undaunted"] }
		case "shrug it off":
			return { "name": "Shrug It Off", "augmentBase": "Second Wind", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Job", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may remove one condition that is affecting you.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "HP+100%", "augments": [] }
		case "undaunted":
			return { "name": "Undaunted", "augmentBase": "Second Wind", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Job", "action": "Free", "traits": "", "limits": "", "resourceCost": "3 Mana; 1 Chakra", "description": "Remove 1 Wound from yourself. In 5 minutes, or when you choose to do so early, you take 1 Wound.", "onSuccess": "", "trigger": "", "requirement": "You have a wound.", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "always armored":
			return { "name": "Always Armored", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You have +1 Armor.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Blocking Expert"] }
		case "blocking expert":
			return { "name": "Blocking Expert", "augmentBase": "Always Armored", "techniqueGroup": "Class", "techniqueSubGroup": "Fighter", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You have +5 Block.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "preemptive strike":
			return { "name": "Preemptive Strike", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "Armament", "limits": "1/Round", "resourceCost": "", "description": "You perform a melee attack against the triggering character.", "onSuccess": "The target stops moving immediately and loses any unused movement.", "trigger": "The target moves within your threat.", "requirement": "", "prerequisite": "", "skill": "Weapon", "defense": "BR DC", "range": "", "target": "One target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Preemptive Stagger", "Critical Maim"] }
		case "preemptive stagger":
			return { "name": "Preemptive Stagger", "augmentBase": "Preemptive Strike", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "", "onSuccess": "The target gains the Staggered condition.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Staggered", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "critical maim":
			return { "name": "Critical Maim", "augmentBase": "Preemptive Strike", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "The target loses 1 Quick Action or 1 Full Action.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "pounce":
			return { "name": "Pounce", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "If your weapon has threat, your threat with the weapon increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Pounce and Step"] }
		case "pounce and step":
			return { "name": "Pounce and Step", "augmentBase": "Pounce", "techniqueGroup": "Class", "techniqueSubGroup": "Interceptor", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever you melee attack you may move 1 space after your attack. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "spellshot":
			return { "name": "Spellshot", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Marksman", "techniqueType": "Job", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You use projectiles as a conduit for magic. Until the end of your turn, spells you cast with the volatile trait have their range increased by 2.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Distant Spell"] }
		case "distant spell":
			return { "name": "Distant Spell", "augmentBase": "Spellshot", "techniqueGroup": "Class", "techniqueSubGroup": "Marksman", "techniqueType": "Job", "action": "Free", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "Instead, spells you cast with the volatile trait have the range of your equipped weapon.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "savior":
			return { "name": "Savior", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Paladin", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You trade spaces with the triggering defending character and take the attack instead. The original attack is cancelled and the attacking character is forced to remake the melee attack against you. ", "onSuccess": "", "trigger": "A character adjacent to you is hit by a melee attack.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Knock Away Savior", "Savior's Retaliation"] }
		case "knock away savior":
			return { "name": "Knock Away Savior", "augmentBase": "Savior", "techniqueGroup": "Class", "techniqueSubGroup": "Paladin", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "", "description": "After trading spaces with the defending character, you may move the character up to 2 spaces away. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "savior's retaliation":
			return { "name": "Savior's Retaliation", "augmentBase": "Savior", "techniqueGroup": "Class", "techniqueSubGroup": "Paladin", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "After the attack against you is resolved you may immediately usd the Skirmish technique against the attacking character. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "defender's will":
			return { "name": "Defender's Will", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Paladin", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "Gain your Barrier and Block in Temporary HP. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Ironwill"] }
		case "ironwill":
			return { "name": "Ironwill", "augmentBase": "Defender's Will", "techniqueGroup": "Class", "techniqueSubGroup": "Paladin", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "Remove a condition affecting you. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "spellstrike":
			return { "name": "Spellstrike", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Spellblade", "techniqueType": "Job", "action": "Free", "traits": "Affinity; AP (All)", "limits": "1/Round", "resourceCost": "1 Mana", "description": "You infuse your weapon with your elemental affinity. ", "onSuccess": "", "trigger": "", "requirement": "You hit an adjacent creature with a melee attack.", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "Mod", "onHit": "", "damage": "3h", "damageType": "Energy", "element": "", "specBonus": "", "augments": [] }
		case "power skirmish":
			return { "name": "Power Skirmish", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Warrior", "techniqueType": "Job", "action": "Full", "traits": "Armament [F]; Brutal", "limits": "", "resourceCost": "", "description": "Make a melee attack and add 2d3 to the damage.", "onSuccess": "", "trigger": "", "requirement": "The weapon must be Two-Handed.", "prerequisite": "", "skill": "", "defense": "BR DC", "range": "", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "Add; 2h", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sneak attack":
			return { "name": "Sneak Attack", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Job", "action": "Free", "traits": "AP (All)", "limits": "1/Round", "resourceCost": "", "description": "You know how to strike subtly and exploit a foe’s distraction.", "onSuccess": "", "trigger": "", "requirement": "You hit an adjacent creature with a piercing weapon and an ally is engaged with the target or you were hidden before you attacked.", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "Mod", "onHit": "", "damage": "2h", "damageType": "Piercing", "element": "", "specBonus": "", "augments": ["Sneaky Follow-Up", "Assassinate"] }
		case "sneaky follow-up":
			return { "name": "Sneaky Follow-Up", "augmentBase": "Sneak Attack", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Job", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When using Sneak Attack as part of a Follow-Up Attack, ignore the 1/Round limitation.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "assassinate":
			return { "name": "Assassinate", "augmentBase": "Sneak Attack", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Job", "action": "Free", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "The target must be Staggered when they were attacked.", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "5h", "damageType": "Piercing", "element": "", "specBonus": "", "augments": [] }
		case "skulk away":
			return { "name": "Skulk Away", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You may move half your speed after performing a Follow-Up Attack.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Then Hide"] }
		case "then hide":
			return { "name": "Then Hide", "augmentBase": "Skulk Away", "techniqueGroup": "Class", "techniqueSubGroup": "Rogue", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You may Hide after performing Skulk Away.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "emergency care":
			return { "name": "Emergency Care", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "You provide emergency first aid. The target may spend 1 Vitality to restore their HP to full. You may also clear a condition on the target that wasn’t caused by one of their own techniques or features.", "onSuccess": "", "trigger": "", "requirement": "You must have access to a Medkit.", "prerequisite": "", "skill": "", "defense": "", "range": "1", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Nightingale", "Rhapsody"] }
		case "nightingale":
			return { "name": "Nightingale", "augmentBase": "Emergency Care", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "The target may restore their HP to full without spending 1 Vitality.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "rhapsody":
			return { "name": "Rhapsody", "augmentBase": "Emergency Care", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Job", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana; 1 Chakra", "description": "Remove 1 Wound from an adjacent character. This action consumes a Medkit.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "first aid":
			return { "name": "First Aid", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You provide emergency first aid. The target may spend 1 Vitality to restore their HP to full.", "onSuccess": "", "trigger": "", "requirement": "You must have access to a Medkit.", "prerequisite": "", "skill": "", "defense": "", "range": "1", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Cleansing Aid"] }
		case "cleansing aid":
			return { "name": "Cleansing Aid", "augmentBase": "First Aid", "techniqueGroup": "Class", "techniqueSubGroup": "Physician", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "Clear a condition on the target that wasn’t caused by one of their own techniques or features.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "flurry of blows":
			return { "name": "Flurry of Blows", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Pugilist", "techniqueType": "Job", "action": "Quick", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You strike at a foe with multiple strikes. Make two melee attacks against one target. Both attacks must use the Brawling skill.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Weapon", "defense": "BR DC", "range": "", "target": "One target", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Throw Down", "Stunning Strike"] }
		case "throw down":
			return { "name": "Throw Down", "augmentBase": "Flurry of Blows", "techniqueGroup": "Class", "techniqueSubGroup": "Pugilist", "techniqueType": "Job", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "The target is knocked prone after either attack.", "trigger": "", "requirement": "The target must be Launched.", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "stunning strike":
			return { "name": "Stunning Strike", "augmentBase": "Flurry of Blows", "techniqueGroup": "Class", "techniqueSubGroup": "Pugilist", "techniqueType": "Job", "action": "Quick", "traits": "", "limits": "", "resourceCost": "3 Mana; 1 Chakra", "description": "", "onSuccess": "The target gains the Stunned condition until the end of the Round.", "trigger": "", "requirement": "The target must be Staggered.", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sprint":
			return { "name": "Sprint", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Pugilist", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "You may move up to half your speed. You do not become engaged during this movement.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Run"] }
		case "run":
			return { "name": "Run", "augmentBase": "Sprint", "techniqueGroup": "Class", "techniqueSubGroup": "Pugilist", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your sprint limits becomes 2/Round", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "metamagic":
			return { "name": "Metamagic", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Arcanist", "techniqueType": "Job", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "strategize":
			return { "name": "Strategize", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Investigator", "techniqueType": "Job", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "environmental awareness":
			return { "name": "Environmental Awareness", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Investigator", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "When you use Investigate to assess an environment you may ask one additional question upon passing your check.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "foresight":
			return { "name": "Foresight", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "1/Round", "resourceCost": "", "description": "Your studies have left you with uncanny prescience. When a condition in the following list is met, you may perform the action.\n• When you fail a recall knowledge check and used a specialized knowledge, try again.\n• When initiative is determined, add +2 to your initiative.\n• When initiative is determined, gain 1 Mana.\n• When you are surprised, you may choose to act in the surprise round.\n• When an adjacent ally starts their turn, you allow the character to use the Dash technique once for free.", "onSuccess": "", "trigger": "Trigger conditions vary.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Saw That Coming", "As You May Recall"] }
		case "saw that coming":
			return { "name": "Saw That Coming", "augmentBase": "Foresight", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "Instead you have the following options:\n• When a character becomes engaged with you, you may move half your speed. \n• When an adjacent ally is targetted by an attack, you may use the shove technique on them before the attack occurs. If the ally is not in the attacker's range, the attack automatically misses.\n• When an adjacent ally gains a condition that wasn’t caused by one of their own techniques, clear the condition.\n\nThis augment can only be used 1/Rest", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "as you may recall":
			return { "name": "As You May Recall", "augmentBase": "Foresight", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Job", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Chakra", "description": "Instead you may declare a flashback scene. The scene cannot be more than 1 minute long and having happened no more than a day's time. The scene may show you having prepared for an outcome. This may come in the form of having purchased/acquired a necessary item or having gathered information related to the present. \n\nThis flashback must be possible in accordance to established events. The GM may declare you need to perform a skill check to have the scene occur. The GM is the final arbiter of whether a flashback can be established and what the consequences are.\n\nThis augment can only be used 1/Day", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "eclectic knowledge":
			return { "name": "Eclectic Knowledge", "augmentBase": "", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever a nearby character fails a recall knowledge check and you have not yet attempted to perform the same check, you may perform the same check with +1 advantage.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Point of Clarity"] }
		case "point of clarity":
			return { "name": "Point of Clarity", "augmentBase": "Eclectic Knowledge", "techniqueGroup": "Class", "techniqueSubGroup": "Scholar", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Whenever a nearby character fails a recall knowledge check and you are trained in the same skill, you may add +4 to their check by correcting any gaps in their knowledge.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "shape material":
			return { "name": "Shape Material", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "Material", "limits": "", "resourceCost": "1 Mana", "description": "You may craft an item using Tier 1 material dust. The item you craft can be created in an adjacent space or immediately donned into yours or a willing adjacent character's gear slot.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "1T", "target": "One Target", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Quickcraft", "Improved Shaping", "Greater Shaping", "Legendary Shaping"] }
		case "quickcraft":
			return { "name": "Quickcraft", "augmentBase": "Shape Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "Treat a successful craft check as if it progressed the crafting time by 2 instead of 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "improved shaping":
			return { "name": "Improved Shaping", "augmentBase": "Shape Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "You may craft an item using Tier 2 material dust.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "greater shaping":
			return { "name": "Greater Shaping", "augmentBase": "Shape Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "You may craft an item using Tier 3 material dust.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "legendary shaping":
			return { "name": "Legendary Shaping", "augmentBase": "Shape Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "You may craft an item using Tier 4 material dust.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 8", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "dust material":
			return { "name": "Dust Material", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "Material", "limits": "", "resourceCost": "1 Mana", "description": "You may destroy an item made of Tier 1 material into dust.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Structure", "defense": "Brace DC", "range": "3T", "target": "One Target", "targetCode": "Field", "onHit": "", "damage": "3d", "damageType": "Energy", "element": "", "specBonus": "", "augments": ["Dust Area", "Improved Dusting", "Greater Dusting", "Legendary Dusting"] }
		case "dust area":
			return { "name": "Dust Area", "augmentBase": "Dust Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "1T", "target": "Cone 2", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "improved dusting":
			return { "name": "Improved Dusting", "augmentBase": "Dust Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "You may also target Tier 2 material.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "4d", "damageType": "Energy", "element": "", "specBonus": "", "augments": [] }
		case "greater dusting":
			return { "name": "Greater Dusting", "augmentBase": "Dust Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "You may also target Tier 2 or 3 material.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "5d", "damageType": "Energy", "element": "", "specBonus": "", "augments": [] }
		case "legendary dusting":
			return { "name": "Legendary Dusting", "augmentBase": "Dust Material", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "You may also target Tier 2, Tier 3, or Tier 4 material.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 8", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "6d", "damageType": "Energy", "element": "", "specBonus": "", "augments": [] }
		case "create pillar":
			return { "name": "Create Pillar", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "Affinity [M]; Focus [F]", "limits": "", "resourceCost": "2 Mana", "description": "You create a pillar in a space within range. The pillar is size 1 but 2 spaces high. The attack block and on hit listings only apply if a character is in the space you place the pillar. You may optionally choose to make the pillar raise slowly enough that it does not do damage.", "onSuccess": "The target gains the launched status and is pushed 1 space in a direction of their choosing.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "Structure", "defense": "PR DC", "range": "3R", "target": "One Space", "targetCode": "Field", "onHit": "Status:Launched", "damage": "1d", "damageType": "Force", "element": "", "specBonus": "", "augments": ["Create Wall", "Scattered Pillars", "Great Wall"] }
		case "create wall":
			return { "name": "Create Wall", "augmentBase": "Create Pillar", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "You create two additional pillars, connecting them together to make a wall. Each pillar created must be adjacent to another pillar.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "scattered pillars":
			return { "name": "Scattered Pillars", "augmentBase": "Create Pillar", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "You create two additional pillars within range.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "great wall":
			return { "name": "Great Wall", "augmentBase": "Create Pillar", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Action", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "You create five additional pillars, connecting them together to make a wall. Each pillar created must be adjacent to another pillar.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "stepping stones":
			return { "name": "Stepping Stones", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Quick", "traits": "Affinity [M]; Focus", "limits": "", "resourceCost": "1 Mana", "description": "Disks of matter fly to points that you designate to make a new path. You can set them horizontally to make a path across the ground or atop a liquid, or anchor them into a vertical surface to make steps. Moving across the path lets a creature ignore difficult terrain and hazardous terrain from the ground beneath it.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "1T", "target": "Line 3", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Stepping Path"] }
		case "stepping path":
			return { "name": "Stepping Path", "augmentBase": "Stepping Stones", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "Line 6", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "shield block":
			return { "name": "Shield Block", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Reaction", "traits": "Material", "limits": "1/Round", "resourceCost": "1 Mana", "description": "You quickly create a shield of a material to block the triggering attack. Your DC increases by 5 against the attack.", "onSuccess": "", "trigger": "You are attacked and the defense is Brace DC, BR DC, or BP DC.", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Glancing Block", "Aegis"] }
		case "glancing block":
			return { "name": "Glancing Block", "augmentBase": "Shield Block", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "The hit becomes a glancing hit.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "aegis":
			return { "name": "Aegis", "augmentBase": "Shield Block", "techniqueGroup": "Arcane", "techniqueSubGroup": "Creation", "techniqueType": "Support", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "The hit becomes a miss.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "camoflauge":
			return { "name": "Camoflauge", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]; Material", "limits": "", "resourceCost": "1 Mana", "description": "You cover yourself with dust or loose material in the environment. As long as the material could blend in with your environment and you have soft cover, you may take the Hide action.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "Self", "target": "", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "kinesis":
			return { "name": "Kinesis", "augmentBase": "", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Free", "traits": "Focus; Material", "limits": "", "resourceCost": "", "description": "As a free action you can target one object within 2 spaces, made of a Tier 1 material and of 15 Bulk or less. The object floats at your side in your space. You are not considered to be holding the object with this technique. \n\nOnce per turn, you may move the object anywhere within 2 spaces of you. As long as you maintain focus, the object returns to your side at the end of your turn.\n\nCharacters can target the object as it is not on your person. You defend against their attacks using your Enchant DC.\n\nYou are only considered to be focusing with this technique if you are actively controlling an object. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Distant Kinesis", "Kinetic Strike", "Kinetic Throw", "Heavy Kinesis"] }
		case "distant kinesis":
			return { "name": "Distant Kinesis", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You may target an object up to 5 spaces away. This expanded range does not affect the distance you may move the object from you.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "kinetic strike":
			return { "name": "Kinetic Strike", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you use the Strike Technique, you may attack with the object as if you are at the object's location. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "kinetic throw":
			return { "name": "Kinetic Throw", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "When you throw an object and the object is the target of your kinesis technique, you may increase your throw range by 3.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "heavy kinesis":
			return { "name": "Heavy Kinesis", "augmentBase": "Kinesis", "techniqueGroup": "Arcane", "techniqueSubGroup": "Manipulation", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "The object you target can be up to 40 Bulk, however you cannot move the object away from you nor attack with it.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "cultivate":
			return { "name": "Cultivate", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "You provide nourishment to a plant and accelerate its growth by one day. This acceleration ages the plant's overall life. If the plant is mature it can bear fruit or flower. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "1R", "target": "", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Entangle", "Wildwood"] }
		case "entangle":
			return { "name": "Entangle", "augmentBase": "Cultivate", "techniqueGroup": "Wood", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "2 Mana", "description": "You cause ether to mimic the plant material and overgrow the area. The area becomes difficult terrain.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "3R", "target": "Blast 1", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "wildwood":
			return { "name": "Wildwood", "augmentBase": "Cultivate", "techniqueGroup": "Wood", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "3 Mana", "description": "You cause ether to mimic the plant material and overgrow the area. The area becomes difficult terrain.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "5R", "target": "Blast 2", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sicken":
			return { "name": "Sicken", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "You launch poisonous spores at your target.", "onSuccess": "The target gains the sickened condition.", "trigger": "", "requirement": "", "prerequisite": "Poison Branch; Spellforce 2", "skill": "Assault", "defense": "Fortitude", "range": "3R", "target": "One Target", "targetCode": "Single", "onHit": "Condition:Sickened", "damage": "1h", "damageType": "Tension", "element": "", "specBonus": "", "augments": ["Spores", "Sickening Cloud", "Virulent Spores"] }
		case "spores":
			return { "name": "Spores", "augmentBase": "Sicken", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "Roll 1d3. On a 3, the target takes one Stress.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sickening cloud":
			return { "name": "Sickening Cloud", "augmentBase": "Sicken", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "Burst 1", "targetCode": "", "onHit": "", "damage": "3h", "damageType": "Tension", "element": "", "specBonus": "", "augments": [] }
		case "virulent spores":
			return { "name": "Virulent Spores", "augmentBase": "Sicken", "techniqueGroup": "Wood", "techniqueSubGroup": "Poison", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "", "onSuccess": "When rolling the die, on a 2, the target takes one Stress.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "3h", "damageType": "Tension", "element": "", "specBonus": "", "augments": [] }
		case "updraft":
			return { "name": "Updraft", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Support", "action": "Reaction", "traits": "Focus", "limits": "1/Round", "resourceCost": "", "description": "You cause a sustained updraft on the ground below the target. This spell disperses fog, dust, and other particles in the same area. \n\nThose who make a vertical jump in the area increase their jump height by 3 spaces. Characters that end a fall within the area treat falls as 4 spaces shorter.", "onSuccess": "", "trigger": "You or another character within range jump or fall.", "requirement": "", "prerequisite": "Wind Branch", "skill": "", "defense": "", "range": "5T", "target": "One Space", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Great Updraft"] }
		case "great updraft":
			return { "name": "Great Updraft", "augmentBase": "Updraft", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Support", "action": "Reaction", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "Blast 2", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "wind step":
			return { "name": "Wind Step", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Wind Branch; Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Wind Fall", "Walk on Air"] }
		case "wind fall":
			return { "name": "Wind Fall", "augmentBase": "Wind Step", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Treat falls as 4 spaces shorter.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "walk on air":
			return { "name": "Walk on Air", "augmentBase": "Wind Step", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn you may fly using your standard movement. However, at the end of your turn you immediately fall.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "wind bullet":
			return { "name": "Wind Bullet", "augmentBase": "", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "1 Mana", "description": "You create a gust of wind and push a target. You may choose to not deal damage with this attack.", "onSuccess": "Push the target up to two spaces in any direction.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "4R", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "1d", "damageType": "Force", "element": "Wood", "specBonus": "", "augments": ["Gust", "Windsweep", "Gale"] }
		case "gust":
			return { "name": "Gust", "augmentBase": "Wind Bullet", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "Every target must be pushed in the same direction.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "4R", "target": "Line 3", "targetCode": "Single", "onHit": "", "damage": "2d", "damageType": "Force", "element": "Wood", "specBonus": "", "augments": [] }
		case "windsweep":
			return { "name": "Windsweep", "augmentBase": "Wind Bullet", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "", "onSuccess": "Push the target up to five spaces in any direction.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "2d", "damageType": "Force", "element": "Wood", "specBonus": "", "augments": [] }
		case "gale":
			return { "name": "Gale", "augmentBase": "Wind Bullet", "techniqueGroup": "Wood", "techniqueSubGroup": "Wind", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "", "onSuccess": "Instead, push the targets up to three spaces in any direction. Every target must be pushed in the same direction.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "4R", "target": "Blast 1", "targetCode": "Single", "onHit": "", "damage": "3d", "damageType": "Force", "element": "Wood", "specBonus": "", "augments": [] }
		case "distortion":
			return { "name": "Distortion", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "", "description": "Your form wavers as an illusory duplicate of you forms beside you. The first attack against you until the end of the round has +1 Disadvantage.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Light Branch; Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Lasting Distortion"] }
		case "lasting distortion":
			return { "name": "Lasting Distortion", "augmentBase": "Distortion", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "The disadvantage from Distortion now lasts until the end of the round.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "blurred light":
			return { "name": "Blurred Light", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "1 Mana", "description": "As long as you remain in dim or darker light, you become invisible until the end of your next turn. Taking any action other than Stadard Move, Dash, or Hide breaks this invisibility.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Light Branch; Spellforce 2", "skill": "", "defense": "", "range": "Self", "target": "", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Light Refraction"] }
		case "light refraction":
			return { "name": "Light Refraction", "augmentBase": "Blurred Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "", "description": "Your invisiblity works in light, however instead it breaks if you take any action other than Hide.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "light":
			return { "name": "Light", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "As a free action, you can create an orb of light that either stays in one location or follows at your side. As a free action, you can move an orb of light up to 10 spaces. If the light leaves your line of sight or you fall unconscious, the light disappears.\n\nThe orb sheds bright light in a 4 space radius and dim light for an additional 4 spaces. The light can be colored as you like. Completely covering the object with something opaque blocks the light. \n\nThe orb of light is destroyed if it ever enters or is surrounded by the Darkness spell's area of effect.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Light branch", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Dancing Lights", "Flash", "Sunlight"] }
		case "dancing lights":
			return { "name": "Dancing Lights", "augmentBase": "Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "You can create up to three orbs at a time. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "flash":
			return { "name": "Flash", "augmentBase": "Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "As a quick action, you make a single orb of light flare.", "onSuccess": "The target gains the staggered condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "Conjure", "defense": "Notice DC", "range": "10 R", "target": "One Target", "targetCode": "Single", "onHit": "Condition: Staggered", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sunlight":
			return { "name": "Sunlight", "augmentBase": "Light", "techniqueGroup": "Fire", "techniqueSubGroup": "Light", "techniqueType": "Passive", "action": "Free", "traits": "", "limits": "", "resourceCost": "", "description": "Your orbs of light are no longer destroyed by darkness spell's area of effect, however are still destroyed by the Nightfall spell's area of effect.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "bonfire":
			return { "name": "Bonfire", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "1 Mana", "description": "You cause a space within range to erupt in flame. Any character in the flame is attacked by this spell when it is conjured and then may move 1 space.\n\nAny character that starts their turn in or passes through this flame gains the aflame condition.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Field", "defense": "PR DC", "range": "3R", "target": "One Space", "targetCode": "Field", "onHit": "", "damage": "1d", "damageType": "Burn", "element": "", "specBonus": "", "augments": ["Wall of Fire", "Field of Flame"] }
		case "wall of fire":
			return { "name": "Wall of Fire", "augmentBase": "Bonfire", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "3R", "target": "Line 3", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "field of flame":
			return { "name": "Field of Flame", "augmentBase": "Bonfire", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "3R", "target": "Blast 1", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "produce heat":
			return { "name": "Produce Heat", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Once per round you may produce heat in one of the following ways. \n• You raise the temperature in a Burst 3 around you by up to 15°C.\n• You raise the temperature of an object you touch by 30°C.\n• You immediately dry a target wet creature or object.\nThese effects may cause objects to immediately begin to melt.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Burn Guard"] }
		case "burn guard":
			return { "name": "Burn Guard", "augmentBase": "Produce Heat", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You automatically end the aflame condition on yourself.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "firebolt":
			return { "name": "Firebolt", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You launch a mote of fire at a foe.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "PR DC", "range": "3R", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "3h", "damageType": "Burn", "element": "Fire", "specBonus": "", "augments": ["Flame Arrow", "Fireball", "Fireblast", "Ragnarok"] }
		case "flame arrow":
			return { "name": "Flame Arrow", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "The target gains the aflame condition.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Aflame", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "fireball":
			return { "name": "Fireball", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "Blast 1", "targetCode": "", "onHit": "", "damage": "4h", "damageType": "Burn", "element": "Fire", "specBonus": "", "augments": [] }
		case "fireblast":
			return { "name": "Fireblast", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "Blast 2", "targetCode": "", "onHit": "", "damage": "5h", "damageType": "Burn", "element": "Fire", "specBonus": "", "augments": [] }
		case "ragnarok":
			return { "name": "Ragnarok", "augmentBase": "Firebolt", "techniqueGroup": "Fire", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Mana; 1 Chakra", "description": "", "onSuccess": "The target gains the aflame condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "", "target": "Blast 2", "targetCode": "", "onHit": "Condition:Aflame", "damage": "13h", "damageType": "Burn", "element": "Fire", "specBonus": "", "augments": [] }
		case "smoke cloud":
			return { "name": "Smoke Cloud", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Smoke", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "", "description": "You cause smoke to rise from the ground. This smoke is thick enough to provide soft cover.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Smoke branch", "skill": "", "defense": "", "range": "3R", "target": "Blast 1", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Burning Smoke", "Choking Smoke"] }
		case "burning smoke":
			return { "name": "Burning Smoke", "augmentBase": "Smoke Cloud", "techniqueGroup": "Fire", "techniqueSubGroup": "Smoke", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Mana", "description": "The smoke burns as it forms.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Field", "defense": "Presence DC", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "2d", "damageType": "Burn", "element": "Fire", "specBonus": "", "augments": [] }
		case "choking smoke":
			return { "name": "Choking Smoke", "augmentBase": "Smoke Cloud", "techniqueGroup": "Fire", "techniqueSubGroup": "Smoke", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Mana", "description": "The smoke suffocates those within.", "onSuccess": "The target gains the impaired condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "Field", "defense": "Presence DC", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Impaired", "damage": "2d", "damageType": "Burn", "element": "Fire", "specBonus": "", "augments": [] }
		case "fire step":
			return { "name": "Fire Step", "augmentBase": "", "techniqueGroup": "Fire", "techniqueSubGroup": "Soul", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Your speed increases by 1.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Soul Branch; Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Liftoff", "Jet"] }
		case "liftoff":
			return { "name": "Liftoff", "augmentBase": "Fire Step", "techniqueGroup": "Fire", "techniqueSubGroup": "Soul", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Once during your standard move, you may move 2 spaces vertically. This movement does not count towards your total speed for this movement. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "jet":
			return { "name": "Jet", "augmentBase": "Fire Step", "techniqueGroup": "Fire", "techniqueSubGroup": "Soul", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "On your turn you may fly using your standard movement. However, at the end of your turn you immediately fall.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "shadow steps":
			return { "name": "Shadow Steps", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "1 Mana", "description": "As long as you remain in dim or darker light, you become invisible until the end of your next turn. Taking any action other than Stadard Move, Dash, or Hide breaks this invisibility.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Shadow Branch; Spellforce 2", "skill": "", "defense": "", "range": "Self", "target": "", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Shadow Walker"] }
		case "shadow walker":
			return { "name": "Shadow Walker", "augmentBase": "Shadow Steps", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "As part of Shadow Steps, you also impart Shadow Steps on all those adjacent to you.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "Burst 1", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "darkness":
			return { "name": "Darkness", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Quick", "traits": "Focus", "limits": "", "resourceCost": "2 Mana", "description": "You create an area of darkness. This darkness provides soft cover and eliminates any light sources within other than the Sunlight spell's orbs of light.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Shadow Branch; Spellforce 2", "skill": "", "defense": "", "range": "6R", "target": "Blast 2", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Shadow Wall", "Nightfall"] }
		case "shadow wall":
			return { "name": "Shadow Wall", "augmentBase": "Darkness", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "Line 10", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "nightfall":
			return { "name": "Nightfall", "augmentBase": "Darkness", "techniqueGroup": "Earth", "techniqueSubGroup": "Shadow", "techniqueType": "Support", "action": "Quick", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "This darkness destroys the Sunlight spell's orbs of light.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "Blast 3", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sand surge":
			return { "name": "Sand Surge", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You cause sand to launch away from you at a target. You may choose to not deal damage with this attack.", "onSuccess": "You may choose to push the target up to two spaces, directly away from you.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "1T", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "2d", "damageType": "Force", "element": "Earth", "specBonus": "", "augments": ["Sand Spout", "Sand Wave", "Sand Launcher"] }
		case "sand spout":
			return { "name": "Sand Spout", "augmentBase": "Sand Surge", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "The target gains the launched status.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "3R", "target": "One Target", "targetCode": "Single", "onHit": "Status:Launched", "damage": "3d", "damageType": "Force", "element": "Earth", "specBonus": "", "augments": [] }
		case "sand wave":
			return { "name": "Sand Wave", "augmentBase": "Sand Surge", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "1T", "target": "Line 5", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "sand launcher":
			return { "name": "Sand Launcher", "augmentBase": "Sand Surge", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "", "onSuccess": "The target gains the launched status.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "1T", "target": "Line 5", "targetCode": "Single", "onHit": "Status:Launched", "damage": "4d", "damageType": "Force", "element": "Earth", "specBonus": "", "augments": [] }
		case "tremorsense":
			return { "name": "Tremorsense", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You can sense creatures through vibration. When you use the Search technique you gain +1 Advantage on any creature on the same surface as you and within ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "burden":
			return { "name": "Burden", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "1 Mana", "description": "You force earth to cling to the targen, weighing them down. A creature becomes immune to this technique for 5 minutes after it is used on them.", "onSuccess": "The target gains the encumbered condition.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Enchant", "defense": "BP DC", "range": "4R", "target": "One Target", "targetCode": "Single", "onHit": "Condition:Encumbered", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Restrain", "Prostration"] }
		case "restrain":
			return { "name": "Restrain", "augmentBase": "Burden", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "The target gains the immobilzed condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Immobilized", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "prostration":
			return { "name": "Prostration", "augmentBase": "Burden", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "", "onSuccess": "The target gains the immobilzed condition and is knocked prone.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Immobilized; Status:Prone", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "pressure":
			return { "name": "Pressure", "augmentBase": "", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "3 Mana", "description": "You increase the effects of gravity within an area. The area is considered difficult terrain.\n\nAny character that starts their turn in or passes through this area gains the encumbered condition.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Gravity branch; Spellforce 2", "skill": "", "defense": "", "range": "4R", "target": "Blast 1", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Wide Pressure", "Deep Pressure", "Gravity Well"] }
		case "wide pressure":
			return { "name": "Wide Pressure", "augmentBase": "Pressure", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "4R", "target": "Blast 2", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "deep pressure":
			return { "name": "Deep Pressure", "augmentBase": "Pressure", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "5 Mana", "description": "Any character that starts their turn in or passes through this area also gains the immobilized condition.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 7", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "gravity well":
			return { "name": "Gravity Well", "augmentBase": "Pressure", "techniqueGroup": "Earth", "techniqueSubGroup": "Gravity", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Mana", "description": "Any character that starts their turn in or passes through this area also gains the immobilized condition and are pushed 1 space towards the center of the area.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "4R", "target": "Blast 2", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "geyser":
			return { "name": "Geyser", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Mana", "description": "You cause water to blast upward.", "onSuccess": "The target gains the launched status.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "3R", "target": "One Target", "targetCode": "Single", "onHit": "Status:Launched", "damage": "3d", "damageType": "Force", "element": "Water", "specBonus": "", "augments": ["Geyser Line", "Great Geyser Line"] }
		case "geyser line":
			return { "name": "Geyser Line", "augmentBase": "Geyser", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "Line 3", "targetCode": "Single", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "great geyser line":
			return { "name": "Great Geyser Line", "augmentBase": "Geyser", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 5", "skill": "", "defense": "", "range": "", "target": "Line 6", "targetCode": "Single", "onHit": "", "damage": "5d", "damageType": "Force", "element": "Water", "specBonus": "", "augments": [] }
		case "sea swell":
			return { "name": "Sea Swell", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You cause water to push a target. You may choose to not deal damage with this attack.", "onSuccess": "Push the target one space in any direction.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "BP DC", "range": "3R", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "2d", "damageType": "Force", "element": "Water", "specBonus": "", "augments": ["Surf", "Tidal Wave"] }
		case "surf":
			return { "name": "Surf", "augmentBase": "Sea Swell", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "Every target must be pushed in the same direction.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "3R", "target": "Line 3", "targetCode": "Single", "onHit": "", "damage": "3d", "damageType": "Force", "element": "Water", "specBonus": "", "augments": [] }
		case "tidal wave":
			return { "name": "Tidal Wave", "augmentBase": "Sea Swell", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "Instead, push the targets up to three spaces in any direction. Every target must be pushed in the same direction.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "5R", "target": "Blast 1", "targetCode": "Single", "onHit": "", "damage": "4d", "damageType": "Force", "element": "Water", "specBonus": "", "augments": [] }
		case "produce cold":
			return { "name": "Produce Cold", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "Once per round, you may produce cold in one of the following ways. \n• You lower the temperature in a Burst 3 around you by up to 15°C.\n• You lower the temperature of an object you touch by 30°C.\nThese effects may cause objects to immediately begin to freeze.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Chill Guard"] }
		case "chill guard":
			return { "name": "Chill Guard", "augmentBase": "Produce Cold", "techniqueGroup": "Water", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You automatically end the chilled condition on yourself.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "fog cloud":
			return { "name": "Fog Cloud", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Focus", "limits": "", "resourceCost": "1 Mana", "description": "You cause fog to rise from the ground. This fog is thick enough to provide soft cover.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Storm branch", "skill": "", "defense": "", "range": "3T", "target": "Blast 1", "targetCode": "Field", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Sleet", "Freezing Sleet", "Binding Sleet"] }
		case "sleet":
			return { "name": "Sleet", "augmentBase": "Fog Cloud", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "2 Mana", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Field", "defense": "Presence DC", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "2d", "damageType": "Cold", "element": "Water", "specBonus": "", "augments": [] }
		case "freezing sleet":
			return { "name": "Freezing Sleet", "augmentBase": "Fog Cloud", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "3 Mana", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "The target gains the chilled condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "Field", "defense": "Presence DC", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Chilled", "damage": "2d", "damageType": "Cold", "element": "Water", "specBonus": "", "augments": [] }
		case "binding sleet":
			return { "name": "Binding Sleet", "augmentBase": "Fog Cloud", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "4 Mana", "description": "You pelt the area with freezing water before covering it in fog.", "onSuccess": "The target gains the immobilized condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "Field", "defense": "Presence DC", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Immobilized", "damage": "3d", "damageType": "Cold", "element": "Water", "specBonus": "", "augments": [] }
		case "hail":
			return { "name": "Hail", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "Focus [F]", "limits": "", "resourceCost": "2 Mana", "description": "You create a storm of hail. Any character in the storm is attacked by this spell when it is created and then may move 1 space.\n\nAny character that starts their turn in or passes through this storm gains the chilled condition.", "onSuccess": "The target gains the chilled condition.", "trigger": "", "requirement": "", "prerequisite": "Storm Branch; Spellforce 2", "skill": "Field", "defense": "PR DC", "range": "3R", "target": "Blast 1", "targetCode": "Field", "onHit": "Condition:Chilled", "damage": "2d", "damageType": "Cold", "element": "", "specBonus": "", "augments": ["Ice Storm", "Fimbulwinter"] }
		case "ice storm":
			return { "name": "Ice Storm", "augmentBase": "Hail", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 4", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "4d", "damageType": "Cold", "element": "", "specBonus": "", "augments": [] }
		case "fimbulwinter":
			return { "name": "Fimbulwinter", "augmentBase": "Hail", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Support", "action": "Full", "traits": "", "limits": "", "resourceCost": "6 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 7", "skill": "", "defense": "", "range": "4R", "target": "Blast 2", "targetCode": "", "onHit": "", "damage": "6d", "damageType": "Cold", "element": "", "specBonus": "", "augments": [] }
		case "cold snap":
			return { "name": "Cold Snap", "augmentBase": "", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You chill the air causing it to bite at the flesh of a target.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "Assault", "defense": "PR DC", "range": "2T", "target": "One Target", "targetCode": "Single", "onHit": "", "damage": "3h", "damageType": "Cold", "element": "Water", "specBonus": "", "augments": ["Frostbite", "Freezebind", "Cold Burst", "Cold Front", "Diamond Dust"] }
		case "frostbite":
			return { "name": "Frostbite", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "The target gains the chilled condition.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Chilled", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "freezebind":
			return { "name": "Freezebind", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "The target gains the immobilzed condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 2", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "Condition:Immobilized", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "cold burst":
			return { "name": "Cold Burst", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "0", "target": "Burst 1", "targetCode": "", "onHit": "", "damage": "3d", "damageType": "Cold", "element": "Water", "specBonus": "", "augments": [] }
		case "cold front":
			return { "name": "Cold Front", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "", "onSuccess": "The target gains the chilled condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "target": "Blast 1", "targetCode": "", "onHit": "Condition:Chilled", "damage": "6h", "damageType": "Cold", "element": "Water", "specBonus": "", "augments": [] }
		case "diamond dust":
			return { "name": "Diamond Dust", "augmentBase": "Cold Snap", "techniqueGroup": "Water", "techniqueSubGroup": "Storm", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Mana; 1 Chakra", "description": "", "onSuccess": "The target gains the chilled and immobilized condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "0", "target": "Burst 2", "targetCode": "", "onHit": "Condition:Chilled;Condition:Immobilized", "damage": "8d", "damageType": "Cold", "element": "Water", "specBonus": "", "augments": [] }
		case "ether sense":
			return { "name": "Ether Sense", "augmentBase": "", "techniqueGroup": "Metal", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "When you are within 1 space of a source of stable ether you are made aware of what object is causing the ether.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": ["Spirit Sense"] }
		case "spirit sense":
			return { "name": "Spirit Sense", "augmentBase": "Ether Sense", "techniqueGroup": "Metal", "techniqueSubGroup": "Basic", "techniqueType": "Passive", "action": "None", "traits": "", "limits": "", "resourceCost": "", "description": "You can detect spirits residing within characters or objects you touch. When you touch a creature, make an Ethereal skill check. On success, you sense the spirit. ", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }
		case "lightning shaft":
			return { "name": "Lightning Shaft", "augmentBase": "", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "Volatile", "limits": "", "resourceCost": "", "description": "You concentrate lightning in your hands before thrusting it forward.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Lightning Branch", "skill": "Assault", "defense": "PR DC", "range": "1T", "target": "Line 2", "targetCode": "Single", "onHit": "", "damage": "1d", "damageType": "Energy", "element": "Metal", "specBonus": "", "augments": ["Shock", "Lightning Bolt", "Plasma Arc", "Fulgor"] }
		case "shock":
			return { "name": "Shock", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "2 Mana", "description": "", "onSuccess": "The target gains the paralyzed condition.", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "One Target", "targetCode": "", "onHit": "Condition:Paralyzed", "damage": "2d", "damageType": "Energy", "element": "Metal", "specBonus": "", "augments": [] }
		case "lightning bolt":
			return { "name": "Lightning Bolt", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "3 Mana", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 3", "skill": "", "defense": "", "range": "", "target": "Line 6", "targetCode": "", "onHit": "", "damage": "3d", "damageType": "Energy", "element": "Metal", "specBonus": "", "augments": [] }
		case "plasma arc":
			return { "name": "Plasma Arc", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "4 Mana", "description": "When you strike a target you may target another with this spell as long as they are within 2 spaces of the last target. The next target does not have to be within this spell's range. You may chain this lightning up to 5 times.", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "Spellforce 6", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "4d", "damageType": "Energy", "element": "Metal", "specBonus": "", "augments": [] }
		case "fulgor":
			return { "name": "Fulgor", "augmentBase": "Lightning Shaft", "techniqueGroup": "Metal", "techniqueSubGroup": "Lightning", "techniqueType": "Active", "action": "Full", "traits": "", "limits": "", "resourceCost": "7 Mana; 1 Chakra", "description": "", "onSuccess": "The target gains the paralyzed condition.", "trigger": "", "requirement": "", "prerequisite": "Spellforce 9", "skill": "", "defense": "", "range": "", "target": "Line 8", "targetCode": "", "onHit": "Condition:Paralyzed", "damage": "8d", "damageType": "Energy", "element": "Metal", "specBonus": "", "augments": [] }
		default:
			return { "name": "", "augmentBase": "", "techniqueGroup": "", "techniqueSubGroup": "", "techniqueType": "", "action": "", "traits": "", "limits": "", "resourceCost": "", "description": "", "onSuccess": "", "trigger": "", "requirement": "", "prerequisite": "", "skill": "", "defense": "", "range": "", "target": "", "targetCode": "", "onHit": "", "damage": "", "damageType": "", "element": "", "specBonus": "", "augments": [] }

	}
}
