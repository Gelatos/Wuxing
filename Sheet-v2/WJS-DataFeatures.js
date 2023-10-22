function GetTechniqueTraitsInfo(name) {
	switch (name.toLowerCase()) {
	case "affinity":
	return {"name":"Affinity","group":"Technique","description":"This technique's element changes to one of your elemental affinities."}
	case "affinity [m]":
	return {"name":"Affinity [M]","group":"Technique","description":"This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."}
	case "ap (x)":
	return {"name":"AP (X)","group":"Technique","description":"This technique adds armor piercing. Ignore up to X Armor on the target."}
	case "armament":
	return {"name":"Armament","group":"Technique","description":"This technique uses the skill, range/threat, and damage statistics of an equipped weapon."}
	case "armament [f]":
	return {"name":"Armament [F]","group":"Technique","description":"This technique uses the skill, range/threat, damage, and all abilities of an equipped weapon."}
	case "brutal":
	return {"name":"Brutal","group":"Technique","description":"When this technique deals damage, roll all damage dice twice and take only the highest results."}
	case "focus":
	return {"name":"Focus","group":"Technique","description":"Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus [F] effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."}
	case "focus [f]":
	return {"name":"Focus [F]","group":"Technique","description":"Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus [F] effect at a time. When you take Trauma, all on going Focus [F] effects immediately end. The caster can end a Focus [F] technique at any time."}
	case "material":
	return {"name":"Material","group":"Technique","description":"This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."}
	case "multiple":
	return {"name":"Multiple","group":"Technique","description":"This technique can be learned multiple times."}
	case "volatile":
	return {"name":"Volatile","group":"Technique","description":"This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."}
	case "vortex":
	return {"name":"Vortex","group":"Technique","description":"This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."}
	case "wall":
	return {"name":"Wall","group":"Technique","description":"This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."}
	default:
	return {"name":"","group":"","description":""}
	
	}
	}
	
	function GetWeaponTraitsInfo(name) {
	switch (name.toLowerCase()) {
	case "arcing":
	return {"name":"Arcing","group":"Weapon","description":"This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."}
	case "shield":
	return {"name":"Shield","group":"Weapon","description":"This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."}
	case "thrown":
	return {"name":"Thrown","group":"Weapon","description":"This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."}
	case "two-handed":
	return {"name":"Two-Handed","group":"Weapon","description":"This weapon is required to be wielded in two hands."}
	case "loud":
	return {"name":"Loud","group":"Weapon","description":"This weapon creates a loud booming noise, audible to those within 300 feet of the source."}
	default:
	return {"name":"","group":"","description":""}
	
	}
	}
	
	function GetAbilityTraitsInfo(name) {
	switch (name.toLowerCase()) {
	case "ap (x)":
	return {"name":"AP (X)","group":"Ability","description":"This weapon is armor piercing. Ignore up to X Armor on the target."}
	case "blast (x)":
	return {"name":"Blast (X)","group":"Ability","description":"Attacks made with this weapon affect characters within a radius of X spaces, drawn from a point within range and line of sight. Cover and line of sight are calculated based on the center of the blast, rather than the attacker’s position."}
	case "cone (x)":
	return {"name":"Cone (X)","group":"Ability","description":"Attacks made with this weapon affect characters within a cone, X spaces long and X spaces wide at its furthest point. The cone begins 1 space wide."}
	case "crushing":
	return {"name":"Crushing","group":"Ability","description":"This weapon can crush through defenses. Actions that target BR DC instead targets Reflex DC."}
	case "explosive (x/y)":
	return {"name":"Explosive (X/Y)","group":"Ability","description":"This weapon can explode on impact. Attacks made with this weapon affect characters within a radius of X spaces, drawn from the impact point, and deals X extra damage to all characters in the area."}
	case "finesse":
	return {"name":"Finesse","group":"Ability","description":"This weapon is easy to maneuver allowing you to easily strike at enemies trying to evade you. Actions that target BR DC instead targets Brace DC."}
	case "impact (x)":
	return {"name":"Impact (X)","group":"Ability","description":"This weapon deals X extra damage."}
	case "knockback (x)":
	return {"name":"Knockback (X)","group":"Ability","description":"On a hit, the user may choose to knock their target X spaces in a straight line directly away from the point of origin."}
	case "line (x)":
	return {"name":"Line (X)","group":"Ability","description":"Attacks made with this weapon affect characters in a straight line, X spaces long."}
	default:
	return {"name":"","group":"","description":""}
	
	}
	}
	
	function GetMaterialTraitsInfo(name) {
	switch (name.toLowerCase()) {
	case "flammable":
	return {"name":"Flammable","group":"Material","description":"This material will gain the aflame condition when exposed to fire."}
	case "flexible":
	return {"name":"Flexible","group":"Material","description":"Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."}
	case "frozen":
	return {"name":"Frozen","group":"Material","description":"Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."}
	case "sharp":
	return {"name":"Sharp","group":"Material","description":"Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."}
	case "sturdy":
	return {"name":"Sturdy","group":"Material","description":"Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."}
	case "transparent":
	return {"name":"Transparent","group":"Material","description":"A transparent material can be seen through due to its translucency. "}
	default:
	return {"name":"","group":"","description":""}
	
	}
	}
	
	function GetDefensiveSkillsInfo(name) {
	switch (name.toLowerCase()) {
	case "brace":
	return {"name":"Brace","description":"Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects.","group":"Defensive","subGroup":"Physical Defense","abilityScore":"STR"}
	case "fortitude":
	return {"name":"Fortitude","description":"Fortitude is a character's ability to resist internal damage such as from poisons or sickness.","group":"Defensive","subGroup":"Physical Defense","abilityScore":"CON"}
	case "insight":
	return {"name":"Insight","description":"Insight represents a character's ability to parse conversation and judge mental states. This defense is typically used when information is being hidden in text or speech or to detect when someone is concealing their true thoughts.","group":"Defensive","subGroup":"Sensory Defense","abilityScore":"INT"}
	case "notice":
	return {"name":"Notice","description":"Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's stealth attempts or to hear a distant or quiet noise.","group":"Defensive","subGroup":"Sensory Defense","abilityScore":"PER"}
	case "presence":
	return {"name":"Presence","description":"Presence is a character's ability to force their will over their environment. It is used to disrupt ether as it means to affect a character.","group":"Defensive","subGroup":"Physical Defense","abilityScore":"CHA"}
	case "reflex":
	return {"name":"Reflex","description":"Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball.","group":"Defensive","subGroup":"Physical Defense","abilityScore":"QCK"}
	case "resolve":
	return {"name":"Resolve","description":"Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in.","group":"Defensive","subGroup":"Sensory Defense","abilityScore":"WIL"}
	default:
	return {"name":"","description":"","group":"","subGroup":"","abilityScore":""}
	
	}
	}
	
	function GetDefensiveSkillsList(isFields) {
	if (isFields) {
	return ["Brace", "Fortitude", "Insight", "Notice", "Presence", "Reflex", "Resolve"];
	}
	else {
	return ["brace", "fortitude", "insight", "notice", "presence", "reflex", "resolve"];
	}
	}
	
	function GetCombatSkillsInfo(name) {
	switch (name.toLowerCase()) {
	case "archery":
	return {"name":"Archery","description":"The skill of using borws. Bows have decent range and allow one to add their strength to their damage. They also tend to have more flexible ammunitions.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "brawling":
	return {"name":"Brawling","description":"This is the skill to use one's own body to fight. The combat style has a focus on quick actions, allowing more maneuverability in their attacks in exchange for less damage.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "light blade":
	return {"name":"Light Blade","description":"These weapons require a dextrous hand as they use precision to strike at a foe. Weapons in this skill tend to have the flexibility of being used in melee or thrown and are exceptionally well balanced for striking with speed.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "hammer":
	return {"name":"Hammer","description":"Blunt weapons that are swung with force to bludgeon their targets. These weapons tend to have qualities to allow them to deal increased damage to objects and can crush through defenses.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "handgun":
	return {"name":"Handgun","description":"Small firearms made to be easily wielded in one hand. These weapons typically have the least range of all dedicated range weapons but feature threat ranges to be used in melee.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "heavy blade":
	return {"name":"Heavy Blade","description":"These weapons are large and bladed, allowing the wielder to swing them with all their might. These weapons are made to be able to allow the user to strike with a powerful blow.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "longarm":
	return {"name":"Longarm","description":"Powerful ranged weapons that fire bullets from two-handed implements. These weapons tend to have the highest range of all range weapons and large damage values in exchange for less action flexibility.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "polearm":
	return {"name":"Polearm","description":"Weapons on a pole of some sort. These weapons will often feature increased threat range, allowing one to strike at more distant foes.","group":"Combat","subGroup":"","abilityScore":"DEX"}
	case "thrown":
	return {"name":"Thrown","description":"Weapons that are able to be thrown, or improvising a thrown weapon. ","group":"Combat","subGroup":"","abilityScore":"DEX"}
	default:
	return {"name":"","description":"","group":"","subGroup":"","abilityScore":""}
	
	}
	}
	
	function GetCombatSkillsList(isFields) {
	if (isFields) {
	return ["Archery", "Brawling", "LightBlade", "Hammer", "Handgun", "HeavyBlade", "Longarm", "Polearm", "Thrown"];
	}
	else {
	return ["archery", "brawling", "light blade", "hammer", "handgun", "heavy blade", "longarm", "polearm", "thrown"];
	}
	}
	
	function GetMagicSkillsInfo(name) {
	switch (name.toLowerCase()) {
	case "assault":
	return {"name":"Assault","description":"These spells quickly form ether into a physical substance. Because the ether is formed quickly, these spells are well suited for launching at targets in a combat situation at the cost of keeping the ether stable for more than a few seconds.","group":"Magic","subGroup":"","abilityScore":"PER"}
	case "conjure":
	return {"name":"Conjure","description":"These spells form ether into a form of energy and stabilzes it so that it can linger in this form. Conjured magic is often unable to last for long and must be consumed quickly else disperse into ether.","group":"Magic","subGroup":"","abilityScore":"PER"}
	case "enchant":
	return {"name":"Enchant","description":"Spells that imbue a target with temporary or permanent change. These spells can typically cause effects in creatures such as emboldening their strength or heal their wounds.","group":"Magic","subGroup":"","abilityScore":"CHA"}
	case "ethereal":
	return {"name":"Ethereal","description":"Ethereal spells are unique in that they don't create any obvious physical manifestation but rather affect ether and the ethereal plane directly.","group":"Magic","subGroup":"","abilityScore":"CHA"}
	case "field":
	return {"name":"Field","description":"These spells affect existing terrain and environments by either modifying it or adding to it. ","group":"Magic","subGroup":"","abilityScore":"INT"}
	case "structure":
	return {"name":"Structure","description":"Spells that transform ether into physical objects and materials and reform it. Some spells in this class can affect physical aspected-materials and reform it as well.","group":"Magic","subGroup":"","abilityScore":"INT"}
	default:
	return {"name":"","description":"","group":"","subGroup":"","abilityScore":""}
	
	}
	}
	
	function GetMagicSkillsList(isFields) {
	if (isFields) {
	return ["Assault", "Conjure", "Enchant", "Ethereal", "Field", "Structure"];
	}
	else {
	return ["assault", "conjure", "enchant", "ethereal", "field", "structure"];
	}
	}
	
	function GetBodySkillsInfo(name) {
	switch (name.toLowerCase()) {
	case "acrobatics":
	return {"name":"Acrobatics","description":"Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. ","group":"Body","subGroup":"","abilityScore":"DEX"}
	case "athletics":
	return {"name":"Athletics","description":"Your Athletics check covers movement through an environment such as when climbing, jumping, or swimming.","group":"Body","subGroup":"","abilityScore":"STR"}
	case "physique":
	return {"name":"Physique","description":"The Physique skill represents a character’s raw strength and endurance. It is the base skill for actions that allow one to shove or grapple and can be used to allow one to lift or carry objects that may fall outside normal rules.","group":"Body","subGroup":"","abilityScore":"STR"}
	case "palming":
	return {"name":"Palming","description":"Palming is sleight-of-hand skill that gives a character the ability to snag, hide, and pass off small objects.","group":"Body","subGroup":"","abilityScore":"QCK"}
	case "stealth":
	return {"name":"Stealth","description":"Make a Stealth check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. ","group":"Body","subGroup":"","abilityScore":"DEX"}
	case "survival":
	return {"name":"Survival","description":"Make a Survival check to follow tracks, hunt wild game, or guide your group through wastelands. ","group":"Body","subGroup":"","abilityScore":"PER"}
	default:
	return {"name":"","description":"","group":"","subGroup":"","abilityScore":""}
	
	}
	}
	
	function GetBodySkillsList(isFields) {
	if (isFields) {
	return ["Acrobatics", "Athletics", "Physique", "Palming", "Stealth", "Survival"];
	}
	else {
	return ["acrobatics", "athletics", "physique", "palming", "stealth", "survival"];
	}
	}
	
	function GetKnowledgeSkillsInfo(name) {
	switch (name.toLowerCase()) {
	case "arcana":
	return {"name":"Arcana","description":"Arcana represents knowledge of the ethereal and manipulation of ether. It can help identify spell effects, well known spirits, and qualities of ether.","group":"Knowledge","subGroup":"Recall Knowledge","abilityScore":"INT"}
	case "culture":
	return {"name":"Culture","description":"Your culture check measures your ability to recall lore about a civilization's practices, personalities, laws, and religions. ","group":"Knowledge","subGroup":"Recall Knowledge","abilityScore":"INT"}
	case "engineering":
	return {"name":"Engineering","description":"This skill represents knowledge of technological subjects. It can be used to recall lore about construction, buildings, fortifications, technology, and tools.","group":"Knowledge","subGroup":"Recall Knowledge","abilityScore":"INT"}
	case "history":
	return {"name":"History","description":"Your history check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.","group":"Knowledge","subGroup":"Recall Knowledge","abilityScore":"INT"}
	case "investigation":
	return {"name":"Investigation","description":"This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. ","group":"Knowledge","subGroup":"","abilityScore":"PER"}
	case "nature":
	return {"name":"Nature","description":"Your nature check measures your ability to recall lore about geography, plants, animals, the weather, and natural cycles.","group":"Knowledge","subGroup":"Recall Knowledge","abilityScore":"INT"}
	default:
	return {"name":"","description":"","group":"","subGroup":"","abilityScore":""}
	
	}
	}
	
	function GetKnowledgeSkillsList(isFields) {
	if (isFields) {
	return ["Arcana", "Culture", "Engineering", "History", "Investigation", "Nature"];
	}
	else {
	return ["arcana", "culture", "engineering", "history", "investigation", "nature"];
	}
	}
	
	function GetSocialSkillsInfo(name) {
	switch (name.toLowerCase()) {
	case "deception":
	return {"name":"Deception","description":"Your Deception check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies.","group":"Social","subGroup":"Social Influence","abilityScore":"CHA"}
	case "etiquette":
	return {"name":"Etiquette","description":"Etiquette represents the level of understanding and awareness of proper social rituals. You can use Etiquette to ease suspicions, so that peo- ple might trust you more than they would an outsider. The skill is not meant to replace role-playing, but it can save you from a social blunder that you make when your character probably wouldn’t have.","group":"Social","subGroup":"","abilityScore":"PER"}
	case "intimidation":
	return {"name":"Intimidation","description":"When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision.","group":"Social","subGroup":"Social Influence","abilityScore":"CHA"}
	case "leadership":
	return {"name":"Leadership","description":"Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable.","group":"Social","subGroup":"","abilityScore":"CHA"}
	case "negotiation":
	return {"name":"Negotiation","description":"Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals.","group":"Social","subGroup":"Social Influence","abilityScore":"CHA"}
	case "performance":
	return {"name":"Performance","description":"Your Performance check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment. ","group":"Social","subGroup":"","abilityScore":"CHA"}
	default:
	return {"name":"","description":"","group":"","subGroup":"","abilityScore":""}
	
	}
	}
	
	function GetSocialSkillsList(isFields) {
	if (isFields) {
	return ["Deception", "Etiquette", "Intimidation", "Leadership", "Negotiation", "Performance"];
	}
	else {
	return ["deception", "etiquette", "intimidation", "leadership", "negotiation", "performance"];
	}
	}
	
	function GetTechnicalSkillsInfo(name) {
	switch (name.toLowerCase()) {
	case "artisan":
	return {"name":"Artisan","description":"This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. ","group":"Technical","subGroup":"Crafting","abilityScore":"DEX"}
	case "cook":
	return {"name":"Cook","description":"Food is important for survival, so making it enjoyable is a craft of great appreciation. This skill requires cook's utensils in order to cook most food at a minimum, while different dishes may require access to a stove, oven, or other large appliances.","group":"Technical","subGroup":"Crafting","abilityScore":"PER"}
	case "herbalism":
	return {"name":"Herbalism","description":"The skill to create medicinal and chemical compounds such as drugs, perfumes, and poisons.","group":"Technical","subGroup":"Crafting","abilityScore":"INT"}
	case "mechanical":
	return {"name":"Mechanical","description":"This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery.","group":"Technical","subGroup":"Crafting","abilityScore":"DEX"}
	case "medicine":
	return {"name":"Medicine","description":"Medicine is used to perform medical procedures such as administering drugs, performing first aid, and surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition.","group":"Technical","subGroup":"","abilityScore":"PER"}
	case "pilot":
	return {"name":"Pilot","description":"When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. ","group":"Technical","subGroup":"","abilityScore":"QCK"}
	default:
	return {"name":"","description":"","group":"","subGroup":"","abilityScore":""}
	
	}
	}
	
	function GetTechnicalSkillsList(isFields) {
	if (isFields) {
	return ["Artisan", "Cook", "Herbalism", "Mechanical", "Medicine", "Pilot"];
	}
	else {
	return ["artisan", "cook", "herbalism", "mechanical", "medicine", "pilot"];
	}
	}
	
	function GetDefensivePhysSkillsList(isFields) {
	if (isFields) {
	return ["Brace", "Fortitude", "Presence", "Reflex"];
	}
	else {
	return ["brace", "fortitude", "presence", "reflex"];
	}
	}
	
	function GetDefensiveSensSkillsList(isFields) {
	if (isFields) {
	return ["Insight", "Notice", "Resolve"];
	}
	else {
	return ["insight", "notice", "resolve"];
	}
	}
	
	