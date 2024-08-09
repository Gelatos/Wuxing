var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "Character Creator", "Core", "Advancement", "Training Page", "Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Full Name", "Display Name", "Level", "XP", "Training", "CR", "HP", "WILL", "EN", "Initiative", "Carrying Capacity", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill", "Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Chakra", "Combat_Move Speed", "Combat_Move Potency", "Social_Approval", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Style_Basic Set", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "title": "Attributes", "group": "Type", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "When assigning attributes you may assign them a value. They range from a +3 bonus to a -1 penalty. Assigning an attribute a penalty will grant you more points to assign to other attributes.", "Normally, a character can have at most one attribute at a -1 penalty."],
				"abbreviation": "", "variable": "ATR{0}{1}", "formula": "7", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "title": "Skills", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}{1}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job": {
				"name": "Job", "fieldName": "job", "title": "Jobs", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "JOB{0}{1}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role": {
				"name": "Role", "fieldName": "role", "title": "Roles", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "title": "Knowledge", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "KNW{0}{1}", "formula": "10", "modifiers": "_techBonus", "linkedGroups": 3, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language": {
				"name": "Language", "fieldName": "language", "title": "Language", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "LNG{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "title": "Lore", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "LOR{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "fieldName": "style", "title": "Styles", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "STY{0}{1}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "title": "Techniques", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "TCH{0}{1}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page Set": {
				"name": "Page Set", "fieldName": "pageSet", "title": "Page Set", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PGS{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page": {
				"name": "Page", "fieldName": "page", "title": "Page", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAG{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "title": "Defense", "group": "Type", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "variable": "DEF{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "title": "Sense", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SEN{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "title": "Affinity", "group": "Type", "subGroup": "", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity."],
				"abbreviation": "", "variable": "AFN{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "title": "Combat", "group": "Type", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "variable": "CMB{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "fieldName": "social", "title": "Social", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SOC{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "title": "Traits", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "TRA{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status": {
				"name": "Status", "fieldName": "status", "title": "Status", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "STS{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "title": "Condition", "group": "Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "CND{0}{1}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "title": "Max", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_max", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "title": "", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_true", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "title": "Rank", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_rank", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "title": "Build", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_build", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "title": "Filter", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_filter", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "title": "Expand", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_expand", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "title": "Tab", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_tab", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "title": "Page", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_page", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "title": "Exit", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_exit", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "title": "Finish", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_finish", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "title": "Origin", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_origin", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "title": "Learn", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_learn", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "title": "Points", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_pts", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "title": "Technique Bonus", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_tech", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "title": "Expertise Bonus", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_expertise", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "title": "Gear Bonus", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_gear", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "title": "Error", "group": "VariableMod", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "_error", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "title": "Wood", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "wood", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "title": "Fire", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "fire", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "title": "Earth", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "earth", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "title": "Metal", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "metal", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "fieldName": "water", "title": "Water", "group": "Affinity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "water", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributeValueMediocre", "title": "Mediocre (+0)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "0", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributeValueGreat", "title": "Great (+3)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "3", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributeValueGood", "title": "Good (+2)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "2", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributeValueAverage", "title": "Average (+1)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "1", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributeValueBad", "title": "Bad (-1)", "group": "AttributeValue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "-1", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Character Creator": {
				"name": "Character Creator", "fieldName": "characterCreator", "title": "Character Creator", "group": "PageSet", "subGroup": "", "descriptions": ["This is the Character Creator where you can create a new character. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, select Finish to populate your character. Alternatively, you can select Exit to do character creation at another time. This is not recommended.", "You can always return to this page from Options."],
				"abbreviation": "", "variable": "builder", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Core": {
				"name": "Core", "fieldName": "core", "title": "Core", "group": "PageSet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "core", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "title": "Advancement", "group": "PageSet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "advancement", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Training Page": {
				"name": "Training Page", "fieldName": "trainingPage", "title": "Training", "group": "PageSet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "training", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "title": "Origin", "group": "Page", "subGroup": "", "descriptions": ["This is the Character Origin Page. Here you will set your character's name, their primary element, and ancestry. There are also some prebuild options to allow you to quickly build a character by choosing a Background and Archetype. These are optional choices to help steer your character into specific directions. You are always able to ignore these and just take on character creation from scratch."],
				"abbreviation": "", "variable": "PAGorigin{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Basics": {
				"name": "Page_Basics", "fieldName": "basics", "title": "Basics", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGbasics{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "title": "Character", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGcharacter{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "title": "Overview", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGoverview{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "title": "Details", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGdetails{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "title": "Chat", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGchat{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "title": "Options", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGoptions{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "title": "Gear", "group": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "PAGgear{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Full Name": {
				"name": "Full Name", "fieldName": "fullName", "title": "Full Name", "group": "General", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "variable": "full_name", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "fieldName": "displayName", "title": "Display Name", "group": "General", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "variable": "display_name", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Level": {
				"name": "Level", "fieldName": "level", "title": "Character Level", "group": "General", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "variable": "level", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"XP": {
				"name": "XP", "fieldName": "xP", "title": "Experience", "group": "General", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "XP", "variable": "xp", "formula": "30", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Training": {
				"name": "Training", "fieldName": "training", "title": "Training", "group": "General", "subGroup": "", "descriptions": ["Training is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime for about a week."],
				"abbreviation": "", "variable": "training", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"CR": {
				"name": "CR", "fieldName": "cR", "title": "Character Rank", "group": "General", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level."],
				"abbreviation": "CR", "variable": "cr", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"HP": {
				"name": "HP", "fieldName": "hP", "title": "Hit Points", "group": "General", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "HP", "variable": "hp", "formula": "10;CR*10;Level;BOD*2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"WILL": {
				"name": "WILL", "fieldName": "wILL", "title": "Willpower", "group": "General", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "variable": "will", "formula": "10;CR*10;Level;CNV*2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"EN": {
				"name": "EN", "fieldName": "eN", "title": "Energy", "group": "General", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "variable": "en", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "title": "Initiative", "group": "General", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "variable": "initiative", "formula": "CR;QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carryingCapacity", "title": "Carrying Capacity", "group": "Gear", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "variable": "capacity", "formula": "40;BOD*20", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_BOD": {
				"name": "Attribute_BOD", "fieldName": "bOD", "title": "BOD", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRbod{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_PRC": {
				"name": "Attribute_PRC", "fieldName": "pRC", "title": "PRC", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRprc{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_QCK": {
				"name": "Attribute_QCK", "fieldName": "qCK", "title": "QCK", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRqck{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_CNV": {
				"name": "Attribute_CNV", "fieldName": "cNV", "title": "CNV", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRcnv{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_INT": {
				"name": "Attribute_INT", "fieldName": "iNT", "title": "INT", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRint{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_RSN": {
				"name": "Attribute_RSN", "fieldName": "rSN", "title": "RSN", "group": "Attribute", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ATRrsn{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Brace": {
				"name": "Defense_Brace", "fieldName": "brace", "title": "Brace", "group": "Defense", "subGroup": "", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "variable": "DEFbrace{0}", "formula": "7;BOD", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Fortitude": {
				"name": "Defense_Fortitude", "fieldName": "fortitude", "title": "Fortitude", "group": "Defense", "subGroup": "", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "variable": "DEFfortitude{0}", "formula": "7;BOD", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Disruption": {
				"name": "Defense_Disruption", "fieldName": "disruption", "title": "Disruption", "group": "Defense", "subGroup": "", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "variable": "DEFdisruption{0}", "formula": "7;PRC", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Hide": {
				"name": "Defense_Hide", "fieldName": "hide", "title": "Hide", "group": "Defense", "subGroup": "", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "variable": "DEFhide{0}", "formula": "7;PRC", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Reflex": {
				"name": "Defense_Reflex", "fieldName": "reflex", "title": "Reflex", "group": "Defense", "subGroup": "", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "variable": "DEFreflex{0}", "formula": "7;QCK", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Evasion": {
				"name": "Defense_Evasion", "fieldName": "evasion", "title": "Evasion", "group": "Defense", "subGroup": "", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "variable": "DEFevasion{0}", "formula": "4;QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Insight": {
				"name": "Sense_Insight", "fieldName": "insight", "title": "Insight", "group": "Sense", "subGroup": "", "descriptions": ["Insight represents a character's ability to sense emotional state and sudden changes in behaviour. It is useful when detecting someone is trying to charm or deceive you. "],
				"abbreviation": "", "variable": "SENinsight{0}", "formula": "7;INT", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Notice": {
				"name": "Sense_Notice", "fieldName": "notice", "title": "Notice", "group": "Sense", "subGroup": "", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "variable": "SENnotice{0}", "formula": "7;INT", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Scrutiny": {
				"name": "Sense_Scrutiny", "fieldName": "scrutiny", "title": "Scrutiny", "group": "Sense", "subGroup": "", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning. It is often used in defense against another's attempts at lying and from being tripped up against a skilled negotiator. "],
				"abbreviation": "", "variable": "SENscrutiny{0}", "formula": "7;RSN", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Detect": {
				"name": "Sense_Detect", "fieldName": "detect", "title": "Detect", "group": "Sense", "subGroup": "", "descriptions": ["Detect is a character's ability to immediately analyze an effect or location for anything that is out of place or is not behaving normally. It is most often used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "variable": "SENdetect{0}", "formula": "7;RSN", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Resolve": {
				"name": "Sense_Resolve", "fieldName": "resolve", "title": "Resolve", "group": "Sense", "subGroup": "", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "variable": "SENresolve{0}", "formula": "7;CNV", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Freewill": {
				"name": "Sense_Freewill", "fieldName": "freewill", "title": "Freewill", "group": "Sense", "subGroup": "", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "variable": "SENfreewill{0}", "formula": "10;CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_HV": {
				"name": "Combat_HV", "fieldName": "hV", "title": "HV", "group": "Combat", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from healing abilities."],
				"abbreviation": "", "variable": "CMBhv{0}", "formula": "2;CR*2;CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Armor": {
				"name": "Combat_Armor", "fieldName": "armor", "title": "Armor", "group": "Combat", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "variable": "CMBarmor{0}", "formula": "0", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Durability": {
				"name": "Combat_Durability", "fieldName": "durability", "title": "Durability", "group": "Combat", "subGroup": "", "descriptions": ["Durability is the number of times a character can restore their HP back to full when their HP drops to 0."],
				"abbreviation": "", "variable": "CMBdurability{0}", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Surge": {
				"name": "Combat_Surge", "fieldName": "surge", "title": "Surge", "group": "Combat", "subGroup": "", "descriptions": ["Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "variable": "CMBsurge{0}", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Chakra": {
				"name": "Combat_Chakra", "fieldName": "chakra", "title": "Chakra", "group": "Combat", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "variable": "CMBchakra{0}", "formula": "3;CR", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "title": "", "group": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "variable": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Speed": {
				"name": "Combat_Move Speed", "fieldName": "moveSpeed", "title": "Move Speed", "group": "Combat", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they make a standard move."],
				"abbreviation": "", "variable": "CMBmoveSpeed{0}", "formula": "3", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Potency": {
				"name": "Combat_Move Potency", "fieldName": "movePotency", "title": "Move Potency", "group": "Combat", "subGroup": "", "descriptions": ["At the start of a combat round this value is rolled to determine the number of spaces the character may move. If the value is less than their move speed, the value becomes equal to their move speed. "],
				"abbreviation": "", "variable": "CMBmovePotency{0}", "formula": "6", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Approval": {
				"name": "Social_Approval", "fieldName": "approval", "title": "Approval", "group": "Social", "subGroup": "", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "variable": "SOCapproval{0}", "formula": "10;CR*10;Level;CNV*2", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Patience": {
				"name": "Social_Patience", "fieldName": "patience", "title": "Patience", "group": "Social", "subGroup": "", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "variable": "SOCpatience{0}", "formula": "CR*10;", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "title": "Accurate", "group": "Trait", "subGroup": "", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "variable": "TRAaccurate{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "title": "Affinity", "group": "Trait", "subGroup": "", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "variable": "TRAaffinity{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "title": "Affinity+", "group": "Trait", "subGroup": "", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "variable": "TRAaffinity+{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "aP", "title": "AP", "group": "Trait", "subGroup": "", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "variable": "TRAaP{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "title": "Brutal", "group": "Trait", "subGroup": "", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "variable": "TRAbrutal{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "title": "Focus", "group": "Trait", "subGroup": "", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "variable": "TRAfocus{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "title": "Focus+", "group": "Trait", "subGroup": "", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "variable": "TRAfocus+{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "title": "Material", "group": "Trait", "subGroup": "", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "variable": "TRAmaterial{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "title": "Simple", "group": "Trait", "subGroup": "", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "variable": "TRAsimple{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "title": "Volatile", "group": "Trait", "subGroup": "", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "variable": "TRAvolatile{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "title": "Vortex", "group": "Trait", "subGroup": "", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "variable": "TRAvortex{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "title": "Weapon", "group": "Trait", "subGroup": "", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "variable": "TRAweapon{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "title": "Wall", "group": "Trait", "subGroup": "", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "variable": "TRAwall{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "title": "Arcing", "group": "Trait", "subGroup": "", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "variable": "TRAarcing{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "title": "Shield", "group": "Trait", "subGroup": "", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "variable": "TRAshield{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "title": "Thrown", "group": "Trait", "subGroup": "", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "variable": "TRAthrown{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-Handed", "title": "Two-Handed", "group": "Trait", "subGroup": "", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "variable": "TRAtwo-Handed{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "title": "Loud", "group": "Trait", "subGroup": "", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "variable": "TRAloud{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "title": "Flammable", "group": "Trait", "subGroup": "", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "variable": "TRAflammable{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "title": "Flexible", "group": "Trait", "subGroup": "", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "variable": "TRAflexible{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "title": "Frozen", "group": "Trait", "subGroup": "", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "variable": "TRAfrozen{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "title": "Sharp", "group": "Trait", "subGroup": "", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "variable": "TRAsharp{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "title": "Sturdy", "group": "Trait", "subGroup": "", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "variable": "TRAsturdy{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "title": "Transparent", "group": "Trait", "subGroup": "", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "variable": "TRAtransparent{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Downed": {
				"name": "Status_Downed", "fieldName": "downed", "title": "Downed", "group": "Status", "subGroup": "", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "variable": "STSdowned{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Engaged": {
				"name": "Status_Engaged", "fieldName": "engaged", "title": "Engaged", "group": "Status", "subGroup": "", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "variable": "STSengaged{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Ethereal": {
				"name": "Status_Ethereal", "fieldName": "ethereal", "title": "Ethereal", "group": "Status", "subGroup": "", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "variable": "STSethereal{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Grappled": {
				"name": "Status_Grappled", "fieldName": "grappled", "title": "Grappled", "group": "Status", "subGroup": "", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "variable": "STSgrappled{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Hidden": {
				"name": "Status_Hidden", "fieldName": "hidden", "title": "Hidden", "group": "Status", "subGroup": "", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "variable": "STShidden{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Initiative Penalty": {
				"name": "Status_Initiative Penalty", "fieldName": "initiativePenalty", "title": "Initiative Penalty", "group": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "STSinitiativePenalty{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Invisible": {
				"name": "Status_Invisible", "fieldName": "invisible", "title": "Invisible", "group": "Status", "subGroup": "", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "variable": "STSinvisible{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Restrained": {
				"name": "Status_Restrained", "fieldName": "restrained", "title": "Restrained", "group": "Status", "subGroup": "", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "variable": "STSrestrained{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Unconscious": {
				"name": "Status_Unconscious", "fieldName": "unconscious", "title": "Unconscious", "group": "Status", "subGroup": "", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "variable": "STSunconscious{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Aflame": {
				"name": "Condition_Aflame", "fieldName": "aflame", "title": "Aflame", "group": "Condition", "subGroup": "", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "variable": "CNDaflame{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Angered": {
				"name": "Condition_Angered", "fieldName": "angered", "title": "Angered", "group": "Condition", "subGroup": "", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "variable": "CNDangered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Chilled": {
				"name": "Condition_Chilled", "fieldName": "chilled", "title": "Chilled", "group": "Condition", "subGroup": "", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "variable": "CNDchilled{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Delayed": {
				"name": "Condition_Delayed", "fieldName": "delayed", "title": "Delayed", "group": "Condition", "subGroup": "", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "variable": "CNDdelayed{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Disgusted": {
				"name": "Condition_Disgusted", "fieldName": "disgusted", "title": "Disgusted", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDdisgusted{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Dying": {
				"name": "Condition_Dying", "fieldName": "dying", "title": "Dying", "group": "Condition", "subGroup": "", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "variable": "CNDdying{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Empowered": {
				"name": "Condition_Empowered", "fieldName": "empowered", "title": "Empowered", "group": "Condition", "subGroup": "", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "variable": "CNDempowered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encouraged": {
				"name": "Condition_Encouraged", "fieldName": "encouraged", "title": "Encouraged", "group": "Condition", "subGroup": "", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "variable": "CNDencouraged{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encumbered": {
				"name": "Condition_Encumbered", "fieldName": "encumbered", "title": "Encumbered", "group": "Condition", "subGroup": "", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "variable": "CNDencumbered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Frightened": {
				"name": "Condition_Frightened", "fieldName": "frightened", "title": "Frightened", "group": "Condition", "subGroup": "", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "variable": "CNDfrightened{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Hasted": {
				"name": "Condition_Hasted", "fieldName": "hasted", "title": "Hasted", "group": "Condition", "subGroup": "", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "variable": "CNDhasted{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Immobilized": {
				"name": "Condition_Immobilized", "fieldName": "immobilized", "title": "Immobilized", "group": "Condition", "subGroup": "", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "variable": "CNDimmobilized{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Impaired": {
				"name": "Condition_Impaired", "fieldName": "impaired", "title": "Impaired", "group": "Condition", "subGroup": "", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "variable": "CNDimpaired{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Joyful": {
				"name": "Condition_Joyful", "fieldName": "joyful", "title": "Joyful", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDjoyful{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Launched": {
				"name": "Condition_Launched", "fieldName": "launched", "title": "Launched", "group": "Condition", "subGroup": "", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "variable": "CNDlaunched{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Paralyzed": {
				"name": "Condition_Paralyzed", "fieldName": "paralyzed", "title": "Paralyzed", "group": "Condition", "subGroup": "", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "variable": "CNDparalyzed{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Prone": {
				"name": "Condition_Prone", "fieldName": "prone", "title": "Prone", "group": "Condition", "subGroup": "", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "variable": "CNDprone{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Saddened": {
				"name": "Condition_Saddened", "fieldName": "saddened", "title": "Saddened", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDsaddened{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Sickened": {
				"name": "Condition_Sickened", "fieldName": "sickened", "title": "Sickened", "group": "Condition", "subGroup": "", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "variable": "CNDsickened{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Staggered": {
				"name": "Condition_Staggered", "fieldName": "staggered", "title": "Staggered", "group": "Condition", "subGroup": "", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "variable": "CNDstaggered{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Stunned": {
				"name": "Condition_Stunned", "fieldName": "stunned", "title": "Stunned", "group": "Condition", "subGroup": "", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "variable": "CNDstunned{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Surprised": {
				"name": "Condition_Surprised", "fieldName": "surprised", "title": "Surprised", "group": "Condition", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "variable": "CNDsurprised{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Basic Set": {
				"name": "Style_Basic Set", "fieldName": "basicSet", "title": "Basic Set", "group": "Style", "subGroup": "", "descriptions": ["A standard list of techniques. Anyone can perform these techniques. "],
				"abbreviation": "", "variable": "STY{0}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "swordplay", "title": "Swordplay", "group": "Style", "subGroup": "", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "variable": "STY{0}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "kiExtension", "title": "Ki Extension", "group": "Style", "subGroup": "", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "variable": "STY{0}", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "title": "Acrobatics", "group": "Skill", "subGroup": "", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "title": "Agility", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "title": "Analyze", "group": "Skill", "subGroup": "", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "title": "Build", "group": "Skill", "subGroup": "", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "title": "Channel", "group": "Skill", "subGroup": "", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "title": "Charm", "group": "Skill", "subGroup": "", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "title": "Command", "group": "Skill", "subGroup": "", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "title": "Concoct", "group": "Skill", "subGroup": "", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "title": "Cook", "group": "Skill", "subGroup": "", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "title": "Deception", "group": "Skill", "subGroup": "", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "title": "Disguise", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "title": "Empathy", "group": "Skill", "subGroup": "", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "title": "Enchant", "group": "Skill", "subGroup": "", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "title": "Finesse", "group": "Skill", "subGroup": "", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "title": "Flexibility", "group": "Skill", "subGroup": "", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "title": "Grappling", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "title": "Heal", "group": "Skill", "subGroup": "", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "title": "Intimidation", "group": "Skill", "subGroup": "", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "title": "Leadership", "group": "Skill", "subGroup": "", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "title": "Maneuver", "group": "Skill", "subGroup": "", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "title": "Medicine", "group": "Skill", "subGroup": "", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "title": "Might", "group": "Skill", "subGroup": "", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "title": "Negotiation", "group": "Skill", "subGroup": "", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "title": "Palming", "group": "Skill", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "title": "Physique", "group": "Skill", "subGroup": "", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "title": "Pilot", "group": "Skill", "subGroup": "", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "title": "Resonance", "group": "Skill", "subGroup": "", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "title": "Search", "group": "Skill", "subGroup": "", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "title": "Shoot", "group": "Skill", "subGroup": "", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "title": "Skirmish", "group": "Skill", "subGroup": "", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "title": "Sneak", "group": "Skill", "subGroup": "", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "title": "Survival", "group": "Skill", "subGroup": "", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "title": "Throw", "group": "Skill", "subGroup": "", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "title": "Tinker", "group": "Skill", "subGroup": "", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "title": "Traversal", "group": "Skill", "subGroup": "", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "variable": "SKL{0}", "formula": "8;CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Minere": {
				"name": "Language_Minere", "fieldName": "minere", "title": "Minere", "group": "Language", "subGroup": "", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Junal": {
				"name": "Language_Junal", "fieldName": "junal", "title": "Junal", "group": "Language", "subGroup": "", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Apollen": {
				"name": "Language_Apollen", "fieldName": "apollen", "title": "Apollen", "group": "Language", "subGroup": "", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Lib": {
				"name": "Language_Lib", "fieldName": "lib", "title": "Lib", "group": "Language", "subGroup": "", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Cert": {
				"name": "Language_Cert", "fieldName": "cert", "title": "Cert", "group": "Language", "subGroup": "", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Byric": {
				"name": "Language_Byric", "fieldName": "byric", "title": "Byric", "group": "Language", "subGroup": "", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Dustell": {
				"name": "Language_Dustell", "fieldName": "dustell", "title": "Dustell", "group": "Language", "subGroup": "", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Muralic": {
				"name": "Language_Muralic", "fieldName": "muralic", "title": "Muralic", "group": "Language", "subGroup": "", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shira": {
				"name": "Language_Shira", "fieldName": "shira", "title": "Shira", "group": "Language", "subGroup": "", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Ciel": {
				"name": "Language_Ciel", "fieldName": "ciel", "title": "Ciel", "group": "Language", "subGroup": "", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Citeq": {
				"name": "Language_Citeq", "fieldName": "citeq", "title": "Citeq", "group": "Language", "subGroup": "", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Manstan": {
				"name": "Language_Manstan", "fieldName": "manstan", "title": "Manstan", "group": "Language", "subGroup": "", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Salkan": {
				"name": "Language_Salkan", "fieldName": "salkan", "title": "Salkan", "group": "Language", "subGroup": "", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Sansic": {
				"name": "Language_Sansic", "fieldName": "sansic", "title": "Sansic", "group": "Language", "subGroup": "", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Silq": {
				"name": "Language_Silq", "fieldName": "silq", "title": "Silq", "group": "Language", "subGroup": "", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Kleikan": {
				"name": "Language_Kleikan", "fieldName": "kleikan", "title": "Kleikan", "group": "Language", "subGroup": "", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Crinere": {
				"name": "Language_Crinere", "fieldName": "crinere", "title": "Crinere", "group": "Language", "subGroup": "", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Palmic": {
				"name": "Language_Palmic", "fieldName": "palmic", "title": "Palmic", "group": "Language", "subGroup": "", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shorespeak": {
				"name": "Language_Shorespeak", "fieldName": "shorespeak", "title": "Shorespeak", "group": "Language", "subGroup": "", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Verdeni": {
				"name": "Language_Verdeni", "fieldName": "verdeni", "title": "Verdeni", "group": "Language", "subGroup": "", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Vulca": {
				"name": "Language_Vulca", "fieldName": "vulca", "title": "Vulca", "group": "Language", "subGroup": "", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Emotion": {
				"name": "Language_Emotion", "fieldName": "emotion", "title": "Emotion", "group": "Language", "subGroup": "", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Empathy": {
				"name": "Language_Empathy", "fieldName": "empathy", "title": "Empathy", "group": "Language", "subGroup": "", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Wolfwarg": {
				"name": "Language_Wolfwarg", "fieldName": "wolfwarg", "title": "Wolfwarg", "group": "Language", "subGroup": "", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Jovean": {
				"name": "Language_Jovean", "fieldName": "jovean", "title": "Jovean", "group": "Language", "subGroup": "", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Mytikan": {
				"name": "Language_Mytikan", "fieldName": "mytikan", "title": "Mytikan", "group": "Language", "subGroup": "", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "variable": "LNG{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Academics": {
				"name": "Lore_Academics", "fieldName": "academics", "title": "Academics", "group": "Lore", "subGroup": "", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "title": "Health", "group": "Lore", "subGroup": "", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "title": "Mana", "group": "Lore", "subGroup": "", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "title": "Mathematics", "group": "Lore", "subGroup": "", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "title": "Nature", "group": "Lore", "subGroup": "", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "title": "School", "group": "Lore", "subGroup": "", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "title": "Spirit", "group": "Lore", "subGroup": "", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "title": "Warfare", "group": "Lore", "subGroup": "", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "title": "Zoology", "group": "Lore", "subGroup": "", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Profession": {
				"name": "Lore_Profession", "fieldName": "profession", "title": "Profession", "group": "Lore", "subGroup": "", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "title": "Farming", "group": "Lore", "subGroup": "", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "title": "Fishing", "group": "Lore", "subGroup": "", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "title": "Hunting", "group": "Lore", "subGroup": "", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "title": "Legal", "group": "Lore", "subGroup": "", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "title": "Mercantile", "group": "Lore", "subGroup": "", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "title": "Mining", "group": "Lore", "subGroup": "", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Craftmanship": {
				"name": "Lore_Craftmanship", "fieldName": "craftmanship", "title": "Craftmanship", "group": "Lore", "subGroup": "", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "title": "Alchemy", "group": "Lore", "subGroup": "", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "title": "Architecture", "group": "Lore", "subGroup": "", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "title": "Brewing", "group": "Lore", "subGroup": "", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "title": "Cooking", "group": "Lore", "subGroup": "", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "title": "Engineering", "group": "Lore", "subGroup": "", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "title": "Glassblowing", "group": "Lore", "subGroup": "", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "title": "Leatherworking", "group": "Lore", "subGroup": "", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "title": "Sculpting", "group": "Lore", "subGroup": "", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "title": "Smithing", "group": "Lore", "subGroup": "", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "title": "Weaving", "group": "Lore", "subGroup": "", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Geography": {
				"name": "Lore_Geography", "fieldName": "geography", "title": "Geography", "group": "Lore", "subGroup": "", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "title": "Aridsha", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "title": "Ceres", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "title": "Colswei", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "title": "Khem", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "title": "Novus", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "title": "Walthair", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "title": "Wayling", "group": "Lore", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "etherealPlane", "title": "Ethereal Plane", "group": "Lore", "subGroup": "", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_History": {
				"name": "Lore_History", "fieldName": "history", "title": "History", "group": "Lore", "subGroup": "", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridshaHistory", "title": "Aridsha History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceresHistory", "title": "Ceres History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colsweiHistory", "title": "Colswei History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khemHistory", "title": "Khem History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novusHistory", "title": "Novus History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthairHistory", "title": "Walthair History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "waylingHistory", "title": "Wayling History", "group": "Lore", "subGroup": "", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Culture": {
				"name": "Lore_Culture", "fieldName": "culture", "title": "Culture", "group": "Lore", "subGroup": "", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "title": "Art", "group": "Lore", "subGroup": "", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "title": "Etiquette", "group": "Lore", "subGroup": "", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "title": "Fashion", "group": "Lore", "subGroup": "", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "title": "Games", "group": "Lore", "subGroup": "", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "title": "Music", "group": "Lore", "subGroup": "", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "title": "Scribing", "group": "Lore", "subGroup": "", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "title": "Theater", "group": "Lore", "subGroup": "", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Religion": {
				"name": "Lore_Religion", "fieldName": "religion", "title": "Religion", "group": "Lore", "subGroup": "", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "churchOfKongkwei", "title": "Church of Kongkwei", "group": "Lore", "subGroup": "", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "title": "Guidance", "group": "Lore", "subGroup": "", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life'sCircle", "title": "Life's Circle", "group": "Lore", "subGroup": "", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "oceanCourt", "title": "Ocean Court", "group": "Lore", "subGroup": "", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "title": "Sylvan", "group": "Lore", "subGroup": "", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "title": "Zushaon", "group": "Lore", "subGroup": "", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "variable": "LOR{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Trainee": {
				"name": "Job_Trainee", "fieldName": "trainee", "title": "Trainee", "group": "Job", "subGroup": "", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "interceptor", "title": "Interceptor", "group": "Job", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "guardian", "title": "Guardian", "group": "Job", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "spellslinger", "title": "Spellslinger", "group": "Job", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "warrior", "title": "Warrior", "group": "Job", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "rogue", "title": "Rogue", "group": "Job", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "scholar", "title": "Scholar", "group": "Job", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "physician", "title": "Physician", "group": "Job", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "variable": "JOB{0}", "formula": "CR", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Generalist": {
				"name": "Role_Generalist", "fieldName": "generalist", "title": "Generalist", "group": "Role", "subGroup": "", "descriptions": ["Very general"],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Defender": {
				"name": "Role_Defender", "fieldName": "defender", "title": "Defender", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Athlete": {
				"name": "Role_Athlete", "fieldName": "athlete", "title": "Athlete", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Skirmisher": {
				"name": "Role_Skirmisher", "fieldName": "skirmisher", "title": "Skirmisher", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Marksman": {
				"name": "Role_Marksman", "fieldName": "marksman", "title": "Marksman", "group": "Role", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "variable": "ROL{0}", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Break Free": {
				"name": "Technique_Break Free", "fieldName": "breakFree", "title": "Break Free", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dash": {
				"name": "Technique_Dash", "fieldName": "dash", "title": "Dash", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Escape": {
				"name": "Technique_Escape", "fieldName": "escape", "title": "Escape", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grapple": {
				"name": "Technique_Grapple", "fieldName": "grapple", "title": "Grapple", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hide": {
				"name": "Technique_Hide", "fieldName": "hide", "title": "Hide", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Mount": {
				"name": "Technique_Mount", "fieldName": "mount", "title": "Mount", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prepare": {
				"name": "Technique_Prepare", "fieldName": "prepare", "title": "Prepare", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Reposition": {
				"name": "Technique_Reposition", "fieldName": "reposition", "title": "Reposition", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Seach": {
				"name": "Technique_Seach", "fieldName": "seach", "title": "Seach", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aid": {
				"name": "Technique_Aid", "fieldName": "aid", "title": "Aid", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Encourage": {
				"name": "Technique_Encourage", "fieldName": "encourage", "title": "Encourage", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stabilize": {
				"name": "Technique_Stabilize", "fieldName": "stabilize", "title": "Stabilize", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skill Check": {
				"name": "Technique_Skill Check", "fieldName": "skillCheck", "title": "Skill Check", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Rapport": {
				"name": "Technique_Build Rapport", "fieldName": "buildRapport", "title": "Build Rapport", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Pressure": {
				"name": "Technique_Build Pressure", "fieldName": "buildPressure", "title": "Build Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Captivate": {
				"name": "Technique_Captivate", "fieldName": "captivate", "title": "Captivate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demand": {
				"name": "Technique_Demand", "fieldName": "demand", "title": "Demand", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grab an Edge": {
				"name": "Technique_Grab an Edge", "fieldName": "grabAnEdge", "title": "Grab an Edge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Interact": {
				"name": "Technique_Interact", "fieldName": "interact", "title": "Interact", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Wind": {
				"name": "Technique_Second Wind", "fieldName": "secondWind", "title": "Second Wind", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Breath": {
				"name": "Technique_Second Breath", "fieldName": "secondBreath", "title": "Second Breath", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undaunted": {
				"name": "Technique_Undaunted", "fieldName": "undaunted", "title": "Undaunted", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Strike": {
				"name": "Technique_Preemptive Strike", "fieldName": "preemptiveStrike", "title": "Preemptive Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Stagger": {
				"name": "Technique_Preemptive Stagger", "fieldName": "preemptiveStagger", "title": "Preemptive Stagger", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Critical Maim": {
				"name": "Technique_Critical Maim", "fieldName": "criticalMaim", "title": "Critical Maim", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellshot": {
				"name": "Technique_Spellshot", "fieldName": "spellshot", "title": "Spellshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Follow-Up Spellshot": {
				"name": "Technique_Follow-Up Spellshot", "fieldName": "follow-UpSpellshot", "title": "Follow-Up Spellshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bursting Spellshot": {
				"name": "Technique_Bursting Spellshot", "fieldName": "burstingSpellshot", "title": "Bursting Spellshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior": {
				"name": "Technique_Savior", "fieldName": "savior", "title": "Savior", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knock Away Savior": {
				"name": "Technique_Knock Away Savior", "fieldName": "knockAwaySavior", "title": "Knock Away Savior", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior's Retaliation": {
				"name": "Technique_Savior's Retaliation", "fieldName": "savior'sRetaliation", "title": "Savior's Retaliation", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellstrike": {
				"name": "Technique_Spellstrike", "fieldName": "spellstrike", "title": "Spellstrike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Skirmish": {
				"name": "Technique_Power Skirmish", "fieldName": "powerSkirmish", "title": "Power Skirmish", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneak Attack": {
				"name": "Technique_Sneak Attack", "fieldName": "sneakAttack", "title": "Sneak Attack", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneaky Follow-Up": {
				"name": "Technique_Sneaky Follow-Up", "fieldName": "sneakyFollow-Up", "title": "Sneaky Follow-Up", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Assassinate": {
				"name": "Technique_Assassinate", "fieldName": "assassinate", "title": "Assassinate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Emergency Care": {
				"name": "Technique_Emergency Care", "fieldName": "emergencyCare", "title": "Emergency Care", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightingale": {
				"name": "Technique_Nightingale", "fieldName": "nightingale", "title": "Nightingale", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Rhapsody": {
				"name": "Technique_Rhapsody", "fieldName": "rhapsody", "title": "Rhapsody", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Metamagic": {
				"name": "Technique_Metamagic", "fieldName": "metamagic", "title": "Metamagic", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Strategize": {
				"name": "Technique_Strategize", "fieldName": "strategize", "title": "Strategize", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Foresight": {
				"name": "Technique_Foresight", "fieldName": "foresight", "title": "Foresight", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Saw That Coming": {
				"name": "Technique_Saw That Coming", "fieldName": "sawThatComing", "title": "Saw That Coming", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_As You May Recall": {
				"name": "Technique_As You May Recall", "fieldName": "asYouMayRecall", "title": "As You May Recall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Generalist": {
				"name": "Technique_Generalist", "fieldName": "generalist", "title": "Generalist", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender": {
				"name": "Technique_Defender", "fieldName": "defender", "title": "Defender", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender II": {
				"name": "Technique_Defender II", "fieldName": "defenderII", "title": "Defender II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Will": {
				"name": "Technique_Defender's Will", "fieldName": "defender'sWill", "title": "Defender's Will", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Taunt": {
				"name": "Technique_Defender's Taunt", "fieldName": "defender'sTaunt", "title": "Defender's Taunt", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Recovery": {
				"name": "Technique_Defender's Recovery", "fieldName": "defender'sRecovery", "title": "Defender's Recovery", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher": {
				"name": "Technique_Skirmisher", "fieldName": "skirmisher", "title": "Skirmisher", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher II": {
				"name": "Technique_Skirmisher II", "fieldName": "skirmisherII", "title": "Skirmisher II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Step": {
				"name": "Technique_Skirmisher's Step", "fieldName": "skirmisher'sStep", "title": "Skirmisher's Step", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Strike": {
				"name": "Technique_Skirmisher's Strike", "fieldName": "skirmisher'sStrike", "title": "Skirmisher's Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman": {
				"name": "Technique_Marksman", "fieldName": "marksman", "title": "Marksman", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman II": {
				"name": "Technique_Marksman II", "fieldName": "marksmanII", "title": "Marksman II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Longshot": {
				"name": "Technique_Marksman's Longshot", "fieldName": "marksman'sLongshot", "title": "Marksman's Longshot", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Sight": {
				"name": "Technique_Marksman's Sight", "fieldName": "marksman'sSight", "title": "Marksman's Sight", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Strike": {
				"name": "Technique_Marksman's Strike", "fieldName": "marksman'sStrike", "title": "Marksman's Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete": {
				"name": "Technique_Athlete", "fieldName": "athlete", "title": "Athlete", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete II": {
				"name": "Technique_Athlete II", "fieldName": "athleteII", "title": "Athlete II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete's Sprint": {
				"name": "Technique_Athlete's Sprint", "fieldName": "athlete'sSprint", "title": "Athlete's Sprint", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": []
				,
				"formulaCalculations": []
			},
			"Technique_Athlete's Reach": {
				"name": "Technique_Athlete's Reach", "fieldName": "athlete'sReach", "title": "Athlete's Reach", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bounding Sprint": {
				"name": "Technique_Bounding Sprint", "fieldName": "boundingSprint", "title": "Bounding Sprint", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Away": {
				"name": "Technique_Skulk Away", "fieldName": "skulkAway", "title": "Skulk Away", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Then Hide": {
				"name": "Technique_Skulk Then Hide", "fieldName": "skulkThenHide", "title": "Skulk Then Hide", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_First Aid": {
				"name": "Technique_First Aid", "fieldName": "firstAid", "title": "First Aid", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleansing Aid": {
				"name": "Technique_Cleansing Aid", "fieldName": "cleansingAid", "title": "Cleansing Aid", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Environmental Awareness": {
				"name": "Technique_Environmental Awareness", "fieldName": "environmentalAwareness", "title": "Environmental Awareness", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Eclectic Knowledge": {
				"name": "Technique_Eclectic Knowledge", "fieldName": "eclecticKnowledge", "title": "Eclectic Knowledge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Point of Clarity": {
				"name": "Technique_Point of Clarity", "fieldName": "pointOfClarity", "title": "Point of Clarity", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pole Vault": {
				"name": "Technique_Pole Vault", "fieldName": "poleVault", "title": "Pole Vault", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Draw": {
				"name": "Technique_Quick Draw", "fieldName": "quickDraw", "title": "Quick Draw", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike": {
				"name": "Technique_Extension Strike", "fieldName": "extensionStrike", "title": "Extension Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Step Extension": {
				"name": "Technique_Step Extension", "fieldName": "stepExtension", "title": "Step Extension", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Extension": {
				"name": "Technique_Lasting Extension", "fieldName": "lastingExtension", "title": "Lasting Extension", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Far Strike": {
				"name": "Technique_Far Strike", "fieldName": "farStrike", "title": "Far Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike +": {
				"name": "Technique_Extension Strike +", "fieldName": "extensionStrike+", "title": "Extension Strike +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defense Piercer ": {
				"name": "Technique_Defense Piercer ", "fieldName": "defensePiercer", "title": "Defense Piercer ", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash": {
				"name": "Technique_Quick Slash", "fieldName": "quickSlash", "title": "Quick Slash", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Precision Blade": {
				"name": "Technique_Precision Blade", "fieldName": "precisionBlade", "title": "Precision Blade", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Armor Piercer": {
				"name": "Technique_Armor Piercer", "fieldName": "armorPiercer", "title": "Armor Piercer", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash II": {
				"name": "Technique_Quick Slash II", "fieldName": "quickSlashII", "title": "Quick Slash II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave": {
				"name": "Technique_Cleave", "fieldName": "cleave", "title": "Cleave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crushing Blade": {
				"name": "Technique_Crushing Blade", "fieldName": "crushingBlade", "title": "Crushing Blade", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave": {
				"name": "Technique_Great Cleave", "fieldName": "greatCleave", "title": "Great Cleave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave +": {
				"name": "Technique_Cleave +", "fieldName": "cleave+", "title": "Cleave +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sudden Cleave": {
				"name": "Technique_Sudden Cleave", "fieldName": "suddenCleave", "title": "Sudden Cleave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave II": {
				"name": "Technique_Great Cleave II", "fieldName": "greatCleaveII", "title": "Great Cleave II", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Flex": {
				"name": "Technique_Power Flex", "fieldName": "powerFlex", "title": "Power Flex", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crush Knuckle": {
				"name": "Technique_Crush Knuckle", "fieldName": "crushKnuckle", "title": "Crush Knuckle", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Impact Knuckle": {
				"name": "Technique_Impact Knuckle", "fieldName": "impactKnuckle", "title": "Impact Knuckle", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knuckle Flurry": {
				"name": "Technique_Knuckle Flurry", "fieldName": "knuckleFlurry", "title": "Knuckle Flurry", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Water Blast": {
				"name": "Technique_Water Blast", "fieldName": "waterBlast", "title": "Water Blast", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser": {
				"name": "Technique_Geyser", "fieldName": "geyser", "title": "Geyser", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser Line": {
				"name": "Technique_Geyser Line", "fieldName": "geyserLine", "title": "Geyser Line", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surf": {
				"name": "Technique_Surf", "fieldName": "surf", "title": "Surf", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Geyser Line": {
				"name": "Technique_Great Geyser Line", "fieldName": "greatGeyserLine", "title": "Great Geyser Line", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tidal Wave": {
				"name": "Technique_Tidal Wave", "fieldName": "tidalWave", "title": "Tidal Wave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Surge": {
				"name": "Technique_Sand Surge", "fieldName": "sandSurge", "title": "Sand Surge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Spout": {
				"name": "Technique_Sand Spout", "fieldName": "sandSpout", "title": "Sand Spout", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Wave": {
				"name": "Technique_Sand Wave", "fieldName": "sandWave", "title": "Sand Wave", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Launcher": {
				"name": "Technique_Sand Launcher", "fieldName": "sandLauncher", "title": "Sand Launcher", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sicken": {
				"name": "Technique_Sicken", "fieldName": "sicken", "title": "Sicken", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spores": {
				"name": "Technique_Spores", "fieldName": "spores", "title": "Spores", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sickening Cloud": {
				"name": "Technique_Sickening Cloud", "fieldName": "sickeningCloud", "title": "Sickening Cloud", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Virulent Spores": {
				"name": "Technique_Virulent Spores", "fieldName": "virulentSpores", "title": "Virulent Spores", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Firebolt": {
				"name": "Technique_Firebolt", "fieldName": "firebolt", "title": "Firebolt", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flame Arrow": {
				"name": "Technique_Flame Arrow", "fieldName": "flameArrow", "title": "Flame Arrow", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireball": {
				"name": "Technique_Fireball", "fieldName": "fireball", "title": "Fireball", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireblast": {
				"name": "Technique_Fireblast", "fieldName": "fireblast", "title": "Fireblast", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ragnarok": {
				"name": "Technique_Ragnarok", "fieldName": "ragnarok", "title": "Ragnarok", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bonfire": {
				"name": "Technique_Bonfire", "fieldName": "bonfire", "title": "Bonfire", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wall of Fire": {
				"name": "Technique_Wall of Fire", "fieldName": "wallOfFire", "title": "Wall of Fire", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field of Flame": {
				"name": "Technique_Field of Flame", "fieldName": "fieldOfFlame", "title": "Field of Flame", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Shaft": {
				"name": "Technique_Lightning Shaft", "fieldName": "lightningShaft", "title": "Lightning Shaft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shock": {
				"name": "Technique_Shock", "fieldName": "shock", "title": "Shock", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Bolt": {
				"name": "Technique_Lightning Bolt", "fieldName": "lightningBolt", "title": "Lightning Bolt", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Plasma Arc": {
				"name": "Technique_Plasma Arc", "fieldName": "plasmaArc", "title": "Plasma Arc", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fulgor": {
				"name": "Technique_Fulgor", "fieldName": "fulgor", "title": "Fulgor", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Snap": {
				"name": "Technique_Cold Snap", "fieldName": "coldSnap", "title": "Cold Snap", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Frostbite": {
				"name": "Technique_Frostbite", "fieldName": "frostbite", "title": "Frostbite", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezebind": {
				"name": "Technique_Freezebind", "fieldName": "freezebind", "title": "Freezebind", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Burst": {
				"name": "Technique_Cold Burst", "fieldName": "coldBurst", "title": "Cold Burst", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Front": {
				"name": "Technique_Cold Front", "fieldName": "coldFront", "title": "Cold Front", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Diamond Dust": {
				"name": "Technique_Diamond Dust", "fieldName": "diamondDust", "title": "Diamond Dust", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Bullet": {
				"name": "Technique_Wind Bullet", "fieldName": "windBullet", "title": "Wind Bullet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gust": {
				"name": "Technique_Gust", "fieldName": "gust", "title": "Gust", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Windsweep": {
				"name": "Technique_Windsweep", "fieldName": "windsweep", "title": "Windsweep", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gale": {
				"name": "Technique_Gale", "fieldName": "gale", "title": "Gale", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Darkness": {
				"name": "Technique_Darkness", "fieldName": "darkness", "title": "Darkness", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Wall": {
				"name": "Technique_Shadow Wall", "fieldName": "shadowWall", "title": "Shadow Wall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightfall": {
				"name": "Technique_Nightfall", "fieldName": "nightfall", "title": "Nightfall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fog Cloud": {
				"name": "Technique_Fog Cloud", "fieldName": "fogCloud", "title": "Fog Cloud", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sleet": {
				"name": "Technique_Sleet", "fieldName": "sleet", "title": "Sleet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezing Sleet": {
				"name": "Technique_Freezing Sleet", "fieldName": "freezingSleet", "title": "Freezing Sleet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hail": {
				"name": "Technique_Hail", "fieldName": "hail", "title": "Hail", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Binding Sleet": {
				"name": "Technique_Binding Sleet", "fieldName": "bindingSleet", "title": "Binding Sleet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ice Storm": {
				"name": "Technique_Ice Storm", "fieldName": "iceStorm", "title": "Ice Storm", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fimbulwinter": {
				"name": "Technique_Fimbulwinter", "fieldName": "fimbulwinter", "title": "Fimbulwinter", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Smoke Cloud": {
				"name": "Technique_Smoke Cloud", "fieldName": "smokeCloud", "title": "Smoke Cloud", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burning Smoke": {
				"name": "Technique_Burning Smoke", "fieldName": "burningSmoke", "title": "Burning Smoke", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Choking Smoke": {
				"name": "Technique_Choking Smoke", "fieldName": "chokingSmoke", "title": "Choking Smoke", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Acceleration": {
				"name": "Technique_Acceleration", "fieldName": "acceleration", "title": "Acceleration", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Vault": {
				"name": "Technique_Power Vault", "fieldName": "powerVault", "title": "Power Vault", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Expeditious": {
				"name": "Technique_Expeditious", "fieldName": "expeditious", "title": "Expeditious", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Climb": {
				"name": "Technique_Quick Climb", "fieldName": "quickClimb", "title": "Quick Climb", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Swim": {
				"name": "Technique_Quick Swim", "fieldName": "quickSwim", "title": "Quick Swim", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Poise": {
				"name": "Technique_Poise", "fieldName": "poise", "title": "Poise", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cat Fall": {
				"name": "Technique_Cat Fall", "fieldName": "catFall", "title": "Cat Fall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kip Up": {
				"name": "Technique_Kip Up", "fieldName": "kipUp", "title": "Kip Up", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Silent Stride": {
				"name": "Technique_Silent Stride", "fieldName": "silentStride", "title": "Silent Stride", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shove": {
				"name": "Technique_Shove", "fieldName": "shove", "title": "Shove", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knockdown": {
				"name": "Technique_Knockdown", "fieldName": "knockdown", "title": "Knockdown", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tumble": {
				"name": "Technique_Tumble", "fieldName": "tumble", "title": "Tumble", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field Medic": {
				"name": "Technique_Field Medic", "fieldName": "fieldMedic", "title": "Field Medic", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Camoflauge": {
				"name": "Technique_Camoflauge", "fieldName": "camoflauge", "title": "Camoflauge", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Blurred Light": {
				"name": "Technique_Blurred Light", "fieldName": "blurredLight", "title": "Blurred Light", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light Refraction": {
				"name": "Technique_Light Refraction", "fieldName": "lightRefraction", "title": "Light Refraction", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Steps": {
				"name": "Technique_Shadow Steps", "fieldName": "shadowSteps", "title": "Shadow Steps", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Walker": {
				"name": "Technique_Shadow Walker", "fieldName": "shadowWalker", "title": "Shadow Walker", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Step": {
				"name": "Technique_Wind Step", "fieldName": "windStep", "title": "Wind Step", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Updraft": {
				"name": "Technique_Updraft", "fieldName": "updraft", "title": "Updraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Clouded Updraft": {
				"name": "Technique_Clouded Updraft", "fieldName": "cloudedUpdraft", "title": "Clouded Updraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Fall": {
				"name": "Technique_Wind Fall", "fieldName": "windFall", "title": "Wind Fall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Walk on Air": {
				"name": "Technique_Walk on Air", "fieldName": "walkOnAir", "title": "Walk on Air", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fire Step": {
				"name": "Technique_Fire Step", "fieldName": "fireStep", "title": "Fire Step", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Liftoff": {
				"name": "Technique_Liftoff", "fieldName": "liftoff", "title": "Liftoff", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Jet": {
				"name": "Technique_Jet", "fieldName": "jet", "title": "Jet", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cunning Action": {
				"name": "Technique_Cunning Action", "fieldName": "cunningAction", "title": "Cunning Action", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demoralize": {
				"name": "Technique_Demoralize", "fieldName": "demoralize", "title": "Demoralize", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fascinate": {
				"name": "Technique_Fascinate", "fieldName": "fascinate", "title": "Fascinate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Impersonator": {
				"name": "Technique_Impersonator", "fieldName": "impersonator", "title": "Impersonator", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ether Sense": {
				"name": "Technique_Ether Sense", "fieldName": "etherSense", "title": "Ether Sense", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spirit Sense": {
				"name": "Technique_Spirit Sense", "fieldName": "spiritSense", "title": "Spirit Sense", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tremorsense": {
				"name": "Technique_Tremorsense", "fieldName": "tremorsense", "title": "Tremorsense", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dustcraft": {
				"name": "Technique_Dustcraft", "fieldName": "dustcraft", "title": "Dustcraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shape Material": {
				"name": "Technique_Shape Material", "fieldName": "shapeMaterial", "title": "Shape Material", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quickcraft": {
				"name": "Technique_Quickcraft", "fieldName": "quickcraft", "title": "Quickcraft", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Shaping": {
				"name": "Technique_Improved Shaping", "fieldName": "improvedShaping", "title": "Improved Shaping", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Shaping": {
				"name": "Technique_Greater Shaping", "fieldName": "greaterShaping", "title": "Greater Shaping", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Shaping": {
				"name": "Technique_Legendary Shaping", "fieldName": "legendaryShaping", "title": "Legendary Shaping", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Material": {
				"name": "Technique_Dust Material", "fieldName": "dustMaterial", "title": "Dust Material", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Area": {
				"name": "Technique_Dust Area", "fieldName": "dustArea", "title": "Dust Area", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Dusting": {
				"name": "Technique_Improved Dusting", "fieldName": "improvedDusting", "title": "Improved Dusting", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Dusting": {
				"name": "Technique_Greater Dusting", "fieldName": "greaterDusting", "title": "Greater Dusting", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Dusting": {
				"name": "Technique_Legendary Dusting", "fieldName": "legendaryDusting", "title": "Legendary Dusting", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Path": {
				"name": "Technique_Form Path", "fieldName": "formPath", "title": "Form Path", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Pillar": {
				"name": "Technique_Form Pillar", "fieldName": "formPillar", "title": "Form Pillar", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stepping Path": {
				"name": "Technique_Stepping Path", "fieldName": "steppingPath", "title": "Stepping Path", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Wall": {
				"name": "Technique_Form Wall", "fieldName": "formWall", "title": "Form Wall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Scattered Pillars": {
				"name": "Technique_Scattered Pillars", "fieldName": "scatteredPillars", "title": "Scattered Pillars", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Wall": {
				"name": "Technique_Great Wall", "fieldName": "greatWall", "title": "Great Wall", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cultivate": {
				"name": "Technique_Cultivate", "fieldName": "cultivate", "title": "Cultivate", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Entangle": {
				"name": "Technique_Entangle", "fieldName": "entangle", "title": "Entangle", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wildwood": {
				"name": "Technique_Wildwood", "fieldName": "wildwood", "title": "Wildwood", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distortion": {
				"name": "Technique_Distortion", "fieldName": "distortion", "title": "Distortion", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Distortion": {
				"name": "Technique_Lasting Distortion", "fieldName": "lastingDistortion", "title": "Lasting Distortion", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heat Field": {
				"name": "Technique_Heat Field", "fieldName": "heatField", "title": "Heat Field", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burn Guard": {
				"name": "Technique_Burn Guard", "fieldName": "burnGuard", "title": "Burn Guard", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Field": {
				"name": "Technique_Cold Field", "fieldName": "coldField", "title": "Cold Field", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Chill Guard": {
				"name": "Technique_Chill Guard", "fieldName": "chillGuard", "title": "Chill Guard", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinesis": {
				"name": "Technique_Kinesis", "fieldName": "kinesis", "title": "Kinesis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distant Kinesis": {
				"name": "Technique_Distant Kinesis", "fieldName": "distantKinesis", "title": "Distant Kinesis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Strike": {
				"name": "Technique_Kinetic Strike", "fieldName": "kineticStrike", "title": "Kinetic Strike", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Throw": {
				"name": "Technique_Kinetic Throw", "fieldName": "kineticThrow", "title": "Kinetic Throw", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heavy Kinesis": {
				"name": "Technique_Heavy Kinesis", "fieldName": "heavyKinesis", "title": "Heavy Kinesis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burden": {
				"name": "Technique_Burden", "fieldName": "burden", "title": "Burden", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pressure": {
				"name": "Technique_Pressure", "fieldName": "pressure", "title": "Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Restrain": {
				"name": "Technique_Restrain", "fieldName": "restrain", "title": "Restrain", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wide Pressure": {
				"name": "Technique_Wide Pressure", "fieldName": "widePressure", "title": "Wide Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prostration": {
				"name": "Technique_Prostration", "fieldName": "prostration", "title": "Prostration", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Deep Pressure": {
				"name": "Technique_Deep Pressure", "fieldName": "deepPressure", "title": "Deep Pressure", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gravity Well": {
				"name": "Technique_Gravity Well", "fieldName": "gravityWell", "title": "Gravity Well", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shield Block": {
				"name": "Technique_Shield Block", "fieldName": "shieldBlock", "title": "Shield Block", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Glancing Block": {
				"name": "Technique_Glancing Block", "fieldName": "glancingBlock", "title": "Glancing Block", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aegis": {
				"name": "Technique_Aegis", "fieldName": "aegis", "title": "Aegis", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light": {
				"name": "Technique_Light", "fieldName": "light", "title": "Light", "group": "Technique", "subGroup": "", "descriptions": [null]
				,
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dancing Lights": {
				"name": "Technique_Dancing Lights", "fieldName": "dancingLights", "title": "Dancing Lights", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flash": {
				"name": "Technique_Flash", "fieldName": "flash", "title": "Flash", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sunlight": {
				"name": "Technique_Sunlight", "fieldName": "sunlight", "title": "Sunlight", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release": {
				"name": "Technique_Stress Release", "fieldName": "stressRelease", "title": "Stress Release", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release +": {
				"name": "Technique_Stress Release +", "fieldName": "stressRelease+", "title": "Stress Release +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release ++": {
				"name": "Technique_Stress Release ++", "fieldName": "stressRelease++", "title": "Stress Release ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training": {
				"name": "Technique_Sensory Training", "fieldName": "sensoryTraining", "title": "Sensory Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training +": {
				"name": "Technique_Sensory Training +", "fieldName": "sensoryTraining+", "title": "Sensory Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Broad Study": {
				"name": "Technique_Broad Study", "fieldName": "broadStudy", "title": "Broad Study", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Experienced Tracker": {
				"name": "Technique_Experienced Tracker", "fieldName": "experiencedTracker", "title": "Experienced Tracker", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual": {
				"name": "Technique_Multilingual", "fieldName": "multilingual", "title": "Multilingual", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual +": {
				"name": "Technique_Multilingual +", "fieldName": "multilingual+", "title": "Multilingual +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore": {
				"name": "Technique_Specialized Lore", "fieldName": "specializedLore", "title": "Specialized Lore", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore +": {
				"name": "Technique_Specialized Lore +", "fieldName": "specializedLore+", "title": "Specialized Lore +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore ++": {
				"name": "Technique_Specialized Lore ++", "fieldName": "specializedLore++", "title": "Specialized Lore ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Initiative": {
				"name": "Technique_Improved Initiative", "fieldName": "improvedInitiative", "title": "Improved Initiative", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training": {
				"name": "Technique_Knowledge Training", "fieldName": "knowledgeTraining", "title": "Knowledge Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training +": {
				"name": "Technique_Knowledge Training +", "fieldName": "knowledgeTraining+", "title": "Knowledge Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training ++": {
				"name": "Technique_Knowledge Training ++", "fieldName": "knowledgeTraining++", "title": "Knowledge Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training": {
				"name": "Technique_Social Training", "fieldName": "socialTraining", "title": "Social Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training +": {
				"name": "Technique_Social Training +", "fieldName": "socialTraining+", "title": "Social Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training ++": {
				"name": "Technique_Social Training ++", "fieldName": "socialTraining++", "title": "Social Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus": {
				"name": "Technique_Refocus", "fieldName": "refocus", "title": "Refocus", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus +": {
				"name": "Technique_Refocus +", "fieldName": "refocus+", "title": "Refocus +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel": {
				"name": "Technique_Sustained Channel", "fieldName": "sustainedChannel", "title": "Sustained Channel", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel +": {
				"name": "Technique_Sustained Channel +", "fieldName": "sustainedChannel+", "title": "Sustained Channel +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control": {
				"name": "Technique_Ki Control", "fieldName": "kiControl", "title": "Ki Control", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control +": {
				"name": "Technique_Ki Control +", "fieldName": "kiControl+", "title": "Ki Control +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control ++": {
				"name": "Technique_Ki Control ++", "fieldName": "kiControl++", "title": "Ki Control ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value": {
				"name": "Technique_Surge Value", "fieldName": "surgeValue", "title": "Surge Value", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value +": {
				"name": "Technique_Surge Value +", "fieldName": "surgeValue+", "title": "Surge Value +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training": {
				"name": "Technique_Channel Training", "fieldName": "channelTraining", "title": "Channel Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training +": {
				"name": "Technique_Channel Training +", "fieldName": "channelTraining+", "title": "Channel Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training ++": {
				"name": "Technique_Channel Training ++", "fieldName": "channelTraining++", "title": "Channel Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training": {
				"name": "Technique_Physical Training", "fieldName": "physicalTraining", "title": "Physical Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training +": {
				"name": "Technique_Physical Training +", "fieldName": "physicalTraining+", "title": "Physical Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training": {
				"name": "Technique_Body Training", "fieldName": "bodyTraining", "title": "Body Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training +": {
				"name": "Technique_Body Training +", "fieldName": "bodyTraining+", "title": "Body Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training ++": {
				"name": "Technique_Body Training ++", "fieldName": "bodyTraining++", "title": "Body Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training": {
				"name": "Technique_Technical Training", "fieldName": "technicalTraining", "title": "Technical Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training +": {
				"name": "Technique_Technical Training +", "fieldName": "technicalTraining+", "title": "Technical Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training ++": {
				"name": "Technique_Technical Training ++", "fieldName": "technicalTraining++", "title": "Technical Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training": {
				"name": "Technique_Martial Training", "fieldName": "martialTraining", "title": "Martial Training", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training +": {
				"name": "Technique_Martial Training +", "fieldName": "martialTraining+", "title": "Martial Training +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training ++": {
				"name": "Technique_Martial Training ++", "fieldName": "martialTraining++", "title": "Martial Training ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up": {
				"name": "Technique_HP Up", "fieldName": "hPUp", "title": "HP Up", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up+": {
				"name": "Technique_HP Up+", "fieldName": "hPUp+", "title": "HP Up+", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up++": {
				"name": "Technique_HP Up++", "fieldName": "hPUp++", "title": "HP Up++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost": {
				"name": "Technique_Vitality Boost", "fieldName": "vitalityBoost", "title": "Vitality Boost", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost +": {
				"name": "Technique_Vitality Boost +", "fieldName": "vitalityBoost+", "title": "Vitality Boost +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost ++": {
				"name": "Technique_Vitality Boost ++", "fieldName": "vitalityBoost++", "title": "Vitality Boost ++", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying": {
				"name": "Technique_Undying", "fieldName": "undying", "title": "Undying", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying +": {
				"name": "Technique_Undying +", "fieldName": "undying+", "title": "Undying +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack": {
				"name": "Technique_Extra Follow-Up Attack", "fieldName": "extraFollow-UpAttack", "title": "Extra Follow-Up Attack", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack +": {
				"name": "Technique_Extra Follow-Up Attack +", "fieldName": "extraFollow-UpAttack+", "title": "Extra Follow-Up Attack +", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Change Tech Slots": {
				"name": "Technique_Change Tech Slots", "fieldName": "changeTechSlots", "title": "Change Tech Slots", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hold Out": {
				"name": "Technique_Hold Out", "fieldName": "holdOut", "title": "Hold Out", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Overdrive": {
				"name": "Technique_Overdrive", "fieldName": "overdrive", "title": "Overdrive", "group": "Technique", "subGroup": "", "descriptions": [null],
				"abbreviation": "", "variable": "TCH{0}", "formula": "6;Level", "modifiers": "_techBonus", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			}
		},
		sortingGroups = { "group": { "Type": ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error"], "Affinity": ["Wood", "Fire", "Earth", "Metal", "Water"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "PageSet": ["Character Creator", "Core", "Advancement", "Training Page"], "Page": ["Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear"], "General": ["Full Name", "Display Name", "Level", "XP", "Training", "CR", "HP", "WILL", "EN", "Initiative"], "Gear": ["Carrying Capacity"], "Attribute": ["Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN"], "Defense": ["Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion"], "Sense": ["Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill"], "Combat": ["Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Combat_Move Speed", "Combat_Move Potency"], "": ["Chakra"], "Social": ["Social_Approval", "Social_Patience"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent"], "Status": ["Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious"], "Condition": ["Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised"], "Style": ["Style_Basic Set", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan"], "Lore": ["Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "Role": ["Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Technique": ["Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"] }, "formulaMods": { "CR": ["Skill", "Job", "HP", "WILL", "Initiative", "Combat_HV", "Combat_Chakra", "Social_Approval", "Social_Patience", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "": ["Role", "Language", "Lore", "Page Set", "Page", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "Character Creator", "Core", "Advancement", "Training Page", "Page_Origin", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Full Name", "Display Name", "Level", "Training", "CR", "EN", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Chakra", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Level": ["Technique", "HP", "WILL", "Social_Approval"], "BOD": ["HP", "Carrying Capacity", "Defense_Brace", "Defense_Fortitude"], "CNV": ["WILL", "Sense_Resolve", "Sense_Freewill", "Combat_HV", "Social_Approval"], "QCK": ["Initiative", "Defense_Reflex", "Defense_Evasion"], "PRC": ["Defense_Disruption", "Defense_Hide"], "INT": ["Sense_Insight", "Sense_Notice"], "RSN": ["Sense_Scrutiny", "Sense_Detect"] } },
		_max = "_max",
		_true = "_true",
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
		_tech = "_tech",
		_expertise = "_expertise",
		_gear = "_gear",
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
		_true: _true,
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
		_tech: _tech,
		_expertise: _expertise,
		_gear: _gear,
		_error: _error
	};
}());
