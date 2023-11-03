function GetTechniqueTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "affinity":
			return { "name": "Affinity", "group": "Technique", "description": "This technique's element changes to one of your elemental affinities." }
		case "affinity [m]":
			return { "name": "Affinity [M]", "group": "Technique", "description": "This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice." }
		case "ap (x)":
			return { "name": "AP (X)", "group": "Technique", "description": "This technique adds armor piercing. Ignore up to X Armor on the target." }
		case "armament":
			return { "name": "Armament", "group": "Technique", "description": "This technique uses the skill, range/threat, and damage statistics of an equipped weapon." }
		case "armament [f]":
			return { "name": "Armament [F]", "group": "Technique", "description": "This technique uses the skill, range/threat, damage, and all abilities of an equipped weapon." }
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

function GetWeaponTraitsInfo(name) {
	switch (name.toLowerCase()) {
		case "arcing":
			return { "name": "Arcing", "group": "Weapon", "description": "This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover." }
		case "shield":
			return { "name": "Shield", "group": "Weapon", "description": "This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility." }
		case "thrown":
			return { "name": "Thrown", "group": "Weapon", "description": "This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill." }
		case "two-handed":
			return { "name": "Two-Handed", "group": "Weapon", "description": "This weapon is required to be wielded in two hands." }
		case "loud":
			return { "name": "Loud", "group": "Weapon", "description": "This weapon creates a loud booming noise, audible to those within 300 feet of the source." }
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
		return ["brawling", "finesse", "marksmanship", "might", "polearm", "throw"];
	}
	else {
		return ["Brawling", "Finesse", "Marksmanship", "Might", "Polearm", "Throw"];
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
		return ["brace", "insight", "notice", "presence", "reflex", "resolve", "brawling", "finesse", "marksmanship", "might", "polearm", "throw", "assault", "conjure", "enchant", "ethereal", "field", "structure", "acrobatics", "athletics", "fortitude", "legerdemain", "physique", "stealth", "academics", "culture", "investigation", "nature", "tracking", "vocation", "charm", "deception", "intimidation", "leadership", "negotiation", "performance", "artisan", "cook", "heal", "herbalism", "mechanical", "pilot"];
	}
	else {
		return ["Brace", "Insight", "Notice", "Presence", "Reflex", "Resolve", "Brawling", "Finesse", "Marksmanship", "Might", "Polearm", "Throw", "Assault", "Conjure", "Enchant", "Ethereal", "Field", "Structure", "Acrobatics", "Athletics", "Fortitude", "Legerdemain", "Physique", "Stealth", "Academics", "Culture", "Investigation", "Nature", "Tracking", "Vocation", "Charm", "Deception", "Intimidation", "Leadership", "Negotiation", "Performance", "Artisan", "Cook", "Heal", "Herbalism", "Mechanical", "Pilot"];
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
			return ["Brace", "Athletics", "Physique"]
		case "int":
			return ["Insight", "Field", "Structure", "Academics", "Culture", "Nature", "Vocation", "Herbalism"]
		case "per":
			return ["Notice", "Assault", "Conjure", "Investigation", "Tracking", "Deception", "Negotiation", "Cook"]
		case "cha":
			return ["Presence", "Enchant", "Ethereal", "Charm", "Intimidation", "Leadership", "Performance"]
		case "qck":
			return ["Reflex", "Acrobatics", "Legerdemain", "Stealth", "Heal", "Pilot"]
		case "wil":
			return ["Resolve"]
		case "dex":
			return ["Brawling", "Finesse", "Marksmanship", "Might", "Polearm", "Throw", "Artisan", "Mechanical"]
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
			return { "name": "Brawling", "description": "This is the skill to use one's own body to fight. The combat style has a focus on quick actions, allowing more maneuverability in their attacks in exchange for less damage.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "finesse":
			return { "name": "Finesse", "description": "This is the skill to strike at a foe dextrously, using precision to target weaknesses. Weapons in this skill tend to have the flexibility of being used in melee or thrown and are well balanced for striking fast.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "marksmanship":
			return { "name": "Marksmanship", "description": "The skill of using a bow or firearm. These weapons have the most variety in weapon ranges, but typically are ineffective in melee.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "might":
			return { "name": "Might", "description": "These weapons are large, allowing the wielder to swing them with all their strength. They often come with ways to either smash through defenses or simply to break a defense more easily.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "polearm":
			return { "name": "Polearm", "description": "This is the skill for striking in melee with a weapon that is long and has substantial reach. These weapons will often feature increased threat range, allowing one to strike at more distant foes.", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
		case "throw":
			return { "name": "Throw", "description": "When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. ", "group": "Martial", "subGroup": "", "abilityScore": "DEX" }
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
			return { "name": "Interceptor", "category": "Warfare", "description": "The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies.", "growths": { "CON": 2, "DEX": 4, "QCK": 5, "STR": 2, "CHA": 0, "INT": 0, "PER": 3, "WIL": 3, "hp": 0, "vitality": 2, "kiCharge": 0, "spellForce": 0 }, "prerequisite": "Trained in Notice and Polearm", "jobTechnique": "Preemptive Strike", "advancement": [{ "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Preemptive Stagger", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Lunge", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Step Forward", "type": "T" }, { "name": "Gain a Defensive Skill Technique.", "type": "DS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Critical Maim", "type": "T" }] }
		case "marksman":
			return { "name": "Marksman", "category": "Warfare", "description": "", "growths": { "CON": 3, "DEX": 4, "QCK": 3, "STR": 0, "CHA": 2, "INT": 0, "PER": 5, "WIL": 1, "hp": 0, "vitality": 0, "kiCharge": 2, "spellForce": 2 }, "prerequisite": "Trained in Assault and Marksmanship", "jobTechnique": "Spellshot", "advancement": [{ "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Gain a Magic Skill Technique.", "type": "MS" }, { "name": "", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "Distant Spell", "type": "T" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "", "type": "T" }, { "name": "Gain a Magic Skill Technique.", "type": "MS" }, { "name": "Gain a Martial Skill Technique.", "type": "CS" }, { "name": "", "type": "T" }] }
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
		return ["fighter", "interceptor", "marksman", "rogue", "pugilist", "physician", "scholar"];
	}
	else {
		return ["Fighter", "Interceptor", "Marksman", "Rogue", "Pugilist", "Physician", "Scholar"];
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

