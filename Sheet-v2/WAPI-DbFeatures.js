// ======== Shared Features
var WuxingTraits = WuxingTraits || (function () {
	'use strict';

	var
		database = {
			"Affinity": { "name": "Affinity", "group": "Technique", "description": "This technique's element changes to one of your elemental affinities." },
			"Affinity+": { "name": "Affinity+", "group": "Technique", "description": "This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice." },
			"AP (X)": { "name": "AP (X)", "group": "Ability", "description": "This weapon is armor piercing. Ignore up to X Armor on the target." },
			"Armament": { "name": "Armament", "group": "Technique", "description": "This technique uses the skill, threat and range values of the equipped weapon. Add the weapon's damage to the technique's damage. " },
			"Armament+": { "name": "Armament+", "group": "Technique", "description": "This technique uses the skill, threat and range values of the equipped weapon. Add the weapon's damage to the technique's damage and apply all effects of the weapon's abilities. " },
			"Brutal": { "name": "Brutal", "group": "Technique", "description": "When this technique deals damage, roll all damage dice twice and take only the highest results." },
			"Focus": { "name": "Focus", "group": "Technique", "description": "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time." },
			"Focus+": { "name": "Focus+", "group": "Technique", "description": "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time." },
			"Material": { "name": "Material", "group": "Technique", "description": "This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique." },
			"Simple": { "name": "Simple", "group": "Technique", "description": "This technique can be used even when under duress such as while under the Downed state. " },
			"Volatile": { "name": "Volatile", "group": "Technique", "description": "This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally." },
			"Vortex": { "name": "Vortex", "group": "Technique", "description": "This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape." },
			"Wall": { "name": "Wall", "group": "Technique", "description": "This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material." },
			"Arcing": { "name": "Arcing", "group": "Item", "description": "This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover." },
			"Shield": { "name": "Shield", "group": "Item", "description": "This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility." },
			"Thrown": { "name": "Thrown", "group": "Item", "description": "This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill." },
			"Two-Handed": { "name": "Two-Handed", "group": "Item", "description": "This weapon is required to be wielded in two hands." },
			"Loud": { "name": "Loud", "group": "Item", "description": "This weapon creates a loud booming noise, audible to those within 300 feet of the source." },
			"Blast (X)": { "name": "Blast (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters within a radius of X spaces, drawn from a point within range and line of sight. Cover and line of sight are calculated based on the center of the blast, rather than the attacker’s position." },
			"Cone (X)": { "name": "Cone (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters within a cone, X spaces long and X spaces wide at its furthest point. The cone begins 1 space wide." },
			"Crushing": { "name": "Crushing", "group": "Ability", "description": "This weapon can crush through defenses. Actions that target BR DC instead targets Reflex DC." },
			"Explosive (X/Y)": { "name": "Explosive (X/Y)", "group": "Ability", "description": "This weapon can explode on impact. Attacks made with this weapon affect characters within a radius of X spaces, drawn from the impact point, and deals Y extra damage to all characters in the area." },
			"Impact (X)": { "name": "Impact (X)", "group": "Ability", "description": "This weapon deals X extra damage." },
			"Knockback (X)": { "name": "Knockback (X)", "group": "Ability", "description": "On a hit, the user may choose to knock their target X spaces in a straight line directly away from the point of origin." },
			"Line (X)": { "name": "Line (X)", "group": "Ability", "description": "Attacks made with this weapon affect characters in a straight line, X spaces long." },
			"Quick": { "name": "Quick", "group": "Ability", "description": "This weapon is easy to maneuver allowing you to easily strike at enemies trying to evade you. Actions that target BR DC instead targets Brace DC." },
			"Flammable": { "name": "Flammable", "group": "Material", "description": "This material will gain the aflame condition when exposed to fire." },
			"Flexible": { "name": "Flexible", "group": "Material", "description": "Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage." },
			"Frozen": { "name": "Frozen", "group": "Material", "description": "Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour." },
			"Sharp": { "name": "Sharp", "group": "Material", "description": "Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin." },
			"Sturdy": { "name": "Sturdy", "group": "Material", "description": "Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force." },
			"Transparent": { "name": "Transparent", "group": "Material", "description": "A transparent material can be seen through due to its translucency. " },
			"Source": { "name": "Source", "group": "Status", "description": "This condition has effects that relate to the character that applied the condition, called the source. The condition can apply to multiple sources. If any source is Downed or Unconscious this condition automatically ends. " }
		},

		get = function (name) {
			let data = database[name];
			if (data == undefined) {
				return { "name": "", "group": "", "description": "" };
			}
			return data;
		},
		getData = function (data) {
			let output = [];
			if (data != undefined && data != "") {
				let splits = data.split(";");

				let name = "";
				let lookup = "";
				let dataInfo;

				for (let i = 0; i < splits.length; i++) {
					name = "" + splits[i].trim();

					lookup = name;
					if (lookup.indexOf("(") >= 0) {
						lookup = lookup.replace(/\([^)]*\)/g, "(X)");
					}

					dataInfo = get(lookup);
					dataInfo.name = name;
					output.push(dataInfo);
				}
			}
			return output;
		}
		;
	return {
		Get: get,
		GetData: getData
	};
}());


