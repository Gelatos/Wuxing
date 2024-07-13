// ======== Shared Features
var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Body", "Precision", "Quickness", "Conviction", "Intuition ", "Reason", "Skill", "Job", "Knowledge", "Language", "Lore", "Style", "Technique", "Defense", "Brace", "Disruption", "Evasion", "Sense", "Insight", "Scrutiny", "Resolve", "Awareness", "Fortitude", "Notice", "Hide", "Reflex", "General", "Character Level", "Character Rank", "Hit Points", "Buffer", "Energy", "Focus", "Chakra", "Initiative", "Speed", "Affinity", "Wood", "Fire", "Earth", "Metal", "Water", "Gear", "Carrying Capacity", "Reflex Penalty", "Speed Penalty", "Combat", "Durability", "Heal Value", "Barrier", "Block", "Armor", "Trauma Limit", "Stress Limit", "Vitality", "Ki", "Armsforce", "Spellforce", "Strikeforce", "Social", "Willpower", "Approval", "Patience", "Tech Slot", "Job Slots", "Item Slots", "Active Slots", "Support Slots", "Character Creator", "Origin", "Origin Basics", "Full Name", "Display Name", "Accurate", "Affinity+", "AP (X)", "Brutal", "Focus+", "Material", "Simple", "Volatile", "Vortex", "Weapon", "Wall", "Arcing", "Shield", "Thrown", "Two-Handed", "Loud", "Impact (X)", "Explosive (X/Y)", "Flammable", "Flexible", "Frozen", "Sharp", "Sturdy", "Transparent", "Downed", "Engaged", "Ethereal", "Grappled", "Hidden", "Initiative Penalty", "Invisible", "Restrained", "Unconscious", "Aflame", "Angered", "Chilled", "Delayed", "Disgusted", "Dying", "Empowered", "Encouraged", "Encumbered", "Frightened", "Hasted", "Immobilized", "Impaired", "Joyful", "Launched", "Paralyzed", "Prone", "Saddened", "Sickened", "Staggered", "Stunned", "Surprised", "Skill:Acrobatics", "Skill:Agility", "Skill:Analyze", "Skill:Build", "Skill:Channel", "Skill:Charm", "Skill:Command", "Skill:Concoct", "Skill:Cook", "Skill:Deception", "Skill:Disguise", "Skill:Empathy", "Skill:Enchant", "Skill:Finesse", "Skill:Flexibility", "Skill:Grappling", "Skill:Heal", "Skill:Intimidation", "Skill:Leadership", "Skill:Maneuver", "Skill:Medicine", "Skill:Might", "Skill:Negotiation", "Skill:Palming", "Skill:Physique", "Skill:Pilot", "Skill:Resonance", "Skill:Search", "Skill:Shoot", "Skill:Skirmish", "Skill:Sneak", "Skill:Survival", "Skill:Throw", "Skill:Tinker", "Skill:Traversal", "Language:Minere", "Language:Junal", "Language:Apollen", "Language:Lib", "Language:Cert", "Language:Byric", "Language:Dustell", "Language:Muralic", "Language:Shira", "Language:Ciel", "Language:Citeq", "Language:Manstan", "Language:Salkan", "Language:Sansic", "Language:Silq", "Language:Kleikan", "Language:Crinere", "Language:Palmic", "Language:Shorespeak", "Language:Verdeni", "Language:Vulca", "Language:Emotion", "Language:Empathy", "Language:Wolfwarg", "Language:Jovean", "Language:Mytikan", "Lore:Academics", "Lore:Health", "Lore:Mana", "Lore:Mathematics", "Lore:Nature", "Lore:School", "Lore:Spirit", "Lore:Warfare", "Lore:Zoology", "Lore:Profession", "Lore:Farming", "Lore:Fishing", "Lore:Hunting", "Lore:Legal", "Lore:Mercantile", "Lore:Mining", "Lore:Craftmanship", "Lore:Alchemy", "Lore:Architecture", "Lore:Brewing", "Lore:Cooking", "Lore:Engineering", "Lore:Glassblowing", "Lore:Leatherworking", "Lore:Sculpting", "Lore:Smithing", "Lore:Weaving", "Lore:Geography", "Lore:Aridsha", "Lore:Ceres", "Lore:Colswei", "Lore:Khem", "Lore:Novus", "Lore:Walthair", "Lore:Wayling", "Lore:Ethereal Plane", "Lore:History", "Lore:Aridsha History", "Lore:Ceres History", "Lore:Colswei History", "Lore:Khem History", "Lore:Novus History", "Lore:Walthair History", "Lore:Wayling History", "Lore:Culture", "Lore:Art", "Lore:Etiquette", "Lore:Fashion", "Lore:Games", "Lore:Music", "Lore:Scribing", "Lore:Theater", "Lore:Religion", "Lore:Church of Kongkwei", "Lore:Guidance", "Lore:Life's Circle", "Lore:Ocean Court", "Lore:Sylvan", "Lore:Zushaon", "Job:Trainee", "Job:Interceptor", "Job:Guardian", "Job:Spellslinger", "Job:Warrior", "Job:Rogue", "Job:Scholar", "Job:Physician", "Role:Generalist", "Role:Defender", "Role:Athlete", "Role:Skirmisher", "Role:Marksman"],
		values = {
			"Attribute": {
				"name": "Attribute", "title": "Attributes", "group": "Type", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and helps affect their derived stats. "],
				"abbreviation": "", "variable": "attribute{0}{1}", "formula": "16", "modifiers": ""
			},
			"Body": {
				"name": "Body", "title": "Body", "group": "Attribute", "descriptions": [""],
				"abbreviation": "BOD", "variable": "bod{0}", "formula": "", "modifiers": ""
			},
			"Precision": {
				"name": "Precision", "title": "Precision", "group": "Attribute", "descriptions": [""],
				"abbreviation": "PRC", "variable": "prc{0}", "formula": "", "modifiers": ""
			},
			"Quickness": {
				"name": "Quickness", "title": "Quickness", "group": "Attribute", "descriptions": [""],
				"abbreviation": "QCK", "variable": "qck{0}", "formula": "", "modifiers": ""
			},
			"Conviction": {
				"name": "Conviction", "title": "Conviction", "group": "Attribute", "descriptions": [""],
				"abbreviation": "CNV", "variable": "cnv{0}", "formula": "", "modifiers": ""
			},
			"Intuition ": {
				"name": "Intuition ", "title": "Intuition ", "group": "Attribute", "descriptions": [""],
				"abbreviation": "INT", "variable": "int{0}", "formula": "", "modifiers": ""
			},
			"Reason": {
				"name": "Reason", "title": "Reason", "group": "Attribute", "descriptions": [""],
				"abbreviation": "RSN", "variable": "rsn{0}", "formula": "", "modifiers": ""
			},
			"Skill": {
				"name": "Skill", "title": "Skill", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "skill{0}{1}", "formula": "8", "modifiers": "_tech"
			},
			"Job": {
				"name": "Job", "title": "Jobs", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "job{0}{1}", "formula": "1", "modifiers": "_tech"
			},
			"Knowledge": {
				"name": "Knowledge", "title": "", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "knowledge{0}{1}", "formula": "10", "modifiers": "_tech"
			},
			"Language": {
				"name": "Language", "title": "Language", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "language{0}{1}", "formula": "", "modifiers": ""
			},
			"Lore": {
				"name": "Lore", "title": "Lore", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "lore{0}{1}", "formula": "", "modifiers": ""
			},
			"Style": {
				"name": "Style", "title": "Style", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "style{0}{1}", "formula": "", "modifiers": ""
			},
			"Technique": {
				"name": "Technique", "title": "Techniques", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "technique{0}{1}", "formula": "6", "modifiers": "_tech;_bonus"
			},
			"Defense": {
				"name": "Defense", "title": "Defense", "group": "Type", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "variable": "defense", "formula": "", "modifiers": ""
			},
			"Brace": {
				"name": "Brace", "title": "Brace", "group": "Defense", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "variable": "brace", "formula": "7;bod", "modifiers": ""
			},
			"Disruption": {
				"name": "Disruption", "title": "Disruption", "group": "Defense", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "variable": "disruption", "formula": "7;prc", "modifiers": ""
			},
			"Evasion": {
				"name": "Evasion", "title": "Evasion", "group": "Defense", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "variable": "evasion", "formula": "qck", "modifiers": ""
			},
			"Sense": {
				"name": "Sense", "title": "Sense", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Insight": {
				"name": "Insight", "title": "Insight", "group": "Sense", "descriptions": ["Insight represents a character's ability to parse conversation and judge mental states. This defense is typically used when information is being hidden in text or speech or to detect when someone is concealing their true thoughts."],
				"abbreviation": "", "variable": "insight", "formula": "7;int", "modifiers": ""
			},
			"Scrutiny": {
				"name": "Scrutiny", "title": "Scrutiny", "group": "Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning."],
				"abbreviation": "", "variable": "scrutiny", "formula": "7;rsn", "modifiers": ""
			},
			"Resolve": {
				"name": "Resolve", "title": "Resolve", "group": "Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "variable": "resolve", "formula": "7;cnv", "modifiers": ""
			},
			"Awareness": {
				"name": "Awareness", "title": "Awareness", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Fortitude": {
				"name": "Fortitude", "title": "Fortitude", "group": "Awareness", "descriptions": [""],
				"abbreviation": "", "variable": "fortitude", "formula": "7;bod", "modifiers": ""
			},
			"Notice": {
				"name": "Notice", "title": "Notice", "group": "Awareness", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to hear a distant or quiet noise."],
				"abbreviation": "", "variable": "notice", "formula": "7;int", "modifiers": ""
			},
			"Hide": {
				"name": "Hide", "title": "Hide", "group": "Awareness", "descriptions": [""],
				"abbreviation": "", "variable": "hide", "formula": "7;prc", "modifiers": ""
			},
			"Reflex": {
				"name": "Reflex", "title": "Reflex", "group": "Awareness", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "variable": "reflex", "formula": "7;qck", "modifiers": ""
			},
			"General": {
				"name": "General", "title": "General", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Character Level": {
				"name": "Character Level", "title": "Character Level", "group": "General", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "variable": "base_level", "formula": "", "modifiers": ""
			},
			"Character Rank": {
				"name": "Character Rank", "title": "Character Rank", "group": "General", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level."],
				"abbreviation": "CR", "variable": "cr", "formula": "", "modifiers": ""
			},
			"Hit Points": {
				"name": "Hit Points", "title": "Hit Points", "group": "General", "descriptions": ["Hit Points (HP) are the number of hits a character can take in a conflict. This is the case no matter the type of encounter as HP changes based on the type of encounter one finds themselves in."],
				"abbreviation": "HP", "variable": "hp", "formula": "", "modifiers": ""
			},
			"Buffer": {
				"name": "Buffer", "title": "Buffer", "group": "General", "descriptions": ["Some effects will grant Buffer. This is bonus HP that only lasts for a limited amount of time. Buffer always decreases before HP does."],
				"abbreviation": "", "variable": "buffer", "formula": "", "modifiers": ""
			},
			"Energy": {
				"name": "Energy", "title": "Energy", "group": "General", "descriptions": ["Energy is a resource used to power techniques. It is a generic term"],
				"abbreviation": "EN", "variable": "energy", "formula": "", "modifiers": ""
			},
			"Focus": {
				"name": "Focus", "title": "Focus", "group": "General", "descriptions": ["Focus determines how much energy a character can generate when attempting to create more energy.", "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "variable": "focus", "formula": "1", "modifiers": ""
			},
			"Chakra": {
				"name": "Chakra", "title": "Chakra", "group": "General", "descriptions": ["A chakra s a source of power within ki generating creatures. This value in statistics represents the number of chakras the character has control over and able to close off to generate a surge of power. "],
				"abbreviation": "", "variable": "chakra", "formula": "Path", "modifiers": ""
			},
			"Initiative": {
				"name": "Initiative", "title": "Initiative", "group": "General", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "variable": "initiative", "formula": "qck", "modifiers": ""
			},
			"Speed": {
				"name": "Speed", "title": "Speed", "group": "General", "descriptions": ["Speed is how far a character is able to move on your turn, measured in spaces, when you make a standard move."],
				"abbreviation": "", "variable": "speed", "formula": "!Ancestry; speed_penalty", "modifiers": ""
			},
			"Affinity": {
				"name": "Affinity", "title": "Affinity", "group": "Type", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity.", "This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "variable": "affinity", "formula": "", "modifiers": ""
			},
			"Wood": {
				"name": "Wood", "title": "Wood", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "wood", "formula": "", "modifiers": ""
			},
			"Fire": {
				"name": "Fire", "title": "Fire", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "fire", "formula": "", "modifiers": ""
			},
			"Earth": {
				"name": "Earth", "title": "Earth", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "earth", "formula": "", "modifiers": ""
			},
			"Metal": {
				"name": "Metal", "title": "Metal", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "metal", "formula": "", "modifiers": ""
			},
			"Water": {
				"name": "Water", "title": "Water", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "water", "formula": "", "modifiers": ""
			},
			"Gear": {
				"name": "Gear", "title": "Gear", "group": "Type", "descriptions": ["These statistics govern what they are able to cast and how well they can cast spells."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "title": "Carrying Capacity", "group": "Gear", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "variable": "carry_capacity", "formula": "40; bodRank", "modifiers": ""
			},
			"Reflex Penalty": {
				"name": "Reflex Penalty", "title": "Reflex Penalty", "group": "Gear", "descriptions": ["Reflex Penalty represents how restricted their movement is, usually from equipped gear. Each point in Reflex Penality reduces the total modifer of your Reflex score."],
				"abbreviation": "", "variable": "reflex_penalty", "formula": "!Gear", "modifiers": ""
			},
			"Speed Penalty": {
				"name": "Speed Penalty", "title": "Speed Penalty", "group": "Gear", "descriptions": ["Speed penalty is a a reduction to speed due to armor restrictiveness."],
				"abbreviation": "", "variable": "speed_penalty", "formula": "!Gear", "modifiers": ""
			},
			"Combat": {
				"name": "Combat", "title": "Combat", "group": "Type", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Durability": {
				"name": "Durability", "title": "Durability", "group": "Combat", "descriptions": ["During combat encounters, your hit points are equal to your durability score. Your character’s durability is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "", "variable": "durability", "formula": "Character Rank * 10", "modifiers": ""
			},
			"Heal Value": {
				"name": "Heal Value", "title": "Heal Value", "group": "Combat", "descriptions": ["This value is a standard amount of HP you recover from healing abilities."],
				"abbreviation": "HV", "variable": "hv", "formula": "Character Rank * 2", "modifiers": ""
			},
			"Barrier": {
				"name": "Barrier", "title": "Barrier", "group": "Combat", "descriptions": ["A character's barrier is a manifestation of their ki as a layer of protection around them. Barrier adds its value in Buffer to the character at the start of each round, as long as they are not Downed or Unconscious."],
				"abbreviation": "", "variable": "barrier", "formula": "prc", "modifiers": ""
			},
			"Block": {
				"name": "Block", "title": "Block", "group": "Combat", "descriptions": ["Various types of gear will grant Block as a bonus. Block adds its value in Buffer to the character at the start of each round."],
				"abbreviation": "", "variable": "block", "formula": "!Gear", "modifiers": ""
			},
			"Armor": {
				"name": "Armor", "title": "Armor", "group": "Combat", "descriptions": ["Armor reduces all incoming damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "variable": "armor", "formula": "!Gear", "modifiers": ""
			},
			"Trauma Limit": {
				"name": "Trauma Limit", "title": "Trauma Limit", "group": "Combat", "descriptions": ["Trauma Limit is the maximum number of trauma a character can take before they start dying. When a character takes trauma, they compare the number of trauma they have to their trauma limit to determine whether they are downed."],
				"abbreviation": "", "variable": "trauma", "formula": "1", "modifiers": ""
			},
			"Stress Limit": {
				"name": "Stress Limit", "title": "Stress Limit", "group": "Combat", "descriptions": ["When taking stress trauma, a number of stress is ignored for the purposes of calculating total trauma. The number of stress that is ignored is based on your stress limit."],
				"abbreviation": "", "variable": "stress", "formula": "3", "modifiers": ""
			},
			"Vitality": {
				"name": "Vitality", "title": "Vitality", "group": "Combat", "descriptions": ["Vitality represents a character's ability to regain their energy. It is often used as a resource to restore HP, but may also be used to fuel techniques."],
				"abbreviation": "", "variable": "vitality", "formula": "2", "modifiers": ""
			},
			"Ki": {
				"name": "Ki", "title": "Ki", "group": "Combat", "descriptions": ["During combat encounters, your energy is generated from Ki. Some techniques require that you are specifically generating ki and therefore are meant to be utilized during combat. While channelling ki, energy will increase by 1 at the beginning of each round, up to your Ki value."],
				"abbreviation": "", "variable": "ki", "formula": "3", "modifiers": ""
			},
			"Armsforce": {
				"name": "Armsforce", "title": "Armsforce", "group": "Combat", "descriptions": ["This is a bonus on damage for many weapons. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Spellforce": {
				"name": "Spellforce", "title": "Spellforce", "group": "Combat", "descriptions": ["This is a bonus on damage for some techniques. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Strikeforce": {
				"name": "Strikeforce", "title": "Strikeforce", "group": "Combat", "descriptions": ["This is a bonus on damage for some techniques. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Social": {
				"name": "Social", "title": "Social", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Willpower": {
				"name": "Willpower", "title": "Willpower", "group": "Social", "descriptions": ["Willpower represents a character's resilience towards those that would attempt to control or coerce them. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to influence them. "],
				"abbreviation": "", "variable": "willpower", "formula": "cnv", "modifiers": ""
			},
			"Approval": {
				"name": "Approval", "title": "Approval", "group": "Social", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "variable": "approval", "formula": "cnv", "modifiers": ""
			},
			"Patience": {
				"name": "Patience", "title": "Patience", "group": "Social", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "variable": "patience", "formula": "pb*10;int", "modifiers": ""
			},
			"Tech Slot": {
				"name": "Tech Slot", "title": "Tech Slot", "group": "Type", "descriptions": ["Characters are able to learn a variety of techniques. While many are permanent and therefore always active, some require a person to prepare before having access to them. These techniques always exist in a tech tree. When a tech tree is equipped to a tech slot of its type, the character has access to these techniques."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Job Slots": {
				"name": "Job Slots", "title": "Job Slots", "group": "Tech Slot", "descriptions": ["Job slot techniques are exclusively gained through classes. These techniques fulfill a variety of roles but often will grant the character powerful reaction techniques that allow them to fulfill their role in conflicts."],
				"abbreviation": "", "variable": "techslot-job", "formula": "1", "modifiers": ""
			},
			"Item Slots": {
				"name": "Item Slots", "title": "Item Slots", "group": "Tech Slot", "descriptions": [""],
				"abbreviation": "", "variable": "techslot-item", "formula": "", "modifiers": ""
			},
			"Active Slots": {
				"name": "Active Slots", "title": "Active Slots", "group": "Tech Slot", "descriptions": ["Active slot techniques are often offensive in nature but more accurately provide action against another target. This can include attacks with weapons to hurling insults."],
				"abbreviation": "", "variable": "techslot-active", "formula": "1", "modifiers": ""
			},
			"Support Slots": {
				"name": "Support Slots", "title": "Support Slots", "group": "Tech Slot", "descriptions": ["Support slot techniques allow one to support themselves or their allies in a variety of ways. This can be directly through healing or enhancement abilities or more indirectly through manipulation of other conditions."],
				"abbreviation": "", "variable": "techslot-support", "formula": "1", "modifiers": ""
			},
			"Character Creator": {
				"name": "Character Creator", "title": "Character Creator", "group": "Definition", "descriptions": ["This is the Character Creator where you can create a new character. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, select Finish to populate your character. Alternatively, you can select Exit to do character creation at another time. This is not recommended.", "You can always return to this page from Options."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Origin": {
				"name": "Origin", "title": "Origin", "group": "Definition", "descriptions": ["This is the Character Origin Page. Here you will set your character's name, their primary element, and ancestry. There are also some prebuild options to allow you to quickly build a character by choosing a Background and Archetype. These are optional choices to help steer your character into specific directions. You are always able to ignore these and just take on character creation from scratch."],
				"abbreviation": "", "variable": "origin{0}{1}", "formula": "", "modifiers": ""
			},
			"Origin Basics": {
				"name": "Origin Basics", "title": "Basics", "group": "Definition", "descriptions": [""],
				"abbreviation": "", "variable": "origin_basics{0}{1}", "formula": "", "modifiers": ""
			},
			"Full Name": {
				"name": "Full Name", "title": "Full Name", "group": "Definition", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "variable": "full_name", "formula": "", "modifiers": ""
			},
			"Display Name": {
				"name": "Display Name", "title": "Display Name", "group": "Definition", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "variable": "display_name", "formula": "", "modifiers": ""
			},
			"Accurate": {
				"name": "Accurate", "title": "Accurate", "group": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Affinity+": {
				"name": "Affinity+", "title": "Affinity+", "group": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"AP (X)": {
				"name": "AP (X)", "title": "AP (X)", "group": "Technique Trait", "descriptions": ["This technique adds armor piercing. Ignore up to X Armor on the target.", "This weapon is armor piercing. Ignore up to X Armor on the target."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Brutal": {
				"name": "Brutal", "title": "Brutal", "group": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Focus+": {
				"name": "Focus+", "title": "Focus+", "group": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Material": {
				"name": "Material", "title": "Material", "group": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Simple": {
				"name": "Simple", "title": "Simple", "group": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Volatile": {
				"name": "Volatile", "title": "Volatile", "group": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Vortex": {
				"name": "Vortex", "title": "Vortex", "group": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Weapon": {
				"name": "Weapon", "title": "Weapon", "group": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Wall": {
				"name": "Wall", "title": "Wall", "group": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Arcing": {
				"name": "Arcing", "title": "Arcing", "group": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Shield": {
				"name": "Shield", "title": "Shield", "group": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Thrown": {
				"name": "Thrown", "title": "Thrown", "group": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Two-Handed": {
				"name": "Two-Handed", "title": "Two-Handed", "group": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Loud": {
				"name": "Loud", "title": "Loud", "group": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Impact (X)": {
				"name": "Impact (X)", "title": "Impact (X)", "group": "Item Trait", "descriptions": ["When this weapon is used as a part of a full action, this weapon deals X extra damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Explosive (X/Y)": {
				"name": "Explosive (X/Y)", "title": "Explosive (X/Y)", "group": "Item Trait", "descriptions": ["When this weapon is used as a part of a full action, this weapon can explode on impact. Attacks made with this weapon affect characters within a radius of X spaces, drawn from the impact point, and deals Y extra damage to all characters in the area."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Flammable": {
				"name": "Flammable", "title": "Flammable", "group": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Flexible": {
				"name": "Flexible", "title": "Flexible", "group": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Frozen": {
				"name": "Frozen", "title": "Frozen", "group": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Sharp": {
				"name": "Sharp", "title": "Sharp", "group": "Material Trait", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Sturdy": {
				"name": "Sturdy", "title": "Sturdy", "group": "Material Trait", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Transparent": {
				"name": "Transparent", "title": "Transparent", "group": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Downed": {
				"name": "Downed", "title": "Downed", "group": "Status", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Engaged": {
				"name": "Engaged", "title": "Engaged", "group": "Status", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Ethereal": {
				"name": "Ethereal", "title": "Ethereal", "group": "Status", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Grappled": {
				"name": "Grappled", "title": "Grappled", "group": "Status", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Hidden": {
				"name": "Hidden", "title": "Hidden", "group": "Status", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Initiative Penalty": {
				"name": "Initiative Penalty", "title": "Initiative Penalty", "group": "Status", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Invisible": {
				"name": "Invisible", "title": "Invisible", "group": "Status", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Restrained": {
				"name": "Restrained", "title": "Restrained", "group": "Status", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Unconscious": {
				"name": "Unconscious", "title": "Unconscious", "group": "Status", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Aflame": {
				"name": "Aflame", "title": "Aflame", "group": "Condition", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Angered": {
				"name": "Angered", "title": "Angered", "group": "Condition", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Chilled": {
				"name": "Chilled", "title": "Chilled", "group": "Condition", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Delayed": {
				"name": "Delayed", "title": "Delayed", "group": "Condition", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Disgusted": {
				"name": "Disgusted", "title": "Disgusted", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Dying": {
				"name": "Dying", "title": "Dying", "group": "Condition", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Empowered": {
				"name": "Empowered", "title": "Empowered", "group": "Condition", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Encouraged": {
				"name": "Encouraged", "title": "Encouraged", "group": "Condition", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Encumbered": {
				"name": "Encumbered", "title": "Encumbered", "group": "Condition", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Frightened": {
				"name": "Frightened", "title": "Frightened", "group": "Condition", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Hasted": {
				"name": "Hasted", "title": "Hasted", "group": "Condition", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Immobilized": {
				"name": "Immobilized", "title": "Immobilized", "group": "Condition", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Impaired": {
				"name": "Impaired", "title": "Impaired", "group": "Condition", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Joyful": {
				"name": "Joyful", "title": "Joyful", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Launched": {
				"name": "Launched", "title": "Launched", "group": "Condition", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Paralyzed": {
				"name": "Paralyzed", "title": "Paralyzed", "group": "Condition", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Prone": {
				"name": "Prone", "title": "Prone", "group": "Condition", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Saddened": {
				"name": "Saddened", "title": "Saddened", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Sickened": {
				"name": "Sickened", "title": "Sickened", "group": "Condition", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Staggered": {
				"name": "Staggered", "title": "Staggered", "group": "Condition", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Stunned": {
				"name": "Stunned", "title": "Stunned", "group": "Condition", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Surprised": {
				"name": "Surprised", "title": "Surprised", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": ""
			},
			"Skill:Acrobatics": {
				"name": "Skill:Acrobatics", "title": "Acrobatics", "group": "Skill", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "acrobatics", "formula": "", "modifiers": ""
			},
			"Skill:Agility": {
				"name": "Skill:Agility", "title": "Agility", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "agility", "formula": "", "modifiers": ""
			},
			"Skill:Analyze": {
				"name": "Skill:Analyze", "title": "Analyze", "group": "Skill", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "variable": "analyze", "formula": "", "modifiers": ""
			},
			"Skill:Build": {
				"name": "Skill:Build", "title": "Build", "group": "Skill", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "variable": "build", "formula": "", "modifiers": ""
			},
			"Skill:Channel": {
				"name": "Skill:Channel", "title": "Channel", "group": "Skill", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "variable": "channel", "formula": "", "modifiers": ""
			},
			"Skill:Charm": {
				"name": "Skill:Charm", "title": "Charm", "group": "Skill", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "variable": "charm", "formula": "", "modifiers": ""
			},
			"Skill:Command": {
				"name": "Skill:Command", "title": "Command", "group": "Skill", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "variable": "command", "formula": "", "modifiers": ""
			},
			"Skill:Concoct": {
				"name": "Skill:Concoct", "title": "Concoct", "group": "Skill", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "variable": "concoct", "formula": "", "modifiers": ""
			},
			"Skill:Cook": {
				"name": "Skill:Cook", "title": "Cook", "group": "Skill", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "variable": "cook", "formula": "", "modifiers": ""
			},
			"Skill:Deception": {
				"name": "Skill:Deception", "title": "Deception", "group": "Skill", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "variable": "deception", "formula": "", "modifiers": ""
			},
			"Skill:Disguise": {
				"name": "Skill:Disguise", "title": "Disguise", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "disguise", "formula": "", "modifiers": ""
			},
			"Skill:Empathy": {
				"name": "Skill:Empathy", "title": "Empathy", "group": "Skill", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "variable": "empathy", "formula": "", "modifiers": ""
			},
			"Skill:Enchant": {
				"name": "Skill:Enchant", "title": "Enchant", "group": "Skill", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "variable": "enchant", "formula": "", "modifiers": ""
			},
			"Skill:Finesse": {
				"name": "Skill:Finesse", "title": "Finesse", "group": "Skill", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "variable": "finesse", "formula": "", "modifiers": ""
			},
			"Skill:Flexibility": {
				"name": "Skill:Flexibility", "title": "Flexibility", "group": "Skill", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "flexibility", "formula": "", "modifiers": ""
			},
			"Skill:Grappling": {
				"name": "Skill:Grappling", "title": "Grappling", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "grappling", "formula": "", "modifiers": ""
			},
			"Skill:Heal": {
				"name": "Skill:Heal", "title": "Heal", "group": "Skill", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "variable": "heal", "formula": "", "modifiers": ""
			},
			"Skill:Intimidation": {
				"name": "Skill:Intimidation", "title": "Intimidation", "group": "Skill", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "variable": "intimidation", "formula": "", "modifiers": ""
			},
			"Skill:Leadership": {
				"name": "Skill:Leadership", "title": "Leadership", "group": "Skill", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "variable": "leadership", "formula": "", "modifiers": ""
			},
			"Skill:Maneuver": {
				"name": "Skill:Maneuver", "title": "Maneuver", "group": "Skill", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."]
				,
				"abbreviation": "", "variable": "maneuver", "formula": "", "modifiers": ""
			},
			"Skill:Medicine": {
				"name": "Skill:Medicine", "title": "Medicine", "group": "Skill", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "variable": "medicine", "formula": "", "modifiers": ""
			},
			"Skill:Might": {
				"name": "Skill:Might", "title": "Might", "group": "Skill", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "variable": "might", "formula": "", "modifiers": ""
			},
			"Skill:Negotiation": {
				"name": "Skill:Negotiation", "title": "Negotiation", "group": "Skill", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "variable": "negotiation", "formula": "", "modifiers": ""
			},
			"Skill:Palming": {
				"name": "Skill:Palming", "title": "Palming", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "palming", "formula": "", "modifiers": ""
			},
			"Skill:Physique": {
				"name": "Skill:Physique", "title": "Physique", "group": "Skill", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "variable": "physique", "formula": "", "modifiers": ""
			},
			"Skill:Pilot": {
				"name": "Skill:Pilot", "title": "Pilot", "group": "Skill", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "variable": "pilot", "formula": "", "modifiers": ""
			},
			"Skill:Resonance": {
				"name": "Skill:Resonance", "title": "Resonance", "group": "Skill", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "variable": "resonance", "formula": "", "modifiers": ""
			},
			"Skill:Search": {
				"name": "Skill:Search", "title": "Search", "group": "Skill", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "variable": "search", "formula": "", "modifiers": ""
			},
			"Skill:Shoot": {
				"name": "Skill:Shoot", "title": "Shoot", "group": "Skill", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "variable": "shoot", "formula": "", "modifiers": ""
			},
			"Skill:Skirmish": {
				"name": "Skill:Skirmish", "title": "Skirmish", "group": "Skill", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "variable": "skirmish", "formula": "", "modifiers": ""
			},
			"Skill:Sneak": {
				"name": "Skill:Sneak", "title": "Sneak", "group": "Skill", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "variable": "sneak", "formula": "", "modifiers": ""
			},
			"Skill:Survival": {
				"name": "Skill:Survival", "title": "Survival", "group": "Skill", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "variable": "survival", "formula": "", "modifiers": ""
			},
			"Skill:Throw": {
				"name": "Skill:Throw", "title": "Throw", "group": "Skill", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "variable": "throw", "formula": "", "modifiers": ""
			},
			"Skill:Tinker": {
				"name": "Skill:Tinker", "title": "Tinker", "group": "Skill", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "variable": "tinker", "formula": "", "modifiers": ""
			},
			"Skill:Traversal": {
				"name": "Skill:Traversal", "title": "Traversal", "group": "Skill", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "variable": "traversal", "formula": "", "modifiers": ""
			},
			"Language:Minere": {
				"name": "Language:Minere", "title": "Minere", "group": "Language", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "variable": "minere", "formula": "", "modifiers": ""
			},
			"Language:Junal": {
				"name": "Language:Junal", "title": "Junal", "group": "Language", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "variable": "junal", "formula": "", "modifiers": ""
			},
			"Language:Apollen": {
				"name": "Language:Apollen", "title": "Apollen", "group": "Language", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "variable": "apollen", "formula": "", "modifiers": ""
			},
			"Language:Lib": {
				"name": "Language:Lib", "title": "Lib", "group": "Language", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "variable": "lib", "formula": "", "modifiers": ""
			},
			"Language:Cert": {
				"name": "Language:Cert", "title": "Cert", "group": "Language", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "variable": "cert", "formula": "", "modifiers": ""
			},
			"Language:Byric": {
				"name": "Language:Byric", "title": "Byric", "group": "Language", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "variable": "byric", "formula": "", "modifiers": ""
			},
			"Language:Dustell": {
				"name": "Language:Dustell", "title": "Dustell", "group": "Language", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "variable": "dustell", "formula": "", "modifiers": ""
			},
			"Language:Muralic": {
				"name": "Language:Muralic", "title": "Muralic", "group": "Language", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "variable": "muralic", "formula": "", "modifiers": ""
			},
			"Language:Shira": {
				"name": "Language:Shira", "title": "Shira", "group": "Language", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "variable": "shira", "formula": "", "modifiers": ""
			},
			"Language:Ciel": {
				"name": "Language:Ciel", "title": "Ciel", "group": "Language", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "variable": "ciel", "formula": "", "modifiers": ""
			},
			"Language:Citeq": {
				"name": "Language:Citeq", "title": "Citeq", "group": "Language", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "variable": "citeq", "formula": "", "modifiers": ""
			},
			"Language:Manstan": {
				"name": "Language:Manstan", "title": "Manstan", "group": "Language", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "manstan", "formula": "", "modifiers": ""
			},
			"Language:Salkan": {
				"name": "Language:Salkan", "title": "Salkan", "group": "Language", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "variable": "salkan", "formula": "", "modifiers": ""
			},
			"Language:Sansic": {
				"name": "Language:Sansic", "title": "Sansic", "group": "Language", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "sansic", "formula": "", "modifiers": ""
			},
			"Language:Silq": {
				"name": "Language:Silq", "title": "Silq", "group": "Language", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "variable": "silq", "formula": "", "modifiers": ""
			},
			"Language:Kleikan": {
				"name": "Language:Kleikan", "title": "Kleikan", "group": "Language", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "variable": "kleikan", "formula": "", "modifiers": ""
			},
			"Language:Crinere": {
				"name": "Language:Crinere", "title": "Crinere", "group": "Language", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "variable": "crinere", "formula": "", "modifiers": ""
			},
			"Language:Palmic": {
				"name": "Language:Palmic", "title": "Palmic", "group": "Language", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "variable": "palmic", "formula": "", "modifiers": ""
			},
			"Language:Shorespeak": {
				"name": "Language:Shorespeak", "title": "Shorespeak", "group": "Language", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "variable": "shorespeak", "formula": "", "modifiers": ""
			},
			"Language:Verdeni": {
				"name": "Language:Verdeni", "title": "Verdeni", "group": "Language", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "variable": "verdeni", "formula": "", "modifiers": ""
			},
			"Language:Vulca": {
				"name": "Language:Vulca", "title": "Vulca", "group": "Language", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "variable": "vulca", "formula": "", "modifiers": ""
			},
			"Language:Emotion": {
				"name": "Language:Emotion", "title": "Emotion", "group": "Language", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "variable": "emotion", "formula": "", "modifiers": ""
			},
			"Language:Empathy": {
				"name": "Language:Empathy", "title": "Empathy", "group": "Language", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "variable": "empathy", "formula": "", "modifiers": ""
			},
			"Language:Wolfwarg": {
				"name": "Language:Wolfwarg", "title": "Wolfwarg", "group": "Language", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "variable": "wolfwarg", "formula": "", "modifiers": ""
			},
			"Language:Jovean": {
				"name": "Language:Jovean", "title": "Jovean", "group": "Language", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "variable": "jovean", "formula": "", "modifiers": ""
			},
			"Language:Mytikan": {
				"name": "Language:Mytikan", "title": "Mytikan", "group": "Language", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "variable": "mytikan", "formula": "", "modifiers": ""
			},
			"Lore:Academics": {
				"name": "Lore:Academics", "title": "Academics", "group": "Lore", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "variable": "academics", "formula": "", "modifiers": ""
			},
			"Lore:Health": {
				"name": "Lore:Health", "title": "Health", "group": "Lore", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "variable": "health", "formula": "", "modifiers": ""
			},
			"Lore:Mana": {
				"name": "Lore:Mana", "title": "Mana", "group": "Lore", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "variable": "mana", "formula": "", "modifiers": ""
			},
			"Lore:Mathematics": {
				"name": "Lore:Mathematics", "title": "Mathematics", "group": "Lore", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "variable": "mathematics", "formula": "", "modifiers": ""
			},
			"Lore:Nature": {
				"name": "Lore:Nature", "title": "Nature", "group": "Lore", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "variable": "nature", "formula": "", "modifiers": ""
			},
			"Lore:School": {
				"name": "Lore:School", "title": "School", "group": "Lore", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "variable": "school", "formula": "", "modifiers": ""
			},
			"Lore:Spirit": {
				"name": "Lore:Spirit", "title": "Spirit", "group": "Lore", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "variable": "spirit", "formula": "", "modifiers": ""
			},
			"Lore:Warfare": {
				"name": "Lore:Warfare", "title": "Warfare", "group": "Lore", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "variable": "warfare", "formula": "", "modifiers": ""
			},
			"Lore:Zoology": {
				"name": "Lore:Zoology", "title": "Zoology", "group": "Lore", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "variable": "zoology", "formula": "", "modifiers": ""
			},
			"Lore:Profession": {
				"name": "Lore:Profession", "title": "Profession", "group": "Lore", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "variable": "profession", "formula": "", "modifiers": ""
			},
			"Lore:Farming": {
				"name": "Lore:Farming", "title": "Farming", "group": "Lore", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "variable": "farming", "formula": "", "modifiers": ""
			},
			"Lore:Fishing": {
				"name": "Lore:Fishing", "title": "Fishing", "group": "Lore", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "variable": "fishing", "formula": "", "modifiers": ""
			},
			"Lore:Hunting": {
				"name": "Lore:Hunting", "title": "Hunting", "group": "Lore", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "variable": "hunting", "formula": "", "modifiers": ""
			},
			"Lore:Legal": {
				"name": "Lore:Legal", "title": "Legal", "group": "Lore", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "variable": "legal", "formula": "", "modifiers": ""
			},
			"Lore:Mercantile": {
				"name": "Lore:Mercantile", "title": "Mercantile", "group": "Lore", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "variable": "mercantile", "formula": "", "modifiers": ""
			},
			"Lore:Mining": {
				"name": "Lore:Mining", "title": "Mining", "group": "Lore", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "variable": "mining", "formula": "", "modifiers": ""
			},
			"Lore:Craftmanship": {
				"name": "Lore:Craftmanship", "title": "Craftmanship", "group": "Lore", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "variable": "craftmanship", "formula": "", "modifiers": ""
			},
			"Lore:Alchemy": {
				"name": "Lore:Alchemy", "title": "Alchemy", "group": "Lore", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "variable": "alchemy", "formula": "", "modifiers": ""
			},
			"Lore:Architecture": {
				"name": "Lore:Architecture", "title": "Architecture", "group": "Lore", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "variable": "architecture", "formula": "", "modifiers": ""
			},
			"Lore:Brewing": {
				"name": "Lore:Brewing", "title": "Brewing", "group": "Lore", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "variable": "brewing", "formula": "", "modifiers": ""
			},
			"Lore:Cooking": {
				"name": "Lore:Cooking", "title": "Cooking", "group": "Lore", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "variable": "cooking", "formula": "", "modifiers": ""
			},
			"Lore:Engineering": {
				"name": "Lore:Engineering", "title": "Engineering", "group": "Lore", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "variable": "engineering", "formula": "", "modifiers": ""
			},
			"Lore:Glassblowing": {
				"name": "Lore:Glassblowing", "title": "Glassblowing", "group": "Lore", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "variable": "glassblowing", "formula": "", "modifiers": ""
			},
			"Lore:Leatherworking": {
				"name": "Lore:Leatherworking", "title": "Leatherworking", "group": "Lore", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "variable": "leatherworking", "formula": "", "modifiers": ""
			},
			"Lore:Sculpting": {
				"name": "Lore:Sculpting", "title": "Sculpting", "group": "Lore", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "variable": "sculpting", "formula": "", "modifiers": ""
			},
			"Lore:Smithing": {
				"name": "Lore:Smithing", "title": "Smithing", "group": "Lore", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "variable": "smithing", "formula": "", "modifiers": ""
			},
			"Lore:Weaving": {
				"name": "Lore:Weaving", "title": "Weaving", "group": "Lore", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "variable": "weaving", "formula": "", "modifiers": ""
			},
			"Lore:Geography": {
				"name": "Lore:Geography", "title": "Geography", "group": "Lore", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "variable": "geography", "formula": "", "modifiers": ""
			},
			"Lore:Aridsha": {
				"name": "Lore:Aridsha", "title": "Aridsha", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "aridsha", "formula": "", "modifiers": ""
			},
			"Lore:Ceres": {
				"name": "Lore:Ceres", "title": "Ceres", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "ceres", "formula": "", "modifiers": ""
			},
			"Lore:Colswei": {
				"name": "Lore:Colswei", "title": "Colswei", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "colswei", "formula": "", "modifiers": ""
			},
			"Lore:Khem": {
				"name": "Lore:Khem", "title": "Khem", "group": "Lore", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "khem", "formula": "", "modifiers": ""
			},
			"Lore:Novus": {
				"name": "Lore:Novus", "title": "Novus", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "novus", "formula": "", "modifiers": ""
			},
			"Lore:Walthair": {
				"name": "Lore:Walthair", "title": "Walthair", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "walthair", "formula": "", "modifiers": ""
			},
			"Lore:Wayling": {
				"name": "Lore:Wayling", "title": "Wayling", "group": "Lore", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "wayling", "formula": "", "modifiers": ""
			},
			"Lore:Ethereal Plane": {
				"name": "Lore:Ethereal Plane", "title": "Ethereal Plane", "group": "Lore", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "variable": "etherealPlane", "formula": "", "modifiers": ""
			},
			"Lore:History": {
				"name": "Lore:History", "title": "History", "group": "Lore", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "variable": "history", "formula": "", "modifiers": ""
			},
			"Lore:Aridsha History": {
				"name": "Lore:Aridsha History", "title": "Aridsha History", "group": "Lore", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "aridshaHistory", "formula": "", "modifiers": ""
			},
			"Lore:Ceres History": {
				"name": "Lore:Ceres History", "title": "Ceres History", "group": "Lore", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "ceresHistory", "formula": "", "modifiers": ""
			},
			"Lore:Colswei History": {
				"name": "Lore:Colswei History", "title": "Colswei History", "group": "Lore", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "colsweiHistory", "formula": "", "modifiers": ""
			},
			"Lore:Khem History": {
				"name": "Lore:Khem History", "title": "Khem History", "group": "Lore", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "khemHistory", "formula": "", "modifiers": ""
			},
			"Lore:Novus History": {
				"name": "Lore:Novus History", "title": "Novus History", "group": "Lore", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "novusHistory", "formula": "", "modifiers": ""
			},
			"Lore:Walthair History": {
				"name": "Lore:Walthair History", "title": "Walthair History", "group": "Lore", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "walthairHistory", "formula": "", "modifiers": ""
			},
			"Lore:Wayling History": {
				"name": "Lore:Wayling History", "title": "Wayling History", "group": "Lore", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "waylingHistory", "formula": "", "modifiers": ""
			},
			"Lore:Culture": {
				"name": "Lore:Culture", "title": "Culture", "group": "Lore", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "variable": "culture", "formula": "", "modifiers": ""
			},
			"Lore:Art": {
				"name": "Lore:Art", "title": "Art", "group": "Lore", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "variable": "art", "formula": "", "modifiers": ""
			},
			"Lore:Etiquette": {
				"name": "Lore:Etiquette", "title": "Etiquette", "group": "Lore", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "variable": "etiquette", "formula": "", "modifiers": ""
			},
			"Lore:Fashion": {
				"name": "Lore:Fashion", "title": "Fashion", "group": "Lore", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "variable": "fashion", "formula": "", "modifiers": ""
			},
			"Lore:Games": {
				"name": "Lore:Games", "title": "Games", "group": "Lore", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "variable": "games", "formula": "", "modifiers": ""
			},
			"Lore:Music": {
				"name": "Lore:Music", "title": "Music", "group": "Lore", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "variable": "music", "formula": "", "modifiers": ""
			},
			"Lore:Scribing": {
				"name": "Lore:Scribing", "title": "Scribing", "group": "Lore", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "variable": "scribing", "formula": "", "modifiers": ""
			},
			"Lore:Theater": {
				"name": "Lore:Theater", "title": "Theater", "group": "Lore", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "variable": "theater", "formula": "", "modifiers": ""
			},
			"Lore:Religion": {
				"name": "Lore:Religion", "title": "Religion", "group": "Lore", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "variable": "religion", "formula": "", "modifiers": ""
			},
			"Lore:Church of Kongkwei": {
				"name": "Lore:Church of Kongkwei", "title": "Church of Kongkwei", "group": "Lore", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "variable": "churchOfKongkwei", "formula": "", "modifiers": ""
			},
			"Lore:Guidance": {
				"name": "Lore:Guidance", "title": "Guidance", "group": "Lore", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "variable": "guidance", "formula": "", "modifiers": ""
			},
			"Lore:Life's Circle": {
				"name": "Lore:Life's Circle", "title": "Life's Circle", "group": "Lore", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "variable": "life'sCircle", "formula": "", "modifiers": ""
			},
			"Lore:Ocean Court": {
				"name": "Lore:Ocean Court", "title": "Ocean Court", "group": "Lore", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "variable": "oceanCourt", "formula": "", "modifiers": ""
			},
			"Lore:Sylvan": {
				"name": "Lore:Sylvan", "title": "Sylvan", "group": "Lore", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "variable": "sylvan", "formula": "", "modifiers": ""
			},
			"Lore:Zushaon": {
				"name": "Lore:Zushaon", "title": "Zushaon", "group": "Lore", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "variable": "zushaon", "formula": "", "modifiers": ""
			},
			"Job:Trainee": {
				"name": "Job:Trainee", "title": "Trainee", "group": "Job", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "variable": "trainee", "formula": "", "modifiers": ""
			},
			"Job:Interceptor": {
				"name": "Job:Interceptor", "title": "Interceptor", "group": "Job", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "variable": "interceptor", "formula": "", "modifiers": ""
			},
			"Job:Guardian": {
				"name": "Job:Guardian", "title": "Guardian", "group": "Job", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "variable": "guardian", "formula": "", "modifiers": ""
			},
			"Job:Spellslinger": {
				"name": "Job:Spellslinger", "title": "Spellslinger", "group": "Job", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "variable": "spellslinger", "formula": "", "modifiers": ""
			},
			"Job:Warrior": {
				"name": "Job:Warrior", "title": "Warrior", "group": "Job", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "variable": "warrior", "formula": "", "modifiers": ""
			},
			"Job:Rogue": {
				"name": "Job:Rogue", "title": "Rogue", "group": "Job", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "variable": "rogue", "formula": "", "modifiers": ""
			},
			"Job:Scholar": {
				"name": "Job:Scholar", "title": "Scholar", "group": "Job", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "variable": "scholar", "formula": "", "modifiers": ""
			},
			"Job:Physician": {
				"name": "Job:Physician", "title": "Physician", "group": "Job", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "variable": "physician", "formula": "", "modifiers": ""
			},
			"Role:Generalist": {
				"name": "Role:Generalist", "title": "Generalist", "group": "Role", "descriptions": ["Very general"],
				"abbreviation": "", "variable": "generalist", "formula": "", "modifiers": ""
			},
			"Role:Defender": {
				"name": "Role:Defender", "title": "Defender", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "defender", "formula": "", "modifiers": ""
			},
			"Role:Athlete": {
				"name": "Role:Athlete", "title": "Athlete", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "athlete", "formula": "", "modifiers": ""
			},
			"Role:Skirmisher": {
				"name": "Role:Skirmisher", "title": "Skirmisher", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "skirmisher", "formula": "", "modifiers": ""
			},
			"Role:Marksman": {
				"name": "Role:Marksman", "title": "Marksman", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "marksman", "formula": "", "modifiers": ""
			}
		},
		sortingGroups = { "group": { "Type": ["Attribute", "Defense", "Sense", "Awareness", "General", "Affinity", "Gear", "Combat", "Social", "Tech Slot"], "Attribute": ["Body", "Precision", "Quickness", "Conviction", "Intuition ", "Reason"], "Stat": ["Skill", "Job", "Knowledge", "Language", "Lore", "Style", "Technique"], "Defense": ["Brace", "Disruption", "Evasion"], "Sense": ["Insight", "Scrutiny", "Resolve"], "Awareness": ["Fortitude", "Notice", "Hide", "Reflex"], "General": ["Character Level", "Character Rank", "Hit Points", "Buffer", "Energy", "Focus", "Chakra", "Initiative", "Speed"], "Affinity": ["Wood", "Fire", "Earth", "Metal", "Water"], "Gear": ["Carrying Capacity", "Reflex Penalty", "Speed Penalty"], "Combat": ["Durability", "Heal Value", "Barrier", "Block", "Armor", "Trauma Limit", "Stress Limit", "Vitality", "Ki", "Armsforce", "Spellforce", "Strikeforce"], "Social": ["Willpower", "Approval", "Patience"], "Tech Slot": ["Job Slots", "Item Slots", "Active Slots", "Support Slots"], "Definition": ["Character Creator", "Origin", "Origin Basics", "Full Name", "Display Name"], "Technique Trait": ["Accurate", "Affinity+", "AP (X)", "Brutal", "Focus+", "Material", "Simple", "Volatile", "Vortex", "Weapon", "Wall"], "Item Trait": ["Arcing", "Shield", "Thrown", "Two-Handed", "Loud", "Impact (X)", "Explosive (X/Y)"], "Material Trait": ["Flammable", "Flexible", "Frozen", "Sharp", "Sturdy", "Transparent"], "Status": ["Downed", "Engaged", "Ethereal", "Grappled", "Hidden", "Initiative Penalty", "Invisible", "Restrained", "Unconscious"], "Condition": ["Aflame", "Angered", "Chilled", "Delayed", "Disgusted", "Dying", "Empowered", "Encouraged", "Encumbered", "Frightened", "Hasted", "Immobilized", "Impaired", "Joyful", "Launched", "Paralyzed", "Prone", "Saddened", "Sickened", "Staggered", "Stunned", "Surprised"], "Skill": ["Skill:Acrobatics", "Skill:Agility", "Skill:Analyze", "Skill:Build", "Skill:Channel", "Skill:Charm", "Skill:Command", "Skill:Concoct", "Skill:Cook", "Skill:Deception", "Skill:Disguise", "Skill:Empathy", "Skill:Enchant", "Skill:Finesse", "Skill:Flexibility", "Skill:Grappling", "Skill:Heal", "Skill:Intimidation", "Skill:Leadership", "Skill:Maneuver", "Skill:Medicine", "Skill:Might", "Skill:Negotiation", "Skill:Palming", "Skill:Physique", "Skill:Pilot", "Skill:Resonance", "Skill:Search", "Skill:Shoot", "Skill:Skirmish", "Skill:Sneak", "Skill:Survival", "Skill:Throw", "Skill:Tinker", "Skill:Traversal"], "Language": ["Language:Minere", "Language:Junal", "Language:Apollen", "Language:Lib", "Language:Cert", "Language:Byric", "Language:Dustell", "Language:Muralic", "Language:Shira", "Language:Ciel", "Language:Citeq", "Language:Manstan", "Language:Salkan", "Language:Sansic", "Language:Silq", "Language:Kleikan", "Language:Crinere", "Language:Palmic", "Language:Shorespeak", "Language:Verdeni", "Language:Vulca", "Language:Emotion", "Language:Empathy", "Language:Wolfwarg", "Language:Jovean", "Language:Mytikan"], "Lore": ["Lore:Academics", "Lore:Health", "Lore:Mana", "Lore:Mathematics", "Lore:Nature", "Lore:School", "Lore:Spirit", "Lore:Warfare", "Lore:Zoology", "Lore:Profession", "Lore:Farming", "Lore:Fishing", "Lore:Hunting", "Lore:Legal", "Lore:Mercantile", "Lore:Mining", "Lore:Craftmanship", "Lore:Alchemy", "Lore:Architecture", "Lore:Brewing", "Lore:Cooking", "Lore:Engineering", "Lore:Glassblowing", "Lore:Leatherworking", "Lore:Sculpting", "Lore:Smithing", "Lore:Weaving", "Lore:Geography", "Lore:Aridsha", "Lore:Ceres", "Lore:Colswei", "Lore:Khem", "Lore:Novus", "Lore:Walthair", "Lore:Wayling", "Lore:Ethereal Plane", "Lore:History", "Lore:Aridsha History", "Lore:Ceres History", "Lore:Colswei History", "Lore:Khem History", "Lore:Novus History", "Lore:Walthair History", "Lore:Wayling History", "Lore:Culture", "Lore:Art", "Lore:Etiquette", "Lore:Fashion", "Lore:Games", "Lore:Music", "Lore:Scribing", "Lore:Theater", "Lore:Religion", "Lore:Church of Kongkwei", "Lore:Guidance", "Lore:Life's Circle", "Lore:Ocean Court", "Lore:Sylvan", "Lore:Zushaon"], "Job": ["Job:Trainee", "Job:Interceptor", "Job:Guardian", "Job:Spellslinger", "Job:Warrior", "Job:Rogue", "Job:Scholar", "Job:Physician"], "Role": ["Role:Generalist", "Role:Defender", "Role:Athlete", "Role:Skirmisher", "Role:Marksman"] } },
		_max = "_max",
		_rank = "_rank",
		_build = _build,
		_filter = "_filter",
		_expand = "_expand",
		_tab = "_tab",
		_page = "_page",
		_read = "_read",
		_learn = "_learn",
		_pts = "_pts",
		_error = "_error",

		get = function (key) {
			return new DefinitionData(values[key]);
		},
		getValues = function (keyArray, delimeter) {
			if (keyArray == undefined || keyArray == "") {
				return [];
			}
			if (typeof keyArray == "string") {
				keyArray = keyArray.split(delimeter);
			}

			let output = [];
			let name = "";
			let lookup = "";
			let dataInfo;

			for (let i = 0; i < keyArray.length; i++) {
				name = "" + keyArray[i].trim();

				lookup = name;
				if (lookup.indexOf("(") >= 0) {
					lookup = lookup.replace(/\([^)]*\)/g, "(X)");
				}

				dataInfo = get(lookup);
				if (dataInfo != undefined) {
					dataInfo.name = name;
					output.push(dataInfo);
				}
			}

			return output;
		},
		has = function (key) {
			return keys.includes(key);
		},
		iterate = function (callback) {
			for (let i = 0; i < keys.length; i++) {
				callback(values[keys[i]]);
			}
		},
		filter = function (filterData) {
			let filteredGroup;
			if (Array.isArray(filterData)) {
				filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
				let nextFilter = [];
				for (let i = 1; i < filterData.length; i++) {
					if (filteredGroup == undefined || filteredGroup.length == 0) {
						return [];
					}
					nextFilter = getSortedGroup(filterData[i].property, filterData[i].value);
					filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
				}
			}
			else {
				filteredGroup = getSortedGroup(filterData.property, filterData.value);
			}
			if (filteredGroup == undefined || filteredGroup.length == 0) {
				return [];
			}
			return getGroupData(filteredGroup);
		},
		getSortedGroup = function (property, propertyValue) {
			return sortingGroups[property][propertyValue];
		},
		getGroupData = function (group) {
			let output = [];
			for (let i = 0; i < group.length; i++) {
				output.push(get(group[i]));
			}
			return output;
		},
		getPropertyValues = function (property) {
			let output = [];
			for (let key in sortingGroups[property]) {
				output.push(key);
			}
			return output;
		},
		getAttribute = function (key, mod, mod1) {
			let data = get(key);
			return data.getAttribute(mod, mod1);
		},
		getVariable = function (key, mod, mod1) {
			let data = get(key);
			return data.getVariable(mod, mod1);
		},
		getAbbreviation = function (key) {
			let data = get(key);
			if (data.abbreviation == "") {
				return data.name;
			}
			else {
				return data.abbreviation;
			}
		},
		getVariables = function (key, array, mod1) {
			let output = [];
			let data = get(key);
			for (let i = 0; i < array.length; i++) {
				output.push(data.getVariable(array[i], mod1));
			}
			return output;
		},
		getGroupVariables = function (filterData) {
			let data = filter(filterData);
			let output = [];
			for (let i = 0; i < data.length; i++) {
				output.push(data[i].getVariable());
			}
			return output;
		}
		;
	return {
		Get: get,
		GetValues: getValues,
		Has: has,
		Iterate: iterate,
		Filter: filter,
		GetSortedGroup: getSortedGroup,
		GetAttribute: getAttribute,
		GetVariable: getVariable,
		GetAbbreviation: getAbbreviation,
		GetVariables: getVariables,
		GetGroupVariables: getGroupVariables,
		_max: _max,
		_rank: _rank,
		_build: _build,
		_filter: _filter,
		_expand: _expand,
		_tab: _tab,
		_page: _page,
		_read: _read,
		_learn: _learn,
		_pts: _pts,
		_error: _error
	};
}());
