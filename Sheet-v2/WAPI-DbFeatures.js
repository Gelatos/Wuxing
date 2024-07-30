var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "Character Creator", "Core", "Advancement", "Training", "_max", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_techBonus", "_error", "Origin", "Origin Basics", "Full Name", "Display Name", "Body", "Precision", "Quickness", "Conviction", "Intuition ", "Reason", "AttributeValueAverage", "AttributeValueGreat", "AttributeValueGood", "AttributeValueBad", "Defense", "Brace", "Fortitude", "Disruption", "Hide", "Evasion", "Reflex", "Sense", "Insight", "Notice", "Scrutiny", "Resolve", "General", "Character Level", "Character Rank", "Hit Points", "Buffer", "Energy", "Focus", "Chakra", "Initiative", "Speed", "Affinity", "Wood", "Fire", "Earth", "Metal", "Water", "Gear", "Carrying Capacity", "Reflex Penalty", "Speed Penalty", "Combat", "Durability", "Heal Value", "Barrier", "Block", "Armor", "Trauma Limit", "Stress Limit", "Vitality", "Ki", "Armsforce", "Spellforce", "Strikeforce", "Social", "Willpower", "Approval", "Patience", "Tech Slot", "Job Slots", "Item Slots", "Active Slots", "Support Slots", "Accurate", "Affinity+", "AP (X)", "Brutal", "Focus+", "Material", "Simple", "Volatile", "Vortex", "Weapon", "Wall", "Arcing", "Shield", "Thrown", "Two-Handed", "Loud", "Impact (X)", "Explosive (X/Y)", "Flammable", "Flexible", "Frozen", "Sharp", "Sturdy", "Transparent", "Downed", "Engaged", "Ethereal", "Grappled", "Hidden", "Initiative Penalty", "Invisible", "Restrained", "Unconscious", "Aflame", "Angered", "Chilled", "Delayed", "Disgusted", "Dying", "Empowered", "Encouraged", "Encumbered", "Frightened", "Hasted", "Immobilized", "Impaired", "Joyful", "Launched", "Paralyzed", "Prone", "Saddened", "Sickened", "Staggered", "Stunned", "Surprised", "Style_Basic Set", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "title": "Attributes", "group": "Type", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "When assigning attributes you may assign them a value. They range from a +3 bonus to a -1 penalty. Assigning an attribute a penalty will grant you more points to assign to other attributes.", "A normal character can have at most one attribute at a -1 penalty."],
				"abbreviation": "", "variable": "attribute{0}{1}", "formula": "7", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "title": "Skill", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "skill{0}{1}", "formula": "8", "modifiers": "_techBonus", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job": {
				"name": "Job", "fieldName": "job", "title": "Jobs", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "job{0}{1}", "formula": "1", "modifiers": "_techBonus", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role": {
				"name": "Role", "fieldName": "role", "title": "Roles", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "role{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "title": "", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "knowledge{0}{1}", "formula": "10", "modifiers": "_techBonus", "linkedGroups": 3, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language": {
				"name": "Language", "fieldName": "language", "title": "Language", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "language{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "title": "Lore", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "lore{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "fieldName": "style", "title": "Style", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "style{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "title": "Techniques", "group": "Stat", "descriptions": [""],
				"abbreviation": "", "variable": "technique{0}{1}", "formula": "6", "modifiers": "_techBonus", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Creator": {
				"name": "Character Creator", "fieldName": "characterCreator", "title": "Character Creator", "group": "Page", "descriptions": ["This is the Character Creator where you can create a new character. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, select Finish to populate your character. Alternatively, you can select Exit to do character creation at another time. This is not recommended.", "You can always return to this page from Options."],
				"abbreviation": "", "variable": "pageCharacterCreator{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Core": {
				"name": "Core", "fieldName": "core", "title": "Core", "group": "Page", "descriptions": [""],
				"abbreviation": "", "variable": "pageCore{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "title": "Advancement", "group": "Page", "descriptions": [""],
				"abbreviation": "", "variable": "pageAdvancement{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Training": {
				"name": "Training", "fieldName": "training", "title": "Training", "group": "Page", "descriptions": [""],
				"abbreviation": "", "variable": "pageTraining{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "title": "Max", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_max", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "title": "Rank", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_rank", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "title": "Build", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_build", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "title": "Filter", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_filter", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "title": "Expand", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_expand", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "title": "Tab", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_tab", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "title": "Page", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_page", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "title": "Exit", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_exit", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "title": "Finish", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_finish", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "title": "Origin", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_origin", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "title": "Learn", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_learn", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "title": "Points", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_pts", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_techBonus": {
				"name": "_techBonus", "fieldName": "_techBonus", "title": "Technique Bonus", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_techBonus", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "title": "Error", "group": "VariableMod", "descriptions": [""],
				"abbreviation": "", "variable": "_error", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Origin": {
				"name": "Origin", "fieldName": "origin", "title": "Origin", "group": "Definition", "descriptions": ["This is the Character Origin Page. Here you will set your character's name, their primary element, and ancestry. There are also some prebuild options to allow you to quickly build a character by choosing a Background and Archetype. These are optional choices to help steer your character into specific directions. You are always able to ignore these and just take on character creation from scratch."],
				"abbreviation": "", "variable": "origin{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Origin Basics": {
				"name": "Origin Basics", "fieldName": "originBasics", "title": "Basics", "group": "Definition", "descriptions": [""],
				"abbreviation": "", "variable": "origin_basics{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Full Name": {
				"name": "Full Name", "fieldName": "fullName", "title": "Full Name", "group": "Definition", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "variable": "full_name", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "fieldName": "displayName", "title": "Display Name", "group": "Definition", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "variable": "display_name", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Body": {
				"name": "Body", "fieldName": "body", "title": "Body", "group": "Attribute", "descriptions": [""],
				"abbreviation": "BOD", "variable": "attributebod{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Precision": {
				"name": "Precision", "fieldName": "precision", "title": "Precision", "group": "Attribute", "descriptions": [""],
				"abbreviation": "PRC", "variable": "attributeprc{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Quickness": {
				"name": "Quickness", "fieldName": "quickness", "title": "Quickness", "group": "Attribute", "descriptions": [""],
				"abbreviation": "QCK", "variable": "attributeqck{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Conviction": {
				"name": "Conviction", "fieldName": "conviction", "title": "Conviction", "group": "Attribute", "descriptions": [""],
				"abbreviation": "CNV", "variable": "attributecnv{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Intuition ": {
				"name": "Intuition ", "fieldName": "intuition", "title": "Intuition ", "group": "Attribute", "descriptions": [""],
				"abbreviation": "INT", "variable": "attributeint{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Reason": {
				"name": "Reason", "fieldName": "reason", "title": "Reason", "group": "Attribute", "descriptions": [""],
				"abbreviation": "RSN", "variable": "attributersn{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributeValueAverage", "title": "Average (+0)", "group": "AttributeValue", "descriptions": [""],
				"abbreviation": "", "variable": "0", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributeValueGreat", "title": "Great (+3)", "group": "AttributeValue", "descriptions": [""],
				"abbreviation": "", "variable": "3", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributeValueGood", "title": "Good (+2)", "group": "AttributeValue", "descriptions": [""],
				"abbreviation": "", "variable": "2", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributeValueBad", "title": "Bad (-1)", "group": "AttributeValue", "descriptions": [""],
				"abbreviation": "", "variable": "-1", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "title": "Defense", "group": "Type", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "variable": "defense", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Brace": {
				"name": "Brace", "fieldName": "brace", "title": "Brace", "group": "Physical Defense", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "variable": "brace", "formula": "7;Body", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fortitude": {
				"name": "Fortitude", "fieldName": "fortitude", "title": "Fortitude", "group": "Internal Defense", "descriptions": [""],
				"abbreviation": "", "variable": "fortitude", "formula": "7;Body;Skill:skill_Survival:_rank", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Disruption": {
				"name": "Disruption", "fieldName": "disruption", "title": "Disruption", "group": "Physical Defense", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "variable": "disruption", "formula": "7;Precision", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hide": {
				"name": "Hide", "fieldName": "hide", "title": "Hide", "group": "Awareness", "descriptions": [""],
				"abbreviation": "", "variable": "hide", "formula": "7;prc;skillsneak_rank", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Evasion": {
				"name": "Evasion", "fieldName": "evasion", "title": "Evasion", "group": "Physical Defense", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "variable": "evasion", "formula": "Quickness", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Reflex": {
				"name": "Reflex", "fieldName": "reflex", "title": "Reflex", "group": "Defense", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "variable": "reflex", "formula": "7;qck;skillagility_rank", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "title": "Sense", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Insight": {
				"name": "Insight", "fieldName": "insight", "title": "Insight", "group": "Sense", "descriptions": ["Insight represents a character's ability to parse conversation and judge mental states. This defense is typically used when information is being hidden in text or speech or to detect when someone is concealing their true thoughts."],
				"abbreviation": "", "variable": "insight", "formula": "7;int", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Notice": {
				"name": "Notice", "fieldName": "notice", "title": "Notice", "group": "Sense", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to hear a distant or quiet noise."],
				"abbreviation": "", "variable": "notice", "formula": "7;int", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Scrutiny": {
				"name": "Scrutiny", "fieldName": "scrutiny", "title": "Scrutiny", "group": "Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning."],
				"abbreviation": "", "variable": "scrutiny", "formula": "7;rsn", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Resolve": {
				"name": "Resolve", "fieldName": "resolve", "title": "Resolve", "group": "Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "variable": "resolve", "formula": "7;cnv", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"General": {
				"name": "General", "fieldName": "general", "title": "General", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Level": {
				"name": "Character Level", "fieldName": "characterLevel", "title": "Character Level", "group": "General", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "variable": "base_level", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Rank": {
				"name": "Character Rank", "fieldName": "characterRank", "title": "Character Rank", "group": "General", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level."],
				"abbreviation": "CR", "variable": "cr", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hit Points": {
				"name": "Hit Points", "fieldName": "hitPoints", "title": "Hit Points", "group": "General", "descriptions": ["Hit Points (HP) are the number of hits a character can take in a conflict. This is the case no matter the type of encounter as HP changes based on the type of encounter one finds themselves in."],
				"abbreviation": "HP", "variable": "hp", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Buffer": {
				"name": "Buffer", "fieldName": "buffer", "title": "Buffer", "group": "General", "descriptions": ["Some effects will grant Buffer. This is bonus HP that only lasts for a limited amount of time. Buffer always decreases before HP does."],
				"abbreviation": "", "variable": "buffer", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Energy": {
				"name": "Energy", "fieldName": "energy", "title": "Energy", "group": "General", "descriptions": ["Energy is a resource used to power techniques. It is a generic term"],
				"abbreviation": "EN", "variable": "energy", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Focus": {
				"name": "Focus", "fieldName": "focus", "title": "Focus", "group": "General", "descriptions": ["Focus determines how much energy a character can generate when attempting to create more energy.", "Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "variable": "focus", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "title": "Chakra", "group": "General", "descriptions": ["A chakra s a source of power within ki generating creatures. This value in statistics represents the number of chakras the character has control over and able to close off to generate a surge of power. "],
				"abbreviation": "", "variable": "chakra", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "title": "Initiative", "group": "General", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "variable": "initiative", "formula": "qck", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Speed": {
				"name": "Speed", "fieldName": "speed", "title": "Speed", "group": "General", "descriptions": ["Speed is how far a character is able to move on your turn, measured in spaces, when you make a standard move."],
				"abbreviation": "", "variable": "speed", "formula": "3", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "title": "Affinity", "group": "Type", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity.", "This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "variable": "affinity", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "title": "Wood", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "wood", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "title": "Fire", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "fire", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "title": "Earth", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "earth", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "title": "Metal", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "metal", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "fieldName": "water", "title": "Water", "group": "Affinity", "descriptions": [""],
				"abbreviation": "", "variable": "water", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Gear": {
				"name": "Gear", "fieldName": "gear", "title": "Gear", "group": "Type", "descriptions": ["These statistics govern what they are able to cast and how well they can cast spells."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carryingCapacity", "title": "Carrying Capacity", "group": "Gear", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "variable": "carry_capacity", "formula": "40; bodRank", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Reflex Penalty": {
				"name": "Reflex Penalty", "fieldName": "reflexPenalty", "title": "Reflex Penalty", "group": "Gear", "descriptions": ["Reflex Penalty represents how restricted their movement is, usually from equipped gear. Each point in Reflex Penality reduces the total modifer of your Reflex score."],
				"abbreviation": "", "variable": "reflex_penalty", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Speed Penalty": {
				"name": "Speed Penalty", "fieldName": "speedPenalty", "title": "Speed Penalty", "group": "Gear", "descriptions": ["Speed penalty is a a reduction to speed due to armor restrictiveness."],
				"abbreviation": "", "variable": "speed_penalty", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "title": "Combat", "group": "Type", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Durability": {
				"name": "Durability", "fieldName": "durability", "title": "Durability", "group": "Combat", "descriptions": ["During combat encounters, your hit points are equal to your durability score. Your character’s durability is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "", "variable": "durability", "formula": "Character Rank * 10", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Heal Value": {
				"name": "Heal Value", "fieldName": "healValue", "title": "Heal Value", "group": "Combat", "descriptions": ["This value is a standard amount of HP you recover from healing abilities."],
				"abbreviation": "HV", "variable": "hv", "formula": "Character Rank * 2", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Barrier": {
				"name": "Barrier", "fieldName": "barrier", "title": "Barrier", "group": "Combat", "descriptions": ["A character's barrier is a manifestation of their ki as a layer of protection around them. Barrier adds its value in Buffer to the character at the start of each round, as long as they are not Downed or Unconscious."],
				"abbreviation": "", "variable": "barrier", "formula": "prc", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Block": {
				"name": "Block", "fieldName": "block", "title": "Block", "group": "Combat", "descriptions": ["Various types of gear will grant Block as a bonus. Block adds its value in Buffer to the character at the start of each round."],
				"abbreviation": "", "variable": "block", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Armor": {
				"name": "Armor", "fieldName": "armor", "title": "Armor", "group": "Combat", "descriptions": ["Armor reduces all incoming damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "variable": "armor", "formula": "!Gear", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trauma Limit": {
				"name": "Trauma Limit", "fieldName": "traumaLimit", "title": "Trauma Limit", "group": "Combat", "descriptions": ["Trauma Limit is the maximum number of trauma a character can take before they start dying. When a character takes trauma, they compare the number of trauma they have to their trauma limit to determine whether they are downed."],
				"abbreviation": "", "variable": "trauma", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Stress Limit": {
				"name": "Stress Limit", "fieldName": "stressLimit", "title": "Stress Limit", "group": "Combat", "descriptions": ["When taking stress trauma, a number of stress is ignored for the purposes of calculating total trauma. The number of stress that is ignored is based on your stress limit."],
				"abbreviation": "", "variable": "stress", "formula": "3", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Vitality": {
				"name": "Vitality", "fieldName": "vitality", "title": "Vitality", "group": "Combat", "descriptions": ["Vitality represents a character's ability to regain their energy. It is often used as a resource to restore HP, but may also be used to fuel techniques."],
				"abbreviation": "", "variable": "vitality", "formula": "2", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Ki": {
				"name": "Ki", "fieldName": "ki", "title": "Ki", "group": "Combat", "descriptions": ["During combat encounters, your energy is generated from Ki. Some techniques require that you are specifically generating ki and therefore are meant to be utilized during combat. While channelling ki, energy will increase by 1 at the beginning of each round, up to your Ki value."],
				"abbreviation": "", "variable": "ki", "formula": "3", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Armsforce": {
				"name": "Armsforce", "fieldName": "armsforce", "title": "Armsforce", "group": "Combat", "descriptions": ["This is a bonus on damage for many weapons. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Spellforce": {
				"name": "Spellforce", "fieldName": "spellforce", "title": "Spellforce", "group": "Combat", "descriptions": ["This is a bonus on damage for some techniques. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Strikeforce": {
				"name": "Strikeforce", "fieldName": "strikeforce", "title": "Strikeforce", "group": "Combat", "descriptions": ["This is a bonus on damage for some techniques. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "fieldName": "social", "title": "Social", "group": "Type", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Willpower": {
				"name": "Willpower", "fieldName": "willpower", "title": "Willpower", "group": "Social", "descriptions": ["Willpower represents a character's resilience towards those that would attempt to control or coerce them. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to influence them. "],
				"abbreviation": "", "variable": "willpower", "formula": "cnv", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Approval": {
				"name": "Approval", "fieldName": "approval", "title": "Approval", "group": "Social", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "variable": "approval", "formula": "cnv", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Patience": {
				"name": "Patience", "fieldName": "patience", "title": "Patience", "group": "Social", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "variable": "patience", "formula": "pb*10;int", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Tech Slot": {
				"name": "Tech Slot", "fieldName": "techSlot", "title": "Tech Slot", "group": "Type", "descriptions": ["Characters are able to learn a variety of techniques. While many are permanent and therefore always active, some require a person to prepare before having access to them. These techniques always exist in a tech tree. When a tech tree is equipped to a tech slot of its type, the character has access to these techniques."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job Slots": {
				"name": "Job Slots", "fieldName": "jobSlots", "title": "Job Slots", "group": "Tech Slot", "descriptions": ["Job slot techniques are exclusively gained through classes. These techniques fulfill a variety of roles but often will grant the character powerful reaction techniques that allow them to fulfill their role in conflicts."],
				"abbreviation": "", "variable": "techslot-job", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Item Slots": {
				"name": "Item Slots", "fieldName": "itemSlots", "title": "Item Slots", "group": "Tech Slot", "descriptions": [""],
				"abbreviation": "", "variable": "techslot-item", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Active Slots": {
				"name": "Active Slots", "fieldName": "activeSlots", "title": "Active Slots", "group": "Tech Slot", "descriptions": ["Active slot techniques are often offensive in nature but more accurately provide action against another target. This can include attacks with weapons to hurling insults."],
				"abbreviation": "", "variable": "techslot-active", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Support Slots": {
				"name": "Support Slots", "fieldName": "supportSlots", "title": "Support Slots", "group": "Tech Slot", "descriptions": ["Support slot techniques allow one to support themselves or their allies in a variety of ways. This can be directly through healing or enhancement abilities or more indirectly through manipulation of other conditions."],
				"abbreviation": "", "variable": "techslot-support", "formula": "1", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Accurate": {
				"name": "Accurate", "fieldName": "accurate", "title": "Accurate", "group": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity+": {
				"name": "Affinity+", "fieldName": "affinity+", "title": "Affinity+", "group": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"AP (X)": {
				"name": "AP (X)", "fieldName": "aP(X)", "title": "AP (X)", "group": "Technique Trait", "descriptions": ["This technique adds armor piercing. Ignore up to X Armor on the target.", "This weapon is armor piercing. Ignore up to X Armor on the target."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Brutal": {
				"name": "Brutal", "fieldName": "brutal", "title": "Brutal", "group": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Focus+": {
				"name": "Focus+", "fieldName": "focus+", "title": "Focus+", "group": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Material": {
				"name": "Material", "fieldName": "material", "title": "Material", "group": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Simple": {
				"name": "Simple", "fieldName": "simple", "title": "Simple", "group": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Volatile": {
				"name": "Volatile", "fieldName": "volatile", "title": "Volatile", "group": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Vortex": {
				"name": "Vortex", "fieldName": "vortex", "title": "Vortex", "group": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Weapon": {
				"name": "Weapon", "fieldName": "weapon", "title": "Weapon", "group": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wall": {
				"name": "Wall", "fieldName": "wall", "title": "Wall", "group": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Arcing": {
				"name": "Arcing", "fieldName": "arcing", "title": "Arcing", "group": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Shield": {
				"name": "Shield", "fieldName": "shield", "title": "Shield", "group": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Thrown": {
				"name": "Thrown", "fieldName": "thrown", "title": "Thrown", "group": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Two-Handed": {
				"name": "Two-Handed", "fieldName": "two-Handed", "title": "Two-Handed", "group": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Loud": {
				"name": "Loud", "fieldName": "loud", "title": "Loud", "group": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Impact (X)": {
				"name": "Impact (X)", "fieldName": "impact(X)", "title": "Impact (X)", "group": "Item Trait", "descriptions": ["When this weapon is used as a part of a full action, this weapon deals X extra damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Explosive (X/Y)": {
				"name": "Explosive (X/Y)", "fieldName": "explosive(X/Y)", "title": "Explosive (X/Y)", "group": "Item Trait", "descriptions": ["When this weapon is used as a part of a full action, this weapon can explode on impact. Attacks made with this weapon affect characters within a radius of X spaces, drawn from the impact point, and deals Y extra damage to all characters in the area."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Flammable": {
				"name": "Flammable", "fieldName": "flammable", "title": "Flammable", "group": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Flexible": {
				"name": "Flexible", "fieldName": "flexible", "title": "Flexible", "group": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Frozen": {
				"name": "Frozen", "fieldName": "frozen", "title": "Frozen", "group": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sharp": {
				"name": "Sharp", "fieldName": "sharp", "title": "Sharp", "group": "Material Trait", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sturdy": {
				"name": "Sturdy", "fieldName": "sturdy", "title": "Sturdy", "group": "Material Trait", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Transparent": {
				"name": "Transparent", "fieldName": "transparent", "title": "Transparent", "group": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Downed": {
				"name": "Downed", "fieldName": "downed", "title": "Downed", "group": "Status", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Engaged": {
				"name": "Engaged", "fieldName": "engaged", "title": "Engaged", "group": "Status", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Ethereal": {
				"name": "Ethereal", "fieldName": "ethereal", "title": "Ethereal", "group": "Status", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Grappled": {
				"name": "Grappled", "fieldName": "grappled", "title": "Grappled", "group": "Status", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hidden": {
				"name": "Hidden", "fieldName": "hidden", "title": "Hidden", "group": "Status", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative Penalty": {
				"name": "Initiative Penalty", "fieldName": "initiativePenalty", "title": "Initiative Penalty", "group": "Status", "descriptions": [""],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Invisible": {
				"name": "Invisible", "fieldName": "invisible", "title": "Invisible", "group": "Status", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Restrained": {
				"name": "Restrained", "fieldName": "restrained", "title": "Restrained", "group": "Status", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Unconscious": {
				"name": "Unconscious", "fieldName": "unconscious", "title": "Unconscious", "group": "Status", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Aflame": {
				"name": "Aflame", "fieldName": "aflame", "title": "Aflame", "group": "Condition", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Angered": {
				"name": "Angered", "fieldName": "angered", "title": "Angered", "group": "Condition", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chilled": {
				"name": "Chilled", "fieldName": "chilled", "title": "Chilled", "group": "Condition", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Delayed": {
				"name": "Delayed", "fieldName": "delayed", "title": "Delayed", "group": "Condition", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Disgusted": {
				"name": "Disgusted", "fieldName": "disgusted", "title": "Disgusted", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Dying": {
				"name": "Dying", "fieldName": "dying", "title": "Dying", "group": "Condition", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Empowered": {
				"name": "Empowered", "fieldName": "empowered", "title": "Empowered", "group": "Condition", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Encouraged": {
				"name": "Encouraged", "fieldName": "encouraged", "title": "Encouraged", "group": "Condition", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Encumbered": {
				"name": "Encumbered", "fieldName": "encumbered", "title": "Encumbered", "group": "Condition", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Frightened": {
				"name": "Frightened", "fieldName": "frightened", "title": "Frightened", "group": "Condition", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Hasted": {
				"name": "Hasted", "fieldName": "hasted", "title": "Hasted", "group": "Condition", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Immobilized": {
				"name": "Immobilized", "fieldName": "immobilized", "title": "Immobilized", "group": "Condition", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Impaired": {
				"name": "Impaired", "fieldName": "impaired", "title": "Impaired", "group": "Condition", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Joyful": {
				"name": "Joyful", "fieldName": "joyful", "title": "Joyful", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Launched": {
				"name": "Launched", "fieldName": "launched", "title": "Launched", "group": "Condition", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Paralyzed": {
				"name": "Paralyzed", "fieldName": "paralyzed", "title": "Paralyzed", "group": "Condition", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Prone": {
				"name": "Prone", "fieldName": "prone", "title": "Prone", "group": "Condition", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Saddened": {
				"name": "Saddened", "fieldName": "saddened", "title": "Saddened", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sickened": {
				"name": "Sickened", "fieldName": "sickened", "title": "Sickened", "group": "Condition", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Staggered": {
				"name": "Staggered", "fieldName": "staggered", "title": "Staggered", "group": "Condition", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Stunned": {
				"name": "Stunned", "fieldName": "stunned", "title": "Stunned", "group": "Condition", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Surprised": {
				"name": "Surprised", "fieldName": "surprised", "title": "Surprised", "group": "Condition", "descriptions": ["-"],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Basic Set": {
				"name": "Style_Basic Set", "fieldName": "basicSet", "title": "Basic Set", "group": "Style", "descriptions": ["A standard list of techniques. Anyone can perform these techniques. "],
				"abbreviation": "", "variable": "stylebasicSet{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "swordplay", "title": "Swordplay", "group": "Style", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "variable": "styleswordplay{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "kiExtension", "title": "Ki Extension", "group": "Style", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "variable": "stylekiExtension{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "title": "Acrobatics", "group": "Skill", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "skillacrobatics{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "title": "Agility", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "skillagility{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "title": "Analyze", "group": "Skill", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "variable": "skillanalyze{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "title": "Build", "group": "Skill", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "variable": "skillbuild{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "title": "Channel", "group": "Skill", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "variable": "skillchannel{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "title": "Charm", "group": "Skill", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "variable": "skillcharm{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "title": "Command", "group": "Skill", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "variable": "skillcommand{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "title": "Concoct", "group": "Skill", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "variable": "skillconcoct{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "title": "Cook", "group": "Skill", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "variable": "skillcook{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "title": "Deception", "group": "Skill", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "variable": "skilldeception{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "title": "Disguise", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "skilldisguise{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "title": "Empathy", "group": "Skill", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "variable": "skillempathy{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "title": "Enchant", "group": "Skill", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "variable": "skillenchant{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "title": "Finesse", "group": "Skill", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "variable": "skillfinesse{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "title": "Flexibility", "group": "Skill", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "skillflexibility{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "title": "Grappling", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "skillgrappling{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "title": "Heal", "group": "Skill", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "variable": "skillheal{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "title": "Intimidation", "group": "Skill", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "variable": "skillintimidation{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "title": "Leadership", "group": "Skill", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "variable": "skillleadership{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "title": "Maneuver", "group": "Skill", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "variable": "skillmaneuver{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "title": "Medicine", "group": "Skill", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "variable": "skillmedicine{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "title": "Might", "group": "Skill", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "variable": "skillmight{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "title": "Negotiation", "group": "Skill", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "variable": "skillnegotiation{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "title": "Palming", "group": "Skill", "descriptions": [""],
				"abbreviation": "", "variable": "skillpalming{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "title": "Physique", "group": "Skill", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "variable": "skillphysique{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "title": "Pilot", "group": "Skill", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "variable": "skillpilot{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "title": "Resonance", "group": "Skill", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "variable": "skillresonance{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "title": "Search", "group": "Skill", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "variable": "skillsearch{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "title": "Shoot", "group": "Skill", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "variable": "skillshoot{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "title": "Skirmish", "group": "Skill", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "variable": "skillskirmish{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "title": "Sneak", "group": "Skill", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "variable": "skillsneak{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "title": "Survival", "group": "Skill", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "variable": "skillsurvival{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "title": "Throw", "group": "Skill", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "variable": "skillthrow{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "title": "Tinker", "group": "Skill", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "variable": "skilltinker{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "title": "Traversal", "group": "Skill", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "variable": "skilltraversal{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Minere": {
				"name": "Language_Minere", "fieldName": "minere", "title": "Minere", "group": "Language", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "variable": "languageminere{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Junal": {
				"name": "Language_Junal", "fieldName": "junal", "title": "Junal", "group": "Language", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "variable": "languagejunal{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Apollen": {
				"name": "Language_Apollen", "fieldName": "apollen", "title": "Apollen", "group": "Language", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "variable": "languageapollen{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Lib": {
				"name": "Language_Lib", "fieldName": "lib", "title": "Lib", "group": "Language", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "variable": "languagelib{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Cert": {
				"name": "Language_Cert", "fieldName": "cert", "title": "Cert", "group": "Language", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "variable": "languagecert{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Byric": {
				"name": "Language_Byric", "fieldName": "byric", "title": "Byric", "group": "Language", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "variable": "languagebyric{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Dustell": {
				"name": "Language_Dustell", "fieldName": "dustell", "title": "Dustell", "group": "Language", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "variable": "languagedustell{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Muralic": {
				"name": "Language_Muralic", "fieldName": "muralic", "title": "Muralic", "group": "Language", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "variable": "languagemuralic{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shira": {
				"name": "Language_Shira", "fieldName": "shira", "title": "Shira", "group": "Language", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "variable": "languageshira{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Ciel": {
				"name": "Language_Ciel", "fieldName": "ciel", "title": "Ciel", "group": "Language", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "variable": "languageciel{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Citeq": {
				"name": "Language_Citeq", "fieldName": "citeq", "title": "Citeq", "group": "Language", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "variable": "languageciteq{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Manstan": {
				"name": "Language_Manstan", "fieldName": "manstan", "title": "Manstan", "group": "Language", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "languagemanstan{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Salkan": {
				"name": "Language_Salkan", "fieldName": "salkan", "title": "Salkan", "group": "Language", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "variable": "languagesalkan{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Sansic": {
				"name": "Language_Sansic", "fieldName": "sansic", "title": "Sansic", "group": "Language", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "languagesansic{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Silq": {
				"name": "Language_Silq", "fieldName": "silq", "title": "Silq", "group": "Language", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "variable": "languagesilq{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Kleikan": {
				"name": "Language_Kleikan", "fieldName": "kleikan", "title": "Kleikan", "group": "Language", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "variable": "languagekleikan{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Crinere": {
				"name": "Language_Crinere", "fieldName": "crinere", "title": "Crinere", "group": "Language", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "variable": "languagecrinere{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Palmic": {
				"name": "Language_Palmic", "fieldName": "palmic", "title": "Palmic", "group": "Language", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "variable": "languagepalmic{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shorespeak": {
				"name": "Language_Shorespeak", "fieldName": "shorespeak", "title": "Shorespeak", "group": "Language", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "variable": "languageshorespeak{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Verdeni": {
				"name": "Language_Verdeni", "fieldName": "verdeni", "title": "Verdeni", "group": "Language", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "variable": "languageverdeni{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Vulca": {
				"name": "Language_Vulca", "fieldName": "vulca", "title": "Vulca", "group": "Language", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "variable": "languagevulca{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Emotion": {
				"name": "Language_Emotion", "fieldName": "emotion", "title": "Emotion", "group": "Language", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "variable": "languageemotion{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Empathy": {
				"name": "Language_Empathy", "fieldName": "empathy", "title": "Empathy", "group": "Language", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "variable": "languageempathy{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Wolfwarg": {
				"name": "Language_Wolfwarg", "fieldName": "wolfwarg", "title": "Wolfwarg", "group": "Language", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "variable": "languagewolfwarg{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Jovean": {
				"name": "Language_Jovean", "fieldName": "jovean", "title": "Jovean", "group": "Language", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "variable": "languagejovean{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Mytikan": {
				"name": "Language_Mytikan", "fieldName": "mytikan", "title": "Mytikan", "group": "Language", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "variable": "languagemytikan{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Academics": {
				"name": "Lore_Academics", "fieldName": "academics", "title": "Academics", "group": "Lore", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "variable": "loreacademics{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "title": "Health", "group": "Lore", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "variable": "lorehealth{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "title": "Mana", "group": "Lore", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "variable": "loremana{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "title": "Mathematics", "group": "Lore", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "variable": "loremathematics{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "title": "Nature", "group": "Lore", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "variable": "lorenature{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "title": "School", "group": "Lore", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "variable": "loreschool{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "title": "Spirit", "group": "Lore", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "variable": "lorespirit{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "title": "Warfare", "group": "Lore", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "variable": "lorewarfare{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "title": "Zoology", "group": "Lore", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "variable": "lorezoology{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Profession": {
				"name": "Lore_Profession", "fieldName": "profession", "title": "Profession", "group": "Lore", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "variable": "loreprofession{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "title": "Farming", "group": "Lore", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "variable": "lorefarming{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "title": "Fishing", "group": "Lore", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "variable": "lorefishing{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "title": "Hunting", "group": "Lore", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "variable": "lorehunting{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "title": "Legal", "group": "Lore", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "variable": "lorelegal{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "title": "Mercantile", "group": "Lore", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "variable": "loremercantile{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "title": "Mining", "group": "Lore", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "variable": "loremining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Craftmanship": {
				"name": "Lore_Craftmanship", "fieldName": "craftmanship", "title": "Craftmanship", "group": "Lore", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."]
				,
				"abbreviation": "", "variable": "lorecraftmanship{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "title": "Alchemy", "group": "Lore", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "variable": "lorealchemy{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "title": "Architecture", "group": "Lore", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "variable": "lorearchitecture{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "title": "Brewing", "group": "Lore", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "variable": "lorebrewing{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "title": "Cooking", "group": "Lore", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "variable": "lorecooking{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "title": "Engineering", "group": "Lore", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "variable": "loreengineering{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "title": "Glassblowing", "group": "Lore", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "variable": "loreglassblowing{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "title": "Leatherworking", "group": "Lore", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "variable": "loreleatherworking{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "title": "Sculpting", "group": "Lore", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "variable": "loresculpting{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "title": "Smithing", "group": "Lore", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "variable": "loresmithing{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "title": "Weaving", "group": "Lore", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "variable": "loreweaving{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Geography": {
				"name": "Lore_Geography", "fieldName": "geography", "title": "Geography", "group": "Lore", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "variable": "loregeography{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "title": "Aridsha", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "lorearidsha{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "title": "Ceres", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "loreceres{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "title": "Colswei", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "lorecolswei{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "title": "Khem", "group": "Lore", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "lorekhem{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "title": "Novus", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "lorenovus{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "title": "Walthair", "group": "Lore", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "lorewalthair{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "title": "Wayling", "group": "Lore", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "lorewayling{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "etherealPlane", "title": "Ethereal Plane", "group": "Lore", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "variable": "loreetherealPlane{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_History": {
				"name": "Lore_History", "fieldName": "history", "title": "History", "group": "Lore", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "variable": "lorehistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridshaHistory", "title": "Aridsha History", "group": "Lore", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "lorearidshaHistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceresHistory", "title": "Ceres History", "group": "Lore", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "loreceresHistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colsweiHistory", "title": "Colswei History", "group": "Lore", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "lorecolsweiHistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khemHistory", "title": "Khem History", "group": "Lore", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "lorekhemHistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novusHistory", "title": "Novus History", "group": "Lore", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "lorenovusHistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthairHistory", "title": "Walthair History", "group": "Lore", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "lorewalthairHistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "waylingHistory", "title": "Wayling History", "group": "Lore", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "lorewaylingHistory{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Culture": {
				"name": "Lore_Culture", "fieldName": "culture", "title": "Culture", "group": "Lore", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "variable": "loreculture{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "title": "Art", "group": "Lore", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "variable": "loreart{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "title": "Etiquette", "group": "Lore", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "variable": "loreetiquette{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "title": "Fashion", "group": "Lore", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "variable": "lorefashion{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "title": "Games", "group": "Lore", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "variable": "loregames{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "title": "Music", "group": "Lore", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "variable": "loremusic{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "title": "Scribing", "group": "Lore", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "variable": "lorescribing{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "title": "Theater", "group": "Lore", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "variable": "loretheater{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Religion": {
				"name": "Lore_Religion", "fieldName": "religion", "title": "Religion", "group": "Lore", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "variable": "lorereligion{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "churchOfKongkwei", "title": "Church of Kongkwei", "group": "Lore", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "variable": "lorechurchOfKongkwei{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "title": "Guidance", "group": "Lore", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "variable": "loreguidance{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life'sCircle", "title": "Life's Circle", "group": "Lore", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "variable": "lorelife'sCircle{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "oceanCourt", "title": "Ocean Court", "group": "Lore", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "variable": "loreoceanCourt{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "title": "Sylvan", "group": "Lore", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "variable": "loresylvan{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "title": "Zushaon", "group": "Lore", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "variable": "lorezushaon{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Trainee": {
				"name": "Job_Trainee", "fieldName": "trainee", "title": "Trainee", "group": "Job", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "variable": "jobtrainee{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "interceptor", "title": "Interceptor", "group": "Job", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "variable": "jobinterceptor{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "guardian", "title": "Guardian", "group": "Job", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "variable": "jobguardian{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "spellslinger", "title": "Spellslinger", "group": "Job", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "variable": "jobspellslinger{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "warrior", "title": "Warrior", "group": "Job", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "variable": "jobwarrior{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "rogue", "title": "Rogue", "group": "Job", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "variable": "jobrogue{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "scholar", "title": "Scholar", "group": "Job", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "variable": "jobscholar{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "physician", "title": "Physician", "group": "Job", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "variable": "jobphysician{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Generalist": {
				"name": "Role_Generalist", "fieldName": "generalist", "title": "Generalist", "group": "Role", "descriptions": ["Very general"],
				"abbreviation": "", "variable": "rolegeneralist{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Defender": {
				"name": "Role_Defender", "fieldName": "defender", "title": "Defender", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "roledefender{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Athlete": {
				"name": "Role_Athlete", "fieldName": "athlete", "title": "Athlete", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "roleathlete{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Skirmisher": {
				"name": "Role_Skirmisher", "fieldName": "skirmisher", "title": "Skirmisher", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "roleskirmisher{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Marksman": {
				"name": "Role_Marksman", "fieldName": "marksman", "title": "Marksman", "group": "Role", "descriptions": [""],
				"abbreviation": "", "variable": "rolemarksman{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Break Free": {
				"name": "Technique_Break Free", "fieldName": "breakFree", "title": "Break Free", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebreakFree{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dash": {
				"name": "Technique_Dash", "fieldName": "dash", "title": "Dash", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedash{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Escape": {
				"name": "Technique_Escape", "fieldName": "escape", "title": "Escape", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueescape{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grapple": {
				"name": "Technique_Grapple", "fieldName": "grapple", "title": "Grapple", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegrapple{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hide": {
				"name": "Technique_Hide", "fieldName": "hide", "title": "Hide", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquehide{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Mount": {
				"name": "Technique_Mount", "fieldName": "mount", "title": "Mount", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemount{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prepare": {
				"name": "Technique_Prepare", "fieldName": "prepare", "title": "Prepare", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueprepare{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Reposition": {
				"name": "Technique_Reposition", "fieldName": "reposition", "title": "Reposition", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquereposition{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Seach": {
				"name": "Technique_Seach", "fieldName": "seach", "title": "Seach", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueseach{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aid": {
				"name": "Technique_Aid", "fieldName": "aid", "title": "Aid", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueaid{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Encourage": {
				"name": "Technique_Encourage", "fieldName": "encourage", "title": "Encourage", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueencourage{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stabilize": {
				"name": "Technique_Stabilize", "fieldName": "stabilize", "title": "Stabilize", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquestabilize{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skill Check": {
				"name": "Technique_Skill Check", "fieldName": "skillCheck", "title": "Skill Check", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueskillCheck{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Rapport": {
				"name": "Technique_Build Rapport", "fieldName": "buildRapport", "title": "Build Rapport", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebuildRapport{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Pressure": {
				"name": "Technique_Build Pressure", "fieldName": "buildPressure", "title": "Build Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebuildPressure{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Captivate": {
				"name": "Technique_Captivate", "fieldName": "captivate", "title": "Captivate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecaptivate{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demand": {
				"name": "Technique_Demand", "fieldName": "demand", "title": "Demand", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedemand{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grab an Edge": {
				"name": "Technique_Grab an Edge", "fieldName": "grabAnEdge", "title": "Grab an Edge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegrabAnEdge{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Interact": {
				"name": "Technique_Interact", "fieldName": "interact", "title": "Interact", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueinteract{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Wind": {
				"name": "Technique_Second Wind", "fieldName": "secondWind", "title": "Second Wind", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesecondWind{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Breath": {
				"name": "Technique_Second Breath", "fieldName": "secondBreath", "title": "Second Breath", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesecondBreath{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undaunted": {
				"name": "Technique_Undaunted", "fieldName": "undaunted", "title": "Undaunted", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueundaunted{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Strike": {
				"name": "Technique_Preemptive Strike", "fieldName": "preemptiveStrike", "title": "Preemptive Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepreemptiveStrike{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Stagger": {
				"name": "Technique_Preemptive Stagger", "fieldName": "preemptiveStagger", "title": "Preemptive Stagger", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepreemptiveStagger{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Critical Maim": {
				"name": "Technique_Critical Maim", "fieldName": "criticalMaim", "title": "Critical Maim", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecriticalMaim{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellshot": {
				"name": "Technique_Spellshot", "fieldName": "spellshot", "title": "Spellshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquespellshot{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Follow-Up Spellshot": {
				"name": "Technique_Follow-Up Spellshot", "fieldName": "follow-UpSpellshot", "title": "Follow-Up Spellshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefollow-UpSpellshot{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bursting Spellshot": {
				"name": "Technique_Bursting Spellshot", "fieldName": "burstingSpellshot", "title": "Bursting Spellshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueburstingSpellshot{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior": {
				"name": "Technique_Savior", "fieldName": "savior", "title": "Savior", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesavior{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knock Away Savior": {
				"name": "Technique_Knock Away Savior", "fieldName": "knockAwaySavior", "title": "Knock Away Savior", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueknockAwaySavior{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior's Retaliation": {
				"name": "Technique_Savior's Retaliation", "fieldName": "savior'sRetaliation", "title": "Savior's Retaliation", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesavior'sRetaliation{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellstrike": {
				"name": "Technique_Spellstrike", "fieldName": "spellstrike", "title": "Spellstrike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquespellstrike{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Skirmish": {
				"name": "Technique_Power Skirmish", "fieldName": "powerSkirmish", "title": "Power Skirmish", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepowerSkirmish{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneak Attack": {
				"name": "Technique_Sneak Attack", "fieldName": "sneakAttack", "title": "Sneak Attack", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesneakAttack{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneaky Follow-Up": {
				"name": "Technique_Sneaky Follow-Up", "fieldName": "sneakyFollow-Up", "title": "Sneaky Follow-Up", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesneakyFollow-Up{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Assassinate": {
				"name": "Technique_Assassinate", "fieldName": "assassinate", "title": "Assassinate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueassassinate{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Emergency Care": {
				"name": "Technique_Emergency Care", "fieldName": "emergencyCare", "title": "Emergency Care", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueemergencyCare{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightingale": {
				"name": "Technique_Nightingale", "fieldName": "nightingale", "title": "Nightingale", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquenightingale{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Rhapsody": {
				"name": "Technique_Rhapsody", "fieldName": "rhapsody", "title": "Rhapsody", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquerhapsody{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Metamagic": {
				"name": "Technique_Metamagic", "fieldName": "metamagic", "title": "Metamagic", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemetamagic{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Strategize": {
				"name": "Technique_Strategize", "fieldName": "strategize", "title": "Strategize", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquestrategize{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Foresight": {
				"name": "Technique_Foresight", "fieldName": "foresight", "title": "Foresight", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueforesight{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Saw That Coming": {
				"name": "Technique_Saw That Coming", "fieldName": "sawThatComing", "title": "Saw That Coming", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesawThatComing{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_As You May Recall": {
				"name": "Technique_As You May Recall", "fieldName": "asYouMayRecall", "title": "As You May Recall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueasYouMayRecall{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Generalist": {
				"name": "Technique_Generalist", "fieldName": "generalist", "title": "Generalist", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegeneralist{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender": {
				"name": "Technique_Defender", "fieldName": "defender", "title": "Defender", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedefender{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender II": {
				"name": "Technique_Defender II", "fieldName": "defenderII", "title": "Defender II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedefenderII{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Will": {
				"name": "Technique_Defender's Will", "fieldName": "defender'sWill", "title": "Defender's Will", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedefender'sWill{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Taunt": {
				"name": "Technique_Defender's Taunt", "fieldName": "defender'sTaunt", "title": "Defender's Taunt", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedefender'sTaunt{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Recovery": {
				"name": "Technique_Defender's Recovery", "fieldName": "defender'sRecovery", "title": "Defender's Recovery", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedefender'sRecovery{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher": {
				"name": "Technique_Skirmisher", "fieldName": "skirmisher", "title": "Skirmisher", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueskirmisher{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher II": {
				"name": "Technique_Skirmisher II", "fieldName": "skirmisherII", "title": "Skirmisher II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueskirmisherII{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Step": {
				"name": "Technique_Skirmisher's Step", "fieldName": "skirmisher'sStep", "title": "Skirmisher's Step", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueskirmisher'sStep{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Strike": {
				"name": "Technique_Skirmisher's Strike", "fieldName": "skirmisher'sStrike", "title": "Skirmisher's Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueskirmisher'sStrike{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman": {
				"name": "Technique_Marksman", "fieldName": "marksman", "title": "Marksman", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemarksman{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman II": {
				"name": "Technique_Marksman II", "fieldName": "marksmanII", "title": "Marksman II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemarksmanII{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Longshot": {
				"name": "Technique_Marksman's Longshot", "fieldName": "marksman'sLongshot", "title": "Marksman's Longshot", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemarksman'sLongshot{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Sight": {
				"name": "Technique_Marksman's Sight", "fieldName": "marksman'sSight", "title": "Marksman's Sight", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemarksman'sSight{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Strike": {
				"name": "Technique_Marksman's Strike", "fieldName": "marksman'sStrike", "title": "Marksman's Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemarksman'sStrike{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete": {
				"name": "Technique_Athlete", "fieldName": "athlete", "title": "Athlete", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueathlete{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete II": {
				"name": "Technique_Athlete II", "fieldName": "athleteII", "title": "Athlete II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueathleteII{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete's Sprint": {
				"name": "Technique_Athlete's Sprint", "fieldName": "athlete'sSprint", "title": "Athlete's Sprint", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueathlete'sSprint{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete's Reach": {
				"name": "Technique_Athlete's Reach", "fieldName": "athlete'sReach", "title": "Athlete's Reach", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueathlete'sReach{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bounding Sprint": {
				"name": "Technique_Bounding Sprint", "fieldName": "boundingSprint", "title": "Bounding Sprint", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueboundingSprint{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Away": {
				"name": "Technique_Skulk Away", "fieldName": "skulkAway", "title": "Skulk Away", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueskulkAway{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Then Hide": {
				"name": "Technique_Skulk Then Hide", "fieldName": "skulkThenHide", "title": "Skulk Then Hide", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueskulkThenHide{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_First Aid": {
				"name": "Technique_First Aid", "fieldName": "firstAid", "title": "First Aid", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefirstAid{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleansing Aid": {
				"name": "Technique_Cleansing Aid", "fieldName": "cleansingAid", "title": "Cleansing Aid", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecleansingAid{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Environmental Awareness": {
				"name": "Technique_Environmental Awareness", "fieldName": "environmentalAwareness", "title": "Environmental Awareness", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueenvironmentalAwareness{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Eclectic Knowledge": {
				"name": "Technique_Eclectic Knowledge", "fieldName": "eclecticKnowledge", "title": "Eclectic Knowledge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueeclecticKnowledge{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Point of Clarity": {
				"name": "Technique_Point of Clarity", "fieldName": "pointOfClarity", "title": "Point of Clarity", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepointOfClarity{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pole Vault": {
				"name": "Technique_Pole Vault", "fieldName": "poleVault", "title": "Pole Vault", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepoleVault{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Draw": {
				"name": "Technique_Quick Draw", "fieldName": "quickDraw", "title": "Quick Draw", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquequickDraw{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike": {
				"name": "Technique_Extension Strike", "fieldName": "extensionStrike", "title": "Extension Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueextensionStrike{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Step Extension": {
				"name": "Technique_Step Extension", "fieldName": "stepExtension", "title": "Step Extension", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquestepExtension{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Extension": {
				"name": "Technique_Lasting Extension", "fieldName": "lastingExtension", "title": "Lasting Extension", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelastingExtension{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Far Strike": {
				"name": "Technique_Far Strike", "fieldName": "farStrike", "title": "Far Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefarStrike{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike +": {
				"name": "Technique_Extension Strike +", "fieldName": "extensionStrike+", "title": "Extension Strike +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueextensionStrike+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defense Piercer ": {
				"name": "Technique_Defense Piercer ", "fieldName": "defensePiercer", "title": "Defense Piercer ", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedefensePiercer{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash": {
				"name": "Technique_Quick Slash", "fieldName": "quickSlash", "title": "Quick Slash", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquequickSlash{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Precision Blade": {
				"name": "Technique_Precision Blade", "fieldName": "precisionBlade", "title": "Precision Blade", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueprecisionBlade{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Armor Piercer": {
				"name": "Technique_Armor Piercer", "fieldName": "armorPiercer", "title": "Armor Piercer", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquearmorPiercer{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash II": {
				"name": "Technique_Quick Slash II", "fieldName": "quickSlashII", "title": "Quick Slash II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquequickSlashII{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave": {
				"name": "Technique_Cleave", "fieldName": "cleave", "title": "Cleave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecleave{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crushing Blade": {
				"name": "Technique_Crushing Blade", "fieldName": "crushingBlade", "title": "Crushing Blade", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecrushingBlade{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave": {
				"name": "Technique_Great Cleave", "fieldName": "greatCleave", "title": "Great Cleave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegreatCleave{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave +": {
				"name": "Technique_Cleave +", "fieldName": "cleave+", "title": "Cleave +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecleave+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sudden Cleave": {
				"name": "Technique_Sudden Cleave", "fieldName": "suddenCleave", "title": "Sudden Cleave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesuddenCleave{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave II": {
				"name": "Technique_Great Cleave II", "fieldName": "greatCleaveII", "title": "Great Cleave II", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegreatCleaveII{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Flex": {
				"name": "Technique_Power Flex", "fieldName": "powerFlex", "title": "Power Flex", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepowerFlex{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crush Knuckle": {
				"name": "Technique_Crush Knuckle", "fieldName": "crushKnuckle", "title": "Crush Knuckle", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecrushKnuckle{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Impact Knuckle": {
				"name": "Technique_Impact Knuckle", "fieldName": "impactKnuckle", "title": "Impact Knuckle", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueimpactKnuckle{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knuckle Flurry": {
				"name": "Technique_Knuckle Flurry", "fieldName": "knuckleFlurry", "title": "Knuckle Flurry", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueknuckleFlurry{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Water Blast": {
				"name": "Technique_Water Blast", "fieldName": "waterBlast", "title": "Water Blast", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewaterBlast{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser": {
				"name": "Technique_Geyser", "fieldName": "geyser", "title": "Geyser", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegeyser{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser Line": {
				"name": "Technique_Geyser Line", "fieldName": "geyserLine", "title": "Geyser Line", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegeyserLine{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surf": {
				"name": "Technique_Surf", "fieldName": "surf", "title": "Surf", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesurf{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Geyser Line": {
				"name": "Technique_Great Geyser Line", "fieldName": "greatGeyserLine", "title": "Great Geyser Line", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegreatGeyserLine{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tidal Wave": {
				"name": "Technique_Tidal Wave", "fieldName": "tidalWave", "title": "Tidal Wave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquetidalWave{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Surge": {
				"name": "Technique_Sand Surge", "fieldName": "sandSurge", "title": "Sand Surge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesandSurge{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Spout": {
				"name": "Technique_Sand Spout", "fieldName": "sandSpout", "title": "Sand Spout", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesandSpout{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Wave": {
				"name": "Technique_Sand Wave", "fieldName": "sandWave", "title": "Sand Wave", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesandWave{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Launcher": {
				"name": "Technique_Sand Launcher", "fieldName": "sandLauncher", "title": "Sand Launcher", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesandLauncher{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sicken": {
				"name": "Technique_Sicken", "fieldName": "sicken", "title": "Sicken", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesicken{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spores": {
				"name": "Technique_Spores", "fieldName": "spores", "title": "Spores", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquespores{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sickening Cloud": {
				"name": "Technique_Sickening Cloud", "fieldName": "sickeningCloud", "title": "Sickening Cloud", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesickeningCloud{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Virulent Spores": {
				"name": "Technique_Virulent Spores", "fieldName": "virulentSpores", "title": "Virulent Spores", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquevirulentSpores{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Firebolt": {
				"name": "Technique_Firebolt", "fieldName": "firebolt", "title": "Firebolt", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefirebolt{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flame Arrow": {
				"name": "Technique_Flame Arrow", "fieldName": "flameArrow", "title": "Flame Arrow", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueflameArrow{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireball": {
				"name": "Technique_Fireball", "fieldName": "fireball", "title": "Fireball", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefireball{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireblast": {
				"name": "Technique_Fireblast", "fieldName": "fireblast", "title": "Fireblast", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefireblast{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ragnarok": {
				"name": "Technique_Ragnarok", "fieldName": "ragnarok", "title": "Ragnarok", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueragnarok{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bonfire": {
				"name": "Technique_Bonfire", "fieldName": "bonfire", "title": "Bonfire", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebonfire{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wall of Fire": {
				"name": "Technique_Wall of Fire", "fieldName": "wallOfFire", "title": "Wall of Fire", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewallOfFire{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field of Flame": {
				"name": "Technique_Field of Flame", "fieldName": "fieldOfFlame", "title": "Field of Flame", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefieldOfFlame{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Shaft": {
				"name": "Technique_Lightning Shaft", "fieldName": "lightningShaft", "title": "Lightning Shaft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelightningShaft{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shock": {
				"name": "Technique_Shock", "fieldName": "shock", "title": "Shock", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueshock{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Bolt": {
				"name": "Technique_Lightning Bolt", "fieldName": "lightningBolt", "title": "Lightning Bolt", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelightningBolt{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Plasma Arc": {
				"name": "Technique_Plasma Arc", "fieldName": "plasmaArc", "title": "Plasma Arc", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueplasmaArc{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fulgor": {
				"name": "Technique_Fulgor", "fieldName": "fulgor", "title": "Fulgor", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefulgor{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Snap": {
				"name": "Technique_Cold Snap", "fieldName": "coldSnap", "title": "Cold Snap", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecoldSnap{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Frostbite": {
				"name": "Technique_Frostbite", "fieldName": "frostbite", "title": "Frostbite", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefrostbite{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezebind": {
				"name": "Technique_Freezebind", "fieldName": "freezebind", "title": "Freezebind", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefreezebind{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Burst": {
				"name": "Technique_Cold Burst", "fieldName": "coldBurst", "title": "Cold Burst", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecoldBurst{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Front": {
				"name": "Technique_Cold Front", "fieldName": "coldFront", "title": "Cold Front", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecoldFront{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Diamond Dust": {
				"name": "Technique_Diamond Dust", "fieldName": "diamondDust", "title": "Diamond Dust", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquediamondDust{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Bullet": {
				"name": "Technique_Wind Bullet", "fieldName": "windBullet", "title": "Wind Bullet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewindBullet{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gust": {
				"name": "Technique_Gust", "fieldName": "gust", "title": "Gust", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegust{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Windsweep": {
				"name": "Technique_Windsweep", "fieldName": "windsweep", "title": "Windsweep", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewindsweep{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gale": {
				"name": "Technique_Gale", "fieldName": "gale", "title": "Gale", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegale{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Darkness": {
				"name": "Technique_Darkness", "fieldName": "darkness", "title": "Darkness", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedarkness{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Wall": {
				"name": "Technique_Shadow Wall", "fieldName": "shadowWall", "title": "Shadow Wall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueshadowWall{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightfall": {
				"name": "Technique_Nightfall", "fieldName": "nightfall", "title": "Nightfall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquenightfall{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fog Cloud": {
				"name": "Technique_Fog Cloud", "fieldName": "fogCloud", "title": "Fog Cloud", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefogCloud{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sleet": {
				"name": "Technique_Sleet", "fieldName": "sleet", "title": "Sleet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesleet{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezing Sleet": {
				"name": "Technique_Freezing Sleet", "fieldName": "freezingSleet", "title": "Freezing Sleet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefreezingSleet{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hail": {
				"name": "Technique_Hail", "fieldName": "hail", "title": "Hail", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquehail{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Binding Sleet": {
				"name": "Technique_Binding Sleet", "fieldName": "bindingSleet", "title": "Binding Sleet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebindingSleet{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ice Storm": {
				"name": "Technique_Ice Storm", "fieldName": "iceStorm", "title": "Ice Storm", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueiceStorm{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fimbulwinter": {
				"name": "Technique_Fimbulwinter", "fieldName": "fimbulwinter", "title": "Fimbulwinter", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefimbulwinter{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Smoke Cloud": {
				"name": "Technique_Smoke Cloud", "fieldName": "smokeCloud", "title": "Smoke Cloud", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesmokeCloud{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burning Smoke": {
				"name": "Technique_Burning Smoke", "fieldName": "burningSmoke", "title": "Burning Smoke", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueburningSmoke{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Choking Smoke": {
				"name": "Technique_Choking Smoke", "fieldName": "chokingSmoke", "title": "Choking Smoke", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquechokingSmoke{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Acceleration": {
				"name": "Technique_Acceleration", "fieldName": "acceleration", "title": "Acceleration", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueacceleration{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Vault": {
				"name": "Technique_Power Vault", "fieldName": "powerVault", "title": "Power Vault", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepowerVault{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Expeditious": {
				"name": "Technique_Expeditious", "fieldName": "expeditious", "title": "Expeditious", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueexpeditious{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Climb": {
				"name": "Technique_Quick Climb", "fieldName": "quickClimb", "title": "Quick Climb", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquequickClimb{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Swim": {
				"name": "Technique_Quick Swim", "fieldName": "quickSwim", "title": "Quick Swim", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquequickSwim{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Poise": {
				"name": "Technique_Poise", "fieldName": "poise", "title": "Poise", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepoise{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cat Fall": {
				"name": "Technique_Cat Fall", "fieldName": "catFall", "title": "Cat Fall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecatFall{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kip Up": {
				"name": "Technique_Kip Up", "fieldName": "kipUp", "title": "Kip Up", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquekipUp{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Silent Stride": {
				"name": "Technique_Silent Stride", "fieldName": "silentStride", "title": "Silent Stride", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesilentStride{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shove": {
				"name": "Technique_Shove", "fieldName": "shove", "title": "Shove", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueshove{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knockdown": {
				"name": "Technique_Knockdown", "fieldName": "knockdown", "title": "Knockdown", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueknockdown{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tumble": {
				"name": "Technique_Tumble", "fieldName": "tumble", "title": "Tumble", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquetumble{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field Medic": {
				"name": "Technique_Field Medic", "fieldName": "fieldMedic", "title": "Field Medic", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefieldMedic{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Camoflauge": {
				"name": "Technique_Camoflauge", "fieldName": "camoflauge", "title": "Camoflauge", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecamoflauge{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Blurred Light": {
				"name": "Technique_Blurred Light", "fieldName": "blurredLight", "title": "Blurred Light", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueblurredLight{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light Refraction": {
				"name": "Technique_Light Refraction", "fieldName": "lightRefraction", "title": "Light Refraction", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelightRefraction{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Steps": {
				"name": "Technique_Shadow Steps", "fieldName": "shadowSteps", "title": "Shadow Steps", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueshadowSteps{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Walker": {
				"name": "Technique_Shadow Walker", "fieldName": "shadowWalker", "title": "Shadow Walker", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueshadowWalker{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Step": {
				"name": "Technique_Wind Step", "fieldName": "windStep", "title": "Wind Step", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewindStep{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Updraft": {
				"name": "Technique_Updraft", "fieldName": "updraft", "title": "Updraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueupdraft{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Clouded Updraft": {
				"name": "Technique_Clouded Updraft", "fieldName": "cloudedUpdraft", "title": "Clouded Updraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecloudedUpdraft{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Fall": {
				"name": "Technique_Wind Fall", "fieldName": "windFall", "title": "Wind Fall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewindFall{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Walk on Air": {
				"name": "Technique_Walk on Air", "fieldName": "walkOnAir", "title": "Walk on Air", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewalkOnAir{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fire Step": {
				"name": "Technique_Fire Step", "fieldName": "fireStep", "title": "Fire Step", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefireStep{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Liftoff": {
				"name": "Technique_Liftoff", "fieldName": "liftoff", "title": "Liftoff", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueliftoff{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Jet": {
				"name": "Technique_Jet", "fieldName": "jet", "title": "Jet", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquejet{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cunning Action": {
				"name": "Technique_Cunning Action", "fieldName": "cunningAction", "title": "Cunning Action", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecunningAction{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demoralize": {
				"name": "Technique_Demoralize", "fieldName": "demoralize", "title": "Demoralize", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedemoralize{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fascinate": {
				"name": "Technique_Fascinate", "fieldName": "fascinate", "title": "Fascinate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquefascinate{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Impersonator": {
				"name": "Technique_Impersonator", "fieldName": "impersonator", "title": "Impersonator", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueimpersonator{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ether Sense": {
				"name": "Technique_Ether Sense", "fieldName": "etherSense", "title": "Ether Sense", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueetherSense{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spirit Sense": {
				"name": "Technique_Spirit Sense", "fieldName": "spiritSense", "title": "Spirit Sense", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquespiritSense{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tremorsense": {
				"name": "Technique_Tremorsense", "fieldName": "tremorsense", "title": "Tremorsense", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquetremorsense{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dustcraft": {
				"name": "Technique_Dustcraft", "fieldName": "dustcraft", "title": "Dustcraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedustcraft{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shape Material": {
				"name": "Technique_Shape Material", "fieldName": "shapeMaterial", "title": "Shape Material", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueshapeMaterial{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quickcraft": {
				"name": "Technique_Quickcraft", "fieldName": "quickcraft", "title": "Quickcraft", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquequickcraft{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Shaping": {
				"name": "Technique_Improved Shaping", "fieldName": "improvedShaping", "title": "Improved Shaping", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueimprovedShaping{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Shaping": {
				"name": "Technique_Greater Shaping", "fieldName": "greaterShaping", "title": "Greater Shaping", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegreaterShaping{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Shaping": {
				"name": "Technique_Legendary Shaping", "fieldName": "legendaryShaping", "title": "Legendary Shaping", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelegendaryShaping{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Material": {
				"name": "Technique_Dust Material", "fieldName": "dustMaterial", "title": "Dust Material", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedustMaterial{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Area": {
				"name": "Technique_Dust Area", "fieldName": "dustArea", "title": "Dust Area", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedustArea{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Dusting": {
				"name": "Technique_Improved Dusting", "fieldName": "improvedDusting", "title": "Improved Dusting", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueimprovedDusting{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Dusting": {
				"name": "Technique_Greater Dusting", "fieldName": "greaterDusting", "title": "Greater Dusting", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegreaterDusting{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Dusting": {
				"name": "Technique_Legendary Dusting", "fieldName": "legendaryDusting", "title": "Legendary Dusting", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelegendaryDusting{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Path": {
				"name": "Technique_Form Path", "fieldName": "formPath", "title": "Form Path", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueformPath{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Pillar": {
				"name": "Technique_Form Pillar", "fieldName": "formPillar", "title": "Form Pillar", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueformPillar{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stepping Path": {
				"name": "Technique_Stepping Path", "fieldName": "steppingPath", "title": "Stepping Path", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesteppingPath{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Wall": {
				"name": "Technique_Form Wall", "fieldName": "formWall", "title": "Form Wall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueformWall{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Scattered Pillars": {
				"name": "Technique_Scattered Pillars", "fieldName": "scatteredPillars", "title": "Scattered Pillars", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquescatteredPillars{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Wall": {
				"name": "Technique_Great Wall", "fieldName": "greatWall", "title": "Great Wall", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegreatWall{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cultivate": {
				"name": "Technique_Cultivate", "fieldName": "cultivate", "title": "Cultivate", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecultivate{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Entangle": {
				"name": "Technique_Entangle", "fieldName": "entangle", "title": "Entangle", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueentangle{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wildwood": {
				"name": "Technique_Wildwood", "fieldName": "wildwood", "title": "Wildwood", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewildwood{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distortion": {
				"name": "Technique_Distortion", "fieldName": "distortion", "title": "Distortion", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedistortion{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Distortion": {
				"name": "Technique_Lasting Distortion", "fieldName": "lastingDistortion", "title": "Lasting Distortion", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelastingDistortion{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heat Field": {
				"name": "Technique_Heat Field", "fieldName": "heatField", "title": "Heat Field", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueheatField{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burn Guard": {
				"name": "Technique_Burn Guard", "fieldName": "burnGuard", "title": "Burn Guard", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueburnGuard{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Field": {
				"name": "Technique_Cold Field", "fieldName": "coldField", "title": "Cold Field", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquecoldField{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Chill Guard": {
				"name": "Technique_Chill Guard", "fieldName": "chillGuard", "title": "Chill Guard", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquechillGuard{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinesis": {
				"name": "Technique_Kinesis", "fieldName": "kinesis", "title": "Kinesis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquekinesis{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distant Kinesis": {
				"name": "Technique_Distant Kinesis", "fieldName": "distantKinesis", "title": "Distant Kinesis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedistantKinesis{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Strike": {
				"name": "Technique_Kinetic Strike", "fieldName": "kineticStrike", "title": "Kinetic Strike", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquekineticStrike{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Throw": {
				"name": "Technique_Kinetic Throw", "fieldName": "kineticThrow", "title": "Kinetic Throw", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquekineticThrow{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heavy Kinesis": {
				"name": "Technique_Heavy Kinesis", "fieldName": "heavyKinesis", "title": "Heavy Kinesis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueheavyKinesis{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burden": {
				"name": "Technique_Burden", "fieldName": "burden", "title": "Burden", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueburden{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pressure": {
				"name": "Technique_Pressure", "fieldName": "pressure", "title": "Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquepressure{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Restrain": {
				"name": "Technique_Restrain", "fieldName": "restrain", "title": "Restrain", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquerestrain{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wide Pressure": {
				"name": "Technique_Wide Pressure", "fieldName": "widePressure", "title": "Wide Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquewidePressure{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prostration": {
				"name": "Technique_Prostration", "fieldName": "prostration", "title": "Prostration", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueprostration{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Deep Pressure": {
				"name": "Technique_Deep Pressure", "fieldName": "deepPressure", "title": "Deep Pressure", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedeepPressure{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gravity Well": {
				"name": "Technique_Gravity Well", "fieldName": "gravityWell", "title": "Gravity Well", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquegravityWell{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shield Block": {
				"name": "Technique_Shield Block", "fieldName": "shieldBlock", "title": "Shield Block", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueshieldBlock{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Glancing Block": {
				"name": "Technique_Glancing Block", "fieldName": "glancingBlock", "title": "Glancing Block", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueglancingBlock{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aegis": {
				"name": "Technique_Aegis", "fieldName": "aegis", "title": "Aegis", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueaegis{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light": {
				"name": "Technique_Light", "fieldName": "light", "title": "Light", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquelight{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dancing Lights": {
				"name": "Technique_Dancing Lights", "fieldName": "dancingLights", "title": "Dancing Lights", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquedancingLights{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flash": {
				"name": "Technique_Flash", "fieldName": "flash", "title": "Flash", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueflash{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sunlight": {
				"name": "Technique_Sunlight", "fieldName": "sunlight", "title": "Sunlight", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesunlight{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release": {
				"name": "Technique_Stress Release", "fieldName": "stressRelease", "title": "Stress Release", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquestressRelease{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release +": {
				"name": "Technique_Stress Release +", "fieldName": "stressRelease+", "title": "Stress Release +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquestressRelease+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release ++": {
				"name": "Technique_Stress Release ++", "fieldName": "stressRelease++", "title": "Stress Release ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquestressRelease++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training": {
				"name": "Technique_Sensory Training", "fieldName": "sensoryTraining", "title": "Sensory Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesensoryTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training +": {
				"name": "Technique_Sensory Training +", "fieldName": "sensoryTraining+", "title": "Sensory Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesensoryTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Broad Study": {
				"name": "Technique_Broad Study", "fieldName": "broadStudy", "title": "Broad Study", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebroadStudy{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Experienced Tracker": {
				"name": "Technique_Experienced Tracker", "fieldName": "experiencedTracker", "title": "Experienced Tracker", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueexperiencedTracker{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual": {
				"name": "Technique_Multilingual", "fieldName": "multilingual", "title": "Multilingual", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemultilingual{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual +": {
				"name": "Technique_Multilingual +", "fieldName": "multilingual+", "title": "Multilingual +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemultilingual+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore": {
				"name": "Technique_Specialized Lore", "fieldName": "specializedLore", "title": "Specialized Lore", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquespecializedLore{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore +": {
				"name": "Technique_Specialized Lore +", "fieldName": "specializedLore+", "title": "Specialized Lore +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquespecializedLore+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore ++": {
				"name": "Technique_Specialized Lore ++", "fieldName": "specializedLore++", "title": "Specialized Lore ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquespecializedLore++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Initiative": {
				"name": "Technique_Improved Initiative", "fieldName": "improvedInitiative", "title": "Improved Initiative", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueimprovedInitiative{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training": {
				"name": "Technique_Knowledge Training", "fieldName": "knowledgeTraining", "title": "Knowledge Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueknowledgeTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training +": {
				"name": "Technique_Knowledge Training +", "fieldName": "knowledgeTraining+", "title": "Knowledge Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueknowledgeTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training ++": {
				"name": "Technique_Knowledge Training ++", "fieldName": "knowledgeTraining++", "title": "Knowledge Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueknowledgeTraining++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training": {
				"name": "Technique_Social Training", "fieldName": "socialTraining", "title": "Social Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesocialTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training +": {
				"name": "Technique_Social Training +", "fieldName": "socialTraining+", "title": "Social Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesocialTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training ++": {
				"name": "Technique_Social Training ++", "fieldName": "socialTraining++", "title": "Social Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesocialTraining++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus": {
				"name": "Technique_Refocus", "fieldName": "refocus", "title": "Refocus", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquerefocus{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus +": {
				"name": "Technique_Refocus +", "fieldName": "refocus+", "title": "Refocus +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquerefocus+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel": {
				"name": "Technique_Sustained Channel", "fieldName": "sustainedChannel", "title": "Sustained Channel", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesustainedChannel{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel +": {
				"name": "Technique_Sustained Channel +", "fieldName": "sustainedChannel+", "title": "Sustained Channel +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesustainedChannel+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control": {
				"name": "Technique_Ki Control", "fieldName": "kiControl", "title": "Ki Control", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquekiControl{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control +": {
				"name": "Technique_Ki Control +", "fieldName": "kiControl+", "title": "Ki Control +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquekiControl+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control ++": {
				"name": "Technique_Ki Control ++", "fieldName": "kiControl++", "title": "Ki Control ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquekiControl++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value": {
				"name": "Technique_Surge Value", "fieldName": "surgeValue", "title": "Surge Value", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesurgeValue{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value +": {
				"name": "Technique_Surge Value +", "fieldName": "surgeValue+", "title": "Surge Value +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquesurgeValue+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training": {
				"name": "Technique_Channel Training", "fieldName": "channelTraining", "title": "Channel Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquechannelTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training +": {
				"name": "Technique_Channel Training +", "fieldName": "channelTraining+", "title": "Channel Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquechannelTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training ++": {
				"name": "Technique_Channel Training ++", "fieldName": "channelTraining++", "title": "Channel Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquechannelTraining++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training": {
				"name": "Technique_Physical Training", "fieldName": "physicalTraining", "title": "Physical Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquephysicalTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training +": {
				"name": "Technique_Physical Training +", "fieldName": "physicalTraining+", "title": "Physical Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquephysicalTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training": {
				"name": "Technique_Body Training", "fieldName": "bodyTraining", "title": "Body Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebodyTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training +": {
				"name": "Technique_Body Training +", "fieldName": "bodyTraining+", "title": "Body Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebodyTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training ++": {
				"name": "Technique_Body Training ++", "fieldName": "bodyTraining++", "title": "Body Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquebodyTraining++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training": {
				"name": "Technique_Technical Training", "fieldName": "technicalTraining", "title": "Technical Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquetechnicalTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training +": {
				"name": "Technique_Technical Training +", "fieldName": "technicalTraining+", "title": "Technical Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquetechnicalTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training ++": {
				"name": "Technique_Technical Training ++", "fieldName": "technicalTraining++", "title": "Technical Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquetechnicalTraining++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training": {
				"name": "Technique_Martial Training", "fieldName": "martialTraining", "title": "Martial Training", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemartialTraining{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training +": {
				"name": "Technique_Martial Training +", "fieldName": "martialTraining+", "title": "Martial Training +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemartialTraining+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training ++": {
				"name": "Technique_Martial Training ++", "fieldName": "martialTraining++", "title": "Martial Training ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquemartialTraining++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up": {
				"name": "Technique_HP Up", "fieldName": "hPUp", "title": "HP Up", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquehPUp{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up+": {
				"name": "Technique_HP Up+", "fieldName": "hPUp+", "title": "HP Up+", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquehPUp+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up++": {
				"name": "Technique_HP Up++", "fieldName": "hPUp++", "title": "HP Up++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquehPUp++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost": {
				"name": "Technique_Vitality Boost", "fieldName": "vitalityBoost", "title": "Vitality Boost", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquevitalityBoost{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost +": {
				"name": "Technique_Vitality Boost +", "fieldName": "vitalityBoost+", "title": "Vitality Boost +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquevitalityBoost+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost ++": {
				"name": "Technique_Vitality Boost ++", "fieldName": "vitalityBoost++", "title": "Vitality Boost ++", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquevitalityBoost++{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying": {
				"name": "Technique_Undying", "fieldName": "undying", "title": "Undying", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueundying{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying +": {
				"name": "Technique_Undying +", "fieldName": "undying+", "title": "Undying +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueundying+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack": {
				"name": "Technique_Extra Follow-Up Attack", "fieldName": "extraFollow-UpAttack", "title": "Extra Follow-Up Attack", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueextraFollow-UpAttack{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack +": {
				"name": "Technique_Extra Follow-Up Attack +", "fieldName": "extraFollow-UpAttack+", "title": "Extra Follow-Up Attack +", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueextraFollow-UpAttack+{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Change Tech Slots": {
				"name": "Technique_Change Tech Slots", "fieldName": "changeTechSlots", "title": "Change Tech Slots", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniquechangeTechSlots{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hold Out": {
				"name": "Technique_Hold Out", "fieldName": "holdOut", "title": "Hold Out", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueholdOut{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Overdrive": {
				"name": "Technique_Overdrive", "fieldName": "overdrive", "title": "Overdrive", "group": "Technique", "descriptions": [null],
				"abbreviation": "", "variable": "techniqueoverdrive{0}", "formula": "", "modifiers": "", "linkedGroups": [],
				"modAttrs": [],
				"formulaCalculations": []
			}
		},
		sortingGroups = { "group": { "Type": ["Attribute", "Defense", "Sense", "General", "Affinity", "Gear", "Combat", "Social", "Tech Slot"], "Stat": ["Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique"], "Page": ["Character Creator", "Core", "Advancement", "Training"], "VariableMod": ["_max", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_techBonus", "_error"], "Definition": ["Origin", "Origin Basics", "Full Name", "Display Name"], "Attribute": ["Body", "Precision", "Quickness", "Conviction", "Intuition ", "Reason"], "AttributeValue": ["AttributeValueAverage", "AttributeValueGreat", "AttributeValueGood", "AttributeValueBad"], "Physical Defense": ["Brace", "Disruption", "Evasion"], "Internal Defense": ["Fortitude"], "Awareness": ["Hide"], "Defense": ["Reflex"], "Sense": ["Insight", "Notice", "Scrutiny", "Resolve"], "General": ["Character Level", "Character Rank", "Hit Points", "Buffer", "Energy", "Focus", "Chakra", "Initiative", "Speed"], "Affinity": ["Wood", "Fire", "Earth", "Metal", "Water"], "Gear": ["Carrying Capacity", "Reflex Penalty", "Speed Penalty"], "Combat": ["Durability", "Heal Value", "Barrier", "Block", "Armor", "Trauma Limit", "Stress Limit", "Vitality", "Ki", "Armsforce", "Spellforce", "Strikeforce"], "Social": ["Willpower", "Approval", "Patience"], "Tech Slot": ["Job Slots", "Item Slots", "Active Slots", "Support Slots"], "Technique Trait": ["Accurate", "Affinity+", "AP (X)", "Brutal", "Focus+", "Material", "Simple", "Volatile", "Vortex", "Weapon", "Wall"], "Item Trait": ["Arcing", "Shield", "Thrown", "Two-Handed", "Loud", "Impact (X)", "Explosive (X/Y)"], "Material Trait": ["Flammable", "Flexible", "Frozen", "Sharp", "Sturdy", "Transparent"], "Status": ["Downed", "Engaged", "Ethereal", "Grappled", "Hidden", "Initiative Penalty", "Invisible", "Restrained", "Unconscious"], "Condition": ["Aflame", "Angered", "Chilled", "Delayed", "Disgusted", "Dying", "Empowered", "Encouraged", "Encumbered", "Frightened", "Hasted", "Immobilized", "Impaired", "Joyful", "Launched", "Paralyzed", "Prone", "Saddened", "Sickened", "Staggered", "Stunned", "Surprised"], "Style": ["Style_Basic Set", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan"], "Lore": ["Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "Role": ["Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Technique": ["Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"] }, "formula": { "1": ["Job", "Focus", "Chakra", "Trauma Limit", "Job Slots", "Active Slots", "Support Slots"], "2": ["Vitality"], "3": ["Speed", "Stress Limit", "Ki"], "6": ["Technique"], "7": ["Attribute"], "8": ["Skill"], "10": ["Knowledge"], "": ["Role", "Role", "Language", "Language", "Lore", "Lore", "Style", "Style", "Character Creator", "Character Creator", "Core", "Core", "Advancement", "Advancement", "Training", "Training", "_max", "_max", "_rank", "_rank", "_build", "_build", "_filter", "_filter", "_expand", "_expand", "_tab", "_tab", "_page", "_page", "_exit", "_exit", "_finish", "_finish", "_origin", "_origin", "_learn", "_learn", "_pts", "_pts", "_techBonus", "_techBonus", "_error", "_error", "Origin", "Origin", "Origin Basics", "Origin Basics", "Full Name", "Full Name", "Display Name", "Display Name", "Body", "Body", "Precision", "Precision", "Quickness", "Quickness", "Conviction", "Conviction", "Intuition ", "Intuition ", "Reason", "Reason", "AttributeValueAverage", "AttributeValueAverage", "AttributeValueGreat", "AttributeValueGreat", "AttributeValueGood", "AttributeValueGood", "AttributeValueBad", "AttributeValueBad", "Defense", "Defense", "Sense", "Sense", "General", "General", "Character Level", "Character Level", "Character Rank", "Character Rank", "Hit Points", "Hit Points", "Buffer", "Buffer", "Energy", "Energy", "Affinity", "Affinity", "Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water", "Gear", "Gear", "Combat", "Combat", "Armsforce", "Armsforce", "Spellforce", "Spellforce", "Strikeforce", "Strikeforce", "Social", "Social", "Tech Slot", "Tech Slot", "Item Slots", "Item Slots", "Accurate", "Accurate", "Affinity+", "Affinity+", "AP (X)", "AP (X)", "Brutal", "Brutal", "Focus+", "Focus+", "Material", "Material", "Simple", "Simple", "Volatile", "Volatile", "Vortex", "Vortex", "Weapon", "Weapon", "Wall", "Wall", "Arcing", "Arcing", "Shield", "Shield", "Thrown", "Thrown", "Two-Handed", "Two-Handed", "Loud", "Loud", "Impact (X)", "Impact (X)", "Explosive (X/Y)", "Explosive (X/Y)", "Flammable", "Flammable", "Flexible", "Flexible", "Frozen", "Frozen", "Sharp", "Sharp", "Sturdy", "Sturdy", "Transparent", "Transparent", "Downed", "Downed", "Engaged", "Engaged", "Ethereal", "Ethereal", "Grappled", "Grappled", "Hidden", "Hidden", "Initiative Penalty", "Initiative Penalty", "Invisible", "Invisible", "Restrained", "Restrained", "Unconscious", "Unconscious", "Aflame", "Aflame", "Angered", "Angered", "Chilled", "Chilled", "Delayed", "Delayed", "Disgusted", "Disgusted", "Dying", "Dying", "Empowered", "Empowered", "Encouraged", "Encouraged", "Encumbered", "Encumbered", "Frightened", "Frightened", "Hasted", "Hasted", "Immobilized", "Immobilized", "Impaired", "Impaired", "Joyful", "Joyful", "Launched", "Launched", "Paralyzed", "Paralyzed", "Prone", "Prone", "Saddened", "Saddened", "Sickened", "Sickened", "Staggered", "Staggered", "Stunned", "Stunned", "Surprised", "Surprised", "Style_Basic Set", "Style_Basic Set", "Style_Swordplay", "Style_Swordplay", "Style_Ki Extension", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Acrobatics", "Skill_Agility", "Skill_Agility", "Skill_Analyze", "Skill_Analyze", "Skill_Build", "Skill_Build", "Skill_Channel", "Skill_Channel", "Skill_Charm", "Skill_Charm", "Skill_Command", "Skill_Command", "Skill_Concoct", "Skill_Concoct", "Skill_Cook", "Skill_Cook", "Skill_Deception", "Skill_Deception", "Skill_Disguise", "Skill_Disguise", "Skill_Empathy", "Skill_Empathy", "Skill_Enchant", "Skill_Enchant", "Skill_Finesse", "Skill_Finesse", "Skill_Flexibility", "Skill_Flexibility", "Skill_Grappling", "Skill_Grappling", "Skill_Heal", "Skill_Heal", "Skill_Intimidation", "Skill_Intimidation", "Skill_Leadership", "Skill_Leadership", "Skill_Maneuver", "Skill_Maneuver", "Skill_Medicine", "Skill_Medicine", "Skill_Might", "Skill_Might", "Skill_Negotiation", "Skill_Negotiation", "Skill_Palming", "Skill_Palming", "Skill_Physique", "Skill_Physique", "Skill_Pilot", "Skill_Pilot", "Skill_Resonance", "Skill_Resonance", "Skill_Search", "Skill_Search", "Skill_Shoot", "Skill_Shoot", "Skill_Skirmish", "Skill_Skirmish", "Skill_Sneak", "Skill_Sneak", "Skill_Survival", "Skill_Survival", "Skill_Throw", "Skill_Throw", "Skill_Tinker", "Skill_Tinker", "Skill_Traversal", "Skill_Traversal", "Language_Minere", "Language_Minere", "Language_Junal", "Language_Junal", "Language_Apollen", "Language_Apollen", "Language_Lib", "Language_Lib", "Language_Cert", "Language_Cert", "Language_Byric", "Language_Byric", "Language_Dustell", "Language_Dustell", "Language_Muralic", "Language_Muralic", "Language_Shira", "Language_Shira", "Language_Ciel", "Language_Ciel", "Language_Citeq", "Language_Citeq", "Language_Manstan", "Language_Manstan", "Language_Salkan", "Language_Salkan", "Language_Sansic", "Language_Sansic", "Language_Silq", "Language_Silq", "Language_Kleikan", "Language_Kleikan", "Language_Crinere", "Language_Crinere", "Language_Palmic", "Language_Palmic", "Language_Shorespeak", "Language_Shorespeak", "Language_Verdeni", "Language_Verdeni", "Language_Vulca", "Language_Vulca", "Language_Emotion", "Language_Emotion", "Language_Empathy", "Language_Empathy", "Language_Wolfwarg", "Language_Wolfwarg", "Language_Jovean", "Language_Jovean", "Language_Mytikan", "Language_Mytikan", "Lore_Academics", "Lore_Academics", "Lore_Health", "Lore_Health", "Lore_Mana", "Lore_Mana", "Lore_Mathematics", "Lore_Mathematics", "Lore_Nature", "Lore_Nature", "Lore_School", "Lore_School", "Lore_Spirit", "Lore_Spirit", "Lore_Warfare", "Lore_Warfare", "Lore_Zoology", "Lore_Zoology", "Lore_Profession", "Lore_Profession", "Lore_Farming", "Lore_Farming", "Lore_Fishing", "Lore_Fishing", "Lore_Hunting", "Lore_Hunting", "Lore_Legal", "Lore_Legal", "Lore_Mercantile", "Lore_Mercantile", "Lore_Mining", "Lore_Mining", "Lore_Craftmanship", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Alchemy", "Lore_Architecture", "Lore_Architecture", "Lore_Brewing", "Lore_Brewing", "Lore_Cooking", "Lore_Cooking", "Lore_Engineering", "Lore_Engineering", "Lore_Glassblowing", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Sculpting", "Lore_Smithing", "Lore_Smithing", "Lore_Weaving", "Lore_Weaving", "Lore_Geography", "Lore_Geography", "Lore_Aridsha", "Lore_Aridsha", "Lore_Ceres", "Lore_Ceres", "Lore_Colswei", "Lore_Colswei", "Lore_Khem", "Lore_Khem", "Lore_Novus", "Lore_Novus", "Lore_Walthair", "Lore_Walthair", "Lore_Wayling", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_Ethereal Plane", "Lore_History", "Lore_History", "Lore_Aridsha History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Colswei History", "Lore_Khem History", "Lore_Khem History", "Lore_Novus History", "Lore_Novus History", "Lore_Walthair History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Wayling History", "Lore_Culture", "Lore_Culture", "Lore_Art", "Lore_Art", "Lore_Etiquette", "Lore_Etiquette", "Lore_Fashion", "Lore_Fashion", "Lore_Games", "Lore_Games", "Lore_Music", "Lore_Music", "Lore_Scribing", "Lore_Scribing", "Lore_Theater", "Lore_Theater", "Lore_Religion", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Guidance", "Lore_Life's Circle", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Sylvan", "Lore_Zushaon", "Lore_Zushaon", "Job_Trainee", "Job_Trainee", "Job_Interceptor", "Job_Interceptor", "Job_Guardian", "Job_Guardian", "Job_Spellslinger", "Job_Spellslinger", "Job_Warrior", "Job_Warrior", "Job_Rogue", "Job_Rogue", "Job_Scholar", "Job_Scholar", "Job_Physician", "Job_Physician", "Role_Generalist", "Role_Generalist", "Role_Defender", "Role_Defender", "Role_Athlete", "Role_Athlete", "Role_Skirmisher", "Role_Skirmisher", "Role_Marksman", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"], "7;Body": ["Brace"], "Body": ["Brace", "Fortitude"], "7;Body;Skill:skill_Survival:_rank": ["Fortitude"], "Skill:skill_Survival:_rank": ["Fortitude"], "7;Precision": ["Disruption"], "Precision": ["Disruption"], "7;prc;skillsneak_rank": ["Hide"], "prc": ["Hide", "Barrier", "Barrier"], "skillsneak_rank": ["Hide"], "Quickness": ["Evasion", "Evasion"], "7;qck;skillagility_rank": ["Reflex"], "qck": ["Reflex", "Initiative", "Initiative"], "skillagility_rank": ["Reflex"], "7;int": ["Insight", "Notice"], "int": ["Insight", "Notice", "Patience"], "7;rsn": ["Scrutiny"], "rsn": ["Scrutiny"], "7;cnv": ["Resolve"], "cnv": ["Resolve", "Willpower", "Willpower", "Approval", "Approval"], "40; bodRank": ["Carrying Capacity"], "bodRank": ["Carrying Capacity"], "!Gear": ["Reflex Penalty", "Reflex Penalty", "Speed Penalty", "Speed Penalty", "Block", "Block", "Armor", "Armor"], "Character Rank * 10": ["Durability"], "Character Rank ": ["Durability", "Heal Value"], "Character Rank * 2": ["Heal Value"], "pb*10;int": ["Patience"], "pb": ["Patience"] } },
		_max = "_max",
		_rank = "_rank",
		_build = "_build",
		_filter = "_filter",
		_expand = "_expand",
		_tab = "_tab",
		_page = "_page",
		_exit = "_exit",
		_finish = "_finish",
		_origin = "_origin",
		_learn = "_learn",
		_pts = "_pts",
		_techBonus = "_techBonus",
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
		getGroupVariables = function (filterData, mod1, mod2) {
			let data = filter(filterData);
			let output = [];
			for (let i = 0; i < data.length; i++) {
				output.push(data[i].getVariable(mod1, mod2));
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
		_origin: _origin,
		_learn: _learn,
		_pts: _pts,
		_techBonus: _techBonus,
		_error: _error
	};
}());