var WuxingStatus = WuxingStatus || (function () {
	'use strict';

	var
		database = {
			"Downed": { "name": "Downed", "group": "State", "traits": "", "description": "A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit." },
			"Engaged": { "name": "Engaged", "group": "State", "traits": "", "description": "If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement." },
			"Ethereal": { "name": "Ethereal", "group": "State", "traits": "", "description": "The character is in the spirit realm. If the character has a physical body it is treated as unconscious. " },
			"Grappled": { "name": "Grappled", "group": "State", "traits": "", "description": "While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action" },
			"Hidden": { "name": "Hidden", "group": "State", "traits": "", "description": "Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search." },
			"Invisible": { "name": "Invisible", "group": "State", "traits": "", "description": "All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover." },
			"Restrained": { "name": "Restrained", "group": "State", "traits": "", "description": "Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. " },
			"Unconscious": { "name": "Unconscious", "group": "State", "traits": "", "description": "An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature." },
			"Aflame": { "name": "Aflame", "group": "Condition", "traits": "", "description": "The character is on fire. At the start of each round the character takes 1d6 burn damage." },
			"Angered": { "name": "Angered", "group": "Condition", "traits": "Source", "description": "The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. " },
			"Chilled": { "name": "Chilled", "group": "Condition", "traits": "", "description": "The character's speed is halved." },
			"Delayed": { "name": "Delayed", "group": "Condition", "traits": "", "description": "The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. " },
			"Disgusted": { "name": "Disgusted", "group": "Condition", "traits": "", "description": "-" },
			"Dying": { "name": "Dying", "group": "Condition", "traits": "", "description": "At the start of each round, a dying creature takes 1 stress." },
			"Empowered": { "name": "Empowered", "group": "Condition", "traits": "", "description": "The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends." },
			"Encouraged": { "name": "Encouraged", "group": "Condition", "traits": "", "description": "An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. " },
			"Encumbered": { "name": "Encumbered", "group": "Condition", "traits": "", "description": "The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally." },
			"Frightened": { "name": "Frightened", "group": "Condition", "traits": "Source", "description": "A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. " },
			"Hasted": { "name": "Hasted", "group": "Condition", "traits": "", "description": "When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. " },
			"Immobilized": { "name": "Immobilized", "group": "Condition", "traits": "", "description": "Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected." },
			"Impaired": { "name": "Impaired", "group": "Condition", "traits": "", "description": "Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks." },
			"Joyful": { "name": "Joyful", "group": "Condition", "traits": "", "description": "-" },
			"Launched": { "name": "Launched", "group": "Condition", "traits": "", "description": "The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round." },
			"Paralyzed": { "name": "Paralyzed", "group": "Condition", "traits": "", "description": "A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn." },
			"Prone": { "name": "Prone", "group": "Condition", "traits": "", "description": "Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement." },
			"Saddened": { "name": "Saddened", "group": "Condition", "traits": "", "description": "-" },
			"Sickened": { "name": "Sickened", "group": "Condition", "traits": "", "description": "Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened." },
			"Staggered": { "name": "Staggered", "group": "Condition", "traits": "", "description": "Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques." },
			"Stunned": { "name": "Stunned", "group": "Condition", "traits": "", "description": "A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws." },
			"Surprised": { "name": "Surprised", "group": "Condition", "traits": "", "description": "-" }
		},

		get = function (name) {
			let data = database[name];
			if (data == undefined) {
				return { "name": "", "group": "", "traits": "", "description": "" };
			}
			return data;
		},
		getData = function (data) {
			let output = [];
			if (data != undefined && data != "") {
				let splits = data.split(";");

				let name = "";
				let lookup = "";
				let dataInfo;

				for (let i = 0; i < splits.length; i++) {
					name = "" + splits[i].trim();

					lookup = name;
					if (lookup.indexOf("(") >= 0) {
						lookup = lookup.replace(/\([^)]*\)/g, "(X)");
					}

					dataInfo = get(lookup);
					dataInfo.name = name;
					output.push(dataInfo);
				}
			}
			return output;
		}
		;
	return {
		Get: get,
		GetData: getData
	};
}());
