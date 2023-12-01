// ======== Shared Features
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

