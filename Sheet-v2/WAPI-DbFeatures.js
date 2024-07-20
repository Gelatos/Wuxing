var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Body", "Precision", "Quickness", "Conviction", "Intuition ", "Reason", "Skill", "Job", "Knowledge", "Language", "Lore", "Style", "Technique", "Defense", "Brace", "Disruption", "Evasion", "Sense", "Insight", "Scrutiny", "Resolve", "Awareness", "Fortitude", "Notice", "Hide", "Reflex", "General", "Character Level", "Character Rank", "Hit Points", "Buffer", "Energy", "Focus", "Chakra", "Initiative", "Speed", "Affinity", "Wood", "Fire", "Earth", "Metal", "Water", "Gear", "Carrying Capacity", "Reflex Penalty", "Speed Penalty", "Combat", "Durability", "Heal Value", "Barrier", "Block", "Armor", "Trauma Limit", "Stress Limit", "Vitality", "Ki", "Armsforce", "Spellforce", "Strikeforce", "Social", "Willpower", "Approval", "Patience", "Tech Slot", "Job Slots", "Item Slots", "Active Slots", "Support Slots", "Character Creator", "Core", "Advancement", "Training", "Origin", "Origin Basics", "Full Name", "Display Name", "Accurate", "Affinity+", "AP (X)", "Brutal", "Focus+", "Material", "Simple", "Volatile", "Vortex", "Weapon", "Wall", "Arcing", "Shield", "Thrown", "Two-Handed", "Loud", "Impact (X)", "Explosive (X/Y)", "Flammable", "Flexible", "Frozen", "Sharp", "Sturdy", "Transparent", "Downed", "Engaged", "Ethereal", "Grappled", "Hidden", "Initiative Penalty", "Invisible", "Restrained", "Unconscious", "Aflame", "Angered", "Chilled", "Delayed", "Disgusted", "Dying", "Empowered", "Encouraged", "Encumbered", "Frightened", "Hasted", "Immobilized", "Impaired", "Joyful", "Launched", "Paralyzed", "Prone", "Saddened", "Sickened", "Staggered", "Stunned", "Surprised", "Skill:Acrobatics", "Skill:Agility", "Skill:Analyze", "Skill:Build", "Skill:Channel", "Skill:Charm", "Skill:Command", "Skill:Concoct", "Skill:Cook", "Skill:Deception", "Skill:Disguise", "Skill:Empathy", "Skill:Enchant", "Skill:Finesse", "Skill:Flexibility", "Skill:Grappling", "Skill:Heal", "Skill:Intimidation", "Skill:Leadership", "Skill:Maneuver", "Skill:Medicine", "Skill:Might", "Skill:Negotiation", "Skill:Palming", "Skill:Physique", "Skill:Pilot", "Skill:Resonance", "Skill:Search", "Skill:Shoot", "Skill:Skirmish", "Skill:Sneak", "Skill:Survival", "Skill:Throw", "Skill:Tinker", "Skill:Traversal", "Language:Minere", "Language:Junal", "Language:Apollen", "Language:Lib", "Language:Cert", "Language:Byric", "Language:Dustell", "Language:Muralic", "Language:Shira", "Language:Ciel", "Language:Citeq", "Language:Manstan", "Language:Salkan", "Language:Sansic", "Language:Silq", "Language:Kleikan", "Language:Crinere", "Language:Palmic", "Language:Shorespeak", "Language:Verdeni", "Language:Vulca", "Language:Emotion", "Language:Empathy", "Language:Wolfwarg", "Language:Jovean", "Language:Mytikan", "Lore:Academics", "Lore:Health", "Lore:Mana", "Lore:Mathematics", "Lore:Nature", "Lore:School", "Lore:Spirit", "Lore:Warfare", "Lore:Zoology", "Lore:Profession", "Lore:Farming", "Lore:Fishing", "Lore:Hunting", "Lore:Legal", "Lore:Mercantile", "Lore:Mining", "Lore:Craftmanship", "Lore:Alchemy", "Lore:Architecture", "Lore:Brewing", "Lore:Cooking", "Lore:Engineering", "Lore:Glassblowing", "Lore:Leatherworking", "Lore:Sculpting", "Lore:Smithing", "Lore:Weaving", "Lore:Geography", "Lore:Aridsha", "Lore:Ceres", "Lore:Colswei", "Lore:Khem", "Lore:Novus", "Lore:Walthair", "Lore:Wayling", "Lore:Ethereal Plane", "Lore:History", "Lore:Aridsha History", "Lore:Ceres History", "Lore:Colswei History", "Lore:Khem History", "Lore:Novus History", "Lore:Walthair History", "Lore:Wayling History", "Lore:Culture", "Lore:Art", "Lore:Etiquette", "Lore:Fashion", "Lore:Games", "Lore:Music", "Lore:Scribing", "Lore:Theater", "Lore:Religion", "Lore:Church of Kongkwei", "Lore:Guidance", "Lore:Life's Circle", "Lore:Ocean Court", "Lore:Sylvan", "Lore:Zushaon", "Job:Trainee", "Job:Interceptor", "Job:Guardian", "Job:Spellslinger", "Job:Warrior", "Job:Rogue", "Job:Scholar", "Job:Physician", "Role:Generalist", "Role:Defender", "Role:Athlete", "Role:Skirmisher", "Role:Marksman", "Technique:Break Free", "Technique:Dash", "Technique:Escape", "Technique:Grapple", "Technique:Hide", "Technique:Mount", "Technique:Prepare", "Technique:Reposition", "Technique:Seach", "Technique:Aid", "Technique:Encourage", "Technique:Stabilize", "Technique:Skill Check", "Technique:Build Rapport", "Technique:Build Pressure", "Technique:Captivate", "Technique:Demand", "Technique:Grab an Edge", "Technique:Interact", "Technique:Second Wind", "Technique:Second Breath", "Technique:Undaunted", "Technique:Preemptive Strike", "Technique:Preemptive Stagger", "Technique:Critical Maim", "Technique:Spellshot", "Technique:Follow-Up Spellshot", "Technique:Bursting Spellshot", "Technique:Savior", "Technique:Knock Away Savior", "Technique:Savior's Retaliation", "Technique:Spellstrike", "Technique:Power Skirmish", "Technique:Sneak Attack", "Technique:Sneaky Follow-Up", "Technique:Assassinate", "Technique:Emergency Care", "Technique:Nightingale", "Technique:Rhapsody", "Technique:Metamagic", "Technique:Strategize", "Technique:Foresight", "Technique:Saw That Coming", "Technique:As You May Recall", "Technique:Generalist", "Technique:Defender", "Technique:Defender II", "Technique:Defender's Will", "Technique:Defender's Taunt", "Technique:Defender's Recovery", "Technique:Skirmisher", "Technique:Skirmisher II", "Technique:Skirmisher's Step", "Technique:Skirmisher's Strike", "Technique:Marksman", "Technique:Marksman II", "Technique:Marksman's Longshot", "Technique:Marksman's Sight", "Technique:Marksman's Strike", "Technique:Athlete", "Technique:Athlete II", "Technique:Athlete's Sprint", "Technique:Athlete's Reach", "Technique:Bounding Sprint", "Technique:Skulk Away", "Technique:Skulk Then Hide", "Technique:First Aid", "Technique:Cleansing Aid", "Technique:Environmental Awareness", "Technique:Eclectic Knowledge", "Technique:Point of Clarity", "Technique:Pole Vault", "Technique:Quick Draw", "Technique:Extension Strike", "Technique:Step Extension", "Technique:Lasting Extension", "Technique:Far Strike", "Technique:Extension Strike +", "Technique:Defense Piercer ", "Technique:Quick Slash", "Technique:Precision Blade", "Technique:Armor Piercer", "Technique:Quick Slash II", "Technique:Cleave", "Technique:Crushing Blade", "Technique:Great Cleave", "Technique:Cleave +", "Technique:Sudden Cleave", "Technique:Great Cleave II", "Technique:Power Flex", "Technique:Crush Knuckle", "Technique:Impact Knuckle", "Technique:Knuckle Flurry", "Technique:Water Blast", "Technique:Geyser", "Technique:Geyser Line", "Technique:Surf", "Technique:Great Geyser Line", "Technique:Tidal Wave", "Technique:Sand Surge", "Technique:Sand Spout", "Technique:Sand Wave", "Technique:Sand Launcher", "Technique:Sicken", "Technique:Spores", "Technique:Sickening Cloud", "Technique:Virulent Spores", "Technique:Firebolt", "Technique:Flame Arrow", "Technique:Fireball", "Technique:Fireblast", "Technique:Ragnarok", "Technique:Bonfire", "Technique:Wall of Fire", "Technique:Field of Flame", "Technique:Lightning Shaft", "Technique:Shock", "Technique:Lightning Bolt", "Technique:Plasma Arc", "Technique:Fulgor", "Technique:Cold Snap", "Technique:Frostbite", "Technique:Freezebind", "Technique:Cold Burst", "Technique:Cold Front", "Technique:Diamond Dust", "Technique:Wind Bullet", "Technique:Gust", "Technique:Windsweep", "Technique:Gale", "Technique:Darkness", "Technique:Shadow Wall", "Technique:Nightfall", "Technique:Fog Cloud", "Technique:Sleet", "Technique:Freezing Sleet", "Technique:Hail", "Technique:Binding Sleet", "Technique:Ice Storm", "Technique:Fimbulwinter", "Technique:Smoke Cloud", "Technique:Burning Smoke", "Technique:Choking Smoke", "Technique:Acceleration", "Technique:Power Vault", "Technique:Expeditious", "Technique:Quick Climb", "Technique:Quick Swim", "Technique:Poise", "Technique:Cat Fall", "Technique:Kip Up", "Technique:Silent Stride", "Technique:Shove", "Technique:Knockdown", "Technique:Tumble", "Technique:Field Medic", "Technique:Camoflauge", "Technique:Blurred Light", "Technique:Light Refraction", "Technique:Shadow Steps", "Technique:Shadow Walker", "Technique:Wind Step", "Technique:Updraft", "Technique:Clouded Updraft", "Technique:Wind Fall", "Technique:Walk on Air", "Technique:Fire Step", "Technique:Liftoff", "Technique:Jet", "Technique:Cunning Action", "Technique:Demoralize", "Technique:Fascinate", "Technique:Impersonator", "Technique:Ether Sense", "Technique:Spirit Sense", "Technique:Tremorsense", "Technique:Dustcraft", "Technique:Shape Material", "Technique:Quickcraft", "Technique:Improved Shaping", "Technique:Greater Shaping", "Technique:Legendary Shaping", "Technique:Dust Material", "Technique:Dust Area", "Technique:Improved Dusting", "Technique:Greater Dusting", "Technique:Legendary Dusting", "Technique:Form Path", "Technique:Form Pillar", "Technique:Stepping Path", "Technique:Form Wall", "Technique:Scattered Pillars", "Technique:Great Wall", "Technique:Cultivate", "Technique:Entangle", "Technique:Wildwood", "Technique:Distortion", "Technique:Lasting Distortion", "Technique:Heat Field", "Technique:Burn Guard", "Technique:Cold Field", "Technique:Chill Guard", "Technique:Kinesis", "Technique:Distant Kinesis", "Technique:Kinetic Strike", "Technique:Kinetic Throw", "Technique:Heavy Kinesis", "Technique:Burden", "Technique:Pressure", "Technique:Restrain", "Technique:Wide Pressure", "Technique:Prostration", "Technique:Deep Pressure", "Technique:Gravity Well", "Technique:Shield Block", "Technique:Glancing Block", "Technique:Aegis", "Technique:Light", "Technique:Dancing Lights", "Technique:Flash", "Technique:Sunlight", "Technique:Stress Release", "Technique:Stress Release +", "Technique:Stress Release ++", "Technique:Sensory Training", "Technique:Sensory Training +", "Technique:Broad Study", "Technique:Experienced Tracker", "Technique:Multilingual", "Technique:Multilingual +", "Technique:Specialized Lore", "Technique:Specialized Lore +", "Technique:Specialized Lore ++", "Technique:Improved Initiative", "Technique:Knowledge Training", "Technique:Knowledge Training +", "Technique:Knowledge Training ++", "Technique:Social Training", "Technique:Social Training +", "Technique:Social Training ++", "Technique:Refocus", "Technique:Refocus +", "Technique:Sustained Channel", "Technique:Sustained Channel +", "Technique:Ki Control", "Technique:Ki Control +", "Technique:Ki Control ++", "Technique:Surge Value", "Technique:Surge Value +", "Technique:Channel Training", "Technique:Channel Training +", "Technique:Channel Training ++", "Technique:Physical Training", "Technique:Physical Training +", "Technique:Body Training", "Technique:Body Training +", "Technique:Body Training ++", "Technique:Technical Training", "Technique:Technical Training +", "Technique:Technical Training ++", "Technique:Martial Training", "Technique:Martial Training +", "Technique:Martial Training ++", "Technique:HP Up", "Technique:HP Up+", "Technique:HP Up++", "Technique:Vitality Boost", "Technique:Vitality Boost +", "Technique:Vitality Boost ++", "Technique:Undying", "Technique:Undying +", "Technique:Extra Follow-Up Attack", "Technique:Extra Follow-Up Attack +", "Technique:Change Tech Slots", "Technique:Hold Out", "Technique:Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "title": "Attributes", "group": "Type", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and helps affect their derived stats. "],
				"abbreviation": "", "variable": "attribute{0}{1}", "formula": "16", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Body": {
				"name": "Body", "title": "Body", "group": "Attribute", "descriptions": [""],
				"abbreviation": "BOD", "variable": "bod{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Precision": {
				"name": "Precision", "title": "Precision", "group": "Attribute", "descriptions": [""],
				"abbreviation": "PRC", "variable": "prc{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Quickness": {
				"name": "Quickness", "title": "Quickness", "group": "Attribute", "descriptions": [""],
				"abbreviation": "QCK", "variable": "qck{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Conviction": {
				"name": "Conviction", "title": "Conviction", "group": "Attribute", "descriptions": [""],
				"abbreviation": "CNV", "variable": "cnv{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Intuition ": {
				"name": "Intuition ", "title": "Intuition ", "group": "Attribute", "descriptions": [""],
				"abbreviation": "INT", "variable": "int{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Reason": {
				"name": "Reason", "title": "Reason", "group": "Attribute", "descriptions": [""],
				"abbreviation": "RSN", "variable": "rsn{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill": {
				"name": "Skill", "title": "Skill", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "skill{0}{1}", "formula": "8", "modifiers": "_tech", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job": {
				"name": "Job", "title": "Jobs", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "job{0}{1}", "formula": "1", "modifiers": "_tech", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "title": "", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "knowledge{0}{1}", "formula": "10", "modifiers": "_tech", "linkedGroups": 3, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language": {
				"name": "Language", "title": "Language", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "language{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "title": "Lore", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "lore{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "title": "Style", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "style{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique": {
				"name": "Technique", "title": "Techniques", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "technique{0}{1}", "formula": "6", "modifiers": "_tech;_bonus", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "title": "Defense", "group": "Type", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "variable": "defense", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Brace": {
				"name": "Brace", "title": "Brace", "group": "Defense", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "variable": "brace", "formula": "7;bod", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Disruption": {
				"name": "Disruption", "title": "Disruption", "group": "Defense", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "variable": "disruption", "formula": "7;prc", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Evasion": {
				"name": "Evasion", "title": "Evasion", "group": "Defense", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "variable": "evasion", "formula": "qck", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "title": "Sense", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Insight": {
				"name": "Insight", "title": "Insight", "group": "Sense", "descriptions": ["Insight represents a character's ability to parse conversation and judge mental states. This defense is typically used when information is being hidden in text or speech or to detect when someone is concealing their true thoughts."],
				"abbreviation": "", "variable": "insight", "formula": "7;int", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Scrutiny": {
				"name": "Scrutiny", "title": "Scrutiny", "group": "Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning."],
				"abbreviation": "", "variable": "scrutiny", "formula": "7;rsn", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Resolve": {
				"name": "Resolve", "title": "Resolve", "group": "Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "variable": "resolve", "formula": "7;cnv", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Awareness": {
				"name": "Awareness", "title": "Awareness", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fortitude": {
				"name": "Fortitude", "title": "Fortitude", "group": "Awareness", "descriptions": [""],
				"abbreviation": "", "variable": "fortitude", "formula": "7;bod", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Notice": {
				"name": "Notice", "title": "Notice", "group": "Awareness", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to hear a distant or quiet noise."],
				"abbreviation": "", "variable": "notice", "formula": "7;int", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hide": {
				"name": "Hide", "title": "Hide", "group": "Awareness", "descriptions": [""],
				"abbreviation": "", "variable": "hide", "formula": "7;prc", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Reflex": {
				"name": "Reflex", "title": "Reflex", "group": "Awareness", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "variable": "reflex", "formula": "7;qck", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"General": {
				"name": "General", "title": "General", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Level": {
				"name": "Character Level", "title": "Character Level", "group": "General", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "variable": "base_level", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Rank": {
				"name": "Character Rank", "title": "Character Rank", "group": "General", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level."],
				"abbreviation": "CR", "variable": "cr", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hit Points": {
				"name": "Hit Points", "title": "Hit Points", "group": "General", "descriptions": ["Hit Points (HP) are the number of hits a character can take in a conflict. This is the case no matter the type of encounter as HP changes based on the type of encounter one finds themselves in."],
				"abbreviation": "HP", "variable": "hp", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Buffer": {
				"name": "Buffer", "title": "Buffer", "group": "General", "descriptions": ["Some effects will grant Buffer. This is bonus HP that only lasts for a limited amount of time. Buffer always decreases before HP does."],
				"abbreviation": "", "variable": "buffer", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Energy": {
				"name": "Energy", "title": "Energy", "group": "General", "descriptions": ["Energy is a resource used to power techniques. It is a generic term"],
				"abbreviation": "EN", "variable": "energy", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Focus": {
				"name": "Focus", "title": "Focus", "group": "General", "descriptions": ["Focus determines how much energy a character can generate when attempting to create more energy.", "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "variable": "focus", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chakra": {
				"name": "Chakra", "title": "Chakra", "group": "General", "descriptions": ["A chakra s a source of power within ki generating creatures. This value in statistics represents the number of chakras the character has control over and able to close off to generate a surge of power. "],
				"abbreviation": "", "variable": "chakra", "formula": "Path", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "title": "Initiative", "group": "General", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "variable": "initiative", "formula": "qck", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Speed": {
				"name": "Speed", "title": "Speed", "group": "General", "descriptions": ["Speed is how far a character is able to move on your turn, measured in spaces, when you make a standard move."],
				"abbreviation": "", "variable": "speed", "formula": "!Ancestry; speed_penalty", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity": {
				"name": "Affinity", "title": "Affinity", "group": "Type", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity.", "This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "variable": "affinity", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "title": "Wood", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "wood", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "title": "Fire", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "fire", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "title": "Earth", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "earth", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "title": "Metal", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "metal", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "title": "Water", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "water", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Gear": {
				"name": "Gear", "title": "Gear", "group": "Type", "descriptions": ["These statistics govern what they are able to cast and how well they can cast spells."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "title": "Carrying Capacity", "group": "Gear", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "variable": "carry_capacity", "formula": "40; bodRank", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Reflex Penalty": {
				"name": "Reflex Penalty", "title": "Reflex Penalty", "group": "Gear", "descriptions": ["Reflex Penalty represents how restricted their movement is, usually from equipped gear. Each point in Reflex Penality reduces the total modifer of your Reflex score."],
				"abbreviation": "", "variable": "reflex_penalty", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Speed Penalty": {
				"name": "Speed Penalty", "title": "Speed Penalty", "group": "Gear", "descriptions": ["Speed penalty is a a reduction to speed due to armor restrictiveness."],
				"abbreviation": "", "variable": "speed_penalty", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "title": "Combat", "group": "Type", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Durability": {
				"name": "Durability", "title": "Durability", "group": "Combat", "descriptions": ["During combat encounters, your hit points are equal to your durability score. Your character’s durability is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "", "variable": "durability", "formula": "Character Rank * 10", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Heal Value": {
				"name": "Heal Value", "title": "Heal Value", "group": "Combat", "descriptions": ["This value is a standard amount of HP you recover from healing abilities."],
				"abbreviation": "HV", "variable": "hv", "formula": "Character Rank * 2", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Barrier": {
				"name": "Barrier", "title": "Barrier", "group": "Combat", "descriptions": ["A character's barrier is a manifestation of their ki as a layer of protection around them. Barrier adds its value in Buffer to the character at the start of each round, as long as they are not Downed or Unconscious."],
				"abbreviation": "", "variable": "barrier", "formula": "prc", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Block": {
				"name": "Block", "title": "Block", "group": "Combat", "descriptions": ["Various types of gear will grant Block as a bonus. Block adds its value in Buffer to the character at the start of each round."],
				"abbreviation": "", "variable": "block", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Armor": {
				"name": "Armor", "title": "Armor", "group": "Combat", "descriptions": ["Armor reduces all incoming damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "variable": "armor", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trauma Limit": {
				"name": "Trauma Limit", "title": "Trauma Limit", "group": "Combat", "descriptions": ["Trauma Limit is the maximum number of trauma a character can take before they start dying. When a character takes trauma, they compare the number of trauma they have to their trauma limit to determine whether they are downed."],
				"abbreviation": "", "variable": "trauma", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Stress Limit": {
				"name": "Stress Limit", "title": "Stress Limit", "group": "Combat", "descriptions": ["When taking stress trauma, a number of stress is ignored for the purposes of calculating total trauma. The number of stress that is ignored is based on your stress limit."],
				"abbreviation": "", "variable": "stress", "formula": "3", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Vitality": {
				"name": "Vitality", "title": "Vitality", "group": "Combat", "descriptions": ["Vitality represents a character's ability to regain their energy. It is often used as a resource to restore HP, but may also be used to fuel techniques."],
				"abbreviation": "", "variable": "vitality", "formula": "2", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Ki": {
				"name": "Ki", "title": "Ki", "group": "Combat", "descriptions": ["During combat encounters, your energy is generated from Ki. Some techniques require that you are specifically generating ki and therefore are meant to be utilized during combat. While channelling ki, energy will increase by 1 at the beginning of each round, up to your Ki value."],
				"abbreviation": "", "variable": "ki", "formula": "3", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Armsforce": {
				"name": "Armsforce", "title": "Armsforce", "group": "Combat", "descriptions": ["This is a bonus on damage for many weapons. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Spellforce": {
				"name": "Spellforce", "title": "Spellforce", "group": "Combat", "descriptions": ["This is a bonus on damage for some techniques. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Strikeforce": {
				"name": "Strikeforce", "title": "Strikeforce", "group": "Combat", "descriptions": ["This is a bonus on damage for some techniques. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "title": "Social", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Willpower": {
				"name": "Willpower", "title": "Willpower", "group": "Social", "descriptions": ["Willpower represents a character's resilience towards those that would attempt to control or coerce them. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to influence them. "],
				"abbreviation": "", "variable": "willpower", "formula": "cnv", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Approval": {
				"name": "Approval", "title": "Approval", "group": "Social", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "variable": "approval", "formula": "cnv", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Patience": {
				"name": "Patience", "title": "Patience", "group": "Social", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "variable": "patience", "formula": "pb*10;int", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Tech Slot": {
				"name": "Tech Slot", "title": "Tech Slot", "group": "Type", "descriptions": ["Characters are able to learn a variety of techniques. While many are permanent and therefore always active, some require a person to prepare before having access to them. These techniques always exist in a tech tree. When a tech tree is equipped to a tech slot of its type, the character has access to these techniques."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job Slots": {
				"name": "Job Slots", "title": "Job Slots", "group": "Tech Slot", "descriptions": ["Job slot techniques are exclusively gained through classes. These techniques fulfill a variety of roles but often will grant the character powerful reaction techniques that allow them to fulfill their role in conflicts."],
				"abbreviation": "", "variable": "techslot-job", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Item Slots": {
				"name": "Item Slots", "title": "Item Slots", "group": "Tech Slot", "descriptions": [""],
				"abbreviation": "", "variable": "techslot-item", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Active Slots": {
				"name": "Active Slots", "title": "Active Slots", "group": "Tech Slot", "descriptions": ["Active slot techniques are often offensive in nature but more accurately provide action against another target. This can include attacks with weapons to hurling insults."],
				"abbreviation": "", "variable": "techslot-active", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Support Slots": {
				"name": "Support Slots", "title": "Support Slots", "group": "Tech Slot", "descriptions": ["Support slot techniques allow one to support themselves or their allies in a variety of ways. This can be directly through healing or enhancement abilities or more indirectly through manipulation of other conditions."],
				"abbreviation": "", "variable": "techslot-support", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Creator": {
				"name": "Character Creator", "title": "Character Creator", "group": "Page", "descriptions": ["This is the Character Creator where you can create a new character. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, select Finish to populate your character. Alternatively, you can select Exit to do character creation at another time. This is not recommended.", "You can always return to this page from Options."],
				"abbreviation": "", "variable": "pageCharacterCreator", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Core": {
				"name": "Core", "title": "Core", "group": "Page", "descriptions": [""],
				"abbreviation": "", "variable": "pageCore", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Advancement": {
				"name": "Advancement", "title": "Advancement", "group": "Page", "descriptions": [""],
				"abbreviation": "", "variable": "pageAdvancement", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Training": {
				"name": "Training", "title": "Training", "group": "Page", "descriptions": [""],
				"abbreviation": "", "variable": "pageTraining", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Origin": {
				"name": "Origin", "title": "Origin", "group": "Definition", "descriptions": ["This is the Character Origin Page. Here you will set your character's name, their primary element, and ancestry. There are also some prebuild options to allow you to quickly build a character by choosing a Background and Archetype. These are optional choices to help steer your character into specific directions. You are always able to ignore these and just take on character creation from scratch."],
				"abbreviation": "", "variable": "origin{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Origin Basics": {
				"name": "Origin Basics", "title": "Basics", "group": "Definition", "descriptions": [""],
				"abbreviation": "", "variable": "origin_basics{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Full Name": {
				"name": "Full Name", "title": "Full Name", "group": "Definition", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "variable": "full_name", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "title": "Display Name", "group": "Definition", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "variable": "display_name", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Accurate": {
				"name": "Accurate", "title": "Accurate", "group": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity+": {
				"name": "Affinity+", "title": "Affinity+", "group": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"AP (X)": {
				"name": "AP (X)", "title": "AP (X)", "group": "Technique Trait", "descriptions": ["This technique adds armor piercing. Ignore up to X Armor on the target.", "This weapon is armor piercing. Ignore up to X Armor on the target."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Brutal": {
				"name": "Brutal", "title": "Brutal", "group": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Focus+": {
				"name": "Focus+", "title": "Focus+", "group": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Material": {
				"name": "Material", "title": "Material", "group": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Simple": {
				"name": "Simple", "title": "Simple", "group": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Volatile": {
				"name": "Volatile", "title": "Volatile", "group": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Vortex": {
				"name": "Vortex", "title": "Vortex", "group": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Weapon": {
				"name": "Weapon", "title": "Weapon", "group": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wall": {
				"name": "Wall", "title": "Wall", "group": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Arcing": {
				"name": "Arcing", "title": "Arcing", "group": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Shield": {
				"name": "Shield", "title": "Shield", "group": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Thrown": {
				"name": "Thrown", "title": "Thrown", "group": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Two-Handed": {
				"name": "Two-Handed", "title": "Two-Handed", "group": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Loud": {
				"name": "Loud", "title": "Loud", "group": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Impact (X)": {
				"name": "Impact (X)", "title": "Impact (X)", "group": "Item Trait", "descriptions": ["When this weapon is used as a part of a full action, this weapon deals X extra damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Explosive (X/Y)": {
				"name": "Explosive (X/Y)", "title": "Explosive (X/Y)", "group": "Item Trait", "descriptions": ["When this weapon is used as a part of a full action, this weapon can explode on impact. Attacks made with this weapon affect characters within a radius of X spaces, drawn from the impact point, and deals Y extra damage to all characters in the area."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Flammable": {
				"name": "Flammable", "title": "Flammable", "group": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Flexible": {
				"name": "Flexible", "title": "Flexible", "group": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Frozen": {
				"name": "Frozen", "title": "Frozen", "group": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sharp": {
				"name": "Sharp", "title": "Sharp", "group": "Material Trait", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sturdy": {
				"name": "Sturdy", "title": "Sturdy", "group": "Material Trait", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Transparent": {
				"name": "Transparent", "title": "Transparent", "group": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Downed": {
				"name": "Downed", "title": "Downed", "group": "Status", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Engaged": {
				"name": "Engaged", "title": "Engaged", "group": "Status", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Ethereal": {
				"name": "Ethereal", "title": "Ethereal", "group": "Status", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Grappled": {
				"name": "Grappled", "title": "Grappled", "group": "Status", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hidden": {
				"name": "Hidden", "title": "Hidden", "group": "Status", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative Penalty": {
				"name": "Initiative Penalty", "title": "Initiative Penalty", "group": "Status", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Invisible": {
				"name": "Invisible", "title": "Invisible", "group": "Status", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Restrained": {
				"name": "Restrained", "title": "Restrained", "group": "Status", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Unconscious": {
				"name": "Unconscious", "title": "Unconscious", "group": "Status", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Aflame": {
				"name": "Aflame", "title": "Aflame", "group": "Condition", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Angered": {
				"name": "Angered", "title": "Angered", "group": "Condition", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chilled": {
				"name": "Chilled", "title": "Chilled", "group": "Condition", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Delayed": {
				"name": "Delayed", "title": "Delayed", "group": "Condition", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Disgusted": {
				"name": "Disgusted", "title": "Disgusted", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Dying": {
				"name": "Dying", "title": "Dying", "group": "Condition", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Empowered": {
				"name": "Empowered", "title": "Empowered", "group": "Condition", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Encouraged": {
				"name": "Encouraged", "title": "Encouraged", "group": "Condition", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Encumbered": {
				"name": "Encumbered", "title": "Encumbered", "group": "Condition", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Frightened": {
				"name": "Frightened", "title": "Frightened", "group": "Condition", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hasted": {
				"name": "Hasted", "title": "Hasted", "group": "Condition", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Immobilized": {
				"name": "Immobilized", "title": "Immobilized", "group": "Condition", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Impaired": {
				"name": "Impaired", "title": "Impaired", "group": "Condition", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Joyful": {
				"name": "Joyful", "title": "Joyful", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Launched": {
				"name": "Launched", "title": "Launched", "group": "Condition", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Paralyzed": {
				"name": "Paralyzed", "title": "Paralyzed", "group": "Condition", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Prone": {
				"name": "Prone", "title": "Prone", "group": "Condition", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Saddened": {
				"name": "Saddened", "title": "Saddened", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sickened": {
				"name": "Sickened", "title": "Sickened", "group": "Condition", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Staggered": {
				"name": "Staggered", "title": "Staggered", "group": "Condition", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Stunned": {
				"name": "Stunned", "title": "Stunned", "group": "Condition", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Surprised": {
				"name": "Surprised", "title": "Surprised", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Acrobatics": {
				"name": "Skill:Acrobatics", "title": "Acrobatics", "group": "Skill", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "acrobatics", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Agility": {
				"name": "Skill:Agility", "title": "Agility", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "agility", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Analyze": {
				"name": "Skill:Analyze", "title": "Analyze", "group": "Skill", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "variable": "analyze", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Build": {
				"name": "Skill:Build", "title": "Build", "group": "Skill", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "variable": "build", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Channel": {
				"name": "Skill:Channel", "title": "Channel", "group": "Skill", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "variable": "channel", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Charm": {
				"name": "Skill:Charm", "title": "Charm", "group": "Skill", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "variable": "charm", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Command": {
				"name": "Skill:Command", "title": "Command", "group": "Skill", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "variable": "command", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Concoct": {
				"name": "Skill:Concoct", "title": "Concoct", "group": "Skill", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "variable": "concoct", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Cook": {
				"name": "Skill:Cook", "title": "Cook", "group": "Skill", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "variable": "cook", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Deception": {
				"name": "Skill:Deception", "title": "Deception", "group": "Skill", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "variable": "deception", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Disguise": {
				"name": "Skill:Disguise", "title": "Disguise", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "disguise", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Empathy": {
				"name": "Skill:Empathy", "title": "Empathy", "group": "Skill", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "variable": "empathy", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Enchant": {
				"name": "Skill:Enchant", "title": "Enchant", "group": "Skill", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "variable": "enchant", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Finesse": {
				"name": "Skill:Finesse", "title": "Finesse", "group": "Skill", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "variable": "finesse", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Flexibility": {
				"name": "Skill:Flexibility", "title": "Flexibility", "group": "Skill", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "flexibility", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Grappling": {
				"name": "Skill:Grappling", "title": "Grappling", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "grappling", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Heal": {
				"name": "Skill:Heal", "title": "Heal", "group": "Skill", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "variable": "heal", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Intimidation": {
				"name": "Skill:Intimidation", "title": "Intimidation", "group": "Skill", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "variable": "intimidation", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Leadership": {
				"name": "Skill:Leadership", "title": "Leadership", "group": "Skill", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "variable": "leadership", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Maneuver": {
				"name": "Skill:Maneuver", "title": "Maneuver", "group": "Skill", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "variable": "maneuver", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Medicine": {
				"name": "Skill:Medicine", "title": "Medicine", "group": "Skill", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "variable": "medicine", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Might": {
				"name": "Skill:Might", "title": "Might", "group": "Skill", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "variable": "might", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Negotiation": {
				"name": "Skill:Negotiation", "title": "Negotiation", "group": "Skill", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "variable": "negotiation", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Palming": {
				"name": "Skill:Palming", "title": "Palming", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "palming", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Physique": {
				"name": "Skill:Physique", "title": "Physique", "group": "Skill", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "variable": "physique", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Pilot": {
				"name": "Skill:Pilot", "title": "Pilot", "group": "Skill", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "variable": "pilot", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Resonance": {
				"name": "Skill:Resonance", "title": "Resonance", "group": "Skill", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "variable": "resonance", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Search": {
				"name": "Skill:Search", "title": "Search", "group": "Skill", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "variable": "search", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Shoot": {
				"name": "Skill:Shoot", "title": "Shoot", "group": "Skill", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "variable": "shoot", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Skirmish": {
				"name": "Skill:Skirmish", "title": "Skirmish", "group": "Skill", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "variable": "skirmish", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Sneak": {
				"name": "Skill:Sneak", "title": "Sneak", "group": "Skill", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "variable": "sneak", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Survival": {
				"name": "Skill:Survival", "title": "Survival", "group": "Skill", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "variable": "survival", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Throw": {
				"name": "Skill:Throw", "title": "Throw", "group": "Skill", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "variable": "throw", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Tinker": {
				"name": "Skill:Tinker", "title": "Tinker", "group": "Skill", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "variable": "tinker", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill:Traversal": {
				"name": "Skill:Traversal", "title": "Traversal", "group": "Skill", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "variable": "traversal", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Minere": {
				"name": "Language:Minere", "title": "Minere", "group": "Language", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "variable": "minere", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Junal": {
				"name": "Language:Junal", "title": "Junal", "group": "Language", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "variable": "junal", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Apollen": {
				"name": "Language:Apollen", "title": "Apollen", "group": "Language", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "variable": "apollen", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Lib": {
				"name": "Language:Lib", "title": "Lib", "group": "Language", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "variable": "lib", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Cert": {
				"name": "Language:Cert", "title": "Cert", "group": "Language", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "variable": "cert", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Byric": {
				"name": "Language:Byric", "title": "Byric", "group": "Language", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "variable": "byric", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Dustell": {
				"name": "Language:Dustell", "title": "Dustell", "group": "Language", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "variable": "dustell", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Muralic": {
				"name": "Language:Muralic", "title": "Muralic", "group": "Language", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "variable": "muralic", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Shira": {
				"name": "Language:Shira", "title": "Shira", "group": "Language", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "variable": "shira", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Ciel": {
				"name": "Language:Ciel", "title": "Ciel", "group": "Language", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "variable": "ciel", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Citeq": {
				"name": "Language:Citeq", "title": "Citeq", "group": "Language", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "variable": "citeq", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Manstan": {
				"name": "Language:Manstan", "title": "Manstan", "group": "Language", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "manstan", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Salkan": {
				"name": "Language:Salkan", "title": "Salkan", "group": "Language", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "variable": "salkan", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Sansic": {
				"name": "Language:Sansic", "title": "Sansic", "group": "Language", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "sansic", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Silq": {
				"name": "Language:Silq", "title": "Silq", "group": "Language", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "variable": "silq", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Kleikan": {
				"name": "Language:Kleikan", "title": "Kleikan", "group": "Language", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "variable": "kleikan", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Crinere": {
				"name": "Language:Crinere", "title": "Crinere", "group": "Language", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "variable": "crinere", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Palmic": {
				"name": "Language:Palmic", "title": "Palmic", "group": "Language", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "variable": "palmic", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Shorespeak": {
				"name": "Language:Shorespeak", "title": "Shorespeak", "group": "Language", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "variable": "shorespeak", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Verdeni": {
				"name": "Language:Verdeni", "title": "Verdeni", "group": "Language", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "variable": "verdeni", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Vulca": {
				"name": "Language:Vulca", "title": "Vulca", "group": "Language", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "variable": "vulca", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Emotion": {
				"name": "Language:Emotion", "title": "Emotion", "group": "Language", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "variable": "emotion", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Empathy": {
				"name": "Language:Empathy", "title": "Empathy", "group": "Language", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "variable": "empathy", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Wolfwarg": {
				"name": "Language:Wolfwarg", "title": "Wolfwarg", "group": "Language", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "variable": "wolfwarg", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Jovean": {
				"name": "Language:Jovean", "title": "Jovean", "group": "Language", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "variable": "jovean", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language:Mytikan": {
				"name": "Language:Mytikan", "title": "Mytikan", "group": "Language", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "variable": "mytikan", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Academics": {
				"name": "Lore:Academics", "title": "Academics", "group": "Lore", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "variable": "academics", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Health": {
				"name": "Lore:Health", "title": "Health", "group": "Lore", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "variable": "health", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Mana": {
				"name": "Lore:Mana", "title": "Mana", "group": "Lore", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "variable": "mana", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Mathematics": {
				"name": "Lore:Mathematics", "title": "Mathematics", "group": "Lore", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "variable": "mathematics", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Nature": {
				"name": "Lore:Nature", "title": "Nature", "group": "Lore", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "variable": "nature", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:School": {
				"name": "Lore:School", "title": "School", "group": "Lore", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "variable": "school", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Spirit": {
				"name": "Lore:Spirit", "title": "Spirit", "group": "Lore", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "variable": "spirit", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Warfare": {
				"name": "Lore:Warfare", "title": "Warfare", "group": "Lore", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "variable": "warfare", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Zoology": {
				"name": "Lore:Zoology", "title": "Zoology", "group": "Lore", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "variable": "zoology", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Profession": {
				"name": "Lore:Profession", "title": "Profession", "group": "Lore", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "variable": "profession", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Farming": {
				"name": "Lore:Farming", "title": "Farming", "group": "Lore", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "variable": "farming", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Fishing": {
				"name": "Lore:Fishing", "title": "Fishing", "group": "Lore", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "variable": "fishing", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Hunting": {
				"name": "Lore:Hunting", "title": "Hunting", "group": "Lore", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "variable": "hunting", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Legal": {
				"name": "Lore:Legal", "title": "Legal", "group": "Lore", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "variable": "legal", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Mercantile": {
				"name": "Lore:Mercantile", "title": "Mercantile", "group": "Lore", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "variable": "mercantile", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Mining": {
				"name": "Lore:Mining", "title": "Mining", "group": "Lore", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "variable": "mining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Craftmanship": {
				"name": "Lore:Craftmanship", "title": "Craftmanship", "group": "Lore", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "variable": "craftmanship", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Alchemy": {
				"name": "Lore:Alchemy", "title": "Alchemy", "group": "Lore", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "variable": "alchemy", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Architecture": {
				"name": "Lore:Architecture", "title": "Architecture", "group": "Lore", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "variable": "architecture", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Brewing": {
				"name": "Lore:Brewing", "title": "Brewing", "group": "Lore", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "variable": "brewing", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Cooking": {
				"name": "Lore:Cooking", "title": "Cooking", "group": "Lore", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "variable": "cooking", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Engineering": {
				"name": "Lore:Engineering", "title": "Engineering", "group": "Lore", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "variable": "engineering", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Glassblowing": {
				"name": "Lore:Glassblowing", "title": "Glassblowing", "group": "Lore", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "variable": "glassblowing", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Leatherworking": {
				"name": "Lore:Leatherworking", "title": "Leatherworking", "group": "Lore", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "variable": "leatherworking", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Sculpting": {
				"name": "Lore:Sculpting", "title": "Sculpting", "group": "Lore", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "variable": "sculpting", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Smithing": {
				"name": "Lore:Smithing", "title": "Smithing", "group": "Lore", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "variable": "smithing", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Weaving": {
				"name": "Lore:Weaving", "title": "Weaving", "group": "Lore", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "variable": "weaving", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Geography": {
				"name": "Lore:Geography", "title": "Geography", "group": "Lore", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "variable": "geography", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Aridsha": {
				"name": "Lore:Aridsha", "title": "Aridsha", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "aridsha", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Ceres": {
				"name": "Lore:Ceres", "title": "Ceres", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "ceres", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Colswei": {
				"name": "Lore:Colswei", "title": "Colswei", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "colswei", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Khem": {
				"name": "Lore:Khem", "title": "Khem", "group": "Lore", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "khem", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Novus": {
				"name": "Lore:Novus", "title": "Novus", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "novus", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Walthair": {
				"name": "Lore:Walthair", "title": "Walthair", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "walthair", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Wayling": {
				"name": "Lore:Wayling", "title": "Wayling", "group": "Lore", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "wayling", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Ethereal Plane": {
				"name": "Lore:Ethereal Plane", "title": "Ethereal Plane", "group": "Lore", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "variable": "etherealPlane", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:History": {
				"name": "Lore:History", "title": "History", "group": "Lore", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "variable": "history", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Aridsha History": {
				"name": "Lore:Aridsha History", "title": "Aridsha History", "group": "Lore", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "aridshaHistory", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Ceres History": {
				"name": "Lore:Ceres History", "title": "Ceres History", "group": "Lore", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "ceresHistory", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Colswei History": {
				"name": "Lore:Colswei History", "title": "Colswei History", "group": "Lore", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "colsweiHistory", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Khem History": {
				"name": "Lore:Khem History", "title": "Khem History", "group": "Lore", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "khemHistory", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Novus History": {
				"name": "Lore:Novus History", "title": "Novus History", "group": "Lore", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "novusHistory", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Walthair History": {
				"name": "Lore:Walthair History", "title": "Walthair History", "group": "Lore", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "walthairHistory", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Wayling History": {
				"name": "Lore:Wayling History", "title": "Wayling History", "group": "Lore", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "waylingHistory", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Culture": {
				"name": "Lore:Culture", "title": "Culture", "group": "Lore", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "variable": "culture", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Art": {
				"name": "Lore:Art", "title": "Art", "group": "Lore", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "variable": "art", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Etiquette": {
				"name": "Lore:Etiquette", "title": "Etiquette", "group": "Lore", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "variable": "etiquette", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Fashion": {
				"name": "Lore:Fashion", "title": "Fashion", "group": "Lore", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "variable": "fashion", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Games": {
				"name": "Lore:Games", "title": "Games", "group": "Lore", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "variable": "games", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Music": {
				"name": "Lore:Music", "title": "Music", "group": "Lore", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "variable": "music", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Scribing": {
				"name": "Lore:Scribing", "title": "Scribing", "group": "Lore", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "variable": "scribing", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": []
				,
				"formulaCalculations": []
			},
			"Lore:Theater": {
				"name": "Lore:Theater", "title": "Theater", "group": "Lore", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "variable": "theater", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Religion": {
				"name": "Lore:Religion", "title": "Religion", "group": "Lore", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "variable": "religion", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Church of Kongkwei": {
				"name": "Lore:Church of Kongkwei", "title": "Church of Kongkwei", "group": "Lore", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "variable": "churchOfKongkwei", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Guidance": {
				"name": "Lore:Guidance", "title": "Guidance", "group": "Lore", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "variable": "guidance", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Life's Circle": {
				"name": "Lore:Life's Circle", "title": "Life's Circle", "group": "Lore", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "variable": "life'sCircle", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Ocean Court": {
				"name": "Lore:Ocean Court", "title": "Ocean Court", "group": "Lore", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "variable": "oceanCourt", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Sylvan": {
				"name": "Lore:Sylvan", "title": "Sylvan", "group": "Lore", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "variable": "sylvan", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore:Zushaon": {
				"name": "Lore:Zushaon", "title": "Zushaon", "group": "Lore", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "variable": "zushaon", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Trainee": {
				"name": "Job:Trainee", "title": "Trainee", "group": "Job", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "variable": "trainee", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Interceptor": {
				"name": "Job:Interceptor", "title": "Interceptor", "group": "Job", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "variable": "interceptor", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Guardian": {
				"name": "Job:Guardian", "title": "Guardian", "group": "Job", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "variable": "guardian", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Spellslinger": {
				"name": "Job:Spellslinger", "title": "Spellslinger", "group": "Job", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "variable": "spellslinger", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Warrior": {
				"name": "Job:Warrior", "title": "Warrior", "group": "Job", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "variable": "warrior", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Rogue": {
				"name": "Job:Rogue", "title": "Rogue", "group": "Job", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "variable": "rogue", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Scholar": {
				"name": "Job:Scholar", "title": "Scholar", "group": "Job", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "variable": "scholar", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job:Physician": {
				"name": "Job:Physician", "title": "Physician", "group": "Job", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "variable": "physician", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role:Generalist": {
				"name": "Role:Generalist", "title": "Generalist", "group": "Role", "descriptions": ["Very general"],
				"abbreviation": "", "variable": "generalist", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role:Defender": {
				"name": "Role:Defender", "title": "Defender", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "defender", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role:Athlete": {
				"name": "Role:Athlete", "title": "Athlete", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "athlete", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role:Skirmisher": {
				"name": "Role:Skirmisher", "title": "Skirmisher", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "skirmisher", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role:Marksman": {
				"name": "Role:Marksman", "title": "Marksman", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "marksman", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Break Free": {
				"name": "Technique:Break Free", "title": "Break Free", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "breakFree", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Dash": {
				"name": "Technique:Dash", "title": "Dash", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "dash", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Escape": {
				"name": "Technique:Escape", "title": "Escape", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "escape", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Grapple": {
				"name": "Technique:Grapple", "title": "Grapple", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "grapple", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Hide": {
				"name": "Technique:Hide", "title": "Hide", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "hide", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Mount": {
				"name": "Technique:Mount", "title": "Mount", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "mount", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Prepare": {
				"name": "Technique:Prepare", "title": "Prepare", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "prepare", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Reposition": {
				"name": "Technique:Reposition", "title": "Reposition", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "reposition", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Seach": {
				"name": "Technique:Seach", "title": "Seach", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "seach", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Aid": {
				"name": "Technique:Aid", "title": "Aid", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "aid", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Encourage": {
				"name": "Technique:Encourage", "title": "Encourage", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "encourage", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Stabilize": {
				"name": "Technique:Stabilize", "title": "Stabilize", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "stabilize", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Skill Check": {
				"name": "Technique:Skill Check", "title": "Skill Check", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "skillCheck", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Build Rapport": {
				"name": "Technique:Build Rapport", "title": "Build Rapport", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "buildRapport", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Build Pressure": {
				"name": "Technique:Build Pressure", "title": "Build Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "buildPressure", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Captivate": {
				"name": "Technique:Captivate", "title": "Captivate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "captivate", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Demand": {
				"name": "Technique:Demand", "title": "Demand", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "demand", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Grab an Edge": {
				"name": "Technique:Grab an Edge", "title": "Grab an Edge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "grabAnEdge", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Interact": {
				"name": "Technique:Interact", "title": "Interact", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "interact", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Second Wind": {
				"name": "Technique:Second Wind", "title": "Second Wind", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "secondWind", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Second Breath": {
				"name": "Technique:Second Breath", "title": "Second Breath", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "secondBreath", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Undaunted": {
				"name": "Technique:Undaunted", "title": "Undaunted", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "undaunted", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Preemptive Strike": {
				"name": "Technique:Preemptive Strike", "title": "Preemptive Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "preemptiveStrike", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Preemptive Stagger": {
				"name": "Technique:Preemptive Stagger", "title": "Preemptive Stagger", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "preemptiveStagger", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Critical Maim": {
				"name": "Technique:Critical Maim", "title": "Critical Maim", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "criticalMaim", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Spellshot": {
				"name": "Technique:Spellshot", "title": "Spellshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "spellshot", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Follow-Up Spellshot": {
				"name": "Technique:Follow-Up Spellshot", "title": "Follow-Up Spellshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "follow-UpSpellshot", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Bursting Spellshot": {
				"name": "Technique:Bursting Spellshot", "title": "Bursting Spellshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "burstingSpellshot", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Savior": {
				"name": "Technique:Savior", "title": "Savior", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "savior", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Knock Away Savior": {
				"name": "Technique:Knock Away Savior", "title": "Knock Away Savior", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "knockAwaySavior", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Savior's Retaliation": {
				"name": "Technique:Savior's Retaliation", "title": "Savior's Retaliation", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "savior'sRetaliation", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Spellstrike": {
				"name": "Technique:Spellstrike", "title": "Spellstrike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "spellstrike", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Power Skirmish": {
				"name": "Technique:Power Skirmish", "title": "Power Skirmish", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "powerSkirmish", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sneak Attack": {
				"name": "Technique:Sneak Attack", "title": "Sneak Attack", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sneakAttack", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sneaky Follow-Up": {
				"name": "Technique:Sneaky Follow-Up", "title": "Sneaky Follow-Up", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sneakyFollow-Up", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Assassinate": {
				"name": "Technique:Assassinate", "title": "Assassinate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "assassinate", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Emergency Care": {
				"name": "Technique:Emergency Care", "title": "Emergency Care", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "emergencyCare", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Nightingale": {
				"name": "Technique:Nightingale", "title": "Nightingale", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "nightingale", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Rhapsody": {
				"name": "Technique:Rhapsody", "title": "Rhapsody", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "rhapsody", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Metamagic": {
				"name": "Technique:Metamagic", "title": "Metamagic", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "metamagic", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Strategize": {
				"name": "Technique:Strategize", "title": "Strategize", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "strategize", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Foresight": {
				"name": "Technique:Foresight", "title": "Foresight", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "foresight", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Saw That Coming": {
				"name": "Technique:Saw That Coming", "title": "Saw That Coming", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sawThatComing", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:As You May Recall": {
				"name": "Technique:As You May Recall", "title": "As You May Recall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "asYouMayRecall", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Generalist": {
				"name": "Technique:Generalist", "title": "Generalist", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "generalist", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Defender": {
				"name": "Technique:Defender", "title": "Defender", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "defender", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Defender II": {
				"name": "Technique:Defender II", "title": "Defender II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "defenderII", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Defender's Will": {
				"name": "Technique:Defender's Will", "title": "Defender's Will", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "defender'sWill", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Defender's Taunt": {
				"name": "Technique:Defender's Taunt", "title": "Defender's Taunt", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "defender'sTaunt", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Defender's Recovery": {
				"name": "Technique:Defender's Recovery", "title": "Defender's Recovery", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "defender'sRecovery", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Skirmisher": {
				"name": "Technique:Skirmisher", "title": "Skirmisher", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "skirmisher", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Skirmisher II": {
				"name": "Technique:Skirmisher II", "title": "Skirmisher II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "skirmisherII", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Skirmisher's Step": {
				"name": "Technique:Skirmisher's Step", "title": "Skirmisher's Step", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "skirmisher'sStep", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Skirmisher's Strike": {
				"name": "Technique:Skirmisher's Strike", "title": "Skirmisher's Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "skirmisher'sStrike", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Marksman": {
				"name": "Technique:Marksman", "title": "Marksman", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "marksman", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Marksman II": {
				"name": "Technique:Marksman II", "title": "Marksman II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "marksmanII", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Marksman's Longshot": {
				"name": "Technique:Marksman's Longshot", "title": "Marksman's Longshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "marksman'sLongshot", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Marksman's Sight": {
				"name": "Technique:Marksman's Sight", "title": "Marksman's Sight", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "marksman'sSight", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Marksman's Strike": {
				"name": "Technique:Marksman's Strike", "title": "Marksman's Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "marksman'sStrike", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Athlete": {
				"name": "Technique:Athlete", "title": "Athlete", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "athlete", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Athlete II": {
				"name": "Technique:Athlete II", "title": "Athlete II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "athleteII", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Athlete's Sprint": {
				"name": "Technique:Athlete's Sprint", "title": "Athlete's Sprint", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "athlete'sSprint", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Athlete's Reach": {
				"name": "Technique:Athlete's Reach", "title": "Athlete's Reach", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "athlete'sReach", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Bounding Sprint": {
				"name": "Technique:Bounding Sprint", "title": "Bounding Sprint", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "boundingSprint", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Skulk Away": {
				"name": "Technique:Skulk Away", "title": "Skulk Away", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "skulkAway", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Skulk Then Hide": {
				"name": "Technique:Skulk Then Hide", "title": "Skulk Then Hide", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "skulkThenHide", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:First Aid": {
				"name": "Technique:First Aid", "title": "First Aid", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "firstAid", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cleansing Aid": {
				"name": "Technique:Cleansing Aid", "title": "Cleansing Aid", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "cleansingAid", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Environmental Awareness": {
				"name": "Technique:Environmental Awareness", "title": "Environmental Awareness", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "environmentalAwareness", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Eclectic Knowledge": {
				"name": "Technique:Eclectic Knowledge", "title": "Eclectic Knowledge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "eclecticKnowledge", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Point of Clarity": {
				"name": "Technique:Point of Clarity", "title": "Point of Clarity", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "pointOfClarity", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Pole Vault": {
				"name": "Technique:Pole Vault", "title": "Pole Vault", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "poleVault", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Quick Draw": {
				"name": "Technique:Quick Draw", "title": "Quick Draw", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "quickDraw", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Extension Strike": {
				"name": "Technique:Extension Strike", "title": "Extension Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "extensionStrike", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Step Extension": {
				"name": "Technique:Step Extension", "title": "Step Extension", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "stepExtension", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Lasting Extension": {
				"name": "Technique:Lasting Extension", "title": "Lasting Extension", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "lastingExtension", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Far Strike": {
				"name": "Technique:Far Strike", "title": "Far Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "farStrike", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Extension Strike +": {
				"name": "Technique:Extension Strike +", "title": "Extension Strike +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "extensionStrike+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Defense Piercer ": {
				"name": "Technique:Defense Piercer ", "title": "Defense Piercer ", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "defensePiercer", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Quick Slash": {
				"name": "Technique:Quick Slash", "title": "Quick Slash", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "quickSlash", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Precision Blade": {
				"name": "Technique:Precision Blade", "title": "Precision Blade", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "precisionBlade", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Armor Piercer": {
				"name": "Technique:Armor Piercer", "title": "Armor Piercer", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "armorPiercer", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Quick Slash II": {
				"name": "Technique:Quick Slash II", "title": "Quick Slash II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "quickSlashII", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cleave": {
				"name": "Technique:Cleave", "title": "Cleave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "cleave", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Crushing Blade": {
				"name": "Technique:Crushing Blade", "title": "Crushing Blade", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "crushingBlade", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Great Cleave": {
				"name": "Technique:Great Cleave", "title": "Great Cleave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "greatCleave", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cleave +": {
				"name": "Technique:Cleave +", "title": "Cleave +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "cleave+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sudden Cleave": {
				"name": "Technique:Sudden Cleave", "title": "Sudden Cleave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "suddenCleave", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Great Cleave II": {
				"name": "Technique:Great Cleave II", "title": "Great Cleave II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "greatCleaveII", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Power Flex": {
				"name": "Technique:Power Flex", "title": "Power Flex", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "powerFlex", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Crush Knuckle": {
				"name": "Technique:Crush Knuckle", "title": "Crush Knuckle", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "crushKnuckle", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Impact Knuckle": {
				"name": "Technique:Impact Knuckle", "title": "Impact Knuckle", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "impactKnuckle", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Knuckle Flurry": {
				"name": "Technique:Knuckle Flurry", "title": "Knuckle Flurry", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "knuckleFlurry", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Water Blast": {
				"name": "Technique:Water Blast", "title": "Water Blast", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "waterBlast", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Geyser": {
				"name": "Technique:Geyser", "title": "Geyser", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "geyser", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Geyser Line": {
				"name": "Technique:Geyser Line", "title": "Geyser Line", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "geyserLine", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Surf": {
				"name": "Technique:Surf", "title": "Surf", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "surf", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Great Geyser Line": {
				"name": "Technique:Great Geyser Line", "title": "Great Geyser Line", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "greatGeyserLine", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Tidal Wave": {
				"name": "Technique:Tidal Wave", "title": "Tidal Wave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "tidalWave", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sand Surge": {
				"name": "Technique:Sand Surge", "title": "Sand Surge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sandSurge", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sand Spout": {
				"name": "Technique:Sand Spout", "title": "Sand Spout", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sandSpout", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sand Wave": {
				"name": "Technique:Sand Wave", "title": "Sand Wave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sandWave", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sand Launcher": {
				"name": "Technique:Sand Launcher", "title": "Sand Launcher", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sandLauncher", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sicken": {
				"name": "Technique:Sicken", "title": "Sicken", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sicken", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Spores": {
				"name": "Technique:Spores", "title": "Spores", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "spores", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sickening Cloud": {
				"name": "Technique:Sickening Cloud", "title": "Sickening Cloud", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sickeningCloud", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Virulent Spores": {
				"name": "Technique:Virulent Spores", "title": "Virulent Spores", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "virulentSpores", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Firebolt": {
				"name": "Technique:Firebolt", "title": "Firebolt", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "firebolt", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Flame Arrow": {
				"name": "Technique:Flame Arrow", "title": "Flame Arrow", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "flameArrow", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Fireball": {
				"name": "Technique:Fireball", "title": "Fireball", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fireball", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Fireblast": {
				"name": "Technique:Fireblast", "title": "Fireblast", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fireblast", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Ragnarok": {
				"name": "Technique:Ragnarok", "title": "Ragnarok", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "ragnarok", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Bonfire": {
				"name": "Technique:Bonfire", "title": "Bonfire", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "bonfire", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Wall of Fire": {
				"name": "Technique:Wall of Fire", "title": "Wall of Fire", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "wallOfFire", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Field of Flame": {
				"name": "Technique:Field of Flame", "title": "Field of Flame", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fieldOfFlame", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Lightning Shaft": {
				"name": "Technique:Lightning Shaft", "title": "Lightning Shaft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "lightningShaft", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Shock": {
				"name": "Technique:Shock", "title": "Shock", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "shock", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Lightning Bolt": {
				"name": "Technique:Lightning Bolt", "title": "Lightning Bolt", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "lightningBolt", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Plasma Arc": {
				"name": "Technique:Plasma Arc", "title": "Plasma Arc", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "plasmaArc", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Fulgor": {
				"name": "Technique:Fulgor", "title": "Fulgor", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fulgor", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cold Snap": {
				"name": "Technique:Cold Snap", "title": "Cold Snap", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "coldSnap", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Frostbite": {
				"name": "Technique:Frostbite", "title": "Frostbite", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "frostbite", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Freezebind": {
				"name": "Technique:Freezebind", "title": "Freezebind", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "freezebind", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cold Burst": {
				"name": "Technique:Cold Burst", "title": "Cold Burst", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "coldBurst", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cold Front": {
				"name": "Technique:Cold Front", "title": "Cold Front", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "coldFront", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Diamond Dust": {
				"name": "Technique:Diamond Dust", "title": "Diamond Dust", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "diamondDust", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Wind Bullet": {
				"name": "Technique:Wind Bullet", "title": "Wind Bullet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "windBullet", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Gust": {
				"name": "Technique:Gust", "title": "Gust", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "gust", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Windsweep": {
				"name": "Technique:Windsweep", "title": "Windsweep", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "windsweep", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Gale": {
				"name": "Technique:Gale", "title": "Gale", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "gale", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Darkness": {
				"name": "Technique:Darkness", "title": "Darkness", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "darkness", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Shadow Wall": {
				"name": "Technique:Shadow Wall", "title": "Shadow Wall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "shadowWall", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Nightfall": {
				"name": "Technique:Nightfall", "title": "Nightfall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "nightfall", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Fog Cloud": {
				"name": "Technique:Fog Cloud", "title": "Fog Cloud", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fogCloud", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sleet": {
				"name": "Technique:Sleet", "title": "Sleet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sleet", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Freezing Sleet": {
				"name": "Technique:Freezing Sleet", "title": "Freezing Sleet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "freezingSleet", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Hail": {
				"name": "Technique:Hail", "title": "Hail", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "hail", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Binding Sleet": {
				"name": "Technique:Binding Sleet", "title": "Binding Sleet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "bindingSleet", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Ice Storm": {
				"name": "Technique:Ice Storm", "title": "Ice Storm", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "iceStorm", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Fimbulwinter": {
				"name": "Technique:Fimbulwinter", "title": "Fimbulwinter", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fimbulwinter", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Smoke Cloud": {
				"name": "Technique:Smoke Cloud", "title": "Smoke Cloud", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "smokeCloud", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Burning Smoke": {
				"name": "Technique:Burning Smoke", "title": "Burning Smoke", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "burningSmoke", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Choking Smoke": {
				"name": "Technique:Choking Smoke", "title": "Choking Smoke", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "chokingSmoke", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Acceleration": {
				"name": "Technique:Acceleration", "title": "Acceleration", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "acceleration", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Power Vault": {
				"name": "Technique:Power Vault", "title": "Power Vault", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "powerVault", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Expeditious": {
				"name": "Technique:Expeditious", "title": "Expeditious", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "expeditious", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Quick Climb": {
				"name": "Technique:Quick Climb", "title": "Quick Climb", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "quickClimb", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Quick Swim": {
				"name": "Technique:Quick Swim", "title": "Quick Swim", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "quickSwim", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Poise": {
				"name": "Technique:Poise", "title": "Poise", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "poise", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cat Fall": {
				"name": "Technique:Cat Fall", "title": "Cat Fall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "catFall", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Kip Up": {
				"name": "Technique:Kip Up", "title": "Kip Up", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "kipUp", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Silent Stride": {
				"name": "Technique:Silent Stride", "title": "Silent Stride", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "silentStride", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Shove": {
				"name": "Technique:Shove", "title": "Shove", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "shove", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Knockdown": {
				"name": "Technique:Knockdown", "title": "Knockdown", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "knockdown", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Tumble": {
				"name": "Technique:Tumble", "title": "Tumble", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "tumble", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Field Medic": {
				"name": "Technique:Field Medic", "title": "Field Medic", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fieldMedic", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Camoflauge": {
				"name": "Technique:Camoflauge", "title": "Camoflauge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "camoflauge", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Blurred Light": {
				"name": "Technique:Blurred Light", "title": "Blurred Light", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "blurredLight", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Light Refraction": {
				"name": "Technique:Light Refraction", "title": "Light Refraction", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "lightRefraction", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Shadow Steps": {
				"name": "Technique:Shadow Steps", "title": "Shadow Steps", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "shadowSteps", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Shadow Walker": {
				"name": "Technique:Shadow Walker", "title": "Shadow Walker", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "shadowWalker", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Wind Step": {
				"name": "Technique:Wind Step", "title": "Wind Step", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "windStep", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Updraft": {
				"name": "Technique:Updraft", "title": "Updraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "updraft", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Clouded Updraft": {
				"name": "Technique:Clouded Updraft", "title": "Clouded Updraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "cloudedUpdraft", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Wind Fall": {
				"name": "Technique:Wind Fall", "title": "Wind Fall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "windFall", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Walk on Air": {
				"name": "Technique:Walk on Air", "title": "Walk on Air", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "walkOnAir", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Fire Step": {
				"name": "Technique:Fire Step", "title": "Fire Step", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fireStep", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Liftoff": {
				"name": "Technique:Liftoff", "title": "Liftoff", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "liftoff", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Jet": {
				"name": "Technique:Jet", "title": "Jet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "jet", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cunning Action": {
				"name": "Technique:Cunning Action", "title": "Cunning Action", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "cunningAction", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Demoralize": {
				"name": "Technique:Demoralize", "title": "Demoralize", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "demoralize", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Fascinate": {
				"name": "Technique:Fascinate", "title": "Fascinate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "fascinate", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Impersonator": {
				"name": "Technique:Impersonator", "title": "Impersonator", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "impersonator", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Ether Sense": {
				"name": "Technique:Ether Sense", "title": "Ether Sense", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "etherSense", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Spirit Sense": {
				"name": "Technique:Spirit Sense", "title": "Spirit Sense", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "spiritSense", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Tremorsense": {
				"name": "Technique:Tremorsense", "title": "Tremorsense", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "tremorsense", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Dustcraft": {
				"name": "Technique:Dustcraft", "title": "Dustcraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "dustcraft", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Shape Material": {
				"name": "Technique:Shape Material", "title": "Shape Material", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "shapeMaterial", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Quickcraft": {
				"name": "Technique:Quickcraft", "title": "Quickcraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "quickcraft", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Improved Shaping": {
				"name": "Technique:Improved Shaping", "title": "Improved Shaping", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "improvedShaping", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Greater Shaping": {
				"name": "Technique:Greater Shaping", "title": "Greater Shaping", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "greaterShaping", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Legendary Shaping": {
				"name": "Technique:Legendary Shaping", "title": "Legendary Shaping", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "legendaryShaping", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Dust Material": {
				"name": "Technique:Dust Material", "title": "Dust Material", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "dustMaterial", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Dust Area": {
				"name": "Technique:Dust Area", "title": "Dust Area", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "dustArea", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Improved Dusting": {
				"name": "Technique:Improved Dusting", "title": "Improved Dusting", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "improvedDusting", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Greater Dusting": {
				"name": "Technique:Greater Dusting", "title": "Greater Dusting", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "greaterDusting", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Legendary Dusting": {
				"name": "Technique:Legendary Dusting", "title": "Legendary Dusting", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "legendaryDusting", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Form Path": {
				"name": "Technique:Form Path", "title": "Form Path", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "formPath", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Form Pillar": {
				"name": "Technique:Form Pillar", "title": "Form Pillar", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "formPillar", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Stepping Path": {
				"name": "Technique:Stepping Path", "title": "Stepping Path", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "steppingPath", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Form Wall": {
				"name": "Technique:Form Wall", "title": "Form Wall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "formWall", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Scattered Pillars": {
				"name": "Technique:Scattered Pillars", "title": "Scattered Pillars", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "scatteredPillars", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Great Wall": {
				"name": "Technique:Great Wall", "title": "Great Wall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "greatWall", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cultivate": {
				"name": "Technique:Cultivate", "title": "Cultivate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "cultivate", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Entangle": {
				"name": "Technique:Entangle", "title": "Entangle", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "entangle", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Wildwood": {
				"name": "Technique:Wildwood", "title": "Wildwood", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "wildwood", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Distortion": {
				"name": "Technique:Distortion", "title": "Distortion", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "distortion", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Lasting Distortion": {
				"name": "Technique:Lasting Distortion", "title": "Lasting Distortion", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "lastingDistortion", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Heat Field": {
				"name": "Technique:Heat Field", "title": "Heat Field", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "heatField", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Burn Guard": {
				"name": "Technique:Burn Guard", "title": "Burn Guard", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "burnGuard", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Cold Field": {
				"name": "Technique:Cold Field", "title": "Cold Field", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "coldField", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Chill Guard": {
				"name": "Technique:Chill Guard", "title": "Chill Guard", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "chillGuard", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Kinesis": {
				"name": "Technique:Kinesis", "title": "Kinesis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "kinesis", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Distant Kinesis": {
				"name": "Technique:Distant Kinesis", "title": "Distant Kinesis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "distantKinesis", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Kinetic Strike": {
				"name": "Technique:Kinetic Strike", "title": "Kinetic Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "kineticStrike", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Kinetic Throw": {
				"name": "Technique:Kinetic Throw", "title": "Kinetic Throw", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "kineticThrow", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Heavy Kinesis": {
				"name": "Technique:Heavy Kinesis", "title": "Heavy Kinesis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "heavyKinesis", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Burden": {
				"name": "Technique:Burden", "title": "Burden", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "burden", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Pressure": {
				"name": "Technique:Pressure", "title": "Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "pressure", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Restrain": {
				"name": "Technique:Restrain", "title": "Restrain", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "restrain", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Wide Pressure": {
				"name": "Technique:Wide Pressure", "title": "Wide Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "widePressure", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Prostration": {
				"name": "Technique:Prostration", "title": "Prostration", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "prostration", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Deep Pressure": {
				"name": "Technique:Deep Pressure", "title": "Deep Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "deepPressure", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Gravity Well": {
				"name": "Technique:Gravity Well", "title": "Gravity Well", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "gravityWell", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Shield Block": {
				"name": "Technique:Shield Block", "title": "Shield Block", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "shieldBlock", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Glancing Block": {
				"name": "Technique:Glancing Block", "title": "Glancing Block", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "glancingBlock", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Aegis": {
				"name": "Technique:Aegis", "title": "Aegis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "aegis", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Light": {
				"name": "Technique:Light", "title": "Light", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "light", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Dancing Lights": {
				"name": "Technique:Dancing Lights", "title": "Dancing Lights", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "dancingLights", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Flash": {
				"name": "Technique:Flash", "title": "Flash", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "flash", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sunlight": {
				"name": "Technique:Sunlight", "title": "Sunlight", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sunlight", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Stress Release": {
				"name": "Technique:Stress Release", "title": "Stress Release", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "stressRelease", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Stress Release +": {
				"name": "Technique:Stress Release +", "title": "Stress Release +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "stressRelease+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Stress Release ++": {
				"name": "Technique:Stress Release ++", "title": "Stress Release ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "stressRelease++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sensory Training": {
				"name": "Technique:Sensory Training", "title": "Sensory Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sensoryTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sensory Training +": {
				"name": "Technique:Sensory Training +", "title": "Sensory Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sensoryTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Broad Study": {
				"name": "Technique:Broad Study", "title": "Broad Study", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "broadStudy", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Experienced Tracker": {
				"name": "Technique:Experienced Tracker", "title": "Experienced Tracker", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "experiencedTracker", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Multilingual": {
				"name": "Technique:Multilingual", "title": "Multilingual", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "multilingual", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Multilingual +": {
				"name": "Technique:Multilingual +", "title": "Multilingual +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "multilingual+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Specialized Lore": {
				"name": "Technique:Specialized Lore", "title": "Specialized Lore", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "specializedLore", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Specialized Lore +": {
				"name": "Technique:Specialized Lore +", "title": "Specialized Lore +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "specializedLore+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Specialized Lore ++": {
				"name": "Technique:Specialized Lore ++", "title": "Specialized Lore ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "specializedLore++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Improved Initiative": {
				"name": "Technique:Improved Initiative", "title": "Improved Initiative", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "improvedInitiative", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Knowledge Training": {
				"name": "Technique:Knowledge Training", "title": "Knowledge Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "knowledgeTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Knowledge Training +": {
				"name": "Technique:Knowledge Training +", "title": "Knowledge Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "knowledgeTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Knowledge Training ++": {
				"name": "Technique:Knowledge Training ++", "title": "Knowledge Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "knowledgeTraining++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Social Training": {
				"name": "Technique:Social Training", "title": "Social Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "socialTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Social Training +": {
				"name": "Technique:Social Training +", "title": "Social Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "socialTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Social Training ++": {
				"name": "Technique:Social Training ++", "title": "Social Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "socialTraining++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Refocus": {
				"name": "Technique:Refocus", "title": "Refocus", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "refocus", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Refocus +": {
				"name": "Technique:Refocus +", "title": "Refocus +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "refocus+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sustained Channel": {
				"name": "Technique:Sustained Channel", "title": "Sustained Channel", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sustainedChannel", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Sustained Channel +": {
				"name": "Technique:Sustained Channel +", "title": "Sustained Channel +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "sustainedChannel+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Ki Control": {
				"name": "Technique:Ki Control", "title": "Ki Control", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "kiControl", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Ki Control +": {
				"name": "Technique:Ki Control +", "title": "Ki Control +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "kiControl+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Ki Control ++": {
				"name": "Technique:Ki Control ++", "title": "Ki Control ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "kiControl++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Surge Value": {
				"name": "Technique:Surge Value", "title": "Surge Value", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "surgeValue", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Surge Value +": {
				"name": "Technique:Surge Value +", "title": "Surge Value +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "surgeValue+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Channel Training": {
				"name": "Technique:Channel Training", "title": "Channel Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "channelTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Channel Training +": {
				"name": "Technique:Channel Training +", "title": "Channel Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "channelTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Channel Training ++": {
				"name": "Technique:Channel Training ++", "title": "Channel Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "channelTraining++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Physical Training": {
				"name": "Technique:Physical Training", "title": "Physical Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "physicalTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Physical Training +": {
				"name": "Technique:Physical Training +", "title": "Physical Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "physicalTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Body Training": {
				"name": "Technique:Body Training", "title": "Body Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "bodyTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Body Training +": {
				"name": "Technique:Body Training +", "title": "Body Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "bodyTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Body Training ++": {
				"name": "Technique:Body Training ++", "title": "Body Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "bodyTraining++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Technical Training": {
				"name": "Technique:Technical Training", "title": "Technical Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "technicalTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Technical Training +": {
				"name": "Technique:Technical Training +", "title": "Technical Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "technicalTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Technical Training ++": {
				"name": "Technique:Technical Training ++", "title": "Technical Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "technicalTraining++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Martial Training": {
				"name": "Technique:Martial Training", "title": "Martial Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "martialTraining", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Martial Training +": {
				"name": "Technique:Martial Training +", "title": "Martial Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "martialTraining+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Martial Training ++": {
				"name": "Technique:Martial Training ++", "title": "Martial Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "martialTraining++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:HP Up": {
				"name": "Technique:HP Up", "title": "HP Up", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "hPUp", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:HP Up+": {
				"name": "Technique:HP Up+", "title": "HP Up+", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "hPUp+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:HP Up++": {
				"name": "Technique:HP Up++", "title": "HP Up++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "hPUp++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Vitality Boost": {
				"name": "Technique:Vitality Boost", "title": "Vitality Boost", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "vitalityBoost", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Vitality Boost +": {
				"name": "Technique:Vitality Boost +", "title": "Vitality Boost +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "vitalityBoost+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Vitality Boost ++": {
				"name": "Technique:Vitality Boost ++", "title": "Vitality Boost ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "vitalityBoost++", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Undying": {
				"name": "Technique:Undying", "title": "Undying", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "undying", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Undying +": {
				"name": "Technique:Undying +", "title": "Undying +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "undying+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Extra Follow-Up Attack": {
				"name": "Technique:Extra Follow-Up Attack", "title": "Extra Follow-Up Attack", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "extraFollow-UpAttack", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Extra Follow-Up Attack +": {
				"name": "Technique:Extra Follow-Up Attack +", "title": "Extra Follow-Up Attack +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "extraFollow-UpAttack+", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Change Tech Slots": {
				"name": "Technique:Change Tech Slots", "title": "Change Tech Slots", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "changeTechSlots", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Hold Out": {
				"name": "Technique:Hold Out", "title": "Hold Out", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "holdOut", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique:Overdrive": {
				"name": "Technique:Overdrive", "title": "Overdrive", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "overdrive", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			}
		},
		sortingGroups = { "group": { "Type": ["Attribute", "Defense", "Sense", "Awareness", "General", "Affinity", "Gear", "Combat", "Social", "Tech Slot"], "Attribute": ["Body", "Precision", "Quickness", "Conviction", "Intuition ", "Reason"], "Stat": ["Skill", "Job", "Knowledge", "Language", "Lore", "Style", "Technique"], "Defense": ["Brace", "Disruption", "Evasion"], "Sense": ["Insight", "Scrutiny", "Resolve"], "Awareness": ["Fortitude", "Notice", "Hide", "Reflex"], "General": ["Character Level", "Character Rank", "Hit Points", "Buffer", "Energy", "Focus", "Chakra", "Initiative", "Speed"], "Affinity": ["Wood", "Fire", "Earth", "Metal", "Water"], "Gear": ["Carrying Capacity", "Reflex Penalty", "Speed Penalty"], "Combat": ["Durability", "Heal Value", "Barrier", "Block", "Armor", "Trauma Limit", "Stress Limit", "Vitality", "Ki", "Armsforce", "Spellforce", "Strikeforce"], "Social": ["Willpower", "Approval", "Patience"], "Tech Slot": ["Job Slots", "Item Slots", "Active Slots", "Support Slots"], "Page": ["Character Creator", "Core", "Advancement", "Training"], "Definition": ["Origin", "Origin Basics", "Full Name", "Display Name"], "Technique Trait": ["Accurate", "Affinity+", "AP (X)", "Brutal", "Focus+", "Material", "Simple", "Volatile", "Vortex", "Weapon", "Wall"], "Item Trait": ["Arcing", "Shield", "Thrown", "Two-Handed", "Loud", "Impact (X)", "Explosive (X/Y)"], "Material Trait": ["Flammable", "Flexible", "Frozen", "Sharp", "Sturdy", "Transparent"], "Status": ["Downed", "Engaged", "Ethereal", "Grappled", "Hidden", "Initiative Penalty", "Invisible", "Restrained", "Unconscious"], "Condition": ["Aflame", "Angered", "Chilled", "Delayed", "Disgusted", "Dying", "Empowered", "Encouraged", "Encumbered", "Frightened", "Hasted", "Immobilized", "Impaired", "Joyful", "Launched", "Paralyzed", "Prone", "Saddened", "Sickened", "Staggered", "Stunned", "Surprised"], "Skill": ["Skill:Acrobatics", "Skill:Agility", "Skill:Analyze", "Skill:Build", "Skill:Channel", "Skill:Charm", "Skill:Command", "Skill:Concoct", "Skill:Cook", "Skill:Deception", "Skill:Disguise", "Skill:Empathy", "Skill:Enchant", "Skill:Finesse", "Skill:Flexibility", "Skill:Grappling", "Skill:Heal", "Skill:Intimidation", "Skill:Leadership", "Skill:Maneuver", "Skill:Medicine", "Skill:Might", "Skill:Negotiation", "Skill:Palming", "Skill:Physique", "Skill:Pilot", "Skill:Resonance", "Skill:Search", "Skill:Shoot", "Skill:Skirmish", "Skill:Sneak", "Skill:Survival", "Skill:Throw", "Skill:Tinker", "Skill:Traversal"], "Language": ["Language:Minere", "Language:Junal", "Language:Apollen", "Language:Lib", "Language:Cert", "Language:Byric", "Language:Dustell", "Language:Muralic", "Language:Shira", "Language:Ciel", "Language:Citeq", "Language:Manstan", "Language:Salkan", "Language:Sansic", "Language:Silq", "Language:Kleikan", "Language:Crinere", "Language:Palmic", "Language:Shorespeak", "Language:Verdeni", "Language:Vulca", "Language:Emotion", "Language:Empathy", "Language:Wolfwarg", "Language:Jovean", "Language:Mytikan"], "Lore": ["Lore:Academics", "Lore:Health", "Lore:Mana", "Lore:Mathematics", "Lore:Nature", "Lore:School", "Lore:Spirit", "Lore:Warfare", "Lore:Zoology", "Lore:Profession", "Lore:Farming", "Lore:Fishing", "Lore:Hunting", "Lore:Legal", "Lore:Mercantile", "Lore:Mining", "Lore:Craftmanship", "Lore:Alchemy", "Lore:Architecture", "Lore:Brewing", "Lore:Cooking", "Lore:Engineering", "Lore:Glassblowing", "Lore:Leatherworking", "Lore:Sculpting", "Lore:Smithing", "Lore:Weaving", "Lore:Geography", "Lore:Aridsha", "Lore:Ceres", "Lore:Colswei", "Lore:Khem", "Lore:Novus", "Lore:Walthair", "Lore:Wayling", "Lore:Ethereal Plane", "Lore:History", "Lore:Aridsha History", "Lore:Ceres History", "Lore:Colswei History", "Lore:Khem History", "Lore:Novus History", "Lore:Walthair History", "Lore:Wayling History", "Lore:Culture", "Lore:Art", "Lore:Etiquette", "Lore:Fashion", "Lore:Games", "Lore:Music", "Lore:Scribing", "Lore:Theater", "Lore:Religion", "Lore:Church of Kongkwei", "Lore:Guidance", "Lore:Life's Circle", "Lore:Ocean Court", "Lore:Sylvan", "Lore:Zushaon"], "Job": ["Job:Trainee", "Job:Interceptor", "Job:Guardian", "Job:Spellslinger", "Job:Warrior", "Job:Rogue", "Job:Scholar", "Job:Physician"], "Role": ["Role:Generalist", "Role:Defender", "Role:Athlete", "Role:Skirmisher", "Role:Marksman"], "Technique": ["Technique:Break Free", "Technique:Dash", "Technique:Escape", "Technique:Grapple", "Technique:Hide", "Technique:Mount", "Technique:Prepare", "Technique:Reposition", "Technique:Seach", "Technique:Aid", "Technique:Encourage", "Technique:Stabilize", "Technique:Skill Check", "Technique:Build Rapport", "Technique:Build Pressure", "Technique:Captivate", "Technique:Demand", "Technique:Grab an Edge", "Technique:Interact", "Technique:Second Wind", "Technique:Second Breath", "Technique:Undaunted", "Technique:Preemptive Strike", "Technique:Preemptive Stagger", "Technique:Critical Maim", "Technique:Spellshot", "Technique:Follow-Up Spellshot", "Technique:Bursting Spellshot", "Technique:Savior", "Technique:Knock Away Savior", "Technique:Savior's Retaliation", "Technique:Spellstrike", "Technique:Power Skirmish", "Technique:Sneak Attack", "Technique:Sneaky Follow-Up", "Technique:Assassinate", "Technique:Emergency Care", "Technique:Nightingale", "Technique:Rhapsody", "Technique:Metamagic", "Technique:Strategize", "Technique:Foresight", "Technique:Saw That Coming", "Technique:As You May Recall", "Technique:Generalist", "Technique:Defender", "Technique:Defender II", "Technique:Defender's Will", "Technique:Defender's Taunt", "Technique:Defender's Recovery", "Technique:Skirmisher", "Technique:Skirmisher II", "Technique:Skirmisher's Step", "Technique:Skirmisher's Strike", "Technique:Marksman", "Technique:Marksman II", "Technique:Marksman's Longshot", "Technique:Marksman's Sight", "Technique:Marksman's Strike", "Technique:Athlete", "Technique:Athlete II", "Technique:Athlete's Sprint", "Technique:Athlete's Reach", "Technique:Bounding Sprint", "Technique:Skulk Away", "Technique:Skulk Then Hide", "Technique:First Aid", "Technique:Cleansing Aid", "Technique:Environmental Awareness", "Technique:Eclectic Knowledge", "Technique:Point of Clarity", "Technique:Pole Vault", "Technique:Quick Draw", "Technique:Extension Strike", "Technique:Step Extension", "Technique:Lasting Extension", "Technique:Far Strike", "Technique:Extension Strike +", "Technique:Defense Piercer ", "Technique:Quick Slash", "Technique:Precision Blade", "Technique:Armor Piercer", "Technique:Quick Slash II", "Technique:Cleave", "Technique:Crushing Blade", "Technique:Great Cleave", "Technique:Cleave +", "Technique:Sudden Cleave", "Technique:Great Cleave II", "Technique:Power Flex", "Technique:Crush Knuckle", "Technique:Impact Knuckle", "Technique:Knuckle Flurry", "Technique:Water Blast", "Technique:Geyser", "Technique:Geyser Line", "Technique:Surf", "Technique:Great Geyser Line", "Technique:Tidal Wave", "Technique:Sand Surge", "Technique:Sand Spout", "Technique:Sand Wave", "Technique:Sand Launcher", "Technique:Sicken", "Technique:Spores", "Technique:Sickening Cloud", "Technique:Virulent Spores", "Technique:Firebolt", "Technique:Flame Arrow", "Technique:Fireball", "Technique:Fireblast", "Technique:Ragnarok", "Technique:Bonfire", "Technique:Wall of Fire", "Technique:Field of Flame", "Technique:Lightning Shaft", "Technique:Shock", "Technique:Lightning Bolt", "Technique:Plasma Arc", "Technique:Fulgor", "Technique:Cold Snap", "Technique:Frostbite", "Technique:Freezebind", "Technique:Cold Burst", "Technique:Cold Front", "Technique:Diamond Dust", "Technique:Wind Bullet", "Technique:Gust", "Technique:Windsweep", "Technique:Gale", "Technique:Darkness", "Technique:Shadow Wall", "Technique:Nightfall", "Technique:Fog Cloud", "Technique:Sleet", "Technique:Freezing Sleet", "Technique:Hail", "Technique:Binding Sleet", "Technique:Ice Storm", "Technique:Fimbulwinter", "Technique:Smoke Cloud", "Technique:Burning Smoke", "Technique:Choking Smoke", "Technique:Acceleration", "Technique:Power Vault", "Technique:Expeditious", "Technique:Quick Climb", "Technique:Quick Swim", "Technique:Poise", "Technique:Cat Fall", "Technique:Kip Up", "Technique:Silent Stride", "Technique:Shove", "Technique:Knockdown", "Technique:Tumble", "Technique:Field Medic", "Technique:Camoflauge", "Technique:Blurred Light", "Technique:Light Refraction", "Technique:Shadow Steps", "Technique:Shadow Walker", "Technique:Wind Step", "Technique:Updraft", "Technique:Clouded Updraft", "Technique:Wind Fall", "Technique:Walk on Air", "Technique:Fire Step", "Technique:Liftoff", "Technique:Jet", "Technique:Cunning Action", "Technique:Demoralize", "Technique:Fascinate", "Technique:Impersonator", "Technique:Ether Sense", "Technique:Spirit Sense", "Technique:Tremorsense", "Technique:Dustcraft", "Technique:Shape Material", "Technique:Quickcraft", "Technique:Improved Shaping", "Technique:Greater Shaping", "Technique:Legendary Shaping", "Technique:Dust Material", "Technique:Dust Area", "Technique:Improved Dusting", "Technique:Greater Dusting", "Technique:Legendary Dusting", "Technique:Form Path", "Technique:Form Pillar", "Technique:Stepping Path", "Technique:Form Wall", "Technique:Scattered Pillars", "Technique:Great Wall", "Technique:Cultivate", "Technique:Entangle", "Technique:Wildwood", "Technique:Distortion", "Technique:Lasting Distortion", "Technique:Heat Field", "Technique:Burn Guard", "Technique:Cold Field", "Technique:Chill Guard", "Technique:Kinesis", "Technique:Distant Kinesis", "Technique:Kinetic Strike", "Technique:Kinetic Throw", "Technique:Heavy Kinesis", "Technique:Burden", "Technique:Pressure", "Technique:Restrain", "Technique:Wide Pressure", "Technique:Prostration", "Technique:Deep Pressure", "Technique:Gravity Well", "Technique:Shield Block", "Technique:Glancing Block", "Technique:Aegis", "Technique:Light", "Technique:Dancing Lights", "Technique:Flash", "Technique:Sunlight", "Technique:Stress Release", "Technique:Stress Release +", "Technique:Stress Release ++", "Technique:Sensory Training", "Technique:Sensory Training +", "Technique:Broad Study", "Technique:Experienced Tracker", "Technique:Multilingual", "Technique:Multilingual +", "Technique:Specialized Lore", "Technique:Specialized Lore +", "Technique:Specialized Lore ++", "Technique:Improved Initiative", "Technique:Knowledge Training", "Technique:Knowledge Training +", "Technique:Knowledge Training ++", "Technique:Social Training", "Technique:Social Training +", "Technique:Social Training ++", "Technique:Refocus", "Technique:Refocus +", "Technique:Sustained Channel", "Technique:Sustained Channel +", "Technique:Ki Control", "Technique:Ki Control +", "Technique:Ki Control ++", "Technique:Surge Value", "Technique:Surge Value +", "Technique:Channel Training", "Technique:Channel Training +", "Technique:Channel Training ++", "Technique:Physical Training", "Technique:Physical Training +", "Technique:Body Training", "Technique:Body Training +", "Technique:Body Training ++", "Technique:Technical Training", "Technique:Technical Training +", "Technique:Technical Training ++", "Technique:Martial Training", "Technique:Martial Training +", "Technique:Martial Training ++", "Technique:HP Up", "Technique:HP Up+", "Technique:HP Up++", "Technique:Vitality Boost", "Technique:Vitality Boost +", "Technique:Vitality Boost ++", "Technique:Undying", "Technique:Undying +", "Technique:Extra Follow-Up Attack", "Technique:Extra Follow-Up Attack +", "Technique:Change Tech Slots", "Technique:Hold Out", "Technique:Overdrive"] } },
		_max = "_max",
		_rank = "_rank",
		_build = "_build",
		_filter = "_filter",
		_expand = "_expand",
		_tab = "_tab",
		_page = "_page",
		_exit = "_exit",
		_finish = "_finish",
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
		_exit: _exit,
		_finish: _finish,
		_read: _read,
		_learn: _learn,
		_pts: _pts,
		_error: _error
	};
}());
